/*
 * @Author: Aco
 * @Date: 2018-11-20 09:40:12
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-27 14:58:40
 * @Description: 一个异步队列
 */

export default class FireQueue {
  constructor() {
    this.queue = [];
    this.isFire = false;
    this.callBack = () => {
      throw new Error('请为队列设置执行回调');
    };
    this.getInitValue = () => {
      throw new Error('请为队列设置获取初始值的函数');
    };
  }

  add(fnc) {
    this.queue.push(fnc);
  }

  setCallBack(fnc) {
    this.callBack = fnc;
  }

  setGetInit(fnc) {
    this.getInitValue = fnc;
  }

  fire() {
    if (this.isFire) return;
    this.isFire = true;
    setTimeout(() => {
      this.isFire = false;
      this.callBack(this.reduce(this.getInitValue()));
      this.clear();
    });
  }

  reduce(init) {
    return this.queue.reduce((prev, fnc) => fnc(prev), init);
  }

  clear() {
    this.queue = [];
  }
}
