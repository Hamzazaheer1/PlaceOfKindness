import React, { useState, useEffect } from "react";

const AComment = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;

  // const [comment, setComment] = useState("");
  // const [commentId, setCommentId] = useState("");
  const [respData, setRespData] = useState([]);
  let response;
  let responseData;
  const getDonors = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/comments/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    responseData = await response.json();
    setRespData(responseData.data);
  };

  useEffect(() => {
    getDonors();
  }, []);

  // const updateComment = (a, b) => {
  //   setComment(b);
  //   setCommentId(a);
  // };

  // const commentUpdateHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `https://placeofkindness-server.herokuapp.com/api/v1/comments/${commentId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: bearer,
  //         },
  //         body: JSON.stringify({
  //           comment: comment,
  //         }),
  //       }
  //     );

  //     const responseData = await response.json();
  //     if (!response.ok) {
  //       alert(responseData.message);
  //       throw new Error(responseData.message);
  //     }
  //     alert("Comment Updated Sucessfully!!!!");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const postDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/comments/${x}`,
        {
          method: "DELETE",
          headers: {
            Authorization: bearer,
          },
        }
      );

      if (response.status === 204) {
        alert("Comment Deleted Sucessfully!!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Admin Comment Panel</h1>
      <br />
      {/* <h1>Update Comments</h1>
      <div>
        <form>
          <input
            type="text"
            required
            onChange={(e) => setComment(e.target.value)}
            placeholder={"write comment"}
            value={comment}
          />
          <br />

          <button onClick={commentUpdateHandler}>Update</button>
          <br />
        </form>
      </div> */}

      <h1>Comments</h1>
      {respData &&
        respData.map((item) => (
          <div style={{ border: "solid" }}>
            <h5>{item.comment}</h5>
            <h5>{item.user[0].name}</h5>
            <h5>{item.createdAt}</h5>
            <div style={{ display: "flex" }}>
              {/* <p
                onClick={() => {
                  updateComment(item.id, item.comment);
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
              <p>&nbsp;&nbsp;</p> */}
              <p
                onClick={() => {
                  postDeleteHandler(item.id);
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

export default AComment;
