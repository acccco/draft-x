/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-26 17:05:42
 * @Description: 基础的 media 插件，用于给编辑区域添加一个 media(img,audio,vedio)
 */

import { EditorState, Modifier, ContentBlock, BlockMapBuilder } from 'draft-js';
import { BasePlugin } from 'draft-x';

export default class BaseAtomicase extends BasePlugin {
  constructor() {
    super();
    this.entityType = '';
    this.mutability = 'MUTABLE';
  }

  toggle(data) {
    this.fire(editorState => {
      const content = editorState.getCurrentContent();
      console.log(content);
      return editorState;
    });
  }
}
