import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import DraftEdiotr, {
  NormalStyle,
  RemoveStyle,
  CustomStyle,
  BaseBT,
  Align,
  Link,
  RemoveTag,
  Image,
  Audio,
  Video,
  Undo,
  Redo,
  Iframe,
  BaseBI
} from 'draft-x';
import 'draft-x/dist/draft.css';
import ToolBar from './toolbar/ToolBar';
import './app.scss';

class App extends Component {
  constructor() {
    super();
    this.editor = React.createRef();

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.plugin = {
      textUnUnipue: new NormalStyle({
        bold: {
          fontWeight: 'bold'
        },
        lineThrough: {
          textDecoration: 'line-through'
        },
        underLine: {
          textDecoration: 'underline'
        },
        italic: {
          fontStyle: 'italic'
        }
      }),
      textUnipue: new NormalStyle(
        {
          top: {
            position: 'relative',
            top: '-8px',
            display: 'inline-flex',
            fontSize: '12px'
          },
          bottom: {
            position: 'relative',
            bottom: '-8px',
            display: 'inline-flex',
            fontSize: '12px'
          }
        },
        true
      ),
      fontSize: new CustomStyle('fontSize'),
      textColor: new CustomStyle('color'),
      bGColor: new CustomStyle('backgroundColor'),
      borderRadius: new CustomStyle('borderRadius'),
      border: new CustomStyle('border'),
      borderColor: new CustomStyle('borderColor'),
      removeStyle: new RemoveStyle(),
      align: new Align(),
      link: new Link(),
      removeTag: new RemoveTag(),
      image: new Image(),
      audio: new Audio(),
      video: new Video(),
      baseBlockList: new BaseBT(['UL', 'OL']),
      baseBlock: new BaseBT([
        'Normal',
        'H1',
        'H2',
        'H3',
        'H4',
        'Blockquote',
        'Code Block'
      ]),
      undoPlugin: new Undo(),
      redoPlugin: new Redo(),
      iframe: new Iframe(),
      baseBI: new BaseBI()
    };
  }

  onChange(editorState) {
    this.setState(() => ({
      editorState
    }));
  }

  render() {
    const {
      plugin,
      state: { editorState }
    } = this;

    return (
      <div className="App editor-contain">
        <div className="toolbar-wrap">
          <ToolBar
            plugin={plugin}
            editorState={editorState}
            focus={() => {
              this.editor.current.focus();
            }}
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
