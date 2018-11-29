import {Component} from 'react';
class TargetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeName: null
    };
  }
  show(data, relation, iconStatus) {
    return data.map(item => {
      let iconShow = iconStatus ? 'inherit' : 'hidden';
      relation.map(n => {
        if ((n.target && n.target.name) === item.name) iconShow = 'inherit';
      });
      item.iconShow = iconShow;
      return item;
    });
  }
  isActive(name) {
    const { currentRelation } = this.props;
    if(this.state.activeName === name) {
      return "active";
    }else if (currentRelation.target && currentRelation.target.name === name) {
      return "active";
    }
    return "";
  }
  render() {
    const {
      data,
      iconStatus,
      relation,
      targetTitle
    } = this.props;
    const renderContent = this.show(data, relation, iconStatus);
    return <div className="target-data" ref={(me) => {this.boxEle = me;}} >
      <ul>
        <li>
          <span className="column-item">{targetTitle.name}</span>
          <span className="column-item">{targetTitle.type}</span>
        </li>
        {renderContent.map((item, index) =>
          <li
            key={`target_${index}`}
            data-key={item.name}
            className={this.isActive(item.name)}
            onMouseEnter={() => {
              this.setState({
                activeName: item.name
              }, () => {
                this.props.overActive(item,  "target", "enter");
              });
            }}
            onMouseLeave={() => {
              this.setState({
                activeName: null
              }, () => {
                this.props.overActive(item, "target", "leave");
              });
            }}
          >
            <span className="column-item">{item.name}</span>
            <span className="column-item">{item.type}</span>
            <div style={{visibility: item.iconShow}} className="column-icon target-column-icon"></div>
          </li>
        )}
      </ul>
    </div>;
  }
}

export default TargetData;