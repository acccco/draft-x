import 'antd/dist/antd.css';
import './Rich.scss';

import React from 'react';
import { Button, Divider, Select } from 'antd';
import {
  FontSizeOutlined,
  UndoOutlined,
  RedoOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  PictureOutlined,
  SoundOutlined,
  VideoCameraAddOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
  EditOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BorderOuterOutlined,
  RadiusUpleftOutlined
} from '@ant-design/icons';
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
  Image as XImage,
  Audio,
  Video,
  Undo,
  Redo,
  Iframe,
  BaseBI,
  getBlock
} from 'draft-x';
import { LinkBtn, NormalBtn, MediaBtn, CPBtn, Atomic } from '.';
import { getInlineIcon, getBlockIcon } from './getItemShow';
import Test from '../plugin/Test';

const { Option } = Select;

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
  image: new XImage(),
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
  baseBI: new BaseBI(),
  test: new Test()
};

export default props => {
  const { editorState, focus, logHtml } = props;

  const blockLabel =
    plugin.baseBT.getType(editorState) ||
    plugin.customBT.getType(editorState) ||
    'Normal';

  const blockSelect = (
    <Select value={blockLabel}>
      {plugin.baseBT.map(key => (
        <Option
          key={key}
          value={key}
          onMouseDown={e => {
            e.preventDefault();
            plugin.baseBT.toggle(key);
          }}
        >
          {key}
        </Option>
      ))}
      {plugin.customBT.map(key => (
        <Option
          key={key}
          value={key}
          onMouseDown={e => {
            e.preventDefault();
            plugin.customBT.toggle(key);
          }}
        >
          {key}
        </Option>
      ))}
    </Select>
  );

  const fontSizeValue = [...plugin.fontSize.getKeys(editorState)][0] || '16';
  const fontSizeSelect = (
    <Select value={fontSizeValue + 'px'} onChange={value => {
      plugin.fontSize.toggle(value);
    }}>
      {[12, 14, 16, 20, 22, 24, 26].map(size => (
        <Option key={size} value={size}>
          {`${size}px`}
        </Option>
      ))}
    </Select>
  );

  const borderValue = [...plugin.border.getKeys(editorState)][0] || 'none';
  const borderValueDom = <div
    style={{
      margin: '15px 0',
      overflow: 'auto',
      borderTop: borderValue
    }}
  />;
  const borderSelect = (
    <Select value={borderValueDom} onChange={value => {
      plugin.border.toggle(value);
    }}>
      {['none', '1px solid', '1px dashed', '1px dotted'].map(style => (
        <Option key={style} value={style}>
          <div
            style={{
              margin: '15px 0',
              overflow: 'auto',
              borderTop: style
            }}
          />
        </Option>
      ))}
    </Select>
  );

  const borderRValue = [...plugin.borderRadius.getKeys(editorState)][0] || '0';
  const borderRSelect = (
    <Select value={borderRValue + 'px'} onChange={value => {
      plugin.borderRadius.toggle(value);
    }}>
      {[0, 2, 4, 6, 8].map(radius => (
        <Option key={radius} value={radius}>
          {`${radius}px`}
        </Option>
      ))}
    </Select>
  );

  const blockType = getBlock(editorState).getType();

  return (
    <div>
      <div className="toolbar">
        <NormalBtn
          icon={<UndoOutlined />}
          action={() => {
            plugin.undoPlugin.toggle();
          }}
        />
        <NormalBtn
          icon={<RedoOutlined />}
          action={() => {
            plugin.redoPlugin.toggle();
          }}
        />
        <Divider type="vertical" />
        <NormalBtn
          icon={<DeleteOutlined />}
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
          icon={<DisconnectOutlined />}
          action={() => {
            plugin.removeTag.toggle();
          }}
        />
        <Divider type="vertical" />
        <MediaBtn
          icon={<PictureOutlined />}
          title="请输入图片资源地址"
          placeholder="media.png"
          action={data => {
            const img = new Image();
            img.src = data.src;
            img.onload = function loadImg() {
              plugin.image.toggle({
                src: data.src,
                oWidth: img.width,
                oHeight: img.height
              });
            };
          }}
        />
        <MediaBtn
          icon={<SoundOutlined />}
          title="请输入音频资源地址"
          placeholder="media.mp3"
          action={data => plugin.audio.toggle(data)}
        />
        <MediaBtn
          icon={<VideoCameraAddOutlined />}
          title="请输入视频资源地址"
          placeholder="media.mp4"
          action={data => plugin.video.toggle(data)}
        />
      </div>
      <div className="toolbar">
        <span className='icon-wrap'>字号</span>
        {fontSizeSelect}
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
          icon={<FontColorsOutlined />}
          title="请选择文字颜色"
          action={color => plugin.textColor.toggle(color)}
          getKeys={() => plugin.textColor.getKeys(editorState)}
        />
        <CPBtn
          name="backgroundColor"
          icon={<BgColorsOutlined />}
          title="请选择文字背景颜色"
          action={color => plugin.bGColor.toggle(color)}
          getKeys={() => plugin.bGColor.getKeys(editorState)}
        />
      </div>
      <div className="toolbar">
        <span className='icon-wrap'>边框</span>
        {borderSelect}
        <Divider type="vertical" />
        <span className='icon-wrap'>圆角</span>
        {borderRSelect}
        <CPBtn
          name="borderColor"
          icon={<EditOutlined />}
          title="请选择线框颜色"
          action={color => plugin.borderColor.toggle(color)}
          getKeys={() => plugin.borderColor.getKeys(editorState)}
        />
      </div>
      <div className="toolbar">
        <span className='icon-wrap'>段落</span>
        {blockSelect}
        <Divider type="vertical" />
        {plugin.align.map(key => {
          const type = plugin.align.getType(editorState);
          return (
            <NormalBtn
              key={key}
              icon={getBlockIcon(key)}
              active={key === type}
              action={() => {
                plugin.align.toggle(key);
              }}
            />
          );
        })}
        <Divider type="vertical" />
        {plugin.baseBlockList.map(key => {
          const type = plugin.baseBlockList.getType(editorState);
          return (
            <NormalBtn
              key={key}
              icon={getBlockIcon(key)}
              active={key === type}
              action={() => {
                plugin.baseBlockList.toggle(key);
              }}
            />
          );
        })}
        <NormalBtn
          disabled={blockType.indexOf('list-item') === -1}
          icon={<MenuUnfoldOutlined />}
          action={() => {
            plugin.baseBI.toggle('indent');
          }}
        />
        <NormalBtn
          disabled={blockType.indexOf('list-item') === -1}
          icon={<MenuFoldOutlined />}
          action={() => {
            plugin.baseBI.toggle('outdent');
          }}
        />
      </div>
      <div className="toolbar">
        {plugin.float.map(key => {
          const type = plugin.float.getType(editorState);
          return (
            <NormalBtn
              disabled={blockType !== 'atomic'}
              key={key}
              icon={getBlockIcon(key)}
              active={key === type}
              action={() => {
                plugin.float.toggle(key);
              }}
            />
          );
        })}
        <Divider type="vertical" />
        <Atomic
          disabled={blockType !== 'atomic'}
          action={data => {
            plugin.image.replaceData(data);
          }}
        />
      </div>
      <div className="toolbar">
        <Button onClick={() => logHtml()}>log html</Button>
        <Button
          onMouseDown={e => {
            e.preventDefault();
            plugin.test.toggle();
          }}
        >
          test
        </Button>
      </div>
    </div>
  );
};
