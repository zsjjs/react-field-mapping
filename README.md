# react-field-mapping

[![npm version](https://img.shields.io/npm/v/react-field-mapping.svg?style=flat)](https://www.npmjs.com/package/react-field-mapping)
[![download](https://img.shields.io/npm/dm/react-field-mapping.svg?style=flat)](https://www.npmjs.com/package/react-field-mapping)
![gzip size](http://img.badgesize.io/https://npmcdn.com/react-field-mapping/dist/fieldmapping.js?compression=gzip)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/zsjjs/react-field-mapping/master/LICENSE)

#### 基于react的表字段映射组件

### View the <a href="https://codepen.io/godIsMe/pen/NEOdXJ">Demo</a> and its <a href="https://github.com/zsjjs/react-field-mapping/blob/master/example/test.js">source</a> for more.

``` js
    import FieldMapping from 'react-field-mapping';
    const sourceData = new Array(7).fill().map((item, idx) => ({
      name: `field${idx + 1}`,
      type: 'string'
    }));
    const targetData = new Array(11).fill().map((item, idx) => ({
      name: `field${idx + 4}`,
      type: 'string'
    }));
    class App extends React.Component {
      render() {
        const option = {
          sourceData: sourceData,
          targetData: targetData,
          onChange: () => {
            this.setState({
              sourceData: this.mapping.current.state.sourceData,
              targetData: this.mapping.current.state.targetData
            });
          }
        };
        return <FieldMapping {...option} />
      }
    };
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
    <td>sourceTitle</td>
    <td>源数据表头</td>
    <td align="center">object{name, type}]</td>
    <td align="center">{name:"源表字段",type:"类型"}</td>
  </tr>
  <tr>
    <td>sourceData</td>
    <td>源数据表</td>
    <td align="center">array[{name, type}]</td>
    <td align="center">[]</td>
  </tr>
  <tr>
    <td>targetTitle</td>
    <td>目标数据表头</td>
    <td align="center">object{name, type}]</td>
    <td align="center">{name:"目标表字段",type:"类型"}</td>
  </tr>
  <tr>
    <td>targetData</td>
    <td>目标数据表</td>
    <td align="center">array[{name, type}]</td>
    <td align="center">[]</td>
  </tr>
  <tr>
    <td>isSort</td>
    <td>是否开启字段排序</td>
    <td align="center">boolean</td>
    <td align="center">true</td>
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
