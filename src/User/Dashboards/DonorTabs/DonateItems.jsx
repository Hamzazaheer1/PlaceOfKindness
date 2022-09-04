import React, { useEffect, useState } from "react";

const DonateItems = () => {
  let token;
  if (localStorage.donator) {
    token = localStorage.getItem("donator");
  }

  const bearer = "Bearer " + token;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setIamge] = useState("");
  const [respData, setRespData] = useState([]);

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

  const itemPostHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("photo", image);
    console.log(formData);
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/items/createItem",
        {
          method: "POST",
          headers: {
            Authorization: bearer,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        console.log(response);
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Item Post Created Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

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
    console.log(responseData);
    setRespData(responseData.data.items);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1>Donator Items</h1>
      <br />
      <br />
      <div>
        <h2>Donate Item</h2>
        <form>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            placeholder={"Enter Name"}
          />
          <br />
          <br />
          <input
            type="text"
            required
            onChange={(e) => setCategory(e.target.value)}
            placeholder={"Enter Category"}
          />
          <br />
          <br />
          <input
            type="file"
            required
            onChange={(e) => setIamge(e.target.files[0])}
            placeholder={"Upload Image"}
          />
          <br />
          <br />
          <button onClick={itemPostHandler}>Submit</button>
          <br />
        </form>
      </div>

      <div>
        <h2>Donated Iteams</h2>
        {respData ? (
          respData.map((item) => (
            <div style={{ border: "solid" }}>
              <img src={item.photo} alt="notFound" style={{ width: "100px" }} />
              <h4>{item.name}</h4>
              <h4>{item.category}</h4>
              <h4>{item.createdAt}</h4>
              <p
                onClick={() => {
                  itemDeleteHandler(item.id);
                }}
                style={{
                  boarder: "solid",
                  backgroundColor: "grey",
                  color: "white",
                  width: "8vw",
                }}
              >
                Delete Item
              </p>
            </div>
          ))
        ) : (
          <h4>No item found...</h4>
        )}
      </div>
    </div>
  );
};

export default DonateItems;
