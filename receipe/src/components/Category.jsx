import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <List>
      <StyledLink to="/cuisine/italian">
        <FaPizzaSlice />
        <h4>Italian</h4>
      </StyledLink>
      <StyledLink to="/cuisine/american">
        <FaHamburger />
        <h4>American</h4>
      </StyledLink>
      <StyledLink to="/cuisine/thai">
        <GiNoodles />
        <h4>Thai</h4>
      </StyledLink>
      <StyledLink to="/cuisine/korean">
        <GiChopsticks />
        <h4>Korean</h4>
      </StyledLink>
    </List>
  );
};

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem 4rem;
  gap: 1rem;
`;

const StyledLink = styled(NavLink)`
  /* margin: auto; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);

  h4 {
    color: white;
    font-size: 0.8rem;
  }
  svg {
    color: white;
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    h4 {
      color: white;
    }
    svg {
      color: white;
    }
  }
`;

export default Category;
