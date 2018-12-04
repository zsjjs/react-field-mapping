/* @author yanjun.zsj
 * @date 2018.11
*/
import {Component} from 'react';
import Sortable from 'sortablejs';
import SourceField from './sourceField.jsx';
class SourceData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeName: null,
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
          setTimeout(() => {
            this.props.changeSource(evt.oldIndex, evt.newIndex, "sourceData");
            this.setState({
              sorting: false
            });
          }, 50);
        }
      });
      order = sortable.toArray();
    }
  }
  show(data, relation, iconStatus) {
    const arr = iconStatus ? relation.concat(iconStatus) : relation;
    return data.map(item => {
      let iconShow = 'hidden';
      arr.map(n => {
        if (n.name === item.name || (n.source && n.source.name) === item.name) iconShow = 'inherit';
      });
      item.iconShow = iconShow;
      return item;
    });
  }
  isActive(name) {
    const { currentRelation } = this.props;
    const className = [];
    if(this.state.activeName === name) {
      className.push("active");
    }else if (currentRelation.source && currentRelation.source.name === name) {
      className.push("active");
    }
    return className.join(" ");
  }
  render() {
    const {
      data,
      iconStatus,
      relation,
      sourceTitle,
      overActive
    } = this.props;
    const { sorting } = this.state;
    const columnOpt = (item, index) => {
      return {
        "data-id": index,
        "data-key": item.name,
        className: this.isActive(item.name),
        onMouseEnter: () => {
          !sorting && this.setState({
            activeName: item.name
          }, () => {
            overActive(item,  "source", "enter");
          });
        },
        onMouseLeave: () => {
          !sorting && this.setState({
            activeName: null
          }, () => {
            overActive(item, "source", "leave");
          });
        }
      };
    };
    const renderContent = this.show(data, relation, iconStatus);
    return <div className="source-data" ref={(me) => {this.boxEle = me;}} >
      <ul className="column-title">
        <li>
          <span className="column-item">{sourceTitle.name}</span>
          <span className="column-item">{sourceTitle.type}</span>
        </li>
      </ul>
      <ul className="column-content">
        {renderContent.map((item, index) => {
          return <SourceField
            key={`source_${index}`}
            columnOpt={columnOpt}
            sorting={sorting}
            item={item} index={index} />;}
        )}
      </ul>
    </div>;
  }
}

export default SourceData;