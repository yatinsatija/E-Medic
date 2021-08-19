import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GoogleMaps from "./GoogleMap";
import GoogleMaps1 from "./GoogleMap1";
import { useEffect, useState } from "react";
import Axios from "../axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
  },
  image: {
    // backgroundImage: "url(https://source.unsplash.com/random)",
    // backgroundRepeat: "no-repeat",
    backgcroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    position: "relative",
    alignItems: "stretch",
    // marginLeft: "1000px",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [order, setOrder] = useState("");
  const [lat, setLatitude] = useState("");
  const [long, setLongitude] = useState("");
  const [prevlat, setPrevlat] = useState("");
  const [prevlong, setPrevlong] = useState("");

  const history = useHistory();
  const pleasework = () => {
    if (city.match(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/) == null) {
      alert("Enter Valid City Name");
    } else if (
      state.match(/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/) == null
    ) {
      alert("Enter Valid State Name");
    } else if (pincode.length != 6 || pincode.match(/[0-9]/) == null) {
      alert("Enter Valid Pincode");
    } else {
      localStorage.setItem("place", city);
      localStorage.setItem("address", address);
      localStorage.setItem("pincode", pincode);
      localStorage.setItem("state", state);
      
      Axios.post("http://localhost:3001/delivery", {
        city: city,
        address: address,
        state: state,
        pincode: pincode,
        order: localStorage.getItem("order"),
      }).then((response) => {
        console.log(response);
      });
      history.push("./checkout");
    }
  };

  const getToken = async () => {
    const response = await window.tt.services
      .fuzzySearch({
        key: "GaEXgiQc4oiI5iJ7Ab6ALanuaF4lOcZx",
        // center: this.map.getCenter(), // Search in the vicinity of the area indicated on the map
        query: city,
        // categorySet: "7315025", // Italian's category code,
      })
      .go();
    console.log(response.results[0].position);
    localStorage.setItem("lng", response.results[0].position.lng);
    localStorage.setItem("lat", response.results[0].position.lat);
    setPrevlat(lat);
    setPrevlong(long);
    setLatitude(response.results[0].position.lat);
    setLongitude(response.results[0].position.lng);
    Axios.get("http://localhost:3001/ordernumber").then((response) => {
        localStorage.setItem("order", response.data[0]["MAX(oid)"] + 1);
      });
  };

  useEffect(() => {
    // Update the document title using the browser API
    console.log("Successful");
    console.log(lat + "Lat");
  }, []);

  return (
    <div
      className="Hello"
      style={{
        display: "flex",
      }}
    >
      {console.log("Render" + lat)}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "500px",
          marginTop: "20px",
          marginLeft: "15px",
        }}
      >
        <Typography component="h1" variant="h5">
          Enter Details
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="addressline"
            label="AddressLine"
            name="addressline"
            autoComplete="addressline"
            autoFocus
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="city"
            label="city"
            // type="password"
            id="city"
            onChange={(e) => {
              // if((typeof(e.target.value)).lo)

              localStorage.setItem("place", e.target.value);
              setCity(e.target.value);

              // console.log(e.target.value);
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pincode"
            label="pincode"
            // type="password"
            id="pincode"
            autoComplete="current-pincode"
            onChange={(e) => {
              setPincode(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="state"
            label="state"
            // type="password"
            id="state"
            autoComplete="current-state"
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => getToken()}
          >
            Check Location on map
          </Button>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => pleasework()}
          >
            Send Details
          </Button>
        </form>
      </div>
      {lat != prevlat && long != prevlong ? (
        <GoogleMaps latitude={lat} longitude={long} />
      ) : (
        <GoogleMaps1 />
      )}
    </div>
  );
}
