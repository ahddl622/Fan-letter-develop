import styled, { css } from "styled-components";

function Button({
  text,
  size = "small",
  onClick = () => {},
  disabled = false,
}) {
  return (
    <LetterAddBtnContainer size={size} disabled={disabled}>
      <button onClick={onClick}>{text}</button>
    </LetterAddBtnContainer>
  );
}

export default Button;

const LetterAddBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & button {
    ${(props) => {
      if (props.disabled) {
        return css`
          background-color: lightgray;
        `;
      }
      return css`
        background-color: skyblue;
      `;
    }}
    color: white;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    ${(props) => {
      if (props.size === "large") {
        return css`
          padding: 12px 18px;
          width: 100%;
        `;
      }
      return css`
        padding: 5px 10px;
      `;
    }}
  }
`;
