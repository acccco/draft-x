/*
 * @Author: Aco
 * @Date: 2018-11-02 15:09:59
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:14:35
 * @Description: 一些自定义样式
 */

import BaseIS from "./BaseIS";

export default class NormalStyle extends BaseIS {
  constructor(map, isUnipue = false) {
    super(isUnipue);
    this.customStyleMap = map;
  }

  map(create) {
    return Object.keys(this.customStyleMap).map(key => create(key));
  }
}
