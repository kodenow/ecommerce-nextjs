import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p>
        <Link href="/">Spectrum Headphones</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-items-qty">{totalQuantities}</span>
      </button>

      {
        // Conditional rendering using logical AND operator
        // The Cart component will be rendered if showCart is truthy
        showCart && <Cart />
      }
    </div>
  );
};

export default Navbar;
