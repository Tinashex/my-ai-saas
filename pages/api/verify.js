import { stripe } from "../../lib/stripe";

export default async function handler(req, res) {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ access: false, error: "Missing session_id" });
    }

    // Retrieve checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Check if payment was successful
    if (session.payment_status === "paid") {
      return res.status(200).json({
        access: true,
        customer: session.customer,
      });
    }

    return res.status(200).json({
      access: false,
      message: "Payment not completed",
    });

  } catch (error) {
    return res.status(500).json({
      access: false,
      error: error.message,
    });
  }
}
