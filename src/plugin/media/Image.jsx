/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-20 10:08:23
 * @Description: 用于添加图片
 */

import React from "react";
import BaseMedia from "./BaseMedia";

export default class Image extends BaseMedia {
  constructor() {
    super();
    this.entityType = "image";
  }

  /* eslint-disable */
  component(props) {
    return (
      <div className="RichEditor-float-wrap">
        <img
          className="RichEditor-img"
          src={props.data.src}
          style={{
            whiteSpace: "initial"
          }}
        />
      </div>
    );
  }
  /* eslint-enable */
}
