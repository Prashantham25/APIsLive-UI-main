import React, { useEffect, useState } from "react";
import { getRequest } from "core/clients/axiosclient";
import { DataGrid } from "@mui/x-data-grid";
import MDTypography from "../../../../../../components/MDTypography";
import { setpolicyData, useDataController } from "../../../../context";

const { Grid } = require("@mui/material");

function VehicleDetails({ vehicleType }) {
  console.log("key111", vehicleType);

  if (vehicleType === "16") {
    return (
      <MDTypography
        style={{
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: "Roboto",
        }}
      >
        Car
      </MDTypography>
    );
  }
  if (vehicleType === "17") {
    return (
      <MDTypography
        style={{
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: "Roboto",
        }}
      >
        Bike
      </MDTypography>
    );
  }
  if (vehicleType === "193") {
    return (
      <MDTypography
        style={{
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: "Roboto",
        }}
      >
        GCV
      </MDTypography>
    );
  }
  if (vehicleType === "194") {
    return (
      <MDTypography
        style={{
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: "Roboto",
        }}
      >
        PCV
      </MDTypography>
    );
  }
  return "";
}

function InsurerName({ partnerID }) {
  console.log("partnerID", partnerID);
  if (partnerID === "99") {
    return <MDTypography sx={{ fontSize: "14px" }}>Reliance</MDTypography>;
  }
  if (partnerID === "77") {
    return <MDTypography sx={{ fontSize: "14px" }}>ICICI</MDTypography>;
  }
  if (partnerID === "128") {
    return <MDTypography sx={{ fontSize: "14px" }}>Kotak</MDTypography>;
  }
  if (partnerID === "62") {
    return <MDTypography sx={{ fontSize: "14px" }}>GoDigit</MDTypography>;
  }
  if (partnerID === "73") {
    return <MDTypography sx={{ fontSize: "14px" }}>HDFC</MDTypography>;
  }
  if (partnerID === "86") {
    return <MDTypography sx={{ fontSize: "14px" }}>Bajaj</MDTypography>;
  }
  return "";
}
function Policies() {
  const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    {
      field: "id",
      headerName: "Policy Number",
      width: 220,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const rowId = params.value;

        return (
          <MDTypography
            // onClick={() => FetchPOSPDetails(rowId)}
            style={{
              color: "blue",
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
      field: "policyStartDate",
      headerName: "Policy Start Date",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "policyEndDate",
      headerName: "Policy End Date",
      width: 150,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "LOB",
      headerName: "LOB",
      width: 100,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => <VehicleDetails vehicleType={params.value} />,
    },
    {
      field: "partnerID",
      headerName: "InsurerName",
      width: 200,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => <InsurerName partnerID={params.value} />,
    },

    {
      field: "premiumAmount",
      headerName: "Premium",
      // type: "number",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
  ];
  const [policyData, setPolicyData] = useState([]);
  console.log("policyData", policyData);
  const [topPolicyData, settopPolicyData] = useState([]);
  console.log("topPolicyData", topPolicyData);
  const [, dispatch] = useDataController();
  useEffect(async () => {
    await getRequest(`Policy/GetAllPolicies?EmailId=nanditha.kn@inubesolutions.com`).then((res) => {
      console.log("result", res);
      setPolicyData(res.data);
      setpolicyData(dispatch, res.data);

      if (policyData.length > 0) {
        const topFourPolicies = policyData.filter((x, i) => i < 4);

        settopPolicyData(topFourPolicies);
      }
    });
  }, [policyData === 0]);
  const rows = policyData.map((row) => ({
    id: row.policyno,
    policyStartDate: row.policyStartDate,
    policyEndDate: row.policyEndDate,
    LOB: row.vehicleType,
    partnerID: row.partnerID,
    premiumAmount: row.premiumAmount,
  }));

  return (
    <Grid container style={{ paddingTop: "10px", paddingLeft: "25px", paddingRight: "8px" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <DataGrid
          sx={{ fontSize: "14px", fontWeight: "400" }}
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 15, 10, 20]}
          pagination
        />
      </Grid>
    </Grid>
  );
}

export default Policies;
