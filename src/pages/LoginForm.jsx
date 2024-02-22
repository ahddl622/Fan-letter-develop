import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login } from "reduxStore/modules/authSlice";
import Button from "components/common/Button";
import { toast } from "react-toastify";
import useForm from "hooks/useForm";
import { fanletterClient } from "api/fanletter-api";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { formState, onChangeInput, resetForm } = useForm({
    id: "",
    password: "",
    nickname: "",
  });
  const { id, password, nickname } = formState;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("제출");
    if (isLoginMode) {
      try {
        const { data } = await fanletterClient.post("/login", {
          id,
          password,
        });
        const { accessToken, avatar, nickname, userId } = data;
        if (data.success) {
          dispatch(login({ accessToken, avatar, nickname, userId }));
          toast.success("로그인 성공");
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    } else {
      try {
        const { data } = await fanletterClient.post("/register", {
          id,
          password,
          nickname,
        });
        if (data.success) {
          setIsLoginMode(true);
          resetForm();
          toast.success("회원가입 성공");
        }
      } catch (err) {
        console.log("err:", err);
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <Container>
      <LoginTitle>{isLoginMode ? "로그인" : "회원가입"}</LoginTitle>
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
            value={id}
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
            value={password}
          />
        </PasswordInputBox>
        {!isLoginMode && (
          <NickNameInputBox>
            <label>Nickname</label>
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={onChangeInput}
              minLength={1}
              maxLength={10}
              placeholder="닉네임 (1~10글자)"
              required
            />
          </NickNameInputBox>
        )}
        <LoginNRegisterBox>
          <Button
            text={isLoginMode ? "로그인" : "회원가입"}
            disabled={
              isLoginMode ? !id || !password : !id || !password || !nickname
            }
            size="large"
          ></Button>
          <CreateAccountButton onClick={() => setIsLoginMode((prev) => !prev)}>
            {isLoginMode ? "회원가입" : "로그인"}
          </CreateAccountButton>
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

const LoginNRegisterBox = styled.div`
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CreateAccountButton = styled.button`
  height: 50px;
  font-size: 22px;
  color: white;
  background-color: skyblue;
  border: 1px solid black;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
