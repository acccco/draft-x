/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 通过修改 block deep 修改呈现
 */

import { EditorState } from 'draft-js';
import Base from '../Base';
import { changeBlockDeep } from '../../util';

export default class BaseBI extends Base {
  toggle(type) {
    this.fire(editorState => {
      let contentState = null;
      switch (type) {
        case 'indent': {
          contentState = changeBlockDeep(editorState, 1);
          break;
        }
        case 'outdent': {
          contentState = changeBlockDeep(editorState, -1);
          break;
        }
      }
      if (contentState) {
        return EditorState.push(editorState, contentState, 'adjust-depth');
      } else {
        return editorState;
      }
    });
  }
}
