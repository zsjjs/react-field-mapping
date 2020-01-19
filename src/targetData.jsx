/* @author yanjun.zsj
 * @date 2018.11
*/
import {Component} from 'react';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import Columns from './Columns.jsx';
class TargetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
      sorting: false
    };
  }
  //由于sortablejs直接操作dom，不符合受控组件逻辑，现在每次改变排序一次，render触发4次：
  // 1、sortjs改变dom；
  // 2、改变受控组件原始数据排序；
  // 3、由于受控组件直接改变了原始数据的排序，所以sortablejs改变的sort需要还原
  // 4、sort还原后 需要重新触发render，改变currentActive位置
  // 后续优化
  componentDidMount() {
    const { isSort } = this.props;
    const ele = this.boxEle.querySelector('.column-content');
    let order = [];
    if(isSort) {
      const sortable =  new Sortable(ele, {
        onStart: () => {
          this.setState({
            sorting: true
          });
        },
        onEnd: (evt) => {
          sortable.sort(order);//sortablejs排序还原
          this.props.changeData(evt.oldIndex, evt.newIndex);
          this.setState({
            sorting: false
          });
        }
      });
      order = sortable.toArray();
    }
  }
  show(data, relation, iconStatus) {
    return data.map(item => {
      let iconShow = iconStatus ? 'inherit' : 'hidden';
      relation.map(n => {
        if ((n.target && n.target.key) === item.key) iconShow = 'inherit';
      });
      item.iconShow = iconShow;
      return item;
    });
  }
  isActive(key) {
    const { currentRelation } = this.props;
    if(this.state.activeKey === key) {
      return "active";
    }else if (currentRelation.target && currentRelation.target.key === key) {
      return "active";
    }
    return "";
  }
  render() {
    const {
      columns,
      data,
      iconStatus,
      overActive,
      relation,
      edit
    } = this.props;
    const { sorting } = this.state;
    const columnOpt = (item, index) => {
      return {
        "data-id": index,
        key: `target_${index}`,
        "data-key": item.key,
        className: this.isActive(item.key),
        onMouseEnter: () => {
          !sorting && this.setState({
            activeKey: item.key
          }, () => {
            overActive(item, "target", "enter");
          });
        },
        onMouseLeave: () => {
          !sorting && this.setState({
            activeKey: null
          }, () => {
            overActive(item, "target", "leave");
          });
        }
      };
    };
    const renderContent = this.show(data, relation, iconStatus);
    return <div className="target-data" ref={(me) => {this.boxEle = me;}} >
      <ul className="column-title">
        <li>
        {columns.map((column, idx) => {
            return (
              <span
                key={idx}
                className="column-item"
                title={column.title}
                style={{
                  width: column.width,
                  textAlign: column.align
                }}
              >
                {column.title}
              </span>
            );
          })}
        </li>
      </ul>
      <ul className="column-content">
        {
          renderContent.map((item, index) => {
            return (
              <Columns
                columns={columns}
                key={`target${index}`}
                columnOpt={columnOpt}
                sorting={sorting}
                edit={edit}
                item={item}
                index={index}
                type="target"
              />
            );
          })
        }
      </ul>
    </div>;
  }
}

TargetData.propTypes = {
  iconStatus: PropTypes.object,
  relation: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  currentRelation: PropTypes.object.isRequired,
  isSort: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  changeData: PropTypes.func.isRequired,
  overActive: PropTypes.func.isRequired
};
export default TargetData;