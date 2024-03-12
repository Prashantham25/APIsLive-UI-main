// import { IsNumeric } from "../../../../../../Common/Validations";
// import fetchMMasterData from "../data/motorIndex";

import React from "react";
import { Grid, IconButton, Backdrop } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import swal from "sweetalert";
import moment from "moment";
import magmapayment from "assets/images/Magma/magmapayment.png";
import CancelIcon from "@mui/icons-material/Cancel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
import {
  useDataController,
  setClaimsJson,
  setGenericClaimMaster,
  // setGenericClaimMaster,
} from "../../../../../BrokerPortal/context";
import { diffDaysCalculator } from "../../../../../../Common/Validations";

import { GetProdPartnermasterData, getDocumentByType } from "../../data";
import { GetTemplatePayload } from "../../../../../PolicyLive/views/Retail/Payment/Apis";
import MDTypography from "../../../../../../components/MDTypography";
import MDInput from "../../../../../../components/MDInput";
import MDButton from "../../../../../../components/MDButton";
import {
  UploadFiles,
  DeleteFile,
  UpdateClaimDetails,
  master,
  SendNotification,
  EventCommunicationExecution,
  GetUserById,
  GetUsersRoles,
  SaveClaimHistory,
  updateStageStatusIdByTno,
  // DispatcherCallEvent,
  GetPaymentDetails,
  GenericApi,
  SaveBSIV2,
  GetPayLoadByQueryDynamic,
  // GetPaymentDetailByStatus,
  // fetchCommunicationLog,
} from "../../../HealthClaims/data/index";

// import ClaimDetails from "../../../../../BaseSetup/views/Policy/PolicySearch/ClaimDetails";

// import { useEffect } from "react";
// let selectedvalue = [];
let ifscResponseArray = [];
let expense = [];
let query = [];
let denial = [];
let cityDistrictD = [];
const Document = [];
let Upload1 = "";
let flag = false;
const loading = false;

// const UserRoleName = {
//   UserName: "",
//   RoleName: "",
//   Status: "",
//   Remarks: "",
// };
const TemplateStatus = {
  Status: "",
};
let Edit = false;
let Pennydrop = false;
// let PennydropYes = false;
const Paymentdata = {
  slno: "",
  payeeName: "",
  PayeeType: "",
  Payout: "",
  Action: "",
  Approved: "",
  paidAmount: "",
  refNo: "",
  UTRDate: "",
  status: "",
  remarks: "",
};

let ExpenseData = [];
const ExpenseName = [];
let disable = false;
const Resendstatus = {
  ResendStatus: "No",
};

const getTopLevelContent = (navigate) => {
  // const ClaimsJson = GetClaimJson();
  const [controller] = useDataController();
  const { ClaimsJson, policyData } = controller;
  console.log("claimjson", ClaimsJson);
  console.log("policy112", policyData);

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    link.click();
  };

  const handleBack = () => {
    // navigate(`/Claims/Home`, { state: { productCode: "MagmaHospiCash01" } });
    navigate(`/Claims/Home`, { productCode: "MagmaHospiCash01" });
  };

  const isAssign = async () => {
    // debugger;
    const data = {
      key: ClaimsJson.policyNo,
      keyValue: "",
      templateKey: "",
      templateId: 164,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };
    const data1 = await GetTemplatePayload(data).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, ClaimsJson.policyNo);
      }
    });
    console.log("datft", data1);
  };

  const topLevelContent = [
    {
      typeFormat: <ArrowBackIcon />,
      type: "Button",
      label: "Back",
      visible: true,
      variant: "outlined",
      // color: "error",
      spacing: 2,
      customOnChange: () => handleBack(),

      onBlur: false,
      path: "",
    },
    {
      type: "Typography",
      label: "Claim No:",
      name: "claimNo",
      visible: true,
      value: ClaimsJson.claimNumber,
      path: "",
      spacing: 7,
    },
    {
      type: "Button",
      label: "View COI",
      // value: ClaimsJson.claimNumber,
      visible: true,
      variant: "contained",
      // color: "error",
      path: "",
      customOnChange: () => isAssign(),
      onBlur: false,
      typeFormat: <DownloadIcon />,
      spacing: 2,
    },
    {
      type: "Input",
      label: "Claim Number",
      name: "claimNo",
      value: ClaimsJson.claimNumber,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Claim Type",
      name: "claimType",
      value: ["Reimbursement"],
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    // {
    //   type: "AutoComplete",
    //   label: "Gender",
    //   visible: true,
    //   name: "gender",
    //   // value: claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit,
    //   // path: "benefitDetails",
    //   option: GenericClaimsMaster.Gender,
    // },
    {
      type: "Input",
      label: "Member ID",
      name: "memberId",
      value: ClaimsJson.claimBasicDetails.memberDetails.memberId,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "memberDetails",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Patient Name",
      name: "insuredName",
      value: ClaimsJson.claimBasicDetails.memberDetails.insuredName,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Age",
      name: "age",
      value: policyData.ProposerDetails.Age,

      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Masterpolicy Holder Name",
      name: "name",
      value: ClaimsJson.claimBasicDetails.masterpolicyHolderName,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "COI Holder Name",
      name: "name",
      value: policyData.ProposerDetails.Name,

      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Employee ID",
      name: "empId",
      // value: Obj.insuredName,
      value:
        policyData.MasterPolicyDetails[0].masterPolicyDetails.PolicyCoverType ===
        "Employer-Employee"
          ? policyData.InsurableItem[0].RiskItems[0].FamilyID
          : "",
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "Input",
      label: "COI No",
      name: "policyNo",
      value: ClaimsJson.policyNo,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 3,
    },
    {
      type: "DateTime",
      label: "COI Start Date",
      visible: true,
      name: "PolicyStartDate",
      value: policyData.PartnerDetails.PolicyStartDate,
      path: "hospitalizationDetails",
      InputProps: { readOnly: true },
      spacing: 3,
    },
    {
      type: "DateTime",
      label: "COI End Date",
      name: "policyEndDate",
      value: policyData.PartnerDetails.PolicyEndDate,
      visible: true,
      InputProps: { readOnly: true },
      spacing: 3,
    },
  ];
  return topLevelContent;
};
const getBottomContent = (
  ClaimsJson,
  id,
  setIds,
  i,
  handleMenu,
  setEdit,
  edit,
  GenericClaimsMaster,
  dispatch,
  navigate,
  // loading,
  setLoading
  // payment,
  // setPayment
) => {
  console.log("index1", GenericClaimsMaster);
  console.log("idsss", i);
  const [controller] = useDataController();
  const { policyData } = controller;
  // if (i === "Bank Details") {
  //   const pload = {
  //     reportname: "Magma_ClaimViewCoverage",
  //     paramList: [
  //       {
  //         parameterName: "ClaimNumber",
  //         parameterValue: ClaimsJson.claimNumber,
  //       },
  //     ],
  //   };

  //   const coverageDetails = GetPayLoadByQueryDynamic(pload);

  //   Viewcoverage = coverageDetails.data.finalResult;

  //   console.log("rs", coverageDetails);
  // }
  const handleContinue = async () => {
    const ClaimsJsonL = ClaimsJson;
    if (ClaimsJsonL.claimFields === "Approve") {
      const Data = {
        PolicyNumber: ClaimsJsonL.claimBasicDetails.policyDetails.PolicyNumber,
        CoverName: ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName,
        BenefitName: "Normal",
        Unit: "",
        ClaimedFor: ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays,
        ClaimedAmount:
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount,
        RiskItemId: ClaimsJsonL.claimBasicDetails.memberDetails.memberId,
        RiskItemIdType: "UHID",
      };
      // debugger;
      const SaveBSIResponse = await SaveBSIV2(Data);
      console.log("saveBSI", SaveBSIResponse);

      if (id === 1) {
        setIds(id + 1);
        handleMenu(id + 1);
      }
    }
    // let today = new Date();
    // let dd = today.getDate();
    // let mm = today.getMonth() + 1;
    // const yyyy = today.getFullYear();
    // if (dd < 10) {
    //   dd = `0${dd}`;
    // }
    // if (mm < 10) {
    //   mm = `0${mm}`;
    // }
    // today = `${yyyy}-${mm}-${dd}`;
    // const APIRequest = {
    //   TxnObject: {
    //     transferPaymentRequest: {
    //       subHeader: {
    //         requestUUID: ClaimsJson.claimNumber,
    //         serviceRequestId: "",
    //         serviceRequestVersion: "",
    //         channelId: "",
    //       },
    //       transferPaymentRequestBodyEncrypted: {
    //         channelId: "",
    //         corpCode: "",
    //         paymentDetails: [
    //           {
    //             txnPaymode: "PA",
    //             custUniqRef: ClaimsJson.claimBasicDetails.memberDetails.memberId,
    //             corpAccNum: "",
    //             valueDate: today,
    //             txnAmount: "1.00",
    //             beneLEI: "",
    //             beneName: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.payeeName,
    //             beneCode: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
    //             beneAccNum:
    //               ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
    //             beneAcType: "",
    //             beneAddr1: "",
    //             beneAddr2: "",
    //             beneAddr3: "",
    //             beneCity:
    //               ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
    //             beneState:
    //               ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
    //             benePincode:
    //               ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails
    //                 .hospitalPincode,
    //             beneIfscCode:
    //               ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
    //             beneBankName:
    //               ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
    //             baseCode: "",
    //             chequeNumber: "",
    //             chequeDate: "",
    //             payableLocation: "",
    //             printLocation: "",
    //             beneEmailAddr1: policyData.ProposerDetails.EmailId,
    //             beneMobileNo: policyData.ProposerDetails.MobileNo,
    //             productCode: "",
    //             txnType: "",
    //             invoiceDetails: [
    //               {
    //                 invoiceAmount: "",
    //                 invoiceNumber: "",
    //                 invoiceDate: "",
    //                 cashDiscount: "",
    //                 tax: "",
    //                 netAmount: "",
    //                 invoiceInfo1: "",
    //                 invoiceInfo2: "",
    //                 invoiceInfo3: "",
    //                 invoiceInfo4: "",
    //                 invoiceInfo5: "",
    //               },
    //             ],
    //             enrichment1: "",
    //             enrichment2: "",
    //             enrichment3: "",
    //             enrichment4: "",
    //             enrichment5: "",
    //             senderToReceiverInfo: "",
    //           },
    //         ],
    //         checksum: "",
    //       },
    //     },
    //   },
    //   TxnDetails: true,
    // };
    // await DispatcherCallEvent(APIRequest);

    // const result = await GetPaymentDetails(ClaimsJson.claimNumber);
    // console.log("resultss", result);
    // ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails =
    //   result.data.finalResult.map((rows, index) => ({
    //     ...rows,
    //     slno: index + 1,
    //     payeeName: ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.payeeName,
    //     Payout:
    //       ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpensePayout,
    //   }));

    // setClaimsJson(dispatch, { ...ClaimsJsonL });
    // const res2 = await UpdateClaimDetails(ClaimsJsonL);
    // console.log("result22", res2);
  };

  console.log("paymentresu", ClaimsJson);

  const userNameId = localStorage.getItem("userId");
  console.log("usernamess", userNameId);
  const claims = GenericClaimsMaster.ClaimStatus;
  console.log("claimss12", claims);
  const handleTrackClaims = () => {
    navigate(`/Claims/Home`, { productCode: "MagmaHospiCash01" });
  };
  const Medical = localStorage.getItem("roleId");

  const handleSave = async () => {
    // debugger;
    setLoading(true);
    // Loading = true;
    if (
      Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c" &&
      ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode === "" &&
      ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.bankName === "" &&
      ClaimsJson.claimFields === "Approve"
    ) {
      setLoading(false);
      swal({
        html: true,
        icon: "warning",
        // title: "Claim Intimated Successful",
        text: " Bank name not available in Bank Master",
      });
    } else {
      if (ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName !== "") {
        const data = {
          HospitalName:
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          District:
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
          Pincode:
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
        };
        const data2 = { ProductId: 1022, PartnerId: 0, MasterType: "BlackListedHospital" };
        const res = await master(
          data2.ProductId,
          data2.PartnerId,
          data2.MasterType,

          data
        );
        console.log("abc", res);
        if (res.status === 200 && res.data.length > 0) {
          res.data.forEach((x) => {
            if (
              x.HospitalName ===
              ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName
            ) {
              Swal.fire({
                icon: "error",
                text: " This hospital is Blacklisted",
                confirmButtonColor: "#0079CE",
              });
            }
            return null;
          });
        }
      }

      let abc = {};
      abc = { ...abc, ...ClaimsJson };
      delete abc.transactionDataDTO[0].transactionDetails.hospitalDetails.pin;
      delete abc.claimBasicDetails.benefitDetails;

      if (abc.claimStatusId === 123) {
        // if (abc.transactionDataDTO[0].transactionDetails.investigatorDetails[0].index) {
        //   delete abc.transactionDataDTO[0].transactionDetails.investigatorDetails;

        abc.transactionDataDTO[0].transactionDetails.investigatorDetails = [
          ...abc.transactionDataDTO[0].transactionDetails.investigatorDetails,
          { ...abc.transactionDataDTO[0].transactionDetails.Investigator },
        ];

        claims.forEach((X) => {
          if (X.mValue === "Claim Investigated") {
            abc.claimStatusId = X.mID;
            abc.claimStatus = X.mValue;
          }
        });
        setClaimsJson(dispatch, { ...abc });
      }

      // if (ClaimsJson.claimFields === "Refer to Medical Adjudicator") {
      const RoleName = await GetUsersRoles(userNameId);
      console.log("rolenamee", RoleName);

      const userName = await GetUserById(userNameId);
      const userid = `${userName.data.userDetails[0].firstName} ${userName.data.userDetails[0].lastName}`;

      abc.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Remarks =
        abc.transactionDataDTO[0].remark;
      abc.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName = userid;
      // abc.claimBasicDetails.memberDetails.insuredName;
      RoleName.data.forEach((x) => {
        abc.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName = x.mValue;
      });
      abc.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status = abc.claimStatus;
      // }
      if (ClaimsJson.claimFields === "Query" || ClaimsJson.claimFields === "Deny") {
        // const RoleName = await GetUsersRoles(userNameId);
        // console.log("rolenamee", RoleName);
        RoleName.data.forEach((x) => {
          abc.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName = x.mValue;
        });
        // const userName = await GetUserById(userNameId);
        // const userid = `${userName.data.userDetails[0].firstName} ${userName.data.userDetails[0].lastName}`;
        // console.log("userid", userid);
        abc.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName = userid;
        //   abc.claimBasicDetails.memberDetails.insuredName;
        abc.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
          abc.claimStatus;
        abc.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Remarks =
          abc.transactionDataDTO[0].remark;
        TemplateStatus.Status = abc.claimStatus;
        if (abc.transactionDataDTO[0].transactionDetails.templateDetails[0].Status !== "") {
          abc.transactionDataDTO[0].transactionDetails.templateDetails.push(TemplateStatus);
        }
        if (abc.transactionDataDTO[0].transactionDetails.ResendFlag[0].ResendStatus !== "") {
          abc.transactionDataDTO[0].transactionDetails.ResendFlag.push(Resendstatus);
        }

        setClaimsJson(dispatch, { ...abc });
        // console.log("userrolename", UserRoleName);
      }
      if (ClaimsJson.claimFields === "Approve") {
        if (
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer !==
            "0" &&
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer !== ""
          // abc.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1
        ) {
          // debugger;
          const beneficialName = abc.transactionDataDTO[0].transactionDetails.paymentObj.payeeName;
          const name = beneficialName.split(" ").join("");

          const obj1 = {
            slno:
              ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.length +
              1,
            payeeName: name,
            // txnType: Paymentdata.txnType,
            PayeeType: abc.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment,
            Payout: "Claims Payout",
            Approved:
              ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer,
            paidAmount: "NA",

            refNo: "NA",
            UTRDate: "",
            status: "NA",
            remarks: "NA",
            Action: "",
            name: "Customer",
          };

          // Add obj1 to PaymentDetails

          Paymentdata.Payout = "Claims Payout";

          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.push(obj1);
        } else if (
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier !==
            "0" &&
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier !== ""
        ) {
          // debugger;
          const beneficialName =
            abc.transactionDataDTO[0].transactionDetails.financierDetails.FinancierName;
          const name = beneficialName.split(" ").join("");
          const obj2 = {
            slno:
              ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.length +
              1,
            payeeName: name,
            // ClaimsJson.transactionDataDTO[0].transactionDetails.financierDetails.FinancierName,
            // txnType: Paymentdata.txnType,
            PayeeType: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment,
            Payout: "Claims Payout",
            Approved: Paymentdata.Approved,
            paidAmount: "NA",
            refNo: "NA",
            UTRDate: "",
            status: "NA",
            remarks: "NA",
            Action: "",
            name: "Financier",
          };

          Paymentdata.Payout = "Claims Payout";

          // Add obj2 to PaymentDetails
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.push(obj2);
        }
        if (ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1) {
          abc.transactionDataDTO[0].transactionDetails.investigatorDetails.forEach((x, iddx) => {
            Paymentdata.payeeName =
              abc.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1 &&
              abc.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
                .VerifiedInvestigator === "Yes"
                ? x.InvestigatorName
                : "";
            Paymentdata.PayeeType =
              abc.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment;
            Paymentdata.slno =
              ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.length +
              1;
            Paymentdata.UTRDate = "";
            Paymentdata.refNo = "NA";
            Paymentdata.paidAmount = "NA";
            Paymentdata.status = "NA";
            Paymentdata.remarks = "NA";
            Paymentdata.Approved =
              abc.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1 &&
              abc.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
                .VerifiedInvestigator === "Yes"
                ? abc.transactionDataDTO[0].transactionDetails.expenseDetails[iddx]
                    .TotalExpenseAmount
                : "";

            // if (ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1) {
            Paymentdata.Payout = "Expense Payout";
            // } else {
            //   Paymentdata.Payout = "Claims Payout";
            // }

            // Paymentdata.Payout =
            // Paymentdata.Payout=abc.transactionDataDTO[0].transactionDetails.ExpensePayout transactionDataDTO[0].transactionDetails.expenseDetails
            // if (abc.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.length === 0) {
            //   ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.push(
            //     Paymentdata
            //   );
            // } else if (
            //   abc.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.length > 0
            // ) {
            //   ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails = [
            //     ...abc.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails,
            //     { ...Paymentdata },
            //   ];
            // }

            abc.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails = [
              ...abc.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails,
              { ...Paymentdata },
            ];

            console.log("abc", abc);
          });
        }
        setClaimsJson(dispatch, { ...abc });
        console.log("cba", abc);

        const res2 = await UpdateClaimDetails(abc);
        if (res2.status === 1) {
          setLoading(false);
          Swal.fire({
            html: `<img src=${magmapayment} alt="success image" style="display: block; margin: 0 auto;">
        <p style="color: green; font-weight: bold; margin: 10px 0;">
        Claim details Updated Successfully
        </p>`,
            showConfirmButton: true,
            confirmButtonColor: "#d33",
            allowOutsideClick: false,
            width: 600,
            alignItems: "center",
            confirmButtonText: "Continue",
          }).then((res1) => {
            if (res1.isConfirmed) {
              handleContinue();
            }
          });
          const save1 = await updateStageStatusIdByTno(
            res2.finalResult.transactionDataDTO[0].transactionNumber,
            res2.finalResult.claimStatusId
          );
          console.log("save1", save1);
          const data = {
            TransactionNumber: res2.finalResult.transactionDataDTO[0].transactionNumber,
            CreatedBy: userNameId,
          };
          await SaveClaimHistory(data);
        } else {
          swal({
            html: true,
            icon: "error",
            title: "Something went wrong!",
            // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
          });
        }
      } else {
        const res = await UpdateClaimDetails(abc);
        if (res.status === 1) {
          const save1 = await updateStageStatusIdByTno(
            res.finalResult.transactionDataDTO[0].transactionNumber,
            res.finalResult.claimStatusId
          );
          console.log("save1", save1);
          const data = {
            TransactionNumber: res.finalResult.transactionDataDTO[0].transactionNumber,
            CreatedBy: userNameId,
          };
          await SaveClaimHistory(data);

          if (
            ClaimsJson.claimFields === "Query" ||
            ClaimsJson.claimFields === "Query+Investigation"
          ) {
            const ClaimQuery = {
              communicationId: 229,
              keyType: "Claims",
              key: res.finalResult.claimNumber,
              stakeHolderDetails: [
                {
                  communicationType: "Email",
                  stakeholderCode: "CUS",
                  communicationValue: policyData.ProposerDetails.EmailId,
                },
              ],
            };

            await EventCommunicationExecution(ClaimQuery);
            const claimsms = {
              communicationId: 241,
              keyType: "MagmaHealth",
              key: res.finalResult.claimNumber,
              stakeHolderDetails: [
                {
                  communicationType: "SMS",
                  stakeholderCode: "CUS",
                  communicationValue: policyData.ProposerDetails.MobileNo,
                },
              ],
            };

            await EventCommunicationExecution(claimsms);
          } else if (ClaimsJson.claimFields === "Deny") {
            const ClaimDeny = {
              communicationId: 239,
              keyType: "Claims",
              key: res.finalResult.claimNumber,
              stakeHolderDetails: [
                {
                  communicationType: "Email",
                  stakeholderCode: "CUS",
                  communicationValue: policyData.ProposerDetails.EmailId,
                },
              ],
            };

            await EventCommunicationExecution(ClaimDeny);

            const claimdenysms = {
              communicationId: 243,
              keyType: "MagmaHealth",
              key: res.finalResult.claimNumber,
              stakeHolderDetails: [
                {
                  communicationType: "SMS",
                  stakeholderCode: "CUS",
                  communicationValue: policyData.ProposerDetails.MobileNo,
                },
              ],
            };

            await EventCommunicationExecution(claimdenysms);
          }
          // }
          // if (result.status === 1) {
          setLoading(false);
          Swal.fire({
            html: `<img src=${magmapayment} alt="success image" style="display: block; margin: 0 auto;">
        <p style="color: green; font-weight: bold; margin: 10px 0;">
        Claim details Updated Successfully
        </p>`,
            showConfirmButton: true,
            confirmButtonColor: "#d33",
            allowOutsideClick: false,
            width: 600,
            alignItems: "center",
            confirmButtonText: "Go to Home",
          }).then((res1) => {
            if (res1.isConfirmed) {
              handleTrackClaims();
            }
          });
        } else {
          swal({
            html: true,
            icon: "error",
            title: "Something went wrong!",
          });
        }
        console.log("result", res);
      }
    }
  };

  const handleNext = () => {
    Edit = true;
    if (id === 0) {
      setIds(id + 1);
      handleMenu(id + 1);
    }
    console.log("editing", edit);
  };

  const handleEdit = () => {
    if (id === 0) {
      Edit = false;
      setIds(id);
      handleMenu(id);
    }
  };

  // return (
  // <Grid>
  //   <div>
  //     {loading ? (
  //       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
  //         <CircularProgress color="inherit" />
  //       </Backdrop>
  //     ) : null}
  //   </div>
  // </Grid>

  const data = [
    {
      type: "Button",
      label: "Edit",
      visible: id === 0 && Medical !== "e78d443a-1784-4be0-a8a9-0c17654e9f15",
      // color: "error",
      variant: "outlined",
      spacing: 1,
      customOnChange: () => handleEdit(),
      onBlur: false,
      // InputProps: { readOnly: true },
    },
    {
      type: "Button",
      label: "Save",
      visible: id === 0,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      color: "error",
      spacing: 1,
      customOnChange: (e) => handleNext(e),
      onBlur: false,
      // InputProps: { readOnly: true },
    },
    {
      type: "Button",
      label: "Submit",
      visible: id === 1,
      // visible: id === "Hospital Details",
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      color: "error",
      spacing: 1,
      customOnChange: (e) => handleSave(e),
      onBlur: false,
      InputProps: disable === true ? { readOnly: true } : { readOnly: false },
    },
  ];
  return data;
};

