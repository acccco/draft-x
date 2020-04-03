/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 为选中区域移除标签
 */

import { RichUtils } from 'draft-js';
import Base from '../Base';

export default class RemoveTag extends Base {
  toggle() {
    this.fire(editorState =>
      RichUtils.toggleLink(editorState, editorState.getSelection(), null)
    );
  }
}
