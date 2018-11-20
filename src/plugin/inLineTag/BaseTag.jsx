/*
 * @Author: Aco
 * @Date: 2018-11-02 15:04:44
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-19 17:19:26
 * @Description: 基础的标签插件，用于为选中区域外添加一个标签，该类为基础类，使用时需继承该类
 */

import React from 'react';
import { RichUtils } from 'draft-js';
import Base from '../Base';
import { createNewEntity, getStartEntityKey, findEntityRange } from '../../util';

export default class BaseTag extends Base {
  constructor() {
    super();
    this.entityType = '';
    this.mutability = 'MUTABLE';
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this),
    };
  }

  /* eslint-disable */
  component() {
    return <span>插件实例需要 component 方法</span>;
  }
  /* eslint-enable */

  strategy(contentBlock, callback, contentState) {
    findEntityRange(contentBlock, callback, contentState, this.entityType);
  }

  /* eslint-disable */
  getEntity(editorState) {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    let data = {};
    let entity = null;

    if (!selection.isCollapsed()) {
      const entityKey = getStartEntityKey(editorState);

      if (entityKey) {
        entity = contentState.getEntity(entityKey);
      }
    }

    return entity;
  }
  /* eslint-enable */

  toggle(data) {
    this.fire(editorState => {
      const { entityKey, editorState: newEditorState } = createNewEntity(editorState, {
        entityType: this.entityType,
        mutability: this.mutability,
        data,
      });

      return RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
    });
  }
}
