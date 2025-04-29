import axios from "axios";
import { IOrder } from "../types/order";
import { handleRequest, API_URL } from "./baseService";
import { IOrderDetails } from "../types/OrderDetails";

export const createOrder = async (order: IOrder) => {
    return await handleRequest<{id: number, message: string}>(axios.post(`${API_URL}/orders`, order));
}

export const updateOrder = async (order: IOrder) => {
    return await handleRequest<{ message: string}>(axios.patch(`${API_URL}/orders/${order.id}`, order));
}

export const getOrderByPaymentId = async (paymentId: string) => {
    return await handleRequest<IOrderDetails>(axios.get(`${API_URL}/orders/payment/${paymentId}`));
}