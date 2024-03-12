import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import { useLocation } from "react-router-dom";

import { Grid, FormControlLabel, Radio, RadioGroup, Stack, Card } from "@mui/material";

// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import swal from "sweetalert";
// import { isValid } from "date-fns";
// import CloseIcon from "@mui/icons-material/Close";
// import { Save } from "@mui/icons-material";
// import { KeyboardBackspace } from "@mui/icons-material";
// import Sbi from "assets/images/BrokerPortal/Travel/SBIGeneral.png";
// import ShareIcon from "@mui/icons-material/Share";
// import Checkbox from "@mui/material/Checkbox";
// import { getRequest } from "core/clients/axiosclient";
// import PageLayout from "../../../../../examples/LayoutContainers/PageLayout";
import { postRequest, getRequest } from "core/clients/axiosclient";

import MDAvatar from "../../../../../components/MDAvatar";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
// import MDDatePicker from "../../../../../components/MDDatePicker";

import { images } from "../../../context/index";
import {
  // GetProposalDetailsByProposalNumber,
  // GetQuote,
  GetAllMastersProposer,
  GetAllMasters,
} from "../data/index";

function ProposerSummary({ handleNext, data }) {
  console.log("log", data);
  // const { search } = useLocation();

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  // const [dispatch] = useDataController();

  console.log("data", data);

  const [partner, setPartner] = useState();
  // const [quote, setQuote] = useState({});
  // console.log("setQuote", setQuote);
  // const [partnerData, setPartnerData] = useState({});

  // useEffect(async () => {
  //   if (data.PartnerId) {
  //     GetICDetails(data.PartnerId, setPartner);
  //   }
  // }, [data.PartnerId]);

  useEffect(async () => {
    const productPartnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${data.PartnerId}`
    );
    // console.log("partnerDetails", productPartnerDetails);
    const partnerDetailsData = productPartnerDetails.data;
    console.log("partnerDetailsData", productPartnerDetails);
    setPartner(partnerDetailsData);
  }, [data.PartnerId]);

  const [gst, setGst] = useState(0);
  useEffect(() => {
    if (data.PartnerId === "99") {
      const total = Number(data.PaymentDetails.SGST) + Number(data.PaymentDetails.CGST);
      setGst(total);
      console.log("total", total);
    } else if (data.PartnerId === "77") {
      const total = data.PaymentDetails.TaxAmount;
      setGst(total);
    }
  }, [data.PartnerId]);

  // useEffect(() => {
  //   if (data.BaseQuotationNo) {
  //     GetQuote(dispatch, data.BaseQuotationNo);
  //   }
  // }, [data.BaseQuotationNo]);

  // useEffect(() => {
  //   if (quote.quotationDetails && quote.quotationDetails.length > 0 && partner) {
  //     const partData = quote.quotationDetails.filter((it) => it.partnerName === partner);

  //     console.log("PARTDATA", partData);
  //     setPartnerData(partData[0] ? partData[0] : null);
  //   }
  // }, [quote.quotationDetails, partner]);

  // const [premiumData, setPremiumData] = useState({
  //   gst: 0,
  //   premium: 0,
  // });
  // useEffect(() => {
  //   if (partnerData.premiumResult) {
  //     const sgst = partnerData.premiumResult.SGST
  //       ? Number(partnerData.premiumResult.SGST.replace("INR", ""))
  //       : 0;
  //     const cgst = partnerData.premiumResult.CGST
  //       ? Number(partnerData.premiumResult.CGST.replace("INR", ""))
  //       : 0;
  //     const igst = partnerData.premiumResult.IGST
  //       ? Number(partnerData.premiumResult.IGST.replace("INR", ""))
  //       : 0;
  //     const gst = partnerData.premiumResult.GST
  //       ? Number(partnerData.premiumResult.GST.replace("INR", ""))
  //       : sgst + cgst + igst;

  //     const prem = partnerData.premiumResult.FinalPremium
  //       ? Number(partnerData.premiumResult.FinalPremium.replace("INR", ""))
  //       : 0;
  //     setPremiumData((prevState) => ({ ...prevState, gst, premium: prem - gst }));
  //   }
  // }, [partnerData.premiumResult]);
  // console.log("premiumData", premiumData);
  console.log("partner", partner);
  //   const [controller] = useDataController();
  //   const { quoteProposalOutput } = controller;

  // console.log("quoteProposalOutputProposer", quoteProposalOutput);
  // const ProposerDetailsnew = TravellerInsuranceDetails.ProposerDetails;
  // console.log("ggg", ProposerDetailsnew);
  // const data2 = TravellerInsuranceDetails.TravellerDetails;

  // const [data, setData] = useState(TravellerInsuranceDetails);
  // const [PolicyDto, setPolicyDto] = useState(quoteProposalOutput);

  // const data = controller.getQuoteOutput;
  // const [TravelDto] = useState(data);
  // const TPolicyDto = PolicyDto;
  const [args, setArgs] = useState({
    productId: 918,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });
  const [args1, setArgs1] = useState({
    productId: 918,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });
  useEffect(() => {
    setArgs({
      productId: 918,
      partnerId: data.PartnerId,
      masterType: null,
      jsonValue: null,
    });
  }, [data]);
  const [addressCity, setAddressCity] = useState({
    city: "",
    district: "",
    state: "",
  });
  const getPincodeDetails1 = async (pincodeValue) => {
    const getPincodeDistrictStateData = async (type, id) => {
      const urlString = `Product/GetProdPartnermasterData?ProductId=${args.productId}&PartnerId=${data.PartnerId}&MasterType=${type}`;
      let payload;
      switch (type) {
        case "State":
          payload = { State_Id: id };
          break;
        case "CityDistrict":
          payload = { City_Id: id };
          break;
        case "DetailsPincode":
          payload = { Pincode: id };
          break;
        default:
          break;
      }

      const dataValue = await (await postRequest(urlString, payload)).data;
      return dataValue;
    };

    const pincodeData = await getPincodeDistrictStateData("DetailsPincode", pincodeValue);

    const district = await getPincodeDistrictStateData("CityDistrict", pincodeData[0].CityId);

    const state = await getPincodeDistrictStateData("State", district[0].StateId);

    return { pinCode: pincodeData, district, state };
  };
  useEffect(async () => {
    if (data.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
      const { district, state } = await getPincodeDetails1(
        data.ProposerDetails.CommunicationAddress.Pincode
      );

      setAddressCity((prevState) => ({
        ...prevState,
        state: state[0].mValue,
        city: district[0].mValue,
        district: district[0].DistrictName,
      }));
    } else {
      setAddressCity((prevState) => ({
        ...prevState,
        state: "",
        city: "",
        district: "",
      }));
    }
    // }
  }, [data.PartnerId, data.ProposerDetails.CommunicationAddress.Pincode.length]);

  const [masters2, setMasters2] = useState({
    Gender: [],
    Salutation: [],
    TravelInsuredRelation: [],
  });
  const getValue = (masterType, value) => {
    if (masters2[masterType]) {
      const val = masters2[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };
  useEffect(async () => {
    const argObj = {
      ...args,
      productId: 918,
      partnerId: data.PartnerId,
      masterType: null,
      jsonValue: null,
    };
    setArgs(argObj);
    GetAllMastersProposer(argObj, setMasters2);
  }, [data.PartnerId]);
  const [masters1, setMasters1] = useState({
    TravelPolicyType: [],
  });
  const getValue1 = (masterType, value) => {
    if (masters1[masterType]) {
      const val = masters1[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };
  useEffect(async () => {
    if (data.PartnerId) {
      const argObj = {
        ...args1,
        productId: 918,
        partnerId: null,
        masterType: null,
        jsonValue: null,
      };
      setArgs1(argObj);
      GetAllMasters(argObj, setMasters1);
    }
  }, [data.PartnerId]);
  const onNext = () => {
    //   setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    //   setQuoteProposalOutput(dispatch, PolicyDto);

    //   if (quoteProposalOutput !== null) {
    //     console.log("policy123", TPolicyDto);
    //   }
    handleNext();
  };
  // const navigate = useNavigate();
  // const onHandleBack = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary`);
  //   handleBack();
  // };
  // const TGST =
  //   Number(TravelDto.quotationDetails[0].premiumResult.SGST) +
  //   Number(TravelDto.quotationDetails[0].premiumResult.CGST);
  // console.log("tttgst", TGST);

  //   const handleSetProposer = (e) => {
  //     TPolicyDto.ProposerDetails[e.target.name] = e.target.value;
  //     if (e.target.name === "Name") {
  //       setPolicyDto((prevState) => ({ ...prevState, Name: e.target.value }));
  //     } else if (e.target.name === "ContactNo") {
  //       setPolicyDto((prevState) => ({ ...prevState, ContactNo: e.target.value }));
  //     }

  //  else if (e.target.name === "DOB") {
  //   setPolicyDto((prevState) => ({ ...prevState, DOB: e.target.value }));
  // }
  //     else if (e.target.name === "RelationWithInsured") {
  //       setPolicyDto((prevState) => ({ ...prevState, RelationWithInsured: e.target.value }));
  //     } else if (e.target.name === "EmailId") {
  //       setPolicyDto((prevState) => ({ ...prevState, EmailId: e.target.value }));
  //     } else if (e.target.name === "Gender") {
  //       setPolicyDto((prevState) => ({ ...prevState, Gender: e.target.value }));
  //     } else if (e.target.name === "Sameproposer") {
  //       setPolicyDto((prevState) => ({ ...prevState, Sameproposer: e.target.value }));
  //     } else if (e.target.name === "SameNominee") {
  //       setPolicyDto((prevState) => ({ ...prevState, SameNominee: e.target.value }));
  //     } else {
  //       setPolicyDto((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  //     }
  //     setPolicyDto((prevState) => ({ ...prevState, TPolicyDto: prevState.TPolicyDto }));
  //     console.log("NewPolicyDTo", PolicyDto);
  //   };

  //   const handleSetProposerAddress = (e) => {
  //     TPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
  //     if (e.target.name === "AddressLine1") {
  //       setPolicyDto((prevState) => ({ ...prevState, AddressLine1: e.target.value }));
  //     } else if (e.target.name === "AddressLine2") {
  //       setPolicyDto((prevState) => ({ ...prevState, AddressLine2: e.target.value }));
  //     } else if (e.target.name === "CityDistrict") {
  //       setPolicyDto((prevState) => ({ ...prevState, CityDistrict: e.target.value }));
  //     } else if (e.target.name === "State") {
  //       setPolicyDto((prevState) => ({ ...prevState, State: e.target.value }));
  //     } else if (e.target.name === "Pincode") {
  //       setPolicyDto((prevState) => ({ ...prevState, Pincode: e.target.value }));
  //     }
  //     setPolicyDto((prevState) => ({ ...prevState, TPolicyDto: prevState.TPolicyDto }));
  //   };

  // const [openShareModal, setShareOpen] = useState(false);
  // const handleShareOpen = () => setShareOpen(true);
  // const handleShareClose = () => setShareOpen(false);

  //   const { partnerDetails } = controller;
  //   const { premiumResult } = partnerDetails;
  //   console.log("partnerDetails", partnerDetails);

  //   const [data4, setData4] = useState();
  //   console.log("data1234", data4);
  //   useEffect(async () => {
  //     const productPartnerDetails = await getRequest(
  //       `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
  //     );
  //     // console.log("partnerDetails", productPartnerDetails);
  //     const partnerDetailsData = productPartnerDetails.data;
  //     // console.log("partnerDetailsData", partnerDetailsData);
  //     setData4(partnerDetailsData);
  //   }, []);

  //   const formatter = new Intl.NumberFormat("en-IN", {
  //     maximumFractionDigits: 2,
  //     style: "currency",
  //     currency: "INR",
  //   });

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
  //     // extract the year, month, and date from current date
  //     const currentYear = now.getYear();
  //     const currentMonth = now.getMonth();
  //     const currentDate = now.getDate();
  //     let yearAge = currentYear - dobYear;
  //     let monthAge;
  //     if (currentMonth >= dobMonth) {
  //       monthAge = currentMonth - dobMonth;
  //     }
  //     // get months when current month is greater
  //     else {
  //       yearAge -= 1;
  //       monthAge = 12 + currentMonth - dobMonth;
  //     }
  //     // get days
  //     // let dateAge;
  //     if (currentDate >= dobDate) {
  //       // dateAge = currentDate - dobDate;
  //     } else {
  //       monthAge -= 1;
  //       // dateAge = 31 + currentDate - dobDate;
  //       if (monthAge < 0) {
  //         monthAge = 11;
  //         yearAge -= 1;
  //       }
  //     }
  //     // group the age in a single variable
  //     return yearAge;
  //   };

  // const formatPropDate = (date) => {
  //   const propformat = (val) => (val > 9 ? val : `0${val}`);
  //   const propdate = new Date(date);
  //   return `${propformat(propdate.getDate())}-${propformat(
  //     propdate.getMonth() + 1
  //   )}-${propdate.getFullYear()}`;
  // };
  //   const formatDate = (date) => {
  //     const format1 = (val) => (val > 9 ? val : `0${val}`);
  //     const dt = new Date(date);
  //     return `${format1(dt.getDate())}-${format1(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  //   };

  //   const handleDateChange = (value, label, type) => {
  //     // TPolicyDto.ProposerDetails[e.target.name] = e.target.value;

  //     const date = new Date(value).getFullYear();
  //     const dateString = date.toString().length;
  //     if (value !== null && isValid(new Date(value)) && dateString === 4) {
  //       setValidDate(false);
  //       // setPolicyDto((prevState) => ({ ...prevState, [label]: value }));
  //       // setPolicyDto((prevState) => ({ ...prevState, [type]: formatPropDate(value) }));
  //       // setPolicyDto((prevState) => ({ ...prevState, DOB: e.target.value }));
  //       setDate((prevState) => ({ ...prevState, [label]: value }));
  //       setPolicyDto((prevState) => ({
  //         ...prevState,
  //         ProposerDetails: { ...prevState.ProposerDetails, [type]: formatDate(value) },
  //       }));
  //       // setPolicyDto((prevState) => ({ ...prevState, [type]: formatPropDate(value) }));
  //       console.log("setPolicyDto", PolicyDto);
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

  return (
    <MDBox m={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                Proposer Details
              </MDTypography>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                Proposer is the person who the insurance company will pay the benefits of the
                insurance policy cover to, should a claim arise and claim for tax exemption under
                section 80D
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Salutation"
                value={getValue("Salutation", data.ProposerDetails.Salutation)}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <div> </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput value={data.ProposerDetails.CustomerFirstName} label="First Name" disabled />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput value={data.ProposerDetails.CustomerLastName} label="Last Name" disabled />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <Stack direction="row" spacing={2}>
                <MDTypography
                  variant="h6"
                  sx={{ fontSize: "0.5 rem", color: "#344054", weight: 400, marginTop: "6px" }}
                >
                  Gender
                </MDTypography>
                <RadioGroup
                  row
                  value={PolicyDto.ProposerDetails.Gender}
                  onChange={handleSetProposer}
                  name="Gender"
                >
                  <FormControlLabel control={<Radio />} label="Male" value="Male" />
                  <FormControlLabel control={<Radio />} label="Female" value="Female" />
                </RadioGroup>
              </Stack> */}

              <MDInput
                label="Gender"
                value={getValue("Gender", data.ProposerDetails.Gender)}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput label="DOB" value={data.ProposerDetails.DOB} disabled />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput label="Mobile Number" disabled value={data.ProposerDetails.ContactNo} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput label="Email-ID" disabled value={data.ProposerDetails.EmailId} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Relationship with Insured"
                value={getValue("TravelInsuredRelation", data.ProposerDetails.RelationWithInsured)}
                disabled
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="FirstName"
                // value={PolicyDto.ProposerDetails.CustomerFirstName}
                value={data.ProposerDetails.CustomerFirstName}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}> */}
            {/* <MDInput
                label="Proposer Full Name"
                name="Name"
                onChange={handleSetProposer}
                value={PolicyDto.ProposerDetails.Name}
              /> */}
            {/* <MDInput
                // value={PolicyDto.ProposerDetails.CustomerLastName}
                label="Last Name"
                // required
                name="CustomerLastName"
                value={data.ProposerDetails.CustomerLastName}
                disabled

                // error={
                //   data.ProposerDetails.CustomerLastName === "" ? flags.errorFlag : null
                // }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Stack direction="row" spacing={2}>
                <MDTypography
                  variant="h6"
                  sx={{ fontSize: "0.5 rem", color: "#344054", weight: 400 }}
                >
                  Gender
                </MDTypography>
                <RadioGroup
                  row
                  // value={PolicyDto.ProposerDetails.Gender}
                  value={data.ProposerDetails.Gender}
                  // onChange={handleSetProposer}
                  name="Gender"
                >
                  <FormControlLabel control={<Radio />} label="Male" value="Male" />
                  <FormControlLabel control={<Radio />} label="Female" value="Female" />
                </RadioGroup>
              </Stack>
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="DOB"
                  inputFormat="dd-MM-yyyy"
                  type="login"
                  id="DOB"
                  name="DOB"
                  // value={datetoShow.dateOfBirth}
                  value={data.ProposerDetails.DOB}
                  disabled
                  // onChange={(date) => handleDateChange(date, "dateOfBirth", "DOB")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      // error={validDate}
                    />
                  )}
                />
                {/* {flags.errorFlag && data.ProposerDetails.DOB === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null} */}
            {/* {validDate && datetoShow.dateOfBirth === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the valid date
                  </MDTypography>
                ) : null} */}
            {/* </LocalizationProvider> */}
            {/* {flags.ageFlag ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill the required fields
                </MDTypography>
              ) : null} 
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Mobile Number"
                name="ContactNo"
                // onChange={handleSetProposer}
                // value={PolicyDto.ProposerDetails.ContactNo}
                value={data.ProposerDetails.ContactNo}
                disabled
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Email-ID"
                name="EmailId"
                // onChange={handleSetProposer}
                // value={PolicyDto.ProposerDetails.EmailId}
                value={data.ProposerDetails.EmailId}
                disabled
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="relationship with Insured"
                name="RelationWithInsured"
                // onChange={handleSetProposer}
                // value={PolicyDto.ProposerDetails.RelationWithInsured}
                value={data.ProposerDetails.RelationWithInsured}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Pincode"
                name="Pincode"
                // onChange={handleSetProposerAddress}
                value={data.ProposerDetails.CommunicationAddress.Pincode}
                disabled

                // value={PolicyDto.ProposerDetails.CommunicationAddress.Pincode}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 01"
                name="AddressLine1"
                // onChange={handleSetProposerAddress}
                value={data.ProposerDetails.CommunicationAddress.AddressLine1}
                disabled

                // value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 02"
                name="AddressLine2"
                // onChange={handleSetProposerAddress}
                value={data.ProposerDetails.CommunicationAddress.AddressLine2}
                disabled

                // value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="City"
                name="CityDistrict"
                // onChange={handleSetProposerAddress}
                value={data.ProposerDetails.CommunicationAddress.CityDistrict}
                disabled

                // value={PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="State"
                name="State"
                // onChange={handleSetProposerAddress}
                value={data.ProposerDetails.CommunicationAddress.State}
                disabled

                // value={PolicyDto.ProposerDetails.CommunicationAddress.State}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography variant="h6" sx={{ fontSize: "0.5 rem", color: "#344054" }}>
                  Is Proposer is also a traveler?
                </MDTypography>
                <RadioGroup
                  //   onChange={handleSetProposer}
                  //   value={PolicyDto.ProposerDetails.Sameproposer}
                  value={data.ProposerDetails.Sameproposer}
                  disabled
                  name="Sameproposer"
                >
                  <Stack direction="row">
                    <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                    <FormControlLabel control={<Radio />} label="No" value="No" />
                  </Stack>
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography variant="h6" sx={{ fontSize: "0.5 rem", color: "#344054" }}>
                  Is Nominee same for all traveler?
                </MDTypography>
                <RadioGroup
                  //   onChange={handleSetProposer}
                  //   value={PolicyDto.ProposerDetails.SameNominee}
                  value={data.ProposerDetails.SameNominee}
                  disabled
                  name="SameNominee"
                >
                  <Stack direction="row">
                    <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                    <FormControlLabel control={<Radio />} label="No" value="No" />
                  </Stack>
                </RadioGroup>
              </Stack>
            </Grid>
          </Grid> */}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Pincode"
                // onChange={handleSetProposerAddress}
                // onChange={(e) => handleAddress(e, "Pincode")}
                value={data.ProposerDetails.CommunicationAddress.Pincode}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 01"
                value={data.ProposerDetails.CommunicationAddress.AddressLine1}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 02"
                value={data.ProposerDetails.CommunicationAddress.AddressLine2}
                disabled
              />
            </Grid>
            {data.PartnerId === "99" ? (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="City" value={addressCity.city} disabled />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="District" value={addressCity.district} disabled />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="State" value={addressCity.state} disabled />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Area/Locality"
                    value={data.ProposerDetails.CommunicationAddress.Landmark}
                    disabled
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Area/Locality"
                    value={data.ProposerDetails.CommunicationAddress.Landmark}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="City"
                    name="City"
                    value={data.ProposerDetails.CommunicationAddress.AddressLine3}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="District" value={addressCity.city} disabled />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="State" value={addressCity.state} disabled />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography variant="h6" sx={{ fontSize: "0.5 rem", color: "#344054" }}>
                  Is Proposer is also a traveler?
                </MDTypography>
                <RadioGroup value={data.ProposerDetails.Sameproposer} name="Sameproposer">
                  <Stack direction="row">
                    <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                    <FormControlLabel control={<Radio />} label="No" value="No" />
                  </Stack>
                </RadioGroup>
              </Stack>
            </Grid>
            {data.PolicyType !== "237" ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing={2}>
                  <MDTypography variant="h6" sx={{ fontSize: "0.5 rem", color: "#344054" }}>
                    Is Nominee same for all traveler?
                  </MDTypography>
                  <RadioGroup value={data.ProposerDetails.SameNominee} name="SameNominee">
                    <Stack direction="row">
                      <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                      <FormControlLabel control={<Radio />} label="No" value="No" />
                    </Stack>
                  </RadioGroup>
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        </Grid>

        <Grid item md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
          <MDBox>
            <Card sx={{ background: "#CEEBFF" }}>
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                    Summary
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Quote No
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* {quoteProposalOutput.BaseQuotationNo} */}
                    {data.BaseQuotationNo}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Insurer
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDAvatar
                    src={images[partner]}
                    size="xxl"
                    variant="square"
                    sx={{ mx: "2rem", width: 200, height: 60 }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Policy Type
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* {quoteProposalOutput.PolicyType} */}
                    {getValue1("TravelPolicyType", data.PolicyType)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Sum Insured (Per Traveller)
                  </MDTypography>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    ></MDTypography>
                  </Grid> */}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* {formatter.format(quoteProposalOutput.SumInsured)} */}
                    {data.SumInsured}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Gross Premium
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(data.PaymentDetails.GrossPremium)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    GST@18%
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(gst)}

                    {/* {formatter.format(Number(premiumResult.SGST) + Number(premiumResult.CGST))} */}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Total Premium
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1.5rem", color: "#0071D9" }}
                  >
                    {/* {formatter.format(premiumResult.TotalPremium)} */}
                    {formatter.format(data.PaymentDetails.Amount)}
                  </MDTypography>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="left"
                    variant="h7"
                    onClick={handleShareOpen}
                    sx={{ fontSize: "1rem", color: "#0071D9" }}
                  >
                    <ShareIcon /> <u>Share Quote </u>
                  </MDTypography>

                  <Modal
                    open={openShareModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={handleShareClose}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MDBox
                      align-item="center"
                      sx={{
                        position: "relative",
                        width: 700,
                        height: 200,
                        bgcolor: "background.paper",
                        boxShadow: (theme) => theme.shadows[5],
                        p: 6,
                      }}
                    >
                      <CloseIcon
                        style={{
                          position: "absolute",
                          right: 5,
                          top: 5,
                        }}
                        color="action"
                        instanceof
                        onClick={handleShareClose}
                        variant="text"
                      />
                      <MDTypography style={{ position: "absolute", top: 20, right: 250 }}>
                        <b>Share Quotation</b>
                      </MDTypography>
                      &nbsp;&nbsp;
                      <Grid container>
                        <Stack direction="row">
                          <FormControlLabel
                            value="email"
                            style={{ position: "absolute", left: 130 }}
                            control={<Checkbox />}
                            label="Email"
                          />{" "}
                          &nbsp;&nbsp;
                          <FormControlLabel
                            value="sms"
                            style={{ position: "absolute", left: 300 }}
                            control={<Checkbox />}
                            label="SMS"
                          />{" "}
                          &nbsp;&nbsp;
                          <FormControlLabel
                            value="whatsapp"
                            style={{ position: "absolute", right: 130 }}
                            control={<Checkbox />}
                            label="Whatsapp"
                          />{" "}
                          &nbsp;&nbsp;
                        </Stack>
                      </Grid>
                      <Grid align="end" mr="1px">
                        {/* <MDButton variant="text">Clear</MDButton> 
                        <MDButton style={{ position: "absolute", bottom: 10, right: 280 }}>
                          Share Quote
                        </MDButton>
                      </Grid>
                    </MDBox>
                  </Modal>
                </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox justifyContent="end" display="flex">
                    <MDButton sx={{ width: "auto", fontSize: "0.7rem" }} onClick={onNext}>
                      Proceed
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default ProposerSummary;
