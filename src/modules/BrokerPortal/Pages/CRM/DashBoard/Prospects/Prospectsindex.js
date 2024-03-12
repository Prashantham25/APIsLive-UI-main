import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TableCell from "@mui/material/TableCell";
import { GridToolbar } from "@mui/x-data-grid";
import swal from "sweetalert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { postRequest, getRequest } from "core/clients/axiosclient";
import EditProfile from "../../../../../../assets/images/BrokerPortal/EditProfile.png";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";
import MDBox from "../../../../../../components/MDBox";
import MDDataGrid from "../../../../../../components/MDDataGrid";
import Todolist from "../../../../../../assets/images/BrokerPortal/Todolist.png";
import exportlogo from "../../../../../../assets/images/BrokerPortal/Admin/excel.png";
import MDInput from "../../../../../../components/MDInput";
import ProspectModal from "./ProspectModal";

const {
  Card,
  Grid,
  IconButton,
  Stack,
  InputAdornment,
  Chip,
  Modal,
  Autocomplete,
  Tabs,
  Tab,
  Paper,
  Drawer,
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
  if (Status === "Active") {
    return (
      <TableCell>
        <Chip label={Status} style={{ backgroundColor: "#006400", color: "#ffffff" }} />
      </TableCell>
    );
  }
  if (Status === "QualifiedOut") {
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
  const handleassignClose = () => {
    // handleModelClose();
    handleModelCloseSuccess();
  };
  return (
    <MDBox sx={style1}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModelCloseSuccess} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <Grid container justifyContent="center">
            <MDBox
              component="img"
              src={EditProfile}
              sx={{ maxHeight: "8.5rem", width: 400, spacing: "1rem" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              m={5}
            />
          </Grid>
          <MDTypography>Prospect Assigned Succesfully</MDTypography>
          <Grid container justifyContent="center">
            <MDButton
              onClick={handleassignClose}
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="contained"
              color="primary"
              ml={25}
              sx={{ mt: "1rem" }}
            >
              Go To Prospects
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
const AssignedMaster = [{ label: "POSP123" }];
function ChangeStatus({
  handleModelClose,
  selectedProspects,
  setSelectedProspects,
  setNewCrm,
  newCrm,
}) {
  const [modalOpenSuccess, setModalOpenSuccess] = useState(false);

  const [selectedAssign, setSelectedAssign] = useState("");
  const handleAssignedChange = (e, value) => {
    setSelectedAssign(value.label);
  };
  const handleModelCloseSuccess = () => {
    setModalOpenSuccess(false);
    setSelectedProspects([]);
  };
  const handleModelOpenSuccess = () => {
    setModalOpenSuccess(true);
  };
  const handleUpdateStatus = async () => {
    const newUpdate = {
      AssignedTo: selectedAssign,
      AssignedDate: `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
      Status: "Active",
    };
    const newCrmValue = newCrm.map((elem) => {
      if (selectedProspects.some((item) => item === elem.ProspectDetailsJson.ProspectId)) {
        const val = { ...elem, ProspectDetailsJson: { ...elem.ProspectDetailsJson, ...newUpdate } };
        postRequest(`Lead/CreateCRM`, val.ProspectDetailsJson);
        return val;
      }
      return elem;
    });
    setNewCrm(newCrmValue);
    console.log("New crm", newCrmValue);
    // setNewCrm(newCrmValue);

    setModalOpenSuccess(true);
    handleModelClose();
  };
  return (
    <MDBox sx={style}>
      {/* <Prospectsindex handleModelOpenSuccess={handleModelOpenSuccess} /> */}
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModelClose} />
        </Grid>
        <Grid container justifyContent="Center">
          <MDTypography sx={{ fontSize: "1rem" }}>Assign Prospects (3 Prospects)</MDTypography>
        </Grid>
      </Grid>
      {/* <Prospectsindex handleModelOpenSuccess={handleModelOpenSuccess} /> */}
      <Autocomplete
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "5px!important",
          },
          width: 200,
          marginLeft: "15rem",
          marginTop: "1rem",
        }}
        options={AssignedMaster}
        onChange={handleAssignedChange}
        getOptionLabel={(option) => option.label} // Specify the property to use as the label
        renderInput={(params) => <MDInput {...params} placeholder="Select" label="AssignedTo" />}
      />
      <Stack direction="row" justifyContent="space-between" p={1}>
        <MDBox style={{ marginLeft: "15rem", marginTop: "1rem" }}>
          <MDButton
            variant="outlined"
            sx={{
              height: "auto",
              width: "auto",
              borderRadius: "4px",
              color: "white",
            }}
            onClick={handleModelClose}
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
            // onClick={handleModelOpenSuccess}
            onClick={handleUpdateStatus}
          >
            Assign
          </MDButton>
        </MDBox>
      </Stack>
      <Modal
        open={modalOpenSuccess}
        // onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Success
          handleModelCloseSuccess={handleModelCloseSuccess}
          handleModelOpenSuccess={handleModelOpenSuccess}
        />
      </Modal>
    </MDBox>
  );
}
function Prospectsindex() {
  const [drawer, setDrawer] = useState(false);
  const [prospectsValue, setProspectsValue] = useState("All");

  const handleDrawerOpen = () => {
    setDrawer(true);
  };
  const handleCloseDrawer = () => {
    setDrawer(false);
  };
  const [newCrm, setNewCrm] = useState([]);
  const navigate = useNavigate();
  const handleLinkProceed = (row) => {
    navigate(
      `/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Profileindex?ProspectID=${row}&Type=prospect`
    );
  };

  const handleHome = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/DashBoardindex`);
  };
  const handleImport = () => {
    // navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Prospectsimport`);
  };
  const [valid, setValid] = useState(false);

  const [pageSize, setPageSize] = useState(5);

  const handleSearch = (e) => {
    const apps = newCrm.filter(
      (item) =>
        item.ProspectDetailsJson.ProspectId.toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item.ProspectDetailsJson.Name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.ProspectDetailsJson.MobileNumber.toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item.ProspectDetailsJson.Email.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    if (apps.length === 0) {
      setValid(true);
    } else {
      setValid(false);
    }
    setNewCrm(apps);
    // setPage(0);
  };

  const handleChangeTab = (event, newValue) => {
    setProspectsValue(newValue);
  };

  useEffect(async () => {
    await getRequest(`Lead/ViewDetails?ProspectID=&Type=prospect&status=`).then((response) => {
      console.log("ViewDetails response", response.data);
      setNewCrm(response.data);
    });
  }, []);

  const newAppsNo1 =
    prospectsValue === "All"
      ? newCrm
      : newCrm.filter((ele) => ele.ProspectDetailsJson.Status === prospectsValue);
  const [assign, setAssign] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  // const [modalOpen1, setModalOpen1] = useState(false);
  const [AssignedTo, setAssignedTo] = useState("");
  const [selectedProspects, setSelectedProspects] = useState([]);

  const handleautoCompleteChange = (event, value) => {
    setAssignedTo(value.label);
  };

  const handleCheckBox = (Id) => {
    console.log("selected elements", Id);
    setSelectedProspects(Id);
  };
  const handleModelClose = () => {
    setModalOpen(false);
  };

  const handleModelChange = () => {
    setModalOpen(true);
  };
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

  const [countProspect, setCountProspect] = useState([]);
  useEffect(async () => {
    await getRequest(`Lead/CountForCRMProspects?ProspectType=prospect`).then((res) => {
      setCountProspect(res.data);
    });
  }, [newCrm]);

  useEffect(() => {
    if (selectedProspects.length > 0 && prospectsValue !== "All") setAssign(true);
    else setAssign(false);
  }, [selectedProspects, prospectsValue]);
  const columns = [
    {
      field: "id",
      headerName: "Prospect ID",
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
            <Grid container>
              <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDBox display="flex" flexDirection="row" alignItems="center" marginLeft="0.5rem">
                  <MDTypography>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={handleHome}
                      onKeyDown={handleHome}
                      style={{
                        textDecoration: "underline",
                        color: "#0071D9",
                        // fontSize: "1rem",
                        cursor: "pointer",
                        // variant: "h4",
                        fontSize: "18px",
                        fontWeight: "400",
                      }}
                    >
                      Home
                    </span>
                  </MDTypography>
                  <IconButton aria-label="delete">
                    <KeyboardDoubleArrowRightIcon />
                  </IconButton>
                  <MDTypography sx={{ fontSize: "18px", fontWeight: "400" }}>CRM</MDTypography>
                  <IconButton aria-label="delete">
                    <KeyboardDoubleArrowRightIcon />
                  </IconButton>
                  <MDTypography
                    color="primary"
                    sx={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "18px",
                      fontWeight: "400",
                    }}
                  >
                    Prospects
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} />
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Stack direction="row" justifyContent="right">
                  <MDButton variant="contained" onClick={handleDrawerOpen} startIcon={<AddIcon />}>
                    Create Prospect
                  </MDButton>
                </Stack>
              </Grid>
            </Grid>
            <MDTypography
              variant="h4"
              fontSize="20px"
              color="#000000"
              marginLeft="0.5rem"
              marginTop="1rem"
              // fontWeight="500"
              fontFamily="Roboto"
            >
              Prospects
            </MDTypography>
            <Grid container spacing={2} mt={0.5}>
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
                        {countProspect.TotalCount}
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        sx={{ fontWeight: "400", fontSize: "13.5px", mb: "1.3rem", ml: "-1rem" }}
                      >
                        Total Prospects
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
                        {countProspect.ThisMonth}
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        sx={{ fontWeight: "400", fontSize: "13.5px", ml: "-1rem" }}
                      >
                        This Month Prospects
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        fontSize="10px"
                        fontWeight="500"
                        color="primary"
                        sx={{ ml: "-1rem", mt: "0.5rem" }}
                      >
                        Last month : {countProspect.LastMonth} Prospects
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
                        {countProspect.leadsWithOpportunity}
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        sx={{ fontWeight: "400", fontSize: "13.5px", ml: "-1rem" }}
                      >
                        Prospects with opportunities
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
                        {countProspect.Qualifiedout}
                      </MDTypography>
                      <MDTypography
                        variant="h4"
                        sx={{ fontWeight: "400", fontSize: "13.5px", ml: "-1rem" }}
                      >
                        Qualified-out Prospects
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <MDBox sx={{ width: "50%", marginLeft: "-0.68rem" }} p={1} mt={2}>
              <Tabs value={prospectsValue} onChange={handleChangeTab} aria-label="prospects tab">
                <LinkTab
                  label="All Prospects"
                  sx={{ fontWeight: "500", fontSize: "14px" }}
                  value="All"
                />
                <LinkTab
                  label="Unassigned Prospects"
                  sx={{ fontWeight: "500", fontSize: "14px" }}
                  value="Unassigned"
                />
                <LinkTab
                  label="Qualified-Out Prospects"
                  sx={{ fontWeight: "500", fontSize: "14px" }}
                  value="QualifiedOut"
                />
              </Tabs>
            </MDBox>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Search "
                  sx={{ fontSize: "16px", fontWeight: "400" }}
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
                  {assign === true && (
                    <MDBox>
                      <MDButton
                        startIcon={<ArrowForwardIcon sx={{ mt: "1rem" }} />}
                        sx={{ spacing: "1rem", mt: "-0.5rem" }}
                        justifyContent="space-between"
                        color="black"
                        variant="text"
                        spacing={2}
                        onClick={handleModelChange}
                      >
                        &nbsp; Assign
                      </MDButton>
                    </MDBox>
                  )}
                  <MDBox>
                    <MDButton color="success" variant="outlined" spacing={2}>
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
                      &nbsp; EXPORT
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
            <Drawer
              open={drawer}
              anchor="right"
              onClose={handleCloseDrawer}
              PaperProps={{
                sx: { width: "70%", padding: "32px" },
              }}
            >
              <ProspectModal handleCloseDrawer={handleCloseDrawer} />
            </Drawer>
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
                selectedProspects={selectedProspects}
                handleautoCompleteChange={handleautoCompleteChange}
                AssignedTo={AssignedTo}
                setNewCrm={setNewCrm}
                newCrm={newCrm}
              />
            </Modal>
          </Grid>
        </Card>
      </Paper>
    </MDBox>
  );
}

export default Prospectsindex;
