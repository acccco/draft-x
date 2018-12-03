/*
 * @Author: Aco
 * @Date: 2018-11-07 10:45:40
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-03 10:37:25
 * @Description: 基础插件，所有插件必须继承此类
 */

import { FireQueue } from '../util';

export default class Base {
  constructor() {
    this.fireQueue = new FireQueue();
    this.fireQueue.setGetInit(() => this.getEditorState());
    this.fireQueue.setCallBack(editorState => this.applyChange(editorState));
  }

  getEditorState() {
    throw new Error('请确认是否调用了插件的 init 方法');
  }

  applyChange() {}

  init(getEditorState, applyChange = () => {}) {
    this.getEditorState = getEditorState;
    this.applyChange = applyChange;
  }

  fire(fnc) {
    this.fireQueue.add(fnc);
    this.fireQueue.fire();
  }
}
