/*
 * @Author: Aco
 * @Date: 2018-11-02 15:04:44
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-29 13:47:42
 * @Description: 基础的解码插件
 */

export default class BaseDecoretor {
  constructor() {
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }

  strategy() {}

  component() {}
}
