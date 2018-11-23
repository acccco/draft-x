/*
 * @Author: Aco
 * @Date: 2018-11-06 09:21:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 17:18:01
 * @Description: description
 */

import BaseBS from "./BaseBS";

export default class AlignStyle extends BaseBS {
  constructor() {
    super();
    this.name = "block-float";
    this.types = ["float-left", "float-right"];
    this.nameSpace = "RichEditor";
  }
}
