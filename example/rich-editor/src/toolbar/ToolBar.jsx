import React from "react";
import { Dropdown, Menu, Button, Icon, Divider } from "antd";
import { LinkBtn, NormalBtn, CPBtn } from ".";
import { getText, getInlineIcon, getBlockIcon } from "./getItemShow";

export default props => {
  const { plugin, editorState, focus } = props;
  const blockKeys = [...plugin.baseBlock.getKeys(editorState)];
  const blockLabel =
    blockKeys.length === 0 ? "普通文本" : getText(blockKeys[0]);
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
          {getText(key)}
        </Menu.Item>
      ))}
    </Menu>
  );

  const fontSizeKeys = [...plugin.fontSize.getKeys(editorState)];
  const fontSizeLabel = fontSizeKeys.length === 0 ? "16" : fontSizeKeys[0];
  const fontSizeMenu = (
    <Menu selectedKeys={fontSizeKeys.length === 0 ? ["16"] : fontSizeKeys}>
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

  return (
    <div>
      <div className="toolbar">
        <NormalBtn
          icon="undo"
          action={() => {
            plugin.iframe.toggle({
              src: "http://www.baidu.com",
              width: 80
            });
          }}
        />
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
        <Dropdown
          overlay={fontSizeMenu}
          onMouseDown={e => {
            e.preventDefault();
          }}
        >
          <Button>
            {`${fontSizeLabel || 16}px`} <Icon type="down" />
          </Button>
        </Dropdown>
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
        <Divider type="vertical" />
        <Dropdown
          overlay={blockMemu}
          onMouseDown={e => {
            e.preventDefault();
          }}
        >
          <Button>
            {blockLabel || "普通文本"} <Icon type="down" />
          </Button>
        </Dropdown>
        <Divider type="vertical" />
        <NormalBtn
          icon="delete"
          action={() => {
            plugin.removeStyle.toggle();
          }}
        />
      </div>
      <div className="toolbar">
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
        <Divider type="vertical" />
        {plugin.alignStyle.map(key => {
          const keys = plugin.alignStyle.getKeys(editorState);
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
      </div>
    </div>
  );
};
