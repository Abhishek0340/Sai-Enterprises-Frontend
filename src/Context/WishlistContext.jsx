import React, { createContext, useContext, useReducer } from "react";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      // Avoid duplicates
      return state.find(item => item._id === action.payload._id)
        ? state
        : [...state, action.payload];
    case "REMOVE_FROM_WISHLIST":
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);
  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
