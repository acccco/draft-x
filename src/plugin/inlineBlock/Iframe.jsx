/*
 * @Author: Aco
 * @Date: 2018-11-21 15:11:32
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-03 10:11:24
 * @Description: 插入一个 iframe
 */
import React from 'react';
import BaseIB from './BaseIB';

export default class Iframe extends BaseIB {
  constructor() {
    super();
    this.entityType = 'IFRAME';
  }

  component(props) {
    const { entityKey, contentState } = props;
    const data = contentState.getEntity(entityKey).getData();
    return (
      <span className="RichEditor-iframe" data-offset-key={props.offsetKey}>
        <span contentEditable={false}>&nbsp;</span>
        <iframe title="test" src={data.src} style={{ width: data.width }} />
        <span>&nbsp;</span>
      </span>
    );
  }
}
