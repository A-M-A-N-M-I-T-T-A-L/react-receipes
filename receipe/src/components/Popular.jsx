import { useState, useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <Wrapper>
      <h3 style={{marginBottom: "1rem",}}>Popular Picks</h3>
      <Splide
        options={{
          // perPage: 3,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "1.5rem",
          autoWidth: true,
          autoHeight: true,
          autoplay: true,
        }}
      >
        {popular.map((receipe) => {
          return (
            <SplideSlide key={receipe.id}>
              <Link to={`/recipes/${receipe.id}`}>

              <Card key={receipe.id}>
                <p>{receipe.title}</p>
                <img src={receipe.image} alt={receipe.title} />
                <Gradient />
              </Card>
              </Link>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem;
`;

const Card = styled.div`
  min-height: 30vh;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  min-width: 30vw;
  max-width: 50vw;

  img {
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }

  p {
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    position: absolute;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
`;

export default Popular;
