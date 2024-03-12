import React, { useState, useEffect } from "react";
import Magma from "assets/images/BrokerPortal/CompanyLogos/Magma.png";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Card,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormControl,
  ImageListItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import swal from "sweetalert";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import MDButton from "components/MDButton";
import MDDatePicker from "components/MDDatePicker";

import magmapayment from "assets/images/Magma/magmapayment.png";
import scanningGIF from "assets/images/Magma/scanning-GIF.gif";
import {
  sendOTP,
  validateOtp,
  SearchClaimDetailsByRegClaimNo, // autofetch the data to the TextField
  GetPolicyInfoByPolicyNumber, // to get policy information (mobile no,emailId)
  getProdPartnermasterDatas, // to get document type
  UploadFiles, // save the uploaded document
  DeleteFile, // file delete
  // getDocumentData, // OCR
  GenericApi, // generate claim no
  SaveClaimWFStatus, // to save status in the work flow by using transaction NO
  // getInvoiceData,
  EventCommunicationExecution, // for triggering Email and sms
  // GetUserById,
  GetBenefits,
  claimgetProductByCode,
  claimsDedupe,
  master,
  masterIFSC,
  SaveBSIV2,
  UpdateClaimDetails,
  updateStageStatusIdByTno,
  SaveClaimHistory,
  GetPaymentDetails,
  GetDocumentApimId,
  GetDocumentDataByApimId,
  GetInvoiceApimId,
  GetInvoiceDataByApimId,
} from "../data/index";
import { diffDaysCalculator } from "../../../../../Common/Validations";
// import { HelathJson } from "../data/JsonData";

