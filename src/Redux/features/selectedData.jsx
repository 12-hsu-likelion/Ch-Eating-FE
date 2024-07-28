import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { currentApi } from "../../hooks/useAsync";



export const fetchSelectedData = createAsyncThunk("weekData/fetchDatas", async()=>{
    try{
        const response = await currentApi.get("/selecteddata", {
            
        });
    }catch(e){
        return e;
    }
})

const initialState = {
    isLoading: true,
    weekData: null,
    error: false,
};

export const selectedDataSlice = createSlice({
    name: "weekData",
    initialState,
    extraReducers: (builder) => {

    }
})

// {
//     "daily": {
//         "totalFakeHungerOccurrences": 3,
//         "totalFakeHungerFailures": 1,
//         "fakeHungerTimeDistribution": {
//             "00": 0,
//             "01": 0,
//             "02": 0,
//             "03": 0,
//             "04": 0,
//             "05": 0,
//             "06": 0,
//             "07": 0,
//             "08": 0,
//             "09": 0,
//             "10": 1,
//             "11": 0,
//             "12": 1,
//             "13": 0,
//             "14": 0,
//             "15": 0,
//             "16": 0,
//             "17": 0,
//             "18": 1,
//             "19": 0,
//             "20": 0,
//             "21": 0,
//             "22": 0,
//             "23": 0
//         }
//     },
//     "weekly": {
//         "totalFakeHungerOccurrences": 15,
//         "totalFakeHungerFailures": 5,
//         "fakeHungerTimeDistribution": {
//             "00": 0,
//             "01": 0,
//             "02": 0,
//             "03": 0,
//             "04": 0,
//             "05": 1,
//             "06": 0,
//             "07": 1,
//             "08": 1,
//             "09": 2,
//             "10": 1,
//             "11": 1,
//             "12": 2,
//             "13": 1,
//             "14": 1,
//             "15": 0,
//             "16": 1,
//             "17": 1,
//             "18": 1,
//             "19": 0,
//             "20": 1,
//             "21": 0,
//             "22": 0,
//             "23": 0
//         }
//     },
//     "monthly": {
//         "totalFakeHungerOccurrences": 60,
//         "totalFakeHungerFailures": 20,
//         "fakeHungerTimeDistribution": {
//             "00": 1,
//             "01": 1,
//             "02": 0,
//             "03": 0,
//             "04": 0,
//             "05": 1,
//             "06": 0,
//             "07": 2,
//             "08": 3,
//             "09": 4,
//             "10": 3,
//             "11": 4,
//             "12": 6,
//             "13": 4,
//             "14": 5,
//             "15": 2,
//             "16": 4,
//             "17": 3,
//             "18": 4,
//             "19": 2,
//             "20": 4,
//             "21": 1,
//             "22": 1,
//             "23": 0
//         }
//     }
// }