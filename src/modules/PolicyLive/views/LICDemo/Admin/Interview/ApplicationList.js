import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import {
  Chip,
  // Stack,
  Grid,
  TablePagination,
  IconButton,
  InputAdornment,
  Card,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import TableBody from "@mui/material/TableBody";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getRequest } from "core/clients/axiosclient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TotalInterview from "assets/images/BrokerPortal/TotalInterview.svg";
import PendingInterview from "assets/images/BrokerPortal/PendingInterview.svg";
import QualifiedInterview from "assets/images/BrokerPortal/QualifiedInterview.svg";
import CancelledInterview from "assets/images/BrokerPortal/CancelledInterview.svg";
import Submit from "assets/images/BrokerPortal/Submitted.png";
import MDAvatar from "components/MDAvatar";
// import { blue } from "@mui/material/colors";
// import { createTheme, ThemeProvider, styled  } from "@mui/material/styles";
// import AdminData from "./data/index";
import StatusDatabind from "./data/StatusDatabind";
import {
  setAppReviewResponse,
  useDataController,
  setPOSPDetails1,
  setInterviewStatus,
} from "../../../context";
import { ViewFiles } from "../../MyProfile/data/index";
import { postRequest } from "../../../../../core/clients/axiosclient";

// const Status = [{ label: "All" }, { label: "Qualified" }];
function Color({ Status }) {
  // console.log("aaaaa", appsNo);
  if (Status === "Finished & Qualified") {
    return (
      <TableCell>
        <Chip label={Status} style={{ backgroundColor: "#006400", color: "#ffffff" }} />
      </TableCell>
    );
  }
  if (Status === "Finished & Rejected") {
    return (
      <TableCell>
        <Chip label={Status} style={{ backgroundColor: "#b22222", color: "#ffffff" }} />
      </TableCell>
    );
  }
  if (Status === "Pending") {
    return (
      <TableCell>
        <Chip label={Status} style={{ backgroundColor: "#ED6C02", color: "#ffffff" }} />
      </TableCell>
    );
  }
  return <Chip label="" style={{ backgroundColor: "#ED6C02", color: "#ffffff" }} />;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "47rem",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function ApplicationList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [appsNo, setAppsNo] = useState([]);
  const [appsNo1, setAppsNo1] = useState([]);

  const navigate = useNavigate();
  const [controller, dispatch] = useDataController();
  const { SalesLoginResponse } = controller;
  console.log("Sales_Login", SalesLoginResponse);
  // const FetchPOSPDetails = async (appNo) => {
  //   await getRequest(`Partner/GetPOSPDetails?ApplicationNo=${appNo}`).then((result) => {
  //     console.log("data2 -->", result.data[0]);
  //     setAppReviewResponse(dispatch, result.data[0]);

  //     setPOSPDetails1(dispatch, JSON.stringify(result.data[0]));
  //     const Img = result.data[0].pospdetailsJson.RawImage;
  //     ViewFiles(Img).then((result1) => {
  //       if (result1.data !== "") {
  //         localStorage.setItem("ProfileImg", result1.data.data);
  //       }
  //       navigate("/modules/BrokerPortal/Pages/Admin/Interview/index");
  //     });
  //     // navigate("/modules/BrokerPortal/Pages/Admin/Interview/index");
  //   });
  // };
  const FetchPOSPDetails = async (appNo, Status) => {
    await getRequest(`Partner/GetPOSPDetails?ApplicationNo=${appNo}`).then((result) => {
      console.log("data2 -->", result.data[0]);
      setAppReviewResponse(dispatch, result.data[0]);
      const interviewArray = result.data[0].pospdetailsJson.InterviewDetails.filter(
        (x) => x.InterviewStatus.mValue === Status
      )[0];
      setInterviewStatus(dispatch, interviewArray);
      // navigate("/modules/BrokerPortal/Pages/Admin/AppLication/index");
      setPOSPDetails1(dispatch, JSON.stringify(result.data[0]));
      const Img = result.data[0].pospdetailsJson.RawImage;
      ViewFiles(Img).then((result1) => {
        if (result1.data !== "") {
          localStorage.setItem("ProfileImg", result1.data.data);
        }
        navigate("/modules/BrokerPortal/Pages/Admin/Interview/index");
      });
    });
  };
  const [TotalInterviews, SetTotalInterview] = useState();
  const [PendingInterviews, setPendingInterviews] = useState();
  const [QualifiedInterviews, setQualifiedInterviews] = useState();
  const [RejectedInterviews, setRejectedInterviews] = useState();

  const GetAppsNo = async () => {
    const username = SalesLoginResponse.userName;
    // await getRequest(`Partner/GetPOSPDetails`).then((result) => {
    await getRequest(`Partner/GetInterviewDetails?UserId=${username}`).then((result) => {
      // api/Partner/GetInterviewDetails?UserId=nanditha.kn@inubesolutions.com
      console.log("applications number", result.data);
      setAppsNo(result.data);
      setAppsNo1(result.data);
      // Color(setAppsNo(result.data));
      SetTotalInterview(result.data.length);
      const Pending = result.data.filter((item) => item.Status.mValue === "Pending");
      setPendingInterviews(Pending.length);
      const Qualified = result.data.filter((item) => item.Status.mValue === "Finished & Qualified");
      setQualifiedInterviews(Qualified.length);
      const Rejected = result.data.filter((item) => item.Status.mValue === "Finished & Rejected");
      setRejectedInterviews(Rejected.length);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  useEffect(() => {
    GetAppsNo();
  }, []);
  const [valid, setValid] = useState(false);

  const handleSearch = (e) => {
    const apps = appsNo.filter(
      (item) =>
        item.CandidateName.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.ApplicationNo.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.CandidateMobileNumber.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.InterViewLocation.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    // setAppsNo(appsNo);
    // setAppsNo1(apps);
    console.log("appsNo1", appsNo1);
    if (apps.length === 0) {
      console.log("valid", valid);
      setValid(true);
    } else {
      setValid(false);
    }
    setAppsNo1(apps);
    setPage(0);
  };
  const [InterviewStaus, setInterviewstatus] = useState({
    mID: "",
    mValue: "",
  });
  // const { InterviewStatus } = AdminData().admindetails.Masters;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpenSuccess, setModalOpenSuccess] = useState(false);
  const [ChangeFlag, setChangeFlag] = useState(true);
  const [selectedStatus, setselectedStatus] = useState("");
  // const [Interview1Status, setInterview1Status] = useState();
  const [Interview1Status, setInterview1Status] = useState("");
  const [ApplicationNumber, setApplicationNumber] = useState([]);

  const handleModelClose = () => {
    setModalOpen(false);
    setInterview1Status();
    setselectedStatus("");
  };
  const handleModelClose1 = () => {
    setModalOpen1(false);
  };
  const handleModelCloseSuccess = () => {
    setModalOpenSuccess(false);
    setApplicationNumber([]);
    setChangeFlag(true);
    // setChangeFlag(true);
  };
  const handleModelChange1 = () => {
    setModalOpen1(true);
  };

  const handleUpdateStatus = async () => {
    const InterviewUpdate = {
      InterViewStatus: Interview1Status,
      ApplicationArray: ApplicationNumber,
    };
    await postRequest(
      `Partner/UpdateInterviewDetails?UserId=${SalesLoginResponse.userName}`,
      InterviewUpdate
    );
    setModalOpenSuccess(true);
    handleModelClose();
    handleModelClose1();
    await GetAppsNo();
  };

  const handleradioChange = (item) => {
    setselectedStatus(item.mValue);
    setInterview1Status(item);
  };
  const [changeStatus, setChangeStatus] = useState(false);
  const handleCheckBox = (ApplicationNo) => {
    setChangeFlag(false);
    setApplicationNumber([...ApplicationNumber, ApplicationNo]);
    setChangeStatus(true);
  };

  const handleModelChange = () => {
    setModalOpen(true);
  };

  const handleInterviewStatus = (e, value) => {
    console.log("value", value);
    setPage(0);

    if (value !== null) {
      setInterviewstatus(value);
      const apps = appsNo.filter(
        (item) => item.Status.mValue === value.mValue || value.mValue === "All"
      );
      setAppsNo1(apps);
      console.log("appsNo1", appsNo1);
    } else {
      setInterviewstatus(value);
    }
  };
  console.log("InterviewStaus", InterviewStaus);
  const handleCardSort = (CardmValue) => {
    const apps = appsNo.filter(
      (item) => item.Status.mValue === CardmValue || CardmValue === "Interview"
    );
    setAppsNo1(apps);
  };
  // const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  //   color: theme.status.danger,
  //   "&.Mui-checked": {
  //     color: theme.status.danger,
  //   },
  // }));

  // const theme = createTheme({
  //   status: {
  //     danger: blue[500],
  //   },
  // });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // const handleEdit = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Admin/Interview/index`);
  // };

  return (
    <Card sx={{ height: "auto" }}>
      <>
        <Modal
          open={modalOpen}
          // onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ChangeStatus
            handleCheckBox={handleCheckBox}
            handleModelClose={handleModelClose}
            handleModelChange={handleModelChange}
            ChangeFlag={ChangeFlag}
            ApplicationNumber={ApplicationNumber}
            handleradioChange={handleradioChange}
            selectedStatus={selectedStatus}
            // handleUpdateStatus={handleUpdateStatus}
            handleModelChange1={handleModelChange1}
          />
        </Modal>
        <Modal
          open={modalOpen1}
          // onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Popup
            handleModelClose1={handleModelClose1}
            handleUpdateStatus={handleUpdateStatus}
            handleModelChange1={handleModelChange1}
          />
        </Modal>
        <Modal
          open={modalOpenSuccess}
          // onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Success handleModelCloseSuccess={handleModelCloseSuccess} />
        </Modal>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Card
              sx={{
                background: "#DEEFFD",
                borderradius: "6px",
              }}
              onClick={() => handleCardSort("Interview")}
            >
              <Grid container m={1}>
                <MDTypography sx={{ fontSize: "14px" }}>Total Interviews</MDTypography>
              </Grid>
              <Grid container display="flex" flexDirection="row" justifyContent="space-between">
                <MDTypography sx={{ m: 1 }}>{TotalInterviews}</MDTypography>
                <MDBox component="img" src={TotalInterview} />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Card
              sx={{
                background: "#DEEFFD",
                borderradius: "6px",
              }}
              onClick={() => handleCardSort("Pending")}
            >
              <Grid container m={1}>
                <MDTypography sx={{ fontSize: "14px" }}>Pending Interviews</MDTypography>
              </Grid>
              <Grid container display="flex" flexDirection="row" justifyContent="space-between">
                <MDTypography sx={{ m: 1 }}>{PendingInterviews}</MDTypography>
                <MDBox component="img" src={PendingInterview} />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Card
              sx={{
                background: "#DEEFFD",
                borderradius: "6px",
              }}
              // onClick={() => handleCardSortFinished()}
              onClick={() => handleCardSort("Finished & Qualified")}
            >
              <Grid container m={1} justifyContent="space-between">
                <MDTypography sx={{ fontSize: "14px" }}>Qualified Interviews</MDTypography>
              </Grid>
              <Grid container display="flex" flexDirection="row" justifyContent="space-between">
                <MDTypography sx={{ m: 1 }}>{QualifiedInterviews}</MDTypography>
                <MDBox component="img" src={QualifiedInterview} />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Card
              sx={{
                background: "#DEEFFD",
                borderradius: "6px",
              }}
              // onClick={() => handleCardSortRejected()}
              onClick={() => handleCardSort("Finished & Rejected")}
            >
              <Grid container m={1}>
                <MDTypography sx={{ fontSize: "14px" }}>
                  Rejected / Cancelled Interviews{" "}
                </MDTypography>
              </Grid>

              <Grid container display="flex" flexDirection="row" justifyContent="space-between">
                <MDTypography sx={{ m: 1 }}>{RejectedInterviews}</MDTypography>
                <MDBox component="img" src={CancelledInterview} />
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <TableContainer>
          <Grid container spacing={2} p={2}>
            <Grid>
              <MDTypography color="primary" sx={{ mt: "1.5rem", fontSize: "17.25px", ml: "1rem" }}>
                {/* {" "} */}
                List of Interviews
              </MDTypography>
            </Grid>
            {changeStatus === true && (
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                <MDButton variant="outlined" onClick={handleModelChange}>
                  Change Status
                </MDButton>
              </Grid>
            )}
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="InterviewStaus"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  ml: "5rem",
                }}
                options={StatusDatabind.Status || []}
                // options={InterviewStatus || []}
                // sx={{ ml: "2rem" }}
                value={InterviewStaus}
                getOptionLabel={(option) => option.mValue}
                // onChange={handleInterviewStatus}
                onChange={(e, value) => handleInterviewStatus(e, value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sort by Status"
                    // required
                    // sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Search "
                onChange={handleSearch}
                sx={{ ml: "5rem" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <Grid container justifyContent="flex-end"> */}
              {valid === true ? (
                <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                  No match found
                </MDTypography>
              ) : null}
              {/* </Grid> */}
            </Grid>
          </Grid>
          {/* </Stack> */}

          <Grid container>
            <Table aria-label="simple table" width="auto">
              <TableRow tabIndex={-1}>
                {/* <TableCell sx={{ fontWeight: "bold" }}>
                  <input type="checkbox" name="application Checkbox" />
                </TableCell> */}
                <TableCell sx={{ fontWeight: "bold" }}>&nbsp;</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>ApplicationNo</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>CandidateName</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Interview
                  <br />
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Interview
                  <br />
                  Time
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  InterView
                  <br />
                  Location
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Candidate
                  <br />
                  MobileNumber
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px", mr: "0.5rem" }}>
                  Actions
                </TableCell>
              </TableRow>
              <TableBody>
                {appsNo1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  // return (
                  <TableRow>
                    {/* <TableCell sx={{ fontWeight: "bold" }}>
                      <input type="checkbox" name="application Checkbox" />
                    </TableCell> */}
                    {/* <ThemeProvider theme={theme}>
                          <CustomCheckbox
                            name="application Checkbox"
                            onChange={() => handleCheckBox(row.ApplicationNo)}
                          />
                        </ThemeProvider> */}
                    <Checkbox
                      // sx={{ mt: "0.5rem", ml: "0.5rem" }}
                      sx={{ mt: "1rem", ml: "0.5rem" }}
                      name="application Checkbox"
                      checked={ApplicationNumber.filter((x) => x === row.ApplicationNo).length > 0}
                      onChange={() => handleCheckBox(row.ApplicationNo)}
                      // value="POSP"
                    />
                    <TableCell
                      onClick={() => FetchPOSPDetails(row.ApplicationNo, row.Status.mValue)}
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {row.ApplicationNo}
                    </TableCell>
                    <TableCell>{row.CandidateName}</TableCell>
                    <TableCell>
                      {/* {Array.isArray(row.pospdetailsJson.InterviewDetails)
                        ? row.pospdetailsJson.InterviewDetails[0].InterviewDate
                        : ""} */}
                      {row.InterviewDate}
                    </TableCell>
                    <TableCell>
                      {/* {Array.isArray(row.pospdetailsJson.InterviewDetails)
                        ? row.pospdetailsJson.InterviewDetails[0].InterviewTime
                        : ""} */}
                      {row.InterviewTime}
                    </TableCell>
                    <TableCell>{row.InterViewLocation}</TableCell>
                    <TableCell>{row.CandidateMobileNumber}</TableCell>
                    <Color Status={row.Status.mValue} />
                    <TableCell>
                      <MoreVertIcon fontSize="medium" onClick={handleClick} />
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
                        <MDTypography
                          sx={{ backgroundColor: "#ffffff" }}
                          onClick={handleModelChange}
                        >
                          Edit
                        </MDTypography>
                        <MDTypography
                          sx={{ backgroundColor: "#ffffff" }}
                          // onClick={handleEdit}
                          onClick={() => FetchPOSPDetails(row.ApplicationNo, row.Status.mValue)}
                        >
                          View
                        </MDTypography>
                      </Popover>
                    </TableCell>
                  </TableRow>
                  //  );
                ))}
              </TableBody>
            </Table>
          </Grid>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={appsNo.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    </Card>
  );
}
function ChangeStatus({
  handleModelClose,
  ApplicationNumber,
  selectedStatus,
  handleradioChange,
  // handleUpdateStatus,
  handleModelChange1,
}) {
  console.log("ApplicationNumber", ApplicationNumber);
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModelClose} />
        </Grid>
        <Grid container justifyContent="Center">
          <MDTypography color="primary">Change Selected to</MDTypography>
        </Grid>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{ ml: "127px", mt: 3 }}
        >
          {StatusDatabind.ChangeStatusValue.map((item) => (
            <FormControlLabel
              label={item.mValue}
              control={<Radio />}
              checked={selectedStatus === item.mValue}
              onChange={() => handleradioChange(item)}
            />
          ))}
        </RadioGroup>
      </Grid>
      <Grid container justifyContent="Center">
        <Grid item xs={12} sm={12} md={3} lg={2} xl={2} xxl={2}>
          <MDButton
            // onClick={handleUpdateStatus}
            // onClick={handleModelChange1}
            onClick={selectedStatus !== "" ? handleModelChange1 : null}
            sx={{
              fontSize: "0.7rem",
              mt: 3,
            }}
          >
            Change Status
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}
function Popup({ handleModelClose1, handleUpdateStatus }) {
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "37rem",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 4,
  };
  return (
    <MDBox sx={style1}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModelClose1} />
        </Grid>
        <Grid container justifyContent="Center">
          <MDTypography color="primary">Are You sure want To Change The Status?</MDTypography>
        </Grid>
        <Grid container justifyContent="Center">
          <Grid item xs={9} sm={9} md={3} lg={2} xl={2} xxl={2}>
            <MDButton
              variant="outlined"
              color="secondary"
              onClick={handleModelClose1}
              sx={{
                fontSize: "0.7rem",
                mt: 5,
              }}
            >
              No
            </MDButton>
          </Grid>
          <Grid item xs={9} sm={9} md={3} lg={2} xl={2} xxl={2}>
            <MDButton
              onClick={handleUpdateStatus}
              sx={{
                fontSize: "0.7rem",
                mt: 5,
              }}
            >
              &nbsp;Yes
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
function Success({ handleModelCloseSuccess }) {
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 4,
  };
  return (
    <MDBox sx={style1}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModelCloseSuccess} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <MDAvatar src={Submit} sx={{ width: "70px", height: "70px" }} variant="square" />
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="28px">
              Status Updated Succesfully.
            </MDTypography>
          </Grid>
          <br />
          <Grid xs={12} textAlign="center" mt={3}>
            <MDButton onClick={handleModelCloseSuccess} pb={90} variant="contained">
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default ApplicationList;
