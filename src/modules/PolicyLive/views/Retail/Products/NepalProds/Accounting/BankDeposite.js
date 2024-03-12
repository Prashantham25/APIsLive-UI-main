import React, { useState, useEffect } from "react";
import { postRequest } from "core/clients/axiosclient";
import { DataGrid } from "@mui/x-data-grid";
import {
  Accordion,
  Grid,
  Stack,
  Modal,
  Autocomplete,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import swal from "sweetalert";
import swal1 from "sweetalert2";
import Submitted from "assets/images/BrokerPortal/Submitted.png";
import MDBox from "components/MDBox";
import FilterListIcon from "@mui/icons-material/FilterList";
import MDTypography from "components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDInput from "../../../../../../../components/MDInput";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../../../BrokerPortal/context";
import {
  GetProdPartnermasterData,
  AccountConfig,
  UpdateDepositsAndCredits,
  GetNPCommonMaster,
} from "../data/APIs/MotorCycleApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  spacing: "2",
  bgcolor: "background.paper",
  boxShadow: 24,
  textAlign: "center",
  p: 2,
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  height: 300,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};

function BankDeposite() {
  const [pageSize, setPageSize] = React.useState(10);

  // const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setrows] = useState([]);
  const [remArray1, setRemArray1] = useState([]);
  const [ErrorFlag, setErrorFlag] = useState(false);
  // const [ErrorFlag1, setErrorFlag1] = useState(false);
  const helperText = "This field is Required";
  const [rows1, setrows1] = useState([]);
  // const [selectedRowDetails, setSelectedRowDetails] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorFlag(false);
  };

  const [loader, setLoader] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIds1, setSelectedIds1] = useState([]);
  console.log("selectedIds", selectedIds);
  const [open1, setOpen1] = React.useState(false);
  const [, dispatch] = useDataController();
  const [selectedFile, setSelectedFile] = useState(null);
  const [Bankdeposite, setBankdeposite] = useState({
    Branch: "",
    SubBranch: "",
    FromDate: "",
    ToDate: "",
    DepositeVoucherNo: "",
    PaymentMode: "",
    IssuingBranch: [],
    Bank: [],
    masters: {
      PaymentMode: [],
      BankorFinancialInstituionNameinEnglish: [],
      Bank: [],
    },
  });
  console.log("Bankdeposite", Bankdeposite);

  const [Bankdeposite1, setBankdeposite1] = useState({
    AddtionalDetails: {
      DepositedConfirmation: "",
      BankName: "",
      uploadedfile: "",
    },
    DepositedDate: "",
    Status: "",
    CreditedDate: "",
    DepositFlag: "false",
    type: "Credit",
  });

  const getMinDateForToDate = (fromDate) => fromDate || null;

  async function UploadFiles(data) {
    try {
      const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
      return UploadedData;
    } catch (error) {
      return error;
    }
  }

  const handleChange = (e, type, value) => {
    if (type === "Branch") {
      if (value === null) {
        Bankdeposite.Branch = "";
      } else {
        Bankdeposite.Branch = value.mValue;
      }
    }
    if (type === "SubBranch") {
      Bankdeposite.SubBranch = value;
    }
    if (type === "FromDate") {
      Bankdeposite.FromDate = value;
      if (Bankdeposite.FromDate === "") {
        Bankdeposite.ToDate = "";
        setBankdeposite({ ...Bankdeposite });
      }
    }
    if (type === "ToDate") {
      Bankdeposite.ToDate = value;
    }
    if (type === "PaymentMode") {
      if (value === null) {
        Bankdeposite.PaymentMode = "";
      } else {
        Bankdeposite.PaymentMode = value.mValue;
      }
    }
    if (type === "DepositeVoucherNo") {
      Bankdeposite.DepositeVoucherNo = e.target.value;
      const VoucherNumber = Bankdeposite.DepositeVoucherNo;
      if (VoucherNumber !== "") {
        const regexPattern = /^CHT\/\d{5}$/;
        if (regexPattern.test(VoucherNumber)) {
          Bankdeposite.DepositeVoucherNo = VoucherNumber;
        }
        // Bankdeposite.DepositeVoucherNo = "";
        setBankdeposite({ ...Bankdeposite });
      }
    }
    setBankdeposite({ ...Bankdeposite });
    console.log("Bankdeposite", Bankdeposite);
  };

  const handlechange1 = (e, type, value) => {
    if (type === "DepositedConfirmation") {
      if (value === null) {
        Bankdeposite1.AddtionalDetails.DepositedConfirmation = "";
      } else {
        Bankdeposite1.AddtionalDetails.DepositedConfirmation = value.mValue;
        if (value.mValue === "Yes") {
          Bankdeposite1.Status = "Deposited";
        } else {
          Bankdeposite1.Status = "";
        }
      }
    }
    if (type === "DepositedDate") {
      Bankdeposite1.DepositedDate = value;
    }
    if (type === "BankName") {
      if (value === null) {
        Bankdeposite1.AddtionalDetails.BankName = "";
      } else {
        Bankdeposite1.AddtionalDetails.BankName = value.mValue;
      }
    }

    if (Bankdeposite1.AddtionalDetails.DepositedConfirmation === "No") {
      Bankdeposite1.DepositedDate = "";
      Bankdeposite1.AddtionalDetails.BankName = "";
      setSelectedFile("");
      setErrorFlag(false);
    }

    setBankdeposite1({ ...Bankdeposite1 });
    console.log(12, Bankdeposite1);
  };
  const columnsp = [
    {
      field: "policyIssuedDate",
      headerName: "Issued Date",
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "policyNo",
      headerName: "Policy Number",
      width: 300,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "endorsementNo",
      headerName: "Endorsement Number",
      width: 300,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "branchName",
      headerName: "Branch Name",
      width: 150,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "voucherNumber",
      headerName: "Deposit Voucher No",
      width: 200,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "paymentMode",
      headerName: "Payment Mode",
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      sortable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const amount = params.value;
        const formattedAmount = amount > 1000 ? new Intl.NumberFormat().format(amount) : amount;
        return formattedAmount;
      },
    },
  ];

  const handleupdatedepositDetails = async () => {
    setOpen1(true);
    setSelectedFile("");
  };

  const handleSerach = () => {
    if (
      (Bankdeposite.FromDate !== "" && Bankdeposite.ToDate !== "") ||
      Bankdeposite.Branch !== "" ||
      Bankdeposite.DepositeVoucherNo !== "" ||
      Bankdeposite.PaymentMode !== ""
    ) {
      setOpen(false);
      setLoader(true);
      const Data = rows.filter(
        (x) =>
          x.branchName === Bankdeposite.Branch ||
          x.paymentMode === Bankdeposite.PaymentMode ||
          (x.policyIssuedDate >= Bankdeposite.FromDate &&
            x.policyIssuedDate <= Bankdeposite.ToDate) ||
          x.voucherNumber === Bankdeposite.DepositeVoucherNo
      );
      console.log("Data", Data);
      // setrows([...Data]);
      if (Data.length === 0) {
        setOpen(true);
        swal1.fire({
          icon: "error",
          text: "No Data Found",
        });
        console.log("rows", rows);
        setrows1([...rows]);
        setBankdeposite({ ...Bankdeposite });
      } else {
        setrows1([...Data]);
      }
      setLoader(false);
    } else {
      setErrorFlag(true);
      swal1.fire({
        width: "550px",
        padding: "28px",
        icon: "error",
        text: "Please fill the required fields",
      });
    }
  };
  const ClearTheFilter = async () => {
    setOpen(false);
    setLoader(true);
    const Type = "Deposited";
    const Policies = await AccountConfig(Type);
    const filteredPolicies = Policies.filter(
      (x) =>
        (x.creditedDate === "" || x.creditedDate === null) &&
        x.type !== "Collections" &&
        // x.type !== "Deposited" &&
        x.type !== "Credit"
    );
    setrows([...filteredPolicies]);
    setrows1([...filteredPolicies]);
    setLoader(false);

    Bankdeposite.ToDate = "";
    Bankdeposite.FromDate = "";
    Bankdeposite.PaymentMode = "";
    Bankdeposite.Branch = "";
    Bankdeposite.DepositeVoucherNo = "";
  };

  const [open2, setOpen2] = React.useState(false);

  const handleUpdate = async (selectedRow) => {
    const policyNumbers = selectedRow.map((row) => row.policyNo);
    setSelectedIds1(policyNumbers);
    console.log("selectedRow", selectedRow, selectedIds1);
    const selectedData = selectedRow.map(({ policyNo, endorsementNo }) => ({
      PolicyNo: policyNo,
      EndorsementNo: endorsementNo,
    }));

    const processedData = selectedData.map(({ PolicyNo, EndorsementNo }) => {
      if (PolicyNo && EndorsementNo === null) {
        return { PolicyNo, EndorsementNo: "" };
      }
      if (PolicyNo && EndorsementNo) {
        return { PolicyNo: "", EndorsementNo };
      }
      return { PolicyNo, EndorsementNo };
    });
    console.log(processedData);
    await UpdateDepositsAndCredits({ policyNo: processedData, depositDetails: Bankdeposite1 });
    setLoader(true);
    const Type = "Deposited";
    const Policies = await AccountConfig(Type);
    const filteredPolicies = Policies.filter(
      (x) =>
        (x.creditedDate === "" || x.creditedDate === null) &&
        x.type !== "Collections" &&
        x.type !== "Credit"
    );
    setrows([...filteredPolicies]);
    setrows1([...filteredPolicies]);

    Bankdeposite1.AddtionalDetails.DepositedConfirmation = "";
    Bankdeposite1.DepositedDate = "";
    Bankdeposite1.AddtionalDetails.BankName = "";
    setBankdeposite1({ ...Bankdeposite1 });
    if (selectedRow.length !== 0) {
      swal1.fire({
        icon: "success",
        text: "Details Updated Successfully",
      });
    }
    setOpen2(false);
    setOpen1(false);
    setLoader(false);
    return true;
  };

  const HandleUpdateDepositsOpen = async () => {
    if (
      Bankdeposite1.AddtionalDetails.DepositedConfirmation === "" &&
      Bankdeposite1.AddtionalDetails.BankName === "" &&
      Bankdeposite1.DepositedDate === ""
    ) {
      setOpen2(false);
      setErrorFlag(true);
      swal1.fire({
        icon: "error",
        text: "Please fill the required fields",
        width: "550px",
        padding: "24px",
      });
    } else if (Bankdeposite1.AddtionalDetails.DepositedConfirmation === "No") {
      swal({
        icon: "success",
        text: "Details Updated Successfully",
      });
      setErrorFlag(false);
      setOpen2(false);
      setOpen1(false);
    } else if (
      Bankdeposite1.AddtionalDetails.DepositedConfirmation === "Yes" &&
      Bankdeposite1.AddtionalDetails.BankName !== "" &&
      Bankdeposite1.DepositedDate !== ""
    ) {
      const selectedData1 = rows1
        .filter((obj) => selectedIds.includes(obj.id))
        .map(({ policyNo, endorsementNo }) => ({
          PolicyNo: policyNo,
          EndorsementNo: endorsementNo,
        }));

      // const processedData = selectedData1.map(({ PolicyNo, EndorsementNo }) => {
      //   if (PolicyNo && EndorsementNo) {
      //     return { PolicyNo: "", EndorsementNo };
      //   }
      //   return { PolicyNo, EndorsementNo };
      // });
      // const selectedRows = rows.filter((row) => selectedData1.includes(row.PolicyNo));

      const selectedRows = rows.filter((row) =>
        selectedData1.some(
          (selectedRow) =>
            selectedRow.PolicyNo === row.policyNo && selectedRow.EndorsementNo === row.endorsementNo
        )
      );

      let countcash = 0;
      let totcountcheque = 0;
      let countCheque = 0;
      const chequeBankNames = [];

      const chequeCountMap = {};
      const selectedCheques = [];

      selectedRows.forEach((srows) => {
        console.log(selectedRows);
        if (srows.paymentMode === "Cash") {
          countcash += 1;
        } else {
          totcountcheque += 1;
          const bankName = srows.chequeDepositBankName;
          chequeCountMap[bankName] = (chequeCountMap[bankName] || 0) + 1;
          if (bankName === Bankdeposite1.AddtionalDetails.BankName) {
            selectedCheques.push(srows);
          }
        }
        console.log(totcountcheque, countcash);
      });

      countCheque = chequeCountMap[Bankdeposite1.AddtionalDetails.BankName] || 0;

      console.log("Selected cheques:", selectedCheques);

      const areChequeBankNamesSame = chequeBankNames.every(
        (checkBank) => checkBank === chequeBankNames[0]
      );

      console.log(chequeCountMap, countCheque, chequeCountMap);
      selectedRows.forEach(async (selectedRow, i) => {
        console.log(
          selectedRows,
          selectedRow,
          totcountcheque,
          countcash,
          i,
          selectedRows,
          chequeBankNames,
          areChequeBankNamesSame
        );
        const filteredRowsCash = selectedRows.filter((row) => row.paymentMode !== "Cheque");
        const updatedSelectedRows = filteredRowsCash.concat(selectedCheques);
        const remArray = selectedRows.filter((row) => !updatedSelectedRows.includes(row));
        setRemArray1([...remArray1, ...remArray]);
        const filteredRowsCheque = selectedRows.filter((row) => row.paymentMode !== "Cash");
        console.log("qqqqqqqqqqqq", updatedSelectedRows, filteredRowsCheque, remArray);
        console.log(selectedRow);

        swal1
          .fire({
            width: 550,
            height: 550,
            icon: "info",
            html: `Do you wish to continue with ${
              countcash > 0 ? `${countcash} cash ${countcash === 1 ? `policy ` : `policies`} ` : ""
            }
            
            ${
              countcash !== 0 && totcountcheque !== 0 && totcountcheque - countCheque !== 0
                ? `& `
                : ""
            }
            
            ${
              totcountcheque > 0
                ? ` ${countCheque} cheque ${countCheque === 1 ? `policy ` : `policies`}`
                : ""
            }
            .<br>
           
          ${
            totcountcheque !== 0 && totcountcheque - countCheque !== 0
              ? `<span style="color: red;">For ${totcountcheque - countCheque} cheque ${
                  totcountcheque - countCheque === 1 ? `policy ` : `policies`
                }</span>,<span style="color: red;"> please select the cheque deposit bank name as provided in policy issuance </span>`
              : ""
          }`,

            showConfirmButton: true,
            confirmButtonText: "Cancel",
            cancelButtonText: "Continue",
            confirmButtonColor: "#b22222",
            cancelButtonColor: "#006400",
            showCancelButton: true,
            allowOutsideClick: false,
          })
          .then((rex2) => {
            if (rex2.isConfirmed) return false;
            return handleUpdate(updatedSelectedRows);
          });
      });
    } else {
      setErrorFlag(true);
      swal1.fire({
        icon: "error",
        text: "Please fill the required fields",
        width: "550px",
        padding: "24px",
      });
    }
  };
  const HandleUpdateDepositsclose = () => {
    setOpen2(false);
    setOpen1(false);
  };

  const GetProdPartnermasterData1 = async () => {
    try {
      const dataObj = {
        MasterType: "BankDetails",
      };
      const res = await postRequest(
        `ClaimManagement/GetProdPartnermasterData?ProductId=1279&MasterType=${"BankDetails"}`,
        dataObj
      );
      console.log("master", res);
      return res;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  useEffect(async () => {
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});
    setLoader(true);
    // setRemArray1([...remArray1]);
    if (
      localStorage.getItem("NepalCompanySelect") !== null ||
      process.env.REACT_APP_EnvId !== "297"
    ) {
      let Company = "";
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Company = "NMIC";
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Company = "PMIC";
      }
      await GetProdPartnermasterData("BranchName", {
        Description: Company,
      }).then((res) => {
        Bankdeposite.IssuingBranch = res.data;
      });

      setBankdeposite({ ...Bankdeposite });
    }
    await GetNPCommonMaster().then((r) => {
      console.log(r, 2222);
      r.forEach((x) => {
        // Bankdeposite.masters
        // const Data = x.mType;
        Bankdeposite.masters[x.mType] = x.mdata.filter((y) => y.mValue !== "Renewal");
        setBankdeposite({ ...Bankdeposite });
      });
    });
    await GetProdPartnermasterData1().then((r) => {
      // debugger;
      console.log(r, 2222);

      Bankdeposite.Bank = r.data;
      setBankdeposite({ ...Bankdeposite });
      const d = r.data;
      console.log(d);
    });

    // const Policies = await GetPolicies();
    // const filteredPolicies = Policies.filter((x) => x.generateDeposit === "true");
    // console.log("Policies", filteredPolicies);
    // setrows([...filteredPolicies]);
    // setrows1([...filteredPolicies]);

    const Type = "Deposited";
    const Policies = await AccountConfig(Type);
    const filteredPolicies = Policies.filter(
      (x) => (x.creditedDate === "" || x.creditedDate === null) && x.type !== "Collections"
    );

    console.log("Policies", Policies);
    setrows([...filteredPolicies]);
    setrows1([...filteredPolicies]);

    setLoader(false);
  }, []);

  const [docUpload, setDocUpload] = useState([]);

  const UplaodDocData = async (file) => {
    // debugger;
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then(() => {
      setDocUpload([
        ...docUpload,
        { DocName: file.name, DocDate: new Date().toLocaleDateString() },
      ]);
      Bankdeposite1.AddtionalDetails.uploadedfile = file.name;
      setBankdeposite1({ ...Bankdeposite1 });
      swal({
        icon: "success",
        text: "Document uploaded successfully",
      });
    });
  };

  const HandleGenerateSlipClose = () => {
    Bankdeposite1.AddtionalDetails.DepositedConfirmation = "";
    Bankdeposite1.DepositedDate = "";
    Bankdeposite1.AddtionalDetails.BankName = "";
    setSelectedFile("");
    setErrorFlag(false);

    setOpen1(false);
  };

  const handleCancelUpload = (e) => {
    // debugger;
    setSelectedFile("");
    // setDocUpload("");
    console.log(selectedFile, e);
  };

  const handleDocUpload = async (event, index) => {
    const file2 = event.target.files[0];
    if (file2) {
      setSelectedFile(file2);
    }
    console.log("FILES", event.target.files[0]);
    const ext = event.target.files[0].name.split(".").pop(1);
    const filteredData = { ...docUpload[index] };
    filteredData.DocExtension = ext;
    await UplaodDocData(event.target.files[0], index);

    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file1.target.value = "";
  };

  return (
    <Accordion>
      <MDBox>
        <Grid container>
          <Grid container spacing={1} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>
                <strong>Accounting / Deposits</strong>{" "}
              </MDTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={1} p={2} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            {selectedIds.length > 0 && (
              <MDButton
                onClick={handleupdatedepositDetails}
                variant="outlined"
                color="info"
                sx={{ marginLeft: "890px", width: "210px" }}
              >
                Update Deposit Details
              </MDButton>
            )}
          </Grid>
          {rows1.length > 0 ? (
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDButton onClick={handleOpen} variant="outlined" sx={{ marginLeft: "80px" }}>
                <FilterListIcon /> Filter
              </MDButton>
            </Grid>
          ) : null}
        </Grid>
        <Modal
          open={open2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="right">
                <MDButton color="white" round onClick={HandleUpdateDepositsclose} textAlign="left">
                  x
                </MDButton>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Submitted} sx={{ width: "30%", height: "50%" }} />
                  </MDBox>
                </Grid>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <Typography>Details Updated Successfully</Typography>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <MDButton
                  // color="white"
                  variant="contained"
                  round
                  onClick={HandleUpdateDepositsclose}
                  textAlign="center"
                  sx={{ width: "100px", fontSize: "16px" }}
                >
                  CLOSE
                </MDButton>
              </Stack>
            </Stack>
          </MDBox>
        </Modal>

        <Modal
          open={open1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style1}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <MDTypography sx={{ marginLeft: "21px" }}>Deposit Details</MDTypography>
                <MDButton
                  color="white"
                  round
                  onClick={HandleGenerateSlipClose}
                  sx={{ marginLeft: "11.5rem", fontSize: "20px" }}
                >
                  x
                </MDButton>
              </Stack>

              <Stack direction="row" spacing={5} justifyContent="center">
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <Autocomplete
                    style={{ marginBottom: "10px" }}
                    justifyContent="left"
                    options={Bankdeposite.masters.DirectDiscount || []}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                      ...redAsterisk,
                    }}
                    value={{ mValue: Bankdeposite1.AddtionalDetails.DepositedConfirmation }}
                    getOptionLabel={(option) => option.mValue || ""}
                    onChange={(e, value) => handlechange1(e, "DepositedConfirmation", value)}
                    renderInput={(params) => (
                      <MDInput
                        error={
                          ErrorFlag && Bankdeposite1.AddtionalDetails.DepositedConfirmation === ""
                        }
                        helperText={
                          ErrorFlag && Bankdeposite1.AddtionalDetails.DepositedConfirmation === ""
                            ? helperText
                            : ""
                        }
                        required
                        {...params}
                        label="Deposited Confirmation"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDDatePicker
                    justifyContent="right"
                    disabled={Bankdeposite1.AddtionalDetails.DepositedConfirmation === "No"}
                    options={{
                      dateFormat: "d/m/Y",
                      altFormat: "d/m/Y",
                      altInput: true,

                      maxDate: new Date(),
                    }}
                    input={{
                      label: "Deposited Date",
                      value: Bankdeposite1.DepositedDate,
                      required: Bankdeposite1.AddtionalDetails.DepositedConfirmation !== "No",
                      error: Bankdeposite1.DepositedDate === "" && ErrorFlag,
                      helperText: Bankdeposite1.DepositedDate === "" && ErrorFlag ? helperText : "",
                      sx: redAsterisk,
                    }}
                    error={ErrorFlag && Bankdeposite1.DepositedDate === ""}
                    helperText={ErrorFlag && Bankdeposite1.DepositedDate === "" ? helperText : ""}
                    value={Bankdeposite1.DepositedDate}
                    onChange={(e, date) => handlechange1(e, "DepositedDate", date)}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" spacing={5} justifyContent="left" paddingLeft="22px">
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5.2}>
                  <Autocomplete
                    options={Bankdeposite.Bank || []}
                    disabled={Bankdeposite1.AddtionalDetails.DepositedConfirmation === "No"}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                      ...redAsterisk,
                    }}
                    value={{ mValue: Bankdeposite1.AddtionalDetails.BankName }}
                    getOptionLabel={(option) => option.mValue || ""}
                    onChange={(e, value) => handlechange1(e, "BankName", value)}
                    // onBlur={(e, value) => getSelectedRowDetails(e, value)}
                    renderInput={(params) => (
                      <MDInput
                        error={Bankdeposite1.AddtionalDetails.BankName === "" && ErrorFlag}
                        helperText={
                          Bankdeposite1.AddtionalDetails.BankName === "" && ErrorFlag
                            ? helperText
                            : ""
                        }
                        required={Bankdeposite1.AddtionalDetails.DepositedConfirmation !== "No"}
                        {...params}
                        label="Bank Name"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <Typography
                    variant="body2"
                    style={{ fontSize: "15px", marginLeft: "10px", marginBottom: "20px" }}
                  >
                    Upload File
                    <MDButton
                      color="primary"
                      variant="outlined"
                      component="label"
                      style={{ marginLeft: "12px" }}
                    >
                      Upload
                      <input
                        disabled={Bankdeposite1.AddtionalDetails.DepositedConfirmation === "No"}
                        hidden
                        id="fileInput"
                        accept="image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleDocUpload(e)}
                      />
                    </MDButton>
                  </Typography>
                  {selectedFile && (
                    <div style={{ marginLeft: "12px" }}>
                      <p style={{ fontSize: "14px" }}>
                        {selectedFile.name.length > 15
                          ? `${selectedFile.name.substring(0, 15)}...`
                          : selectedFile.name}{" "}
                        <ClearIcon onClick={(e) => handleCancelUpload(e)} />
                      </p>{" "}
                    </div>
                  )}
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="Center" paddingLeft="78px">
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDButton
                    variant="contained"
                    justifyContent="center"
                    onClick={HandleUpdateDepositsOpen}
                  >
                    Update
                  </MDButton>
                </Grid>
              </Stack>
            </Stack>
          </MDBox>
        </Modal>

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            <Stack spacing={2} justifyContent="center">
              <Stack direction="row" justifyContent="space-between">
                <MDTypography sx={{ marginLeft: "39px" }}>Deposits</MDTypography>
                <MDButton
                  color="white"
                  round
                  onClick={handleClose}
                  sx={{ marginLeft: "60px", fontSize: "20px" }}
                >
                  x
                </MDButton>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center">
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <Autocomplete
                    options={Bankdeposite.IssuingBranch || []}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    value={{ mValue: Bankdeposite.Branch }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) => handleChange(e, "Branch", value)}
                    renderInput={(params) => <MDInput {...params} label="Branch" />}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <Autocomplete
                    options={[]}
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    value={Bankdeposite.SubBranch}
                    getOptionLabel={(option) => option.mValue || ""}
                    onChange={(e, value) => handleChange(e, "SubBranch", value)}
                    renderInput={(params) => <MDInput {...params} label="Sub Branch" />}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDDatePicker
                    fullWidth
                    options={{
                      dateFormat: "d/m/Y",
                      altFormat: "d-m-Y",
                      altInput: true,
                    }}
                    input={{
                      // onBlur: { HandleVochur11 },
                      label: "Issued Date From",
                      value: Bankdeposite.FromDate,
                      // error: ErrorFlag && Bankdeposite.FromDate === "",
                      // helperText: ErrorFlag && Bankdeposite.FromDate === "" ? helperText : "",
                      // required: true,
                      sx: redAsterisk,
                    }}
                    value={Bankdeposite.FromDate}
                    onChange={(e, date) => handleChange(e, "FromDate", date)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDDatePicker
                    fullWidth
                    disabled={Bankdeposite.FromDate === ""}
                    options={{
                      dateFormat: "d/m/Y",
                      altFormat: "d-m-Y",
                      altInput: true,
                      minDate: getMinDateForToDate(Bankdeposite.FromDate),
                    }}
                    input={{
                      // onBlur: { HandleVochur11 },
                      label: "Issued Date To",
                      value: Bankdeposite.ToDate,
                      error:
                        Bankdeposite.FromDate !== "" && ErrorFlag && Bankdeposite.ToDate === "",
                      helperText:
                        Bankdeposite.FromDate !== "" && ErrorFlag && Bankdeposite.ToDate === ""
                          ? helperText
                          : "",
                      required: Bankdeposite.FromDate !== "",
                      sx: redAsterisk,
                    }}
                    value={Bankdeposite.ToDate}
                    onChange={(e, date) => handleChange(e, "ToDate", date)}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <Autocomplete
                    options={Bankdeposite.masters.OfflinePayment || []}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                      // ...redAsterisk,
                    }}
                    value={{ mValue: Bankdeposite.PaymentMode }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) => handleChange(e, "PaymentMode", value)}
                    renderInput={(params) => <MDInput {...params} label="Payment Mode" />}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDInput
                    label="Deposit Voucher No"
                    name="DepositeVoucherNo"
                    value={Bankdeposite.DepositeVoucherNo}
                    onChange={(e, value) => handleChange(e, "DepositeVoucherNo", value)}
                    // onBlur={HandleVochur}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="right" spacing={30}>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDButton
                    onClick={ClearTheFilter}
                    variant="contained"
                    textAlign="right"
                    sx={{ marginLeft: "18px" }}
                  >
                    Clear
                  </MDButton>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDButton onClick={handleSerach} variant="contained" sx={{ marginRight: "21px" }}>
                    Search
                  </MDButton>
                </Grid>
              </Stack>
            </Stack>
          </MDBox>
        </Modal>
        <MDBox p={2}>
          <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" m={0}>
            <Stack justifyContent="space-between" p={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Backdrop open={loader}>
                  <CircularProgress />
                </Backdrop>
                {rows1.length > 0 ? (
                  <DataGrid
                    autoHeight
                    rows={rows1}
                    checkboxSelection
                    columns={columnsp}
                    pageSize={pageSize}
                    getRowId={(row) => row.id}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSelectionModelChange={(row) => setSelectedIds(row)}
                    selectionModel={selectedIds}
                    rowsPerPageOptions={[10, 15, 20, 25]}
                    disableColumnMenu={!false}
                    // getRowClassName={(params) => getRowClassName(params, remArray1)}
                    getRowClassName={(params) => {
                      const isChequeRow =
                        remArray1 &&
                        remArray1.some((chequeRow) => chequeRow.policyNo === params.row.policyNo);
                      return isChequeRow ? "active-row" : "";
                    }}
                    sx={{
                      "& .active-row": {
                        backgroundColor: "#ffebee",
                        color: "white",
                        "&:hover": { backgroundColor: "#ef9a9a" },
                      },
                      fontSize: "14px",
                      fontWeight: "400",
                      justifyContent: "center",
                    }}
                    pagination
                  />
                ) : null}
              </Grid>
            </Stack>
          </Grid>
        </MDBox>
      </MDBox>
    </Accordion>
  );
}

export default BankDeposite;
