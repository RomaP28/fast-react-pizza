import {getAddress} from "../../services/apiGeocoding.js";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
}

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//REDUX THUNK
export const fetchAddress = createAsyncThunk(
    'user/fetchAddress', async () => {
  // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
    
    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateName(state, action) {
          state.username = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchAddress.pending, () => ({
                ...initialState,
                status: 'loading',
            }))
            .addCase(fetchAddress.fulfilled, (state, action) => ({
                ...state,
                position: action.payload.position,
                address: action.payload.address,
                status: 'idle',
            }))
            .addCase(fetchAddress.rejected, (state, action) => ({
                ...state,
                status: 'error',
                error: 'There was a problem getting your addresss. Make sure to fill this field!',
            }))
});

export const {updateName} = userSlice.actions;

export default userSlice.reducer;

export const getUserName = (state) => state.user.username;
