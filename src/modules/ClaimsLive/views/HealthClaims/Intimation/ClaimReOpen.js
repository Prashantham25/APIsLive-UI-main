import React, { useState } from "react";
import {
  Card,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import Swal from "sweetalert2";
import magmapayment from "assets/images/Magma/magmapayment.png";
import { useNavigate } from "react-router-dom";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
// import MDBox from "../../../../../components/MDBox";
import {
  UploadFiles,
  DeleteFile,
  SearchClaimDetailsByRegClaimNo,
  getProdPartnermasterData,
  UpdateClaimDetails,
  updateStageStatusIdByTno,
  SaveClaimHistory,
} from "../data";

function ClaimReOpen() {
  const [SearchObj, SetSearchObj] = useState({ claimNo: "", claimStatus: "" });
  const [res, setRes] = useState([]);
  const [statusRes, setStatusRes] = useState([]);
  // const [dialogflg, setDialogflg] = useState(false);
  const [invalidClaimStatusdialogflg, setInvalidClaimStatusdialogflg] = useState(false);
  const [claimNoErr, setClaimNoErr] = useState(false);
  const [claimNoInput, setClaimNoInput] = useState(false);
  const [claimdetailsflg, setClaimdetailsflg] = useState(false);
  const [reopenremarksErr, setReopenremarksErr] = useState(false);
  const [filename, setFilename] = useState({ docId: "" });
  const [backdropFlg, setBackdropFlg] = useState(false);

  // const Navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "claimNo") {
      SearchObj[e.target.name] = e.target.value;
      SetSearchObj((prev) => ({ ...prev, ...SearchObj }));
      const claimNoRegex = /^[A-Z]{4}\/\d{4}\/\d{2}\/\d{2}\/\d{8}$/;
      if (claimNoRegex.test(e.target.value)) {
        setClaimNoErr(false);
      } else {
        setClaimNoErr(true);
      }
    }
    if (e.target.name === "ReOpenRemarks") {
      const { value } = e.target;
      if (value.length === 250) {
        setReopenremarksErr(true);
      } else {
        setReopenremarksErr(false);
      }
      res[0].transactionDataDTO[0].reopenReasonIds = value;
      // setting this remark node to get the claim reopened report
      res[0].transactionDataDTO[0].remark = value;
      setRes((prev) => ({ ...prev, ...res }));
    }
  };

  const handleSearchClaim = async () => {
    if (SearchObj.claimNo === "") {
      setClaimNoErr(true);
    } else {
      setClaimNoErr(false);
      const dataByClaimNo = await SearchClaimDetailsByRegClaimNo("", SearchObj.claimNo);
      const data = dataByClaimNo.finalResult;
      if (data !== null) {
        const data1 = { productId: 1022, MasterType: "ClaimStatus" };
        const claimStatusRes = await getProdPartnermasterData(data1.productId, data1.MasterType);
        if (claimStatusRes.status === 200) {
          setStatusRes([claimStatusRes.data]);
          claimStatusRes.data.filter((x) => {
            if (parseInt(x.mID, 10) === data.claimStatusId) {
              SearchObj.claimStatus = x.mValue;
              SetSearchObj((prev) => ({ ...prev, ...SearchObj }));
            }
            return true;
          });
        }
        if (SearchObj.claimStatus === "Claim Closed" || SearchObj.claimStatus === "Claim Denied") {
          data.transactionDataDTO[0].reopenReasonIds = "";
          setRes([data]);
          setClaimdetailsflg(true);
          setClaimNoInput(true);
        } else {
          setInvalidClaimStatusdialogflg(true);
        }
      } else {
        setClaimdetailsflg(false);
        setClaimNoInput(false);
      }
    }
  };

  const handleRemoveFile = async (fileName) => {
    await DeleteFile(fileName)
      .then((result) => {
        if (result.data.status === 5) {
          res[0].transactionDataDTO[0].transactionDetails.documentDetails =
            res[0].transactionDataDTO[0].transactionDetails.documentDetails.filter(
              (x) => x.docId !== fileName
            );
          setRes((prev) => ({ ...prev, ...res }));
          filename.docId = "";
          setFilename((prev) => ({ ...prev, ...filename }));
        } else {
          console.log("file is not deleted deleted :");
        }
      })
      .catch((error) => {
        console.log("api response error for deleting a file: ", error);
      });
  };

  const navigate = useNavigate();
  const handleTrackClaims = () => {
    navigate(`/Claims/Home`, { state: { productCode: "MagmaHospiCash01" } });
  };

  const handleReOpenClaim = async () => {
    statusRes[0].filter((x) => {
      if (x.mValue === "Claim ReOpened") {
        res[0].claimStatusId = parseInt(x.mID, 10);
        setRes((prev) => ({ ...prev, ...res }));
      }
      return true;
    });
    const updateClaim = await UpdateClaimDetails(res[0]);
    if (updateClaim.status === 1) {
      const save1 = await updateStageStatusIdByTno(
        updateClaim.finalResult.transactionDataDTO[0].transactionNumber,
        updateClaim.finalResult.claimStatusId
      );
      const data = {
        TransactionNumber: updateClaim.finalResult.transactionDataDTO[0].transactionNumber,
        CreatedBy: localStorage.getItem("userId"),
      };
      await SaveClaimHistory(data);
      // setDialogflg(true);
      console.log("save1", save1);

      Swal.fire({
        html: `<img src=${magmapayment} alt="success image" style="display: block; margin: 0 auto;">
        <p style="color: green; font-weight: bold; margin: 10px 0;">
       Claim reopened successfully
        </p>`,
        showConfirmButton: true,
        // cancelButtonColor: "red",
        confirmButtonColor: "#d33",
        allowOutsideClick: false,
        width: 600,
        alignItems: "center",
        confirmButtonText: "Go to Home",
      }).then((res1) => {
        if (res1.isConfirmed) {
          handleTrackClaims();
        }
      });
    }
  };

  const handleInvalidClaimStatusDialogClose = () => {
    setInvalidClaimStatusdialogflg(false);
  };

  const UploadFile = async (file) => {
    setBackdropFlg(true);
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData)
      .then((result) => {
        if (result.data[0].fileName !== "") {
          filename.docId = result.data[0].docid;
          setFilename((prev) => ({ ...prev, ...filename }));
          const fileObj = {
            docId: result.data[0].docid,
            docName: "",
            UploadDocDate: new Date().toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }),
            fileName: result.data[0].fileName,
          };
          res[0].transactionDataDTO[0].transactionDetails.documentDetails.push(fileObj);
          setRes((prev) => ({ ...prev, ...res }));
        }
      })
      .catch((error) => {
        console.log("error during uploading file :", error);
      });
    setBackdropFlg(false);
  };
  const handleProfileChange = (e) => {
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
        text: "Only PDF, DOC, DOCX, PNG, JPG and JPEG files are allowed.",
      });
      return;
    }
    UploadFile(file);
  };

  // const handleGoToHome = () => {
  //   Navigate(`/Claims/Home`, { state: { productCode: "MagmaHospiCash01" } });
  // };

  const handleBackdropClose = () => {
    setBackdropFlg(false);
  };
  return (
    <Card>
      <>
        <Grid container p={2}>
          <MDTypography variant="body1">Re-Open Claims</MDTypography>
        </Grid>
        <Grid container spacing={4} p={2} justifyContent="center">
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Claim No"
              name="claimNo"
              required="true"
              placeholder="Enter"
              error={claimNoErr}
              inputProps={{ maxLength: 24 }}
              disabled={claimNoInput}
              value={SearchObj.claimNo}
              onChange={(e) => handleChange(e)}
            />
            {claimNoErr === true ? (
              <MDTypography sx={{ color: "red", fontSize: "13px" }}>
                Enter Correct details to re open claim
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <MDButton
              onClick={handleSearchClaim}
              variant="contained"
              color="error"
              disabled={SearchObj.claimNo === "" || claimdetailsflg || claimNoErr}
              sx={{
                ":hover": {
                  bgcolor: "#24a0ed",
                },
              }}
            >
              Search Claim
            </MDButton>
          </Grid>
        </Grid>
        <Dialog
          open={invalidClaimStatusdialogflg}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "700px",
                maxHeight: "380px",
              },
            },
          }}
        >
          <DialogContent>
            <Grid container justifyContent="flex-end">
              <MDButton
                startIcon={<CloseIcon />}
                sx={{ fontSize: "1rem" }}
                justifyContent="flex-end"
                alignItems="flex-end"
                variant="text"
                color="black"
                onClick={handleInvalidClaimStatusDialogClose}
              />
            </Grid>

            <Grid container justifyContent="center">
              <DialogTitle>
                <ErrorIcon color="error" fontSize="large" />
              </DialogTitle>
            </Grid>

            <Grid mt={3} container justifyContent="center">
              <DialogTitle id="alert-dialog-title" sx={{ color: "red", lineHeight: "0" }}>
                Closed or Rejected claim can only be re-opened
              </DialogTitle>
            </Grid>
            <Grid mt={3} container justifyContent="center">
              <MDButton
                onClick={handleInvalidClaimStatusDialogClose}
                justifyContent="flex-end"
                alignItems="flex-end"
                variant="contained"
                color="error"
                ml={25}
              >
                Close
              </MDButton>
            </Grid>
          </DialogContent>
        </Dialog>
      </>
      {claimdetailsflg && (
        <>
          <Grid container p={2}>
            <MDTypography variant="body1">Claim Details</MDTypography>
          </Grid>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Claim Number"
                name="claimNumber1"
                value={res[0].claimNumber}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="COI No" name="policyNo" value={res[0].policyNo} disabled />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="UHID ID"
                name="memberId"
                value={res[0].claimBasicDetails.memberDetails.memberId}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Patient Name"
                name="insuredname"
                value={res[0].claimBasicDetails.memberDetails.insuredName}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Claim Status"
                name="ClaimStatus"
                value={SearchObj.claimStatus}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Re-Open Remarks"
                name="ReOpenRemarks"
                placeholder="Enter"
                inputProps={{ maxLength: 250 }}
                required="true"
                value={res[0].transactionDataDTO[0].reopenReasonIds}
                onChange={(e) => handleChange(e)}
              />
              {reopenremarksErr === true ? (
                <MDTypography sx={{ color: "red", fontSize: "13px" }}>
                  reached maximum allowed characters(250)
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="body1" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography variant="body1">Upload Document</MDTypography>
            </Grid>
            {filename.docId === "" && (
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                    style={{ display: "none" }}
                    onChange={(e) => handleProfileChange(e)}
                    onClick={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <MDButton variant="outlined" color="error" component="span" size="small">
                    Upload
                  </MDButton>
                </label>
                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={backdropFlg}
                  onClick={handleBackdropClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Grid>
            )}
            {filename.docId !== "" && (
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <MDTypography variant="h6">{filename.docId}</MDTypography>
                  <IconButton onClick={() => handleRemoveFile(filename.docId)}>
                    <CancelIcon color="error" fontSize="small" />
                  </IconButton>
                </Stack>
              </Grid>
            )}
          </Grid>
          <Grid container justifyContent="right" p={2} spacing={2}>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDButton
                justifyContent="right"
                variant="contained"
                color="error"
                onClick={handleReOpenClaim}
                disabled={res[0].transactionDataDTO[0].reopenReasonIds === ""}
              >
                Re-Open Claim
              </MDButton>
            </Grid>
          </Grid>
          {/* <Dialog
            open={dialogflg}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "730px",
                  maxHeight: "380px",
                },
              },
            }}
          >
            <DialogContent>
              <Grid container justifyContent="center">
                <MDBox
                  component="img"
                  src={magmapayment}
                  sx={{ maxHeight: "15.5rem", width: 120, spacing: "0rem", m: "0" }}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                />
              </Grid>

              <Grid mt={3} container justifyContent="center">
                <DialogTitle id="alert-dialog-title" sx={{ color: "black", lineHeight: "0" }}>
                  Claim No ({res[0].claimNumber}) ReOpened Successfully
                </DialogTitle>
              </Grid>
              <Grid mt={3} container justifyContent="center">
                <MDButton
                  onClick={handleGoToHome}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  variant="contained"
                  color="error"
                  ml={25}
                >
                  Go To Home
                </MDButton>
              </Grid>
            </DialogContent>
          </Dialog> */}
        </>
      )}
    </Card>
  );
}
export default ClaimReOpen;
