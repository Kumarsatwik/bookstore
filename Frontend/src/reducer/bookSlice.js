import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook(state, action) {
      state.bookList = action.payload;
    },
    deleteBook(state, action) {
      const { id } = action.payload;
      const deleteBook = state.bookList.filter((book) => book._id !== id);
      state.bookList = deleteBook;
    },
  },
});
export const { addBook, deleteBook } = bookSlice.actions;
export default bookSlice;
