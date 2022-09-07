import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const TopDonations = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDonors = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/donations/top5don"
      );
      const responseData = await response.json();
      setData(responseData.users);
    };

    getDonors();
  }, []);

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
        Our Top Donations.
      </h2>
      <div
        className="container"
        style={{ marginTop: "3rem", marginBottom: "3rem" }}
      >
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.photo}
                    alt={"notFound"}
                    width={"50px"}
                    height={"50px"}
                  />
                </td>
                <td>{item.Name}</td>
                <td>
                  {item.donated}
                  <b>pkr</b>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default TopDonations;
