import { useState } from "react";
import styled from "styled-components";

const ContainerDiv = styled.div`
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  background-color: ${(props) => props.$active ? "#f5f5f5" : "transparent"};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const StyledDiv = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 50px;
  width: 35px;
  height: 35px;
  margin-left: 5px;
`;

function FilterPanel({ text, color }) {
  const [activeState, setActiveState] = useState(false);

  const toggleActive = () => {
    setActiveState(!activeState);
  }

  return (
    <ContainerDiv $active={activeState} onClick={toggleActive}>
      <StyledDiv color={color}></StyledDiv>
      <p>{text}</p>
    </ContainerDiv>
  );
}

export default FilterPanel;
