## install

```
npm install darft-x
// or
yarn add draft-x
```

## richEditor

[demo][1]

[code][2]

## coverToHtml

```js
const draftX = require('draft-x');
/* DraftEdiotr#getRaw => json */
const html = draftX.json2html(json);
```

**注:** json 可以通过 DraftEdiotr 实例下的 getRaw 获取，使用官方提供的 convertToRaw 会有部分数据的缺失。

[demo][3]

## use

[code][4]

组件必须传入 `plugin` (使用的插件)，`editorState` (初始的 EditorState 对象)，`onChange` (当编辑器内容发生变化时的执行函数)。

```jsx
<DraftEdiotr
  plugin={plugin}
  editorState={editorState}
  onChange={editorState => this.onChange(editorState)}
  placeholder="start you story"
  ref={this.editor}
/>
```

### editorState

由 [draft-js][5] 下  的 `EditorState` 类创建，一般为 `EditorState.createEmpty()`。

```js
// ...
this.state = {
  editorState: EditorState.createEmpty()
};
// ...
```

### onChange

```js
onChange(editorState) {
  this.setState(() => ({
    editorState
  }));
}
```

### plugin

传入的插件格式如下：

```js
{
    imagePlugin: new Image(),
    audioPlugin: new Audio(),
    ...
}
```

#### 插件的使用

插件提供了一个 `toggle` 的方法，用于使用，根据插件的类型参数的传入有所不同。

触发插件的 `toggle` 方法，即可修改编辑器中的内容。

插件不提供任何的 `ui` 表现，仅仅关注于富文本中内容的实现逻辑。

目前默认提供了以下作用的插件：

**注:** `#` 前表示对于插件的实例，`#` 后表示实例的方法。

#### atomic 多媒体插件

`Image/Audio/Vedio` 实现了为编辑区添加多媒体的功能。

```js
Image#toggle({
  src: 'media source' // 资源地址
});
Audio#toggle({
  src: 'media source' // 资源地址
});
Vedio#toggle({
  src: 'media source' // 资源地址
});
```

其中图片插件支持设置或修改图片的数据，视频和音频插件还不支持。

```js
Image#replaceData({
    src:'',    // 资源地址
    width: 300 // 图片大小
})
```

#### Align 对齐方式

规定光标选中的段落的文字对其方式

`3` 种对其方式：`align-left/align-center/align-right`，在 `toggle` 中传入相应属性即可。

```js
Align#toggle('align-left'); // 切换对其方式，相同参数调用两次即取消
Align#getType();            // 获取段落文字对其方式
Align#map();                // 等效于 ['align-left','align-center','align-right'].map()，用于快速生成按钮
```

#### Float 浮动

规定光标选中的块级区域的浮动方式

`3` 种浮动：`float-left/float-none/float-right`，在 `toggle` 中传入相应属性即可。

```js
Float#toggle('float-left'); // 切换浮动状态，相同参数调用两次即取消
Float#getType();            // 获取块级区域的浮动状态
Float#map();                // 等效于 ['align-left','align-center','align-right'].map()，用于快速生成按钮
```

#### BaseBI 块级区域的层级

仅仅支持在列表元素上使用，效果为 `li` 往里缩进。

效果分为缩进和前进：`indent/outdent`。

```js
BaseBI#toggle('indent');    // li 往里缩进一格
BaseBI#toggle('outdent');   // li 往里前进一格
```

#### BaseBT 定义基本的段落呈现

`BaseBT` 为基础的块级呈现，支持 `11` 中效果。分别为：`Normal/H1/H2/H3/H4/H5/H6/Blockquote/UL/OL/Code`

```js
BaseBT#constructor(['H1', 'H2', 'H3', 'H4']); // 参数为 11 中效果的集合数组
BaseBT#toggle('H1');                          // 将段落应用特定样式
BaseBT#getType();                             // 用于获取段落类型，类型为实例化时传入的数组中的一个或为空
BaseBT#map();                                 // 等效于 ['H1','H2','H3','H4'].map()，用于快速生成按钮
```

#### CustomBT 自定义段落呈现

首先，需要自定义段落的类名，如下

```css
.Rich-desc {
  font-size: 14px;
  color: #333333;
  letter-spacing: -0.28px;
  line-height: 20px;
}
.Rich-other {
  font-size: 28px;
  color: #666666;
  line-height: 40px;
}
```

接着使用插件

