/*
 * @Author: Aco
 * @Date: 2018-11-02 15:09:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-15 16:36:29
 * @Description: 修改字体插件，传入字体名字即可
 */

import BaseStyle from './BaseStyle';

export default class FontFimaly extends BaseStyle {
  constructor() {
    super();
    this.customStyleMap = {};
  }

  getKeys() {
    const styles = super.getKeys();
    return styles.map(style => style.replace('fontFamily-', ''));
  }

  toggle(fontFamily) {
    const styleName = `fontFamily-${fontFamily}`;

    if (!this.customStyleMap[styleName]) {
      this.customStyleMap[styleName] = {
        fontFamily,
      };
    }
    super.toggle(styleName);
  }
}
