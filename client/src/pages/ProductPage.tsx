import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../types/Product";
import { fetchProduct } from "../services/productService";
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const {cart, dispatch} = useContext(CartContext);

    useEffect(() => {
        fetchProduct(Number(id)).then( (product) => setProduct(product));
    }, [id]);

    const addToCart = (product: IProduct | null) => {
        console.log(product);
        if (product) {
            dispatch({type: CartActionType.ADD_ITEM, payload: {product, quantity: 1}});
            alert(`Product ${product.name} added to cart`);
        }
    };

    return (
        <div>
            <img src={product?.image} alt={product?.name} />
            <h1>Product Page</h1>
            <p>Product Name: {product?.name}</p>
            <p>Product Price: {product?.price}</p>
            <p>Product Description: {product?.description}</p>
            <p>Product Stock: {product?.stock}</p>
            <p>Product Category: {product?.category}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
}