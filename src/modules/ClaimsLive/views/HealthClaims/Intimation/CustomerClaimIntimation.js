import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Autocomplete,
  Step,
  Backdrop,
  Stepper,
  StepLabel,
  Checkbox,
  FormControlLabel,
  FormControl,
  IconButton,
  Radio,
  Stack,
  // CircularProgress,
} from "@mui/material";
// import Fade from "@mui/material/Fade";
import magmapayment from "assets/images/Magma/magmapayment.png";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
// import myGif from "assets/images/Magma/Analyze.gif";
import successanimation from "assets/images/Nepal/successanimation.gif";
import scanningGIF from "assets/images/Magma/scanning-GIF.gif";
// import objectPath from "object-path";
import { IsNumeric } from "Common/Validations";
import MagmaLogo from "assets/images/BrokerPortal/MagmaLogo.png";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";

import MDDatePicker from "../../../../../components/MDDatePicker";
import { diffDaysCalculator } from "../../../../../Common/Validations";
import {
  GetPolicyInfoByPolicyNumber,
  // SaveClaimDetails,
  sendOTP,
  validateOtp,
  UploadFiles,
  GenericApi,
  // getInvoiceData,
  // getDocumentData,
  getProdPartnermasterData,
  getProdPartnermasterDatas,
  // GetMemberdetailsByUHID,
  GetPayLoadByQueryDynamic,
  GetBenefits,
  EventCommunicationExecution,
  // SaveClaimWFStatus,
  master,
  claimsDedupe,
  claimgetProductByCode,
  SaveClaimHistory,
  SaveClaimWFStatus,
  updateStageStatusIdByTno,
  UpdateClaimDetails,
  GetPaymentDetails,
  SaveBSIV2,
  masterIFSC,
  GetDocumentApimId,
  GetDocumentDataByApimId,
  GetInvoiceApimId,
  GetInvoiceDataByApimId,
  // GetUserById,
  // GetUsersRoles,
  // SendNotification,
} from "../data/index";
// import { postRequest } from "../../../../../core/clients/axiosclient";
import { HelathJson } from "../data/JsonData";

// import ClaimDetails from "../ClaimProcessing/ClaimDetails";

// function Loading({ loading }) {
//   return (
//     <MDBox
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       sx={{ width: window.innerWidth, height: window.innerHeight }}
//     >
//       <Fade
//         in={loading}
//         style={{
//           transitionDelay: loading ? "0ms" : "0ms",
//         }}
//       >
//         <CircularProgress size="10rem" />
//       </Fade>
//     </MDBox>
//   );
// }
function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Click On Resend OTP in 00:{counter}</div>;
}

