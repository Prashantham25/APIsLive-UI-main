import React, { useState, useEffect } from "react";
import { getRequest } from "core/clients/axiosclient";
import { DataGrid } from "@mui/x-data-grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Paper, Grid, Card, Autocomplete, InputAdornment, IconButton, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import MDInput from "components/MDInput";
import FilterListIcon from "@mui/icons-material/FilterList";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import exportlogo from "assets/images/BrokerPortal/Admin/excel.png";

const Reports = [
  { label: "Total Prospects" },
  { label: "Total Leads" },
  { label: "Total Clients" },
];

function CRMReports() {
  const breadcrumbs = [
    <MDTypography fontSize="18px" fontWeight="400" fontFamily="Roboto">
      Home
    </MDTypography>,
    <MDTypography fontSize="18px" fontWeight="400" fontFamily="Roboto">
      CRM
    </MDTypography>,
    <MDTypography
      fontSize="18px"
      fontWeight="400"
      fontFamily="Roboto"
      sx={{
        cursor: "pointer",
        color: "#0071D9",
        textDecoration: "underline",
      }}
    >
      Report
    </MDTypography>,
  ];

  const [pageSize, setPageSize] = React.useState(5);
  const [prospectFetch, setprospectFetch] = useState([]);
  useEffect(async () => {
    await getRequest(`Lead/ViewDetails?ProspectID=&Type=prospect&status=`).then((res) => {
      console.log("1234", res);
      setprospectFetch(res.data);
    });
  }, [prospectFetch === 0]);
  const columnsp = [
    {
      field: "id",
      headerName: "Prospect ID",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const rowId = params.value;
        return (
          <MDTypography
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

    {
      field: "prospectName",
      headerName: "Prospect Name",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "createdDate",
      headerName: "Created Date",
      width: 150,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "MobileNo",
      headerName: "Mobile Number",
      width: 150,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "Email",
      headerName: "Email id",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "OpportunitiesMapped",
      headerName: "Opportunities Mapped",
      sortable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "generateBy",
      headerName: "Generate By",
      sortable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "AssignedTo",
      headerName: "Assigned To",
      sortable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
  ];

  const rowsp = prospectFetch.map((row) => ({
    id: row.ProspectDetailsJson.ProspectId,
    prospectName: row.ProspectDetailsJson.Name,
    createdDate: row.ProspectDetailsJson.CreatedDate,
    MobileNo: row.ProspectDetailsJson.MobileNumber,
    Email: row.ProspectDetailsJson.Email,
    OpportunitiesMapped: "Car",
    generateBy: "Self",
    AssignedTo: "",
  }));

  //   const columnsl = [
  //     {
  //       field: "id",
  //       headerName: "Lead ID",
  //       width: 260,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //       renderCell: (params) => {
  //         const rowId = params.value;
  //         return (
  //           <MDTypography
  //             style={{
  //               color: "blue",
  //               textDecoration: "underline",
  //               cursor: "pointer",
  //             }}
  //           >
  //             {rowId}
  //           </MDTypography>
  //         );
  //       },
  //     },
  //     {
  //       field: "leadName",
  //       headerName: "Lead Name",
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },
  //     {
  //       field: "createdDate",
  //       headerName: "Created Date",
  //       width: 150,
  //       sortable: false,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "MobileNo",
  //       headerName: "Mobile Number",
  //       width: 150,
  //       sortable: false,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "Email",
  //       headerName: "Email id",
  //       // type: "number",
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "OpportunitiesMapped",
  //       headerName: "Opportunities Mapped",
  //       sortable: false,
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "generateBy",
  //       headerName: "Generate By",
  //       sortable: false,
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "AssignedTo",
  //       headerName: "Assigned To",
  //       sortable: false,
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "NoofQuotes",
  //       headerName: "No of Quotes ",
  //       sortable: false,
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },
  //   ];

  //   const rowsl = quoteFetch.map((row) => ({
  //     id: row.ProspectId,
  //     leadName: row.Name,
  //     createdDate: row.createdDate.slice(0, 10),
  //     MobileNo: row.Mobile,
  //     Email: row.Email,
  //     OpportunitiesMapped: "Car",
  //     generateBy: "Self",
  //     AssignedTo: "",
  //     NoofQuotes: "2",
  //   }));

  //   const columnsc = [
  //     {
  //       field: "id",
  //       headerName: "Prospect ID",
  //       width: 260,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //       renderCell: (params) => {
  //         const rowId = params.value;
  //         return (
  //           <MDTypography
  //             style={{
  //               color: "blue",
  //               textDecoration: "underline",
  //               cursor: "pointer",
  //             }}
  //           >
  //             {rowId}
  //           </MDTypography>
  //         );
  //       },
  //     },
  //     {
  //       field: "prospectName",
  //       headerName: "Prospect Name",
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },
  //     {
  //       field: "createdDate",
  //       headerName: "Created Date",
  //       width: 150,
  //       sortable: false,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "MobileNo",
  //       headerName: "Mobile Number",
  //       width: 150,
  //       sortable: false,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "Email",
  //       headerName: "Email id",
  //       // type: "number",
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "OpportunitiesMapped",
  //       headerName: "Opportunities Mapped",
  //       sortable: false,
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "generateBy",
  //       headerName: "Generate By",
  //       sortable: false,
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "AssignedTo",
  //       headerName: "Assigned To",
  //       sortable: false,
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "NoofPolicies",
  //       headerName: "No of policies ",
  //       sortable: false,
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },

  //     {
  //       field: "NoofQuotes",
  //       headerName: "No of Quotes ",
  //       sortable: false,
  //       width: 150,
  //       headerClassName: "super-app-theme--header",
  //       headerAlign: "left",
  //       align: "left",
  //     },
  //   ];

  //   const rowsc = quoteFetch.map((row) => ({
  //     id: row.ProspectId,
  //     leadName: row.Name,
  //     createdDate: row.createdDate.slice(0, 10),
  //     MobileNo: row.Mobile,
  //     Email: row.Email,
  //     OpportunitiesMapped: "Car",
  //     generateBy: "Self",
  //     AssignedTo: "",
  //     NoofPolicies: "2",
  //     NoofQuotes: "1",
  //   }));

  return (
    <MDBox sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", height: "100%", mb: 2 }}>
        <Breadcrumbs
          p={1}
          fontSize="small"
          mx={1}
          separator={<KeyboardDoubleArrowRightOutlinedIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        <MDTypography
          mx={2}
          style={{
            fontSize: "20px",
            fontWeight: "500",
            fontFamily: "Roboto",
            lineHeight: "32px",
          }}
        >
          CRM Reports
        </MDTypography>
        <MDBox p={2}>
          <Grid container>
            <Card
              sx={{
                borderRadius: "5px",
                backgroundColor: "#DEEFFD",
                width: "100%",
                height: "100%",
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ mt: "2rem" }}>
                <MDTypography fontSize="15px" sx={{ fontWeight: "600", textAlign: "center" }}>
                  Pre defined Report
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "5px!important",
                    },
                    width: 300,
                    mt: "1rem",
                    ml: "22rem",
                    mb: "2rem",
                  }}
                  options={Reports}
                  renderInput={(params) => (
                    <MDInput {...params} placeholder="Select Reports" label="Select Reports" />
                  )}
                />
              </Grid>
            </Card>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={12} md={9.1} lg={9.1} xl={9.1} xxl={9.1}>
              <MDBox style={{ marginTop: "2rem" }}>
                <MDTypography style={{ fontSize: "16px", fontWeight: "600", color: "primary" }}>
                  Total Prospects
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={2.9} lg={2.9} xl={2.9} xxl={2.9}>
              <MDBox style={{ marginTop: "2rem" }}>
                <MDButton
                  sx={{
                    height: "auto",
                    width: "auto",
                    borderRadius: "2px",
                  }}
                >
                  Total No of Prospects:629
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDBox style={{ marginTop: "2rem" }}>
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "5px!important",
                    },
                    width: 150,
                    mt: "1rem",
                    // ml: "20rem",
                    mb: "2rem",
                  }}
                  options={Reports}
                  renderInput={(params) => (
                    <MDInput {...params} placeholder="Select Reports" label="Sort by Year" />
                  )}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDBox style={{ marginTop: "2rem" }}>
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "5px!important",
                    },
                    width: 150,
                    mt: "1rem",
                    // ml: "20rem",
                    mb: "2rem",
                  }}
                  options={Reports}
                  renderInput={(params) => (
                    <MDInput {...params} placeholder="Select Reports" label="Sort by Quarter" />
                  )}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDBox style={{ marginTop: "2rem" }}>
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "5px!important",
                    },
                    width: 150,
                    mt: "1rem",
                    // ml: "20rem",
                    mb: "2rem",
                  }}
                  options={Reports}
                  renderInput={(params) => (
                    <MDInput {...params} placeholder="Select Reports" label="Sort by Month" />
                  )}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDBox style={{ marginTop: "2rem" }}>
                <MDInput
                  label="Search "
                  sx={{ fontSize: "16px", fontWeight: "400" }}
                  //   onChange={handleSearch}
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
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              {/* <MDBox style={{ marginTop: "2rem" }}> */}
              <MDBox sx={{ mt: "2rem", ml: "7rem", width: 150 }}>
                <MDButton color="success" variant="outlined">
                  <MDBox
                    component="img"
                    src={exportlogo}
                    sx={{
                      maxHeight: "8.5rem",
                      spacing: "0.5rem",
                      fontSize: "14px",
                      fontWeight: "500",
                      width: "20%",
                    }}
                    justifyContent="space-between"
                  />
                  EXPORT CSV
                </MDButton>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              {/* <MDBox style={{ marginTop: "2.5rem" }}> */}
              <MDBox sx={{ mt: "2.5rem", ml: "7rem" }}>
                <FilterListIcon color="primary" />
              </MDBox>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox>
              <MDTypography
                p={1}
                color="primary"
                style={{
                  fontSize: "14px",
                  textAlign: "end",
                  textDecoration: "underline",
                  marginTop: "-1.6rem",
                }}
              >
                Reset Filters
              </MDTypography>
            </MDBox>
          </Grid>

          <MDBox>
            <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" m={0}>
              <Stack justifyContent="space-between" p={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    sx={{ fontSize: "14px", fontWeight: "400" }}
                    autoHeight
                    rows={rowsp}
                    columns={columnsp}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    pagination
                  />
                </Grid>
              </Stack>
            </Grid>
          </MDBox>
        </MDBox>
      </Paper>
    </MDBox>
  );
}
export default CRMReports;
