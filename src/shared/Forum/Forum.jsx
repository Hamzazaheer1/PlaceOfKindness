import React, { useState, useEffect, Children } from "react";
import ForumComment from "./ForumComment";

const Forum = () => {
  const [itemData, setItemData] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemtitle, setItemTitle] = useState("");

  let response;
  let responseData;
  const getItems = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/posts/"
    );
    responseData = await response.json();
    setItemData(responseData.data.data);
  };

  useEffect(() => {
    getItems();
  }, []);

  const itemidHandler = (x, y) => {
    setItemId(x);
    setItemTitle(y);
  };

  if (itemId && itemtitle) {
    return <ForumComment data={itemId} title={itemtitle} />;
  }

  return (
    <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
      <h1>Forum</h1>
      {itemData.map((item) => (
        <div key={item.id}>
          <p>{item.user[0].name}</p>
          <h3
            onClick={() => {
              {
                itemidHandler(item.id, item.title);
              }
            }}
          >
            {item.title}
          </h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forum;
