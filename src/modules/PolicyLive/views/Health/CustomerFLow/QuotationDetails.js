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
import { isValid } from "date-fns";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { DatePicker } from "@mui/x-date-pickers";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { getMasterDatalist, getState, getDistrict } from "./data";

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
  PolicyDto,
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
                error={PolicyDto.NomineeDetails[0].NomineeName === "" ? flag : null}
                required
              />
              {flag && PolicyDto.NomineeDetails[0].NomineeName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} xl={3} lg={3} xxl={3}>
              <Autocomplete
                id="NomineeRelationship"
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
                      <Autocomplete
                        id="AppointeeRelationshipwithNominee"
                        options={nomineeRelation}
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => setNomineeAutoComplete(e, value)}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            label="Appointee Relationship with Nominee"
                            required
                          />
                        )}
                      />
                    </Grid>

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
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

function AccordionComponent({
  // x,
  passId,

  nomObj,
  setNominee,
  setAppointee,
  handleAdd,
  commonId,

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
  useEffect(() => {
    console.log("commonId", commonId);
  }, [commonId]);

  return (
    <div>
      <MDBox pt={2} sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <MDBox>
            <MDBox>
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
            </MDBox>
          </MDBox>
        </Grid>
      </MDBox>
    </div>
  );
}

function ProposerDetails({ PolicyDto, setPolicyDto, setPolicyIssueDto, flag }) {
  const LPolicyDto = PolicyDto;
  const [transactionData, settransactionData] = useState([]);
  const [propDate, setPropDate] = useState("");
  const [polStartDate, setPolStartDate] = useState(null);
  const [polEndDate, setPolEndDate] = useState(null);
  console.log(polEndDate);
  const [policyTypeData, setpolicyTypeData] = useState([]);
  const [familyTypeData, setfamilyTypeData] = useState([]);
  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}/${format(dt.getMonth() + 1)}/${dt.getFullYear()}`;
  };
  const handleproposaldate = (e, name) => {
    if (name === "ProposalDate") {
      LPolicyDto[name] = formatDate(e);
      setPropDate(e);
    }
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  };
  const handleDateChange2 = (e, name) => {
    const today = new Date(e);
    console.log(e);
    LPolicyDto.PolicyStartDate = formatDate(today);
    setPolStartDate(e);
    console.log(LPolicyDto.PolicyStartDate);
    const mm1 = today.getMonth().toString();
    const dd1 = today.getDate().toString();
    if (dd1 === 1 && mm1 === 0) {
      today.setMonth(11);
    } else {
      today.setFullYear(today.getFullYear() + 1);
    }
    today.setDate(today.getDate() - 1);
    if (LPolicyDto["Policy Tenure"] > 1) {
      const newAdd = LPolicyDto["Policy Tenure"] - 1;
      today.setFullYear(today.getFullYear() + newAdd);
    }
    if (name === "PolicyStartDate") {
      setPolEndDate(formatDate(today));
      LPolicyDto.PolicyEndDate = formatDate(today);
      console.log(LPolicyDto.PolicyEndDate);
    }
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    console.log(PolicyDto);
  };
  useEffect(async () => {
    const mdatalist = await getMasterDatalist();
    settransactionData([...mdatalist.data[70].mdata]);
    setpolicyTypeData([...mdatalist.data[71].mdata]);
    setfamilyTypeData([...mdatalist.data[68].mdata]);
  }, [PolicyDto]);
  const [master, setMaster] = useState({
    FamilyType: { mID: "", mValue: "" },
    PolicyType: { mID: "", mValue: "" },
    TransactionType: { mID: "", mValue: "" },
  });
  const [state1, setState] = useState(false);
  const handleState = (e) => {
    console.log(e.target.value);
    if (e.target.value === "Yes") {
      setState(true);
      LPolicyDto.PrevPolicyDetails.PrevInsurerDetailsAvailable = e.target.value;
    } else if (e.target.value === "No") {
      setState(false);
      LPolicyDto.PrevPolicyDetails.PrevInsurerDetailsAvailable = e.target.value;
    }
    console.log(state1, "state");
  };
  const handleSetDetails = (e) => {
    if (e.target.name === "PreviousPolicyNumber") {
      const PanReg = /^([A-Za-z]|[0-9])+$/;
      if (PanReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.PrevPolicyDetails[e.target.name] = e.target.value;

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "PreviousPolicyPremium") {
      const PanReg = /^([[0-9])+$/;

      if (PanReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.PrevPolicyDetails[e.target.name] = e.target.value;

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else {
      LPolicyDto.PrevPolicyDetails[e.target.name] = e.target.value;

      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      console.log(LPolicyDto, "LPolicyDto");
    }
  };

  const [datetoShow, setDate] = useState({
    dateOfBirth: null,
    nomineeDateofBirth: null,
    apointeeDateofBirth: null,
    PolicyEffectiveDateFrom: null,
    PolicyEffectiveToDate: null,
    DateofRegistration: null,
  });
  const [validDate, setValidDate] = useState(false);

  console.log("data in Proposer", PolicyDto);
  const [propDobDate, setPropDobDate] = useState(null);
  console.log(propDobDate);
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
      NomineeRelationship: "",
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
      AppointeeAge: "",
      AppointeeDob: "",
    },
  ]);
  const [masters, setMasters] = useState({
    Gender: { mID: "", mValue: "" },
    NomineeRelation: { mID: "", mValue: "" },
    Salutation: { mID: "", mValue: "" },
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
  });

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
      nomObj.AppointeeDob = dob;
      setAppointeeDate(dob);
      const age = handleCalculateAge(dob);
      nomObj.AppointeeAge = age;
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

  const handlePolicyDate = (value, label) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setValidDate(false);
      setDate((prevState) => ({ ...prevState, [label]: value }));
      LPolicyDto.PrevPolicyDetails[label] = formatNomineeDate(value);
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
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
      } else if (age > 18) {
        // setFlags((prevState) => ({ ...prevState, GuardianFlag: false }));
        console.log("age is great than 18");
      }
    } else {
      setValidDate(true);
      setDate((prevState) => ({ ...prevState, [label]: null }));
    }
  };
  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}/${propformat(
      propdate.getMonth() + 1
    )}/${propdate.getFullYear()}`;
  };

  const handleDateChange = (value, label, type) => {
    console.log("value", value);
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

        LPolicyDto.ProposerDetails[type] = "";
        LPolicyDto.ProposerDetails.DOB = "";
        LPolicyDto.ProposerDetails.Age = "";

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      } else {
        setValidDate(false);
        setDate((prevState) => ({ ...prevState, [label]: value }));

        LPolicyDto.ProposerDetails[type] = formatPropDate(value);
        LPolicyDto.ProposerDetails.DOB = formatPropDate(value);
        LPolicyDto.ProposerDetails.Age = age;

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }

      setFlags((prevState) => ({ ...prevState, Age: age }));
    } else {
      setValidDate(true);
      setDate((prevState) => ({ ...prevState, [label]: null }));
    }
  };

  const handleSetAutoComplete = (e, type, value) => {
    if (type === "Salutation") {
      LPolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      setMasters((prevState) => ({ ...prevState, Salutation: value }));
    } else if (type === "Gender") {
      LPolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      setMasters((prevState) => ({ ...prevState, Gender: value }));
    } else if (type === "PolicyType") {
      if (type === "PolicyType") {
        setMaster((prevState) => ({ ...prevState, FamilyType: { mID: "", mValue: "" } }));
      }
      setMaster((prevState) => ({ ...prevState, PolicyType: value }));
      LPolicyDto[e.target.id.split("-")[0]] = value.mValue;
    } else if (type === "TransactionType") {
      setMaster((prevState) => ({ ...prevState, TransactionType: value }));
      LPolicyDto.BusinessTypeDesc = value.mValue;
    } else if (type === "FamilyType") {
      setMaster((prevState) => ({ ...prevState, FamilyType: value }));
      LPolicyDto[e.target.id.split("-")[0]] = value.mValue;
      console.log(LPolicyDto, "familytypeee");
    }

    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };
  const handleChange1 = (e, mValue) => {
    const numbers = mValue.mValue.match(/\d+/g).map(Number);
    let sum = 0;
    for (let i = 0; i < numbers.length; i += 1) {
      sum += numbers[i];
    }

    LPolicyDto.FamilyType = sum;

    LPolicyDto.TotalMembers = sum;

    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    // if (e.target.id.split("-")[0] === "FamilyType" && sum > 0) {

    // } else if (e.target.id.split("-")[0] === "FamilyType" && sum === 0) {
    //   LPolicyDto.InsurableItem[0].RiskItems = [];
    //   setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    // }
    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    handleSetAutoComplete(e, "FamilyType", mValue);
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
    } else {
      LPolicyDto.ProposerDetails.PermanentAddress.AddressLine1 = "";
      LPolicyDto.ProposerDetails.PermanentAddress.AddressLine2 = "";
      LPolicyDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      LPolicyDto.ProposerDetails.PermanentAddress.State = "";
      LPolicyDto.ProposerDetails.PermanentAddress.Pincode = "";
      LPolicyDto.ProposerDetails.PermanentAddress.Area = "";
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
    } else {
      LPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };
  const handleSetProposer = (e) => {
    if (e.target.name === "EmailId") {
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
    } else if (
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
    } else if (e.target.name === "ContactNo") {
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
      const PanReg = /^([A-Za-z]|[0-9])+$/;

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
    } else {
      LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (id) => () => {
    flagArray.map((x, key) => {
      if (key === id) {
        setFinal([x]);
      }
      return null;
    });
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
    } else if (e.target.name === "ContactNo") {
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
    }
  };

  useEffect(async () => {
    const mdatalist = await getMasterDatalist();
    console.log("masterdatalist", mdatalist);
    console.log("mdata", mdatalist.data[1]);
    setSalutationData([...mdatalist.data[43].mdata]);
    setgenderData([...mdatalist.data[1].mdata]);
    setnomineeRelation([...mdatalist.data[37].mdata]);
  }, []);

  useEffect(() => {
    console.log(cust.EmailError, "emailerroe");
  }, [cust]);
  useEffect(() => {
    const array = [];

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
        <AccordionSummary>
          <MDTypography variant="h6" color="primary">
            Policy Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="TransactionType"
                options={transactionData}
                defaultValue={{ mValue: "New Business" }}
                value={master.TransactionType}
                onChange={(e, value) => handleSetAutoComplete(e, "TransactionType", value)}
                getOptionLabel={(option) => option.mValue}
                getOptionDisabled={(option) =>
                  option.mValue === "Rollover Business" ||
                  option.mValue === "Renewal Business" ||
                  option.mValue === "Transferred Business"
                }
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Transaction Type"
                    required
                    disableClearable
                    error={
                      Object.values(master.TransactionType || {}).every(
                        (x) => x === null || x === ""
                      )
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
              Object.values(master.TransactionType || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disableFuture
                  label="Proposal Date"
                  inputFormat="dd/MM/yyyy"
                  value={propDate}
                  onChange={(e) => handleproposaldate(e, "ProposalDate")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      error={propDate === "" ? flag : null}
                    />
                  )}
                />
                {flag && propDate === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Policy Start Date"
                  inputFormat="dd/MM/yyyy"
                  value={polStartDate}
                  disablePast
                  onChange={(e) => handleDateChange2(e, "PolicyStartDate")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      error={polStartDate === null ? flag : null}
                    />
                  )}
                />
                {flag && polStartDate === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Policy End Date"
                  // inputFormat="dd/MM/yyyy"
                  id="Policy End Date"
                  value={polEndDate}
                  
                  disabled
                  required
                  renderInput={(params) => <MDInput {...params} sx={{ width: "100%" }} />}
                />
              </LocalizationProvider> */}
              <MDInput
                label="Policy End Date"
                value={LPolicyDto.PolicyEndDate}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="PolicyType"
                options={policyTypeData}
                value={master.PolicyType}
                onChange={(e, value) => handleSetAutoComplete(e, "PolicyType", value)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Policy Type"
                    required
                    error={
                      Object.values(LPolicyDto.FamilyType || {}).every(
                        (x) => x === null || x === ""
                      )
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
              Object.values(master.PolicyType || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {PolicyDto.PolicyType === "Individual" ? (
                <Autocomplete
                  id="FamilyType"
                  options={familyTypeData}
                  // onChange={calculateInsurer("2A+3C")}
                  // onchange={(value) => calculateInsurer(value)}
                  // onChange={(e, value) => handleSetAutoComplete(e, "FamilyType", value)}
                  getOptionLabel={(option) => option.mValue}
                  getOptionDisabled={(option) => option.mValue !== "1A"}
                  // onChange={(e, mValue) => calculateInsurer(e, mValue)}

                  value={master.FamilyType}
                  onChange={(e, value) => handleChange1(e, value)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      required
                      label="Family Type"
                      error={
                        Object.values(master.FamilyType || {}).every((x) => x === null || x === "")
                          ? flag
                          : null
                      }
                    />
                  )}
                />
              ) : (
                <Autocomplete
                  id="FamilyType"
                  options={familyTypeData}
                  // onChange={calculateInsurer("2A+3C")}
                  // onchange={(value) => calculateInsurer(value)}
                  // onChange={(e, value) => handleSetAutoComplete(e, "FamilyType", value)}
                  getOptionLabel={(option) => option.mValue}
                  value={master.FamilyType}
                  getOptionDisabled={(option) => option.mValue === "1A"}
                  // onChange={(e, mValue) => calculateInsurer(e, mValue)}

                  onChange={(e, value) => handleChange1(e, value)}
                  // onChange={(e, mValue) => {
                  //   handleChange(e, mValue);
                  //   handleSetAutoComplete(e, "PolicyType", mValue)();
                  // }}

                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Family Type"
                      required
                      error={
                        Object.values(master.FamilyType || {}).every((x) => x === null || x === "")
                          ? flag
                          : null
                      }
                    />
                  )}
                />
              )}
              {flag &&
              Object.values(master.FamilyType || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Service Tax Extemption Category"
                value={PolicyDto.STaxExemptionCategory}
                onChange={handleChange}
                disabled
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          {" "}
          <MDTypography variant="h6" color="primary">
            Proposer Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
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
                    label="Title"
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
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Gender"
                options={genderData}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Gender", value)}
                // getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Proposer Gender"
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
                label="Mobile Number"
                name="ContactNo"
                value={PolicyDto.ProposerDetails.ContactNo}
                onChange={handleSetProposer}
                onBlur={onChange}
                inputProps={{ maxLength: 10 }}
                error={PolicyDto.ProposerDetails.ContactNo === "" ? flag : null}
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
              {flag && PolicyDto.ProposerDetails.ContactNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
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
              />
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

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="EmployeeID"
                name="EmployeeID"
                value={PolicyDto.ProposerDetails.EmployeeID}
                onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
              <Stack direction="row" spacing={2}>
                <MDTypography variant="body1">Do you Have E-Insurance Account(eIA)*</MDTypography>
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
                  Do you Know Unique Identification Number*
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={2} required>
            <MDTypography variant="h6">
              Is Your Permanent Address same as Communication Address
            </MDTypography>
            <RadioGroup
              row
              value={PolicyDto.ProposerDetails.CommunicationSameasPermanentYN}
              onChange={handleSameAdress}
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
              label="Address 02"
              onChange={handleSetPermAdress}
              name="AddressLine2"
              value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine2}
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
              onChange={handleSetPermAdress}
              name="Area"
              value={PolicyDto.ProposerDetails.PermanentAddress.Area}
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
            {flag && PolicyDto.ProposerDetails.PermanentAddress.Pincode === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="City"
              name="CityDistrict"
              value={PolicyDto.ProposerDetails.PermanentAddress.CityDistrict}
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
              label="State"
              name="State"
              value={PolicyDto.ProposerDetails.PermanentAddress.State}
              required
            />
            {flag && PolicyDto.ProposerDetails.PermanentAddress.State === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
        </Grid>
      )}

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
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <AccordionComponent
          datetoShow={datetoShow}
          handleNomineeDateChange={handleNomineeDateChange}
          handleAppointeeDateChange={handleAppointeeDateChange}
          validDate={validDate}
          flags={flags}
          handleOpen={handleOpen}
          open={open}
          nomObj={nomObj}
          setNominee={setNominee}
          setAppointee={setAppointee}
          commonId={commonId}
          flagArray={flagArray}
          final={final}
          handleChange={handleChange}
          setNomineeAutoComplete={setNomineeAutoComplete}
          nomineeRelation={nomineeRelation}
          handleDateChange1={handleDateChange1}
          appointteDate={appointteDate}
          PolicyDto={PolicyDto}
          masters={masters}
          flag={flag}
        />
      </Grid>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" color="primary">
            Past Policy Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDTypography variant="h6" required>
                Is previous insurer details available?
              </MDTypography>
              <RadioGroup row>
                <FormControlLabel
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                  onChange={handleState}
                />
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="No"
                  onChange={handleState}
                />
              </RadioGroup>
            </Stack>
          </Grid>
          {state1 === true ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Previous Policy Number"
                  name="PreviousPolicyNo"
                  value={PolicyDto.OtherDetails.PreviousPolicyNo}
                  onChange={handleSetDetails}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Previous Policy Premium"
                  name="PreviousPolicyPremium"
                  value={PolicyDto.OtherDetails.PreviousPolicyPremium}
                  onChange={handleSetDetails}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Policy Effective From Date"
                    inputFormat="dd/MM/yyyy"
                    type="login"
                    name="PolicyEffectiveDateFrom"
                    value={datetoShow.PolicyEffectiveDateFrom}
                    onChange={(date) => handlePolicyDate(date, "PolicyEffectiveDateFrom")}
                    renderInput={(params) => <MDInput {...params} sx={{ width: "100%" }} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Policy Effective TO Date "
                    inputFormat="dd/MM/yyyy"
                    type="login"
                    name="PolicyEffectiveToDate"
                    value={datetoShow.PolicyEffectiveToDate}
                    onChange={(date) => handlePolicyDate(date, "PolicyEffectiveToDate")}
                    renderInput={(params) => <MDInput {...params} sx={{ width: "100%" }} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          ) : null}
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default ProposerDetails;
