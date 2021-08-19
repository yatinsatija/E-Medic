import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../../../reducer";
import { useHistory } from "react-router-dom";
import Axios from "../axios";
import { useState, useEffect } from "react";
import FormPage from "./Delivery";

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  // const [upload1, setUpload] = useState(false);
  // const [delivery1, setDelivery] = useState(false);
  var upload1 = false;
  var delivery1 = false;
  const pleasework = () => {
    if (localStorage.getItem("upload") && localStorage.getItem("delivery")) {
      Axios.get("http://localhost:3001/ordernumber").then((response) => {
        // setMedicineList(response.data);
        // console.log(response.data);
        localStorage.setItem("order", response.data[0]["MAX(oid)"] + 1);
        history.push("/payment");
      });
    } else alert("First Upload Prescription and Enter Delivery Details");
  };
  const upload = () => {
    // setUpload(true);
    upload1 = true;
    localStorage.setItem("upload", true);
    history.push("/prescription");
  };
  const delivery = () => {
    // setDelivery(true);
    // history.push("/prescription");
    delivery1 = true;
    localStorage.setItem("delivery", true);
    history.push("/delivery");
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            {/* <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small> */}
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button onClick={(e) => pleasework()}>Proceed to Checkout</button>
      <button onClick={(e) => upload()}>Upload Prescription</button>
      {/* <FormPage /> */}
      <button onClick={(e) => delivery()}>Enter Delivery Details</button>
    </div>
  );
}

export default Subtotal;
