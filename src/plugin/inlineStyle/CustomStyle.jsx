/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 传入需要修改的样式名称即可，修改时调用 toggle 方法，传入相应的样式值即可修改富文本中的内容
 */

import BaseIS from './BaseIS';

export default class CustomStyle extends BaseIS {
  constructor(customKey, shortKey = customKey) {
    super();
    this.customStyleMap = {};
    this.cusetomKey = customKey;
    this.shortKey = shortKey;
  }

  getKeys(editorState) {
    return super
      .getKeys(editorState)
      .filter(style => style.indexOf(this.shortKey) === 0)
      .map(style => style.replace(`${this.shortKey}-`, ''));
  }

  toggle(style) {
    const styleName = `${this.shortKey}-${style}`;

    if (!this.customStyleMap[styleName]) {
      this.customStyleMap[styleName] = {
        [this.cusetomKey]: style
      };
    }
    super.toggle(styleName);
  }
}
