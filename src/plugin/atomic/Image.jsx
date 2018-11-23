/*
 * @Author: Aco
 * @Date: 2018-11-05 10:58:33
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:16:27
 * @Description: 用于添加图片
 */

import React from "react";
import BaseAtomic from "./BaseAtomic";

export default class Image extends BaseAtomic {
  constructor() {
    super();
    this.entityType = "IMAGE";
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
