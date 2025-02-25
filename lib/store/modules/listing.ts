import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { safeListing, safeUser } from '@/types';

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export interface IParams {
  listingId?: string;
}

export const getListings = createAsyncThunk(
  "listing/getListings",
  async (params: IListingsParams, { rejectWithValue}) => {
    try {
      const query = new URLSearchParams(params as Record<string, string>).toString();

      const res = await fetch(`/api/listings?${query}`);
  
      const data = await res.json();
  
      return data; // Redux will dispatch fulfilled automatically
    } catch (err: any) {
      return rejectWithValue(err.message); // Redux will dispatch rejected automatically
    } 
  }
);

export const getListingsById = createAsyncThunk(
  "listing/getListingsById",
  async (params: IParams, { rejectWithValue}) => {
    try {
      const { listingId } = params;

      const res = await fetch(`/api/listings/${listingId}`);
  
      const data = await res.json();
  
      return data; // Redux will dispatch fulfilled automatically
    } catch (err: any) {
      return rejectWithValue(err.message); // Redux will dispatch rejected automatically
    } 
  }
);

export const getProperties = createAsyncThunk(
  "listing/getProperties",
  async (_, { rejectWithValue}) => {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message); 
    } 
  }
);

export const getFavorites = createAsyncThunk(
  "listing/getFavorites",
  async (_, { rejectWithValue}) => {
    try {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      return data; 
    } catch (err: any) {
      return rejectWithValue(err.message);
    } 
  }
);

const initialState: {
  safeListings: safeListing[],
  listing: safeListing & {
    user: safeUser
  },
  loading: boolean,
  error: string | null,
} = {
  safeListings: [],
  listing: {
    id: "",  
    title: "",  
    description: "",  
    imageSrc: "",  
    createdAt: "",  
    category: "",  
    roomCount: 1,  
    bathroomCount: 1,  
    guestCount: 1,  
    locationValue: "",  
    userId: "",  
    price: 1,
    user: {
      createdAt: "",
      email: "",
      emailVerified: null,
      favoriteIds: [],
      hashedPassword: "",
      id:"",
      image: null,
      name: "",
      updatedAt: ""
    }
  },
  loading: false,
  error: null as string | null,
}

const listingStore = createSlice({
  name: 'listing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.safeListings = action.payload;
        state.loading = false;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getListingsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListingsById.fulfilled, (state, action) => {
        state.listing = action.payload;
        state.loading = false;
      })
      .addCase(getListingsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.safeListings = action.payload;
        state.loading = false;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.safeListings = action.payload;
        state.loading = false;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
})

export default listingStore.reducer;

