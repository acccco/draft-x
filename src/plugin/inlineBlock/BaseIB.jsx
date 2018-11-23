/*
 * @Author: Aco
 * @Date: 2018-11-02 15:04:44
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 10:35:22
 * @Description: 用于在光标区域添加一个 inline-block
 */

import React from "react";
import { EditorState, Modifier } from "draft-js";
import Base from "../Base";
import { getEndEntityKey, createNewEntity, findEntityRange } from "../../util";

export default class BaseIB extends Base {
  constructor() {
    super();
    this.entityType = "BaseIB";
    this.mutability = "IMMUTABLE";
    this.decorator = {
      strategy: this.strategy.bind(this),
      component: this.component.bind(this)
    };
  }

  keyBindingFn(e) {
    if (e.keyCode !== 8) return;
    this.fire(editorState => {
      // 获取 iframe 对应的 entity
      const contentState = editorState.getCurrentContent();
      const entityKey = getEndEntityKey(editorState, 1);

      if (!entityKey) return editorState;
      const entity = contentState.getEntity(entityKey);

      if (!entity || entity.getType() !== this.entityType) return editorState;
      contentState.replaceEntityData(entityKey, {});

      return EditorState.set(editorState, {
        currentContent: contentState
      });
    });
  }

  /* eslint-disable */
  component() {
    <span>BaseIB</span>;
  }
  /* eslint-enable */

  strategy(contentBlock, callback, contentState) {
    findEntityRange(contentBlock, callback, contentState, this.entityType);
  }

  toggle(data) {
    this.fire(editorState => {
      // eslint-disable-next-line
      let {
        entityKey,
        contentState,
        editorState: newEditorState
      } = createNewEntity(editorState, {
        entityType: this.entityType,
        mutability: this.mutability,
        data
      });

      let selection = newEditorState.getSelection();

      newEditorState = EditorState.push(
        editorState,
        Modifier.removeRange(contentState, selection),
        "remove-range"
      );

      selection = newEditorState.getSelection();

      contentState = Modifier.insertText(contentState, selection, " ");
      contentState = Modifier.insertText(
        contentState,
        selection,
        "IB",
        "",
        entityKey
      );
      contentState = Modifier.insertText(contentState, selection, " ");

      return EditorState.push(
        newEditorState,
        contentState,
        "insert-characters"
      );
    });
  }
}
