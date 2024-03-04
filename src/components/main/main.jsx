import MainItem from "../main-item/main-item";
import styled from "styled-components";

const MainDiv = styled.main`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 80%;
  height: 100%;
  margin-left: 50px;
  gap: 20px;
`;

function Main({onToggleShowMini, noteItems}) {
  return (
    <MainDiv>
      <MainItem onToggleShowMini={onToggleShowMini} noteItems={noteItems}/>
    </MainDiv>
  );
}

export default Main;
