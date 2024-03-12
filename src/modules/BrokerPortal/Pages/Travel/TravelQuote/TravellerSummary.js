import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Grid, Divider, Stack, Card, Modal, CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MDAvatar from "components/MDAvatar";
import Radio from "@mui/material/Radio";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import CheckBox from "@mui/icons-material/CheckBox";
import ClearIcon from "@mui/icons-material/Clear";
import swal from "sweetalert";
import { postRequest, getRequest } from "core/clients/axiosclient";

import MDInput from "components/MDInput";
// import SBI from "assets/images/BrokerPortal/Travel/SBIGeneral.png";
// import EConsent from "assets/images/BrokerPortal/EConsent.png";
import CustDetail from "assets/images/BrokerPortal/CustDetail.png";
import OtpInput from "react-otp-input-rc-17";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";

import { GetOTP, getOTP } from "./TravelCustomerEngage/data/index";
import {
  images,
  //  useDataController
} from "../../../context/index";
// import { data } from "../data/JsonData";
import {
  // GetProposalDetailsByProposalNumber,
  GetAllMasters,
  GetAllMastersProposer,
  GetPaymentURL,
  // GetQuote,
  // GetICDetails,
} from "../data/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "56rem",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function Loading() {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <CircularProgress size="10rem" />
    </MDBox>
  );
}

