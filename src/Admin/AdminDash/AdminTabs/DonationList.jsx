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
        itemData.map((item) => (
          <Alert variant={"dark"}>
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
    // <div>
    //   <h1>Admin Dashboard</h1>
    //   <h3>List of Requested Donations by Needy</h3>

    //   <div>
    //     {itemData ? (
    //       itemData.map((item) => (
    //         <div style={{ border: "solid" }} key={item.id}>
    //           <p>{item.title}</p>
    //           <p>{item.amount}</p>
    //           <p>{item.createdAt}</p>
    //           <p>{item.paymentacc}</p>
    //           <p>{item.user[0].name}</p>
    //           <p
    //             onClick={() => {
    //               reqDeleteHandler(item.id);
    //             }}
    //             style={{
    //               boarder: "solid",
    //               backgroundColor: "grey",
    //               color: "white",
    //               width: "3vw",
    //             }}
    //           >
    //             Delete
    //           </p>
    //         </div>
    //       ))
    //     ) : (
    //       <p>No data to be found</p>
    //     )}
    //   </div>
    // </div>
  );
};

export default DonationList;
