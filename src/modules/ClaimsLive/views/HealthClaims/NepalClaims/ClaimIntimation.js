import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Tab,
  Tabs,
  Paper,
  Box,
  Autocomplete,
  TextField,
  Backdrop,
  IconButton,
  // Button,
  // Stack,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import swal2 from "sweetalert2";
// import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "../../../../../components/MDInput";
// import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import MDDatePicker from "../../../../../components/MDDatePicker";
import {
  DateFormateing,
  GenericApi,
  GetEndorsementJson,
  GetPayLoadByQueryDynamic,
  GetPolicyDetailsByNumber,
  QueryExecution,
  UploadFiles,
  // SaveClaimDetails,
  getProdPartnermasterDatas,
  master,
} from "../data";
import { diffDaysCalculator } from "../../../../../Common/Validations";
// import { UpdateSequenceNumber } from "../../MotorClaims/Processing/data";
import ClaimsDetails from "./JsonData";
import { GetAllocationByPolicyNo } from "../../../../BaseSetup/views/Reinsurance/data";

function ClaimIntimation() {
  const [clickedChipId, setClickedChipId] = useState(null);
  const [claimdetails, setClaimDetails] = useState(ClaimsDetails);
  const [Searchflag, setSearchFlag] = useState(false);
  const [serachpreview, setSearchPreview] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [SearchObj, SetSearchObj] = useState({ policyNo: "" });
  const [PolicyDetails, setPolicyDetails] = useState();
  const [endoPolicy, setEndoPolicy] = useState([]);
  const [EndoJson, setEndoJson] = useState();
  const [Treatybreakdown, setTreatyBreakdown] = useState([]);
  const [Riskbreakdown, setRiskBreakdown] = useState([]);
  const [PendingDeposit, setPendingDeposit] = useState([]);
  const [creditedStatus, setCreaditedStatus] = useState([]);
  const [disabledd, setDisabled] = useState([]);
  const [claimBranch, setClaimBranch] = useState([]);
  const [claimsubBranch, setClaimSubBranch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState({ docId: "", docName: "", UploadDocDate: "", fileName: "" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize2, setPageSize] = React.useState(10);
  const [selectedId, setSelectedId] = useState(0);
  const [flag, setFlags] = useState({
    RiskBreakdown: false,
    Treatbreakdown: false,
    Warranties: false,
    claimhistory: false,
    PendingDeposite: false,
    Previewbutton: false,
    Searchbutton: false,
    EndorsementNumber: false,
    PolicyNumberflag: false,
    policyNumber: false,
    PolicyNodisable: false,
    RIvalidationflag: false,
    RIEmailbutton: false,
    EmailError: false,
    ErrorFlag: false,
  });

  const handleChange = (e, name) => {
    // debugger;
    const updatedSearchObj = { ...SearchObj, [e.target.name]: e.target.value };
    SetSearchObj(updatedSearchObj);
    if (updatedSearchObj.policyNo !== "") {
      setFlags((prev) => ({ ...prev, Searchbutton: true }));
    }
    if (name === "RIEmail") {
      claimdetails.transactionDataDTO[0].transactionDetails.RIDetails.RIEmail = e.target.value;
      setClaimDetails((prev) => ({ ...prev, ...claimdetails }));
    }
    if (claimdetails.transactionDataDTO[0].transactionDetails.RIDetails.RIEmail !== "") {
      setFlags((prev) => ({ ...prev, RIEmailbutton: true }));
    }
  };
  const handlesearch = async () => {
    // debugger;
    const Policydetails = await GetPolicyDetailsByNumber(SearchObj.policyNo);
    console.log("Policydata", Policydetails);
    const Allocation = await GetAllocationByPolicyNo(SearchObj.policyNo);
    claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.dateOfLoss = "";
    if (
      Policydetails.status === 7 ||
      Policydetails.responseMessage === "Policy has been cancelled" ||
      Policydetails.responseMessage === "Policy not found"
    ) {
      // swal({
      //   html: true,
      //   icon: "error",
      //   text: "Invalid Policy Number",
      // });
      swal2.fire({
        icon: "error",
        html: `
      <div>
      Invalid Policy Number
      </div>
    `,
        confirmButtonColor: "#000099",
        confirmButtonText: "OK",
      });
    } else {
      const obje = {
        reportname: "NepalClaimChequeBounce",
        paramList: [
          {
            ParameterName: "PolicyNo",
            ParameterValue: Policydetails.PolicyNumber,
          },
        ],
      };
      const ChequeBounce = await GetPayLoadByQueryDynamic(obje);
      Allocation.data.mapDetails.forEach(async (a) => {
        setLoading(true);
        if (ChequeBounce !== null) {
          // if (ChequeBounce.data.finalResult !== null) {
          ChequeBounce.data.finalResult.forEach(async (item) => {
            const chequeData = JSON.parse(item.addtionaldetails);
            console.log("chequedata", chequeData);
            if (chequeData.CreditedConform1 === "Cheque Dishnoured/ Cheque Bounce") {
              // swal({
              //   html: true,
              //   icon: "error",
              //   text: "Policy is bound to be cancelled",
              // });
              swal2.fire({
                icon: "error",
                html: `
              <div>
               Policy is bound to be cancelled
              </div>
            `,
                confirmButtonColor: "#000099",
                confirmButtonText: "OK",
              });
            }
          });
        } else if (a.Type === "FAC" && a.AllocatedPremium !== 0 && a.Percentage !== 0) {
          setLoading(false);
          swal2.fire({
            icon: "error",
            html: `
          <div>
          This Policy is subject to RI Approval
          </div>
        `,
            confirmButtonColor: "#000099",
            confirmButtonText: "OK",
          });

          setFlags((prev) => ({ ...prev, RIvalidationflag: true }));
        } else if (a.Type === "FAC" && a.AllocatedPremium === 0 && a.Percentage === 0) {
          setPolicyDetails(Policydetails);
          const obj = {
            reportconfigid: "502",
            paramList: [
              {
                parameterName: "PolicyNo",
                parameterValue: SearchObj.policyNo,
              },
            ],
          };
          const EndoPolicy = await QueryExecution(obj);
          if (EndoPolicy.data.length === 0) {
            setFlags((prev) => ({ ...prev, policyNumber: true }));
          } else {
            const arr = [];
            EndoPolicy.data.forEach((x) => {
              arr.push({
                EndoPolicyNo: x.endoPolicyNo,
                PolicyNo: x.policyNo,
                EndorsementNo: x.endorsementNo,
                EndorsmentDate: x.endorsmentDate,
              });
            });
            setEndoPolicy([...arr]);
            setFlags((prev) => ({ ...prev, policyNumber: true }));
          }
          // setFlags((prev) => ({ ...prev, RIvalidationflag: false }));
          setLoading(false);
          setSearchFlag(true);
        }
      });

      //   }
      // });
    }
  };
  const newData = endoPolicy.map((row, index) => ({ ...row, id: index }));
  console.log("newdata", newData);

  const handlePreview = async () => {
    // debugger;
    if (newData.length === 0) {
      claimdetails.claimBasicDetails.PolicyDetails.PolicyNo = PolicyDetails.PolicyNumber;

      const obj = {
        reportname: "NepalClaimTreatyBreakDown",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: "",
          },
          {
            ParameterName: "policyno",
            ParameterValue: PolicyDetails.PolicyNumber,
          },
          {
            ParameterName: "Treaty",
            ParameterValue: "",
          },
        ],
      };
      const treatyBreakdown = await GetPayLoadByQueryDynamic(obj);
      const res = treatyBreakdown.data.finalResult;
      if (res !== null) {
        setTreatyBreakdown([...res]);
      }

      const obj1 = {
        reportname: "NepalClaimRiskBreakdown",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: "",
          },
          {
            ParameterName: "policyno",
            ParameterValue: PolicyDetails.PolicyNumber,
          },
        ],
        pageSize: 10,
        pageNumber: 1,
      };

      const RiskBreakdown = await GetPayLoadByQueryDynamic(obj1);
      if (RiskBreakdown !== null) {
        const res1 = RiskBreakdown.data.finalResult;
        setRiskBreakdown([...res1]);
      }

      const obj2 = {
        reportname: "NepalClaimsPendingDeposit",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: "",
          },
          {
            ParameterName: "policyno",
            ParameterValue: PolicyDetails.PolicyNumber,
          },
        ],
      };

      const PendingDeposite = await GetPayLoadByQueryDynamic(obj2);
      const res2 = PendingDeposite.data.finalResult;
      setPendingDeposit([...res2]);

      const obj3 = {
        reportname: "NepalClaimCreditedStatus",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: "",
          },
          {
            ParameterName: "policyno",
            ParameterValue: PolicyDetails.PolicyNumber,
          },
          {
            ParameterName: "endoNo",
            ParameterValue: "",
          },
        ],
      };

      const CreditedStatus = await GetPayLoadByQueryDynamic(obj3);
      if (CreditedStatus !== "") {
        const res3 = CreditedStatus.data.finalResult;
        setCreaditedStatus([...res3]);
      }
      setFlags((prev) => ({ ...prev, EndorsementNumber: false }));
      setFlags((prev) => ({ ...prev, PolicyNumberflag: true }));
    } else {
      claimdetails.claimBasicDetails.PolicyDetails.PolicyNo = EndoJson.PolicyNo;
      const obj1 = {
        reportname: "NepalClaimTreatyBreakDown",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: EndoJson.EndorsementDetails.EndoPolicyNo,
          },
          {
            ParameterName: "policyno",
            ParameterValue: EndoJson.PolicyNo,
          },
          {
            ParameterName: "Treaty",
            ParameterValue: "",
          },
        ],
      };

      const treatyBreakdown = await GetPayLoadByQueryDynamic(obj1);
      const res = treatyBreakdown.data.finalResult;
      if (res !== null) {
        setTreatyBreakdown([...res]);
      }

      const obj = {
        reportname: "NepalClaimRiskBreakdown ",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: EndoJson.EndorsementNo,
          },
          {
            ParameterName: "policyno",
            ParameterValue: EndoJson.PolicyNo,
          },
        ],
      };

      const riskBreakdown = await GetPayLoadByQueryDynamic(obj);
      const res1 = riskBreakdown.data.finalResult;
      setRiskBreakdown([...res1]);

      const obj2 = {
        reportname: "NepalClaimsPendingDeposit",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: EndoJson.EndorsementDetails.EndoPolicyNo,
          },
          {
            ParameterName: "policyno",
            ParameterValue: EndoJson.PolicyNo,
          },
        ],
      };

      const RiskBreakdown = await GetPayLoadByQueryDynamic(obj2);
      if (RiskBreakdown !== null) {
        const res2 = RiskBreakdown.data.finalResult;
        setPendingDeposit([...res2]);
      }

      const obj3 = {
        reportname: "NepalClaimCreditedStatus",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: EndoJson.EndorsementDetails.EndoPolicyNo,
          },
          {
            ParameterName: "policyno",
            ParameterValue: EndoJson.PolicyNo,
          },
          {
            ParameterName: "endoNo",
            ParameterValue: EndoJson.EndorsementNo,
          },
        ],
      };

      const CreditedStatus = await GetPayLoadByQueryDynamic(obj3);
      if (CreditedStatus !== null) {
        const res3 = CreditedStatus.data.finalResult;
        setCreaditedStatus([...res3]);
      }
      // const abd1 = DateFormateing(EndoJson.EndorsementDetails.PolicyStartDate);
      // {EndoJson.EndorsementDetails.PolicyEndDate});
      // console.log("result", abd1);
      setFlags((prev) => ({ ...prev, EndorsementNumber: true }));
      setFlags((prev) => ({ ...prev, PolicyNumberflag: false }));
    }
    // const abd1 = DateFormateing(dd);
    // console.log("result", abd1);
    setSearchPreview(true);
    setFlags((prev) => ({ ...prev, RiskBreakdown: true }));
    setClaimDetails((prev) => ({ ...prev, ...claimdetails }));
    setFlags((prev) => ({ ...prev, Searchbutton: false }));
  };

  console.log("RiskBreakdown", Riskbreakdown);
  console.log("creditedStatys", creditedStatus);
  const newData1 = Treatybreakdown.map((row, index) => ({ ...row, id: index + 1 }));
  const RiskData = Riskbreakdown.map((row, index) => ({ ...row, id: index + 1 }));
  const PendingData = PendingDeposit.map((row, index) => ({ ...row, id: index + 1 }));
  // console.log("PendingData", PendingData);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleRiskBreakdown = () => {
    setFlags((prev) => ({ ...prev, RiskBreakdown: true }));
    setFlags((prev) => ({ ...prev, Treatbreakdown: false }));
    setFlags((prev) => ({ ...prev, Warranties: false }));
    setFlags((prev) => ({ ...prev, claimhistory: false }));
    setFlags((prev) => ({ ...prev, PendingDeposite: false }));
  };

  const handleTreatyBreakdown = async () => {
    setFlags((prev) => ({ ...prev, RiskBreakdown: false }));
    setFlags((prev) => ({ ...prev, Treatbreakdown: true }));
    setFlags((prev) => ({ ...prev, Warranties: false }));
    setFlags((prev) => ({ ...prev, claimhistory: false }));
    setFlags((prev) => ({ ...prev, PendingDeposite: false }));
  };

  console.log("tratybreakdown", Treatybreakdown);
  const handleWarranties = () => {
    setFlags((prev) => ({ ...prev, RiskBreakdown: false }));
    setFlags((prev) => ({ ...prev, Treatbreakdown: false }));
    setFlags((prev) => ({ ...prev, Warranties: true }));
    setFlags((prev) => ({ ...prev, claimhistory: false }));
    setFlags((prev) => ({ ...prev, PendingDeposite: false }));
  };

  const handleClaimHistory = () => {
    setFlags((prev) => ({ ...prev, RiskBreakdown: false }));
    setFlags((prev) => ({ ...prev, Treatbreakdown: false }));
    setFlags((prev) => ({ ...prev, Warranties: false }));
    setFlags((prev) => ({ ...prev, claimhistory: true }));
    setFlags((prev) => ({ ...prev, PendingDeposite: false }));
  };
  const handlePendingDeposit = () => {
    setFlags((prev) => ({ ...prev, RiskBreakdown: false }));
    setFlags((prev) => ({ ...prev, Treatbreakdown: false }));
    setFlags((prev) => ({ ...prev, Warranties: false }));
    setFlags((prev) => ({ ...prev, claimhistory: false }));
    setFlags((prev) => ({ ...prev, PendingDeposite: true }));
  };

  const handleEnoPolicyNo = async (id) => {
    setClickedChipId(id);
    setFlags((prev) => ({ ...prev, Previewbutton: true }));
    const policydetails = await GetEndorsementJson(newData[id].EndorsementNo);
    setEndoJson(policydetails.data.finalResult);
    // refElement.current.style.backgroundColor = "#0033cc";
  };

  console.log("endojson", EndoJson);

  const handlePolicyNo = async () => {
    setClickedChipId(5);
    setFlags((prev) => ({ ...prev, Previewbutton: true }));
    // const policydetails = await GetEndorsementJson(newData[id].EndorsementNo);
    // console.log("endojson", policydetails);
    setFlags((prev) => ({ ...prev, PolicyNumberflag: true }));
    setFlags((prev) => ({ ...prev, EndorsementNumber: false }));
  };

  const handleDate = (e, d, name) => {
    // debugger;
    if (name === "dateOfLoss") {
      // SearchObj.DOL = d;
      claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.dateOfLoss = d;
      SetSearchObj((prev) => ({ ...prev, SearchObj }));

      const resultDates = newData.map((x) => new Date(x.EndorsmentDate));

      const dateDiffs = resultDates.map((date) =>
        Math.abs(
          diffDaysCalculator(
            new Date(
              claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.dateOfLoss
            ),
            date
          )
        )
      );
      if (
        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.dateOfLoss !==
        ""
      ) {
        const nearestDateIndex = dateDiffs.indexOf(Math.min(...dateDiffs));
        const updatedData = newData.map((item, index) => ({
          ...item,
          enabled: index === nearestDateIndex,
        }));

        setDisabled([...updatedData]);

        if (updatedData.length !== 0) {
          setFlags((prev) => ({ ...prev, PolicyNodisable: true }));
        }

        console.log("Updated Data:", updatedData);
      }
      if (
        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.dateOfLoss ===
        ""
      ) {
        setDisabled([]);
        setFlags((prev) => ({ ...prev, PolicyNodisable: false }));
      }
    }
  };

  const navigate = useNavigate();
  const handleTrackClaims = () => {
    navigate(`/NepalClaims/Dashboard`, { productCode: "NepalMotorTwoWheeler" });
  };

  const onClaimSave = async () => {
    // debugger;
    if (creditedStatus[0].status === "Not Paid") {
      // swal({
      //   html: true,
      //   icon: "error",
      //   text: "Clear Payment to continue with Claim Processing",
      // });
      swal2.fire({
        icon: "error",
        html: `
      <div>
      Clear Payment to continue with Claim Processing
      </div>
    `,
        confirmButtonColor: "#000099",
        confirmButtonText: "OK",
      });
    }
    if (
      claimdetails.transactionDataDTO[0].transactionDetails.TreatyType === "" ||
      claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.branch === "" ||
      // SearchObj.DOL
      claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.dateOfLoss ===
        ""
    ) {
      setFlags((prev) => ({ ...prev, ErrorFlag: true }));
    } else {
      setLoading(true);
      claimdetails.policyNo = PolicyDetails.PolicyNumber;
      // claimdetails.Prefix = "INT0000";
      claimdetails.Prefix = "PRO1/KTM/MC/CI/23/24/00000";
      claimdetails.NumberType = "ClaimIntimationNo";
      claimdetails.AttributeName = "regClaimNo";
      setClaimDetails((prev) => ({ ...prev, ...claimdetails }));

      // const res = await UpdateSequenceNumber("regClaimNo", "INT0000", "regClaimNo", ClaimsDetails);

      const res = await GenericApi("NepalMotorTwoWheeler", "NepalSaveClaim", claimdetails);
      // const Save = await SaveClaimDetails(res.data.finalResult);
      console.log("savedetails", res);
      setLoading(false);
      if (res.responseMessage === "Success" || res.status === 1) {
        swal2
          .fire({
            icon: "success",
            title: "Claim Intimation is Successful",
            html: `
        <div>
          <p>Your Claim Intimation  Number is ${res.finalResult.regClaimNo}</p><br/>
          <p style="font-size: 12px;">Keep your intimation number handy for future reference.</p>
        </div>
      `,
            confirmButtonColor: "#000099",
            confirmButtonText: "OK",
          })
          .then((res1) => {
            if (res1.isConfirmed) {
              handleTrackClaims();
            }
          });
      }
    }
  };

  const handleonBlur = (e) => {
    if (e.target.name === "RIEmail") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(e.target.value)) {
        setFlags((prev) => ({ ...prev, EmailError: true }));
      } else {
        setFlags((prev) => ({ ...prev, EmailError: false }));
      }
    }
  };

  const columns = [
    { field: "id", headerName: "Sl No", width: 150, align: "center", headerAlign: "center" },
    {
      field: "Risk",
      headerName: "Risk",
      width: 320,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Rate",
      headerName: "Rate",
      width: 300,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Amount",
      headerName: "Amount",
      type: "number",
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  const columns1 = [
    { field: "id", headerName: "Sl No", width: 100, headerAlign: "center", align: "center" },
    {
      field: "Type",
      headerName: "RI Type",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "AllocatedAmt",
      headerName: "Sum Insured",
      type: "number",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "SumInsuredBal",
      headerName: "Sum Insured Bal",
      type: "number",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Share",
      headerName: "Precentage",
      type: "number",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Limit",
      headerName: "Limit",
      type: "number",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "AllocatedPremium",
      headerName: "Premium",
      type: "number",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
  ];
  const columns2 = [
    { field: "id", headerName: "Sl No", width: 100, headerAlign: "center", align: "center" },
    {
      field: "ClaimNumber",
      headerName: "Claim Number",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "DocumentNumber",
      headerName: "Document Number",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Status",
      headerName: "Status",
      width: 120,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "LossAmount",
      headerName: "Loss Amount",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "RegistrationDate",
      headerName: "Registration Date",
      width: 180,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "AffectedProperty",
      headerName: "Affected Property",
      width: 180,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
  ];

  const columns3 = [
    { field: "id", headerName: "Sl No", width: 100, align: "center", headerAlign: "center" },
    {
      field: "DocumentNo",
      headerName: "Document Number",
      width: 300,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "PaymentSource",
      headerName: "Payment Source",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "PaidDate",
      headerName: "Paid Date",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Amount",
      headerName: "Amount",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ChequeNo",
      headerName: "Cheque Number",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "BankName",
      headerName: "Cheque Bank Name",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
  ];

  const rows2 = [
    {
      id: 1,
      ClaimNumber: "",
      DocumentNumber: "",
      Status: "",
      LossAmount: "",
      RegistrationDate: "",
      AffectedProperty: "",
    },
    {
      id: 2,
      ClaimNumber: "",
      DocumentNumber: "",
      Status: "",
      LossAmount: "",
      RegistrationDate: "",
      AffectedProperty: "",
    },
    {
      id: 3,
      ClaimNumber: "",
      DocumentNumber: "",
      Status: "",
      LossAmount: "",
      RegistrationDate: "",
      AffectedProperty: "",
    },
    {
      id: 4,
      ClaimNumber: "",
      DocumentNumber: "",
      Status: "",
      LossAmount: "",
      RegistrationDate: "",
      AffectedProperty: "",
    },
    {
      id: 5,
      ClaimNumber: "",
      DocumentNumber: "",
      Status: "",
      LossAmount: "",
      RegistrationDate: "",
      AffectedProperty: "",
    },
    {
      id: 4,
      ClaimNumber: "",
      DocumentNumber: "",
      Status: "",
      LossAmount: "",
      RegistrationDate: "",
      AffectedProperty: "",
    },
    {
      id: 7,
      ClaimNumber: "",
      DocumentNumber: "",
      Status: "",
      LossAmount: "",
      RegistrationDate: "",
      AffectedProperty: "",
    },
    {
      id: 8,
      ClaimNumber: "",
      DocumentNumber: "",
      Status: "",
      LossAmount: "",
      RegistrationDate: "",
      AffectedProperty: "",
    },
  ];

  const TreatyTypes = [
    { mValue: "Normal", mID: 1 },
    { mValue: "Standalone TP", mID: 2 },
  ];
  console.log("claimdetails", claimdetails);

  const handleAutocomplete = async (e, value, name) => {
    // debugger;
    if (name === "TreatyType") {
      if (value !== null) {
        claimdetails.transactionDataDTO[0].transactionDetails.TreatyType = value.mValue;
      } else {
        claimdetails.transactionDataDTO[0].transactionDetails.TreatyType = "";
      }
    }
    if (name === "branch") {
      if (value !== null) {
        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.branch =
          value.mValue;
        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.subBranch =
          "";
        setClaimSubBranch([]);
        const data1 = {
          MasterType: "ClaimSubBranch",
          ProductId: 1193,
        };
        const Response = {
          FieldName: value.mID,
        };
        const branchResponse1 = await master(data1.ProductId, data1.MasterType, Response);
        console.log("subBranch", branchResponse1);
        if (branchResponse1 !== null) {
          if (branchResponse1.data.length >= 1) {
            setClaimSubBranch([...branchResponse1.data]);
          }
        }
      } else {
        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.branch = "";
        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.subBranch =
          "";
      }
    }
    if (name === "subBranch") {
      if (value !== null) {
        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.subBranch =
          value.mValue;
      } else {
        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.subBranch =
          "";
      }
    }
    setClaimDetails((prev) => ({ ...prev, ...claimdetails }));
    if (newData.length === 0) {
      const obj = {
        reportname: "NepalClaimTreatyBreakDown",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: "",
          },
          {
            ParameterName: "policyno",
            // ParameterValue: EndoJson.PolicyNo,
            ParameterValue: PolicyDetails.PolicyNumber,
          },
          {
            ParameterName: "Treaty",
            ParameterValue: claimdetails.transactionDataDTO[0].transactionDetails.TreatyType,
          },
        ],
      };
      const treatyBreakdown = await GetPayLoadByQueryDynamic(obj);
      if (treatyBreakdown.data.finalResult.length === 0) {
        swal2.fire({
          icon: "error",
          html: `
        <div>
        <p>For This Policy Number ${claimdetails.transactionDataDTO[0].transactionDetails.TreatyType} is not Applicable</p><br/>
        </div>
      `,
          confirmButtonColor: "#000099",
          confirmButtonText: "OK",
        });
      }
      const res = treatyBreakdown.data.finalResult;
      setTreatyBreakdown([...res]);
    } else {
      const obj1 = {
        reportname: "NepalClaimTreatyBreakDown",
        paramList: [
          {
            ParameterName: "endorsementno",
            ParameterValue: EndoJson.EndorsementDetails.EndoPolicyNo,
          },
          {
            ParameterName: "policyno",
            ParameterValue: EndoJson.PolicyNo,
          },
          {
            ParameterName: "Treaty",
            ParameterValue: claimdetails.transactionDataDTO[0].transactionDetails.TreatyType,
          },
        ],
      };

      const treatyBreakdown = await GetPayLoadByQueryDynamic(obj1);
      const res = treatyBreakdown.data.finalResult;
      setTreatyBreakdown([...res]);
    }
  };

  console.log("subBranch", claimsubBranch);

  useEffect(async () => {
    const data1 = {
      MasterType: "ClaimBranch",
      ProductId: 1193,
    };
    const branchResponse = await getProdPartnermasterDatas(data1.ProductId, data1.MasterType);
    if (branchResponse.status === 200) {
      setClaimBranch([...branchResponse.data]);
    }
  }, []);

  console.log("upload", upload);
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  console.log("claimbranch", claimBranch);

  // const totalCharacters =
  //   newData.reduce((acc, x) => acc + x.EndoPolicyNo.length, 0) +
  //   (flag.policyNumber ? PolicyDetails.PolicyNumber.length : 0);
  const totalCharacters = newData.length;

  // Determine the index where the "Preview" button should be placed
  const previewIndex = Math.ceil(totalCharacters / 2);
  console.log("previewIndex", previewIndex);

  const UploadImage = async (file) => {
    // debugger;
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      upload.docId = result.data[0].docid;
      setUpload(upload);
    });
  };

  const handleFileUpload = (e) => {
    // debugger;
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
      swal2.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPG and PDF files are allowed.",
      });
      return;
    }
    const newuploads = upload;
    newuploads.fileName = e.target.files[0].name;
    newuploads.UploadDocDate = new Date();
    // setOtherUpload(newuploads);
    UploadImage(e.target.files[0]);
  };

  const handleDeleteupload = () => {
    upload.fileName = "";
    upload.docId = "";
    upload.UploadDocDate = "";
    setUpload(upload);
  };

  const [tableRows, setTableRows] = useState([]);
  const handleClick = async (e, id) => {
    setTableRows([]);
    setSelectedId(id);
    // setConsolidate(true);
  };

  const handlePageChange = (e, newPageSize) => {
    if (newPageSize >= 1) {
      setCurrentPage(newPageSize);
      handleClick(e, selectedId, newPageSize);
    }
  };
  const handlePageSizeChange = (newPage) => {
    setPageSize(newPage);
  };
  const divStyle = {
    textAlign: "right",
  };

  const handleSendEmail = () => {
    swal2
      .fire({
        icon: "success",
        html: `
  <div>
    Email Sent Successfully
  </div>
`,
        confirmButtonColor: "#000099",
        confirmButtonText: "OK",
      })
      .then((res1) => {
        if (res1.isConfirmed) {
          handleTrackClaims();
        }
      });
  };

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
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h4" color="primary">
            Claim Intimation
          </MDTypography>
        </Grid>
        <Grid container spacing={2} p={2} justifyContent="left">
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Policy Number"
              name="policyNo"
              sx={redAsterisk}
              required
              value={SearchObj.policyNo}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          {/* <Grid container p={2} justifyContent="center"> */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} style={{ marginLeft: "1rem" }}>
            <MDButton
              sx={{ justifyContent: "right" }}
              variant="contained"
              onClick={handlesearch}
              disabled={flag.Searchbutton === false}
            >
              SEARCH
            </MDButton>
          </Grid>
        </Grid>
        {Searchflag === true && (
          <>
            {/* <Card sx={{ height: "100%", width: "100%" }}> */}
            <Grid container spacing={2} p={2} justifyContent="left">
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                {/* <MDInput
                  label="Policy Start Date"
                  name="PolicyStartDate"
                  value={PolicyDetails.PolicyStartDate} */}
                <MDDatePicker
                  fullWidth
                  name="PolicyStartDate"
                  value={PolicyDetails.PolicyStartDate}
                  options={{
                    altFormat: "d/m/Y",
                    dateFormat: "m/d/Y",
                    altInput: true,
                    required: true,
                    sx: redAsterisk,
                  }}
                  input={{
                    label: "Policy Start Date",
                    value: PolicyDetails.PolicyStartDate,
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                {/* <MDInput
                  label="Policy End Date"
                  name="PolicyEndDate"
                  value={PolicyDetails.PolicyEndDate}
                  disabled */}
                <MDDatePicker
                  fullWidth
                  name="PolicyEndDate"
                  value={PolicyDetails.PolicyEndDate}
                  options={{
                    altFormat: "d/m/Y",
                    dateFormat: "m/d/Y",
                    altInput: true,
                  }}
                  input={{
                    label: "Policy End Date",
                    value: PolicyDetails.PolicyEndDate,
                    required: true,
                    sx: redAsterisk,
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5}>
                <MDDatePicker
                  fullWidth
                  // label="Date of Loss"
                  name="dateOfLoss"
                  value={
                    claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails
                      .dateOfLoss
                  }
                  options={{
                    altFormat: "d/m/Y",
                    dateFormat: "m/d/Y",
                    altInput: true,
                    maxDate: PolicyDetails.PolicyEndDate,
                    minDate: PolicyDetails.PolicyStartDate,
                  }}
                  input={{
                    label: "Date of Loss",
                    value:
                      claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails
                        .dateOfLoss,
                    required: true,
                    sx: redAsterisk,
                  }}
                  onChange={(e, d) => handleDate(e, d, "dateOfLoss")}
                  required
                  renderInput={(params) => (
                    <MDInput
                      label="Date of Loss"
                      {...params}
                      error={
                        Object.values(
                          claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo
                            .claimDetails.dateOfLoss || {}
                        ).every((a) => a === "" || a === null)
                          ? flag.ErrorFlag
                          : null
                      }
                      sx={redAsterisk}
                    />
                  )}
                />
                {flag.ErrorFlag &&
                Object.values(
                  claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails
                    .dateOfLoss || {}
                ).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the required field
                  </MDTypography>
                ) : null}
              </Grid>
            </Grid>
            {/* <Card> */}
            <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
              <Grid item xs={12} sm={12} md={3.2} lg={3.2} xl={3.2} xxl={3.2}>
                <MDTypography variant="h7" color="primary">
                  Endorsement/Renewal Numbers
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                xl={3}
                xxl={3}
                style={{ marginTop: "-15px" }}
              >
                <MDButton
                  variant="contained"
                  onClick={handlePreview}
                  disabled={flag.Previewbutton === false}
                  sx={{ marginTop: previewIndex }}
                >
                  Preview
                </MDButton>
              </Grid>
            </Grid>

            <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
              <Box
                textAlign="center"
                sx={{
                  mb: 1,
                  mx: 1,
                  // mt: -3,
                  width: 420,
                  py: 1,
                  display: "flex",
                  flexDirection: "column",
                  variant: "gradient",
                  bgColor: "info",
                  borderRadius: "lg",
                  coloredShadow: "success",
                  overflow: "hidden",
                  overflowY: "scroll",
                  border: "2px solid grey",
                }}
              >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {flag.policyNumber === true && (
                    <Grid>
                      <Chip
                        // sx={{ fontSize: "14px", background: "#e3f2fd" }}
                        label={PolicyDetails.PolicyNumber}
                        onClick={handlePolicyNo}
                        disabled={flag.PolicyNodisable === true}
                        sx={{ backgroundColor: clickedChipId === 5 ? "#4d94ff" : undefined }}
                      />
                    </Grid>
                  )}
                  {newData.map((x, id) => (
                    <Grid key={`${x.endoPolicyNo}-${x.policyNo}`}>
                      <Chip
                        label={x.EndoPolicyNo}
                        onClick={(param) => handleEnoPolicyNo(id, param)}
                        disabled={disabledd.length > 0 && disabledd[id].enabled === false}
                        sx={{ backgroundColor: clickedChipId === id ? "#4d94ff" : undefined }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            {/* </Card> */}
          </>
        )}
        {flag.RIvalidationflag === true && (
          <Grid container spacing={2} p={2} justifyContent="left">
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="RI Email"
                name="RIEmail"
                onChange={(e) => handleChange(e, "RIEmail")}
                onBlur={handleonBlur}
                value={claimdetails.transactionDataDTO[0].transactionDetails.RIDetails.RIEmail}
              />
              {flag.EmailError === true &&
              claimdetails.transactionDataDTO[0].transactionDetails.RIDetails.RIEmail !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  Enter Valid Email ID
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} style={{ marginLeft: "1rem" }}>
              <MDButton
                sx={{ justifyContent: "right" }}
                variant="contained"
                onClick={handleSendEmail}
                disabled={flag.EmailError === true || flag.RIEmailbutton === false}
              >
                Send E-Mail
              </MDButton>
            </Grid>
          </Grid>
        )}
        {serachpreview === true && (
          <>
            {flag.PolicyNumberflag === true && (
              <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={1}>
                <Card
                  sx={{
                    background: "#e3f2fd",
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    width: "100%",
                    //   marginTop: "-20rem",
                  }}
                >
                  <Grid container spacing={3} p={2} direction="row">
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b> Policy Number:</b> {PolicyDetails.PolicyNumber}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Renewal/Endorsement Number:</b>
                        <h7 style={{ marginLeft: "5px" }}>N/A</h7>
                        <br />
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Policy Status:</b>
                        <h7 style={{ marginLeft: "5px" }}> {creditedStatus[0].status}</h7>

                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>VAT Invoice Number:</b>
                        <h7 style={{ marginLeft: "5px" }}>{PolicyDetails.TaxInvoiceNo}</h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Receipt Number:</b>
                        <h7 style={{ marginLeft: "5px" }}>{PolicyDetails.ReceiptNo} </h7> <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Receipt Date:</b>
                        <h7 style={{ marginLeft: "5px" }}> {creditedStatus[0].PolicyIssuedDate}</h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Gross Sum Insured:</b>
                        <h7 style={{ marginLeft: "5px" }}>
                          {PolicyDetails.PremiumDetails.TotalSumInsured}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Endorsement Type:</b>
                        <h7 style={{ marginLeft: "5px" }}>N/A</h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Bank Deposit Date:</b>
                        <h7 style={{ marginLeft: "5px" }}>
                          {creditedStatus[0].DepositedDate}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Business Type:</b>
                        <h7 style={{ marginLeft: "5px" }}>{PolicyDetails.BusinessType}</h7> <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Policy Period:</b>
                        <h7 style={{ marginLeft: "5px" }}>
                          {DateFormateing(PolicyDetails.PolicyStartDate)} to{" "}
                          {DateFormateing(PolicyDetails.PolicyEndDate)}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>FO/Agent:</b>
                        <h7 style={{ marginLeft: "5px" }}>{creditedStatus[0].fieldOfficer}</h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b> Chassis Number:</b>
                        <h7 style={{ marginLeft: "5px" }}>
                          {PolicyDetails.InsurableItem[0].RiskItems[0].ChasisNo}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Vehicle Number:</b>
                        <h7 style={{ marginLeft: "5px" }}>
                          {" "}
                          {PolicyDetails.InsurableItem[0].RiskItems[0].VehicleNoEnglish}
                        </h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Inward Number:</b>
                        <h7 style={{ marginLeft: "5px" }}>N/A</h7> <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Department:</b>
                        <h7 style={{ marginLeft: "5px" }}> {PolicyDetails.Department} </h7> <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Insured Name:</b>
                        <h7 style={{ marginLeft: "5px" }}>
                          {" "}
                          {PolicyDetails.ProposerDetails.InsuredNameEnglish}{" "}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Engine Number:</b>
                        <h7 style={{ marginLeft: "5px" }}>
                          {" "}
                          {PolicyDetails.InsurableItem[0].RiskItems[0].EngineNo}{" "}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Net Premium:</b>
                        <h7 style={{ marginLeft: "5px" }}>
                          {" "}
                          {PolicyDetails.PremiumDetails.NetPremium}{" "}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )}
            <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={1}>
              {flag.EndorsementNumber === true && (
                <Card
                  sx={{
                    background: "#e3f2fd",
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    width: "100%",
                    //   marginTop: "-20rem",
                  }}
                >
                  <Grid container spacing={3} p={2} direction="row">
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b> Policy Number:</b>
                        <h7 style={{ marginLeft: "10px" }}>{EndoJson.PolicyNo}</h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b> Renewal/Endorsement Number:</b>
                        <h7 style={{ marginLeft: "5px" }}>
                          {" "}
                          {EndoJson.EndorsementDetails.EndoPolicyNo}
                        </h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Policy Status:</b>
                        <h7 style={{ marginLeft: "10px" }}>{creditedStatus[0].status}</h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>VAT Invoice Number:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {EndoJson.EndorsementDetails.TaxInvoiceNo}
                        </h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Receipt Number:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {EndoJson.EndorsementDetails.ReceiptNo}
                        </h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Receipt Date:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {" "}
                          {creditedStatus[0].PolicyIssuedDate}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Gross Sum Insured:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {EndoJson.EndorsementDetails.PremiumDetails.TotalSumInsured}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Endorsement Type:</b>
                        <h7 style={{ marginLeft: "10px" }}>{EndoJson.EndorsementType[0].mValue}</h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Bank Deposit Date</b>:
                        <h7 style={{ marginLeft: "10px" }}>{creditedStatus[0].DepositedDate}</h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Business Type:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {EndoJson.EndorsementDetails.BusinessType}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Policy Period:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {DateFormateing(EndoJson.EndorsementDetails.PolicyStartDate)} to{" "}
                          {DateFormateing(EndoJson.EndorsementDetails.PolicyEndDate)}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>FO/Agent:</b>
                        <h7 style={{ marginLeft: "10px" }}>{creditedStatus[0].fieldOfficer}</h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Chassis Number:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {EndoJson.EndorsementDetails.InsurableItem[0].RiskItems[0].ChasisNo}
                        </h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Vehicle Number:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {
                            EndoJson.EndorsementDetails.InsurableItem[0].RiskItems[0]
                              .VehicleNoEnglish
                          }
                        </h7>
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Inward Number:</b> <h7 style={{ marginLeft: "5px" }}>N/A</h7> <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Department:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {EndoJson.EndorsementDetails.Department}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Insured Name:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {EndoJson.EndorsementDetails.ProposerDetails.InsuredNameEnglish}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Engine Number:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {EndoJson.EndorsementDetails.InsurableItem[0].RiskItems[0].EngineNo}
                        </h7>
                        <br />
                      </MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} marginLeft="5rem">
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        <b>Net Premium:</b>
                        <h7 style={{ marginLeft: "10px" }}>
                          {EndoJson.EndorsementDetails.PremiumDetails.NetPremium}
                        </h7>{" "}
                        <br />
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              )}
            </Grid>
            {/* <Card sx={{ height: "100%", width: "100%" }}> */}
            <Grid container spacing={2} p={2} direction="row">
              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Box bgcolor="#f5f5f5" sx={{ width: "auto" }}>
                      <MDTypography style={{ marginLeft: "1rem" }}>Document No.</MDTypography>
                    </Box>
                  </Grid> */}
              {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Box bgcolor="#f5f5f5" sx={{ width: "auto" }}>
                  <MDTypography style={{ height: "2.6rem" }}>Claim/Treaty Type</MDTypography>
                </Box>
              </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Box bgcolor="#f5f5f5" sx={{ width: "auto" }} />
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  name="TreatyType"
                  options={TreatyTypes}
                  getOptionLabel={(option) => option.mValue}
                  onChange={(event, value) => handleAutocomplete(event, value, "TreatyType")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Treaty Type"
                      sx={redAsterisk}
                      required
                      error={
                        Object.values(
                          claimdetails.transactionDataDTO[0].transactionDetails.TreatyType || {}
                        ).every((x) => x === "" || x === null)
                          ? flag.ErrorFlag
                          : null
                      }
                    />
                  )}
                />
                {flag.ErrorFlag &&
                Object.values(
                  claimdetails.transactionDataDTO[0].transactionDetails.TreatyType || {}
                ).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Box bgcolor="#f5f5f5" sx={{ width: "auto" }} />
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  name="branch"
                  options={claimBranch}
                  getOptionLabel={(option) => option.mValue}
                  onChange={(event, value) => handleAutocomplete(event, value, "branch")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={redAsterisk}
                      label="Intimation Branch"
                      required
                      error={
                        Object.values(
                          claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo
                            .claimDetails.branch || {}
                        ).every((x) => x === "" || x === null)
                          ? flag.ErrorFlag
                          : null
                      }
                    />
                  )}
                />
                {flag.ErrorFlag &&
                Object.values(
                  claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails
                    .branch || {}
                ).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the required field
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              {claimsubBranch.length >= 1 && (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Box bgcolor="#f5f5f5" sx={{ width: "auto" }} />
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    name="subBranch"
                    options={claimsubBranch}
                    value={{
                      mValue:
                        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo
                          .claimDetails.subBranch,
                    }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(event, value) => handleAutocomplete(event, value, "subBranch")}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        sx={redAsterisk}
                        required
                        label="Intimation Sub Branch"
                        error={
                          Object.values(
                            claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo
                              .claimDetails.subBranch || {}
                          ).every((x) => x === "" || x === null)
                            ? flag.ErrorFlag
                            : null
                        }
                      />
                    )}
                  />
                  {flag.ErrorFlag &&
                  Object.values(
                    claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails
                      .subBranch || {}
                  ).every((x) => x === null || x === "") ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                </Grid>
              )}
              {claimsubBranch.length === 0 && (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Box bgcolor="#f5f5f5" sx={{ width: "auto" }} />
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    name="subBranch"
                    options={[]}
                    value={{
                      mValue:
                        claimdetails.transactionDataDTO[0].transactionDetails.ClaimsInfo
                          .claimDetails.subBranch,
                    }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(event, value) => handleAutocomplete(event, value, "subBranch")}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        sx={redAsterisk}
                        required
                        label="Intimation Sub Branch"
                        disabled
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
            {/* </Card> */}

            <Paper>
              <Tabs
                value={tabValue}
                onChange={handleSetTabValue}
                textColor="primary"
                indicatorColor="primary"
                style={{ background: "white", width: "76rem" }}
              >
                <Tab label="Risk Break Up" onClick={handleRiskBreakdown} />
                <Tab label="Treaty Breakdown" onClick={handleTreatyBreakdown} />
                <Tab label="Description/Warranties" onClick={handleWarranties} />
                <Tab label="Claim History" onClick={handleClaimHistory} />
                <Tab label="Pending Deposit" onClick={handlePendingDeposit} />
              </Tabs>
              <Grid>
                {flag.RiskBreakdown === true && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={RiskData}
                        columns={columns}
                        pageSize={pageSize2}
                        onPageSizeChange={(params) => handlePageSizeChange(params)}
                        onPageChange={(params) => handlePageChange(params)}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        pagination
                        initialState={{
                          ...RiskData,
                          pagination: {
                            ...RiskData.initialState?.pagination,
                            paginationModel: { pageSize: pageSize2, page: currentPage },
                          },
                        }}
                      />
                      {selectedId === "" && (
                        <div style={divStyle}>
                          <button
                            type="button"
                            disabled={currentPage <= 1}
                            onClick={(e) => handlePageChange(e, currentPage - 1)}
                          >
                            Previous Page
                          </button>
                          <button
                            type="button"
                            disabled={tableRows.length < pageSize2}
                            onClick={(e) => handlePageChange(e, currentPage + 1)}
                          >
                            Next Page
                          </button>
                        </div>
                      )}
                    </Box>
                  </Grid>
                )}
                {flag.Treatbreakdown === true && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={newData1}
                        columns={columns1}
                        pageSize={pageSize2}
                        onPageSizeChange={(params) => handlePageSizeChange(params)}
                        onPageChange={(params) => handlePageChange(params)}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        pagination
                        initialState={{
                          ...newData1,
                          pagination: {
                            ...newData1.initialState?.pagination,
                            paginationModel: { pageSize: pageSize2, page: currentPage },
                          },
                        }}
                      />
                      {selectedId === "" && (
                        <div style={divStyle}>
                          <button
                            type="button"
                            disabled={currentPage <= 1}
                            onClick={(e) => handlePageChange(e, currentPage - 1)}
                          >
                            Previous Page
                          </button>
                          <button
                            type="button"
                            disabled={tableRows.length < pageSize2}
                            onClick={(e) => handlePageChange(e, currentPage + 1)}
                          >
                            Next Page
                          </button>
                        </div>
                      )}
                    </Box>
                  </Grid>
                )}
                {flag.Warranties === true && (
                  <Grid p={2} spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                      />
                      {/* <textarea
                          style={{
                            width: "100%",
                            height: "10rem",
                          }}
                          area-label="Description"
                          multiline
                        /> */}
                    </Grid>
                    <b />
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {/* <MDTypography>
                          <b>Warranties</b>
                        </MDTypography> */}
                      {/* <textarea
                          style={{ height: "10rem", width: "100%" }}
                          area-label="Warranties"
                          multiline
                        /> */}
                      <TextField
                        id="outlined-multiline-static"
                        label="Warranties"
                        sx={{ marginTop: "1rem" }}
                        multiline
                        rows={4}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                )}
                {flag.claimhistory === true && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rows2}
                        columns={columns2}
                        pageSize={pageSize2}
                        onPageSizeChange={(params) => handlePageSizeChange(params)}
                        onPageChange={(params) => handlePageChange(params)}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        pagination
                        initialState={{
                          ...rows2,
                          pagination: {
                            ...rows2.initialState?.pagination,
                            paginationModel: { pageSize: pageSize2, page: currentPage },
                          },
                        }}
                      />
                      {selectedId === "" && (
                        <div style={divStyle}>
                          <button
                            type="button"
                            disabled={currentPage <= 1}
                            onClick={(e) => handlePageChange(e, currentPage - 1)}
                          >
                            Previous Page
                          </button>
                          <button
                            type="button"
                            disabled={tableRows.length < pageSize2}
                            onClick={(e) => handlePageChange(e, currentPage + 1)}
                          >
                            Next Page
                          </button>
                        </div>
                      )}
                    </Box>
                  </Grid>
                )}
                {flag.PendingDeposite === true && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={PendingData}
                        columns={columns3}
                        pageSize={pageSize2}
                        onPageSizeChange={(params) => handlePageSizeChange(params)}
                        onPageChange={(params) => handlePageChange(params)}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        pagination
                        initialState={{
                          ...PendingData,
                          pagination: {
                            ...PendingData.initialState?.pagination,
                            paginationModel: { pageSize: pageSize2, page: currentPage },
                          },
                        }}
                      />
                      {selectedId === "" && (
                        <div style={divStyle}>
                          <button
                            type="button"
                            disabled={currentPage <= 1}
                            onClick={(e) => handlePageChange(e, currentPage - 1)}
                          >
                            Previous Page
                          </button>
                          <button
                            type="button"
                            disabled={tableRows.length < pageSize2}
                            onClick={(e) => handlePageChange(e, currentPage + 1)}
                          >
                            Next Page
                          </button>
                        </div>
                      )}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>
            <Grid container spacing={2} p={2} justifyContent="left">
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput label="Claim Form" name="ClaimForm" />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
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
                  <MDButton color="primary" component="span">
                    UPLOAD
                  </MDButton>
                </label>
              </Grid>

              {upload.fileName !== "" ? (
                <>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    {upload && <p>{upload.fileName}</p>}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={1}
                    lg={1}
                    xl={1}
                    xxl={1}
                    style={{ marginTop: "-8px" }}
                  >
                    <IconButton onClick={handleDeleteupload}>
                      <CancelIcon fontSize="large" color="error" />
                    </IconButton>
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Grid container justifyContent="right" alignItems="right" p={2}>
              <MDButton color="primary" onClick={() => onClaimSave()} sx={{ ml: "2rem" }}>
                SUBMIT
              </MDButton>
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
}
export default ClaimIntimation;