const getMenuList = (ClaimsJson, ids) => {
  console.log("claimsMenu", ids);
  const menus = [
    {
      name: "Bank Details",
      disabled: false,
      visible: true,
      background: "#F72331",
      fontColor: "#000000",
    },
    {
      name: "Claim Details",
      disabled: false,
      visible: true,
      background: "#F72331",
      fontColor: "#000000",
    },
    {
      name: "Payment Details",
      disabled: false,
      visible: ClaimsJson.claimFields === "Approve" || ClaimsJson.claimStatusId === 115,
      background: "#F72331",
      fontColor: "#000000",
      apiList: [
        {
          url: `ClaimManagement/GetPaymentDetailsByClaimNumber?claimnumber=${ClaimsJson.claimNumber}`,
          data: {
            claimnumber: ClaimsJson.claimNumber,
          },
          MethodType: "GET",
          claimnumber: ClaimsJson.claimNumber,
        },
      ],
      // visible: true,
    },
    {
      name: "View Coverages",
      disabled: false,
      visible: true,
      background: "#F72331",
      fontColor: "#000000",
    },
    {
      name: "View Document",
      disabled: false,
      visible: true,
      background: "#F72331",
      fontColor: "#000000",
    },
    {
      name: "Audit Log",
      disabled: false,
      visible: true,
      background: "#F72331",
      fontColor: "#000000",
    },
    {
      name: "Expense Payment",
      disabled: false,
      visible:
        ClaimsJson.claimStatusId === 232 ||
        ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1,
      background: "#F72331",
      fontColor: "#000000",
    },
    {
      name: "Validation Details",
      disabled: false,
      visible: ClaimsJson.claimFields === "Approve" || ClaimsJson.claimStatusId === 115,
      background: "#F72331",
      fontColor: "#000000",
    },
  ];
  return menus;
};

const getMenuContent = (id, ClaimsJson) => {
  let accordians = [];
  switch (id) {
    case 0:
      accordians = [
        { label: "Bank Details", visible: true },
        { label: "Financier Details", visible: true },
      ];
      break;
    case 1:
      accordians = [
        // "Claim Details",
        { label: "Hospital Details", visible: true },
        { label: "Ailment Details", visible: true },
        { label: "Benefit Details", visible: true },
        { label: "Pay-out Option", visible: true },
        {
          label: "Expense Payout",
          visible:
            ClaimsJson.claimStatusId === 232 ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1,
        },
        {
          label: "Claim Action",
          // visible: ClaimsJson.claimStatusId !== "Assigned to Investigation",
          visible: ClaimsJson.claimStatusId !== 123,
        },
        {
          label: "Investigation Closure Details",
          // visible: ClaimsJson.claimStatusId === "Assigned to Investigation",
          visible: ClaimsJson.claimStatusId === 123,
        },
        // "Hospital Details",
        // "Ailment Details",
        // "Benefit Details",
        // "Pay-out Option",
        // "Expense Payout",
        // "Claim Action",
        // "Investigation Closure Details",
      ];
      break;
    case ClaimsJson.claimFields === "Approve" ||
    ClaimsJson.claimStatusId === 115 ||
    ClaimsJson.claimStatus === "Claim Approved" ||
    ClaimsJson.claimStatusId === "115"
      ? 2
      : -1:
      accordians = [
        {
          label: "Payment Details",
          // visible: true,
          visible:
            ClaimsJson.claimFields === "Approve" ||
            ClaimsJson.claimStatusId === 115 ||
            ClaimsJson.claimStatusId === "115",
        },
      ];
      break;
    case ClaimsJson.claimFields === "Approve" ||
    ClaimsJson.claimStatusId === "115" ||
    ClaimsJson.claimStatus === "Claim Approved" ||
    ClaimsJson.claimStatusId === 115
      ? 3
      : 2:
      accordians = [
        // "View Coverage Details"
        { label: "View Coverage Details", visible: true },
      ];
      break;
    case ClaimsJson.claimFields === "Approve" ||
    ClaimsJson.claimStatusId === "115" ||
    ClaimsJson.claimStatus === "Claim Approved" ||
    ClaimsJson.claimStatusId === 115
      ? 4
      : 3:
      accordians = [
        // "View Document"
        { label: "View Document", visible: true },
      ];
      break;
    // case 5:
    //   accordians = ["Validation"];
    //   break;
    case ClaimsJson.claimFields === "Approve" ||
    ClaimsJson.claimStatusId === "115" ||
    ClaimsJson.claimStatus === "Claim Approved" ||
    ClaimsJson.claimStatusId === 115
      ? 5
      : 4:
      accordians = [
        // "Audit Logs"
        { label: "Audit Logs", visible: true },
      ];
      break;
    case ClaimsJson.claimFields === "Approve" ||
    ClaimsJson.claimStatusId === "115" ||
    ClaimsJson.claimStatus === "Claim Approved" ||
    ClaimsJson.claimStatusId === 115 ||
    ClaimsJson.claimStatusId === 123
      ? 6
      : 5:
      accordians = [{ label: "Expense Payment", visible: true }];
      break;
    case ClaimsJson.claimFields === "Approve" ||
    ClaimsJson.claimStatusId === "115" ||
    ClaimsJson.claimStatus === "Claim Approved" ||
    ClaimsJson.claimStatusId === 115
      ? 7
      : 6:
      accordians = [{ label: "Validation Details", visible: true }];
      break;
    default:
      accordians = [];
      break;
  }
  return accordians;
};

