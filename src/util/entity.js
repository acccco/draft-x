/*
 * @Author: Aco
 * @Date: 2018-11-20 09:40:12
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-27 14:59:06
 * @Description: 关于 entity 的一些操作
 */

import { EditorState } from "draft-js";

export function createNewEntity(editorState, option) {
  const contentState = editorState.getCurrentContent();
  const nextContentState = contentState.createEntity(
    option.entityType,
    option.mutability,
    option.data
  );
  const entityKey = nextContentState.getLastCreatedEntityKey();
  const nextEditorState = EditorState.set(editorState, {
    currentContent: nextContentState
  });
  return {
    entityKey,
    contentState: nextContentState,
    editorState: nextEditorState
  };
}

export const b = 1;
