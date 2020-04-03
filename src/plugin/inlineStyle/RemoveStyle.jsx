/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 为选中区域移除样式
 */

import { EditorState, Modifier } from 'draft-js';
import Base from '../Base';

export default class RemoveStyle extends Base {
  toggle() {
    this.fire(editorState => {
      const styles = editorState.getCurrentInlineStyle();
      const selection = editorState.getSelection();
      let nextContentState = editorState.getCurrentContent();

      // 移除样式集
      nextContentState = styles.reduce(
        (contentState, style) =>
          Modifier.removeInlineStyle(contentState, selection, style),
        nextContentState
      );

      return EditorState.push(
        editorState,
        nextContentState,
        'change-inline-style'
      );
    });
  }
}
