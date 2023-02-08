import { createContext } from "react";
import useSessionStorageState from "use-session-storage-state";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useSessionStorageState("cart", {
    defaultValue: [],
  });
  const getItemQuantity = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };
  const addToCart = (id) => {
    setCart((curr) => {
      if (curr.find((item) => item.id === id) == null) {
        return [...curr, { id, quantity: 1 }];
      } else {
        return curr.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const deleteFromCart = (id) => {
    setCart((curr) => {
      if (curr.find((item) => item.id === id)?.quantity === 1) {
        return curr.filter((item) => item.id !== id);
      } else {
        return curr.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeItemFromCart = (id) => {
    setCart((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          addToCart,
          getItemQuantity,
          deleteFromCart,
          removeItemFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
