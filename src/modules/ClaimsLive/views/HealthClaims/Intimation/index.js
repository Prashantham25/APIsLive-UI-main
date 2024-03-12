import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Autocomplete,
  Backdrop,
  Step,
  Stepper,
  StepLabel,
  IconButton,
  Radio,
  Stack,
} from "@mui/material";
// import loader from "assets/images/Gifs/loading4.gif";
import magmapayment from "assets/images/Magma/magmapayment.png";
import scanningGIF from "assets/images/Magma/scanning-GIF.gif";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import swal from "sweetalert";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
// import MDAutocomplete from "../../../../../components/MDAutocomplete";
import MDButton from "../../../../../components/MDButton";
import MDDatePicker from "../../../../../components/MDDatePicker";
import {
  diffDaysCalculator,
  IsNumeric,
  IsAlpha,
  IsAlphaSpace,
  IsAlphaNum,
} from "../../../../../Common/Validations";
import { get } from "../../../../../Common/RenderControl/objectPath";
import {
  GetPolicyInfoByPolicyNumber,
  SearchClaimDetailsByRegClaimNo,
  // SaveClaimDetails,
  // GetMemberdetailsByUHID,
  GetPayLoadByQueryDynamic,
  // getDocumentData,
  GetDocumentApimId,
  // getInvoiceData,
  GetBenefits,
  UploadFiles,
  DeleteFile,
  getProdPartnermasterData,
  getProdPartnermasterDatas,
  GenericApi,
  master,
  // SendNotification,
  EventCommunicationExecution,
  GetUserById,
  GetUsersRoles,
  SaveClaimHistory,
  SaveClaimWFStatus,
  updateStageStatusIdByTno,
  claimsDedupe,
  claimgetProductByCode,
  masterIFSC,
  GetPaymentDetails,
  UpdateClaimDetails,
  GetDocumentDataByApimId,
  GetInvoiceApimId,
  GetInvoiceDataByApimId,
} from "../data/index";
// import { useDataController } from "../../../../BrokerPortal/context";
import { HelathJson } from "../data/JsonData";

