import { createContext, useReducer, Dispatch, useEffect } from "react";
import { ICartAction, CartReducer } from "../reducers/CartReducer";
import { ICartItem } from "../types/CartItem";

export interface ICartContext {
    cart: ICartItem[];
    dispatch: Dispatch<ICartAction>;
}

const CartContext = createContext<ICartContext>({cart: [], dispatch: () => null});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, dispatch] = useReducer(CartReducer, [], () => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};


export default CartContext;