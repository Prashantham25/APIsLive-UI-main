import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Avatar,
  IconButton,
  Icon,
  FormControl,
} from "@mui/material";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";

// import Swal from "sweetalert2";

import MDTypography from "../../../../../../../components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";
// import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDBox from "../../../../../../../components/MDBox";
import MDInput from "../../../../../../../components/MDInput";
import { GenericApi, NotificationsVerifyOTP } from ".";
import "./SwalStyle.css";
import { buildForm } from "../../../../../../../Common/Validations";

const checkForValue = (value) => value === "" || value === undefined || value === null;

export default function FetchCKYC({ setDto, dto, tab, onClose, setLoading, flowId, setTimer2 }) {
  const GenderCode = { M: "Male", F: "Female", T: "Transgender" };
  const ckycData = dto.RiskItems?.[tab]?.CKYCDetails;
  const details = [
    {
      label: "CKYC No.",
      value: ckycData?.CKYC_NO,
      spacing: 6,
    },
    {
      label: "KYC Date",
      value: ckycData?.kyc_date,
      spacing: 3,
    },
    {
      label: "Update Date",
      value: ckycData?.update_date,
      spacing: 3,
    },
    {
      label: "Name",
      value: ckycData?.full_name,
      spacing: 6,
    },

    {
      label: "Date of Birth",
      value: ckycData?.DOB,
      spacing: 3,
    },
    {
      label: "Gender",
      value: GenderCode[ckycData?.GENDER],
      spacing: 3,
    },
    {
      label: "Father Name",
      value: ckycData?.FATHER_FULLNAME,
      spacing: 6,
    },
    {
      label: "Mother Name",
      value: ckycData?.MOTHER_FULLNAME,
      spacing: 6,
    },
    {
      label: "Permanent Address",
      type: "header",
      spacing: 12,
    },

    {
      label: "Address Line 1",
      value: ckycData?.PERM_LINE1,
      spacing: 4,
    },
    {
      label: "Address Line 2",
      value: ckycData?.PERM_LINE2,
      spacing: 4,
    },
    {
      label: "Address Line 3",
      value: ckycData?.PERM_LINE3,
      spacing: 4,
    },
    {
      label: "City",
      value: ckycData?.PERM_CITY,
      spacing: 4,
    },
    {
      label: "District",
      value: ckycData?.PERM_DIST,
      spacing: 4,
    },
    {
      label: "State",
      value: ckycData?.PERM_STATE,
      spacing: 4,
    },
    {
      label: "Country",
      value: ckycData?.PERM_COUNTRY,
      spacing: 4,
    },
    {
      label: "PinCode",
      value: ckycData?.PERM_PIN,
      spacing: 4,
    },
    // {
    //   label: "Communication Address",
    //   type: "header",
    //   spacing: 12,
    // },
    // {
    //   label: "Address Line 1",
    //   value: ckycData?.CORRES_LINE1,
    //   spacing: 4,
    // },
    // {
    //   label: "Address Line 2",
    //   value: ckycData?.CORRES_LINE2,
    //   spacing: 4,
    // },
    // {
    //   label: "Address Line 3",
    //   value: ckycData?.CORRES_LINE3,
    //   spacing: 4,
    // },
    // {
    //   label: "City",
    //   value: ckycData?.CORRES_CITY,
    //   spacing: 4,
    // },
    // {
    //   label: "District",
    //   value: ckycData?.CORRES_DIST,
    //   spacing: 4,
    // },
    // {
    //   label: "State",
    //   value: ckycData?.CORRES_STATE,
    //   spacing: 4,
    // },
    // {
    //   label: "Country",
    //   value: ckycData?.CORRES_COUNTRY,
    //   spacing: 4,
    // },
    // {
    //   label: "PinCode",
    //   value: ckycData?.CORRES_PIN,
    //   spacing: 4,
    // },
  ];

  const [otp, setOtp] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [timer, setTimer] = useState(100);
  const [resentOtp, setResentOtp] = useState(1);
  const [otpConsent, setOtpConsent] = useState(true);
  const [transactionNo, setTransactionNo] = useState("");

  const setDeclaration = (e) => {
    const lDto = dto;
    lDto.RiskItems[tab].CKYCDeclaration = e.target.value;
    setDto({ ...lDto });
  };

  const onProceed = async () => {
    setTimer2(10);
    if (
      dto.RiskItems?.[tab]?.CKYCDeclaration === "Yes" ||
      dto.RiskItems?.[tab]?.CKYCDeclaration === "No"
    ) {
      if (dto.RiskItems?.[tab]?.CKYCDeclaration === "Yes") onClose();
      else {
        onClose();
        const DateObj = new Date();
        const transactionid = `${DateObj.getMinutes()}5${DateObj.getHours()}1${DateObj.getDate()}2${DateObj.getSeconds()}${flowId}${tab}`;
        const res = await GenericApi("LifeInsurance", "eKYCRedirectionApi", {
          transactionid,
          accessid: dto.opportunityId,
        });
        console.log("res", res);
        // debugger;
        const form = buildForm({
          action: res.finalResult.redirectionURL,
          params: res.finalResult.requestBody,
        });
        document.body.appendChild(form);
        form.submit();
        form.remove();
      }
    }
  };

  // const GoWithEkyc = async () => {};

  useEffect(() => {
    if (timer <= 99 && timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  const emailID = dto.RiskItems?.[tab]?.EmailId;
  const splitEmail = emailID.toString().split("@");
  const contactNo = dto.RiskItems?.[tab]?.ContactNo;
  // "https://esalesuat.licindia.in"
  useEffect(async () => {
    try {
      setLoading(true);
      await GenericApi("LifeInsurance", "SendOtpAPi", {
        MasterType: "CKYCVerification",
        email: checkForValue(emailID) ? "" : dto.RiskItems?.[tab]?.EmailId,
        whatsAppNo: checkForValue(contactNo) ? "" : contactNo,
        contactNo: checkForValue(contactNo) ? "" : contactNo,
        addtionalDetails: {
          isEmail: checkForValue(emailID) ? "false" : "true",
          isSMS:
            window.location.origin === "https://esalesuat.licindia.in" || checkForValue(contactNo)
              ? "false"
              : "true",
          isWhatsApp:
            window.location.origin === "https://esalesuat.licindia.in" || checkForValue(contactNo)
              ? "false"
              : "true",
        },
      }).then((res) => {
        setLoading(false);
        if (res.status === 1 && res.finalResult?.TransactionNo) {
          setTimer(99);
          setTransactionNo(res.finalResult.TransactionNo);
          if (checkForValue(emailID) && !checkForValue(contactNo))
            Swal.fire({
              icon: "success",
              text: `OTP sent to  XXXXXX${contactNo.toString().substring(6)}`,
            });
          else if (checkForValue(contactNo) && !checkForValue(emailID))
            Swal.fire({
              icon: "success",
              text: `OTP sent to ${splitEmail[0]
                .split("")
                .map((x, i) => (i > splitEmail[0].length - 4 ? x : "x"))
                .join("")}@${splitEmail[1].toLowerCase()}`,
            });
          else
            Swal.fire({
              icon: "success",
              text: `OTP sent to ${splitEmail[0]
                .split("")
                .map((x, i) => (i > splitEmail[0].length - 4 ? x : "x"))
                .join("")}@${splitEmail[1].toLowerCase()} and XXXXXX${contactNo
                .toString()
                .substring(6)}`,
            });
        } else {
          setTimer(0);
          Swal.fire({ icon: "warning", text: "Please Retry" });
        }
      });
      setLoading(false);
    } catch {
      //
    }
  }, [resentOtp]);

  const onVerifyOTP = async () => {
    if (flowId === 3 && otpConsent === false) {
      Swal.fire({ icon: "warning", text: "Please give your consent" });
    } else {
      setLoading(true);
      await NotificationsVerifyOTP({
        otp,
        transactionNo,
      }).then((res) => {
        setLoading(false);
        if (res.status === 1) {
          setOtpStatus(true);

          GenericApi("LifeInsurance", "CKCYorEKYCValidationApi", {
            OpportunityNo: dto.OpportunityNumber,
            OppurtunityID: dto.opportunityId,
            EmailID: checkForValue(emailID) ? "" : emailID,
            MasterType: "CKYCValidation",
            ContactNo: checkForValue(contactNo) ? "" : contactNo,
            isEmail: checkForValue(emailID) ? "false" : "true",
            isSMS: checkForValue(contactNo) ? "false" : "true",
            isWhatsapp: checkForValue(contactNo) ? "false" : "true",
          });
        } else Swal.fire({ icon: "error", text: res.responseMessage });
      });
    }
  };

  return (
    <MDBox>
      {otpStatus ? (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h5" color="success" sx={{ textAlign: "center" }}>
              CKYC data fetched Successfully
            </MDTypography>
            <MDTypography sx={{ textAlign: "center", fontSize: "1rem" }}>
              Please verify your details before you proceed
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt={ckycData?.full_name}
                src={ckycData?.image}
                sx={{ width: 100, height: 100 }}
              />
            </MDBox>
          </Grid>
          {details.map((x) => (
            <Grid item xs={12} sm={12} md={x.spacing} lg={x.spacing} xl={x.spacing} xxl={x.spacing}>
              {!x.type && x.label !== "" && <MDInput label={x.label} disabled value={x.value} />}
              {x.type && <MDTypography variant="h6">{x.label}</MDTypography>}
            </Grid>
          ))}

          {false && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ fontSize: "1rem" }}>
                  Do you want to change your address?
                </MDTypography>

                <RadioGroup row value="No">
                  <FormControlLabel label="Yes" value="Yes" control={<Radio />} disabled />
                  <FormControlLabel label="No" value="No" control={<Radio />} disabled />
                </RadioGroup>
              </Stack>
            </Grid>
          )}
          {false && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2} mt={3}>
                <Checkbox
                  value={dto.RiskItems?.[tab]?.CKYCDeclaration === "Yes"}
                  onChange={setDeclaration}
                />
                <MDTypography sx={{ fontSize: "1rem", alignSelf: "center" }}>
                  I hereby declare that all the information is taken as per my consent and is
                  correct.
                </MDTypography>
              </Stack>
            </Grid>
          )}
          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography color="error" sx={{ fontSize: "1rem" }}>
         
              If you do not want to proceed with c-KYC you can continue with e-KYC by click on
              Initiate e-KYC button
            </MDTypography>
          </Grid> */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl>
                <RadioGroup value={dto.RiskItems?.[tab]?.CKYCDeclaration} onChange={setDeclaration}>
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes, I want Proceed with c-KYC"
                  />
                  <FormControlLabel
                    value="No"
                    x
                    control={<Radio />}
                    label="No, I do not want to proceed with c-KYC"
                  />
                </RadioGroup>
              </FormControl>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <Stack direction="row" spacing={2}>
                <MDButton
                  onClick={onProceed}
                  // disabled={dto.RiskItems?.[tab]?.CKYCDeclaration === "No"}
                >
                  Proceed
                </MDButton>
                {/* <MDButton
                  color="error"
                  onClick={GoWithEkyc}
                  disabled={dto.RiskItems?.[tab]?.CKYCDeclaration === "Yes"}
                >
                  Initiate e-KYC
                </MDButton> */}
              </Stack>{" "}
            </MDBox>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <IconButton onClick={onClose}>
                <Icon>close</Icon>
              </IconButton>
            </MDBox>
          </Grid>
          {flowId === 3 && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2} mt={3}>
                <Checkbox checked={otpConsent} onChange={(e) => setOtpConsent(e.target.checked)} />
                <MDTypography sx={{ fontSize: "1rem", alignSelf: "center" }}>
                  I hereby give my consent for using my CKYC record for insurance from LIC of India.
                </MDTypography>
              </Stack>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Enter OTP"
              // helperText="OTP sent to Mail ID"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Grid>
          {timer === 0 ? (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={() => setResentOtp(resentOtp + 1)}>Resend OTP</MDButton>
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={onVerifyOTP}>Verify OTP</MDButton>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              color="success"
              sx={{ fontSize: "1rem" }}
            >{`Click On Resend OTP in  ${timer}`}</MDTypography>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
