import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getFormattedDate } from "util/date";
import { useSelector, useDispatch } from "react-redux";
import { deleteLetter, editLetter } from "reduxStore/modules/letterSlice";
const Detail = () => {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.letters);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { avatar, nickname, createdAt, writedTo, content } = letters.find(
    (letter) => letter.id === id
  );

  const onDeleteBtn = () => {
    const answer = window.confirm("해당 팬레터를 삭제 하시겠습니까?");
    if (!answer) return;

    dispatch(deleteLetter(id));
    navigate("/");
  };
  const onEditDone = () => {
    if (!editingText) return alert("수정사항이 없습니다.");

    dispatch(editLetter({ id, editingText }));
    setIsEditing(false);
    setEditingText("");
  };
  return (
    <DetailContainer>
      <Link to="/">
        <HomeBtn>
          <Button text="홈으로" />
        </HomeBtn>
      </Link>
      <DetailWrapper>
        <UserInfo>
          <AvatarAndNickName>
            <Avatar src={avatar} size="large" />
            <NickName>{nickname}</NickName>
          </AvatarAndNickName>
          <time>{getFormattedDate(createdAt)}</time>
        </UserInfo>
        <ToMember>To :&nbsp;{writedTo}</ToMember>
        {isEditing ? (
          <>
            <Textarea
              autoFocus
              defaultValue={content}
              onChange={(e) => setEditingText(e.target.value)}
            />
            <BackAndEditBtn>
              <Button text="취소" onClick={() => setIsEditing(false)} />
              <Button text="수정완료" onClick={onEditDone} />
            </BackAndEditBtn>
          </>
        ) : (
          <>
            <Content>{content}</Content>
            <BackAndEditBtn>
              <Button text="수정" onClick={() => setIsEditing(true)} />
              <Button text="삭제" onClick={onDeleteBtn} />
            </BackAndEditBtn>
          </>
        )}
      </DetailWrapper>
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const HomeBtn = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;
const DetailWrapper = styled.section`
  background-color: gray;
  color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 700px;
  min-height: 400px;
  border-radius: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AvatarAndNickName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const NickName = styled.span`
  font-size: 32px;
`;
const ToMember = styled.span`
  font-size: 24px;
`;
const Content = styled.p`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background-color: black;
  border-radius: 10px;
  height: 200px;
`;

const BackAndEditBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Textarea = styled.textarea`
  resize: none;
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background-color: black;
  border-radius: 10px;
  height: 200px;
  color: white;
`;
