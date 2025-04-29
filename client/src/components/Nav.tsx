import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Products</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/checkout">Checkout</NavLink>
        </li>
      </ul>
    </nav>
  );
};