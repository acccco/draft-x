import React from "react";
import {
  convertFromRaw,
  EditorState,
  Editor,
  CompositeDecorator
} from "draft-js";
import { AlignStyle, FloatStyle, Link, Image, Iframe, Regex } from "..";
import ReactDOMServer from "react-dom/server";

class EditorStatic extends React.Component {
  constructor(props) {
    super();
    this.plugin = {
      floatStyle: new FloatStyle(),
      alignStyle: new AlignStyle(),
      link: new Link(),
      image: new Image(),
      iframe: new Iframe(),
      regex: new Regex(/@[\w]+/g)
    };

    let { json } = props;

    if (typeof json === "string") {
      json = JSON.parse(json);
    }

    this.customStyleMap = json.customStyleMap;

    this.state = {
      editorState: this.init(json)
    };
  }

  init(raw) {
    const newDecorator = new CompositeDecorator([...this.getDecorator()]);
    const contentState = convertFromRaw(raw);
    let editorState = EditorState.createEmpty();
    editorState = EditorState.push(editorState, contentState, "adjust-depth");
    editorState = EditorState.set(editorState, { decorator: newDecorator });
    return editorState;
  }

  getDecorator() {
    const { plugin } = this;
    const decorators = [];
    Object.keys(plugin).forEach(key => {
      if ("decorator" in plugin[key]) {
        decorators.push(plugin[key].decorator);
      }
    });
    return decorators;
  }

  blockStyleFn(block) {
    const { plugin } = this;
    let className = "";
    Object.keys(plugin).forEach(key => {
      if ("blockStyleFn" in plugin[key]) {
        className = `${plugin[key].blockStyleFn(block)} ${className}`;
      }
    });
    return className;
  }

  blockRendererFn(block) {
    const { plugin } = this;
    let returnValue;
    Object.keys(plugin).forEach(key => {
      if ("blockRendererFn" in plugin[key]) {
        returnValue = plugin[key].blockRendererFn(block) || returnValue;
      }
    });
    return returnValue;
  }

  render() {
    return (
      <Editor
        readOnly={true}
        customStyleMap={this.customStyleMap}
        editorState={this.state.editorState}
        blockStyleFn={block => this.blockStyleFn(block)}
        blockRendererFn={block => this.blockRendererFn(block)}
      />
    );
  }
}

export default function raw2html(json) {
  let dom = <EditorStatic json={json} />;
  return ReactDOMServer.renderToStaticMarkup(dom);
}