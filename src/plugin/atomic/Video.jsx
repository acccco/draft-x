/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2019-01-21 10:20:29
 * @Description: 用于添加图片
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