function RenderControl({
  item,
  claimDetails,
  setClaimDetails,
  setArray1,
  setArray2,
  setArray3,
  setArrayD,
  Array1,
  Array2,
  Array3,
  ArrayD,
  setOtherUpload,
  intimation,
  setIntimation,
  SearchObj,
  setArray4,
  setArray5,
  setArray6,
  array4,
  array5,
  // intimaDocument,
  array6,
  setInDocument,
  setArrayDD,
  arrayDD,
  // policyDetails,
  setUploadFlags,
  upload,
  setOtherUploadFlag,
  otherUpload,
  // setDisable,
}) {
  // console.log("intiaDocumentssss", intimaDocument);
  // const [controller] = useDataController();
  // const { policyData } = controller;
  // console.log("policyData", policyDetails);

  const val = item.value ? item.value : get(claimDetails, item.path ? item.path : "");
  const value1 = val !== undefined ? val : "";
  const [errorText, setErrorText] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  useEffect(() => {
    setErrorText(item.errtext);
    // if (isBoolean(item.error)) setErrorFlag(item.error);
    setErrorFlag(item.error);
  }, [item.error, item.errtext]);
  useEffect(() => {
    if (errorFlag === true && errorText === "This field required") {
      if (item.multiple && item.multiple === true && value1.length !== 0) {
        setErrorText("");
        setErrorFlag(false);
      } else if (value1 !== "") {
        setErrorText("");
        setErrorFlag(false);
      }
    }
  }, [value1]);
  const isFunction = (value) => {
    console.log(typeof value);
    if (typeof value === "function") {
      return true;
    }
    return false;
  };

  const valChangFunc = [
    { funName: "IsNumeric", fun: IsNumeric },
    { funName: "IsAlpha", fun: IsAlpha },
    // { funName: "COIRegex", fun: COIRegex },
  ];

  const onInputChange = (e) => {
    const claimData = claimDetails;
    if (isFunction(item.customOnChange)) {
      item.customOnChange(e);
    } else {
      switch (item.path) {
        case "memberDetails":
          claimData.claimBasicDetails.memberDetails[e.target.name] = e.target.value;
          setClaimDetails((prev) => ({ ...prev, ...claimData }));
          break;
        case "transactionDetails":
          claimData.transactionDataDTO[0].transactionDetails[e.target.name] = e.target.value;
          setClaimDetails((prev) => ({ ...prev, ...claimData }));
          break;
        case "hospitalDetails":
          claimData.transactionDataDTO[0].transactionDetails.hospitalDetails[e.target.name] =
            e.target.value;
          setClaimDetails((prev) => ({ ...prev, ...claimData }));
          break;
        case "hospitalizationDetails":
          claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[e.target.name] =
            e.target.value;
          setClaimDetails((prev) => ({ ...prev, ...claimData }));
          break;
        case "paymentObj":
          claimData.transactionDataDTO[0].transactionDetails.paymentObj[e.target.name] =
            e.target.value;
          setClaimDetails((prev) => ({ ...prev, ...claimData }));
          break;
        default:
          claimData[e.target.name] = e.target.value;
          break;
      }

      // Check if item.onChangeFuncs is an array
      if (Array.isArray(item.onChangeFuncs)) {
        const par = Array.isArray(item.parameters) ? item.parameters : [""];
        // Use forEach to iterate through each function in item.onChangeFuncs
        item.onChangeFuncs.forEach((fun) => {
          // Find the corresponding function definition in valChangFunc
          const funName = valChangFunc.find((x) => x.funName === fun || x.fun === fun);
          if (funName) {
            if (funName.fun(e.target.value, ...par) === true) {
              // Update claimData and clear error
              claimData.transactionDataDTO[0].transactionDetails[item.path][e.target.name] =
                e.target.value;
              setErrorFlag(false);
              setErrorText("");
            } else {
              // Set error and return if validation fails
              setErrorFlag(true);
              setErrorText(funName.fun(e.target.value));
            }
          } else if (fun(e.target.value, ...par) === true) {
            // Update claimData and clear error
            claimData.transactionDataDTO[0].transactionDetails[item.path][e.target.name] =
              e.target.value;
            setErrorFlag(false);
            setErrorText("");
          } else {
            // Set error and return if validation fails
            setErrorFlag(true);
            setErrorText(fun(e.target.value));
          }
        });
      } else {
        // Update claimData if item.onChangeFuncs is not an array
        claimData.transactionDataDTO[0].transactionDetails[item.path][e.target.name] =
          e.target.value;
      }
      // Update the state with the modified claimData
      setClaimDetails((prev) => ({ ...prev, ...claimData }));
    }
  };
  const onDateTimeChange = (e, d) => {
    const claimData = claimDetails;
    const today = new Date(e[0].toDateString()).toLocaleDateString();
    let [dd, mm, yyyy] = today.split("/");

    if (dd <= 9) {
      dd = `0${dd}`;
    }
    if (mm <= 9) {
      mm = `0${mm}`;
    }
    yyyy = `${yyyy}`;
    console.log("yyyy", yyyy);
    // const ab = `${dd}/${mm}/${yyyy}`;

    switch (item.path) {
      case "hospitalizationDetails":
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[item.name] = d;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      // case "DateofAdmission":
      //   claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[item.doa] = ab;
      //   setClaimDetails((prev) => ({ ...prev, ...claimData }));
      //   break;
      // case "DateofDischarge":
      //   claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[item.dod] = ab;
      //   setClaimDetails((prev) => ({ ...prev, ...claimData }));
      //   break;
      default:
        break;
      // }
    }
    if (
      claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !== "" &&
      claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa !== ""
    ) {
      const lengthOfStay = diffDaysCalculator(
        new Date(claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa),
        new Date(claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod)
      );
      setClaimDetails({ ...claimDetails, ...claimData });

      if (lengthOfStay !== "") {
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay =
          lengthOfStay;
      }
      if (
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay !==
          "" &&
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay >=
          claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible &&
        claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Hospicash"
      ) {
        claimData.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
          claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay -
          claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible;
        // setClaimsJson(dispatch, { ...ClaimsJson, ...GenericApiResult.finalResult });
        // }
        // const arr = [];
      } else {
        claimData.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = 0;
      }

      // if (
      //   claimData.transactionDataDTO[0].transactionDetails.benefitDetails.NoofDaysFromCToInjury ===
      //   ""
      // ) {
      //
      //   const NoOfdyasCtoA = diffDaysCalculator(
      //     (claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa),
      //     (policyDetails[0].policyRequest.InsurableItem[0].RiskItems[0].DOC)
      //   );
      // }
      // policyDetails[0].policyRequest.InsurableItem[0].RiskItems.forEach((x, i) => {
      //   // for (i = 0; i < arr.length; i += 1) {
      //   const NoOfdyasCtoA = diffDaysCalculator(
      //     claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
      //     x.DOC
      //   );
      //   arr.push(NoOfdyasCtoA[1]);
      //   // }
      // });
      //
      // const riskItems = policyDetails[0].policyRequest.InsurableItem[0].RiskItems;
      // for (let i = 0; i < riskItems.length; i++) {
      //   // const riskItem = riskItems[i];
      //   const NoOfdyasCtoA = diffDaysCalculator(
      //     claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
      //     riskItems[i].DOC
      //   );
      //   console.log("NOOFDAYSCTOA", NoOfdyasCtoA);
      // }
      setClaimDetails({ ...claimDetails, ...claimData });
    }
  };

  const handleAutoComplete = async (e, value) => {
    const claimData = claimDetails;
    const intimationData = intimation;
    // const intimationDoc = intimaDocument;
    if (isFunction(item.customOnChange)) {
      item.customOnChange(e, value);
    } else {
      switch (item.path) {
        case "benefitDetails":
          {
            setOtherUploadFlag(Array(otherUpload.length).fill(false));
            setUploadFlags(Array(upload.length).fill(false));
            claimData.transactionDataDTO[0].transactionDetails.documentDetails = [];
            setOtherUpload([]);
            // intimationDoc = "";
            // setInDocument([]);
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = "";
            claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = "";
            if (SearchObj.IntimationNo !== "") {
              // intimationDoc = "";
              setInDocument([]);
              intimationData[0].transactionDataDTO[0].transactionDetails.documentDetails = [];
              intimationData[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefit =
                "";
              intimationData[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName =
                "";
            }

            if (
              Array1 !== "" ||
              Array2 !== "" ||
              Array3 !== "" ||
              ArrayD !== "" ||
              array4 !== "" ||
              array5 !== "" ||
              array6 !== "" ||
              arrayDD !== ""
            ) {
              setArray1([]);
              setArray2([]);
              setArray3([]);
              setArrayD([]);
              setArray4([]);
              setArray5([]);
              setArray6([]);
              setArrayDD([]);
            }
            setClaimDetails((prev) => ({ ...prev, ...claimData }));
            setIntimation((prev) => ({ ...prev, ...intimationData }));
            const data = {
              MasterType: "BenefitType",
            };
            const data1 = { productId: 1022, MasterType: "BenefitType" };
            const abc = await getProdPartnermasterData(data1.productId, data1.MasterType, data);
            console.log("adccc", abc);
            abc.data.filter((x) => {
              // if (
              //   claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName === ""
              // ) {
              //   setDisable(false);
              // }
              if (x.mValue === value) {
                claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = x.mID;
                claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName =
                  x.mValue;
              }
              if (SearchObj.IntimationNo !== "") {
                if (x.mValue === value) {
                  intimationData[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefit =
                    x.mID;
                  intimationData[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName =
                    x.mValue;
                }
              }
              // else if (x.mValue !== value) {
              //   claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = x.mID;
              //   claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName =
              //     x.mValue;
              // } else {
              //   console.log(
              //     " claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName",
              //     claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName
              //   );
              // }
              setIntimation((prev) => ({ ...prev, ...intimationData }));
              setClaimDetails((prev) => ({ ...prev, ...claimData }));
              console.log("1001", claimDetails);
              return true;
            });
          }
          // claimData.transactionDataDTO[0].transactionDetails.benefitDetails[item.name] = value.mID;
          // claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = value;
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                label={item.label}
                name={item.name}
                value={item.value}
                disabled={item.disable}
                onChange={(e) => onInputChange(e)}
                helperText={errorText}
                error={errorFlag}
                // inputProps={item.type}
              />
            );
          case "DateTime":
            return (
              <MDDatePicker
                // input={{ label: item.label }}
                input={{ label: item.label, value: item.value }}
                name={item.name}
                value={item.value}
                maxDate={item.maxDate}
                options={{
                  altFormat: "d/m/Y",
                  dateFormat: "Y-m-d",
                  altInput: true,
                  minDate: item.minDate,
                  maxDate: item.maxDate,
                }}
                onChange={(e, d) => onDateTimeChange(e, d)}
              />
            );
          case "AutoComplete":
            return (
              <Autocomplete
                // options={item.option}
                options={item.option ? item.option : []}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={
                //   item.multiple
                //     ? item.value
                //     : { [item.optionLabel ? item.optionLabel : "mValue"]: item }
                // }
                // value={{ [item.optionLabel ? item.optionLabel : "mValue"]: item.value }}
                value={item.value}
                getOptionLabel={(option) => option}
                // getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleAutoComplete(e, value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label={item.label}
                    value={item.value}
                    onChange={(e) => handleAutoComplete(e, e.target.value)}
                  />
                )}
              />
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function Intimation() {
  const [claimDetails, setClaimDetails] = useState(HelathJson);
  const [disableFlag, setDisableFlag] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [benefitType, setBenefitType] = useState([]);
  const [policyDetails, setPolicyDetails] = useState({});
  const [benefit, setBenefit] = useState([]);
  const [disableproceed, setDisable] = useState(true);
  const [handwrittentrue, sethandwrittentrue] = useState(false);
  const [uhid, setuhid] = useState();
  const [policytype, setpolicytype] = useState();
  const [uhiddata, setUhidData] = useState();

  const handleSelectionModelChange = async (params) => {
    setDisableFlag(true);
    const obj = {
      reportname: "Magma_GetMemberDetails",
      paramList: [
        {
          ParameterName: "memberID",
          ParameterValue: uhid,
        },
      ],
    };
    const GetUse = await GetPayLoadByQueryDynamic(obj);
    const memberDatas = GetUse.data.finalResul;
    setUhidData(GetUse);
    if (policytype === "NonFloater") {
      const arr1 = [];
      policyDetails[0].policyRequest.Benefit.forEach((x) => {
        arr1.push({
          CoverName: x.CoverName,
          Benefit: x.Benefit,
          Value: x.Value,
        });
        claimDetails.claimBasicDetails.memberDetails.MemberBenefit = arr1;
        console.log("arr1", arr1);
      });
      console.log("GetUseDetails", memberDatas);
    }
    claimDetails.claimBasicDetails.memberDetails.memberId = params.row.UHID;
    claimDetails.claimBasicDetails.memberDetails.insuredName = params.row.Name;
    claimDetails.claimBasicDetails.memberDetails.Relationship = params.row.RelationShipToProposer;
    setBenefit([]);
    setBenefitType([]);
    // claimDetails.claimBasicDetails.memberDetails.Relationship=
    setSelectedRow(params.row.UHID);
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

    const Payload = {
      productCode: "MagmaHospiCash01",
      // planType: "TestPlan1",
      planType: policyDetails[0].policyRequest.Plan,
      filterCriteria: [
        {
          SI: "",
          Type: "",
          Region: "",
          currency: "INR",
        },
      ],
      isFilterMemberWise: false,
      setBenefitMemberWise: false,
      insurableItems: null,
    };
    const res1 = await GetBenefits(Payload);
    console.log("res1", res1);

    const arr = [];
    const arr1 = [];
    const arr2 = [];

    if (res1.status === 1) {
      res1.finalResult.benefits.forEach((x) => {
        arr.push({
          relationships: x.Relationship.split(","),
          coverName: x.CoverName,
        });
        arr1.push(x.Relationship.split(","));
        arr1.forEach((s, i) => {
          if (claimDetails.claimBasicDetails.memberDetails.Relationship === s[i]) {
            arr2.push(x.CoverName);
            const data = arr2.map((mValue, index) => ({ mID: index + 1, mValue }));
            claimDetails.claimBasicDetails.benefitDetails = data;
          }
        }, []);
      });
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

      arr.forEach((xy) => {
        xy.relationships.forEach((yy) => {
          if (yy === claimDetails.claimBasicDetails.memberDetails.Relationship) {
            benefit.push(xy.coverName);
            setBenefit([...benefit]);
          }
        });
      });
    }

    setBenefitType([...benefitType]);
  };

  useEffect(() => {
    console.log("uhiddata", uhiddata);
  }, [uhiddata]);

  const tableColumns = [
    {
      field: "radiobutton",
      headerName: "Select",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        console.log("member details", params);
        return (
          <Radio
            onClick={() => handleSelectionModelChange(params)}
            checked={selectedRow === params.row.UHID}
          />
        );
      },
    },
    {
      field: "UHID",
      headerName: "UHID",
      width: 280,
    },
    {
      field: "Name",
      headerName: "Member Name",
      width: 250,
    },
  ];

  const [tableRows, setTableRows] = useState([]);
  const [SearchObj, SetSearchObj] = useState({ policyNo: "", UHID: "", IntimationNo: "" });
  const [stepForward, setStepForword] = useState(0);
  const [memFlag, setMemFlag] = useState(false);
  const [detailsFlag, setDetailsFlag] = useState(false);
  const [ocrFlag, setOCRFlag] = useState(false);
  // const [load, setLoader] = useState(false);
  const [validate, setValidate] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [array3, setArray3] = useState([]);
  const [arrayD, setArrayD] = useState([]);
  const [documentflag, setDocumentFlag] = useState(false);
  const [patientNameFlag, setPatientNameFlag] = useState(false);
  const [ocrPincodeflag, setOcrPincodeFlag] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [intimation, setIntimation] = useState([]);
  const [cityDistrict, setCityDistrict] = useState([]);
  const [cityDistrictD, setCityDistrictD] = useState([]);
  const [stateR, setStateR] = useState([]);
  const [bankMasterData, setBankMasterData] = useState([]);
  const [bankMastersData, setBankMastersData] = useState([]);
  const [financierArray, setFinancierArray] = useState([]);
  const [pincode, setPincode] = useState([]);
  const [upload, setUpload] = useState([]);
  const [uploadD, setUploadD] = useState([]);
  const [uploadFlags, setUploadFlags] = useState(Array(upload.length).fill(false));
  // const [pol, setPol] = useState();
  console.log("upload", upload);
  console.log("agreement", agreement);
  console.log("uploadD", uploadD);
  // const [inupload, setInUpload] = useState([]);
  const [intimaDocument, setInDocument] = useState([]);
  const [array4, setArray4] = useState([]);
  const [array5, setArray5] = useState([]);
  const [array6, setArray6] = useState([]);
  const [arrayDD, setArrayDD] = useState([]);
  const [otherUpload, setOtherUpload] = useState([]);
  const [otherUploadFlag, setOtherUploadFlag] = useState(Array(upload.length).fill(false));
  const [stepperFlag, setStepperFlag] = useState(false);
  const [ocrSwalFlag, setOcrSwalFlag] = useState(false);
  const [ifscArr1, setIfscArr1] = useState([]);
  const [ifscBank, setIfscBank] = useState([]);
  const [loading, setLoading] = useState(false);
  const steps = ["Validate", "Select Members", "Intimate Claim"];
  // const [docDetails, setDocDetails] = useState({
  //   contentType: "",
  //   docId: "",
  //   docName: "",
  //   docType: "",
  //   docTypeName: "",
  //   UploadDocDate: "",
  // });
  // const [benefit, setBenefit] = useState([{ mID: "0", mValue: "HospiCash" }]);
  // const benefit = [{ mID: "0", mValue: "HospiCash" }];
  const [flags, setFlags] = useState({
    nameReg: false,
    uhidReg: false,
    intimationReg: false,
    coiflag: false,
    uhidflag: false,
    intimationflag: false,
    searchbuttonflag: false,
  });
  // const [errorText1, setErrorText1] = useState();
  const handleOnBlur = (event) => {
    if (event.target.name === "policyNo" && SearchObj.policyNo !== "") {
      const numRegex = /^[A-Z0-9'//-]*$/;
      if (!numRegex.test(event.target.value) || event.target.value.length !== 37) {
        setFlags((prevState) => ({ ...prevState, nameReg: true }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, nameReg: false }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: false }));
      }
    }
    console.log("flags", flags.searchbuttonflag);

    if (event.target.name === "UHID" && SearchObj.UHID !== "") {
      // if (event.target.value.length < 18) {
      const regex = /^[a-zA-Z0-9]*$/;
      if (!regex.test(event.target.value) || event.target.value.length !== 17) {
        setFlags((prevState) => ({ ...prevState, uhidReg: true }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, uhidReg: false }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: false }));
      }
      // }
    }
    if (event.target.name === "IntimationNo" && SearchObj.IntimationNo !== "") {
      // if (event.target.value.length < 18) {
      const regex = /^[a-zA-Z0-9]*$/;
      if (!regex.test(event.target.value) || event.target.value.length !== 13) {
        setFlags((prevState) => ({ ...prevState, intimationReg: true }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, intimationReg: false }));
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: false }));
      }
      // }
    }
  };

  // const handleChange = (e) => {
  //   SearchObj[e.target.name] = e.target.value;
  //   SetSearchObj((prev) => ({ ...prev, ...SearchObj }));
  //   if (e.target.name === "policyNo" && SearchObj.policyNo !== "") {
  //     setFlags((prevState) => ({ ...prevState, uhidflag: true }));
  //     setFlags((prevState) => ({ ...prevState, intimationflag: true }));
  //   }
  //   if (e.target.name === "UHID") {
  //     setFlags((prevState) => ({ ...prevState, coiflag: true }));
  //     setFlags((prevState) => ({ ...prevState, intimationflag: true }));
  //   }
  //   if (e.target.name === "IntimationNo") {
  //     setFlags((prevState) => ({ ...prevState, coiflag: true }));
  //     setFlags((prevState) => ({ ...prevState, uhidflag: true }));
  //   }
  //   // setFlags(flags);
  // };
  const handleChange = (e) => {
    const updatedSearchObj = { ...SearchObj, [e.target.name]: e.target.value };
    SetSearchObj(updatedSearchObj);

    if (e.target.name === "policyNo" && updatedSearchObj.policyNo !== "") {
      setFlags((prevState) => ({ ...prevState, uhidflag: true }));
      setFlags((prevState) => ({ ...prevState, intimationflag: true }));
    } else if (e.target.name === "UHID" && updatedSearchObj.UHID !== "") {
      setFlags((prevState) => ({ ...prevState, coiflag: true }));
      setFlags((prevState) => ({ ...prevState, intimationflag: true }));
    } else if (e.target.name === "IntimationNo" && updatedSearchObj.IntimationNo !== "") {
      setFlags((prevState) => ({ ...prevState, coiflag: true }));
      setFlags((prevState) => ({ ...prevState, uhidflag: true }));
    } else {
      // If no value is entered, enable all input fields
      setFlags({
        coiflag: false,
        uhidflag: false,
        intimationflag: false,
      });
    }
  };
  // console.log("pol", pol);
  console.log("Documents", documents);
  console.log("Document", document);

  const userNameId1 = localStorage.getItem("userId");
  const Medical = localStorage.getItem("roleId");
  console.log("Medicaluser", Medical);
  console.log("userid", userNameId1);

  useEffect(async () => {
    setStepperFlag(true);
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    if (claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit !== "") {
      const data2 = { ProductId: 1022, MasterType: "Document Type" };
      const dataa = await getProdPartnermasterDatas(
        data2.ProductId,
        data2.MasterType,
        claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit
      );
      const RoleName = await GetUsersRoles(userNameId1);
      console.log("rolenamee", RoleName);

      if (dataa.status === 200) {
        const arr1 = [];
        const arrr1 = [];
        dataa.data.forEach((x) => {
          console.log("dddd", x);
          // if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
          const obj = {
            docId: "",
            docName: x.Value,
            UploadDocDate: "",
            fileName: "",
            TypeCode: x.TypeCode,
            UploadedBy: "",
            // base64: "",
          };
          const obj2 = {
            docId: x.mID,
            docName: x.Value,
            fileName: "",
            base64: "",
            UploadedBy: "",
          };

          arr1.push(obj);
          arrr1.push(obj2);
          setUpload(arr1);
          setUploadD(arrr1);
          // } else if (Medical !== "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
          //   RoleName.data.forEach((x1) => {
          //     const obj = {
          //       docId: "",
          //       docName: x.Value,
          //       UploadDocDate: "",
          //       fileName: "",
          //       TypeCode: x.TypeCode,
          //       UploadedBy: x1.mValue,
          //       // base64: "",
          //     };
          //     const obj2 = {
          //       docId: x.mID,
          //       docName: x.Value,
          //       fileName: "",
          //       base64: "",
          //       UploadedBy: x1.mValue,
          //     };
          //     arr1.push(obj);
          //     arrr1.push(obj2);
          //   });
          //   setUpload(arr1);
          //   setUploadD(arrr1);
          // }
          // claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.push(obj);
        });
        // setUpload(arr1);
        // setUploadD(arrr1);
        // setDocuments([]);
        if (
          SearchObj.IntimationNo === "" ||
          intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName !==
            "Personal Accident" ||
          intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName !==
            "Critical Illness"
        ) {
          setDocuments([...dataa.data]);
        }
        if (SearchObj.IntimationNo !== "") {
          setInDocument([...dataa.data]);
        }
        // claimDetails.transactionDataDTO[0].transactionDetails.documentDetails = dataa.data;
      }
      console.log("data", dataa);
      console.log("documentType", documents);
    }
  }, [claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit]);
  useEffect(() => {
    documents.filter((sd) => {
      if (sd.TypeCode === "Non Medical Documents") array1.push(sd.TypeCode);
      setArray1([...array1]);
      if (sd.TypeCode === "Medical Documents") arrayD.push(sd.TypeCode);
      setArrayD([...arrayD]);
      if (sd.TypeCode === "Required in Case of Death") array2.push(sd.TypeCode);
      setArray2([...array2]);
      if (sd.TypeCode === "Required in Case of TTD/ PPD/ PTD Claim") array3.push(sd.TypeCode);
      setArray3([...array3]);
      return true;
    });
  }, [documents]);

  useEffect(() => {
    intimaDocument.filter((sd1) => {
      if (sd1.TypeCode === "Non Medical Documents") array4.push(sd1.TypeCode);
      setArray4([...array4]);
      if (sd1.TypeCode === "Medical Documents") arrayDD.push(sd1.TypeCode);
      setArrayDD([...arrayDD]);
      if (sd1.TypeCode === "Required in Case of Death") array5.push(sd1.TypeCode);
      setArray5([...array5]);
      if (sd1.TypeCode === "Required in Case of TTD/ PPD/ PTD Claim") array6.push(sd1.TypeCode);
      setArray6([...array6]);
      return true;
    });
  }, [intimaDocument]);
  console.log("array4", array4);
  console.log("array5", array5);
  console.log("array6", array6);
  console.log("arrayDD", arrayDD);

  useEffect(async () => {
    const data2 = { ProductId: 1022, MasterType: "CityDistrict_Name" };
    const cityResponse = await getProdPartnermasterDatas(data2.ProductId, data2.MasterType);
    const arr = [];
    cityResponse.data.forEach((x) => {
      arr.push(x.mValue);
    });
    setCityDistrict([...arr]);
    setCityDistrictD([...arr]);
    // setCityDistrict([...cityDistrict]);
    const data3 = { ProductId: 1022, MasterType: "StateMaster" };
    const statERes = await getProdPartnermasterDatas(data3.ProductId, data3.MasterType);
    const arr1 = [];
    // const arr1 = [];
    statERes.data.forEach((x) => {
      arr1.push(x.mValue);
      // arr1.push(arr1);
      // setRes1([...arr1]);
      setStateR([...arr1]);
    });

    const data4 = { ProductId: 1022, MasterType: "FinancierBank" };
    const bankMasterResponse = await getProdPartnermasterDatas(data4.ProductId, data4.MasterType);
    console.log("bankMasterResponse", bankMasterResponse);
    const arr2 = [];

    bankMasterResponse.data.forEach((x) => {
      arr2.push(x.mValue);
    });
    setBankMasterData([...arr2]);
    setBankMastersData([...bankMasterResponse.data]);

    // const financierResponse = {
    //   financier_id: financierId[0],
    // };

    // const abc = { TXT_IFSC_CODE: "" };
    // abc.TXT_IFSC_CODE = "";

    // const arr12 = [];
    // const ifcs = { ProductId: 1022, MasterType: "FinancierCode" };
    // const ifscResponse = await masterIFSC(ifcs.ProductId, ifcs.MasterType, abc);
    // console.log("ifscResponse", ifscResponse);
    // if (ifscResponse.status === 200) {
    //   ifscResponse.data.forEach((xyz) => {
    //     arr12.push(xyz.mValue);
    //   });
    //   setIfscArr([...arr12]);
    // }
  }, []);

  const [flagD, setFlagD] = useState(false);

  const onPolicySearch = async () => {
    // debugger;
    // const req = {
    //   productId: 1022,
    // };
    // const abc = {
    //   PIN: 462003,
    // };
    // const StateID = await master(req.productId, "Pincode_Master", abc);
    // console.log("StateID", StateID);
    // if (StateID.status === 200) {
    //   StateID.data[0].State_Id;
    // }
    if (SearchObj.policyNo === "" && SearchObj.UHID === "" && SearchObj.IntimationNo === "") {
      swal({
        html: true,
        icon: "warning",
        // title: "Claim Intimated Successful",
        text: "Either COI No or UHID No or Intimation No is mandatory",
      });
    } else {
      // setTimerFlag(true);
      // setFlags((prevState) => ({ ...prevState, sendOtpFlag: true }));
      // setSendOtpBtnFlag(true);
      if (SearchObj.policyNo === "" || SearchObj.UHID === "" || SearchObj.IntimationNo === "") {
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, searchbuttonflag: false }));
      }
      if (SearchObj.policyNo !== "") {
        setLoading(true);
        const policyData = await GetPolicyInfoByPolicyNumber(SearchObj.policyNo);
        console.log("policyData", policyData);
        setuhid(policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems[0].UHID);
        setpolicytype(policyData.policy_details[0].policyRequest.PolicyType);
        if (policyData.policyNo === null) {
          setFlags((prevState) => ({ ...prevState, nameReg: true }));
        }
        setLoading(false);

        if (policyData.policy_details.length !== 0) {
          setPolicyDetails(policyData.policy_details);
          setTableRows(policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems);
          claimDetails.claimBasicDetails.policyDetails.PolicyNumber = policyData.policyNo;
          claimDetails.claimBasicDetails.policyDetails.Plan =
            policyData.policy_details[0].policyRequest.Plan;
          claimDetails.claimBasicDetails.policyDetails.ProductCode =
            policyData.policy_details[0].policyRequest.ProductCode;
          claimDetails.claimBasicDetails.masterPolicyNo =
            policyData.policy_details[0].policyRequest.MasterPolicyDetails[0].masterPolicyNo;
          policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems.forEach((xy) => {
            if (xy.RelationShipToProposer === "Self") {
              claimDetails.claimBasicDetails.memberDetails.COIHolderName = xy.Name;
            }
          });

          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          // policyData.policy_details[0].policyRequest.Benefit.forEach((x) => {
          //   benefit.push(x.CoverName);
          // });
          // setBenefit([...benefit]);
          setMemFlag(true);
          setStepperFlag(true);
          setStepForword(stepForward + 1);
          setFlagD(true);
        }
      } else if (SearchObj.UHID !== "") {
        setLoading(true);
        // const memberDatas = await GetMemberdetailsByUHID(SearchObj.UHID);
        const obj = {
          reportname: "Magma_GetMemberDetails",
          paramList: [
            {
              ParameterName: "memberID",
              ParameterValue: SearchObj.UHID,
            },
          ],
        };
        const GetUse = await GetPayLoadByQueryDynamic(obj);
        console.log("GetUseDetails", GetUse.data);
        setUhidData(GetUse);
        const memberDatas = GetUse.data.finalResult;
        console.log("GetUseDetails", memberDatas);
        setMemberData(memberDatas);
        setuhid(SearchObj.UHID);
        if (policytype === "NonFloater") {
          const arr1 = [];
          policyDetails[0].policyRequest.Benefit.forEach((x) => {
            arr1.push({
              CoverName: x.CoverName,
              Benefit: x.Benefit,
              Value: x.Value,
            });
            claimDetails.claimBasicDetails.memberDetails.MemberBenefit = arr1;
            console.log("arr1", arr1);
          });
        }
        if (memberDatas === null) {
          setLoading(false);
          setFlags((prevState) => ({ ...prevState, uhidReg: true }));
        } else if (memberDatas.PolicyNo === undefined) {
          setLoading(false);
          setFlags((prevState) => ({ ...prevState, uhidReg: true }));
        }
        setLoading(false);
        if (GetUse.status === 200) {
          setMemberData((prev) => [{ ...prev, ...memberDatas }]);

          // sendOtpData.email = memberDatas.data.EmailID === "" ? "" : memberDatas.data.EmailID;
          // sendOtpData.name = memberDatas.data.Name === "" ? "" : memberDatas.data.Name;
          // sendOtpData.mobileNumber =
          //   memberDatas.data.MobileNumber === "" ? "" : memberDatas.data.MobileNumber;
          if (memberDatas.PolicyNo !== "") {
            claimDetails.policyNo = memberDatas.PolicyNo;
            claimDetails.claimBasicDetails.memberDetails.memberId = memberDatas.UHID;
            claimDetails.claimBasicDetails.memberDetails.insuredName = memberDatas.Name;
            if (memberDatas.RelationShipToProposer === "Self") {
              claimDetails.claimBasicDetails.memberDetails.COIHolderName = memberDatas.Name;
            }
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
          // localStorage.setItem("policyNO", memberDatas.data.PolicyNo);
          // setPol(localStorage.getItem("policyNO"));
          const policyData = await GetPolicyInfoByPolicyNumber(memberDatas.PolicyNo);
          if (policyData.policy_details.length !== 0) {
            setPolicyDetails(policyData.policy_details);
            claimDetails.claimBasicDetails.masterPolicyNo =
              policyData.policy_details[0].policyRequest.MasterPolicyDetails[0].masterPolicyNo;
            if (claimDetails.Plan === "") {
              claimDetails.Plan = policyData.policy_details[0].policyRequest.Plan;
            }
            const arr = [];
            policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems.forEach((row) => {
              arr.push({
                UHID: row.UHID,
                MemberName: row.Name,
              });
              setTableRows([...arr]);
            });
            console.log(
              "tabledata",
              policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems
            );

            // setTableRows(policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems);
            policyData.policy_details[0].policyRequest.Benefit.forEach((x) => {
              benefit.push(x.CoverName);
            });
            // setBenefit([...benefit]);
            // setuhidflag(true);
            setMemFlag(false);
            setDetailsFlag(true);
            setStepperFlag(true);
            setStepForword(stepForward + 1);
            setFlagD(true);
          }
        }
      } else if (SearchObj.IntimationNo !== "") {
        setLoading(true);
        const dataByClaimNo = await SearchClaimDetailsByRegClaimNo(SearchObj.IntimationNo);
        const result = dataByClaimNo.finalResult;
        if (result === null) {
          setFlags((prevState) => ({ ...prevState, intimationReg: true }));
        }
        setLoading(false);

        // SearchObj.policyNo = result.policyNo;
        // SetSearchObj((prev) => ({ ...prev, ...SearchObj }));
        if (result !== null && result.policyNo !== "") {
          setIntimation((prev) => [{ ...prev, ...result }]);
          claimDetails.claimId = result.claimId;
          claimDetails.regClaimNo = result.regClaimNo;
          claimDetails.transactionDataDTO[0].transactionId =
            result.transactionDataDTO[0].transactionId;
          claimDetails.policyNo = result.policyNo;
          claimDetails.claimStatusId = result.claimStatusId;
          claimDetails.claimBasicDetails.memberDetails.insuredName =
            result.claimBasicDetails.memberDetails.insuredName;
          claimDetails.claimBasicDetails.memberDetails.memberId =
            result.claimBasicDetails.memberDetails.memberId;
          claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName =
            result.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName;
          claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName =
            result.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName;
          claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
            result.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status;
          claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Remarks =
            result.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Remarks;
          claimDetails.claimBasicDetails.policyDetails.PolicyNumber =
            result.claimBasicDetails.policyDetails.PolicyNumber;
          claimDetails.claimBasicDetails.policyDetails.Plan =
            result.claimBasicDetails.policyDetails.Plan;
          claimDetails.claimBasicDetails.policyDetails.ProductCode =
            result.claimBasicDetails.policyDetails.ProductCode;
          claimDetails.claimBasicDetails.masterPolicyNo = result.claimBasicDetails.masterPolicyNo;
          claimDetails.transactionDataDTO[0].createdDateTime =
            result.transactionDataDTO[0].createdDateTime;
          claimDetails.createdDate = result.createdDate;
          claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit =
            result.transactionDataDTO[0].transactionDetails.benefitDetails.benefit;
          claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName =
            result.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName;
          claimDetails.claimBasicDetails.memberDetails.Relationship =
            result.claimBasicDetails.memberDetails.Relationship;

          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        }

        // setUploadD([...result.transactionDataDTO[0].transactionDetails.documentDetails]);
        // console.log("intimate", result);
        // const intimate = result;
        // setIntima((prev) => [{ ...prev, ...intimate }]);
        // console.log("intima1", intima);
        const policyData = await GetPolicyInfoByPolicyNumber(result.policyNo);
        if (policyData.policy_details.length !== 0) {
          setPolicyDetails(policyData.policy_details);
          if (claimDetails.Plan === "") {
            claimDetails.Plan = policyData.policy_details[0].policyRequest.Plan;
          }
          claimDetails.claimBasicDetails.masterPolicyNo =
            policyData.policy_details[0].policyRequest.MasterPolicyDetails[0].masterPolicyNo;
          const arr = [];
          policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems.forEach((row) => {
            arr.push({
              UHID: row.UHID,
              MemberName: row.Name,
            });
            setTableRows([...arr]);
          });

          // console.log(
          //   "tabledata",
          //   policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems
          // );
          setTableRows(policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems);
          if (policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems.length > 0) {
            policyData.policy_details[0].policyRequest.InsurableItem[0].RiskItems.forEach((xy) => {
              if (xy.RelationShipToProposer === "Self") {
                claimDetails.claimBasicDetails.memberDetails.COIHolderName = xy.Name;
              }
            });
          }

          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          if (
            // result.length > 0 &&
            // intimation[0] &&
            // intimation[0].transactionDataDTO[0] &&
            // intimation[0].transactionDataDTO[0].transactionDetails &&
            // intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails &&
            result.transactionDataDTO[0].transactionDetails.benefitDetails.benefit !== ""
          ) {
            const data2 = { ProductId: 1022, MasterType: "Document Type" };
            const dataa = await getProdPartnermasterDatas(
              data2.ProductId,
              data2.MasterType,
              result.transactionDataDTO[0].transactionDetails.benefitDetails.benefit
            );

            policyData.policy_details[0].policyRequest.Benefit.forEach((x) => {
              benefit.push(x.CoverName);
            });

            if (dataa.status === 200) {
              const arr1 = [];
              const arrr1 = [];
              // const RoleName = await GetUsersRoles(userNameId1);
              // console.log("rolenamee", RoleName);
              dataa.data.forEach((x) => {
                console.log("dddd", x);
                // if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
                const obj = {
                  docId: "",
                  docName: x.Value,
                  UploadDocDate: "",
                  fileName: "",
                  TypeCode: x.TypeCode,
                  UploadedBy: "",
                  // base64: "",
                };
                const obj2 = {
                  docId: x.mID,
                  docName: x.Value,
                  fileName: "",
                  base64: "",
                  UploadedBy: "",
                };
                arr1.push(obj);
                arrr1.push(obj2);
                setUpload(arr1);
                setUploadD(arrr1);
                // } else if (Medical !== "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
                //   RoleName.data.forEach((x1) => {
                //     const obj = {
                //       docId: "",
                //       docName: x.Value,
                //       UploadDocDate: "",
                //       fileName: "",
                //       TypeCode: x.TypeCode,
                //       UploadedBy: x1.mValue,
                //       // base64: "",
                //     };
                //     const obj2 = {
                //       docId: x.mID,
                //       docName: x.Value,
                //       fileName: "",
                //       base64: "",
                //       UploadedBy: x1.mValue,
                //     };
                //     arr1.push(obj);
                //     arrr1.push(obj2);
                //   });
                //   setUpload(arr1);
                //   setUploadD(arrr1);
                // }
                // claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.push(obj);
              });
              // setUpload(arr1);
              // setUploadD(arrr1);
              setInDocument([...dataa.data]);
              // claimDetails.transactionDataDTO[0].transactionDetails.documentDetails = dataa.data;
            }
          }
          setMemFlag(false);
          setDetailsFlag(true);
          setStepperFlag(true);
          setStepForword(stepForward + 1);
          setFlagD(true);
        }

        console.log("policydetails", policyDetails);

        // const Payload = {
        //   productCode: "MagmaHospiCash01",
        //   planType: "TestPlan1",
        //   filterCriteria: [
        //     {
        //       SI: "",
        //       Type: "",
        //       Region: "",
        //       currency: "INR",
        //     },
        //   ],
        //   isFilterMemberWise: false,
        //   setBenefitMemberWise: false,
        //   insurableItems: null,
        // };
        // const res1 = await GetBenefits(Payload);
        // console.log("res1", res1);
        // if (res1.status === 1) {
        //   res1.finalResult.benefits.forEach((x) => {
        //     benefitType.push(x.CoverName);
        //   });
        // }
        // setBenefitType([...benefitType]);
      }
    }
    // }
  };

  useEffect(() => {
    console.log("intimatiomdocument", intimaDocument);
  }, [intimaDocument]);

  const userNameId = localStorage.getItem("userId");

  const handleMemberClick = () => {
    // claimDetails.claimBasicDetails.memberDetails.memberId = params.row.UHID;
    // claimDetails.claimBasicDetails.memberDetails.insuredName = params.row.Name;
    // setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    setMemFlag(false);
    setStepperFlag(true);
    setDetailsFlag(true);
    setStepForword(stepForward + 1);
  };

  const handleBack = () => {
    // debugger;
    setSelectedRow("");
    if (stepForward === 1) {
      setStepForword(stepForward - 1);
    }
    // setStepForword(true);
    setMemFlag(false);
    setFlagD(false);
    // setFlags((prevState) => ({ ...prevState, searchbuttonflag: false }));
  };

  const navigate = useNavigate();
  const handleTrackClaims = () => {
    navigate(`/Claims/Home`, { state: { productCode: "MagmaHospiCash01" } });
  };

  // const UserRoleName = {
  //   UserName: "",
  //   RoleName: "",
  //   Status: "",
  //   Remarks: "",
  // };

  const TemplateStatus = {
    Status: "",
  };
  const Resendstatus = {
    ResendStatus: "No",
  };
  const Paymentdata = {
    slno: "",
    payeeName: "",
    PayeeType: "",
    Payout: "",
    Action: "",
    Approved: "",
    paidAmount: "",
    refNo: "",
    UTRDate: "",
    status: "",
    remarks: "",
  };
  // const [payment, setPayment] = useState([]);

  const onClaimSave = async () => {
    // debugger;
    console.log("loading", loading);
    // claimDetails.doc = policyDetails[0].policyRequest.InsurableItem[0].RiskItems[0].DOC;
    claimDetails.claimBasicDetails.memberDetails.DOC = uhiddata.data.finalResult.DOC;
    claimDetails.claimBasicDetails.memberDetails.CoverageEndDate =
      uhiddata.data.finalResult.CoverageEndDate;
    claimDetails.claimBasicDetails.memberDetails.EmailId =
      policyDetails[0].policyRequest.ProposerDetails.EmailId;
    claimDetails.claimBasicDetails.memberDetails.MobileNo =
      policyDetails[0].policyRequest.ProposerDetails.MobileNo;

    policyDetails[0].policyRequest.InsurableItem[0].RiskItems.forEach((xy) => {
      claimDetails.claimBasicDetails.memberDetails.Dob = xy.DateofBirth;
      claimDetails.claimBasicDetails.memberDetails.Gender = xy.Gender;
    });
    const arr1 = [];
    if (
      policyDetails[0].policyRequest.PlanDetails[0].groupDetailsJson.SectionMaster
        .SumInsuredType === "Floater"
    ) {
      policyDetails[0].policyRequest.Benefit.forEach((x) => {
        arr1.push({
          CoverName: x.CoverName,
          Benefit: x.Benefit,
          Value: x.Value,
        });
        claimDetails.claimBasicDetails.memberDetails.MemberBenefit = arr1;
        console.log("arr1", arr1);
      });

      // res1.finalResult.benefits.forEach((x) => {

      //   arr1.forEach((s, i) => {
      //     if (claimDetails.claimBasicDetails.memberDetails.Relationship === s[i]) {
      //       arr2.push(x.CoverName);
      //       const data = arr2.map((mValue, index) => ({ mID: index + 1, mValue }));
      //       claimDetails.claimBasicDetails.benefitDetails = data;
      //     }
      //   })
      // })
    }

    // setLoader(true);
    if (
      claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.NoofDaysFromCToInjury ===
      ""
    ) {
      const NoOfdyasCtoA = diffDaysCalculator(
        new Date(claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa),
        new Date(claimDetails.claimBasicDetails.memberDetails.DOC)
      );
      claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.NoofDaysFromCToAdmission =
        NoOfdyasCtoA;
      console.log("Noofdays", NoOfdyasCtoA);
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    }
    if (claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName !== "") {
      const data = {
        HospitalName:
          claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        District:
          claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
        Pincode:
          claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
      };
      const data2 = { ProductId: 1022, MasterType: "BlackListedHospital" };
      const abc = await master(
        data2.ProductId,
        data2.MasterType,

        data
      );
      console.log("abc", abc);
      if (abc !== null && abc.status === 200 && abc.data.length > 0) {
        abc.data.forEach((x) => {
          if (
            x.HospitalName ===
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName
          ) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.BlackListedHospital =
              x.HospitalName;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            Swal.fire({
              icon: "error",
              text: " This hospital is Blacklisted",
              confirmButtonColor: "#0079CE",
            });
          }
          return null;
        });
      }

      // claimDetails.claimNumber = Number(new Date()).toString();
      const RoleName1 = await GetUsersRoles(userNameId1);

      if (upload.length > 0) {
        upload.filter((x) => {
          const x2 = x;
          if (x.fileName !== "") {
            if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
              x2.UploadedBy = "DEO User";
            } else {
              RoleName1.data.forEach((x1) => {
                x2.UploadedBy = x1.mValue;
              });
            }

            claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.push(x);
            claimDetails.DocumentUploadFlag = "true";
          }
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          return null;
        });
      }
      if (otherUpload.length > 0) {
        otherUpload.filter((x) => {
          const x2 = x;
          if (x.fileName !== "") {
            if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
              x2.UploadedBy = "DEO User";
            } else {
              RoleName1.data.forEach((x1) => {
                x2.UploadedBy = x1.mValue;
              });
            }
            claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.push(x);
            claimDetails.DocumentUploadFlag = "true";
          }
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          return null;
        });
      }
      if (
        (claimDetails.claimStatusId === 0 && claimDetails.claimStatus === "") ||
        claimDetails.claimStatusId === 113
      ) {
        claimDetails.claimStatusId = 114;
        claimDetails.claimStatus = "Claim Registered";
        claimDetails.policyNo =
          claimDetails.policyNo !== "" ? claimDetails.policyNo : SearchObj.policyNo;

        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

        // const result = await SaveClaimDetails(claimDetails);

        const RoleName = await GetUsersRoles(userNameId);
        console.log("rolenamee", RoleName);

        if (SearchObj.IntimationNo === "") {
          if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
            claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName =
              "DEO User";
          } else {
            RoleName.data.forEach((x) => {
              claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName =
                x.mValue;
            });
          }
          const userName = await GetUserById(userNameId);
          const userid = `${userName.data.userDetails[0].firstName} ${userName.data.userDetails[0].lastName}`;
          console.log("userids", userid);
          // UserRoleName.UserName =
          //   claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName;
          claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName =
            userid;
          // claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName;
          // claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName =
          // userid;
          claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
            claimDetails.claimStatus;
          claimDetails.transactionDataDTO[0].transactionDetails.templateDetails[0].Status =
            claimDetails.claimStatus;
          // if(claimDetails.transactionDataDTO[0].transactionDetails.commumicationDetails!==""){
          //   claimDetails.transactionDataDTO[0].transactionDetails.commumicationDetails.push()
          // }
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        }
        if (SearchObj.IntimationNo !== "") {
          // const RoleName = await GetUsersRoles(userNameId);
          // console.log("rolenamee", RoleName);

          claimDetails.Prefix = "MHDI/6115/24/12/";
          // if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
          //   UserRoleName.RoleName = "DEO User";
          // } else {
          //   RoleName.data.forEach((x) => {
          //     UserRoleName.RoleName = x.mValue;
          //     if (Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c") {
          //       claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName =
          //         x.mValue;
          //     }
          //   });
          // }
          const userName = await GetUserById(userNameId);
          const userid = `${userName.data.userDetails[0].firstName} ${userName.data.userDetails[0].lastName}`;
          console.log("userids", userid);
          // UserRoleName.UserName =
          //   claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName;
          // UserRoleName.Status = claimDetails.claimStatus;
          // UserRoleName.Remarks = claimDetails.transactionDataDTO[0].remark;
          // if (
          //   claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0]
          //     .UserName !== ""
          // ) {
          //   claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails.push(
          //     UserRoleName
          //   );
          // }
          if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
            if (
              claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0]
                .UserName === ""
            ) {
              claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName =
                "DEO User";
              claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName =
                userid;
              // claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName;
              claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
                claimDetails.claimStatus;
              TemplateStatus.Status = claimDetails.claimsms;
              if (
                claimDetails.transactionDataDTO[0].transactionDetails.templateDetails[0].Status !==
                ""
              ) {
                claimDetails.transactionDataDTO[0].transactionDetails.templateDetails.push(
                  TemplateStatus
                );
              }
              if (
                claimDetails.transactionDataDTO[0].transactionDetails.ResendFlag[0].ResendStatus !==
                ""
              ) {
                claimDetails.transactionDataDTO[0].transactionDetails.ResendFlag.push(Resendstatus);
              }
            }
          } else if (Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c") {
            if (
              claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0]
                .UserName === ""
            ) {
              claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName =
                userid;
              // claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName;
              claimDetails.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
                claimDetails.claimStatus;
              TemplateStatus.Status = claimDetails.claimStatus;
              if (
                claimDetails.transactionDataDTO[0].transactionDetails.templateDetails[0].Status !==
                ""
              ) {
                claimDetails.transactionDataDTO[0].transactionDetails.templateDetails.push(
                  TemplateStatus
                );
              }
              if (
                claimDetails.transactionDataDTO[0].transactionDetails.ResendFlag[0].ResendStatus !==
                ""
              ) {
                claimDetails.transactionDataDTO[0].transactionDetails.ResendFlag.push(Resendstatus);
              }
            }
          }
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          // console.log("userrolename", UserRoleName);
        }

        // const RoleName = await GetUsersRoles(userNameId);
        // console.log("rolenamee", RoleName);
        // // const data1 = [];
        // RoleName.data.forEach((x) => {
        //   // const data1 = x.mValue;
        //   // data1.push(x.mValue);
        //   claimDetails.transactionDataDTO[0].transactionDetails.communicationDetails[0].RoleName =
        //     // GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
        //     //   .communicationDetails + 1
        //     x.mValue;
        // });
        // const userName = await GetUserById(userNameId);
        // const userid = `${userName.data.userDetails[0].firstName} ${userName.data.userDetails[0].lastName}`;
        // claimDetails.transactionDataDTO[0].transactionDetails.communicationDetails[0].UserName =
        //   userid;
        // claimDetails.transactionDataDTO[0].transactionDetails.communicationDetails[0].Status =
        //   claimDetails.claimStatus;
        // // if(claimDetails.transactionDataDTO[0].transactionDetails.commumicationDetails!==""){
        // //   claimDetails.transactionDataDTO[0].transactionDetails.commumicationDetails.push()
        // // }
        // setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

        // const pc = { ProductId: 1022 };

        const dedupde = await claimsDedupe(1022, claimDetails);
        console.log("claimsDedupe", dedupde);
        if (dedupde.status === 200) {
          setLoading(false);
          if (dedupde.data.responseMessage === "Claim with provided details is already available") {
            Swal.fire({
              icon: "error",
              text: dedupde.data.responseMessage,
              confirmButtonColor: "#0079CE",
            });
          } else {
            const GenericApiResult = await GenericApi(
              "MagmaHospiCash01",
              "MagmaSaveClaimSubmitted",
              claimDetails
            );
            setLoading(true);
            const Reservelogic = await GenericApi(
              "MagmaHospiCash01",
              "MagmaReserveLogic",
              claimDetails
            );

            // const transactionDetails = JSON.parse(
            //   GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
            // );
            // console.log("transaction", transactionDetails);

            console.log("Reservelogic", Reservelogic);

            // const save1 = await updateStageStatusIdByTno(
            //   GenericApiResult.finalResult.transactionDataDTO[0].transactionNumber,
            //   GenericApiResult.finalResult.claimStatusId
            // );
            const claimsWf = {
              Stage: "Claims",
              Status: "325",
              WorkFlowType: "DEO",
              wfstageStatusId: "326",
              workFlowId: "84",
            };
            const save1 = await SaveClaimWFStatus(
              GenericApiResult.finalResult.transactionDataDTO[0].transactionNumber,
              claimsWf
            );
            console.log("savedata", save1);
            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.investigatorDetails =
              // transactionDetails.investigatorDetails =
              claimDetails.transactionDataDTO[0].transactionDetails.investigatorDetails;
            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails =
              // transactionDetails.paymentObj.PaymentDetails =
              claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails;
            GenericApiResult.finalResult.claimStatus = claimDetails.claimStatus;
            // GenericApiResult.finalResult = claimDetails.claimStatus;
            if (GenericApiResult.status === 1) {
              const data1 = {
                TransactionNumber:
                  GenericApiResult.finalResult.transactionDataDTO[0].transactionNumber,
                CreatedBy: userNameId1,
              };
              await SaveClaimHistory(data1);

              const ClaimResister = {
                communicationId: 227,
                keyType: "Claims",
                key: GenericApiResult.finalResult.claimNumber,
                stakeHolderDetails: [
                  {
                    communicationType: "Email",
                    stakeholderCode: "CUS",
                    communicationValue: policyDetails[0].policyRequest.ProposerDetails.EmailId,
                  },
                ],
              };
              await EventCommunicationExecution(ClaimResister);
              const claimsms = {
                communicationId: 244,
                keyType: "MagmaHealth",
                key: GenericApiResult.finalResult.claimNumber,
                stakeHolderDetails: [
                  {
                    communicationType: "SMS",
                    stakeholderCode: "CUS",
                    communicationValue: policyDetails[0].policyRequest.ProposerDetails.MobileNo,
                  },
                ],
              };
              await EventCommunicationExecution(claimsms);

              console.log("result101", GenericApiResult);
              const RuleExecution = await GenericApi(
                "MagmaHospiCash01",
                "MagmaRuleExecutions",
                claimDetails
              );
              if (RuleExecution.finalResult.successMsg === "Success") {
                if (
                  (claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails
                    .benefitName === "Hospicash" ||
                    claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails
                      .benefitName === "EMI Benefit") &&
                  GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj
                    .payeeName ===
                    GenericApiResult.finalResult.claimBasicDetails.memberDetails.COIHolderName &&
                  GenericApiResult.finalResult.claimAmount !== 0 &&
                  handwrittentrue === false
                ) {
                  const claimCalculator = await GenericApi(
                    "MagmaHospiCash01",
                    "MagmaClaimsCalculator_V1",
                    GenericApiResult.finalResult
                  );
                  if (
                    claimCalculator.responseMessage === "Success" &&
                    claimCalculator.finalResult.PayoutAmount > 0
                  ) {
                    const AutoApprove = await GenericApi(
                      "MagmaHospiCash01",
                      "Magma_ClaimBenefitReserveRule",
                      claimDetails
                    );
                    if (AutoApprove.status === 1 && AutoApprove.finalResult.outcome === "Success") {
                      GenericApiResult.finalResult.claimStatus = "Claim Approved";
                      GenericApiResult.finalResult.claimStatusId = 115;

                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount =
                        // transactionDetails.benefitDetails.CalculatedClaimAmount =
                        claimCalculator.finalResult.PayoutAmount;
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier =
                        // transactionDetails.paymentObj.finalPayoutFinancier;
                        claimCalculator.finalResult.FinancierPayout;
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer =
                        // transactionDetails.paymentObj.finalPayoutCutomer;
                        claimCalculator.finalResult.CustomerPayout;
                      if (claimCalculator.finalResult.HospitalisatonCriteria === "Separate") {
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
                          // transactionDetails.benefitDetails.RoomAmount;
                          claimCalculator.finalResult.NormalPayoutSeparate;
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
                          claimCalculator.finalResult.ICUPayoutSeparate;
                      } else {
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
                          claimCalculator.finalResult.NormalPayoutCombined;
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
                          claimCalculator.finalResult.ICUPayoutCombined;
                      }

                      if (claimCalculator.status === 1) {
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDLevelcode =
                          "R50";
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].ICDDescription =
                          "Fever of other and unknown origin";
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AdmissionType =
                          "Emergency";
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].TreatmentType =
                          "Medical Treatment";
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].AilmentName =
                          "Others";
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.ailmentDetails[0].PreExisting =
                          "No";

                        const abc1 = GenericApiResult.finalResult;
                        const res3 = await UpdateClaimDetails(abc1);
                        if (res3.status === 1) {
                          const save2 = await updateStageStatusIdByTno(
                            res3.finalResult.transactionDataDTO[0].transactionNumber,
                            res3.finalResult.claimStatusId
                          );
                          console.log("save1", save2);
                          const dataa = {
                            TransactionNumber:
                              res3.finalResult.transactionDataDTO[0].transactionNumber,
                            CreatedBy: userNameId,
                          };
                          await SaveClaimHistory(dataa);
                        }
                      }

                      if (
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== "0" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== "" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== undefined
                      ) {
                        const beneficialName =
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.payeeName;
                        const name = beneficialName.split(" ").join("");
                        const obj1 = {
                          slno:
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.PaymentDetails &&
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.PaymentDetails.length + 1,
                          payeeName: name,
                          // GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          //   .paymentObj.payeeName,
                          // txnType: Paymentdata.txnType,
                          PayeeType:
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.modeofPayment,
                          Payout: "Claims Payout",
                          Approved:
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.finalPayoutCustomer,
                          paidAmount: "NA",

                          refNo: "NA",
                          UTRDate: "",
                          status: "NA",
                          remarks: "NA",
                          Action: "",
                          name: "Customer",
                        };

                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.push(
                          obj1
                        );
                      }
                      if (
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutFinancier !== "0" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutFinancier !== "" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutFinancier !== undefined
                      ) {
                        const obj2 = {
                          slno:
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.PaymentDetails.length + 1,
                          payeeName:
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .financierDetails.FinancierName,
                          PayeeType:
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.modeofPayment,
                          Payout: "Claims Payout",
                          Approved: Paymentdata.Approved,
                          paidAmount: "NA",
                          refNo: "NA",
                          UTRDate: "",
                          status: "NA",
                          remarks: "NA",
                          Action: "",
                          name: "Financier",
                        };
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.push(
                          obj2
                        );
                      }
                      Paymentdata.Payout = "Claims Payout";
                      if (
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== "0" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== "" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== undefined
                      ) {
                        let today = new Date();
                        let dd = today.getDate();
                        let mm = today.getMonth() + 1;
                        const yyyy = today.getFullYear();
                        if (dd < 10) {
                          dd = `0${dd}`;
                        }
                        if (mm < 10) {
                          mm = `0${mm}`;
                        }
                        today = `${yyyy}-${mm}-${dd}`;

                        const integerAmount =
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.finalPayoutCustomer !== "" &&
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.finalPayoutCustomer !== "0" &&
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.finalPayoutCustomer !== undefined
                            ? GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                                .paymentObj.finalPayoutCustomer
                            : // : GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              //     .paymentObj.finalPayoutFinancier !== "" &&
                              //   GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              //     .paymentObj.finalPayoutFinancier !== "0"
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                                .paymentObj.finalPayoutFinancier;
                        const formattedAmount = parseFloat(integerAmount).toFixed(2);
                        const beneficialName =
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.payeeName;
                        const name = beneficialName.split(" ").join("");
                        const APIRequest = {
                          transferPaymentRequest: {
                            subHeader: {
                              requestUUID: GenericApiResult.finalResult.claimNumber,
                              serviceRequestId: "",
                              serviceRequestVersion: "",
                              channelId: "",
                            },
                            transferPaymentRequestBodyEncrypted: {
                              channelId: "",
                              corpCode: "",
                              paymentDetails: [
                                {
                                  txnPaymode: "PA",
                                  custUniqRef:
                                    GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                      .memberId,
                                  corpAccNum: "",
                                  valueDate: today,
                                  txnAmount: formattedAmount,
                                  beneLEI: "",
                                  beneName: name,
                                  beneCode:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.paymentObj.ifscCode,
                                  beneAccNum:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.paymentObj.accountNo,
                                  beneAcType: "",
                                  beneAddr1: "",
                                  beneAddr2: "",
                                  beneAddr3: "",
                                  beneCity:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.hospitalDetails.hospitalCity,
                                  beneState:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.hospitalDetails.hospitalState,
                                  benePincode:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.hospitalDetails.hospitalPincode,
                                  beneIfscCode:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.paymentObj.ifscCode,
                                  beneBankName:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.paymentObj.bankName,
                                  baseCode: "",
                                  chequeNumber: "",
                                  chequeDate: "",
                                  payableLocation: "",
                                  printLocation: "",
                                  beneEmailAddr1:
                                    GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                      .EmailId,
                                  beneMobileNo:
                                    GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                      .MobileNo,
                                  productCode: "",
                                  txnType: "",
                                  invoiceDetails: [
                                    {
                                      invoiceAmount: "",
                                      invoiceNumber: "",
                                      invoiceDate: "",
                                      cashDiscount: "",
                                      tax: "",
                                      netAmount: "",
                                      invoiceInfo1: "",
                                      invoiceInfo2: "",
                                      invoiceInfo3: "",
                                      invoiceInfo4: "",
                                      invoiceInfo5: "",
                                    },
                                  ],
                                  enrichment1: "",
                                  enrichment2: "",
                                  enrichment3: "",
                                  enrichment4: "",
                                  enrichment5: "",
                                  senderToReceiverInfo: "",
                                },
                              ],
                              checksum: "",
                            },
                          },
                        };
                        const Result = await GenericApi(
                          "MagmaHospiCash01",
                          "SaveClaimPaymentDetails",
                          APIRequest
                        );
                        console.log("Resultssss", Result);
                        if (Result.status !== 0) {
                          const result = await GetPaymentDetails(
                            GenericApiResult.finalResult.claimNumber
                          );

                          console.log("resultss", result);
                          result.data.finalResult.forEach((item, ids) => {
                            const GetPaymentDetailsResponse = item.paymentRequest;
                            console.log("GetPaymentDetailsResponse", GetPaymentDetailsResponse);
                            console.log(
                              "testing",
                              GetPaymentDetailsResponse.TransferPaymentRequest
                                .TransferPaymentRequestBodyEncrypted.paymentDetails[0].beneName
                            );
                            if (
                              GetPaymentDetailsResponse.TransferPaymentRequest
                                .TransferPaymentRequestBodyEncrypted.paymentDetails[0].beneName ===
                                GenericApiResult.finalResult.transactionDataDTO[0]
                                  .transactionDetails.paymentObj.PaymentDetails[ids].payeeName &&
                              GetPaymentDetailsResponse.TransferPaymentRequest
                                .TransferPaymentRequestBodyEncrypted.paymentDetails[0].txnAmount ===
                                parseFloat(
                                  GenericApiResult.finalResult.transactionDataDTO[0]
                                    .transactionDetails.paymentObj.PaymentDetails[ids].Approved
                                ).toFixed(2)
                            ) {
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                                ids
                              ].paidAmount = item.paidAmount;
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                                ids
                              ].Action = item.Action;
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                                ids
                              ].refNo = item.refNo;
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                                ids
                              ].remarks = item.remarks;
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                                ids
                              ].status = item.status;
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                                ids
                              ].UTRDate = item.createdDate;
                            }
                          });
                        }
                      }
                      if (
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutFinancier !== "0" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutFinancier !== ""
                      ) {
                        let today = new Date();
                        let dd = today.getDate();
                        let mm = today.getMonth() + 1;
                        const yyyy = today.getFullYear();
                        if (dd < 10) {
                          dd = `0${dd}`;
                        }
                        if (mm < 10) {
                          mm = `0${mm}`;
                        }
                        today = `${yyyy}-${mm}-${dd}`;

                        const integerAmount =
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.finalPayoutFinancier;
                        const formattedAmount = parseFloat(integerAmount).toFixed(2);
                        const beneficialName =
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .paymentObj.payeeName;
                        const name = beneficialName.split(" ").join("");
                        const APIRequest = {
                          transferPaymentRequest: {
                            subHeader: {
                              requestUUID: GenericApiResult.finalResult.claimNumber,
                              serviceRequestId: "",
                              serviceRequestVersion: "",
                              channelId: "",
                            },
                            transferPaymentRequestBodyEncrypted: {
                              channelId: "",
                              corpCode: "",
                              paymentDetails: [
                                {
                                  txnPaymode: "PA",
                                  custUniqRef:
                                    GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                      .memberId,
                                  corpAccNum: "",
                                  valueDate: today,
                                  txnAmount: formattedAmount,
                                  beneLEI: "",
                                  beneName: name,
                                  beneCode:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.paymentObj.ifscCode,
                                  beneAccNum:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.paymentObj.accountNo,
                                  beneAcType: "",
                                  beneAddr1: "",
                                  beneAddr2: "",
                                  beneAddr3: "",
                                  beneCity:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.hospitalDetails.hospitalCity,
                                  beneState:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.hospitalDetails.hospitalState,
                                  benePincode:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.hospitalDetails.hospitalPincode,
                                  beneIfscCode:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.paymentObj.ifscCode,
                                  beneBankName:
                                    GenericApiResult.finalResult.transactionDataDTO[0]
                                      .transactionDetails.paymentObj.bankName,
                                  baseCode: "",
                                  chequeNumber: "",
                                  chequeDate: "",
                                  payableLocation: "",
                                  printLocation: "",
                                  beneEmailAddr1:
                                    GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                      .EmailId,
                                  beneMobileNo:
                                    GenericApiResult.finalResult.claimBasicDetails.memberDetails
                                      .MobileNo,
                                  productCode: "",
                                  txnType: "",
                                  invoiceDetails: [
                                    {
                                      invoiceAmount: "",
                                      invoiceNumber: "",
                                      invoiceDate: "",
                                      cashDiscount: "",
                                      tax: "",
                                      netAmount: "",
                                      invoiceInfo1: "",
                                      invoiceInfo2: "",
                                      invoiceInfo3: "",
                                      invoiceInfo4: "",
                                      invoiceInfo5: "",
                                    },
                                  ],
                                  enrichment1: "",
                                  enrichment2: "",
                                  enrichment3: "",
                                  enrichment4: "",
                                  enrichment5: "",
                                  senderToReceiverInfo: "",
                                },
                              ],
                              checksum: "",
                            },
                          },
                        };
                        const Result = await GenericApi(
                          "MagmaHospiCash01",
                          "SaveClaimPaymentDetails",
                          APIRequest
                        );
                        console.log("Resultssss", Result);
                        const result = await GetPaymentDetails(
                          GenericApiResult.finalResult.claimNumber
                        );
                        console.log("resultss", result);
                        result.data.finalResult.forEach((item, ids) => {
                          const GetPaymentDetailsResponse = item.paymentRequest;
                          console.log("GetPaymentDetailsResponse", GetPaymentDetailsResponse);
                          console.log(
                            "testing",
                            GetPaymentDetailsResponse.TransferPaymentRequest
                              .TransferPaymentRequestBodyEncrypted.paymentDetails[0].beneName
                          );
                          if (
                            GetPaymentDetailsResponse.TransferPaymentRequest
                              .TransferPaymentRequestBodyEncrypted.paymentDetails[0].beneName ===
                              GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                                .paymentObj.PaymentDetails[ids].payeeName &&
                            GetPaymentDetailsResponse.TransferPaymentRequest
                              .TransferPaymentRequestBodyEncrypted.paymentDetails[0].txnAmount ===
                              parseFloat(
                                GenericApiResult.finalResult.transactionDataDTO[0]
                                  .transactionDetails.paymentObj.PaymentDetails[ids].Approved
                              ).toFixed(2)
                          ) {
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                              ids
                            ].paidAmount = item.paidAmount;
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                              ids
                            ].Action = item.Action;
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                              ids
                            ].refNo = item.refNo;
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                              ids
                            ].remarks = item.remarks;
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                              ids
                            ].status = item.status;
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                              ids
                            ].UTRDate = item.createdDate;
                          }
                        });
                      }

                      const res2 = await UpdateClaimDetails(GenericApiResult.finalResult);
                      if (res2.status === 1) {
                        const save2 = await updateStageStatusIdByTno(
                          res2.finalResult.transactionDataDTO[0].transactionNumber,
                          res2.finalResult.claimStatusId
                        );
                        console.log("save1", save2);
                        const dataa = {
                          TransactionNumber:
                            res2.finalResult.transactionDataDTO[0].transactionNumber,
                          CreatedBy: userNameId,
                        };
                        await SaveClaimHistory(dataa);
                      }
                    }
                  }
                }
              }

              if (GenericApiResult.responseMessage === "Success") {
                setLoading(false);
                setStepForword(stepForward + 1);
                Swal.fire({
                  // icon: "success",
                  // title: "We've got your claim Submission",
                  // text: `Your Claim Number is ${result.data.finalResult.claimNumber}`,
                  html: `
              <div>
               <img src=${magmapayment} alt="success">
              <p style="color:red"> We've got your claim submission and we are on it</p>
                <p>your claim number is ${GenericApiResult.finalResult.claimNumber}.</p><br/>
                <p style="font-size: 12px;">keep your claim number handy for future reference.</p>
              </div>
            `,
                  confirmButtonColor: "#d33",
                  confirmButtonText: "Go to Home",
                }).then((res) => {
                  if (res.isConfirmed) {
                    handleTrackClaims();
                  }
                });
              }
            }
          }
        }
      }
    }

    // if (result.status === 200) {
    //   setLoader(false);
    //   swal({
    //     html: true,
    //     icon: "success",
    //     title: "Successful",
    //     text: `Claim Number ${result.data.finalResult.claimNumber}`,
    //   });
    // }
  };
  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  const [xyz, setXYZ] = useState({
    RawImage: [],
  });

  const [otherflag, setOtherFlag] = useState(false);

  const [filename, setFilename] = useState();
  console.log("filename", filename);
  const UploadImage = async (file, id) => {
    setFilename(file.name);
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (otherflag === true) {
        if (result.data[0].fileName !== "") {
          const docId = result.data[0].docid;
          const newUploads = [...otherUpload];
          newUploads[id].docId = docId;
          setOtherUpload(newUploads);
        }
      } else {
        console.log("result", result);
        if (result.data[0].fileName !== "") {
          const docId = result.data[0].docid;
          const newUpload = [...upload];
          newUpload[id].docId = docId;
          setUpload(newUpload);

          const reader = new FileReader();
          reader.onload = () => {
            const base64Image = reader.result;
            const myArray = base64Image.split(",");
            const data = myArray[1];

            const base64 = data;
            const newUploadD = [...uploadD];
            newUploadD[id].base64 = base64;
            setUploadD(newUploadD);

            setXYZ({ ...xyz, RawImage: data });
            console.log("imagebinding", xyz);
          };
          reader.readAsDataURL(file);
        }
      }
    });
  };

  // const handleUpload = (id, e) => {
  // if (document.getElementById("upload") !== null) {
  // const input = document.getElementById("upload");
  // swal({
  //   html: true,
  //   icon: "success",
  //   title: "Document Uploaded Successfully!",
  // });

  // const rows = await readXlsxFile(input.files[0]);
  // }
  //   const newUpload = [...upload];
  //   newUpload[id].fileName = e.target.files[0].name;
  //   newUpload[id].UploadDocDate = new Date();
  //   setUpload(newUpload);
  //   setUpload(upload);
  // };
  const handleUpload = (id, e) => {
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
        text: "Only pdf/jpg/jpeg/png//doc/docx are allowed",
      });
      return;
    }
    const newUpload = [...upload];
    newUpload[id].fileName = e.target.files[0].name;
    newUpload[id].UploadDocDate = new Date();
    setUpload(newUpload);

    const newUploadD = [...uploadD];
    newUploadD[id].fileName = e.target.files[0].name;

    setUploadD(newUploadD);

    if (uploadD.length !== 0) {
      uploadD.filter((x) => {
        if (x.fileName !== "") {
          // claimDetails.DocumentUploadFlag = "";
          claimDetails.DocumentUploadFlag = "true";
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        }
        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        return true;
      });
    }
    console.log("dddd", claimDetails);
    setDisable(false);
    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });
    setDocumentFlag(true);
    UploadImage(e.target.files[0], id);
    const newUploadFlags = [...uploadFlags];
    newUploadFlags[id] = true;
    setUploadFlags(newUploadFlags);
  };

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
        text: "Only pdf/jpg/jpeg/png//doc/docx are allowed.",
      });
      return;
    }
    const newuploads = [...otherUpload];
    newuploads[id].fileName = e.target.files[0].name;
    newuploads[id].UploadDocDate = new Date();
    setOtherUpload(newuploads);
    UploadImage(e.target.files[0], id);
    const newUploadFlags = [...otherUploadFlag];
    newUploadFlags[id] = true;
    setOtherUploadFlag(newUploadFlags);
  };

  // const handleIntUpload = (id, e) => {

  //   const file = e.target.files[0];
  //   const allowedTypes = [
  //     "image/jpeg",
  //     "image/jpg",
  //     "application/msword",
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //     "image/png",
  //     "application/pdf",
  //   ];
  //   if (!allowedTypes.includes(file.type)) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Invalid File Type",
  //       text: "Only JPG and PDF files are allowed.",
  //     });
  //     return;
  //   }
  //   // const newuploads = intima[0].transactionDataDTO[0].transactionDetails.documentDetails;
  //   const newuploads = [...inupload];
  //   newuploads[id].fileName = e.target.files[0].name;
  //   newuploads[id].UploadDocDate = new Date();
  //   setInUpload(newuploads);
  //   setDocumentFlag(true);
  //   setDisable(false);
  //   UploadImage(e.target.files[0], id);
  // };
  // console.log("inupload", inupload);
  console.log("adddocument", otherUpload);

  const handleAddDocument = async () => {
    // const RoleName = await GetUsersRoles(userNameId1);
    // console.log("rolenamee", RoleName);
    // if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
    const obj1 = {
      docId: "",
      docName: "",
      UploadDocDate: "",
      fileName: "",
      UploadedBy: "",
    };
    otherUpload.push(obj1);
    // } else {
    //   RoleName.data.forEach((x1) => {
    //     const obj1 = {
    //       docId: "",
    //       docName: "",
    //       UploadDocDate: "",
    //       fileName: "",
    //       UploadedBy: x1.mValue,
    //     };
    //     otherUpload.push(obj1);
    //   });
    // }
    setOtherUpload([...otherUpload]);
    setOtherFlag(true);
    // setAddDoc((prevState) => prevState + 1);iuytre
    // setShowCancel(true);
    console.log("otherdoc", otherUpload);
  };
  const handleAddother = (e, id) => {
    if (e.target.name === "other") {
      otherUpload[id].docName = e.target.value;
    }
    setOtherUpload([...otherUpload]);
  };

  const handleOtherRemove = async (id, fileName) => {
    await DeleteFile(fileName).then((result) => {
      console.log("result", result);
      if (result.data.status === 5) {
        otherUpload[id].fileName = "";
        otherUpload[id].docId = "";
        otherUpload[id].UploadDocDate = "";
        otherUpload[id].fileName = "";
        // inupload[id] = "";
        // setInUpload([...inupload]);
        setOtherUpload([...otherUpload]);
        console.log("otherremove", otherUpload);
      }
    });
    const newUploadFlags = [...otherUploadFlag];
    newUploadFlags[id] = false;
    setOtherUploadFlag(newUploadFlags);
  };

  const handleDeleteOther = (id) => {
    const updatedOtherUpload = [...otherUpload];
    updatedOtherUpload.splice(id, 1);
    setOtherUpload(updatedOtherUpload);
  };

  // const handleIntRemove = async (id, fileName) => {
  //   await DeleteFile(fileName).then((result) => {
  //     console.log("result", result);
  //     if (result.data.status === 5) {
  //       inupload[id].fileName = "";
  //       inupload[id].docId = "";
  //       inupload[id].UploadDocDate = "";
  //       inupload[id].fileName = "";
  //       // inupload[id] = "";
  //       setUpload([...upload]);
  //       if (inupload.some((file) => file.fileName !== "")) {
  //         setDisable(false);
  //       } else {
  //         setDisable(true);
  //       }
  //       // setOtherUpload([...otherUpload]);
  //       // console.log("otherremove", otherUpload);
  //     }
  //   });
  // };
  // const handleRemoveRow = (id) => {
  //   upload[id].docId = "";
  //   upload[id].UploadDocDate = "";
  //   upload[id].fileName = "";
  //   // uploadD[id].base64 = "";
  //   uploadD[id].fileName = "";
  //   setUpload([...upload]);
  // };
  const handleRemoveRow = async (id, fileName) => {
    await DeleteFile(fileName).then((result) => {
      console.log("result", result);
      if (result.data.status === 5) {
        upload[id].fileName = "";
        upload[id].docId = "";
        upload[id].UploadDocDate = "";
        uploadD[id].fileName = "";
        setUpload([...upload]);
        if (upload.some((file) => file.fileName !== "")) {
          setDisable(false);
        } else {
          setDisable(true);
        }
        console.log("jsonbindingdeleted", upload);
      }
    });
    const newUploadFlags = [...uploadFlags];
    newUploadFlags[id] = false;
    setUploadFlags(newUploadFlags);
  };

  useEffect(() => {
    if (ocrSwalFlag === true) {
      Swal.fire({
        html: `<div style={{display:"flex"}}>
      <img src=${scanningGIF} style="height:6rem;">
      <div><p> We're Currently scanning your docs to find the important stuff.
      It might take a little while...</p><br/>`,
        showConfirmButton: false,
      });
    } else {
      Swal.close();
    }
  }, [ocrSwalFlag]);

  // const handleRemoveRow = (id) => {
  //   // upload((x) => {
  //   //   x[id].docId = "";
  //   //   x[id].UploadDocDate = "";
  //   //   x[id].base64 = "";
  //   //   x[id].fileName = "";
  //   // });
  //   setUpload(upload.slice(id, -1));
  // };
  const handelBacktoMemberSelection = () => {
    setSelectedRow("");
    claimDetails.claimStatusId = 0;
    claimDetails.claimStatus = "";
    claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = "";
    claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.documentDetails = [];
    claimDetails.transactionDataDTO[0].transactionDetails.claimedAmount = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.accountNo = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod = "";
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = "";
    setBenefitType([]);
    setBenefit([]);
    // setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    if (claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit === "") {
      setDocuments([]);
    }
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    if (SearchObj.UHID !== "") {
      setMemFlag(false);
    } else {
      if (SearchObj.IntimationNo !== "") {
        setStepForword(1);
        setMemFlag(false);
      } else {
        if (stepForward === 2) {
          setStepForword(stepForward - 1);
        } else if (stepForward === 3) {
          setStepForword(stepForward - 2);
        } else if (stepForward === 4) {
          setStepForword(stepForward - 3);
        } else {
          setStepForword(1);
        }

        setMemFlag(true);
      }

      setStepperFlag(true);
    }
    setDetailsFlag(false);
    setDocumentFlag(false);
    setOCRFlag(false);
    setDisableFlag(false);
    setAgreement(false);
  };
  // const MAX_RETRY_ATTEMPTS = 3; // Maximum number of retry attempts

  // const getDataWithRetry = async (apiFunction, params, retryCount = 0) => {
  //   if (retryCount >= MAX_RETRY_ATTEMPTS) {
  //     throw new Error("Failed to fetch non-empty data after multiple attempts");
  //   }

  //   const res = await apiFunction(params);
  //   if (Object.keys(res).length===0) {
  //     console.log("ProposalUploadApi", res);
  //     return getDataWithRetry(apiFunction, params, retryCount + 1);
  //   }
  //   return res;
  // };
  const CallApis = async (base64, docname) => {
    let DischargeData = "";
    let invoiceResult = "";
    const outputdata = await GetDocumentApimId(base64);
    const CallGetDocumentDataByApimId = async () => {
      const Data = await GetDocumentDataByApimId(outputdata.data);
      if (Object.keys(Data).length === 0) {
        await CallGetDocumentDataByApimId();
      } else {
        DischargeData = Data;
      }
    };
    await CallGetDocumentDataByApimId();
    const outputdata1 = await GetInvoiceApimId(base64);
    const CallGetInvoiceDataByApimId = async () => {
      const data = await GetInvoiceDataByApimId(outputdata1.data);
      if (Object.keys(data).length === 0) {
        await CallGetInvoiceDataByApimId();
      } else {
        invoiceResult = data;
      }
    };
    await CallGetInvoiceDataByApimId();

    // } else {
    //   DischargeData = await GetDocumentDataByApimId(outputdata.data);
    // }
    function removePatterns(input) {
      const removedComma = input.replace(/,/g, ""); // Remove commas
      const removedTime = removedComma.replace(/\n\d+:\d+/, ""); // Remove pattern "\nX:XX"
      return removedTime;
    }
    function convertDateFormat(inputDate) {
      const parts = inputDate.split(" ")[0].split("/");
      if (parts.length === 3 || parts.length === 2) {
        let [day, month, year] = parts;
        const monthMapping = {
          jan: "01",
          feb: "02",
          mar: "03",
          apr: "04",
          may: "05",
          jun: "06",
          jul: "07",
          aug: "08",
          sep: "09",
          oct: "10",
          nov: "11",
          dec: "12",
        };
        if (month.toLowerCase() in monthMapping) {
          month = monthMapping[month.toLowerCase()];
        }
        if (month <= 9) {
          month = `${month}`;
        }
        if (day <= 9) {
          day = `${day}`;
        }
        year = `${year}`;
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      }
      return null;
      // else {
      //   return null; // Invalid input format
      // }
    }
    console.log("invoiceResult", invoiceResult);
    console.log("DischargeData", DischargeData);
    // const name = uploadD[index].docName.toLowerCase();
    if (docname.includes("discharge")) {
      if (invoiceResult.status === "succeeded" && base64 !== "") {
        setOcrSwalFlag(false);
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress =
          invoiceResult.analyzeResult.documentResults[0].fields.VendorAddress.valueString;
        const res =
          claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress;
        const pincodeRegex = /\b\d{6}\b/;
        const matchessucess = res.match(pincodeRegex);
        if (matchessucess !== null && matchessucess) {
          // console.log("Nanditha", matches[0]);

          claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode = [
            matchessucess[0],
          ];
        }

        claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName =
          invoiceResult.analyzeResult.documentResults[0].fields.VendorName.valueString;
        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      }
      if (DischargeData.status === "succeeded" && base64 !== "") {
        setOcrSwalFlag(false);
        DischargeData.analyzeResult.styles.forEach((X) => {
          if (X.isHandwritten === true) {
            sethandwrittentrue(true);
          }
        });
        // const str = DischargeData.analyzeResult.pages[0].lines[1].content;
        DischargeData.analyzeResult.paragraphs.forEach(async (x) => {
          const str = x.content;
          // const spaceregex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
          // const spaceregex = /^[1-9]\d{2}\s?\d{3}$/;
          const spaceregex = /\b\d{3}\s?\d{3}\b/;
          const spaceregexRes = str.match(spaceregex);
          if (spaceregexRes !== null && spaceregexRes) {
            const spaceRemove = spaceregexRes[0].replace(/\s/g, "");

            claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode =
              spaceRemove;
          } else {
            const regex = /\d+/g;

            const regexMatch = str.match(regex);
            if (regexMatch !== null) {
              regexMatch.forEach((num) => {
                if (num.length === 6) {
                  const pincodeRegex = /\b\d{6}\b/;
                  const matches = num.match(pincodeRegex);
                  if (matches && !ocrPincodeflag) {
                    console.log("Nanditha", matches[0]);
                    [
                      claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails
                        .hospitalPincode,
                    ] = matches;

                    // claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode =
                    //   matches[0];
                    setOcrPincodeFlag(true);
                  }
                }
              });
            }
          }
        });

        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

        const req = {
          productId: 1022,
        };
        const PincodeObject = {
          PIN: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails
            .hospitalPincode,
        };

        const StateID = await master(req.productId, "Pincode_Master", PincodeObject);
        console.log("StateID", StateID);
        if (StateID.status === 200) {
          const stateResponse = {
            State_id: StateID.data[0].State_Id,
          };
          const cityResponse = { CityDistrict_Id: StateID.data[0].City_Id };
          const CityResult = await master(req.productId, "CityDistric_Name", cityResponse);
          if (CityResult.status === 200) {
            console.log("CityResult", CityResult);
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity =
              CityResult.data[0].mValue;
          }
          const stateRes = await master(req.productId, "State_Master", stateResponse);
          console.log("stateRes", stateRes);
          if (stateRes.status === 200) {
            // Assuming this should be a single value, not a map
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState =
              stateRes.data[0].mValue;

            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
        }

        DischargeData.analyzeResult.keyValuePairs.filter((x) => {
          const res = x.key.content.toLowerCase();
          // if (x.key.content === "NAME:") {
          //   claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName =
          //     x.value.content;
          // }

          if (res.includes("diagnosis")) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }

          // if (res.includes("patient") || res.includes("patient's") || res.includes("pt")) {
          //   claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
          //     x.value.content;
          //   setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          // }
          if (res.includes("patient name") && !patientNameFlag) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          } else if (res.includes("patient's name") && !patientNameFlag) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          } else if (res.includes("name of patient") && !patientNameFlag) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          } else if (res.includes("pt name") && !patientNameFlag) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;

            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          } else if (
            res === "name" ||
            res === "name:" ||
            res === "name " ||
            (res === "name :" && !patientNameFlag)
          ) {
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;

            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            setPatientNameFlag(true);
          }

          if (res.includes("admission")) {
            const data = x.value.content;
            if (data.includes(".")) {
              let [dd, mm, yyyy] = data.split(".");
              yyyy = `${yyyy}`;
              mm = mm.padStart(2, "0");
              dd = dd.padStart(2, "0");
              const ab = `20${yyyy}-${mm}-${dd}`;
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = ab;
              setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            }
            if (data.includes("/")) {
              const convertedDate1 = convertDateFormat(data);
              const cl = removePatterns(convertedDate1);
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = cl;
              setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            }
          }
          if (res.includes("discharge")) {
            const data = x.value.content;
            if (data.includes(".")) {
              let [dd, mm, yyyy] = data.split(".");
              yyyy = `${yyyy}`;
              mm = mm.padStart(2, "0");
              dd = dd.padStart(2, "0");
              const ab = `20${yyyy}-${mm}-${dd}`;
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod = ab;
              setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            }

            if (data.includes("/")) {
              const convert = convertDateFormat(data);
              const cls = removePatterns(convert);
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod =
                cls;
              setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            }
          }
          if (
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !==
              "" &&
            claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa !== ""
          ) {
            const lengthOfStay = diffDaysCalculator(
              new Date(
                claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa
              ),
              new Date(
                claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod
              )
            );
            if (
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !==
              ""
            ) {
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay =
                lengthOfStay;
            }
            if (
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails
                .lengthOfStay !== "" &&
              claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails
                .lengthOfStay >=
                claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible &&
              claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "Hospicash"
            ) {
              claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
                claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails
                  .lengthOfStay -
                claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible;
            } else {
              claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = 0;
            }
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
            console.log("lengthOfStay", lengthOfStay);
          }
          return true;
        });
      }
    }
    if (docname.includes("bank")) {
      if (invoiceResult.status === "succeeded" && base64 !== "") {
        const data1 = {
          productId: 1022,
          MasterType: "BankMasterCriteria",
          Bank_Name: invoiceResult.analyzeResult.documentResults[0].fields.VendorName.valueString,
        };
        const BankName = { Bank_Name: data1.Bank_Name };
        const bankapi = await masterIFSC(data1.productId, data1.MasterType, BankName);
        if (bankapi.status === 200) {
          if (bankapi.data.length > 0) {
            claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName =
              invoiceResult.analyzeResult.documentResults[0].fields.VendorName.valueString;
          } else {
            claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
            swal({
              html: true,
              icon: "warning",
              // title: "Claim Intimated Successful",
              text: " Bank name not available in Bank Master",
            });
          }
        }
        setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      }
      if (DischargeData.status === "succeeded" && base64 !== "") {
        // DischargeData.analyzeResult.styles.forEach((X) => {
        //   if (X.isHandwritten === true) {
        //     sethandwrittentrue(true);
        //   }
        // });
        DischargeData.analyzeResult.keyValuePairs.filter((x) => {
          const res = x.key.content.toLowerCase();
          if (res.includes("name")) {
            claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName =
              x.value.content;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
          // if (res.includes("ifsc")) {
          if (res.includes("ifsc") || res.includes("ifs")) {
            if (claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName !== "") {
              claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode =
                x.value.content;
            } else {
              claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
            }
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
          // if (res.includes("account")) {
          if (
            res.includes("account no") ||
            res.includes("account number") ||
            res.includes("a/c no") ||
            res.includes("खाता क्र.")
          ) {
            if (x.value !== undefined && x.value.content !== "") {
              claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.accountNo =
                x.value.content;
            }
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }

          return true;
        });
        DischargeData.analyzeResult.pages[0].lines.filter((items) => {
          const newName = items.content.replace(/^(?:Miss|Mrs|Ms|Mr)\.?\s*/i, "");
          if (
            newName.toUpperCase() ===
            claimDetails.claimBasicDetails.memberDetails.COIHolderName.toUpperCase()
          ) {
            claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName = newName;
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
          return true;
        });
      }
    }
  };
  const onOCRReader = async () => {
    // if (SearchObj.IntimationNo !== "") {
    // if (claimDetails.transactionDataDTO[0].transactionDetails.documentDetails) {
    //   upload.forEach((y) => {
    //     if (y.fileName !== "") {
    //       claimDetails[0].transactionDataDTO[0].transactionDetails.documentDetails.push(y);
    //       setUpload(upload);
    //       // setIntima((prev) => ({ ...prev, ...intima }));
    //       setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    //     }
    //   });
    // }
    //   if (claimDetails.transactionDataDTO[0].transactionDetails.documentDetails) {
    //     otherUpload.forEach((x) => {
    //       intima[0].transactionDataDTO[0].transactionDetails.documentDetails.push(x);
    //       setOtherUpload(otherUpload);
    //       setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    //     });
    //   }
    // }
    let file = 0;
    // claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.forEach((x) => {
    //   if (x.fileName !== "") {
    //     file += 1;
    //   }
    // });
    upload.forEach((x) => {
      if (x.fileName !== "") {
        file += 1;
      }
    });
    if (file === 0) {
      claimDetails.DocumentUploadFlag = "false";
      claimDetails.policyNo = SearchObj.policyNo;
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      const GenericApiResult = await GenericApi(
        "MagmaHospiCash01",
        "MagmaSaveClaimSubmitted",
        claimDetails
      );
      if (GenericApiResult.responseMessage === "Success") {
        setValidate(false);
        setStepForword(stepForward + 1);
        // Swal.fire({
        //   // html: true,
        //   // icon: "success",
        //   title: "We've got your Claim Intimation and we are on it",
        //   // text: "Your Claim Intimation  Number is 123456789 = ${mynum}",
        //   html: `
        //         <div>
        //           <p>Your Claim Intimation  Number is ${GenericApiResult.finalResult.regClaimNo}.</p><br/>
        //           <p style="font-size: 12px;">Keep your intimation number handy for future reference.</p>
        //         </div>
        //       `,
        //   confirmButtonColor: "#d33",
        //   confirmButtonText: "Go to Home",
        // }).then((res) => {
        //   if (res.isConfirmed) {
        //     handleTrackClaims();
        //   }
        // });
      }
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      // console.log("GenericApiResult", GenericApiResult);
    } else if (file > 0) {
      claimDetails.DocumentUploadFlag = "true";
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      const Payload = {
        productCode: "MagmaHospiCash01",
        // planType: "TestPlan1",
        planType: policyDetails[0].policyRequest.Plan,
        filterCriteria: [
          {
            SI: "",
            Type: "",
            Region: "",
            currency: "INR",
          },
        ],
        isFilterMemberWise: false,
        setBenefitMemberWise: false,
        insurableItems: null,
      };
      const res1 = await GetBenefits(Payload);
      console.log("res1", res1);
      if (res1.status === 1) {
        res1.finalResult.benefits.forEach((x) => {
          if (
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              x.CoverName &&
            x.HospitalizationCriteria !== "Separate"
          ) {
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Name = x.Benefit;
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible =
              x.Deductible;
          } else if (
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Hospicash" &&
            x.HospitalizationCriteria === "Separate"
          ) {
            const inputValue = parseInt(x.DeductibleNormal, 10);
            const inputValue1 = parseInt(x.DeductibleICU, 10);
            const resValue = inputValue + inputValue1;
            const text = resValue.toString();
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Name = x.Benefit;
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible = text;
          }
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        });
      }
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

      Swal.fire({
        html: `<div style={{display:"flex"}}>
        <img src=${scanningGIF} style="height:6rem;">
        <div><p> We're Currently scanning your docs to find the important stuff.
        It might take a little while...</p><br/>`,
      });

      // setOCRFlag(true);

      uploadD.forEach(async (xy) => {
        setOcrSwalFlag(true);
        const abc = xy.docName.toLowerCase();
        console.log("uploadD", uploadD);
        if (abc.includes("discharge") && xy.base64 !== "") {
          await CallApis(xy.base64, abc);
        }

        if (abc.includes("bank") && xy.base64 !== "") {
          await CallApis(xy.base64, abc);
        }
      });
      setOCRFlag(true);
    } else if (
      claimDetails.claimAmount === "" ||
      claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit === ""
    ) {
      setValidate(true);
    }
  };

  useEffect(() => {
    console.log("searchObj", SearchObj);
  }, [SearchObj]);
  useEffect(() => {
    console.log("memberData", memberData);
  }, [memberData]);
  useEffect(() => {
    console.log("intimation1", intimation);
  }, [intimation]);
  useEffect(() => {
    console.log("policy details", policyDetails);
  }, [policyDetails]);
  useEffect(() => {
    console.log("risk details", tableRows);
  }, [tableRows]);
  useEffect(() => {
    console.log("claim details", claimDetails);
  }, [claimDetails]);
  useEffect(() => {
    console.log("ben details", benefit);
  }, [benefit]);

  useEffect(async () => {
    const ClaimData = claimDetails;
    // const productCode = { MagmaHospiCash01 };
    if (claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName !== "") {
      const getProductByCodeResponse = await claimgetProductByCode("MagmaHospiCash01");
      console.log("getProductByCode", getProductByCodeResponse);
      if (getProductByCodeResponse !== null && getProductByCodeResponse.status === 200) {
        const BenfitIdconvert = JSON.parse(getProductByCodeResponse.data.productdetailJson);
        console.log("BenfitIdconvert", BenfitIdconvert);
        BenfitIdconvert.productInsurableItems[0].productCovers.forEach((x) => {
          if (
            x.cover ===
            claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName
          ) {
            ClaimData.transactionDataDTO[0].transactionDetails.benefitDetails.BenefitId =
              x.productBenefits[0].benefitId;
          }
          //  setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        });
        setClaimDetails((prev) => ({ ...prev, ...ClaimData }));
      }
    }
    // if(claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName)
  }, [claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName]);
  // useEffect(async () => {
  // const arr2 = [];
  // if (intima[0].transactionDataDTO[0].transactionDetails.documentDetails !== "") {
  // intima[0] &&
  //   intima[0].transactionDataDTO[0] &&
  //   intima[0].transactionDataDTO[0].transactionDetails &&
  //   intima[0].transactionDataDTO[0].transactionDetails.documentDetails.filter((sd) => {
  //     const obj = {
  //       docId: "",
  //       // docName: x.Value,
  //       UploadDocDate: "",
  //       fileName: "",
  //       TypeCode: x.TypeCode,
  //       // base64: "",
  //     };
  //     arr2.push(obj);
  //     intima[0].transactionDataDTO[0].transactionDetails.documentDetails.push(obj);
  //     setInUpload(arr2);
  //   });
  // }
  // documents.filter((sd) => {

  //   intimaDocument.filter((sd) => {
  //     if (sd.TypeCode === "Non Medical Documents") array4.push(sd.TypeCode);
  //     setArray4([...array4]);
  //     if (sd.TypeCode === "Required in Case of Death") array5.push(sd.TypeCode);
  //     setArray5([...array5]);
  //     if (sd.TypeCode === "Required in Case of TTD/ PPD/ PTD Claim") array6.push(sd.TypeCode);
  //     setArray6([...array6]);
  //     return true;
  //   });
  //   console.log("intimaa", intima);
  // }, [intimaDocument]);

  // const IFSC_CODE = "TXT_IFSC_CODE";
  // const abc = { IFSC_CODE: "" };
  const [abcd, setAbc] = useState({ TXT_IFSC_CODE: "" });
  // const abc = { TXT_IFSC_CODE: "" };
  // // console.log("abdss", IFSC_CODE);

  const handleIFSC = async (e, value, name) => {
    if (name === "ifscCode") {
      if (claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode === "") {
        abcd.TXT_IFSC_CODE = e.target.value;
        claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName = null;
      } else {
        abcd.TXT_IFSC_CODE = value;
      }
      setAbc((prev) => ({ ...prev, ...abcd }));

      const IFSCResponse = await masterIFSC(1022, "FinancierCode", abcd);
      console.log("ifscresponse", IFSCResponse);
      claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = value;
      const arr = [];
      const ifscOption = IFSCResponse.data.forEach((x) => {
        arr.push(x.mValue);
      });

      console.log("optionresult", ifscOption);
      setIfscArr1([...arr]);

      claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = value;
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

      const IFSC_CODE = IFSCResponse.data.map((x) => x.mID);
      const BankName = {
        Bank_CD: IFSC_CODE[0],
      };

      const IFSCResponse1 = await masterIFSC(1022, "BankName", BankName);
      console.log("IFSCRescode", IFSCResponse1);
      const arr2 = [];
      IFSCResponse1.data.forEach((x1) => {
        arr2.push(x1.mValue);
        claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName = x1.mValue;
      });
      setIfscBank([...arr2]);

      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    }

    // const IFSC_CODE = IFSCResponse.data.map((x) => x.mID);
    // const BankName = {
    //   Bank_CD: IFSC_CODE[IFSCResponse.data.length - 1],
    // };

    // const IFSCResponse1 = await masterIFSC(1022, "BankName", BankName);
    // console.log("IFSCRescode", IFSCResponse1);
    // setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
  };

  console.log("IFSCBak", ifscArr1);
  console.log("ifscbankname", ifscBank);

  // const handleIFSC = async (e, value, name) => {
  //   if (name === "ifscCode") {
  //

  //     claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = value;
  //     claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName = "";
  //     setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

  //     const abc = { TXT_IFSC_CODE: "" };
  //
  //     abc.TXT_IFSC_CODE = e.target.value;
  //     setIfscArr(abc);

  //     const IFSCResponse = await masterIFSC(1022, "FinancierCode", abc);
  //     console.log("ifscresponse", IFSCResponse);
  //     setIfscArr1([...IFSCResponse.data]);
  //     if (IFSCResponse.status === 200) {
  //
  //       const IFSCData = IFSCResponse.data;
  //       setIfscArr([...IFSCData]);
  //       // const IFSCIds = IFSCData.map((x1) => x1.mValue);

  //       // const BankName = {
  //       //   Bank_Id: IFSCIds[0],
  //       // };

  //       // const bankres = await master(1022, "FinancierBankBranch", BankName);
  //       console.log("bankRes", IFSCData);

  //       // if (bankres.status === 200) {
  //       //   const arr = [];
  //       //   bankres.data.filter((x) => {
  //       //     ifscArr.forEach((y) => {
  //       //       if (x.mValue === y) {
  //       //         arr.push(x.mValue);
  //       //       }
  //       //     });
  //       //     return null;
  //       //   });
  //       //   setCityDistrict([...arr]);
  //       //   setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
  //       // }
  //     }
  //   }
  // };
  let ifscdata = 0;
  let productIddata = 0;
  const handleState = async (e, value, name) => {
    if (name === "bankName") {
      claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
      claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName = value;
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      if (
        claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode === "" &&
        claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName === ""
      ) {
        setFinancierArray([]);
      }
      if (claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName !== null) {
        bankMastersData.forEach(async (x) => {
          if (
            x.mValue === claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName
          ) {
            productIddata = {
              productId: 1022,
            };
            ifscdata = { Bank_CD: x.mID };
          }
        });
        if (claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName !== null) {
          const srs = await master(productIddata.productId, "FinancierBankBranch", ifscdata);
          console.log("srs", srs);
          const arr = [];
          if (srs && srs.status === 200) {
            srs.data.forEach((res) => {
              // claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode =
              // res.mValue;
              arr.push(res.mValue);
            });
            setFinancierArray([...arr]);
            setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
          }
        }
      }
    }

    if (name === "ifscCode") {
      claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = value;
      //     claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName = "";
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

      // if (claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode === "") {
      //   abcd.TXT_IFSC_CODE = e.target.value;
      //   setAbc((prev) => ({ ...prev, ...abcd }));

      //   const IFSCResponse = await masterIFSC(1022, "FinancierCode", abcd);
      //   console.log("ifscresponse", IFSCResponse);
      //   const arr = [];
      //   IFSCResponse.data.forEach((x) => {
      //     arr.push(x.mValue);
      //   });
      //   setIfscArr1([...arr]);
      //   claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = value;
      //   setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

      //   const IFSC_CODE = IFSCResponse.data.map((x) => x.mID);
      //   const BankName = {
      //     Bank_CD: IFSC_CODE[0],
      //   };

      //   const IFSCResponse1 = await masterIFSC(1022, "BankName", BankName);
      //   console.log("IFSCRescode", IFSCResponse1);
      //   const arr2 = [];
      //   IFSCResponse1.data.forEach((x1) => {
      //     arr2.push(x1.mValue);
      //   });
      //   setIfscBank([...arr2]);

      //   setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
      // }
    }

    if (name === "hospitalState") {
      claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState = value;
      claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity = "";
      claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode = "";
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

      const citymas = {
        State: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
      };
      const data1 = {
        productId: 1022,
      };
      const sr = await master(data1.productId, "State", citymas);
      console.log("sr", sr);
      if (sr.status === 200) {
        const DataArray = sr.data;
        const cityIds = DataArray.map((xt) => xt.mValue);
        // const stateId = DataArray.map((xt) => xt.State_Id);

        const cityDistrict1 = {
          State_Id: cityIds[0],
        };
        // const stateResponse = {
        //   State_id: stateId[0],
        // };
        const stateRes = await master(data1.productId, "City", cityDistrict1);
        console.log("stateRes", stateRes);

        if (stateRes.status === 200) {
          const arr = [];
          stateRes.data.filter((x) => {
            cityDistrictD.forEach((y) => {
              if (x.CityDistrictName === y) {
                arr.push(x.CityDistrictName);
              }
            });
            return null;
          });
          // Assuming this should be a single value, not a map
          // claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState =
          //   stateRes.data[0].mValue;
          setCityDistrict([...arr]);
          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        }
        const PincodeResponse = await master(data1.productId, "PincodeMaster", cityDistrict1);
        console.log("PincodeResponse", PincodeResponse);

        if (PincodeResponse.status === 200) {
          // const Pinc = [];
          const Pinc = new Set();
          PincodeResponse.data.map((yy) => {
            // Pinc.push(yy);
            Pinc.add(yy.mValue);

            return null;
          });
          setPincode([...Pinc]);
        }
      }
    }
  };

  // console.log("ifscarrays", ifscArr1);

  const handleICD = async (e, value, name) => {
    claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode = "";
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

    if (name === "hospitalCity") {
      claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity = value;
      setClaimDetails((prev) => ({ ...prev, ...claimDetails }));

      const citymas = {
        CityDistrict_Name:
          claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
      };
      const data1 = {
        productId: 1022,
      };
      const cityMasterResponse = await master(data1.productId, "CityMaster", citymas);
      console.log("cityMasterResponse", cityMasterResponse);
      if (cityMasterResponse.status === 200) {
        const DataArray = cityMasterResponse.data;
        const cityIds = DataArray.map((xt) => xt.CityDistrict_Id);
        const stateId = DataArray.map((xt) => xt.State_Id);

        const cityDistrict1 = {
          City_Id: cityIds[0],
        };
        const stateResponse = {
          State_id: stateId[0],
        };
        const stateRes = await master(data1.productId, "State_Master", stateResponse);
        console.log("stateRes", stateRes);
        if (stateRes.status === 200) {
          // Assuming this should be a single value, not a map
          claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState =
            stateRes.data[0].mValue;

          setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
        }
        const PincodeResponse = await master(data1.productId, "PincodeMaster", cityDistrict1);
        console.log("PincodeResponse", PincodeResponse);

        if (PincodeResponse.status === 200) {
          // const Pinc = [];
          const Pinc = new Set();
          PincodeResponse.data.map((yy) => {
            // Pinc.push(yy);
            Pinc.add(yy.mValue);

            return null;
          });
          setPincode([...Pinc]);
        }
      }
    }
    if (name === "hospitalPincode") {
      claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode = value;
    }
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
  };

  // const Medical = localStorage.getItem("roleId");

  // const handleIntimation = (e, value) => {
  //
  //   // value: claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName,
  //   if (intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefit !== "") {
  //     claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = value;
  //   }
  //   setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
  // };
  const controlItems = [
    {
      type: "Input",
      label: "UHID",
      // visible: SearchObj.policyNo !== "",
      visible: true,
      name: "memberId",
      value: claimDetails.claimBasicDetails.memberDetails.memberId,
      path: "memberDetails",
      disable: true,
    },
    {
      type: "Input",
      label: "Member Name",
      // visible: SearchObj.policyNo !== "",
      visible: true,
      name: "insuredName",
      value: claimDetails.claimBasicDetails.memberDetails.insuredName,
      path: "memberDetails",
      disable: true,
    },
    // {
    //   type: "Input",
    //   label: "UHID",
    //   visible: SearchObj.IntimationNo !== "",
    //   name: "memberId",
    //   // value: claimDetails.claimBasicDetails.memberDetails.memberId,
    //   value: intimation[0] && intimation[0].UHID,
    //   path: "memberDetails",
    //   disable: true,
    // },
    // {
    //   type: "Input",
    //   label: "Member Name",
    //   visible: SearchObj.IntimationNo !== "",
    //   name: "insuredName",
    //   value: intimation[0] && intimation[0].Name,
    //   // value: claimDetails.claimBasicDetails.memberDetails.insuredName,
    //   path: "memberDetails",
    //   disable: true,
    // },
    // {
    //   type: "Input",
    //   label: "UHID",
    //   visible: SearchObj.UHID !== "",
    //   name: "memberId",
    //   // value: claimDetails.claimBasicDetails.memberDetails.memberId,
    //   value: memberData[0] && memberData[0].UHID,
    //   path: "memberDetails",
    //   disable: true,
    // },
    // {
    //   type: "Input",
    //   label: "Member Name",
    //   visible: SearchObj.UHID !== "",
    //   name: "insuredName",
    //   value: memberData[0] && memberData[0].Name,
    //   // value: claimDetails.claimBasicDetails.memberDetails.insuredName,
    //   path: "memberDetails",
    //   disable: true,
    // },

    // {
    //   type: "DateTime",
    //   label: "Date Of Admission",
    //   visible: true,
    //   name: "doa",
    //   value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
    //   path: "hospitalizationDetails",
    // },
    // {
    //   type: "DateTime",
    //   label: "Date Of Discharge",
    //   visible: true,
    //   name: "dod",
    //   value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod,
    //   path: "hospitalizationDetails",
    // },
    // {
    //   type: "Input",
    //   label: "Claimed Amount",
    //   visible: true,
    //   name: "claimedAmount",
    //   value: claimDetails.transactionDataDTO[0].transactionDetails.claimedAmount,
    //   path: "transactionDetails",
    // },
    {
      type: "AutoComplete",
      label: "Benefit Type",
      visible: SearchObj.IntimationNo === "",
      // visible: true,
      name: "benefit",
      value: claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName,
      path: "benefitDetails",
      option: benefit,
      // customOnChange: (e, value) => handleBenefit(e, value, "benefit"),
    },
    {
      type: "AutoComplete",
      label: "Benefit Type",
      visible: SearchObj.IntimationNo !== "",
      name: "benefit",
      // value: claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName,
      value:
        intimation[0] &&
        intimation[0].transactionDataDTO[0] &&
        intimation[0].transactionDataDTO[0].transactionDetails &&
        intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails &&
        intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName,
      path: "benefitDetails",
      // customOnChange: (e, value) => handleIntimation(e, value),
      option: benefit,
      // disable: true,
    },
  ];

  const ocrReadItems = [
    {
      type: "DateTime",
      required: true,
      label: "Date Of Admission",
      visible: true,
      name: "doa",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
      path: "hospitalizationDetails",
      maxDate: new Date(),
    },
    {
      type: "DateTime",
      required: true,
      label: "Date Of Discharge",
      visible: true,
      name: "dod",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod,
      path: "hospitalizationDetails",
      maxDate: new Date(),
      minDate: new Date(
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa
      ),
      // options: (maxDate = new Date()),
    },
    {
      type: "Input",
      required: true,
      label: "Diagnosis",
      visible: true,
      name: "diagnosis",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis,
      path: "hospitalizationDetails",
    },
    {
      type: "Input",
      required: true,
      label: "Length of Stay",
      visible: true,
      name: "lengthOfStay",
      value:
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay,
      path: "hospitalizationDetails",
      disable: true,
    },
    {
      type: "Input",
      required: true,
      label: "Patient Name",
      visible: true,
      name: "PatientName",
      value:
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName,
      path: "hospitalizationDetails",
      onChangeFuncs: [IsAlphaSpace],
      // inputProps: { type: "text" },
    },
    {
      type: "Input",
      required: true,
      label: "Hospital Name",
      visible: true,
      name: "hospitalName",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
      path: "hospitalDetails",
      onChangeFuncs: [IsAlphaSpace],
    },
    {
      type: "Input",
      required: true,
      label: "Hospital Address",
      visible: true,
      name: "hospitalAddress",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress,
      path: "hospitalDetails",
    },

    {
      type: "AutoComplete",
      required: true,
      label: "Hospital City",
      visible: true,
      name: "hospitalCity",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
      path: "hospitalDetails",
      option: cityDistrict,
      customOnChange: (e, value) => handleICD(e, value, "hospitalCity"),
    },
    {
      type: "AutoComplete",
      required: true,
      label: "Hospital Pincode",
      visible: true,
      name: "hospitalPincode",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
      path: "hospitalDetails",
      option: pincode,
      customOnChange: (e, value) => handleICD(e, value, "hospitalPincode"),
    },
    {
      type: "AutoComplete",
      required: true,
      label: "Hospital State",
      visible: true,
      name: "hospitalState",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
      path: "hospitalDetails",
      option: stateR,
      // customOnChange: (e, value) => handleICD(e, value, "hospitalState"),
      customOnChange: (e, value) => handleState(e, value, "hospitalState"),
    },
    // {
    //   type: "AutoComplete",
    //   label: "Hospital City",
    //   name: "hospitalCity",
    //   value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
    //   visible: true,
    //   path: "hospitalDetails",
    //   optionLabel: "mValue",
    //   option: cityDistrict,
    //   // customOnChange: (e, value) => handleICD(e, value, "hospitalCity"),
    // },

    {
      type: "Input",
      required: true,
      label: "Payee Name",
      visible: true,
      name: "payeeName",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName,
      path: "paymentObj",
      onChangeFuncs: [IsAlphaSpace],
    },
    {
      type: "AutoComplete",
      required: true,
      label: "IFSC Code",
      visible: true,
      name: "ifscCode",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
      path: "paymentObj",
      option: financierArray.length > 0 ? financierArray : ifscArr1,
      // option: ifscArr,
      customOnChange: (e, value) => handleIFSC(e, value, "ifscCode"),
      onChangeFuncs: [IsAlphaSpace],
    },
    // {
    //   type: "Input",
    //   required: true,
    //   visible: true,
    //   label: "IFSC Code",
    //   // name: "ifscCode",
    //   value: abcd.TXT_IFSC_CODE,
    //   // value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
    //   // path: "paymentObj",
    //   // option: financierArray.length > 0 ? financierArray : ifscArr,
    //   customOnChange: (e) => handleIFSC(e),
    //   // onChangeFuncs: [IsAlphaSpace],
    // },
    {
      type: "AutoComplete",
      required: true,
      label: "Bank Name",
      visible: true,
      name: "bankName",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
      path: "paymentObj",
      option: ifscBank.length > 0 ? ifscBank : bankMasterData,
      customOnChange: (e, value) => handleState(e, value, "bankName"),
    },
    {
      type: "Input",
      required: true,
      label: "Account No",
      visible: true,
      name: "accountNo",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
      path: "paymentObj",
      onChangeFuncs: [IsAlphaNum],
    },
  ];
  return (
    <Card>
      <div>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}
      </div>
      {stepperFlag === true && (
        <>
          {/* <Grid container p={2} justifyContent="left">
            <MDTypography variant="body1" color="primary">
              Create New Claim
            </MDTypography>
          </Grid> */}
          <Grid container justifyContent="center" alignItems="center">
            <Stepper activeStep={stepForward} alternativeLabel sx={{ width: "50%", height: "50%" }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </>
      )}

      {flagD === false ? (
        <>
          {/* <Grid p={2}> */}
          <Grid container spacing={3} p={2} direction="row">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" color="primary">
                Create New Claim
              </MDTypography>
            </Grid>
            {Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1" ? (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography style={{ marginLeft: "19rem" }}>Role Name:DEO USER</MDTypography>
              </Grid>
            ) : null}
            {Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c" ? (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography style={{ marginLeft: "19rem" }}>
                  Role Name:Medical Adjudicator
                </MDTypography>
              </Grid>
            ) : null}
          </Grid>
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="COI Number"
                name="policyNo"
                value={SearchObj.policyNo}
                onChange={(e) => handleChange(e)}
                onBlur={handleOnBlur}
                disabled={flags.coiflag}
                inputProps={{ maxLength: 37 }}
              />
              {flags.nameReg === true ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Enter Correct COI no.
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="UHID"
                name="UHID"
                value={SearchObj.UHID}
                onChange={(e) => handleChange(e)}
                onBlur={handleOnBlur}
                inputProps={{ maxLength: 17 }}
                disabled={flags.uhidflag}
              />
              {flags.uhidReg === true ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Enter Correct UHID no.
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Intimation No"
                name="IntimationNo"
                value={SearchObj.IntimationNo}
                onChange={(e) => handleChange(e)}
                onBlur={handleOnBlur}
                inputProps={{ maxLength: 13 }}
                disabled={flags.intimationflag}
              />
              {flags.intimationReg === true ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Enter Correct Claim Intimation number
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="center" direction="row">
                <MDButton
                  variant="contained"
                  onClick={onPolicySearch}
                  disabled={flags.searchbuttonflag === true}
                >
                  SEARCH
                </MDButton>
              </Stack>
            </Grid>
          </Grid>
        </>
      ) : null}
      {memFlag === true ? (
        <Grid p={2}>
          <DataGrid
            autoHeight
            rows={tableRows}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.UHID}
            // onRowClick={(param) => handleMemberClick(param)}
          />
          <br />
          <Stack justifyContent="right" direction="row" spacing={2}>
            <MDButton onClick={handleBack}>Back</MDButton>
            <MDButton disabled={!disableFlag} onClick={() => handleMemberClick()}>
              PROCEED
            </MDButton>
          </Stack>
        </Grid>
      ) : null}
      {detailsFlag === true ? (
        <>
          <Grid p={2}>
            <MDTypography variant="body1" color="primary">
              Claim Details
            </MDTypography>
          </Grid>
          <Grid container spacing={2} p={2}>
            {controlItems.map((item) =>
              item.visible ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl
                    item={item}
                    validate={validate}
                    claimDetails={claimDetails}
                    policyDetails={policyDetails}
                    setClaimDetails={setClaimDetails}
                    documents={documents}
                    setDocuments={setDocuments}
                    setUpload={setUpload}
                    setUploadD={setUploadD}
                    setArray1={setArray1}
                    setArrayD={setArrayD}
                    arrayD={arrayD}
                    array1={array1}
                    setArray2={setArray2}
                    array2={array2}
                    setArray3={setArray3}
                    array3={array3}
                    setArray4={setArray4}
                    array4={array4}
                    setArray5={setArray5}
                    array5={array5}
                    setArray6={setArray6}
                    array6={array6}
                    intimaDocument={intimaDocument}
                    setInDocument={setInDocument}
                    setOtherUpload={setOtherUpload}
                    intimation={intimation}
                    setIntimation={setIntimation}
                    SearchObj={SearchObj}
                    arrayDD={arrayDD}
                    setArrayDD={setArrayDD}
                    setUploadFlags={setUploadFlags}
                    setOtherUploadFlag={setOtherUploadFlag}
                    otherUpload={otherUpload}
                    upload={upload}
                    // setDisable={setDisable}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
          {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName !==
          "" ? (
            <Grid p={2}>
              <MDTypography variant="body1" color="primary">
                Upload Documents
              </MDTypography>
            </Grid>
          ) : null}

          {SearchObj.IntimationNo !== "" ? (
            <Grid>
              {(intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails
                .benefitName === "Hospicash" ||
                intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails
                  .benefitName === "Child Education Grant" ||
                intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails
                  .benefitName === "Loss of Job" ||
                intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails
                  .benefitName === "EMI Benefit") && (
                <Grid container spacing={2} p={2}>
                  {intimaDocument.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <MDInput value={x.Value} label="Document Name" />
                      </Grid>

                      <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
                        <label htmlFor={`file-upload-${id}`}>
                          <input
                            id={`file-upload-${id}`}
                            name={`file-upload-${id}`}
                            accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleUpload(id, e)}
                            onClick={(e) => {
                              e.target.value = "";
                            }}
                            disabled={uploadFlags[id]}
                          />
                          <MDButton variant="outlined" component="span">
                            Upload
                          </MDButton>
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5}>
                        {documentflag === true ? (
                          <Grid sx={{ fontSize: "14px" }}>
                            {upload[id] && <p>{upload[id].fileName}</p>}
                          </Grid>
                        ) : null}
                      </Grid>

                      {upload[id] && upload[id].fileName && (
                        <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                          <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                            <CancelIcon fontSize="large" color="error" />
                          </IconButton>
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
                  {/* </Grid>
                  </Grid> */}
                </Grid>
              )}
            </Grid>
          ) : null}
          {SearchObj.IntimationNo !== "" ? (
            <Grid>
              {intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "Critical Illness" ||
              intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "Personal Accident" ? (
                <Grid container spacing={0.5} p={2}>
                  {intimaDocument.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {id < 1 && <MDTypography>{array4[0]}</MDTypography>}
                      </Grid>
                      {x && x.TypeCode === "Non Medical Documents" ? (
                        <>
                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDInput
                              sx={{ marginTop: "8px" }}
                              value={x.Value}
                              label="Document Name"
                            />
                          </Grid>

                          <Grid item xs={4} marginTop="10px">
                            <label htmlFor={`file-upload-${id}`}>
                              <input
                                id={`file-upload-${id}`}
                                name={`file-upload-${id}`}
                                // accept="image/jpeg,application/pdf,png"
                                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleUpload(id, e)}
                                onClick={(e) => {
                                  e.target.value = "";
                                }}
                                disabled={uploadFlags[id]}
                              />
                              <MDButton variant="outlined" component="span">
                                Upload
                              </MDButton>
                            </label>
                          </Grid>
                          <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                            {documentflag === true ? (
                              <Grid sx={{ fontSize: "14px" }}>
                                {upload[id] && <p>{upload[id].fileName}</p>}
                              </Grid>
                            ) : null}
                          </Grid>

                          {upload[id] && upload[id].fileName && (
                            <Grid item xs sx={{ ml: "2rem" }}>
                              <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                                <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                              </IconButton>
                            </Grid>
                          )}
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </Grid>
              ) : null}
            </Grid>
          ) : null}
          {SearchObj.IntimationNo !== "" ? (
            <Grid>
              {intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Critical Illness" ? (
                <Grid container spacing={0.5} p={2}>
                  {intimaDocument.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {id < 1 && <MDTypography>{arrayDD[0]}</MDTypography>}
                      </Grid>
                      {x && x.TypeCode === "Medical Documents" ? (
                        <>
                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDInput
                              sx={{ marginTop: "8px" }}
                              value={x.Value}
                              label="Document Name"
                            />
                          </Grid>

                          <Grid item xs={4} marginTop="10px">
                            <label htmlFor={`file-upload-${id}`}>
                              <input
                                id={`file-upload-${id}`}
                                name={`file-upload-${id}`}
                                // accept="image/jpeg,application/pdf,png"
                                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleUpload(id, e)}
                                onClick={(e) => {
                                  e.target.value = "";
                                }}
                                disabled={uploadFlags[id]}
                              />
                              <MDButton variant="outlined" component="span">
                                Upload
                              </MDButton>
                            </label>
                          </Grid>
                          <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                            {documentflag === true ? (
                              <Grid sx={{ fontSize: "14px" }}>
                                {upload[id] && <p>{upload[id].fileName}</p>}
                              </Grid>
                            ) : null}
                          </Grid>

                          {upload[id] && upload[id].fileName && (
                            <Grid item xs sx={{ ml: "2rem" }}>
                              <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                                <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                              </IconButton>
                            </Grid>
                          )}
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </Grid>
              ) : null}
            </Grid>
          ) : null}
          {SearchObj.IntimationNo !== "" ? (
            <Grid>
              {intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Personal Accident" ? (
                <Grid container spacing={0.5} p={2}>
                  {intimaDocument.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {id < 1 && <MDTypography>{array5[0]}</MDTypography>}
                      </Grid>
                      {x && x.TypeCode === "Required in Case of Death" ? (
                        <>
                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDInput
                              sx={{ marginTop: "8px" }}
                              value={x.Value}
                              label="Document Name"
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} marginTop="10px">
                            <label htmlFor={`file-upload-${id}`}>
                              <input
                                id={`file-upload-${id}`}
                                name={`file-upload-${id}`}
                                // accept="image/jpeg,application/pdf,png"
                                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleUpload(id, e)}
                                onClick={(e) => {
                                  e.target.value = "";
                                }}
                                disabled={uploadFlags[id]}
                              />
                              <MDButton variant="outlined" component="span">
                                Upload
                              </MDButton>
                            </label>
                          </Grid>
                          <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                            {documentflag === true ? (
                              <Grid sx={{ fontSize: "14px" }}>
                                {upload[id] && <p>{upload[id].fileName}</p>}
                              </Grid>
                            ) : null}
                          </Grid>

                          {upload[id] && upload[id].fileName && (
                            <Grid item xs sx={{ ml: "2rem" }}>
                              <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                                <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                              </IconButton>
                            </Grid>
                          )}
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </Grid>
              ) : null}
            </Grid>
          ) : null}
          {SearchObj.IntimationNo !== "" ? (
            <Grid>
              {intimation[0].transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Personal Accident" ? (
                <Grid container spacing={0.5} p={2}>
                  {intimaDocument.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {id < 1 && <MDTypography>{array6[0]}</MDTypography>}
                      </Grid>
                      {x && x.TypeCode === "Required in Case of TTD/ PPD/ PTD Claim" ? (
                        <>
                          {" "}
                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDInput
                              sx={{ marginTop: "8px" }}
                              value={x.Value}
                              label="Document Name"
                            />
                          </Grid>
                          <Grid item xs={4} marginTop="10px">
                            <label htmlFor={`file-upload-${id}`}>
                              <input
                                id={`file-upload-${id}`}
                                name={`file-upload-${id}`}
                                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleUpload(id, e)}
                                onClick={(e) => {
                                  e.target.value = "";
                                }}
                                disabled={uploadFlags[id]}
                              />
                              <MDButton variant="outlined" component="span">
                                Upload
                              </MDButton>
                            </label>
                          </Grid>
                          <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                            {documentflag === true ? (
                              <Grid sx={{ fontSize: "14px" }}>
                                {upload[id] && <p>{upload[id].fileName}</p>}
                              </Grid>
                            ) : null}
                          </Grid>
                          {upload[id] && upload[id].fileName && (
                            <Grid item xs sx={{ ml: "2rem" }}>
                              <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                                <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                              </IconButton>
                            </Grid>
                          )}
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </Grid>
              ) : null}
            </Grid>
          ) : null}
          {SearchObj.IntimationNo === "" ? (
            <Grid>
              {(claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "Hospicash" ||
                claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                  "Child Education Grant" ||
                claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                  "Loss of Job" ||
                claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                  "EMI Benefit") && (
                <Grid container spacing={2} p={2}>
                  {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Grid container spacing={2}> */}
                  {documents.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <MDInput value={x.Value} label="Document Name" />
                      </Grid>

                      <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
                        <label htmlFor={`file-upload-${id}`}>
                          <input
                            id={`file-upload-${id}`}
                            name={`file-upload-${id}`}
                            accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleUpload(id, e)}
                            onClick={(e) => {
                              e.target.value = "";
                            }}
                            disabled={uploadFlags[id]}
                          />
                          <MDButton variant="outlined" component="span">
                            Upload
                          </MDButton>
                        </label>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3.2} lg={3.2} xl={3.2} xxl={3.2}>
                        {documentflag === true ? (
                          <Grid sx={{ fontSize: "14px" }}>
                            {upload[id] && <p>{upload[id].fileName}</p>}
                          </Grid>
                        ) : null}
                      </Grid>

                      {upload[id] && upload[id].fileName && (
                        <Grid item xs={12} sm={12} md={2.3} lg={2.3} xl={2.3} xxl={2.3}>
                          <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                            <CancelIcon
                              fontSize="large"
                              color="error"
                              sx={{ marginLeft: "3.4rem" }}
                            />
                          </IconButton>
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
                  {/* </Grid>
                  </Grid> */}
                </Grid>
              )}
            </Grid>
          ) : null}
          {SearchObj.IntimationNo === "" ? (
            <Grid>
              {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "Critical Illness" ||
              claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "Personal Accident" ? (
                <Grid container spacing={0.5} p={2}>
                  {documents.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {id < 1 && <MDTypography>{array1[0]}</MDTypography>}
                      </Grid>
                      {x && x.TypeCode === "Non Medical Documents" ? (
                        <>
                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDInput
                              sx={{ marginTop: "8px" }}
                              value={x.Value}
                              label="Document Name"
                            />
                          </Grid>

                          <Grid item xs={4} marginTop="10px">
                            <label htmlFor={`file-upload-${id}`}>
                              <input
                                id={`file-upload-${id}`}
                                name={`file-upload-${id}`}
                                // accept="image/jpeg,application/pdf,png"
                                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleUpload(id, e)}
                                onClick={(e) => {
                                  e.target.value = "";
                                }}
                                disabled={uploadFlags[id]}
                              />
                              <MDButton variant="outlined" component="span">
                                Upload
                              </MDButton>
                            </label>
                          </Grid>
                          <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                            {documentflag === true ? (
                              <Grid sx={{ fontSize: "14px" }}>
                                {upload[id] && <p>{upload[id].fileName}</p>}
                              </Grid>
                            ) : null}
                          </Grid>

                          {upload[id] && upload[id].fileName && (
                            <Grid item xs sx={{ ml: "2rem" }}>
                              <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                                <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                              </IconButton>
                            </Grid>
                          )}
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </Grid>
              ) : null}
            </Grid>
          ) : null}
          {SearchObj.IntimationNo === "" ? (
            <Grid>
              {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Critical Illness" ? (
                <Grid container spacing={0.5} p={2}>
                  {documents.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {id < 1 && <MDTypography>{arrayD[0]}</MDTypography>}
                      </Grid>
                      {x && x.TypeCode === "Medical Documents" ? (
                        <>
                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDInput
                              sx={{ marginTop: "8px" }}
                              value={x.Value}
                              label="Document Name"
                            />
                          </Grid>

                          <Grid item xs={4} marginTop="10px">
                            <label htmlFor={`file-upload-${id}`}>
                              <input
                                id={`file-upload-${id}`}
                                name={`file-upload-${id}`}
                                // accept="image/jpeg,application/pdf,png"
                                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleUpload(id, e)}
                                onClick={(e) => {
                                  e.target.value = "";
                                }}
                                disabled={uploadFlags[id]}
                              />
                              <MDButton variant="outlined" component="span">
                                Upload
                              </MDButton>
                            </label>
                          </Grid>
                          <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                            {documentflag === true ? (
                              <Grid sx={{ fontSize: "14px" }}>
                                {upload[id] && <p>{upload[id].fileName}</p>}
                              </Grid>
                            ) : null}
                          </Grid>

                          {upload[id] && upload[id].fileName && (
                            <Grid item xs sx={{ ml: "2rem" }}>
                              <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                                <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                              </IconButton>
                            </Grid>
                          )}
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </Grid>
              ) : null}
            </Grid>
          ) : null}
          {SearchObj.IntimationNo === "" ? (
            <Grid>
              {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Personal Accident" ? (
                <Grid container spacing={0.5} p={2}>
                  {documents.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {id < 1 && <MDTypography>{array2[0]}</MDTypography>}
                      </Grid>
                      {x && x.TypeCode === "Required in Case of Death" ? (
                        <>
                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDInput
                              sx={{ marginTop: "8px" }}
                              value={x.Value}
                              label="Document Name"
                            />
                          </Grid>

                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} marginTop="10px">
                            <label htmlFor={`file-upload-${id}`}>
                              <input
                                id={`file-upload-${id}`}
                                name={`file-upload-${id}`}
                                // accept="image/jpeg,application/pdf,png"
                                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleUpload(id, e)}
                                onClick={(e) => {
                                  e.target.value = "";
                                }}
                                disabled={uploadFlags[id]}
                              />
                              <MDButton variant="outlined" component="span">
                                Upload
                              </MDButton>
                            </label>
                          </Grid>
                          <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                            {documentflag === true ? (
                              <Grid sx={{ fontSize: "14px" }}>
                                {upload[id] && <p>{upload[id].fileName}</p>}
                              </Grid>
                            ) : null}
                          </Grid>

                          {upload[id] && upload[id].fileName && (
                            <Grid item xs sx={{ ml: "2rem" }}>
                              <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                                <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                              </IconButton>
                            </Grid>
                          )}
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </Grid>
              ) : null}
            </Grid>
          ) : null}
          {SearchObj.IntimationNo === "" ? (
            <Grid>
              {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Personal Accident" ? (
                <Grid container spacing={0.5} p={2}>
                  {documents.map((x, id) => (
                    <React.Fragment key={x.mID}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        {id < 1 && <MDTypography>{array3[0]}</MDTypography>}
                      </Grid>
                      {x && x.TypeCode === "Required in Case of TTD/ PPD/ PTD Claim" ? (
                        <>
                          {" "}
                          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDInput
                              sx={{ marginTop: "8px" }}
                              value={x.Value}
                              label="Document Name"
                            />
                          </Grid>
                          <Grid item xs={4} marginTop="10px">
                            <label htmlFor={`file-upload-${id}`}>
                              <input
                                id={`file-upload-${id}`}
                                name={`file-upload-${id}`}
                                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleUpload(id, e)}
                                onClick={(e) => {
                                  e.target.value = "";
                                }}
                                disabled={uploadFlags[id]}
                              />
                              <MDButton variant="outlined" component="span">
                                Upload
                              </MDButton>
                            </label>
                          </Grid>
                          <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                            {documentflag === true ? (
                              <Grid sx={{ fontSize: "14px" }}>
                                {upload[id] && <p>{upload[id].fileName}</p>}
                              </Grid>
                            ) : null}
                          </Grid>
                          {upload[id] && upload[id].fileName && (
                            <Grid item xs sx={{ ml: "2rem" }}>
                              <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                                <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                              </IconButton>
                            </Grid>
                          )}
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </Grid>
              ) : null}
            </Grid>
          ) : null}

          {/* <Grid container p={2} >
            <Grid item xs={6} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
          <Grid container spacing={0.5} p={2}>
            {otherUpload.map((x, id) => (
              <React.Fragment key={x}>
                <Grid item xs={5}>
                  <MDInput
                    label="Add Other Documnet"
                    name="other"
                    value={x.docName}
                    onChange={(e) => handleAddother(e, id, "other")}
                  />
                </Grid>
                <Grid item xs={1} marginTop="5px">
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
                    <MDButton variant="outlined" component="span">
                      Upload
                    </MDButton>
                  </label>
                </Grid>
                <Grid item xs={1}>
                  {otherUpload && (
                    <Grid item xs={1} marginTop="5px">
                      {/* <IconButton onClick={() => handleDeleteOther(id)}>
                      <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                    </IconButton> */}
                      {/* <Stack direction="row" justifyContent="left"> */}
                      <MDButton variant="outlined" onClick={() => handleDeleteOther(id)}>
                        DELETE
                      </MDButton>
                      {/* </Stack> */}
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={3} style={{ marginTop: "6px" }}>
                  <Grid sx={{ fontSize: "14px" }}>
                    <p> {otherUpload[id] && otherUpload[id].fileName}</p>
                  </Grid>
                </Grid>
                {otherUpload[id] && otherUpload[id].fileName && (
                  <Grid item xs={1} sx={{ ml: "2rem" }}>
                    <IconButton onClick={(e) => handleOtherRemove(id, e)}>
                      <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                    </IconButton>
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
          {/* </Grid> */}
          {/* </Grid> */}
          {claimDetails.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName !==
          "" ? (
            <Grid container spacing={0.5} p={2}>
              <MDButton
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={(e) => handleAddDocument(e)}
              >
                Add Other Document
              </MDButton>
            </Grid>
          ) : null}
          {ocrFlag === false ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
              <Stack direction="row" justifyContent="right" spacing={2}>
                <MDButton
                  variant="outlined"
                  onClick={handelBacktoMemberSelection}
                  // sx={{ ml: "3rem" }}
                >
                  Back
                </MDButton>
                <MDButton disabled={disableproceed} onClick={() => onOCRReader()}>
                  Proceed
                </MDButton>
              </Stack>
            </Grid>
          ) : null}
          {ocrFlag === true ? (
            <>
              <Grid container spacing={2} p={2}>
                {ocrReadItems.map((item) =>
                  item.visible ? (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <RenderControl
                        item={item}
                        validate={validate}
                        claimDetails={claimDetails}
                        policyDetails={policyDetails}
                        setClaimDetails={setClaimDetails}
                        documents={documents}
                        setDocuments={setDocuments}
                        intimaDocument={intimaDocument}
                        setInDocument={setInDocument}
                        setUpload={setUpload}
                        setUploadD={setUploadD}
                        setUploadFlags={setUploadFlags}
                        otherUpload={otherUpload}
                        setOtherUploadFlag={setOtherUploadFlag}
                        upload={upload}
                        // setDisable={setDisable}
                      />
                    </Grid>
                  ) : null
                )}
              </Grid>
              <Grid container justifyContent="center" alignItems="center" p={2}>
                <MDButton color="error" variant="outlined" onClick={handelBacktoMemberSelection}>
                  Back
                </MDButton>
                <MDButton color="primary" onClick={() => onClaimSave()} sx={{ ml: "2rem" }}>
                  SUBMIT
                </MDButton>
              </Grid>
            </>
          ) : null}
        </>
      ) : null}
      {/* <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={load}>
        {loader}
      </Backdrop> */}
    </Card>
  );
}

export default Intimation;
