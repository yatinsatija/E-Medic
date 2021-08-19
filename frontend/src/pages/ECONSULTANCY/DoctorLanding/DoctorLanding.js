import React from "react";
import { TextField, Button, FormControl } from "@material-ui/core";
import { firestore } from "../../../Firebase/Firebase";
import SymptomsCard from "./SymptomsCard";
import "./DoctorLanding.css";

export default class DoctorLanding extends React.Component {
  //const classes = useStyles();
  constructor(props) {
    super(props);
    this.state = {
      // user: localStorage.getItem("employer"),
      selectedJob: null,
      jobs: [],
    };
  }

  async f1() {
    const snapShot = await firestore.collection("symptoms").get();
    const docsArray = snapShot.docs;
    const docsArrayData = docsArray.map((doc) => doc.data());
    return docsArrayData;
  }

  async functionFirebase() {
    const array = await this.f1();
    // const loggedIn= auth.currentUser;
    // this.setState({user: loggedIn});
    this.setState(Object.assign(this.state.jobs, { jobs: array }));
    //this.setState(Object.assign(this.state.filteredJobs, { filteredJobs: array }))
  }

  componentDidMount() {
    this.functionFirebase();
    console.log(this.state.jobs);
  }

  render() {
    //console.log(this.state.jobs);
    return (
      <div>
        {localStorage.getItem("isLoggedIn") === "true" ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {this.state.jobs.map((element) => {
              return <SymptomsCard event={element} />;
            })}
          </div>
        ) : (
          <div>{alert("Please Log in first")}</div>
        )}
      </div>
    );
  }
}
