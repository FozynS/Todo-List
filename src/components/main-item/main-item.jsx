import React, { useState, useContext } from "react";
import styled from "styled-components";
import TopicsContext from "../TopicsContext/TopicsContext";

const Note = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 45%;
  height: 25%;
  background-color: #fff9de;
  padding: 1em;
  border-radius: 10px;
`;

const DivMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  font-family: "Ubuntu Mono", monospace;
  border-radius: 10px;
  font-size: 46px;
  letter-spacing: -10px;
  cursor: pointer;
`;

const Span = styled.span`
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 25%;
`;
const H2 = styled.h2`
  text-decoration: ${(props) => (props.$done ? "line-through" : "none")};
`;

const P = styled.p`
  margin: 0;
  text-decoration: ${(props) => (props.$done ? "line-through" : "none")};
`;

const Theme = styled.div`
  display: flex;
  height: 20%;
  align-items: center;
  justify-content: space-between;
`;

const ColorsTopics = styled.div`
  display: flex;
  width: 35%;
  gap: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  background-color: transparent;
  width: 25px;
  height: 25px;
`;

const StyledDiv = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 50px;
  width: 35px;
  height: 35px;
  margin-left: 5px;
`;

const noteItems = [
  {
    title: "The first task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["work", "study", "entartaiment"],
  },
  {
    title: "The second task title",
    description:
      "Lorem ipsum. dolor sit amet, consectetur adipisicing elit. Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius. Lorem ipsum. dolor sit amet consectetur adipisicing elit.",

    topics: [],
  },
  {
    title: "The third task title",
    description:
      "Illum neque nisi dolore facere iste minima atque veniam excepturi aut consequatur dolorum veritatis error nemo id placeat, minus odio delectus eius.",
    topics: ["study", "family"],
  },
];

function MainItem({ onToggleShowMini }) {
  const [doneStates, setDoneState] = useState(noteItems.map(() => false));
  const topics = useContext(TopicsContext);

  const toggleDone = (index) => {
    setDoneState((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <>
      {noteItems.map((item, index) => (
        <Note key={index}>
          <Title>
            <H2 $done={doneStates[index]}>{item.title}</H2>
            <DivMore onClick={onToggleShowMini}>
              <Span>...</Span>
            </DivMore>
          </Title>
          <P $done={doneStates[index]}>{item.description}</P>
          <Theme>
            <ColorsTopics>
              {item.topics.map((topic, index) => {
                const contextTopic = topics[topic];
                return (
                  <StyledDiv
                    key={index}
                    color={contextTopic ? contextTopic : topic}
                  ></StyledDiv>
                );
              })}
            </ColorsTopics>
            <Label>
              <Checkbox onClick={() => toggleDone(index)} />
              Done
            </Label>
          </Theme>
        </Note>
      ))}
    </>
  );
}

export default MainItem;
