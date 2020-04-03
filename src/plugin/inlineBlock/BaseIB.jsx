/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 用于在光标区域添加一个 inline-block
 */

import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import Base from '../Base';
import { createNewEntity, findEntityRange } from '../../util';

export default class BaseIB extends Base {
  constructor() {
    super();
    this.entityType = 'BaseIB';
    this.mutability = 'IMMUTABLE';
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }

  component() {
    <span>BaseIB</span>;
  }

  strategy(contentBlock, callback, contentState) {
    findEntityRange(contentBlock, callback, contentState, this.entityType);
  }

  toggle(data) {
    this.fire(editorState => {
      let {
        entityKey,
        contentState,
        editorState: newEditorState
      } = createNewEntity(editorState, {
        entityType: this.entityType,
        mutability: this.mutability,
        data
      });

      let selection = newEditorState.getSelection();

      newEditorState = EditorState.push(
        editorState,
        Modifier.removeRange(contentState, selection),
        'remove-range'
      );

      selection = newEditorState.getSelection();

      contentState = Modifier.insertText(contentState, selection, ' ');
      contentState = Modifier.insertText(
        contentState,
        selection,
        'I',
        '',
        entityKey
      );

      return EditorState.push(
        newEditorState,
        contentState,
        'insert-characters'
      );
    });
  }
}
