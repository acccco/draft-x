/*
 * @Author: Aco
 * @Date: 2018-11-02 13:13:20
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-30 17:10:41
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
    const { action } = this.props;
    return (
      <span>
        <Button>
          <Icon type="arrows-alt" />
        </Button>
        <Input
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
          onMouseDown={e => {
            console.log(atomicWidth);
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
