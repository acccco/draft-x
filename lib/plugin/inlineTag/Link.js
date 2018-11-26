"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BaseIT = _interopRequireDefault(require("./BaseIT"));

/*
 * @Author: Aco
 * @Date: 2018-11-02 15:10:38
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:13:58
 * @Description: 为选中区域添加 a 标签
 */
class Link extends _BaseIT.default {
  constructor() {
    super();
    this.entityType = "LINK";
  }
  /* eslint-disable */


  keyDown(e, href) {
    if (e.metaKey || e.ctrlKey) {
      window.open(href, "blank");
    }
  }

  component(props) {
    const {
      href
    } = props.contentState.getEntity(props.entityKey).getData();
    return _react.default.createElement("a", {
      href: href,
      "data-offset-key": props.offsetKey,
      onClick: e => this.keyDown(e, href)
    }, props.children);
  }
  /* eslint-enable */


}

exports.default = Link;