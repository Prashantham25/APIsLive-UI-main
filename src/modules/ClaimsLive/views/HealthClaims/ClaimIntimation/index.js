import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Autocomplete,
  Modal,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
import swal from "sweetalert";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { useDataController, setTravelClaimJson } from "modules/BrokerPortal/context";
import { TravelClaimJsonData } from "../data/JsonData";
import {
  // GetPolicyBenefitList,
  GetMasterData,
  // CheckDuplicateClaimNumber,
  SaveClaimDataDetails,
  GetCountryMaster,
  GetProductJson,
  GetPolicyInfoByPolicyNumber,
  SaveClaimHistory,
  SeachClaimTransactions,
  // Documentupload,
  GetBenefits,
} from "../data/index";
// import MDDropzone from "../../../../../components/MDDropzone";

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
  const [backdropLoader, setBackdropLoader] = useState(false);

  const [TravelClaimIntimation, setTravelClaimIntimation] = useState({ ...TravelClaimJson });
  const [timer, setTimer] = useState(false);
  const [PolicyNumber, setPolicyNumber] = useState("");

  const [PolicyDetails, setPolicyDetails] = useState("");
  const [PolicyDetailsStatus, setPolicyDetailsStatus] = useState(false);
  const [ProductJson, setProductJson] = useState("");
  const [MemberTableDetails, setMemberTableDetails] = useState([]);

  // const TPAcode = { TpaCode: "TPA001" };
  // const [TPADetails, setTPADetails] = useState([]);
  const [MemberDetails, setMemberDetails] = useState({});

  // const [MasterClaimType, setMasterClaimType] = useState([]); // Re Cashless
  // const [ClaimCategoryValue, setClaimCategoryValue] = useState("");

  // const [MasterClaimSubType, setMasterClaimSubType] = useState([]);
  const [MasterSubType, setMasterSubType] = useState([]);

  const [MasterCategory, setMasterCategory] = useState([]);
  // const [CategoryValue, setCategoryValue] = useState("");

  const [MaterProcedure, setMasterProcedure] = useState([]);
  // const [ProcedureValue,setProcedureValue]= useState("");

  // const [masterDocumentName, setMasterDocumentName] = useState("");

  const [WorkItemType, setWorkItemType] = useState({ MemberID: "", Type: "FreshClaim" });

  const [ClaimRows, setClaimRows] = useState([]); // Claim Rows for DataGrid
  const [ClaimData, setClaimData] = useState([]); // All Claims of given Policy Number
  const [SelectedClaim, setSelectedClaim] = useState({}); // Selected Claim data
  const [ClaimTransaction, setClaimTransaction] = useState([]); // All Transactions of selected Claim
  const [BodyFlag, setBodyFlag] = useState(false);
  const [TransFlag, setTransFlag] = useState(false);
  const [ClaimLoadFlag, setClaimLoadFlag] = useState(false);
  const [dates, setDates] = useState({
    doaDol: "",
    doaDolTime: "",
    dod: "",
    dodTime: "",
    hospitalInvoiceDate: "",
  });

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
      field: "MemberId",
      headerName: "Member ID",
      width: 250,
      type: "number",
    },

    {
      field: "InsuredName",
      headerName: "Member Name",

      width: 250,
    },

    {
      field: "workItemType",
      headerName: "Work Item Type",
      editable: true,
      width: 250,
      hide: true,
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

  // context
  useEffect(() => {
    setTravelClaimJson(dispatch, { ...TravelClaimJsonData });
  }, []);

  useEffect(() => {
    setTravelClaimIntimation({ ...TravelClaimJson });
  }, [TravelClaimJson]);

  //  useEffect(() => {
  //   if (TransFlag) {
  //     MasterClaimType.forEach((row) => {
  //       if (
  //         row.mID.toString() ===
  //         TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.claimCategory
  //       )
  //         setClaimCategoryValue(row.mValue);
  //     });
  //   }
  // }, [TransFlag]);

  const onGetCountryMaster = async () => {
    const Data = await GetCountryMaster();
    console.log("GetCountryMaster", Data);
  };

  // const TPAData = async () => {
  //   const Data = await GetTpaData({ TPAcode });
  //   setTPADetails(Data);
  //   const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
  //   filteredData1.transactionDetailsDto.tpaDetails.contactNo = Data[0].tpadetails.ContactNumber;
  //   filteredData1.transactionDetailsDto.tpaDetails.email = Data[0].tpadetails.EmailId;
  //   filteredData1.transactionDetailsDto.tpaDetails.name = Data[0].tpadetails.TpaName;
  //   filteredData1.transactionDetailsDto.tpaDetails.nameOfCAOCEO = Data[0].tpadetails.NameOfCEO;
  //   filteredData1.transactionDetailsDto.tpaDetails.registrationNo =
  //     Data[0].tpadetails.RegistrationNumber;
  //   TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData1 });
  //   setTravelClaimIntimation({
  //     ...TravelClaimIntimation,
  //     claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
  //   });
  // };
  // const GetClaimSubType = async () => {
  //   const Data = await GetPolicyBenefitList({ PolicyNumber });
  //   setMasterClaimSubtype(Data.finalResult.sectionMappingDetails.BenefitDetails);
  // };
  // console.log("masterClaimSubtype", masterClaimSubtype);
  const onHandelMemberDetails = async (ids) => {
    setMemberDetails(ids.row);
    setWorkItemType({ ...WorkItemType, MemberId: ids.row.MemberId });
    setBodyFlag(true);

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
    const ndob = new Date(PolicyDetails.NomineeDetails.NomineeDOB);
    // const tsd = new Date(PolicyDetails.TripStartDate);
    // const ted = new Date(PolicyDetails.TripEndDate);
    // const pid = new Date(PolicyDetails.createdDate);

    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      policyNo: PolicyNumber,
      basicDetails: {
        ...TravelClaimIntimation.basicDetails,
        productCode: PolicyDetails["Product Code"],
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
          // travelStartDate: [tsd.getDate(), tsd.getMonth() + 1, tsd.getFullYear()].join("/"),
          // travelEndDate: [ted.getDate(), ted.getMonth() + 1, ted.getFullYear()].join("/"),
        },
        nomineeDetails: {
          ...TravelClaimIntimation.basicDetails.nomineeDetails,
          nomineeDOB: [ndob.getDate(), ndob.getMonth() + 1, ndob.getFullYear()].join("/"),
          nomineeName: PolicyDetails.NomineeDetails.NomineeName,
          relationWithInsured: PolicyDetails.NomineeDetails.NomineeRelationWithProposer,
          address1: PolicyDetails.NomineeDetails.NomineeAddress1,
          address2: PolicyDetails.NomineeDetails.NomineeAddress2,
          // address3: "",
          nomineeCity: PolicyDetails.NomineeDetails.City,
          // nomineeEmailID: PolicyDetails.NomineeDetails.NomineeEmailID,
          nomineeMobile: PolicyDetails.NomineeDetails.NomineeMobile,
          nomineePincode: PolicyDetails.NomineeDetails.PinCode,
          nomineeState: PolicyDetails.NomineeDetails.State,
        },
        memberDetails: {
          ...TravelClaimIntimation.basicDetails.memberDetails,
          memberId: ids.row.MemberId,
          insuredName: ids.row.InsuredName,
          gender: ids.row.InsuredGender,
          insuredAge: ids.row.Age,
          patientRelationship: ids.row.InsuredRelationWithProposer,
        },
      },
    });
    setBodyFlag(true);
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

    console.log("qweqwe", SelectedClaim);
  };

  const onTransactionSelect = async (ids) => {
    console.log(ids);
    setTravelClaimIntimation({ ...TravelClaimIntimation, claimTransactionDTO: [{ ...ids.row }] });
    // if (ids.row.transactionDetailsDto.isTpa === true) {
    //   const Data = await GetTpaData({ TPAcode });
    //   setTPADetails(Data);
    // }
    setTransFlag(true);
    handleClose(false);
  };

  const onHandelHospitalDetails = (e) => {
    const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    filteredData.transactionDetailsDto.hospitalDetails[e.target.name] = e.target.value;
    TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    });
  };

  // const onHandelDOADOLdate = (e, date) => {
  //   const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
  //   filteredData.transactionDetailsDto.doaDol = date;
  //   TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
  //   setTravelClaimIntimation({
  //     ...TravelClaimIntimation,
  //     claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
  //   });
  // };

  // const onHandelDODdate = (e, date) => {
  //   const doaDol = new Date(
  //     TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDol
  //   );
  //   const dod = new Date(date);
  //   const diffTime = dod.getTime() - doaDol.getTime();
  //   const noOfDays = diffTime / (1000 * 3600 * 24);

  //   const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
  //   filteredData.transactionDetailsDto.dod = date;
  //   filteredData.transactionDetailsDto.noOfDays = noOfDays;
  //   TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
  //   setTravelClaimIntimation({
  //     ...TravelClaimIntimation,
  //     claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
  //   });
  // };

  // const onHandelCategory = (e, newValue) => {
  //   if (newValue.BenefitDetails !== null) setMasterProcedure(newValue.BenefitDetails);
  //   else setMasterProcedure([]);
  //   TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss =
  //     newValue.CoverId;

  //   setTravelClaimIntimation(TravelClaimIntimation);
  // };

  // const onHandelProcedure  = async (e, newValue) => {
  // const memberId = WorkItemType.MemberID;
  // console.log(memberId);
  // const currDate = formatDate(new Date());
  // console.log(currDate);
  // const benefitNo = newValue.BenefitId.toString();
  // console.log(benefitNo);

  // const rr = await CheckDuplicateClaimNumber({ memberId, currDate, benefitNo });
  // console.log("rr", rr);
  // // setClaimSubtypeValue(newValue.Benefit);
  // console.log("newVAlueee", newValue);

  // TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss =
  //   newValue.BenefitCode;
  // setTravelClaimIntimation(TravelClaimIntimation);

  // const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
  // filteredData.transactionDetailsDto.typeOfLoss = newValue.BenefitId;
  // TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
  // setTravelClaimIntimation({
  //   ...TravelClaimIntimation,
  //   claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
  // });
  // };

  const onHandelClaimDetails = (e) => {
    const filteredData = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    filteredData.transactionDetailsDto[e.target.name] = e.target.value;
    TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData });
    setTravelClaimIntimation({
      ...TravelClaimIntimation,
      claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    });
    // if (TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.isTpa === "true") {
    //   TPAData();
    // } else {
    //   const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    //   filteredData1.transactionDetailsDto.tpaDetails.contactNo = "";
    //   filteredData1.transactionDetailsDto.tpaDetails.email = "";
    //   filteredData1.transactionDetailsDto.tpaDetails.name = "";
    //   filteredData1.transactionDetailsDto.tpaDetails.nameOfCAOCEO = "";
    //   filteredData1.transactionDetailsDto.tpaDetails.registrationNo = "";
    //   TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData1 });
    //   setTravelClaimIntimation({
    //     ...TravelClaimIntimation,
    //     claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    //   });
    // }
  };

  const onSave = async () => {
    setBackdropLoader(true);
    // if (WorkItemType.Type === "FreshClaim") {
    const date = formatDate(new Date());
    TravelClaimIntimation.createdDate = date;
    TravelClaimIntimation.claimStatusId = 81;
    TravelClaimIntimation.claimTransactionDTO[0].statusId = 81;
    TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDol =
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDol.concat(
        "T",
        TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDolTime
      );
    TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.dod =
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.dod.concat(
        "T",
        TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.dodTime
      );

    setTravelClaimIntimation(TravelClaimIntimation);
    // }

    // if (WorkItemType.Type === "ExistingClaim") {
    //   if (TransFlag) {
    //     const date = formatDate(new Date());
    //     const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    //     filteredData1.modifiedDateTime = date;
    //     TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData1 });
    //     setTravelClaimIntimation({
    //       ...TravelClaimIntimation,
    //       claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    //     });
    //   } else {
    //     const date = formatDate(new Date());
    //     const filteredData1 = { ...TravelClaimIntimation.claimTransactionDTO[0] };
    //     filteredData1.createdDateTime = date;
    //     TravelClaimIntimation.claimTransactionDTO.splice(0, 1, { ...filteredData1 });
    //     setTravelClaimIntimation({
    //       ...TravelClaimIntimation,
    //       claimTransactionDTO: [...TravelClaimIntimation.claimTransactionDTO],
    //     });
    //   }
    // }
    console.log("onSave final", TravelClaimIntimation);
    const Data = await SaveClaimDataDetails({ TravelClaimIntimation });

    console.log("onSave Response", Data);

    const transactionNumber = { TransactionNumber: Data.claimTransactionDTO[0].transactionNumber };
    await SaveClaimHistory({ transactionNumber });
    setBackdropLoader(false);
    swal({
      html: true,
      icon: "success",
      title: "Claim Intimated Successful",
      text: `Claim Number ${Data.claimNumber}`,
    });
  };

  const onAutoChange = (e, newValue, type) => {
    // if (e.target.id.split("-")[0] === "claimCategory") setClaimCategoryValue(newValue.mValue);
    // if (e.target.id.split("-")[0] === "country") setCountryValue(newValue.mValue);
    if (type === "claimCategory") {
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.claimCategory = 48;
    }
    if (type === "claimSubType") {
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.claimSubType =
        newValue.mID.toString();
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.claimCategory = 48;
    }
    if (type === "CauseOfLoss") {
      if (newValue.BenefitDetails !== null) setMasterProcedure(newValue.BenefitDetails);
      else setMasterProcedure([]);
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss =
        newValue.CoverId;
    }
    if (type === "typeOfLoss") {
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss =
        newValue.BenefitCode;
    }
    if (type === "doaDol") {
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDol = newValue;
      setDates({
        ...dates,
        doaDol: newValue,
      });
    }
    if (type === "doaDolTime") {
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDolTime = newValue;

      setDates({
        ...dates,
        doaDolTime: newValue,
      });
    }
    if (type === "dod") {
      const doaDol = new Date(
        TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.doaDol
      );
      const dod = new Date(newValue);
      const diffTime = dod.getTime() - doaDol.getTime();
      const noOfDays = diffTime / (1000 * 3600 * 24);

      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.dod = newValue;
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.noOfDays = noOfDays;
      setDates({
        ...dates,
        dod: newValue,
      });
    }
    if (type === "dodTime") {
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.dodTime = newValue;
      setDates({
        ...dates,
        dodTime: newValue,
      });
    }
    if (type === "hospitalInvoiceDate") {
      TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.hospitalInvoiceDate =
        newValue;
      setDates({
        ...dates,
        hospitalInvoiceDate: newValue,
      });
    }

    setTravelClaimIntimation(TravelClaimIntimation);
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
        console.log("asdsdd", Data2.policy_details[0].policyRequest.InsurableItem[0].RiskItems);
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
      const SData2 = Data2.policy_details[0].policyRequest;
      const SearchObj = {
        productCode: SData2["Product Code"],
        planType: SData2.PlanName,
        filterCriteria: [{ Plan: SData2.PlanName }],
        isFilterMemberWise: false,
        setBenefitMemberWise: false,
        insurableItems: null,
      };

      const Data4 = await GetBenefits({ SearchObj });
      console.log("Data4", Data4);
      setMasterCategory(Data4.finalResult.benefits);
      // setMasterClaimSubtype(Data4.finalResult.benefits);

      const Data3 = await GetProductJson(Data2.policy_details[0].policyRequest["Product Code"]);
      setProductJson(Data3);
      console.log(ProductJson);

      await onGetCountryMaster();
    }
  };

  useEffect(async () => {
    const Data = await GetMasterData();
    Data.forEach((item) => {
      // if (item.mType === "Travel Claim Category") {
      //   setMasterClaimType(item.mdata);
      // }
      // if (item.mType === "Document Name") {
      //   setMasterDocumentName(item.mdata);
      // }
      // if (item.mType === "Travel Claim SubType") {
      //   setMasterClaimSubType(item.mdata);
      // }
      if (item.mType === "SubType") setMasterSubType(item.mdata);
    });
  }, [PolicyDetails]);

  const editExistingClaim = () => {
    handleOpen();
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
                        getRowId={(row) => row.MemberId}
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
                        label="Member ID"
                        value={MemberDetails.MemberId}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Patient Name"
                        value={MemberDetails.InsuredName}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Age"
                        value={MemberDetails.Age}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput label="Corporate Name" InputProps={{ readOnly: true }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput label="Employee Name" InputProps={{ readOnly: true }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Employee ID"
                        value={PolicyDetails.EmployeeID}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Policy Number"
                        value={PolicyDetails.PolicyNumber}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Policy Start Date "
                        value={PolicyDetails.PolicyStartDate}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Policy End Date"
                        value={PolicyDetails.PolicyEndDate}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Payout Type"
                        value={PolicyDetails.PayoutType}
                        InputProps={{ readOnly: true }}
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
                      <MDInput label="Claim Type" value="Reimbursement Claim" />
                      {/* <Autocomplete
                        disabled={TransFlag}
                        options={MasterClaimType}
                        value={{ mValue: "Reimbursement Claim" }}
                        getOptionLabel={(option) => option.mValue}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        onChange={(e, newValue) => onAutoChange(e, newValue, "claimCategory")}
                        renderInput={(params) => <MDInput {...params} label="Claim Type" />}
                      /> */}
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        disabled={TransFlag}
                        options={MasterSubType}
                        // value={{ mValue: ClaimCategoryValue }}
                        getOptionLabel={(option) => option.mValue}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        onChange={(e, newValue) => onAutoChange(e, newValue, "claimSubType")}
                        renderInput={(params) => <MDInput {...params} label="Claim Sub Type" />}
                      />
                    </Grid>

                    {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
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
                    </Grid> */}

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        disabled={TransFlag}
                        options={MasterCategory}
                        // value={{
                        //   CoverName: CategoryValue,
                        // }}
                        getOptionLabel={(option) => option.CoverName}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        onChange={(e, newValue) => onAutoChange(e, newValue, "CauseOfLoss")}
                        // value={TravelClaim.CauseOfLoss}
                        renderInput={(params) => <MDInput {...params} label="Category Name" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        disabled={TransFlag}
                        options={MaterProcedure}
                        // value={{
                        //   BenefitName: ProcedureValue,
                        // }}
                        getOptionLabel={(option) => option.BenefitName}
                        id="claimSubType"
                        onChange={(e, newValue) => onAutoChange(e, newValue, "typeOfLoss")}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        renderInput={(params) => <MDInput {...params} label="Procedure Name" />}
                      />
                    </Grid>

                    {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
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
                        onChange={(e, newValue) => onAutoChange(e, newValue)}
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
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        input={{
                          label: "Date of Admission",
                          value: dates.doaDol,
                          disabled: TransFlag,
                        }}
                        value={dates.doaDol}
                        onChange={(e, date) => onAutoChange(e, date, "doaDol")}
                        options={{
                          dateFormat: "Y/m/d",
                          altFormat: "Y/m/d",
                          altInput: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{
                          disabled: TransFlag,
                          label: "Time of Admission",
                          value: dates.doaDolTime,
                        }}
                        value={dates.doaDolTime}
                        onChange={(e, date) => onAutoChange(e, date, "doaDolTime")}
                        options={{
                          noCalendar: true,
                          enableTime: true,
                          dateFormat: "H:i:S",
                          altFormat: "H:i:S",
                          altInput: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{
                          disabled: TransFlag,
                          label: "Date of Discharge",
                          value: dates.dod,
                        }}
                        value={dates.dod}
                        onChange={(e, date) => onAutoChange(e, date, "dod")}
                        options={{
                          dateFormat: "Y/m/d",
                          altFormat: "Y/m/d",
                          altInput: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{
                          disabled: TransFlag,
                          label: "Time of Discharge",
                          value: dates.dodTime,
                        }}
                        value={dates.dodTime}
                        onChange={(e, date) => onAutoChange(e, date, "dodTime")}
                        options={{
                          value: " ",
                          noCalendar: true,
                          enableTime: true,
                          dateFormat: "H:i:S",
                          altFormat: "H:i:S",
                          altInput: true,
                        }}
                      />
                    </Grid>

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

              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="body1" color="primary">
                    Clinic Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Dr/Clinic Name"
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
                        label=" Dr/Clinic Address"
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
                        label="Dr/Clinic City"
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
                        label="Dr/Clinic State"
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
                        label="Dr/Clinic Pin Code"
                        name="pincode"
                        value={
                          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                            .hospitalDetails.pincode
                        }
                        onChange={(e) => onHandelHospitalDetails(e)}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
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
                      </Grid> */}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Dr/Clinic Contact Number"
                        name="contactNo"
                        value={
                          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                            .hospitalDetails.contactNo
                        }
                        onChange={(e) => onHandelHospitalDetails(e)}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          disabled={TransFlag}
                          label="Dr/Clinic Fax Number"
                          name="faxNo"
                          value={
                            TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                              .hospitalDetails.faxNo
                          }
                          onChange={(e) => onHandelHospitalDetails(e)}
                        />
                      </Grid> */}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        disabled={TransFlag}
                        label="Dr/Clinic Email ID"
                        name="emailId"
                        value={
                          TravelClaimIntimation.claimTransactionDTO[0].transactionDetailsDto
                            .hospitalDetails.emailId
                        }
                        onChange={(e) => onHandelHospitalDetails(e)}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
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
                      </Grid> */}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{
                          name: "Bill Date",
                          label: "Bill Date",
                          disabled: TransFlag,
                          value: dates.hospitalInvoiceDate,
                        }}
                        value={dates.hospitalInvoiceDate}
                        onChange={(e, date) => onAutoChange(e, date, "hospitalInvoiceDate")}
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
                        // options={masterDocumentName}
                        options={["Others"]}
                        // getOptionLabel={(option) => option.mValue}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        renderInput={(params) => <MDInput {...params} label="Document List" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput label="Document Name" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Dropzone
                        maxFiles={1}
                        // onChangeStatus={handleChangeStatus}
                        // onSubmit={handleSubmit}
                        inputContent="Drop A File"
                        styles={{
                          dropzone: { height: 200 },
                          dropzoneActive: { borderColor: "green" },
                        }}
                        accept=""
                        // sx={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDButton onClick={onSave}>SAVE</MDButton>
                    </Grid>
                    {backdropLoader && (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Backdrop
                          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                          open={backdropLoader}
                        >
                          <CircularProgress />
                        </Backdrop>
                      </Grid>
                    )}
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
