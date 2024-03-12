import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ArrowBack } from "@mui/icons-material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Stack, Card, Grid } from "@mui/material";
import UserPage from "./UserPage";
import ReviewPage from "./ReviewPage";
import { useDataController } from "../../../context";

const steps = ["Review", "User Privilage"];

function GetStepContent({
  step,
  handleNext,
  handleNextStep,
  handleBack,
  POSPJson,
  setPOSPJson,
  setMasterSelection,
  masterSelection,
  setAddressCity,
  addressCity,
  setFlags,
  flags,
  profile,
  setProfile,
  modalOpen,
  setModalOpen,
  areaMaster,
  pincodeMaster,
  area,
  salutation,
  setArea,
  setSalutation,
  setAreaMaster,
  setPincodeMaster,
  kycDetails,
  pan,
  adhaarBack,
  adhaarFront,
  setKycDetails,
  setPan,
  setadhaarBack,
  setadhaarFront,
  addEdDetails,
  qualification,
  educationData,
  qualCount,
  setAddEdDetails,
  setQualification,
  setEducationData,
  setQualCount,
  bankData,
  open,
  bankDetails,
  setBankData,
  setOpen,
  setBankDetails,
  setCheckState,
  checkState,
  setDocData,
  DocData,
  applnNo,
}) {
  switch (step) {
    case 0:
      return (
        <ReviewPage
          handleNext={handleNext}
          step={step}
          handleNextStep={handleNextStep}
          handleBack={handleBack}
          POSPJson={POSPJson}
          setPOSPJson={setPOSPJson}
          masterSelection={masterSelection}
          setMasterSelection={setMasterSelection}
          setAddressCity={setAddressCity}
          addressCity={addressCity}
          flags={flags}
          setFlags={setFlags}
          profile={profile}
          setProfile={setProfile}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          areaMaster={areaMaster}
          pincodeMaster={pincodeMaster}
          area={area}
          salutation={salutation}
          setArea={setArea}
          setSalutation={setSalutation}
          setAreaMaster={setAreaMaster}
          setPincodeMaster={setPincodeMaster}
          kycDetails={kycDetails}
          pan={pan}
          adhaarBack={adhaarBack}
          adhaarFront={adhaarFront}
          setKycDetails={setKycDetails}
          setPan={setPan}
          setadhaarBack={setadhaarBack}
          setadhaarFront={setadhaarFront}
          addEdDetails={addEdDetails}
          qualification={qualification}
          educationData={educationData}
          setAddEdDetails={setAddEdDetails}
          setQualification={setQualification}
          setEducationData={setEducationData}
          setQualCount={setQualCount}
          bankDetails={bankDetails}
          setBankData={setBankData}
          setOpen={setOpen}
          setBankDetails={setBankDetails}
          open={open}
          setCheckState={setCheckState}
          qualCount={qualCount}
          bankData={bankData}
          checkState={checkState}
          DocData={DocData}
          setDocData={setDocData}
          applnNo={applnNo}
        />
      );

    case 1:
      return (
        <UserPage
          handleNext={handleNext}
          step={step}
          handleNextStep={handleNextStep}
          handleBack={handleBack}
        />
      );
    default:
      return "Unknown step";
  }
}
GetStepContent.defaultProps = {
  step: 0,
  handleNext: {},
};

