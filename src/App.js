import Header from "./components/header/header";
import Aside from "./components/aside/aside";
import AddTodoModal from "./components/add-todo-modal/add-todo-modal";
import { useMemo } from "react";
import styled from "styled-components";
import MainItem from "./components/main-item/main-item";
import {
  addTodo,
  toggleDone,
  deleteTodo,
  toggleModal,
  toggleHideDoneTasks,
  filterByTopic,
} from "./lib/reducers";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const todoState = useSelector(state => state.todoState);
  const todoVisible = useSelector(state => state.todoVisible);
  const doneState = useSelector(state => state.doneState);
  const showModalState = useSelector(state => state.showModalState);

  const visibleItems = useMemo(() => {
    return todoVisible.map((id) => todoState[id]);
  }, [todoVisible, todoState]);

  const addNewTodo = (newTodo) => {
    dispatch(addTodo(newTodo));
  };

  const handleDeleteTodo = (idToDelete) => {
    dispatch(deleteTodo(idToDelete));
  };

  const handleToggleDone = (idToToggle) => {
    dispatch(toggleDone(idToToggle));
  };
  
  const handleToggleHideDoneTasks = () => {
    dispatch(toggleHideDoneTasks());
  };

  const onChange = (topicsList) => {
    dispatch(filterByTopic(topicsList));
  };

  const onToggleShowModal = () => {
    dispatch(toggleModal());
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
        toggleHideDoneTasks={handleToggleHideDoneTasks}
      />
      <MainDiv>
        <MainItem
          visibleItems={visibleItems}
          onToggle={handleToggleDone}
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
