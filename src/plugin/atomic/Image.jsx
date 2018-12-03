/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-03 10:06:36
 * @Description: 用于添加图片
 */

import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import BaseAtomic from './BaseAtomic';
import { getStartEntityKey } from '../../util';

export default class Image extends BaseAtomic {
  constructor() {
    super();
    this.entityType = 'IMAGE';
  }

  component(props) {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src, width } = entity.getData();
    return (
      <div
        style={{
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            height: '100%'
          }}
        />
        <img
          className="RichEditor-img"
          src={src}
          style={{
            whiteSpace: 'initial',
            width: width ? width : '100%'
          }}
          alt="富文本图片"
        />
      </div>
    );
  }

  replaceData(data) {
    this.fire(editorState => {
      const entityKey = getStartEntityKey(editorState);
      let contentState = editorState.getCurrentContent();
      let selection = editorState.getSelection();
      contentState = contentState.mergeEntityData(entityKey, data);
      contentState = Modifier.applyEntity(contentState, selection, entityKey);
      return EditorState.push(editorState, contentState, 'apply-entity');
    });
  }
}
