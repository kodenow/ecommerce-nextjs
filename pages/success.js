import { useState, useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";
import { runConfettiRealistic } from "@/lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runConfettiRealistic();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">Check your email inbox for the receipt</p>
        <p className="description">
          If you have any questions, please email
          <a href="mailto:test@example.com" className="email">
            test@example.com
          </a>
        </p>
        <Link href="/">
          <button className="btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
