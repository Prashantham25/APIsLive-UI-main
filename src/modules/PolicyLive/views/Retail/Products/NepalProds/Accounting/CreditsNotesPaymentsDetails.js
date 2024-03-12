import React, { useState, useEffect } from "react";
// import Submitted from "assets/images/BrokerPortal/Submitted.png";
import { Accordion, Stack, Grid, Autocomplete, CircularProgress, Backdrop } from "@mui/material";
import swal from "sweetalert";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { useLocation, useNavigate } from "react-router-dom";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDInput from "../../../../../../../components/MDInput";
import { GetTemplatePayload } from "../../../Payment/Apis";

import MDButton from "../../../../../../../components/MDButton";
// import MDButton from "../../../../../../../components/MDButton";
// import { fetchCommunicationLog } from "../data/APIs/MotorCycleApi";
import {
  GetProdPartnermasterData1,
  UpdateSequenceNumber,
  UpdatePolicyDetails,
  AccountConfig,
  GetEndorsementJson,
  GenericApi,
  getPolicyDetailsByNumber,
  RiAllocation,
} from "../data/APIs/MotorCycleApi";

function CNPayments() {
  let PaidStatus;
  const Navigate = useNavigate();
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [rows1, setRows1] = useState([]);
  const [loader, setLoader] = useState(false);
  const accountName = [
    { mID: 1, mValue: "Party Adjustment (Insured Party List)" },
    { mID: 2, mValue: "Misc Income " },
  ];
  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 600,
  //   Height: 400,
  //   spacing: "2",
  //   bgcolor: "background.paper",
  //   // border: '2px solid #000',
  //   boxShadow: 24,
  //   borderRadius: "1rem",
  //   textAlign: "center",
  //   p: 2,
  // };
  // const [open2, setOpen2] = React.useState(false);

  const generateFile1 = (content, fileName) => {
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    console.log(pdfWindow, src);
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  const [flag, setFlag] = useState({
    dateFlag: false,
    DigitalPaymentAmountFlag: false,
    ChequeAmountFlag: false,
    ChequeNoFlag: false,
    ChequeAmountonBlurFlag: false,

    // conFlag: false,
  });
  const helperText = "This field is Required";
  const location = useLocation();
  const [gridData, setGridData] = useState({});
  const [BankMaster, SetBankMater] = useState([]);
  const [printDtae, SetPrintDate] = useState();
  const [CreditsNotesPayment, SetcreditsNotesPayment] = useState({
    DigitalPaymentBankName: "",
    DigitalPaymentAmount: "",
    ChequeBankName: "",
    ChequeNo: "",
    ChequeDate: "",
    ChequeAmount: "",
    AccAdjAmount: "",
    AccountName: "",
    PayTo: "",
    Remarks: "",
  });

  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

  useEffect(async () => {
    if (Object.keys(location.state.gridData).length > 0) {
      // setGridData({ ...gridData, ...location.state.gridData });

      setGridData((prevGridData) => ({ ...prevGridData, ...location.state.gridData }));
      setGridData((prevGridData) => ({ ...prevGridData, ...CreditsNotesPayment }));
    }
    const res1 = await GetProdPartnermasterData1("BankDetails", {});
    console.log("res1", res1);
    SetBankMater([...res1.data]);
    const Type = "Credit";
    const Policies = await AccountConfig(Type);
    setRows1([...Policies]);
  }, [location]);

  console.log("GridData", gridData);

  rows1.forEach((x) => {
    if (x.policyNo === gridData.PolicyNumber) {
      if (x.status === "Not Credited") {
        PaidStatus = "Not Paid";
      } else if (x.status === "Credited") {
        PaidStatus = "Paid";
      }
    }
  });

  if (!PaidStatus) {
    PaidStatus = "Not Paid";
  }

  const handleChange = (e, type, value) => {
    if (type === "BranchName") {
      if (value === null) {
        gridData.DigitalPaymentBankName = "";
        CreditsNotesPayment.DigitalPaymentAmount = "";
        gridData.DigitalPaymentAmount = "";
        setFlag((prevstate) => ({ ...prevstate, DigitalPaymentAmountFlag: false }));
      } else {
        gridData.DigitalPaymentBankName = value.mValue;
        CreditsNotesPayment.DigitalPaymentAmount = gridData.PaymentAmount;
        gridData.DigitalPaymentAmount = CreditsNotesPayment.DigitalPaymentAmount;
      }
    }
    if (type === "BranchName1") {
      if (value === null) {
        gridData.ChequeBankName = "";
        gridData.ChequeNo = "";
        gridData.ChequeDate = "";
        CreditsNotesPayment.ChequeDate = "";
        CreditsNotesPayment.ChequeAmount = "";
        CreditsNotesPayment.ChequeNo = "";
        gridData.ChequeAmount = "";
        setFlag((prevstate) => ({ ...prevstate, ChequeAmountFlag: false }));
        setFlag((prevstate) => ({ ...prevstate, dateFlag: false }));
        setFlag((prevstate) => ({ ...prevstate, ChequeNoFlag: false }));
      } else {
        gridData.ChequeBankName = value.mValue;
        CreditsNotesPayment.ChequeAmount = gridData.PaymentAmount;
        gridData.ChequeAmount = CreditsNotesPayment.ChequeAmount;
        // gridData.ChequeAmount = gridData.PaymentAmount;
        // SetcreditsNotesPayment({ ...CreditsNotesPayment });
      }
    }
    if (type === "Amount") {
      // const numRegex = /^[0-9]*(-[0-9]*)?(\.\d{0,2})?$/;
      const numRegex = /^[0-9]*(\.\d{0,2})?$/;

      if (numRegex.test(e.target.value)) {
        CreditsNotesPayment.DigitalPaymentAmount = e.target.value;
        gridData.DigitalPaymentAmount = e.target.value;
      }
      //  else {
      //   CreditsNotesPayment.DigitalPaymentAmount = "";
      //   gridData.DigitalPaymentAmount = "";
      // }
    }

    if (type === "ChequeAmount") {
      // const numRegex = /^[0-9]*(-[0-9]*)?(\.\d{0,2})?$/;
      const numRegex = /^[0-9]*(\.\d{0,2})?$/;
      if (numRegex.test(e.target.value)) {
        CreditsNotesPayment.ChequeAmount = e.target.value;
        gridData.ChequeAmount = e.target.value;
      }
      // else {
      // CreditsNotesPayment.ChequeAmount = "";
      // gridData.ChequeAmount = "";
      // }
    }

    // if (type === "Amount") {
    //   const numRegex = /^[0-9]*$/;
    //   if (numRegex.test(e.target.value)) {
    //     gridData.DigitalPaymentAmount = e.target.value;
    //   }
    // }
    // if (type === "AccountAdjAmount") {
    //   const numRegex = /^[0-9]*$/;
    //   if (numRegex.test(e.target.value)) {
    //     gridData.AccAdjAmount = e.target.value;
    //   }
    // }
    if (type === "AccountAdjAmount") {
      // const numRegex = /^[0-9]*(-[0-9]*)?(\.\d{0,2})?$/;
      const numRegex = /^[0-9]*(\.\d{0,2})?$/;
      if (numRegex.test(e.target.value)) {
        gridData.AccAdjAmount = e.target.value;
        CreditsNotesPayment.AccAdjAmount = e.target.value;
        gridData.PayTo = gridData.ProposerDetails.InsuredNameEnglish;
        CreditsNotesPayment.PayTo = gridData.ProposerDetails.InsuredNameEnglish;
      }
      if (e.target.value === "") {
        gridData.PayTo = "";
        CreditsNotesPayment.PayTo = "";
        gridData.AccAdjAmount = "";
      }
    }
    // if (type === "ChequeAmount") {
    //   const numRegex = /^[0-9]*$/;
    //   if (numRegex.test(e.target.value)) {
    //     gridData.ChequeAmount = e.target.value;
    //   }
    // }
    // if (type === "AccountName") {
    //   const regex = /^[a-zA-Z\s]*$/;
    //   if (regex.test(e.target.value)) {
    //     gridData.AccountName = e.target.value;
    //   }
    // }
    if (type === "AccountName") {
      if (value === null) {
        gridData.AccountName = "";
      } else {
        gridData.AccountName = value.mValue;
      }
    }
    // if (type === "ChequeNo") {
    //   const numRegex = /^[0-9]*$/;
    //   if (numRegex.test(e.target.value)) {
    //     gridData.ChequeNo = e.target.value;
    //     // setFlag((prevState) => ({ ...prevState, conFlag: false }));
    //   }
    //   // else {
    //   //   setFlag((prevState) => ({ ...prevState, conFlag: true }));
    //   // }
    // }
    if (type === "ChequeNo") {
      gridData.ChequeNo = e.target.value;
      CreditsNotesPayment.ChequeNo = e.target.value;
    }
    if (type === "ChequeDate") {
      gridData.ChequeDate = value;
      CreditsNotesPayment.ChequeDate = value;
    }

    if (type === "Remarks") {
      gridData.Remarks = e.target.value;
    }
    // if (type === "PayTo") {
    //   gridData.PayTo = gridData.ProposerDetails.InsuredNameEnglish;
    // }

    SetcreditsNotesPayment({ ...CreditsNotesPayment });
    setGridData((prevGridData) => ({ ...prevGridData, ...gridData }));
    console.log("CreditsNotesPayment", CreditsNotesPayment);
  };
  console.log("gridData", gridData);
  // const handleBlur = (e, type, value) => {
  //   if (type === "Amount") {
  //     const numRegex = /^[0-9]*$/;
  //     if (numRegex.test(e.target.value)) {
  //       setFlag((prevstate) => ({ ...prevstate, ChequeAmountonBlurFlag: true }));
  //     } else {
  //       setFlag((prevstate) => ({ ...prevstate, ChequeAmountonBlurFlag: false }));
  //     }
  //   }
  //   if (type === "AccountAdjAmount") {
  //     const numRegex = /^[0-9]*$/;
  //     if (numRegex.test(e.target.value)) {
  //       gridData.AccAdjAmount = e.target.value;
  //     }
  //   }
  //   if (type === "ChequeAmount") {
  //     const numRegex = /^[0-9]*$/;
  //     if (numRegex.test(e.target.value)) {
  //       gridData.ChequeAmount = e.target.value;
  //     }
  //   }
  //   if (type === "AccountName") {
  //     const regex = /^[a-zA-Z\s]*$/;
  //     if (regex.test(e.target.value)) {
  //       gridData.AccountName = e.target.value;
  //     }
  //   }
  //   if (type === "ChequeNo") {
  //     const numRegex = /^[0-9]*$/;
  //     if (numRegex.test(e.target.value)) {
  //       gridData.ChequeNo = e.target.value;
  //     }
  //   }
  // };
  const checkAmount = () => {
    // debugger;

    if (PaidStatus === "Not Paid") {
      swal({
        html: true,
        icon: "error",
        text: "Kindly complete the policy payment process",
      });
      return false;
    }
    const totalValue = Math.abs(
      Number(gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementFinalPremium)
    );

    // const totalValue = Number(
    //   gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementFinalPremium
    // );
    const gridDigitalAmt = Math.abs(Number(gridData.DigitalPaymentAmount));
    const gridChequeAmt = Math.abs(Number(gridData.ChequeAmount));
    const AccAdjAmount = Math.abs(Number(gridData.AccAdjAmount));
    console.log(totalValue, gridDigitalAmt, AccAdjAmount);

    if (
      gridDigitalAmt !== 0 &&
      AccAdjAmount === 0 &&
      (gridDigitalAmt > totalValue || gridDigitalAmt < totalValue)
      //   ||
      // totalValue > gridDigitalAmt + AccAdjAmount
    ) {
      gridData.AccAdjAmount = "";
      gridData.DigitalPaymentAmount = "";
      CreditsNotesPayment.DigitalPaymentAmount = "";
      gridData.PayTo = gridData.ProposerDetails.InsuredNameEnglish;
      CreditsNotesPayment.PayTo = "";
      SetcreditsNotesPayment({ ...CreditsNotesPayment });
      setGridData((prevGridData) => ({ ...prevGridData, ...gridData }));
      swal({
        html: true,
        icon: "error",
        text: "Payment amount cannot be more or lesser than total refund amount",
      });
      return false;
    }
    if (
      gridChequeAmt !== 0 &&
      AccAdjAmount === 0 &&
      (gridChequeAmt > totalValue || gridChequeAmt < totalValue)
      // ||
      // totalValue > gridChequeAmt + AccAdjAmount
    ) {
      gridData.AccAdjAmount = "";
      gridData.ChequeAmount = "";
      CreditsNotesPayment.ChequeAmount = "";
      gridData.PayTo = gridData.ProposerDetails.InsuredNameEnglish;
      CreditsNotesPayment.PayTo = "";
      SetcreditsNotesPayment({ ...CreditsNotesPayment });
      setGridData((prevGridData) => ({ ...prevGridData, ...gridData }));
      swal({
        html: true,
        icon: "error",
        text: "Payment amount cannot be more or lesser than total refund amount",
      });
      return false;
    }

    if (
      AccAdjAmount !== 0 &&
      gridDigitalAmt === 0 &&
      gridChequeAmt === 0 &&
      (AccAdjAmount > totalValue || AccAdjAmount < totalValue)
    ) {
      gridData.AccAdjAmount = "";
      CreditsNotesPayment.AccAdjAmount = "";
      gridData.PayTo = gridData.ProposerDetails.InsuredNameEnglish;
      CreditsNotesPayment.PayTo = "";
      SetcreditsNotesPayment({ ...CreditsNotesPayment });
      setGridData((prevGridData) => ({ ...prevGridData, ...gridData }));
      swal({
        html: true,
        icon: "error",
        text: "Payment amount cannot be more or lesser than total refund amount",
      });
      return false;
    }

    if (gridDigitalAmt !== 0 && AccAdjAmount !== 0) {
      if (
        totalValue < gridDigitalAmt ||
        totalValue < AccAdjAmount + gridDigitalAmt ||
        totalValue > AccAdjAmount + gridDigitalAmt
      ) {
        swal({
          html: true,
          icon: "error",
          text: "Payment amount cannot be more or lesser than total refund amount",
        });
        gridData.AccAdjAmount = "";
        gridData.DigitalPaymentAmount = "";
        gridData.PayTo = gridData.ProposerDetails.InsuredNameEnglish;
        CreditsNotesPayment.PayTo = "";
        CreditsNotesPayment.AccAdjAmount = "";
        CreditsNotesPayment.DigitalPaymentAmount = "";
        SetcreditsNotesPayment({ ...CreditsNotesPayment });
        setGridData((prevGridData) => ({ ...prevGridData, ...gridData }));
        return false;
      }
    }

    if (gridChequeAmt !== 0 && AccAdjAmount !== 0) {
      if (
        totalValue < gridChequeAmt ||
        totalValue < AccAdjAmount + gridChequeAmt ||
        totalValue > AccAdjAmount + gridChequeAmt
      ) {
        swal({
          html: true,
          icon: "error",
          text: "Payment amount cannot be more or lesser than total refund amount",
        });
        CreditsNotesPayment.ChequeAmount = "";
        gridData.ChequeAmount = "";
        gridData.AccAdjAmount = "";
        gridData.PayTo = gridData.ProposerDetails.InsuredNameEnglish;
        CreditsNotesPayment.PayTo = "";
        CreditsNotesPayment.AccAdjAmount = "";
        SetcreditsNotesPayment({ ...CreditsNotesPayment });
        setGridData((prevGridData) => ({ ...prevGridData, ...gridData }));
        return false;
      }
    }
    return true;
  };
  const handleRIData = async () => {
    if (location?.state?.EndorsementNumber) {
      await GetEndorsementJson(location?.state?.EndorsementNumber).then(async (res1) => {
        if (res1?.data?.finalResult) {
          const RiPolicy = {
            "Policy End Date": res1?.data?.finalResult?.EndorsementDetails.PolicyEndDate,
            "Policy Start Date": res1?.data?.finalResult?.EndorsementDetails.PolicyStartDate,
            "Insured Name":
              res1?.data?.finalResult?.EndorsementDetails?.ProposerDetails?.InsuredNameEnglish,
            "Line Of Business": "Motor",
            "Class Of Business": "TwoWheeler",
            Currency: "NPR",
            EndorsementNo: res1.data?.finalResult?.EndorsementDetails.EndoPolicyNo,
          };
          const RiPolicydetails = JSON.stringify(RiPolicy);
          let Endpremium = "";

          Endpremium =
            res1?.data?.finalResult?.EndorsementType[0].mValue === "Policy Cancellation"
              ? res1?.data?.finalResult?.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                  .CancellationPremium
              : res1?.data?.finalResult?.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                  .EndorsementPremium;
          const RiAllocationDtoNew = {
            policyNo: res1?.data?.finalResult?.PolicyNo,
            productName: res1?.data?.finalResult?.EndorsementDetails.RiProductCode,
            sumInsured:
              res1?.data?.finalResult?.EndorsementDetails?.PremiumDetails?.EndorsementPremiumDetails
                .CollectedSumInsured,

            premiumAmount: Endpremium,

            level: "Product",
            year: "2024",
            basis: "Benefit",
            PolicyDetails: RiPolicydetails,
          };

          // console.log("RiAllocationDtoNew", RiAllocationDtoNew);

          const RiData = await RiAllocation(RiAllocationDtoNew);
          if (res1?.data?.finalResult?.EndorsementType[1]?.endorsementConfigName === "Refund")
            await getPolicyDetailsByNumber(gridData.PolicyNumber).then(async (x1) => {
              if (x1) {
                await GenericApi("NepalMotorTwoWheeler", "NepalMotorEndoRefundAccAPI", {
                  ...x1,
                  PolicyNo: gridData.PolicyNumber,
                  AccountAdj:
                    x1?.AccAdjAmount !== undefined && x1?.AccAdjAmount !== ""
                      ? "Success"
                      : "UnSuccess",
                  MergeRI: RiData.data,
                }).then((res2) => {
                  if (res2?.finalResult) {
                    // console.log(res, "ressss");
                  } else {
                    swal.fire({
                      icon: "error",
                      text: "Incurred an error please try again later",
                      confirmButtonColor: "#0079CE",
                    });
                  }
                });
              } else {
                swal.fire({
                  icon: "error",
                  text: "Incurred an error please try again later",
                  confirmButtonColor: "#0079CE",
                });
              }
            });
        }
      });
    }
  };

  const handleSubmit = async () => {
    setLoader(true);
    setFlag({ ...flag });
    const amountCheckPassed = checkAmount();

    if (!amountCheckPassed) {
      setLoader(false);
      return;
    }
    gridData.ChequeAmount =
      CreditsNotesPayment.ChequeAmount === ""
        ? ""
        : formater.format(CreditsNotesPayment.ChequeAmount);
    gridData.DigitalPaymentAmount =
      CreditsNotesPayment.DigitalPaymentAmount === ""
        ? ""
        : formater.format(CreditsNotesPayment.DigitalPaymentAmount);
    // gridData.AccAdjAmount =
    //   gridData.AccAdjAmount !== "" ? formater.format(gridData.AccAdjAmount) : "";
    if (
      gridData.DigitalPaymentBankName === "" &&
      gridData.DigitalPaymentAmount === "" &&
      gridData.ChequeBankName === "" &&
      gridData.ChequeNo === "" &&
      CreditsNotesPayment.ChequeDate === "" &&
      gridData.ChequeAmount === "" &&
      gridData.AccAdjAmount === ""
      // gridData.PayTo === "" &&
      // gridData.Remarks === "" &&
      // gridData.AccAdjAmount === "" &&
      // gridData.AccountName === ""
    ) {
      swal({
        html: true,
        icon: "error",
        text: "Please enter any of the payment information",
      });
    } else if (gridData.DigitalPaymentBankName !== "" && gridData.ChequeBankName !== "") {
      swal({
        html: true,
        icon: "error",
        text: "Please enter either one of the payment options",
      });
    } else if (
      (gridData.DigitalPaymentBankName !== "" && gridData.DigitalPaymentAmount === "") ||
      (gridData.ChequeBankName !== "" &&
        gridData.ChequeNo === "" &&
        gridData.ChequeDate === "" &&
        gridData.ChequeAmount === "")
    ) {
      setFlag((prevstate) => ({ ...prevstate, DigitalPaymentAmountFlag: true }));
      setFlag((prevstate) => ({ ...prevstate, ChequeAmountFlag: true }));
      setFlag((prevstate) => ({ ...prevstate, dateFlag: true }));
      setFlag((prevstate) => ({ ...prevstate, ChequeNoFlag: true }));
      swal({
        html: true,
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (
      (gridData.ChequeBankName !== "" &&
        gridData.ChequeNo !== "" &&
        CreditsNotesPayment.ChequeDate !== "" &&
        gridData.ChequeAmount !== "") ||
      (gridData.DigitalPaymentBankName !== "" && gridData.DigitalPaymentAmount !== "")
    ) {
      // if (gridData.DigitalPaymentBankName !== "") {
      //   setFlag((prevstate) => ({ ...prevstate, DigitalPaymentAmountFlag: true }));
      //   swal({
      //     html: true,
      //     icon: "error",
      //     // title: "Claim Intimated Successful",
      //     text: "Please Fill the required Fields",
      //   });
      // } else if (gridData.ChequeBankName !== "") {
      //   setFlag((prevstate) => ({ ...prevstate, ChequeAmountFlag: true }));
      //   setFlag((prevstate) => ({ ...prevstate, dateFlag: true }));
      //   setFlag((prevstate) => ({ ...prevstate, ChequeNoFlag: true }));
      //   swal({
      //     html: true,
      //     icon: "error",
      //     // title: "Claim Intimated Successful",
      //     text: "Please Fill the required Fields",
      //   });
      // } else {

      // if (gridData.DigitalPaymentBankName === "" && gridData.DigitalPaymentAmount === "") {
      //   setFlag((prevstate) => ({ ...prevstate, DigitalPaymentAmountFlag: true }));
      //   swal({
      //     html: true,
      //     icon: "error",
      //     // title: "Claim Intimated Successful",
      //     text: "Please Fill the required Fields",
      //   });
      // }
      // if (
      //   gridData.ChequeBankName === "" &&
      //   gridData.ChequeNo === "" &&
      //   CreditsNotesPayment.ChequeDate === "" &&
      //   gridData.ChequeAmount
      // ) {
      //   setFlag((prevstate) => ({ ...prevstate, ChequeAmountFlag: true }));
      //   setFlag((prevstate) => ({ ...prevstate, dateFlag: true }));
      //   setFlag((prevstate) => ({ ...prevstate, ChequeNoFlag: true }));
      //   swal({
      //     html: true,
      //     icon: "error",
      //     // title: "Claim Intimated Successful",
      //     text: "Please Fill the required Fields",
      //   });
      // }
      const downloadDTO = {
        key: gridData.PolicyNumber,
        keyValue: "",
        templateKey: "",
        templateId: 398,
        requestData: "",
        referenceId: "",
        communicationId: 0,
      };

      const prefix = gridData.ICShortName;
      const FinalPrefix = prefix === "NMIC" ? "CHT/" : "DHN/";
      const res = await UpdateSequenceNumber(
        "CreditNoteVoucherNo",
        FinalPrefix,
        "CreditNoteVoucherNo",
        "",
        gridData
        // CreditsNotesPayment
      );
      console.log("res", res);
      if (res !== null && res.status === 200) {
        const policyUpdatedResult = await UpdatePolicyDetails(res.data.PolicyNumber, res.data);
        console.log("PolicyRequestUpdate", policyUpdatedResult);
        await handleRIData();

        if (policyUpdatedResult.status === 3) {
          setLoader(false);
          swal({
            html: true,
            icon: "success",
            // title: "Claim Intimated Successful",
            text: "Credit Note Payment Updated Successfully",
          });
        }

        await GetTemplatePayload(downloadDTO).then((result) => {
          console.log("result", result);
          if (result.status === 200) {
            generateFile1(result.data, gridData.PolicyNumber);
          }
        });
        Navigate("/Accounting/CreditNotePayments");
      }
    } else if (
      (gridData.ChequeBankName === "" ||
        gridData.ChequeNo === "" ||
        CreditsNotesPayment.ChequeDate === "" ||
        gridData.ChequeAmount === "") &&
      gridData.AccAdjAmount === ""
    ) {
      if (gridData.DigitalPaymentBankName === "") {
        setFlag((prevstate) => ({ ...prevstate, DigitalPaymentAmountFlag: true }));
        setFlag((prevstate) => ({ ...prevstate, ChequeAmountFlag: true }));
        setFlag((prevstate) => ({ ...prevstate, dateFlag: true }));
        setFlag((prevstate) => ({ ...prevstate, ChequeNoFlag: true }));
        swal({
          html: true,
          icon: "error",
          // title: "Claim Intimated Successful",
          text: "Please fill the required fields",
        });
      }
    } else if (gridData.DigitalPaymentBankName !== "") {
      setFlag((prevstate) => ({ ...prevstate, DigitalPaymentAmountFlag: true }));
    }

    setFlag({ ...flag });

    setLoader(false);
    // }
  };

  useEffect(() => {
    const dateObject = new Date(gridData.EndorsementEffectiveDate);

    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-indexed
    const year = dateObject.getFullYear().toString().slice(-2);

    const formattedDate = `${day}-${month}-${20}${year}`;
    console.log("formattedDate", formattedDate);
    SetPrintDate(formattedDate);
  }, [gridData.EndorsementEffectiveDate]);
  // const HandleCreditclose = () => {
  // setOpen2(false);
  // setErrorFlag(false);
  // };
  // const handleAutoComplete = (e, type, value) => {}
  return (
    <Accordion>
      <MDBox sx={{ height: "600%" }}>
        <Grid>
          <Grid container spacing={1} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5">Credit Note Payment</MDTypography>
            </Grid>
          </Grid>

          <Card
            sx={{
              background: "#e3f2fd",
              marginLeft: "1rem",
              marginRight: "1.7rem",
            }}
          >
            {/* <Grid container spacing={3} p={2} justifyContent="space-between"> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {/* <Card
                sx={{
                  background: "#e3f2fd",
                  height: "100%",
                }}
              > */}
              <Grid container spacing={3} p={2} direction="row">
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Credit Note No.
                    <br />
                    <strong> {gridData.CreditNoteNo}</strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Policy No.
                    <br />
                    <strong>{gridData.PolicyNumber}</strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Fiscal Year <br />{" "}
                    <strong>{gridData.Channel && gridData.Channel.FiscalYear}</strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Branch Name <br />
                    <strong>{gridData.Channel && gridData.Channel.IssuingBranch}</strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Bill No.
                    <br />
                    <strong>{gridData.TaxInvoiceNo}</strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Agent Name <br />
                    <strong>{gridData.AgentName}</strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Paid Status
                    <br /> <strong>{PaidStatus}</strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Print Date <br />
                    <strong>{printDtae}</strong>
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Net Premium <br />
                    <strong>
                      {gridData.FormatedData &&
                        gridData.FormatedData.EndCalculatedPremiumDetails &&
                        (gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementPremium
                          ? gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementPremium
                          : gridData.FormatedData.EndCalculatedPremiumDetails.CancellationPremium)}
                    </strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Less Govt Subsidy <br />
                    <strong>
                      {" "}
                      {gridData.FormatedData &&
                        gridData.FormatedData.EndCalculatedPremiumDetails &&
                        (gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementStampDuty
                          ? 0
                          : "N/A")}
                    </strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Stamp Duty <br />
                    <strong>
                      {gridData.FormatedData &&
                        gridData.FormatedData.EndCalculatedPremiumDetails &&
                        (gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementStampDuty
                          ? gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementStampDuty
                          : 0)}
                    </strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    VAT Amount <br />
                    <strong>
                      {gridData.FormatedData &&
                        gridData.FormatedData.EndCalculatedPremiumDetails &&
                        (gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementVAT
                          ? gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementVAT
                          : gridData.FormatedData.EndCalculatedPremiumDetails.CancellationVAT)}
                    </strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Total Refund Amount
                    <br />
                    <strong>
                      {gridData.FormatedData &&
                        gridData.FormatedData.EndCalculatedPremiumDetails &&
                        (gridData.FormatedData.EndCalculatedPremiumDetails.EndorsementFinalPremium
                          ? gridData.FormatedData.EndCalculatedPremiumDetails
                              .EndorsementFinalPremium
                          : gridData.FormatedData.EndCalculatedPremiumDetails
                              .CancellationFinalPremium)}
                    </strong>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ fontSize: "1rem" }}>
                    Client Name <br />
                    <strong>
                      {gridData.ProposerDetails && gridData.ProposerDetails.InsuredNameEnglish}
                    </strong>
                  </MDTypography>
                </Grid>
              </Grid>
              {/* </Card> */}
            </Grid>
            {/* </Grid> */}
          </Card>
        </Grid>
        <Grid container>
          <Grid container spacing={1} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5">Digital Payment Information</MDTypography>
            </Grid>
          </Grid>
        </Grid>
        <MDBox>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  options={BankMaster || []}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  value={{ mValue: gridData.DigitalPaymentBankName }}
                  getOptionLabel={(option) => option.mValue}
                  onChange={(e, value) => handleChange(e, "BranchName", value)}
                  renderInput={(params) => <MDInput {...params} label="Bank Name" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Amount"
                  name="Amount"
                  value={Math.abs(Number(CreditsNotesPayment.DigitalPaymentAmount))}
                  onChange={(e, value) => handleChange(e, "Amount", value)}
                  // onBlur={(e, value) => handleBlur(e, "Amount", value)}
                  disabled={gridData.DigitalPaymentBankName === ""}
                  error={
                    gridData.DigitalPaymentBankName !== "" &&
                    flag.DigitalPaymentAmountFlag &&
                    gridData.DigitalPaymentAmount === ""
                  }
                  helperText={
                    gridData.DigitalPaymentBankName !== "" &&
                    flag.DigitalPaymentAmountFlag &&
                    gridData.DigitalPaymentAmount === ""
                      ? helperText
                      : ""
                  }
                  // disabled={gridData.DigitalPaymentBankName}
                  required={gridData.DigitalPaymentBankName !== ""}
                  sx={gridData.DigitalPaymentBankName !== "" ? redAsterisk : ""}
                />
              </Grid>
            </Grid>
          </Grid>
        </MDBox>

        <Grid container>
          <Grid container spacing={1} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5">Cheque Information</MDTypography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2} spacing={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              options={BankMaster || []}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              value={{ mValue: gridData.ChequeBankName }}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) => handleChange(e, "BranchName1", value)}
              renderInput={(params) => <MDInput {...params} label="Bank Name" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Cheque No"
              name="ChequeNo"
              value={gridData.ChequeNo}
              onChange={(e, value) => handleChange(e, "ChequeNo", value)}
              error={
                gridData.ChequeBankName !== "" && flag.ChequeNoFlag && gridData.ChequeNo === ""
              }
              helperText={
                gridData.ChequeBankName !== "" && flag.ChequeNoFlag && gridData.ChequeNo === ""
                  ? helperText
                  : ""
              }
              required={gridData.ChequeBankName !== ""}
              sx={gridData.ChequeBankName !== "" ? redAsterisk : null}
              disabled={gridData.ChequeBankName === ""}
            />
            {/* {flag.conFlag === true ? (
              <MDTypography sx={{ color: "red", fontSize: "11px", padding: "1px" }}>
                Allows only number
              </MDTypography>
            ) : null} */}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{
                label: "Cheque Date",
                value: CreditsNotesPayment.ChequeDate,
                error:
                  gridData.ChequeBankName !== "" &&
                  flag.dateFlag &&
                  CreditsNotesPayment.ChequeDate === "",
                helperText:
                  gridData.ChequeBankName !== "" &&
                  flag.dateFlag &&
                  CreditsNotesPayment.ChequeDate === ""
                    ? helperText
                    : "",
                required: gridData.ChequeBankName !== "",
                sx: redAsterisk,
              }}
              fullWidth
              options={{
                dateFormat: "d-m-Y",
                altFormat: "d/m/Y",
                altInput: true,
              }}
              // error={ErrorFlag && BankCredit.CreditedDate === ""}
              // helperText={ErrorFlag && BankCredit.CreditedDate === "" ? helperText : ""}
              value={gridData && gridData.ChequeDate}
              onChange={(e, date) => handleChange(e, "ChequeDate", date)}
              disabled={gridData.ChequeBankName === ""}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Cheque Amount"
              name="ChequeAmount"
              value={Math.abs(Number(CreditsNotesPayment.ChequeAmount))}
              disabled={gridData.ChequeBankName === ""}
              onChange={(e, value) => handleChange(e, "ChequeAmount", value)}
              error={
                gridData.ChequeBankName !== "" &&
                flag.ChequeAmountFlag &&
                gridData.ChequeAmount === ""
              }
              helperText={
                gridData.ChequeBankName !== "" &&
                flag.ChequeAmountFlag &&
                gridData.ChequeAmount === ""
                  ? helperText
                  : ""
              }
              // required={gridData.ChequeBankName !== ""}
              // disabled={gridData.ChequeBankName}
              required={gridData.ChequeBankName !== ""}
              sx={redAsterisk}
              // sx={gridData.ChequeBankName !== "" ? redAsterisk : ""}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid container spacing={1} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5">Party/Account Adjustment</MDTypography>
            </Grid>
          </Grid>
        </Grid>
        <MDBox>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Account Adj Amount"
                  name="AccountAdjAmount"
                  value={gridData.AccAdjAmount}
                  onChange={(e, value) => handleChange(e, "AccountAdjAmount", value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  name="AccountName"
                  value={gridData.AccountName}
                  options={accountName || []}
                  getOptionLabel={(option) => option.mValue || ""}
                  onChange={(e, value) => handleChange(e, "AccountName", value)}
                  renderInput={(param) => (
                    <MDInput
                      {...param}
                      label="Account Name"
                      sx={{
                        input: {
                          height: "10px",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                {/* <Autocomplete
                  options={[]}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  renderInput={(params) => <MDInput {...params} label="Pay to" />}
                /> */}
                <MDInput
                  label="Pay To"
                  name="PayTo"
                  value={CreditsNotesPayment.PayTo}
                  // value={gridData.PayTo && gridData.ProposerDetails.InsuredNameEnglish}
                  // onChange={(e, value) => handleChange(e, "PayTo", value)}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  multiline
                  rows={2}
                  label="Remarks"
                  name="Remarks"
                  value={gridData.Remarks}
                  onChange={(e, value) => handleChange(e, "Remarks", value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </MDBox>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton sx={{ marginRight: "3rem" }} onClick={handleSubmit}>
              Submit
            </MDButton>
          </Stack>

          <Backdrop open={loader}>
            <CircularProgress />
          </Backdrop>
        </Grid>
        {/* <Modal
          open={open2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="right">
                <MDButton color="white" round onClick={HandleCreditclose} textAlign="left">
                  x
                </MDButton>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Submitted} sx={{ width: "26%" }} />
                  </MDBox>
                </Grid>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <MDTypography>Details Updated Successfully</MDTypography>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <MDButton
                  // color="white"
                  variant="contained"
                  round
                  onClick={HandleCreditclose}
                  textAlign="center"
                  sx={{ width: "100px", fontSize: "16px" }}
                >
                  CLOSE
                </MDButton>
              </Stack>
            </Stack>
          </MDBox>
        </Modal> */}
      </MDBox>
    </Accordion>
  );
}

export default CNPayments;
