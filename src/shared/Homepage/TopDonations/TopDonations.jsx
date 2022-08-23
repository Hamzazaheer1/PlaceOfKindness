import React, { useEffect, useState } from "react";
import "./TopDonations.css";

const TopDonations = () => {
  const [data, setData] = useState([]);
  let response;
  let responseData;
  const getDonors = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/donations/top5don"
    );
    responseData = await response.json();
    setData(responseData.users);
  };

  useEffect(() => {
    getDonors();
  }, []);

  // console.log(data[0].photo[0]);

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
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.photo}</td>
                <td>{item.Name}</td>
                <td>{item.donated}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default TopDonations;
