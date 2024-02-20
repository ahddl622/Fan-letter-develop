import styled from "styled-components";
import LetterItem from "./LetterItem";
import { useSelector } from "react-redux";

const LetterList = () => {
  const activeMember = useSelector(state => state.member);
  const letters = useSelector(state => state.letters);
  const filterLetterList = letters.filter(
    (letter) => letter.writedTo === activeMember
  );
  return (
    <LetterListWrapper>
      {filterLetterList.length === 0 ? (
        <p>
          {activeMember} 님에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의
          주인공이 되어보세요!
        </p>
      ) : (
        filterLetterList.map((letter) => <LetterItem letter={letter} />)
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
