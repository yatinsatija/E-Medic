import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  useScrollTrigger,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
  Tooltip,
  Divider,
  Drawer,
  Menu,
  MenuItem,
} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import { isMobile, isMobileOnly } from "react-device-detect";
// import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
// import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
// import Link from 'react-dom';

export default function Navbar() {
  const [drawer, setDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const name = localStorage.getItem("name");
  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();
  const hello = () => {
    // localStorage.setItem("isLoggedIn", false);
    localStorage.clear();
    history.push("/");
  };

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "black", marginBottom: "200px" }}
      >
        <Toolbar
          style={{ height: "60px", display: "flex", flexDirection: "row" }}
        >
          <Typography
            variant="h4"
            className="title"
            component="span"
            //align="center"
            style={{ width: "90%", textAlign: "-webkit-right" }}
          >
            WELCOME {name}
          </Typography>
          <span
            style={{
              justifyContent: "center",
              width: isMobile ? "50%" : "80%",
            }}
          >
            {!isMobile && (
              <span style={{ float: "right" }}>
                <Tooltip title="SignIn">
                  <Button
                    color="inherit"
                    variant="outlined"
                    style={{ fontSize: "1.3em", marginRight: "5px" }}
                    // onMouseOver={handleHover}
                    onClick={(e) => hello()}
                    //onMouseOut={() => setAnchorEl(null)}
                  >
                    LOGOUT
                  </Button>
                </Tooltip>
              </span>
            )}
          </span>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
