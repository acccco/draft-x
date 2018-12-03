/*
 * @Author: Aco
 * @Date: 2018-11-06 09:21:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 17:18:01
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
