/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-28 13:26:37
 * @Description: 用于添加图片
 */

import React from 'react';
import BaseAtomic from './BaseAtomic';

export default class Image extends BaseAtomic {
  constructor() {
    super();
    this.entityType = 'VIDEO';
  }

  /* eslint-disable */
  component(props) {
    return (
      <div className="RichEditor-float-wrap">
        <video
          className="RichEditor-video"
          src={props.data.src}
          style={{
            whiteSpace: 'initial'
          }}
        />
      </div>
    );
  }
  /* eslint-enable */
}
