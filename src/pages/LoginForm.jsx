import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ id: "", password: "" });

  const onSubmitForm = (e) => {
    e.preventDefault();

    navigate('/')
  };

  const CreateAccountPage = (e) => {
    e.preventDefault();
    navigate("/createaccountform");
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setAuth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isLoginDisabled = auth.id === "" || auth.password === "";

  return (
    <Container>
      <LoginTitle>Login</LoginTitle>
      <LoginContainer onSubmit={onSubmitForm}>
        <EmailInputBox>
          <label>ID</label>
          <input
            type="text"
            name="id"
            placeholder="아이디 (4~10글자)"
            minLength={4}
            maxLength={10}
            required
            onChange={onChangeInput}
            value={auth.id}
          />
        </EmailInputBox>
        <PasswordInputBox>
          <label>PW</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호 (4~15글자)"
            minLength={4}
            maxLength={15}
            required
            onChange={onChangeInput}
            value={auth.password}
          />
        </PasswordInputBox>
        <LoginNRegisterBox>
          <LoginButton disabled={isLoginDisabled}>로그인</LoginButton>
          <button onClick={CreateAccountPage}>회원가입</button>
        </LoginNRegisterBox>
      </LoginContainer>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled.h2`
  padding: 3rem;

  font-size: 35px;
  font-weight: bold;
  color: black;
`;

const LoginContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;

  font-size: 20px;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
`;

const EmailInputBox = styled.div`
  padding-bottom: 1.5rem;
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
  padding-bottom: 1.5rem;
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

const LoginNRegisterBox = styled.div`
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoginButton = styled.button`
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
