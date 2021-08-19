import React, { Component } from 'react';
import Axios from 'axios';
import { Link, useHistory } from "react-router-dom";

export default class UpdateMedicine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            medicines: [],
            hash: {}
        }
    };
    async componentWillMount() {
        await Axios.get("http://localhost:3001/medicines")
              .then((response) => {
                  console.log(response)
                this.setState({
                    medicines: response.data
                    })
                });
    }

    negateOrder(val,availstatus) {
        console.log(val)
        Axios.post("http://localhost:3001/negateorder", {
            mid: val,
            isavail: availstatus 
        }).then((res) => {
            if(res.data==='success'){
                alert("Medicine Stock status changed");
                window.location.reload()
            }
            else
                alert("Error")
        }
        );
    }


    render() {
        return (
            <div>
                <table style={{ width: "100%" }}>
                    <tr>
                        <td>Medicine Name</td>
                    </tr>
                    {this.state.medicines.map((val, key) => {
                        // console.log(this.state.hash)
                        return (
                            <tr>
                                <td>{val.mname}</td>
                                <td>
                                    {val.isavail===1?<button onClick={()=>this.negateOrder(val.mid,val.isavail)}>Set Unavailable</button>:<button onClick={()=>this.negateOrder(val.mid,val.isavail)}>Set Available</button>}
                                </td>
                            </tr>
                        )
                    })}

                </table>
            </div>
        )
    }
}
