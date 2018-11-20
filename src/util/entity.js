import { EditorState } from 'draft-js';

export function createNewEntity(editorState, option) {
  const contentState = editorState.getCurrentContent();
  const nextContentState = contentState.createEntity(
    option.entityType,
    option.mutability,
    option.data
  );
  const entityKey = nextContentState.getLastCreatedEntityKey();
  const nextEditorState = EditorState.set(editorState, {
    currentContent: nextContentState,
  });
  return {
    entityKey,
    contentState: nextContentState,
    editorState: nextEditorState,
  };
}

export const b = 1;
