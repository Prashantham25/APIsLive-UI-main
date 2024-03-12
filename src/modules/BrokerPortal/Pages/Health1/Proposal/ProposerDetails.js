// import { useState } from "react";
import { Grid, Checkbox, FormGroup, Autocomplete } from "@mui/material";
import { Share } from "@mui/icons-material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import swal from "sweetalert";
// import { isValid } from "date-fns";
import FormControlLabel from "@mui/material/FormControlLabel";

import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDDatePicker from "../../../../../components/MDDatePicker";

import { getAddDetailsByPincode } from "../data";

// import { useState, React, useEffect } from "react";
// import { getRequest } from "core/clients/axiosclient";
// import { GetProductPartnerMaster } from "./data";
// import { useDataController, images, setQuoteProposalOutput } from "../../../context/index";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "5px!important",
  },
};

function ProposerDetails({ dto, setDto, masters, mValues, setMValues, handelNext }) {
  //   const [args, setArgs] = useState({
  //     productId: null,
  //     partnerId: null,
  //     masterType: null,
  //     jsonValue: null,
  //   });

  //   const { Masters } = GetProductPartnerMaster(args);
  //   const { Salutation } = Masters;

  //   const [data, setData] = useState(quoteProposalOutput);
  //   useEffect(() => {
  //     if (quoteProposalOutput) {
  //       const quoteoutput = quoteProposalOutput.ProposerDetails;
  //       quoteoutput.CustomerFirstName = customerDetails.FirstName;
  //       quoteoutput.CustomerLastName = customerDetails.LastName;
  //       quoteoutput.MobileNo = customerDetails.MobileNo;
  //       quoteoutput.Email = customerDetails.Email;

  //       setData({ ...data, ...quoteProposalOutput.finalResult });
  //     }
  //     console.log("data1", data);
  //   }, [quoteProposalOutput, customerDetails]);

  //   useEffect(() => {
  //     setArgs({
  //       productId: 780,
  //       partnerId: data.PartnerId,
  //       masterType: null,
  //       jsonValue: null,
  //     });
  //   }, [data]);

  //   const handleProposerChange = (event) => {
  //     const { id, value } = event.target;
  //     if (event.target.name === "FirstName") {
  //       if (event.target.value.length < 50) {
  //         const nameReg = /^[a-zA-Z\s]+$/;
  //         if (nameReg.test(event.target.value) || event.target.value === "") {
  //           const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
  //           setData(newValue);
  //         }
  //       }
  //     } else if (event.target.name === "LastName") {
  //       if (event.target.value.length < 50) {
  //         const nameReg = /^[a-zA-Z\s]+$/;
  //         if (nameReg.test(event.target.value) || event.target.value === "") {
  //           const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
  //           setData(newValue);
  //         }
  //       }
  //     } else if (event.target.name === "EmailAddress") {
  //       const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
  //       if (!emailRegex.test(event.target.value)) {
  //         const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
  //         setData(newValue);
  //       }
  //     } else if (event.target.name === "MobileNo") {
  //       console.log("asdf", event.target.name);
  //       const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
  //       if (!numRegex.test(event.target.value)) {
  //         const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
  //         setData(newValue);
  //       }
  //     } else if (event.target.name === "PinCode") {
  //       console.log("asdf", event.target.name);
  //       const pinRegex = /^[0-9]{1,6}$/;
  //       if (!pinRegex.test(event.target.value)) {
  //         const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
  //         setData(newValue);
  //       }
  //     } else if (event.target.name === "Occupation") {
  //       if (event.target.value.length < 50) {
  //         const nameReg = /^[a-zA-Z\s]+$/;
  //         if (nameReg.test(event.target.value) || event.target.value === "") {
  //           const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
  //           setData(newValue);
  //         }
  //       }
  //     } else {
  //       const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
  //       setData(newValue);
  //     }
  //   };

  //   const handleValidate = (e) => {
  //     if (e.target.name === "PanNo") {
  //       const PanReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
  //       if (!PanReg.test(e.target.value)) {
  //         const newValue = {
  //           ...data,
  //           ProposerDetails: { ...data.ProposerDetails, [e.target.name]: "" },
  //         };

  //         setData(newValue);
  //       }
  //     }
  //   };

  //   const [flags, setFlags] = useState({
  //     errorFlag: false,
  //     ageFlag: false,

  //     Age: "",
  //   });
  //   const [datetoShow, setDate] = useState({
  //     dateOfBirth: null,
  //   });
  //   const [validDate, setValidDate] = useState(false);
  //   const handleCalculateAge = (date) => {
  //     const dob = new Date(date);
  //     const dobYear = dob.getYear();
  //     const dobMonth = dob.getMonth();
  //     const dobDate = dob.getDate();
  //     const now = new Date();
  //     const currentYear = now.getYear();
  //     const currentMonth = now.getMonth();
  //     const currentDate = now.getDate();
  //     let yearAge = currentYear - dobYear;
  //     let monthAge;
  //     if (currentMonth >= dobMonth) {
  //       monthAge = currentMonth - dobMonth;
  //     } else {
  //       yearAge -= 1;
  //       monthAge = 12 + currentMonth - dobMonth;
  //     }

  //     if (currentDate >= dobDate) {
  //     } else {
  //       monthAge -= 1;
  //       if (monthAge < 0) {
  //         monthAge = 11;
  //         yearAge -= 1;
  //       }
  //     }
  //     return yearAge;
  //   };

  //   const formatPropDate = (date) => {
  //     const propformat = (val) => (val > 9 ? val : `0${val}`);
  //     const propdate = new Date(date);
  //     return `${propformat(propdate.getDate())}-${propformat(
  //       propdate.getMonth() + 1
  //     )}-${propdate.getFullYear()}`;
  //   };

  //   const handleDateChange = (value, label, type) => {
  //     const date = new Date(value).getFullYear();
  //     const dateString = date.toString().length;
  //     if (value !== null && isValid(new Date(value)) && dateString === 4) {
  //       setValidDate(false);
  //       setDate((prevState) => ({ ...prevState, [label]: value }));
  //       setData((prevState) => ({
  //         ...prevState,
  //         ProposerDetails: { ...prevState.ProposerDetails, [type]: formatPropDate(value) },
  //       }));
  //       const dob = value.toLocaleDateString("en-ZA");
  //       const age = handleCalculateAge(dob);
  //       if (age < 18) {
  //         swal({
  //           icon: "error",
  //           text: "Please enter valid Date of birth",
  //         });
  //       }
  //       setFlags((prevState) => ({ ...prevState, Age: age }));
  //     } else {
  //       setValidDate(true);
  //       setDate((prevState) => ({ ...prevState, [label]: null }));
  //     }
  //   };

  //   const onNext = () => {
  //     console.log("data1", data);
  //     handleNext();
  //   };

  //   const handleChange = (e) => {
  //     setData((prevState) => ({
  //       ...prevState,
  //       ProposerDetails: {
  //         ...prevState.ProposerDetails,
  //         CommunicationAddress: {
  //           ...prevState.ProposerDetails.CommunicationAddress,
  //           [e.target.name]: e.target.value,
  //         },
  //       },
  //     }));
  //     console.log("datada", data);
  //   };

  //   const onHandleNext = () => {
  //     setQuoteProposalOutput(dispatch, data);
  //     handleNext();
  //   };

  //   const [masters, setMasters] = useState({
  //     Salutation: { mID: "", mValue: "" },
  //     Occupation: { mID: "", mValue: "" },
  //   });

  //   const handleProposerSalutationDropdown = (event, values, name) => {
  //     if (name === "Sal") {
  //       setMasters((prevState) => ({ ...prevState, Salutation: values }));
  //       if (values.mValue !== "") {
  //         const newValue = {
  //           ...data,
  //           ProposerDetails: { ...data.ProposerDetails, [event.target.id.split("-")[0]]: values.mID },
  //         };
  //         setData(newValue);
  //       }
  //     }
  //   };

  //   const [contact, setContact] = useState(false);
  //   const handleContact = () => {
  //     setContact(!contact);
  //   };

  //   const [data1, setData1] = useState();
  //   useEffect(async () => {
  //     const partnerDetails = await getRequest(
  //       `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
  //     );
  //     const partnerDetailsData = partnerDetails.data;
  //     setData1(partnerDetailsData);
  //   });
  //   const [controller] = useDataController();
  //   const { partnerDetails } = controller;
  //   const { premiumResult } = partnerDetails;
  //   console.log("partnerDetails", partnerDetails);
  //   const formatter = new Intl.NumberFormat("en-IN", {
  //     maximumFractionDigits: 2,
  //     style: "currency",
  //     currency: "INR",
  //   });

  const handleChange = (name, value) => {
    const dto1 = dto;
    const mValues1 = mValues;

    if (name === "AddressLine1") dto1.ProposerDetails.CommunicationAddress.AddressLine1 = value;
    if (name === "AddressLine2") dto1.ProposerDetails.CommunicationAddress.AddressLine2 = value;
    if (name === "PinCode") dto1.ProposerDetails.CommunicationAddress.PinCode = value;
    if (name === "Occupation") dto1.ProposerDetails.Occupation = value;
    if (name === "PANCardNo") dto1.ProposerDetails.PANCardNo = value;
    if (name === "DateOfBirth") dto1.ProposerDetails.DateOfBirth = value;
    if (name === "Salutation") {
      dto1.ProposerDetails.Salutation = value.mValue;
      mValues1.ProposerSalutation = value.mValue;
    }
    setMValues({ ...mValues1 });
    setDto({ ...dto1 });
  };

  const handelBlur = async (e) => {
    const dto1 = dto;
    const res = await getAddDetailsByPincode(780, dto.PartnerId, e.target.value);
    console.log(res);
    setMValues({
      ...mValues,
      proposerDistrict: res.cityDistrict.DistrictName,
      proposerState: res.state.mValue,
      proposerCity: res.cityDistrict.mValue,
    });
    dto1.ProposerDetails.CommunicationAddress.CityId = res.cityDistrict.mID;
    dto1.ProposerDetails.CommunicationAddress.DistrictId = res.cityDistrict.DistrictId;
    dto1.ProposerDetails.CommunicationAddress.StateId = res.state.mID;

    setDto({ ...dto1 });
  };

  const onProceed = () => {
    handelNext();
  };

  return (
    <MDBox m={4}>
      {dto.ProposerDetails && (
        <Grid container spacing={2}>
          <Grid item md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
              Proposer Details
            </MDTypography>
            <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
              Proposer is the person who the insurance company will pay the benefits of the
              insurance policy cover to, should a claim arise and claim for tax exemption under
              section 80D
            </MDTypography>
          </Grid>
          <Grid item md={7} lg={7} xl={7} xxl={7}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <Autocomplete
                  options={masters.Salutation}
                  value={{ mValue: mValues.ProposerSalutation }}
                  getOptionLabel={(option) => option.mValue}
                  sx={autoStyle}
                  onChange={(e, v) => handleChange("Salutation", v)}
                  renderInput={(params) => <MDInput label="Title" {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  label="First Name"
                  name="FirstName"
                  required
                  value={dto.ProposerDetails.CustomerFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  label="Last Name"
                  fullWidth
                  name="LastName"
                  required
                  value={dto.ProposerDetails.CustomerLastName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDDatePicker
                  fullWidth
                  input={{ label: `DOB`, value: dto.ProposerDetails.DateOfBirth }}
                  value={dto.ProposerDetails.DateOfBirth}
                  onChange={(e, v) => handleChange("DateOfBirth", v)}
                  options={{
                    dateFormat: "d-m-Y",
                    altFormat: "d/m/Y",
                    altInput: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  name="Occupation"
                  label="Occupation"
                  value={dto.ProposerDetails.Occupation}
                  onChange={(e) => handleChange("Occupation", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  name="PANCardNo"
                  label="PAN Card No"
                  required
                  value={dto.ProposerDetails.PANCardNo}
                  onChange={(e) => handleChange("PANCardNo", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Check if the Proposer and self are same"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" color="primary" sx={{ fontSize: "1.5rem" }}>
                  Contact Details
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  label="Email Address"
                  fullWidth
                  value={dto.ProposerDetails.Email}
                  name="EmailAddress"
                  // onChange={handleProposerChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  label="Mobile No"
                  fullWidth
                  value={dto.ProposerDetails.ContactNo}
                  name="MobileNo"
                  // onChange={handleProposerChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput label="Emergency Mobile No" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" color="primary" sx={{ fontSize: "1.5rem" }}>
                  Communication Details
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  label="House No"
                  onChange={(e) => handleChange("AddressLine1", e.target.value)}
                  value={dto.ProposerDetails.CommunicationAddress.AddressLine1}
                  name="AddressLine1"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  label="Street/Region"
                  onChange={(e) => handleChange("AddressLine2", e.target.value)}
                  value={dto.ProposerDetails.CommunicationAddress.AddressLine2}
                  name="AddressLine2"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  label="Pin Code"
                  name="PinCode"
                  value={dto.ProposerDetails.CommunicationAddress.PinCode}
                  onChange={(e) => handleChange("PinCode", e.target.value)}
                  onBlur={handelBlur}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput label="District" readOnly id="District" value={mValues.proposerDistrict} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput label="State" readOnly id="State" value={mValues.proposerState} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput label="City" value={mValues.proposerCity} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDButton onClick={onProceed}>Proceed To Members</MDButton>
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
                    Quote No
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* {quoteProposalOutput.BaseQuotationNo} */}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Insurer
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDAvatar size="xl" variant="square" sx={{ mx: "9rem" }} />
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
                    {/* {partnerDetails.partnerName} */}
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
                    {/* {formatter.format(quoteProposalOutput.SumInsured)} */}
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
                    {/* {quoteProposalOutput.PolicyTenure} Year */}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    GST@18%
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* {formatter.format(premiumResult.PremiumDetail.TaxAmount)} */}
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
                    {/* {formatter.format(premiumResult.PremiumDetail.TotalPremium)} */}
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
                    Proceed to Proposal
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default ProposerDetails;
