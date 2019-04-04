/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2019-04-04 13:10:19
 * @Description: 测试专用
 */

import { BasePlugin } from 'draft-x';

export default class BaseAtomicase extends BasePlugin {
  toggle(data) {
    this.fire(editorState => {
      return editorState;
    });
  }
}
