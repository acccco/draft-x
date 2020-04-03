/*
 * @Author: Aco
 * @LastEditors: Aco
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

export function getSelectedBlocksMap(contentState, selectionState) {
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();
  return blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]]);
}
