import React, { useState, useEffect } from "react";

const APurchases = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;

  // const [shipped, setShipped] = useState(false);
  // const [commentId, setCommentId] = useState("");
  const [respData, setRespData] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/unshipped",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      const responseData = await response.json();
      setRespData(responseData.data);
    };

    getItems();
  }, [bearer]);

  // const updateItems = (a) => {
  //   // setShipped(b);
  //   setCommentId(a);
  // };

  const commentUpdateHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/needyitem//itemshiptoneedy/${x}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Item Shipped Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  //   const itemDeleteHandler = async (x) => {
  //     try {
  //       const response = await fetch(
  //         `https://placeofkindness-server.herokuapp.com/api/v1/needyitem/deletepurchasing/${x}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             Authorization: bearer,
  //           },
  //         }
  //       );

  //       if (response.status === 204) {
  //         alert("Item Deleted Sucessfully!!!!");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <div>
      <h1>Admin Purchases Panel</h1>
      <br />
      {/* <h1>Update Item</h1>
      <div>
        <form>
          <input
            type="text"
            required
            onChange={(e) => setShipped(e.target.value)}
            placeholder={"True or False"}
            value={shipped}
          />
          <br />

          <button onClick={commentUpdateHandler}>Update</button>
          <br />
        </form>
      </div> */}

      <h1>UnShipped Items</h1>
      {respData &&
        respData.map((item) => (
          <div style={{ border: "solid" }}>
            {item.item.map((i) => (
              <h5>{i}</h5>
            ))}
            <h5>{item.shipaddress}</h5>
            {item.shipped ? <h5>Shipped</h5> : <h5>Not Shipped</h5>}
            <h5>{item.user[0]}</h5>
            <h5>{item.createdAt}</h5>
            <div style={{ display: "flex" }}>
              <p
                onClick={() => {
                  commentUpdateHandler(item._id);
                }}
                style={{
                  boarder: "solid",
                  backgroundColor: "grey",
                  color: "white",
                  width: "3vw",
                }}
              >
                Update
              </p>
              {/* <p>&nbsp;&nbsp;</p>
              <p
                onClick={() => {
                  itemDeleteHandler(item.id);
                }}
                style={{
                  boarder: "solid",
                  backgroundColor: "grey",
                  color: "white",
                  width: "3vw",
                }}
              >
                Delete
              </p> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default APurchases;
