import React, { useState } from "react";
import { Grid, Divider, CircularProgress, Autocomplete } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import MuiAlert from "@mui/material/Alert";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";

import SideMenuBar from "./SideMenu";
import breakpoints from "../../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

// const style = {
//   // position: "absolute",
//   // top: "50%",
//   // left: "75%",
//   transform: "translate(-50%, -50%)",
//   // width: "50%",
//   // bgcolor: "background.paper",
//   height: "100vh",
//   // // border: '2px solid #000',
//   // boxShadow: 24,
//   borderRadius: "1rem",
//   // textAlign: "flex-end",
//   p: 4,
// };

function createData(Name, Relation, DOB, Mobile, Age, Action) {
  return { Name, Relation, DOB, Mobile, Age, Action };
}

const rows = [
  createData("Ram Mohan J", "Father", "24/05/2000", "8904505965", "32yrs"),
  createData("Shanthi Kumari M", "Mother", "27/12/1973", "7406443305", "28yrs"),
  createData("Pritam Kumar K", "Sister", "05/02/2000", "9457204783", "30yrs"),
  createData("Madhuri M", "Spouse", "05/01/1994", "7204439103", "24yrs"),
];

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

function ADDMember({
  handleModalMemberClose,
  // handleModalMemberOpen,
  // handleModalOpen,
  // handleModalClose,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <MDBox sx={{ m: 3 }}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="space-between">
          <MDTypography sx={{ color: "#0071D9" }}>Add New Family Member</MDTypography>
          <ClearIcon onClick={handleModalMemberClose} />
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="firstName" label="First Name" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="lastName" label="Last Name" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="MiddleName" label="Middle Name" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="MoblieNo" label="Mobile Number" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Autocomplete
              id="Gender"
              options={[]}
              // value={}}
              getOptionLabel={(option) => option.mValue}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              // onChange={(event, values) => handleSetAutoComplete(event, "", values)}
              renderInput={(params) => (
                <MDInput
                  label="Gender"
                  // required
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="EmailId" label="EmailId" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            {/* <MDInput name="RelationShip" label="RelationShip" /> */}
            <Autocomplete
              id="RelationShip"
              options={[]}
              // value={}}
              getOptionLabel={(option) => option.mValue}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              // onChange={(event, values) => handleSetAutoComplete(event, "", values)}
              renderInput={(params) => (
                <MDInput
                  label="RelationShip"
                  // required
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="AlternateNo" label="Alternate Mobile Number" />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <MDTypography
              variant="body1"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#000000",
                fontSize: "1rem",
              }}
              // onClick={handleModalClose}
            >
              Reset
            </MDTypography>
          </Grid>
          <Grid item>
            <MDButton onClick={handleClick}>ADD</MDButton>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              sx={{ ml: "52rem", mb: "35rem" }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%", backgroundColor: "#196e03", color: "#ffffff" }}
              >
                Family Member Details Updated Successfully!!
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function FamilyDetails() {
  const [Addmemberflag, setmemberflag] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const [modalMemberOpen, setModalMemberOpen] = useState(false);
  const handleModalMemberOpen = () => {
    setModalOpen(false);
    setModalMemberOpen(true);
  };
  const AddMember = () => {
    setmemberflag(!Addmemberflag);
    setModalMemberOpen(true);
    handleModalOpen();
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalMemberClose = () => {
    setModalMemberOpen(false);
    setModalOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  return (
    <MDBox>
      <Grid container>
        <Grid item md={2} l={2}>
          <SideMenuBar selectedMenuItem="Family" />
        </Grid>
        {window.innerWidth > breakpoints.values.md && (
          <Grid item md={0.5} l={1}>
            <Divider
              orientation="vertical"
              flexItem
              style={{
                alignSelf: "auto",
                backgroundColor: "#36454F",
                height: "50rem",
                margin: "3.5rem",
                width: "0.25rem",
              }}
            />
          </Grid>
        )}
        <Grid item md={9.5} mt={8}>
          <MDBox mt={3} width="95%" ml="2rem">
            <TableContainer component={Paper}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                display="flex"
                flexDirection="row"
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={9.5}
                  lg={9.5}
                  xl={9.5}
                  xxl={9.5}
                  spacing={9.5}
                  display="flex"
                >
                  <MDTypography sx={{ fontfamily: "Roboto", color: "#0071D9" }} pl={3} pt={3}>
                    <h4>My Family</h4>
                  </MDTypography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={2.5}
                  lg={2.5}
                  xl={2.5}
                  xxl={2.5}
                  display="flex"
                  pt={2}
                >
                  <MDButton
                    variant="outlined"
                    sx={{
                      height: "42px",
                      width: "170px",
                      borderRadius: "4px",
                      color: "blue",
                    }}
                    startIcon={<AddIcon style={{ color: "blue" }} />}
                    onClick={AddMember}
                  >
                    ADD MEMBER
                  </MDButton>
                </Grid>
              </Grid>
              <Grid container ml={3} width="90%">
                <Table aria-label="simple table" sx={{ width: "100%" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Name of the Person</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Relation</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>DOB</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Mobile_No</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                  <TableBody>
                    {rows?.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          {row.Name}
                        </TableCell>
                        <TableCell>{row.Relation}</TableCell>
                        <TableCell>{row.DOB}</TableCell>
                        <TableCell>{row.Mobile}</TableCell>
                        <TableCell>{row.Age}</TableCell>
                        <TableCell>
                          <MoreHorizIcon onClick={handleClick} sx={{ ml: "12px" }} />
                          <Popover
                            // id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <MDTypography sx={{ backgroundColor: "#ffffff" }}>Edit</MDTypography>
                            <MDTypography sx={{ backgroundColor: "#ffffff" }}>Delete</MDTypography>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </TableContainer>
          </MDBox>
        </Grid>
      </Grid>
      <MDBox>
        {/* {loading ? (
          <Loading />
        ) : (
          <Modal
            open={modalMemberOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ADDMember
              handleModalMemberClose={handleModalMemberClose}
              handleModalMemberOpen={handleModalMemberOpen}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}
              setModalEmailOpen={setModalMemberOpen}
            />
          </Modal>
        )} */}
        {loading ? (
          <Loading />
        ) : (
          ["right"].map((anchor) => (
            <SwipeableDrawer
              anchor={anchor}
              open={modalMemberOpen}
              // onClose={toggleDrawer}
              onOpen={handleModalOpen}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "40% !important",
                  // height: "50% !important",
                },
              }}
            >
              <ADDMember
                handleModalMemberClose={handleModalMemberClose}
                handleModalMemberOpen={handleModalMemberOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                setModalEmailOpen={setModalMemberOpen}
              />
            </SwipeableDrawer>
          ))
        )}
      </MDBox>
    </MDBox>
  );
}

export default FamilyDetails;
