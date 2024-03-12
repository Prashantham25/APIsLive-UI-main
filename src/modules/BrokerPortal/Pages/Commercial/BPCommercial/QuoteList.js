import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Modal,
  Stack,
  Autocomplete,
  CircularProgress,
  IconButton,
} from "@mui/material";

import {
  GppGood,
  Error,
  Clear,
  Cancel as CancelIcon,
  KeyboardBackspace,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MDBox from "components/MDBox";
import ShareIcon from "@mui/icons-material/Share";
import PageLayout from "examples/LayoutContainers/PageLayout";
import MDInput from "components/MDInput";
import ClearIcon from "@mui/icons-material/Clear";
import Icon from "@mui/material/Icon";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import MagmaLogo from "assets/images/BrokerPortal/MagmaLogo.png";
import MDButton from "components/MDButton";
import FGLogo from "assets/images/BrokerPortal/FGLogo.png";
import KotakLogo from "assets/images/BrokerPortal/KotakLogo.png";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// const PlanTypeList = [{ label: "Base" }, { label: "1 CR Cover" }, { label: "Top-Up" }];

// const PlanType = [{ label: "Premium High to Low" }, { label: "Premium Low to High" }];

// const label = { inputProps: { "aria-label": "Checkbox demo" } };
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "56rem",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};
function ViewDetails({ handleModalDetailsClose }) {
  return (
    <Card sx={{ backgroundColor: "#006400" }}>
      <Stack direction="row" flexDirection="row">
        <MDTypography
          style={{
            fontFamily: "Roboto",
            fontSize: "15px",
            fontWeight: "500",
            color: "#FFFFFF",
          }}
        >
          <CheckCircleIcon sx={{ ml: "2rem", mt: "1rem" }} />
          Comparision shared Succesfully
        </MDTypography>
        <ClearIcon
          onClick={handleModalDetailsClose}
          sx={{ color: "#FFFFFF", ml: "13rem", mt: "1rem" }}
        />
      </Stack>
    </Card>
  );
}

