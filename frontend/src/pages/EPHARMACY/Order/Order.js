import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { Component, useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import "./Order.css";

export default class Order extends Component {
  constructor() {
    super();
    this.state = {
      med: [],
    };
  }

  async componentWillMount() {
    await Axios.post("http://localhost:3001/generatebill", {
      oid: localStorage.getItem("orderId"),
    }).then((response) => {
      response.data.map((val) => {
        // setMedId(oldArray => [...oldArray, val.mid]);
        Axios.post("http://localhost:3001/billmed", {
          mid: val.mid,
        }).then((response) => {
          // console.log(response)
          this.setState((prevState) => ({
            med: [...prevState.med, response],
          }));
        });
      });
    });
    Axios.post("http://localhost:3001/billid", {
      oid: localStorage.getItem("orderId"),
    }).then((response) => {
      response.data.map((val) => {
        console.log(response);
        this.setState({
          bid: response.data[0].bno,
        });
      });
    });
  }

  printDocument = () => {
    const input = document.getElementById("pdfdiv");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };

  render() {
    return (
      <div>
        <h1>Bill Id : {this.state.bid}</h1>
        <TableContainer id="pdfdiv" className="txt" component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Id</TableCell> */}
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Medicine</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(this.state.med[0])}
              {this.state.med.map((items) => {
                console.log(items.data[0].mname);
                return (
                  <TableRow key={items.data[0].mid}>
                    {/* <TableCell component="th" scope="row">
                    {p.Id}
                  </TableCell> */}
                    <TableCell align="right">{items.data[0].mid}</TableCell>
                    <TableCell align="right">{items.data[0].mname}</TableCell>
                    <TableCell align="right">{items.data[0].price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <br></br>
          <Button
            onClick={(e) => this.printDocument()}
            variant="contained"
            color="primary"
          >
            Download Bill
          </Button>
        </TableContainer>
      </div>
    );
  }
}
