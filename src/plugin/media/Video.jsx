/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-13 14:36:22
 * @Description: 用于添加视频
 */

import React from 'react';
import BaseMedia from './BaseMedia';

export default class Video extends BaseMedia {
  constructor() {
    super();
    this.entityType = 'video';
  }

  /* eslint-disable */
  component(props) {
    return (
      <audio
        controls
        src={props.data.src}
        style={{
          width: '100%',
          whiteSpace: 'initial',
        }}
      />
    );
  }
  /* eslint-enable */
}
