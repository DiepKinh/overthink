const moment = require('moment');

let removeUnicode = (text, removeSpace) => {
  if (typeof text !== 'string') {
    return text;
  }
  if (removeSpace && typeof removeSpace !== 'boolean') {
    return text;
  }
  text = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
  if (removeSpace) {
    text = text.replace(/\s/g, '');
  }
  return text;
};

export const dataPrinterFood = function (name_table, order) {
  var products = '';

  if (order.name !== undefined) {
    products += `[L]<font size='big'>${removeUnicode(
      order.name,
    )}</font>[R]<font size='big'>${order.quantity}</font>\n`;
  } else {
    products += `[L]<font size='big'>${removeUnicode(
      order.variants[0].title,
    )}</font>[R]<font size='big'>${order.quantity}</font>\n`;
  }

  const data = {
    text:
      `[C]<font size='big'>${removeUnicode(
        name_table,
      )}</font>[R]${moment().format('HH:mm:ss')}\n` +
      '[L]\n' +
      products +
      '[L]\n',
  };
  console.log(data);
  return data;
};
