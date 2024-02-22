import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { __editProfile } from "reduxStore/modules/authSlice";
import styled from "styled-components";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { avatar, nickname, userId } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [selectedImg, setSelectedImg] = useState(avatar);
  const [file, setFile] = useState(null);

  const previewImg = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile.size > 1024 * 1024) {
      return toast.warn("최대 1MB 까지 업로드 가능합니다.");
    }
    setFile(imgFile)
    // 프리뷰 구현
    // File -> Url 형식 변형
    const imgUrl = URL.createObjectURL(imgFile);
    setSelectedImg(imgUrl);
  };

  const onEditDone = () => {
    const formData = new FormData();
    if (isEditing) {
      formData.append("nickname", editingText);
    }
    if (selectedImg !== avatar) {
      formData.append("avatar", file);
    }
    dispatch(__editProfile(formData));
    setIsEditing(false)
  };

  return (
    <Container>
      <ProfileWrapper>
        <h1>프로필 관리</h1>
        <label>
          <Avatar size="large" src={selectedImg} />
          <input
            type="file"
            onChange={previewImg}
            accept="image/jpg, image/png"
          />
        </label>
        {isEditing ? (
          <input
            autoFocus
            defaultValue={nickname}
            onChange={(e) => setEditingText(e.target.value)}
          />
        ) : (
          <Nickname>{nickname}</Nickname>
        )}
        <UserId>{userId}</UserId>
        {isEditing ? (
          <div>
            <Button text="취소" onClick={() => setIsEditing(false)} />
            <Button
              text="수정완료"
              disabled={!editingText && selectedImg === avatar}
              onClick={onEditDone}
            />
          </div>
        ) : (
          <Button text="수정하기" onClick={() => setIsEditing(true)} />
        )}
      </ProfileWrapper>
    </Container>
  );
};

export default MyProfile;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileWrapper = styled.section`
  width: 500px;
  border-radius: 10px;
  background-color: lightgray;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  & > label > input {
    display: none;
  }

  & h1 {
    font-size: 36px;
    font-weight: 700;
  }

  & div {
    display: flex;
    gap: 24px;
  }

  & input {
    height: 24px;
    outline: none;
    padding: 6px 6px;
  }
`;

const Nickname = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const UserId = styled.span`
  font-size: 16px;
  color: gray;
`;
