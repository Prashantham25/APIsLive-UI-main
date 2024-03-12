import { createContext, useContext, useMemo, useReducer } from "react";

import PropTypes from "prop-types";
import iNubeTheme from "../../../assets/themes/BrokerPortal/iNubeTheme";
import MutualGlobalTheme from "../../../assets/themes/BrokerPortal/MutualGlobalTheme";
import HDFCTheme from "../../../assets/themes/BrokerPortal/HDFCTheme";
import HDFCLifeTheme from "../../../assets/themes/BrokerPortal/HDFCLifeTheme";
import USGITheme from "../../../assets/themes/BrokerPortal/USGITheme";
import SBITheme from "../../../assets/themes/BrokerPortal/SBITheme";
import RSTheme from "../../../assets/themes/BrokerPortal/RSTheme";
import NepalTheme from "../../../assets/themes/BrokerPortal/NepalTheme";
import MagmaTheme from "../../../assets/themes/BrokerPortal/MagmaTheme";
import ProtectiveMITheme from "../../../assets/themes/BrokerPortal/ProtectiveMITheme";
import LICTheme from "../../../assets/themes/BrokerPortal/LICTheme";
import DhofarTheme from "../../../assets/themes/BrokerPortal/DhofarTheme";
import AmanaTakafulTheme from "../../../assets/themes/BrokerPortal/AmanaTakafulTheme";
import LibertyTheme from "../../../assets/themes/BrokerPortal/LibertyTheme";
import PramericaTheme from "../../../assets/themes/BrokerPortal/PramericaTheme";
import NivaBupaTheme from "../../../assets/themes/BrokerPortal/NivaBupaTheme";
import ArabiaFalconTheme from "../../../assets/themes/BrokerPortal/ArabiaFalconTheme";
import TakafulOmanTheme from "../../../assets/themes/BrokerPortal/TakafulOmanTheme";

const ThemeObj = {
  iNubeTheme,
  MutualGlobalTheme,
  HDFCTheme,
  HDFCLifeTheme,
  USGITheme,
  SBITheme,
  RSTheme,
  NepalTheme,
  MagmaTheme,
  ProtectiveMITheme,
  LICTheme,
  DhofarTheme,
  AmanaTakafulTheme,
  LibertyTheme,
  PramericaTheme,
  NivaBupaTheme,
  ArabiaFalconTheme,
  TakafulOmanTheme,
};

const Data = createContext(null);

function ImportAll(brands) {
  const images = {};
  brands.keys().map((item) => {
    if (item.includes("./")) {
      const myKey = item.replace("./", "").replace(/\.[^/.]+$/, "");
      images[myKey] = brands(item);
    }
    return images;
  });
  return images;
}

const images = ImportAll(
  require.context("assets/images/BrokerPortal/CompanyLogos", false, /\.(png|jpe?g|svg)$/)
);

const LOBimage = ImportAll(
  require.context("assets/images/BrokerPortal/LOBLogos", false, /\.(png|jpe?g|svg)$/)
);

const LoginTheme = ImportAll(
  require.context("assets/images/LoginTheme", false, /\.(png|jpe?g|svg)$/)
);

const CompanyLogo = ImportAll(require.context("assets/images/logos", false, /\.(png|jpe?g|svg)$/));

