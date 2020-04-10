import React from 'react';
import { isElement } from 'react-dom/test-utils';
import { ColumnsProps } from './types';

class Columns extends React.Component<ColumnsProps, null> {
  constructor(props) {
    super(props);
  }

  customRender(opts, data, idx): boolean {
    const { key, render } = opts;
    let result = false;
    if (isElement(render) || typeof render === 'string') {
      result = render;
    } else if (typeof render === 'function') {
      result = render(data[key], data, idx);
    }
    return result;
  }

  render(): React.ReactElement {
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
              } as React.CSSProperties}
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
      <div style={{visibility: edit && item.iconShow}} className={`column-icon ${type}-column-icon ${sorting ? "sorting" : ""} ${edit ? "" : "disabled"}`} />
    </li>;
  }
}

export default Columns;
