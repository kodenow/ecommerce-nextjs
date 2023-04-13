import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <div>
        <Link href="/">
          <img className="kodenowlogo" src="/KodeNowLogo.png" alt="" />
        </Link>
      </div>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
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
