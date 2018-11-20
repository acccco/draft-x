/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-13 14:35:54
 * @Description: 用于添加音频
 */

import React from 'react';
import BaseMedia from './BaseMedia';

export default class Audio extends BaseMedia {
  constructor() {
    super();
    this.entityType = 'audio';
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
