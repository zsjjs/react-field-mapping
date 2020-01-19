/* @author yanjun.zsj
 * @date 2018.11
*/
import './fieldMapping.less';
import {Component} from 'react';
import SourceData from './SourceData.jsx';
import TargetData from './TargetData.jsx';
import DrawLines from './DrawLines.jsx';
import PropTypes from 'prop-types';
import { calCoord } from './util.js';
import _ from 'lodash';

class FieldMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relation: [],
      currentRelation: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.relation !== this.props.relation) {
      const relation = calCoord(_.assign([], nextProps.relation), this);
      this.changeRelation(relation, false);
    }
  }
  componentDidMount() {
    const relation = calCoord(_.assign([], this.props.relation), this);
    if(relation.length > 0) {
      this.changeRelation(relation, false);
    }
  }
  uniqWith(data) {
    return _.uniqWith(data, (n1, n2) => {
      return n1.key === n2.key;
    }).filter(item => !!item.key);
  }
  changeRelation(relation, isUpdate = true) {
    this.setState({
      relation
    }, () => {
      isUpdate && this.props.onChange && this.props.onChange(relation);
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
      if(n[type].key === item.key) {
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
  changeSource(oldIndex, newIndex) {
    const {
      source: {
        data: sourceData = [],
        onChange = () => {}
      }
    } = this.props;
    let data = _.assign([], sourceData);
    const item = data.slice(oldIndex, oldIndex + 1);
    data.splice(oldIndex, 1);
    const dataS = data.slice(0, newIndex);
    const dataE = data.slice(newIndex, data.length);
    data =  dataS.concat(item).concat(dataE);
    onChange(data);
    const relation = calCoord(_.assign([], this.props.relation), this);
    this.changeRelation(relation, false);
  }
  changeTarget(oldIndex, newIndex) {
    const {
      target: {
        data: targetData = [],
        onChange = () => {}
      }
    } = this.props;
    let data = _.assign([], targetData);
    const item = data.slice(oldIndex, oldIndex + 1);
    data.splice(oldIndex, 1);
    const dataS = data.slice(0, newIndex);
    const dataE = data.slice(newIndex, data.length);
    data =  dataS.concat(item).concat(dataE);
    onChange(data);
    const relation = calCoord(_.assign([], this.props.relation), this);
    this.changeRelation(relation, false);
  }
  render() {
    const { relation, iconStatus, currentRelation } = this.state;
    const {
      source: {
        data: sourceData = [],
        columns: sourceCols = [],
        mutiple: sourceMutiple = false
      },
      target: {
        data: targetData = [],
        columns: targetCols = [],
        mutiple: targetMutiple = false
      },
      className = "",
      style = {},
      isSort = false,
      onDrawStart,
      onDrawing,
      onDrawEnd,
      edit,
      closeIcon
    } = this.props;
    const sourceOpt = {
      ref: (me) => {this.sourceCom = me;},
      iconStatus,
      relation,
      columns: sourceCols,
      data: sourceData,
      currentRelation,
      isSort,
      edit,
      changeData: this.changeSource.bind(this),
      overActive: this.overActive.bind(this)
    };
    const targetOpt = {
      ref: (me) => {this.targetCom = me;},
      iconStatus,
      relation,
      columns: targetCols,
      data: targetData,
      currentRelation,
      isSort,
      edit,
      changeData: this.changeTarget.bind(this),
      overActive: this.overActive.bind(this)
    };
    const drawLinesOpt = {
      sourceData,
      targetData,
      sourceMutiple,
      targetMutiple,
      onDrawStart,
      onDrawing,
      onDrawEnd,
      relation,
      edit,
      closeIcon,
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
  source: PropTypes.shape({
    data: PropTypes.array, // required param key
    onChange: PropTypes.func, // 源表data改变后触发，目前只有排序会触发。isSort开启后，必须在外层同步。
    mutiple: PropTypes.bool, //是否允许一个source连接多个target
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
      align: PropTypes.string,
      render: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element
      ])
    }))
  }),
  target: PropTypes.shape({
    data: PropTypes.array, // required param key
    onChange: PropTypes.func, // 目标表data改变后触发，目前只有排序会触发。
    mutiple: PropTypes.bool, //是否允许多个source连接一个target
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
      align: PropTypes.string,
      render: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element
      ])
    }))
  }),
  relation: PropTypes.array,// [{source:{name, type}, target:{name, type}}], "param {source:{name},target:{name}} is required"
  isSort: PropTypes.bool,// 是否开启拖拽排序，default true
  onChange: PropTypes.func, // function(param= relation)
  onDrawStart: PropTypes.func,// function(params=source, relation)
  onDrawing: PropTypes.func,// function(params=source, relation)
  onDrawEnd: PropTypes.func,// function(params=source, relation)
  edit: PropTypes.bool, // 是否能操作线条编辑 default true
  closeIcon: PropTypes.string // 关闭线条的icon url，不传用默认的关闭按钮
};
FieldMapping.defaultProps = {
  relation: [],
  source: {
    data: [],
    onChange: () => {},
    columns: [],
    mutiple: false
  },
  target: {
    data: [],
    onChange: () => {},
    columns: [],
    mutiple: false
  },
  edit: true
};
export default FieldMapping;