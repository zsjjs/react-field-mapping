/* @author yanjun.zsj
 * @date 2018.11
*/
import {Component} from 'react';
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
  constructor(props) {
    super(props);
    this.state = {
      relation:[],
      baseXY:{
        left: 0,
        top: 0
      },
      ...defaultState
    };
  }
  componentDidMount() {
    const me = this;
    const baseXY = getOffset(this.drawEle);
    this.setState({
      baseXY
    });
    document.documentElement.onmousedown = (event) => {
      const eventDom = event.target;
      const className = eventDom && eventDom.className;
      if (className && typeof className === "string" && className.indexOf("source-column-icon") > -1) {
        event.preventDefault();
        document.body.classList.add("user-select-none");
        const sourceData = _.find(me.props.sourceData, (o) => {
          return o.name === this.domOperate(eventDom).fieldName;
        });
        me.props.onDrawStart && me.props.onDrawStart(sourceData, me.props.relation);
        me.props.changeIconStatus(sourceData);
        me.setState({
          startX: this.domOperate(eventDom).left,
          startY: this.domOperate(eventDom).top,
          endX: this.domOperate(eventDom).left,
          endY: this.domOperate(eventDom).top,
          drawing: true,
          sourceData
        });
      }
    };
    document.documentElement.onmousemove = (event) => {
      if (this.state.drawing) {
        me.props.onDrawing && me.props.onDrawing(me.state.sourceData, me.props.relation);
        me.setState({
          endX: event.pageX - baseXY.left,
          endY: event.pageY - baseXY.top
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
        if(_.find(relation, (o) => {
          return o.target.name === me.domOperate(eventDom).fieldName;
        })) {
          me.props.changeIconStatus();
          me.setState({...defaultState});
          return;
        }
        const targetData = _.find(me.props.targetData, (o) => {
          return o.name === me.domOperate(eventDom).fieldName;
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
        me.props.onDrawEnd && me.props.onDrawEnd(sourceData, targetData, relation);
        me.props.onChange(relation);
      }
      me.props.changeIconStatus();
      me.setState({...defaultState});
    };
  }
  domOperate(eventDom) {
    return {
      left: getOffset(eventDom).left - this.state.baseXY.left + 6,
      top: getOffset(eventDom).top - this.state.baseXY.top + 6,
      fieldName: eventDom.offsetParent.getAttribute('data-key')
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
    const { relation, currentRelation } = this.props;
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
          {relation.map(item => <Line
            key={`${item.source.name}-${item.target.name}`}
            startX={item.source.x}
            startY={item.source.y}
            endX={item.target.x}
            endY={item.target.y}
            data={item}
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

export default DrawLines;