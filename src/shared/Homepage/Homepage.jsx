import React from "react";
import "./Homepage.css";
import TopDonations from "./TopDonations/TopDonations";
import TopDonors from "./TopDonors/TopDonors";

const Homepage = () => {
  return (
    <React.Fragment>
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
      </div>
    </React.Fragment>
  );
};

export default Homepage;
