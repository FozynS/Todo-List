import styled from "styled-components";
import Topics from "../topics/topics";
import { useState } from "react";

function ModalDialog({ onToggleShow, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectState, setSelectState] = useState([]);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isTopicSelected, setIsTopicSelected] = useState(false);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
    setIsTitleValid(value.length >= 5);
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setDescription(value);
    setIsDescriptionValid(value.length >= 10);
  };

  const toggleSelect = (topicName) => {
    setSelectState((prevState) => {
      const newState = prevState.includes(topicName)
        ? prevState.filter((item) => item !== topicName)
        : prevState.concat(topicName);

      setIsTopicSelected(newState.length > 0);
      return newState;
    });
  };

  const addNewNote = () => {
    if (!isTopicSelected) {
      return null;
    } else {
      const newNote = {
        title,
        description,
        topics: selectState,
      };

      onToggleShow();
      onSubmit(newNote);
    }
  };

  return (
    <ShadowDiv>
      <ModalDiv>
        <BtnsDiv>
          <CancelBtn onClick={onToggleShow}>Cancel</CancelBtn>
          <AddBtn
            onClick={() =>
              (isTitleValid && isDescriptionValid) || !isTopicSelected
                ? addNewNote()
                : null
            }
            disabled={!isTitleValid || !isDescriptionValid || !isTopicSelected}
          >
            Add
          </AddBtn>
        </BtnsDiv>
        <div>
          <h2>Title</h2>
          <InputTitle
            type="text"
            placeholder="add a title..."
            value={title}
            onChange={handleTitleChange}
            $valid={isTitleValid}
          />
          <h2>Description</h2>
          <InputDescription
            type="text"
            placeholder="add a description..."
            value={description}
            onChange={handleDescriptionChange}
            $valid={isDescriptionValid}
          />
        </div>
        <div>
          <h2>Tags</h2>
          <TopicsWrapper>
            {Object.keys(Topics).map((topic) => (
              <TopicsDiv
                key={topic}
                $select={selectState.indexOf(topic) > -1}
                onClick={() => toggleSelect(topic)}
              >
                <StyledDiv color={Topics[topic]} />
                <p>{topic}</p>
              </TopicsDiv>
            ))}
          </TopicsWrapper>
        </div>
      </ModalDiv>
    </ShadowDiv>
  );
}
export default ModalDialog;

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
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#69665c")};
  border-radius: 15px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.9)")};
  }
`;

const InputTitle = styled.input.attrs({ type: "text" })`
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  border: ${({ $valid }) => ($valid ? "none" : "2px solid #f78080")};
  border-radius: 5px;
  padding-left: 1em;
  font-size: 16px;
`;
const InputDescription = styled.textarea`
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
  border: ${({ $valid }) => ($valid ? "none" : "2px solid #f78080")};
  border-radius: 5px;
  padding-left: 1em;
  padding-top: 2em;
  font-size: 16px;
  resize: none;
`;

const TopicsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;
`;

const TopicsDiv = styled.div`
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
