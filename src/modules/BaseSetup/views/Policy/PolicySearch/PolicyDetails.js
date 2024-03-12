import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DownloadIcon from "@mui/icons-material/Download";
import MDTypography from "../../../../../components/MDTypography";

function RenderControl({ item, policyJsonData }) {
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput label={item.label} name={item.name} value={policyJsonData[item.name]} />
            );
          case "DataGrid":
            return (
              <DataGrid
                autoHeight
                width="100%"
                rows={item.value || []}
                columns={item.columns}
                getRowId={(option) => option[item.rowId]}
                // onRowClick={item.onRowClick}
              />
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function PolicyDetails({ policyJsonData, handleCkycDownload }) {
  console.log("policyJsonData", policyJsonData);
  // const [datagrid, setDatagrid] = useState([]);
  const controlItems = [
    { type: "Input", label: "Proposer Name", visible: true, name: "proposerName" },
    { type: "Input", label: "Proposer Address", visible: true, name: "Address" },
    { type: "Input", label: "Contact No.", visible: true, name: "mobileNumber" },
    { type: "Input", label: "Policy Start Date", visible: true, name: "sDate" },
    { type: "Input", label: "Policy End Date", visible: true, name: "eDate" },
    { type: "Input", label: "Premium Paid (Rs.)", visible: true, name: "premiumAmount" },
    { type: "Input", label: "Policy Number", visible: true, name: "PolicyNumber" },
    { type: "Input", label: "Policy Status", visible: true, name: "policyStatus" },
    { type: "Input", label: "Plan Name", visible: true, name: "planName" },
    { type: "Input", label: "Policy Tenure", visible: true, name: "policyTenure" },
    { type: "Input", label: "Sum Insured", visible: true, name: "SumInsured" },
    { type: "Input", label: "Number of People Covered", visible: true, name: "noOfPplCovered" },
    { type: "Input", label: "Nominee Name", visible: true, name: "NomineeName" },
    { type: "Input", label: "Nominee Relation", visible: true, name: "NomineeRelation" },
    { type: "Input", label: "Agent Name", visible: true, name: "AgentName" },
    { type: "Input", label: "Agent ID", visible: true, name: "AgentID" },
    { type: "Input", label: "Geographical coverage", visible: true, name: "Geography" },
    { type: "Input", label: "Renewal due date", visible: true, name: "Renewalduedate" },
    { type: "Input", label: "Trip Type", visible: true, name: "TripType" },
    {
      type: "Input",
      label: "Master Policy Number",
      visible: policyJsonData.flag,
      name: "MasterPolicyNo",
    },
    {
      type: "Input",
      label: "Master Policy Holder Name",
      visible: policyJsonData.flag,
      name: "MasterPolicyholderName",
    },
    {
      type: "Input",
      label: "Master Policy Start Date",
      visible: policyJsonData.flag,
      name: "MasterPolicyStartDate",
    },
    {
      type: "Input",
      label: "Master Policy End Date",
      visible: policyJsonData.flag,
      name: "MasterPolicyEndDate",
    },
  ];
  const ekycControl = [
    { type: "Input", label: "CKYC No", visible: true, name: "CKYCNo", required: true },
    { type: "Input", label: "PAN No", visible: true, name: "PanNo", required: true },
    {
      type: "Input",
      label: "Father Name",
      visible: policyJsonData.FatherName !== "",
      name: "FatherName",
    },
    { type: "Input", label: "Address 01", visible: true, name: "Address1" },
    { type: "Input", label: "Address 02", visible: true, name: "Address2" },
    { type: "Input", label: "Pin Code", visible: true, name: "Pincode" },
    { type: "Input", label: "City", visible: true, name: "City" },
    { type: "Input", label: "District", visible: true, name: "District" },
    { type: "Input", label: "State", visible: true, name: "State" },
    {
      type: "DataGrid",
      spacing: 12,
      visible: true,
      rowId: "DocType",
      value: policyJsonData.Docdetails,
      columns: [
        { field: "DocType", headerName: "Document Type", headerAlign: "center", width: 250 },
        {
          field: "DocName",
          headerName: "Document Name",
          headerAlign: "center",
          width: 250,
        },
        {
          field: "Action",
          headerName: "Action",
          headerAlign: "right",
          width: 300,
          renderCell: (param) => (
            <MDButton
              size="medium"
              variant="text"
              onClick={(e) => handleCkycDownload(e, param.row.DocName)}
              startIcon={<DownloadIcon fontSize="large" variant="contained" />}
              // sx={{ textAlign: "right" }}
              sx={{ ml: "14rem" }}
            />
          ),
        },
      ],
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} policyJsonData={policyJsonData} />
          </Grid>
        ) : null
      )}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography sx={{ color: "#0080ff" }}>EKYC Details</MDTypography>
      </Grid>
      <Grid container spacing={2} p={2}>
        {ekycControl.map((item) =>
          item.visible ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={item.spacing ? item.spacing : 4}
              lg={item.spacing ? item.spacing : 4}
              xl={item.spacing ? item.spacing : 4}
              xxl={item.spacing ? item.spacing : 4}
            >
              <RenderControl item={item} policyJsonData={policyJsonData} />
            </Grid>
          ) : null
        )}
      </Grid>
    </Grid>
  );
}

export default PolicyDetails;
