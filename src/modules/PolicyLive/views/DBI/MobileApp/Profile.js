import { useState } from "react";
import { Stack, Grid, Switch, Divider, IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";

function Profile() {
  const [pageName, setPageName] = useState("");

  const onMenuSelect = (n) => {
    setPageName(n);
  };
  return (
    <MDBox>
      {pageName !== "" && (
        <IconButton onClick={() => onMenuSelect("")}>
          <KeyboardBackspaceRoundedIcon />
        </IconButton>
      )}
      {pageName === "" && (
        <Grid container spacing={2} p={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <IconButton onClick={() => onMenuSelect("Profile")}>
              <EditRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Prashanth Reddy - 23</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>riving Experience 8 Years</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="column" spacing={2}>
              <MDButton variant="text" onClick={() => onMenuSelect("ViewUpdateLicense")}>
                View/Update License
              </MDButton>
              <MDButton variant="text" onClick={() => onMenuSelect("Notification")}>
                Notifications
              </MDButton>
              <MDButton variant="text" onClick={() => onMenuSelect("Marketing")}>
                Marketing Preferences
              </MDButton>
              <MDButton variant="text" onClick={() => onMenuSelect("ChangePassword")}>
                Change Password
              </MDButton>
              <MDButton variant="text" onClick={() => onMenuSelect("Logout")}>
                Logout
              </MDButton>
            </Stack>
          </Grid>
        </Grid>
      )}
      {pageName === "Profile" && (
        <Grid container spacing={2} p={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Name</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>DOB</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Mobile</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Email</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Reference Code</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton>Save</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      )}
      {pageName === "ViewUpdateLicense" && (
        <Grid container spacing={2} p={3}>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography>Disable System Notifications</MDTypography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Switch />{" "}
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography>Disable Cover Notifications</MDTypography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Switch />{" "}
          </Grid>
        </Grid>
      )}
      {pageName === "Notification" && (
        <Grid container spacing={2} p={3}>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography>Disable System Notifications</MDTypography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Switch />{" "}
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography>Disable Cover Notifications</MDTypography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Switch />{" "}
          </Grid>
        </Grid>
      )}
      {pageName === "Marketing" && (
        <Grid container spacing={2} p={3}>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography>Marketing Promotions</MDTypography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Switch />
          </Grid>
          <Divider />
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography>App</MDTypography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Switch />
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography>SMS</MDTypography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Switch />
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography>Email</MDTypography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Switch />
          </Grid>
        </Grid>
      )}
      {pageName === "ChangePassword" && (
        <Grid container spacing={2} p={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Prashanth Reddy - 23</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>riving Experience 8 Years</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="column" spacing={2}>
              <MDButton variant="text"> View/Update License</MDButton>
              <MDButton variant="text"> Notifications</MDButton>
              <MDButton variant="text"> Marketing Preferences</MDButton>
              <MDButton variant="text"> Change Password</MDButton>
              <MDButton variant="text">Logout</MDButton>
            </Stack>
          </Grid>
        </Grid>
      )}
      {pageName === "Logout" && (
        <Grid container spacing={2} p={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Prashanth Reddy - 23</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>riving Experience 8 Years</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="column" spacing={2}>
              <MDButton variant="text"> View/Update License</MDButton>
              <MDButton variant="text"> Notifications</MDButton>
              <MDButton variant="text"> Marketing Preferences</MDButton>
              <MDButton variant="text"> Change Password</MDButton>
              <MDButton variant="text">Logout</MDButton>
            </Stack>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default Profile;
