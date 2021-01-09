import React from "react";
import PropTypes from "prop-types";

class Review extends React.Component {
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
          <button className="btn btn-outline-danger">Ištrinti</button>
        </td>
      </tr>
    );
  }
}

export default Review;

Review.propTypes = {
  review: PropTypes.object.isRequired,
};
