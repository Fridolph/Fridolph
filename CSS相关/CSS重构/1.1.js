/**
 * 打过折、加入运费和税费之后，计算订单总价。
 *
 * @param {Object} customer——顾客信息，关于下订单者的一组信息。
 *
 * @param {Array.<Object>} lineItems——数组，包括所购商品、商品数量及每种商品的单位运费。
 *
 * @param {string} discountCode——可选择使用的折扣码，加入运费和税费之前使用该码。
 */
var getOrderTotal = function (customer, lineItems, discountCode) {
  var discountTotal = 0;
  var lineItemTotal = 0;
  var shippingTotal = 0;
  var taxTotal = 0;

  for (var i = 0; i < lineItems.length; i++) {
      var lineItem = lineItems[i];
      lineItemTotal += lineItem.price * lineItem.quantity;
      shippingTotal += lineItem.shippingPrice * lineItem.quantity;
  }

  if (discountCode === '20PERCENT') {
      discountTotal = lineItemTotal * 0.2;
  }

  if (customer.shiptoState === 'CA') {
    taxTotal = (lineItemTotal - discountTotal) * 0.08;
  }

  var total = (
      lineItemTotal -
      discountTotal +
      shippingTotal +
      taxTotal
  );

  return total;
};

var lineItem1 = {
  price: 50,
  quantity: 1,
  shippingPrice: 10
};

var lineItem2 = {
  price: 100,
  quantity: 2,
  shippingPrice: 20
};

var lineItems = [lineItem1, lineItem2];

var customer = {
  shiptoState: 'CA'
};

var discountCode = '20PERCENT';

var total = getOrderTotal(customer, lineItems, discountCode);

console.log('Total: $' + total);