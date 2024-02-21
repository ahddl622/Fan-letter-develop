import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ id: "", password: "", nickname: "" });

  const onSubmitForm = (e) => {
    e.preventDefault();

    navigate("/loginform");
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setAuth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isSignUpDisabled =
    auth.id === "" || auth.password === "" || auth.nickname === "";

  return (
    <Container>
      <SignInTitle>Login</SignInTitle>
      <SignInContainer onSubmit={onSubmitForm}>
        <EmailInputBox>
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={auth.id}
            onChange={onChangeInput}
            minLength={4}
            maxLength={10}
            placeholder="아이디 (4~10글자)"
            required
          />
        </EmailInputBox>
        <PasswordInputBox>
          <label>PW</label>
          <input
            type="password"
            name="password"
            value={auth.password}
            onChange={onChangeInput}
            minLength={4}
            maxLength={15}
            placeholder="비밀번호 (4~15글자)"
            required
          />
        </PasswordInputBox>
        <NickNameInputBox>
          <label>Nickname</label>
          <input
            type="text"
            name="nickname"
            value={auth.nickname}
            onChange={onChangeInput}
            minLength={1}
            maxLength={10}
            placeholder="닉네임 (1~10글자)"
            required
          />
        </NickNameInputBox>
        <div>
          <SignUpButton disabled={isSignUpDisabled}>회원가입</SignUpButton>
        </div>
      </SignInContainer>
    </Container>
  );
};

export default CreateAccountForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignInTitle = styled.h2`
  padding: 3rem;

  font-size: 35px;
  font-weight: bold;
  color: black;
`;

const SignInContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;

  font-size: 20px;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
`;

const EmailInputBox = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;

  & input {
    width: 22rem;
    height: 40px;
    padding-left: 15px;
    margin-top: 10px;

    font-size: 16px;
    border: 1px solid black;
    border-radius: 15px;
  }
`;

const PasswordInputBox = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;

  & input {
    width: 22rem;
    height: 40px;
    padding-left: 15px;
    margin-top: 10px;

    font-size: 16px;
    border: 1px solid black;
    border-radius: 15px;
  }
`;

const NickNameInputBox = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;

  & input {
    width: 22rem;
    height: 40px;
    padding-left: 15px;
    margin-top: 10px;

    font-size: 16px;
    border: 1px solid black;
    border-radius: 15px;
  }
`;

const SignUpButton = styled.button`
  height: 50px;
  font-size: 22px;
  color: white;
  background-color: skyblue;
  border: 1px solid black;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: skyblue;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
