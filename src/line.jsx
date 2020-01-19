/* @author yanjun.zsj
 * @date 2018.11
*/
import {Component} from 'react';
import PropTypes from 'prop-types';

const iconSize = [12, 12];
class Line extends Component {
  constructor(props) {
    super(props);
  }
  removeHandle() {
    this.props.removeRelation(this.props.data);
  }
  render() {
    const {
      startX = 0,
      startY = 0,
      endX = 0,
      endY = 0,
      currentRelation,
      data,
      edit,
      closeIcon
    } = this.props;
    return <g className={`path-end ${(currentRelation === data) ? "active" : ""} ${edit ? '' : 'disabled'}`} onMouseOver={() => {
      edit && this.props.toTop(this.props.data);
    }} onClick={() => {
      edit && this.removeHandle();
    }}>
      <path
        className="line"
        d={`M${startX}, ${startY} L${endX}, ${endY}`}
        markerEnd="url(#markerArrow)"
      ></path>
      <image
        className="icon-remove"
        x={(endX + startX - iconSize[0])/2}
        y={(endY + startY - iconSize[1])/2}
        width={iconSize[0]}
        height={iconSize[1]}
        xlinkHref={closeIcon || "//img.alicdn.com/tfs/TB1laCNsXYqK1RjSZLeXXbXppXa-200-200.png"} />
    </g>;
  }
}
Line.propTypes = {
  startX: PropTypes.number.isRequired,
  startY: PropTypes.number.isRequired,
  endX: PropTypes.number.isRequired,
  endY: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  toTop: PropTypes.func.isRequired,
  currentRelation: PropTypes.object.isRequired,
  removeRelation: PropTypes.func.isRequired,
  closeIcon: PropTypes.string
};
export default Line;