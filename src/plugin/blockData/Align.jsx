/*
 * @Author: Aco
 * @LastEditors: Aco
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
