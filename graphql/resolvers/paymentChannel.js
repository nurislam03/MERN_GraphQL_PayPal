const PaymentChannel = require('../../models/PaymentChannel');


module.exports = {
  paymentChannel: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const result = await PaymentChannel.findOne({ user: req.userId });
      console.log(result);
        return result;
    } catch (err) {
        throw err;
    }
  },
  createPaymentChannel: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const channel = new PaymentChannel({
      sandbox: args.paymentChannelInput.sandbox,
      user: req.userId
    });

    // update payment channel if exist
    const existingChannel = await PaymentChannel.findOne({ user: req.userId });
    if (existingChannel) {
      console.log("Existing-Channel: "+ existingChannel);
      try {
        await PaymentChannel.updateOne({user: req.userId}, { $set: {sandbox: args.paymentChannelInput.sandbox}});
        return;
      } catch {
        console.log(err);
        throw err;
      }
    }

    // create new channel
    try {
      const result = await channel.save();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
