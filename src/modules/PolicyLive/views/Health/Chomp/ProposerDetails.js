import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  Grid,
  Stack,
  Autocomplete,
  AccordionSummary,
} from "@mui/material";
import swal from "sweetalert";
// import RemoveIcon from "@mui/icons-material/Remove";
import { isValid } from "date-fns";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import MDDatePicker from "components/MDDatePicker";
// import masters from "./data/masterData";
// import swal from "sweetalert";
// import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { getMasterDatalist, getState, getDistrict } from "./data";

// import MDButton from "../../../../../components/MDButton";

// function getAge(dateString) {
//   const today = new Date();
//   const birthDate = new Date(dateString);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age -= 1;
//   }
//   return age;
// }
function NomineeComponent({
  nomObj,
  setAppointee,
  setNominee,
  passId,
  // handleAdd,
  // commonId,
  setNomineeAutoComplete,
  nomineeRelation,
  // nomineeDate,
  datetoShow,
  handleNomineeDateChange,
  // handleAppointeeDateChange,
  validDate,
  flags,
  masters,
  // appointteDate,
  //  handleDateChange,
  // handleDateChange1,
  // PolicyDto,
  flag,
}) {
  console.log("1111", passId);
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          {" "}
          <MDTypography variant="h6" color="primary">
            Nominee Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              <MDInput
                name="NomineeName"
                value={nomObj.NomineeName}
                label="Nominee Name"
                onChange={setNominee}
                error={nomObj.NomineeName === "" ? flag : null}
                required
              />
              {flag && nomObj.NomineeName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {/* {flag && nomObj.NomineeName < 3 ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  First Name should have minimum 3 characters
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              {/* <Autocomplete
                id="NomineeRelationship"
                options={masters.NomineeRelationship}
                onChange={setNomineeAutoComplete}
                //   onChange={(e, value) => handleSetAutoComplete(e, "TransactionType", value)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Nominee Relationship" />}
              /> */}
              <Autocomplete
                id="NomineeRelationWithProposer"
                options={nomineeRelation}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => setNomineeAutoComplete(e, value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Nominee Relationship"
                    required
                    error={
                      Object.values(masters.NomineeRelation || {}).every(
                        (x) => x === null || x === ""
                      )
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
              Object.values(masters.NomineeRelation || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              {/* <MDDatePicker
                fullWidth
                input={{ label: "Nominee DOB" }}
                value={new Date(nomineeDate)}
                onChange={(e) => handleDateChange(e, "nomineeDate")}
                options={{ altFormat: "d-m-Y", altInput: true }}
                // altFormat="Y-m-d"
              /> */}
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Nominee DOB"
                  name="NomineeDOB"
                  inputFormat="dd/MM/yyyy"
                 
                  handleNomineeDateChange
                  onChange={(date) => handleDateChange1(date, "NomineeDOB")}
                  // value={PolicyDto.NomineeDetails.NomineeDob}
                  value={nomineeDate}
                  renderInput={(params) => <MDInput {...params} sx={{ width: "100%" }} required />}
                  // renderInput={(params) => (
                  //   <TextField {...params} sx={{ width: "100%" }} required />
                  // )}
                />{" "}
              </LocalizationProvider>
            </Grid>  */}

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Nominee DOB"
                  inputFormat="dd/MM/yyyy"
                  type="login"
                  id="DOB"
                  value={datetoShow.nomineeDateofBirth}
                  onChange={(date) =>
                    handleNomineeDateChange(date, "nomineeDateofBirth", "NomineeDOB")
                  }
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      error={validDate || datetoShow.nomineeDateofBirth === "" ? flag : null}
                    />
                  )}
                />
                {flag && datetoShow.nomineeDateofBirth === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
                {validDate && datetoShow.nomineeDateofBirth === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the valid date
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
              {flags.nomineeFlag ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              <MDInput label="Nominee Age" name="NomineeAge" value={nomObj.NomineeAge} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>Gender</MDTypography>
                <RadioGroup
                  row
                  name="NomineeGender"
                  value={nomObj.NomineeGender}
                  onChange={setNominee}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Stack>
            </Grid> */}
            <Grid item sx={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Nominee Address</MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              <MDInput
                name="NomineeAddressLine1"
                value={nomObj.NomineeAddressLine1}
                label="Address 01"
                onChange={setNominee}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              <MDInput
                name="NomineeAddressLine2"
                value={nomObj.NomineeAddressLine2}
                label="Address 02"
                onChange={setNominee}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              <MDInput
                name="NomineePincode"
                value={nomObj.NomineePincode}
                label="Pincode"
                onChange={setNominee}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              <MDInput
                disabled
                name="NomineeCity"
                value={nomObj[0].NomineeCity}
                //  value={PolicyDto.NomineeDetails.City}
                label="City"
                // onChange={setNominee}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              <MDInput
                disabled
                name="NomineeState"
                value={nomObj[0].NomineeState}
                //  value={PolicyDto.NomineeDetails.State}
                label="State"
                //  onChange={setNominee}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            {nomObj[0].NomineeAge < 18 && nomObj[0].NomineeAge !== "" ? (
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary>
                  {" "}
                  <MDTypography variant="h6" color="primary">
                    Apointee Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
                      <MDInput
                        name="AppointeeName"
                        value={nomObj[0].AppointeeName}
                        label="Appointee Name"
                        onChange={setAppointee}
                        error={nomObj[0].AppointeeName === "" ? flags.apointeeFlag : null}
                        required
                      />
                      {flags.apointeeFlag ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the required fields
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
                      {/* <Autocomplete
                        id="AppointeeRelationshipwithNominee"
                        options={masters.AppointeeRelationshipwithNominee}
                        getOptionLabel={(option) => option.mValue}
                        onChange={setNomineeAutoComplete}
                        renderInput={(params) => (
                          <MDInput {...params} label="Appointee Relationship with Nominee" />
                        )}
                      /> */}
                      <Autocomplete
                        id="AppointeeRelationshipwithNominee"
                        options={nomineeRelation}
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => setNomineeAutoComplete(e, value)}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            label="Appointee Relationship with Nominee"
                            // error={
                            //   Object.values(masters.NomineeRelation || {}).every(
                            //     (x) => x === null || x === ""
                            //   )
                            //     ? flag
                            //     : null
                            // }
                            required
                          />
                        )}
                      />
                      {/* {flags.apointeeFlag &&
                      Object.values(masters.NomineeRelation || {}).every(
                        (x) => x === null || x === ""
                      ) ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill required field
                        </MDTypography>
                      ) : null} */}
                    </Grid>

                    {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Appointee DOB"
                          inputFormat="dd-MM-yyyy"
                          type="login"
                          id="DOB"
                          value={datetoShow.apointeeDateofBirth}
                          onChange={(date) =>
                            handleAppointeeDateChange(date, "apointeeDateofBirth", "AppointeeDOB")
                          }
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              sx={{ width: "100%" }}
                              required
                              error={validDate}
                            />
                          )}
                        />
                        {flags.errorFlag && PolicyDto.NomineeDetails.AppointeeDOB === null ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                        {validDate && datetoShow.apointeeDateofBirth === null ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill the valid date
                          </MDTypography>
                        ) : null}
                      </LocalizationProvider>
                      {flags.apointeeFlag ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the required fields
                        </MDTypography>
                      ) : null}
                    </Grid> */}

                    <Grid item sx={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6">Appointee Address</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
                      <MDInput
                        name="AppointeeAddressLine1"
                        value={nomObj[0].AppointeeAddressLine1}
                        label="Address 01"
                        onChange={setAppointee}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
                      <MDInput
                        name="AppointeeAddressLine2"
                        value={nomObj[0].AppointeeAddressLine2}
                        label="Address 02"
                        onChange={setAppointee}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
                      <MDInput
                        name="ApointeePincode"
                        value={nomObj[0].ApointeePincode}
                        label="Pincode"
                        onChange={setAppointee}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
                      <MDInput
                        disabled
                        name="AppointeeCity"
                        value={nomObj[0].AppointeeCity}
                        label="City"
                        // onChange={setNominee}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
                      <MDInput
                        disabled
                        name="AppointeeState"
                        // onChange={setNominee}
                        value={nomObj[0].AppointeeState}
                        label="State"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ) : null}

            {/* <Grid container justifyContent="center" alignItems="center">
              <MDButton onClick={(e) => handleAdd(e, commonId)}>Add</MDButton>
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

function AccordionComponent({
  // x,
  passId,
  // handleSetInsurable,
  // handleDateInsured,

  // firstInceptionDate,
  // handleOpen,

  // handleClose,
  nomObj,
  setNominee,
  setAppointee,
  handleAdd,
  commonId,
  // expanded,

  // flagArray,
  datetoShow,
  handleNomineeDateChange,
  handleAppointeeDateChange,
  validDate,
  flags,
  setNomineeAutoComplete,
  nomineeRelation,
  masters,
  // handleDateChange,
  handleDateChange1,
  appointteDate,
  nomineeDate,
  PolicyDto,
  flag,
}) {
  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "76%",
  //   transform: "translate(-85%, -60%)",
  //   width: 1200,
  //   bgcolor: "background.paper",
  //   // border: '2px solid #000',
  //   boxShadow: 24,
  //   borderRadius: "1rem",
  //   textAlign: "center",
  //   p: 4,
  // };

  useEffect(() => {
    console.log("commonId", commonId);
  }, [commonId]);
  // const handleChange=(e,id)=>{
  //   debugger
  //   setExpanded(id)
  // }
  return (
    <div>
      <MDBox pt={10} sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <MDBox>
            <MDBox>
              {/* <Grid container justifyContent="end" alignItems="end">
                <MDButton onClick={handleClose}>
                  <RemoveIcon />
                </MDButton>
              </Grid> */}
              <MDBox>
                <NomineeComponent
                  nomObj={nomObj}
                  datetoShow={datetoShow}
                  handleNomineeDateChange={handleNomineeDateChange}
                  handleAppointeeDateChange={handleAppointeeDateChange}
                  validDate={validDate}
                  flags={flags}
                  setNominee={setNominee}
                  setAppointee={setAppointee}
                  passId={passId}
                  handleAdd={handleAdd}
                  commonId={commonId}
                  setNomineeAutoComplete={setNomineeAutoComplete}
                  nomineeRelation={nomineeRelation}
                  // handleDateChange={handleDateChange}
                  handleDateChange1={handleDateChange1}
                  appointteDate={appointteDate}
                  nomineeDate={nomineeDate}
                  PolicyDto={PolicyDto}
                  masters={masters}
                  flag={flag}
                />
              </MDBox>
              {/* <Grid container justifyContent="center" alignItems="center">
                      <MDButton onClick={(e) => handleAdd(e, passId)}>Add</MDButton>
                    </Grid> */}
            </MDBox>
          </MDBox>
        </Grid>
      </MDBox>
    </div>
  );
}

