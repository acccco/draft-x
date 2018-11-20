/*
 * @Author: Aco
 * @Date: 2018-11-02 15:09:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-15 16:36:26
 * @Description: 修改字号插件
 */

import BaseStyle from './BaseStyle';

export default class FontSize extends BaseStyle {
  constructor() {
    super();
    this.customStyleMap = {};
    this.customKey = 'fontSize';
  }

  getKeys(editorState) {
    const styles = super.getKeys(editorState);
    return styles.map(style => style.replace('fontsize-', ''));
  }

  toggle(size) {
    const styleName = `fontsize-${size}`;

    if (!this.customStyleMap[styleName]) {
      this.customStyleMap[styleName] = {
        fontSize: size,
      };
    }
    super.toggle(styleName);
  }
}
