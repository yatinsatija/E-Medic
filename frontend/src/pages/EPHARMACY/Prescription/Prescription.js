import React, { Component } from "react";
import "./Prescription.css";
import firebase from "../../../Firebase/Firebase";
import { storage, firestore } from "../../../Firebase/Firebase";
import Axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

var Tesseract = window.Tesseract;

class Prescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      patterns: [],
      documents: [],
      file: null,
      pres: "",
      name: "Vishal",
      success: "button2",
      back: false,
    };
  }

  handleChange = async (event) => {
    // console.log(event.target.files[0]);
    var file = event.target.files[0].name;
    var Extension = file.substring(file.lastIndexOf(".") + 1).toLowerCase();
    if (
      Extension != "gif" &&
      Extension != "png" &&
      Extension != "bmp" &&
      Extension != "jpeg" &&
      Extension != "jpg"
    ) {
      alert("Enter Valid Image File");
    } else {
      if (event.target.files[0]) {
        // console.log(this.state.file)
        var uploads = [];
        for (var key in event.target.files) {
          if (!event.target.files.hasOwnProperty(key)) continue;
          let upload = event.target.files[key];
          uploads.push(URL.createObjectURL(upload));
        }
        await this.setState({
          uploads: uploads,
          file: event.target.files[0],
        });
      } else {
        this.setState({
          uploads: [],
        });
      }
      const { file } = this.state;
      if (!file) {
        alert("Upload image and then click on upload button");
      } else {
        const uploadTask = storage.ref(`${file.name}`).put(file);

        uploadTask.on(
          "state_changed",
          (snapShot) => {
            alert("uploading in progress");
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("")
              .child(file.name)
              .getDownloadURL()
              .then((url) => {
                localStorage.setItem("prescription", url);
                alert("Image_uploaded");
                console.log("image uploaded");
                this.setState({ pres: url }, () => console.log(this.state));
              });
          }
        );
      }
    }
  };
  generateText = async () => {
    let uploads = this.state.uploads;

    for (var i = 0; i < uploads.length; i++) {
      await Tesseract.recognize(uploads[i], {
        lang: "eng",
      })
        .catch((err) => {
          console.error(err);
        })
        .then((result) => {
          // Get Confidence score
          let confidence = result.confidence;

          // Get full output
          let text = result.text;
          localStorage.setItem("pcontent", text);

          // Get codes
          let pattern = /\b\w{10,10}\b/g;
          let patterns = result.text.match(pattern);

          // Update state
          this.setState({
            patterns: this.state.patterns.concat(patterns),
            documents: this.state.documents.concat({
              pattern: patterns,
              text: text,
              confidence: confidence,
              //   success: "button",
            }),
            success: "button",
          });
        });
    }

    const { name, pres, documents, file } = this.state;
    console.log(this.state);
    if (!file) {
      alert("Upload image first");
    } else {
      const userRef = firestore.doc(`prescription/${name}`);
      //const snapShot = await firestore.collection('Users').get();
      console.log(pres);
      const registeredUser = { name, pres, documents };

      try {
        await userRef.set(registeredUser);
        alert("Prescription Uploaded");
        //   if(window.location.port){
        //       window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
        //   }
        //   else{
        //       window.location.assign(`http://${window.location.hostname}/`);
        //   }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    }
    // console.log(this.state.documents)
  };
  goBack = async () => {
    this.setState({
      back: true,
    });
  };

  render() {
    if (this.state.back) {
      return <Redirect to="/checkout" />;
    }
    return (
      <div className="app">
        {/* File uploader */}
        <section className="hero">
          <label className="fileUploaderContainer">
            Click here to upload prescription
            <input
              type="file"
              id="fileUploader"
              onChange={this.handleChange}
              multiple
            />
          </label>

          <div>
            {this.state.uploads.map((value, index) => {
              return <img key={index} src={value} width="100px" />;
            })}
          </div>

          <button onClick={this.generateText} className="button">
            Generate content
          </button>
        </section>

        {/* Results */}
        <section className="results">
          {this.state.documents.map((value, index) => {
            return (
              <div key={index} className="results__result">
                <div className="results__result__image">
                  <img src={this.state.uploads[index]} width="250px" />
                </div>
                <div className="results__result__info">
                  <div className="results__result__info__codes">
                    <small>
                      <strong>Confidence Score:</strong> {value.confidence}
                    </small>
                  </div>
                  <div className="results__result__info__codes">
                    <small>
                      <strong>Pattern Output:</strong>{" "}
                      {value.pattern.map((pattern) => {
                        return pattern + ", ";
                      })}
                    </small>
                  </div>
                  <div className="results__result__info__text">
                    <small>
                      <strong>Full Output:</strong> {value.text}
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <button className={this.state.success} onClick={this.goBack}>
          Back to Checkout
        </button>
      </div>
    );
  }
}

export default Prescription;
