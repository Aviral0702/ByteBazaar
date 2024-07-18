import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
    },
    reducers: {
        setCartItems(state, action) {
            state.items = action.payload;
            state.totalAmount = action.payload.reduce((total, item) => total + item.discountPrice * item.quantity, 0);
        },
        addItem(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.listingId === item.listingId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({...item, quantity: 1 });
            }
            state.totalAmount += item.discountPrice;
        },
        subtractItem(state, action) {
            const itemId = action.payload;
            const existingItem = state.items.find(i => i.listingId === itemId);
            if (existingItem) {
                existingItem.quantity -= 1;
                state.totalAmount -= existingItem.discountPrice;
                if (existingItem.quantity === 0) {
                    state.items = state.items.filter(i => i.listingId !== itemId);
                }
            }
        },
        deleteItem(state, action) {
            const itemId = action.payload;
            const existingItem = state.items.find(i => i.listingId === itemId);
            if (existingItem) {
                state.totalAmount -= existingItem.discountPrice * existingItem.quantity;
                state.items = state.items.filter(i => i.listingId !== itemId);
            }
        },
    },
});

export const { setCartItems, addItem, subtractItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;