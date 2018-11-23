/*
 * @Author: Aco
 * @Date: 2018-11-02 15:04:44
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:14:23
 * @Description: 基础的标签插件，用于为选中区域外添加一个标签，该类为基础类，使用时需继承该类
 */

import React from "react";
import { RichUtils } from "draft-js";
import Base from "../Base";
import {
  createNewEntity,
  getStartEntityKey,
  findEntityRange
} from "../../util";

export default class BaseIT extends Base {
  constructor() {
    super();
    this.entityType = "BaseIT";
    this.mutability = "MUTABLE";
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }

  strategy(contentBlock, callback, contentState) {
    findEntityRange(contentBlock, callback, contentState, this.entityType);
  }

  /* eslint-disable */
  component() {
    return <span>插件实例需要 component 方法</span>;
  }
  /* eslint-enable */

  /* eslint-disable */
  getEntity(editorState) {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const entityKey = getStartEntityKey(editorState);

    if (!entityKey) return null;
    return contentState.getEntity(entityKey);
  }
  /* eslint-enable */

  toggle(data) {
    this.fire(editorState => {
      const { entityKey, editorState: newEditorState } = createNewEntity(
        editorState,
        {
          entityType: this.entityType,
          mutability: this.mutability,
          data
        }
      );

      return RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      );
    });
  }
}