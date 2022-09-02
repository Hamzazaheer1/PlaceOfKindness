import React from "react";

const DonatedItems = () => {
  // const token = localStorage.getItem("token");
  // const bearer = "Bearer " + token;
  // let data;
  // const [itemdata, setItemData] = useState([]);
  // const [itemId, setItemId] = useState(null);
  // const [address, setAddress] = useState("");

  // let response;
  // let responseData;
  // const getItems = async () => {
  //   response = await fetch(
  //     "https://placeofkindness-server.herokuapp.com/api/v1/items/"
  //   );
  //   responseData = await response.json();
  //   setItemData(responseData.data);
  // };

  // useEffect(() => {
  //   getItems();
  // });

  // const getDonationHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `https://placeofkindness-server.herokuapp.com/api/v1/items/${itemId}/needyitem`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: bearer,
  //         },
  //         body: JSON.stringify({
  //           shipaddress: address,
  //         }),
  //       }
  //     );

  //     const responseData = await response.json();
  //     if (!response.ok) {
  //       alert(responseData.message);
  //       throw new Error(responseData.message);
  //     }
  //     alert(responseData.data.role);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return <div></div>;
};

export default DonatedItems;
