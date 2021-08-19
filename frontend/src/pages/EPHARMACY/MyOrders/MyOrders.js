import React, { Component } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uName: localStorage.getItem("email"),
      orders: [],
      isVal: [],
      hash: {},
    };
  }
  async componentWillMount() {
    await Axios.post("http://localhost:3001/myorders", {
      user: this.state.uName,
      test: 1,
    }).then((response) => {
      this.setState({
        orders: response.data,
      });
    });

    await this.state.orders.map((val) => {
      Axios.post("http://localhost:3001/progress", {
        checkID: val.oid,
      }).then((response) => {
        console.log(response);
        var val1 = response.data === "yes";
        // console.log(val1)
        var newInput = Object.assign({}, this.state.hash, { [val.oid]: val1 });
        this.setState({
          hash: newInput,
        });
      });
      // console.log(this.state.hash)
    });
  }

  billSet = (oid) => {
    localStorage.setItem("orderId", oid);
  };

  render() {
    return (
      <div>
        <table style={{ width: "100%" }}>
          <tr>
            <td>Order ID</td>
          </tr>
          {this.state.orders.map((val, key) => {
            // console.log(this.state.hash)
            return (
              <tr>
                <td>{val.oid}</td>
                <td>
                  {this.state.hash[val.oid] ? (
                    <Link to="/order">
                      <button
                        style={{ marginLeft: "45%" }}
                        onClick={() => {
                          this.billSet(val.oid);
                        }}
                      >
                        Download Bill
                      </button>
                    </Link>
                  ) : (
                    <p>Validation in Progress</p>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
        {/* {this.state.orders.map((val, key) => {
                    return (
                        <div>
                            <div>{val.oid}</div>
                            <button>Download Bill</button>
                        </div>
                        
                    );
                })} */}
      </div>
    );
  }
}
