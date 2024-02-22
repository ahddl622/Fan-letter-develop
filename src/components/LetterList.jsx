import styled from "styled-components";
import LetterItem from "./LetterItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getLetters } from "reduxStore/modules/letterSlice";

const LetterList = () => {
  const dispatch = useDispatch();
  const activeMember = useSelector((state) => state.member);
  const letters = useSelector((state) => state.letters.letters);

  const filterLetterList = letters.filter(
    (letter) => letter.writedTo === activeMember
  );

  useEffect(() => {
    dispatch(__getLetters());
  }, []);

  return (
    <LetterListWrapper>
      {filterLetterList.length === 0 ? (
        <p>
          {activeMember} 님에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의
          주인공이 되어보세요!
        </p>
      ) : (
        filterLetterList.map((letter) => (
          <LetterItem key={letter.id} letter={letter} />
        ))
      )}
    </LetterListWrapper>
  );
};

export default LetterList;

const LetterListWrapper = styled.ul`
  background-color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 600px;
  border-radius: 10px;
  padding: 12px;
  color: white;
`;
