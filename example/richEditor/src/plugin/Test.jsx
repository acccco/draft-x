/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2019-02-20 10:10:17
 * @Description: 测试专用
 */

import { BasePlugin } from 'draft-x';

export default class BaseAtomicase extends BasePlugin {
  constructor() {
    super();
  }

  toggle(data) {
    this.fire(editorState => {
      return editorState;
    });
  }
}
