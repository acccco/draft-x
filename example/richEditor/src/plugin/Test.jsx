/*
 * @Author: Aco
 * @Date: 2018-11-05 09:26:47
 * @LastEditors: Aco
 * @LastEditTime: 2019-05-08 09:49:49
 * @Description: 测试专用
 */

import React from 'react';
import { BaseAtomic } from 'draft-x';
let html =
  '<section class="_editor" style=" margin: 0px auto;width: 100%;" data-width="100%"><section class="_editor" style=" margin: 0px auto;width: 100%;" data-width="100%"><section style="width: 100%; margin-right: auto; margin-left: auto; padding-top: 20px; padding-bottom: 20px;" data-width="100%"><section style="width: 100%; margin-right: auto; margin-left: auto; border-width: 1px; border-style: solid; border-color: rgb(188, 46, 46); border-radius: 10px;" data-width="100%"><section style="width: 35px; margin-top: -10px; margin-left: 1.5em; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;"><section style="width: 35px; margin-right: auto; margin-left: auto;"><img style="width: 100%;" src="https://mmbiz.qpic.cn/mmbiz_png/Ljib4So7yuWhFTIP7DCMLPwWh8Yhjs079JAuSWh12VsUmN5Iia2QugNOcvVApM4EmyT3CHe0H6ic7GwMKudXn7Zgg/0?wx_fmt=png" data-width="100%" _src="https://mmbiz.qpic.cn/mmbiz_png/Ljib4So7yuWhFTIP7DCMLPwWh8Yhjs079JAuSWh12VsUmN5Iia2QugNOcvVApM4EmyT3CHe0H6ic7GwMKudXn7Zgg/0?wx_fmt=png"></section></section><section style="width: 100%;" data-width="100%"><section style="padding: 10px 15px; letter-spacing: 1.5px; line-height: 1.75em; color: rgb(63, 62, 63);"><p style="letter-spacing:2px;">21世纪初期，互联网世界悄然兴起了一个由数以亿万计的网民自发组织的网络节日——网络情人节。</p></section></section><section style="width:100%;justify-content: flex-end;display: flex;margin-left: -1em;" data-width="100%"><section style="width: 25px; margin-bottom: -17px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;"><section style=" width:25px;"><img style="width: 100%;" src="https://mmbiz.qpic.cn/mmbiz_png/Ljib4So7yuWhFTIP7DCMLPwWh8Yhjs07907tb3e1KNpD5ctnkao6pNYCbfeDcKy3tZYNqsH2RckYAOHHB2VAK5A/0?wx_fmt=png" data-width="100%" _src="https://mmbiz.qpic.cn/mmbiz_png/Ljib4So7yuWhFTIP7DCMLPwWh8Yhjs07907tb3e1KNpD5ctnkao6pNYCbfeDcKy3tZYNqsH2RckYAOHHB2VAK5A/0?wx_fmt=png"></section></section></section></section></section></section></section>';

export default class HtmlAddon extends BaseAtomic {
  constructor() {
    super();
    this.atomicType = 'html';
    this.mutability = 'IMMUTABLE';
  }

  component() {
    return (
      <div
        id="parst"
        dangerouslySetInnerHTML={{ __html: html }}
        onKeyDown={e => e.stopPropagation()}
        onKeyPress={e => e.stopPropagation()}
      />
    );
  }

  blockRendererFn(contentBlock) {
    if (contentBlock.getType() === 'atomic') {
      return {
        component: this.component,
        editable: false
      };
    }
  }
}
