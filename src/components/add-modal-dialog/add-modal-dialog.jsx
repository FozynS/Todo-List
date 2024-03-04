import styled from "styled-components";
import TopicsContext from "../TopicsContext/TopicsContext";
import { useContext, useState } from "react";

const ShadowDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: #fff;
  border-radius: 20px;
  width: 55%;
  height: 60%;
  padding: 3em;
`;
const BtnsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
`;
const CancelBtn = styled.div`
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;

  &:active {
    transform: scale(0.8);
  }
`;

const AddBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
  height: 80%;
  width: 13%;
  background-color: #69665c;
  border-radius: 15px;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
  }
`;

const InputTitle = styled.input.attrs({ type: "text" })`
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  padding-left: 1em;
  font-size: 16px;
`;
const InputDescription = styled.input.attrs({ type: "text" })`
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  padding-left: 1em;
  font-size: 16px;
`;

const TopicsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;
`;

const Topics = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 20px;
  background-color: ${(props) => (props.$select ? "#f5f5f5" : "transparent")};
  padding-right: 1em;
  padding-left: 1em;

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

function ModalDialog({ onToggleShow, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const topics = useContext(TopicsContext);
  const [selectState, setSelectState] = useState({});

  const toggleSelect = (index) => {
    setSelectState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const addNewNote = () => {
    const selectedTopics = Object.entries(selectState)

    console.log(selectedTopics);

    const newNote = {
      title: title,
      description: description,
      topics: selectedTopics,
    };

    onToggleShow();
    onSubmit(newNote);
  };

  return (
    <ShadowDiv>
      <ModalDiv>
        <BtnsDiv>
          <CancelBtn onClick={onToggleShow}>Cancel</CancelBtn>
          <AddBtn onClick={addNewNote}>Add</AddBtn>
        </BtnsDiv>
        <div>
          <h2>Title</h2>
          <InputTitle
            type="text"
            placeholder="add a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2>Description</h2>
          <InputDescription
            type="text"
            placeholder="add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <h2>Tags</h2>
          <TopicsWrapper>
            {Object.entries(topics).map(([key, value], index) => (
              <Topics
                key={index}
                $select={selectState[index] || false}
                onClick={() => toggleSelect(index)}
              >
                <StyledDiv color={value}></StyledDiv>
                <p>{key}</p>
              </Topics>
            ))}
          </TopicsWrapper>
        </div>
      </ModalDiv>
    </ShadowDiv>
  );
}

export default ModalDialog;
