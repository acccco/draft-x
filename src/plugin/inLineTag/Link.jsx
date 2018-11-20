/*
 * @Author: Aco
 * @Date: 2018-11-02 15:10:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 11:21:53
 * @Description: 为选中区域添加 a 标签
 */

import React from 'react';
import BaseTag from './BaseTag';

export default class Link extends BaseTag {
  constructor() {
    super();
    this.entityType = 'LINK';
  }

  /* eslint-disable */
  component(props) {
    const { href } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={href} data-offset-key={props.offsetKey}>
        {props.children}
      </a>
    );
  }
  /* eslint-enable */
}
