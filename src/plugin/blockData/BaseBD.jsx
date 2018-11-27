/*
 * @Author: Aco
 * @Date: 2018-11-06 09:21:53
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-27 15:11:38
 * @Description: 实现对 block data 的控制以及呈现
 */

import Base from "../Base";
import { getBlockData, setBlockData } from "../../util";

export default class BaseBS extends Base {
  constructor() {
    super();
    this.name = "";
    this.nameSpace = "";
    this.types = [];
  }

  blockStyleFn(block) {
    const algin = block.getData().get(this.name) || "";
    return algin ? `${this.nameSpace}-${algin}` : "";
  }

  getKeys(editorState) {
    const key = getBlockData(editorState).get(this.name);
    return new Set().add(key);
  }

  map(create) {
    return this.types.map(create);
  }

  toggle(type) {
    this.fire(editorState => {
      const blockData = getBlockData(editorState);
      let toggleType = type;
      if (blockData.get(this.name) === type) {
        toggleType = "";
      }
      return setBlockData(editorState, { [this.name]: toggleType });
    });
  }
}