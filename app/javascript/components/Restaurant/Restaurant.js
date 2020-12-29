import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Header from "./Header";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background: #000;
  }
`;

const Main = styled.div`
  padding-left: 50px;
`;

const Restaurant = (props) => {
  const [restaurant, setRestaurant] = useState({});
  const [review, setReview] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const slug = props.match.params.slug;
    const url = `/api/v1/restaurants/${slug}`;

    axios
      .get(url)
      .then((resp) => {
        setRestaurant(resp.data);
        setLoaded(true);
      })
      .catch((resp) => console.log(resp));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setReview(Object.assign({}, review, { [e.target.name]: e.target.value }));

    console.log("review:", review);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    const restaurant_id = parseInt(restaurant.data.id);
    axios
      .post("/api/v1/reviews", { ...review, restaurant_id })
      .then((resp) => {
        const included = [...restaurant.included, resp.data.data];
        setRestaurant({ ...restaurant, included });
        setReview({ title: "", description: "", score: 0 });
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  const setRating = (score, e) => {
    e.preventDefault;

    setReview({ ...review, score });
  };

  let reviews;
  if (loaded && restaurant.included) {
    reviews = restaurant.included.map((item, index) => {
      return <Review key={index} attributes={item.attributes} />;
    });
  }

  return (
    <Wrapper>
      {loaded && (
        <Fragment>
          <Column>
            <Main>
              <Header
                attributes={restaurant.data.attributes}
                reviews={restaurant.included}
              />
              {reviews}
            </Main>
          </Column>
          <Column>
            <ReviewForm
              key={restaurant.data.attributes.name}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={restaurant.data.attributes}
              review={review}
            />
            <div className="review-form">[Cia atsiliepimo forma]</div>
          </Column>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Restaurant;
