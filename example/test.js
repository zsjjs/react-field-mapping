/*
 * @Author: yanjun.zsj
 * @LastEditors: yanjun.zsj
 * @Date: 2019-03-11 16:43:26
 * @LastEditTime: 2019-07-29 13:47:06
 */
/* global React, ReactDOM  */
const sourceData = new Array(7).fill().map((item, idx) => ({
  name: `field${idx + 1}`,
  type: 'string'
}));
const targetData = new Array(11).fill().map((item, idx) => ({
  name: `field${idx + 4}`,
  type: 'string'
}));

class App extends React.PureComponent {
  mapping = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      relation: [{
        source: {
          name: "field1",
          type: "xxxxxx"
        },
        target: {
          name: "field5",
          type: "xxxxxx"
        }
      }],
      sourceData,
      targetData
    };
  }
  getRelation() {
    const relation = this.mapping.current.state.relation;
    console.log(relation);
    const res = {};
    relation.map(item => {
      res[item.source.name] = item.target.name;
    });
    alert(JSON.stringify(res));
  }
  sameLine() {
    const {sourceData, targetData} = this.state;
    const len = sourceData.length > targetData.length ? targetData.length : sourceData.length;
    const relation = [];
    for(let i=0; i<len; i++ ) {
      relation.push({
        source: sourceData[i],
        target: targetData[i]
      });
    }
    this.setState({
      relation
    });
  }
  sameName() {
    const {sourceData, targetData} = this.state;
    const relation = [];
    sourceData.map(item => {
      targetData.map(n => {
        if(item.name === n.name) {
          relation.push({
            source: item,
            target: n
          });
        }
      });
    });
    this.setState({
      relation
    });
  }
  cancelRelation() {
    this.setState({
      relation: []
    });
  }
  render() {
    const option = {
      ref: this.mapping,
      sourceData: sourceData,
      targetTitle: {
        name: "自定义表头1",
        type: "自定义表头2"
      },
      targetData: targetData,
      relation: this.state.relation,
      // onDrawStart: (source, relation) => {
      //   console.log("onDrawStart: ", source, relation);
      // },
      // onDrawing: (source, relation) => {
      //   console.log("onDrawing: ", source, relation);
      // },
      // onDrawEnd: (source, relation) => {
      //   console.log("onDrawEnd: ", source, relation);
      // },
      onChange: () => {
        this.setState({
          sourceData: this.mapping.current.state.sourceData,
          targetData: this.mapping.current.state.targetData
        });
      }
    };
    return <div>
      <div>
        <div style={{
          width: 800
        }}>
          <FieldMapping {...option} />
          <br/>
          <button onClick={this.getRelation.bind(this)}>获取映射关系</button>
          <button onClick={this.sameLine.bind(this)}>同行关联</button>
          <button onClick={this.sameName.bind(this)}>同名关联</button>
          <button onClick={this.cancelRelation.bind(this)}>取消关联</button>
        </div>
      </div>
    </div>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('Test')
);