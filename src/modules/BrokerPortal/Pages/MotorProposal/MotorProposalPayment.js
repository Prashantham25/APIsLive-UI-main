// prop-types is a library for typechecking of props
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// @mui material components
import { CircularProgress, Modal } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Icon from "@mui/material/Icon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ClearIcon from "@mui/icons-material/Clear";
import swal from "sweetalert";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components

// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// import Share from "assets/images/BrokerPortal/Share.png";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CustDetail from "assets/images/BrokerPortal/CustDetail.png";
import OtpInput from "react-otp-input-rc-17";
import { UploadFiles } from "../MyProfile/data/index";
import { GetOTP, getOTP } from "../CustomerEngage/data/index";
import {
  GetProposalDetailsByProposalNumber,
  GetAllMasters,
  GetVehicleDetails,
  GetICDetails,
  GetQuote,
  GetPaymentURL,
} from "./data";
import { postRequest } from "../../../../core/clients/axiosclient";
import { CoveredNotCoveredData } from "../MotorComparison/data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "56rem",
  bgcolor: "background.paper",
  // border: '2px solid #000',
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

function OTPModel({
  handleOTP,
  otpdata,
  handleotpverify,
  handleModalClose,
  customerDetails,
  handleModalEmailOpen,
  handleEmailchange,
  flags,
}) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalClose} />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
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
              Enter the otp sent to{" "}
              {flags.getotpflag === true ? otpdata.Email : customerDetails.Email}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ marginTop: "27px" }}>
            <OtpInput
              value={otpdata.otp}
              onChange={handleOTP}
              numInputs={6}
              isInputNum
              hasErrored
              isInputSecure
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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="body1"
              onClick={handleModalEmailOpen}
              sx={{
                textAlign: "center",
                fontSize: "1rem",
                color: "#0071D9",
                marginLeft: "-253px",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {" "}
              Change Email
            </MDTypography>
          </Grid>
          <Grid container justifyContent="space-between" sx={{ marginTop: "33px" }}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography
                onClick={handleEmailchange}
                sx={{
                  color: "#0071D9",
                  fontSize: "1.10rem",
                  textDecoration: "underline",
                  mr: "2rem",
                  ml: "2rem",
                  cursor: "pointer",
                }}
              >
                ResendOTP
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
function ChangeEmailModel({ handleEmail, otpdata, handleModalEmailClose, handleEmailchange }) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalEmailClose} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ marginTop: "72px", margingLeft: "11px" }}
        >
          <MDInput
            id="Email"
            value={otpdata.Email}
            name="Email"
            onChange={handleEmail}
            // onBlur={handleValidate}
            label="Email"
          />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            sx={{ marginRight: "27px", marginTop: "75px" }}
          >
            <Grid container justifyContent="flex-end">
              <MDButton
                onClick={handleEmailchange}
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                Get OTP
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
function GetCheckbox({ VehicleType, BusinessType, setTermsnCond, termsnCond }) {
  let content;
  if (BusinessType === "4" || BusinessType === "New Business") {
    switch (VehicleType) {
      case "16":
        content = (
          <div>
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
                value={termsnCond.acceptTnC}
                onChange={(e) =>
                  setTermsnCond((prevState) => ({
                    ...prevState,
                    acceptTnC: e.target.checked,
                  }))
                }
              />

              <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                I agree to the terms & conditions and confirm: my car is not a commercial vehicle,
                and my car has a valid PUC certificate.
              </MDTypography>
            </Grid>
          </div>
        );
        break;
      case "17":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column">
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
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the terms & conditions and confirm that the vehicle is a registered
                  private two wheeler. I also confirm that the details provided by me are accurate,
                  and I agree to provide any additional documents as a pre-condition for policy
                  issuance.
                </MDTypography>
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
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree my bike has a valid PUC certificate.
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "193":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column">
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
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the terms & conditions and confirm that my commercial vehicle holds a
                  valid PUC Certificate
                </MDTypography>
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
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I declare that the information provided above is true and accept that if it is
                  found to be false, it may impact claims. I also declare that I have an existing
                  Personal Accident cover of Rs. 15 lacs
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "194":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column">
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
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the terms & conditions and confirm that my commercial vehicle holds a
                  valid PUC Certificate
                </MDTypography>
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
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I declare that the information provided above is true and accept that if it is
                  found to be false, it may impact claims. I also declare that I have an existing
                  Personal Accident cover of Rs. 15 lacs
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      default:
        console.log("1234567890");
    }
    // return content;
  } else if (BusinessType === "6" || BusinessType === "Roll Over") {
    switch (VehicleType) {
      case "16":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column">
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
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the terms & conditions and confirm: my car is not a commercial vehicle,
                  and my car has a valid PUC certificate.
                </MDTypography>
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
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      ncb: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I confirm that I have a valid NCB reserving certificate for the 20% NCB
                  transferred to my new car and that the original certificate will be produced at
                  the time of claim. You have confirmed that you have a valid NCB transfer
                  certificate
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "17":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column">
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
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the terms & conditions and confirm: my car is not a commercial vehicle,
                  and my bike has a valid PUC certificate.
                </MDTypography>
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
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree my bike has a valid PUC certificate.
                </MDTypography>
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
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      ncb: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I confirm that I have a valid NCB reserving certificate for the 20% NCB
                  transferred to my new bike and that the original certificate will be produced at
                  the time of claim. You have confirmed that you have a valid NCB transfer
                  certificate
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "193":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column">
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
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the terms & conditions and confirm: my previous policy is a
                  comprehensive policy with 20% NCB and with no claims and my car has a valid PUC
                  certificate.
                </MDTypography>
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
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree my bike has a valid PUC certificate.
                </MDTypography>
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
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      ncb: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I declare that the information provided above is true and accept that if it is
                  found to be false, it may impact claims. I also declare that I have an existing
                  Personal Accident cover of Rs. 15 lacs
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "194":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column">
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
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the terms & conditions and confirm: my previous policy is a
                  comprehensive policy with 20% NCB and with no claims and my car has a valid PUC
                  certificate.
                </MDTypography>
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
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree my bike has a valid PUC certificate.
                </MDTypography>
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
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      ncb: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I declare that the information provided above is true and accept that if it is
                  found to be false, it may impact claims. I also declare that I have an existing
                  Personal Accident cover of Rs. 15 lacs
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      default:
        console.log("1234567890");
    }
    // return content;
  }
  return content || null;
}
function MotorProposalPayment() {
  const [otpdata, setotpdata] = useState({
    otp: "",
    Email: "",
  });
  const { search } = useLocation();
  const [args, setArgs] = useState({
    productId: null,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const [masters, setMasters] = useState({
    Gender: [],
    NomineeRelation: [],
    // Country:[],
    //   VariantDetailsOutput:[],
    //   RTODetailsOutput:[],
    Salutation: [],
    MaritalStatus: [],
    Occupation: [],
    PolicyType: [],
  });

  const [vehicle, setVehicle] = useState({
    VehicleDetail: [
      {
        mID: "6",
        MAKE: "HONDA",
        VARIANT: "1.3 Exi",
        MODEL: "CITY 1.5 EXI",
        Cubic_Capacity: "1497",
        Seating_Capacity: "5",
        Fuel_Type: "Petrol C",
      },
    ],
    RtoDetail: [
      {
        RTO_Code: "Delhi North Mall Road",
      },
    ],
  });
  const [proposalDetails, setProposalData] = useState([]);
  const [data, setData] = useState({
    BaseProductCode: "",
    BusinessType: "",
    PolicyType: "",
    VehicleType: "",
    CoverDetails: {
      AddOnsPlanApplicable: "",
      AddOnsPlanApplicableDetails: {
        PlanName: "Optional Add on",
        ZeroDepreciation: "",
        ReturnToInvoice: "",
        RoadSideAssistance: "",
        NCBProtection: "",
        InconvenienceAllowance: "",
        EngineProtector: "",
        KeyReplacement: "",
        LossOfPerBelongings: "",
      },
      BasicODApplicable: "Y",
      BasicTPApplicable: "Y",
      CompulsoryExcessAmount: "1000",
      FinancierDetails: {
        AgreementType: "",
        BranchName: "",
        CityCode: "",
        CityName: "",
        DistrictCode: "",
        DistrictName: "",
        FinancierAddress: "",
        FinancierCode: "",
        FinancierName: "",
        FinBusinessType: "",
        LoanAccountNumber: "",
        Pincode: "",
        PincodeLocality: "",
        StateCode: "",
        StateName: "",
      },
      FinancierDetailsApplicable: "",
      ImposedExcessAmount: "",
      IsPrevPolicyApplicable: "",
      OptionalCoverageApplicable: "true",
      OptionalCoverageDetails: {
        ApprovedAntiTheftDevice: "false",
        CertifiedbyARAI: "true",
        ElectricalApplicable: "false",
        ElectricalDetails: "",
        ExternalCNGkitApplicable: "false",
        ExternalCNGLPGkitDetails: "",
        ExternalLPGkitApplicable: "false",
        "FiberFuelTankApplicable ": "false",
        FiberFuelTankDetails: "",
        GeographicalExtensionApplicable: "false",
        GeographicalExtensionDetails: "",
        InbuiltCNGkitApplicable: "false",
        InbuiltLPGkitApplicable: "false",
        IsVehicleforHandicappedApplicable: "false",
        LLEmployeesApplicable: "false",
        LLEmployeesDetails: "",
        LLPaidDriverCleanerApplicable: "false",
        LLPaidDriverCleanerDetails: "",
        NamedPACoverApplicable: "false",
        NamedPACoverDetails: "",
        NonElectricalApplicable: "false",
        NonElectricalDetails: "",
        PAPaidDriverApplicable: "false",
        PAPaidDriverDetails: "",
        TheftAccessoriesApplicable: "false",
        TheftAccessoriesDetails: "",
      },
      PAOwnerCoverApplicable: "true",
      PAOwnerCoverDetails: {
        DoNotHoldValidDrvLicense: "false",
        ExistingPACover: "false",
        Ownmultiplevehicles: "false",
        PAOwnerSI: "1500000",
        PAOwnerTenure: "3",
        ValidDrvLicense: "true",
      },
      VoluntaryExcessAmount: "0",
    },
    PolicyEffectiveFromDate: "",
    PolicyEffectiveFromHour: "",
    PolicyEffectiveToDate: "",
    PolicyEffectiveToHour: "",
    PolicyTerm: "",
    ProposalDate: "",
    QuotationNo: "",
    VehicleDetails: {
      ChassisNumber: "",
      EngineNumber: "",
      IDVofVehicle: "",
      MakeId: "",
      ModelId: "",
      MonthOfManufacture: "",
      RegistrationDate: "",
      RegistrationNumber: "",
      RegistrationNumber1: "",
      RegistrationNumber2: "",
      RegistrationNumber3: "",
      RegistrationNumber4: "",
      RTOId: null,
      VariantId: null,
      VehicleOwnerShip: "",
      YearOfManufacture: "",
    },
    PreviousPolicyDetails: {
      previousPolicyExpiryDate: "",
      PreviousInsurerapplicable: "",
      PreviousPolicyNumber: "",
      previousInsurerCompanyCode: "",
      previousPolicyNumber: "",
      NoPreviousPolicyHistory: "",
      isVehicleNew: "",
      PreviousPolicyEndDate: "",
      PreviousPolicyInsurerName: "",
      PreviousPolicyStartDate: "",
      previousPolicyType: "1",
      PreviousNCBPercentage: "",
      PreviousPolicyTenure: "",
      ClaimOnPreviousPolicy: "false",
      NoOfClaims: "",
      IsInspectionDone: "",
      InspectionDoneByWhom: "",
      ReportDate: "",
      InspectionDate: "",
    },
    POSPInfo: {
      isPOSP: "",
      pospName: "",
      pospUniqueNumber: "",
      pospLocation: "",
      pospPanNumber: "",
      pospAadhaarNumber: "",
      pospContactNumber: "",
    },
    PartnerId: null,
    ChannelDetails: {
      CustomerType: "",
      BusineeChannelType: "",
      BusinessSource: "",
      EntityRelationShipCode: "",
      EntityRelationShipName: "",
      ChannelNumber: "",
      DisplayOfficeCode: "",
      OfficeCode: "",
      OfficeName: "",
      IntermediaryCode: "",
      IntermediaryName: "",
      BusinessSourceType: "",
      SPCode: "",
      SPName: "",
    },
    ProposerDetails: {
      CustomerType: "",
      CustomerFirstName: "",
      CustomerLastName: "",
      ContactNo: "",
      Nationality: "",
      Salutation: "",
      EmailId: "",
      DOB: "",
      Gender: "",
      MaritalStatus: "",
      OccupationCode: "",
      PanNo: "",
      AnnualIncome: "",
      GSTNumber: "",
      Pincode: "",
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrictId: "",
        StateId: "",
        CountryId: "",
        Pincode: "",
      },
      PermanentAddressSameAsCommunication: "",
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrictId: "",
        CountryId: "",
        StateId: "",
        Pincode: "",
      },
      RegistrationAddressSameAsCommunication: "",
      RegistrationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrictId: "",
        CountryId: "",
        StateId: "",
        Pincode: "",
      },
      RegistrationAddressSameAsPermanent: "",
    },
    NomineeDetails: [
      {
        Title: "",
        NomineeFirstName: "",
        NomineeLastName: "",
        NomineeDOB: "",
        NomineeAge: "",
        NomineeRelationWithProposer: "",
        PercentageOfShare: "",
        GuardianName: "",
        GuardianDOB: "",
        RelationshoipWithGuardian: "",
      },
    ],
  }); // This data is not hardcoded. Just to keep the structure to prevent getting error.

  const [termsnCond, setTermsnCond] = useState({
    bike: false,
    ncb: false,
    acceptTnC: false,
  });
  // const [disablePayment, setDisablePayment] = useState(true);

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
    FirstName: "",
    LastName: "",
    MobileNo: "",
    Email: "",
  });
  const [NCBCertificate, setNCBCertificate] = useState();
  const uploadFiles = async (files) => {
    const formData = new FormData();
    formData.append("file", files, files.name);
    await UploadFiles(formData).then((result) => {
      console.log("result", result);
      if (result.data[0].fileName !== "") {
        setNCBCertificate(files);
      }
    });
  };
  const handleFileUpload = async (event) => {
    await uploadFiles(event.target.files[0]);
    console.log("files", event.target.files[0]);
  };
  const [addon, setAddon] = useState(false);
  const [plan, setPlan] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [partner, setPartner] = useState({});
  const [quote, setQuote] = useState({});
  const [partnerData, setPartnerData] = useState({});
  const [paymentData, setPaymentData] = useState();
  const [loading, setLoading] = useState(false);
  const [coveredData, setCoveredData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [addonData, setAddOnData] = useState([]);

  //   const [proposalDetails, setProposalDetails] = useState();
  //   const [, setPaymentData] = useState();

  //   //   const [open, setOpen] = useState(false);
  //   // const [PanCard] = useState();
  //   const [flags, setFlags] = useState({
  //     errorFlag: false,
  //     ageFlag: false,
  //     nomineeage: "",
  //     Age: "",
  //     nomineeFlag: "",
  //   });

  // Functions

  const [flags, setFlags] = useState({
    getotpflag: false,
  });

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };

  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const handleModalEmailOpen = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setModalEmailOpen(true);
  };

  const handleModalEmailClose = () => {
    setModalEmailOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };

  const getPincodeDetails = async (pincodeValue) => {
    const getPincodeDistrictStateData = async (type, id) => {
      let dataValue = null;
      if (args.partnerId) {
        const urlString = `Product/GetProdPartnermasterData?ProductId=${args.productId}&PartnerId=${args.partnerId}&MasterType=${type}`;
        let payload;
        switch (type) {
          case "State":
            payload = { State_Id: id };
            break;
          case "CityDistrict":
            payload = { City_Id: id };
            break;
          case "DetailsPincode":
            payload = { Pincode: id };
            break;
          default:
            break;
        }

        dataValue = await (await postRequest(urlString, payload)).data;
      }
      return dataValue;
    };

    const pincodeData = await getPincodeDistrictStateData("DetailsPincode", pincodeValue);

    if (pincodeData !== null) {
      const district = await getPincodeDistrictStateData("CityDistrict", pincodeData[0].CityId);

      const state = await getPincodeDistrictStateData("State", district[0].StateId);
      return { pinCode: pincodeData, district, state };
    }

    return null;
  };

  const getValue = (masterType, value) => {
    if (masters[masterType]) {
      const val = masters[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };

  const handleOTP = (otp1) => {
    setotpdata((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
  };

  const handleEmail = (event) => {
    setotpdata((prevState) => ({
      ...prevState,
      Email: event.target.value,
    }));
  };
  const handleEmailchange = async () => {
    if (otpdata.Email !== "") {
      setFlags((prevState) => ({ ...prevState, getotpflag: true }));
    }
    setotpdata((prevState) => ({ ...prevState, otp: "" }));
    const sendOTP = {
      name: `${customerDetails.FirstName + customerDetails.LastName}`,
      otp: "1234",
      email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    setModalEmailOpen(false);
    handleModalOpen();
    await getOTP(sendOTP);
  };
  const handlePlanOpen = () => setPlan(true);
  const handlePlanClose = () => setPlan(false);

  const handleAddonOpen = () => setAddon(true);
  const handleAddonClose = () => setAddon(false);

  const handleotpverify = () => {
    if (otpdata.otp !== "") {
      const verifyOTP = {
        otp: otpdata.otp,
        email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
        mobileNumber: "",
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      Promise.all([GetOTP(verifyOTP)]).then((results) => {
        console.log("OTP Result", results);
        if (results[0] === null) {
          swal({
            icon: "error",
            text: "Please enter the valid OTP sent to your Email",
          });
        }
        if (results[0].status === 1) {
          setLoading(true);
          //   SaveProposal(partnerDetails.partnerProductId, data, setProposalDetails);
          GetPaymentURL(partnerData.partnerProductId, proposalDetails.proposalNo, setPaymentData);
        }
      });
    }
  };

  const propdateFormat = (propDate) => {
    const propdateArr = propDate.split("-");
    return new Date(propdateArr[2], propdateArr[1] - 1, propdateArr[0]);
  };

  const nomineedateFormat = (nomineeDate) => {
    const dateArr = nomineeDate.split("-");
    return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  };

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const redirectPayment = async () => {
    const sendOTP = {
      name: `${customerDetails.FirstName + customerDetails.LastName}`,
      otp: "1234",
      email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    handleModalOpen();
    await getOTP(sendOTP);
  };

  const buildForm = ({ action, params }) => {
    console.log("buildForm", action, params);
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      console.log("element", key, params[key]);
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", params[key]);
      form.appendChild(input);
    });
    console.log("PaymentForm", form);
    return form;
  };

  const post = (details) => {
    console.log("PaymentFormDataPost", details);
    const formdata = {
      action: details.PaymentURL,
      params: details.InputJson,
    };
    const form = buildForm(formdata);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  // UseEffects
  useEffect(async () => {
    const query = new URLSearchParams(search);

    const proposalNumber = query.get("proposal");

    if (proposalNumber) {
      const proposalResp = await (await GetProposalDetailsByProposalNumber(proposalNumber)).data;
      //   console.log("proposalData", proposalData);
      setProposalData(proposalResp[0]);
      console.log("proposalData", proposalDetails);
      setData(proposalResp[0].policyDetails);
    }
  }, []);

  useEffect(() => {
    setCustomerDetails((prevState) => ({
      ...prevState,
      FirstName: data.ProposerDetails.CustomerFirstName,
      LastName: data.ProposerDetails.CustomerLastName,
      Email: data.ProposerDetails.EmailId,
      MobileNo: data.ProposerDetails.ContactNo,
    }));
  }, [data.ProposerDetails.EmailId]);

  useEffect(async () => {
    if (data.PartnerId) {
      const argObj = {
        ...args,
        productId: 449,
        partnerId: data.PartnerId,
        masterType: null,
        jsonValue: null,
      };
      setArgs(argObj);
      GetAllMasters(argObj, setMasters);
      GetICDetails(data.PartnerId, setPartner);
      //   const {
      //     Gender: [],
      //     NomineeRelation: [],
      //     // Country:[],
      //     //   VariantDetailsOutput:[],
      //     //   RTODetailsOutput:[],
      //     Salutation: [],
      //     MaritalStatus: [],
      //   } = Masters
    }
  }, [data.PartnerId]);

  useEffect(async () => {
    if (data.VehicleDetails.RTOId && data.VehicleDetails.VariantId) {
      const res = {
        productId: 449,
        partnerId: data.PartnerId,
        variantId: data.VehicleDetails.VariantId,
        rtoId: data.VehicleDetails.RTOId,
      };
      GetVehicleDetails(res, setVehicle);
    }
  }, [data.PartnerId, data.VehicleDetails.RTOId, data.VehicleDetails.VariantId]);

  const [disableKYC, setdisableKYC] = useState(true);
  useEffect(() => {
    if (data.BusinessType !== "") {
      if (
        data &&
        (data.BusinessType === "4" || data.BusinessType === "New Business") &&
        data.VehicleType === "16" &&
        termsnCond.acceptTnC
      ) {
        setdisableKYC(false);
      } else if (
        data &&
        (data.BusinessType === "6" || data.BusinessType === "Roll Over") &&
        data.VehicleType === "16" &&
        termsnCond.acceptTnC &&
        termsnCond.ncb
      ) {
        setdisableKYC(false);
      } else if (
        data &&
        (data.BusinessType === "4" || data.BusinessType === "New Business") &&
        data.VehicleType === "17" &&
        termsnCond.bike &&
        termsnCond.acceptTnC
      ) {
        setdisableKYC(false);
      } else if (
        data &&
        (data.BusinessType === "6" || data.BusinessType === "Roll Over") &&
        data.VehicleType === "17" &&
        termsnCond.bike &&
        termsnCond.acceptTnC &&
        termsnCond.ncb
      ) {
        setdisableKYC(false);
      } else if (
        data &&
        (data.BusinessType === "4" || data.BusinessType === "New Business") &&
        data.VehicleType === "193" &&
        termsnCond.bike &&
        termsnCond.acceptTnC
      ) {
        setdisableKYC(false);
      } else if (
        data &&
        (data.BusinessType === "6" || data.BusinessType === "Roll Over") &&
        data.VehicleType === "193" &&
        termsnCond.acceptTnC &&
        termsnCond.ncb
      ) {
        setdisableKYC(false);
      } else if (
        data &&
        (data.BusinessType === "4" || data.BusinessType === "New Business") &&
        data.VehicleType === "194" &&
        termsnCond.bike &&
        termsnCond.acceptTnC
      ) {
        setdisableKYC(false);
      } else if (
        data &&
        (data.BusinessType === "6" || data.BusinessType === "Roll Over") &&
        data.VehicleType === "194" &&
        termsnCond.acceptTnC &&
        termsnCond.ncb
      ) {
        setdisableKYC(false);
      } else setdisableKYC(true);
    }
  }, [termsnCond.acceptTnC, termsnCond.ncb, termsnCond.bike]);

  useEffect(() => {
    if (data.ProposerDetails.PermanentAddressSameAsCommunication === "Yes") {
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: {
          state: prevState.PermanentAddress.state,
          city: prevState.PermanentAddress.city,
        },
      }));
    } else if (data.ProposerDetails.PermanentAddressSameAsCommunication === "No") {
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: { state: "", city: "" },
      }));
    }
  }, [data.ProposerDetails.PermanentAddressSameAsCommunication, args.partnerId]);

  useEffect(async () => {
    if (data.ProposerDetails.Pincode.length === 6) {
      const pincodeDetail = await getPincodeDetails(data.ProposerDetails.Pincode);

      if (pincodeDetail !== null) {
        const { district, state } = pincodeDetail;
        // const newPermanentAddress = { Pincode: data.ProposerDetails.Pincode };
        setAddressCity((prevState) => ({
          ...prevState,
          PermanentAddress: { state: state[0].mValue, city: district[0].mValue },
        }));
      }
    }
  }, [data.ProposerDetails.Pincode, args.partnerId]);

  useEffect(async () => {
    if (
      data.ProposerDetails.CommunicationAddress.Pincode.length === 6 &&
      data.ProposerDetails.PermanentAddressSameAsCommunication === "No"
    ) {
      const pincodeDetail = await getPincodeDetails(
        data.ProposerDetails.CommunicationAddress.Pincode
      );

      if (pincodeDetail !== null) {
        const { district, state } = pincodeDetail;
        const CommunicationAddress = { ...data.ProposerDetails.CommunicationAddress };
        CommunicationAddress.StateId = state[0].mID;
        CommunicationAddress.CityDistrictId = district[0].mID;
        CommunicationAddress.CityId = district[0].CityId ? district[0].CityId : district[0].mID;

        setAddressCity((prevState) => ({
          ...prevState,
          CommunicationAddress: { state: state[0].mValue, city: district[0].mValue },
        }));
      }
    } else if (
      data.ProposerDetails.CommunicationAddress.Pincode.length === 6 &&
      data.ProposerDetails.PermanentAddressSameAsCommunication === "Yes"
    ) {
      const addData = addressCity.PermanentAddress;
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: { state: addData.state, city: addData.city },
      }));
    }
  }, [
    data.ProposerDetails.CommunicationAddress.Pincode,
    args.partnerId,
    addressCity.PermanentAddress.city,
  ]);

  useEffect(() => {
    if (data.BaseQuotationNo) {
      GetQuote(data.BaseQuotationNo, setQuote);
    }
  }, [data.BaseQuotationNo]);

  useEffect(() => {
    if (quote.quotationDetails && quote.quotationDetails.length > 0 && partner.partnerName) {
      const partData = quote.quotationDetails.filter(
        (it) => it.partnerName === partner.partnerName
      );

      console.log("PARTDATA", partData);
      setPartnerData(partData[0] ? partData[0] : null);
    }
  }, [quote.quotationDetails, partner.partnerName]);

  useEffect(() => {
    // console.log("PaymentFormData", "outside");
    if (paymentData) {
      //   console.log("PaymentFormData", paymentData.OutputResult);
      if (paymentData.OutputResult.InputJson) {
        post(paymentData.OutputResult);
      } else {
        const paymentURL = paymentData.OutputResult.PaymentURL;
        window.location.href = paymentURL;
      }
    }
  }, [paymentData]);

  useEffect(() => {
    if (partner.partnerName) {
      setCoveredData(null);
      CoveredNotCoveredData(setCoveredData, partner.partnerName, "Whats Covered");
    }
  }, [partner.partnerName]);

  useEffect(() => {
    if (coveredData) {
      const newValue = coveredData.map((cover) => cover.name);
      setPlanData(newValue);
    }
  }, [coveredData]);

  useEffect(() => {
    if (partnerData && partnerData.premiumResult && partnerData.premiumResult.CoverPremium) {
      const addData = partnerData.premiumResult.CoverPremium.map((cover) =>
        cover.CoverType === "AddOnCover" && cover.CoverName ? cover.CoverName : null
      );

      setAddOnData(addData);
    }
  }, [partnerData.premiumResult]);

  const [premiumData, setPremiumData] = useState({
    gst: 0,
    premium: 0,
  });
  useEffect(() => {
    if (partnerData.premiumResult) {
      const sgst = partnerData.premiumResult.SGST
        ? Number(partnerData.premiumResult.SGST.replace("INR", ""))
        : 0;
      const cgst = partnerData.premiumResult.CGST
        ? Number(partnerData.premiumResult.CGST.replace("INR", ""))
        : 0;
      const igst = partnerData.premiumResult.IGST
        ? Number(partnerData.premiumResult.IGST.replace("INR", ""))
        : 0;
      const gst = partnerData.premiumResult.GST
        ? Number(partnerData.premiumResult.GST.replace("INR", ""))
        : sgst + cgst + igst;

      const prem = partnerData.premiumResult.FinalPremium
        ? Number(partnerData.premiumResult.FinalPremium.replace("INR", ""))
        : 0;
      setPremiumData((prevState) => ({ ...prevState, gst, premium: prem - gst }));
    }
  }, [partnerData.premiumResult]);
  // const handleCorporateChange = (event) => {
  //   const DataD = data;
  //   if (event.target.name === "GSTInNumber") {
  //     DataD.CorporateDetails.GSTInNumber = event.target.value;
  //   }
  //   if (event.target.name === "CIN") {
  //     DataD.CorporateDetails.CIN = event.target.value;
  //   }
  //   if (event.target.name === "CompanyPancard") {
  //     DataD.CorporateDetails.CompanyPancard = event.target.value;
  //   }
  //   // setData((prevState) => ({ ...prevState, ...CorporateDetails.GSTInNumber }));
  //   setData((prevState) => ({
  //     ...prevState,
  //     ...DataD,
  //   }));
  // };

  return (
    <MDBox>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <OTPModel
              handleOTP={handleOTP}
              otpdata={otpdata}
              handleModalClose={handleModalClose}
              customerDetails={customerDetails}
              handleotpverify={handleotpverify}
              handleModalEmailOpen={handleModalEmailOpen}
              handleEmailchange={handleEmailchange}
              flags={flags}
            />
          </Modal>
          <Modal
            open={modalEmailOpen}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ChangeEmailModel
              handleEmail={handleEmail}
              otpdata={otpdata}
              handleModalEmailClose={handleModalEmailClose}
              handleEmailchange={handleEmailchange}
              // handleotpverify={handleotpverify}
            />
          </Modal>
          <Grid container spacing={1} justifyContent="center" alignItems="start" height="100%">
            <Modal open={plan} onClose={handlePlanClose}>
              <FeatureList
                handleClose={handlePlanClose}
                data={planData}
                title="Plan Feature List"
              />
            </Modal>
            <Modal open={addon} onClose={handleAddonClose}>
              <FeatureList handleClose={handleAddonClose} data={addonData} title="Add-on Covers" />
            </Modal>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              <Grid container justifyContent="space-between">
                <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
                  Proposer Details
                </MDTypography>
              </Grid>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                    Policy Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        value={data.PolicyEffectiveFromDate}
                        label="Policy Start Date"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        value={data.PolicyEffectiveToDate}
                        label="Policy End Date"
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
                  <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                    Vehicle Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        value={vehicle.VehicleDetail ? vehicle.VehicleDetail[0].MAKE : ""}
                        disabled
                        label="Brand"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        value={vehicle.VehicleDetail ? vehicle.VehicleDetail[0].MODEL : ""}
                        label="Model"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        value={vehicle.VehicleDetail ? vehicle.VehicleDetail[0].VARIANT : ""}
                        label="Variant"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        value={vehicle.VehicleDetail ? vehicle.VehicleDetail[0].Fuel_Type : ""}
                        label="Fuel Type"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        value={vehicle.VehicleDetail ? vehicle.VehicleDetail[0].Cubic_Capacity : ""}
                        label="Cubic Capacity"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput disabled label="Vehicle Class" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        value={
                          vehicle.VehicleDetail ? vehicle.VehicleDetail[0].Seating_Capacity : ""
                        }
                        label="Seating Capacity"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput disabled label="State Code" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        value={vehicle.RtoDetail ? vehicle.RtoDetail[0].RTO_Code : ""}
                        label="RTO Code"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        id="ChassisNumber"
                        value={data.VehicleDetails.ChassisNumber}
                        label="Chassis No"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        id="EngineNumber"
                        value={data.VehicleDetails.EngineNumber}
                        label="Engine No"
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        id="RegistrationDate"
                        value={data.VehicleDetails.RegistrationDate}
                        label="Date of Registration"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        id="RegistrationNumber"
                        value={data.VehicleDetails.RegistrationNumber}
                        label="Registration No"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput disabled label="Color" />
                    </Grid>
                    {data.BusinessType !== "4" && data.BusinessType !== "New Business" && (
                      <>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            id="PreviousPolicyNumber"
                            value={data.PreviousPolicyDetails.previousPolicyNumber}
                            label="Policy Number"
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            value={data.PreviousPolicyDetails.PreviousPolicyInsurerName}
                            label="Previous Insurance Company "
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            id="ExpiryDate"
                            value={data.PreviousPolicyDetails.PreviousPolicyEndDate}
                            label="Insurance Expiry Date"
                            disabled
                          />
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
                          >
                            <MDTypography
                              sx={{ fontSize: "1.1rem", color: "#0071D9", weight: 500, pt: 0.7 }}
                            >
                              NCB Transfer certificate
                            </MDTypography>
                            <MDButton
                              variant="contained"
                              component="label"
                              color="info"
                              // onClick={(e) => handleFileUpload(e, "AdhaarFront")}
                              sx={{ width: "4rem", height: "1.9rem", ml: 1.25, mt: 1 }}
                            >
                              Upload
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleFileUpload}
                              />
                            </MDButton>
                            <MDTypography>
                              {NCBCertificate != null ? NCBCertificate.name : null}
                            </MDTypography>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                    Proposal Details
                  </MDTypography>
                </AccordionSummary>
                {data.CustomerType === "5" ? (
                  <AccordionDetails>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDInput
                          label="Title"
                          disabled
                          value={getValue("Salutation", data.ProposerDetails.Salutation)}
                          id="Salutation"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                        <MDInput
                          disabled
                          id="CustomerFirstName"
                          value={data.ProposerDetails.CustomerFirstName}
                          label="First Name"
                          required
                          name="FirstName"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="CustomerLastName"
                          value={data.ProposerDetails.CustomerLastName}
                          label="Last Name"
                          required
                          name="LastName"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Gender"
                          value={getValue("Gender", data.ProposerDetails.Gender)}
                          id="Gender"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="DOB"
                            inputFormat="dd-MM-yyyy"
                            type="login"
                            id="DOB"
                            disabled
                            value={
                              data.ProposerDetails.DOB !== ""
                                ? propdateFormat(data.ProposerDetails.DOB)
                                : null
                            }
                            renderInput={(params) => <MDInput {...params} sx={{ width: "100%" }} />}
                          />
                        </LocalizationProvider>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Marital Status"
                          value={getValue("MaritalStatus", data.ProposerDetails.MaritalStatus)}
                          id="MaritalStatus"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="ContactNo"
                          value={data.ProposerDetails.ContactNo}
                          label="Phone Number"
                          name="ContactNo"
                          inputProps={{ maxLength: 10 }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="EmailId"
                          value={data.ProposerDetails.EmailId}
                          label="Email ID"
                          name="EmailId"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Occupation"
                          id="OccupationCode"
                          value={getValue("Occupation", data.ProposerDetails.OccupationCode)}
                          name="OccupationCode"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          id="PanNo"
                          value={data.ProposerDetails.PanNo}
                          name="PanNo"
                          label="PAN Card No"
                          required
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                ) : null}
                {data.CustomerType === "8" ? (
                  <AccordionDetails>
                    <Grid container spacing={1.5}>
                      {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        // value={data.ProposerDetails.CustomerFirstName}
                        // onChange={handleProposerChange}
                        value={data.CorporateDetails.Salutation}
                        label="Salutation"
                      />
                    </Grid> */}
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Company Full Name"
                          value={data.CorporateDetails.CompanyName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          // value={data.ProposerDetails.CustomerFirstName}
                          // onChange={handleProposerChange}
                          value={data.CorporateDetails.email}
                          label="Contact Email ID"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="SPOC Name" value={data.CorporateDetails.SPOCName} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput label="SPOC Phone Number" value={data.CorporateDetails.mobileNo} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Company Pan Card No"
                          name="CompanyPancard"
                          value={data.CorporateDetails.CompanyPancard}
                          // onChange={handleCorporateChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="GSTN Number"
                          name="GSTInNumber"
                          // onChange={handleCorporateChange}
                          value={data.CorporateDetails.GSTInNumber}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="CIN Number"
                          name="CIN"
                          value={data.CorporateDetails.CIN}
                          // onChange={handleCorporateChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Date Of Incorporation"
                          name="DOI"
                          value={data.CorporateDetails.DOI}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                ) : null}
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                    Communication Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <MDTypography sx={{ color: "#000000", size: "1rem", textAlign: "left" }}>
                    Permanent Address
                  </MDTypography>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="House No"
                        disabled
                        value={data.ProposerDetails.PermanentAddress.AddressLine1}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        label="Street/Region"
                        value={data.ProposerDetails.PermanentAddress.AddressLine2}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        id="Pincode"
                        disabled
                        value={data.ProposerDetails.Pincode}
                        label="Pin Code"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        readOnly
                        value={addressCity.PermanentAddress.city}
                        label="District"
                        id="District"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        readOnly
                        value={addressCity.PermanentAddress.state}
                        label="State"
                        id="State"
                      />
                    </Grid>
                  </Grid>
                  <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                    <MDTypography
                      sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}
                    >
                      Is Communication address same as Permanent address
                    </MDTypography>

                    <RadioGroup
                      row
                      disabled
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{ justifyContent: "center", ml: 2.5 }}
                      defaultValue="No"
                      value={data.ProposerDetails.PermanentAddressSameAsCommunication}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </MDBox>
                  <MDTypography sx={{ color: "#000000", size: "1rem", textAlign: "left" }}>
                    Communication Address
                  </MDTypography>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        label="House No"
                        value={data.ProposerDetails.CommunicationAddress.AddressLine1}
                        name="AddressLine1"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        label="Street/Region"
                        value={data.ProposerDetails.CommunicationAddress.AddressLine2}
                        name="AddressLine2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        label="Pin Code"
                        value={data.ProposerDetails.CommunicationAddress.Pincode}
                        name="Pincode"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        label="District"
                        value={addressCity.CommunicationAddress.city}
                        readOnly
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        disabled
                        label="State"
                        value={addressCity.CommunicationAddress.state}
                        readOnly
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              {data.CustomerType === "5" ? (
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                      Nominee Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDInput
                          disabled
                          label="Title"
                          value={getValue("Salutation", data.NomineeDetails[0].Title)}
                          id="Title"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Nominee First Name"
                          value={data.NomineeDetails[0].NomineeFirstName}
                          name="NomineeFirstName"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Nominee Last Name"
                          value={data.NomineeDetails[0].NomineeLastName}
                          name="NomineeLastName"
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="DOB"
                            inputFormat="dd-MM-yyyy"
                            type="login"
                            id="DOB"
                            disabled
                            value={
                              data.NomineeDetails[0].NomineeDOB !== ""
                                ? nomineedateFormat(data.NomineeDetails[0].NomineeDOB)
                                : null
                            }
                            renderInput={(params) => <MDInput {...params} sx={{ width: "100%" }} />}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          disabled
                          label="Relationship"
                          value={getValue(
                            "NomineeRelation",
                            data.NomineeDetails[0].NomineeRelationWithProposer
                          )}
                          id="NomineeRelationWithProposer"
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ) : null}
              )
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={5} xl={5} xxl={5}>
              <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem" }}>
                <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                  Policy Summary
                </MDTypography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Quote No
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {/* {partnerDetails?.quoteNumber} */}
                      {data.BaseQuotationNo}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      IDV
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      ₹ {data.VehicleDetails.IDVofVehicle}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      NCB
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {partnerData &&
                      partnerData.premiumResult &&
                      partnerData.premiumResult.NCB !== ""
                        ? partnerData.premiumResult.NCB
                        : "0"}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Plan Type
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {getValue("PolicyType", data.PolicyType)}
                    </MDTypography>
                  </Grid>
                  <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Plan Coverage
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      onClick={handlePlanOpen}
                      sx={{ fontSize: "0.87rem", color: "#0071D9", cursor: "pointer" }}
                    >
                      View
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      variant="body1"
                      sx={{ fontSize: "1rem", color: "#5F5F5F", cursor: "pointer" }}
                    >
                      Addon Covers
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      onClick={handleAddonOpen}
                      sx={{ fontSize: "0.87rem", color: "#0071D9" }}
                    >
                      View
                    </MDTypography>
                  </Grid>
                  <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Premium Amount
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {formatter.format(premiumData.premium)}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      GST@18%
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      + {formatter.format(premiumData.gst)}
                    </MDTypography>
                  </Grid>
                  <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      TOTAL
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      mt={0}
                      sx={{ fontSize: "2rem", color: "#0071D9" }}
                    >
                      {formatter.format(premiumData.gst + premiumData.premium)}
                    </MDTypography>
                  </Grid>
                  {data.VehicleType !== "" && data.BusinessType !== "" && (
                    <MDBox display="flex" flexDirection="column">
                      <GetCheckbox
                        VehicleType={data.VehicleType}
                        BusinessType={data.BusinessType}
                        setTermsnCond={setTermsnCond}
                        termsnCond={termsnCond}
                      />
                    </MDBox>
                  )}

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDButton
                      size="medium"
                      startIcon={<ArrowDownwardIcon />}
                      color="white"
                      sx={{
                        textSize: "0.87rem",

                        borderRadius: "0.25rem",

                        borderColor: "#1976D2",

                        border: 1,

                        background: "transparent",
                      }}
                    >
                      Download Quote
                    </MDButton>
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
                      onClick={redirectPayment}
                      disabled={disableKYC}
                    >
                      Proceed to Payment
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </>
      )}
    </MDBox>
  );
}

export default MotorProposalPayment;
