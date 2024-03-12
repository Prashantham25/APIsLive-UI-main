import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Grid, Modal, IconButton, Icon, useMediaQuery } from "@mui/material";
import OtpImage from "assets/images/Life/OtpImage.png";
import MDTypography from "components/MDTypography";
import OtpInput from "react-otp-input-rc-17";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "../../../../../../../components/MDInput";
import { GenericApi } from "../../NewBusiness/data";

export default function OTPModel({ json, setJson, modalOpen, setModelOpen }) {
  const matches = useMediaQuery("(min-width:600px)");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "56rem",
    width: "70%",
    height: "auto",
    maxWidth: matches ? "600px" : "300px",
    // height: "70%",
    // height: "500px",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    // boxShadow: 24,
    // borderRadius: "1rem",
    textAlign: "center",
    // p: 2,
  };
  //   const [user, setUser] = useState({
  //     email: "",
  //     mobileNo: "",
  //   });
  // const [otpdata, setotpdata] = useState({
  //   otp: "",
  //   Email: "",
  // });

  const [otpContent, setOtpContent] = useState(false);
  const [data, setData] = useState(false);
  const [transactionNo, setTransactionNo] = useState(0);

  const handleOTP = (otp1) => {
    setJson((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
  };
  const onChange = (e) => {
    setJson((prevState) => ({
      ...prevState,
      MobileNo: e.target.value,
    }));
  };
  const handleModalClose = () => {
    setModelOpen(false);
    setOtpContent(false);
    setData(false);
  };

  const onProceedToOtp = async () => {
    // setLoading(true);
    await GenericApi("LifeInsurance", "SendOtpAPi", {
      email: "",
      contactNo: "",
      MasterType: "CKYCVerification",
      whatsAppNo: "9036233236",
      addtionalDetails: {
        isEmail: true,
        isSMS: true,
        isWhatsApp: true,
      },
    }).then((res) => {
      // setLoading(false);
      // if (res.status === 1 && res.finalResult?.TransactionNo) {
      setTransactionNo(res.finalResult?.TransactionNo);
      console.log(transactionNo);
      // setTimer(60);
      // setResentOtp(resentOtp + 1);
      //   Swal.fire({
      //     icon: "success",
      //     // text: `OTP sent to ${dto.ProposerDetails?.EmailId} and ${dto.ProposerDetails?.ContactNo}`,
      //   });
      // } else Swal.fire({ icon: "error", text: res.responseMessage });
    });
    // setLoading(false);
    setOtpContent(true);
  };
  const onProceedToData = () => {
    setData(true);
    setOtpContent(false);
  };
  const tableColumns = [
    {
      field: "Select",
      headerName: "Select",
      //   width: 300,
    },
    {
      field: "ApplicationID",
      headerName: "Application ID",
      width: 145,
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      width: 110,
    },
    {
      field: "PlanName",
      headerName: "Plan Name",
      width: 100,
    },
    {
      field: "EstimatedPremium",
      headerName: "Estimated Premium",
      width: 160,
    },
  ];
  const [rows] = useState([]);

  return (
    <MDBox justifyContent="center">
      <Modal open={modalOpen} onClose={handleModalClose}>
        <MDBox sx={style}>
          {data === false && (
            <Stack direction="row">
              <Grid container spacing={3}>
                {matches && (
                  <Grid item xs={12} sm={12} md={6}>
                    <MDBox width="100%" height="100%" component="img" src={OtpImage} />
                  </Grid>
                )}

                <Grid container item xs={12} sm={12} md={6} p={2} justifyContent="center">
                  {otpContent === false && (
                    <Grid container spacing={1} p={2}>
                      <Grid item container justifyContent="flex-end" sx={{ height: "40px" }}>
                        <IconButton onClick={handleModalClose} sx={{ mr: "-17px" }}>
                          <Icon>close</Icon>
                        </IconButton>
                      </Grid>
                      <Grid item sx={12} xs={12} md={12} xl={12}>
                        <MDTypography
                          sx={{
                            color: "#1D4E9E",
                            fontSize: "18px",
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Track Application
                        </MDTypography>
                      </Grid>
                      <Grid item sx={12} xs={12} md={12} xl={12}>
                        <MDTypography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            display: "flex",
                            justifyContent: "left",
                          }}
                        >
                          Please Enter Registered Mobile No. to validate and proceed
                        </MDTypography>
                      </Grid>
                      <Grid item sx={12} xs={12} md={12} xl={12}>
                        <MDTypography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Enter Mobile No
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <MDInput label="Mobile No" value={json.MobileNo} onChange={onChange} />
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} justifyContent="flex-end">
                        <MDButton variant="contained" color="secondary" onClick={onProceedToOtp}>
                          Proceed
                        </MDButton>
                      </Grid>
                    </Grid>
                  )}
                  {otpContent === true && (
                    <Grid container spacing={1}>
                      <Grid item container justifyContent="flex-end">
                        <IconButton onClick={handleModalClose}>
                          <Icon>close</Icon>
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <MDTypography
                          sx={{
                            color: "#1D4E9E",
                            fontSize: "18px",
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          OTP verification
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <MDTypography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Please Enter the 6 Digit OTP
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <MDTypography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Enter the otp
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} sx={{ m: 0, pl: 0 }}>
                        <Stack direction="row" display="flex" justifyContent="center">
                          <OtpInput
                            value={json.otp}
                            onChange={handleOTP}
                            // onBlur={handleOTPvalidation}
                            numInputs={6}
                            isInputNum
                            hasErrored
                            isInputSecure
                            inputStyle={{
                              width: "39px",
                              height: "42px",
                              margin: "0.2rem",
                              fontSize: "1rem",
                              borderRadius: 4,
                              border: "2px solid rgba(0,0,0,0.3)",
                              background: "white",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <MDTypography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          OTP sent to 8887344556
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <MDTypography
                          sx={{
                            color: "#1976D2",
                            fontSize: "14px",
                            fontWeight: 400,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Resend OTP
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} justifyContent="flex-end">
                        <MDButton variant="contained" color="secondary" onClick={onProceedToData}>
                          Proceed
                        </MDButton>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Stack>
          )}
          {data === true && (
            <MDBox p={2}>
              <Grid item container justifyContent="flex-end">
                <IconButton onClick={handleModalClose}>
                  <Icon>close</Icon>
                </IconButton>
              </Grid>
              <Grid container spacing={6}>
                <Grid item sx={12} md={12} xs={12} xl={12}>
                  {" "}
                  <DataGrid
                    autoHeight
                    rows={rows}
                    columns={tableColumns}
                    getRowId={(row) => row.id}
                    // components={{ Toolbar: GridToolbar }}
                    hideFooterPagination
                    //   checkboxSelection
                    //   pageSize={pageSize}
                    //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    //   rowsPerPageOptions={[5, 10, 15, 20]}
                    //   pagination
                    //   loading={datagridLoading}
                  />
                </Grid>
                <Grid item sx={12} md={12} xs={12} xl={12}>
                  <MDBox display="flex" justifyContent="center">
                    <MDButton variant="contained" color="secondary" onClick={handleModalClose}>
                      Proceed
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          )}
        </MDBox>
      </Modal>
    </MDBox>
  );
}
