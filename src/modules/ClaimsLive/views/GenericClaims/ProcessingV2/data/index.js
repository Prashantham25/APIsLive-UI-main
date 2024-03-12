import getTempData from "../Products/Template";
import getTakafulOmanProcessingData from "../Products/TakafulOman/Processing";
import getTakafulOmanWorkshopData from "../Products/TakafulOman/Workshop";
import getTakafulOmanProcessingClaimHistoryData from "../Products/TakafulOman/ProcessingClaimHistory";
import getNepalClaims from "../Products/NepalClaims/TwoWheelerMotor/ClaimAdvancePayment";
import getNepalSurveyor from "../Products/NepalClaims/TwoWheelerMotor/Surveyor";
import getNepalAssessment from "../Products/NepalClaims/TwoWheelerMotor/ClaimAssement";
import getNepalRIApproval from "../Products/NepalClaims/TwoWheelerMotor/RIApproval";
import getNepalClaimApproval from "../Products/NepalClaims/TwoWheelerMotor/ClaimApproval";
import getNepalDischarge from "../Products/NepalClaims/TwoWheelerMotor/DischargeVoucher";
import getNepalClaimSettlement from "../Products/NepalClaims/TwoWheelerMotor/ClaimSettlement";
import getNepalSurveyorSettlement from "../Products/NepalClaims/TwoWheelerMotor/SurveyorFeeSettlement";
import getNepalSurveyorApproval from "../Products/NepalClaims/TwoWheelerMotor/SurveyorFeeApproval";
import getNepalWithdrawal from "../Products/NepalClaims/TwoWheelerMotor/ClaimWithdraw";

const AllMethod = [
  { prod: "Temp", func: getTempData },
  { prod: "Motor_PrivateCar", func: getTakafulOmanProcessingData },
  { prod: "Motor_PrivateCar_Workshop", func: getTakafulOmanWorkshopData },
  { prod: "Motor_PrivateCar_PClaimHistory", func: getTakafulOmanProcessingClaimHistoryData },
  { prod: "NepalMotorTwoWheeleSurveyor", func: getNepalSurveyor },
  { prod: "NepalMotorTwoWheeleClaimAssessment", func: getNepalAssessment },
  { prod: "NepalMotorTwoWheeleAdvancePayment", func: getNepalClaims },
  { prod: "NepalMotorTwoWheeleRIApproval", func: getNepalRIApproval },
  { prod: "NepalMotorTwoWheeleClaimApproval", func: getNepalClaimApproval },
  { prod: "NepalMotorTwoWheeleDischarge", func: getNepalDischarge },
  { prod: "NepalMotorTwoWheeleClaimSettlement", func: getNepalClaimSettlement },
  { prod: "NepalMotorTwoWheeleSurveyorApproval", func: getNepalSurveyorApproval },
  { prod: "NepalMotorTwoWheeleSurveyorSettlement", func: getNepalSurveyorSettlement },
  { prod: "NepalMotorTwoWheeleClaimWithdrawal", func: getNepalWithdrawal },
];

const getTopLevelContent = ({ prod, dto, masters, genericInfo, location, setLoader, navigate }) => {
  let steps = [];

  steps = AllMethod.filter((x) => x.prod === prod)[0].func[0]({
    dto,
    masters,
    genericInfo,
    location,
    setLoader,
    navigate,
  });

  return steps;
};

const getMenus = ({
  prod,
  menuIndex,
  dto,
  setDto,
  masters,
  setMasters,
  genericInfo,
  location,
  setLoader,
  navigate,
}) => {
  let steps = [];
  steps = AllMethod.filter((x) => x.prod === prod)[0].func[1]({
    menuIndex,
    dto,
    setDto,
    masters,
    setMasters,
    genericInfo,
    location,
    setLoader,
    navigate,
  });

  return steps;
};
const getAccordions = ({
  prod,
  menuIndex,
  dto,
  setDto,
  masters,
  setMasters,
  genericInfo,
  setLoader,
  navigate,
  location,
}) => {
  let steps = [];
  steps = AllMethod.filter((x) => x.prod === prod)[0].func[2]({
    menuIndex,
    dto,
    setDto,
    masters,
    setMasters,
    genericInfo,
    setLoader,
    navigate,
    location,
  });

  return steps;
};

const getControls = ({
  prod,
  menuIndex,
  dto,
  setDto,
  masters,
  setMasters,
  genericInfo,
  location,
  setLoader,
  navigate,
}) => {
  let steps = [];
  steps = AllMethod.filter((x) => x.prod === prod)[0].func[3]({
    menuIndex,
    dto,
    setDto,
    masters,
    setMasters,
    genericInfo,
    location,
    setLoader,
    navigate,
  });

  return steps;
};

const getPolicyDto = async ({
  prod,
  menuIndex,
  dto,
  setDto,
  masters,
  setMasters,
  genericInfo,
  location,
  setLoader,
  navigate,
}) => {
  let steps = [];
  steps = await AllMethod.filter((x) => x.prod === prod)[0].func[4]({
    menuIndex,
    dto,
    setDto,
    masters,
    setMasters,
    genericInfo,
    location,
    setLoader,
    navigate,
  });

  return steps;
};

const getMasters = async ({
  prod,
  menuIndex,
  dto,
  setDto,
  masters,
  setMasters,
  genericInfo,
  location,
  setLoader,
  navigate,
}) => {
  let steps = [];
  steps = await AllMethod.filter((x) => x.prod === prod)[0].func[5]({
    menuIndex,
    dto,
    setDto,
    masters,
    setMasters,
    genericInfo,
    location,
    setLoader,
    navigate,
  });

  return steps;
};

export { getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters };
