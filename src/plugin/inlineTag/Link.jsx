/*
 * @Author: Aco
 * @Date: 2018-11-02 15:10:38
 * @LastEditors: Aco
 * @LastEditTime: 2019-02-20 11:02:29
 * @Description: 为选中区域添加 a 标签
 */

import React from 'react';
import BaseIT from './BaseIT';

export default class Link extends BaseIT {
  constructor() {
    super();
    this.entityType = 'LINK';
  }

  keyDown(e, href) {
    if (e.metaKey || e.ctrlKey) {
      window.open(href, 'blank');
    }
  }

  component(props) {
    const { href } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a
        href={href}
        data-offset-key={props.offsetKey}
        onClick={e => this.keyDown(e, href)}
      >
        {props.children}
      </a>
    );
  }
}
