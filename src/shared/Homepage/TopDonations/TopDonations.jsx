import React, { useEffect, useState } from "react";
import "./TopDonations.css";
import Table from "react-bootstrap/Table";

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
              <tr>
                <td>{index + 1}</td>
                <td>
                  <img src={item.photo} width={"50px"} height={"50px"} />
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

    // <React.Fragment>
    //   <h2 className="top-donors-h2">Our Top Donations.</h2>
    //   <div className="donation-container">
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>Position</th>
    //           <th>Profile</th>
    //           <th>Name</th>
    //           <th>Donation Amount</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((item, index) => (
    //           <tr>
    //             <td>{index + 1}</td>
    //             <td>
    //               <img src={item.photo} width={"50px"} height={"50px"} />
    //             </td>
    //             <td>{item.Name}</td>
    //             <td>
    //               {item.donated}
    //               <b>pkr</b>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </React.Fragment>
  );
};

export default TopDonations;
