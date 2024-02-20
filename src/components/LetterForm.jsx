import { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Button from "./common/Button";
import { useDispatch } from "react-redux";
import { addLetter } from "../redux/modules/letters";

const LettetForm = () => {
  const dispatch = useDispatch();
  const [nickname, setNickName] = useState("");
  const [content, setContent] = useState("");
  const [member, setMember] = useState("카리나");

  const onSubmitLetter = (e) => {
    e.preventDefault();
    if (!nickname || !content) {
      return alert("닉네임과 내용을 입력 해 주세요.");
    }

    const newLetter = {
      id: uuid(),
      nickname,
      content,
      createdAt: new Date(),
      writedTo: member,
      avatar: null,
    };

    dispatch(addLetter(newLetter))
    setNickName("");
    setContent("");
  };

  return (
    <LetterFormContainer onSubmit={onSubmitLetter}>
      <LetterInputSection>
        <LetterLabel>닉네임 :&nbsp;</LetterLabel>
        <NickNameInputBox
          value={nickname}
          placeholder="최대 20글자까지 작성할 수 있습니다."
          maxLength={20}
          name="nickname"
          onChange={(e) => setNickName(e.target.value)}
        />
      </LetterInputSection>
      <LetterInputSection>
        <LetterLabel>내용 :&nbsp;</LetterLabel>
        <ContentInputBox
          value={content}
          placeholder="최대 100자까지만 작성할 수 있습니다."
          maxLength={100}
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
      </LetterInputSection>
      <LetterInputSection>
        <LetterLabel $width="190px">누구에게 보내실 건가요?</LetterLabel>
        <SelectBox value={member} onChange={(e) => setMember(e.target.value)}>
          <option value="카리나">카리나</option>
          <option value="윈터">윈터</option>
          <option value="닝닝">닝닝</option>
          <option value="지젤">지젤</option>
        </SelectBox>
      </LetterInputSection>
      <Button text="팬레터 등록" />
    </LetterFormContainer>
  );
};

export default LettetForm;

const LetterFormContainer = styled.form`
  width: 600px;
  gap: 12px;
  border-radius: 10px;
  border: none;
  padding: 12px;
  margin: 20px;
  background-color: #afeeee;
`;

const LetterInputSection = styled.section`
  margin-bottom: 10px;
  display: flex;
`;
const LetterLabel = styled.label`
  width: ${(props) => props.$width || "100px"};
  display: flex;
  align-items: center;
`;

const NickNameInputBox = styled.input`
  width: 100%;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
`;

const ContentInputBox = styled.textarea`
  resize: none;
  height: 80px;
  width: 100%;
  padding: 10px 10px;
  border-radius: 5px;
  border: none;
`;

const SelectBox = styled.select`
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  font-size: 14px;
`;
