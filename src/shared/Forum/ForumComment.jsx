import React, { useState, useEffect } from "react";

const ForumComment = (props) => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const [itemData, setItemData] = useState([]);
  const [comment, setComment] = useState();

  const mycomments = [{ comment: "No comment Found", user: ["temp"] }];

  let response;
  let responseData;
  const getItems = async () => {
    response = await fetch(
      `https://placeofkindness-server.herokuapp.com/api/v1/posts/${props.data}`
    );
    responseData = await response.json();
    setItemData(responseData.data.data);
    if (responseData.data.data.comments.length != 0) {
      console.log(responseData.data.data.comments[0]);
      setItemData(responseData.data.data.comments);
    } else {
      setItemData(mycomments);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const commentSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/posts/${props.data}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            comment: comment,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert(responseData.status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
      <h1>{props.title}</h1>
      {token && (
        <form>
          <input
            type="text"
            required
            onChange={(e) => setComment(e.target.value)}
            placeholder={"What are your thoughts "}
          />
          <button onClick={commentSubmitHandler}>Comment</button>
        </form>
      )}
      <br />
      {itemData.map((item) => (
        <div key={item.id}>
          <p>{item.user[0].name}</p>
          <p>{item.comment}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ForumComment;
