import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Autocomplete,
  Modal,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
import swal from "sweetalert";
import CircularProgress from "@mui/material/CircularProgress";
// import Dropzone from "react-dropzone-uploader";
import { useDataController, setTravelClaimJson } from "modules/BrokerPortal/context";
import TravelClaimJsonData from "../data/JsonData";
import {
  GetPolicyBenefitList,
  GetMasterData,
  CheckDuplicateClaimNumber,
  GetTpaData,
  SaveClaimDataDetails,
  GetCountryMaster,
  GetProductJson,
  GetPolicyInfoByPolicyNumber,
  SaveClaimHistory,
  SeachClaimTransactions,
  Documentupload,
} from "../data/index";
import MDDropzone from "../../../../../components/MDDropzone";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())]
    .join("-")
    .concat(
      "T",
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
}

function ClaimIntimation() {
  const [controller, dispatch] = useDataController();
  const { TravelClaimJson } = controller;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [TravelClaimIntimation, setTravelClaimIntimation] = useState();
  const [timer, setTimer] = useState(false);
  const [PolicyNumber, setPolicyNumber] = useState("");

  const [PolicyDetails, setPolicyDetails] = useState("");
  const [PolicyDetailsStatus, setPolicyDetailsStatus] = useState(false);
  const [ProductJson, setProductJson] = useState("");
  const [MemberTableDetails, setMemberTableDetails] = useState([]);

  const TPAcode = { TpaCode: "TPA001" };
  const [TPADetails, setTPADetails] = useState([]);

  const [masterClaimCategory, setMasterClaimCategory] = useState([]); // Re Cashless
  const [ClaimCategoryValue, setClaimCategoryValue] = useState("");

  const [masterCauseOfLoss, setMasterCauseOfLoss] = useState([]); // Medical Non-Medical
  const [CauseOfLossValue, setCauseOfLossValue] = useState("");

  const [masterClaimSubtype, setMasterClaimSubtype] = useState([]);
  const [ClaimSubtypeValue, setClaimSubtypeValue] = useState("");

  const [ClaimSubtype, setClaimSubtype] = useState([]); // filtered claim subtype based on medical and nonMedical

  const [MasterMedical, setMasterMedical] = useState([]);
  const [MasterNonMedical, setMasterNonMedical] = useState([]);

  const [masterCountry, setMasterCountry] = useState([]); // All country list
  const [CountryValue, setCountryValue] = useState("");

  const [masterDocumentName, setMasterDocumentName] = useState("");

  const [WorkItemType, setWorkItemType] = useState({ MemberID: "", Type: "" });

  const [ClaimRows, setClaimRows] = useState([]); // Claim Rows for DataGrid
  const [ClaimData, setClaimData] = useState([]); // All Claims of given Policy Number
  const [SelectedClaim, setSelectedClaim] = useState({}); // Selected Claim data
  const [ClaimTransaction, setClaimTransaction] = useState([]); // All Transactions of selected Claim
  const [BodyFlag, setBodyFlag] = useState(false);
  const [TransFlag, setTransFlag] = useState(false);
  const [ClaimLoadFlag, setClaimLoadFlag] = useState(false);

  const onAutoTypeClick = async ({ newValue }) => {
    const SearchObj = { memberId: WorkItemType.MemberID };
    setWorkItemType((prev) => ({ ...prev, Type: newValue }));
    if (newValue === "ExistingClaim") {
      setClaimLoadFlag(true);
      const data = await SeachClaimTransactions({ SearchObj });
      console.log(data);
      const arr = [];
      setClaimData(data);
      data.forEach((row) => {
        arr.push({
          ClaimNo: row.claimNumber,
          TravelStartDate: row.basicDetails.claimDetails.travelStartDate,
          TravelEndDate: row.basicDetails.claimDetails.travelEndDate,
          ClaimStatus: "",
        });
        setClaimRows([...arr]);
      });
      setClaimLoadFlag(false);
    }

    if (newValue === "FreshClaim") setBodyFlag(true);
  };

  const Tablecolumns = [
    {
      field: "MemberID",
      headerName: "Member ID",
      width: 250,
      type: "number",
    },

    {
      field: "Name",
      headerName: "Member Name",

      width: 250,
    },

    {
      field: "workItemType",
      headerName: "Work Item Type",
      editable: true,
      width: 250,
      // renderCell: () => <WorkType setWorkItemType={setWorkItemType} />,
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={["FreshClaim", "ExistingClaim"]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          onChange={(e, newValue) => onAutoTypeClick({ e, newValue })}
          renderInput={(params) => <MDInput {...params} label="select type" />}
        />
      ),
    },
  ];

  const TransactionTablecolumns = [
    {
      field: "transactionNumber",
      headerName: "Transaction No",
      width: 250,
    },

    {
      field: "claimStatus",
      headerName: "Claim Status",
      width: 250,
    },

    {
      field: "status",
      headerName: "Transaction Status",
      width: 250,
    },
  ];

  const ClaimTableColumns = [
    {
      field: "ClaimNo",
      headerName: "Claim No",
      width: 250,
    },

    {
      field: "TravelStartDate",
      headerName: "Travel Start Date",
      width: 250,
    },

    {
      field: "TravelEndDate",
      headerName: "Travel End Date",
      width: 250,
    },
    {
      field: "ClaimStatus",
      headerName: "Claim Status",
      width: 250,
    },
  ];

  useEffect(() => {
    setTravelClaimJson(dispatch, { ...TravelClaimJsonData });
  }, []);

  useEffect(() => {
    setTravelClaimIntimation({ ...TravelClaimJson });
  }, [TravelClaimJson]);

  useEffect(() => {
    if (TransFlag) {
      masterClaimCategory.forEach((row) => {
        if (
          row.mID.toString() ===
          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.claimCategory
        )
          setClaimCategoryValue(row.mValue);
      });
      masterCauseOfLoss.forEach((row) => {
        if (
          row.mID.toString() ===
          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss
        )
          setCauseOfLossValue(row.mValue);
      });
      masterClaimSubtype.forEach((row) => {
        if (
          row.BenefitID.toString() ===
          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss
        )
          setClaimSubtypeValue(row.Benefit);
      });
      masterCountry.forEach((row) => {
        if (
          row.mID.toString() ===
          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.country
        )
          setCountryValue(row.mValue);
      });
    }
  }, [TransFlag]);

  const onGetMasterData = async () => {
    const Data = await GetMasterData();
    let geography = "";
    if (Data.length > 0) {
      Data.forEach((item) => {
        if (item.mType === "Travel Cause Of Loss") {
          setMasterCauseOfLoss(item.mdata);
        }
        if (item.mType === "Travel Claim Category") {
          setMasterClaimCategory(item.mdata);
        }
        if (item.mType === "Document Name") {
          setMasterDocumentName(item.mdata);
        }
        if (item.mType === "Medical") {
          setMasterMedical(item.mdata);
        }
        if (item.mType === "Non-Medical") {
          setMasterNonMedical(item.mdata);
        }
        if (PolicyDetails.Geography === "APAC") {
          geography = "APAC";
        } else if (PolicyDetails.Geography === "WW" || PolicyDetails.Geography === "WWIC") {
          geography = "Worldwide";
        } else if (PolicyDetails.Geography === "WWX" || PolicyDetails.Geography === "WWEU") {
          geography = "Worldwide Excluding US/Canada";
        } else if (PolicyDetails.Geography === "DOM") {
          geography = "Domestic";
        } else if (PolicyDetails.Geography === "APAC_DOM") {
          geography = "APAC With Domestic";
        } else if (PolicyDetails.Geography === "WW_DOM") {
          geography = "Worldwide incl USA/Canada With Domestic";
        } else if (PolicyDetails.Geography === "WWX_DOM") {
          geography = "Worldwide excl USA/Canada With Domestic";
        }
        if (item.mType === geography) {
          setMasterCountry(item.mdata);
        }
      });
    }
  };

  useEffect(() => {
    console.log("master", MasterNonMedical);
    console.log("master1", MasterMedical);
    console.log("country", masterCountry);
  }, [MasterMedical, MasterNonMedical, masterCountry]);

  const onGetCountryMaster = async () => {
    const Data = await GetCountryMaster();

    console.log("GetCountryMaster", Data);
  };

  const TPAData = async () => {
    const Data = await GetTpaData({ TPAcode });
    setTPADetails(Data);
    const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    filteredData1.transactionDetailsDto.tpaDetails.contactNo = Data[0].tpadetails.ContactNumber;
    filteredData1.transactionDetailsDto.tpaDetails.email = Data[0].tpadetails.EmailId;
    filteredData1.transactionDetailsDto.tpaDetails.name = Data[0].tpadetails.TpaName;
    filteredData1.transactionDetailsDto.tpaDetails.nameOfCAOCEO = Data[0].tpadetails.NameOfCEO;
    filteredData1.transactionDetailsDto.tpaDetails.registrationNo =
      Data[0].tpadetails.RegistrationNumber;
    TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData1 });
    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    });
  };
  const GetClaimSubType = async () => {
    const Data = await GetPolicyBenefitList({ PolicyNumber });
    if (Data.status === 200 || Data.status === 1) {
      setMasterClaimSubtype(Data.finalResult.sectionMappingDetails.BenefitDetails);
    }
  };
  useEffect(() => {
    console.log("benMas", masterClaimSubtype);
  }, [masterClaimSubtype]);
  // console.log("masterClaimSubtype", masterClaimSubtype);
  const onHandelMemberDetails = async (ids) => {
    setWorkItemType({ ...WorkItemType, MemberID: ids.row.MemberID });

    console.log("idssss", ids);
    setTravelClaimIntimation({ ...TravelClaimIntimation });

    const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };

    filteredData.transactionDetailsDto.claimantContactName = PolicyDetails.ProposerDetails.Name;
    filteredData.transactionDetailsDto.claimantContactNo = PolicyDetails.ProposerDetails.ContactNo;
    filteredData.transactionDetailsDto.claimantEmail = PolicyDetails.ProposerDetails.EmailId;
    TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    });
    const psd = new Date(PolicyDetails.PolicyStartDate);
    const ped = new Date(PolicyDetails.PolicyEndDate);
    const ndob = new Date(PolicyDetails.NomineeDetails[0].NomineeDOB);
    const tsd = new Date(PolicyDetails.TripStartDate);
    const ted = new Date(PolicyDetails.TripEndDate);
    // const pid = new Date(PolicyDetails.createdDate);
    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      policyNo: PolicyNumber,
      basicDetails: {
        ...TravelClaimIntimation.basicDetails,
        productCode: PolicyDetails.ProductCode,
        policyInceptionDate: PolicyDetails.Date, // [pid.getFullYear(), pid.getMonth() + 1, pid.getDate()].join("-"),
        policyDetails: {
          ...TravelClaimIntimation.basicDetails.policyDetails,
          policyNumber: PolicyDetails.PolicyNumber,
          policyStartDate: [psd.getDate(), psd.getMonth() + 1, psd.getFullYear()].join("/"),
          policyEndDate: [ped.getDate(), ped.getMonth() + 1, ped.getFullYear()].join("/"),
          tripType: PolicyDetails.TripType,
          geography: PolicyDetails.Geography,
        },
        claimDetails: {
          ...TravelClaimIntimation.basicDetails.claimDetails,
          travelStartDate: [tsd.getDate(), tsd.getMonth() + 1, tsd.getFullYear()].join("/"),
          travelEndDate: [ted.getDate(), ted.getMonth() + 1, ted.getFullYear()].join("/"),
        },
        nomineeDetails: {
          ...TravelClaimIntimation.basicDetails.nomineeDetails,
          nomineeDOB: [ndob.getDate(), ndob.getMonth() + 1, ndob.getFullYear()].join("/"),
          nomineeName: PolicyDetails.NomineeDetails[0].AppointeeName,
          relationWithInsured: PolicyDetails.NomineeDetails[0].NomineeRelationWithProposer,
          address1: PolicyDetails.NomineeDetails[0].NomineeAddressLine1,
          address2: PolicyDetails.NomineeDetails[0].NomineeAddressLine2,
          address3: PolicyDetails.NomineeDetails[0].NomineeAddressLine3,
          nomineeCity: PolicyDetails.NomineeDetails[0].NomineeCity,
          nomineeEmailID: PolicyDetails.NomineeDetails[0].NomineeEmailID,
          nomineeMobile: PolicyDetails.NomineeDetails[0].NomineeMobile,
          nomineePincode: PolicyDetails.NomineeDetails[0].NomineePincode,
          nomineeState: PolicyDetails.NomineeDetails[0].NomineeState,
        },
        memberDetails: {
          ...TravelClaimIntimation.basicDetails.memberDetails,
          memberId: ids.row.MemberID,
          insuredName: ids.row.Name,
          gender: ids.row.Gender,
          insuredAge: ids.row.Age,
          patientRelationship: ids.row.RelationWithInsured,
        },
      },
    });
  };

  const onClaimSelect = (ids) => {
    ClaimData.forEach((item) => {
      if (item.claimNumber === ids.row.ClaimNo) {
        setSelectedClaim(item);
        setClaimTransaction(item.claimTransactionDTO);
        setTravelClaimIntimation({
          ...TravelClaimIntimation,
          ClaimNumber: ids.row.ClaimNo,
          basicDetails: {
            ...TravelClaimIntimation.basicDetails,
            claimId: item.basicDetails.claimId,
          },
        });
      }
    });
    setBodyFlag(true);
    console.log("qweqwe", SelectedClaim);
  };

  const onTransactionSelect = async (ids) => {
    console.log(ids);
    setTravelClaimIntimation({ ...TravelClaimIntimation, claimTransactionDTO: [{ ...ids.row }] });
    if (ids.row.transactionDetailsDto.isTpa === true) {
      const Data = await GetTpaData({ TPAcode });
      setTPADetails(Data);
    }
    setTransFlag(true);
    handleClose(false);
  };

  const onHandelHospitalDetails = (e) => {
    if (TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss === "46") {
      const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
      filteredData.transactionDetailsDto.hospitalDetails[e.target.name] = e.target.value;
      TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
      setTravelClaimIntimation({
        ...TravelClaimIntimation,
        claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
      });
    }
  };

  const onHandelDateHospitalDetails = (e, date) => {
    if (TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss === "46") {
      const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
      filteredData.transactionDetailsDto.hospitalDetails.hospitalInvoiceDate = date;
      TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
      setTravelClaimIntimation({
        ...TravelClaimIntimation,
        claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
      });
    }
  };

  const onHandelDOADOLdate = (e, date) => {
    // if (TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss === "46") {

    const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    console.log("Entered", filteredData);
    filteredData.transactionDetailsDto.doaDol = date;
    TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    });
    // }
  };

  const onHandelDODdate = (e, date) => {
    const doaDol = new Date(
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDol
    );
    const dod = new Date(date);
    const diffTime = dod.getTime() - doaDol.getTime();
    const noOfDays = diffTime / (1000 * 3600 * 24);

    if (TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss === "46") {
      const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
      filteredData.transactionDetailsDto.dod = date;
      filteredData.transactionDetailsDto.noOfDays = noOfDays;
      TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
      setTravelClaimIntimation({
        ...TravelClaimIntimation,
        claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
      });
    }
  };

  const onHandelCauseOfLoss = (e, newValue) => {
    setCauseOfLossValue(newValue.mValue);
    const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    filteredData.transactionDetailsDto.causeOfLoss = newValue.mID.toString();
    TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });

    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    });

    if (TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss === "47") {
      const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
      filteredData1.transactionDetailsDto.hospitalDetails.contactNo = "";
      filteredData1.transactionDetailsDto.hospitalDetails.emailId = "";
      filteredData1.transactionDetailsDto.hospitalDetails.faxNo = "";
      filteredData1.transactionDetailsDto.hospitalDetails.hospitalAddress = "";
      filteredData1.transactionDetailsDto.hospitalDetails.hospitalCountry = "";
      filteredData1.transactionDetailsDto.hospitalDetails.hospitalDistrict = "";
      filteredData1.transactionDetailsDto.hospitalDetails.hospitalInvoiceDate = "";
      filteredData1.transactionDetailsDto.hospitalDetails.hospitalName = "";
      filteredData1.transactionDetailsDto.hospitalDetails.hospitalState = "";
      filteredData1.transactionDetailsDto.hospitalDetails.isNetwork = "";
      filteredData1.transactionDetailsDto.hospitalDetails.pincode = "";
      TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
      setTravelClaimIntimation({
        ...TravelClaimIntimation,
        claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
      });
    }

    if (newValue.mID.toString() === "46") {
      const arr = masterClaimSubtype.filter((item) =>
        MasterMedical.some((element) => item.TypeCode === element.mValue)
      );
      setClaimSubtype(arr);
    }
    if (newValue.mID.toString() === "47") {
      const arr = masterClaimSubtype.filter((item) =>
        MasterNonMedical.some((element) => item.TypeCode === element.mValue)
      );
      setClaimSubtype(arr);
    }
  };

  const onHandelClaimDetails = (e) => {
    const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    filteredData.transactionDetailsDto[e.target.name] = e.target.value;
    TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    });
    if (TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.isTpa === "true") {
      TPAData();
    } else {
      const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
      filteredData1.transactionDetailsDto.tpaDetails.contactNo = "";
      filteredData1.transactionDetailsDto.tpaDetails.email = "";
      filteredData1.transactionDetailsDto.tpaDetails.name = "";
      filteredData1.transactionDetailsDto.tpaDetails.nameOfCAOCEO = "";
      filteredData1.transactionDetailsDto.tpaDetails.registrationNo = "";
      TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData1 });
      setTravelClaimIntimation({
        ...TravelClaimIntimation,
        claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
      });
    }
  };

  const onSave = async () => {
    if (WorkItemType.Type === "FreshClaim") {
      const date = formatDate(new Date());

      TravelClaimIntimation.createdDate = date;
      setTravelClaimIntimation(TravelClaimIntimation);

      const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
      filteredData1.createdDateTime = date;
      filteredData1.statusId = 81;
      TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData1 });

      setTravelClaimIntimation({
        ...TravelClaimIntimation,
        claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
      });
    }

    if (WorkItemType.Type === "ExistingClaim") {
      if (TransFlag) {
        const date = formatDate(new Date());
        const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
        filteredData1.modifiedDateTime = date;
        TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData1 });
        setTravelClaimIntimation({
          ...TravelClaimIntimation,
          claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
        });
      } else {
        const date = formatDate(new Date());
        const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
        filteredData1.createdDateTime = date;
        TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData1 });
        setTravelClaimIntimation({
          ...TravelClaimIntimation,
          claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
        });
      }
    }
    console.log("onSave final", TravelClaimIntimation);
    const Data = await SaveClaimDataDetails({ TravelClaimIntimation });

    console.log("onSave Response", Data);

    const transactionNumber = { TransactionNumber: Data.claimTransactionDTO[0].transactionNumber };
    await SaveClaimHistory({ transactionNumber });

    swal({
      html: true,
      icon: "success",
      title: "Claim Intimated Successful",
      text: `Claim Number ${Data.claimNumber}\n Transaction Number ${Data.claimTransactionDTO[0].transactionNumber}`,
    });
  };

  const onHandelClaimDetails1 = (e, newValue) => {
    if (e.target.id.split("-")[0] === "claimCategory") setClaimCategoryValue(newValue.mValue);
    if (e.target.id.split("-")[0] === "country") setCountryValue(newValue.mValue);
    const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    filteredData.transactionDetailsDto[e.target.id.split("-")[0]] = newValue.mID;
    TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    });
  };
  const onHandelClaimSubType = async (e, newValue) => {
    const memberId = WorkItemType.MemberID;
    console.log(memberId);
    const currDate = formatDate(new Date());
    console.log(currDate);
    const benefitNo = newValue.BenefitID.toString();
    console.log(benefitNo);

    const rr = await CheckDuplicateClaimNumber({ memberId, currDate, benefitNo });
    console.log("rr", rr);
    setClaimSubtypeValue(newValue.Benefit);
    console.log("newVAlueee", newValue);
    const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    filteredData.transactionDetailsDto.typeOfLoss = newValue.BenefitID;
    TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    });
  };

  console.log("TravelClaimIntimation1111111", TravelClaimIntimation);

  const GetPolicyDetails = async () => {
    if (PolicyNumber === "") {
      swal({ html: true, icon: "error", text: " Enter Policy Number" });
    } else {
      setBodyFlag(false);
      setWorkItemType({ MemberID: "", Type: "" });
      setTimer(true);

      // const Data1 = await GetPolicyDetailsByNumber({ PolicyNumber });
      // if (Data1.responseMessage === "Policy not found") {
      //   setPolicyDetailsStatus("Policy not found");
      //   swal({
      //     html: true,
      //     icon: "error",
      //     text: " Policy Number",
      //   });
      // }

      const Data2 = await GetPolicyInfoByPolicyNumber(PolicyNumber);

      if (Data2.policy_details.length !== 0) {
        setPolicyDetails(Data2.policy_details[0].policyRequest);
        setMemberTableDetails(Data2.policy_details[0].policyRequest.InsurableItem[0].RiskItems);
        setPolicyDetailsStatus(true);
        setTimer(false);
      } else {
        setTimer(false);
        swal({
          html: true,
          icon: "error",
          text: "Invalid Policy Number",
        });
        setPolicyDetailsStatus(false);
      }

      await GetClaimSubType();

      const Data3 = await GetProductJson(Data2.policy_details[0].policyRequest.ProductCode);
      setProductJson(Data3);
      console.log(ProductJson);

      await onGetCountryMaster();
    }
  };

  useEffect(() => {
    onGetMasterData();
  }, [PolicyDetails]);

  const editExistingClaim = () => {
    handleOpen();
  };

  const getDataaa = async (file, done, data) => {
    const binary = file;
    console.log("binary", binary);
    await Documentupload({ binary });
    console.log(1111, file);
    console.log(222222, done);
    console.log(33333, data);
  };

  return (
    <MDBox sx={{ width: "100%" }}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Claim Intimation
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Policy Number"
                name="PolicyNumber"
                value={PolicyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={GetPolicyDetails}>SEARCH</MDButton>
            </Grid>

            {timer ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </MDBox>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      {PolicyDetailsStatus && (
        <>
          {WorkItemType.Type === "FreshClaim" || WorkItemType.Type === "ExistingClaim" ? (
            ""
          ) : (
            <Accordion
              defaultExpanded
              disableGutters
              sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
            >
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDBox sx={{ width: "100%" }}>
                      <DataGrid
                        autoHeight
                        rows={MemberTableDetails}
                        columns={Tablecolumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        components={{ Toolbar: GridToolbar }}
                        editField="inEdit"
                        getRowId={(row) => row.MemberID}
                        onRowClick={(ids) => onHandelMemberDetails(ids)}
                        // (ids) => setWorkItemType((prev) => ({ ...prev, MemberID: ids.id }))
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {WorkItemType.Type === "ExistingClaim" && !BodyFlag && (
            <Accordion
              defaultExpanded
              disableGutters
              sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
            >
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDBox sx={{ width: "100%" }}>
                      <DataGrid
                        autoHeight
                        rows={ClaimRows}
                        columns={ClaimTableColumns}
                        loading={ClaimLoadFlag}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        components={{ Toolbar: GridToolbar }}
                        editField="inEdit"
                        getRowId={(row) => row.ClaimNo}
                        onRowClick={(ids) => onClaimSelect(ids)}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {BodyFlag && (
            <>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="body1" color="primary">
                    Policy Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled
                        label="Policy Number"
                        name="PolicyNumber"
                        value={PolicyDetails.PolicyNumber}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled
                        label="Policy Start Date "
                        name="PolicyStartDate"
                        value={PolicyDetails.PolicyStartDate}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled
                        label="Policy End Date"
                        name="PolicyEndDate"
                        value={PolicyDetails.PolicyEndDate}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled
                        label="Trip Type"
                        name="TripType"
                        value={PolicyDetails.TripType}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled
                        label="Geography"
                        name="Geography"
                        value={PolicyDetails.Geography}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Modal open={open}>
                <MDBox sx={{ bgcolor: "background.paper" }} m={5}>
                  <MDButton onClick={handleClose}>X</MDButton>
                  <DataGrid
                    autoHeight
                    rows={ClaimTransaction}
                    columns={TransactionTablecolumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    editField="inEdit"
                    getRowId={(row) => row.transactionNumber}
                    onRowClick={(ids) => onTransactionSelect(ids)}
                    // (ids) => setWorkItemType((prev) => ({ ...prev, MemberID: ids.id }))
                  />
                </MDBox>
              </Modal>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="body1" color="primary">
                    Claim Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {WorkItemType.Type === "ExistingClaim" && (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                          <MDButton onClick={editExistingClaim}>EDIT EXISTING CLAIM</MDButton>
                        </MDBox>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        disabled={TransFlag}
                        options={masterClaimCategory}
                        value={{ mValue: ClaimCategoryValue }}
                        getOptionLabel={(option) => option.mValue}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        id="claimCategory"
                        onChange={(e, newValue) => onHandelClaimDetails1(e, newValue)}
                        renderInput={(params) => <MDInput {...params} label="Claim Category" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <MDTypography variant="body2" ml={1}>
                          TPA Intimation
                        </MDTypography>
                        <RadioGroup
                          // defaultValue="false"
                          row
                          name="isTpa"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.isTpa
                          }
                          onChange={(e) => onHandelClaimDetails(e)}
                        >
                          <FormControlLabel
                            disabled={TransFlag}
                            value="true"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            disabled={TransFlag}
                            value="false"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Policy Start Date "
                        name="PolicyStartDate"
                        value={PolicyDetails.PolicyStartDate}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Policy End Date"
                        name="PolicyEndDate"
                        value={PolicyDetails.PolicyEndDate}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        disabled={TransFlag}
                        options={masterCauseOfLoss}
                        value={{
                          mValue: CauseOfLossValue,
                        }}
                        getOptionLabel={(option) => option.mValue}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        onChange={(e, newValue) => onHandelCauseOfLoss(e, newValue)}
                        // value={TravelClaim.CauseOfLoss}
                        renderInput={(params) => (
                          <MDInput {...params} label="Select Cause Of Loss" />
                        )}
                      />
                    </Grid>
                    {TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                      .causeOfLoss === "46" ||
                    TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                      .causeOfLoss === "47" ? (
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          disabled={TransFlag}
                          options={ClaimSubtype}
                          value={{
                            Benefit: ClaimSubtypeValue,
                          }}
                          getOptionLabel={(option) => option.Benefit}
                          id="claimSubType"
                          onChange={(e, newValue) => onHandelClaimSubType(e, newValue)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px",
                            },
                          }}
                          renderInput={(params) => <MDInput {...params} label="Claim Sub Type" />}
                        />
                      </Grid>
                    ) : (
                      ""
                    )}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Reason for Cause of Loss"
                        name="reasonofLoss"
                        value={
                          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                            .reasonofLoss
                        }
                        onChange={(e) => onHandelClaimDetails(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        disabled={TransFlag}
                        options={masterCountry.sort((a, b) => (a.mValue > b.mValue ? 1 : -1))}
                        value={{ mValue: CountryValue }}
                        getOptionLabel={(option) => option.mValue}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        id="country"
                        onChange={(e, newValue) => onHandelClaimDetails1(e, newValue)}
                        renderInput={(params) => <MDInput {...params} label="Country" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Place of Loss"
                        name="placeOfLoss"
                        value={
                          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                            .placeOfLoss
                        }
                        onChange={(e) => onHandelClaimDetails(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Claimant Contact Name"
                        name="Name"
                        value={PolicyDetails.ProposerDetails.Name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Claimant Contact Number"
                        name="ContactNo"
                        value={PolicyDetails.ProposerDetails.ContactNo}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Claimant Email"
                        name="EmailId"
                        value={PolicyDetails.ProposerDetails.EmailId}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{
                          name: "doaDol",
                          value:
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .doaDol,
                          disabled: TransFlag,
                          label: "DOA/DOL",
                        }}
                        value={
                          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDol
                        }
                        onChange={(e, date) => onHandelDOADOLdate(e, date)}
                        options={{
                          dateFormat: "Y/m/d",
                          altFormat: "Y/m/d",
                          altInput: true,
                          enable: [
                            {
                              from: new Date(PolicyDetails.TripStartDate),
                              to: new Date(PolicyDetails.TripEndDate),
                            },
                          ],
                        }}
                      />
                    </Grid>
                    {TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                      .causeOfLoss === "46" ? (
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDDatePicker
                          fullWidth
                          input={{
                            name: "dod",
                            disabled: TransFlag,
                            label: "DOD",
                            value:
                              TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                                .dod,
                          }}
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.dod
                          }
                          onChange={(e, date) => onHandelDODdate(e, date)}
                          options={{
                            dateFormat: "Y/m/d",
                            altFormat: "Y/m/d",
                            altInput: true,
                            minDate: new Date(
                              TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDol
                            ),
                          }}
                        />
                      </Grid>
                    ) : (
                      ""
                    )}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Remarks"
                        name="remarks"
                        value={
                          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.remarks
                        }
                        onChange={(e) => onHandelClaimDetails(e)}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              {TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.isTpa ===
              "true" ? (
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="body1" color="primary">
                      TPA Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {TPADetails.map((item) => (
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            disabled={TransFlag}
                            label="Name"
                            name="TpaName"
                            value={item.tpadetails.TpaName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            disabled={TransFlag}
                            label="Registration no"
                            name="RegistrationNumber"
                            value={item.tpadetails.RegistrationNumber}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            disabled={TransFlag}
                            label="Name of CAO/CEO"
                            name="NameOfCEO"
                            value={item.tpadetails.NameOfCEO}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            disabled={TransFlag}
                            label="Contact Number"
                            name="ContactNumber"
                            value={item.tpadetails.ContactNumber}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            disabled={TransFlag}
                            label="Email ID"
                            name="EmailId"
                            value={item.tpadetails.EmailId}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ) : (
                ""
              )}
              {TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss ===
              "46" ? (
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="body1" color="primary">
                      Hospital Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          disabled={TransFlag}
                          label="Name of hospital"
                          name="hospitalName"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.hospitalName
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                        <MDInput
                          disabled={TransFlag}
                          label="Address"
                          name="hospitalAddress"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.hospitalAddress
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          disabled={TransFlag}
                          label="City"
                          name="hospitalDistrict"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.hospitalDistrict
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          disabled={TransFlag}
                          label="State"
                          name="hospitalState"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.hospitalState
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          disabled={TransFlag}
                          label="Pin Code"
                          name="pincode"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.pincode
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          disabled={TransFlag}
                          label="Country"
                          name="hospitalCountry"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.hospitalCountry
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          disabled={TransFlag}
                          label="Hospital Contact Number"
                          name="contactNo"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.contactNo
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          disabled={TransFlag}
                          label="Hospital Fax Number"
                          name="faxNo"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.faxNo
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          disabled={TransFlag}
                          label="Hospital Email ID"
                          name="emailId"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.emailId
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <MDTypography variant="body2" ml={1}>
                            Network
                          </MDTypography>
                          <RadioGroup
                            defaultValue="false"
                            row
                            name="isNetwork"
                            onChange={(e) => onHandelHospitalDetails(e)}
                          >
                            <FormControlLabel
                              disabled={TransFlag}
                              value="true"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              disabled={TransFlag}
                              value="false"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDDatePicker
                          fullWidth
                          input={{
                            name: "hospitalInvoiceDate",
                            label: "Hospital Invoice Date",
                            disabled: TransFlag,
                            value:
                              TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                                .hospitalDetails.hospitalInvoiceDate,
                          }}
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.hospitalInvoiceDate
                          }
                          onChange={(e, date) => onHandelDateHospitalDetails(e, date)}
                          options={{
                            dateFormat: "Y/m/d",
                            altFormat: "Y/m/d",
                            altInput: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ) : (
                ""
              )}
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="body1" color="primary">
                    Document Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        options={masterDocumentName}
                        getOptionLabel={(option) => option.mValue}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        renderInput={(params) => <MDInput {...params} label="Document List" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {/* <Dropzone
                        inputContent=" "
                        autoHeight
                        styles={{
                          dropzone: { width: 10, height: 250 },
                          // dropzoneActive: { borderColor: "green" },
                        }}
                        // sx={{ dropzone: { minHeight: 50, maxHeight: 50 } }}
                      /> */}

                      <MDDropzone
                        options={{
                          addRemoveLinks: true,
                          accept: (file, done, data) => getDataaa(file, done, data),
                        }}

                        // onSubmit={handleSubmit}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDButton onClick={onSave}>SAVE</MDButton>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </>
      )}
    </MDBox>
  );
}

export default ClaimIntimation;