function RenderControl({
  item,
  claimDetails,
  setClaimDetails,
  array1,
  array2,
  array3,
  arrayD,
  setArray1,
  setArray2,
  setArray3,
  setArrayD,
  upload,
  // uploadFlags,
  setUploadFlags,
  // documents,
  // setDocuments,
  // setUpload,
  // setUploadD,
  // customOnChange,
  setOtherUpload,
  otherUpload,
  setOtherUploadFlag,
}) {
  const onInputChange = (e) => {
    const claimData = claimDetails;
    switch (item.path) {
      case "memberDetails":
        claimData.claimBasicDetails.memberDetails[e.target.name] = e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      case "transactionDetails":
        claimData.transactionDataDTO[0].transactionDetails[e.target.name] = e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      case "hospitalDetails":
        claimData.transactionDataDTO[0].transactionDetails.hospitalDetails[e.target.name] =
          e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      case "hospitalizationDetails":
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[e.target.name] =
          e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      case "paymentObj":
        claimData.transactionDataDTO[0].transactionDetails.paymentObj[e.target.name] =
          e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      default:
        claimData[e.target.name] = e.target.value;
        break;
    }
  };
  // const customOnChange = (number) => {
  //   const regex = /^[0-9]*$/;
  //   if (regex.test(number)) return true;
  //   return "Allows only number";
  // };
  // const onDateTimeChange = (e) => {
  //   const claimData = claimDetails;
  //   const today = new Date(e[0].toDateString()).toLocaleDateString();
  //   let [mm, dd, yyyy] = today.split("/");
  //   if (mm <= 9) {
  //     mm = `0${mm}`;
  //   }
  //   if (dd <= 9) {
  //     dd = `0${dd}`;
  //   }
  //   yyyy = `${yyyy}`;
  //   const ab = `${yyyy}-${mm}-${dd}`;
  //   switch (item.path) {
  //     case "hospitalizationDetails":
  //       claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[item.name] = ab;
  //       setClaimDetails((prev) => ({ ...prev, ...claimData }));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const onDateTimeChange = (e, d) => {
    const claimData = claimDetails;
    const today = new Date(e[0].toDateString()).toLocaleDateString();
    let [dd, mm, yyyy] = today.split("/");

    if (dd <= 9) {
      dd = `0${dd}`;
    }
    if (mm <= 9) {
      mm = `0${mm}`;
    }
    yyyy = `${yyyy}`;
    console.log("yyyy", yyyy);
    // const ab = `${dd}/${mm}/${yyyy}`;

    switch (item.path) {
      case "hospitalizationDetails":
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[item.name] = d;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      // case "DateofAdmission":
      //   claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[item.doa] = ab;
      //   setClaimDetails((prev) => ({ ...prev, ...claimData }));
      //   break;
      // case "DateofDischarge":
      //   claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[item.dod] = ab;
      //   setClaimDetails((prev) => ({ ...prev, ...claimData }));
      //   break;
      default:
        break;
      // }
    }
    if (
      claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !== "" &&
      claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa !== ""
    ) {
      const lengthOfStay = diffDaysCalculator(
        new Date(claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa),
        new Date(claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod)
      );
      setClaimDetails({ ...claimDetails, ...claimData });

      if (lengthOfStay !== "") {
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay =
          lengthOfStay;
      }
      if (
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay !==
          "" &&
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay >=
          claimData.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible &&
        claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Hospicash"
      ) {
        claimData.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
          claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay -
          claimData.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible;
        // setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        // }
        // const arr = [];
      } else {
        claimData.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = "";
      }
      // if (
      //   claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay !==
      //     "" &&
      //   claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay >=
      //     claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible
      // ) {
      //   claimData.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
      //     claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay -
      //     claimData.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible;
      //   // setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
      //   // }
      //   // const arr = [];
      // } else {
      //   claimData.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = 0;
      // }
      setClaimDetails({ ...claimDetails, ...claimData });
    }
  };

  const defaultValue = [];
  const handleAutoComplete = async (e, value) => {
    // debugger;
    const claimData = claimDetails;

    if (value === null) {
      claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = "";
      claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = "";
    } else {
      defaultValue.push(value.mValue);
      // const claimData = claimDetails;
      switch (item.path) {
        case "benefitDetails":
          {
            setUploadFlags(Array(upload.length).fill(false));
            setOtherUploadFlag(Array(otherUpload.length).fill(false));
            claimData.transactionDataDTO[0].transactionDetails.documentDetails = [];
            setOtherUpload([]);
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = "";
            claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = "";
            if (
              array1 !== "" ||
              array2 !== "" ||
              array3 !== "" ||
              arrayD !== ""
              // Array4 !== "" ||
              // Array5 !== "" ||
              // Array6 !== ""
            ) {
              setArray1([]);
              setArray2([]);
              setArray3([]);
              setArrayD([]);
              // setArray4([]);
              // setArray5([]);
              // setArray6([]);
            }
            setClaimDetails((prev) => ({ ...prev, ...claimData }));
            const data = {
              MasterType: "BenefitType",
            };
            const data1 = { productId: 1022, MasterType: "BenefitType" };

            const abc = await getProdPartnermasterData(data1.productId, data1.MasterType, data);
            console.log("adccc", abc);
            abc.data.filter((x) => {
              if (x.mValue === value) {
                claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = x.mID;
                claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName =
                  x.mValue;
              }
              setClaimDetails((prev) => ({ ...prev, ...claimData }));
              console.log("1001", claimDetails);
              return true;
            });
          }
          // claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = value.mID;
          // claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName =
          //   value.mValue;
          break;
        default:
          break;
      }
    }
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                label={item.label}
                name={item.name}
                value={item.value}
                // disabled={item.disable}
                inputProps={{ readOnly: item.InputProps, ...item.InputProps }}
                disabled={item?.InputProps?.readOnly}
                onChange={(e) => onInputChange(e)}
              />
            );
          case "DateTime":
            return (
              <MDDatePicker
                // input={{ label: item.label }}
                // name={item.name}
                // value={item.value}
                // options={{ altFormat: "d-m-Y", altInput: true }}
                disabled={item.InputProps}
                // onChange={(e) => onDateTimeChange(e)}
                input={{ label: item.label, value: item.value }}
                name={item.name}
                value={item.value}
                maxDate={item.maxDate}
                options={{
                  altFormat: "d/m/Y",
                  dateFormat: "Y-m-d",
                  altInput: true,
                  minDate: item.minDate,
                  maxDate: item.maxDate,
                }}
                onChange={(e, d) => onDateTimeChange(e, d)}
              />
            );
          case "AutoComplete":
            return (
              <Autocomplete
                options={item.option}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                defaultValue={defaultValue}
                getOptionLabel={(option) => option}
                onChange={(e, value) => handleAutoComplete(e, value)}
                renderInput={(params) => <MDInput {...params} label={item.label} />}
              />
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function CustomerClaimIntimation() {
  const [stepForward, setStepForword] = useState(0);
  // const [addRows, setAddRows] = useState([{ id: 0 }]);
  // const [addDoc, setAddDoc] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  // const [nextotp, SetnextOtp] = useState(false);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [counter, setCounter] = useState(60);
  const [timerFlag, setTimerFlag] = useState(false);
  // const [errorR, setError] = useState({ Otperror: false });
  // const [otperrorflag, setotperrorflag] = useState(false);
  // const [queryclose, setQueryclose] = useState(true);
  // const [counter, setCounter] = useState(60);
  // const [startCounterFlag, setStartCounterFlag] = useState(false);
  // const [timerFlag, setTimerFlag] = useState(false);
  const [startCounterResend, setStartCounterResend] = useState(false);
  const [otpdisabled, setOtpdisabled] = useState(false);
  const [validateotpdisabled, setvalidateotpdisabled] = useState(true);
  const [sendotp, setSendOtp] = useState(false);
  // const [requriement, setRequriemet] = useState(false);
  const [SearchObj, SetSearchObj] = useState({ policyNo: "", UHID: "" });

  // const [memberData, setMemberData] = useState({ Name: "", UHID: "" });
  const [policyDetails, setPolicyDetails] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [claimDetails, setClaimDetails] = useState(HelathJson);
  const [memFlag, setMemFlag] = useState(false);
  const [detailsFlag, setDetailsFlag] = useState(false);
  const [ocrFlag, setOCRFlag] = useState(false);
  const [benefit, setBenefit] = useState([]);
  const [otpFlag, setOtpFlag] = useState(false);
  const [otpValidateFlag, setOtpValidateFlag] = useState(false);
  const [sendOtpBtnFlag, setSendOtpBtnFlag] = useState(true);
  const [ocrPincodeflag, setOcrPincodeFlag] = useState(false);
  const [claimFlag, setclaimFlag] = useState(true);
  const [documentflag, setDocumentFlag] = useState(false);
  const [stepperFlag, setStepperFlag] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [disableFlag, setDisableFlag] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [array3, setArray3] = useState([]);
  const [arrayD, setArrayD] = useState([]);
  const [upload, setUpload] = useState([]);
  const [uploadD, setUploadD] = useState([]);
  const [handwrittentrue, sethandwrittentrue] = useState(false);
  const [uploadFlags, setUploadFlags] = useState(Array(upload.length).fill(false));
  const [pol, setPol] = useState();
  // const [confirmDisabled, setConfirmDisabled] = useState(false);
  // const [showCancel, setShowCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [view, setView] = useState(false);
  // const [loaderFlg, setLoaderFlag] = useState(false);
  const [benefitType, setBenefitType] = useState([]);
  console.log("benefitType", benefitType);
  const [sendOtpData, setOtpData] = useState({
    name: "",
    otp: "",
    email: "",
    userName: "sindhu@inubesolutions.com",
    envId: "297",
    productType: "Mica",
    mobileNumber: "",
    sendSms: true,
    isBerry: false,
    client: "Magma",
  });
  const [validateOtpData, setValidateOtp] = useState({
    otp: "",
    email: "",
    mobileNumber: "",
    userName: "",
    envId: "297",
    productType: "MICA",
    isFirstTimeUser: true,
    isClaimsLive: false,
  });

  const [flags, setFlags] = useState({
    nameReg: false,
    uhidReg: false,
    intimationReg: false,
    coiflag: false,
    uhidflag: false,
    intimationflag: false,
    searchbuttonflag: false,
    sendOtpFlag: false,
    status: false,
  });
  const [uhiddata, setUhidData] = useState();
  // useEffect(() => {
  //   if (SearchObj.policyNo === "" || SearchObj.UHID === "") {
  //     setFlags((prevState) => ({ ...prevState, searchbuttonflag: true }));
  //   } else {
  //     setFlags((prevState) => ({ ...prevState, searchbuttonflag: false }));
  //   }
  // }, [SearchObj]);

  // useEffect(() => {
  //   let timer;
  //   if (counter > 0 && startCounterFlag) {
  //     timer = setTimeout(() => setCounter((c) => c - 1), 1000);
  //     setFlags((prevState) => ({ ...prevState, sendOtpFlag: false }));
  //   }
  //   if (counter === 0) {
  //     setCounter(60);
  //     setStartCounterFlag(false);
  //     setFlags((prevState) => ({ ...prevState, status: false }));
  //     setTimerFlag(true);
  //   }
  //   return () => {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //   };
  // }, [counter, startCounterFlag]);
  const [uhid, setuhid] = useState();
  // const [policytype, setpolicytype] = useState();
  const handleOnBlur = (event) => {
    if (event.target.name === "policyNo" && SearchObj.policyNo !== "") {
      const numRegex = /^[A-Z0-9'//-]*$/;
      if (!numRegex.test(event.target.value) || event.target.value.length !== 37) {
        setFlags((prevState) => ({ ...prevState, nameReg: true }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, nameReg: false }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: false }));
      }
    }
    console.log("flags", flags.searchbuttonflag);

    if (event.target.name === "UHID" && SearchObj.UHID !== "") {
      // if (event.target.value.length < 18) {
      const regex = /^[a-zA-Z0-9]*$/;
      if (!regex.test(event.target.value) || event.target.value.length !== 17) {
        setFlags((prevState) => ({ ...prevState, uhidReg: true }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, uhidReg: false }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: false }));
      }
      // }
    }
  };
  const onPolicySearch = async () => {
    if (SearchObj.policyNo === "" && SearchObj.UHID === "") {
      swal({
        html: true,
        icon: "warning",
        // title: "Claim Intimated Successful",
        text: "Either COI No or UHID No is mandatory",
      });
    } else {
      // setTimerFlag(true);
      // setFlags((prevState) => ({ ...prevState, sendOtpFlag: true }));
      setSendOtpBtnFlag(true);
      if (SearchObj.policyNo === "" || SearchObj.UHID === "") {
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: false }));
      }
      if (SearchObj.policyNo !== "") {
        setLoading(true);
        const policyData = await GetPolicyInfoByPolicyNumber(SearchObj.policyNo);
        if (policyData.policyNo === null) {
          setFlags((prevState) => ({ ...prevState, nameReg: true }));
        }
        setLoading(false);
        localStorage.setItem("policyNO", SearchObj.policyNo);
        setPol(localStorage.getItem("policyNO"));
        // console.log("pol", pol);
        if (policyData.policy_details.length !== 0) {
          setPolicyDetails(policyData.policy_details);
          setTableRows(policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems);
          // const arr = [];
          setuhid(policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems[0].UHID);
          claimDetails.claimBasicDetails.policyDetails.PolicyNumber = policyData.policyNo;
          claimDetails.claimBasicDetails.policyDetails.Plan =
            policyData.policy_details[0].policyRequest.Plan;
          claimDetails.claimBasicDetails.policyDetails.ProductCode =
            policyData.policy_details[0].policyRequest.ProductCode;
          claimDetails.masterPolicyNo =
            policyData.policy_details[0].policyRequest.MasterPolicyDetails[0].masterPolicyNo;
          claimDetails.claimBasicDetails.memberDetails.COIHolderName =
            policyData.policy_details[0].policyRequest.ProposerDetails.Name;
          claimDetails.claimBasicDetails.masterPolicyNo =
            policyData.policy_details[0].policyRequest.MasterPolicyDetails[0].masterPolicyNo;
          // policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems.forEach((row) => {
          //   arr.push({
          //     UHID: row.UHID,
          //     RelationShipToProposer: row.RelationShipToProposer,
          //     Name: row.Name,
          //   });
          // if (xy.RelationShipToProposer === "Self") {
          //   claimDetails.claimBasicDetails.memberDetails.COIHolderName = xy.Name;
          // }
          //   setTableRows([...arr]);
          // });
          console.log(
            "tabledata",
            policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems
          );
          // policyData.policy_details[0].policyRequest.Benefit.forEach((x) => {
          //   benefit.push(x.CoverName);
          // });
          // setBenefit([...benefit]);
          sendOtpData.email =
            policyData.policy_details[0].policyRequest.ProposerDetails.EmailId === ""
              ? ""
              : policyData.policy_details[0].policyRequest.ProposerDetails.EmailId;
          sendOtpData.name =
            policyData.policy_details[0].policyRequest.ProposerDetails.Name === ""
              ? ""
              : policyData.policy_details[0].policyRequest.ProposerDetails.Name;
          sendOtpData.mobileNumber =
            policyData.policy_details[0].policyRequest.ProposerDetails.MobileNo === ""
              ? ""
              : policyData.policy_details[0].policyRequest.ProposerDetails.MobileNo;
          setOtpData(sendOtpData);
          setOtpFlag(true);
        }
      } else if (SearchObj.UHID !== "") {
        // debugger;
        setLoading(true);
        setuhid(SearchObj.UHID);
        const obj = {
          reportname: "Magma_GetMemberDetails",
          paramList: [
            {
              ParameterName: "memberID",
              ParameterValue: SearchObj.UHID,
            },
          ],
        };
        const memberDatas = await GetPayLoadByQueryDynamic(obj);
        setUhidData(memberDatas);
        // const memberDatas = await GetMemberdetailsByUHID(SearchObj.UHID);
        console.log("claimDetails", claimDetails);
        if (memberDatas === null) {
          setLoading(false);
          setFlags((prevState) => ({ ...prevState, uhidReg: true }));
        } else if (memberDatas.data.finalResult.PolicyNo === undefined) {
          setLoading(false);
          setFlags((prevState) => ({ ...prevState, uhidReg: true }));
        } else {
          setLoading(false);
          // setMemberData(memberDatas);
          setMemberData((prev) => [{ ...prev, ...memberDatas.data.finalResult }]);
          sendOtpData.email =
            memberDatas.data.finalResult.EmailID === "" ? "" : memberDatas.data.finalResult.EmailID;
          sendOtpData.name =
            memberDatas.data.finalResult.Name === "" ? "" : memberDatas.data.finalResult.Name;
          sendOtpData.mobileNumber =
            memberDatas.data.finalResult.MobileNumber === ""
              ? ""
              : memberDatas.data.finalResult.MobileNumber;

          localStorage.setItem("policyNO", memberDatas.data.finalResult.PolicyNo);
          setPol(localStorage.getItem("policyNO"));
          const policyData = await GetPolicyInfoByPolicyNumber(
            memberDatas.data.finalResult.PolicyNo
          );
          if (policyData.policy_details.length !== 0) {
            setPolicyDetails(policyData.policy_details);
            const arr = [];
            claimDetails.claimBasicDetails.policyDetails.PolicyNumber = policyData.policyNo;
            claimDetails.claimBasicDetails.policyDetails.Plan =
              policyData.policy_details[0].policyRequest.Plan;
            claimDetails.claimBasicDetails.policyDetails.ProductCode =
              policyData.policy_details[0].policyRequest.ProductCode;
            claimDetails.masterPolicyNo =
              policyData.policy_details[0].policyRequest.MasterPolicyDetails[0].masterPolicyNo;
            claimDetails.claimBasicDetails.memberDetails.COIHolderName =
              policyData.policy_details[0].policyRequest.ProposerDetails.Name;
            claimDetails.claimBasicDetails.masterPolicyNo =
              policyData.policy_details[0].policyRequest.MasterPolicyDetails[0].masterPolicyNo;
            if (policyData.policy_details[0].policyRequest.PolicyType === "NonFloater") {
              const arr1 = [];
              policyData.policy_details[0].policyRequest.Benefit.forEach((x) => {
                arr1.push({
                  CoverName: x.CoverName,
                  Benefit: x.Benefit,
                  Value: x.Value,
                });
                claimDetails.claimBasicDetails.memberDetails.MemberBenefit = arr1;
                console.log("arr1", arr1);
              });
            }
            policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems.forEach((row) => {
              arr.push({
                UHID: row.UHID,
                // RelationShipToProposer: row.RelationShipToProposer,
                Name: row.Name,
              });
              setTableRows([...arr]);
              // if (memberDatas.data.finalResult.RelationShipToProposer === "Self") {
              //   claimDetails.claimBasicDetails.memberDetails.COIHolderName =
              //     memberDatas.data.finalResult.Name;
              // }
            });

            console.log(
              "tabledata",
              policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems
            );
            policyData.policy_details[0].policyRequest.Benefit.forEach((x) => {
              benefit.push(x.CoverName);
            });
            // policyData.policy_details[0].policyRequest.Benefit.forEach((x) => {
            //   benefit.push(x.CoverName);
            // });
            // setBenefit([...benefit]);
            setOtpData(sendOtpData);
            setOtpFlag(true);
          }
        }
      }
    }
  };

  console.log("policydetails", policyDetails);

  // const handleSelectionModelChange = async (params) => {
  //   setDisableFlag(true);
  //   claimDetails.claimBasicDetails.memberDetails.memberId = params.row.UHID;
  //   claimDetails.claimBasicDetails.memberDetails.insuredName = params.row.MemberName;
  //   claimDetails.claimBasicDetails.memberDetails.Relationship = params.row.RelationShipToProposer;
  //   const Payload = {
  //     productCode: "MagmaHospiCash01",
  //     planType: policyDetails[0].policyRequest.Plan,
  //     filterCriteria: [
  //       {
  //         SI: "",
  //         Type: "",
  //         Region: "",
  //         currency: "INR",
  //       },
  //     ],
  //     isFilterMemberWise: false,
  //     setBenefitMemberWise: false,
  //     insurableItems: null,
  //   };

  //   const res1 = await GetBenefits(Payload);
  //   res1.finalResult.benefits.forEach((x) => {
  //     benefitType.push(x.CoverName);
  //   });
  //   console.log("benefitType", benefitType);
  //   setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
  // };

  const handleSelectionModelChange = async (params) => {
    // debugger;

    const obj = {
      reportname: "Magma_GetMemberDetails",
      paramList: [
        {
          ParameterName: "memberID",
          ParameterValue: uhid,
        },
      ],
    };
    const GetUse = await GetPayLoadByQueryDynamic(obj);
    const memberDatas = GetUse.data.finalResul;
    setUhidData(GetUse);
    if (policyDetails[0].policyRequest.PolicyType === "NonFloater") {
      const arr1 = [];
      policyDetails[0].policyRequest.Benefit.forEach((x) => {
        arr1.push({
          CoverName: x.CoverName,
          Benefit: x.Benefit,
          Value: x.Value,
        });
        claimDetails.claimBasicDetails.memberDetails.MemberBenefit = arr1;
        console.log("arr1", arr1);
      });
      console.log("GetUseDetails", memberDatas);
    }
    claimDetails.claimStatusId = 0;
    claimDetails.claimStatus = "";
    claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = "";
    claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.documentDetails = [];
    claimDetails.transactionDataDTO[0].transactionDetails.claimedAmount = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.accountNo = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = "";
    // setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    setDisableFlag(true);
    claimDetails.claimBasicDetails.memberDetails.memberId = params.row.UHID;
    claimDetails.claimBasicDetails.memberDetails.insuredName = params.row.Name;
    // claimDetails.claimBasicDetails.memberDetails.insuredName = params.row.MemberName;
    claimDetails.claimBasicDetails.memberDetails.Relationship = params.row.RelationShipToProposer;
    setBenefit([]);
    setBenefitType([]);
    setSelectedRow(params.row.UHID);
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

    const Payload = {
      productCode: "MagmaHospiCash01",
      // planType: "TestPlan1",
      planType: policyDetails[0].policyRequest.Plan,
      filterCriteria: [
        {
          SI: "",
          Type: "",
          Region: "",
          currency: "INR",
        },
      ],
      isFilterMemberWise: false,
      setBenefitMemberWise: false,
      insurableItems: null,
    };
    const res1 = await GetBenefits(Payload);
    console.log("res1", res1);

    // const arr = [];

    // if (res1.status === 1) {
    //   res1.finalResult.benefits.forEach((x) => {
    //     arr.push({
    //       relationships: x.Relationship.split(","),
    //       coverName: x.CoverName,
    //     });
    //   });

    //   arr.forEach((xy) => {
    //     xy.relationships.forEach((yy) => {
    //       if (yy === claimDetails.claimBasicDetails.memberDetails.Relationship) {
    //         benefit.push(xy.coverName);
    //         setBenefit([...benefit]);
    //       }
    //     });
    //   });
    // }

    const arr = [];
    const arr1 = [];
    const arr2 = [];

    if (res1.status === 1) {
      // debugger;
      res1.finalResult.benefits.forEach((x) => {
        arr.push({
          relationships: x.Relationship.split(","),
          coverName: x.CoverName,
        });
        arr1.push(x.Relationship.split(","));
        arr1.forEach((s, i) => {
          if (claimDetails.claimBasicDetails.memberDetails.Relationship === s[i]) {
            arr2.push(x.CoverName);
            const data = arr2.map((mValue, index) => ({ mID: index + 1, mValue }));
            claimDetails.claimBasicDetails.benefitDetails = data;
          }
        }, []);
      });
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

      arr.forEach((xy) => {
        xy.relationships.forEach((yy) => {
          if (yy === claimDetails.claimBasicDetails.memberDetails.Relationship) {
            benefit.push(xy.coverName);
            setBenefit([...benefit]);
          }
        });
      });
    }

    setBenefitType([...benefitType]);
  };

  useEffect(async () => {
    if (claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit !== "") {
      const data2 = { ProductId: 1022, MasterType: "Document Type" };
      const dataa = await getProdPartnermasterDatas(
        data2.ProductId,
        data2.MasterType,
        claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit
      );
      if (dataa.status === 200) {
        const arr1 = [];
        const arrr1 = [];
        dataa.data.forEach((x) => {
          const obj = {
            docId: "",
            docName: x.Value,
            UploadDocDate: "",
            fileName: "",
            TypeCode: x.TypeCode,
            UploadedBy: "Customer",
            // base64: "",
          };
          const obj2 = {
            docId: x.mID,
            fileName: "",
            base64: "",
            docName: x.Value,
            UploadedBy: "Customer",
          };
          arr1.push(obj);
          arrr1.push(obj2);
          claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.push(obj);
        });
        setUpload(arr1);
        setUploadD(arrr1);
        setDocuments([]);
        // setUploadFlags(false);
        setDocuments([...dataa.data]);
        // claimDetails.transactionDataDTO[0].transactionDetails.documentDetails = dataa.data;
      }
      console.log("data", dataa);
      console.log("documentType", documents);
    }
  }, [claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit]);
  useEffect(() => {
    documents.filter((sd) => {
      if (sd.TypeCode === "Non Medical Documents") array1.push(sd.TypeCode);
      setArray1([...array1]);
      if (sd.TypeCode === "Medical Documents") arrayD.push(sd.TypeCode);
      setArrayD([...arrayD]);
      if (sd.TypeCode === "Required in Case of Death") array2.push(sd.TypeCode);
      setArray2([...array2]);
      if (sd.TypeCode === "Required in Case of TTD/ PPD/ PTD Claim") array3.push(sd.TypeCode);
      setArray3([...array3]);
      return true;
    });
  }, [documents]);
  console.log("claim", claimDetails);

  useEffect(async () => {
    const ClaimData = claimDetails;
    // const productCode = { MagmaHospiCash01 };
    const getProductByCodeResponse = await claimgetProductByCode("MagmaHospiCash01");
    console.log("getProductByCode", getProductByCodeResponse);
    if (getProductByCodeResponse.status === 200) {
      const BenfitIdconvert = JSON.parse(getProductByCodeResponse.data.productdetailJson);
      console.log("BenfitIdconvert", BenfitIdconvert);
      BenfitIdconvert.productInsurableItems[0].productCovers.forEach((x) => {
        if (
          x.cover ===
          claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName
        ) {
          ClaimData.transactionDataDTO[0].transactionDetails.benefitDetails.BenefitId =
            x.productBenefits[0].benefitId;
        }
        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        setClaimDetails((prev) => ({ ...prev, ...ClaimData }));
      });
    }
    // if(claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName)
  }, [claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName]);

  // const tableColumns = [
  //   {
  //     field: "radiobutton",
  //     headerName: "Select",
  //     width: 250,
  //     sortable: false,
  //     renderCell: (params) => {
  //       console.log("member details", params);
  //       return <Radio onClick={() => handleSelectionModelChange(params)} />;
  //     },
  //   },
  //   {
  //     field: "UHID",
  //     headerName: "UHID",
  //     width: 250,
  //   },
  //   {
  //     field: "MemberName",
  //     headerName: "MemberName",
  //     width: 250,
  //   },
  //   // {
  //   //   field: "IntimationNo",
  //   //   headerName: "Intimation Number",
  //   //   width: 250,
  //   // },
  // ];
  // const tableColumns = [
  //   {
  //     field: "radiobutton",
  //     headerName: "Select",
  //     width: 100,
  //     sortable: false,
  //     renderCell: (params) => {
  //       console.log("member details", params);
  //       return (
  //         <Radio
  //           onClick={() => handleSelectionModelChange(params)}
  //           checked={selectedRow === params.row.UHID}
  //         />
  //       );
  //     },
  //   },
  //   {
  //     field: "UHID",
  //     headerName: "UHID",
  //     width: 280,
  //   },
  //   {
  //     field: "Name",
  //     headerName: "Member Name",
  //     width: 300,
  //   },
  // ];

  const tableColumns = [
    {
      field: "radiobutton",
      headerName: "Select",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        console.log("member details", params);
        return (
          <Radio
            onClick={() => handleSelectionModelChange(params)}
            checked={selectedRow === params.row.UHID}
          />
        );
      },
    },
    {
      field: "UHID",
      headerName: "UHID",
      width: 280,
    },
    {
      field: "Name",
      headerName: "Member Name",
      width: 250,
    },
  ];

  // const [docDetails, setDocDetails] = useState({
  //   contentType: "",
  //   docId: "",
  //   docName: "",
  //   docType: "",
  //   docTypeName: "",
  //   UploadDocDate: "",
  // });
  // const [benefit, setBenefit] = useState([{ mID: "0", mValue: "HospiCash" }]);
  //   const benefit = [{ mID: "0", mValue: "HospiCash" }];
  // const handleChange = (e, type) => {
  //   switch (type) {
  //     case "SearchObj":
  //       const updatedSearchObj = { ...SearchObj, [e.target.name]: e.target.value };
  //       SetSearchObj(updatedSearchObj);

  //       if (e.target.name === "policyNo" && updatedSearchObj.policyNo !== "") {
  //         setFlags((prevState) => ({ ...prevState, uhidflag: true }));
  //         setFlags((prevState) => ({ ...prevState, intimationflag: true }));
  //       } else if (e.target.name === "UHID" && updatedSearchObj.UHID !== "") {
  //         setFlags((prevState) => ({ ...prevState, coiflag: true }));
  //         setFlags((prevState) => ({ ...prevState, intimationflag: true }));
  //       }
  //       break;

  //     case "otp":
  //       validateOtpData[e.target.name] = e.target.value;
  //       setValidateOtp((prev) => ({ ...prev, ...validateOtpData }));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleChange = (e, type) => {
    let updatedSearchObj;
    let validateOtpD;

    switch (type) {
      case "SearchObj":
        updatedSearchObj = { ...SearchObj, [e.target.name]: e.target.value };
        SetSearchObj(updatedSearchObj);

        if (e.target.name === "policyNo" && updatedSearchObj.policyNo !== "") {
          setFlags((prevState) => ({ ...prevState, uhidflag: true }));
        } else if (e.target.name === "UHID" && updatedSearchObj.UHID !== "") {
          setFlags((prevState) => ({ ...prevState, coiflag: true }));
        } else {
          setFlags({
            coiflag: false,
            uhidflag: false,
            intimationflag: false,
          });
        }
        break;

      case "otp":
        validateOtpD = { ...validateOtpData, [e.target.name]: e.target.value };
        setValidateOtp((prev) => ({ ...prev, ...validateOtpD }));
        break;

      default:
        break;
    }
  };

  // const onSendOTP = async () => {
  //   setStartCounterFlag(true);
  //   setvalidateotpdisabled(false);
  //   SetnextOtp(true);
  //   if (sendOtpData.mobileNumber !== "") {
  //     const res = await sendOTP(sendOtpData);
  //     if (res.status === 200) {
  //       swal({
  //         html: true,
  //         icon: "success",
  //         // title: "Claim Intimated Successful",
  //         text: `${res.data.responseMessage}`,
  //       });
  //       setSendOtpBtnFlag(false);
  //       // setFlags((prevState) => ({ ...prevState, sendOtpFlag: false }));
  //       setOtpdisabled(true);
  //       setOtpValidateFlag(true);
  //     }
  //     setSendOtp(true);
  //   } else {
  //     swal({
  //       html: true,
  //       icon: "warning",
  //       // title: "Claim Intimated Successful",
  //       text: "Your Mobile Number is not integrated",
  //     });
  //   }
  // };

  const navigate = useNavigate();
  const handleTrackClaims = () => {
    navigate(`/Claims/TrackClaims`, { state: pol });
  };

  const onValidateOtp = async () => {
    setStartCounterFlag(false);
    setStartCounterResend(false);
    validateOtpData.email = sendOtpData.email;
    validateOtpData.userName = sendOtpData.email;

    const validate = await validateOtp(validateOtpData);

    if (validate === null) {
      swal({
        html: true,
        icon: "error",
        // title: "Claim Intimated Successful",
        text: `You're almost there. Just drop in a legit 4-digit OTP`,
      });
    }

    if (validate.status === 200) {
      setStartCounterFlag(false);
      setStartCounterResend(false);
      Swal.fire({
        // icon: "success",
        html: `<div><img src=${successanimation} alt="success"><br>
        <h3>Verification is Successful </h3><br/>
        <p style="color:red;">How Do You Want To Proceed</p>
        </div>`,
        // title: "You are Successfully verified",
        input: "radio",
        // text: "How Do You Want To Proceed",
        inputOptions: {
          option1: "Register New Claim",
          option2: "Track Existing Claim",
        },
        confirmButtonText: "Proceed",
        confirmButtonColor: "#dc3545",
        allowOutsideClick: false,
        preConfirm: (option) => {
          if (!option) {
            Swal.showValidationMessage("Please select an option");
          }
        },
      }).then((result) => {
        // setConfirmDisabled(true);
        if (result.isConfirmed) {
          if (result.value === "option1") {
            if (SearchObj.UHID !== "") {
              memberData.forEach((x) => {
                claimDetails.claimBasicDetails.memberDetails.memberId = x.UHID;
                claimDetails.claimBasicDetails.memberDetails.insuredName = x.Name;
              });
              setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
              setMemFlag(false);
              setStepperFlag(true);
              setDetailsFlag(true);
              setStepForword(stepForward + 2);
              setclaimFlag(false);
              setOtpFlag(false);
              setOtpValidateFlag(false);
              setStartCounterFlag(false);
            } else {
              setMemFlag(true);
              setStepperFlag(true);
              setOtpValidateFlag(false);
            }
          } else if (result.value === "option2") {
            handleTrackClaims();
          }
          setStepForword(stepForward + 1);
          setclaimFlag(false);
          setOtpFlag(false);
          setOtpValidateFlag(false);
        }
      });
    }
  };
  const [showOtpValidation, setShowOtpValidation] = useState(false);
  const handleNextOtp = async () => {
    setvalidateotpdisabled(false);
    // SetnextOtp(true);
    setShowOtpValidation(true);
    if (sendOtpData.mobileNumber !== "") {
      const res = await sendOTP(sendOtpData);
      if (res.status === 200) {
        Swal.fire({
          html: `${res.data.responseMessage}`,
          icon: "success",
          allowOutsideClick: false,
          showCloseButton: true,
        });
        setStartCounterFlag(true);
        setOtpdisabled(true);
        setOtpValidateFlag(true);
        setStartCounterFlag(true);
        setSendOtpBtnFlag(false);
      }
      setSendOtp(true);
    } else {
      Swal.fire({
        html: "Your Mobile Number is not integrated",
        icon: "warning",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    }
  };
  const onResendOTP = async () => {
    // SetnextOtp(true);
    setvalidateotpdisabled(false);
    if (sendOtpData.mobileNumber !== "") {
      const res = await sendOTP(sendOtpData);
      if (res.status === 200) {
        setvalidateotpdisabled(false);
        Swal.fire({
          html: `${res.data.responseMessage}`,
          icon: "success",
          allowOutsideClick: false,
          showCloseButton: true,
        });
        setStartCounterFlag(true);
        setStartCounterResend(true);
        setOtpdisabled(true);
      }
    } else {
      Swal.fire({
        html: "Your Mobile Number is not integrated",
        icon: "warning",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    }
  };

  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    if (counter === 0) {
      setCounter(60);
      setStartCounterFlag(false);
      setTimerFlag(true);
      setOtpValidateFlag(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);
  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterResend) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    if (counter === 0) {
      setCounter(60);
      setStartCounterResend(false);
      setTimerFlag(true);
      setOtpdisabled(false);
      setOtpValidateFlag(false);
      setvalidateotpdisabled(true);

      // if (validateOtpData.otp === "" && validateotpdisabled === false) {
      // if (validateotpdisabled === false && startCounterFlag === false) {

      // }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterResend]);

  useEffect(() => {
    if (counter === 0 && showOtpValidation) {
      Swal.fire({
        html: "OTP is Expired",
        icon: "warning",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    }
  }, [counter, showOtpValidation]);

  // const onValidateOtp = async () => {
  //   // debugger;
  //   // if (validateOtpData.otp !== "") {
  //   //   setError((prevState) => ({ ...prevState, Otperror: true }));
  //   // }
  //   try {
  //     validateOtpData.email = sendOtpData.email;
  //     validateOtpData.userName = sendOtpData.email;
  //     const validate = await validateOtp(validateOtpData);
  //     if (validate.status === 200) {
  //       if (nextotp.UHID !== "") {
  //         Swal.fire({
  //           icon: "success",
  //           text: "You are Successfully verified",
  //           allowOutsideClick: false,
  //           showCloseButton: true,
  //         });
  //       }
  //       // setQueryclose(false);
  //       // setRequriemet(true);
  //     }
  //   } catch (error) {
  //     console.log("Error during OTP validation:", error);

  //     // Swal.fire({
  //     // icon: "error",
  //     // // title: "Oops! Something went wrong",
  //     // text: "Invalid OTP",
  //     // });
  //   }
  // };

  const handleProceedtoClaim = async () => {
    claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = "";
    claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.documentDetails = [];
    // claimDetails.transactionDataDTO[0].transactionDetails.claimedAmount = "";
    setMemFlag(false);
    setDetailsFlag(true);
    setShowOtpValidation(false);
    setStepForword(stepForward + 1);
  };

  console.log("uploadD", uploadD);
  // const[finalUplad,setFinalUplaoad]=useState([]);
  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  const [xyz, setXYZ] = useState({
    // auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJVc2VySWQiOiI1Y2M0ZTFjZi04MzYxLTQwY2QtODVjMC1hMjE3YThiZGEwYTYiLCJFbWFpbCI6Im1vaGFuQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJpTnViZSBBZG1pbiIsIk5hbWUiOiJJbnViZSIsIlVzZXJOYW1lIjoiZWludWJlYWRtaW4iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMjk3IiwiZXhwIjoxNjk4NTc5OTE3LCJpc3MiOiJJbnViZSIsImF1ZCI6IkludWJlTUlDQSJ9AzswX6psbQq7MisICydYlZYVgYwrN2zhg86HjiHwsW4",
    RawImage: [],
    // DocumentName: "",
  });
  console.log("profile", profile);
  const [otherflag, setOtherFlag] = useState(false);
  const [otherUpload, setOtherUpload] = useState([]);
  const [otherUploadFlag, setOtherUploadFlag] = useState(Array(upload.length).fill(false));
  const [patientNameFlag, setPatientNameFlag] = useState(false);
  const [filename, setFilename] = useState();
  const [ocrSwalFlag, setOcrSwalFlag] = useState(false);
  console.log("filename", filename);
  const UploadImage = async (file, id) => {
    setFilename(file.name);
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (otherflag === true) {
        if (result.data[0].fileName !== "") {
          const docId = result.data[0].docid;
          const newUploads = [...otherUpload];
          newUploads[id].docId = docId;
          setOtherUpload(newUploads);
        }
      } else {
        console.log("result", result);
        if (result.data[0].fileName !== "") {
          const docId = result.data[0].docid;
          const newUpload = [...upload];
          newUpload[id].docId = docId;
          setUpload(newUpload);

          const reader = new FileReader();
          reader.onload = () => {
            const base64Image = reader.result;
            const myArray = base64Image.split(",");
            const data = myArray[1];

            const base64 = data;
            const newUploadD = [...uploadD];
            newUploadD[id].base64 = base64;
            setUploadD(newUploadD);

            setXYZ({ ...xyz, RawImage: data });
            console.log("imagebinding", xyz);
          };
          reader.readAsDataURL(file);
        }
      }
    });
  };

  // const handleProfileChange = (id, e) => {
  //   const newUpload = [...upload];
  //   newUpload[id].fileName = e.target.files[0].name;
  //   newUpload[id].UploadDocDate = new Date();
  //   setUpload(newUpload);

  //   const newUploadD = [...uploadD];
  //   newUploadD[id].fileName = e.target.files[0].name;

  //   setUploadD(newUploadD);

  //   if (uploadD.length !== 0) {
  //     uploadD.filter((x) => {
  //       if (x.fileName !== "") {
  //         claimDetails.DocumentUploadFlag = "";
  //         claimDetails.DocumentUploadFlag = "true";
  //       }
  //       setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
  //       return true;
  //     });
  //   }
  //   console.log("dddd", claimDetails);
  //   setProfile({
  //     ...profile,
  //     ProfileImage: URL.createObjectURL(e.target.files[0]),
  //   });
  //   setDocumentFlag(true);
  //   UploadImage(e.target.files[0], id);
  // };

  const handleUpload = (id, e) => {
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

    const newUpload = [...upload];

    newUpload[id].fileName = e.target.files[0].name;
    newUpload[id].UploadDocDate = new Date();

    setUpload(newUpload);

    const newUploadD = [...uploadD];
    newUploadD[id].fileName = e.target.files[0].name;

    setUploadD(newUploadD);

    if (uploadD.length !== 0) {
      uploadD.filter((x) => {
        if (x.fileName !== "") {
          claimDetails.DocumentUploadFlag = "";
          claimDetails.DocumentUploadFlag = "true";
        }
        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        return true;
      });
    }
    console.log("dddd", claimDetails);
    // setDisable(false);
    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });
    setDocumentFlag(true);
    UploadImage(e.target.files[0], id);
    const newUploadFlags = [...uploadFlags];
    newUploadFlags[id] = true;
    setUploadFlags(newUploadFlags);
  };

  // const handleOtherFileUpload = (id, e) => {
  //   const newuploads = [...otherUpload];
  //   newuploads[id].fileName = e.target.files[0].name;
  //   newuploads[id].UploadDocDate = new Date();
  //   setOtherUpload(newuploads);
  //   UploadImage(e.target.files[0], id);
  // };
  const handleOtherFileUpload = (id, e) => {
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
    const newuploads = [...otherUpload];
    newuploads[id].fileName = e.target.files[0].name;
    newuploads[id].UploadDocDate = new Date();
    setOtherUpload(newuploads);
    UploadImage(e.target.files[0], id);
    const newUploadFlags = [...otherUploadFlag];
    newUploadFlags[id] = true;
    setOtherUploadFlag(newUploadFlags);
  };
  console.log("adddocument", otherUpload);

  // const saveWFDto = {
  //   Stage: "Claims",
  //   Status: "325",
  //   WorkFlowType: "DEO",
  //   wfstageStatusId: "326",
  //   workFlowId: "84",
  // };

  const userNameId = localStorage.getItem("userId");

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

  const onClaimSave = async () => {
    // debugger;
    claimDetails.claimBasicDetails.memberDetails.DOC = uhiddata.data.finalResult.DOC;
    claimDetails.claimBasicDetails.memberDetails.CoverageEndDate =
      uhiddata.data.finalResult.CoverageEndDate;

    claimDetails.claimBasicDetails.memberDetails.EmailId =
      policyDetails[0].policyRequest.ProposerDetails.EmailId;
    claimDetails.claimBasicDetails.memberDetails.MobileNo =
      policyDetails[0].policyRequest.ProposerDetails.MobileNo;
    claimDetails.claimBasicDetails.memberDetails.Dob =
      policyDetails[0].policyRequest.ProposerDetails.DOB;
    claimDetails.claimBasicDetails.memberDetails.Gender =
      policyDetails[0].policyRequest.ProposerDetails.Gender;
    const arr1 = [];
    if (
      policyDetails[0].policyRequest.PlanDetails[0].groupDetailsJson.SectionMaster
        .SumInsuredType === "Floater"
    ) {
      policyDetails[0].policyRequest.Benefit.forEach((x) => {
        arr1.push({
          CoverName: x.CoverName,
          Benefit: x.Benefit,
          Value: x.Value,
        });
        claimDetails.claimBasicDetails.memberDetails.MemberBenefit = arr1;
        console.log("arr1", arr1);
      });
    }

    if (
      claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.NoofDaysFromCToInjury ===
      ""
    ) {
      const NoOfdyasCtoA = diffDaysCalculator(
        new Date(claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa),
        new Date(claimDetails.claimBasicDetails.memberDetails.DOC)
      );
      claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.NoofDaysFromCToAdmission =
        NoOfdyasCtoA;
      console.log("Noofdays", NoOfdyasCtoA);
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    }

    if (claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.length > 0) {
      claimDetails.transactionDataDTO[0].transactionDetails.documentDetails = [];
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      if (upload.length > 0) {
        upload.filter((x) => {
          if (x.fileName !== "") {
            claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.push(x);
            claimDetails.DocumentUploadFlag = "true";
          }
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          return null;
        });
      }
      if (otherUpload.length > 0) {
        otherUpload.filter((x) => {
          if (x.fileName !== "") {
            claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.push(x);
            claimDetails.DocumentUploadFlag = "true";
          }
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          return null;
        });
      }
    }

    // claimDetails.claimNumber = Number(new Date()).toString();
    claimDetails.policyNo = pol;
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    console.log("claimDetails101", claimDetails);

    if (claimDetails.claimStatusId === 0 && claimDetails.claimStatus === "") {
      claimDetails.claimStatusId = 114;
      claimDetails.claimStatus = "Claim Registered";

      // const userName = await GetUserById(userNameId);
      // const userid = `${userName.data.userDetails[0].firstName} ${userName.data.userDetails[0].lastName}`;

      claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName = "";
      // userid;
      // claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName;
      claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName =
        "Customer";
      claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
        claimDetails.claimStatus;
      claimDetails.transactionDataDTO[0].transactionDetails.templateDetails[0].Status =
        claimDetails.claimStatus;

      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

      const dedupde = await claimsDedupe(1022, claimDetails);
      console.log("claimsDedupe", dedupde);
      if (dedupde.status === 200) {
        // if (dedupde.data.responseMessage === "Claim with provided details is already available") {
        //   Swal.fire({
        //     icon: "error",
        //     text: dedupde.data.responseMessage,
        //     confirmButtonColor: "#0079CE",
        //   });
        // }
        if (dedupde.data.responseMessage === "Claim with provided details is already available") {
          Swal.fire({
            icon: "warning",

            // title: "Claim with provided details is already available",
            text: `Claim with provided details is already available`,

            confirmButtonColor: "#d33",
            confirmButtonText: "Track Claims",
          }).then((res) => {
            if (res.isConfirmed) {
              handleTrackClaims();
            }
          });
        } else {
          setLoading(true);
          // debugger;
          const GenericApiResult = await GenericApi(
            "MagmaHospiCash01",
            "MagmaSaveClaimSubmitted",
            claimDetails
          );
          GenericApiResult.finalResult.masterPolicyNo = claimDetails.masterPolicyNo;
          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails =
            claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails;
          // const save = await SaveClaimWFStatus(
          //   GenericApiResult.finalResult.transactionDataDTO[0].transactionNumber,
          //   saveWFDto
          // );
          setLoading(true);

          const claimsWf = {
            Stage: "Claims",
            Status: "325",
            WorkFlowType: "DEO",
            wfstageStatusId: "326",
            workFlowId: "84",
          };
          const save1 = await SaveClaimWFStatus(
            GenericApiResult.finalResult.transactionDataDTO[0].transactionNumber,
            claimsWf
          );
          console.log("savedata", save1);

          console.log("result101", GenericApiResult);
          if (GenericApiResult.responseMessage === "Success") {
            const data1 = {
              TransactionNumber:
                GenericApiResult.finalResult.transactionDataDTO[0].transactionNumber,
            };
            await SaveClaimHistory(data1);

            const ClaimResister = {
              communicationId: 227,
              keyType: "Claims",
              key: GenericApiResult.finalResult.claimNumber,
              stakeHolderDetails: [
                {
                  communicationType: "Email",
                  stakeholderCode: "CUS",
                  communicationValue: policyDetails[0].policyRequest.ProposerDetails.EmailId,
                },
              ],

              // proposalNo: "",
              // policyNo: "",
              // transactionId: "",
              // customerId: "",
              // key: GenericApiResult.finalResult.claimNumber,
              // keyType: "Claims",
              // communicationId: "227",
              // referenceId: "62",
              // ICPDF: true,
              // ISDMS: true,
            };
            await EventCommunicationExecution(ClaimResister);
            const claimsms = {
              communicationId: 244,
              keyType: "MagmaHealth",
              key: GenericApiResult.finalResult.claimNumber,
              stakeHolderDetails: [
                {
                  communicationType: "SMS",
                  stakeholderCode: "CUS",
                  communicationValue: policyDetails[0].policyRequest.ProposerDetails.MobileNo,
                },
              ],
            };
            await EventCommunicationExecution(claimsms);

            const RuleExecution = await GenericApi(
              "MagmaHospiCash01",
              "MagmaRuleExecutions",
              claimDetails
            );
            console.log("RuleExecution", RuleExecution);
            if (RuleExecution.finalResult.successMsg === "Success") {
              if (
                (claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails
                  .benefitName === "Hospicash" ||
                  claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails
                    .benefitName === "EMI Benefit") &&
                GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj
                  .payeeName ===
                  GenericApiResult.finalResult.claimBasicDetails.memberDetails.COIHolderName &&
                GenericApiResult.finalResult.claimAmount !== 0 &&
                handwrittentrue === false
              ) {
                const claimCalculator = await GenericApi(
                  "MagmaHospiCash01",
                  "MagmaClaimsCalculator_V1",
                  GenericApiResult.finalResult
                );
                if (
                  claimCalculator.responseMessage === "Success" &&
                  claimCalculator.finalResult.PayoutAmount > 0
                ) {
                  const AutoApprove = await GenericApi(
                    "MagmaHospiCash01",
                    "Magma_ClaimBenefitReserveRule",
                    claimDetails
                  );

                  if (AutoApprove.status === 1 && AutoApprove.finalResult.outcome === "Success") {
                    GenericApiResult.finalResult.claimStatus = "Claim Approved";
                    GenericApiResult.finalResult.claimStatusId = 115;

                    const Data = {
                      PolicyNumber:
                        GenericApiResult.finalResult.claimBasicDetails.policyDetails.PolicyNumber,
                      CoverName:
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .benefitDetails.benefitName,
                      BenefitName: "Normal",
                      Unit: "",
                      ClaimedFor:
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .benefitDetails.RoomDays,
                      ClaimedAmount: claimCalculator.finalResult.PayoutAmount,
                      RiskItemId:
                        GenericApiResult.finalResult.claimBasicDetails.memberDetails.memberId,
                      RiskItemIdType: "UHID",
                    };
                    // debugger;
                    const SaveBSIResponse = await SaveBSIV2(Data);
                    console.log("saveBSI", SaveBSIResponse);
                    GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount =
                      claimCalculator.finalResult.PayoutAmount;
                    GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier =
                      claimCalculator.finalResult.FinancierPayout;
                    GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer =
                      claimCalculator.finalResult.CustomerPayout;
                    if (claimCalculator.finalResult.HospitalisatonCriteria === "Separate") {
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
                        claimCalculator.finalResult.NormalPayoutSeparate;
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
                        claimCalculator.finalResult.ICUPayoutSeparate;
                    } else {
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
                        claimCalculator.finalResult.NormalPayoutCombined;
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
                        claimCalculator.finalResult.ICUPayoutCombined;
                    }

                    if (claimCalculator.status === 1) {
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDLevelcode =
                        "R50";
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDDescription =
                        "Fever of other and unknown origin";
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AdmissionType =
                        "Emergency";
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].TreatmentType =
                        "Medical Treatment";
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AilmentName =
                        "Others";
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].PreExisting =
                        "No";
                      GenericApiResult.finalResult.claimFields = "Approve";
                      const abc1 = GenericApiResult.finalResult;
                      const res3 = await UpdateClaimDetails(abc1);
                      if (res3.status === 1) {
                        const save2 = await updateStageStatusIdByTno(
                          res3.finalResult.transactionDataDTO[0].transactionNumber,
                          res3.finalResult.claimStatusId
                        );
                        console.log("save1", save2);
                        const dataa = {
                          TransactionNumber:
                            res3.finalResult.transactionDataDTO[0].transactionNumber,
                          CreatedBy: userNameId,
                        };
                        await SaveClaimHistory(dataa);
                      }
                    }

                    if (
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutCustomer !== "0" &&
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutCustomer !== "" &&
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutCustomer !== undefined
                    ) {
                      const beneficialName =
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.payeeName;
                      const name = beneficialName.split(" ").join("");
                      // debugger;
                      const obj1 = {
                        slno:
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.PaymentDetails &&
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.PaymentDetails.length + 1,
                        payeeName: name,
                        // GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        //   .paymentObj.payeeName,
                        // txnType: Paymentdata.txnType,
                        PayeeType:
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.modeofPayment,
                        Payout: "Claims Payout",
                        Approved:
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.finalPayoutCustomer,
                        paidAmount: "NA",

                        refNo: "NA",
                        UTRDate: "",
                        status: "NA",
                        remarks: "NA",
                        Action: "",
                        name: "Customer",
                      };

                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.push(
                        obj1
                      );
                    }
                    if (
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutFinancier !== "0" &&
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutFinancier !== "" &&
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutFinancier !== undefined
                    ) {
                      // debugger;
                      const beneficialName =
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .financierDetails.FinancierName;
                      const name = beneficialName.split(" ").join("");
                      const obj2 = {
                        slno:
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.PaymentDetails.length + 1,
                        payeeName: name,
                        // GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        //   .financierDetails.FinancierName,
                        PayeeType:
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.modeofPayment,
                        Payout: "Claims Payout",
                        Approved:
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.finalPayoutFinancier,
                        paidAmount: "NA",
                        refNo: "NA",
                        UTRDate: "",
                        status: "NA",
                        remarks: "NA",
                        Action: "",
                        name: "Financier",
                      };
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.push(
                        obj2
                      );
                    }
                    Paymentdata.Payout = "Claims Payout";

                    if (
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutCustomer !== "0" &&
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutCustomer !== "" &&
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutCustomer !== undefined
                    ) {
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

                      const integerAmount =
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== "" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== "0" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== undefined
                          ? GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.finalPayoutCustomer
                          : // : GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            //     .paymentObj.finalPayoutFinancier !== "" &&
                            //   GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            //     .paymentObj.finalPayoutFinancier !== "0"
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.finalPayoutFinancier;
                      const formattedAmount = parseFloat(integerAmount).toFixed(2);
                      const beneficialName =
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.payeeName;
                      const name = beneficialName.split(" ").join("");
                      const APIRequest = {
                        transferPaymentRequest: {
                          subHeader: {
                            requestUUID: GenericApiResult.finalResult.claimNumber,
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
                                custUniqRef:
                                  GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                    .memberId,
                                corpAccNum: "",
                                valueDate: today,
                                txnAmount: formattedAmount,
                                beneLEI: "",
                                beneName: name,
                                // GenericApiResult.finalResult.transactionDataDTO[0]
                                //   .transactionDetails.paymentObj.payeeName,
                                beneCode:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.paymentObj.ifscCode,
                                beneAccNum:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.paymentObj.accountNo,
                                beneAcType: "",
                                beneAddr1: "",
                                beneAddr2: "",
                                beneAddr3: "",
                                beneCity:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.hospitalDetails.hospitalCity,
                                beneState:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.hospitalDetails.hospitalState,
                                benePincode:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.hospitalDetails.hospitalPincode,
                                beneIfscCode:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.paymentObj.ifscCode,
                                beneBankName:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.paymentObj.bankName,
                                baseCode: "",
                                chequeNumber: "",
                                chequeDate: "",
                                payableLocation: "",
                                printLocation: "",
                                beneEmailAddr1:
                                  GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                    .EmailId,
                                beneMobileNo:
                                  GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                    .MobileNo,
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
                      const Result = await GenericApi(
                        "MagmaHospiCash01",
                        "SaveClaimPaymentDetails",
                        APIRequest
                      );
                      console.log("Resultssss", Result);
                      const result = await GetPaymentDetails(
                        GenericApiResult.finalResult.claimNumber
                      );
                      console.log("resultss", result);
                      result.data.finalResult.forEach((item, ids) => {
                        const GetPaymentDetailsResponse = item.paymentRequest;
                        console.log("GetPaymentDetailsResponse", GetPaymentDetailsResponse);
                        console.log(
                          "testing",
                          GetPaymentDetailsResponse.TransferPaymentRequest
                            .TransferPaymentRequestBodyEncrypted.paymentDetails[0].beneName
                        );
                        if (
                          GetPaymentDetailsResponse.TransferPaymentRequest
                            .TransferPaymentRequestBodyEncrypted.paymentDetails[0].beneName ===
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.PaymentDetails[ids].payeeName &&
                          GetPaymentDetailsResponse.TransferPaymentRequest
                            .TransferPaymentRequestBodyEncrypted.paymentDetails[0].txnAmount ===
                            parseFloat(
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                                .paymentObj.PaymentDetails[ids].Approved
                            ).toFixed(2)
                        ) {
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].paidAmount = item.paidAmount;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].Action = item.Action;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].refNo = item.refNo;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].remarks = item.remarks;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].status = item.status;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].UTRDate = item.createdDate;
                        }
                      });
                    }
                    if (
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutFinancier !== "0" &&
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        .paymentObj.finalPayoutFinancier !== ""
                    ) {
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

                      const integerAmount =
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutFinancier;
                      const formattedAmount = parseFloat(integerAmount).toFixed(2);
                      const beneficialName =
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .financierDetails.FinancierName;
                      const name = beneficialName.split(" ").join("");

                      const APIRequest = {
                        transferPaymentRequest: {
                          subHeader: {
                            requestUUID: GenericApiResult.finalResult.claimNumber,
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
                                custUniqRef:
                                  GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                    .memberId,
                                corpAccNum: "",
                                valueDate: today,
                                txnAmount: formattedAmount,
                                beneLEI: "",
                                beneName: name,
                                // GenericApiResult.finalResult.transactionDataDTO[0]
                                //   .transactionDetails.financierDetails.FinancierName,
                                beneCode:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.paymentObj.ifscCode,
                                beneAccNum:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.paymentObj.accountNo,
                                beneAcType: "",
                                beneAddr1: "",
                                beneAddr2: "",
                                beneAddr3: "",
                                beneCity:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.hospitalDetails.hospitalCity,
                                beneState:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.hospitalDetails.hospitalState,
                                benePincode:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.hospitalDetails.hospitalPincode,
                                beneIfscCode:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.paymentObj.ifscCode,
                                beneBankName:
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.paymentObj.bankName,
                                baseCode: "",
                                chequeNumber: "",
                                chequeDate: "",
                                payableLocation: "",
                                printLocation: "",
                                beneEmailAddr1:
                                  GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                    .EmailId,
                                beneMobileNo:
                                  GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                    .MobileNo,
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
                      const Result = await GenericApi(
                        "MagmaHospiCash01",
                        "SaveClaimPaymentDetails",
                        APIRequest
                      );
                      console.log("Resultssss", Result);
                      const result = await GetPaymentDetails(
                        GenericApiResult.finalResult.claimNumber
                      );
                      console.log("resultss", result);
                      result.data.finalResult.forEach((item, ids) => {
                        const GetPaymentDetailsResponse = item.paymentRequest;
                        console.log("GetPaymentDetailsResponse", GetPaymentDetailsResponse);
                        console.log(
                          "testing",
                          GetPaymentDetailsResponse.TransferPaymentRequest
                            .TransferPaymentRequestBodyEncrypted.paymentDetails[0].beneName
                        );
                        if (
                          GetPaymentDetailsResponse.TransferPaymentRequest
                            .TransferPaymentRequestBodyEncrypted.paymentDetails[0].beneName ===
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.PaymentDetails[ids].payeeName &&
                          GetPaymentDetailsResponse.TransferPaymentRequest
                            .TransferPaymentRequestBodyEncrypted.paymentDetails[0].txnAmount ===
                            parseFloat(
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                                .paymentObj.PaymentDetails[ids].Approved
                            ).toFixed(2)
                        ) {
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].paidAmount = item.paidAmount;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].Action = item.Action;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].refNo = item.refNo;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].remarks = item.remarks;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].status = item.status;
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                            ids
                          ].UTRDate = item.createdDate;
                        }
                      });
                    }

                    const res2 = await UpdateClaimDetails(GenericApiResult.finalResult);
                    if (res2.status === 1) {
                      const save2 = await updateStageStatusIdByTno(
                        res2.finalResult.transactionDataDTO[0].transactionNumber,
                        res2.finalResult.claimStatusId
                      );
                      console.log("save1", save2);
                      const dataa = {
                        TransactionNumber: res2.finalResult.transactionDataDTO[0].transactionNumber,
                        CreatedBy: userNameId,
                      };
                      await SaveClaimHistory(dataa);
                    }
                  }
                }
              }
            }

            setLoading(false);
            setStepForword(stepForward + 1);
            Swal.fire({
              icon: "success",

              title: "We've got your claim Submission",
              // text: `Your Claim Number is ${result.data.finalResult.claimNumber}`,
              html: `
        <div>
         <img src=${magmapayment} alt="success">
          <p>Your Claim Number is ${GenericApiResult.finalResult.claimNumber}.</p><br/>
          <p style="font-size: 12px;">keep your claim number handy for future reference.</p>
        </div>
      `,
              confirmButtonColor: "#d33",
              confirmButtonText: "Track Claims",
            }).then((res) => {
              if (res.isConfirmed) {
                handleTrackClaims();
              }
            });
          }
        }
      }
    }
  };

  const handleAddDocument = () => {
    const obj1 = {
      docId: "",
      docName: "",
      UploadDocDate: "",
      fileName: "",
    };
    otherUpload.push(obj1);
    setOtherUpload([...otherUpload]);
    setOtherFlag(true);
    // setAddDoc((prevState) => prevState + 1);
    // setShowCancel(true);
    console.log("otherdoc", otherUpload);
  };
  const handleAddother = (e, id) => {
    if (e.target.name === "other") {
      otherUpload[id].docName = e.target.value;
    }
    setOtherUpload([...otherUpload]);
  };

  const handleOtherRemove = (id) => {
    const newUploadFlags = [...otherUploadFlag];
    newUploadFlags[id] = false;
    setOtherUploadFlag(newUploadFlags);
    if (otherUpload[id].fileName !== "") {
      // otherUpload[id] = "";
      otherUpload[id].fileName = "";
      otherUpload[id].UploadDocDate = "";
      setOtherUpload([...otherUpload]);
    }
  };
  const handleDeleteOther = (id) => {
    const updatedOtherUpload = [...otherUpload];
    updatedOtherUpload.splice(id, 1);
    setOtherUpload(updatedOtherUpload);
  };
  const handleRemoveRow = (id) => {
    const newUploadFlags = [...uploadFlags];
    newUploadFlags[id] = false;
    setUploadFlags(newUploadFlags);
    upload[id].docId = "";
    // upload[id].base64 = "";
    upload[id].UploadDocDate = "";
    upload[id].fileName = "";
    uploadD[id].base64 = "";
    upload[id].fileName = "";
    setUploadD([...uploadD]);
    setUpload([...upload]);
    // setAddDoc(updatedAddDoc);
    // setUpload(updatedUpload);
  };
  console.log("2134", upload);

  useEffect(() => {
    if (ocrSwalFlag === true) {
      Swal.fire({
        html: `<div style={{display:"flex"}}>
      <img src=${scanningGIF} style="height:6rem;">
      <div><p> We're Currently scanning your docs to find the important stuff.
      It might take a little while...</p><br/>`,
        showConfirmButton: false,
      });
    } else {
      Swal.close();
    }
  }, [ocrSwalFlag]);

  const CallApis = async (base64, docname) => {
    let DischargeData = "";
    let invoiceResult = "";
    const outputdata = await GetDocumentApimId(base64);
    const CallGetDocumentDataByApimId = async () => {
      const Data = await GetDocumentDataByApimId(outputdata.data);
      if (Object.keys(Data).length === 0) {
        await CallGetDocumentDataByApimId();
      } else {
        DischargeData = Data;
      }
    };
    await CallGetDocumentDataByApimId();
    const outputdata1 = await GetInvoiceApimId(base64);
    const CallGetInvoiceDataByApimId = async () => {
      const data = await GetInvoiceDataByApimId(outputdata1.data);
      if (Object.keys(data).length === 0) {
        await CallGetInvoiceDataByApimId();
      } else {
        invoiceResult = data;
      }
    };
    await CallGetInvoiceDataByApimId();

    function removePatterns(input) {
      const removedComma = input.replace(/,/g, ""); // Remove commas
      const removedTime = removedComma.replace(/\n\d+:\d+/, ""); // Remove pattern "\nX:XX"
      return removedTime;
    }
    function convertDateFormat(inputDate) {
      const parts = inputDate.split(" ")[0].split("/");
      if (parts.length === 3 || parts.length === 2) {
        let [day, month, year] = parts;
        const monthMapping = {
          jan: "01",
          feb: "02",
          mar: "03",
          apr: "04",
          may: "05",
          jun: "06",
          jul: "07",
          aug: "08",
          sep: "09",
          oct: "10",
          nov: "11",
          dec: "12",
        };
        if (month.toLowerCase() in monthMapping) {
          month = monthMapping[month.toLowerCase()];
        }
        if (month <= 9) {
          month = `${month}`;
        }
        if (day <= 9) {
          day = `${day}`;
        }
        year = `${year}`;
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      }
      return null;
      // else {
      //   return null; // Invalid input format
      // }
    }

    console.log("invoiceResult", invoiceResult);
    console.log("DischargeData", DischargeData);
    // const name = uploadD[index].docName.toLowerCase();
    if (docname.includes("discharge")) {
      if (invoiceResult.status === "succeeded" && base64 !== "") {
        setOcrSwalFlag(false);
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress =
          invoiceResult.analyzeResult.documentResults[0].fields.VendorAddress.valueString;
        const res =
          claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress;
        const pincodeRegex = /\b\d{6}\b/;
        const matchessucess = res.match(pincodeRegex);
        if (matchessucess !== null && matchessucess) {
          // console.log("Nanditha", matches[0]);

          claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode = [
            matchessucess[0],
          ];
        }
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName =
          invoiceResult.analyzeResult.documentResults[0].fields.VendorName.valueString;
        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      }
      if (DischargeData.status === "succeeded" && base64 !== "") {
        setOcrSwalFlag(false);
        DischargeData.analyzeResult.styles.forEach((X) => {
          if (X.isHandwritten === true) {
            sethandwrittentrue(true);
          }
        });
        DischargeData.analyzeResult.paragraphs.forEach(async (x) => {
          const str = x.content;
          // const spaceregex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
          // const spaceregex = /^[1-9]\d{2}\s?\d{3}$/;
          const spaceregex = /\b\d{3}\s?\d{3}\b/;
          const spaceregexRes = str.match(spaceregex);
          if (spaceregexRes !== null && spaceregexRes) {
            const spaceRemove = spaceregexRes[0].replace(/\s/g, "");

            claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode =
              spaceRemove;
          } else {
            const regex = /\d+/g;

            const regexMatch = str.match(regex);
            if (regexMatch !== null) {
              regexMatch.forEach((num) => {
                if (num.length === 6) {
                  const pincodeRegex = /\b\d{6}\b/;
                  const matches = num.match(pincodeRegex);
                  if (matches && !ocrPincodeflag) {
                    console.log("Nanditha", matches[0]);
                    [
                      claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails
                        .hospitalPincode,
                    ] = matches;

                    // claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode =
                    //   matches[0];
                    setOcrPincodeFlag(true);
                  }
                }
              });
            }
          }
          // debugger;
        });
        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

        const req = {
          productId: 1022,
        };
        const PincodeObject = {
          PIN: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails
            .hospitalPincode,
        };

        const StateID = await master(req.productId, "Pincode_Master", PincodeObject);
        console.log("StateID", StateID);
        if (StateID.status === 200) {
          const stateResponse = {
            State_id: StateID.data[0].State_Id,
          };
          const cityResponse = { CityDistrict_Id: StateID.data[0].City_Id };
          const CityResult = await master(req.productId, "CityDistric_Name", cityResponse);
          if (CityResult.status === 200) {
            console.log("CityResult", CityResult);
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity =
              CityResult.data[0].mValue;
          }
          const stateRes = await master(req.productId, "State_Master", stateResponse);
          console.log("stateRes", stateRes);
          if (stateRes.status === 200) {
            // Assuming this should be a single value, not a map
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState =
              stateRes.data[0].mValue;

            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
        }

        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

        DischargeData.analyzeResult.keyValuePairs.filter((x) => {
          const res = x.key.content.toLowerCase();
          // if (x.key.content === "NAME:") {
          //   claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName =
          //     x.value.content;
          // }
          if (res.includes("diagnosis")) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
          if (res.includes("patient name") && !patientNameFlag) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          } else if (res.includes("patient's name") && !patientNameFlag) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          } else if (res.includes("name of patient") && !patientNameFlag) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          } else if (res.includes("patients name") && !patientNameFlag) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          } else if (res.includes("pt name") && !patientNameFlag) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;

            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          } else if (
            res === "name" ||
            res === "name:" ||
            res === "name " ||
            (res === "name :" && !patientNameFlag)
          ) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;

            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          }
          if (res.includes("admission")) {
            const data = x.value.content;
            if (data.includes(".")) {
              let [dd, mm, yyyy] = data.split(".");
              yyyy = `${yyyy}`;
              mm = mm.padStart(2, "0");
              dd = dd.padStart(2, "0");
              const ab = `20${yyyy}-${mm}-${dd}`;
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = ab;
              setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            }
            if (data.includes("/")) {
              const convertedDate1 = convertDateFormat(data);
              const cl = removePatterns(convertedDate1);
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = cl;
              setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            }
          }
          if (res.includes("discharge")) {
            const data = x.value.content;
            if (data.includes(".")) {
              let [dd, mm, yyyy] = data.split(".");
              yyyy = `${yyyy}`;
              mm = mm.padStart(2, "0");
              dd = dd.padStart(2, "0");
              const ab = `20${yyyy}-${mm}-${dd}`;
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod = ab;
              setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            }

            if (data.includes("/")) {
              const convert = convertDateFormat(data);
              const cls = removePatterns(convert);
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod =
                cls;
              setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            }
          }
          if (
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !==
              "" &&
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa !== ""
          ) {
            const lengthOfStay = diffDaysCalculator(
              new Date(
                claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa
              ),
              new Date(
                claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod
              )
            );
            if (
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !==
              ""
            ) {
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay =
                lengthOfStay;
            }
            if (
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails
                .lengthOfStay !== "" &&
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails
                .lengthOfStay >=
                claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible &&
              claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "Hospicash"
            ) {
              claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
                claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails
                  .lengthOfStay -
                claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible;
              // setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
              // }
              // const arr = [];
            } else {
              claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = "";
            }
            // if (
            //   claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails
            //     .lengthOfStay !== "" &&
            //   claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails
            //     .lengthOfStay >=
            //     claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible
            // ) {
            //   claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
            //     claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails
            //       .lengthOfStay -
            //     claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible;
            //   // setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
            //   // }
            //   // const arr = [];
            // } else {
            //   claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = 0;
            // }
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            console.log("lengthOfStay", lengthOfStay);
          }
          return true;
        });
      }
    }
    if (docname.includes("bank")) {
      if (invoiceResult.status === "succeeded" && base64 !== "") {
        const data1 = {
          productId: 1022,
          MasterType: "BankMasterCriteria",
          Bank_Name: invoiceResult.analyzeResult.documentResults[0].fields.VendorName.valueString,
        };
        const BankName = { Bank_Name: data1.Bank_Name };
        const bankapi = await masterIFSC(data1.productId, data1.MasterType, BankName);
        if (bankapi.status === 200) {
          if (bankapi.data.length > 0) {
            claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName =
              invoiceResult.analyzeResult.documentResults[0].fields.VendorName.valueString;
          }
          // else {
          //   claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
          //   swal({
          //     html: true,
          //     icon: "warning",
          //     // title: "Claim Intimated Successful",
          //     text: " Bank name not available in Bank Master",
          //   });
          // }
        }
        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      }
      if (DischargeData.status === "succeeded" && base64 !== "") {
        // DischargeData.analyzeResult.styles.forEach((X) => {
        //   if (X.isHandwritten === true) {
        //     sethandwrittentrue(true);
        //   }
        // });
        DischargeData.analyzeResult.keyValuePairs.filter((x) => {
          const res = x.key.content.toLowerCase();
          if (res.includes("name")) {
            claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
          if (res.includes("ifs")) {
            if (claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName !== "") {
              claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode =
                x.value.content;
            } else {
              claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
            }
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
          if (
            res.includes("account no") ||
            res.includes("account number") ||
            res.includes("a/c no") ||
            res.includes("खाता क्र.")
          ) {
            if (x.value !== undefined && x.value.content !== "") {
              claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.accountNo =
                x.value.content;
            }
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
          return true;
        });

        DischargeData.analyzeResult.pages[0].lines.filter((items) => {
          if (
            items.content.toUpperCase() ===
            claimDetails.claimBasicDetails.memberDetails.COIHolderName.toUpperCase()
          ) {
            claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName =
              items.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
          return true;
        });
      }
    }
  };

  const onOCRReader = async () => {
    // debugger;
    let file = 0;

    claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.forEach((x) => {
      if (x.fileName !== "") {
        file += 1;
      }
    });

    if (file === 0) {
      setLoading(true);
      claimDetails.DocumentUploadFlag = "false";
      claimDetails.policyNo = pol;
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      if (claimDetails.claimStatusId === 0 && claimDetails.claimStatus === "") {
        claimDetails.claimStatusId = 113;
        claimDetails.claimStatus = "Claim Intimation";

        // const userName = await GetUserById(userNameId);
        // const userid = `${userName.data.userDetails[0].firstName} ${userName.data.userDetails[0].lastName}`;

        claimDetails.masterPolicyNo =
          policyDetails[0].policyRequest.MasterPolicyDetails[0].masterPolicyNo;
        claimDetails.transactionDataDTO[0].transactionDetails.templateDetails[0].Status =
          claimDetails.claimStatus;
        claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName = "";
        // userid;
        // claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName;
        claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName =
          "Customer";
        claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
          claimDetails.claimStatus;
        const arr1 = [];
        if (
          policyDetails[0].policyRequest.PlanDetails[0].groupDetailsJson.SectionMaster
            .SumInsuredType === "Floater"
        ) {
          policyDetails[0].policyRequest.InsurableItem[0].RiskItems[0].Benefit.forEach((x) => {
            arr1.push({
              CoverName: x.CoverName,
              Benefit: x.Benefit,
              Value: x.Value,
            });
            claimDetails.claimBasicDetails.memberDetails.MemberBenefit = arr1;
            console.log("arr1", arr1);
          });
        }
        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        const GenericApiResult = await GenericApi(
          "MagmaHospiCash01",
          "MagmaSaveClaimSubmitted",
          claimDetails
        );

        GenericApiResult.finalResult.masterPolicyNo = claimDetails.masterPolicyNo;
        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ApprovalDetails =
          claimDetails.transactionDataDTO[0].transactionDetails.ApprovalDetails;

        if (GenericApiResult.responseMessage === "Success") {
          const data1 = {
            TransactionNumber: GenericApiResult.finalResult.transactionDataDTO[0].transactionNumber,
          };
          await SaveClaimHistory(data1);

          const ShareIntimation = {
            communicationId: 226,
            keyType: "Claims",
            key: GenericApiResult.finalResult.regClaimNo,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: policyDetails[0].policyRequest.ProposerDetails.EmailId,
              },
            ],
          };

          await EventCommunicationExecution(ShareIntimation);

          const jsonValue = {
            communicationId: 196,
            keyType: "MagmaHealth",
            key: GenericApiResult.finalResult.regClaimNo,
            stakeHolderDetails: [
              {
                communicationType: "SMS",
                stakeholderCode: "CUS",
                communicationValue: policyDetails[0].policyRequest.ProposerDetails.MobileNo,
              },
            ],
          };
          await EventCommunicationExecution(jsonValue);

          setStepForword(stepForward + 1);
          setLoading(false);
          Swal.fire({
            // html: true,
            icon: "success",
            title: "Claim Intimation is Successful",
            // text: "Your Claim Intimation  Number is 123456789 = ${mynum}",
            html: `
              <div>
                <p>Your Claim Intimation  Number is ${GenericApiResult.finalResult.regClaimNo}.</p><br/>
                <p style="font-size: 12px;">Keep your intimation number handy for future reference.</p>
              </div>
            `,
            confirmButtonColor: "#d33",
            confirmButtonText: "Track Claims",
          }).then((res) => {
            if (res.isConfirmed) {
              handleTrackClaims();
            }
          });
        }
      }

      // console.log("GenericApiResult", GenericApiResult);
    } else if (file > 0) {
      claimDetails.DocumentUploadFlag = "true";

      const Payload = {
        productCode: "MagmaHospiCash01",
        // planType: "TestPlan1",
        planType: policyDetails[0].policyRequest.Plan,
        filterCriteria: [
          {
            SI: "",
            Type: "",
            Region: "",
            currency: "INR",
          },
        ],
        isFilterMemberWise: false,
        setBenefitMemberWise: false,
        insurableItems: null,
      };
      const res1 = await GetBenefits(Payload);
      console.log("res1", res1);
      if (res1.status === 1) {
        res1.finalResult.benefits.forEach((x) => {
          if (
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            x.CoverName
          ) {
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Name = x.Benefit;
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible =
              x.Deductible;
          }
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        });
      }

      // setOCRFlag(true);

      uploadD.forEach(async (xy) => {
        setOcrSwalFlag(true);
        const abc = xy.docName.toLowerCase();
        if (abc.includes("discharge") && xy.base64 !== "") {
          // if (xy.docId === "65" && xy.base64 !== "") {
          await CallApis(xy.base64, abc);
        }
        if (abc.includes("bank") && xy.base64 !== "") {
          await CallApis(xy.base64, abc);
        }
      });

      setOCRFlag(true);
    } else console.log("calaimDetails", claimDetails);
    // claimDetails.claimAmount === "" ||
    //   claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit === "";
    // {
    //   setValidate(true);
    // }
  };
  useEffect(() => {
    const policy = localStorage.getItem("policyNO");
    setPol(policy);
  }, []);

  useEffect(() => {
    console.log("searchObj", SearchObj);
  }, [SearchObj]);
  useEffect(() => {
    console.log("memberData", memberData);
  }, [memberData]);
  useEffect(() => {
    console.log("policy details", policyDetails);
  }, [policyDetails]);
  useEffect(() => {
    console.log("risk details", tableRows);
  }, [tableRows]);
  useEffect(() => {
    console.log("claim details", claimDetails);
  }, [claimDetails]);
  // const location = useLocation();
  // console.log("flag", flag);

  // useEffect(async () => {
  //   debugger;
  //   if (
  //     location.state.trackClaimsPage === true
  //     //  claimDetails.claimBasicDetails.memberDetails.memberId !== ""
  //   ) {
  //     setMemFlag(true);
  //     setStepperFlag(true);
  //     setStepForword(stepForward + 1);
  //     setclaimFlag(false);
  //     // CustomerClaimIntimation(onPolicySearch);
  //     const policyData = await GetPolicyInfoByPolicyNumber(location.state.policyNo);

  //     if (policyData.policy_details.length !== 0) {
  //       setTableRows(policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems);
  //       setPolicyDetails(policyData.policy_details);
  //       const arr = [];
  //       policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems.forEach((row) => {
  //         arr.push({
  //           UHID: row.UHID,
  //           RelationShipToProposer: row.RelationShipToProposer,
  //           Name: row.Name,
  //         });
  //         setTableRows([...arr]);
  //       });
  //       policyData.policy_details[0].policyRequest.Benefit.forEach((x) => {
  //         benefit.push(x.CoverName);
  //       });
  //       setBenefit([...benefit]);
  //     }
  //   }
  // }, []);

  const controlItems = [
    {
      type: "Input",
      label: "UHID",
      visible: true,
      name: "uhid",
      value: claimDetails.claimBasicDetails.memberDetails.memberId,
      path: "memberDetails",
      // disable: true,
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "MemberName",
      visible: true,
      name: "insuredName",
      value: claimDetails.claimBasicDetails.memberDetails.insuredName,
      path: "memberDetails",
      InputProps: { readOnly: true },
    },
    // {
    //   type: "Input",
    //   label: "Claimed Amount",
    //   visible: true,
    //   name: "claimedAmount",
    //   value: claimDetails.transactionDataDTO[0].transactionDetails.claimedAmount,
    //   path: "transactionDetails",
    // },
    {
      type: "AutoComplete",
      label: "Benefit Type",
      visible: true,
      name: "benefit",
      value: claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit,
      path: "benefitDetails",
      option: benefit,
    },
  ];

  const ocrReadItems = [
    {
      type: "DateTime",
      required: true,
      label: "Date Of Admission",
      visible: true,
      name: "doa",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
      path: "hospitalizationDetails",
      maxDate: new Date(),
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      required: true,
      label: "Date Of Discharge",
      visible: true,
      name: "dod",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod,
      path: "hospitalizationDetails",
      maxDate: new Date(),
      minDate: new Date(
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa
      ),
      InputProps: { readOnly: true },
    },
    // {
    //   type: "DateTime",
    //   label: "Date Of Admission",
    //   visible: true,
    //   name: "doa",
    //   value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
    //   path: "hospitalizationDetails",
    //   InputProps: { readOnly: true },
    // },
    // {
    //   type: "DateTime",
    //   label: "Date Of Discharge",
    //   visible: true,
    //   name: "dod",
    //   value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod,
    //   path: "hospitalizationDetails",
    //   InputProps: { readOnly: true },
    // },
    {
      type: "Input",
      label: "Diagnosis",
      visible: true,
      name: "diagnosis",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis,
      path: "hospitalizationDetails",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Length of Stay",
      visible: true,
      name: "lengthOfStay",
      customOnChange: [IsNumeric],
      value:
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay,
      path: "hospitalizationDetails",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      required: true,
      label: "Patient Name",
      visible: true,
      name: "PatientName",
      value:
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName,
      path: "hospitalizationDetails",
      InputProps: { readOnly: true },
      // onChangeFuncs: [IsAlphaSpace],
    },
    {
      type: "Input",
      label: "Hospital Name",
      visible: true,
      name: "hospitalName",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
      path: "hospitalDetails",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Hospital Address",
      visible: true,
      name: "hospitalAddress",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress,
      path: "hospitalDetails",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Hospital City",
      visible: true,
      name: "hospitalCity",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
      path: "hospitalDetails",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      // required: true,
      label: "Hospital Pincode",
      visible: true,
      name: "hospitalPincode",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
      path: "hospitalDetails",
      InputProps: { readOnly: true },
      // option: pincode,
      // customOnChange: (e, value) => handleICD(e, value, "hospitalPincode"),
    },
    {
      type: "Input",
      label: "Hospital State",
      visible: true,
      name: "hospitalState",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
      path: "hospitalDetails",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Payee Name",
      visible: true,
      name: "payeeName",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName,
      path: "paymentObj",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Bank Name",
      visible: true,
      name: "bankName",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
      path: "paymentObj",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Account No",
      visible: true,
      name: "accountNo",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
      path: "paymentObj",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "IFSC Code",
      visible: true,
      name: "ifscCode",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
      path: "paymentObj",
      InputProps: { readOnly: true },
    },
    // {
    //   type: "Input",
    //   label: "PAN NO",
    //   visible: true,
    //   name: "ifscCode",
    //   value: claimDetails.PancardNo,
    //   path: "paymentObj",
    // },
    // {
    //   type: "Input",
    //   label: "PAN Card Holder Name",
    //   visible: true,
    //   name: "ifscCode",
    //   value: claimDetails.PanName,
    //   path: "paymentObj",
    // },
  ];
  const steps = ["Validate", "Select Members", "Intimate Claim"];
  const handleBacktoRCorTCSelection = () => {
    setShowOtpValidation(false);
    Swal.fire({
      // text: "How Do You Want To Proceed",
      title: '<span style="color: red;font-size: 1.3rem">How Do You Want To Proceed</span>',
      input: "radio",
      inputOptions: {
        option1: "Register New Claim",
        option2: "Track Existing Claim",
      },
      confirmButtonText: "Proceed",
      // confirmButtonDisabled: true,
      confirmButtonColor: "#dc3545",
      allowOutsideClick: false,
      preConfirm: (option) => {
        if (!option) {
          Swal.showValidationMessage("Please select an option");
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value === "option1") {
          setMemFlag(true);
        } else if (result.value === "option2") {
          handleTrackClaims();
        }
      }
    });
  };
  const handleCheckBox = (e) => {
    setAgreement(e.target.checked);
  };
  const handelBacktoMemberSelection = () => {
    // debugger;

    setSelectedRow("");
    claimDetails.claimStatusId = 0;
    claimDetails.claimStatus = "";
    claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = "";
    claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.documentDetails = [];
    claimDetails.transactionDataDTO[0].transactionDetails.claimedAmount = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.accountNo = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = "";
    setBenefitType([]);
    setBenefit([]);
    // setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    if (stepForward === 2) {
      setStepForword(stepForward - 1);
    } else if (stepForward === 3) {
      setStepForword(stepForward - 2);
    } else if (stepForward === 4) {
      setStepForword(stepForward - 3);
    } else {
      setStepForword(1);
    }
    setMemFlag(true);
    setDetailsFlag(false);
    setDocumentFlag(false);
    setOCRFlag(false);
    setDisableFlag(false);
    setAgreement(false);
  };

  return (
    <Card>
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
      {claimFlag === true && (
        <>
          <Grid container p={2} justifyContent="center">
            <MDTypography variant="body1" color="primary">
              Customer Claims
            </MDTypography>
          </Grid>
          <Grid container spacing={4} p={2} justifyContent="center">
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="COI Number"
                name="policyNo"
                onBlur={handleOnBlur}
                disabled={flags.coiflag}
                value={SearchObj.policyNo}
                inputProps={{ maxLength: 37 }}
                onChange={(e) => handleChange(e, "SearchObj")}
              />
              {flags.nameReg === true ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter Valid COI Number
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="UHID"
                name="UHID"
                value={SearchObj.UHID}
                onBlur={handleOnBlur}
                disabled={flags.uhidflag}
                inputProps={{ maxLength: 17 }}
                onChange={(e) => handleChange(e, "SearchObj")}
              />
              {flags.uhidReg === true ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter Valid UHID
                </MDTypography>
              ) : null}
            </Grid>
          </Grid>
          <Grid container p={2} justifyContent="center">
            <MDButton
              sx={{ justifyContent: "right" }}
              variant="contained"
              onClick={onPolicySearch}
              disabled={flags.searchbuttonflag === true}
            >
              SEARCH
            </MDButton>
          </Grid>
        </>
      )}
      {otpFlag === true && (
        <>
          <Grid container spacing={4} p={2} justifyContent="center">
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="OTP"
                name="otp"
                value={validateOtpData.otp}
                onChange={(e) => handleChange(e, "otp")}
                inputProps={{ maxLength: 6 }}
                // error={errorR.Otperror && validateOtpData.otp === ""}
                // helperText={errorR.Otperror && validateOtpData.otp === "" && mes}
              />
            </Grid>
          </Grid>
          {/* {sendOtpBtnFlag === true && (
            <Grid container p={2} justifyContent="center">
              <MDButton sx={{ justifyContent: "right" }} variant="contained" onClick={onSendOTP}>
                SEND OTP
              </MDButton>
            </Grid>
          )} */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="center" direction="row">
              <MDTypography
                sx={{
                  fontSize: "0.9rem",
                  color: "green",
                }}
              >
                {startCounterFlag && <Timer counter={counter} />}
              </MDTypography>
            </Stack>
          </Grid>

          <MDBox>
            {/* {timerFlag === true && (
              <Grid container p={2} justifyContent="center">
                <MDButton variant="outlined" onClick={onSendOTP}>
                  RESEND OTP
                </MDButton>
              </Grid>
            )} */}

            {sendOtpBtnFlag === true ? (
              <Grid container p={2} justifyContent="center">
                <MDButton variant="contained" onClick={handleNextOtp} disabled={sendotp}>
                  SEND OTP
                </MDButton>
              </Grid>
            ) : null}
          </MDBox>
        </>
      )}
      {otpValidateFlag === true && (
        <Grid container p={2} justifyContent="center">
          <MDButton variant="contained" onClick={onValidateOtp} disabled={validateotpdisabled}>
            VALIDATE OTP
          </MDButton>
        </Grid>
      )}
      {timerFlag === true && (
        <Stack justifyContent="center" direction="row" spacing={2} p={2} ml="6.5rem">
          <Grid item xs={12} sm={12} md={1.2} lg={1.2} xl={1.2} xxl={1.2}>
            <MDButton variant="contained" onClick={onValidateOtp} disabled={validateotpdisabled}>
              VALIDATE OTP
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
            <MDButton variant="outlined" onClick={onResendOTP} disabled={otpdisabled}>
              RESEND OTP
            </MDButton>
          </Grid>
        </Stack>
      )}

      <br />
      {stepperFlag === true && (
        <>
          <Grid container p={2} justifyContent="center">
            <MDBox component="img" src={MagmaLogo} alt="master card" width="20%" mr={2} />
          </Grid>
          <Grid container p={2} justifyContent="center">
            <MDTypography variant="body1" color="primary">
              Customer Claim Intimation
            </MDTypography>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Stepper activeStep={stepForward} alternativeLabel sx={{ width: "50%", height: "50%" }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </>
      )}

      {memFlag === true ? (
        <Grid p={2}>
          {/* <DataGrid
            autoHeight
            rows={tableRows}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.MemberID}
            checkboxSelection
            onSelectionModelChange
            onRowClick={(param) => handleMemberClick(param)}
          /> */}
          <DataGrid
            autoHeight
            rows={tableRows}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.UHID}
            // onSelectionModelChange={(param) => console.log("checked", param)}
          />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MDButton
                color="error"
                onClick={() => handleBacktoRCorTCSelection()}
                variant="outlined"
                sx={{ ml: "23rem" }}
              >
                Back
              </MDButton>
            </Grid>
            <Grid item xs={6}>
              <MDButton
                disabled={!disableFlag}
                // color="primary"<Button disabled>Disabled</Button>
                onClick={() => handleProceedtoClaim()}
              >
                PROCEED
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      ) : null}

      {detailsFlag === true ? (
        <>
          <Grid container spacing={2} p={2}>
            {controlItems.map((item) =>
              item.visible ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl
                    item={item}
                    claimDetails={claimDetails}
                    policyDetails={policyDetails}
                    setClaimDetails={setClaimDetails}
                    documents={documents}
                    setDocuments={setDocuments}
                    setUpload={setUpload}
                    setUploadD={setUploadD}
                    array1={array1}
                    array2={array2}
                    array3={array3}
                    arrayD={arrayD}
                    setArray1={setArray1}
                    setArray2={setArray2}
                    setArray3={setArray3}
                    setArrayD={setArrayD}
                    // customOnChange={customOnChange}
                    setOtherUpload={setOtherUpload}
                    setUploadFlags={setUploadFlags}
                    uploadFlags={uploadFlags}
                    upload={upload}
                    otherUpload={otherUpload}
                    setOtherUploadFlag={setOtherUploadFlag}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
          {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName !==
          "" ? (
            <Grid>
              <Grid container spacing={2} p={2}>
                <MDTypography variant="body1" color="primary" sx={{ ml: "1rem" }}>
                  Upload Document
                </MDTypography>
                <MDTypography variant="body1" color="primary" sx={{ ml: "10rem" }}>
                  Browse Files
                </MDTypography>
              </Grid>
              <Grid>
                {(claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails
                  .benefitName === "Hospicash" ||
                  claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails
                    .benefitName === "Child Education Grant" ||
                  claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails
                    .benefitName === "Loss of Job" ||
                  claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails
                    .benefitName === "EMI Benefit") && (
                  <Grid container spacing={2} p={2}>
                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Grid container spacing={2}> */}
                    {documents.map((x, id) => (
                      <React.Fragment key={x.mID}>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                          <MDInput value={x.Value} label="Document Type" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
                          <label htmlFor={`file-upload-${id}`}>
                            <input
                              id={`file-upload-${id}`}
                              name={`file-upload-${id}`}
                              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => handleUpload(id, e)}
                              onClick={(e) => {
                                e.target.value = "";
                              }}
                              disabled={uploadFlags[id]}
                            />
                            <MDButton variant="outlined" color="error" component="span">
                              Upload
                            </MDButton>
                          </label>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5}>
                          {documentflag === true ? (
                            <Grid sx={{ fontSize: "16px" }}>
                              {upload[id] && <p>{upload[id].fileName}</p>}
                            </Grid>
                          ) : null}
                        </Grid>

                        {upload[id] && upload[id].fileName && (
                          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                            </IconButton>
                          </Grid>
                        )}
                      </React.Fragment>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          ) : null}
          <Grid>
            {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Critical Illness" ||
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Personal Accident" ? (
              <Grid container spacing={0.5} p={2}>
                {documents.map((x, id) => (
                  <React.Fragment key={x.mID}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {id < 1 && <MDTypography>{array1[0]}</MDTypography>}
                    </Grid>
                    {x && x.TypeCode === "Non Medical Documents" ? (
                      <>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                          <MDInput
                            sx={{ marginTop: "8px" }}
                            value={x.Value}
                            label="Document Type"
                          />
                        </Grid>

                        <Grid item xs={4} marginTop="10px">
                          <label htmlFor={`file-upload-${id}`}>
                            <input
                              id={`file-upload-${id}`}
                              name={`file-upload-${id}`}
                              // accept="image/jpeg,application/pdf,png"
                              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => handleUpload(id, e)}
                              disabled={uploadFlags[id]}
                              onClick={(e) => {
                                e.target.value = "";
                              }}
                            />
                            <MDButton variant="outlined" color="error" component="span">
                              Upload
                            </MDButton>
                          </label>
                        </Grid>
                        <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                          {documentflag === true ? (
                            <Grid sx={{ fontSize: "14px" }}>
                              {upload[id] && <p>{upload[id].fileName}</p>}
                            </Grid>
                          ) : null}
                        </Grid>

                        {upload[id] && upload[id].fileName && (
                          <Grid item xs sx={{ ml: "2rem" }}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                            </IconButton>
                          </Grid>
                        )}
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </Grid>
            ) : null}
          </Grid>
          <Grid>
            {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Critical Illness" ? (
              <Grid container spacing={0.5} p={2}>
                {documents.map((x, id) => (
                  <React.Fragment key={x.mID}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {id < 1 && <MDTypography>{arrayD[0]}</MDTypography>}
                    </Grid>
                    {x && x.TypeCode === "Medical Documents" ? (
                      <>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                          <MDInput
                            sx={{ marginTop: "8px" }}
                            value={x.Value}
                            label="Document Type"
                          />
                        </Grid>

                        <Grid item xs={4} marginTop="10px">
                          <label htmlFor={`file-upload-${id}`}>
                            <input
                              id={`file-upload-${id}`}
                              name={`file-upload-${id}`}
                              // accept="image/jpeg,application/pdf,png"
                              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => handleUpload(id, e)}
                              disabled={uploadFlags[id]}
                              onClick={(e) => {
                                e.target.value = "";
                              }}
                            />
                            <MDButton variant="outlined" color="error" component="span">
                              Upload
                            </MDButton>
                          </label>
                        </Grid>
                        <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                          {documentflag === true ? (
                            <Grid sx={{ fontSize: "14px" }}>
                              {upload[id] && <p>{upload[id].fileName}</p>}
                            </Grid>
                          ) : null}
                        </Grid>

                        {upload[id] && upload[id].fileName && (
                          <Grid item xs sx={{ ml: "2rem" }}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                            </IconButton>
                          </Grid>
                        )}
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </Grid>
            ) : null}
          </Grid>
          <Grid>
            {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Personal Accident" ? (
              <Grid container spacing={0.5} p={2}>
                {documents.map((x, id) => (
                  <React.Fragment key={x.mID}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {id < 1 && <MDTypography>{array2[0]}</MDTypography>}
                    </Grid>
                    {x && x.TypeCode === "Required in Case of Death" ? (
                      <>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                          <MDInput
                            sx={{ marginTop: "8px" }}
                            value={x.Value}
                            label="Document Type"
                          />
                        </Grid>

                        <Grid item xs={4} marginTop="10px">
                          <label htmlFor={`file-upload-${id}`}>
                            <input
                              id={`file-upload-${id}`}
                              name={`file-upload-${id}`}
                              // accept="image/jpeg,application/pdf,png"
                              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => handleUpload(id, e)}
                              disabled={uploadFlags[id]}
                              onClick={(e) => {
                                e.target.value = "";
                              }}
                            />
                            <MDButton variant="outlined" color="error" component="span">
                              Upload
                            </MDButton>
                          </label>
                        </Grid>
                        <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                          {documentflag === true ? (
                            <Grid sx={{ fontSize: "14px" }}>
                              {upload[id] && <p>{upload[id].fileName}</p>}
                            </Grid>
                          ) : null}
                        </Grid>

                        {upload[id] && upload[id].fileName && (
                          <Grid item xs sx={{ ml: "2rem" }}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                            </IconButton>
                          </Grid>
                        )}
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </Grid>
            ) : null}
          </Grid>

          <Grid>
            {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Personal Accident" ? (
              <Grid container spacing={0.5} p={2}>
                {documents.map((x, id) => (
                  <React.Fragment key={x.mID}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {id < 1 && <MDTypography>{array3[0]}</MDTypography>}
                    </Grid>
                    {x && x.TypeCode === "Required in Case of TTD/ PPD/ PTD Claim" ? (
                      <>
                        {" "}
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                          <MDInput
                            sx={{ marginTop: "8px" }}
                            value={x.Value}
                            label="Document Type"
                          />
                        </Grid>
                        <Grid item xs={4} marginTop="10px">
                          <label htmlFor={`file-upload-${id}`}>
                            <input
                              id={`file-upload-${id}`}
                              name={`file-upload-${id}`}
                              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => handleUpload(id, e)}
                              disabled={uploadFlags[id]}
                              onClick={(e) => {
                                e.target.value = "";
                              }}
                            />
                            <MDButton variant="outlined" color="error" component="span">
                              Upload
                            </MDButton>
                          </label>
                        </Grid>
                        <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                          {documentflag === true ? (
                            <Grid sx={{ fontSize: "14px" }}>
                              {upload[id] && <p>{upload[id].fileName}</p>}
                            </Grid>
                          ) : null}
                        </Grid>
                        {upload[id] && upload[id].fileName && (
                          <Grid item xs sx={{ ml: "2rem" }}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                            </IconButton>
                          </Grid>
                        )}
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </Grid>
            ) : null}
          </Grid>

          <Grid container spacing={0.5} p={2}>
            {otherUpload.map((x, id) => (
              <React.Fragment key={x}>
                <Grid item xs={5}>
                  <MDInput
                    label="Add Other Documnet"
                    name="other"
                    value={x.docName}
                    onChange={(e) => handleAddother(e, id, "other")}
                  />
                </Grid>
                <Grid item xs={1} marginTop="6px">
                  <label htmlFor={`otherfile-upload-${id}`}>
                    <input
                      id={`otherfile-upload-${id}`}
                      name={`otherfile-upload-${id}`}
                      accept="image/jpeg,application/pdf"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => handleOtherFileUpload(id, e)}
                      disabled={otherUploadFlag[id]}
                      onClick={(e) => {
                        e.target.value = "";
                      }}
                    />
                    <MDButton variant="outlined" color="error" component="span">
                      Upload
                    </MDButton>
                  </label>
                </Grid>
                <Grid item xs={1}>
                  {otherUpload && (
                    <Grid item xs={1} marginTop="5px">
                      {/* <IconButton onClick={() => handleDeleteOther(id)}>
                      <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                    </IconButton> */}
                      {/* <Stack direction="row" justifyContent="left"> */}
                      <MDButton variant="outlined" onClick={() => handleDeleteOther(id)}>
                        DELETE
                      </MDButton>
                      {/* </Stack> */}
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={2.9} style={{ marginTop: "6px" }}>
                  <Grid sx={{ fontSize: "14px" }}>
                    <p> {otherUpload[id] && otherUpload[id].fileName}</p>
                  </Grid>
                </Grid>
                {otherUpload[id] && otherUpload[id].fileName && (
                  <Grid item xs={1} sx={{ ml: "1rem" }}>
                    <IconButton onClick={(e) => handleOtherRemove(id, e)}>
                      <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                    </IconButton>
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>

          <Grid p={2}>
            <MDButton
              variant="outlined"
              color="error"
              startIcon={<AddIcon />}
              onClick={(e) => handleAddDocument(e)}
            >
              Add Document
            </MDButton>
          </Grid>
          {/* </Grid>
          ) : null} */}
          {ocrFlag === false ? (
            <Grid container justifyContent="center" alignItems="center" p={2}>
              <MDButton color="error" variant="outlined" onClick={handelBacktoMemberSelection}>
                Back
              </MDButton>
              <MDButton
                color="primary"
                onClick={() => onOCRReader()}
                disabled={
                  claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails
                    .benefitName === ""
                }
                sx={{ ml: "2rem" }}
                // startIcon={loaderFlg && <CircularProgress color="white" size={24} />}
              >
                PROCEED
              </MDButton>
            </Grid>
          ) : null}
          {ocrFlag === true ? (
            <>
              <Grid container spacing={2} p={2}>
                {ocrReadItems.map((item) =>
                  item.visible ? (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <RenderControl
                        item={item}
                        claimDetails={claimDetails}
                        policyDetails={policyDetails}
                        setClaimDetails={setClaimDetails}
                        documents={documents}
                        setDocuments={setDocuments}
                        setUpload={setUpload}
                        setUploadD={setUploadD}
                        setUploadFlags={setUploadFlags}
                        uploadFlags={uploadFlags}
                        upload={upload}
                        otherUpload={otherUpload}
                        setOtherUploadFlag={setOtherUploadFlag}
                        // customOnChange={customOnChange}
                        // setOtherUpload={setOtherUpload}
                      />
                    </Grid>
                  ) : null
                )}
              </Grid>
              <Grid container>
                <FormControl sx={{ marginLeft: "20px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={agreement} onChange={handleCheckBox} name="agreement" />
                    }
                    label="I agree the above information is correct and cross checked from my end."
                  />
                </FormControl>
              </Grid>
              <Grid container justifyContent="center" alignItems="center" p={2}>
                <MDButton color="error" variant="outlined" onClick={handelBacktoMemberSelection}>
                  Back
                </MDButton>
                <MDButton
                  disabled={!agreement}
                  color="primary"
                  onClick={() => onClaimSave()}
                  sx={{ ml: "2rem" }}
                >
                  SUBMIT
                </MDButton>
              </Grid>
            </>
          ) : null}
        </>
      ) : null}
    </Card>
  );
}

export default CustomerClaimIntimation;
