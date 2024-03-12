import { Grid, IconButton, Divider, TextField, Drawer, Autocomplete } from "@mui/material";
import Swal from "sweetalert2";
import swal from "sweetalert";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";
import MDInput from "../../../../../../components/MDInput";
import MDBox from "../../../../../../components/MDBox";
import { setClaimsJson } from "../../../../../BrokerPortal/context/index";

let flag = false;
let Assessmentflag = false;
let Totallossflag = false;
let CashLossflag = false;
let ConstructiveTotal = false;
// let Addbutton = false;
let FileMovementFlag = false;
let DrawerclaimSearch = false;
let RIApproval = false;
let DVsearchFlag = false;
let filesUpload = [
  {
    file: "",
    filename: "",
    filetype: "",
  },
];
const getTopLevelContent = (navigate, ClaimsJson, dispatch) => {
  const handleFileMovement = () => {
    FileMovementFlag = true;
    setClaimsJson(dispatch, { ...ClaimsJson });
  };

  const handleFileMovementClose = () => {
    FileMovementFlag = false;
    DrawerclaimSearch = false;
    RIApproval = false;
    setClaimsJson(dispatch, { ...ClaimsJson });
  };

  const handleDrawersearch = () => {
    DrawerclaimSearch = true;
    setClaimsJson(dispatch, { ...ClaimsJson });
  };

  const handleRIApproval = () => {
    RIApproval = true;
    setClaimsJson(dispatch, { ...ClaimsJson });
  };
  const topLevelContent = [
    {
      type: "Typography",
      label: "Claim Number :",

      value: "",
      visible: true, // SD ,RI,cl app,

      InputProps: { readOnly: true },
      path: "",
      spacing: 6,
    },
    {
      type: "Button",
      label: "Claim File Movement",
      value: "",
      visible: true, // SD ,RI,cl app,
      customOnChange: () => handleFileMovement(),
      path: "",
      spacing: 6,
    },

    {
      type: "Custom",
      visible: FileMovementFlag === true,
      spacing: 12,
      return: (
        <Drawer
          anchor="right"
          open={FileMovementFlag}
          onClose={handleFileMovementClose}
          PaperProps={{
            sx: { width: "80%", padding: "32px" },
          }}
        >
          <MDBox>
            <Grid container>
              <Grid item xs={11}>
                <MDTypography mb={2}>Claim File Movement</MDTypography>
              </Grid>
              <Grid item xs={1} justifyContent="flex-end">
                <MDButton
                  startIcon={<CloseIcon />}
                  sx={{ fontsize: "2rem" }}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  variant="text"
                  color="black"
                  onClick={handleFileMovementClose}
                />
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <MDInput
                    name="ClaimNO"
                    label="Claim Number"
                    // onChange={(e) => handlePlanGroup(e)}
                    // value={plan[0].DisplayName}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MDButton
                    sx={{ justifyContent: "right" }}
                    variant="contained"
                    onClick={handleDrawersearch}
                  >
                    SEARCH
                  </MDButton>
                </Grid>
              </Grid>
              {DrawerclaimSearch && (
                <>
                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <MDInput
                        label="Policy No."
                        name="PolicyNo"
                        disabled="true"
                        // value={Logindata.UserName}
                        // onChange={(e) => handleUserName(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <MDInput
                        label="Insured Name"
                        name="InsuredName"
                        disabled="true"
                        // value={Logindata.UserName}
                        // onChange={(e) => handleUserName(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <MDInput
                        label="Claim Intimation Date"
                        name="ClaimIntimationDate"
                        disabled="true"
                        // value={Logindata.UserName}
                        // onChange={(e) => handleUserName(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <MDInput
                        label="Claim Status"
                        name="ClaimStatus"
                        disabled="true"
                        // value={Logindata.UserName}
                        // onChange={(e) => handleUserName(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <MDInput
                        label="Estimated Amount"
                        name="EstimatedAmount"
                        disabled="true"
                        // value={Logindata.UserName}
                        // onChange={(e) => handleUserName(e)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <Autocomplete
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px!important",
                          },
                        }}
                        name="UserGroup/User"
                        options={[]}
                        // options={masters.groupUser}
                        getOptionLabel={(option) => option.mValue}
                        // onChange={(event, value) => handleAutocomplete(event, value, "TreatyType")}
                        renderInput={(params) => <MDInput {...params} label="User Group/User" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <Autocomplete
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px!important",
                          },
                        }}
                        name="PleaseSelectUser"
                        options={[]}
                        // options={masters.userlist}
                        getOptionLabel={(option) => option.mValue}
                        // onChange={(event, value) => handleAutocomplete(event, value, "TreatyType")}
                        renderInput={(params) => <MDInput {...params} label="Please Select User" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <MDInput
                        label="File Moved Date/Time"
                        name="FileMovedDate/Time"
                        disabled="true"
                        // value={Logindata.UserName}
                        // onChange={(e) => handleUserName(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                      <MDInput
                        label="Remarks"
                        name="Remarks"

                        // value={Logindata.UserName}
                        // onChange={(e) => handleUserName(e)}
                      />
                    </Grid>
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <MDInput label="User" name="User" disabled />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <MDInput label="Assigned Date" name="Assigned Date" disabled />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <MDInput label="Assigned By" name="Assigned By" disabled />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <MDInput label="Assigned To" name="Assigned To" disabled />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <MDInput label="Remarks" name="Remarks" disabled />
                      </Grid>
                      <Grid container justifyContent="center" mt={3}>
                        <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                          <MDButton
                            variant="contained"
                            color="primary"
                            display="flex"
                            sx={{ mr: 5 }}
                            // onClick={handleSaveFileMovement}
                          >
                            Save
                          </MDButton>
                          <MDBox sx={{ flex: "1 1 auto" }} />

                          <MDButton
                            // variant="outlined"
                            variant="contained"
                            display="flex"
                            color="primary"
                            sx={{
                              justifyContent: "flex-end",
                              whiteSpace: "nowrap",
                            }}
                            // onClick={() => handleClaim()}
                          >
                            Cancel
                          </MDButton>
                        </MDBox>
                      </Grid>
                      {ClaimsJson.claimsMenuId === 2 && (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                          <MDButton
                            variant="contained"
                            color="primary"
                            display="flex"
                            sx={{ mr: 5 }}
                            onClick={handleRIApproval}
                          >
                            Send for RI Approval
                          </MDButton>
                        </Grid>
                      )}
                      {RIApproval && (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                          <MDInput label="Remarks" name="Remarks" />
                        </Grid>
                      )}
                      {/* 
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <MDButton
                          variant="contained"
                          color="primary"
                          display="flex"
                          sx={{ mr: 5 }}
                          // onClick={handleRIApproval}
                        >
                          Submit
                        </MDButton>
                      </Grid> */}
                    </Grid>
                    {/* {saveFileMove && (
                      <Grid container p={2}>
                        <DataGrid
                          autoHeight
                          rows={fileMovementRows}
                          columns={fileMovementColumns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          disableSelectionOnClick
                          // getRowId={(row) => row.PolicyNo}
                          // onRowClick={(param) => handleMemberClick(param)}
                        />
                      </Grid>
                    )} */}
                  </Grid>
                </>
              )}
            </Grid>
          </MDBox>
        </Drawer>
      ),
    },

    {
      type: "Input",
      label: "Policy Number",

      visible:
        ClaimsJson.claimsMenuId === 2 ||
        ClaimsJson.claimsMenuId === 4 ||
        ClaimsJson.claimsMenuId === 5 ||
        ClaimsJson.claimsMenuId === 6 ||
        ClaimsJson.claimsMenuId === 7 ||
        ClaimsJson.claimsMenuId === 8 ||
        ClaimsJson.claimsMenuId === 9 ||
        ClaimsJson.claimsMenuId === 10 ||
        ClaimsJson.claimsMenuId === 1, // SD ,RI,cl app,DV,cl sett,sur fee app,sur fee sett,CW,Claim ass

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Insured Name",
      name: "InsuredName",

      visible:
        ClaimsJson.claimsMenuId === 2 ||
        ClaimsJson.claimsMenuId === 4 ||
        ClaimsJson.claimsMenuId === 5 ||
        ClaimsJson.claimsMenuId === 7 ||
        ClaimsJson.claimsMenuId === 8 ||
        ClaimsJson.claimsMenuId === 9 ||
        ClaimsJson.claimsMenuId === 10 ||
        ClaimsJson.claimsMenuId === 1, // SD ,RI,cl app,cl sett,sur fee app,sur fee sett,CW,Claim ass

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },

    {
      type: "Input",
      label: "Claimant",
      name: "Claimant",

      visible:
        ClaimsJson.claimsMenuId === 6 ||
        ClaimsJson.claimsMenuId === 10 ||
        ClaimsJson.claimsMenuId === 1, // SD,DV,CW

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "DateTime",
      label: "Claim Intimation Date",
      visible:
        ClaimsJson.claimsMenuId === 2 ||
        ClaimsJson.claimsMenuId === 4 ||
        ClaimsJson.claimsMenuId === 5 ||
        ClaimsJson.claimsMenuId === 7 ||
        ClaimsJson.claimsMenuId === 9 ||
        ClaimsJson.claimsMenuId === 10 ||
        ClaimsJson.claimsMenuId === 1, // SD ,RI,cl app,cl sett,sur fee sett,CW,Claim ass
      name: "ClaimIntimationDate",

      path: "",
      InputProps: { readOnly: true },
      spacing: 3,
    },
    {
      type: "Input",
      label: "Claim Status",
      name: "ClaimStatus",
      value: "Claim Registration",
      visible:
        ClaimsJson.claimsMenuId === 2 ||
        ClaimsJson.claimsMenuId === 5 ||
        ClaimsJson.claimsMenuId === 6 ||
        ClaimsJson.claimsMenuId === 7 ||
        ClaimsJson.claimsMenuId === 8 ||
        ClaimsJson.claimsMenuId === 9 ||
        ClaimsJson.claimsMenuId === 10 ||
        ClaimsJson.claimsMenuId === 1, // SD,cl app,DV,cl sett,sur fee app,sur fee sett,CW,claim ass

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Surveyor Status",
      name: "SurveyorStatus",

      visible: ClaimsJson.claimsMenuId === 1, // Sd

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Total Payable",

      visible: ClaimsJson.claimsMenuId === 3, // Claim Advance Payment

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Claimant Name",

      visible: ClaimsJson.claimsMenuId === 3, // Claim Advance Payment

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Endorsement Number",

      visible:
        ClaimsJson.claimsMenuId === 4 ||
        ClaimsJson.claimsMenuId === 5 ||
        ClaimsJson.claimsMenuId === 6 ||
        ClaimsJson.claimsMenuId === 7, // RI,cl app,DV,cl sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Sum Insured",

      visible: ClaimsJson.claimsMenuId === 4, // RI

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Sum Insured Balance",

      visible: ClaimsJson.claimsMenuId === 4, // RI

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Surveryor Name",

      visible:
        ClaimsJson.claimsMenuId === 5 ||
        ClaimsJson.claimsMenuId === 6 ||
        ClaimsJson.claimsMenuId === 8 ||
        ClaimsJson.claimsMenuId === 9 ||
        ClaimsJson.claimsMenuId === 10, // cl app,DV,sur fee app,sur fee sett,CW

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Surveryor Fee",

      visible:
        ClaimsJson.claimsMenuId === 10 ||
        ClaimsJson.claimsMenuId === 5 ||
        ClaimsJson.claimsMenuId === 7 ||
        ClaimsJson.claimsMenuId === 8 ||
        ClaimsJson.claimsMenuId === 9, // cl app,DV,cl sett,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Assessed Amount",

      visible:
        ClaimsJson.claimsMenuId === 5 ||
        ClaimsJson.claimsMenuId === 8 ||
        ClaimsJson.claimsMenuId === 9 ||
        ClaimsJson.claimsMenuId === 10, // cl app,,sur fee app,sur fee sett,CW

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Claim Advance Paid",

      visible: ClaimsJson.claimsMenuId === 5 || ClaimsJson.claimsMenuId === 10, // cl app,CW

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Total Payable to Client",

      visible: ClaimsJson.claimsMenuId === 6, // DV

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Net Payable",

      visible: ClaimsJson.claimsMenuId === 6 || ClaimsJson.claimsMenuId === 7, // DV,cl sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Total Surveyor Fee",

      visible: ClaimsJson.claimsMenuId === 6, // DV

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Salvage Recovery",

      visible: ClaimsJson.claimsMenuId === 6 || ClaimsJson.claimsMenuId === 7, // DV,cl sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Receipt Number",

      visible: ClaimsJson.claimsMenuId === 7, // cl sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "DateTime",
      label: "Collection Date",

      visible: ClaimsJson.claimsMenuId === 7, // cl sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "DateTime",
      label: "Loss Assessed",

      visible: ClaimsJson.claimsMenuId === 7, // cl sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Reinstate Premium",

      visible: ClaimsJson.claimsMenuId === 7, // cl sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Total Advance Paid",

      visible: ClaimsJson.claimsMenuId === 7, // cl sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Surveyor TDS",

      visible: ClaimsJson.claimsMenuId === 7, // cl sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Surveyor Type",

      visible: ClaimsJson.claimsMenuId === 8, // ,sur fee app

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Place of Surveyor",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "VAT Amount",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Less: TDS",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Other Fee",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Other Fee (Taxable)",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Add : VAT Amount",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Less: TDS1",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Total Surveyor Fee",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Advance Payment",

      visible: ClaimsJson.claimsMenuId === 8, // ,sur fee app

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Total Payable",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "DateTime",
      label: "Surveyor Deputed on",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "DateTime",
      label: "Report Submitted On",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Your Approval Limit",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Status",

      visible: ClaimsJson.claimsMenuId === 8 || ClaimsJson.claimsMenuId === 9, // ,sur fee app,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Total TDS",

      visible: ClaimsJson.claimsMenuId === 9, // ,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Less Advance Payment",

      visible: ClaimsJson.claimsMenuId === 9, // ,sur fee sett

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Surveyor Types",
      visible: ClaimsJson.claimsMenuId === 9,
      path: "",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Year",

      visible: ClaimsJson.claimsMenuId === 2, // Claim ass

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Month",

      visible: ClaimsJson.claimsMenuId === 2, // Claim ass

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Day",

      visible: ClaimsJson.claimsMenuId === 2, // Claim ass

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Total Month",

      visible: ClaimsJson.claimsMenuId === 2, // Claim ass

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "DateTime",
      label: "Loss Date",

      visible: ClaimsJson.claimsMenuId === 2, // Claim ass

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Estimated Amount",

      visible: ClaimsJson.claimsMenuId === 2, // Claim ass

      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
  ];
  return topLevelContent;
};
const getBottomContent = () => {
  const data = [
    {
      type: "Button",
      label: "Submit",
      // name: "claimNo",
      // value: ClaimsJson.claimNumber,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
    },
  ];
  return data;
};
const getMenuList = (ClaimsJson, ids) => {
  // debugger;
  console.log("id", ids);
  const menus = [
    {
      name: "Surveyor Deputation",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 1,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Report Submission",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 1 && flag === true,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Surveyor Report",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 1 && flag === true,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Claim Assessment",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 2,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Repair/Human Casualty Basis ",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 2 && Assessmentflag === true,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Total Loss Basis",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 2 && Totallossflag === true,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Cash Loss Basis",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 2 && CashLossflag === true,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Constructive Total Loss ",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 2 && ConstructiveTotal === true,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Master Calculation",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 2,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Claim Advance Payment",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 3,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "RI Approval",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 4,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Claim Approval",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 5,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "RI Details",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 5,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Discharge Voucher",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 6,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Account Information",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 6,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Payment Information",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 6,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Claim Settlement",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 7,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Surveyor Fee Approval",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 8,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    {
      name: "Surveyor Fee Settlement",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 9,
      background: "#ffe6e6",
      fontColor: "#000000",
    },

    {
      name: "Claim Withdrwal",
      disabled: false,
      visible: ClaimsJson.claimsMenuId === 10,
      background: "#ffe6e6",
      fontColor: "#000000",
    },
    // { name: "Surveyor Fee Approval", disabled: false, visible: flag === true },
  ];
  return menus;
};

