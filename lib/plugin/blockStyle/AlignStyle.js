"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseBS = _interopRequireDefault(require("./BaseBS"));

/*
 * @Author: Aco
 * @Date: 2018-11-06 09:21:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 17:18:50
 * @Description: description
 */
class AlignStyle extends _BaseBS.default {
  constructor() {
    super();
    this.name = "text-align";
    this.types = ["align-left", "align-center", "align-right"];
    this.nameSpace = "RichEditor";
  }

}

exports.default = AlignStyle;