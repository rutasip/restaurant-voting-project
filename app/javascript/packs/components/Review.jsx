import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);
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

  render() {
    const { review } = this.props;
    return (
      <tr className={"table-light"}>
        <td>
          <input
            type="text"
            defaultValue={review.title}
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
