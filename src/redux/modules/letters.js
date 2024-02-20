import fakeData from "fakeData.json";

const ADD_LETTER = "letters/ADD_LETTER";

const DELETE_LETTER = "letters/DELETE_LETTER";

const EDIT_LETTER = "letters/EDIT_LETTER";

export const addLetter = (payload) => {
  return { type: ADD_LETTER, payload };
};
export const deleteLetter = (payload) => {
  return { type: EDIT_LETTER, payload};
};
export const editLetter = (payload) => {
  return { type: EDIT_LETTER, payload };
};

const initialState = fakeData;

const letters = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LETTER:
      const newLetter = action.payload;
      return [newLetter, ...state];
    case DELETE_LETTER:
      const letterId = action.payload;
      return state.filter((letter) => letter.id !== letterId);
    case EDIT_LETTER:
      const { id, editingText } = action.payload;
      return state.map((letter) => {
        if (letter.id === id) {
          return { ...letter, content: editingText };
        }
        return letter;
      });
    default:
      return state;
  }
};

export default letters;
