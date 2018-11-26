"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("../util");

/*
 * @Author: Aco
 * @Date: 2018-11-07 10:45:40
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 09:52:46
 * @Description: 基础插件，所有插件必须继承此类
 */
class Base {
  constructor() {
    this.fireQueue = new _util.FireQueue();
    this.fireQueue.setGetInit(() => this.getEditorState());
    this.fireQueue.setCallBack(editorState => this.applyChange(editorState));
  }

  getEditorState() {
    throw new Error("请确认是否调用了插件的 init 方法");
  }

  applyChange() {
    throw new Error("请确认是否调用了插件的 init 方法");
  }

  init(getEditorState, applyChange) {
    this.getEditorState = getEditorState;
    this.applyChange = applyChange;
  }

  fire(fnc) {
    this.fireQueue.add(fnc);
    this.fireQueue.fire();
  }

}

exports.default = Base;