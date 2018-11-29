/*
 * @Author: Aco
 * @Date: 2018-11-06 14:19:56
 * @LastEditors: Aco
 * @LastEditTime: 2018-11-29 15:42:27
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
