import React, { useEffect, useState } from "react";
import { Grid, Card, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { useHistory } from 'react-router-dom';
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MDTypography from "../../../../../components/MDTypography";
import { getAllClaimDetails } from "../data/index";
import { useDataController } from "../../../../BrokerPortal/context";

import MDButton from "../../../../../components/MDButton";

function TrackClaims() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [pageSize2, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [controller] = useDataController();
  const { policyData } = controller;
  console.log("policydata", policyData);
  const handleCustomerClaimIntimation = () => {
    // debugger;
    navigate("../Claims/CustomerClaimIntimation", {
      state: { trackClaimsPage: true, policyNo: location.state },
    });
    // navigate("/Claims/TrackClaims", { state: ClaimNumber });
  };
  // const claimData = {
  //   benefitType: "",
  //   coiNumber: location.state,
  //   claimNumber: "",
  //   claimStatus: "",
  //   uhid: "",
  //   productId: 1022,
  //   pageSize: 10,
  //   pageNumber: 1,
  // };
  const handleClick = async (e, id, newPageSize) => {
    setSelectedId(id);

    let currentPage1 = 1;
    if (newPageSize !== undefined) {
      currentPage1 = newPageSize;
    }
    if (location.state !== null) {
      const data1 = {
        benefitType: "",
        coiNumber: location.state,
        claimNumber: "",
        claimStatus: "",
        uhid: "",
        productId: 1022,
        pageSize: pageSize2,
        pageNumber: currentPage1,
      };

      const ClaimDetails = await getAllClaimDetails(data1);
      console.log(ClaimDetails.data, "claimdetails");

      const arr = [];

      if (ClaimDetails.status === 200) {
        ClaimDetails.data.forEach((x) => {
          arr.push({
            ClaimNO: x.claimNO,
            IntimationNO: x.intimationNO,
            PatientName: x.patientName,
            // insuredName: x.claimBasicDetails.memberDetails.insuredName,
            COIHolderName: x.coiHolderName,
            ClaimType: "Reimbursement",
            BenefitType: x.benefitType,
            ClaimAmount: x.claimAmount,
            ClaimStatus: x.claimStatus,
            DateandTime: new Date(x.dateandTime).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
          });

          setData([...arr]);
        });
      } else {
        console.log("No data found");
        swal({
          html: true,
          icon: "error",
          title: "No data found",
          text: "No data found",
        });
      }
    } else {
      console.log("Claim number not found at location");
      swal({
        html: true,
        icon: "error",
        title: "No data found",
        text: "Claim number not found at location",
      });
    }
  };

  useEffect(async () => {
    // debugger;
    if (location.state !== null) {
      const data1 = {
        benefitType: "",
        coiNumber: location.state,
        claimNumber: "",
        claimStatus: "",
        uhid: "",
        productId: 1022,
        pageSize: 10,
        pageNumber: 1,
        // COIHolderName: "",
      };

      const ClaimDetails = await getAllClaimDetails(data1);
      console.log("Trackclaimdetails", ClaimDetails.data);

      const arr = [];

      if (ClaimDetails.status === 200) {
        ClaimDetails.data.forEach((x) => {
          arr.push({
            ClaimNO: x.claimNO === "" ? "NA" : x.claimNO,
            IntimationNO: x.intimationNO,
            PatientName: x.patientName,
            // insuredName: x.claimBasicDetails.memberDetails.insuredName,
            COIHolderName: x.coiHolderName,
            ClaimType: "Reimbursement",
            BenefitType: x.benefitType,
            ClaimAmount: x.claimAmount,
            ClaimStatus: x.claimStatus,
            DateandTime: new Date(x.dateandTime).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
          });

          setData([...arr]);
        });
      } else {
        console.log("No data found");
        swal({
          html: true,
          icon: "error",
          title: "No data found",
          text: "No data found",
        });
      }
    } else {
      console.log("Claim number not found at location");
      swal({
        html: true,
        icon: "error",
        title: "No data found",
        text: "Claim number not found at location",
      });
    }
  }, []);
  const newData = data.map((row, index) => ({ ...row, id: index }));
  console.log("data123", data);
  const columns = [
    { field: "ClaimNO", headerName: "Claim No", width: 250 },
    { field: "IntimationNO", headerName: "Intimation No", width: 200 },
    { field: "PatientName", headerName: "Patient Name", width: 150 },
    { field: "COIHolderName", headerName: "COI Holder Name", width: 150 },
    { field: "ClaimType", headerName: "Claim Type", width: 150 },
    { field: "BenefitType", headerName: "Benefit Type", width: 150 },
    { field: "ClaimAmount", headerName: "Claimed Amount", width: 150 },
    { field: "ClaimStatus", headerName: "Claim Status", width: 150 },
    { field: "DateandTime", headerName: "Date", width: 150 },
  ];

  const handlePageSizeChange = (newPage) => {
    setPageSize(newPage);
  };
  const handlePageChange = async (e, newPageSize) => {
    if (newPageSize >= 1) {
      setCurrentPage(newPageSize);
      handleClick(e, selectedId, newPageSize);
    }
  };

  return (
    <Card>
      <Grid container>
        <Grid container p={2} justifyContent="center">
          <MDTypography variant="body1" color="primary">
            Track Registered Claims
          </MDTypography>
        </Grid>
        <Grid container mt={1} p={2}>
          <DataGrid
            autoHeight
            getRowId={(row) => row.id}
            rows={newData}
            columns={columns}
            onPageSizeChange={(params) => handlePageSizeChange(params)}
            onPageChange={(params) => handlePageChange(params)}
            rowsPerPageOptions={[5, 10]}
            pagination
            initialState={{
              ...newData,
              pagination: {
                ...newData.initialState?.pagination,
                paginationModel: { pageSize: pageSize2, page: currentPage },
              },
            }}
          />
        </Grid>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 25px" }}>
              <div>
                <IconButton
                  disabled={currentPage <= 1}
                  onClick={(e) => handlePageChange(e, currentPage - 1)}
                >
                  <KeyboardArrowLeft />
                  <span style={{ fontSize: "15px" }}>PREVIOUS</span>
                </IconButton>
              </div>
              <div>
                <IconButton
                  disabled={newData.length < 10}
                  onClick={(e) => handlePageChange(e, currentPage + 1)}
                >
                  <span style={{ fontSize: "15px" }}>NEXT</span>
                  <KeyboardArrowRight />
                </IconButton>
              </div>
            </div>
          </Grid>
        </Grid>

        <br />
        <Grid container justifyContent="center" p={2}>
          <MDButton color="error" onClick={() => handleCustomerClaimIntimation()}>
            Register New Claim
          </MDButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default TrackClaims;
