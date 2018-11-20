/*
 * @Author: Aco
 * @Date: 2018-11-02 15:04:44
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-19 16:05:52
 * @Description: 
 */

import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import Base from '../Base';
import { getEndEntityKey, createNewEntity, findEntityRange } from '../../util';

export default class BaseTag extends Base {
  constructor() {
    super();
    this.entityType = 'IFRAME';
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this),
    };
  }

  keyBindingFn(e) {
    if (e.keyCode !== 8) return;
    this.fire(editorState => {
      // 获取 iframe 对应的 entity
      const contentState = editorState.getCurrentContent();
      const entityKey = getEndEntityKey(editorState, 1);

      if (!entityKey) return editorState;
      const entity = contentState.getEntity(entityKey);

      if (!entity || entity.getType() !== 'IFRAME') return editorState;
      contentState.replaceEntityData(entityKey, {});

      return EditorState.set(editorState, {
        currentContent: contentState,
      });
    });
  }

  /* eslint-disable */
  component(props) {
    const { entityKey, contentState } = props;
    const data = contentState.getEntity(entityKey).getData();
    if (data.src) {
      return (
        <span contentEditable={false}>
          &nbsp;
          <span className="RichEditor-iframe" style={{ width: data.width }}>
            <iframe title="test" src={data.src} />
          </span>
          &nbsp;
        </span>
      );
    } else {
      return null;
    }
  }
  /* eslint-enable */

  strategy(contentBlock, callback, contentState) {
    findEntityRange(contentBlock, callback, contentState, this.entityType);
  }

  toggle(data) {
    this.fire(editorState => {
      // eslint-disable-next-line
      let { entityKey, contentState, editorState: newEditorState } = createNewEntity(editorState, {
        entityType: this.entityType,
        mutability: 'IMMUTABLE',
        data,
      });

      contentState = Modifier.insertText(contentState, editorState.getSelection(), ' ');
      contentState = Modifier.insertText(
        contentState,
        editorState.getSelection(),
        'I',
        '',
        entityKey
      );
      contentState = Modifier.insertText(contentState, editorState.getSelection(), ' ');

      return EditorState.push(newEditorState, contentState, 'insert-characters');
    });
  }
}
