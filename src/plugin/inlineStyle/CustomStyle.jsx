/*
 * @Author: Aco
 * @Date: 2018-11-02 15:10:19
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:14:33
 * @Description: 传入需要修改的样式名称即可，修改时调用 toggle 方法，传入相应的样式值即可修改富文本中的内容
 */

import BaseIS from "./BaseIS";

export default class CustomStyle extends BaseIS {
  constructor(cusetomKey) {
    super();
    this.customStyleMap = {};
    this.cusetomKey = cusetomKey;
  }

  getKeys(editorState) {
    const styles = super.getKeys(editorState);
    return styles.map(style => style.replace(`${this.cusetomKey}-`, ""));
  }

  toggle(style) {
    const styleName = `${this.cusetomKey}-${style}`;

    if (!this.customStyleMap[styleName]) {
      this.customStyleMap[styleName] = {
        [this.cusetomKey]: style
      };
    }
    super.toggle(styleName);
  }
}
