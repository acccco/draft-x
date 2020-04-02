import React from 'react';
import { Popover, Button } from 'antd';

export default class MediaBtn extends React.Component {
  constructor(props) {
    super(props);
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
    const { action } = this.props;
    const { src } = this.state;
    action({ src });
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
    const { icon, title, placeholder } = this.props;
    const { visible, src } = this.state;

    const text = <span>{title || '资源地址'}</span>;

    const content = (
      <div>
        <input
          type="text"
          className="input"
          value={src}
          placeholder={placeholder}
          onChange={e => this.change(e)}
        />
        <div className="pop-footer">
          <Button
            size="default"
            type="primary"
            onMouseDown={e => this.confirm(e)}
          >
            确认
          </Button>
          <Button size="default" type="danger" onMouseDown={e => this.unset(e)}>
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
          {icon}
        </Button>
      </Popover>
    );
  }
}
