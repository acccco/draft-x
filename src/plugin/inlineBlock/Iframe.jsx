/*
 * @Author: Aco
 * @LastEditors: Aco
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
        <iframe src={data.src} style={{ width: data.width }} />
        <span>&nbsp;</span>
      </span>
    );
  }
}
