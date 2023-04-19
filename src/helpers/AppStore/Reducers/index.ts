import { combineReducers } from '@reduxjs/toolkit';
import { UserAuthSlice } from '../../../screens/Auth/Login/redux';
export const rootReducer = combineReducers({
  userAuth: UserAuthSlice.reducer,
});
