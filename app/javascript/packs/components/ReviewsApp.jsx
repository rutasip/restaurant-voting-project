import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Reviews from "./Reviews";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

class ReviewsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
    this.getReviews = this.getReviews.bind(this);
    this.createReview = this.createReview.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    axios
      .get("/api/v1/reviews")
      .then((response) => {
        const reviews = response.data;
        this.setState({ reviews });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createReview(review) {
    const reviews = [review, ...this.state.reviews];
    this.setState({ reviews });
  }

  render() {
    return (
      <>
        <ReviewForm createReview={this.createReview} />
        <Reviews>
          {this.state.reviews.map((review) => (
            <Review
              key={review.id}
              review={review}
              getReviews={this.getReviews}
            />
          ))}
        </Reviews>
      </>
    );
  }
}

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("reviews-app");
  app && ReactDOM.render(<ReviewsApp />, app);
});
