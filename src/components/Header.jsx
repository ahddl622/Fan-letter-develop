import React from 'react'
import styled from 'styled-components';
import LetterNav from './LetterNav';

const Header = () => {

  return (
    <Container>
      <LetterTitle>에스파 팬레터함</LetterTitle>
      <LetterNav/>
    </Container>
  );
};

export default Header

const Container = styled.section`
  width: 100%;
  height: 300px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const LetterTitle = styled.h1`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 50px;
  font-weight: 700;
  color: black;
`;

