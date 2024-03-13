import Header from "./components/header/header";
import Aside from "./components/aside/aside";
import AddTodoModal from "./components/add-todo-modal/add-todo-modal";
import { useEffect, useState } from "react";
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

const randomId = () => {
  return Math.floor(Math.random() * 1000);
};
let index = 0;
const noteItems = {
  [`ID${randomId()}`]: {
    title: "The first task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["work", "study", "entertainment"],
    index: index++,
  },

  [`ID${randomId()}`]: {
    title: "The second task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius. Lorem ipsum. dolor sit amet consectetur adipisicing elit.",
    topics: ["entertainment", "family", "work"],
    index: index++,
  },

  [`ID${randomId()}`]: {
    title: "The third task title",
    description:
      "Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["study", "family"],
    index: index++,
  },
};

function App() {
  const [todoState, setTodoState] = useState(noteItems);

  const [todoVisible, setTodoVisible] = useState(Object.keys(todoState));
  const [visibleItems, setVisibleItems] = useState(
    todoVisible.map((id) => todoState[id])
  );

  const [doneStates, setDoneState] = useState(
    Array.from({ length: visibleItems.length }, () => false)
  );
  const [showModalState, setShowModalState] = useState(false);

  const addNewTodo = (newTodo) => {
    const newId = `ID${randomId()}`;

    setTodoState((prevTodoState) => {
      return {
        ...prevTodoState,
        [newId]: { ...newTodo, index: index++ },
      };
    });

    setTodoVisible((prevTodoVisible) => [...prevTodoVisible, newId]);
    setVisibleItems((prevVisibleItems) => [
      ...prevVisibleItems,
      { ...newTodo, index: index++ },
    ]);
    setDoneState((prevDoneStates) => [...prevDoneStates, false]);
  };

  const toggleDone = (index) => {
    setDoneState((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleDeleteTodo = (indexToDelete) => {
    setTodoState((prevTodoState) => {
      const updatedTodoState = { ...prevTodoState };
      delete updatedTodoState[todoVisible[indexToDelete]];
      return updatedTodoState;
    });
    setTodoVisible((prevTodoState) => {
      return prevTodoState.filter(
        (_, index) => todoVisible[index] !== todoVisible[indexToDelete]
      );
    });
    setVisibleItems((prevVisibleItems) => {
      return prevVisibleItems.filter((item) => item.index !== indexToDelete);
    });

    setDoneState((prevDoneStates) => {
      return prevDoneStates.slice(1);
    });
  };

  const onChange = (topicsList) => {
    if (!topicsList.length) {
      setVisibleItems(Object.values(todoState));
    } else {
      setVisibleItems((prevVisibleItems) =>
        prevVisibleItems.filter((item) =>
        item.topics.some((value) => topicsList.includes(value))
      ));
    }
  };

  const onToggleShowModal = () => {
    setShowModalState(!showModalState);
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
          visibleItems={visibleItems}
          onToggle={toggleDone}
          doneState={doneStates}
          handleDeleteTodo={handleDeleteTodo}
        />
      </MainDiv>
    </>
  );
}

export default App;
