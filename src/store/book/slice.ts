import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBook, BookState } from './types';

const initialState: BookState = {
	isConnected: false,
	books: [],
};

const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		updateBooks: (state, action: PayloadAction<IBook[]>) => {
			state.books = action.payload;
		},
		setIsConnected: (state, action: PayloadAction<boolean>) => {
			state.isConnected = action.payload;
		},
	},
});

export const { updateBooks, setIsConnected } = bookSlice.actions;
export default bookSlice.reducer;
