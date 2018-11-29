/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-29 17:03:50
 * @Description: 用于添加图片
 */

import React from 'react';
import BaseAtomic from './BaseAtomic';

export default class Image extends BaseAtomic {
  constructor() {
    super();
    this.entityType = 'IMAGE';
  }

  component(props) {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    return (
      <div className="RichEditor-float-wrap">
        <img
          className="RichEditor-img"
          src={src}
          style={{
            whiteSpace: 'initial'
          }}
        />
      </div>
    );
  }
}
