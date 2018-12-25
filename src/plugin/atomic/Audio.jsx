/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-25 17:03:44
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
