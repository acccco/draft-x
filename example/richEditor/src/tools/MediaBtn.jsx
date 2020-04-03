import React, { useState } from 'react';
import { Popover, Button } from 'antd';


export default function (props) {
  const [src, setSrc] = useState('');
  const [visible, setVisible] = useState(false);

  const confirm = () => {
    props.action({ src });
    setVisible(false);
    setSrc('');
  };

  const popover = (
    <div>
      <input
        type="text"
        className="input"
        value={src}
        placeholder={props.placeholder}
        onChange={e => setSrc(e.target.value)}
      />
      <div className="pop-footer">
        <Button
          size="small"
          type="primary"
          onClick={confirm}
        >
          确认
        </Button>
        <Button size="small" onClick={() => {
          setSrc('');
          setVisible(false);
        }}>
          取消
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      placement="bottomLeft"
      title={props.title || '资源地址'}
      content={popover}
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Button>{props.icon}</Button>
    </Popover>
  );
}
