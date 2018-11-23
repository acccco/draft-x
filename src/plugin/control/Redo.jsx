/*
 * @Author: Aco
 * @Date: 2018-11-07 10:45:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-16 15:56:09
 * @Description: 复原
 */

import { EditorState } from "draft-js";
import Base from "../Base";

export default class Redo extends Base {
  toggle() {
    this.fire(editorState => EditorState.redo(editorState));
  }
}
