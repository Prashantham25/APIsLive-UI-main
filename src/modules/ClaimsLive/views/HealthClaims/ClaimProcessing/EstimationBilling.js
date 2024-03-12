import { useEffect, useState } from "react";
import {
  Grid,
  Accordion,
  // FormControlLabel,
  // RadioGroup,
  // Radio,
  AccordionDetails,
  AccordionSummary,
  // Stack,
  Autocomplete,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import { useDataController, setTravelClaimJson } from "modules/BrokerPortal/context";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDDatePicker from "../../../../../components/MDDatePicker";
import Validation from "./Validation";
import {
  GenericApi,
  SaveClaimDataDetails,
  // GetProductByCode,
  // GetProductAPI,
  GetPolicyInfoByPolicyNumber,
  // GetPolicyBenefitList,
  UpdateClaimBankAccounts,
} from "../data/index";

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

function EstimationBilling({ setContent }) {
  const [controller, dispatch] = useDataController();
  const { TravelClaimJson, TravelEnquiryFlag } = controller;
  const [ClaimObj, setClaimObj] = useState(TravelClaimJson);

  const [billType, setBillType] = useState("Lumpsum");

  const [Flag, setFlag] = useState(false);
  const [backdropLoader, setBackdropLoader] = useState(false);

  const [BillDetailsRow, setBillDetailsRow] = useState([]);
  const [AmountDetailsRow, setAmountDetailsRow] = useState([]);
  const [BillDetailsRowID, setBillDetailsRowID] = useState(0);
  const [AmountDetailsRowID, setAmountDetailsRowID] = useState(0);

  const [CalculatedData, setCalculatedData] = useState({});
  const [label, setLabel] = useState("");
  const [claimedAmount, setClaimedAmount] = useState("");

  const [TotalEstimatedAmount, setTotalEstimatedAmount] = useState(0);
  const [benefit] = useState({ BenefitCriteria: "" });
  // const [ApprovedAmount, setApprovedAmount] = useState(0);
  const [ApiName] = useState("HDFCClaimsCalculatorAPI");
  // const [plan, setPlan] = useState("");
  // const [si, setSI] = useState("");
  const [onSaveFlag, setOnSaveFlag] = useState(false);
  const [PolicyBenefit, setPolicyBenefit] = useState([]);

  const [benefitDetails, setbenefitDetails] = useState({
    approvedClaimAmount: "",
    benefit: "",
    billing: [],
    billingDetails: [],
    calculatedClaimAmount: "",
    claimValue: "",
    claimedAmount: "",
    createdDateTime: "",
    deductible: "",
    isLumpSum: "",
    isValid: true,
    remarks: "",
  });
  console.log("benefitDetails", benefitDetails);

  // param.api.getRowIndex(param.row.id)

  const onBillDetails = ({ e, param }) => {
    console.log("BillDetailsRow", BillDetailsRow);
    const index = param.api.getRowIndex(param.row.id);

    // const filteredData = { ...BillDetailsRow[index] };
    // filteredData[e.target.name] = e.target.value;
    // console.log("index", index);
    // console.log("filteredData", filteredData);
    // BillDetailsRow.splice(index, 1, { ...filteredData });
    // setBillDetailsRow([...BillDetailsRow]);
    const name = [e.target.name];
    BillDetailsRow[index][name] = e.target.value;
    setBillDetailsRow([...BillDetailsRow]);
  };

  const onDateHandle = (e, date, param) => {
    console.log("BillDetailsRow", BillDetailsRow);
    const index = param.api.getRowIndex(param.row.id);

    const name = "billDate";
    BillDetailsRow[index][name] = formatDate(new Date(date));
    setBillDetailsRow([...BillDetailsRow]);
  };

  const onAmountDetails = ({ e, param }) => {
    console.log("AmountDetailsRow", AmountDetailsRow);
    const index = param.api.getRowIndex(param.row.id);
    const name = [e.target.name];
    console.log(name);
    AmountDetailsRow[index][name] = e.target.value;

    if (name[0] === "rate" || name[0] === "quantity") {
      console.log("aa");
      const estAmt = "estimatedAmount";
      const quantity = "quantity";
      const rate = "rate";
      const discount = "billDiscount";
      const data1 =
        parseInt(AmountDetailsRow[index][quantity], 10) *
        parseInt(AmountDetailsRow[index][rate], 10);
      const data2 = parseInt(data1, 10) * parseInt(AmountDetailsRow[index][discount], 10) * 0.01;
      const data3 = parseInt(data1, 10) - parseInt(data2, 10);
      AmountDetailsRow[index][estAmt] = data3;
    }

    if (name[0] === "approvedAmount") {
      console.log("bb");
      const estAmt = "estimatedAmount";
      const appAmt = "approvedAmount";
      const deduAmt = "deduction";
      AmountDetailsRow[index][deduAmt] =
        parseInt(AmountDetailsRow[index][estAmt], 10) -
        parseInt(AmountDetailsRow[index][appAmt], 10);
    }

    setAmountDetailsRow([...AmountDetailsRow]);
  };

  const onAutoChange = (e, param, newValue) => {
    console.log("AmountDetailsRow", AmountDetailsRow);
    const index = param.api.getRowIndex(param.row.id);
    const name = "billNo";
    const name1 = "billDiscount";
    AmountDetailsRow[index][name] = newValue.billNo;
    AmountDetailsRow[index][name1] = newValue.billDiscount;
    setAmountDetailsRow([...AmountDetailsRow]);
  };

  const BillDetailsTablecolumns = [
    {
      field: "billNo",
      headerName: "Bill No",
      width: 250,
      // editable: true,
      renderCell: (param) => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="billNo"
          value={param.row.billNo}
          onChange={(e) => {
            onBillDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "billDate",
      headerName: "Bill Date",
      width: 250,
      renderCell: (param) => (
        <MDDatePicker
          input={{ disabled: TravelEnquiryFlag }}
          name="billDate"
          value={param.row.billDate}
          onChange={(e, date) => onDateHandle(e, date, param)}
          options={{
            dateFormat: "Y/m/d",
            altFormat: "Y/m/d",
            altInput: true,
          }}
        />
      ),
    },

    {
      field: "billDiscount",
      headerName: "Bill Discount",
      width: 250,
      renderCell: (param) => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="billDiscount"
          value={param.row.billDiscount}
          onChange={(e) => {
            onBillDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = BillDetailsRow.filter((row) => row.id !== param.id);
          setBillDetailsRow([...newArray]);
          console.log("BillDetailsRow", BillDetailsRow);
        };
        return (
          <IconButton onClick={deleteRow} disabled={TravelEnquiryFlag}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const AmountDetailsTablecolumns = [
    {
      field: "billNo",
      headerName: "Bill No",
      width: 250,
      renderCell: (param) => (
        <Autocomplete
          disabled={TravelEnquiryFlag}
          fullWidth
          value={{ billNo: param.row.billNo }}
          options={BillDetailsRow}
          getOptionLabel={(option) => option.billNo}
          onChange={(e, newValue) => {
            onAutoChange(e, param, newValue);
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => <MDInput {...params} />}
        />
      ),
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 250,
      renderCell: (param) => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="quantity"
          value={param.row.quantity}
          onChange={(e) => {
            onAmountDetails({ e, param });
          }}
        />
      ),
    },

    {
      field: "category",
      headerName: "Category",
      width: 250,
      renderCell: (param) => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="category"
          value={param.row.category}
          onChange={(e) => {
            onAmountDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "billDescription",
      headerName: "Bill Description",
      width: 250,
      renderCell: (param) => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="billDescription"
          value={param.row.billDescription}
          onChange={(e) => {
            onAmountDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "rate",
      headerName: "Rate(Amount)",
      width: 250,
      renderCell: (param) => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="rate"
          value={param.row.rate}
          onChange={(e) => {
            onAmountDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "estimatedAmount",
      headerName: "Estimated Amount",
      width: 250,
      renderCell: (param) => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="estimatedAmount"
          value={param.row.estimatedAmount}
        />
      ),
    },
    {
      field: "approvedAmount",
      headerName: "Approved Amount",
      width: 250,
      renderCell: (param) => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="approvedAmount"
          value={param.row.approvedAmount}
          onChange={(e) => {
            onAmountDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "deduction",
      headerName: "Deducted Amount",
      width: 250,
      renderCell: (param) => (
        <MDInput disabled={TravelEnquiryFlag} name="deduction" value={param.row.deduction} />
      ),
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 250,
      renderCell: (param) => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="remarks"
          value={param.row.remarks}
          onChange={(e) => {
            onAmountDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = AmountDetailsRow.filter((row) => row.id !== param.id);
          setAmountDetailsRow([...newArray]);
          console.log("param.id", param);
          console.log("AmountDetailsRow", AmountDetailsRow);
        };
        return (
          <IconButton onClick={deleteRow} disabled={TravelEnquiryFlag}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  // const onBillType = async (e) => {
  //   setClaimedAmount("");

  //   setBillType(e.target.value);

  //   setFlag(false);
  // };

  // const getGenericApi = async () => {
  //   // const ApiName = "APACCalculateClaimAmount";
  //   // const SearchObj = {
  //   //   TransactionID: 0,
  //   //   ClaimID: 0,
  //   //   SI: "100000",
  //   //   Plan: "Plan1",
  //   //   ClaimNo: ClaimObj.claimNumber,
  //   //   WorkItemNo: "",
  //   //   WorkItemID: 0,
  //   //   ClaimType: 0,
  //   //   MemberId: ClaimObj.basicDetails.memberDetails.memberId,
  //   //   PolicyNo: ClaimObj.policyNo,
  //   //   ClaimSubType: 0,
  //   //   BenefitDetails: [
  //   //     {
  //   //       Benefit: ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss,
  //   //       ClaimedAmount: claimedAmount,
  //   //       ClaimValue: "",
  //   //       CalculatedClaimAmount: "",
  //   //       ApprovedClaimAmount: "",
  //   //       deductible: "",
  //   //       billing: [],
  //   //       billingDetails: [],
  //   //     },
  //   //   ],
  //   // };
  // };

  const Calculate = async () => {
    setFlag(false);

    const CauseOfLoss = ClaimObj.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss;
    const TypeOfLoss = ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss;
    const ProductCode = ClaimObj.basicDetails.productCode;

    const SearchObj = {
      // TransactionID: TravelClaimJson.claimTransactionDTO[0].transactionId,
      // ClaimID: TravelClaimJson.claimTransactionDTO[0].claimId,
      // SI: si,
      // Plan: plan,
      // ClaimNo: ClaimObj.claimNumber,
      // WorkItemNo: "",
      // WorkItemID: 0,
      // ClaimType: TravelClaimJson.claimTransactionDTO[0].transactionDetailsDto.claimCategory,
      // MemberId: ClaimObj.basicDetails.memberDetails.memberId,
      // PolicyNo: ClaimObj.policyNo,
      // ClaimSubType: TravelClaimJson.claimTransactionDTO[0].transactionDetailsDto.claimSubType,
      // BenefitDetails: [
      //   {
      //     Benefit: ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss,
      //     ClaimedAmount: claimedAmount,
      //     ClaimValue: "",
      //     CalculatedClaimAmount: "",
      //     ApprovedClaimAmount: "",
      //     deductible: "",
      //     billing: BillDetailsRow,
      //     billingDetails: AmountDetailsRow,
      //   },
      // ],

      BenefitValue: 0,
      ClaimedAmount: claimedAmount,
      BCount: "1",
      WaitingPeriod: 0,
    };

    PolicyBenefit.forEach((r) => {
      if (r.CoverId === CauseOfLoss)
        r.BenefitDetails.forEach((q) => {
          if (q.BenefitCode === TypeOfLoss) SearchObj.WaitingPeriod = q.WaitingPeriod;
          SearchObj.BenefitValue = q.SI;
        });
    });

    if (billType === "Lumpsum") {
      if (claimedAmount === "") {
        if (TypeOfLoss !== "9" && TypeOfLoss !== "19" && TypeOfLoss !== "41") {
          swal({
            html: true,
            icon: "error",
            text: "Enter Claimed Amount.",
          });
        } else if (TypeOfLoss === "9" || TypeOfLoss === "41") {
          swal({
            html: true,
            icon: "error",
            text: "Enter Claimed Hours of delay.",
          });
        } else if (TypeOfLoss === "19") {
          swal({
            html: true,
            icon: "error",
            text: "Enter Claimed No of Days.",
          });
        }
      } else {
        const result = await GenericApi({ ProductCode, ApiName, SearchObj });
        if (result.status === 0) {
          swal({ icon: "error", text: "Something went wrong!\nTry again" });
        } else {
          console.log("GenericApi", result);
          setCalculatedData({ ...result.finalResult });
          setbenefitDetails({
            ...benefitDetails,
            calculatedClaimAmount: result.finalResult.CalcClaimAmount,
            deductible: 0,
          });

          console.log(Flag);
          setFlag(true);
        }
      }
    }
    if (billType === "Breakup") {
      let estAmt = 0;
      let appAmt = 0;
      AmountDetailsRow.forEach((row) => {
        estAmt += parseInt(row.estimatedAmount, 10);
        appAmt += parseInt(row.approvedAmount, 10);
      });
      setTotalEstimatedAmount(estAmt);
      setClaimedAmount(appAmt.toString());
      SearchObj.BenefitDetails[0].ClaimedAmount = appAmt.toString();
      // setApprovedAmount(appAmt);
      console.log("appAmt", appAmt);

      const result = await GenericApi({ ProductCode, ApiName, SearchObj });
      setCalculatedData({ ...result.finalResult.NBClaimsCalculatorV1.output[0] });
      setbenefitDetails({
        ...benefitDetails,
        calculatedClaimAmount: result.finalResult.NBClaimsCalculatorV1.output[0].CalClaimAmount,
        deductible: result.finalResult.NBClaimsCalculatorV1.output[0].Deductible,
      });
      console.log("GenericApi", result);
      console.log(Flag);

      setFlag(true);
    }
  };

  // const Calculate = async () => {
  //   // await getGenericApi();
  //   const TypeOfLoss = ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss;
  //   if (claimedAmount === "") {
  //     if (TypeOfLoss !== "9" && TypeOfLoss !== "19" && TypeOfLoss !== "41") {
  //       swal({
  //         html: true,
  //         icon: "error",
  //         text: "Enter Claimed Amount.",
  //       });
  //     } else if (TypeOfLoss === "9" || TypeOfLoss === "41") {
  //       swal({
  //         html: true,
  //         icon: "error",
  //         text: "Enter Claimed Hours of delay.",
  //       });
  //     } else if (TypeOfLoss === "19") {
  //       swal({
  //         html: true,
  //         icon: "error",
  //         text: "Enter Claimed No of Days.",
  //       });
  //     }
  //   } else {
  //     const ProductCode = ClaimObj.basicDetails.productCode;

  //     const SearchObj = {
  //       TransactionID: 0,
  //       ClaimID: 0,
  //       SI: si,
  //       Plan: plan,
  //       ClaimNo: ClaimObj.claimNumber,
  //       WorkItemNo: "",
  //       WorkItemID: 0,
  //       ClaimType: 0,
  //       MemberId: ClaimObj.basicDetails.memberDetails.memberId,
  //       PolicyNo: ClaimObj.policyNo,
  //       ClaimSubType: 0,
  //       BenefitDetails: [
  //         {
  //           Benefit: ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss,
  //           ClaimedAmount: claimedAmount,
  //           ClaimValue: "",
  //           CalculatedClaimAmount: "",
  //           ApprovedClaimAmount: "",
  //           deductible: "",
  //           billing: BillDetailsRow,
  //           billingDetails: AmountDetailsRow,
  //         },
  //       ],
  //     };

  //     const result = await GenericApi({ ProductCode, ApiName, SearchObj });
  //     setCalculatedData({ ...result.finalResult.NBClaimsCalculatorV1.output[0] });
  //     console.log("GenericApi", result);
  //     console.log(Flag);
  //     setFlag(true);
  //   }
  // };

  // const BreakupCalculate = async () => {
  //   let estAmt = 0;
  //   let appAmt = 0;
  //   AmountDetailsRow.forEach((row) => {
  //     estAmt += parseInt(row.estimatedAmount, 10);
  //     appAmt += parseInt(row.approvedAmount, 10);
  //   });
  //   setTotalEstimatedAmount(estAmt);
  //   setClaimedAmount(appAmt.toString());
  //   setClaimedAmount(appAmt.toString());
  //   // setApprovedAmount(appAmt);
  //   console.log("appAmt", appAmt);

  //   const ProductCode = ClaimObj.basicDetails.productCode;

  //   const SearchObj = {
  //     TransactionID: 0,
  //     ClaimID: 0,
  //     SI: si,
  //     Plan: plan,
  //     ClaimNo: ClaimObj.claimNumber,
  //     WorkItemNo: "",
  //     WorkItemID: 0,
  //     ClaimType: 0,
  //     MemberId: ClaimObj.basicDetails.memberDetails.memberId,
  //     PolicyNo: ClaimObj.policyNo,
  //     ClaimSubType: 0,
  //     BenefitDetails: [
  //       {
  //         Benefit: ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss,
  //         ClaimedAmount: claimedAmount,
  //         ClaimValue: "",
  //         CalculatedClaimAmount: "",
  //         ApprovedClaimAmount: "",
  //         deductible: "",
  //         billing: BillDetailsRow,
  //         billingDetails: AmountDetailsRow,
  //       },
  //     ],
  //   };
  //   const result = await GenericApi({ ProductCode, ApiName, SearchObj });
  //   setCalculatedData({ ...result.finalResult.NBClaimsCalculatorV1.output[0] });
  //   console.log("GenericApi", result);
  //   setFlag(true);
  // };

  const AddBillDetailsRow = () => {
    setBillDetailsRow([
      ...BillDetailsRow,
      { id: BillDetailsRowID + 1, billNo: "", billDate: "", billDiscount: "" },
    ]);
    setBillDetailsRowID(BillDetailsRowID + 1);
  };

  const AddAmountDetailsRow = () => {
    if (BillDetailsRow.length === 0) {
      swal({
        html: true,
        icon: "error",
        title: "Please add atleast 1 row in Bill Details",
      });
      setAmountDetailsRow([]);
    } else {
      setAmountDetailsRow([
        ...AmountDetailsRow,
        {
          id: AmountDetailsRowID + 1,
          billNo: "",
          billDiscount: "",
          quantity: "",
          category: "",
          billDescription: "",
          rate: "",
          estimatedAmount: "",
          approvedAmount: "",
          deduction: "",
          remarks: "",
        },
      ]);
      setAmountDetailsRowID(AmountDetailsRowID + 1);
    }
  };

  useEffect(async () => {
    // setbenefitDetails(benefitDetails);
    //   setOnSaveFlag(true);
    if (ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails.length !== 0)
      if (ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0].isLumpSum !== "")
        setOnSaveFlag(true);
    const TypeOfLoss = ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss;
    if (TypeOfLoss !== "9" && TypeOfLoss !== "19" && TypeOfLoss !== "41") {
      setLabel("Claimed Amount");
    } else if (TypeOfLoss === "9" || TypeOfLoss === "41") {
      setLabel("Claimed Hours of delay");
    } else if (TypeOfLoss === "19") {
      setLabel("Claimed No of Days");
    } else {
      setLabel("");
    }
    const PolicyNumber = ClaimObj.policyNo;
    // const ProductCode = ClaimObj.basicDetails.productCode;

    // if (!TravelEnquiryFlag) {
    // const benefitResult = await GetPolicyBenefitList({ PolicyNumber });
    //   console.log("benifitResult", benefitResult);
    //   benefitResult.finalResult.sectionMappingDetails.BenefitDetails.forEach((item) => {
    //     if (item.BenefitId === ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss)
    //     ({ ...item });
    //   });
    // }

    // const r1 = await GetProductByCode({ ProductCode });
    // const ProductID = r1.productId;
    // const ActivityType = "HDFCClaimsDispatcher";

    // const r2 = await GetProductAPI({ ProductID, ActivityType });
    // r2.forEach((row) => {
    //   if (row.productId === ProductID) {
    //     setApiName(row.apiName);
    //   }
    // });

    const r3 = await GetPolicyInfoByPolicyNumber(PolicyNumber);
    console.log(r3);
    // setSI(r3.policy_details[0].policyRequest.PlanSumInsured);
    // setPlan(r3.policy_details[0].policyRequest.PlanName);
    setPolicyBenefit(r3.policy_details[0].policyRequest.BenefitDetails);
  }, []);

  const onTextChange = (e) => {
    setbenefitDetails({ ...benefitDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (TravelEnquiryFlag || onSaveFlag) {
      if (ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails.length > 0) {
        setbenefitDetails(ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0]);
        if (
          ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0].isLumpSum ===
          "Yes"
        ) {
          setBillType("Lumpsum");
          setClaimedAmount(
            ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0].claimedAmount
          );
          setFlag(true);
        } else {
          setBillType("Breakup");

          const name = "id";
          let estAmt = 0;
          let appAmt = 0;

          const arr1 = [
            ...ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0].billing,
          ];
          const arr2 = [
            ...ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0]
              .billingDetails,
          ];

          arr1.forEach((row, index) => {
            arr1[index][name] = index;
          });

          arr2.forEach((row, index) => {
            arr2[index][name] = index;
            estAmt += parseInt(row.estimatedAmount, 10);
            appAmt += parseInt(row.approvedAmount, 10);
          });

          console.log(arr1, 1111);
          console.log(arr2, 2222);

          setBillDetailsRow([...arr1]);
          setAmountDetailsRow([...arr2]);
          setTotalEstimatedAmount(estAmt);
          setClaimedAmount(appAmt.toString());
          setFlag(true);
        }
      }
    }
  }, [onSaveFlag, TravelEnquiryFlag]);

  const onSave = async () => {
    // benefitDetails.approvedClaimAmount="";
    setBackdropLoader(true);
    benefitDetails.benefit = ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss;
    benefitDetails.calculatedClaimAmount = CalculatedData.CalcClaimAmount;
    benefitDetails.claimedAmount = claimedAmount;
    benefitDetails.deductible = 0; // CalculatedData.Deductible;
    benefitDetails.billing = BillDetailsRow;
    benefitDetails.billingDetails = AmountDetailsRow;
    if (billType === "Lumpsum") {
      benefitDetails.isLumpSum = "Yes";
    } else {
      benefitDetails.isLumpSum = "No";
    }
    // benefitDetails.remarks="";

    setbenefitDetails({ ...benefitDetails });

    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails = [{ ...benefitDetails }];
    setClaimObj({ ...ClaimObj });
    setTravelClaimJson(dispatch, { ...ClaimObj });
    const TravelClaimIntimation = ClaimObj;
    const Data = await SaveClaimDataDetails({ TravelClaimIntimation });
    console.log("onSave Response", Data);

    const ClaimId = ClaimObj.basicDetails.claimId;
    const TransactionId = ClaimObj.claimTransactionDTO[0].transactionId;
    await UpdateClaimBankAccounts({ ClaimId, TransactionId, ClaimObj });
    // const result = await SaveClaimHistory({ transactionNumber });
    setBackdropLoader(false);
    swal({
      html: true,
      icon: "success",
      title: "Bill Details Saved Successfully",
    });
    setOnSaveFlag(true);
    setContent(<Validation />);
  };

  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Billing Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Stack direction="row" justifyContent="space-between" alignItems="center">
            {/* <MDTypography variant="body2" fontWeight="regular">
              Choose the Billing Type
            </MDTypography> 
            <RadioGroup row value={billType} onChange={(e) => onBillType(e)}>
              <FormControlLabel
                value="Lumpsum"
                control={<Radio />}
                label="Lumpsum"
                disabled={TravelEnquiryFlag || onSaveFlag}
              />
              <FormControlLabel
                value="Breakup"
                control={<Radio />}
                label="Breakup"
                disabled={TravelEnquiryFlag || onSaveFlag}
              />
            </RadioGroup>
          </Stack> */}
          {billType === "Lumpsum" && (
            <MDBox>
              <MDTypography my={1}>LumpSum Billing Details</MDTypography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    disabled={TravelEnquiryFlag}
                    label={label}
                    name="ClaimedAmount"
                    value={claimedAmount}
                    onChange={(e) => setClaimedAmount(e.target.value)}
                  />
                </Grid>
                {!TravelEnquiryFlag && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDButton onClick={Calculate}>Calculate Amount</MDButton>
                  </Grid>
                )}
              </Grid>
              {Flag && (
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Calculated Benefit Amount"
                      value={benefitDetails.calculatedClaimAmount}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Deductibles"
                      value={benefitDetails.deductible}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Deductible Type"
                      value={benefit.BenefitCriteria}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Approved Amount"
                      name="approvedClaimAmount"
                      value={benefitDetails.approvedClaimAmount}
                      onChange={(e) => onTextChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Remarks"
                      name="remarks"
                      value={benefitDetails.remarks}
                      onChange={(e) => onTextChange(e)}
                    />
                  </Grid>
                </Grid>
              )}
            </MDBox>
          )}
        </AccordionDetails>
      </Accordion>

      {billType === "Breakup" && (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionDetails>
            <MDBox>
              <MDTypography my={1}>Breakup Billing Details</MDTypography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography>Bill Details</MDTypography>
                </Grid>
                {!TravelEnquiryFlag && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                      <MDButton onClick={AddBillDetailsRow}>ADD</MDButton>
                    </MDBox>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    autoHeight
                    rows={BillDetailsRow}
                    columns={BillDetailsTablecolumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    editField="inEdit"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography>Amount Details</MDTypography>
                </Grid>
                {!TravelEnquiryFlag && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                      <MDButton onClick={AddAmountDetailsRow}>ADD</MDButton>
                    </MDBox>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    autoHeight
                    rows={AmountDetailsRow}
                    columns={AmountDetailsTablecolumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    editField="inEdit"
                    // getRowId={(row) => row.action}
                    // onRowClick={(ids) => onHandelMemberDetails(ids)}
                    // (ids) => setWorkItemType((prev) => ({ ...prev, MemberID: ids.id }))
                  />
                </Grid>
                {!TravelEnquiryFlag && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                      <MDButton disabled={onSaveFlag} onClick={Calculate}>
                        CALCULATE AMOUNT
                      </MDButton>
                    </MDBox>
                  </Grid>
                )}
              </Grid>
              {Flag && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Total Estimated Amount"
                      value={TotalEstimatedAmount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Approved Amount"
                      value={claimedAmount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="System Calculated Amount"
                      value={benefitDetails.calculatedClaimAmount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Deducted Amount"
                      value={benefitDetails.deductible}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Deductible Type"
                      value={benefit.BenefitCriteria}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Final Paid Amount"
                      name="approvedClaimAmount"
                      value={benefitDetails.approvedClaimAmount}
                      onChange={(e) => onTextChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={TravelEnquiryFlag}
                      label="Remarks"
                      name="remarks"
                      value={benefitDetails.remarks}
                      onChange={(e) => onTextChange(e)}
                    />
                  </Grid>
                </Grid>
              )}
            </MDBox>
          </AccordionDetails>
        </Accordion>
      )}
      {!TravelEnquiryFlag && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={onSave}>SAVE</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      )}
      {backdropLoader && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropLoader}
        >
          <CircularProgress />
        </Backdrop>
      )}
    </MDBox>
  );
}
export default EstimationBilling;
