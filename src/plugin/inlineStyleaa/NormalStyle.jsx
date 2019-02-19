/*
 * @Author: Aco
 * @Date: 2018-11-02 15:09:59
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-27 11:13:01
 * @Description: 一些自定义样式
 */

import BaseIS from './BaseIS';

export default class NormalStyle extends BaseIS {
  constructor(map, isUnipue = false) {
    super(isUnipue);
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
