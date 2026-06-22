import { stripe } from "../../lib/stripe";

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AI Chat Access",
            },
            unit_amount: 200, // $2
          },
          quantity: 1,
        },
      ],

      // IMPORTANT FIX: use Stripe session ID (secure way)
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/chat?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/chat`,
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
