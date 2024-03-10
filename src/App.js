import Header from "./components/header/header";
import Aside from "./components/aside/aside";
import AddTodoModal from "./components/add-todo-modal/add-todo-modal";
import { useState } from "react";
import styled from "styled-components";
import MainItem from "./components/main-item/main-item";

const MainDiv = styled.main`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 80%;
  height: 100%;
  margin-left: 50px;
  gap: 20px;
`;

const noteItems = [
  {
    id: Math.random(),
    title: "The first task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["work", "study", "entertainment"],
  },
  {
    id: Math.random(),
    title: "The second task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius. Lorem ipsum. dolor sit amet consectetur adipisicing elit.",

    topics: ["entertainment", "family", "work"],
  },
  {
    id: Math.random(),
    title: "The third task title",
    description:
      "Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["study", "family"],
  },
];

function App() {
  const [todoState, setTodoState] = useState(noteItems);
  // const [todoVisible, setTodoVisible] = useState(
  //   /todoState.map((item) => item.id)
  // );
  const [showModalState, setShowModalState] = useState(false);
  const [doneStates, setDoneState] = useState(todoState.map(() => false));

  const toggleDone = (index) => {
    setDoneState((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const addNewTodo = (newTodo) => {
    setTodoState((prevTodoState) => [...prevTodoState, newTodo]);
  };

  const onToggleShowModal = () => {
    setShowModalState(!showModalState);
  };

  const handleDeleteTodo = (indexToDelete) => {
    setTodoState((prevTodoState) => {
      const updatedTodoState = prevTodoState.filter(
        (_, index) => index !== indexToDelete
      );
      return updatedTodoState;
    });
  };

  const onChange = (topicsList) => {
    if (!topicsList.length) {
      setTodoState(noteItems);
    } else {
      setTodoState((prevState) => {
        return prevState.filter(
          (item) =>
            item.topics.filter((value) => topicsList.includes(value)).length
        );
      });
    }
  };

  return (
    <>
      <Header onToggleShow={onToggleShowModal} />
      {showModalState ? (
        <AddTodoModal onToggleShow={onToggleShowModal} onSubmit={addNewTodo} />
      ) : null}
      <Aside onChange={onChange} doneState={doneStates} todoState={todoState} />
      <MainDiv>
        <MainItem
          noteItems={todoState}
          onToggle={toggleDone}
          doneState={doneStates}
          handleDeleteTodo={handleDeleteTodo}
        />
      </MainDiv>
    </>
  );
}

export default App;
