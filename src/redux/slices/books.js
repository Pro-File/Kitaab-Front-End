import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  value: [],
  page: 0,
  numberOfPages: 0,
  isLoading: true,
};

const booksSlice = createSlice({
  name: "books",
  initialState: initialValue,
  reducers: {
    getAllBooks: (state, actions) => {
      return {
        ...state,
        value: [...actions.payload.books],
        page: actions.payload.currentPage,
        numberOfPages: actions.payload.numberOfPages,
      };
    },
    startBookLoading: (state, actions) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    endBookLoading: (state, actions) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    addNewBook: (state, actions) => {
      return {
        ...state,
        value: [...state.value, actions.payload],
      };
    },
    addReview: (state, actions) => {
      var res = state.value.map((item) => {
        if (item._id === actions.payload.id) {
          return { ...item, reviews: [...item.reviews, actions.payload.data] };
        }
        return item;
      });
      var updatedRes = res.map((item) => {
        if (item._id === actions.payload.id) {
          const avgValue =
            item.reviews.reduce((acc, item) => item.rating + acc, 0) /
            item.reviews.length;
          return {
            ...item,
            averageReviews: avgValue,
            totalReviews: item.reviews.length,
          };
        }
        return item;
      });
      return {
        ...state,
        value: [...updatedRes],
      };
    },
  },
});

const { reducer } = booksSlice;
export default reducer;
export const {
  getAllBooks,
  startBookLoading,
  endBookLoading,
  addNewBook,
  addReview,
} = booksSlice.actions;
