import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addItems: (state, action) => {
            const { items, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === items.id);
            if (existingItem) {
                existingItem.quantity = existingItem.quantity + quantity
            }
            else {
                state.cartItems.push({...items,quantity})
            }
        },
        removeItems: (state, action) => {
            const {item} = action.payload;
            state.cartItems = state.cartItems.filter(items => items.id !== item.id)
        },
        increaseItemQuantity: (state,action) => {
            const {item} = action.payload;
            const existingItem = state.cartItems.find(items => items.id === item.id);
            if (existingItem) {
                existingItem.quantity = existingItem.quantity + 1
            }
        },
        decreaseItemQuantity: (state,action) => {
            const {item} = action.payload;
            const existingItem = state.cartItems.find(items => items.id === item.id);
            if (existingItem) {
                existingItem.quantity = existingItem.quantity - 1
            }
        }
    }
})
export const { addItems, removeItems, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;