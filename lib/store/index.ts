import { configureStore } from '@reduxjs/toolkit'
import listingReducer from './modules/listing'
import reservationReducer from './modules/reservation'

const store = configureStore({
  reducer: {
    listing: listingReducer,
    reservation: reservationReducer,
  }
})

// Typescript Type Support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;