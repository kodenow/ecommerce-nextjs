import { update } from "lodash";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Create a context for managing global state
const Context = createContext();

// State provider component for managing global state
export const StateContext = ({ children }) => {
  // Define state variables using the useState hook
  const [showCart, setShowCart] = useState(false); // Controls visibility of the cart
  const [cartItems, setCartItems] = useState([]); // Stores items in the cart
  const [totalPrice, setTotalPrice] = useState(0); // Stores the total price of all items in the cart
  const [totalQuantities, setTotalQuantities] = useState(0); // Stores the total quantity of all items in the cart
  const [qty, setQty] = useState(1); // Stores the quantity of the currently selected item to be added to the cart

  let foundProduct;
  let index;

  // Function to add a product to the cart
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    // Update the total price and total quantities
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      // If the product already exists in the cart, update its quantity
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      // If the product does not exist in the cart, add it with the given quantity
      product.quantity = quantity;

      /* 
      This is the new value being set for cartItems state. 
      It uses the spread syntax ([...]) to create a new array 
      that includes all the existing items in cartItems (preserving their values) 
      and adds a new item { ...product } to the end
       */
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  // Function to remove a product from the cart
  const onRemove = ({ _id: productId }) => {
    foundProduct = cartItems.find((item) => item._id === productId);
    //If the condition is true, the item is included in the new filtered array, and if the condition is false, the item is excluded from the new array.
    const newCartItems = cartItems.filter((item) => item._id !== productId);

    // Update the total price, total quantities, and cart items
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  // Function to toggle the quantity of a cart item (increment or decrement)
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (value === "inc") {
      // If incrementing, update the quantity, total price, and total quantities
      const updatedItems = cartItems.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCartItems(updatedItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        const updatedItems = cartItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });

        setCartItems(updatedItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
