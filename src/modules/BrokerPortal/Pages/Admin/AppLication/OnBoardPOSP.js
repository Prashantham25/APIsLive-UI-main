import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import TableContainer from "@mui/material/TableContainer";
import SearchIcon from "@mui/icons-material/Search";

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import exportlogo from "assets/images/BrokerPortal/Admin/excel.png";
import { getRequest } from "core/clients/axiosclient";
import { Grid, Stack, IconButton, InputAdornment } from "@mui/material";

import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import {
  setAppReviewResponse,
  useDataController,
  setPOSPDetails1,
  setStepPar,
} from "../../../context";

import { ViewFiles } from "../../MyProfile/data/index";

function OnBoardPOSP() {
  const [review, setReview] = useState([]);
  const [controller, dispatch] = useDataController();
  const { StepPar, appReviewResponse } = controller;
  console.log("StepPar", StepPar);
  console.log("appReviewResponse", appReviewResponse);
  const navigate = useNavigate();
  const FetchPOSPDetails = async (row) => {
    await getRequest(`Partner/GetPOSPDetails?ApplicationNo=${row}`).then((result) => {
      console.log("data2 -->", result.data[0]);
      setAppReviewResponse(dispatch, result.data[0]);
      setPOSPDetails1(dispatch, JSON.stringify(result.data[0]));
      const Img = result.data[0].pospdetailsJson.RawImage;
      ViewFiles(Img).then((result1) => {
        if (result1.data !== "") {
          localStorage.setItem("ProfileImg", result1.data.data);
        }
        if (Object.keys(result.data[0].pospdetailsJson || {} || null).includes("UserPage")) {
          setStepPar(dispatch, 1);
        }

        navigate("/modules/BrokerPortal/Pages/Admin/AppLication/POSP");
      });
    });
  };
  const columns = [
    {
      field: "id",
      headerName: "Application No",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const rowId = params.value;

        return (
          <MDTypography
            onClick={() => FetchPOSPDetails(rowId)}
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {rowId}
          </MDTypography>
        );
      },
    },
    { field: "FirstName", headerName: "Applicant Name", width: 150, editable: false },
    { field: "createdDate", headerName: "Onboarded Date", width: 150, editable: false },
    { field: "DOB", headerName: "DOB", width: 150, editable: false },
    { field: "MobileNo", headerName: "Mobile", width: 150, editable: false },
    { field: "EmailId", headerName: "Email", width: 150, editable: false },
    { field: "Age", headerName: "Age", width: 150, editable: false },
  ];
  const detailsRows = review.map((row) => ({
    id: row.applicationNo,
    FirstName: row.pospdetailsJson.FirstName,
    createdDate: row.createdDate,
    DOB: row.pospdetailsJson.DOB,
    MobileNo: row.pospdetailsJson.MobileNo,
    EmailId: row.pospdetailsJson.EmailId,
    Age: row.pospdetailsJson.Age,
  }));
  const headerStyle = {
    background: "blue",
    color: "white",
  };
  const csvHeaders = columns.map((column) => {
    if (column.field === "id") {
      return { label: "Application Number", key: column.field, style: headerStyle };
    }
    return { label: column.headerName, key: column.field };
  });

  const csvData = detailsRows.map((row) =>
    columns.reduce((acc, column) => {
      acc[column.field] = row[column.field];
      return acc;
    }, {})
  );
  const GetAppsNo = async () => {
    await getRequest("Partner/GetPOSPDetails").then((Result) => {
      console.log("applications number", Result.data);
      setReview(Result.data);
    });
  };

  useEffect(() => {
    GetAppsNo();
  }, []);

  const handleRoutetoImportPOSP = () => {
    navigate("/modules/BrokerPortal/Pages/Admin/AppLication/ImportPOSPs");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Grid container>
      <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" mt={1} m={0}>
        <TableContainer component={Paper}>
          <Stack direction="row" justifyContent="space-between" p={2}>
            <MDTypography color="primary">OnBoarded Agents</MDTypography>
            <Stack direction="row" spacing={2}>
              <CSVLink data={csvData} headers={csvHeaders} filename="OnboardPOSP.csv">
                <MDButton color="success" variant="contained">
                  <MDBox
                    component="img"
                    src={exportlogo}
                    sx={{ maxHeight: "8.5rem", spacing: "1rem" }}
                  />
                  &nbsp; Export
                </MDButton>
              </CSVLink>

              <MDButton color="primary" variant="contained" onClick={handleRoutetoImportPOSP}>
                <MDBox component="img" src={exportlogo} />
                &nbsp; Import
              </MDButton>
            </Stack>
            <MDInput
              label="Search "
              sx={{ width: "auto" }}
              onChange={handleSearch}
              value={searchQuery}
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
          </Stack>
          <Grid container mt={1}>
            <MDBox sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={detailsRows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                headerStyle={{ background: "blue", color: "white" }}
                filterModel={{
                  items: [
                    { columnField: "FirstName", operatorValue: "contains", value: searchQuery },
                  ],
                }}
              />
            </MDBox>
          </Grid>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default OnBoardPOSP;
