import React, { useState } from "react";
import {
  Accordion,
  Box,
  Grid,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";

function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    // const notification = new Notification("Hi there!");
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission();
    Notification("INube", { body: "Thanks for visiting INube.com" });
    // .then((permission) => {
    //   // If the user accepts, let's create a notification
    //   if (permission === "granted") {
    //     const notification = new Notification("Hi there!");
    //     // …

    //   }
    // });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

function PWA() {
  const [obj, setObj] = useState({ body: "", heading: "" });
  //   const [status, setStatus] = useState("!------");
  const onChanger = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const onSendNotification = () => {
    console.log(1);
  };

  const onGetPermissions = async () => {
    notifyMe();
  };

  return (
    <Box>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{
          boxShadow: "unset",
          border: "unset",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary>
          <Typography variant="body" color="primary">
            Home
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Typography variant="body" color="primary">
                {status}
              </Typography>
            </Grid> */}

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Heading" name="heading" value={obj.heading} onChange={onChanger} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="body" name="body" value={obj.body} onChange={onChanger} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={onSendNotification}>Send Notification</MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={onGetPermissions}>Get Permission</MDButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default PWA;
