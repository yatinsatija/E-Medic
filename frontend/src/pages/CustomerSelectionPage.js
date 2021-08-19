import React from "react";
import "tachyons";
import { useHistory } from "react-router-dom";

function CustomerSelectionPage() {
  const name = localStorage.getItem("name");
  const history = useHistory();
  const hello = () => {
    // localStorage.setItem("isLoggedIn", false);
    localStorage.clear();
    history.push("/");
  };
  return (
    <div>
      <div style={{ marginTop: "100px" }}></div>
      <div style={{ marginTop: "30px", marginLeft: "640px" }}>
        <button
          // onClick={this.handleSubmit}
          // className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="E-Pharmacy"
          onClick={(e) => history.push("/epharmacy")}
        >
          <a href="/epharmacy" style={{ textDecoration: "none" }}>
            E-PHARMACY
          </a>
        </button>
      </div>
      <div style={{ marginTop: "30px", marginLeft: "630px" }}>
        <button
          // onClick={this.handleSubmit}
          // className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="E-Consultancy"
          onClick={(e) => history.push("/econsultancy")}
        >
          <a href="/econsultancy" style={{ textDecoration: "none" }}>
            E-CONSULTANCY
          </a>
        </button>
      </div>
    </div>
  );
}

export default CustomerSelectionPage;
