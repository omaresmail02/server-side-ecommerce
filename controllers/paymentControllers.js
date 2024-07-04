import Stripe from 'stripe';

export const getCheckoutSession = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.data.product.title,
          description: product.data.product.description,
          images: [product.data.product.thumbnail],
        },
        unit_amount: Math.round(
          (product.data.product.price -
            product.data.product.price *
              (product.data.product.discountPercentage / 100)) *
            100
        ), // Round to nearest integer
      },
      quantity: product.quantity,
    }));

    // const customer = await stripe.customers.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   metadata: {
    //     phone: req.body.phone,
    //     line1: req.body.adress,
    //   },
    // });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: 'http://localhost:5173/payment-success',
      cancel_url: 'http://localhost:5173/payment-cancel',

      phone_number_collection: {
        enabled: true,
      },

      // customer: customer.id,

      // client_reference_id: req.params.productId,
      mode: 'payment',
      line_items: lineItems,
    });

    res.status(200).json({
      status: 'success',
      data: {
        sessionId: session.id, // Include the session ID in the response
      },
    });
  } catch (err) {
    next(err);
  }
};