GetStepContent.propTypes = {
  step: PropTypes.number,
  handleNext: PropTypes.func,
};
function HorizontalLinearStepper({
  stepPar,
  POSPJson,
  setPOSPJson,
  setMasterSelection,
  masterSelection,
  setAddressCity,
  addressCity,
  flags,
  setFlags,
  profile,
  setProfile,
  modalOpen,
  setModalOpen,
  areaMaster,
  pincodeMaster,
  area,
  salutation,
  setArea,
  setSalutation,
  setAreaMaster,
  setPincodeMaster,
  kycDetails,
  pan,
  adhaarBack,
  adhaarFront,
  setKycDetails,
  setPan,
  setadhaarBack,
  setadhaarFront,
  addEdDetails,
  qualification,
  educationData,
  qualCount,
  setAddEdDetails,
  setQualification,
  setEducationData,
  setQualCount,
  bankData,
  open,
  bankDetails,
  setBankData,
  setOpen,
  setBankDetails,
  setCheckState,
  checkState,
  setDocData,
  DocData,
  applnNo,
}) {
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);

  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleNextStep = (step) => {
    setActiveStep(step);
  };
  console.log("activeStep", activeStep);
  const navigate = useNavigate();
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 0) {
      navigate("/modules/BrokerPortal/Pages/Admin/AppLication/OnBoardPOSP");
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <MDBox sx={{ width: "100%", px: 5 }}>
      <Grid container justifyContent="flex-end">
        <MDButton
          sx={{ width: "90px" }}
          variant="outlined"
          // disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBack />}
        >
          Back
        </MDButton>
      </Grid>
      <Grid container justifyContent="center">
        <Stepper activeStep={activeStep} sx={{ width: 600 }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps} sx={{ flexDirection: "row" }}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      {activeStep === steps.length ? (
        <MDBox sx={{ display: "flex", flexDirection: "row", pt: 0, width: "11px" }}>
          <MDBox sx={{ flex: "0" }} />
          <MDButton onClick={handleReset}>Reset</MDButton>
        </MDBox>
      ) : (
        <>
          {/* <MDTypography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</MDTypography> */}
          <GetStepContent
            step={activeStep}
            handleNext={handleNext}
            handleNextStep={handleNextStep}
            handleBack={handleBack}
            POSPJson={POSPJson}
            setPOSPJson={setPOSPJson}
            masterSelection={masterSelection}
            setMasterSelection={setMasterSelection}
            setAddressCity={setAddressCity}
            addressCity={addressCity}
            flags={flags}
            setFlags={setFlags}
            profile={profile}
            setProfile={setProfile}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            areaMaster={areaMaster}
            pincodeMaster={pincodeMaster}
            area={area}
            salutation={salutation}
            setArea={setArea}
            setSalutation={setSalutation}
            setAreaMaster={setAreaMaster}
            setPincodeMaster={setPincodeMaster}
            kycDetails={kycDetails}
            pan={pan}
            adhaarBack={adhaarBack}
            adhaarFront={adhaarFront}
            setKycDetails={setKycDetails}
            setPan={setPan}
            setadhaarBack={setadhaarBack}
            setadhaarFront={setadhaarFront}
            addEdDetails={addEdDetails}
            qualification={qualification}
            educationData={educationData}
            qualCount={qualCount}
            setAddEdDetails={setAddEdDetails}
            setQualification={setQualification}
            setEducationData={setEducationData}
            setQualCount={setQualCount}
            bankData={bankData}
            open={open}
            bankDetails={bankDetails}
            setBankData={setBankData}
            setOpen={setOpen}
            setBankDetails={setBankDetails}
            setCheckState={setCheckState}
            checkState={checkState}
            setDocData={setDocData}
            DocData={DocData}
            applnNo={applnNo}
          />
        </>
      )}
    </MDBox>
  );
}
function POSP() {
  const [controller] = useDataController();
  const { appReviewResponse } = controller;
  const pospdetails = appReviewResponse.pospdetailsJson;
  console.log("qwertuio", pospdetails);
  // Basic details
  const [POSPJson, setPOSPJson] = useState({
    ProfileImage: pospdetails.ProfileImage,
    RawImage: "",
    Salutation: "",
    FirstName: pospdetails.FirstName,
    MiddleName: "",
    LastName: pospdetails.LastName,
    MaritalStatus: "",
    EmailId: pospdetails.Email,
    MobileNo: pospdetails.MobileNo,
    DOB: pospdetails.DOB,
    unformatDOB: null,
    Age: "",
    Aadhar: "",
    PAN: "",
    SourceofIncome: "",
    Gender: "",
    CommunicationAddress: {
      Address1: "",
      Address2: "",
      Address3: "",
      AreaId: "",
      CityId: "",
      DistrictId: "",
      StateId: "",
      Pincode: "",
      District: "",
      State: "",
      Area: "",
    },
    PermAddressSameAsCommAddress: "No",
    PermanentAddress: {
      Address1: "",
      Address2: "",
      Address3: "",
      AreaId: "",
      CityId: "",
      DistrictId: "",
      StateId: "",
      Pincode: "",
      District: "",
      State: "",
      Area: "",
    },
    Status: null,
  });
  const [masterSelection, setMasterSelection] = useState({
    Salutation: { mID: "", mValue: "" },
    MaritalStatus: { mID: "", mValue: "" },
    SourceofIncome: { mID: "", mValue: "" },
    Gender: { mID: "", mValue: "" },
    District: { mID: "", mValue: "" },
    Area: { mID: "", mValue: "" },
    State: { mID: "", mValue: "" },
    DistrictComm: { mID: "", mValue: "" },
    AreaComm: { mID: "", mValue: "" },
    StateComm: { mID: "", mValue: "" },
  });
  const [addressCity, setAddressCity] = useState({
    PermanentAddress: {
      district: "",
      state: "",
    },
    CommunicationAddress: {
      district: "",
      state: "",
    },
  });
  const [flags, setFlags] = useState({
    errorFlag: false,
    ageFlag: false,
    unFillError: false,
    emailError: false,
    mobileError: false,
    disableFlag: false,
    otherDocSelectedFlag: false,
    panError: false,
    dedupError: false,
    validationError: false,
    accountNoError: false,
    ifscCodeError: false,
    pincodeError: false,
    commPincodeError: false,
    clearFlag: false,
    saveButtonDisable: false,
    isCreate: true,
  });
  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  const [pincodeMaster, setPincodeMaster] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [areaMaster, setAreaMaster] = useState([]);
  const [salutation, setSalutation] = useState([]);
  const [area, setArea] = useState([]);

  // Kyc details
  const [adhaarFront, setadhaarFront] = useState();
  const [adhaarBack, setadhaarBack] = useState();
  const [pan, setPan] = useState();
  const [kycDetails, setKycDetails] = useState({
    OtherDocs: { mID: "", mValue: "" },
    PAN: "",
    OtherDocsFront: "",
    OtherDocsBack: "",
    Pan: "",
    OtherDocNumber: "",
  });

  // Education details
  const [qualCount, setQualCount] = useState([
    {
      QualificationType: { mID: "", mValue: "" },
      UniversityName: "",
      Grade: "",
      Location: "",
      Year: "",
      FileName: "",
      OtherDocName: "",
    },
  ]);
  const [educationData, setEducationData] = useState([]);
  const [qualification, setQualification] = useState([
    {
      mID: "",
      mValue: "",
    },
  ]);
  const [addEdDetails, setAddEdDetails] = useState([0]);

  // Bank details
  const [bankDetails, setBankDetails] = useState({
    BankName: "",
    BranchName: "",
    AccountNo: "",
    IfscCode: "",
    BankDetails: "",
  });
  const [open, setOpen] = useState(false);
  const [bankData, setBankData] = useState();
  const [checkState, setCheckState] = useState(false);
  const [DocData, setDocData] = useState("");
  const [applnNo, setApplnNo] = useState("");

  useEffect(() => {
    if (pospdetails !== null) {
      setPOSPJson(pospdetails);
      setMasterSelection(pospdetails.mastersSelected);
      setAddressCity(pospdetails.areaSelected);
      if (Object.keys(pospdetails || {}).filter((x) => x === "OtherDocs").length === 0) {
        setKycDetails(kycDetails);
      } else {
        setKycDetails((prevState) => ({
          ...prevState,
          OtherDocs: pospdetails.OtherDocs,
          PAN: pospdetails.PAN,
          OtherDocsFront: pospdetails.OtherDocsFront,
          OtherDocsBack: pospdetails.OtherDocsBack,
          Pan: pospdetails.Pan,
          OtherDocNumber: pospdetails.OtherDocNumber,
        }));
      }
      if (Object.keys(pospdetails || {}).filter((x) => x === "EducationDetails").length === 0) {
        setQualCount(qualCount);
      } else {
        setQualCount(pospdetails.EducationDetails);
      }
      if (Object.keys(pospdetails || {}).filter((x) => x === "BankDetails").length === 0) {
        setBankDetails(bankDetails);
      } else {
        setBankDetails(pospdetails.BankDetails);
      }
      setFlags((prev) => ({ ...prev, otherDocSelectedFlag: pospdetails.otherDocSelectedFlag }));
      setCheckState(pospdetails.checkState);
      setApplnNo(pospdetails.ApplicationNo);
    }
  }, [pospdetails !== null]);

  return (
    <MDBox>
      <Card>
        <Stack direction="row" spacing={5} pt={3} pl={5}>
          <Stack direction="row">
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Agent Name:
            </MDTypography>
            <MDTypography variant="h6" sx={{ color: "black", fontSize: "1.25rem" }}>
              {pospdetails.FirstName}
              {pospdetails.LastName}
            </MDTypography>
          </Stack>
        </Stack>
        <HorizontalLinearStepper
          POSPJson={POSPJson}
          setPOSPJson={setPOSPJson}
          masterSelection={masterSelection}
          setMasterSelection={setMasterSelection}
          setAddressCity={setAddressCity}
          addressCity={addressCity}
          flags={flags}
          setFlags={setFlags}
          profile={profile}
          setProfile={setProfile}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          areaMaster={areaMaster}
          pincodeMaster={pincodeMaster}
          area={area}
          salutation={salutation}
          setArea={setArea}
          setSalutation={setSalutation}
          setAreaMaster={setAreaMaster}
          setPincodeMaster={setPincodeMaster}
          kycDetails={kycDetails}
          pan={pan}
          adhaarBack={adhaarBack}
          adhaarFront={adhaarFront}
          setKycDetails={setKycDetails}
          setPan={setPan}
          setadhaarBack={setadhaarBack}
          setadhaarFront={setadhaarFront}
          addEdDetails={addEdDetails}
          qualification={qualification}
          educationData={educationData}
          qualCount={qualCount}
          setAddEdDetails={setAddEdDetails}
          setQualification={setQualification}
          setEducationData={setEducationData}
          setQualCount={setQualCount}
          bankData={bankData}
          open={open}
          bankDetails={bankDetails}
          setBankData={setBankData}
          setOpen={setOpen}
          setBankDetails={setBankDetails}
          setCheckState={setCheckState}
          checkState={checkState}
          setDocData={setDocData}
          DocData={DocData}
          applnNo={applnNo}
        />
      </Card>
    </MDBox>
  );
}

export default POSP;
