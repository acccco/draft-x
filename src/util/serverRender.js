/*
 * @Author: Aco
 * @Date: 2018-11-23 09:04:32
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-14 09:38:29
 * @Description: 用于获取 html
 */

import React from 'react';
import {
  convertFromRaw,
  EditorState,
  Editor,
  CompositeDecorator
} from 'draft-js';
import * as plugin from '../plugin';
import ReactDOMServer from 'react-dom/server';

class EditorStatic extends React.Component {
  constructor(props) {
    super();

    if (props.plugin) {
      this.plugin = props.plugin;
    } else {
      this.plugin = {};
      for (let key in plugin) {
        this.plugin[key] = new plugin[key]();
      }
    }

    let { json } = props;

    if (typeof json === 'string') {
      json = JSON.parse(json);
    }

    this.customStyleMap = json.customStyleMap;

    this.state = {
      editorState: this.init(json)
    };
  }

  init(raw) {
    const { plugin } = this;
    const newDecorator = new CompositeDecorator([...this.getDecorator()]);
    const contentState = convertFromRaw(raw);
    let editorState = EditorState.createEmpty();
    editorState = EditorState.push(editorState, contentState, 'adjust-depth');
    editorState = EditorState.set(editorState, { decorator: newDecorator });

    Object.keys(plugin).forEach(key => {
      if ('init' in plugin[key]) {
        plugin[key].init(() => {
          return editorState;
        });
      }
    });

    return editorState;
  }

  getDecorator() {
    const { plugin } = this;
    const decorators = [];
    Object.keys(plugin).forEach(key => {
      if ('decorator' in plugin[key]) {
        decorators.push(plugin[key].decorator);
      }
    });
    return decorators;
  }

  blockStyleFn(block) {
    const { plugin } = this;
    let className = '';
    Object.keys(plugin).forEach(key => {
      if ('blockStyleFn' in plugin[key]) {
        className = `${plugin[key].blockStyleFn(block)} ${className}`;
      }
    });
    return className;
  }

  blockRendererFn(block) {
    const { plugin } = this;
    let returnValue;
    Object.keys(plugin).forEach(key => {
      if ('blockRendererFn' in plugin[key]) {
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

export default function serverRender(json, plugin) {
  let dom = <EditorStatic json={json} plugin={plugin} />;
  return ReactDOMServer.renderToStaticMarkup(dom);
}
