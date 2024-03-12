import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";

// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import LogoutIcon from "@mui/icons-material/Logout";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import swal from "sweetalert";
import { setPOSPInput, useDataController } from "../../../../../BrokerPortal/context";
import { DeleteFile, CreatePOSP, UploadFiles, SendNotification } from "../data/index";
import GirlImg from "../../../../../../assets/images/BrokerPortal/GirlImg.png";
import { postRequest } from "../../../../../../core/clients/axiosclient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 726,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function BankDetails({
  handleBack,
  setFlags,
  flags,
  // bankData,
  open,
  bankDetails,
  setBankData,
  setOpen,
  setBankDetails,
  setCheckState,
  checkState,
  POSPJsonNew,
  masterSelection,
  // setMasterSelection,
  // setAddressCity,
  addressCity,
  kycDetails,
  qualCount,
  DocData,
}) {
  const [controller, dispatch] = useDataController();
  const { POSPJson, masterSelectionPosp, areaSelected, ApplicationNo } = controller;
  console.log("POSPJSON", POSPJson, masterSelectionPosp, POSPJsonNew);

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.danger,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const theme = createTheme({
    status: {
      danger: blue[500],
    },
  });

  const [checkbutton, setCheckButton] = useState(true);
  const checkBoxClick = () => {
    setCheckState(!checkState);
    setCheckButton(false);
  };

  const handleBankDetails = (event) => {
    if (event.target.name === "BankName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(event.target.value) || event.target.value === "") {
        const newValue = { ...bankDetails, [event.target.name]: event.target.value };
        setBankDetails(newValue);
      }
    } else if (event.target.name === "BranchName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(event.target.value) || event.target.value === "") {
        const newValue = { ...bankDetails, [event.target.name]: event.target.value };
        setBankDetails(newValue);
      }
    } else {
      const newValue = { ...bankDetails, [event.target.name]: event.target.value };
      setBankDetails(newValue);
    }
  };

  const handleValidate = (e) => {
    if (e.target.name === "AccountNo") {
      const AccNoRegex = /^[0-9]\d{9,18}$/;
      if (!AccNoRegex.test(e.target.value)) {
        const newValue = { ...bankDetails, [e.target.name]: e.target.value };
        setBankDetails(newValue);
        setFlags((prevState) => ({ ...prevState, accountNoError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, accountNoError: false }));
      }
    } else if (e.target.name === "IfscCode") {
      const ifscRegex = /^[A-Z]{4}0[0-9]{6}$/;
      if (!ifscRegex.test(e.target.value)) {
        const newValue = { ...bankDetails, [e.target.name]: e.target.value };
        setBankDetails(newValue);
        setFlags((prevState) => ({ ...prevState, ifscCodeError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, ifscCodeError: false }));
      }
    }
  };

  const UploadBankData = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        setBankDetails((prevState) => ({ ...prevState, BankDetails: result.data[0].fileName }));
        setBankData(file);
      }
    });
  };

  const handleFileUpload = async (event, type) => {
    await UploadBankData(event.target.files[0], type);
    console.log("files", event.target.files[0]);
  };

  const onSubmit = async () => {
    setPOSPInput(dispatch, { ...POSPJson, BankDetails: bankDetails });
    if (
      bankDetails.BankName === "" ||
      bankDetails.AccountNo === "" ||
      bankDetails.IfscCode === "" ||
      bankDetails.BranchName === "" ||
      bankDetails.BankDetails === ""
    ) {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
      if (flags.accountNoError === true) {
        swal({
          icon: "error",
          text: "Please fill valid Account Number",
        });
      } else if (flags.ifscCodeError === true) {
        swal({
          icon: "error",
          text: "Please fill valid ifsc code",
        });
      } else {
        setFlags((prevState) => ({
          ...prevState,
          errorFlag: false,
          ifscCodeError: false,
          accountNoError: false,
        }));
        if (checkState === true) {
          if (Object.keys(POSPJsonNew || {}).filter((x) => x === "saveFlag").length === 0) {
            if (flags.isCreate === true) {
              const newValue = {
                ...POSPJson,
                BankDetails: { ...bankDetails },
                mastersSelected: { ...masterSelectionPosp },
                areaSelected: { ...areaSelected },
                Status: "Review Pending",
                ApplicationNo,
                IC: process.env.REACT_APP_TITLE,
                Image: process.env.REACT_APP_IMAGEURL,
              };
              await CreatePOSP(newValue, ApplicationNo).then((results) => {
                if (results.status === 2) {
                  setOpen(true);
                } else {
                  swal({ icon: "error", text: "Error in creating Agent" });
                }
              });
            } else {
              const newValue = {
                ...POSPJsonNew,
                BankDetails: { ...bankDetails },
                checkState,
                EducationDetails: qualCount,
                saveFlag: true,
                mastersSelected: { ...masterSelection },
                areaSelected: { ...addressCity },
                OtherDocs: kycDetails.OtherDocs,
                PAN: kycDetails.PAN,
                OtherDocsFront: kycDetails.OtherDocsFront,
                OtherDocsBack: kycDetails.OtherDocsBack,
                OtherDocNumber: kycDetails.OtherDocNumber,
                Pan: kycDetails.Pan,
                otherDocSelectedFlag: flags.otherDocSelectedFlag,
                DocData,
                ApplicationNo,
                Status: "Review Pending",
                IC: process.env.REACT_APP_TITLE,
                Image: process.env.REACT_APP_IMAGEURL,
              };
              await postRequest(`Partner/UpdatePOSPDetails?completeFlag=${true}`, newValue).then(
                (res) => {
                  if (res.data.status === 3) {
                    setOpen(true);
                  } else {
                    swal({ icon: "error", text: "Error in creating Agent" });
                  }
                }
              );
            }
          } else {
            const newValue = {
              ...POSPJsonNew,
              BankDetails: { ...bankDetails },
              checkState,
              EducationDetails: qualCount,
              saveFlag: true,
              mastersSelected: { ...masterSelection },
              areaSelected: { ...addressCity },
              OtherDocs: kycDetails.OtherDocs,
              PAN: kycDetails.PAN,
              OtherDocsFront: kycDetails.OtherDocsFront,
              OtherDocsBack: kycDetails.OtherDocsBack,
              OtherDocNumber: kycDetails.OtherDocNumber,
              Pan: kycDetails.Pan,
              otherDocSelectedFlag: flags.otherDocSelectedFlag,
              DocData,
              ApplicationNo,
              Status: "Review Pending",
              IC: process.env.REACT_APP_TITLE,
              Image: process.env.REACT_APP_IMAGEURL,
            };
            await postRequest(`Partner/UpdatePOSPDetails?completeFlag=${true}`, newValue).then(
              (res) => {
                if (res.data.status === 3) {
                  setOpen(true);
                } else {
                  swal({ icon: "error", text: "Error in creating Agent" });
                }
              }
            );
          }
        } else {
          swal({
            icon: "error",
            text: "Please check the CheckBOX",
          });
        }
      }
    }
  };

  const handleCustomerHomePage = () => {
    window.location.replace(process.env.REACT_APP_HomePage);
  };
  const handleClose = () => {
    setOpen(false);
    handleCustomerHomePage();
  };

  const handleDeleteFile = async (type, fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        if (type === "BankName") {
          setBankData();
        }
      }
    });
  };

  const handleSaveForLater = async () => {
    setFlags((prev) => ({ ...prev, saveButtonDisable: true }));
    if (flags.accountNoError === true) {
      swal({ icon: "error", text: "Please fill valid Account Number" });
    } else if (flags.ifscCodeError === true) {
      swal({ icon: "error", text: "Please fill valid ifsc code" });
    } else {
      setFlags((prevState) => ({
        ...prevState,
        errorFlag: false,
        ifscCodeError: false,
        accountNoError: false,
      }));
      if (checkState === true) {
        const newValue = {
          ...POSPJsonNew,
          BankDetails: { ...bankDetails },
          checkState,
          EducationDetails: qualCount,
          saveFlag: true,
          mastersSelected: { ...masterSelection },
          areaSelected: { ...addressCity },
          OtherDocs: kycDetails.OtherDocs,
          PAN: kycDetails.PAN,
          OtherDocsFront: kycDetails.OtherDocsFront,
          OtherDocsBack: kycDetails.OtherDocsBack,
          OtherDocNumber: kycDetails.OtherDocNumber,
          Pan: kycDetails.Pan,
          otherDocSelectedFlag: flags.otherDocSelectedFlag,
          DocData,
          ApplicationNo,
        };
        if (Object.keys(POSPJsonNew || {}).filter((x) => x === "saveFlag").length === 0) {
          if (flags.isCreate === true) {
            await CreatePOSP(newValue, ApplicationNo).then((data) => {
              if (data.status === 2) {
                setFlags((prev) => ({ ...prev, isCreate: false }));
              }
            });
          } else {
            await postRequest(`Partner/UpdatePOSPDetails`, newValue);
          }
        } else {
          await postRequest(`Partner/UpdatePOSPDetails`, newValue);
        }
        const notificationData = {
          proposalNo: "",
          policyNo: "",
          transactionId: "",
          customerId: "",
          key: POSPJsonNew.EmailId,
          keyType: "",
          communicationId: 130,
          referenceId: 62,
          ICPDF: true,
          ISDMS: false,
        };
        await SendNotification(POSPJsonNew.EmailId, notificationData);
        setFlags((prev) => ({ ...prev, saveButtonDisable: false }));
      } else {
        swal({ icon: "error", text: "Please check the CheckBOX" });
      }
    }
  };

  return (
    <MDBox sx={{ alignItems: "center" }}>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <Grid container justifyContent="center">
            <MDBox component="img" src={GirlImg} sx={{ width: "8.7rem", height: "12.3rem" }} />
          </Grid>
          <MDTypography>Your Application is submitted succesfully</MDTypography>
          <MDTypography>
            you will be recieving the further details shortly to your email
          </MDTypography>
          <Grid container justifyContent="center">
            <MDButton color="info" variant="contained" onClick={handleClose}>
              Close
            </MDButton>
          </Grid>
        </MDBox>
      </Modal>
      <Grid container flexDirection="column" display="flex" spacing="1rem">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
            Bank Details
          </MDTypography>
        </Grid>
        <Grid
          container
          spacing="1.50rem"
          // flexDirection="row"
          // display="flex"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
        >
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Bank Account Number"
              fullWidth
              name="AccountNo"
              onChange={handleBankDetails}
              value={bankDetails.AccountNo}
              onBlur={handleValidate}
              inputProps={{ minLength: 9, maxLength: 18 }}
              error={bankDetails.AccountNo === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag && bankDetails.AccountNo === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
            {flags.accountNoError && bankDetails.AccountNo !== "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill valid Account Number
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Bank Name"
              fullWidth
              name="BankName"
              onChange={handleBankDetails}
              value={bankDetails.BankName}
              error={bankDetails.BankName === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag && bankDetails.BankName === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="IFSC Code"
              fullWidth
              name="IfscCode"
              onChange={handleBankDetails}
              value={bankDetails.IfscCode}
              onBlur={handleValidate}
              inputProps={{ maxLength: 11 }}
              error={bankDetails.IfscCode === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag && bankDetails.IfscCode === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
            {flags.ifscCodeError && bankDetails.IfscCode !== "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill valid IFSC code
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Branch Name"
              fullWidth
              name="BranchName"
              onChange={handleBankDetails}
              value={bankDetails.BranchName}
              error={bankDetails.BranchName === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag && bankDetails.BranchName === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
        </Grid>
        <Grid
          flexDirection="row"
          display="flex"
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ mt: "3rem", mx: "1rem" }}
        >
          <MDButton
            size="medium"
            startIcon={<LogoutIcon />}
            // onClick={handleUpload}
            component="label"
            sx={{
              // color: "#1976D2",
              textSize: "0.87rem",
              borderRadius: "0.25rem",
              borderColor: "#1976D2",
              border: 1,
            }}
          >
            Upload Passbook/Cancelled cheque
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e, "BankName")}
            />
          </MDButton>
          <MDTypography
            sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "12px" }}
          >
            {bankDetails.BankDetails !== "" ? bankDetails.BankDetails : null}{" "}
            {bankDetails.BankDetails !== "" ? (
              <CancelIcon
                sx={{ ml: "2px" }}
                color="primary"
                onClick={() => handleDeleteFile("BankName", bankDetails.BankDetails)}
              />
            ) : null}
          </MDTypography>
        </Grid>
        <Grid>
          {flags.errorFlag && bankDetails.BankDetails === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px", ml: "204px", mt: "7px" }}>
              Please upload the Passbook
            </MDTypography>
          ) : null}
        </Grid>
        <Grid
          item
          flexDirection="row"
          display="flex"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ mt: "3rem" }}
        >
          <ThemeProvider theme={theme}>
            <CustomCheckbox checked={checkState} onChange={checkBoxClick} />
          </ThemeProvider>
          {/* <Checkbox checked={checkState} color="primary" onChange={checkBoxClick} /> */}
          <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "10px" }}>
            I hereby declare and confirm that all the above information are true to the best of my
            knowledge and belief and request you to register me for Agent online training and
            examination.
          </MDTypography>
        </Grid>
      </Grid>
      <MDBox display="flex" flexDirection="row" sx={{ marginBottom: "239px", marginTop: "30px" }}>
        <Grid container justifyContent="flex-start">
          <MDButton variant="outlined" color="info" onClick={handleBack} startIcon={<ArrowBack />}>
            Back
          </MDButton>
        </Grid>
        <Grid container justifyContent="flex-end">
          <MDButton
            variant="outlined"
            color="info"
            sx={{ marginRight: "60px" }}
            onClick={handleSaveForLater}
            disabled={flags.saveButtonDisable}
          >
            Save for later
          </MDButton>
          <MDButton disabled={checkbutton} variant="contained" color="info" onClick={onSubmit}>
            Submit
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default BankDetails;
