/*
 * @Author: Aco
 * @Date: 2018-11-02 15:02:21
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-20 14:22:15
 * @Description: 编辑器实例
 */

import React from "react";
import {
  Editor,
  CompositeDecorator,
  EditorState,
  RichUtils,
  getDefaultKeyBinding
} from "draft-js";
import "./RichEditor.scss";

export default class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    const { onChange, plugin, editorState } = props;

    this.editor = React.createRef();

    // get/set editorState
    this.getEditorState = () => this.props.editorState;
    this.applyChange = state => {
      onChange(state);
    };

    // init
    Object.keys(plugin).forEach(key => {
      if ("init" in plugin[key]) {
        plugin[key].init(this.getEditorState, this.applyChange);
      }
    });

    // decorators
    const decorators = editorState.getDecorator()
      ? editorState.getDecorator()._decorators
      : [];
    const newDecorator = new CompositeDecorator([
      ...decorators,
      ...this.getDecorator()
    ]);
    // end

    this.applyChange(
      EditorState.set(this.getEditorState(), { decorator: newDecorator })
    );
  }

  getDecorator() {
    const { plugin } = this.props;
    const decorators = [];
    Object.keys(plugin).forEach(key => {
      if ("decorator" in plugin[key]) {
        decorators.push(plugin[key].decorator);
      }
    });
    return decorators;
  }

  getCustomStyleMap() {
    const { plugin } = this.props;
    let result = {};
    Object.keys(plugin).forEach(key => {
      if ("customStyleMap" in plugin[key]) {
        result = {
          ...result,
          ...plugin[key].customStyleMap
        };
      }
    });
    return result;
  }

  getHtml() {
    if (!this.editor || !this.editor.current || !this.editor.current.editor) {
      return "请先实例化组件在调用，或是放在 setTimeout 中使用";
    }
    const { innerHTML } = this.editor.current.editor.children[0];
    let pureHtml = innerHTML.replace(
      /\s?data-(block|editor|offset|contents|text)(-\w*)?="[-\w]*"/gi,
      ""
    );
    pureHtml = pureHtml.replace(/("\s*)|(\s*")/gi, '"');
    pureHtml = pureHtml.replace(/\sclass=""/gi, "");
    return pureHtml;
  }

  focus() {
    this.editor.current.focus();
  }

  blockStyleFn(block) {
    const { plugin } = this.props;
    let className = "";
    Object.keys(plugin).forEach(key => {
      if ("blockStyleFn" in plugin[key]) {
        className = `${plugin[key].blockStyleFn(block)} ${className}`;
      }
    });
    return className;
  }

  blockRendererFn(block) {
    const { plugin } = this.props;
    let returnValue;
    Object.keys(plugin).forEach(key => {
      if ("blockRendererFn" in plugin[key]) {
        returnValue = plugin[key].blockRendererFn(block) || returnValue;
      }
    });
    return returnValue;
  }

  keyBindingFn(e) {
    const { plugin } = this.props;
    Object.keys(plugin).forEach(key => {
      if ("keyBindingFn" in plugin[key]) {
        plugin[key].keyBindingFn(e);
      }
    });
    return getDefaultKeyBinding(e);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
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
    return (
      <div className={`RichEditor-editor ${className}`}>
        <Editor
          placeholder={placeholder}
          customStyleMap={customStyleMap}
          handleKeyCommand={(...args) => this.handleKeyCommand(...args)}
          keyBindingFn={e => this.keyBindingFn(e)}
          blockStyleFn={block => this.blockStyleFn(block)}
          blockRendererFn={block => this.blockRendererFn(block)}
          editorState={editorState}
          onChange={onChange}
          ref={this.editor}
        />
      </div>
    );
  }
}
