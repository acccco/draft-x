"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

var _Base = _interopRequireDefault(require("../Base"));

var _util = require("../../util");

/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:16:23
 * @Description: 基础的 media 插件，用于给编辑区域添加一个 media(img,audio,vedio)
 */
class BaseAtomicase extends _Base.default {
  constructor() {
    super();
    this.entityType = "";
    this.mutability = "IMMUTABLE";
  }

  blockRendererFn(block) {
    if (block.getType() !== "atomic") return undefined;
    const entityKey = block.getEntityAt(0);
    const entity = this.getEditorState().getCurrentContent().getEntity(entityKey);

    if (this.entityType === entity.getType()) {
      return {
        component: props => _react.default.createElement(this.component, (0, _extends2.default)({
          data: entity.getData()
        }, props)),
        editable: this.mutability === "MUTABLE"
      };
    }

    return undefined;
  }
  /* eslint-disable */


  blockStyleFn(block) {
    if (block.getType() !== "atomic") return "";
    return "RichEditor-media";
  }

  component() {
    return _react.default.createElement("span", null, "\u63D2\u4EF6\u5B9E\u4F8B\u9700\u8981 component \u65B9\u6CD5");
  }
  /* eslint-enable */


  toggle(data) {
    this.fire(editorState => {
      const {
        entityKey,
        editorState: nextEditorState
      } = (0, _util.createNewEntity)(editorState, {
        entityType: this.entityType,
        mutability: this.mutability,
        data
      });
      return _draftJs.AtomicBlockUtils.insertAtomicBlock(nextEditorState, entityKey, " ");
    });
  }

}

exports.default = BaseAtomicase;