import React, { useState } from "react";

import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import Success from "assets/images/Nepal/Success.png";
// import { styled } from "@mui/material/styles";
// import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import objectPath from "object-path";
import { DateFormatFromDateObject, IsMobileNumber, arrayRange } from "Common/Validations";
import {
  Checkbox,
  // Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  Stack,
  // CircularProgress,
  Typography,
  // Button,
} from "@mui/material";
import swal from "sweetalert2";
import swal1 from "sweetalert";
import AddIcon from "@mui/icons-material/Add";
import {
  GetNPCommonMaster,
  GetProdPartnermasterData,
  GenericApi,
  SavepolicyWFStatus,
  SaveQuotation,
  UpdateWorkflowStatus,
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  DocumenUpload,
  DeleteDocument,
  SendNotification,
  QuotationUpdate,
  UpdateProposalDetails,
  SaveCreateProposal,
  Transliteration,
  PolicyStartDateFiscalYear,
  NumberofDaysinYear,
  PolicyStartDateMaxDate,
  GetProductByCode,
} from "./data/APIs/MotorCycleApi";

import {
  PersonalDomiciliaryJson,
  AddMember,
  RemoveMember,
  // ProposerDetailsArray,
} from "./data/Json/TravelMedicalInsuranceJson";
import { BranchDetails, docDetails } from "./data/Json/PrivateVehicleJson";
import { useDataController } from "../../../../../BrokerPortal/context";

import MDButton from "../../../../../../components/MDButton";
// import MDInput from "../../../../../../components/MDInput";
import PaymentPage from "../../Payment";
import { GetTemplatePayload, GetProposalByNumber } from "../../Payment/Apis";

import {
  IsNumeric,
  // IsNumericNonZero,
  // IsNumaricPercentage,
  addDays,
  addDays1,
  // IsAlphaNum,
  // IsAlphaNumSpecial,
  // NumBetween,
  // IsNumaricSpecial,
  // IsAlpha,
  // IsAlphaNumSpace,
  AgeCalculator,
  // arrayRange,
  IsFreetextNoSpace,
  // IsMobileNumber,
  DateFormatFromStringDate,
  // IsAlphaSpace,
} from "../../../../../../Common/Validations";
// import { set } from "lodash";

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = PersonalDomiciliaryJson();
  const curDate = DateFormatFromDateObject(new Date(), "m/d/y");
  const defpolenddt = addDays(
    DateFormatFromStringDate(curDate, "m/d/y", "m-d-y"),
    dto.NumberofDays
  );
  dto.PolicyEndDate = DateFormatFromStringDate(defpolenddt, "m-d-y", "m/d/y");
  console.log(111, dto);
  if (
    genericInfo.Flow &&
    (genericInfo.Flow === "DisApproveFlow" ||
      genericInfo.Flow === "Approved" ||
      genericInfo.Flow === "DebitFlow")
  ) {
    dto = { ...dto, ...PolicyDto };
  }
  return dto;
};

