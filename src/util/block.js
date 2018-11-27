/*
 * @Author: Aco
 * @Date: 2018-11-20 09:40:12
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-27 15:40:02
 * @Description: 关于 block 的一些操作
 */

import { EditorState, Modifier } from 'draft-js';
import { getSelectedBlocksMap } from './selection';

export function getBlockData(editorState) {
  const selection = editorState.getSelection();
  return editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getData();
}

export function setBlockData(editorState, data) {
  const newContentState = Modifier.setBlockData(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    data
  );
  return EditorState.push(editorState, newContentState, 'change-block-data');
}

export function getBlockType(editorState) {
  const selection = editorState.getSelection();
  return editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
}

export function findEntityRange(
  contentBlock,
  callback,
  contentState,
  entityType
) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === entityType
    );
  }, callback);
}

export function changeBlockDeep(editorState, adjustment) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  let blockMap = contentState.getBlockMap();
  const blocks = getSelectedBlocksMap(editorState).map(block => {
    let depth = block.getDepth() + adjustment;
    depth = Math.max(0, Math.min(depth, 4));
    return block.set('depth', depth);
  });
  blockMap = blockMap.merge(blocks);
  return contentState.merge({
    blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}
