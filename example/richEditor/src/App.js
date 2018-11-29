import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import DraftEdiotr, { serverRender } from 'draft-x';
import 'draft-x/dist/draft.css';
import ToolBar, { plugin } from './toolbar/ToolBar';
import './app.scss';

class App extends Component {
  constructor() {
    super();
    this.editor = React.createRef();

    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onChange(editorState) {
    this.setState(() => ({
      editorState
    }));
  }

  logHtml() {
    const raw = this.editor.current.getRaw();
    const html = serverRender(raw);
    console.log(html);
  }

  render() {
    const {
      state: { editorState }
    } = this;

    return (
      <div className="App editor-contain">
        <div className="toolbar-wrap">
          <ToolBar
            editorState={editorState}
            focus={() => this.editor.current.focus()}
            logHtml={() => this.logHtml()}
          />
        </div>

        <div className="editor-wrap">
          <DraftEdiotr
            plugin={plugin}
            editorState={editorState}
            onChange={editorState => this.onChange(editorState)}
            placeholder="从这里开始写正文"
            ref={this.editor}
          />
        </div>
      </div>
    );
  }
}

export default App;
