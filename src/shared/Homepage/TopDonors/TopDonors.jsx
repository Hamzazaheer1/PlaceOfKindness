import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./TopDonors.css";

const TopDonors = () => {
  const [name, setName] = useState([]);

  useEffect(() => {
    const getDonors = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/donations/top3don"
      );
      const responseData = await response.json();
      setName(responseData.users);
    };

    getDonors();
  });

  return (
    <React.Fragment>
      <br />
      <h2
        style={{
          fontWeight: "bold",
          fontStyle: "italic",
          textDecoration: "underline",
        }}
      >
        Our Top Donors.
      </h2>
      <div
        className="donor-container"
        style={{ marginTop: "3rem", marginBottom: "3rem" }}
      >
        {name.map((item, index) => (
          <Card
            bg="dark"
            style={{ width: "15rem", color: "white" }}
            key={index + 1}
          >
            <Card.Img variant="top" src={item.photo} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
};

export default TopDonors;
