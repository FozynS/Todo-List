import FilterPanel from "../filter-panel/filter-panel";
import styled from "styled-components";
import TopicsContext from "../TopicsContext/TopicsContext";
import { useContext } from "react";

const HideDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 25px;
  height: 25px;
`;
const AsideDiv = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 15%;
  height: 20em;
`;

function HideDoneTasks() {
  return (
    <HideDiv>
      <Label>
        <Checkbox></Checkbox>
        Hide Done Task
      </Label>
    </HideDiv>
  );
}

function Aside() {
  const topics = useContext(TopicsContext);

  return (
    <AsideDiv>
      {Object.entries(topics).map(([key, value], index) => (
        <FilterPanel text={key} color={value} key={index} />
      ))}
      <HideDoneTasks />
    </AsideDiv>
  );
}

export default Aside;
