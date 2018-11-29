/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-29 11:14:55
 * @Description: 实现对 block type 的控制以及呈现
 */

import { RichUtils } from 'draft-js';
import Base from '../Base';
import { getBlockType } from '../../util';

const BASE_BLOCK_TYPES = [
  'unstyled',
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'blockquote',
  'unordered-list-item',
  'ordered-list-item',
  'code-block'
];

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
    if (BASE_BLOCK_TYPES.indexOf(type) === -1) {
      set.add(type);
    }
    return set;
  }

  blockStyleFn(block) {
    const type = block.getType();
    if (BASE_BLOCK_TYPES.indexOf(type) === -1) {
      return type;
    }
    return '';
  }

  map(create) {
    return this.blockTypes.map(create);
  }

  toggle(type) {
    if (!type in this.blockTypes) return;
    this.fire(editorState => RichUtils.toggleBlockType(editorState, type));
  }
}
