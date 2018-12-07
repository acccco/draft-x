## installl

```
npm install darft-x
```

or

```
yarn add draft-x
```

## richEditor

[demo](http://acohome.cn/demo/draft/)
[code](https://github.com/acccco/draft-x/tree/master/example/richEditor)

## toHtml

```
const draftX = require('draft-x');
/* DraftEdiotr#getRaw => json */
const html = draftX.json2html(json);
```

[demo](https://github.com/acccco/draft-x/tree/master/example/toHtml/index.js)

## use

[code](https://github.com/acccco/draft-x/blob/master/example/richEditor/src/App.js)

组件必须传入 plugin(使用的插件)，editorState(初始的 EditorState 对象)，onChange(当编辑器内容发生变化时的执行函数)。

### plugin

```
{
    imagePlugin: new Image(),
    audioPlugin: new Audio(),
    ...
}
```

目前默认提供了以下作用的插件

#### atomic 多媒体插件

Image,Audio,Vedio 分别实现了为编辑区添加多媒体的功能，通过插件实例的 toggle 方法即可实现。

```
plugin.audioPlugin.toggle({
    src:'', // 资源地址
})
```

其中图片插件支持设置或修改图片的数据，视频和音频插件还不支持。

```
plugin.imagePlugin.toggle({
    src:'',    // 资源地址
    width: 400 // 图片大小
})
plugin.imagePlugin.replaceData({
    src:'',    // 资源地址
    width: 300 // 图片大小
})
```
