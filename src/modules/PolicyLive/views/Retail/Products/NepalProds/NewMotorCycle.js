import { useState, useEffect } from "react";
// import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Grid, Stack, Typography, Card, Checkbox } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
// import objectPath from "object-path";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  IsNumeric,
  arrayRange,
  addDays,
  // IsAlphaNum,
  IsAlphaSpace,
  IsEmail,
  IsNumaricSpecial,
  IsAlphaNumSpace,
  AgeCalculator,
} from "Common/Validations";
import swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Success from "assets/images/Nepal/Success.png";
import { GetTemplatePayload } from "../../Payment/Apis";
import { useDataController } from "../../../../../BrokerPortal/context";
// import policyDto from "./data/Json/MotorCycleJson";
import PaymentPage from "../../Payment";
import {
  GetNPCommonMaster,
  GenericApi,
  Transliteration,
  DocumenUpload,
  DeleteDocument,
  SaveQuotation,
  SaveCreateProposal,
  GetProdPartnermasterData,
  QuotationUpdate,
  SavepolicyWFStatus,
  UpdateWorkflowStatus,
  SendNotification,
  // DeduplicationByDistrictRefNo,
  // CreateCustomer,
} from "./data/APIs/MotorCycleApi";
import motoJson from "./data/Json/motoJson";

// import { set } from "lodash";

// let topMasters = {};
let tArr11 = [];
const mstObj = {
  DocType: [],
  Department: [],
  Class1: [],
  PremiumType: [],
  Period: [],
  BusinessType: [],
  Government: [],
  Category: [],
  Excess: [],
  DirectDiscount: [],
  BankNonBank: [],
  PaymentType: [],
  PaymentMode: [],
  OfflinePayment: [],
  TypeofCover: [],
  TypeofCoverFilter: [],
  YearofManufacture: [],
  BankCategory: [],
  Country: [],
  State1: [],
  District1: [],
  Municipality1: [],
  State2: [],
  District2: [],
  Municipality2: [],
  State3: [],
  District3: [],
  Municipality3: [],
  State4: [],
  District4: [],
  Municipality4: [],
  WardNumber: [],
  KYCCategory: [],
  InsuredType: [],
  KYCRiskCategory: [],
  Occupation: [],
  IncomeSource: [],
  Gender: [],
  MaritalStatus: [],
  // IssueDistrict: [],
  MemberType: [],
  Status: [],
  // CitizenshipIssueDistrict: [],
  District: [],
  // BranchName: [],
  IssuingBranch: [],
  PlaceSelect: [
    {
      State: [],
      District: [],
      Municipality: [],
    },
  ],
};

const getPolicyDto = () => {
  // const obj = lazy(() => import("./data/Json/MotorCycleJson"));
  // const obj = await fetch(
  //   "http://localhost:3000/modules/PolicyLive/views/Retail/Products/NepalProds/data/Json/motoJson.json"
  // );
  // const obj = axios.get(
  //   "/modules/PolicyLive/views/Retail/Products/NepalProds/data/Json/motoJson.json"
  // );
  // D:\API_LIVE\APIsLive-UI\src\modules\PolicyLive\views\Retail\Products\NepalProds\data\Json\motoJson.json
  // const obj1 = obj.json();
  // const obj1 = import("./data/Json/MotorCycleJson");
  const dto = motoJson();
  console.log("123123", dto);

  return dto;
};

const getProcessSteps = () => {
  const steps = [
    "Quote Details",
    "Customer Details",
    "Vehicle Details",
    "Risk Details",
    "Premium Summary",
    "Payment",
  ];
  return steps;
};

