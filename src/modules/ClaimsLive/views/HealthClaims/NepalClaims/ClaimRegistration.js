import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  IconButton,
  Stack,
  Box,
  // Drawer,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
// import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import swal from "sweetalert";
// import ButtonGroup from "@mui/material/ButtonGroup";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
// import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import MDInput from "../../../../../components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import {
  IsAlpha,
  // IsEmail,
  // IsMobileNumber,
  IsNumber,
} from "../../../../BaseSetup/views/Users/data/validation";
import {
  GetPolicyDetailsByNumber,
  masterIFSC,
  getProdPartnermasterDatas,
  UploadFiles,
  GetPayLoadByQueryDynamic,
  // SaveClaimDetails,
  master,
  QueryExecution,
  SearchClaimDetailsByRegClaimNo,
  GenericApi,
  GetEndorsementJson,
  DateFormateing,
  // convertDateFormat,
  // removePatterns,
} from "../data";
import {
  IsAlphaNumSpace,
  IsAlphaNumSpecial,
  IsAlphaSpace,
  DateFormatFromStringDate,
  // DateFormatFromDateObject,
} from "../../../../../Common/Validations";
import { Transliteration } from "../../../../PolicyLive/views/Retail/Products/NepalProds/data/APIs/MotorCycleApi";
// import { split } from "lodash";
// import ClaimsDetails from "./JsonData";
// import { UpdateSequenceNumber } from "../../MotorClaims/Processing/data";
// import { FiscalYear } from "../../../../PolicyLive/views/Retail/Products/NepalProds/data/APIs/MotorCycleApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ClaimRegistration() {
  // const redAsterisk = {
  //   "& .MuiFormLabel-asterisk": {
  //     color: "red",
  //   },
  // };

  const autocompleteRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [SearchFlag, setSearchFlag] = useState(false);
  const [PolicyDetails, setPolicyDetails] = useState();

  const [SearchObj, SetSearchObj] = useState({ policyNo: "" });
  const [claimJson, setClaimJson] = useState();
  const [flag, setFlag] = useState(false);
  const [insuredName, setInsuredName] = useState("");
  const [endoType, setEndoType] = useState("");
  const [docNo, setDocNo] = useState("");
  const [otherflag, setOtherFlag] = useState(false);
  const [tpVehicleArray, setTpVehicleArray] = useState([]);
  const [treatyBreakdownArray, setTreatyBreakdown] = useState([]);
  const [provinceArray, setProvinceState] = useState([]);
  const [districtArray, setDistrictArray] = useState([]);
  const [municipalityArray, setMunicipalityArray] = useState([]);
  const [fiscalYearArray, setFiscalYearArray] = useState([]);
  const [lossTypeArray, setLossTypeArray] = useState([]);
  const [otherUpload, setOtherUpload] = useState([]);
  const [rows, setRows] = useState([]);
  const [subLossTypeArray, setSubLossType] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [rowData, setRowData] = useState([]);
  const [otherUploadFlag, setOtherUploadFlag] = useState(Array(otherUpload.length).fill(false));
  const [OSFlag, setOSFlag] = useState(false);
  const helperText = "This field Required";
  const [values, setValues] = useState({
    IntimationDetails: {
      isAnyWitness: "",
      IntimationMode: "",
      AccidentLocation: "",
      otherAccidentLocation: "",
      AccidentDate: "",
      causeofAccident: "",
      AccidentRemarks: "",
      NotifiedBy: "",
      wasVehicleParked: "",
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
      wasVehicleParked: "",
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
            isInsured: "",
            needtowingservices: "",
            VehiclereplacementCoverage: "",
            MobileNo: "",
            otherLocation: "",
            otherWorkShop: "",
            isTPVehicleDamaged: "",
            Gender: "",
            Make: "",
            otherMake: "",
            Model: "",
            otherModel: "",
            vehicleType: "",
            mulkiyaExpiryDate: "",
            TPAge: "",
            VehiclePlateNo: "",
            isAmbulanceServiceAvailed: "",
            isTPPropertyDamaged: "",
            PropertyType: "",
            PropertyDescription: "",
            otherpropertyDescription: "",
            Wilayat: "",
            OtherWilayat: "",
            Claimshandler: "",
            Relationwithparticipant: "",
            otherRelationwithparticipant: "",
            isInjurySelfOrTP: "",
            InjuryType: "",
            IsDeseasedAccident: "",
            IsAnimalDeathOrInjury: "",
            TypeofAnimal: "",
            OtherTypeofAnimal: "",
            Typeofloss: "",
            Count: "",
          },
        ],
      },
    ],
    claimDetails: {
      branch: "",
      subBranch: "",
      intimationBranch: "",
      claimFiscalYear: "",
      registerDate: "",
      dateOfLoss: "",
      intimationDate: "",
      claimFormDate: "",
      claimCause: "",
      transportationReg: "",
      affectedProperty: "",
      natureOfLoss: "",
      claimant: "",
      comments: "",
      EmailId: "",
      contactPersonName: "",
      mobileNumber: "",
      ownVehicleNumber: "",
      tpVehicleNumber: "",
      Remarks: "",
      riskCovered: "",
      trasportRegisterOffice: "",
    },
    placeofOccurance: {
      country: "",

      province: "",
      provinceId: "",
      district: "",
      districtId: "",
      municipality: "",
      wardNumber: "",
      Address: "",
      AddressNepali: "",
      Area: "",
      Toll: "",
      HouseNumber: "",
      plotNumber: "",
    },
    LossInformation: {
      lossType: "",
      subLossType: "",
      materialType: "",
      particulars: "",
      sumInsured: "",
      claimAmount: "",
    },
  });
  const [HTextFlag, setHTextFlag] = useState({
    trasportRegisterOfficeFlag: false,
    affectedPropertyFlag: false,
    natureOfLossFlag: false,
    riskCoveredFlag: false,
    claimantFlag: false,
    commentsFlag: false,
    EmailIdFlag: false,
    contactPersonNameFlag: false,
    mobileNumberFlag: false,
    ownVehicleNumberFlag: false,
    RemarksFlag: false,
    tpVehicleNumberFlag: false,
    plotNumberFlag: false,
    HouseNumberFlag: false,
    ToleFlag: false,
    AreaFlag: false,
    AddressNepaliFlag: false,
    Address: false,
    materialTypeFlag: false,
    particularsFlag: false,
    sumInsuredFlag: false,
    claimAmountFlag: false,
    lossTypeFlag: false,
    subLossTypeFlag: false,
    lossTypeText: "",
    subLossTypeText: "",

    claimAmountText: "",
    sumInsuredText: "",
    particularsText: "",
    materialTypeText: "",
    AddressText: "",
    AddressNepaliText: "",
    AreaText: "",
    ToleText: "",
    HouseNumberText: "",
    plotNumberText: "",
    tpVehicleNumberText: "",
    ownVehicleNumberText: "",
    RemarksText: "",
    mobileNumberText: "",
    contactPersonNameText: "",
    EmailIdText: "",
    commentsText: "",
    claimantText: "",
    riskCoveredText: "",
    natureOfLossText: "",
    affectedPropertyText: "",
    trasportRegisterOfficeText: "",
  });

  const [documentData, setDocumentData] = useState({
    docId: "",
    docName: "",
    UploadDocDate: "",
    fileName: "",
  });

  const losInfoD = {
    lossType: "",
    subLossType: "",
    materialType: "",
    particulars: "",
    sumInsured: "",
    claimAmount: "",
  };
  // const [filename, setFilename] = useState();

  // const [errorMessage, setErrorMessage] = useState("");

  console.log("rowDatashanu", rowData);
  // console.log("selectedIndex", selectedIndex);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);

  const handleAddDocument = () => {
    // debugger;
    const obj1 = {
      docId: "",
      docName: "",
      UploadDocDate: "",
      fileName: "",
    };
    otherUpload.push(obj1);
    setOtherUpload([...otherUpload]);
    setOtherFlag(true);
    // setAddDoc((prevState) => prevState + 1);
    // setShowCancel(true);
    console.log("otherdoc", otherUpload);
  };
  const UploadImage = async (file, id) => {
    // setFilename(file.name);
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (otherflag === true && id !== undefined) {
        if (result.data[0].fileName !== "") {
          const docId = result.data[0].docid;
          const newUploads = [...otherUpload];
          newUploads[id].docId = docId;
          setOtherUpload(newUploads);
        }
      } else {
        console.log("result", result);
        documentData.docId = result.data[0].docid;
        setDocumentData(documentData);
      }
    });
  };
  // useEffect(() => {
  //   debugger;
  //   if (claimJson !== undefined) {
  //     // const dd = DateFormatFromStringDate(claimJson.createdDate);
  //     const dd = DateFormatFromStringDate(claimJson.createdDate, split("T")[0], "y-m-d", "d/m/y");
  //     console.log("dd", dd);
  //     claimJson.
  //   }
  // }, [PolicyDetails, claimJson]);

  useEffect(async () => {
    if (claimJson !== undefined) {
      const dd = DateFormatFromStringDate(claimJson.createdDate.split("T")[0], "y-m-d", "d/m/y");
      if (claimJson) {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.intimationDate =
          dd;
      }

      setClaimJson(claimJson);
      // if (docNo !== "") {
      //   const obj1 = {
      //     reportname: "NepalClaimEdorsementDetails",
      //     paramList: [
      //       {
      //         ParameterName: "EndorsementNo",
      //         ParameterValue: docNo,
      //       },
      //     ],
      //   };
      //   const endoDate = await GetPayLoadByQueryDynamic(obj1);
      //   console.log("endoDate", endoDate);
      //   if (endoDate.staus === 200) {
      //     const ddd = DateFormatFromStringDate(
      //       endoDate.data.finalResult[0].CreatedDate.split("T")[0],
      //       "y-m-d",
      //       "d/m/y"
      //     );
      //     if (claimJson) {
      //       claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.intimationDate =
      //         ddd;
      //     }
      //   }
      //   setClaimJson(claimJson);
      // }
    }
  }, [PolicyDetails, claimJson, docNo]);

  const handleOtherFileUpload = (id, e) => {
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
        text: "Only JPG and PDF files are allowed.",
      });
      return;
    }
    const newuploads = [...otherUpload];
    newuploads[id].fileName = e.target.files[0].name;
    newuploads[id].UploadDocDate = new Date();
    setDocumentData(newuploads);
    UploadImage(e.target.files[0], id);
    const newUploadFlags = [...otherUploadFlag];
    newUploadFlags[id] = true;
    setOtherUploadFlag(newUploadFlags);
  };
  const [tp, setTp] = useState({
    tpVehicle: "",
  });
  const handleTpVehicle = () => {
    setTpVehicleArray((prev) => [...prev, { ...tp }]);
  };

  const TpVehicleUpdate = () => {
    // debugger;
    const arr = [];
    tpVehicleArray.forEach((c) => {
      arr.push(`${c.tpVehicle} `);
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.tpVehicleNumber =
        arr;
      console.log("aaaa", arr);
    });
    setClaimJson({ ...claimJson });
    setOpen1(false);
  };
  console.log("tpVv", tpVehicleArray);
  const handleFileUpload = (e) => {
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
        text: "Only JPG and PDF files are allowed.",
      });
      return;
    }
    const newuploads = documentData;
    newuploads.fileName = e.target.files[0].name;
    newuploads.UploadDocDate = new Date();
    // setOtherUpload(newuploads);
    UploadImage(e.target.files[0]);
  };
  const handleAddother = (e, id) => {
    if (e.target.name === "other") {
      otherUpload[id].docName = e.target.value;
    }
    setOtherUpload([...otherUpload]);
  };

  const handleOtherRemove = (id) => {
    const newUploadFlags = [...otherUploadFlag];
    newUploadFlags[id] = false;
    setOtherUploadFlag(newUploadFlags);
    if (otherUpload[id].fileName !== "") {
      // otherUpload[id] = "";
      otherUpload[id].fileName = "";
      otherUpload[id].UploadDocDate = "";
      setOtherUpload([...otherUpload]);
    }
  };
  const handleDeleteOther = (id) => {
    const updatedOtherUpload = [...otherUpload];
    updatedOtherUpload.splice(id, 1);
    setOtherUpload(updatedOtherUpload);
  };

  const handleDeleteupload = () => {
    // const newUpload = [documentData];
    // debugger;
    documentData.fileName = "";
    documentData.docId = "";
    documentData.UploadDocDate = "";
    setDocumentData(documentData);
    // }
  };

  const handleChange = (e) => {
    const updatedSearchObj = { ...SearchObj, [e.target.name]: e.target.value };
    SetSearchObj(updatedSearchObj);
    setSearchFlag(false);
  };

  const handleSearch = async () => {
    // debugger;
    const PolicyAPI = await GetPolicyDetailsByNumber(SearchObj.policyNo);
    if (PolicyAPI.responseMessage === "Invalid Policy Number") {
      swal({
        icon: "error",
        text: PolicyAPI.responseMessage,
      });
    }
    if (PolicyAPI.EndorsementNo !== undefined) {
      setDocNo(PolicyAPI.EndorsementNo);

      const GetEndorsementJsonres = await GetEndorsementJson(PolicyAPI.EndorsementNo);
      console.log("GetEndorsementJsonres", GetEndorsementJsonres);
      if (GetEndorsementJsonres.status === 200) {
        GetEndorsementJsonres.data.finalResult.EndorsementType.forEach((x) => {
          if (x.mType === "EndorsementType") {
            setEndoType(x.mValue);
          }
        });
      }
    }
    const obj = {
      reportconfigid: "521",
      paramList: [
        {
          parameterName: PolicyAPI.PolicyNo !== undefined ? "policyno" : "PolicyNumber",
          parameterValue:
            PolicyAPI.PolicyNo !== undefined ? PolicyAPI.PolicyNo : PolicyAPI.PolicyNumber,
        },
      ],
    };
    const IntimationNo = await QueryExecution(obj);
    const Intimationdata = await SearchClaimDetailsByRegClaimNo(IntimationNo.data[0].regClaimno);
    setClaimJson(Intimationdata.finalResult);
    setPolicyDetails({ ...PolicyAPI });

    setFlag(true);
    setSearchFlag(true);
  };

  console.log("IntimationDetails", claimJson);

  const onClaimSave = async () => {
    let abc = {};
    abc = { ...abc, ...claimJson };
    delete abc.claimNumber;
    abc = { ...abc, ...{ ProductCode: "NepalMotorTwoWheeler" } };
    setClaimJson({ ...abc });
    abc.Prefix = "PRO1/KTM/MC/000001/23/24/";
    abc.NumberType = "ClaimRegistrationNo";
    abc.AttributeName = "claimNumber";

    setClaimJson({ ...abc });
    const res = await GenericApi("NepalMotorTwoWheeler", "NepalSaveClaim", abc);
    console.log("GenericSave", res);
    if (res.responseMessage === "Success") {
      Swal.fire({
        icon: "success",
        title: "Claim Registration is Successful",
        html: `
        <div>
          <p>Your Claim Number is ${res.finalResult.claimNumber}</p><br/>
         
        </div>
      `,
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(async () => {
    // const data = {
    //   MasterType: "BranchName",
    //   Description: PolicyDetails && PolicyDetails.ICShortName,
    //   ProductId: 1193,
    // };
    // const abc = {
    //   Description: data.Description,
    // };
    // const BranchResponse = await masterIFSC(data.ProductId, data.MasterType, abc);
    // console.log("BranchResponse", BranchResponse);
    // if (BranchResponse.status === 200) {
    //   setBranchArray([...BranchResponse.data]);
    // }

    const data1 = {
      MasterType: "State",
      ProductId: 1193,
    };
    const stateResponse = await getProdPartnermasterDatas(data1.ProductId, data1.MasterType);
    if (stateResponse.status === 200) {
      setProvinceState([...stateResponse.data]);
    }

    // console.log("BranchResponse", BranchResponse);
    console.log("stateResponse", stateResponse);
    const dataa = { MasterType: "Fiscal Year" };
    const fiscalYear = await getProdPartnermasterDatas(data1.ProductId, dataa.MasterType);
    if (fiscalYear.status === 200) {
      setFiscalYearArray([...fiscalYear.data]);
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.claimFiscalYear =
        fiscalYear.data[0].mValue;
      setClaimJson({ ...claimJson });
    }
    // debugger;
    const dataa1 = { MasterType: "LossType" };
    const LossTypeResponse = await getProdPartnermasterDatas(data1.ProductId, dataa1.MasterType);
    if (LossTypeResponse.status === 200) {
      setLossTypeArray([...LossTypeResponse.data]);
    }
  }, [PolicyDetails]);

  useEffect(async () => {
    const data2 = {
      MasterType: "District",

      ProductId: 1193,
    };
    const abcd = {
      State_Id:
        claimJson !== undefined
          ? claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance
              .provinceId
          : "",
    };
    const districtResponse = await masterIFSC(data2.ProductId, data2.MasterType, abcd);
    console.log("districtResponse", districtResponse);
    if (districtResponse.status === 200) {
      setDistrictArray([...districtResponse.data]);
    }
  }, [
    claimJson !== undefined &&
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.provinceId,
  ]);

  useEffect(async () => {
    const data2 = {
      MasterType: "Municipality",

      ProductId: 1193,
    };
    const abcd = {
      District_Id:
        claimJson !== undefined
          ? claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance
              .districtId
          : "",
    };
    const munciResponse = await masterIFSC(data2.ProductId, data2.MasterType, abcd);
    console.log("munciResponse", munciResponse);
    if (munciResponse.status === 200) {
      setMunicipalityArray([...munciResponse.data]);
    }
  }, [
    claimJson !== undefined &&
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.districtId,
  ]);

  useEffect(async () => {
    const obj = {
      reportname: "NepalClaimTreatyBreakDown",
      paramList: [
        {
          ParameterName: "endorsementno",
          ParameterValue: "",
        },
        {
          ParameterName: "policyno",
          ParameterValue: SearchObj.policyNo,
        },
        {
          ParameterName: "Treaty",
          ParameterValue: "",
        },
      ],
    };
    const treatyBreakdown = await GetPayLoadByQueryDynamic(obj);
    console.log("treatyBreakdown", treatyBreakdown);
    if (treatyBreakdown.status === 200) {
      setTreatyBreakdown([...treatyBreakdown.data.finalResult]);
    }

    const obj1 = {
      reportname: "NepalClaimInsuredDetails",
      paramList: [
        {
          ParameterName: "policyno",
          ParameterValue: SearchObj.policyNo,
        },
      ],
    };
    const treatyBreakdowns = await GetPayLoadByQueryDynamic(obj1);
    console.log("treatyBreakdowns", treatyBreakdowns);
    if (treatyBreakdown.status === 200) {
      setInsuredName(treatyBreakdowns.data.finalResult.InsuredDetails);
    }
  }, [PolicyDetails]);
  console.log("policydetails", PolicyDetails);

  const handleReset = () => {
    setRows([]);
  };
  const handleOpenModal1 = () => {
    setOpen1(true);
  };
  const openDD = Boolean(anchorEl);
  const columns = [
    {
      field: "id",
      headerName: "SI.No",
      width: 80,
    },
    {
      field: "LossType",
      headerName: "Loss Type",
      // flex: 1,
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "SubLossType",
      headerName: "Sub Loss Type",
      width: 150,
    },
    {
      field: "MaterialType",
      headerName: "Material Type",
      width: 150,
    },
    {
      field: "Particulars",
      headerName: "Particulars",
      width: 150,
    },
    {
      field: "SumInsured",
      headerName: "Sum Insured",
      width: 150,
    },
    {
      field: "ClaimAmount",
      headerName: "Claim Amount ",
      width: 150,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,

      renderCell: (params) => {
        const handleGridClick = (event, p) => {
          // debugger;
          setAnchorEl(event.currentTarget);
          // setSelectedIndex(index);
          setSelectedRowData(p);
        };
        const handleCloseActionButton = () => {
          setAnchorEl(null);
        };
        // const onDelete = () => {
        //   debugger;
        //   const updateRows = rows.filter((row) => row.id !== selectedRowData.id); // Use filter to remove the selected row
        //   setRows(updateRows);
        //   setAnchorEl(null);
        // };
        console.log("insuredName", insuredName);
        const onDelete = () => {
          // debugger;
          // Use filter to remove the selected row
          const updatedRows = rows
            .filter((row) => row.id !== selectedRowData.id)
            .map((row, index) => ({ ...row, id: index + 1 }));

          // Set the updated rows
          setRows(updatedRows);
          setAnchorEl(null);
        };

        const handleOpenModal = (p) => {
          // debugger;
          setRowData(p);
          setOpen(true);
        };

        return (
          <>
            <MoreVertIcon
              fontSize="medium"
              onClick={(event) => handleGridClick(event, params.row)}
            />
            <Menu anchorEl={anchorEl} open={openDD} onClose={handleCloseActionButton}>
              <MenuItem>
                <DeleteIcon onClick={(e) => onDelete(e, params.id)} />
              </MenuItem>
              <MenuItem>
                <EditIcon onClick={() => handleOpenModal(selectedRowData)} />
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const columns1 = [
    { field: "id", headerName: "Sl.No", width: 100 },
    {
      field: "Type",
      headerName: "RI Type",
      // align: "center",
      width: 150,
    },
    {
      field: "AllocatedAmt",
      headerName: "Sum Insured",

      width: 150,
    },
    {
      field: "SumInsuredBal",
      headerName: "Sum Insured Balance",
      width: 200,
    },
    {
      field: "Share",
      headerName: "Limit",

      width: 150,
    },
    {
      field: "%",
      headerName: "Precentage",

      width: 150,
    },
    {
      field: "AllocatedPremium",
      headerName: "Premium",

      width: 150,
    },
  ];
  const handleTpModalDelete = (e, param) => {
    // debugger;
    const rr = tpVehicleArray.filter((z, i) => i !== param);
    setTpVehicleArray([rr]);
  };
  const columns2 = [
    { field: "id", headerName: "Sl.No", width: 100 },

    {
      field: "tpVehicle",
      headerName: "TP Vehicle NO",

      width: 250,
    },

    {
      field: "action",
      headerName: "Action",

      width: 150,
      // renderCell: (params) => (
      // // <Menu>
      // <MenuItem>
      //   <DeleteIcon onClick={(e) => handleTpModalDelete(e, params)} />
      // </MenuItem>
      // // </Menu>
      // <MDButton onClick={(e) => handleTpModalDelete(e, params)}>Delete</MDButton>
      renderCell: (params) => (
        <MDButton onClick={(e) => handleTpModalDelete(e, params.row.id)}>Delete</MDButton>
      ),
      // ),
    },
  ];

  const newData1 = treatyBreakdownArray.map((row, index) => ({ ...row, id: index + 1 }));
  const newData2 = tpVehicleArray.map((row, index) => ({ ...row, id: index + 1 }));

  const handleUpdate = () => {
    setRows(rows);
    setOpen(false);
  };

  const handleClick = () => {
    // const obj=values
    // debugger;
    if (
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.subLossType ===
        "" ||
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.lossType ===
        "" ||
      // values.LossInformation.materialType === "" ||
      // values.LossInformation.particulars === "" ||
      // values.LossInformation.sumInsured === "" ||
      // values.LossInformation.claimAmount === "" ||
      HTextFlag.materialTypeFlag === true ||
      HTextFlag.particularsFlag === true ||
      HTextFlag.sumInsuredFlag === true ||
      HTextFlag.claimAmountFlag === true
    ) {
      setOSFlag(true);
      swal({
        icon: "error",
        text: "Some fields are missing or entered invalid data",
      });
    } else {
      const sno = rows.length + 1;
      const obj = {
        id: sno,
        LossType:
          claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.lossType,
        SubLossType:
          claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.subLossType,
        MaterialType:
          claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation
            .materialType,
        Particulars:
          claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.particulars,
        SumInsured:
          claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.sumInsured,
        ClaimAmount:
          claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.claimAmount,
      };
      setRows((prevRows) => [...prevRows, obj]);
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation = {
        ...losInfoD,
      };
      setClaimJson({ ...claimJson });
    }
  };
  console.log("rows", rows);

  const handleAutoComplete = async (e, value, name) => {
    if (name === "branch") {
      if (value !== null) {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.branch =
          value.mValue;
      } else {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.branch = "";
      }
    }
    if (name === "FiscalYear") {
      if (value !== null) {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.claimFiscalYear =
          value.mValue;
      } else {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.claimFiscalYear =
          "";
      }
    }
    if (name === "LossType") {
      setSubLossType([]);

      if (value !== null) {
        setSubLossType([]);
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.subLossType =
          "";
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.lossType =
          value.mValue;

        const data1 = {
          MasterType: "SubLossType",
          ProductId: 1193,
        };
        const Response = {
          FieldName:
            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation
              .lossType !== ""
              ? value.mID
              : "",
        };
        const subLossType = await master(data1.ProductId, data1.MasterType, Response);
        console.log("subBranch", subLossType);
        if (subLossType !== null && subLossType.data.length >= 1) {
          setSubLossType([...subLossType.data]);
          console.log("subBranch", subLossTypeArray);
        }
      } else {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.lossType = "";
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.subLossType =
          "";
        setSubLossType([]);
      }
    }
    if (name === "sublosstype") {
      if (value !== null) {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.subLossType =
          value.mValue;
      } else {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation.subLossType =
          "";
      }
    }
    if (name === "province") {
      if (value !== null) {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.province =
          value.mValue;
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.provinceId =
          value.mID;
      } else {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.province =
          "";
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.provinceId =
          "";
      }
    }
    if (name === "district") {
      if (value !== null) {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.district =
          value.mValue;
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.districtId =
          value.mID;
      } else {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.district =
          "";
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.districtId =
          "";
      }
    }
    if (name === "municipality") {
      if (value !== null) {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.municipality =
          value.mValue;
      } else {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.municipality =
          "";
      }
    }
    setClaimJson({ ...claimJson });
  };
  const handleDateChange = async (e, d, name) => {
    if (name === "registerDate") {
      // if (PolicyDetails.PolicyStartDate < d && PolicyDetails.PolicyEndDate < d) {
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.registerDate = d;
      //   } else {
      //     Swal.fire({
      //       icon: "error",

      //       text: "Claim Registrations Should be with in Policy Period.",
      //     });
      //   }
    }
    if (name === "dateOfLoss") {
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.dateOfLoss = d;
    }
    if (name === "intimationDate") {
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.intimationDate = d;
    }
    if (name === "claimFormDate") {
      claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.claimFormDate = d;
    }
    setClaimJson({ ...claimJson });
  };

  // const handleBlur = (e, fun, name, path) => {
  //   const value1 = e.target.value.toString();
  //   if (fun(value1) === true) {
  //     setValues({ ...values[path], [name]: value1 });
  //     setHTextFlag({
  //       ...HTextFlag,
  //       [name.concat("Text")]: "",
  //       [name.concat("Flag")]: false,
  //     });
  //   } else {
  //     // setObj({ ...obj, [name]: "" });
  //     const res = fun(value1);
  //     console.log("res", res);
  //     setHTextFlag({
  //       ...HTextFlag,
  //       [name.concat("Text")]: res,
  //       [name.concat("Flag")]: true,
  //     });
  //   }
  // };

  const handleChange1 = async (e, fun, name, path) => {
    // debugger;
    const value1 = e.target.value.toString();
    if (path === "claimDetails") {
      // let value1 = e.target.value.toString();
      if (fun !== "") {
        if (fun(value1) === true) {
          setValues({ ...values[path], [name]: value1 });
          setHTextFlag({
            ...HTextFlag,
            [name.concat("Text")]: "",
            [name.concat("Flag")]: false,
          });

          claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails[name] =
            e.target.value;
        } else {
          // setObj({ ...obj, [name]: "" });
          const res = fun(value1);
          console.log("res", res);
          setHTextFlag({
            ...HTextFlag,
            [name.concat("Text")]: res,
            [name.concat("Flag")]: true,
          });
        }
      } else {
        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails[name] =
          e.target.value;
      }
    }
    if (path === "placeofOccurance") {
      if (fun(value1) === true) {
        setValues({ ...values[path], [name]: value1 });
        setHTextFlag({
          ...HTextFlag,
          [name.concat("Text")]: "",
          [name.concat("Flag")]: false,
        });

        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance[name] =
          e.target.value;

        if (
          claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.Address !==
          ""
        ) {
          const obj = {
            textList: [
              {
                Text: claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance
                  .Address,
              },
            ],
          };
          const res = await Transliteration(obj);
          const Text = res?.[0]?.text ? res[0].text : "";

          claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.placeofOccurance.AddressNepali =
            Text;
        }
      } else {
        // setObj({ ...obj, [name]: "" });
        const res = fun(value1);
        console.log("res", res);
        setHTextFlag({
          ...HTextFlag,
          [name.concat("Text")]: res,
          [name.concat("Flag")]: true,
        });
      }
    }
    if (path === "LossInformation") {
      if (fun(value1) === true) {
        setValues({ ...values[path], [name]: value1 });
        setHTextFlag({
          ...HTextFlag,
          [name.concat("Text")]: "",
          [name.concat("Flag")]: false,
        });

        claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation[name] =
          e.target.value;
      } else {
        // setObj({ ...obj, [name]: "" });
        const res = fun(value1);
        console.log("res", res);
        setHTextFlag({
          ...HTextFlag,
          [name.concat("Text")]: res,
          [name.concat("Flag")]: true,
        });
      }
      // claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.LossInformation[e.target.name] =
      //   e.target.value;
    }
    if (path === "documentData") {
      documentData.docName = e.target.value;
    }
    setDocumentData(documentData);
    setClaimJson({ ...claimJson });
    if (path === "LossInformationModal") {
      // debugger;
      if (rowData) {
        rowData[e.target.name] = e.target.value;
      }
      setRowData(rowData);
    }
  };

  // const handleInput = (e) => {};

  console.log("PolicyDetails", PolicyDetails);
  console.log("claimJsonhhh", claimJson);
  console.log("documentData", documentData);

  return (
    <div>
      <Card>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" color="primary">
              Claim Registration
            </MDTypography>
          </Grid>
          <Grid container spacing={2} p={2} justifyContent="left">
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Policy Number"
                name="policyNo"
                value={SearchObj.policyNo}
                onChange={(e) => handleChange(e)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton
                sx={{ justifyContent: "right" }}
                variant="contained"
                onClick={handleSearch}
                disabled={SearchObj.policyNo === "" || SearchFlag === true}
              >
                SEARCH
              </MDButton>
            </Grid>
          </Grid>

          {flag === true ? (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <MDTypography variant="h5" color="primary">
                      Policy Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} spacing={2}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Policy Number."
                          name="policyNo"
                          value={PolicyDetails && PolicyDetails.PolicyNumber}
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Intimation Number."
                          name="policyNo"
                          value={claimJson && claimJson.regClaimNo}
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Document Number"
                          name="pol"
                          value={docNo !== "" ? docNo : "N/A"}
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Department"
                          name="pol"
                          value={PolicyDetails && PolicyDetails.Department}
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Insured Name"
                          name="insuredName"
                          value={insuredName}
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Policy Period"
                          name="pol"
                          value={
                            PolicyDetails &&
                            `${DateFormateing(
                              PolicyDetails.PolicyStartDate
                            )} ${"-"} ${DateFormateing(PolicyDetails.PolicyEndDate)}`
                          }
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Inward Number"
                          name="pol"
                          value="N/A"
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Declaration/Location Number"
                          name="pol"
                          value="N/A"
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid> */}
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Last Issue Date"
                          name="pol"
                          value=""
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Endorse Type"
                          name="pol"
                          value={endoType !== "" ? endoType : "N/A"}
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Gross Sum Insured"
                          name="pol"
                          value={PolicyDetails && PolicyDetails.PremiumDetails.TotalSumInsured}
                          // inputProps={{ readOnly: true }}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <MDTypography variant="h5" color="primary">
                      Claims Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} spacing={2}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Branch"
                          value={PolicyDetails.Channel.IssuingBranch}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Sub Branch"
                          value={PolicyDetails.Channel.SubBranch}
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Intimation Branch"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.branch
                          }
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          name="FiscalYear"
                          value={{
                            mValue:
                              claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                                .claimDetails.claimFiscalYear,
                          }}
                          options={fiscalYearArray}
                          getOptionLabel={(option) => option.mValue}
                          onChange={(e, value) => handleAutoComplete(e, value, "FiscalYear")}
                          renderInput={(params) => (
                            <MDInput {...params} label="Claim Fiscal Year" required />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDDatePicker
                          fullWidth
                          label="Claim Registration Date"
                          name="registerDate"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.registerDate
                          }
                          // minDate={new Date(PolicyDetails.PolicyStartDate)}
                          // maxDate={new Date(PolicyDetails.PolicyEndDate)}
                          options={{
                            altFormat: "d/m/Y",
                            dateFormat: "m/d/Y",
                            altInput: true,
                            minDate: new Date(PolicyDetails.PolicyStartDate),
                            maxDate: new Date(PolicyDetails.PolicyEndDate),
                          }}
                          input={{
                            label: "Claim Registration Date",
                            value:
                              claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                                .claimDetails.registerDate,

                            required: true,
                          }}
                          onChange={(e, d) => handleDateChange(e, d, "registerDate")}
                          // customOnChange: (e, d) => handleDateChange(e, d, "registerDate"),
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDDatePicker
                          fullWidth
                          label="Date of Loss"
                          name="dateOfLoss"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.dateOfLoss
                          }
                          options={{ altFormat: "d/m/Y", dateFormat: "m/d/Y", altInput: true }}
                          input={{
                            label: "Date of Loss",
                            value:
                              claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                                .claimDetails.dateOfLoss,
                            required: true,
                          }}
                          disabled
                          // onChange={(e, d) => handleDate(e, d, "DOL")}
                          onChange={(e, d) => handleDateChange(e, d, "dateOfLoss")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        {/* <MDDatePicker
                          fullWidth
                          label="Claim Intimation Date"
                          name="intimationDate"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.intimationDate
                          }
                          options={{ altFormat: "d/m/Y", dateFormat: "m/d/Y", altInput: true }}
                          input={{
                            label: "Claim Intimation Date",
                            value:
                              claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                                .claimDetails.intimationDate,
                            required: true,
                          }}
                          // onChange={(e, d) => handleDate(e, d, "DOL")}
                          onChange={(e, d) => handleDateChange(e, d, "intimationDate")}
                        /> */}

                        <MDDatePicker
                          fullWidth
                          name="intimationDate"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.intimationDate
                          }
                          options={{
                            altFormat: "d/m/Y",
                            dateFormat: "m/d/Y",
                            altInput: true,
                          }}
                          input={{
                            label: "Claim Intimation Date",
                            value:
                              claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                                .claimDetails.intimationDate,
                            // required: true,
                            // sx: redAsterisk,
                          }}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDDatePicker
                          fullWidth
                          label="Claim Form Date"
                          name="claimFormDate"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.claimFormDate
                          }
                          options={{ altFormat: "d/m/Y", dateFormat: "m/d/Y", altInput: true }}
                          input={{
                            label: "Claim Form Date",
                            value:
                              claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                                .claimDetails.claimFormDate,
                            required: true,
                          }}
                          // onChange={(e, d) => handleDate(e, d, "DOL")}
                          onChange={(e, d) => handleDateChange(e, d, "claimFormDate")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          name="TreatyType"
                          options={[]}
                          // getOptionLabel={(option) => option.mValue}
                          // onChange={(event, value) =>
                          //   handleAutocomplete(event, value, "TreatyType")
                          // }

                          renderInput={(params) => (
                            <MDInput {...params} label="Claim Cause" required />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Transportation Registration Office"
                          name="trasportRegisterOffice"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.trasportRegisterOffice
                          }
                          // onBlur={handleBlur}

                          onChange={(e) =>
                            handleChange1(
                              e,
                              IsAlphaNumSpace,
                              "trasportRegisterOffice",
                              "claimDetails"
                            )
                          }
                          // onBlur={(e) =>
                          //   handleBlur(e, IsAlpha, "trasportRegisterOffice", "claimDetails")
                          // }
                          error={
                            HTextFlag.trasportRegisterOfficeFlag ||
                            (OSFlag && values.claimDetails.trasportRegisterOffice === "")
                          }
                          helperText={
                            OSFlag && values.claimDetails.trasportRegisterOffice === ""
                              ? helperText
                              : HTextFlag.trasportRegisterOfficeText
                          }
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Affected Property"
                          name="affectedProperty"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.affectedProperty
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpace, "affectedProperty", "claimDetails")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "affectedProperty", "claimDetails")}
                          error={
                            HTextFlag.affectedPropertyFlag ||
                            (OSFlag && values.claimDetails.affectedProperty === "")
                          }
                          helperText={
                            OSFlag && values.claimDetails.affectedProperty === ""
                              ? helperText
                              : HTextFlag.affectedPropertyText
                          }
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Nature of Loss"
                          name="natureOfLoss"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.natureOfLoss
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaSpace, "natureOfLoss", "claimDetails")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "natureOfLoss", "claimDetails")}
                          error={
                            HTextFlag.natureOfLossFlag ||
                            (OSFlag && values.claimDetails.natureOfLoss === "")
                          }
                          helperText={
                            OSFlag && values.claimDetails.natureOfLoss === ""
                              ? helperText
                              : HTextFlag.natureOfLossText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Claimant"
                          name="claimant"
                          value={insuredName}
                          // onChange={(e) => handleChange1(e, IsAlpha, "claimant", "claimDetails")}
                          // // onBlur={(e) => handleBlur(e, IsAlpha, "claimant", "claimDetails")}
                          // error={
                          //   HTextFlag.claimantFlag ||
                          //   (OSFlag && values.claimDetails.claimant === "")
                          // }
                          // helperText={
                          //   OSFlag && values.claimDetails.claimant === ""
                          //     ? helperText
                          //     : HTextFlag.claimantText
                          // }
                          // required
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Email ID"
                          name="EmailId"
                          value={PolicyDetails.ProposerDetails.EmailId}
                          // onChange={(e) => handleChange1(e, "", "EmailId", "claimDetails")}
                          // onBlur={(e) => handleBlur(e, IsEmail, "EmailId", "claimDetails")}
                          // error={
                          //   HTextFlag.EmailIdFlag || (OSFlag && values.claimDetails.EmailId === "")
                          // }
                          // helperText={
                          //   OSFlag && values.claimDetails.EmailId === ""
                          //     ? helperText
                          //     : HTextFlag.EmailIdText
                          // }
                          // required
                          // disabled
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Contact Person Name"
                          name="contactPersonName"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.contactPersonName
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaSpace, "contactPersonName", "claimDetails")
                          }
                          // onBlur={(e) =>
                          //   handleBlur(e, IsAlpha, "contactPersonName", "claimDetails")
                          // }
                          error={
                            HTextFlag.contactPersonNameFlag ||
                            (OSFlag && values.claimDetails.contactPersonName === "")
                          }
                          helperText={
                            OSFlag && values.claimDetails.contactPersonName === ""
                              ? helperText
                              : HTextFlag.contactPersonNameText
                          }
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Mobile Number"
                          name="mobileNumber"
                          value={PolicyDetails.ProposerDetails.MobileNo}
                          // onChange={(e) =>
                          //   handleChange1(e, IsNumber, "mobileNumber", "claimDetails")
                          // }
                          // onBlur={(e) =>
                          //   handleBlur(e, IsMobileNumber, "mobileNumber", "claimDetails")
                          // }
                          // error={
                          //   HTextFlag.mobileNumberFlag ||
                          //   (OSFlag && values.claimDetails.mobileNumber === "")
                          // }
                          // helperText={
                          //   OSFlag && values.claimDetails.mobileNumber === ""
                          //     ? helperText
                          //     : HTextFlag.mobileNumberText
                          // }
                          // required
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Own Vehicle Number"
                          name="ownVehicleNumber"
                          value={PolicyDetails.InsurableItem[0].RiskItems[0].VehicleNoEnglish}
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpace, "ownVehicleNumber", "claimDetails")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "ownVehicleNumber", "claimDetails")}
                          error={
                            HTextFlag.ownVehicleNumberFlag ||
                            (OSFlag && values.claimDetails.ownVehicleNumber === "")
                          }
                          helperText={
                            OSFlag && values.claimDetails.ownVehicleNumber === ""
                              ? helperText
                              : HTextFlag.ownVehicleNumberText
                          }
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Risk Covered"
                          name="riskCovered"
                          // multiline
                          // rows={4}
                          // fullWidth
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.riskCovered
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpace, "riskCovered", "claimDetails")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "riskCovered", "claimDetails")}
                          error={
                            HTextFlag.riskCoveredFlag ||
                            (OSFlag && values.claimDetails.riskCovered === "")
                          }
                          helperText={
                            OSFlag && values.claimDetails.riskCovered === ""
                              ? helperText
                              : HTextFlag.riskCoveredText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Comments"
                          name="comments"
                          multiline
                          rows={2}
                          fullWidth
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.comments
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpace, "comments", "claimDetails")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "comments", "claimDetails")}
                          error={
                            HTextFlag.commentsFlag ||
                            (OSFlag && values.claimDetails.comments === "")
                          }
                          helperText={
                            OSFlag && values.claimDetails.comments === ""
                              ? helperText
                              : HTextFlag.commentsText
                          }
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Remarks"
                          name="Remarks"
                          multiline
                          rows={2}
                          fullWidth
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.Remarks
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpace, "Remarks", "claimDetails")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "Remarks", "claimDetails")}
                          error={
                            HTextFlag.RemarksFlag || (OSFlag && values.claimDetails.Remarks === "")
                          }
                          helperText={
                            OSFlag && values.claimDetails.Remarks === ""
                              ? helperText
                              : HTextFlag.RemarksText
                          }
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="TP Vehicle Number"
                          name="tpVehicleNumber"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.tpVehicleNumber
                          }
                          // onChange={(e) =>
                          //   handleChange1(e, IsNumber, "tpVehicleNumber", "claimDetails")
                          // }
                          // onBlur={(e) => handleBlur(e, IsNumber, "tpVehicleNumber", "claimDetails")}
                          // error={
                          //   HTextFlag.tpVehicleNumberFlag ||
                          //   (OSFlag && values.claimDetails.tpVehicleNumber === "")
                          // }
                          // helperText={
                          //   OSFlag && values.claimDetails.tpVehicleNumber === ""
                          //     ? helperText
                          //     : HTextFlag.tpVehicleNumberText
                          // }
                          // required
                          disabled
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDButton onClick={handleOpenModal1}>Click to add </MDButton>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <MDTypography variant="h5" color="primary">
                      Place of Occurance
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} spacing={2}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput label="Country" value="Nepal" required />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          name="TreatyType"
                          options={provinceArray}
                          getOptionLabel={(option) => option.mValue}
                          onChange={(e, value) => handleAutoComplete(e, value, "province")}
                          renderInput={(params) => (
                            <MDInput {...params} label="Province" required />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          name="district"
                          options={districtArray}
                          getOptionLabel={(option) => option.mValue}
                          onChange={(e, value) => handleAutoComplete(e, value, "district")}
                          renderInput={(params) => (
                            <MDInput {...params} label="District" required />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          name="municipality"
                          options={municipalityArray}
                          getOptionLabel={(option) => option.mValue}
                          onChange={(e, value) => handleAutoComplete(e, value, "municipalityArray")}
                          renderInput={(params) => <MDInput {...params} label="Municipality" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          name="TreatyType"
                          options={[]}
                          // getOptionLabel={(option) => option.mValue}
                          // onChange={(event, value) =>
                          //   handleAutocomplete(event, value, "TreatyType")
                          // }
                          renderInput={(params) => <MDInput {...params} label="Ward Number" />}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Address(English)"
                          name="Address"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .placeofOccurance.Address
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpace, "Address", "placeofOccurance")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "Address", "placeofOccurance")}
                          error={
                            HTextFlag.AddressFlag || (OSFlag && values.claimDetails.Address === "")
                          }
                          helperText={
                            OSFlag && values.claimDetails.Address === ""
                              ? helperText
                              : HTextFlag.AddressText
                          }
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Address(Nepali)"
                          name="AddressNepali"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .placeofOccurance.AddressNepali
                          }
                          // onChange={(e) =>
                          //   handleChange1(e, IsAlpha, "AddressNepali", "placeofOccurance")
                          // }
                          // onBlur={(e) =>
                          //   handleBlur(e, IsAlpha, "AddressNepali", "placeofOccurance")
                          // }
                          // error={
                          //   HTextFlag.AddressNepaliFlag ||
                          //   (OSFlag && values.placeofOccurance.AddressNepali === "")
                          // }
                          // helperText={
                          //   OSFlag && values.placeofOccurance.AddressNepali === ""
                          //     ? helperText
                          //     : HTextFlag.AddressNepaliText
                          // }
                          // required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Area"
                          name="Area"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .placeofOccurance.Area
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpecial, "Area", "placeofOccurance")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "Area", "placeofOccurance")}
                          error={
                            HTextFlag.AreaFlag || (OSFlag && values.placeofOccurance.Area === "")
                          }
                          helperText={
                            OSFlag && values.placeofOccurance.Area === ""
                              ? helperText
                              : HTextFlag.AreaText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Tole"
                          name="Tole"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .placeofOccurance.Tole
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpecial, "Tole", "placeofOccurance")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "Tole", "placeofOccurance")}
                          error={
                            HTextFlag.ToleFlag || (OSFlag && values.placeofOccurance.Tole === "")
                          }
                          helperText={
                            OSFlag && values.placeofOccurance.Tole === ""
                              ? helperText
                              : HTextFlag.ToleText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="House Number"
                          name="HouseNumber"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .placeofOccurance.HouseNumber
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpecial, "HouseNumber", "placeofOccurance")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "HouseNumber", "placeofOccurance")}
                          error={
                            HTextFlag.HouseNumberFlag ||
                            (OSFlag && values.placeofOccurance.HouseNumber === "")
                          }
                          helperText={
                            OSFlag && values.placeofOccurance.HouseNumber === ""
                              ? helperText
                              : HTextFlag.HouseNumberText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Plot Number"
                          name="plotNumber"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .placeofOccurance.plotNumber
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlphaNumSpecial, "plotNumber", "placeofOccurance")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "plotNumber", "placeofOccurance")}
                          error={
                            HTextFlag.plotNumberFlag ||
                            (OSFlag && values.placeofOccurance.plotNumber === "")
                          }
                          helperText={
                            OSFlag && values.placeofOccurance.plotNumber === ""
                              ? helperText
                              : HTextFlag.plotNumberText
                          }
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <MDTypography variant="h5" color="primary">
                      Loss Information
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} spacing={2}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          name="LossType"
                          options={lossTypeArray}
                          value={{
                            mValue:
                              claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                                .LossInformation.lossType,
                          }}
                          getOptionLabel={(option) => option.mValue}
                          onChange={(e, value) => handleAutoComplete(e, value, "LossType")}
                          renderInput={(params) => (
                            <MDInput {...params} label="Loss Type" required />
                          )}
                          // renderInput={(params) => (
                          //   <MDInput
                          //     error={
                          //       OSFlag &&
                          //       claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                          //         .LossInformation.lossType === ""
                          //     }
                          //     helperText={
                          //       OSFlag &&
                          //       claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                          //         .LossInformation.lossType === ""
                          //         ? helperText
                          //         : ""
                          //     }
                          //     required
                          //     {...params}
                          //     label="Loss Type"
                          //   />
                          // )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          ref={autocompleteRef}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          name="LossType"
                          options={subLossTypeArray}
                          getOptionLabel={(option) => option.mValue}
                          value={{
                            mValue:
                              claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                                .LossInformation.subLossType,
                          }}
                          onChange={(e, value) => handleAutoComplete(e, value, "sublosstype")}
                          renderInput={(params) => (
                            <MDInput {...params} label="Sub Loss Type" required />
                          )}
                          // renderInput={(params) => (
                          //   <MDInput
                          //     error={
                          //       OSFlag &&
                          //       claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                          //         .LossInformation.subLossType === ""
                          //     }
                          //     helperText={
                          //       OSFlag &&
                          //       claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                          //         .LossInformation.subLossType === ""
                          //         ? helperText
                          //         : ""
                          //     }
                          //     required
                          //     {...params}
                          //     label="Sub Loss Type"
                          //   />
                          // )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Material Type"
                          name="materialType"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .LossInformation.materialType
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlpha, "materialType", "LossInformation")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "materialType", "LossInformation")}
                          error={
                            HTextFlag.materialTypeFlag ||
                            (OSFlag && values.LossInformation.materialType === "")
                          }
                          helperText={
                            OSFlag && values.LossInformation.materialType === ""
                              ? helperText
                              : HTextFlag.materialTypeText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Particulars"
                          name="particulars"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .LossInformation.particulars
                          }
                          onChange={(e) =>
                            handleChange1(e, IsAlpha, "particulars", "LossInformation")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "particulars", "LossInformation")}
                          error={
                            HTextFlag.particularsFlag ||
                            (OSFlag && values.LossInformation.particulars === "")
                          }
                          helperText={
                            OSFlag && values.LossInformation.particulars === ""
                              ? helperText
                              : HTextFlag.particularsText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Sum Insured"
                          name="sumInsured"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .LossInformation.sumInsured
                          }
                          onChange={(e) =>
                            handleChange1(e, IsNumber, "sumInsured", "LossInformation")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "sumInsured", "LossInformation")}
                          error={
                            HTextFlag.sumInsuredFlag ||
                            (OSFlag && values.LossInformation.sumInsured === "")
                          }
                          helperText={
                            OSFlag && values.LossInformation.sumInsured === ""
                              ? helperText
                              : HTextFlag.sumInsuredText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Claim Amount"
                          name="claimAmount"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .LossInformation.claimAmount
                          }
                          onChange={(e) =>
                            handleChange1(e, IsNumber, "claimAmount", "LossInformation")
                          }
                          // onBlur={(e) => handleBlur(e, IsAlpha, "HouseNumber", "LossInformation")}
                          error={
                            HTextFlag.claimAmountFlag ||
                            (OSFlag && values.LossInformation.claimAmount === "")
                          }
                          helperText={
                            OSFlag && values.LossInformation.claimAmount === ""
                              ? helperText
                              : HTextFlag.claimAmountText
                          }
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Stack direction="row" spacing={2} justifyContent="right">
                          {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} spacing={2}> */}
                          <MDButton onClick={handleClick}>Add</MDButton>
                          <MDButton onClick={handleReset}>Reset</MDButton>
                          {/* </Grid> */}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {/* <DataGrid rows={newData1} columns={columns} pageSizeOptions={[5, 10]} /> */}
                        <Box sx={{ height: 350, width: "100%" }}>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                          />
                        </Box>
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Estimated Loss/OD"
                          name="claimAmount"
                          // value={
                          //   claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                          //     .LossInformation.claimAmount
                          // }
                          onChange={(e) => handleChange1(e, "LossInformation")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Estimated TP"
                          name="claimAmount"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .LossInformation.claimAmount
                          }
                          onChange={(e) => handleChange1(e, "LossInformation")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Total Est. Loss"
                          name="claimAmount"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .LossInformation.claimAmount
                          }
                          onChange={(e) => handleChange1(e, "LossInformation")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Estimated Surveyor Fee"
                          name="claimAmount"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .LossInformation.claimAmount
                          }
                          onChange={(e) => handleChange1(e, "LossInformation")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Gross Estimate"
                          name="claimAmount"
                          value={
                            claimJson.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .LossInformation.claimAmount
                          }
                          onChange={(e) => handleChange1(e, "LossInformation")}
                        />
                      </Grid>
                      {/* </Grid> */}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <MDTypography variant="h5" color="primary">
                      RI Recovery
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} spacing={2}>
                      {/* {treatyBreakdownArray.map((x) => ( */}
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {/* <Stack direction="row" justifyContent="right" spacing={2} p={2}>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                              <MDTypography>{x.Type}</MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                value={x.Share}
                                // inputProps={{ readOnly: true }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                value={x.AllocatedAmt}
                                // inputProps={{ readOnly: true }}
                              />
                            </Grid>
                          </Stack> */}

                        <Box sx={{ height: 350, width: "100%" }}>
                          <DataGrid
                            rows={newData1}
                            columns={columns1}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                          />
                        </Box>
                      </Grid>
                      {/* ))} */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography>Nepal RI</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography>Himalayan RI</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography>Retention</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography>Quota</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography>Surplus I</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography>Surplus II</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography>Auto Fac</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography>Facultative Recovery</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label=""
                          name="pol"
                          value="INT00000007121"
                          // inputProps={{ readOnly: true }}
                        />
                      </Grid> */}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <MDTypography variant="h5" color="primary">
                      Document Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} P={3}>
                      <MDButton
                        variant="outlined"
                        color="error"
                        startIcon={<AddIcon />}
                        onClick={(e) => handleAddDocument(e)}
                        sx={{ marginLeft: "1rem" }}
                      >
                        Add Document
                      </MDButton>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}

                    <Stack direction="row" spacing={2} p={2}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Document Name"
                          value={documentData.docName}
                          onChange={(e) => handleChange1(e, "documentData")}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                        <label htmlFor="upload">
                          <input
                            id="upload"
                            name="upload"
                            accept="image/jpeg,application/pdf"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileUpload(e)}
                            // disabled={otherUploadFlag[id]}
                            onClick={(e) => {
                              e.target.value = "";
                            }}
                          />
                          <MDButton variant="outlined" color="error" component="span">
                            Upload
                          </MDButton>
                        </label>
                      </Grid>
                      {documentData.fileName !== "" ? (
                        <>
                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <p> {documentData && documentData.fileName}</p>
                          </Grid>

                          <Grid iitem xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                            <IconButton onClick={handleDeleteupload}>
                              <CancelIcon
                                fontSize="large"
                                color="error"
                                // sx={{ mt: "-0.5rem" }}
                              />
                            </IconButton>
                          </Grid>
                        </>
                      ) : null}
                    </Stack>
                    {otherUpload.map((x, id) => (
                      <Stack direction="row" spacing={2} p={2}>
                        <React.Fragment key={x}>
                          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                            <MDInput
                              label="Document Name"
                              name="other"
                              value={x.docName}
                              onChange={(e) => handleAddother(e, id, "other")}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                            <label htmlFor={`otherfile-upload-${id}`}>
                              <input
                                id={`otherfile-upload-${id}`}
                                name={`otherfile-upload-${id}`}
                                accept="image/jpeg,application/pdf"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleOtherFileUpload(id, e)}
                                disabled={otherUploadFlag[id]}
                                onClick={(e) => {
                                  e.target.value = "";
                                }}
                              />
                              <MDButton variant="outlined" color="error" component="span">
                                Upload
                              </MDButton>
                            </label>
                          </Grid>

                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            {/* <Grid sx={{ fontSize: "14px" }}> */}
                            <p> {otherUpload[id] && otherUpload[id].fileName}</p>
                            {/* </Grid> */}
                          </Grid>
                          {otherUpload[id] && otherUpload[id].fileName && (
                            <Grid iitem xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                              <IconButton onClick={(e) => handleOtherRemove(id, e)}>
                                <CancelIcon
                                  fontSize="large"
                                  color="error"
                                  // sx={{ mt: "-0.5rem" }}
                                />
                              </IconButton>
                            </Grid>
                          )}
                          {/* <Grid item xs={1}> */}
                          {otherUpload && (
                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteOther(id)}
                                color="primary"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          )}
                          {/* </Grid> */}
                        </React.Fragment>{" "}
                      </Stack>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={2} p={2}>
                  <MDButton onClick={onClaimSave}>Submit</MDButton>
                </Stack>
              </Grid>
            </>
          ) : null}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* {rowData.map((x, i) => ( */}
              <Grid
                container
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                spacing={2}
                // key={x[selectedIndex]}
              >
                <Grid container justifyContent="end" alignItems="end">
                  <MDButton variant="text" onClick={handleClose}>
                    <ClearIcon />
                  </MDButton>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5" color="primary">
                    Loss Information
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    name="LossType"
                    options={lossTypeArray}
                    value={{ mValue: rowData.LossType }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) => handleAutoComplete(e, value, "losstypemodal")}
                    renderInput={(params) => <MDInput {...params} label="Loss Type" />}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    name="LossType"
                    options={subLossTypeArray}
                    value={{ mValue: rowData.SubLossType }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) => handleAutoComplete(e, value, "sublosstypemodal")}
                    renderInput={(params) => <MDInput {...params} label="Sub Loss Type" />}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Material Type"
                    name="MaterialType"
                    value={rowData.MaterialType}
                    // value={x[selectedIndex]}
                    onChange={(e) => handleChange1(e, "LossInformationModal")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Particulars"
                    name="Particulars"
                    value={rowData.Particulars}
                    onChange={(e) => handleChange1(e, "LossInformationModal")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Sum Insured"
                    name="SumInsured"
                    value={rowData.SumInsured}
                    onChange={(e) => handleChange1(e, "LossInformationModal")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Claim Amount"
                    name="ClaimAmount"
                    value={rowData.ClaimAmount}
                    onChange={(e) => handleChange1(e, "LossInformationModal")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack justifyContent="center" direction="row">
                    <MDButton onClick={() => handleUpdate()}>Update</MDButton>
                  </Stack>
                </Grid>
              </Grid>
              {/* ))} */}
            </Box>
          </Modal>

          <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style1}>
              {/* {rowData.map((x, i) => ( */}
              <Grid
                container
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                spacing={2}
                // key={x[selectedIndex]}
              >
                <Grid container justifyContent="end" alignItems="end">
                  <MDButton variant="text" onClick={handleClose1}>
                    <ClearIcon />
                  </MDButton>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5" color="primary">
                    TP Vehicle Number
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="TP Vehicle Number"
                    name="TpVehicle"
                    value={tp.tpVehicle}
                    onChange={(e) => setTp({ tpVehicle: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDButton onClick={handleTpVehicle}>Add</MDButton>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={newData2}
                      columns={columns2}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack justifyContent="center" direction="row">
                    <MDButton onClick={TpVehicleUpdate}>Update</MDButton>
                  </Stack>
                </Grid>
              </Grid>
              {/* ))} */}
            </Box>
          </Modal>
        </Grid>
      </Card>
    </div>
  );
}
export default ClaimRegistration;
