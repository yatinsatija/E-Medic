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
import Axios from "axios";
import { useEffect, useState } from "react";
import firebase from "../../../Firebase/Firebase";
import { storage, firestore } from "../../../Firebase/Firebase";
import { Redirect, useHistory } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import "tachyons";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
// import {Redirect } from 'react-router-dom';
// import {Link,Router} from 'react-router-dom';
// import { storage ,auth} from '../../backend/server';
// import { firestore } from '../../backend/server';
// import Checkbox from "@material-ui/core/Checkbox";
import "./CustomerLanding.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://st4.depositphotos.com/1832477/30168/v/950/depositphotos_301682766-stock-illustration-medical-consultation-cartoon-doctor-measuring.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  dialog: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    flexDirection: "column",
    display: "flex",
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();
  //   const name = localStorage.getItem("name");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const req = Math.floor(Math.random() * 10000 + 1).toString(10);
  const [eventDialog, setEventDialog] = React.useState(false);
  const [doctor, setDoctor] = React.useState("");
  const [advice, setAdvice] = React.useState("");
  var e = "";
  const [a, setA] = useState("");

  const getAdvice = async () => {
    const req = localStorage.getItem("request");
    const snapShot = await firestore.collection("advise").get();
    const docsArray = snapShot.docs;
    const docsArrayData = docsArray.map((doc) => doc.data());
    console.log(docsArrayData[0].advice);
    setAdvice(docsArrayData[0].advice);
    setDoctor(docsArrayData[0].doctorname);
    localStorage.setItem("advice", docsArrayData[0].advice);
    localStorage.setItem("doctor", docsArrayData[0].doctorname);
    // return docsArrayData[0];
  };

  return (
    <div>
      {localStorage.getItem("isLoggedIn") === "true" ? (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className="cover">
              <article className="br3 ba b--black-10 mv4 tc w-00 w-50-m w-25-l mw6 shadow-5 center main">
                <main className="pa4 black-80">
                  <div className="measure">
                    <fieldset
                      id="sign_up"
                      className="ba b--transparent ph0 mh0"
                    >
                      <legend className="f1 fw6 ph0 mh0">Welcome </legend>
                      <div className="mt3 center">
                        <label className="db fw6 lh-copy f6" htmlFor="name">
                          Name
                        </label>
                        <input
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
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="date">
                          Age
                        </label>
                        <input
                          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                          type="int"
                          name="Age"
                          id="Age"
                          // onChange={this.onDateChange}
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mt3">
                        <label
                          className="db fw6 lh-copy f6"
                          htmlFor="email-address"
                        >
                          Email
                        </label>
                        <input
                          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                          type="email"
                          name="email-address"
                          id="email-address"
                          // onChange={this.onEmailChange}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">
                          Symptoms
                        </label>
                        <textarea
                          className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                          id="symptoms"
                          name="symptoms"
                          rows="17"
                          cols="41"
                          onChange={(e) => {
                            setSymptoms(e.target.value);
                          }}
                        ></textarea>
                        {/* <input
                      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                      type="text"
                      name="symptoms"
                      id="symptoms"
                      style={{ height: 300 }}
                      // onChange={this.onPasswordChange}
                    /> */}
                      </div>
                      {/* <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Aadhar Card</label>
                                <input type='file' onChange={this.handleFileChange1} />
                                <button type='button' onClick={this.handleFileUpload1}> Upload </button><br /><br />
                            </div> */}
                      <div className="mv3"></div>
                    </fieldset>
                    <div className="">
                      <input
                        onClick={(e) => {
                          firestore
                            .collection("symptoms")
                            .doc(req)
                            .set({
                              requestId: req,
                              name: name,
                              email: email,
                              age: age,
                              symptoms: symptoms,
                              prescribed: 0,
                            })
                            .then(function (docRef) {
                              console.log(
                                "Document written with ID: ",
                                docRef.id
                              );
                            })
                            .catch(function (error) {
                              console.error("Error adding document: ", error);
                            });
                          // localStorage.setItem("secondaryname", name);
                          localStorage.setItem("request", req);

                          alert(
                            "Your response have been accepted wait for some time"
                          );
                        }}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Send Details"
                      />
                    </div>
                    {/* var a = getAdvice(); */}
                    <div className="">
                      <input
                        onClick={(e) => {
                          setEventDialog(true);
                          getAdvice();
                        }}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Get Advice"
                      />
                    </div>
                    <div>
                      <Dialog
                        open={Boolean(eventDialog)}
                        onClose={() => setEventDialog(false)}
                        scroll="body"
                        variant="fade"
                      >
                        <DialogTitle>{doctor}</DialogTitle>
                        {/* <DialogTitle>{props.event.age}</DialogTitle> */}
                        <DialogContent>
                          <div className={classes.dialog}>
                            <div>{advice}</div>
                          </div>
                        </DialogContent>
                        <div className="cover">
                          <article className="br3 ba b--black-10 mv4 tc w-00 w-50-m w-25-l mw6 shadow-5 center main">
                            <main className="pa4 black-80">
                              <div className="measure">
                                <fieldset
                                  id="sign_up"
                                  className="ba b--transparent ph0 mh0"
                                >
                                  <div className="mv3">
                                    <div className={classes.dialog}>
                                      <div></div>
                                    </div>
                                  </div>
                                </fieldset>
                              </div>
                            </main>
                          </article>
                        </div>

                        <DialogActions>
                          <Button onClick={() => setEventDialog(false)}>
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </main>
              </article>
            </div>
          </Grid>
        </Grid>
      ) : (
        <div>{(alert("Log In First"), history.push("./csignin"))}</div>
      )}
    </div>
  );
}
