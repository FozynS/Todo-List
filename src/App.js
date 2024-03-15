import Header from "./components/header/header";
import Aside from "./components/aside/aside";
import AddTodoModal from "./components/add-todo-modal/add-todo-modal";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import MainItem from "./components/main-item/main-item";
import randomId from "./lib/get-random-value";

const noteItems = [
  {
    title: "The first task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["work", "study", "entertainment"],
    id: `ID${randomId()}`,
  },

  {
    title: "The second task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius. Lorem ipsum. dolor sit amet consectetur adipisicing elit.",
    topics: ["entertainment", "family", "work"],
    id: `ID${randomId()}`,
  },

  {
    title: "The third task title",
    description:
      "Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["study", "family"],
    id: `ID${randomId()}`,
  },
];

const noteItemsMap = noteItems.reduce((result, currentItem) => {
  result[currentItem.id] = currentItem;
  return result;
}, {});

function App() {
  const [todoState, setTodoState] = useState(noteItemsMap);
  const [todoVisible, setTodoVisible] = useState(Object.keys(todoState));
  const [doneStates, setDoneState] = useState([]);
  const [showModalState, setShowModalState] = useState(false);
  const [hideDoneTasks, setHideDoneTasks] = useState(true);

  const visibleItems = useMemo(() => {
    return todoVisible.map((id) => todoState[id]);
  }, [todoVisible, todoState]);

  const addNewTodo = (newTodo) => {
    const newId = `ID${randomId()}`;

    setTodoState((prevTodoState) => {
      return {
        ...prevTodoState,
        [newId]: { ...newTodo, id: newId },
      };
    });

    setTodoVisible((prevTodoVisible) => [...prevTodoVisible, newId]);
    // setDoneState((prevDoneStates) => [...prevDoneStates, false]);
  };

  const toggleDone = (id) => {
    setDoneState((prevStates) => {
      const newStates = { ...prevStates };
      newStates[id] = !newStates[id];
      return newStates;
    });
  };

  const handleDeleteTodo = (idToDelete) => {
    setTodoState((prevTodoState) => {
      const updatedTodoState = { ...prevTodoState };
      delete updatedTodoState[idToDelete];
      return updatedTodoState;
    });

    setTodoVisible((prevTodoState) => {
      return prevTodoState.filter(
        (_, index) => todoVisible[index] !== idToDelete
      );
    });

    setDoneState((prevDoneStates) => {
      const updatedDoneState = { ...prevDoneStates };
      delete updatedDoneState[idToDelete];
      return updatedDoneState;
    });
  };

  const onChange = (topicsList) => {
    setTodoVisible(() => {
      const allTodos = Object.keys(todoState);
      return topicsList.length
        ? allTodos.filter((id) =>
            todoState[id].topics.some((value) => topicsList.includes(value))
          )
        : allTodos;
    });
  };

  const toggleHideDoneTasks = () => {
    setHideDoneTasks(!hideDoneTasks);

    setTodoVisible(() => {
      const allTodos = Object.keys(todoState);
      return hideDoneTasks
        ? allTodos.filter((itemId) => !doneStates[itemId])
        : allTodos;
    });
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
      <Aside
        onChange={onChange}
        doneState={doneStates}
        todoState={todoState}
        toggleHideDoneTasks={toggleHideDoneTasks}
      />
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

const MainDiv = styled.main`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 80%;
  height: 100%;
  margin-left: 50px;
  gap: 20px;
`;
