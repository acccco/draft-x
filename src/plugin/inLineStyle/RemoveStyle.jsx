/*
 * @Author: Aco
 * @Date: 2018-11-07 09:59:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-16 16:00:55
 * @Description: 为选中区域移除样式
 */

import { EditorState, Modifier } from 'draft-js';
import Base from '../Base';

export default class RemoveStyle extends Base {
  toggle() {
    this.fire(editorState => {
      const styles = editorState.getCurrentInlineStyle();

      // 获得当前选区
      const selection = editorState.getSelection();
      let nextContentState = editorState.getCurrentContent();

      // 移除当前类的样式集
      nextContentState = styles.reduce(
        (contentState, style) => Modifier.removeInlineStyle(contentState, selection, style),
        nextContentState
      );

      // 应用变化
      return EditorState.push(editorState, nextContentState, 'change-inline-style');
    });
  }
}
