import React from 'react';
import { Button } from 'antd';

export default function NormalBtn(props) {
  const { icon, active, action, disabled } = props;
  return (
    <Button
      disabled={disabled}
      className={active ? 'active' : ''}
      onClick={action}
    >
      {icon}
    </Button>
  );
}
