"use strict";

exports.getBlockData = getBlockData;
exports.setBlockData = setBlockData;
exports.getBlockType = getBlockType;
exports.findEntityRange = findEntityRange;

var _draftJs = require("draft-js");

function getBlockData(editorState) {
  const selection = editorState.getSelection();
  return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getData();
}

function setBlockData(editorState, data) {
  const newContentState = _draftJs.Modifier.setBlockData(editorState.getCurrentContent(), editorState.getSelection(), data);

  return _draftJs.EditorState.push(editorState, newContentState, "change-block-data");
}

function getBlockType(editorState) {
  const selection = editorState.getSelection();
  return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
}

function findEntityRange(contentBlock, callback, contentState, entityType) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === entityType;
  }, callback);
}