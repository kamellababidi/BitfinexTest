import { combineReducers } from '@reduxjs/toolkit';
import boookSlice from './book/slice';

const rootReducer = combineReducers({
	book: boookSlice,
});

export default rootReducer;
