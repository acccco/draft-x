/*
 * @Author: Aco
 * @Date: 2018-11-06 12:21:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-16 16:02:36
 * @Description: 为选中区域移除标签
 */

import { RichUtils } from "draft-js";
import Base from "../Base";

export default class RemoveTag extends Base {
  toggle() {
    this.fire(editorState =>
      RichUtils.toggleLink(editorState, editorState.getSelection(), null)
    );
  }
}
