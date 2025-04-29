import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { 
        path: '/',
        element: <ProductsPage />,
      },
      { 
        path: '/checkout',
        element: <CheckoutPage />,
      },
      {
        path: '/products/:id',
        element: <ProductPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/order-confirmation',
        element: <OrderConfirmationPage />,
      },
    ],
  },
]);

export default router; 