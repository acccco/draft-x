/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 实现对 block data 的控制以及呈现
 */

import Base from '../Base';
import { getBlockData, setBlockData } from '../../util';

export default class BaseBS extends Base {
  constructor() {
    super();
    this.name = '';
    this.nameSpace = '';
    this.types = [];
  }

  blockStyleFn(block) {
    const type = block.getData().get(this.name) || '';
    return type ? `${this.nameSpace}-${type}` : '';
  }

  getType(editorState) {
    return getBlockData(editorState).get(this.name);
  }

  map(create) {
    return this.types.map(create);
  }

  toggle(type) {
    this.fire(editorState => {
      const blockData = getBlockData(editorState);
      let prevData = blockData.toJSON();
      if (blockData.get(this.name) === type) {
        prevData[this.name] = '';
      } else {
        prevData[this.name] = type;
      }
      return setBlockData(editorState, prevData);
    });
  }
}
