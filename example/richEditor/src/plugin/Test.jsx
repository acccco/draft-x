/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-25 16:53:12
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
        key: '1111',
        type: 'atomic',
        text: ' ',
        data: {
          atomicType: this.entityType,
          src: 'http://bgcdn.acohome.cn/100965.jpg'
        }
      };

      let atomicDividerBlockConfig = {
        key: '2222',
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
