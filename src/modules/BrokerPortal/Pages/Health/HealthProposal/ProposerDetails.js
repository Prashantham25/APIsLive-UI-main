import PageLayout from "examples/LayoutContainers/PageLayout";
import { Grid, Checkbox, FormGroup, Autocomplete } from "@mui/material";
import { Share } from "@mui/icons-material";
// import swal from "sweetalert";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import { isValid } from "date-fns";
import MDAvatar from "components/MDAvatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDInput from "components/MDInput";
import { useState, React, useEffect } from "react";
import { getRequest } from "core/clients/axiosclient";
// import CareLogo from "assets/images/BrokerPortal/CareLogo.png";
import { GetProductPartnerMaster } from "./data";

import {
  useDataController,
  images,
  // setPOSPInput,
  // setPOSPMasters,
  setQuoteProposalOutput,
} from "../../../context/index";
// import MDDatePicker from "../../../../../components/MDDatePicker";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";

function ProposerDetails({ handleNext, quoteProposalOutput, customerDetails }) {
  console.log("customerDetails", customerDetails);
  const [, dispatch] = useDataController();
  // const [flags, setFlags] = useState({
  //   errorFlag: false,
  // });

  // const [POSPJson, setPOSPJson] = useState({
  //   FirstName: "",
  //   LastName: "",
  //   Mobile: "",
  //   Email: "",
  //   DOB: null,
  // });

  const [args, setArgs] = useState({
    productId: null,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const { Masters } = GetProductPartnerMaster(args);
  const {
    Salutation,
    //  Occupation
  } = Masters;

  // const [controller] = useDataController();
  // const {

  //   quoteProposalOutput,
  // } = controller;

  const [data, setData] = useState(quoteProposalOutput);
  useEffect(() => {
    if (quoteProposalOutput) {
      const quoteoutput = quoteProposalOutput.ProposerDetails;
      quoteoutput.CustomerFirstName = customerDetails.FirstName;
      quoteoutput.CustomerLastName = customerDetails.LastName;
      quoteoutput.MobileNo = customerDetails.MobileNo;
      quoteoutput.Email = customerDetails.Email;

      setData({ ...data, ...quoteProposalOutput.finalResult });
    }
    console.log("data1", data);
  }, [quoteProposalOutput, customerDetails]);

  useEffect(() => {
    setArgs({
      productId: 780,
      partnerId: data.PartnerId,
      masterType: null,
      jsonValue: null,
    });
  }, [data]);

  const handleProposerChange = (event) => {
    const { id, value } = event.target;
    if (event.target.name === "FirstName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
          setData(newValue);
        }
      }
    } else if (event.target.name === "LastName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
          setData(newValue);
        }
      }
    } else if (event.target.name === "EmailAddress") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(event.target.value)) {
        const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
        setData(newValue);
      }
    } else if (event.target.name === "MobileNo") {
      console.log("asdf", event.target.name);
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
        setData(newValue);
      }
    } else if (event.target.name === "PinCode") {
      console.log("asdf", event.target.name);
      const pinRegex = /^[0-9]{1,6}$/;
      if (!pinRegex.test(event.target.value)) {
        const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
        setData(newValue);
      }
    } else if (event.target.name === "Occupation") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
          setData(newValue);
        }
      }
    } else {
      const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
      setData(newValue);
    }
    // } else if (event.target.name === "LastName") {
    //   if (event.target.value.length < 50) {
    //     const nameReg = /^[a-zA-Z\s]+$/;
    //     if (nameReg.test(event.target.value) || event.target.value === "") {
    //       const newValue = { ...POSPJson, [event.target.name]: event.target.value };
    //       setPOSPJson(newValue);
    //     }
    //   }
    // }
  };

  const handleValidate = (e) => {
    if (e.target.name === "PanNo") {
      const PanReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
      if (!PanReg.test(e.target.value)) {
        const newValue = {
          ...data,
          ProposerDetails: { ...data.ProposerDetails, [e.target.name]: "" },
        };

        setData(newValue);
      }
    }
  };

  // const handleCalculateAge = (date) => {
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
  // const handleDateChange = (date) => {
  //   // const newValue = {
  //   //   ...POSPJson,
  //   //   DOB: date,
  //   // };
  //   // console.log("newValue", date);
  //   // setValue(date);
  //   console.log(">>>>>>>>>>>", date);
  //   setPOSPJson((prevState) => ({ ...prevState, DOB: date }));
  //   const dob = date[0].toLocaleDateString("en-ZA");
  //   const age = handleCalculateAge(dob);
  //   if (age >= 18) {
  //     setFlags((prevState) => ({ ...prevState, ageFlag: false }));
  //     setPOSPJson((prevState) => ({ ...prevState, Age: age }));
  //   } else {
  //     setFlags((prevState) => ({ ...prevState, ageFlag: true }));
  //   }
  //   console.log("///////////", POSPJson);
  // };
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
      setData((prevState) => ({
        ...prevState,
        ProposerDetails: { ...prevState.ProposerDetails, [type]: formatPropDate(value) },
      }));
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

  // const { InsurableDetails } = quoteProposalOutput;

  // const { RiskItems } = InsurableDetails[0];

  // const Riskdetails = RiskItems;

  const onNext = () => {
    // console.log("pospJson", POSPJson);
    // if (
    //   POSPJson.FirstName === "" ||
    //   POSPJson.LastName === "" ||
    //   POSPJson.EmailId === "" ||
    //   POSPJson.DOB === null
    // ) {
    //   setFlags((prevState) => ({
    //     ...prevState,
    //     errorFlag: true,
    //   }));
    //   swal({
    //     icon: "error",
    //     text: "Please fill the required fields",
    //   });
    // } else {
    //   setFlags((prevState) => ({
    //     ...prevState,
    //     errorFlag: false,
    //   }));
    //   setPOSPInput(dispatch, POSPJson);
    //   setPOSPMasters(dispatch);
    // setQuoteProposalOutput(dispatch, data);
    console.log("data1", data);
    handleNext();
    // }
  };

  const handleCommunication = (e) => {
    setData((prevState) => ({
      ...prevState,
      ProposerDetails: {
        ...prevState.ProposerDetails,
        CommunicationAddress: {
          ...prevState.ProposerDetails.CommunicationAddress,
          [e.target.name]: e.target.value,
        },
      },
    }));
    console.log("datada", data);
  };

  const onHandleNext = () => {
    setQuoteProposalOutput(dispatch, data);
    handleNext();
  };

  const [masters, setMasters] = useState({
    Salutation: { mID: "", mValue: "" },
    Occupation: { mID: "", mValue: "" },
  });

  const handleProposerSalutationDropdown = (event, values, name) => {
    if (name === "Sal") {
      setMasters((prevState) => ({ ...prevState, Salutation: values }));
      if (values.mValue !== "") {
        const newValue = {
          ...data,
          ProposerDetails: { ...data.ProposerDetails, [event.target.id.split("-")[0]]: values.mID },
        };
        setData(newValue);
      }
    }
  };

  // const handleProposerOccupationDropDownChange = (event, values) => {
  //   setMasters((prevState) => ({ ...prevState, Occupation: values }));
  //   if (values.mValue !== "") {
  //     const newValue = {
  //       ...data,
  //       ProposerDetails: { ...data.ProposerDetails, [event.target.id.split("-")[0]]: values.mID },
  //     };
  //     setData(newValue);
  //   }
  // };

  const [contact, setContact] = useState(false);
  const handleContact = () => {
    // debugger;
    // setContact(!contact);
    setContact(!contact);
  };

  const [data1, setData1] = useState();
  useEffect(async () => {
    const partnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
    );
    // console.log("partnerDetails", partnerDetails);
    const partnerDetailsData = partnerDetails.data;
    // console.log("partnerDetailsData", partnerDetailsData);
    setData1(partnerDetailsData);
  });
  const [controller] = useDataController();
  const { partnerDetails } = controller;
  const { premiumResult } = partnerDetails;
  console.log("partnerDetails", partnerDetails);
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  // const [addressCity, setAddressCity] = useState({
  //   CommunicationAddress: {
  //     city: "",
  //     state: "",
  //   },
  // });

  // const getPincodeDetails = async (pincodeValue) => {
  //   const getPincodeDistrictStateData = async (type, id) => {
  //     const urlString = `Product/GetProdPartnermasterData?ProductId=${args.productId}&PartnerId=${args.partnerId}&MasterType=${type}`;
  //     let payload;
  //     switch (type) {
  //       case "State":
  //         payload = { State_Id: id };
  //         break;
  //       case "CityDistrict":
  //         payload = { City_Id: id };
  //         break;
  //       case "DetailsPincode":
  //         payload = { Pincode: id };
  //         break;
  //       default:
  //         break;
  //     }

  //     const dataValue = await (await postRequest(urlString, payload)).data;
  //     return dataValue;
  //   };

  //   const pincodeData = await getPincodeDistrictStateData("DetailsPincode", pincodeValue);

  //   const district = await getPincodeDistrictStateData("CityDistrict", pincodeData[0].CityId);

  //   const state = await getPincodeDistrictStateData("State", district[0].StateId);

  //   return { pinCode: pincodeData, district, state };
  // };

  // useEffect(async () => {
  //   if (data.ProposerDetails.Pincode.length === 6) {
  //     const { district, state } = await getPincodeDetails(data.ProposerDetails.Pincode);
  //     const newCommunicationAddress = { Pincode: data.ProposerDetails.Pincode };
  //     setAddressCity((prevState) => ({
  //       ...prevState,
  //       CommunicationAddress: { state: state[0].mValue, city: district[0].mValue },
  //     }));
  //     setData((prevState) => {
  //       const { CommunicationAddress } = prevState.ProposerDetails;
  //       const newValue = {
  //         ...CommunicationAddress,
  //         StateId: state[0].mID,
  //         CityDistrictId: district[0].mID,
  //         CityId: district[0].CityId ? district[0].CityId : district[0].mID,
  //       };
  //       return {
  //         ...prevState,
  //         ProposerDetails: {
  //           ...prevState.ProposerDetails,
  //           CommunicationAddress: { ...newValue, ...newCommunicationAddress },
  //         },
  //       };
  //     });
  //   }
  // }, [data.ProposerDetails.Pincode]);

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
                      Proposer Details
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                      Proposer is the person who the insurance company will pay the benefits of the
                      insurance policy cover to, should a claim arise and claim for tax exemption
                      under section 80D
                    </MDTypography>
                    <Grid container spacing={4.5} mb={2}>
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
                          id="CustomerFirstName"
                          label="First Name"
                          fullWidth
                          value={data.ProposerDetails.CustomerFirstName}
                          onChange={handleProposerChange}
                          name="FirstName"
                          required
                          // error={POSPJson.FirstName === "" ? flags.errorFlag : null}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          id="CustomerLastName"
                          label="Last Name"
                          fullWidth
                          value={data.ProposerDetails.CustomerLastName}
                          onChange={handleProposerChange}
                          name="LastName"
                          required
                          // error={POSPJson.FirstName === "" ? flags.errorFlag : null}
                        />
                      </Grid>
                      {/* {Riskdetails.map((row) => ( */}
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                        {/* <MDDatePicker
                          fullWidth
                          input={{ label: "Date of Birth" }}
                          value={POSPJson.DOB}
                          onChange={handleDateChange}
                          error={POSPJson.DOB === "" ? flags.errorFlag : null}
                          required
                          
                        /> */}
                        {/* <MDInput label="Date of Birth" value={row.DateOfBirth} disabled /> */}
                        {/* </LocalizationProvider> */}

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="DOB"
                            inputFormat="dd-MM-yyyy"
                            type="login"
                            id="DOB"
                            value={datetoShow.dateOfBirth}
                            onChange={(date) => handleDateChange(date, "dateOfBirth", "DOB")}
                            renderInput={(params) => (
                              <MDInput
                                {...params}
                                sx={{ width: "100%" }}
                                required
                                error={validDate}
                              />
                            )}
                          />
                          {flags.errorFlag && data.ProposerDetails.DOB === null ? (
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
                      {/* ))} */}
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Occupation"
                          id="Occupation"
                          value={data.ProposerDetails.Occupation}
                          onChange={handleProposerChange}
                        />
                        {/* <Autocomplete
                          value={masters.Occupation}
                          id="Occupation"
                          options={Occupation || []}
                          getOptionLabel={(option) => option.mValue}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "5px!important",
                            },
                          }}
                          onChange={handleProposerOccupationDropDownChange}
                          renderInput={(params) => (
                            <MDInput
                              label="Occupation"
                              // required
                              {...params}
                              // error={
                              //   Object.values(masters.Occupation || {}).every(
                              //     (x) => x === null || x === ""
                              //   )
                              //     ? flags.errorFlag
                              //     : null
                              // }
                            />
                          )}
                        /> */}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          id="PANCardNo"
                          value={data.ProposerDetails.PANCardNo}
                          name="PanNo"
                          onChange={handleProposerChange}
                          onBlur={handleValidate}
                          label="PAN Card No"
                          inputProps={{ maxLength: 10 }}
                          required
                        />
                      </Grid>
                    </Grid>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox onClick={handleContact} checked={contact} />}
                        label="Check if the Proposer and self are same"
                      />
                    </FormGroup>

                    {contact === false ? (
                      <MDBox>
                        <MDTypography variant="h6" color="primary" sx={{ fontSize: "1.5rem" }}>
                          Contact Details
                        </MDTypography>
                        <Grid container spacing={4.5}>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Email Address"
                              fullWidth
                              value={data.ProposerDetails.Email}
                              name="EmailAddress"
                              onChange={handleProposerChange}
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              label="Mobile No"
                              fullWidth
                              value={data.ProposerDetails.MobileNo}
                              name="MobileNo"
                              onChange={handleProposerChange}
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput label="Emergency Mobile No" />
                          </Grid>
                        </Grid>
                      </MDBox>
                    ) : null}
                    <MDTypography variant="h6" color="primary" sx={{ fontSize: "1.5rem" }}>
                      Communication Details
                    </MDTypography>
                    <Grid container spacing={4.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="House No"
                          onChange={handleCommunication}
                          value={data.ProposerDetails.CommunicationAddress.AddressLine1}
                          name="AddressLine1"
                          inputProps={{ maxLength: 200 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Street/Region"
                          onChange={handleCommunication}
                          value={data.ProposerDetails.CommunicationAddress.AddressLine2}
                          name="AddressLine2"
                          inputProps={{ maxLength: 200 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Pin Code"
                          id="PinCode"
                          value={data.ProposerDetails.PinCode}
                          onChange={handleProposerChange}
                          inputProps={{ maxLength: 6 }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="District"
                          // value={addressCity.CommunicationAddress.city}
                          readOnly
                          id="District"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="State"
                          // value={addressCity.CommunicationAddress.state}
                          readOnly
                          id="State"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="City" />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDButton sx={{ mr: "3rem" }} onClick={onHandleNext}>
                          Proceed To Members
                          {/* {activeStep === steps.length - 1 ? "Finish" : "Proceed"} */}
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Grid>
              </MDBox>
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
                  <MDButton sx={{ width: "auto", fontSize: "0.7rem" }} onClick={onNext}>
                    Proceed to Proposal
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
export default ProposerDetails;
