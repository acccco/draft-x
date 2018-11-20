/*
 * @Author: Aco
 * @Date: 2018-11-07 10:45:40
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-20 10:07:29
 * @Description: 基础插件，所有插件必须继承此类
 */

import { FireQueue } from "../util";

export default class Base {
  constructor() {
    this.fireQueue = new FireQueue();
    this.fireQueue.setGetInit(() => this.getEditorState());
    this.fireQueue.setCallBack(editorState => this.applyChange(editorState));
  }

  getEditorState() {
    console.error("请确认是否调用了插件的 init 方法");
    return false;
  }

  applyChange() {
    console.error("请确认是否调用了插件的 init 方法");
    return false;
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
