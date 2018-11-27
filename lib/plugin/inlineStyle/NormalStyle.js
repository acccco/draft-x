"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseIS = _interopRequireDefault(require("./BaseIS"));

/*
 * @Author: Aco
 * @Date: 2018-11-02 15:09:59
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-27 11:13:01
 * @Description: 一些自定义样式
 */
class NormalStyle extends _BaseIS.default {
  constructor(map, isUnipue = false) {
    super(isUnipue);
    this.customStyleMap = map;
  }

  getKeys(editorState) {
    return super.getKeys(editorState).filter(style => style in this.customStyleMap);
  }

  map(create) {
    return Object.keys(this.customStyleMap).map(key => create(key));
  }

}

exports.default = NormalStyle;