import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./Donated.css";
import GetDonation from "./GetDonation/GetDonation";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

const Donated = () => {
  let data;
  const Navigate = useNavigate();
  const [itemdata, setItemData] = useState([]);
  const [itemId, setItemId] = useState(null);

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

  // const handledata = () => {
  //   console.log(itemId);
  //   <GetDonation sendData={itemId} />;
  // };

  return (
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
                  <Popup
                    trigger={
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          data = item._id;
                          setItemId(data);
                          // handledata();
                          //Navigate("/getdonation");
                          if (itemId) {
                            alert("hello");
                          } else {
                            alert("nothello");
                          }
                        }}
                      >
                        Get Donation
                      </button>
                    }
                  >
                    <div
                      style={{
                        background: "black",
                        width: "50vw",
                        color: "white",
                      }}
                    >
                      <h1>Confirm to get the Donations</h1>
                      <h2>{item.name}</h2>
                      <img
                        width={"100px"}
                        src="https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg"
                        alt="not load"
                      />
                      <br />
                      <h3>Enter Your CNIC</h3>
                      <input type={"text"} />
                      <br />
                      <button>Submit</button>
                    </div>
                  </Popup>
                </td>
              </tr>
            );
          } else {
            console.log("not availible");
          }
        })}
      </tbody>
    </table>
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
