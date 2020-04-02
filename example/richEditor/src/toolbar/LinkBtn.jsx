import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

export default class Link extends Component {
  constructor() {
    super();
    this.link = React.createRef();
    this.state = {
      href: '',
      visible: false
    };
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  change(e) {
    this.setState({
      href: e.target.value
    });
  }

  confirm(e) {
    e.preventDefault();
    const { action, focus } = this.props;
    const { href } = this.state;
    action({ href });
    this.setState({
      href: '',
      visible: false
    });
    setTimeout(() => {
      focus();
    });
  }

  unset(e) {
    e.preventDefault();
    this.setState({
      href: '',
      visible: false
    });
  }

  toggle(e) {
    e.preventDefault();
    const { getEntity } = this.props;
    const entity = getEntity();
    if (entity && entity.type === 'LINK') {
      this.setState({
        href: entity.getData().href
      });
    }
  }

  render() {
    const { getEntity } = this.props;
    const { href, visible } = this.state;
    const entity = getEntity();
    let hasLink = false;
    if (entity && entity.type === 'LINK') {
      hasLink = true;
    }

    const text = <span>链接地址</span>;

    const content = (
      <div>
        <input
          type="text"
          className="input"
          value={href}
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
          <Button size="small" onMouseDown={e => this.unset(e)}>
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
          className={hasLink ? 'active' : ''}
          onMouseDown={e => {
            this.toggle(e);
          }}
        >
          {<LinkOutlined />}
        </Button>
      </Popover>
    );
  }
}
