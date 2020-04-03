/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 用于添加视频
 */

import React from 'react';
import BaseAtomic from './BaseAtomic';

export default class Image extends BaseAtomic {
  constructor() {
    super();
    this.atomicType = 'VIDEO';
  }

  component(props) {
    const data = props.block.getData();
    const src = data.get('src');
    return (
      <video
        controls
        className="RichEditor-video"
        src={src}
        style={{
          width: '100%',
          whiteSpace: 'initial'
        }}
      />
    );
  }
}
