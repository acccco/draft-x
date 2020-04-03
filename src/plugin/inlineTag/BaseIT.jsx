/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 基础的标签插件，用于为选中区域外添加一个标签，该类为基础类，使用时需继承该类
 */

import React from 'react';
import { RichUtils } from 'draft-js';
import Base from '../Base';
import { createNewEntity, getStartEntityKey, findEntityRange } from '../../util';

export default class BaseIT extends Base {
  constructor() {
    super();
    this.entityType = 'BaseIT';
    this.mutability = 'MUTABLE';
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }

  strategy(contentBlock, callback, contentState) {
    findEntityRange(contentBlock, callback, contentState, this.entityType);
  }

  component() {
    return <span>插件实例需要 component 方法</span>;
  }

  getEntity(editorState) {
    const content = editorState.getCurrentContent();
    let selection = editorState.getSelection();
    // 处理 atomic
    let block = content.getBlockForKey(selection.getStartKey());
    if (block.getType() === 'atomic') {
      selection = selection.merge({
        anchorOffset: 0,
        focusOffset: 1
      });
    }
    if (selection.isCollapsed()) return;
    const contentState = editorState.getCurrentContent();
    const entityKey = getStartEntityKey(editorState);
    if (!entityKey) return;
    return contentState.getEntity(entityKey);
  }

  toggle(data) {
    this.fire(editorState => {
      const content = editorState.getCurrentContent();
      let selection = editorState.getSelection();

      // 处理 atomic
      let block = content.getBlockForKey(selection.getStartKey());
      if (block.getType() === 'atomic') {
        selection = selection.merge({
          anchorOffset: 0,
          focusOffset: 1
        });
      }

      const { entityKey, editorState: newEditorState } = createNewEntity(
        editorState,
        {
          entityType: this.entityType,
          mutability: this.mutability,
          data
        }
      );

      return RichUtils.toggleLink(newEditorState, selection, entityKey);
    });
  }
}
