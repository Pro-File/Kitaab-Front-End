import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialValue = {
    value: []
};


const booksSlice = createSlice({
    name: 'books',
    initialState : initialValue,
    reducers: {
        getAllBooks: (state, actions) => {
            return {
                ...state,
                value: [...actions.payload]
            };
        },
        addNewBook: (state, actions) => {
            return {
                ...state,
                value: [...state.value, actions.payload],
            }
        },
        addReview: (state, actions) => {
            console.log(actions.payload.id);
            var res = state.value.map((item)=> {
                if(item._id === actions.payload.id){
                    return  {...item, reviews: [...item.reviews, actions.payload.data]}
                }
                return item
            })
            var updatedRes = res.map((item) => {
                if(item._id === actions.payload.id){
                    const avgValue = ((item.reviews.reduce((acc, item) => item.rating + acc, 0))/item.reviews.length);
                    return {...item, averageReviews: avgValue, totalReviews: item.reviews.length }
                }
                return item;
            })
            return {
                ...state, 
                value: [...updatedRes]
            }
            
        }
    },
})

const { reducer } = booksSlice;
export default reducer;
export const {getAllBooks, addNewBook, addReview} = booksSlice.actions;