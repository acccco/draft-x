"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.default = void 0;

var _draftJs = require("draft-js");

var _Base = _interopRequireDefault(require("../Base"));

/*
 * @Author: Aco
 * @Date: 2018-11-07 10:45:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 10:29:32
 * @Description: 撤回
 */
class Undo extends _Base.default {
  toggle() {
    this.fire(editorState => _draftJs.EditorState.undo(editorState));
  }

}

exports.default = Undo;