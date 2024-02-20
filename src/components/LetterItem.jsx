import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Avatar from "./common/Avatar";
import { getFormattedDate } from "util/date";

const LetterItem = ({ letter }) => {
  const { id, nickname, content, createdAt, avatar, writedTo } = letter;
  const navigate = useNavigate();


  return (
    <LetterWrapper onClick={() => navigate(`/detail/${id}`)}>
      <UserInfo>
        <Avatar src={avatar}/>
        <NameAndTime>
          <p>{nickname}</p>
          <time>{getFormattedDate(createdAt)}</time>
        </NameAndTime>
      </UserInfo>
      <LetterContent>{content}</LetterContent>
    </LetterWrapper>
  );
};

export default LetterItem;

const LetterWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: white;
  padding: 12px;
  border: 1px solid white;
  border-radius: 10px;
  cursor: pointer;
`;
const UserInfo = styled.li`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const NameAndTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const LetterContent = styled.p`
  background-color: gray;
  border-radius: 10px;
  padding: 12px;
  margin-left: 62px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
