import React, { useEffect, useState } from "react";
import "./EPHome.css";
import Product from "./Product";
import Axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

function EPHome() {
  const [medicineList, setMedicineList] = React.useState([]);
  const history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:3001/medicines").then((response) => {
      setMedicineList(response.data);
    });
  }, []);

  // const getMedicines = () => {
  //   Axios.get("http://localhost:3001/medicines").then((response) => {
  //     setMedicineList(response.data);
  //   });
  // };

  return (
    <div className="home">
      {localStorage.getItem("isLoggedIn") === "true" ? (
        <div className="home__container">
          <img
            className="home__image"
            src="https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/20200324MMSBOPPHARMACIST04053-2-1585845968.jpg"
            alt="EPharma"
            style={{ height: "90vh", width: "200vh" }}
          />
          {/* <div className="home__row">
          <Product
            id="12321341"
            title="PARACETEMOL"
            price={11.96}
            rating={5}
            image="https://m.jagranjosh.com/imported/images/E/GK/paracetamol-tablets-export.jpg"
          />
          <Product
            id="49538094"
            title="NEMULID TABLETS"
            price={11.0}
            rating={4}
            image="https://www.medwik.in/wp-content/uploads/2020/08/nimulid-tablet.jpg"
          />
        </div> */}

          <div className="home__row">
            {medicineList.map((val, key) => {
              console.log(val.mname);
              if (val.isavail == 1) {
                return (
                  <Product
                    id={val.mid}
                    title={val.mname}
                    price={val.price}
                    rating={3}
                    image="https://4.imimg.com/data4/CL/JC/ANDROID-56501799/product-500x500.jpeg"
                  />
                );
              }
            })}
            {/* <Product
            id="4903850"
            title="Benedryl"
            price={199.99}
            rating={3}
            image="https://4.imimg.com/data4/CL/JC/ANDROID-56501799/product-500x500.jpeg"
          />
          <Product
            id="23445930"
            title="DIGENE LIQUID"
            price={98.99}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/61YJWZrai-L._SL1500_.jpg"
          />
          <Product
            id="3254354345"
            title="TETANUS SHORTS"
            price={598.99}
            rating={4}
            image="https://5.imimg.com/data5/ZL/ZK/UC/SELLER-41272859/tetanus-toxoid-vaccine-adsorbed-250x250.jpg"
          /> */}
          </div>

          {/* <div className="home__row">
            <Product
              id="90829332"
              title="CROCIN ADVANCE"
              price={1094.98}
              rating={4}
              image="https://static2.medplusmart.com/products/CROC0012_L.jpg?v=dc5b98"
            />
          </div> */}
        </div>
      ) : (
        <div>{(alert("Log In First"), history.push("./csignin"))}</div>
      )}
    </div>
  );
}

export default EPHome;