const getMenuContent = (id, ClaimsJson) => {
  let accordians = [];
  switch (true) {
    case id === 0 && ClaimsJson.claimsMenuId === 1:
      accordians = [{ label: "Surveyor Details", visible: true }];
      break;
    case id === 1 && ClaimsJson.claimsMenuId === 1:
      accordians = [{ label: "Report Submission", visible: true }];
      break;
    case id === 2 && ClaimsJson.claimsMenuId === 1:
      accordians = [{ label: "Surveyor Report", visible: true }];
      break;
    case 3:
      accordians = [{ label: "Surveyor Fee Approval", visible: true }];
      break;

    case id === 0 && ClaimsJson.claimsMenuId === 2:
      accordians = [{ label: "Claim Assessment", visible: true }];
      break;
    case id === 1 && ClaimsJson.claimsMenuId === 2 && Assessmentflag:
      accordians = [{ label: "Repair/Human Casualty Basis", visible: true }];
      break;
    case ClaimsJson.claimsMenuId === 2 && Totallossflag:
      accordians = [{ label: "Total Loss Basis", visible: true }];
      break;
    case ClaimsJson.claimsMenuId === 2 && CashLossflag:
      accordians = [{ label: "Cash Loss Basis", visible: true }];
      break;
    case ClaimsJson.claimsMenuId === 2 && ConstructiveTotal:
      accordians = [{ label: "Constructive Total Loss ", visible: true }];
      break;
    case ClaimsJson.claimsMenuId === 2 && id === 1:
      accordians = [{ label: "Master Calculation", visible: true }];
      break;

    case id === 0 && ClaimsJson.claimsMenuId === 3:
      accordians = [{ label: "Claim Advance Payment", visible: true }];
      break;

    case id === 0 && ClaimsJson.claimsMenuId === 4:
      accordians = [{ label: "RI Approval", visible: true }];
      break;
    case id === 0 && ClaimsJson.claimsMenuId === 5:
      accordians = [{ label: "Claim Approval", visible: true }];
      break;
    case id === 1 && ClaimsJson.claimsMenuId === 5:
      accordians = [{ label: "RI Details", visible: true }];
      break;

    case id === 0 && ClaimsJson.claimsMenuId === 6:
      accordians = [{ label: "Discharge Voucher", visible: true }];
      break;
    case id === 1 && ClaimsJson.claimsMenuId === 6:
      accordians = [{ label: "Account Information", visible: true }];
      break;
    case id === 2 && ClaimsJson.claimsMenuId === 6:
      accordians = [{ label: "Payment Information", visible: true }];
      break;
    case id === 0 && ClaimsJson.claimsMenuId === 7:
      accordians = [{ label: "Claim Settlement", visible: true }];
      break;
    case id === 0 && ClaimsJson.claimsMenuId === 8:
      accordians = [{ label: "Surveyor Fee Approval", visible: true }];
      break;

    case id === 0 && ClaimsJson.claimsMenuId === 9:
      accordians = [{ label: "Surveyor Fee Settlement", visible: true }];
      break;
    case id === 0 && ClaimsJson.claimsMenuId === 10:
      accordians = [{ label: "Claim Withdrwal", visible: true }];
      break;

    default:
      accordians = [];
      break;
  }
  return accordians;
};

