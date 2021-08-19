import React from "react";
import { TextField, Button, FormControl } from "@material-ui/core";
import { firestore } from "../../../Firebase/Firebase";
import PrescriptionCard from "./PrescriptionCard";
import "./StaffValidation.css";
import { withRouter } from "react-router-dom";

class StaffValidation extends React.Component {
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
    const snapShot = await firestore.collection("orders").get();
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
    console.log(this.props);
    return (
      <div>
        {localStorage.getItem("isLoggedIn") === "true" ? (
          <div>
            <div>
              <Button
                style={{ backgroundColor: "#00D8EB", marginRight: "1%" }}
                onClick={() => this.props.history.push("/addmedicine")}
              >
                Add Medicine
              </Button>
              <Button
                style={{ backgroundColor: "#00D8EB" }}
                onClick={() => this.props.history.push("/updatemedicine")}
              >
                Update Medicine Status
              </Button>
            </div>
            <br />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {this.state.jobs.map((element) => {
                return <PrescriptionCard event={element} />;
              })}
            </div>
          </div>
        ) : (
          <div>{alert("Log In First")}</div>
        )}
      </div>
    );
  }
}

export default withRouter(StaffValidation);
