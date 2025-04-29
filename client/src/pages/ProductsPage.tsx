import ProductCard from '../components/ProductCard';
import type { IProduct } from '../types/Product';
import { fetchProducts } from '../services/productService';
import { useEffect, useState } from 'react';

function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <>
      <h1>Products</h1>
      <div>
        {products.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductsPage; 