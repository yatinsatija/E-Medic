import React from "react";
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
  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
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
            E-Medic
          </Typography>
          <span
            style={{
              justifyContent: "center",
              width: isMobile ? "50%" : "80%",
            }}
          >
            {!isMobile && (
              <span style={{ float: "right" }}>
                <Tooltip title="Home">
                  <Button
                    color="inherit"
                    variant="outlined"
                    style={{ fontSize: "1.3em", marginRight: "5px" }}
                    onClick={() =>
                      alert(
                        "Designed by VISHAL M(1RV18CS191) and YATIN SATIJA(1RV18CS192)"
                      )
                    }
                  >
                    <HomeOutlinedIcon /> About us
                  </Button>
                </Tooltip>
                <Tooltip title="SignIn">
                  <Button
                    color="inherit"
                    variant="outlined"
                    style={{ fontSize: "1.3em", marginRight: "5px" }}
                    onMouseOver={handleHover}
                    onClick={handleHover}
                    //onMouseOut={() => setAnchorEl(null)}
                  >
                    Login
                  </Button>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "90px",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "90px",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  //onMouseLeave={()=>setAnchorEl(null)}
                  // onMouseOut={()=>setAnchorEl(null)}
                  //onMouseOutCapture={()=>setAnchorEl(null)}
                  onMouseDown={() => setAnchorEl(null)}
                >
                  <div>
                    <MenuItem
                      onClick={() => window.location.assign("/csignin")}
                    >
                      Customer SignIn
                    </MenuItem>
                    <MenuItem
                      onClick={() => window.location.assign("/staffsignin")}
                    >
                      Staff SignIn
                    </MenuItem>
                    <MenuItem
                      onClick={() => window.location.assign("/doctorsignin")}
                    >
                      Doctor SignIn
                    </MenuItem>
                    <MenuItem
                      onClick={() => window.location.assign("/adminsignin")}
                    >
                      ADMIN SignIn
                    </MenuItem>
                    <MenuItem
                      onClick={() => window.location.assign("/register")}
                    >
                      Registration
                    </MenuItem>
                  </div>
                </Menu>
              </span>
            )}
          </span>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
