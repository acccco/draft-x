/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 用于添加音频
 */

import React from 'react';
import BaseAtomic from './BaseAtomic';

export default class Image extends BaseAtomic {
  constructor() {
    super();
    this.atomicType = 'AUDIO';
  }

  component(props) {
    const data = props.block.getData();
    const src = data.get('src');
    return (
      <audio
        controls
        className="RichEditor-audio"
        src={src}
        style={{
          width: '100%',
          whiteSpace: 'initial'
        }}
      />
    );
  }
}
