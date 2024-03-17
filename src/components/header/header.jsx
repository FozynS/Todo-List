import styled from "styled-components";

function Header({onToggleShow}) {


  return (
    <HeaderDiv>
      <H1>todo</H1>
      <Button onClick={onToggleShow}>+</Button>
    </HeaderDiv>
  );
}
export default Header;

const HeaderDiv = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const H1 = styled.h1`
  font-size: 36px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 50px;
  transition: transform 0.4s ease;

  &:active {
    transform: scale(0.7);
  }
`;