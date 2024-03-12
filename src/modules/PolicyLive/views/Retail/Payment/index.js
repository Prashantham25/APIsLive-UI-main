import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Autocomplete,
  Stack,
} from "@mui/material";
import swal from "sweetalert2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import objectPath from "object-path";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Success from "assets/images/Nepal/Success.png";
import magmapayment from "assets/images/Magma/magmapayment.png";
import {
  // GetNPCommonMaster,
  // GeneratePaymentRequest,
  GeneratePGUrl,
  GenericApi,
  SavePolicyPaymentDetails,
  EventCommunicationExecution,
  GetProposalByNumber,
  SearchCdAccountAsync,
  UpdatePaymentDetailsByProposalNo,
} from "./Apis";
import { setGenericPolicyDto, useDataController } from "../../../../BrokerPortal/context";
import {
  UpdateProposalDetails,
  UpdateSequenceNumber,
  PolicyStartDateMinDate,
  GetProdPartnermasterData1,
  GetEndorsementJson,
  SavepolicyWFStatus,
  UpdateEndorsementV2,
  GetProductByCode,
  IsAlphaNoSpace,
  RiAllocation,
} from "../Products/NepalProds/data/APIs/MotorCycleApi";
// import ReyzorPay from "./ReyzorPay";
// import NepalClearingHouse from "./NepalClearingHouse";
// setGenericInfo,

