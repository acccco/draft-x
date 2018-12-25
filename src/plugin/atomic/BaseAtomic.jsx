/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-25 17:14:23
 * @Description: 基础的 media 插件，用于给编辑区域添加一个 media(img,audio,vedio)
 */

import React from 'react';
import {
  EditorState,
  Modifier,
  ContentBlock,
  BlockMapBuilder,
  genKey
} from 'draft-js';
import Base from '../Base';
import { createNewEntity } from '../../util';
import { List, Repeat } from 'immutable';

export default class BaseAtomicase extends Base {
  constructor() {
    super();
    this.entityType = '';
    this.mutability = 'IMMUTABLE';
  }

  blockRendererFn(block) {
    console.log(block.getType());
    if (block.getType() !== 'atomic') return;
    const data = block.getData();
    if (data.get('atomicType') === this.entityType) {
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
      const selectionState = editorState.getSelection();
      const contentState = editorState.getCurrentContent();

      const afterRemoval = Modifier.removeRange(
        contentState,
        selectionState,
        'backward'
      );

      const targetSelection = afterRemoval.getSelectionAfter();
      const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
      const insertionTarget = afterSplit.getSelectionAfter();

      let asAtomicBlock = Modifier.setBlockType(
        afterSplit,
        insertionTarget,
        'atomic'
      );

      let atomicBlockConfig = {
        key: genKey(),
        type: 'atomic',
        text: ' ',
        data: {
          atomicType: this.entityType,
          ...data
        }
      };

      let atomicDividerBlockConfig = {
        key: genKey(),
        type: 'unstyled'
      };

      const fragmentArray = [
        new ContentBlock(atomicBlockConfig),
        new ContentBlock(atomicDividerBlockConfig)
      ];

      const fragment = BlockMapBuilder.createFromArray(fragmentArray);

      const withAtomicBlock = Modifier.replaceWithFragment(
        asAtomicBlock,
        insertionTarget,
        fragment
      );

      const newContent = withAtomicBlock.merge({
        selectionBefore: selectionState,
        selectionAfter: withAtomicBlock
          .getSelectionAfter()
          .set('hasFocus', true)
      });

      return EditorState.push(editorState, newContent, 'insert-fragment');
    });
  }
}