const getPageContent = ({ activeStep, dto }) => {
  const lDto = dto;
  const [flag, setFlag] = useState({
    ProposerDetails: false,
    InsuredDetails: false,
    IndividualInformation: false,
    CareOfDetails: false,
    OtherDetails: false,
    BankFinancial: false,
    BranchDetails: false,
    MemberDetail: false,
  });
  const [noOfBranchDetailsAccordians, setNoOfBranchDetailsAccordians] = useState([]);

  useEffect(() => {
    if (lDto) {
      const tArr1 = [];
      const tArr2 = arrayRange(1, parseInt(lDto.CountOfBranchDetails, 10) - 1, 1);
      tArr2.forEach((x, i) => {
        tArr1.push({ name: `Branch Details ${i + 2}`, visible: true });
      });
      // console.log("tArr1", tArr1);
      setNoOfBranchDetailsAccordians([...tArr1]);
    }
  }, [lDto.CountOfBranchDetails]);

  useEffect(() => {
    if (lDto.InsurableItem[0].RiskItems[0].FinancingType === "Direct") {
      flag.BankFinancial = false;
      flag.BranchDetails = false;
      flag.CareOfDetails = true;

      flag.InsuredDetails = true;
      flag.OtherDetails = true;
      flag.ProposerDetails = true;
    }
    if (lDto.InsurableItem[0].RiskItems[0].FinancingType === "Bank/Financial Institution") {
      flag.BankFinancial = true;
      flag.BranchDetails = true;
      flag.CareOfDetails = true;

      flag.InsuredDetails = true;
      flag.OtherDetails = true;
      flag.ProposerDetails = true;
    }

    const IST = lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.InsuredType;

    if (IST !== undefined && IST !== "") {
      if (
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.InsuredType === "Individual"
      ) {
        flag.MemberDetail = false;
        flag.IndividualInformation = true;
      } else {
        flag.MemberDetail = true;
        flag.IndividualInformation = false;
      }
    }

    setFlag({ ...flag });
  }, [lDto]);

  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [{ name: "Policy Details", visible: true }];
      break;
    case 1:
      steps = [
        { name: "Customer Details", visible: true },
        { name: "Bank/Financial Institution Details", visible: flag.BankFinancial },
        { name: "Branch Details 1", visible: flag.BranchDetails },
        ...noOfBranchDetailsAccordians,
        { name: "Proposer Details", visible: flag.ProposerDetails },
        { name: "Insured Details", visible: flag.InsuredDetails },
        { name: "Individual Information", visible: flag.IndividualInformation },
        {
          name: lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.InsuredType,

          visible: flag.MemberDetail,
        },
        { name: "Care Of Details", visible: flag.CareOfDetails },
        { name: "Other Details", visible: flag.OtherDetails },
      ];
      break;
    case 2:
      steps = [{ name: "Vehicle Details", visible: true }];
      break;
    case 3:
      steps = [
        { name: "Issuing Branch Details", visible: true },
        { name: "Risk Details", visible: true },
      ];
      break;
    case 4:
      steps = [{ name: "Premium Break-up", visible: true }];
      break;
    case 5:
      steps = [{ name: "Payment Page", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// const { MaritalStatus } = MasterData().basicdetails.Masters;

const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters }) => {
  const masters1 = masters;
  const lDto = dto;
  // const [paymentPage, setPaymentPage] = useState([...PaymentPage]);

  const [CPremium, setCPremium] = useState({
    GrossPremium: "",
    VAT: "",
    StampDuty: "",
    TotalPremium: "",
  });
  const [control] = useDataController();
  const { genericInfo, loginUserDetails } = control;

  const [flag, setFlag] = useState({
    // Department: true,
    // Period: false,
    // NumberOfDays: true,
    CancleIcon: false,
    Pan: false,
    DocType: false,
    DirectFromShowRoom: true,
    ExistingDetails: false,
    ExistingDetails1: false,
    DocDublication: false,
    Individual: false,
  });
  const [docCountList, setDocCountList] = useState([
    {
      DocumentName: "",
      DocumentFileName: "",
    },
  ]);
  const onAddDocument = () => {
    const obj = {
      DocumentName: "",
      DocumentFileName: "",
    };
    docCountList.push(obj);
    setDocCountList([...docCountList]);
    lDto.InsurableItem[0].RiskItems[0].KYCDetails.DocumentList = docCountList;
    setDto({ ...lDto });
  };
  const handleDocName = (e, index) => {
    if (e.target.name === "DocumentName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value || e.target.value === "")) {
        docCountList[index][e.target.name] = e.target.value;
        setDocCountList([...docCountList]);
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.DocumentList = docCountList;
        setDto({ ...lDto });
      }
    }
  };
  const handleDublicateDoc = (e, DocumentName, index) => {
    const arr = lDto.InsurableItem[0].RiskItems[0].KYCDetails.DocumentList;
    console.log(arr);
    arr.forEach((x, i) => {
      if (x.DocumentName === DocumentName && i !== index) {
        docCountList[index][e.target.name] = "";
        setDocCountList([...docCountList]);
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.DocumentList = docCountList;
        setDto({ ...lDto });
        swal.fire({
          icon: "error",
          text: `"${DocumentName}" Already Exist`,
        });
      }
    });
  };

  const onDocUplode = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        docCountList[index].DocumentFileName = result.data[0].fileName;
        setDocCountList([...docCountList]);
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.DocumentList = docCountList;
        setDto({ ...lDto });
      }
    });
  };

  const handleFileUpload = async (event, index) => {
    await onDocUplode(event.target.files[0], index);
  };

  const handleDocFileDelete = async (e, index) => {
    const file = lDto.InsurableItem[0].RiskItems[0].KYCDetails.DocumentList;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        docCountList[index].DocumentFileName = "";
        setDocCountList([...docCountList]);
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.DocumentList = docCountList;
        setDto({ ...lDto });
      }
    });
  };
  const handleDocDelete = (index) => {
    const deletedarray = docCountList.filter((x, i) => i !== index);
    setDocCountList([...deletedarray]);
    lDto.InsurableItem[0].RiskItems[0].KYCDetails.DocumentList = deletedarray;
    setDto({ ...lDto });
  };

  const onUploadPic = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData);

    lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.ProfilePicture = file.name;
    setDto({ ...lDto });

    setFlag({ ...flag, CancleIcon: true });
  };
  const onCancelClick = async () => {
    const file = lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.ProfilePicture;

    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.ProfilePicture = "";
        setDto({ ...lDto });

        setFlag({ ...flag, CancleIcon: false });
      }
    });
  };

  const onBlurTransliteration = async (e, index) => {
    // production
    if (process.env.NODE_ENV === "production") {
      const iText = e.target.value;
      const varName = e.target.name;
      const obj = {
        textList: [{ Text: iText }],
      };
      const res = await Transliteration(obj);
      const oText = res[0].text;

      if (varName === "InsuredNameEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.InsuredNameNepali = oText;

      if (varName === "HusbandNameEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.HusbandNameNepali = oText;

      if (varName === "WifeNameEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.WifeNameNepali = oText;

      if (varName === "ResidenceEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.ResidenceNepali = oText;

      if (varName === "TempAddresEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.TempAddresNepali = oText;

      if (varName === "CityEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.CityNepali = oText;

      if (varName === "TownEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.TownNepali = oText;

      if (varName === "AddressEnglish3")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.AddressNepali = oText;

      if (varName === "AddressEnglish4")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.PermanentAddressNepali = oText;

      if (varName === "GrandfatherNameEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.GrandfatherNameNepali = oText;

      if (varName === "FatherNameEnglish1")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.FatherNameNepali = oText;

      if (varName === "MemberNameEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.MemberNameNepali =
          oText;

      if (varName === "DesignationEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.DesignationNepali =
          oText;

      if (varName === "HusbandNameEnglish1")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.HusbandNameNepali =
          oText;

      if (varName === "WifeNameEnglish1")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.WifeNameNepali =
          oText;

      if (varName === "FatherNameEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.FatherNameNepali =
          oText;

      if (varName === "GrandfatherNameEnglish1")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.GrandfatherNameNepali =
          oText;

      if (varName === "PermanentAddressEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.PermanentAddressNepali =
          oText;

      if (varName === "TownEnglish1")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.TownNepali =
          oText;

      if (varName === "CityEnglish1")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.CityNepali =
          oText;

      if (varName === "TempAddresEnglish1")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.TempAddresNepali =
          oText;

      if (varName === "BankorFinancialInstituionNameinEnglish")
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BankorFinancialInstituionNameinNepali =
          oText;

      if (varName === "AddressEnglishBank")
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.AddressNepali = oText;

      if (varName === "AddressEnglish1")
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].AddressNepali = oText;

      if (varName === "VehicleNoEnglish")
        lDto.InsurableItem[1].RiskItems[0].VehicleNoNepali = oText;
      if (varName === "AddressEnglish0") lDto.AddressNepali = oText;
      if (varName === "TemporaryAddressEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.TemporaryAddressNepali = oText;

      if (varName === "AddressEnglish2")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.AddressNepali = oText;
      if (varName === "CareofNameEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.CareofNameNepali = oText;

      if (varName === "CareofAddressEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.CareofAddressNepali = oText;

      if (varName === "ProprietorNameEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.ProprietorNameNepali = oText;

      if (varName === "GenderEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.GenderNepali = oText;

      if (varName === "GenderEnglish1")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.GenderNepali =
          oText;

      if (varName === "MaritalStatusEnglish")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MaritalStatusNepali = oText;

      if (varName === "MaritalStatusEnglish1")
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.MaritalStatusNepali =
          oText;

      setDto({ ...lDto });
    }
  };

  const onNumberOfDays = (val) => {
    const periodVal = lDto.Period;
    let periodNum = 0;
    masters.Period.forEach((x) => {
      if (x.mValue === periodVal) periodNum = x.description;
    });

    if (IsNumeric(val) === true) {
      if (parseInt(val, 10) <= 0) return `invalid days`;
      if (val > periodNum) return `Days should be less then ${periodNum}`;
    } else return IsNumeric(val);

    return true;
  };

  const onPlaceSelect = async (e, a, n, index) => {
    if (n === "State1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.ProvinceorState = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.District = "";
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.Municipality = "";
        masters1.District1 = res.data;
        masters1.Municipality1 = [];
      } else {
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.ProvinceorState = "";
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.District = "";
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.Municipality = "";
      }
    }
    if (n === "District1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.District = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.Municipality = "";
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.WardNumber = "";

        masters1.Municipality1 = res.data;
      } else {
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.District = "";
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.Municipality = "";
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.WardNumber = "";
        masters1.Municipality1 = [];
      }
    }

    if (n === "State2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].ProvinceState =
          a.mValue;

        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].District = "";

        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].Municipality = "";

        masters1.PlaceSelect[index].District = res.data;
        if (tArr11 && index !== 0) {
          tArr11[index - 1][3].options = res.data;
        }
        masters1.PlaceSelect[index].Municipality = [];
      } else {
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].ProvinceState = "";

        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].District = "";

        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].Municipality = "";

        masters1.PlaceSelect[index].District = [];
        if (tArr11 && index !== 0) {
          tArr11[index - 1][3].options = [];
        }
        masters1.PlaceSelect[index].Municipality = [];
      }
    }
    if (n === "District2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].District = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].Municipality = "";

        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].WardNumber = "";

        masters1.PlaceSelect[index].Municipality = res.data;
        if (tArr11 && index !== 0) {
          tArr11[index - 1][4].options = res.data;
        }
      } else {
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].District = "";
        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].Municipality = "";

        lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[index].WardNumber = "";

        masters1.PlaceSelect[index].Municipality = [];
        if (tArr11 && index !== 0) {
          tArr11[index - 1][4].options = [];
        }
      }
    }
    if (n === "State3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.ProvinceState = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.District = "";

        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.Municipality = "";
        masters1.District3 = res.data;
        masters1.Municipality3 = [];
      } else {
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.ProvinceState = "";

        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.District = "";
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.Municipality = "";

        masters1.District3 = [];
        masters1.Municipality3 = [];
      }
    }
    if (n === "District3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.District = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.Municipality = "";
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.WardNumber = "";
        masters1.Municipality3 = res.data;
      } else {
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.District = "";

        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.Municipality = "";

        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.WardNumber = "";
        masters1.Municipality3 = [];
      }
    }
    if (n === "State4") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.ProvinceState = a.mValue;
        lDto.District = "";
        lDto.Municipality = "";
        masters1.District4 = res.data;
        masters1.Municipality4 = [];
      } else {
        lDto.ProvinceState = "";
        lDto.District = "";
        lDto.Municipality = "";
        masters1.District4 = [];
        masters1.Municipality4 = [];
      }
    }
    if (n === "District4") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.District = a.mValue;
        lDto.Municipality = "";
        lDto.WardNumber = "";
        masters1.Municipality4 = res.data;
      } else {
        lDto.District = "";
        lDto.Municipality = "";
        lDto.WardNumber = "";
        masters1.Municipality4 = [];
      }
    }
    tArr11 = [...tArr11];
    setMasters({ ...masters1 });
    setDto({ ...lDto });
  };
  // console.log("tArr11", tArr11);

  const BranchJson = {
    Bank: "",
    BranchManager: "",
    Email: "",
    Country: "Nepal",
    ProvinceState: "",
    District: "",
    Municipality: "",
    WardNumber: "",
    AddressEnglish: "",
    AddressNepali: "",
    Area: "",
    ToleStreetName: "",
    HouseNumber: "",
    PlotNumber: "",
    ContactPerson1: "",
    ContactPerson2: "",
    ContactPerson3: "",
    PhoneNumber: "",
    MobileNumber: "",
    FaxNumber: "",
  };
  const [id, setInd] = useState(0);

  const AddBranchDetails = (event, ind) => {
    lDto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails[ind + 1] = BranchJson;
    setFlag({ ...flag });
    // setObj2([...obj2, ...obj1]);
    setInd(id + 1);

    lDto.CountOfBranchDetails = (parseInt(lDto.CountOfBranchDetails, 10) + 1).toString();

    const obj = {
      State: [],
      District: [],
      Municipality: [],
    };
    masters.PlaceSelect.push(obj);
    const tArr2 = arrayRange(1, parseInt(lDto.CountOfBranchDetails - 1, 10), 1);
    tArr11 = [];
    tArr2.forEach((x, i) => {
      tArr11.push([
        {
          type: "Input",
          label: "Branch Name",
          required: true,
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.Bank`,
          onChangeFuncs: [IsAlphaSpace],
          index: ind,
        },
        {
          type: "AutoComplete",
          label: "Country",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.Country`,
          // options: masters.Country,
          // customOnChange: (e, a) => onPlaceSelect(e, a, "Country2", i + 1),
          // index: ind,
          disabled: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          required: true,
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.ProvinceState`,
          options: masters.State,
          customOnChange: (e, a) => onPlaceSelect(e, a, "State2", i + 1),
          index: ind,
        },
        {
          type: "AutoComplete",
          label: "District",
          required: true,
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.District`,
          options: masters.PlaceSelect[i + 1].District,
          customOnChange: (e, a) => onPlaceSelect(e, a, "District2", i + 1),
          index: ind,
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.Municipality`,
          options: masters.PlaceSelect[i + 1].Municipality,
          index: ind,
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.WardNumber`,
          options: masters.WardNumber,
          index: ind,
        },
        {
          type: "Input",
          label: "Address(English)",
          visible: true,
          required: true,
          name: "AddressEnglish1",
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.AddressEnglish`,
          customOnBlur: (e) => onBlurTransliteration(e, i + 1),
          index: ind,
        },
        {
          type: "Input",
          label: "Address(Nepali)",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.AddressNepali`,
          disabled: true,
          index: ind,
        },
        {
          type: "Input",
          label: "Area",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.Area`,
          onChangeFuncs: [IsAlphaSpace],
          index: ind,
        },
        {
          type: "Input",
          label: "Tole/StreetName",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumSpace],
          index: ind,
        },
        {
          type: "Input",
          label: "House Number",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${ind}.HouseNumber`,
          // onChangeFuncs: [IsNumeric],
          index: ind,
        },
        {
          type: "Input",
          label: "Plot Number",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.PlotNumber`,
          onChangeFuncs: [IsNumeric],
          index: ind,
        },
        {
          type: "Input",
          label: "Contact person1",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.ContactPerson1`,
          onChangeFuncs: [IsAlphaSpace],
          index: ind,
        },
        {
          type: "Input",
          label: "Contact person2",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.ContactPerson2`,
          onChangeFuncs: [IsAlphaSpace],
          index: ind,
        },
        {
          type: "Input",
          label: "Contact person3",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${ind}.ContactPerson3`,
          onChangeFuncs: [IsAlphaSpace],
          index: ind,
        },
        {
          type: "Input",
          label: "Phone Number",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.PhoneNumber`,
          onChangeFuncs: [IsNumaricSpecial],
          index: ind,
        },
        {
          type: "Input",
          label: "Mobile Number",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.MobileNumber`,
          onChangeFuncs: [IsNumaricSpecial],
          index: ind,
        },
        {
          type: "Input",
          label: "Fax Number",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.FaxNumber`,
          onChangeFuncs: [IsNumaricSpecial],
          index: ind,
        },
        {
          type: "Input",
          label: "Branch Manager",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.BranchManager`,
          onChangeFuncs: [IsAlphaSpace],
          index: ind,
        },
        {
          type: "Input",
          label: "Email ID",
          visible: true,
          path: `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.${i + 1}.Email`,
          // onChangeFuncs: [IsEmail],
          onBlurFuncs: [IsEmail],
          index: ind,
        },
      ]);
    });

    // console.log("tArr11", tArr11);
    // console.log("masters.PlaceSelect", masters.PlaceSelect);
    setDto({ ...lDto });
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
  const onTypeofCover = (e, a) => {
    lDto.InsurableItem[1].RiskItems[0].TypeofCover = a.fieldName;
    lDto.InsurableItem[1].RiskItems[0].TypeofCoverLabel = a.mValue;
    setDto({ ...lDto });
  };
  const handleSavepolicyWFStatus = async () => {
    const ProposalNo = lDto.FormatedData.ProposalNumber;

    // if (genericInfo.ProposalNo !== "" || genericInfo.ProposalNo !== undefined) {
    if (genericInfo.Flow && genericInfo.Flow === "DisApproveFlow") {
      const obj = {
        Stage: "Proposal",
        Status: "307",
        WorkFlowType: "Agent",
        wfstageStatusId: "315",
      };
      await SavepolicyWFStatus(genericInfo.ProposalNo, obj);
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
      await SavepolicyWFStatus(genericInfo.ProposalNo, a);
    } else {
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SavepolicyWFStatus(ProposalNo, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SavepolicyWFStatus(ProposalNo, a);
    }
    handleModalOpen();
    // }
  };

  const handlesavedebitnote = () => {
    SavehandleModalOpen();
  };
  const OnClassSelect = (e, a) => {
    lDto.Class = a.mValue;
    masters1.TypeofCoverFilter = masters.TypeofCover.filter((x) => x.description === a.mValue);

    if (a.mValue === "MotorCycle") {
      lDto.InsurableItem[1].RiskItems[0].DirectDiscount = "";
      lDto.InsurableItem[1].RiskItems[0].CompulsoryExcess = "500";
      lDto.InsurableItem[1].RiskItems[0].VehicleCost = "";
      lDto.InsurableItem[1].RiskItems[0].TotalSumInsured = "";
    }
    if (a.mValue === "ThirdPartyMotorcycle") {
      lDto.InsurableItem[1].RiskItems[0].CompulsoryExcess = "0";
      lDto.InsurableItem[1].RiskItems[0].DirectDiscount = "No";
      lDto.InsurableItem[1].RiskItems[0].VehicleCost = "0";
      lDto.InsurableItem[1].RiskItems[0].TotalSumInsured = "0";
    }
    lDto.BusinessType = "New Business";
    lDto.PremiumType = "";
    lDto.InsurableItem[1].RiskItems[0].Category = "";
    lDto.InsurableItem[1].RiskItems[0].TypeofCoverLabel = "";
    lDto.InsurableItem[1].RiskItems[0].GovernmentNonGovernment = "";
    lDto.InsurableItem[1].RiskItems[0].Excess = "";
    lDto.InsurableItem[1].RiskItems[0].AgeofVehicle = "";
    lDto.InsurableItem[1].RiskItems[0].CCKW = "";
    lDto.InsurableItem[1].RiskItems[0].YearofManufacture = "";
    lDto.PolicyStartDate = "";
    lDto.PolicyEndDate = "";
    lDto.NumberofDays = "";
    lDto.Period = "";
    setDto({ ...lDto });
    setMasters({ ...masters1 });
  };
  const [resetCount, setResetCount] = useState(0);
  const Navigate = useNavigate();
  const onModalclose = () => {
    Navigate("/retail/home");
  };
  const onSaveModalClose = async () => {
    if (genericInfo.ProposalNo !== undefined) {
      await SaveCreateProposal(lDto).then(async (x) => {
        lDto.ProposalNo = x.data.proposalNumber;
        setDto({ ...lDto });
        swal.fire({
          icon: "success",
          text: "Details Saved Successfully",
        });
      });
    } else {
      const ProposalNo = lDto.FormatedData.ProposalNumber;
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SavepolicyWFStatus(ProposalNo, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "322",
      };
      await SavepolicyWFStatus(ProposalNo, a);

      SavehandleModalClose();
      swal
        .fire({
          html: `<div> <img src=${Success} alt="success"></div>`,
          title: "Debit Note Saved Successfully",
          showConfirmButton: true,
          confirmButtonText: "OK",
          allowOutsideClick: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            Navigate("/retail/home");
          }
        });
    }
  };
  // const OnSearch = async () => {
  //   const obj = {
  //     RefNo:
  //    lDto,
  //       "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber"
  //     ),
  //     IssueDistrict:
  //     lDto,
  //       "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipIssueDistrict"
  //     ),
  //   };
  //   await DeduplicationByDistrictRefNo(obj).then((result) => {
  //     if (result.data.status === 1) {
  //       swal.fire({
  //         icon: "success",
  //         text: "User is Existed",
  //       });
  //       const InsuredDetails = {
  //         ...result.data.data.additionalDetails.InsurableItem[0].RiskItems[0].KYCDetails
  //           .InsuredDetails,
  //       };
  //
  //         lDto,
  //         "InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails",
  //         InsuredDetails
  //       );

  //       setDto(dispatch, lDto);
  //       flag.ExistingDetails1 = true;
  //       setFlag({ ...flag });
  //     } else {
  //       swal.fire({
  //         icon: "error",
  //         text: result.data.responseMessage,
  //       });
  //     }
  //   });
  // };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  // const [backDropFlag, setBackDropFlag] = useState(false);
  const onDebitNoteClick = async () => {
    // setBackDropFlag(true);
    let Class = "";
    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Class = lDto.Class === "MotorCycle" ? 141 : 142;
    }
    if (localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC") {
      Class = lDto.Class === "MotorCycle" ? 158 : 157;
    }
    const proposalNo = lDto.ProposalNo;
    const downloadDTO = {
      key: proposalNo,
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
        generateFile(result.data, proposalNo);
        // setBackDropFlag(false);
      }
    });
  };
  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress1 =
        lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.EmailAddress;

      let Class = "";
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = lDto.Class === "MotorCycle" ? 163 : 164;
      }
      if (localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC") {
        Class = lDto.Class === "MotorCycle" ? 165 : 166;
      }
      const obj = {
        proposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: lDto.ProposalNo,
        keyType: "BGRProposal",
        communicationId: Class,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      if (EmailAddress1 !== "") {
        const res = await SendNotification(EmailAddress1, obj);
        if (res.data.status === 1) {
          swal.fire({
            icon: "success",
            text: "E-Mail Sent succesfully",
          });
        } else {
          swal.fire({
            icon: "error",
            text: "E-Mail not sent as Incorrect E-Mail ID is captured in Customer Details Screen",
          });
        }
      } else {
        swal.fire({
          icon: "error",
          text: "E-Mail not sent as E-Mail ID is not captured in Customer Details Screen",
        });
      }
    }
  };

  useEffect(() => {
    if (genericInfo.reset) setResetCount(genericInfo.reset);
  }, [genericInfo]);

  useEffect(async () => {
    const rf = lDto.FiscalYear;
    if (rf === undefined || rf === "") {
      const curM = new Date().getMonth() + 1;
      const curD = new Date().getDate();
      let curY2 = new Date().getFullYear();
      let curY1 = new Date().getFullYear();
      if (curM < 7) {
        curY1 -= 1;
      } else if (curM > 7) {
        curY2 += 1;
      } else if (curD < 17) curY1 -= 1;
      else curY2 += 1;

      lDto.FiscalYear = curY1.toString().slice(2, 4).concat("/", curY2.toString().slice(2, 4));
      lDto.FieldOfficerCode = "0000";
      lDto.FieldOfficer = "Direct";
      lDto.SubFieldOfficerCode = "0000";
      lDto.SubFieldOfficer = "Direct";
      lDto.AgentCode = "0000";
      lDto.Agentname = "Direct";
    }
    lDto.ProductLogo = genericInfo.ProductLogo;
    lDto.CompanyName = process.env.REACT_APP_CompanyName;
    lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
    lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
    lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;
  }, [resetCount]);
  const [mindate, setMindate] = useState();
  const [mindate1, setMindate1] = useState();

  const onDOBselect = (e, d) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.DOB = "";

      swal.fire({
        icon: "error",
        text: `Age of the Policy Holder must be above 16 Years.`,
      });
    } else {
      lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.DOB = d;
    }
    setDto({ ...lDto });
  };

  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  useEffect(async () => {
    flag.Period = lDto.PremiumType === "Short Period";

    // Filtering TypeofCover based on Class
    // masters.TypeofCoverFilter = masters.TypeofCover.filter((x) => x.description === lDto.Class);

    if (lDto.PremiumType === "Normal") {
      // flag.NumberOfDays = true;
      lDto.NumberofDays = "365";
      lDto.Period = "";
    }
    if (lDto.PremiumType === "Short Period") {
      // flag.NumberOfDays = false;

      masters.Period.forEach((x) => {
        if (lDto.Period === x.mValue) {
          const nod = lDto.NumberofDays; // , x.description);
          if (nod !== undefined) if (parseInt(nod, 10) > x.description) lDto.NumberofDays = "";
        }
      });
    }

    if (lDto.PolicyStartDate !== "" && lDto.PolicyStartDate !== undefined) {
      lDto.PolicyEndDate = addDays(lDto.PolicyStartDate, lDto.NumberofDays);
    }

    const YOM = lDto.InsurableItem[1].RiskItems[0].YearofManufacture;
    if (YOM !== undefined && YOM !== "") {
      const CY = new Date().getFullYear();
      const SY = parseInt(YOM, 10);
      const VA = CY - SY;
      lDto.InsurableItem[1].RiskItems[0].AgeofVehicle = VA.toString();
    }

    const VehicleCost1 = lDto.InsurableItem[1].RiskItems[0].VehicleCost;
    if (VehicleCost1 !== undefined) {
      lDto.InsurableItem[1].RiskItems[0].TotalSumInsured = VehicleCost1;
    }

    if (lDto.FormatedData.CalculatedPremiumDetails !== undefined) {
      CPremium.GrossPremium = lDto.FormatedData.CalculatedPremiumDetails.NetPremium;
      CPremium.StampDuty = lDto.FormatedData.CalculatedPremiumDetails.Stampduty;
      CPremium.VAT = lDto.FormatedData.CalculatedPremiumDetails.VAT;
      CPremium.TotalPremium = lDto.FormatedData.CalculatedPremiumDetails.FinalPremium;
    }
    const InsuredType1 = lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.InsuredType;
    if (InsuredType1 === "Government body" || InsuredType1 === "Individual") flag.Pan = false;
    else flag.Pan = true;
    if (InsuredType1 === "Individual") {
      flag.Individual = true;
    } else {
      flag.Individual = false;
    }
    if (lDto.DocType === "Fresh") flag.DocType = true;
    else flag.DocType = false;
    if (lDto.InsurableItem[1].RiskItems[0].DirectFromShowRoom === "Yes")
      flag.DirectFromShowRoom = false;
    else flag.DirectFromShowRoom = true;
    if (lDto.InsurableItem[1].RiskItems[0].VehicleNoEnglish !== "") {
      lDto.InsurableItem[1].RiskItems[0].DirectFromShowRoom = "No";
    }
    const IssueDate =
      lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.PassportIssuedDate;
    if (IssueDate !== undefined || IssueDate !== "") {
      setMindate(IssueDate);
    }
    const MemIssuseDate =
      lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.PassportIssuedDate;
    if (MemIssuseDate !== undefined || MemIssuseDate !== "") {
      setMindate1(MemIssuseDate);
    }

    if (lDto.ExistingDetails === "Yes") {
      flag.ExistingDetails = true;
      // flag.ExistingDetails1 = false;
    }
    if (lDto.ExistingDetails === "No") {
      flag.ExistingDetails = false;
      flag.ExistingDetails1 = true;
    }
    const InsuredNameEnglish1 =
      lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.InsuredNameEnglish;
    if (InsuredNameEnglish1 !== "") {
      lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.OrganisationName =
        InsuredNameEnglish1;
    }
    const AddressEnglish1 =
      lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.AddressEnglish;
    if (InsuredNameEnglish1 !== "") {
      lDto.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.MemberDetail.OrganisationAddress =
        AddressEnglish1;
    }

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
      if (lDto.InsurableItem[1].RiskItems[0].Excess !== "") {
        lDto.FormatedData.CalculatedPremiumDetails.Excess = formater.format(
          lDto.InsurableItem[1].RiskItems[0].Excess
        );
        if (lDto.InsurableItem[1].RiskItems[0].TotalSumInsured !== "") {
          lDto.FormatedData.CalculatedPremiumDetails.TotalSumInsured = formater.format(
            lDto.InsurableItem[1].RiskItems[0].TotalSumInsured
          );
        }
        if (lDto.InsurableItem[1].RiskItems[0].CompulsoryExcess !== "") {
          lDto.FormatedData.CalculatedPremiumDetails.CompulsoryExcess = formater.format(
            lDto.InsurableItem[1].RiskItems[0].CompulsoryExcess
          );
        }
      }
    }

    setFlag({ ...flag });

    setCPremium({ ...CPremium });
    setDto({ ...lDto });
  }, [lDto]);
  useEffect(async () => {
    let Company = "";
    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Company = "NMIC";
    }
    if (localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC") {
      Company = "PMIC";
    }
    if (Company !== "") {
      await GetProdPartnermasterData("BranchName", {
        Description: Company,
      }).then((res) => {
        masters1.IssuingBranch = res.data;
        lDto.ICShortName = res.data[0].Description;
      });
    }
    setDto({ ...lDto });
    setMasters({ ...masters1 });
  }, [localStorage.getItem("NepalCompanySelect")]);
  useEffect(() => {
    if (loginUserDetails && loginUserDetails.displayName) {
      lDto.AgentName = loginUserDetails.displayName;
      lDto.AgentMobileNo = loginUserDetails.contactNumber;

      setDto({ ...lDto });
    }
  }, [loginUserDetails]);

  let data = [];

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            required: true,
            label: "DocType(PolicyType)",
            visible: true,
            disableOnReset: true,
            path: "DocType",
            options: masters.DocType,
            disabled: true,
          },
          {
            type: "Input",
            // required: true,
            label: "Department",
            visible: true,
            path: "Department",
            disableOnReset: true,
            // options: masters.Department,
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Class",
            visible: true,
            path: "Class",
            options: masters.Class1,
            customOnChange: (e, a) => OnClassSelect(e, a),
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Premium Type",
            visible: true,
            path: "PremiumType",
            options: masters.PremiumType,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Period",
            visible: lDto.PremiumType === "Short Period",
            path: "Period",
            options: masters.Period,
          },
          {
            type: "Input",
            label: "Number of Days",
            required: true,
            visible: true,
            path: "NumberofDays",
            onChangeFuncs: [onNumberOfDays],
            disabled: lDto.PremiumType === "Normal",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            path: "PolicyStartDate",
            minDate: `${
              new Date().getMonth() + 1
            }-${new Date().getDate()}-${new Date().getFullYear()}`,
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            visible: true,
            path: "PolicyEndDate",
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Business Type",
            visible: true,
            path: "BusinessType",
            options: masters.BusinessType,
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Government",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.GovernmentNonGovernment",
            options: masters.Government,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Category",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.Category",
            options: masters.Category,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Type of Covers",
            visible: true,
            // path: "InsurableItem.1.RiskItems.0.TypeofCover",
            path: "InsurableItem.1.RiskItems.0.TypeofCoverLabel",
            options: masters.TypeofCoverFilter,
            customOnChange: (e, a) => onTypeofCover(e, a),
            spacing: 4,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Year of Vehicle Manufacture",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.YearofManufacture",
            options: masters.YearofManufacture,
            spacing: 2,
          },
          {
            type: "Input",
            label: "Age of Vehicle",
            required: true,
            path: "InsurableItem.1.RiskItems.0.AgeofVehicle",
            visible: true,
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            required: true,
            label: "CC/KW",
            path: "InsurableItem.1.RiskItems.0.CCKW",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            required: true,
            label: "Seats",
            path: "InsurableItem.1.RiskItems.0.Seats",
            visible: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Cost",
            visible: true,
            required: true,
            path: "InsurableItem.1.RiskItems.0.VehicleCost",
            onChangeFuncs: [IsNumeric],
            disabled: lDto.Class === "ThirdPartyMotorcycle",
          },
          {
            type: "Input",
            label: "Vehicle Cost",
            visible: true,
            required: true,
            path: "AAA",
            onChangeFuncs: [IsNumeric],
            disabled: lDto.Class === "ThirdPartyMotorcycle",
          },
          {
            type: "Input",
            label: "Total Sum Insured",
            path: "InsurableItem.1.RiskItems.0.TotalSumInsured",
            visible: true,
            required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Voluntary Excess",
            path: "InsurableItem.1.RiskItems.0.Excess",
            visible: true,
            options: masters.Excess,
          },
          {
            type: "Input",
            required: true,
            label: "Compulsory Excess",
            path: "InsurableItem.1.RiskItems.0.CompulsoryExcess",
            visible: true,
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Direct Discount(%)",
            path: "InsurableItem.1.RiskItems.0.DirectDiscount",
            visible: true,
            options: masters.DirectDiscount,
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: true,
            path: "PolicyStartDate",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            path: "PolicyEndDate",
            disabled: true,
          },
          {
            type: "RadioGroup",
            required: true,
            visible: true,
            radioLabel: { label: "Financing Details", labelVisible: true },
            radioList: [
              { value: "Direct", label: "Direct" },
              { value: "Bank/Financial Institution", label: "Bank/Financial Institution" },
            ],
            path: "InsurableItem.0.RiskItems.0.FinancingType",
            spacing: 12,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
          },
          {
            type: "AutoComplete",
            label: "Bank Category",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankCategory",
            options: masters.BankCategory,
          },
          {
            type: "Input",
            label: "Bank/Financial Inst Name(English)",
            required: true,
            visible: true,
            name: "BankorFinancialInstituionNameinEnglish",
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorFinancialInstituionNameinEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Bank/Financial Inst Name(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankorFinancialInstituionNameinNepali",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Bank Code",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankCode",
          },
          {
            type: "Input",
            label: "Short Code",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.ShortCode",
          },
          {
            type: "Input",
            label: "Swift/Pseudo Code",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.SwiftPseudoCode",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Contact Person1",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.ContactPerson1",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Contact Person2",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.ContactPerson2",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Contact Person3",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.ContactPerson3",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.MobileNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Input",
            label: "Fax Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.FaxNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Input",
            label: "Website",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.Website",
          },
          {
            type: "Input",
            label: "Email",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.Email",
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.PANNumber",
            onChangeFuncs: [IsAlphaNumSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "Bank Agent Code",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BankAgentCode",
          },
          {
            type: "Input",
            label: "CEO",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.CEO",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.Country",
            options: masters.Country,
            customOnChange: (e, a) => onPlaceSelect(e, a, "Country1"),
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.ProvinceorState",
            options: masters.State,
            customOnChange: (e, a) => onPlaceSelect(e, a, "State1"),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.District",
            options: masters.District1,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District1"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.Municipality",
            options: masters.Municipality1,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            required: true,
            visible: true,
            name: "AddressEnglishBank",
            path: "InsurableItem.0.RiskItems.0.Bankdetails.AddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.AddressNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.Area",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Tole/Streetname",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.ToleStreetName",
            // onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.HouseNumber",
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Button",
            label: "Add Branch Details",
            visible: true,
            spacing: 12,
            variant: "outlined",
            align: "right",
            onClick: (e) => AddBranchDetails(e, id),
          },
          {
            type: "Input",
            label: "Branch Name",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.Bank",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.Country",
            options: masters.Country,
            customOnChange: (e, a) => onPlaceSelect(e, a, "Country2", 0),
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.ProvinceState",
            options: masters.PlaceSelect[0].State,
            customOnChange: (e, a) => onPlaceSelect(e, a, "State2", 0),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.District",
            options: masters.PlaceSelect[0].District,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District2", 0),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.Municipality",
            options: masters.PlaceSelect[0].Municipality,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            visible: true,
            required: true,
            name: "AddressEnglish1",
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.AddressEnglish",
            customOnBlur: (e) => onBlurTransliteration(e, 0),
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.AddressNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.Area",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Tole/StreetName",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.ToleStreetName",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.HouseNumber",
            // onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Contact person1",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.ContactPerson1",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Contact person2",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.ContactPerson2",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Contact person3",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.ContactPerson3",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.MobileNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Input",
            label: "Fax Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.FaxNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Input",
            label: "Branch Manager",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.BranchManager",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Email ID",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails.0.Email",
            // onChangeFuncs: [IsEmail],
            onBlurFuncs: [IsEmail],
          },
          // ...obj2,
        ],
        ...tArr11,
        [
          {
            type: "Input",
            label: "Name of the Proposer",
            visible: true,
            path: "ProposerDetails.Name",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Designation",
            visible: true,
            path: "ProposerDetails.Designation",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            path: "ProposerDetails.Occupation",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.Address",
            // onChangeFuncs: [IsAlphaSpace],
          },
        ],
        [
          // {
          //   type: "RadioGroup",
          //   required: true,
          //   visible: true,
          //   radioLabel: { label: "Are you an Existing Customers?", labelVisible: true },
          //   radioList: [
          //     { path: "Yes", label: "Yes" },
          //     { path: "No", label: "No" },
          //   ],
          //   path: "ExistingDetails",
          //   spacing: 12,
          // },
          // {
          //   type: "Input",
          //   label: "Citizenship Number",
          //   visible: flag.ExistingDetails,
          //   required: true,
          //   path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber",
          //   onChangeFuncs: [IsAlphaNumSpace],
          // },
          // {
          //   type: "AutoComplete",
          //   label: "Issue District",
          //   visible: flag.ExistingDetails,
          //   required: true,
          //   path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipIssueDistrict",
          //   options: masters.District,
          // },
          // {
          //   type: "Button",
          //   label: "Search",
          //   visible: flag.ExistingDetails,
          //   onClick: () => OnSearch(),
          //   spacing: 6,
          // },
          {
            type: "AutoComplete",
            label: "KYC Category",
            visible: true,
            required: true,
            disableOnReset: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.KYCCategory",
            options: masters.KYCCategory,
          },
          {
            type: "AutoComplete",
            label: "Insured Type",
            visible: true,
            required: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.InsuredType",
            options: masters.InsuredType,
          },
          // {
          //   type: "Input",
          //   label: "Citizenship Number",
          //   visible: true,
          //   // visible: flag.ExistingDetails1,
          //   required: true,
          //   path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber",
          //   onChangeFuncs: [IsAlphaNumSpace],
          // },
          // {
          //   type: "AutoComplete",
          //   label: "Issue District",
          //   visible: true,
          //   // visible: flag.ExistingDetails1,
          //   required: true,
          //   path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.IssueDistrict",
          //   options: masters.District,
          // },
          {
            type: "Input",
            label: "Special Client",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.SpecialClient",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Insured Name-English",
            visible: true,
            // visible: flag.ExistingDetails1,
            required: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.InsuredNameEnglish",
            name: "InsuredNameEnglish",
            onChangeFuncs: [IsAlphaSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Insured Name-Nepali",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.InsuredNameNepali",
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "KYC Classification",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.KYCClassification",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "AutoComplete",
            label: "KYC Risk Category",
            visible: true,
            required: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.KYCRiskCategory",
            options: masters.KYCRiskCategory,
          },
          {
            type: "AutoComplete",
            label: "Is Beneficiary Owner",
            visible: true,
            // visible: flag.ExistingDetails1,
            disableOnReset: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.IsBeneficiaryOwner",
            options: masters.IsBeneficiaryOwner,
          },
          {
            type: "AutoComplete",
            label: "Occupation",
            visible: true,
            required: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.Occupation",
            options: masters.Occupation,
          },
          // {
          //   type: "Input",
          //   label: "DocumentList",
          //   required: true,
          //   visible: true,
          //   path: "InsurableItem.0.RiskItems.0.KYCDetails.DocumentList",
          // },
          {
            type: "AutoComplete",
            label: "Income Source",
            visible: true,
            required: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.IncomeSource",
            options: masters.IncomeSource,
          },
          {
            type: "Input",
            label: "Contact Person Name",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ContactPersonName",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Email Address",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.EmailAddress",
            // onChangeFuncs: [IsEmail],
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            required: flag.Pan,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.PANNumber",
            onChangeFuncs: [IsAlphaNumSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "VAT Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.VATNumber",
            onChangeFuncs: [IsAlphaNumSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "Registration Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.RegistrationNumber",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "MDDatePicker",
            label: "Registration Date",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.RegistrationDate",
          },
          {
            type: "MDDatePicker",
            label: "Registration Close Date",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.RegisterationCloseDate",
          },
          {
            type: "Input",
            label: "Registration Office",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.RegistrationOffice",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          // {
          //   type: "Input",
          //   label: "Reference KYC Number",
          //   visible: true,
          //   path: "InsurableItem.0.RiskItems.0.KYCDetails.ReferenceKYCNumber",
          // },
          {
            type: "Input",
            label: "Reference Insured Name",
            visible: true,

            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ReferenceInsuredName",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,

            // required: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,

            // visible: flag.ExistingDetails1,
            required: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MobileNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Input",
            label: "TDS Category",
            visible: true,

            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.TDSCategory",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.Country",
            options: masters.Country,
            customOnChange: (e, a) => onPlaceSelect(e, a, "Country3"),
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ProvinceState",
            options: masters.State3,
            customOnChange: (e, a) => onPlaceSelect(e, a, "State3"),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.District",
            options: masters.District3,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District3"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.Municipality",
            options: masters.Municipality3,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            options: masters.WardNumber,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.WardNumber",
          },
          {
            type: "Input",
            label: "Address(English)",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            name: "AddressEnglish3",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.AddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.AddressNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            // visible: flag.ExistingDetails1,
            onChangeFuncs: [IsAlphaNumSpace],
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.Area",
          },
          {
            type: "Input",
            label: "Tole/streetName",
            visible: true,
            // visible: flag.ExistingDetails1,
            onChangeFuncs: [IsAlphaNumSpace],
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ToleStreetName",
          },
          {
            type: "Input",
            label: "House No",
            name: "Seats",
            visible: true,
            // visible: flag.ExistingDetails1,
            // onChangeFuncs: [IsNumeric],
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.HouseNumber",
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            onChangeFuncs: [IsNumeric],
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.PlotNumber",
          },
          {
            type: "Input",
            label: "Temporary Address-English",
            visible: true,
            // visible: flag.ExistingDetails1,
            name: "TemporaryAddressEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.TemporaryAddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Temporary Address-Nepali",
            visible: true,
            // visible: flag.ExistingDetails1,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.TemporaryAddressNepali",
            InputProps: { readOnly: true },
          },
          { type: "Typography", label: "Document Section", visible: true, spacing: 12 },
          {
            type: "Button",
            label: "Add Document",
            // visible: flag.ExistingDetails1,
            visible: true,
            startIcon: <AddIcon />,
            variant: "outlined",
            onClick: onAddDocument,
            spacing: 12,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <Stack rowGap={2}>
                {docCountList.map((item, index) => (
                  <Grid container columnSpacing={2}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Document Name"
                        name="DocumentName"
                        value={item.DocumentName}
                        onChange={(e) => handleDocName(e, index)}
                        onBlur={(e) => handleDublicateDoc(e, item.DocumentName, index)}
                        // error={
                        //   flag.DocDublication &&
                        //   docCountList[index].DocumentName === item.DocumentName
                        // }
                      />
                      {/* {flag.DocDublication === true &&
                        docCountList[index].DocumentName === item.DocumentName && (
                          <Typography sx={{ fontSize: "12px", color: "red" }}>
                            {item.DocumentName} Already Exist
                          </Typography>
                        )} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDButton variant="outlined" component="label">
                        Upload{" "}
                        <input
                          hidden
                          accept="image/bmp, image/jpeg, image/png, .pdf"
                          type="file"
                          onChange={(e) => handleFileUpload(e, index)}
                        />
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <Typography sx={{ fontSize: "0.9rem" }}>
                        {item.DocumentFileName !== "" ? item.DocumentFileName : null}
                        {item.DocumentFileName !== "" ? (
                          <CancelIcon
                            color="primary"
                            onClick={(e) => handleDocFileDelete(e, index)}
                          />
                        ) : null}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                      {index !== 0 && <DeleteIcon onClick={() => handleDocDelete(index)} />}
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            ),
          },
        ],
        [
          { type: "Typography", label: "Upload Profile Picture", visible: true },
          {
            type: "Button",
            label: "Upload Pic",
            visible: true,
            variant: "outlined",
            component: "label",
            typeFormat: <input hidden type="file" accept="image/*" onChange={onUploadPic} />,
            // spacing: 4,
          },
          {
            type: "TypographyVal",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ProfilePicture",
            visible: true,
            sx: { fontSize: "14px" },
            spacing: 5,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 1,
            return: flag.CancleIcon ? <CancelIcon onClick={onCancelClick} /> : null,
          },
          {
            type: "AutoComplete",
            label: "Gender(English)",
            required: true,
            visible: true,
            name: "GenderEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.GenderEnglish",
            options: masters.Gender,
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Gender(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.GenderNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "AutoComplete",
            label: "Marital Status(English)",
            visible: true,
            required: true,
            name: "MaritalStatusEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MaritalStatusEnglish",
            options: masters.MaritalStatus,
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Marital Status(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MaritalStatusNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Husband Name(English)",
            visible: true,
            name: "HusbandNameEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.HusbandNameEnglish",
            onChangeFuncs: [IsAlphaSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Husband Name(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.HusbandNameNepali",
            onChangeFuncs: [IsAlphaSpace],
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Wife Name(English)",
            visible: true,
            name: "WifeNameEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.WifeNameEnglish",
            onChangeFuncs: [IsAlphaSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Wife Name(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.WifeNameNepali",
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Father Name(English)",
            required: true,
            visible: true,
            name: "FatherNameEnglish1",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.FatherNameEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Father Name(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.FatherNameNepali",
            onChangeFuncs: [IsAlphaSpace],
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Grandfather Name(English)",
            visible: true,
            required: true,
            name: "GrandfatherNameEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.GrandfatherNameEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Grandfather Name(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.GrandfatherNameNepali",
            onChangeFuncs: [IsAlphaSpace],
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Nationality(English)",
            visible: true,

            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.NationalityEnglish",
            // customOnBlur: onBlurTransliteration,

            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Permanent Address(English)",
            visible: true,
            name: "AddressEnglish4",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.PermanentAddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Permanent Address(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.PermanentAddressNepali",
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Town(English)",
            visible: true,
            name: "TownEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.TownEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Town(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.TownNepali",
            onChangeFuncs: [IsAlphaNumSpace],
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "City(English)",
            visible: true,
            name: "CityEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CityEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "City(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CityNepali",
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Temporary Address(English)",
            visible: true,
            name: "TempAddresEnglish",
            customOnBlur: onBlurTransliteration,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.TempAddresEnglish",
          },
          {
            type: "Input",
            label: "Temporary Address(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.TempAddresNepali",
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Residence(English)",
            visible: true,
            name: "ResidenceEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ResidenceEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Residence(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ResidenceNepali",
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Citizenship Number",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "MDDatePicker",
            label: "Citizenship Issued Date",
            required: true,
            visible: true,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            name: "mPStartDate",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipIssuedDate",
          },
          {
            type: "AutoComplete",
            label: "Issue District",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.IssueDistrict",
            options: masters.District,
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            required: true,
            visible: true,
            name: "mPStartDate",
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.DOB",
            customOnChange: onDOBselect,
          },
          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.PassportNumber",
            onChangeFuncs: [IsAlphaNumSpace],
            maxLength: 8,
          },
          {
            type: "MDDatePicker",
            label: "Passport Issued Date",
            visible: true,
            name: "mPStartDate",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.PassportIssuedDate",
          },
          {
            type: "MDDatePicker",
            label: "Passport Expiry Date",
            visible: true,
            name: "mPStartDate",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.PassportExpiryDate",
            minDate: mindate,
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Passport Issued By", labelVisible: true },
            radioList: [
              { value: "India", label: "India" },
              { value: "Nepal", label: "Nepal" },
            ],
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.PassportIssuedby",
            spacing: 6,
          },
          {
            type: "Input",
            label: "License Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.LicenseNumber",
            spacing: 3,
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.Occupation",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Income Source",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.IncomeSource",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          // {
          //   type: "Input",
          //   label: "Citizenship Number",
          //   visible: true,
          //   path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber",
          //   onChangeFuncs: [IsAlphaNumSpace],
          // },
        ],
        [
          {
            type: "Input",
            label: "Organisation Name",
            visible: true,
            required: true,
            InputProps: { readOnly: true },
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.OrganisationName",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Organisation Address",
            visible: true,
            required: true,
            InputProps: { readOnly: true },
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.OrganisationAddress",
            // onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Organisation Contact No",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.OrganisationNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Typography",
            label: "Member Details",
            visible: true,
            spacing: 12,
          },
          {
            type: "AutoComplete",
            label: "Member Type",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.MemberType",
            options: masters.MemberType,
          },
          {
            type: "Input",
            label: "Role",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.Role",
            // onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Member Name (English)",
            visible: true,
            name: "MemberNameEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.MemberNameEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Member Name (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.MemberNameNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Designation (English)",
            visible: true,
            name: "DesignationEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.DesignationEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Designation (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.DesignationNepali",
            onChangeFuncs: [IsAlphaNumSpace],
            InputProps: { readOnly: true },
          },
          {
            type: "AutoComplete",
            label: "Gender (English)",
            visible: true,
            name: "GenderEnglish1",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.GenderEnglish",
            options: masters.Gender,
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Gender (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.GenderNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "AutoComplete",
            label: "Martial Status (English)",
            visible: true,
            name: "MaritalStatusEnglish1",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.MaritalStatusEnglish",
            options: masters.MaritalStatus,
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "AutoComplete",
            label: "Martial Status (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.MaritalStatusNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Husband's Name(English)",
            visible: true,
            name: "HusbandNameEnglish1",
            customOnBlur: onBlurTransliteration,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.HusbandNameEnglish",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Husband's Name(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.HusbandNameNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Wife Name (English)",
            visible: true,
            name: "WifeNameEnglish1",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.WifeNameEnglish",
            onChangeFuncs: [IsAlphaSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Wife Name (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.WifeNameNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Father Name (English)",
            visible: true,
            customOnBlur: onBlurTransliteration,
            name: "FatherNameEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.FatherNameEnglish",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Father Name (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.FatherNameNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "GrandFather Name (English)",
            visible: true,
            name: "GrandfatherNameEnglish1",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.GrandfatherNameEnglish",
            onChangeFuncs: [IsAlphaSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "GrandFather Name (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.GrandfatherNameNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Nationality (English)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.NationalityEnglish",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Permanent Address (English)",
            visible: true,
            name: "PermanentAddressEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.PermanentAddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Permanent Address (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.PermanentAddressNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Town (English)",
            visible: true,
            name: "TownEnglish1",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.TownEnglish",
            onChangeFuncs: [IsAlphaSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Town (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.TownNepali",
            onChangeFuncs: [IsAlphaSpace],
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "City (English)",
            name: "CityEnglish1",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.CityEnglish",
            onChangeFuncs: [IsAlphaSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "City (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.CityNepali",
            onChangeFuncs: [IsAlphaSpace],
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Temorary Address (English)",
            visible: true,
            name: "TempAddresEnglish1",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.TempAddresEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Temorary Address (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.TempAddresNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Identification Type",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.IdentificationType",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Citizenship Number",
            visible: true,
            required: flag.Individual,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.CitizenshipNumber",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "MDDatePicker",
            label: "Citizenship Issued Date",
            visible: true,
            required: flag.Individual,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.CitizenshipIssuedDate",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Citizenship Issue District",
            visible: true,
            required: flag.Individual,
            altFormat: "y - m - d",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.IssueDistrict",
            options: masters.District,
          },
          {
            type: "MDDatePicker",
            label: "Date Of Birth",
            required: flag.Individual,
            visible: true,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.DoB",
          },
          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.PassportNumber",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "MDDatePicker",
            label: "Passport Issued Date",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.PassportIssuedDate",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "MDDatePicker",
            label: "Passport Expiry Date",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.PassportExpiryDate",
            minDate: mindate1,
          },

          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Passport Issued By", labelVisible: true },
            radioList: [
              { value: "India", label: "India" },
              { value: "Nepal", label: "Nepal" },
            ],
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.PassportIssuedby",
            spacing: 12,
          },
          {
            type: "Input",
            label: "License Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.LicenseNumber",
            // onChangeFuncs: [IsNumeric],
            spacing: 3,
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.Occupation",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Income Source",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.IncomeSource",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          // {
          //   type: "Input",
          //   label: "Phone Number",
          //   visible: true,
          //   path:
          //     "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.PhoneNumber",
          //   onChangeFuncs: [IsNumeric],
          // },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.MobileNumber",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Email ID",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.Email",
            // onChangeFuncs: [IsEmail],
            onBlurFuncs: [IsEmail],
          },
          {
            type: "AutoComplete",
            label: "Status",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.Status",
            options: masters.Status,
          },
          {
            type: "MDDatePicker",
            label: "Appoint Date",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.AppointDate",
          },
          { type: "Typography", label: "Upload Profile Picture", visible: true, spacing: 4 },
          {
            type: "Button",
            label: "Upload Pic",
            visible: true,
            variant: "outlined",
            component: "label",
            typeFormat: <input hidden type="file" accept="image/*" onChange={onUploadPic} />,
            spacing: 2,
          },
          {
            type: "TypographyVal",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ProfilePicture",
            visible: true,
            sx: { fontSize: "14px" },
          },
          {
            type: "Custom",
            visible: true,
            spacing: 1,
            return: flag.CancleIcon ? <CancelIcon onClick={onCancelClick} /> : null,
          },
        ],
        [
          {
            type: "Typography",
            label: "Care of (English)",
            visible: true,
            spacing: 12,
          },
          {
            type: "Input",
            label: "Name",
            visible: true,
            name: "CareofNameEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CareofNameEnglish",
            onChangeFuncs: [IsAlphaSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CareofPANNumber",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CareofContactNumber",
            onChangeFuncs: [IsNumaricSpecial],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            name: "CareofAddressEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CareofAddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Typography",
            label: "Care of (Nepali)",
            visible: true,
            spacing: 12,
          },

          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CareofNameNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CareofAddressNepali",
            InputProps: {
              readOnly: true,
            },
          },
        ],
        [
          {
            type: "Input",
            label: "Proprietor Name(English)",
            visible: true,
            name: "ProprietorNameEnglish",
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ProprietorNameEnglish",
            onChangeFuncs: [IsAlphaSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Proprietor Name(Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.ProprietorNameNepali",
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Subject Matter",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.SubjectMatter",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Type",
            required: true,
            visible: true,
            path: "PolicyRiskType",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Category",
            visible: true,
            path: "PolicyRiskCategory",
            onChangeFuncs: [IsAlphaSpace],
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Checkbox",
            visible: true,
            label: "Direct From Showroom",
            path: "InsurableItem.1.RiskItems.0.DirectFromShowRoom",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Name of the Vehicle",
            required: true,
            visible: true,
            path: "InsurableItem.1.RiskItems.0.Nameofthevehicle",
          },
          {
            type: "Input",
            label: "Make of the Vehicle",
            required: true,
            visible: true,
            path: "InsurableItem.1.RiskItems.0.Make",
          },
          {
            type: "Input",
            label: "Model of the Vehicle",
            required: true,
            visible: true,
            path: "InsurableItem.1.RiskItems.0.Model",
          },
          {
            type: "Input",
            label: "Mode of Use",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.Modelofuse",
          },
          {
            type: "AutoComplete",
            label: "Government",
            required: true,
            visible: true,
            path: "InsurableItem.1.RiskItems.0.GovernmentNonGovernment",
            options: masters.Government,
          },
          {
            type: "AutoComplete",
            label: "Category",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.Category",
            options: masters.Category,
          },
          {
            type: "AutoComplete",
            label: "Type of Cover",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.TypeofCoverLabel",
            options: masters.TypeofCoverFilter,
            customOnChange: (e, a) => onTypeofCover(e, a),
            spacing: 4,
          },
          {
            type: "AutoComplete",
            label: "Year of Vehicle Manufacture",
            required: true,
            visible: true,
            path: "InsurableItem.1.RiskItems.0.YearofManufacture",
            options: masters.YearofManufacture,
            spacing: 2,
          },
          {
            type: "Input",
            label: "Age of Vehicle",
            required: true,
            visible: true,
            path: "InsurableItem.1.RiskItems.0.AgeofVehicle",
            onChangeFuncs: [IsNumeric],
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "CC/KW",
            visible: true,
            required: true,
            path: "InsurableItem.1.RiskItems.0.CCKW",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Seats",
            visible: true,
            disableOnReset: true,
            path: "InsurableItem.1.RiskItems.0.Seats",
            onChangeFuncs: [IsNumeric],
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Vehicle Cost",
            visible: true,
            required: true,
            path: "InsurableItem.1.RiskItems.0.VehicleCost",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Total Sum Insured",
            visible: true,
            required: true,
            path: "InsurableItem.1.RiskItems.0.TotalSumInsured",
            InputProps: { readOnly: true },
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: " Voluntary Excess",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.Excess",
            options: masters.Excess,
          },
          {
            type: "Input",
            label: "Compulsory Excess",
            required: true,
            visible: true,
            path: "InsurableItem.1.RiskItems.0.CompulsoryExcess",
            onChangeFuncs: [IsNumeric],
            InputProps: { readOnly: true },
          },
          {
            type: "AutoComplete",
            label: "Direct Discount(%)",
            required: true,
            path: "InsurableItem.1.RiskItems.0.DirectDiscount",
            visible: true,
            options: masters.DirectDiscount,
          },
          // {
          //   type: "Input",
          //   label: "Utility Cost",
          //   visible: true,
          //   onChangeFuncs: [IsNumeric],
          // },
          {
            type: "MDDatePicker",
            label: "Registration Date",
            visible: true,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            name: "mPStartDate",
            path: "InsurableItem.1.RiskItems.0.RegistrationDate",
          },
          // {
          //   type: "AutoComplete",
          //   label: "Vehicle No",
          //   visible: true,
          //   options: [],
          // },
          {
            type: "Input",
            label: "Vehicle Number (English)",
            visible: true,
            required: flag.DirectFromShowRoom,
            name: "VehicleNoEnglish",
            path: "InsurableItem.1.RiskItems.0.VehicleNoEnglish",
            customOnBlur: onBlurTransliteration,
            InputProps: {
              readOnly: lDto.InsurableItem[1].RiskItems[0].DirectFromShowRoom === "Yes",
            },
          },
          {
            type: "Input",
            label: "Vehicle Number (Nepali)",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.VehicleNoNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Engine Number",
            visible: true,
            required: true,
            path: "InsurableItem.1.RiskItems.0.EngineNo",
          },
          {
            type: "Input",
            label: "Chasis Number",
            visible: true,
            required: true,
            path: "InsurableItem.1.RiskItems.0.ChasisNo",
          },
          {
            type: "Input",
            label: "NCD",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.NCDYear",
            onChangeFuncs: [IsNumeric],
            InputProps: {
              readOnly: flag.DocType,
            },
          },
          {
            type: "Input",
            label: "PA to Driver",
            visible: true,
            disableOnReset: true,
            path: "InsurableItem.1.RiskItems.0.PAtoDriver",
            InputProps: {
              readOnly: true,
            },
          },
          // {
          //   type: "Input",
          //   label: "Goods Carrying Cap/ Tonnes/HP ",
          //   visible: true,
          //   onChangeFuncs: [IsNumeric],
          // },
          // {
          //   type: "Typography",
          //   label: "PA to Employee",
          //   visible: true,
          //   spacing: 6,
          // },
          {
            type: "Typography",
            label: "PA to Passanger",
            visible: true,
            spacing: 12,
          },
          // {
          //   type: "AutoComplete",
          //   label: "Employee Count",
          //   visible: true,
          //   options: [],
          // },
          // {
          //   type: "Input",
          //   label: "Sum Insured ",
          //   visible: true,
          //   onChangeFuncs: [IsNumeric],
          // },
          {
            type: "Input",
            label: "Count ",
            visible: true,
            disableOnReset: true,
            path: "InsurableItem.1.RiskItems.0.EmployeeCount",
            onChangeFuncs: [IsNumeric],
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Sum Insured",
            visible: true,
            disableOnReset: true,
            path: "InsurableItem.1.RiskItems.0.PAPassengerSI",
            onChangeFuncs: [IsNumeric],
            InputProps: { readOnly: true },
          },
          // {
          //   type: "Input",
          //   label: "Trailer Sum Insured",
          //   visible: true,
          //   onChangeFuncs: [IsNumeric],
          // },
          {
            type: "Input",
            label: "Other Description ",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.OtherDescription",
          },
          {
            type: "MDDatePicker",
            label: "Delivery Date",
            visible: true,
            name: "mPStartDate",
            path: "InsurableItem.1.RiskItems.0.DeliveryDate",
          },
          {
            type: "Input",
            label: "Additional Description/Warranties ",
            visible: true,
            path: "InsurableItem.1.RiskItems.0.AdditionalWarranty",
          },
          // {
          //   type: "Input",
          //   label: "Has Trailor",
          //   visible: true,
          //   path: "InsurableItem.1.RiskItems.0.HasTrailer",
          // },
          // {
          //   type: "Input",
          //   label: "Including Towing Chargers",
          //   visible: true,
          //   path: "InsurableItem.1.RiskItems.0.IncludeTowing",
          // },
          // {
          //   type: "Input",
          //   label: "Own Goods Carrying or Private Rent",
          //   visible: true,
          //   path: "InsurableItem.1.RiskItems.0.OwnGoodCarrying",
          // },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Issuing Branch",
            required: true,
            path: "IssuingBranch",
            visible: true,
            options: masters.IssuingBranch,
          },
          {
            type: "Input",
            label: "Sub-Branch",
            visible: true,
            path: "SubBranch",
          },
          {
            type: "Input",
            label: "Fiscal Year",
            required: true,
            visible: true,
            path: "FiscalYear",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Field Officer Code ",
            required: true,
            visible: true,
            path: "FieldOfficerCode",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Field Officer Name ",
            required: true,
            visible: true,
            path: "FieldOfficer",
            onChangeFuncs: [IsAlphaSpace],
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Sub Field Officer Code ",
            visible: true,
            path: "SubFieldOfficerCode",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Sub Field Officer Name",
            visible: true,
            path: "SubFieldOfficer",
            onChangeFuncs: [IsAlphaSpace],
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Agent Code ",
            path: "AgentCode",
            visible: true,
            required: true,
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Agent Name ",
            visible: true,
            required: true,
            path: "Agentname",
            onChangeFuncs: [IsAlphaSpace],
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Sub Agent Code",
            visible: true,
            path: "SubAgentCode",
          },
          {
            type: "Input",
            label: "Sub Agent Name",
            visible: true,
            path: "SubAgentName",
            onChangeFuncs: [IsAlphaSpace],
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            path: "Country",
            options: masters.Country,
            customOnChange: (e, a) => onPlaceSelect(e, a, "Country4"),
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            path: "ProvinceState",
            options: masters.State4,
            customOnChange: (e, a) => onPlaceSelect(e, a, "State4"),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            path: "District",
            options: masters.District4,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District4"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            required: true,
            visible: true,
            path: "Municipality",
            options: masters.Municipality4,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English) ",
            visible: true,
            required: true,
            path: "AddressEnglish",
            name: "AddressEnglish0",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Address(Nepali) ",
            visible: true,
            path: "AddressNepali",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "Area",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            path: "TollStreetName",
            onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            label: "House Number ",
            visible: true,
            path: "HouseNumber",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "PlotNumber",
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
            required: true,
            visible: true,
            path: "FormatedData.CalculatedPremiumDetails.BasePremium",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Old Vehicle Loading",
            required: true,
            visible: true,
            path: "FormatedData.CalculatedPremiumDetails.AgeofVehicleLoading",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Voluntary Excess",
            visible: true,
            // required: true,
            path: "FormatedData.CalculatedPremiumDetails.ExcessDiscount",
            options: masters.Excess,
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "No Claim Discount",
            visible: true,
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Eco Friendly Discount",
            visible: true,
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.EnvironmentDiscount",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Direct Discount",
            visible: true,
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Minimum Premium",
            visible: true,
            // required: true,
            path: "FormatedData.CalculatedPremiumDetails.ApplicableAdditionalPremium",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Third Party Insurance",
            visible: true,
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.TotalTPPremium",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "No Claim Discount(TP)",
            visible: true,
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.NoClaimDiscountTP",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Riot And Strike Damage(RSD/MD)",
            visible: true,
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.RSDMDRiderPillion",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Terrorism",
            visible: true,
            // required: true,
            path: "FormatedData.CalculatedPremiumDetails.STPremiumPDF",
            InputProps: { readOnly: true },
          },
          {
            type: "Modal",
            visible: true,
            open: modalOpen,
            return: (
              <Grid container spacing={2}>
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

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    Proposal Sent For Approval
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton onClick={onModalclose}>Close</MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: true,
            open: savemodalopen,
            return: (
              <Grid container spacing={2}>
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

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    DO You Wish To Preview or Save The Debit Note
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MDButton variant="outlined" onClick={onDebitNoteClick}>
                      PREVIEW
                    </MDButton>
                    <MDButton onClick={onSaveModalClose}>SAVE DEBIT NOTE</MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox>
                <MDBox
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "auto",
                    mt: "6px",
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    <Grid container spacing={2} p={3}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography>Gross Premium</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography sx={{ textAlign: "right" }}>
                          रु {CPremium.GrossPremium}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography>Stamp Duty</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography sx={{ textAlign: "right" }}>रु {CPremium.StampDuty}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography>VAT</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography sx={{ textAlign: "right" }}>रु {CPremium.VAT}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography>Total Premium</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography sx={{ textAlign: "right" }}>
                          रु {CPremium.TotalPremium}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </MDBox>
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
                <MDBox
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    p: "5px",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <MDButton
                      onClick={
                        genericInfo.Flow &&
                        (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                          ? onSaveModalClose
                          : handlesavedebitnote
                      }
                    >
                      {genericInfo.Flow &&
                      (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                        ? "Save Details"
                        : "Save Debit Note"}
                    </MDButton>
                    <MDButton onClick={onDebitNoteClick}>
                      {" "}
                      {/* {backDropFlag && <CircularProgress size="20px" sx={{ color: "#ffffff" }} />} */}
                      Download Debit Note <VisibilityIcon />
                    </MDButton>
                    <MDButton>Download Proposal</MDButton>
                    <MDButton onClick={handleSavepolicyWFStatus}>Send For Approval</MDButton>
                  </Stack>
                </MDBox>
              </MDBox>
            ),
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
                PaymentMode={[
                  { label: "Online", path: "Online" },
                  { label: "Offline", path: "Offline" },
                ]}
                OfflinePT={{
                  amount: lDto.FormatedData.CalculatedPremiumDetails.FinalPremium,
                  data: [
                    {
                      label: "Cash",
                      path: "Cash",
                    },
                    {
                      label: "Cheque",
                      path: "Cheque",
                    },
                  ],
                }}
                OnlinePT={[
                  { label: "Nepal Clearing House", path: "NepalClearingHouse" },
                  { label: "e-Seva", path: "e-Seva" },
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

const getOnNextClick = async ({ activeStep, dto, setDto, setBackDropFlag }) => {
  let fun = false;
  const lDto = dto;
  const tDto = { ...dto };
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // const InsuredDetails =
  // tDto,
  //   "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails"
  // );
  // const object = {
  //   name: InsuredDetails.InsuredNameEnglish,
  //   dob: InsuredDetails.MemberDetail.DoB,
  //   gender: InsuredDetails.MemberDetail.GenderEnglish,
  //   emailId: InsuredDetails.EmailAddress,
  //   mobileNumber: InsuredDetails.MobileNumber,
  //   referenceNo: InsuredDetails.CitizenshipNumber,
  //   referenceType: "CitizenshipNumber",
  //   additionalDetails: lDto.  //   addressDto: [
  //     {
  //       userAddressType: "",
  //       userPincodeId: 0,
  //       userCountryId: 0,
  //       userStateId: 0,
  //       userDistrictId: 0,
  //       userCityId: 0,
  //       userAddressLine1: "",
  //       userAddressLine2: "",
  //       userAddressLine3: "",
  //     },
  //   ],
  //   dependentsDto: [
  //     {
  //       name: "",
  //       dob: "",
  //       gender: "",
  //       emailId: "",
  //       mobileNumber: "",
  //       relation: "",
  //     },
  //   ],
  // };
  // objectPath.del(tDto, "FormatedData");

  if (lDto !== null) {
    switch (activeStep) {
      case 0:
        fun = await GenericApi("NepalMotorTW", "NepalTWCalculatePremium", lDto).then(async (x) => {
          if (x.finalResult) {
            lDto.PremiumDetails = x.finalResult;

            lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);

            const res1 = await SaveQuotation(lDto);
            lDto["Quotation No"] = res1.data.quotation.quoteNo;
            setDto({ ...lDto });
            setBackDropFlag(false);
            const fun1 = await swal
              .fire({
                title: "<strong>Quick Quote Premium Breakup</strong>",
                html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%"><tr><td style={{textAlign:"left"}}>GrossPremium</td><td style={{textAlign:"right"}}>रु ${formater.format(
                  x.finalResult.NetPremium
                )}</td></tr><tr><td style={{textAlign:"left"}}>StampDuty</td><td style={{textAlign:"right"}}>रु ${formater.format(
                  x.finalResult.Stampduty
                )}</td></tr><tr><td style={{textAlign:"left"}}>VAT</td><td style={{textAlign:"right"}}>रु ${formater.format(
                  x.finalResult.VAT
                )}</td></tr><tr><td style={{textAlign:"left"}}><b>TotalPremium</b></td><td style={{textAlign:"right"}}><b>रु ${formater.format(
                  x.finalResult.FinalPremium
                )}</b></td></tr></table></div>`,
                showConfirmButton: true,
                confirmButtonText: "Proceed",
                showCancelButton: true,
              })
              .then((resX) => {
                if (resX.isConfirmed) return true;
                return false;
              });
            return fun1;
          }
          return false;
        });

        break;
      case 1:
        fun = true;

        break;
      case 2:
        fun = await GenericApi("NepalMotorTW", "NepalTWCalculatePremium", lDto).then(async (x) => {
          if (x.finalResult) {
            lDto.PremiumDetails = x.finalResult;

            lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
            await QuotationUpdate(lDto);

            lDto.FormatedData.CalculatedPremiumDetails.BasePremium = formater.format(
              x.finalResult.BasePremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.Stampduty = formater.format(
              x.finalResult.Stampduty
            );

            lDto.FormatedData.CalculatedPremiumDetails.AgeofVehicleLoading = formater.format(
              x.finalResult.AgeofVehicleLoading
            );

            lDto.FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase = formater.format(
              x.finalResult.NoClaimDiscountBase
            );

            lDto.FormatedData.CalculatedPremiumDetails.EnvironmentDiscount = formater.format(
              x.finalResult.EnvironmentDiscount
            );

            lDto.FormatedData.CalculatedPremiumDetails.DirectDiscountAmount = formater.format(
              x.finalResult.DirectDiscountAmount
            );

            lDto.FormatedData.CalculatedPremiumDetails.BaseTPRate = formater.format(
              x.finalResult.BaseTPRate
            );

            lDto.FormatedData.CalculatedPremiumDetails.STPremium = formater.format(
              x.finalResult.STPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.NoClaimDiscountTP = formater.format(
              x.finalResult.NoClaimDiscountTP
            );

            lDto.FormatedData.CalculatedPremiumDetails.NetPremium = formater.format(
              x.finalResult.NetPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.VAT = formater.format(x.finalResult.VAT);

            lDto.FormatedData.CalculatedPremiumDetails.FinalPremium = formater.format(
              x.finalResult.FinalPremium
            );
            lDto.FinalPremium = formater.format(x.finalResult.FinalPremium);

            lDto.FormatedData.CalculatedPremiumDetails.ExcessDiscount = formater.format(
              x.finalResult.ExcessDiscount
            );

            lDto.FormatedData.CalculatedPremiumDetails.ApplicableAdditionalPremium =
              formater.format(x.finalResult.ApplicableAdditionalPremium);

            lDto.FormatedData.CalculatedPremiumDetails.RSDMDPremium = parseFloat(
              x.finalResult.RSDMDPremium
            ).toFixed(2);

            lDto.FormatedData.CalculatedPremiumDetails.RiderPillionPremium = parseFloat(
              x.finalResult.RiderPillionPremium
            ).toFixed(2);

            lDto.FormatedData.CalculatedPremiumDetails.Premiumwithloading = formater.format(
              x.finalResult.Premiumwithloading
            );

            lDto.FormatedData.CalculatedPremiumDetails.PremiumafterExcessDiscount = formater.format(
              x.finalResult.PremiumafterExcessDiscount
            );

            lDto.FormatedData.CalculatedPremiumDetails.PremiumafterNCDiscount = formater.format(
              x.finalResult.PremiumafterNCDiscount
            );

            lDto.FormatedData.CalculatedPremiumDetails.PremiumafterEnvDiscount = formater.format(
              x.finalResult.PremiumafterEnvDiscount
            );

            lDto.FormatedData.CalculatedPremiumDetails.MaxBasePremium = formater.format(
              x.finalResult.MaxBasePremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.TotalTPPremium = formater.format(
              x.finalResult.TotalTPPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.PoolPremium = formater.format(
              x.finalResult.PoolPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.CMNetPremium = formater.format(
              x.finalResult.CMNetPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.CMExcNetPremium = formater.format(
              x.finalResult.CMExcNetPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.TPPremium = formater.format(
              x.finalResult.TPPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.TPIncPremium = formater.format(
              x.finalResult.TPIncPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.TotalPremium = formater.format(
              x.finalResult.TotalPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.ClassPremium = formater.format(
              x.finalResult.ClassPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.AdditionalPremium = formater.format(
              x.finalResult.AdditionalPremium
            );

            lDto.FormatedData.CalculatedPremiumDetails.NepalShortRateMotor = formater.format(
              x.finalResult.NepalShortRateMotor
            );

            lDto.FormatedData.CalculatedPremiumDetails.NepalAgeVehicleLoadingTW1 = formater.format(
              x.finalResult.NepalAgeVehicleLoadingTW1
            );

            lDto.FormatedData.CalculatedPremiumDetails.NepalExcessRateTW = formater.format(
              x.finalResult.NepalExcessRateTW
            );

            lDto.FormatedData.CalculatedPremiumDetails.NPNoClaimDiscountTWRate = formater.format(
              x.finalResult.NPNoClaimDiscountTWRate
            );

            lDto.FormatedData.CalculatedPremiumDetails.NepalTPRateTW = formater.format(
              x.finalResult.NepalTPRateTW
            );

            lDto.FormatedData.CalculatedPremiumDetails.NepalBaseRateTW = formater.format(
              x.finalResult.NepalBaseRateTW
            );

            lDto.FormatedData.CalculatedPremiumDetails.PoolPremiumforPDF = formater.format(
              x.finalResult.PoolPremiumforPDF
            );

            lDto.FormatedData.CalculatedPremiumDetails.BasicODPremiumPDF = formater.format(
              x.finalResult.BasicODPremiumPDF
            );

            lDto.FormatedData.CalculatedPremiumDetails.ReceiptPremiumPDF = formater.format(
              x.finalResult.ReceiptPremiumPDF
            );

            lDto.FormatedData.CalculatedPremiumDetails.DirectDiscountPDF = formater.format(
              x.finalResult.DirectDiscountPDF
            );

            lDto.FormatedData.CalculatedPremiumDetails.STPremiumPDF = formater.format(
              x.finalResult.STPremiumPDF
            );

            lDto.FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF = formater.format(
              x.finalResult.RSDMDPremiumPDF
            );

            lDto.FormatedData.CalculatedPremiumDetails.RiderPillionPremiumPDF = formater.format(
              x.finalResult.RiderPillionPremiumPDF
            );

            lDto.FormatedData.CalculatedPremiumDetails.TotalTPPremiumRTPDF = formater.format(
              x.finalResult.TotalTPPremiumRTPDF
            );
            setDto({ ...lDto });
            return true;
          }
          return false;
        });
        break;
      case 3:
        fun = await SaveCreateProposal(tDto).then(async (x) => {
          if (x.data.status === 2) {
            // if (tDto.ExistingDetails") === "No") {
            //   await CreateCustomer(object).then((result) => {
            //     if (result.data.status === 2) {
            //       swal.fire({
            //         icon: "success",
            //         text: result.data.responseMessage,
            //       });
            //     } else {
            //       swal.fire({
            //         icon: "error",
            //         text: "Failed to Capture Customer Details",
            //       });
            //     }
            //   });
            // }
            lDto.FormatedData.ProposalNumber = x.data.proposalNumber;
            lDto.ProposalNo = x.data.proposalNumber;
            setDto({ ...lDto });
            return true;
          }
          return false;
        });

        break;
      case 4:
        fun = swal
          .fire({
            input: "checkbox",
            html: `<div> <img src=${Success} alt="success"></div>`,
            inputPlaceholder: `<b style=font-size:20px;>Proceed to Payment Without Approval</b>`,
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
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Calculate Premium", visible: true },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false },
      };
      break;
    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async () => {
  const mst = mstObj;

  const currentYear = new Date().getFullYear();
  const past30Year = currentYear - 20;
  const yearArr = arrayRange(past30Year, currentYear, 1);
  const yearArrMaster = [];
  yearArr.forEach((x1, i1) => {
    yearArrMaster.push({ mID: i1, mValue: x1.toString() });
  });
  mst.YearofManufacture = yearArrMaster;
  await GetProdPartnermasterData("Class", { FieldName: "Motor" }).then((r) => {
    console.log(r.data, 1111);
    mst.Class1 = r.data;
  });

  await GetNPCommonMaster().then((r) => {
    console.log(r, 2222);
    r.forEach((x) => {
      mst[x.mType] = x.mdata;
    });
  });
  return mst;
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
