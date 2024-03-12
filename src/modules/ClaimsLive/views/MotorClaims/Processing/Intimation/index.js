import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Autocomplete,
  Backdrop,
  CircularProgress,
  Step,
  Stepper,
  StepLabel,
  Radio,
  Stack,
  MenuItem,
  MenuList,
  Tab,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
import moment from "moment";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import SuccessTick from "assets/images/Takaful/SuccessTick.png";
import NoPolicy from "assets/images/Takaful/NoPolicy.png";
import MDBox from "components/MDBox";
import { MotorIntimateJson } from "../data/JsonData";
import {
  // Policies
  GetProdPartnermasterData,
  GetProdPartnermastersMasterData,
  UpdateSequenceNumber,
  SaveClaimDetails,
  GetClaimDetails,
  SaveClaimHistory,
  DocumentUpload,
  // getDocumentById,
  DeleteDocument,
  GetPayLoadByQueryDynamic, // to get existing claim in the 2nd datagrid of 2nd stepper
  // SearchClaimDetailsByClaimNo,
  GenericApi,
} from "../data/index";
import IntimationDetails from "./IntimationDetails";
import Notes from "./Notes";
import UploadDocuments from "./UploadDocument";
import { diffDaysCalculator } from "../../../../../../Common/Validations/index";

const localUserName = localStorage.getItem("userName");
const localUserID = localStorage.getItem("userId");

const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
    fontSize: "1.2em",
  },
};
// const drawerWidth = 240;
// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );
// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

