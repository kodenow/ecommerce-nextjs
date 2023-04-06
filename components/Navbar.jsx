import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p>
        <Link href="/">Spectrum Headphones</Link>
      </p>
      <button type="button" className="cart-icon" onClick="">
        <AiOutlineShopping />
        <span className="cart-items-qty">1</span>
      </button>
    </div>
  );
};

export default Navbar;
