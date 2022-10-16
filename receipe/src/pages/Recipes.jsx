import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipes = () => {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await res.json();
    setDetails(data);
    localStorage.setItem(`${params.id}`, JSON.stringify(data));
  };

  useEffect(() => {
    const check = localStorage.getItem(`${params.id}`);
    if (check) setDetails(JSON.parse(check));
    else fetchDetails();
  }, [params.id]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <div>
          <Button
            onClick={() => {
              setActiveTab("instructions");
            }}
            className={activeTab === "instructions" ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Instructions
          </Button>
          <Button
            onClick={() => {
              setActiveTab("ingredients");
            }}
            className={activeTab === "ingredients" ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Ingredients
          </Button>
        </div>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredients) => {
              return (
                <li key={ingredients.id}>
                  <p>{ingredients.original}</p>
                </li>
              );
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  width: 85%;
  margin: 4rem auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 3rem;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
      margin-bottom: 5rem;
    }

    h3 {
      font-size: 1rem;
    }
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 1.2rem;
    list-style: square;
    margin-bottom: 1rem;
  }
  ul {
    margin-top: 2rem;
  }

  h3 {
    font-size: 1.1rem;
    margin: 1rem auto 2rem;
  }

  div {
    min-width: 50%;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin: 1rem;
  font-weight: 600;
`;

const Info = styled.div`
  * {
    color: #353434;
  }
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;

export default Recipes;