function ComparePlans() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  // const [ViewDeatailsflag, setviewDetailsflag] = useState(false);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const handleModalDetailsOpen = () => {
    setModalOpen(false);
    setModalDetailsOpen(true);
  };
  // debugger;
  const viewdetails = () => {
    // setviewDetailsflag(!ViewDeatailsflag);
    setModalDetailsOpen(true);
    handleModalOpen();
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalDetailsClose = () => {
    setModalDetailsOpen(false);
    setModalOpen(false);
  };
  // const navigate = useNavigate();
  // const click = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Health/HealthProposal/PlanDetails`);
  // };

  return (
    <div>
      {/* <MDBox> */}
      <MDButton
        variant="success"
        sx={{ background: "#00CA72", color: "#FFFFFF", my: "0.8rem", justifyContent: "end" }}
        onClick={handleOpen}
      >
        Compare Plans
      </MDButton>

      <Modal
        style={{ overflow: "scroll" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox>
          <MDTypography id="modal-modal-description" sx={{ mt: 0 }}>
            <MDBox sx={{ width: "100%", height: "100%", background: "white", p: "1rem" }}>
              <Grid container>
                <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
                  <MDBox display="flex" flexDirection="row">
                    <KeyboardBackspace onClick={handleClose} sx={{ cursor: "pointer" }} />
                    <MDTypography
                      variant="body1"
                      sx={{
                        fontSize: 13,
                        color: "#000000",
                        fontFamily: "Lexend",
                        cursor: "pointer",
                      }}
                      onClick={handleClose}
                    >
                      Back
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                  <MDTypography
                    variant="h6"
                    sx={{
                      fontSize: "2rem",
                      textAlign: "center",
                      color: "#000000",
                      fontFamily: "Lexend",
                      textTransform: "capitalize",
                    }}
                  >
                    Choose the plan that’s right for you.
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
                  <Icon fontSize="medium" sx={{ mt: "1rem", mx: "1rem" }} onClick={handleClose}>
                    close
                  </Icon>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#E4ECF9",
                        borderBottomLeftRadius: "0rem",
                        borderBottomRightRadius: "0rem",
                        borderTopRightRadius: "0rem",
                        boxShadow: "unset",
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                    <Card
                      sx={{
                        height: "7rem",
                        backgroundColor: "#E4ECF9",
                        borderBottomLeftRadius: "0rem",
                        borderBottomRightRadius: "0rem",
                        borderTopRightRadius: "0rem",
                        boxShadow: "unset",
                        width: "fullwidth",
                      }}
                    >
                      <Grid container alignItems="start">
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={2}
                          lg={2}
                          xl={2}
                          xxl={2}
                          sx={{ ml: "1.5rem" }}
                        >
                          <MDAvatar
                            src={KotakLogo}
                            sx={{ mt: "0.5rem", ml: "3rem" }}
                            size="comlogo"
                            variant="square"
                          />
                          <MDTypography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              color: "#000000",
                              fontSize: "12px",
                              mx: "1rem",
                              mt: "0.5rem",
                              fontWeight: 500,
                            }}
                          >
                            Premium: ₹ 2197
                          </MDTypography>
                          <MDButton
                            sx={{ mt: "0.5rem", borderRadius: "1px", ml: "1.7rem" }}
                            onClick={viewdetails}
                          >
                            Share Quote
                          </MDButton>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={2}
                          lg={2}
                          xl={2}
                          xxl={2}
                          sx={{ ml: "1.5rem" }}
                        >
                          <MDAvatar
                            src={FGLogo}
                            sx={{ mt: "0.5rem", ml: "3rem" }}
                            size="comlogo"
                            variant="square"
                          />
                          <MDTypography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              color: "#000000",
                              fontSize: "12px",
                              mx: "1rem",
                              mt: "0.5rem",
                              fontWeight: 500,
                            }}
                          >
                            Premium: ₹ 3341.45
                          </MDTypography>
                          <MDButton
                            sx={{ mt: "0.5rem", borderRadius: "1px", ml: "1.7rem" }}
                            onClick={viewdetails}
                          >
                            Share Quote
                          </MDButton>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={2}
                          lg={2}
                          xl={2}
                          xxl={2}
                          sx={{ ml: "1.5rem" }}
                        >
                          <MDAvatar
                            src={MagmaLogo}
                            sx={{ mt: "0.5rem", ml: "3rem" }}
                            size="comlogo"
                            variant="square"
                          />
                          <MDTypography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              color: "#000000",
                              fontSize: "12px",
                              mx: "1rem",
                              mt: "0.5rem",
                              fontWeight: 500,
                            }}
                          >
                            Premium: ₹ 2332.45
                          </MDTypography>
                          <MDButton
                            sx={{ mt: "0.5rem", borderRadius: "1px", ml: "1.7rem" }}
                            onClick={viewdetails}
                          >
                            Share Quote
                          </MDButton>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={2}
                          lg={2}
                          xl={2}
                          xxl={2}
                          sx={{ ml: "1.5rem" }}
                        >
                          {" "}
                          <MDAvatar
                            src={KotakLogo}
                            sx={{ mt: "0.5rem", ml: "3rem" }}
                            size="comlogo"
                            variant="square"
                          />
                          <MDTypography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              color: "#000000",
                              fontSize: "12px",
                              mx: "1rem",
                              mt: "0.5rem",
                              fontWeight: 500,
                            }}
                          >
                            Premium: ₹ 2197
                          </MDTypography>
                          <MDButton
                            sx={{ mt: "0.5rem", borderRadius: "1px", ml: "1.7rem" }}
                            onClick={viewdetails}
                          >
                            Share Quote
                          </MDButton>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} sx={{ ml: "2rem" }}>
                          <MDAvatar
                            src={FGLogo}
                            sx={{ mt: "0.5rem", ml: "3rem" }}
                            size="comlogo"
                            variant="square"
                          />
                          <MDTypography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              color: "#000000",
                              fontSize: "12px",
                              mx: "1rem",
                              mt: "0.5rem",
                              fontWeight: 500,
                            }}
                          >
                            Premium: ₹ 3341.45
                          </MDTypography>
                          <MDButton
                            sx={{ mt: "0.5rem", borderRadius: "1px", ml: "1.7rem" }}
                            onClick={viewdetails}
                          >
                            Share Quote
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      sx={{
                        backgroundColor: "#E4ECF9",
                        borderRadius: "0rem",
                        height: "100%",
                      }}
                    >
                      <MDBox sx={{ mt: "-6rem" }}>
                        <MDTypography sx={{ color: "black", fontSize: "13px", ml: "1rem" }}>
                          Compare ID: COMP001.1
                        </MDTypography>
                        <MDButton
                          sx={{
                            mt: "0.5rem",
                            borderRadius: "1px",
                            ml: "1rem",
                            fontSize: "10px",
                          }}
                          onClick={viewdetails}
                        >
                          <ShareIcon sx={{ ml: "-1rem" }} />
                          Share Comparision
                        </MDButton>
                      </MDBox>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      sx={{
                        backgroundColor: "#E4ECF9",
                        borderRadius: "0rem",
                        height: "100%",
                      }}
                    >
                      <MDBox sx={{ p: "1rem" }}>
                        <MDTypography sx={{ color: "black", fontSize: "1.25rem" }}>
                          <GppGood sx={{ color: "#0071D9" }} />
                          PlanDetails
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          sum Insured
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Product Name
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Policy Term
                        </MDTypography>
                      </MDBox>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>Rs.40,000</MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        Bharat Graha Raksha
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>3 Years</MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#D3D3D3", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>Rs.40,000</MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        Bharat Graha Raksha
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>3 Years</MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>Rs.40,000</MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        Bharat Graha Raksha
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>3 Years</MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#D3D3D3", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>Rs.40,000</MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        Bharat Graha Raksha
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>3 Years</MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>Rs.40,000</MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        Bharat Graha Raksha
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>3 Years</MDTypography>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      sx={{
                        backgroundColor: "#E4ECF9",
                        borderRadius: "0rem",
                        height: "100%",
                      }}
                    >
                      <MDBox sx={{ p: "1rem" }}>
                        <MDTypography sx={{ color: "black", fontSize: "1.25rem" }}>
                          <GppGood sx={{ color: "#0071D9" }} />
                          Features
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Home Building cover
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Home Content Cover
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Protection from fire and special perils
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Protection from theft
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Terrorism (Structure and/or contents)
                        </MDTypography>
                      </MDBox>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#D3D3D3", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#D3D3D3", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      sx={{
                        backgroundColor: "#E4ECF9",
                        borderRadius: "0rem",
                        height: "100%",
                      }}
                    >
                      <MDBox sx={{ p: "1rem" }}>
                        <MDTypography sx={{ color: "black", fontSize: "1.25rem" }}>
                          <GppGood sx={{ color: "#0071D9" }} />
                          AddOnCover
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Accidental Damage
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Temporary Resettlement Expenses
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Cover for Valuable Contents
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Personal Accident
                        </MDTypography>
                      </MDBox>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#D3D3D3", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#D3D3D3", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      sx={{
                        backgroundColor: "#E4ECF9",
                        borderRadius: "0rem",
                        height: "100%",
                      }}
                    >
                      <MDBox sx={{ p: "1rem" }}>
                        <MDTypography sx={{ color: "black", fontSize: "1.25rem" }}>
                          <GppGood sx={{ color: "#0071D9" }} />
                          Clauses
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Designation of property clause
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Local Authority clause
                        </MDTypography>
                        <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
                          Kutcha construction is not covered
                        </MDTypography>
                      </MDBox>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "6rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#D3D3D3", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "6rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "6rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#D3D3D3", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "6rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CheckCircleIcon sx={{ color: "#006400" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                        textAlign: "center",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", mt: "6rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", mt: "3rem" }}>
                        <CancelIcon sx={{ color: "#FF0000" }} />
                      </MDTypography>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </MDTypography>
        </MDBox>
      </Modal>
      <MDBox>
        {loading ? (
          <Loading />
        ) : (
          ["right"].map((anchor) => (
            <SwipeableDrawer
              anchor={anchor}
              open={modalDetailsOpen}
              // onClose={toggleDrawer}
              onOpen={handleModalOpen}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "40% !important",
                  height: "6.7% !important",
                },
              }}
            >
              <ViewDetails
                handleModalDetailsClose={handleModalDetailsClose}
                handleModalDetailsOpen={handleModalDetailsOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                setModalDetailsOpen={setModalDetailsOpen}
              />
            </SwipeableDrawer>
          ))
        )}
      </MDBox>
      {/* </MDBox> */}
    </div>
  );
}
function Loading() {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <CircularProgress size="10rem" />
    </MDBox>
  );
}
function AddonCovers({ handleModalAddonClose }) {
  const [LOR, setLOR] = useState(false);
  const [RAA, setRAA] = useState(false);
  const [PAC, setPAC] = useState(false);
  const handleCheckBox = (e) => {
    if (e.target.value === "lor") {
      setLOR(true);
    } else {
      setLOR(false);
    }
    if (e.target.value === "raa") {
      setLOR(true);
      setRAA(true);
    } else {
      setRAA(false);
    }
    if (e.target.value === "pac") {
      setLOR(true);
      setRAA(true);
      setPAC(true);
    } else {
      setPAC(false);
    }
  };
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <Clear onClick={handleModalAddonClose} />
        </Grid>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Loss of Rent"
            value="lor"
            onChange={handleCheckBox}
          />
          <IconButton size="small">
            <Error pl={2} sx={{ ml: "150px", mt: "-3rem" }} />
          </IconButton>
          {LOR === true && (
            <Stack direction="row" justifyContent="space-between" sx={{ ml: "15rem" }}>
              <Grid item md={5} lg={5} xl={5} xxl={5}>
                <MDInput placeholder="Enter Sum Insured" label="Sum Insured" />
              </Grid>
              <Grid item md={5} lg={5} xl={5} xxl={5}>
                <MDInput placeholder="Enter No of Months" label="No of Months" />
              </Grid>
            </Stack>
          )}
          <FormControlLabel
            control={<Checkbox />}
            label="Rent of Alternate Accommodation"
            value="raa"
            onChange={handleCheckBox}
            sx={{ ml: "7.6rem" }}
          />
          <IconButton size="small">
            <Error pl={2} sx={{ ml: "420px", mt: "-3rem" }} />
          </IconButton>
          {RAA === true && (
            <Stack direction="row" justifyContent="space-between" sx={{ ml: "15rem" }}>
              <Grid item md={5} lg={5} xl={5} xxl={5}>
                <MDInput placeholder="Enter Sum Insured" label="Sum Insured" />
              </Grid>
              <Grid item md={5} lg={5} xl={5} xxl={5}>
                <MDInput placeholder="Enter No of Months" label="No of Months" />
              </Grid>
            </Stack>
          )}
          <FormControlLabel
            control={<Checkbox />}
            label="Personal Accident Cover"
            value="pac"
            onChange={handleCheckBox}
            sx={{ ml: "4rem" }}
          />
          <IconButton size="small">
            <Error pl={2} sx={{ ml: "300px", mt: "-3rem" }} />
          </IconButton>
          {PAC === true && (
            <Stack direction="row" justifyContent="space-between" sx={{ ml: "15rem" }}>
              <FormControlLabel control={<Checkbox />} label="Self" sx={{ ml: "1rem" }} />
              <FormControlLabel control={<Checkbox />} label="Spouse" />
            </Stack>
          )}
        </FormGroup>
      </Grid>
      <MDButton sx={{ mt: "5rem" }}>Update</MDButton>
    </MDBox>
  );
}
function Hfooter() {
  return (
    <MDBox position="inherit" width="100%" bottom={0} py={2} sx={{ background: "white" }}>
      <Card
        sx={{
          alignItems: "center",
          mt: "0.5rem",
          mr: "1rem",
          borderRadius: "0.75rem",
          border: `0.5px solid rgba(0, 0, 0, 0.5)`,
          background: "#E4ECF9",
          minWidth: "7rem",
        }}
      >
        <Grid>
          <MDTypography variant="h5" sx={{ fontSize: "1rem" }}>
            1/5 Plans Added to compare list
          </MDTypography>
        </Grid>
        <Stack direction="row" flexDirection="row">
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} mx="1">
            <MDBox display="flex" flexDirection="row">
              <MDBox width="100%" display="flex" flexDirection="row" alignItems="center" size="sm">
                <MDBox
                  src={KotakLogo}
                  size="sm"
                  variant="square"
                  component="img"
                  sx={{ ml: "8rem", mt: "2rem", width: "70%" }}
                />
                <CancelIcon sx={{ mt: "1rem", color: "#FF0000" }} />
              </MDBox>

              <MDBox width="100%" display="flex" flexDirection="row" alignItems="center" size="sm">
                <MDBox
                  src={MagmaLogo}
                  size="sm"
                  variant="square"
                  component="img"
                  sx={{ ml: "8rem", mt: "2rem", width: "70%" }}
                />
                <CancelIcon sx={{ mt: "1rem", color: "#FF0000" }} />
              </MDBox>

              <MDBox width="100%" display="flex" flexDirection="row" alignItems="center" size="sm">
                <MDBox
                  src={FGLogo}
                  size="sm"
                  variant="square"
                  component="img"
                  sx={{ ml: "8rem", mt: "2rem", width: "70%" }}
                />
                <CancelIcon sx={{ mt: "1rem", color: "#FF0000" }} />
              </MDBox>

              <MDBox width="100%" display="flex" flexDirection="row" alignItems="center" size="sm">
                <MDBox
                  src={KotakLogo}
                  size="sm"
                  variant="square"
                  component="img"
                  sx={{ ml: "8rem", mt: "2rem", width: "70%" }}
                />
                <CancelIcon sx={{ mt: "1rem", color: "#FF0000" }} />
              </MDBox>

              <MDBox width="100%" display="flex" flexDirection="row" alignItems="center" size="sm">
                <MDBox
                  src={FGLogo}
                  size="sm"
                  variant="square"
                  component="img"
                  sx={{ ml: "8rem", mt: "2rem", width: "70%" }}
                />
                <CancelIcon sx={{ mt: "1rem", color: "#FF0000" }} />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid container sx={{ justifyContent: "end" }}>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} display="flex">
              <ComparePlans />
              <Icon fontSize="medium" sx={{ mt: "1rem", mx: "1rem", cursor: "pointer" }}>
                close
              </Icon>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </MDBox>
  );
}