import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDDatePicker from "../../../../../components/MDDatePicker";
import ProductData from "../Products/NepalProds/data/NepalProductData";
// import { async } from "rxjs";
// import { Payment } from "@mui/icons-material";
function PaymentPage({
  OfflinePT,
  prod,
  OnlinePT,
  PaymentMode,
  DebitNoteApprovalStatus,
  PolicyDto,
  genericInfo,
  paymentStatus,
}) {
  // debugger;
  let RiData;
  // let Details1;
  const [controller, dispatch] = useDataController();
  const { genericPolicyDto } = controller;
  console.log("console", genericPolicyDto);
  console.log("status", paymentStatus);
  // const [masters, setMasters] = useState({
  //   PaymentMode: [],
  //   PaymentType: [],
  // });
  console.log(OfflinePT, prod, OnlinePT, PaymentMode, PolicyDto);
  // const [flags, setFlags] = useState({
  //   success: false,
  //   fail: false,
  // });
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  const [ErrorFlag, setErrorFlag] = useState(false);
  const helperText = "This field is Required";
  const [PaymentDetails, setPaymentDetails] = useState({
    PaymentSource: "",
    PaymentType: "",
    PaymentAmount: "",
    TransactionReferenceNumber: "",
    TransactionDate: "",
    BankName: "",
    AccountHolderName: "",
    Remarks: "",
    OfflinePayment: "",
    ChequeNumber: "",
    ChequedepositBankName: "",
    AccountHolderNumber: "",
  });
  const [flag, setFlag] = useState({
    AccountHolderName: false,
    Remarks: false,
  });
  const [BankDetails, setBankDetails] = useState([]);
  // const [backDropFlag, setBackDropFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const Navigate = useNavigate();
  const handleValidaion = (e) => {
    if (e.target.name === "AccountHolderName") {
      const newValidation = { ...flag, [e.target.name]: false };
      setFlag(newValidation);
    }
  };
  const handlePaymentDetails = (e) => {
    if (e.target.name === "Remarks" || e.target.name === "ChequeNumber") {
      if (e.target.value.length < 50) {
        const nameReg = /^[^\s].*$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...PaymentDetails, [e.target.name]: e.target.value };
          setPaymentDetails(newValue);
          const newValidation = { ...flag, [e.target.name]: false };
          setFlag(newValidation);
        } else {
          const newValidation = { ...flag, [e.target.name]: true };
          setFlag(newValidation);
        }
      }
    } else if (e.target.name === "TransactionReferenceNumber") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z0-9\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...PaymentDetails, [e.target.name]: e.target.value };
          setPaymentDetails(newValue);
          const newValidation = { ...flag, [e.target.name]: false };
          setFlag(newValidation);
        } else {
          const newValidation = { ...flag, [e.target.name]: true };
          setFlag(newValidation);
        }
      }
    } else if (
      // e.target.name === "BankName" ||
      e.target.name === "AccountHolderName"
      // || e.target.name === "ChequedepositBankName"
    ) {
      if (e.target.value.length < 50) {
        // const nameReg = /^[a-zA-Z\s]*$/;
        if (IsAlphaNoSpace(e.target.value) === true) {
          const newValue = { ...PaymentDetails, [e.target.name]: e.target.value };
          setPaymentDetails(newValue);
          const newValidation = { ...flag, [e.target.name]: false };
          setFlag(newValidation);
        } else {
          const newValidation = { ...flag, [e.target.name]: true };
          setFlag(newValidation);
        }
      }
    } else {
      const newValue = { ...PaymentDetails, [e.target.name]: e.target.value };
      setPaymentDetails(newValue);
    }
  };
  // console.log("Paymnet", PaymentDetails);

  const handleDateChange = (e, date) => {
    PaymentDetails.TransactionDate = date;
    // genericPolicyDto.PaymentDetails.TransactionDate = date;
    setPaymentDetails({ ...PaymentDetails });
  };
  // const [FlagCd, setFlagCd] = useState(false);
  const [cdAccBal, setCdAccBal] = useState("");
  const [cdBalance, setCdBalance] = useState();
  useEffect(async () => {
    if (prod === "Magma") {
      PaymentDetails.PaymentSource =
        paymentStatus === "Payment Pending" || paymentStatus === "Payment Initiated"
          ? "Online"
          : "";
      // binding online as defaultly when we are come from proposalList with status as Payment Pending or Payment Initiated
      PaymentDetails.PaymentType =
        (PaymentDetails.PaymentSource === "Online" && paymentStatus === "Payment Pending") ||
        paymentStatus === "Payment Initiated"
          ? "Rayzor Pay"
          : ""; // binding Rayzor Pay as defaultly when we are come from proposalList with status as Payment Pending or Payment Initiated
      PaymentDetails.OfflinePayment =
        PaymentDetails.PaymentSource === "Offline" ? "CD Account" : "";
      setPaymentDetails({ ...PaymentDetails });
      await SearchCdAccountAsync(OfflinePT.cdAccDetails).then((res) => {
        console.log("accounts", res);
        setCdBalance(res);
        if (res[0].accountNo !== "") {
          setCdAccBal(res[0].availableBalance);
        }
        // if (genericPolicyDto.Result.PremiumDetails.TotalPremium > cdAccBal) {
        //   setFlagCd(true);
        // } else {
        //   setFlagCd(false);
        // }
      });
    }
    if (prod === "Nepal") {
      await GetProdPartnermasterData1("BankDetails", {
        MasterType: "BankDetails",
      }).then((x) => {
        setBankDetails(x.data);
      });
    }
  }, []);

  const handleSetAutoDate = async (e, type, value) => {
    console.log("value", value);
    if (type === "PaymentSource") {
      if (value !== null) {
        PaymentDetails.PaymentSource = value.value;
        // genericPolicyDto.PaymentDetails.PaymentSource = value.value;
        setPaymentDetails({ ...PaymentDetails });
        if (value.value === "Online") {
          PaymentDetails.OfflinePayment = "";
          PaymentDetails.PaymentAmount = "";
          PaymentDetails.TransactionReferenceNumber = "";
          PaymentDetails.TransactionDate = "";
          PaymentDetails.BankName = "";
          PaymentDetails.AccountHolderName = "";
          PaymentDetails.Remarks = "";
          PaymentDetails.OfflinePayment = "";
          PaymentDetails.ChequeNumber = "";
          // setFlagCd(false);
        }
        if (value.value === "Offline") {
          PaymentDetails.PaymentType = "";
        }
      } else {
        PaymentDetails.PaymentType = "";
        PaymentDetails.PaymentSource = "";
        PaymentDetails.OfflinePayment = "";
        PaymentDetails.PaymentAmount = "";
        PaymentDetails.TransactionReferenceNumber = "";
        PaymentDetails.TransactionDate = "";
        PaymentDetails.BankName = "";
        PaymentDetails.AccountHolderName = "";
        PaymentDetails.Remarks = "";
        PaymentDetails.OfflinePayment = "";
        PaymentDetails.ChequeNumber = "";
      }
    } else if (type === "PaymentType") {
      PaymentDetails.PaymentType = value.value;
      setPaymentDetails({ ...PaymentDetails });
    } else if (type === "OfflinePayment") {
      setErrorFlag(false);
      if (value !== null) {
        PaymentDetails.OfflinePayment = value.value;
        // objectPath.set(genericPolicyDto, "OfflinePayment", value.value);
        setPaymentDetails({ ...PaymentDetails });
        if (OfflinePT.cdAccDetails && OfflinePT.cdAccDetails.accountNo !== "") {
          await SearchCdAccountAsync(OfflinePT.cdAccDetails).then((res) => {
            console.log("accounts", res);
            setCdBalance(res);
            if (res[0].accountNo !== "") {
              setCdAccBal(res[0].availableBalance);
            }
            // if (genericPolicyDto.Result.PremiumDetails.TotalPremium > cdAccBal) {
            //   setFlagCd(true);
            // } else {
            //   setFlagCd(false);
            // }
          });
        }

        if (value.value === "Cheque") {
          PaymentDetails.TransactionDate = "";
          PaymentDetails.BankName = "";
          PaymentDetails.AccountHolderName = "";
          PaymentDetails.Remarks = "";
          PaymentDetails.BankAccountNumber = "";
          setPaymentDetails({ ...PaymentDetails });
        } else if (value.value === "Cash") {
          PaymentDetails.TransactionDate = "";
          PaymentDetails.ChequeNumber = "";
          PaymentDetails.AccountHolderName = "";
          PaymentDetails.BankName = "";
          PaymentDetails.Remarks = "";
          PaymentDetails.ChequedepositBankName = "";
          PaymentDetails.BankAccountNumber = "";
        }
      } else {
        PaymentDetails.OfflinePayment = "";
        PaymentDetails.TransactionDate = "";
        PaymentDetails.AccountHolderName = "";
        PaymentDetails.ChequeNumber = "";
        PaymentDetails.BankName = "";
        PaymentDetails.Remarks = "";
        PaymentDetails.ChequedepositBankName = "";
        PaymentDetails.BankAccountNumber = "";
      }
    } else if (type === "BankName") {
      if (value !== null) {
        PaymentDetails.BankName = value.mValue;
        setPaymentDetails({ ...PaymentDetails });
      } else {
        PaymentDetails.BankName = "";
        setPaymentDetails({ ...PaymentDetails });
      }
    } else if (type === "ChequedepositBankName") {
      if (value !== null) {
        PaymentDetails.ChequedepositBankName = value.mValue;
        setPaymentDetails({ ...PaymentDetails });
      } else {
        PaymentDetails.ChequedepositBankName = "";
        setPaymentDetails({ ...PaymentDetails });
      }
    }

    if (prod === "Magma") {
      PaymentDetails.OfflinePayment =
        PaymentDetails.PaymentSource === "Offline" ? "CD Account" : "";
      PaymentDetails.PaymentType = PaymentDetails.PaymentSource === "Online" ? "Rayzor Pay" : "";
    } // As of now there is only 1 option in autocomplte of offline payment, naresh told me to  bind the cd Account Defaultly
    // PaymentDetails.PaymentType = PaymentDetails.PaymentSource === "Online" ? OnlinePT : ""; // As of now there is only 1 option in radiobutton, naresh told me to  bind the Razor as Defaultly
    setPaymentDetails({ ...PaymentDetails });
  };

  const handleRadio = async (e) => {
    // setBackDropFlag(true);
    // handleOpen();
    const newValue = { ...PaymentDetails, [e.target.name]: e.target.value };
    setPaymentDetails(newValue);
    let EmailID = "";
    if (prod === "Nepal") {
      EmailID =
        PolicyDto.ProposerDetails["Email ID"] === undefined
          ? PolicyDto.ProposerDetails.EmailId
          : PolicyDto.ProposerDetails["Email ID"];

      const MobileNumber =
        objectPath.get(PolicyDto, "ProposerDetails.Mobile Number") === undefined
          ? PolicyDto.ProposerDetails.MobileNo
          : objectPath.get(PolicyDto, "ProposerDetails.Mobile Number");

      if (EmailID !== "") {
        const jsonValue = {
          communicationId: 147,
          keyType: "BGRProposal",
          key: PolicyDto.ProposalNo !== undefined ? PolicyDto.ProposalNo : PolicyDto.proposalNo,
          stakeHolderDetails: [
            {
              communicationType: "Email",
              stakeholderCode: "CUS",
              communicationValue: EmailID,
            },
          ],
        };

        // const res =
        await EventCommunicationExecution(jsonValue);
        // setBackDropFlag(false);
        // swal.fire({
        //   text: res.data.responseMessage,
        // });
        // console.log("email", typeof EmailID);
      }
      if (MobileNumber !== "") {
        const jsonValue1 = {
          communicationId: 150,
          keyType: "BrokerPortalPolicy",
          key: PolicyDto.ProposalNo !== undefined ? PolicyDto.ProposalNo : PolicyDto.proposalNo,
          stakeHolderDetails: [
            {
              communicationType: "SMS",
              stakeholderCode: "CUS",
              communicationValue: "",
            },
          ],
        };
        // if (newValue === "NepalClearingHouse") {
        await EventCommunicationExecution(jsonValue1);
        // console.log("EventCommunicationExecution", res);
        // setBackDropFlag(false);
        // console.log("EmailID", EmailID);
        if (EmailID === "" && MobileNumber !== "") {
          swal.fire({
            html: `<br>SMS Sent succesfully</br>
                <br>E-Mail not sent as E-Mail ID is not captured in Customer Details Screen</br>`,
          });
        } else if (EmailID !== "" && MobileNumber !== "") {
          swal.fire({
            icon: "success",
            html: `<br>SMS Sent succesfully</br>
                <br>E-Mail Sent succesfully</br>`,
          });
        }
      }
    }
    // }
    // if (prod === "Magma") {
    //   const EmailID = genericPolicyDto.ProposerDetails.EmailId;
    //   if (EmailID !== "") {
    //     const jsonValue = {
    //       communicationId: 167,
    //       keyType: "HDFC",
    //       key: genericPolicyDto.AssignResult.ProposalDetails.proposalNumber,
    //       stakeHolderDetails: [
    //         {
    //           communicationType: "Email",
    //           stakeholderCode: "CUS",
    //           communicationValue: EmailID,
    //         },
    //       ],
    //     };
    //     if (e.target.value === "Rayzor") {
    //       await EventCommunicationExecution(jsonValue).then(async (x) => {
    //         if (x.status === 1) {
    //           swal
    //             .fire({
    //               html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%">
    //               <img src=${magmapayment} alt="success image" style="display: block; margin: 0 auto;">
    //               <tr><td style={{textAlign:"left"}}><strong>  </strong></td></tr>
    //               <tr><td style={{textAlign:"left"}}><strong>Payment link is</strong></td></tr>
    //               <tr><td style={{textAlign:"left"}}><strong>shared successfully</strong></td></tr>

    //             </table></div>`,
    //               showConfirmButton: true,
    //               confirmButtonText: "View All COI(s)",
    //               confirmButtonColor: "red",
    //             })
    //             .then((act) => {
    //               if (act.isConfirmed) {
    //                 Navigate("/MagmaCoiList");
    //               } else {
    //                 return false;
    //               }
    //               return null;
    //             });
    //         }
    //       });
    //     }
    //   }
    // }
    handleClose();
  };
  // const OnEmail = () => {
  //   GenericApi(
  //     "MagmaHospiCash01",
  //     "Magma_HospiCashNotification",
  //     genericPolicyDto.AssignResult
  //   ).then((res) => {
  //     console.log("email", res);
  // setGenericPolicyDto(dispatch, { ...genericPolicyDto, EmailNotification: res });
  //   });
  // };
  console.log("ProductData", ProductData());
  const sty = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
    },
  };

  const setRiPayload = async (x, y, z) => {
    const RiPolicy = {
      "Policy End Date": PolicyDto.PolicyEndDate,
      "Policy Start Date": PolicyDto.PolicyStartDate,
      "Insured Name": PolicyDto.ProposerDetails.InsuredNameEnglish,
      "Line Of Business": "Motor",
      "Class Of Business": "TwoWheeler",
      Currency: "NPR",
      EndorsementNo: x,
    };

    const RiPolicydetails = JSON.stringify(RiPolicy);

    const RiAllocationDtoNew = {
      policyNo: z.toString(),
      productName: PolicyDto.RiProductCode,
      sumInsured: PolicyDto.PremiumDetails.EndorsementPremiumDetails.CollectedSumInsured,

      premiumAmount: y.toString(),

      level: "Product",
      year: "2024",
      basis: "Benefit",
      PolicyDetails: RiPolicydetails,
    };
    console.log("RiAllocationDtoNew", RiAllocationDtoNew);
    RiData = await RiAllocation(RiAllocationDtoNew);

    console.log("RiData", RiData, PolicyDto);
    return RiData;
  };

  const OfflinePaymenthandleChange = async () => {
    // setBackDropFlag(true);
    // const lDto = { ...GetDetails };

    if (genericInfo && genericInfo.Endorsement === undefined) {
      handleOpen();
      const ProductByCode = await GetProductByCode(PolicyDto.ProductCode);
      if (genericInfo && genericInfo.Flow === undefined) {
        const obj1 = {
          Stage: "Proposal",
          Status: "323",
          workFlowId: "81",
          WorkFlowType: "Branch Manager",
        };
        await SavepolicyWFStatus(
          PolicyDto.ProposalNo !== undefined ? PolicyDto.ProposalNo : PolicyDto.proposalNo,
          PolicyDto.ProductCode,
          obj1
        );
        const a = {
          Stage: "Proposal",
          Status: "323",
          WorkFlowType: "Agent",
          wfstageStatusId: "322",
        };
        await SavepolicyWFStatus(
          PolicyDto.ProposalNo !== undefined ? PolicyDto.ProposalNo : PolicyDto.proposalNo,
          PolicyDto.ProductCode,
          a
        );
        localStorage.setItem("wfIDforNepal", 3971);
      }
      const res1 = await GeneratePGUrl(
        ProductByCode.data.productId,
        PolicyDto.ProposalNo !== undefined ? PolicyDto.ProposalNo : PolicyDto.proposalNo,
        PolicyDto.PaymentAmount
      );
      const dto = {
        ...PolicyDto,
        PaymentDetails: {
          PaymentSource: PaymentDetails.PaymentSource,
          PaymentType: PaymentDetails.OfflinePayment,
          PaymentAmount: "",
          TransactionReferenceNumber: "",
          TransactionDate: PaymentDetails.TransactionDate,
          BankName: PaymentDetails.BankName,
          BankCharges: PaymentDetails.BankCharges,
          CashAmount: PaymentDetails.CashAmount,
          ChequeNumber: PaymentDetails.ChequeNumber,
          ChequeIssuedBankName: PaymentDetails.ChequeIssuedBankName,
          AccountHolderName: PaymentDetails.AccountHolderName,
          ChequeDepositBankName: PaymentDetails.ChequedepositBankName,
          Remarks: PaymentDetails.Remarks,
          AccountHolderNumber: PaymentDetails.AccountHolderNumber,
          BankAccountNumber: PaymentDetails.BankAccountNumber,
          DateOfPayment: new Date(),
        },
      };
      if (
        (PolicyDto.Department === "Motor" &&
          (PolicyDto.Product === "MotorCycle" || PolicyDto.Product === "CommercialVehicle")) ||
        (PolicyDto.Department === "Agriculture" &&
          (PolicyDto.Product === "AgriBPC" ||
            PolicyDto.Product === "AgriGoat" ||
            PolicyDto.Product === "Poultry")) ||
        (PolicyDto.Department === "Miscellaneous" &&
          PolicyDto.Product === "TravelMedicalInsurance") ||
        (PolicyDto.Department === "Property" && PolicyDto.Product === "PropertyInsurance")
      ) {
        objectPath.del(dto, "Prefix");
        objectPath.set(
          dto,
          "Prefix",
          dto.ProvinceCode.concat("-", dto.ShortCode, "-", "COL", "-", ",").concat(
            dto.ProvinceCode.concat("/", dto.ShortCode, "/", ",")
          )
        );
        console.log("dto", dto);
        await GenericApi(
          PolicyDto.ProductCode,
          ProductData()[PolicyDto.ProductCode].DispacherName,
          {
            ...dto,
          }
        ).then(async (result1) => {
          const res = await GetProposalByNumber(
            PolicyDto.ProposalNo !== undefined ? PolicyDto.ProposalNo : PolicyDto.proposalNo,
            ProductByCode.data.productId
          );
          await UpdateProposalDetails({ ...res.data[0].policyDetails });
          handleClose();

          if (
            (PolicyDto.Department === "Motor" &&
              (PolicyDto.Product === "MotorCycle" || PolicyDto.Product === "CommercialVehicle")) ||
            (PolicyDto.Department === "Agriculture" &&
              (PolicyDto.Product === "AgriBPC" ||
                PolicyDto.Product === "AgriGoat" ||
                PolicyDto.Product === "Poultry")) ||
            (PolicyDto.Department === "Property" && PolicyDto.Product === "PropertyInsurance")
          ) {
            if (result1?.finalResult?.policyNo !== "") {
              Navigate(`/retail/Payment/SuccessPage?TXNID=${res1.data.paymentRefNo.concat("TP")}`);
            } else {
              Navigate(`/retail/Payment/FailurePage?TXNID=${res1.data.paymentRefNo.concat("TP")}`);
            }
          }
          // if (
          //   PolicyDto.Department === "Agriculture" &&
          //   (PolicyDto.Product === "AgriBPC" ||
          //     PolicyDto.Product === "AgriGoat" ||
          //     PolicyDto.Product === "Poultry")
          // ) {
          //   if (result1.finalResult.id !== "") {
          //     Navigate(`/retail/Payment/SuccessPage?TXNID=${res1.data.paymentRefNo}`);
          //   } else {
          //     Navigate(`/retail/Payment/FailurePage?TXNID=${res1.data.paymentRefNo}`);
          //   }
          // }
          if (
            PolicyDto.Department === "Miscellaneous" &&
            PolicyDto.Product === "TravelMedicalInsurance"
          ) {
            if (result1.finalResult.id !== "") {
              Navigate(`/retail/Payment/SuccessPage?TXNID=${res1.data.paymentRefNo.concat("TP")}`);
            } else {
              Navigate(`/retail/Payment/FailurePage?TXNID=${res1.data.paymentRefNo.concat("TP")}`);
            }
          }
        });
      } else {
        const paymentObj = {
          PaymentDetails: {
            // ChequeAmount: genericPolicyDto.PaymentAmount,
            // InstrumentNo: "",
            // InstrumentDate: PaymentDetails.TransactionDate,
            // BankName: PaymentDetails.BankName,
            transactionNo: res1.data.paymentRefNo,
            paymentSource: PaymentDetails.PaymentSource,
            // OfflinePayment: PaymentDetails.OfflinePayment,
            paymentId: "",
            paymentResponse: {
              InstrumentNo: "",
              InstrumentDate: PaymentDetails.TransactionDate,
              BankName: PaymentDetails.BankName,
              transactionNo: res1.data.paymentRefNo,
              paymentSource: PaymentDetails.PaymentSource,
              OfflinePayment: PaymentDetails.OfflinePayment,
              CheckNumber: PaymentDetails.ChequeNumber,
              Remarks: PaymentDetails.Remarks,
              AccountHolderName: PaymentDetails.AccountHolderName,
            },
          },
          proposalNo:
            PolicyDto.ProposalNo === undefined ? PolicyDto.proposalNo : PolicyDto.ProposalNo,
          policyNo: "",
        };
        // const ProductByCode = await GetProductByCode(PolicyDto.ProductCode);
        const res = await GetProposalByNumber(
          PolicyDto.ProposalNo !== undefined ? PolicyDto.ProposalNo : PolicyDto.proposalNo,
          ProductByCode.data.productId
        );
        await UpdateProposalDetails({ ...res.data[0].policyDetails });
        await SavePolicyPaymentDetails(paymentObj).then(async (result1) => {
          // console.log("11111111111", result1);
          // const txnid = result1.data.policyPaymentSaveDetails.transactionNo;
          handleClose();
          if (result1.status === 200) {
            console.log("TP11111111111111", res1.data.paymentRefNo.concat("TP"));
            Navigate(`/retail/Payment/SuccessPage?TXNID=${res1.data.paymentRefNo.concat("TP")}`);
          } else {
            Navigate(`/retail/Payment/FailurePage?TXNID=${res1.data.paymentRefNo.concat("TP")}`);
          }
        });
      }
    }
    if (genericInfo && genericInfo.Endorsement === true) {
      handleOpen();
      const res1 = await GeneratePGUrl(
        1193,
        PolicyDto.EndorsementNo,
        PolicyDto.PaymentAmount,
        "EndorsementStage"
      );

      await UpdateSequenceNumber(
        "EndorsementPolicyNo".concat(",", "EndoReceiptNo", ",", "EndoTaxInvoiceNo"),
        PolicyDto.EndoPolicyPrefix.concat(
          ",",
          PolicyDto.ProvinceCode,
          "-",
          PolicyDto.ShortCode,
          "-",
          "COL",
          "-",
          ",",
          PolicyDto.ProvinceCode,
          "/",
          PolicyDto.ShortCode,
          "/"
        ),
        "EndorsementPolicyNo".concat(",", "EndoReceiptNo", ",", "EndoTaxInvoiceNo"),
        ",".concat("-", PolicyDto.Channel.FiscalYear, ","),

        {
          ...PolicyDto,
        }
      ).then(async (x) => {
        if (x?.data?.EndorsementPolicyNo) {
          const EndorsementJson = await GetEndorsementJson(PolicyDto.EndorsementNo);
          console.log("GetEndorsementJsonaltaf", EndorsementJson);
          console.log("PolicyDto", PolicyDto);
          // debugger;
          const Riresponse = await setRiPayload(
            x.data.EndorsementPolicyNo,
            EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
              .EndorsementPremiumDetails.EndorsementPremium,
            EndorsementJson.data.finalResult.PolicyNo
          );
          console.log(Riresponse, "Riresponse");
          if (EndorsementJson?.data?.finalResult?.PolicyNo) {
            const Details = {
              PolicyNo: EndorsementJson.data.finalResult.PolicyNo,
              EndorsementDetails: {
                ...EndorsementJson.data.finalResult.EndorsementDetails,
                PremiumDetails: {
                  ...EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails,
                  NetPremium:
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails.NetPremium
                    ) +
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
                        .EndorsementPremiumDetails.EndorsementPremium
                    ),
                  BasicODPremiumPDF:
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
                        .BasicODPremiumPDF
                    ) +
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
                        .EndorsementPremiumDetails.EndorsementBasicPremium
                    ),
                  TotalTPPremiumRTPDF:
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
                        .TotalTPPremiumRTPDF
                    ) +
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
                        .EndorsementPremiumDetails.EndorsementTPPremium
                    ),
                  PoolPremiumforPDF:
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
                        .PoolPremiumforPDF
                    ) +
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
                        .EndorsementPremiumDetails.EndorsementPoolPremium
                    ),
                  ReceiptPremiumPDF:
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
                        .ReceiptPremiumPDF
                    ) +
                    Number(
                      EndorsementJson.data.finalResult.EndorsementDetails.PremiumDetails
                        .EndorsementPremiumDetails.EndorsementReceiptPremium
                    ),
                },
                PaymentDetails: {
                  DateOfPayment: new Date(),
                  PaymentSource: PaymentDetails.PaymentSource,
                  PaymentType: PaymentDetails.OfflinePayment,
                  PaymentAmount: "",
                  TransactionReferenceNumber: "",
                  TransactionDate: PaymentDetails.TransactionDate,
                  BankName: PaymentDetails.BankName,
                  BankCharges: PaymentDetails.BankCharges,
                  CashAmount: PaymentDetails.CashAmount,
                  ChequeNumber: PaymentDetails.ChequeNumber,
                  ChequeIssuedBankName: PaymentDetails.ChequeIssuedBankName,
                  AccountHolderName: PaymentDetails.AccountHolderName,
                  ChequeDepositBankName: PaymentDetails.ChequedepositBankName,
                  Remarks: PaymentDetails.Remarks,
                  AccountHolderNumber: PaymentDetails.AccountHolderNumber,
                  BankAccountNumber: PaymentDetails.BankAccountNumber,
                },
                CreditNoteNo: null,
                EndoTaxInvoiceNo: x.data.EndoTaxInvoiceNo,
                EndoReceiptNo: x.data.EndoReceiptNo,
                EndorsementStageCheck: "",
                EndoPolicyNo: x.data.EndorsementPolicyNo,
              },

              EndorsementType: EndorsementJson.data.finalResult.EndorsementType,
              EndorsementNo: EndorsementJson.data.finalResult.EndorsementNo,
            };

            // debugger;
            console.log("PolicyDto", PolicyDto);
            console.log("Details", Details);
            // Details1 = Details;
            const mergeRi = {
              ...Details,
              MergeRI: RiData.data,
            };
            console.log(
              "lllllll",
              PolicyDto,
              // PolicyDto.EndorsementDetails.ProductCode,
              RiData,
              Details,
              mergeRi
            );
            await GenericApi(PolicyDto.ProductCode, "NepalMotorEndoExtraAccAPI", mergeRi).then(
              async (x1) => {
                console.log(x1, "sssss");
                console.log(x1.data);
              }
            );

            await UpdateEndorsementV2(true, Details).then(async (x1) => {
              if (x1?.endorsementDto?.EndorsementDetails?.EndoPolicyNo) {
                handleClose();
                if (x1.endorsementDto.EndorsementDetails.EndoPolicyNo !== "") {
                  Navigate(
                    `/retail/Payment/SuccessPage?TXNID=${res1.data.paymentRefNo.concat("TE")}`
                  );
                } else {
                  Navigate(
                    `/retail/Payment/FailurePage?TXNID=${res1.data.paymentRefNo.concat("TE")}`
                  );
                }
              } else {
                handleClose();
                swal.fire({
                  icon: "error",
                  text: "Incurred an error please try again later",
                  confirmButtonColor: "#0079CE",
                });
              }
            });

            // const mergeRi = {
            //   ...Details,
            //   mergeRi: riData,
            // };
            // console.log(
            //   "lllllll",
            //   PolicyDto,
            //   PolicyDto.EndorsementDetails.ProductCode,
            //   riData,
            //   Details,
            //   mergeRi
            // );
            // await GenericApi(
            //   PolicyDto.EndorsementDetails.ProductCode,
            //   "NepalMotorEndoExtraAccAPI",
            //   mergeRi
            // ).then((result) => {
            //   console.log("result", result, riData, Details, mergeRi);
            // });
          } else {
            handleClose();
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
          }
        } else {
          handleClose();
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
        }
      });
    }
  };

  const OfflinePayment = async () => {
    if (PaymentDetails.OfflinePayment !== "") {
      if (DebitNoteApprovalStatus !== undefined) {
        swal
          .fire({
            input: "checkbox",
            html: `<div> <img src=${Success} alt="success"></div>`,
            inputAttributes: {
              id: "myCheckbox",
              style: "transform:scale(1.8);",
            },
            width: "680px",
            inputPlaceholder: `<div style=font-size:18px;font-weight:bold;margin-left:5px;">Payment is Received in Offline Mode And Policy Can Be Issued</b>`,
            confirmButtonText: "Proceed",
            allowOutsideClick: false,
            confirmButtonColor: "#0079CE",
            showCloseButton: true,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              if (result.value) {
                OfflinePaymenthandleChange();
              }
            }
            return false;
          });
      } else {
        OfflinePaymenthandleChange();
      }
    } else {
      setErrorFlag(true);
      swal.fire({
        icon: "error",
        text: "Please fill the required fields",
      });
    }
  };

  const Cheque = () => {
    if (
      PaymentDetails.TransactionDate === "" ||
      PaymentDetails.ChequeNumber === "" ||
      PaymentDetails.BankName === "" ||
      PaymentDetails.ChequedepositBankName === ""
    ) {
      setErrorFlag(true);
      swal.fire({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      OfflinePayment();
    }
  };
  const Cash = () => {
    // console.log(123456);
    if (PaymentDetails.TransactionDate === "") {
      setErrorFlag(true);
      swal.fire({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      OfflinePayment();
    }
  };

  // const OnCDLow = () => {
  //   Navigate("/ProposalList");
  // };

  const onCDAccProceed = async () => {
    if (genericPolicyDto.Result.PremiumDetails.TotalPremium > cdAccBal || cdBalance.length === 0) {
      const CDpendingJson = {
        paymentId: 0,
        policyId: 0,
        paidAmount: genericPolicyDto.AssignResult.TotalPremium,
        txnType: "CD",
        remarks: "",
        status: "Pending due to CD",
        createdDate: "",
        updatedDate: "",
        createdBy: "",
        refNo: "",
        txnId: "",
        paymentResponse: "",
        transactionNumber: genericPolicyDto.AssignResult.ProposalDetails.proposalNumber,
      };
      await UpdatePaymentDetailsByProposalNo(
        genericPolicyDto.AssignResult.ProposalDetails.proposalNumber,
        CDpendingJson
      );
      setOpen(false);
      swal
        .fire({
          icon: "error",
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonColor: "red",
          confirmButtonText: "Go To Proposal List",
          html: `<div style="text-align: center; margin-left: 0rem" ">
                      <br/>
                      <div><h3>CD Account doesn't have sufficient balance.</h3></div>
                      <br/>
                      <div><h3>Available CD Balance : ${cdAccBal}</h3></div>
                      <br/>
                      <div><h3>Kindly replenish CD Account to issue the COI.</h3></div>
                  </div>`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/ProposalList";
          }
        });
    } else {
      setOpen(true);
      if (genericPolicyDto.AssignResult.Result) {
        delete genericPolicyDto.AssignResult.Result;
      }

      await GenericApi(
        "MagmaHospiCash01",
        "Magma_HospiCashPolicy",
        genericPolicyDto.AssignResult
      ).then((res) => {
        console.log("policy", res);
        setGenericPolicyDto(dispatch, { ...genericPolicyDto, policyDetails: res });
        // const currentDate = new Date();
        // PaymentDetails.TransactionDate = currentDate.toISOString();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")} ${currentDate
          .getHours()
          .toString()
          .padStart(2, "0")}:${currentDate.getMinutes().toString().padStart(2, "0")}:${currentDate
          .getSeconds()
          .toString()
          .padStart(2, "0")}`;

        PaymentDetails.TransactionDate = formattedDate;
        console.log("payment", PaymentDetails);

        const CDJson = {
          paymentId: 0,
          policyId: 0,
          paidAmount: genericPolicyDto.AssignResult.TotalPremium,
          txnType: "CD",
          remarks: "",
          status: "Completed",
          createdDate: "",
          updatedDate: "",
          createdBy: "",
          refNo: "",
          txnId: "",
          paymentResponse: "",
          transactionNumber: genericPolicyDto.AssignResult.ProposalDetails.proposalNumber,
        };
        UpdatePaymentDetailsByProposalNo(
          genericPolicyDto.AssignResult.ProposalDetails.proposalNumber,
          CDJson
        );
        Navigate(OfflinePT.CDRedirection);
        // Navigate("/retail/Payment/MagmaSuccess");
      });
    }
  };
  const onRazorProceed = async () => {
    if (PaymentDetails.PaymentType === "Rayzor" || PaymentDetails.PaymentType === "Rayzor Pay") {
      handleOpen();

      const EmailID = genericPolicyDto.ProposerDetails.EmailId;
      if (EmailID !== "") {
        const jsonValue = {
          communicationId: 167,
          keyType: "HDFC",
          key: genericPolicyDto.ProposalNo
            ? genericPolicyDto.ProposalNo
            : genericPolicyDto.AssignResult.ProposalDetails.proposalNumber,
          stakeHolderDetails: [
            {
              communicationType: "Email",
              stakeholderCode: "CUS",
              communicationValue: EmailID,
            },
          ],
        };
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          {" "}
          <CircularProgress />{" "}
        </Backdrop>;
        await EventCommunicationExecution(jsonValue).then(async (x) => {
          if (x.status === 1) {
            handleClose();
            swal
              .fire({
                html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%">    
<img src=${magmapayment} alt="success image" style="display: block; margin: 0 auto;">    
<tr><td style={{textAlign:"left"}}><strong>  </strong></td></tr>    
<tr><td style={{textAlign:"left"}}><strong>Payment link is</strong></td></tr>    
<tr><td style={{textAlign:"left"}}><strong>shared successfully</strong></td></tr>    

</table></div>`,
                showConfirmButton: true,
                allowOutsideClick: false,
                confirmButtonText: "View All Proposal(s)",
                confirmButtonColor: "red",
              })
              .then((act) => {
                if (act.isConfirmed) {
                  Navigate("/ProposalList");
                } else {
                  return false;
                }
                return null;
              });
          }
        });
        // }
        // }
      }
      const onlineJson = {
        paymentId: 0,
        policyId: 0,
        paidAmount: genericPolicyDto.AssignResult?.TotalPremium || genericPolicyDto.TotalPremium,
        txnType: "Online",
        remarks: "",
        status: "Payment Pending",
        createdDate: "",
        updatedDate: "",
        createdBy: "",
        refNo: "",
        txnId: "",
        paymentResponse: "",
        transactionNumber:
          genericPolicyDto.AssignResult?.ProposalDetails?.proposalNumber ||
          genericPolicyDto.ProposalNo,
      };
      UpdatePaymentDetailsByProposalNo(
        genericPolicyDto.AssignResult?.ProposalDetails?.proposalNumber ||
          genericPolicyDto.ProposalNo,
        onlineJson
      );
    }
  };
  const onProcced = () => {
    // if (false)
    if (PaymentDetails.PaymentSource !== "") {
      if (PaymentDetails.PaymentSource === "Offline") {
        if (PaymentDetails.OfflinePayment !== "") {
          if (PaymentDetails.OfflinePayment === "Cheque") {
            Cheque();
          }
          if (PaymentDetails.OfflinePayment === "Cash") {
            Cash();
          }
          if (PaymentDetails.OfflinePayment === "CD Account") {
            setOpen(true);
            onCDAccProceed();
          }
        } else {
          setErrorFlag(true);
          swal.fire({
            icon: "error",
            text: "Please fill the required fields",
          });
        }
      } else if (PaymentDetails.PaymentSource === "Online") {
        onRazorProceed();
      } else {
        setErrorFlag(true);
        swal.fire({
          icon: "error",
          text: "Please fill the required fields",
        });
      }
    } else {
      setErrorFlag(true);
      swal.fire({
        icon: "error",
        text: "Please fill the required fields",
      });
    }
  };
  // useEffect(async () => {
  //   // await GetNPCommonMaster().then((x) => {
  //   //   x.forEach((x1) => {
  //   //     if (x1.mType === "PaymentMode") masters.PaymentMode = x1.mdata;
  //   //     if (x1.mType === "PaymentType") masters.PaymentType = x1.mdata;
  //   //     if (x1.mType === "OfflinePayment") masters.OfflinePayment = x1.mdata;
  //   //   });
  //   //   setMasters({ ...masters });
  //   // });
  //   if (prod === "Nepal") {
  //     const res = await GetProposalByNumber(
  //       genericPolicyDto.ProposalNo !== undefined
  //         ? genericPolicyDto.ProposalNo
  //         : genericPolicyDto.proposalNo
  //     );
  //     if (res && res.data && res.data[0].policyDetails) setGetDeatils(res.data[0].policyDetails);
  //   }
  // }, []);
  // console.log("getDtails", GetDetails);

  return (
    <MDBox>
      {/* {!flags.success && ( */}
      <>
        <Grid container spacing={2}>
          {DebitNoteApprovalStatus && DebitNoteApprovalStatus === "true" && (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Debit Note Approval Status"
                value="Approved"
                disabled
                required
                sx={redAsterisk}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              // options={masters.PaymentMode || []}
              options={PaymentMode || []}
              value={{ value: PaymentDetails.PaymentSource }}
              sx={sty}
              getOptionLabel={(option) => option.value}
              onChange={(e, value) => handleSetAutoDate(e, "PaymentSource", value)}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label="Payment Source"
                  error={ErrorFlag && PaymentDetails.PaymentSource === ""}
                  helperText={ErrorFlag && PaymentDetails.PaymentSource === "" ? helperText : ""}
                  required
                  sx={redAsterisk}
                  Inputprops={{
                    disabled:
                      prod === "Magma" &&
                      (paymentStatus === "Payment Pending" ||
                        paymentStatus === "Payment Initiated"),
                  }}
                  disabled={
                    prod === "Magma" &&
                    (paymentStatus === "Payment Pending" || paymentStatus === "Payment Initiated")
                  } // disabled the field when we are come from proposalList with status as Payment Pending or Payment Initiated
                />
              )}
            />
          </Grid>
          {PaymentDetails.PaymentSource === "Offline" && (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                options={OfflinePT.data || []}
                sx={sty}
                value={{ value: PaymentDetails.OfflinePayment }}
                getOptionLabel={(option) => option.value}
                onChange={(e, value) => handleSetAutoDate(e, "OfflinePayment", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Payment Mode"
                    error={ErrorFlag && PaymentDetails.OfflinePayment === ""}
                    helperText={ErrorFlag && PaymentDetails.OfflinePayment === "" ? helperText : ""}
                    required
                    sx={redAsterisk}
                  />
                )}
              />
            </Grid>
          )}
          {PaymentDetails.PaymentSource === "Online" && prod === "Nepal" ? (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <RadioGroup onChange={handleRadio} row>
                {/* {backDropFlag && <CircularProgress backDropFlag />} */}

                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                  onClick={handleClose}
                >
                  {" "}
                  <CircularProgress />{" "}
                </Backdrop>

                {OnlinePT.map((item) => (
                  <FormControlLabel
                    value={item.value}
                    control={<Radio required disabled={item.value === "e-Seva"} />}
                    label={item.label}
                    name="PaymentType"
                  />
                ))}
              </RadioGroup>
            </Grid>
          ) : (
            PaymentDetails.PaymentSource === "Online" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  options={OnlinePT || []}
                  sx={sty}
                  value={{ value: PaymentDetails.PaymentType }}
                  getOptionLabel={(option) => option.value}
                  onChange={(e, value) => handleSetAutoDate(e, "PaymentType", value)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Online Payment"
                      error={ErrorFlag && PaymentDetails.PaymentType === ""}
                      helperText={ErrorFlag && PaymentDetails.PaymentType === "" ? helperText : ""}
                      required
                      sx={redAsterisk}
                      Inputprops={{
                        disabled:
                          prod === "Magma" &&
                          (paymentStatus === "Payment Pending" ||
                            paymentStatus === "Payment Initiated"),
                      }}
                      disabled={
                        prod === "Magma" &&
                        (paymentStatus === "Payment Pending" ||
                          paymentStatus === "Payment Initiated")
                      } // disabled the field when we are come from proposalList with status as Payment Pending or Payment Initiated
                    />
                  )}
                />
              </Grid>
            )
          )}
        </Grid>
        {(PaymentDetails.OfflinePayment === "Cash" ||
          PaymentDetails.OfflinePayment === "Cheque") && (
          <Accordion
            defaultExpanded
            disableGutters
            sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
          >
            <AccordionSummary>
              <MDTypography variant="h6" color="primary">
                Payment Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Payment Amount"
                    name="PaymentAmount"
                    value={OfflinePT && OfflinePT.amount ? OfflinePT.amount : ""}
                    error={ErrorFlag && OfflinePT.amount && OfflinePT.amount === ""}
                    helperText={
                      ErrorFlag && OfflinePT.amount && OfflinePT.amount === "" ? helperText : ""
                    }
                    required
                    sx={redAsterisk}
                    disabled
                  />
                </Grid>
                {PaymentDetails.OfflinePayment === "Cheque" && (
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDInput
                      label="Cheque Number"
                      name="ChequeNumber"
                      value={PaymentDetails.ChequeNumber}
                      onChange={handlePaymentDetails}
                      error={ErrorFlag && PaymentDetails.ChequeNumber === ""}
                      helperText={ErrorFlag && PaymentDetails.ChequeNumber === "" ? helperText : ""}
                      required
                      sx={redAsterisk}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDDatePicker
                    fullWidth
                    options={{
                      dateFormat: "m/d/Y",
                      altFormat: "d/m/Y",
                      altInput: true,
                      minDate: PolicyStartDateMinDate(),
                      maxDate: new Date(),
                    }}
                    input={{
                      label: "Transaction Date",
                      value: PaymentDetails.TransactionDate,
                      error: ErrorFlag && PaymentDetails.TransactionDate === "",
                      helperText:
                        ErrorFlag && PaymentDetails.TransactionDate === "" ? helperText : "",
                      required: true,
                      sx: redAsterisk,
                    }}
                    value={PaymentDetails.TransactionDate}
                    onChange={(e, date) => handleDateChange(e, date)}
                  />
                </Grid>
                {PaymentDetails.OfflinePayment === "Cheque" && (
                  // <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  //   <MDInput
                  //     label="Cheque issued Bank Name"
                  //     name="BankName"
                  //     value={PaymentDetails.BankName}
                  //     onChange={handlePaymentDetails}
                  //     error={ErrorFlag && PaymentDetails.BankName === ""}
                  //     helperText={ErrorFlag && PaymentDetails.BankName === "" ? helperText : ""}
                  //     required
                  //     sx={redAsterisk}
                  //   />
                  // </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <Autocomplete
                      options={BankDetails || []}
                      sx={sty}
                      value={{ mValue: PaymentDetails.BankName }}
                      getOptionLabel={(option) => option.mValue}
                      onChange={(e, value) => handleSetAutoDate(e, "BankName", value)}
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          label="Cheque Issued Bank Name"
                          error={ErrorFlag && PaymentDetails.BankName === ""}
                          helperText={ErrorFlag && PaymentDetails.BankName === "" ? helperText : ""}
                          required
                          sx={redAsterisk}
                        />
                      )}
                    />
                  </Grid>
                )}
                {PaymentDetails.OfflinePayment === "Cash" && (
                  <>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <Autocomplete
                        options={BankDetails || []}
                        sx={sty}
                        value={{ mValue: PaymentDetails.BankName }}
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handleSetAutoDate(e, "BankName", value)}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            label="Bank Name"
                            // error={ErrorFlag && PaymentDetails.BankName === ""}
                            // helperText={
                            //   ErrorFlag && PaymentDetails.BankName === "" ? helperText : ""
                            // }
                            // required
                            // sx={redAsterisk}
                          />
                        )}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Bank Name"
                        name="BankName"
                        value={PaymentDetails.BankName}
                        onChange={handlePaymentDetails}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Bank Account Number"
                        name="BankAccountNumber"
                        value={PaymentDetails.BankAccountNumber}
                        onChange={handlePaymentDetails}
                        sx={redAsterisk}
                      />
                    </Grid>
                  </>
                )}
                {PaymentDetails.OfflinePayment === "Cheque" && (
                  <>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Bank Account Number"
                        name="BankAccountNumber"
                        value={PaymentDetails.BankAccountNumber}
                        onChange={handlePaymentDetails}
                        // sx={redAsterisk}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Account Holder Name"
                        name="AccountHolderName"
                        value={PaymentDetails.AccountHolderName}
                        onChange={handlePaymentDetails}
                        // sx={redAsterisk}
                        onBlur={handleValidaion}
                        error={flag.AccountHolderName === true}
                        helperText={flag.AccountHolderName === true ? "Accept Only Alphabets" : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <Autocomplete
                        options={BankDetails || []}
                        sx={sty}
                        value={{ mValue: PaymentDetails.ChequedepositBankName }}
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) =>
                          handleSetAutoDate(e, "ChequedepositBankName", value)
                        }
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            label="Cheque Deposit Bank Name"
                            error={ErrorFlag && PaymentDetails.ChequedepositBankName === ""}
                            helperText={
                              ErrorFlag && PaymentDetails.ChequedepositBankName === ""
                                ? helperText
                                : ""
                            }
                            required
                            sx={redAsterisk}
                          />
                        )}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Cheque deposit Bank Name"
                        name="ChequedepositBankName"
                        value={PaymentDetails.ChequedepositBankName}
                        onChange={handlePaymentDetails}
                        error={ErrorFlag && PaymentDetails.ChequedepositBankName === ""}
                        helperText={
                          ErrorFlag && PaymentDetails.ChequedepositBankName === "" ? helperText : ""
                        }
                        required
                        sx={redAsterisk}
                      />
                    </Grid> */}
                  </>
                )}
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Remarks"
                    name="Remarks"
                    value={PaymentDetails.Remarks}
                    onChange={handlePaymentDetails}
                    sx={redAsterisk}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDButton variant="outlined" onClick={onProcced}>
                      Proceed
                    </MDButton>
                  </Grid> */}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
        {PaymentDetails.OfflinePayment === "CD Account" && (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="CD Account Number"
                name="CDAccountNumber"
                value={OfflinePT.cdAccDetails.accountNo}
                error={ErrorFlag && OfflinePT.cdAccDetails.accountNo === ""}
                helperText={ErrorFlag && OfflinePT.cdAccDetails.accountNo === "" ? helperText : ""}
                required
              />
            </Grid>

            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="CD Account Balance"
                name="CDAccountBalance"
                value={cdAccBal}
                required
              />
            </Grid> */}

            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={2}>
              <MDButton variant="contained" onClick={() => onCDSearch(OfflinePT.cdAccDetails)}>
                Search
              </MDButton>
            </Grid> */}
          </Grid>
        )}
        {/* {PaymentDetails.PaymentSource === "Offline" && ( */}

        <Stack direction="row" spacing={2} justifyContent="right">
          {/* {FlagCd === false ? ( */}
          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
            <MDButton variant="outlined" onClick={onProcced}>
              {DebitNoteApprovalStatus !== undefined ? "Consent" : "Proceed"}
            </MDButton>
          </MDBox>
          {/* ) : null} */}
          {/* {FlagCd === true ? (
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton variant="outlined" onClick={OnCDLow}>
                Go To Proposal list
              </MDButton>
            </MDBox>
          ) : null} */}
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            {" "}
            <CircularProgress />{" "}
          </Backdrop>
        </Stack>
      </>
      {/* )} */}
    </MDBox>
  );
}

export default PaymentPage;
