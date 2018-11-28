import {Component} from 'react';

class SourceData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeName: null
    };
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
    if(this.state.activeName === name) {
      return "active";
    }else if (currentRelation.source && currentRelation.source.name === name) {
      return "active";
    }
    return "";
  }
  render() {
    const {
      data,
      iconStatus,
      relation
    } = this.props;
    const renderContent = this.show(data, relation, iconStatus);
    return <div className="source-data" ref={(me) => {this.boxEle = me;}} >
      <ul>
        <li>
          <span className="column-item">源头表字段</span>
          <span className="column-item">类型</span>
        </li>
        {renderContent.map((item, index) =>
          <li
            key={`source_${index}`}
            data-key={item.name}
            className={this.isActive(item.name)}
            onMouseEnter={() => {
              this.setState({
                activeName: item.name
              }, () => {
                this.props.overActive(item,  "source", "enter");
              });
            }}
            onMouseLeave={() => {
              this.setState({
                activeName: null
              }, () => {
                this.props.overActive(item, "source", "leave");
              });
            }}
          >
            <span className="column-item">{item.name}</span>
            <span className="column-item">{item.type}</span>
            <div style={{visibility: item.iconShow}} className="column-icon source-column-icon"></div>
          </li>
        )}
      </ul>
    </div>;
  }
}

export default SourceData;