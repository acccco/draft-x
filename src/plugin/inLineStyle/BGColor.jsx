/*
 * @Author: Aco
 * @Date: 2018-11-02 15:10:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 16:33:56
 * @Description: 修改背景颜色插件
 */

import BaseStyle from './BaseStyle';

export default class BGColor extends BaseStyle {
  constructor() {
    super();
    this.customStyleMap = {};
  }

  getKeys(editorState) {
    const styles = super.getKeys(editorState);
    return styles.map(style => style.replace('BGColor-', ''));
  }

  toggle(color) {
    const styleName = `BGColor-${color}`;

    if (!this.customStyleMap[styleName]) {
      this.customStyleMap[styleName] = {
        backgroundColor: color,
      };
    }
    super.toggle(styleName);
  }
}
