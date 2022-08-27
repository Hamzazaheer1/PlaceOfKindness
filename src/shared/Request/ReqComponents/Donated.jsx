import React, { useEffect, useState } from "react";
//import { Card } from "react-bootstrap";
import "./Donated.css";
// import { useNavigate } from "react-router-dom";

const Donated = () => {
  let data;
  //const Navigate = useNavigate();
  const [itemdata, setItemData] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [address, setAddress] = useState("");

  let response;
  let responseData;
  const getItems = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/items/"
    );
    responseData = await response.json();
    setItemData(responseData.data.data);
  };

  useEffect(() => {
    getItems();
  });

  const getDonationHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/items/${itemId}/needyitem`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shipaddress: address,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert(responseData.data.role);
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <table style={{ marginLeft: "5rem" }}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Category</th>
            <th>Donated By</th>
            <th>Get Donation</th>
          </tr>
        </thead>
        <tbody>
          {itemdata.map((item, index) => {
            if (item.available === false && item.given === false) {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.photo}</td>
                  <td>{item.name}</td>
                  <td>{item.category}$</td>
                  <td>{item.user[0].name}</td>
                  <td>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        data = item;
                        setItemId(data);
                      }}
                    >
                      Get Donation
                    </button>
                  </td>
                </tr>
              );
            } else {
              console.log("not availible");
            }
          })}
        </tbody>
      </table>

      <div>
        {itemId && (
          <div style={{ marginLeft: "4.5rem" }}>
            <br />
            <br />
            <br />
            <h1>Fill the form below to get the Item</h1>
            <br />
            <p>{itemId.photo}</p>
            <p>{itemId.name}</p>
            <p>{itemId.category}</p>
            <form>
              <label>
                Enter your Address:
                <input
                  type="text"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              <button onClick={getDonationHandler}>Get Donation</button>
            </form>
          </div>
        )}
      </div>
    </React.Fragment>
  );

  // const renderCard = (item, index) => {
  //   return (
  //     <Card key={index} className="box" style={{ width: "1rem" }}>
  //       <Card.Img variant="top" src={item.image} />
  //       <Card.Body>
  //         <Card.Title>{card.title}</Card.Title>
  //         <Card.Text>{card.text}</Card.Text>
  //       </Card.Body>
  //     </Card>
  //   );
  // };

  // return <div className="grid">{cardInfo.map(renderCard)}</div>;
};

export default Donated;
