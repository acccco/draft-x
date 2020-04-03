/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 基础的解码插件
 */

export default class BaseDecorator {
  constructor() {
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }

  strategy() {}

  component() {}
}
