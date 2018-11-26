"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BaseIB = _interopRequireDefault(require("./BaseIB"));

/*
 * @Author: Aco
 * @Date: 2018-11-21 15:11:32
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 17:07:16
 * @Description: 插入一个 iframe
 */
class Iframe extends _BaseIB.default {
  constructor() {
    super();
    this.entityType = "IFRAME";
  }
  /* eslint-disable */


  component(props) {
    const {
      entityKey,
      contentState,
      decoratedText
    } = props;
    console.log(props);
    const data = contentState.getEntity(entityKey).getData();
    return _react.default.createElement("span", {
      className: "RichEditor-iframe",
      "data-offset-key": props.offsetKey
    }, _react.default.createElement("span", {
      contentEditable: false
    }, "\xA0"), _react.default.createElement("iframe", {
      title: "test",
      src: data.src,
      style: {
        width: data.width
      }
    }), _react.default.createElement("span", null, "\xA0"));
  }
  /* eslint-enable */


}

exports.default = Iframe;