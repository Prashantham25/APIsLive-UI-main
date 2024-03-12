import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import AutoInsurance from "assets/images/BrokerPortal/AutoInsurance.png";
import TravelInsurance from "assets/images/BrokerPortal/TravelInsurance.png";
import HealthInsurance from "assets/images/BrokerPortal/HealthInsurance.png";
import HomeInsurance from "assets/images/BrokerPortal/HomeInsurance.png";
import Arrow from "assets/images/BrokerPortal/Arrow.png";
import { ProfileData } from "modules/BrokerPortal/Pages/CRM/data";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MDBox from "components/MDBox";
import Table from "@mui/material/Table";
import Radio from "@mui/material/Radio";
import MDInput from "components/MDInput";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import Popover from "@mui/material/Popover";
// import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";

import {
  Autocomplete,
  Stack,
  Grid,
  CircularProgress,
  Modal,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { setCRMData, useDataController } from "../../../../context";
import CRMJson from "../../data/jsonData";

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

function ViewDetails({ handleModalDetailsClose }) {
  return (
    <MDBox sx={{ m: 3 }}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="space-between">
          <MDTypography style={{ fontFamily: "Roboto", fontSize: "24px", fontWeight: "500" }}>
            Car Insurance
          </MDTypography>
          <ClearIcon onClick={handleModalDetailsClose} />
        </Grid>
        {/* <TableContainer component={Paper}> */}
        <Stack justifyContent="space-between" p={2}>
          <Grid container ml={2} width="95%" mt={1}>
            <Table aria-label="simple table" width="95%">
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Quote Number:
                </TableCell>
                <TableCell
                  sx={{
                    // fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  New Business
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Make:
                </TableCell>
                <TableCell
                  sx={{
                    // fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Hyundai
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",

                    fontFamily: "Roboto",
                  }}
                >
                  Model:
                </TableCell>
                <TableCell
                  sx={{
                    // fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Verna
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",

                    fontFamily: "Roboto",
                  }}
                >
                  Variant:
                </TableCell>
                <TableCell
                  sx={{
                    // fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Variant Name
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Fuel Type:
                </TableCell>
                <TableCell
                  sx={{
                    // fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Petrol
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Manufacturing Year:
                </TableCell>
                <TableCell
                  sx={{
                    // fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  2022
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  RTO:
                </TableCell>
                <TableCell
                  sx={{
                    // fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  JP Nagar(KA12)
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
        </Stack>
        {/* </TableContainer> */}
      </Grid>
    </MDBox>
  );
}

function ConfidenceMeter({ handleModalArrowClose }) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalArrowClose} />
        </Grid>
        <FormControl>
          <FormLabel
            id="radiogroup"
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: "600",
              marginLeft: "20rem",
              color: "#000000",
            }}
          >
            Confidence Meter
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="radiogroup"
            name="radiogroup"
            style={{ marginLeft: "20rem", marginTop: "1rem" }}
          >
            <FormControlLabel value="20%" control={<Radio />} label="20%" />
            <FormControlLabel value="30%" control={<Radio />} label="30%" />
            <FormControlLabel value="40%" control={<Radio />} label="40%" />
          </RadioGroup>
        </FormControl>
        <Stack direction="row" justifyContent="space-between" p={1}>
          <MDBox style={{ marginLeft: "20rem", marginTop: "1rem" }}>
            <MDButton
              variant="outlined"
              sx={{
                height: "auto",
                width: "auto",
                borderRadius: "4px",
                color: "white",
                // marginTop: "3rem",
                // marginLeft: "-20rem",
              }}
            >
              Close
            </MDButton>
            <MDButton
              variant="contained"
              sx={{
                height: "auto",
                width: "auto",
                borderRadius: "4px",
                color: "white",
                // marginTop: "-4.5rem",
                marginLeft: "1rem",
              }}
            >
              Change
            </MDButton>
          </MDBox>
        </Stack>
      </Grid>
    </MDBox>
  );
}

function AddNewOpportunity({ handleModalAddClose }) {
  const [, dispatch] = useDataController();

  const [Crminfydto, setCrminfydto] = useState({ ...CRMJson });
  useEffect(async () => {
    setCRMData(dispatch, Crminfydto);
  }, [Crminfydto]);
  const [masterSelection, setMasterSelection] = useState({
    Opportunities: { mID: "", mValue: "" },
  });
  console.log("masterSelection", masterSelection);
  const handleOpportunities = (event, value) => {
    const newValue = { ...masterSelection, Opportunities: value };
    setMasterSelection(newValue);
    if (value.mValue !== "") {
      Crminfydto.ProspectDetailsJson.Opportunity = value.mValue;
      setCrminfydto((prevState) => ({ ...prevState, Crminfydto }));
    }
    // setSubmit(false);
  };
  const { Opportunities } = ProfileData().crmdetails.Masters;
  console.log("Opportunities", Opportunities);
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalAddClose} />
        </Grid>
        <MDTypography
          style={{
            fontFamily: "Roboto",
            fontSize: "18px",
            fontWeight: "600",
            marginLeft: "20rem",
            color: "#000000",
          }}
        >
          Select and add Opportunities
        </MDTypography>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px!important",
            },
            width: 300,
            marginLeft: "18rem",
            marginTop: "1rem",
          }}
          options={Opportunities}
          getOptionLabel={(option) => option.mValue}
          value={masterSelection.Opportunities}
          onChange={handleOpportunities}
          renderInput={(params) => (
            <MDInput {...params} placeholder="Select" label="Opportunities" />
          )}
        />
        <Stack direction="row" justifyContent="space-between" p={1}>
          <MDBox style={{ marginLeft: "20rem", marginTop: "1rem" }}>
            <MDButton
              variant="outlined"
              sx={{
                height: "auto",
                width: "auto",
                borderRadius: "4px",
                color: "white",
                // marginTop: "3rem",
                // marginLeft: "-20rem",
              }}
            >
              Close
            </MDButton>
            <MDButton
              variant="contained"
              sx={{
                height: "auto",
                width: "auto",
                borderRadius: "4px",
                color: "white",
                // marginTop: "-4.5rem",
                marginLeft: "1rem",
              }}
            >
              Add
            </MDButton>
          </MDBox>
        </Stack>
      </Grid>
    </MDBox>
  );
}

function Opportunitiess() {
  const [ViewDeatailsflag, setviewDetailsflag] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const handleModalDetailsOpen = () => {
    setModalOpen(false);
    setModalDetailsOpen(true);
  };
  const viewdetails = () => {
    setviewDetailsflag(!ViewDeatailsflag);
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
  const [modalArrowOpen, setModalArrowOpen] = useState(false);
  const handleModalArrowOpen = () => {
    setModalArrowOpen(true);
  };
  const handleModalArrowClose = () => {
    setModalArrowOpen(false);
  };
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const handleModalAddOpen = () => {
    setModalAddOpen(true);
  };
  const handleModalAddClose = () => {
    setModalAddOpen(false);
  };
  return (
    <div>
      <MDBox maxWidth="100%">
        <MDButton
          variant="contained"
          sx={{
            height: "42px",
            width: "220px",
            borderRadius: "4px",
            color: "white",
            marginTop: "1rem",
            marginLeft: "44rem",
          }}
          startIcon={<AddIcon style={{ color: "white" }} />}
          onClick={handleModalAddOpen}
        >
          Add New Opportunity
        </MDButton>
        <Stack direction="row" justifyContent="space-between" p={2}>
          <Grid container spacing="1rem">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
              <Card
                sx={{
                  ml: "0.5rem",
                  mt: "0.5rem",
                  backgroundColor: "#ADD8E6",
                  width: "auto",
                  height: "280px",
                  borderRadius: "5px",
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox maxWidth="20%">
                      <MDBox
                        component="img"
                        src={AutoInsurance}
                        sx={{ marginTop: "0.1rem", marginLeft: "-11px" }}
                      />
                    </MDBox>
                    <Chip
                      label="Quote"
                      size="small"
                      sx={{
                        backgroundColor: "#2E7D32",
                        marginLeft: "80px",
                        marginTop: "0.1rem",
                      }}
                    />
                  </Stack>
                  <MDTypography
                    style={{ fontSize: "18px", fontWeight: "600", fontFamily: "Roboto" }}
                  >
                    Car Insurance
                  </MDTypography>
                  <MDTypography
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",
                      textDecoration: "underline",
                    }}
                  >
                    OP01CRM0001
                  </MDTypography>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox>
                      <MDBox
                        component="img"
                        src={Arrow}
                        sx={{ cursor: "pointer", marginLeft: "8.5rem" }}
                        onClick={handleModalArrowOpen}
                      />
                      <MDTypography
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          fontFamily: "Roboto",
                          marginLeft: "-7px",
                          marginTop: "-22px",
                        }}
                      >
                        Confidence Meter
                      </MDTypography>
                    </MDBox>
                  </Stack>
                  <MDProgress
                    // progress={progress.progressValue}
                    variant="contained"
                    label
                  />
                  <Stack direction="row" justifyContent="space-between">
                    <MDBox sx={{ ml: "-0.5rem" }}>
                      <MDButton
                        variant="outlined"
                        sx={{
                          height: "35%",
                          width: "45%",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "0.8rem",
                          // marginLeft: "0.4rem",
                        }}
                        onClick={viewdetails}
                      >
                        View Details
                      </MDButton>
                      <MDButton
                        variant="contained"
                        sx={{
                          height: "35%",
                          width: "45%",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "-4.5rem",
                          marginLeft: "5.5rem",
                        }}
                      >
                        Proceed
                      </MDButton>
                    </MDBox>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
              <Card
                sx={{
                  ml: "0.5rem",
                  mt: "0.5rem",
                  backgroundColor: "#ADD8E6",
                  width: "auto",
                  height: "280px",
                  borderRadius: "5px",
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox maxWidth="20%">
                      <MDBox
                        component="img"
                        src={HomeInsurance}
                        sx={{ marginTop: "0.1rem", marginLeft: "-11px" }}
                      />
                    </MDBox>
                    <Chip
                      label="Initial"
                      size="small"
                      sx={{
                        backgroundColor: "#2E7D32",
                        marginLeft: "80px",
                        marginTop: "0.1rem",
                      }}
                    />
                  </Stack>
                  <MDTypography
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      fontFamily: "Roboto",
                      marginTop: "0.5rem",
                    }}
                  >
                    Home Insurance
                  </MDTypography>
                  <MDTypography
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",
                      textDecoration: "underline",
                    }}
                  >
                    OP01CRM0001
                  </MDTypography>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox>
                      <MDBox
                        component="img"
                        src={Arrow}
                        sx={{ cursor: "pointer", marginLeft: "8.5rem" }}
                        onClick={handleModalArrowOpen}
                      />
                      <MDTypography
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          fontFamily: "Roboto",
                          marginLeft: "-7px",
                          marginTop: "-22px",
                        }}
                      >
                        Confidence Meter
                      </MDTypography>
                    </MDBox>
                  </Stack>
                  <MDProgress
                    // progress={progress.progressValue}
                    variant="contained"
                    label
                  />
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox>
                      <MDButton
                        variant="contained"
                        sx={{
                          height: "auto",
                          width: "auto",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "0.2rem",
                          marginLeft: "1.5rem",
                        }}
                      >
                        Proceed
                      </MDButton>
                    </MDBox>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
              <Card
                sx={{
                  ml: "0.5rem",
                  mt: "0.5rem",
                  backgroundColor: "#ADD8E6",
                  width: "auto",
                  height: "280px",
                  borderRadius: "5px",
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                      <MDBox maxWidth="20%">
                        <MDBox
                          component="img"
                          src={HealthInsurance}
                          sx={{ marginTop: "0.1rem", marginLeft: "-11px" }}
                        />
                      </MDBox>
                      <Chip
                        label="Quote"
                        size="small"
                        sx={{
                          backgroundColor: "#2E7D32",
                          marginLeft: "110px",
                          marginTop: "-9rem",
                        }}
                      />
                    </Grid>
                  </Stack>
                  <MDTypography
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      fontFamily: "Roboto",
                      marginTop: "-2rem",
                    }}
                  >
                    Health Insurance
                  </MDTypography>
                  <MDTypography
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",
                      textDecoration: "underline",
                    }}
                  >
                    OP01CRM0001
                  </MDTypography>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox>
                      <MDBox
                        component="img"
                        src={Arrow}
                        sx={{ cursor: "pointer", marginLeft: "8.5rem" }}
                        onClick={handleModalArrowOpen}
                      />
                      <MDTypography
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          fontFamily: "Roboto",
                          marginLeft: "-7px",
                          marginTop: "-22px",
                        }}
                      >
                        Confidence Meter
                      </MDTypography>
                    </MDBox>
                  </Stack>
                  <MDProgress
                    // progress={progress.progressValue}
                    variant="contained"
                    label
                  />
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox sx={{ ml: "-1rem" }}>
                      <MDButton
                        variant="outlined"
                        sx={{
                          height: "35%",
                          width: "45%",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "0.1rem",
                          // marginLeft: "0.2rem",
                        }}
                        onClick={viewdetails}
                      >
                        View Details
                      </MDButton>
                      <MDButton
                        variant="contained"
                        sx={{
                          height: "35%",
                          width: "45%",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "-4.5rem",
                          marginLeft: "5.5rem",
                        }}
                      >
                        Proceed
                      </MDButton>
                    </MDBox>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
              <Card
                sx={{
                  ml: "0.5rem",
                  mt: "0.5rem",
                  backgroundColor: "#ADD8E6",
                  width: "auto",
                  height: "280px",
                  borderRadius: "5px",
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox>
                      <MDBox
                        component="img"
                        src={TravelInsurance}
                        sx={{ marginTop: "0.1rem", marginLeft: "-11px" }}
                      />
                    </MDBox>
                    <Chip
                      label="Quote"
                      size="small"
                      sx={{
                        backgroundColor: "#2E7D32",
                        marginLeft: "55px",
                        marginTop: "0.1rem",
                      }}
                    />
                  </Stack>
                  <MDTypography
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      fontFamily: "Roboto",
                      marginTop: "0.5rem",
                    }}
                  >
                    Travel Insurance
                  </MDTypography>
                  <MDTypography
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",
                      textDecoration: "underline",
                    }}
                  >
                    OP01CRM0001
                  </MDTypography>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox>
                      <MDBox
                        component="img"
                        src={Arrow}
                        sx={{ cursor: "pointer", marginLeft: "8.5rem" }}
                        onClick={handleModalArrowOpen}
                      />
                      <MDTypography
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          fontFamily: "Roboto",
                          marginLeft: "-7px",
                          marginTop: "-22px",
                        }}
                      >
                        Confidence Meter
                      </MDTypography>
                    </MDBox>
                  </Stack>
                  <MDProgress
                    // progress={progress.progressValue}
                    variant="contained"
                    label
                  />
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox sx={{ ml: "-1rem" }}>
                      <MDButton
                        variant="outlined"
                        sx={{
                          height: "35%",
                          width: "45%",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "0.1rem",
                          // marginLeft: "0.2rem",
                        }}
                        onClick={viewdetails}
                      >
                        View Details
                      </MDButton>
                      <MDButton
                        variant="contained"
                        sx={{
                          height: "35%",
                          width: "45%",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "-4.5rem",
                          marginLeft: "5.5rem",
                        }}
                      >
                        Proceed
                      </MDButton>
                    </MDBox>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
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
                    // height: "50% !important",
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
        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalArrowOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ConfidenceMeter
                handleModalArrowClose={handleModalArrowClose}
                handleModalArrowOpen={handleModalArrowOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                setModalArrowOpen={setModalArrowOpen}
              />
            </Modal>
          )}
        </MDBox>
        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalAddOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddNewOpportunity
                handleModalAddClose={handleModalAddClose}
                handleModalAddOpen={handleModalAddOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                setModalAddOpen={setModalAddOpen}
              />
            </Modal>
          )}
        </MDBox>
      </MDBox>
    </div>
  );
}

export default Opportunitiess;
