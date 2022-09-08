import React from "react";
import TopDonations from "./TopDonations/TopDonations";
import TopDonors from "./TopDonors/TopDonors";

import "./Homepage.css";

const Homepage = () => {
  return (
    <React.Fragment>
      <div>
        <div className="banner">
          <div>
            <h1>Welcome to the Place of Kindness</h1>
            <h5>
              Its not how much we give, but how much love we put into giving.
            </h5>
            <h4>Mother Teresa</h4>
          </div>
        </div>

        <div>
          <TopDonors />
        </div>
        <div>
          <TopDonations />
          <br />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
