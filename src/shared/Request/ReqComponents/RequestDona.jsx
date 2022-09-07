import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const RequestDona = () => {
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

  return (
    <Container>
      <h1>Requested Donations by Needy</h1>

      {itemData &&
        itemData.map((item, index) => (
          <Alert variant={"dark"} key={index + 1}>
            <p>{item.title}</p>
            <p>
              {item.amount}
              <b>pkr</b>
            </p>
            <p>{item.description}</p>
            <p>{item.createdAt}</p>
            <p>{item.paymentacc}</p>
            <p>{item.user[0].name}</p>
          </Alert>
        ))}
    </Container>
  );
};

export default RequestDona;
