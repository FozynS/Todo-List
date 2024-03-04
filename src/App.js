import Main from "./components/main/main";
import Header from "./components/header/header";
import Aside from "./components/aside/aside";
import AddModalDialog from "./components/add-modal-dialog/add-modal-dialog";
import MiniModalDialog from "./components/mini-modal-dialog/mini-modal-dialog";
import { useState } from "react";


const noteItems = [
  {
    title: "The first task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["work", "study", "entartaiment"],
  },
  {
    title: "The second task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius. Lorem ipsum. dolor sit amet consectetur adipisicing elit.",

    topics: [],
  },
  {
    title: "The third task title",
    description:
      "Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["study", "family"],
  },
];

function App() {

  const [todoState, setTodoState] = useState(noteItems);
  const [showModalState, setShowModalState] = useState(false);
  const [showMiniModalState, setShowMiniModalState] = useState(false)

  const addNewTodo = (newTodo) => {
    setTodoState(prevTodoState => [...prevTodoState, newTodo]);
  }

  const onToggleShowModal = () => {
    setShowModalState(!showModalState);
  };

  const deleteTodo = (index) => {
    setTodoState(prevTodoState => {
      const updatedTodoState = [...prevTodoState];
      updatedTodoState.splice(index, 1); 
      return updatedTodoState; 
    });
  };
  const onToggleShowMiniModal = () => {
    setShowMiniModalState(!showMiniModalState);
  };

  return (
    <>
      <Header onToggleShow={onToggleShowModal} />
      {showModalState ? <AddModalDialog onToggleShow={onToggleShowModal} onSubmit={addNewTodo}/> : null}
      <Aside />
      <Main noteItems={todoState} onToggleShowMini={onToggleShowMiniModal} />
      {showMiniModalState ? <MiniModalDialog deleteTodo={deleteTodo}/> : null}
    </>
  );
}

export default App;
