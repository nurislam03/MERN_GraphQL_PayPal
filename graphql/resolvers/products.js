const Product = require('../../models/Product');
const User = require('../../models/User');

module.exports = {
  products: async () => {
    try {
      const products = await Product.find();
      return products;
    //   return products.map(product => {
    //     return transformEvent(product);
    //   });
    } catch (err) {
      throw err;
    }
  },
  createProduct: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const product = new Product({
      title: args.productInput.title,
      description: args.productInput.description,
      price: +args.productInput.price,
    //   date: new Date(args.productInput.date),
    //   date: args.productInput.date,
      creator: req.userId
      // creator: "5e7f159fce4f3322c8eed83c"
    });
    let createdProduct;
    try {
      const result = await product.save();
      return result;
    //   createdProduct = transformEvent(result); //
    //   const creator = await User.findById(req.userId);

    //   if (!creator) {
    //     throw new Error('User not found.');
    //   }
    //   creator.createdEvents.push(event);
    //   await creator.save();

    //   return createdProduct; //
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};