/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-29 17:03:29
 * @Description: 用于添加图片
 */

import React from 'react';
import BaseAtomic from './BaseAtomic';

export default class Image extends BaseAtomic {
  constructor() {
    super();
    this.entityType = 'AUDIO';
  }

  component(props) {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    return (
      <div className="RichEditor-float-wrap">
        <audio
          controls
          className="RichEditor-audio"
          src={src}
          style={{
            width: '100%',
            whiteSpace: 'initial'
          }}
        />
      </div>
    );
  }
}
