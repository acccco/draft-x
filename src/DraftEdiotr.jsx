/*
 * @Author: Aco
 * @Date: 2018-11-02 15:02:21
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-29 14:33:23
 * @Description: 对外暴露的 Draft 实例
 */

import React from 'react';
import {
  Editor,
  CompositeDecorator,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import './RichEditor.scss';

export default class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    const { onChange, plugin } = props;

    this.editor = React.createRef();
    this.customStyleMap = {};

    this.getEditorState = () => this.props.editorState;
    this.applyChange = state => {
      onChange(state);
    };

    Object.keys(plugin).forEach(key => {
      if ('init' in plugin[key]) {
        plugin[key].init(this.getEditorState, this.applyChange);
      }
    });

    const newDecorator = new CompositeDecorator([...this.getDecorator()]);

    this.applyChange(
      EditorState.set(this.getEditorState(), { decorator: newDecorator })
    );
  }

  coverRaw(editorState, json) {
    const raw = JSON.parse(json);
    const contentState = convertFromRaw(raw);
    this.customStyleMap = raw.customStyleMap;
    return EditorState.push(editorState, contentState, 'adjust-depth');
  }

  getRaw() {
    const editorState = this.getEditorState();
    const raw = convertToRaw(editorState.getCurrentContent());
    raw.customStyleMap = this.getCustomStyleMap();
    return JSON.stringify(raw);
  }

  focus() {
    this.editor.current.focus();
  }

  getDecorator() {
    const { plugin } = this.props;
    const decorators = [];
    Object.keys(plugin).forEach(key => {
      if ('decorator' in plugin[key]) {
        decorators.push(plugin[key].decorator);
      }
    });
    return decorators;
  }

  getCustomStyleMap() {
    const { plugin } = this.props;
    let result = { ...this.customStyleMap } || {};
    Object.keys(plugin).forEach(key => {
      if ('customStyleMap' in plugin[key]) {
        result = {
          ...result,
          ...plugin[key].customStyleMap
        };
      }
    });
    return result;
  }

  blockStyleFn(block) {
    const { plugin } = this.props;
    let className = '';
    Object.keys(plugin).forEach(key => {
      if ('blockStyleFn' in plugin[key]) {
        className = `${plugin[key].blockStyleFn(block)} ${className}`;
      }
    });
    return className;
  }

  blockRendererFn(block) {
    const { plugin } = this.props;
    let returnValue;
    Object.keys(plugin).forEach(key => {
      if ('blockRendererFn' in plugin[key]) {
        returnValue = plugin[key].blockRendererFn(block) || returnValue;
      }
    });
    return returnValue;
  }

  keyBindingFn(e) {
    const { plugin } = this.props;
    Object.keys(plugin).forEach(key => {
      if ('keyBindingFn' in plugin[key]) {
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
      placeholder = 'Tell a story...'
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
