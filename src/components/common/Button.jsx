import styled from "styled-components";

function Button({ text, onClick = () => {} }) {
  return (
    <LetterAddBtnContainer>
      <LetterAddBtn onClick={onClick}>{text}</LetterAddBtn>
    </LetterAddBtnContainer>
  );
}

export default Button;

const LetterAddBtn = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  background-color: skyblue;
  text-align: right;
  color: black;
  font-size: 16px;
  &:hover {
    background-color: #5a88c5;
    color: white;
  }
`;

const LetterAddBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