function RenderControl({ item, query, setQuery, QueryL }) {
  const queryL = query;
  const onnputChange = (e) => {
    switch (item.path) {
      case "hospitalDetails":
        queryL.transactionDataDTO[0].transactionDetails.hospitalDetails[e.target.name] =
          e.target.value;
        setQuery((prev) => ({ ...prev, ...queryL }));
        break;
      case "hospitalizationDetails":
        queryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails[e.target.name] =
          e.target.value;
        setQuery((prev) => ({ ...prev, ...queryL }));
        break;
      case "paymentObj":
        queryL.transactionDataDTO[0].transactionDetails.paymentObj[e.target.name] = e.target.value;
        setQuery((prev) => ({ ...prev, ...queryL }));
        break;
      default:
        queryL[e.target.name] = e.target.value;
        break;
    }
  };

  // const onDateTimeChange = (e,d) => {
  //   const claimdata = query;
  //   const today = new Date(e[0].toDateString()).toLocaleDateString();
  //   let [mm, dd, yyyy] = today.split("/");
  //   if (mm <= 9) {
  //     mm = `0${mm}`;
  //   }
  //   if (dd <= 9) {
  //     dd = `0${dd}`;
  //   }
  //   yyyy = `${yyyy}`;
  //   const ab = `${yyyy}-${mm}-${dd}`;

  //   // const doa =
  //   //   item.name === "doa"
  //   //     ? (claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = e)
  //   //     : claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa;
  //   claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa=d;

  //   const dod =
  //     item.name === "dod"
  //       ? (claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod = e)
  //       : claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod;

  //   const doaDate = new Date(doa);
  //   const dodDate = new Date(dod);

  //   if (
  //     claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !== "" &&
  //     claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa !== ""
  //   ) {
  //     const differenceInMilliseconds = dodDate - doaDate;
  //     if (differenceInMilliseconds < -1) {
  //       claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay = "";
  //       setDate(true);
  //     } else {
  //       setDate(false);
  //       const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  //       claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay = `${differenceInDays}days`;
  //     }
  //   }
  //   switch (item.path) {
  //     case "hospitalizationDetails":
  //       claimdata.transactionDataDTO[0].transactionDetails.hospitalizationDetails[item.name] = ab;

  //       setQuery((prev) => ({ ...prev, ...claimdata }));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const onDateTimeChange = (e, d) => {
    const claimData = QueryL;
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
        setQuery((prev) => ({ ...prev, ...claimData }));
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
      setQuery({ ...QueryL, ...claimData });

      if (lengthOfStay !== "") {
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay =
          lengthOfStay;
      }
      if (
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay !==
          "" &&
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay >=
          claimData.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible
      ) {
        claimData.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays =
          claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay -
          claimData.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible;
        // setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        // }
        // const arr = [];
      } else {
        claimData.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = 0;
      }

      // if (
      //   claimData.transactionDataDTO[0].transactionDetails.benefitDetails.NoofDaysFromCToInjury ===
      //   ""
      // ) {
      //   // debugger;
      //   const NoOfdyasCtoA = diffDaysCalculator(
      //     claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
      //     policyDetails[0].policyRequest.InsurableItem[0].RiskItems[0].DOC
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
      // console.log("NOOFDAYSCTOA", NoOfdyasCtoA);
      // }
      setQuery({ ...QueryL, ...claimData });
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
                disabled
                onChange={(e) => onnputChange(e)}
              />
            );
          case "DateTime":
            return (
              <>
                <MDDatePicker
                  // input={{ label: item.label }}
                  input={{ label: item.label, value: item.value }}
                  name={item.name}
                  value={item.value}
                  disabled={item.InputProps}
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

                {/* {item.name === "doa" && date === true ? (
                  <MDTypography sx={{ color: "red", fontSize: "12px" }}>
                    Please Enter Valid Date
                  </MDTypography>
                ) : null} */}
              </>
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}
function RequiredDocuments({ query, setQuery, Email, mobile, policyDetails }) {
  const QueryL = query;
  const EmailID = Email;
  const mobileNo = mobile;

  const [otherUpload, setOtherUpload] = useState([]);
  const [otherUploadFlag, setOtherUploadFlag] = useState(Array(otherUpload.length).fill(false));
  const [ocrPincodeflag, setOcrPincodeFlag] = useState(false);
  const [nextproceed, setNextProceed] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [otherflag, setOtherFlag] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [uploadD, setUploadD] = useState([]);
  const [upload, setUpload] = useState([]);
  const [date, setDate] = useState(false);
  const [disableproceed, setDisableproceed] = useState(true);
  const [uploadFlags, setUploadFlags] = useState(Array(upload.length).fill(false));
  const [ocrSwalFlag, setOcrSwalFlag] = useState(false);
  const [patientNameFlag, setPatientNameFlag] = useState(false);
  const [array1, setArray1] = useState([]);
  const [arrayD, setArrayD] = useState([]);
  const [array2, setArray2] = useState([]);
  const [array3, setArray3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentflag, setDocumentFlag] = useState(false);
  const [HandWritten, setHandWritten] = useState({});
  console.log("HandWritten", HandWritten);
  const navigate = useNavigate();
  const handleTrackClaims = () => {
    console.log("track", query.policyNo);
    navigate(`/Claims/TrackClaims`, { state: query.policyNo });
  };

  // const handleIntimation = () => {
  //   console.log("track", query.policyNo);
  //   navigate(`/Claims/TrackClaims`, { state: query.policyNo });
  // };
  useEffect(async () => {
    // debugger;
    const data2 = { ProductId: 1022, MasterType: "Document Type" };
    const dataa = await getProdPartnermasterDatas(
      data2.ProductId,
      data2.MasterType,

      QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefit
    );
    if (dataa.status === 200) {
      const arr1 = [];
      const arrr1 = [];
      dataa.data.forEach((x) => {
        const obj = {
          docId: x.mID,
          docName: x.Value,
          UploadDocDate: "",
          fileName: "",
          UploadedBy: "Customer",
        };
        const obj2 = {
          docId: x.mID,
          fileName: "",
          base64: "",
          docName: x.Value,
          UploadedBy: "Customer",
        };
        arr1.push(obj);
        arrr1.push(obj2);
      });
      console.log("doc", QueryL.transactionDataDTO[0].transactionDetails.documentDetails);
      setUpload(arr1);
      setUploadD(arrr1);
      console.log("true", upload);
      console.log("false", uploadD);
      if (QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefit === "") {
        setDocuments([]);
      }
      setDocuments([]);
      setDocuments([...dataa.data]);
    }
    console.log("data", dataa);
    console.log("documentType", documents);
  }, [QueryL === 0]);
  console.log("QueryL", QueryL);
  useEffect(() => {
    console.log("documentType", documents);
  }, [documents]);

  useEffect(async () => {
    // const productCode = { MagmaHospiCash01 };
    const getProductByCodeResponse = await claimgetProductByCode("MagmaHospiCash01");
    console.log("getProductByCode", getProductByCodeResponse);
    if (getProductByCodeResponse.status === 200) {
      const BenfitIdconvert = JSON.parse(getProductByCodeResponse.data.productdetailJson);
      console.log("BenfitIdconvert", BenfitIdconvert);
      BenfitIdconvert.productInsurableItems[0].productCovers.forEach((x) => {
        if (
          x.cover === QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName
        ) {
          QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.BenefitId =
            x.productBenefits[0].benefitId;
        }
        setQuery((prev) => ({ ...prev, ...QueryL }));
      });
    }
    // if(claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName)
  }, [QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName]);

  // for Personal Accident Grouping
  useEffect(() => {
    documents.filter((sd) => {
      if (sd.TypeCode === "Required in Case of Death") array1.push(sd.TypeCode);
      setArray1([...array1]);
      if (sd.TypeCode === "Non Medical Documents") array2.push(sd.TypeCode);
      setArray2([...array2]);
      if (sd.TypeCode === "Medical Documents") arrayD.push(sd.TypeCode);
      setArrayD([...arrayD]);
      if (sd.TypeCode === "Required in Case of TTD/ PPD/ PTD Claim") array3.push(sd.TypeCode);
      setArray3([...array3]);
      return true;
    });
  }, [documents]);

  const [profile, setProfile] = useState({
    ProfileImage: "",
  });

  const [xyz, setXYZ] = useState({
    RawImage: [],
  });

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

  const CallApis = async (base64, docname) => {
    // debugger;
    let DischargeData = "";
    let invoiceResult = "";

    const outputdata = await GetDocumentApimId(base64);
    const CallGetDocumentDataByApimId = async () => {
      const Data = await GetDocumentDataByApimId(outputdata.data);
      console.log("DischargeData11", DischargeData);
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
    }
    setOcrSwalFlag(true);

    console.log("invoiceResult", invoiceResult);
    console.log("DischargeData", DischargeData);

    if (docname.includes("discharge")) {
      if (invoiceResult.status === "succeeded" && base64 !== "") {
        setOcrSwalFlag(false);
        QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress =
          invoiceResult.analyzeResult.documentResults[0].fields.VendorAddress.valueString;
        const res = QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress;
        const pincodeRegex = /\b\d{6}\b/;
        const matchessucess = res.match(pincodeRegex);
        if (matchessucess !== null && matchessucess) {
          QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode = [
            matchessucess[0],
          ];
        }
        QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName =
          invoiceResult.analyzeResult.documentResults[0].fields.VendorName.valueString;
        setQuery((prev) => ({ ...prev, ...QueryL }));
      }

      if (DischargeData.status === "succeeded" && base64 !== "") {
        setOcrSwalFlag(false);
        DischargeData.analyzeResult.styles.forEach((X) => {
          if (X.isHandwritten === true) {
            setHandWritten(true);
          }
        });
        DischargeData.analyzeResult.paragraphs.forEach(async (x) => {
          const str = x.content;
          // const spaceregex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
          // const spaceregex = /^[1-9]\d{2}\s?\d{3}$/;
          const spaceregex = /\b\d{3}\s?\d{3}\b/;
          const spaceregexRes = str.match(spaceregex);
          if (spaceregexRes !== null && spaceregexRes) {
            const spaceRemove = spaceregexRes[0].replace(/\s/g, "");

            QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode =
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
                      QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails
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
          // debugger;
        });
        setQuery((prev) => ({ ...prev, ...QueryL }));

        const req = {
          productId: 1022,
        };
        const PincodeObject = {
          PIN: QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
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
            QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity =
              CityResult.data[0].mValue;
          }
          const stateRes = await master(req.productId, "State_Master", stateResponse);
          console.log("stateRes", stateRes);
          if (stateRes.status === 200) {
            // Assuming this should be a single value, not a map
            QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState =
              stateRes.data[0].mValue;

            setQuery((prev) => ({ ...prev, ...QueryL }));
          }
        }

        setQuery((prev) => ({ ...prev, ...QueryL }));
        DischargeData.analyzeResult.keyValuePairs.filter((x) => {
          const res = x.key.content.toLowerCase();
          // if (x.key.content === "NAME:") {
          //   claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName =
          //     x.value.content;
          // }
          if (res.includes("diagnosis")) {
            QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis =
              x.value.content;
            setQuery((prev) => ({ ...prev, ...QueryL }));
          }

          if (res.includes("patient name") && !patientNameFlag) {
            QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setQuery((prev) => ({ ...prev, ...QueryL }));
            setPatientNameFlag(true);
          } else if (res.includes("patient's name") && !patientNameFlag) {
            QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.QueryL;
            setQuery((prev) => ({ ...prev, ...QueryL }));
            setPatientNameFlag(true);
          } else if (res.includes("name of patient") && !patientNameFlag) {
            QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setQuery((prev) => ({ ...prev, ...QueryL }));
            setPatientNameFlag(true);
          } else if (res.includes("patients name") && !patientNameFlag) {
            QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;
            setQuery((prev) => ({ ...prev, ...QueryL }));
            setPatientNameFlag(true);
          } else if (res.includes("pt name") && !patientNameFlag) {
            QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;

            setQuery((prev) => ({ ...prev, ...QueryL }));
            setPatientNameFlag(true);
          } else if (
            res === "name" ||
            res === "name:" ||
            res === "name " ||
            (res === "name :" && !patientNameFlag)
          ) {
            QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName =
              x.value.content;

            setQuery((prev) => ({ ...prev, ...QueryL }));
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
              QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = ab;
              setQuery((prev) => ({ ...prev, ...QueryL }));
            }
            if (data.includes("/")) {
              const convertedDate1 = convertDateFormat(data);
              const cl = removePatterns(convertedDate1);
              QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa = cl;
              setQuery((prev) => ({ ...prev, ...QueryL }));
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
              QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod = ab;
              setQuery((prev) => ({ ...prev, ...QueryL }));
            }
            if (data.includes("/")) {
              const convert = convertDateFormat(data);
              const cls = removePatterns(convert);
              QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod = cls;
              setQuery((prev) => ({ ...prev, ...QueryL }));
            }
          }
          if (
            QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !== "" &&
            QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa !== ""
          ) {
            const lengthOfStay = diffDaysCalculator(
              new Date(QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa),
              new Date(QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod)
            );
            if (QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod !== "") {
              QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay =
                lengthOfStay;
            }
            setQuery((prev) => ({ ...prev, ...QueryL }));
            console.log("lengthOfStay", lengthOfStay);
          }
          return true;
        });
      }
    }

    if (docname.includes("bank")) {
      if (invoiceResult.status === "succeeded" && base64 !== "") {
        // debugger;
        const data1 = {
          productId: 1022,
          MasterType: "BankMasterCriteria",
          Bank_Name: invoiceResult.analyzeResult.documentResults[0].fields.VendorName.valueString,
        };
        const BankName = { Bank_Name: data1.Bank_Name };
        const bankapi = await masterIFSC(data1.productId, data1.MasterType, BankName);
        if (bankapi.status === 200) {
          QueryL.transactionDataDTO[0].transactionDetails.paymentObj.bankName =
            invoiceResult.analyzeResult.documentResults[0].fields.VendorName.valueString;
        }

        setQuery((prev) => ({ ...prev, ...QueryL }));
      }

      if (DischargeData.status === "succeeded" && base64 !== "") {
        DischargeData.analyzeResult.keyValuePairs.filter((x) => {
          const res = x.key.content.toLowerCase();
          if (res.includes("name")) {
            QueryL.transactionDataDTO[0].transactionDetails.paymentObj.payeeName = x.value.content;
            setQuery((prev) => ({ ...prev, ...QueryL }));
          }
          if (res.includes("ifs")) {
            if (QueryL.transactionDataDTO[0].transactionDetails.paymentObj.bankName !== "") {
              QueryL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = x.value.content;
            } else {
              QueryL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode = "";
            }
            setQuery((prev) => ({ ...prev, ...QueryL }));
          }
          if (
            res.includes("account no") ||
            res.includes("account number") ||
            res.includes("a/c no") ||
            res.includes("खाता क्र.")
          ) {
            if (x.value !== undefined && x.value.content !== "") {
              QueryL.transactionDataDTO[0].transactionDetails.paymentObj.accountNo =
                x.value.content;
            }
            setQuery((prev) => ({ ...prev, ...QueryL }));
          }
          return true;
        });

        DischargeData.analyzeResult.pages[0].lines.filter((items) => {
          if (
            items.content.toUpperCase() ===
            QueryL.claimBasicDetails.memberDetails.COIHolderName.toUpperCase()
          ) {
            QueryL.transactionDataDTO[0].transactionDetails.paymentObj.payeeName = items.content;
            setQuery((prev) => ({ ...prev, ...QueryL }));
          }
          return true;
        });
      }
    }
  };

  const handleProceed = async () => {
    // debugger;
    setDisableproceed(false);
    // if (QueryL.transactionDataDTO[0].transactionDetails.documentDetails) {
    //   upload.forEach((y) => {
    //     if (y.fileName !== "") {
    //       QueryL.transactionDataDTO[0].transactionDetails.documentDetails.push(y);
    //       setUpload(upload);
    //       setQuery((prev) => ({ ...prev, ...QueryL }));
    //     }
    //   });
    // }
    // if (QueryL.transactionDataDTO[0].transactionDetails.documentDetails) {
    //   otherUpload.forEach((x) => {
    //     QueryL.transactionDataDTO[0].transactionDetails.documentDetails.push(x);
    //     setOtherUpload(otherUpload);
    //     setQuery((prev) => ({ ...prev, ...QueryL }));
    //   });
    // }
    let file = 0;
    // QueryL.transactionDataDTO[0].transactionDetails.documentDetails.forEach((x) => {
    upload.forEach((x) => {
      if (x.fileName !== "") {
        file += 1;
      }
    });
    if (file === 0) {
      QueryL.DocumentUploadFlag = "false";
    } else if (file > 0) {
      QueryL.DocumentUploadFlag = "true";

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
          // debugger;
          if (
            QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            x.CoverName
          ) {
            QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.Name = x.Benefit;
            QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.Deductible =
              x.Deductible;
          }
          setQuery((prev) => ({ ...prev, ...query }));
        });
      }

      // Swal.fire({
      //   html: `<div style={{display:"flex"}}>
      //   <img src=${scanningGIF} style="height:6rem;">
      //   <div><p> We're Currently scanning your docs to find the important stuff.
      //   It might take a little while...</p><br/>`,
      // });

      uploadD.forEach(async (xy) => {
        // debugger;
        setOcrSwalFlag(true);
        const abc = xy.docName.toLowerCase();
        if (abc.includes("discharge") && xy.base64 !== "") {
          // if (xy.docId === "65" && xy.base64 !== "") {
          await CallApis(xy.base64, abc);
        }
        if (abc.includes("bank") && xy.base64 !== "") {
          await CallApis(xy.base64, abc);
        }
      });
      setNextProceed(true);
    } else console.log("QueryL", QueryL);
    // else if (
    //   QueryL.claimAmount === "" ||
    //   QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefit === ""
    // ) {
    //   setNextProceed(false);
    // }
  };

  const handleAddDocument = () => {
    const obj1 = {
      docId: "",
      docName: "",
      UploadDocDate: "",
      fileName: "",
    };
    otherUpload.push(obj1);
    setOtherUpload([...otherUpload]);
    setOtherFlag(true);
    console.log("otherdoc", otherUpload);
  };

  const handleAddother = (e, id) => {
    if (e.target.name === "other") {
      otherUpload[id].docName = e.target.value;
    }
    setOtherUpload([...otherUpload]);
  };

  // const handleOtherRemove = async (id) => {
  //   const newUploadFlags = [...otherUploadFlag];
  //   newUploadFlags[id] = false;
  //   setOtherUploadFlag(newUploadFlags);
  //   const res = await DeleteFile(upload[id].fileName);
  //   console.log("123", res);
  //   if (res.data.status === 5) {
  //     if (otherUpload[id].fileName !== "") {
  //       otherUpload[id].fileName = "";
  //       otherUpload[id].UploadDocDate = "";
  //       setOtherUpload([...otherUpload]);
  //     }
  //   }
  // };

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

  const handleRemoveRow = async (id) => {
    const newUploadFlags = [...uploadFlags];
    newUploadFlags[id] = false;
    setUploadFlags(newUploadFlags);
    const res = await DeleteFile(upload[id].fileName);
    console.log("123", res);
    if (res.data.status === 5) {
      upload[id].docId = "";
      upload[id].UploadDocDate = "";
      upload[id].fileName = "";
      uploadD[id].fileName = "";
      uploadD[id].base64 = "";
      upload[id].fileName = "";
      setUploadD([...uploadD]);
      setUpload([...upload]);
      if (upload.some((file) => file.fileName !== "")) {
        setDisableproceed(false);
      } else {
        setDisableproceed(true);
      }
      console.log("delete", upload);
    }
  };

  const UploadImage = async (file, id) => {
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
    console.log("uploadD", uploadD);
    console.log("uploaddocumentarray", upload);
  };

  const handleOtherFileUpload = (id, e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "application/pdf",
      "image/png",
      "image/jpg",
      "application/msword", // DOC
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    ];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPG, JPEG, PNG, DOC, DOCX and PDF files are allowed.",
        allowOutsideClick: false,
        showCloseButton: true,
      });
      return;
    }
    const newuploads = otherUpload;
    newuploads[id].fileName = e.target.files[0].name;
    newuploads[id].UploadDocDate = new Date();
    setOtherUpload(newuploads);
    UploadImage(e.target.files[0], id);
    const newUploadFlags = [...otherUploadFlag];
    newUploadFlags[id] = true;
    setOtherUploadFlag(newUploadFlags);
  };

  const handleProfileChange = (id, e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "application/pdf",
      "image/png",
      "image/jpg",
      "application/msword", // DOC
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    ];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPG, JPEG, PNG, DOC, DOCX and PDF files are allowed.",
        allowOutsideClick: false,
        showCloseButton: true,
      });
      return;
    }
    const newUpload = [...upload];
    newUpload[id].fileName = e.target.files[0].name;
    newUpload[id].UploadDocDate = new Date();
    setUpload(newUpload);
    setDisableproceed(false);
    const newUploadD = [...uploadD];
    newUploadD[id].fileName = e.target.files[0].name;
    setUploadD(newUploadD);
    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });
    if (uploadD.length !== 0) {
      uploadD.filter((x) => {
        if (x.fileName !== "") {
          QueryL.DocumentUploadFlag = "";
          QueryL.DocumentUploadFlag = "true";
        }
        setUpload(uploadD);
        return true;
      });
    }
    console.log("");
    UploadImage(e.target.files[0], id);
    // Swal.fire({
    //   icon: "success",
    //   text: "Document Uploaded Successfully",
    //   allowOutsideClick: false,
    //   showCloseButton: true,
    // });
    setDocumentFlag(true);
    const newUploadFlags = [...uploadFlags];
    newUploadFlags[id] = true;
    setUploadFlags(newUploadFlags);
  };

  const handleCheckBox = (e) => {
    setAgreement(e.target.checked);
    QueryL.Prefix = "MHDI/6115/24/08/";
    QueryL.ProductCode = "MagmaHospiCash01";
    delete QueryL.claimNumber;
    setQuery(QueryL);
    console.log("queryaftercheckbox", QueryL);
  };
  const saveWFDto = {
    Stage: "Claims",
    Status: "325",
    WorkFlowType: "DEO",
    wfstageStatusId: "326",
    workFlowId: "84",
  };

  // const userNameId = localStorage.getItem("userId");
  // console.log("userNameId", userNameId);

  // const UserRoleName = {
  //   UserName: "",
  //   RoleName: "",
  //   Status: "",
  //   Remarks: "",
  // };

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

  const onClaimSave = async () => {
    // debugger;
    const data = QueryL.policyNo;
    setQuery((prev) => ({ ...prev, ...data }));
    console.log("claimDetails101", QueryL);
    if (QueryL.claimStatusId !== 0 && QueryL.claimStatus !== "") {
      QueryL.claimStatusId = 114;
      QueryL.claimStatus = "Claim Registered";
      setQuery((prev) => ({ ...prev, ...QueryL }));

      if (QueryL.transactionDataDTO[0].transactionDetails.documentDetails !== "") {
        QueryL.transactionDataDTO[0].transactionDetails.documentDetails = [];
      }
      if (upload.length > 0) {
        upload.filter((x) => {
          if (x.fileName !== "") {
            QueryL.transactionDataDTO[0].transactionDetails.documentDetails.push(x);
          }
          setQuery((prev) => ({ ...prev, ...QueryL }));
          return null;
        });
      }
      if (otherUpload.length > 0) {
        otherUpload.filter((x) => {
          if (x.fileName !== "") {
            QueryL.transactionDataDTO[0].transactionDetails.documentDetails.push(x);
          }
          setQuery((prev) => ({ ...prev, ...QueryL }));
          return null;
        });
      }
      // const RoleName = await GetUsersRoles(userNameId);
      // console.log("rolenamee", RoleName);
      // RoleName.data.forEach((x) => {
      QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName = "Customer";
      // });
      // debugger;
      // const userName = await GetUserById(userNameId);
      // const userid = `${userName.data.userDetails[0].firstName} ${userName.data.userDetails[0].lastName}`;
      // UserRoleName.UserName = userid;
      QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName = "";
      QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
        QueryL.claimStatus;
      QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Remarks =
        QueryL.transactionDataDTO[0].remark;
      // if (QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName !== "") {
      //   QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails.push(UserRoleName);
      // }
      // if (QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName === "") {
      //   QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName =
      //     "Customer";
      //   QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName =
      //     QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName;
      //   QueryL.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
      //     QueryL.claimStatus;
      // }
      setQuery((prev) => ({ ...prev, ...QueryL }));

      const dedupde = await claimsDedupe(1022, QueryL);
      console.log("claimsDedupe", dedupde);
      if (dedupde.status === 200) {
        if (dedupde.data.responseMessage === "Claim with provided details is already available") {
          Swal.fire({
            icon: "warning",

            // title: "Claim with provided details is already available",
            text: `Claim with provided details is already available`,

            confirmButtonColor: "#d33",
            confirmButtonText: "Track Claims",
          }).then((res) => {
            if (res.isConfirmed) {
              handleTrackClaims();
            }
          });
        } else {
          setLoading(true);
          // console.log("userrolename", UserRoleName);

          const GenericApiResult = await GenericApi(
            "MagmaHospiCash01",
            "MagmaTinySaveClaimSubmitted",
            QueryL
          );
          console.log("result101", GenericApiResult);

          const save = await SaveClaimWFStatus(
            GenericApiResult.finalResult.transactionDataDTO[0].transactionNumber,
            saveWFDto
          );
          const Reservelogic = await GenericApi("MagmaHospiCash01", "MagmaReserveLogic", QueryL);
          console.log("Reservelogic", Reservelogic);
          setLoading(true);
          console.log("save", save);

          if (GenericApiResult.responseMessage === "Success") {
            const claimsms = {
              communicationId: 244,
              keyType: "MagmaHealth",
              key: GenericApiResult.finalResult.claimNumber,
              stakeHolderDetails: [
                {
                  communicationType: "SMS",
                  stakeholderCode: "CUS",
                  communicationValue: mobileNo,
                },
              ],
            };
            const claimEmail = {
              communicationId: 227,
              keyType: "MagmaHealth",
              key: GenericApiResult.finalResult.claimNumber,
              stakeHolderDetails: [
                {
                  communicationType: "Email",
                  stakeholderCode: "CUS",
                  communicationValue: EmailID,
                },
              ],
            };
            await EventCommunicationExecution(claimsms);
            await EventCommunicationExecution(claimEmail);

            const RuleExecution = await GenericApi(
              "MagmaHospiCash01",
              "MagmaRuleExecutions",
              QueryL
            );
            if (RuleExecution.finalResult.successMsg === "Success") {
              // debugger;
              if (
                (QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                  "Hospicash" ||
                  QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                    "EMI Benefit") &&
                GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj
                  .payeeName ===
                  GenericApiResult.finalResult.claimBasicDetails.memberDetails.COIHolderName &&
                GenericApiResult.finalResult.claimAmount !== 0 &&
                HandWritten === false
              ) {
                // const AutoApprove = await GenericApi(
                //   "MagmaHospiCash01",
                //   "Magma_ClaimBenefitReserveRule",
                //   QueryL
                // );
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
                    QueryL
                  );

                  if (AutoApprove.status === 1 && AutoApprove.finalResult.outcome === "Success") {
                    if (AutoApprove.finalResult.outcome === "Success") {
                      GenericApiResult.finalResult.claimStatus = "Claim Approved";
                      GenericApiResult.finalResult.claimStatusId = 115;

                      // if (claimCalculator.responseMessage === "Success") {
                      const Data = {
                        PolicyNumber:
                          GenericApiResult.finalResult.claimBasicDetails.policyDetails.PolicyNumber,
                        CoverName:
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .benefitDetails.benefitName,
                        BenefitName: "Normal",
                        Unit: "",
                        ClaimedFor:
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .benefitDetails.RoomDays,
                        // ClaimedAmount:
                        //   GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                        //     .benefitDetails.CalculatedClaimAmount,
                        ClaimedAmount: claimCalculator.finalResult.PayoutAmount,
                        RiskItemId:
                          GenericApiResult.finalResult.claimBasicDetails.memberDetails.memberId,
                        RiskItemIdType: "UHID",
                      };
                      // debugger;
                      const SaveBSIResponse = await SaveBSIV2(Data);
                      console.log("saveBSI", SaveBSIResponse);

                      // const claimCalculator = await GenericApi(
                      //   "MagmaHospiCash01",
                      //   "MagmaClaimsCalculator_V1",
                      //   GenericApiResult.finalResult
                      // );
                      // if (claimCalculator.responseMessage === "Success") {

                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount =
                        claimCalculator.finalResult.PayoutAmount;
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier =
                        claimCalculator.finalResult.FinancierPayout;
                      GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer =
                        claimCalculator.finalResult.CustomerPayout;
                      if (claimCalculator.finalResult.HospitalisatonCriteria === "Separate") {
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
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
                        GenericApiResult.finalResult.claimFields = "Approve";
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
                            // CreatedBy: userNameId,
                          };
                          await SaveClaimHistory(dataa);
                        }
                      }

                      if (
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== "0" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutCustomer !== ""
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
                      // else
                      if (
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutFinancier !== "0" &&
                        GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                          .paymentObj.finalPayoutFinancier !== ""
                      ) {
                        const beneficialName =
                          GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                            .financierDetails.FinancierName;
                        const name = beneficialName.split(" ").join("");
                        const obj2 = {
                          slno:
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.PaymentDetails.length + 1,
                          payeeName: name,
                          PayeeType:
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.modeofPayment,
                          Payout: "Claims Payout",
                          // Approved: Paymentdata.Approved,
                          Approved:
                            GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                              .paymentObj.finalPayoutFinancier,
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
                          .paymentObj.finalPayoutCustomer !== ""
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
                            .paymentObj.finalPayoutCustomer !== "0"
                            ? GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
                                .paymentObj.finalPayoutCustomer
                            : GenericApiResult.finalResult.transactionDataDTO[0].transactionDetails
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
                          const GetPaymentDetailsResponse = JSON.parse(item.paymentRequest);
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
                      // else
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
                            .financierDetails.FinancierName;
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
                          // const GetPaymentDetailsResponse = JSON.parse(item.paymentRequest);
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
                          // CreatedBy: userNameId,
                        };
                        await SaveClaimHistory(dataa);
                      }
                      // }
                    }
                  }
                }
                // console.log("autoapproval", AutoApprove);
              }
            }
            setLoading(false);
            // const AutoApprove = await GenericApi(
            //   "MagmaHospiCash01",
            //   "Magma_ClaimBenefitReserveRule",
            //   QueryL
            // );
            // if (AutoApprove.status === 1) {
            //   if (AutoApprove.finalResult.successMsg === "Success") {
            //     GenericApiResult.finalResult.claimStatus = "Claim Approved";
            //   }
            // }
            // console.log("AutoApprove", AutoApprove);

            Swal.fire({
              icon: "success",
              title: "We've got your claim Submission",
              allowOutsideClick: false,
              showCloseButton: false,
              html: `
        <div>
        <img src=${magmapayment} alt="success">
          <p>Your Claim Number is ${GenericApiResult.finalResult.claimNumber}.</p><br/>
          <p style="font-size: 12px;">keep your claim number handy for future reference.</p>
        </div>
      `,
              confirmButtonColor: "#d33",
              confirmButtonText: "Track Claims",
            }).then((res) => {
              if (res.isConfirmed) {
                handleTrackClaims();
              }
            });
          }
        }
      }
    }
  };

  const ocrReadItems = [
    {
      type: "DateTime",
      required: true,
      label: "Date Of Admission",
      visible: true,
      name: "doa",
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
      path: "hospitalizationDetails",
      maxDate: new Date(),
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      required: true,
      label: "Date Of Discharge",
      visible: true,
      name: "dod",
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod,
      path: "hospitalizationDetails",
      maxDate: new Date(),
      minDate: new Date(QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa),
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Diagnosis",
      visible: true,
      name: "diagnosis",
      disable: true,
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis,
      path: "hospitalizationDetails",
    },
    {
      type: "Input",
      label: "Length of Stay",
      visible: true,
      name: "lengthOfStay",
      disable: true,
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay,
      path: "hospitalizationDetails",
    },
    {
      type: "Input",
      required: true,
      label: "Patient Name",
      visible: true,
      name: "PatientName",
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName,
      path: "hospitalizationDetails",
      disable: true,
      // onChangeFuncs: [IsAlphaSpace],
    },
    {
      type: "Input",
      label: "Hospital Name",
      visible: true,
      name: "hospitalName",
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
      path: "hospitalDetails",
    },
    {
      type: "Input",
      label: "Hospital Address",
      visible: true,
      name: "hospitalAddress",
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress,
      path: "hospitalDetails",
    },
    {
      type: "Input",
      label: "Hospital City",
      visible: true,
      name: "hospitalCity",
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
      path: "hospitalDetails",
    },
    {
      type: "Input",
      label: "Hospital State",
      visible: true,
      name: "hospitalState",
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
      path: "hospitalDetails",
    },
    {
      type: "Input",
      label: "Hospital PinCode",
      visible: true,
      name: "hospitalPincode",
      disable: true,
      value: QueryL.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
      path: "hospitalDetails",
    },
    {
      type: "Input",
      label: "Payee Name",
      visible: true,
      name: "payeeName",
      value: QueryL.transactionDataDTO[0].transactionDetails.paymentObj.payeeName,
      path: "paymentObj",
    },
    {
      type: "Input",
      label: "Bank Name",
      visible: true,
      name: "bankName",
      value: QueryL.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
      path: "paymentObj",
    },
    {
      type: "Input",
      label: "Account No",
      visible: true,
      name: "accountNo",
      value: QueryL.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
      path: "paymentObj",
    },
    {
      type: "Input",
      label: "IFSC Code",
      visible: true,
      name: "ifscCode",
      value: QueryL.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
      path: "paymentObj",
    },
  ];
  return (
    <Card>
      <ImageListItem style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={`${Magma}`} alt="" style={{ width: "200px", marginBottom: "20px" }} />
      </ImageListItem>
      <Grid container p={2} justifyContent="center">
        <MDTypography variant="body1" color="primary">
          Updates Required Documents
        </MDTypography>
      </Grid>
      <Grid container spacing={4} p={2} justifyContent="center">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="UHID"
            name="uhid"
            value={
              QueryL &&
              QueryL.claimBasicDetails &&
              QueryL.claimBasicDetails.memberDetails &&
              QueryL.claimBasicDetails.memberDetails.memberId
            }
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Member Name"
            name="MemberName"
            value={QueryL.claimBasicDetails.memberDetails.insuredName}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Benefit Type"
            name="benefitName"
            value={query.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName}
            disabled
          />
        </Grid>
      </Grid>
      {/* {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName !== "" ? (
          <Grid container mt={3}>
            <MDTypography variant="body1" color="primary" sx={{ ml: "4rem" }}>
              Upload Document
            </MDTypography>
            <MDTypography variant="body1" color="primary" sx={{ ml: "12rem" }}>
              Browse Files
            </MDTypography>
          </Grid>
        ) : null} */}

      {/* <Grid>
          {(QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Hospicash" ||
            QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Child Education Grant" ||
            QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Loss of Job" ||
            QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "EMI Benefit") && (
            <Grid container spacing={2} p={2}>
              {documents.map((x, id) => (
                <React.Fragment key={x.mID}>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDInput value={x.Value} label="Document Name" />
                  </Grid>

                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                    <label htmlFor={`file-upload-${id}`}>
                      <input
                        id={`file-upload-${id}`}
                        name={`file-upload-${id}`}
                        accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => handleProfileChange(id, e)}
                        onClick={(e) => {
                          e.target.value = "";
                        }}
                      />
                      <MDButton variant="outlined" component="span">
                        Upload
                      </MDButton>
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Grid sx={{ fontSize: "14px" }}>
                      {upload[id] && <p>{upload[id].fileName}</p>}
                    </Grid>
                  </Grid>
                  {upload[id] && upload[id].fileName && (
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                      <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                        <CancelIcon fontSize="large" />
                      </IconButton>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid container spacing={2} p={0} ml={2}>
          {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Personal Accident" ||
          QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
            "Critical Illness" ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container spacing={2}>
                {documents.map((x, id) => (
                  <React.Fragment key={x.mID}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {id < 1 && <MDTypography>{array2[0]}</MDTypography>}
                    </Grid>
                    {x && x.TypeCode === "Non Medical Documents" ? (
                      <>
                        {" "}
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            sx={{ marginTop: "8px" }}
                            value={x.Value}
                            label="Document Type"
                          />
                        </Grid>
                        <Grid item xs={4} marginTop="6px">
                          <label htmlFor={`file-upload-${id}`}>
                            <input
                              id={`file-upload-${id}`}
                              name={`file-upload-${id}`}
                              accept="image/jpeg, application/pdf,image/png,image/jpg,application/msword,
                              application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => handleProfileChange(id, e)}
                              onClick={(e) => {
                                e.target.value = "";
                              }}
                            />
                            <MDButton
                              variant="outlined"
                              // color="error"
                              component="span"
                              disabled={upload[id].fileName}
                            >
                              Upload
                            </MDButton>
                          </label>
                        </Grid>
                        <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                          <Grid sx={{ fontSize: "14px" }}>
                            {upload[id] && <p>{upload[id].fileName}</p>}
                          </Grid>
                        </Grid>
                        {upload[id] && upload[id].fileName && (
                          <Grid item xs sx={{ ml: "2rem" }}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon fontSize="large" sx={{ mt: "-0.5rem" }} />
                            </IconButton>
                          </Grid>
                        )}
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid container spacing={2} p={0} ml={2}>
          {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Critical Illness" ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container spacing={2}>
                {documents.map((x, id) => (
                  <React.Fragment key={x.mID}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {id < 1 && <MDTypography>{arrayD[0]}</MDTypography>}
                    </Grid>
                    {x && x.TypeCode === "Medical Documents" ? (
                      <>
                        {" "}
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            sx={{ marginTop: "8px" }}
                            value={x.Value}
                            label="Document Type"
                          />
                        </Grid>
                        <Grid item xs={4} marginTop="6px">
                          <label htmlFor={`file-upload-${id}`}>
                            <input
                              id={`file-upload-${id}`}
                              name={`file-upload-${id}`}
                              accept="image/jpeg, application/pdf,image/png,image/jpg,application/msword,
                            application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => handleProfileChange(id, e)}
                              onClick={(e) => {
                                e.target.value = "";
                              }}
                            />
                            <MDButton
                              variant="outlined"
                              // color="error"
                              component="span"
                              disabled={upload[id].fileName}
                            >
                              Upload
                            </MDButton>
                          </label>
                        </Grid>
                        <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                          <Grid sx={{ fontSize: "14px" }}>
                            {upload[id] && <p>{upload[id].fileName}</p>}
                          </Grid>
                        </Grid>
                        {upload[id] && upload[id].fileName && (
                          <Grid item xs sx={{ ml: "2rem" }}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon fontSize="large" sx={{ mt: "-0.5rem" }} />
                            </IconButton>
                          </Grid>
                        )}
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid container spacing={2} p={0} ml={2}>
          {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Personal Accident" ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container spacing={2}>
                {documents.map((x, id) => (
                  <React.Fragment key={x.mID}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {id < 1 && <MDTypography>{array1[0]}</MDTypography>}
                    </Grid>
                    {x && x.TypeCode === "Required in Case of Death" ? (
                      <>
                        {" "}
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            sx={{ marginTop: "8px" }}
                            value={x.Value}
                            label="Document Type"
                          />
                        </Grid>
                        <Grid item xs={4} marginTop="6px">
                          <label htmlFor={`file-upload-${id}`}>
                            <input
                              id={`file-upload-${id}`}
                              name={`file-upload-${id}`}
                              accept="image/jpeg, application/pdf,image/png,image/jpg,application/msword,
                            application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => handleProfileChange(id, e)}
                              onClick={(e) => {
                                e.target.value = "";
                              }}
                            />
                            <MDButton
                              variant="outlined"
                              // color="error"
                              component="span"
                              disabled={upload[id].fileName}
                            >
                              Upload
                            </MDButton>
                          </label>
                        </Grid>
                        <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                          <Grid sx={{ fontSize: "14px" }}>
                            {upload[id] && <p>{upload[id].fileName}</p>}
                          </Grid>
                        </Grid>
                        {upload[id] && upload[id].fileName && (
                          <Grid item xs sx={{ ml: "2rem" }}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon
                                fontSize="large"
                                // color="error"
                                sx={{ mt: "-0.5rem" }}
                              />
                            </IconButton>
                          </Grid>
                        )}
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid container spacing={2} ml={2}>
          {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Personal Accident" ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container spacing={2}>
                {documents.map((x, id) => (
                  <React.Fragment key={x.mID}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {id < 1 && <MDTypography>{array3[0]}</MDTypography>}
                    </Grid>
                    {x && x.TypeCode === "Required in Case of TTD/ PPD/ PTD Claim" ? (
                      <>
                        {" "}
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            sx={{ marginTop: "8px" }}
                            value={x.Value}
                            label="Document Type"
                          />
                        </Grid>
                        <Grid item xs={4} marginTop="6px">
                          <label htmlFor={`file-upload-${id}`}>
                            <input
                              id={`file-upload-${id}`}
                              name={`file-upload-${id}`}
                              accept="image/jpeg, application/pdf,image/png,image/jpg,application/msword,
                            application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => handleProfileChange(id, e)}
                              onClick={(e) => {
                                e.target.value = "";
                              }}
                            />
                            <MDButton
                              variant="outlined"
                              // color="error"
                              component="span"
                              disabled={upload[id].fileName}
                            >
                              Upload
                            </MDButton>
                          </label>
                        </Grid>
                        <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                          <Grid sx={{ fontSize: "14px" }}>
                            {upload[id] && <p>{upload[id].fileName}</p>}
                          </Grid>
                        </Grid>
                        {upload[id] && upload[id].fileName && (
                          <Grid item xs sx={{ ml: "2rem" }}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon fontSize="large" sx={{ mt: "-0.5rem" }} />
                            </IconButton>
                          </Grid>
                        )}
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          ) : null}
        </Grid> */}

      {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName !== "" ? (
        <Grid>
          <Grid container spacing={2} p={2}>
            <MDTypography variant="body1" color="primary" sx={{ ml: "1rem" }}>
              Upload Document
            </MDTypography>
            <MDTypography variant="body1" color="primary" sx={{ ml: "10rem" }}>
              Browse Files
            </MDTypography>
          </Grid>
          <Grid>
            {(QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
              "Hospicash" ||
              QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "Child Education Grant" ||
              QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "Loss of Job" ||
              QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
                "EMI Benefit") && (
              <Grid container spacing={2} p={2}>
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Grid container spacing={2}> */}
                {documents.map((x, id) => (
                  <React.Fragment key={x.mID}>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                      <MDInput value={x.Value} label="Document Type" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
                      <label htmlFor={`file-upload-${id}`}>
                        <input
                          id={`file-upload-${id}`}
                          name={`file-upload-${id}`}
                          accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => handleProfileChange(id, e)}
                          onClick={(e) => {
                            e.target.value = "";
                          }}
                          disabled={uploadFlags[id]}
                        />
                        <MDButton variant="outlined" color="error" component="span">
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
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                          <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                        </IconButton>
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      ) : null}
      <Grid>
        {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Critical Illness" ||
        QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          "Personal Accident" ? (
          <Grid container spacing={0.5} p={2}>
            {documents.map((x, id) => (
              <React.Fragment key={x.mID}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {id < 1 && <MDTypography>{array2[0]}</MDTypography>}
                </Grid>
                {x && x.TypeCode === "Non Medical Documents" ? (
                  <>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                      <MDInput sx={{ marginTop: "8px" }} value={x.Value} label="Document Type" />
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
                          onChange={(e) => handleProfileChange(id, e)}
                          disabled={uploadFlags[id]}
                          onClick={(e) => {
                            e.target.value = "";
                          }}
                        />
                        <MDButton variant="outlined" color="error" component="span">
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
      <Grid>
        {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
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
                      <MDInput sx={{ marginTop: "8px" }} value={x.Value} label="Document Type" />
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
                          onChange={(e) => handleProfileChange(id, e)}
                          disabled={uploadFlags[id]}
                          onClick={(e) => {
                            e.target.value = "";
                          }}
                        />
                        <MDButton variant="outlined" color="error" component="span">
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
      <Grid>
        {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
        "Personal Accident" ? (
          <Grid container spacing={0.5} p={2}>
            {documents.map((x, id) => (
              <React.Fragment key={x.mID}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {id < 1 && <MDTypography>{array1[0]}</MDTypography>}
                </Grid>
                {x && x.TypeCode === "Required in Case of Death" ? (
                  <>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                      <MDInput sx={{ marginTop: "8px" }} value={x.Value} label="Document Type" />
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
                          onChange={(e) => handleProfileChange(id, e)}
                          disabled={uploadFlags[id]}
                          onClick={(e) => {
                            e.target.value = "";
                          }}
                        />
                        <MDButton variant="outlined" color="error" component="span">
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

      <Grid>
        {QueryL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
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
                      <MDInput sx={{ marginTop: "8px" }} value={x.Value} label="Document Type" />
                    </Grid>
                    <Grid item xs={4} marginTop="10px">
                      <label htmlFor={`file-upload-${id}`}>
                        <input
                          id={`file-upload-${id}`}
                          name={`file-upload-${id}`}
                          accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => handleProfileChange(id, e)}
                          disabled={uploadFlags[id]}
                          onClick={(e) => {
                            e.target.value = "";
                          }}
                        />
                        <MDButton variant="outlined" color="error" component="span">
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
      <Grid container spacing={2} p={2}>
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
            <Grid item xs={1} marginTop="6px">
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
            <Grid item xs={2.8} style={{ marginTop: "6px" }}>
              <Grid sx={{ fontSize: "14px" }}>
                <p> {otherUpload[id] && otherUpload[id].fileName}</p>
              </Grid>
            </Grid>
            {otherUpload[id] && otherUpload[id].fileName && (
              <Grid item xs={1.5} sx={{ ml: "1rem" }}>
                <IconButton onClick={(e) => handleOtherRemove(id, e)}>
                  <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                </IconButton>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>

      <Grid container ml={5} justifyContent="left" mt={2} mb={3}>
        <MDButton
          variant="outlined"
          // color="error"
          startIcon={<AddIcon />}
          onClick={handleAddDocument}
        >
          Add Document
        </MDButton>
      </Grid>

      <Grid container justifyContent="center" mb={3}>
        <MDButton onClick={handleProceed} disabled={disableproceed}>
          Proceed
        </MDButton>
      </Grid>
      {nextproceed && (
        <>
          <Grid container spacing={2} p={2}>
            {ocrReadItems.map((item) =>
              item.visible ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl
                    item={item}
                    QueryL={QueryL}
                    setDate={setDate}
                    date={date}
                    setQuery={setQuery}
                    setHandWritten={setHandWritten}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
          <Grid container>
            <FormControl sx={{ marginLeft: "20px" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={agreement} onChange={handleCheckBox} name="agreement" />
                }
                label="I've Checked the information provided above."
              />
            </FormControl>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" p={2}>
            <MDButton
              disabled={!agreement}
              color="primary"
              onClick={() => onClaimSave()}
              sx={{ ml: "2rem" }}
            >
              SUBMIT
            </MDButton>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress />
            </Backdrop>
          </Grid>
        </>
      )}
    </Card>
  );
}

function Timer({ counter }) {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      Click On Resend OTP in 00:{counter}
    </Grid>
  );
}

function IntimationTinyURL() {
  const [query, setQuery] = useState("");
  const [nextotp, SetnextOtp] = useState(false);
  // const [errorR, setError] = useState({ Otperror: false });
  // const [otperrorflag, setotperrorflag] = useState(false);
  const [queryclose, setQueryclose] = useState(true);
  const [counter, setCounter] = useState(60);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [startCounterResend, setStartCounterResend] = useState(false);
  const [otpdisabled, setOtpdisabled] = useState(false);
  const [validateotpdisabled, setvalidateotpdisabled] = useState(true);
  const [sendotp, setSendOtp] = useState(false);
  const [requriement, setRequriemet] = useState(false);
  const [Email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [policyDetails, setPolicyDetails] = useState({});
  // const [claimDetails, setClaimDetails] = useState(HelathJson);
  // const mes = "Please fill the required field";
  const [sendOtpData, setOtpData] = useState({
    name: "",
    otp: "",
    email: "",
    userName: "sindhu@inubesolutions.com",
    envId: "297",
    productType: "Mica",
    mobileNumber: "",
    sendSms: true,
    isBerry: false,
    client: "Magma",
  });
  const { search } = useLocation();
  useEffect(async () => {
    // debugger;
    const IntimationNumber = new URLSearchParams(search).get("IntimationNumber");
    const dataByClaimNo = await SearchClaimDetailsByRegClaimNo(IntimationNumber);
    const claimdetail = dataByClaimNo.finalResult;
    console.log("SCDBR response", claimdetail);
    setQuery({ ...claimdetail });

    const policyData = await GetPolicyInfoByPolicyNumber(claimdetail.policyNo);
    setPolicyDetails(policyData.policy_details);
    sendOtpData.email =
      policyData.policy_details[0].policyRequest.ProposerDetails.EmailId === ""
        ? ""
        : policyData.policy_details[0].policyRequest.ProposerDetails.EmailId;
    sendOtpData.name =
      policyData.policy_details[0].policyRequest.ProposerDetails.Name === ""
        ? ""
        : policyData.policy_details[0].policyRequest.ProposerDetails.Name;
    sendOtpData.mobileNumber =
      policyData.policy_details[0].policyRequest.ProposerDetails.MobileNo === ""
        ? ""
        : policyData.policy_details[0].policyRequest.ProposerDetails.MobileNo;

    claimdetail.masterPolicyNo =
      policyData.policy_details[0].policyRequest.MasterPolicyDetails[0].masterPolicyNo;
    setQuery((prev) => ({ ...prev, ...claimdetail }));
    // }
    setOtpData(sendOtpData);
    setEmail(policyData.policy_details[0].policyRequest.ProposerDetails.EmailId);
    setMobile(policyData.policy_details[0].policyRequest.ProposerDetails.MobileNo);
  }, []);

  useEffect(() => {
    console.log("PolicyDatas", policyDetails);
  }, [policyDetails]);

  const [validateOtpData, setValidateOtp] = useState({
    otp: "",
    email: "",
    mobileNumber: "",
    userName: "",
    envId: "297",
    productType: "MICA",
    isFirstTimeUser: true,
    isClaimsLive: false,
  });

  const handleNextOtp = async () => {
    setvalidateotpdisabled(false);
    SetnextOtp(true);
    if (sendOtpData.mobileNumber !== "") {
      const res = await sendOTP(sendOtpData);
      if (res.status === 200) {
        Swal.fire({
          html: `${res.data.responseMessage}`,
          icon: "success",
          allowOutsideClick: false,
          showCloseButton: true,
        });

        setOtpdisabled(true);

        setStartCounterFlag(true);
      }
      setSendOtp(true);
    } else {
      Swal.fire({
        html: "Your Mobile Number is not integrated",
        icon: "warning",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    }
  };
  const onResendOTP = async () => {
    SetnextOtp(true);
    if (sendOtpData.mobileNumber !== "") {
      const res = await sendOTP(sendOtpData);
      if (res.status === 200) {
        setvalidateotpdisabled(false);
        Swal.fire({
          html: `${res.data.responseMessage}`,
          icon: "success",
          allowOutsideClick: false,
          showCloseButton: true,
        });
        setStartCounterResend(true);
        setOtpdisabled(true);
      }
    } else {
      Swal.fire({
        html: "Your Mobile Number is not integrated",
        icon: "warning",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    }
  };

  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    if (counter === 0) {
      setCounter(60);
      setStartCounterFlag(false);
      setTimerFlag(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);
  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterResend) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    if (counter === 0) {
      setCounter(60);
      setStartCounterResend(false);
      setTimerFlag(true);
      setOtpdisabled(false);
      setvalidateotpdisabled(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterResend]);

  // const onValidateOtp = async () => {
  //   debugger;
  //   if (validateOtpData.otp !== "") {
  //     setError((prevState) => ({ ...prevState, Otperror: true }));
  //   }
  //   validateOtpData.email = sendOtpData.email;
  //   validateOtpData.userName = sendOtpData.email;
  //   const validate = await validateOtp(validateOtpData);
  //   if (validate.status === 200) {
  //     if (nextotp.UHID !== "") {
  //       Swal.fire({
  //         icon: "success",
  //         text: "You are Successfully verified",
  //         allowOutsideClick: false,
  //         showCloseButton: true,
  //       });
  //     }
  //     setQueryclose(false);
  //     setRequriemet(true);
  //   }
  //   else if (validate === null) {
  //     Swal({
  //       html: true,
  //       icon: "error",
  //       // title: "Claim Intimated Successful",
  //       text: `You're almost there. Just drop in a legit 4-digit OTP`,
  //     });
  //   }

  //   setotperrorflag(true);
  // };

  const onValidateOtp = async () => {
    validateOtpData.email = sendOtpData.email;
    validateOtpData.userName = sendOtpData.email;

    const validate = await validateOtp(validateOtpData);

    if (validate === null) {
      swal({
        html: true,
        icon: "error",
        // title: "Claim Intimated Successful",
        text: `You're almost there. Just drop in a legit 4-digit OTP`,
      });
    }

    if (validate.status === 200) {
      if (nextotp.UHID !== "") {
        Swal.fire({
          icon: "success",
          text: "You are Successfully verified",
          allowOutsideClick: false,
          showCloseButton: true,
        });
      }
      setQueryclose(false);
      setRequriemet(true);
    }
    // setotperrorflag(true);
  };
  const handleChange = (e) => {
    // if (e.target.name === "otp") {
    //   if (e.target.value.length < 7) {
    //     const numRegex = /^[0-9]*$/;
    //     if (numRegex.test(e.target.value)) {
    validateOtpData[e.target.name] = e.target.value;
    setValidateOtp((prev) => ({ ...prev, ...validateOtpData }));
    // }
    // }
    // }
  };

  return (
    <>
      {queryclose === true ? (
        <Card>
          {query.claimStatusId === 113 ? (
            <>
              <ImageListItem
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <img src={`${Magma}`} alt="" style={{ width: "200px", marginBottom: "20px" }} />
              </ImageListItem>
              <Grid container p={2} justifyContent="center">
                <MDTypography variant="body1" color="primary">
                  Updates Required Documents
                </MDTypography>
              </Grid>
              <Grid container spacing={4} p={2} justifyContent="center">
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Intimation No"
                    name="regClaimNo"
                    value={query && query.regClaimNo}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="COI No" name="COI" value={query && query.policyNo} disabled />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="UHID"
                    name="uhid"
                    value={
                      query &&
                      query.claimBasicDetails &&
                      query.claimBasicDetails.memberDetails &&
                      query.claimBasicDetails.memberDetails.memberId
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Member Name"
                    name="MemberName"
                    value={
                      query &&
                      query.claimBasicDetails &&
                      query.claimBasicDetails.memberDetails &&
                      query.claimBasicDetails.memberDetails.insuredName
                    }
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container p={2} justifyContent="center">
                <MDButton
                  sx={{ justifyContent: "right" }}
                  variant="contained"
                  onClick={handleNextOtp}
                  disabled={sendotp}
                >
                  Send OTP
                </MDButton>
              </Grid>
              <Grid container p={0} justifyContent="center">
                <MDTypography sx={{ color: "#2E8B57", fontSize: 14, mb: 3 }}>
                  OTP will be shared to the Registered Email/ Mobile Number
                </MDTypography>
              </Grid>
              {nextotp && (
                <>
                  <Grid container spacing={4} p={2} justifyContent="center">
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="OTP"
                        name="otp"
                        value={validateOtpData.otp}
                        onChange={(e) => handleChange(e)}
                        inputProps={{ maxLength: 6 }}

                        // error={errorR.Otperror && validateOtpData.otp === ""}
                        // helperText={errorR.Otperror && validateOtpData.otp === "" && mes}
                      />
                      {/* {otperrorflag && validateOtpData.otp !== "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "12px" }}>
                          Please Enter valid OTP
                        </MDTypography>
                      ) : null} */}
                      <MDTypography
                        sx={{
                          fontSize: "0.9rem",
                          color: "green",
                          textAlign: "left",
                          mt: "1rem",
                        }}
                      >
                        {startCounterFlag && <Timer counter={counter} />}
                        {startCounterResend && <Timer counter={counter} />}
                      </MDTypography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={5} p={2} justifyContent="center">
                    {timerFlag && (
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDButton
                          sx={{ justifyContent: "right" }}
                          variant="outlined"
                          onClick={onResendOTP}
                          disabled={otpdisabled}
                        >
                          RESEND OTP
                        </MDButton>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDButton
                        sx={{ justifyContent: "right", fontSize: 11 }}
                        variant="contained"
                        onClick={onValidateOtp}
                        disabled={validateotpdisabled}
                      >
                        VALIDATE OTP
                      </MDButton>
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          ) : (
            <Grid container p={2} justifyContent="center">
              <MDTypography variant="body1" color="primary">
                Claim no already registered for this intimation no.
              </MDTypography>
            </Grid>
          )}
        </Card>
      ) : null}
      {requriement === true ? (
        <RequiredDocuments
          query={query}
          setQuery={setQuery}
          Email={Email}
          mobile={mobile}
          policyDetails={policyDetails}
        />
      ) : null}
    </>
  );
}
export default IntimationTinyURL;
