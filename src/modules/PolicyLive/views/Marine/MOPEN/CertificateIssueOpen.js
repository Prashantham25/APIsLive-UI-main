import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useLocation } from "react-router-dom";
import AddCertificate from "assets/images/AddCertificate.png";
import { Grid, Card, IconButton, InputAdornment, Stack, Menu, MenuItem } from "@mui/material";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import { GetMasterPolicyGrid, HandleDownload } from "./data/index";
import { formatPropDate } from "./data/MOpenPolicyJson";

function CertificateIssueOpen() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ids, setId] = useState(-1);
  const [row, setRow] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [Search, setSearch] = useState([]);
  const [valid, setValid] = useState(false);
  const [createnew, setCreatNew] = useState(false);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const PolicyNo = query.get("PolicyNo");
  console.log("policyno", PolicyNo);

  useEffect(async () => {
    const result = await GetMasterPolicyGrid(PolicyNo);
    console.log("12345", result);
    if (result.data.length === 0) {
      setCreatNew(true);
    } else {
      setRow(result.data);
      setSearch(result.data);
    }
  }, []);

  const RowsDetails = row.map((item) => {
    const datetimeString = item.PolicyRequest["Certificate Date"];
    const datetime = new Date(datetimeString);
    const dateOnly = datetime.toISOString().split("T")[0];
    return {
      PolicyNo: item.PolicyRequest.PolicyNo,
      id: item.PolicyRequest.CertificateNo,
      InsurerName: item.PolicyRequest.NameOfInsured,
      AgentCode: item.PolicyRequest.BrokerAgentDirect,
      BalanceSumInsured: item.PolicyRequest.BalanceSIBeforeCurrentCertificate,
      BalancePremium: item.PolicyRequest.BalancePremiumBeforeCurrentCertificate,
      CertificateDate: formatPropDate(dateOnly),
    };
  });

  const handleView = (event, i) => {
    setAnchorEl(event.currentTarget);
    setId(i);
  };
  const navigate = useNavigate();
  const handleViewCertificate = (id) => {
    console.log("id", id);
    navigate(`/Marine/MOPEN/ViewCertificateOpen?CertificateNo=${id}`);
  };
  const handleCreateCertificate = () => {
    navigate(`/Marine/MOPEN/CreateCertificateOpen?PolicyNumber=${PolicyNo}`);
  };
  const columns = [
    { field: "PolicyNo", headerName: "Policy Number", width: 220 },

    { field: "id", headerName: "Certificate Name", width: 280 },
    { field: "InsurerName", headerName: "Insurer Name", width: 350 },
    { field: "AgentCode", headerName: "Agent Code", width: 150 },
    { field: "BalanceSumInsured", headerName: "Balance Sum Insured", width: 200 },
    { field: "BalancePremium", headerName: "Balance Premium", width: 190 },
    { field: "CertificateDate", headerName: "Certificate Date", width: 180 },
    {
      field: "Action",
      width: 150,
      renderCell: (params) => {
        const rowId = params.row.id;

        return (
          <>
            <MoreVertIcon fontSize="medium" onClick={(e) => handleView(e, params.row.id)} />
            <Menu
              anchorEl={anchorEl}
              open={ids === params.row.id && Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleViewCertificate(rowId)}>View Certificate </MenuItem>
              <MenuItem onClick={() => HandleDownload(rowId)}>Download Certificate</MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const handleSerach = (e) => {
    const apps = Search.filter(
      (item) =>
        item.PolicyRequest.CertificateNo.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.PolicyRequest.NameOfInsured.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    if (apps.length === 0) {
      setValid(true);
    } else {
      setValid(false);
    }
    setRow(apps);
  };

  const handleBack = () => {
    navigate(`/Marine/MOPEN`);
  };
  return (
    <MDBox mt={3}>
      <Card sx={{ borderRadius: "1px" }}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={4} mb={1} mt={2}>
          <MDButton
            variant="outlined"
            color="error"
            onClick={() => handleBack()}
            sx={{ borderRadius: "1px" }}
          >
            GO BACK
          </MDButton>
        </Grid>
        <Stack direction="row" spacing={5} mb={4}>
          <Grid container mt={1}>
            <Grid xs={2.5} ml={3}>
              <MDTypography>Certificate Issued</MDTypography>
            </Grid>

            <Stack direction="row">
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                Master Policy No:
              </MDTypography>
              <MDTypography sx={{ color: "#0000FF", ml: 2 }}>{PolicyNo}</MDTypography>
            </Stack>
          </Grid>
        </Stack>
        {createnew ? (
          <>
            <Grid item sm={12} md={12} lg={12} xl={12} xxl={3} ml={50} mt={7}>
              <MDBox component="img" src={AddCertificate} />
            </Grid>
            <Grid item sm={12} md={12} lg={12} xl={12} xxl={3} ml={50} mt={1}>
              <MDTypography sx={{ fontSize: "1.15rem", color: "#000000" }}>
                No certificate Were added
              </MDTypography>
            </Grid>
            <Grid item sm={12} md={12} lg={12} xl={12} xxl={3} ml={51} mt={1}>
              <MDTypography sx={{ fontSize: "1rem" }}>Click here to add certificate</MDTypography>
            </Grid>
            <Grid item sm={12} md={12} lg={12} xl={12} xxl={3} ml={51} mt={2} mb={19}>
              <MDButton startIcon={<AddIcon />} color="error" onClick={handleCreateCertificate}>
                Add Certificate
              </MDButton>
            </Grid>
          </>
        ) : (
          <>
            <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" mt={1} m={0}>
              <Stack direction="row" justifyContent="space-between" p={1}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={2}>
                  <MDInput
                    label="Search "
                    sx={{ width: "auto" }}
                    onChange={handleSerach}
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
                <Grid xs={4}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    alignItems="center"
                    mr={2}
                  >
                    <MDButton
                      startIcon={<AddIcon />}
                      color="error"
                      onClick={handleCreateCertificate}
                    >
                      Add Certificate
                    </MDButton>
                  </Stack>
                </Grid>
              </Stack>
            </Grid>

            <Grid container mt={1}>
              <MDBox sx={{ height: 400, width: "100%", ml: 3, mr: 3 }}>
                <DataGrid
                  rows={RowsDetails}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  pagination
                  // RowsDetails={RowsDetails}
                  Search={row}
                />
              </MDBox>
            </Grid>
          </>
        )}
      </Card>
    </MDBox>
  );
}
export default CertificateIssueOpen;
