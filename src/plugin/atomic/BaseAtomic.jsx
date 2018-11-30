/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-30 16:48:12
 * @Description: 基础的 media 插件，用于给编辑区域添加一个 media(img,audio,vedio)
 */

import React from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import Base from '../Base';
import { createNewEntity } from '../../util';

const Atomic = props => {};

export default class BaseAtomicase extends Base {
  constructor() {
    super();
    this.entityType = '';
    this.mutability = 'IMMUTABLE';
  }

  blockRendererFn(block) {
    if (block.getType() !== 'atomic') return undefined;
    const entityKey = block.getEntityAt(0);
    const entity = this.getEditorState()
      .getCurrentContent()
      .getEntity(entityKey);
    if (entity.getType() === this.entityType) {
      return {
        component: this.component,
        editable: this.mutability === 'MUTABLE'
      };
    }
  }

  blockStyleFn(block) {
    if (block.getType() !== 'atomic') return '';
    return 'RichEditor-media';
  }

  keyBindingFn(e) {
    if (e.keyCode !== 8) return;
    this.fire(editorState => {
      const content = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const block = content.getBlockForKey(startKey);
      if (block && block.getType() !== 'atomic') return editorState;
      const blockMap = content.getBlockMap().delete(block.getKey());
      const withoutAtomicBlock = content.merge({
        blockMap
      });
      return EditorState.push(editorState, withoutAtomicBlock, 'remove-range');
    });
  }

  component() {
    return <span>插件实例需要 component 方法</span>;
  }

  toggle(data) {
    this.fire(editorState => {
      const { entityKey, editorState: nextEditorState } = createNewEntity(
        editorState,
        {
          entityType: this.entityType,
          mutability: this.mutability,
          data
        }
      );

      return AtomicBlockUtils.insertAtomicBlock(
        nextEditorState,
        entityKey,
        ' '
      );
    });
  }
}
