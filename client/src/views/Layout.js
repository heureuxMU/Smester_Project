import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@mui/material/Avatar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuIcon from "@material-ui/icons/Menu";
import GridViewIcon from "@mui/icons-material/GridView";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddIcon from "@mui/icons-material/Add";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "./../css/Layout.css";
import { useNavigate } from "react-router-dom";
import UserData from "./../components/UserData";
import { checkLoginFromNonLogin } from "./../CONSTANT";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PreviewIcon from "@mui/icons-material/Preview";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ComputerIcon from "@mui/icons-material/Computer";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Admin from "./Admin";
import User from "./User";
import Petrolium from "./Petrolium";
import Mechanic from "./Mechanic";
import Wrecker from "./Wrecker";
const axios = require("axios");
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Layout(props) {
  let navigate = useNavigate();

  useEffect(() => {
    if (checkLoginFromNonLogin()) {
      navigate("/login");
    }
  }, []);

  // set the defaults
  let __init_session = {
    personal: {
      username: "",
      email: "",
      phone: "",
      role: "",
      identity: "",
      createdAt: "",
      _id: "",
    },
    isLoggedIn: false,
  };
  const [data, setData] = useState(__init_session);
  useEffect(() => {
    let sessionData = JSON.parse(sessionStorage.getItem("loggedin"));
    if (sessionData) {
      setData({
        personal: sessionData.data,
        isLoggedIn: true,
      });
    }
  }, []);
  const value = { data, setData };
  const logout = () => {
    sessionStorage.removeItem("loggedin");
    setData(__init_session);
    navigate("/login");
  };
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [openAdminUser, setOpenAdminUser] = React.useState(false);

  const handleClickOfAdminUser = () => {
    setOpenAdminUser(!openAdminUser);
  };

  const [openCommitteeUser, setOpenCommitteeUser] = React.useState(false);

  const handleClickOfCommitteeUser = () => {
    setOpenCommitteeUser(!openCommitteeUser);
  };

  const [openTimetableUser, setOpenTimetableUser] = React.useState(false);

  const handleClickOfTimetableUser = () => {
    setOpenTimetableUser(!openTimetableUser);
  };

  const [openLeaveRequestUser, setOpenLeaveRequestUser] = React.useState(false);

  const handleClickOfLeaveRequestUser = () => {
    setOpenLeaveRequestUser(!openLeaveRequestUser);
  };

  const [openStaffAttendanceUser, setOpenStaffAttendanceUser] =
    React.useState(false);

  const handleClickOfStaffAttendanceUser = () => {
    setOpenStaffAttendanceUser(!openStaffAttendanceUser);
  };

  const [openTeacherUser, setOpenTeacherUser] = React.useState(false);

  const handleClickOfTeacherUser = () => {
    setOpenTeacherUser(!openTeacherUser);
  };

  const [openTeacherAttendanceUser, setOpenTeacherAttendanceUser] =
    React.useState(false);

  const handleClickOfTeacherAttendanceUser = () => {
    setOpenTeacherAttendanceUser(!openTeacherAttendanceUser);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} id="navbar__emailDisplay">
       <h6>Mechanic Locator System</h6>
      </div>
      <Divider />
      <List className="navList">
        {data.personal.role === "admin" ? (
          <>
            <ListItem onClick={handleClickOfAdminUser}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
              {openAdminUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAdminUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link className="text-dark" to="/addUser">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add User" />
                  </ListItem>
                </Link>
                <Link className="text-dark" to="/viewUsers">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <GridViewIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Users" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </>
        ) : data.personal.role === "committee" ? (
          <>
            <ListItem onClick={handleClickOfCommitteeUser}>
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary="Labs" />
              {openCommitteeUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCommitteeUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link className="text-dark" to="/addLab">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Lab" />
                  </ListItem>
                </Link>
                <Link className="text-dark" to="/viewLabs">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <GridViewIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Labs" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <ListItem onClick={handleClickOfTeacherAttendanceUser}>
              <ListItemIcon>
                <PreviewIcon />
              </ListItemIcon>
              <ListItemText primary="Staff Leave Requests" />
              {openTeacherAttendanceUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openTeacherAttendanceUser}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <Link
                  className="text-dark"
                  to="/reviewLeaveRequests?type=committee"
                >
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <DoneAllIcon />
                    </ListItemIcon>
                    <ListItemText primary="Review" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </>
        ) : data.personal.role === "staff" ? (
          <>
            <ListItem onClick={handleClickOfStaffAttendanceUser}>
              <ListItemIcon>
                <BookmarkAddedIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
              {openStaffAttendanceUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openStaffAttendanceUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link className="text-dark" to="/staffAttendance">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mark Attendance" />
                  </ListItem>
                </Link>
                <Link className="text-dark" to="/viewStaffAttendance">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <GridViewIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Attendance" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <ListItem onClick={handleClickOfTimetableUser}>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary="Timetable" />
              {openTimetableUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openTimetableUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link className="text-dark" to="/addTimetable">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Timetable" />
                  </ListItem>
                </Link>
                <Link className="text-dark" to="/viewTimetables">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <GridViewIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Timetables" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <ListItem onClick={handleClickOfTeacherAttendanceUser}>
              <ListItemIcon>
                <PreviewIcon />
              </ListItemIcon>
              <ListItemText primary="Teacher Attendance" />
              {openTeacherAttendanceUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openTeacherAttendanceUser}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <Link className="text-dark" to="/reviewTeacherAttendance">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <DoneAllIcon />
                    </ListItemIcon>
                    <ListItemText primary="Review" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <ListItem onClick={handleClickOfLeaveRequestUser}>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary="Leave Requests" />
              {openLeaveRequestUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openLeaveRequestUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link className="text-dark" to="/addLeaveRequest">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add" />
                  </ListItem>
                </Link>
                <Link className="text-dark" to="/viewLeaveRequests">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <GridViewIcon />
                    </ListItemIcon>
                    <ListItemText primary="View" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </>
        ) : data.personal.role === "teacher" ? (
          <>
            <ListItem onClick={handleClickOfTeacherUser}>
              <ListItemIcon>
                <BookmarkAddedIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
              {openTeacherUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openTeacherUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link className="text-dark" to="/teacherAttendance">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mark Attendance" />
                  </ListItem>
                </Link>
                <Link className="text-dark" to="/viewTeacherAttendance">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <GridViewIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Attendance" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </>
        ) : data.personal.role === "tyres" ? (
          <>
            <ListItem onClick={handleClickOfTeacherAttendanceUser}>
              <ListItemIcon>
                <PreviewIcon />
              </ListItemIcon>
              <ListItemText primary="Staff Leave Requests" />
              {openTeacherAttendanceUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openTeacherAttendanceUser}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <Link className="text-dark" to="/reviewLeaveRequests?type=tyres">
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <DoneAllIcon />
                    </ListItemIcon>
                    <ListItemText primary="Review" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </>
        ) : (
          ""
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <UserData.Provider value={value}>
      <div className="Sidebar__">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap className="text-capitalize">
                {data.personal.role}
              </Typography>

              {data.isLoggedIn ? (
                <span className="profileTabNavbar">
                  <Link to="/profile">
                    <Button color="inherit" onClick={null}>
                      <Avatar
                        src={
                          data.personal.avatar !== ""
                            ? data.personal.avatar
                            : ""
                        }
                      />
                    </Button>
                  </Link>
                  <Button color="inherit" onClick={logout}>
                    Logout
                  </Button>
                </span>
              ) : (
                <Link
                  to="/login"
                  style={{
                    marginRight: "24px",
                  }}
                >
                  <Button color="inherit">Log In</Button>
                </Link>
              )}
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children ? (
              props.children
            ) : data.personal.role === "admin" ? (
              <Admin />
            ) : data.personal.role === "petrolium" ? (
              <Petrolium />
            ) : data.personal.role === "mechanic" ? (
              <Mechanic />
            ) : data.personal.role === "wrecker" ? (
              <Wrecker />
            ) : data.personal.role ==="user" ? (
              <User />
            ) : (
              ""
            )}
          </main>
        </div>
      </div>
    </UserData.Provider>
  );
}
export default Layout;
