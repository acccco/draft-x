"use strict";

exports.getEndEntityKey = getEndEntityKey;
exports.getStartEntityKey = getStartEntityKey;

/**
 * @msg: 获取选区所在结束位置的 entity
 * @param {type}
 * @return: EditorState
 */
function getEndEntityKey(editorState, deviation = 0) {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const endKey = selection.getEndKey();
  const endOffset = selection.getEndOffset();
  const block = contentState.getBlockForKey(endKey);
  return block.getEntityAt(endOffset - deviation);
}
/**
 * @msg: 获取选区所在开始位置的 entity
 * @param {type}
 * @return: EditorState
 */


function getStartEntityKey(editorState, deviation = 0) {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const startOffset = selection.getStartOffset();
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
  return blockWithLinkAtBeginning.getEntityAt(startOffset + deviation);
}