/*
 * @Author: Aco
 * @Date: 2018-11-02 13:13:20
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-25 09:54:01
 * @Description: 用于添加链接的按钮
 */

import React from 'react';
import { Input, Button, Icon } from 'antd';

export default class MediaBtn extends React.Component {
  constructor() {
    super();
    this.state = {
      atomicWidth: ''
    };
  }

  render() {
    const { atomicWidth } = this.state;
    const { action, disabled } = this.props;
    return (
      <span>
        <Button disabled={disabled}>
          <Icon type="arrows-alt" />
        </Button>
        <Input
          disabled={disabled}
          type="number"
          style={{
            width: 100
          }}
          value={atomicWidth}
          onChange={e => {
            this.setState({
              atomicWidth: e.target.value
            });
          }}
        />
        <Button
          disabled={disabled}
          onMouseDown={e => {
            e.preventDefault();
            action({
              width: Number(atomicWidth)
            });
          }}
        >
          <Icon type="check" />
        </Button>
      </span>
    );
  }
}