function getAccordianContents(
  x,
  ClaimsJson,
  policyJson,
  GenericClaimsMaster,
  dispatch,
  // setPolicyJson,
  ids,
  // audit,
  // setAudit,
  handleMenu
  // setLoading

  // selectedvalue
  // payment,
  // setPayment
  // xid
) {
  // handleMenu();
  console.log("handleemenu", handleMenu);
  // let audituser = "";
  // audit.forEach((x1) => {
  //   audituser = JSON.parse(x1.bodyText);
  // });
  // console.log("userRoleid", audituser);
  console.log("iddddd", ids);
  console.log("GenericClaimsMaster", GenericClaimsMaster.CriticalIllness);
  const cc = [];
  // const cityMaster = [...GenericClaimsMaster.CityDistrict_Name];

  // console.log("cityMaster", cityMaster);

  const Medical = localStorage.getItem("roleId");

  if (
    ClaimsJson.claimStatusId === 232 ||
    ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1
  ) {
    // if (
    //   abc.transactionDataDTO[0]?.transactionDetails?.investigatorDetails &&
    //   abc.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1
    // ) {
    // debugger;
    ExpenseData = ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails.map(
      (x2, ind) => ({ mValue: x2.claimDescription, id: ind, Name: x2.InvestigatorName })
    );

    // ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails.forEach((y1, id) => {
    ExpenseData.forEach((y1) => {
      ClaimsJson.transactionDataDTO[0].transactionDetails.expenseDetails.forEach((z1) => {
        // debugger;
        if (y1.mValue === z1.ExpensePayout) {
          ExpenseName.push(y1.Name);
        }
      });
    });
    console.log("ExpenseName", ExpenseName);
  }

  console.log("roleIdd", Medical);
  const ClaimAction = [{ mID: 1, mValue: "Refer to Medical Adjudicator" }];

  const Decisioncategory = [
    { mID: 1, mValue: "Fraud" },
    { mID: 2, mValue: "Genuine" },
    { mID: 3, mValue: "Others" },
  ];

  GenericClaimsMaster.CriticalIllness.forEach((xq, index) => {
    if (index < 9) {
      cc.push(xq);
    }
  });

  // const [, dispatch] = useDataController();

  const ClaimsJsonL = ClaimsJson;
  const Policydata = policyJson;
  console.log("policyjson1", Policydata);
  const assignValueId = async (e, d, name) => {
    // loading = true;
    if (name === "DateOfDischarge") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod = d;
      setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
    }
    if (name === "DateOfAddmission") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = d;
      setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
    }
    if (
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !== "" &&
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa !== ""
    ) {
      const lengthOfStay = diffDaysCalculator(
        new Date(ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa),
        new Date(ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod)
      );
      if (
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !== "" ||
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa !== ""
      ) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay =
          lengthOfStay;
        if (
          ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible <=
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay
        ) {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails
              .lengthOfStay -
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays = "0";
          // Policydata.Benefit[0].Deductible;
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        } else {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = 0;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays = "0";
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        }
        const claimCalculator = await GenericApi(
          "MagmaHospiCash01",
          "MagmaClaimsCalculator_V1",
          ClaimsJsonL
        );
        console.log("claimCalculator", claimCalculator);
        if (claimCalculator.responseMessage === "Success") {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount =
            claimCalculator.finalResult.PayoutAmount;
          // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
          //   claimCalculator.finalResult.NormalPayoutCombined;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier =
            claimCalculator.finalResult.FinancierPayout;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer =
            claimCalculator.finalResult.CustomerPayout;
        }
        if (claimCalculator.finalResult.HospitalisatonCriteria === "Separate") {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
            claimCalculator.finalResult.NormalPayoutSeparate;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
            claimCalculator.finalResult.ICUPayoutSeparate;
        } else {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
            claimCalculator.finalResult.NormalPayoutCombined;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
            claimCalculator.finalResult.ICUPayoutCombined;
        }
      }
      // if (
      //   (ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer ===
      //     "0" &&
      //     ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier ===
      //       "0") ||
      //   (ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer ===
      //     "" &&
      //     ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier ===
      //       "")
      // ) {
      //   Swal.fire({
      //     icon: "error",
      //     text: "claim can not be approved as payable amount is 0",
      //     confirmButtonColor: "#0079CE",
      //   });
      // }
      setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
      console.log("lengthOfStay", lengthOfStay);
    }

    setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
    // loading = false;
  };

  // const pinCodeMasterArray = [];
  // console.log("pin", pinCodeMasterArray);
  // const handleInput = async (e) => {
  //   const data1 = {
  //     productId: 1022,
  //   };

  //   if (e.target.name === "hospitalCity") {
  //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity =
  //       e.target.value;
  //     setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
  //   }

  //   setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
  //   const citymas = {
  //     CityDistrict_Name:
  //       ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
  //   };
  //   const cityMasterResponse = await GetProdPartnermasterData(
  //     data1.productId,
  //     "CityMaster",
  //     citymas
  //   );
  //   console.log("cityMasterResponse", cityMasterResponse);
  //   if (cityMasterResponse.status === 200) {
  //     const DataArray = cityMasterResponse.data;
  //     // const cityIds = DataArray.map((xt) => xt.CityDistrict_Id);
  //     const stateId = DataArray.map((xt) => xt.State_Id);

  //     // const cityDistrict = {
  //     //   City_Id: cityIds[0],
  //     // };
  //     const stateResponse = {
  //       State_id: stateId[0],
  //     };
  //     const stateRes = await GetProdPartnermasterData(
  //       data1.productId,
  //       "StateMaster",
  //       stateResponse
  //     );
  //     console.log("stateRes", stateRes);
  //     if (stateRes.status === 200) {
  //       // Assuming this should be a single value, not a map
  //       ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState =
  //         stateRes.data[0].mValue;

  //       setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
  //     }

  //     // const PincodeResponse = await GetProdPartnermasterData(
  //     //   data1.productId,
  //     //   "PincodeMaster",
  //     //   cityDistrict
  //     // );
  //     // console.log("PincodeResponse", PincodeResponse);

  //     // if (PincodeResponse.status === 200) {

  //     //   for (const xt of PincodeResponse.data) {

  //     //     pinCodeMasterArray.push(xt.mValue);
  //     //   }
  //     // }
  //   }

  //   return true;
  // };
  const handleState = async (e, value, name) => {
    if (name === "hospitalState") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState =
        value.mValue;
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity = "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode = "";
      // setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      setClaimsJson(dispatch, { ...ClaimsJsonL });

      const citymas = {
        State: ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
      };
      const data1 = {
        productId: 1022,
      };
      const sr = await master(data1.productId, "State", citymas);
      console.log("sr", sr);
      if (sr.status === 200) {
        const DataArray = sr.data;
        const cityIds = DataArray.map((xt) => xt.mValue);
        // const stateId = DataArray.map((xt) => xt.State_Id);

        const cityDistrict1 = {
          State_Id: cityIds[0],
        };
        // const stateResponse = {
        //   State_id: stateId[0],
        // };
        const stateRes = await master(data1.productId, "City", cityDistrict1);
        console.log("stateRes", stateRes);
        if (stateRes.status === 200) {
          const arr = [];
          stateRes.data.filter((xi) => {
            cityDistrictD = [...GenericClaimsMaster.CityDistrict_Name];
            cityDistrictD.forEach((y) => {
              if (xi.CityDistrictName === y.mValue) {
                arr.push(xi);
              }
            });
            return null;
          });
          // Assuming this should be a single value, not a map
          // claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState =
          //   stateRes.data[0].mValue;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.city = arr;

          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        }

        const PincodeResponse = await master(data1.productId, "PincodeMaster", cityDistrict1);
        console.log("PincodeResponse", PincodeResponse);

        if (PincodeResponse.status === 200) {
          const Pinc = [];
          // const Pinc = new Set();
          PincodeResponse.data.map((yy) => {
            // Pinc.push(yy);
            Pinc.add(yy);
            // setPincode([...Pinc]);
            return null;
          });
        }
      }
    }
  };

  const handleICD = async (e, value, name) => {
    if (name === "bankName") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
      // ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.bankName = value.mValue;
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.bankName = value.mValue;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.bankName = "";
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });

      if (ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.bankName !== "") {
        try {
          const selectedBank = GenericClaimsMaster.FinancierBank.find(
            (xy) =>
              xy.mValue === ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.bankName
          );

          if (selectedBank) {
            const data1 = {
              productId: 1022,
            };

            const data = { Bank_CD: selectedBank.mID };
            const srs = await master(data1.productId, "FinancierBankBranch", data);

            console.log("srs", srs);

            if (srs.status === 200) {
              const arr = srs.data.map((res) => res);
              ifscResponseArray = [...arr];
            }
          }
        } catch (error) {
          console.error("Error fetching IFSC codes:", error);
        }
      }
    }

    if (name === "ifscCode") {
      // ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = value.mValue;
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = value.mValue;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
    if (name === "AdmissionType") {
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AdmissionType =
          value.mValue;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AdmissionType = "";
      }
    }

    if (name === "TreatmentType") {
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].TreatmentType =
          value.mValue;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].TreatmentType = "";
      }
    }
    if (name === "ICDLevelcode") {
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDLevelcode =
          value.TypeCode;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDDescription =
          value.mValue;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDLevelcode = "";
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDDescription = "";
      }
    }
    if (name === "PreExisting") {
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].PreExisting =
          value.mValue;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].PreExisting = "";
      }
    }
    if (name === "Deny") {
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.queryDetails[0].StatusValue =
          value.TypeCode;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.queryDetails[0].StatusValue = "";
      }
    }
    if (name === "hospitalCity") {
      if (
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.city[
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.city.length - 1
        ].mID !== ""
      ) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity =
          value.CityDistrictName;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode = "";
        setClaimsJson(dispatch, { ...ClaimsJsonL });
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity =
          value.mValue;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode = "";
        setClaimsJson(dispatch, { ...ClaimsJsonL });
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });
      const citymas = {
        CityDistrict_Name:
          ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
      };
      const data1 = {
        productId: 1022,
        partnerId: 0,
      };
      const cityMasterResponse = await GetProdPartnermasterData(
        data1.productId,
        data1.partnerId,
        "CityMaster",
        citymas
      );
      console.log("cityMasterResponse", cityMasterResponse);
      if (cityMasterResponse.status === 200) {
        const DataArray = cityMasterResponse.data;
        const cityIds = DataArray.map((xt) => xt.CityDistrict_Id);
        const stateId = DataArray.map((xt) => xt.State_Id);

        const cityDistrict = {
          City_Id: cityIds[0],
        };
        const stateResponse = {
          State_id: stateId[0],
        };
        const stateRes = await GetProdPartnermasterData(
          data1.productId,
          data1.partnerId,
          "State_Master",
          stateResponse
        );
        console.log("stateRes", stateRes);
        if (stateRes.status === 200) {
          // Assuming this should be a single value, not a map
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState =
            stateRes.data[0].mValue;

          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        }
        const PincodeResponse = await GetProdPartnermasterData(
          data1.productId,
          data1.partnerId,
          "PincodeMaster",
          cityDistrict
        );
        console.log("PincodeResponse", PincodeResponse);

        if (PincodeResponse.status === 200) {
          const Pinc = [];
          // const Pinc = new Set();
          PincodeResponse.data.map((yy) => {
            Pinc.push(yy);
            // Pinc.add(yy.mValue);

            return null;
          });
          console.log("Pinc", Pinc);
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.pin = [...Pinc];

          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        }
      }
    }
    if (name === "hospitalPincode") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode =
        value.mValue;
    }

    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const claims = GenericClaimsMaster.ClaimStatus;
  const Investigator1 = GenericClaimsMaster.InvestigationDetails;
  console.log("Investigator", Investigator1);

  // if (
  //   (ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer === "0" ||
  //     ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer === "" ||
  //     ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier === "" ||
  //     ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier ===
  //       "0") &&
  //   ClaimsJson.claimFields === "Approve"
  // ) {
  //   debugger;
  //   disable = true;
  // }

  const handleAilmentDetails = (e, value, name) => {
    // debugger;
    console.log("claimss", claims);

    if (name === "AilmentName") {
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AilmentName =
          value.Values;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AilmentName = "";
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });
      console.log("policyjson", Policydata);
    }

    // if (Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15") {
    //   ClaimsJsonL.claimFields = "";
    //   ClaimsJsonL.transactionDataDTO[0].remark = "";
    //   setClaimsJson(dispatch, { ...ClaimsJsonL });
    // }

    if (name === "claimFields") {
      if (value !== null) {
        ClaimsJsonL.claimFields = value.mValue;
      } else {
        ClaimsJsonL.claimFields = "";
      }

      if (
        // ClaimsJson.claimFields === "Approve" &&
        (ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer ===
          "0" ||
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer ===
            "") &&
        (ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier ===
          "" ||
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier ===
            "0") &&
        ClaimsJson.claimFields === "Approve"
      ) {
        // debugger;
        disable = true;
        Swal.fire({
          icon: "error",
          text: "claim can not be approved as payable amount is 0",
          confirmButtonColor: "#d33",
        });
      }
      if (
        ClaimsJson.claimFields !== "Approve" &&
        (ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer !==
          "0" ||
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer !==
            "" ||
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier !==
            "" ||
          ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier !==
            "0")
      ) {
        disable = false;
      }
      // if (
      //   (ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer !==
      //     "0" ||
      //     ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer !==
      //       "" ||
      //     ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier !==
      //       "" ||
      //     ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier !==
      //       "0") &&
      //   ClaimsJson.claimFields !== "Approve"
      // ) {
      //   disable = false;
      // }
      // console.log("disable", disable);
      // if (ClaimsJsonL.claimFields !== "Approve") {
      //   disable = false;
      // }
      if (ClaimsJsonL.claimFields !== "Deny") {
        ClaimsJsonL.transactionDataDTO[0].rejectionReasonIds = "";
        ClaimsJsonL.transactionDataDTO[0].remark = "";
        setClaimsJson(dispatch, { ...ClaimsJsonL });
      }

      // const arr2 = [];
      // ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails.map((x2) => {
      //   selectedvalue.push(x2.claimAction);
      // selectedvalue = arr2.join("");
      // });
      //   setClaimsJson(dispatch, { ...ClaimsJsonL });
      // }
      if (
        ClaimsJsonL.claimFields === "Approve" ||
        ClaimsJsonL.claimFields === "Close" ||
        ClaimsJsonL.claimFields === "Query" ||
        ClaimsJsonL.claimFields === "Investigation" ||
        ClaimsJsonL.claimFields === "Query+Investigation"
      ) {
        flag = false;
        ClaimsJsonL.transactionDataDTO[0].internalRemark = "";
        ClaimsJsonL.transactionDataDTO[0].queryReasonIds = "";
      }

      claims.forEach((X) => {
        if (ClaimsJsonL.claimFields === "Approve") {
          if (X.mValue === "Claim Approved") {
            ClaimsJsonL.claimStatusId = X.mID;
            ClaimsJsonL.claimStatus = X.mValue;
          }
        }
        if (ClaimsJsonL.claimFields === "Close") {
          if (X.mValue === "Claim Closed") {
            ClaimsJsonL.claimStatusId = X.mID;
            ClaimsJsonL.claimStatus = X.mValue;
          }
        }
        if (ClaimsJsonL.claimFields === "Deny") {
          if (X.mValue === "Claim Denied") {
            ClaimsJsonL.claimStatusId = X.mID;
            ClaimsJsonL.claimStatus = X.mValue;
          }
        }
        if (ClaimsJsonL.claimFields === "Investigation") {
          if (X.mValue === "Referred for Investigation") {
            ClaimsJsonL.claimStatusId = X.mID;
            ClaimsJsonL.claimStatus = X.mValue;
          }
        }
        if (ClaimsJsonL.claimFields === "Query") {
          if (X.mValue === "Claim under Query") {
            ClaimsJsonL.claimStatusId = X.mID;
            ClaimsJsonL.claimStatus = X.mValue;
          }
        }
        if (ClaimsJsonL.claimFields === "Query+Investigation") {
          if (X.mValue === "Claim under Query") {
            ClaimsJsonL.claimStatusId = X.mID;
            ClaimsJsonL.claimStatus = X.mValue;
          }
        }
        // if (ClaimsJsonL.claimFields === "Query+Investigation") {
        //   if (X.mValue === "Referred for Investigation") {
        //     ClaimsJsonL.claimStatusId = X.mID;
        //     ClaimsJsonL.claimStatus = X.mValue;
        //   }
        // }
        if (ClaimsJsonL.claimFields === "Refer to Medical Adjudicator") {
          if (X.mValue === "Refer To Medical Adjudicator") {
            ClaimsJsonL.claimStatusId = X.mID;
            ClaimsJsonL.claimStatus = X.mValue;
          }
        }
      });
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
  };

  const handleInvestDetails = (e) => {
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator[e.target.name] =
      e.target.value;
    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const handleExpense = (e, index) => {
    // debugger;
    if (e.target.name === "ExpenseAmount") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpenseAmount =
        e.target.value;
      const expenseAmount = parseFloat(
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpenseAmount
      );
      const calculateGstAmount = () => {
        const gstPercentage = 18;
        return (expenseAmount * gstPercentage) / 100;
      };
      const gstAmount = calculateGstAmount(e.target.value);
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[index].GSTAmount =
        gstAmount;

      const abc = expenseAmount + parseFloat(gstAmount);
      console.log("expenseamount", abc);
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[
        index
      ].TotalExpenseAmount = abc;
      if (
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpenseAmount ===
        ""
      ) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[index].GSTAmount = "";
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[
          index
        ].TotalExpenseAmount = "";
      }

      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
    // if (e.target.name === "ExpensePennydrop") {
    //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpensePennydrop =
    //     e.target.value;
    // }
    if (e.target.name === "ExpensePennydrop" && e.target.checked === true) {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpensePennydrop =
        e.target.value;
    }
    if (e.target.name === "ExpensePennydrop" && e.target.checked === false) {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpensePennydrop =
        "";
    }
    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const handleDenialDetails = (e, value) => {
    const arr = [];
    // const arr2 = [];
    denial = [...value];
    value.forEach((a) => {
      arr.push(a.mID);
      // arr2.push(a.mValue);
      // arr2.push(a.mValue.replace(/\s+/g, ""));
    });
    ClaimsJsonL.transactionDataDTO[0].rejectionReasonIds = arr.join(",");
    // const displayArr = arr2.map((value1) => value1.replace(/\s+/g, ""));
    // ClaimsJsonL.transactionDataDTO[0].remark = displayArr.join("").trim();
    // ClaimsJsonL.transactionDataDTO[0].remark = arr2.join("\n\n");
    //   .map((value1) => value1.replace(/\s+/g, ""))
    //   .join("\n\n");
    // .filter((word) => word !== "");
    // arr2 = data1.join("");
    // arr2.replace(/\s\ni /g, "");
    // arr2.split(" ").join("");
    // console.log(arr2.trim());
    // ClaimsJsonL.transactionDataDTO[0].remark = arr2.join("\n\n");
    // ClaimsJsonL.transactionDataDTO[0].remark.trim();
    // ClaimsJsonL.transactionDataDTO[0].remark.replace(/\n\ni/, "");
    // const data1 = ClaimsJsonL.transactionDataDTO[0].remark
    // const data1 = arr2
    //   .trim()
    //   .split("  ")
    //   .filter((word) => word !== "");
    // ClaimsJsonL.transactionDataDTO[0].remark = data1.join("");
    // });
    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  // const idd = 0;
  const handleInvestiatorAction = (e, value, name) => {
    // debugger;
    //  const id=idd+1;
    // const investigator = ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails;
    // if (investigator[idd].length === 1) {
    // if (investigator.length === 1) {
    if (name === "claimAction") {
      // ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails[0].claimAction =
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction =
          value.mValue;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimDescription =
          value.value;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.InvestigatorId =
          value.mID;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction = "";
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });
      if (
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
          "Assign Investigator" ||
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
          "Assign 2nd Opinion" ||
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
          "Assign Medico Legal" ||
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
          "Assign Expert Opinion" ||
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
          "Refer Back"
      ) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.InvestigatorName = "";
        //   ""; transactionDataDTO[0].transactionDetails.Investigator
        ClaimsJsonL.transactionDataDTO[0].internalRemark = "";
      }
      claims.forEach((X) => {
        if (
          // ClaimsJsonL.claimFields === "Assign Investigator" ||
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
            "Assign Investigator" ||
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
            "Assign 2nd Opinion" ||
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
            "Assign Medico Legal" ||
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
            "Assign Expert Opinion"
        ) {
          if (X.mValue === "Assigned to Investigation") {
            ClaimsJsonL.claimStatusId = X.mID;
            ClaimsJsonL.claimStatus = X.mValue;
          }
        }
        if (
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
          "Refer Back"
        ) {
          if (X.mValue === "Claim Reffered Back") {
            ClaimsJsonL.claimStatusId = X.mID;
            ClaimsJsonL.claimStatus = X.mValue;
          }
        }
      });
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
    if (name === "InvestigatorName") {
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.InvestigatorName =
          value.mValue;

        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.VerifiedInvestigator =
          value.PennyDropVerified;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.InvestigatorName = "";
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.VerifiedInvestigator = "";
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
    if (name === "DecisionCategory") {
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.DecisionCategory =
          value.mValue;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.DecisionCategory = "";
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }

    setClaimsJson(dispatch, { ...ClaimsJsonL });
    // } else if (investigator[idd].length > 1) {
    // const obj1 = {
    //   claimAction: value.mValue,
    //   InvestigatorId: "",
    //   InvestigatorName: value.mValue,
    //   ReportNo: "",
    //   ReportDate: "",
    //   InvoiceDate: "",
    //   InvoiceNo: "",
    //   DecisionCategory: "",
    //   Remarks: "",
    //   index: "1",
    // };

    // ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigator[idd] = obj1;
    // }
    // const arr = [];
    // Invaction = [value];
    // value.forEach((X) => {
    //   arr.push({
    //     claimAction: X.mValue,
    //   });
    // ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails = arr;
    // });
    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };
  // let abc = [];
  // if (
  //   value.length === 1 &&
  //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails.length > 0 &&
  //   value.length >=
  //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails.length
  // ) {
  //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigator[
  //     value.length - 1
  //   ].claimAction = value[value.length - 1].mValue;

  //   Invaction = [...Invaction, { ...value[value.length - 1] }];
  // } else if (
  //   value.length === 1 &&
  //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails.length < 0
  // ) {
  //   const obj = {
  //     claimAction: value[value.length - 1].mValue,
  //     InvestigatorId: "",
  //     InvestigatorName: "",
  //     ReportNo: "",
  //     ReportDate: "",
  //     InvoiceDate: "",
  //     InvoiceNo: "",
  //     DecisionCategory: "",
  //     Remarks: "",
  //   };

  //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails = [
  //     ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails,

  //     {
  //       ...obj,
  //     },
  //   ];
  // } else if (
  //   value.length < ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails.length
  // ) {
  //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails.forEach((ab) => {
  //     value.forEach((y) => {
  //       if (ab.ClaimAction === y.mValue) {
  //         const obj = {
  //           // ExpensePayout: y.mValue,

  //           // ExpenseAmount: ab.ExpenseAmount,

  //           // GSTAmount: ab.GSTAmount,
  //           // filename: ab.fileName,
  //           // DocId: ab.DocId,
  //           claimAction: y.mValue,
  //           InvestigatorId: "",
  //           InvestigatorName: ab.InvestigatorName,
  //           ReportNo: ab.ReportNo,
  //           ReportDate: ab.ReportDate,
  //           InvoiceDate: ab.InvoiceDate,
  //           InvoiceNo: ab.InvoiceNo,
  //           DecisionCategory: "",
  //           Remarks: "",
  //         };

  //         abc = [...abc, { ...obj }];
  //       }
  //     });
  //   });

  //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails = [];
  //   Invaction = [];

  //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails = [
  //     ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails,

  //     ...abc,
  //   ];

  //   Invaction = [...Invaction, ...value];
  // } else {
  //   const acd = value[value.length - 1];

  //   Invaction = [...Invaction, { ...acd }];

  //   const obj = {
  //     claimAction: value[value.length - 1].mValue,
  //     InvestigatorId: "",
  //     InvestigatorName: "",
  //     ReportNo: "",
  //     ReportDate: "",
  //     InvoiceDate: "",
  //     InvoiceNo: "",
  //     DecisionCategory: "",
  //     Remarks: "",
  //   };

  //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails = [
  //     ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails,

  //     {
  //       ...obj,
  //     },
  //   ];
  // }
  // };

  const handleExpenseDetails = (e, value) => {
    // debugger;
    // Investigator1.forEach((x1) => {
    //   // pennydrop.push(x1.mValue);
    //   // const pennydrop = x1.mValue;
    //   // if (
    //   //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails[ids1]
    //   //     .InvestigatorName !== ""
    //   // ) {
    // ClaimsJsonL.transactionDataDTO[0].transactionDetails.investigatorDetails.filter((xy) => {
    //   debugger;
    //   // if (x1.mValue === xy.InvestigatorName && x1.PennyDropVerified === "Yes") {
    //   if (xy.VerifiedInvestigator === "Yes") {
    //     PennydropYes = false;
    //   }

    //   // if (x1.mValue === xy.InvestigatorName && x1.PennyDropVerified === "No") {
    //   if (xy.VerifiedInvestigator === "No") {
    //     PennydropYes = true;
    //   }
    //   return null;
    // });
    //   console.log("Pennydrop", PennydropYes);
    // });

    let abc = [];
    if (
      value.length === 1 &&
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails.length > 0 &&
      value.length >= ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails.length
    ) {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[
        value.length - 1
      ].ExpensePayout = value[value.length - 1].mValue;
      expense = [...expense, { ...value[value.length - 1] }];
    } else if (
      value.length === 1 &&
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails.length < 0
    ) {
      const obj = {
        ExpensePayout: value[value.length - 1].mValue,
        ExpenseAmount: "",
        GSTAmount: "",
        filename: "",
        DocId: "",
        ExpensePennydrop: "",
        TotalExpenseAmount: "",
      };
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails = [
        ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails,
        {
          ...obj,
        },
      ];
    } else if (
      value.length < ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails.length
    ) {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails.forEach((ab) => {
        value.forEach((y) => {
          if (ab.ExpensePayout === y.mValue) {
            const obj = {
              ExpensePayout: y.mValue,
              ExpenseAmount: ab.ExpenseAmount,
              GSTAmount: ab.GSTAmount,
              filename: ab.fileName,
              DocId: ab.DocId,
              ExpensePennydrop: ab.ExpensePennydrop,
              TotalExpenseAmount: ab.TotalExpenseAmount,
            };
            abc = [...abc, { ...obj }];
          }
        });
      });
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails = [];
      expense = [];
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails = [
        ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails,
        ...abc,
      ];

      expense = [...expense, ...value];
    } else {
      const acd = value[value.length - 1];

      expense = [...expense, { ...acd }];

      const obj = {
        ExpensePayout: value[value.length - 1].mValue,
        ExpenseAmount: "",
        GSTAmount: "",
        filename: "",
        DocId: "",
        ExpensePennydrop: "",
        TotalExpenseAmount: "",
      };
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails = [
        ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails,
        {
          ...obj,
        },
      ];
    }

    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const handleQueryDetails = (e, value) => {
    const arr = [];
    console.log("query12", query);
    query = [...value];
    value.map((X) => {
      arr.push({
        StatusId: X.mID,
        StatusValue: X.mValue,
      });
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.queryDetails = arr;
      // if (X.mValue === "Others") {
      //   flag = true;
      // }
      return true;
    });
    flag = value.filter((v) => v.mValue === "Others").length > 0;
    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const handleRemarks = (e) => {
    // debugger;
    console.log("e test", e);

    if (e.target.name === "remark") {
      ClaimsJsonL.transactionDataDTO[0].remark = e.target.value;
    }
    if (e.target.name === "internalRemark") {
      ClaimsJsonL.transactionDataDTO[0].internalRemark = e.target.value;
    }
    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const handleText = (e) => {
    if (e.target.name === "remark") {
      ClaimsJsonL.transactionDataDTO[0].remark = e.target.value;
    }
    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const handleOtherQuery = (e) => {
    // debugger;

    if (e.target.name === "queryReasonIds") {
      ClaimsJsonL.transactionDataDTO[0].queryReasonIds = e.target.value;

      setClaimsJson(dispatch, { ...ClaimsJsonL });

      if (ClaimsJsonL.transactionDataDTO[0].transactionDetails.queryDetails !== "") {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.queryDetails.forEach((x2) => {
          const x1 = x2;
          // debugger;
          if (
            // ClaimsJsonL.transactionDataDTO[0].queryReasonIds !== "" &&
            // x1.StatusValue === "Others"
            x1.StatusId === "112"
            // x1.StatusValue === ClaimsJsonL.transactionDataDTO[0].queryReasonIds
          ) {
            x1.StatusValue = ClaimsJsonL.transactionDataDTO[0].queryReasonIds;
          }
        });
      }
    }

    setClaimsJson(dispatch, { ...ClaimsJsonL });

    // setClaimsJson((prev) => ({ ...prev, ...ClaimsJsonL }));

    // setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const AgeCalculator = (date) => {
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

  const handledate = (e, d, name) => {
    if (name === "ReportDate") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.ReportDate = d;
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
    if (name === "InvoiceDate") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.Investigator.InvoiceDate = d;
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
    if (name === "DateOfInjury") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.DateOfInjury = d;
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
    if (name === "Date") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.Date = d;
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
    if (
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
      "Child Education Grant"
    ) {
      const age = AgeCalculator(new Date(d));
      console.log("childage", age);
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ChildAge = age;
      // = AgeCalculator(
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.Date
      // );
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }
  };

  const generateFile = (contentType, base64Data, fileName) => {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const onNext = async (p) => {
    const data = {
      refenceNumber: p.row.fileName,
      documentType: "",
      emailId: "",
    };

    const getResult = await getDocumentByType(data);

    if (getResult.status === 200) {
      const fileExtension = p.row.fileName.split(".").pop().toLowerCase();
      let contentType = "";

      switch (fileExtension) {
        case "pdf":
          contentType = "application/pdf";
          break;
        case "jpg":
          contentType = "image/jpeg";
          break;
        case "png":
          contentType = "image/png";
          break;
        default:
          console.error("Unsupported file format:", fileExtension);
          return;
      }

      generateFile(contentType, getResult.data.documentDetails[0].data, ClaimsJson.policyNo);
    }
  };

  const generateFiles = (contentType, base64Data, fileName) => {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleClick = async (p) => {
    // debugger;
    const data = {
      refenceNumber: p.row.DocId,
      documentType: "",
      emailId: "",
    };

    const getResult = await getDocumentByType(data);

    if (getResult.status === 200) {
      const fileExtension = p.row.DocId.split(".").pop().toLowerCase();
      let contentType = "";

      switch (fileExtension) {
        case "pdf":
          contentType = "application/pdf";
          break;
        case "jpg":
          contentType = "image/jpeg";
          break;
        case "png":
          contentType = "image/png";
          break;
        default:
          console.error("Unsupported file format:", fileExtension);
          return;
      }

      generateFiles(contentType, getResult.data.documentDetails[0].data, ClaimsJson.policyNo);
    }
  };

  const newupload = ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails;
  const Documentupload = {
    docId: "",
    docName: "Investigator Report",
    UploadDocDate: "",
    fileName: "",
    UploadedBy: "",
    // TypeCode: x.TypeCode
  };

  const UploadImage = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (ClaimsJsonL.claimStatusId === 123) {
        if (result.data[0].fileName !== "") {
          const docId = result.data[0].docid;
          Documentupload.docId = docId;
        }
      } else {
        console.log("result", result);
        if (result.data[0].fileName !== "") {
          const docId = result.data[0].docid;
          newupload[index].DocId = docId;
        }
      }
    });
  };

  const handleUpload = (index, e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only pdf/jpg/jpeg/png//doc/docx are allowed",
      });
      return;
    }

    newupload[index].filename = file.name;
    console.log("uploadfile", file.name);
    UploadImage(e.target.files[0], index);
    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const handleRemoveRow = async (index, filename) => {
    await DeleteFile(filename).then((result) => {
      console.log("result", result);
      if (result.data.status === 5) {
        newupload[index].filename = "";
        newupload[index].DocId = "";
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    });
  };

  const userNameId1 = localStorage.getItem("userId");
  const handleOtherFileUpload = async (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPG and PDF files are allowed.",
      });
      return;
    }
    // if (Documentupload !== "") {
    const RoleName = await GetUsersRoles(userNameId1);
    console.log("rolenamee", RoleName);
    RoleName.data.forEach((x1) => {
      Documentupload.UploadedBy = x1.mValue;
    });
    Documentupload.fileName = "";
    Documentupload.docId = "";
    Documentupload.fileName = file.name;
    Documentupload.UploadDocDate = new Date();
    Document.push(Documentupload.fileName);
    console.log("uploadfile", file.name);
    UploadImage(e.target.files[0]);
    Upload1 = file.name;
    // if (Documentupload.length > 0) {
    //   Documentupload.filter((b) => {
    //     if (b.filename !== "") {
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.documentDetails.push(Documentupload);

    if (Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c") {
      Upload1 = "";
      Documentupload.fileName = "";
    }
    setClaimsJson(dispatch, { ...ClaimsJsonL });
    //     }
    //     setClaimsJson((prev) => ({ ...prev, ...ClaimsJsonL }));
    //     return null;
    //   });
    // }
    // }
  };
  console.log("documents", Documentupload);
  console.log("hghghgfhs", Document);
  console.log("uploded", Upload1);

  const handleOtherRemove = async (e, fileName) => {
    await DeleteFile(fileName).then((result) => {
      console.log("result", result);
      if (result.data.status === 5) {
        // if (ClaimsJsonL.claimStatusId === 123) {
        let abcd = {};
        abcd = { ...abcd, ...ClaimsJsonL };
        // ClaimsJsonL.transactionDataDTO[0].transactionDetails.documentDetails =
        //   abcd.transactionDataDTO[0].transactionDetails.documentDetails.filter(x2) (
        //     x2.fileName !== Document[0];
        //   );
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.documentDetails =
          abcd.transactionDataDTO[0].transactionDetails.documentDetails.filter(
            // (y) => y.fileName !== Document[0]
            (y) => y.fileName !== Upload1
          );
        Document[0] = "";
        Documentupload.fileName = "";
        Upload1 = "";
        setClaimsJson(dispatch, { ...ClaimsJsonL });
      }
    });
  };

  const handleCheckboxChange = (event) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
      if (checkbox !== event.target) {
        const checkedbox = checkbox;
        checkedbox.checked = false;
        checkedbox.disabled = event.target.checked;
      }
      // ClaimsJsonL.transactionDataDTO[0].transactionDetails.CustomerExpense = event.target.value;
      if (event.target.checked === true) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.CustomerExpense = event.target.value;
      }
      if (event.target.checked === false) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.CustomerExpense = "";
      }
    });
    setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  // const originalRoomDays =
  //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays;
  // const originalICUDays = ClaimsJsonL.transactionDataDTO[0].transactionDetails.ICUDays;
  const RoomDaystoICU =
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay -
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible;

  const handleICUCal = async (e) => {
    const fieldName = e.target.name;
    const inputValue = parseInt(e.target.value, 10);
    // const inputValue = e.target.value;
    if (fieldName === "ICUDays") {
      if (!Number.isNaN(inputValue) && inputValue <= RoomDaystoICU && inputValue >= 0) {
        if (inputValue === RoomDaystoICU) {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = "0";
          // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays;
          setClaimsJson(dispatch, { ...ClaimsJsonL });
        } else if (inputValue >= 0 && inputValue < RoomDaystoICU) {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays = inputValue;
          setClaimsJson(dispatch, { ...ClaimsJsonL });
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
            RoomDaystoICU - inputValue;
          // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays;
          setClaimsJson(dispatch, { ...ClaimsJsonL });
        }
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays = "0";
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
          RoomDaystoICU;
        // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = updateIcudays;
        setClaimsJson(dispatch, { ...ClaimsJsonL });
        Swal.fire({
          icon: "error",
          text: "No.of days in Normal and ICU not be greater than  LOS",
          confirmButtonColor: "#0079CE",
        });
      }
      // const inputValue = parseInt(e.target.value, 10);
      // const ICUDaysValue = parseInt(
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays,
      //   10
      // );
      // const RoomDaysValue = parseInt(
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays,
      //   10
      // );
      // const DeductibleValue = parseInt(
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible,
      //   10
      // );
      // const lengthOfStayValues = parseInt(
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay,
      //   10
      // );
      // if (Number.isNaN(RoomDaysValue)) {
      //   const IcuResult = ICUDaysValue;
      //   if (IcuResult > lengthOfStayValues) {
      //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays = "";
      //     setClaimsJson(dispatch, { ...ClaimsJsonL });
      //     Swal.fire({
      //       icon: "error",
      //       text: "No.of days in Normal and ICU not be greater than  LOS",
      //       confirmButtonColor: "#0079CE",
      //     });
      //   }
      // } else {
      //   const IcuResult = ICUDaysValue + RoomDaysValue;
      //   if (IcuResult > lengthOfStayValues) {
      //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays = "";
      //     setClaimsJson(dispatch, { ...ClaimsJsonL });
      //     Swal.fire({
      //       icon: "error",
      //       text: "No.of days in Normal and ICU not be greater than  LOS",
      //       confirmButtonColor: "#0079CE",
      //     });
      //   }
      // }
      // removdd
      // if (
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays !== "" ||
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays === ""
      // ) {
      //   // debugger;
      //   if (!Number.isNaN(inputValue) && inputValue >= 0 && inputValue <= originalRoomDays) {
      //     const updateIcudays = {
      //       ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails,
      //       [fieldName]: inputValue,
      //       RoomDays:
      //         ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails
      //           .lengthOfStay -
      //         ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible -
      //         inputValue,
      //     };
      //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = updateIcudays;
      //     setClaimsJson(dispatch, { ...ClaimsJsonL });
      //   } else if (Number.isNaN(inputValue) || inputValue === "") {
      //     // debugger;
      //     const updateIcudays1 = {
      //       ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails,
      //       ICUDays: "",
      //       RoomDays: originalRoomDays,
      //     };
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = updateIcudays1;
      //   setClaimsJson(dispatch, { ...ClaimsJsonL });
      // }
      // }
    }

    if (fieldName === "RoomDays") {
      // debugger;
      if (!Number.isNaN(inputValue) && inputValue <= RoomDaystoICU && inputValue >= 0) {
        if (inputValue >= 0 && inputValue === RoomDaystoICU) {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays = "0";
          // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays;
          setClaimsJson(dispatch, { ...ClaimsJsonL });
        } else if (inputValue >= 0 && inputValue < RoomDaystoICU) {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays =
            RoomDaystoICU - inputValue;
          // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays;
          setClaimsJson(dispatch, { ...ClaimsJsonL });
        }
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays = "0";
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
          RoomDaystoICU;
        // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = updateIcudays;
        setClaimsJson(dispatch, { ...ClaimsJsonL });
        Swal.fire({
          icon: "error",
          text: "No.of days in Normal and ICU not be greater than  LOS",
          confirmButtonColor: "#0079CE",
        });
      }

      // loading = true;

      // const ICUDaysValue = parseInt(
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays,
      //   10
      // );
      // const RoomDaysValue = parseInt(
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays,
      //   10
      // );
      // const DeductibleValue = parseInt(
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible,
      //   10
      // );
      // const lengthOfStayValues = parseInt(
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay,
      //   10
      // );

      // if (Number.isNaN(ICUDaysValue)) {
      //   const IcuResult = RoomDaysValue;

      //   if (IcuResult > lengthOfStayValues) {
      //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = "";
      //     setClaimsJson(dispatch, { ...ClaimsJsonL });
      //     Swal.fire({
      //       icon: "error",
      //       text: "No.of days in Normal and ICU not be greater than  LOS",
      //       confirmButtonColor: "#0079CE",
      //     });
      //   }
      // } else {
      //   const IcuResult = ICUDaysValue + RoomDaysValue;

      //   if (IcuResult > lengthOfStayValues) {
      //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = "";
      //     setClaimsJson(dispatch, { ...ClaimsJsonL });
      //     Swal.fire({
      //       icon: "error",
      //       text: "No.of days in Normal and ICU not be greater than  LOS",
      //       confirmButtonColor: "#0079CE",
      //     });
      //   }
      // // }
      // removedd
      // if (
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays === "" ||
      //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays !== ""
      // ) {
      //   // debugger;
      //   if (!Number.isNaN(inputValue) && inputValue >= 0) {
      //     const updateIcudays = {
      //       ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails,
      //       [fieldName]: inputValue,

      //       ICUDays: RoomDaystoICU - inputValue,
      //     };
      //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = updateIcudays;
      //     setClaimsJson(dispatch, { ...ClaimsJsonL });
      //   } else if (Number.isNaN(inputValue) || inputValue === "") {
      //     // debugger;
      //     const updateIcudays1 = {
      //       ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails,
      //       ICUDays: originalICUDays,
      //       RoomDays: "",
      //     };

      //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails = updateIcudays1;
      //     setClaimsJson(dispatch, { ...ClaimsJsonL });
      //   }
      // }
    }
    if (
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays !== "" ||
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays !== ""
    ) {
      // loading = true;
      const claimCalculator = await GenericApi(
        "MagmaHospiCash01",
        "MagmaClaimsCalculator_V1",
        ClaimsJsonL
      );
      if (claimCalculator.responseMessage === "Success") {
        // loading = false;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount =
          claimCalculator.finalResult.PayoutAmount;
        // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
        //   claimCalculator.finalResult.NormalPayoutCombined;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier =
          claimCalculator.finalResult.FinancierPayout;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer =
          claimCalculator.finalResult.CustomerPayout;
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });
      if (claimCalculator.finalResult.HospitalisatonCriteria === "Separate") {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
          claimCalculator.finalResult.NormalPayoutSeparate;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
          claimCalculator.finalResult.ICUPayoutSeparate;
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
          claimCalculator.finalResult.NormalPayoutCombined;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
          claimCalculator.finalResult.ICUPayoutCombined;
      }
      setClaimsJson(dispatch, { ...ClaimsJsonL });
    }

    // if (
    //   (ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer ===
    //     "0" &&
    //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier ===
    //       "0") ||
    //   (ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer === "" &&
    //     ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier === "")
    // ) {
    //   Swal.fire({
    //     icon: "error",
    //     text: "claim can not be approved as payable amount is 0",
    //     confirmButtonColor: "#0079CE",
    //   });
    // }
  };

  const handleResend = async (params) => {
    // debugger;

    const auditResend = {
      reportname: "MagmaClaimsUpdateResend",
      paramList: [
        {
          parameterName: "ClaimNumber",
          parameterValue: ClaimsJsonL.claimNumber,
        },
        {
          parameterName: "Status",
          parameterValue: params.row.status,
        },
        {
          parameterName: "IsResend",
          parameterValue: "Yes",
        },
      ],
    };
    // const updatedRow = { ...params.row, ResendStatus: "Yes" };
    // const param = params;
    // const index = params.id - 1;
    // console.log("updatedrow", updatedRow);
    // const Generic = GenericClaimsMaster;
    // if (
    //   index >= 0 &&
    //   index < ClaimsJson.transactionDataDTO[0].transactionDetails.ResendFlag.length
    // ) {
    //   // Update the ResendStatus for the selected row
    //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.ResendFlag.forEach((x3, ids1) => {
    //     // debugger;
    //     const x4 = x3;
    //     if (index === ids1) {
    //       x4[index].ResendStatus = "Yes";
    //       param.row.ResendStatus = "Yes";
    //     }
    //   });
    // ClaimsJsonL.transactionDataDTO[0].transactionDetails.ResendFlag[index].ResendStatus =
    //   updatedRow.ResendStatus;
    // Generic.ClaimAuditLog.AuditDetails[index].ResendStatus = updatedRow.ResendStatus;
    // setGenericClaimMaster(Generic);

    // GenericClaimsMaster.ClaimAuditLog.AuditLog[index].ResendStatus = updatedRow.ResendStatus;
    // setClaimsJson(dispatch, { ...ClaimsJsonL });
    // }
    const result = await GetPayLoadByQueryDynamic(auditResend);

    console.log("result", result);
    if (result.data.status === 1) {
      // debugger;
      const auditResult = await GenericApi("MagmaHospiCash01", "MagmaAuditLog", ClaimsJsonL);
      const Generic = GenericClaimsMaster;
      Generic.ClaimAuditLog = auditResult.finalResult;
      setGenericClaimMaster(dispatch, Generic);
      if (params.row.status === "Claim Registered") {
        const ClaimRegister = {
          proposalNo: "",
          policyNo: "",
          transactionId: "",
          customerId: "",
          key: params.row.ClaimNumber,
          keyType: "Claims",
          communicationId: "227",
          referenceId: "62",
          ICPDF: true,
          ISDMS: true,
        };
        await SendNotification(Policydata.ProposerDetails.EmailId, ClaimRegister);
        // const ClaimResister = {
        //   communicationId: 227,
        //   keyType: "Claims",
        //   key: result.finalResult.claimNumber,
        //   stakeHolderDetails: [
        //     {
        //       communicationType: "Email",
        //       stakeholderCode: "CUS",
        //       communicationValue: Policydata.ProposerDetails.EmailId,
        //     },
        //   ],
        // };
        // await EventCommunicationExecution(ClaimResister);
      }
      if (params.row.status === "Claim under Query") {
        const ClaimQuery = {
          proposalNo: "",
          policyNo: "",
          transactionId: "",
          customerId: "",
          key: params.row.ClaimNumber,
          keyType: "Claims",
          communicationId: "229",
          referenceId: "62",
          ICPDF: true,
          ISDMS: true,
        };
        await SendNotification(Policydata.ProposerDetails.EmailId, ClaimQuery);
        // const ClaimQuery = {
        //   communicationId: 229,
        //   keyType: "Claims",
        //   key: result.finalResult.claimNumber,
        //   stakeHolderDetails: [
        //     {
        //       communicationType: "Email",
        //       stakeholderCode: "CUS",
        //       communicationValue: Policydata.ProposerDetails.EmailId,
        //     },
        //   ],
        // };
        // await EventCommunicationExecution(ClaimQuery);
      }
      if (params.row.status === "Claim Denied") {
        const ClaimQuery = {
          proposalNo: "",
          policyNo: "",
          transactionId: "",
          customerId: "",
          key: params.row.ClaimNumber,
          keyType: "Claims",
          communicationId: "239",
          referenceId: "62",
          ICPDF: true,
          ISDMS: true,
        };
        await SendNotification(Policydata.ProposerDetails.EmailId, ClaimQuery);
        // const ClaimDeny = {
        //   communicationId: 239,
        //   keyType: "Claims",
        //   key: result.finalResult.claimNumber,
        //   stakeHolderDetails: [
        //     {
        //       communicationType: "Email",
        //       stakeholderCode: "CUS",
        //       communicationValue: Policydata.ProposerDetails.EmailId,
        //     },
        //   ],
        // };
        // await EventCommunicationExecution(ClaimDeny);
      }
      if (params.row.status === "Query Reply Received") {
        const ClaimQueryR = {
          proposalNo: "",
          policyNo: "",
          transactionId: "",
          customerId: "",
          key: params.row.ClaimNumber,
          keyType: "Claims",
          communicationId: "228",
          referenceId: "62",
          ICPDF: true,
          ISDMS: true,
        };
        await SendNotification(Policydata.ProposerDetails.EmailId, ClaimQueryR);
        // const ClaimQueryR = {
        //   communicationId: 228,
        //   keyType: "Claims",
        //   key: result.finalResult.claimNumber,
        //   // key: ClaimsJsonL.claimNumber,
        //   stakeHolderDetails: [
        //     {
        //       communicationType: "Email",
        //       stakeholderCode: "CUS",
        //       communicationValue: Policydata.ProposerDetails.EmailId,
        //     },
        //   ],
        // };
        // await EventCommunicationExecution(ClaimQueryR);
      }
    }
  };

  const handleIMPS = async () => {
    Pennydrop = true;
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
    const APIRequest = {
      // TxnObject: {
      transferPaymentRequest: {
        subHeader: {
          requestUUID: ClaimsJsonL.claimNumber,
          serviceRequestId: "",
          serviceRequestVersion: "",
          channelId: "",
        },
        transferPaymentRequestBodyEncrypted: {
          channelId: "",
          corpCode: "",
          paymentDetails: [
            {
              txnPaymode: "PA",
              custUniqRef: ClaimsJsonL.claimBasicDetails.memberDetails.memberId,
              corpAccNum: "",
              valueDate: today,
              // valueFormatter = (params) => moment(params?.value).format("YYYY/MM/DD"),
              txnAmount: "1.00",
              beneLEI: "",
              beneName: ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.payeeName,
              beneCode: ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
              beneAccNum: ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
              beneAcType: "",
              beneAddr1: "",
              beneAddr2: "",
              beneAddr3: "",
              beneCity:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
              beneState:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
              benePincode:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails
                  .hospitalPincode,
              beneIfscCode:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
              beneBankName:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
              baseCode: "",
              chequeNumber: "",
              chequeDate: "",
              payableLocation: "",
              printLocation: "",
              beneEmailAddr1: Policydata.ProposerDetails.EmailId,
              beneMobileNo: Policydata.ProposerDetails.MobileNo,
              productCode: "",
              txnType: "",
              invoiceDetails: [
                {
                  invoiceAmount: "",
                  invoiceNumber: "",
                  invoiceDate: "",
                  cashDiscount: "",
                  tax: "",
                  netAmount: "",
                  invoiceInfo1: "",
                  invoiceInfo2: "",
                  invoiceInfo3: "",
                  invoiceInfo4: "",
                  invoiceInfo5: "",
                },
              ],
              enrichment1: "",
              enrichment2: "",
              enrichment3: "",
              enrichment4: "",
              enrichment5: "",
              senderToReceiverInfo: "",
            },
          ],
          checksum: "",
        },
      },
    };
    //   TxnDetails: true,
    // };
    // const res1 = DispatcherCallEvent(APIRequest);
    const res1 = await GenericApi("MagmaHospiCash01", "SaveClaimPaymentDetails", APIRequest);
    // const payments = JSON.parse(res1.PaymentDetails);
    console.log("ressssss", res1);
  };

  const handleBenefit = async (e, value, name) => {
    if (name === "benefitName") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount =
        "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer = "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier = "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount = "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount = "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.Name = "";
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = value.mID;
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName =
        value.mValue;
      if (
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Critical Illness" ||
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Child Education Grant" ||
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Loss of Job" ||
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Personal Accident"
      ) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.DateOfInjury = "";
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory = "";
      }
    }
    if (name === "benefitCategory") {
      if (value !== null) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory =
          value.mValue;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = "";
        const claimCalculator = await GenericApi(
          "MagmaHospiCash01",
          "MagmaClaimsCalculator_V1",
          ClaimsJsonL
        );
        if (claimCalculator.responseMessage === "Success") {
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount =
            claimCalculator.finalResult.PayoutAmount;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.PayoutAmount =
            claimCalculator.finalResult.PayoutAmount;
          // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
          //   claimCalculator.finalResult.NormalPayoutCombined;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier =
            claimCalculator.finalResult.FinancierPayout;
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer =
            claimCalculator.finalResult.CustomerPayout;
          if (claimCalculator.finalResult.HospitalisatonCriteria === "Separate") {
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
              claimCalculator.finalResult.NormalPayoutSeparate;
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
              claimCalculator.finalResult.ICUPayoutSeparate;
          } else {
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
              claimCalculator.finalResult.NormalPayoutCombined;
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
              claimCalculator.finalResult.ICUPayoutCombined;
          }
        }
      } else {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory = "";
      }
    }
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount =
      e.target.value;
    // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.PayoutAmount =
    //   e.target.value;
    setClaimsJson(dispatch, { ...ClaimsJsonL });

    // setClaimsJson(dispatch, { ...ClaimsJsonL });
  };

  const handleApprove = async (params) => {
    // debugger;
    console.log("params", params);
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;

    const integerAmount = params.row.Approved;
    const formattedAmount = parseFloat(integerAmount).toFixed(2);

    const beneficialName = params.row.payeeName;
    const name = beneficialName.split(" ").join("");

    const APIRequest = {
      // TxnObject: {
      transferPaymentRequest: {
        subHeader: {
          requestUUID: ClaimsJsonL.claimNumber,
          serviceRequestId: "",
          serviceRequestVersion: "",
          channelId: "",
        },
        transferPaymentRequestBodyEncrypted: {
          channelId: "",
          corpCode: "",
          paymentDetails: [
            {
              txnPaymode: "PA",
              custUniqRef: ClaimsJsonL.claimBasicDetails.memberDetails.memberId,
              corpAccNum: "",
              valueDate: today,
              // txnAmount: params.row.Approved,
              txnAmount: formattedAmount,
              beneLEI: "",
              // beneName: params.row.payeeName,
              beneName: name,
              beneCode: ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
              beneAccNum: ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
              beneAcType: "",
              beneAddr1: "",
              beneAddr2: "",
              beneAddr3: "",
              beneCity:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
              beneState:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
              benePincode:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails
                  .hospitalPincode,
              beneIfscCode:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
              beneBankName:
                ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
              baseCode: "",
              chequeNumber: "",
              chequeDate: "",
              payableLocation: "",
              printLocation: "",
              beneEmailAddr1: Policydata.ProposerDetails.EmailId,
              beneMobileNo: Policydata.ProposerDetails.MobileNo,
              productCode: "",
              txnType: "",
              invoiceDetails: [
                {
                  invoiceAmount: "",
                  invoiceNumber: "",
                  invoiceDate: "",
                  cashDiscount: "",
                  tax: "",
                  netAmount: "",
                  invoiceInfo1: "",
                  invoiceInfo2: "",
                  invoiceInfo3: "",
                  invoiceInfo4: "",
                  invoiceInfo5: "",
                },
              ],
              enrichment1: "",
              enrichment2: "",
              enrichment3: "",
              enrichment4: "",
              enrichment5: "",
              senderToReceiverInfo: "",
            },
          ],
          checksum: "",
        },
      },
    };

    const Result = await GenericApi("MagmaHospiCash01", "SaveClaimPaymentDetails", APIRequest);
    // debugger;
    console.log("Resultssss", Result);
    const result = await GetPaymentDetails(ClaimsJsonL.claimNumber);
    console.log("resultss", result);
    result.data.finalResult.forEach((item) => {
      const GetPaymentDetailsResponse = JSON.parse(item.paymentRequest);
      console.log("GetPaymentDetailsResponse", GetPaymentDetailsResponse);
      console.log(
        "testing",
        GetPaymentDetailsResponse.TransferPaymentRequest.TransferPaymentRequestBodyEncrypted
          .paymentDetails[0].beneName
      );
      if (
        GetPaymentDetailsResponse.TransferPaymentRequest.TransferPaymentRequestBodyEncrypted
          .paymentDetails[0].beneName ===
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
            params.id - 1
          ].payeeName &&
        GetPaymentDetailsResponse.TransferPaymentRequest.TransferPaymentRequestBodyEncrypted
          .paymentDetails[0].txnAmount ===
          parseFloat(
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
              params.id - 1
            ].Approved
          ).toFixed(2)
      ) {
        // debugger;
        // const requestData = {
        //   transactionId: ClaimsJsonL.claimNumber,
        //   status: item.status,
        //   fromdate: "",
        //   todate: "",
        //   productCode: "MagmaHospiCash01",
        // };

        // const resultData = await GetPaymentDetailByStatus(requestData);
        // console.log("resultData", resultData);

        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
          params.id - 1
        ].paidAmount = item.paidAmount;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
          params.id - 1
        ].Action = item.Action;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
          params.id - 1
        ].refNo = item.refNo;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
          params.id - 1
        ].remarks = item.remarks;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
          params.id - 1
        ].status = item.status;
        // ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
        //   params.id - 1
        // ].txnType = item.txnType;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
          params.id - 1
        ].UTRDate = item.createdDate;
      }
    });

    setClaimsJson(dispatch, { ...ClaimsJsonL });
    const res2 = await UpdateClaimDetails(ClaimsJsonL);
    console.log("result22", res2);
    const data = {
      TransactionNumber: res2.finalResult.transactionDataDTO[0].transactionNumber,
      CreatedBy: userNameId1,
    };
    await SaveClaimHistory(data);
  };

  let data = [];
  switch (x) {
    case "Bank Details":
      data = [
        {
          type: "AutoComplete",
          label: "Mode of Payment",
          name: "modeofPayment",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment,
          visible: true,
          option: GenericClaimsMaster.BankType,
          path: "paymentObj",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true" ||
            Edit === true
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Payee Name",
          name: "payeeName",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.payeeName,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          path: "paymentObj",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true" ||
            Edit === true
              ? { readOnly: true }
              : { readOnly: false },
        },

        {
          type: "Input",
          label: "Account No",
          name: "accountNo",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment ===
              "IMPS" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment === "NEFT",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          path: "paymentObj",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true" ||
            Edit === true
              ? { readOnly: true }
              : { readOnly: false },
        },

        {
          type: "AutoComplete",
          label: "Bank Name",
          name: "bankName",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment ===
              "IMPS" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment === "NEFT",

          // parameters: [5],
          path: "paymentObj",
          option: GenericClaimsMaster.FinancierBank,
          customOnChange: (e, value) => handleICD(e, value, "bankName"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true" ||
            Edit === true
              ? { readOnly: true }
              : { readOnly: false },
        },

        {
          type: "AutoComplete",
          label: "IFSC Code",
          name: "ifscCode",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment ===
              "IMPS" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment === "NEFT",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          option: [...ifscResponseArray],
          customOnChange: (e, value) => handleICD(e, value, "ifscCode"),
          onBlur: false,
          path: "paymentObj",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true" ||
            Edit === true
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Button",
          label: "Initiate Penny Drop",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          // color: "error",
          path: "paymentObj",
          customOnChange: () => handleIMPS(),
          onBlur: false,
        },
        {
          type: "Input",
          label: "Payee Name as per Bank",
          visible: Pennydrop === true,
          path: "paymentObj",
        },
        {
          type: "Input",
          label: "Failure Reason",
          visible: Pennydrop === true,
          pathe: "payementObj",
        },
      ];
      // break;
      // case "Claim Details":
      // data = [
      //   {
      //     type: "Input",
      //     label: "Expense Payout",
      //     name: "hospitalAddress",
      //     // value: Obj.insuredName,
      //     visible: true,
      //     path: "hospitalDetails",
      //   },
      //   {
      //     type: "Input",
      //     label: "Claim Action",
      //     name: "hospitalAddress",
      //     // value: Obj.insuredName,
      //     visible: true,
      //     path: "hospitalDetails",
      //   },
      //   {
      //     type: "Input",
      //     label: "Internal Remarks",
      //     name: "hospitalAddress",
      //     // value: Obj.insuredName,
      //     visible: true,
      //     path: "hospitalDetails",
      //   },
      //   {
      //     type: "Input",
      //     label: "External Remarks",
      //     name: "hospitalAddress",
      //     // value: Obj.insuredName,
      //     visible: true,
      //     path: "hospitalDetails",
      //   },
      // ];
      //   data = [
      //     [
      //       {
      //         type: "Input",
      //         label: "2222222222",
      //         name: "comPerc",
      //         // value: Obj.insuredName,
      //         visible: true,
      //         onChangeFuncs: [IsNumeric],
      //         parameters: [5],
      //         InputProps: { readOnly: true },
      //       },
      //     ],

      //     [
      //       {
      //         type: "AutoComplete",
      //         label: "Transaction Type",
      //         visible: true,
      //         name: "tranType",
      //         // value: Obj.insurerClaimNo,
      //         InputProps: { focused: true },
      //         options: [],
      //       },
      //     ],
      //     [],
      //   ];
      break;
    case "Financier Details":
      data = [
        {
          type: "Input",
          label: "Financier Name",
          name: "financierName",
          visible: true,
          // onChangeFuncs: [IsNumeric],
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.financierDetails.FinancierName,
          // parameters: [5],
          path: "paymentObj",
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "Financier Account No",
          name: "finAccNo",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.financierDetails.AccountNo,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          path: "paymentObj",
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "Financier Bank Name",
          name: "finBankName",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.financierDetails.BankName,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          path: "paymentObj",
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "Financier IFSC Code",
          name: "finIfscCode",
          // value: "AXIS012345",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.financierDetails.IFSCCode,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          path: "paymentObj",
        },
      ];
      break;
    case "Hospital Details":
      data = [
        {
          type: "Input",
          required: true,
          label: "Patient Name",
          visible: true,
          name: "PatientName",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName,
          path: "hospitalizationDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
          // onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "Input",
          label: "Hospital Name",
          name: "hospitalName",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Hospital Address",
          name: "hospitalAddress",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress,
          visible: true,
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Hospital City",
          name: "hospitalCity",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
          visible: true,
          path: "hospitalDetails",
          optionLabel:
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.city[
              ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.city.length - 1
            ].mID !== ""
              ? "CityDistrictName"
              : "mValue",
          // option: GenericClaimsMaster.CityDistrict_Name,
          option:
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.city[
              ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.city.length - 1
            ].mID !== ""
              ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.hospitalDetails.city
              : GenericClaimsMaster.CityDistrict_Name,

          customOnChange: (e, value) => handleICD(e, value, "hospitalCity"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Hospital State",
          name: "hospitalState",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
          visible: true,
          path: "hospitalDetails",
          option: GenericClaimsMaster.StateMaster,
          customOnChange: (e, value) => handleState(e, value, "hospitalState"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Hospital Pincode",
          name: "hospitalPincode",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
          option: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.pin,
          visible: true,
          path: "hospitalDetails",

          customOnChange: (e, value) => handleICD(e, value, "hospitalPincode"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "DateTime",
          label: "Date Of Addmission",
          visible: true,
          name: "doa",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
          maxDate: new Date(),
          path: "hospitalizationDetails",
          customOnChange: (e, d) => assignValueId(e, d, "DateOfAddmission"),
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "DateTime",
          label: "Date Of Discharge",
          visible: true,
          name: "dod",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod,
          maxDate: new Date(),
          minDate: new Date(
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa
          ),
          path: "hospitalizationDetails",
          customOnChange: (e, d) => assignValueId(e, d, "DateOfDischarge"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
      ];
      break;
    case "Ailment Details":
      data = [
        {
          type: "AutoComplete",
          label: "Ailment",
          name: "AilmentName",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AilmentName,
          // value: [ailment],
          visible: true,
          path: "ailmentDetails",
          // option: GenericClaimsMaster.AilmentMaster,
          option: Policydata?.Benefit?.[0]?.Ailmentmaster
            ? [...Policydata.Benefit[0].Ailmentmaster, { Id: 0, Values: "Others" }]
            : [{ Id: 0, Values: "Others" }],
          optionLabel: "Values",
          customOnChange: (e, value) => handleAilmentDetails(e, value, "AilmentName"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "ICD Level 4 Code",
          name: "ICDLevelcode",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDLevelcode,
          visible: true,
          option: GenericClaimsMaster.ICDLevel,
          path: "ailmentDetails",
          optionLabel: "TypeCode",
          customOnChange: (e, value) => handleICD(e, value, "ICDLevelcode"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
          // customOnChange: (e) => handleICD(e),
        },
        {
          type: "Input",
          label: "ICD Level4 Description",
          name: "ICDDescription",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDDescription,
          visible: true,
          customOnChange: (e, value) => handleICD(e, value, "ICDDescription"),
          onBlur: false,
          // option: GenericClaimsMaster.ICDLevel,
          path: "ailmentDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Pre-Existing",
          name: "PreExisting",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.ailmentDetails[0].PreExisting,
          visible: true,
          path: "ailmentDetails",
          option: GenericClaimsMaster.PreExisting,
          customOnChange: (e, value) => handleICD(e, value, "PreExisting"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Diagnosis",
          name: "diagnosis",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis,
          visible: true,
          path: "hospitalizationDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Admission Type",
          name: "AdmissionType",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AdmissionType,
          visible: true,
          path: "ailmentDetails",
          customOnChange: (e, value) => handleICD(e, value, "AdmissionType"),
          onBlur: false,
          option: GenericClaimsMaster.AdmissionType,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Treatment Type",
          name: "TreatmentType",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ailmentDetails[0].TreatmentType,
          visible: true,
          option: GenericClaimsMaster.TreatmentType,
          customOnChange: (e, value) => handleICD(e, value, "TreatmentType"),
          onBlur: false,
          path: "ailmentDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
      ];
      break;
    case "Benefit Details":
      data = [
        {
          type: "Input",
          label: "Benefit Type",
          // name: "benefitName",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName,
          visible: true,
          path: "benefitDetails",
          // customOnChange: (e, value) => handleBenefit(e, value, "benefitName"),
          // onBlur: false,
          // option: GenericClaimsMaster.BenefitType,
          // option: ClaimsJson.claimBasicDetails.benefitDetails,
          InputProps: { readOnly: true },
        },
        {
          type: "Input",
          label: "Room Days",
          name: "RoomDays",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Hospicash",
          // visible: true,
          path: "benefitDetails",
          // InputProps: { readOnly: true },
          customOnChange: (e) => handleICUCal(e),
          onBlur: true,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Room Amount",
          name: "hospitalAddress",
          InputProps: { readOnly: true },
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Hospicash",
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "ICU Days",
          name: "ICUDays",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.ICUDays,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Hospicash",
          path: "benefitDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
          customOnChange: (e) => handleICUCal(e),
          onBlur: true,
          // onBlur: (e, d) => handleInput(e, d),
        },
        {
          type: "Input",
          label: "ICU Amount",
          name: "hospitalAddress",
          InputProps: { readOnly: true },
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Hospicash",
          path: "hospitalDetails",
        },
        // {
        //   type: "Input",
        //   label: "Pay-Out Option",
        //   name: "hospitalAddress",
        //   // value: Obj.insuredName,
        //   visible: true,
        //   path: "hospitalDetails",
        // },
        {
          type: "Input",
          label: "Deductible",
          name: "Deductible",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible,
          // value: Policydata.Benefit[0].Deductible,
          InputProps: { readOnly: true },
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Hospicash",
          path: "benefitDetails",
        },
        {
          type: "Input",
          label: "LOS",
          name: "hospitalAddress",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Hospicash",
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
          // customOnChange: (e, d) => assignValueId(e, d),
        },
        {
          type: "Input",
          label: "Hospicash Payout Amount",
          name: "hospitalAddress",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails
              .CalculatedClaimAmount,
          InputProps: { readOnly: true },
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Hospicash",
          path: "hospitalDetails",
        },
        {
          type: "DateTime",
          label: "Date of Injury",
          name: "DateOfInjury",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.DateOfInjury,
          customOnChange: (e, d) => handledate(e, d, "DateOfInjury"),
          onBlur: true,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Personal Accident",
          path: "benefitDetails",
          maxDate: new Date(),
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },

        {
          type: "AutoComplete",
          label: "Accidental Death/PTD/PPD",
          name: "benefitCategory",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Personal Accident",
          path: "benefitDetails",
          customOnChange: (e, value) => handleBenefit(e, value, "benefitCategory"),
          onBlur: true,
          option: GenericClaimsMaster.AccidentType,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },

        {
          type: "DateTime",
          label: "Date of PTD",
          name: "Date",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.Date,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Personal Accident" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory ===
              "PTD",
          path: "benefitDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "DateTime",
          label: "Date of PPD",
          name: "Date",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.Date,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Personal Accident" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory ===
              "PPD",
          path: "benefitDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "DateTime",
          label: "Date of Death",
          name: "Date",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.Date,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Personal Accident" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory ===
              "Accidental Death",
          path: "benefitDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "PA Payout Amount",
          name: "PayoutAmount",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.PayoutAmount,
          customOnChange: (e, value) => handleBenefit(e, value),
          onBlur: false,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Personal Accident",
          path: "benefitDetails",
          InputProps:
            // Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            // ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
            { readOnly: true },
          // : { readOnly: false },
        },
        {
          type: "Input",
          label: "LOS",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "EMI",
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Amount",
          name: "hospitalAddress",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory,
          // customOnChange: (e, value) => handleBenefit(e, value, "benefitCategory"),
          // value: Obj.insuredName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "EMI",
          customOnChange: (e, value) => handleBenefit(e, value),
          onBlur: false,
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "EMI Payout Amount",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "EMI",
          customOnChange: (e, value) => handleBenefit(e, value),
          onBlur: false,
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Critical Illness",
          name: "hospitalAddress",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory,
          customOnChange: (e, value) => handleBenefit(e, value, "benefitCategory"),
          onBlur: true,

          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Critical Illness",

          path: "hospitalDetails",
          option: cc,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "DateTime",
          label: "Date of Diagnosis of CI/Surgery",
          name: "DateOfInjury",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.DateOfInjury,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Critical Illness",
          path: "hospitalDetails",
          customOnChange: (e, d) => handledate(e, d, "DateOfInjury"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "CI Payout Amount",
          name: "hospitalAddress",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails
              .CalculatedClaimAmount,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Critical Illness",
          customOnChange: (e, value) => handleBenefit(e, value),

          onBlur: false,
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },

        {
          type: "AutoComplete",
          label: "Loss of Job Benefit",
          name: "hospitalAddress",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory,
          customOnChange: (e, value) => handleBenefit(e, value, "benefitCategory"),
          onBlur: false,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Loss of Job",
          path: "hospitalDetails",
          option: cc,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "DateTime",
          label: "Date of PTD/PPD",
          name: "DateOfInjury",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.DateOfInjury,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Loss of Job",
          customOnChange: (e, d) => handledate(e, d, "DateOfInjury"),
          onBlur: true,
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Monthly Salary",
          name: "MonthlySalary",
          value: ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.MonthlySalary,
          // value: Obj.insuredName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Loss of Job",
          path: "benefitDetails",
          // customOnChange: (e, value) => handleBenefit(e, value),
          onBlur: false,
          //   InputProps:
          //     Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
          //     ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
          //       ? { readOnly: true }
          //       : { readOnly: false },
        },
        {
          type: "Input",
          label: "Loss of Job Pay-out Amount",
          name: "hospitalAddress",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.PayoutAmount,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Loss of Job",
          path: "hospitalDetails",
          customOnChange: (e, value) => handleBenefit(e, value),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },

        {
          type: "AutoComplete",
          label: "Child Education Benefit",
          name: "hospitalAddress",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitCategory,
          customOnChange: (e, value) => handleBenefit(e, value, "benefitCategory"),
          onBlur: true,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Child Education Grant",

          path: "hospitalDetails",
          option: cc,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },

        {
          type: "DateTime",
          label: "Date of PTD/PPD",
          name: "DateOfInjury",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.DateOfInjury,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Child Education Grant",
          path: "hospitalDetails",
          customOnChange: (e, d) => handledate(e, d, "DateOfInjury"),
          onBlur: false,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "DateTime",
          label: "Child DOB",
          name: "Date",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.Date,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Child Education Grant",
          customOnChange: (e, d) => handledate(e, d, "Date"),
          onBlur: false,
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Child Education Payout Amount",
          name: "hospitalAddress",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails
              .CalculatedClaimAmount,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Child Education Grant",
          customOnChange: (e, value) => handleBenefit(e, value),
          onBlur: false,
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "LOS",
          name: "hospitalAddress",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "EMI Benefit",
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },

        {
          type: "Input",
          label: "EMI Payout Amount",
          name: "hospitalAddress",
          value:
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails
              .CalculatedClaimAmount,
          customOnChange: (e, value) => handleBenefit(e, value),
          onBlur: false,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "EMI Benefit",
          path: "hospitalDetails",
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Custom",
          visible: true,
          spacing: 12,
          // typeFormat: <MDTypography></MDTypography>,
          return: (
            <Grid container spacing={2} p={2}>
              <div>
                {loading ? (
                  <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                ) : null}
              </div>
            </Grid>
          ),
        },
      ];
      break;

    case "Pay-out Option":
      data = [
        {
          type: "Input",
          label: "Customer",
          name: "customer",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer,
          // value: ["40000"],
          InputProps: { readOnly: true },
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Financier",
          name: "financier",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
        },
      ];
      break;
    case "Expense Payout":
      data = [
        {
          type: "AutoComplete",
          label: "expense Payout",
          // option: GenericClaimsMaster.Payout,
          name: "ExpensePayout",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.expenseDetails,
          value: [...expense],
          path: "expenseDetails",
          visible: true,
          customOnChange: (e, value) => handleExpenseDetails(e, value, "ExpensePayout"),
          onBlur: false,
          multiple: true,
          // option: ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails,
          // option: selectedvalue,
          option: ExpenseData,
          InputProps:
            Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Custom",
          visible: true,
          spacing: 12,
          // typeFormat: <MDTypography></MDTypography>,
          return: (
            <Grid container spacing={2} p={2}>
              {/* {ClaimsJson.transactionDataDTO[0].transactionDetails.expenseDetails[0]
                .ExpensePayout !== "" ? ( */}
              <>
                {ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails.map(
                  (X, index) => (
                    <React.Fragment key={x.mID}>
                      {X.ExpensePayout !== "" ? (
                        <>
                          <Grid item sm={12} xs={12} md={12} lg={2} xl={2} xxl={2}>
                            <MDTypography>{X.ExpensePayout}</MDTypography>
                          </Grid>
                          <Grid item sm={12} xs={12} md={12} lg={2} xl={2} xxl={2}>
                            <MDInput
                              label="Investigator Name"
                              value={
                                ClaimsJson.transactionDataDTO[0].transactionDetails
                                  .investigatorDetails[index].InvestigatorName
                              }
                              // value={ExpenseName[index]}
                              disabled
                            />
                          </Grid>
                          <Grid item sm={12} xs={12} md={12} lg={2} xl={2} xxl={2}>
                            <MDInput
                              label="Expense Amount"
                              name="ExpenseAmount"
                              value={
                                ClaimsJson.transactionDataDTO[0].transactionDetails.expenseDetails[
                                  index
                                ].ExpenseAmount
                              }
                              onChange={(e) => handleExpense(e, index)}
                              disabled={
                                Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
                                ClaimsJson.transactionDataDTO[0].transactionDetails
                                  .SearchDisableFlag === "true"
                              }
                            />
                          </Grid>
                          <Grid item sm={12} xs={12} md={12} lg={2.5} xl={2.5} xxl={2.5}>
                            <MDInput
                              label="GST Amount"
                              name="GSTAmount"
                              value={
                                ClaimsJson.transactionDataDTO[0].transactionDetails.expenseDetails[
                                  index
                                ].GSTAmount
                              }
                              onChange={(e) => handleExpense(e, index)}
                              disabled
                              // ={
                              //   Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
                              //   ClaimsJson.transactionDataDTO[0].transactionDetails
                              //     .SearchDisableFlag === "true"
                              // }
                            />
                          </Grid>
                          <Grid item sm={12} xs={12} md={12} lg={2.5} xl={2.5} xxl={2.5}>
                            <label htmlFor={`file-upload-${index}`}>
                              <input
                                id={`file-upload-${index}`}
                                name={`file-upload-${index}`}
                                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleUpload(index, e)}
                                disabled={Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15"}
                              />
                              <MDButton variant="outlined" color="error" component="span">
                                Upload
                              </MDButton>
                            </label>
                            <Grid sx={{ fontSize: "14px" }}>
                              <MDTypography>
                                <p>{newupload[index].filename}</p>
                              </MDTypography>
                            </Grid>
                            {newupload[index] && newupload[index].filename && (
                              <Grid item xs sx={{ ml: "2rem" }}>
                                <IconButton onClick={(e) => handleRemoveRow(index, e)}>
                                  <CancelIcon
                                    fontSize="large"
                                    color="error"
                                    sx={{ mt: "-0.5rem" }}
                                  />
                                </IconButton>
                              </Grid>
                            )}
                          </Grid>
                          <Grid>
                            <FormGroup
                              onChange={(e) => handleExpense(e, index)}
                              name="ExpensePennydrop"
                              value={
                                ClaimsJson.transactionDataDTO[0].transactionDetails.expenseDetails[
                                  index
                                ].ExpensePennydrop
                              }
                            >
                              <FormControlLabel
                                required
                                control={
                                  <Checkbox
                                    value="Yes"
                                    name="ExpensePennydrop"
                                    checked={
                                      ClaimsJson.transactionDataDTO[0].transactionDetails
                                        .expenseDetails[index].ExpensePennydrop === "Yes"
                                    }
                                    onChange={handleExpense}
                                    disabled={
                                      ClaimsJsonL.transactionDataDTO[0].transactionDetails
                                        .investigatorDetails[index].VerifiedInvestigator !== "Yes"
                                    }
                                  />
                                }
                                label=""
                              />
                            </FormGroup>
                          </Grid>
                        </>
                      ) : null}
                    </React.Fragment>
                  )
                )}
              </>
            </Grid>
          ),
        },
      ];
      break;
    case "Claim Action":
      data = [
        {
          type: "Custom",
          visible: true,
          spacing: 12,
          return: (
            <Grid>
              {Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c" && (
                <FormGroup
                  row
                  onChange={(e) => handleCheckboxChange(e)}
                  value={ClaimsJson.transactionDataDTO[0].transactionDetails.CustomerExpense}
                >
                  <FormControlLabel
                    required
                    value="Court Award"
                    control={<Checkbox />}
                    label="Court Award"
                    checked={
                      ClaimsJson.transactionDataDTO[0].transactionDetails.CustomerExpense ===
                      "Court Award"
                    }
                    onChange={handleCheckboxChange}
                    disabled={
                      Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
                      ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag ===
                        "true"
                    }
                  />
                  <FormControlLabel
                    required
                    value="Penal Interest"
                    control={<Checkbox />}
                    label="Penal Interest"
                    checked={
                      ClaimsJson.transactionDataDTO[0].transactionDetails.CustomerExpense ===
                      "Penal Interest"
                    }
                    onChange={handleCheckboxChange}
                    disabled={
                      Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
                      ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag ===
                        "true"
                    }
                  />
                  <FormControlLabel
                    required
                    value="Ombudsman Award"
                    control={<Checkbox />}
                    label="Ombudsman Award"
                    checked={
                      ClaimsJson.transactionDataDTO[0].transactionDetails.CustomerExpense ===
                      "Ombudsman Award"
                    }
                    onChange={handleCheckboxChange}
                    disabled={
                      Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
                      ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag ===
                        "true"
                    }
                  />
                </FormGroup>
              )}
            </Grid>
          ),
        },
        {
          type: "AutoComplete",
          label: "Claim Action",
          name: "claimFields",
          visible:
            Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true",
          value: ClaimsJson.claimFields,
          path: "ClaimsJsonL",
          customOnChange: (e, value) => handleAilmentDetails(e, value, "claimFields"),
          onBlur: false,
          option: ClaimAction,
          InputProps:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Claim Action",
          name: "claimFields",
          visible: Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c",
          value: ClaimsJson.claimFields,
          path: "ClaimsJsonL",
          customOnChange: (e, value) => handleAilmentDetails(e, value, "claimFields"),
          onBlur: false,
          option: GenericClaimsMaster.ClaimActionQuery,
          InputProps:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Claim Action",
          name: "claimAction",
          visible: Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.claimAction,
          // value: [...Invaction],
          path: "investigatorDetails",
          customOnChange: (e, value) => handleInvestiatorAction(e, value, "claimAction"),
          onBlur: false,
          option: GenericClaimsMaster.IFCUMaster,
        },
        // {
        //   type: "Custom",
        //   visible:
        //     ClaimsJson.claimFields !== "Refer Back" &&
        //     Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15",
        //   spacing: 12,
        //   // typeFormat: <MDTypography></MDTypography>,
        //   return: (
        //     <Grid container spacing={2} p={2}>
        //       {ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails.map(
        //         (X, index) => (
        //           <Grid container>
        //             <Autocomplete
        //               id="investigatorDetails"
        //               name="InvestigatorName"
        //               value={
        //                 ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails[
        //                   index
        //                 ].InvestigatorName
        //               }
        //               options={GenericClaimsMaster.InvestigationDetails}
        //               // optionLabel="mValue"
        //               getOptionLabel={(option) => option.mValue}
        //               onChange={(e, value) =>
        //                 handleInvestigation(e, value, "InvestigatorName", index)
        //               }
        //               sx={{ width: 250 }}
        //               renderInput={(params) => <MDInput {...params} label="Investigator Name" />}
        //             />
        //           </Grid>
        //         )
        //       )}
        //     </Grid>
        //   ),
        // },
        {
          type: "AutoComplete",
          label: "Investigator Name",
          name: "InvestigatorName",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
              "Assign Investigator" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
              "Assign 2nd Opinion" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
              "Assign Medico Legal" ||
            ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.claimAction ===
              "Assign Expert Opinion",
          // Medical !== "e78d443a-1784-4be0-a8a9-0c17654e9f15",

          // value:
          //   ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails[
          //     ClaimsJson.transactionDataDTO[0].transactionDetails.investigatorDetails.length - 1
          //   ].InvestigatorName,
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.InvestigatorName,
          path: "investigatorDetails",
          customOnChange: (e, value) => handleInvestiatorAction(e, value, "InvestigatorName"),
          onBlur: false,
          option: GenericClaimsMaster.InvestigationDetails,
          optionLabel: "mValue",
        },
        // {
        //   type: "Input",
        //   label: "Remarks",
        //   name: "remark",
        //   value: ClaimsJson.transactionDataDTO[0].remark,
        //   visible: ClaimsJson.claimFields === "Refer Back",
        //   inputProps: { maxLength: 50 },
        //   customOnChange: (e) => handleRemarks(e, "remark"),
        //   path: "transactionDataDTO",
        // },
        // {
        //   type: "AutoComplete",
        //   label: "Claim Action",
        //   name: "claimFields",
        //   visible: Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1",
        //   value: ClaimsJson.claimFields,
        //   path: "claimData",
        //   option: ClaimAction,
        // },
        // {
        //   type: "AutoComplete",
        //   label: "Claim Action",
        //   name: "claimFields",
        //   visible: Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c",
        //   value: ClaimsJson.claimFields,
        //   path: "ClaimsJsonL",
        //   customOnChange: (e, value) => handleICD(e, value, "claimFields"),
        //   option: GenericClaimsMaster.ClaimActionQuery,
        // },
        {
          type: "AutoComplete",
          label: "Rejection Reasons",
          name: "rejectionReasonIds",
          value: [...denial],
          visible: ClaimsJson.claimFields === "Deny",
          option: GenericClaimsMaster.DenialMaster,
          customOnChange: (e, value) => handleDenialDetails(e, value, "rejetcionReasonIds"),
          onBlur: false,
          optionLabel: "TypeCode",
          path: "transactionDataDTO",
          multiple: true,
          InputProps:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Remarks",
          name: "remark",
          value: ClaimsJson.transactionDataDTO[0].remark,
          visible: ClaimsJson.claimFields === "Deny",
          multiline: true,
          customOnChange: (e) => handleText(e, "remark"),
          onBlur: false,
          style: { width: "300px" },
          path: "transactionDataDTO",
          InputProps:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "AutoComplete",
          label: "Query",
          name: "StatusValue",
          visible:
            ClaimsJson.claimFields === "Query" || ClaimsJson.claimFields === "Query+Investigation",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.queryDetails[0].StatusValue,
          value: [...query],
          path: "queryDetails",
          customOnChange: (e, value) => handleQueryDetails(e, value),
          onBlur: false,
          option: GenericClaimsMaster.Query,
          multiple: true,
          InputProps:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Other Query",
          name: "queryReasonIds",
          visible: flag === true,
          value: ClaimsJson.transactionDataDTO[0].queryReasonIds,
          path: "transactionDataDTO",
          // rows: 4,
          multiline: true,
          inputProps: { maxLength: 5000 },
          customOnChange: (e) => handleOtherQuery(e, "queryReasonIds"),
          onBlur: false,
          InputProps:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "Remarks",
          name: "remark",
          value: ClaimsJson.transactionDataDTO[0].remark,
          visible: ClaimsJson.claimFields !== "Deny",
          inputProps: { maxLength: 50 },
          customOnChange: (e) => handleRemarks(e, "internalRemark"),
          onBlur: false,
          path: "transactionDataDTO",
          InputProps:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
        {
          type: "Input",
          label: "IFCURemarks",
          name: "internalRemark",
          value: ClaimsJson.transactionDataDTO[0].internalRemark,
          visible: ClaimsJson.claimFields === "Query+Investigation",
          inputProps: { maxLength: 50 },
          customOnChange: (e) => handleRemarks(e, "remark"),
          onBlur: false,
          path: "transactionDataDTO",
          InputProps:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SearchDisableFlag === "true"
              ? { readOnly: true }
              : { readOnly: false },
        },
      ];
      break;
    case "Investigation Closure Details":
      data = [
        {
          type: "Input",
          label: "Report No",
          name: "ReportNo",
          path: "investigatorDetails",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.ReportNo,
          customOnChange: (e) => handleInvestDetails(e),
          onBlur: false,
          visible: ClaimsJson.claimStatusId === 123,
        },
        {
          type: "DateTime",
          label: "Report Date",
          name: "ReportDate",
          visible: ClaimsJson.claimStatusId === 123,
          customOnChange: (e, d) => handledate(e, d, "ReportDate"),
          onBlur: false,
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.ReportDate,
          path: "investigatorDetails",
          maxDate: new Date(),
        },
        {
          type: "DateTime",
          label: "Invoice Date",
          visible: ClaimsJson.claimStatusId === 123,
          name: "InvoiceDate",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.InvoiceDate,
          customOnChange: (e, d) => handledate(e, d, "InvoiceDate"),
          onBlur: false,
          path: "investigatorDetails",
          maxDate: new Date(),
        },
        {
          type: "Input",
          label: "Invoice No",
          name: "InvoiceNo",
          path: "investigatorDetails",
          visible: ClaimsJson.claimStatusId === 123,
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.InvoiceNo,
          customOnChange: (e) => handleInvestDetails(e),
          onBlur: false,
        },
        {
          type: "AutoComplete",
          label: "Decision Category",
          visible: ClaimsJson.claimStatusId === 123,
          name: "DecisionCategory",
          path: "investigatorDetails",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.DecisionCategory,
          customOnChange: (e, value) => handleInvestiatorAction(e, value, "DecisionCategory"),
          onBlur: false,
          option: Decisioncategory,
        },
        {
          type: "Input",
          label: "Remarks",
          name: "Remarks",
          path: "investigatorDetails",
          visible: ClaimsJson.claimStatusId === 123,
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.Investigator.Remarks,
          customOnChange: (e) => handleInvestDetails(e),
          onBlur: false,
        },
        {
          type: "Custom",
          visible: ClaimsJson.claimStatusId === 123,
          spacing: 12,
          return: (
            <Grid container>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography>Upload Document</MDTypography>
              </Grid>
              <Grid item xs={3}>
                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    name="file-upload"
                    accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleOtherFileUpload(e)}
                    onClick={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <MDButton variant="outlined" color="error" component="span">
                    Upload
                  </MDButton>
                </label>
              </Grid>
              <Grid item xs={3} sx={{ fontSize: "14px" }}>
                {" "}
                <MDTypography>
                  <p>{Upload1}</p>
                </MDTypography>
              </Grid>
              {Upload1 && (
                <Grid item xs sx={{ ml: "2rem" }}>
                  <IconButton onClick={(e) => handleOtherRemove(e)}>
                    <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ),
        },
      ];
      break;

    // case "Payment Details":
    //   data = [
    //     {
    //       type: "DataGrid",
    //       spacing: 12,
    //       columns: [
    //         { field: "payeeName", headerName: "Payee Name", width: 200 },
    //         { field: "payeeType", headerName: "Payee Type", width: 200 },
    //         { field: "utilisedSI", headerName: "Pay-Out Type", width: 200 },
    //         { field: "bsi", headerName: "Approved Amount", width: 200 },
    //         { field: "bcount", headerName: "Paid Amount", width: 230 },
    //         { field: "utrNo", headerName: "UTR Number", width: 230 },
    //         { field: "sublimit", headerName: "UTR Date", width: 230 },
    //         { field: "availClaims", headerName: "Status", width: 230 },
    //       ],
    //       rows: [],
    //       rowId: "utrNo",
    //       visible: true,
    // onRowClick:
    // },
    // {
    //   type: "Input",
    //   label: "Payee Name",
    //   name: "payeeName",
    //   // value: Obj.insuredName,
    //   visible: true,
    //   path: "paymentObj",
    // },
    // {
    //   type: "Input",
    //   label: "Payee Type",
    //   name: "payeeType",
    //   // value: Obj.insuredName,
    //   visible: true,
    //   path: "paymentObj",
    // },
    // {
    //   type: "Input",
    //   label: "Pay-Out Type",
    //   name: "hospitalAddress",
    //   // value: Obj.insuredName,
    //   visible: true,
    //   path: "hospitalDetails",
    // },
    // {
    //   type: "Input",
    //   label: "Approved Amount",
    //   name: "hospitalAddress",
    //   // value: Obj.insuredName,
    //   visible: true,
    //   path: "hospitalDetails",
    // },
    // {
    //   type: "Input",
    //   label: "Paid Amount",
    //   name: "hospitalAddress",
    //   // value: Obj.insuredName,
    //   visible: true,
    //   path: "hospitalDetails",
    // },
    // {
    //   type: "Input",
    //   label: "UTR Number",
    //   name: "hospitalAddress",
    //   // value: Obj.insuredName,
    //   visible: true,
    //   path: "hospitalDetails",
    // },
    // {
    //   type: "Input",
    //   label: "UTR Date",
    //   name: "hospitalAddress",
    //   // value: Obj.insuredName,
    //   visible: true,
    //   path: "hospitalDetails",
    // },
    // {
    //   type: "Input",
    //   label: "Status",
    //   name: "hospitalAddress",
    //   // value: Obj.insuredName,
    //   visible: true,
    //   path: "hospitalDetails",
    // },
    // ];
    //   data = [
    //     [
    //       {
    //         type: "Input",
    //         label: "33311",
    //         name: "comPerc",
    //         // value: Obj.insuredName,
    //         visible: true,
    //         onChangeFuncs: [IsNumeric],
    //         parameters: [5],
    //         InputProps: { readOnly: true },
    //       },
    //     ],

    //     [
    //       {
    //         type: "AutoComplete",
    //         label: "Transaction Type",
    //         visible: true,
    //         name: "tranType",
    //         // value: Obj.insurerClaimNo,
    //         InputProps: { focused: true },
    //         options: [],
    //       },
    //     ],
    //   ];
    // break;
    case "Payment Details":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "slno", headerName: "S.No", width: 200 },
            {
              field: "payeeName",
              headerName: "Payee Name",
              width: 200,
            },
            { field: "PayeeType", headerName: "Payee Type", width: 200 },
            { field: "Payout", headerName: "Pay-Out Type", width: 200 },
            { field: "Approved", headerName: "Approved Amount", width: 200 },
            { field: "paidAmount", headerName: "Paid Amount", width: 230 },
            { field: "refNo", headerName: "UTR No", width: 230 },
            {
              field: "UTRDate",
              headerName: "UTR Date",
              width: 230,
              valueFormatter: (params) =>
                params?.value ? moment(params.value).format("DD/MM/YYYY") : "NA",
              // moment(params?.value).format("DD/MM/YYYY"),
            },
            { field: "status", headerName: "Status", width: 230 },
            { field: "remarks", headerName: "Failure Reason", width: 230 },
            {
              field: "Action",
              headerName: "Action",
              width: 230,
              renderCell: (params) => (
                <Grid>
                  {params.row.status !== "Created" ? (
                    <MDButton
                      variant="contained"
                      size="small"
                      cursor="pointer"
                      onClick={() => handleApprove(params)}
                    >
                      Approve
                    </MDButton>
                  ) : null}
                  {params.row.status === "reject" ? (
                    <MDButton
                      variant="contained"
                      size="small"
                      cursor="pointer"
                      onClick={() => handleApprove(params)}
                    >
                      Re-Approve
                    </MDButton>
                  ) : null}
                </Grid>
              ),
            },
          ],
          rows: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails,
          rowId: "slno",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "View Coverage Details":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "Benefit", headerName: "Benefit", width: 200 },
            { field: "TotalSI", headerName: "Total Sum Insured", width: 200 },
            { field: "UtilizedSI", headerName: "Utilized Sum Insured", width: 200 },
            { field: "AvailSI", headerName: "Available Sum Insured", width: 200 },
            { field: "NoOfClaims", headerName: "No. of claims per year", width: 230 },
            { field: "UtilizedClaim", headerName: "Utilized Claim", width: 230 },
            { field: "Sublimit", headerName: "Sub-limit per Claim", width: 230 },
            { field: "AvailableClaim", headerName: "Available claims", width: 230 },
          ],
          rows: GenericClaimsMaster.ClaimViewCoverages.Coverages,
          // rows: [],
          rowId: "Benefit",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "View Document":
      data = [
        {
          type: "DataGrid",
          spacing: 12,

          columns: [
            { field: "SlNo", headerName: "S.No", width: 100 },
            // { field: "docId", headerName: "Document ID", width: 200 },
            { field: "docName", headerName: "Document Name", width: 300 },
            {
              field: "UploadDocDate",
              headerName: "Uploaded Date",
              width: 300,
              valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
            },
            {
              field: "fName",
              headerName: "Document View",
              width: 200,
              renderCell: (p, i) => (
                <MDTypography
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => onNext(p, i)}
                >
                  View Document
                </MDTypography>
              ),
            },
            {
              field: "UploadedBy",
              headerName: "Uploaded By",
              width: 200,
            },
          ],

          rows: GenericClaimsMaster.ClaimDocumentDetails.transactionDataDTO[0].transactionDetails
            .documentDetails,

          rowId: "SlNo",

          visible: true,
          // onRowClick:
        },
      ];
      break;

    case "Audit Logs":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "SlNo", headerName: "Sl No", width: 100 },
            { field: "RoleName", headerName: "Role Name", width: 150 },
            { field: "UserName", headerName: "User Name", width: 150 },
            { field: "status", headerName: "Action/Status", width: 200 },
            {
              field: "proceedDate",
              headerName: "Processed Date",
              width: 200,
              // valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
              // valueFormatter: (params) =>
              // params?.value ? moment(params.value).format("DD/MM/YYYY") : "NA",
              valueFormatter: (params) => {
                //   params?.value ? moment(params.value).format("DD/MM/YYYY") : "NA",
                if (params?.value) {
                  const inputDate = moment(params.value, "DD/MM/YYYY", true);
                  if (inputDate.isValid()) {
                    return inputDate.format("DD/MM/YYYY");
                  }
                }
                return params?.value ? moment(params.value).format("DD/MM/YYYY") : "NA";
              },
            },
            { field: "remark", headerName: "Internal Remarks", width: 230 },
            { field: "TemplateName", headerName: "Communication Template", width: 230 },
            {
              field: "CreatedDatetime",
              headerName: "Communication Sent Date",
              width: 230,
              // valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
              valueFormatter: (params) =>
                params?.value ? moment(params.value).format("DD/MM/YYYY") : "NA",
            },
            {
              field: "DocId",
              headerName: "Download/Email",
              width: 230,
              renderCell: (p, i) => (
                <Grid>
                  {p.row.TemplateName !== "" ? (
                    <MDTypography
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClick(p, i)}
                    >
                      Download
                    </MDTypography>
                  ) : (
                    "NA"
                  )}
                </Grid>
              ),
            },
            {
              field: "resend",
              headerName: "Resend Action",
              width: 230,
              renderCell: (params) => (
                <Grid>
                  {params.row.TemplateName !== "" ? (
                    <MDButton
                      variant="contained"
                      size="small"
                      cursor="pointer"
                      onClick={() => handleResend(params)}
                    >
                      RESEND
                    </MDButton>
                  ) : (
                    "NA"
                  )}
                </Grid>
              ),
            },
            // {
            //   field: "ResendStatus",
            //   headerName: "Resend Status",
            //   width: 230,
            //   renderCell: (params) => (
            //     <Grid>
            //       {params.row.TemplateName !== "" ? (
            //         <MDTypography
            //           variant="contained"
            //           size="small"
            //           cursor="pointer"
            //           onClick={() => handleResend(params)}
            //         >
            //           No
            //         </MDTypography>
            //       ) : (
            //         "NA"
            //       )}
            //     </Grid>
            //   ),
            // },
            { field: "ResendStatus", headerName: "Resend Status", width: 230 },
          ],
          // rows: [],
          // rowId: "userName",
          // visible: true,
          // rows: ClaimsJson.transactionDataDTO[0].transactionDetails.documentDetails,

          rows: GenericClaimsMaster.ClaimAuditLog.AuditDetails,
          rowId: "SlNo",
          // rowId: "communicationLogId",
          visible: true,
          // onRowClick:
        },
      ];
      break;

    case "Expense Payment":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "slno", headerName: "S.No", width: 200 },
            {
              field: "payeeName",
              headerName: "User Name",
              width: 200,
            },
            { field: "Payout", headerName: "Pay-Out Type", width: 200 },
            { field: "Approved", headerName: "Approved Amount", width: 200 },
            { field: "paidAmount", headerName: "Paid Amount", width: 230 },
            { field: "refNo", headerName: "UTR No", width: 230 },
            {
              field: "UTRDate",
              headerName: "UTR Date",
              width: 230,
              valueFormatter: (params) =>
                params?.value ? moment(params.value).format("DD/MM/YYYY") : "NA",
            },
            { field: "status", headerName: "Status", width: 230 },
          ],
          rows: ClaimsJson.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.filter(
            (x1) => x1.Payout === "Expense Payout"
          ),
          rowId: "slno",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "Validation Details":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "slno", headerName: "S.No", width: 200 },
            {
              field: "Validation Details",
              headerName: "User Name",
              width: 200,
            },
          ],
          rows: [],
          rowId: "slno",
          visible: true,
          // onRowClick:
        },
      ];
      break;

    default:
      data = [
        [
          {
            type: "Input",
            label: "Insurer Claim No",
            visible: true,
            name: "insurerClaimNo",
            // value: Obj.insurerClaimNo,
            InputProps: { focused: true },
            // onChangeFuncs: [IsNumeric, LengthEqualTo],
            // parameters: [5],
          },
        ],
      ];
      break;
  }
  return data;
}

