import React from "react";
import Axios from "axios";

import "tachyons";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";

import Checkbox from "@material-ui/core/Checkbox";
import "./Registration.css";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Doctor", "Staff"];
// const classes = useStyles();

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      date: "",
      phNo: "",

      skillName: [],

      applied: [],
      isLoggedIn: false,
    };
    // const token=localStorage.getItem('token');
    // if(token==null)
    // {
    //   this.state.isLoggedIn=false;
    // }
    // else
    //   this.state.isLoggedIn=true;
  }
  //   handleSignOut = (event) => {
  //       auth.signOut();
  //       localStorage.removeItem('token');
  //       alert("Logged out successfully");
  //       if(window.location.port){
  //           window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
  //       }
  //       else{
  //           window.location.assign(`http://${window.location.hostname}/`);
  //       }
  //   }
  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onDateChange = (event) => {
    this.setState({ date: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  onCPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };
  handleFileChange1 = (event) => {
    if (event.target.files[0]) {
      this.setState({ file1: event.target.files[0] });
    }
  };
  handleFileChange2 = (event) => {
    if (event.target.files[0]) {
      this.setState({ file2: event.target.files[0] });
    }
  };
  onAadharChange = (event) => {
    this.setState({ aadhar: event.target.value });
  };

  onPicChange = (event) => {
    this.setState({ pic: event.target.value });
  };

  onSkillChange = (event) => {
    this.setState({ skillName: event.target.value });
  };
  onPhChange = (event) => {
    this.setState({ phNo: event.target.value });
  };
  unsubscribeFromAuth = null;

  //   componentDidMount() {
  //       this.unsubscribeFromAuth= auth.onAuthStateChanged(userAuth => {
  //           this.setState({ currentUser: userAuth });
  //       })
  //   }

  // handleFileUpload1 = (event) => {
  //     const { file1 } = this.state;
  //     if (!file1) {
  //         alert("Upload image and then click on upload button");
  //     } else {

  //         const uploadTask = storage.ref(`${file1.name}`).put(file1);

  //         uploadTask.on('state_changed',
  //             (snapShot) => { alert("uploading in progress") },
  //             (error) => { console.log(error) },
  //             () => {
  //                 storage
  //                     .ref('')
  //                     .child(file1.name)
  //                     .getDownloadURL()
  //                     .then(url => {
  //                         alert("Image_uploaded");
  //                         console.log("image uploaded");
  //                         this.setState({pic: url }, () => console.log(this.state));
  //                     })
  //             });
  //     }
  // }
  // handleFileUpload2 = (event) => {
  //     const { file2 } = this.state;
  //     if (!file2) {
  //         alert("Upload image and then click on upload button");
  //     } else {

  //         const uploadTask = storage.ref(`${file2.name}`).put(file2);

  //         uploadTask.on('state_changed',
  //             (snapShot) => { alert("uploading in progress") },
  //             (error) => { console.log(error) },
  //             () => {
  //                 storage
  //                     .ref('')
  //                     .child(file2.name)
  //                     .getDownloadURL()
  //                     .then(url => {
  //                         alert("Image_uploaded");
  //                         console.log("image uploaded");
  //                         this.setState({aadhar: url }, () => console.log(this.state));
  //                     })
  //             });
  //     }
  // }
  removeDoctor = (e) => {
    this.props.history.push("/removedoctor");
  };
  handleSubmit = async (event) => {
    const {
      name,
      password,
      confirmPassword,
      email,
      date,

      phNo,

      skillName,

      applied,
    } = this.state;
    console.log(this.state);
    // console.log(date);

    if (!(name.length > 0 && phNo.length != 0 && email.length > 0)) {
      alert("Enter all the details");
    } else if (password.localeCompare(confirmPassword) != 0) {
      alert("Password and Confirm Password do not match each other");
    } else if (phNo.match(/^\d{10}$/) == null) {
      alert("Enter correct 10 digit mobile number");
    } else if (name.match(/^[a-zA-Z]+$/) == null) {
      alert("Enter proper name with only letters!!");
    } else if (
      email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      if (skillName.toString().localeCompare("Customer") == 0) {
        // console.log(skillName.toString().localeCompare("Customer"));
        Axios.post("http://localhost:3001/registerc", {
          name: name,
          password: password,
          email: email,
          date: date,
          phone: phNo,
          skillname: skillName,
          appplied: "Yes",
        }).then((response) => {
          console.log(response);
        });
      } else {
        // console.log(skillName.toString().localeCompare("Customer"));
        Axios.post("http://localhost:3001/registers", {
          name: name,
          password: password,
          email: email,
          date: date,
          phone: phNo,
          skillname: skillName,
          appplied: "Yes",
        }).then((response) => {
          console.log(response);
        });
      }
      alert("Registration Successful Please Login again");
      // this.props.history.push("/");
    } else {
      alert("Enter Proper Email Address");
    }
  };

  render() {
    return this.state.isLoggedIn == false ? (
      <div className="cover">
        <article className="br3 ba b--black-10 mv4 tc w-00 w-50-m w-25-l mw6 shadow-5 center main">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Doctor/Staff SignUp</legend>
                <div className="mt3 center">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="date">
                    Date Of Birth
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                    type="date"
                    name="date"
                    id="data"
                    onChange={this.onDateChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="phoneNo">
                    Mobile-number
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                    type="text"
                    name="phNo"
                    id="phoneNo"
                    onChange={this.onPhChange}
                  />
                </div>

                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Confirm Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onCPasswordChange}
                  />
                </div>
                {/* <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Aadhar Card</label>
                                <input type='file' onChange={this.handleFileChange1} />
                                <button type='button' onClick={this.handleFileUpload1}> Upload </button><br /><br />
                            </div> */}
                <div className="mv3">
                  <FormControl>
                    <InputLabel id="demo-mutiple-checkbox-label">
                      UserType
                    </InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      value={this.state.skillName}
                      onChange={this.onSkillChange}
                      input={<Input />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox
                            checked={this.state.skillName.indexOf(name) > -1}
                          />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.handleSubmit}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
              </div>
              <div>
                <br />
                <input
                  onClick={this.removeDoctor}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Remove a Registered Doctor"
                />
              </div>
            </div>
          </main>
        </article>
      </div>
    ) : (
      <div>
        <input
          // onClick={this.handleSignOut}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="signOut"
        />
      </div>
    );
  }
}

export default withRouter(Registration);
