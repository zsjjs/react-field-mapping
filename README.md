# react-field-mapping

[![npm version](https://img.shields.io/npm/v/react-field-mapping.svg?style=flat)](https://www.npmjs.com/package/react-field-mapping)
[![download](https://img.shields.io/npm/dm/react-field-mapping.svg?style=flat)](https://www.npmjs.com/package/react-field-mapping)
![gzip size](http://img.badgesize.io/https://npmcdn.com/react-field-mapping/dist/fieldmapping.js?compression=gzip)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/zsjjs/react-field-mapping/master/LICENSE)

#### 基于react的表字段映射组件

### View the <a href="https://codepen.io/godIsMe/pen/xvgYdx">Demo</a> and its <a href="https://github.com/zsjjs/react-field-mapping/blob/master/example/test.js">source</a> for more.


### API

#### FieldMapping

<table border="1">
  <tr>
    <th colspan="2">参数</th>
    <th>说明</th>
    <th align="center">类型</th>
    <th align="center">默认值</th>
  </tr>
  <tr>
    <td colspan="2">className</td>
    <td>自定义class</td>
    <td align="center">string</td>
    <td align="center">""</td>
  </tr>
  <tr>
    <td colspan="2">style</td>
    <td>自定义style</td>
    <td align="center">object</td>
    <td align="center">{}</td>
  </tr>
  <tr>
    <td rowspan="3">source</td>
    <td>data</td>
    <td align="center">源表数据（受控）</td>
    <td align="center">array</td>
    <td align="center">[]</td>
  </tr>
  <tr>
    <td>columns</td>
    <td>表格列的配置描述，具体项见下表</td>
    <td align="center">ColumnProps[]</td>
    <td align="center">[]</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>
      表数据change监听，目前只有sort会触发，且开启sort时必须同步源表数据后，sort才会生效
    </td>
    <td align="center">function</td>
    <td align="center">(sourceData) => {}</td>
  </tr>
  <tr>
    <td colspan="2">isSort</td>
    <td>是否开启字段排序</td>
    <td align="center">boolean</td>
    <td align="center">true</td>
  </tr>
  <tr>
    <td colspan="2">relation</td>
    <td>默认已映射数据</td>
    <td align="center">array[{source:{name,type}, target:{name,type}}]</td>
    <td align="center">[]</td>
  </tr>
  <tr>
    <td colspan="2">onChange</td>
    <td>关联变化监听</td>
    <td align="center">function(relation)</td>
    <td align="center">-</td>
  </tr>
  <tr>
    <td colspan="2">onDrawStart</td>
    <td>开始关联监听</td>
    <td align="center">function(source, relation)</td>
    <td align="center">-</td>
  </tr>
  <tr>
    <td colspan="2">onDrawing</td>
    <td>关联进行中监听</td>
    <td align="center">object</td>
    <td align="center">-</td>
  </tr>
  <tr>
    <td colspan="2">onDrawEnd</td>
    <td>关联结束监听</td>
    <td align="center">function(source, relation)</td>
    <td align="center">-</td>
  </tr>
</table>

#### Column

##### 列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

<table border="1">
  <tr>
    <th colspan="2">参数</th>
    <th>说明</th>
    <th align="center">类型</th>
    <th align="center">默认值</th>
  </tr>
  <tr>
    <td colspan="2">align</td>
    <td>设置列的对齐方式</td>
    <td align="center">'left' | 'right' | 'center'</td>
    <td align="center">‘left</td>
  </tr><tr>
    <td colspan="2">key</td>
    <td>列数据在数据项中对应的 key</td>
    <td align="center">string</td>
    <td align="center"></td>
  </tr><tr>
    <td colspan="2">render</td>
    <td>生成复杂数据的渲染函数，参数分别为当前行的值</td>
    <td align="center">
      Function(text, record, index) {} | string | Element
    </td>
    <td align="center"></td>
  </tr><tr>
    <td colspan="2">title</td>
    <td>列头显示文字</td>
    <td align="center">string</td>
    <td align="center"></td>
  </tr>
  <tr>
    <td colspan="2">width</td>
    <td>列宽度</td>
    <td align="center">string</td>
    <td align="center">'100px'</td>
  </tr>
</table> 
