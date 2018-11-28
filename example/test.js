const data = [{
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
}, {
  name: "field7",
  type: "string"
}];

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  getRelation() {
    const relation = JSON.stringify(this.mapping.state.relation);
    alert(relation);
  }
  render() {
    const option = {
      ref: (me) => {this.mapping = me;},
      sourceData: data,
      targetData: data,
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
    </div>;
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('Test')
);