//   console.log("details", name, details);
//   const navigate = useNavigate();
//   const formatter = new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 2,
//     style: "currency",
//     currency: "INR",
//   });

//   const Premium =
//     details.premiumResult && details.premiumResult.PremiumDetail.TotalPremium
//       ? details.premiumResult.PremiumDetail.TotalPremium
//       : 0;
// const footerVisibility = count === 0 ? "hidden" : "visible";

// const onClick = () => {
//   navigate(`/modules/BrokerPortal/Pages/Health/HealthProposal/index`);
// };
//   const click = () => {
//     navigate(`/modules/BrokerPortal/Pages/Health/HealthProposal/PlanDetails`);
//   };

// function ComparisonStrip({
//   name,
//   image,
//   details,
//   compareList,
//   setCompareList,
//   invalidList,
//   setInvalidList,
// }) {
//   /* eslint eqeqeq: 0 */
//   // const navigate = useNavigate();
//   const exists = compareList.some((v) => v.Name === name);

//   const [open, setOpen] = useState(false);

//   const [checkState, setCheckState] = useState(false);

//   // const [coveredData, setCoveredData] = useState();
//   // const [notCoveredData, setNotCoveredData] = useState();

//   // const [controller, dispatch] = useDataController();
//   // const { getQuoteOutput } = controller;
//   // const { quoteNumber } = getQuoteOutput;
//   const { premiumResult } = details;
//   if (checkState !== exists) {
//     setCheckState(!checkState);
//   }

