import React, { useEffect, useState } from "react";
import "./Donated.css";

const Donated = () => {
  const token = localStorage.getItem("needy");
  const bearer = "Bearer " + token;
  const [itemdata, setItemData] = useState([]);
  const [RespData, setRespData] = useState([]);
  const [itemId, setItemId] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/items/"
      );
      const responseData = await response.json();
      setItemData(responseData.data);
    };

    getItems();
  });

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/getme",
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

    getProfile();
  }, [bearer]);

  const dataHandler = (a, b, c, d) => {
    setItemId(a);
    setImage(b);
    setName(c);
    setCategory(d);
  };

  const getDonationHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/items/${itemId}/needyitem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
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
      alert("You will get item soon");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Enter Details below to get specific item</h1>
      <p>Click on Select Item before clicking get Donation</p>
      <div>
        <h5>{<img src={image} alt="notFound"></img>}</h5>
        <h5>{name}</h5>
        <h5>{category}</h5>
      </div>
      {RespData.role != "unverified" && (
        <form>
          <label>
            Enter your Shipping Address:
            <input
              type="text"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <button onClick={getDonationHandler}>Get Donation</button>
        </form>
      )}

      <h1>List of Donated Items</h1>
      {itemdata &&
        itemdata.map((item) => (
          <div>
            {!item.given && item.available && (
              <div>
                <h5>{<img src={item.photo} alt="notFound" />}</h5>
                <h5>{item.name}</h5>
                <h5>{item.category}</h5>
                <h5>{item.user[0].name}</h5>
                <p
                  onClick={() => {
                    dataHandler(item.id, item.photo, item.name, item.category);
                  }}
                  style={{
                    boarder: "solid",
                    backgroundColor: "grey",
                    color: "white",
                    width: "8vw",
                  }}
                >
                  Select Item
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Donated;
