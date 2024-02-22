import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setMember } from "reduxStore/modules/memberSlice";

const LetterNav = () => {
  const activeMember = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const onActvieMember = (e) => {
    if (e.target === e.currentTarget) return;

    dispatch(setMember(e.target.textContent));
  };

  return (
    <NavMemberList onClick={onActvieMember}>
      <NavMemberItem $activeMember={activeMember}>카리나</NavMemberItem>
      <NavMemberItem $activeMember={activeMember}>윈터</NavMemberItem>
      <NavMemberItem $activeMember={activeMember}>닝닝</NavMemberItem>
      <NavMemberItem $activeMember={activeMember}>지젤</NavMemberItem>
    </NavMemberList>
  );
};

export default LetterNav;

const NavMemberList = styled.ul`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 15px;
  background-color: gray;
  gap: 20px;
`;

const NavMemberItem = styled.li`
  font-size: 20px;
  border: 1px solid black;
  border-radius: 10px;
  width: 100px;
  padding: 12px 6px;
  text-align: center;
  ${(props) => {
    if (props.$activeMember === props.children) {
      return css`
        background-color: yellow;
        color: black;
      `;
    }
    return css`
      background-color: black;
      color: white;
    `;
  }}
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: yellow;
    color: black;
  }
`;
