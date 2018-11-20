/*
 * @Author: Aco
 * @Date: 2018-11-02 15:10:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-15 16:36:39
 * @Description: 修改字体颜色插件
 */

import BaseStyle from './BaseStyle';

export default class TextColor extends BaseStyle {
  constructor() {
    super();
    this.customStyleMap = {};
  }

  getKeys(editorState) {
    const styles = super.getKeys(editorState);
    return styles.map(style => style.replace('color-', ''));
  }

  toggle(color) {
    const styleName = `color-${color}`;

    if (!this.customStyleMap[styleName]) {
      this.customStyleMap[styleName] = {
        color,
      };
    }
    super.toggle(styleName);
  }
}
