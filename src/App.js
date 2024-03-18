import Header from "./components/header/header";
import Aside from "./components/aside/aside";
import AddTodoModal from "./components/add-todo-modal/add-todo-modal";
import { useMemo, useState } from "react";
import styled from "styled-components";
import MainItem from "./components/main-item/main-item";
import randomId from "./lib/get-random-value";
import { addTodo, toggleDone, deleteTodo, toggleModal, toggleHideDoneTasks } from "./lib/reducers";
import { useDispatch, useSelector } from "react-redux";
import noteItemsMap from "./lib/noteItems";

function App() {
  /** 
   * const dispatch = useDispatch();
   * const todoState = useSelector(state => state.todoState);
   * const todoVisible = useSelector(state => state.todoVisible);
   * const doneState = useSelector(state => state.doneState);
   * const showModalState = useSelector(state => state.showModalState);
   * const hideDoneTasks = useSelector(state => state.hideDoneTasks);
   * 
   * ? const visibleItems = useMemo(() => {
   * ?  return todoVisible.map((id) => todoState[id]);
   * ? }, [todoVisible, todoState]);
   * 
   * const addNewTodo = (newTodo) => {
   *  dispacth(addTodo(newTodo))    
   * }
   * const handleToggleDone = (idToToggle) => {
   *  dispacth(toggleDone(idToToggle))    
   * }
   * const handleDeleteTodo = (idToDelete) => {
   *  dispacth(deleteTodo(idToDelete))    
   * }
   * const handleToggleHideDoneTasks = () => {
   *  dispacth(toggleHideDoneTasks())    
   * }
   * const onToggleShowModal = () => {
   *  dispacth(toggleModal())    
   * }
   * 
   * ? onChanage = () => {
   * ? }
   */
  

  const [todoState, setTodoState] = useState(noteItemsMap);
  const [todoVisible, setTodoVisible] = useState(Object.keys(todoState));
  const [doneState, setDoneState] = useState([]);
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
  };

  const toggleDone = (idToToggle) => {
    setDoneState((prevStates) => {
      return prevStates.includes(idToToggle)
        ? prevStates.filter((id) => id !== idToToggle)
        : prevStates.concat(idToToggle);
    });
  };

  const handleDeleteTodo = (idToDelete) => {
    setTodoState((prevTodoState) => {
      const updatedTodoState = { ...prevTodoState };
      delete updatedTodoState[idToDelete];
      return updatedTodoState;
    });

    setTodoVisible((prevTodoState) => {
      return prevTodoState.filter((id) => todoVisible[id] !== idToDelete);
    });

    setDoneState((prevDoneStates) => {
      return prevDoneStates.filter((id) => todoVisible[id] !== idToDelete);
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
        ? allTodos.filter((itemId) => !doneState.includes(itemId))
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
        completeCount={doneState.length}
        uncompleteCount={Object.keys(todoState).length - doneState.length}
        toggleHideDoneTasks={toggleHideDoneTasks}
      />
      <MainDiv>
        <MainItem
          visibleItems={visibleItems}
          onToggle={toggleDone}
          doneState={doneState}
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