//   const formatter = new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 2,
//     style: "currency",
//     currency: "INR",
//   });
//   const IDV = details.premiumResult && details.premiumResult.IDV ? details.premiumResult.IDV : 0;
//   const Premium =
//     details.premiumResult && details.premiumResult.FinalPremium
//       ? details.premiumResult.FinalPremium
//       : 0;
//   // console.log("Exists", name, exists, checked);

//   const AddOns =
//     details.premiumResult && details.premiumResult.CoverPremium
//       ? details.premiumResult.CoverPremium.reduce((prev, curr) => {
//           if (curr.Section === "AddOnCovers" && curr.CoverPremium !== 0) {
//             return prev + Number(curr.CoverPremium);
//           }
//           return prev;
//         }, 0)
//       : 0;

//   const contains = invalidList.some((v) => v === image);
//   if (!contains && Premium == 0) {
//     const newValue = [...invalidList, image];
//     setInvalidList(newValue);
//   }

//   const handleOpen = () => {
//     // setCoveredData(null);
//     // setNotCoveredData(null);
//     //  CoveredNotCoveredData(setCoveredData, details.partnerProductCode, "Whats Covered");
//     //  CoveredNotCoveredData(setNotCoveredData, details.partnerProductCode, "Whats Not Covered");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     // navigate(`/modules/BrokerPortal/Pages/CustomerEngage`);
//   };

//   // const handleDelete = () => {
//   //   console.info("You clicked the delete icon.");
//   // };

//   const updateCompareList = ({ target }) => {
//     // console.log("Value", target.checked);
//     const { id, checked } = target;
//     // const checkState = target.checked;
//     const newList =
//       checked === true
//         ? [
//             ...compareList,
//             {
//               Name: id,
//               Image: image,
//               IDV,
//               Premium,
//             },
//           ]
//         : compareList.filter((item) => item.Name !== id);
//     if (newList && newList.length < 6) {
//       setCompareList(newList);
//       setCheckState(!checkState);
//     }
//     // console.log("New List", newList);
//   };
//   return (
//     <MDBox>
//       {Premium != 0 && (
//         <Card
//           sx={{
//             borderRadius: "0.5rem",
//             height: "auto",
//             m: 1,
//             border: "solid",
//             borderWidth: "thin",
//             borderColor: "#3E7BAB",
//             backgroundColor: "#D9E7F2",
//           }}
//         >
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             {/* <ShowPolicyDetails
//               handleClose={handleClose}
//               details={details}
//               coveredData={coveredData}
//               notCoveredData={notCoveredData}
//             /> */}
//           </Modal>
//           <MDBox display="flex" flexDirection="row" alignItems="center">
//             <Grid container my="1rem">
//               <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
//                 <MDBox display="flex" flexDirection="column" alignItems="center">
//                   {/* <Checkbox  color="secondary" onClick={toggleDrawer('bottom',true)}/> */}
//                   <Checkbox
//                     id={name}
//                     // checked={checkState}
//                     // checked={true}
//                     color="secondary"
//                     onChange={updateCompareList}
//                   />
//                   <MDBox>
//                     <MDTypography
//                       variant="body1"
//                       fontWeight="medium"
//                       textAlign="center"
//                       color="info"
//                       sx={{ fontSize: 10 }}
//                     >
//                       Add to compare
//                     </MDTypography>
//                   </MDBox>

