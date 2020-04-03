/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 基础的样式插件类，为选中区域添加样式，该类为基础类，使用时需继承该类
 */

import { EditorState, Modifier, RichUtils } from 'draft-js';
import { List } from 'immutable';
import Base from '../Base';

export default class BaseIS extends Base {
  constructor(unique = true) {
    super();
    this.unique = unique;
    this.customStyleMap = {};
  }

  getKeys(editorState) {
    try {
      return editorState.getCurrentInlineStyle();
    } catch (e) {
      return List([]);
    }
  }

  toggle(styleName) {
    this.fire(editorState => {
      const selection = editorState.getSelection();
      let nextContentState = editorState.getCurrentContent();

      // 是否为单一样式集
      if (this.unique) {
        // 移除集合内样式
        if (selection.isCollapsed()) {
          let currentStyle = editorState.getCurrentInlineStyle();
          currentStyle = Object.keys(this.customStyleMap).reduce(
            (currentStyle, style) => {
              if (currentStyle.has(style)) {
                currentStyle = currentStyle.remove(style);
              }
              return currentStyle;
            },
            currentStyle
          );
          editorState = EditorState.setInlineStyleOverride(
            editorState,
            currentStyle
          );
        } else {
          nextContentState = Object.keys(this.customStyleMap).reduce(
            (contentState, style) => {
              if (style === styleName) return contentState;
              return Modifier.removeInlineStyle(contentState, selection, style);
            },
            nextContentState
          );
        }
      }

      editorState = EditorState.push(
        editorState,
        nextContentState,
        'change-inline-style'
      );

      editorState = RichUtils.toggleInlineStyle(editorState, styleName);
      return editorState;
    });
  }
}
