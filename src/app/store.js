import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import restaurantSlice from "../features/restaurants/restaurantSlice";
import cartSlice from "../features/cart/cartSlice";
import configSlice from "../features/config/configSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        restaurants: restaurantSlice,
        cart: cartSlice,
        config: configSlice
    }
})
export default store;