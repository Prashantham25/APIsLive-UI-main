import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import swal from "sweetalert";
import { get } from "Common/RenderControl/objectPath";
import BGRBanner from "assets/images/BrokerPortal/BGRBanner.jpg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Card, Grid, Stack, Container, useMediaQuery } from "@mui/material";
import MDTypography from "components/MDTypography";
import objectPath from "object-path";
import { fetchVericalData } from "../../../Home/data/index";
import { postRequest, getRequest } from "../../../../../../core/clients/axiosclient";
import { getOTP, GetOTP } from "../../../../../BrokerPortal/Pages/Registration/data/index";
import { useDataController } from "../../../../../BrokerPortal/context";
import { IsNumeric } from "../../../../../../Common/Validations";
import Payment from "./components/Payment";
import MDButton from "../../../../../../components/MDButton";
import {
  getPincodeDetails,
  getCkycDetails,
  SendSMS,
  proposalConsentMail,
  callSaveQuoteMethod,
  callUpdateQuoteMethod,
  calculateProposal,
  proposerEamil,
  CkycRegMail,
  GetProdPartnermasterData,
  getCkycUpdateStatus,
  fetchPaymentURL,
  GenericApi,
} from "./data/APIs/USGIWCApi";
import NewRenderControl from "../../../../../../Common/RenderControl/NewRenderControl";
import {
  Qrjson,
  Masters,
  formatDateKYC,
  formatPolDate,
  AgeCalculator1,
  IsCINNo,
  addDays,
} from "./data/Json/Qrjson";
// import { masters } from "./data/Json/MarineSTOP";

