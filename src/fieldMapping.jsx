/* @author yanjun.zsj
 * @date 2018.11
*/
import './fieldMapping.less';
import {Component} from 'react';
import SourceData from './sourceData.jsx';
import TargetData from './targetData.jsx';
import DrawLines from './drawLines.jsx';
import PropTypes from 'prop-types';
import { calCoord } from './util.js';
import _ from 'lodash';

class FieldMapping extends Component {
  constructor(props) {
    super(props);
    const sourceData = _.uniqWith(props.sourceData, (n1, n2) => {
      return n1.name === n2.name;
    }).map(item => {
      item.edit = false;
      return item;
    });
    const targetData = _.uniqWith(props.targetData, (n1, n2) => {
      return n1.name === n2.name;
    });
    this.state = {
      relation: [],
      sourceData,
      targetData,
      currentRelation: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.relation !== this.props.relation) {
      const relation = calCoord(_.assign([], nextProps.relation), this);
      this.changeRelation(relation);
    }
  }
  componentDidMount() {
    const relation = calCoord(_.assign([], this.props.relation), this);
    this.changeRelation(relation);
  }
  changeRelation(relation) {
    this.setState({
      relation
    }, () => {
      this.props.onChange && this.props.onChange(relation);
    });
  }
  changeIconStatus(iconStatus) {
    this.setState({
      iconStatus
    });
  }
  overActive(item, type, active) {
    const relation = _.assign([], this.state.relation);
    let currentRelation = {};
    relation.map(n => {
      if(n[type].name === item.name) {
        if(active === "enter") {
          currentRelation = n;
          return;
        }else if (active === "leave") {
          currentRelation = {};
        }
      }
    });
    this.setState({
      currentRelation
    });
  }
  changeSource(oldIndex, newIndex, type) {
    const data = {};
    data[type] = _.assign([], this.state[type]);
    const item = data[type].slice(oldIndex, oldIndex + 1);
    data[type].splice(oldIndex, 1);
    const dataS = data[type].slice(0, newIndex);
    const dataE = data[type].slice(newIndex, data[type].length);
    data[type] =  dataS.concat(item).concat(dataE);
    this.setState(data, () => {
      const relation = calCoord(_.assign([], this.props.relation), this);
      this.changeRelation(relation);
    });
  }
  render() {
    const { relation, iconStatus, sourceData, targetData, currentRelation } = this.state;
    const {
      className = "",
      style = {},
      sourceTitle = {
        name: "源表字段",
        type: "类型"
      },
      targetTitle = {
        name: "目标表字段",
        type: "类型"
      },
      isSort = true,
      onDrawStart,
      onDrawing,
      onDrawEnd
    } = this.props;

    const sourceOpt = {
      ref: (me) => {this.sourceCom = me;},
      iconStatus,
      relation,
      sourceTitle,
      data: sourceData,
      currentRelation,
      isSort,
      changeSource: this.changeSource.bind(this),
      overActive: this.overActive.bind(this)
    };
    const targetOpt = {
      ref: (me) => {this.targetCom = me;},
      iconStatus,
      relation,
      targetTitle,
      data: targetData,
      currentRelation,
      isSort,
      changeSource: this.changeSource.bind(this),
      overActive: this.overActive.bind(this)
    };
    const drawLinesOpt = {
      sourceData,
      targetData,
      onDrawStart,
      onDrawing,
      onDrawEnd,
      relation,
      currentRelation,
      onChange: this.changeRelation.bind(this),
      changeIconStatus: this.changeIconStatus.bind(this)
    };
    return <div style={style} className={`react-field-mapping-box ${className}`}>
      <SourceData {...sourceOpt} />
      <TargetData {...targetOpt} />
      <DrawLines {...drawLinesOpt} />
    </div>;
  }
}

FieldMapping.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  sourceTitle: PropTypes.object, // 源表表头内容, default {name:"源头表字段",type:"类型"}
  sourceData: PropTypes.array,// default [{name,type}] required param name
  targetTitle: PropTypes.object, // 目标表表头内容, default {name:"目标表字段",type:"类型"}
  targetData: PropTypes.array,// default [{name,type}] required param name
  relation: PropTypes.array,// [{source:{name, type}, target:{name, type}}], "param {source:{name},target:{name}} is required"
  isSort: PropTypes.bool,// 是否开启拖拽排序，default true
  onChange: PropTypes.func, // function(param= relation)
  onDrawStart: PropTypes.func,// function(params=source, relation)
  onDrawing: PropTypes.func,// function(params=source, relation)
  onDrawEnd: PropTypes.func// function(params=source, relation)
};
export default FieldMapping;