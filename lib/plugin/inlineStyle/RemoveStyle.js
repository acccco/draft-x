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
 * @Date: 2018-11-07 09:59:17
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:14:54
 * @Description: 为选中区域移除样式
 */
class RemoveStyle extends _Base.default {
  toggle() {
    this.fire(editorState => {
      const styles = editorState.getCurrentInlineStyle(); // 获得当前选区

      const selection = editorState.getSelection();
      let nextContentState = editorState.getCurrentContent(); // 移除当前类的样式集

      nextContentState = styles.reduce((contentState, style) => _draftJs.Modifier.removeInlineStyle(contentState, selection, style), nextContentState); // 应用变化

      return _draftJs.EditorState.push(editorState, nextContentState, "change-inline-style");
    });
  }

}

exports.default = RemoveStyle;