//                   <MDTypography
//                     variant="body1"
//                     fontWeight="medium"
//                     textAlign="center"
//                     color="info"
//                     sx={{ fontSize: 10 }}
//                   >
//                     Plan Name
//                   </MDTypography>
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mx="1">
//                 <MDBox width="100%" display="flex" flexDirection="column">
//                   <MDAvatar src={image} size="logo" variant="square" />
//                   {/* <MDTypography variant="body1" sx={{ fontSize: "15", color: "#0071D9" }}>
//                     1 Cashless Garages
//                   </MDTypography> */}
//                   {/* <MDTypography variant="body1" sx={{ fontSize: 15, color:"#0071D9" }}  >
//             Key &amp; Lock Replacement
//             </MDTypography> */}
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
//                 <MDBox width="100%" display="flex" flexDirection="column" ml="1rem">
//                   <MDTypography variant="body1" sx={{ fontSize: "0.875rem" }}>
//                     IDV
//                   </MDTypography>
//                   <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
//                     {formatter.format(IDV)}
//                   </MDTypography>
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                 <MDBox width="100%" display="flex" flexDirection="column" ml="1rem">
//                   <MDTypography variant="body1" sx={{ fontSize: "0.875rem" }}>
//                     Addons
//                   </MDTypography>
//                   {/* <MDTypography variant="body1"  sx={{ fontSize: 20}}  >
//             Zero Dep: ₹2,897
//             </MDTypography> */}
//                   {premiumResult.CoverPremium &&
//                     premiumResult.CoverPremium.map(
//                       (cover) =>
//                         cover.CoverType === "AddOnCover" &&
//                         cover.CoverName &&
//                         cover.CoverPremium !== "0" && (
//                           <MDTypography
//                             variant="body1"
//                             sx={{ fontSize: 16 }}
//                             display="flex"
//                             flexDirection="row"
//                           >
//                             <MDAvatar
//                               src={Tick}
//                               size="xxs"
//                               variant="outlined"
//                               sx={{ mt: 1, mr: 1 }}
//                             />{" "}
//                             {cover.CoverName}
//                           </MDTypography>
//                         )
//                     )}
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={2} lg={1.5} xl={1.5} xxl={1.5}>
//                 <MDBox width="100%" display="flex" flexDirection="column" ml="1rem">
//                   <MDTypography variant="body1" sx={{ fontSize: "0.875rem", color: "#009C45" }}>
//                     Premium
//                   </MDTypography>
//                   <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>
//                     <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>
//                       Base:
//                     </MDTypography>
//                     <MDTypography
//                       variant="body1"
//                       sx={{ width: "100%", fontSize: "1rem" }}
//                       textAlign="right"
//                     >
//                       {formatter.format(Premium)}
//                     </MDTypography>
//                   </MDBox>
//                   <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>
//                     <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>
//                       Addons:
//                     </MDTypography>
//                     <MDTypography
//                       variant="body1"
//                       sx={{ width: "100%", fontSize: "1rem" }}
//                       textAlign="right"
//                     >
//                       {formatter.format(AddOns)}
//                     </MDTypography>
//                   </MDBox>
//                   <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>
//                     <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>
//                       Total:
//                     </MDTypography>
//                     <MDTypography
//                       variant="body1"
//                       sx={{ width: "100%", fontSize: "1rem" }}
//                       textAlign="right"
//                     >
//                       {formatter.format(Premium)}
//                     </MDTypography>
//                   </MDBox>
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
//                 <Grid container alignItems="center">
//                   <MDBox
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                     mx="1rem"
//                     height="100%"
//                   >
//                     {/* <MDTypography variant="h6" sx={{ fontSize: "0.875rem", color: "#009C45" }}>
//                         ₹654 NCB
//                       </MDTypography>
//                       <MDTypography variant="h6" sx={{ fontSize: "0.875rem", color: "#009C45" }}>
//                         Discount Applied
//                       </MDTypography> */}
//                     <MDButton sx={{ fontSize: "0.875rem" }}>Buy</MDButton>
//                     <MDTypography
//                       variant="body1"
//                       sx={{ fontSize: 14, color: "#0071D9", mt: 1 }}
//                       onClick={handleOpen}
//                     >
//                       Policy Details
//                     </MDTypography>
//                   </MDBox>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </MDBox>
//           {/* <Stack direction="row" spacing={1} sx={{ ml: 4, mb: 2 }}>
//             <Autocomplete
//               multiple
//               defaultValue={["Cashless Claims or 24-Hour Reimbursement"]}
//               sx={{ border: 0 }}
//               options={[
//                 "Cashless Claims or 24-Hour Reimbursement",
//                 "Spot Claims Upto Rs. 2Lakhs",
//                 "Zero Paper Claims",
//               ]}
//               // renderTags={(value) => // , getTagProps) =>
//               // renderTags={(value) => value.map((option) => ( // , index) => (
//               renderTags={(value) =>
//                 value.map((option) => (
//                   <Chip
//                     sx={{ fontSize: "0.875rem", mr: 1, backgroundColor: "#FFFFFF", color: "info" }}
//                     color="info"
//                     label={option}
//                     onDelete={handleDelete}
//                     variant="outlined"
//                   />
//                 ))
//               }
//               renderInput={(params) => (
//                 <TextField
//                   sx={{ border: 0 }}
//                   variant="standard"
//                   {...params}
//                   InputProps={{ ...params.InputProps, disableUnderline: true }}
//                   InputLabelProps={{ shrink: true }}
//                 />
//               )}
//             />
//           </Stack> */}
//         </Card>
//       )}
//     </MDBox>
//   );
//   /* eslint eqeqeq: 1 */
// }

// HealthStrip.defaultProps = {
//   name: "",
//   image: {},
//   // compareList: [],
//   // setCompareList: {},
// };

// HealthStrip.propTypes = {
//   name: PropTypes.objectOf(PropTypes.string),
//   image: PropTypes.objectOf(PropTypes.image),
//   // compareList: PropTypes.objectOf(PropTypes.array),
//   // setCompareList: PropTypes.objectOf(PropTypes.func),
// };

