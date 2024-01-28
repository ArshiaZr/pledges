const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../models/user");
//also need to increment the balance

const stripePayment = async (req, res) => {
  //handling of stripe payment
  const { amount } = req.body; // amount should be sent in the smallest currency unit, like cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad", // or your preferred currency
      // additional options can be added here
    });

    //also increment user's balance
    const userId = req._id;
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { balance: amount } },
      { new: true }
    );

    res.json({ clientSecret: paymentIntent.client_secret, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = stripePayment;