// 仔细分析 getOrderTotal 函数，该函数内实现了多种计算：
// 从总价中减去折扣、订单中所有商品的总价、总运费、总税额和订单总价
// 其中任一一个出错都将计算错误，为了让功能粒度更细，将上述计算抽出来

/**
 * 计算所有lineitems的总价
 * @param {Array} lineItems 包括所购商品、商品数量及每种商品的单位运费
 * @returns {Number} 所有lineItems的总价
 */
const getLineItemTotal = lineItems => {
  let lineItemTotal = 0;

  for (let i = 0; i < lineItems.length; i++) {
    let lineItem = lineItems[i];

    lineItemTotal += lineItem.price * lineItem.quantity;
  }

  return lineItemTotal;
}
/**
 * 计算所有lineItems的总运费
 * @param {Array} lineItems 包括所购商品、商品数量及每种商品的单位运费
 * @returns {Number} shippingTotal 所有lineItems的运费
 */
const getShippingTotal = lineItems => {
  let shippingTotal = 0;

  for (let i = 0; i < lineItems.length; i++) {
    let lineItem = lineItems[i];
    shippingTotal += lineItem.shippingPrice * lineItem.quantity;
  }

  return shippingTotal;
}
/**
 * 计算一个订单的总价按照折扣减去了多少钱
 * @param {Number} lineItemTotal 所有line items的总价
 * @param {String} discountCode 可选择使用的折扣码，加入运费和税费之前使用该码
 * @returns {Number} 订单总价按折扣减去多少钱
 */
const getDiscountTotal = (lineItemTotal, discountCode) => {
  let discountTotal = 0;

  if (discountCode === '20PERCENT') {
    discountTotal = lineItemTotal * 0.2;
  }

  return discountTotal;
}
/**
 * 计算一个订单应缴纳的总税费 * 
 * @returns {Number} taxTotal 一个订单应缴纳的总税费
 */
const getTaxTotal = () => {
  let taxTotal = 0;

  if (customer.shiptoState === 'CA') {
    taxTotal = lineItemTotal * 0.08;
  }

  return taxTotal;
}

/**
 *打过折、加入运费和税费之后，计算订单总价。
 * @param {Object} customer——顾客信息，关于下订单者的一组信息。
 * @param {Array} lineItems——数组，包括所购商品、商品数量及每种商品的单位运费。
 * @param {String} discountCode——可选择使用的折扣码，加入运费和税费之前使用该码。
 */
const getOrderTotal = (customer, lineItems, discountCode) => {
  let lineItemTotal = getLineItemTotal(lineItems);
  let shippingTotal = getShippingTotal(lineItems);
  let discountTotal = getDiscountTotal(lineItemTotal, discountCode);
  let taxTotal = getTaxTotal(lineTtemTotal, customer);

  return lineItemTotal - discountTotal + shippingTotal + taxTotal;
}

// 我们观察到：
// 1. 函数更多
// 2. 单元测试更多
// 3. 每个函数实现一个特定的功能
// 4. 每个函数都有其单元测试
// 5. 多个函数组合可实现复杂计算

// getOrderTotal 函数内部计算各种价格的代码被抽取出来，作为一个个单独的函数，而且每个函数都有相应的单元测试。
// 这意味着当代码中引入 bug 时，更容易定位受影响的功能。此外，如果总税额或运费需要更换计算方式，
// 而现有功能已经提供了可用的单元测试，那么更换之后，可方便地用单元测试加以验证。