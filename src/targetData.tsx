/* @author yanjun.zsj
 * @date 2018.11
*/
import React from 'react';
import Sortable from 'sortablejs';
import Columns from './Columns';
import { XDataProps, XDataState, DataTypes } from './types';

class TargetData extends React.Component<XDataProps, XDataState> {
  boxEle: Element;

  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
      sorting: false
    };
  }
  // 由于sortablejs直接操作dom，不符合受控组件逻辑，现在每次改变排序一次，render触发4次：
  // 1、sortjs改变dom；
  // 2、改变受控组件原始数据排序；
  // 3、由于受控组件直接改变了原始数据的排序，所以sortablejs改变的sort需要还原
  // 4、sort还原后 需要重新触发render，改变currentActive位置
  // 后续优化
  componentDidMount(): void {
    const { isSort } = this.props;
    const ele = this.boxEle.querySelector('.column-content');
    let order = [];
    if (isSort) {
      const sortable =  new Sortable(ele, {
        onStart: (): void => {
          this.setState({
            sorting: true
          });
        },
        onEnd: (evt): void => {
          sortable.sort(order); // sortablejs排序还原
          this.props.changeData(evt.oldIndex, evt.newIndex);
          this.setState({
            sorting: false
          });
        }
      });
      order = sortable.toArray();
    }
  }
  show(data, relation, iconStatus): DataTypes[] {
    return data.map(item => {
      let iconShow = iconStatus ? 'inherit' : 'hidden';
      relation.map(n => {
        if ((n.target && n.target.key) === item.key) {
          iconShow = 'inherit';
        }
      });
      item.iconShow = iconShow;
      return item;
    });
  }
  isActive(key): string {
    const { currentRelation } = this.props;
    if (this.state.activeKey === key) {
      return "active";
    } else if (currentRelation.target && currentRelation.target.key === key) {
      return "active";
    }
    return "";
  }

  eventHandle(item, type, activeKey): void {
    if (!this.state.sorting) {
      this.setState({
        activeKey,
      }, () => {
        this.props.overActive(item, "target", type);
      });
    }
  }

  render(): React.ReactElement {
    const {
      columns,
      data,
      iconStatus,
      relation,
      edit
    } = this.props;
    const columnOpt = (item, index): unknown => {
      return {
        "data-id": index,
        "key": `target_${index}`,
        "data-key": item.key,
        "className": this.isActive(item.key),
        "onMouseEnter": this.eventHandle.bind(this, item, "enter", item.key),
        "onMouseLeave": this.eventHandle.bind(this, item, "leave", null),
      };
    };
    const renderContent = this.show(data, relation, iconStatus);
    return <div className="target-data" ref={(me): void => {
      this.boxEle = me;
    }}>
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
                } as React.CSSProperties}
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
                sorting={this.state.sorting}
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

export default TargetData;
