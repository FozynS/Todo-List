import styled from "styled-components";

function Popover({ handleDeleteTodo }) {
  return (
    <PopoverDiv>
      <Line />
      <BtnDelete onClick={handleDeleteTodo}>Delete</BtnDelete>
    </PopoverDiv>
  );
}
export default Popover;

const PopoverDiv = styled.div`
  position: absolute;
  top: 60px;
  left: 360px;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 40%;
`;
const Line = styled.hr`
  margin: 0;
  border: none;
  background-color: #ccc;
  height: 1px;
`;
const BtnDelete = styled.button`
  cursor: pointer;
  display: flex;
  padding: 1em;
  font-size: 15px;
  width: 100%;
  height: 50%;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
  color: #cac8bd;

  &:active {
    transform: scale(0.95);
  }
`;
