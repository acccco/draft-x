"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BaseDecorator = _interopRequireDefault(require("./BaseDecorator"));

/*
 * @Author: Aco
 * @Date: 2018-11-05 14:21:34
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:15:33
 * @Description: 用于匹配文本中的符合传入的正则表达式
 */
function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr;
  let start;
  /* eslint-disable */

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
  /* eslint-enable */

}

const defaultStyle = {
  color: "rgba(98, 177, 254, 1.0)"
};

class Regex extends _BaseDecorator.default {
  constructor(regex, style = defaultStyle) {
    super();
    this.regex = regex;
    this.style = style;
  }

  strategy(contentBlock, callback) {
    findWithRegex(this.regex, contentBlock, callback);
  }

  component(props) {
    return _react.default.createElement("span", {
      style: this.style,
      "data-offset-key": props.offsetKey
    }, props.children);
  }

}

exports.default = Regex;