function QuoteList() {
  //   const [controller, dispatch] = useDataController();
  //   const data = controller.getQuoteOutput;
  //   const { quickQuoteOutput } = controller;

  //   const [seconds, setSeconds] = useState(0);
  //   const [gotData, setGotData] = useState(false);
  //   const intervalRef = useRef(null);
  //   const startIntervalTask = () => {
  //     intervalRef.current = setInterval(() => {
  //       setSeconds((prevState) => prevState + 1);
  //     }, 5000);
  //   };
  //   const stopIntervalTask = () => {
  //     clearInterval(intervalRef.current);
  //   };

  //   useEffect(() => {
  //     startIntervalTask();
  //     return () => stopIntervalTask();
  //   }, []);

  //   useEffect(() => {
  //     // console.log(seconds);
  //     if (seconds > 12) stopIntervalTask();
  //     if (quickQuoteOutput && quickQuoteOutput && quickQuoteOutput.quoteDetails && !gotData)
  //       GetQuote(dispatch, quickQuoteOutput.quoteDetails.quoteNumber);
  //     if (
  //       data &&
  //       quickQuoteOutput &&
  //       quickQuoteOutput.quoteDetails &&
  //       quickQuoteOutput.quoteDetails.icCount === data.icCount
  //     )
  //       setGotData(true);
  //   }, [seconds]);
  // const [seconds, setSeconds] = useState(0);
  // // const [gotData, setGotData] = useState(false);
  // useEffect(() => {
  //   // console.log(seconds);
  //   if (seconds > 12) stopIntervalTask();
  //   if (quickQuoteOutput && quickQuoteOutput && quickQuoteOutput.quoteDetails && !gotData)
  //     GetQuote(dispatch, quickQuoteOutput.quoteDetails.quoteNumber);
  //   if (
  //     data &&
  //     quickQuoteOutput &&
  //     quickQuoteOutput.quoteDetails &&
  //     quickQuoteOutput.quoteDetails.icCount === data.icCount
  //   )
  //     setGotData(true);
  // }, [seconds]);
  // const intervalRef = useRef(null);
  // const startIntervalTask = () => {
  //   intervalRef.current = setInterval(() => {
  //     setSeconds((prevState) => prevState + 1);
  //   }, 5000);
  // };
  // const stopIntervalTask = () => {
  //   clearInterval(intervalRef.current);
  // };
  // const { AgeofBuilding } = GetBGRMasters().bgrMaster.Masters;

  // const handleAutoComplete = (e, values, name) => {
  //   // debugger;
  //   const { InsurableItem } = CommercialJson;
  //   const { RiskItems } = InsurableItem[0];
  //   const quoteDetails = RiskItems[0];
  //   if (name === "Age of Building") {
  //     quoteDetails[name] = values.mValue;
  //   }
  //   setCommercialJson((prev) => ({ ...prev, InsurableItem }));
  // };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/modules/BrokerPortal/Pages/Commercial/BPCommercial`);
  };
  const handleGotoHome = () => {
    navigate(`/modules/BrokerPortal/Pages/CustomerLanding`);
  };
  const quoteList = async () => {
    // calculatePremium(TravellerInfinityDetails);
    // setcalflag(true);
    // const Data1 = await GenericApi(QuoteDataJson);
    // console.log("priyankaquotelist", Data1);
  };
  // const [quoteList, setquoteList] = useState([]);
  // useEffect(async () => {
  //   await postRequest(
  //     `Product/GenericApi?ProductCode=BGRUSGI02&ApiName=BGRUSGIAPIPremium`,
  //     QuoteDataJson
  //   ).then((res) => {
  //     console.log("1234", res);
  //     console.log("priyanka", setquoteList);
  //   });
  // });
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const [modalAddonOpen, setModalAddonOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalAddonOpen = () => {
    setModalAddonOpen(true);
  };
  const handleModalAddonClose = () => {
    setModalAddonOpen(false);
  };
  const [Addtocompare, setAddtocompare] = useState(false);
  const handleaddtocompare = () => {
    setAddtocompare(true);
  };
  return (
    <PageLayout backgroundColor="#E5E5E5">
      {/* <BPNavbar /> */}

      <MDBox m={4}>
        <MDBox display="flex" flexDirection="row">
          <KeyboardBackspace onClick={handleBack} />
          <MDTypography variant="body1" sx={{ fontSize: 15 }}>
            Back&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID:COMP001.1
          </MDTypography>
          <MDButton
            color="primary"
            variant="contained"
            // onClick={handleBack}
            sx={{ ml: "400px", mt: "-0.5rem" }}
            onClick={quoteList}
          >
            Get QuoteList
          </MDButton>
          <MDButton
            color="primary"
            variant="outlined"
            // onClick={handleBack}
            sx={{ ml: "100px", mt: "-0.5rem" }}
            onClick={handleGotoHome}
          >
            Go To Home
          </MDButton>
        </MDBox>
        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card position="inline" sx={{ borderRadius: "0", mt: "-1rem", ml: "-1rem" }}>
              <MDBox p={2}>
                <Grid container spacing={2} textAlign="center">
                  <Grid item xs={12} sm={12} md={2.3} lg={2.3} xl={2.3} xxl={2.3}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={[]}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderInput={(params) => <MDInput label="Policy Term" {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2.3} lg={2.3} xl={2.3} xxl={2.3}>
                    <Autocomplete
                      options={[]}
                      // getOptionLabel={(option) => option.mValue}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "9px",
                          "& .MuiFormLabel-asterisk": { color: "red" },
                        },
                      }}
                      renderInput={(params) => <MDInput {...params} label="Property Age" />}
                      required
                      name="Age of Building"
                      // value={
                      //   {
                      //     // mValue: CommercialJson.InsurableItem[0].RiskItems[0]["Age of Building"],
                      //   }
                      // }
                      // onChange={(e, values) => handleAutoComplete(e, values, "Age of Building")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={[]}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      // renderOption={(props, option) => <li {...props}>{option.mValue}</li>}
                      renderInput={(params) => (
                        <MDInput label="Add on covers" {...params} onClick={handleModalAddonOpen} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2.3} lg={2.3} xl={2.3} xxl={2.3}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={[]}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {/* {option.mValue} */}
                        </li>
                      )}
                      renderInput={(params) => <MDInput label="Insurers" {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2.3} lg={2.3} xl={2.3} xxl={2.3}>
                    <Autocomplete
                      OptionLabel="Plan Type"
                      options={[]}
                      renderInput={(params) => <MDInput label="sort by" {...params} />}
                    />
                  </Grid>
                </Grid>
              </MDBox>

              <Grid container justifyContent="space-between">
                <MDTypography
                  font-family="Roboto"
                  font-style="normal"
                  font-size="8px"
                  font-weight="100"
                  color="#000000;"
                  //   display="inline-flex"
                  //   m="3"
                  sx={{ mt: "0.75rem" }}
                >
                  <h5>&nbsp;&nbsp;10 Matching Home Insurance Plans &nbsp;&nbsp;</h5>
                </MDTypography>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={2}
                  lg={2}
                  xl={2}
                  xxl={2}
                  //   sx={{ mb: "1.18rem", mr: "1.18rem" }}
                >
                  <MDButton
                    // onClick={OnNext}
                    // disabled={activeStep === steps.length}
                    variant="contained"
                    color="info"
                    sx={{ ml: "3rem" }}
                  >
                    Update
                  </MDButton>
                </Grid>
              </Grid>

              {/* {data &&
                data.quotationDetails &&
                data.quotationDetails.map((quote) => (
                  <HealthStrip
                    name={quote.partnerName}
                    image={images[quote.partnerName]}
                    details={quote}

                    //  compareList={compareList}
                  />
                ))} */}
              {/* <Grid container sx={{ mt: 0 }}>
                <Card
                  sx={{
                    width: "92%",
                    height: "7rem",
                    ml: "3rem",
                    mt: "3rem",
                    mr: "3rem",
                    backgroundColor: "#def2fc",
                  }}
                >
                  <MDBox
                    display="flex"
                    flexDirection="row"
                    alignItems="start"
                    justifyContent="start"
                    sx={{ mx: "2rem" }}
                  >
                    <MDAvatar src={FGLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                    <MDTypography
                      sx={{
                        color: "#00000",
                        fontSize: "17px",
                        ml: "5rem",
                        mt: "1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Plan Name
                      <br />
                      Bharat Griha Raksha
                    </MDTypography>
                    <MDTypography
                      sx={{
                        color: "#00000",
                        fontSize: "17px",
                        ml: "7rem",
                        mt: "1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Policy Term
                      <br />3 Years
                    </MDTypography>
                    <MDTypography
                      sx={{
                        color: "#00000",
                        fontSize: "17px",
                        ml: "7rem",
                        mt: "1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Premium
                      <br />
                      52,787
                    </MDTypography>

                    <Checkbox
                      //   id={"name"}
                      //   checked={""}
                      color="secondary"
                      sx={{ mt: "1.5rem", ml: "3rem" }}
                      onChange={Hfooter}
                      // disabled={disabledflag}
                    />
                    <MDTypography
                      sx={{
                        color: "#00000",
                        fontSize: "17px",
                        //ml: "3rem",
                        mt: "1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Add to compare
                      <br />
                      <MDButton color="primary" variant="outlined">
                        Plan Details
                      </MDButton>
                    </MDTypography>
                  </MDBox>
                </Card>
              </Grid>
              <Grid container sx={{ mt: 0 }}>
                <Card
                  sx={{
                    width: "92%",
                    height: "7rem",
                    ml: "3rem",
                    mt: "3rem",
                    mr: "3rem",
                    backgroundColor: "#def2fc",
                  }}
                >
                  <MDBox
                    display="flex"
                    flexDirection="row"
                    alignItems="start"
                    justifyContent="start"
                    sx={{ mx: "2rem" }}
                  >
                    <MDAvatar src={FGLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                    <MDTypography
                      sx={{
                        color: "#00000",
                        fontSize: "17px",
                        ml: "5rem",
                        mt: "1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Plan Name
                      <br />
                      Bharat Griha Raksha
                    </MDTypography>
                    <MDTypography
                      sx={{
                        color: "#00000",
                        fontSize: "17px",
                        ml: "7rem",
                        mt: "1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Policy Term
                      <br />3 Years
                    </MDTypography>
                    <MDTypography
                      sx={{
                        color: "#00000",
                        fontSize: "17px",
                        ml: "7rem",
                        mt: "1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Premium
                      <br />
                      52,787
                    </MDTypography>

                    <Checkbox
                      //   id={"name"}
                      //   checked={""}
                      color="secondary"
                      sx={{ mt: "1.5rem", ml: "3rem" }}
                      onChange={Hfooter}
                      // disabled={disabledflag}
                    />
                    <MDTypography
                      sx={{
                        color: "#00000",
                        fontSize: "17px",
                        //ml: "3rem",
                        mt: "1.5rem",
                        fontWeight: "500",
                      }}
                    >
                      Add to compare
                      <br />
                      <MDButton color="primary" variant="outlined">
                        Plan Details
                      </MDButton>
                    </MDTypography>
                  </MDBox>
                </Card>
              </Grid> */}
              <div>
                {/* <HealthStrip /> */}
                <MDBox>
                  <Card
                    style={{ backgroundColor: "#ECF3F8" }}
                    sx={{
                      borderRadius: "0.5rem",
                      height: "auto",
                      m: 0,
                      border: "solid",
                      borderWidth: "thin",
                      borderColor: "#3E7BAB",
                      justifyContent: "center",
                      alignItems: "center",
                      ml: 2,
                      mr: 2,
                      mt: 3,
                    }}
                    backgroundColor="#E5E5E5"
                  >
                    <Grid container spacing={3} textAlign="center">
                      <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
                        <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mx="1">
                          <MDBox
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            size="sm"
                          >
                            <MDBox
                              src={KotakLogo}
                              size="sm"
                              variant="square"
                              component="img"
                              sx={{ ml: "8rem", mt: "2rem" }}
                            />
                          </MDBox>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Plan Name
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>Bharat Griha</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Policy Term
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>1 Year</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Add-ons
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="10px"
                          font-family="Roboto"
                          lineHeight="17px"
                          top="500px"
                        >
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Premium
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          {/* {formatter.format(Premium)} */}
                        </MDBox>

                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>52,987</strong>
                        </MDBox>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        xl={2}
                        xxl={2}
                        sx={{ textAlign: "center", alignSelf: "center" }}
                      >
                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                          <MDBox>
                            <MDTypography
                              display="flex"
                              flexDirection="row"
                              // variant="body1"
                              // fontWeight="medium"
                              // justifyContent="center"
                              // textAlign="center"
                              color="#00000"
                              sx={{ fontSize: 15 }}
                            >
                              <Checkbox
                                // checked={checkState}
                                // checked={true}
                                color="secondary"
                                onClick={handleaddtocompare}
                              />
                              Add to compare
                            </MDTypography>
                          </MDBox>
                        </Grid>
                        {/* <BasicModal /> */}
                        <Grid mt={1}>
                          <MDButton variant="outlined" color="info" fullwidth onClick="{click}">
                            Plan Details
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                  <Card
                    style={{ backgroundColor: "#ECF3F8" }}
                    sx={{
                      borderRadius: "0.5rem",
                      height: "auto",
                      m: 0,
                      border: "solid",
                      borderWidth: "thin",
                      borderColor: "#3E7BAB",
                      justifyContent: "center",
                      alignItems: "center",
                      ml: 2,
                      mr: 2,
                      mt: 3,
                    }}
                    backgroundColor="#E5E5E5"
                  >
                    <Grid container spacing={3} textAlign="center">
                      <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
                        <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mx="1">
                          <MDBox
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            size="sm"
                          >
                            <MDBox
                              src={MagmaLogo}
                              size="sm"
                              variant="square"
                              component="img"
                              sx={{ ml: "8rem", mt: "2rem" }}
                            />
                          </MDBox>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Plan Name
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>Bharat Griha</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Policy Term
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>2 Year</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Add-ons
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="10px"
                          font-family="Roboto"
                          lineHeight="17px"
                          top="500px"
                        >
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Premium
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          {/* {formatter.format(Premium)} */}
                        </MDBox>

                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>1,52,987</strong>
                        </MDBox>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        xl={2}
                        xxl={2}
                        sx={{ textAlign: "center", alignSelf: "center" }}
                      >
                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                          <MDBox>
                            <MDTypography
                              display="flex"
                              flexDirection="row"
                              // variant="body1"
                              // fontWeight="medium"
                              // justifyContent="center"
                              // textAlign="center"
                              color="#00000"
                              sx={{ fontSize: 15 }}
                            >
                              <Checkbox
                                // checked={checkState}
                                // checked={true}
                                color="secondary"
                                onClick={handleaddtocompare}
                              />
                              Add to compare
                            </MDTypography>
                          </MDBox>
                        </Grid>
                        {/* <BasicModal /> */}
                        <Grid mt={1}>
                          <MDButton variant="outlined" color="info" fullwidth onClick="{click}">
                            Plan Details
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                  <Card
                    style={{ backgroundColor: "#ECF3F8" }}
                    sx={{
                      borderRadius: "0.5rem",
                      height: "auto",
                      m: 0,
                      border: "solid",
                      borderWidth: "thin",
                      borderColor: "#3E7BAB",
                      justifyContent: "center",
                      alignItems: "center",
                      ml: 2,
                      mr: 2,
                      mt: 3,
                    }}
                    backgroundColor="#E5E5E5"
                  >
                    <Grid container spacing={3} textAlign="center">
                      <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
                        <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mx="1">
                          <MDBox
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            size="sm"
                          >
                            <MDBox
                              src={FGLogo}
                              size="sm"
                              variant="square"
                              component="img"
                              sx={{ ml: "8rem", mt: "2rem" }}
                            />
                          </MDBox>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Plan Name
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>Bharat Griha</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Policy Term
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>2 Year</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Add-ons
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="10px"
                          font-family="Roboto"
                          lineHeight="17px"
                          top="500px"
                        >
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Premium
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          {/* {formatter.format(Premium)} */}
                        </MDBox>

                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>1,52,987</strong>
                        </MDBox>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        xl={2}
                        xxl={2}
                        sx={{ textAlign: "center", alignSelf: "center" }}
                      >
                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                          <MDBox>
                            <MDTypography
                              display="flex"
                              flexDirection="row"
                              // variant="body1"
                              // fontWeight="medium"
                              // justifyContent="center"
                              // textAlign="center"
                              color="#00000"
                              sx={{ fontSize: 15 }}
                            >
                              <Checkbox
                                // checked={checkState}
                                // checked={true}
                                color="secondary"
                                onClick={handleaddtocompare}
                              />
                              Add to compare
                            </MDTypography>
                          </MDBox>
                        </Grid>
                        {/* <BasicModal /> */}
                        <Grid mt={1}>
                          <MDButton variant="outlined" color="info" fullwidth onClick="{click}">
                            Plan Details
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                  <Card
                    style={{ backgroundColor: "#ECF3F8" }}
                    sx={{
                      borderRadius: "0.5rem",
                      height: "auto",
                      m: 0,
                      border: "solid",
                      borderWidth: "thin",
                      borderColor: "#3E7BAB",
                      justifyContent: "center",
                      alignItems: "center",
                      ml: 2,
                      mr: 2,
                      mt: 3,
                    }}
                    backgroundColor="#E5E5E5"
                  >
                    <Grid container spacing={3} textAlign="center">
                      <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
                        <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mx="1">
                          <MDBox
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            size="sm"
                          >
                            <MDBox
                              src={KotakLogo}
                              size="sm"
                              variant="square"
                              component="img"
                              sx={{ ml: "8rem", mt: "2rem" }}
                            />
                          </MDBox>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Plan Name
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>Bharat Griha</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Policy Term
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>1 Year</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Add-ons
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="10px"
                          font-family="Roboto"
                          lineHeight="17px"
                          top="500px"
                        >
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Premium
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          {/* {formatter.format(Premium)} */}
                        </MDBox>

                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>52,987</strong>
                        </MDBox>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        xl={2}
                        xxl={2}
                        sx={{ textAlign: "center", alignSelf: "center" }}
                      >
                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                          <MDBox>
                            <MDTypography
                              display="flex"
                              flexDirection="row"
                              // variant="body1"
                              // fontWeight="medium"
                              // justifyContent="center"
                              // textAlign="center"
                              color="#00000"
                              sx={{ fontSize: 15 }}
                            >
                              <Checkbox
                                // checked={checkState}
                                // checked={true}
                                color="secondary"
                                onClick={handleaddtocompare}
                              />
                              Add to compare
                            </MDTypography>
                          </MDBox>
                        </Grid>
                        {/* <BasicModal /> */}
                        <Grid mt={1}>
                          <MDButton variant="outlined" color="info" fullwidth onClick="{click}">
                            Plan Details
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                  <Card
                    style={{ backgroundColor: "#ECF3F8" }}
                    sx={{
                      borderRadius: "0.5rem",
                      height: "auto",
                      m: 0,
                      border: "solid",
                      borderWidth: "thin",
                      borderColor: "#3E7BAB",
                      justifyContent: "center",
                      alignItems: "center",
                      ml: 2,
                      mr: 2,
                      mt: 3,
                    }}
                    backgroundColor="#E5E5E5"
                  >
                    <Grid container spacing={3} textAlign="center">
                      <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
                        <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mx="1">
                          <MDBox
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            size="sm"
                          >
                            <MDBox
                              src={FGLogo}
                              size="sm"
                              variant="square"
                              component="img"
                              sx={{ ml: "8rem", mt: "2rem" }}
                            />
                          </MDBox>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Plan Name
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>Bharat Griha</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Policy Term
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>2 Year</strong>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Add-ons
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="10px"
                          font-family="Roboto"
                          lineHeight="17px"
                          top="500px"
                        >
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                          <br />
                          Name of the Addon
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDBox
                          sx={{
                            height: "auto",
                            m: 1,

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          Premium
                        </MDBox>
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          {/* {formatter.format(Premium)} */}
                        </MDBox>

                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="18px"
                          font-family="Roboto"
                          lineHeight="34px"
                          top="500px"
                        >
                          <strong>1,52,987</strong>
                        </MDBox>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        xl={2}
                        xxl={2}
                        sx={{ textAlign: "center", alignSelf: "center" }}
                      >
                        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                          <MDBox>
                            <MDTypography
                              display="flex"
                              flexDirection="row"
                              // variant="body1"
                              // fontWeight="medium"
                              // justifyContent="center"
                              // textAlign="center"
                              color="#00000"
                              sx={{ fontSize: 15 }}
                            >
                              <Checkbox
                                // checked={checkState}
                                // checked={true}
                                color="secondary"
                                onClick={handleaddtocompare}
                              />
                              Add to compare
                            </MDTypography>
                          </MDBox>
                        </Grid>
                        {/* <BasicModal /> */}
                        <Grid mt={1}>
                          <MDButton variant="outlined" color="info" fullwidth onClick="{click}">
                            Plan Details
                          </MDButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </MDBox>
                <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
                  <Card
                    sx={{
                      borderRadius: "0.5rem",
                      height: "auto",
                      m: 5,
                      border: "solid",
                      borderWidth: "thin",
                      borderColor: "#3E7BAB",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MDTypography
                      variant="body1"
                      sx={{ fontSize: "0.875rem", textAlign: "center" }}
                    >
                      Oops we have not received the quote from the below companies
                    </MDTypography>
                    <MDBox
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ mx: "2rem" }}
                    >
                      <MDAvatar src={FGLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      <MDAvatar src={MagmaLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      <MDAvatar src={KotakLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      {/* <MDAvatar src={MagmaLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} /> */}
                    </MDBox>
                  </Card>
                </Card>
              </div>
            </Card>
          </Grid>
        </Grid>
        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalAddonOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddonCovers
                handleModalAddonClose={handleModalAddonClose}
                handleModalAddonOpen={handleModalAddonOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                setModalAddonOpen={setModalAddonOpen}
              />
            </Modal>
          )}
        </MDBox>
      </MDBox>
      {Addtocompare === true && <Hfooter />}
    </PageLayout>
  );
}

export default QuoteList;
