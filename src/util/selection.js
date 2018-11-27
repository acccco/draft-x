/*
 * @Author: Aco
 * @Date: 2018-11-20 09:40:12
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-27 14:58:02
 * @Description: 关于选区的一些操作
 */

export function getEndEntityKey(editorState, deviation = 0) {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const endKey = selection.getEndKey();
  const endOffset = selection.getEndOffset();
  const block = contentState.getBlockForKey(endKey);
  return block.getEntityAt(endOffset - deviation);
}

export function getStartEntityKey(editorState, deviation = 0) {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const startOffset = selection.getStartOffset();
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
  return blockWithLinkAtBeginning.getEntityAt(startOffset + deviation);
}

export function getSelectedBlocksMap(editorState) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();
  return blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]]);
}
