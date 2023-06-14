import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  cartQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDishToCart: (state, action) => {
      const existingIndex = state.value.findIndex(
        (item) => item.name === action.payload.name
      );

      // state.value = [...state.value, action.payload];
      if (existingIndex >= 0) {
        state.value[existingIndex] = {
          ...state.value[existingIndex],
          cartQuantity: state.value[existingIndex].cartQuantity + 1,
        };
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.value.push(tempProductItem);
      }
    },
    removeDishFromCart: (state, action) => {
      const itemIndex = state.value.findIndex(
        (item) => item.name === action.payload.name
      );
      // console.log(state.value[itemIndex].cartQuantity)
      if (state.value[itemIndex].cartQuantity > 1) {
        state.value[itemIndex].cartQuantity -= 1;
        // console.log(state.value[itemIndex].cartQuantity)
      } else if (state.value[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.value.filter(
          (item) => item.name !== action.payload.name
        );
        state.value = nextCartItems;
      }
    },
    removeAllFromCart: (state, action) => {
      (state.value = []), (state.cartQuantity = null);
    },
  },
});

export const { addDishToCart, removeDishFromCart, removeAllFromCart } =
  cartSlice.actions;
export const selectCart = (state) => state.cart.value;
export default cartSlice.reducer;
