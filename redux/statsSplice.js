import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        data:''
    },
    reducers: {
        setDataQuery: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const {setDataQuery} = statsSlice.actions;
export const selectDataQuery = (state) => state.stats.data;
export default statsSlice.reducer;