import MainStyled from "./styled";
import Hero from "../../components/Hero";
import Recipes from "../../components/Recipes";
import ToolBar from "../../components/ToolBar";

const MainPage = () => {
  return (
    // <Container>
    <MainStyled>
      <Hero />
      <ToolBar />
      <Recipes />
    </MainStyled>
    // </Container>
  );
};

export default MainPage;
