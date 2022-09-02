import React, { useState, useEffect } from "react";

const DonatedItems = () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  let data;
  const [itemdata, setItemData] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [availible, setAvailible] = useState("");
  const [given, setGiven] = useState("");

  let response;
  let responseData;
  const getItems = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/items/"
    );
    responseData = await response.json();
    setItemData(responseData.data);
  };

  useEffect(() => {
    getItems();
  });

  const itemDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/items/${x}`,
        {
          method: "DELETE",
          headers: {
            Authorization: bearer,
          },
        }
      );

      if (response.status === 204) {
        alert("Item Deleted Sucessfully!!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = (a, b, c, d, e) => {
    setItemId(a);
    setName(b);
    setCategory(c);
    setAvailible(d);
    setGiven(e);
  };

  const userUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/items/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            name: name,
            category: category,
            availible: availible,
            given: given,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Item Updated Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <h1>Update Donated Items</h1>
        <br />
        <form>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            placeholder={"Name"}
            value={name}
          />
          <br />
          <br />
          <input
            type="text"
            required
            onChange={(e) => setCategory(e.target.value)}
            placeholder={"Category"}
            value={category}
          />
          <br />
          <br />
          <input
            type="text"
            required
            onChange={(e) => setAvailible(e.target.value)}
            placeholder={"Availibility"}
            value={availible}
          />
          <br />
          <br />
          <input
            type="text"
            required
            onChange={(e) => setGiven(e.target.value)}
            placeholder={"Given"}
            value={given}
          />
          <br />
          <br />
          <button onClick={userUpdateHandler}>Update</button>
        </form>
        <br />
        <br />
      </div>
      <h1>List of Donated Items</h1>
      {itemdata &&
        itemdata.map((item) => (
          <div style={{ border: "solid" }}>
            {console.log(item)}
            <h4>{item.name}</h4>
            <h4>{item.category}</h4>
            <h4>{item.createdAt}</h4>
            {item.available ? <h4>Availible</h4> : <h4>Not Availible</h4>}
            {item.given ? <h4>Given</h4> : <h4>Not Given</h4>}
            <h4>{item.user[0].name}</h4>
            <div style={{ display: "flex" }}>
              <p
                onClick={() => {
                  updateItem(
                    item.id,
                    item.name,
                    item.category,
                    item.available,
                    item.given
                  );
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
              <p>&nbsp;&nbsp;</p>
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
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DonatedItems;
