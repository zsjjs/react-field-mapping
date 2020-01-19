import {Component} from 'react';
import PropTypes from 'prop-types';
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
    const { item, index, columnOpt, sorting, columns, type, edit } = this.props;
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
      <div style={{visibility: edit && item.iconShow}} className={`column-icon ${type}-column-icon ${sorting ? "sorting" : ""} ${edit ? "" : "disabled"}`}></div>
    </li>;
  }
}

Columns.propTypes = {
  columns: PropTypes.array.isRequired,
  columnOpt: PropTypes.func.isRequired,
  sorting: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired
};
export default Columns;