function OTPModel({
  handleOTP,
  otpdata,
  handleotpverify,
  handleModalClose,
  customerDetails,
  handleModalEmailOpen,
  handleEmailchange,
  flags,
}) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalClose} />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="body1"
              sx={{
                textAlign: "center",
                fontSize: "1rem",
                color: "#000000",
                marginTop: "40px",
              }}
            >
              {" "}
              Enter the otp sent to{" "}
              {flags.getotpflag === true ? otpdata.Email : customerDetails.Email}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ marginTop: "27px" }}>
            <OtpInput
              value={otpdata.otp}
              onChange={handleOTP}
              numInputs={6}
              isInputNum
              hasErrored
              isInputSecure
              inputStyle={{
                width: "48px",
                height: "48px",
                margin: "0.85rem",
                fontSize: "1rem",
                borderRadius: 4,
                border: "2px solid rgba(0,0,0,0.3)",
                background: "white",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="body1"
              onClick={handleModalEmailOpen}
              sx={{
                textAlign: "center",
                fontSize: "1rem",
                color: "#0071D9",
                marginLeft: "-253px",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {" "}
              Change Email
            </MDTypography>
          </Grid>
          <Grid container justifyContent="space-between" sx={{ marginTop: "33px" }}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography
                onClick={handleEmailchange}
                sx={{
                  color: "#0071D9",
                  fontSize: "1.10rem",
                  textDecoration: "underline",
                  mr: "2rem",
                  ml: "2rem",
                  cursor: "pointer",
                }}
              >
                ResendOTP
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} sx={{ marginRight: "27px" }}>
              <MDButton
                onClick={handleotpverify}
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                Proceed
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
function ChangeEmailModel({ handleEmail, otpdata, handleModalEmailClose, handleEmailchange }) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalEmailClose} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ marginTop: "72px", margingLeft: "11px" }}
        >
          <MDInput
            id="Email"
            value={otpdata.Email}
            name="Email"
            onChange={handleEmail}
            // onBlur={handleValidate}
            label="Email"
          />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            sx={{ marginRight: "27px", marginTop: "75px" }}
          >
            <Grid container justifyContent="flex-end">
              <MDButton
                onClick={handleEmailchange}
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                Get OTP
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function TravellerSummary({ data, proposalDetails }) {
  // const [controller] = useDataController();
  // const { partnerDetails } = controller;
  // console.log("partnerDetails", partnerDetails);
  const [loading, setLoading] = useState(false);

  const [otpdata, setotpdata] = useState({
    otp: "",
    Email: "",
  });
  const { InsurableItem } = data;
  const { RiskItems } = InsurableItem[0];
  const RiskDetails = RiskItems;
  const Traveller = RiskDetails;

  const [args1, setArgs1] = useState({
    productId: null,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });
  const [masters1, setMasters1] = useState({
    TravelPolicyType: [],
    Visatype: [],
  });
  const getValue1 = (masterType, value) => {
    if (masters1[masterType]) {
      const val = masters1[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };

  const [args, setArgs] = useState({
    productId: null,
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

  const [masters2, setMasters2] = useState({
    Gender: [],
    Salutation: [],
    Purposeoftravel: [],
    TravelOccupation: [],
    TravelNomineeRelationship: [],
    Nationality: [],
  });
  const getValue = (masterType, value) => {
    if (masters2[masterType]) {
      const val = masters2[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };

  // const onNext = () => {
  //   console.log("data", data);
  //   handleNext();
  // };
  const [quote, setQuote] = useState({});
  const [partnerData, setPartnerData] = useState({});
  const [paymentData, setPaymentData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  // const [partner, setPartner] = useState();
  const [flags, setFlags] = useState({
    getotpflag: false,
  });
  const [termsnCond, setTermsnCond] = useState({
    acceptTnC1: false,
    acceptTnC2: false,
    acceptTnC3: false,
  });
  const [disableKYC, setdisableKYC] = useState(true);

  useEffect(() => {
    if (
      termsnCond.acceptTnC1 === true &&
      termsnCond.acceptTnC2 === true &&
      termsnCond.acceptTnC3 === true
    ) {
      setdisableKYC(false);
    } else {
      setdisableKYC(true);
    }
  }, [termsnCond.acceptTnC1, termsnCond.acceptTnC2, termsnCond.acceptTnC3]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };

  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const handleModalEmailOpen = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setModalEmailOpen(true);
  };

  const handleModalEmailClose = () => {
    setModalEmailOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };
  const [customerDetails, setCustomerDetails] = useState({
    FirstName: "",
    LastName: "",
    MobileNo: "",
    Email: "",
  });
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
      // GetICDetails(data.PartnerId, setPartner);
    }
  }, [data.PartnerId]);
  // useEffect(async () => {
  //   const iCDetails = await getRequest(`Partner/GetPartnerDetails?partnerId=${data.PartnerId}`);
  //   setPartner(iCDetails.data);
  //   return iCDetails.data;
  // }, [data.PartnerId]);
  // console.log("partner123", partner);
  useEffect(() => {
    setCustomerDetails((prevState) => ({
      ...prevState,
      FirstName: data.ProposerDetails.CustomerFirstName,
      LastName: data.ProposerDetails.CustomerLastName,
      Email: data.ProposerDetails.EmailId,
      MobileNo: data.ProposerDetails.ContactNo,
    }));
  }, [data.ProposerDetails.EmailId]);

  const [iCName, setICName] = useState();
  useEffect(async () => {
    const productPartnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${data.PartnerId}`
    );
    // console.log("partnerDetails", productPartnerDetails);
    const partnerDetailsData = productPartnerDetails.data;
    console.log("partnerDetailsData", productPartnerDetails);
    setICName(partnerDetailsData);
  }, [data.PartnerId]);
  console.log("iCName", iCName);
  const handleOTP = (otp1) => {
    setotpdata((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
  };

  const handleEmail = (event) => {
    setotpdata((prevState) => ({
      ...prevState,
      Email: event.target.value,
    }));
  };
  const handleEmailchange = async () => {
    if (otpdata.Email !== "") {
      setFlags((prevState) => ({ ...prevState, getotpflag: true }));
    }
    setotpdata((prevState) => ({ ...prevState, otp: "" }));
    const sendOTP = {
      name: `${customerDetails.FirstName + customerDetails.LastName}`,
      otp: "1234",
      email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    setModalEmailOpen(false);
    handleModalOpen();
    await getOTP(sendOTP);
  };

  const handleotpverify = () => {
    if (otpdata.otp !== "") {
      const verifyOTP = {
        otp: otpdata.otp,
        email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
        mobileNumber: "",
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      Promise.all([GetOTP(verifyOTP)]).then((results) => {
        console.log("OTP Result", results);
        if (results[0] === null) {
          swal({
            icon: "error",
            text: "Please enter the valid OTP sent to your Email",
          });
        }
        if (results[0].status === 1) {
          setLoading(true);
          //   SaveProposal(partnerDetails.partnerProductId, data, setProposalDetails);
          GetPaymentURL(
            partnerData.partnerProductId,
            proposalDetails.proposalNo,
            partnerData.productId,
            data.PartnerId,
            setPaymentData
          );
        }
      });
    }
  };

  useEffect(async () => {
    if (data.BaseQuotationNo) {
      const quoteData = await getRequest(`Quotation/GetQuote?QuoteNumber=${data.BaseQuotationNo}`);
      // setMaster(quoteData.data);
      console.log("getQuoteData", quoteData);
      setQuote(quoteData.data);
      // GetQuote(data.BaseQuotationNo, setQuote);
    }
  }, [data.BaseQuotationNo]);

  useEffect(() => {
    if (quote.quotationDetails && quote.quotationDetails.length > 0 && iCName) {
      const partData = quote.quotationDetails.filter((it) => it.partnerName === iCName);

      console.log("PARTDATA", partData);
      setPartnerData(partData[0] ? partData[0] : null);
    }
  }, [quote.quotationDetails, iCName]);

  const redirectPayment = async () => {
    const sendOTP = {
      name: `${customerDetails.FirstName + customerDetails.LastName}`,
      otp: "1234",
      email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    handleModalOpen();
    await getOTP(sendOTP);
  };

  const buildForm = ({ action, params }) => {
    console.log("buildForm", action, params);
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      console.log("element", key, params[key]);
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", params[key]);
      form.appendChild(input);
    });
    console.log("PaymentForm", form);
    return form;
  };

  const post = (details) => {
    console.log("PaymentFormDataPost", details);
    const formdata = {
      action: details.PaymentURL,
      params: details.InputJson,
    };
    const form = buildForm(formdata);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };
  useEffect(() => {
    // console.log("PaymentFormData", "outside");
    if (paymentData) {
      //   console.log("PaymentFormData", paymentData.OutputResult);
      if (paymentData.OutputResult.InputJson) {
        post(paymentData.OutputResult);
      } else {
        const paymentURL = paymentData.OutputResult.PaymentURL;
        window.location.href = paymentURL;
      }
    }
  }, [paymentData]);

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

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const [addressCity, setAddressCity] = useState({
    CommunicationAddress: {
      city: "",
      district: "",
      state: "",
    },
    HomeAddress: {
      city: "",
      district: "",
      state: "",
    },
  });

  // useEffect(() => {
  //   for (let i = 0; i < data.NOOfTravellingMembers; i += 1) {
  //     addressCity.push({
  //       CommunicationAddress: {
  //         city: "",
  //         district: "",
  //         state: "",
  //       },
  //       HomeAddress: {
  //         city: "",
  //         district: "",
  //         state: "",
  //       },
  //     });
  //   }
  //   setAddressCity([...addressCity]);
  // }, [data.PartnerId]);
  console.log("addressCity", addressCity);
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
    const riskArr = data.InsurableItem[0].RiskItems;
    riskArr.forEach(async (a, i) => {
      if (data.InsurableItem[0].RiskItems[i].CommunicationAddress.Pincode.length === 6) {
        const { district, state } = await getPincodeDetails1(
          data.InsurableItem[0].RiskItems[i].CommunicationAddress.Pincode
        );
        addressCity.CommunicationAddress.city = district[0].mValue;
        addressCity.CommunicationAddress.district = district[0].DistrictName;
        addressCity.CommunicationAddress.state = state[0].mValue;
      }
    });
    setAddressCity(...addressCity);
  }, [data, data.PartnerId, data.ProposerDetails.CommunicationAddress.Pincode]);
  // const [data4, setData4] = useState();
  // console.log("data1234", data4);
  // useEffect(async () => {
  //   console.log("quoteProposalOutput.PartnerId", quoteProposalOutput.PartnerId);
  //   const productPartnerDetails = await getRequest(
  //     `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
  //   );
  //   // console.log("partnerDetails", productPartnerDetails);
  //   const partnerDetailsData = productPartnerDetails.data;
  //   // console.log("partnerDetailsData", partnerDetailsData);
  //   setData4(partnerDetailsData);
  //   console.log("partnerDetailsData", partnerDetailsData);
  // });

  //   const formatter = new Intl.NumberFormat("en-IN", {
  //     maximumFractionDigits: 2,
  //     style: "currency",
  //     currency: "INR",
  //   });

  const travellernameandage = Traveller.map((row, index) => (
    <Accordion
      // expanded={index === 0}
      defaultExpanded
      disableGutters
      sx={{ ml: 0, boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <MDTypography variant="h6" sx={{ fontSize: "1.5rem", ml: "0rem" }}>
          Traveller 0{index + 1} Details
        </MDTypography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row">
              <MDTypography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                Personal Details
              </MDTypography>
              <Divider
                orientation="horizontal"
                textAlign="left"
                style={{
                  backgroundColor: "#1E90FF",
                  height: "0.15rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  width: "75%",
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Salutation"
              value={getValue("Salutation", Traveller[index].Salutation)}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Full Name"
              value={Traveller[index].Name}
              // onChange={(event) => handleChange(event, index)}
              name="Name"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="DOB" disabled value={Traveller[index].DOB} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Nationality"
              disabled
              value={getValue("Nationality", Traveller[index].Nationality)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Gender" value={getValue("Gender", Traveller[index].Gender)} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Passport Number" value={Traveller[index].PassportNo} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row">
              <MDTypography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                Travel Details
              </MDTypography>
              <Divider
                orientation="horizontal"
                textAlign="left"
                style={{
                  backgroundColor: "#1E90FF",
                  height: "0.15rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  width: "75%",
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="VisaType"
              value={getValue1("Visatype", Traveller[index].VisaType)}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Purpose of Travel"
              value={getValue("Purposeoftravel", Traveller[index].Purposeoftravel)}
              disabled
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Geography" value={data.Geography} disabled />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Destination" value={data.ListOfDestinationValue} disabled />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            {data.PartnerId === "77" ? (
              <MDInput
                label="Place to Visit"
                value={Traveller[index].CountryToVisitValue}
                disabled
              />
            ) : (
              <MDInput label="Place to Visit" value={Traveller[index].CountryToVisit} disabled />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Occupation"
              value={getValue("TravelOccupation", Traveller[index].TravelOccupation)}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row">
              <MDTypography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                Additional Questions
              </MDTypography>
              <Divider
                orientation="horizontal"
                style={{
                  backgroundColor: "#1E90FF",
                  height: "0.15rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  width: "75%",
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDTypography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  fontFamily: "Roboto",
                  color: "#000000",
                }}
              >
                Any pre-existing medical conditions?
              </MDTypography>
              <RadioGroup
                row
                value={Traveller[index].TravellerPed}
                // onChange={(event) => handleChange(event, index)}
                // onChange={(event) => handlePEDChange(event, index)}
                name="TravellerPed"
                defaultValue="No"
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          </Grid>
          {Traveller[index].TravellerPed === "Yes" ? (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing={2}>
                  <MDTypography
                    variant="body1"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "400",
                      fontFamily: "Roboto",
                      color: "#000000",
                    }}
                  >
                    Please mention the pre-existing medical conditions of {Traveller[index].Name}
                  </MDTypography>
                  <RadioGroup
                    row
                    value={Traveller[index].TravellerPremed}
                    // onChange={(event) => handleTPEDChange(event, index)}
                    // name=""
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Stack>
              </Grid>
              {Traveller[index].TravellerPremed === "Yes" ? (
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                  <MDInput
                    label="Specify conditions"
                    // value={Traveller[index].TravellerPremed}
                    // onChange={(event) => handleTPEDChange(event, index)}
                    name="TravellerPremed"
                    helperText=" Like Heart Ailment, Diabetes, BP, Asthma etc."
                  />
                </Grid>
              ) : null}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack spacing={2} direction="row">
                  <MDTypography sx={{ fontSize: "1rem", fontWeight: "400", color: "#000000" }}>
                    Have you ever claimed under any travel policy?
                  </MDTypography>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    value={Traveller[index].TravellerClaim}
                    // onChange={(event) => handleClaimChange(event, index)}
                    // onChange={(event) => handleHideChange(event)}
                    // value={value1}
                    name="TravellerClaim"
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Stack>
              </Grid>
              {Traveller[index].TravellerClaim ? (
                <Grid item xs={12} sm={12} md={6} lg={5} xl={5} xxl={5}>
                  <MDInput
                    label="Specify claimed events"
                    // value={Traveller[index].TravellerClaim}
                    // onChange={(event) => handleChange(event, index)}
                    // onClick={(event) => handleHideChange(event)}
                    name="TravellerClaimEvent"
                    helperText="Like Claimed for Baggage Loss in 2020"
                  />
                </Grid>
              ) : null}
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                <MDTypography sx={{ fontSize: "1rem", fontWeight: "400", color: "#000000" }}>
                  {" "}
                  Has anyone been diagnosed / hospitalized / or under any treatment for any illness
                  / injury during the last 48 months?
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <RadioGroup
                  row
                  value={Traveller[index].TravellerHospitalized}
                  // onChange={(event) => handleChange(event, index)}
                  name="TravellerHospitalized"
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
            </>
          ) : null}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row">
              <MDTypography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                Communication Details
              </MDTypography>
              <Divider
                orientation="horizontal"
                textAlign="left"
                style={{
                  backgroundColor: "#1E90FF",
                  height: "0.15rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  width: "75%",
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ color: "#0071D9" }} variant="h7">
              Communication Address
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Address 1"
              value={Traveller[index].CommunicationAddress.AddressLine1}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Address 2"
              value={Traveller[index].CommunicationAddress.AddressLine2}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Pincode"
              value={Traveller[index].CommunicationAddress.Pincode}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="State" value={Traveller[index].CommunicationAddress.State} disabled />
            {/* <MDInput label="State" value={addressCity.CommunicationAddress.state} disabled /> */}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="District"
              value={Traveller[index].CommunicationAddress.District}
              // value={addressCity.CommunicationAddress.district}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="City"
              value={Traveller[index].CommunicationAddress.City}
              // value={addressCity.CommunicationAddress.city}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Country"
              value={Traveller[index].CommunicationAddress.Country}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Area/Locality"
              value={Traveller[index].CommunicationAddress.Area}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <b>Is the home address same as the Communication address?</b>
              <RadioGroup
                row
                value={Traveller[index].CommunicationSameasHomeYN}
                // onChange={handleSameAdress}
                // onChange={(e) => handleSameAdress(e, index)}
              >
                <Stack direction="row">
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </Stack>
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ color: "#0071D9" }} variant="h7">
              Home Address
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Address 1" value={Traveller[index].HomeAddress.AddressLine1} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Address 2" value={Traveller[index].HomeAddress.AddressLine2} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Pincode" value={Traveller[index].HomeAddress.Pincode} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="State" value={Traveller[index].HomeAddress.State} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="District" value={Traveller[index].HomeAddress.District} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="City" value={Traveller[index].HomeAddress.City} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Country" value={Traveller[index].HomeAddress.Country} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Area/Locality"
              value={Traveller[index].CommunicationAddress.Country}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row">
              <MDTypography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                Nominee Details
              </MDTypography>
              <Divider
                orientation="horizontal"
                textAlign="left"
                style={{
                  backgroundColor: "#1E90FF",
                  height: "0.15rem",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  width: "30rem",
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Nominee Full Name"
              value={Traveller[index].NomineeDetails.NomineeName}
              disabled
            />
          </Grid>

          {/* <Stack spacing={2} direction="row">
              <MDTypography sx={{ fontSize: "1rem", fontWeight: "600" }}>Gender</MDTypography>
              <RadioGroup
                row
                value={Traveller[index].NomineeDetails.NomineeGender}
                disabled
                name="NomineeGender"
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            </Stack> */}
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Gender"
              value={getValue("Gender", Traveller[index].NomineeDetails.NomineeGender)}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="DOB" value={Traveller[index].NomineeDetails.NomineeDOB} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Nominee Relation"
              value={getValue(
                "TravelNomineeRelationship",
                Traveller[index].NomineeDetails.TravelNomineeRelationship
              )}
              disabled
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <OTPModel
              handleOTP={handleOTP}
              otpdata={otpdata}
              handleModalClose={handleModalClose}
              customerDetails={customerDetails}
              handleotpverify={handleotpverify}
              handleModalEmailOpen={handleModalEmailOpen}
              handleEmailchange={handleEmailchange}
              flags={flags}
            />
          </Modal>
          <Modal
            open={modalEmailOpen}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ChangeEmailModel
              handleEmail={handleEmail}
              otpdata={otpdata}
              handleModalEmailClose={handleModalEmailClose}
              handleEmailchange={handleEmailchange}
              // handleotpverify={handleotpverify}
            />
          </Modal>
          <Grid item md={7} lg={7} xl={7} xxl={7}>
            <Grid container spacing={3}>
              <MDBox>{travellernameandage}</MDBox>
            </Grid>
          </Grid>

          <Grid item md={4.8} lg={4.8} xl={4.8} xxl={4.8}>
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
                  <Grid item xs={12} sm={12} md={7.5} lg={7.5} xl={7.5} xxl={7.5}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Insurer
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
                    <MDAvatar
                      src={images[iCName]}
                      size="xxl"
                      variant="square"
                      sx={{ mx: "2rem", width: 160, height: 60 }}
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
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {/* {quoteProposalOutput.SumInsured} */}
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
                      mt={0}
                      sx={{ fontSize: "1.5rem", color: "#0071D9" }}
                    >
                      {/* {PolicyData.quotationDetails[0].premiumResult.TotalPremium} */}
                      {formatter.format(data.PaymentDetails.Amount)}
                    </MDTypography>
                  </Grid>

                  {/* <MDBox display="flex" flexDirection="column"> */}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    flexDirection="row"
                    display="flex"
                  >
                    <Checkbox
                      color="secondary"
                      value={termsnCond.acceptTnC1}
                      onChange={(e) =>
                        setTermsnCond((prevState) => ({
                          ...prevState,
                          acceptTnC1: e.target.checked,
                        }))
                      }
                    />

                    <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                      I hereby declare that information provided above is true, and I accept all
                      Terms & Conditions
                    </MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    flexDirection="row"
                    display="flex"
                  >
                    <Checkbox
                      color="secondary"
                      value={termsnCond.acceptTnC2}
                      onChange={(e) =>
                        setTermsnCond((prevState) => ({
                          ...prevState,
                          acceptTnC2: e.target.checked,
                        }))
                      }
                    />

                    <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                      I confirm that all travellers have Indian passports or Overseas Citizenship of
                      India (OCI), and the policy holder has an Indian bank account.
                    </MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    flexDirection="row"
                    display="flex"
                  >
                    <Checkbox
                      color="secondary"
                      value={termsnCond.acceptTnC3}
                      onChange={(e) =>
                        setTermsnCond((prevState) => ({
                          ...prevState,
                          acceptTnC3: e.target.checked,
                        }))
                      }
                    />

                    <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                      I hereby consent to recive information from Central KYC Registry through
                      SMS/email on the registered number/email address. I/We agree that the KYC
                      details and other information provided by me/us in the application form may be
                      used by insurer(s) to download/verify my/our KYC documents from the CERSAI*
                      CKYC portal for processing this application. I/We understand that only the
                      acceptable Officially Valid documents would be relied upon for processing this
                      application. Central Registry of Securitisation and Asset Reconstruction and
                      Security Interest of India.
                    </MDTypography>
                  </Grid>
                  {/* </MDBox> */}

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDBox justifyContent="end" display="flex">
                      <MDButton
                        sx={{ width: "auto", fontSize: "0.7rem" }}
                        onClick={redirectPayment}
                        disabled={disableKYC}
                      >
                        Proceed
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </Card>
            </MDBox>
          </Grid>
        </>
      )}
    </Grid>
  );
}
export default TravellerSummary;
