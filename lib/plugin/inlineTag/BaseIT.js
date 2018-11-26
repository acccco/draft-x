"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

var _Base = _interopRequireDefault(require("../Base"));

var _util = require("../../util");

/*
 * @Author: Aco
 * @Date: 2018-11-02 15:04:44
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:14:23
 * @Description: 基础的标签插件，用于为选中区域外添加一个标签，该类为基础类，使用时需继承该类
 */
class BaseIT extends _Base.default {
  constructor() {
    super();
    this.entityType = "BaseIT";
    this.mutability = "MUTABLE";
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }

  strategy(contentBlock, callback, contentState) {
    (0, _util.findEntityRange)(contentBlock, callback, contentState, this.entityType);
  }
  /* eslint-disable */


  component() {
    return _react.default.createElement("span", null, "\u63D2\u4EF6\u5B9E\u4F8B\u9700\u8981 component \u65B9\u6CD5");
  }
  /* eslint-enable */

  /* eslint-disable */


  getEntity(editorState) {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const entityKey = (0, _util.getStartEntityKey)(editorState);
    if (!entityKey) return null;
    return contentState.getEntity(entityKey);
  }
  /* eslint-enable */


  toggle(data) {
    this.fire(editorState => {
      const {
        entityKey,
        editorState: newEditorState
      } = (0, _util.createNewEntity)(editorState, {
        entityType: this.entityType,
        mutability: this.mutability,
        data
      });
      return _draftJs.RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
    });
  }

}

exports.default = BaseIT;