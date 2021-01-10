import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

class Review extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   rating: this.props.review.rating
    // };
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.inputRef = React.createRef();
    // this.ratingRef = React.createRef();
    this.path = `/api/v1/reviews/${this.props.review.id}`;
  }

  handleDestroy() {
    setAxiosHeaders();
    const confirmation = confirm("Ar tikrai norite ištrinti atsiliepimą?");
    if (confirmation) {
      axios
        .delete(this.path)
        .then((response) => {
          this.props.getReviews();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleChange() {
    // this.setState({
    //   rating: this.ratingRef.current.checked
    // });
    this.updateReview();
  }

  updateReview = _.debounce(() => {
    setAxiosHeaders();
    axios
      .put(this.path, {
        review: {
          title: this.inputRef.current.value,
          // rating: this.ratingRef.current.checked
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }, 1000);

  render() {
    const { review } = this.props;
    return (
      <tr className={"table-light"}>
        <td>
          <input
            type="text"
            defaultValue={review.title}
            onChange={this.handleChange}
            ref={this.inputRef}
            className="form-control"
            id={`review__title-${review.id}`}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={review.description}
            className="form-control"
            id={`review__description-${review.id}`}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={review.score}
            className="form-control"
            id={`review__score-${review.id}`}
          />
        </td>
        <td className="text-right">
          {/* <div className="form-check form-check-inline">
            <input
              type="boolean"
              defaultChecked={this.state.rating}
              type="checkbox"
              onChange={this.handleChange}
              ref={this.ratingRef}
              className="form-check-input"
              id={`rating-${review.id}`}
            />
            <label
              className="form-check-label"
              htmlFor={`rating-${review.id}`}
            >
              Įvertinimas
            </label>
          </div> */}
          <button
            onClick={this.handleDestroy}
            className="btn btn-outline-danger"
          >
            Ištrinti
          </button>
        </td>
      </tr>
    );
  }
}

export default Review;

Review.propTypes = {
  review: PropTypes.object.isRequired,
  getReviews: PropTypes.func.isRequired,
};
