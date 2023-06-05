import styled from "styled-components";
import HeroImage from "../../assets/images/header.jpg";

const HeroStyled = styled.div`
  position: relative;
  background: url(${HeroImage});
  padding: var(--spacing-md);
  height: 50vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: var(--color-light);

  .overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: var(--spacing-md);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);

    .title {
      font-family: "Lobster", cursive;
      font-size: 64px;
    }

    .search-box {
      width: 50%;
    }

    .motto {
      font-size: var(--fz-md);
    }
  }
`;

export default HeroStyled;
