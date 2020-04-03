/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 复原
 */

import { EditorState } from "draft-js";
import Base from "../Base";

export default class Redo extends Base {
  toggle() {
    this.fire(editorState => EditorState.redo(editorState));
  }
}
