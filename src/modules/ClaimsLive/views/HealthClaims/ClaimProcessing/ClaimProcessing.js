import { useEffect, useState } from "react";
import {
  Grid,
  Accordion,
  FormControlLabel,
  FormGroup,
  Checkbox,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDataController } from "modules/BrokerPortal/context";
import swal from "sweetalert";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import {
  GetMasterData,
  SaveClaimDataDetails,
  SaveClaimHistory,
  UpdateClaimBankAccounts,
  GetStakeHoldersDetails,
} from "../data/index";
// setTravelClaimJson//SaveClaimDataDetails

function ClaimProcessing() {
  const [controller] = useDataController();
  const { TravelClaimJson, TravelEnquiryFlag } = controller;
  const [ClaimObj, setClaimObj] = useState(TravelClaimJson);

  const [Val, setVal] = useState("");

  const [onSaveFlag, setOnSaveFlag] = useState(false);

  const [MasterCurrency, setMasterCurrency] = useState([]);
  const [MasterAccountType, setMasterAccountType] = useState([]);
  const [MasterTransactionDecision, setMasterTransactionDecision] = useState([]);

  const [AccType, setAccType] = useState(" ");
  const [ActionType, setActionType] = useState("");

  const [AppClaimAmt, setAppClaimAmt] = useState("");
  const [backdropLoader, setBackdropLoader] = useState(false);

  const [PaymentDetails, setPaymentDetails] = useState({
    accountNumber: "",
    accountType: "",
    amount: "",
    amountType: "",
    bankBranchAddress: "",
    bankName: "",
    calAmt: "",
    currMasFrom: "",
    currMasTo: "",
    excRate: "",
    ifscCode: "",
    panNo: "",
    payeeName: "",
    payeeType: "",
  });
  const [PaymentObj, setPaymentObj] = useState({
    a1: false,
    a2: true,
    action: "",
    approvedAmount: "",
    customer: false,
    isApprovedAmountCorrect: null,
    paymentDetails: [],
    remarks: "",
    work: false,
  });
  console.log("PaymentObj11111", PaymentObj);
  // const [Nominee, setNominee] = useState(false);
  // const [TPA, setTPA] = useState(false);
  // const [LegalHeir, setLegalHeir] = useState(false);
  // const [Customer, setCustomer] = useState(true);
  const onBankDetailsChange = (e) => {
    setPaymentDetails({ ...PaymentDetails, [e.target.name]: e.target.value });
    if (e.target.name === "excRate") {
      const amt =
        parseInt(e.target.value, 10) *
        parseInt(
          ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0]
            .approvedClaimAmount,
          10
        );
      setPaymentDetails({
        ...PaymentDetails,
        excRate: e.target.value,
        calAmt: amt,
      });
    }
    console.log({ ...PaymentDetails }, 99);
  };

  const onAutoCurrencyType = ({ e, newVal }) => {
    setPaymentDetails({ ...PaymentDetails, [e.target.id.split("-")[0]]: newVal.mValue });
    console.log({ ...PaymentDetails }, 99);
    console.log(e, newVal);
  };

  const onAutoAccountType = ({ e, newVal }) => {
    setPaymentDetails({ ...PaymentDetails, [e.target.id.split("-")[0]]: newVal.mID.toString() });
    setAccType(newVal.mValue);
    console.log({ ...PaymentDetails }, 99);
    console.log(e, newVal);
  };

  const onActionType = ({ newVal }) => {
    setActionType(newVal.mValue);
    setPaymentObj({ ...PaymentObj, action: newVal.mID.toString() });
  };

  const onPaymentObj = (e) => {
    setPaymentObj({ ...PaymentObj, [e.target.name]: e.target.value });
    console.log({ ...PaymentObj }, 99);
  };

  const onSave = async () => {
    setBackdropLoader(true);
    PaymentDetails.payeeType = Val;
    setPaymentDetails({ ...PaymentDetails });

    PaymentObj.paymentDetails = [{ ...PaymentDetails }];
    setPaymentObj(PaymentObj);

    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj = { ...PaymentObj };
    ClaimObj.claimTransactionDTO[0].approvedAmount = AppClaimAmt;
    ClaimObj.claimTransactionDTO[0].statusId = parseInt(PaymentObj.action, 10);

    setClaimObj({ ...ClaimObj });

    const TravelClaimIntimation = ClaimObj;
    const Data = await SaveClaimDataDetails({ TravelClaimIntimation });
    console.log(Data);

    const ClaimId = ClaimObj.basicDetails.claimId;
    const TransactionId = ClaimObj.claimTransactionDTO[0].transactionId;
    const ClaimCategory = ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimCategory;
    const gshd = await GetStakeHoldersDetails({ TransactionId, ClaimCategory });
    console.log("gshd", gshd);

    await UpdateClaimBankAccounts({ ClaimId, TransactionId, ClaimObj });

    const transactionNumber = { TransactionNumber: Data.claimTransactionDTO[0].transactionNumber };
    await SaveClaimHistory({ transactionNumber });
    setBackdropLoader(false);
    swal({
      html: true,
      icon: "success",
      title: "Bank Details Saved Successfully",
    });
  };

  // const [Val, setVal] = useState([
  //   { Name: "Nominee", Check: false },
  //   { Name: "TPA", Check: false },
  //   { Name: "LegalHeir", Check: false },
  //   { Name: "Customer", Check: false },
  // ]);

  // const [Flag, setFlag] = useState(false);

  useEffect(async () => {
    if (
      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj.isApprovedAmountCorrect ===
      true
    )
      setOnSaveFlag(true);
    const arr = [];
    const Data = await GetMasterData();
    Data.forEach((item) => {
      if (item.mType === "Currency") {
        setMasterCurrency(item.mdata);
      }
      if (item.mType === "Account Type") {
        setMasterAccountType(item.mdata);
      }
      if (item.mType === "Transaction Decision") {
        item.mdata.forEach((r) => {
          if (r.mValue === "Approved" || r.mValue === "Rejected" || r.mValue === "Raise a Query")
            arr.push(r);
        });
        setMasterTransactionDecision(arr);
      }
    });
    if (ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails.length !== 0) {
      setAppClaimAmt(
        ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0].approvedClaimAmount
      );
      setPaymentObj({
        ...ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj,
        approvedAmount:
          ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0].approvedClaimAmount.toString(),
      });
    }
  }, []);

  useEffect(() => {
    if (TravelEnquiryFlag || onSaveFlag) {
      if (
        ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj.paymentDetails.length > 0
      ) {
        console.log("aaaaaaa");
        setVal(
          ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj.paymentDetails[0]
            .payeeType
        );
        setPaymentObj(ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj);
        setPaymentDetails(
          ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj.paymentDetails[0]
        );
      }
    }
    // else {
    //   setPaymentDetails({
    //     ...PaymentDetails,
    //     amount:
    //       ClaimObj.claimTransactionDTO[0].transactionDetailsDto.benefitDetails[0]
    //         .approvedClaimAmount,
    //   });
    // }
  }, [TravelEnquiryFlag, onSaveFlag]);

  useEffect(() => {
    if (TravelEnquiryFlag || onSaveFlag) {
      if (
        ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj.paymentDetails.length > 0
      ) {
        // setActionType();
        MasterAccountType.forEach((row) => {
          if (
            ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj.paymentDetails[0]
              .accountType === row.mID.toString()
          ) {
            console.log(1212, row);
            setAccType(row.mValue);
          }
        });

        MasterTransactionDecision.forEach((row) => {
          if (
            ClaimObj.claimTransactionDTO[0].transactionDetailsDto.paymentObj.action ===
            row.mID.toString()
          ) {
            setActionType(row.mValue);
          }
        });
      }
    }
  }, [MasterAccountType, MasterTransactionDecision, onSaveFlag]);

  const PaymentDetailsTablecolumns = [
    {
      field: "payeeName",
      headerName: "Payee Name",
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="payeeName"
          value={PaymentDetails.payeeName}
          onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },
    {
      field: "bankName",
      headerName: "Bank Name",
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="bankName"
          value={PaymentDetails.bankName}
          onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },

    {
      field: "bankBranchAddress",
      headerName: "Branch Name",
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="bankBranchAddress"
          value={PaymentDetails.bankBranchAddress}
          onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },

    {
      field: "payeeType",
      headerName: "Payee Type",
      hide: true,
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="payeeType"
          value={Val}
          // onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },
    {
      field: "accountType",
      headerName: "Account Type",
      hide: true,
      width: 250,
      renderCell: () => (
        <Autocomplete
          fullWidth
          disabled={TravelEnquiryFlag}
          id="accountType"
          value={{ mValue: AccType }}
          options={MasterAccountType}
          getOptionLabel={(option) => option.mValue}
          onChange={(e, newVal) => onAutoAccountType({ e, newVal })}
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
      field: "accountNumber",
      headerName: "Account Number",
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="accountNumber"
          value={PaymentDetails.accountNumber}
          onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },
    {
      field: "panNo",
      headerName: "PAN No.",
      hide: true,
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="panNo"
          value={PaymentDetails.panNo}
          onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },
    {
      field: "ifscCode",
      headerName: "IFSC Code",
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="ifscCode"
          value={PaymentDetails.ifscCode}
          onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },
    {
      field: "currMasFrom",
      headerName: "Currency Master From",
      hide: true,
      width: 250,
      renderCell: () => (
        <Autocomplete
          disabled={TravelEnquiryFlag}
          fullWidth
          id="currMasFrom"
          options={MasterCurrency}
          onChange={(e, newVal) => onAutoCurrencyType({ e, newVal })}
          value={{ mValue: PaymentDetails.currMasFrom }}
          getOptionLabel={(option) => option.mValue}
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
      field: "excRate",
      headerName: "Exchange Rate",
      hide: true,
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="excRate"
          value={PaymentDetails.excRate}
          onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },
    {
      field: "currMasTo",
      headerName: "Currency Master From",
      hide: true,
      width: 250,
      renderCell: () => (
        <Autocomplete
          disabled={TravelEnquiryFlag}
          fullWidth
          id="currMasTo"
          options={[
            {
              mID: 13,
              mValue: "INR",
              mType: "Currency",
              mIsRequired: false,
              isActive: null,
            },
          ]}
          value={{ mValue: PaymentDetails.currMasTo }}
          onChange={(e, newVal) => onAutoCurrencyType({ e, newVal })}
          getOptionLabel={(option) => option.mValue}
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
      field: "amount",
      headerName: "Amount",
      hide: true,
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="amount"
          value={PaymentDetails.amount}
          // onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },
    {
      field: "calAmt",
      headerName: "Calculated Amount",
      hide: true,
      width: 250,
      renderCell: () => (
        <MDInput
          disabled={TravelEnquiryFlag}
          name="calAmt"
          value={PaymentDetails.calAmt}
          // onChange={(e) => onBankDetailsChange(e)}
        />
      ),
    },
  ];

  const onCheckBox = (e) => {
    const { checked } = e.target;
    setPaymentObj({ ...PaymentObj, isApprovedAmountCorrect: checked });
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
            Payment Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput disabled={TravelEnquiryFlag} label="Approved Amount " value={AppClaimAmt} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <FormGroup onChange={(e) => onCheckBox(e)}>
                <FormControlLabel
                  control={<Checkbox checked={PaymentObj.isApprovedAmountCorrect} />}
                  disabled={TravelEnquiryFlag}
                  label="isApprovedAmountCorrect?"
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <DataGrid
                autoHeight
                rows={[{ id: 1 }]}
                columns={PaymentDetailsTablecolumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
                editField="inEdit"
                // getRowId={(row) => row.id}
                // onRowClick={(ids) => onHandelMemberDetails(ids)}
                // (ids) => setWorkItemType((prev) => ({ ...prev, MemberID: ids.id }))
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled={TravelEnquiryFlag}
                label="Total Amount"
                name="approvedAmount"
                value={PaymentDetails.calAmt}
                // onChange={(e) => onPaymentObj(e)}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                disabled={TravelEnquiryFlag}
                value={{ mValue: ActionType }}
                options={MasterTransactionDecision}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, newVal) => onActionType({ e, newVal })}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                renderInput={(params) => <MDInput {...params} label="Action" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled={TravelEnquiryFlag}
                label="Remarks"
                name="remarks"
                value={PaymentObj.remarks}
                onChange={(e) => onPaymentObj(e)}
              />
            </Grid>
            {backdropLoader && (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropLoader}
              >
                <CircularProgress />
              </Backdrop>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      {!TravelEnquiryFlag && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={onSave}>SAVE</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default ClaimProcessing;
