import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "reduxStore/modules/authSlice";

let store;
import("reduxStore/config/configStroe").then((module) => {
  store = module.default();
});

export const fanletterClient = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

export const jsonApi = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

fanletterClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

fanletterClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    toast.error(err.response.data.message);
    if (
      err.response.data.message ===
      "토큰이 만료되었습니다. 다시 로그인 해주세요."
    ) {
      return store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

jsonApi.interceptors.request.use(
  async (config) => {
    const { data } = await fanletterClient.get("/user");
    if (data.success) return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// export const getLetter = async () => {
//   const { data } = await fanletterClient.get("/")
//   return data
// }

// export const getSingleLetter = async (id) => {
//   const { data } = await fanletterClient.get(`/${id}`);
//   return data;
// };

// export const createLetter = async (letter) => {
//   await fanletterClient.post("/", letter);
//   return letter;
// };

// export const deleteTodo = async (id) => {
//   await fanletterClient.delete(`/${id}`);
//   return id;
// };

// export const updateTodo = async (id, letter) => {
//   await fanletterClient.patch(`/${id}`, letter);
//   return id;
// };
