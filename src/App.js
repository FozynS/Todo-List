import Main from "./components/main/main";
import Header from "./components/header/header";
import Aside from "./components/aside/aside";
import AddModalDialog from "./components/add-modal-dialog/add-modal-dialog";
import MiniModalDialog from "./components/mini-modal-dialog/mini-modal-dialog";
import { useState } from "react";
// import styled from "styled-components";

function App() {
  const [showModalState, setShowModalState] = useState(false);
  const [showMiniModalState, setShowMiniModalState] = useState(false)

  const onToggleShowModal = () => {
    setShowModalState(!showModalState);
  };
  const onToggleShowMiniModal = () => {
    setShowMiniModalState(!showMiniModalState);
  };

  return (
    <>
      <Header onToggleShow={onToggleShowModal} />
      {showModalState ? <AddModalDialog onToggleShow={onToggleShowModal} /> : null}
      <Aside />
      <Main onToggleShowMini={onToggleShowMiniModal} />
      {showMiniModalState ? <MiniModalDialog/> : null}
    </>
  );
}

export default App;
