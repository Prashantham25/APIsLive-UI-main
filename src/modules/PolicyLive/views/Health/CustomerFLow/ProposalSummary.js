import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, Modal, Backdrop, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Icon from "@mui/material/Icon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import MDBox from "components/MDBox";
import { pink } from "@mui/material/colors";
import swal from "sweetalert";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import OtpInput from "react-otp-input-rc-17";
import { data1 } from "./data/JsonData";
import { GetOTP, getOTP } from "../../../../BrokerPortal/Pages/CustomerEngage/data/index";
import { issuePolicy, sendPolicyPdf } from "./data";
import { GetProposalDetailsByProposalNumber } from "../../../../BrokerPortal/Pages/MotorProposal/data/index";
import {
  setLogo,
  setCustTheme,
  useDataController,
  setDentalInsuranceDetails,
} from "../../../../BrokerPortal/context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "56rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function Loading() {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <CircularProgress size="10rem" />
    </MDBox>
  );
}

function OTPModel({ handleOTP, otpdata, handleotpverify, handleModalClose, customerDetails }) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalClose} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="body1"
              sx={{
                textAlign: "center",
                fontSize: "1rem",
                color: "#000000",
                marginTop: "40px",
              }}
            >
              {" "}
              Enter the otp sent to {customerDetails.Email}{" "}
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ marginTop: "27px" }}>
            <OtpInput
              value={otpdata.otp}
              onChange={handleOTP}
              numInputs={6}
              isInputNum
              hasErrored
              inputStyle={{
                width: "48px",
                height: "48px",
                margin: "0.85rem",
                fontSize: "1rem",
                borderRadius: 4,
                border: "2px solid rgba(0,0,0,0.3)",
                background: "white",
              }}
            />
          </Grid>
          <Grid container justifyContent="space-between" sx={{ marginTop: "33px" }}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography
                sx={{
                  color: "#0071D9",
                  fontSize: "1.10rem",
                  textDecoration: "underline",
                  mr: "2rem",
                  ml: "2rem",
                  cursor: "pointer",
                }}
              >
                VerifyOTP
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} sx={{ marginRight: "27px" }}>
              <MDButton
                onClick={handleotpverify}
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                Proceed
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function FeatureList({ handleClose, data, title }) {
  const filteredData = data.filter((x) => x !== null);
  console.log("List", data, title);
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%", pt: "3rem", overflow: "auto" }}
    >
      <Card
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "0rem",
          boxShadow: "unset",
          minWidth: "38.5rem",
        }}
      >
        <MDBox justifyContent="end" display="flex" sx={{ width: "100%", background: "#CEEBFF" }}>
          <Icon fontSize="medium" onClick={handleClose}>
            close
          </Icon>
        </MDBox>
        <MDBox justifyContent="center" display="flex">
          <MDTypography
            variant="body1"
            sx={{
              fontSize: "1.5rem",
              background: "#CEEBFF",
              color: "#0071D9",
              width: "100%",
              textAlign: "center",
            }}
          >
            {title}
          </MDTypography>
        </MDBox>
        {filteredData.map((elem, id) => (
          <MDTypography
            sx={{
              px: "2rem",
              pt: "1rem",
              fontSize: "1.25rem",
              color: "#000000",
              background: id % 2 !== 0 ? "rgba(217, 217, 217, 0.18)" : "#FFFFFF",
            }}
          >
            {elem}
          </MDTypography>
        ))}
      </Card>
    </MDBox>
  );
}

