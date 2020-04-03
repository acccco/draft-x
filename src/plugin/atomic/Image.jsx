/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 用于添加图片
 */

import React from 'react';
import BaseAtomic from './BaseAtomic';
import { getBlockData, getEnv, setBlockData } from '../../util';

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
      image = <a href={linkdata.href}>{image}</a>;
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
      const blockData = getBlockData(editorState);
      let prevData = blockData.toJSON();
      return setBlockData(editorState, { ...prevData, ...data });
    });
  }
}
