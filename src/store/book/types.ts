
export interface BookState {
	isConnected: boolean;
	books: IBook[];
}

export interface IBook {
  [index: number]: number;
}
