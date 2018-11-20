/*
 * @Author: Aco
 * @Date: 2018-11-06 09:21:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 17:18:50
 * @Description: description
 */

import BaseStyle from './BaseStyle';

export default class AlignStyle extends BaseStyle {
  constructor() {
    super();
    this.name = 'text-align';
    this.types = ['align-left', 'align-center', 'align-right'];
    this.nameSpace = 'RichEditor-text';
  }
}
