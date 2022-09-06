import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
const NeedyPurchases = () => {
  let token;
  if (localStorage.needy) {
    token = localStorage.getItem("needy");
  }
  let bearer = "Bearer " + token;

  const [spent, setRespDataSpent] = useState([]);
  const [unspent, setRespDataUnspent] = useState([]);

  useEffect(() => {
    const getUnsentItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/needyunsentitems",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      const responseData = await response.json();
      setRespDataUnspent(responseData.data);
    };

    const getSentItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/needysentitems",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      const responseData = await response.json();

      console.log("needy Sent item is ", responseData.data);
      setRespDataSpent(responseData.data);
    };

    getUnsentItems();
    getSentItems();
  }, [bearer]);

  return (
    <Container>
      <h1>NeedyPurchases</h1>
      <Row>
        <Col md={5}>
          <h2>Needy Shipped Items</h2>
          <br />
          {spent ? (
            spent.map((item) => (
              <div>
                {item.shipped && (
                  <Alert variant="dark">
                    <p>{item.id}</p>
                    {/* <p>{item.item[0].name}</p> */}
                    {item.shipped ? <p>Shipped</p> : <p>UnShipped</p>}
                  </Alert>
                )}
              </div>
            ))
          ) : (
            <p>No Item Found</p>
          )}
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
          <h2>Needy Un-Shipped Items</h2>
          <br />
          {unspent ? (
            unspent.map((item) => (
              <div>
                {!item.shipped && (
                  <Alert variant="dark">
                    <p>{item.id}</p>
                    {/* <p>{item.item[0].name}</p> */}
                    {item.shipped ? <p>Shipped</p> : <p>UnShipped</p>}
                    <p>{item.shipaddress}</p>
                    <p>{item.createdAt}</p>
                  </Alert>
                )}
              </div>
            ))
          ) : (
            <p>No Item Found</p>
          )}
        </Col>
      </Row>
    </Container>
    // <div>
    //   <h1>NeedyPurchases</h1>
    //   <div style={{ display: "inline-flex" }}>
    //     <div>
    //       <h1>Needy Sent Items</h1>
    //       {spent ? (
    //         spent.map((item) => (
    //           <div>
    //             {item.shipped && (
    //               <div>
    //                 <h4>{item.id}</h4>
    //                 {/* <h4>{item.item[0].name}</h4> */}
    //                 {item.shipped ? <h5>Shipped</h5> : <h5>UnShipped</h5>}
    //               </div>
    //             )}
    //           </div>
    //         ))
    //       ) : (
    //         <h5>No item found</h5>
    //       )}
    //     </div>
    //     <div style={{ marginLeft: "50rem" }}>
    //       <h1>Needy Un-Sent Items</h1>
    //       {unspent ? (
    //         unspent.map((item) => (
    //           <div>
    //             {!item.shipped && (
    //               <div>
    //                 <h5>{item.createdAt}</h5>
    //                 {item.shipped ? <h5>Shipped</h5> : <h5>UnShipped</h5>}
    //                 <h5>{item.shipaddress}</h5>
    //                 <h5>{item.createdAt}</h5>
    //               </div>
    //             )}
    //           </div>
    //         ))
    //       ) : (
    //         <h5>No item found</h5>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default NeedyPurchases;
