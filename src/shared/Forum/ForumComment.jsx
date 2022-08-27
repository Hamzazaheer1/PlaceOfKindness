import React, { useState, useEffect } from "react";

const ForumComment = (props) => {
  const [itemData, setItemData] = useState([]);
  //const [itemId, setItemId] = useState();
  const [comment, setComment] = useState();
  //const [commentarr, setCommentArr] = useState([]);

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

  return (
    <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
      {/* <h1>{props.data}</h1> */}
      <h1>{props.title}</h1>
      <form>
        <input
          type="text"
          required
          onChange={(e) => setComment(e.target.value)}
          placeholder={"What are your thoughts "}
        />
        <button>Comment</button>
      </form>
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
