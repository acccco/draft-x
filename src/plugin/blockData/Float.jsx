/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: float
 */

import BaseBD from './BaseBD';

export default class Float extends BaseBD {
  constructor() {
    super();
    this.name = 'block-float';
    this.types = ['float-left', 'float-none', 'float-right'];
    this.nameSpace = 'RichEditor';
  }
}
