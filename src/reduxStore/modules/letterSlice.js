import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonApi } from "api/fanletter-api";

const initialState = {
  letters: [],
  isLoading: true,
  isError: false,
  error: null,
};

const getLetterFromDB = async () => {
  const { data } = await jsonApi.get("/letters?_sort=createAt");
  return data;
};

export const __editLetter = createAsyncThunk(
  "__editLetter",
  async ({ id, editingText }, thunkAPI) => {
    try {
      await jsonApi.patch(`/letters/${id}`, { content: editingText });
      const letters = await getLetterFromDB();
      return letters;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  async (id, thunkAPI) => {
    try {
      await jsonApi.delete(`/letters/${id}`);
      const letters = await getLetterFromDB();
      return letters;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const letters = await getLetterFromDB();
      return letters;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (newLetter, thunkAPI) => {
    try {
      await jsonApi.post("/letters", newLetter);
      const letters = await getLetterFromDB();
      return letters;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__addLetter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__addLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.letters = action.payload;
        state.isError = false;
        state.error = null;
      })
      .addCase(__addLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(__getLetters.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__getLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.letters = action.payload;
        state.isError = false;
        state.error = null;
      })
      .addCase(__getLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(__deleteLetter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__deleteLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.letters = action.payload;
        state.isError = false;
        state.error = null;
      })
      .addCase(__deleteLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(__editLetter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__editLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.letters = action.payload;
        state.isError = false;
        state.error = null;
      })
      .addCase(__editLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default letterSlice.reducer;
