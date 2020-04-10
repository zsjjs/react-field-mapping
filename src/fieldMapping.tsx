/* @author yanjun.zsj
 * @date 2018.11
*/
import './fieldMapping.less';
import React from 'react';
import SourceData from './sourceData';
import TargetData from './targetData';
import DrawLines from './drawLines';
import { calCoord } from './util';
import _ from 'lodash';
import {
  FieldMappingProps,
  FieldMappingState,
  DataTypes
} from './types';


class FieldMapping extends React.Component<FieldMappingProps, FieldMappingState> {
  sourceCom: React.Ref<FieldMapping>
  targetCom: React.Ref<FieldMapping>

  static defaultProps = {
    relation: [],
    source: {
      data: [],
      onChange: (): void => {},
      columns: [],
      mutiple: false
    },
    target: {
      data: [],
      onChange: (): void => {},
      columns: [],
      mutiple: false
    },
    edit: true
  }

  constructor(props: FieldMappingProps) {
    super(props);
    this.state = {
      relation: [],
      currentRelation: {}
    };
  }

  componentWillReceiveProps(nextProps: FieldMappingProps): void {
    if (nextProps.relation !== this.props.relation) {
      const relation = calCoord(_.assign([], nextProps.relation), this);
      this.changeRelation(relation, false);
    }
  }
  componentDidMount(): void {
    const relation = calCoord(_.assign([], this.props.relation), this);
    if(relation.length > 0) {
      this.changeRelation(relation, false);
    }
  }
  uniqWith(data): DataTypes[] {
    return _.uniqWith(data, (n1, n2) => {
      return n1.key === n2.key;
    }).filter(item => !!item.key);
  }

  changeRelation(relation, isUpdate = true): void {
    this.setState({
      relation
    }, () => {
      isUpdate && this.props.onChange && this.props.onChange(relation);
    });
  }
  changeIconStatus(iconStatus): void{
    this.setState({
      iconStatus
    });
  }
  overActive(item, type, active): void {
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
  changeSource(oldIndex, newIndex): void {
    const {
      source: {
        data: sourceData = [],
        onChange = (): void => {}
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
  changeTarget(oldIndex, newIndex): void {
    const {
      target: {
        data: targetData = [],
        onChange = (): void => {}
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
  render(): React.ReactElement {
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
      ref: (me): void => {this.sourceCom = me;},
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
      ref: (me): void => {this.targetCom = me;},
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
export default FieldMapping;