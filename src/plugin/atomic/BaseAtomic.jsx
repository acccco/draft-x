/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-29 17:02:33
 * @Description: 基础的 media 插件，用于给编辑区域添加一个 media(img,audio,vedio)
 */

import React from 'react';
import { AtomicBlockUtils } from 'draft-js';
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

  /* eslint-disable */
  blockStyleFn(block) {
    if (block.getType() !== 'atomic') return '';
    return 'RichEditor-media';
  }

  component() {
    return <span>插件实例需要 component 方法</span>;
  }
  /* eslint-enable */

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
