import React, { useState, useEffect } from "react";
// import { getRequest } from "core/clients/axiosclient";
import { DataGrid } from "@mui/x-data-grid";
// import Success from "assets/images/Gifs/Success.gif";
import Submitted from "assets/images/BrokerPortal/Submitted.png";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Accordion,
  Grid,
  Stack,
  Modal,
  Autocomplete,
  // TextareaAutosize,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  Backdrop,
  // Tooltip,
} from "@mui/material";
import swal from "sweetalert";
// import swal2 from "sweetalert2";
import swal1 from "sweetalert2";
import MDBox from "components/MDBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SearchIcon from "@mui/icons-material/Search";
// import MDInput from "components/MDInput";
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
  GetNPCommonMaster,
  UpdateDepositsAndCredits,
  AccountConfig,
  getDocumentById,
} from "../data/APIs/MotorCycleApi";

// import MDButton from "components/MDButton";

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
  height: 270,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const ReasonforNotcreadited = [
  { mID: 1, mValue: "Cheque Dishnoured/ Cheque Bounce" },
  { mID: 2, mValue: "Others" },
];

const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};

function Color({ Status }) {
  console.log("Status", Status);
  // debugger;
  let label = "";
  if (Status === "Credited") {
    label = "Credited";
    return (
      <MDTypography>
        <Chip label={label} style={{ backgroundColor: "#2E7D32", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  if (Status === "Not Credited") {
    label = "Not Credited";
    return (
      <MDTypography>
        <Chip label={label} style={{ backgroundColor: "#FF2626", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  if (Status === "Deposited") {
    label = "Deposited";
    return (
      <MDTypography>
        <Chip label={label} style={{ backgroundColor: "#ff9100", color: "#ffffff" }} />
      </MDTypography>
    );
  }

  return <Chip label={label} style={{ backgroundColor: "#ED6C02", color: "#ffffff" }} />;
}

function BankCredits() {
  const [pageSize, setPageSize] = React.useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [rows, setrows] = useState([]);
  const [rows1, setrows1] = useState([]);
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [ErrorFlag, setErrorFlag] = useState(false);
  const [flag, setFlag] = useState({ dateFlag: false, ReasonforNotcreaditedFlag: false });
  const helperText = "This field is Required";
  const [, dispatch] = useDataController();
  const [Bankcredits, setBankcredits] = useState({
    Branch: "",
    SubBranch: "",
    FromDate: "",
    ToDate: "",
    PaymentMode: "",
    IssuingBranch: [],
    masters: {
      DirectDiscount: [],
    },
  });

  const [BankCredit, setBankCredit] = useState({
    AddtionalDetails: {
      ReasonforNotcreadited: "",
      CreditedConformation: "",
      uploadedfile: "",
      ChequeBounce: "",
      CreditedConform1: "",
    },
    CreditedConform: "",
    type: "Credit",
    DepositedDate: "",
    ReasonforNotcreadited: "",
    Status: "",
    DepositFlag: "true",
    CreditedDate: "",
  });

  const getMinDateForToDate = (fromDate) => fromDate || null;

  // // Function to update the Status based on CreditedConformation
  // const updateStatusBasedOnConformation = () => {
  //   // debugger;
  //   const { CreditedConformation } = BankCredit.AddtionalDetails.CreditedConformation;
  //   console.log("1", CreditedConformation);
  //   let updatedStatus = BankCredit.Status;
  //   // Check the value of CreditedConformation and update Status accordingly
  //   if (CreditedConformation === "No") {
  //     updatedStatus = "Not Credited";
  //   } else if (CreditedConformation === "Yes") {
  //     updatedStatus = "Credited";
  //   }
  //   // Update the state with the new Status value
  //   setBankCredit((prevBankCredit) => ({
  //     ...prevBankCredit,
  //     Status: updatedStatus,
  //   }));
  // };

  const handleChange = (e, type, value) => {
    if (type === "Branch") {
      if (value === null) {
        Bankcredits.Branch = "";
      } else {
        Bankcredits.Branch = value.mValue;
      }
    }
    if (type === "SubBranch") {
      Bankcredits.SubBranch = value;
    }
    if (type === "FromDate") {
      Bankcredits.FromDate = value;
      if (Bankcredits.FromDate === "") {
        Bankcredits.ToDate = "";
        setBankcredits({ ...Bankcredits });
      }
    }
    if (type === "ToDate") {
      Bankcredits.ToDate = value;
    }
    if (type === "PaymentMode") {
      if (value === null) {
        Bankcredits.PaymentMode = "";
      } else {
        Bankcredits.PaymentMode = value.mValue;
      }
    }
    setBankcredits({ ...Bankcredits });
    console.log(11, Bankcredits);
  };

  const handlechange1 = (e, type, value) => {
    console.log(value);
    // debugger;
    if (type === "CreditedConformation") {
      if (value === null) {
        BankCredit.AddtionalDetails.CreditedConformation = "";
      } else {
        BankCredit.AddtionalDetails.CreditedConformation = value.mValue;
        BankCredit.Status = value.mValue === "Yes" ? "Credited" : "Not Credited";
        BankCredit.CreditedConform = "";
      }
    }
    if (type === "CreditedConform") {
      if (value === null) {
        BankCredit.CreditedConform = "";
      } else {
        BankCredit.CreditedConform = value.mValue;
        BankCredit.AddtionalDetails.CreditedConform1 = value.mValue;
      }
    }
    if (type === "CreditedDate1") {
      BankCredit.CreditedDate = value;
    }
    if (type === "ReasonforNotcreadited") {
      BankCredit.AddtionalDetails.ReasonforNotcreadited = e.target.value;
    }

    if (BankCredit.AddtionalDetails.CreditedConformation === "No") {
      BankCredit.CreditedDate = "";
      setFlag((prevstate) => ({ ...prevstate, dateFlag: false }));
    }
    if (BankCredit.AddtionalDetails.CreditedConformation === "Yes") {
      BankCredit.AddtionalDetails.ReasonforNotcreadited = "";
      setFlag((prevstate) => ({ ...prevstate, ReasonforNotcreaditedFlag: false }));
    }

    // setBankCredit({ ...BankCredit });
    setBankCredit({ ...BankCredit });
    console.log("UpdateDetails", BankCredit);
  };

  const generateFile = (content, fileName) => {
    // Extract file extension from the filename
    const fileExtension = fileName;

    // Determine the file type based on the file extension
    let fileType;
    if (fileExtension === "pdf") {
      fileType = "application/pdf";
    } else if (["png", "jpeg", "jpg", "gif"].includes(fileExtension)) {
      fileType = `image/${fileExtension}`;
    } else {
      // Default to application/octet-stream for unknown file types
      fileType = "application/octet-stream";
    }

    const src = `data:${fileType};base64,${content}`;
    const fileWindow = window.open();
    console.log(fileWindow, src);

    if (fileType.startsWith("image/")) {
      fileWindow.document.write(
        `<html><head><title>${fileName}</title></head><body><img src="${src}" alt="${fileName}" style="width:100%; height:100%;"></body></html>`
      );
    } else {
      fileWindow.document.write(
        `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="${fileType}"></embed></body></html>`
      );
    }
  };

  // Finding the preview counter file
  const PreviewCounterFile = async () => {
    const l = selectedRowDetails.addtionalDetails.uploadedfile;
    // BankCredit.addtionalDetails.uploadedfile = l;
    setBankCredit({
      ...BankCredit,
      ...(BankCredit.AddtionalDetails.uploadedfile = l),
    });
    console.log(l);
    if (l === "" || l === null || l === undefined) {
      swal({
        icon: "error",
        text: "Document Not Uploaded in the Bank deposit",
      });
    } else {
      // const zeroIndexDetails = (rows) => rows[0];
      const res = await getDocumentById(l);
      if (res.data != null) {
        generateFile(res.data, res.fileExtension);
      }
    }
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
      width: 160,
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
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "amount",
      headerName: "Amount",
      sortable: false,
      width: 160,
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
      field: "depositedDate",
      headerName: "Deposited Date",
      sortable: false,
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "creditedDate",
      headerName: "Credited Date",
      sortable: false,
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params?.row?.creditedDate !== "" ? params?.row?.creditedDate : "N/A",
    },

    {
      field: "chequeDepositBankName",
      headerName: "Deposited Bank Name",
      sortable: false,
      width: 350,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params?.row?.paymentMode !== ""
          ? params?.row?.addtionalDetails.BankName
          : params?.row?.chequeDepositBankName,
    },

    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (param) => <Color Status={param?.row?.status} />,
    },
    // {
    //   field: "addtionalDetails.ReasonforNotcreadited",
    //   headerName: "Reason for Not Credited",
    //   sortable: false,
    //   width: 350,
    //   headerClassName: "super-app-theme--header",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) =>
    //     params?.row?.addtionalDetails?.ReasonforNotcreadited !== "" &&
    //     params?.row?.addtionalDetails?.ReasonforNotcreadited !== undefined
    //       ? params?.row?.addtionalDetails?.ReasonforNotcreadited
    //       : "N/A",
    // },
    {
      field: "addtionalDetails.ReasonforNotcreadited",
      headerName: "Reason for Not Credited",
      sortable: false,
      width: 280,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const reason =
          params?.row?.addtionalDetails?.ReasonforNotcreadited !== "" &&
          params?.row?.addtionalDetails?.ReasonforNotcreadited !== undefined
            ? params?.row?.addtionalDetails?.ReasonforNotcreadited
            : "N/A";
        let creditedConform = params?.row?.addtionalDetails?.CreditedConform1;
        if (reason === "N/A") {
          creditedConform = "";
        }
        return (
          <>
            {creditedConform}
            <br />
            {reason}
            <br />
          </>
        );
      },
    },
    // {
    //   field: "addtionalDetails.ReasonforNotcreadited",
    //   headerName: "Reason for Not Credited",
    //   sortable: false,
    //   width: 350,
    //   headerClassName: "super-app-theme--header",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => {
    //     debugger;
    //     const reason =
    //       params?.row?.addtionalDetails?.ReasonforNotcreadited !== "" &&
    //       params?.row?.addtionalDetails?.ReasonforNotcreadited !== undefined
    //         ? params?.row?.addtionalDetails?.ReasonforNotcreadited
    //         : "N/A";

    //     // Dynamically update tooltip content based on the current row's data
    //     const tooltipContent = BankCredit.CreditedConform;

    //     return (
    //       <Tooltip title={tooltipContent}>
    //         <span>{reason}</span>
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 90,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
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
              <MenuItem onClick={PreviewCounterFile}>&nbsp;Preview Counter File </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];
  const isCashPayment = (row) => row.paymentMode === "Cash";
  const isRowSelectable = (params) => !isCashPayment(params.row);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setErrorFlag(false);
    setOpen(false);
  };
  const [open2, setOpen2] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const HandleUpdateCreditopen = async () => {
    if (BankCredit.AddtionalDetails.CreditedConformation === "" && BankCredit.CreditedDate === "") {
      setOpen2(false);
      setErrorFlag(true);
      setFlag((prevstate) => ({ ...prevstate, dateFlag: true }));
      swal1.fire({
        icon: "error",
        text: "Please fill the required fields",
        width: "550px",
        padding: "24px",
      });
    } else if (
      BankCredit.AddtionalDetails.CreditedConformation === "No" &&
      BankCredit.AddtionalDetails.ReasonforNotcreadited === ""
    ) {
      swal1.fire({
        icon: "error",
        text: "Please fill the required fields",
        width: "550px",
        padding: "24px",
        marginLeft: "144px",
      });
      setFlag((prevstate) => ({ ...prevstate, ReasonforNotcreaditedFlag: true }));
    } else if (
      BankCredit.AddtionalDetails.CreditedConformation === "Yes" &&
      BankCredit.CreditedDate === ""
    ) {
      setFlag((prevstate) => ({ ...prevstate, dateFlag: true }));
      swal1.fire({
        icon: "error",
        text: "Please fill the required fields",
        width: "550px",
        padding: "24px",
        marginLeft: "144px",
      });
    } else if (
      (BankCredit.AddtionalDetails.CreditedConformation === "Yes" &&
        BankCredit.CreditedDate !== "") ||
      (BankCredit.AddtionalDetails.CreditedConformation === "No" &&
        BankCredit.AddtionalDetails.ReasonforNotcreadited !== "")
    ) {
      // setOpen2(true);

      swal1.fire({
        icon: "success",
        text: "Details Updated Successfully",
        width: "640px",
        padding: "24px",
        marginLeft: "144px",
      });
      const selectedData1 = rows1
        .filter((obj) => selectedIds.includes(obj.id))
        .map(({ policyNo, endorsementNo }) => ({
          PolicyNo: policyNo,
          EndorsementNo: endorsementNo,
        }));

      const processedData = selectedData1.map(({ PolicyNo, EndorsementNo }) => {
        if (PolicyNo && EndorsementNo === null) {
          return { PolicyNo, EndorsementNo: "" };
        }
        if (PolicyNo && EndorsementNo) {
          return { PolicyNo: "", EndorsementNo };
        }
        return { PolicyNo, EndorsementNo };
      });

      console.log(processedData);

      await UpdateDepositsAndCredits({ policyNo: processedData, depositDetails: BankCredit });

      const Type = "Credit";
      const Policies = await AccountConfig(Type);
      console.log("Policies", Policies, BankCredit);
      setrows([...Policies]);
      setrows1([...Policies]);

      BankCredit.AddtionalDetails.CreditedConformation = "";
      BankCredit.CreditedDate = "";
      BankCredit.AddtionalDetails.ReasonforNotcreadited = "";
      console.log(BankCredit);
      setOpen1(false);
    } else {
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    }
  };

  const HandleCreditopen = async () => {
    setOpen1(true);
    // const filteredList = rowsp.filter((item) => selectedIds.includes(item.id));
    // console.log(filteredList, 111);
    // setSelectedIds(newSelection);
  };
  const HandleCreditclose = () => {
    setOpen1(false);
    setOpen2(false);
    setErrorFlag(false);
    setFlag((prevstate) => ({ ...prevstate, dateFlag: false }));
    setFlag((prevstate) => ({ ...prevstate, ReasonforNotcreaditedFlag: false }));
    BankCredit.AddtionalDetails.CreditedConformation = "";
    BankCredit.CreditedDate = "";
    BankCredit.AddtionalDetails.ReasonforNotcreadited = "";
    setBankCredit({ ...BankCredit });
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
        Bankcredits.IssuingBranch = res.data;
      });
      setBankcredits({ ...Bankcredits });
    }
    await GetNPCommonMaster().then((r) => {
      console.log(r, 2222);
      r.forEach((x) => {
        // Bankdeposite.masters
        // const Data = x.mType;
        Bankcredits.masters[x.mType] = x.mdata.filter((y) => y.mValue !== "Renewal");
        setBankcredits({ ...Bankcredits });
      });
    });
    // const Policies = await GetPolicies();
    // const filteredPolicies = Policies.filter(
    //   (x) =>
    //     x.generateDeposit === "true" &&
    //     x.generateCredit === "true" &&
    //     x.depositedConfirmation === "Yes"
    // );

    // console.log("Policies", filteredPolicies);
    // setrows([...filteredPolicies]);
    // setrows1([...filteredPolicies]);

    const Type = "Credit";
    const Policies = await AccountConfig(Type);
    console.log("Policies", Policies);
    setrows([...Policies]);
    setrows1([...Policies]);

    setLoader(false);
  }, []);

  // const handleSearch = () => {
  //   // debugger;
  //   if ((Bankcredits.FromDate !== "" && Bankcredits.ToDate !== "") || Bankcredits.Branch !== "") {
  //     const Data = rows.filter(
  //       (x) =>
  //         x.branchName === Bankcredits.Branch ||
  //         x.paymentMode === Bankcredits.PaymentMode ||
  //         (x.policyIssuedDate >= Bankcredits.FromDate && x.policyIssuedDate <= Bankcredits.ToDate)
  //     );
  //     console.log("Data", Data);
  //     setrows1([...Data]);
  //     setOpen(false);
  //   } else {
  //     // setErrorFlag(true);
  //     swal({
  //       icon: "error",
  //       text: "Please fill the Required Fields",
  //     });
  //   }
  // };
  const handleSearch = () => {
    if (
      (Bankcredits.FromDate !== "" && Bankcredits.ToDate !== "") ||
      Bankcredits.Branch !== "" ||
      Bankcredits.PaymentMode !== ""
    ) {
      const Data = rows.filter(
        (x) =>
          x.branchName === Bankcredits.Branch ||
          x.paymentMode === Bankcredits.PaymentMode ||
          (x.policyIssuedDate >= Bankcredits.FromDate && x.policyIssuedDate <= Bankcredits.ToDate)
      );
      console.log("Data", Data);

      if (Data.length === 0) {
        setOpen(true);
        swal({
          icon: "error",
          text: "No Data Found",
        });
        setrows1([...rows]);
        // setBankdeposite({ ...Bankdeposite });
      } else {
        setOpen(false);
        setrows1([...Data]);
      }

      // setrows([...Data]);
      // setrows1([...Data]);
      // setOpen(false);
    } else {
      setErrorFlag(true);
      swal1.fire({
        width: "550px",
        padding: "28px",
        icon: "error",
        text: "Please fill the Required Fields",
      });
    }

    // Bankdeposite.Branch = "";
    // Bankdeposite.PaymentMode = "";
    // Bankdeposite.FromDate = "";
    // Bankdeposite.ToDate = "";
  };

  // const ClearTheFilter = async () => {
  //   setOpen(false);
  //   setLoader(true);
  //   const Type = "Credit";
  //   const Policies = await AccountConfig(Type);
  //   console.log("Policies", Policies);
  //   setrows([...Policies]);
  //   setrows1([...Policies]);
  //   Bankcredits.Branch = "";
  //   Bankcredits.PaymentMode = "";
  //   Bankcredits.FromDate = "";
  //   Bankcredits.ToDate = "";
  //   setLoader(false);
  // };
  const ClearTheFilter = async () => {
    setOpen(false);
    setLoader(true);
    const Type = "Credit";
    const Policies = await AccountConfig(Type);
    const filteredPolicies = Policies.filter((x) => x.Type !== "Deposited");

    setrows([...filteredPolicies]);
    setrows1([...filteredPolicies]);

    Bankcredits.ToDate = "";
    Bankcredits.FromDate = "";
    Bankcredits.PaymentMode = "";
    Bankcredits.Branch = "";

    setLoader(false);
  };

  return (
    <Accordion>
      <MDBox>
        <Grid container>
          <Grid container spacing={1} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>
                <strong>Accounting / Credits</strong>
              </MDTypography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Stack justifyContent="right" direction="row"> */}
        <Grid
          container
          xs={12}
          sm={12}
          md={11.7}
          lg={11.7}
          xl={11.7}
          xxl={11.7}
          justifyContent="right"
        >
          <Stack justifyContent="right" direction="row" spacing={1} p={2}>
            {selectedIds.length > 0 && (
              <MDButton onClick={HandleCreditopen} variant="outlined" color="info">
                UPDATE
              </MDButton>
            )}
            {/* </Grid> */}
            {rows1.length > 0 ? (
              <MDButton onClick={handleOpen} variant="outlined">
                <FilterListIcon /> Filter
              </MDButton>
            ) : // </Grid>
            null}
          </Stack>
        </Grid>
        {/* </Stack> */}
        <Modal
          open={open1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style1}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <MDTypography sx={{ marginLeft: "2rem" }}>Credits</MDTypography>
                <MDButton color="white" round onClick={HandleCreditclose} sx={{ fontSize: "20px" }}>
                  X
                </MDButton>
              </Stack>

              <Stack direction="row" spacing={1.5} justifyContent="center">
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <Autocomplete
                    justifyContent="left"
                    options={Bankcredits.masters.DirectDiscount || []}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                      ...redAsterisk,
                    }}
                    value={{ mValue: BankCredit.AddtionalDetails.CreditedConformation }}
                    getOptionLabel={(option) => option.mValue || ""}
                    onChange={(e, value) => handlechange1(e, "CreditedConformation", value)}
                    renderInput={(params) => (
                      <MDInput
                        error={ErrorFlag && BankCredit.AddtionalDetails.CreditedConformation === ""}
                        helperText={
                          ErrorFlag && BankCredit.AddtionalDetails.CreditedConformation === ""
                            ? helperText
                            : ""
                        }
                        required
                        {...params}
                        label="Credited Confirmation"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  {/* <MDDatePicker
                    justifyContent="right"
                    options={{
                      dateFormat: "d/m/Y",
                      altFormat: "d/m/Y",
                      altInput: true,
                    }}
                    input={{
                      label: "Credited Date",
                      value: Bankcredits.CreditedDate,
                    }}
                    value={Bankcredits.CreditedDate || ""}
                    onChange={(e, date) => handlechange1(e, "CreditedDate", date)}
                  /> */}

                  <MDDatePicker
                    fullWidth
                    disabled={BankCredit.AddtionalDetails.CreditedConformation === "No"}
                    options={{
                      dateFormat: "d/m/Y",
                      altFormat: "d/m/Y",
                      altInput: true,
                      maxDate: new Date(),
                    }}
                    input={{
                      label: "Credited Date",
                      value: BankCredit.CreditedDate,
                      error: flag.dateFlag && BankCredit.CreditedDate === "",
                      helperText: flag.dateFlag && BankCredit.CreditedDate === "" ? helperText : "",
                      required: BankCredit.AddtionalDetails.CreditedConformation !== "No",
                      sx: redAsterisk,
                    }}
                    error={ErrorFlag && BankCredit.CreditedDate === ""}
                    helperText={ErrorFlag && BankCredit.CreditedDate === "" ? helperText : ""}
                    value={BankCredit.CreditedDate}
                    onChange={(e, date) => handlechange1(e, "CreditedDate1", date)}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" spacing={1.5} justifyContent="center">
                <Grid item xs={12} sm={12} md={10.5} lg={10.5} xl={10.5} xxl={10.5}>
                  {BankCredit.AddtionalDetails.CreditedConformation === "No" && (
                    <Autocomplete
                      justifyContent="left"
                      options={ReasonforNotcreadited || []}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                        ...redAsterisk,
                      }}
                      value={{ mValue: BankCredit.CreditedConform }}
                      getOptionLabel={(option) => option.mValue || ""}
                      onChange={(e, value) => handlechange1(e, "CreditedConform", value)}
                      renderInput={(params) => (
                        <MDInput
                          error={ErrorFlag && BankCredit.CreditedConform === ""}
                          helperText={
                            ErrorFlag && BankCredit.CreditedConform === "" ? helperText : ""
                          }
                          required
                          {...params}
                          label="Reason for not Credited"
                        />
                      )}
                    />
                  )}
                </Grid>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center">
                <Grid item xs={12} sm={12} md={10.5} lg={10.5} xl={10.5} xxl={10.5}>
                  {BankCredit.AddtionalDetails.CreditedConformation === "No" &&
                    BankCredit.CreditedConform !== "" && (
                      <MDInput
                        // placeholder="Reason for not Credited"
                        label="Reason"
                        name="ReasonforNotcreadited"
                        value={BankCredit.AddtionalDetails.ReasonforNotcreadited}
                        onChange={(e, value) => handlechange1(e, "ReasonforNotcreadited", value)}
                        error={
                          flag.ReasonforNotcreaditedFlag &&
                          BankCredit.AddtionalDetails.ReasonforNotcreadited === ""
                        }
                        helperText={
                          flag.ReasonforNotcreaditedFlag &&
                          BankCredit.AddtionalDetails.ReasonforNotcreadited === ""
                            ? helperText
                            : ""
                        }
                        required
                        sx={redAsterisk}
                        // input={{
                        //   error: ErrorFlag,
                        //   helperText: ErrorFlag,
                      />
                    )}
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="center" paddingLeft="80px">
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDButton
                    variant="contained"
                    justifyContent="right"
                    onClick={HandleUpdateCreditopen}
                    // sx={{ marginTop: "26px" }}
                  >
                    Update
                  </MDButton>
                </Grid>
              </Stack>
            </Stack>
          </MDBox>
        </Modal>
        <Modal
          open={open2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="right">
                <MDButton color="white" round onClick={HandleCreditclose} textAlign="left">
                  x
                </MDButton>
              </Stack>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Submitted} sx={{ width: "26%" }} />
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
                  onClick={HandleCreditclose}
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
                  <MDTypography sx={{ marginRight: "2rem" }}>Credits</MDTypography>
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
                    options={Bankcredits.IssuingBranch || []}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    value={{ mValue: Bankcredits.Branch }}
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
                    value={Bankcredits.SubBranch}
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
                      value: Bankcredits.FromDate,
                      // sx: redAsterisk,
                      // error: ErrorFlag && Bankdeposite.FromDate === "",
                      // helperText: ErrorFlag && Bankdeposite.FromDate === "" ? helperText : "",
                      // required: true,
                    }}
                    value={Bankcredits.FromDate}
                    onChange={(e, date) => handleChange(e, "FromDate", date)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDDatePicker
                    fullWidth
                    disabled={Bankcredits.FromDate === ""}
                    options={{
                      dateFormat: "d/m/Y",
                      altFormat: "d/m/Y",
                      altInput: true,
                      // minDate: new Date(),
                      minDate: getMinDateForToDate(Bankcredits.FromDate),
                    }}
                    input={{
                      label: "Issued Date To",
                      value: Bankcredits.ToDate,
                      sx: redAsterisk,
                      error: Bankcredits.FromDate !== "" && ErrorFlag && Bankcredits.ToDate === "",
                      helperText:
                        Bankcredits.FromDate !== "" && ErrorFlag && Bankcredits.ToDate === ""
                          ? helperText
                          : "",
                      required: Bankcredits.FromDate !== "",
                    }}
                    value={Bankcredits.ToDate}
                    onChange={(e, date) => handleChange(e, "ToDate", date)}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="left">
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} mx={4.4}>
                  <Autocomplete
                    options={Bankcredits.masters.OfflinePayment || []}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    value={{ mValue: Bankcredits.PaymentMode }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) => handleChange(e, "PaymentMode", value)}
                    renderInput={(params) => <MDInput {...params} label="Payment Mode" />}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" justifyContent="center" spacing={30} paddingLeft={2}>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDButton onClick={ClearTheFilter} variant="contained">
                    Clear
                  </MDButton>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} paddingRight={2.8}>
                  <MDButton onClick={handleSearch} variant="contained">
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
                    sx={{ fontSize: "14px", fontWeight: "400" }}
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
                    disableSelectionOnClick
                    isRowSelectable={isRowSelectable}
                    disableColumnMenu={!false}
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

export default BankCredits;
