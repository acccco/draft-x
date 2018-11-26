"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJs = require("draft-js");

var _Base = _interopRequireDefault(require("../Base"));

/*
 * @Author: Aco
 * @Date: 2018-11-07 10:45:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-16 15:56:09
 * @Description: 复原
 */
class Redo extends _Base.default {
  toggle() {
    this.fire(editorState => _draftJs.EditorState.redo(editorState));
  }

}

exports.default = Redo;