function MotorIntimation() {
  const steps = ["Search a Policy", "Policy Details", "Register a New Claim"];
  const [loading, setLoading] = useState(false);
  const [IntimateJson, setIntimationJson] = useState(MotorIntimateJson); // Json
  const [stepForward, setStepForword] = useState(0);
  const [transactionDTOLen, setTransactionDTOLen] = useState(0);
  const [ids, setIds] = useState(0);
  // const [tableRows, setTableRows] = useState([]); // to get data for 1st grid
  const [selectedRow, setSelectedRow] = useState(""); // selected row of 1st datagrid

  const [Claimflag, setClaim] = useState(false); // to get 2nd datagrid
  const [ClaimRows, setClaimRows] = useState([]); // to get data for 2nd grid
  const [selectedClaimRow, setSelectedClaimRow] = useState(""); // selected row of 2nd datagrid

  const [policyresponse, setPolicyresponse] = useState([]);

  const [SearchObj, SetSearchObj] = useState({
    productType: "Motor Private",
    PolicyNo: "",
    chassisNo: "",
    civilID: "",
  });

  const [selectCheckbox, setSelectCheckBox] = useState([]);
  const [ReviewClaimRows, setReviewRows] = useState([]);
  const [ExistClaimRows, setExistClaimRows] = useState([]);
  const [CancelJson, setCancelJson] = useState([]); // for cancel in review claim summary datagrid
  const [Saveclaimjson, setSaveclaimjson] = useState([]); // after intimate claim
  const [Note, setNote] = useState("");
  const [severity, setSeverity] = useState("");
  const [respMessage, setRespMessage] = useState("");

  // const [NameItem, setName] = useState("");
  // const [page, setPage] = useState("");
  // const [Dopen, setDopen] = useState(false);

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClick = (newState) => {
    setState({ open: true, ...newState });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const newdata = {
    transactionDetails: {
      TransactionFlag: "True",
      ProductCode: "Motor_PrivateCar",
      NumberType: "ODClaimNumber",
      Prefix: "",
      AttributeName: "TransactionNumber",
      TransactionType: "Pre/Post",
      TransactionNo: "",
      CoverDetails: {},
      ClaimsInfo: {
        IntimationDetails: {
          ProximityDays: "",
          isAnyWitness: "No",
          IntimationMode: "",
          AccidentLocation: "",
          otherAccidentLocation: "",
          AccidentDate: "",
          causeofAccident: "",
          AccidentRemarks: "",
          NotifiedBy: "Participant",
          wasVehicleParked: "No",
          DriverName: "",
          DriverAge: "",
          DrivingLicenseNo: "",
          Gender: "",
          DriverMobileNo: "",
          DLCategory: "",
          Nationality: "",
          isROPReported: "",
          ROPNo: "",
          ROPReportDate: "",
          ROPOfficerName: "",
          ROPLocation: "",
        },
        ProcessingDetails: {
          wasVehicleParked: "No",
          DriverName: "",
          DriverAge: "",
          DrivingLicenseNo: "",
          Gender: "",
          DriverMobileNo: "",
          DLCategory: "",
          Nationality: "",
          isROPReported: "",
          ROPNo: "",
          ROPReportDate: "",
          ROPOfficerName: "",
          ROPLocation: "",
        },
        InsurableItem: [
          {
            InsurableName: "",
            RiskItems: [
              {
                isInsured: "No", // 2
                needtowingservices: "No",
                VehiclereplacementCoverage: "",
                MobileNo: "",
                otherLocation: "",
                otherWorkShop: "",
                isTPVehicleDamaged: "No",
                Gender: "",
                Make: "",
                otherMake: "",
                Model: "",
                otherModel: "",
                // TP Vehicle Details
                vehicleType: "",
                mulkiyaExpiryDate: "",
                TPAge: "",
                VehiclePlateNo: "",
                isAmbulanceServiceAvailed: "",
                isTPPropertyDamaged: "No",
                PropertyType: "",
                PropertyDescription: "",
                otherpropertyDescription: "",
                Wilayat: "",
                OtherWilayat: "",
                Claimshandler: "",
                Relationwithparticipant: "",
                otherRelationwithparticipant: "",
                isInjurySelfOrTP: "No",
                InjuryType: "",
                IsDeseasedAccident: "No",
                IsAnimalDeathOrInjury: "No",
                TypeofAnimal: "",
                OtherTypeofAnimal: "",
                Typeofloss: "",
                Count: "1",
              },
            ],
          },
        ],
      },
      UWDetails: [{}],
      InvestigatorDetails: [
        {
          InvoiceDetails: "",
        },
      ],
      ReserveDetails: {
        TotalAmount: "",
        ReserverHistory: [
          {
            Indemnity: [
              {
                Amount: "",
              },
            ],
            Hospital: [
              {
                Amount: "",
              },
            ],
            Expense: [
              {
                Amount: "",
              },
            ],
          },
        ],
      },
      SurveyorDetails: [
        {
          ClaimsHandler: [],
          AssessmentDetails: [
            {
              TypeOfLoss: "",
              LossAssessmentStage: "Initial",
              InitialLossAssessment: {
                NewParts: { DepreciationPerc: "20" },
                UsedParts: {},
                Labour: {},
                ATLBasis: {},
                CashLossBasis: {},
                InvoiceDetails: [],
                EstimateDetails: [],
                Observations: [],
                ScopeofRepair: [],
              },
              RepairLossAssessment: {},
            },
          ],
        },
      ],
      AssessmentSummary: {},
      InvoiceDetails: [],
      EstimateDetails: [],
      Observations: [],
      WorkshopDetails: [
        { Location: "", WorkShop: "", ContactNo: "", otherLocation: "", otherWorkShop: "" },
      ],
      Remarks: [],
      Documents: [],
      HospitalDetails: [{}],
      ServiceProvider: [{}],
      DocumentDetails: [{}],
      TPADetails: [{}],
      EmployeeDetails: {},
      CourierDetails: [{}],
      BillingDetails: [{}],
      WorkOrderDetails: [
        {
          Type: "DeliveryOrder/WorkOrder",
        },
      ],
      ClaimAmountDetails: { InitialLossAssessment: {}, RepairLossAssessment: {} },
      ActualPaymentDetails: [
        {
          PaidTo: "",
        },
      ],
      AuditDetails: [{}],
      WFDetails: {},
      WfId: "",
      WFHistory: [
        {
          StatusChangeandRemarks: "",
        },
      ],
      ReInsuranceReserveDetails: "",
      TotalAmount: "",
      BRETriggerDetails: [
        {
          TriggerEvent: "Auto",
          BREDetails: [{}],
        },
      ],
      PayeeDetails: [],
      ClaimPaymentDetails: {
        Total: [
          {
            Type: "Indemnity",
            TotalAmount: "",
          },
          {
            Type: "Expense",
            TotalAmount: "",
          },
        ],
      },
      Details: [
        {
          Type: "Expense/Indemnity",
        },
      ],
    },
    transactionId: "0",
    isValid: "",
    createdDateTime: "",
    modifiedDateTime: "",
    createdBy: "",
    modifiedBy: "",
    occurrence: "",
    claimId: "0",
    statusId: "0",
    claimTypeId: "0",
    claimServiceTypeId: "0",
    causeOfLossId: "0",
    actionId: "0",
    isServeyorAssign: "True",
    isWorkshopAssign: "True",
    isInvestigatorAssign: "True",
    isBackByManager: "True",
    isReOpen: "True",
    isRoadSideAssistance: "True",
    approximateEstimatedCost: "0",
    remark: "",
    internalRemark: "",
    emergencyContact: "",
    emergencyEmail: "",
    queryReasonIds: "",
    rejectionReasonIds: "",
    accidentFactor: "",
    accidentFactorDescription: "",
    isRead: "True",
    approvedAmount: "0",
    decisionTypeid: "0",
    settlementTypeid: "0",
    closeReasonIds: "",
    isPriorityClaim: "True",
    reopenReasonIds: "",
    advanceAmount: "0",
    claimN: "",
    workItemNo: "",
    workItemId: "0",
    userName: "",
    transactionNumber: "",
    transactionStageStatusId: "0",
    transactionStageId: "0",
    isActive: "True",
  };
  // const onBtnClick = (x) => {
  //   setName(x.name);
  //   setPage(x.page);
  //   // setMenuFlag(false);
  //   localStorage.setItem("RND_Page", x.name);
  // };
  // // const [newTranData, setNewTranData] = useState(newdata);
  // console.log("Wee", newTranData);
  const [masters, setMasters] = useState({
    Gender: [],
    checked: [], // checked claim number to upload note
    RelationshipToProposer: [],
    IntimationMode: [],
    Notifier: [],
    DLCategory: [],
    Nationality: [],
    Location: [],
    ClaimHandler: [],
    WorkshopLocation: [],
    WorkShop: [],
    TypeofAnimal: [],
    VehicleType: [],
    PropertyDescription: [],
    Make: [],
    Model: [],
    NotesRows: [], // grid rows saved
    i: 0,
    cancel: [],
    NoteArr: [],
    open: false,
    uploadopen: false,
    Noteopen: false,
    CreateNote: false,
    Noteviewopen: false,
    viewmodel: false,
    TransaData: newdata,
    Accordion: "",
    EmailId: false,
    Flags: {
      error: false,
      TPVehicle: false,
      ParticipantVehicle: false,
      TPProperty: false,
      Injury: false,
      Death: false,
      Animal: false,
    },
    Doc: {
      DocName: "",
      DocId: "",
      FileName: "",
      DocType: "",
      UserId: localUserID,
      UserName: localUserName,
      UploadedDate: "",
    },
  });
  useEffect(async () => {
    setLoading(true);
    const data = [
      { MasterType: "CommonMaster", filterCriteria: {} },
      { MasterType: "Wilayat", filterCriteria: {} },
      { MasterType: "Nationality", filterCriteria: {} },
      { MasterType: "WorkshopLocation", filterCriteria: {} },
      { MasterType: "Make", filterCriteria: {} },
    ];
    // IntimateJson.transactionDataDTO[0] = newdata;
    // // newTranData[0] = newdata;
    // // setNewTranData({ ...newTranData });
    // setIntimationJson({ ...IntimateJson });
    data.forEach(async (x) => {
      const fetchData = async () => {
        const response = await GetProdPartnermasterData(1228, x.MasterType);
        const dataArray = Array.isArray(response.data) ? response : [];
        if (x.MasterType === "CommonMaster") {
          masters.Gender = dataArray.data.filter((item) => item.Code === "Gender");
          masters.RelationshipToProposer = dataArray.data.filter(
            (item) => item.Code === "RelationshipToProposer"
          );
          masters.IntimationMode = dataArray.data.filter((item) => item.Code === "IntimationMode");
          masters.Notifier = dataArray.data.filter((item) => item.Code === "Notifier");
          masters.DLCategory = dataArray.data.filter((item) => item.Code === "DLCategory");
          masters.ClaimHandler = dataArray.data.filter((item) => item.Code === "ClaimHandler");
          masters.TypeofAnimal = dataArray.data.filter((item) => item.Code === "TypeOfAnimal");
          masters.VehicleType = dataArray.data.filter((item) => item.Code === "VehicleType");
          masters.PropertyDescription = dataArray.data.filter(
            (item) => item.Code === "PropertyDescription"
          );
        }
        if (x.MasterType === "Nationality") {
          masters.Nationality = dataArray.data;
        }
        if (x.MasterType === "Wilayat") {
          masters.Location = dataArray.data;
        }
        if (x.MasterType === "WorkshopLocation") {
          masters.WorkshopLocation = dataArray.data;
        }
        if (x.MasterType === "Make") {
          masters.Make = dataArray.data;
        }
      };
      await fetchData();
      setMasters({
        ...masters,
      });
    });
    setLoading(false);
  }, []);

  // claim search navigate flow
  const { search } = useLocation();
  const ClaimNumber = new URLSearchParams(search).get("ClaimNumber");
  useEffect(async () => {
    if (ClaimNumber !== null) {
      setLoading(true);
      setStepForword(2);

      const res = await GetClaimDetails(ClaimNumber);
      setSaveclaimjson({ ...res.data.finalResult[0] });
      masters.TransaData.transactionDetails = {
        ...res.data.finalResult[0].transactionDataDTO[0].transactionDetails,
      };
      // setDopen(true);
      const updatedSelectCheckbox = { ...selectCheckbox };
      const split =
        res.data.finalResult[0].transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident.split(
          ","
        );
      if (split.length === 0) {
        updatedSelectCheckbox[
          res.data.finalResult[0].transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident
        ] =
          res.data.finalResult[0].transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident;
      } else {
        split.forEach((x) => {
          updatedSelectCheckbox[x] = x;
        });
      }
      const rowss = [];
      res.data.finalResult[0].transactionDataDTO.forEach((x, i) => {
        const date = x.createdDateTime !== null ? x.createdDateTime.split("T")[0].split("-") : "";
        const ref = {
          ReferenceNo: i + 1,
          ClaimCategory: x.transactionNumber.substr(0, 2),
          IntimatedDate: x.createdDateTime !== null ? `${date[1]}/${date[2]}/${date[0]}` : "",
          ClaimNo: x.transactionNumber,
        };

        rowss.push(ref);
      });
      setExistClaimRows(rowss);
      setSelectCheckBox(updatedSelectCheckbox);
      // to get the previously added notes inside grid
      res.data.finalResult[0].transactionDataDTO.forEach((x) => {
        x.transactionDetails.Remarks.forEach((y) => {
          masters.NotesRows.push(y);
        });
      });
      const Claim = res.data.finalResult[0];
      Claim.claimBasicDetails.PolicyDetails.isIntimated = "Yes";
      setIntimationJson({ ...Claim });
      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isInsured =
        "No";
      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isTPVehicleDamaged =
        "No";
      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isTPPropertyDamaged =
        "No";
      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isInjurySelfOrTP =
        "No";
      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].IsDeseasedAccident =
        "No";
      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].IsAnimalDeathOrInjury =
        "No";
      setMasters({ ...masters });
      console.log("999", res, split);
      setLoading(false);
    }
  }, []);
  const handleMenu = (key) => {
    // setExpanded(0);
    // const steps = getAccordianSteps(productCode, key, ClaimsJson);
    // setAccordianSteps([...steps]);
    // setX(steps[0]?.label);
    setIds(key);
    // setEdit(true);
    // if ((menu1[key]?.apiList ? menu1[key].apiList : []).length > 0) {
    //   menu1[key].apiList.forEach(async (x) => {
    //     setLoading(true);
    //     const res = await anyApiCall(x.MethodType, x.url, x.data);
    //     setLoading(false);
    //     if (res.status === 1 || res.status === 200) {
    //       GenericClaimsMaster[x.MasterType] = res.data;
    //       setGenericClaimMaster(dispatch, GenericClaimsMaster);
    //     }
    //   });
  };
  // const chip = [{ mID: "3", mValue: "Hari" }];
  // const FeildData = [
  //   [
  //     {
  //       label: "Plan Name",
  //       type: "Input",
  //       visible: true,
  //       required: true,
  //       spacing: 2.7,
  //       path: "PlanCreation.planname",
  //       validationId: 1,
  //     },
  //   ],

  //   [
  //     {
  //       label: "Plan Name",
  //       type: "Input",
  //       visible: true,
  //       required: true,
  //       spacing: 2.7,
  //       path: "PlanCreation.planname",
  //       validationId: 1,
  //     },
  //   ],
  // ];
  const data = [
    {
      PolicyDetailsStep: [
        {
          type: "Input",
          name: "ParticipantName",
          label: "Participant Name",
          required: true,
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          maxLength: 100,
          value: IntimateJson.claimBasicDetails.PolicyDetails.ParticipantName,
          error:
            IntimateJson.claimBasicDetails.PolicyDetails.ParticipantName === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          sx: redAsterisk,
          Accordion: "PolicyDetailsStep",
        },

        {
          type: "AutoComplete",
          name: "producttype",
          label: "Product Type",
          required: true,
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          option: [{ mValue: "Motor Private" }, { mValue: "Motor Commercial" }],
          value: IntimateJson.claimBasicDetails.PolicyDetails.productType,
          error:
            IntimateJson.claimBasicDetails.PolicyDetails.productType === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          sx: redAsterisk,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "Input",
          name: "policyno",
          label: "Policy No.",
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          maxLength: 21,
          value: IntimateJson.claimBasicDetails.PolicyDetails.PolicyNo,
          required: true,
          error:
            IntimateJson.claimBasicDetails.PolicyDetails.PolicyNo === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          sx: redAsterisk,
          Accordion: "PolicyDetailsStep",
        },

        {
          type: "DateTimePicker",
          name: "policystartdatetime",
          label: "Policy Start Date & Time",
          required: true,
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          value: IntimateJson.claimBasicDetails.PolicyDetails.PolicyStartDate,
          spacing: 3,
          sx: redAsterisk,
          error:
            IntimateJson.claimBasicDetails.PolicyDetails.PolicyStartDate === ""
              ? masters.Flags.error
              : null,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "DateTimePicker",
          name: "policyenddatetime",
          label: "Policy End Date & Time",
          sx: redAsterisk,
          required: true,
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          value: IntimateJson.claimBasicDetails.PolicyDetails.PolicyEndDate,
          spacing: 3,
          error:
            IntimateJson.claimBasicDetails.PolicyDetails.PolicyEndDate === ""
              ? masters.Flags.error
              : null,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "Input",
          name: "vehicleplateno",
          label: "Vehicle Plate No.",
          required: true,
          sx: redAsterisk,
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          maxLength: 10,
          value: IntimateJson.claimBasicDetails.PolicyDetails.VehiclePlateNo,
          error:
            IntimateJson.claimBasicDetails.PolicyDetails.VehiclePlateNo === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "Input",
          name: "vehicleusagetype",
          label: "Vehicle Usage Type",
          required: true,
          sx: redAsterisk,
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          value: IntimateJson.claimBasicDetails.PolicyDetails.VehicleUsageType,
          error:
            IntimateJson.claimBasicDetails.PolicyDetails.VehicleUsageType === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "Input",
          name: "chassisno",
          label: "Chassis No.",
          required: true,
          sx: redAsterisk,
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          maxLength: 25,
          value: IntimateJson.claimBasicDetails.PolicyDetails.ChassisNumber,
          error:
            IntimateJson.claimBasicDetails.PolicyDetails.ChassisNumber === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "Input",
          name: "engineno",
          label: "Engine No.",
          maxLength: 25,
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          value: IntimateJson.claimBasicDetails.PolicyDetails.EngineNumber,
          spacing: 3,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "Input",
          name: "ParticipantMobileNo",
          label: "Participant Mobile No.",
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          maxLength: 8,
          value: IntimateJson.claimBasicDetails.PolicyDetails.MobileNumber,
          spacing: 3,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "Input",
          name: "emailId",
          label: "Email ID",
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          value: IntimateJson.claimBasicDetails.PolicyDetails.EmailId,
          spacing: 3,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "Input",
          name: "Coverages",
          label: "Coverages",
          multiline: true,
          disabled:
            policyresponse.length !== 0 ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          value: IntimateJson.claimBasicDetails.PolicyDetails.Coverages,
          spacing: 12,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "CheckBox",
          name: "isPolicyDetailsVerified",
          label: "Policy details are verified",
          spacing: 12,
          required: true,
          disabled:
            selectedClaimRow !== "" ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          path: IntimateJson.claimBasicDetails.PolicyDetails.isPolicyDetailsVerified,
          error:
            IntimateJson.claimBasicDetails.PolicyDetails.isPolicyDetailsVerified === false
              ? masters.Flags.error
              : null,
          Accordion: "PolicyDetailsStep",
        },
        {
          type: "CheckBox",
          name: "iscommunicationMbEm",
          label: "Would you like to receive communications on your Mobile No. & Email ?",
          disabled:
            selectedClaimRow !== "" ||
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes",
          spacing: 12,
          Accordion: "PolicyDetailsStep",
          path: IntimateJson.claimBasicDetails.PolicyDetails.iscommunicationMbEm,
        },
      ],

      IntimationDetailsStep: [
        {
          type: "DateTimePicker",
          name: "AccidentDate",
          label: "Accident Date & Time",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate,
          required: true,
          sx: redAsterisk,
          minDate: IntimateJson.claimBasicDetails.PolicyDetails.PolicyStartDate,
          maxDate: new Date(),
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "AccidentLocation",
          label: "Accident Location",
          required: true,
          sx: redAsterisk,
          option: masters.Location,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation ===
            ""
              ? masters.Flags.error
              : null,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation ===
              "Others" && "Input",
          name: "Locationdetails",
          label: "Location details",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          required: true,
          sx: redAsterisk,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails
              .otherAccidentLocation,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails
              .otherAccidentLocation === ""
              ? masters.Flags.error
              : null,
          spacing: 6,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "IntimationMode",
          label: "Intimation Mode",
          option: masters.IntimationMode,
          InputProps: { readOnly: true },
          disabled: true,
          required: true,
          sx: redAsterisk,
          value:
            (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode =
              "Call Center"),
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "NotifiedBy",
          label: "Notified By",
          option: masters.Notifier,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          required: true,
          sx: redAsterisk,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy === ""
              ? masters.Flags.error
              : null,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },

        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy ===
              "Others" && "Input",
          name: "NotifierName",
          label: "Notifier Name",
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierName,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          required: true,
          sx: redAsterisk,
          maxLength: 100,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierName === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy ===
              "Others" && "Input",
          name: "NotifierMobileNo",
          label: "Notifier Mobile No.",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierMobileNo,
          required: true,
          sx: redAsterisk,
          maxLength: 10,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierMobileNo ===
            ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "Isthereanywitness?",
          label: "Is there any witness?",
          option: [{ mValue: "Yes" }, { mValue: "No" }],
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isAnyWitness,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isAnyWitness ===
              "Yes" && "Input",
          name: "Witnessname",
          label: "Witness Name",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          required: true,
          sx: redAsterisk,
          maxLength: 100,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessName,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessName === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isAnyWitness ===
              "Yes" && "Input",
          name: "WitnessMobileNo",
          label: "Witness Mobile No.",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          required: true,
          sx: redAsterisk,
          maxLength: 10,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessMobileNo,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessMobileNo ===
            ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "Typography",
          name: "causeofaccidenttypo",
          label: "Cause of Accident",
          required: true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident ===
            ""
              ? masters.Flags.error
              : null,
          spacing: 12,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          label: "Over-Speed",
          value: "Over-Speed",
          spacing: 2,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          label: "Negligence",
          value: "Negligence",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          spacing: 2,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          label: "Fatigue",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          value: "Fatigue",
          spacing: 2,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          label: "Overtaking",
          value: "Overtaking",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          spacing: 2,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          label: "Weather Conditions",
          value: "Weather Conditions",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          spacing: 2.7,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          label: "Sudden Halt",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          value: "Sudden Halt",
          spacing: 2,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          label: "No safety distance",
          value: "No safety distance",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          spacing: 2.7,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          label: "Wrong Action",
          value: "Wrong Action",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          spacing: 2.3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          label: "Vehicle Defects",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          value: "Vehicle Defects",
          spacing: 2.3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          label: "Road Defects",
          value: "Road Defects",
          spacing: 2.3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "CheckBox",
          name: "causeofaccident",
          label: "Theft",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          value: "Theft",
          spacing: 2.3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 9,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "Input",
          name: "AccidentRemarks",
          label: "Accident Remarks",
          multiline: true,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentRemarks,
          spacing: 12,
          required: true,
          sx: redAsterisk,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentRemarks ===
            ""
              ? masters.Flags.error
              : null,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "RadioGroup",
          visible: true,
          required: true,
          name: "wasVehicleParked",
          radioLabel: { label: "Was the vehicle parked ?" },
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
            ""
              ? masters.Flags.error
              : null,
          spacing: 12,
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "Typography",
          name: "DriverDetails",
          label: "Driver Details",
          spacing: 2,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "Typography",
          name: "",
          label: "",
          spacing: 10,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "Input",
          name: "DriverName",
          label: "Driver Name",
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverName,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverName === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "Input",
          name: "DriverAge",
          label: "Driver Age",
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          required: true,
          sx: redAsterisk,
          maxLength: 2,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "Input",
          name: "DrivingLicenseNo",
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          label: "Driving License No.",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
          required: true,
          sx: redAsterisk,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo ===
            ""
              ? masters.Flags.error
              : null,
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "AutoComplete",
          name: "DLCategory",
          label: "DL Category",
          required: true,
          sx: redAsterisk,
          option: masters.DLCategory,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },

        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "AutoComplete",
          name: "Gender",
          label: "Gender",
          option: masters.Gender,
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Gender,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Gender === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "Input",
          name: "DriverMobileNo",
          label: "Mobile Number",
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          required: true,
          sx: redAsterisk,
          maxLength: 10,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "AutoComplete",
          name: "Nationality",
          label: "Nationality",
          option: masters.Nationality,
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Nationality,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Nationality === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
              "No" && "Typography",
          name: "",
          label: "",
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type: "RadioGroup",
          visible: true,
          required: true,
          sx: redAsterisk,
          name: "isROPReported",
          radioLabel: { label: "Is Accident reported to ROP ?" },
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported === ""
              ? masters.Flags.error
              : null,
          spacing: 12,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported ===
              "Yes" && "Input",
          name: "ROPNo",
          label: "ROP Report No.",
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPNo,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPNo === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported ===
              "Yes" && "DateTime",
          name: "ROPReportDate",
          label: "ROP Report Date",
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPReportDate,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPReportDate === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported ===
              "Yes" && "Input",
          name: "ROPOfficerName",
          label: "ROP Officer Name",
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPOfficerName,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPOfficerName === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported ===
              "Yes" && "AutoComplete",
          name: "ROPLocation",
          label: "ROP Location",
          option: masters.Location,
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPLocation,
          disabled:
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" ||
            IntimateJson.transactionDataDTO.length !== 0,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPLocation === ""
              ? masters.Flags.error
              : null,
          spacing: 3,
          Accordion: "IntimationDetailsStep",
        },
        {
          type:
            IntimateJson.transactionDataDTO.length !== 0 &&
            IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "No" &&
            selectedClaimRow === "" &&
            "Typography",
          label:
            "Note: For Change In Intimation Details Delete the Existing Records from Review Claim Summary Grid and Recapture",
          sx: {
            textDecoration: "underline",
            fontSize: "14px",
            color: "#003300",
            fontWeight: "normal",
          },
          spacing: 12,
          Accordion: "IntimationDetailsStep",
        },
      ],
      ParticipantVehicleDetailsStep: [
        {
          type: "Typography",
          name: "VehicleDetails",
          label: "Vehicle Details",
          spacing: 2.3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 9.7,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "Input",
          name: "VehicleplateNo",
          label: "Vehicle Plate No.",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo?.InsurableItem[0].RiskItems[0]
              .VehiclePlateNo,
          required: true,
          sx: redAsterisk,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo?.InsurableItem[0].RiskItems[0]
              .VehiclePlateNo === ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "Input",
          name: "Make",
          label: "Make",
          required: true,
          sx: redAsterisk,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make ===
            ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "Input",
          name: "Model",
          label: "Model",
          required: true,
          sx: redAsterisk,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Model,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Model ===
            ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "Typography",
          name: "AreaRepairVcl",
          label: "Which is the Preferred Area to Repair the Vehicle ?",
          spacing: 6.7,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 5.3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "WLoc",
          label: "Location",
          option: masters.WorkshopLocation,
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].Location,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "Others" &&
            "Input",
          name: "otherWLoc",
          label: "other Location",
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].otherLocation,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.WorkshopDetails[0].otherLocation === ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location !== "Others" &&
            "AutoComplete",
          name: "WorkShop",
          label: "Work Shop",
          option: masters.WorkShop,
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].WorkShop,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.WorkshopDetails[0].WorkShop === ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "Others" &&
            "Input",
          name: "otherWorkShop",
          label: "Work Shop",
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].otherWorkShop,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.WorkshopDetails[0].otherWorkShop === ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "Others" &&
            "Input",
          name: "ContactNo",
          label: "Contact No.",
          maxLength: 8,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].ContactNo,
          disabled: masters.viewmodel === true,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "claimhandler",
          label: "Claims Handler",
          option: masters.ClaimHandler,
          required: true,
          sx: redAsterisk,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "RadioGroup",
          visible: true,
          required: true,
          name: "needtowingservices",
          radioLabel: { label: "Do you need towing services ?" },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .needtowingservices,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .needtowingservices === ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 12,
        },
        {
          type:
            IntimateJson.claimBasicDetails.PolicyDetails.Coverages.includes(
              "Vehicle replacement"
            ) && "RadioGroup",
          visible: true,
          required: true,
          name: "VehiclereplacementCoverage",
          radioLabel: { label: "Do you want to avail vehicle replacement coverage ?" },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .VehiclereplacementCoverage,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .VehiclereplacementCoverage === ""
              ? masters.Flags.ParticipantVehicle
              : null,
          spacing: 12,
        },
      ],
      ThirdPartyVehicleDetailsStep: [
        {
          type: "Typography",
          name: "VehicleDetails",
          label: "Vehicle Details",
          spacing: 2.3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 9.7,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "VehicleType",
          required: true,
          sx: redAsterisk,
          label: "Vehicle Type",
          option: masters.VehicleType,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .vehicleType,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .vehicleType === ""
              ? masters.Flags.TPVehicle
              : null,
          spacing: 3,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "Input",
          name: "VehicleplateNo",
          label: "Vehicle Plate No.",
          required: true,
          sx: redAsterisk,
          spacing: 3,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .VehiclePlateNo,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .VehiclePlateNo === ""
              ? masters.Flags.TPVehicle
              : null,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "Make",
          label: "Make",
          required: true,
          sx: redAsterisk,
          option: masters.Make,
          disabled: masters.viewmodel === true,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make,
          spacing: 3,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make ===
            ""
              ? masters.Flags.TPVehicle
              : null,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make ===
              "Others" && "Input",
          name: "otherMake",
          label: "Make",
          required: true,
          sx: redAsterisk,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherMake,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherMake === ""
              ? masters.Flags.TPVehicle
              : null,
          spacing: 3,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make !==
              "Others" && "AutoComplete",
          name: "Model",
          label: "Model",
          required: true,
          sx: redAsterisk,
          option: masters.Model,
          disabled: masters.viewmodel === true,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Model,
          spacing: 3,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Model ===
            ""
              ? masters.Flags.TPVehicle
              : null,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make ===
              "Others" && "Input",
          name: "otherModel",
          label: "Model",
          required: true,
          sx: redAsterisk,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherModel,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherModel === ""
              ? masters.Flags.TPVehicle
              : null,
          spacing: 3,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "DateTime",
          name: "mulkiyaExpiryDate",
          label: "Mulkiya Expiry Date",
          required: true,
          sx: redAsterisk,
          spacing: 3,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .mulkiyaExpiryDate,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .mulkiyaExpiryDate === ""
              ? masters.Flags.TPVehicle
              : null,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "Input",
          name: "MobileNo",
          label: "Mobile No.",
          required: true,
          sx: redAsterisk,
          spacing: 3,
          maxLength: 8,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].MobileNo,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .MobileNo === ""
              ? masters.Flags.TPVehicle
              : null,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 9,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "Typography",
          name: "AreaRepairVcl",
          label: "Which is the Preferred Area to Repair the Vehicle?",
          spacing: 6.7,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 5.3,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "WLoc",
          required: true,
          sx: redAsterisk,
          label: "Location",
          option: masters.WorkshopLocation,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].Location,
          disabled: masters.viewmodel === true,
          spacing: 3,
          error:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === ""
              ? masters.Flags.TPVehicle
              : null,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "Others" &&
            "Input",
          name: "otherWLoc",
          label: "Location",
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].otherLocation,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.WorkshopDetails[0].otherLocation === ""
              ? masters.Flags.TPVehicle
              : null,
          spacing: 3,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location !== "Others" &&
            "AutoComplete",
          name: "WorkShop",
          label: "Work Shop",
          required: true,
          sx: redAsterisk,
          option: masters.WorkShop,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].WorkShop,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.WorkshopDetails[0].WorkShop === ""
              ? masters.Flags.TPVehicle
              : null,
          spacing: 3,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "Others" &&
            "Input",
          name: "otherWorkShop",
          label: "Work Shop",
          required: true,
          sx: redAsterisk,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].otherWorkShop,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.WorkshopDetails[0].otherWorkShop === ""
              ? masters.Flags.TPVehicle
              : null,
          spacing: 3,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "Others" &&
            "Input",
          name: "ContactNo",
          label: "Contact No.",
          maxLength: 8,
          value: masters.TransaData.transactionDetails.WorkshopDetails[0].ContactNo,
          disabled: masters.viewmodel === true,
          spacing: 3,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "claimhandler",
          label: "Claims Handler",
          required: true,
          sx: redAsterisk,
          option: masters.ClaimHandler,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === ""
              ? masters.Flags.TPVehicle
              : null,
          spacing: 3,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
        {
          type: "RadioGroup",
          visible: true,
          required: true,
          name: "needtowingservices",
          radioLabel: { label: "Do you need towing services ?" },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .needtowingservices,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .needtowingservices === ""
              ? masters.Flags.TPVehicle
              : null,
          spacing: 12,
          Accordion: "ThirdPartyVehicleDetailsStep",
        },
      ],
      TPPropertyDamageDetailsStep: [
        {
          type: "Typography",
          name: "Property1dtls",
          label: "Property Details",
          spacing: 2.3,
          Accordion: "TPPropertyDamageDetailsStep",
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 9.7,
          Accordion: "TPPropertyDamageDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "PropertyType",
          label: "Property Type",
          option: [{ mValue: "Private" }, { mValue: "Government" }],
          required: true,
          sx: redAsterisk,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .PropertyType,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .PropertyType === ""
              ? masters.Flags.TPProperty
              : null,
          spacing: 3,
          Accordion: "TPPropertyDamageDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "PropertyDesc",
          label: "Property Description",
          required: true,
          sx: redAsterisk,
          option: masters.PropertyDescription,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .PropertyDescription,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .PropertyDescription === ""
              ? masters.Flags.TPProperty
              : null,
          disabled: masters.viewmodel === true,
          spacing: 3,
          Accordion: "TPPropertyDamageDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .PropertyDescription === "Others" && "Input",
          name: "otherPropertyDesc",
          label: "other Property Description",
          required: true,
          sx: redAsterisk,
          disabled: masters.viewmodel === true,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherpropertyDescription,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherpropertyDescription === ""
              ? masters.Flags.TPProperty
              : null,
          spacing: 3,
          Accordion: "TPPropertyDamageDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "Wilayat",
          label: "Wilayat",
          required: true,
          sx: redAsterisk,
          option: masters.Location,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Wilayat,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Wilayat === ""
              ? masters.Flags.TPProperty
              : null,
          spacing: 3,
          Accordion: "TPPropertyDamageDetailsStep",
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Wilayat === "Others" && "Input",
          name: "WilayatOther",
          label: "Wilayat",
          required: true,
          sx: redAsterisk,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .OtherWilayat,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .OtherWilayat === ""
              ? masters.Flags.TPProperty
              : null,
          spacing: 3,
          Accordion: "TPPropertyDamageDetailsStep",
        },
        {
          type: "Input",
          name: "Name",
          label: "Property Owner Name",
          disabled: masters.viewmodel === true,
          spacing: 3,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Name,
          Accordion: "TPPropertyDamageDetailsStep",
        },
        {
          type: "Input",
          name: "MobileNo",
          label: "Property Owner Mobile No.",
          spacing: 3,
          disabled: masters.viewmodel === true,
          maxLength: 8,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].MobileNo,
          Accordion: "TPPropertyDamageDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "claimhandler",
          label: "Claims Handler",
          required: true,
          sx: redAsterisk,
          option: masters.ClaimHandler,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === ""
              ? masters.Flags.TPProperty
              : null,
          spacing: 3,
          Accordion: "TPPropertyDamageDetailsStep",
        },
      ],
      InjuryDetailsStep: [
        {
          type: "Typography",
          name: "Injured1Details",
          label: "Injured Details",
          spacing: 2.3,
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 9.7,
        },
        {
          type: "AutoComplete",
          name: "Relationwithparticipant",
          label: "Relation with Participant",
          required: true,
          sx: redAsterisk,
          option: masters.RelationshipToProposer,
          disabled: masters.viewmodel === true,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Relationwithparticipant,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Relationwithparticipant === ""
              ? masters.Flags.Injury
              : null,
          spacing: 3,
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Relationwithparticipant === "Others" && "Input",
          name: "otherRelationwithparticipant",
          label: "other Relation with participant",
          required: true,
          sx: redAsterisk,
          disabled: masters.viewmodel === true,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherRelationwithparticipant,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherRelationwithparticipant === ""
              ? masters.Flags.Injury
              : null,
          spacing: 3,
          Accordion: "InjuryDetailsStep",
        },
        {
          type: "Input",
          name: "Name",
          label: "Injured Person Name",
          disabled: masters.viewmodel === true,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Name,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          name: "gender",
          label: "Injured Person Gender",
          option: masters.Gender,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Gender,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Gender === ""
              ? masters.Flags.Injury
              : null,
          required: true,
          sx: redAsterisk,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          name: "InjuryType",
          label: "Injury Type",
          option: [{ mValue: "Minor" }, { mValue: "Medium" }, { mValue: "Major" }],
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .InjuryType,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .InjuryType === ""
              ? masters.Flags.Injury
              : null,
          required: true,
          sx: redAsterisk,
          spacing: 3,
        },
        {
          type: "Input",
          name: "MobileNo",
          label: "Injured Mobile No.",
          maxLength: 8,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].MobileNo,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "Input",
          name: "ResidentID",
          label: " Injured Person Resident ID",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .ResidentID,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "Input",
          name: "EmailId",
          label: "Injured Person Email ID",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].EmailId,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "Input",
          name: "HospitalName",
          label: "Hospital Name",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .HospitalName,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "Input",
          name: "HospitalLocation",
          label: "Hospital Location",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .HospitalLocation,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          name: "claimhandler",
          required: true,
          sx: redAsterisk,
          label: "Claims Handler",
          option: masters.ClaimHandler,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === ""
              ? masters.Flags.Injury
              : null,
          spacing: 3,
        },
        {
          type: "RadioGroup",
          visible: true,
          required: true,
          sx: redAsterisk,
          name: "isAmbulanceServiceAvailed",
          radioLabel: { label: "Ambulance Service Availed ?" },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .isAmbulanceServiceAvailed,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .isAmbulanceServiceAvailed === ""
              ? masters.Flags.Injury
              : null,
          spacing: 6,
        },
      ],
      DeceasedDetailsStep: [
        {
          type: "Typography",
          name: "Deceased1Details",
          label: "Deceased Details",
          spacing: 2.3,
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 9.7,
        },
        {
          type: "AutoComplete",
          name: "Relationwithparticipant",
          label: "Relation with Participant",
          required: true,
          sx: redAsterisk,
          option: masters.RelationshipToProposer,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Relationwithparticipant,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Relationwithparticipant === ""
              ? masters.Flags.Death
              : null,
          spacing: 3,
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Relationwithparticipant === "Others" && "Input",
          name: "otherRelationwithparticipant",
          label: "other Relation with participant",
          required: true,
          sx: redAsterisk,
          spacing: 3,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherRelationwithparticipant,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .otherRelationwithparticipant === ""
              ? masters.Flags.Death
              : null,
          Accordion: "DeceasedDetailsStep",
        },
        {
          type: "Input",
          name: "Name",
          label: "Deceased Person Name",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Name,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          name: "gender",
          label: "Deceased Person Gender",
          option: masters.Gender,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Gender,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Gender === ""
              ? masters.Flags.Death
              : null,
          required: true,
          sx: redAsterisk,
          spacing: 3,
        },
        {
          type: "Input",
          name: "MobileNo",
          label: "Legal Heir Mobile No.",
          maxLength: 8,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].MobileNo,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "Input",
          name: "ResidentID",
          label: "Deceased Person Resident ID",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .ResidentID,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "Input",
          name: "EmailId",
          label: "Legal Heir Email ID",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].EmailId,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "Input",
          name: "HospitalName",
          label: "Hospital Name",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .HospitalName,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "Input",
          name: "HospitalLocation",
          label: "Hospital Location",
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .HospitalLocation,
          disabled: masters.viewmodel === true,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          name: "claimhandler",
          label: "Claims Handler",
          required: true,
          sx: redAsterisk,
          option: masters.ClaimHandler,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === ""
              ? masters.Flags.Death
              : null,
          spacing: 3,
        },
        {
          type: "RadioGroup",
          visible: true,
          required: true,
          name: "isAmbulanceServiceAvailed",
          radioLabel: { label: "Ambulance Service Availed ?" },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .isAmbulanceServiceAvailed,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .isAmbulanceServiceAvailed === ""
              ? masters.Flags.Death
              : null,
          spacing: 6,
        },
      ],
      OtherDetailsStep: [
        {
          type: "Typography",
          name: "Animal1Details",
          label: "Animal Details",
          spacing: 2.3,
        },
        {
          type: "Typography",
          name: "",
          label: "",
          spacing: 9.7,
        },
        {
          type: "AutoComplete",
          name: "TypeofAnimal",
          required: true,
          sx: redAsterisk,
          label: "Type of Animal",
          option: masters.TypeofAnimal,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .TypeofAnimal,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .TypeofAnimal === ""
              ? masters.Flags.Animal
              : null,
          spacing: 3,
        },
        {
          type:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .TypeofAnimal === "Others" && "Input",
          name: "OtherTypeofAnimal",
          label: "Other Type of Animal",
          required: true,
          sx: redAsterisk,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .OtherTypeofAnimal,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .OtherTypeofAnimal === ""
              ? masters.Flags.Animal
              : null,
          spacing: 3,
          Accordion: "ParticipantVehicleDetailsStep",
        },
        {
          type: "AutoComplete",
          name: "Typeofloss",
          label: "Type of Loss",
          required: true,
          sx: redAsterisk,
          option: [{ mValue: "Death" }, { mValue: "Injury" }],
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Typeofloss,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Typeofloss === ""
              ? masters.Flags.Animal
              : null,
          spacing: 3,
        },
        {
          type: "Input",
          name: "Count",
          label: "Count",
          required: true,
          sx: redAsterisk,
          maxLength: 2,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Count,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Count ===
            ""
              ? masters.Flags.Animal
              : null,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          name: "claimhandler",
          label: "Claims Handler",
          required: true,
          sx: redAsterisk,
          option: masters.ClaimHandler,
          value:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler,
          disabled: masters.viewmodel === true,
          error:
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === ""
              ? masters.Flags.Animal
              : null,
          spacing: 3,
        },
      ],
    },
  ];

  const handleSelectionRegister = (param) => {
    // handle for select a radiobutton in 2st datagrid
    setSelectedClaimRow(param.row.ClaimNumber);
  };

  const handleClear = (name) => {
    // newdata.transactionDetails.ClaimsInfo.IntimationDetails.AccidentTime =
    //   masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentTime;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.otherAccidentLocation =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.otherAccidentLocation;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.NotifierName =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierName;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.NotifierMobileNo =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierMobileNo;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.isAnyWitness =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isAnyWitness;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.WitnessName =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessName;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.WitnessMobileNo =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessMobileNo;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.AccidentRemarks =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentRemarks;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.DriverName =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverName;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.Gender =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Gender;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.Nationality =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Nationality;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.ROPNo =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPNo;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.ROPReportDate =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPReportDate;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.ROPOfficerName =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPOfficerName;
    newdata.transactionDetails.ClaimsInfo.IntimationDetails.ROPLocation =
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPLocation;
    switch (name) {
      case "Clear":
        newdata.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isInsured =
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isInsured;
        newdata.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isTPVehicleDamaged =
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isTPVehicleDamaged;
        newdata.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isTPPropertyDamaged =
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isTPPropertyDamaged;
        newdata.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isInjurySelfOrTP =
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isInjurySelfOrTP;
        newdata.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].IsDeseasedAccident =
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].IsDeseasedAccident;
        newdata.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].IsAnimalDeathOrInjury =
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].IsAnimalDeathOrInjury;
        break;
      default:
    }
    masters.TransaData = { ...newdata };
    setMasters({ ...masters });
    masters.Flags.ParticipantVehicle = false;
  };
  const handleSelectionModelChange = async (param) => {
    // handle for select a radiobutton in 1st datagrid
    setSelectedRow(param.row.PolicyNo);
    setLoading(true);
    policyresponse.PolicyDetails.forEach((x) => {
      if (x.PolicyNo === param.row.PolicyNo) {
        IntimateJson.claimBasicDetails.PolicyDetails.ParticipantName = x.ProposerDetails?.Name;
        IntimateJson.claimBasicDetails.PolicyDetails.productType = SearchObj.productType;
        IntimateJson.claimBasicDetails.PolicyDetails.PolicyNo = x.PolicyNo;
        IntimateJson.policyNo = x.PolicyNo;
        IntimateJson.claimBasicDetails.PolicyDetails.PolicyStartDate = x.PolicyStartDate;
        IntimateJson.claimBasicDetails.PolicyDetails.PolicyEndDate = x.PolicyEndDate;
        IntimateJson.claimBasicDetails.PolicyDetails.VehiclePlateNo =
          x.InsurableItem[0]?.RiskItems[0]?.RegistrationNumber;
        IntimateJson.claimBasicDetails.PolicyDetails.VehicleUsageType =
          x.ProposerDetails?.VehicleUsage;
        IntimateJson.claimBasicDetails.PolicyDetails.ChassisNumber =
          x.InsurableItem[0]?.RiskItems[0]?.ChassisNumber;
        IntimateJson.claimBasicDetails.PolicyDetails.EngineNumber =
          x.InsurableItem[0]?.RiskItems[0]?.EngineNumber;
        IntimateJson.claimBasicDetails.PolicyDetails.MobileNumber = x.ProposerDetails?.ContactNo;
        IntimateJson.claimBasicDetails.PolicyDetails.EmailId = x.ProposerDetails?.EmailId;
        // to save coverages in comma separated values
        IntimateJson.claimBasicDetails.PolicyDetails.Coverages = x.InsurableItem[0].Covers.map(
          (y) => (y.CoverName !== "" ? y.CoverName : null)
        )
          .filter((cover) => cover !== null)
          .join(" , ");
      }
    });
    setIntimationJson({ ...IntimateJson });

    const request = {
      Reportname: "TakafulMasterClaimdata",
      paramList: [
        {
          ParameterName: "PolicyNo",
          ParameterValue: param.row.PolicyNo,
        },
      ],
    };
    const claimAPI = await GetPayLoadByQueryDynamic(request);
    console.log("ClaimAPI", claimAPI);
    if (claimAPI.data.finalResult !== null) {
      const sort = claimAPI.data.finalResult
        .sort((a, b) => a.ClaimNumber.localeCompare(b.ClaimNumber))
        .reverse();
      setClaimRows(sort);
    }
    setClaim(true);
    setLoading(false);
  };

  let error = false;
  const handletwoAccordionerror = () => {
    if (
      IntimateJson.claimBasicDetails.PolicyDetails.ParticipantName === "" ||
      IntimateJson.claimBasicDetails.PolicyDetails.productType === "" ||
      IntimateJson.claimBasicDetails.PolicyDetails.PolicyNo === "" ||
      IntimateJson.claimBasicDetails.PolicyDetails.PolicyStartDate === "" ||
      IntimateJson.claimBasicDetails.PolicyDetails.PolicyEndDate === "" ||
      IntimateJson.claimBasicDetails.PolicyDetails.VehiclePlateNo === "" ||
      // IntimateJson.claimBasicDetails.PolicyDetails.VehicleUsageType === "" ||
      IntimateJson.claimBasicDetails.PolicyDetails.ChassisNumber === "" ||
      IntimateJson.claimBasicDetails.PolicyDetails.isPolicyDetailsVerified === false ||
      // IntimateJson.claimBasicDetails.PolicyDetails.ClaimIntimatedBy === "" ||
      // masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentTime === "" ||
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate === "" ||
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation === "" ||
      (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation ===
        "Others" &&
        masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.otherAccidentLocation ===
          "") ||
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode === "" ||
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident === "" ||
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentRemarks === "" ||
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked === "" ||
      (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked ===
        "No" &&
        (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverName === "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge === "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo ===
            "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory === "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Gender === "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo ===
            "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Nationality === "")) ||
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy === "" ||
      (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy === "Others" &&
        (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierName === "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierMobileNo ===
            "")) ||
      (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isAnyWitness === "Yes" &&
        (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessName === "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessMobileNo ===
            "")) ||
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported === "" ||
      (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported === "Yes" &&
        (masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPNo === "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPReportDate === "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPOfficerName ===
            "" ||
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPLocation === ""))
    ) {
      error = true;
      Swal.fire({
        title: "Error",
        icon: "error",
        allowOutsideClick: false,
        showCloseButton: true,
        text: "Please fill the required field",
      });
      masters.Flags.error = true;
      setMasters({ ...masters });
    } else {
      error = false;
    }
  };
  let Griderror = false;
  const handleGriderror = (name) => {
    switch (name) {
      case "OD":
        if (
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .isInsured === "Yes" &&
          (masters.TransaData.transactionDetails.ClaimsInfo?.InsurableItem[0].RiskItems[0]
            .VehiclePlateNo === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make ===
              "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Model ===
              "" ||
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "" ||
            (masters.TransaData.transactionDetails.WorkshopDetails[0].Location !== "Others" &&
              masters.TransaData.transactionDetails.WorkshopDetails[0].WorkShop === "") ||
            (masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "Others" &&
              (masters.TransaData.transactionDetails.WorkshopDetails[0].otherLocation === "" ||
                masters.TransaData.transactionDetails.WorkshopDetails[0].otherWorkShop === "")) ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .needtowingservices === "" ||
            (IntimateJson.claimBasicDetails.PolicyDetails.Coverages.includes(
              "Vehicle replacement"
            ) &&
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .VehiclereplacementCoverage === ""))
        ) {
          Swal.fire({
            title: "Error",
            icon: "error",
            allowOutsideClick: false,
            showCloseButton: true,
            text: "Please fill the required field",
          });
          masters.Flags.ParticipantVehicle = true;
          Griderror = true;
        } else {
          masters.Flags.ParticipantVehicle = false;
          Griderror = false;
        }
        break;
      case "TP":
        if (
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .isTPVehicleDamaged === "Yes" &&
          (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .vehicleType === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .VehiclePlateNo === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .mulkiyaExpiryDate === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .MobileNo === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make ===
              "" ||
            (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make !==
              "Others" &&
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .Model === "") ||
            (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make ===
              "Others" &&
              (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .otherMake === "" ||
                masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                  .otherModel === "")) ||
            masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "" ||
            (masters.TransaData.transactionDetails.WorkshopDetails[0].Location !== "Others" &&
              masters.TransaData.transactionDetails.WorkshopDetails[0].WorkShop === "") ||
            (masters.TransaData.transactionDetails.WorkshopDetails[0].Location === "Others" &&
              (masters.TransaData.transactionDetails.WorkshopDetails[0].otherLocation === "" ||
                masters.TransaData.transactionDetails.WorkshopDetails[0].otherWorkShop === "")) ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .needtowingservices === "")
        ) {
          Swal.fire({
            title: "Error",
            icon: "error",
            allowOutsideClick: false,
            showCloseButton: true,
            text: "Please fill the required field",
          });
          masters.Flags.TPVehicle = true;
          Griderror = true;
        } else {
          masters.Flags.TPVehicle = false;
          Griderror = false;
        }
        break;
      case "PD":
        if (
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .isTPPropertyDamaged === "Yes" &&
          (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .PropertyType === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .PropertyDescription === "" ||
            (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .PropertyDescription === "Others" &&
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .otherpropertyDescription === "") ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Wilayat === "" ||
            (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Wilayat === "Others" &&
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .OtherWilayat === "") ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === "")
        ) {
          Swal.fire({
            title: "Error",
            icon: "error",
            allowOutsideClick: false,
            showCloseButton: true,
            text: "Please fill the required field",
          });
          masters.Flags.TPProperty = true;
          Griderror = true;
        } else {
          masters.Flags.TPProperty = false;
          Griderror = false;
        }
        break;
      case "BI":
        if (
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .isInjurySelfOrTP === "Yes" &&
          (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .Relationwithparticipant === "" ||
            (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Relationwithparticipant === "Others" &&
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .otherRelationwithparticipant === "") ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Gender === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .InjuryType === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .isAmbulanceServiceAvailed === "")
        ) {
          Swal.fire({
            title: "Error",
            icon: "error",
            allowOutsideClick: false,
            showCloseButton: true,
            text: "Please fill the required field",
          });
          masters.Flags.Injury = true;
          Griderror = true;
        } else {
          masters.Flags.Injury = false;
          Griderror = false;
        }
        break;
      case "DT":
        if (
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .IsDeseasedAccident === "Yes" &&
          (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .Relationwithparticipant === "" ||
            (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Relationwithparticipant === "Others" &&
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .otherRelationwithparticipant === "") ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Gender === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .isAmbulanceServiceAvailed === "")
        ) {
          Swal.fire({
            title: "Error",
            icon: "error",
            allowOutsideClick: false,
            showCloseButton: true,
            text: "Please fill the required field",
          });
          masters.Flags.Death = true;
          Griderror = true;
        } else {
          masters.Flags.Death = false;
          Griderror = false;
        }
        break;
      case "AN":
        if (
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .IsAnimalDeathOrInjury === "Yes" &&
          (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
            .TypeofAnimal === "" ||
            (masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .TypeofAnimal === "Others" &&
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .OtherTypeofAnimal === "") ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Count ===
              "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Typeofloss === "" ||
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .Claimshandler === "")
        ) {
          Swal.fire({
            title: "Error",
            icon: "error",
            allowOutsideClick: false,
            showCloseButton: true,
            text: "Please fill the required field",
          });
          masters.Flags.Animal = true;
          Griderror = true;
        } else {
          masters.Flags.Animal = false;
          Griderror = false;
        }
        break;
      default:
    }
    setMasters({ ...masters });
  };

  const handlemodelClose = (a) => {
    masters.viewmodel = false;
    handleGriderror(a);
    if (Griderror === false) {
      masters.open = false;
      const riskIndex = IntimateJson.transactionDataDTO.findIndex(
        (item) => item.ReferenceNo === masters.i
      );
      if (riskIndex !== -1) {
        IntimateJson.transactionDataDTO[riskIndex] = {
          ...masters.TransaData,
        };

        handleClear();
        setIntimationJson({ ...IntimateJson });
      }
    }
    setMasters({ ...masters });
  };

  const handleCancel = () => {
    masters.viewmodel = false;
    masters.open = false;
    masters.TransaData = CancelJson;
    setMasters({ ...masters });
    handleClear();
  };

  const modelClose = async (name) => {
    // let updatedTransactionDataDTO;
    switch (name) {
      case "Save":
        masters.uploadopen = false;
        // to add the documents in all transactionDataDto
        Saveclaimjson.transactionDataDTO.forEach((x) => {
          const y = { ...x };
          y.transactionDetails.Documents = masters.TransaData.transactionDetails.Documents;
        });
        setSaveclaimjson({ ...Saveclaimjson });
        {
          const saveres = await SaveClaimDetails(Saveclaimjson);
          console.log("saveres", saveres);
        }
        break;
      case "Cancel":
        masters.uploadopen = false;
        break;
      default:
    }
    setMasters({ ...masters });
  };

  const modelNoteClose = async (name) => {
    masters.NoteArr = [];
    const today = new Date();
    const dateFormatted = today.toISOString().split("T")[0];
    const timeFormatted = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const r = masters.NotesRows.length;
    const updatedNotesRows = [...masters.NotesRows];
    // let nt = 0;

    switch (name) {
      case "Create":
        masters.CreateNote = true;
        setMasters({ ...masters });
        break;
      case "Save":
        masters.checked.forEach((x, i) => {
          if (masters.checked[i].Note !== "") {
            masters.NoteArr.push(x);
            setMasters({ ...masters });
          }
        });
        for (let index = r; index < masters.NoteArr.length + r; index += 1) {
          const NoteData = {
            Sno: index,
            Notes: Note,
            transactionNumber: masters.NoteArr[index - r].Note,
            CreatedBy: localStorage.getItem("userName"),
            DateTime: `${dateFormatted} ${timeFormatted}`,
          };
          updatedNotesRows[index] = NoteData;
          masters.NotesRows = updatedNotesRows;
        }

        setMasters({ ...masters });

        IntimateJson.transactionDataDTO.forEach((x, i) => {
          IntimateJson.transactionDataDTO[i].transactionDetails.Remarks = [];
          setIntimationJson({ ...IntimateJson });
          masters.NotesRows.forEach((y) => {
            if (x.transactionNumber === y.transactionNumber) {
              IntimateJson.transactionDataDTO[i].transactionDetails.Remarks.push(y);
            }
          });
        });
        // Saveclaimjson.claimBasicDetails.PolicyDetails.isIntimated = "No";
        setIntimationJson({ ...IntimateJson });
        {
          const saveres = await SaveClaimDetails(IntimateJson);
          console.log("saveres", saveres);
        }
        masters.CreateNote = false;
        masters.checked = [];
        setNote("");
        break;
      case "Cancel":
        masters.Noteopen = false;
        masters.CreateNote = false;
        masters.checked = [];
        break;
      default:
    }
    setIntimationJson({ ...IntimateJson });
    setMasters({ ...masters });
  };
  const modelViewNoteClose = () => {
    masters.Noteviewopen = false;
    setMasters({ ...masters });
  };
  const accordians = [
    { label: "Policy Details ", visible: true, background: "#F5FCFF" },
    { label: "Intimation Details", visible: true, background: "#F5FCFF" },
    { label: "Participant Vehicle Details", visible: true, background: "#F5FCFF" },
    { label: "Third Party Vehicle Details", visible: true, background: "#F5FCFF" },
    { label: "TP Property Damage Details", visible: true, background: "#F5FCFF" },
    { label: "Injury Details", visible: true, background: "#F5FCFF" },
    { label: "Deceased Details", visible: true, background: "#F5FCFF" },
    { label: "Other Details", visible: true, background: "#F5FCFF" },
  ];

  const handleEditClick = (rows) => {
    // const updatedRiskItems = { ...IntimateJson.transactionDataDTO[rows.row.ReferenceNo - 1] };
    const updatedRiskItems = JSON.parse(
      JSON.stringify(IntimateJson.transactionDataDTO[rows.row.ReferenceNo - 1])
    );
    masters.TransaData = updatedRiskItems;
    setCancelJson({ ...updatedRiskItems });
    masters.i = rows.row.ReferenceNo;
    masters.Accordion = rows.row.ClaimCategory;
    masters.open = true;
    setMasters({ ...masters });
  };

  const handleViewClick = (rows) => {
    masters.viewmodel = true;
    masters.TransaData = JSON.parse(
      JSON.stringify(IntimateJson.transactionDataDTO[rows.row.ReferenceNo - 1])
    );
    setCancelJson({ ...masters.TransaData });
    masters.i = rows.row.ReferenceNo - 1;
    masters.Accordion = rows.row.ClaimCategory;
    masters.open = true;
    setMasters({ ...masters });
  };

  const handleupload = () => {
    masters.uploadopen = true;
    setMasters({ ...masters });
  };

  const UploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const res = await DocumentUpload(formData);
    console.log("uploadapi", res);
    masters.Doc.DocName = res.dMSDTOs[0].fileName;
    masters.Doc.FileName = file.name;
    masters.Doc.DocId = res.dMSDTOs[0].docId;
    masters.Doc.DocType = res.dMSDTOs[0].contentType;
    masters.Doc.UploadedDate = res.dMSDTOs[0].uploadDate;
    setMasters({ ...masters });
  };

  const [Count3, setCounter3] = useState(0);
  const handleProfileChange = async (e) => {
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
        text: "Only PDF, DOC, DOCX, PNG, JPG and JPEG files are allowed.",
      });
    } else {
      await UploadDocument(file);
      masters.TransaData.transactionDetails.Documents[Count3] = { ...masters.Doc };
      setCounter3(Count3 + 1);
      setMasters({ ...masters });
    }
  };

  const handleDeleteFile = async (DocName) => {
    await DeleteDocument(DocName);
    const filterData = masters.TransaData.transactionDetails.Documents.filter(
      (x) => x.DocName !== DocName
    );
    setCounter3(Count3 - 1);
    masters.TransaData.transactionDetails.Documents = filterData;
    console.log("123", filterData);
    setMasters({ ...masters });
  };

  const tableColumns = [
    {
      field: "radiobutton",
      headerName: "Select",
      width: 100,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        console.log("member details", params);
        return (
          <Radio
            onClick={() => handleSelectionModelChange(params)}
            checked={selectedRow === params.row.PolicyNo}
          />
        );
      },
    },
    {
      field: "PolicyNo",
      headerName: "Policy No.",
      width: 280,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "InsuredName",
      headerName: "Insured Name",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Make",
      headerName: "Make",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Model",
      headerName: "Model",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ChassisNo",
      headerName: "Chassis No.",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
  ];
  const MemberColumn = [
    {
      field: "radiobutton",
      headerName: "Select",
      width: 100,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        console.log("member details", params);
        return (
          <Radio
            onClick={() => handleSelectionRegister(params)}
            checked={selectedClaimRow === params.row.ClaimNumber}
          />
        );
      },
    },
    {
      field: "ClaimNumber",
      headerName: "Master Claim Number",
      width: 280,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "AccidentDate",
      headerName: "Accident Date and Time",
      width: 280,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "AccidentLocation",
      headerName: "Location",
      width: 400,
      headerAlign: "center",
      align: "center",
    },
  ];
  const ReviewClaimColumn = [
    {
      field: "ReferenceNo",
      headerName: "Serial No.",
      width: 230,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const rowId = params.row.ReferenceNo;
        return (
          <MDTypography
            type="button"
            style={{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => handleViewClick(params)}
          >
            {rowId}
          </MDTypography>
        );
      },
    },
    {
      field: "ClaimCategory",
      headerName: "Claim Type",
      width: 230,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "IntimatedDate",
      headerName: "Intimated Date",
      width: 230,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const data1 = [];
        const rowId = params.row.ReferenceNo;
        const handleDeleteClick = () => {
          Swal.fire({
            title: "Are you sure you want to delete the record ?",
            text: "You will not be able to recover this data!",
            icon: "warning",
            showCancelButton: true,
            showCloseButton: true,
            allowOutsideClick: false,
            confirmButtonText: "Yes",
            cancelButtonText: "cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              const result1 = IntimateJson.transactionDataDTO.filter(
                (x) => Number(x.ReferenceNo) !== rowId
              );
              const res1 = ReviewClaimRows.filter((x) => x.ReferenceNo !== rowId);
              if (result1.length !== 0) {
                IntimateJson.transactionDataDTO = [...result1];
                setIntimationJson({ ...IntimateJson });
                IntimateJson.transactionDataDTO.forEach((x, i) => {
                  if (x.ReferenceNo > rowId) {
                    const ref = x.ReferenceNo === 1 ? 1 : x.ReferenceNo - 1;
                    IntimateJson.transactionDataDTO[i].ReferenceNo = ref;
                  } else {
                    const ref = x.ReferenceNo;
                    IntimateJson.transactionDataDTO[i].ReferenceNo = ref;
                  }
                  setIntimationJson({ ...IntimateJson });
                });
                res1.forEach((x) => {
                  if (x.ReferenceNo > rowId) {
                    const Ref = {
                      ReferenceNo: x.ReferenceNo === 1 ? 1 : x.ReferenceNo - 1,
                      ClaimCategory: x.ClaimCategory,
                      IntimatedDate: x.IntimatedDate,
                    };
                    data1.push(Ref);
                  } else {
                    const Ref = {
                      ReferenceNo: x.ReferenceNo,
                      ClaimCategory: x.ClaimCategory,
                      IntimatedDate: x.IntimatedDate,
                    };
                    data1.push(Ref);
                  }
                });
                setReviewRows(data1);
              } else {
                IntimateJson.transactionDataDTO = [];
                setReviewRows([]);
              }
              if (result1.length === res1.length) {
                console.log("Deleted:", rowId);
                setRespMessage("Your data has been deleted successfully!");
                setSeverity("success");
                handleClick({
                  vertical: "bottom",
                  horizontal: "right",
                });
              }
            }
          });
        };
        return (
          // <div>
          //   {IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "No" ? (
          <>
            <MDButton
              variant="outlined"
              display="flex"
              color="secondary"
              sx={{
                justifyContent: "flex-end",
                whiteSpace: "nowrap",
                mr: 2,
                "&:disabled": {
                  color: "#c4c4c0",
                  justifyContent: "flex-end",
                  whiteSpace: "nowrap",
                },
              }}
              disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
              onClick={() => handleEditClick(params)}
            >
              Edit
            </MDButton>
            <MDButton
              variant="outlined"
              display="flex"
              color="secondary"
              sx={{
                justifyContent: "flex-end",
                whiteSpace: "nowrap",
                "&:disabled": {
                  color: "#c4c4c0",
                  justifyContent: "flex-end",
                  whiteSpace: "nowrap",
                },
              }}
              disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
              onClick={handleDeleteClick}
            >
              Delete
            </MDButton>
          </>
          //   ) : (
          //     <MDButton
          //       variant="outlined"
          //       display="flex"
          //       color="secondary"
          //       sx={{
          //         justifyContent: "flex-end",
          //         whiteSpace: "nowrap",
          //         mr: 2,
          //       }}
          //       onClick={() => handleViewClick(params)}
          //     >
          //       View
          //     </MDButton>
          //   )}
          // </div>
        );
      },
    },
  ];
  const ExistClaimColumn = [
    {
      field: "ReferenceNo",
      headerName: "Serial No.",
      width: 230,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const rowId = params.row.ReferenceNo;
        return (
          <MDTypography
            type="button"
            style={{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => handleViewClick(params)}
          >
            {rowId}
          </MDTypography>
        );
      },
    },
    {
      field: "ClaimCategory",
      headerName: "Claim Type",
      width: 230,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "IntimatedDate",
      headerName: "Intimated Date",
      width: 230,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => (params?.value ? moment(params.value).format("DD/MM/YYYY") : ""),
    },
    {
      field: "ClaimNo",
      headerName: "Claim Number",
      width: 230,
      headerAlign: "center",
      align: "center",
    },
  ];
  const NoteColumn = [
    {
      field: "CreatedBy",
      headerName: "Created By",
      width: 280,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Notes",
      headerName: "Notes",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "transactionNumber",
      headerName: "Claim No.",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "DateTime",
      headerName: "Date and Time",
      width: 200,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) =>
        params?.value ? moment(params.value).format("DD/MM/YYYY hh:mm A") : "",
    },
    {
      field: "View",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const rowId = params.row.Sno;
        console.log(":", rowId);
        const handleviewNotes = (row) => {
          const view = masters.NotesRows.filter((x) => x.Sno === row);
          IntimateJson.claimBasicDetails.Remarks = view[0].Notes;
          setIntimationJson({ ...IntimateJson });
          masters.Noteviewopen = true;
          setMasters({ ...masters });
        };
        return (
          <MDTypography
            type="button"
            style={{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => handleviewNotes(rowId)}
          >
            View
          </MDTypography>
        );
      },
    },
  ];
  const onPolicySearch = async () => {
    if (SearchObj.PolicyNo === "" && SearchObj.chassisNo === "" && SearchObj.civilID === "") {
      Swal.fire({
        showCloseButton: true,
        allowOutsideClick: false,
        icon: "warning",
        text: "Either PolicyNo or ChassisNo or CivilID is mandatory",
      });
    } else if (SearchObj.PolicyNo !== "" && SearchObj.PolicyNo.length < 21) {
      masters.Flags.Numerror = true;
      setMasters({ ...masters });
      // } else if (SearchObj.chassisNo !== "" && SearchObj.chassisNo.length < 21) {
      //   masters.Flags.ChassisNoerror = true;
      //   setMasters({ ...masters });
    } else {
      masters.Flags.Numerror = false;
      // masters.Flags.ChassisNoerror = false;
      setLoading(true);
      // const response = await Policies("Policy", "Policy", SearchObj.PolicyNo);
      const Payload = {
        product_id: "M000000000004",
        "proposal.status": 2,
        policy_no: SearchObj.PolicyNo,
        "proposal.data.civil_id_output": SearchObj.civilID,
        "proposal.data.vehicle_chassis_output": SearchObj.chassisNo,
        fmt: "csv",
        schema: "1",
        fields:
          "quote.data.product_name product_name, quote.data.prod_code_op product_code,policy_no,policy_start_date_dt,policy_end_date_dt,proposal.data.prev_policy_exp_date prev_policy_exp_date,proposal.data.customer.civil_resident_id civil_id,proposal.data.customer_name customer_name,proposal.data.mobile_no mobile_no,proposal.data.email email,proposal.data.wilayat wilayat,proposal.data.plate_char plate_char,proposal.data.plate_number plate_number,proposal.data.vehicle_make vehicle_make,proposal.data.vehicle_model vehicle_model,proposal.data.body_type body_type,proposal.data.vehicle_engine_output engine_number,proposal.data.vehicle_chassis_output chassis_number,proposal.data.vehicle_value_output vehicle_value,proposal.data.break_in break_in,proposal.data.cover1_name cover1_name,proposal.data.cover2_name cover2_name,proposal.data.cover3_name cover3_name,proposal.data.cover4_name cover4_name,proposal.data.cover5_name cover5_name,proposal.data.cover6_name cover6_name,proposal.data.cover7_name cover7_name,proposal.data.cover8_name cover8_name,proposal.data.cover9_name cover9_name,proposal.data.cover10_name cover10_name,proposal.data.cover11_name cover11_name,proposal.data.cover12_name cover12_name,proposal.data.cover13_name cover13_name,proposal.data.cover14_name cover14_name,proposal.data.cover15_name cover15_name,proposal.data.cover16_name cover16_name,proposal.data.cover17_name cover17_name",
        period: "2023-01-01,2024-02-19",
        order: "u_ts desc",
        u_ts: "[]2023-11-21 00:00:00,2024-02-19 23:59:59",
      };
      const response = await GenericApi("Motor_PrivateCar", "TAOIPolicyFetch", Payload);
      if (response.finalResult?.PolicyDetails) {
        console.log("policyresponse", response.finalResult);
        setPolicyresponse(response.finalResult);
        setStepForword(stepForward + 1);
      } else {
        Swal.fire({
          showCloseButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#A7CF3C",
          confirmButtonText: "Register Claim Manually",
          html: `<img src="${NoPolicy}" alt="success image" style="width: 135px; height: 162px; Top: 60px; Left: 208px; margin-bottom: 20px">
          <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Roboto', fontWeight: '600', lineHeight: 24, wordWrap: 'break-word'}}><Strong>Policy Details Not Found</Strong></div>`,
        }).then((result) => {
          if (result.isConfirmed) {
            setStepForword(stepForward + 2);
            setPolicyresponse([]);
          }
        });
      }
    }
    setLoading(false);
  };

  let Rows =
    policyresponse?.PolicyDetails?.map((item) => ({
      PolicyNo: item?.PolicyNo,
      InsuredName: item?.ProposerDetails?.Name,
      Make: item?.InsurableItem[0]?.RiskItems[0]?.MakeValue,
      Model: item?.InsurableItem[0]?.RiskItems[0]?.ModelValue,
      ChassisNo: item?.InsurableItem[0]?.RiskItems[0]?.ChassisNumber,
    })) || [];

  // defaulty checked the radio button when there is only 1 policy no
  useEffect(async () => {
    if (Rows.length === 1) {
      setSelectedRow(policyresponse.PolicyDetails[0].PolicyNo);
      setLoading(true);
      policyresponse.PolicyDetails.forEach((x) => {
        if (x.PolicyNo === policyresponse.PolicyDetails[0].PolicyNo) {
          IntimateJson.claimBasicDetails.PolicyDetails.ParticipantName = x.ProposerDetails?.Name;
          IntimateJson.claimBasicDetails.PolicyDetails.productType = SearchObj.productType;
          IntimateJson.claimBasicDetails.PolicyDetails.PolicyNo = x.PolicyNo;
          IntimateJson.policyNo = x.PolicyNo;
          IntimateJson.claimBasicDetails.PolicyDetails.PolicyStartDate = x.PolicyStartDate;
          IntimateJson.claimBasicDetails.PolicyDetails.PolicyEndDate = x.PolicyEndDate;
          IntimateJson.claimBasicDetails.PolicyDetails.VehiclePlateNo =
            x.InsurableItem[0]?.RiskItems[0]?.RegistrationNumber;
          IntimateJson.claimBasicDetails.PolicyDetails.VehicleUsageType =
            x.ProposerDetails?.VehicleUsage;
          IntimateJson.claimBasicDetails.PolicyDetails.ChassisNumber =
            x.InsurableItem[0]?.RiskItems[0]?.ChassisNumber;
          IntimateJson.claimBasicDetails.PolicyDetails.EngineNumber =
            x.InsurableItem[0]?.RiskItems[0]?.EngineNumber;
          IntimateJson.claimBasicDetails.PolicyDetails.MobileNumber = x.ProposerDetails?.ContactNo;
          IntimateJson.claimBasicDetails.PolicyDetails.EmailId = x.ProposerDetails?.EmailId;
          // to save coverages in comma separated values
          IntimateJson.claimBasicDetails.PolicyDetails.Coverages = x.InsurableItem[0].Covers.map(
            (y) => (y.CoverName !== "" ? y.CoverName : null)
          )
            .filter((cover) => cover !== null)
            .join(" , ");
        }
      });
      setIntimationJson({ ...IntimateJson });
      const request = {
        Reportname: "TakafulMasterClaimdata",
        paramList: [
          {
            ParameterName: "PolicyNo",
            ParameterValue: policyresponse.PolicyDetails[0].PolicyNo,
          },
        ],
      };
      const claimAPI = await GetPayLoadByQueryDynamic(request);
      console.log("ClaimAPI", claimAPI);
      if (claimAPI.data.finalResult !== null) {
        const sort = claimAPI.data.finalResult
          .sort((a, b) => a.ClaimNumber.localeCompare(b.ClaimNumber))
          .reverse();
        setClaimRows(sort);
      }
      setClaim(true);
      setLoading(false);
    }
  }, [Rows.length === 1]);

  const handleClaim = () => {
    // next step after 3rd stepper
    setClaim(false);
    setReviewRows([]);
    setExistClaimRows([]);
    masters.TransaData = newdata;
    setMasters({ ...masters });
    setSelectCheckBox([]);
    IntimateJson.claimBasicDetails.PolicyDetails.isPolicyDetailsVerified = false;
    IntimateJson.transactionDataDTO = [];
    IntimateJson.claimBasicDetails.PolicyDetails.isIntimated = "No";
    setIntimationJson({ ...IntimateJson });
    setStepForword(stepForward + 1);
    // setDopen(true);
  };
  const handleRegisteredClaim = async () => {
    // next step after 3rd stepper
    setClaim(false);
    setLoading(true);
    setStepForword(stepForward + 1);
    const res = await GetClaimDetails(selectedClaimRow);
    setSaveclaimjson({ ...res.data.finalResult[0] });
    masters.TransaData.transactionDetails = {
      ...res.data.finalResult[0].transactionDataDTO[0].transactionDetails,
    };

    const updatedSelectCheckbox = { ...selectCheckbox };
    const split =
      res.data.finalResult[0].transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident.split(
        ","
      );
    if (split.length === 0) {
      updatedSelectCheckbox[
        res.data.finalResult[0].transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident
      ] =
        res.data.finalResult[0].transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident;
    } else {
      split.forEach((x) => {
        updatedSelectCheckbox[x] = x;
      });
    }
    const rowss = [];
    res.data.finalResult[0].transactionDataDTO.forEach((x, i) => {
      const date = x.createdDateTime !== null ? x.createdDateTime.split("T")[0].split("-") : "";
      const ref = {
        ReferenceNo: i + 1,
        ClaimCategory: x.transactionNumber.substr(0, 2),
        IntimatedDate: x.createdDateTime !== null ? `${date[1]}/${date[2]}/${date[0]}` : "",
        ClaimNo: x.transactionNumber,
      };
      rowss.push(ref);
    });
    // setDopen(true);
    setExistClaimRows(rowss);
    setSelectCheckBox(updatedSelectCheckbox);
    // to get the previously added notes inside grid
    res.data.finalResult[0].transactionDataDTO.forEach((x) => {
      x.transactionDetails.Remarks.forEach((y) => {
        masters.NotesRows.push(y);
      });
    });
    const Claim = res.data.finalResult[0];
    setTransactionDTOLen(res.data.finalResult[0].transactionDataDTO.length); // set the length of previous transaction dto to show only the new transactions numbers after adding to the master claim
    Claim.claimBasicDetails.PolicyDetails.isIntimated = "No";
    setIntimationJson({ ...Claim });
    setMasters({ ...masters });
    handleClear();
    console.log("999", res, split);
    setLoading(false);
  };

  const Ishandleradio = (e, name) => {
    handletwoAccordionerror();
    if (error === false) {
      switch (name) {
        case "vehicle-damage":
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isInsured =
            e.target.value;
          if (
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .isInsured === "No"
          ) {
            handleClear();
          }
          break;
        case "TPvehicle-damage":
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isTPVehicleDamaged =
            e.target.value;
          if (
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .isTPVehicleDamaged === "No"
          ) {
            handleClear();
          }
          break;
        case "TPProperty-damage":
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isTPPropertyDamaged =
            e.target.value;
          if (
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .isTPPropertyDamaged === "No"
          ) {
            handleClear();
          }
          break;
        case "isInjury_Self":
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isInjurySelfOrTP =
            e.target.value;
          if (
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .isInjurySelfOrTP === "No"
          ) {
            handleClear();
          }
          break;
        case "Desease":
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].IsDeseasedAccident =
            e.target.value;
          if (
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .IsDeseasedAccident === "No"
          ) {
            handleClear();
          }
          break;
        case "animalDeath":
          masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].IsAnimalDeathOrInjury =
            e.target.value;
          if (
            masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
              .IsAnimalDeathOrInjury === "No"
          ) {
            handleClear();
          }
          break;
        default:
      }
    }
    setMasters({ ...masters });
  };
  const handleBacktoSearchPolicy = () => {
    setClaim(false);
    Rows = [];
    setSelectedRow("");
    setSelectedClaimRow("");
    setReviewRows([]);
    setExistClaimRows([]);
    masters.TransaData = newdata;
    setMasters({ ...masters });
    setSelectCheckBox([]);
    IntimateJson.claimBasicDetails.PolicyDetails.ParticipantName = "";
    IntimateJson.claimBasicDetails.PolicyDetails.PolicyNo = "";
    IntimateJson.claimBasicDetails.PolicyDetails.PolicyStartDate = "";
    IntimateJson.claimBasicDetails.PolicyDetails.PolicyEndDate = "";
    IntimateJson.claimBasicDetails.PolicyDetails.VehiclePlateNo = "";
    IntimateJson.claimBasicDetails.PolicyDetails.VehicleUsageType = "";
    IntimateJson.claimBasicDetails.PolicyDetails.ChassisNumber = "";
    IntimateJson.claimBasicDetails.PolicyDetails.EngineNumber = "";
    IntimateJson.claimBasicDetails.PolicyDetails.MobileNumber = "";
    IntimateJson.claimBasicDetails.PolicyDetails.EmailId = "";
    IntimateJson.claimBasicDetails.PolicyDetails.Coverages = "";
    IntimateJson.claimBasicDetails.PolicyDetails.isPolicyDetailsVerified = false;
    IntimateJson.transactionDataDTO = [];
    setIntimationJson({ ...IntimateJson });
    setStepForword(stepForward - 1);
  };

  const handleReset = () => {
    setSelectedRow("");
    setSelectedClaimRow("");
  };

  const hadleBacktoPolicyDetails = () => {
    setClaim(true);
    setStepForword(stepForward - 1);
  };

  const handleSearchChange = async (e) => {
    const alphnumslash = /^[a-zA-Z0-9/]*$/;
    const alphanum = /^[a-zA-Z0-9]*$/;
    Object.keys(SearchObj).forEach((obj) => {
      if (obj !== "productType") {
        if (e.target.name === obj) {
          if (obj === "PolicyNo") {
            if (alphnumslash.test(e.target.value)) {
              SearchObj[obj] = e.target.value;
            }
          } else if (obj === "chassisNo") {
            if (alphanum.test(e.target.value)) {
              SearchObj[obj] = e.target.value;
            }
          } else {
            SearchObj[obj] = e.target.value;
          }
        } else {
          SearchObj[obj] = "";
        }
      }
    });
    SetSearchObj((prev) => ({ ...prev, ...SearchObj }));
  };

  const handleChange = (e, value, name) => {
    const updatedSearchObj = { ...SearchObj, [e.target.name]: e.target.value };
    SetSearchObj(updatedSearchObj);
    let newValue;
    switch (name) {
      case "productType":
        SearchObj.productType = value;
        SetSearchObj((prev) => ({ ...prev, ...SearchObj }));
        break;
      case "Notes":
        console.log("saveclaimjson", Saveclaimjson);
        newValue = e.target.value;
        break;
      default:
    }
    setNote(newValue);
    setIntimationJson({ ...IntimateJson });
    console.log("Intimation", IntimateJson);
  };

  const handlePolicyExcess = (e) => {
    IntimateJson.claimBasicDetails.PolicyDetails.PaymentDetails[e.target.name] = e.target.value;
    setIntimationJson({ ...IntimateJson });
    console.log("policyexcess", IntimateJson.claimBasicDetails.PolicyDetails.PaymentDetails);
  };

  const handleIntimateClaim = async () => {
    handletwoAccordionerror();
    if (error === false) {
      // if (IntimateJson.transactionDataDTO.length === 0) {
      if (ReviewClaimRows.length === 0) {
        Swal.fire({
          title: "Error",
          icon: "error",
          allowOutsideClick: false,
          showCloseButton: true,
          text: "Please add details to grid to register the claim",
        });
      } else {
        const accidentDateTime =
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate;
        // converting 10/01/2024 11:30 PM to 10/01/2024 23:30:00
        const dateObj = new Date(accidentDateTime);
        const formattedDate =
          `${(dateObj.getMonth() + 1).toString().padStart(2, "0")}/` +
          `${dateObj.getDate().toString().padStart(2, "0")}/` +
          `${dateObj.getFullYear()} ` +
          `${dateObj.getHours().toString().padStart(2, "0")}:` +
          `${dateObj.getMinutes().toString().padStart(2, "0")}`;

        const formattedDateTime = `${formattedDate}:00`;
        IntimateJson.lossDateTime = formattedDateTime;
        IntimateJson.locationOfEvent =
          masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation;
        IntimateJson.policyNo = IntimateJson.claimBasicDetails.PolicyDetails.PolicyNo;
        masters.Flags.error = false;
        setMasters({ ...masters });
        IntimateJson.createdBy = localUserName;
        setIntimationJson({ ...IntimateJson });
        if (IntimateJson.claimNumber === undefined || IntimateJson.claimNumber === null) {
          setLoading(true);
          const currentYear = new Date().getFullYear();
          const lastTwoDigits = currentYear.toString().slice(-2);
          const currMonth = (new Date().getMonth() + 1).toString().padStart(2, "0").slice(-2);

          // to save claimhandler details , because need to show in the datagrid of processing flow
          await Promise.all(
            IntimateJson.transactionDataDTO.map(async (transaction) => {
              const obj = {
                reportname: "TOI_GetClaimHandlerByNmaeorID",
                paramList: [
                  {
                    parameterName: "ClaimHandlerID",
                    parameterValue: "",
                  },
                  {
                    parameterName: "ClaimHandlerName",
                    parameterValue:
                      transaction.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                        .Claimshandler,
                  },
                ],
              };

              try {
                const response4 = await GetPayLoadByQueryDynamic(obj);
                if (response4.status === 200) {
                  const today = new Date();
                  const dateFormatted = today.toISOString().split("T")[0];
                  const timeFormatted = today.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });
                  const obj5 = {
                    Status: "Surveyor Appointed",
                    SlNo: response4.data.finalResult[0].SlNo,
                    ClaimHandlerID: response4.data.finalResult[0].ClaimHandlerID,
                    ClaimHandlerName: response4.data.finalResult[0].ClaimHandlerName,
                    ClaimHandlerNo: response4.data.finalResult[0].ClaimHandlerNo,
                    Location: response4.data.finalResult[0].Location,
                    SurveyType: response4.data.finalResult[0].SurveyType,
                    Email: response4.data.finalResult[0].Email,
                    AssignedDateandTime: `${dateFormatted} ${timeFormatted}`,
                  };
                  transaction.transactionDetails.SurveyorDetails[0].ClaimsHandler.push(obj5);
                  setIntimationJson({ ...IntimateJson });
                }
              } catch (error1) {
                Swal.fire({
                  icon: "error",
                  title: "No records found for Claim Handler !",
                });
              }
            })
          );

          const updtres = await UpdateSequenceNumber(
            "MasterClaimNumber",
            `CM${lastTwoDigits}${currMonth}`,
            "ClaimNumber",
            IntimateJson
          );
          console.log("updtresdata", updtres.data);
          console.log("updtres", updtres);
          const saveres = await GenericApi(
            "Motor_PrivateCar",
            "TOI_SaveClaimDetails",
            updtres.data
          );
          // const saveres = await SaveClaimDetails(updtres.data);
          // setClaimsDetails(saveres);
          console.log("saveres", saveres);
          // saveClaimAPIResponse = saveres;
          setSaveclaimjson({ ...saveres.finalResult });
          saveres.finalResult.transactionDataDTO.forEach(async (transaction) => {
            const requestData = {
              TransactionNumber: transaction.transactionNumber,
              CreatedBy: localUserID,
            };
            await SaveClaimHistory(requestData);
            // console.log("transaction", transaction);
            // console.log("");
            await GenericApi("Motor_PrivateCar", "TOI_ClaimIntimationWFSave", transaction);
          });
          // // to save reserve inside claimBasicDetails for all transaction
          // saveres.finalResult.transactionDataDTO.forEach((x) => {
          //   const obj = {
          //     TransactionNo: x.transactionNumber,
          //     Amount: x.transactionDetails.ReserveDetails.TotalAmount,
          //   };
          //   IntimateJson.claimBasicDetails.TransactionReservedDetails.Reserve.push(obj);
          // });
          // setIntimationJson({ ...IntimateJson });
          // console.log("reserveinClaimBasicDetails", IntimateJson);
          // console.log("");
          // const api = await SaveClaimDetails(IntimateJson);
          // console.log("jsonafteraddreserveinclaimBasicDetails", api);

          if (saveres.status === 1) {
            setLoading(false);

            const transactionNumbers = saveres.finalResult.transactionDataDTO.map(
              (item) => item.transactionNumber
            );
            let transactionNumbersHTML = "";
            if (transactionNumbers.length - transactionDTOLen > 1) {
              transactionNumbers.forEach((number, index) => {
                if (index >= transactionDTOLen) {
                  transactionNumbersHTML += `${
                    index === transactionDTOLen ? "Claim No. generated : <br/> " : ""
                  }${number}<br/>`;
                }
              });
            } else {
              transactionNumbers.forEach((number, index) => {
                if (index >= transactionDTOLen) {
                  transactionNumbersHTML += `${
                    index === transactionDTOLen ? "Claim No. generated : " : ""
                  }${number}<br/>`;
                }
              });
            }
            Swal.fire({
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonColor: "#A7CF3C",
              confirmButtonText: "Close",
              html: `<img src="${SuccessTick}" alt="success image" style="width: 120px; height: 120px;">
            <div style="text-align: center">
              <span style="color: #333333; font-size: 16px; font-family: Roboto; font-weight: 500; line-height: 25.60px; word-wrap: break-word">
                Your claim has been intimated successfully<br/>&nbsp;&nbsp;
                Master Claim No. generated  : </span><span style="color: #333333; font-size: 16px; font-family: Roboto; font-weight: 900; line-height: 25.60px; word-wrap: break-word">${saveres.finalResult.claimNumber}</span><span style="color: #333333; font-size: 16px; font-family: Roboto; font-weight: 500; line-height: 25.60px; word-wrap: break-word"></span></div></br>&nbsp;
                <span style="color: #333333; font-size: 16px; font-family: Roboto; font-weight: 500; line-height: 25.60px; text-align: left; word-wrap: break-word">
                ${transactionNumbersHTML}</span>
                
              </span>
            </div></br>&nbsp;&nbsp;
            <div style="text-align: center; color: #17411E; font-size: 14px; font-family: Roboto; font-weight: 500; line-height: 22.40px; word-wrap: break-word">
              Claim details have been sent to the registered Mobile No. & Email
            </div>`,
            }).then((result) => {
              if (result.isConfirmed) {
                saveres.finalResult.claimBasicDetails.PolicyDetails.isIntimated = "Yes";
                setIntimationJson({ ...saveres.finalResult });
                window.scrollTo(0, document.body.scrollHeight);
              }
            });
            // .then((result) => {
            //   if (result.isConfirmed) {
            //     // setIsSummary(true);
            //   } else if (result.dismiss === Swal.DismissReason.cancel) {
            //     window.location.href = "/Claims/SearchClaims";
            //   }
            // });
          }
        } else {
          console.log("genericapirequest", IntimateJson);
          setLoading(true);
          const saveresult = await GenericApi(
            "Motor_PrivateCar",
            "TOI_SaveClaimDetails",
            IntimateJson
          );
          console.log("saveres", saveresult);
          saveresult.finalResult.transactionDataDTO.forEach(async (transaction, i) => {
            if (i >= transactionDTOLen) {
              await GenericApi("Motor_PrivateCar", "TOI_ClaimIntimationWFSave", transaction);
            }
          });
          if (saveresult.status === 1) {
            const transactionNumbers = saveresult.finalResult.transactionDataDTO.map(
              (item) => item.transactionNumber
            );
            let transactionNumbersHTML = "";
            if (transactionNumbers.length - transactionDTOLen > 1) {
              transactionNumbers.forEach((number, index) => {
                if (index >= transactionDTOLen) {
                  transactionNumbersHTML += `${
                    index === transactionDTOLen ? "Claim No. generated : <br/> " : ""
                  }${number}<br/>`;
                }
              });
            } else {
              transactionNumbers.forEach((number, index) => {
                if (index >= transactionDTOLen) {
                  transactionNumbersHTML += `${
                    index === transactionDTOLen ? "Claim No. generated : " : ""
                  }${number}<br/>`;
                }
              });
            }
            setLoading(false);
            Swal.fire({
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonColor: "#A7CF3C",
              confirmButtonText: "Close",
              html: `<img src="${SuccessTick}" alt="success image" style="width: 120px; height: 120px;">
            <div style="text-align: center">
              <span style="color: #333333; font-size: 16px; font-family: Roboto; font-weight: 500; line-height: 25.60px; word-wrap: break-word">
                Your claim has been intimated successfully<br/>&nbsp;&nbsp;
                for Master claim No.  : </span><span style="color: #333333; font-size: 16px; font-family: Roboto; font-weight: 900; line-height: 25.60px; word-wrap: break-word">${saveresult.finalResult.claimNumber}</span><span style="color: #333333; font-size: 16px; font-family: Roboto; font-weight: 500; line-height: 25.60px; word-wrap: break-word"></span></div></br>&nbsp;
                <span style="color: #333333; font-size: 16px; font-family: Roboto; font-weight: 500; line-height: 25.60px; text-align: left; word-wrap: break-word">
                ${transactionNumbersHTML}</span>
                
              </span>
            </div></br>&nbsp;&nbsp;
            <div style="text-align: center; color: #17411E; font-size: 14px; font-family: Roboto; font-weight: 500; line-height: 22.40px; word-wrap: break-word">
              Claim details have been sent to the registered Mobile No. & Email
            </div>`,
            }).then((result) => {
              if (result.isConfirmed) {
                saveresult.finalResult.claimBasicDetails.PolicyDetails.isIntimated = "Yes";
                setIntimationJson({ ...saveresult.finalResult });
                window.scrollTo(0, document.body.scrollHeight);
              }
            });
          }
        }
      }
    }
  };
  console.log("IntimatedJson", IntimateJson);

  const handleAddtoGrid = async (name) => {
    handletwoAccordionerror();
    if (error === false) {
      setLoading(true);
      let reserve;
      console.log("123", IntimateJson);
      const data1 = { ReferenceNo: "", ClaimCategory: "", IntimatedDate: "" };
      const currentYear = new Date().getFullYear();
      const lastTwoDigits = currentYear.toString().slice(-2);
      const currMonth = (new Date().getMonth() + 1).toString().padStart(2, "0").slice(-2);
      handleGriderror(name);

      // calculating proximitydays as accidentdate - policystartdate
      masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ProximityDays =
        diffDaysCalculator(
          new Date(masters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate),
          new Date(IntimateJson.claimBasicDetails.PolicyDetails.PolicyStartDate)
        ).toString();

      // storing status and stage of each transaction
      const obj = { MasterType: "ClaimStatus", Value: "Registration" };
      const response = await GetProdPartnermastersMasterData(1228, "ClaimStatus", obj);
      masters.TransaData.transactionStageId = response.data[0].Stage;
      masters.TransaData.transactionStageStatusId = response.data[0].Status;
      setMasters({ ...masters });

      switch (name) {
        case "OD":
          if (Griderror === false) {
            masters.Flags.ParticipantVehicle = false;
            masters.TransaData.transactionDetails.Prefix = `OD${lastTwoDigits}${currMonth}`;
            const Payload = {
              TypeCode: "OD",
              AdditionalDescription: "",
            };
            const reserveOD = await GetProdPartnermastersMasterData(1228, "ReserveMaster", Payload);
            console.log("reserveOD", reserveOD);
            masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0].Indemnity[0].Amount =
              reserveOD.data[0].Value;
            masters.TransaData.transactionDetails.ReserveDetails.TotalAmount =
              reserveOD.data[0].Value;
            setMasters({ ...masters });
            IntimateJson.transactionDataDTO = [
              ...IntimateJson.transactionDataDTO,
              {
                ...masters.TransaData,
                ReferenceNo: IntimateJson.transactionDataDTO.length + 1,
                IntimatedDate: new Date().toLocaleDateString("en-GB"),
              },
            ];
            setIntimationJson({ ...IntimateJson });
            data1.ReferenceNo = IntimateJson.transactionDataDTO.length;
            data1.ClaimCategory = "OD";
          }
          break;
        case "TP":
          if (Griderror === false) {
            masters.Flags.TPVehicle = false;
            masters.TransaData.transactionDetails.Prefix = `TP${lastTwoDigits}${currMonth}`;
            const Payload = {
              TypeCode: "TP",
              AdditionalDescription: "",
            };
            const reserveOD = await GetProdPartnermastersMasterData(1228, "ReserveMaster", Payload);
            console.log("reserveOD", reserveOD);
            masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0].Indemnity[0].Amount =
              reserveOD.data[0].Value;
            masters.TransaData.transactionDetails.ReserveDetails.TotalAmount =
              reserveOD.data[0].Value;
            setMasters({ ...masters });
            IntimateJson.transactionDataDTO = [
              ...IntimateJson.transactionDataDTO,
              {
                ...masters.TransaData,
                ReferenceNo: IntimateJson.transactionDataDTO.length + 1,
                IntimatedDate: new Date().toLocaleDateString("en-GB"),
              },
            ];
            setIntimationJson({ ...IntimateJson });
            data1.ReferenceNo = IntimateJson.transactionDataDTO.length;
            data1.ClaimCategory = "TP";
          }
          break;
        case "PD":
          if (Griderror === false) {
            masters.Flags.TPProperty = false;
            masters.TransaData.transactionDetails.Prefix = `PD${lastTwoDigits}${currMonth}`;
            if (
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .PropertyDescription === "Camera" ||
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .PropertyDescription === "Speed Radar" ||
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .otherpropertyDescription === "Camera" ||
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .otherpropertyDescription === "Speed Radar"
            ) {
              reserve = {
                TypeCode: "PD",
                AdditionalDescription:
                  masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                    .PropertyDescription ||
                  masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                    .otherpropertyDescription,
              };
            } else {
              reserve = {
                TypeCode: "PD",
                AdditionalDescription: "",
              };
            }
            const reserveOD = await GetProdPartnermastersMasterData(1228, "ReserveMaster", reserve);
            console.log("reserveOD", reserveOD);
            masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0].Indemnity[0].Amount =
              reserveOD.data[0].Value;
            masters.TransaData.transactionDetails.ReserveDetails.TotalAmount =
              reserveOD.data[0].Value;
            setMasters({ ...masters });
            IntimateJson.transactionDataDTO = [
              ...IntimateJson.transactionDataDTO,
              {
                ...masters.TransaData,
                ReferenceNo: IntimateJson.transactionDataDTO.length + 1,
                IntimatedDate: new Date().toLocaleDateString("en-GB"),
              },
            ];
            setIntimationJson({ ...IntimateJson });
            data1.ReferenceNo = IntimateJson.transactionDataDTO.length;
            data1.ClaimCategory = "PD";
          }
          break;
        case "BI":
          if (Griderror === false) {
            masters.Flags.Injury = false;
            masters.TransaData.transactionDetails.Prefix = `BI${lastTwoDigits}${currMonth}`;
            const Payload = {
              TypeCode: "BI",
              AdditionalDescription:
                masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                  .InjuryType,
            };
            const reserveOD = await GetProdPartnermastersMasterData(1228, "ReserveMaster", Payload);
            console.log("reserveOD", reserveOD);
            masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0].Indemnity[0].Amount =
              reserveOD.data[0].Value;
            masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0].Hospital[0].Amount =
              reserveOD.data[1].Value;
            masters.TransaData.transactionDetails.ReserveDetails.TotalAmount = `${
              Number(reserveOD.data[0].Value) + Number(reserveOD.data[1].Value)
            }`;

            if (
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .isAmbulanceServiceAvailed === "Yes" &&
              IntimateJson.transactionDataDTO.every(
                (x) =>
                  x.transactionDetails.ReserveDetails.ReserverHistory[0].Expense[0].Amount === ""
              )
            ) {
              const expense = {
                TypeCode: "BI",
                AdditionalDescription: "Expense",
              };
              const reserveexpense = await GetProdPartnermastersMasterData(
                1228,
                "ReserveMaster",
                expense
              );
              console.log("reserveexpense", reserveexpense);
              masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0].Expense[0].Amount =
                reserveexpense.data[0].Value;
              masters.TransaData.transactionDetails.ReserveDetails.TotalAmount = `${
                Number(
                  masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0]
                    .Indemnity[0].Amount
                ) +
                Number(
                  masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0]
                    .Hospital[0].Amount
                ) +
                Number(reserveexpense.data[0].Value)
              }`;
            }

            setMasters({ ...masters });
            IntimateJson.transactionDataDTO = [
              ...IntimateJson.transactionDataDTO,
              {
                ...masters.TransaData,
                ReferenceNo: IntimateJson.transactionDataDTO.length + 1,
                IntimatedDate: new Date().toLocaleDateString("en-GB"),
              },
            ];
            setIntimationJson({ ...IntimateJson });
            data1.ReferenceNo = IntimateJson.transactionDataDTO.length;
            data1.ClaimCategory = "BI";
          }
          break;
        case "DT":
          if (Griderror === false) {
            masters.Flags.Death = false;
            masters.TransaData.transactionDetails.Prefix = `DT${lastTwoDigits}${currMonth}`;
            if (
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .Relationwithparticipant === "Third Party" ||
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .otherRelationwithparticipant === "Third Party"
            ) {
              reserve = {
                TypeCode: "DT",
                AdditionalDescription:
                  masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                    .Gender,
              };
            } else {
              reserve = {
                TypeCode: "DT",
                AdditionalDescription: "",
              };
            }
            const reserveOD = await GetProdPartnermastersMasterData(1228, "ReserveMaster", reserve);
            console.log("reserveOD", reserveOD);
            masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0].Indemnity[0].Amount =
              reserveOD.data[0].Value;
            masters.TransaData.transactionDetails.ReserveDetails.TotalAmount =
              reserveOD.data[0].Value;

            if (
              masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .isAmbulanceServiceAvailed === "Yes" &&
              IntimateJson.transactionDataDTO.every(
                (x) =>
                  x.transactionDetails.ReserveDetails.ReserverHistory[0].Expense[0].Amount === ""
              )
            ) {
              const expense = {
                TypeCode: "DT",
                AdditionalDescription: "Expense",
              };
              const reserveexpense = await GetProdPartnermastersMasterData(
                1228,
                "ReserveMaster",
                expense
              );
              console.log("reserveexpense", reserveexpense);
              masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0].Expense[0].Amount =
                reserveexpense.data[0].Value;
              masters.TransaData.transactionDetails.ReserveDetails.TotalAmount = `${
                Number(
                  masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0]
                    .Indemnity[0].Amount
                ) +
                Number(
                  masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0]
                    .Hospital[0].Amount
                ) +
                Number(reserveexpense.data[0].Value)
              }`;
            }
            setMasters({ ...masters });
            IntimateJson.transactionDataDTO = [
              ...IntimateJson.transactionDataDTO,
              {
                ...masters.TransaData,
                ReferenceNo: IntimateJson.transactionDataDTO.length + 1,
                IntimatedDate: new Date().toLocaleDateString("en-GB"),
              },
            ];
            setIntimationJson({ ...IntimateJson });
            data1.ReferenceNo = IntimateJson.transactionDataDTO.length;
            data1.ClaimCategory = "DT";
          }
          break;
        case "AN":
          if (Griderror === false) {
            masters.Flags.Animal = false;
            masters.TransaData.transactionDetails.Prefix = `AN${lastTwoDigits}${currMonth}`;
            const Payload = {
              TypeCode: "AN",
              AdditionalDescription: "",
            };
            const reserveOD = await GetProdPartnermastersMasterData(1228, "ReserveMaster", Payload);
            console.log("reserveOD", reserveOD);
            masters.TransaData.transactionDetails.ReserveDetails.ReserverHistory[0].Indemnity[0].Amount =
              reserveOD.data[0].Value;
            masters.TransaData.transactionDetails.ReserveDetails.TotalAmount =
              reserveOD.data[0].Value;
            setMasters({ ...masters });
            IntimateJson.transactionDataDTO = [
              ...IntimateJson.transactionDataDTO,
              {
                ...masters.TransaData,
                ReferenceNo: IntimateJson.transactionDataDTO.length + 1,
                IntimatedDate: new Date().toLocaleDateString("en-GB"),
              },
            ];
            setIntimationJson({ ...IntimateJson });
            data1.ReferenceNo = IntimateJson.transactionDataDTO.length;
            data1.ClaimCategory = "AN";
          }
          break;
        default:
      }
      data1.IntimatedDate = new Date().toLocaleDateString("en-GB");
      setReviewRows((prevRows) => [...(prevRows || []), data1]);
      handleClear();
      setLoading(false);
      console.log("newdata", IntimateJson);
      window.scrollTo(0, document.body.scrollHeight);
      setRespMessage("Your data has been added successfully!");
      setSeverity("success");
      handleClick({
        vertical: "bottom",
        horizontal: "right",
      });
    }
  };
  const handleNoteSave = (e, i, a) => {
    if (e.target.checked === true) {
      const obj = { Note: a };
      masters.checked[i] = { ...obj };
    } else {
      masters.checked[i] = { Note: "" };
    }
    setMasters({ ...masters });
  };
  const menus = [
    {
      name: "Intimation Details",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Upload/Review Doc",
      disabled: IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "No",
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Note",
      disabled: IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "No",
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
  ];

  useEffect(() => {
    handleMenu(0);
  }, []);

  const generateFile = (content, fileName) => {
    // download the file by using base64
    console.log("content", content);
    const src = `data:application/docx;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    console.log("FilenameQuote", link.download);

    link.click();
  };
  const handleROPGenerate = async () => {
    setLoading(true);
    const payload = { ClaimNumber: IntimateJson.claimNumber };
    const response = await GenericApi("Motor_PrivateCar", "TAOIROPAcknowledgemnt", payload);
    if (response.status === 1) {
      generateFile(response.finalResult.fileUploadResp.data, "ROP_Acknowledgement.docx");
      setLoading(false);
    } else {
      setLoading(false);
      Swal.fire({
        title: "Error",
        icon: "error",
        allowOutsideClick: false,
        showCloseButton: true,
        text: "Something went wrong",
      });
    }
  };

  return (
    <Card>
      {/* {isSummary === false ? (
        <> */}
      <Grid container p={2} justifyContent="left">
        <MDTypography variant="body1" color="primary">
          Intimate Claim
        </MDTypography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Stepper activeStep={stepForward} alternativeLabel sx={{ width: "100%", height: "100%" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      {stepForward === 0 ? (
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              options={["Motor Private", "Motor Commercial"]}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              name="productType"
              value={SearchObj.productType}
              getOptionLabel={(option) => option}
              // getOptionLabel={(option) => option.mValue}
              onChange={(e, value) => handleChange(e, value, "productType")}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label="Product Type"
                  required
                  placeholder="Select"
                  //
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Policy No."
              name="PolicyNo"
              placeholder="Enter"
              value={SearchObj.PolicyNo}
              onChange={handleSearchChange}
              inputProps={{ maxLength: 21 }}
            />
            {masters.Flags.Numerror === true && SearchObj.PolicyNo !== "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Policy Number Should be 21 Character
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Chassis No."
              name="chassisNo"
              placeholder="Enter"
              value={SearchObj.chassisNo}
              onChange={handleSearchChange}
              // onBlur={handleOnBlur}
              // inputProps={{ maxLength: 13 }}
              // disabled={flags.intimationflag}
            />
            {/* {masters.Flags.ChassisNoerror === true && SearchObj.chassisNo !== "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Chassis Number Should be 25 Character
              </MDTypography>
            ) : null} */}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Participant Civil ID"
              name="civilID"
              placeholder="Enter"
              value={SearchObj.civilID}
              onChange={handleSearchChange}
              // onBlur={handleOnBlur}
              // inputProps={{ maxLength: 13 }}
              // disabled={flags.intimationflag}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="center" direction="row">
              <MDButton
                variant="contained"
                onClick={onPolicySearch}
                color="secondary"
                //   disabled={flags.searchbuttonflag === true}
              >
                SEARCH
              </MDButton>
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress />
              </Backdrop>
            </Stack>
          </Grid>
        </Grid>
      ) : null}
      {stepForward === 1 ? (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
          <DataGrid
            autoHeight
            rows={Rows}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.PolicyNo}
            // onRowClick={(param) => handleMemberClick(param)}
          />
          <br />
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {Claimflag === false ? (
              <MDButton variant="outlined" color="secondary" onClick={handleBacktoSearchPolicy}>
                Back
              </MDButton>
            ) : null}
            {/* <MDBox sx={{ flex: "1 1 auto" }} />
            <MDButton disabled={selectedRow === ""} onClick={() => handleMemberClick()}>
              PROCEED
            </MDButton> */}
          </MDBox>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress />
          </Backdrop>
        </Grid>
      ) : null}
      {stepForward === 1 && Claimflag && selectedRow !== "" ? (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} ml={2}>
            <MDTypography variant="body1" fontWeight="bold">
              Please select any one of the below record to continue with the existing master caim
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
            <DataGrid
              autoHeight
              rows={ClaimRows}
              columns={MemberColumn}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              getRowId={(row) => row.ClaimNumber}
              // onRowClick={(param) => handleClaimClick(param)}
            />
            <br />
            <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <MDButton
                variant="outlined"
                color="secondary"
                display="flex"
                onClick={handleBacktoSearchPolicy}
              >
                Back
              </MDButton>
              <MDBox sx={{ flex: "1 1 auto" }} />
              <MDButton
                variant="outlined"
                color="secondary"
                display="flex"
                onClick={handleReset}
                sx={{
                  mr: 2,
                }}
              >
                Reset
              </MDButton>
              {selectedClaimRow === "" && (
                <MDButton
                  variant="contained"
                  display="flex"
                  color="secondary"
                  sx={{
                    justifyContent: "flex-end",
                    whiteSpace: "nowrap",
                    // mr: 2,
                  }}
                  onClick={() => handleClaim()}
                >
                  Register New Claim
                </MDButton>
              )}
              {selectedClaimRow !== "" && (
                <MDButton
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRegisteredClaim()}
                >
                  Proceed
                </MDButton>
              )}
            </MDBox>
          </Grid>
        </>
      ) : null}
      {stepForward === 2 ? (
        <Grid container spacing={1} p={1}>
          <Grid item xs={12} sm={12} md={2.5} xl={2.5} xxl={2.5}>
            <MenuList sx={{ borderRight: 1, borderColor: "divider", overflowX: "auto" }}>
              {menus.map((x, key) => (
                <MenuItem
                  my={3}
                  onClick={() => handleMenu(key)}
                  color="primary"
                  disabled={x.disabled}
                  sx={{
                    color: key === ids ? x.fontColor : "",
                    background: key === ids ? x.background : "",
                    border: x?.border ? x.border : 0,
                    borderColor: "divider",
                  }}
                >
                  <Tab sx={{ color: "white", fontSize: "18px" }} label={x.name} wrapped />
                </MenuItem>
              ))}
            </MenuList>
          </Grid>

          <Grid item xs={12} sm={12} md={9.5} xl={9.5} xxl={9.5}>
            {ids === 0 && (
              <IntimationDetails
                accordians={accordians}
                IntimateJson={IntimateJson}
                setIntimationJson={setIntimationJson}
                handleCancel={handleCancel}
                handlemodelClose={handlemodelClose}
                handleIntimateClaim={handleIntimateClaim}
                handleAddtoGrid={handleAddtoGrid}
                ReviewClaimColumn={ReviewClaimColumn}
                ReviewClaimRows={ReviewClaimRows}
                ExistClaimColumn={ExistClaimColumn}
                ExistClaimRows={ExistClaimRows}
                masters={masters}
                handleClear={handleClear}
                hadleBacktoPolicyDetails={hadleBacktoPolicyDetails}
                severity={severity}
                respMessage={respMessage}
                // page={page}
                vertical={vertical}
                horizontal={horizontal}
                open={open}
                data={data}
                handleClose={handleClose}
                handleDeleteFile={handleDeleteFile}
                Ishandleradio={Ishandleradio}
                setMasters={setMasters}
                policyresponse={policyresponse}
                loading={loading}
                selectCheckbox={selectCheckbox}
                setSelectCheckBox={setSelectCheckBox}
                stepForward={stepForward}
                // selectedClaimRow={selectedClaimRow}
                ClaimNumber={ClaimNumber} // will get searched claim no
                handleROPGenerate={handleROPGenerate}
                handlePolicyExcess={handlePolicyExcess}
              />
            )}
            {ids === 2 && (
              <Notes
                modelNoteClose={modelNoteClose}
                handleNoteSave={handleNoteSave}
                handleChange={handleChange}
                masters={masters}
                IntimateJson={IntimateJson}
                Saveclaimjson={Saveclaimjson}
                Note={Note}
                NoteColumn={NoteColumn}
                modelViewNoteClose={modelViewNoteClose}
              />
            )}
            {ids === 1 && (
              <UploadDocuments
                masters={masters}
                handleProfileChange={handleProfileChange}
                handleupload={handleupload}
                modelClose={modelClose}
                handleDeleteFile={handleDeleteFile}
              />
            )}
          </Grid>
        </Grid>
      ) : null}

      {/* </>
      ) : (
        <Claimdetails claimsDetails={claimsDetails} />
      )} */}
    </Card>
  );
}
export default MotorIntimation;
