import { Request, Response } from "express";
import Stripe from "stripe";
import { IOrder } from "../models/IOrder";

export const createCheckoutSessionHosted = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const { order_items, id }: IOrder = req.body;
  const line_items = order_items.map((item) => ({
    price_data: {
      currency: "SEK",
      product_data: {
        name: item.product_name,
      },
      unit_amount: item.unit_price * 100,
    },
    quantity: item.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/checkout`,
    client_reference_id: id,
  });
  res.json({
    checkout_url: session.url,
    session_id: session.id 
  });
};

