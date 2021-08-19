import React, { Component } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default class RemoveDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      hash: {},
    };
  }
  async componentWillMount() {
    await Axios.get("http://localhost:3001/doctors").then((response) => {
      console.log(response);
      this.setState({
        doctors: response.data,
      });
    });
  }

  deleteDoctor(val) {
    console.log(val);
    Axios.post("http://localhost:3001/removedoctor", {
      did: val,
    }).then((res) => {
      if (res.data === "success") {
        alert("Doctor Removed Successfully");
        window.location.reload();
      } else alert("Error");
    });
  }

  render() {
    return (
      <div>
        <table style={{ width: "100%" }}>
          <br />
          <br />
          <tr>
            <td>Doctor Name</td>
          </tr>
          {this.state.doctors.map((val, key) => {
            // console.log(this.state.hash)
            return (
              <tr>
                <td>{val.name}</td>
                <td>
                  <button onClick={() => this.deleteDoctor(val.sid)}>
                    Remove Doctor
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
