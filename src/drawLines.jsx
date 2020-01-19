/* @author yanjun.zsj
 * @date 2018.11
*/
import {Component} from 'react';
import PropTypes from 'prop-types';
import { getOffset } from './util.js';
import Line from './line.jsx';
import _ from 'lodash';

const defaultState = {
  sourceData: {},
  startX: 0,
  startY: 0,
  drawing: false,
  endX: 0,
  endY: 0
};

class DrawLines extends Component {
  baseXY = {
    left: 0,
    top: 0
  }
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState
    };
  }
  componentDidMount() {
    const me = this;
    this.baseXY = getOffset(this.drawEle);
    const box = document.querySelector('.react-field-mapping-box');
    let scrollTop = 0;
    let scrollLeft = 0;
    let sourceDom = null;
    document.documentElement.onmousedown = (event) => {
      const eventDom = event.target;
      sourceDom = eventDom;
      const className = eventDom && eventDom.className;
      if (className && typeof className === "string" && className.indexOf("source-column-icon") > -1) {
        event.preventDefault();
        const relation = _.assign([], me.props.relation);
        if(!me.props.sourceMutiple && _.find(relation, (o) => {
          return o.source.key === me.domOperate(eventDom).key;
        })) {
          return;
        }
        if(this.baseXY !== getOffset(this.drawEle)) {
          this.baseXY = getOffset(this.drawEle);
        }
        let scrollEle = box;
        document.body.classList.add("user-select-none");
        const sourceData = _.find(me.props.sourceData, (o) => {
          return o.key === this.domOperate(eventDom).key;
        });
        me.props.onDrawStart(sourceData, me.props.relation);
        me.props.changeIconStatus(sourceData);
        me.setState({
          startX: this.domOperate(eventDom).left,
          startY: this.domOperate(eventDom).top,
          endX: this.domOperate(eventDom).left,
          endY: this.domOperate(eventDom).top,
          drawing: true,
          sourceData
        });
        while(scrollEle.tagName !== 'BODY') {
          scrollTop += scrollEle.scrollTop;
          scrollLeft += scrollEle.scrollLeft;
          scrollEle = scrollEle.parentElement;
        }
      }
    };
    document.documentElement.onmousemove = (event) => {
      if (this.state.drawing) {
        me.props.onDrawing(me.state.sourceData, me.props.relation);
        me.setState({
          endX: event.pageX - this.baseXY.left + scrollLeft,
          endY: event.pageY - this.baseXY.top + scrollTop
        });
      }
    };
    document.documentElement.onmouseup = (event) => {
      document.body.classList.remove("user-select-none");
      const { startX, startY, sourceData } = me.state;
      const eventDom = event.target;
      const className = eventDom && eventDom.className;
      if (className && typeof className === "string" && className.indexOf("target-column-icon") > -1) {
        const relation = _.assign([], me.props.relation);
        if(!me.props.targetMutiple && _.find(relation, (o) => {// target不允许映射多次
          return o.target.key === me.domOperate(eventDom).key;
        }) || _.find(relation, (o) => { // 过滤连线已存在的情况
          return o.target.key === me.domOperate(eventDom).key && o.source.key === me.domOperate(sourceDom).key;
        })) {
          me.props.changeIconStatus();
          me.setState({...defaultState});
          sourceDom = null;
          return;
        }
        const targetData = _.find(me.props.targetData, (o) => {
          return o.key === me.domOperate(eventDom).key;
        });
        relation.push({
          source: {
            x: startX,
            y: startY,
            ...sourceData
          },
          target: {
            x: me.domOperate(eventDom).left,
            y: me.domOperate(eventDom).top,
            ...targetData
          }
        });
        me.props.onDrawEnd(sourceData, targetData, relation);
        me.props.onChange(relation);
        sourceDom = null;
      }
      me.props.changeIconStatus();
      me.setState({...defaultState});
      scrollTop = 0;
      scrollLeft = 0;
    };
  }
  domOperate(eventDom) {
    return {
      left: getOffset(eventDom).left - this.baseXY.left + 3,
      top: getOffset(eventDom).top - this.baseXY.top + 6,
      key: eventDom.offsetParent.getAttribute('data-key')
    };
  }
  removeRelation(removeNode) {
    const relation = _.assign([], this.props.relation);
    _.remove(relation, item => {
      return (item === removeNode);
    });
    this.props.onChange(relation);
  }
  topLine(item) {
    const relation = _.assign([], this.props.relation);
    _.remove(relation, (n) => {
      return n === item;
    });
    relation.push(item);
    this.props.onChange(relation);
  }
  render() {
    const { startX, startY, drawing, endX, endY } = this.state;
    const { relation, currentRelation, edit } = this.props;
    return <div className="lines-area" ref={me => {this.drawEle = me;}}>
      <svg width="100%" height="100%" version="1.1"
           xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            className="path"
            id="markerArrow"
            markerWidth="12"
            markerHeight="12"
            refX="6"
            refY="6"
            orient="auto">
            <path d="M2,4 L5,6 L2,8 L9,6 L2,4" className="arrow" />
          </marker>
        </defs>
        <g>
          {relation.filter(item => {
            return item.source.key && item.target.key;
          }).map(item => <Line
            key={`${item.source.key}-${item.target.key}`}
            startX={item.source.x}
            startY={item.source.y}
            endX={item.target.x}
            endY={item.target.y}
            data={item}
            edit={edit}
            toTop={this.topLine.bind(this)}
            currentRelation={currentRelation}
            removeRelation={this.removeRelation.bind(this)}
          />)}
        </g>
        {drawing && <g className="path">
            <path
              className="line"
              d={`M${startX}, ${startY} L${endX}, ${endY}`}
              strokeDasharray="5,5"
              markerEnd="url(#markerArrow)"
            />
        </g>}
      </svg>

    </div>;
  }
}

DrawLines.propTypes = {
  sourceData: PropTypes.array.isRequired,
  targetData: PropTypes.array.isRequired,
  sourceMutiple: PropTypes.bool.isRequired,
  targetMutiple: PropTypes.bool.isRequired,
  onDrawStart: PropTypes.func,
  onDrawing: PropTypes.func,
  onDrawEnd: PropTypes.func,
  relation: PropTypes.array.isRequired,
  edit: PropTypes.bool.isRequired,
  currentRelation: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  changeIconStatus: PropTypes.func.isRequired
};
DrawLines.defaultProps = {
  onDrawStart: () => {},
  onDrawing: () => {},
  onDrawEnd: () => {}
};
export default DrawLines;