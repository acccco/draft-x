import React from 'react';
import { Input, Button } from 'antd';
import { ArrowsAltOutlined, CheckOutlined } from '@ant-design/icons';

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
          <ArrowsAltOutlined />
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
          {<CheckOutlined />}
        </Button>
      </span>
    );
  }
}
