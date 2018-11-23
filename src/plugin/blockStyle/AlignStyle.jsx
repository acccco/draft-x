/*
 * @Author: Aco
 * @Date: 2018-11-06 09:21:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 17:18:50
 * @Description: description
 */

import BaseBS from "./BaseBS";

export default class AlignStyle extends BaseBS {
  constructor() {
    super();
    this.name = "text-align";
    this.types = ["align-left", "align-center", "align-right"];
    this.nameSpace = "RichEditor";
  }
}
