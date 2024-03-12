import React, { useState, useEffect } from "react";
// import { getRequest } from "core/clients/axiosclient";
import { DataGrid } from "@mui/x-data-grid";
import {
  Accordion,
  Grid,
  Stack,
  Modal,
  Autocomplete,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import swal2 from "sweetalert2";
import Success from "assets/images/Nepal/Success.png";
import MDBox from "components/MDBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SearchIcon from "@mui/icons-material/Search";
// import MDInput from "components/MDInput";
import FilterListIcon from "@mui/icons-material/FilterList";
import MDTypography from "components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDInput from "../../../../../../../components/MDInput";
import { GetTemplatePayload } from "../../../Payment/Apis";
// import MDButton from "components/MDButton";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../../../BrokerPortal/context";
import {
  GetProdPartnermasterData,

  // GetPolicies,
  AccountConfig,
  VochurNumberGeneration,
  // PolicyStartDateMinDate,
  // PolicyStartDateMaxDate,
  // UpdateDepositsAndCredits,
  GetNPCommonMaster,
} from "../data/APIs/MotorCycleApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  spacing: "2",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  // borderRadius: "1rem",
  textAlign: "center",
  p: 2,
};

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  spacing: "2",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  // borderRadius: "1rem",
  textAlign: "center",
  p: 2,
};
const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};
function BankDeposite() {
  const [pageSize, setPageSize] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loader, setLoader] = useState(false);
  const [rows, setrows] = useState([]);
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [ErrorFlag, setErrorFlag] = useState(false);
  const helperText = "This field is Required";
  const [rows1, setrows1] = useState([]);
  const [, dispatch] = useDataController();

  // const [selectedData, setSelectedData] = useState([]);

  const [details1, setdetails1] = useState({
    policyNumber: "",
    ReceiptNumber: "",
    VATNumber: "",
    PolicyStartDate: "",
    PolicyEndDate: "",
    KYCNumber: "",
    Class: "",
    PremiumType: "",
    Department: "",
    Product: "",
  });

  const getMinDateForToDate = (fromDate) => fromDate || null;

  console.log(details1);

  const [Bankdeposite, setBankdeposite] = useState({
    Branch: "",
    SubBranch: "",
    FromDate: "",
    ToDate: "",
    PaymentMode: "",
    IssuingBranch: [],
    masters: {
      PaymentMode: [],
    },
    // PaymentModeArray: [],
  });
  console.log("Bankdeposite", Bankdeposite);
  // const rowsp = [
  //   {
  //     id: 1,
  //     PolicyIssuedDated: "20/01/2023",
  //     PolicyNumber: "NPM123",
  //     BranchName: "JP Nager",
  //     ReceiptNo: "1",
  //     PaymentMode: "Cheque",
  //     Amount: "2,000",
  //   },
  //   {
  //     id: 2,
  //     PolicyIssuedDated: "20/01/2023",
  //     PolicyNumber: "NPM123",
  //     BranchName: "JP Nager",
  //     ReceiptNo: "3",
  //     PaymentMode: "Cash",
  //     Amount: "3,000",
  //   },
  //   {
  //     id: 3,
  //     PolicyIssuedDated: "20/01/2023",
  //     PolicyNumber: "NPM123",
  //     BranchName: "JP Nager",
  //     ReceiptNo: "5",
  //     PaymentMode: "Cash",
  //     Amount: "6,000",
  //   },
  //   {
  //     id: 4,
  //     PolicyIssuedDated: "20/01/2023",
  //     PolicyNumber: "NPM123",
  //     BranchName: "JP Nager",
  //     ReceiptNo: "4",
  //     PaymentMode: "Cash",
  //     Amount: "8,000",
  //   },
  // ];
  const handleChange = (e, type, value) => {
    // debugger;
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
    setBankdeposite({ ...Bankdeposite });
  };

  const generateFile = (content, fileName) => {
    // debugger;
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("low", link.download);
    link.click();
  };

  const generateFile1 = (content, fileName) => {
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    console.log(pdfWindow, src);
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };

  const ViewRecipt = async () => {
    const repit1 = selectedRowDetails.endorsementNo ? selectedRowDetails.endorsementNo : "";
    //   console.log(repit);

    const repit = selectedRowDetails.endorsementNo
      ? selectedRowDetails?.addtionalDetails?.ProposalNo
      : selectedRowDetails.policyNo;
    // const repit = selectedRowDetails.policyNo;
    let Class = "";
    if (repit1 === "") {
      if (selectedRowDetails.company === "NMIC") {
        Class = 217;
      }
      if (selectedRowDetails.company === "PMIC" || process.env.REACT_APP_EnvId === "1") {
        Class = 229;
      }
    } else {
      Class = 339;
    }

    const downloadDTO = {
      key: repit,
      keyValue: "",
      templateKey: "",
      templateId: Class,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile1(result.data, repit);
      }
    });
    setAnchorEl(null);
  };

  const columnsp = [
    {
      field: "policyIssuedDate",
      headerName: "Issued Date",
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      // renderCell: (params) => {
      //   const dateParts = params.row.policyIssuedDate.split("/");
      //   const formattedDate = `${dateParts[1].padStart(2, "0")}/${dateParts[0].padStart(2, "0")}/${
      //     dateParts[2]
      //   }`;
      //   return formattedDate;
      // },
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
      field: "recieptNo",
      headerName: "Receipt No",
      width: 250,
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
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 90,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const handleMenuClose = () => {
          setAnchorEl(null);
        };
        const handleView = (event) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
          setSelectedRowDetails(params.row);
        };

        return (
          <div>
            <IconButton onClick={handleView}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={ViewRecipt}>&nbsp;View Receipt</MenuItem>
              {/* <MenuItem>&nbsp;Download1</MenuItem> */}
            </Menu>
          </div>
        );
      },
    },
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setErrorFlag(false);
    setOpen(false);
  };

  const [selectedIds, setSelectedIds] = useState([]);
  console.log("selectedIds", selectedIds);
  const [open1, setOpen1] = React.useState(false);

  // const [Bankdeposite1, setBankdeposite1] = useState({
  //   AddtionalDetails: {
  //     DepositedConfirmation: "",
  //     BankName: "",
  //   },
  //   DepositedDate: "",
  //   Status: "",
  //   CreditedDate: "",
  //   DepositFlag: "false",
  //   type: "Deposited",
  // });

  const HandleGenerateSlipOpen = async () => {
    setLoader(true);
    setOpen1(true);
    const selectedData1 = rows1
      .filter((obj) => selectedIds.includes(obj.id))
      .map(({ policyNo, endorsementNo }) => ({ PolicyNo: policyNo, EndorsementNo: endorsementNo }));

    const processedData = selectedData1.map(({ PolicyNo, EndorsementNo }) => {
      if (PolicyNo && EndorsementNo === null) {
        return { PolicyNo, EndorsementNo: "" };
      }
      if (PolicyNo && EndorsementNo) {
        return { PolicyNo: "", EndorsementNo };
      }
      return { PolicyNo, EndorsementNo };
    });

    console.log("232323", { policyNo: processedData });

    const res = await VochurNumberGeneration({ policyNo: processedData });
    console.log(res);
    const deposits = res.deposits || [];
    const uniqueVoucherNumbers = new Set();
    deposits.forEach((deposit) => {
      uniqueVoucherNumbers.add(deposit.voucherNumber);
    });
    uniqueVoucherNumbers.forEach(async (VochurNumber) => {
      const downloadDTO = {
        key: VochurNumber,
        keyValue: "",
        templateKey: "",
        templateId: 309,
        requestData: "",
        referenceId: "",
        communicationId: 0,
      };

      try {
        const result = await GetTemplatePayload(downloadDTO);
        if (result.status === 200) {
          generateFile(result.data, VochurNumber);
        }
      } catch (error) {
        console.error(error);
      }
    });

    const Type = "Collections";
    const Policies = await AccountConfig(Type);
    const filteredPolicies = Policies.filter((x) => x.Type !== "Deposited");
    console.log("Policies", Policies);
    setrows([...filteredPolicies]);
    setrows1([...filteredPolicies]);
    setLoader(false);
  };
  const HandleGenerateSlipClose = async () => {
    setOpen1(false);
  };

  const handleSearch = () => {
    if (
      (Bankdeposite.FromDate !== "" && Bankdeposite.ToDate !== "") ||
      Bankdeposite.Branch !== "" ||
      Bankdeposite.PaymentMode !== ""
    ) {
      const Data = rows.filter(
        (x) =>
          x.branchName === Bankdeposite.Branch ||
          x.paymentMode === Bankdeposite.PaymentMode ||
          (x.policyIssuedDate >= Bankdeposite.FromDate && x.policyIssuedDate <= Bankdeposite.ToDate)
      );
      console.log("Data", Data);
      if (Data.length === 0) {
        setOpen(true);
        swal2.fire({
          icon: "error",
          text: "No Data Found",
        });
        setrows1([...rows]);
        setBankdeposite({ ...Bankdeposite });
      } else {
        setOpen(false);
        setrows1([...Data]);
      }
      // setrows([...Data]);
    } else {
      setErrorFlag(true);
      swal2.fire({
        icon: "error",
        text: "Please fill the Required Fields",
        width: "600px",
        padding: "24px",
      });
    }
    // Bankdeposite.Branch = "";
    // Bankdeposite.PaymentMode = "";
    // Bankdeposite.FromDate = "";
    // Bankdeposite.ToDate = "";
  };

  const ClearTheFilter = async () => {
    // debugger;
    setOpen(false);
    setLoader(true);
    const Type = "Collections";
    const Policies = await AccountConfig(Type);
    const filteredPolicies = Policies.filter((x) => x.Type !== "Deposited");

    setrows([...filteredPolicies]);
    setrows1([...filteredPolicies]);

    Bankdeposite.ToDate = "";
    Bankdeposite.FromDate = "";
    Bankdeposite.PaymentMode = "";
    Bankdeposite.Branch = "";

    setLoader(false);
  };

  useEffect(async () => {
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});

    setLoader(true);
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
    // const Policies = await GetPolicies();
    // console.log("Policies", Policies);
    // setrows([...Policies]);
    // setrows1([...Policies]);

    const Type = "Collections";
    const Policies = await AccountConfig(Type);
    console.log("Policies", Policies);
    setrows([...Policies]);
    setrows1([...Policies]);
    setLoader(false);

    const res1 = {};
    details1.Class = res1.Class;
    console.log(details1.Class);
    details1.KYCNumber = res1.KYCNo;
    details1.ReceiptNumber = res1.ReceiptNo;
    details1.VATNumber = res1.TaxInvoiceNo;
    details1.PremiumType = res1.PremiumType;
    details1.Department = res1.Department;
    details1.Product = res1.Product;
    setdetails1({ ...details1 });

    // for product details
  }, []);

  return (
    <Accordion>
      <MDBox>
        <Grid container>
          <Grid container spacing={1} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>
                <strong>Accounting/Collections</strong>
              </MDTypography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} p={2} justifyContent="space-between">
          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDTypography>
              <strong>Collections</strong>
            </MDTypography>
          </Grid> */}
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            {selectedIds && selectedIds.length > 0 && (
              <MDButton
                onClick={HandleGenerateSlipOpen}
                variant="outlined"
                color="info"
                sx={{ width: "204px", marginLeft: "895px" }}
              >
                Generate Deposit Slip
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
          open={open1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style1}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="right">
                <MDButton
                  color="white"
                  round
                  onClick={HandleGenerateSlipClose}
                  textAlign="left"
                  sx={{ fontSize: "20px" }}
                >
                  x
                </MDButton>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Success} sx={{ width: "30%", height: "50%" }} />
                  </MDBox>
                </Grid>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <Typography>Deposit Slip Generated Successfully</Typography>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <MDButton
                  variant="contained"
                  round
                  onClick={HandleGenerateSlipClose}
                  textAlign="center"
                  sx={{ height: "45px", width: "120px", fontSize: "16px" }}
                >
                  CLOSE
                </MDButton>
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
            <Stack spacing={1} justifyContent="center">
              {/* <Stack justifyContent="right" direction="row" spacing={2}>
                <MDTypography>Collections</MDTypography>
                <MDButton color="white" round onClick={handleClose} textAlign="left">
                  x
                </MDButton>
              </Stack> */}
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Grid item xs={12} sm={12} md={3.8} lg={3.8} xl={3.8} xxl={3.8}>
                  <MDTypography>Collections</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDButton
                    color="white"
                    round
                    onClick={handleClose}
                    sx={{ marginLeft: "8.5rem", fontSize: "20px" }}
                  >
                    X
                  </MDButton>
                </Grid>
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
                      altFormat: "d/m/Y",
                      altInput: true,
                    }}
                    input={{
                      label: "Issued Date From",
                      value: Bankdeposite.FromDate,
                      // error: ErrorFlag && Bankdeposite.FromDate === "",
                      // helperText: ErrorFlag && Bankdeposite.FromDate === "" ? helperText : "",
                      // required: true,
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
                      altFormat: "d/m/Y",
                      altInput: true,
                      // minDate: new Date(),
                      minDate: getMinDateForToDate(Bankdeposite.FromDate),
                    }}
                    input={{
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
              <Stack direction="row" spacing={2} justifyContent="left">
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} mx={5}>
                  <Autocomplete
                    options={Bankdeposite.masters.OfflinePayment || []}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    value={{ mValue: Bankdeposite.PaymentMode }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) => handleChange(e, "PaymentMode", value)}
                    renderInput={(params) => <MDInput {...params} label="Payment Mode" />}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="center" spacing={30}>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDButton onClick={ClearTheFilter} variant="contained" textAlign="right">
                    Clear
                  </MDButton>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDButton onClick={handleSearch} variant="contained">
                    Search
                  </MDButton>
                </Grid>
              </Stack>
            </Stack>
          </MDBox>
        </Modal>
        <MDBox p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Backdrop open={loader}>
              <CircularProgress />
            </Backdrop>
            {rows1.length > 0 ? (
              <DataGrid
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  justifyContent: "center",
                }}
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
                pagination
                disableColumnMenu={!false}
              />
            ) : null}
          </Grid>
        </MDBox>
      </MDBox>
    </Accordion>
  );
}

export default BankDeposite;
