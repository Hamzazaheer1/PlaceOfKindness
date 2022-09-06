import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
const RequestDona = () => {
  const [itemData, setItemData] = useState();
  let response;
  let responseData;
  const getItems = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/request/"
    );
    responseData = await response.json();
    setItemData(responseData.data);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container>
      <h1>Requested Donations by Needy</h1>

      {itemData &&
        itemData.map((item) => (
          <Alert variant={"dark"}>
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
    // <div>
    //   <h1>Requested Donations by Needy</h1>

    //   <div>
    //     {itemData &&
    //       itemData.map((item) => (
    //         <div style={{ border: "solid" }}>
    //           <p>{item.title}</p>
    //           <p>
    //             {item.amount}
    //             <b>pkr</b>
    //           </p>
    //           <p>{item.description}</p>
    //           <p>{item.createdAt}</p>
    //           <p>{item.paymentacc}</p>
    //           <p>{item.user[0].name}</p>
    //         </div>
    //       ))}
    //   </div>
    // </div>
  );
};

export default RequestDona;
