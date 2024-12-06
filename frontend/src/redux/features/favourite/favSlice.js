import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name : 'favorites',
    initialState: [],
    reducers: {
        addToFavourites: (state, action) => {
            //Check if the product already in fav
            if(!state.some((product) => product._id === action.payload._id)){
                state.push(action.payload)
            }
        },
        //Remove from fav
        removeFromfav: (state, action) => {
            return state.filter((product) => product._id !== action.payload._id)
        },
        setFavorites: (state, action) => {
            //Set fav from local storage
            return action.payload
        }
    }
})

export const {addToFavourites, removeFromfav, setFavorites} = favoriteSlice.actions;
export const selectFavouriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;