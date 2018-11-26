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
 * @Date: 2018-11-06 12:21:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-16 16:02:36
 * @Description: 为选中区域移除标签
 */
class RemoveTag extends _Base.default {
  toggle() {
    this.fire(editorState => _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), null));
  }

}

exports.default = RemoveTag;