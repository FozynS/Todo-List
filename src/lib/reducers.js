import { createSlice } from "@reduxjs/toolkit";
import randomId from "./get-random-value";
import noteItemsMap from "./noteItems";

const initialState = {
  todoState: noteItemsMap,
  doneState: [],
  showModalState: false,
  hideDoneTasks: true,
};
initialState.todoVisible = Object.keys(initialState.todoState);

const todoSlice = createSlice({
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
        ? (state.doneState = state.doneState.filter((id) => id !== idToToggle))
        : state.doneState.push(idToToggle);
    },
    deleteTodo: (state, action) => {
      const idToDelete = action.payload;
      delete state.todoState[idToDelete];
      state.todoVisible = state.todoVisible.filter((id) => id !== idToDelete);
      state.doneState = state.doneState.filter((id) => id !== idToDelete);
    },
    toggleModal: (state) => {
      state.showModalState = !state.showModalState;
    },
    toggleHideDoneTasks: (state) => {
      state.hideDoneTasks = !state.hideDoneTasks;
      const allTodos = Object.keys(state.todoState);
      state.todoVisible = !state.hideDoneTasks ? allTodos.filter((itemId) => !state.doneState.includes(itemId)) : allTodos;
    },
    filterByTopic: (state, action) => {
      const allTodos = Object.keys(state.todoState);
      const topicsList = action.payload;
      state.todoVisible = topicsList.length 
        ? allTodos.filter((id) => state.todoState[id].topics.some((value) => topicsList.includes(value))) 
        : allTodos; 
    },
  },
});

export const {
  addTodo,
  toggleDone,
  deleteTodo,
  toggleModal,
  toggleHideDoneTasks,
  filterByTopic,
} = todoSlice.actions;

export default todoSlice.reducer;
