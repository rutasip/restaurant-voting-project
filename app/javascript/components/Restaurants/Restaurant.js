import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
import Rating from "../Rating/Rating";

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
  text-align: center;
  padding: 30px;
`;

const RestaurantLogo = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
  }
`;

const RestaurantName = styled.div`
  padding: 20px 0 10px 0;
`;

const LinkWrapper = styled.div`
  margin: 35px 0 15px;

  a {
    color: #fff;
    background: #000;
    border-radius: 4px;
    padding: 10px 50px;
    border: 1px solid #000;
    width: 100%;
    text-decoration: none;
  }
`;

const Restaurant = (props) => {
  return (
    <Card>
      <RestaurantLogo>
        <img src={props.attributes.image_url} alt={props.attributes.name}></img>
      </RestaurantLogo>
      <RestaurantName>{props.attributes.name}</RestaurantName>
      <Rating score={props.attributes.avg_score} />
      <LinkWrapper>
        <Link to={`/restaurants/${props.attributes.slug}`}>Atsiliepimai</Link>
      </LinkWrapper>
    </Card>
  );
};

export default Restaurant;
