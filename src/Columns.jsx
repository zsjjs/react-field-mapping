import {Component} from 'react';
import { isElement } from 'react-dom/test-utils';

class Columns extends Component {
  constructor(props) {
    super(props);
  }
  customRender(opts, data, idx) {
    const { key, render } = opts;
    let result = false;
    if(isElement(render) || typeof render === 'string') {
      result = render;
    } else if (typeof render === 'function') {
      result = render(data[key], data, idx);
    }
    return result;
  }
  render() {
    const { item, index, columnOpt, sorting, columns, type } = this.props;
    return <li {...columnOpt(item, index)} >
      {
        columns.map((column, idx) => {
          return (
            <span
              key={column.key}
              className="column-item"
              style={{
                width: column.width,
                textAlign: column.align
              }}
              title={item[column.key] || ''}
            >
              {
                this.customRender(column, item, idx) ||
                item[column.key]
              }
            </span>
          );
        })
      }
      <div style={{visibility: item.iconShow}} className={`column-icon ${type}-column-icon ${sorting ? "sorting" : ""}`}></div>
    </li>;
  }
}

export default Columns;