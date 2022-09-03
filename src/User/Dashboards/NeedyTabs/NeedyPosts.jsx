import React, { useState, useEffect } from "react";

const NeedyPosts = () => {
  let token;
  if (localStorage.needy) {
    token = localStorage.getItem("needy");
  }
  let bearer = "Bearer " + token;

  const [respData, setRespData] = useState([]);

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
    setRespData(responseData.data.posts);
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(respData);
  return (
    <div>
      <h3>Your Posts</h3>
      {respData ? (
        respData.map((item) => (
          <div
            style={{ marginLeft: "2rem", marginTop: "1rem", border: "solid" }}
          >
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.createdAt}</p>
          </div>
        ))
      ) : (
        <p>no data found</p>
      )}
    </div>
  );
};

export default NeedyPosts;
