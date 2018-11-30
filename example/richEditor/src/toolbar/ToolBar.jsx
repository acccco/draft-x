import React from 'react';
import { Dropdown, Menu, Button, Icon, Divider, Input } from 'antd';
import 'antd/dist/antd.css';
import {
  NormalStyle,
  RemoveStyle,
  CustomStyle,
  BaseBT,
  CustomBT,
  Align,
  Float,
  Link,
  RemoveTag,
  Audio,
  Video,
  Undo,
  Redo,
  Iframe,
  BaseBI
} from 'draft-x';
import { LinkBtn, NormalBtn, MediaBtn, CPBtn, Atomic } from '.';
import { getInlineIcon, getBlockIcon } from './getItemShow';
import './Rich.scss';
import Image from '../plugin/Image';

export const plugin = {
  textUnUnipue: new NormalStyle({
    bold: {
      fontWeight: 'bold'
    },
    lineThrough: {
      textDecoration: 'line-through'
    },
    underLine: {
      textDecoration: 'underline'
    },
    italic: {
      fontStyle: 'italic'
    }
  }),
  textUnipue: new NormalStyle(
    {
      top: {
        position: 'relative',
        top: '-8px',
        display: 'inline-flex',
        fontSize: '12px'
      },
      bottom: {
        position: 'relative',
        bottom: '-8px',
        display: 'inline-flex',
        fontSize: '12px'
      }
    },
    true
  ),
  fontSize: new CustomStyle('fontSize'),
  textColor: new CustomStyle('color'),
  bGColor: new CustomStyle('backgroundColor'),
  borderRadius: new CustomStyle('borderRadius'),
  border: new CustomStyle('border'),
  borderColor: new CustomStyle('borderColor'),
  removeStyle: new RemoveStyle(),
  align: new Align(),
  float: new Float(),
  link: new Link(),
  removeTag: new RemoveTag(),
  image: new Image(),
  audio: new Audio(),
  video: new Video(),
  baseBlockList: new BaseBT(['UL', 'OL']),
  baseBT: new BaseBT([
    'Normal',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'Blockquote',
    'Code'
  ]),
  customBT: new CustomBT(['Rich-desc']),
  undoPlugin: new Undo(),
  redoPlugin: new Redo(),
  iframe: new Iframe(),
  baseBI: new BaseBI()
};

export default props => {
  const { editorState, focus, logHtml } = props;
  const blockKeys = [
    ...plugin.baseBT.getKeys(editorState),
    ...plugin.customBT.getKeys(editorState)
  ];
  const blockLabel = blockKeys.length === 0 ? 'Normal' : blockKeys[0];
  const blockMemu = (
    <Menu selectedKeys={blockKeys}>
      {plugin.baseBT.map(key => (
        <Menu.Item
          key={key}
          value={key}
          onMouseDown={e => {
            e.preventDefault();
            plugin.baseBT.toggle(key);
          }}
        >
          {key}
        </Menu.Item>
      ))}
      {plugin.customBT.map(key => (
        <Menu.Item
          key={key}
          value={key}
          onMouseDown={e => {
            e.preventDefault();
            plugin.customBT.toggle(key);
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
          action={data => plugin.link.toggle(data)}
          getEntity={() => plugin.link.getEntity(editorState)}
        />
        <NormalBtn
          icon="disconnect"
          action={() => {
            plugin.removeTag.toggle();
          }}
        />
        <Divider type="vertical" />
        <MediaBtn
          icon="picture"
          title="请输入图片资源地址"
          action={data => plugin.image.toggle(data)}
        />
        <MediaBtn
          icon="sound"
          title="请输入音频资源地址"
          action={data => plugin.audio.toggle(data)}
        />
        <MediaBtn
          icon="video-camera"
          title="请输入视频资源地址"
          action={data => plugin.video.toggle(data)}
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
          action={color => plugin.textColor.toggle(color)}
          getKeys={() => plugin.textColor.getKeys(editorState)}
        />
        <CPBtn
          name="backgroundColor"
          icon="bg-colors"
          title="请选择文字背景颜色"
          action={color => plugin.bGColor.toggle(color)}
          getKeys={() => plugin.bGColor.getKeys(editorState)}
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
          action={color => plugin.borderColor.toggle(color)}
          getKeys={() => plugin.borderColor.getKeys(editorState)}
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
                plugin.align.toggle(key);
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
        <NormalBtn
          icon="pic-left"
          action={() => {
            plugin.float.toggle('float-left');
          }}
        />
        <NormalBtn
          icon="pic-center"
          action={() => {
            plugin.baseBI.toggle('outdent');
          }}
        />
        <NormalBtn
          icon="pic-right"
          action={() => {
            plugin.float.toggle('float-right');
          }}
        />
        <Divider type="vertical" />
        <Atomic
          action={data => {
            plugin.image.replaceData(data);
          }}
        />
      </div>
      <div className="toolbar">
        <Button onClick={() => logHtml()}>log html</Button>
      </div>
    </div>
  );
};
