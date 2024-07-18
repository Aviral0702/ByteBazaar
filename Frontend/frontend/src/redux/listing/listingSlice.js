// listingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch listings
export const fetchListings = createAsyncThunk('listings/fetchListings', async() => {
    const response = await fetch('/api/listings'); // Ensure this is the correct API endpoint
    if (!response.ok) {
        throw new Error('Failed to fetch listings');
    }
    const data = await response.json();
    return data;
});

const listingsSlice = createSlice({
    name: 'listings',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchListings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchListings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default listingsSlice.reducer;