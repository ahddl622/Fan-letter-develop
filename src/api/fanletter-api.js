import axios from "axios";

export const fanletterClient = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
  headers: {
    "Content-Type": "application/json",
  },
})

export const getLetter = async () => {
  const { data } = await fanletterClient.get("/")
  return data
}

export const getSingleLetter = async (id) => {
  const { data } = await fanletterClient.get(`/${id}`);
  return data;
};

export const createLetter = async (letter) => {
  await fanletterClient.post("/", letter);
  return letter;
};

export const deleteTodo = async (id) => {
  await fanletterClient.delete(`/${id}`);
  return id;
};

export const updateTodo = async (id, letter) => {
  await fanletterClient.patch(`/${id}`, letter);
  return id;
};
