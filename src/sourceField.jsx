import {Component} from 'react';

class SourceField extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { item, index, columnOpt, sorting } = this.props;
    return <li {...columnOpt(item, index)} >
      <span className="column-item">{item.name}</span>
      <span className="column-item">{item.type}</span>
      <div style={{visibility: item.iconShow}} className={`column-icon source-column-icon ${sorting ? "sorting" : ""}`}></div>
    </li>;
  }
}

export default SourceField;