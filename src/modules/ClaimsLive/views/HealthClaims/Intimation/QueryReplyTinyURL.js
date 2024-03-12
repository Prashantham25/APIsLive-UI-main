import React, { useState, useEffect } from "react";
import Magma from "assets/images/BrokerPortal/CompanyLogos/Magma.png";
import {
  Grid,
  Card,
  TextField,
  IconButton,
  Stack,
  ImageListItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import CancelIcon from "@mui/icons-material/Cancel";
import MDButton from "components/MDButton";
import magmapayment from "assets/images/Magma/magmapayment.png";
import { useLocation } from "react-router-dom";
import {
  sendOTP,
  validateOtp,
  SearchClaimDetailsByClaimNo, // autofetch the data to the TextField
  GetPolicyInfoByPolicyNumber, // to get policy information (mobile no,emailId)
  UploadFiles, // save the uploaded document
  DeleteFile, // file delete
  UpdateClaimDetails, // BY Clicking on Submit
  updateStageStatusIdByTno, // BY Clicking on Submit
  EventCommunicationExecution, // for triggerring sms and Email
  getProdPartnermasterData,
} from "../data/index";

function Timer({ counter }) {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      Click On Resend OTP in 00:{counter}
    </Grid>
  );
}
function QueryReplyTinyURL() {
  const [upload, setUpload] = useState([]);
  const [query, setQuery] = useState("");
  const [nextotp, SetnextOtp] = useState(false);
  const [errorR, setError] = useState({ Otperror: false });
  const [otperrorflag, setotperrorflag] = useState(false);
  const [counter, setCounter] = useState(60);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [startCounterResend, setStartCounterResend] = useState(false);
  const [otpdisabled, setOtpdisabled] = useState(false);
  const [validateotpdisabled, setvalidateotpdisabled] = useState(true);
  const [aftervalidate, setAftervalidate] = useState(false);
  const [mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [sendotp, setSendOtp] = useState(false);
  const [claimdata, setClaimdata] = useState([]);
  const mes = "Please fill the required field";
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
    const ClaimNo = new URLSearchParams(search).get("ClaimNo");
    const claimdetail = await SearchClaimDetailsByClaimNo(ClaimNo);
    console.log("searchclaimdetailsbyclaimno response", claimdetail);
    claimdetail.claimStatusId = 119;
    const arr1 = [];
    claimdetail.transactionDataDTO[0].transactionDetails.queryDetails.forEach((x) => {
      const obj = {
        docId: "",
        docName: x.StatusValue,
        UploadDocDate: "",
        fileName: "",
      };
      arr1.push(obj);
      console.log("uploaded document into the json", claimdetail);
    });
    setUpload(arr1);
    setQuery({ ...claimdetail });

    const policyData = await GetPolicyInfoByPolicyNumber(claimdetail.policyNo);
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
    setOtpData(sendOtpData);
    setMobile(policyData.policy_details[0].policyRequest.ProposerDetails.MobileNo);
    setEmail(policyData.policy_details[0].policyRequest.ProposerDetails.EmailId);
    console.log("policyData", policyData);
  }, []);
  console.log("setQuery123", query);

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

  const onValidateOtp = async () => {
    if (validateOtpData.otp !== "") {
      setError((prevState) => ({ ...prevState, Otperror: true }));
    }
    try {
      validateOtpData.email = sendOtpData.email;
      validateOtpData.userName = sendOtpData.email;
      const validate = await validateOtp(validateOtpData);
      if (validate.status === 200) {
        setStartCounterFlag(false);
        setvalidateotpdisabled(true);
        setStartCounterResend(false);
        setAftervalidate(true);
        if (nextotp.UHID !== "") {
          Swal.fire({
            icon: "success",
            text: "You are Successfully verified",
            allowOutsideClick: false,
            showCloseButton: true,
          });
        }
      }
    } catch (error) {
      console.log("Error during OTP validation:", error);
      setotperrorflag(true);
    }

    const data2 = { ProductId: 1022, MasterType: "ClaimStatus" };
    const dataa = await getProdPartnermasterData(data2.ProductId, data2.MasterType);
    setClaimdata([...dataa.data]);
  };

  const handleChange = (e) => {
    if (e.target.name === "otp") {
      if (e.target.value.length < 7) {
        const numRegex = /^[0-9]*$/;
        if (numRegex.test(e.target.value)) {
          validateOtpData[e.target.name] = e.target.value;
          setValidateOtp((prev) => ({ ...prev, ...validateOtpData }));
        }
      }
    }
  };
  const UploadImage = async (file, id) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      console.log("result", result);
      if (result.data[0].fileName !== "") {
        const docId = result.data[0].docid;
        const newUpload = [...upload];
        newUpload[id].docId = docId;
        setUpload(newUpload);
      }
    });
  };
  console.log("uploaddocumentarray", upload);

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
    const newUpload = upload;
    newUpload[id].fileName = e.target.files[0].name;
    newUpload[id].UploadDocDate = new Date();
    setUpload(newUpload);
    setDisableSubmit(false);
    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });
    UploadImage(e.target.files[0], id);
    Swal.fire({
      icon: "success",
      text: "Document Uploaded Successfully",
      allowOutsideClick: false,
      showCloseButton: true,
    });
  };
  console.log("upload console", upload);

  const handleRemoveRow = async (id) => {
    const res = await DeleteFile(upload[id].fileName);
    console.log("123", res);
    if (res.data.status === 5) {
      upload[id].docId = "";
      upload[id].UploadDocDate = "";
      upload[id].fileName = "";
      upload[id].fileName = "";
      setUpload([...upload]);
      if (upload.some((file) => file.fileName !== "")) {
        setDisableSubmit(false);
      } else {
        setDisableSubmit(true);
      }
      console.log("delete", upload);
    }
  };

  const handlePatientCommentsChange = (e) => {
    query.transactionDataDTO[0].transactionDetails.patientComments = e.target.value;
    setQuery({ ...query });
  };

  const onSubmit = async () => {
    setLoading(true);
    if (query.transactionDataDTO[0].transactionDetails.documentDetails) {
      upload.forEach((x) => {
        if (x.fileName !== "") {
          query.transactionDataDTO[0].transactionDetails.documentDetails.push(x);
          console.log("afterpusheddoc", query);
          setUpload(upload);
          setQuery(query);
        }
      });
    }
    claimdata.filter((x) => {
      if (query.claimFields === "Query+Investigation") {
        if (x.mValue === "Referred for Investigation") {
          query.claimStatusId = x.mID;
          query.claimStatus = x.mValue;
        }
      } else if (query.claimFields === "Query") {
        if (x.mValue === "Query Reply Received") {
          query.claimStatusId = x.mID;
          query.claimStatus = x.mValue;
        }
      }
      return true;
    });

    const save = await UpdateClaimDetails(query);
    console.log("173", save);
    if (save.status === 1) {
      const save1 = await updateStageStatusIdByTno(
        save.finalResult.transactionDataDTO[0].transactionNumber,
        save.finalResult.claimStatusId
      );
      console.log("save1", save1);
      const claimsms = {
        communicationId: 242,
        keyType: "MagmaHealth",
        key: query.claimNumber,
        stakeHolderDetails: [
          {
            communicationType: "SMS",
            stakeholderCode: "CUS",
            communicationValue: mobile,
          },
        ],
      };
      const claimEmail = {
        communicationId: 228,
        keyType: "MagmaHealth",
        key: query.claimNumber,
        stakeHolderDetails: [
          {
            communicationType: "Email",
            stakeholderCode: "CUS",
            communicationValue: Email,
          },
        ],
      };
      await EventCommunicationExecution(claimsms);
      await EventCommunicationExecution(claimEmail);
      setLoading(false);
      Swal.fire({
        html: `<img src=${magmapayment} alt="success image" style="display: block; margin: 0 auto;">
    <p style="color: green; font-weight: bold; margin: 10px 0;">
    Your Query Reply  Submitted Successfully
    </p>`,
        allowOutsideClick: false,
        showConfirmButton: true,
        cancelButtonColor: "red",
        confirmButtonColor: "red",
        width: 600,
        alignItems: "center",
        confirmButtonText: "Close Tab",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "https://www.magmahdi.com";
        }
      });
      // .then((resX) => {
      //   if (resX.isDenied) {
      //     topNavigate("/ListOfMaster");
      //     return false;
      //   }
      //   return false;
      // });
    } else {
      Swal.fire({
        html: "Something went wrong!",
        icon: "error",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    }
  };
  return (
    <Card>
      <ImageListItem style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={`${Magma}`} alt="" style={{ width: "200px", marginBottom: "20px" }} />
      </ImageListItem>
      <Grid container p={2} justifyContent="center">
        <MDTypography variant="body1" color="primary">
          Query Reply Submission
        </MDTypography>
      </Grid>
      <Grid container spacing={4} p={2} justifyContent="center">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput label="ClaimNo" name="Claim No" value={query && query.claimNumber} disabled />
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
        <MDTypography sx={{ color: "red", fontSize: 14, mb: 3 }}>
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
                error={errorR.Otperror && validateOtpData.otp === ""}
                helperText={errorR.Otperror && validateOtpData.otp === "" && mes}
              />
              {otperrorflag && validateOtpData.otp !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "12px" }}>
                  Please Enter valid OTP
                </MDTypography>
              ) : null}
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
      {aftervalidate === true ? (
        <>
          <Grid container spacing={2} mt={2} justifyContent="center">
            <MDTypography variant="body1" color="primary" sx={{ ml: "2rem" }}>
              Query
            </MDTypography>
            <MDTypography variant="body1" color="primary" sx={{ ml: "11rem" }}>
              Upload Document
            </MDTypography>
          </Grid>

          <Grid container spacing={1} mt={1}>
            {query &&
              query.transactionDataDTO[0] &&
              query.transactionDataDTO[0].transactionDetails &&
              query.transactionDataDTO[0].transactionDetails.queryDetails.map((item, id) => (
                <>
                  <Grid item xs={3} ml={50}>
                    <MDTypography fontSize="14px" mt={1}>
                      {item.StatusValue}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={5} marginTop="2px">
                    <label htmlFor={`file-upload-${id}`}>
                      {upload[id] && upload[id].fileName === "" ? (
                        <>
                          <input
                            id={`file-upload-${id}`}
                            name={`file-upload-${id}`}
                            accept="image/jpeg, application/pdf,image/png,image/jpg,application/msword,
                            application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleProfileChange(id, e)}
                          />
                          <MDButton
                            variant="outlined"
                            color="error"
                            component="span"
                            id={`file-upload-${id}`}
                          >
                            Upload
                          </MDButton>
                        </>
                      ) : (
                        <Stack direction="row" sx={{ fontSize: "14px" }} xs={6}>
                          {upload[id] && <p>{upload[id].fileName}</p>}
                          <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                            <CancelIcon fontSize="small" color="error" sx={{ mt: "-0.5rem" }} />
                          </IconButton>
                        </Stack>
                      )}
                    </label>
                  </Grid>
                </>
              ))}
          </Grid>

          <Grid container spacing={2} p={2} justifyContent="center">
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <TextField
                label="Patient Comments"
                placeholder="Enter Patient Comments"
                name="patientComments"
                value={query.transactionDataDTO[0].transactionDetails.patientComments}
                onChange={handlePatientCommentsChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" p={2}>
            <MDButton disabled={disableSubmit} variant="contained" onClick={() => onSubmit()}>
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
      ) : null}
    </Card>
  );
}
export default QueryReplyTinyURL;
