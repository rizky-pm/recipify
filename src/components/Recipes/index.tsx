import { Col, Row, Card } from "antd";

import { recipesData } from "../../data";
import { Container } from "../../styles/GlobalStyled";
import RecipesStyled from "./styled";

import RecipeThumbnail from "../../assets/images/recipe-thumbnail.jpg";

const { Meta } = Card;

const Recipes = () => {
  return (
    <Container>
      <RecipesStyled>
        {recipesData.map((data) => (
          <Card
            hoverable
            style={{ width: "350px" }}
            cover={<img alt="example" src={RecipeThumbnail} />}
          >
            <Meta title={data.name} description={data.description} />
          </Card>
        ))}
      </RecipesStyled>
    </Container>
  );
};

export default Recipes;
