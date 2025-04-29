import type { IProduct } from '../types/Product';
import { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import { CartActionType } from '../reducers/CartReducer';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, dispatch } = useContext(CartContext);

  const handleAddToCart = (product: IProduct) => {
    dispatch({ type: CartActionType.ADD_ITEM, payload: { product, quantity: 1 } });
    alert(`Product ${product.name} added to cart`);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
      <a href={`/products/${product.id}`}>View Product</a>
    </div>
  );
}