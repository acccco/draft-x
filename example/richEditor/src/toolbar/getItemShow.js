import React from 'react';
import {
  BoldOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  ItalicOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BarsOutlined,
  OrderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  PicLeftOutlined,
  PicCenterOutlined,
  PicRightOutlined
} from '@ant-design/icons';

export function getInlineIcon(type) {
  let map = {
    bold: <BoldOutlined />,
    lineThrough: <StrikethroughOutlined />,
    underLine: <UnderlineOutlined />,
    italic: <ItalicOutlined />,
    top: <ArrowUpOutlined />,
    bottom: <ArrowDownOutlined />,
  };
  return map[type] || null;
}

export function getBlockIcon(type) {
  let map = {
    ul: <BarsOutlined />,
    ol: <OrderedListOutlined />,
    'align-left': <AlignLeftOutlined />,
    'align-center': <AlignCenterOutlined />,
    'align-right': <AlignRightOutlined />,
    'align-justify': <AlignCenterOutlined />,
    'float-left': <PicLeftOutlined />,
    'float-none': <PicCenterOutlined />,
    'float-right': <PicRightOutlined />,
  };
  return map[type.toLowerCase()] || null;
}
