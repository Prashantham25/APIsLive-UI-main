import { useState } from "react";
import Grid from "@mui/material/Grid";
// import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MDInput from "components/MDInput";
// import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
// import profileimage from "assets/images/BrokerPortal/ProfileImg.png";
import * as React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
// import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
// import PageLayout from "examples/LayoutContainers/PageLayout";
import { getRequest } from "core/clients/axiosclient";
import Popover from "@mui/material/Popover";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
// import { ProfileData, ViewFiles, DeleteFile, UploadFiles } from "../MyProfile/data";
// import { useDataController } from "../../context/index";
import { useDataController } from "../../../context";

function Applicationreview({ handleNext, step }) {
  console.log("step", step);
  //   const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [flags, setFlags] = React.useState(false);
  const [img, setImg] = useState([]);
  const [controller] = useDataController();
  const { appReviewResponse } = controller;
  const pospdetails = appReviewResponse.pospdetailsJson;
  console.log("pospdetails", pospdetails);
  console.log("appReviewResponse", appReviewResponse);
  const onClick = () => {
    handleNext();
  };

  async function ViewFiles(fileName) {
    try {
      const ViewFileData = await getRequest(`DMS/GetDocumentById?id=${fileName}`);
      return ViewFileData;
    } catch (error) {
      return error;
    }
  }
  const generateFile = (content) => {
    console.log("content", content);

    const src = `data:application/img;base64,${content}`;
    setImg(src);
    setFlags(false);
  };

  const ViewAadharCard = async (event) => {
    if (img.length > 0) {
      setFlags(false);
    } else {
      setFlags(true);
    }

    setAnchorEl(event.currentTarget);

    await ViewFiles(appReviewResponse.pospdetailsJson.OtherDocsFront).then((result) => {
      console.log("viewDoc", result);

      if (result.data !== "") {
        generateFile(result.data.data, appReviewResponse.pospdetailsJson.OtherDocsFront);
      }
    });
  };
  const ViewAadharCardBack = async (event) => {
    // if (img.length > 0) {
    //   setFlags(false);
    // } else {
    //   setFlags(true);
    // }

    setAnchorEl(event.currentTarget);

    await ViewFiles(appReviewResponse.pospdetailsJson.OtherDocsBack).then((result) => {
      console.log("viewDoc", result);

      if (result.data !== "") {
        generateFile(result.data.data, appReviewResponse.pospdetailsJson.OtherDocsBack);
      }
    });
  };
  const ViewPANCard = async (event) => {
    if (img.length > 0) {
      setFlags(false);
    } else {
      setFlags(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetails.Pan).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, appReviewResponse.pospdetailsJson.Pan);
      }
    });
  };
  const ViewBankDetails = async (event) => {
    if (img.length > 0) {
      setFlags(false);
    } else {
      setFlags(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetails.BankDetails.BankDetails).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, pospdetails.BankDetails.BankDetails);
      }
    });
  };
  const flName = "FileName";
  const ViewEducationCertificate = async (event, index) => {
    if (img.length > 0) {
      setFlags(false);
    } else {
      setFlags(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetails.EducationDetails[index][flName]).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, pospdetails.EducationDetails[index][flName]);
      }
    });
  };

  // const handleCloses = () => {
  //   setFlags(false);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // const [setFlags] = useState({
  //   emailErrorFlag: false,
  //   mobileNoErrorFlag: false,
  //   errorFlag: false,
  // });

  //   const handleBack = () => {
  //     navigate(`/modules/BrokerPortal/Pages/Interview/InterviewList`);
  //   };

  return (
    <Grid container>
      <MDBox sx={{ mx: 7 }}>
        {/* <Breadcrumbs aria-label="breadcrumb">
          {BreadCrumbsArray.map((item) => (
            <Link underline="hover" color="inherit" href={item.link}>
              {item.name}
            </Link>
          ))}
        </Breadcrumbs> */}
        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          Personal Details
        </MDTypography>
        <MDBox>
          <Grid container>
            <MDBox display="flex" flexDirection="row" mt="5">
              {/* <MDBox sx={{ width: "7rem", height: "7rem" }} src={profileimage} component="img" /> */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox
                  sx={{ width: "10rem", height: "10rem", clipPath: "circle(100%)", zIndex: -1 }}
                  src={
                    localStorage.getItem("ProfileImg") !== null
                      ? `data:image/jpeg;base64,${localStorage.getItem("ProfileImg")}`
                      : null
                  }
                  component="img"
                />
              </Grid>
            </MDBox>
          </Grid>
        </MDBox>
        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Salutation"
              name="Salutation"
              value={pospdetails.mastersSelected.Salutation.mValue}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput disabled label="First Name" name="FirstName" value={pospdetails.FirstName} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput disabled label="Last Name" name="LastName" value={pospdetails.LastName} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Marital Status"
              name="MaritalStatus"
              value={pospdetails.MaritalStatus}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput disabled label="Email Address" name="EmailId" value={pospdetails.EmailId} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput disabled label="Mobile Number" name="MobileNo" value={pospdetails.MobileNo} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Date of Birth"
              name="DOB"
              value={pospdetails.DOB.slice(0, 10)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput disabled label="Age" name="Age" value={pospdetails.Age} />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Source Of Income"
              name="SourceofIncome"
              value={pospdetails.SourceofIncome}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput disabled label="Gender" name="Gender" value={pospdetails.Gender} />
          </Grid>
        </Grid>
        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          Communication Details
        </MDTypography>

        <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: 0.87 }}>
          Permanent Address
        </MDTypography>

        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="House No"
              name="Address1"
              value={pospdetails.PermanentAddress.Address1}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Street"
              name="Address2"
              value={pospdetails.PermanentAddress.Address2}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput disabled label="Town" name="Area" value={pospdetails.PermanentAddress.Area} />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="District"
              name="District"
              value={pospdetails.PermanentAddress.District}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="State"
              name="State"
              value={pospdetails.PermanentAddress.State}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Pincode"
              name="Pincode"
              value={pospdetails.PermanentAddress.Pincode}
            />
          </Grid>
        </Grid>

        <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
          <MDTypography sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}>
            Is Communication address same as Permanent address
          </MDTypography>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ justifyContent: "center", ml: 2.5 }}
          >
            <FormControlLabel
              disabled
              value="Yes"
              control={<Radio />}
              label="Yes"
              checked={pospdetails.PermAddressSameAsCommAddress === "Yes"}
            />
            <FormControlLabel
              disabled
              value="No"
              control={<Radio />}
              label="No"
              checked={pospdetails.PermAddressSameAsCommAddress === "No"}
              name="PermAddressSameAsCommAddress"
            />
          </RadioGroup>
        </MDBox>

        <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: 0.87 }}>
          Communication Address
        </MDTypography>

        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="House No"
              name="Address1"
              value={pospdetails.CommunicationAddress.Address1}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Street"
              name="Address2"
              value={pospdetails.CommunicationAddress.Address2}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Town"
              name="Area"
              value={pospdetails.CommunicationAddress.Area}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="District"
              name="District"
              value={pospdetails.CommunicationAddress.District}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="State"
              name="State"
              value={pospdetails.CommunicationAddress.State}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Pincode"
              name="Pincode"
              value={pospdetails.CommunicationAddress.Pincode}
            />
          </Grid>
        </Grid>
        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          KYC Details
        </MDTypography>

        {Object.values(appReviewResponse.pospdetailsJson.OtherDocs || {}).every(
          (x) => x !== "" || x !== null
        ) && (
          <Grid container spacing="2rem" sx={{ mt: 0 }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                disabled
                label="Selected Document"
                fullWidth
                name="Aadhar"
                value={appReviewResponse.pospdetailsJson.OtherDocs.mValue}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                disabled
                label={`${appReviewResponse.pospdetailsJson.OtherDocs.mValue} Number`}
                fullWidth
                name="OtherDocNumber"
                value={appReviewResponse.pospdetailsJson.OtherDocNumber}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDButton
                variant="outlined"
                color="info"
                startIcon={<VisibilityIcon />}
                onClick={ViewAadharCard}
              >
                View {`${appReviewResponse.pospdetailsJson.OtherDocs.mValue}`} Front
              </MDButton>
            </Grid>
            {appReviewResponse.pospdetailsJson.OtherDocsBack !== "" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDButton
                  variant="outlined"
                  color="info"
                  startIcon={<VisibilityIcon />}
                  onClick={ViewAadharCardBack}
                >
                  View {`${appReviewResponse.pospdetailsJson.OtherDocs.mValue}`} Back
                </MDButton>
              </Grid>
            )}
          </Grid>
        )}

        <Grid container spacing="2rem" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput disabled label="PAN Number" name="PAN" value={pospdetails.PAN} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDButton
              variant="outlined"
              color="info"
              startIcon={<VisibilityIcon />}
              onClick={ViewPANCard}
            >
              View PAN Card
            </MDButton>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography
            sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25, mt: 5 }}
          >
            Education Details
          </MDTypography>
        </Grid>

        {pospdetails.EducationDetails.map((item, idx) => (
          <MDBox display="flex" flexDirection="row" mt={0}>
            <Grid container spacing="2rem" sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Name of the Qualification"
                  value={item.QualificationType.mValue}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDButton
                  variant="outlined"
                  color="info"
                  startIcon={<VisibilityIcon />}
                  onClick={(event) => {
                    ViewEducationCertificate(event, idx);
                  }}
                >
                  View Certificate
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        ))}

        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          Bank Details
        </MDTypography>
        {/* <MDBox display="flex" flexDirection="row"> */}
        <Grid container spacing="1rem">
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Bank Name"
              name="BankName"
              value={pospdetails.BankDetails.BankName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Bank Account Number"
              name="AccountNo"
              value={pospdetails.BankDetails.AccountNo}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="IFSC Code"
              name="IfscCode"
              value={pospdetails.BankDetails.IfscCode}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDButton
              variant="outlined"
              color="info"
              startIcon={<VisibilityIcon />}
              onClick={ViewBankDetails}
            >
              View Bank Document
            </MDButton>
          </Grid>
        </Grid>
        {/* </MDBox> */}
        <Grid container justifyContent="flex-end" sx={{ mt: "2rem" }} ml={8}>
          <MDButton
            startIcon={<EastIcon />}
            sx={{ fontSize: "0.8rem" }}
            justifyContent="flex-end"
            alignItems="flex-end"
            variant="contained"
            color="success"
            onClick={onClick}
          >
            Next
          </MDButton>
        </Grid>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={flags}>
          <CircularProgress />
        </Backdrop>
        <Popover
          open={open}
          onClick={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <MDBox width="700px" height="400px" component="img" src={img} />
        </Popover>
      </MDBox>
    </Grid>
  );
}

export default Applicationreview;
