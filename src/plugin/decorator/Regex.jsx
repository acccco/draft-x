/*
 * @Author: Aco
 * @Date: 2018-11-05 14:21:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-13 14:32:30
 * @Description: description
 */

import React from 'react';
import BaseDecoretor from './BaseDecorator';

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr;
  let start;
  /* eslint-disable */
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
  /* eslint-enable */
}

const defaultStyle = {
  color: 'rgba(98, 177, 254, 1.0)',
};

export default class Regex extends BaseDecoretor {
  constructor(regex, style = defaultStyle) {
    super();
    this.regex = regex;
    this.style = style;
  }

  strategy(contentBlock, callback) {
    findWithRegex(this.regex, contentBlock, callback);
  }

  component(props) {
    return (
      <span style={this.style} data-offset-key={props.offsetKey}>
        {props.children}
      </span>
    );
  }
}
