import getTempData from "../Products/Template";
import getMotorCycleData from "../Products/NepalProds/NewMotorCycle";
import getClaimReportData from "../Products/Magma/ClaimReport";
import getUSGIWCData from "../Products/USGI/WC";
import getNBTravel from "../Products/NBRetail/NBTravelRetail";
import getMagmaCOI from "../Products/Magma/MagmaCOI";
import getMarineOpenCOI from "../Products/USGI/MarineOpenCOI";
import getLife from "../../Life/Products/Proposal";
import getCommercialVehicle from "../Products/NepalProds/CommercialVehicle";
import getPrivateVehicle from "../Products/NepalProds/PrivateVehicle";
import getPropertyInsurance from "../Products/NepalProds/PropertyInsurance";
import getHomeInsurance from "../Products/NepalProds/HomeInsurance";
// import getTravelMedicalInsurance from "../Products/NepalProds/TravelMedicalInsurance";
import getTravelMedicalInsurance from "../Products/NepalProds/TravelMedicalInsurance";
import getAccidentalInsurance from "../Products/NepalProds/AccidentalInsurance";
import getBurglary from "../Products/NepalProds/Burglary";
import getPersonalDomiciliary from "../Products/NepalProds/PersonalDomiciliary";
import getCyberInsurance from "../Products/USGI/CyberInsurance";
import getMarineSTOP from "../Products/USGI/MarineSTOP";
import getPrivateCar from "../Products/Demo/PrivateCar";
import getShopKeeper from "../Products/USGI/ShopKeeper";
import getGroupTravel from "../Products/USGI/Travel/CreateCOI";
import getCOIAmana from "../Products/Amana/COICreation";
import getHoneyBee from "../Products/NepalProds/HoneyBee";
import getOstrich from "../Products/NepalProds/Ostrich";
import getPheasant from "../Products/NepalProds/Pheasant";
import getCreateEndorsement from "../Products/Magma/Endorsement/CreateEndorsement";
import getB2C from "../Products/NepalProds/B2CMotorCycle";
import getFish from "../Products/NepalProds/Fish";
import getCombi from "../Products/USGI/Combi";
// import getQRCode from "../Products/USGI/QRCode";

const AllMethod = [
  { prod: "Temp", func: getTempData },
  { prod: "MotorCycle", func: getMotorCycleData },
  { prod: "ClaimReport", func: getClaimReportData },
  { prod: "USGIWC", func: getUSGIWCData },
  { prod: "USGICOMBI", func: getCombi },
  // { prod: "USGIQRCODE", func: getQRCode },
  { prod: "NBTravelRetail", func: getNBTravel },
  { prod: "MagmaCOI", func: getMagmaCOI },
  { prod: "MarineOpenCOI", func: getMarineOpenCOI },
  { prod: "MarineSTOP", func: getMarineSTOP },
  { prod: "Life", func: getLife },
  { prod: "CommercialVehicle", func: getCommercialVehicle },
  { prod: "PrivateVehicle", func: getPrivateVehicle },
  { prod: "HomeInsurance", func: getHomeInsurance },
  { prod: "PropertyInsurance", func: getPropertyInsurance },
  { prod: "TravelMedicalInsurance", func: getTravelMedicalInsurance },
  { prod: "AccidentalInsurance", func: getAccidentalInsurance },
  { prod: "CyberInsurance", func: getCyberInsurance },
  { prod: "PrivateCar", func: getPrivateCar },
  { prod: "ShopKeeper", func: getShopKeeper },
  { prod: "COIAmana", func: getCOIAmana },
  { prod: "HoneyBee", func: getHoneyBee },
  { prod: "Ostrich", func: getOstrich },
  { prod: "Pheasant", func: getPheasant },
  { prod: "CreateEndorsement", func: getCreateEndorsement },
  { prod: "GroupTravel", func: getGroupTravel },
  { prod: "Burglary", func: getBurglary },
  { prod: "B2C", func: getB2C },
  { prod: "Fish", func: getFish },
  { prod: "PersonalDomiciliary", func: getPersonalDomiciliary },
];

const getProcessSteps = ({ prod, dto, masters }) => {
  let steps = [];

  steps = AllMethod.filter((x) => x.prod === prod)[0].func[0]({ dto, masters });

  return steps;
};

const getPageContent = ({ prod, activeStep, dto, setDto, masters, setMasters }) => {
  let steps = [];
  steps = AllMethod.filter((x) => x.prod === prod)[0].func[1]({
    activeStep,
    dto,
    setDto,
    masters,
    setMasters,
  });

  return steps;
};

const getSectionContent = ({
  prod,
  activeStep,
  dto,
  setDto,
  masters,
  setMasters,
  setBackDropFlag,
  navigate,
}) => {
  let steps = "";
  steps = AllMethod.filter((x) => x.prod === prod)[0].func[2]({
    activeStep,
    dto,
    setDto,
    masters,
    setMasters,
    setBackDropFlag,
    navigate,
  });

  return steps;
};

const getOnNextClick = ({
  prod,
  activeStep,
  dto,
  setDto,
  setBackDropFlag,
  masters,
  setMasters,
  setActiveStep,
  navigate,
}) => {
  let fun = true;
  fun = AllMethod.filter((x) => x.prod === prod)[0].func[3]({
    activeStep,
    setBackDropFlag,
    dto,
    setDto,
    masters,
    setMasters,
    setActiveStep,
    navigate,
  });

  return fun;
};

const getButtonDetails = ({
  prod,
  activeStep,
  dto,
  setDto,
  masters,
  setMasters,
  setBackDropFlag,
}) => {
  let btnDetails = {};

  btnDetails = AllMethod.filter((x) => x.prod === prod)[0].func[4]({
    activeStep,
    dto,
    setDto,
    masters,
    setMasters,
    setBackDropFlag,
  });

  return btnDetails;
};

const getPolicyDto = ({ prod, PolicyDto, genericInfo }) => {
  let dto = "";
  dto = AllMethod.filter((x) => x.prod === prod)[0].func[5]({ PolicyDto, genericInfo });

  return dto;
};

const getMasterData = async ({ prod, dto, setDto, additionalInformation, genericInfo }) => {
  let mst = {};
  mst = AllMethod.filter((x) => x.prod === prod)[0].func[6]({
    dto,
    setDto,
    additionalInformation,
    genericInfo,
  });

  return mst;
};

export {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
};
