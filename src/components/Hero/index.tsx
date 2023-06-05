import { Input } from "antd";

import HeroStyled from "./styled";

const { Search } = Input;

const Hero = () => {
  const onSearch = (value: string) => console.log(value);

  return (
    <HeroStyled>
      <div className="overlay">
        <Search
          size="large"
          className="search-box"
          placeholder="Search for delicious recipes..."
          allowClear
          onSearch={onSearch}
        />
        <p className="motto">
          Share. Discover. Savor. Unleash your culinary creativity and find
          inspiration in a world of flavors.
        </p>
      </div>
    </HeroStyled>
  );
};

export default Hero;
