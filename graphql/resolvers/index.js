const authResolver = require('./auth');
const productsResolver = require('./products');

const rootResolver = {
  ...authResolver,
  ...productsResolver
};

module.exports = rootResolver;