/*
 * @Author: yanjun.zsj
 * @LastEditors  : yanjun.zsj
 * @Date: 2019-03-11 16:43:26
 * @LastEditTime : 2020-01-19 15:21:57
 */
/* eslint-disable */
const sourceCols = [
  { title: '源表字段', key: 'name', width: '80px' },
  { title: '类型', key: 'type', width: '100px' },
  { title: '描述', key: 'desc', width: '150px' },
  { title: '操作', key: 'operate', width: '80px', align: 'center', render: (value, record) => {
    return <a href="#" onClick={
      () => {
        alert(JSON.stringify(record));
      }
    }>查看详情</a>;
  }}
];
const targetCols = [
  { title: '目标表字段', key: 'name', width: '50%' },
  { title: '类型', key: 'type', width: '50%' }
];
class App extends React.PureComponent {
  mapping = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      relation: [{
        source: {
          name: "field1",
          type: "xxxxxx",
          key: "field1"
        },
        target: {
          name: "field5",
          type: "xxxxxx",
          key: "field5"
        }
      }],
      sourceData: new Array(7).fill().map((item, idx) => ({
        name: `field${idx + 1}`,
        type: 'string',
        key: `field${idx + 1}`,
        desc: `这是表字段field${idx + 1}`,
        operate: `测试${idx}`
      })),
      targetData: new Array(11).fill().map((item, idx) => ({
        name: `field${idx + 4}`,
        type: 'string',
        key: `field${idx + 4}`
      }))
    };
  }
  getRelation() {
    const relation = this.state.relation;
    alert(JSON.stringify(relation));
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
        if(item.key === n.key) {
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
    const { sourceData, targetData } = this.state;
    const option = {
      source: {
        data: sourceData,
        onChange: (data) => { // isSort开启后，必须开启才会生效
          this.setState({
            sourceData: data
          });
        },
        columns: sourceCols,
        mutiple: true
      },
      target: {
        data: targetData,
        onChange: (data) => {
          this.setState({
            targetData: data
          });
        },
        columns: targetCols,
        mutiple: true
      },
      relation: this.state.relation,
      // onDrawStart: (source, relation) => {
      //   console.log("onDrawStart: ", source, relation);
      // },
      // onDrawing: (source, relation) => {
      //   console.log("onDrawing: ", source, relation);
      // },
      // onDrawEnd: (source, target, relation) => {
      //   console.log("onDrawEnd: ", source, relation);
      // },
      onChange: (relation) => {
        this.setState({
          relation
        });
      },
      isSort: true

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