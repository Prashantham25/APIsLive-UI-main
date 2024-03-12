import { useState } from "react";

// react-router-dom components
import { useNavigate, Link } from "react-router-dom";

// @mui material components
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// @mui material components
import Grid from "@mui/material/Grid";

// Images
import bgLoginImage from "assets/images/insurance-agent-near-me-background-image.png";
import mglogo from "assets/images/BrokerPortal/MutualGlobalLogo.png";
import startup from "assets/images/BrokerPortal/startup.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 432,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function PLLoginMobile() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    navigate(`/modules/BrokerPortal/Pages/BPLanding`);
  };

  const routeChange = () => handleOpen();
  return (
    <MDBox
      position="absolute"
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      // component="img"
      // src={bgImage}
      sx={{
        // backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
        //   bgImage &&
        //   `${linearGradient(
        //     rgba(gradients.dark.main, 0.6),
        //     rgba(gradients.dark.state, 0.6)
        //   )}, url(${bgImage})`,
        background: "#FFFFFF",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDBox component="img" src={startup} />
          <MDTypography variant="h6" sx={{ fontSize: "0.75rem", color: "#E56353", mt: "1rem" }}>
            {" "}
            Hello
          </MDTypography>
          <MDTypography variant="h6" sx={{ fontSize: "1.5rem", mt: "1rem" }}>
            {" "}
            Ravichandran Mahalingam
          </MDTypography>
          <MDTypography variant="h6" sx={{ fontSize: "0.75rem", color: "#858585", mt: "1rem" }}>
            {" "}
            Let’s get started!
          </MDTypography>
          <MDButton variant="gradient" color="info" sx={{ mt: "2rem" }} onClick={handleClose}>
            Ok
          </MDButton>
        </MDBox>
      </Modal>
      <MDBox
        minHeight="20rem"
        width="100%"
        sx={{
          backgroundImage: `url(${bgLoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Card
        sx={{
          borderTopLeftRadius: "2.5rem",
          borderTopRightRadius: "2.5rem",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          textAlign: "center",
          background: "white",
          px: 2.5,
          mt: "-2rem",
          boxShadow: "none",
        }}
      >
        <Grid container justifyContent="center" alignContent="center" spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox
              component={Link}
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
              to="/"
              sx={{ mt: "1.75rem" }}
            >
              <MDBox component="img" src={mglogo} sx={{ maxHeight: "2.2rem", maxWidth: "18rem" }} />
              <MDTypography align="center" variant="caption" fontWeight="medium" fontSize="0.7rem">
                INSURANCE BROKING PVT LTD. (REGD NO : 752)
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput label="Mobile No/Email ID" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput label="Password" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton variant="gradient" color="info" onClick={routeChange} fullWidth>
              Login
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ fontSize: "0.75rem", color: "#1976D2", mt: "0" }}>
              Login with Mobile No/Email ID
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ fontSize: "0.75rem", color: "#1976D2", mt: "4rem" }}>
              Forgot Password
            </MDTypography>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}

export default PLLoginMobile;
