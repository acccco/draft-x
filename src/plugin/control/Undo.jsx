/*
 * @Author: Aco
 * @Date: 2018-11-07 10:45:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 10:29:32
 * @Description: 撤回
 */

import { EditorState } from "draft-js";
import Base from "../Base";

export default class Undo extends Base {
  toggle() {
    this.fire(editorState => EditorState.undo(editorState));
  }
}
