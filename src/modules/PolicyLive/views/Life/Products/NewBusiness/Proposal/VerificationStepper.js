import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Grid, Icon, useMediaQuery, Divider, Popover } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import _ from "lodash";
import swal from "sweetalert";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";

import {
  GenerateMultiplePGUrl,
  GetOpportunity,
  GetProposalByNumber,
  GenericApi,
  GetDocumentById,
  DocumentUpload,
  DeleteDocument,
} from "../data";
import LifeStepper from "../LifeStepper";
import getViewProposalStepper from "./ViewProposal";
import { IsNumeric, formatCurrency } from "../../../../../../../Common/Validations";
import { useDataController } from "../../../../../../BrokerPortal/context";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDCheckbox from "../../../../../../../components/MDCheckbox";
import MDButton from "../../../../../../../components/MDButton";
import RayzorPay from "../../../../Retail/data/RayzorPay";
import { Policies } from "../../../../Retail/data/Apis";
import DocumentUploadCard from "../data/DocumentUploadCard";
import MSPCard from "../data/MSPCard";
import ConfigSetting from "../../../../../../../assets/themes/BrokerPortal/ConfigSetting";

const currencySymbol = ConfigSetting().currency.symbol;

function PaymentSuccess({ paymentDetails }) {
  const navigate = useNavigate();
  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", m: 7, background: "#FFFFFF" }}
      fullwidth
    >
      <Card
        position="absolute"
        sx={{
          borderRadius: "0.3rem",
          m: 7,
          background: "#EEEEEE",
          pr: "2.5rem",
        }}
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
                    minHeight: "20rem",
                  }}
                >
                  <MDButton
                    size="large"
                    variant="outlined"
                    color="white"
                    iconOnly
                    circular
                    sx={{ mt: "1.5rem", background: "#00CA72" }}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                  </MDButton>
                  <MDTypography
                    variant="h6"
                    sx={{
                      mt: "2rem",
                      fontSize: "1.25rem",
                      textAlign: "center",
                      widht: "100%",
                      color: "#00CA72",
                    }}
                  >
                    Payment Details <p>Saved Successfully</p>
                  </MDTypography>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography sx={{ fontSize: "0.8rem", ml: "0rem" }}>
                      Payment Reference Number :{paymentDetails.refNo}
                    </MDTypography>
                  </Grid>

                  {/* <MDTypography
                    variant="h6"
                    sx={{ my: "2rem", fontSize: "1rem", textAlign: "center", widht: "100%" }}
                  >
                    1234
                  </MDTypography> */}
                  <Grid container spacing={2} ml={5} mt={2} pb={10} sx={{ ml: "-2rem" }}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                        Amount Paid &nbsp;&nbsp; :
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                        Payment Id&nbsp;&nbsp;:
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        {/* formatter.format(Number(0).toFixed(0)) */}
                        {formatCurrency(paymentDetails.amount)}
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        {paymentDetails.paymentId}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Grid container spacing={4} sx={{ mt: "1rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" sx={{ fontSize: "1.8rem", color: "#000000" }}>
                  Here is your policy
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Proposer Name :<b>Mr {paymentDetails.PayeeName}</b>
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                  Proposer Email :<b>{paymentDetails.PayeeEmail}</b>
                </MDTypography>
              </Grid>
              {Object.keys(paymentDetails.policyDetails).map((x) => (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    {x} :<b>{paymentDetails.policyDetails[x]}</b>
                  </MDTypography>
                </Grid>
              ))}
              <Grid item md={3}>
                <MDButton variant="outlined" display="flex" color="error" sx={{ color: "#E41D25" }}>
                  <MDTypography
                    variant="outlined"
                    display="flex"
                    color="error"
                    sx={{ color: "#E41D25", padding: "5px" }}
                    onClick={() => navigate("/customerlifelanding")}
                  >
                    GO TO HOME
                  </MDTypography>
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
}

function PaymentFailure() {
  return (
    <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <MDBox
        px={1}
        xs={12}
        s={12}
        md={6}
        l={6}
        sx={{
          m: 5,
          width: "50%",
        }}
      >
        <Card sx={{ mt: 3 }}>
          <MDBox
            sx={{
              background: "#CEEBFF",
              px: "2rem",
              pb: "2rem",
              m: 4,
              mt: 6,
              textAlign: "center",
              width: "90%",
            }}
          >
            <Grid container spacing={2} p={2} sx={{ textAlign: "center" }}>
              <Grid justifyContent="center" item xs={12} sx={{ textAlign: "center" }}>
                <MDBox
                  // align="center"

                  mt={4}
                  sx={{ background: "white", width: "90%", height: "442px" }}
                >
                  <Grid
                    justifyContent="center"
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                  >
                    <CancelIcon sx={{ fontSize: "70px !important", color: "#e53935" }} />
                  </Grid>

                  <MDTypography variant="h6" sx={{ fontSize: "2rem", color: "#e53935" }}>
                    Payment Failed
                  </MDTypography>

                  <Divider sx={{ color: "#000000" }} />
                  <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="body" sx={{ fontSize: "1rem" }}>
                        Transaction No : *******
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        Amount to be Paid : {currencySymbol} *****
                      </MDTypography>
                      {/* <MDButton onclick={}>Retry Payment</MDButton> */}
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
    </MDBox>
  );
}

function ProposalSummary({ ProposalData, setLoading }) {
  const [controller] = useDataController();
  const { custTheme } = controller;
  const { primary } = custTheme.palette;
  const matchesMd = useMediaQuery("(min-width:992px)");

  const [checkedState, setCheckedState] = useState({});
  const [consent, setConsent] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [refNo, setRefNo] = useState("");
  const [razorPayResponse, setRazorPayResponse] = useState({});
  const [policyDetails, setPolicyDetails] = useState({});

  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const onPayment = async (e) => {
    if (e.status === "success") {
      // setLoading(true);
      setRazorPayResponse(e);
      await Promise.all(
        ProposalData.map(async (elem, index) => {
          if (
            !checkForValue(elem.PremiumDetails) &&
            (checkedState[`${index}`] === undefined || checkedState[`${index}`] === true)
          ) {
            const res = await Policies({ ...elem, "Product Code": elem?.ProductCode });
            setPolicyDetails((prevState) => ({
              ...prevState,
              [elem.Product]: res?.finalResult?.id,
            }));
          }
        })
      );
      // setLoading(false);
      setPaymentStatus(true);
    }
  };

  const [total, setTotal] = useState(0);

  const getInt = (num) => {
    if (num && num !== "" && IsNumeric(num.split(".")[0]) === true) return parseInt(num, 10);
    return 0;
  };

  const handleCheck = (e, i) => {
    setCheckedState((prevState) => ({ ...prevState, [i]: e.target.checked }));
  };

  const getValue = (value) => (value !== undefined && value !== null && value !== "" ? value : "");

  const handlePayment = async () => {
    if (consent === true) {
      setLoading(true);
      await GenerateMultiplePGUrl(ProposalData[0].opportunityId).then((res) => {
        setLoading(false);
        if (res) {
          setRefNo(res.paymentRefNo);
        }
      });
    } else {
      swal({ text: "Please give consent", icon: "error" });
    }
  };

  useEffect(() => {
    let newTotal = 0;
    if (Array.isArray(ProposalData)) {
      ProposalData.forEach((elem, index) => {
        if (
          !checkForValue(elem.PremiumDetails) &&
          (checkedState[`${index}`] === undefined || checkedState[`${index}`] === true)
        ) {
          newTotal += getInt(elem.PremiumDetails["Total Premium"]);
        }
      });
      setTotal(newTotal);
    }
  }, [checkedState]);

  useEffect(() => {
    if (!checkForValue(refNo)) {
      RayzorPay({
        key: "rzp_test_KK09FiPyLY2aKI",
        amount: total !== "" && total !== null ? parseInt(total, 10) : 1000,
        PayeeName: ProposalData[0].ProposerDetails.FirstName,
        PayeeEmail: ProposalData[0].ProposerDetails.EmailId,
        PayeeContact: ProposalData[0].ProposerDetails.ContactNo,
        PayeeAddress: "Maharastra",
        onPayment,
      });
    }
  }, [refNo]);

  return (
    <MDBox sx={{ width: "100%", pt: "1rem" }}>
      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={6} xxl={6}>
          <MDBox sx={{ width: "100%", mt: "-0.5rem" }} />
          <MDBox
            fullwidth
            sx={{
              background: "#CEEBFF",
              px: matchesMd ? "2rem" : "0.75rem",
              pb: "2rem",
              pt: "1rem",
              borderRadius: "0.25rem",
            }}
          >
            <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", fontWeight: 500 }}>
              Overall Summary
            </MDTypography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {Array.isArray(ProposalData) &&
                  ProposalData.map((elem, index) => (
                    <Grid container spacing={1} sx={{ pt: "1rem" }}>
                      {false && (
                        <Grid item xs={2} sm={2} md={1} lg={1} xl={1} xxl={1}>
                          <MDCheckbox
                            sx={{
                              "&.Mui-checked": {
                                color: primary.main,
                              },
                              // "& .MuiSvgIcon-root": {
                              //   color: primary.main,
                              // },
                              pt: 0,
                            }}
                            onChange={(e) => handleCheck(e, index)}
                            checked={
                              checkedState[index] === undefined || checkedState[index] === true
                            }
                          />
                        </Grid>
                      )}
                      <Grid item xs={10} sm={10} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography
                          variant="body1"
                          sx={{ fontSize: "0.875rem", color: primary.main }}
                        >
                          {getValue(elem.ProposalNo)}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={8} sm={8} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography
                          variant="body1"
                          sx={{ fontSize: "0.875rem", color: "#000000" }}
                        >
                          {getValue(elem.Product)} Premium
                        </MDTypography>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "0.875rem", color: "#000000" }}
                        >
                          {currencySymbol}
                          {!checkForValue(elem.PremiumDetails)
                            ? formatCurrency(getInt(elem.PremiumDetails["Total Premium"]))
                            : 0}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} />
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography sx={{ fontSize: "1.25rem", color: "#000000", fontWeight: 700 }}>
                  Total Premium
                </MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  mt={0}
                  sx={{ fontSize: "1.125rem", color: primary.main, fontWeight: 700 }}
                >
                  {currencySymbol} {formatCurrency(total)}
                </MDTypography>
              </Grid>

              <Grid item xs={2} sm={2} md={2} lg={1} xl={1} xxl={1}>
                <MDCheckbox
                  sx={{
                    "&.Mui-checked": {
                      color: primary.main,
                    },
                    // "& .MuiSvgIcon-root": {
                    //   color: primary.main,
                    // },
                    pt: 0,
                  }}
                  onChange={(e) => setConsent(e.target.checked)}
                  checked={consent}
                />
              </Grid>
              <Grid item xs={10} sm={10} md={6} lg={7} xl={7} xxl={7}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#000000" }}>
                  I agree that information entered is correct
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={4}
                xl={4}
                xxl={4}
                sx={{ display: "flex", justifyContent: "right" }}
              >
                <MDButton onClick={handlePayment}>Proceed to Payment</MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      {false && paymentStatus === true && (
        <PaymentSuccess paymentDetails={{ ...razorPayResponse, policyDetails, refNo }} />
      )}
      {false && paymentStatus === false && <PaymentFailure />}
    </MDBox>
  );
}

const getPolicyDto = () => {
  console.log(".");
  return {
    ProposalList: [],
    ProposalData: [],
    MSP: {
      ProposerName: "",
      ProposerPincode: "",
      ProposalNo: "800001",
      AgentBranchCode: "V089",
      ProposerContact: "",
      ProposerEmail: "",
      DCCode: "",
      AllocationType: "",
      MSPName: "",
      TestsToPerform: "",
      Address: "", //  { Address1: "", Address2: "", City: "", State: "", Pincode: "" },
      SpoCName: "",
      SpoCMobileNo: "",
      ScheduleType: "",
      AppointmentDate: "",
      AppointmentTime: "",
      dccode: "",
    },
    ProposerDetails: {},
  };
};

const getProcessSteps = () => {
  const steps = ["Proposal Verification", "Documents", "Premium & Payment", "MSP"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [{ name: "Proposals", visible: true }];
      break;
    case 1:
      steps = [{ name: "", visible: true }];
      break;
    case 2:
      steps = [{ name: "", visible: true }];
      break;
    case 3:
      steps = [{ name: "", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({
  activeStep,
  dto,
  setDto,
  styles,
  setLoading,
  masters,
  setMasters,
}) => {
  let data = [];
  const lDto = dto;
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const [img, setImg] = useState("");

  const handleFileUpload = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append(file.name, file, file.name);
      await DocumentUpload(formData).then((result) => {
        setLoading(false);
        if (result.dMSDTOs[0].fileName !== null) {
          lDto.ProposalData[0].InsurableItem[0].RiskItems[0].DocumentDetails[
            Number(event.target.name)
          ].fileName = file.name;
          lDto.ProposalData[0].InsurableItem[0].RiskItems[0].DocumentDetails[
            Number(event.target.name)
          ].UploadDocDate = new Date().toLocaleDateString();
          lDto.ProposalData[0].InsurableItem[0].RiskItems[0].DocumentDetails[
            Number(event.target.name)
          ].fileUploadStatus = true;
          lDto.ProposalData[0].InsurableItem[0].RiskItems[0].DocumentDetails[
            Number(event.target.name)
          ].fileId = result.dMSDTOs[0].fileName;
          setDto({ ...lDto });
          swal({
            icon: "success",
            text: "Document uploaded successfully",
          });
        }
      });
    } catch {
      setLoading(false);
    }
  };

  const handleDocFileDelete = async (i) => {
    try {
      setLoading(true);
      const fileId =
        lDto.ProposalData[0].InsurableItem[0].RiskItems[0].DocumentDetails[i].fileId.toString();
      lDto.ProposalData[0].InsurableItem[0].RiskItems[0].DocumentDetails[i] = {
        ...lDto.ProposalData[0].InsurableItem[0].RiskItems[0].DocumentDetails[i],
        fileName: "",
        UploadDocDate: "",
        fileUploadStatus: false,
        fileId: "",
      };
      await DeleteDocument(fileId).then(() => {
        setLoading(false);
      });
      setDto({ ...lDto });
    } catch {
      setLoading(false);
    }
  };

  const generateFile = async (e, fileName) => {
    try {
      setLoading(true);
      setAnchorEl(e.currentTarget);
      await GetDocumentById(fileName).then((res) => {
        setLoading(false);
        const src = `data:application/img;base64,${res.data}`;
        setImg(src);
        // const link = document.createElement("a");
        // link.href = src;
        // link.download = fileName;
        // link.click();
      });
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTab(0);
  }, [activeStep]);

  useEffect(() => {
    dto.ProposalList.forEach(async (proposalNo, ind) => {
      setLoading(true);
      await GetProposalByNumber(proposalNo).then((res) => {
        setLoading(false);
        if (res[0] && res[0].policyDetails !== undefined)
          setDto((prevState) => ({
            ...prevState,
            ProposalData: [...prevState.ProposalData, res[0].policyDetails],
            ProposerDetails: res[0].policyDetails.ProposerDetails,
          }));
      });

      if (ind === 0) {
        GenericApi("LifeInsurance", "MSP000007_DiagnosticCenter", {
          accessid: "123456789",
          pincode: `400054`,
          testname:
            "Video MER, Rest ECG, SBT 13, RUA, Haemogram, HbA1C, Urine Cotinine test, RUA, Lipidogram, ELISA for HIV, Hb%",
        }).then((res) => {
          if (Array.isArray(res.finalResult)) {
            //
          }
          // setMasters((prev) => ({ ...prev, MSPList: [...res.finalResult] }));
        });
      }
    });
  }, []);

  useEffect(async () => {
    await GenericApi("LifeInsurance", "MSP000007_DiagnosticCenter", {
      accessid: "123456789",
      pincode: `400054`,
      testname:
        "Video MER, Rest ECG, SBT 13, RUA, Haemogram, HbA1C, Urine Cotinine test, RUA, Lipidogram, ELISA for HIV, Hb%",
    }).then((res) => {
      if (Array.isArray(res.finalResult))
        setMasters((prev) => ({ ...prev, MSPList: [...res.finalResult] }));
    });
  }, []);

  const onMSPClick = (x) => {
    if (x !== null && x !== undefined) {
      const MSP = {
        DCCode: x.dccode,
        Address: x.dcaddress,
        MSPName: x.mspname,
        MSPCode: x.mspcode,
        MSPContactNo: x.contactMobileNumber,
        SpoCMobileNo: x.contactMobileNumber,
        SpoCName: x.contactPersonName,
        MSPScheduleType: "Self",
        TestsToPerform:
          "Video MER, Rest ECG, SBT 13, RUA, Haemogram, HbA1C, Urine Cotinine test, RUA, Lipidogram, ELISA for HIV, Hb%",
      };
      setDto({ ...lDto, MSP });
    }
  };

  const onScheduleAppointment = async () => {
    await GenericApi("LifeInsurance", "MSP000007_SchedulingApi", {
      accessid: "123465789",
      nameoftheproposer: dto.ProposerDetails?.Name,
      mobileNumber: dto.ProposerDetails?.ContactNo,
      emailId: dto.ProposerDetails?.EmailId,
      proposalnumber: "800001",
      proposalYear: `${new Date().getFullYear()}`,
      branchCode: "V089",
      pincode: `${dto.ProposerDetails?.PermanentAddress?.Pincode}`,
      listofprepolicymedicalreportstobeconducted: dto.MSP.TestsToPerform,
      dccode: dto.MSP.DCCode,
      appointmentdate: dto.MSP.AppointmentDate,
      appointmenttime: dto.MSP.AppointmentTime,
      schedulingtype: dto.MSP?.ScheduleType,
    });
    swal({ icon: "success", text: "Appointment scheduled successfully " });
  };

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setTab(newValue),
            tabs: dto.ProposalData.map((elem, index) => ({
              value: index,
              label: elem.Product,
            })),
            spacing: dto.ProposalList.length * 2.4,
          },
          /* eslint-disable react/no-array-index-key */
          ...dto.ProposalData.map((elem, index) => ({
            type: "Custom",
            return: (
              <LifeStepper
                key={index}
                styles={styles}
                setLoading={setLoading}
                data={{
                  ...getViewProposalStepper,
                  selectedList: elem,
                  customerView: true,
                  hideButtons: true,
                }}
                heading={elem.Product}
              />
            ),
            visible: tab === index,
            spacing: 12,
          })),
          /* eslint-enable react/no-array-index-key */
        ],
      ];
      break;
    case 1:
      try {
        data = [
          [
            {
              type: "Tabs",
              value: tab,
              visible: true,
              customOnChange: (e, newValue) => setTab(newValue),
              tabs: dto.ProposalData[0].InsurableItem?.[0]?.RiskItems?.map((elem, index) => ({
                value: index,
                label: elem.Name !== "" ? elem.Name : "Main Life",
              })),
              /* eslint-disable */
              spacing:
                dto.ProposalData[0].InsurableItem?.[0]?.RiskItems?.length * 2.4 /* eslint-enable */,
            },
            {
              type: "Custom",
              spacing: 12,
              visible: true,
              return: (
                <Popover
                  open={open}
                  onClick={() => {
                    setAnchorEl(null);
                    setImg("");
                  }}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                >
                  {img !== "" && (
                    <MDBox sx={{ border: "3px solid" }}>
                      <MDBox width="800px" height="500px" component="img" src={img} alt="" />
                    </MDBox>
                  )}
                </Popover>
              ),
            },

            ...dto.ProposalData[0].InsurableItem[0].RiskItems[tab].DocumentDetails.map((x, i) => ({
              type: "Custom",
              visible: true,
              spacing: 6.1,
              return: (
                <DocumentUploadCard
                  details={x}
                  index={i}
                  handleFileUpload={handleFileUpload}
                  handleDocFileDelete={handleDocFileDelete}
                  generateFile={generateFile}
                />
              ),
            })),
          ],
        ];
      } catch {
        data = [[]];
      }
      break;
    case 2:
      data = [
        [
          {
            type: "Custom",
            return: <ProposalSummary ProposalData={dto.ProposalData} setLoading={setLoading} />,
            visible: true,
            spacing: 12,
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "RadioGroup",
            path: `MSP.MSPScheduleType`,
            radioLabel: {
              labelVisible: true,
              label: "How would you like to schedule your appointment",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Self", value: "Self" },
              { label: "Auto", value: "Auto" },
            ],
            spacing: 12,
            visible: true,
            // customOnChange: onMSPAllocation,
          },

          ...masters.MSPList.map((x) => ({
            type: "Custom",
            visible: dto.MSP.MSPScheduleType === "Self",
            return: <MSPCard onClick={() => onMSPClick(x)} data={x} value={dto.MSP} />,
          })),
          {
            type: "Typography",
            label: "Schedule Details",
            visible: dto.MSP.MSPScheduleType === "Self",
            spacing: 12,
          },

          {
            type: "MDDatePicker",
            label: "Appointment Date",
            path: "MSP.AppointmentDate",
            visible: dto.MSP.MSPScheduleType === "Self",
            minDate: new Date(),
          },
          {
            type: "MDTimePicker",
            label: "Appointment Time",
            path: "MSP.AppointmentTime",
            visible: dto.MSP.MSPScheduleType === "Self",
          },
          {
            type: "Button",
            visible: true,
            justifyContent: "right",
            label: "Schedule Appointment",
            spacing: 10,
            variant: "outlined",
            onClick: onScheduleAppointment,
          },
        ],
      ];
      break;
    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep }) => {
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      fun = true;

      break;
    case 2:
      // try {
      //   await GenericApi("LifeInsurance", "MSP000007_SchedulingApi", {
      //     accessid: "123465789",
      //     nameoftheproposer: dto.ProposerDetails?.Name,
      //     mobileNumber: dto.ProposerDetails?.ContactNo,
      //     emailId: dto.ProposerDetails?.EmailId,
      //     proposalnumber: "800001",
      //     proposalYear: `${new Date().getFullYear()}`,
      //     branchCode: "V089",
      //     pincode: `${dto.ProposerDetails?.PermanentAddress?.Pincode}`,
      //     listofprepolicymedicalreportstobeconducted: dto.MSP.TestsToPerform,
      //     dccode: dto.MSP.DCCode,
      //     appointmentdate: dto.MSP.AppointmentDate,
      //     appointmenttime: dto.MSP.AppointmentTime,
      //     schedulingtype: dto.MSP.ScheduleType,
      //   });
      //   swal({ icon: "success", text: "Appointment Scheduled successfully" });
      // } catch {
      //   swal({ icon: "success", text: "Appointment Scheduled successfully" });
      // }
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async ({ setLoading, selectedId, setDto }) => {
  const mst = { MSPList: [] };
  const dto = { ...getPolicyDto() };

  if (selectedId !== "" && selectedId !== undefined) {
    setLoading(true);
    await GetOpportunity(selectedId).then((res) => {
      setLoading(false);
      if (res.OpportunityDetails !== undefined) {
        dto.ProposalList = _.uniqBy(
          [...res.OpportunityDetails.filter((x) => x.stageId === 4 && x.txnValue !== null)],
          "txnValue"
        ).map((x1) => x1.txnValue);
        setDto({ ...dto });
      }
    });
  }

  return mst;
};

const getVerificationStepper = {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
};

export default getVerificationStepper;
