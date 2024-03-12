// clientside
import { useEffect, useState, useRef } from "react";
import objectPath from "object-path";
import {
  Grid,
  Stack,
  Typography,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { productList, riskDetails } from "./data/NBTravelJson";
import { useDataController, setGenericPolicyDto } from "../../../../../BrokerPortal/context";
import {
  GetMasterData,
  // getPlanbyProductId,
  getPlanByGroupId,
  getMasterData,
  getCoverBenfitData,
  calculatePremium,
  calculateProposal,
  sendProposalLink,
  CkycResponse,
  GetProdPartnermasterData,
  IsName,
  GetPolicyTripTenureMaster,
  Documentuploadaws,
  makePayment,
  fetchPaymentURL,
  getDisplayNameByProductId,
  GetPolicyDetailsByNumber,
  getProductIdByProductcode,
} from "./data/APIs/NBTravelApi";

import {
  arrayRange,
  diffDaysCalculator,
  IsAlphaSpace,
  IsEmail,
  IsMobileNumber,
  IsPan,
  addDays,
  IsAlphaNum,
  IsPassport,
  AgeCalculator1,
  IsNumeric,
} from "../../../../../../Common/Validations";

import MDButton from "../../../../../../components/MDButton";
import MDBox from "../../../../../../components/MDBox";

let topDto = null;
let topDispatch = null;
const mast = { district: [] };
const mast2 = { city: [] };
const mast3 = { pincode: [] };
const mast11 = { city: [] };
const mast12 = { pincode: [] };
const mast21 = { district: [] };
const mast22 = { city: [] };
const mast23 = { pincode: [] };
const mast31 = { district: [] };

const topFlag = { Kyc: false, SamePath: false, SamePathadd2: false };
const Travelflag = { Kyc: false };

const DocFlag = { pan: false, Passfront: false, Passback: false };

const newflag = { show: false };
const Visibleckycflag = {
  show: false,
  sameshow: true,
  Fathershow: false,
  notfailshow: false,
  permanentshow: false,
  failshow: false,
  addsamediff: false,
  firstfail: true,
};

const clickkycflag = { show: false };
const getProcessSteps = () => {
  const steps = [
    "Quick Quote ",
    "Proposer Details",
    "Insured Details",
    "Other Details",
    "Premium Summary",
    "Payment",
  ];
  return steps;
};

const getPageContent = (activeStep) => {
  const [control, dispatch] = useDataController();
  const [flag, setFlag] = useState({
    TrType: false,
  });
  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;

  useEffect(() => {
    if (DocFlag.Passfront === true && DocFlag.Passback === true) {
      Travelflag.Kyc = true;
    }
    if (objectPath.get(dto, "TripType") === "StudentTravel") {
      flag.TrType = true;
    }
    setFlag({ ...flag });
  }, [genericPolicyDto]);

  const [noOfTravellerAccordians, setNoOfTravellerAccordians] = useState([]);

  useEffect(() => {
    if (genericPolicyDto) {
      if (genericPolicyDto.NOOfTravellingMembers !== "") {
        const tArr1 = [];

        const tArr2 = arrayRange(1, parseInt(genericPolicyDto.NOOfTravellingMembers, 10), 1);

        tArr2.forEach((x) => {
          tArr1.push({ name: `Insured Details ${x}`, visible: true });
        });

        setNoOfTravellerAccordians([...tArr1]);
      }
      topDto = dto;
      topDispatch = dispatch;
    }
  }, [genericPolicyDto]);

  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Plan Details", visible: true },
        { name: "Cover Details", visible: true },
        { name: "Trip Details", visible: true },
        { name: "Traveler details", visible: true },
        { name: "Proposer Details", visible: true },
        { name: "Medical Declaration", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "Proposer Details", visible: true },
        { name: "E-KYC", visible: true },
        { name: "Communication Details", visible: true },
      ];
      break;
    case 2:
      steps = [...noOfTravellerAccordians];
      break;
    case 3:
      steps = [
        { name: "Nominee details", visible: true },
        { name: "University Details ", visible: flag.TrType },
        { name: "Sponsor Details ", visible: flag.TrType },
      ];
      break;
    case 4:
      steps = [{ name: "Premium Summary", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

const getSectionContent = (activeStep) => {
  const Navigate = useNavigate();
  const [masters, setmasters] = useState({
    Salutation: [],
    Gender: [],
    Geography: [],
    Plans: [],
    SI: [],
    TripType: [],
    Country: [],
    NomineeRelation: [],
    RelationInsured: [],
    ProposerStateList: [],
    ProposerDistrictList: [],
    ProposerCityList: [],
    ProposerPincodeList: [],
    StateList: [],
    RelationwithStudent: [],
    ProposerDistrict1List: [],
    ProposerPincode1List: [],
    ProposerDistrict2List: [],
    ProposerDistrict3List: [],
    ProposerPincode2List: [],
  });

  const NoOfTraveelerArr = [
    { mID: 1, mValue: "1" },
    { mID: 2, mValue: "2" },
    { mID: 3, mValue: "3" },
    { mID: 4, mValue: "4" },
    { mID: 5, mValue: "5" },
    { mID: 6, mValue: "6" },
  ];

  const NoOfTraveelerArr1 = [{ mID: 1, mValue: "1" }];
  // const Navigate = useNavigate();
  // const NationalityList = [{ mValue: "Indian" }];

  const TripDuration = [
    { mID: 30, mValue: "30 days" },
    { mID: 45, mValue: "45 days" },
    { mID: 60, mValue: "60 days" },
    { mID: 90, mValue: "90 days" },
  ];

  const VisaType = [
    { mValue: "Tourist/Vistor Visa" },
    { mValue: "Long term Work Visa(stay more than 6 months)" },
    { mValue: "Permanent Resident Card/Immigrant" },
    { mValue: "Dependent Visa" },
    { mValue: "Diplomatic Visa" },
    { mValue: "Student Visa" },
    { mValue: "Expat(No Visa Required)" },
  ];

  const [control, dispatch] = useDataController();
  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;

  const [flag, setFlag] = useState({
    Aname: false,
    Kyc: false,
    Button: true,
  });
  const { search } = useLocation();
  const [policys, setPolicys] = useState("");
  useEffect(async () => {
    debugger; // eslint-disable-line
    const Policyno = new URLSearchParams(search).get("PolicyNo");
    if (Policyno !== "") {
      const res = await GetPolicyDetailsByNumber(Policyno);
      console.log("what is the response", res);
      console.log("checking policyno node", res.data.Policyno);
      setPolicys(res.data.Policyno);
      console.log("checking policy", policys);
      Travelflag.Kyc = true;
    }
  }, []);

  const [noOfTravellerDatePicker, setNoOfTravellerDatePicker] = useState([]);
  const [noOfTravellerComponents, setNoOfTravellerComponents] = useState([]);

  const onProductSelect = async () => {
    objectPath.set(dto, "ProductName", "TravelAssure");
    // const pid1 = await getProductIdByProductcode("TravelAssure");
    const pid2 = await getProductIdByProductcode("Asiapacific");
    // const pid3 = await getProductIdByProductcode("WorldWide");
    // const pid4 = await getProductIdByProductcode("WorldWide Excl USA-Canada");
    // const pid5 = await getProductIdByProductcode("Student Travel");

    console.log("qqqq", pid2.productId);
    // const res1 = await getDisplayNameByProductId(pid1.productId);
    const res2 = await getDisplayNameByProductId(pid2.productId);
    // const res3 = await getDisplayNameByProductId(pid3.productId);
    // const res4 = await getDisplayNameByProductId(pid4.productId);
    // const res5 = await getDisplayNameByProductId(pid5.productId);

    const result = [...res2]; // , ...res3, ...res4, ...res5];
    masters.Plans = result;
    setmasters({ ...masters });
  };
  const CallBenifitdata = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "SumInsured", "");
      setGenericPolicyDto(dispatch, dto);
    }
    objectPath.set(dto, "SumInsured", v.mValue);
    setGenericPolicyDto(dispatch, dto);

    const trip = objectPath.get(dto, "TripType");
    const SII = objectPath.get(dto, "SumInsured");
    const geo = objectPath.get(dto, "Geography");
    const plan = objectPath.get(dto, "Plan");
    // const PlanGroupId = objectPath.get(dto, "Temp.GroupID");
    const tripType = objectPath.get(dto, "TripType");
    if (geo === "APAC") objectPath.set(dto, "ProductCode", "AsiaPacific");
    else if (geo === "WWEU") objectPath.set(dto, "ProductCode", "WorldWide Excl USA-Canada");
    else if (geo === "WWIC") {
      if (
        plan === "Basic Student Travel - WWIC /WWEU" ||
        plan === "Comprehensive Student Travel -WWIC /WWEU"
      ) {
        objectPath.set(dto, "ProductCode", "Student Travel");
      } else objectPath.set(dto, "ProductCode", "WorldWide");
    }
    if (
      trip !== "" &&
      trip !== undefined &&
      SII !== "" &&
      SII !== undefined &&
      geo !== "" &&
      geo !== undefined &&
      plan !== "" &&
      plan !== undefined
    ) {
      const obj1 = {
        productCode: objectPath.get(dto, "ProductCode"),
        planType: plan,
        filterCriteria: [{ SI: SII, Type: tripType, Region: geo, currency: "USD" }],
        isFilterMemberWise: false,
        setBenefitMemberWise: false,
        insurableItems: null,
        // groupId: PlanGroupId,
      };
      const res1 = await getCoverBenfitData(obj1);
      objectPath.set(dto, "Temp.BenifitList", res1.finalResult.benefits);
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const [Ekycjson, setEkycjson] = useState({
    Pan: "",
    dob: "",
    userName: "NIVABUPA",
    password: "M@xbup@!2#",
  });

  const [PanDatajson, setPanDatajson] = useState({
    EIANumber: "",
    Salutation: "",
    FirstName: "",
    Lastname: "",
    MiddleName: "",
    Gender: "",
    AddressLine1: "",
    State1: "",
    City1: "",
    Pincode1: "",
    AddressLine2: "",
    State2: "",
    City2: "",
    Pincode2: "",
  });

  const [Paymentdetailss, setPaymentdetailss] = useState("");
  const [transactionID, settransactionID] = useState();
  const [Successurl, setSuccessurl] = useState();
  const [Failureurl, setFailureurl] = useState();

  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const IsPan1 = (e) => {
    objectPath.set(dto, `ProposerDetails.PanNo`, e.target.value.toUpperCase());
    // const regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    // if (regex.test(e.target.value)) {
    //   return true;
    // }
    // return "Enter a valid PAN number";
    setGenericPolicyDto(dispatch, { ...dto });
  };
  const IsPass = (e, i) => {
    dto.InsurableItem[0].RiskItems[i].PassportNo = e.target.value.toUpperCase();
    setGenericPolicyDto(dispatch, { ...dto });
  };

  // };
  const onStateSelect = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.State", "");
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.District", "");
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.Pincode", "");
    } else {
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.State", v.mValue);
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.District", "");
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.Pincode", "");
      const obj4 = {
        StateID: v.mID,
      };
      const res3 = await GetProdPartnermasterData(698, "NBDistrictMaster", obj4);

      console.log("1234", res3);
      setGenericPolicyDto(dispatch, dto);
      masters.ProposerDistrictList = [...res3];
      mast.district = [...res3];
      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const onState1Select = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "NomineeDetails.0.NomineeState", "");
      objectPath.set(dto, "NomineeDetails.0.NomineeDistrict", "");
      objectPath.set(dto, "NomineeDetails.0.NomineeCity", "");
      objectPath.set(dto, "NomineeDetails.0.NomineePincode", "");
    } else {
      objectPath.set(dto, "NomineeDetails.0.NomineeState", v.mValue);
      objectPath.set(dto, "NomineeDetails.0.NomineeDistrict", "");
      objectPath.set(dto, "NomineeDetails.0.NomineeCity", "");
      objectPath.set(dto, "NomineeDetails.0.NomineePincode", "");
      const obj4 = {
        StateID: v.mID,
      };
      const res3 = await GetProdPartnermasterData(698, "NBDistrictMaster", obj4);

      console.log("1234", res3);
      masters.ProposerDistrict2List = [...res3];
      mast21.district = [...res3];
      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const onState2Select = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "ProposerDetails.PermanentAddress.State", "");
      objectPath.set(dto, "ProposerDetails.PermanentAddress.District", "");
      objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", "");
    } else {
      objectPath.set(dto, "ProposerDetails.PermanentAddress.State", v.mValue);
      objectPath.set(dto, "ProposerDetails.PermanentAddress.District", "");
      objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", "");

      const obj4 = {
        StateID: v.mID,
      };
      const res3 = await GetProdPartnermasterData(698, "NBDistrictMaster", obj4);
      console.log("1234", res3);
      masters.ProposerDistrict3List = [...res3];
      mast31.district = [...res3];
      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const onDistrictSelect = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.District", "");
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.Pincode", "");
    } else {
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.District", v.mValue);
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.Pincode", "");
      const obj2 = {
        DistrictID: v.mID,
      };
      const res5 = await GetProdPartnermasterData(698, "NBCityMaster", obj2);

      console.log("1234", res5);
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.District", v.mValue);
      masters.ProposerDistrictList = [...res5];
      mast2.city = [...res5];
      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const onDistrict1Select = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "ProposerDetails.PermanentAddress.District", "");
      objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", "");
    } else {
      objectPath.set(dto, "ProposerDetails.PermanentAddress.District", v.mValue);
      objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", "");
      const obj2 = {
        DistrictID: v.mID,
      };
      const res5 = await GetProdPartnermasterData(698, "NBCityMaster", obj2);
      console.log("1234", res5);
      objectPath.set(dto, "ProposerDetails.PermanentAddress.District", v.mValue);
      masters.ProposerDistrict1List = [...res5];
      mast11.city = [...res5];
      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const onDistrict2Select = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "NomineeDetails.0.NomineeDistrict", "");
      objectPath.set(dto, "NomineeDetails.0.NomineeCity", "");
      objectPath.set(dto, "NomineeDetails.0.NomineePincode", "");
    } else {
      objectPath.set(dto, "NomineeDetails.0.NomineeDistrict", v.mValue);
      objectPath.set(dto, "NomineeDetails.0.NomineeCity", "");
      objectPath.set(dto, "NomineeDetails.0.NomineePincode", "");
      const obj2 = {
        DistrictID: v.mID,
      };
      const res5 = await GetProdPartnermasterData(698, "NBCityMaster", obj2);
      console.log("1234", res5);
      objectPath.set(dto, "NomineeDetails.0.NomineeDistrict", v.mValue);
      masters.ProposerDistrict3List = [...res5];
      mast22.city = [...res5];
      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const onCitySelect = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.Pincode", "");
    } else {
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.CityDistrict", v.mValue);
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.Pincode", "");
      const obj3 = {
        CityID: v.mID,
      };
      const res6 = await GetProdPartnermasterData(698, "NBPincodeMaster", obj3);
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.CityDistrict", v.mValue);
      console.log("pin", res6);
      masters.ProposerPincodeList = [...res6];
      mast3.pincode = [...res6];
      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const onCity1Select = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", "");
      objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", "");
    } else {
      objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", v.mValue);
      objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", "");
      const obj3 = {
        CityID: v.mID,
      };
      const res6 = await GetProdPartnermasterData(698, "NBPincodeMaster", obj3);
      objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", v.mValue);
      // setGenericPolicyDto(dispatch, dto);
      console.log("pin", res6);
      masters.ProposerPincode1List = [...res6];
      mast12.pincode = [...res6];
      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const onCity2Select = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "NomineeDetails.0.NomineeCity", "");
      objectPath.set(dto, "NomineeDetails.0.NomineePincode", "");
    } else {
      const obj3 = {
        CityID: v.mID,
      };
      const res6 = await GetProdPartnermasterData(698, "NBPincodeMaster", obj3);
      objectPath.set(dto, "NomineeDetails.0.NomineeCity", v.mValue);
      objectPath.set(dto, "NomineeDetails.0.NomineePincode", "");
      console.log("pin", res6);
      masters.ProposerPincode2List = [...res6];
      mast23.pincode = [...res6];
      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const onPincodeSelect = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.Pincode", "");
    } else {
      objectPath.set(dto, "ProposerDetails.CommunicationAddress.Pincode", v.mID);
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const onPincode1Select = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", "");
    } else {
      objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", v.mID);
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const onPincode2Select = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "NomineeDetails.0.NomineePincode", "");
    } else {
      objectPath.set(dto, "NomineeDetails.0.NomineePincode", v.mID);
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const onPlanSelect = async (e, v) => {
    if (v === null) {
      objectPath.set(dto, "Display_Name", "");
      objectPath.set(dto, "Plan", "");
      objectPath.set(dto, "TripType", "");
      objectPath.set(dto, "SumInsured", "");
      objectPath.set(dto, "Geography", "");
      // objectPath.set(dto, "Temp.GroupID", "");
    } else {
      objectPath.set(dto, "Plan", v.groupName);
      objectPath.set(dto, "Display_Name", v.displayName);
      objectPath.set(dto, "TripType", "");
      objectPath.set(dto, "SumInsured", "");
      objectPath.set(dto, "Geography", "");
      // objectPath.set(dto, "Temp.GroupID", v.groupId);
      objectPath.set(dto, "ListOfDestination", []);
      //
      const res2 = await getPlanByGroupId(v.groupId);
      if (res2[1].mdata[0].mValue === "SingleTrip" || res2[1].mdata[0].mValue === "StudentTravel") {
        objectPath.set(dto, "Geography", res2[2].mdata[0].mValue);
      }
      if (res2[1].mdata[0].mValue === "MultiTrip") {
        objectPath.set(dto, "Geography", res2[2].mdata[1].mValue);
      }
      console.log("rreess", res2);
      res2.forEach((item) => {
        if (item.mType === "SI")
          masters.SI = item.mdata.filter(
            (item1, index, self) =>
              index ===
              self.findIndex((obj) => obj.mValue === item1.mValue && obj.mType === item1.mType)
          );
        if (item.mType === "Type")
          masters.TripType = item.mdata.filter(
            (item1, index, self) =>
              index ===
              self.findIndex((obj) => obj.mValue === item1.mValue && obj.mType === item1.mType)
          );

        if (item.mType === "Region")
          masters.Geography = item.mdata.filter(
            (item1, index, self) =>
              index ===
              self.findIndex((obj) => obj.mValue === item1.mValue && obj.mType === item1.mType)
          );
      });
      const geo = objectPath.get(dto, "Geography");
      const res5 = await getMasterData();
      console.log("eee", res5);
      if (geo === "APAC") {
        res5.forEach((item) => {
          if (item.mType === "APAC") {
            masters.Country = item.mdata;
          }
        });
      } else if (geo === "WWIC") {
        res5.forEach((item) => {
          if (item.mType === "Worldwide") {
            masters.Country = item.mdata;
          }
        });
      } else if (geo === "WWEU") {
        res5.forEach((item) => {
          if (item.mType === "Worldwide Excluding US/Canada") {
            masters.Country = item.mdata;
          }
        });
      }

      setmasters({ ...masters });
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const getDatafromPincode = async (Pin) => {
    // debugger;
    const obj2 = {
      Pincode: Pin,
    };
    const res5 = await GetProdPartnermasterData(698, "NBRCityMaster", obj2);
    console.log("gotcity1", res5);

    const city1 = res5[0].mID;
    const city1name = res5[0].mValue;
    console.log("cityname", city1name);

    objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", city1name);
    const obj3 = {
      CityID: city1,
    };
    const res51 = await GetProdPartnermasterData(698, "NBRDistrictMaster", obj3);
    console.log("gotcity1", res51);

    objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", res51[0].mValue);

    const district1 = res51[0].mId;
    const obj5 = {
      DistrictID: district1,
    };

    const res52 = await GetProdPartnermasterData(698, "NBRStateMaster", obj5);
    console.log("gotdistrict", res52);

    objectPath.set(dto, "ProposerDetails.PermanentAddress.District", res52[0].mValue);

    const stateid = res52[0].mID;
    const obj6 = {
      StateID: stateid,
    };

    const res53 = await GetProdPartnermasterData(698, "NBRCountryMaster", obj6);
    objectPath.set(dto, "ProposerDetails.PermanentAddress.State", res53[0].mValue);

    // setGenericPolicyDto(topDispatch, topDto);

    setGenericPolicyDto(topDispatch, { ...dto });
  };
  const AddAddressDetails = async () => {
    if (dto.ProposerDetails.PanNo === "") {
      swal.fire({
        icon: "error",
        text: `Please Provide Pan Number before Initiating KYC `,
        timer: 3000,
        showConfirmButton: false,
      });

      topFlag.Kyc = false;
    }
    if (dto.ProposerDetails.PanNo !== "") {
      clickkycflag.show = true;
      Visibleckycflag.Fathershow = false;
      Visibleckycflag.permanentshow = false;
      Visibleckycflag.show = false;
      // debugger;
      objectPath.set(dto, "Temp.checkedvalueadd01", "No");
      objectPath.set(dto, "Temp.checkedvalueadd02", "No");
      objectPath.set(dto, "Temp.checkedvalueadd03", "No");
      topFlag.Kyc = false;

      Travelflag.Kyc = true;
      objectPath.set(dto, "documentDetails.1.DocName", "");
      objectPath.set(dto, "documentDetails.2.DocName", "");
      Ekycjson.Pan = dto.ProposerDetails.PanNo;
      const olddate = dto.ProposerDetails.DOB;
      const newdate = olddate.split("-").reverse().join("-");
      Ekycjson.dob = newdate;
      setEkycjson(() => ({ ...Ekycjson }));
      console.log("newckycjson", Ekycjson);
      const PanData = await CkycResponse(Ekycjson);
      console.log("kkkk", PanData);

      if (PanData.data.Status === "" || PanData.data.Status === null) {
        console.log("aaaa");
        Visibleckycflag.show = true;

        Visibleckycflag.sameshow = true;

        topFlag.Kyc = false;

        Visibleckycflag.Fathershow = true;

        topFlag.SamePath = false;
        topFlag.SamePathadd2 = false;

        objectPath.set(dto, "Temp.Salutation", "");
        objectPath.set(dto, "Temp.FirstName", "");
        objectPath.set(dto, "Temp.LastName", "");
        objectPath.set(dto, "Temp.MiddleName", "");
        objectPath.set(dto, "Temp.Gender", "");
        objectPath.set(dto, "Temp.Address1", "");
        objectPath.set(dto, "Temp.State", "");
        objectPath.set(dto, "Temp.City", "");
        objectPath.set(dto, "Temp.PinCode", "");
        objectPath.set(dto, "Temp.Address2", "");
        objectPath.set(dto, "ProposerDetails.CKYCNo", "");

        objectPath.set(dto, "ProposerDetails.PermanentAddress.AddressLine1", "");
        objectPath.set(dto, "ProposerDetails.PermanentAddress.District", "");
        objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", "");
        // objectPath.set(dto, "ProposerDetails.PermanentAddress.State", "");
        objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", "");
        // dto.ProposerDetails.PermanentAddress.State = dto.ProposerDetails.CommunicationAddress.State;
        Visibleckycflag.notfailshow = false;

        Visibleckycflag.permanentshow = true;

        Visibleckycflag.failshow = true;

        // objectPath.set(dto, "Temp.Address2", PanData.data.Address2);

        setGenericPolicyDto(topDispatch, topDto);

        swal.fire({
          icon: "error",
          text: `No cKYC details found for the given proposer`,
          confirmButtonColor: "#0079CE",
        });

        clickkycflag.show = false;
      }
      if (
        (PanData.data.CKYCID === null && PanData.data.Status === "Failed") ||
        PanData.data.Status === null
      ) {
        // pan wrong
        console.log("aaaa");
        Visibleckycflag.show = true;

        Visibleckycflag.sameshow = true;

        topFlag.Kyc = false;

        Visibleckycflag.Fathershow = true;

        topFlag.SamePath = false;
        topFlag.SamePathadd2 = false;

        objectPath.set(dto, "Temp.Salutation", "");
        objectPath.set(dto, "Temp.FirstName", "");
        objectPath.set(dto, "Temp.LastName", "");
        objectPath.set(dto, "Temp.MiddleName", "");
        objectPath.set(dto, "Temp.Gender", "");
        objectPath.set(dto, "Temp.Address1", "");
        objectPath.set(dto, "Temp.State", "");
        objectPath.set(dto, "Temp.City", "");
        objectPath.set(dto, "Temp.PinCode", "");
        objectPath.set(dto, "Temp.Address2", "");
        objectPath.set(dto, "ProposerDetails.CKYCNo", "");

        Visibleckycflag.permanentshow = true;

        Visibleckycflag.failshow = true;

        // objectPath.set(dto, "Temp.Address2", PanData.data.Address2);

        setGenericPolicyDto(topDispatch, topDto);

        swal.fire({
          icon: "error",
          text: `No cKYC details found for the given proposer`,
          confirmButtonColor: "#0079CE",
          // confirmButtonColor: "#000000",
        });

        clickkycflag.show = false;
      }

      if (PanData.data.Status === "Failed" || PanData.data.Status === null) {
        // dob wrong
        console.log("aaaa");
        Visibleckycflag.show = true;

        Visibleckycflag.sameshow = true;

        topFlag.Kyc = false;

        Visibleckycflag.Fathershow = true;

        topFlag.SamePath = false;
        topFlag.SamePathadd2 = false;

        objectPath.set(dto, "Temp.Salutation", "");
        objectPath.set(dto, "Temp.FirstName", "");
        objectPath.set(dto, "Temp.LastName", "");
        objectPath.set(dto, "Temp.MiddleName", "");
        objectPath.set(dto, "Temp.Gender", "");
        objectPath.set(dto, "Temp.Address1", "");
        objectPath.set(dto, "Temp.State", "");
        objectPath.set(dto, "Temp.City", "");
        objectPath.set(dto, "Temp.PinCode", "");
        objectPath.set(dto, "Temp.Address2", "");
        objectPath.set(dto, "ProposerDetails.CKYCNo", "");

        Visibleckycflag.permanentshow = true;

        Visibleckycflag.failshow = true;

        // objectPath.set(dto, "Temp.Address2", PanData.data.Address2);

        setGenericPolicyDto(topDispatch, topDto);

        swal.fire({
          icon: "error",
          text: `No cKYC details found for the given proposer`,
          confirmButtonColor: "#0079CE",
        });

        clickkycflag.show = false;
      } else {
        clickkycflag.show = false;
        swal.fire({
          icon: "success",
          text: "cKYC has been initiated successfully",
          confirmButtonColor: "#0079CE",
        });
        topFlag.Kyc = true;
        objectPath.set(topDto, "ProposerDetails.CKYCNo", PanData.data.CKYCID);
        // Visibleckycflag.notfailshow = true;
        setGenericPolicyDto(topDispatch, topDto);

        // Visibleckycflag.notfailshow = false;
        Visibleckycflag.firstfail = false;
        Travelflag.Kyc = true;
        objectPath.set(dto, "Temp.Salutation", PanData.data.Gender);
        objectPath.set(dto, "Temp.FirstName", PanData.data.FirstName);
        objectPath.set(dto, "Temp.LastName", PanData.data.LastName);
        objectPath.set(dto, "Temp.MiddleName", PanData.data.MiddleName);
        objectPath.set(dto, "Temp.Gender", PanData.data.Gender);
        objectPath.set(dto, "Temp.Address1", PanData.data.Address1);

        objectPath.set(dto, "Temp.City1", PanData.data.PerCity);
        // objectPath.set(dto, "Temp.State1", PanData.data.PerState);
        objectPath.set(dto, "Temp.PinCode1", PanData.data.PerPinCode);

        objectPath.set(dto, "Temp.Address2", PanData.data.Address2);
        objectPath.set(dto, "Temp.PinCode2", PanData.data.PinCode);
        objectPath.set(dto, "Temp.State2", PanData.data.State);
        objectPath.set(dto, "Temp.City2", PanData.data.City);

        // objectPath.set(dto, "Temp.Address2", "Address2");

        const chkpin01 = objectPath.get(dto, `Temp.PinCode1`);
        const chck01 = await getDatafromPincode(chkpin01);

        console.log(chck01);
        objectPath.set(dto, "Temp.State1", dto.ProposerDetails.PermanentAddress.State);
        setGenericPolicyDto(topDispatch, topDto);
        setPanDatajson(() => ({ ...PanDatajson }));
        console.log("eianumber", PanDatajson);

        // const addres01same = objectPath.get(dto, "Temp.checkedvalueadd01");

        // const addres02same = objectPath.get(dto, "Temp.checkedvalueadd02");

        const kycadd01 = objectPath.get(dto, "Temp.Address1");

        const kycadd02 = objectPath.get(dto, "Temp.Address2");
        // const kycadd02 = objectPath.get(dto, "Address2");

        if (kycadd01 === kycadd02) {
          topFlag.SamePath = true;

          dto.ProposerDetails.PermanentAddress.AddressLine1 = kycadd01;
          topFlag.SamePathadd2 = false;

          setGenericPolicyDto(topDispatch, topDto);
        }
        if (kycadd01 !== kycadd02) {
          topFlag.SamePath = true;
          topFlag.SamePathadd2 = true;

          Visibleckycflag.addsamediff = true;

          setGenericPolicyDto(topDispatch, topDto);
        }
      }
      objectPath.set(topDto, "ProductName", "TravelAssure");
      setGenericPolicyDto(topDispatch, topDto);

      // if (PanData.data.CKYCID !== null && PanData.data.Status === "Success") {
      //   swal.fire({
      //     icon: "success",
      //     text: "cKYC has been initiated successfully",
      //     confirmButtonColor: "#0079CE",
      //   });
      // }
      // if (
      //   (PanData.data.CKYCID !== null && PanData.data.Status === "Failed") ||
      //   PanData.data.Status === null
      // ) {
      //   swal.fire({
      //     icon: "error",
      //     text: "Unable to initiate cKYC, please enter communication details",
      //     confirmButtonColor: "#0079CE",
      //   });
      // }
    }
    //
  };

  const ri = objectPath.get(dto, "InsurableItem.0.RiskItems");
  const onClickAllyesOrno = (e, v, p) => {
    dto.InsurableItem[0].RiskItems[p].Clickyesorno = v;

    ri.forEach((x, o) => {
      if (o === p) {
        console.log("ssssss", p);
        x.Questionaire.forEach((x1, i1) => {
          if (i1 !== 7) {
            objectPath.set(dto, `InsurableItem.0.RiskItems.${p}.Questions.${i1}.Answer`, v);
          }
        });
      }
    });

    setGenericPolicyDto(dispatch, { ...dto });
  };

  const checkLeap = (psd1) => {
    console.log("qqq", psd1);
    const year = Number(psd1[0]);
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 366;
    }
    return 365;
  };

  const UploadDocument = async (file, type) => {
    const formData = new FormData();
    formData.append(file.name, file, file.name);
    const uploadres = await Documentuploadaws(formData);
    console.log("111", uploadres);
    if (uploadres.status === 1) {
      swal.fire({
        icon: "success",
        text: `Document Uploaded Successfully`,
        confirmButtonColor: "#0079CE",
      });
    }
    if (type === "_Pan") {
      DocFlag.pan = true;
      objectPath.set(dto, "documentDetails.0.DocName", uploadres.fileName);
      objectPath.set(dto, "documentDetails.0.DocId", uploadres.docid);
      setGenericPolicyDto(topDispatch, { ...dto });
    }

    if (type === "_PassportFront") {
      DocFlag.Passfront = true;
      objectPath.set(dto, "documentDetails.1.DocName", uploadres.fileName);
      objectPath.set(dto, "documentDetails.1.DocId", uploadres.docid);
      setGenericPolicyDto(topDispatch, { ...dto });
    }
    if (type === "_PassportBack") {
      DocFlag.Passback = true;
      objectPath.set(dto, "documentDetails.2.DocName", uploadres.fileName);
      objectPath.set(dto, "documentDetails.2.DocId", uploadres.docid);
      setGenericPolicyDto(topDispatch, { ...dto });
    }
  };
  const handleFileUpload = async (event, type) => {
    await UploadDocument(event.target.files[0], type);
    console.log("files", event.target.files[0]);
  };

  const handleFiledelete = async (event, type) => {
    if (type === "_Pan") {
      ref2.current.value = "";
      objectPath.set(dto, "documentDetails.0.DocName", "");

      objectPath.set(dto, "documentDetails.0.DocId", "");
      setGenericPolicyDto(topDispatch, { ...dto });
      DocFlag.pan = false;
    }

    if (type === "_PassportFront") {
      ref3.current.value = "";
      objectPath.set(dto, "documentDetails.1.DocName", "");

      objectPath.set(dto, "documentDetails.1.DocId", "");
      setGenericPolicyDto(topDispatch, { ...dto });
      DocFlag.Passfront = false;
    }

    if (type === "_PassportBack") {
      ref.current.value = "";
      objectPath.set(dto, "documentDetails.2.DocName", "");

      objectPath.set(dto, "documentDetails.2.DocId", "");
      setGenericPolicyDto(topDispatch, { ...dto });
      DocFlag.Passback = false;
    }
  };
  const TType = objectPath.get(dto, "TripType");
  const onPolicySDate = (e, v) => {
    objectPath.set(dto, "PolicyStartDate", v);
    objectPath.set(dto, "TripStartDate", v);
    setGenericPolicyDto(dispatch, { ...dto });
  };

  const onTripduration = (e, v) => {
    if (TType === "MultiTrip") {
      console.log("trip", v);
      objectPath.set(dto, `TripDuration`, v.mValue);
      objectPath.set(dto, `NOOfDays`, v.mID);
    }
    if (TType === "StudentTravel") {
      objectPath.set(dto, "TripDuration", v.mValue);
      objectPath.set(dto, `NOOfDays`, v.mID);
      console.log("mID", v.mID);
      const days1 = v.mID;
      const TSD = objectPath.get(dto, "TripStartDate").split("-");
      const nod1 = addDays(`${TSD[1]}-${TSD[2]}-${TSD[0]}`, days1).split("-");
      objectPath.set(dto, "TripEndDate", `${nod1[2]}-${nod1[0]}-${nod1[1]}`);
      objectPath.set(dto, "PolicyEndDate", `${nod1[2]}-${nod1[0]}-${nod1[1]}`);
    }
    setGenericPolicyDto(dispatch, { ...dto });
  };

  const onTravellerDOB = (e, v, i1) => {
    objectPath.set(dto, `InsurableItem.0.RiskItems.${i1}.DOB`, v);
    const EDate = objectPath.get(dto, `PolicyStartDate`).split("-");
    const PDATE = `${EDate[1]}-${EDate[2]}-${EDate[0]}`;
    const SSDate = objectPath.get(dto, `TripStartDate`).split("-");
    const TDATE = `${SSDate[1]}-${SSDate[2]}-${SSDate[0]}`;
    if (TType === "MultiTrip") {
      // const NODate = diffDaysCalculator(new Date(e), new Date(PDATE));
      // const age = parseInt(NODate / 365.25, 10);
      const age = AgeCalculator1(new Date(e), new Date(PDATE));
      // const age = Math.round(NODate / 365.25);
      objectPath.set(dto, `Temp.Age${i1}`, age);
    } else if (TType === "SingleTrip" || TType === "StudentTravel") {
      // const NODate = diffDaysCalculator(new Date(e), new Date(TDATE));
      // const age = Math.round(NODate / 365.25);
      // const age = parseInt(NODate / 365.25, 10);
      const age = AgeCalculator1(new Date(e), new Date(TDATE));
      objectPath.set(dto, `Temp.Age${i1}`, age);
    }

    setGenericPolicyDto(dispatch, { ...dto });
  };

  useEffect(async () => {
    if (activeStep === 0) {
      if (masters.Plans.length === 0) {
        onProductSelect();
      }
    }

    if (genericPolicyDto) {
      const addres01same = objectPath.get(dto, "Temp.checkedvalueadd01");
      const addres02same = objectPath.get(dto, "Temp.checkedvalueadd02");
      // const addres32same = objectPath.get(dto, "Temp.checkedvalueadd03");

      if (addres01same === "Yes") {
        dto.ProposerDetails.PermanentAddress.Pincode = objectPath.get(dto, "Temp.PinCode1");
        Visibleckycflag.permanentshow = true;
        setGenericPolicyDto(dispatch, dto);
        Visibleckycflag.permanentshow = true;
      }
      if (addres02same === "Yes") {
        dto.ProposerDetails.PermanentAddress.AddressLine1 = objectPath.get(dto, "Temp.Address2");
        dto.ProposerDetails.PermanentAddress.Pincode = objectPath.get(dto, "Temp.PinCode2");
        Visibleckycflag.notfailshow = true;
        setGenericPolicyDto(dispatch, dto);
      }
      // if (addres02same === "No") {
      //   dto.ProposerDetails.PermanentAddress.AddressLine1 = "";
      // }

      setGenericPolicyDto(dispatch, dto);
      if (
        objectPath.get(dto, "PolicyStartDate") !== "" &&
        objectPath.get(dto, "PolicyStartDate") !== undefined &&
        objectPath.get(dto, "TripType") === "MultiTrip"
      ) {
        const psd1 = objectPath.get(dto, "PolicyStartDate").split("-");
        const days = checkLeap(psd1);
        const nod1 = addDays(`${psd1[1]}-${psd1[2]}-${psd1[0]}`, days).split("-");
        objectPath.set(dto, "PolicyEndDate", `${nod1[2]}-${nod1[0]}-${nod1[1]}`);
        objectPath.set(dto, "TripEndDate", `${nod1[2]}-${nod1[0]}-${nod1[1]}`);
      }
      // commented for show
      if (
        objectPath.get(dto, "NomineeDetails.0.TemporaryNomineeAge") >= 0 &&
        objectPath.get(dto, "NomineeDetails.0.TemporaryNomineeAge") < 18 &&
        objectPath.get(dto, "NomineeDetails.0.TemporaryNomineeAge") !== undefined
      ) {
        flag.Aname = true;
      }
      setFlag({ ...flag });

      const NOTravs = objectPath.get(dto, "NOOfTravellingMembers");
      const RSI = objectPath.get(dto, "InsurableItem.0.RiskItems");
      if (
        NOTravs !== "" &&
        NOTravs !== undefined &&
        parseInt(NOTravs, 10) !== noOfTravellerDatePicker.length
      ) {
        const tArr3 = [];

        const tArr2 = arrayRange(1, parseInt(NOTravs, 10), 1);
        tArr2.forEach(() => {
          tArr3.push({ ...riskDetails });
        });
        if (parseInt(NOTravs, 10) !== RSI.length)
          objectPath.set(dto, "InsurableItem.0.RiskItems", [...tArr3]);
        setGenericPolicyDto(dispatch, dto);
      }
      if (NOTravs !== "" && NOTravs !== undefined) {
        const tArr1 = [];
        const tArr4 = [];
        const tArr2 = arrayRange(1, parseInt(NOTravs, 10), 1);
        tArr2.forEach((x, i) => {
          tArr1.push(
            {
              type: "MDDatePicker",
              visible:
                objectPath.get(dto, "TripType") === "SingleTrip" ||
                objectPath.get(dto, "TripType") === "MultiTrip",
              label: `Traveller ${x} DOB`,
              spacing: 3,
              value: `InsurableItem.0.RiskItems.${i}.DOB`,
              dateFormat: "Y-m-d",
              required: true,
              maxDate: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`,
              minDate: `${new Date().getFullYear() - 70}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`,
              customOnChange: (e, v) => onTravellerDOB(e, v, i),
            },
            {
              type: "MDDatePicker",
              visible: objectPath.get(dto, "TripType") === "StudentTravel",
              label: `Traveller ${x} DOB`,
              spacing: 3,
              value: `InsurableItem.0.RiskItems.${i}.DOB`,
              dateFormat: "Y-m-d",
              required: true,
              maxDate: `${new Date().getFullYear() - 12}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`,
              minDate: `${new Date().getFullYear() - 60}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`,
              customOnChange: (e, v) => onTravellerDOB(e, v, i),
            },
            {
              type: "Input",
              required: true,
              label: `Traveller ${x} Age`,
              visible: true,
              // disableOnReset: true,
              value: `Temp.Age${i}`,
              spacing: 3,
              InputProps: { disabled: true },
            }
          );
          tArr4.push([
            {
              type: "Input",
              required: true,
              label: "Name",
              visible: true,
              value: `InsurableItem.0.RiskItems.${i}.Name`,
              onChangeFuncs: [IsName],
            },
            {
              type: "AutoComplete",
              label: " Gender",
              visible: true,
              value: `InsurableItem.0.RiskItems.${i}.Gender`,
              options: masters.Gender,
              // required: true,
            },
            {
              type: "MDDatePicker",
              required: true,
              label: "Date of Birth",
              visible: true,
              value: `InsurableItem.0.RiskItems.${i}.DOB`,
              dateFormat: "Y-m-d",
              disableOnReset: true,
              InputProps: { disabled: true },
            },
            {
              type: "Input",
              required: true,
              label: "Age",
              visible: true,
              disableOnReset: true,
              value: `Temp.Age${i}`,
              InputProps: { disabled: true },
            },
            {
              type: "AutoComplete",
              required: true,
              label: "Relationship with Proposer",
              value: `InsurableItem.0.RiskItems.${i}.relationShipToProposer`,
              visible: true,
              options: masters.RelationInsured,
            },
            {
              type: "Input",
              required: true,
              label: "Passport Number",
              value: `InsurableItem.0.RiskItems.${i}.PassportNo`,
              visible: true,
              customOnChange: (e) => IsPass(e, i),
              onBlurFuncs: [IsPassport],
              InputProps: { maxLength: 8 },
            },
            {
              type: "AutoComplete",
              // required: true,
              label: "Visa Type",
              value: `InsurableItem.0.RiskItems.${i}.VisaType`,
              visible: true,
              options: VisaType,
            },
            {
              type: "Input",
              required: true,
              label: "Nationality",
              value: `InsurableItem.0.RiskItems.${i}.Nationality`,
              visible: true,
              disableOnReset: true,
              InputProps: { disabled: true },
            },
            {
              type: "RadioGroup",
              // required: true,
              justifyContent: "space-between",
              visible: true,
              radioLabel: {
                label: "Click Yes or No",
                labelVisible: true,
              },
              radioList: [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ], // value: `InsurableItem.0.RiskItems.${i}.Questionaire.0.Answer`, // value: ` ClickYesorNo`,
              value: `InsurableItem.0.RiskItems.${i}.Clickyesorno`,
              spacing: 12,
              customOnChange: (e, v) => onClickAllyesOrno(e, v, i),
            },
            {
              type: "RadioGroup",
              justifyContent: "space-between",
              required: true,
              visible: true,
              radioLabel: {
                label:
                  "Heart disease like Heart attack,Heart faliure,lsechemic heart disease or Coronary heart disease,Angina ect. ",
                labelVisible: true,
              },
              radioList: [
                { label: "Yes", value: "Yes" },
                { label: "No ", value: "No" },
              ],
              value: `InsurableItem.0.RiskItems.${i}.Questions.0.Answer`,
              spacing: 12,
            },
            {
              type: "RadioGroup",
              required: true,
              justifyContent: "space-between",
              visible: true,
              radioLabel: {
                label: "Tumor, Cancer of any organ,Leukemia,Lymphoma,Sarcoma ",
                labelVisible: true,
              },
              radioList: [
                { label: "Yes", value: "Yes" },
                { label: "No ", value: "No" },
              ],
              value: `InsurableItem.0.RiskItems.${i}.Questions.1.Answer`,
              spacing: 12,
            },
            {
              type: "RadioGroup",
              required: true,
              justifyContent: "space-between",
              visible: true,
              radioLabel: {
                label: "Major organ failure (Kidney,Liver,Heart,Lungs etc.)",
                labelVisible: true,
              },
              radioList: [
                { label: "Yes", value: "Yes" },
                { label: "No ", value: "No" },
              ],
              value: `InsurableItem.0.RiskItems.${i}.Questions.2.Answer`,
              spacing: 12,
            },
            {
              type: "RadioGroup",
              required: true,
              justifyContent: "space-between",
              visible: true,
              radioLabel: {
                label: "Stroke,Encephalopathy, Brain abscess, or any neurological disease",
                labelVisible: true,
              },
              radioList: [
                { label: "Yes", value: "Yes" },
                { label: "No ", value: "No" },
              ],
              value: `InsurableItem.0.RiskItems.${i}.Questions.3.Answer`,
              spacing: 12,
            },
            {
              type: "RadioGroup",
              required: true,
              justifyContent: "space-between",
              visible: true,
              radioLabel: {
                label: "Pulmonary fibrosis,collapse of lungs or Interstital lung disease (ILD)",
                labelVisible: true,
              },
              radioList: [
                { label: "Yes", value: "Yes" },
                { label: "No ", value: "No" },
              ],
              value: `InsurableItem.0.RiskItems.${i}.Questions.4.Answer`,
              spacing: 12,
            },
            {
              type: "RadioGroup",
              required: true,
              justifyContent: "space-between",
              visible: true,
              radioLabel: {
                label: "Hepatitis B or C, Chronic liver disease,Crohn's disease,Ulcerative colitis",
                labelVisible: true,
              },
              radioList: [
                { label: "Yes", value: "Yes" },
                { label: "No ", value: "No" },
              ],
              value: `InsurableItem.0.RiskItems.${i}.Questions.5.Answer`,
              spacing: 12,
            },
            {
              type: "RadioGroup",
              required: true,
              justifyContent: "space-between",
              visible: true,
              radioLabel: {
                label: "Any anaemia other than iron deficiency anaemia",
                labelVisible: true,
              },
              radioList: [
                { label: "Yes", value: "Yes" },
                { label: "No ", value: "No" },
              ],
              value: `InsurableItem.0.RiskItems.${i}.Questions.6.Answer`,
              spacing: 12,
            },

            {
              type: "RadioGroup",
              required: true,
              justifyContent: "space-between",
              visible: true,
              radioLabel: {
                label: "Any other medical details/declarations",
                labelVisible: true,
              },
              radioList: [
                { label: "Yes", value: "Yes" },
                { label: "No ", value: "No" },
              ],
              value: `InsurableItem.0.RiskItems.${i}.Questions.7.Answer`,
              spacing: 12,
            },
            {
              type: "Input",
              required: true,
              spacing: 6,
              label: "Any other medical details/declarations",
              visible:
                objectPath.get(dto, `InsurableItem.0.RiskItems.${i}.Questions.7.Answer`) === "Yes",
              value: `Temp.otherdetails${i}`,
            },
          ]);
        });

        setNoOfTravellerDatePicker([...tArr1]);
        setNoOfTravellerComponents([...tArr4]);
      }

      // dto.ProposerDetails.PermanentAddress.State = dto.ProposerDetails.CommunicationAddress.State;
      // dto.NomineeDetails[0].NomineeState = dto.ProposerDetails.CommunicationAddress.State;

      const flagsflag = objectPath.get(dto, "Temp.checkedvalue");

      if (flagsflag === "Yes") {
        newflag.show = true;
      }

      if (flagsflag === "No") {
        newflag.show = false;
      }

      setGenericPolicyDto(dispatch, dto);
    }
  }, [genericPolicyDto]);
  // const TType = objectPath.get(dto, "TripType");
  const onSameAddress = (e) => {
    console.log("eeeeeeeeee", e);
    objectPath.set(dto, "ProposerDetails.SameasCommunicationAddress", e.target.value);

    const SAddress = objectPath.get(dto, "ProposerDetails.SameasCommunicationAddress");
    if (SAddress === "Yes") {
      dto.ProposerDetails.PermanentAddress.AddressLine1 =
        dto.ProposerDetails.CommunicationAddress.AddressLine1;
      dto.ProposerDetails.PermanentAddress.AddressLine2 =
        dto.ProposerDetails.CommunicationAddress.AddressLine2;
      dto.ProposerDetails.PermanentAddress.AddressLine3 =
        dto.ProposerDetails.CommunicationAddress.AddressLine3;
      dto.ProposerDetails.PermanentAddress.Pincode =
        dto.ProposerDetails.CommunicationAddress.Pincode;
      dto.ProposerDetails.PermanentAddress.CityDistrict =
        dto.ProposerDetails.CommunicationAddress.CityDistrict;
      dto.ProposerDetails.PermanentAddress.District =
        dto.ProposerDetails.CommunicationAddress.District;

      dto.ProposerDetails.PermanentAddress.State = dto.ProposerDetails.CommunicationAddress.State;
    } else {
      dto.ProposerDetails.PermanentAddress.AddressLine1 = "";
      dto.ProposerDetails.PermanentAddress.AddressLine2 = "";
      dto.ProposerDetails.PermanentAddress.AddressLine3 = "";
      dto.ProposerDetails.PermanentAddress.Pincode = "";
      dto.ProposerDetails.PermanentAddress.CityDistrict = "";
      dto.ProposerDetails.PermanentAddress.District = "";
      dto.ProposerDetails.PermanentAddress.State = "";
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const onNomAddress = (e) => {
    console.log("eeeeeeeeee", e);
    objectPath.set(dto, "NomineeDetails.0.SameasCommunicationAddress", e.target.value);

    const SNAddress = objectPath.get(dto, "NomineeDetails.0.SameasCommunicationAddress");

    if (SNAddress === "Yes") {
      dto.NomineeDetails[0].NomineeAddressLine1 =
        dto.ProposerDetails.CommunicationAddress.AddressLine1;
      dto.NomineeDetails[0].NomineeAddressLine2 =
        dto.ProposerDetails.CommunicationAddress.AddressLine2;
      dto.NomineeDetails[0].NomineeAddressLine3 =
        dto.ProposerDetails.CommunicationAddress.AddressLine3;
      dto.NomineeDetails[0].NomineePincode = dto.ProposerDetails.CommunicationAddress.Pincode;
      dto.NomineeDetails[0].NomineeCity = dto.ProposerDetails.CommunicationAddress.CityDistrict;
      dto.NomineeDetails[0].NomineeState = dto.ProposerDetails.CommunicationAddress.State;
      dto.NomineeDetails[0].NomineeDistrict = dto.ProposerDetails.CommunicationAddress.District;
    } else {
      dto.NomineeDetails[0].NomineeAddressLine1 = "";
      dto.NomineeDetails[0].NomineeAddressLine2 = "";
      dto.NomineeDetails[0].NomineeAddressLine3 = "";
      dto.NomineeDetails[0].NomineePincode = "";
      dto.NomineeDetails[0].NomineeCity = "";
      dto.NomineeDetails[0].NomineeDistrict = "";
      dto.NomineeDetails[0].NomineeState = "";
    }
    if (dto.documentDetails[1].DocName === "" && dto.documentDetails[2].DocName === "") {
      objectPath.set(dto, "documentDetails", []);
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const settripdatefunc = (e, v) => {
    console.log("1111111111", e);
    console.log("2222222222", v);
    if (v === "") {
      objectPath.set(dto, "PolicyEndDate", "");
      objectPath.set(dto, "TripEndDate", "");
      objectPath.set(dto, "NOOfDays", "");
    } else {
      objectPath.set(dto, "TripEndDate", v);
      objectPath.set(dto, "PolicyEndDate", dto.TripEndDate);

      const TSD = objectPath.get(dto, "TripStartDate");
      const TED = objectPath.get(dto, "TripEndDate");

      if (TSD !== undefined && TSD !== "" && TED !== undefined && TED !== "") {
        const NOD = diffDaysCalculator(new Date(TSD), new Date(TED)) + 1;
        objectPath.set(dto, "NOOfDays", NOD);
        console.log("noofdays", NOD);
      }

      if (dto.NOOfDays > 180) {
        swal.fire({
          icon: "error",
          text: " Maximum limit of travel days is 180 days ",
          timer: 3000,
          showConfirmButton: false,
        });

        objectPath.set(dto, "PolicyEndDate", "");
        objectPath.set(dto, "TripEndDate", "");
        objectPath.set(dto, "NOOfDays", "");

        setGenericPolicyDto(dispatch, dto);
      }
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const settripstartdatefunc = (e, v) => {
    console.log("1111111111", e);
    console.log("2222222222", v);
    if (v === "") {
      objectPath.set(dto, "PolicyStartDate", "");
      objectPath.set(dto, "TripStartDate", "");
    } else {
      objectPath.set(dto, "TripStartDate", v);
      objectPath.set(dto, "PolicyStartDate", dto.TripStartDate);
    }
    objectPath.set(dto, "NOOfDays", "");
    objectPath.set(dto, "TripEndDate", "");

    setGenericPolicyDto(dispatch, { ...dto });
  };
  const [, setisSendpaymentlinkdone] = useState(false);

  // const onSendProposalLink = async () => {
  //   // objectPath.set(dto, "PayType", false);
  //   localStorage.setItem("patmentMethodType", "false");
  //   const link = await sendProposalLink(
  //     // objectPath.get(topDto, "ProposalNo"),
  //     objectPath.get(dto, "ProposalNo"),
  //     objectPath.get(dto, "ProposerDetails.EmailId")
  //   );
  //   debugger; // eslint-disable-line
  //   console.log("link", link);
  //   if (link.status === 1) {
  //     swal.fire({
  //       icon: "success",
  //       text: "Payment link has been shared with customer",
  //       confirmButtonColor: "#0079CE",
  //     });
  //   }
  //   if (link.status !== 1) {
  //     swal.fire({
  //       icon: "error",
  //       text: "Failed to sent Email",
  //       confirmButtonColor: "#0079CE",
  //     });
  //   }
  //   // setGenericPolicyDto(dispatch, { ...dto });
  // };

  // const onProceedtoPayment = async () => {
  //   Navigate("/ReyzorPay");
  // };
  const onSendProposalLink = async () => {
    // objectPath.set(dto, "PayType", false);
    localStorage.setItem("patmentMethodType", "false");
    const link = await sendProposalLink(
      // objectPath.get(topDto, "ProposalNo"),
      objectPath.get(dto, "ProposalNo"),
      objectPath.get(dto, "ProposerDetails.EmailId")
    );
    debugger; // eslint-disable-line
    console.log("link", link);
    if (link.status === 1) {
      setisSendpaymentlinkdone(true);
      swal
        .fire({
          icon: "success",
          text: "Payment link has been shared with customer",
          confirmButtonText: "OK",
          confirmButtonColor: "#0079CE",
        })
        .then((result) => {
          if (result.isConfirmed) {
            Navigate("/Retail/NBHome");
            // Navigate("/redirectToRetail?prodCode=NBTravel1&prodLabel=NB&url=/retail");
            // window.location.reload();
            // redirecttohome();
          }
        });
    }
    if (link.status !== 1) {
      swal.fire({
        icon: "error",
        text: "Failed to sent Email",
        confirmButtonColor: "#0079CE",
      });
    }
    // setGenericPolicyDto(dispatch, { ...dto });
  };
  const onProceedtoPayment = async () => {
    // objectPath.set(dto, "PayType", true);
    localStorage.setItem("patmentMethodType", "true");
    const tDto = { ...topDto };
    // debugger; // eslint-disable-line
    const ProposalNo = objectPath.get(dto, `ProposalNo`);
    const premiumamount = objectPath.get(dto, `PremiumDetail.TotalPremium`);
    // const emails = objectPath.get(dto, `ProposerDetails.EmailId`);
    const resp = await fetchPaymentURL(698, ProposalNo, premiumamount);
    console.log("hojayegaablagtahe", resp);
    setPaymentdetailss(resp);
    console.log("paymentdetailschek", Paymentdetailss);
    settransactionID(resp.transactionID);
    console.log("MilgayaKya", transactionID);
    setSuccessurl(resp.surl);
    console.log("yetoagaya", Successurl);
    objectPath.set(dto, "PremiumDetail.transectionID", resp.transactionID);
    objectPath.set(dto, "PremiumDetail.Successurl", resp.surl);
    setFailureurl(resp.furl);
    console.log("yevaya", Failureurl);
    const pay = await makePayment(tDto);
    console.log("payment", pay);
    // setGenericPolicyDto(dispatch, { ...dto });
  };

  useEffect(async () => {
    const res = await GetMasterData();
    res.data.forEach((item) => {
      if (item.mType === "Salutation")
        masters.Salutation = item.mdata.filter((x) => x.mValue !== "M/S.");
      if (item.mType === "Gender")
        masters.Gender = item.mdata.filter((x) => x.mValue !== "Transgender");
      if (item.mType === "NomineeRelation")
        masters.NomineeRelation = item.mdata.filter((x) => x.mValue !== "Others");
    });

    const obj6 = {
      InsuredRelationWithProposer: "",
    };
    const ress = await GetProdPartnermasterData(918, "InsuredRelationShip", obj6);

    masters.RelationInsured = ress;
    console.log("res", ress);
    const obj7 = {
      MasterType: "RelationwithStudent",
    };
    const relwithstu = await GetProdPartnermasterData(698, "RelationwithStudent", obj7);
    console.log("tttt", relwithstu);
    masters.RelationwithStudent = relwithstu;

    if (dto.ProposerDetails.CKYCNo !== "" && dto.ProposerDetails.CKYCNo !== undefined) {
      topFlag.Kyc = true;
    } else {
      topFlag.Kyc = false;
    }
    // const pslres = await proposerstateList(698, "ProposerState");
    const obj5 = {
      countryId: "1",
    };
    const pslres = await GetProdPartnermasterData(698, "ProposerState", obj5);

    masters.ProposerStateList = pslres;
    console.log("pslist", pslres);

    const tripduration = await GetPolicyTripTenureMaster(595, "StudentTravel");
    masters.TripDuration = tripduration;
    console.log("tripduration", tripduration);
    setGenericPolicyDto(dispatch, dto);
    setmasters({ ...masters });
  }, []);
  const SDatee = objectPath.get(dto, `NomineeDetails.0.NomineeDOB`);
  const EDatee = objectPath.get(dto, `PolicyStartDate`);
  const SSDatee = objectPath.get(dto, `TripStartDate`); // const ml = objectPath.get(dto, `PreExistingDisease`); // const yn = objectPath.get(dto, `InsurableItem.0.RiskItems.${i}.Clickyesorno`); // const od = objectPath.get(dto, `InsurableItem.0.RiskItems.${i}.Questionaire.7.Answer`); // debugger;

  if (TType === "MultiTrip") {
    const NODatee = diffDaysCalculator(new Date(SDatee), new Date(EDatee));
    const agee = NODatee / 365.000684931507;

    objectPath.set(dto, `NomineeDetails.0.TemporaryNomineeAge`, agee);
  } else if (TType === "SingleTrip" || TType === "StudentTravel") {
    const NODate1 = diffDaysCalculator(new Date(SDatee), new Date(SSDatee));
    const age1 = NODate1 / 365.000684931507;

    objectPath.set(dto, `NomineeDetails.0.TemporaryNomineeAge`, age1);
  }

  // const ri = objectPath.get(dto, "InsurableItem.0.RiskItems");

  // ri.forEach((item, i) => {
  //   //   debugger; // eslint-disable-line
  //   const SDate = objectPath.get(dto, `InsurableItem.0.RiskItems.${i}.DOB`);
  //   const EDate = objectPath.get(dto, `PolicyStartDate`);
  //   const SSDate = objectPath.get(dto, `TripStartDate`); // const ml = objectPath.get(dto, `PreExistingDisease`); // const yn = objectPath.get(dto, `InsurableItem.0.RiskItems.${i}.Clickyesorno`); // const od = objectPath.get(dto, `InsurableItem.0.RiskItems.${i}.Questionaire.7.Answer`); // debugger;

  //   if (TType === "MultiTrip") {
  //     const NODate = diffDaysCalculator(new Date(SDate), new Date(EDate));
  //     const age = Math.round(NODate / 365.25);

  //     objectPath.set(dto, `Temp.Age${i}`, age);
  //   } else if (TType === "SingleTrip" || TType === "StudentTravel") {
  //     const NODate = diffDaysCalculator(new Date(SDate), new Date(SSDate));
  //     const age = Math.round(NODate / 365.25);

  //     objectPath.set(dto, `Temp.Age${i}`, age);
  //   }
  // });

  const onAllyesOrno = (e) => {
    objectPath.set(dto, `PreExistingDisease`, e.target.value); // const yesorno = objectPath.get(dto, `ClickYesorNo`);
    // console.log("eeee", e);
    const md = objectPath.get(dto, `PreExistingDisease`);
    ri.forEach((x, i) => {
      // const ml = objectPath.get(dto, `PreExistingDisease`);

      if (md === "Yes") {
        x.Questionaire.forEach((x1, i1) => {
          if (i1 !== 7) {
            objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.Questions.${i1}.Answer`, "Yes");
          }
        });
      } else if (md === "No") {
        x.Questionaire.forEach((x1, i1) => {
          if (i1 !== 7) {
            objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.Questions.${i1}.Answer`, "No");
          }
        });
      }
    }); // const yesorno = objectPath.get(dto, `InsurableItem.0.RiskItems.${i}.Clickyesorno`);

    setGenericPolicyDto(dispatch, { ...dto });
  };

  const ifcheckedvalueadd01 = async (e) => {
    objectPath.set(dto, "Temp.checkedvalueadd01", e.target.checked ? "Yes" : "No");
    console.log(e);
    objectPath.set(dto, "documentDetails.0.DocName", "");
    objectPath.set(dto, "documentDetails.1.DocName", "");

    objectPath.set(dto, "documentDetails.2.DocName", "");
    DocFlag.pan = false;
    DocFlag.Passfront = false;
    DocFlag.Passback = false;
    setGenericPolicyDto(topDispatch, { ...dto });

    Visibleckycflag.notfailshow = true;
    Visibleckycflag.show = false;

    Visibleckycflag.permanentshow = false;

    Visibleckycflag.sameshow = false;
    // // Visibleckycflag.permanentshow &&
    // Visibleckycflag.failshow = true;
    // Visibleckycflag.firstfail = true;

    objectPath.set(dto, "Temp.checkedvalueadd02", "");
    objectPath.set(dto, "Temp.checkedvalueadd03", "");
    Visibleckycflag.permanentshow = false;
    const chkpin01 = objectPath.get(dto, `Temp.PinCode1`);

    const addchck01 = objectPath.get(dto, `Temp.Address1`);
    objectPath.set(dto, "ProposerDetails.PermanentAddress.AddressLine1", addchck01);
    const chck01 = await getDatafromPincode(chkpin01);
    console.log(chck01);

    // const chkifdefault = objectPath.get(dto, `Temp.checkedvalueadd03`);

    // && chkifdefault !== "Yes"
    if (e.target.checked === false) {
      // objectPath.set(topDto, "ProposerDetails.PermanentAddress.Pincode", "");
      // objectPath.set(topDto, "ProposerDetails.PermanentAddress.CityDistrict", "");
      // objectPath.set(topDto, "ProposerDetails.PermanentAddress.State", "");
      // objectPath.set(topDto, "ProposerDetails.PermanentAddress.District", "");

      Visibleckycflag.notfailshow = false;

      Visibleckycflag.permanentshow = false;
    }
    setGenericPolicyDto(dispatch, { ...dto });
  };

  const ifcheckedvalueadd03 = async (e) => {
    objectPath.set(topDto, "ProposerDetails.PermanentAddress.State", "");
    objectPath.set(dto, "Temp.checkedvalueadd03", e.target.checked ? "Yes" : "No");
    console.log(e);

    objectPath.set(dto, "ProposerDetails.PermanentAddress.AddressLine1", "");
    objectPath.set(dto, "ProposerDetails.PermanentAddress.District", "");
    objectPath.set(dto, "ProposerDetails.PermanentAddress.Pincode", "");
    // objectPath.set(
    //   dto,
    //   "ProposerDetails.PermanentAddress.State",
    //   dto.ProposerDetails.CommunicationAddress.State
    // );

    objectPath.set(dto, "Temp.checkedvalueadd01", "");
    objectPath.set(dto, "Temp.checkedvalueadd02", "");

    objectPath.set(dto, "ProposerDetails.PermanentAddress.CityDistrict", "");

    setGenericPolicyDto(dispatch, dto);

    // const chkpin01 = objectPath.get(dto, `Temp.PinCode1`);

    // const addchck01 = objectPath.get(dto, `Temp.Address1`);
    // objectPath.set(dto, "ProposerDetails.PermanentAddress.AddressLine1", addchck01);
    // const chck01 = await getDatafromPincode(chkpin01);

    // console.log(chck01);

    Visibleckycflag.notfailshow = false;
    Visibleckycflag.show = true;

    Visibleckycflag.permanentshow = true;

    Visibleckycflag.sameshow = true;
    // Visibleckycflag.permanentshow &&
    Visibleckycflag.failshow = true;
    Visibleckycflag.firstfail = true;

    if (e.target.checked === false) {
      Visibleckycflag.show = false;

      Visibleckycflag.permanentshow = false;

      Visibleckycflag.sameshow = false;
      // Visibleckycflag.permanentshow &&
      Visibleckycflag.failshow = false;
      Visibleckycflag.firstfail = false;
    }
    setGenericPolicyDto(dispatch, { ...dto });
  };

  const ifcheckedvalueadd02 = async (e) => {
    // debugger;
    objectPath.set(dto, "Temp.checkedvalueadd02", e.target.checked ? "Yes" : "No");

    // objectPath.set(dto, "dto.ProposerDetails.PermanentAddress.AddressLine1", "Temp.Address1");

    console.log(e);

    const chkpin02 = objectPath.get(dto, `Temp.PinCode2`);
    const chck01 = await getDatafromPincode(chkpin02);
    console.log(chck01);

    if (e.target.checked === false) {
      Visibleckycflag.notfailshow = false;

      Visibleckycflag.permanentshow = false;
    }
    setGenericPolicyDto(dispatch, { ...dto });
  };

  let data = [];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            required: true,
            label: "Product",
            visible: true,
            spacing: 3,
            value: "ProductName",
            defaultValue: "Travel Assure",
            options: productList,
            readOnly: true,

            // customOnChange: (e, v) => onProductSelect(e, v),
          },
          {
            type: "AutoComplete",
            label: "Plan",
            visible: true,
            value: "Display_Name",
            spacing: 3,
            required: true,
            options: masters.Plans,
            optionLabel: "displayName",
            customOnChange: onPlanSelect,
          },
          {
            type: "AutoComplete",
            label: " TripType",
            visible: true,
            spacing: 3,
            value: `TripType`,
            options: masters.TripType,
            required: true,
          },
          {
            type: "AutoComplete",
            label: " SumInsured",
            visible: true,
            spacing: 3,
            value: `SumInsured`,
            options: masters.SI,
            required: true,
            customOnChange: (e, v) => CallBenifitdata(e, v),
          },
          {
            type: "AutoComplete",
            label: "Country of Visit",
            visible: true,
            spacing: 6,
            value: `ListOfDestination`,
            options: masters.Country,
            required: true,
            multiple: true,

            disableOnReset: false,
            // customOnChange: onCountrySelect,
          },
          {
            type: "AutoComplete",
            label: " Geography",
            visible: false,
            value: `Geography`,
            spacing: 3,
            options: masters.Geography,
            // customOnChange: CallBenifitdata,
            required: true,
          },
        ],
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowPerPage: 100,
            columns: [
              { field: "CoverName", headerName: "Benefit Name", width: 220, headerAlign: "center" },
              {
                field: "Deductible",
                headerName: "Deductible",
                width: 150,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Value",
                headerName: "Sum Insured",
                width: 150,
                headerAlign: "center",
                align: "center",
              },

              // {
              //   field: "DeductibleType",
              //   headerName: "Deductible Type",
              //   width: 140,
              //   headerAlign: "center",
              // },
              {
                field: "AddOptionalCovers",
                headerName: "Add Optional Covers",
                width: 170,
                headerAlign: "center",
                renderCell: (param) => (
                  <MDBox>
                    {param.row.IsOptional === true && (
                      <RadioGroup row value={param.row.AddOptionalCovers}>
                        <FormControlLabel label="Yes" value="a" control={<Radio />} />
                        <FormControlLabel label="No" value="b" control={<Radio />} />
                      </RadioGroup>
                    )}
                  </MDBox>
                ),
              },
            ],
            rowId: "BenefitID",
            value: "Temp.BenifitList",
          },
        ],
        [
          {
            type: "MDDatePicker",
            required: true,
            label: "Trip Start Date",
            visible: TType === "SingleTrip" || TType === "StudentTravel",
            value: `TripStartDate`,
            dateFormat: "Y-m-d",
            minDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            customOnChange: (e, v) => settripstartdatefunc(e, v),
          },
          {
            type: "AutoComplete",
            label: " Trip Duration",
            visible: TType === "StudentTravel",
            required: true,
            value: "TripDuration",
            options: masters.TripDuration,
            customOnChange: (e, v) => onTripduration(e, v),
          },
          {
            type: "AutoComplete",
            label: " Trip Duration",
            visible: TType === "MultiTrip",
            // required: true,
            value: "TripDuration",
            options: TripDuration,
            customOnChange: (e, v) => onTripduration(e, v),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Trip End Date",
            visible: TType === "SingleTrip",
            value: `TripEndDate`,
            dateFormat: "Y-m-d",
            minDate: objectPath.get(dto, "TripStartDate"),
            maxDate: new Date(dto.TripStartDate).setDate(
              new Date(dto.TripStartDate).getDate() + 179
            ),
            customOnChange: (e, v) => settripdatefunc(e, v),
            InputProps: {
              disabled: TType === "StudentTravel",
            },
            // InputProps: { disabled: true },
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Trip End Date",
            visible: TType === "StudentTravel",
            value: `TripEndDate`,
            dateFormat: "Y-m-d",
            // minDate: objectPath.get(dto, "TripStartDate"),
            // maxDate: new Date(dto.TripStartDate).setDate(
            //   new Date(dto.TripStartDate).getDate() + 179
            // ),
            customOnChange: (e, v) => settripdatefunc(e, v),
            InputProps: {
              disabled: TType === "StudentTravel",
            },
          },
          {
            type: "Input",
            required: true,
            label: "No of Days",
            visible: TType === "SingleTrip",
            value: "NOOfDays",
            InputProps: { disabled: true },
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy start Date",
            visible: TType === "MultiTrip",
            value: `PolicyStartDate`,
            dateFormat: "Y-m-d",
            minDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            customOnChange: (e, v) => onPolicySDate(e, v),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            dateFormat: "Y-m-d",
            visible: TType === "MultiTrip",
            value: `PolicyEndDate`,
            minDate: objectPath.get(dto, "PolicyStartDate"),
            InputProps: { disabled: true },
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "No of Travellers",
            visible: TType === "SingleTrip" || TType === "MultiTrip",
            value: `NOOfTravellingMembers`,
            options: NoOfTraveelerArr,
            readOnly:
              objectPath.get(dto, "PolicyStartDate") === "" ||
              objectPath.get(dto, "TripStartDate") === "",
            required: true,
          },
          {
            type: "AutoComplete",
            label: "No of Travellers",
            visible: TType === "StudentTravel",
            value: `NOOfTravellingMembers`,
            options: NoOfTraveelerArr1,
            readOnly:
              objectPath.get(dto, "PolicyStartDate") === "" ||
              objectPath.get(dto, "TripStartDate") === "",
            required: true,
          },
          {
            type: "Typography",

            visible: true,

            spacing: 12,

            label: "",
          },
          // {
          //   type: "Mapper1",
          //   visible: true,
          //   spacing: 12,
          //   renderControl: [...noOfTravellerDatePicker],
          // },
          ...noOfTravellerDatePicker,
        ],
        [
          {
            type: "MDDatePicker",
            required: true,
            label: "Proposer DOB",
            visible: true,
            value: `ProposerDetails.DOB`,
            dateFormat: "Y-m-d",
            // value: `InsurableItem.0.RiskItems.0.DOB`,
            maxDate: `${new Date().getFullYear() - 18}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            minDate: `${new Date().getFullYear() - 80}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
          },
          {
            type: "AutoComplete",
            label: "Proposer State",
            visible: true,
            value: `ProposerDetails.CommunicationAddress.State`,
            options: masters.ProposerStateList,
            required: true,
            customOnChange: onStateSelect,
          },
          {
            type: "Input",
            required: true,
            label: "Email ID",
            visible: true,
            value: `ProposerDetails.EmailId`,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            required: true,
            label: "Mobile No",
            visible: true,
            value: `ProposerDetails.ContactNo`,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
        ],
        [
          {
            type: "RadioGroup",
            required: true,
            justifyContent: "space-between",
            visible: true,
            radioLabel: {
              label: "Does any of the travelers have Pre-Existing Medical Condition? ",
              color: "black",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No ", value: "No" },
            ],
            value: `PreExistingDisease`,
            spacing: 12,
            customOnChange: (e) => onAllyesOrno(e),
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Salutation",
            visible: true,
            value: `ProposerDetails.Salutation`,
            options: masters.Salutation,
            required: true,
          },
          {
            type: "Input",
            required: true,
            label: "Name",
            visible: true,
            value: `ProposerDetails.Name`,
            onChangeFuncs: [IsName],
          },
          {
            type: "AutoComplete",
            label: " Gender",
            visible: true,
            value: `ProposerDetails.Gender`,
            options: masters.Gender,
            required: true,
          },
          {
            type: "MDDatePicker",
            // required: true,
            label: "Date of Birth",
            visible: true,
            value: `ProposerDetails.DOB`,
            dateFormat: "Y-m-d",
            InputProps: { disabled: true },
            disableOnReset: true,
          },
          {
            type: "Input",
            required: true,
            label: "Email ID",
            visible: true,
            value: `ProposerDetails.EmailId`,
            InputProps: { disabled: true },
            onBlurFuncs: [IsEmail],
            disableOnReset: true,
          },
          {
            type: "Input",
            required: true,
            label: "PAN No.",
            visible: true,
            value: `ProposerDetails.PanNo`,
            customOnChange: (e) => IsPan1(e),
            onBlurFuncs: [IsPan],
            InputProps: { maxLength: 10, disabled: dto.ProposerDetails.CKYCNo !== "" },
          },
          {
            type: "Input",
            required: true,
            label: "Mobile number",
            visible: true,
            value: `ProposerDetails.ContactNo`,
            InputProps: { disabled: true },
            // onBlurFuncs: [IsMobileNumber],
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Father Name",
            visible: Visibleckycflag.Fathershow,
            value: `ProposerDetails.FatherName`,
            onChangeFuncs: [IsName],
            required: true,
          },
        ],

        [
          {
            type: "Input",
            required: true,
            label: "PAN No.",
            visible: true,
            value: `ProposerDetails.PanNo`,
            disableOnReset: true,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Typography",
            visible: false,
            spacing: 0,
            label: "",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Date of Birth",
            visible: true,
            value: `ProposerDetails.DOB`,
            dateFormat: "Y-m-d",
            InputProps: { disabled: true },
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "CKYC Number",
            visible: true,
            value: `ProposerDetails.CKYCNo`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "eIANumber",
            visible: false,
            value: `Temp.eIANumber`,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Custom",
            // visible: !topFlag.Kyc,
            spacing: 12,

            visible: true,
            return: (
              <MDBox>
                <MDBox
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <Grid container justifyContent="left" mt={2}>
                    <MDButton
                      onClick={() => AddAddressDetails()}
                      disabled={dto.ProposerDetails.CKYCNo !== ""}
                    >
                      Initiate KYC
                    </MDButton>

                    <Backdrop
                      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={clickkycflag.show}
                    >
                      <CircularProgress />
                    </Backdrop>
                  </Grid>
                </MDBox>
              </MDBox>
            ),
          },
          {
            type: "AutoComplete",
            label: "Title/Salutation",
            visible: topFlag.Kyc,
            value: `ProposerDetails.Salutation`,
            readOnly: true,
          },
          {
            type: "Input",
            label: "First Name",
            visible: topFlag.Kyc,

            // disableOnReset: true,
            value: `Temp.FirstName`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "Middle Name",
            // disableOnReset: true,
            visible: topFlag.Kyc,
            value: `Temp.MiddleName`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "Last Name",
            // disableOnReset: true,
            visible: topFlag.Kyc,
            value: `Temp.LastName`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "RadioGroup",
            visible: topFlag.Kyc,
            justifyContent: "space-between",
            radioLabel: {
              label: "Gender",
              labelVisible: true,
              disableOnReset: true,
            },
            radioList: [
              { label: "Male", value: "M", disabled: true },
              { label: "Female ", value: "F", disabled: true },
              { label: "Others ", value: "O", disabled: true },
            ],
            value: `Temp.Gender`,
            spacing: 6,
          },
          {
            type: "Typography",
            // label: "Address 01",
            label: "Address Line 1",
            visible: topFlag.Kyc,
            spacing: 12,
            fontSize: 16,
          },
          {
            type: "Checkbox",
            visible: topFlag.SamePath,
            // label: "Select Address 01 as Default Address",
            label: "Select Address Line 1 as Default Address",
            value: "Temp.checkedvalueadd01",

            disableOnReset: true,
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 12,

            customOnChange: (e) => ifcheckedvalueadd01(e),
          },
          {
            type: "Input",
            label: "Address Line",
            visible: topFlag.Kyc,
            value: `Temp.Address1`,
            spacing: 6,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "State",
            visible: topFlag.Kyc,
            // value: `ProposerDetails.PermanentAddress.State`,
            value: `Temp.State1`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "City",
            visible: topFlag.Kyc,
            value: `Temp.City1`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "Pincode",
            visible: topFlag.Kyc,
            value: `Temp.PinCode1`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Typography",
            label: "Address 02",
            visible: topFlag.Kyc && Visibleckycflag.addsamediff,
            spacing: 12,
            fontSize: 16,
          },
          {
            type: "Checkbox",
            visible: topFlag.SamePathadd2 && Visibleckycflag.addsamediff,
            label: "Select Address 02 as Default Address",
            value: "Temp.checkedvalueadd02",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 12,
            disableOnReset: true,

            customOnChange: (e) => ifcheckedvalueadd02(e),
          },
          {
            type: "Input",
            label: "Address Line",
            visible: topFlag.Kyc && Visibleckycflag.addsamediff,
            value: `Temp.Address2`,
            spacing: 6,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "State",
            visible: topFlag.Kyc && Visibleckycflag.addsamediff,
            value: `Temp.State2`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "City",
            visible: topFlag.Kyc && Visibleckycflag.addsamediff,
            value: `Temp.City2`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "Pincode",
            visible: topFlag.Kyc && Visibleckycflag.addsamediff,
            value: `Temp.PinCode2`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Checkbox",
            visible: topFlag.SamePath,
            label: "Want to have different Address?",
            value: "Temp.checkedvalueadd03",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 12,
            disableOnReset: true,
            customOnChange: (e) => ifcheckedvalueadd03(e),
          },
        ],
        [
          {
            type: "Typography",
            label: "Communication Address",
            visible: true,
            spacing: 12,
            fontSize: 15,
          },
          {
            type: "Input",
            required: true,
            label: "Address1",
            visible: true,
            value: `ProposerDetails.CommunicationAddress.AddressLine1`,
          },
          {
            type: "Input",
            label: "Address2",
            visible: true,
            value: `ProposerDetails.CommunicationAddress.AddressLine2`,
          },
          {
            type: "Input",
            // required: true,
            label: "Address3",
            visible: true,
            value: `ProposerDetails.CommunicationAddress.AddressLine3`,
          },
          {
            type: "Input",
            required: true,
            label: "State",
            visible: true,
            value: `ProposerDetails.CommunicationAddress.State`,
            InputProps: { disabled: true },
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "District",
            visible: true,
            value: `ProposerDetails.CommunicationAddress.District`,
            options: mast.district,
            // options: masters.ProposerDistrictList,
            customOnChange: onDistrictSelect,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "City",
            visible: true,
            value: `ProposerDetails.CommunicationAddress.CityDistrict`,
            // options: masters.ProposerCityList,
            options: mast2.city,
            customOnChange: onCitySelect,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Pincode",
            visible: true,
            value: `ProposerDetails.CommunicationAddress.Pincode`,
            // options: masters.ProposerPincodeList,
            optionLabel: "mID",
            options: mast3.pincode,
            customOnChange: onPincodeSelect,
          },

          {
            type: "RadioGroup",

            justifyContent: "space-between",
            visible: Visibleckycflag.Fathershow,
            radioLabel: {
              label: "Is Permanent address same as Communication address ",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            value: `ProposerDetails.SameasCommunicationAddress`,
            spacing: 12,
            customOnChange: (e) => onSameAddress(e),
          },
          {
            type: "Typography",
            label: "Permanent Address ",
            visible: Visibleckycflag.permanentshow,
            spacing: 12,
            fontSize: 15,
          },

          {
            type: "Input",
            label: "Address1",
            visible: Visibleckycflag.notfailshow,
            value: `ProposerDetails.PermanentAddress.AddressLine1`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "Address 2",
            visible: Visibleckycflag.notfailshow,
            value: `ProposerDetails.PermanentAddress.AddressLine2`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "Address 3",
            visible: Visibleckycflag.notfailshow,
            value: `ProposerDetails.PermanentAddress.AddressLine3`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },

          {
            type: "Input",
            required: true,
            label: "Address1",
            visible:
              Visibleckycflag.sameshow &&
              Visibleckycflag.permanentshow &&
              Visibleckycflag.failshow &&
              Visibleckycflag.firstfail,
            value: `ProposerDetails.PermanentAddress.AddressLine1`,
            InputProps: {
              readOnly: objectPath.get(dto, "ProposerDetails.SameasCommunicationAddress") === "Yes",
            },
          },
          {
            type: "Input",
            label: "Address2",
            visible:
              Visibleckycflag.sameshow &&
              Visibleckycflag.permanentshow &&
              Visibleckycflag.failshow &&
              Visibleckycflag.firstfail,
            value: `ProposerDetails.PermanentAddress.AddressLine2`,
            InputProps: {
              readOnly: objectPath.get(dto, "ProposerDetails.SameasCommunicationAddress") === "Yes",
            },
          },
          {
            type: "Input",
            label: "Address3",
            visible:
              Visibleckycflag.sameshow &&
              Visibleckycflag.permanentshow &&
              Visibleckycflag.failshow &&
              Visibleckycflag.firstfail,
            value: `ProposerDetails.PermanentAddress.AddressLine3`,
            InputProps: {
              readOnly: objectPath.get(dto, "ProposerDetails.SameasCommunicationAddress") === "Yes",
            },
          },
          {
            type: "AutoComplete",
            label: "State",
            visible:
              Visibleckycflag.sameshow &&
              Visibleckycflag.permanentshow &&
              Visibleckycflag.failshow &&
              Visibleckycflag.firstfail,
            value: `ProposerDetails.PermanentAddress.State`,
            options: masters.ProposerStateList,
            required: true,
            customOnChange: onState2Select,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "District",
            visible:
              Visibleckycflag.sameshow &&
              Visibleckycflag.permanentshow &&
              Visibleckycflag.failshow &&
              Visibleckycflag.firstfail,
            readOnly: objectPath.get(dto, "ProposerDetails.SameasCommunicationAddress") === "Yes",
            value: `ProposerDetails.PermanentAddress.District`,
            options: mast31.district,
            customOnChange: onDistrict1Select,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "City",
            visible:
              Visibleckycflag.sameshow &&
              Visibleckycflag.permanentshow &&
              Visibleckycflag.failshow &&
              Visibleckycflag.firstfail,
            readOnly: objectPath.get(dto, "ProposerDetails.SameasCommunicationAddress") === "Yes",
            value: `ProposerDetails.PermanentAddress.CityDistrict`,
            options: mast11.city,
            customOnChange: onCity1Select,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Pincode",
            visible:
              Visibleckycflag.sameshow &&
              Visibleckycflag.permanentshow &&
              Visibleckycflag.failshow &&
              Visibleckycflag.firstfail,
            value: `ProposerDetails.PermanentAddress.Pincode`,
            readOnly: objectPath.get(dto, "ProposerDetails.SameasCommunicationAddress") === "Yes",
            optionLabel: "mID",
            options: mast12.pincode,
            customOnChange: onPincode1Select,
          },

          {
            type: "Input",
            label: "State",
            visible: Visibleckycflag.notfailshow,
            value: `ProposerDetails.PermanentAddress.State`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "District",
            visible: Visibleckycflag.notfailshow,
            value: `ProposerDetails.PermanentAddress.District`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "City",
            visible: Visibleckycflag.notfailshow,
            value: `ProposerDetails.PermanentAddress.CityDistrict`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "Pincode",
            visible: Visibleckycflag.notfailshow,
            value: `ProposerDetails.PermanentAddress.Pincode`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Typography",
            label: "Address Proof",
            visible: Visibleckycflag.show,
            spacing: 12,
            fontSize: 16,
          },

          {
            type: "Typography",
            label: "",
            visible: Visibleckycflag.show,
            spacing: 12,
            fontSize: 15,
          },

          {
            type: "Typography",
            label: "Pan Document",

            visible: Visibleckycflag.show,
            spacing: 3,
            fontSize: 15,
          },
          {
            type: "Custom",
            visible: Visibleckycflag.show,
            spacing: 4,
            return: (
              <MDBox>
                <Grid container justifyContent="center">
                  <MDButton
                    variant="outlined"
                    color="info"
                    component="label"
                    disabled={DocFlag.pan !== false}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/bmp, image/jpeg, image/png, .pdf"
                      type="file"
                      onChange={(e) => handleFileUpload(e, "_Pan")}
                      ref={ref2}
                    />
                  </MDButton>
                </Grid>
              </MDBox>
            ),
          },

          {
            type: "Custom",
            visible: Visibleckycflag.show,
            spacing: 3,
            return: (
              <Typography sx={{ textAlign: "right", fontSize: "12px" }}>
                {objectPath.get(dto, "documentDetails.0.DocName")}
              </Typography>
            ),
          },

          {
            type: "Custom",
            visible: DocFlag.pan && Visibleckycflag.show,
            spacing: 2,
            return: (
              <CancelOutlinedIcon color="error" onClick={(e) => handleFiledelete(e, "_Pan")} />
            ),
          },

          {
            type: "Typography",
            label: "Passport Front Copy",
            visible: Visibleckycflag.show,
            spacing: 3,
            fontSize: 15,
          },
          {
            type: "Custom",
            visible: Visibleckycflag.show,
            spacing: 4,
            return: (
              <MDBox>
                <Grid container justifyContent="center">
                  <MDButton
                    variant="outlined"
                    color="info"
                    component="label"
                    disabled={DocFlag.Passfront !== false}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/bmp, image/jpeg, image/png, .pdf"
                      type="file"
                      ref={ref3}
                      onChange={(e) => handleFileUpload(e, "_PassportFront")}
                    />
                  </MDButton>
                </Grid>
              </MDBox>
            ),
          },

          {
            type: "Custom",
            visible: Visibleckycflag.show,
            spacing: 3,
            return: (
              <Typography sx={{ textAlign: "right", fontSize: "12px" }}>
                {objectPath.get(dto, "documentDetails.1.DocName")}
              </Typography>
            ),
          },

          {
            type: "Custom",
            visible: DocFlag.Passfront && Visibleckycflag.show,
            spacing: 2,
            return: (
              <CancelOutlinedIcon
                color="error"
                onClick={(e) => handleFiledelete(e, "_PassportFront")}
              />
            ),
          },

          {
            type: "Typography",
            label: "Passport Back Copy",
            visible: Visibleckycflag.show,
            spacing: 3,
            fontSize: 15,
          },
          {
            type: "Custom",
            visible: Visibleckycflag.show,
            spacing: 4,
            return: (
              <MDBox>
                <Grid container justifyContent="center">
                  <MDButton
                    variant="outlined"
                    color="info"
                    component="label"
                    disabled={DocFlag.Passback !== false}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/bmp, image/jpeg, image/png, .pdf"
                      type="file"
                      ref={ref}
                      onChange={(e) => handleFileUpload(e, "_PassportBack")}
                    />
                  </MDButton>
                </Grid>
              </MDBox>
            ),
          },

          {
            type: "Custom",
            visible: Visibleckycflag.show,
            spacing: 3,
            return: (
              <Typography sx={{ textAlign: "right", fontSize: "12px" }}>
                {objectPath.get(dto, "documentDetails.2.DocName")}
              </Typography>
            ),
          },

          {
            type: "Custom",
            visible: DocFlag.Passback && Visibleckycflag.show,
            spacing: 2,
            return: (
              <CancelOutlinedIcon
                color="error"
                onClick={(e) => handleFiledelete(e, "_PassportBack")}
              />
            ),
          },

          {
            type: "Typography",
            label: "Uploading Passport Front and Back copy is Mandatory",
            visible: Visibleckycflag.show,
            spacing: 12,
            fontSize: 10,
          },
        ],
      ];
      break;
    case 2:
      data = [...noOfTravellerComponents];
      break;
    case 3:
      data = [
        [
          {
            type: "Input",
            required: true,
            label: "Name",
            visible: true,
            value: `NomineeDetails.0.NomineeName`,
            onBlurFuncs: [IsName],
          },
          {
            type: "AutoComplete",
            label: " Relationship with Proposer",
            visible: true,
            value: `NomineeDetails.0.NomineeRelationWithProposer`,
            required: true,
            options: masters.NomineeRelation,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible: true,
            value: `NomineeDetails.0.NomineeGender`,
            options: masters.Gender,
            // required: true,
          },
          {
            type: "Typography",
            visible: false,
            spacing: 0,
            label: "",
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            visible: true,
            value: `NomineeDetails.0.NomineeDOB`,
            dateFormat: "Y-m-d",
            maxDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
          },
          {
            type: "Input",
            label: "Email ID",
            visible: true,
            value: `NomineeDetails.0.NomineeEmailID`,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Mobile number",
            visible: true,
            value: `NomineeDetails.0.NomineeMobile`,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            required: true,
            label: "Appointee Name",
            visible:
              objectPath.get(dto, "NomineeDetails.0.TemporaryNomineeAge") >= 0 &&
              objectPath.get(dto, "NomineeDetails.0.TemporaryNomineeAge") < 18.01 &&
              objectPath.get(dto, "NomineeDetails.0.TemporaryNomineeAge") !== undefined,
            value: `NomineeDetails.0.AppointeeName`,
            onBlurFuncs: [IsName],
          },
          {
            type: "RadioGroup",

            justifyContent: "space-between",
            visible: true,
            radioLabel: {
              label: "Is the Nominee Address same as the Proposer's communication address? ",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No ", value: "No" },
            ],
            value: "NomineeDetails.0.SameasCommunicationAddress",
            spacing: 12,
            customOnChange: (e) => onNomAddress(e),
          },
          {
            type: "Typography",
            label: "Nominee's communication Address",
            visible: true,
            spacing: 12,
            fontSize: 16,
          },
          {
            type: "Input",
            // label: "Address 01",
            lable: "Address Line 1",
            visible: true,
            value: `NomineeDetails.0.NomineeAddressLine1`,
            InputProps: {
              readOnly:
                objectPath.get(dto, "NomineeDetails.0.SameasCommunicationAddress") === "Yes",
            },
          },
          {
            type: "Input",
            label: "Address 02",
            visible: true,
            value: `NomineeDetails.0.NomineeAddressLine2`,
            InputProps: {
              readOnly:
                objectPath.get(dto, "NomineeDetails.0.SameasCommunicationAddress") === "Yes",
            },
          },
          {
            type: "Input",
            label: "Address 03",
            visible: true,
            value: `NomineeDetails.0.NomineeAddressLine3`,
            InputProps: {
              readOnly:
                objectPath.get(dto, "NomineeDetails.0.SameasCommunicationAddress") === "Yes",
            },
          },
          {
            type: "AutoComplete",
            label: "State",
            visible: true,
            value: `NomineeDetails.0.NomineeState`,
            readOnly: objectPath.get(dto, "NomineeDetails.0.SameasCommunicationAddress") === "Yes",
            options: masters.ProposerStateList,
            customOnChange: onState1Select,
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            value: `NomineeDetails.0.NomineeDistrict`,
            readOnly: objectPath.get(dto, "NomineeDetails.0.SameasCommunicationAddress") === "Yes",
            options: mast21.district,
            customOnChange: onDistrict2Select,
          },
          {
            type: "AutoComplete",
            label: "City",
            visible: true,
            value: `NomineeDetails.0.NomineeCity`,
            readOnly: objectPath.get(dto, "NomineeDetails.0.SameasCommunicationAddress") === "Yes",
            options: mast22.city,
            customOnChange: onCity2Select,
          },

          {
            type: "AutoComplete",
            label: "Pincode",
            visible: true,
            value: `NomineeDetails.0.NomineePincode`,
            readOnly: objectPath.get(dto, "NomineeDetails.0.SameasCommunicationAddress") === "Yes",
            optionLabel: "mID",
            options: mast23.pincode,
            customOnChange: onPincode2Select,
          },
        ],
        [
          {
            type: "Input",
            required: true,
            label: "University Name",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Name`,
            onBlurFuncs: [IsName],
          },
          {
            type: "Input",
            required: true,
            label: "Pincode/ Zipcode",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.PinCode`,
            onBlurFuncs: [IsNumeric],
            InputProps: { maxLength: 6 },
          },
          {
            type: "Input",
            label: "Country",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Country`,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.State`,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "City",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.City`,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            required: true,
            label: "Address Line 1",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.AddressLine1`,
          },
          {
            type: "Input",
            label: " Address Line 2",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.AddressLine2`,
          },
          {
            type: "Input",
            label: "Address Line 3",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.AddressLine3`,
          },
          {
            type: "Input",
            required: true,
            label: "Course Opted for",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.CourseOptedFor`,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            required: true,
            label: "Course Duration",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.CourseDuration`,
            onBlurFuncs: [IsAlphaNum],
          },
        ],
        [
          {
            type: "Input",
            required: true,
            label: "Name of the sponsor",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.Name`,
            onBlurFuncs: [IsName],
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.Gender`,
            options: masters.Gender,
            required: true,
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.DOB`,
            dateFormat: "Y-m-d",
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Relationship with Student",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.RelationshipwithStudent`,
            options: masters.RelationwithStudent,
          },
          {
            type: "Input",
            required: true,
            label: "Email Id",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.Email`,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            required: true,
            label: "Mobile number",
            visible: TType === "StudentTravel",
            value: "Department",
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Typography",
            label: "Sponsor communication Address",
            visible: TType === "StudentTravel",
            spacing: 12,
            fontSize: 16,
          },
          {
            type: "Input",
            label: "Address Line 1",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.AddressLine1`,
          },
          {
            type: "Input",
            label: "Address Line 2",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.AddressLine2`,
          },
          {
            type: "Input",
            label: "Address Line 3",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.AddressLine3`,
          },
          {
            type: "Input",
            label: "Pincode",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.PinCode`,
            onBlurFuncs: [IsNumeric],
            InputProps: { maxLength: 6 },
          },
          {
            type: "Input",
            label: "City",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.City`,
          },
          {
            type: "Input",
            label: "District",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.District`,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            visible: TType === "StudentTravel",
            value: `UniversityDetails.Sponsor.0.State`,
            onBlurFuncs: [IsAlphaSpace],
          },
        ],
      ];
      break;
    case 4:
      data = [
        [
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
                    width: "50%",
                    ml: "25%",
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    <Grid container spacing={2} p={3}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography>Sum Insured</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography sx={{ textAlign: "right" }}>
                          ₹{objectPath.get(dto, "SumInsured")}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography>Basic Premium</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography sx={{ textAlign: "right" }}>
                          ₹{objectPath.get(dto, "PremiumDetail.BasicPremium")}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography>Discount/Loading</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography sx={{ textAlign: "right" }}>
                          ₹{objectPath.get(dto, "PremiumDetail.Discount")}{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography>Gross Premium</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography sx={{ textAlign: "right" }}>
                          {" "}
                          ₹
                          {objectPath.get(
                            dto,

                            "PremiumDetail.GrossPremium"
                          )}{" "}
                        </Typography>
                      </Grid>
                      {objectPath.get(dto, "ProposerDetails.CommunicationAddress.State") !==
                      "UTTAR PRADESH" ? (
                        <>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Typography>IGST(18%)</Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Typography sx={{ textAlign: "right" }}>
                              ₹{objectPath.get(dto, "PremiumDetail.TaxDetails.2.Amount")}{" "}
                            </Typography>
                          </Grid>
                        </>
                      ) : null}
                      {objectPath.get(dto, "ProposerDetails.CommunicationAddress.State") ===
                      "UTTAR PRADESH" ? (
                        <>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Typography>CGST(9%)</Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Typography sx={{ textAlign: "right" }}>
                              ₹{objectPath.get(dto, "PremiumDetail.TaxDetails.0.Amount")}{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Typography>SGST(9%)</Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Typography sx={{ textAlign: "right" }}>
                              ₹{objectPath.get(dto, "PremiumDetail.TaxDetails.1.Amount")}{" "}
                            </Typography>
                          </Grid>
                        </>
                      ) : null}
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography>Total Premium</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Typography sx={{ textAlign: "right" }}>
                          ₹{objectPath.get(dto, "PremiumDetail.TotalPremium")}{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </MDBox>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <Stack direction="row" spacing={2} p={5}>
                    <MDButton onClick={() => onSendProposalLink()}>Send the payment link</MDButton>
                    <MDButton onClick={() => onProceedtoPayment()}> Proceed to Payment</MDButton>
                  </Stack>
                </MDBox>
              </MDBox>
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

const getOnNextClick = async (activeStep, setBackDropFlag) => {
  let fun = false;
  let fun2 = false;

  const tDto = { ...topDto };
  const CheckYes = () => {
    const ri = objectPath.get(topDto, "InsurableItem.0.RiskItems");
    fun = true;
    ri.forEach((y) => {
      y.Questions.forEach((y1, a) => {
        if (a !== 7) {
          if (y1.Answer === "Yes") {
            fun = false;
          }
        }
      });
    });

    return fun;
  };

  objectPath.del(tDto, "Temp");
  // objectPath.del(tDto, "Temp.BenifitList");
  objectPath.del(tDto, "InsurableItem.0.RiskItems.0.MemberID");
  objectPath.del(tDto, "request");
  objectPath.del(tDto, "headers");
  objectPath.del(tDto, "config");
  objectPath.del(tDto, "PremiumDetail");

  if (tDto.PolicyNumber !== "") {
    objectPath.del(tDto, "Total Count");
    objectPath.del(tDto, "Children Count");
    objectPath.del(tDto, "Adult Count");
    objectPath.del(tDto, "");
  }

  console.log("sendingdata", tDto);
  if (topDto !== null && topDispatch !== null) {
    switch (activeStep) {
      case 0:
        fun = await calculatePremium(topDto).then(async (res) => {
          if (res) {
            // objectPath.set(topDto, "PremiumDetails", x.finalResult);
            // objectPath.set(topDto, "premiumDetail", res);
            objectPath.set(
              topDto,
              "PremiumDetail.BasicPremium",
              res.data.premiumDetail.BasicPremium
            );
            objectPath.set(topDto, "PremiumDetail.Discount", res.data.premiumDetail.Discount);
            objectPath.set(
              topDto,
              "PremiumDetail.GrossPremium",
              res.data.premiumDetail.GrossPremium
            );
            objectPath.set(
              topDto,
              "PremiumDetail.TaxDetails.2.Amount",
              res.data.premiumDetail.TaxDetails[2].Amount
            );

            objectPath.set(
              topDto,
              "PremiumDetail.TaxDetails.0.Amount",
              res.data.premiumDetail.TaxDetails[0].Amount
            );
            objectPath.set(
              topDto,
              "PremiumDetail.TaxDetails.1.Amount",
              res.data.premiumDetail.TaxDetails[1].Amount
            );
            objectPath.set(
              topDto,
              "PremiumDetail.TotalPremium",
              res.data.premiumDetail.TotalPremium
            );
            console.log("check", res);

            setGenericPolicyDto(topDispatch, { ...topDto });
            setBackDropFlag(false);
            const fun1 = await swal
              .fire({
                title: "<strong>PREMIUM</strong>",
                html: `<div style={{display:"flex",justifyContent:"center"}}> 
            <table width="100%"><tr><td style="textAlign:left ;padding-bottom: 20px">GrossPremium</td>  
            <td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
              res.data.premiumDetail.GrossPremium
            ).toFixed(0)}
            </td></tr> 
            ${
              objectPath.get(topDto, "ProposerDetails.CommunicationAddress.State") ===
              "UTTAR PRADESH"
                ? `<tr><td style="textAlign:left ;padding-bottom: 20px">SGST(9%)</td><td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
                    res.data.premiumDetail.TaxDetails[1].Amount
                  ).toFixed(0)}    
            
            </td></tr>
            
            <tr><td style="textAlign:left ;padding-bottom: 20px">CGST(9%)</td><td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
              res.data.premiumDetail.TaxDetails[0].Amount
            ).toFixed(0)}    
            
            </td></tr>`
                : `<tr><td style="textAlign:left ;padding-bottom: 20px">IGST(18%)</td><td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
                    res.data.premiumDetail.TaxDetails[2].Amount
                  ).toFixed(0)}    
            
            </td></tr>`
            }
            
             
            
            <tr><td style="textAlign:left ;padding-bottom: 20px">Total Premium</td><td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
              res.data.premiumDetail.TotalPremium
            ).toFixed(0)}   
            
            </td></tr>  
            
            </table>  
            
            </div>`,

                showConfirmButton: true,

                confirmButtonText: "Proceed",

                confirmButtonColor: "#0079CE",

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
        fun = false;
        fun2 = true;

        if (objectPath.get(topDto, "ProposerDetails.CKYCNo") !== "") {
          if (
            objectPath.get(topDto, "Temp.checkedvalueadd01") !== "Yes" &&
            objectPath.get(topDto, "Temp.checkedvalueadd02") !== "Yes" &&
            objectPath.get(topDto, "Temp.checkedvalueadd03") !== "Yes"
          ) {
            swal.fire({
              icon: "error",
              text: `Please Select Address checkbox `,
              confirmButtonColor: "#0079CE",
            });
            return fun;
          }

          if (objectPath.get(topDto, "Temp.checkedvalueadd03") === "Yes") {
            if (
              objectPath.get(topDto, "documentDetails.1.DocName") === "" &&
              objectPath.get(topDto, "documentDetails.2.DocName") === ""
            ) {
              swal.fire({
                icon: "error",
                text: `Please upload Passport Front and Back Document `,
                confirmButtonColor: "#0079CE",
              });

              return fun;
            }

            if (objectPath.get(topDto, "documentDetails.1.DocName") === "") {
              swal.fire({
                icon: "error",
                text: `Please upload Passport Front Document `,
                confirmButtonColor: "#0079CE",
              });

              return fun;
            }

            if (objectPath.get(topDto, "documentDetails.2.DocName") === "") {
              swal.fire({
                icon: "error",
                text: `Please upload Passport Back Document `,
                confirmButtonColor: "#0079CE",
              });

              return fun;
            }
          }

          return fun2;
        }
        if (objectPath.get(topDto, "ProposerDetails.CKYCNo") === "") {
          if (
            objectPath.get(topDto, "documentDetails.1.DocName") === "" &&
            objectPath.get(topDto, "documentDetails.2.DocName") === ""
          ) {
            swal.fire({
              icon: "error",
              text: `Please upload Passport Front and Back Document `,
              confirmButtonColor: "#0079CE",
            });

            return fun;
          }

          if (objectPath.get(topDto, "documentDetails.1.DocName") === "") {
            swal.fire({
              icon: "error",
              text: `Please upload Passport Front Document `,
              confirmButtonColor: "#0079CE",
            });

            return fun;
          }

          if (objectPath.get(topDto, "documentDetails.2.DocName") === "") {
            swal.fire({
              icon: "error",
              text: `Please upload Passport Back Document `,
              confirmButtonColor: "#0079CE",
            });

            return fun;
          }

          return fun2;
        }

        break;

      case 2:
        fun = CheckYes();
        if (fun === false) {
          swal.fire({
            icon: "error",
            // text: `Sorry. We are not able to issue policy for select disease(s)`,
            confirmButtonColor: "#0079CE",
            text: `Sorry. We are not able to issue policy for select disease(s)`,
          });
        }
        break;

      case 3:
        fun = await calculateProposal(tDto).then(async (results) => {
          console.log("checkproposal", results);
          if (results.data.status === 2) {
            objectPath.set(topDto, "ProposalNo", results.data.proposalNumber);
            setGenericPolicyDto(topDispatch, { ...topDto });
            localStorage.setItem("ProposalNo", results.data.proposalNumber);
            console.log("checkprop", topDto);

            swal.fire({
              icon: "success",
              text: results.data.responseMessage,
              confirmButtonColor: "#0079CE",
            });

            return true;
          }

          if (results.data.status !== 2) {
            swal.fire({
              icon: "error",
              text: results.data.responseMessage,
              confirmButtonColor: "#0079CE",
            });
          }

          return false;
        });
        fun = true;
        break;
      default:
        fun = true;
        break;
    }
  }
  return fun;
};
const getButtonDetails = (activeStep) => {
  let btnDetails = {};

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Calculate Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: Travelflag.Kyc },
      };
      break;

    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
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

export { getProcessSteps, getPageContent, getSectionContent, getOnNextClick, getButtonDetails };
