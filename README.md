# react-field-mapping

[![npm version](https://img.shields.io/npm/v/react-field-mapping.svg?style=flat)](https://www.npmjs.com/package/react-field-mapping)
[![download](https://img.shields.io/npm/dm/react-field-mapping.svg?style=flat)](https://www.npmjs.com/package/react-field-mapping)
![gzip size](http://img.badgesize.io/https://npmcdn.com/react-field-mapping/dist/fieldmapping.js?compression=gzip)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/zsjjs/react-field-mapping/master/LICENSE)

#### 关系映射组件

### View the <a href="https://codepen.io/godIsMe/pen/xvgYdx">Demo</a> and its <a href="https://github.com/zsjjs/react-field-mapping/blob/master/example/test.js">source</a> for more.

使用中需要注意的一点是relation，是由组件内部控制的，所以是不受控的，连线后组件内部relation改变，连线也是组件内部控制。但是外部传入的relation是可以改变内部的relation，在组件内会监听传入的relation，可以在onChange的时候改变传入的relation，来达到受控的效果，如果onChange的时候不改变传入的relation，那么relation就是defaultRelation的效果。

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
    <td rowspan="4">source</td>
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
    <td>mutiple</td>
    <td>是否允许一个source连接多个target</td>
    <td align="center">boolean</td>
    <td align="center">false</td>
  </tr>
  <tr>
    <td rowspan="4">target</td>
    <td>data</td>
    <td align="center">目标表数据（受控）</td>
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
      表数据change监听，目前只有sort会触发，且开启sort时必须同步目标表数据后，sort才会生效
    </td>
    <td align="center">function</td>
    <td align="center">(sourceData) => {}</td>
  </tr>
  <tr>
    <td>mutiple</td>
    <td>是否允许多个source连接一个target</td>
    <td align="center">boolean</td>
    <td align="center">false</td>
  </tr>
  <tr>
    <td colspan="2">isSort</td>
    <td>是否开启字段排序</td>
    <td align="center">boolean</td>
    <td align="center">false</td>
  </tr>
  <tr>
    <td colspan="2">edit</td>
    <td>线条是否可以拖动/删除（如果需要预览态，isSort不能为true）</td>
    <td align="center">boolean</td>
    <td align="center">true</td>
  </tr>
  <tr>
    <td colspan="2">relation</td>
    <td>映射数据（不受控，但是不等同default，可以update）</td>
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
  <tr>
    <td colspan="2">closeIcon</td>
    <td>关闭线条的icon url</td>
    <td align="center">string</td>
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
