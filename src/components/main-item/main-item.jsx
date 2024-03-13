import React, { useState } from "react";
import styled from "styled-components";
import topics from "../Topics/Topics";
import Popover from "../popoverMenu/popover";

const Note = styled.div`
  position: relative;
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

function MainItem({ visibleItems, onToggle, doneState, handleDeleteTodo }) {
  const [showPopover, setShowPopover] = useState(false);

  const onToggleShowPopover = (index) => {
    setShowPopover(index === showPopover ? null : index);
  };

  return (
    <>
      {visibleItems.map((item) => (
          <Note key={item.index}>
            <Title>
              <H2 $done={doneState[item.index]}>{item.title}</H2>
              <DivMore onClick={() => onToggleShowPopover(item.index)}>
                <Span>...</Span>
              </DivMore>
            </Title>
            {showPopover === item.index ? (
              <Popover
                handleDeleteTodo={() => {
                  handleDeleteTodo(item.index);
                  setShowPopover(null);
                }}
              />
            ) : null}
            <P $done={doneState[item.index]}>{item.description}</P>
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
                <Checkbox onClick={() => onToggle(item.index)} />
                Done
              </Label>
            </Theme>
          </Note>
        )
      )}
    </>
  );
}

export default MainItem;
