/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 在光标区域插入特定的文本
 */
import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import Base from '../Base';
import { createNewEntity, findEntityRange } from '../../util';

export default class Insert extends Base {
  constructor() {
    super();
    this.entityType = 'Insert';
    this.entityKey = '';
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }

  init(getEditorState, applyChange) {
    super.init(getEditorState, applyChange);
    this.fire(editorState => {
      const { entityKey, editorState: newEditorState } = createNewEntity(
        editorState,
        {
          entityType: this.entityType,
          mutability: 'IMMUTABLE',
          data: {}
        }
      );
      this.entityKey = entityKey;
      return newEditorState;
    });
  }

  strategy(contentBlock, callback, contentState) {
    findEntityRange(contentBlock, callback, contentState, this.entityType);
  }

  /* eslint-disable */
  component(props) {
    return (
      <span tag="user-tag" data-offset-key={props.offsetKey}>
        {props.children}
      </span>
    );
  }

  /* eslint-enable */

  toggle(text) {
    this.fire(editorState => {
      let selection = editorState.getSelection();
      let nextContentState = editorState.getCurrentContent();

      editorState = EditorState.push(
        editorState,
        Modifier.removeRange(nextContentState, selection),
        'remove-range'
      );

      selection = editorState.getSelection();
      nextContentState = Modifier.insertText(nextContentState, selection, ' ');
      nextContentState = Modifier.insertText(
        nextContentState,
        selection,
        text,
        '',
        this.entityKey
      );
      nextContentState = Modifier.insertText(nextContentState, selection, ' ');

      return EditorState.push(
        editorState,
        nextContentState,
        'insert-characters'
      );
    });
  }
}