function ProposerDetails({ PolicyDto, setPolicyDto, setPolicyIssueDto, flag }) {
  const [datetoShow, setDate] = useState({
    dateOfBirth: null,
    nomineeDateofBirth: null,
    apointeeDateofBirth: null,
    TPPolicyEndDate: null,
    ODPolicyEndDate: null,
    DateofRegistration: null,
  });
  const [validDate, setValidDate] = useState(false);

  console.log("data in Proposer", PolicyDto);
  const LPolicyDto = PolicyDto;
  const [propDobDate, setPropDobDate] = useState(null);
  console.log(propDobDate);
  // const [nomineeDate, setNomineeDate] = useState(null);
  // console.log(nomineeDate, "nomineeDate1");
  const [appointteDate, setAppointeeDate] = useState(null);
  const [salutationData, setSalutationData] = useState([]);
  const [open, setOpen] = useState(false);
  const [flagArray, setFlagArray] = useState([]);
  const [commonId, setCommonId] = useState(-1);
  const [final, setFinal] = useState([]);
  const [genderData, setgenderData] = useState([]);
  const [flags, setFlags] = useState({
    apointeeFlag: false,
    errorFlag: false,
  });
  const [nomineeRelation, setnomineeRelation] = useState([]);
  const [nomObj, setNomObj] = useState([
    {
      NomineeName: "",
      NomineeRelationWithProposer: "",
      NomineeDOB: "",
      NomineeAge: "",
      NomineeGender: "",
      NomineeAddressLine1: "",
      NomineeAddressLine2: "",
      NomineePincode: "",
      NomineeCity: "",
      NomineeState: "",
      AppointeeName: "",
      AppointeeRelationshipwithNominee: "",
      AppointeeGender: "",
      AppointeeAddressLine1: "",
      AppointeeAddressLine2: "",
      ApointeePincode: "",
      AppointeeCity: "",
      AppointeeState: "",
      AppointeeDOB: "",
    },
  ]);
  const [masters, setMasters] = useState({
    Gender: { mID: "", mValue: "" },
    NomineeRelation: { mID: "", mValue: "" },
    Salutation: { mID: "", mValue: "" },
    // MaritalStatus: { mID: "", mValue: "" },
    // NomineeSalutation: { mID: "", mValue: "" },
    // Occupation: { mID: "", mValue: "" },
  });
  const handleRadio = (e, type) => {
    switch (type) {
      case "eia": {
        if (e.target.value === "Yes") {
          LPolicyDto.ProposerDetails.eIANoYN = e.target.value;
          // setEiaFlag(true);
        } else {
          LPolicyDto.ProposerDetails.eIANoYN = e.target.value;
          // setEiaFlag(false);
        }
        break;
      }
      case "uid": {
        if (e.target.value === "Yes") {
          LPolicyDto.ProposerDetails.UniqueIdentificationNoYN = e.target.value;
          // setUidFlag(true);
        } else {
          LPolicyDto.ProposerDetails.UniqueIdentificationNoYN = e.target.value;
          // setUidFlag(false);
        }
        break;
      }
      case "vip": {
        if (e.target.value === "Yes") {
          LPolicyDto.ProposerDetails.VIPFlag = e.target.value;
          // setUidFlag(true);
        } else {
          LPolicyDto.ProposerDetails.VIPFlag = e.target.value;
          // setUidFlag(false);
        }
        break;
      }
      default:
        console.log("wrong case");
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };
  const [cust, setCust] = useState({
    FirstName: "",
    LastName: "",
    phoneno: "",
    otp: "",
    email: "",
    status: false,
    PlanError: false,
    NumberError: false,
    EmailError: false,
    PinCodeError: false,
    PinCodeError1: false,
    PANError: false,
    GSTError: false,
  });

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };
  const handleCalculateAge = (date) => {
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();
    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    }
    // get months when current month is greater
    else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }
    // get days
    // let dateAge;
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      // dateAge = 31 + currentDate - dobDate;
      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    // group the age in a single variable
    return yearAge;
  };
  const handleDateChange1 = (date, label) => {
    if (label === "proposerDOB") {
      console.log("proposerDOB");
      const dob = formatDate(date);
      LPolicyDto.ProposerDetails.DOB = dob;

      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      console.log(dob, "age1");
      const age = handleCalculateAge(LPolicyDto.ProposerDetails.DOB);
      console.log(age, "age1");
      // if (LPolicyDto.ProposerDetails.proposerAge >= 18) {
      //   setFlags((prevState) => ({ ...prevState, ageFlag: false }));
      //   LPolicyDto.ProposerDetails.proposerAge = age;
      // } else {
      //   setFlags((prevState) => ({ ...prevState, ageFlag: true }));
      // }

      setPropDobDate(dob);
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    } else if (label === "NomineeDOB1") {
      const dob = formatDate(date);
      nomObj.NomineeDob = dob;
      // setNomineeDate(dob);
      console.log(dob, "nomineeDate");
      const age = handleCalculateAge(dob);
      nomObj[0].NomineeAge = age;
      console.log(age, "nomineeDate");
      setNomObj((prev) => ({ ...prev, ...nomObj }));
      LPolicyDto.NomineeDetails = nomObj;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    } else if (label === "AppointeeDOB") {
      const dob = formatDate(date);
      nomObj.AppointeeDOB = dob;
      setAppointeeDate(dob);
      setNomObj((prev) => ({ ...prev, ...nomObj }));
      LPolicyDto.NomineeDetails = nomObj;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };
  const formatNomineeDate = (date) => {
    const nomineeformat = (val) => (val > 9 ? val : `0${val}`);
    const nomineedate = new Date(date);
    return `${nomineeformat(nomineedate.getDate())}/${nomineeformat(
      nomineedate.getMonth() + 1
    )}/${nomineedate.getFullYear()}`;
  };

  const handleNomineeDateChange = (value, label, type) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setValidDate(false);
      setDate((prevState) => ({ ...prevState, [label]: value }));

      nomObj[0][type] = formatNomineeDate(value);

      setNomObj((prev) => ({ ...prev, ...nomObj }));
      LPolicyDto.NomineeDetails = nomObj;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));

      const dob = value.toLocaleDateString("en-ZA");
      const age = handleCalculateAge(dob);
      nomObj[0].NomineeAge = age;
      setNomObj((prev) => ({ ...prev, ...nomObj }));
      console.log(nomObj, "nomobjjjjj");

      LPolicyDto.NomineeDetails = nomObj;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));

      if (age < 18) {
        // {
        //   swal({
        //     icon: "error",
        //     text: "Please enter valid Date of birth",
        //   });
        // }
        setFlags((prevState) => ({ ...prevState, nomineeage: age }));
        setFlags((prevState) => ({ ...prevState, GuardianFlag: true }));
      } else if (age > 18) {
        setFlags((prevState) => ({ ...prevState, GuardianFlag: false }));
      }
    } else {
      setValidDate(true);
      setDate((prevState) => ({ ...prevState, [label]: null }));
    }
  };

  const handleAppointeeDateChange = (value, label, type) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setValidDate(false);
      setDate((prevState) => ({ ...prevState, [label]: value }));

      nomObj[type] = formatNomineeDate(value);

      setNomObj((prev) => ({ ...prev, ...nomObj }));
      LPolicyDto.NomineeDetails = nomObj;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));

      const dob = value.toLocaleDateString("en-ZA");
      const age = handleCalculateAge(dob);
      nomObj.ApointeeAge = age;
      setNomObj((prev) => ({ ...prev, ...nomObj }));
      console.log(nomObj, "nomobjjjjj");
      LPolicyDto.NomineeDetails = nomObj;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));

      if (age < 18) {
        console.log("age is less than 18");
        // setFlags((prevState) => ({ ...prevState, nomineeage: age }));
        // setFlags((prevState) => ({ ...prevState, GuardianFlag: true }));
      } else if (age > 18) {
        // setFlags((prevState) => ({ ...prevState, GuardianFlag: false }));
        console.log("age is great than 18");
      }
    } else {
      setValidDate(true);
      setDate((prevState) => ({ ...prevState, [label]: null }));
    }
  };

  // useEffect(() => {
  //   console.log(PolicyDto, "policydtoexec");
  //   PolicyDto.ProposerDetails.proposerDOB = LPolicyDto.ProposerDetails.proposerDOB;
  // }, [LPolicyDto.ProposerDetails.proposerDOB]);

  // const handleCalculateAge5 = (date) => {
  //   // const dob = new Date(date);
  //   const dob = new Date(date);
  //   const dobYear = dob.getYear();
  //   const dobMonth = dob.getMonth();
  //   const dobDate = dob.getDate();

  //   const now = new Date();
  //   // extract the year, month, and date from current date
  //   const currentYear = now.getYear();
  //   const currentMonth = now.getMonth();
  //   const currentDate = now.getDate();

  //   let yearAge = currentYear - dobYear;
  //   let monthAge;
  //   if (currentMonth >= dobMonth) {
  //     monthAge = currentMonth - dobMonth;
  //   }
  //   // get months when current month is greater
  //   else {
  //     yearAge -= 1;
  //     monthAge = 12 + currentMonth - dobMonth;
  //   }

  //   // get days
  //   // let dateAge;
  //   if (currentDate >= dobDate) {
  //     // dateAge = currentDate - dobDate;
  //   } else {
  //     monthAge -= 1;
  //     // dateAge = 31 + currentDate - dobDate;

  //     if (monthAge < 0) {
  //       monthAge = 11;
  //       yearAge -= 1;
  //     }
  //   }
  //   // group the age in a single variable
  //   return yearAge;
  // };
  // const formatDate5 = (date) => {
  //   const format = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(date);
  //   return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  // };

  // const handleDateChange5 = (date, label) => {
  //   const dob = date;
  //   setPropDobDate(formatDate5(dob));
  //   const age = handleCalculateAge5(dob);
  //   if (label === "proposerDOB") {
  //     LPolicyDto.ProposerDetails.proposerDOB = formatDate5(dob);
  //     LPolicyDto.ProposerDetails.proposerAge = age;
  //     setPolicyDto((prevState) => ({
  //       ...prevState,
  //       ...LPolicyDto,
  //     }));
  //   }
  // };
  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}/${propformat(
      propdate.getMonth() + 1
    )}/${propdate.getFullYear()}`;
  };

  const handleDateChange = (value, label, type) => {
    console.log("value", type, value);
    datetoShow.dateOfBirth = null;
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      const dob = value.toLocaleDateString("en-ZA");
      const age = handleCalculateAge(dob);

      if (age < 18) {
        swal({
          icon: "error",
          text: "Please enter valid Date of birth",
        });
        setDate((prevState) => ({ ...prevState, [label]: null }));

        LPolicyDto.ProposerDetails.DOB = "";
        LPolicyDto.ProposerDetails.Age = "";

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      } else {
        setValidDate(false);
        setDate((prevState) => ({ ...prevState, [label]: value }));

        LPolicyDto.ProposerDetails.DOB = formatPropDate(value);
        LPolicyDto.ProposerDetails.Age = age;

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }

      // setPolicyDto((prevState) => ({
      //   ...prevState,
      //   ...LPolicyDto,
      // }));

      setFlags((prevState) => ({ ...prevState, Age: age }));
    } else {
      setValidDate(true);
      setDate((prevState) => ({ ...prevState, [label]: null }));
    }
  };

  // const handleDateChange = (e, type) => {
  //   switch (type) {
  //     // case "proposerDOB": {
  //     //   // setPropDobDate("");
  //     //   const today5 = new Date(e[0].toDateString()).toLocaleDateString();
  //     //   let [mm5, dd5, yyyy5] = today5.split("/");
  //     //   if (mm5 <= 9) {
  //     //     // mm1 = "0" + mm1;
  //     //     mm5 = `0${mm5}`;
  //     //   }
  //     //   if (dd5 <= 9) {
  //     //     // dd1 = "0" + dd1;
  //     //     dd5 = `0${dd5}`;
  //     //   }
  //     //   yyyy5 = `${yyyy5}`;
  //     //   // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
  //     //   const ab5 = `${yyyy5}-${mm5}-${dd5}`;

  //     //   // const show3 = `${dd5}/${mm5}/${yyyy5}`;
  //     //   const age = getAge(today5);
  //     //   console.log("Age", age);
  //     //   LPolicyDto.ProposerDetails.proposerAge = age;
  //     //   LPolicyDto.ProposerDetails.proposerDOB = ab5;
  //     //   setPropDobDate(ab5);
  //     //   break;
  //     // }
  //     case "nomineeDate": {
  //       const today6 = new Date(e[0].toDateString()).toLocaleDateString();
  //       let [mm6, dd6, yyyy6] = today6.split("/");
  //       if (mm6 <= 9) {
  //         // mm1 = "0" + mm1;
  //         mm6 = `0${mm6}`;
  //       }
  //       if (dd6 <= 9) {
  //         // dd1 = "0" + dd1;
  //         dd6 = `0${dd6}`;
  //       }
  //       yyyy6 = `${yyyy6}`;
  //       // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
  //       const ab6 = `${yyyy6}-${mm6}-${dd6}`;

  //       // const show3 = `${dd6}-${mm6}-${yyyy6}`;
  //       const age1 = getAge(today6);
  //       console.log("Age", age1);
  //       nomObj.NomineeAge = age1;
  //       nomObj.NomineeDob = ab6;
  //       setNomineeDate(ab6);
  //       setNomObj((prev) => ({ ...prev, ...nomObj }));

  //       console.log(nomObj, "nomObj......");
  //       break;
  //     }
  //     case "appointteDate": {
  //       const today7 = new Date(e[0].toDateString()).toLocaleDateString();
  //       let [mm7, dd7, yyyy7] = today7.split("/");
  //       if (mm7 <= 9) {
  //         // mm1 = "0" + mm1;
  //         mm7 = `0${mm7}`;
  //       }
  //       if (dd7 <= 9) {
  //         // dd1 = "0" + dd1;
  //         dd7 = `0${dd7}`;
  //       }
  //       yyyy7 = `${yyyy7}`;
  //       // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
  //       const ab7 = `${yyyy7}-${mm7}-${dd7}`;

  //       // const show3 = `${dd5}/${mm5}/${yyyy5}`;
  //       const age2 = getAge(today7);
  //       console.log("Age", age2);
  //       nomObj.AppointeeAge = age2;
  //       nomObj.AppointeeDob = ab7;
  //       setAppointeeDate(ab7);
  //       setNomObj((prev) => ({ ...prev, ...nomObj }));
  //       LPolicyDto.NomineeDetails = nomObj;
  //       setPolicyDto((prevState) => ({
  //         ...prevState,
  //         ...LPolicyDto,
  //       }));

  //       break;
  //     }

  //     default: {
  //       console.log("wrong date");
  //     }
  //   }

  //   // setPolicyDto(PolicyDto);
  //   setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

  //   console.log("date1", LPolicyDto);
  // };
  const handleSetAutoComplete = (e, type, value) => {
    // if (type === "TransactionType" || type === "PolicyType") {
    //   LPolicyDto[e.target.id.split("-")[0]] = value.mValue;
    // } else if (type === "GroupSize" || type === "CoverType") {
    //   LPolicyDto[e.target.id.split("-")[0]] = value.mID;}
    if (type === "Salutation") {
      LPolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      setMasters((prevState) => ({ ...prevState, Salutation: value }));
    } else if (type === "Gender") {
      LPolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      setMasters((prevState) => ({ ...prevState, Gender: value }));
    }

    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };
  const handleSameAdress = (e) => {
    LPolicyDto.ProposerDetails.CommunicationSameasPermanentYN = e.target.value;
    if (e.target.value === "Yes") {
      LPolicyDto.ProposerDetails.PermanentAddress.AddressLine1 =
        LPolicyDto.ProposerDetails.CommunicationAddress.AddressLine1;
      LPolicyDto.ProposerDetails.PermanentAddress.AddressLine2 =
        LPolicyDto.ProposerDetails.CommunicationAddress.AddressLine2;
      LPolicyDto.ProposerDetails.PermanentAddress.CityDistrict =
        LPolicyDto.ProposerDetails.CommunicationAddress.CityDistrict;
      LPolicyDto.ProposerDetails.PermanentAddress.State =
        LPolicyDto.ProposerDetails.CommunicationAddress.State;
      LPolicyDto.ProposerDetails.PermanentAddress.Pincode =
        LPolicyDto.ProposerDetails.CommunicationAddress.Pincode;
      LPolicyDto.ProposerDetails.PermanentAddress.Area =
        LPolicyDto.ProposerDetails.CommunicationAddress.Area;
      // PolicyDto.ProposerDetails.PermanentAddress.Country =
      //   PolicyDto.ProposerDetails.CommunicationAddress.Country;
    } else {
      LPolicyDto.ProposerDetails.PermanentAddress.AddressLine1 = "";
      LPolicyDto.ProposerDetails.PermanentAddress.AddressLine2 = "";
      LPolicyDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      LPolicyDto.ProposerDetails.PermanentAddress.State = "";
      LPolicyDto.ProposerDetails.PermanentAddress.Pincode = "";
      LPolicyDto.ProposerDetails.PermanentAddress.Area = "";
      // PolicyDto.ProposerDetails.PermanentAddress.Country = "";
    }

    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };
  const handleSetPermAdress = (e) => {
    if (e.target.name === "Pincode") {
      const pincodeRegex = /^[0-9]{0,6}$/;

      if (pincodeRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
        // setPolicyDto(PolicyDto)
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));

        if (e.target.value.length === 6) {
          setCust((prevState) => ({
            ...prevState,
            PinCodeError1: false,
          }));
          console.log(cust.PinCodeError1, "PinCodeError1");
        } else {
          setCust((prevState) => ({
            ...prevState,
            PinCodeError1: true,
          }));
          console.log(cust.PinCodeError1, "PinCodeError1");
        }

        // if (e.target.value.length < 7) {
        //   LPolicyDto.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
        //   // setPolicyDto(PolicyDto)
        //   setPolicyDto((prevState) => ({
        //     ...prevState,
        //     ...LPolicyDto,
        //   }));
        // }
      }
    } else {
      LPolicyDto.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
      // setPolicyDto(PolicyDto)
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };
  const pincodeRegex = /^[0-9]{0,6}$/;
  const handleSetCommAdress = (e) => {
    if (e.target.name === "Pincode") {
      if (pincodeRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
        // setPolicyDto(PolicyDto)
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        if (e.target.value.length === 6) {
          setCust((prevState) => ({
            ...prevState,
            PinCodeError: false,
          }));
          console.log(cust.PinCodeError, "pincodeerror");
        } else {
          setCust((prevState) => ({
            ...prevState,
            PinCodeError: true,
          }));
          console.log(cust.PinCodeError, "pincodeerror");
        }
      }
      // if (e.target.value.length < 7) {
      //   LPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
      //   // setPolicyDto(PolicyDto)
      //   setPolicyDto((prevState) => ({
      //     ...prevState,
      //     ...LPolicyDto,
      //   }));
      // }
    } else {
      LPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
      // setPolicyDto(PolicyDto)
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };
  const handleSetProposer = (e) => {
    // setPolicyDto(PolicyDto)

    if (e.target.name === "EmailId") {
      // const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      //  const nameReg = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;

      // const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // if (nameReg.test(e.target.value) || e.target.value === "") {

      setCust((prevState) => ({
        ...prevState,
        EmailError: false,
        [e.target.name]: e.target.value,
      }));

      LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
      setPolicyIssueDto((prevState) => ({
        ...prevState,
        EmailId: e.target.value,
      }));
      // }
    }
    // if (e.target.name === "EmailId") {
    //   const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    //   // const emailRegex = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    //   if (emailRegex.test(e.target.value)) {
    //     setPolicyIssueDto((prevState) => ({
    //       ...prevState,
    //       EmailId: e.target.value,
    //     }));
    //   }
    // }
    else if (
      e.target.name === "FirstName" ||
      e.target.name === "LastName" ||
      e.target.name === "MiddleName" ||
      e.target.name === "GSTLocation" ||
      e.target.name === "Nationality"
    ) {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    } else if (e.target.name === "MobileNo") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setCust((prevState) => ({
          ...prevState,
          NumberError: false,
          [e.target.name]: e.target.value,
        }));
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "EmployeeID  ") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "eIANo" || e.target.name === "UniqueIdentificationNumber") {
      const PanReg = /^([A-Za-z]|[0-9])+$/;
      if (PanReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "PAN") {
      // const PanReg =/[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      const PanReg = /^([A-Za-z]|[0-9])*$/;
      if (PanReg.test(e.target.value)) {
        console.log("true1");
        setCust((prevState) => ({
          ...prevState,
          PANError: false,
          [e.target.name]: e.target.value,
        }));
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "GST") {
      // const PanReg =/[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      const GstReg = /^([A-Za-z]|[0-9])*$/;
      if (GstReg.test(e.target.value)) {
        console.log("true1");
        setCust((prevState) => ({
          ...prevState,
          GSTError: false,
          [e.target.name]: e.target.value,
        }));
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else {
      LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };

  const handleOpen = () => {
    //
    setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleChange = (id) => () => {
    //  debugger;

    flagArray.map((x, key) => {
      if (key === id) {
        setFinal([x]);
      }
      return null;
    });
    // setFlagArray([
    //   ...flagArray.map((x, key) => {
    //     flagArray[x] = key === id;
    //     return x;
    //   }),
    // ]);
    setCommonId(id);
  };
  const setAppointee = (e) => {
    nomObj[0][e.target.name] = e.target.value;

    setNomObj((prevState) => ({ ...prevState, ...nomObj }));
    LPolicyDto.NomineeDetails = nomObj;
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const setNominee = (e) => {
    if (e.target.value === "Male") {
      nomObj[0][e.target.name] = e.target.value;
    } else {
      nomObj[0][e.target.name] = e.target.value;
    }

    if (e.target.name === "NomineeName") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          nomObj[0][e.target.name] = e.target.value;

          setNomObj((prevState) => ({ ...prevState, ...nomObj }));
          LPolicyDto.NomineeDetails = nomObj;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    } else {
      nomObj[0][e.target.name] = e.target.value;

      setNomObj((prevState) => ({ ...prevState, ...nomObj }));
      LPolicyDto.NomineeDetails = nomObj;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
    console.log(nomObj, "nomObj......");
  };
  const setNomineeAutoComplete = (e, value) => {
    nomObj[0][e.target.id.split("-")[0]] = value.mValue;
    setNomObj((prev) => ({ ...prev, ...nomObj }));
    setMasters((prevState) => ({ ...prevState, NomineeRelation: value }));
    LPolicyDto.NomineeDetails = nomObj;
    console.log(nomObj, "nomObj......");
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  };

  const onChange = async (e) => {
    // if (e.target.name === "FirstName") {
    //   if (e.target.value.length < 100) {
    //     const nameReg = /^[a-zA-Z\s]+$/;
    //     if (nameReg.test(e.target.value) || e.target.value === "") {
    //       const newValue = { ...cust, [e.target.name]: e.target.value };
    //       setCust(newValue);
    //     }
    //   }
    // } else if (e.target.name === "LastName") {
    //   if (e.target.value.length < 100) {
    //     const nameReg = /^[a-zA-Z\s]+$/;
    //     if (nameReg.test(e.target.value) || e.target.value === "") {
    //       const newValue = { ...cust, [e.target.name]: e.target.value };
    //       setCust(newValue);
    //     }
    //   }
    // } else if (e.target.name === "phoneno") {
    //   console.log("asdf", e.target.name);
    //   const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
    //   if (!numRegex.test(e.target.value)) {
    //     setCust((prevState) => ({ ...prevState, NumberError: true }));
    //   } else {
    //     setCust((prevState) => ({ ...prevState, NumberError: false }));
    //   }
    // }
    if (e.target.name === "EmailId") {
      console.log("emailregex...");
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(e.target.value)) {
        console.log("emailregex...trueee");
        setCust((prevState) => ({ ...prevState, EmailError: true }));
      } else {
        setCust((prevState) => ({ ...prevState, EmailError: false }));
        setCust({ ...cust, [e.target.name]: e.target.value });
        console.log("emailregex...false");
      }

      // } else {
      //   setCust({ ...cust, [e.target.name]: e.target.value });
    } else if (e.target.name === "MobileNo") {
      console.log("MobileNoMobileNo");
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setCust((prevState) => ({ ...prevState, NumberError: true }));
      } else {
        setCust((prevState) => ({ ...prevState, NumberError: false }));
      }
    } else if (e.target.name === "PAN") {
      const PanReg = /^([A-Za-z]|[0-9])+$/;
      if (PanReg.test(e.target.value)) {
        console.log("truee2");
        console.log(e.target.value, "truee2");
        if (e.target.value.length < 10) {
          console.log("truee2");
          setCust((prevState) => ({ ...prevState, PANError: true }));
        }
      } else {
        console.log("truee3");
        setCust((prevState) => ({ ...prevState, PANError: false }));
      }
    } else if (e.target.name === "GST") {
      const GstReg = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!GstReg.test(e.target.value)) {
        console.log("gst", e.target.value);
        if (e.target.value.length < 15) {
          setCust((prevState) => ({ ...prevState, GSTError: true }));
        }
      } else {
        setCust((prevState) => ({ ...prevState, GSTError: false }));
      }
    }
  };

  // const handleAdd = (e, passId) => {
  //   // debugger;
  //   console.log(e);
  //   console.log("passId", passId);
  //   LPolicyDto.InsurableItem[0].RiskItems[passId].NomineeDetails = [
  //     ...LPolicyDto.InsurableItem[0].RiskItems[passId].NomineeDetails,
  //     { ...nomObj },
  //   ];
  //   setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  //   // setPolicyDto(PolicyDto);
  //   nomObj.ApointeePincode = "";
  //   nomObj.AppointeeAddress1 = "";
  //   nomObj.AppointeeAddress2 = "";
  //   nomObj.AppointeeCity = "";
  //   nomObj.AppointeeGender = "";
  //   nomObj.AppointeeAge = "";
  //   nomObj.AppointeeDob = "";
  //   nomObj.AppointeeName = "";
  //   nomObj.AppointeeRelationshipwithNominee = "";
  //   nomObj.AppointeeState = "";
  //   nomObj.City = "";
  //   nomObj.NomineeAddress1 = "";
  //   nomObj.NomineeAddress2 = "";
  //   nomObj.NomineeAge = "";
  //   nomObj.NomineeDob = "";
  //   nomObj.NomineeGender = "";
  //   nomObj.NomineeName = "";
  //   nomObj.NomineeRelationship = "";
  //   nomObj.PinCode = "";
  //   nomObj.State = "";
  //   setNomObj((prevState) => ({ ...prevState, ...nomObj }));
  //   setOpen(false);
  // };
  // useEffect(async () => {
  //   const abc = await getSalutation();
  //   console.log("salutationData", abc);
  //   setSalutationData([...abc.data[0].mdata]);
  // }, []);
  useEffect(async () => {
    const mdatalist = await getMasterDatalist();
    console.log("masterdatalist", mdatalist);
    console.log("mdata", mdatalist.data[1]);
    setSalutationData([...mdatalist.data[87].mdata]);
    setgenderData([...mdatalist.data[47].mdata]);
    setnomineeRelation([...mdatalist.data[62].mdata]);
  }, []);
  // useEffect(() => {
  //   if (flags.ageFlag === true) {
  //     swal({
  //       text: "Age Should be greater than 18",
  //       icon: "error",
  //     });
  //   }
  // }, [flags.ageFlag]);
  useEffect(() => {
    console.log(cust.EmailError, "emailerroe");
  }, [cust]);
  useEffect(() => {
    const array = [];
    // setFlagArray([...array.fill(false, 0, PolicyDto.TotalMembers)]);

    for (let i = 0; i < PolicyDto.TotalMembers; i += 1) {
      array.push(false);
    }
    setFlagArray([...array]);
  }, [PolicyDto.TotalMembers]);
  const callstateDistrict = async (data2) => {
    const dist = await getDistrict(data2);
    const state = await getState(dist[0].mdata[0].mID);
    return { dist, state };
  };
  // useEffect(async () => {
  //   if (PolicyDto.NomineeDetails.PinCode.length === 6) {
  //     const abc = await callstateDistrict(PolicyDto.NomineeDetails.PinCode);
  //     console.log("abc", abc);
  //     LPolicyDto.NomineeDetails.City = abc.dist[0].mdata[0].mValue;
  //     LPolicyDto.NomineeDetails.State = abc.state[0].mdata[0].mValue;
  //     setPolicyDto((prevState) => ({
  //       ...prevState,
  //       PolicyDto: prevState.LPolicyDto,
  //     }));
  //   }
  // }, [PolicyDto.NomineeDetails.PinCode]);

  useEffect(async () => {
    if (nomObj[0].NomineePincode.length === 6) {
      const abc = await callstateDistrict(nomObj[0].NomineePincode);
      console.log("abc", abc);
      nomObj[0].NomineeCity = abc.dist[0].mdata[0].mValue;
      nomObj[0].NomineeState = abc.state[0].mdata[0].mValue;
      setNomObj((prevState) => ({
        ...prevState,
        ...nomObj,
      }));
    }
  }, [nomObj[0].NomineePincode]);

  useEffect(async () => {
    if (nomObj[0].ApointeePincode.length === 6) {
      const abc = await callstateDistrict(nomObj[0].ApointeePincode);
      console.log("abc", abc);
      nomObj[0].AppointeeCity = abc.dist[0].mdata[0].mValue;
      nomObj[0].AppointeeState = abc.state[0].mdata[0].mValue;
      setNomObj((prevState) => ({
        ...prevState,
        ...nomObj,
      }));
    }
  }, [nomObj[0].ApointeePincode]);
  return (
    <MDBox pt={3}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Customer Type
                </MDTypography>
                <RadioGroup row>
                  <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                  <FormControlLabel value="Corporate" control={<Radio />} label="Corporate" />
                </RadioGroup>
              </Stack>
            </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Salutation"
                options={salutationData}
                value={{ mValue: PolicyDto.ProposerDetails.Salutation }}
                // groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Salutation", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Salutation"
                    required
                    error={
                      Object.values(masters.Salutation || {}).every((x) => x === null || x === "")
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
              Object.values(masters.Salutation || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="First Name"
                name="FirstName"
                value={PolicyDto.ProposerDetails.FirstName}
                onChange={handleSetProposer}
                // inputProps={{ minLength: 3 }}
                error={
                  PolicyDto.ProposerDetails.FirstName.length < 3 ||
                  PolicyDto.ProposerDetails.FirstName === ""
                    ? flag
                    : null
                }
                required
              />
              {flag && PolicyDto.ProposerDetails.FirstName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {flag && PolicyDto.ProposerDetails.FirstName.length < 3 ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  First Name should have minimum 3 characters
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Middle Name"
                name="MiddleName"
                value={PolicyDto.ProposerDetails.MiddleName}
                onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Last Name"
                name="LastName"
                value={PolicyDto.ProposerDetails.LastName}
                onChange={handleSetProposer}
                error={PolicyDto.ProposerDetails.LastName === "" ? flag : null}
                required
              />
              {flag && PolicyDto.ProposerDetails.LastName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {/* {PolicyDto.ProposerDetails.proposerDOB !== " " ? (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Proposer DOB"
                    name="proposerDOB"
                    inputFormat="dd/MM/yyyy"
                    onChange={(date) => handleDateChange5(date, "proposerDOB")}
                    // value={propDobDate}
                    value={PolicyDto.ProposerDetails.proposerDOB}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: "100%" }} required />
                    )}
                    // error={flags.errorFlag}
                  />{" "}
                </LocalizationProvider>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Proposer DOB"
                    name="proposerDOB"
                    inputFormat="dd/MM/yyyy"
                    onChange={(date) => handleDateChange5(date, "proposerDOB")}
                    // value={propDobDate}
                    //  value={PolicyDto.ProposerDetails.proposerDOB}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: "100%" }} required />
                    )}
                    // error={flags.errorFlag}
                  />{" "}
                </LocalizationProvider>
              </Grid>
            )} */}

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Proposer DOB"
                  inputFormat="dd/MM/yyyy"
                  type="login"
                  id="DOB"
                  value={datetoShow.dateOfBirth}
                  onChange={(date) => handleDateChange(date, "dateOfBirth", "proposerDOB")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      error={validDate || datetoShow.dateOfBirth === "" ? flag : null}
                    />
                  )}
                />
                {flag && datetoShow.dateOfBirth === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
                {validDate && datetoShow.dateOfBirth === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the valid date
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
              {flags.ageFlag ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                disabled
                label="Proposer Age"
                name="proposerAge"
                value={PolicyDto.ProposerDetails.Age}
                // onChange={handleSetProposer}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput
                label="Gender"
                name="ProposerGender"
                value={PolicyDto.ProposerDetails.ProposerGender}
                onChange={handleSetProposer}
              /> */}
              <Autocomplete
                id="Gender"
                options={genderData}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Gender", value)}
                // getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Gender"
                    required
                    error={
                      Object.values(masters.Gender || {}).every((x) => x === null || x === "")
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag && Object.values(masters.Gender || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Email ID"
                name="EmailId"
                value={PolicyDto.ProposerDetails.EmailId}
                onChange={handleSetProposer}
                onBlur={onChange}
                error={PolicyDto.ProposerDetails.EmailId === "" ? flag : null}
                required
              />
              {cust.EmailError === true || cust.email !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  Enter Valid Email ID
                </MDTypography>
              ) : null}
              {flag && PolicyDto.ProposerDetails.EmailId === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Contact Number"
                name="MobileNo"
                // value={cust.phoneno}
                value={PolicyDto.ProposerDetails.MobileNo}
                onChange={handleSetProposer}
                onBlur={onChange}
                inputProps={{ maxLength: 10 }}
                error={PolicyDto.ProposerDetails.MobileNo === "" ? flag : null}
                required
              />{" "}
              {cust.NumberError === true || cust.phoneno !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  Enter valid 10 digit Valid Mobile Number
                </MDTypography>
              ) : null}
              {flag && PolicyDto.ProposerDetails.MobileNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Customer ID"
                name="CustomerID"
                value={PolicyDto.ProposerDetails.CustomerID}
                onChange={handleSetProposer}
                required
                disabled
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Communication Details
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Address 01"
            onChange={handleSetCommAdress}
            name="AddressLine1"
            value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1}
            error={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 === "" ? flag : null}
            required
          />
          {flag && PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Address 02"
            onChange={handleSetCommAdress}
            name="AddressLine2"
            value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2}
            error={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2 === "" ? flag : null}
            required
          />
          {flag && PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2 === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Area"
            onChange={handleSetCommAdress}
            name="Area"
            value={PolicyDto.ProposerDetails.CommunicationAddress.Area}
            error={PolicyDto.ProposerDetails.CommunicationAddress.Area === "" ? flag : null}
            required
          />
          {flag && PolicyDto.ProposerDetails.CommunicationAddress.Area === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            inputProps={{ minLength: 6 }}
            label="Pincode"
            onChange={handleSetCommAdress}
            onBlur={onChange}
            name="Pincode"
            value={PolicyDto.ProposerDetails.CommunicationAddress.Pincode}
            error={PolicyDto.ProposerDetails.CommunicationAddress.Pincode === "" ? flag : null}
            required
          />
          {cust.PinCodeError === true ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Enter Valid PinCode
            </MDTypography>
          ) : null}
          {flag && PolicyDto.ProposerDetails.CommunicationAddress.Pincode === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            disabled
            label="City"
            name="CityDistrict"
            value={PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict}
            error={PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict === "" ? flag : null}
            required
          />
          {flag && PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            disabled
            label="State"
            name="State"
            value={PolicyDto.ProposerDetails.CommunicationAddress.State}
            error={PolicyDto.ProposerDetails.CommunicationAddress.State === "" ? flag : null}
            required
          />
          {flag && PolicyDto.ProposerDetails.CommunicationAddress.State === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Country"
                onChange={handleSetCommAdress}
                name="Country"
                value={PolicyDto.ProposerDetails.CommunicationAddress.Country}
              />
            </Grid> */}

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={2} required>
            <MDTypography variant="h6">
              Is Your Permanent Address same as Communication Address
            </MDTypography>
            <RadioGroup
              row
              value={PolicyDto.ProposerDetails.CommunicationSameasPermanentYN}
              onChange={handleSameAdress}
              error={PolicyDto.ProposerDetails.CommunicationSameasPermanentYN === "" ? flag : null}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
          {flag && PolicyDto.ProposerDetails.CommunicationSameasPermanentYN === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
      </Grid>
      {PolicyDto.ProposerDetails.CommunicationSameasPermanentYN === "Yes" ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" color="primary">
              Permanent Details
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Address 01"
              onChange={handleSetPermAdress}
              name="AddressLine1"
              value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine1}
              error={PolicyDto.ProposerDetails.PermanentAddress.AddressLine1 === "" ? flag : null}
              required
            />
            {flag && PolicyDto.ProposerDetails.PermanentAddress.AddressLine1 === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Address 02"
              onChange={handleSetPermAdress}
              name="AddressLine2"
              value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine2}
              error={PolicyDto.ProposerDetails.PermanentAddress.AddressLine2 === "" ? flag : null}
              required
            />
            {flag && PolicyDto.ProposerDetails.PermanentAddress.AddressLine2 === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Area"
              onChange={handleSetPermAdress}
              name="Area"
              value={PolicyDto.ProposerDetails.PermanentAddress.Area}
              error={PolicyDto.ProposerDetails.PermanentAddress.Area === "" ? flag : null}
              required
            />
            {flag && PolicyDto.ProposerDetails.PermanentAddress.Area === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Pincode"
              onChange={handleSetPermAdress}
              name="Pincode"
              value={PolicyDto.ProposerDetails.PermanentAddress.Pincode}
              inputProps={{ minLength: 6 }}
              onBlur={onChange}
              error={PolicyDto.ProposerDetails.PermanentAddress.Pincode === "" ? flag : null}
              required
            />
            {cust.PinCodeError1 === true ? (
              <MDTypography
                sx={{
                  color: "red",
                  fontSize: "0.9rem",
                  textAlign: "left",
                }}
              >
                Enter Valid PinCode
              </MDTypography>
            ) : null}
            {flag && PolicyDto.ProposerDetails.PermanentAddress.Pincode === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="City"
              // onChange={handleSetPermAdress}
              name="CityDistrict"
              value={PolicyDto.ProposerDetails.PermanentAddress.CityDistrict}
              error={PolicyDto.ProposerDetails.PermanentAddress.CityDistrict === "" ? flag : null}
              required
            />
            {flag && PolicyDto.ProposerDetails.PermanentAddress.CityDistrict === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="State"
              // onChange={handleSetPermAdress}
              name="State"
              value={PolicyDto.ProposerDetails.PermanentAddress.State}
              error={PolicyDto.ProposerDetails.PermanentAddress.State === "" ? flag : null}
              required
            />
            {flag && PolicyDto.ProposerDetails.PermanentAddress.State === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" color="primary">
              Permanent Details
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Address 01"
              onChange={handleSetPermAdress}
              name="AddressLine1"
              value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine1}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Address 02"
              onChange={handleSetPermAdress}
              name="AddressLine2"
              value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine2}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Area"
              onChange={handleSetPermAdress}
              name="Area"
              value={PolicyDto.ProposerDetails.PermanentAddress.Area}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Pincode"
              onChange={handleSetPermAdress}
              name="Pincode"
              value={PolicyDto.ProposerDetails.PermanentAddress.Pincode}
              inputProps={{ minLength: 6 }}
              onBlur={onChange}
              required
            />
            {cust.PinCodeError1 === true ? (
              <MDTypography
                sx={{
                  color: "red",
                  fontSize: "0.9rem",
                  textAlign: "left",
                }}
              >
                Enter Valid PinCode
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="City"
              // onChange={handleSetPermAdress}
              name="CityDistrict"
              value={PolicyDto.ProposerDetails.PermanentAddress.CityDistrict}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="State"
              // onChange={handleSetPermAdress}
              name="State"
              value={PolicyDto.ProposerDetails.PermanentAddress.State}
              required
            />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2} mt={2}>
        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Country"
                onChange={handleSetPermAdress}
                name="Country"
                value={PolicyDto.ProposerDetails.PermanentAddress.Country}
              />
            </Grid> */}

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="PAN Number"
            name="PAN"
            inputProps={{ maxLength: 10 }}
            value={PolicyDto.ProposerDetails.PAN}
            onChange={handleSetProposer}
            onBlur={onChange}
          />
          {cust.PANError === true ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please fill valid PAN Card No
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="GST Number"
            name="GST"
            value={PolicyDto.ProposerDetails.GST}
            onChange={handleSetProposer}
            inputProps={{ maxLength: 15 }}
            onBlur={onChange}
          />
          {cust.GSTError === true ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please fill valid GST No
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="GST Location"
            name="GSTLocation"
            value={PolicyDto.ProposerDetails.GSTLocation}
            onChange={handleSetProposer}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Nationality"
            name="Nationality"
            value={PolicyDto.ProposerDetails.Nationality}
            onChange={handleSetProposer}
            error={PolicyDto.ProposerDetails.Nationality === "" ? flag : null}
            required
          />
          {flag && PolicyDto.ProposerDetails.Nationality === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="VIP"
            name="VIP"
            value={PolicyDto.ProposerDetails.VIP}
            onChange={handleSetProposer}
          />
        </Grid> */}

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="EmployeeID"
            name="EmployeeID"
            value={PolicyDto.ProposerDetails.EmployeeID}
            onChange={handleSetProposer}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
        <Stack direction="row" spacing={2}>
          <MDTypography variant="body1" required>
            VIP
          </MDTypography>
          <RadioGroup
            row
            value={PolicyDto.ProposerDetails.VIPFlag}
            onChange={(e) => {
              handleRadio(e, "vip");
            }}
            // error={PolicyDto.VIP === "" ? flag : null}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {/* {flag && PolicyDto.VIP === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
        <Stack direction="row" spacing={2}>
          <MDTypography variant="body1">Do you Have E-Insurance Account(eIA) &nbsp; *</MDTypography>
          <RadioGroup
            row
            value={PolicyDto.ProposerDetails.eIANoYN}
            onChange={(e) => {
              handleRadio(e, "eia");
            }}
            error={PolicyDto.ProposerDetails.eIANoYN === "" ? flag : null}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Stack>
        {flag && PolicyDto.ProposerDetails.eIANoYN === "" ? (
          <MDTypography sx={{ color: "red", fontSize: "11px" }}>
            Please Select this Field
          </MDTypography>
        ) : null}
      </Grid>
      {PolicyDto.ProposerDetails.eIANoYN === "Yes" ? (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="eIA Number"
            name="eIANo"
            value={PolicyDto.ProposerDetails.eIANo}
            onChange={handleSetProposer}
            error={PolicyDto.ProposerDetails.eIANo === "" ? flag : null}
            required
          />
          {flag && PolicyDto.ProposerDetails.eIANo === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
      ) : null}

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
        <Stack direction="row" spacing={2}>
          <MDTypography variant="body1">
            Do you Know Unique Identification Number &nbsp; *
          </MDTypography>
          <RadioGroup
            row
            value={PolicyDto.ProposerDetails.UniqueIdentificationNoYN}
            onChange={(e) => {
              handleRadio(e, "uid");
            }}
            error={PolicyDto.ProposerDetails.UniqueIdentificationNoYN === "" ? flag : null}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Stack>
        {flag && PolicyDto.ProposerDetails.UniqueIdentificationNoYN === "" ? (
          <MDTypography sx={{ color: "red", fontSize: "11px" }}>
            Please Select this Field
          </MDTypography>
        ) : null}
      </Grid>
      {PolicyDto.ProposerDetails.UniqueIdentificationNoYN === "Yes" ? (
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="UIN Number"
            name="UniqueIdentificationNumber"
            value={PolicyDto.ProposerDetails.UniqueIdentificationNumber}
            onChange={handleSetProposer}
            error={PolicyDto.ProposerDetails.UniqueIdentificationNumber === "" ? flag : null}
            required
          />
          {flag && PolicyDto.ProposerDetails.UniqueIdentificationNumber === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
      ) : null}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        {/* <MDInput label="Bank Branch ID" /> */}
        {/* {PolicyDto.InsurableItem[0].RiskItems.map((x, key) => ( */}
        <AccordionComponent
          // x={x}
          // key={key}
          // passId={key}
          datetoShow={datetoShow}
          handleNomineeDateChange={handleNomineeDateChange}
          handleAppointeeDateChange={handleAppointeeDateChange}
          validDate={validDate}
          flags={flags}
          handleOpen={handleOpen}
          open={open}
          // handleClose={handleClose}
          nomObj={nomObj}
          setNominee={setNominee}
          setAppointee={setAppointee}
          // handleAdd={handleAdd}
          commonId={commonId}
          flagArray={flagArray}
          final={final}
          // expanded={expanded}
          handleChange={handleChange}
          setNomineeAutoComplete={setNomineeAutoComplete}
          nomineeRelation={nomineeRelation}
          // handleDateChange={handleDateChange}
          handleDateChange1={handleDateChange1}
          appointteDate={appointteDate}
          //  nomineeDate={nomineeDate}
          PolicyDto={PolicyDto}
          // final={final[key]}
          masters={masters}
          flag={flag}
        />
        {/* ))} */}
      </Grid>

      {/* <MDButton sx={{ ml: 130 }} onClick={handleNext}>
        Proceed
      </MDButton> */}
    </MDBox>
  );
}

export default ProposerDetails;