function getMasterData() {
  // const [masterData, setMasterData] = useState({ ailment: [] });
  const masterData = [
    { mID: 1, mValue: "Cataract" },
    { mID: 2, mValue: "Stones in biliary and urinary systems" },
    { mID: 3, mValue: "Hydrocele/Hernia" },
    { mID: 4, mValue: "Hysterectomy for any benign disorder" },
    { mID: 5, mValue: "Lumps / cysts / nodules / polyps / internal tumours" },
    { mID: 6, mValue: "Gastric and Duodenal Ulcers" },
    { mID: 7, mValue: "Surgery on tonsils / adenoids" },
  ];
  return masterData;
}
const getMasterList = (ClaimsJson) => {
  // const json = { Pincode: "577005" };
  const masterList = [
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "Gender",
      filterCriteria: ["Gender"],
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "MaritalStatus",
      filterCriteria: ["MaritalStatus"],
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "AilmentMaster",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "BankType",
      filterCriteria: ["BankType"],
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "BenefitType",
      filterCriteria: ["BenefitType"],
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "AccidentType",
      filterCriteria: ["AccidentType"],
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "Payout",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "Query",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "CriticalIllness",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "DetailsPincode",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "ClaimActionQuery",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "claimAction",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "TreatmentType",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "AdmissionType",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "ICDLevel",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "PreExisting",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "CityDistrict_Name",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "ClaimStatus",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "DenialMaster",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "StateMaster",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "IFCUMaster",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "InvestigationDetails",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "FinancierBank",
      filterCriteria: {},
      dependent: false,
      genericApi: false,
    },
    {
      ProductId: 1022,
      PartnerId: 0,
      MasterType: "BlackListedHospital",
      filterCriteria: {
        HospitalName:
          ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        Pincode:
          ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
        District: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
      },
      dependent: true,
      genericApi: false,
    },
    {
      MasterType: "ClaimAuditLog",
      filterCriteria: {
        ApiName: "MagmaAuditLog",
        ProductCode: "MagmaHospiCash01",
        RequestBody: ClaimsJson,
      },
      genericApi: true,
      dependent: false,
    },
    {
      MasterType: "ClaimDocumentDetails",
      filterCriteria: {
        ApiName: "MagmaDocumentDetails",
        ProductCode: "MagmaHospiCash01",
        RequestBody: ClaimsJson,
      },
      genericApi: true,
      dependent: false,
    },
    {
      MasterType: "ClaimViewCoverages",
      filterCriteria: {
        ApiName: "MagmaViewCoverages",
        ProductCode: "MagmaHospiCash01",
        RequestBody: ClaimsJson,
      },
      genericApi: true,
      dependent: false,
    },
  ];

  return masterList;
};
// const getMas = () => {
//   const [controller] = useDataController();
//   const { ClaimsJson } = controller;
//   const[data,setData]=useState({});
//   if(  ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode!==""){
//     setData({...ClaimsJson})
//   }
//   const masterList1 = [
//     {
//       MasterType: "DetailsPincode",
//       filterCriteria: {
//         Pincode:
//           data.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
//       },
//     },
//   ];
//   return masterList1;

//   const abc=
// };
// const getIntervalData = (ClaimsJson) => {
//   const IntervalList = [
//     {
//       url: "ClaimManagement/GetPaymentDetailByStatus",
//       data: {
//         transactionId: ClaimsJson.claimNumber,
//         status: "Created,PENDING",
//         fromdate: "",
//         todate: "",
//         productCode: "MagmaHospiCash01",
//       },
//       MethodType: "POST",
//       MasterType: "MagmaPaymentDetails",
//     },
//   ];
//   return IntervalList;
// };
export {
  getMenuList,
  getMenuContent,
  getAccordianContents,
  getTopLevelContent,
  getBottomContent,
  getMasterData,
  getMasterList,
  // getIntervalData,
  // getMas,
};
