const sourceData = [{
  name: "field1",
  type: "string"
}, {
  name: "field2",
  type: "string"
}, {
  name: "field3",
  type: "string"
}, {
  name: "field4",
  type: "string"
}, {
  name: "field5",
  type: "string"
}, {
  name: "field6",
  type: "string"
}];
const targetData = [{
  name: "field4",
  type: "string"
}, {
  name: "field5",
  type: "string"
}, {
  name: "field6",
  type: "string"
}];

class App extends React.Component {
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
      }]
    };
  }
  getRelation() {
    const relation = this.mapping.state.relation;
    console.log(relation);
    const res = {};
    relation.map(item => {
      res[item.source.name] = item.target.name;
    });
    alert(JSON.stringify(res));
  }
  sameLine() {
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
  render() {
    const option = {
      ref: (me) => {this.mapping = me;},
      sourceData: sourceData,
      targetData: targetData,
      relation: this.state.relation
      // onDrawStart: (source, relation) => {
      //   console.log("onDrawStart: ", source, relation);
      // },
      // onDrawing: (source, relation) => {
      //   console.log("onDrawing: ", source, relation);
      // },
      // onDrawEnd: (source, relation) => {
      //   console.log("onDrawEnd: ", source, relation);
      // },
      // onChange: (relation) => {
      //   console.log("onChange", relation);
      // }
    };
    return <div style={{
      width: 1000
    }}>
      <FieldMapping {...option} />
      <button onClick={this.getRelation.bind(this)}>获取映射关系</button>
      <button onClick={this.sameLine.bind(this)}>同行关联</button>
      <button onClick={this.sameName.bind(this)}>同名关联</button>
    </div>;
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('Test')
);