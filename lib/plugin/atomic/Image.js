"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BaseAtomic = _interopRequireDefault(require("./BaseAtomic"));

/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:16:27
 * @Description: 用于添加图片
 */
class Image extends _BaseAtomic.default {
  constructor() {
    super();
    this.entityType = "IMAGE";
  }
  /* eslint-disable */


  component(props) {
    return _react.default.createElement("div", {
      className: "RichEditor-float-wrap"
    }, _react.default.createElement("img", {
      className: "RichEditor-img",
      src: props.data.src,
      style: {
        whiteSpace: "initial"
      }
    }));
  }
  /* eslint-enable */


}

exports.default = Image;