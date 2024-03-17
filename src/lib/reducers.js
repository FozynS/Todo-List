import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoState: {},
  doneState: [],
  showModalState: false,
  hideDoneTasks: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const id = action.payload;
      console.log(state, id, action)
    },
    toggleDone: (state, action) => {
      const id = action.payload;
      console.log(state, id, action)
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      console.log(state, id, action)
    },
    toggleModal: (state, action) => {
      const id = action.payload;
      console.log(state, id, action)
    },
    toggleHideDoneTasks: (state, action) => {
      const id = action.payload;
      console.log(state, id, action)
    },
  }
});

export const { addTodo, toggleDone, deleteTodo, toggleModal, toggleHideDoneTasks } = appSlice.actions;

export default appSlice.reducer;