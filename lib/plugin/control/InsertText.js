"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

var _Base = _interopRequireDefault(require("../Base"));

var _util = require("../../util");

/*
 * @Author: Aco
 * @Date: 2018-11-07 13:22:13
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:15:46
 * @Description: 在光标区域插入特定的文本
 */
class Insert extends _Base.default {
  constructor(textList = []) {
    super();
    this.textList = textList;
    this.entityType = "Insert";
    this.entityKey = "";
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }

  init(getEditorState, applyChange) {
    super.init(getEditorState, applyChange);
    this.fire(editorState => {
      const {
        entityKey,
        editorState: newEditorState
      } = (0, _util.createNewEntity)(editorState, {
        entityType: this.entityType,
        mutability: "IMMUTABLE",
        data: {}
      });
      this.entityKey = entityKey;
      return newEditorState;
    });
  }

  strategy(contentBlock, callback, contentState) {
    (0, _util.findEntityRange)(contentBlock, callback, contentState, this.entityType);
  }
  /* eslint-disable */


  component(props) {
    return _react.default.createElement("span", {
      tag: "user-tag",
      "data-offset-key": props.offsetKey
    }, props.children);
  }
  /* eslint-enable */


  toggle(text) {
    this.fire(editorState => {
      let selection = editorState.getSelection();
      let nextContentState = editorState.getCurrentContent();
      editorState = _draftJs.EditorState.push(editorState, _draftJs.Modifier.removeRange(nextContentState, selection), "remove-range");
      selection = editorState.getSelection();
      nextContentState = _draftJs.Modifier.insertText(nextContentState, selection, " ");
      nextContentState = _draftJs.Modifier.insertText(nextContentState, selection, text, "", this.entityKey);
      nextContentState = _draftJs.Modifier.insertText(nextContentState, selection, " ");
      return _draftJs.EditorState.push(editorState, nextContentState, "insert-characters");
    });
  }

}

exports.default = Insert;