# react-field-mapping

[![npm version](https://img.shields.io/npm/v/react-field-mapping.svg?style=flat)](https://www.npmjs.com/package/react-field-mapping)
[![download](https://img.shields.io/npm/dm/react-field-mapping.svg?style=flat)](https://www.npmjs.com/package/react-field-mapping)
![gzip size](http://img.badgesize.io/https://npmcdn.com/react-field-mapping/dist/fieldmapping.js?compression=gzip)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/zsjjs/react-field-mapping/master/LICENSE)

#### 基于react的表字段映射组件

### View the <a href="https://codepen.io/godIsMe/pen/NEOdXJ">Demo</a> and its <a href="https://github.com/zsjjs/react-field-mapping/blob/master/example/test.js">source</a> for more.

``` js
    import FieldMapping from 'react-field-mapping';
    
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
```

##### API

<table border="1">
    <tr>
      <th>参数</th>
      <th>说明</th>
      <th align="center">类型</th>
      <th align="center">默认值</th>
    </tr>
    <tr>
      <td>className</td>
      <td>自定义class</td>
      <td align="center">string</td>
      <td align="center">""</td>
    </tr>
    <tr>
      <td>style</td>
      <td>自定义style</td>
      <td align="center">object</td>
      <td align="center">{}</td>
    </tr>
    <tr>
      <td>sourceData</td>
      <td>源数据表</td>
      <td align="center">array[{name, type}]</td>
      <td align="center">[]</td>
    </tr>
    <tr>
      <td>targetData</td>
      <td>自定义style</td>
      <td align="center">array[{name, type}]</td>
      <td align="center">[]</td>
    </tr>
    <tr>
      <td>relation</td>
      <td>默认已映射数据</td>
      <td align="center">array[{source:{name,type}, target:{name,type}}]</td>
      <td align="center">[]</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>映射变化监听</td>
      <td align="center">function(relation)</td>
      <td align="center">-</td>
    </tr>
    <tr>
      <td>onDrawStart</td>
      <td>开始关联监听</td>
      <td align="center">function(source, relation)</td>
      <td align="center">-</td>
    </tr>
    <tr>
      <td>onDrawing</td>
      <td>关联进行中监听</td>
      <td align="center">object</td>
      <td align="center">-</td>
    </tr>
    <tr>
      <td>onDrawEnd</td>
      <td>关联结束监听</td>
      <td align="center">function(source, relation)</td>
      <td align="center">-</td>
    </tr>
</table>
