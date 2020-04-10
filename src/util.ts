/*
 * @Author: yanjun.zsj
 * @Date: 2019-07-30 14:05:00
 * @LastEditors: yanjun.zsj
 * @LastEditTime: 2019-11-22 19:00:58
 */
/* @author yanjun.zsj
 * @date 2018.11
*/
// export const getStyleAttr = (obj, attr) => {
//   if(obj instanceof HTMLElement) {
//     if (obj.currentStyle) {
//       return obj.currentStyle[attr];
//     }else {
//       return document.defaultView.getComputedStyle(obj, null)[attr];
//     }
//   }
//   return "";
// };

import { OneRelation } from './types';

export const pxToNum = (text): number => {
  if (typeof text === 'string' && text.match(/(px)$/)) {
    const data = text.replace(/(px)$/, "");
    return Number(data);
  }
  return NaN;
};
export interface GetOffsetTypes {
  left: number;
  top: number;
}
export const getOffset = (ele: HTMLElement): GetOffsetTypes => {
  let element: HTMLElement = ele;
  let top = 0;
  let left = 0;
  while (element) {
    top += element.offsetTop;
    left += element.offsetLeft;
    element = element.offsetParent as HTMLElement;
  }
  return {
    left,
    top
  };
};
// 根据入参relation生成含线条坐标位置的relation
export const calCoord = (data = [], FieldMapping): OneRelation[] => {
  const baseXY = getOffset(FieldMapping.sourceCom.boxEle.offsetParent);
  const {
    source: {
      data: sourceData
    },
    target: {
      data: targetData
    }
  } = FieldMapping.props;
  return data.map(item => {
    let sourceNum = 0;
    let targetNum = 0;
    const sourceEle = FieldMapping.sourceCom.boxEle.querySelector('.column-content');
    const targetEle = FieldMapping.targetCom.boxEle.querySelector('.column-content');
    const sourceName = item.source.key;
    const targetName = item.target.key;
    sourceData.map((n, i) => {
      if (n.key === sourceName) {
        sourceNum = i;
      }
    });
    targetData.map((n, i) => {
      if (n.key === targetName) {
        targetNum = i;
      }
    });
    const sourcePoint = sourceEle.getElementsByTagName('li')[sourceNum] &&
      sourceEle.getElementsByTagName('li')[sourceNum].querySelector('.column-icon');
    const targetPoint = targetEle.getElementsByTagName('li')[targetNum] &&
      targetEle.getElementsByTagName('li')[targetNum].querySelector('.column-icon');
    item.source.x = getOffset(sourcePoint).left - baseXY.left + 6;
    item.source.y = getOffset(sourcePoint).top - baseXY.top + 6;
    item.target.x = getOffset(targetPoint).left - baseXY.left + 3;
    item.target.y = getOffset(targetPoint).top - baseXY.top + 6;
    return item;
  });
};
