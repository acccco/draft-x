/*
 * @Author: Aco
 * @Date: 2018-11-02 13:13:20
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-28 13:32:15
 * @Description: 用于添加链接的按钮
 */

import React from 'react';
import { Icon, Popover, Button } from 'antd';
import { getMediaIcon } from './getItemShow';

export default class MediaBtn extends React.Component {
  constructor() {
    super();
    this.state = {
      src: '',
      visible: false
    };
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  change(e) {
    this.setState({
      src: e.target.value
    });
  }

  confirm(e) {
    e.preventDefault();
    const { toggle } = this.props;
    const { src } = this.state;
    toggle({ src });
    this.setState({
      src: '',
      visible: false
    });
  }

  unset(e) {
    e.preventDefault();
    this.setState({
      src: '',
      visible: false
    });
  }

  render() {
    const { type, title } = this.props;
    const { visible, src } = this.state;

    const text = <span>{title || '资源地址'}</span>;

    const content = (
      <div>
        <input
          type="text"
          className="input"
          value={src}
          onChange={e => this.change(e)}
        />
        <div className="pop-footer">
          <Button
            size="small"
            type="primary"
            onMouseDown={e => this.confirm(e)}
          >
            确认
          </Button>
          <Button size="small" type="danger" onMouseDown={e => this.unset(e)}>
            取消
          </Button>
        </div>
      </div>
    );

    return (
      <Popover
        placement="bottomLeft"
        title={text}
        content={content}
        trigger="click"
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button
          onMouseDown={e => {
            e.preventDefault();
          }}
        >
          <Icon type={getMediaIcon(type)} />
        </Button>
      </Popover>
    );
  }
}
