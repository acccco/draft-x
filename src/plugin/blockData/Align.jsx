/*
 * @Author: Aco
 * @Date: 2018-11-06 09:21:53
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-14 17:18:50
 * @Description: text-align
 */

import BaseBD from "./BaseBD";

export default class Align extends BaseBD {
  constructor() {
    super();
    this.name = "text-align";
    this.types = ["align-left", "align-center", "align-right"];
    this.nameSpace = "RichEditor";
  }
}
