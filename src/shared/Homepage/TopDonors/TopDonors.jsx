import React, { useEffect, useState } from "react";
import "./TopDonors.css";
import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";

const TopDonors = () => {
  const [name, setName] = useState([]);

  let response;
  let responseData;
  const getDonors = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/donations/top3don"
    );
    responseData = await response.json();
    setName(responseData.users);
  };

  useEffect(() => {
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
        {name.map((item) => (
          <Card bg="dark" style={{ width: "15rem", color: "white" }}>
            <Card.Img variant="top" src={item.photo} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </React.Fragment>
    // <React.Fragment>
    //   <h2 className="top-donors-h2">Our Top Donors.</h2>
    //   <div className="donor-container">
    //     <ul style={{ marginBottom: "2rem" }}>
    //       {name.map((name) => (
    //         <li
    //           style={{
    //             display: "inline",
    //             marginLeft: "15rem",
    //             fontWeight: "bold",
    //             fontStyle: "oblique",
    //             fontSize: "20px",
    //           }}
    //           key={name.id}
    //         >
    //           <img width={"100px"} height={"100px"} src={name.photo} />
    //           <div
    //             style={{
    //               display: "inline",
    //               marginLeft: "1rem",
    //               marginRight: "5rem",
    //             }}
    //           >
    //             {name.name}
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </React.Fragment>
  );
};

export default TopDonors;
