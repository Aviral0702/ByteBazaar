import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example mock data
const mockProducts = [{
        id: 1,
        name: 'Product 1',
        imageUrl: 'https://via.placeholder.com/150',
        cashbackOffer: '10% Cashback',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        savings: '50%',
        eligibilityRequirements: ['Requirement 1', 'Requirement 2'],
        features: ['Feature 1', 'Feature 2'],
        benefits: ['Benefit 1', 'Benefit 2'],
        tags: ['Tag 1', 'Tag 2'],
        website: 'https://example.com',
        serviceProviders: [{
                name: 'Provider 1',
                imageUrl: 'https://via.placeholder.com/50',
                services: ['Service 1', 'Service 2'],
                description: 'Provider 1 description',
                link: 'https://provider1.com',
            },
            {
                name: 'Provider 2',
                imageUrl: 'https://via.placeholder.com/50',
                services: ['Service 3', 'Service 4'],
                description: 'Provider 2 description',
                link: 'https://provider2.com',
            },
        ],
        discountTitle: 'Discount Title',
        discountDescription: 'Discount description.',
    },
    // Add more mock data as needed
];

const initialState = {
    products: [],
    currentProduct: null,
    error: null,
    loading: false,
};

// Async Thunk Action to fetch products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async() => {
        try {
            // Replace this with actual service call once implemented
            // For now, using mock data
            return new Promise((resolve) => {
                setTimeout(() => resolve(mockProducts), 1000); // Simulate async delay
            });
        } catch (error) {
            throw Error('Failed to fetch products.'); // Customize error handling as per your application needs
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // Add other synchronous reducers as needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default productSlice.reducer;