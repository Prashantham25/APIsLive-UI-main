import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Stack, Autocomplete, Chip, Checkbox } from "@mui/material";
import Modal from "@mui/material/Modal";
// import CloseIcon from "@material-ui/icons-material/Close";
// import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDDatePicker from "components/MDDatePicker";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { isValid } from "date-fns";
import swal from "sweetalert";

import { getMasterDatalist } from "./data";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
// import { Key } from "@mui/icons-material";
import masters from "./data/masterData";

function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

// import Icon from "@mui/material/Icon";
function NomineeComponent({
  nomObj,
  setNominee,
  passId,
  handleAdd,
  commonId,
  setNomineeAutoComplete,
  nomineeDate,
  // appointteDate,
  handleDateChange,
}) {
  console.log("1111", passId);
  return (
    <MDBox>
      <Grid container spacing={2}>
        <Grid item sx={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6">Nominee Details</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={4} lg={4} xxl={4}>
          <MDInput
            name="NomineeName"
            value={nomObj.NomineeName}
            label="Nominee Name"
            onChange={setNominee}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={4} lg={4} xxl={4}>
          <Autocomplete
            id="NomineeRelationship"
            options={masters.NomineeRelationship}
            onChange={setNomineeAutoComplete}
            //   onChange={(e, value) => handleSetAutoComplete(e, "TransactionType", value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Nominee Relationship" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker
            fullWidth
            input={{ label: "Nominee DOB" }}
            value={new Date(nomineeDate)}
            onChange={(e) => handleDateChange(e, "nomineeDate")}
            options={{ altFormat: "d-m-Y", altInput: true }}
            // altFormat="Y-m-d"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Nominee Age" name="NomineeAge" value={nomObj.NomineeAge} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={4} lg={4} xxl={4}>
          <Stack direction="row" spacing={2}>
            <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>Gender</MDTypography>
            <RadioGroup row name="NomineeGender" value={nomObj.NomineeGender} onChange={setNominee}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </Stack>
        </Grid>

        <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="NomineeAddress1"
            value={nomObj.NomineeAddress1}
            label="Address 01"
            onChange={setNominee}
          />
        </Grid>
        <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="NomineeAddress2"
            value={nomObj.NomineeAddress2}
            label="Address 02"
            onChange={setNominee}
          />
        </Grid>

        <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="NomineePincode"
            value={nomObj.NomineePincode}
            label="Pincode"
            onChange={setNominee}
          />
        </Grid>
        <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="NomineeCity"
            value={nomObj.NomineeCity}
            label="City"
            onChange={setNominee}
          />
        </Grid>
        <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="NomineeState"
            value={nomObj.NomineeState}
            label="State"
            onChange={setNominee}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        {nomObj.NomineeAge < 18 && nomObj.NomineeAge !== "" ? (
          <>
            <Grid item sx={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Appointee Details</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} xl={4} lg={4} xxl={4}>
              <MDInput
                name="AppointeeName"
                value={nomObj.AppointeeName}
                label="Appointee Name"
                onChange={setNominee}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} xl={4} lg={4} xxl={4}>
              <Autocomplete
                id="AppointeeRelationshipwithNominee"
                options={masters.AppointeeRelationshipwithNominee}
                getOptionLabel={(option) => option.mValue}
                onChange={setNomineeAutoComplete}
                renderInput={(params) => (
                  <MDInput {...params} label="Appointee Relationship with Nominee" />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                input={{ label: "Appointee DOB" }}
                value={appointteDate}
                onChange={(e) => handleDateChange(e, "appointteDate")}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Apointee Age" name="NomineeAge" value={nomObj.AppointeeAge} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} xl={4} lg={4} xxl={4}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>Gender</MDTypography>
                <RadioGroup
                  row
                  name="AppointeeGender"
                  value={nomObj.AppointeeGender}
                  onChange={setNominee}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Stack>
            </Grid>

            <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="AppointeeAddressLine1"
                value={nomObj.AppointeeAddressLine1}
                label="Address 01"
                onChange={setNominee}
              />
            </Grid>
            <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="AppointeeAddressLine2"
                value={nomObj.AppointeeAddressLine2}
                label="Address 02"
                onChange={setNominee}
              />
            </Grid>

            <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="ApointeePincode"
                value={nomObj.ApointeePincode}
                label="Pincode"
                onChange={setNominee}
              />
            </Grid>
            <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="AppointeeCity"
                value={nomObj.AppointeeCity}
                label="City"
                onChange={setNominee}
              />
            </Grid>
            <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="AppointeeState"
                onChange={setNominee}
                value={nomObj.AppointeeState}
                label="State"
              />
            </Grid>
          </>
        ) : null}

        <Grid container justifyContent="center" alignItems="center">
          <MDButton onClick={(e) => handleAdd(e, commonId)}>Add</MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function AccordionComponent({
  x,
  passId,
  handleSetInsurable,
  handleInsureDateChange,
  handleSetAutoComplete,
  // handleDateInsured,
  //  displayflag,
  // firstInceptionDate,
  // handleOpen,
  open,
  handleClose,
  nomObj,
  setNominee,
  handleAdd,
  commonId,
  // expanded,
  handleChange,
  // flagArray,
  // insuDobDate,
  final,
  setNomineeAutoComplete,
  handleDateChange,
  appointteDate,
  nomineeDate,
  genderData,
  maritalStatus,
  nomineeRelation,
  dependent,
  LPolicyDto,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "76%",
    transform: "translate(-85%, -60%)",
    width: 1200,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 4,
  };

  useEffect(() => {
    console.log("commonId", commonId);
  }, [commonId]);
  // const handleChange=(e,id)=>{
  //   debugger
  //   setExpanded(id)
  // }
  console.log(x, "xx");
  return (
    <div>
      <MDBox pt={3} sx={{ width: "100%" }}>
        <Grid container spacing={1}>
          <Accordion
            expanded={final[0]}
            onChange={handleChange(passId)}
            // defaultExpanded
            disableGutters
            sx={{
              boxShadow: "unset",
              border: "unset",
              "&:before": { display: "none" },
            }}
            style={{
              backgroundColor: "rgba(217, 217, 217, 0.2)",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id={passId}>
              <MDTypography variant="h6" color="black">
                Insured Member 0{passId + 1}
              </MDTypography>
              {/* <MDButton size="small" variant="outlined" sx={{ ml: 100 }}>
                Reset
              </MDButton> */}
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {x.IsInsuredDisableFlag ? null : (
                    <Stack direction="row" spacing={2}>
                      <MDTypography variant="h6">Is Insured Same As Proposer?</MDTypography>
                      <RadioGroup
                        row
                        value={x.IsProposersameasInsuredYN}
                        onChange={(e) => {
                          handleSetInsurable(e, passId, "IsProposersameasInsuredYN");
                        }}
                        // disabled={x.IsInsuredDisableFlag}
                      >
                        <FormControlLabel
                          value="Yes"
                          disabled={x.IsInsuredDisableFlag}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          disabled={x.IsInsuredDisableFlag}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </Stack>
                  )}
                </Grid>

                {x.displayflag === "Yes" ? (
                  <>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        disabled
                        label="Member Name"
                        name="Name"
                        value={x.Name}
                        // onChange={handleSetProposer}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        disabled
                        label="Member DOB"
                        name="DOB"
                        value={x.DOB}
                        // onChange={handleSetProposer}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        disabled
                        label="Member Age"
                        name="Age"
                        value={x.Age}
                        // onChange={handleSetProposer}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        disabled
                        label="Gender"
                        id="Gender"
                        value={x.Gender}
                        // onChange={handleSetProposer}
                        required
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        required
                        name="Name"
                        value={x.Name}
                        // onChange={(e, id) => {handleSetInsurable(e, passId, (id = 1))}}
                        onChange={(e) => {
                          handleSetInsurable(e, passId, "base");
                        }}
                        label="Member Name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Member DOB"
                          inputFormat="dd/MM/yyyy"
                          type="login"
                          id="DOB"
                          // value={x.InsuredDOB}
                          value={LPolicyDto.InsurableItem[0].RiskItems[passId].displayDOB}
                          //  value={insuDobDate.InsuredDOB}
                          onChange={(date) => handleInsureDateChange(date, "DOB", passId)}
                          renderInput={(params) => (
                            <MDInput {...params} sx={{ width: "100%" }} required />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        required
                        name="Age"
                        value={x.Age}
                        // onChange={(e)=>handleSetInsurable(e,passId)}
                        label="Member Age"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <Autocomplete
                        id="Gender"
                        options={genderData}
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handleSetAutoComplete(e, "Gender", value, passId)}
                        // onChange={(e) => {
                        //   handleSetInsurable(e, passId, "base");
                        // }}
                        renderInput={(params) => <MDInput {...params} label="Gender" required />}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  {/* <MDInput
                    required
                    name="InsuredMaritalStatus"
                    // value={x.InsuredRelationWithProposer}
                    // onChange={(e) => {
                    //   handleSetInsurable(e, passId, "base");
                    // }}
                    label="Insured Marital Status"
                  /> */}
                  <Autocomplete
                    id="InsuredMaritalStatus"
                    options={maritalStatus}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) =>
                      handleSetAutoComplete(e, "InsuredMaritalStatus", value, passId)
                    }
                    // onChange={(e) => {
                    //   handleSetInsurable(e, passId, "base");
                    // }}
                    renderInput={(params) => (
                      <MDInput {...params} label="Insured Marital Status" required />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  {/* <MDInput
                    required
                    name="Dependent"
                    // value={x.InsuredRelationWithProposer}
                    // onChange={(e) => {
                    //   handleSetInsurable(e, passId, "base");
                    // }}
                    label="Dependent"
                  /> */}
                  <Autocomplete
                    required
                    id="Dependent"
                    options={dependent}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) => handleSetAutoComplete(e, "Dependent", value, passId)}
                    // onChange={(e) => {
                    //   handleSetInsurable(e, passId, "base");
                    // }}
                    renderInput={(params) => <MDInput {...params} label="Dependent" required />}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  {/* <MDInput
                    required
                    name="InsuredRelationWithProposer"
                    value={x.InsuredRelationWithProposer}
                    onChange={(e) => {
                      handleSetInsurable(e, passId, "base");
                    }}
                    label="Relationship with proposer"
                  /> */}
                  <Autocomplete
                    required
                    id="relationShipToProposer"
                    options={nomineeRelation}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) =>
                      handleSetAutoComplete(e, "relationShipToProposer", value, passId)
                    }
                    // onChange={(e) => {
                    //   handleSetInsurable(e, passId, "base");
                    // }}
                    renderInput={(params) => (
                      <MDInput {...params} label="Relationship with proposer" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  {/* <MDDatePicker
                    fullWidth
                    input={{ label: "First Inception Date" }}
                    // value={firstInceptionDate}
                    value={LPolicyDto.PolicyStartDate}
                    onChange={(e) => handleDateInsured(e, "FirstInceptionDate", passId)}
                    options={{ altFormat: "d/m/Y", altInput: true }}
                  /> */}
                  <MDInput
                    name="First Inception Date"
                    value={LPolicyDto.PolicyStartDate}
                    inputFormat="dd/MM/yyyy"
                    label="First Inception Date"
                    disabled
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="MainMemberID"
                    // value={x.InsuredRelationWithProposer}
                    // onChange={(e) => {
                    //   handleSetInsurable(e, passId, "base");
                    // }}
                    label="Main Member ID"
                  />
                </Grid> */}
                <Grid container mt={2}>
                  <Stack direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography required sx={{ color: "#000000", fontSize: "1.1rem" }}>
                        {x.Questionaire[0].Question}
                      </MDTypography>
                      {x.Questionaire[0].Answer === "Yes" ? (
                        <Chip
                          color="error"
                          label="As this question is Answered as Yes, this insured member will not be eligible for policy issuance"
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <RadioGroup
                        row
                        value={x.Questionaire[0].Answer}
                        onChange={(e) => {
                          handleSetInsurable(e, passId, "q1");
                        }}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </Grid>
                  </Stack>
                </Grid>
                <Grid container>
                  <Stack direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography sx={{ color: "#000000", fontSize: "1.1rem" }}>
                        {x.Questionaire[1].Question}
                      </MDTypography>
                      {x.Questionaire[1].Answer === "Yes" ? (
                        <Chip
                          color="error"
                          label="As this question is Answered as Yes, this insured member will not be eligible for policy issuance"
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <RadioGroup
                        row
                        value={x.Questionaire[1].Answer}
                        onChange={(e) => {
                          handleSetInsurable(e, passId, "q2");
                        }}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </Grid>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack direction="row" spacing={2}>
                    <MDTypography sx={{ color: "#000000", fontSize: "1.1rem" }}>
                      {x.Questionaire[3].Question}
                    </MDTypography>
                    <RadioGroup
                      row
                      value={x.Questionaire[3].Answer}
                      onChange={(e) => {
                        handleSetInsurable(e, passId, "q4");
                      }}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack direction="row" spacing={2}>
                    <form>
                      {/* <input
                        sx={{ fontSize: "1.1rem" }}
                        type="checkbox"
                        id="select"
                        name={x.Questionaire[2].Question}
                        value={x.Questionaire[2].Answer}
                        onChange={(e) => {
                          handleSetInsurable(e, passId, "q3");
                        }}
                      /> */}

                      <Checkbox
                        color="secondary"
                        required
                        value={x.Questionaire[2].Answer}
                        onChange={(e) => {
                          handleSetInsurable(e, passId, "q3");
                        }}
                      />

                      <label htmlFor="select"> {x.Questionaire[2].Question}</label>
                    </form>
                  </Stack>
                </Grid>

                {/* <Grid container>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDButton onClick={handleOpen}>Add Nominee</MDButton>
                  </Grid>
                </Grid> */}
              </Grid>

              <MDBox>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <MDBox sx={style}>
                    <Grid container justifyContent="end" alignItems="end">
                      <MDButton onClick={handleClose}>
                        <RemoveIcon />
                      </MDButton>
                    </Grid>
                    <MDBox>
                      {" "}
                      <NomineeComponent
                        nomObj={nomObj}
                        setNominee={setNominee}
                        passId={passId}
                        handleAdd={handleAdd}
                        commonId={commonId}
                        setNomineeAutoComplete={setNomineeAutoComplete}
                        handleDateChange={handleDateChange}
                        appointteDate={appointteDate}
                        nomineeDate={nomineeDate}
                      />
                    </MDBox>
                    {/* <Grid container justifyContent="center" alignItems="center">
                      <MDButton onClick={(e) => handleAdd(e, passId)}>Add</MDButton>
                    </Grid> */}
                  </MDBox>
                </Modal>
              </MDBox>
            </AccordionDetails>
          </Accordion>
          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}></Grid> */}
        </Grid>
      </MDBox>
    </div>
  );
}

function InsuredDetails({ PolicyDto, setPolicyDto, ruleflag }) {
  console.log(ruleflag, "ruleflag");
  const LPolicyDto = PolicyDto;
  const [flagArray, setFlagArray] = useState([]);
  const [displayflag, setdisplayflag] = useState(false);
  console.log(setdisplayflag, "displayflag");
  const [final, setFinal] = useState([]);
  console.log(final, "final");
  const [commonId, setCommonId] = useState(-1);
  const [insuDobDate, setInsuDobDate] = useState({
    DOB: null,
  });
  const [firstInceptionDate, setFirstInceptionDate] = useState(new Date());
  const [nomineeDate, setNomineeDate] = useState(new Date());
  const [appointteDate, setAppointeeDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [genderData, setgenderData] = useState([]);
  const [maritalStatus, setmaritalStatus] = useState([]);
  const [nomineeRelation, setnomineeRelation] = useState([]);
  const [dependent, setdependent] = useState([]);
  const [nomObj, setNomObj] = useState({
    NomineeName: "",
    NomineeRelationship: "",
    NomineeDob: "",
    NomineeAge: "",
    NomineeGender: "",
    NomineeAddress1: "",
    NomineeAddress2: "",
    PinCode: "",
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
  });
  const setNomineeAutoComplete = (e, value) => {
    nomObj[e.target.id.split("-")[0]] = value.mValue;
    setNomObj((prev) => ({ ...prev, ...nomObj }));
  };
  const setNominee = (e) => {
    if (e.target.value === "Male") {
      nomObj[e.target.name] = e.target.value;
    } else {
      nomObj[e.target.name] = e.target.value;
    }

    nomObj[e.target.name] = e.target.value;

    setNomObj((prevState) => ({ ...prevState, ...nomObj }));
  };
  const handleOpen = () => {
    //
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
  const handleDateChange = (e, type) => {
    switch (type) {
      case "nomineeDate": {
        const today6 = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm6, dd6, yyyy6] = today6.split("/");
        if (mm6 <= 9) {
          // mm1 = "0" + mm1;
          mm6 = `0${mm6}`;
        }
        if (dd6 <= 9) {
          // dd1 = "0" + dd1;
          dd6 = `0${dd6}`;
        }
        yyyy6 = `${yyyy6}`;
        // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        const ab6 = `${yyyy6}-${mm6}-${dd6}`;

        // const show3 = `${dd6}-${mm6}-${yyyy6}`;
        const age1 = getAge(today6);
        console.log("Age", age1);
        nomObj.NomineeAge = age1;
        nomObj.NomineeDob = ab6;
        setNomineeDate(ab6);
        setNomObj((prev) => ({ ...prev, ...nomObj }));
        break;
      }
      case "appointteDate": {
        const today7 = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm7, dd7, yyyy7] = today7.split("/");
        if (mm7 <= 9) {
          // mm1 = "0" + mm1;
          mm7 = `0${mm7}`;
        }
        if (dd7 <= 9) {
          // dd1 = "0" + dd1;
          dd7 = `0${dd7}`;
        }
        yyyy7 = `${yyyy7}`;
        // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        const ab7 = `${yyyy7}-${mm7}-${dd7}`;

        // const show3 = `${dd5}/${mm5}/${yyyy5}`;
        const age2 = getAge(today7);
        console.log("Age", age2);
        nomObj.AppointeeAge = age2;
        nomObj.AppointeeDob = ab7;
        setAppointeeDate(ab7);
        setNomObj((prev) => ({ ...prev, ...nomObj }));
        break;
      }
      default: {
        console.log("wrong date");
      }
    }

    // setPolicyDto(PolicyDto);
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

    console.log("date1", LPolicyDto);
  };
  const handleDateInsured = (e, type, id) => {
    switch (type) {
      case "DOB": {
        const today = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm, dd, yyyy] = today.split("/");
        if (mm <= 9) {
          // mm = "0" + mm;
          // mm=`${0}mm`;
          mm = `0${mm}`;
        }
        if (dd <= 9) {
          // dd = "0" + dd;
          dd = `0${dd}`;
        }
        yyyy = `${yyyy}`;
        // const ab = yyyy + "-" + mm + "-" + dd;
        // const ab = `${yyyy}/${mm}/${dd}`;
        const ab = `${dd}/${mm}/${yyyy}/`;

        // const show1 = `${dd}/${mm}/${yyyy}`;
        const age = getAge(today);
        console.log("Age", age);
        LPolicyDto.InsurableItem[0].RiskItems[id].Age = age;
        LPolicyDto.InsurableItem[0].RiskItems[id][type] = ab;
        setInsuDobDate(ab);
        break;
      }
      case "FirstInceptionDate": {
        const today1 = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm1, dd1, yyyy1] = today1.split("/");
        if (mm1 <= 9) {
          // mm = "0" + mm;
          // mm=`${0}mm`;
          mm1 = `0${mm1}`;
        }
        if (dd1 <= 9) {
          // dd = "0" + dd;
          dd1 = `0${dd1}`;
        }
        yyyy1 = `${yyyy1}`;
        // const ab = yyyy + "-" + mm + "-" + dd;
        const ab2 = `${yyyy1}-${mm1}-${dd1}`;

        // const show2 = `${dd1}/${mm1}/${yyyy1}`;

        LPolicyDto.InsurableItem[0].RiskItems[id][type] = ab2;
        setFirstInceptionDate(ab2);
        break;
      }
      default:
        console.log("wrong case");
    }
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
  const formatNomineeDate = (date) => {
    const nomineeformat = (val) => (val > 9 ? val : `0${val}`);
    const nomineedate = new Date(date);
    return `${nomineeformat(nomineedate.getDate())}/${nomineeformat(
      nomineedate.getMonth() + 1
    )}/${nomineedate.getFullYear()}`;
  };
  const handleInsureDateChange = (value, type, id) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      // setInsuDobDate(formatNomineeDate(value));
      setInsuDobDate((prevState) => ({ ...prevState, [type]: value }));

      LPolicyDto.InsurableItem[0].RiskItems[id].displayDOB = value;

      LPolicyDto.InsurableItem[0].RiskItems[id][type] = formatNomineeDate(value);
      console.log(LPolicyDto, "LPolicyDto1");
      console.log(insuDobDate, "insudobdate");
      const dob = value.toLocaleDateString("en-ZA");
      const age = handleCalculateAge(dob);
      if (age < 18 || age > 45) {
        swal({
          icon: "error",
          text: "Please enter valid Date of birth",
        });
      }
      LPolicyDto.InsurableItem[0].RiskItems[id].Age = age;
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
  const handleSetInsurable = (e, id, idd) => {
    switch (idd) {
      case "base": {
        console.log(e.target.name);
        if (e.target.name === "Name") {
          if (e.target.value.length < 50) {
            const nameReg = /^[a-zA-Z\s]+$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              LPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
            }
          }
        }

        LPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
        break;
      }
      case "q1": {
        if (e.target.value === "Yes") {
          LPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[0].Answer = e.target.value;
        } else {
          LPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[0].Answer = e.target.value;
        }
        break;
      }
      case "q2": {
        if (e.target.value === "Yes") {
          LPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[1].Answer = e.target.value;
        } else {
          LPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[1].Answer = e.target.value;
        }
        break;
      }
      case "q3": {
        console.log(e.target.checked, "xxxx");
        if (e.target.checked === true) {
          LPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[2].Answer = "Yes";
        } else {
          LPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[2].Answer = "No";
        }
        break;
      }
      case "q4": {
        if (e.target.value === "Yes") {
          LPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[3].Answer = e.target.value;
        } else {
          LPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[3].Answer = e.target.value;
        }
        break;
      }
      case "IsProposersameasInsuredYN": {
        if (e.target.value === "Yes") {
          // setdisplayflag(true);
          LPolicyDto.InsurableItem[0].RiskItems[id].displayflag = e.target.value;

          LPolicyDto.InsurableItem[0].RiskItems[id].IsProposersameasInsuredYN = e.target.value;
          LPolicyDto.InsurableItem[0].RiskItems[id].Name = LPolicyDto.ProposerDetails.FirstName;
          LPolicyDto.InsurableItem[0].RiskItems[id].DOB = LPolicyDto.ProposerDetails.DOB;
          LPolicyDto.InsurableItem[0].RiskItems[id].Age = LPolicyDto.ProposerDetails.Age;
          LPolicyDto.InsurableItem[0].RiskItems[id].Gender = LPolicyDto.ProposerDetails.Gender;
          LPolicyDto.InsurableItem[0].RiskItems[id].relationShipToProposer = "Self";

          Object.keys(LPolicyDto.InsurableItem[0].RiskItems).map((x, index) => {
            if (index === id) {
              LPolicyDto.InsurableItem[0].RiskItems[index].IsInsuredDisableFlag = false;
              // x.IsInsuredDisableFlag = false;
            } else {
              LPolicyDto.InsurableItem[0].RiskItems[index].IsInsuredDisableFlag = true;
              // x.IsInsuredDisableFlag = true;
            }

            return null;
          });
        } else {
          // setdisplayflag(false);
          LPolicyDto.InsurableItem[0].RiskItems[id].displayflag = e.target.value;

          LPolicyDto.InsurableItem[0].RiskItems[id].IsProposersameasInsuredYN = e.target.value;
          LPolicyDto.InsurableItem[0].RiskItems[id].Name = "";
          LPolicyDto.InsurableItem[0].RiskItems[id].DOB = "";
          LPolicyDto.InsurableItem[0].RiskItems[id].Age = "";
          LPolicyDto.InsurableItem[0].RiskItems[id].Gender = "";
          LPolicyDto.InsurableItem[0].RiskItems[id].relationShipToProposer = "";
          Object.keys(LPolicyDto.InsurableItem[0].RiskItems).map((x, index) => {
            LPolicyDto.InsurableItem[0].RiskItems[index].IsInsuredDisableFlag = false;
            // x.IsInsuredDisableFlag = false;

            return null;
          });
        }
        break;
      }
      default:
        console.log("wrong choice");
    }

    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  };

  const handleSetAutoComplete = (e, type, value, id) => {
    if (type === "Gender" || "relationShipToProposer" || "Dependent") {
      LPolicyDto.InsurableItem[0].RiskItems[id][e.target.id.split("-")[0]] = value.mValue;
    } else if (type === "InsuredMaritalStatus") {
      LPolicyDto.InsurableItem[0].RiskItems[id].InsuredMaritalStatus = value.mValue;
      console.log(LPolicyDto, "maritalstatus");
    }
    console.log("jadgjhsdb", [e.target.id.split("-")[0]]);
    console.log("jadgjhsdb", value.mValue);
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  useEffect(() => {
    console.log("flagArray", final);
  }, [final]);

  // useEffect(() => {
  //   console.log("ruleflagg", ruleflag);
  //   if (ruleflag === true) {
  //     swal({
  //       icon: "error",
  //       text: "Proposer Rejected for a Member",
  //       buttons: "OK",
  //     });
  //   }
  // }, [PolicyDto.RuleResult]);

  useEffect(() => {
    const array = [];
    // setFlagArray([...array.fill(false, 0, PolicyDto.TotalMembers)]);

    for (let i = 0; i < PolicyDto.TotalMembers; i += 1) {
      array.push(false);
    }
    setFlagArray([...array]);
  }, [PolicyDto.TotalMembers]);
  useEffect(async () => {
    const mdatalist = await getMasterDatalist();
    console.log("masterdatalist", mdatalist);
    console.log("mdata", mdatalist.data[1]);
    // setSalutationData([...mdatalist.data[43].mdata]);
    setgenderData([...mdatalist.data[1].mdata]);
    setmaritalStatus([...mdatalist.data[35].mdata]);
    setnomineeRelation([...mdatalist.data[37].mdata]);
    setdependent([...mdatalist.data[21].mdata]);
  }, []);
  return (
    <div>
      {/* <h1>Policy Issued</h1> */}
      <MDBox pt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" color="primary">
              Insured Details
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {/* <MDInput label="Bank Branch ID" /> */}
            {PolicyDto.InsurableItem[0].RiskItems.map((x, key) => (
              <AccordionComponent
                x={x}
                // key={key}
                passId={key}
                handleSetInsurable={handleSetInsurable}
                handleInsureDateChange={handleInsureDateChange}
                handleSetAutoComplete={handleSetAutoComplete}
                handleDateInsured={handleDateInsured}
                insuDobDate={insuDobDate}
                firstInceptionDate={firstInceptionDate}
                handleOpen={handleOpen}
                open={open}
                handleClose={handleClose}
                nomObj={nomObj}
                setNominee={setNominee}
                // handleAdd={handleAdd}
                commonId={commonId}
                flagArray={flagArray}
                final={final}
                // expanded={expanded}
                handleChange={handleChange}
                setNomineeAutoComplete={setNomineeAutoComplete}
                handleDateChange={handleDateChange}
                appointteDate={appointteDate}
                nomineeDate={nomineeDate}
                genderData={genderData}
                maritalStatus={maritalStatus}
                nomineeRelation={nomineeRelation}
                dependent={dependent}
                LPolicyDto={LPolicyDto}
                displayflag={displayflag}
                // final={final[key]}
              />
            ))}
          </Grid>
          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" sx={{ color: "#E41D25", fontSize: "1.1rem" }}>
              {" "}
              Note: If either of Question 1 and Question 2 is selected Yes or Declaration is
              unticked for any of the Insured members, those members wont be eligible for policy
              issuance
            </MDTypography>
          </Grid> */}
        </Grid>
      </MDBox>
      {/* <MDButton sx={{ ml: 130 }} onClick={handleNext}>
        Proceed
      </MDButton> */}
    </div>
  );
}

export default InsuredDetails;
