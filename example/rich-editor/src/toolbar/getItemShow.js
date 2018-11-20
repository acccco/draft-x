/*
 * @Author: Aco
 * @Date: 2018-11-06 14:19:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2018-11-14 17:10:01
 * @Description: description
 */

export function getInlineIcon(type) {
  switch (type) {
    case 'bold':
      return 'bold';
    case 'lineThrough':
      return 'strikethrough';
    case 'underLine':
      return 'underline';
    case 'italic':
      return 'italic';
    case 'top':
      return 'up';
    case 'bottom':
      return 'down';
    default:
      return '';
  }
}

export function getBlockIcon(type) {
  switch (type) {
    case 'UL':
      return 'bars';
    case 'OL':
      return 'ordered-list';
    case 'align-left':
      return 'align-left';
    case 'align-center':
      return 'align-center';
    case 'align-right':
      return 'align-right';
    case 'align-justify':
      return 'icon-735bianjiqi_liangduanduiqi';
    case 'float-left':
      return 'pic-left';
    case 'float-right':
      return 'pic-right';
    default:
      return '';
  }
}

export function getMediaIcon(type) {
  switch (type) {
    case 'image':
      return 'picture';
    case 'audio':
      return 'sound';
    case 'video':
      return 'video-camera';
    default:
      return '';
  }
}

export function getText(type) {
  switch (type) {
    case 'Normal':
      return '普通文本';
    case 'H1':
      return '标题一';
    case 'H2':
      return '标题二';
    case 'H3':
      return '标题三';
    case 'H4':
      return '标题四';
    case 'H5':
      return '标题五';
    case 'H6':
      return '标题六';
    case 'Blockquote':
      return '引用';
    case 'Code Block':
      return '代码块';
    default:
      return '';
  }
}
