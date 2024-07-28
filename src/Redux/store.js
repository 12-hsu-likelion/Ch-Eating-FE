import { configureStore } from "@reduxjs/toolkit";
import { selectedDataSlice } from "./features/selectedData";

const store = configureStore({
    reducer: {
        selectedData: selectedDataSlice.reducer
    }
})

export default store;