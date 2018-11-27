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
 * @Date: 2018-11-02 15:03:10
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-27 11:12:22
 * @Description: 基础的样式插件类，为选中区域添加样式，该类为基础类，使用时需继承该类
 */
class BaseIS extends _Base.default {
  constructor(unique = true) {
    super();
    this.unique = unique;
    this.customStyleMap = {};
  }

  getKeys(editorState) {
    return editorState.getCurrentInlineStyle();
  }

  toggle(styleName) {
    this.fire(editorState => {
      // 获得当前选区
      const selection = editorState.getSelection();
      let nextContentState = editorState.getCurrentContent(); // 样式集是否仅仅引用一个样式

      if (this.unique) {
        // 移除当前类的样式集，避免重复赋同类型的值
        nextContentState = Object.keys(this.customStyleMap).reduce((contentState, style) => _draftJs.Modifier.removeInlineStyle(contentState, selection, style), nextContentState);
      } // 获得当前选取内的文本样式，用于判断是否有当前样式


      const currentStyle = editorState.getCurrentInlineStyle(); // 移除或添加当前选取的样式

      if (currentStyle.has(styleName)) {
        nextContentState = _draftJs.Modifier.removeInlineStyle(nextContentState, selection, styleName);
      } else {
        nextContentState = _draftJs.Modifier.applyInlineStyle(nextContentState, selection, styleName);
      } // 应用变化


      return _draftJs.EditorState.push(editorState, nextContentState, 'change-inline-style');
    });
  }

}

exports.default = BaseIS;