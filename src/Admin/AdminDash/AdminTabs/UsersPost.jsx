import React, { useState, useEffect } from "react";

const UsersPost = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;
  const [itemData, setItemData] = useState([]);
  const [postId, setPostId] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

  let response;
  let responseData;
  const getItems = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/posts/"
    );
    responseData = await response.json();
    setItemData(responseData.data);
  };

  useEffect(() => {
    getItems();
  }, []);

  const updatePost = (a, b, c) => {
    setPostId(a);
    setPostTitle(b);
    setPostDesc(c);
  };

  const userUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/posts/${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            title: postTitle,
            description: postDesc,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Request Updated Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  const postDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/posts/${x}`,
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
    <div>
      <h1>Update User Posts</h1>
      <div>
        <form>
          <input
            type="textbox"
            required
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder={"Title"}
            value={postTitle}
            style={{ width: "25vw" }}
          />
          <br />
          <br />
          <textarea
            type="textbox"
            required
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder={"Description"}
            value={postDesc}
            style={{ width: "25vw" }}
          />

          <button onClick={userUpdateHandler}>Update</button>
        </form>
        <br />
      </div>
      <h1>UsersPost</h1>
      {itemData &&
        itemData.map((item) => (
          <div key={item.id} style={{ border: "solid" }}>
            <p>{item.id}</p>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
            <p>{item.user[0].name}</p>
            <p>{item.createdAt}</p>
            <div style={{ display: "flex" }}>
              <p
                onClick={() => {
                  updatePost(item.id, item.title, item.description);
                }}
                style={{
                  boarder: "solid",
                  backgroundColor: "grey",
                  color: "white",
                  width: "6vw",
                }}
              >
                Update POST
              </p>
              <p>&nbsp;&nbsp;</p>
              <p
                onClick={() => {
                  postDeleteHandler(item.id);
                }}
                style={{
                  boarder: "solid",
                  backgroundColor: "grey",
                  color: "white",
                  width: "5vw",
                }}
              >
                Delete POST
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UsersPost;
