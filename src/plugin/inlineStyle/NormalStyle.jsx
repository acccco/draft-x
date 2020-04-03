/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 使用自定义样式渲染选中文本
 */

import BaseIS from './BaseIS';

export default class NormalStyle extends BaseIS {
  constructor(map, isUnique = false) {
    super(isUnique);
    this.customStyleMap = map;
  }

  getKeys(editorState) {
    return super
      .getKeys(editorState)
      .filter(style => style in this.customStyleMap);
  }

  map(create) {
    return Object.keys(this.customStyleMap).map(key => create(key));
  }
}
