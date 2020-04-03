import 'rc-color-picker/assets/index.css';

import React, { useState, useEffect } from 'react';
import { Popover, Button } from 'antd';
import { Panel } from 'rc-color-picker';
import hexToRgba from 'hex-to-rgba';

const defaultColor = [
  {
    color: '#666666',
    alpha: 100
  },
  {
    color: '#999999',
    alpha: 100
  },
  {
    color: '#cccccc',
    alpha: 100
  }
];

export default function (props) {
  const [visible, setVisible] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    let selectedColors;
    if (props.name) {
      selectedColors = JSON.parse(localStorage.getItem(`CPBTN-${props.name}`));
    }
    if (!selectedColors || !selectedColors.length) {
      selectedColors = defaultColor;
    }
    setSelectedColors(selectedColors);

    return () => {
      if (props.name) {
        localStorage.setItem(`CPBTN-${props.name}`, JSON.stringify(selectedColors));
      }
    };
  }, [props.name]);

  let color = {
    color: '#ffffff',
    alpha: 100
  };

  const changeColor = (color) => {
    const colorRgba = hexToRgba(color.color, color.alpha / 100);
    props.action(colorRgba);
    setVisible(false);
  };

  const confirm = () => {
    changeColor(color);
    selectedColors.unshift(color);
    selectedColors.pop();
    setSelectedColors([...selectedColors]);
  };

  const popover = (
    <div className="color-picker">
      <div className="color-selected">
        {selectedColors.map((color, index) => (
          <span
            key={`${color.color} ${index}`}
            style={{ background: hexToRgba(color.color, color.alpha / 100) }}
            onClick={() => {
              changeColor(color);
            }}
          />
        ))}
        <span
          style={{ background: '#fff' }}
          onClick={() => {
            changeColor({
              color: '#ffffff',
              alpha: 100
            });
          }}
        />
        <span
          style={{ background: '#000' }}
          onClick={() => {
            changeColor({
              color: '#000000',
              alpha: 100
            });
          }}
        />
      </div>
      <Panel
        alpha={100}
        color="#ffffff"
        onChange={panelColor => color = panelColor}
        mode="RGB"
      />
      <div className="pop-footer">
        <Button
          size="small"
          type="primary"
          onClick={confirm}
        >
          确认
        </Button>
        <Button size="small" onClick={() => {
          setVisible(false);
        }}>
          取消
        </Button>
      </div>
    </div>
  );

  const colors = [...props.getKeys()];

  return (
    <Popover
      placement="bottomLeft"
      title={props.title}
      content={popover}
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Button
        style={{
          color: colors[0]
        }}
      >
        {props.icon}
      </Button>
    </Popover>
  );

}
//
// export default class CPBtn extends Component {
//   constructor() {
//     super();
//     this.color = {
//       color: '#ffffff',
//       alpha: 100
//     };
//     this.state = {
//       visible: false,
//       selectedColors: []
//     };
//   }
//
//   componentDidMount() {
//     const { name } = this.props;
//     let selectedColors;
//     if (name) {
//       selectedColors = JSON.parse(localStorage.getItem(`CPBTN-${name}`));
//     }
//     if (!selectedColors || !selectedColors.length) {
//       selectedColors = defaultColor;
//     }
//     this.setState({
//       selectedColors
//     });
//   }
//
//   componentWillUnmount() {
//     const { name } = this.props;
//     const { selectedColors } = this.state;
//     if (name) {
//       localStorage.setItem(`CPBTN-${name}`, JSON.stringify(selectedColors));
//     }
//   }
//
//   handleVisibleChange(visible) {
//     this.setState({ visible });
//   }
//
//   changeHandler(color) {
//     this.color = color;
//   }
//
//   confirm(e) {
//     e.preventDefault();
//     this.changeColor(this.color);
//     const { selectedColors } = this.state;
//     selectedColors.unshift(this.color);
//     selectedColors.pop();
//     this.setState({
//       selectedColors
//     });
//   }
//
//   unset = e => {
//     e.preventDefault();
//     this.setState({
//       visible: false,
//     });
//   };
//
//   changeColor(color) {
//     const { action } = this.props;
//     const colorRgba = hexToRgba(color.color, color.alpha / 100);
//     action(colorRgba);
//     this.setState({
//       visible: false
//     });
//   }
//
//   render() {
//     const { visible, selectedColors } = this.state;
//     const { getKeys, icon, title } = this.props;
//     const colors = [...getKeys()];
//     const text = <span>{title}</span>;
//     const content = (
//       <div className="color-picker">
//         <div className="color-selected">
//           {selectedColors.map((color, index) => (
//             <span
//               key={`${color.color} ${index}`}
//               style={{ background: hexToRgba(color.color, color.alpha / 100) }}
//               onMouseDown={() => {
//                 this.changeColor(color);
//               }}
//             />
//           ))}
//           <span
//             style={{ background: '#fff' }}
//             onMouseDown={() => {
//               this.changeColor({
//                 color: '#ffffff',
//                 alpha: 100
//               });
//             }}
//           />
//           <span
//             style={{ background: '#000' }}
//             onMouseDown={() => {
//               this.changeColor({
//                 color: '#000000',
//                 alpha: 100
//               });
//             }}
//           />
//         </div>
//         <Panel
//           alpha={100}
//           color="#ffffff"
//           onChange={color => this.changeHandler(color)}
//           mode="RGB"
//         />
//         <div className="pop-footer">
//           <Button
//             size="small"
//             type="primary"
//             onMouseDown={e => this.confirm(e)}
//           >
//             确认
//           </Button>
//           <Button size="small" onMouseDown={e => this.unset(e)}>
//             取消
//           </Button>
//         </div>
//       </div>
//     );
//
//     return (
//       <Popover
//         placement="bottomLeft"
//         title={text}
//         content={content}
//         trigger="click"
//         visible={visible}
//         onVisibleChange={visible => this.handleVisibleChange(visible)}
//       >
//         <Button
//           style={{
//             color: colors[0]
//           }}
//           onMouseDown={e => {
//             e.preventDefault();
//           }}
//         >
//           {icon}
//         </Button>
//       </Popover>
//     );
//   }
// }
