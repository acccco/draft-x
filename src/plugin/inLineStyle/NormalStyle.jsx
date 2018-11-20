/*
 * @Author: Aco
 * @Date: 2018-11-02 15:09:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 14:01:22
 * @Description: 一些自定义样式
 */

import BaseStyle from './BaseStyle';

export default class NormalStyle extends BaseStyle {
  constructor(map, isUnipue = false) {
    super(isUnipue);
    this.customStyleMap = map;
  }

  map(create) {
    return Object.keys(this.customStyleMap).map(key => create(key));
  }
}
