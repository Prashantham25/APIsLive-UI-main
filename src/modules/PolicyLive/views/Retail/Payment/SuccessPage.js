import React, { useEffect, useState } from "react";
import { Grid, Card, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import {
  GetPolicyDetailsByTransactionID,
  GetProposalByNumber,
  GetTemplatePayload,
  SavepolicyWFStatus,
  UpdateWorkflowStatus,
  SendNotification,
  EventCommunicationExecution,
  GetEndoDetailsByTransactionID,
} from "./Apis";
import {
  GetEndorsementJson,
  SaveEndorsementWFStatus,
} from "../Products/NepalProds/data/APIs/MotorCycleApi";
import { DateFormatFromStringDate } from "../../../../../Common/Validations";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../BrokerPortal/context";

function SuccessPage() {
  const [PaymentDetails, setPaymentDetails] = useState({
    PaymentRefNo: "",
  });
  const { search } = useLocation();
  const navigate = useNavigate();
  const [, dispatch] = useDataController();
  console.log("PaymentDetails", PaymentDetails);
  // const [backDropFlag, setBackDropFlag] = useState({
  //   onReceiptClick: false,
  //   onPolicyDownClick: false,
  // });
  const [details1, setdetails1] = useState({
    policyNumber: "",
    ReceiptNo: "",
    TaxInvoiceNo: "",
    PolicyStartDate: "",
    PolicyEndDate: "",
    KYCNo: "",
    Class: "",
    PremiumType: "",
    Department: "",
    Product: "",
    EndoPolicyNo: "",
    EndorsementNo: "",
    EndorsementEffectiveDate: "",
  });
  // const [PolicyDetials, setPolicyDetails] = useState({});
  // const [EndoDetials, setEndoDetials] = useState({});
  console.log(details1);

  // const generateFile = (content, fileName) => {
  //   console.log("content", content);
  //   const src = `data:application/pdf;base64,${content}`;
  //   const link = document.createElement("a");
  //   link.href = src;
  //   link.download = fileName;
  //   console.log("FilenameQuote", link.download);
  //   link.click();
  // };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  const onClickHome = () => {
    navigate("/retail/home");
  };
  const onPolicyDownClick = async () => {
    // setBackDropFlag((prev) => ({ ...prev, onPolicyDownClick: true }));
    let Class = "";
    if (details1.Department === "Motor" && details1.Product === "MotorCycle") {
      if (details1.EndorsementNo === "") {
        if (details1.PremiumType === "Normal") {
          if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
            Class = 216;
          }
          if (
            localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
            process.env.REACT_APP_EnvId === "1"
          ) {
            Class = 228;
          }
        }
      } else {
        Class = 283;
      }
    }
    if (
      details1.Department === "Agriculture" &&
      (details1.Product === "AgriBPC" ||
        details1.Product === "AgriGoat" ||
        details1.Product === "Poultry")
    ) {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 185;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 204;
      }
    }
    if (details1.Department === "Property" && details1.Product === "HomeInsurance") {
      Class = 314;
    }
    if (details1.Department === "Miscellaneous" && details1.Class === "TravelMedicalInsurance") {
      Class = 239;
    }
    if (details1.Department === "Motor" && details1.Product === "CommercialVehicle") {
      Class = 246;
    }
    if (details1.Department === "Motor" && details1.Product === "PrivateVehicle") {
      Class = 353;
    }
    if (details1.Department === "Property" && details1.Product === "PropertyInsurance") {
      Class = 316;
    }
    if (details1.Department === "Miscellaneous" && details1.Product === "Burglary") {
      Class = 319;
    }

    if (details1.Department === "Agriculture" && details1.Product === "HoneyBee") {
      Class = 302;
    }

    if (details1.Department === "Agriculture" && details1.Product === "Ostrich") {
      Class = 311;
    }
    if (details1.Department === "Agriculture" && details1.Product === "Fish") {
      Class = 328;
    }
    if (details1.Department === "Miscellaneous" && details1.Product === "AccidentalInsurance") {
      Class = 416;
    }
    if (details1.Department === "Miscellaneous" && details1.Product === "PersonalDomiciliary") {
      Class = 423;
    }
    const PolicyNo = details1.EndorsementNo === "" ? details1.policyNumber : details1.EndorsementNo;
    // console.log("Class", Class);
    const downloadDTO = {
      key: PolicyNo,
      keyValue: "",
      templateKey: "",
      templateId: Class,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      console.log("result", result);
      if (result?.status === 200) {
        generateFile(result.data, PolicyNo);
        // setBackDropFlag((prev) => ({ ...prev, onPolicyDownClick: false }));
      }
    });
  };
  const onReceiptClick = async () => {
    // setBackDropFlag((prev) => ({ ...prev, onReceiptClick: true }));
    let Class = "";
    if (details1.Department === "Motor" && details1.Product === "MotorCycle") {
      if (details1.EndorsementNo === "") {
        if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
          Class = 217;
        }
        if (
          localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
          process.env.REACT_APP_EnvId === "1"
        ) {
          Class = 229;
        }
      } else {
        Class = 339;
      }
    }
    if (details1.Department === "Motor" && details1.Product === "CommercialVehicle") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 247;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 247;
      }
    }
    if (
      details1.Department === "Agriculture" &&
      (details1.Product === "AgriBPC" ||
        details1.Product === "AgriGoat" ||
        details1.Product === "Poultry")
    ) {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 186;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 205;
      }
    }
    if (details1.Department === "Property" && details1.Product === "HomeInsurance") {
      Class = 322;
    }
    if (details1.Department === "Miscellaneous" && details1.Class === "TravelMedicalInsurance") {
      Class = 240;
    }
    if (details1.Department === "Property" && details1.Product === "PropertyInsurance") {
      Class = 318;
    }
    if (details1.Department === "Miscellaneous" && details1.Class === "Burglary") {
      Class = 321;
    }
    if (details1.Department === "Agriculture" && details1.Product === "Ostrich") {
      Class = 313;
    }

    if (details1.Department === "Agriculture" && details1.Product === "HoneyBee") {
      Class = 303;
    }
    if (details1.Department === "Agriculture" && details1.Product === "Fish") {
      Class = 330;
    }
    if (details1.Department === "Motor" && details1.Product === "PrivateVehicle") {
      Class = 351;
    }
    if (details1.Department === "Miscellaneous" && details1.Product === "AccidentalInsurance") {
      Class = 419;
    }
    if (details1.Department === "Miscellaneous" && details1.Product === "PersonalDomiciliary") {
      Class = 435;
    }
    const PolicyNo = details1.EndorsementNo === "" ? details1.policyNumber : details1.EndorsementNo;
    const downloadDTO = {
      key: PolicyNo,
      keyValue: "",
      templateKey: "",
      templateId: Class,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, PolicyNo);
        // setBackDropFlag((prev) => ({ ...prev, onReceiptClick: false }));
      }
    });
  };
  // const OnDownLoadTax = async () => {
  //   const downloadDTO = {
  //     key: details1.policyNumber,
  //     keyValue: "",
  //     templateKey: "",
  //     templateId: 147,
  //     requestData: "",
  //     referenceId: "",
  //     communicationId: 0,
  //   };

  //   await GetTemplatePayload(downloadDTO).then((result) => {
  //     console.log("result", result);
  //     if (result.status === 200) {
  //       generateFile(result.data, details1.policyNumber);
  //     }
  //   });
  // };
  useEffect(async () => {
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});
    const PaymentRefNo = new URLSearchParams(search).get("TXNID");
    setPaymentDetails((prevState) => ({
      ...prevState,
      PaymentRefNo,
    }));
    console.log("PaymentRefNo", PaymentRefNo);
    if (PaymentRefNo !== null) {
      let res = "";
      let resE = "";
      const PaymentRefNo1 = PaymentRefNo.split("T");
      if (PaymentRefNo1[1] === "P") {
        res = await GetPolicyDetailsByTransactionID(PaymentRefNo1[0]);
      } else {
        resE = await GetEndoDetailsByTransactionID(PaymentRefNo1[0]);
      }
      console.log("GetPolicyDetailsByTransactionID", res);
      console.log("GetEndoDetailsByTransactionID", resE);
      let res1 = {};
      if (PaymentRefNo1[1] === "P") {
        res1 = await GetProposalByNumber(res?.data?.proposalNumber, res?.data?.productID);
        res1 = res1?.data[0].policyDetails;
        details1.Class = res1?.Class;
        details1.KYCNo = res1?.KYCNo;
        details1.ReceiptNo = res1?.ReceiptNo;
        details1.TaxInvoiceNo = res1?.TaxInvoiceNo;
        details1.PremiumType = res1?.PremiumType;
        details1.Department = res1?.Department;
        details1.Product = res1?.Product;
        // setPolicyDetails(res1.data[0].policyDetails);
      } else {
        res1 = await GetEndorsementJson(resE?.data?.endorsementNo);
        console.log("res1", res1);
        // setEndoDetials(res1.data.finalResult);
        res1 = res1?.data?.finalResult?.EndorsementDetails;
        details1.EndoPolicyNo = res1?.EndoPolicyNo;
        details1.EndorsementNo = res1?.EndorsementNo;
        details1.ReceiptNo = res1?.EndoReceiptNo;
        // details1.PolicyStartDate = res1?.PolicyStartDate;
        // details1.PolicyEndDate = res1?.PolicyEndDate;
        details1.TaxInvoiceNo = res1?.EndoTaxInvoiceNo;
        details1.KYCNo = res1?.KYCNo;
        details1.Product = res1?.Product;
        details1.Department = res1?.Department;
        details1.EndorsementEffectiveDate = DateFormatFromStringDate(
          res1?.EndorsementEffectiveDate,
          "m/d/y",
          "d/m/y"
        );
      }
      console.log(res, res1, 123123);

      // const Startdate = res1.PolicyStartDate;
      // details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      // const [day1, month1, year1] = Startdate.split("/");

      // if (day1 < 10 && month1 > 9) {
      //   const StartDate = `${day1.padStart(2, "0")}/${month1}/${year1}`;
      //   const startdate = StartDate.split("/");
      //   details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      // }
      // if (day1 < 10 && month1 < 10) {
      //   const StartDate = `${day1.padStart(2, "0")}/${month1.padStart(2, "0")}/${year1}`;
      //   const startdate = StartDate.split("/");
      //   details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      // }
      // if (day1 > 9 && month1 < 10) {
      //   const StartDate = `${day1}/${month1.padStart(2, "0")}/${year1}`;
      //   const startdate = StartDate.split("/");
      //   details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      // }
      // if (day1 > 9 && month1 > 9) {
      //   const StartDate = `${day1}/${month1}/${year1}`;
      //   const startdate = StartDate.split("/");
      //   details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      // }
      details1.PolicyStartDate = DateFormatFromStringDate(res1?.PolicyStartDate, "m/d/y", "d/m/y");
      details1.PolicyEndDate = DateFormatFromStringDate(res1?.PolicyEndDate, "m/d/y", "d/m/y");

      // details1.ReceiptNumber = res.data.transID;
      let Email = "";
      // if (res1.InsurableItem[0].RiskItems[0].KYCDetails !== undefined) {
      //   details1.VATNumber =
      //     res1.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.VATNumber;
      //   // Email =
      //   //   res1.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails
      //   //     .EmailAddress;
      // }
      details1.policyNumber =
        res1.EndoPolicyNo === undefined ? res.data.policyNo : res1.EndoPolicyNo;
      // const Enddate = res1.PolicyEndDate;
      // const [day, month, year] = Enddate.split("/");

      // if (day < 10 && month > 9) {
      //   const EndDate = `${day.padStart(2, "0")}/${month}/${year}`;
      //   const enddate = EndDate.split("/");
      //   details1.PolicyEndDate = `${enddate[1]}/${enddate[0]}/${enddate[2]}`;
      // }
      // if (day < 10 && month < 10) {
      //   const EndDate = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      //   const enddate = EndDate.split("/");
      //   details1.PolicyEndDate = `${enddate[1]}/${enddate[0]}/${enddate[2]}`;
      // }
      // if (day > 9 && month < 10) {
      //   const EndDate = `${day}/${month.padStart(2, "0")}/${year}`;
      //   const enddate = EndDate.split("/");
      //   details1.PolicyEndDate = `${enddate[1]}/${enddate[0]}/${enddate[2]}`;
      // }
      // if (day > 9 && month > 9) {
      //   const EndDate = `${day}/${month}/${year}`;
      //   const enddate = EndDate.split("/");
      //   details1.PolicyEndDate = `${enddate[1]}/${enddate[0]}/${enddate[2]}`;
      // }
      // details1.Class = res1.Class;
      // details1.KYCNumber = res1.KYCNo;
      // details1.ReceiptNo = res1.ReceiptNo;
      // details1.VATNumber = res1.TaxInvoiceNo;
      // details1.PremiumType = res1.PremiumType;
      // details1.Department = res1.Department;
      // details1.Product = res1.Product;
      setdetails1({ ...details1 });

      // if (res1.Department === "Motor") {
      Email =
        res1.ProposerDetails["Email ID"] === undefined
          ? res1.ProposerDetails.EmailId
          : res1.ProposerDetails["Email ID"];
      // }
      // if (res1.Department === "Agriculture") {
      //   Email = res1.ProposerDetails["Email ID"];
      // }
      // if (res1.Department === "Property Insurance") {
      //   Email = res1.ProposerDetails["Email ID"];
      // }
      if (Email && Email !== "") {
        let Class = "";
        if (res1.PremiumType === "Normal") {
          // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
          //   Class = res1.Class === "MotorCycle" ? 176 : 177;
          // }
          if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
            Class = 215;
          }
          if (
            localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
            process.env.REACT_APP_EnvId === "1"
          ) {
            Class = 224;
          }
        }
        if (res1.PremiumType === "Short Period") {
          // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
          //   Class = 179;
          // }
          if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
            Class = 215;
          }
          if (
            localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
            process.env.REACT_APP_EnvId === "1"
          ) {
            Class = 224;
          }
        }
        if (res1.Department === "Agriculture") {
          if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
            Class = 191;
          }
          if (
            localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
            process.env.REACT_APP_EnvId === "1"
          ) {
            Class = 204;
          }
        }
        if (res1.Department === "Property Insurance") {
          if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
            Class = 194;
          }
          if (
            localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
            process.env.REACT_APP_EnvId === "1"
          ) {
            Class = "";
          }
        }
        const a = {
          proposalNo: "",
          policyNo: res1.EndoPolicyNo === undefined ? res.data.policyNo : res1.EndoPolicyNo,
          transactionId: "",
          customerId: "",
          key: res1.EndoPolicyNo === undefined ? res.data.policyNo : res1.EndoPolicyNo,
          keyType: "BGRProposal",
          communicationId: Class,
          referenceId: 62,
          ICPDF: false,
          ISDMS: false,
        };
        await SendNotification(res.data.policyNo, Email, a);
      }
      // }
      const smsobj = {
        communicationId: 182,
        keyType: "BrokerPortalPolicy",
        key: res1.EndoPolicyNo === undefined ? res.data.policyNo : res1.EndoPolicyNo,
        stakeHolderDetails: [
          {
            communicationType: "SMS",
            stakeholderCode: "CUS",
            communicationValue: "",
          },
        ],
      };
      await EventCommunicationExecution(smsobj);
      const a = {
        Stage: "Proposal",
        Status: "306",
        WorkFlowType: "Agent",
        wfstageStatusId: "308",
        workFlowId: "81",
        Decision: res1.DecisionStatus,
      };
      if (res1.EndoPolicyNo === undefined) {
        await SavepolicyWFStatus(res.data.proposalNumber, res1.ProductCode, a);
      } else {
        await SaveEndorsementWFStatus(resE.data.endorsementNo, a);
      }

      const wfID = localStorage.getItem("wfIDforNepal");
      if (wfID !== null) {
        await UpdateWorkflowStatus(wfID, 253).then(() => {
          localStorage.removeItem("wfIDforNepal");
        });
      }
    }
  }, []);

  return (
    <Card sx={{ backgroundColor: "#CEEBFF" }}>
      <MDBox sx={{ display: "flex", justifyContent: "center" }} pl="25%" pr="25%">
        <Grid container spacing={1} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <CheckCircleIcon color="success" fontSize="large" />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDTypography color="success" alignItem="center">
                Policy Issued Successfully
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox sx={{ display: "flex", justifyContent: "center" }} pl="23%" pr="10%">
        <Grid container spacing={1} p={2}>
          <Grid item xs={12} sm={12} md={3.8} lg={3.8} xl={3.8} xxl={3.8}>
            <MDTypography>
              {details1.EndoPolicyNo === "" ? "Policy Number" : "Endorsement Number"}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1.2} lg={1.2} xl={1.2} xxl={1.2}>
            <MDTypography>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDTypography>
              {details1.EndoPolicyNo === "" ? details1.policyNumber : details1.EndoPolicyNo}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3.8} lg={3.8} xl={3.8} xxl={3.8}>
            <MDTypography>Receipt Number</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1.2} lg={1.2} xl={1.2} xxl={1.2}>
            <MDTypography>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDTypography>{details1.ReceiptNo}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3.8} lg={3.8} xl={3.8} xxl={3.8}>
            <MDTypography>VAT Invoice Number</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1.2} lg={1.2} xl={1.2} xxl={1.2}>
            <MDTypography>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDTypography>{details1.TaxInvoiceNo}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3.8} lg={3.8} xl={3.8} xxl={3.8}>
            <MDTypography>KYC Number</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1.2} lg={1.2} xl={1.2} xxl={1.2}>
            <MDTypography>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDTypography>{details1.KYCNo}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3.8} lg={3.8} xl={3.8} xxl={3.8}>
            <MDTypography>Policy Start Date</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1.2} lg={1.2} xl={1.2} xxl={1.2}>
            <MDTypography>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDTypography>{details1.PolicyStartDate}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3.8} lg={3.8} xl={3.8} xxl={3.8}>
            <MDTypography>Policy End Date</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1.2} lg={1.2} xl={1.2} xxl={1.2}>
            <MDTypography>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDTypography>{details1.PolicyEndDate}</MDTypography>
          </Grid>
          {details1.EndorsementEffectiveDate && details1.EndorsementEffectiveDate !== "" && (
            <>
              <Grid item xs={12} sm={12} md={3.8} lg={3.8} xl={3.8} xxl={3.8}>
                <MDTypography>Endorsement Effective Date</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={1.2} lg={1.2} xl={1.2} xxl={1.2}>
                <MDTypography>:</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                <MDTypography>{details1.EndorsementEffectiveDate}</MDTypography>
              </Grid>
            </>
          )}
        </Grid>
      </MDBox>
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="row" spacing={1} p={3}>
          {/* <MDButton onClick={OnDownLoadTax}>Download Tax Invoice</MDButton> */}
          <MDButton onClick={onPolicyDownClick}>
            {/* {backDropFlag.onPolicyDownClick && (
              <CircularProgress size="20px" sx={{ color: "#ffffff" }} />
            )}
            {"   "} */}
            {/* Download Policy */}
            Preview Policy PDF
          </MDButton>
          <MDButton onClick={onReceiptClick}>
            {/* {backDropFlag.onReceiptClick && (
              <CircularProgress size="20px" sx={{ color: "#ffffff" }} />
            )}{" "}
            {"   "} */}
            {/* Download Receipt and Tax Invoice */}
            Preview Receipt and Tax Invoice
          </MDButton>
          <MDButton variant="outlined" onClick={onClickHome}>
            Go to Home{" "}
          </MDButton>
        </Stack>
      </MDBox>
    </Card>
  );
}

export default SuccessPage;
