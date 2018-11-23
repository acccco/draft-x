/*
 * @Author: Aco
 * @Date: 2018-11-21 15:11:32
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:15:20
 * @Description: 插入一个 iframe
 */
import React from "react";
import BaseIB from "./BaseIB";

export default class Iframe extends BaseIB {
  constructor() {
    super();
    this.entityType = "IFRAME";
  }

  /* eslint-disable */
  component(props) {
    const { entityKey, contentState, decoratedText } = props;
    const data = contentState.getEntity(entityKey).getData();
    if (data.src) {
      return (
        <span contentEditable={false}>
          <span className="RichEditor-iframe" style={{ width: data.width }}>
            <span style={{ display: "none" }}>{decoratedText}</span>
            <iframe title="test" src={data.src} />
          </span>
        </span>
      );
    } else {
      return null;
    }
  }
  /* eslint-enable */
}
