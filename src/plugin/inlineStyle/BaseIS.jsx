/*
 * @Author: Aco
 * @Date: 2018-11-02 15:03:10
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-03 10:12:51
 * @Description: 基础的样式插件类，为选中区域添加样式，该类为基础类，使用时需继承该类
 */

import { EditorState, Modifier } from 'draft-js';
import Base from '../Base';
import { List } from 'immutable';

export default class BaseIS extends Base {
  constructor(unique = true) {
    super();
    this.unique = unique;
    this.customStyleMap = {};
  }

  getKeys(editorState) {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return List([]);
    }
    return editorState.getCurrentInlineStyle();
  }

  toggle(styleName) {
    this.fire(editorState => {
      const selection = editorState.getSelection();
      let nextContentState = editorState.getCurrentContent();

      // 是否为单一样式集
      if (this.unique) {
        // 移除集合内样式
        nextContentState = Object.keys(this.customStyleMap).reduce(
          (contentState, style) =>
            Modifier.removeInlineStyle(contentState, selection, style),
          nextContentState
        );
      }

      // 获取当前应用的样式集
      const currentStyle = editorState.getCurrentInlineStyle();
      // 移除或添加当前选取的样式
      if (currentStyle.has(styleName)) {
        nextContentState = Modifier.removeInlineStyle(
          nextContentState,
          selection,
          styleName
        );
      } else {
        nextContentState = Modifier.applyInlineStyle(
          nextContentState,
          selection,
          styleName
        );
      }

      return EditorState.push(
        editorState,
        nextContentState,
        'change-inline-style'
      );
    });
  }
}
