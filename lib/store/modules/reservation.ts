import { safeReservation } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IGetReservationsParams {
  authorId?: string,  
  userId?: string  
  listingId?: string
}

export interface IPostReservationsParams {
  listingId: string,
  startDate: Date,
  endDate: Date,
  totalPrice: number
}

export interface IDelReservationsParams {
  reservationId?: string;
}

export const getReservations = createAsyncThunk(
  "reservation/getReservations", 
  async(params: IGetReservationsParams, { rejectWithValue}) => {
    try {
      const res = await axios.get('/api/reservations', {params})
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message); // Redux will dispatch rejected automatically
    } 
  }
);

export const postReservations = createAsyncThunk(
  "reservation/postReservations", 
  async(params: IPostReservationsParams, { rejectWithValue}) => {
    try {
      const response = await axios.post('/api/reservations', params);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message); // Redux will dispatch rejected automatically
    } 
  }
);

export const delReservations = createAsyncThunk(
  "reservation/delReservations", 
  async(params: IDelReservationsParams, { rejectWithValue}) => {
    try {
      const { reservationId } = params;
      await axios.delete(`/api/reservations/${reservationId}`);
      return reservationId;
    } catch (err: any) {
      return rejectWithValue(err.message); // Redux will dispatch rejected automatically
    } 
  }
);

const initialState : {
  safeReservations: safeReservation[],
  reservation: safeReservation,
  loading: boolean,
  error: string | null,
} = {
  safeReservations: [],
  reservation: {
    id: "",  
    userId: "",  
    listingId: "",  
    startDate: "",  
    endDate: "",  
    totalPrice: 1,  
    createdAt: "",
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
      price: 1
    }
  },
  loading: false,
  error: null as string | null,
};

const reservationStore = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReservations.fulfilled, (state, action) => {
        state.safeReservations = action.payload;
        state.loading = false;
      })
      .addCase(getReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(postReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReservations.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(delReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delReservations.fulfilled, (state, action) => {
        state.loading = false;
        // Filter safeReservations array instead of reservations object
        if (action.payload) {
          state.safeReservations = state.safeReservations.filter(
            (reservation) => reservation.id !== action.payload
          );
        }
      })
      .addCase(delReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default reservationStore.reducer;