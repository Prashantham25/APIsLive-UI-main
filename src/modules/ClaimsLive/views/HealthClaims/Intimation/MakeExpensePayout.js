import React, { useState, useEffect } from "react";
import { Grid, Card, Autocomplete, Backdrop, Checkbox, IconButton } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useNavigate } from "react-router-dom";
import magmapayment from "assets/images/Magma/magmapayment.png";
import CircularProgress from "@mui/material/CircularProgress";
import CancelIcon from "@mui/icons-material/Cancel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import swal from "sweetalert";
import Swal from "sweetalert2";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";
import {
  UploadFiles,
  DeleteFile,
  getProdPartnermasterData,
  SaveClaimHistory,
  updateStageStatusIdByTno,
  UpdateClaimDetails,
  GetPaymentDetails,
  GenericApi,
} from "../data";
import { SearchClaimDetailsByClaimNo } from "../../GenericClaims/data";

function MakeExpensePayout() {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [res1, setResult] = useState({});
  const [SearchObj, SetSearchObj] = useState({ claimNo: "", Payout: "" });
  const [searchflag, setSearchFlag] = useState(false);
  const [titleflag, setTitleflag] = useState("");
  const [inputflag, setInputflag] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [disableFlag, setDisableFlag] = useState(false);
  const [claimstatus1, setClaimStatus] = useState([]);
  const [disableAuto, setDisableAuto] = useState(false);
  const [selectedvalue, setSeletedValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentflag, setDocumentFlag] = useState(false);
  const [payment, setPayment] = useState([]);
  const [disablecheck, setDisableCheck] = useState(false);
  const [disable, setDisabled] = useState(false);
  let selectedvalue1 = [];
  let expense = [];
  const [flags, setFlags] = useState({
    errorFlag: false,
    claimNoError: false,
    claimNoFlag: false,
    // ExpenseAmountFlag: false,
  });

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

  useEffect(() => {
    console.log("bhds", res1);
  }, [res1]);

  const handleSearch = async () => {
    // debugger;
    const dataByClaimNo = await SearchClaimDetailsByClaimNo(SearchObj.claimNo);
    const data = dataByClaimNo.finalResult;
    console.log("result", data);

    if (data === null) {
      setFlags((prev) => ({ ...prev, claimNoError: true }));
    } else {
      setResult(data);
      if (data.transactionDataDTO[0].transactionDetails.investigatorDetails.length === 0) {
        setDisableAuto(true);
      } else {
        setDisableAuto(false);
      }
      setInputflag(true);

      if (
        Array.isArray(data.transactionDataDTO[0].transactionDetails.investigatorDetails) &&
        data.transactionDataDTO[0].transactionDetails.investigatorDetails !== undefined
      ) {
        selectedvalue1 = data.transactionDataDTO[0].transactionDetails.investigatorDetails.map(
          (x2) => x2.claimDescription
        );
      }
      if (
        Array.isArray(data.transactionDataDTO[0].transactionDetails.expenseDetails) &&
        data.transactionDataDTO[0].transactionDetails.expenseDetails !== undefined
      ) {
        data.transactionDataDTO[0].transactionDetails.expenseDetails.map((x3) => {
          if (x3.ExpensePennydrop === "Yes") {
            setDisableCheck(true);
          }
          return true;
        });
      }
      const mvalue = selectedvalue1.map((value, mid) => ({
        mID: mid.toString(),
        mValue: value,
      }));
      setSeletedValue([...mvalue]);
      setSearchFlag(true);
      const data2 = { ProductId: 1022, MasterType: "ClaimStatus" };
      const dataa = await getProdPartnermasterData(data2.ProductId, data2.MasterType);
      if (dataa.status === 200) {
        dataa.data.filter((x) => {
          const abc = parseInt(x.mID, 10);
          if (abc === data.claimStatusId) {
            setClaimStatus(x.mValue);
          }
          return true;
        });
      }
    }
  };

  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  const [xyz, setXYZ] = useState({
    RawImage: [],
  });

  const [filename, setFilename] = useState();
  console.log("filename", filename);
  const UploadImage = async (file, id) => {
    setFilename(file.name);
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      console.log("result1", result);

      if (result.data[0].fileName !== "") {
        const docId = result.data[0].docid;
        const newUpload = [...documents];
        newUpload[id].docId = docId;
        setDocuments(newUpload);
        console.log("upload", documents);

        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result;
          const myArray = base64Image.split(",");
          const data = myArray[1];

          setXYZ({ ...xyz, RawImage: data });
          console.log("imagebinding", xyz);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleOtherFileUpload = (id, e) => {
    // debugger;
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only PDF, DOC, DOCX, PNG, JPG and JPEG files are allowed.",
      });
      return;
    }

    const newUpload = [...documents];
    newUpload[id].fileName = e.target.files[0].name;
    newUpload[id].UploadDocDate = new Date();
    setDocuments(newUpload);
    setDocumentFlag(true);
    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });

    UploadImage(e.target.files[0], id);
    // setResult((prev) => ({ ...prev, ...res1 }));
  };

  const handleRemoveRow = async (id) => {
    const res = await DeleteFile(documents[id].fileName);
    console.log("123", res);
    if (res.data.status === 5) {
      documents[id].docId = "";
      documents[id].UploadDocDate = "";
      documents[id].fileName = "";
      documents[id].UploadedBy = "";
      setDocuments([...documents]);
      console.log("delete", documents);
    }
  };

  const handleExp = (e, index) => {
    // debugger;
    if (e.target.name === "ExpenseAmount") {
      res1.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpenseAmount =
        e.target.value;
      const expenseAmount = parseFloat(
        res1.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpenseAmount
      );
      const calculateGstAmount = () => {
        const gstPercentage = 18;
        return (expenseAmount * gstPercentage) / 100;
      };
      const gstAmount = calculateGstAmount(e.target.value);
      res1.transactionDataDTO[0].transactionDetails.expenseDetails[index].GSTAmount = gstAmount;

      // setClaimsJson(dispatch, { ...res1 });
      const abc = expenseAmount + parseFloat(gstAmount);
      console.log("expenseamount", abc);
      res1.transactionDataDTO[0].transactionDetails.expenseDetails[index].TotalExpenseAmount = abc;
      if (
        res1.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpenseAmount === ""
      ) {
        res1.transactionDataDTO[0].transactionDetails.expenseDetails[index].GSTAmount = "";
        res1.transactionDataDTO[0].transactionDetails.expenseDetails[index].TotalExpenseAmount = "";
        setDisabled(true);
      } else {
        setDisabled(false);
      }
      setResult({ ...res1 });
    }
    if (e.target.name === "ExpensePennydrop" && e.target.checked === true) {
      res1.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpensePennydrop =
        e.target.value;
    }
    if (e.target.name === "ExpensePennydrop" && e.target.checked === false) {
      res1.transactionDataDTO[0].transactionDetails.expenseDetails[index].ExpensePennydrop = "";
    }
    // setClaimsJson(dispatch, { ...res1 });
    setResult({ ...res1 });
  };

  const navigate = useNavigate();
  const handleTrackClaims = () => {
    navigate(`/Claims/Home`, { state: { productCode: "MagmaHospiCash01" } });
  };
  const userNameId = localStorage.getItem("userId");

  // useEffect(() => {
  //   if (Array.isArray(res1.transactionDataDTO[0].transactionDetails.expenseDetails.length >= 1)) {
  //     res1.transactionDataDTO[0].transactionDetails.investigatorDetails.forEach((x, iddx) => {
  //       Paymentdata.payeeName =
  //         res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1 &&
  //         res1.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
  //           .VerifiedInvestigator === "Yes"
  //           ? x.InvestigatorName
  //           : "";
  //       Paymentdata.PayeeType =
  //         res1.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment;
  //       Paymentdata.slno =
  //         res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.length + 1;
  //       Paymentdata.UTRDate = "";
  //       Paymentdata.refNo = "NA";
  //       Paymentdata.paidAmount = "NA";
  //       Paymentdata.status = "NA";
  //       Paymentdata.remarks = "NA";
  //       Paymentdata.Approved =
  //         res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1 &&
  //         res1.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
  //           .VerifiedInvestigator === "Yes"
  //           ? res1.transactionDataDTO[0].transactionDetails.expenseDetails[iddx].ExpenseAmount
  //           : "";

  //       if (res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1) {
  //         Paymentdata.Payout = "Expense Payout";
  //       }
  //       res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails = [
  //         ...res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails,
  //         { ...Paymentdata },
  //       ];
  //       console.log("res1", res1);
  //     });
  //   }
  // }, [res1.transactionDataDTO[0].transactionDetails.expenseDetails]);

  const paymentdetails1 = [];
  const handleNext = async () => {
    // debugger;
    setLoading(true);
    if (res1.transactionDataDTO[0].transactionDetails.documentDetails !== "") {
      documents.forEach((x) => {
        if (x.fileName !== "") {
          res1.transactionDataDTO[0].transactionDetails.documentDetails.push(x);
          setDocuments(documents);
          setResult((prev) => ({ ...prev, ...res1 }));
        }
      });
    }
    if (res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.length === 0) {
      if (res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1) {
        // debugger;
        res1.transactionDataDTO[0].transactionDetails.investigatorDetails.forEach(
          async (x, iddx) => {
            Paymentdata.payeeName =
              res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1 &&
              res1.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
                .VerifiedInvestigator === "Yes"
                ? x.InvestigatorName
                : "";
            Paymentdata.PayeeType =
              res1.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment;
            Paymentdata.slno =
              res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.length + 1;
            Paymentdata.UTRDate = "";
            Paymentdata.refNo = "NA";
            Paymentdata.paidAmount = "NA";
            Paymentdata.status = "NA";
            Paymentdata.remarks = "NA";
            Paymentdata.Approved =
              res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1 &&
              res1.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
                .VerifiedInvestigator === "Yes"
                ? res1.transactionDataDTO[0].transactionDetails.expenseDetails[iddx]
                    .TotalExpenseAmount
                : "";

            if (res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1) {
              Paymentdata.Payout = "Expense Payout";
            }
            res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails = [
              ...res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails,
              { ...Paymentdata },
            ];

            console.log("res1", res1);

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
              res1.transactionDataDTO[0].transactionDetails.expenseDetails[iddx].TotalExpenseAmount;
            const formattedAmount = parseFloat(integerAmount).toFixed(2);

            // debugger;
            const APIRequest = {
              transferPaymentRequest: {
                subHeader: {
                  requestUUID: res1.claimNumber,
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
                      custUniqRef: res1.claimBasicDetails.memberDetails.memberId,
                      corpAccNum: "",
                      valueDate: today,
                      txnAmount: formattedAmount,
                      beneLEI: "",
                      // beneName: params.row.payeeName,
                      beneName: Paymentdata.payeeName,
                      // res1.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
                      //   .InvestigatorName,
                      // res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[iddx]
                      //   .payeeName,
                      beneCode: res1.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
                      beneAccNum:
                        res1.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
                      beneAcType: "",
                      beneAddr1: "",
                      beneAddr2: "",
                      beneAddr3: "",
                      beneCity:
                        res1.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
                      // transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity
                      beneState:
                        res1.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
                      benePincode:
                        res1.transactionDataDTO[0].transactionDetails.hospitalDetails
                          .hospitalPincode,
                      beneIfscCode:
                        res1.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
                      beneBankName:
                        res1.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
                      baseCode: "",
                      chequeNumber: "",
                      chequeDate: "",
                      payableLocation: "",
                      printLocation: "",
                      beneEmailAddr1: res1.claimBasicDetails.memberDetails.EmailId,
                      beneMobileNo: res1.claimBasicDetails.memberDetails.MobileNo,
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
            // debugger;
            console.log("Resultssss", Result);
            const result = await GetPaymentDetails(res1.claimNumber);
            // debugger;
            console.log("resultss", result);
            setPayment(result.data);
            result.data.finalResult.forEach((item, ids) => {
              // debugger;
              const GetPaymentDetailsResponse = JSON.parse(item.paymentRequest);
              console.log("GetPaymentDetailsResponse", GetPaymentDetailsResponse);
              console.log(
                "testing",
                GetPaymentDetailsResponse.TransferPaymentRequest.TransferPaymentRequestBodyEncrypted
                  .paymentDetails[0].beneName
              );
              GetPaymentDetailsResponse.TransferPaymentRequest.TransferPaymentRequestBodyEncrypted.paymentDetails.forEach(
                (xy) => {
                  // debugger;
                  if (
                    xy.beneName ===
                      res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[ids]
                        .payeeName &&
                    xy.txnAmount ===
                      parseFloat(
                        res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[ids]
                          .Approved
                      ).toFixed(2)
                  ) {
                    res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                      ids
                    ].paidAmount = item.paidAmount;
                    res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                      ids
                    ].Action = item.Action;
                    res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                      ids
                    ].refNo = item.refNo;
                    res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                      ids
                    ].remarks = item.remarks;
                    res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                      ids
                    ].status = item.status;
                    res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[
                      ids
                    ].UTRDate = item.createdDate;
                  }
                  setResult((prev) => ({ ...prev, ...res1 }));
                }
              );
            });
            //   });
            // }

            // console.log("paymen", payment);
            if (result.data.status === 1) {
              // debugger;
              const res2 = await UpdateClaimDetails(res1);
              if (res2.status === 1) {
                const save1 = await updateStageStatusIdByTno(
                  res2.finalResult.transactionDataDTO[0].transactionNumber,
                  res2.finalResult.claimStatusId
                );
                console.log("save1", save1);
                const data = {
                  TransactionNumber: res2.finalResult.transactionDataDTO[0].transactionNumber,
                  CreatedBy: userNameId,
                };
                await SaveClaimHistory(data);
                setLoading(false);
                Swal.fire({
                  html: `<img src=${magmapayment} alt="success image" style="display: block; margin: 0 auto;">
        <p style="color: green; font-weight: bold; margin: 10px 0;">
        Claim details Updated Successfully
        </p>`,
                  showConfirmButton: true,
                  confirmButtonColor: "#d33",
                  allowOutsideClick: false,
                  width: 600,
                  alignItems: "center",
                  confirmButtonText: "Go to Home",
                }).then((res12) => {
                  if (res12.isConfirmed) {
                    handleTrackClaims();
                  }
                });
              } else {
                swal({
                  html: true,
                  icon: "error",
                  title: "Something went wrong!",
                });
              }
              setResult((prev) => ({ ...prev, ...res1 }));
            }
          }
        );
      }
    } else {
      // if (res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1) {
      // debugger;
      res1.transactionDataDTO[0].transactionDetails.investigatorDetails.forEach(async (x, iddx) => {
        Paymentdata.payeeName =
          res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1 &&
          res1.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
            .VerifiedInvestigator === "Yes"
            ? x.InvestigatorName
            : "";
        Paymentdata.PayeeType =
          res1.transactionDataDTO[0].transactionDetails.paymentObj.modeofPayment;
        Paymentdata.slno =
          res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.length + 1;
        Paymentdata.UTRDate = "";
        Paymentdata.refNo = "NA";
        Paymentdata.paidAmount = "NA";
        Paymentdata.status = "NA";
        Paymentdata.remarks = "NA";
        Paymentdata.Approved =
          res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1 &&
          res1.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
            .VerifiedInvestigator === "Yes"
            ? res1.transactionDataDTO[0].transactionDetails.expenseDetails[iddx].TotalExpenseAmount
            : "";

        if (res1.transactionDataDTO[0].transactionDetails.investigatorDetails.length >= 1) {
          Paymentdata.Payout = "Expense Payout";
        }
        // res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails = [
        //   ...res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails,
        //   { ...Paymentdata },
        // ];
        res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.push(Paymentdata);

        console.log("res1", res1);

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
          res1.transactionDataDTO[0].transactionDetails.expenseDetails[iddx].TotalExpenseAmount;
        const formattedAmount = parseFloat(integerAmount).toFixed(2);

        // debugger;
        const APIRequest = {
          transferPaymentRequest: {
            subHeader: {
              requestUUID: res1.claimNumber,
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
                  custUniqRef: res1.claimBasicDetails.memberDetails.memberId,
                  corpAccNum: "",
                  valueDate: today,
                  txnAmount: formattedAmount,
                  beneLEI: "",
                  // beneName: params.row.payeeName,
                  beneName: Paymentdata.payeeName,
                  // res1.transactionDataDTO[0].transactionDetails.investigatorDetails[iddx]
                  //   .InvestigatorName,
                  // res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails[iddx]
                  //   .payeeName,
                  beneCode: res1.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
                  beneAccNum: res1.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
                  beneAcType: "",
                  beneAddr1: "",
                  beneAddr2: "",
                  beneAddr3: "",
                  beneCity:
                    res1.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
                  // transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity
                  beneState:
                    res1.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
                  benePincode:
                    res1.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalPincode,
                  beneIfscCode: res1.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
                  beneBankName: res1.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
                  baseCode: "",
                  chequeNumber: "",
                  chequeDate: "",
                  payableLocation: "",
                  printLocation: "",
                  beneEmailAddr1: res1.claimBasicDetails.memberDetails.EmailId,
                  beneMobileNo: res1.claimBasicDetails.memberDetails.MobileNo,
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

        const Result = await GenericApi("MagmaHospiCash01", "SaveClaimPaymentDetails", APIRequest);
        // debugger;
        console.log("Resultssss", Result);
        const result = await GetPaymentDetails(res1.claimNumber);
        // debugger;
        console.log("resultss", result);
        setPayment(result.data);
        result.data.finalResult.forEach((item, ids) => {
          // debugger;
          const GetPaymentDetailsResponse = JSON.parse(item.paymentRequest);
          console.log("GetPaymentDetailsResponse", GetPaymentDetailsResponse);
          console.log(
            "testing",
            GetPaymentDetailsResponse.TransferPaymentRequest.TransferPaymentRequestBodyEncrypted
              .paymentDetails[0].beneName
          );
          res1.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails.filter((y1) => {
            if (y1.name !== "Customer") {
              paymentdetails1.push(y1);
            }
            return true;
          });
          GetPaymentDetailsResponse.TransferPaymentRequest.TransferPaymentRequestBodyEncrypted.paymentDetails.forEach(
            (xy) => {
              // debugger;
              if (
                xy.beneName === paymentdetails1[ids].payeeName &&
                xy.txnAmount === parseFloat(paymentdetails1[ids].Approved).toFixed(2)
              ) {
                paymentdetails1[ids].paidAmount = item.paidAmount;
                paymentdetails1[ids].Action = item.Action;
                paymentdetails1[ids].refNo = item.refNo;
                paymentdetails1[ids].remarks = item.remarks;
                paymentdetails1[ids].status = item.status;
                paymentdetails1[ids].UTRDate = item.createdDate;
              }
              setResult((prev) => ({ ...prev, ...res1 }));
            }
          );
        });

        //   });
        // }

        console.log("paymen", paymentdetails1);
        if (result.data.status === 1) {
          // debugger;
          const res2 = await UpdateClaimDetails(res1);
          if (res2.status === 1) {
            const save1 = await updateStageStatusIdByTno(
              res2.finalResult.transactionDataDTO[0].transactionNumber,
              res2.finalResult.claimStatusId
            );
            console.log("save1", save1);
            const data = {
              TransactionNumber: res2.finalResult.transactionDataDTO[0].transactionNumber,
              CreatedBy: userNameId,
            };
            await SaveClaimHistory(data);
            setLoading(false);
            Swal.fire({
              html: `<img src=${magmapayment} alt="success image" style="display: block; margin: 0 auto;">
        <p style="color: green; font-weight: bold; margin: 10px 0;">
        Claim details Updated Successfully
        </p>`,
              showConfirmButton: true,
              confirmButtonColor: "#d33",
              allowOutsideClick: false,
              width: 600,
              alignItems: "center",
              confirmButtonText: "Go to Home",
            }).then((res12) => {
              if (res12.isConfirmed) {
                handleTrackClaims();
              }
            });
          } else {
            swal({
              html: true,
              icon: "error",
              title: "Something went wrong!",
            });
          }
          setResult((prev) => ({ ...prev, ...res1 }));
        }
      });
      // }
    }
  };

  useEffect(() => {
    console.log("Paymentdetails", payment);
  }, [payment]);

  const handleAutocomplete = (e, value) => {
    // debugger;
    let abc = [];
    if (
      value.length === 1 &&
      res1.transactionDataDTO[0].transactionDetails.expenseDetails.length > 0 &&
      value.length >= res1.transactionDataDTO[0].transactionDetails.expenseDetails.length
    ) {
      res1.transactionDataDTO[0].transactionDetails.expenseDetails[value.length - 1].ExpensePayout =
        value[value.length - 1].mValue;
      expense = [...expense, { ...value[value.length - 1] }];
    } else if (
      value.length === 1 &&
      res1.transactionDataDTO[0].transactionDetails.expenseDetails.length < 0
    ) {
      const obj = {
        ExpensePayout: value[value.length - 1].mValue,
        ExpenseAmount: "",
        GSTAmount: "",
        filename: "",
        DocId: "",
        ExpensePennydrop: "",
        TotalExpenseAmount: "",
      };
      res1.transactionDataDTO[0].transactionDetails.expenseDetails = [
        ...res1.transactionDataDTO[0].transactionDetails.expenseDetails,
        {
          ...obj,
        },
      ];
    } else if (value.length < res1.transactionDataDTO[0].transactionDetails.expenseDetails.length) {
      res1.transactionDataDTO[0].transactionDetails.expenseDetails.forEach((ab) => {
        // debugger;
        value.forEach((y) => {
          // debugger;
          if (ab.ExpensePayout === y.mValue) {
            const obj = {
              ExpensePayout: y.mValue,
              ExpenseAmount: ab.ExpenseAmount,
              GSTAmount: ab.GSTAmount,
              filename: ab.fileName,
              DocId: ab.DocId,
              ExpensePennydrop: ab.ExpensePennydrop,
              TotalExpenseAmount: ab.TotalExpenseAmount,
            };
            abc = [...abc, { ...obj }];
          }
        });
      });
      res1.transactionDataDTO[0].transactionDetails.expenseDetails = [];
      expense = [];
      res1.transactionDataDTO[0].transactionDetails.expenseDetails = [
        ...res1.transactionDataDTO[0].transactionDetails.expenseDetails,
        ...abc,
      ];

      expense = [...expense, ...value];
    } else {
      const acd = value[value.length - 1];

      expense = [...expense, { ...acd }];

      const obj = {
        ExpensePayout: value[value.length - 1].mValue,
        ExpenseAmount: "",
        GSTAmount: "",
        filename: "",
        DocId: "",
        ExpensePennydrop: "",
        TotalExpenseAmount: "",
      };
      res1.transactionDataDTO[0].transactionDetails.expenseDetails = [
        ...res1.transactionDataDTO[0].transactionDetails.expenseDetails,
        {
          ...obj,
        },
      ];
    }

    setResult({ ...res1 });
    setTitleflag(true);
    const arr1 = [];
    const obj = {
      docId: "",
      UploadDocDate: "",
      fileName: "",
      UploadedBy: "Medical Adjudicator",
    };
    arr1.push(obj);
    setDocuments((prev) => [...prev, ...arr1]);
  };

  const handleChange = async (e) => {
    setDisableFlag(true);
    SearchObj[e.target.name] = e.target.value;
    SetSearchObj((prev) => ({ ...prev, ...SearchObj }));

    setFlags((prev) => ({ ...prev, claimNoFlag: false }));
    const claimNoError = /^[A-Z]{4}\/\d{4}\/\d{2}\/\d{2}\/\d{8}$/;
    if (claimNoError.test(e.target.value)) {
      setFlags((prev) => ({ ...prev, claimNoError: false }));
    } else {
      setFlags((prev) => ({ ...prev, claimNoError: true }));
    }
  };
  useEffect(() => {
    console.log("12345", claimstatus1);
  }, [claimstatus1]);

  const mes = "Please fill the required field";

  useEffect(() => {
    console.log("selectedvalue", selectedvalue);
  }, [selectedvalue]);

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
      <Grid container p={2}>
        <MDTypography variant="body1" color="primary">
          Make Expense Payment
        </MDTypography>
      </Grid>
      <Grid container p={2} justifyContent="center">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Claim No"
            name="claimNo"
            value={SearchObj.claimNo}
            onChange={(e) => handleChange(e)}
            inputProps={{ maxLength: 26 }}
            error={flags.errorFlag && SearchObj.claimNo === ""}
            helperText={flags.errorFlag && SearchObj.claimNo === "" && mes}
            disabled={inputflag}
          />
          {flags.claimNoError ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please enter correct claim number
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={3} ml={2}>
          <MDButton
            disabled={!disableFlag}
            sx={{ justifyContent: "right" }}
            variant="contained"
            // disabled={SearchObj.claimNo === "" ? true : false}
            onClick={handleSearch}
          >
            Search Claim
          </MDButton>
        </Grid>
      </Grid>
      {searchflag === true && (
        <>
          <Grid container p={2}>
            <MDTypography variant="body1" color="primary">
              Claim details
            </MDTypography>
          </Grid>
          <Grid container p={2} spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="ClaimNo" name="claimNumber" value={res1.claimNumber} disabled />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xx>
              <MDInput label="COI No" name="policyNo" value={res1.policyNo} disabled />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="UHID ID"
                name="memberId"
                value={res1.claimBasicDetails.memberDetails.memberId}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Patient Name"
                name="insuredname"
                value={res1.claimBasicDetails.memberDetails.insuredName}
                disabled
              />
            </Grid>
          </Grid>
          <Grid container p={2} spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Claim Status" name="Claim Status" value={claimstatus1} disabled />
            </Grid>
          </Grid>
          <Grid container p={2}>
            <MDTypography variant="body1" color="primary">
              Expense Pay-out
            </MDTypography>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            {Expense}
          </Grid> */}
          <Grid container p={2} spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                disabled={disableAuto}
                options={selectedvalue}
                // value={[...expense]}
                // value={[...expense]}
                // disableCloseOnSelect
                getOptionLabel={(option) => option.mValue}
                // value={selectedBenefitTypes.map((mValue) =>
                //   expensepayout.find((option) => option.mValue === mValue)
                // )}
                onChange={(e, value) => handleAutocomplete(e, value, "benefitName")}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.mValue}
                  </li>
                )}
                style={{ width: 300 }}
                renderInput={(params) => <MDInput {...params} label="Expense Payout" />}
              />
            </Grid>
          </Grid>
          <>
            {titleflag && (
              <Grid container p={2} spacing={2}>
                <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                  <MDTypography variant="body1" color="primary">
                    Service Name
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                  <MDTypography variant="body1" color="primary">
                    Select Investigator
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                  <MDTypography variant="body1" color="primary">
                    Enter Amount
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                  <MDTypography variant="body1" color="primary">
                    GST (18%)
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                  <MDTypography variant="body1" color="primary">
                    Documents
                  </MDTypography>
                </Grid>
              </Grid>
            )}
            {res1.transactionDataDTO[0].transactionDetails.expenseDetails.map((x, id) => (
              <Grid container p={2} spacing={2}>
                {x.ExpensePayout !== "" ? (
                  <>
                    <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                      <MDTypography variant="body1" color="primary">
                        {x.ExpensePayout}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                      <MDInput
                        label="Investigator Name"
                        value={
                          res1.transactionDataDTO[0].transactionDetails.investigatorDetails[id]
                            .InvestigatorName
                        }
                        disabled
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                      <MDInput
                        label="Expense amount"
                        name="ExpenseAmount"
                        type="number"
                        value={
                          res1.transactionDataDTO[0].transactionDetails.expenseDetails[id]
                            .ExpenseAmount
                        }
                        onChange={(e) => handleExp(e, id, "ExpenseAmount")}
                        disabled={
                          res1.transactionDataDTO[0].transactionDetails.investigatorDetails[id]
                            .VerifiedInvestigator !== "Yes"
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                      <MDInput
                        label="GST Amount"
                        name="GSTamount"
                        value={
                          res1.transactionDataDTO[0].transactionDetails.expenseDetails[id].GSTAmount
                        }
                        onChange={(e) => handleExp(e, id)}
                        disabled
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
                      <label htmlFor={`otherfile-upload-${id}`}>
                        <input
                          id={`otherfile-upload-${id}`}
                          name={`otherfile-upload-${id}`}
                          accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => handleOtherFileUpload(id, e)}
                          onClick={(e) => {
                            e.target.value = "";
                          }}
                        />
                        <MDButton variant="outlined" color="error" component="span">
                          Upload
                        </MDButton>
                        {documentflag === true ? (
                          <Grid sx={{ fontSize: "14px" }}>
                            {documents[id] && <p>{documents[id].fileName}</p>}
                          </Grid>
                        ) : null}
                        {documents[id] && documents[id].fileName && (
                          <Grid item xs sx={{ ml: "2rem" }}>
                            <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                              <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                            </IconButton>
                          </Grid>
                        )}
                      </label>
                    </Grid>
                    {disablecheck === false && (
                      <Grid>
                        <FormGroup
                          onChange={(e) => handleExp(e, id)}
                          name="ExpensePennydrop"
                          value={
                            res1.transactionDataDTO[0].transactionDetails.expenseDetails[id]
                              .ExpensePennydrop
                          }
                        >
                          <FormControlLabel
                            required
                            control={
                              <Checkbox
                                value="Yes"
                                name="ExpensePennydrop"
                                checked={
                                  res1.transactionDataDTO[0].transactionDetails.expenseDetails[id]
                                    .ExpensePennydrop === "Yes"
                                }
                                onChange={handleExp}
                                disabled={
                                  res1.transactionDataDTO[0].transactionDetails.investigatorDetails[
                                    id
                                  ].VerifiedInvestigator !== "Yes"
                                }
                              />
                            }
                            label=""
                          />
                        </FormGroup>
                      </Grid>
                    )}
                  </>
                ) : null}
              </Grid>
            ))}
          </>
          <Grid container p={2} spacing={2} justifyContent="right">
            <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
              <MDButton variant="contained" onClick={handleNext} disabled={disable}>
                Submit
              </MDButton>
            </Grid>
          </Grid>
        </>
      )}
    </Card>
  );
}

export default MakeExpensePayout;
