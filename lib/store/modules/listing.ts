import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { safeListing } from '@/types';
import { Listing } from "@prisma/client";

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

const initialState: {
  safeListings: safeListing[],
  loading: boolean,
  error: string | null,
} = {
  safeListings: [],
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
  }
})

export default listingStore.reducer;

