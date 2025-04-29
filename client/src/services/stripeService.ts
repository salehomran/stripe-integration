import axios from "axios";
import { handleRequest, API_URL } from "./baseService";
import { IOrder } from "../types/order";
import { IStripeCheckoutSession } from "../types/Stripe";

export const createCheckoutSessionHosted = async (order: IOrder) => {
  return await handleRequest<IStripeCheckoutSession>(axios.post(`${API_URL}/stripe/create-checkout-session-hosted`, order));
};