function getAccordianContents(x, ClaimsJson, policyData, GenericClaimsMaster, dispatch) {
  console.log("claim json", ClaimsJson, policyData, GenericClaimsMaster);
  console.log("policy json", policyData);

  const dto = ClaimsJson;
  const handleRemoveRow = async (filename, index) => {
    console.log("remove", filename);
    console.log("removeIndex", index);
    filesUpload = filesUpload.filter((file, i) => {
      if (i === index) {
        console.log("Removing file:", file);
        return false;
      }
      return true;
    });
    setClaimsJson(dispatch, { ...ClaimsJson });
  };
  const handleSave = () => {
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonColor: "success",
      confirmButtonText: "Ok",

      text: "Claim Denied",
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate("/NepalClaims/Dashboard");
      }
    });
  };
  const handleDays = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    dto.transactionDataDTO[0].transactionDetails.SurveyorDetails.reportSubmissionWithin =
      numericValue;

    setClaimsJson(dispatch, { ...dto });
  };
  const handleAddDocument = () => {
    const adddoc = {
      file: "",
      filename: "",
      filetype: "",
    };
    filesUpload.push(adddoc);

    setClaimsJson(dispatch, { ...dto });
  };
  const handleUpload = (e, i) => {
    const file = e.target.files[0];
    filesUpload[i].filename = file.name;
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only pdf/jpg/jpeg/png//doc/docx are allowed",
      });
      return;
    }
    setClaimsJson(dispatch, { ...dto });
    console.log("uploadfile", filesUpload);
  };
  const handleRadio = (e) => {
    if (e.target.name === "Surveyor") {
      dto.transactionDataDTO[0].transactionDetails.SurveyorDetails.SurveyorApplicable =
        e.target.value;
      if (
        dto.transactionDataDTO[0].transactionDetails.SurveyorDetails.SurveyorApplicable ===
        "Applicable"
      ) {
        flag = true;
      }
      if (
        dto.transactionDataDTO[0].transactionDetails.SurveyorDetails.SurveyorApplicable ===
        "NotApplicable"
      ) {
        flag = false;
      }
    }
    if (e.target.name === "ReportSubmission") {
      dto.transactionDataDTO[0].transactionDetails.SurveyorDetails.isReportSubmission =
        e.target.value;
      if (
        dto.transactionDataDTO[0].transactionDetails.SurveyorDetails.isReportSubmission === "No"
      ) {
        Swal.fire({
          allowOutsideClick: false,
          confirmButtonColor: "success",
          confirmButtonText: "Ok",

          text: "Kindly complete the survey and submit the report to proceed further",
        }).then((result) => {
          if (result.isConfirmed) {
            // navigate("/NepalClaims/Dashboard");
          }
        });
      }
    }
    if (e.target.name === "isClaimDenied") {
      dto.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied = e.target.value;
    }
    setClaimsJson(dispatch, { ...dto });
  };

  const handleCheckbox = (e) => {
    // debugger;
    if (e.target.name === "Repair") {
      if (e.target.checked === true) {
        Assessmentflag = true;
      } else if (e.target.checked === false) {
        Assessmentflag = false;
      }
    }
    if (e.target.name === "TLB") {
      if (e.target.checked === true) {
        Totallossflag = true;
        Assessmentflag = true;
      } else if (e.target.checked === false) {
        Totallossflag = false;
      }
    }
    if (e.target.name === "CashLoss") {
      if (e.target.checked === true) {
        CashLossflag = true;
        Totallossflag = true;
        Assessmentflag = true;
      } else if (e.target.checked === false) {
        CashLossflag = false;
      }
    }
    if (e.target.name === "ConstructiveTotal") {
      if (e.target.checked === true) {
        ConstructiveTotal = true;
        CashLossflag = true;
        Totallossflag = true;
        Assessmentflag = true;
      } else if (e.target.checked === false) {
        ConstructiveTotal = false;
      }
    }
    setClaimsJson(dispatch, { ...dto });
  };

  // const handleAdd = () => {
  //   Addbutton = true;
  //   setClaimsJson(dispatch, { ...dto });
  // };

  // const handleXOL = (e) => {
  //   debugger;
  //   if (e.target.checked === true) {
  //     swal({
  //       html: true,
  //       icon: "success",
  //       text: "show non proportional RI break up",
  //     });
  //   }
  // };

  const handleDVsearch = () => {
    DVsearchFlag = true;
    setClaimsJson(dispatch, { ...ClaimsJson });
  };

  const handleUserConsent = () => {
    swal({
      html: true,
      icon: "success",
      text: "Amount of 1000 is paid in advance to the beneficiary",
    });
  };

  const handleProceed = () => {
    swal({
      html: true,
      icon: "success",
      text: "Claim Advance Payment is Processed",
    });
  };

  let data = [];

  switch (x) {
    case "Report Submission":
      data = [
        {
          type: "RadioGroup",
          label: "Is Survey Complete ?",
          name: "ReportSubmission",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isReportSubmission,
          customOnChange: (e) => handleRadio(e),
          path: "",
          visible: true,
        },
        {
          type: "RadioGroup",
          label: "Is Claim Denied?",
          name: "isClaimDenied",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied,
          customOnChange: (e) => handleRadio(e),
          path: "",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .isReportSubmission === "Yes",
        },
        {
          type: "DateTime",
          label: "Report Submission Date",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          name: "SurveyorDeputedOn ",
          //   value: policyJson.PolicyEndDate,
          path: "",
        },
        {
          type: "Input",
          label: "Report Number",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          spacing: 4,
          name: "ReportNumber",
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
          options: [],
        },
        {
          type: "Custom",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          spacing: 12,
          return: (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={-2} mb={-4}>
              <Divider
                variant="middle"
                sx={{
                  py: 0,
                  width: "100%",
                  fontSize: "10px",
                  opacity: 1,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              />
            </Grid>
          ),
        },
        {
          type: "Typography",
          label: "Surveyor Fee",
          name: "Surveyor",

          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          path: "",
          spacing: 12,
        },

        {
          type: "Input",
          label: "Surveyor Fee",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",

          name: "SurveyorFee",
          // value: Obj.insurerClaimNo,

          options: [],
        },
        {
          type: "Input",
          label: "TDS %",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "TDS",
          // value: Obj.insurerClaimNo,

          options: [],
        },
        {
          type: "Input",
          label: "TDS",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "TDS",
          // value: Obj.insurerClaimNo,
          InputProps: { readOnly: true },
          options: [],
        },
        {
          type: "Input",
          label: "VAT % ",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "VAT",
          // value: Obj.insurerClaimNo,

          options: [],
        },
        {
          type: "Input",
          label: "VAT",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "VAT",
          // value: Obj.insurerClaimNo,
          InputProps: { readOnly: true },
          options: [],
        },
        {
          type: "Custom",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          spacing: 12,
          return: (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={-2} mb={-4}>
              <Divider
                variant="middle"
                sx={{
                  py: 0,
                  width: "100%",
                  fontSize: "10px",
                  opacity: 1,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              />
            </Grid>
          ),
        },
        {
          type: "Typography",
          label: "Other Fee (Taxable)",
          name: "Surveyor",

          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],

          path: "",
          spacing: 12,
        },
        {
          type: "Input",
          label: "Other Fee(Taxable)",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",

          name: "OtherFee",
          // value: Obj.insurerClaimNo,
          options: [],
        },

        {
          type: "Input",
          label: "TDS %",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "TDS",
          // value: Obj.insurerClaimNo,

          options: [],
        },
        {
          type: "Input",
          label: "TDS",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "TDS",
          // value: Obj.insurerClaimNo,
          InputProps: { readOnly: true },
          options: [],
        },
        {
          type: "Input",
          label: "VAT %",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "VAT",
          // value: Obj.insurerClaimNo,
          options: [],
        },
        {
          type: "Input",
          label: "VAT",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "VAT",
          // value: Obj.insurerClaimNo,
          InputProps: { readOnly: true },
          options: [],
        },
        {
          type: "Custom",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          spacing: 12,
          return: (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={-2} mb={-4}>
              <Divider
                variant="middle"
                sx={{
                  py: 0,
                  width: "100%",
                  fontSize: "10px",
                  opacity: 1,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              />
            </Grid>
          ),
        },
        {
          type: "Typography",
          label: "Other Fee",
          name: "Surveyor",

          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],

          path: "",
          spacing: 12,
        },
        {
          type: "Input",
          label: "Other Fee",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "OtherFee",
          // value: Obj.insurerClaimNo,
          options: [],
        },
        {
          type: "Custom",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          spacing: 12,
          return: (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={-2} mb={-4}>
              <Divider
                variant="middle"
                sx={{
                  py: 0,
                  width: "100%",
                  fontSize: "10px",
                  opacity: 1,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              />
            </Grid>
          ),
        },
        {
          type: "Input",
          label: "Total Survey Fee",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "TotalSurveyFee",
          // value: Obj.insurerClaimNo,
          InputProps: { readOnly: true },
          options: [],
        },
        {
          type: "Input",
          label: "Sfee Payable (Exc. TDS)",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "SfeePayable",
          // value: Obj.insurerClaimNo,
          InputProps: { readOnly: true },
          options: [],
        },
        {
          type: "Input",
          label: "Total Survey Fee (Including VAT)",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",
          disabled: true,
          name: "TotalSurveyFee",
          // value: Obj.insurerClaimNo,
          InputProps: { readOnly: true },
          options: [],
        },
        {
          type: "Input",
          label: "Estimate Loss Amount",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",

          name: "EstimateLossAmount",
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
          options: [],
        },
        {
          type: "Input",
          label: "Total Loss",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
            "No",

          name: "TotalLoss",
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
          options: [],
        },
        {
          type: "Custom",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
              "No" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied ===
              "Yes",
          spacing: 9,
          return: (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                <TextField
                  id="outlined-multiline-static"
                  label="Remarks"
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
            </Grid>
          ),
        },
        {
          type: "Button",
          label: "Save",

          visible:
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied === "No" ||
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails.isClaimDenied === "Yes",

          spacing: 12,
          path: "",
        },
      ];
      break;
    case "Surveyor Details":
      data = [
        {
          type: "RadioGroup",
          label: "Surveyor :",
          name: "Surveyor",
          spacing: 12,
          list: [
            { label: "Applicable", value: "Applicable" },
            { label: "Not Applicable", value: "NotApplicable" },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails.SurveyorApplicable,
          customOnChange: (e) => handleRadio(e),
          path: "",
          visible: true,
        },
        {
          type: "AutoComplete",
          label: "Surveyor Type",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          name: "SurveyorType",
          option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "AutoComplete",
          label: "Surveyor Name",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          name: "SurveyorName",
          option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "Input",
          label: "Mobile Number",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          name: "MobileNumber",
          //   option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "Input",
          label: "Surveyor Email",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          name: "SurveyorEmail",
          //   option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "AutoComplete",
          label: "Surveyor Staff",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          name: "SurveyorStaff",
          option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "Input",
          label: "Staff Mobile Number",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          name: "StaffMobileNumber",
          //   option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "AutoComplete",
          label: "Survey Type",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          name: "SurveyType",
          option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "DateTime",
          label: "Surveyor Deputed On ",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          name: "SurveyorDeputedOn ",
          //   value: policyJson.PolicyEndDate,
          path: "",
        },

        {
          type: "Input",
          label: "Place of Survey",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          name: "PlaceofSurvey",
          //   option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "Input",
          label: "Report Submission within",
          name: "ReportSubmissionwithin",
          //   value: ClaimsJson.claimBasicDetails.masterpolicyHolderName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          //   InputProps: { readOnly: true },
          path: "",

          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .reportSubmissionWithin,
          onBlur: false,
          customOnChange: (e) => handleDays(e),
        },
        {
          type: "Typography",
          label: "Days",
          // name: "claimNo",
          // value: "CM/NEP7/MV/20/001690/01",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "Applicable" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .reportSubmissionWithin !== "",

          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          path: "",
          spacing: 2,
        },
        {
          type: "AutoComplete",
          label: "In House User Name",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "NotApplicable",
          name: "InHouseUserName",
          option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "Custom",

          //   value: ClaimsJson.claimBasicDetails.masterpolicyHolderName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "NotApplicable",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          //   InputProps: { readOnly: true },
          path: "",
          spacing: 9,
          return: (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                <TextField
                  id="outlined-multiline-static"
                  label="Remarks"
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
            </Grid>
          ),
        },
        {
          type: "Input",
          label: "Estimated Amount",
          name: "EstimatedAmount",
          //   value: ClaimsJson.claimBasicDetails.masterpolicyHolderName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails
              .SurveyorApplicable === "NotApplicable",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          //   InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Button",
          label: "Save",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          spacing: 12,
          path: "",
          customOnChange: () => handleSave(),
        },
      ];
      break;
    case "Surveyor Report":
      data = [
        {
          type: "Custom",
          label: "Upload",
          visible: true,
          spacing: 12,
          return: (
            <>
              {filesUpload.map((file, i) => (
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} mt={2}>
                    <MDInput
                      label="Name of the file"
                      name="file"
                      // value={Logindata.UserName}
                      // onChange={(e) => handleUserName(e)}

                      // error={ErrorFlag && Logindata.UserName === ""}
                      // helperText={ErrorFlag && Logindata.UserName === "" ? helperText : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} mt={2}>
                    <label htmlFor={`file-upload-${i}`}>
                      <input
                        id={`file-upload-${i}`}
                        name={`file-upload-${i}`}
                        accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => handleUpload(e, i)}
                      />
                      <MDButton variant="outlined" color="error" component="span">
                        Upload
                      </MDButton>
                    </label>
                  </Grid>
                  {file.filename !== "" && (
                    <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5}>
                      <MDTypography sx={{ fontSize: "15px" }}>{file.filename}</MDTypography>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} mt={2}>
                    <IconButton onClick={(e) => handleRemoveRow(e, i)}>
                      <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </>
          ),
        },
        {
          type: "Button",
          label: "Add Another file",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // onChangeFuncs: [IsNumeric],

          // InputProps: { readOnly: true },
          path: "",
          customOnChange: () => handleAddDocument(),
        },
        {
          type: "Input",
          label: "Count",
          visible: false,
          name: "Count",

          path: "",
        },
      ];
      break;
    case "Surveyor Fee Approval":
      data = [
        {
          type: "DateTime",
          label: "Approved Date",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "AutoComplete",
          label: "Approval Authority",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Approval Amount",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "Custom",
          spacing: 12,
          visible: true,
          path: "",
          return: (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                <TextField
                  id="outlined-multiline-static"
                  label="Remarks (if any)"
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
            </Grid>
          ),
        },
        {
          type: "Button",
          label: "Approve",
          visible: true,
          path: "",
        },
        {
          type: "Button",
          label: "Disapprove",
          visible: true,
          path: "",
        },
        {
          type: "Button",
          label: "Generate Voucher",
          visible: true,
          path: "",
        },
      ];
      break;

    case "Claim Advance Payment":
      data = [
        {
          type: "Input",
          label: "Total Payable",
          visible: true,
          name: "claimType",
          //   option: [],
          // value: Obj.insurerClaimNo,
          InputProps: { focused: true },
        },
        {
          type: "Input",
          label: "Claimant Name",
          name: "name",
          //   value: ClaimsJson.claimBasicDetails.masterpolicyHolderName,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          //   InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Input",
          label: "Pay To (Beneficiary)",
          name: "name",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Reason for Advance Payment",
          name: "name",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Total Amount beign Paid in Advance",
          name: "name",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Mode of Payment",
          name: "name",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Bank A/C Number",
          name: "name",
          visible: true,
          path: "",
        },
        {
          type: "Button",
          label: "User Consent",
          visible: true,
          customOnChange: () => handleUserConsent(),
          //   InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Button",
          label: "Proceed",
          visible: true,
          customOnChange: () => handleProceed(),
          path: "",
        },
      ];
      break;

    case "RI Approval":
      data = [
        // {
        //   type: "Input",
        //   label: "Claim Number",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Input",
        //   label: "Policy Number",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        {
          type: "AutoComplete",
          label: "U/W Year",
          visible: true,
          path: "",
          spacing: 6,
        },
        {
          type: "dataTime",
          label: "Approved Date",
          visible: true,
          path: "",
          spacing: 6,
        },
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "RIBreak", headerName: "RI Break Down", width: 200 },
            { field: "TotalSI", headerName: "%", width: 200 },
            { field: "UtilizedSI", headerName: "Actual", width: 200 },
            { field: "AvailSI", headerName: "Previous", width: 200 },
            { field: "NoOfClaims", headerName: "Blance", width: 230 },
          ],
          // rows: GenericClaimsMaster.ClaimViewCoverages.Coverages,
          rows: [],
          rowId: "Benefit",
          visible: true,
          // onRowClick:
        },
        // {
        //   type: "Input",
        //   label: "Insured Name",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Input",
        //   label: "Intimation Date",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Input",
        //   label: "Endorsement Number",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Input",
        //   label: "Sum Insured",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Input",
        //   label: "Sum Insured Balance",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Typography",
        //   label: "",
        //   visible: true,
        //   path: "",
        //   spacing: 8,
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Checkbox",
        //   label: "XOL",
        //   // customOnChange: (e) => handleXOL(e),
        //   visible: true,
        //   path: "",
        // },
        // {
        //   type: "Checkbox",
        //   label: "Mkt Pool",
        //   visible: true,
        //   path: "",
        // },
        // {
        //   type: "Typography",
        //   label: "",
        //   visible: true,
        //   path: "",
        //   spacing: 4,
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Input",
        //   label: "Surveyor Name",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Input",
        //   label: "Business Type",
        //   visible: true,
        //   path: "Status",
        //   InputProps: { readOnly: true },
        // },

        // {
        //   type: "Input",
        //   label: "Date of Loss",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },

        // {
        //   type: "Input",
        //   label: "Claim Type",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },

        // {
        //   type: "Input",
        //   label: "Nature of Loss",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },

        // {
        //   type: "Input",
        //   label: "Claim Advance Paid",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },

        // {
        //   type: "Input",
        //   label: "Estimated Sur. Fee",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },

        // {
        //   type: "Input",
        //   label: "Actual Sur. Fee",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },

        // {
        //   type: "Input",
        //   label: "Estimated Amount",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },

        // {
        //   type: "Input",
        //   label: "Assessed Amount",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },

        // {
        //   type: "Input",
        //   label: "Total Assessed",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },

        {
          type: "Checkbox",
          label: "Stop Backward Calculation",
          visible: true,
          path: "",
          spacing: 12,
          // InputProps: { readOnly: true },
        },

        {
          type: "Button",
          label: "Print Expected Voucher",
          visible: true,
          path: "",
          spacing: 3,
        },
        {
          type: "Button",
          label: "Print Recovery Slip",
          visible: true,
          path: "",
          spacing: 3,
        },
        {
          type: "Button",
          label: "Approve",
          visible: true,
          path: "",
          spacing: 3,
        },
        {
          type: "Button",
          label: "Disapprove",
          visible: true,
          path: "",
          spacing: 3,
        },
      ];

      break;

    case "Surveyor Fee Settlement":
      data = [
        {
          type: "Typography",
          label: "Bank/Petty Cash Code",
          visible: true,
          path: "",
          spacing: 8,
          InputProps: { readOnly: true },
        },
        {
          type: "Checkbox",
          label: "Claim Full Settlement",
          visible: true,
          path: "",
          spacing: 8,
        },

        {
          type: "Button",
          label: "Surveyor Fee Breakdown (New)",
          visible: true,
          path: "",
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Payment Type",
          disabled: true,
          visible: "true",
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Bank Name",
          disabled: true,
          visible: "true",
        },
        { type: "DateTime", required: true, label: "Cheque Date", disabled: true, visible: "true" },
        { type: "Input", required: true, label: "Cheque No", disabled: true, visible: "true" },
        {
          type: "Typography",
          label: "",
          visible: true,
          path: "",
          spacing: 8,
          InputProps: { readOnly: true },
        },
        {
          type: "Button",
          required: true,
          label: "Save",
          disabled: true,
          visible: "true",
          spacing: 2,
        },
        {
          type: "Button",
          required: true,
          label: "Cancel",
          disabled: true,
          visible: "true",
          spacing: 2,
        },

        {
          type: "Button",
          required: true,
          label: "Print Voucher ",
          disabled: true,
          visible: "true",
          spacing: 2.5,
        },
        {
          type: "Button",
          required: true,
          label: "Generate Voucher",
          disabled: true,
          visible: "true",
          spacing: 3,
        },
        {
          type: "Button",
          required: true,
          label: "Print Cheque",
          disabled: true,
          spacing: 2.5,
          visible: "true",
        },
      ];

      break;
    case "Claim Assessment":
      data = [
        {
          type: "Checkbox",
          label: "Total Theft",
          visible: true,
          path: "",
          spacing: 4,
        },
        {
          type: "Checkbox",
          label: "Total Loss",
          visible: true,
          path: "",
          spacing: 4,
        },
        {
          type: "Input",
          label: "Detail of Loss",
          visible: true,
          path: "",
          spacing: 4,
        },

        {
          type: "Input",
          label: "Claim Documents List",
          visible: true,
          path: "",
        },
        {
          type: "Typography",
          label: "Assessment Basis",
          visible: true,
          path: "",
          spacing: 12,
        },
        {
          type: "Checkbox",
          label: "Repair/Human Casualty Basis",
          name: "Repair",
          visible: true,
          customOnChange: (e) => handleCheckbox(e),
          path: "",
          spacing: 6,
        },
        {
          type: "Checkbox",
          label: "Total Loss Basis",
          name: "TLB",
          visible: true,
          customOnChange: (e) => handleCheckbox(e),
          path: "",
          spacing: 6,
        },
        {
          type: "Checkbox",
          label: "Cash Loss Basis",
          name: "CashLoss",
          visible: true,
          customOnChange: (e) => handleCheckbox(e),
          path: "",
          spacing: 6,
        },
        {
          type: "Checkbox",
          label: "Constructive Total Basis",
          visible: true,
          name: "ConstructiveTotal",
          customOnChange: (e) => handleCheckbox(e),
          path: "",
          spacing: 6,
        },

        // {
        //   type: "Input",
        //   label: "Cash Loss Amount",
        //   visible: true,
        //   path: "",
        // },
        // {
        //   type: "Input",
        //   label: "Policy Excess (-)",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Input",
        //   label: "Salvage (-)",
        //   visible: true,
        //   path: "",
        // },
        // {
        //   type: "Input",
        //   label: "Net Assessment",
        //   visible: true,
        //   InputProps: { readOnly: true },
        //   path: "",
        // },
        // {
        //   type: "Input",
        //   label: "Cash Loss Amount",
        //   visible: true,
        //   path: "",
        // },
        // {
        //   type: "Input",
        //   label: "Policy Excess (-)",
        //   visible: true,
        //   InputProps: { readOnly: true },
        //   path: "",
        // },
        // {
        //   type: "Input",
        //   label: "Salvage (-)",
        //   visible: true,
        //   path: "",
        // },
        // {
        //   type: "Input",
        //   label: "Net Assessment",
        //   visible: true,
        //   InputProps: { readOnly: true },
        //   path: "",
        // },
        // {
        //   type: "Button",
        //   label: "Update",
        //   visible: true,
        //   path: "",
        // },
        // {
        //   type: "Button",
        //   label: "Add",
        //   customOnChange: (e) => handleAdd(e),
        //   visible: true,
        //   path: "",
        // },
        // {
        //   type: "Button",
        //   label: "Clear",
        //   visible: true,
        //   path: "",
        // },
        // {
        //   type: "Input",
        //   label: "DeathSumInsured",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Input",
        //   label: "Medical SumInsured",
        //   visible: true,
        //   path: "",
        //   InputProps: { readOnly: true },
        // },
        // {
        //   type: "Button",
        //   label: "Add",
        //   visible: true,
        //   path: "",
        // },
      ];
      break;

    case "Repair/Human Casualty Basis":
      data = [
        {
          type: "AutoComplete",
          label: "Loss Type",
          visible: true,
          path: "",
        },
        {
          type: "AutoComplete",
          label: "Sub Loss Type",
          visible: true,
          path: "",
        },
        {
          type: "AutoComplete",
          label: "Material Type",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "TP Vehicle Number",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Particulars (English)",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Claimed Amount",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Bill Amount",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Survey Assessment Amount",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Assessed Amount",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Depreciation",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Depreciation Amount",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "Salvage/Deduction",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Salvage/Deduction Amount",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "Apply Average Clause (-) Rate%",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Amount after Avg Clause",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Input",
          label: "Net Assessment",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Checkbox",
          label: "Non VAT",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Remarks",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Member Details",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "DeathSumInsured",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "Medical SumInsured",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "Button",
          label: "Add",
          visible: true,
          path: "",
        },
      ];
      break;

    case "Total Loss Basis":
      data = [
        {
          type: "Input",
          label: "Market Value/Sum Insured",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Sum Insured",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "Less Description",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Amount",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "Less Salvage",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Net Assessment",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
      ];
      break;

    case "Cash Loss Basis":
      data = [
        {
          type: "Input",
          label: "Cash Loss Amount",
          visible: true,
          path: "",
        },

        {
          type: "Input",
          label: "Policy Excess(-)",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },

        {
          type: "Input",
          label: "Salvage(-)",
          visible: true,
          path: "",
        },

        {
          type: "Input",
          label: "Net Assessment",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
      ];
      break;

    case "Constructive Total Loss ":
      data = [
        {
          type: "Input",
          label: "Cash Loss Amount",
          visible: true,
          path: "",
        },

        {
          type: "Input",
          label: "Policy Excess(-)",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },

        {
          type: "Input",
          label: "Salvage(-)",
          visible: true,
          path: "",
        },

        {
          type: "Input",
          label: "Net Assessment",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
      ];
      break;

    case "Master Calculation":
      data = [
        {
          type: "Input",
          label: "Total",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "VAT",
          visible: true,
          path: "",
          InputProps: { readOnly: true },
        },
        {
          type: "Checkbox",
          label: "Apply Average Clause (+)",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Sum Insured",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Input",
          label: "Lump Sum Disc.(-)",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Input",
          label: "Market Value",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Non Standard Charge (-)",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Compulsory Excess (-)",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Input",
          label: "Policy (Voluntary) Excess (-)",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Input",
          label: "Remarks",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Towing Charge (+) ",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Amount",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Lifting Charge (+)",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "NetPayable(WithoutSurveyFee)",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Input",
          label: "Reinstate Premium(-)",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Sub Total",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Input",
          label: "Surveyor Fee (+)",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
        {
          type: "Input",
          label: "Net Payable (Including Survey Fee)",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
        },
      ];
      break;
    // case "Surveyor Fee Approval":
    //   data = [
    //     {
    //       type: "Input",
    //       label: "Policy Number/Document Number",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Insured Name",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Claim Status",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Assessed Amount",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Surveyor Type",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Surveyor Name",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Place of Surveyor",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Surveyor Fee",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "VAT Amount",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Less: TDS",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Other Fee",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Other Fee (Taxable)",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "VAT Amount",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Less: TDS1",
    //       visible: true,
    //       path: "Total Surveyor Fee",
    //     },
    //     {
    //       type: "Input",
    //       label: "Advance Payment",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Total Payable",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Surveyor Deputed on",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Report Submitted On",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Your Approval Limit",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Status",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Approved Date",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Approval Authority",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Approval Amount",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Remarks (If Any)",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Button",
    //       label: "Approve",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Button",
    //       label: "Disapprove",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Button",
    //       label: "Generate Voucher",
    //       visible: true,
    //       path: "",
    //     },
    //   ];
    //   break;

    case "Claim Approval":
      data = [
        {
          type: "Checkbox",
          label: "Include Surveyor Fee",
          visible: true,
          path: "",
          spacing: 12,
        },
        {
          type: "Input",
          label: "Total Amount",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Salvage Recovery",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "RI Approval Status",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "RI Approved By",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Your Approved Limit",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Approved Date",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Approved Authority",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Approved Amount",
          visible: true,
          path: "",
        },
        {
          type: "Custom",
          spacing: 12,
          visible: true,
          path: "",
          return: (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                <TextField
                  id="outlined-multiline-static"
                  label="Remarks (if any)"
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
            </Grid>
          ),
        },
        {
          type: "Input",
          label: "Nepal RI(%)",
          visible: true,
          path: "",
        },

        // Need to add grid
        {
          type: "Input",
          label: "Sl No",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Recommended By",
          visible: true,
          path: "",
        },
        {
          type: "DateTime",
          label: "Recommended Date",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Remarks",
          visible: true,
          path: "",
        },
        {
          type: "Button",
          label: "Print Approval Slip",
          visible: true,
          path: "",
        },
        {
          type: "Button",
          label: "Approve",
          visible: true,
          path: "",
        },
        {
          type: "Button",
          label: "Disapprove",
          visible: true,
          path: "",
        },
      ];
      break;

    case "Claim Withdrwal":
      data = [
        {
          type: "Input",
          label: "Remarks",
          visible: true,
          path: "",
        },
        {
          type: "DateTime",
          label: "Withdraw Date",
          visible: true,
          path: "",
        },
        {
          type: "CheckBox",
          label: "Survey Fee Payble ",
          visible: true,
          path: "",
        },
        {
          type: "AutoComplete",
          label: "Withdraw Type",
          visible: true,
          path: "",
        },
        {
          type: "AutoComplete",
          label: "Withdraw Sub Type",
          visible: true,
          path: "",
        },
        {
          type: "Checkbox",
          label: "Nepali",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Last Updated By",
          visible: true,
          path: "",
        },
        {
          type: "Input",
          label: "Last Updated On",
          visible: true,
          path: "",
        },
      ];
      break;

    case "Claim Settlement":
      data = [
        {
          type: "DateTime",
          required: "true",
          label: "Settle Date",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "AutoComplete",
          required: "true",
          label: "Settle Branch",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "AutoComplete",
          required: "true",
          label: "Sub Branch",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "Checkbox",
          required: "true",
          label: "Carrier Recovery",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "Input",
          required: "true",
          label: "Remarks",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "Checkbox",
          required: "true",
          label: "Enable Bank",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "Input",
          required: "true",
          label: "Issued To",
          value: "",
          disabled: "true",
          visible: "true",
        },
        {
          type: "Input",
          required: "true",
          label: "Issued Amount",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "AutoComplete",
          required: "true",
          label: "Payment Mode",
          value: "",
          disabled: "true",
          visible: "true",
        },
        {
          type: "Input",
          required: "true",
          label: "Less Adv Adj",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "AutoComplete",
          required: "true",
          label: "Bank Name",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "Input",
          required: "true",
          label: "Less Reinstate Premium",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "DateTime",
          required: "true",
          label: "Cheque Date",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "Input",
          required: "true",
          label: "Net Amount",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "Input",
          required: "true",
          label: "Cheque Number",
          value: "",
          disabled: "false",
          visible: "true",
        },
        {
          type: "Input",
          required: "true",
          label: "Pay To",
          value: "",
          disabled: "true",
          visible: "true",
        },
        {
          type: "Input",
          required: "true",
          label: "Last Modified By",
          value: "",
          disabled: "true",
          visible: "true",
        },
        { type: "Button", required: "true", label: "Add", value: "", visible: "true", spacing: 2 },
        {
          type: "Button",
          required: "true",
          label: "Cancel",
          value: "",
          visible: "true",
          spacing: 2,
        },
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "SlNo", headerName: "Sl No", width: 100 },
            { field: "IssueTo", headerName: "Issue To", width: 150 },
            { field: "IssuedAmount", headerName: "Issued Amount", width: 150 },
            { field: "Paymentmode", headerName: "Paymen Mode", width: 150 },
            { field: "LessAdv", headerName: "Ledd Adv Adj", width: 150 },
            { field: "BankName", headerName: "Bank Name", width: 150 },
            { field: "LessReinstate", headerName: "Less Reinstate Premium", width: 150 },
            { field: "Chequedate", headerName: "Cheque Date", width: 150 },
            { field: "NetAmount", headerName: "Net Amount", width: 150 },
            { field: "ChequeNumber", headerName: "Cheque Number", width: 150 },
            { field: "PayTo", headerName: "Pay To", width: 150 },
          ],
          rows: [],

          rowId: "SlNo",

          visible: true,
        },
        {
          type: "Input",
          label: "Total Assessed Amount",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Total Less Adv Adj",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Total less Reinstated Premium",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Full and Final Settlement",
          visible: true,
          InputProps: { readOnly: true },
          path: "",
          spacing: 3,
        },
        {
          type: "Button",
          label: "Claim Settlement Sheet",
          visible: true,
          path: "",
          spacing: 3,
        },
        {
          type: "Button",
          label: "Print Loss Advice",
          visible: true,
          path: "",
          spacing: 3,
        },
        {
          type: "Button",
          label: "Print Cheque",
          visible: true,
          path: "",
          spacing: 3,
        },
        {
          type: "Button",
          label: "Print Voucher",
          visible: true,
          path: "",
          spacing: 3,
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          path: "",
          spacing: 6,
          InputProps: { readOnly: true },
        },
        {
          type: "Button",
          label: "Save",
          visible: true,
          path: "",
          spacing: 3,
        },
        {
          type: "Button",
          label: "Cancel",
          visible: true,
          path: "",
          spacing: 3,
        },
      ];
      break;

    case "Discharge Voucher":
      data = [
        {
          type: "DateTime",
          required: true,
          label: "DV Change Date",
          value: "",
          disabled: true,
          visible: "true",
        },
        {
          type: "AutoComplete",
          required: true,
          label: "DV Type",

          visible: "true",
        },
        {
          type: "AutoComplete",
          required: true,
          label: "DV Change Date",

          visible: "true",
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Remarks",

          visible: "true",
        },
        {
          type: "Input",
          required: true,
          label: "Last Updated By",

          visible: "true",
        },
        {
          type: "Input",
          required: true,
          label: "Prepared By",

          visible: "true",
        },
        { type: "Button", required: true, label: "Save", visible: "true", spacing: 12 },
        {
          type: "AutoComplete",
          required: true,
          label: "DV Status",

          visible: "true",
        },
        {
          type: "DateTime",
          required: true,
          label: "Date",

          visible: "true",
        },
        {
          type: "Button",
          required: true,
          label: "Create DV for Processed Member",
          spacing: 12,
          visible: "true",
        },
      ];
      break;
    case "Account Information":
      data = [
        {
          type: "Checkbox",
          required: true,
          label: "Received DV from customer",
          spacing: 12,
          visible: "true",
        },
        {
          type: "Input",
          required: true,
          label: "Pay To",

          visible: "true",
        },
        {
          type: "Input",
          required: true,
          label: "Address of the claimant",

          visible: "true",
        },
        {
          type: "Input",
          required: true,
          label: "Upload Reference document",

          visible: "true",
        },
        {
          type: "Button",
          required: true,
          label: "Search",
          spacing: 12,
          visible: "true",
          customOnChange: () => handleDVsearch(),
        },
        // {
        //   type: "Input",
        //   required: true,
        //   label: "Account Information",

        //   visible: "true",
        // },
        {
          type: "Input",
          required: true,
          label: "KYC Number",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "A/c Address",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "A/c Name (Nep)",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "PAN Number",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "Mobile Number",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "Contact Number",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "Citizenship Number",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "Amount",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "Account Number",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "Account Holder Name",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "Bank Name",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "Branch Name",

          visible: DVsearchFlag === true,
        },
        {
          type: "Input",
          required: true,
          label: "Remarks",
          spacing: 8,
          visible: DVsearchFlag === true,
        },
        {
          type: "Button",
          required: true,
          label: "Add",
          visible: DVsearchFlag === true,
          spacing: 8,
        },
        {
          type: "Button",
          required: true,
          label: "Cancel",

          visible: DVsearchFlag === true,
        },
      ];
      break;
    case "Payment Information":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "SlNo", headerName: "Sl No", width: 100 },
            { field: "PayTo", headerName: "Pay To", width: 150 },
            { field: "Amount", headerName: "Amount", width: 150 },
            { field: "Remarks", headerName: "Remarks", width: 150 },
            { field: "AccountNumber", headerName: "Account Number", width: 150 },
            { field: "AccountHolderName", headerName: "Account Holder Name", width: 230 },
            { field: "BankName", headerName: "Bank Name", width: 150 },
            { field: "BranchName", headerName: "Branch Name", width: 150 },
            { field: "BankCode", headerName: "Bank Code", width: 150 },
            { field: "BranchCode", headerName: "Branch Code", width: 150 },
            { field: "BranchName", headerName: "Branch Name", width: 150 },
            { field: "BranchName", headerName: "Branch Name", width: 150 },
            { field: "BranchName", headerName: "Branch Name", width: 150 },
          ],
          rows: [],

          rowId: "SlNo",

          visible: true,
        },
        {
          type: "Checkbox",
          required: true,
          label: "Letter of Subrogration",

          visible: "true",
        },
        {
          type: "Checkbox",
          required: true,
          label: "DV in Nepali",

          visible: "true",
        },
        {
          type: "Input",
          required: true,
          label: "Total",
          InputProps: { readOnly: true },
          visible: "true",
        },
        {
          type: "Custom",
          label: "Upload",
          visible: true,
          spacing: 12,
          return: (
            <>
              {filesUpload.map((file, i) => (
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={12} md={3.9} lg={3.9} xl={3.9} mt={2}>
                    <MDInput
                      label="Document Name"
                      name="file"
                      // value={Logindata.UserName}
                      // onChange={(e) => handleUserName(e)}

                      // error={ErrorFlag && Logindata.UserName === ""}
                      // helperText={ErrorFlag && Logindata.UserName === "" ? helperText : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} mt={2}>
                    <label htmlFor={`file-upload-${i}`}>
                      <input
                        id={`file-upload-${i}`}
                        name={`file-upload-${i}`}
                        accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => handleUpload(e, i)}
                      />
                      <MDButton variant="outlined" color="error" component="span">
                        Upload
                      </MDButton>
                    </label>
                  </Grid>
                  {file.filename !== "" && (
                    <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5}>
                      <MDTypography sx={{ fontSize: "15px" }}>{file.filename}</MDTypography>
                    </Grid>
                  )}
                </Grid>
              ))}
            </>
          ),
        },
        {
          type: "Input",
          required: true,
          label: "Document List",

          visible: "true",
        },
        {
          type: "Button",
          required: true,
          label: "Add Signatory",
          sapcing: 8,
          visible: "true",
        },
        {
          type: "Button",
          required: true,
          label: "Save Details",
          sapcing: 8,
          visible: "true",
        },
      ];
      break;
    // case "Surveyor Fee Settlement":
    //   date = [
    //     { type: "Input", label: "Surveyor Name", visible: true, path: "" },
    //     {
    //       type: "Input",
    //       label: "Place of Surveyor",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Surveyor Fee",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "VAT Amount",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Less: TDS",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Other Fee",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Other Fee (Taxable)",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Add: VAT Amount",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Less: TDS1",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Total Surveyor Fee",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Total TDS",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Less Advance Payment",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Total Payable",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Surveyor Deputed on",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Report Submitted On",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Status",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Your Approval Limit",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Status",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Surveyor Types",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Claim Full Settlement",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Surveyor Fee Breakdown (New)",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Payment Type",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Bank Name",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Cheque Date",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Input",
    //       label: "Cheque No",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Button",
    //       label: "Save",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Button",
    //       label: "Cancel",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Button",
    //       label: "Print Voucher ",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Button",
    //       label: "Generate Voucher",
    //       visible: true,
    //       path: "",
    //     },
    //     {
    //       type: "Button",
    //       label: "Print Cheque",
    //       visible: true,
    //       path: "",
    //     },
    //   ];
    //   break;
    default:
      data = [
        [
          {
            type: "Input",
            label: "Insurer Claim No",
            visible: true,
            name: "insurerClaimNo",
            // value: Obj.insurerClaimNo,
            InputProps: { focused: true },
            // onChangeFuncs: [IsNumeric, LengthEqualTo],
            // parameters: [5],
          },
        ],
      ];
      break;
  }
  return data;
}

const getMasterList = () => {
  // const json = { Pincode: "577005" };
  const masterList = [];
  return masterList;
};

export {
  getMenuList,
  getMenuContent,
  getAccordianContents,
  getTopLevelContent,
  getBottomContent,
  getMasterList,
};
