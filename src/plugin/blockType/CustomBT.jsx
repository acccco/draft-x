/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-29 10:20:47
 * @Description: 实现对 block type 的控制以及呈现
 */

import { RichUtils } from 'draft-js';
import Base from '../Base';
import { getBlockType } from '../../util';

export default class BaseBT extends Base {
  /*
    {type: className}
  */
  constructor(blockTypes) {
    super();
    this.blockTypes = blockTypes;
  }

  getKeys(editorState) {
    const set = new Set();
    const type = getBlockType(editorState);
    if (type in this.blockTypes) {
      set.add(type);
    }
    return set;
  }

  blockStyleFn(block) {
    const type = block.getType();
    if (type in this.blockTypes) {
      return this.blockTypes[type];
    }
    return '';
  }

  map(create) {
    return Object.keys(this.blockTypes).map(create);
  }

  toggle(type) {
    if (!type in this.blockTypes) return;
    this.fire(editorState => RichUtils.toggleBlockType(editorState, type));
  }
}
