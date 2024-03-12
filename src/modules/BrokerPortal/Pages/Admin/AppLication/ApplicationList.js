import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Chip,
  TablePagination,
  Stack,
  InputAdornment,
  IconButton,
  Grid,
  // Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import { getRequest } from "core/clients/axiosclient";
import { useNavigate } from "react-router-dom";
import {
  setAppReviewResponse,
  useDataController,
  setPOSPDetails1,
  setStepPar,
} from "../../../context";
import { ViewFiles } from "../../MyProfile/data/index";

function ApplicationList() {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [appsNo, setAppsNo] = useState([]);
  const [appsNo1, setAppsNo1] = useState([]);
  const navigate = useNavigate();

  const [controller, dispatch] = useDataController();
  const { StepPar, appReviewResponse } = controller;
  console.log("StepPar", StepPar);
  // const pospdetails = appReviewResponse.pospdetailsJson;
  console.log("appReviewResponse", appReviewResponse);
  const FetchPOSPDetails = async (appNo) => {
    await getRequest(`Partner/GetPOSPDetails?ApplicationNo=${appNo}`).then((result) => {
      console.log("data2 -->", result.data[0]);
      setAppReviewResponse(dispatch, result.data[0]);
      // navigate("/modules/BrokerPortal/Pages/Admin/AppLication/index");

      setPOSPDetails1(dispatch, JSON.stringify(result.data[0]));
      const Img = result.data[0].pospdetailsJson.RawImage;
      ViewFiles(Img).then((result1) => {
        if (result1.data !== "") {
          localStorage.setItem("ProfileImg", result1.data.data);
        }
        if (
          Object.keys(result.data[0].pospdetailsJson || {} || null).includes("InterviewDetails")
        ) {
          setStepPar(dispatch, 1);
        }
        if (
          Object.keys(result.data[0].pospdetailsJson || {} || null).includes("InterviewDetails") &&
          Object.keys(result.data[0].pospdetailsJson || {} || null).includes("TrainingDetails") &&
          Object.values(result.data[0].pospdetailsJson.InterviewDetails || {}).some(
            (x) => x.InterviewStatus.mValue === "Finished & Qualified"
          )
          // pospdetails.InterviewDetails.InterviewStatus.mValue === "Finished & Qualified"
        ) {
          setStepPar(dispatch, 2);
        }

        if (
          Object.keys(result.data[0].pospdetailsJson || {} || null).includes("InterviewDetails") &&
          Object.keys(result.data[0].pospdetailsJson || {} || null).includes("TrainingDetails") &&
          Object.values(result.data[0].pospdetailsJson.TrainingDetails || {}).every((x) =>
            Object.values(x.TestDetails || {}).some((y) => y.TestStatus === "Pass")
          )
        ) {
          setStepPar(dispatch, 3);
        }

        navigate("/modules/BrokerPortal/Pages/Admin/AppLication/index");
      });
    });
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const GetAppsNo = async () => {
    await getRequest(`Partner/GetPOSPDetails`).then((result) => {
      console.log("applications number", result.data);
      setAppsNo(result.data);
      setAppsNo1(result.data);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    GetAppsNo();
  }, []);

  const [valid, setValid] = useState(false);

  const handleSearch = (e) => {
    const apps = appsNo.filter(
      (item) =>
        item?.partnerName?.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item?.applicationNo?.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item?.mobile?.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item?.email?.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
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
  };
  // useEffect(() => {
  //   if (appsNo1.length === 0) {
  //     console.log("valid", valid);
  //     setValid(true);
  //   }
  // }, [appsNo1]);
  // return (
  //   <MDBox>
  //     <Grid container>
  //       <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" mt={1} m={0}>
  //         <TableContainer component={Paper}>
  //           <Stack direction="row" justifyContent="space-between" p={2}>
  //             <MDTypography color="primary"> POSP Applications</MDTypography>
  //             <MDInput
  //               label="Search "
  //               sx={{ width: "auto" }}
  //               InputProps={{
  //                 endAdornment: (
  //                   <InputAdornment>
  //                     <IconButton>
  //                       <SearchIcon />
  //                     </IconButton>
  //                   </InputAdornment>
  //                 ),
  //               }}
  //             />
  //           </Stack>
  //           <Grid container ml={2} width="95%" mt={1}>
  //             <Table aria-label="simple table" width="95%">
  //               <TableRow>
  //                 <TableCell sx={{ fontWeight: "bold" }}>
  //                   <input type="checkbox" name="application Checkbox" />
  //                 </TableCell>
  //                 <TableCell sx={{ fontWeight: "bold" }}>Application No</TableCell>
  //                 <TableCell sx={{ fontWeight: "bold" }}>Applicant Name</TableCell>
  //                 <TableCell sx={{ fontWeight: "bold" }}>DOB</TableCell>
  //                 <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
  //                 <TableCell sx={{ fontWeight: "bold" }}>Email ID</TableCell>
  //                 <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
  //                 <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
  //               </TableRow>
  //               <TableBody>
  //                 {appsNo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
  //                   <TableRow key={row.applicationNo}>
  //                     <TableCell>
  //                       <input type="checkbox" name="application Checkbox" />
  //                     </TableCell>
  //                     <TableCell
  //                       onClick={() => FetchPOSPDetails(row.applicationNo)}
  //                       style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
  //                     >
  //                       {row.applicationNo}
  //                     </TableCell>
  //                     <TableCell>{row.pospdetailsJson.FirstName}</TableCell>
  //                     <TableCell>{row.pospdetailsJson.DOB}</TableCell>
  //                     <TableCell>{row.pospdetailsJson.MobileNo}</TableCell>
  //                     <TableCell>{row.pospdetailsJson.EmailId}</TableCell>
  //                     <TableCell>{row.pospdetailsJson.Age}</TableCell>
  //                     <TableCell>
  //                       <Chip
  //                         label={row.status}
  //                         style={{ backgroundColor: "#ED6C02", color: "#ffffff" }}
  //                       />
  //                     </TableCell>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           </Grid>
  //         </TableContainer>
  //         <TablePagination
  //           rowsPerPageOptions={[5, 10, 15, 20]}
  //           component="div"
  //           count={appsNo.length}
  //           rowsPerPage={rowsPerPage}
  //           page={page}
  //           onPageChange={handleChangePage}
  //           onRowsPerPageChange={handleChangeRowsPerPage}
  //         />
  //       </Grid>
  //     </Grid>
  //   </MDBox>
  // );
  return (
    <MDBox sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          {/* <Table> */}

          <Stack direction="column" justifyContent="flex-end" p={2}>
            <MDTypography color="primary"> Agent Applications</MDTypography>
            <Grid container justifyContent="flex-end">
              <MDInput
                label="Search "
                sx={{ width: "auto" }}
                onChange={handleSearch}
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
              <Grid container justifyContent="flex-end">
                {valid === true ? (
                  <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                    No match found
                  </MDTypography>
                ) : null}
              </Grid>
            </Grid>
          </Stack>

          <Grid container ml={2} width="95%" mt={1}>
            <Table aria-label="simple table" width="95%">
              <TableRow tabIndex={-1}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <input type="checkbox" name="application Checkbox" />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Application No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Applicant Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>DOB</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
              <TableBody>
                {appsNo1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  // return (
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <input type="checkbox" name="application Checkbox" />
                    </TableCell>
                    <TableCell
                      onClick={
                        row.status === "Rejected" ? null : () => FetchPOSPDetails(row.applicationNo)
                      }
                      style={
                        row.status === "Rejected"
                          ? { color: "#696969" }
                          : {
                              color: "blue",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }
                      }
                    >
                      {row.applicationNo}
                    </TableCell>
                    <TableCell>{row.pospdetailsJson.FirstName}</TableCell>
                    <TableCell>{row.pospdetailsJson.DOB}</TableCell>
                    <TableCell>{row.pospdetailsJson.MobileNo}</TableCell>
                    <TableCell>{row.pospdetailsJson.EmailId}</TableCell>
                    <TableCell>{row.pospdetailsJson.Age}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        style={{ backgroundColor: "#ED6C02", color: "#ffffff" }}
                      />
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
      </Paper>
    </MDBox>
  );
}

export default ApplicationList;
