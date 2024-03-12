import React, { useState, useEffect } from "react";

import PageLayout from "examples/LayoutContainers/PageLayout";
import { Grid, Autocomplete, FormGroup, Checkbox } from "@mui/material";
import { Share } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDAvatar from "components/MDAvatar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import TextField from "@mui/material/TextField";
import { isValid } from "date-fns";
import swal from "sweetalert";
import MDInput from "components/MDInput";
import { getRequest } from "core/clients/axiosclient";
// import CareLogo from "assets/images/BrokerPortal/CareLogo.png";
import {
  useDataController,
  images,
  // setHealthInsuranceDetails,
  setQuoteProposalOutput,
} from "../../../context";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
// import MDDatePicker from "../../../../../components/MDDatePicker";
import { GetProductPartnerMaster } from "./data";

function NomineeDetails({ handleBack, handleNext }) {
  const [open, setOpen] = useState(true);
  // const [flags, setFlags] = useState({
  //   errorFlag: false,
  // });
  const [controller, dispatch] = useDataController();
  // const { HealthInsuranceDetails } = controller;
  const { quoteProposalOutput } = controller;
  console.log("quoteProposalOutput123", quoteProposalOutput);
  const { InsurableItem } = quoteProposalOutput;

  const { RiskItems } = InsurableItem[0];
  const [QuoteJson, setQuoteJson] = useState(quoteProposalOutput);
  // let memberCount = 0;

  // const nomineeDetails = RiskItems.map((row) => {
  //   // memberCount = memberCount + 1;
  //   console.log("nominee", row.NomineeDetails[0]);

  //   return row.NomineeDetails[0];
  // });
  const nomineeDetails = RiskItems[0].NomineeDetails[0];

  // console.log("count1", memberCount);

  const [data, setData] = useState(nomineeDetails);
  console.log("nomineeDetails123", data);
  // useEffect(()=>{
  //   setData
  // },[])
  // const [NomineeDTO, setNomineeDTO] = useState({
  //   Relationship: "",
  //   Title: "",
  //   FirstName: "",
  //   LastName: "",
  //   DOB: "",
  //   Occupation: "",
  //   PANCardNo: "",
  //   EmailId: "",
  //   MobileNo: "",
  //   EmergencyMobileNo: "",
  //   HouseNo: "",
  //   StreetRegion: "",
  //   PinCode: "",
  //   District: "",
  //   State: "",
  //   City: "",
  // });
  // const [dob, setDob] = React.useState(null);

  const handleBasicChange = (event) => {
    // debugger;
    const { id, value } = event.target;
    if (event.target.name === "FirstName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, [id]: value };
          setData(newValue);
          // setData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
        }
      }
    }
    if (event.target.name === "LastName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, [id]: value };
          setData(newValue);
        }
      }
    }
    if (event.target.name === "EmailAddress") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(event.target.value)) {
        const newValue = { ...data, [id]: value };
        setData(newValue);
      }
    }
    // if (event.target.name === "DateofBirth") {
    //   const nameReg = /^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    //   if (nameReg.test(event.target.value) || event.target.value === "") {
    //     const newValue = { ...data, [id]: value };
    //     setData(newValue);
    //   }
    // }
    if (event.target.name === "Occupation") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, [id]: value };
          setData(newValue);
          // setData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
        }
      }
    }
    if (event.target.name === "PANCardNo") {
      const PanReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
      if (!PanReg.test(event.target.value)) {
        const newValue = { ...data, [id]: value };
        setData(newValue);
      }
    }
    if (event.target.name === "MobileNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        const newValue = { ...data, [id]: value };
        setData(newValue);
      }
    }
    // if (event.target.name === "MobileNo") {
    //   const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
    //   if (!numRegex.test(event.target.value)) {
    //     const newValue = { ...data, [id]: value };
    //     setData(newValue);
    //   }
    // }
    if (event.target.name === "HouseNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        const newValue = { ...data, [id]: value };
        setData(newValue);
      }
    }
    if (event.target.name === "StreetRegion") {
      if (event.target.value.length < 200) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, [id]: value };
          setData(newValue);
        }
      }
    }
    if (event.target.name === "PinCode") {
      const pinRegex = /^[0-9]{1,6}$/;
      if (!pinRegex.test(event.target.value)) {
        const newValue = { ...data, [id]: value };
        setData(newValue);
      }
    }
    if (event.target.name === "City") {
      if (event.target.value.length < 200) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, [id]: value };
          setData(newValue);
        }
      }
    }
    const newValue = { ...data, [id]: value };
    setData(newValue);
  };

  console.log("1234", data);

  // const formatDate = (date) => {
  //   const format = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(date);
  //   return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  // };

  // const handleDateChange = (event) => {
  //   debugger;
  //   // const { id, value } = event.target;
  //   // const dob = date;
  //   // const age = handleCalculateAge(dob);
  //   if (event.target.name === "DateofBirth") {
  //     // const nameReg = /^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  //     // if (nameReg.test(event.target.value) || event.target.value === "") {
  //       const newValue = { ...data,[data.NomineeDOB]: formatDate(event.target.value) };
  //       setData(newValue);
  //     // }
  //   }
  // }

  // const handleBasicChange = (event) => {
  //   if (event.target.name === "FirstName" || event.target.name === "LastName") {
  //     if (event.target.value.length < 50) {
  //       const nameReg = /^[a-zA-Z\s]+$/;
  //       if (nameReg.test(event.target.value) || event.target.value === "") {
  //         setNomineeDTO((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  //       }
  //     }
  //   }

  //   if (event.target.name === "PANCardNo") {
  //     const PanReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

  //     if (!PanReg.test(event.target.value)) {
  //       setNomineeDTO((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  //       setFlags((prevState) => ({ ...prevState, errorFlag: true }));
  //       setFlags((prevState) => ({ ...prevState, panNoFlag: false }));
  //     } else {
  //       setFlags((prevState) => ({ ...prevState, panNoFlag: true }));
  //     }
  //     console.log(flags.errorFlag);
  //     console.log(flags.panNoFlag);
  //   }
  //   if (event.target.name === "EmailId") {
  //     const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  //     if (!emailRegex.test(event.target.value)) {
  //       setNomineeDTO((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  //     }
  //   } else if (event.target.name === "MobileNo") {
  //     const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
  //     if (!numRegex.test(event.target.value)) {
  //       setNomineeDTO((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  //     }
  //   } else if (event.target.name === "emergencyMobileNo") {
  //     const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
  //     if (!numRegex.test(event.target.value)) {
  //       setNomineeDTO((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  //     }
  //   } else if (event.target.name === "HouseNo") {
  //     const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
  //     if (!numRegex.test(event.target.value)) {
  //       setNomineeDTO((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  //     }
  //   }

  //   setNomineeDTO((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  // };

  // useEffect(() => {
  //   setHealthInsuranceDetails(dispatch, { ...HealthInsuranceDetails, Nominee: { ...NomineeDTO } });
  //   console.log(HealthInsuranceDetails);
  // }, [NomineeDTO]);

  const [data1, setData1] = useState();
  useEffect(async () => {
    const partnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
    );
    console.log("partnerDetails", partnerDetails);
    const partnerDetailsData = partnerDetails.data;
    console.log("partnerDetailsData", partnerDetailsData);
    setData1(partnerDetailsData);
  });

  const [args, setArgs] = useState({
    productId: null,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const { Masters } = GetProductPartnerMaster(args);
  const { Salutation } = Masters;
  const { NomineeRelation } = Masters;
  console.log("NomineeRelation", NomineeRelation);

  const [masters, setMasters] = useState({
    Salutation: { mID: "", mValue: "" },
    NomineeRelation: { mID: "", mValue: "" },
  });

  useEffect(() => {
    setArgs({
      productId: 780,
      partnerId: quoteProposalOutput.PartnerId,
      masterType: null,
      jsonValue: null,
    });
  }, [data]);

  const handleProposerSalutationDropdown = (event, values, name) => {
    if (name === "Sal") {
      setMasters((prevState) => ({ ...prevState, Salutation: values }));
      if (values.mValue !== "") {
        const newValue = { ...data, [event.target.id.split("-")[0]]: values.mID };

        setData(newValue);
      }
    }
  };
  const handleProposerNomineeRelationDropdown = (event, values, name) => {
    if (name === "NomineeRelation") {
      setMasters((prevState) => ({ ...prevState, NomineeRelation: values }));
      if (values.mValue !== "") {
        const newValue = { ...data, [event.target.id.split("-")[0]]: values.mID };

        setData(newValue);
      }
    }
  };

  const { partnerDetails } = controller;
  const { premiumResult } = partnerDetails;
  console.log("partnerDetails", partnerDetails);
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  // const [port, setPort] = useState(false);

  const [flags, setFlags] = useState({
    errorFlag: false,
    ageFlag: false,

    Age: "",
  });
  const [datetoShow, setDate] = useState({
    dateOfBirth: null,
  });
  const [validDate, setValidDate] = useState(false);
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

  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}-${propformat(
      propdate.getMonth() + 1
    )}-${propdate.getFullYear()}`;
  };

  const handleDateChange = (value, label, type) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setValidDate(false);
      setDate((prevState) => ({ ...prevState, [label]: value }));
      const newValue = { ...data, [type]: formatPropDate(value) };
      // setData((prevState) => ({
      //   ...prevState,
      //   data: { ...prevState.data, [type]: formatPropDate(value) },
      // }));
      setData(newValue);
      const dob = value.toLocaleDateString("en-ZA");
      const age = handleCalculateAge(dob);
      if (age < 18) {
        swal({
          icon: "error",
          text: "Please enter valid Date of birth",
        });
      }
      setFlags((prevState) => ({ ...prevState, Age: age }));
    } else {
      setValidDate(true);
      setDate((prevState) => ({ ...prevState, [label]: null }));
    }
  };

  const onHandleNext = () => {
    console.log("data123", data);
    // const nomineeDetails1 = RiskItems.map((row) => {
    //   // memberCount = memberCount + 1;
    //   console.log("nominee", row.NomineeDetails[0]);

    //   return row.NomineeDetails[0];
    // });
    // nomineeDetails1[0] = data;
    const Riskdetails = RiskItems;
    const data2 = RiskItems.forEach(() => {
      // const RiskItem = Riskdetails[index];
      Riskdetails[0].NomineeDetails[0] = { ...data };
      // return RiskItem;
    });
    console.log("data2", data2);
    QuoteJson.InsurableItem[0].RiskItems = [...Riskdetails];
    // console.log("nomineeDetails1", data);
    setQuoteJson({ ...QuoteJson });
    console.log("proposaljson", QuoteJson);
    setQuoteProposalOutput(dispatch, QuoteJson);
    handleNext();
    // if (quoteProposalOutput.BusinessType === "New Business") {
    //   setPort(false);
    // } else {
    //   setPort(true);
    //   handleNext();
    // }
  };

  const onHandleBack = () => {
    handleBack();
  };

  return (
    <PageLayout>
      <MDBox m={4}>
        <Grid container direction="row">
          <Grid item md={7} lg={7} xl={7} xxl={7}>
            <Grid container spacing={3}>
              <MDBox px={2}>
                <Grid m={2}>
                  <MDBox>
                    <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                      Nominee Details
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                      In case of any mishappening to the proposer, nominee is the person who gets
                      the benefits
                    </MDTypography>

                    <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                      <MDTypography
                        sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7, mb: 1 }}
                      >
                        Is the Nominee same for all three policies?
                      </MDTypography>

                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ justifyContent: "center", ml: 2.5 }}
                        defaultValue="No"
                        // value={data.ProposerDetails.PermanentAddressSameAsCommunication}
                        // onChange={handlePermanentAddSameComm}
                      >
                        <FormControlLabel
                          onClick={() => {
                            setOpen(true);
                          }}
                          control={<Radio />}
                          label="Yes"
                          value="Yes"
                        />
                        <FormControlLabel
                          onClick={() => {
                            setOpen(false);
                          }}
                          control={<Radio />}
                          label="No"
                          value="No"
                        />
                      </RadioGroup>
                    </MDBox>
                    {open === true ? (
                      <>
                        <Grid container spacing={4.5} mb={2}>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <Autocomplete
                              value={masters.NomineeRelation}
                              id="NomineeRelation"
                              options={NomineeRelation || []}
                              getOptionLabel={(option) => option.mValue}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  padding: "5px!important",
                                },
                              }}
                              onChange={(event, value) =>
                                handleProposerNomineeRelationDropdown(
                                  event,
                                  value,
                                  "NomineeRelation"
                                )
                              }
                              renderInput={(params) => (
                                <MDInput
                                  label="Relationship with Proposer"
                                  // required
                                  {...params}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <Autocomplete
                              value={masters.Salutation}
                              id="Title"
                              options={Salutation || []}
                              getOptionLabel={(option) => option.mValue}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  padding: "5px!important",
                                },
                              }}
                              onChange={(event, value) =>
                                handleProposerSalutationDropdown(event, value, "Sal")
                              }
                              renderInput={(params) => (
                                <MDInput
                                  label="Title"
                                  // required
                                  {...params}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="First Name"
                              id="NomineeFirstName"
                              fullWidth
                              value={nomineeDetails.NomineeFirstName}
                              // value={NomineeDTO.FirstName}
                              onChange={(event) => handleBasicChange(event)}
                              // onChange={handleBasicChange}
                              name="FirstName"
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Last Name"
                              fullWidth
                              value={nomineeDetails.NomineeLastName}
                              // onChange={handleBasicChange}
                              onChange={(event) => handleBasicChange(event)}
                              id="NomineeLastName"
                              name="LastName"
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            {/* <MDDatePicker
                              fullWidth
                              input={{ label: "Date of Birth" }}
                              // value={POSPJson.DOB}
                              // onChange={handleDateChange}
                              // error={POSPJson.DOB === "" ? flags.errorFlag : null}
                              required
                              id="DOB"
                              // value={data.NomineeDetails.DOB}
                              name="DOB"
                              // onChange={handleBasicChange}
                            /> */}
                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DesktopDatePicker
                                label="Date of Birth"
                                id="NomineeDOB"
                                name="DateofBirth"
                                // value={nomineeDetails.NomineeDOB}
                                // value={dob}
                                // minDate={dayjs('2017-01-01')}
                                // onChange={(newValue) => {
                                //   setDob(newValue);
                                // }}
                                // onChange={(event) => handleBasicChange(event)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                              />
                            </LocalizationProvider> */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DesktopDatePicker
                                label="DOB"
                                inputFormat="dd-MM-yyyy"
                                type="login"
                                id="NomineeDOB"
                                value={datetoShow.dateOfBirth}
                                onChange={(date) =>
                                  handleDateChange(date, "dateOfBirth", "NomineeDOB")
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
                              {flags.errorFlag && data.NomineeDOB === null ? (
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
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Occupation"
                              fullWidth
                              id="OccupationDescription"
                              value={nomineeDetails.OccupationDescription}
                              // value={NomineeDTO.Occupation}
                              // onChange={handleBasicChange}
                              onChange={(event) => handleBasicChange(event)}
                              name="Occupation"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              id="NomineePanNo"
                              fullWidth
                              value={nomineeDetails.NomineePanNo}
                              name="PANCardNo"
                              // onChange={handleBasicChange}
                              onChange={(event) => handleBasicChange(event)}
                              // onBlur={handleValidate}
                              label="PAN Card No"
                              inputProps={{ maxLength: 10 }}
                              required
                              // error={NomineeDTO.PANCardNo === "" ? flags.panNoFlag : null}
                            />
                            {/* {flags.errorFlag && NomineeDTO.PANCardNo === "" ? (
                              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                Please fill valid PAN Card No
                              </MDTypography>
                            ) : null}
                            {flags.panNoFlag && flags.errorFlag === false ? (
                              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                Please fill valid PAN Card No
                              </MDTypography>
                            ) : null} */}
                          </Grid>
                        </Grid>

                        <MDTypography
                          variant="h6"
                          color="primary"
                          sx={{ fontSize: "1.5rem", mb: 2, mt: 2 }}
                        >
                          Contact Details
                        </MDTypography>
                        <Grid container spacing={4.5}>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              id="NomineeEmailID"
                              label="Email Address"
                              fullWidth
                              value={nomineeDetails.NomineeEmailID}
                              // onChange={handleBasicChange}
                              // value={NomineeDTO.EmailId}
                              onChange={(event) => handleBasicChange(event)}
                              name="EmailAddress"
                              // error={NomineeDTO.EmailId === "" ? flags.errorFlag : null}
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Mobile Number"
                              id="NomineeMobile"
                              fullWidth
                              // value={NomineeDTO.MobileNo}
                              onChange={(event) => handleBasicChange(event)}
                              name="MobileNo"
                              inputProps={{ maxLength: 10 }}
                              // onChange={handleBasicChange}
                              value={nomineeDetails.NomineeMobile}
                              // error={NomineeDTO.MobileNo === "" ? flags.errorFlag : null}
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label=" Emergency Mobile Number"
                              fullWidth
                              // value={nomineeDetails.}
                              // onChange={(event) => handleBasicChange(event)}
                              name="emergencyMobileNo"
                              inputProps={{ maxLength: 10 }}
                              // error={NomineeDTO.emergencyMobileNo === "" ? flags.errorFlag : null}
                              required
                            />
                          </Grid>
                        </Grid>
                        <MDTypography
                          variant="h6"
                          color="primary"
                          sx={{ fontSize: "1.5rem", mb: 2, mt: 2 }}
                        >
                          Communication Details
                        </MDTypography>
                        <Grid container spacing={4.5}>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              id="NomineeAddressLine1"
                              label=" House No"
                              fullWidth
                              // value={NomineeDTO.HouseNo}
                              value={nomineeDetails.NomineeAddressLine1}
                              onChange={(event) => handleBasicChange(event)}
                              name="HouseNo"
                              inputProps={{ maxLength: 5 }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              id="NomineeAddressLine2"
                              label=" Street/Region"
                              fullWidth
                              // value={NomineeDTO.StreetRegion}
                              value={nomineeDetails.NomineeAddressLine2}
                              onChange={(event) => handleBasicChange(event)}
                              name="StreetRegion"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Pin Code"
                              id="NomineePincode"
                              value={nomineeDetails.NomineePincode}
                              onChange={(event) => handleBasicChange(event)}
                              name="PinCode"
                              inputProps={{ maxLength: 6 }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="District"
                              fullWidth
                              // value={NomineeDTO.District}
                              // onChange={(event) => handleBasicChange(event)}
                              name="District"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="State"
                              fullWidth
                              // value={NomineeDTO.State}
                              // onChange={(event) => handleBasicChange(event)}
                              name="State"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="City"
                              id="NomineeCity"
                              fullWidth
                              // value={NomineeDTO.City}
                              value={nomineeDetails.NomineeCity}
                              onChange={(event) => handleBasicChange(event)}
                              name="City"
                            />
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <div>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ backgroundColor: "#BBDFFF" }}
                          >
                            <MDTypography>Nominee for Family Policy</MDTypography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={4.5} mb={2}>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Relationship with Proposer" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Title" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="First Name" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Last Name" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="DOB" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Occupation" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="PAN card no" />
                              </Grid>
                            </Grid>
                            <MDTypography
                              variant="h6"
                              color="primary"
                              sx={{ fontSize: "1.5rem", mb: 2, mt: 2 }}
                            >
                              Contact Details
                            </MDTypography>
                            <Grid container spacing={4.5}>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Email Address" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Mobile" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Emergency Mobile NO" />
                              </Grid>
                            </Grid>
                            <MDTypography
                              variant="h6"
                              color="primary"
                              sx={{ fontSize: "1.5rem", mb: 2, mt: 2 }}
                            >
                              Communication Details
                            </MDTypography>
                            <Grid container spacing={4.5}>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="House No" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Street/Region" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Pin Code" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="District" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="State" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="City" />
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ backgroundColor: "#BBDFFF", mt: 2 }}
                          >
                            <MDTypography>Nominee for Parents Policy</MDTypography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={4.5} mb={2}>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Relationship with Proposer" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Title" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="First Name" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Last Name" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="DOB" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Occupation" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="PAN card no" />
                              </Grid>
                            </Grid>
                            <MDTypography
                              variant="h6"
                              color="primary"
                              sx={{ fontSize: "1.5rem", mb: 2, mt: 2 }}
                            >
                              Contact Details
                            </MDTypography>
                            <Grid container spacing={4.5}>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Email Address" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Mobile" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Emergency Mobile NO" />
                              </Grid>
                            </Grid>
                            <MDTypography
                              variant="h6"
                              color="primary"
                              sx={{ fontSize: "1.5rem", mb: 2, mt: 2 }}
                            >
                              Communication Details
                            </MDTypography>
                            <Grid container spacing={4.5}>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="House No" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Street/Region" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Pin Code" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="District" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="State" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="City" />
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ backgroundColor: "#BBDFFF", mt: 2 }}
                          >
                            <MDTypography>Nominee for Parent-In-Laws Policy</MDTypography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={4.5} mb={2}>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Relationship with Proposer" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Title" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="First Name" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Last Name" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="DOB" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Occupation" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="PAN card no" />
                              </Grid>
                            </Grid>
                            <MDTypography
                              variant="h6"
                              color="primary"
                              sx={{ fontSize: "1.5rem", mb: 2, mt: 2 }}
                            >
                              Contact Details
                            </MDTypography>
                            <Grid container spacing={4.5}>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Email Address" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Mobile" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Emergency Mobile NO" />
                              </Grid>
                            </Grid>
                            <MDTypography
                              variant="h6"
                              color="primary"
                              sx={{ fontSize: "1.5rem", mb: 2, mt: 2 }}
                            >
                              Communication Details
                            </MDTypography>
                            <Grid container spacing={4.5}>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="House No" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Street/Region" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="Pin Code" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="District" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="State" />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                                <MDInput label="City" />
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    )}
                  </MDBox>
                  {quoteProposalOutput.BusinessType === "New Business" ? (
                    <>
                      {/* <FormGroup>
                        <FormControlLabel
                          control={<Checkbox alignItems="center" />}
                          label="I propose to port my health insurance policy with Care Health Insurance Limited (formerly known as 
Religare Health Insurance Company Limited) from, I hereby declare that Care Health Insurance Limited (formerly known as Religare Health Insurance Company Limited) would not be held liable for lapse of coverage with my previous insurer and agree with the final decision of CHIL with respect to my proposal processed with 21-days from the login date. In case my application is declined by the company, I agree to be the medical expenses(if
any) required to underwrite my application"
                        />
                      </FormGroup> */}
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox alignItems="center" />}
                          label="I/We hereby state and confirm that I/we continue to enjoy good health since the expiry of our policy till today.
                        I/We further state and confirm that neither has any member covered under the policy undergone any consultation, investigation and treatment for any disease/illness/ injury or accidental/medical condition other
                        than common cold or fever nor any claims has been logged during this period.
                        Also, I understand application acceptance doesn't form the basis of policy issuance. Policy issuance is
                        subjected to risk assessment by the underwriting team. Insurance Company reserves the right to evaluate and
                        assess the risk to finally accept or reject the proposal."
                        />
                      </FormGroup>
                    </>
                  ) : null}
                </Grid>
              </MDBox>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDButton sx={{ mr: "3rem" }} onClick={onHandleBack}>
                  Back
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                {quoteProposalOutput.BusinessType === "New Business" ? (
                  <MDButton sx={{ mr: "3rem" }} onClick={onHandleNext}>
                    Proceed To CKYC
                  </MDButton>
                ) : (
                  <MDButton sx={{ mr: "3rem" }} onClick={onHandleNext}>
                    Proceed To Portability
                  </MDButton>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
            <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem" }}>
              <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                Summary
              </MDTypography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Quote No{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {quoteProposalOutput.BaseQuotationNo}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Insurer
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDAvatar src={images[data1]} size="xl" variant="square" sx={{ mx: "9rem" }} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Plan Name
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* Care Classic */}
                    {partnerDetails.partnerName}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Cover Amount{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(quoteProposalOutput.SumInsured)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Policy Period{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {" "}
                    {quoteProposalOutput.PolicyTenure} Year
                  </MDTypography>
                </Grid>
                {/* <Grid item xs={12} sm={12} mt={2}>
                  <MDTypography variant="h6" sx={{ fontSize: "20px" }}>
                    Selected Riders
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Hospital Cash{" "}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    ₹ 1,107{" "}
                  </MDTypography>
                </Grid> */}

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    GST@18%{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(premiumResult.PremiumDetail.TaxAmount)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Total Premium
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} marginBottom={4} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    mt={0}
                    sx={{ fontSize: "2rem", color: "#0071D9" }}
                  >
                    {formatter.format(premiumResult.PremiumDetail.TotalPremium)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDButton
                    size="medium"
                    startIcon={<Share />}
                    sx={{
                      color: "#1976D2",
                      textSize: "0.87rem",
                      borderRadius: "0.25rem",
                      borderColor: "#1976D2",
                      border: 1,
                      background: "transparent",
                    }}
                  >
                    Share Quote
                  </MDButton>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  justifyContent="end"
                  display="flex"
                >
                  <MDButton sx={{ width: "auto", fontSize: "0.7rem" }}>
                    {/* Proceed to Proposal */}
                    Save Quote
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}
export default NomineeDetails;
