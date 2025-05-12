import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItem = state.find((item) => item._id === action.payload._id);
            if (existingItem) {
                return state.map((item) =>
                    item._id === action.payload._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...state, { ...action.payload, quantity: 1 }];
            }
        case "REMOVE_FROM_CART":
            return state.filter((item) => item._id !== action.payload);
        case "UPDATE_QUANTITY":
            return state.map((item) =>
                item._id === action.payload.productId
                    ? { ...item, quantity: item.quantity + action.payload.amount }
                    : item
            ).filter(item => item.quantity > 0);
        default:
            return state;
    }
};

export default function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
