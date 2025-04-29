import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getOrderByPaymentId, updateOrder } from "../services/orderService";
import { IOrderItem } from "../types/orderItem";
import { IOrderDetails } from "../types/OrderDetails";
import { CustomerContext } from "../contexts/CustomerContext";
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";

export default function OrderConfirmationPage() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [order, setOrder] = useState<IOrderDetails | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [customerName, setCustomerName] = useState<string>("");
    const { setCustomer } = useContext(CustomerContext);
    const { dispatch } = useContext(CartContext);

    useEffect(() => {
        if (sessionId) {
            const fetchOrder = async () => {
                const order = await getOrderByPaymentId(sessionId);
                if (order) {
                    setOrder(order);
                    setTotalPrice(order.order_items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0));
                    setOrderItems(order.order_items);
                    setCustomerName(`${order.customer_firstname} ${order.customer_lastname}`);
                    order.payment_status = "Paid";
                    order.order_status = "Received";
                    await updateOrder(order);
                    setCustomer(null);
                    dispatch({ type: CartActionType.RESET_CART, payload: [] });
                }
            }
            fetchOrder();
        }
    }, [sessionId]);
    return (
        <div>
            <h1>Order Confirmation</h1>
            {order && (
                <div>
                    <p>Thank you {customerName} for your order!</p>
                    <p>Total Price: {totalPrice} SEK</p>
                    <p>Ordered Items: {orderItems.map((item) => item.product_name).join(", ")}</p>
                </div>
            )}
        </div>
    )
}