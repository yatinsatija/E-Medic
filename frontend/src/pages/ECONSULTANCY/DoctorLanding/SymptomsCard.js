import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
// import Typography from "@material-ui/core/Typography";
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
// import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { firestore } from "../../../Firebase/Firebase";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
// import firebase from "../../../Firebase/Firebase";
// import { storage, firestore } from "../../../Firebase/Firebase";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 305,
    maxHeight: 390,
    "&:hover": {
      boxShadow: "10px 10px 10px 0px rgba(0, 0, 0, 0.64)",
      marginLeft: "-3px",
      marginTop: "-2px",
      transitionDuration: 200,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  dialog: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    flexDirection: "column",
    display: "flex",
  },
  poster: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "40%",
    },
    width: "100%",
  },
  content: {
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    width: "100%",
    padding: "1%",
  },
}));

export default function SymptomsCard(props) {
  const history = useHistory();
  const classes = useStyles();
  const prefersDarkMode = localStorage.getItem("darkMode") === "true";
  let mobile = window.matchMedia("(max-width: 300px)").matches === "true";
  const [open, setOpen] = React.useState(false);
  const [eventDialog, setEventDialog] = React.useState(false);
  const imgLink = props.event.prescription;
  // const generate = false;
  const [doctorname, setName] = useState("");
  const [advice, setAdvice] = useState("");
  const [display, setDisplay] = useState(false);
  var req = 0;
  // const [generate, setGenerate] = useState(false);
  // var generate = "none";
  //   let user = localStorage.getItem('token');

  //Shows snackbar with message and copies link in '' for user
  const handleClick = () => {
    setOpen(true);
    console.log(imgLink);
    navigator.clipboard.writeText("Copy this text to clipboard");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // const openInNewTab = (url) => {
  //   const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  //   if (newWindow) newWindow.opener = null;
  // };

  const generateAdvice = (requestId) => {
    // setGenerate(true);
    // generate = "flex";
    req = requestId;
    setDisplay(true);
  };

  return (
    <div>
      <Card
        className={classes.root}
        onDoubleClick={() => setEventDialog(true)}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: props.event.prescribed === 0 ? "azure" : "#ff0066",
          cursor: "pointer",
        }}
      >
        <CardHeader
          title={props.event.name}
          //   subheader={props.event.date}
        />
        {/* <CardMedia
          className={classes.media}
          image="/images/Logo.jpg"
          title="Paella dish"
        /> */}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Symptoms
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ marginTop: "auto" }}>
          <Button size="small" onClick={() => setEventDialog(true)}>
            Read More
          </Button>
        </CardActions>
      </Card>

      {/* Dialog for each event*/}
      <Dialog
        open={Boolean(eventDialog)}
        onClose={() => setEventDialog(false)}
        scroll="body"
        variant="fade"
      >
        <DialogTitle>{props.event.name}</DialogTitle>
        <DialogTitle>{props.event.age}</DialogTitle>
        <DialogContent>
          <div className={classes.dialog}>
            <div>{props.event.symptoms}</div>
          </div>
        </DialogContent>
        <div className="cover">
          <article className="br3 ba b--black-10 mv4 tc w-00 w-50-m w-25-l mw6 shadow-5 center main">
            <main className="pa4 black-80">
              <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend
                    // style={{ display: generate }}
                    className="f1 fw6 ph0 mh0"
                  >
                    Advice{" "}
                  </legend>
                  <div className="mt3 center">
                    <label
                      // style={{ display: generate }}
                      className="db fw6 lh-copy f6"
                      htmlFor="name"
                    >
                      Doctor Name
                    </label>
                    <input
                      // style={{ display: generate }}
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                      type="text"
                      name="name"
                      id="name"
                      // onChange={this.onNameChange}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mv3">
                    <label
                      // style={{ display: generate }}
                      className="db fw6 lh-copy f6"
                      htmlFor="password"
                    >
                      Precautions
                    </label>
                    <textarea
                      // style={{ display: generate }}
                      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                      id="symptoms"
                      name="symptoms"
                      rows="17"
                      cols="41"
                      onChange={(e) => {
                        setAdvice(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="mv3"></div>
                </fieldset>
                {/* <div className="">
                  <input
                    onClick={(e) => {
                      firestore
                        .collection("symptoms")
                        .add({
                          requestId: Math.floor(Math.random() * 10000 + 1),
                          name: name,
                          email: email,
                          age: age,
                          symptoms: symptoms,
                        })
                        .then(function (docRef) {
                          console.log("Document written with ID: ", docRef.id);
                        })
                        .catch(function (error) {
                          console.error("Error adding document: ", error);
                        });
                      alert(
                        "Your response has been submitted we will reach you in a while"
                      );
                    }}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Send Details"
                  />
                </div> */}
              </div>
            </main>
          </article>
        </div>

        <DialogActions>
          <Button
            onClick={() => {
              generateAdvice(props.event.requestId);
              props.event.prescribed = 1;
              firestore
                .collection("symptoms")
                .doc(props.event.requestId)
                .update({ prescribed: 1 });
            }}
          >
            Generate Advice
          </Button>
          <Button
            // style={{ display: generate }}
            // onClick={() => {
            //   openInNewTab(props.event.prescription);
            // }}
            onClick={(e) => {
              console.log(req);
              firestore
                .collection("advise")
                .doc(req.toString())
                .set({
                  requestId: req,
                  doctorname: doctorname,

                  advice: advice,
                })
                .then(function (docRef) {
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                  console.error("Error adding document: ", error);
                });
              alert(
                "Your response has been submitted we will reach you in a while"
              );
            }}
          >
            Post Advice
          </Button>
          <Button onClick={() => setEventDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
