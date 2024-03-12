import { Grid, Paper } from "@mui/material";

import ProfileImg from "assets/images/bruce-mars.jpg";
import MDTypography from "../../../../../components/MDTypography";
import MDAvatar from "../../../../../components/MDAvatar";
import MDBox from "../../../../../components/MDBox";

export default function ClientSpeak() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h2" textAlign="center">
          Our Clients Speak
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography textAlign="center">
          We have been working with clients around the Country
        </MDTypography>
      </Grid>
      {[1, 2, 3].map(() => (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Paper sx={{ p: 3 }}>
            <MDTypography variant="h5" textAlign="center">
              Efficient Collaborating
            </MDTypography>
            <MDTypography textAlign="center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet
              nibh lectus feugiat nunc sem.
            </MDTypography>
          </Paper>
        </Grid>
      ))}
      {[1, 2, 3].map(() => (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <MDAvatar src={ProfileImg} size="lg" />
          </MDBox>
          <MDTypography
            textAlign="center"
            sx={{ color: "#18191F", fontSize: "1.125rem", fontWeight: "700" }}
          >
            Jane Cooper
          </MDTypography>
          <MDTypography
            textAlign="center"
            sx={{ color: "#474A57", fontSize: "0.87rem", fontWeight: "400" }}
          >
            Software Engineer
          </MDTypography>
        </Grid>
      ))}
    </Grid>
  );
}
