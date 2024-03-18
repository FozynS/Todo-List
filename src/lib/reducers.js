import { createSlice } from "@reduxjs/toolkit";
import randomId from "./get-random-value";
import noteItemsMap from "./noteItems";


const initialState = {
  todoState: {
    noteItemsMap,
  },
  todoVisible: [],
  doneState: [],
  showModalState: false,
  hideDoneTasks: true
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newId = `ID${randomId()}`;
      state.todoState[newId] = { ...action.payload, id: newId };
      state.todoVisible.push(newId);
    },
    toggleDone: (state, action) => {
      const idToToggle = action.payload;
      state.doneState.includes(idToToggle)
        ? state.doneState = state.doneState.filter(id => id !== idToToggle)
        : state.doneState.push(idToToggle);
    },
    deleteTodo: (state, action) => {
      const idToDelete = action.payload;
      delete state.todoState[idToDelete];
      state.todoVisible = state.todoVisible.filter(id => id !== idToDelete);
      state.doneState = state.doneState.filter(id => id !== idToDelete);
    },
    toggleModal: (state) => {
      state.showModalState = !state.showModalState;
    },
    toggleHideDoneTasks: (state) => {
      state.hideDoneTasks = !state.hideDoneTasks;
    },
  }
});

export const { addTodo, toggleDone, deleteTodo, toggleModal, toggleHideDoneTasks, updateVisibleItems } = appSlice.actions;

export default appSlice.reducer;