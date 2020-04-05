const authResolver = require('./auth');
const productsResolver = require('./products');
const paymentChannelResolver = require('./paymentChannel');

const rootResolver = {
  ...authResolver,
  ...productsResolver,
  ...paymentChannelResolver
};

module.exports = rootResolver;