import Header from "components/Header";
import LetterList from "components/LetterList";
import LettetForm from "components/LetterForm";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Header />
      <LettetForm />
      <LetterList />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
