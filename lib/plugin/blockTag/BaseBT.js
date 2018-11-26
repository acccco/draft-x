"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJs = require("draft-js");

var _Base = _interopRequireDefault(require("../Base"));

var _util = require("../../util");

/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:15:59
 * @Description: 基础的块级插件，用于修改块状表现
 */
const BLOCK_TYPES = [{
  label: "Normal",
  key: "unstyled"
}, {
  label: "H1",
  key: "header-one"
}, {
  label: "H2",
  key: "header-two"
}, {
  label: "H3",
  key: "header-three"
}, {
  label: "H4",
  key: "header-four"
}, {
  label: "H5",
  key: "header-five"
}, {
  label: "H6",
  key: "header-six"
}, {
  label: "Blockquote",
  key: "blockquote"
}, {
  label: "UL",
  key: "unordered-list-item"
}, {
  label: "OL",
  key: "ordered-list-item"
}, {
  label: "Code Block",
  key: "code-block"
}];

class BaseBT extends _Base.default {
  constructor(blockTypes) {
    super();
    this.blockTypes = blockTypes;
  }

  getKeys(editorState) {
    const key = (0, _util.getBlockType)(editorState);
    const blockType = BLOCK_TYPES.filter(item => item.key === key)[0];
    let blockLabel = blockType ? blockType.label : "";

    if (this.blockTypes.indexOf(blockLabel) === -1) {
      blockLabel = "";
    }

    return new Set().add(blockLabel);
  }
  /* eslint-disable */


  blockStyleFn(block) {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";

      default:
        return "";
    }
  }
  /* eslint-enable */


  map(create) {
    return this.blockTypes.map(create);
  }

  toggle(label) {
    const blockTypes = BLOCK_TYPES.filter(item => item.label === label);
    if (blockTypes.length !== 1) return;
    this.fire(editorState => _draftJs.RichUtils.toggleBlockType(editorState, blockTypes[0].key));
  }

}

exports.default = BaseBT;