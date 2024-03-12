import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import MDTypography from "components/MDTypography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import MDLoader from "../../../../../../components/MDLoader";
import { FetchListOfCOI, GetPolicy, EventCommunicationExecution, GetCoiList } from "./data/index";

export default function MagmaCoiList() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}/${propformat(
      propdate.getMonth() + 1
    )}/${propdate.getFullYear()}`;
  };
  const [rows, setRows] = useState([]);
  const [emailid, setEmail] = useState("");

  const [json, setJson] = useState({
    // Uhid: "",
    MemberID: "",
    COINumber: "",
  });
  const [fetchCOI, setFetchCOI] = useState({
    policyNo: "",
    familyId: "",
    memberID: "",
    productCode: "MagmaHospiCash01",
  });
  const [getcoi, setGetcoi] = useState({
    productCode: "MagmaHospiCash01",
    pagenumber: "",
    pagesize: "",
  });

  useEffect(async () => {
    setLoading(true);
    getcoi.pagenumber = 1;
    getcoi.pagesize = 5;
    setGetcoi(getcoi);
    console.log("getcoiinput", getcoi);
    const coilist = await GetCoiList(getcoi);
    console.log("getcoiO/P", coilist);
    setRows([...coilist]);
    if (coilist.status === 200) {
      setLoading(false);
    }
    setLoading(false);
  }, []);

  const Payload = {
    key: "",
    keyValue: "",
    templateKey: "",
    templateId: 164,
    requestData: "",
    referenceId: "",
    communicationId: 0,
  };
  const email = {
    key: "",
    stakeHolderDetails: [
      {
        communicationValue: emailid,
        communicationType: "Email",
        stakeholderCode: "CUS",
      },
    ],
    communicationId: "153",
    keyType: "Chomp",
  };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);
    link.click();
  };
  const Navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [policyNo, setPolicyNo] = useState("");

  const columns = [
    {
      field: "policyNo",
      headerName: "COI No.",
      minWidth: 370,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "uhid",
    //   headerName: "UHID",
    //   width: 180,
    //   editable: true,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "masterPolicyNo",
      headerName: "Master Policy No.",
      minWidth: 200,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "masterPolicyHolder",
      headerName: "MPH Name",
      minWidth: 170,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "memberId",
      headerName: "Member ID",
      minWidth: 170,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dateOfIssuance",
      headerName: "Date of Isssuance",
      minWidth: 180,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalPremium",
      headerName: "Total Premium",
      minWidth: 160,
      editable: true,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "plan",
      headerName: "Plan Name",
      minWidth: 160,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 70,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
  ];
  const handleDownload = async () => {
    Payload.key = policyNo;
    const policy = await GetPolicy(Payload);

    generateFile(policy.data, policyNo);
    setAnchorEl(null);
  };
  const OnEmail = () => {
    setLoading(true);
    email.key = policyNo;
    console.log("123", emailid);
    EventCommunicationExecution(email).then((res) => {
      console.log("email", res);
      // setGenericPolicyDto(dispatch, { ...genericPolicyDto, EmailNotification: res });
      if (res.data.status === 1) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          text: `Mail is sent successfully`,
        });
      } else {
        setLoading(false);
      }
    });
    setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleView = (event, row, Email) => {
    console.log("12334", row);
    setAnchorEl(event.currentTarget);
    setPolicyNo(row);
    setEmail(Email);
    // console.log("Master", policyNo);
  };
  const handleCoi = () => {
    Navigate("/retail");
  };
  // const handleSearch = async () => {
  //   if (fetchCOI.familyId === "" || fetchCOI.memberID === "" || fetchCOI.policyNo === "") {
  //     swal.fire({
  //       icon: "success",
  //       text: `Mail is sent successfully`,
  //     });
  //   } else {
  //     setLoading(true);
  //     fetchCOI.familyId = json.MemberID;
  //     fetchCOI.memberID = json.Uhid;
  //     fetchCOI.policyNo = json.COINumber;
  //     setFetchCOI(fetchCOI);
  //     const COIList = await FetchCoiList(fetchCOI);
  //     console.log("coilist", COIList);
  //     setRows([...COIList.data]);

  //     if (COIList.status === 200) {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleSearch = async () => {
    // debugger;
    // const { Uhid, MemberID, COINumber } = json; // Destructure values from json object
    const { MemberID, COINumber } = json; // Destructure values from json object
    // Check if at least one field is filled
    // if (Uhid || MemberID || COINumber) {
    if (MemberID || COINumber) {
      setLoading(true);
      const updatedFetchCOI = { ...fetchCOI }; // Get the current state of fetchCOI object
      // Assign values to fetchCOI properties based on filled fields
      // if (Uhid) updatedFetchCOI.memberID = Uhid;
      if (MemberID) updatedFetchCOI.familyId = MemberID;
      if (COINumber) updatedFetchCOI.policyNo = COINumber;
      try {
        const COIList = await FetchListOfCOI(updatedFetchCOI);
        console.log("coilist", COIList);
        setRows([...COIList.data]);
        if (COIList.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching COI list:", error);
        setLoading(false);
        // Handle the error state here
      }
      setFetchCOI(updatedFetchCOI);
    } else {
      Swal.fire({
        icon: "error",
        allowOutsideClick: false,
        showCloseButton: true,
        text: "Atleast One Field is required",
      });
    }
  };

  console.log("rows", rows);
  // const handleInput = (e) => {
  //   setJson({ ...json, [e.target.name]: e.target.value });
  // };
  // const handleInput = (e) => {
  //   const inputValue = e.target.value;
  //   const regex = /^[A-Z0-9/-]+$/; // Regular expression to allow capital letters, numbers, '/', and '-'
  //   if (inputValue === "" || regex.test(inputValue)) {
  //     setJson({ ...json, [e.target.name]: inputValue });
  //   }
  // };
  const handleInput = async (e) => {
    // debugger;
    if (e.target.name === "COINumber" && e.target.value !== "") {
      if (e.target.value.length < 38) {
        const numRegex = /^[A-Z0-9'//-]*$/;
        if (numRegex.test(e.target.value)) {
          setJson({ ...json, [e.target.name]: e.target.value });
        }
      }
    } else if (e.target.name === "MemberID" && e.target.value !== "") {
      // if (e.target.value.length < 10) {
      const numRegex = /^[A-Za-z0-9]*$/;
      if (numRegex.test(e.target.value)) {
        setJson({ ...json, [e.target.name]: e.target.value });
      }
      // }
    } else {
      json.COINumber = e.target.value;
      json.MemberID = e.target.value;
      setLoading(true);
      getcoi.pagenumber = 1;
      getcoi.pagesize = 5;
      setGetcoi(getcoi);
      console.log("getcoiinput", getcoi);
      const coilist = await GetCoiList(getcoi);
      console.log("getcoiO/P", coilist);
      setRows([...coilist]);
      if (coilist.status === 200) {
        setLoading(false);
      }
      setLoading(false);
    }

    // if (e.target.name === "Uhid") {
    //   if (e.target.value.length < 18) {
    //     const numRegex = /^[A-Z0-9]*$/;
    //     if (numRegex.test(e.target.value)) {
    //       setJson({ ...json, [e.target.name]: e.target.value });
    //     }
    //   }
    // }
  };

  const totalPages = Math.floor(rows.length / rowsPerPage);
  console.log("totalpages", rows.length);
  const handlePrevPage = async () => {
    setPage((prevPage) => prevPage - 1);
    setLoading(true);
    getcoi.pagenumber = page;
    getcoi.pagesize = 5;
    setGetcoi(getcoi);
    console.log("getcoiinput", getcoi);
    const coilist = await GetCoiList(getcoi);
    console.log("getcoiO/P", coilist);
    setRows([...coilist]);
    if (coilist.status === 200) {
      setLoading(false);
    }
    setLoading(false);
  };
  const handleNextPage = async () => {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
    getcoi.pagenumber = page + 2;
    getcoi.pagesize = 5;
    setGetcoi(getcoi);
    console.log("getcoiinput", getcoi);
    const coilist = await GetCoiList(getcoi);
    console.log("getcoiO/P", coilist);
    setRows([...coilist]);
    if (coilist.status === 200) {
      setLoading(false);
    }
    setLoading(false);
  };
  console.log("input", json);
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" p={2}>
        <MDTypography variant="h3">List of COIs</MDTypography>
        <MDButton onClick={handleCoi}>Create COI</MDButton>
      </MDBox>

      <MDBox m={4}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="UHID"
              placeholder="Enter UHID"
              name="Uhid"
              onChange={handleInput}
              value={json.Uhid}
            />
          </Grid> */}

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Member ID"
              placeholder="Enter Member ID"
              name="MemberID"
              value={json.MemberID}
              onChange={handleInput}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5.3} lg={5.3} xl={5.3} xxl={5.3}>
            <MDInput
              label="COI Number"
              placeholder="Enter COI Number"
              name="COINumber"
              onChange={handleInput}
              value={json.COINumber}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            {/* <MDBox sx={{ display: "flex", justifyContent: "right" }}> */}
            <MDBox sx={{ display: "flex" }}>
              <MDButton onClick={handleSearch} variant="contained">
                Search
              </MDButton>
            </MDBox>
          </Grid>
          <MDLoader loader={loading} />
        </Grid>
      </MDBox>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 468, maxWidth: 2000 }}>
          <Table aria-label="simple table" width="200%">
            <TableHead sx={{ fontWeight: "bold" }}>
              <TableRow tabIndex={-2}>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
              <TableBody>
                {rows.map((row) => (
                  <TableRow>
                    <TableCell align="center">{row.policyNo}</TableCell>
                    {/* <TableCell>{row.uhid}</TableCell> */}
                    <TableCell align="center">{row.masterPolicyNo}</TableCell>
                    <TableCell align="center">{row.masterPolicyHolder}</TableCell>
                    <TableCell align="center">{row.memberId}</TableCell>
                    <TableCell align="center">{formatPropDate(row.dateOfIssuance)}</TableCell>
                    <TableCell align="center">{row.totalPremium}</TableCell>
                    <TableCell align="center">{row.plan}</TableCell>
                    <TableCell align="center">
                      <>
                        <IconButton
                          onClick={(event) => handleView(event, row.policyNo, row.emailId)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleDownload}>&nbsp;Download</MenuItem>
                          <MenuItem onClick={OnEmail}>&nbsp; Email</MenuItem>
                        </Menu>
                      </>
                    </TableCell>
                  </TableRow>

                  // <TableRow key={row.uhid} tabIndex={-2}>
                  //   {columns.map((column) => (
                  //     <TableCell key={column.field} sx={{ textAlign: "center" }}>
                  //       {row[column.field]}
                  //     </TableCell>
                  //   ))}
                  // </TableRow>
                ))}
              </TableBody>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "0 25px" }}>
            <div>
              <IconButton onClick={handlePrevPage} disabled={page === 0}>
                <KeyboardArrowLeft />
                <span style={{ fontSize: "15px" }}>PREVIOUS</span>
              </IconButton>
            </div>
            <div>
              <IconButton onClick={handleNextPage} disabled={totalPages === 0}>
                <span style={{ fontSize: "15px" }}>NEXT</span>
                <KeyboardArrowRight />
              </IconButton>
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
