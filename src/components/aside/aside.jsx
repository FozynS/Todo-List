import FilterPanel from "../filter-panel/filter-panel";
import styled from "styled-components";
import topics from "../Topics/Topics";
import { useEffect, useState } from "react";

function HideDoneTasks({toggleHideDoneTasks}) {
  return (
    <HideDiv>
      <Label>
        <Checkbox onClick={toggleHideDoneTasks}/>
        Hide Done Task
      </Label>
    </HideDiv>
  );
}

function Aside({ onChange, doneState, todoState, toggleHideDoneTasks }) {
  const [activeState, setActiveState] = useState([]);
  const [completeCounter, setCompleteCounter] = useState(0);
  const [uncompleteCounter, setUncompleteCounter] = useState(0);

  useEffect(() => {
    let completed = 0;
    let uncompleted = 0;

    Object.values(doneState).forEach((isDone) => {
      if (isDone) {
        completed++;
      } else {
        uncompleted++;
      }
    });

    setCompleteCounter(completed);
    setUncompleteCounter(uncompleted);

  }, [doneState, todoState]);

  const onToggleTopic = (topic) => {
    setActiveState((prevState) => {
      return prevState.includes(topic)
        ? prevState.filter((item) => item !== topic)
        : prevState.concat(topic);
    });
  };

  useEffect(() => {
    onChange(activeState);
  }, [activeState]);

  return (
    <AsideDiv>
      {Object.keys(topics).map((topic) => (
        <FilterPanel
          text={topic}
          color={topics[topic]}
          key={topic}
          onClick={() => onToggleTopic(topic)}
          active={activeState.includes(topic)}
        />
      ))}
      <HideDoneTasks toggleHideDoneTasks={toggleHideDoneTasks}/>
      <div>
        <h2>Completed:{completeCounter}</h2>
        <h2>Uncompleted:{uncompleteCounter}</h2>
      </div>
    </AsideDiv>
  );
}
export default Aside;

const HideDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
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
  height: 50%;
`;