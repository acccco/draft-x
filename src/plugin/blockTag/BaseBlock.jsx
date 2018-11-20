/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-19 15:17:32
 * @Description: 基础的块级插件，用于修改块状表现
 */

import { RichUtils } from 'draft-js';
import Base from '../Base';
import { getBlockType } from '../../util';

const BLOCK_TYPES = [
  { label: 'Normal', key: 'unstyled' },
  { label: 'H1', key: 'header-one' },
  { label: 'H2', key: 'header-two' },
  { label: 'H3', key: 'header-three' },
  { label: 'H4', key: 'header-four' },
  { label: 'H5', key: 'header-five' },
  { label: 'H6', key: 'header-six' },
  { label: 'Blockquote', key: 'blockquote' },
  { label: 'UL', key: 'unordered-list-item' },
  { label: 'OL', key: 'ordered-list-item' },
  { label: 'Code Block', key: 'code-block' },
];

export default class BaseBlock extends Base {
  constructor(blockTypes) {
    super();
    this.blockTypes = blockTypes;
  }

  getKeys(editorState) {
    const key = getBlockType(editorState);
    const blockType = BLOCK_TYPES.filter(item => item.key === key)[0];
    let blockLabel = blockType ? blockType.label : '';
    if (this.blockTypes.indexOf(blockLabel) === -1) {
      blockLabel = '';
    }
    return new Set().add(blockLabel);
  }

  /* eslint-disable */
  blockStyleFn(block) {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return '';
    }
  }
  /* eslint-enable */

  map(create) {
    return this.blockTypes.map(create);
  }

  toggle(label) {
    const blockTypes = BLOCK_TYPES.filter(item => item.label === label);
    if (blockTypes.length !== 1) return;
    this.fire(editorState => RichUtils.toggleBlockType(editorState, blockTypes[0].key));
  }
}
