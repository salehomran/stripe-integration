import { useContext } from "react";
import { ICartItem } from "../types/CartItem";
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";

export default function CartRow(item: ICartItem) {
    const {cart, dispatch} = useContext(CartContext);

    const removeFromCart = (id: number) => {
        dispatch({type: CartActionType.REMOVE_ITEM, payload: {product: item.product, quantity: item.quantity}});
    }

    const increaseQuantity = (id: number) => {
        dispatch({type: CartActionType.CHANGE_QUANTITY, payload: {product: item.product, quantity: 1}});
    }

    const decreaseQuantity = (id: number) => {
        dispatch({type: CartActionType.CHANGE_QUANTITY, payload: {product: item.product, quantity: -1}});
    }

    return (
        <div>
            <h1>Product Name: {item.product.name}</h1>
            <p>Product Price: {item.product.price}</p>
            <p>Product Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
            <button onClick={() => increaseQuantity(item.product.id)}>+</button>
            <button onClick={() => decreaseQuantity(item.product.id)}>-</button>
        </div>
    );
}