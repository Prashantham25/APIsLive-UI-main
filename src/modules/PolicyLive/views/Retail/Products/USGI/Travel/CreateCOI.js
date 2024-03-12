import React from "react";
import {
  Menu,
  MenuItem,
  Drawer,
  Grid,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import NewRenderControl from "Common/RenderControl/NewRenderControl";
import { TravelJson } from "../data/Json/TravelJson";
import { GetProdPartnermasterData } from "../data/APIs/USGIWCApi";

const getPolicyDto = () => {
  console.log(".");

  return TravelJson;
};

const getProcessSteps = () => {
  const steps = ["MP Holder Details", "Insured Details", "Member Details", "Premium Summary"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "MP Holder Details", visible: true },
        { name: "Cover Details", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "Policy Details", visible: true },
        { name: "Insured Details", visible: true },
        { name: "Corresponding Address", visible: true },
      ];
      break;
    case 2:
      steps = [
        { name: "Member Details", visible: true },
        { name: "Nominee Details", visible: true },
        { name: "Apoointee Details", visible: true },
      ];
      break;
    case 3:
      steps = [{ name: "Payment type", visible: true }];
      break;
    case 4:
      steps = [{ name: "e1", visible: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ dto, setDto, activeStep, masters, setMasters }) => {
  let data = [];
  const lDto = dto;
  const lMasters = masters;
  const handleClick = () => {
    lMasters.flags.anchorEl = true;
    setMasters({ ...lMasters });
  };
  const handleCloseActionButton = () => {
    lMasters.flags.anchorEl = false;
    setMasters({ ...lMasters });
  };
  const handleDrawerOpen = () => {
    lMasters.flags.Drawer = true;
    setMasters({ ...lMasters });
  };
  const handleCloseDrawer = () => {
    lMasters.flags.Drawer = false;
    setMasters({ ...lMasters });
  };
  const handleMinor = (e) => {
    if (e.target.checked === true) {
      lDto.CreateCoi.NomineeDetails.isnomineeminor = "Yes";
      lDto.CreateCoi.Appointee.AppointeeName = lDto.CreateCoi.NomineeDetails.NomineeName;
      lDto.CreateCoi.Appointee.ApointeeRelationwithNominee =
        lDto.CreateCoi.NomineeDetails.NomineeRelationwithNominee;
      lDto.CreateCoi.Appointee.AppointeeDOB = lDto.CreateCoi.NomineeDetails.NomineeDOB;
      lDto.CreateCoi.Appointee.AppointeeGender = lDto.CreateCoi.NomineeDetails.NomineeGender;
      lDto.CreateCoi.Appointee.AppointeeAddressLine1 =
        lDto.CreateCoi.NomineeDetails.NomineeAddressLine1;
      lDto.CreateCoi.Appointee.AppointeeAddressLine2 =
        lDto.CreateCoi.NomineeDetails.NomineeAddressLine2;
      lDto.CreateCoi.Appointee.AppointeePincode = lDto.CreateCoi.NomineeDetails.NomineePincode;
      lDto.CreateCoi.Appointee.AppointeeCity = lDto.CreateCoi.NomineeDetails.NomineeCity;
      lDto.CreateCoi.Appointee.AppointeEmailID = lDto.CreateCoi.NomineeDetails.NomineeEmailID;
      lDto.CreateCoi.Appointee.AppointeeMobileNo = lDto.CreateCoi.NomineeDetails.NomineeCity;
      lDto.CreateCoi.Appointee.AppointeeState = lDto.CreateCoi.NomineeDetails.NomineeState;
    } else {
      lDto.CreateCoi.NomineeDetails.isnomineeminor = "No";
      lDto.CreateCoi.Appointee.AppointeeName = "";
      lDto.CreateCoi.Appointee.ApointeeRelationwithNominee = "";
      lDto.CreateCoi.Appointee.AppointeeDOB = "";
      lDto.CreateCoi.Appointee.AppointeeGender = "";
      lDto.CreateCoi.Appointee.AppointeeAddressLine1 = "";
      lDto.CreateCoi.Appointee.AppointeeAddressLine2 = "";
      lDto.CreateCoi.Appointee.AppointeePincode = "";
      lDto.CreateCoi.Appointee.AppointeeCity = "";
      lDto.CreateCoi.Appointee.AppointeeState = "";
    }
    setDto({ ...lDto });
  };
  const rows = [
    {
      Coverage: "",
      SumInsured: "",
      DeductibleType: "",
      DeductibleValue: "",
      Conditions: "",
    },
  ];
  const Member = [
    {
      type: "Input",
      label: "Name",
      required: true,
      visible: true,
      spacing: 3.8,
    },
    {
      type: "Input",
      label: "ABHA ID",
      visible: true,
      spacing: 3.8,
    },
    {
      type: "Input",
      label: "ABHA Address",
      visible: true,
      required: true,
      spacing: 3.8,
    },
    {
      type: "AutoComplete",
      label: "Gender",
      visible: true,
      required: true,
      spacing: 3.8,
    },
    {
      type: "DatePicker",
      label: "Date of Brith",
      required: true,
      visible: true,
      spacing: 3.8,
    },
    {
      type: "Input",
      label: "Age",
      required: true,
      visible: true,
      spacing: 3.8,
    },
    {
      type: "AutoComplete",
      label: "Nationality",
      visible: true,
      required: true,
      spacing: 3.8,
    },
    {
      type: "AutoComplete",
      label: "Relation with Proposer",
      visible: true,
      required: true,
      spacing: 3.8,
      Option: [],
    },
    {
      type: "Input",
      label: "Passport Number",
      visible: true,
      required: true,
      spacing: 3.8,
    },
    {
      type: "Input",
      label: "Mobile Number",
      visible: true,
      required: true,
      spacing: 3.8,
    },
    {
      type: "Typography",
      label: "Good Helath Declartions",
      visible: true,
      spacing: 6,
      sx: { fontWeight: "bold" },
    },
    {
      type: "Typography",
      label: "",
      visible: true,
      spacing: 12,
    },

    {
      type: "Custom",
      visible: true,

      return: (
        <Stack direction="row" justifyContent="center" spacing={2}>
          <MDTypography sx={{ fontSize: "13.5px" }}>
            I hereby declare on behalf of all members proposed to be insured that I/we are in good
            health and <br /> not under any treatment or surgical problem or follow up for any
            medical condition. Neither have I/ <br /> we ever been investigated for, diagnosed with
            or under treatment for any chronic health condition <br />
            nor are any medical or surgical treatment or follow up planned for me/us in the near
            future
          </MDTypography>
          <Stack justifyContent="center" direction="row">
            <RadioGroup
              row
              // onChange={(event) => handleSameAdress(event)}
              // value={PermanentAddressSameAsCommunicationAddress}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
        </Stack>
      ),
    },
    {
      type: "Button",
      label: "Reset",
      spacing: 3,
      variant: "outlined",
    },
    {
      type: "Typography",
      label: "",
      visible: true,
      spacing: 6,
    },
    {
      type: "Button",
      label: "Add Member",
      spacing: 3,
      // variant: "Contained",
    },
  ];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "MDDatePicker",
            label: "Master Policy Start Date",
            visible: true,
            required: true,
            dateFormat: "m-d-Y",
            path: "CreateCoi.masterpolicystartdate",
          },
          {
            type: "MDDatePicker",
            label: "Master Policy End Date",
            visible: true,
            required: true,
            dateFormat: "m-d-Y",
            path: "CreateCoi.masterpolienddate",
          },
          {
            type: "MDDatePicker",
            label: "Applicability Start Date",
            visible: true,
            required: true,
            dateFormat: "m-d-Y",
            path: "CreateCoi.aplicabiltystrtdate",
          },
          {
            type: "MDDatePicker",
            label: "Applicability End Date",
            visible: true,
            required: true,
            dateFormat: "m-d-Y",
            path: "CreateCoi.aaplicabilityenddate",
          },
          {
            type: "Input",
            label: "MP Holder Name",
            visible: true,
            required: true,
            path: "CreateCoi.masterpolicyholdername",
          },
          {
            type: "Input",
            label: "Master Policy Number",
            visible: true,
            required: true,
            path: "CreateCoi.masterpolicynumber",
          },
          {
            type: "AutoComplete",
            label: "Plan",
            visible: true,
            required: true,
            path: "CreateCoi.plan",
          },
          {
            type: "AutoComplete",
            label: "Zone of Visit",
            visible: true,
            required: true,
          },
          {
            type: "Input",
            label: "Sum Insured",
            visible: true,
            required: true,
            path: "CreateCoi.suminsured",
          },
          {
            type: "Input",
            label: "Trip Type",
            visible: true,
            required: true,
            path: "CreateCoi.triptype",
          },
        ],
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ paddingRight: 300 }}>Coverage</TableCell>
                      <TableCell style={{ paddingRight: 10 }}>Sum Insured</TableCell>
                      <TableCell style={{ paddingRight: 10 }}>Deductible Type</TableCell>
                      <TableCell style={{ paddingRight: 5 }}>Deductible Value</TableCell>
                      <TableCell style={{ paddingRight: 5 }}>Conditions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.Coverage}>
                        <TableCell style={{ paddingRight: 12 }}>{row.Coverage}</TableCell>
                        <TableCell style={{ paddingRight: 12 }}>{row.SumInsured}</TableCell>
                        <TableCell style={{ paddingRight: 12 }}>{row.DeductibleType}</TableCell>
                        <TableCell style={{ paddingRight: 12 }}>{row.DeductibleValue}</TableCell>
                        <TableCell style={{ paddingRight: 12 }}>{row.Conditions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ),
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            allowInput: true,
            // path: "PolicyStartDate",
            dateFormat: "Y-m-d",
            path: "CreateCoi.PolicyStartDate",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            visible: true,
            allowInput: true,
            // path: "PolicyStartDate",
            dateFormat: "Y-m-d",
            path: "CreateCoi.PolicyEndDate",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Travel Start Date",
            visible: true,
            allowInput: true,
            // path: "PolicyStartDate",
            dateFormat: "Y-m-d",
            path: "CreateCoi.Travelstrtdate",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Travel End Date",
            visible: true,
            allowInput: true,
            // path: "PolicyStartDate",
            dateFormat: "Y-m-d",
            path: "CreateCoi.travelenddate",
          },
          {
            type: "Input",
            label: "No. of Days",
            visible: true,
            path: "CreateCoi.NOOfDaysoftravl",
          },
          {
            label: "Places of Visit",
            type: "AutoComplete",
            visible: true,
            required: true,
            Option: [],
            // path:"CreateCoi.suminsured"
          },
        ],
        [
          {
            label: "Salutation",
            type: "AutoComplete",
            visible: true,
            required: true,
            options: masters.Salutation,
            path: "CreateCoi.InsuredDetails.Salutation",
          },
          {
            type: "Input",
            label: "Insured Name",
            visible: true,
            path: "CreateCoi.InsuredDetails.Name",
          },
          {
            label: "Insured Gender",
            type: "AutoComplete",
            visible: true,
            required: true,
            options: masters.Gender,
            path: "CreateCoi.InsuredDetails.Gender",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Date of Birth",
            visible: true,
            allowInput: true,
            path: "CreateCoi.InsuredDetails.DOB",
            dateFormat: "Y-m-d",
          },
          {
            label: "Purpose of Trip",
            type: "AutoComplete",
            visible: true,
            required: true,
            Option: [],
          },
          {
            type: "Input",
            label: "No. of Insured",
            visible: true,
            required: true,
          },
          {
            type: "Input",
            label: "Passport No",
            visible: true,
            path: "CreateCoi.InsuredDetails.passportno",
          },
          {
            type: "Input",
            label: "Email ID",
            visible: true,
            required: true,
            path: "CreateCoi.InsuredDetails.EmailId",
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            required: true,
            path: "CreateCoi.InsuredDetails.ContactNo",
          },
        ],
        [
          {
            type: "Input",
            label: "Address Line 1",
            visible: true,
            required: true,
            path: "CreateCoi.InsuredDetails.AddressLine1",
          },
          {
            type: "Input",
            label: "Address  Line 2",
            visible: true,
            path: "CreateCoi.InsuredDetails.AddressLine2",
          },
          {
            type: "Input",
            label: "Pincode",
            visible: true,
            required: true,
            path: "CreateCoi.InsuredDetails.Pincode",
          },
          {
            type: "Input",
            label: "City",
            visible: true,
            required: true,
            path: "CreateCoi.InsuredDetails.CityDistrict",
          },
          {
            type: "Input",
            label: "District",
            visible: true,
            required: true,
            path: "CreateCoi.InsuredDetailsCityDistrict",
          },
          {
            type: "Input",
            label: "State",
            visible: true,
            required: true,
            path: "CreateCoi.InsuredDetails.State",
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 9,
          },
          {
            type: "Button",
            label: "ADD Member",
            // startIcon: <AddIcon />,
            visible: true,
            // variant: "outlined",
            onClick: handleDrawerOpen,
            spacing: 3,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 8,
            return: (
              <Drawer
                anchor="right"
                open={lMasters.flags.Drawer}
                onClose={handleCloseDrawer}
                PaperProps={{
                  sx: { width: "60%", padding: "32px" },
                }}
              >
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <MDTypography variant="h6" color="primary">
                      Member Details
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Stack justifyContent="right" direction="row">
                      <MDButton variant="text" onClick={handleCloseDrawer}>
                        X
                      </MDButton>
                    </Stack>
                  </Grid>
                  {Member.map((elem) => (
                    <Grid item xs={elem.spacing}>
                      <NewRenderControl
                        item={elem}
                        // dto={leadInfo} setDto={setLeadInfo} nextFlag={nextFlg}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Drawer>
            ),
          },

          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "SNo",
            // path: "InsurableItem.0.RiskItems",
            rowPerPage: 20,
            columns: [
              {
                field: "",
                headerName: "Names",
                width: 80,
                align: "center",
              },
              {
                field: "ABHAID",
                headerName: "ABHA ID",
                width: 200,
                align: "center",
                renderCell: (params) => {
                  console.log("Data", params);
                  return <MDInput />;
                },
              },
              {
                field: "ABHAAddress",
                headerName: "ABHA Address",
                width: 150,
                align: "center",
                renderCell: (params) => {
                  console.log("Data", params);
                  return <MDInput />;
                },
              },
              {
                field: "Gender",
                headerName: "Gender",
                width: 150,
                align: "center",
              },
              {
                field: "DateofBrith",
                headerName: "Date of Brith",
                width: 150,
                align: "center",
              },
              {
                field: "Age",
                headerName: "Age",
                width: 150,
                align: "center",
              },
              {
                field: "RelationalWithProposer",
                headerName: "Relational With Proposer",
                width: 250,
                align: "center",
              },
              {
                field: "Nationality",
                headerName: "Nationality",
                width: 200,
                align: "center",
              },
              {
                field: "PassportNumber",
                headerName: "Passport Number",
                width: 200,
                align: "center",
              },
              {
                field: "MobileNumber",
                headerName: "Mobile Number",
                width: 160,
                align: "center",
              },

              {
                field: "Action",
                headerName: "Action",
                width: 80,
                renderCell: (params) => {
                  console.log("Data", params);
                  return (
                    <>
                      <MoreVertIcon onClick={() => handleClick()} />
                      <Menu
                        anchorEl={lMasters.flags.anchorEl}
                        open={lMasters.flags.anchorEl}
                        onClose={handleCloseActionButton}
                      >
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </Menu>
                    </>
                  );
                },
              },
            ],
          },
        ],

        [
          {
            type: "Input",
            label: "Nominee Name",
            visible: true,
            required: true,
            path: "CreateCoi.NomineeDetails.NomineeName",
          },
          {
            type: "MDDatePicker",
            label: "Nominee Date Of Birth",
            visible: true,
            required: true,
            dateFormat: "m-d-Y",
            path: "CreateCoi.NomineeDetails.NomineeDOB",
          },

          {
            type: "AutoComplete",
            label: "Nominee Relationship",
            visible: true,
            required: true,
            path: "CreateCoi.NomineeDetails.NomineeRelationWithProposer",
          },
          {
            type: "Input",
            label: "Email ID",
            visible: true,
            required: true,
            path: "CreateCoi.NomineeDetails.NomineeEmailID",
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            required: true,
            InputProps: { maxLength: 10 },
            path: "CreateCoi.NomineeDetails.NomineeMobile",
          },
          {
            type: "Input",
            label: "Address Line 1",
            visible: true,
            required: true,
            path: "CreateCoi.NomineeDetails.NomineeAddressLine1",
          },
          {
            type: "Input",
            label: "Address Line 2",
            visible: true,
            path: "CreateCoi.NomineeDetails.NomineeAddressLine2",
          },
          {
            type: "Input",
            label: "Pincode",
            visible: true,
            required: true,
            path: "CreateCoi.NomineeDetails.NomineePincode",
          },
          {
            type: "Input",
            label: "City/District",
            visible: true,
            required: true,
            path: "CreateCoi.NomineeDetails.NomineeCity",
          },
          {
            type: "Input",
            label: "State",
            visible: true,
            required: true,
            path: "CreateCoi.NomineeDetails.NomineeState",
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Member is Minor?",
            checkedVal: "Yes",
            unCheckedVal: "No",
            customOnChange: (e) => handleMinor(e),
            path: "CreateCoi.NomineeDetails.isnomineeminor",
            spacing: 12,
          },
        ],
        [
          {
            type: "Input",
            label: "Apoointee Name",
            visible: true,
            required: true,
            path: "CreateCoi.Appointee.AppointeeName",
          },
          {
            type: "MDDatePicker",
            label: "Apoointee Date Of Birth",
            visible: true,
            required: true,
            dateFormat: "m-d-Y",
            path: "CreateCoi.Appointee.AppointeeDOB",
          },

          {
            type: "AutoComplete",
            label: "Apoointee Relationship",
            visible: true,
            required: true,
            path: "CreateCoi.Appointee.AppointeeGender",
          },
          {
            type: "Input",
            label: "Email ID",
            visible: true,
            required: true,
            path: "CreateCoi.Appointee.AppointeEmailID",
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            required: true,
            InputProps: { maxLength: 10 },
            path: "CreateCoi.Appointee.AppointeeMobile",
          },
          {
            type: "Input",
            label: "Address Line 1",
            visible: true,
            required: true,
            path: "CreateCoi.Appointee.AppointeeAddressLine1",
          },
          {
            type: "Input",
            label: "Address Line 2",
            visible: true,
            required: true,
            path: "CreateCoi.Appointee.AppointeeAddressLine2",
          },
          {
            type: "Input",
            label: "Pincode",
            visible: true,
            required: true,
            path: "CreateCoi.Appointee.AppointeePincode",
          },
          {
            type: "Input",
            label: "City/District",
            visible: true,
            required: true,
            path: "CreateCoi.Appointee.AppointeeCity",
          },
          {
            type: "Input",
            label: "State",
            visible: true,
            required: true,
            path: "CreateCoi.Appointee.AppointeeState",
          },
        ],
      ];
      break;
    case 3:
      data = [[]];
      break;
    case 4:
      data = [[]];
      break;

    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep }) => {
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      fun = true;

      break;
    case 2:
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Back", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Back", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Back", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async () => {
  const mst = {
    Salutation: [],
    Gender: [],
    flags: {
      anchorEl: null,
      Drawer: false,
    },
  };
  const sal = await GetProdPartnermasterData(1037, "Salutation", { MasterType: "Salutation" });
  mst.Salutation = sal;
  const gen = await GetProdPartnermasterData(1037, "Gender", { MasterType: "Gender" });
  mst.Gender = gen;
  return mst;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
