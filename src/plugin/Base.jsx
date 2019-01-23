/*
 * @Author: Aco
 * @Date: 2018-11-07 10:45:40
 * @LastEditors: Aco
 * @LastEditTime: 2019-01-23 14:52:09
 * @Description: 基础插件，所有插件必须继承此类
 */

import { FireQueue } from '../util';

const fireQueue = new FireQueue();

export default class Base {
  constructor() {
    fireQueue.setGetInit(() => this.getEditorState());
    fireQueue.setCallBack(editorState => this.applyChange(editorState));
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
    fireQueue.add(fnc);
    fireQueue.fire();
  }
}