const TravelClaim = ImportAll(
  require.context("assets/images/BrokerPortal/TravelClaim", false, /\.(png|jpe?g|svg)$/)
);
// React reducer
function reducer(state, action) {
  // debugger
  let stateL = state;
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "AZURE_SIDENAV": {
      return { ...state, azureSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    case "LOGO": {
      return { ...state, logo: images[action.value] };
    }
    case "LoginTheme": {
      return { ...state, LoginTheme: LoginTheme[action.value] };
    }
    case "CompanyLogo": {
      return { ...state, CompanyLogo: CompanyLogo[action.value] };
    }
    case "TravelClaim": {
      return { ...state, TravelClaim: TravelClaim[action.value] };
    }

    case "THEME": {
      return {
        ...state,
        custTheme: ThemeObj[action.value.replace("Logo", "Theme")] || MutualGlobalTheme,
      };
    }
    case "CUSTOMER": {
      return { ...state, isCustomer: action.value };
    }
    case "NEW_BUSINESS": {
      return { ...state, isNewBusiness: action.value };
    }
    case "LOGIN": {
      return { ...state, loggedIn: action.value };
    }
    case "PUSH": {
      return { ...state, pathStack: [...state.pathStack, action.value] };
    }
    case "POP": {
      if (state.pathStack.length === 1) return { ...state, pathStack: [] };
      return { ...state, pathStack: state.pathStack.slice[(0, -1)] };
    }
    case "VEHICLE_NUMBER": {
      return { ...state, vehicleNumber: action.value };
    }
    case "GENERATE_QUOTE_INPUT": {
      return { ...state, quickQuoteInput: action.value };
    }
    case "GENERATE_QUOTE": {
      return { ...state, quickQuoteOutput: action.value };
    }
    case "GET_QUOTE": {
      return { ...state, getQuoteOutput: action.value };
    }
    case "SELECTED": {
      return { ...state, selected: action.value };
    }
    case "FAST_LANE": {
      return { ...state, fastLaneOutput: action.value };
    }
    case "USER_DETAILS": {
      return { ...state, customerDetails: action.value };
    }
    case "CORP_DETAILS": {
      return { ...state, corporateDetails: action.value };
    }

    case "Cust_Details": {
      return { ...state, CustomerJson: action.value };
    }
    case "MOTOR_QUOTE_INPUT": {
      return { ...state, motorQuoteInput: action.value };
    }
    case "USER_SELECTION": {
      return { ...state, userSelection: action.value };
    }
    case "PARTNER_DETAILS": {
      return { ...state, partnerDetails: action.value };
    }
    case "QUOTE_PROPOSAL_OUTPUT": {
      return { ...state, quoteProposalOutput: action.value };
    }
    case "REGISTRATION_POSP": {
      return { ...state, registrationInput: action.value };
    }
    case "POSP_JSON": {
      return { ...state, POSPJson: action.value };
    }
    case "Sales_Login": {
      return { ...state, SalesLoginResponse: action.value };
    }
    case "POSP_Details": {
      return { ...state, POSPDetails: action.value };
    }
    case "Masters_POSP": {
      return { ...state, masterSelectionPosp: action.value };
    }
    case "Course_List": {
      return { ...state, courseList: action.value };
    }
    case "Breadcrumbs": {
      return { ...state, BreadCrumbsArray: action.value };
    }
    case "CourseList_Index": {
      return { ...state, CourseBasedOnIndex: action.value };
    }
    case "Navigation": {
      return { ...state, navigateToOtherPage: action.value };
    }
    case "App_Review_Response": {
      return { ...state, appReviewResponse: action.value };
    }
    case "HealthInsuranceDetails": {
      return { ...state, HealthInsuranceDetails: action.value };
    }
    case "DentalInsuranceDetails": {
      return { ...state, DentalInsuranceDetails: action.value };
    }
    case "TravellerInsuranceDetails": {
      return { ...state, TravellerInsuranceDetails: action.value };
    }
    case "Area_Selected": {
      return { ...state, areaSelected: action.value };
    }
    case "morethan60days": {
      return { ...state, morethan60: action.value };
    }
    case "DontKnowPrevdetails": {
      return { ...state, DontKnowPrevdetails: action.value };
    }
    case "vehicleEditButton": {
      return { ...state, vehicleEditButton: action.value };
    }
    case "TravellerInfinityDetails": {
      return { ...state, TravellerInfinityDetails: action.value };
    }

    case "CRMData": {
      return { ...state, CRMData: action.value };
    }
    case "PRODUCT_JSON": {
      if (action.value.value == null) {
        stateL = { ...state, ProductJson: action.value };
      } else if (action.value.value !== null) {
        if (typeof action.value.value !== "object") {
          stateL = {
            ...state,
            ProductJson: { ...stateL.ProductJson, [action.value.key]: action.value.value },
          };
        }

        if (typeof action.value.value === "object") {
          if (action.value.key === "policyTypeId") {
            stateL.ProductJson.policyType = action.value.value.mValue;
          } else if (action.value.key === "templateKeyId") {
            stateL.ProductJson.templateKey = action.value.value.mValue;
          }
          stateL = {
            ...state,
            ProductJson: { ...stateL.ProductJson, [action.value.key]: action.value.value.mID },
          };
        }
      }
      // else{
      //   stateL = { ...state, ProductJson: action.value };

      // }

      return stateL;
    }
    // case "PincodeData": {
    //   return { ...state, PincodeData: action.value };
    // }
    // case "Medicaldiseases": {
    //   return { ...state, Medicaldiseases: action.value };
    // }
    case "Application_No": {
      return { ...state, ApplicationNo: action.value };
    }
    case "Manufacturing_Year": {
      return { ...state, ManufacturingYear: action.value };
    }
    case "TravelClaimJson": {
      return { ...state, TravelClaimJson: action.value };
    }
    case "TravelEnquiryFlag": {
      return { ...state, TravelEnquiryFlag: action.value };
    }
    case "UserDetails": {
      return { ...state, UserDetails: action.value };
    }
    case "ToplevelClaimFlag": {
      return { ...state, ToplevelClaimFlag: action.value };
    }
    case "RISK": {
      // return { ...state, risk: [...state.risk, ...action.value] };
      return { ...state, risk: action.value };
    }
    case "CLAIM": {
      return { ...state, claim: action.value };
    }

    case "INSURABLE_Array": {
      return { ...state, insurableItemMasterArray: action.value };
    }
    case "COVER": {
      // return { ...state, risk: [...state.risk, ...action.value] };
      return { ...state, cover: action.value };
    }
    case "FILTER_POLICY_JSON": {
      return { ...state, filterPolicyJson: action.value };
    }
    case "USER_ID": {
      return { ...state, UserID: action.value };
    }
    case "AGENT_CODE": {
      return { ...state, AgentCode: action.value };
    }
    case "User_Details": {
      return { ...state, UserDetailsCus: action.value };
    }
    case "policy_Data": {
      return { ...state, policyData: action.value };
    }
    case "quote_Data": {
      return { ...state, quoteFetch: action.value };
    }
    case "userpermission": {
      return { ...state, userpermission: action.value };
    }
    case "Transactiondata": {
      return { ...state, Transactiondata: action.value };
    }
    case "BGR_TransactionId": {
      return { ...state, BGRTransactionId: action.value };
    }
    case "Marine_TransactionId": {
      return { ...state, MarineTransactionId: action.value };
    }
    case "Policy_Pending": {
      return { ...state, policyPending: action.value };
    }
    case "Verify_OTP": {
      return { ...state, loginDetails: action.value };
    }
    case "BLUS_TransactionId": {
      return { ...state, BLUSTransactionId: action.value };
    }
    case "ProfileDetail1": {
      return { ...state, ProfileDetail1: action.value };
    }
    case "POSP_Details1": {
      return { ...state, POSPDetails1: action.value };
    }
    case "StepPar": {
      return { ...state, StepPar: action.value };
    }
    case "InterviewLoginFlag": {
      return { ...state, InterviewLoginFlag: action.value };
    }
    case "langVocab": {
      return { ...state, langVocab: action.value };
    }
    case "InterviewStatus": {
      return { ...state, InterviewStatus: action.value };
    }
    case "genericPolicyDto": {
      return { ...state, genericPolicyDto: action.value };
    }
    case "genericInfo": {
      return { ...state, genericInfo: action.value };
    }
    case "AdminLoginFlag": {
      return { ...state, AdminLoginFlag: action.value };
    }
    case "loginUserDetails": {
      return { ...state, loginUserDetails: action.value };
    }
    case "VIEW_FLAG": {
      return { ...state, viewFlag: action.value };
    }
    case "EDIT_FLAG": {
      return { ...state, editFlag: action.value };
    }
    case "CLONE_FLAG": {
      return {
        ...state,
        cloneFlag: action.value,
      };
    }
    case "Prospectdata": {
      return { ...state, Prospectdata: action.value };
    }
    case "Leaddata": {
      return { ...state, Leaddata: action.value };
    }
    case "Clientdata": {
      return { ...state, Clientdata: action.value };
    }
    case "countCRM_Data": {
      return { ...state, countCRM_Data: action.value };
    }
    case "CLAIMS_JSON": {
      // return { ...state, ClaimsJson: action.value };
      stateL = { ...state, ClaimsJson: { ...action.value } };
      return stateL;
    }
    case "Claims_Master": {
      stateL = { ...state, GenericClaimsMaster: { ...action.value } };
      return stateL;
      // return { ...state, GenericClaimsMaster: { ...action.value }  };
    }
    case "Interval_Data": {
      stateL = { ...state, ClaimIntervalData: { ...action.value } };
      return stateL;
    }
    case "POSPPermissions": {
      stateL = { ...state, POSPPermissions: { ...action.value } };
      return stateL;
    }
    case "lifeDetails": {
      stateL = { ...state, lifeDetails: { ...action.value } };
      return stateL;
    }
    case "channelDetails": {
      stateL = { ...state, channelDetails: { ...action.value } };
      return stateL;
    }
    default: {
      return state;
    }
  }
}

// React context provider
function DataControllerProvider({ children }) {
  const initialState = {
    viewFlag: false,
    editFlag: false,
    cloneFlag: false,
    filterPolicyJson: null,
    risk: [],
    claim: [],
    insurableItemMasterArray: [],
    cover: [],
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    azureSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
    logo: images[process.env.REACT_APP_Logo],
    LoginTheme: LoginTheme[process.env.REACT_APP_LoginTheme],
    CompanyLogo: CompanyLogo[process.env.REACT_APP_Logos],
    TravelClaim: TravelClaim[process.env.REACT_APP_TravelClaim],
    custTheme: iNubeTheme,
    isCustomer: true,
    isNewBusiness: true,
    loggedIn: true,
    pathStack: [],
    vehicleNumber: "NEW",
    quickQuoteInput: null,
    quickQuoteOutput: null,
    getQuoteOutput: null,
    selected: {
      Brand: { mID: "2", mValue: "HONDA" },
      CubicCapacity: "1995",
      FuelType: "Petrol",
      Model: { mID: "10", mValue: "CITY" },
      RTO: { mID: "1", mValue: "ANANTAPUR - AP02" },
      SeatingCapacity: "5",
      Variant: { mID: "891", mValue: "1.3 Exi" },
      ManufactureYear: 2022,
      RegistrationDate: "07-09-2022",
      InsuranceCompany: "",
      PolicyNumber: "",
      PolicyDate: "",
      PolicyStartDate: "",
      PolicyEndDate: "",
      PolicyType: "",
      InsuranceCompanyName: "",
      ODPolicyEndDate: null,
      TPPolicyEndDate: null,
      ODPolicyStartDate: null,
      TPPolicyStartDate: null,
    },
    fastLaneOutput: null,
    customerDetails: {
      Name: "",
      MobileNo: "",
      Email: "",
    },
    corporateDetails: {
      CompanyName: "",
      SPOCName: "",
      MobileNo: "",
      Email: "",
    },
    loginDetails: {
      Email: "",
    },
    motorQuoteInput: {
      BusinessType: "4",
      PolicyType: "1",
      VehicleType: "16",
      PolicyTerm: "1",
      ODTerm: "1",
      TPTerm: "3",
    },
    userSelection: {
      NCB: { mID: "12", mValue: "0%" },
      InsuredValue: null,
      Insurers: null,
      AddOns: [],
      PlanType: { mID: "1", mValue: "Package" },
      PlanOption: null,
    },
    partnerDetails: null,
    quoteProposalOutput: null,
    registrationInput: null,
    POSPJson: {
      ProfileImage: "",
      RawImage: "",
      Salutation: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      MaritalStatus: "",
      EmailId: "",
      MobileNo: "",
      DOB: "",
      Aadhar: "",
      Age: "",
      PAN: "",
      AadharFront: "",
      AadharBack: "",
      Pan: "",
      Gender: "",
      CommunicationAddress: {},
      PermAddressSameAsCommAddress: "",
      PermanentAddress: {},
      BankDetails: {},
      EducationDetails: [],
      Status: "Review Pending",
    },
    SalesLoginResponse: null,
    POSPDetails: null,
    POSPDetails1: null,

    masterSelectionPosp: null,
    courseList: null,
    BreadCrumbsArray: [{ name: "Home", link: "/modules/BrokerPortal/Pages/BPLanding" }],
    CourseBasedOnIndex: null,
    navigateToOtherPage: null,
    TravellerInfinityDetails: null,
    CRMData: null,
    appReviewResponse: null,
    HealthInsuranceDetails: null,
    DentalInsuranceDetails: null,
    TravellerInsuranceDetails: null,
    areaSelected: null,
    morethan60: 0,
    DontKnowPrevdetails: null,
    ProfileDetail1: null,

    // PincodeData: null,
    // Medicaldiseases: [],
    // logo: "MAGMA",
    ProductJson: {
      mapId: 0,
      productId: 0,
      productTypeId: 0, // 502 or 503 based on benefit and indemnity
      lobid: 0,
      ratingId: 0,
      partnerId: 0,
      filterCriteria: [],
      organizationId: 112,
      isSingleCover: true,
      isMasterPolicy: false,
      isCoverEvent: false,
      productName: "",
      productCode: "",
      activeFrom: "",
      activeTo: "",
      premiumAmount: 0,
      createdBy: 0,
      createdDate: "",
      modifyBy: 0,
      modifyDate: "",
      cobid: 0,
      coverId: "",
      benefitCriteriaId: "",
      benefitAmount: "",
      coverEventId: "",
      productStatusId: 38,
      currencyId: "",
      templateKey: "",
      templateKeyId: 0,
      policyTypeId: 0,
      policyType: "",
      productChannels: [],
      productClausesWarrentiesExclusions: [],
      productInsurableItems: [],
      productRcbdetails: [],
      riskDetails: [],
      claimDetails: [],
      tblmasClausesWarrentiesExclusions: [],
      productPremium: [],
      insurableRcbdetails: [],
      productSwitchOnProperty: [],
      calculateConfig: [],
      productBasicConfigurationDetails: [],
      productBasicConfiguration: [],
      mapperDTO: [],
      productLifeCycleDTO: [],
      productMapperDTO: [],
      productMasterApiDTO: [],
      sectionDetails: [],
      riskMappingDTO: [],
      featuresDTO: [],
      insurableCategoryId: 0,
      insurableItemTypeId: 0,
      policyJson: "",
    },
    ApplicationNo: "",
    ManufacturingYear: null,
    TravelClaimJson: null,
    TravelEnquiryFlag: false,
    ToplevelClaimFlag: false,
    UserDetails: {
      FirstName: "",
      LastName: "",
      Email: "",
      MobileNo: "",
    },
    UserID: "",
    AgentCode: "",
    UserDetailsCus: {
      FirstName: "",
      LastName: "",
      Email: "",
      MobileNumber: "",
    },
    CustomerJson: null,
    Transactiondata: null,
    policyData: null,
    quoteFetch: null,
    userpermission: [
      {
        mValue: "NewBusiness",
        status: true,
        mData:
          "Select if you are purchasing a new or used vehicle and seeking insurance coverage for the first time",
      },
      {
        mValue: "RollOver",
        status: true,
        mData:
          "Select if you have an active policy currently and seeking to renew with different insurer",
      },
    ],
    BGRTransactionId: "",
    MarineTransactionId: "",
    BLUSTransactionId: "",
    StepPar: 0,
    InterviewLoginFlag: false,
    langVocab: {},
    InterviewStatus: null,
    genericPolicyDto: {},
    genericInfo: {},
    loginUserDetails: {},
    AdminLoginFlag: false,
    Prospectdata: { ProspectID: "", ProspectType: "" },
    Leaddata: { ProspectID: "", ProspectType: "" },
    Clientdata: { ProspectID: "", ProspectType: "" },
    countCRM_Data: {},
    ClaimsJson: null,
    GenericClaimsMaster: {},
    ClaimIntervalData: [],
    POSPPermissions: [],
    lifeDetails: {},
    channelDetails: {
      BranchCode: "",
      BranchLocation: "",
      AgentID: "",
      AgentName: "",
      Salespersoncode: "",
      Salespersonname: "",
      ChannelType: "",
    },
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <Data.Provider value={value}>{children}</Data.Provider>;
}

// React custom hook for using context
function useDataController() {
  const context = useContext(Data);

  if (!context) {
    throw new Error("useDataController should be used inside the dataController.");
  }
  return context;
}

// Typechecking props for the MaterialUIControllerProvider
DataControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setViewFlag = (dispatch, value) => dispatch({ type: "VIEW_FLAG", value });
const setEditFlag = (dispatch, value) => dispatch({ type: "EDIT_FLAG", value });
const setCloneFlag = (dispatch, value) => dispatch({ type: "CLONE_FLAG", value });

const setFilterPolicyJson = (dispatch, value) => dispatch({ type: "FILTER_POLICY_JSON", value });
const setRisk = (dispatch, value) => dispatch({ type: "RISK", value });
const setClaim = (dispatch, value) => dispatch({ type: "CLAIM", value });
const setInsurableItemMasterArray = (dispatch, value) =>
  dispatch({ type: "INSURABLE_Array", value });
const setCover = (dispatch, value) => dispatch({ type: "COVER", value });

const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setAzureSidenav = (dispatch, value) => dispatch({ type: "AZURE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const setLogo = (dispatch, value) => dispatch({ type: "LOGO", value });
const setLoginTheme = (dispatch, value) => dispatch({ type: "LoginTheme", value });
const setCompanyLogo = (dispatch, value) => dispatch({ type: "CompanyLogo", value });
const setTravelClaim = (dispatch, value) => dispatch({ type: "TravelClaim", value });
const setCustTheme = (dispatch, value) => dispatch({ type: "THEME", value });
const setIsCustomer = (dispatch, value) => dispatch({ type: "CUSTOMER", value });
const setIsNewBusiness = (dispatch, value) => dispatch({ type: "NEW_BUSINESS", value });
const setLoggedIn = (dispatch, value) => dispatch({ type: "LOGIN", value });
const pushPathStack = (dispatch, value) => dispatch({ type: "PUSH", value });
const popPathStack = (dispatch) => dispatch({ type: "POP" });
const setVehicleNumber = (dispatch, value) => dispatch({ type: "VEHICLE_NUMBER", value });
const setQuickQuoteInput = (dispatch, value) => dispatch({ type: "GENERATE_QUOTE_INPUT", value });
const setQuickQuoteOutput = (dispatch, value) => dispatch({ type: "GENERATE_QUOTE", value });
const setGetQuoteOutput = (dispatch, value) => dispatch({ type: "GET_QUOTE", value });
const setSelected = (dispatch, value) => dispatch({ type: "SELECTED", value });
const setFastLaneOutput = (dispatch, value) => dispatch({ type: "FAST_LANE", value });

const setTravellerInfinityDetails = (dispatch, value) =>
  dispatch({ type: "TravellerInfinityDetails", value });
const setCRMData = (dispatch, value) => dispatch({ type: "CRMData", value });
const setCustomerDetails = (dispatch, value) => dispatch({ type: "USER_DETAILS", value });
const setCorporateDetails = (dispatch, value) => dispatch({ type: "CORP_DETAILS", value });
const setloginDetails = (dispatch, value) => dispatch({ type: "Verify_OTP", value });
const setMotorQuoteInput = (dispatch, value) => dispatch({ type: "MOTOR_QUOTE_INPUT", value });
const setUserSelection = (dispatch, value) => dispatch({ type: "USER_SELECTION", value });
const setPartnerDetails = (dispatch, value) => dispatch({ type: "PARTNER_DETAILS", value });
const setQuoteProposalOutput = (dispatch, value) =>
  dispatch({ type: "QUOTE_PROPOSAL_OUTPUT", value });
const setRegistrationInput = (dispatch, value) => dispatch({ type: "REGISTRATION_POSP", value });
const setPOSPInput = (dispatch, value) => dispatch({ type: "POSP_JSON", value });
const setSalesLoginResponse = (dispatch, value) => dispatch({ type: "Sales_Login", value });
const setPOSPDetails = (dispatch, value) => dispatch({ type: "POSP_Details", value });
const setPOSPPermissions = (dispatch, value) => dispatch({ type: "POSPPermissions", value });
const setPOSPMasters = (dispatch, value) => dispatch({ type: "Masters_POSP", value });
const setCourseMaster = (dispatch, value) => dispatch({ type: "Course_List", value });
const setBreadcrumbs = (dispatch, value) => dispatch({ type: "Breadcrumbs", value });
const setCourseBasedOnIndex = (dispatch, value) => dispatch({ type: "CourseList_Index", value });
const setNavigation = (dispatch, value) => dispatch({ type: "Navigation", value });
const setAppReviewResponse = (dispatch, value) => dispatch({ type: "App_Review_Response", value });
const setHealthInsuranceDetails = (dispatch, value) =>
  dispatch({ type: "HealthInsuranceDetails", value });
const setDentalInsuranceDetails = (dispatch, value) =>
  dispatch({ type: "DentalInsuranceDetails", value });

const setTravellerInsuranceDetails = (dispatch, value) =>
  dispatch({ type: "TravellerInsuranceDetails", value });
const setAddressSelected = (dispatch, value) => dispatch({ type: "Area_Selected", value });
const setmorethan60 = (dispatch, value) => dispatch({ type: "morethan60days", value });
const setDontKnowPrevdetails = (dispatch, value) =>
  dispatch({ type: "DontKnowPrevdetails", value });
const setvehicleEditButton = (dispatch, value) => dispatch({ type: "vehicleEditButton", value });
const setProductJson = (dispatch, value) => dispatch({ type: "PRODUCT_JSON", value });
// const setPincodeData = (dispatch, value) => dispatch({ type: "PincodeData", value });
// const setMedicaldiseases = (dispatch, value) => dispatch({ type: "Medicaldiseases", value });
const setApplicationNo = (dispatch, value) => dispatch({ type: "Application_No", value });
const setManufacturingYear = (dispatch, value) => dispatch({ type: "Manufacturing_Year", value });
const setTravelClaimJson = (dispatch, value) => dispatch({ type: "TravelClaimJson", value });
const setTravelEnquiryFlag = (dispatch, value) => dispatch({ type: "TravelEnquiryFlag", value });
const setUserDetails = (dispatch, value) => dispatch({ type: "UserDetails", value });
const setToplevelClaimFlag = (dispatch, value) => dispatch({ type: "ToplevelClaimFlag", value });
const setUserID = (dispatch, value) => dispatch({ type: "USER_ID", value });
const setAgentCode = (dispatch, value) => dispatch({ type: "AGENT_CODE", value });
const setUserDetailsCus = (dispatch, value) => dispatch({ type: "User_Details", value });
const setCustomerJson = (dispatch, value) => dispatch({ type: "Cust_Details", value });
const setpolicyData = (dispatch, value) => dispatch({ type: "policy_Data", value });
const setquoteData = (dispatch, value) => dispatch({ type: "quote_Data", value });
const setuserpermission = (dispatch, value) => dispatch({ type: "userpermission", value });
const setTransactiondata = (dispatch, value) => dispatch({ type: "Transactiondata", value });
const setBGRTransactionId = (dispatch, value) => dispatch({ type: "BGR_TransactionId", value });
const setMarineTransactionId = (dispatch, value) =>
  dispatch({ type: "Marine_TransactionId", value });
const setPolicyPendingData = (dispatch, value) => dispatch({ type: "Policy_Pending", value });
const setBLUSTransactionId = (dispatch, value) => dispatch({ type: "BLUS_TransactionId", value });
const setProfileDetail = (dispatch, value) => dispatch({ type: "ProfileDetail1", value });
const setPOSPDetails1 = (dispatch, value) => dispatch({ type: "POSP_Details1", value });
const setStepPar = (dispatch, value) => dispatch({ type: "StepPar", value });
const setInterviewLoginFlag = (dispatch, value) => dispatch({ type: "InterviewLoginFlag", value });
const setLangVocab = (dispatch, value) => dispatch({ type: "langVocab", value });
const setInterviewStatus = (dispatch, value) => dispatch({ type: "InterviewStatus", value });
const setGenericPolicyDto = (dispatch, value) => dispatch({ type: "genericPolicyDto", value });
const setGenericInfo = (dispatch, value) => dispatch({ type: "genericInfo", value });
const setAdminLoginFlag = (dispatch, value) => dispatch({ type: "AdminLoginFlag", value });
const setLoginUserDetails = (dispatch, value) => dispatch({ type: "loginUserDetails", value });
const setProspectdata = (dispatch, value) => dispatch({ type: "Prospectdata", value });
const setLeaddata = (dispatch, value) => dispatch({ type: "Leaddata", value });
const setClientdata = (dispatch, value) => dispatch({ type: "Clientdata", value });
const setcountCRMData = (dispatch, value) => dispatch({ type: "countCRM_Data", value });
const setClaimsJson = (dispatch, value) => dispatch({ type: "CLAIMS_JSON", value });
const setGenericClaimMaster = (dispatch, value) => dispatch({ type: "Claims_Master", value });
const setClaimIntervalMaster = (dispatch, value) => dispatch({ type: "Interval_Data", value });
const setLifeDetails = (dispatch, value) => dispatch({ type: "lifeDetails", value });
const setChannelDetails = (dispatch, value) => dispatch({ type: "channelDetails", value });

export {
  DataControllerProvider,
  useDataController,
  setViewFlag,
  setEditFlag,
  setCloneFlag,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setAzureSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
  setLogo,
  setLoginTheme,
  setCompanyLogo,
  setTravelClaim,
  setCustTheme,
  setIsCustomer,
  setIsNewBusiness,
  setLoggedIn,
  pushPathStack,
  popPathStack,
  setTravellerInfinityDetails,
  setCRMData,
  setVehicleNumber,
  setQuickQuoteInput,
  setQuickQuoteOutput,
  setGetQuoteOutput,
  setSelected,
  setFastLaneOutput,
  setCustomerDetails,
  setMotorQuoteInput,
  setUserSelection,
  setPartnerDetails,
  setQuoteProposalOutput,
  images,
  LOBimage,
  LoginTheme,
  TravelClaim,
  setRegistrationInput,
  setPOSPInput,
  setSalesLoginResponse,
  setPOSPDetails,
  setPOSPMasters,
  setCourseMaster,
  setBreadcrumbs,
  setCourseBasedOnIndex,
  setNavigation,
  setAppReviewResponse,
  setHealthInsuranceDetails,
  setDentalInsuranceDetails,
  setTravellerInsuranceDetails,
  setAddressSelected,
  setmorethan60,
  setDontKnowPrevdetails,
  setvehicleEditButton,
  setProductJson,
  setCorporateDetails,
  // setPincodeData,
  // setMedicaldiseases,
  setApplicationNo,
  setManufacturingYear,
  setTravelClaimJson,
  setTravelEnquiryFlag,
  setUserDetails,
  setToplevelClaimFlag,
  setClaim,
  setRisk,
  setInsurableItemMasterArray,
  setCover,
  setFilterPolicyJson,
  setUserID,
  setAgentCode,
  setUserDetailsCus,
  setCustomerJson,
  setpolicyData,
  setquoteData,
  setuserpermission,
  setTransactiondata,
  setBGRTransactionId,
  setMarineTransactionId,
  setPolicyPendingData,
  setloginDetails,
  setBLUSTransactionId,
  setProfileDetail,
  setPOSPDetails1,
  setStepPar,
  setInterviewLoginFlag,
  setLangVocab,
  setInterviewStatus,
  setGenericPolicyDto,
  setGenericInfo,
  setAdminLoginFlag,
  setLoginUserDetails,
  setProspectdata,
  setLeaddata,
  setClientdata,
  setcountCRMData,
  setClaimsJson,
  setGenericClaimMaster,
  setClaimIntervalMaster,
  setPOSPPermissions,
  setLifeDetails,
  setChannelDetails,
};

/* Using context

const [controller, dispatch] = useDataController();
const { RTO, Brand, Model, FuelType, FuelVariant } = controller;

Remember to enclose the render object with the context tag

<DataControllerProvider>
      <MaterialUIControllerProvider>
        <BPApp />
      </MaterialUIControllerProvider>
    </DataControllerProvider>

*/

/*
// React reducer
function reducer(state, action) {
  switch (action.type) {
    case "RTO": {
      return { ...state, RTO: action.value };
    }
    case "BRAND": {
      return { ...state, Brand: action.value };
    }
    case "MODEL": {
      return { ...state, Model: action.value };
    }
    case "FUEL_TYPE": {
      return { ...state, FuelType: action.value };
    }
    case "FUEL_VARIANT": {
      return { ...state, FuelVariant: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// React context provider
function DataControllerProvider({ children }) {
  const initialState = {
    RTO: [],
    Brand: [],
    Model: [],
    FuelType: [],
    FuelVariant: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <Data.Provider value={value}>{children}</Data.Provider>;
}

// React custom hook for using context
function useDataController() {
  const context = useContext(Data);

  if (!context) {
    throw new Error("useDataController should be used inside the dataController.");
  }
  return context;
}

// Typechecking props for the MaterialUIControllerProvider
DataControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setRTO = (dispatch, value) => dispatch({ type: "RTO", value });
const setBrand = (dispatch, value) => dispatch({ type: "BRAND", value });
const setModel = (dispatch, value) => dispatch({ type: "MODEL", value });
const setFuelType = (dispatch, value) => dispatch({ type: "FUEL_TYPE", value });
const setFuelVariant = (dispatch, value) => dispatch({ type: "FUEL_VARIANT", value });
const setGeneral = (dispatch, key, value) => dispatch({ type: key, value });

export {
  DataControllerProvider,
  useDataController,
  setRTO,
  setBrand,
  setModel,
  setFuelType,
  setFuelVariant,
  setGeneral,
};
*/
