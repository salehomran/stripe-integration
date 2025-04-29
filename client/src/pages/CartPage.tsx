import { useContext, useState, useEffect } from "react";
import CartContext from "../contexts/CartContext";
import CartRow from "../components/CartRow";
import { useNavigate } from "react-router";

export default function CartPage() {
    const {cart} = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const total = cart.map((item) => item.product.price * item.quantity);
        console.log(total);
        setTotal(total[0]);
    }, [cart]);

    return (
        <div>
            <h1>Cart</h1>
            {cart.length === 0 && <p>No items in cart</p>} 
            {cart.length > 0 && (
                <>
                    <ul>
                        {cart.map((item) => (
                            <CartRow key={item.product.id} {...item} />
                        ))}
                    </ul>
                    <p>Total: {total}</p>
                    <button onClick={() => navigate('/checkout')}>Checkout</button>
                </>
            )}
        </div>
    );
}