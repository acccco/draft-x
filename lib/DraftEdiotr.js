"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _draftJs = require("draft-js");

require("./RichEditor.scss");

/*
 * @Author: Aco
 * @Date: 2018-11-02 15:02:21
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-23 13:27:51
 * @Description: 对外暴露的 Draft 实例
 */
class DraftEditor extends _react.default.Component {
  constructor(props) {
    super(props);
    const {
      onChange,
      plugin
    } = props;
    this.editor = _react.default.createRef();
    this.customStyleMap = {}; // get/set editorState
    // eslint-disable-next-line

    this.getEditorState = () => this.props.editorState;

    this.applyChange = state => {
      onChange(state);
    }; // init


    Object.keys(plugin).forEach(key => {
      if ("init" in plugin[key]) {
        plugin[key].init(this.getEditorState, this.applyChange);
      }
    }); // decorators

    const newDecorator = new _draftJs.CompositeDecorator([...this.getDecorator()]); // end

    this.applyChange(_draftJs.EditorState.set(this.getEditorState(), {
      decorator: newDecorator
    }));
  }
  /* eslint-disable */


  coverRaw(editorState, json) {
    const raw = JSON.parse(json);
    const contentState = (0, _draftJs.convertFromRaw)(raw);
    this.customStyleMap = raw.customStyleMap;
    return _draftJs.EditorState.push(editorState, contentState, "adjust-depth");
  }

  getHtml() {
    const editorState = this.getEditorState();
    const raw = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
    raw.customStyleMap = this.getCustomStyleMap();
    return JSON.stringify(raw);
  }
  /* eslint-disable */


  focus() {
    this.editor.current.focus();
  }
  /* eslint-enable */


  getDecorator() {
    const {
      plugin
    } = this.props;
    const decorators = [];
    Object.keys(plugin).forEach(key => {
      if ("decorator" in plugin[key]) {
        decorators.push(plugin[key].decorator);
      }
    });
    return decorators;
  }

  getCustomStyleMap() {
    const {
      plugin
    } = this.props;
    let result = { ...this.customStyleMap
    } || {};
    Object.keys(plugin).forEach(key => {
      if ("customStyleMap" in plugin[key]) {
        result = { ...result,
          ...plugin[key].customStyleMap
        };
      }
    });
    return result;
  }

  blockStyleFn(block) {
    const {
      plugin
    } = this.props;
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
    } = this.props;
    let returnValue;
    Object.keys(plugin).forEach(key => {
      if ("blockRendererFn" in plugin[key]) {
        returnValue = plugin[key].blockRendererFn(block) || returnValue;
      }
    });
    return returnValue;
  }

  keyBindingFn(e) {
    const {
      plugin
    } = this.props;
    Object.keys(plugin).forEach(key => {
      if ("keyBindingFn" in plugin[key]) {
        plugin[key].keyBindingFn(e);
      }
    });
    return (0, _draftJs.getDefaultKeyBinding)(e);
  }

  handleKeyCommand(command, editorState) {
    const newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.applyChange(newState);
      return true;
    }

    return false;
  }

  render() {
    const customStyleMap = this.getCustomStyleMap();
    const {
      editorState,
      onChange,
      className,
      placeholder = "Tell a story..."
    } = this.props;
    return _react.default.createElement("div", {
      className: `RichEditor-editor ${className}`
    }, _react.default.createElement(_draftJs.Editor, {
      placeholder: placeholder,
      customStyleMap: customStyleMap,
      handleKeyCommand: (...args) => this.handleKeyCommand(...args),
      keyBindingFn: e => this.keyBindingFn(e),
      blockStyleFn: block => this.blockStyleFn(block),
      blockRendererFn: block => this.blockRendererFn(block),
      editorState: editorState,
      onChange: onChange,
      ref: this.editor
    }));
  }

}

exports.default = DraftEditor;