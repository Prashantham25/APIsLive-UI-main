import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";

export default function MDSpeedDial() {
  const [actions, setActions] = useState([
    { icon: <ChatIcon />, name: "Chat" },
    { icon: <FavoriteIcon />, name: "Like" },
    { icon: <ShareIcon />, name: "Share" },
  ]);
  const [chatFlag, setChatFlag] = useState(false);
  const fullScreen = useMediaQuery("(min-width:600px)");
  const style = fullScreen
    ? { width: "450px", height: "450px" }
    : { width: "250px", height: "250px" };
  useEffect(() => {
    if (process.env.REACT_APP_EnableCobrowsering === "true")
      setActions([...actions, { icon: <AccessibilityIcon />, name: "Co-Browser Help" }]);
  }, []);
  const CobrowseComponent = () => {
    const script = document.createElement("script");
    script.src = "https://js.cobrowse.io/CobrowseIO.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.CobrowseIO.license = process.env.REACT_APP_CobrowseringId;
      window.CobrowseIO.client().then(() => {
        window.CobrowseIO.customData = {
          user_id: uuidv4(),
          // user_name: "<your_user_name>",
          // user_email: "<your_user_email>",
          // device_id: "<your_device_id>",
          // device_name: "<your_device_name>",
        };
        window.CobrowseIO.start();
      });
    };
  };

  const handleChange = (name) => {
    if (name === "Chat") {
      setChatFlag(true);
    } else if (name === "Co-Browser Help") {
      if (process.env.REACT_APP_EnableCobrowsering === "true") {
        CobrowseComponent();
      }
    }
  };

  const handleClose = () => {
    setChatFlag(false);
  };
  return (
    // <Box sx={{ height: 450, transform: "translateZ(0px)", flexGrow: 1 }}>
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 169, right: 18 }}
        icon={<SpeedDialIcon sx={{ fontSize: "large" }} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            sx={{ fontSize: "larger" }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleChange(action.name)}
          />
        ))}
      </SpeedDial>
      <Dialog open={chatFlag} onClose={handleClose}>
        {/* <DialogTitle id="alert-dialog-title"> */}
        <AppBar position="static" sx={{ "background-color": "navy" }}>
          <Toolbar>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ color: "white" }}
            >
              Ask Me
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
        {/* </DialogTitle> */}
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.

          </DialogContentText> */}
          <List>
            <Box style={style}>
              <iframe
                style={style}
                id="chatbot"
                title="myframe"
                // src="https://www.w3schools.com/js/default.asp"
                src="https://webchat.botframework.com/embed/MicaChatBot?s=s98tegqy5Yo.OdtH__YIQR5e483G8KiYuMJDUv6Ag_LXCaNB9DMwGoo"
                // src="https://webchat.botframework.com/embed/MICA-chatBot?s=y2lh2_3nHk8.wxfDwSUAlLJ0ufdx-yCuT_Eg7r0uKju14H-EtpHPnaA"
              />
            </Box>
          </List>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
