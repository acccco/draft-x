import React, { Component } from "react";
import { EditorState } from "draft-js";
import DraftEdiotr, {
  NormalStyle,
  BaseBlock,
  AlignStyle,
  Link,
  RemoveTag,
  Image,
  FontSize,
  RemoveStyle,
  Undo,
  Redo,
  TextColor,
  BGColor
} from "draft-x";
import ToolBar from "./toolbar/ToolBar";
import "draft-x/dist/draft.css";
import "./app.scss";

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
          fontWeight: "bold"
        },
        lineThrough: {
          textDecoration: "line-through"
        },
        underLine: {
          textDecoration: "underline"
        },
        italic: {
          fontStyle: "italic"
        }
      }),
      textUnipue: new NormalStyle(
        {
          top: {
            position: "relative",
            top: "-8px",
            display: "inline-flex",
            fontSize: "12px"
          },
          bottom: {
            position: "relative",
            bottom: "-8px",
            display: "inline-flex",
            fontSize: "12px"
          }
        },
        true
      ),
      baseBlockList: new BaseBlock(["UL", "OL"]),
      alignStyle: new AlignStyle(),
      link: new Link(),
      removeTag: new RemoveTag(),
      image: new Image(),
      baseBlock: new BaseBlock([
        "Normal",
        "H1",
        "H2",
        "H3",
        "H4",
        "Blockquote",
        "Code Block"
      ]),
      fontSize: new FontSize(),
      removeStyle: new RemoveStyle(),
      undoPlugin: new Undo(),
      redoPlugin: new Redo(),
      textColor: new TextColor(),
      bGColor: new BGColor()
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
