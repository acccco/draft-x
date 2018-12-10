## install

```
npm install darft-x
```

or

```
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

[demo][3]

## use

[code][4]

组件必须传入 plugin(使用的插件)，editorState(初始的 EditorState 对象)，onChange(当编辑器内容发生变化时的执行函数)。

```jsx
<DraftEdiotr
  plugin={plugin}
  editorState={editorState}
  onChange={editorState => this.onChange(editorState)}
  placeholder="从这里开始写正文"
  ref={this.editor}
/>
```

### editorState

由 draft-js 下  的 EditorState 对象创建，一般为 EditorState.createEmpty()。

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

插件提供了一个 toggle 的方法，用于使用，但传入的参数有所不同，提供的方法也不一致，但是同一种类的插件拥有一致的方法和参数。

触发插件的 toggle 方法，即可修改编辑器中的内容。

插件不提供任何的 ui 表现，仅仅关注于实现的逻辑。

目前默认提供了以下作用的插件：

**注:** #前表示对于插件的实例，#后表示实例的方法。

#### atomic 多媒体插件

Image/Audio/Vedio 分别实现了为编辑区添加多媒体的功能，通过插件实例的 toggle 方法即可实现。

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

3 种对其方式：'align-left'/'align-center'/'align-right'，在 toggle 中传入相应属性即可。

```js
Align#toggle('align-left');
Align#getType();// 获取段落文字对其方式
Align#map();// 等效于 ['align-left','align-center','align-right'].map()
```

#### Float 浮动

规定光标选中的块级区域的浮动方式

3 种浮动：'float-left'/'float-none'/'float-right'，在 toggle 中传入相应属性即可。

```js
Float#toggle('float-left');
Float#getType();// 获取块级区域的浮动状态
Float#map();// 等效于 ['align-left','align-center','align-right'].map()
```

#### BaseBI 块级区域的层级

仅仅支持在列表元素上使用，效果为 li 往里缩进。

效果分为缩进和前进：'indent'/'outdent'。

```js
BaseBI#toggle('indent')
```

#### BaseBT 定义段落的呈现方式

BaseBT 为基础的块级呈现，支持 11 中效果。分别为：Normal/H1/H2/H3/H4/H5/H6/Blockquote/UL/OL/Code

```js
BaseBT#constructor(['H1','H2','H3','H4']); // 参数为 11 中效果的集合数组
BaseBT#getType(); // 用于获取段落类型，类型为实例化时传入的数组中的一个或为空
BaseBT#map(); // 等效于 ['H1','H2','H3','H4'].map()
BaseBT#toggle('H1'); // 将段落应用特定样式
```

[1]: http://acohome.cn/demo/draft/
[2]: https://github.com/acccco/draft-x/tree/master/example/richEditor
[3]: https://github.com/acccco/draft-x/tree/master/example/toHtml/index.js
[4]: https://github.com/acccco/draft-x/tree/master/example/richEditor
