import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant",
    initialState: {
        restaurants: null,
        categoriesData: null
    },
    reducers: {
        addRestaurantData: (state,action) => {
            state.restaurants = action.payload;
        },
        addCategoriesData: (state,action) => {
            state.categoriesData = action.payload;
        }
    }
})
export const {addRestaurantData,addCategoriesData} = restaurantSlice.actions;
export default restaurantSlice.reducer;