/* eslint-disable curly */
const moment = require('moment');
import {ResponsiveUtils, Colors, Utils, ThemeUtils} from '@common';

let removeUnicode = (text, removeSpace) => {
  if (typeof text !== 'string') {
    throw new Error('Type of text input must be string!');
  }
  if (removeSpace && typeof removeSpace != 'boolean') {
    throw new Error('Type of removeSpace input must be boolean!');
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

const printerBill = function (order, currency, paid) {
  var products = '';
  var total = 0;
  var quantity = 0;
  if (order.sale_location == undefined)
    order.sale_location = {address: 'Default'};

  if (order.customer_paid == undefined) order.customer_paid = 0;
  if (order.amount_refund == undefined)
    order.amount_refund = order.final_cost - order.customer_paid;

  for (var i = 0; i < order.order_details.length; i++) {
    if (
      order.order_details[i].sale_price == undefined ||
      order.order_details[i].sale_price == 0
    )
      order.order_details[i].sale_price = order.order_details[i].price;

    products += `[L]${removeUnicode(
      order.order_details[i].variants[0].title,
    )}[R]${order.order_details[i].sale_price}[R]${
      order.order_details[i].quantity
    }[R]${
      order.order_details[i].quantity * order.order_details[i].sale_price
    }\n`;

    quantity += order.order_details[i].quantity;
    total +=
      order.order_details[i].quantity * order.order_details[i].sale_price;
  }
  var vat = total * 0.1;
  order.final_cost = total + vat;

  var data = {
    text:
      '[L]\n' +
      '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_359868b1-f771-4bce-a771-af60a91e40f1_image_test.png</img>\n' +
      '[L]\n' +
      `[L]${removeUnicode(order.sale_location.name)}[R]電話. ${
        order.sale_location.phone
      }\n` +
      `[L]${order.sale_location.address}\n` +
      `[L][L]${moment().format('yyyy/MM/DD HH:mm:ss')}[R]人数: ${
        order.number_people
      }\n` +
      `[L]No. [R]${order.code}  #: ${removeUnicode(order.table.name)}\n` +
      `[L]入店時間:${moment(order.create_date).format(
        'yyyy/MM/DD HH:mm:ss',
      )}[R]スタッフ ${removeUnicode(order.employee.last_name)}\n` +
      '[L]商品名[R]単価[R]数[R]金額\n' +
      products +
      '[L]=== ビール アイウ ===\n' +
      '[L]<u>=== 訪問していただきありがとうございます ===</u>\n' +
      '[L]\n' +
      '[L]\n' +
      `[L]小計:[R] [R][R]${quantity}[R]${total}\n` +
      `[L]消費税等:[R]${'10'}%[R] ${vat}\n` +
      `[L]クーポン:[R]  [R][R]${0}\n` +
      `[C]<font size='big'>合計: [R]  [R][R]${order.final_cost}</font>\n`,
  };

  data.text +=
    '[C]================================\n' + '[L]\n' + '[L]\n' + '[L]\n';
  console.log(order);
  return data;
};

const printerBill2 = function (order, currency, paid) {
  var img = '';
  for (var i = 0; i < order.length; i++) {
    img += `[C]<img>${order[i]}</img>\n`;
    console.log('img', order[i]);
  }

  // var data = {
  //   text:
  //     '[L]\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_d3e73646-8fcd-42e2-b52c-cec2cbd0a957_image_test_0.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_9b8781a5-a7a2-4bed-b220-dc2a44f12c2e_image_test_1.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_d939a145-d2ce-4cac-b780-f779abf7a719_image_test_2.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_3bbc5322-1020-4040-a2b4-47ba05f7de88_image_test_3.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_2c3670d3-e3e4-465f-8a62-390748461ba5_image_test_4.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_ead10247-b85b-4e75-a0da-a3db9ca8de45_image_test_5.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_e690d7dd-ef90-44ba-ada8-f3983a831e67_image_test_6.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_064eef9a-901e-47af-915e-a9ca877cba04_image_test_7.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_c5cdbadd-9159-4e97-9114-c9f960f603ed_image_test_8.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_32efc482-30c2-4377-91af-674147576ba5_image_test_9.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_acce00bc-c442-4dec-96c4-84a10129b8db_image_test_10.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_1ffea186-f7be-4150-9a0a-da2f806044d2_image_test_11.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_9a9d2724-e792-4eed-a717-6af3fa2b8ec2_image_test_12.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_08495e6d-68d9-4e81-b993-729ac48368a3_image_test_13.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_f61930d7-01ff-4742-bd5d-63fdf3a1c501_image_test_14.png</img>\n' +
  //     '[C]<img>https://s3.ap-northeast-1.wasabisys.com/admin-order/2022_03_10_25b191e6-ed8a-4e67-a92a-1402b172892c_image_test_15.png</img>\n' +
  //     '[L]\n',
  // };

  var data = {
    text: '[L]\n' + img + '[L]\n',
  };

  data.text +=
    '[C]================================\n' + '[L]\n' + '[L]\n' + '[L]\n';
  console.log(data);
  return data;
};

export default printerBill2;
