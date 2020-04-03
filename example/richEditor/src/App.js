import 'draft-x/dist/draft.css';
import './app.scss';

import React, { useRef, useState } from 'react';
import DraftEditor, { serverRender, EditorState } from 'draft-x';
import ToolBar, { plugin } from './ToolBar';

export default function () {
  const editor = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const logHtml = () => {
    const raw = editor.current.getRaw();
    const html = serverRender(raw);
    console.log(html);
  };

  return (
    <div className="App editor-contain">
      <div className="toolbar-wrap">
        <ToolBar
          editorState={editorState}
          focus={() => editor.current.focus()}
          logHtml={logHtml}
        />
      </div>

      <div className="editor-wrap">
        <DraftEditor
          plugin={plugin}
          editorState={editorState}
          onChange={editorState => setEditorState(editorState)}
          placeholder="从这里开始写正文"
          ref={editor}
        />
      </div>
    </div>
  );
}
