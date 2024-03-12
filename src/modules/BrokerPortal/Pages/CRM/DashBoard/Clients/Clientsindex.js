import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { GridToolbar } from "@mui/x-data-grid";
import swal from "sweetalert";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Checkbox from "@mui/material/Checkbox";
import { postRequest, getRequest } from "core/clients/axiosclient";

// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AddIcon from "@mui/icons-material/Add";
// import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setClientdata, useDataController } from "../../../../context";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";
import MDBox from "../../../../../../components/MDBox";
import MDDataGrid from "../../../../../../components/MDDataGrid";
import Todolist from "../../../../../../assets/images/BrokerPortal/Todolist.png";
import exportlogo from "../../../../../../assets/images/BrokerPortal/Admin/excel.png";
import MDInput from "../../../../../../components/MDInput";

const {
  Card,
  Grid,
  IconButton,
  Stack,
  InputAdornment,
  Chip,
  Tabs,
  Tab,
  // TablePagination,
  // Accordion,
  // Popper,
  // Fade,
  Paper,
} = require("@mui/material");

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function Color({ Status }) {
  console.log("Status", Status);
  if (Status === "Active") {
    return (
      <TableCell>
        <Chip label={Status} style={{ backgroundColor: "#006400", color: "#ffffff" }} />
      </TableCell>
    );
  }
  if (Status === "Qualified-Out") {
    return (
      <TableCell>
        <Chip label={Status} style={{ backgroundColor: "#b22222", color: "#ffffff" }} />
      </TableCell>
    );
  }
  if (Status === "Unassigned") {
    return (
      <TableCell>
        <Chip label={Status} style={{ backgroundColor: "#ED6C02", color: "#ffffff" }} />
      </TableCell>
    );
  }
  return <Chip label="" style={{ backgroundColor: "#ED6C02", color: "#ffffff" }} />;
}

// function Assigned({ AssignedTo }) {
//   console.log("AssignedTo", AssignedTo);
//   if (AssignedTo === "POSP123") {
//     return (
//       <TableCell>
//         <MDTypography
//           style={{
//             fontSize: "14px",
//             fontWeight: "400",
//             fontFamily: "Roboto",
//             color: "#2E7D32",
//           }}
//         >
//           POSP123
//         </MDTypography>
//       </TableCell>
//     );
//   }
//   if (AssignedTo === "unassigned") {
//     return (
//       <TableCell>
//         <MDTypography
//           style={{
//             fontSize: "14px",
//             fontWeight: "400",
//             fontFamily: "Roboto",
//             color: "#ED6C02",
//           }}
//         >
//           Unassigned
//         </MDTypography>
//       </TableCell>
//     );
//   }
//   if (AssignedTo === "optout") {
//     return (
//       <TableCell>
//         <MDTypography
//           style={{
//             fontSize: "14px",
//             fontWeight: "400",
//             fontFamily: "Roboto",
//             color: "#b22222",
//           }}
//         >
//           Qualified-Out
//         </MDTypography>
//       </TableCell>
//     );
//   }
//   return "";
// }

