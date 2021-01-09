import React from "react";

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Antraštė</th>
                <th scope="col">Atsiliepimas</th>
                <th scope="col">Įvertinimas</th>
                <th scope="col" className="text-right">
                  Veiksmai
                </th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
      </>
    );
  }
}
export default Reviews;