function HdfcPayment(PolicyDto) {
  const [controller, dispatch] = useDataController();
  const [display, setdisplay] = useState(null);
  const LPolicyDto = PolicyDto;
  console.log("lpolicyyyydtoo", LPolicyDto);
  const [otpdata, setotpdata] = useState({
    otp: "",
  });
  console.log(otpdata, "otpdata");
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const { search } = useLocation();
  const [PolicyIssueDto, setPolicyIssueDto] = useState(data1);
  const [proposalDetails, setProposalData] = useState([]);
  console.log(proposalDetails, "proposalDetails");

  const [data, setData] = useState({
    ProductCode: "PDentalTest",
    PlanName: "Plan02",
    PlanNo: "315",
    MasterPolicyNo: "",
    MasterPolicyStartDate: "23/11/2022",
    MasterPolicyStartTime: "17:42",
    MasterPolicyEndDate: "22/09/2023",
    MasterPolicyEndTime: "17:42",
    CommissionPercentage: "",
    InwardNO: "",
    SumInsured: 0,
    ProposalDate: "25/11/2022",
    PolicyStartDate: "",
    PolicyStartTime: "17:42",
    PolicyEndDate: "",
    PolicyEndTime: "23:59",
    STaxExemptionCategory: "No Exemption",
    PolicyType: "",
    TPACode: "8000000010 - My Dental Plan",
    PolicyTenure: "1",
    GoGreen: "",
    QuotationNo: "",
    BusinessTypeDesc: "New Business",
    BusinessType: "3744",
    GroupSizeDesc: "1001 - 1500",
    GroupSize: "",
    CoverTypeDesc: "Voluntary",
    CoverType: "3740",
    ClaimType: "3743",
    TotalMembers: "2",
    OtherDetails: {
      BankBranchID: "",
      BdrCode: "",
      CustomerID: "",
      DocExCode: "",
      FosCode: "",
      ApplicationNo: "",
      SPCode: "",
      SPName: "",
      LGCode: "",
      LOSCode: "",
      SecurityCode: "",
      BankSmCode: "",
      TLCode: "",
      TSECode: "",
      LoanAccountNumber: "",
      LoanAmount: "",
      BankLead: "",
    },

    Benefit: [],
    ProposerDetails: {
      Salutation: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      DOB: " ",
      Age: "",
      Gender: "",
      EmailId: "",
      ContactNo: "",
      PAN: "",
      GST: "",
      GSTLocation: "",
      Nationality: "",
      VIPFlag: "yes",
      eIANoYN: "",
      eIANo: "",
      UniqueIdentificationNoYN: "",
      UniqueIdentificationNumber: "",
      CustomerID: "12345678",
      EmployeeID: "12345678",
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        Pincode: "",
        Area: "",
        CityDistrict: "",
        State: "",
      },
      CommunicationSameasPermanentYN: "",
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        Pincode: "",
        Area: "",
        CityDistrict: "",
        State: "",
      },
    },
    NomineeDetails: [
      {
        NomineeName: "",
        NomineeRelationship: "",
        NomineeDOB: "",
        NomineeAge: "",
        NomineeGender: "",
        NomineeAddressLine1: "",
        NomineeAddressLine2: "",
        NomineePincode: "",
        AppointeeName: "",

        AppointeeRelationshipwithNominee: "",
        AppointeeAddress: "",
      },
    ],

    InsurableItem: [
      {
        RemoveMember: [],
        RiskItems: [],
      },
    ],
    PrevPolicyDetails: {
      PrevInsurerDetailsAvailable: "",
      PreviousPolicyNumber: "",
      PreviousPolicyPremium: "",
      PolicyEffectiveDateFrom: "",
      PolicyEffectiveToDate: "",
      PreviousClaimNumber: "",
      NatureOfLoss: "",
      DateOfLoss: "",
      OustandingAmount: "",
      ClaimPaidAmount: "",
    },

    FamilyType: "",
    PayoutType: "Non Network",
    NumberType: " ",

    ProposalNo: "",
    RuleResult: [],
  });

  // This data is not hardcoded. Just to keep the structure to prevent getting error.

  console.log(data, "dataa");
  useEffect(() => {
    console.log("data11", data);
  }, [data]);
  const { DentalInsuranceDetails } = controller;
  console.log(DentalInsuranceDetails, "DentalInsuranceDetails");
  useEffect(() => {
    setDentalInsuranceDetails(dispatch, {
      data: { ...data },
    });
    console.log(DentalInsuranceDetails, "DentalInsuranceDetails");
  }, [data]);

  const [termsnCond, setTermsnCond] = useState({
    ncb: false,
    acceptTnC: false,
    verifyOTP1: false,
  });

  const [disablePayment, setDisablePayment] = useState(true);
  const [addressCity, setAddressCity] = useState({
    PermanentAddress: {
      city: "",
      state: "",
    },
    CommunicationAddress: {
      city: "",
      state: "",
    },
  });

  const [customerDetails, setCustomerDetails] = useState({
    Name: "",
    MobileNo: "",
    Email: "",
    status: false,
    ButtonChange: false,
  });
  console.log(customerDetails, "customerDetails");
  console.log("Ad", addressCity);
  const [addon, setAddon] = useState(false);
  const [plan, setPlan] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  console.log(setModalOpen);
  console.log(modalOpen);
  const [paymentData, setPaymentData] = useState();
  const [proposerName, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [policyFlag, setPolicyFlag] = useState(false);
  const [finalData, setFinalData] = useState({
    paymentDetailsDTO: {
      transactionNo: "73648274563",
      paymentSource: "Online",
      paymentId: "",
      paymentResponse: {
        TransactionNo: "73648274563",
        Amount: "175",
        PaymentGateway: "Razorpay",
        PaymentStatus: "Success",
        EmailId: "suma.ks@inubesolutions.com",
        TransactionType: " ",
        Description: "",
        ModeOfPayment: "",
        DocumentType: " ",
        BRANCH_GSTIN: "",
        CUSTOMER_GSTIN: "",
        MAXBUPA_BRANCH_CODE: "",
        CUSTOMER_STATE_CODE: "",
      },
    },
    proposalNo: "",

    "Product Code": "PDentalTest",
  });
  console.log("011", setLoading);

  const navigate = useNavigate();

  const handleOTP1 = (e) => {
    setotpdata({ ...otpdata, [e.target.name]: e.target.value });
    console.log(e.target.value, "otp1");
  };
  useEffect(() => {
    console.log("final Data", finalData);
  }, [finalData]);
  const handleSetPolicy = async () => {
    finalData.proposalNo = proposalDetails[0].proposalNo;
    finalData.paymentDetailsDTO.paymentResponse = PolicyIssueDto;
    setFinalData((prevState) => ({ ...prevState, ...finalData }));
    setPolicyFlag(true);
    const policy = await issuePolicy(finalData);
    console.log("223", policy);

    if (policy.status === 200) {
      sendPolicyPdf(policy.data.finalResult.id, proposalDetails[0].email);
      swal({
        html: true,
        icon: "success",
        text: policy.data.finalResult.responseMessage,
      });
      navigate(`/modules/PolicyLive/views/Health/Chomp/SuccessPayment`);
      setPolicyFlag(false);
      setDisablePayment(false);

      data.PolicyNumber = policy.data.finalResult.id;
      console.log(data, "data123");
      setDentalInsuranceDetails(dispatch, {
        data: { ...data },
      });
    }
  };
  const redirectBack = () => {
    const options = {
      key: "rzp_test_KK09FiPyLY2aKI",

      amount: Math.round(proposalDetails[0].policyDetails.PremiumDetails.TotalPremium * 100),
      name: proposalDetails[0].FirstName,
      description: "Policy Payment",
      email: proposalDetails[0].email,
      handler: async (response) => {
        console.log("response", response);

        if (
          typeof response.razorpay_payment_id !== "undefined" ||
          response.razorpay_payment_id > 1
        ) {
          console.log("response check", response.razorpay_payment_id);
          handleSetPolicy();
        } else {
          swal({
            text: "Payment Failed",
            icon: "error",
            html: true,
          });
        }
      },

      prefill: {
        name: proposerName,
        email: PolicyIssueDto.EmailId,
        contact: data.ProposerDetails.ContactNo,
      },
      notes: {
        address: "Bangalore",
      },
      theme: {
        color: "blue",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    console.log("rzp", rzp);
  };
  const handlePlanClose = () => setPlan(false);
  const handleAddonClose = () => setAddon(false);
  const [accept, setAccept] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  console.log(modalOpen1, "modalopen1");
  const handleModalClose = () => {
    setModalOpen1(false);
    setAccept(true);
  };
  const handleAccept = (e) => {
    if (e.target.value === "Accept") {
      setAccept(true);
    } else {
      setAccept(false);
      setModalOpen1(true);
    }
  };

  const handleotpverify = () => {
    if (otpdata.otp !== "") {
      const verifyOTP = {
        otp: otpdata.otp,
        email: LPolicyDto.PolicyDto.ProposerDetails.EmailId,
        mobileNumber: "",
        userName: LPolicyDto.PolicyDto.ProposerDetails.EmailId,
        envId: 297,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      Promise.all([GetOTP(verifyOTP)]).then((results) => {
        console.log("OTP Result", results);

        if (results[0].status === 1) {
          console.log("OTP verified successfully!");
          setdisplay(true);
          setCustomerDetails((prevState) => ({ ...prevState, status: false }));

          console.log(display, "disaplayyy");
          setTermsnCond((prevState) => ({
            ...prevState,
            verifyOTP1: true,
          }));
        } else {
          console.log("OTP verification Failed!");
          setdisplay(false);
          setTermsnCond((prevState) => ({
            ...prevState,
            verifyOTP1: false,
          }));
        }
      });
    }
  };

  const redirectPayment = async () => {
    const sendOTP = {
      name: customerDetails.Name,
      otp: "1234",
      email: customerDetails.Email,
      userName: "sindhu@inubesolutions.com",
      envId: 297,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    await getOTP(sendOTP).then((result) => {
      if (result.status === 1) {
        setCustomerDetails((prevState) => ({ ...prevState, status: true }));
        setCustomerDetails((prevState) => ({ ...prevState, ButtonChange: true }));
      } else {
        setCustomerDetails((prevState) => ({ ...prevState, status: false }));
        setCustomerDetails((prevState) => ({ ...prevState, ButtonChange: false }));
      }
      console.log("result", result);
    });
  };

  useEffect(async () => {
    // console.log("1", proposalDetails);
    const query = new URLSearchParams(search);

    // const proposalNumber = query.get("proposal"); checking for static proposal number as api is not working
    const proposalNumber = query.get(7520202200000213);
    console.log("proposalResp", query.get(7520202200000213));

    setLogo(dispatch, "HDFCErgoLogo");
    setCustTheme(dispatch, "HDFCErgoLogo");

    if (proposalNumber) {
      const proposalResp = await (await GetProposalDetailsByProposalNumber(proposalNumber)).data;
      console.log("proposalResp", proposalResp);
      setProposalData([...proposalResp]);
      console.log("1", proposalDetails);
      setData({ ...proposalResp[0].policyDetails });
      console.log("12", data);
      PolicyIssueDto.Amount = proposalResp[0].policyDetails.PremiumDetails.TotalPremium;
      setName(proposalResp[0].policyDetails.ProposerDetails.Name);
      PolicyIssueDto.EmailId = proposalResp[0].policyDetails.ProposerDetails.EmailId;
      // setProposalNo(proposalResp[0].proposalNo);
      setPolicyIssueDto(PolicyIssueDto);
    }
  }, []);

  useEffect(() => {
    setCustomerDetails((prevState) => ({
      ...prevState,
      Name: LPolicyDto.PolicyDto.ProposerDetails.FirstName,
      Email: LPolicyDto.PolicyDto.ProposerDetails.EmailId,
      MobileNo: LPolicyDto.PolicyDto.ProposerDetails.ContactNo,
    }));
    console.log(customerDetails, "customerDetails");
  }, [LPolicyDto]);

  useEffect(() => {
    if (termsnCond.ncb && termsnCond.verifyOTP1) setDisablePayment(false);
    else setDisablePayment(true);
  }, [termsnCond.verifyOTP1, termsnCond.ncb]);

  useEffect(() => {
    if (data.ProposerDetails.CommunicationSameasPermanentYN === "Yes") {
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: {
          state: prevState.PermanentAddress.state,
          city: prevState.PermanentAddress.city,
        },
      }));
    } else if (data.ProposerDetails.CommunicationSameasPermanentYN === "No") {
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: { state: "", city: "" },
      }));
    }
  }, [data.ProposerDetails.CommunicationSameasPermanentYN]);

  useEffect(() => {
    // console.log("PaymentFormData", "outside");
    console.log("setPaymentData", setPaymentData);
    if (paymentData) {
      //   console.log("PaymentFormData", paymentData.OutputResult);
      if (paymentData.OutputResult.InputJson) {
        // post(paymentData.OutputResult);
      } else {
        const paymentURL = paymentData.OutputResult.PaymentURL;
        window.location.href = paymentURL;
      }
    }
  }, [paymentData]);

  return (
    <MDBox>
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={1} justifyContent="center" alignItems="start" height="100%">
          <Modal open={plan} onClose={handlePlanClose}>
            <FeatureList
              handleClose={handlePlanClose}
              // data={planData}
              title="Plan Feature List"
            />
          </Modal>
          <Modal open={addon} onClose={handleAddonClose}>
            <FeatureList
              handleClose={handleAddonClose}
              // data={addonData}
              title="Add-on Covers"
            />
          </Modal>

          <Card>
            <Grid container spacing={1} m={2} direction="row ">
              <Grid item md={7} lg={7} xl={7} xxl={7} ml={2}>
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="h6" color="primary">
                      Covers
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        {LPolicyDto.PolicyDto.Benefit.map((x, id) => (
                          <MDTypography>{LPolicyDto.PolicyDto.Benefit[id].CoverName}</MDTypography>
                        ))}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="h6" color="primary">
                      Policy Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        {/* <MDInput disabled value={data.PolicyStartDate} label="Policy Start Date" /> */}
                        <MDInput
                          label="Transaction Type"
                          disabled
                          // value={getValue("Salutation", data.ProposerDetails.Salutation)}
                          value={LPolicyDto.PolicyDto.BusinessTypeDesc}
                          id="TransactionType"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          fullwidth
                          // sx={{ width: 300 }}
                          label="Proposal Date"
                          value={LPolicyDto.PolicyDto.ProposalDate}
                          // onChange={handleChange}

                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          fullwidth
                          // sx={{ width: 300 }}
                          label="Policy Start Date"
                          value={LPolicyDto.PolicyDto.PolicyStartDate}
                          // onChange={handleChange}

                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          fullwidth
                          // sx={{ width: 300 }}
                          label="Policy End Date"
                          value={LPolicyDto.PolicyDto.PolicyEndDate}
                          // onChange={handleChange}

                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        {/* <MDInput disabled value={data.PolicyStartDate} label="Policy Start Date" /> */}
                        <MDInput
                          label="Policy Type"
                          disabled
                          // value={getValue("Salutation", data.ProposerDetails.Salutation)}
                          value={LPolicyDto.PolicyDto.PolicyType}
                          id="PolicyType"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          fullwidth
                          // sx={{ width: 300 }}
                          label="Family Type"
                          value={LPolicyDto.PolicyDto.FamilyType}
                          // onChange={handleChange}

                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        {/* <MDInput disabled value={data.PolicyStartDate} label="Policy Start Date" /> */}
                        <MDInput
                          label="Service Tax Exemption Category"
                          disabled
                          // value={getValue("Salutation", data.ProposerDetails.Salutation)}
                          value={LPolicyDto.PolicyDto.STaxExemptionCategory}
                          id="FamSTaxExemptionCategoryilyType"
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="h6" color="primary">
                      Proposal Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Title"
                          disabled
                          // value={getValue("Salutation", data.ProposerDetails.Salutation)}
                          value={LPolicyDto.PolicyDto.ProposerDetails.Salutation}
                          id="Salutation"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="CustomerName"
                          value={LPolicyDto.PolicyDto.ProposerDetails.FirstName}
                          label="First Name"
                          required
                          name="FirstName"
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          // id="CustomerName"
                          value={LPolicyDto.PolicyDto.ProposerDetails.MiddleName}
                          label="Middle Name"
                          required
                          name="MiddleName"
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          // id="CustomerName"
                          value={LPolicyDto.PolicyDto.ProposerDetails.LastName}
                          label="Last Name"
                          required
                          name="LastName"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          // id="CustomerName"
                          value={LPolicyDto.PolicyDto.ProposerDetails.DOB}
                          label="Proposer DOB"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Proposer Gender"
                          // value={getValue("Gender", data.ProposerDetails.Gender)}
                          value={LPolicyDto.PolicyDto.ProposerDetails.Gender}
                          id="Gender"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="EmailId"
                          value={LPolicyDto.PolicyDto.ProposerDetails.EmailId}
                          label="Email ID"
                          name="EmailId"
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="ContactNo"
                          value={LPolicyDto.PolicyDto.ProposerDetails.ContactNo}
                          label="Mobile Number"
                          name="ContactNo"
                          inputProps={{ maxLength: 10 }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="PanNo"
                          value={LPolicyDto.PolicyDto.ProposerDetails.PAN}
                          name="PAN"
                          label="PAN Card No"
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="GST"
                          value={LPolicyDto.PolicyDto.ProposerDetails.GST}
                          name="GST"
                          label="GST No"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="GSTLocation"
                          value={LPolicyDto.PolicyDto.ProposerDetails.GSTLocation}
                          name="GSTLocation"
                          label="GST Location"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          fullwidth
                          // sx={{ width: 300 }}
                          label="Nationality"
                          value={LPolicyDto.PolicyDto.ProposerDetails.Nationality}
                          // onChange={handleChange}

                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          fullwidth
                          // sx={{ width: 300 }}
                          label="EmployeeID"
                          value={LPolicyDto.PolicyDto.EmployeeID}
                          // onChange={handleChange}

                          disabled
                        />
                      </Grid>

                      <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                        <MDTypography
                          sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}
                        >
                          Do you have an E-Insurance Account(eIA no)
                        </MDTypography>

                        <RadioGroup
                          row
                          disabled
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          sx={{ justifyContent: "center", ml: 2.5 }}
                          defaultValue="No"
                          value={LPolicyDto.PolicyDto.ProposerDetails.eIANoYN}
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </MDBox>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        {LPolicyDto.PolicyDto.ProposerDetails.eIANoYN === "Yes" ? (
                          <MDInput
                            disabled
                            label="EIA no"
                            value={LPolicyDto.PolicyDto.ProposerDetails.eIANo}
                            required
                          />
                        ) : null}
                      </Grid>

                      <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                        <MDTypography
                          sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}
                        >
                          Do you have an Unique Identification Number(UIN)
                        </MDTypography>

                        <RadioGroup
                          row
                          disabled
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          sx={{ justifyContent: "center", ml: 0.1 }}
                          defaultValue="No"
                          value={LPolicyDto.PolicyDto.ProposerDetails.UniqueIdentificationNoYN}
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </MDBox>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        {LPolicyDto.PolicyDto.ProposerDetails.UniqueIdentificationNoYN === "Yes" ? (
                          <MDInput
                            disabled
                            label="Unique Identification Number"
                            value={LPolicyDto.PolicyDto.ProposerDetails.UniqueIdentificationNumber}
                            required
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="h6" color="primary">
                      Communication Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <MDTypography sx={{ color: "#000000", size: "1rem", textAlign: "left" }}>
                      Communication Address Details
                    </MDTypography>
                    <Grid container spacing={1.5} mt={1}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Address1"
                          value={
                            LPolicyDto.PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1
                          }
                          name="AddressLine1"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Address2"
                          value={
                            LPolicyDto.PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2
                          }
                          name="AddressLine2"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Area"
                          value={LPolicyDto.PolicyDto.ProposerDetails.CommunicationAddress.Area}
                          name="Area"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="City"
                          // value={addressCity.CommunicationAddress.city}
                          value={
                            LPolicyDto.PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict
                          }
                          readOnly
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="State"
                          // value={addressCity.CommunicationAddress.state}
                          value={LPolicyDto.PolicyDto.ProposerDetails.CommunicationAddress.State}
                          readOnly
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Pin Code"
                          value={LPolicyDto.PolicyDto.ProposerDetails.CommunicationAddress.Pincode}
                          name="Pincode"
                        />
                      </Grid>
                    </Grid>
                    <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                      <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                        <MDTypography
                          sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}
                        >
                          Is Communication address same as Permanent address?
                        </MDTypography>
                      </Grid>

                      <RadioGroup
                        row
                        disabled
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ justifyContent: "center", ml: 2.5 }}
                        defaultValue="No"
                        value={LPolicyDto.PolicyDto.ProposerDetails.CommunicationSameasPermanentYN}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </MDBox>
                    <MDTypography sx={{ color: "#000000", size: "1rem", textAlign: "left" }}>
                      Permanent Address Details
                    </MDTypography>

                    <Grid container spacing={1.5} mt={1}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Address1"
                          value={LPolicyDto.PolicyDto.ProposerDetails.PermanentAddress.AddressLine1}
                          name="AddressLine1"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Address2"
                          value={LPolicyDto.PolicyDto.ProposerDetails.PermanentAddress.AddressLine2}
                          name="AddressLine2"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Area"
                          value={LPolicyDto.PolicyDto.ProposerDetails.PermanentAddress.Area}
                          name="Area"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="City"
                          // value={addressCity.CommunicationAddress.city}
                          value={LPolicyDto.PolicyDto.ProposerDetails.PermanentAddress.CityDistrict}
                          readOnly
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="State"
                          // value={addressCity.CommunicationAddress.state}
                          value={LPolicyDto.PolicyDto.ProposerDetails.PermanentAddress.State}
                          readOnly
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Pin Code"
                          value={LPolicyDto.PolicyDto.ProposerDetails.PermanentAddress.Pincode}
                          name="Pincode"
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                {}
                {/* {data.InsurableItem[0].RiskItemsmap((item, index) => ( */}
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="h6" color="primary">
                      Nominee Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Nominee Name"
                          value={LPolicyDto.PolicyDto.NomineeDetails[0].NomineeName}
                          // value={data.InsurableItem[0].RiskItems[index].NomineeName}
                          name="NomineeName"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Nominee Relationship"
                          value={LPolicyDto.PolicyDto.NomineeDetails[0].NomineeRelationship}
                          id="NomineeRelationWithProposer"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Nominee DOB"
                          required
                          value={LPolicyDto.PolicyDto.NomineeDetails[0].NomineeDOB}
                          disabled
                        />
                      </Grid>
                      {LPolicyDto.PolicyDto.NomineeDetails[0].AppointeeName !== "" ? (
                        <>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              disabled
                              label="Appointee Name"
                              value={LPolicyDto.PolicyDto.NomineeDetails[0].AppointeeName}
                              // value={data.NomineeDetails[0].Appointeename}
                              name="AppointeeName"
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              disabled
                              label="Appointee Relationship"
                              value={
                                LPolicyDto.PolicyDto.NomineeDetails[0]
                                  .AppointeeRelationshipwithNominee
                              }
                              id="AppointeeRelationWithProposer"
                            />
                          </Grid>
                        </>
                      ) : null}
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="h6" color="primary">
                      Insured Details
                    </MDTypography>
                  </AccordionSummary>
                  {LPolicyDto.PolicyDto.InsurableItem[0].RiskItems.map((x, id) => (
                    <AccordionDetails>
                      <Grid xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography sx={{ fontSize: "1.125rem", color: "#344054", weight: 600 }}>
                          Insured Member 0{id + 1}
                        </MDTypography>
                      </Grid>
                      <Grid container spacing={1.5}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            disabled
                            label="Insured Name"
                            value={LPolicyDto.PolicyDto.InsurableItem[0].RiskItems[id].Name}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            disabled
                            label="Insured Relationship With Proposer"
                            value={
                              LPolicyDto.PolicyDto.InsurableItem[0].RiskItems[id]
                                .relationShipToProposer
                            }
                            id="NomineeRelationWithProposer"
                            required
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  ))}
                </Accordion>
              </Grid>
              <Grid item md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
                <MDBox fullwidth sx={{ background: "#EAE9E9", px: "2rem", pb: "2rem" }}>
                  <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                    Proposal Summary
                  </MDTypography>
                  <Grid container spacing={1}>
                    {/* <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} /> */}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={5} mb={2}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Basic Premium
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={5} mb={2}>
                      {proposalDetails.length > 0 ? (
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {formatter.format(
                            proposalDetails[0].policyDetails.PremiumDetails.GrossPremium
                          )}
                          {/* {proposalDetails[0].policyDetails.PremiumDetails.GrossPremium} */}
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={2}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        GST(18%)
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={2}>
                      {proposalDetails.length > 0 ? (
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {formatter.format(
                            Math.abs(proposalDetails[0].policyDetails.PremiumDetails.IGST)
                          )}
                        </MDTypography>
                      ) : null}
                    </Grid>
                    {/* <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} /> */}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={2}>
                      <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Total Premium
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={2}>
                      {proposalDetails.length > 0 ? (
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          mt={0}
                          sx={{ fontSize: "1rem" }}
                        >
                          {" "}
                          {formatter.format(
                            proposalDetails[0].policyDetails.PremiumDetails.TotalPremium
                          )}
                          {/* {proposalDetails[0].policyDetails.PremiumDetails.TotalPremium} */}
                          {/* {formatter.format(proposalDetails[0].policyDetails.PremiumDetails.TotalPremium.toString().replace("INR", ""))} */}
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={2}>
                      <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Grand Total (Premium Excluding GST)
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={2}>
                      {proposalDetails.length > 0 ? (
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          mt={0}
                          sx={{ fontSize: "1rem", color: "#E41D25" }}
                        >
                          {" "}
                          {formatter.format(
                            proposalDetails[0].policyDetails.PremiumDetails.GrossPremium
                          )}
                          {/* {proposalDetails[0].policyDetails.PremiumDetails.TotalPremium} */}
                          {/* {formatter.format(proposalDetails[0].policyDetails.PremiumDetails.TotalPremium.toString().replace("INR", ""))} */}
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={2}>
                      <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Grand Total (Premium Including GST)
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={2}>
                      {proposalDetails.length > 0 ? (
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          mt={0}
                          sx={{ fontSize: "1rem", color: "#E41D25" }}
                        >
                          {" "}
                          {formatter.format(
                            proposalDetails[0].policyDetails.PremiumDetails.TotalPremium
                          )}
                          {/* {proposalDetails[0].policyDetails.PremiumDetails.TotalPremium} */}
                          {/* {formatter.format(proposalDetails[0].policyDetails.PremiumDetails.TotalPremium.toString().replace("INR", ""))} */}
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={2}>
                      <Stack direction="row" spacing={1}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          sx={{ color: "error", fontSize: "0.5rem", borderRadius: "50%" }}
                          onChange={handleAccept}
                        >
                          <FormControlLabel
                            value="Accept"
                            control={<Radio />}
                            label="Accept"
                            mr={2}
                          />
                          <FormControlLabel value="Reject" control={<Radio />} label="Reject" />
                        </RadioGroup>
                      </Stack>
                    </Grid>

                    {accept ? (
                      <>
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7} mb={2}>
                          <MDInput
                            type="password"
                            label="Enter OTP"
                            // onChange={handleEmailAndPassword}
                            // value={fieldDetails.otp}
                            value={otpdata.otp}
                            onChange={handleOTP1}
                            name="otp"
                            fullWidth
                            inputProps={{ maxLength: 6 }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} mb={2} ml={0}>
                          {customerDetails.ButtonChange === true ? (
                            <MDButton
                              sx={{ fontSize: "0.7rem" }}
                              variant="outlined"
                              onClick={handleotpverify}
                            >
                              Verify OTP
                            </MDButton>
                          ) : (
                            <MDButton
                              sx={{ fontSize: "0.7rem" }}
                              variant="outlined"
                              onClick={redirectPayment}
                            >
                              GET OTP
                            </MDButton>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          {customerDetails.status === true ? (
                            <>
                              <MDTypography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "green",
                                  textAlign: "left",
                                  mt: "-1rem",
                                }}
                              >
                                OTP Sent to the Registered Email & Mobile No
                              </MDTypography>
                              <MDTypography
                                sx={{
                                  color: "red",
                                  fontSize: "0.875rem",
                                  variant: "h6",

                                  //  textAlign: "end",
                                  cursor: "pointer",
                                }}
                                onClick={redirectPayment}
                                // onClick={onSendOTP}
                              >
                                Resend OTP
                              </MDTypography>
                            </>
                          ) : null}
                          {display ? (
                            <>
                              <MDTypography
                                sx={{
                                  fontSize: "0.9rem",
                                  color: "green",
                                  textAlign: "left",
                                  mt: "-1rem",
                                }}
                              >
                                OTP Verified Successfully
                              </MDTypography>
                              <MDTypography
                                sx={{
                                  color: "red",
                                  fontSize: "0.875rem",
                                  variant: "h6",

                                  //  textAlign: "end",
                                  cursor: "pointer",
                                }}
                                onClick={redirectPayment}
                              >
                                Resend OTP
                              </MDTypography>
                            </>
                          ) : null}
                        </Grid>
                      </>
                    ) : (
                      <Modal
                        open={modalOpen1}
                        onClose={handleModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <div>
                          <MDBox sx={style}>
                            <Grid container justifyContent="flex-end">
                              <ClearIcon onClick={handleModalClose} />
                            </Grid>
                            <MDTypography>
                              Are You Sure You Want To Reject The Proposal?
                            </MDTypography>
                            <MDButton sx={{ mr: "33px", mt: "20px" }}>Yes</MDButton>
                            <MDButton sx={{ mt: "20px" }} onClick={handleModalClose}>
                              No
                            </MDButton>
                          </MDBox>
                        </div>
                      </Modal>
                    )}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={2}>
                      <Modal
                        open={modalOpen}
                        onClose={handleModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <OTPModel
                          // handleOTP={handleOTP}
                          otpdata={otpdata}
                          handleModalClose={handleModalClose}
                          customerDetails={customerDetails}
                          //  handleotpverify={handleotpverify}
                        />
                      </Modal>{" "}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      flexDirection="row"
                      display="flex"
                    >
                      <Checkbox
                        color="secondary"
                        value={termsnCond.ncb}
                        onChange={(e) =>
                          setTermsnCond((prevState) => ({ ...prevState, ncb: e.target.checked }))
                        }
                      />

                      <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                        By clicking proceed to payment, you are confirming that you have read and
                        agreed to the Terms & Conditions
                      </MDTypography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      xxl={6}
                      justifyContent="right"
                      alignItems="start"
                      display="flex"
                    >
                      <MDButton
                        sx={{ fontSize: "0.7rem" }}
                        onClick={redirectBack}
                        disabled={disablePayment}
                      >
                        Proceed to payment
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </Card>

          <Backdrop
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
            open={policyFlag}
          >
            <CircularProgress />
          </Backdrop>
        </Grid>
      )}
    </MDBox>
  );
}

export default HdfcPayment;