function Clientsindex() {
  const [, dispatch] = useDataController();
  const navigate = useNavigate();
  const [selectedProspects, setSelectedProspects] = useState([]);
  const handleLinkProceed = (row) => {
    navigate(
      `/modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Profileindex?ProspectID=${row}&Type=Client`
    );
  };
  const handleClients = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/DashBoardindex`);
  };
  const handleCheckBox = (Id) => {
    console.log("selected elements", Id);
    setSelectedProspects(Id);
  };
  const [pageSize, setPageSize] = useState(5);
  const handleImport = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Clientsimport`);
  };
  console.log(selectedProspects);
  const [ClientData, setClientData] = useState([]);
  const [appsNo, setAppsNo] = useState([]);
  const [appsNo1, setAppsNo1] = useState([]);
  const [valid, setValid] = useState(false);
  const handleSearch = (e) => {
    const apps = appsNo.filter(
      (item) =>
        item.Name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Mobile.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Email.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    console.log("appsNo1", appsNo1);
    if (apps.length === 0) {
      console.log("valid", valid);
      setValid(true);
    } else {
      setValid(false);
    }
    setAppsNo1(apps);
    // setPage(0);
  };

  useEffect(async () => {
    await getRequest(`Lead/ViewDetails?ProspectID=&Type=Client&status=`).then((response) => {
      console.log("lead", response.data);
      setAppsNo(response.data);
      setClientData(response.data);
      setClientdata(dispatch, response.data);
      if (ClientData.length > 0) {
        const topFour = ClientData.filter((x, i) => i < 4);
        setAppsNo1(topFour);
      }
    });
  }, [ClientData.length === 0]);

  const [prospectsValue, setProspectsValue] = useState("All");

  const handleChangeTab = (event, newValue) => {
    setProspectsValue(newValue);
  };

  const [newCrm, setNewCrm] = useState([]);

  const handleDelete = async (Id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (confirmDelete) => {
      if (confirmDelete) {
        const newList = newCrm.filter((elem) => elem.ProspectDetailsJson.ProspectId !== Id);
        setNewCrm(newList);
        await postRequest(`Lead/DeleteCRM?ProspectCode=${Id}`);
        swal("Success", "Data deleted successfully!", "success");
        // const updatedData = await getRequest("Lead/ViewDetails?ProspectID=&Type=prospect&status=");
        // setNewCrm(updatedData.data);
      }
    });
  };

  const newAppsNo1 =
    prospectsValue === "All"
      ? appsNo1
      : appsNo1.filter((ele) => ele.ProspectDetailsJson.Status === prospectsValue);

  const [countcrm, setCountcrm] = useState([]);
  useEffect(async () => {
    await getRequest(`Lead/CountCRM`).then((res) => {
      console.log("CountCRM", res);
      setCountcrm(res.data);
    });
  });
  const [countClients, setCountClients] = useState([]);
  useEffect(async () => {
    await getRequest(`Lead/CountForCRMProspects?ProspectType=Client`).then((res) => {
      console.log("CountClients", res);
      setCountClients(res.data);
      console.log("countClients", countClients);
    });
  });
  const columns = [
    {
      field: "id",
      headerName: "Client ID",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const rowId = params.value;
        return (
          <MDTypography
            onClick={() => handleLinkProceed(rowId)}
            style={{
              color: "#137BCD",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            {rowId}
          </MDTypography>
        );
      },
    },
    { field: "CreatedDate", headerName: "Created Date", width: 150, editable: false },
    { field: "Name", headerName: "Name", width: 150, editable: false },
    { field: "Mobile", headerName: "Mobile Number", width: 150, editable: false },
    { field: "Email", headerName: "Email ID", width: 150, editable: false },
    {
      field: "AssignedTo",
      headerName: "Assigned To",
      width: 150,
      editable: false,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      editable: false,
      renderCell: (params) => <Color Status={params.value} />,
    },
    { field: "State", headerName: "State", width: 150, editable: false },
    { field: "City", headerName: "City", width: 150, editable: false },
    { field: "Profession", headerName: "Profession", width: 150, editable: false },
    { field: "Income", headerName: "Income", width: 150, editable: false },
    { field: "Source", headerName: "Source", width: 150, editable: false },
    { field: "DOB", headerName: "DOB", width: 150, editable: false },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const prospectId = params.id;
        return (
          <MDBox sx={{ width: 450 }}>
            <IconButton onClick={() => handleLinkProceed(prospectId)}>
              <EditIcon sx={{ ml: "0.1rem" }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(prospectId)}>
              <DeleteIcon sx={{ ml: "0.1rem" }} />
            </IconButton>
          </MDBox>
        );
      },
    },
  ];

  const detailsRows = newAppsNo1.map((row) => ({
    id: row.ProspectDetailsJson.ProspectId,
    CreatedDate: row.ProspectDetailsJson.CreatedDate,
    Name: row.ProspectDetailsJson.Name,
    Mobile: row.ProspectDetailsJson.MobileNumber,
    Email: row.ProspectDetailsJson.Email,
    AssignedTo: row.ProspectDetailsJson.AssignedTo,
    Status: row.ProspectDetailsJson.Status,
    State:
      row.ProspectDetailsJson.CommunicationDetails &&
      row.ProspectDetailsJson.CommunicationDetails.State
        ? row.ProspectDetailsJson.CommunicationDetails.State
        : "",

    City:
      row.ProspectDetailsJson.CommunicationDetails &&
      row.ProspectDetailsJson.CommunicationDetails.Area
        ? row.ProspectDetailsJson.CommunicationDetails.Area
        : "",
    Profession: row.ProspectDetailsJson.Profession,
    Income: row.ProspectDetailsJson.Income,
    Source: row.ProspectDetailsJson.Source,
    DOB: row.ProspectDetailsJson.DateOfBirth,
  }));

  return (
    <MDBox sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", height: "100%", mb: 2 }}>
        <Card sx={{ height: "auto" }}>
          <Grid p={2}>
            <MDBox display="flex" flexDirection="row" alignItems="center">
              <MDTypography>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={handleClients}
                  onKeyDown={handleClients}
                  style={{
                    textDecoration: "underline",
                    color: "#0071D9",
                    fontSize: "1rem",
                    cursor: "pointer",
                    variant: "h4",
                  }}
                >
                  Home
                </span>
              </MDTypography>
              <IconButton aria-label="delete">
                <KeyboardDoubleArrowRightIcon />
              </IconButton>
              <MDTypography variant="h4" fontSize="1rem">
                CRM
              </MDTypography>
              <IconButton aria-label="delete">
                <KeyboardDoubleArrowRightIcon />
              </IconButton>
              <MDTypography
                variant="h4"
                fontSize="1rem"
                color="primary"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Clients
              </MDTypography>
            </MDBox>
            <MDTypography variant="h4" fontSize="1.25rem" color="black">
              Clients
            </MDTypography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Card
                  sx={{
                    background: "#DEEFFD",
                    borderradius: "1px",
                  }}
                  // onClick={() => handleCardSort("Interview")}
                >
                  <Grid container p={3}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDBox component="img" src={Todolist} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography variant="h4" sx={{ ml: "-1rem" }}>
                        {countClients.TotalCount}
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        sx={{ fontWeight: "400", fontSize: "13.5px", mb: "1.3rem", ml: "-1rem" }}
                      >
                        Total Clients
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Card
                  sx={{
                    background: "#DEEFFD",
                    borderradius: "1px",
                  }}
                  // onClick={() => handleCardSort("Interview")}
                >
                  <Grid container p={3}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDBox component="img" src={Todolist} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography variant="h4" sx={{ ml: "-1rem" }}>
                        {countClients.ThisMonth}
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        sx={{ fontWeight: "400", fontSize: "13.5px", ml: "-1rem" }}
                      >
                        This Month Clients
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        fontSize="10px"
                        fontWeight="500"
                        color="primary"
                        sx={{ ml: "-1rem", mt: "0.5rem" }}
                      >
                        Last month : {countClients.LastMonth} Clients
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Card
                  sx={{
                    background: "#DEEFFD",
                    borderradius: "1px",
                  }}
                  // onClick={() => handleCardSort("Interview")}
                >
                  <Grid container p={3}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDBox component="img" src={Todolist} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography variant="h4" sx={{ ml: "-1rem" }}>
                        ₹ {countcrm.premium}
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        sx={{ fontWeight: "400", fontSize: "13.5px", ml: "-1rem" }}
                      >
                        Total Premium Collected
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Card
                  sx={{
                    background: "#DEEFFD",
                    borderradius: "1px",
                  }}
                  // onClick={() => handleCardSort("Interview")}
                >
                  <Grid container p={3}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDBox component="img" src={Todolist} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography variant="h4" sx={{ ml: "-1rem" }}>
                        3,281
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        sx={{ fontWeight: "400", fontSize: "13.5px", mb: "1rem", ml: "-1rem" }}
                      >
                        Total Policies Issued
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <MDBox sx={{ width: "50%" }} p={1} mt={2}>
              <Tabs value={prospectsValue} onChange={handleChangeTab} aria-label="prospects tab">
                <LinkTab
                  label="All Client"
                  sx={{ fontWeight: "500", fontSize: "14px" }}
                  value="All"
                />
                <LinkTab
                  label="Unassigned Client"
                  sx={{ fontWeight: "500", fontSize: "14px" }}
                  value="unassigned"
                />
              </Tabs>
            </MDBox>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Search "
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
                {valid === true ? (
                  <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                    No match found
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} />
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <Stack direction="row" spacing={2} justifyContent="right">
                  <MDBox sx={{ display: "flex", alignItems: "center" }}>
                    <MDButton
                      color="success"
                      variant="outlined"
                      spacing={2}
                      sx={{ p: "0.3rem 0.7rem", fontSize: "12px" }}
                    >
                      <MDBox
                        component="img"
                        src={exportlogo}
                        sx={{
                          maxHeight: "8.5rem",
                          marginRight: "1rem",
                          fontSize: "14px",
                          fontWeight: "500",
                          width: "18%",
                        }}
                      />
                      EXPORT CSV
                    </MDButton>
                  </MDBox>

                  <MDBox>
                    <MDButton
                      // sx={{ color: "#FFFFFF", background: "#137BCD" }}
                      spacing={2}
                      variant="contained"
                      onClick={handleImport}
                    >
                      <MDBox
                        component="img"
                        src={exportlogo}
                        sx={{
                          maxHeight: "8.5rem",
                          spacing: "1rem",
                          fontSize: "14px",
                          fontWeight: "500",
                          width: "20%",
                        }}
                        justifyContent="space-between"
                      />
                      &nbsp; Import
                    </MDButton>
                  </MDBox>
                </Stack>
              </Grid>
            </Grid>
            <Grid container mt={1}>
              <MDBox sx={{ width: "100%" }}>
                <MDDataGrid
                  sx={{ fontSize: "14px", fontWeight: "400" }}
                  rows={detailsRows}
                  columns={columns}
                  rowID="id"
                  checkboxSelection
                  onSelectionModelChange={handleCheckBox}
                  components={{ Toolbar: GridToolbar }}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  pagination
                  newCrm={newCrm}
                />
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </Paper>
    </MDBox>
  );
}

export default Clientsindex;
