import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Reviews from "./Reviews";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

class ReviewsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      isLoading: true,
      errorMessage: null,
    };
    this.getReviews = this.getReviews.bind(this);
    this.createReview = this.createReview.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    axios
      .get("/api/v1/reviews")
      .then((response) => {
        this.clearErrors();
        this.setState({ isLoading: true });
        const reviews = response.data;
        this.setState({ reviews });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: true });
        this.setState({
          errorMessage: {
            message: "Įvyko klaida kraunant atsiliepimus...",
          },
        });
      });
  }

  createReview(review) {
    const reviews = [review, ...this.state.reviews];
    this.setState({ reviews });
  }

  handleErrors(errorMessage) {
    this.setState({ errorMessage });
  }
  clearErrors() {
    this.setState({
      errorMessage: null,
    });
  }

  render() {
    return (
      <>
        {this.state.errorMessage && (
          <ErrorMessage errorMessage={this.state.errorMessage} />
        )}
        {!this.state.isLoading && (
          <>
            <ReviewForm
              createReview={this.createReview}
              handleErrors={this.handleErrors}
              clearErrors={this.clearErrors}
            />
            <Reviews>
              {this.state.reviews.map((review) => (
                <Review
                  key={review.id}
                  review={review}
                  getReviews={this.getReviews}
                  handleErrors={this.handleErrors}
                  clearErrors={this.clearErrors}
                />
              ))}
            </Reviews>
          </>
        )}
        {this.state.isLoading && <Spinner />}
      </>
    );
  }
}

document.addEventListener("turbolinks:load", () => {
  const app = document.getElementById("reviews-app");
  app && ReactDOM.render(<ReviewsApp />, app);
});
