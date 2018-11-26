"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Base = _interopRequireDefault(require("../Base"));

var _util = require("../../util");

/*
 * @Author: Aco
 * @Date: 2018-11-06 09:21:53
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:16:14
 * @Description: description
 */
class BaseBS extends _Base.default {
  constructor() {
    super();
    this.name = "";
    this.nameSpace = "";
    this.types = [];
  }

  blockStyleFn(block) {
    const algin = block.getData().get(this.name) || "";
    return algin ? `${this.nameSpace}-${algin}` : "";
  }

  getKeys(editorState) {
    const key = (0, _util.getBlockData)(editorState).get(this.name);
    return new Set().add(key);
  }

  map(create) {
    return this.types.map(create);
  }

  toggle(type) {
    this.fire(editorState => {
      const blockData = (0, _util.getBlockData)(editorState);
      let toggleType = type;

      if (blockData.get(this.name) === type) {
        toggleType = "";
      }

      return (0, _util.setBlockData)(editorState, {
        [this.name]: toggleType
      });
    });
  }

}

exports.default = BaseBS;