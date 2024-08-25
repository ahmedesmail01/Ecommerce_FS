import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store"; // Adjust the import path as needed
import { createStandaloneToast } from "@chakra-ui/toast";
import CookieServices from "../../services/CookieServices";
// Define the shape of the data returned from the API
interface UserData {
  // Replace these fields with the actual data structure returned by your API
  id: number;
  username: string;
  email: string;
  jwt: string;
  // Add any other fields that are returned by the API
}

const { toast } = createStandaloneToast();

// Define the shape of your state
export interface LoginState {
  loading: boolean;
  data: UserData | null; // Replace 'any' with a specific type
  error: string | null;
}

// Define the initial state
const initialState: LoginState = {
  loading: false,
  data: null,
  error: null,
};

// Define the async thunk
export const userLogin = createAsyncThunk<
  UserData,
  { identifier: string; password: string },
  { rejectValue: string }
>("login/userLogin", async (user, thunkAPI) => {
  try {
    const { data } = await axios.post<UserData>(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/local`,
      user
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
});

// Create the slice
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
          const date = new Date();
          const EXPIRATION_DAYS = 1000 * 60 * 60 * 24 * 3;
          date.setTime(date.getTime() + EXPIRATION_DAYS);
          //create cookies
          const options = { path: "/", expires: date };
          CookieServices.set("jwt", action.payload.jwt, options);

          toast({
            title: "login success.",
            description: "you've logged in to your account for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      )
      .addCase(
        userLogin.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.data = null;
          state.error = action.payload ?? "An error occurred";
          toast({
            title: action?.payload,
            description: "Failed to logged in to your account for you.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );
  },
});

export const selectLogin = (state: RootState) => state.login;
export default loginSlice.reducer;