```js
CustomBT#constructor(['Rich-desc', 'Rich-other']);  // 参数为定义好的类名数组
CustomBT#toggle('Rich-desc');                       // 将段落应用特定样式
CustomBT#getType();                                 // 用于获取段落类型，类型为实例化时传入的数组中的一个或为空
CustomBT#map();                                     // 等效于 ['Rich-desc', 'Rich-other'].map()，用于快速生成按钮
```

#### control 一些控制类插件

```js
InsertText#toggle('some text');  // 在光标处添加文字
Undo#toggle();                   // 取消一步操作
Redo#toggle();                   // 撤回取消操作
```

#### Regex 正则

用于匹配文字内特定格式的文字内容，该插件没有 `toggle` 方法，当文本区域内出现特定格式的文本时，就会生效。

```js
Regex#constructor(/@[\w]+/g, {
  color: 'red'
});                              // 匹配 @xxx 并将文字标红
```

构造函数的第二个参数，就是一组 `css` 样式，当匹配到文字时会应用。

#### CustomStyle  定义文字样式

```js
CustomStyle#constructor('color');     // 生成一个修改文字颜色的插件
CustomStyle#toggle('red');            // 将选中区域的文字颜色变为红色
CustomStyle#getKeys();                // 获取选区内文字的当前颜色，返回 immutable#List
CustomStyle#constructor('font-size'); // 生成一个修改文字大小的插件
CustomStyle#toggle('20px');           // 将选区中的文字字号改为 20px
CustomStyle#getKeys();                // 获取选区内文字的字号，返回 immutable#List
```

改插件主要用于有一组属性的样式，比如 `color/font-size/font-family/border-color/background-color` 等等，插件没有提供 `map` 方法，主要是考虑到，其实这些样式的值有很大的变动，一开始就规定好不切实际，所以仅仅提供应用和获取的方法，至于生成按钮可以手动写一个循环，插件内部不考虑。

#### NormalStyle 定义文字样式

```js
NormalStyle#constructor({
  redBold: {
    fontWeight: 'bold',
    color: 'red'
  },
  blueLineThrough: {
    textDecoration: 'line-through',
    color: 'blue'
  }
});                                    // 定义了两个文字样式组：红色加粗、蓝色斜体
NormalStyle#toggle('redBold');         // 应用红色加粗，相同参数调用两次即取消
NormalStyle#toggle('blueLineThrough'); // 应用蓝色斜体，后加的权重大，所以文字会变成蓝色，相同参数调用两次即取消
NormalStyle#getKeys();                 // 获取文字的样式集合，返回含有 bold 和 bottom 的 immutable#List。
```

**注:** 由于文字样式是可以叠加的，所以返回一个 `immutable#List` 的结构，在 `CustomStyle` 中也是通过 `getKeys` 获取特定的样式，但是拿到 `immutable#List` 中其实只有一项，这样做仅仅是为了结构的统一。

`NormalStyle` 的构造方法还有第二个参数，用于控制样式集内的样式是否是唯一。

```js
NormalStyle#constructor({
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
true);                                 // 定义了两个文字样式组：顶部文字、底部文字，由于这两个样式组是相斥的，额外传入第二个参数 true
NormalStyle#toggle('top');             // 应用顶部文字，相同参数调用两次即取消
NormalStyle#toggle('bottom');          // 先清除样式集内的所有样式，接着应用底部文字，相同参数调用两次即取消
NormalStyle#getKeys();                 // 获取文字的样式集合，返回含有 bottom 的 immutable#List。
```

这个可以理解为生成一个仅仅只能引用一组样式的插件。

#### RemoveStyle 移除样式

```js
RemoveStyle#toggle();                  // 移除选区内样式，包括用 CustomStyle 和 NormalStyle 生成的样式
```

#### Link 为选区添加链接

```js
Link#toggle({href:'http://www.baidu.com'}); // 选中的文字别包裹上一个 a 标签 href 为 http://www.baidu.com
Link#getEntity();                           // 获取实体，调用返回对象的 getData 方法即可获取传入的数据，此处即为 {href:'http://www.baidu.com'}，主要用于按钮显示。
```

#### RemoveTag 移除链接

```js
RemoveTag#toggle();                         // 为选中区域取消链接
```

[1]: http://acohome.cn/demo/draft/
[2]: https://github.com/acccco/draft-x/tree/master/example/richEditor
[3]: https://github.com/acccco/draft-x/tree/master/example/toHtml/index.js
[4]: https://github.com/acccco/draft-x/tree/master/example/richEditor
[5]: https://draftjs.org/docs/getting-started
