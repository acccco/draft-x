import React, { Component } from "react";
import { Icon, Popover, Button } from "antd";
import { Panel } from "rc-color-picker";
import hexToRgba from "hex-to-rgba";
import "rc-color-picker/assets/index.css";
import "antd/dist/antd.css";

const defaultColor = [
  {
    color: "#666666",
    alpha: 100
  },
  {
    color: "#999999",
    alpha: 100
  },
  {
    color: "#cccccc",
    alpha: 100
  }
];

export default class CPBtn extends Component {
  constructor() {
    super();
    this.color = {
      color: "#ffffff",
      alpha: 100
    };
    this.state = {
      visible: false,
      selectedColors: []
    };
  }

  componentDidMount() {
    const { name } = this.props;
    let selectedColors;
    if (name) {
      selectedColors = JSON.parse(localStorage.getItem(`CPBTN-${name}`));
    }
    if (selectedColors && !selectedColors.length) {
      selectedColors = defaultColor;
    }
    this.setState({
      selectedColors
    });
  }

  componentWillUnmount() {
    const { name } = this.props;
    const { selectedColors } = this.state;
    if (name) {
      localStorage.setItem(`CPBTN-${name}`, JSON.stringify(selectedColors));
    }
  }

  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  changeHandler(color) {
    this.color = color;
  }

  confirm(e) {
    e.preventDefault();
    this.changeColor(this.color);
    const { selectedColors } = this.state;
    selectedColors.unshift(this.color);
    selectedColors.pop();
    this.setState({
      selectedColors
    });
  }

  changeColor(color) {
    const { toggle } = this.props;
    const colorRgba = hexToRgba(color.color, color.alpha / 100);
    toggle(colorRgba);
    this.setState({
      visible: false
    });
  }

  render() {
    const { visible, selectedColors, title } = this.state;
    const { getKeys, icon } = this.props;
    const colors = [...getKeys()];
    const text = <span>{title}</span>;
    const content = (
      <div
        className="color-picker"
        onMouseDown={e => {
          e.preventDefault();
        }}
      >
        <div className="color-selected">
          {selectedColors.map((color, index) => (
            <span
              // eslint-disable-next-line
              key={`${color.color} ${index}`}
              style={{ background: hexToRgba(color.color, color.alpha / 100) }}
              onMouseDown={() => {
                this.changeColor(color);
              }}
            />
          ))}
          <span
            style={{ background: "#fff" }}
            onMouseDown={() => {
              this.changeColor({
                color: "#ffffff",
                alpha: 100
              });
            }}
          />
          <span
            style={{ background: "#000" }}
            onMouseDown={() => {
              this.changeColor({
                color: "#000000",
                alpha: 100
              });
            }}
          />
        </div>
        <Panel
          enableAlpha={false}
          defaultColor="#ffffff"
          onChange={color => this.changeHandler(color)}
          mode="RGB"
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
        onVisibleChange={visible => this.handleVisibleChange(visible)}
      >
        <Button
          onMouseDown={e => {
            e.preventDefault();
          }}
        >
          <Icon
            type={icon}
            style={{
              filter: "drop-shadow(0 0 1px rgba(0, 0, 0, 0.65))",
              color: colors[0]
            }}
          />
        </Button>
      </Popover>
    );
  }
}
