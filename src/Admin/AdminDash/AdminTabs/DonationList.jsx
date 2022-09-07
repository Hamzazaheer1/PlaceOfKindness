import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const DonationList = () => {
  let token;
  if (localStorage.token) {
    token = localStorage.getItem("token");
  }
  let bearer = "Bearer " + token;

  const [itemData, setItemData] = useState();

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/request/"
      );
      const responseData = await response.json();
      setItemData(responseData.data);
    };

    getItems();
  }, []);

  const reqDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/request/${x}`,
        {
          method: "DELETE",
          headers: {
            Authorization: bearer,
          },
        }
      );
      if (response.status === 204) {
        alert("Request Deleted Sucessfully!!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h1>Requested Donations by Needy</h1>
      {itemData ? (
        itemData.map((item, index) => (
          <Alert key={index + 1} variant={"dark"}>
            <h3>{item.title}</h3>
            <p>{item.amount}</p>
            <p>{item.createdAt}</p>
            <p>{item.paymentacc}</p>
            <p>{item.user[0].name}</p>
            <Button
              variant="danger"
              onClick={() => {
                reqDeleteHandler(item.id);
              }}
            >
              Delete
            </Button>
          </Alert>
        ))
      ) : (
        <p>No data to be found</p>
      )}
    </Container>
  );
};

export default DonationList;
