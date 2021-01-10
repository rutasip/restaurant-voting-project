import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.scoreRef = React.createRef();
    this.restaurantIdRef = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    setAxiosHeaders();
    axios
      .post("/api/v1/reviews", {
        review: {
          title: this.titleRef.current.value,
          description: this.descriptionRef.current.value,
          score: this.scoreRef.current.value,
          restaurant_id: this.restaurantIdRef.current.value,
        },
      })
      .then((response) => {
        const review = response.data;
        this.props.createReview(review);
        this.props.clearErrors();
      })
      .catch((error) => {
        this.props.handleErrors(error);
      });
    e.target.reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="my-3">
        <div className="form-row">
          <div className="form-group col-md-8">
            <input
              type="text"
              name="title"
              ref={this.titleRef}
              required
              className="form-control"
              id="title"
              placeholder="Įrašykite antraštę..."
            />
          </div>
          <div className="form-group col-md-8">
            <input
              type="text"
              name="description"
              ref={this.descriptionRef}
              required
              className="form-control"
              id="description"
              placeholder="Įrašykite atsiliepimą..."
            />
          </div>
          <div className="form-group col-md-8">
            <input
              type="text"
              name="score"
              ref={this.scoreRef}
              required
              className="form-control"
              id="score"
              placeholder="Įrašykite įvertinimą..."
            />
          </div>
          <div className="form-group col-md-8">
            <input
              type="text"
              name="restaurant-id"
              ref={this.restaurantIdRef}
              required
              className="form-control"
              id="restaurant-id"
              placeholder="Įrašykite restorano ID..."
            />
          </div>
          <div className="form-group col-md-4">
            <button className="btn btn-outline-success btn-block">
              Siųsti
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default ReviewForm;

ReviewForm.propTypes = {
  createReview: PropTypes.func.isRequired,
  handleErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};
