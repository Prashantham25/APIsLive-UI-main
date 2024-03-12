import moment from "moment";
import Swal from "sweetalert2";
import {
  GetProdPartnermasterData,
  GetPayLoadByQueryDynamic,
  getClaimDetails,
} from "../../data/Apis";
import TakafulDocuments from "./TakafulDocuments";

const VDANode = {
  0: "InitialLossAssessment",
  1: "RepairLossAssessment",
  2: "RepairLossAssessment",
};

const getTopLevelContent = () => [];

const getMenus = () => [
  { label: "Intimation Details", icon: "", visible: true }, // 1
  { label: "Claim Details", icon: "", visible: true }, // 2
  { label: "Upload/Review Doc", icon: "", visible: true }, // 5
  { label: "Note", icon: "", visible: true }, // 7
  { label: "Vehicle Damage Assessment", icon: "", visible: true }, // 8
  { label: "Audit Trail", icon: "", visible: true }, // 16
];

const getAccordions = ({ menuIndex, masters, dto }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [
        { label: "Policy Details ", visible: true },
        { label: "Intimation Details", visible: true },
        { label: "Participant Vehicle Details", visible: true },
        { label: "Third Party Vehicle Details", visible: true },
        { label: "TP Property Damage Details", visible: true },
        { label: "Injury Details", visible: true },
        { label: "Deceased Details", visible: true },
        { label: "Other Details", visible: true },
      ];
      break;
    case 1:
      data = [
        { label: "Policy Details", visible: true },
        { label: "ROP Details", visible: true },
        { label: "Driver Details", visible: true },
        { label: "Endorsement Details", visible: true },
      ];
      break;
    case 2:
      data = [{ label: "Documents", visible: true }];
      break;
    case 3:
      data = [{ label: "Note Details", visible: true }];
      break;
    case 4:
      data = [
        { label: "Type of Loss", visible: true },
        { label: "Initial Loss Assessment", visible: masters.tabIndex !== -1 },
        {
          label: "Invoice Details",
          visible:
            masters.tabIndex !== -1 &&
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .TypeOfLoss !== "ATL",
        },
        {
          label: "Estimation Details",
          visible:
            masters.tabIndex !== -1 &&
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .TypeOfLoss !== "ATL",
        },
        {
          label: "Scope Of Repairs",
          visible:
            masters.tabIndex !== -1 &&
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .TypeOfLoss !== "ATL",
        },
        {
          label: "Part & Labour Assessment",
          visible:
            masters.tabIndex !== -1 &&
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .TypeOfLoss !== "ATL",
        },
        { label: "Observations", visible: masters.tabIndex !== -1 },
        { label: "Recommendations", visible: masters.tabIndex !== -1 },
      ];
      break;
    case 5:
      data = [{ label: "Audit Trial", visible: true }];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getControls = ({ menuIndex, dto, masters, setMasters }) => {
  const lMasters = masters;
  const lDto = dto;
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [
        [
          {
            type: "Input",
            label: "Participant Name",
            path: `claimBasicDetails.PolicyDetails.ParticipantName`,
            visible: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Product Type",
            visible: true,
            path: `claimBasicDetails.PolicyDetails.productType`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Policy No.",
            path: `claimBasicDetails.PolicyDetails.PolicyNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date & Time",
            visible: true,
            // spacing: 2,
            path: `claimBasicDetails.PolicyDetails.PolicyStartDate`,
            dateFormat: "Y-m-d h:i K",
            altFormat: "d/m/Y h:i K",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date & Time",
            visible: true,
            // spacing: 2,
            path: `claimBasicDetails.PolicyDetails.PolicyEndDate`,
            dateFormat: "Y-m-d h:i K",
            altFormat: "d/m/Y h:i K",
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Plate No.",
            path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Usage Type",
            path: `claimBasicDetails.PolicyDetails.VehicleUsageType`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Chassis No.",
            path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Engine No.",
            path: `claimBasicDetails.PolicyDetails.EngineNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Participant Mobile No.",
            path: `claimBasicDetails.PolicyDetails.MobileNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Email ID",
            path: `claimBasicDetails.PolicyDetails.EmailId`,
            visible: true,
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Policy details are verified",
            checkedVal: true,
            uncheckedVal: false,
            spacing: 12,
            path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            // customOnChange: (e) => OnDirectFromShowRoom(e),
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Would you like to receive communications on your Mobile No. & Email ?",
            checkedVal: true,
            uncheckedVal: false,
            spacing: 12,
            path: "claimBasicDetails.PolicyDetails.iscommunicationMbEm",
            // customOnChange: (e) => OnDirectFromShowRoom(e),
            disabled: true,
          },
        ],
        [
          {
            type: "MDDatePicker",
            label: "Accident Date & Time",
            visible: true,
            // spacing: 2,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate`,
            dateFormat: "Y-m-d h:i K",
            altFormat: "d/m/Y h:i K",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Accident Location",
            visible: true,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Location details",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.otherAccidentLocation`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.AccidentLocation === "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Intimation Mode",
            visible: true,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Notified By",
            visible: true,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Notifier Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.NotifierName`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.NotifiedBy === "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Notifier Mobile No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.NotifierMobileNo`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.NotifiedBy === "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Is there any witness?",
            visible: true,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.isAnyWitness`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Witness Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.WitnessName`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isAnyWitness === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Witness Mobile No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.WitnessMobileNo`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isAnyWitness === "Yes",
            disabled: true,
          },
          {
            type: "Typography",
            label: "Cause of Accident",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "Checkbox",
            visible: true,
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Over-Speed"),
            label: "Over-Speed",
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Negligence",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Negligence"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Fatigue",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Fatigue"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Overtaking",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Overtaking"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Weather Conditions",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Weather Conditions"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Sudden Halt",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Sudden Halt"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "No safety distance",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("No safety distance"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Wrong Action",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Wrong Action"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Vehicle Defects",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Vehicle Defects"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Road Defects",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Road Defects"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Theft",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Theft"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Input",
            label: "Accident Remarks",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.AccidentRemarks`,
            visible: true,
            disabled: true,
            spacing: 12,
          },
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Was the vehicle parked ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Driver Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0].transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
          },
          {
            type: "Input",
            label: "Driver Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "Driver Age",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "Driving License No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "DL Category",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Gender`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Mobile Number",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Nationality",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Nationality`,
            // required: true,
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Is Accident reported to ROP ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
          {
            type: "Input",
            label: "ROP Report No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ROPNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isROPReported === "Yes",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "ROP Report Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ROPReportDate`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isROPReported === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "ROP Officer Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ROPOfficerName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isROPReported === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "ROP Location",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isROPReported === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ROPLocation`,
            // required: true,
            disabled: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Is Participant vehicle damaged ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isInsured`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Vehicle Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
          },
          {
            type: "Input",
            label: "Vehicle Plate No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.VehiclePlateNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Make",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Make`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Model",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Model`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            disabled: true,
          },
          {
            type: "Typography",
            label: "Which is the Preferred Area to Repair the Vehicle ?",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Location",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.Location`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "other Location",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.otherLocation`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Work Shop",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location !==
                "Others",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.WorkShop`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Work Shop",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.otherWorkShop`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            // required: true,
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            disabled: true,
            radioLabel: {
              label: "Do you need towing services ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.needtowingservices`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Any Third party Vehicle Damages ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isTPVehicleDamaged`,
            spacing: 12,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Vehicle Type",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.vehicleType`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Plate No.",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.VehiclePlateNo`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Make",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Make`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Make",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.otherMake`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Make ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Model",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Model`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Make !==
                "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Model",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.otherModel`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Make ===
                "Others",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Mulkiya Expiry Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Mobile No.",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            // required: true,
            disabled: true,
          },
          {
            type: "Typography",
            label: "Which is the Preferred Area to Repair the Vehicle ?",
            spacing: 12,
            // variant: "h6",
            // visible:
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Location",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.Location`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "other Location",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.otherLocation`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Work Shop",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location !==
                "Others",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.WorkShop`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Work Shop",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.otherWorkShop`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            // required: true,
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            disabled: true,
            radioLabel: {
              label: "Do you need towing services ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.needtowingservices`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Is there any damage to Third party property in this accident ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isTPPropertyDamaged`,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Property Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Property Type",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.PropertyType`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Property Description",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.PropertyDescription`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Property Description",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.otherpropertyDescription`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.PropertyDescription === "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Wilayat",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Wilayat`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Wilayat",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.OtherWilayat`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.Wilayat === "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Property Owner Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Name`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Property Owner Mobile No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            // required: true,
            disabled: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Are there any Injuries to Self or TP ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isInjurySelfOrTP`,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Injured Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Relation with Participant",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Relationwithparticipant`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "other Relation with participant",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.Relationwithparticipant === "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Injured Person Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Name`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Gender`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },

          {
            type: "Input",
            label: "Injured Mobile No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Injured Person Resident ID",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.ResidentID`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Injured Person Email ID",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.EmailId`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Hospital Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.HospitalName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Hospital Location",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.HospitalLocation`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
            radioLabel: {
              label: "Ambulance Service Availed ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isAmbulanceServiceAvailed`,
            spacing: 12,
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Any One Deseased in Accident ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.IsDeseasedAccident`,
            spacing: 12,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Relation with Participant",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Relationwithparticipant`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "other Relation with participant",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.Relationwithparticipant === "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Deceased Person Name",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Name`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Gender`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Legal Heir Mobile No.",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Deceased Person Resident ID",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.ResidentID`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Legal Heir Email ID",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.EmailId`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Hospital Location",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.HospitalLocation`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            disabled: true,
            radioLabel: {
              label: "Ambulance Service Availed ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isAmbulanceServiceAvailed`,
            spacing: 12,
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Is there an Injury or Death to any Animal in this Accident ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.IsAnimalDeathOrInjury`,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Animal Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Type of Animal",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.TypeofAnimal`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Other Type of Animal",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.OtherTypeofAnimal`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Type of Loss",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Typeofloss`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Count",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Count`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "Input",
            label: "Participant Name",
            path: `claimBasicDetails.PolicyDetails.ParticipantName`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Policy No.",
            path: `claimBasicDetails.PolicyDetails.PolicyNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Break In",
            // path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Product Type",
            path: `claimBasicDetails.PolicyDetails.productType`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Mobile Number",
            // path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Participant's Email",
            // path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Plate No.",
            path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Engine Number",
            path: `claimBasicDetails.PolicyDetails.EngineNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Chassis No.",
            path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Make",
            // path: `claimBasicDetails.PolicyDetails.Make`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Model",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Body Type",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Plate Type",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Purpose",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Empty Weight",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Load Weight",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Total Weight",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Civil ID/Resident No.",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Product Code",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Wilayath",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Value",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Cover Details",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Previous Policy End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Proximity Days",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ProximityDays`,
            visible: true,
            disabled: true,
            // inputProps: {
            //   sx: {
            //     color:
            //       GenericClaimsMaster?.ProximityDays &&
            //       GenericClaimsMaster.ProximityDays.finalResult.outcome === "Fail"
            //         ? "red !important"
            //         : "",
            //   },
            // },
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: {
              label: "Is Accident reported to ROP ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.isROPReported`,
            spacing: 12,
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "ROP Report No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.ROPNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.isROPReported === "Yes",
            required: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "ROP Report Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.ROPReportDate`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.isROPReported === "Yes",
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "ROP Officer Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.ROPOfficerName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.isROPReported === "Yes",
            required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "ROP Location",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.isROPReported === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.ROPLocation`,
            required: true,
            disabled: true,
          },
        ],
        [
          {
            type: "Typography",
            label: "As per FNOL",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Was the vehicle parked ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Driver Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
          },
          {
            type: "Input",
            label: "Driver Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "Driver Age",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "Driving License No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "DL Category",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Gender`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Mobile Number",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Nationality",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Nationality`,
            // required: true,
            disabled: true,
          },
          {
            type: "Typography",
            label: "As per Claim Form",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: {
              label: "Was the vehicle parked ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.wasVehicleParked`,
            spacing: 12,
            required: true,
            disabled: true,
          },
          {
            type: "Typography",
            label: "Driver Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
          },
          {
            type: "Input",
            label: "Driver Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DriverName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Driver Age",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DriverAge`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Driving License No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DrivingLicenseNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "DL Category",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DLCategory`,
            required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.Gender`,
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Mobile Number",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DriverMobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Nationality",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.Nationality`,
            required: true,
            disabled: true,
          },
          //   {
          //     type: "Button",
          //     label: "Verify Details",
          //     spacing: 12,
          //     variant: "contained",
          //     // startIcon: <DeleteIcon />,
          //     justifyContent: "end",
          //     visible:
          //       dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
          //         ?.wasVehicleParked === "No",
          //     // onClick: UploadDocument,
          //   },
          {
            type: "Typography",
            label: "As per ROP",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
          },
          {
            type: "MDDatePicker",
            label: "License expiry date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "DL Class",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            // visible:
            //   dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
            //     .wasVehicleParked === "No",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "DL Sub Class",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            // visible:
            //   dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
            //     .wasVehicleParked === "No",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "DL Status",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Endorsement Number",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Endorsement Name",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Effective Date and Time",
            visible: true,
            // path: `claimBasicDetails.PolicyDetails.PolicyEndDate`,
            dateFormat: "Y-m-d h:i K",
            altFormat: "d/m/Y h:i K",
            disabled: true,
          },
        ],
      ];
      break;
    case 2:
      data = [[...TakafulDocuments({ dto, masters, setMasters })]];
      break;
    case 3:
      data = [
        [
          //   {
          //     type: "Button",
          //     label: "Create New Note",
          //     spacing: 12,
          //     variant: "contained",
          //     // startIcon: <DeleteIcon />,
          //     justifyContent: "start",
          //     visible: true,
          //     onClick: handleCreateNewNote,
          //   },
          //   {
          //     type: "Input",
          //     label: "Note",
          //     spacing: 12,
          //     value: masters.Notes,
          //     visible: masters.CreateNoteflg,
          //     // disabled: true,
          //     required: true,
          //   },
          //   {
          //     type: "Button",
          //     label: "Cancel",
          //     spacing: 10,
          //     variant: "contained",
          //     // startIcon: <DeleteIcon />,
          //     justifyContent: "end",
          //     visible: masters.CreateNoteflg,
          //     onClick: handleCancelNote,
          //   },
          //   {
          //     type: "Button",
          //     label: "Clear",
          //     spacing: 1,
          //     variant: "contained",
          //     // startIcon: <DeleteIcon />,
          //     justifyContent: "end",
          //     visible: masters.CreateNoteflg,
          //     onClick: handleClearNote,
          //   },
          //   {
          //     type: "Button",
          //     label: "Save",
          //     spacing: 1,
          //     variant: "contained",
          //     // startIcon: <DeleteIcon />,
          //     justifyContent: "end",
          //     visible: masters.CreateNoteflg,
          //     onClick: handleNoteSave,
          //   },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "CreatedBy",
                headerName: "Created By",
                // flex: 1,
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Notes",
                headerName: "Notes",
                width: 400,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "DateTime",
                headerName: "Date Time",
                width: 200,
                headerAlign: "center",
                valueFormatter: (params) =>
                  // params?.value ? moment(params.value).format("DD/MM/YYYY HH:mm") : "",
                  params?.value ? moment(params.value).format("DD/MM/YYYY hh:mm A") : "",
                align: "center",
              },
              {
                field: "action",
                headerName: "View",
                width: 70,
                renderCell: () => (
                  <button
                    type="button"
                    style={{
                      textDecoration: "underline",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    // onClick={() => handleViewNotes()}
                  >
                    View
                  </button>
                ),
              },
            ],
            rowId: "Notes",
            value: dto.transactionDataDTO[0]?.transactionDetails?.Remarks
              ? dto.transactionDataDTO[0].transactionDetails?.Remarks
              : [],
          },
        ],
      ];
      break;
    case 4:
      data = [
        [
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.TypeOfLoss`,
            type: "RadioGroup",
            visible: true,
            justifyContent: "center",
            radioLabel: { label: "Type of Loss", labelVisible: false },
            radioList: [
              { value: "Repair Loss", label: "Repair Loss" },
              { value: "Cash Loss", label: "Cash Loss" },
              { value: "CTL", label: "CTL" },
              { value: "ATL", label: "ATL" },
            ],
            spacing: 12,
          },
          {
            type: "Tabs",
            value: masters.tabIndex,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "",
            color: "secondary",
            spacing: 12,
            customOnChange: (e, newValue) => setMasters({ ...lMasters, tabIndex: newValue }),
            // customOnChange: (e, newValue) => handleTabDatachanges(e, newValue),
            tabs: [
              {
                value: 0,
                label: "Initial Loss Assessment",
              },
              {
                value: 1,
                label: "Under Repair Loss Assessment",
              },
              {
                value: 2,
                label: "Final Loss Assessment",
              },
            ],
          },
        ],
        [
          {
            value:
              dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
                .AccidentDate,
            visible: true,
            disabled: true,
            type: "MDDatePicker",
            label: "Date of Accident",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
          },
          {
            value:
              dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .Make,
            visible: true,
            type: "Input",
            label: "Make",
            disabled: true,
          },
          {
            value:
              dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .Model,
            visible: true,
            type: "Input",
            label: "Model",
            disabled: true,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.VehicleRegisterDate`,
            visible: true,
            disabled: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            label: "Vehicle Registration Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.SurveyType`,
            visible: true,
            disabled: true,
            type: "AutoComplete",
            label: "Survey Type",
            options: masters.SurveyType,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.ExcessApplicable`,
            visible: true,
            disabled: true,
            type: "Input",
            label: "Excess Applicable",
          },
          {
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            type: "Typography",
            variant: "h6",
            label: "ATL Basis",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.SettlementAmountOffered`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            disabled: true,
            type: "Input",
            label: "Settlement amount offered",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.OfferDate`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            disabled: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            label: "Date of offer",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.FinalSettlementAmountAccepted`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            disabled: true,
            type: "Input",
            label: "Final settlement amount accepted",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.AcceptanceDate`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            disabled: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            label: "Date of acceptance",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.FinalPayableAfterExcess`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            type: "Input",
            disabled: true,
            label: "Final payable after excess",
          },
        ],
        [
          // {
          //   value: masters.InvoiceDetails.InvoiceNumber,
          //   visible: true,
          //   disabled:
          //     masters.tabIndex !== 1 &&
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .LossAssessmentStage === "UnderRepair",
          //   type: "Input",
          //   label: "invoice Number",
          //   onChangeFuncs: ["IsAlphaNum"],
          // },
          // {
          //   value: masters.InvoiceDetails.InVoiceDate,
          //   visible: true,
          //   disabled:
          //     masters.tabIndex !== 1 &&
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .LossAssessmentStage === "UnderRepair",
          //   type: "MDDatePicker",
          //   label: "Invoice Date",
          //   maxDate: new Date(),
          //   altFormat: "d/m/Y",
          //   dateFormat: "Y-m-d",
          // },
          // {
          //   type: "Button",
          //   label: "Reset",
          //   visible: true,
          //   disabled:
          //     masters.tabIndex !== 1 &&
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .LossAssessmentStage === "UnderRepair",
          //   variant: "outlined",
          //   color: "secondary",
          //   spacing: 1,
          //   onClick: () =>
          //     setMasters({
          //       ...lMasters,
          //       InvoiceDetails: { SlNo: "", InvoiceNumber: "", InVoiceDate: "" },
          //     }),
          // },
          // {
          //   visible: true,
          //   type: "Button",
          //   label: "+ Add",
          //   variant: "outlined",
          //   color: "secondary",
          //   spacing: 1.2,
          //   disabled:
          //     lMasters.InvoiceDetails.InvoiceNumber === "" ||
          //     lMasters.InvoiceDetails.InVoiceDate === "" ||
          //     (masters.tabIndex !== 1 &&
          //       dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //         .LossAssessmentStage === "UnderRepair"),
          // },
          {
            visible: true,
            type: "DataGrid",
            spacing: 12,
            rowId: "SlNo",
            value:
              dto?.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
                ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.InvoiceDetails,
            columns: [
              {
                field: "SlNo",
                headerName: "Sl. No.",
                width: 80,
                headerAlign: "center",
                align: "center",
                renderCell: (index) => index.api.getRowIndex(index.row.SlNo) + 1,
              },
              {
                field: "InvoiceNumber",
                headerName: "Invoice Number",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "InVoiceDate",
                headerName: "Invoice Date",
                width: 150,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY") : "",
              },
              {
                field: "createdDateTime",
                headerName: "Created Date and Time",
                width: 200,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY hh:mm A") : "",
              },
              {
                field: "UserName",
                headerName: "User Name",
                width: 250,
                headerAlign: "center",
                align: "center",
              },
              // {
              //   field: "Action",
              //   headerName: "Action",
              //   headerAlign: "center",
              //   align: "center",
              //   hideable:
              //     masters.tabIndex !== 1 &&
              //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
              //       .AssessmentDetails[0].LossAssessmentStage === "UnderRepair",
              //   width: 80,
              //   renderCell: (params) => {
              //     const handleInvoiceDelete = (row) => {
              //       const ind = row.api.getRowIndex(row.row.SlNo);
              //       lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
              //         VDANode[masters.tabIndex]
              //       ].InvoiceDetails = lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
              //         VDANode[masters.tabIndex]
              //       ].InvoiceDetails.filter((obj, i) => i !== ind);
              //       const len =
              //         lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
              //           .AssessmentDetails[0][VDANode[masters.tabIndex]].InvoiceDetails.length;
              //       if (ind < len) {
              //         lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
              //           VDANode[masters.tabIndex]
              //         ].InvoiceDetails.forEach((s, i) => {
              //           if (i >= ind) {
              //             lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
              //               VDANode[masters.tabIndex]
              //             ].InvoiceDetails[i].SlNo -= 1;
              //           }
              //         });
              //       }
              //       setDto({ ...lDto });
              //     };
              //     return (
              //       <IconButton onClick={() => handleInvoiceDelete(params)}>
              //         <DeleteIcon />
              //       </IconButton>
              //     );
              //   },
              // },
            ],
          },
        ],
        [
          // {
          //   value: masters.EstimateDetails.EstimateNumber,
          //   visible: true,
          //   disabled:
          //     masters.tabIndex !== 1 &&
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .LossAssessmentStage === "UnderRepair",
          //   type: "Input",
          //   label: "Estimate Number",
          //   onChangeFuncs: ["IsAlphaNum"],
          //   customOnChange: (e, d) => handleEstimateDetails(e, d, "EstimateNumber"),
          // },
          // {
          //   value: masters.EstimateDetails.EstimateDate,
          //   visible: true,
          //   disabled:
          //     masters.tabIndex !== 1 &&
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .LossAssessmentStage === "UnderRepair",
          //   type: "MDDatePicker",
          //   label: "Estimate Date",
          //   maxDate: new Date(),
          //   altFormat: "d/m/Y",
          //   dateFormat: "Y-m-d",
          // },
          // {
          //   type: "Button",
          //   label: "Reset",
          //   variant: "outlined",
          //   color: "secondary",
          //   visible: true,
          //   disabled:
          //     masters.tabIndex !== 1 &&
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .LossAssessmentStage === "UnderRepair",
          //   spacing: 1,
          //   onClick: () =>
          //     setMasters({
          //       ...lMasters,
          //       EstimateDetails: { SlNo: "", EstimateNumber: "", EstimateDate: "" },
          //     }),
          // },
          // {
          //   visible: true,
          //   type: "Button",
          //   label: "+ Add",
          //   variant: "outlined",
          //   color: "secondary",
          //   spacing: 1.2,
          //   disabled:
          //     lMasters.EstimateDetails.EstimateNumber === "" ||
          //     lMasters.EstimateDetails.EstimateDate === "" ||
          //     (masters.tabIndex !== 1 &&
          //       dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //         .LossAssessmentStage === "UnderRepair"),
          // },
          {
            visible: true,
            type: "DataGrid",
            rowId: "SlNo",
            value:
              dto?.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
                ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.EstimateDetails,
            spacing: 12,
            columns: [
              {
                field: "SlNo",
                headerName: "Sl. No.",
                width: 80,
                headerAlign: "center",
                align: "center",
                renderCell: (index) => index.api.getRowIndex(index.row.SlNo) + 1,
              },
              {
                field: "EstimateNumber",
                headerName: "Estimate Number",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "EstimateDate",
                headerName: "Estimate Date",
                width: 150,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY") : "",
              },
              {
                field: "createdDateTime",
                headerName: "Created Date and Time",
                width: 200,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY hh:mm A") : "",
              },
              {
                field: "UserName",
                headerName: "User Name",
                width: 250,
                headerAlign: "center",
                align: "center",
              },
              // {
              //   field: "Action",
              //   headerName: "Action",
              //   headerAlign: "center",
              //   align: "center",
              //   width: 80,
              //   renderCell: (params) => {
              //     const handleEstimateDelete = (row) => {
              //       const ind = row.api.getRowIndex(row.row.SlNo);
              //       lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
              //         VDANode[masters.tabIndex]
              //       ].EstimateDetails = lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
              //         VDANode[masters.tabIndex]
              //       ].EstimateDetails.filter((obj, i) => i !== ind);
              //       const len =
              //         lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
              //           .AssessmentDetails[0][VDANode[masters.tabIndex]].EstimateDetails.length;
              //       if (ind < len) {
              //         lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
              //           VDANode[masters.tabIndex]
              //         ].EstimateDetails.forEach((s, i) => {
              //           if (i >= ind) {
              //             lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
              //               VDANode[masters.tabIndex]
              //             ].EstimateDetails[i].SlNo -= 1;
              //           }
              //         });
              //       }
              //       setDto({ ...lDto });
              //     };
              //     return (
              //       <IconButton onClick={() => handleEstimateDelete(params)}>
              //         <DeleteIcon />
              //       </IconButton>
              //     );
              //   },
              // },
            ],
          },
        ],
        [
          // {
          //   type: "Button",
          //   label: "Add Part",
          //   visible: true,
          //   color: "secondary",
          //   disabled:
          //     masters.tabIndex !== 1 &&
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .LossAssessmentStage === "UnderRepair",
          //   variant: "outlined",
          //   onClick: () => handleAddPart(),
          //   spacing: 2,
          // },
          // {
          //   type: "Button",
          //   label: "Download Template",
          //   visible: true,
          //   color: "secondary",
          //   disabled:
          //     masters.tabIndex !== 1 &&
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .LossAssessmentStage === "UnderRepair",
          //   variant: "outlined",
          //   onClick: (e) => handleExcelTemplate(e, "Parts"),
          //   spacing: 3,
          // },
          // {
          //   type: "Custom",
          //   spacing: 3,
          //   visible: true,
          //   return: (
          //     <Grid container>
          //       <Grid item>
          //         <label htmlFor="file-upload">
          //           <input
          //             id="file-upload"
          //             name="file-upload"
          //             type="file"
          //             // ref={fileInputRef}
          //             accept=".xlsx,.xls,.csv"
          //             style={{ display: "none" }}
          //             onChange={(e) => handleProfileChange(e, "Parts")}
          //             onClick={(e) => {
          //               e.target.value = "";
          //             }}
          //           />
          //           <MDButton
          //             variant="outlined"
          //             component="span"
          //             color="secondary"
          //             disabled={
          //               masters.tabIndex !== 1 &&
          //               dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
          //                 .AssessmentDetails[0].LossAssessmentStage === "UnderRepair"
          //             }
          //             // size="small"
          //             // startIcon={<FolderOpenIcon />}
          //           >
          //             Upload Excel
          //           </MDButton>
          //         </label>
          //       </Grid>
          //     </Grid>
          //   ),
          // },
          // {
          //   type: "Button",
          //   color: "secondary",
          //   label: "Clear All",
          //   visible: true,
          //   disabled:
          //     masters.tabIndex !== 1 &&
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .LossAssessmentStage === "UnderRepair",
          //   variant: "outlined",
          //   onClick: () => handleClearPartsPart(),
          //   spacing: 2,
          // },
          {
            type: "DataGrid",
            spacing: 12,
            value:
              lDto?.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
                ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.ScopeofRepair,
            columns: [
              // {
              //   field: "action",
              //   headerName: "Action",
              //   headerAlign: "center",
              //   align: "center",
              //   sortable: false,
              //   renderCell: (param) => (
              //     <IconButton onClick={(e) => handleDeletePartsRow(e, param)}>
              //       <DeleteIcon />
              //     </IconButton>
              //   ),
              // },
              {
                field: "id",
                headerName: "Sl No.",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
              },
              {
                field: "PartName",
                headerName: "Part Name",
                width: 200,
                headerAlign: "center",
                align: "center",
                // renderCell: (param) => (
                //   <MDInput
                //     // name="NumberofCattle"
                //     value={param.value}
                //     // onChange={(e) => handlePartName(e, param)}
                //     disabled={
                //       masters.tabIndex !== 1 &&
                //       dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                //         .AssessmentDetails[0].LossAssessmentStage === "UnderRepair"
                //     }
                //     // onBlur={(e) => handleDataGridRegVal(e, param.row.rowID - 1)}
                //     // error={flag.DataGridRegVal[param.row.rowID - 1].NumberofCattle === true}
                //     // helperText={
                //     //   flag.DataGridRegVal[param.row.rowID - 1].NumberofCattle
                //     //     ? "Accept only Numbers greater then Zero"
                //     //     : ""
                //     // }
                //   />
                // ),
              },
              {
                field: "ReplaceRepair",
                headerName: "Replace/Repair",
                width: 200,
                headerAlign: "center",
                align: "center",
                // renderCell: (param) => (
                //   <Autocomplete
                //     options={["Repair", "Replace"]}
                //     sx={{
                //       width: "100%",
                //       "& .MuiOutlinedInput-root": {
                //         padding: "4px!important",
                //       },
                //     }}
                //     onChange={(e, val) => handlePartReplaceRepair(e, val, param, "ReplaceRepair")}
                //     multiple={false}
                //     value={param.value}
                //     disabled={
                //       masters.tabIndex !== 1 &&
                //       dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                //         .AssessmentDetails[0].LossAssessmentStage === "UnderRepair"
                //     }
                //     // onChange={(e, value) => handleAutoComplete(e, value)}
                //     renderInput={(params) => <MDInput {...params} label="" />}
                //   />
                // ),
              },
              {
                field: "ReplaceWithNewPartUsedPart",
                headerName: "Replace With New Part/Used Part",
                width: 200,
                headerAlign: "center",
                align: "center",
                // renderCell: (param) => (
                //   <Autocomplete
                //     options={["Used Part", "New Part", "NA"]}
                //     sx={{
                //       width: "100%",
                //       "& .MuiOutlinedInput-root": {
                //         padding: "4px!important",
                //       },
                //     }}
                //     onChange={(e, val) =>
                //       handlePartReplaceRepair(e, val, param, "ReplaceWithNewPartUsedPart")
                //     }
                //     multiple={false}
                //     value={param.value}
                //     disabled={
                //       masters.tabIndex !== 1 &&
                //       dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                //         .AssessmentDetails[0].LossAssessmentStage === "UnderRepair"
                //     }
                //     // onChange={(e, value) => handleAutoComplete(e, value)}
                //     renderInput={(params) => <MDInput {...params} label="" />}
                //   />
                // ),
              },
              // {
              //   field: "PartPrice",
              //   headerName: "Part Price",
              //   width: 200,
              //   headerAlign: "center",
              //   align: "center",
              // },
              // {
              //   field: "Addon",
              //   headerName: "Addon",
              //   width: 200,
              //   headerAlign: "center",
              //   align: "center",
              // },
              // {
              //   field: "Depreceation",
              //   headerName: "Depreceation %",
              //   width: 200,
              //   headerAlign: "center",
              //   align: "center",
              // },
            ],
            rows: lDto.transactionDataDTO[0].transactionDetails?.SurveyorDetails[0]
              ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.ScopeofRepair
              ? lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                  .AssessmentDetails[0][VDANode[masters.tabIndex]].ScopeofRepair
              : [],
            // rows: [
            //   {
            //     // SlNo: "1",
            //     PartName: "Fuel Lid",
            //     ReplaceRepair: "Repair",
            //     ReplaceWithNewPartUsedPart: "New Part",
            //     PartPrice: "N/A",
            //     Addon: "N/A",
            //     Depreceation: "N/A",
            //   },
            // ],

            rowId: "id",
            visible: true,
          },
        ],
        [
          {
            path: "6",
            visible: true,
            type: "Typography",
            variant: "h6",
            label: "New Parts",
            spacing: 12,
          },
          {
            // path: `transactionDataDTO.0.transactionDetails.AssessmentSummary.PartandLabourAssessment.0.NewParts.Amount`,
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.Amount`,
            visible: true,
            type: "Input",
            required: true,
            disabled: true,
            label: "New Parts amount",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.Discountpercent`,
            visible: true,
            disabled: true,
            type: "Input",
            label: "Discount % on parts",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.AmountAfterDiscount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "New Parts amount after discount",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.DepreciationPerc`,
            visible: true,
            disabled: true,
            type: "Input",
            label: "Depreciation %",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.DepreciationAmount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Depreciation Amount on New Parts",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.NetAmount`,
            visible: true,
            disabled: true,
            type: "Input",
            label: "Net New Parts amount",
          },
          {
            path: "6",
            visible: true,
            type: "Typography",
            label: "Used Parts",
            variant: "h6",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.UsedParts.Amount`,
            visible: true,
            disabled: true,
            type: "Input",
            required: true,
            label: "Used Parts amount",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.UsedParts.DiscountPercent`,
            visible: true,
            disabled: true,
            type: "Input",
            label: "Discount % on Parts",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.UsedParts.AmountAfterDiscount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Used Parts amount after discount",
          },
          {
            path: "6",
            visible: true,
            type: "Typography",
            variant: "h6",
            label: "Labour",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.Labour.Amount`,
            visible: true,
            disabled: true,
            type: "Input",
            required: true,
            label: "Labour amount",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.Labour.DiscountPercent`,
            visible: true,
            disabled: true,
            type: "Input",
            label: "Discount % on Labour",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.Labour.AmountAfterDiscount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Labour amount after discount",
          },
          {
            path: "6",
            visible: true,
            type: "Typography",
            variant: "h6",
            label: "Summary",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.totalPartsamount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Total Parts Amount",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.TotalRepairCostBeforeVAT`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Total Repair Cost before VAT",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.VATPercentage`,
            visible: true,
            disabled: true,
            type: "AutoComplete",
            options: masters.VAT,
            label: "VAT %",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.VATAmount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "VAT amount",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.TotalRepairCostInclusiveOfVAT`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Total Repair cost inclusive of VAT",
          },
          // {
          //   path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.FinalPayableAfterExcess`,
          //   visible:
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .TypeOfLoss !== "Repair Loss",
          //   type: "Input",
          //   disabled: true,
          //   label: "Final payable after excess",
          //   onChangeFuncs: ["IsNumeric"],
          // },
          {
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            type: "Typography",
            variant: "h6",
            label: "Cash Loss Basis",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.SettlementAmountOffered`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            disabled: true,
            type: "Input",
            label: "Settlement amount offered",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.OfferDate`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            disabled: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            label: "Date of offer",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.FinalSettlementAmountAccepted`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            disabled: true,
            type: "Input",
            label: "Final settlement amount accepted",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.AcceptanceDate`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            disabled: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            label: "Date of acceptance",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.FinalPayableAfterExcess`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            type: "Input",
            disabled: true,
            label: "Final payable after excess",
          },
        ],
        [
          {
            visible: true,
            type: "DataGrid",
            rowId: "Observation",
            value:
              dto?.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
                ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.Observations,
            spacing: 12,
            columns: [
              {
                field: "UserName",
                headerName: "User Name",
                width: 250,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Observation",
                headerName: "Observations",
                width: 500,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "DateandTime",
                headerName: "Date and Time",
                width: 200,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY hh:mm A") : "",
              },
            ],
          },
          // {
          //   type: "Input",
          //   label: "Add Observation",
          //   name: "Notes",
          //   value: masters.Observations.Observation,
          //   visible: true,
          //   disabled:
          //     true,
          //   spacing: 12,
          //   // customOnChange: (e) => handleObsrevations(e),
          // },
          // {
          //   type: "Button",
          //   label: "Clear",
          //   visible: true,
          //   variant: "outlined",
          //   color: "secondary",
          //   disabled:
          //     true,
          //   spacing: 11,
          //   onClick: () =>
          //     setMasters({
          //       ...lMasters,
          //       Observations: { Observation: "" },
          //     }),
          // },
          // {
          //   type: "Button",
          //   label: "Save",
          //   visible: true,
          //   spacing: 1,
          //   disabled:
          //     lMasters.Observations.Observation === "" ||
          //     (masters.tabIndex !== 1 &&
          //       dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //         .LossAssessmentStage === "UnderRepair"),
          //   onClick: () => handleAddObservations(),
          // },
        ],
        [
          {
            type: "AutoComplete",
            label: "Send LPO",
            visible: true,
            disabled: true,
            name: "claimType",
            value: "",
            InputProps: { focused: true },
            options: [],
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 9,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Input",
            label: "Email to",
            name: "hospitalName",
            disabled: true,
            // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
            visible: true,
            path: "hospitalDetails",
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Input",
            label: "CC",
            name: "hospitalName",
            // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
            visible: true,
            disabled: true,
            path: "hospitalDetails",
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Input",
            label: "Remark",
            name: "hospitalName",
            disabled: true,
            // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
            visible: true,
            path: "hospitalDetails",
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "click submit button on the main page to trigger mail",
            name: "hospitalName",
            // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
            visible: true,
            path: "hospitalDetails",
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          // {
          //   type: "Button",
          //   label: "Save",
          //   color: "secondary",
          //   // name: "claimNo",
          //   // value: ClaimsJson.claimNumber,
          //   visible: true,
          //   variant: "outlined",
          //   // onChangeFuncs: [IsNumeric],
          //   // parameters: [5],
          //   InputProps: { readOnly: true },
          //   // path: "",
          //   spacing: 8.5,
          // },
          // {
          //   type: "Button",
          //   label: "Print & Preview",
          //   color: "secondary",
          //   // name: "claimNo",
          //   // value: ClaimsJson.claimNumber,
          //   visible: true,
          //   variant: "outlined",
          //   // onChangeFuncs: [IsNumeric],
          //   // parameters: [5],
          //   InputProps: { readOnly: true },
          //   // path: "",
          //   spacing: 2.3,
          // },
          // {
          //   type: "Button",
          //   label: "Submit",
          //   // name: "claimNo",
          //   // value: ClaimsJson.claimNumber,
          //   visible: true,
          //   // variant: "outlined",
          //   // onChangeFuncs: [IsNumeric],
          //   // parameters: [5],
          //   InputProps: { readOnly: true },
          //   // path: "",
          //   spacing: 1.2,
          //   onClick: handleVDASubmit,
          // },
        ],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "UserName",
                headerName: "User Name",
                width: 200,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "DateAndTime",
                headerName: "Date & Time",
                width: 200,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "MainStatus",
                headerName: "Main Status",
                width: 200,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "SubStats",
                headerName: "Sub Stats",
                width: 200,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Amount",
                headerName: "Amount",
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Remarks",
                headerName: "Remarks",
                width: 600,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
            ],
            rowId: "UserName",
            value: [
              {
                UserName: "Ameer",
                DateAndTime: "01/01/2014",
                MainStatus: "Initial Techinical Approval Under Process",
                SubStats: "Claims Handler Appointed",
                Amount: "6522 OMR",
                Remarks: "Workshop Appointed KALAYANI MOTORS PVT LTD.",
              },
            ],
          },
        ],
      ];
      break;

    default:
      data = [];
      break;
  }

  return data;
};

const getPolicyDto = async ({ genericInfo }) => {
  console.log("Generic Info after navigating from the claim search page is", genericInfo);
  let dto = {};
  const res = await getClaimDetails(genericInfo.HistoryclaimNo, true, genericInfo.HistorytranNo);
  if (res.status === 200) {
    const [firstResult] = res.data.finalResult;
    dto = firstResult;
  } else {
    Swal.fire({
      icon: "error",
      title: "Something went wrong !",
    });
  }
  return dto;
};

const getMasters = async ({ dto }) => {
  const masters = {
    VAT: [{ mValue: "0" }, { mValue: "5" }],
    SurveyType: [
      { mValue: "LVS" },
      { mValue: "Fastrack" },
      { mValue: "Desktop" },
      { mValue: "Physical" },
    ],
    tabIndex: -1,
    InvoiceDetails: {
      SlNo: "",
      InvoiceNumber: "",
      InVoiceDate: "",
      createdDateTime: "",
      UserName: "",
    },
    EstimateDetails: {
      SlNo: "",
      EstimateNumber: "",
      EstimateDate: "",
      createdDateTime: "",
      UserName: "",
    },
    Observations: {
      UserName: "",
      Observation: "",
      DateandTime: "",
    },
    DrawerOpen: false,

    // -----------------------

    CreateNoteflg: false,
    Notes: "",
    CommonMasters: [],
    DocTabId: "Claim Document",
    ClaimHandlerObj: {
      Status: "",
      SlNo: "",
      ClaimHandlerID: "",
      ClaimHandlerName: "",
      ClaimHandlerNo: "",
      Location: "",
      SurveyType: "",
      AssignedDateandTime: "",
    },
    ReqDocumentsList: [],
    isUploadEnabled: false,
  };

  const request = {
    Reportname: "TakafulOman_ClaimHistory",
    paramList: [
      {
        ParameterName: "ChassisNumber",
        ParameterValue: "2222",
      },
    ],
  };
  const data = await GetPayLoadByQueryDynamic(request);
  masters.ClaimHistory = data.data.finalResult;
  console.log("claimhistory", masters.ClaimHistory);

  // ---------------------------------

  const masterRes = await GetProdPartnermasterData(1228, "", "CommonMaster", {});
  if (masterRes.status === 200) {
    masters.CommonMasters = masterRes.data;
  }
  // if (dto?.transactionDataDTO?.[0]?.transactionNumber) {
  const TypeCode1 = dto.transactionDataDTO[0].transactionNumber.substr(0, 2);
  const DocMastersRes = await GetProdPartnermasterData(1228, "", "Documents", {
    MasterType: "Documents",
    TypeCode: TypeCode1,
  });
  if (DocMastersRes.status === 200) {
    masters.ReqDocumentsList = DocMastersRes.data;
  }

  // }
  return masters;
};

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
