import { configureStore } from '@reduxjs/toolkit'
import listingReducer from './modules/listing'

const store = configureStore({
  reducer: {
    listing: listingReducer
  }
})

// Typescript Type Support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;