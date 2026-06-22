import { stripe } from "../../lib/stripe";

export default async function handler(req, res) {
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
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/chat?paid=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/chat`,
  });

  res.json({ url: session.url });
}
