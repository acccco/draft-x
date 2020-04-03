/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 撤回
 */

import { EditorState } from "draft-js";
import Base from "../Base";

export default class Undo extends Base {
  toggle() {
    this.fire(editorState => EditorState.undo(editorState));
  }
}