const CkycParams = [
  { mID: 1, mValue: "PAN Number" },
  { mID: 2, mValue: "Aadhaar Number" },
];
function Timer({ counter, lMasters }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="left"
      alignItems="left"
      color="#4caf50"
      fontSize="15px"
    >
      {" "}
      {lMasters.flags.status && <>OTP Sent Successfully</>}
      <br />
      Click On Resend OTP in 00:{counter}
    </Grid>
  );
}
function QRCode() {
  const [lDto, setDto] = useState(Qrjson);
  const [lMasters, setMasters] = useState(Masters);
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(async () => {
    lMasters.flags.PayNowflag = false;
    lMasters.Salutation = await GetProdPartnermasterData(1331, "SalutationCombi", {
      MasterType: "SalutationCombi",
    });
    lMasters.Gender = await GetProdPartnermasterData(1037, "Gender", {
      MasterType: "Gender",
    });

    lMasters.Tenure = await GetProdPartnermasterData(1356, "QRCodeTenure", {
      MasterType: "QRCodeTenure",
    });
    lMasters.BuildingSum = await GetProdPartnermasterData(1356, "QRCodeSumInsured", {
      MasterType: "QRCodeSumInsured",
    });
    setMasters({ ...lMasters });
  }, []);

  const handleProduct = async () => {
    lMasters.Productflag = true;
    setMasters({ ...lMasters });
  };

  useEffect(async () => {
    await getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
      async (result) => {
        console.log("result", result);
        const { partnerId } = result.data.userDetails[0];
        await getRequest(
          `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
            "userId"
          )}&productCode=2123`
        ).then(async (res) => {
          console.log("qwertyuiop", res);
          const partnerDetailssss = res.data.additionalDetails;
          console.log("123456789", partnerDetailssss);
          const partnerDetail = JSON.parse(partnerDetailssss);
          // const { Channel } = LPolicyDto[0];
          lDto.Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
          lDto.Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
          lDto.Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
          lDto.Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
          lDto.Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
          lDto.Channel.AgentContactNo = partnerDetail.Mobile;
          lDto.Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
          lDto.Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
          lDto.Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
          const res1 = await fetchVericalData("782", "VerticalName", {});
          lDto.Channel.PrimaryVerticalName =
            partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
              ? res1.filter(
                  (x) =>
                    x.VerticalCode ===
                    partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
                )[0].mValue
              : partnerDetail.AdditionalDetails.PrimaryVerticalName;
          lDto.Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
          lDto.Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
          lDto.Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
          lDto.Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
          lDto.Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
          lDto.Channel.DealId = partnerDetail.AdditionalDetails.DealId;
          lDto["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;
          setDto({ ...lDto });
        });
      }
    );
  }, []);

  const onCheck = (e) => {
    lDto.ProposerDetails.ProposalConsentCheck = e.target.checked;
    if (e.target.checked) {
      proposalConsentMail(lDto.QuoteEmail, lDto["Quotation No"]);
      const MobileNo = lDto.QuoteMobileNo;
      const Message = `Dear customer,Quotation No. ${lDto["Quotation No"]} is generated. Requesting to Pls provide your consent to proceed with the proposal.Best Regards,Universal Sompo General Insurance Co Ltd.`;
      SendSMS("usgi", MobileNo, Message).then((smsResp) => {
        console.log("1234567890", smsResp);
      });
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const sendMail = async () => {
    const notificationReq = {
      notificationRequests: [
        {
          templateKey: "BGR_Ckyclink",
          sendEmail: false,
          isEmailBody: true,
          notificationPayload: JSON.stringify({
            CkycUrl: lMasters.var.result.manualKYCurl,
            ContactUsUrl: process.env.REACT_APP_CONTACTSUPPORT,
          }),
        },
      ],

      sendEmail: true,
      subject: "CKYC Registration Link",
      toEmail: lDto.QuoteEmail,
    };

    const mail = await CkycRegMail(notificationReq);
    console.log("mail", mail);
    if (mail.status === 1) {
      swal({
        text: `Link shared to register for CKYC Successfully.`,
        icon: "success",
      });
    }
    const MobileNo = lDto.QuoteMobileNo;
    const message = `Dear customer ,
    Greetings from Universal Sompo General Insurance!  Click here ${lMasters.var.result.manualKYCurl} to complete your KYC. Please ignore if you have completed the KYC.`;
    await SendSMS("usgi", MobileNo, message).then((smsresp) => {
      console.log("smsresp", smsresp);
    });
  };
  const handlePincode = async (e, name, i) => {
    if (IsNumeric(e.target.value) === true && e.target.value.length === 6) {
      if (name === "Perm") {
        lDto.ProposerDetails.PermanentAddress.PinCode = e.target.value;
      } else if (name === "Comm") {
        lDto.ProposerDetails.CommunicationAddress.PinCode = e.target.value;
      } else if (name === "risk") {
        lDto.ProposerDetails.RiskLocationAddress.PinCode = e.target.value;
      }

      const ProductId = 782;
      const obj = { Pincode: e.target.value };
      const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
      console.log("city", city);
      if (city.length !== 0) {
        if (name === "Perm") {
          const res = await getPincodeDetails(city[0].City_ID);
          console.log("CityDistrictValue", res);
          // lDto.ProposerDetails.PermanentAddress.District = res.city[0].CityDistrict_CD;
          lDto.ProposerDetails.PermanentAddress.District = res.district[0].District_Name;
          // lDto.ProposerDetails.PermanentAddress.State = res.state[0].mID;
          lDto.ProposerDetails.PermanentAddress.State = res.state[0].State_Name;
          // lMasters.riskCD = city;
          lMasters.permCD = city;
        } else if (name === "Comm") {
          const res = await getPincodeDetails(city[0].City_ID);
          console.log("CityDistrictValue", res);
          // lDto.ProposerDetails.CommunicationAddress.District = res.city[0].CityDistrict_CD;
          lDto.ProposerDetails.CommunicationAddress.District = res.district[0].District_Name;
          // lDto.ProposerDetails.CommunicationAddress.State = res.state[0].mID;
          lDto.ProposerDetails.CommunicationAddress.State = res.state[0].State_Name;
          // lMasters.riskCD = city;
          lMasters.commCD = city;
        } else if (name === "risk") {
          const res = await getPincodeDetails(city[0].City_ID);
          console.log("CityDistrictValue", res);
          // lDto.ProposerDetails.CommunicationAddress.District = res.city[0].CityDistrict_CD;
          lDto.ProposerDetails.RiskLocationAddress.District = res.district[0].District_Name;
          // lDto.ProposerDetails.CommunicationAddress.State = res.state[0].mID;
          lDto.ProposerDetails.RiskLocationAddress.State = res.state[0].State_Name;
          lMasters.riskCD = city;
          // lMasters.commCD = city;
        }
      } else {
        if (name === "Perm") {
          lDto.ProposerDetails.PermanentAddress[Number(i)].PinCode = "";
          lDto.ProposerDetails.PermanentAddress[Number(i)].State = "";
          lDto.ProposerDetails.PermanentAddress[Number(i)].CityDistrict = "";
          lDto.ProposerDetails.PermanentAddress[Number(i)].CityDistrictValue = "";
        }

        // if (name === "Perm") {
        //   lDto.ProposerDetails.PermanentAddress.PinCode = "";
        //   lDto.ProposerDetails.PermanentAddress.State = "";
        //   lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
        //   lDto.ProposerDetails.PermanentAddress.CityDistrictValue = "";
        // } else if (name === "Comm") {
        //   lDto.ProposerDetails.CommunicationAddress.PinCode = "";
        //   lDto.ProposerDetails.CommunicationAddress.State = "";
        //   lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
        //   lDto.ProposerDetails.CommunicationAddress.CityDistrictValue = "";
        // }
        swal({ icon: "error", text: "Enter valid Pincode" });
      }
    } else {
      // lMasters.riskCD = [];
      lMasters.permCD = [];
      lMasters.commCD = [];
      // if (name === "Risk") {
      //   lDto.InsurableItem[0].RiskLocationAddress[Number(i)].Pincode = "";
      //   lDto.InsurableItem[0].RiskLocationAddress[Number(i)].State = "";
      //   lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrict = "";
      //   lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrictValue = "";
      if (name === "Perm") {
        lDto.ProposerDetails.PermanentAddress.PinCode = "";
        lDto.ProposerDetails.PermanentAddress.State = "";
        lDto.ProposerDetails.PermanentAddress.District = "";
        lDto.ProposerDetails.PermanentAddress.CityDistrictValue = "";
      } else if (name === "Comm") {
        lDto.ProposerDetails.CommunicationAddress.PinCode = "";
        lDto.ProposerDetails.CommunicationAddress.State = "";
        lDto.ProposerDetails.CommunicationAddress.District = "";
        lDto.ProposerDetails.CommunicationAddress.CityDistrictValue = "";
      }
      swal({ icon: "error", text: "Enter valid Pincode" });
      // lDto.InsurableItem[0].OfficeAddress.CityDistrict = "";
      // lDto.InsurableItem[0].OfficeAddress.State = "";
      // lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      // lDto.ProposerDetails.PermanentAddress.State = "";
      // lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      // lDto.ProposerDetails.CommunicationAddress.State = "";
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
    // }
  };
  const handleCity = async (e, v, name) => {
    const res = await getPincodeDetails(v.City_ID);
    console.log("res", res);
    if (name === "Perm") {
      lDto.ProposerDetails.PermanentAddress.District = res.city[0].CityDistrict_CD;
      lDto.ProposerDetails.PermanentAddress.State = res.state[0].mID;
      lDto.ProposerDetails.PermanentAddress.CityDistrictValue = v.mValue;
      lDto.ProposerDetails.PermanentAddress.StateValue = res.state[0].State_Name;
      lMasters.CityDistrict.perm = v.mValue;
      lMasters.State.perm = res.state[0].State_Name;
      // lDto.ProposerDetails.PermanentAddress.CityDistrict = v.mValue;
      // lDto.ProposerDetails.PermanentAddress.State = res.state[0].State_Name;
    } else if (name === "Comm") {
      // lDto.ProposerDetails.CommunicationAddress.CityDistrict = v.mValue;
      // lDto.ProposerDetails.CommunicationAddress.State = res.state[0].State_Name;
      lDto.ProposerDetails.CommunicationAddress.District = res.city[0].CityDistrict_CD;
      lDto.ProposerDetails.CommunicationAddress.State = res.state[0].mID;
      lDto.ProposerDetails.CommunicationAddress.CityDistrictValue = v.mValue;
      lDto.ProposerDetails.CommunicationAddress.StateValue = res.state[0].State_Name;
      lMasters.CityDistrict.comm = v.mValue;
      lMasters.State.comm = res.state[0].State_Name;
    } else if (name === "risk") {
      // lDto.ProposerDetails.CommunicationAddress.CityDistrict = v.mValue;
      // lDto.ProposerDetails.CommunicationAddress.State = res.state[0].State_Name;
      lDto.ProposerDetails.RiskLocationAddress.District = res.city[0].CityDistrict_CD;
      lDto.ProposerDetails.RiskLocationAddress.State = res.state[0].mID;
      lDto.ProposerDetails.RiskLocationAddress.CityDistrictValue = v.mValue;
      lDto.ProposerDetails.RiskLocationAddress.StateValue = res.state[0].State_Name;
      lMasters.CityDistrict.comm = v.mValue;
      lMasters.State.comm = res.state[0].State_Name;
    }

    setDto({ ...lDto });
  };
  const updateckyc = async () => {
    const obj1 = {
      source: "AVO",
      uniqueTransactionNumber: lMasters.var.uniqueTransactionNumber,
      extraField1: "",
      extraField2: "",
      extraField3: "",
      extraField4: "",
      extraField5: "",
    };
    const res = await getCkycUpdateStatus(obj1);
    console.log("updateckyc", res);
    if (res.status === "success") {
      lDto.ProposerDetails.PermanentAddress.Address1 = res.result.address;
      if (res.result.pincode === "" || res.result.pincode === null) {
        lDto.ProposerDetails.PermanentAddress.Pincode = "";
        lMasters.Pincodestatus = true;
      } else {
        lDto.ProposerDetails.PermanentAddress.PinCode = res.result.pincode;
        lMasters.Pincodestatus = false;
      }
      if (lDto.CustomerType !== "Corporate") {
        const fullName = res.result.name;
        const names = fullName.split(" ");
        const firstName = names[0];
        const lastName = names.slice(1).join(" ");
        lDto.ProposerDetails["First Name"] = firstName;
        lDto.ProposerDetails["Last Name"] = lastName;
        lDto.ProposerDetails.AadharName = fullName;
      } else {
        lDto.ProposerDetails["First Name"] = res.result.name;
      }
      if (res.result.email === null || res.result.email === "") {
        lDto.ProposerDetails.EmailID = res.result.email;
      }
      if (res.result.uploadedDocument === "CIN") {
        lDto.ProposerDetails.CINNumber = res?.result?.idNo;
      }
      if (res.result.uploadedDocument === "GSTIN") {
        lDto.ProposerDetails.GSTNumber = res.result.idNo;
      }
      if (res.result.dob === null) {
        lMasters.flags.dob = true;
        lDto.ProposerDetails.DateofBirth = res.result.ckycDate;
      } else {
        lMasters.flags.dob = true;
        lDto.ProposerDetails.DateofBirth =
          lDto.CustomerType === "Individual" ? res.result.dob : formatDateKYC(res.result.dob);
      }
      if (res.result.maskedAadhaarNumber !== "") {
        lDto.ProposerDetails.AadharID = res.result.maskedAadhaarNumber.substring(
          res.result.maskedAadhaarNumber.length - 4
        );
      }
      if (res.result.mobileNumber === null) {
        lDto.ProposerDetails.MobileNumber = res.result.mobileNumber;
        lDto.ProposerDetails.AadharMobileNo = lDto.QuoteMobileNo;
      }
      if (res.result.pincode.length === 6) {
        const ProductId = 782;
        const obj = { Pincode: res.result.pincode };
        const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
        lMasters.permCD = city;
        const res2 = await getPincodeDetails(city[0].City_ID);
        lDto.ProposerDetails.PermanentAddress.District = res2.district[0].District_Name;
        lDto.ProposerDetails.PermanentAddress.State = res2.state[0].State_Name;
      } else {
        lMasters.permCD = [];
        lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
        lDto.ProposerDetails.PermanentAddress.State = "";
      }
      if (res.result.pan === "" || res.result.pan === null) {
        lDto.ProposerDetails.PanNo = res.result.pan;
      }
      if (res.result.pincode === "") {
        lMasters.flags.pincodeflag = true;
      } else {
        lMasters.flags.pincodeflag = false;
      }
      lDto.CkycStatus = res.status;
      lDto.CkycDetails = res;
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
    // await callUpdateQuoteMethod(lDto);
    // await postRequest(`Policy/UpdateProposalDetails`, lDto);
  };

  const handleSendOTP = () => {
    if (lDto.QuoteEmail === "") {
      swal({
        icon: "error",
        text: "Please enter email ID",
      });
    } else {
      lMasters.startCounterFlag = true;
      const sendOtp = {
        name: "",
        otp: "1234",
        email: lDto.QuoteEmail,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: lDto.QuoteMobileNo,
        sendSms: true,
        isBerry: false,
        client: process.env.REACT_APP_Client,
      };

      getOTP(sendOtp).then((res) => {
        if (res.status === 1) {
          lMasters.flags.status = true;
        } else {
          lMasters.flags.status = false;
        }
      });

      setMasters({ ...lMasters });
    }
  };

  const [dispatch] = useDataController();
  const handleVerifyOTP = () => {
    if (lDto.ProposerDetails.ConsentOTP === "") {
      swal({ icon: "error", text: "Please enter OTP" });
    } else {
      const verifyOTP = {
        otp: lDto.ProposerDetails.ConsentOTP,
        email: lDto.QuoteEmail,
        mobileNumber: lDto.QuoteMobileNo,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      GetOTP(dispatch, verifyOTP).then((res) => {
        console.log("res", res);
        if (res !== null) {
          if (res.status === 1) {
            lMasters.flags.otpflag = true;
            lMasters.startCounterFlag = false;
            setMasters({ ...lMasters });
            swal({ icon: "success", text: "OTP verified successfully" });
            swal({ icon: "success", text: "OTP verified successfully" });
          } else {
            lMasters.flags.otpflag = false;
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          lMasters.flags.otpflag = false;
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
      setMasters({ ...lMasters });
    }
  };
  useEffect(() => {
    let timer;
    if (lMasters.counter > 0 && lMasters.startCounterFlag) {
      timer = setTimeout(() => {
        lMasters.counter -= 1;
        lMasters.flags.sendOtpFlag = false;
        setMasters({ ...lMasters });
      }, 1000);
    }
    if (lMasters.counter === 0) {
      lMasters.counter = 30;
      lMasters.startCounterFlag = false;
      lMasters.flags.timerFlag = true;
      lMasters.flags.status = false;
      setMasters({ ...lMasters });
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [lMasters.counter, lMasters.startCounterFlag]);

  const onSameAddress = (e) => {
    lDto.ProposerDetails.CommunicationSameAsPermanent = e.target.value;
    if (e.target.value === "Yes") {
      // lDto.ProposerDetails.CommunicationAddress.PlotNo =
      //   lDto.ProposerDetails.PermanentAddress.PlotNo;
      lDto.ProposerDetails.CommunicationAddress.Address1 =
        lDto.ProposerDetails.PermanentAddress.Address1;
      lDto.ProposerDetails.CommunicationAddress.Address2 =
        lDto.ProposerDetails.PermanentAddress.Address2;
      lDto.ProposerDetails.CommunicationAddress.PinCode =
        lDto.ProposerDetails.PermanentAddress.PinCode;
      lDto.ProposerDetails.CommunicationAddress.District =
        lDto.ProposerDetails.PermanentAddress.District;
      lDto.ProposerDetails.CommunicationAddress.NearestLandmark =
        lDto.ProposerDetails.PermanentAddress.NearestLandmark;
      lDto.ProposerDetails.CommunicationAddress.State = lDto.ProposerDetails.PermanentAddress.State;
      lDto.ProposerDetails.CommunicationAddress.Country =
        lDto.ProposerDetails.PermanentAddress.Country;
    } else {
      lDto.ProposerDetails.CommunicationAddress.PlotNo = "";
      lDto.ProposerDetails.CommunicationAddress.NearestLandmark = "";
      lDto.ProposerDetails.CommunicationAddress.Address1 = "";
      lDto.ProposerDetails.CommunicationAddress.Address2 = "";
      lDto.ProposerDetails.CommunicationAddress.PinCode = "";
      lDto.ProposerDetails.CommunicationAddress.District = "";
      lDto.ProposerDetails.CommunicationAddress.State = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const onRiskAddress = (e) => {
    lDto.ProposerDetails.RiskaddSameAsCommuniadd = e.target.value;
    if (e.target.value === "Yes") {
      lDto.ProposerDetails.RiskLocationAddress.PlotNo =
        lDto.ProposerDetails.CommunicationAddress.PlotNo;
      lDto.ProposerDetails.RiskLocationAddress.Address1 =
        lDto.ProposerDetails.CommunicationAddress.Address1;
      lDto.ProposerDetails.RiskLocationAddress.Address2 =
        lDto.ProposerDetails.CommunicationAddress.Address2;
      lDto.ProposerDetails.RiskLocationAddress.NearestLandmark =
        lDto.ProposerDetails.CommunicationAddress.NearestLandmark;
      lDto.ProposerDetails.RiskLocationAddress.PinCode =
        lDto.ProposerDetails.CommunicationAddress.PinCode;
      lDto.ProposerDetails.RiskLocationAddress.District =
        lDto.ProposerDetails.CommunicationAddress.District;
      lDto.ProposerDetails.RiskLocationAddress.State =
        lDto.ProposerDetails.CommunicationAddress.State;
      lDto.ProposerDetails.RiskLocationAddress.Country =
        lDto.ProposerDetails.CommunicationAddress.Country;
    } else {
      lDto.ProposerDetails.RiskLocationAddress.PlotNo = "";
      lDto.ProposerDetails.RiskLocationAddress.Address1 = "";
      lDto.ProposerDetails.RiskLocationAddress.Address2 = "";
      lDto.ProposerDetails.RiskLocationAddress.PinCode = "";
      lDto.ProposerDetails.RiskLocationAddress.District = "";
      lDto.ProposerDetails.RiskLocationAddress.NearestLandmark = "";
      lDto.ProposerDetails.RiskLocationAddress.State = "";
      lDto.ProposerDetails.RiskLocationAddress.Country = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handleProposerMasters = (e, v, name) => {
    if (name === "Salutation") {
      lMasters.proposerSal = v.mValue;
      lDto.ProposerDetails.Salutation = v.mValue;
      if (v.mValue === "MR. ") {
        lMasters.proposerGender = "Male";
        lDto.ProposerDetails.NomineeGender = "Male";
      } else if (v.mValue === "MS. " || v.mValue === "MRS. ") {
        lMasters.proposerGender = "Female";
        lDto.ProposerDetails.NomineeGender = "Female";
      } else {
        lMasters.proposerGender = "";
        lDto.ProposerDetails.NomineeGenderr = "";
      }
    } else if (name === "Gender") {
      lMasters.proposerGender = v.mValue;
      lDto.ProposerDetails.NomineeGender = v.mValue;
    }

    setMasters({ ...lMasters });

    setDto({ ...lDto });
  };

  const onCalculation = (e, value, name) => {
    // const today = new Date(lMasters.PolicyStartDate);
    // const days = DaysInMonth(today, v.mValue);
    if (name === "Carpet Area (In Sq.Meter)") {
      lMasters.flags.editval = false;
      lDto.InsurableItem[0].RiskItems[0].CarpetAreainsqmts = e.target.value;
    } else if (name === "Policy Tenure") {
      lMasters.flags.editval = false;
      lDto.ProposerDetails.PolicyTenure = value.mValue;
    } else if (name === "Building Sum Insured") {
      lMasters.flags.editval = false;
      lDto.InsurableItem[0].RiskItems[0].ResidentialStructureSumInsured = value.mValue;
      // const sum = (Number(value.mValue) * 20) / 100;
      const sum = Number(value.mValue) * 0.2;
      lDto.InsurableItem[0].RiskItems[0].Housekeeping = sum;
      lDto.ProposerDetails.SumInsured = sum + Number(value.mValue);
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });
  const handlePolDate = (e) => {
    const enteredDate = new Date(e);
    enteredDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(enteredDate.getTime())) {
      // swal("Invalid Date", "Please enter a valid date", "error");
      swal({ icon: "error", text: "Please enter a valid date" });
      lDto.PolicyStartDate = "";
      lDto.PStartDate = "";
      lDto.ProposerDetails.PolicyEndDate = "";
      lDto.PEndDate = "";
      setDto({ ...lDto });
      // return;
    } else if (lDto.ProposerDetails.PolicyTenure === "1Year") {
      lDto.PolicyStartDate = formatPolDate(e);
      lDto.PStartDate = formatDateKYC(lDto.PolicyStartDate);
      const psd1 = formatPolDate(e).split("-");
      const nod1 = addDays(`${psd1[1]}-${psd1[2]}-${psd1[0]}`, 364).split("-");
      lDto.PolicyEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
      lDto.PEndDate = formatDateKYC(lDto.PolicyEndDate);
      setDto({ ...lDto });
    } else if (lDto.ProposerDetails.PolicyTenure === "10Year") {
      lDto.PolicyStartDate = formatPolDate(e);
      lDto.PStartDate = formatDateKYC(lDto.PolicyStartDate);
      const psd1 = formatPolDate(e).split("-");
      const nod1 = addDays(`${psd1[1]}-${psd1[2]}-${psd1[0]}`, 3640).split("-");
      lDto.PolicyEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
      lDto.PEndDate = formatDateKYC(lDto.PolicyEndDate);
      setDto({ ...lDto });
    }
  };

  const onHome = () => {
    lMasters.Productflag = false;
    setMasters({ ...lMasters });
  };
  const onBuyNow = async () => {
    if (lMasters.flags.editval === false) {
      swal({
        icon: "error",
        text: "Please Click On Calculate Premium",
      });
    } else {
      await callUpdateQuoteMethod(lDto);
      lMasters.flags.BuyNowflag = true;
      setMasters({ ...lMasters });
    }
  };
  const onPrpslback = async () => {
    lMasters.flags.BuyNowflag = false;
    setMasters({ ...lMasters });
  };

  const onclback = async () => {
    lMasters.Proceedfalg = false;
    setMasters({ ...lMasters });
  };

  const onPayback = async () => {
    lMasters.flags.PayNowflag = false;
    setMasters({ ...lMasters });
  };

  const onpayNow = async () => {
    const mdto = { ...lDto };
    if (
      lDto.PolicyStartDate === "" ||
      lDto.PolicyEndDate === "" ||
      lDto.ProposerDetails.Salutation === "" ||
      // lDto.ProposerDetails.PermanentAddress.PlotNo === "" ||
      lDto.ProposerDetails.PermanentAddress.Address1 === "" ||
      lDto.ProposerDetails.CommunicationAddress.PlotNo === "" ||
      lDto.ProposerDetails.CommunicationAddress.Address1 === "" ||
      lDto.ProposerDetails.CommunicationAddress.PinCode === "" ||
      lDto.ProposerDetails.CommunicationAddress.District === "" ||
      lDto.ProposerDetails.RiskLocationAddress.PlotNo === "" ||
      lDto.ProposerDetails.RiskLocationAddress.Address1 === "" ||
      lDto.ProposerDetails.RiskLocationAddress.PinCode === "" ||
      lDto.ProposerDetails.RiskLocationAddress.District === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill required fields",
      });
    } else if (lMasters.flags.otpflag === false) {
      swal({
        icon: "error",
        text: "Please verify OTP",
      });
    } else if (
      lDto.ProposerDetails.Consentcheckbox1 === false ||
      lDto.ProposerDetails.Consentcheckbox2 === false
    ) {
      swal({
        icon: "error",
        text: "Please check the Proposal Consent checkbox",
      });
    } else {
      // setBackDropFlag(true);
      objectPath.del(mdto, "ProposalConsent");
      if (lDto.proposalNumber === "" || lDto.proposalNumber === undefined) {
        const res = await calculateProposal(mdto);
        console.log("res", res);
        lDto.proposalNumber = res.data.proposalNumber;
        lDto.ProposalNo = res.data.proposalNumber;
        lMasters.SavePymtDTO.proposalNo = res.data.proposalNumber;
        setDto({ ...lDto });
        setMasters({ ...lMasters });
      } else {
        await postRequest(`Policy/UpdateProposalDetails`, lDto);
      }
      if (lDto && lDto.proposalNumber && lDto.proposalNumber !== "") {
        const res1 = await fetchPaymentURL(
          782,
          lDto.proposalNumber,
          lDto.PremiumDetails["Total with Tax"]
        );
        lDto.TransactionID = res1.transactionID;
        lMasters.SavePymtDTO.paymentDetailsDTO.transactionNo = res1.transactionID;
        lMasters.paymentRefNo = res1.paymentRefNo;
        lDto.PaymentDetails.paymentRefNo = res1.paymentRefNo;
        lMasters.bodyData.firstname = lDto.ProposerDetails["First Name"];
        lMasters.bodyData.email = lDto.QuoteEmail;
        lMasters.bodyData.phone = lDto.QuoteMobileNo;
        lMasters.bodyData.txnid = res1.transactionID;
        lMasters.bodyData.amount = String(
          Math.round(Number(lDto.PremiumDetails["Total with Tax"]))
        );
        lMasters.bodyData.surl = res1.surl;
        lMasters.bodyData.furl = res1.furl;
        setDto({ ...lDto });
        setMasters({ ...lMasters });
      }
      if (lDto.CkycStatus === "success") {
        const proposerMail = await proposerEamil(lDto.proposalNumber, lDto.QuoteEmail);
        console.log("proposerMail", proposerMail);
        const Message = `Dear Customer,Based on your requirements, Employees Compensation Insurance Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
        await SendSMS("usgi", lDto.QuoteMobileNo, Message).then((smsResp) => {
          console.log("1234567890", smsResp);
        });
        swal({
          text: `Email Send Successfully`,
          icon: "success",
        });
        await callUpdateQuoteMethod(lDto);
        lMasters.flags.PayNowflag = true;
        lMasters.flags.BuyNowflag = true;
        setMasters({ ...lMasters });
      }
    }
  };
  const handleProcced = async () => {
    if (lMasters.flags.Kyc === false) {
      swal({
        icon: "error",
        text: "Please initiate the ckyc",
      });
    } else if (lDto.CkycStatus === "failure") {
      swal({ icon: "error", text: "CKYC is Failure" });
    } else if (lDto.QuoteNo === "" || lDto.QuoteNo === undefined) {
      const quotationDTO = await callSaveQuoteMethod(lDto);
      console.log("quotationDTO", quotationDTO);
      lDto["Quotation No"] = quotationDTO.data.quotation.quoteNo;
      lDto.QuoteNo = quotationDTO.data.quotation.quoteNo;
      setDto({ ...lDto });
      // const ind = lMasters.flags.activeTab;
      // console.log("index", ind);
      // lMasters.flags.CalPreBtn = true;
      // lMasters.flags.CalPreSuc = true;
      // lMasters.Quotes[ind].TotalSI = SplitingNumber(res.finalResult.TotalSI);
      lMasters.Proceedfalg = true;
    } else {
      await callUpdateQuoteMethod(lDto);
      lMasters.Proceedfalg = true;
    }

    setMasters({ ...lMasters });
  };

  const handleCalculatePremium = async () => {
    if (
      lDto.InsurableItem[0].RiskItems[0].CarpetAreainsqmts === "" ||
      lDto.ProposerDetails.PolicyTenure === "" ||
      lDto.InsurableItem[0].RiskItems[0].ResidentialStructureSumInsured === "" ||
      lDto.InsurableItem[0].RiskItems[0].Housekeeping === "" ||
      lDto.ProposerDetails.SumInsured === ""
    ) {
      swal({ icon: "error", text: "Please fill required fields" });
    } else {
      lMasters.Quotationflag = true;
      const res1 = await GenericApi("QRBGR", "BGRQRCODEPremiumAPI", lDto);
      lDto.PremiumDetails.NetPremium = res1.finalResult.Premium;
      lDto.PremiumDetails["Net Premium"] = res1.finalResult.Premium;
      lDto.PremiumDetails.CGST = res1.finalResult.GST;
      lDto.PremiumDetails.GST = res1.finalResult.GST;
      lDto.PremiumDetails.TotalPremium = res1.finalResult.TotalPremium;
      lDto.PremiumDetails["Total with Tax"] = res1.finalResult.TotalPremium;
      lMasters.flags.editval = true;
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const handleCustType = (e, v) => {
    if (v === "Individual") {
      lDto.CustomerType = "Individual";
      lDto.QuoteEmail = "";
      lDto.QuoteMobileNo = "";
      lDto.ProposerDetails.DateofBirth = "";
      lDto.ProposerDetails.PanNo = "";
      setDto({ ...lDto });
    } else if (v === "Corporate") {
      lDto.CustomerType = "Corporate";
      lDto.QuoteEmail = "";
      lDto.ProposerDetails.DateofBirth = "";
      lDto.QuoteMobileNo = "";
      lDto.ProposerDetails.PanNo = "";
      setDto({ ...lDto });
    }
  };
  const handleSetValueParms = (e, value) => {
    lDto.ProposerDetails.CKYCParam = value.mValue;
    setDto({ ...lDto });
    if (value.mValue !== "PAN Number") {
      lDto.ProposerDetails.AadharID = "";
      lDto.ProposerDetails.AadharMobileNo = "";
      lDto.ProposerDetails.AadharGender = "";
      lDto.ProposerDetails.AadharName = "";
      lDto.ProposerDetails.DateofBirth = "";
    } else {
      lDto.ProposerDetails.DateofBirth = "";
      lDto.ProposerDetails.PanNo = "";
    }
    setDto({ ...lDto });
  };

  const initiateCkyc = async () => {
    if (lDto?.CustomerType === "Individual") {
      const dobString = lDto.ProposerDetails.DateofBirth;
      const [day, month, year] = dobString.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      const Age = AgeCalculator1(date.toLocaleDateString("en-ZA"));
      if (Age < 18) {
        lMasters.flags.dob = true;
      } else {
        lMasters.flags.dob = false;
      }
      setMasters({ ...lMasters });
    } else {
      lMasters.flags.dob = false;
      setMasters({ ...lMasters });
    }
    if (
      lDto.CustomerType === "Individual" &&
      lDto.ProposerDetails.CKYCParam === "PAN Number" &&
      lDto.ProposerDetails.PanNo === ""
    ) {
      swal({
        icon: "error",
        text: `Please Provide Pan Number before Initiating KYC `,
      });
    }
    if (lMasters.flags.dob === true) {
      swal({
        icon: "error",
        text: "Age cannot be less than 18 Years",
      });
    } else if (lDto.CustomerType === "Individual" && lDto.ProposerDetails.CKYCParam === "") {
      swal({
        icon: "error",
        text: "Please Fill Select ID Type",
      });
    } else if (
      lDto.CustomerType === "Corporate" &&
      lDto.ProposerDetails.PanNo === "" &&
      lDto.ProposerDetails.GSTNumber === "" &&
      lDto.ProposerDetails.CINNumber === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill the Ckyc Details",
      });
    } else if (
      lDto.CustomerType === "Individual" &&
      lDto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
      (lDto.ProposerDetails.AadharID === "" ||
        lDto.ProposerDetails.DateofBirth === "" ||
        lDto.QuoteMobileNo === "" ||
        lDto.ProposerDetails.AadharName === "" ||
        lDto.ProposerDetails.AadharGender === "")
    ) {
      swal({
        icon: "error",
        text: "Please fill the Ckyc Details",
      });
    } else if (lDto.CustomerType === "Corporate" && lDto.ProposerDetails.DateofBirth === "") {
      swal({
        icon: "error",
        text: "Please fill the Ckyc Details",
      });
    } else if (lDto.CustomerType === "Individual" && lDto.ProposerDetails.DateofBirth === "") {
      swal({
        icon: "error",
        text: "Please fill the Date of Birth",
      });
    } else if (
      (lDto.CustomerType === "Individual" || lDto.CustomerType === "Corporate") &&
      lDto.QuoteMobileNo === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill the Mobile Nummber",
      });
    } else if (
      (lDto.CustomerType === "Individual" || lDto.CustomerType === "Corporate") &&
      lDto.QuoteEmail === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill the Email ID",
      });
    } else {
      const objAadhar = {
        source: "AVO",
        customerType: lDto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo: lDto.ProposerDetails.AadharID,
        idType: "AADHAAR",
        dob: lDto.ProposerDetails.DateofBirth,
        mobileNo: lDto.ProposerDetails.AadharMobileNo,
        pincode: "",
        ckycNo: "",
        extraField1: lDto.ProposerDetails.AadharName,
        extraField2: lDto.ProposerDetails.AadharGender === "Female" ? "F" : "M",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };

      const obj1 = {
        source: "AVO",
        customerType: lDto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "",
        idNo:
          lDto.CustomerType === "Individual"
            ? lDto.ProposerDetails.PanNo
            : lDto.CustomerType === "Corporate" &&
              (lDto.ProposerDetails.PanNo ||
                lDto.ProposerDetails.GSTNumber ||
                lDto.ProposerDetails.CINNumber),

        idType:
          lDto.CustomerType === "Individual"
            ? lDto.ProposerDetails.PanNo && "PAN"
            : lDto.CustomerType === "Corporate" &&
              ((lDto.ProposerDetails.PanNo && "PAN") ||
                (lDto.ProposerDetails.GSTNumber && "GSTIN") ||
                (lDto.ProposerDetails.CINNumber && "CIN")),

        dob: lDto.ProposerDetails.DateofBirth,
        mobileNo: "",
        pincode: "",
        ckycNo: "",
        extraField1: "",
        extraField2: "",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      const Obj = lDto.ProposerDetails.CKYCParam === "Aadhaar Number" ? objAadhar : obj1;
      const res1 = await getCkycDetails(1356, Obj);
      lMasters.flags.Kyc = true;
      lDto.CkycStatus = res1.status;
      lDto.CkycDetails = res1;
      if (res1.status === "success") {
        swal({
          text: `CKYC Successfull.`,
          icon: "success",
        });
        lMasters.var = { ...lMasters.var, ...res1 };
        lDto.ProposerDetails.PermanentAddress.Address1 = res1.result.address1;
        lDto.ProposerDetails.PermanentAddress.Address2 = res1.result.address2;
        lDto.ProposerDetails.PermanentAddress.PinCode = res1.result.pincode;
        lDto.ProposerDetails["First Name"] = res1.result.firstName;
        lDto.ProposerDetails["Last Name"] = res1.result.lastName;
        if (res1.result.email !== null || res1.result.email !== "") {
          lDto.ProposerDetails.EmailID = res1.result.email;
        }
        if (res1.result.dob !== null) {
          lMasters.flags.dob = true;
          lDto.ProposerDetails.DateofBirth = res1.result.dob;
        } else {
          lMasters.flags.dob = true;
        }
        if (res1.result.pincode === "") {
          lMasters.flags.pincodeflag = true;
        } else {
          lMasters.flags.pincodeflag = false;
        }
        if (res1.result.mobileNumber !== null) {
          lDto.ProposerDetails.MobileNumber = res1.result.mobileNumber;
        }
        if (res1.result.pincode.length === 6) {
          const ProductId = 782;
          const obj = { Pincode: res1.result.pincode };
          lMasters.Pincodestatus = false;
          const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
          lMasters.permCD = city;
          const res = await getPincodeDetails(city[0].City_ID);
          lDto.ProposerDetails.PermanentAddress.District = res.district[0].District_Name;
          lDto.ProposerDetails.PermanentAddress.State = res.state[0].State_Name;
        } else {
          lMasters.permCD = [];
          lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
          lDto.ProposerDetails.PermanentAddress.State = "";
        }
      }
      if (res1.status === "failure") {
        swal({
          text: `CKYC Failure.`,
          icon: "error",
        });
        lMasters.flags.failure = true;
        lMasters.var = { ...lMasters.var, ...res1 };
      }
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const Data = {
    Home: [
      {
        type: "Custom",
        visible: lMasters.Productflag,
        return: (
          <div>
            {/* Your existing code... */}

            {/* {matches && ( */}
            <table
              style={{
                borderCollapse: "collapse",
                width: matches ? "70vw" : "100%",

                margin: "auto",
                fontSize: "13px",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ border: "1px solid lightgray", height: "20px", padding: "8px" }}>
                    <b>Description</b>
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      height: "20px",
                      padding: "8px",
                      paddingLeft: "10px",
                    }}
                  >
                    <b>Tool Tip</b>
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid lightgray", height: "20px", padding: "8px" }}>
                    Carpet Area (in sq. Meter.)
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      height: "20px",
                      padding: "8px",
                      paddingLeft: "10px",
                    }}
                  >
                    The net usable floor area of an apartment, excluding the area covered by the
                    external walls,areas under services,shafts,balcony.
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid lightgray", height: "20px", padding: "8px" }}>
                    Home Building
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      height: "20px",
                      padding: "8px",
                      paddingLeft: "10px",
                    }}
                  >
                    This represents value of Building (incl. anything which is attached to the
                    building)
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid lightgray", height: "20px", padding: "8px" }}>
                    Home Contents
                    <br />
                    (Excluding Jewllery and Valuables)
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      height: "20px",
                      padding: "8px",
                      paddingLeft: "10px",
                    }}
                  >
                    This represents value of items other than Building.
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid lightgray", height: "20px", padding: "8px" }}>
                    Policy start Date
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      height: "20px",
                      padding: "8px",
                      paddingLeft: "10px",
                    }}
                  >
                    Coverage will start from this date
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid lightgray", height: "20px", padding: "8px" }}>
                    Policy End Date
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      height: "20px",
                      padding: "8px",
                      paddingLeft: "10px",
                    }}
                  >
                    coverage will end on this date
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid lightgray", height: "20px", padding: "8px" }}>
                    Risk location address
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      height: "20px",
                      padding: "8px",
                      paddingLeft: "10px",
                    }}
                  >
                    Address of Home premises which you want to insure
                  </td>
                </tr>
              </tbody>
            </table>
            {/* )} */}
            {/* Your existing code... */}
          </div>
        ),
      },
      {
        type: "Typography",
        visible: true,
        spacing: 9.5,
        label: "",
      },
      {
        type: "Button",
        label: "Go Home",
        visible: lMasters.Productflag,
        variant: "contained",
        onClick: onHome,
        spacing: 2.5,
      },
    ],
    ECkyc: [
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: { label: "Customer Type", labelVisible: true },
        radioList: [
          {
            value: "Individual",
            label: "Individual",
            disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
          },
          {
            value: "Corporate",
            label: "Corporate",
            disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
          },
        ],
        path: "CustomerType",
        defaultValue: "Individual",
        spacing: 12,
        validationId: 1,
        customOnChange: (e, v) => handleCustType(e, v),
      },

      {
        type: "Input",
        label: "CKYC Status",
        visible: lDto?.CustomerType === "Individual" || lDto?.CustomerType === "Corporate",
        disabled: true,
        // value: lDto.CkycStatus ,
        value: lDto.CkycStatus,
        spacing: 3,
      },

      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "",
      },

      {
        type: "AutoComplete",
        label: "Select ID Type",
        visible: lDto.CustomerType === "Individual",
        required: lDto.CustomerType === "Individual",
        validationId: 1,
        options: CkycParams,
        customOnChange: handleSetValueParms,
        disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
        path: `ProposerDetails.CKYCParam`,
        spacing: 3,
      },

      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "",
      },

      {
        type: "Input",
        label: "PAN Number",
        onBlurFuncs: ["IsPan"],
        visible:
          lDto?.ProposerDetails?.CKYCParam === "PAN Number" || lDto.CustomerType === "Corporate",
        // required:
        //   lDto?.ProposerDetails?.CKYCParam === "PAN Number" || lDto.CustomerType === "Corporate",
        spacing: 3,
        path: `ProposerDetails.PanNo`,
        validationId: 1,
        InputProps: { maxLength: 10 },
        disabled:
          lDto.ProposerDetails.GSTNumber ||
          lDto.ProposerDetails.CINNumber ||
          lDto.CkycStatus === "success" ||
          lDto.CkycStatus === "failure",
      },
      {
        type: "Input",
        label: "GSTIN Number",
        visible: lDto.CustomerType === "Corporate",
        onBlurFuncs: ["IsGstNo"],
        spacing: 3,
        path: `ProposerDetails.GSTNumber`,
        disabled:
          lDto.ProposerDetails.PanNo ||
          lDto.ProposerDetails.CINNumber ||
          lDto.CkycStatus === "success",
      },
      {
        type: "Input",
        // onBlurFuncs: [IsCINNo],
        label: "CIN Number",
        onBlurFuncs: [IsCINNo],
        spacing: 3,
        visible: lDto.CustomerType === "Corporate",
        path: `ProposerDetails.CINNumber`,
        disabled:
          lDto.ProposerDetails.GSTNumber ||
          lDto.ProposerDetails.PanNo ||
          lDto.CkycStatus === "success",
      },

      {
        type: "Input",
        label: "Enter last 4 digits of Aadhar",
        spacing: 2.5,
        visible:
          lDto?.ProposerDetails?.CKYCParam === "Aadhaar Number" &&
          lDto.CustomerType !== "Corporate",
        required: lDto.CustomerType === "Individual",
        path: `ProposerDetails.AadharID`,
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 4 },
        validationId: 1,
        disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
      },

      {
        type: "MDDatePicker",
        required: true,
        validationId: 1,
        spacing: 2.5,
        visible:
          lDto?.ProposerDetails?.CKYCParam === "PAN Number" ||
          lDto?.ProposerDetails?.CKYCParam === "Aadhaar Number" ||
          lDto.CustomerType === "Corporate",
        label: lDto.CustomerType === "Corporate" ? "Date of Incorporation" : "Date of Birth",
        allowInput: true,
        maxDate: new Date(),
        disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
        dateFormat: "d-m-Y",
        path: `ProposerDetails.DateofBirth`,
      },

      {
        type: "Input",
        label: "Mobile Number",
        visible:
          lDto?.ProposerDetails?.CKYCParam === "PAN Number" ||
          lDto?.ProposerDetails?.CKYCParam === "Aadhaar Number" ||
          lDto.CustomerType === "Corporate",
        path: `QuoteMobileNo`,
        spacing: 2.5,
        required: true,
        validationId: 1,
        onChangeFuncs: ["IsNumeric"],
        onBlurFuncs: ["IsMobileNumber"],
        InputProps: { maxLength: 10 },
      },

      {
        type: "Input",
        label: "Full Name as per Aadhar",
        spacing: 2.5,
        visible:
          lDto?.ProposerDetails?.CKYCParam === "Aadhaar Number" &&
          lDto.CustomerType !== "Corporate",
        path: `ProposerDetails.AadharName`,
        onChangeFuncs: ["IsAlphaSpace"],
        required: lDto.CustomerType === "Individual",
        validationId: 1,
        InputProps: { maxLength: 50 },
        disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
      },

      {
        type: "AutoComplete",
        label: "Gender",
        spacing: 2.5,
        visible:
          lDto?.ProposerDetails?.CKYCParam === "Aadhaar Number" &&
          lDto.CustomerType !== "Corporate",
        required: lDto.CustomerType !== "Corporate",
        options: lMasters?.Gender,
        validationId: 1,
        path: `ProposerDetails.AadharGender`,
      },

      // {
      //   type: "Input",
      //   required: true,
      //   spacing: 3,
      //   label: "Email",
      //   visible:  lDto?.CustomerType === "Individual"&&
      //   lDto?.ProposerDetails?.CKYCParam === "Aadhaar Number" || lDto?.ProposerDetails?.CKYCParam === "PAN Number" &&
      //   lDto.CustomerType !== "Corporate",
      //   allowInput: true,
      //   maxDate: new Date(),
      //   dateFormat: "d-m-Y",
      //   path: `QuoteEmail`,
      // },

      {
        type: "Input",
        required: true,
        spacing: 2.5,
        label: "Email",
        visible:
          (lDto?.CustomerType === "Individual" &&
            (lDto?.ProposerDetails?.CKYCParam === "Aadhaar Number" ||
              lDto?.ProposerDetails?.CKYCParam === "PAN Number")) ||
          lDto?.CustomerType === "Corporate",
        allowInput: true,
        validationId: 1,
        maxDate: new Date(),
        dateFormat: "d-m-Y",
        onBlurFuncs: ["IsEmail"],
        path: `QuoteEmail`,
      },

      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "",
      },

      {
        type: "ValidationControl",
        subType: "Button",
        label: "Initiate C-kyc",
        visible: true,
        variant: "contained",
        onClick: initiateCkyc,
        validationId: 1,
        disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
        spacing: 2.5,
      },

      {
        type: "Button",
        label: "Update Status",
        visible: true,
        variant: "contained",
        spacing: 2.5,
        disabled:
          (lDto.CustomerType !== "Corporate" &&
            !lDto?.ProposerDetails?.PanNo &&
            !lDto?.ProposerDetails?.AadharID === "" &&
            // lDto.ProposerDetails.DOB === "" &&
            !lDto?.ProposerDetails?.AadharMobileNo === "" &&
            !lDto?.ProposerDetails?.AadharName === "" &&
            !lDto?.ProposerDetails?.AadharGender === "") ||
          !lDto?.ProposerDetails?.DateofBirth ||
          lDto.CkycStatus === "success" ||
          lDto.CkycStatus === "",
        onClick: updateckyc,
      },

      {
        type: "Button",
        label: "Send Email/SMS",
        visible: true,
        variant: "contained",

        disabled:
          (lDto.CustomerType !== "Corporate" &&
            !lDto?.ProposerDetails?.PanNo &&
            !lDto?.ProposerDetails?.AadharID === "" &&
            // lDto.ProposerDetails.DOB === "" &&
            !lDto?.ProposerDetails?.AadharMobileNo === "" &&
            !lDto?.ProposerDetails?.AadharName === "" &&
            !lDto?.ProposerDetails?.AadharGender === "") ||
          !lDto?.ProposerDetails?.DateofBirth ||
          lDto.CkycStatus === "success" ||
          lDto.CkycStatus === "",
        onClick: sendMail,
        spacing: 2.5,
      },
      {
        type: "Typography",
        visible: true,
        spacing: 10.5,
        label: "",
      },
      {
        type: "Typography",
        visible: true,
        spacing: 9,
        label: "",
      },

      {
        type: "Button",
        label: "Proceed",
        visible: lMasters.Productflag === false,
        variant: "contained",
        spacing: 2.5,
        validationId: 1,
        onClick: handleProcced,
      },
    ],
    PlanDetails: [
      {
        type: "Input",
        label: "Carpet Area (In Sq.Meter)",
        path: `InsurableItem.0.RiskItems.0.CarpetAreainsqmts`,
        spacing: 2.5,
        InputProps: { maxLength: 10 },
        onChangeFuncs: ["IsNumeric"],
        required: true,
        validationId: 1,
        customOnChange: (e, v) => onCalculation(e, v, "Carpet Area (In Sq.Meter)"),
        visible: true,
      },

      {
        type: "AutoComplete",
        label: "Policy Tenure",
        visible: true,
        validationId: 1,
        options: lMasters?.Tenure,
        customOnChange: (e, v) => onCalculation(e, v, "Policy Tenure"),
        path: `ProposerDetails.PolicyTenure`,
        spacing: 2.5,
        required: true,
      },

      {
        type: "AutoComplete",
        label: "Building Sum Insured",
        visible: true,
        validationId: 1,
        options: lMasters?.BuildingSum,
        path: `InsurableItem.0.RiskItems.0.ResidentialStructureSumInsured`,
        spacing: 2.5,
        customOnChange: (e, v) => onCalculation(e, v, "Building Sum Insured"),
        required: true,
      },

      {
        type: "Input",
        label: "Home Content(Excluding Jeweelary and valuable) SI",
        spacing: 2.5,
        validationId: 1,
        disabled: true,
        path: `InsurableItem.0.RiskItems.0.Housekeeping`,
        visible: true,
      },

      {
        type: "Input",
        label: "Total Sum Insured",
        spacing: 2.5,
        disabled: true,
        required: true,
        validationId: 1,
        path: `ProposerDetails.SumInsured`,
        visible: true,
      },

      {
        type: "Typography",
        spacing: 9,
        visible: true,
      },

      {
        type: "Typography",
        spacing: 9,
        visible: true,
      },
      {
        type: "ValidationControl",
        subType: "Button",
        label: "Calculate Premium",
        onClick: handleCalculatePremium,
        variant: "contained",
        spacing: 3,
        visible: true,
        validationId: 1,
      },
      {
        type: "Custom",
        visible: lMasters.Quotationflag === true,
        spacing: 12,
        return: (
          <div>
            <MDBox
              p={3}
              mt={10}
              mb={10}
              ml={matches ? 35 : 4}
              width={matches ? "29rem" : "22rem"}
              height="auto"
              sx={{ backgroundColor: "rgba(217, 217, 217, 0.9)" }}
            >
              <Container>
                <Stack spacing={1}>
                  {/* Premium Without GST */}
                  <Grid container spacing={3} mt={0.5}>
                    <Grid item xs={6} md={6} ml={3}>
                      <MDTypography sx={{ color: "#000000", fontSize: "16px" }}>
                        Premium Without GST
                      </MDTypography>
                    </Grid>

                    <Grid item xs={3} md={3} ml={3} display="flex" justifyContent="flex-end">
                      <MDTypography
                        sx={{
                          color: "#000000",
                          fontSize: "15px",
                          // display: "inline-block",
                          width: "8rem",
                        }}
                      >
                        {formatter.format(lDto.PremiumDetails["Net Premium"])}
                      </MDTypography>
                    </Grid>
                  </Grid>

                  {/* GST (18%) and Total Premium in the same line */}
                  <Grid container spacing={3}>
                    <Grid item xs={6} md={6} ml={1}>
                      <MDTypography sx={{ color: "#000000", fontSize: "16px" }}>
                        GST (18%)
                      </MDTypography>
                    </Grid>

                    <Grid item xs={3} md={3} ml={3} display="flex" justifyContent="flex-end">
                      <MDTypography
                        sx={{
                          color: "#000000",
                          fontSize: "15px",
                          // display: "inline-block",
                          width: "6rem",
                        }}
                      >
                        {formatter.format(lDto.PremiumDetails.CGST)}
                      </MDTypography>
                    </Grid>

                    <Grid item xs={6} md={6} ml={1}>
                      <MDTypography sx={{ color: "#000000", fontSize: "17px", fontWeight: "bold" }}>
                        Total Premium
                      </MDTypography>
                    </Grid>
                    <Grid item xs={3} md={3} ml={3} display="flex" justifyContent="flex-end">
                      <MDTypography
                        sx={{
                          color: "#000000",
                          fontSize: "15px",
                          display: "inline-block",
                          width: "6rem",
                          fontWeight: "bold",
                        }}
                      >
                        {formatter.format(lDto.PremiumDetails.TotalPremium)}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Stack>
              </Container>
            </MDBox>
          </div>
        ),
      },
      {
        type: "Button",
        label: "Back",
        visible: lMasters.Quotationflag === true,
        variant: "contained",
        onClick: onclback,
        spacing: 1.5,
      },

      {
        type: "Typography",
        visible: true,
        variant: "contained",
        spacing: 8.5,
        // onClick: initiateCkyc,
      },
      {
        type: "Button",
        label: "Buy Now",
        visible: lMasters.Quotationflag === true,
        variant: "contained",
        onClick: onBuyNow,
        spacing: 1.5,
      },
    ],
    PolicyDetails: [
      {
        type: "AutoComplete",
        label: "Policy Tenure",
        visible: true,
        options: lMasters?.Tenure,
        path: `ProposerDetails.PolicyTenure`,
        spacing: 2.5,
        validationId: 1,
        disabled: true,
        required: true,
      },
      {
        type: "MDDatePicker",
        required: true,
        label: "Policy Start Date",
        visible: lMasters.Dateflag === false,
        allowInput: true,
        path: `PolicyStartDate`,
        dateFormat: "Y-m-d",
        minDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        maxDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          new Date().getDate() + 30
        }`,
        customOnChange: (e, v) => handlePolDate(e, v),
        spacing: 3,
      },
      {
        type: "MDDatePicker",
        label: "Policy End Date",
        path: `PolicyEndDate`,
        visible: true,
        validationId: 1,
        spacing: 2.5,
        disabled: true,
        required: true,
        dateFormat: "Y-m-d",
        InputProps: { disabled: true },
      },
    ],
    ProposerDetails: [
      {
        type: "AutoComplete",
        label: "Salutation",
        visible: lDto.CustomerType === "Individual",
        options: lMasters?.Salutation,
        path: `ProposerDetails.Salutation`,
        required: true,
        validationId: 1,
        customOnChange: (e, v) => handleProposerMasters(e, v, "Salutation"),
        spacing: 2.5,
      },

      {
        type: "Input",
        label: "First Name",
        validationId: 1,
        visible: lDto.CustomerType === "Individual",
        spacing: 2.5,
        disabled: true,
        required: true,
        path: `ProposerDetails.First Name`,
      },

      {
        type: "Input",
        label: "Last  Name",
        validationId: 1,
        visible: lDto.CustomerType === "Individual",
        disabled: true,
        path: `ProposerDetails.Last Name`,
        spacing: 2.5,
      },
      {
        type: "Input",
        label: "Corporate Name",
        visible: lDto.CustomerType === "Corporate",
        required: lDto.CustomerType === "Corporate",
        path: `ProposerDetails.First Name`,
        disabled: lDto.CkycStatus === "success",
        onChangeFuncs: ["IsAlphaSpace"],
        spacing: 2.5,
      },

      {
        type: "MDDatePicker",
        label: lDto.CustomerType === "Corporate" ? "Date of Incorporation" : "Date of Birth",
        visible: true,
        disabled: true,
        // path: `ProposerDetails.DateofBirth`,
        path: lMasters.flags.dob === true ? "ProposerDetails.DateofBirth" : "",
        allowInput: true,
        dateFormat: "d-m-Y",
        validationId: 1,
        spacing: 2.5,
        InputProps: { disabled: true },
      },
      {
        type: "AutoComplete",
        label: "Gender",
        visible: lDto.CustomerType === "Individual",
        disabled:
          lMasters.proposerSal === "MR. " ||
          lMasters.proposerSal === "MS. " ||
          lMasters.proposerSal === "MRS. ",
        spacing: 2.5,

        path: `ProposerDetails.NomineeGender`,
        value: lMasters.proposerGender,
        options: lMasters?.Gender,
        customOnChange: (e, v) => handleProposerMasters(e, v, "Gender"),
      },
      {
        type: "Input",
        label: "Mobile Number",
        visible: true,
        spacing: 2.5,
        path: `QuoteMobileNo`,
        required: true,
        validationId: 1,
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 10 },
        onBlurFuncs: ["IsMobileNumber"],
      },

      {
        type: "Input",
        label: "Email ID",
        visible: true,
        required: true,
        validationId: 1,
        // disabled: true,
        path: `QuoteEmail`,
        spacing: 2.5,
        onBlurFuncs: ["IsEmail"],
      },

      {
        type: "Input",
        label: "GST Number",
        visible: true,
        spacing: 2.5,
        path: `ProposerDetails.GSTNumber`,
        disabled: true,
        // disabled:
        //   lDto.ProposerDetails.PanNo || lDto.ProposerDetails.CINNo || lDto.CkycStatus === "success",
        onBlurFuncs: ["IsGstNo"],
      },
      {
        type: "Input",
        label: "PAN Number",
        visible:
          lDto?.ProposerDetails?.CKYCParam === "PAN Number" || lDto.CustomerType === "Corporate",
        spacing: 2.5,
        disabled: true,
        path: `ProposerDetails.PanNo`,
        onBlurFuncs: ["IsPan"],
        InputProps: { maxLength: 10 },
      },
    ],
    PermanentAddress: [
      // {
      //   type: "Input",
      //   label: "Plot No",
      //   path: `ProposerDetails.PermanentAddress.PlotNo`,
      //   required: true,
      //   validationId: 1,
      //   spacing: 2.5,
      //   visible: true,
      // },

      {
        type: "Input",
        label: "Address1",
        spacing: 2.5,
        path: `ProposerDetails.PermanentAddress.Address1`,
        required: true,
        validationId: 1,
        visible: true,
      },

      {
        type: "Input",
        label: "Address2",
        spacing: 2.5,
        path: `ProposerDetails.PermanentAddress.Address2`,
        visible: true,
      },

      {
        type: "Input",
        label: "Nearest Landmark",
        spacing: 2.5,
        path: `ProposerDetails.PermanentAddress.NearestLandmark`,
        visible: true,
      },

      {
        type: "Input",
        label: "Pincode",
        visible: true,
        spacing: 2.5,
        disabled: lMasters.flags.pincodeflag === false,
        path: `ProposerDetails.PermanentAddress.PinCode`,
        required: true,
        InputProps: { maxLength: 6 },
        validationId: 1,
        customOnBlur: (e) => handlePincode(e, "Perm"),
      },

      {
        type: "AutoComplete",
        label: "City",
        spacing: 2.5,
        path: `ProposerDetails.PermanentAddress.District`,
        visible: true,
        required: true,
        validationId: 1,
        options: lMasters?.permCD,
        customOnChange: (e, v) => handleCity(e, v, "Perm"),
      },

      {
        type: "Input",
        label: "State",
        disabled: true,
        spacing: 2.5,
        path: `ProposerDetails.PermanentAddress.State`,
        visible: true,
        onChangeFuncs: ["IsAlpha"],
      },

      {
        type: "Input",
        label: "Country",
        path: `ProposerDetails.PermanentAddress.Country`,
        visible: true,
        spacing: 2.5,
        disabled: true,
        onChangeFuncs: ["IsAlpha"],
      },

      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: {
          label: "Is Communication address  same as Permanent address",
          labelVisible: true,
        },
        radioList: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        path: `ProposerDetails.CommunicationSameAsPermanent`,
        spacing: 12,
        validationId: 1,
        customOnChange: (e) => onSameAddress(e),
      },
    ],
    CommunicationAddress: [
      {
        type: "Input",
        label: "Plot No",
        validationId: 1,
        path: `ProposerDetails.CommunicationAddress.PlotNo`,
        required: true,
        // disabled: lDto.ProposerDetails.CommunicationSameAsPermanent === "Yes",
        spacing: 2.5,
        visible: true,
      },

      {
        type: "Input",
        label: "Address1",
        spacing: 2.5,
        path: `ProposerDetails.CommunicationAddress.Address1`,
        required: true,
        validationId: 1,
        disabled: lDto.ProposerDetails.CommunicationSameAsPermanent === "Yes",
        visible: true,
      },

      {
        type: "Input",
        label: "Address2",
        spacing: 2.5,
        disabled: lDto.ProposerDetails.CommunicationSameAsPermanent === "Yes",
        path: `ProposerDetails.CommunicationAddress.Address2`,
        visible: true,
      },

      {
        type: "Input",
        label: "Nearest Landmark",
        spacing: 2.5,
        disabled: lDto.ProposerDetails.CommunicationSameAsPermanent === "Yes",
        path: `ProposerDetails.CommunicationAddress.NearestLandmark`,
        visible: true,
      },
      {
        type: "Input",
        label: "Pincode",
        spacing: 2.5,
        disabled: lDto.ProposerDetails.CommunicationSameAsPermanent === "Yes",
        path: `ProposerDetails.CommunicationAddress.PinCode`,
        visible: true,
        InputProps: { maxLength: 6 },
        required: true,
        customOnBlur: (e) => handlePincode(e, "Comm"),
        validationId: 1,
      },

      {
        type: "AutoComplete",
        label: "City",
        spacing: 2.5,
        disabled: lDto.ProposerDetails.CommunicationSameAsPermanent === "Yes",
        path: `ProposerDetails.CommunicationAddress.District`,
        visible: true,
        required: true,
        validationId: 1,
        options: lMasters?.commCD,
        customOnChange: (e, v) => handleCity(e, v, "Comm"),
      },
      {
        type: "Input",
        label: "State",
        spacing: 2.5,
        disabled: lDto.ProposerDetails.CommunicationSameAsPermanent === "Yes",
        path: `ProposerDetails.CommunicationAddress.State`,
        visible: true,
        onChangeFuncs: ["IsAlpha"],
      },

      {
        type: "Input",
        label: "Country",
        disabled: true,
        spacing: 2.5,
        path: `ProposerDetails.CommunicationAddress.Country`,
        visible: true,
        validationId: 1,
        onChangeFuncs: ["IsAlpha"],
      },

      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: {
          label: "Is Risk Location Address  same as Communication address ",
          labelVisible: true,
        },
        radioList: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        path: `ProposerDetails.RiskaddSameAsCommuniadd`,
        spacing: 12,
        validationId: 1,
        customOnChange: (e) => onRiskAddress(e),
      },
    ],
    RiskLocationAddress: [
      {
        type: "Input",
        label: "Plot No",
        spacing: 2.5,
        path: `ProposerDetails.RiskLocationAddress.PlotNo`,
        required: true,
        disabled: lDto.ProposerDetails.RiskaddSameAsCommuniadd === "Yes",
        validationId: 1,
        visible: true,
      },

      {
        type: "Input",
        label: "Address1",
        spacing: 2.5,
        validationId: 1,
        path: `ProposerDetails.RiskLocationAddress.Address1`,
        required: true,
        disabled: lDto.ProposerDetails.RiskaddSameAsCommuniadd === "Yes",
        visible: true,
      },

      {
        type: "Input",
        label: "Address2",
        spacing: 2.5,
        disabled: lDto.ProposerDetails.RiskaddSameAsCommuniadd === "Yes",
        path: `ProposerDetails.RiskLocationAddress.Address2`,
        visible: true,
      },

      {
        type: "Input",
        label: "Nearest Landmark",
        visible: true,
        spacing: 2.5,
        disabled: lDto.ProposerDetails.RiskaddSameAsCommuniadd === "Yes",
        path: `ProposerDetails.RiskLocationAddress.NearestLandmark`,
        // InputProps: { maxLength: 6 },
      },

      {
        type: "Input",
        label: "Pincode",
        spacing: 2.5,
        disabled: lDto.ProposerDetails.RiskaddSameAsCommuniadd === "Yes",
        path: `ProposerDetails.RiskLocationAddress.PinCode`,
        visible: true,
        required: true,
        validationId: 1,
        customOnBlur: (e) => handlePincode(e, "risk"),
      },

      {
        type: "AutoComplete",
        label: "City",
        spacing: 2.5,
        disabled: lDto.ProposerDetails.RiskaddSameAsCommuniadd === "Yes",
        path: `ProposerDetails.RiskLocationAddress.District`,
        visible: true,
        options: lMasters?.riskCD,
        customOnChange: (e, v) => handleCity(e, v, "risk"),
        // required: true,
      },

      {
        type: "Input",
        label: "State",
        spacing: 2.5,
        disabled: lDto.ProposerDetails.RiskaddSameAsCommuniadd === "Yes",
        path: `ProposerDetails.RiskLocationAddress.State`,
        visible: true,
        onChangeFuncs: ["IsAlpha"],
      },

      {
        type: "Input",
        label: "Country",
        spacing: 2.5,
        disabled: true,
        path: `ProposerDetails.RiskLocationAddress.Country`,
        visible: true,
        onChangeFuncs: ["IsAlpha"],
      },
    ],
    ProposalConsent: [
      {
        type: "Checkbox",
        visible: true,
        required: true,
        validationId: 1,
        label: "Proposal Consent",
        spacing: 12,
        checkedVal: true,
        unCheckedVal: false,
        path: `ProposerDetails.ProposalConsentCheck`,
        // value: masters.ProposalConsent,
        customOnChange: (e) => onCheck(e),
      },

      {
        type: "Input",
        label: "Enter OTP",
        onChangeFuncs: ["IsNumeric"],
        required: lDto.ProposerDetails.ProposalConsentCheck,
        path: `ProposerDetails.ConsentOTP`,
        validationId: 1,
        visible: lDto.ProposerDetails.ProposalConsentCheck,
        spacing: 2.5,
        // disabled: masters.flags.otpflag,
        disabled: lMasters?.flags?.otpflag,
        InputProps: { maxLength: 6 },
        // customOnChange: (e) => handleOTPChange(e),
        // value: OTP,
      },

      {
        type: "Typography",
        label: "",
        visible: lDto.ProposerDetails.ProposalConsentCheck,
        spacing: 1,
      },

      {
        type: "Custom",
        visible: lDto.ProposerDetails.ProposalConsentCheck,
        spacing: 3,
        return: (
          <Grid item xs={12} sm={12} md={6}>
            {lMasters?.flags?.timerFlag ? (
              <MDButton
                color="primary"
                variant="contained"
                onClick={handleSendOTP}
                // disabled={masters.flags.otpflag}
                disabled={lMasters?.flags?.otpflag}
              >
                Re-Send OTP
              </MDButton>
            ) : (
              lMasters?.flags?.sendOtpFlag === true && (
                <MDButton color="primary" variant="contained" onClick={handleSendOTP}>
                  Send OTP
                </MDButton>
              )
            )}
          </Grid>
        ),
      },

      {
        type: "Button",
        label: "Verify OTP",
        visible: lDto.ProposerDetails.ProposalConsentCheck,
        spacing: 3,
        onClick: handleVerifyOTP,
        variant: "contained",
        // path: masters.verifyOTP,
        disabled: lMasters?.flags?.otpflag,
      },
      {
        type: "Typography",
        label: <Timer counter={lMasters.counter} lMasters={lMasters} />,
        visible: lDto.ProposerDetails.ProposalConsentCheck && lMasters.startCounterFlag,
        spacing: 5,
        // path: masters.verifyOTP,
      },
      {
        type: "Checkbox",
        visible: lDto.ProposerDetails.ProposalConsentCheck,
        label: `I/We Hereby declare that the statements made by me/us in this proposal form are true the
          best of my/our knowledge and belief and I/We hereby agree that this declaration shall
          from the basis of the contract between  me/us and the Universal Sompo General Insurance
         Company Limited insurance  Company`,
        spacing: 11,
        path: `ProposerDetails.Consentcheckbox1`,
        required: lDto.ProposerDetails.ProposalConsentCheck,
        checkedVal: true,
        validationId: 1,
        unCheckedVal: false,
      },
      {
        type: "Checkbox",
        visible: lDto.ProposerDetails.ProposalConsentCheck,
        label:
          "I/We also declare that any addition alteration are carried out after the submission of this proposal form that the same would be conveyed to the insurance company immediately",
        spacing: 11.1,
        path: `ProposerDetails.Consentcheckbox2`,
        required: lDto.ProposerDetails.ProposalConsentCheck,
        checkedVal: true,
        validationId: 1,
        unCheckedVal: false,
      },
      {
        type: "Typography",
        visible: true,
        variant: "contained",
        spacing: 12,
        // onClick: initiateCkyc,
      },
      {
        type: "Button",
        label: "Back",
        visible: true,
        onClick: onPrpslback,
        variant: "outlined",
        spacing: 1.5,
      },

      {
        type: "Typography",
        visible: true,
        variant: "contained",
        spacing: 8.5,
        // onClick: initiateCkyc,
      },
      {
        type: "ValidationControl",
        subType: "Button",
        label: "Pay Now",
        visible: true,
        variant: "contained",
        onClick: onpayNow,
        spacing: 1.5,
        validationId: 1,
      },
    ],
    Payment: [
      {
        type: "Custom",
        spacing: 3,
        visible: true,
      },

      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: { label: "Payment Type * ", labelVisible: true },
        radioList: [{ value: "ClientPayment", label: "Client Payment" }],
        path: "PaymentDetails.paymentType",
        spacing: 9,
      },

      {
        type: "Custom",
        spacing: 12,
        visible: true,
        return: <Payment dto={lDto} masters={lMasters} setMasters={setMasters} setDto={setDto} />,
      },
      {
        type: "Button",
        label: "Back",
        visible: lMasters.Quotationflag === true,
        variant: "outlined",
        onClick: onPayback,
        spacing: 2.5,
      },
    ],
  };
  const midValidationCheck = (validationId) => {
    let validationFlag = true;
    Data.PlanDetails.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(lDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });

    if (validationFlag === false) {
      lMasters.flags.midNextValidationId = 1;
      lMasters.flags.nextflag = true;
    } else {
      lMasters.flags.midNextValidationId = -1;
      lMasters.flags.nextflag = false;
    }
    setMasters({ ...lMasters });
    return validationFlag;
  };
  const policyValidationCheck = (validationId) => {
    let validationFlag = true;
    Data.PolicyDetails.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(lDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });
    Data.ProposerDetails.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(lDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });
    Data.PermanentAddress.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(lDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });
    Data.CommunicationAddress.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(lDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });
    Data.RiskLocationAddress.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(lDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });
    Data.ProposalConsent.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(lDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });
    if (validationFlag === false) {
      lMasters.flags.midNextValidationId = 1;
      lMasters.flags.nextPolicyflag = true;
    } else {
      lMasters.flags.midNextValidationId = -1;
      lMasters.flags.nextPolicyflag = false;
    }
    setMasters({ ...lMasters });
    return validationFlag;
  };
  const ckycValidationCheck = (validationId) => {
    let validationFlag = true;
    Data.ECkyc.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(lDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });
    if (validationFlag === false) {
      lMasters.flags.midNextValidationId = 1;
      lMasters.flags.nextckycflag = true;
    } else {
      lMasters.flags.midNextValidationId = -1;
      lMasters.flags.nextckycflag = false;
    }
    setMasters({ ...lMasters });
    return validationFlag;
  };

  return (
    <>
      {/* <Grid container spacing={2} m={1}>
        {Data.Image.map((elem) =>
          elem.visible ? (
            <Grid item xs={elem.spacing}>
              <NewRenderControl item={elem} dto={lDto} setDto={setDto} />
            </Grid>
          ) : null
        )} */}
      {/* </Grid> */}
      {lMasters.Proceedfalg === false ? (
        <Grid container spacing={2} p={2}>
          <MDBox
            sx={{
              width: matches ? "800vh" : "35%",
              height: matches ? "100vh" : "170px",
              // px: matches ? "0.8rem" : "0.5rem",
              px: "1rem",
              backgroundImage: `url(${BGRBanner})`,
              mt: matches ? "3.875rem" : "1.875rem",
            }}
            // width="1200px"
            // height="300px"
            style={{
              backgroundImage: `url(${BGRBanner})`,
              position: "relative",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              textAlign: matches ? "left" : "center",
              // padding: "20px",
            }}
          >
            <div
              style={{ marginRight: matches ? "50%" : "20%", marginTop: matches ? "56px" : "10px" }}
            >
              <span style={{ fontSize: matches ? "18px" : "10px", fontWeight: "bold" }}>
                Secure Your Home With
              </span>
              <br />
              <span style={{ fontSize: matches ? "26px" : "15px", fontWeight: "bold" }}>
                Universal Sompo - BharatGriha Raksha
              </span>
              <br />
              <span style={{ fontSize: matches ? "16px" : "10px" }}>
                <CheckCircleIcon />
                &nbsp;Home Structure Cover &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CheckCircleIcon /> Home Contents Cover
              </span>
            </div>
            <MDButton
              style={{
                position: "absolute",
                top: matches ? "70%" : "67%",
                left: matches ? "8%" : "30%", // Adjust the left position as needed
                transform: "translate(-50%, -50%)",
                padding: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "20px",
                textTransform: "none",
              }}
              onClick={handleProduct}
            >
              Know Your Product
            </MDButton>
          </MDBox>
        </Grid>
      ) : null}
      <Grid container spacing={2} p={2}>
        {Data.Home.map((x2) =>
          x2.visible ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={x2.spacing ? x2.spacing : 3}
              lg={x2.spacing ? x2.spacing : 3}
              xl={x2.spacing ? x2.spacing : 3}
              xxl={x2.spacing ? x2.spacing : 3}
              // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
            >
              <NewRenderControl item={x2} dto={lDto} setDto={setDto} />
            </Grid>
          ) : null
        )}
      </Grid>
      {lMasters.flags.BuyNowflag === false && (
        <Card
          style={{
            marginBottom: "16px",
            width: matches ? "95%" : "40%",
            margin: matches ? "2px" : "1px",
            marginTop: "16px",
          }}
          mt={2}
        >
          {lMasters.Productflag === false ? (
            <Grid container spacing={2} m={1}>
              {lMasters.Proceedfalg === false ? (
                <>
                  <Grid item xs={12}>
                    <MDTypography style={{ color: "red" }}>E Ckyc</MDTypography>
                  </Grid>
                  {Data.ECkyc.map((x2) =>
                    x2.visible ? (
                      <Grid
                        item
                        xs={matches ? 12 : 7}
                        sm={matches ? 12 : 6}
                        md={matches ? x2.spacing : 3}
                        lg={matches ? x2.spacing : 3}
                        xl={matches ? x2.spacing : 3}
                        xxl={matches ? x2.spacing : 3}
                        // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
                      >
                        <NewRenderControl
                          item={x2}
                          dto={lDto}
                          setDto={setDto}
                          nextFlag={lMasters.flags.nextckycflag}
                          onMidNextValidation={ckycValidationCheck}
                          midNextValidationId={lMasters.flags.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )}
                </>
              ) : (
                <>
                  <Grid item xs={12}>
                    <MDTypography style={{ color: "red" }}>Plan Details</MDTypography>
                  </Grid>
                  {lMasters.flags.BuyNowflag === false &&
                    Data.PlanDetails.map((x2) =>
                      x2.visible ? (
                        <Grid
                          item
                          xs={matches ? 12 : 7}
                          sm={matches ? 12 : 6}
                          md={matches ? x2.spacing : 3}
                          lg={matches ? x2.spacing : 3}
                          xl={matches ? x2.spacing : 3}
                          xxl={matches ? x2.spacing : 3}
                          // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
                        >
                          <NewRenderControl
                            item={x2}
                            dto={lDto}
                            setDto={setDto}
                            nextFlag={lMasters.flags.nextflag}
                            onMidNextValidation={midValidationCheck}
                            midNextValidationId={lMasters.flags.midNextValidationId}
                          />
                        </Grid>
                      ) : null
                    )}
                </>
              )}
            </Grid>
          ) : null}
        </Card>
      )}
      {lMasters.flags.BuyNowflag === true && lMasters.flags.PayNowflag === false ? (
        <>
          {/* <Card
            style={{ marginBottom: "16px", width: "95%", margin: "auto", marginTop: "16px" }}
            mt={2}
          > */}
          <Card
            style={{
              marginBottom: "16px",
              width: matches ? "95%" : "40%",
              margin: matches ? "2px" : "1px",
              marginTop: "16px",
            }}
            mt={2}
          >
            <Grid container spacing={2} m={1}>
              {lMasters.flags.BuyNowflag === true ? (
                <>
                  {/* Add a Typography component for the red text */}
                  <Grid item xs={12}>
                    <MDTypography style={{ color: "red" }}>Policy Details</MDTypography>
                  </Grid>
                  {Data.PolicyDetails.map((x2) =>
                    x2.visible ? (
                      <Grid
                        item
                        xs={matches ? 12 : 7}
                        sm={matches ? 12 : 6}
                        md={matches ? x2.spacing : 3}
                        lg={matches ? x2.spacing : 3}
                        xl={matches ? x2.spacing : 3}
                        xxl={matches ? x2.spacing : 3}
                        // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
                      >
                        <NewRenderControl
                          item={x2}
                          dto={lDto}
                          setDto={setDto}
                          nextFlag={lMasters.flags.nextPolicyflag}
                          midNextValidationId={policyValidationCheck}
                          onMidNextValidation={lMasters.flags.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )}
                </>
              ) : null}
            </Grid>
          </Card>

          <Card
            style={{
              marginBottom: "16px",
              width: matches ? "95%" : "40%",
              margin: matches ? "2px" : "1px",
              marginTop: "16px",
            }}
            mt={2}
          >
            <Grid container spacing={2} m={1}>
              {lMasters.flags.BuyNowflag === true ? (
                <>
                  {/* Add a Typography component for the red text */}
                  <Grid item xs={12}>
                    <MDTypography style={{ color: "red" }}>Proposer Details</MDTypography>
                  </Grid>

                  {Data.ProposerDetails.map((x2) =>
                    x2.visible ? (
                      <Grid
                        item
                        xs={matches ? 12 : 7}
                        sm={matches ? 12 : 6}
                        md={matches ? x2.spacing : 3}
                        lg={matches ? x2.spacing : 3}
                        xl={matches ? x2.spacing : 3}
                        xxl={matches ? x2.spacing : 3}
                        // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
                      >
                        <NewRenderControl
                          item={x2}
                          dto={lDto}
                          setDto={setDto}
                          nextFlag={lMasters.flags.nextPolicyflag}
                          onMidNextValidation={policyValidationCheck}
                          midNextValidationId={lMasters.flags.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )}
                </>
              ) : null}
            </Grid>
          </Card>

          <Card
            style={{
              marginBottom: "16px",
              width: matches ? "95%" : "40%",
              margin: matches ? "2px" : "1px",
              marginTop: "16px",
            }}
            mt={2}
          >
            <Grid container spacing={2} m={1}>
              {lMasters.flags.BuyNowflag === true ? (
                <>
                  {/* Add a Typography component for the red text */}
                  <Grid item xs={12}>
                    <MDTypography style={{ color: "red" }}>Permanent Address</MDTypography>
                  </Grid>
                  {Data.PermanentAddress.map((x2) =>
                    x2.visible ? (
                      <Grid
                        item
                        xs={matches ? 12 : 7}
                        sm={matches ? 12 : 6}
                        md={matches ? x2.spacing : 3}
                        lg={matches ? x2.spacing : 3}
                        xl={matches ? x2.spacing : 3}
                        xxl={matches ? x2.spacing : 3}
                        // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
                      >
                        <NewRenderControl
                          item={x2}
                          dto={lDto}
                          setDto={setDto}
                          nextFlag={lMasters.flags.nextPolicyflag}
                          onMidNextValidation={policyValidationCheck}
                          midNextValidationId={lMasters.flags.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )}
                </>
              ) : null}
            </Grid>
          </Card>
          <Card
            style={{
              marginBottom: "16px",
              width: matches ? "95%" : "40%",
              margin: matches ? "2px" : "1px",
              marginTop: "16px",
            }}
            mt={2}
          >
            <Grid container spacing={2} m={1}>
              {lMasters.flags.BuyNowflag === true ? (
                <>
                  {/* Add a Typography component for the red text */}
                  <Grid item xs={12}>
                    <MDTypography style={{ color: "red" }}>Communication Address</MDTypography>
                  </Grid>

                  {Data.CommunicationAddress.map((x2) =>
                    x2.visible ? (
                      <Grid
                        item
                        xs={matches ? 12 : 7}
                        sm={matches ? 12 : 6}
                        md={matches ? x2.spacing : 3}
                        lg={matches ? x2.spacing : 3}
                        xl={matches ? x2.spacing : 3}
                        xxl={matches ? x2.spacing : 3}
                        // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
                      >
                        <NewRenderControl
                          item={x2}
                          dto={lDto}
                          setDto={setDto}
                          nextFlag={lMasters.flags.nextPolicyflag}
                          onMidNextValidation={policyValidationCheck}
                          midNextValidationId={lMasters.flags.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )}
                </>
              ) : null}
            </Grid>
          </Card>
          <Card
            style={{
              marginBottom: "16px",
              width: matches ? "95%" : "40%",
              margin: matches ? "2px" : "1px",
              marginTop: "16px",
            }}
            mt={2}
          >
            <Grid container spacing={2} m={1}>
              {lMasters.flags.BuyNowflag === true ? (
                <>
                  {/* Add a Typography component for the red text */}
                  <Grid item xs={12}>
                    <MDTypography style={{ color: "red" }}>Risk Location Address</MDTypography>
                  </Grid>

                  {Data.RiskLocationAddress.map((x2) =>
                    x2.visible ? (
                      <Grid
                        item
                        xs={matches ? 12 : 7}
                        sm={matches ? 12 : 6}
                        md={matches ? x2.spacing : 3}
                        lg={matches ? x2.spacing : 3}
                        xl={matches ? x2.spacing : 3}
                        xxl={matches ? x2.spacing : 3}
                        // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
                      >
                        <NewRenderControl
                          item={x2}
                          dto={lDto}
                          setDto={setDto}
                          nextFlag={lMasters.flags.nextPolicyflag}
                          onMidNextValidation={policyValidationCheck}
                          midNextValidationId={lMasters.flags.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )}
                </>
              ) : null}
            </Grid>
          </Card>

          <Card
            style={{
              marginBottom: "16px",
              width: matches ? "95%" : "40%",
              margin: matches ? "2px" : "1px",
              marginTop: "16px",
            }}
            mt={2}
          >
            <Grid container spacing={2} m={1}>
              {lMasters.flags.BuyNowflag === true ? (
                <>
                  {/* Add a Typography component for the red text */}
                  <Grid item xs={12}>
                    <MDTypography style={{ color: "red" }}>Proposal Consent</MDTypography>
                  </Grid>
                  {Data.ProposalConsent.map((x2) =>
                    x2.visible ? (
                      <Grid
                        item
                        xs={matches ? 12 : 7}
                        sm={matches ? 12 : 6}
                        md={matches ? x2.spacing : 3}
                        lg={matches ? x2.spacing : 3}
                        xl={matches ? x2.spacing : 3}
                        xxl={matches ? x2.spacing : 3}
                        // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
                      >
                        <NewRenderControl
                          item={x2}
                          dto={lDto}
                          setDto={setDto}
                          nextFlag={lMasters.flags.nextPolicyflag}
                          onMidNextValidation={policyValidationCheck}
                          midNextValidationId={lMasters.flags.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )}
                </>
              ) : null}
            </Grid>
          </Card>
        </>
      ) : null}
      {lMasters.flags.PayNowflag === true ? (
        <Card
          style={{
            marginBottom: "16px",
            width: matches ? "95%" : "40%",
            margin: matches ? "2px" : "1px",
          }}
          mt={2}
        >
          {" "}
          <Grid container spacing={2} m={1}>
            {lMasters.flags.PayNowflag === true ? (
              <>
                {Data.Payment.map((x2) =>
                  x2.visible ? (
                    <Grid
                      item
                      xs={matches ? 12 : 7}
                      sm={matches ? 12 : 6}
                      md={matches ? x2.spacing : 3}
                      lg={matches ? x2.spacing : 3}
                      xl={matches ? x2.spacing : 3}
                      xxl={matches ? x2.spacing : 3}
                      // sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
                    >
                      <NewRenderControl item={x2} dto={lDto} setDto={setDto} />
                    </Grid>
                  ) : null
                )}
              </>
            ) : null}
          </Grid>
        </Card>
      ) : null}
    </>
  );
}
export default QRCode;
