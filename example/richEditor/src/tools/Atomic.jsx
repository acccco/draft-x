import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

export default function (props) {
  const [atomicWidth, setAtomicWidth] = useState('');
  const { action, disabled } = props;

  return (
    <span>
        <span className='icon-wrap'>图片大小</span>
        <Input
          disabled={disabled}
          type="number"
          style={{
            width: 100
          }}
          value={atomicWidth}
          onChange={e => {
            setAtomicWidth(e.target.value);
          }}
        />
        <Button
          disabled={disabled}
          onClick={() => {
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
