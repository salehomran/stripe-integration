import { Link, RouterProvider } from 'react-router-dom';
import router from './router';
import './App.css';
import { CartProvider } from './contexts/CartContext';
import { CustomerProvider } from './contexts/CustomerContext';

function App() {
  return (
    <>
      <CustomerProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </CustomerProvider>
    </>
  );
}

export default App;