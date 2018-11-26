"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = raw2html;

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

var _ = require("..");

var _server = _interopRequireDefault(require("react-dom/server"));

class EditorStatic extends _react.default.Component {
  constructor(props) {
    super();
    this.plugin = {
      floatStyle: new _.FloatStyle(),
      alignStyle: new _.AlignStyle(),
      link: new _.Link(),
      image: new _.Image(),
      iframe: new _.Iframe(),
      regex: new _.Regex(/@[\w]+/g)
    };
    let {
      json
    } = props;

    if (typeof json === "string") {
      json = JSON.parse(json);
    }

    this.customStyleMap = json.customStyleMap;
    this.state = {
      editorState: this.init(json)
    };
  }

  init(raw) {
    const newDecorator = new _draftJs.CompositeDecorator([...this.getDecorator()]);
    const contentState = (0, _draftJs.convertFromRaw)(raw);

    let editorState = _draftJs.EditorState.createEmpty();

    editorState = _draftJs.EditorState.push(editorState, contentState, "adjust-depth");
    editorState = _draftJs.EditorState.set(editorState, {
      decorator: newDecorator
    });
    return editorState;
  }

  getDecorator() {
    const {
      plugin
    } = this;
    const decorators = [];
    Object.keys(plugin).forEach(key => {
      if ("decorator" in plugin[key]) {
        decorators.push(plugin[key].decorator);
      }
    });
    return decorators;
  }

  blockStyleFn(block) {
    const {
      plugin
    } = this;
    let className = "";
    Object.keys(plugin).forEach(key => {
      if ("blockStyleFn" in plugin[key]) {
        className = `${plugin[key].blockStyleFn(block)} ${className}`;
      }
    });
    return className;
  }

  blockRendererFn(block) {
    const {
      plugin
    } = this;
    let returnValue;
    Object.keys(plugin).forEach(key => {
      if ("blockRendererFn" in plugin[key]) {
        returnValue = plugin[key].blockRendererFn(block) || returnValue;
      }
    });
    return returnValue;
  }

  render() {
    return _react.default.createElement(_draftJs.Editor, {
      readOnly: true,
      customStyleMap: this.customStyleMap,
      editorState: this.state.editorState,
      blockStyleFn: block => this.blockStyleFn(block),
      blockRendererFn: block => this.blockRendererFn(block)
    });
  }

}

function raw2html(json) {
  let dom = _react.default.createElement(EditorStatic, {
    json: json
  });

  return _server.default.renderToStaticMarkup(dom);
}