import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialValue = {
    value: []
};


const commentsSlice = createSlice({
    name: 'comments',
    initialState : initialValue,
    reducers: {
        setAllComments: (state, actions) => {
            return {
                ...state,
                value: [...actions.payload]
            };
        },
        addNewComment: (state, actions) => {
            return {
                ...state,
                value: [...state.value, actions.payload]
            }
        },
        addEditComment: (state, actions) => {
            const updatedComments = state.value.map((item) => {
                if(item._id === actions.payload._id){
                    return actions.payload
                }
                return item
            })
            return{
                value: [...updatedComments]
            }
        },
        deleteComment: (state, actions) => {
            const filteredComments = state.value.filter((comment) => comment._id !== actions.payload);
            return{
                ...state,
                value: [...filteredComments]
            }
        }
    },
})

const { reducer } = commentsSlice;
export default reducer;
export const {setAllComments, addNewComment, addEditComment, deleteComment} = commentsSlice.actions;