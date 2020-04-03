import React, { useState } from 'react';
import { Popover, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

export default function (props) {
  const [href, setHref] = useState('');
  const [visible, setVisible] = useState(false);

  const confirm = () => {
    const { action, focus } = props;
    action({ href });
    focus();
    setVisible(false);
    setHref('');
  };

  const showPop = () => {
    const { getEntity } = props;
    const entity = getEntity();
    if (entity && entity.type === 'LINK') {
      setHref(entity.getData().href);
    }
  };

  const popover = (
    <div>
      <input
        type="text"
        className="input"
        value={href}
        onChange={e => setHref(e.target.value)}
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
          setHref('');
          setVisible(false);
        }}>
          取消
        </Button>
      </div>
    </div>
  );

  const entity = props.getEntity();
  let hasLink = false;
  if (entity && entity.type === 'LINK') {
    hasLink = true;
  }

  return (
    <Popover
      placement="bottomLeft"
      title={'链接地址'}
      content={popover}
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Button
        className={hasLink ? 'active' : ''}
        onClick={showPop}
      >
        {<LinkOutlined />}
      </Button>
    </Popover>
  );
}
