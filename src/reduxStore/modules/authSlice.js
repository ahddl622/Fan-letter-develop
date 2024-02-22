import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fanletterClient, jsonApi } from "api/fanletter-api";
import { toast } from "react-toastify";

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
  userId: localStorage.getItem("userId"),
  isLoading: false,
  isError: false,
  error: null,
};

export const __editProfile = createAsyncThunk(
  "__editProfile",
  async (formData, thunkAPI) => {
    try {
      const { data } = await fanletterClient.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const editingObj = {};
      const { nickname, avatar } = data;
      if (nickname) editingObj.nickname = nickname;
      if (avatar) editingObj.avatar = avatar;

      const userId = localStorage.getItem("userId");
      const { data: myLetters } = await jsonApi.get(
        `/letters?userId=${userId}`
      );
      for (const myLetter of myLetters) {
        await jsonApi.patch(`/letters/${myLetter.id}`, editingObj);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __login = createAsyncThunk(
  "login",
  async ({ id, password }, thunkAPI) => {
    try {
      const { data } = await fanletterClient.post("/login?expiresIn=10m", {
        id,
        password,
      });
      const { accessToken, avatar, nickname, userId } = data;
      if (data.success) {
        toast.success("로그인 성공");
        return { accessToken, avatar, nickname, userId };
      }
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, avatar, nickname, userId } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("userId", userId);
      state.isLogin = true;
      state.avatar = avatar;
      state.nickname = nickname;
      state.userId = userId;
    },
    logout: (state, action) => {
      state.isLogin = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__login.fulfilled, (state, action) => {
        const { accessToken, avatar, nickname, userId } = action.payload;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("userId", userId);
        state.isLogin = true;
        state.avatar = avatar;
        state.nickname = nickname;
        state.userId = userId;
        state.isLoading = false;
      })
      .addCase(__login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(__editProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__editProfile.fulfilled, (state, action) => {
        const { avatar, nickname } = action.payload;
        if (avatar) {
          localStorage.setItem("avatar", avatar);
          state.avatar = avatar;
        }
        if (nickname) {
          localStorage.setItem("nickname", nickname);
          state.nickname = nickname;
        }
        state.isLoading = false;
        toast.success("프로필 변경이 완료 되었습니다.");
      })
      .addCase(__editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
