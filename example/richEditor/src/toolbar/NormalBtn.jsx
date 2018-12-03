import React from 'react';
import { Button, Icon } from 'antd';

export default function NormalBtn(props) {
  const { icon, active, action, disabled } = props;
  return (
    <Button
      disabled={disabled}
      className={active ? 'active' : ''}
      onMouseDown={e => {
        e.preventDefault();
        action();
      }}
    >
      <Icon type={icon} />
    </Button>
  );
}
