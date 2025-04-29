import { IOrderItem } from "./orderItem";

export interface IOrder {
    id: number;
    customer_id: number;
    payment_status: string;
    payment_id: string;
    order_status: string;
    order_items: IOrderItem[];
}