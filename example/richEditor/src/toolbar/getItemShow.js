/*
 * @Author: Aco
 * @Date: 2018-11-06 14:19:56
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-28 12:41:51
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
      return 'Normal';
    case 'H1':
      return 'H1';
    case 'H2':
      return 'H2';
    case 'H3':
      return 'H3';
    case 'H4':
      return 'H4';
    case 'H5':
      return 'H5';
    case 'H6':
      return 'H6';
    case 'Blockquote':
      return 'Blockquote';
    case 'Code Block':
      return 'Code';
    default:
      return '';
  }
}
