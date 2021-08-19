import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { firestore } from "../../../Firebase/Firebase";
import { useHistory } from "react-router-dom";
import Axios from "axios";

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

export default function PrescriptionCard(props) {
  const history = useHistory();
  const classes = useStyles();
  const prefersDarkMode = localStorage.getItem("darkMode") === "true";
  let mobile = window.matchMedia("(max-width: 300px)").matches === "true";
  const [open, setOpen] = React.useState(false);
  const [eventDialog, setEventDialog] = React.useState(false);
  const imgLink = props.event.prescription;
  const [bno, setBno] = React.useState();
  //   let user = localStorage.getItem('token');

  //Shows snackbar with message and copies link in '' for user
  const pleasework = () => {
    Axios.get("http://localhost:3001/billnumber").then((response) => {
      // setMedicineList(response.data);
      // console.log(response.data);
      setBno(response.data[0]["MAX(bno)"] + 1);
      // localStorage.setItem("order", response.data[0]["MAX(oid)"] + 1);
      // history.push("/payment");
    });
  };
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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const validateOrder = (oid) => {
    Axios.post("http://localhost:3001/validate", {
      oid: oid,
    }).then((res) => console.log(res));
    // pleasework();

    Axios.post("http://localhost:3001/bill", {
      billId: Math.floor(Math.random() * 1000),
      oid: oid,
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <Card
        className={classes.root}
        onDoubleClick={() => setEventDialog(true)}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: props.event.isval === 0 ? "azure" : " #99ff66",
          cursor: "pointer",
        }}
      >
        <CardHeader
          title={props.event.oid}
          //   subheader={props.event.date}
        />
        {/* <CardMedia
          className={classes.media}
          image="/images/Logo.jpg"
          title="Paella dish"
        /> */}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Prescription
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
        <DialogTitle>{props.event.oid}</DialogTitle>
        <DialogContent>
          <div className={classes.dialog}>
            <div>{props.event.content}</div>
          </div>
        </DialogContent>
        <DialogActions>
          {props.event.isval === 0 ? (
            <Button
              onClick={() => {
                validateOrder(props.event.oid);
                props.event.isval = 1;
                firestore
                  .collection("orders")
                  .doc(props.event.oid)
                  .update({ isval: 1 });
              }}
            >
              Validate
            </Button>
          ) : (
            " "
          )}
          {console.log(props.id)};
          <Button
            onClick={() => {
              openInNewTab(props.event.prescription);
            }}
          >
            Open Prescription Image
          </Button>
          <Button onClick={() => setEventDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
