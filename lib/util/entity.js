"use strict";

exports.createNewEntity = createNewEntity;
exports.b = void 0;

var _draftJs = require("draft-js");

function createNewEntity(editorState, option) {
  const contentState = editorState.getCurrentContent();
  const nextContentState = contentState.createEntity(option.entityType, option.mutability, option.data);
  const entityKey = nextContentState.getLastCreatedEntityKey();

  const nextEditorState = _draftJs.EditorState.set(editorState, {
    currentContent: nextContentState
  });

  return {
    entityKey,
    contentState: nextContentState,
    editorState: nextEditorState
  };
}

const b = 1;
exports.b = b;