const getProcessSteps = () => {
  const steps = [
    "Quote Details",
    "Customer Details",
    "Individual or Family Details",
    "Risk Details",
    "Premium Summary",
    "Payment",
  ];
  return steps;
};
// const IsDecimal = (str) => {
//   const regex = /^[0-9./]*$/;
//   if (regex.test(str)) return true;
//   return "Enter only Decimal Numbers";
// };
// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto }) => {
  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push({
        name: `Branch Details ${i + 1}`,
        visible:
          dto.FinancingType === "Bank/Financial Institution" &&
          dto.Bankdetails.BankCategory !== "" &&
          dto.Bankdetails.BankorFinancialInstituionNameinEnglish !== "",
      });
    });
    return arr;
  };
  let steps = [];

  const spreadTravelDetails = () => {
    const arr = [];

    dto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push({ name: `Added Member ${i + 1}`, visible: true });
    });
    // console.log("spredarray1", arr);
    return arr;
  };

  // const spreadMultiKYCDetails = () => {
  //   const arr = [];
  //   dto.ProposerDetailsArray.forEach((x, i) => {
  //     arr.push({ name: `Insured Details ${i + 1}`, visible: dto.FinancingType !== "" });
  //   });
  //   return arr;
  // }

  const spreadMultiKYCDetails = () => {
    const arr = [];
    dto.ProposerDetails.forEach((x, i) => {
      arr.push({ name: `Insured Details ${i + 1}`, visible: dto.FinancingType !== "" });
    });
    return arr;
  };
  switch (activeStep) {
    case 0:
      steps = [{ name: "Quote Details", visible: true }];
      break;
    case 1:
      steps = [
        { name: "", visible: true }, // Customer Details
        {
          name: "Bank/Financial Institution Details",
          visible: dto.FinancingType === "Bank/Financial Institution",
        },
        {
          name: "Branch Details",
          visible:
            dto.FinancingType === "Bank/Financial Institution" &&
            dto.Bankdetails.BankCategory !== "" &&
            dto.Bankdetails.BankorFinancialInstituionNameinEnglish !== "",
        },
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        {
          name: "Proposer Details",
          visible: dto.FinancingType !== "",
        },
        {
          name: "Insured Details",
          visible: dto.FinancingType !== "",
        },

        ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        {
          name: "Care of Details",
          visible: dto.FinancingType !== "",
        },
        { name: "Proprietor Details", visible: dto.FinancingType !== "" },
        { name: "Other Details", visible: dto.FinancingType !== "" },
      ];
      break;
    case 2:
      steps = [
        { name: "Individual or Family Details", visible: true },
        ...spreadTravelDetails().filter((x, i) => i !== 0),

        {
          name: "University Details",
          visible: dto.InsurableItem[0].RiskItems[0].ClientType === "Student",
        },
        {
          name: "Sponser Details",
          visible: dto.InsurableItem[0].RiskItems[0].ClientType === "Student",
        },
      ];
      break;
    case 3:
      steps = [
        { name: "Issuing Branch Details", visible: true },
        { name: "Risk Details", visible: true },
      ];
      break;
    case 4:
      steps = [{ name: "Premium Breakup", visible: true }];
      break;

    case 5:
      steps = [{ name: "Payment", visible: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, masters, dto, setDto, setMasters }) => {
  //  setBackDropFlag
  const lDto = dto;
  const masters1 = masters;
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (lDto.FormatedDat !== null && lDto.FormatedData !== undefined) {
    const RSDMDPremiumPDF1 = lDto.FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF;
    const RiderPillionPremiumPDF1 =
      lDto.FormatedData.CalculatedPremiumDetails.RiderPillionPremiumPDF;
    if (RSDMDPremiumPDF1 !== "" && RiderPillionPremiumPDF1 !== "") {
      lDto.FormatedData.CalculatedPremiumDetails.RSDMDRiderPillion = formater.format(
        parseFloat(Number(RSDMDPremiumPDF1) + Number(RiderPillionPremiumPDF1))
          .toFixed(2)
          .toString()
      );
    }
  }

  // const [CPremium, setCPremium] = useState({
  //   GrossPremium: "",
  //   VAT: "",
  //   StampDuty: "",
  //   TotalPremium: "",
  // });

  const [control] = useDataController();
  const { genericInfo, loginUserDetails } = control;
  // let dto = genericInfo;

  const onTravellerDOB = (e, v, i1) => {
    lDto.InsurableItem[0].RiskItems[i1].DOB = v;
    const date = DateFormatFromStringDate(v, "d-m-y", "m-d-y");
    const age = AgeCalculator(new Date(date));
    lDto.InsurableItem[0].RiskItems[i1].Age = age.toString();
    setDto({ ...lDto });
  };
  const onAddDocument = (i) => {
    lDto.ProposerDetails[i].documentDetails = [
      ...lDto.ProposerDetails[i].documentDetails,
      { ...docDetails() },
    ];

    setDto({ ...lDto });
  };

  const handleDocFileDelete = async (i1, i2) => {
    const file = lDto.ProposerDetails[i1].documentDetails[i2].FileName;
    if (file !== "") await DeleteDocument(file);
    const arr1 = lDto.ProposerDetails[i1].documentDetails.filter((x, i) => i !== i2);
    lDto.ProposerDetails[i1].documentDetails = arr1;
    setDto({ ...lDto });
  };
  const onDocUplode = async (file, i1, i) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        lDto.ProposerDetails[i1].documentDetails[i].FileName = file.name;
        lDto.ProposerDetails[i1].documentDetails[i].UploadDocDate = new Date().toLocaleDateString();
        lDto.ProposerDetails[i1].documentDetails[i].DocId = result.data[0].docid;
        setDto({ ...lDto });
        swal.fire({
          icon: "success",
          text: "Document uploaded successfully",
          allowOutsideClick: false,
        });
      }
    });
  };

  const OnADDMultiKYCDetailsnew = (e) => {
    if (e.target.value === "") {
      const newarray = lDto.InsurableItem[0].RiskItems[0];
      lDto.InsurableItem[0].RiskItems = [newarray];
    }
    lDto.InsurableItem[0].RiskItems[0].NoOfPersons = e.target.value;
    const arr1 = arrayRange(1, e.target.value - 1, 1);
    arr1.forEach(() => {
      lDto.InsurableItem[0].RiskItems.push({ ...AddMember() });
    });

    setDto({ ...lDto });
  };
  // const RemoveMultiKYC = (e) => {
  //   lDto.IsIndividualOrFamily = e.target.value;

  //   if (lDto.IsIndividualOrFamily === "Individual") {
  //     // lDto.NumberofInsured = 1;
  //     lDto.InsurableItem[0].RiskItems = [{ ...AddMember() }];
  //   }
  //   if (lDto.IsIndividualOrFamily === "Family") {
  //     const newarray = lDto.AddMember[0];
  //     lDto.AddMember = [newarray];
  //     lDto.InsurableItem[0].RiskItems = [{ ...AddMember() }];
  //   }
  //   setDto({ ...lDto });
  // };

  const handleFileUpload = async (event, i1, index) => {
    await onDocUplode(event.target.files[0], i1, index);
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
  };
  const onCancelClick = async (i1, i) => {
    const file = lDto.ProposerDetails[i1].documentDetails[i].FileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails[i1].documentDetails[i].FileName = "";
        lDto.ProposerDetails[i1].documentDetails[i].DocId = "";
        lDto.ProposerDetails[i1].documentDetails[i].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };
  const handleDublicateDoc = (e, i1, index) => {
    console.log(11111111);
    lDto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        lDto.ProposerDetails[i1].documentDetails[index].DocName = "";
        swal.fire({
          icon: "error",
          text: `"${e.target.value}" Already Exist`,
        });
      }
    });
    setDto({ ...lDto });
  };
  const spreadDocumentDetails = (i1) => {
    const arr = [];
    dto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: true,
          label: "Document Name",
          path: `ProposerDetails.${i1}.documentDetails.${i}.DocName`,
          onChangeFuncs: [IsFreetextNoSpace],
          customOnBlur: (e) => handleDublicateDoc(e, i1, i),
        },
        {
          type: "Button",
          visible: true,
          spacing: 2,
          component: "label",
          label: "Upload",
          typeFormat: (
            <input
              hidden
              name={i}
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e, i1, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i1].documentDetails[i].FileName,
          spacing: 3,
          visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
          sx: { fontSize: "15px", paddingTop: 1 },
        },
        {
          type: "IconButton",
          icon: "close",
          spacing: 2,
          visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
          onClick: () => onCancelClick(i1, i),
        },
        {
          type: "IconButton",
          icon: "delete",
          color: "primary",
          spacing: 0.1,
          visible: i !== 0,
          onClick: () => handleDocFileDelete(i1, i),
        },
        {
          type: "TypographyVal",
          label: "",
          spacing: 12,
          visible: true,
        }
      );
    });
    return arr;
  };

  const IsEmail = (email) => {
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{3,3})$/i;
    if (email.length !== 0) {
      if (emailRegex.test(email)) return true;
      return "Not a valid Email";
    }
    return false;
  };

  const IsNumaricSpecialNoSpace = (str) => {
    const regex = /^[0-9-+]+[0-9-+\s]*$/;
    if (regex.test(str) || str === "") {
      return true;
    }
    return "Allows only numbers and special characters";
  };
  const IsPhoneNumber = (number) => {
    const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
    if (number.length === 10) {
      if (mobileRegex.test(number)) return true;
      return "Invalid Phone Number";
    }
    return "Number should be 10 digits";
  };
  const Ratevalid = (str1) => {
    const regex1 = /^[0-9]{0,3}(?:\.\d{0,2})?$/;
    if (regex1.test(str1)) return true;
    return "Enter only Decimal Numbers";
  };

  const onDOBselect1 = (e, d, i) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      swal.fire({
        icon: "error",
        text: `Age of the Policy Holder must be above 16 Years.`,
        confirmButtonColor: "#0079CE",
      });
      lDto.ProposerDetails[i].DoB = [""];
    } else {
      lDto.ProposerDetails[i].DoB = d;
    }
    setDto({ ...lDto });
  };

  const onDOBselect = async (e, d) => {
    const date = DateFormatFromStringDate(d, "d-m-y", "m-d-y");
    // console.log(date, d);
    const age = AgeCalculator(new Date(date));
    if (age < 18) {
      swal.fire({
        icon: "error",
        text: "Age should be greater than 17 years.",
        confirmButtonColor: "#0079CE",
      });

      lDto.InsurableItem[0].RiskItems[0].DOB = [""]; // Empty date of birth
      lDto.InsurableItem[0].RiskItems[0].Age = ""; // Empty age
    } else {
      lDto.InsurableItem[0].RiskItems[0].DOB = d;
      lDto.InsurableItem[0].RiskItems[0].Age = age.toString();
    }

    lDto.ProductLogo = genericInfo.ProductLogo;
    lDto.CompanyName = process.env.REACT_APP_CompanyName;
    lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
    lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
    lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;

    // if (
    //   localStorage.getItem("NepalCompanySelect") !== null ||
    //   process.env.REACT_APP_EnvId !== "297"
    // ) {
    //   let Company = "";
    //   if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //     Company = "NMIC";
    //   }
    //   if (
    //     localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
    //     process.env.REACT_APP_EnvId === "1"
    //   ) {
    //     Company = "PMIC";
    //   }
    //   await GetProdPartnermasterData("BranchName", {
    //     Description: Company,
    //   }).then((res) => {
    //     masters1.IssuingBranch = res.data;
    //     lDto.ICShortName = res.data[0].Description;
    //   });
    //   // setGenericPolicyDto(dispatch, dto);
    // }
    // if (d !== null) {
    //   if (
    //     (lDto.InsurableItem[0].RiskItems[0].ClientType === "Student" &&
    //       lDto.InsurableItem[0].RiskItems[0].Age >= 40) ||
    //     lDto.InsurableItem[0].RiskItems[0].Age >= 71
    //   ) {
    //     if (lDto.InsurableItem[0].RiskItems[0].ClientType === "Student") {
    //       swal.fire({
    //         icon: "error",
    //         text: "Maximum Age For Student Plan is 40 Years Only ",
    //         confirmButtonColor: "#0079CE",
    //       });
    //     } else {
    //       swal.fire({
    //         icon: "error",
    //         text: "Maximum Age For Annual Multi Trip policy is 70 Years Only",
    //         confirmButtonColor: "#0079CE",
    //       });
    //     }
    //     lDto.InsurableItem[0].RiskItems[0].IsAnnualMultiTrip = "No";
    //     // lDto.InsurableItem[0].RiskItems[0].DateofBirth = "";
    //     // lDto.InsurableItem[0].RiskItems[0].Age = "";
    //   }
    // }

    setDto({ ...lDto });
  };

  const calculatePremium = () => {
    const noOfPersons = parseInt(lDto.InsurableItem[0].RiskItems[0].NoOfPersons, 10);
    const sumInsured = parseFloat(lDto.InsurableItem[0].RiskItems[0].SumInsured);
    const rate = parseFloat(lDto.InsurableItem[0].RiskItems[0]["Rate%"]);
    if (
      Number.isNaN(sumInsured) ||
      Number.isNaN(rate) ||
      sumInsured === "" ||
      noOfPersons === "" ||
      rate === ""
    ) {
      // If Sum Insured or Rate % or no. of person  is empty or not a number, set Premium as empty
      lDto.InsurableItem[0].RiskItems[0].Premium = ""; // Set premium as empty
    } else {
      const premium = (noOfPersons * sumInsured * rate) / 100; // Calculate the premium amount
      lDto.InsurableItem[0].RiskItems[0].Premium = premium.toFixed(2); // Set the premium amount in the data object
    }
    setDto({ ...lDto }); // Update the state with the new premium value
  };

  const OnPlaceSelect = async (e, a, n, index) => {
    if (n === "State1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.Bankdetails.ProvinceorState = a.mValue;
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.Municipality = "";
        masters1.District1 = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
      }
    }
    if (n === "District1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.Bankdetails.District = a.mValue;
        lDto.Bankdetails.Municipality = "";
        masters1.Municipality1 = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
      }
    }
    // if (n === "Municipality1") {
    //   lDto.Bankdetails.Municipality = a.mValue;
    // }
    if (n === "State2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.ProposerDetails[index].PermanentAdrress.ProvinceState = a.mValue;
        lDto.ProposerDetails[index].PermanentAdrress.District = "";
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        masters1.District2 = res.data;
      } else {
        lDto.ProposerDetails[index].PermanentAdrress.ProvinceState = "";
        lDto.ProposerDetails[index].PermanentAdrress.District = "";
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        lDto.ProposerDetails[index].PermanentAdrress.WardNumber = "";
      }
    }
    if (n === "District2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.ProposerDetails[index].PermanentAdrress.District = a.mValue;
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        masters1.Municipality2 = res.data;
      } else {
        lDto.ProposerDetails[index].PermanentAdrress.District = "";
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        lDto.ProposerDetails[index].PermanentAdrress.WardNumber = "";
      }
    }
    // if (n === "Municipality2") {
    //   lDto.ProposerDetails.PermanentAdrress.Municipality = a.mValue;
    // }

    if (n === "State3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.RiskAddressDetails.ProvinceState = a.mValue;
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        masters1.District3 = res.data;
      } else {
        lDto.RiskAddressDetails.ProvinceState = "";
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        lDto.RiskAddressDetails.WardNumber = "";
      }
    }
    if (n === "District3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.RiskAddressDetails.District = a.mValue;
        lDto.RiskAddressDetails.Municipality = "";
        masters1.Municipality3 = res.data;
      } else {
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        lDto.RiskAddressDetails.WardNumber = "";
      }
    }
    // if (n === "Municipality3") {
    //   lDto.RiskAddressDetails.Municipality = a.mValue;
    // }

    if (n === "State4") {
      if (a !== null) {
        // masters1.Municipalitynew = [];
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].ProvinceState = a.mValue;
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.placeMasters[index].district = res.data;
      } else {
        lDto.Bankdetails.BranchDetails[index].ProvinceState = "";
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }
    if (n === "District4") {
      if (a !== null) {
        // masters1.Municipalitynew = [];
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].District = a.mValue;
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.placeMasters[index].municipality = res.data;
      } else {
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }
    // if (n === "Municipality4") {
    //   lDto.Bankdetails.BranchDetails[index].Municipality = a.mValue;
    // }
    if (n === "State6") {
      if (a !== null) {
        // masters1.Municipalitynew = [];
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ProvinceState = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        masters1.District6 = res.data;
      } else {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ProvinceState = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.WardNumber = "";
      }
    }
    if (n === "District6") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });

        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        masters1.Municipality6 = res.data;
      } else {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.WardNumber = "";
      }
    }
    setDto({ ...lDto });
    setMasters({ ...masters1 });
  };

  const handleBankCategory = async (e, a, key) => {
    // console.log("aaaaa", a);
    if (key === "BankCategory") {
      if (a !== null) {
        lDto.Bankdetails.BankCategory = a.mValue;
        const res = await GetProdPartnermasterData("BankDetails", {
          BankFinancialInstitution: a.fieldName,
        });
        masters1.BankorFinancialInstituionNameinEnglish = res.data;
        masters1.BranchMasters = [];
        lDto.Bankdetails.BankCategorylabel = a.fieldName;
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.AddressNepali = "";
        lDto.Bankdetails.BranchDetails.forEach((x, i) => {
          lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
          lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
          lDto.Bankdetails.BranchDetails[i].WardNumber = "";
          lDto.Bankdetails.BranchDetails[i].Municipality = "";
          lDto.Bankdetails.BranchDetails[i].District = "";
          lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
          lDto.Bankdetails.BranchDetails[i].BranchName = "";
        });
        setDto({ ...lDto });
      } else {
        // masters.BankorFinancialInstituionNameinEnglish = [];
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.BankCategory = "";
        lDto.Bankdetails.BankCategorylabel = "";
        lDto.Bankdetails.AddressNepali = "";
        setDto({ ...lDto });
      }
    }
    if (key === "BankorFinancial") {
      if (a !== null) {
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = a.mValue;
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.mValue }],
          };
          const res = await Transliteration(obj);
          lDto.Bankdetails.BankorFinancialInstituionNameinNepali = res[0].text;
        }
        lDto.Bankdetails.Country = a.Country;
        lDto.Bankdetails.ProvinceorState = a.Province;
        lDto.Bankdetails.Municipality = a.Municipality;
        lDto.Bankdetails.District = a.District;
        lDto.Bankdetails.AddressEnglish = a.Address;
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.Address }],
          };
          const res = await Transliteration(obj);
          lDto.Bankdetails.AddressNepali = res[0].text;
        }
        setDto({ ...lDto });
        const res = await GetProdPartnermasterData("BranchMasters", {
          BankFinancialInstitution: dto.Bankdetails.BankCategorylabel,
          Bankname: a.mValue,
        });
        masters1.BranchMasters = res.data;
        setDto({ ...lDto });
      } else {
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.AddressNepali = "";
        setDto({ ...lDto });
        masters1.BranchMasters = [];
      }
    }
  };

  const onBlurTransliteration = async (e, a, EF, ET, i) => {
    EF(false);
    ET("");
    // production
    // development
    if (process.env.NODE_ENV === "production") {
      const iText = e.target.value;
      const varName = e.target.name;
      const obj = {
        textList: [{ Text: iText }],
      };
      const res = await Transliteration(obj);
      const Text = res?.[0]?.text ? res[0].text : "";

      if (varName === "BankNameinEnglish") {
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = Text;
      }
      if (varName === "BankAddressEnglish") {
        lDto.Bankdetails.AddressNepali = Text;
      }
      if (varName === "BranchNameinEnglish") {
        lDto.Bankdetails.BranchDetails[i].AddressNepali = Text;
      }
      if (varName === "InsuredNameEnglish") {
        lDto.ProposerDetails[i].InsuredNameNepali = Text;
      }
      if (varName === "TemporaryAddressEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.TemporaryAddressNepali = Text;
      }
      if (varName === "IndividualTemporaryAddressEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.TemporaryAddressNepali = Text;
      }
      if (varName === "PermanentAdrressEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "IndividualHusbandNameEnglish") {
        lDto.ProposerDetails[i].HusbandNameNepali = Text;
      }
      if (varName === "IndividualWifeNameEnglish") {
        lDto.ProposerDetails[i].WifeNameNepali = Text;
      }
      if (varName === "IndividualFatherNameEnglish") {
        lDto.ProposerDetails[i].FatherNameNepali = Text;
      }
      if (varName === "IndividualGrandfatherNameEnglish") {
        lDto.ProposerDetails[i].GrandfatherNameNepali = Text;
      }
      if (varName === "IndividualPermanentAddressEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "IndividualTownEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.TownNepali = Text;
      }
      if (varName === "IndividualCityEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.CityNepali = Text;
      }
      if (varName === "IndividualResidenceEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.ResidenceNepali = Text;
      }
      if (varName === "WifeNameEnglish") {
        lDto.ProposerDetails[i].WifeNameNepali = Text;
      }
      if (varName === "FatherNameEnglish") {
        lDto.ProposerDetails[i].FatherNameNepali = Text;
      }
      if (varName === "GrandFatherNameEnglish") {
        lDto.ProposerDetails[i].GrandfatherNameNepali = Text;
      }
      if (varName === "AddressEnglish111") {
        lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "HusbandNameEnglish") {
        lDto.ProposerDetails[i].HusbandNameNepali = Text;
      }
      if (varName === "TownEnglish1111") {
        lDto.ProposerDetails[i].PermanentAdrress.TownNepali = Text;
      }
      if (varName === "CityEnglish11111") {
        lDto.ProposerDetails[i].PermanentAdrress.CityNepali = Text;
      }
      if (varName === "VehicleNumberEnglish") {
        lDto.InsurableItem[0].RiskItems[0].VehicleNumberNepali = Text;
      }
      if (varName === "TempAddresEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.TempAddresNepali = Text;
      }
      if (varName === "ProprietorNameEnglish") {
        lDto.ProposerDetails[0].ProprietorNameNepali = Text;
      }
      if (varName === "RiskAddressEnglish") {
        lDto.RiskAddressDetails.AddressNepali = Text;
      }
      if (varName === "VehicleNoEnglish") {
        lDto.InsurableItem[0].RiskItems[0].VehicleNoNepali = Text;
      }
      if (varName === "MemberNameEnglish") {
        lDto.ProposerDetails[i].MemberNameNepali = Text;
      }
      if (varName === "DesignationEnglish") {
        lDto.ProposerDetails[i].DesignationNepali = Text;
      }
      if (varName === "CareofNameEnglish") {
        lDto.ProposerDetails[0].CareofNameNepali = Text;
      }
      if (varName === "CareofAddressEnglish") {
        lDto.ProposerDetails[0].CareofAddressNepali = Text;
      }
      if (varName === "ToleStreetNameEnglish") {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ToleStreetNameNepali = Text;
      }
      setDto({ ...lDto });
    }
  };
  const GenderNepali = [
    { mID: 1, mValue: "Male", translation: "पुरुष" },
    { mID: 2, mValue: "Female", translation: "महिला" },
    { mID: 3, mValue: "Others", translation: "अन्य" },
  ];
  const handleGender = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].GenderEnglish = a.mValue;
      lDto.ProposerDetails[i].GenderNepali = a.translation;
    } else {
      lDto.ProposerDetails[i].GenderEnglish = "";
      lDto.ProposerDetails[i].GenderNepali = "";
    }
    setDto({ ...lDto });
  };
  const MaritalStatus = [
    { mID: 1, mValue: "Unmarried", translation: "अविवाहित" },
    { mID: 2, mValue: "Married", translation: "विवाहित" },
    { mID: 3, mValue: "Divorced", translation: "विभाजक" },
    { mID: 4, mValue: "Widow", translation: "विधवा" },
  ];
  const handleMarital = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].MaritalStatusEnglish = a.mValue;
      lDto.ProposerDetails[i].MaritalStatusNepali = a.translation;
    } else {
      lDto.ProposerDetails[i].MaritalStatusEnglish = "";
      lDto.ProposerDetails[i].MaritalStatusNepali = "";
    }
    setDto({ ...lDto });
  };

  const OnInsuredNameEnglish = (e, name, i) => {
    lDto.ProposerDetails[i].PermanentAdrress[name] = e.target.value;
    lDto.ProposerDetails[i][name] = e.target.value;
    const Name = lDto.ProposerDetails[i].InsuredNameEnglish;
    const Address = lDto.ProposerDetails[i].PermanentAdrress.AddressEnglish;
    if (Name !== undefined) {
      lDto.ProposerDetails[i].NameoftheOrganisation = Name;
    }
    if (Address !== undefined) {
      lDto.ProposerDetails[i].OrganizationAddress = Address;
    }
    setDto({ ...lDto });
  };

  // For Proposal DOB
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear() - 16);

  // const OnPSDSelect = (e, d) => {
  //   lDto.PolicyStartDate = d;
  //   // lDto.NumberofDays = NumberofDaysinYear(new Date().getFullYear());
  //   lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //   if (lDto.PolicyStartDate === "" || (lDto.PolicyStartDate !== "" && lDto.NumberofDays === "")) {
  //     lDto.PolicyEndDate = "";
  //   }
  //   setDto({ ...lDto });
  // };

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const OnPSDSelect = (e, d) => {
    lDto.PolicyStartDate = d;
    const endDate = new Date(lDto.PolicyEndDate);
    const startDate = new Date(lDto.PolicyStartDate);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const feb29datestartyear = isLeapYear(startYear) ? new Date(`02/29/${startYear}`) : null;
    const feb29dateendyear = isLeapYear(endYear) ? new Date(`02/29/${endYear}`) : null;
    if (
      (feb29datestartyear && startDate > feb29datestartyear && feb29datestartyear <= endDate) ||
      (feb29dateendyear && startDate <= feb29dateendyear && feb29dateendyear >= endDate) ||
      (feb29datestartyear && startDate > feb29datestartyear)
    ) {
      if (lDto.PolicyEndDate === "" && lDto.NumberofDays === "") {
        lDto.NumberofDays = 365;
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      }
      if (lDto.NumberofDays !== 365 && lDto.NumberofDays !== 366) {
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      } else {
        lDto.NumberofDays = 365;
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      }
      // lDto.NumberofDays = 365;
    } else if (lDto.PolicyEndDate === "" && lDto.NumberofDays === "") {
      lDto.NumberofDays = 366;
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    } else if (lDto.NumberofDays !== 365 && lDto.NumberofDays !== 366) {
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    } else {
      lDto.NumberofDays = 366;
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    }
    if (lDto.NumberofDays === NumberofDaysinYear(new Date().getFullYear())) {
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    }
    if (lDto.PolicyStartDate === "") {
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };

  const OnNumberofDays = (e) => {
    lDto.NumberofDays = e.target.value;
    lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, e.target.value);
    setDto({ ...lDto });
    // const days = NoofDays1(lDto.PolicyStartDate, lDto.PolicyEndDate);
    // console.log(days);
    if (lDto.NumberofDays > 366) {
      swal({
        icon: "error",
        text: `Number of days should be in between 1 to 366 days`,
        confirmButtonColor: "#0079CE",
      });
      lDto.NumberofDays = "";
    }
    if (
      (lDto.PolicyStartDate === "" && lDto.NumberofDays !== "") ||
      (lDto.PolicyStartDate !== "" && lDto.NumberofDays === "") ||
      (lDto.PolicyStartDate === "" && lDto.NumberofDays === "")
    ) {
      lDto.PolicyEndDate = "";
    }

    setDto({ ...lDto });
  };

  // regex for Traveller name
  const IsAlphabeticSpecialNoSpace = (str) => {
    const regex = /^[a-zA-Z!@#$%^&*()_+\-={};':"|,.<>? ]*$/;
    if (regex.test(str) || str === "") {
      return true;
    }
    return "Allows only alphabets and special characters";
  };
  const IsNumericGreaterThanZero = (number) => {
    const regex = /^(?!(0))[0-9]*$/;
    if (regex.test(number)) return true;
    return "Value must be greater than zero and Numeric";
    //  " Allows only number";
  };
  // Handle Traveller age Calculator
  // const Handleage = () => {
  // };

  // handle Dublicate Passport number

  const handleDublicatePass = (e, PassportNumber, index) => {
    console.log(11);
    lDto.InsurableItem[0].RiskItems.forEach((x, i) => {
      if (x.PassportNumber === e.target.value && i !== index) {
        lDto.InsurableItem[0].RiskItems[index].PassportNumber = "";
        swal1({
          icon: "error",
          text: `"${PassportNumber}" Already Exist`,
        });
      }
    });
    setDto({ ...lDto });
  };
  const onDeleteTravelDetails = (i) => {
    const arr = lDto.InsurableItem[0].RiskItems.filter((x, i1) => i1 !== i);
    lDto.InsurableItem[0].RiskItems = arr;
    masters1.AddMember -= 1;
    setMasters({ ...masters1 });
    setDto({ ...lDto });
    if (masters.AddMember !== Number(lDto.InsurableItem[0].RiskItems[0].NoOfPersons)) {
      masters1.flags.AddMember = false;
      setMasters({ ...masters1 });
    }
  };
  // const valueinenglish = "";

  const spreadTravelDetails = () => {
    const arr = [];
    dto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push([
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 10,
        },
        {
          type: "Button",
          label: "Delete",
          // visible: true,
          spacing: 2,
          variant: "contained",
          align: "right",
          visible: i !== 0,
          onClick: () => onDeleteTravelDetails(i),
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 10,
        },
        {
          type: "Input",
          label: "Name",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.Name`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Designation",
          visible: true,
          // required: true,
          path: `InsurableItem.0.RiskItems.${i}.Designation`,
          onChangeFuncs: [IsFreetextNoSpace],
        },

        {
          type: "Input",
          label: "Citizenship No",
          visible: true,
          // required: true,
          path: `InsurableItem.0.RiskItems.${i}.CitizenshipNo`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Address",
          visible: true,
          // required: true,
          path: `InsurableItem.0.RiskItems.${i}.Address`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Contact No",
          visible: true,
          // required: true,
          path: `InsurableItem.0.RiskItems.${i}.ContactNo`,
          onBlurFuncs: [IsMobileNumber],
        },
        {
          type: "Input",
          label: "Relation With Insured",
          visible: true,
          // required: true,
          path: `InsurableItem.0.RiskItems.${i}.RelationWithInsured`,
          onChangeFuncs: [IsAlphabeticSpecialNoSpace],
        },
        {
          type: "MDDatePicker",
          label: "Date of Birth",
          // InputProps: { disabled: true },
          required: true,
          disableOnReset: true,
          dateFormat: "d-m-Y",
          path: `InsurableItem.0.RiskItems.0.DOB`,
          visible: i === 0,
          disabled: true,
        },
        {
          type: "MDDatePicker",
          label: "Date of Birth",
          // InputProps: { disabled: true },
          dateFormat: "d-m-Y",
          maxDate: `${new Date().getDate()}-${new Date().getMonth() + 1}-${
            new Date().getFullYear() - 5
          }`,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.DOB`,
          visible: i !== 0,
          disableOnReset: true,
          customOnChange: (e, v) => onTravellerDOB(e, v, i),
        },
        {
          type: "Input",
          label: "Age",
          visible: true,
          required: true,
          disableOnReset: true,
          disabled: i === 0,
          path: `InsurableItem.0.RiskItems.${i}.Age`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Sum Insured",
          visible: true,
          required: true,
          disableOnReset: true,
          name: "Suminsured",
          path: `InsurableItem.0.RiskItems.${i}.SumInsured`,
          onChangeFuncs: [IsNumericGreaterThanZero],
          customOnBlur: (e) => handleDublicatePass(e, "PassportNumber", i),
          InputProps: { maxLength: 12 },
        },
      ]);
    });
    return arr;
  };

  // const onAddTravellerDetails = async () => {
  //   if (masters.AddMember < Number(lDto.InsurableItem[0].RiskItems[0].NoOfPersons)) {
  //     lDto.InsurableItem[0].RiskItems.push({ ...AddMember() });
  //     masters1.AddMember += 1;
  //     setMasters({ ...masters1 });
  //     setDto({ ...lDto });
  //     if (masters.AddMember === Number(lDto.InsurableItem[0].RiskItems[0].NoOfPersons)) {
  //       masters1.flags.AddMember = true;
  //       setMasters({ ...masters1 });
  //     }
  //   }
  // };

  // const onAddTravellerDetails = async () => {
  //   const noOfPersons = Number(lDto.InsurableItem[0].RiskItems[0].NoOfPersons);
  //   while (masters.AddMember < noOfPersons) {
  //     lDto.InsurableItem[0].RiskItems.push({ ...AddMember() });
  //     masters1.AddMember += 1;
  //   }
  //   setDto({ ...lDto });
  //   setMasters({ ...masters1 });
  //   if (masters.AddMember === noOfPersons) {
  //     masters1.flags.AddMember = true;
  //     setMasters({ ...masters1 });
  //   }
  // };

  const handleBranchName = async (e, a, i) => {
    if (a !== null) {
      lDto.Bankdetails.BranchDetails[i].BranchName = a.mValue;
      lDto.Bankdetails.BranchDetails[i].Country = a.Country;
      lDto.Bankdetails.BranchDetails[i].ProvinceState = a.Province;
      lDto.Bankdetails.BranchDetails[i].District = a.District;
      lDto.Bankdetails.BranchDetails[i].Municipality = a.Municipality;
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = a.mValue;
      lDto.Bankdetails.BranchDetails[i].WardNumber = a.WardNo;
      if (process.env.NODE_ENV === "production") {
        const obj = {
          textList: [{ Text: a.mValue }],
        };
        const res = await Transliteration(obj);
        lDto.Bankdetails.BranchDetails[i].AddressNepali = res[0].text;
      }
    } else {
      lDto.Bankdetails.BranchDetails[i].BranchName = "";
      lDto.Bankdetails.BranchDetails[i].Country = "";
      lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
      lDto.Bankdetails.BranchDetails[i].District = "";
      lDto.Bankdetails.BranchDetails[i].Municipality = "";
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
      lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
      lDto.Bankdetails.BranchDetails[i].WardNumber = "";
    }
    setDto({ ...lDto });
  };
  // handle doc name

  // const handleDocName = (e, i) => {
  //   console.log(e, i);
  //   if (e.target.name === "DocName") {
  //     if (IsFreetextNoSpace(e.target.value) === true) {
  //       lDto.documentDetails[i].DocName = e.target.value;

  //       setDto({ ...lDto });
  //     }
  //   }
  // };

  const handlesubclass = async (_e, a) => {
    if (a !== null) {
      lDto.SubClass = a.mValue;
      if (a.mValue === "Travel Medical Comprehensive") {
        masters1.ClientType = masters.ClientType.filter((x) => x.mValue !== "Student");
        lDto.InsurableItem[0].RiskItems[0].ClientType = "";
        lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
        lDto.InsurableItem[0].RiskItems[0].Plan = "";
        lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
        lDto.InsurableItem[0].RiskItems[0].Geography = "";
      } else if (a.mValue === "Travel Medical") {
        lDto.InsurableItem[0].RiskItems[0].ClientType = "";
        lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
        lDto.InsurableItem[0].RiskItems[0].Plan = "";
        lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
        lDto.InsurableItem[0].RiskItems[0].Geography = "";
        await GetNPCommonMaster().then((r) => {
          r.forEach((x) => {
            masters1[x.mType] = x.mdata;
          });
          masters1.SubClass = masters.SubClass.filter(
            (x) => x.fieldName === "TravelMedicalInsurance"
          );
        });
      }
      setMasters({ ...masters1 });
      setDto({ ...lDto });
    } else {
      lDto.InsurableItem[0].RiskItems[0].ClientType = "";
      lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
      lDto.InsurableItem[0].RiskItems[0].Plan = "";
      lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
      lDto.InsurableItem[0].RiskItems[0].Geography = "";
      lDto.SubClass = "";

      setDto({ ...lDto });
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [savemodalopen, setsavemodalopen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const SavehandleModalOpen = () => {
    setsavemodalopen(true);
  };
  const SavehandleModalClose = () => {
    setsavemodalopen(false);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSavepolicyWFStatus = async () => {
    const proposalNo = objectPath.get(dto, "proposalNo");

    // const proposalNo = objectPath.get(lDto, "proposalNo");
    // console.log("ccc", ProposalNo);
    // if (genericInfo.ProposalNo !== "" || genericInfo.ProposalNo !== undefined) {
    if (genericInfo.Flow && genericInfo.Flow === "DisApproveFlow") {
      const obj = {
        Stage: "Proposal",
        Status: "307",
        WorkFlowType: "Agent",
        wfstageStatusId: "315",
      };
      await SavepolicyWFStatus(genericInfo.ProposalNo, dto.ProductCode, obj);
      const wfID = localStorage.getItem("wfIDforNepal");
      if (wfID !== null) {
        await UpdateWorkflowStatus(wfID, 263).then(() => {
          localStorage.removeItem("wfIDforNepal");
        });
      }
    }

    if (genericInfo.Flow && genericInfo.Flow === "DebitFlow") {
      const a = {
        Stage: "Proposal",
        Status: "322",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SavepolicyWFStatus(genericInfo.ProposalNo, dto.ProductCode, a);
    } else {
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);
    }
    handleModalOpen();
    // }
  };

  const handlesavedebitnote = () => {
    SavehandleModalOpen();
  };
  const generateFile = (content, fileName) => {
    // console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };

  // const CalculatePremiumfunc = async () => {
  //   setBackDropFlag(true);
  //   const calfun = await GenericApi("NepalTravelMedicalInsurance", "NepalTMIRatingAPI", lDto).then(
  //     async (x) => {
  //       if (x.finalResult) {
  //         objectPath.set(lDto, "PremiumDetails", x.finalResult);
  //         lDto.InsurableItem[0].RiskItems[0].TotalPremiuminusd =
  //           lDto.PremiumDetails.PremiumAfterCorporateDiscount;
  //         setDto({ ...lDto });
  //       } else {
  //         swal.fire({
  //           icon: "error",
  //           text: "Incurred an error please try again later",
  //           confirmButtonColor: "#0079CE",
  //         });
  //       }
  //     }
  //   );
  //   console.log("calfun", calfun);
  //   setBackDropFlag(false);
  // };
  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = lDto.ProposerDetails.EmailId;
      let Class = "";
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 234;
      }
      if (localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC") {
        Class = 254;
      }
      const obj = {
        proposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: lDto.proposalNo,
        keyType: "BGRProposal",
        communicationId: Class,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      if (EmailAddress !== "") {
        const res = await SendNotification(EmailAddress, obj);
        if (res.data.status === 1) {
          swal.fire({
            icon: "success",
            text: "E-Mail Sent succesfully",
            confirmButtonColor: "#0079CE",
          });
        } else {
          swal.fire({
            icon: "error",
            text: "E-Mail not sent as Incorrect E-Mail ID is captured in Customer Details Screen",
            confirmButtonColor: "#0079CE",
          });
        }
      } else {
        swal.fire({
          icon: "error",
          text: "E-Mail not sent as E-Mail ID is not captured in Customer Details Screen",
          confirmButtonColor: "#0079CE",
        });
      }
      setDto({ ...lDto });
    }
  };
  const onAddBranchDetails = () => {
    lDto.Bankdetails.BranchDetails.push({ ...BranchDetails() });
    masters1.placeMasters.push({ district: [], municipality: [] });
    setDto({ ...lDto });
  };
  // const handleIssuingBranch = (e, a, key) => {
  //   if (key === "InsuredType") {
  //     if (a !== null) {
  //       lDto.ProposerDetails.InsuredType = a.mValue;
  //       lDto.InsuredTypeCode = a.shortCode;
  //       if (lDto.ProvinceCode !== undefined) {
  //         lDto.Prefix = lDto.ProvinceCode.concat("/", a.shortCode)
  //           .concat("/", lDto.ShortCode, "/")
  //           .concat(",", lDto.ProvinceCode)
  //           .concat("/", lDto.ShortCode, "/");
  //       }
  //       setDto({ ...lDto });
  //     } else {
  //       lDto.ProposerDetails.InsuredType = "";
  //       lDto.InsuredTypeCode = "";
  //       setDto({ ...lDto });
  //     }
  //   }
  //   if (key === "IssuingBranch") {
  //     if (a !== null) {
  //       lDto.Channel.IssuingBranch = a.mValue;
  //       lDto.Prefix = a.ProvinceCode.concat("/", dto.InsuredTypeCode)
  //         .concat("/", a.ShortCode, "/")
  //         .concat(",", a.ProvinceCode)
  //         .concat("/", a.ShortCode, "/");
  //       lDto.ProvinceCode = a.ProvinceCode;
  //       lDto.ShortCode = a.ShortCode;
  //       const BusinessTypeCode = lDto.DocType[0];

  //       // const FiscalYear = lDto.Channel.FiscalYear;
  //       lDto.PolicyPrefix = a.ProvinceCode.concat("/", a.ShortCode, "/", "TMI").concat(
  //         "/",
  //         // ClassCode,
  //         "/",
  //         BusinessTypeCode,
  //         "/",
  //         lDto.Channel.FiscalYear,
  //         "/"
  //       );
  //       lDto.Suffix = "-".concat(lDto.Channel.FiscalYear, ",");
  //     } else {
  //       lDto.Channel.IssuingBranch = "";
  //     }
  //   }
  //   setDto({ ...lDto });
  // };

  // organization name

  const Navigate = useNavigate();
  const onModalclose = () => {
    Navigate("/retail/home");
  };

  const onSaveModalClose = async () => {
    if (genericInfo && genericInfo.ProposalNo !== undefined) {
      // if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
      lDto.ProposerDetails = [lDto.ProposerDetails];
      await UpdateProposalDetails(lDto).then(async () => {
        lDto.ProposerDetails = [lDto.ProposerDetails];
        // objectPath.set(lDto, "proposalNo", x.data.proposalNo);
        setDto({ ...lDto });
        if (
          genericInfo.Flow &&
          (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
        ) {
          swal
            .fire({
              icon: "success",
              text: "Details Saved Successfully",
              confirmButtonColor: "#0079CE",
            })
            .then((result) => {
              if (result.isConfirmed) {
                Navigate("/retail/home");
              }
            });
        }
      });
    } else {
      const proposalNo = objectPath.get(lDto.proposalNo);
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "322",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);

      SavehandleModalClose();
      swal
        .fire({
          html: `<div> <img src=${Success} alt="success"><br>Debit Note Saved Successfully</br>${lDto.proposalNo}</div>`,
          confirmButtonColor: "#0079CE",
        })
        // .fire({
        //   html: `<div> <img src=${Success} alt="success"></div>`,
        //   title: "Debit Note Saved Successfully",
        //   showConfirmButton: true,
        //   confirmButtonText: "OK",
        //   allowOutsideClick: false,
        //   confirmButtonColor: "#0079CE",
        // })
        .then((result) => {
          if (result.isConfirmed) {
            Navigate("/retail/home");
          }
        });
      setDto({ ...lDto });
    }
  };

  const onDebitNoteClick = async (e, key) => {
    // let Class = "";

    // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //   Class = 315;
    // }
    // if (
    //   localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
    //   process.env.REACT_APP_EnvId === "1"
    // ) {
    //   Class = 315;
    // }

    const proposalNo = objectPath.get(lDto, "proposalNo");
    const downloadDTO = {
      key: lDto.proposalNo,
      keyValue: "",
      templateKey: "",
      templateId: "434",
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      // console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNo);
        // setBackDropFlag(false);
      }
    });
    if (key === "SAVE DEBIT NOTE") {
      onSaveModalClose();
    }
  };
  // handle the annual
  const HandleIndvidOrFamily = (e) => {
    lDto.IsIndividualOrFamily = e.target.value;
    // lDto.InsurableItem[0].RiskItems[0].ClientType = e.target.value;
    // Update the radio group based on the selected ClientType
    if (lDto.IsIndividualOrFamily === "Individual") {
      lDto.InsurableItem[0].RiskItems[0].ClientType = "Individual";
    }
    if (lDto.IsIndividualOrFamily === "Family") {
      lDto.InsurableItem[0].RiskItems[0].ClientType = "Family";
    }
    // if (lDto.InsurableItem[0].RiskItems[0].ClientType === "Individual") {
    //   lDto.IsIndividualOrFamily = "Individual";
    // } else if (lDto.InsurableItem[0].RiskItems[0].ClientType === "Family") {
    //   lDto.IsIndividualOrFamily = "Family";
    // }

    lDto.InsurableItem[0].RiskItems[0].Age = "";
    lDto.InsurableItem[0].RiskItems[0].SumInsured = "";
    lDto.InsurableItem[0].RiskItems[0].DOB = "";
    lDto.InsurableItem[0].RiskItems[0].Premium = "";
    lDto.InsurableItem[0].RiskItems[0].NoOfPersons = "1";
    objectPath.set(lDto, "InsurableItem.0.RiskItems.0.Rate%", "");

    setDto({ ...lDto });
  };

  // Handle branch name populations

  const handleFieldOfficerCode = async (e, a, key) => {
    if (key === "FieldOfficer") {
      if (a !== null) {
        lDto.Channel.FieldOfficerCode = a.fieldName;
        lDto.Channel.FieldOfficer = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.FieldOfficerCode = "";
        lDto.Channel.FieldOfficer = "";
        setDto({ ...lDto });
      }
    } else if (key === "FieldofficerName") {
      if (a !== null) {
        lDto.Channel.FieldOfficer = a.mValue;
        lDto.Channel.FieldOfficerCode = a.fieldName;

        setDto({ ...lDto });
      } else {
        lDto.Channel.FieldOfficer = "";
        lDto.Channel.FieldOfficerCode = "";

        setDto({ ...lDto });
      }
    }
    if (key === "SubFieldOfficerCode") {
      if (a !== null) {
        lDto.Channel.SubFieldOfficerCode = a.fieldName;
        lDto.Channel.SubFieldOfficer = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.SubFieldOfficerCode = "";
        lDto.Channel.SubFieldOfficer = "";
        setDto({ ...lDto });
      }
    } else if (key === "SubFieldOfficerName") {
      if (a !== null) {
        lDto.Channel.SubFieldOfficer = a.mValue;
        lDto.Channel.SubFieldOfficerCode = a.fieldName;
        setDto({ ...lDto });
      } else {
        lDto.Channel.SubFieldOfficerCode = "";
        lDto.Channel.SubFieldOfficer = "";
        setDto({ ...lDto });
      }
    }
    if (key === "AgentCode") {
      if (a !== null) {
        lDto.Channel.AgentCode = a.fieldName;
        lDto.Channel.AgentName = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.AgentCode = "";
        lDto.Channel.AgentName = "";
        setDto({ ...lDto });
      }
    } else if (key === "AgentName") {
      if (a !== null) {
        lDto.Channel.AgentName = a.mValue;
        lDto.Channel.AgentCode = a.fieldName;
        setDto({ ...lDto });
      } else {
        lDto.Channel.AgentName = "";
        lDto.Channel.AgentCode = "";
        setDto({ ...lDto });
      }
    }
    if (key === "SubAgentCode") {
      if (a !== null) {
        lDto.Channel.SubAgentCode = a.fieldName;
        lDto.Channel.SubAgentName = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.SubAgentCode = a.fieldName;
        lDto.Channel.SubAgentName = a.mValue;
        setDto({ ...lDto });
      }
    } else if (key === "SubAgentName") {
      if (a !== null) {
        lDto.Channel.SubAgentName = a.mValue;
        lDto.Channel.SubAgentCode = a.fieldName;

        setDto({ ...lDto });
      } else {
        lDto.Channel.SubAgentName = "";
        lDto.Channel.SubAgentCode = "";
        setDto({ ...lDto });
      }
    }
  };

  // const OnDirectDiscountAgent = (e, a) => {
  //   if (a !== null) {
  //     lDto.InsurableItem[0].RiskItems[0].CorporateDiscount = a.mValue;
  //   } else {
  //     lDto.InsurableItem[0].RiskItems[0].CorporateDiscount = "";
  //   }
  //   lDto.Channel.AgentCode = "";
  //   lDto.Channel.AgentName = "";

  //   setDto({ ...lDto });
  // };

  // Multi Kyc Function

  const RemoveBranchDetails = (i) => {
    const arr = dto.Bankdetails.BranchDetails.filter((x, i1) => i1 !== i);
    lDto.Bankdetails.BranchDetails = arr;
    setDto({ ...lDto });
  };
  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push([
        {
          type: "Button",
          label: "Delete",
          spacing: 12,
          // startIcon: <DeleteIcon />,
          justifyContent: "end",
          visible: i !== 0,
          onClick: () => RemoveBranchDetails(i),
        },
        {
          type: "AutoComplete",
          label: "Branch Name",
          visible: masters.BranchMasters.length > 0,
          options: masters.BranchMasters,
          // visible: true,
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
          // onChangeFuncs: [IsAlphaNoSpace],
          required: true,
          customOnChange: (e, a) => handleBranchName(e, a, i),
        },
        {
          type: "Input",
          label: "Country",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          // options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "Input",
          label: "Province/State",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
          required: true,
          disabled: true,
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "State4", i),
        },
        {
          type: "Input",
          label: "District",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.District`,
          // options:
          //   lDto.Bankdetails.BranchDetails[i].ProvinceState !== ""
          //     ? masters.placeMasters[i].district
          //     : [],
          required: true,
          disabled: true,

          // customOnChange: (e, a) => OnPlaceSelect(e, a, "District4", i),
        },
        {
          type: "Input",
          label: "Municipality",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          disabled: true,
          // options:
          //   lDto.Bankdetails.BranchDetails[i].District !== ""
          //     ? masters.placeMasters[i].municipality
          //     : [],
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality4", i),
        },
        {
          type: "Input",
          label: "Ward Number",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          // options: masters.WardNumber,
          disabled: true,
        },
        {
          type: "Input",
          label: "Address(English)",
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          name: "BranchNameinEnglish",
          disabled: true,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Branch Name",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
        },
        {
          type: "AutoComplete",
          label: "Country",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State4", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.District`,
          options:
            lDto.Bankdetails.BranchDetails[i].ProvinceState !== ""
              ? masters.placeMasters[i].district
              : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District4", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          options:
            lDto.Bankdetails.BranchDetails[i].District !== ""
              ? masters.placeMasters[i].municipality
              : [],
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality4", i),
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          options: masters.WardNumber,
        },
        {
          type: "Input",
          label: "Address(English)",
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "BranchNameinEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Address(Nepali)",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.AddressNepali`,
          // required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "Area",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.Area`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/Street Name",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "House Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.HouseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Plot Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.PlotNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Contact Person 1",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ContactPerson1`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact Person 2",
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
          path: `Bankdetails.BranchDetails.${i}.ContactPerson2`,
        },
        {
          type: "Input",
          label: "Contact Person 3",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ContactPerson3`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Phone Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.PhoneNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Mobile Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.MobileNumber`,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
        },
        {
          type: "Input",
          label: "Fax Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.FaxNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Branch Manager",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.BranchManager`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Email ID",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.Email`,
          onBlurFuncs: [IsEmail],
        },
        {
          type: "Typography",
          label: "",
          spacing: 12,
          visible: true,
        },
      ]);
    });
    return arr;
  };

  const OnProfilePicture = async (e, i) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    const fileExtension = file.name.split(".").pop();
    if (fileExtension === "jpeg" || fileExtension === "png") {
      await DocumenUpload(formData);
      lDto.ProposerDetails[i].ProfilePicture = file.name;
      setDto({ ...lDto });
      swal.fire({
        icon: "success",
        text: "Profile picture uploaded successfully",
        allowOutsideClick: false,
      });
    } else {
      swal.fire({
        icon: "error",
        text: "Accepts only JPEG or PNG formats",
        confirmButtonColor: "#0079CE",
        allowOutsideClick: false,
      });
    }
  };
  const onCancelClickProfilePicture = async (i) => {
    const file = lDto.ProposerDetails[i].ProfilePicture;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails[i].ProfilePicture = "";
        setDto({ ...lDto });
      }
    });
  };

  const OnBankNonBank = (e, a) => {
    if (a !== null) {
      lDto.Bankdetails.BankorNonBank = a.mValue;
    } else {
      lDto.Bankdetails.BankorNonBank = "";
    }
    lDto.Bankdetails = {
      ...lDto.Bankdetails,
      BankCategory: "",
      BankorFinancialInstituionNameinEnglish: "",
      BankorFinancialInstituionNameinNepali: "",
      ProvinceorState: "",
      District: "",
      Municipality: "",
      WardNumber: "",
      AddressEnglish: "",
      AddressNepali: "",
    };
    setDto({ ...lDto });
  };
  const spreadMultiKYCDetails = () => {
    const arr = [];
    dto.ProposerDetails.forEach((x, i) => {
      arr.push([
        // {
        //   type: "Button",
        //   label: "Delete",
        //   spacing: 12,
        //   justifyContent: "end",
        //   visible: i !== 0,
        //   onClick: () => RemoveMultiKYCDetails(i),
        // },
        {
          type: "AutoComplete",
          label: "KYC Category",
          visible: true,
          path: `ProposerDetails.${i}.KYCCategory`,
          options: masters.KYCCategory,
          required: true,
          disableOnReset: true,
        },
        {
          type: "AutoComplete",
          label: "Insured Type",
          visible: true,
          path: `ProposerDetails.${i}.InsuredType`,
          options: masters.InsuredType,
          required: true,
        },
        {
          type: "Input",
          label: "Special Client",
          visible: true,
          path: `ProposerDetails.${i}.SpecialClient`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          disableOnReset: true,
        },
        {
          type: "Input",
          label: "Insured Name English",
          visible: true,
          path: `ProposerDetails.${i}.InsuredNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "InsuredNameEnglish",
          customOnChange: (e) => OnInsuredNameEnglish(e, "InsuredNameEnglish", i),
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Insured Name Nepali",
          visible: true,
          path: `ProposerDetails.${i}.InsuredNameNepali`,
          // required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "KYC Classification",
          visible: true,
          path: `ProposerDetails.${i}.KYCClassification`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "AutoComplete",
          label: "KYC Risk Category",
          visible: true,
          path: `ProposerDetails.${i}.KYCRiskCategory`,
          options: masters.KYCRiskCategory,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Is Beneficiary Owner",
          visible: true,
          path: `ProposerDetails.${i}.IsBeneficiaryOwner`,
          options: masters.IsBeneficiaryOwner,
          disableOnReset: true,
        },
        {
          type: "AutoComplete",
          label: "Occupation",
          visible: true,
          path: `ProposerDetails.${i}.Occuptation`,
          options: masters.Occupation,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Income Source",
          visible: true,
          path: `ProposerDetails.${i}.IncomeSource`,
          options: masters.IncomeSource,
          required: true,
        },
        {
          type: "Input",
          label: "Contact Person Name",
          visible: true,
          path: `ProposerDetails.${i}.ContactPersonName`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Email Address",
          visible: true,
          path: `ProposerDetails.${i}.EmailId`,
          onBlurFuncs: [IsEmail],
        },
        {
          type: "Input",
          label: "PAN Number",
          visible: true,
          path: `ProposerDetails.${i}.PANNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          // InputProps: { maxLength: 9 },
          required:
            lDto.ProposerDetails[i].InsuredType !== "Individual" &&
            lDto.ProposerDetails[i].InsuredType !== "Government body",
        },
        // {
        //   type: "Input",
        //   label: "VAT Number",
        //   visible: true,
        //   path: `ProposerDetails.${i}.VATNumber`,
        //   onChangeFuncs: [IsAlphaNumNoSpace],
        //   required:
        //     lDto.ProposerDetails[i].InsuredType !== "Individual" &&
        //     lDto.ProposerDetails[i].InsuredType !== "Government body",
        // },
        {
          type: "Input",
          label: "VAT Number",
          visible: true,
          path: `ProposerDetails.${i}.VATNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          InputProps: { maxLength: 9 },
          required:
            lDto.ProposerDetails[i].InsuredType !== "Individual" &&
            lDto.ProposerDetails[i].InsuredType !== "Government body",
        },
        {
          type: "Input",
          label: "Registration Number",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "MDDatePicker",
          label: "Registration Date",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationDate`,
        },
        {
          type: "MDDatePicker",
          label: "Registration Close Date",
          visible: true,
          path: `ProposerDetails.${i}.RegisterationCloseDate`,
          // disabled: lDto.ProposerDetails[i].RegistrationDate === "",
          minDate: new Date(lDto.ProposerDetails[i].RegistrationDate),
        },
        {
          type: "Input",
          label: "Registration Office",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationOffice`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Reference Insured Name",
          visible: true,
          path: `ProposerDetails.${i}.ReferenceInsuredName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Phone Number",
          visible: true,
          path: `ProposerDetails.${i}.PhoneNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Mobile Number",
          visible: true,
          path: `ProposerDetails.${i}.MobileNo`,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
          required: true,
        },
        {
          type: "Input",
          label: "TDS Category",
          visible: true,
          path: `ProposerDetails.${i}.TDSCategory`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "AutoComplete",
          label: "Country",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Country`,
          options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.ProvinceState`,
          options: lDto.ProposerDetails[i].PermanentAdrress.Country !== "" ? masters.State : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State2", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.District`,
          options:
            lDto.ProposerDetails[i].PermanentAdrress.ProvinceState !== "" ? masters.District2 : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District2", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Municipality`,
          options:
            lDto.ProposerDetails[i].PermanentAdrress.District !== "" ? masters.Municipality2 : [],
          required: true,
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality2"),
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.WardNumber`,
          options: masters.WardNumber,
        },
        {
          type: "Input",
          label: "Address(English) ",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          required: true,
          name: "PermanentAdrressEnglish",
          customOnChange: (e) => OnInsuredNameEnglish(e, "AddressEnglish", i),
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Address(Nepali) ",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          onChangeFuncs: [IsFreetextNoSpace],
          // required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "Area",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Area`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/Street Name",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "House Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.HouseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Plot Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.PlotNumber`,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Temporary Address-English ",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "TemporaryAddressEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Temporary Address-Nepali ",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
          disabled: true,
        },
        { type: "Typography", label: "Document Section", visible: true, spacing: 12 },
        {
          type: "Button",
          label: "Add Document",
          visible: true,
          startIcon: <AddIcon />,
          variant: "outlined",
          onClick: () => onAddDocument(i),
          spacing: 12,
        },
        ...spreadDocumentDetails(i),
        {
          type: "Accordions",
          //   visible: lDto.ProposerDetails[i].InsuredType !== "",
          spacing: 12,
          accordionList: [
            {
              id: 1,
              label: lDto.ProposerDetails[i].InsuredType,
              visible:
                lDto.FinancingType !== "" && lDto.ProposerDetails[i].InsuredType === "Individual",
            },
            {
              id: 2,
              label: lDto.ProposerDetails[i].InsuredType,
              visible:
                lDto.FinancingType !== "" &&
                lDto.ProposerDetails[i].InsuredType !== "" &&
                lDto.ProposerDetails[i].InsuredType !== "Individual",
            },
          ],
        },

        //   ffffffffffffff
        {
          type: "Typography",
          label: "Upload Profile Picture",
          visible: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Button",
          visible: true,
          component: "label",
          label: "Upload",
          spacing: 2,
          accordionId: 1,
          typeFormat: (
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png,"
              type="file"
              onChange={(e) => OnProfilePicture(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i].ProfilePicture,
          // spacing: 3,
          visible: true,
          accordionId: 1,
          spacing: 3.5,
          sx: { fontSize: "15px", paddingTop: 1 },
        },
        {
          type: "IconButton",
          icon: "close",
          // spacing: 2,
          visible: lDto.ProposerDetails[i].ProfilePicture !== "",
          onClick: () => onCancelClickProfilePicture(i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 12,
          accordionId: 1,
        },
        {
          type: "AutoComplete",
          label: "Gender (English)",
          visible: true,
          path: `ProposerDetails.${i}.GenderEnglish`,
          // options: masters.Gender,
          options: GenderNepali,
          required: true,
          customOnChange: (e, a) => handleGender(e, a, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Gender (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GenderNepali`,
          required: true,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Marital status (English)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusEnglish`,
          // options: masters.MaritalStatus,
          options: MaritalStatus,
          customOnChange: (e, a) => handleMarital(e, a, i),
          required: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Marital status (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusNepali`,
          required: true,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Husband's Name(English)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualHusbandNameEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Husband's Name(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Wife Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualWifeNameEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Wife Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Father Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualFatherNameEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Father Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "GrandFather Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualGrandfatherNameEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "GrandFather Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Nationality (English)",
          visible: true,
          path: `ProposerDetails.${i}.NationalityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Permanent Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "IndividualPermanentAddressEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Permanent Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Town (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "IndividualTownEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Town (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "City (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "IndividualCityEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "City (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Temporary Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "IndividualTemporaryAddressEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Temporary Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Residence(English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.ResidenceEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "IndividualResidenceEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Residence(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.ResidenceNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Citizenship Number",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipNumber`,
          required: true,
          accordionId: 1,
          spacing: 3,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "MDDatePicker",
          label: "Citizenship Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
          required: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Citizenship Issue District",
          visible: true,
          path: `ProposerDetails.${i}.IssueDistrict`,
          options: masters.District,
          required: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Date Of Birth",
          visible: true,
          path: `ProposerDetails.${i}.DoB`,
          required: true,
          dateFormat: "m-d-Y",
          maxDate: new Date(),
          accordionId: 1,
          spacing: 3,
          customOnChange: (e, d) => onDOBselect1(e, d, i),
        },
        {
          type: "Input",
          label: "License Number",
          visible: true,
          spacing: 3,
          path: `ProposerDetails.${i}.LicenseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 1,
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: { label: "Passport Issued By", labelVisible: true },
          radioList: [
            { value: "India", label: "India" },
            { value: "Nepal", label: "Nepal" },
          ],
          path: `ProposerDetails.${i}.PassportIssuedBy`,
          spacing: 3.2,
          accordionId: 1,
        },

        {
          type: "Input",
          label: "Passport Number",
          visible: true,
          path: `ProposerDetails.${i}.PassportNumber`,
          InputProps: { maxLength: 8 },
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 1,
          spacing: 2.8,
        },
        {
          type: "MDDatePicker",
          label: "Passport Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportIssuedDate`,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Passport Expiry Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportExpiryDate`,
          minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate).setDate(
            new Date(lDto.ProposerDetails[i].PassportIssuedDate).getDate() + 1
          ),
          accordionId: 1,
          spacing: 3,
        },

        //   fffffffffffffffffff
        {
          type: "Input",
          label: "Name of the Organization",
          visible: true,
          path: `ProposerDetails.${i}.NameoftheOrganisation`,
          required: true,
          disabled: true,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Address of Organization",
          visible: true,
          path: `ProposerDetails.${i}.OrganizationAddress`,
          required: true,
          onChangeFuncs: [IsFreetextNoSpace],
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Organization Phone Number",
          visible: true,
          path: `ProposerDetails.${i}.OrganizationContactNo`,
          onBlurFuncs: [IsPhoneNumber],
          onChangeFuncs: [IsNumeric],
          accordionId: 2,
          spacing: 3,
          InputProps: { maxLength: 10 },
        },
        {
          type: "Typography",
          label: "Member Details",
          visible: true,
          spacing: 12,
          accordionId: 2,
        },
        {
          type: "AutoComplete",
          label: "Member Type",
          visible: true,
          path: `ProposerDetails.${i}.MemberType`,
          options: masters.MemberType,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Role",
          visible: true,
          path: `ProposerDetails.${i}.Role`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Member Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.MemberNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "MemberNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Member Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MemberNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Designation (English)",
          visible: true,
          path: `ProposerDetails.${i}.DesignationEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "DesignationEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Designation (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.DesignationNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Gender (English)",
          visible: true,
          path: `ProposerDetails.${i}.GenderEnglish`,
          options: GenderNepali,
          customOnChange: (e, a) => handleGender(e, a, i),
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Gender (Nepali)",
          visible: true,
          disabled: true,
          path: `ProposerDetails.${i}.GenderNepali`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Marital Status (English)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusEnglish`,
          options: MaritalStatus,
          customOnChange: (e, a) => handleMarital(e, a, i),
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Marital Status (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Husband's Name(English)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "HusbandNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Husband's Name(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Wife Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "WifeNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Wife Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Father Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "FatherNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Father Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "GrandFather Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "GrandFatherNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "GrandFather Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Nationality (English)",
          visible: true,
          path: `ProposerDetails.${i}.NationalityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Permanent Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "AddressEnglish111",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Permanent Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Town (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "TownEnglish1111",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Town (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "City (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "CityEnglish11111",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "City (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Temporary Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TempAddresEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "TempAddresEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Temporary Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TempAddresNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Identification Type",
          visible: true,
          path: `ProposerDetails.${i}.IdentificationType`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 2,
          spacing: 3,
        },

        {
          type: "Input",
          label: "Citizenship Number",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Citizenship Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Citizenship Issue District",
          visible: true,
          path: `ProposerDetails.${i}.IssueDistrict`,
          options: masters.District,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Date Of Birth",
          visible: true,
          path: `ProposerDetails.${i}.DoB`,
          dateFormat: "m-d-Y",
          maxDate: new Date(),
          accordionId: 2,
          spacing: 3,
          customOnChange: (e, d) => onDOBselect1(e, d, i),
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: { label: "Passport Issued By", labelVisible: true },
          radioList: [
            { value: "India", label: "India" },
            { value: "Nepal", label: "Nepal" },
          ],
          path: `ProposerDetails.${i}.PassportIssuedBy`,
          spacing: 3.2,
          accordionId: 2,
        },
        {
          type: "Input",
          label: "Passport Number",
          visible: true,
          path: `ProposerDetails.${i}.PassportNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          InputProps: { maxLength: 9 },
          accordionId: 2,
          spacing: 2.8,
        },
        {
          type: "MDDatePicker",
          label: "Passport Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportIssuedDate`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Passport Expiry Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportExpiryDate`,
          minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate).setDate(
            new Date(lDto.ProposerDetails[i].PassportIssuedDate).getDate() + 1
          ),
          accordionId: 2,
          spacing: 3,
          // disabled: lDto.ProposerDetails[i].PassportIssuedDate === "",
        },

        {
          type: "Input",
          label: "License Number",
          visible: true,
          spacing: 3,
          path: `ProposerDetails.${i}.LicenseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 2,
        },
        {
          type: "AutoComplete",
          label: "Status",
          visible: true,
          path: `ProposerDetails.${i}.Status`,
          options: masters.Status,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Appoint Date",
          visible: true,
          path: `ProposerDetails.${i}.AppointDate`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 12,
          accordionId: 2,
        },
        {
          type: "Typography",
          label: "Upload Profile Picture",
          visible: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Button",
          visible: true,
          component: "label",
          label: "Upload",
          spacing: 2,
          accordionId: 2,
          typeFormat: (
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png,"
              type="file"
              onChange={(e) => OnProfilePicture(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i].ProfilePicture,
          visible: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "IconButton",
          icon: "close",
          accordionId: 2,
          spacing: 3,
          visible: lDto.ProposerDetails[i].ProfilePicture !== "",
          onClick: () => onCancelClickProfilePicture(i),
        },
      ]);
    });
    return arr;
  };

  let data = [];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            label: "DocType(PolicyType)",
            visible: true,
            path: "DocType",
            // value: "Fresh",
            disableOnReset: true,
            options: masters.DocType,
            required: true,
            disabled: true,
          },
          // {
          //   type: "Input",
          //   label: "Doc Type(PolicyType)",
          //   visible: true,
          //   path: "DocType",
          //   required: true,
          //   value: "Fresh",
          //   disableOnReset: true,
          //   disabled: true,
          // },
          {
            type: "Input",
            label: "Department",
            visible: true,
            path: "Department",
            // value: "Miscellaneous",
            disableOnReset: true,
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Class",
            path: "Class",
            // value: "Domicillary & Hospitalization",
            visible: true,
            disableOnReset: true,
            required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Sub-Class",
            visible: true,
            path: "SubClass",
            required: true,
            disableOnReset: true,
            customOnChange: (e, a) => handlesubclass(e, a),
            options: masters.SubClass,
            validationId: 1,
          },
          {
            type: "AutoComplete",
            label: "Premium Type",
            // value: "Normal",
            visible: true,
            path: "PremiumType",
            disableOnReset: true,
            options: masters.PremiumType,
            required: true,
            disabled: true,
            // customOnChange: (e, a) => OnPTSelect(e, a),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            path: "PolicyStartDate",
            dateFormat: "m/d/Y",
            minDate: PolicyStartDateFiscalYear(),
            maxDate: PolicyStartDateMaxDate(),
            customOnChange: (e, d) => OnPSDSelect(e, d),
          },
          {
            type: "Input",
            label: "Number of Days",
            required: true,
            visible: true,
            path: "NumberofDays",
            onChangeFuncs: [IsNumericGreaterThanZero],
            customOnChange: (e) => OnNumberofDays(e),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            visible: true,
            dateFormat: "m/d/Y",
            path: "PolicyEndDate",
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Business Type",
            visible: true,
            path: "BusinessType",
            // value: "BusinessType",
            options: masters.BusinessType,
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            path: "IsIndividualOrFamily",
            required: true,
            validationId: 1,
            disableOnReset: true,
            customOnChange: (e) => HandleIndvidOrFamily(e),
            radioLabel: { label: "Is Individual or Family", labelVisible: true },
            radioList: [
              { value: "Individual", label: "Individual" },
              {
                value: "Family",
                label: "Family",
              },
            ],
            // path: "",
            spacing: 12,
          },
          {
            type: "Input",
            label: "No. of Persons",
            path: "InsurableItem.0.RiskItems.0.NoOfPersons",
            visible: lDto.IsIndividualOrFamily !== "",
            required: true,
            validationId: 1,
            // disableOnReset: true,
            onChangeFuncs: [IsNumericGreaterThanZero, calculatePremium],
            disabled: lDto.IsIndividualOrFamily === "Individual",
            customOnChange: (e) => OnADDMultiKYCDetailsnew(e),
            // customOnChange: (days1) => handlePolicyDates(days1),
          },
          {
            type: "MDDatePicker",
            visible: lDto.IsIndividualOrFamily !== "",
            path: "InsurableItem.0.RiskItems.0.DOB",
            // path: "InsurableItem.0.RiskItems.0.DateofBirth",
            label: "Date of Birth",
            validationId: 1,
            // maxDate: `${new Date().getDate()}-${new Date().getMonth() + 1}-${
            //   new Date().getFullYear() - 18
            // }`,
            dateFormat: "d-m-Y",
            customOnChange: (e, d) => onDOBselect(e, d),
            required: true,
          },
          {
            type: "Input",
            label: "Age",
            visible: lDto.IsIndividualOrFamily !== "",
            path: "InsurableItem.0.RiskItems.0.Age",
            required: true,
            disabled: true,
            // onBlurFuncs: selectedDate ? calculateAge(selectedDate) : "",
          },
          {
            type: "Input",
            label: "Sum Insured",
            path: "InsurableItem.0.RiskItems.0.SumInsured",
            visible: lDto.IsIndividualOrFamily !== "",
            required: true,
            validationId: 1,
            // onChangeFuncs: [IsNumericGreaterThanZero],
            onChangeFuncs: [IsNumericGreaterThanZero, calculatePremium],
            // customOnChange: (days1) => handlePolicyDates(days1),
          },
          {
            type: "Input",
            label: "Rate %",
            visible: lDto.IsIndividualOrFamily !== "",
            // visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.Rate%",
            InputProps: { maxLength: 6 },
            // onChangeFuncs: [IsDecimal],
            onChangeFuncs: [Ratevalid, calculatePremium],
          },
          {
            type: "Input",
            label: "Premium Amount",
            path: "InsurableItem.0.RiskItems.0.Premium",
            visible: lDto.IsIndividualOrFamily !== "",
            required: true,
            validationId: 1,
            disabled: true,
            onChangeFuncs: [IsNumericGreaterThanZero],
            // customOnChange: (days1) => handlePolicyDates(days1),
          },
          // {
          //   type: "Input",
          //   label: "Premium",
          //   path: "InsurableItem.0.RiskItems.0.Premium",
          //   visible: lDto.IsIndividualOrFamily !== "",
          //   required: true,
          //   validationId: 1,
          //   onChangeFuncs: [IsNumeric],
          //   disabled: true,
          //   // customOnChange: (days1) => handlePolicyDates(days1),
          // },
          // {
          //   type: "ValidationControl",
          //   subType: "Button",
          //   validationId: 1,
          //   label: "Calculate Premium",
          //   variant: "outlined",
          //   visible: true,
          //   // InputProps: { loader: true },
          //   // endIcon: flag.backdropflag && <CircularProgress size="20px" />,
          //   spacing: 12,
          //   align: "right",
          //   onClick: () => CalculatePremiumfunc(),
          // },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "MDDatePicker",
            visible: true,
            label: "Policy Start Date",
            path: "PolicyStartDate",
            InputProps: { disabled: true },
            disableOnReset: true,
            disabled: true,
            // dateFormat: "m/d/Y",
            required: true,
          },
          {
            type: "MDDatePicker",
            visible: true,
            label: "Policy End Date",
            path: "PolicyEndDate",
            // dateFormat: "m/d/Y",
            disabled: true,
            disableOnReset: true,
            InputProps: { disabled: true },
            required: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Financing Details", labelVisible: true },
            radioList: [
              { value: "Direct", label: "Direct" },
              { value: "Bank/Financial Institution", label: "Bank/Financial Institution" },
            ],
            path: "FinancingType",
            spacing: 12,
            required: true,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            visible: true,
            path: "Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
            required: true,
            customOnChange: (e, a) => OnBankNonBank(e, a),
          },
          {
            type: "AutoComplete",
            label: "Bank Category",
            visible: true,
            path: "Bankdetails.BankCategory",
            options: masters.BankCategory.filter(
              (x) =>
                (lDto.Bankdetails.BankorNonBank === "Bank" && x.description !== "Non-Bank") ||
                (lDto.Bankdetails.BankorNonBank === "Non-Bank" && x.description === "Non-Bank")
            ),
            required: true,
            customOnChange: (e, a) => handleBankCategory(e, a, "BankCategory"),
          },
          {
            type: "AutoComplete",
            label: "Bank/Financial Institution Name in English",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinEnglish",
            onChangeFuncs: [IsAlphaNumNoSpace],
            options:
              lDto.Bankdetails.BankCategory !== ""
                ? masters.BankorFinancialInstituionNameinEnglish
                : [],

            // name: "BankNameinEnglish",
            // customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
          },
          {
            type: "Input",
            label: "Bank/Financial Institution Name in Nepali",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinNepali",
            // onChangeFuncs: [IsFreetextNoSpace],
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Bank Code",
            visible: true,
            path: "Bankdetails.BankCode",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Short Code",
            visible: true,
            path: "Bankdetails.ShortCode",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Swift/Pseudo Code",
            visible: true,
            path: "Bankdetails.SwiftPseudoCode",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person 1",
            visible: true,
            path: "Bankdetails.ContactPerson1",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person 2",
            visible: true,
            path: "Bankdetails.ContactPerson2",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person 3",
            visible: true,
            path: "Bankdetails.ContactPerson3",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            path: "Bankdetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "Bankdetails.MobileNumber",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Fax Number",
            visible: true,
            path: "Bankdetails.FaxNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Website",
            visible: true,
            path: "Bankdetails.Website",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Email",
            visible: true,
            path: "Bankdetails.Email",
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "Bankdetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            // InputProps: { maxLength: 9 },
          },
          {
            type: "Input",
            label: "Bank Agent Code",
            visible: true,
            path: "Bankdetails.BankAgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "CEO Name",
            visible: true,
            path: "Bankdetails.CEO",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            path: "Bankdetails.Country",
            options: masters.Country,
            disableOnReset: true,
            disabled: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            path: "Bankdetails.ProvinceorState",
            // options: lDto.Bankdetails.Country !== "" ? masters.State : [],
            required: true,
            disabled: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "State1"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: "Bankdetails.District",
            // options: lDto.Bankdetails.ProvinceorState !== "" ? masters.District1 : [],
            required: true,
            disabled: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "District1"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            disabled: true,
            path: "Bankdetails.Municipality",
            // options: lDto.Bankdetails.District !== "" ? masters.Municipality1 : [],
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality1"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "Bankdetails.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            visible: true,
            path: "Bankdetails.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "BankAddressEnglish",
            disabled: true,
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            path: "Bankdetails.AddressNepali",
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "Bankdetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            path: "Bankdetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            path: "Bankdetails.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "Bankdetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Button",
            label: "ADD BRANCH DETAILS",
            // visible: flag.ExistingDetails1,
            visible: true,
            // startIcon: <AddIcon />,
            variant: "outlined",
            component: "label",
            onClick: onAddBranchDetails,
            spacing: 12,
          },
          ...spreadBranchDetails()[0],
        ],
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        [
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.0.Name",
            onChangeFuncs: [IsAlphaNoSpace],
            paths: [{ path: "ProposerDetails.0.PolicyHolderDetails.PolicyHolderName", value: "" }],
          },
          {
            type: "Input",
            label: "Designation",
            visible: true,
            path: "ProposerDetails.0.Designation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            path: "ProposerDetails.0.Occupation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.0.Address",
            onChangeFuncs: [IsFreetextNoSpace],
          },
        ],
        [
          // {
          //   type: "RadioGroup",
          //   visible: true,
          //   radioLabel: { label: "Is Multi KYC Applicable?", labelVisible: true },
          //   radioList: [
          //     { value: "Yes", label: "Yes" },
          //     { value: "No", label: "No" },
          //   ],
          //   path: "IsMultiKYCApplicable",
          //   spacing: 3.5,
          //   required: true,
          //   sx: { pb: 3 },
          //   customOnChange: (e) => RemoveMultiKYC(e),
          // },
          //   {
          //     type: "Typography",
          //     label: "",
          //     visible: true,
          //     spacing: 2.5,
          //   },
          // {
          //   type: "Input",
          //   label: "Number of Insured",
          //   path: "NumberofInsured",
          //   visible: lDto.IsMultiKYCApplicable === "Yes",
          //   spacing: 2.5,
          //   customOnChange: (e) => OnADDMultiKYCDetailsnew(e),
          //   onChangeFuncs: [IsNumericGreaterThanone],
          //   required: lDto.IsMultiKYCApplicable === "Yes",
          // },
          // {
          //   type: "Button",
          //   label: "ADD",
          //   visible: lDto.IsMultiKYCApplicable === "Yes",
          //   component: "label",
          //   startIcon: <AddIcon />,
          //   onClick: OnADDMultiKYCDetails,
          //   justifyContent: "End",
          //   spacing: 6,
          // },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "",
          },
          ...spreadMultiKYCDetails()[0],
        ],
        ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        [
          { type: "Typography", label: "Care of (English)", visible: true, spacing: 12 },
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: `ProposerDetails.0.CareofNameEnglish`,
            onChangeFuncs: [IsAlphaNoSpace],
            name: "CareofNameEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "ProposerDetails.0.CareofPANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            // InputProps: { maxLength: 9 },
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            path: "ProposerDetails.0.CareofContactNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: `ProposerDetails.0.CareofAddressEnglish`,
            onChangeFuncs: [IsFreetextNoSpace],
            name: "CareofAddressEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          { type: "Typography", label: "Care of (Nepali)", visible: true, spacing: 12 },
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.0.CareofNameNepali",
            onChangeFuncs: [IsAlphaNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.0.CareofAddressNepali",
            onChangeFuncs: [IsFreetextNoSpace],
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Proprietor Name (English)",
            visible: true,
            onChangeFuncs: [IsAlphaNoSpace],
            path: `ProposerDetails.0.ProprietorNameEnglish`,
            name: "ProprietorNameEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          {
            type: "Input",
            label: "Proprietor Name (Nepali)",
            visible: true,
            path: "ProposerDetails.0.ProprietorNameNepali",
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Subject Matter",
            visible: true,
            path: "ProposerDetails.0.SubjectMatter",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Type",
            visible: true,
            path: "PolicyRiskType",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Category",
            visible: true,
            path: "PolicyRiskCategory",
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
          },
        ],
      ];
      break;

    case 2:
      data = [
        [
          {
            type: "Input",
            label: "Type of Insurance",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.ClientType",
            disableOnReset: true,
            required: true,
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible: false,
            radioLabel: { label: "Is Multi KYC Applicable?", labelVisible: true },
            radioList: [
              { value: "Family", label: "Yes" },
              { value: "Individual", label: "No" },
            ],
            path: "InsurableItem.0.RiskItems.0.NoOfPersons",
            spacing: 3.5,
            required: true,
            sx: { pb: 3 },
            // customOnChange: (e) => RemoveMultiKYC(e),
          },
          // {
          //   type: "Input",
          //   label: "No. of Persons",
          //   path: "NoofPersons",
          //   visible: true,
          //   spacing: 2.5,
          //   onChangeFuncs: [IsNumericGreaterThanZero],
          //   onBlurFuncs: [IsNumericGreaterThanZero],
          //   customOnChange: (e) => OnADDMultiKYCDetailsnew(e),
          //   disabled: lDto.IsIndividualOrFamily === "Individual",
          //   // onChangeFuncs: [IsNumericGreaterThanone],
          // },

          {
            type: "Input",
            label: "No. of Persons",
            path: "InsurableItem.0.RiskItems.0.NoOfPersons",
            visible: lDto.IsIndividualOrFamily !== "",
            required: true,
            validationId: 1,
            // disableOnReset: true,
            onChangeFuncs: [IsNumericGreaterThanZero, calculatePremium],
            disabled: lDto.IsIndividualOrFamily === "Individual",
            // customOnChange: (days1) => handlePolicyDates(days1),
            customOnChange: (e) => OnADDMultiKYCDetailsnew(e),
          },

          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "",
          },
          ...spreadTravelDetails()[0],
        ],
        ...spreadTravelDetails().filter((x, i) => i !== 0),
        // [
        //   {
        //     type: "Input",
        //     label: "Type of Insurance",
        //     visible: true,
        //     path: "InsurableItem.0.RiskItems.0.ClientType",
        //     disableOnReset: true,
        //     required: true,
        //     disabled: true,
        //   },
        //   // {
        //   //   type: "Button",
        //   //   label: "ADD Member",
        //   //   // visible: flag.ExistingDetails1,
        //   //   visible:
        //   //     lDto.IsIndividualOrFamily === "Family" &&
        //   //     Number(lDto.InsurableItem[0].RiskItems[0].NoOfPersons) !== 1,
        //   //   // startIcon: <AddIcon />,
        //   //   variant: "outlined",
        //   //   onClick: onAddTravellerDetails,
        //   //   disabled: masters.flags.AddMember,
        //   //   spacing: 12,
        //   // },
        //   {
        //     type: "Button",
        //     label: "ADD Member",
        //     // visible: flag.ExistingDetails1,
        //     visible: false,
        //     // visible: lDto.IsIndividualOrFamily === "Family" && Number(lDto.InsurableItem[0].RiskItems[0].NoOfPersons) !== 1,
        //     // startIcon: <AddIcon />,
        //     variant: "outlined",
        //     onClick: onAddTravellerDetails,
        //     disabled: masters.flags.AddMember,
        //     spacing: 12,
        //   },

        // ],
      ];

      break;
    case 3:
      data = [
        [
          // {
          //   type: "AutoComplete",
          //   label: "Issuing Branch",
          //   visible: true,
          //   required: true,
          //   path: "Channel.IssuingBranch",
          //   options: masters.BranchName,
          //   disabled: dto.proposalNo !== "" && dto.proposalNo !== undefined,
          //   disableOnReset: dto.proposalNo !== "" && dto.proposalNo !== undefined,
          //   customOnChange: (e, a) => handleIssuingBranch(e, a, "IssuingBranch"),
          // },
          {
            type: "AutoComplete",
            label: "Issuing Branch",
            visible: true,
            // options: masters.IssuingBranch,
            options: masters.IssuingBranch.filter((x) =>
              loginUserDetails.branchName.split(",").some((y) => y === x.mValue)
            ),
            path: "Channel.IssuingBranch",
            required: true,
            disabled: lDto.proposalNo !== "" && lDto.proposalNo !== undefined,
            disableOnReset: lDto.proposalNo !== "" && lDto.proposalNo !== undefined,
            // customOnChange: (e, a) => handleIssuingBranch(e, a, "IssuingBranch"),
          },

          {
            type: "Input",
            label: "Sub-Branch",
            visible: true,
            path: "Channel.SubBranch",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Fiscal Year",
            required: true,
            visible: true,
            path: "Channel.FiscalYear",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Field Officer Code",
            visible: true,
            path: "Channel.FieldOfficerCode",
            onChangeFuncs: [IsFreetextNoSpace],
            optionLabel: "fieldName",
            options: masters1.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Field Officer Name",
            visible: true,

            path: "Channel.FieldOfficer",
            onChangeFuncs: [IsAlphaNoSpace],

            optionLabel: "mValue",
            options: masters1.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldofficerName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Code",
            visible: true,
            optionLabel: "fieldName",
            options: masters1.SubFieldOfficer,
            path: "Channel.SubFieldOfficerCode",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficerCode"),
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Name",
            visible: true,
            path: "Channel.SubFieldOfficer",
            onChangeFuncs: [IsAlphaNoSpace],
            optionLabel: "mValue",
            options: masters1.SubFieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficerName"),
          },
          {
            type: "AutoComplete",
            label: "Agent Code",
            visible: true,
            path: "Channel.AgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
            optionLabel: "fieldName",
            options: masters1.Agent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentCode"),
          },
          {
            type: "AutoComplete",
            label: "Agent Name",
            visible: true,
            // required: true,
            path: "Channel.AgentName",
            onChangeFuncs: [IsAlphaNoSpace],
            optionLabel: "mValue",
            options: masters1.Agent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Code",
            visible: true,
            path: "Channel.SubAgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
            optionLabel: "fieldName",
            options: masters1.SubAgent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgentCode"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Name",
            visible: true,
            path: "Channel.SubAgentName",
            onChangeFuncs: [IsAlphaNoSpace],
            optionLabel: "mValue",
            options: masters1.SubAgent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgentName"),
          },
        ],
        //  Issuing Branch Details
        [
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            options: masters.Country,
            path: "RiskAddressDetails.Country",
            required: true,
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            options: lDto.RiskAddressDetails.Country !== "" ? masters.State : [],
            path: "RiskAddressDetails.ProvinceState",
            required: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State3"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: "RiskAddressDetails.District",
            required: true,
            options: lDto.RiskAddressDetails.ProvinceState !== "" ? masters.District3 : [],
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District3"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            path: "RiskAddressDetails.Municipality",
            options: lDto.RiskAddressDetails.District !== "" ? masters.Municipality3 : [],
            required: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality3"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "RiskAddressDetails.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English) ",
            visible: true,
            path: "RiskAddressDetails.AddressEnglish",
            name: "RiskAddressEnglish",
            required: true,
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address(Nepali) ",
            visible: true,
            path: "RiskAddressDetails.AddressNepali",
            disabled: true,
            // required: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "RiskAddressDetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            path: "RiskAddressDetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "House Number ",
            visible: true,
            path: "RiskAddressDetails.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "RiskAddressDetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
        ],
      ];
      break;

    case 4:
      data = [
        [
          {
            type: "Input",
            label: "Basic Premium",
            visible: true,
            path: "FormatedData.CalculatedPremiumDetails.BasicPremium",
            disabled: true,
          },
          {
            type: "Input",
            label: "13% VAT",
            visible: true,
            path: "FormatedData.CalculatedPremiumDetails.VAT",
            disabled: true,
          },
          {
            type: "Input",
            label: "Stamp Duty",
            visible: true,
            path: "FormatedData.CalculatedPremiumDetails.StampDuty",
            disabled: true,
          },
          // {
          //   type: "Input",
          //   label: "Total Amount",
          //   visible: true,
          //   path: "InsurableItem.0.RiskItems.0.CovidLoadingChargeusd",
          //   disabled: true,
          // },

          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },

          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },

          {
            type: "Custom",
            // required: true,
            visible: true,
            spacing: 6,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#eeeeee",
                  p: "15px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>Basic Premium</Typography>
                    <Typography>13% VAT</Typography>
                    <Typography>Stamp Duty</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.BasicPremium")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.VAT")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.StampDuty")}
                    </Typography>
                  </Grid>
                  <List
                    sx={{
                      width: "100%",
                      height: "1px",
                      bgcolor: "#9e9e9e",
                    }}
                  >
                    {/* <Divider sx={{ height: "1px" }} /> */}
                  </List>{" "}
                  <Grid item xs={8}>
                    <Typography>
                      <b>Total Premium to be paid by Customer</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      <b>रु</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {/* <b>{formater.format(lDto.PremiumDetails.FinalPremium)}</b> */}
                      <b>
                        {" "}
                        {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.FinalPremium")}
                      </b>
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            ),
          },
          // {
          //   type: "Typography",
          //   label: "",
          //   visible: true,
          //   spacing: 12,
          // },
          // {
          //   type: "Typography",
          //   label: "",
          //   visible: true,
          //   spacing: 3,
          // },
          {
            type: "Typography",
            visible:
              objectPath.get(lDto, "Channel.AgentCode") !== "" &&
              objectPath.get(lDto, "Channel.AgentCode") !== "0000",
            spacing: 3,
          },
          {
            type: "Typography",
            visible:
              objectPath.get(lDto, "Channel.AgentCode") !== "" &&
              objectPath.get(lDto, "Channel.AgentCode") !== "0000",
            spacing: 3,
          },
          {
            type: "Custom",
            // required: true,
            visible:
              objectPath.get(lDto, "Channel.AgentCode") !== "" &&
              objectPath.get(lDto, "Channel.AgentCode") !== "0000",
            spacing: 6,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#eeeeee",
                  p: "15px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>Commission Percentage</Typography>
                    <Typography>Commission Amount</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>%</Typography>
                    <Typography>रु</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.CommissionPercentage"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.CommissionAmount"
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            ),
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  p: "5px",
                  mt: "10px",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Typography>
                    <strong>Do you wish to share Debit Note via</strong>
                  </Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox onChange={onEmailClick} />}
                      label="E-mail"
                    />
                    <FormControlLabel control={<Checkbox disabled />} label="SMS" />
                  </FormGroup>
                </Stack>
              </MDBox>
            ),
          },

          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 1,
          },
          {
            type: "GroupButton",
            visible: true,
            spacing: 12,
            justifyContent: "center",
            buttons: [
              {
                visible: true,
                label:
                  genericInfo.Flow &&
                  (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                    ? "Save Details"
                    : "Save Debit Note",
                color: "error",
                onClick:
                  genericInfo.Flow &&
                  (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                    ? onSaveModalClose
                    : handlesavedebitnote,
              },
              {
                color: "info",
                visible: true,
                label: "Preview Debit Note",
                // endIcon: "visibility",
                onClick: onDebitNoteClick,
              },
              {
                visible: true,
                label: "Send For Approval",
                color: "error",
                onClick: () => handleSavepolicyWFStatus(),
              },
            ],
          },
          {
            type: "Modal",
            visible: true,
            sx: {
              width: 380,
              height: 380,
              top: "15%",
              bottom: "10%",
              left: "45%",
              // justifyContent: "center",
              // right: "30%",
            },
            open: modalOpen,
            return: (
              <Grid sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={handleModalClose} />
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={2}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    Debit Note Sent For Approval
                  </Typography>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    {dto.proposalNo}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={3}>
                  <MDBox sx={{ display: "flex", justifyContent: "center", mt: "-13px" }}>
                    <MDButton onClick={onModalclose}>Close</MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: true,
            sx: {
              width: 400,
              height: 400,
              top: "15%",
              bottom: "10%",
              left: "45%",
              // justifyContent: "center",
              // right: "30%",
            },
            open: savemodalopen,
            return: (
              <Grid sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={SavehandleModalClose} />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={2}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    Do You Wish To Preview And Save The Debit Note
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingBottom={1}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton onClick={(e) => onDebitNoteClick(e, "SAVE DEBIT NOTE")}>
                      SAVE DEBIT NOTE
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
        ],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <PaymentPage
                prod="Nepal"
                DebitNoteApprovalStatus="true"
                PolicyDto={lDto}
                genericInfo={genericInfo}
                PaymentMode={[
                  { label: "Online", value: "Online" },
                  { label: "Offline", value: "Offline" },
                ]}
                OfflinePT={{
                  amount: objectPath.get(
                    lDto,
                    "FormatedData.CalculatedPremiumDetails.FinalPremium"
                  ),
                  data: [
                    {
                      label: "Cash",
                      value: "Cash",
                    },
                    {
                      label: "Cheque",
                      value: "Cheque",
                    },
                  ],
                }}
                OnlinePT={[
                  { label: "Nepal Clearing House", path: "NepalClearingHouse" },
                  { label: "e-Seva", value: "e-Seva" },
                ]}
              />
            ),
          },
        ],
      ];
      break;

    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep, dto, setBackDropFlag, setDto }) => {
  let fun = false;
  const lDto = dto;

  // const handleProposal = async () => {
  //   if (lDto.ProposalNo === undefined) {
  //     await SaveCreateProposal(lDto).then(async (x) => {
  //       if (x.data.proposalNumber) {
  //         const res = await GetProposalByNumber(x.data.proposalNumber);
  //         lDto.KYCNo = res.data[0].policyDetails.KYCNo;
  //         setDto({ ...lDto, ProposalNo: x.data.proposalNumber });
  //         fun = true;
  //       } else {
  //         setBackDropFlag(false);
  //         swal.fire({
  //           icon: "error",
  //           text: "Incurred an error please try again later",
  //           confirmButtonColor: "#0079CE",
  //         });
  //       }
  //       return fun;
  //     });
  //   }
  //   if (lDto.ProposalNo !== "" && lDto.ProposalNo !== undefined) {
  //     fun = await UpdateProposalDetails(lDto).then(async (x) => {
  //       if (x.responseMessage === "Updated successfully") {
  //         const res = await GetProposalByNumber(x.data.proposalNumber);

  //         lDto.KYCNo = res.data[0].policyDetails.KYCNo;
  //         setDto({ ...lDto });
  //         setBackDropFlag(false);
  //       }
  //       return true;
  //     });
  //   }
  //   setDto({ ...lDto });
  //   return fun;
  // };
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (lDto !== null) {
    switch (activeStep) {
      case 0:
        lDto.InsurableItem[0].RiskItems[0].ClientType = lDto.IsIndividualOrFamily;
        setDto({ ...lDto });
        fun = await GenericApi("NepalPersonalDomiciliary", "NepalPersonalDomRatingAPI", lDto).then(
          async (x) => {
            if (x.finalResult) {
              lDto.PremiumDetails = x.finalResult;
              lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              const res1 = await SaveQuotation(lDto);
              lDto["Quotation No"] = res1.data.quotation.quoteNo;
              lDto.ProposerDetails = [lDto.ProposerDetails];
              setDto({ ...lDto });
              setBackDropFlag(false);
              const fun1 = await swal
                .fire({
                  title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                  html: `<div style="display: flex; flex-direction: row;">
                  <div style="flex: 3; text-align: left; margin-left: 0rem;">
                    <div>Basic Premium</div>
                    <div>13% VAT</div>
                    <div>Stamp Duty</div>
                    <div><b>Total Premium</b></div>
                  </div>
                  <div style="flex: 1.7; text-align: right; font-size: 16.3px; margin-right: 1rem;">
                    <div>रु</div>
                    <div>रु</div>
                    <div>रु</div>
                    <div><b>रु</b></div>
                  </div>
                  <div style="flex: 1.3; text-align: right; margin-right: 0rem;">
                    <div>${formater.format(x.finalResult.BasicPremium)}</div>
                    <div>${formater.format(x.finalResult.VAT)}</div>
                    <div>${formater.format(x.finalResult.StampDuty)}</div>
                    <div><b>${formater.format(x.finalResult.FinalPremium)}</b></div>
                  </div>
                </div>
                `,
                  showConfirmButton: true,
                  width: 600,
                  confirmButtonText: "Proceed",
                  confirmButtonColor: "#0079CE",
                  // showCa600ncelButton: true,
                  // cancelButtonColor: "#ef5350",
                  showCloseButton: true,
                  allowOutsideClick: false,
                })
                .then((resX) => {
                  if (resX.isConfirmed) return true;
                  return false;
                });
              return fun1;
            }
            setBackDropFlag(false);
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
            return false;
          }
        );
        break;

      case 1:
        fun = true;
        break;
      case 2:
        fun = await GenericApi("NepalPersonalDomiciliary", "NepalPersonalDomRatingAPI", lDto).then(
          async (x) => {
            if (x.finalResult) {
              lDto.PremiumDetails = x.finalResult;
              lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              await QuotationUpdate(lDto);
              lDto.ProposerDetails = [lDto.ProposerDetails];
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.BasicPremium",
                formater.format(x.finalResult.BasicPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.VAT",
                formater.format(x.finalResult.VAT)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.StampDuty",
                formater.format(x.finalResult.StampDuty)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.FinalPremium",
                formater.format(x.finalResult.FinalPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.CommissionAmount",
                formater.format(x.finalResult.CommissionAmount)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
                x.finalResult.CommissionPercentage
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.SumInsured",
                formater.format(lDto.InsurableItem[0].RiskItems[0].SumInsured)
              );

              setDto({ ...lDto });
              return true;
            }
            setBackDropFlag(false);
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
            return false;
          }
        );
        break;
      case 3:
        if (lDto.proposalNo === undefined) {
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          fun = await SaveCreateProposal(lDto).then(async (x) => {
            lDto.ProposerDetails = [lDto.ProposerDetails];
            if (x.data.proposalNumber) {
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              await GetProductByCode("NepalPersonalDomiciliary").then(async (x2) => {
                const res = await GetProposalByNumber(x.data.proposalNumber, x2.data.productId);
                lDto.KYCNo = res.data[0].policyDetails.KYCNo;
                lDto.ProposerDetails = [lDto.ProposerDetails];
                setDto({ ...lDto, proposalNo: x.data.proposalNumber });
                fun = true;
              });
            } else {
              setBackDropFlag(false);
              swal.fire({
                icon: "error",
                text: "Incurred an error please try again later",
                confirmButtonColor: "#0079CE",
              });
            }
            return fun;
          });
        } else if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          const x = await UpdateProposalDetails(lDto);
          lDto.ProposerDetails = [lDto.ProposerDetails];
          if (x.data.responseMessage === "Updated successfully") {
            lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
            await GetProductByCode("NepalPersonalDomiciliary").then(async (x2) => {
              const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);
              lDto.KYCNo = res.data[0].policyDetails.KYCNo;
              lDto.ProposerDetails = [lDto.ProposerDetails];
              lDto.proposalNo = x.data.data.proposalNo;
              setDto({ ...lDto });
              fun = true;
            });
          }
        }
        break;
      case 4:
        setBackDropFlag(false);
        fun = swal
          .fire({
            input: "checkbox",
            confirmButtonColor: "#0079CE",

            showCloseButton: true,
            allowOutsideClick: false,
            // cancelButtonColor: "#ef5350",
            html: `<div> <img src=${Success} alt="success"></div>`,
            inputPlaceholder: `<b style=font-size:20px;margin-left:5px;>Proceed to Payment Without Approval</b>`,
            inputAttributes: {
              id: "checkbox",
              style: "transform:scale(1.8);",
            },
          })
          .then((result) => {
            if (result.isConfirmed) {
              if (result.value) return true;
            }
            return false;
          });

        break;
      case 5:
        fun = true;

        break;

      default:
        fun = true;
        break;
    }
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};

  const NoOfPerson = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.InsurableItem[0].RiskItems[0].NoOfPersons = "1";
    setDto(dispatch, { ...lDto });
  };

  const onReset1 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.ProposerDetails[0].documentDetails = [{ ...docDetails() }];
    // lDto.Temp.Upload = lDto.InsurableItem[0].RiskItems[0]["Number of Fish"];
    setDto(dispatch, { ...lDto });
  };

  const calcnoofPersons = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.InsurableItem[0].RiskItems = [{ ...RemoveMember() }];
    setDto(dispatch, { ...lDto });
  };

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true, onClick: NoOfPerson },
        next: { label: "Calculate Total Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: {
          label: "Reset",
          visible: true,
          onClick: onReset1,
        },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: calcnoofPersons },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;

    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false, loader: "backDrop" },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async ({ dto, setDto, additionalInformation }) => {
  const lDto = dto;
  const masters = {
    Salutation: [],
    Gender: [],
    State: [],
    District: [],
    Municipality: [],
    BranchDetailsComponets: [],
    ClientType: [],
    SubClass: [],
    Plan: [],
    Geography: [],
    DirectDiscount: [],
    placeMasters: [{ district: [], municipality: [] }],
    IssuingBranch: [],
    BankDetails: [],
    BankorFinancialInstituionNameinEnglish: [],
    BranchMasters: [],
    FieldOfficer: [],
    SubFieldOfficerCode: [],
    AgentCode: [],
    SubAgentCode: [],
    AddMember: 1,
    flags: {
      AddMember: false,
    },
  };

  const userDetails = additionalInformation?.loginUserDetails;
  if (userDetails && userDetails?.displayName) {
    lDto.AgentName = userDetails?.displayName;
    lDto.AgentMobileNo = userDetails?.contactNumber;
    // lDto.PaymentAmount = lDto.FinalPremium;
    setDto({ ...lDto });
  }

  await GetNPCommonMaster().then((r) => {
    r.forEach((x) => {
      masters[x.mType] = x.mdata;
    });
    masters.SubClass = masters.SubClass.filter((x) => x.fieldName === "DomicillaryHospitalization");
  });
  await GetProdPartnermasterData("State", {}).then((r) => {
    masters.State = r.data;
  });

  if (
    localStorage.getItem("NepalCompanySelect") !== null ||
    process.env.REACT_APP_EnvId !== "297"
  ) {
    let Company = "";
    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Company = "NMIC";
    }
    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      Company = "PMIC";
    }
    await GetProdPartnermasterData("BranchName", {
      Description: Company,
    }).then((res) => {
      masters.IssuingBranch = res.data;
      lDto.ICShortName = res.data[0].Description;
    });
  }
  setDto({ ...lDto });

  return masters;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
