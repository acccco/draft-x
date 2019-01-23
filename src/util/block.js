/*
 * @Author: Aco
 * @Date: 2018-11-20 09:40:12
 * @LastEditors: Aco
 * @LastEditTime: 2019-01-23 09:55:35
 * @Description: 关于 block 的一些操作
 */

import { EditorState, Modifier } from 'draft-js';
import { getSelectedBlocksMap } from './selection';
import { Map } from 'immutable';

export function getBlock(editorState) {
  const selection = editorState.getSelection();
  const block = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
  return block;
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

export function mergeEntity(contentState, selectionState) {
  const entityMap = contentState.getEntityMap();
  const blocks = getSelectedBlocksMap(contentState, selectionState).map(
    block => {
      let chars = block.getCharacterList();
      const charBefore = offset > 0 ? chars.get(offset - 1) : undefined;
      const charAfter = offset < chars.count() ? chars.get(offset) : undefined;
      const entityBeforeCursor = charBefore
        ? charBefore.getEntity()
        : undefined;
      const entityAfterCursor = charAfter ? charAfter.getEntity() : undefined;

      if (entityAfterCursor && entityAfterCursor === entityBeforeCursor) {
        const entity = entityMap.__get(entityAfterCursor);
        if (entity.getMutability() !== 'MUTABLE') {
          let { start, end } = getRemovalRange(
            chars,
            entityAfterCursor,
            offset
          );
          let current;
          while (start < end) {
            current = chars.get(start);
            chars = chars.set(
              start,
              CharacterMetadata.applyEntity(current, null)
            );
            start++;
          }
          return block.set('characterList', chars);
        }
      }

      return block;
    }
  );
}
