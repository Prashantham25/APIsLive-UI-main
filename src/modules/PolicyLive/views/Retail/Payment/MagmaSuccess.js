import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Icon, IconButton, Backdrop, CircularProgress } from "@mui/material";
import swal from "sweetalert2";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import { useDataController, setGenericPolicyDto } from "../../../../BrokerPortal/context";
import {
  GenericApi,
  GetPolicy,
  //  GetSavepolicyWFStatus
} from "../Products/Magma/data/index";

function MagmaSuccess() {
  const [control, dispatch] = useDataController();
  const [loading, setLoading] = useState(false);
  const { genericPolicyDto, genericInfo } = control;
  const dto = genericPolicyDto?.policyDetails?.finalResult;
  const [dto2, setDtoData] = useState({});
  const [dtoTotalPremium, setDtototalpremium] = useState({});
  console.log("123", dto);

  const Payload = {
    key: "",
    keyValue: "",
    templateKey: "",
    templateId: 164,
    requestData: "",
    referenceId: "",
    communicationId: 0,
  };
  const currencyFormat = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // const object = {
  //   Stage: "Proposal",
  //   Status: 388,
  //   workFlowId: 93,
  //   WorkFlowType: "Underwrtiter",
  // };
  // const object1 = {
  //   Stage: "Proposal",
  //   Status: 388,
  //   WorkFlowType: "Underwriter",
  //   wfstageStatusId: 392,
  //   Decision: [],
  // };
  useEffect(async () => {
    setLoading(true);
    if (dto !== undefined) {
      genericPolicyDto.AssignResult.PolicyNumber = dto?.id;
      setGenericPolicyDto(dispatch, dto2);
    }
    // await GetSavepolicyWFStatus(genericPolicyDto.AssignResult.ProposalNo, object);
    // await GetSavepolicyWFStatus(genericPolicyDto.AssignResult.ProposalNo, object1);
    await GenericApi(
      "MagmaHospiCash01",
      "Magma_HospiCashNotification",
      genericPolicyDto.AssignResult || genericInfo.FinalResult
    ).then((res) => {
      console.log("email", res);
      setGenericPolicyDto(dispatch, { ...genericPolicyDto, EmailNotification: res });
      if (res.status === 1) {
        setLoading(false);
        swal.fire({
          icon: "success",
          text: "Mail is sent successfully",
        });
      } else {
        setLoading(false);
      }
    });
    if (
      (genericInfo && genericInfo.FinalResult !== "") ||
      (genericInfo && genericInfo.FinalResult !== undefined)
    ) {
      // setDtoData(genericInfo.FinalResult);
      setDtoData((prevState) => ({
        ...prevState,
        ...genericInfo.FinalResult,
      }));
      console.log("genericInfo.FinalResult", genericInfo.FinalResult);
    }
    if (
      !(genericInfo && genericInfo.FinalResult) &&
      genericPolicyDto &&
      genericPolicyDto.AssignResult !== "" &&
      genericPolicyDto &&
      genericPolicyDto.AssignResult !== undefined
    ) {
      setDtoData(genericPolicyDto);
      console.log("genericPolicyDto.AssignResult", genericPolicyDto);
    }
    if (
      genericInfo &&
      genericInfo.FinalResult !== "" &&
      genericInfo &&
      genericInfo.FinalResult !== undefined
    ) {
      // setDtototalpremium(genericInfo.FinalResult);
      setDtototalpremium((prevState) => ({
        ...prevState,
        ...genericInfo.FinalResult,
      }));
    }
    if (
      !(genericInfo && genericInfo.FinalResult) &&
      genericPolicyDto &&
      genericPolicyDto.AssignResult !== "" &&
      genericPolicyDto &&
      genericPolicyDto.AssignResult !== undefined
    ) {
      setDtototalpremium(genericPolicyDto.AssignResult);
    }
    console.log("GENRICINFOFINALRESULT2", dtoTotalPremium);
  }, []);
  console.log("dto2222222222222", dto2);

  const OnEmail = () => {
    setLoading(true);
    GenericApi(
      "MagmaHospiCash01",
      "Magma_HospiCashNotification",
      genericPolicyDto.AssignResult || genericInfo.FinalResult
    ).then((res) => {
      console.log("email", res);
      setGenericPolicyDto(dispatch, { ...genericPolicyDto, EmailNotification: res });
      if (res.status === 1) {
        setLoading(false);
        swal.fire({
          icon: "success",
          text: `Mail is sent successfully`,
        });
      }
    });
  };
  const Navigate = useNavigate();
  const handleReffered = () => {
    Navigate("/Magma/NSTPDashboard");
  };
  const handleHome = () => {
    Navigate("/MagmaCoiList");
  };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);
    link.click();
  };
  const handleDownloadPolicy = async () => {
    Payload.key = dto2.PolicyNumber || (dto && dto?.id);
    const policy = await GetPolicy(Payload);
    console.log("polidownload1", policy);
    generateFile(policy.data, dto2.PolicyNumber);
  };
  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", m: 1, background: "#FFFFFF" }}
      fullwidth
    >
      <Card
        position="absolute"
        sx={{ borderRadius: "0.3rem", m: 2, background: "#EEEEEE" }}
        fullwidth
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                <MDBox
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  sx={{
                    m: "2rem",
                    display: "flex",
                    backgroundImage: `url(${PaySuccess})`,
                    backgroundSize: "cover",
                    flexDirection: "column",
                    backgroundPosition: "center",
                    textAlign: "center",
                    alignItems: "center",
                    minHeight: "30rem",
                  }}
                >
                  <Grid container spacing={2} p={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <IconButton
                        size="large"
                        color="white"
                        iconOnly
                        circular
                        sx={{ background: "#c6444b" }}
                      >
                        <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography
                        variant="h6"
                        sx={{
                          fontSize: "1.5rem",
                          textAlign: "center",
                          color: "#000000",
                          mt: 5,
                        }}
                      >
                        Payment Details <p>Saved Successfully</p>
                      </MDTypography>
                    </Grid>
                    <Grid container spacing={2} ml={5} mt={16}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem", ml: "0rem", fontWeight: "bold" }}>
                          Amount Paid &nbsp;&nbsp; :
                          {/* {formatter.format(paydetails.paidAmount)} */}
                        </MDTypography>
                        <MDTypography
                          sx={{ fontSize: "1rem", ml: "0rem", fontWeight: "bold", mt: 2 }}
                        >
                          Payment Mode&nbsp;&nbsp;:
                          {/* {paydetails.paymentMode} */}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                          ₹{" "}
                          {currencyFormat.format(
                            dtoTotalPremium?.InstallmentDetails
                              ? dtoTotalPremium?.TotalPremium
                              : dtoTotalPremium?.PremiumDetails?.TotalPremium
                          )}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: "1rem", fontWeight: "bold", mt: 2 }}>
                          CD Account
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Grid container spacing={2} sx={{ mt: "2rem", ml: "-45px" }} p={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" sx={{ fontSize: "2rem", color: "#000000" }}>
                  Your COI Details
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={1}>
                {dto2 && dto2.PolicyNumber && dto2.PolicyNumber !== "" && (
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    COI No. :
                    <b style={{ float: "right", marginRight: "100px" }}>
                      {dto2 && dto2.PolicyNumber ? dto2.PolicyNumber : ""}
                    </b>
                  </MDTypography>
                )}
                {dto?.id !== "" && dto !== undefined && (
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    COI No. :
                    <b style={{ float: "right", marginRight: "100px" }}>
                      {dto && dto?.id ? dto?.id : ""}
                    </b>
                  </MDTypography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={1}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Master Policy No. :
                  <b style={{ float: "right", marginRight: "100px" }}>
                    {dto2 && dto2.PartnerDetails && dto2.PartnerDetails.masterPolicyNo
                      ? dto2.PartnerDetails.masterPolicyNo
                      : ""}
                  </b>
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={1}>
                {dto2 && dto2.PartnerDetails && dto2.MasterPolicyHolderName && (
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    Master Policy Holder Name :
                    <b style={{ float: "right", marginRight: "100px" }}>
                      {dto2 && dto2.PartnerDetails && dto2.MasterPolicyHolderName
                        ? dto2.MasterPolicyHolderName
                        : ""}
                    </b>
                  </MDTypography>
                )}
                {dto2 &&
                  dto2.PartnerDetails &&
                  dto2.MasterPolicyHolderName &&
                  dto2 &&
                  dto2.PartnerDetails &&
                  dto2.MasterPolicyHolderName === "" &&
                  dto2 &&
                  dto2.MasterPolicyDetails &&
                  dto2.MasterPolicyDetails[0].masterPolicyDetails.MasterPolicyHolderName && (
                    <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                      Master Policy Holder Name :
                      <b style={{ float: "right", marginRight: "100px" }}>
                        {dto2 &&
                        dto2.MasterPolicyDetails &&
                        dto2.MasterPolicyDetails[0].masterPolicyDetails.MasterPolicyHolderName
                          ? dto2.MasterPolicyDetails[0].masterPolicyDetails.MasterPolicyHolderName
                          : ""}
                      </b>
                    </MDTypography>
                  )}

                {!(dto2 && dto2.PartnerDetails && dto2.MasterPolicyHolderName) &&
                  dto2.MasterPolicyDetails &&
                  dto2.MasterPolicyDetails[0].masterPolicyDetails.MasterPolicyHolderName && (
                    <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                      Master Policy Holder Name :
                      <b style={{ float: "right", marginRight: "100px" }}>
                        {dto2 &&
                        dto2.MasterPolicyDetails &&
                        dto2.MasterPolicyDetails[0].masterPolicyDetails.MasterPolicyHolderName
                          ? dto2.MasterPolicyDetails[0].masterPolicyDetails.MasterPolicyHolderName
                          : ""}
                      </b>
                    </MDTypography>
                  )}
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={1}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Proposer Name :{" "}
                  <b style={{ float: "right", marginRight: "100px" }}>
                    {" "}
                    {dto2 && dto2.ProposerDetails && dto2.ProposerDetails.Name
                      ? dto2.ProposerDetails.Name
                      : ""}
                  </b>
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={1}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  No. of Insured Members :
                  <b style={{ float: "right", marginRight: "100px" }}>
                    {dto2 && dto2.CountOfLives ? dto2.CountOfLives : ""}
                  </b>
                </MDTypography>
              </Grid>

              <Grid item md={2.5} mt={1}>
                <MDButton
                  variant="outlined"
                  display="flex"
                  background="#c6444b"
                  sx={{ justifyContent: "flex-end", color: "#c6444b", whiteSpace: "nowrap" }}
                  onClick={OnEmail}
                >
                  Email COI
                </MDButton>
                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={loading}
                >
                  <CircularProgress />
                </Backdrop>
              </Grid>
              <Grid item md={4} mt={1}>
                <MDButton
                  display="flex"
                  sx={{ justifyContent: "flex-end", whiteSpace: "nowrap" }}
                  background="#c6444b"
                  onClick={handleDownloadPolicy}
                >
                  Download Policy/COI
                </MDButton>
              </Grid>
              {!(genericInfo && genericInfo.FinalResult) && (
                <Grid item md={2.5} mt={1}>
                  <MDButton
                    variant="contained"
                    display="flex"
                    background="#c6444b"
                    sx={{ justifyContent: "flex-end", whiteSpace: "nowrap" }}
                    onClick={handleHome}
                  >
                    View COI&apos;s
                  </MDButton>
                </Grid>
              )}
              {genericInfo && genericInfo.FinalResult && (
                <Grid item md={3} mt={1}>
                  <MDButton
                    variant="contained"
                    display="flex"
                    background="#c6444b"
                    sx={{ justifyContent: "flex-end", whiteSpace: "nowrap" }}
                    onClick={handleReffered}
                  >
                    Go to Referred for Decision
                  </MDButton>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
}

export default MagmaSuccess;
