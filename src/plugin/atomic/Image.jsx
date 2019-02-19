/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2019-01-23 15:51:50
 * @Description: 用于添加图片
 */

import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import BaseAtomic from './BaseAtomic';
import { getEnv, getStartEntityKey } from '../../util';

export default class Image extends BaseAtomic {
  constructor() {
    super();
    this.atomicType = 'IMAGE';
  }

  component(props) {
    const data = props.block.getData();
    const src = data.get('src');
    const width = data.get('width');
    const oWidth = data.get('oWidth');
    const oHeight = data.get('oHeight');

    const keyDown = (e, href) => {
      if (!href) return;
      if (e.metaKey || e.ctrlKey) {
        href && window.open(href, 'blank');
      }
    };

    let image = (
      <img
        className="RichEditor-image"
        src={src}
        style={{
          whiteSpace: 'initial',
          width: width ? width : '100%'
        }}
        data-w={oWidth}
        data-h={oHeight}
        data-r={oWidth / oHeight}
      />
    );

    if (getEnv() === 'render') {
      image = (
        <img
          className="RichEditor-image"
          data-src={src}
          style={{
            whiteSpace: 'initial',
            width: width ? width : '100%'
          }}
          data-w={oWidth}
          data-h={oHeight}
          data-r={oWidth / oHeight}
        />
      );
    }

    const entity = props.block.getEntityAt(0);
    let linkdata = {};

    if (entity) {
      const entity = props.contentState.getEntity(props.block.getEntityAt(0));
      linkdata = entity.getData();
      image = (
        <a href={linkdata.href} target="_blank">
          {image}
        </a>
      );
    }

    return (
      <div
        style={{
          position: 'relative',
          textAlign: 'center'
        }}
        onClick={e => keyDown(e, linkdata.href)}
      >
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0
          }}
          className="no-need"
        />
        {image}
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
