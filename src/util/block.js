/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 关于 block 的一些操作
 */

import { EditorState, Modifier } from 'draft-js';
import { getSelectedBlocksMap } from './selection';
import { Map } from 'immutable';

export function getBlock(editorState) {
  const selection = editorState.getSelection();
  return editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
}

export function getBlockData(editorState) {
  const block = getBlock(editorState);
  return block ? block.getData() : Map({});
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
  const block = getBlock(editorState);
  return block ? block.getType() : '';
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
  const blocks = getSelectedBlocksMap(contentState, selectionState).map(
    block => {
      let depth = block.getDepth() + adjustment;
      depth = Math.max(0, Math.min(depth, 4));
      return block.set('depth', depth);
    }
  );
  blockMap = blockMap.merge(blocks);
  return contentState.merge({
    blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}
