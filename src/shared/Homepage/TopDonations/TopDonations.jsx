import React from "react";
import "./TopDonations.css";

const TopDonations = () => {
  return (
    <React.Fragment>
      <h2 className="top-donors-h2">Our Top Donations.</h2>
      <div class="donation-container">
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Donation Amount</th>
              <th>Donation Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 3</td>
              <td>Cell 4</td>
              <td>Cell 5</td>
            </tr>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 3</td>
              <td>Cell 4</td>
              <td>Cell 5</td>
            </tr>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 3</td>
              <td>Cell 4</td>
              <td>Cell 5</td>
            </tr>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 3</td>
              <td>Cell 4</td>
              <td>Cell 5</td>
            </tr>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 3</td>
              <td>Cell 4</td>
              <td>Cell 5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default TopDonations;
