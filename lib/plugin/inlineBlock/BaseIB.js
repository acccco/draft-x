"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

var _Base = _interopRequireDefault(require("../Base"));

var _util = require("../../util");

/*
 * @Author: Aco
 * @Date: 2018-11-02 15:04:44
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 17:07:55
 * @Description: 用于在光标区域添加一个 inline-block
 */
class BaseIB extends _Base.default {
  constructor() {
    super();
    this.entityType = "BaseIB";
    this.mutability = "IMMUTABLE";
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }
  /* eslint-disable */


  component() {
    _react.default.createElement("span", null, "BaseIB");
  }
  /* eslint-enable */


  strategy(contentBlock, callback, contentState) {
    (0, _util.findEntityRange)(contentBlock, callback, contentState, this.entityType);
  }

  toggle(data) {
    this.fire(editorState => {
      // eslint-disable-next-line
      let {
        entityKey,
        contentState,
        editorState: newEditorState
      } = (0, _util.createNewEntity)(editorState, {
        entityType: this.entityType,
        mutability: this.mutability,
        data
      });
      let selection = newEditorState.getSelection();
      newEditorState = _draftJs.EditorState.push(editorState, _draftJs.Modifier.removeRange(contentState, selection), "remove-range");
      selection = newEditorState.getSelection();
      contentState = _draftJs.Modifier.insertText(contentState, selection, " ");
      contentState = _draftJs.Modifier.insertText(contentState, selection, "I", "", entityKey);
      return _draftJs.EditorState.push(newEditorState, contentState, "insert-characters");
    });
  }

}

exports.default = BaseIB;