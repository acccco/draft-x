import React from 'react';
import { Dropdown, Menu, Button, Icon, Divider } from 'antd';
import { LinkBtn, NormalBtn, MediaBtn, CPBtn } from '.';
import { getText, getInlineIcon, getBlockIcon } from './getItemShow';

export default props => {
  const { plugin, editorState, focus } = props;
  const blockKeys = [...plugin.baseBlock.getKeys(editorState)];
  const blockLabel = blockKeys.length === 0 ? 'Normal' : getText(blockKeys[0]);
  const blockMemu = (
    <Menu selectedKeys={blockKeys}>
      {plugin.baseBlock.map(key => (
        <Menu.Item
          key={key}
          value={key}
          onMouseDown={e => {
            e.preventDefault();
            plugin.baseBlock.toggle(key);
          }}
        >
          {key}
        </Menu.Item>
      ))}
    </Menu>
  );

  const fontSizeKeys = [...plugin.fontSize.getKeys(editorState)];
  const fontSizeLabel = fontSizeKeys.length === 0 ? '16' : fontSizeKeys[0];
  const fontSizeMenu = (
    <Menu selectedKeys={[fontSizeLabel]}>
      {[12, 14, 16, 20, 22, 24, 26].map(size => (
        <Menu.Item
          key={size}
          value={size}
          onMouseDown={e => {
            e.preventDefault();
            plugin.fontSize.toggle(size);
          }}
        >
          {`${size}px`}
        </Menu.Item>
      ))}
    </Menu>
  );

  const borderRKeys = [...plugin.borderRadius.getKeys(editorState)];
  const borderRLabel = borderRKeys.length === 0 ? '0' : borderRKeys[0];
  const borderRMemu = (
    <Menu selectedKeys={[borderRLabel]}>
      {[0, 2, 4, 6, 8].map(radius => (
        <Menu.Item
          key={radius}
          value={radius}
          onMouseDown={e => {
            e.preventDefault();
            plugin.borderRadius.toggle(radius);
          }}
        >
          {`${radius}px`}
        </Menu.Item>
      ))}
    </Menu>
  );

  const borderKeys = [...plugin.border.getKeys(editorState)];
  const borderMemu = (
    <Menu selectedKeys={borderKeys.length === 0 ? ['none'] : borderKeys}>
      {['none', '1px solid', '1px dashed', '1px dotted'].map(style => (
        <Menu.Item
          key={style}
          value={style}
          onMouseDown={e => {
            e.preventDefault();
            plugin.border.toggle(style);
          }}
        >
          <div
            style={{
              margin: '10px 0',
              overflow: 'auto',
              borderTop: style
            }}
          />
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <div className="toolbar">
        <NormalBtn
          icon="undo"
          action={() => {
            plugin.undoPlugin.toggle();
          }}
        />
        <NormalBtn
          icon="redo"
          action={() => {
            plugin.redoPlugin.toggle();
          }}
        />
        <Divider type="vertical" />
        <NormalBtn
          icon="delete"
          action={() => {
            plugin.removeStyle.toggle();
          }}
        />
        <Divider type="vertical" />
        <LinkBtn
          focus={focus}
          toggle={data => plugin.link.toggle(data)}
          getEntity={() => plugin.link.getEntity(editorState)}
        />
        <NormalBtn
          icon="disconnect"
          action={() => {
            plugin.removeTag.toggle();
          }}
        />
      </div>
      <div className="toolbar">
        <Dropdown
          overlay={fontSizeMenu}
          onMouseDown={e => {
            e.preventDefault();
          }}
        >
          <Button>
            <Icon type="font-size" style={{ fontSize: 14 }} />
            <span style={{ width: 46 }}>{`${fontSizeLabel || 16}px`}</span>
            <Icon type="down" />
          </Button>
        </Dropdown>
        <Divider type="vertical" />
        {plugin.textUnUnipue.map(key => {
          const keys = plugin.textUnUnipue.getKeys(editorState);
          return (
            <NormalBtn
              key={key}
              icon={getInlineIcon(key)}
              active={keys.has(key)}
              action={() => {
                plugin.textUnUnipue.toggle(key);
              }}
            />
          );
        })}
        <Divider type="vertical" />
        {plugin.textUnipue.map(key => {
          const keys = plugin.textUnipue.getKeys(editorState);
          return (
            <NormalBtn
              key={key}
              icon={getInlineIcon(key)}
              active={keys.has(key)}
              action={() => {
                plugin.textUnipue.toggle(key);
              }}
            />
          );
        })}
        <Divider type="vertical" />
        <CPBtn
          name="color"
          icon="font-colors"
          title="请选择文字颜色"
          toggle={color => plugin.textColor.toggle(color)}
          getKeys={() => plugin.textColor.getKeys(editorState)}
        />
        <CPBtn
          name="backgroundColor"
          icon="bg-colors"
          title="请选择文字背景颜色"
          toggle={color => plugin.bGColor.toggle(color)}
          getKeys={() => plugin.bGColor.getKeys(editorState)}
        />
      </div>
      <div className="toolbar">
        <Dropdown
          overlay={blockMemu}
          onMouseDown={e => {
            e.preventDefault();
          }}
        >
          <Button>
            <Icon type="block" style={{ fontSize: 14 }} />
            <span style={{ width: 60 }}>{blockLabel}</span>
            <Icon type="down" />
          </Button>
        </Dropdown>
        <Divider type="vertical" />
        {plugin.align.map(key => {
          const keys = plugin.align.getKeys(editorState);
          return (
            <NormalBtn
              key={key}
              icon={getBlockIcon(key)}
              active={keys.has(key)}
              action={() => {
                plugin.alignStyle.toggle(key);
              }}
            />
          );
        })}
        <Divider type="vertical" />
        {plugin.baseBlockList.map(key => {
          const keys = plugin.baseBlockList.getKeys(editorState);
          return (
            <NormalBtn
              key={key}
              icon={getBlockIcon(key)}
              active={keys.has(key)}
              action={() => {
                plugin.baseBlockList.toggle(key);
              }}
            />
          );
        })}
        <NormalBtn
          icon="menu-unfold"
          action={() => {
            plugin.baseBI.toggle('indent');
          }}
        />
        <NormalBtn
          icon="menu-fold"
          action={() => {
            plugin.baseBI.toggle('outdent');
          }}
        />
      </div>
      <div className="toolbar">
        <Dropdown
          overlay={borderMemu}
          onMouseDown={e => {
            e.preventDefault();
          }}
        >
          <Button>
            <Icon type="border" style={{ fontSize: 14 }} />
            <span>border</span>
            <Icon type="down" />
          </Button>
        </Dropdown>
        <Dropdown
          overlay={borderRMemu}
          onMouseDown={e => {
            e.preventDefault();
          }}
        >
          <Button>
            <Icon type="radius-setting" style={{ fontSize: 14 }} />
            <span style={{ width: 40 }}>{borderRLabel}px</span>
            <Icon type="down" />
          </Button>
        </Dropdown>
        <CPBtn
          name="borderColor"
          icon="edit"
          title="请选择线框颜色"
          toggle={color => plugin.borderColor.toggle(color)}
          getKeys={() => plugin.borderColor.getKeys(editorState)}
        />
      </div>
      <div className="toolbar">
        <MediaBtn
          type="image"
          title="请输入图片资源地址"
          focus={focus}
          toggle={data => plugin.image.toggle(data)}
          getEntity={() => plugin.image.getEntity(editorState)}
        />
        <MediaBtn
          type="audio"
          title="请输入音频资源地址"
          focus={focus}
          toggle={data => plugin.image.toggle(data)}
          getEntity={() => plugin.image.getEntity(editorState)}
        />
        <MediaBtn
          type="video"
          title="请输入视频资源地址"
          focus={focus}
          toggle={data => plugin.image.toggle(data)}
          getEntity={() => plugin.image.getEntity(editorState)}
        />
      </div>
    </div>
  );
};
