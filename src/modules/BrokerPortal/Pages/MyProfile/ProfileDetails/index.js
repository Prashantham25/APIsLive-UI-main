import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import BPNavbarEmpty from "modules/BrokerPortal/Layouts/BPNavbarEmpty";
import PageLayout from "examples/LayoutContainers/PageLayout";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import BasicDetails from "../BasicDetails";
import KYCDetails from "../KYCDetails";
import EducationDetails from "../EducationDetails";
import BankDetails from "../BankDetails";
import { useDataController } from "../../../context";

const steps = ["Basic Details", "KYC Details", "Education Details", "Bank Details"];

function GetStepContent({
  step,
  handleNext,
  handleBack,
  handleSkip,
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
}) {
  switch (step) {
    case 0:
      return (
        <BasicDetails
          handleNext={handleNext}
          handleBack={handleBack}
          handleSkip={handleSkip}
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
        />
      );
    case 1:
      return (
        <KYCDetails
          handleNext={handleNext}
          handleBack={handleBack}
          handleSkip={handleSkip}
          kycDetails={kycDetails}
          pan={pan}
          adhaarBack={adhaarBack}
          adhaarFront={adhaarFront}
          setKycDetails={setKycDetails}
          setPan={setPan}
          setadhaarBack={setadhaarBack}
          setadhaarFront={setadhaarFront}
          flags={flags}
          setFlags={setFlags}
          setDocData={setDocData}
          DocData={DocData}
          POSPJsonNew={POSPJson}
          masterSelection={masterSelection}
          setMasterSelection={setMasterSelection}
          setAddressCity={setAddressCity}
          addressCity={addressCity}
        />
      );
    case 2:
      return (
        <EducationDetails
          handleNext={handleNext}
          handleBack={handleBack}
          handleSkip={handleSkip}
          addEdDetails={addEdDetails}
          qualification={qualification}
          educationData={educationData}
          kycDetails={kycDetails}
          qualCount={qualCount}
          setAddEdDetails={setAddEdDetails}
          setQualification={setQualification}
          setEducationData={setEducationData}
          setQualCount={setQualCount}
          flags={flags}
          setFlags={setFlags}
          POSPJsonNew={POSPJson}
          masterSelection={masterSelection}
          setMasterSelection={setMasterSelection}
          setAddressCity={setAddressCity}
          addressCity={addressCity}
          DocData={DocData}
        />
      );
    case 3:
      return (
        <BankDetails
          handleNext={handleNext}
          handleBack={handleBack}
          handleSkip={handleSkip}
          bankData={bankData}
          open={open}
          bankDetails={bankDetails}
          setBankData={setBankData}
          setOpen={setOpen}
          setBankDetails={setBankDetails}
          flags={flags}
          setFlags={setFlags}
          setCheckState={setCheckState}
          checkState={checkState}
          POSPJsonNew={POSPJson}
          masterSelection={masterSelection}
          setMasterSelection={setMasterSelection}
          setAddressCity={setAddressCity}
          addressCity={addressCity}
          qualCount={qualCount}
          kycDetails={kycDetails}
          DocData={DocData}
        />
      );
    default:
      return "Unknown step"; // + { step };
  }
}

GetStepContent.defaultProps = {
  step: 0,
};

GetStepContent.propTypes = {
  step: PropTypes.number,
};

function HorizontalLinearStepper({
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
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => step === 1;

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // CSS over-ride
  const CustomStepper = styled(Stepper)(({ theme }) => ({
    "& .MuiStepLabel-labelContainer": {
      fontSize: theme.fontStyle.fontSize,
    },
    ".MuiSvgIcon-root.Mui-completed": {
      color: "green",
    },
  }));

  const theme = createTheme({
    fontStyle: {
      fontSize: "10px",
    },
  });

  return (
    <MDBox sx={{ width: "100%", px: 3 }}>
      <ThemeProvider theme={theme}>
        <CustomStepper sx={{ ml: "20%", mr: "20%", mt: "3%" }} activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              // labelProps.optional = (
              //   // <MDTypography variant="caption">Optional</MDTypography>
              // );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  sx={{
                    flexDirection: "row",
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </CustomStepper>
      </ThemeProvider>
      {activeStep === steps.length ? (
        <>
          <MDTypography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </MDTypography>
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDBox sx={{ flex: "1 1 auto" }} />
            <MDButton onClick={handleReset}>Reset</MDButton>
          </MDBox>
        </>
      ) : (
        <>
          {/* <MDTypography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</MDTypography> */}
          <GetStepContent
            step={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            handleSkip={handleSkip}
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
          />
        </>
      )}
    </MDBox>
  );
}

function ProfileDetails() {
  const [controller] = useDataController();
  const { UserDetails, POSPDetails } = controller;

  // Basic details
  const [POSPJson, setPOSPJson] = useState({
    ProfileImage: "",
    RawImage: "",
    Salutation: "",
    FirstName: UserDetails.FirstName,
    MiddleName: "",
    LastName: UserDetails.LastName,
    MaritalStatus: "",
    EmailId: UserDetails.Email,
    MobileNo: UserDetails.MobileNo,
    DOB: null,
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

  useEffect(() => {
    if (POSPDetails !== null) {
      setPOSPJson(POSPDetails);
      setMasterSelection(POSPDetails.mastersSelected);
      setAddressCity(POSPDetails.areaSelected);
      if (Object.keys(POSPDetails || {}).filter((x) => x === "OtherDocs").length === 0) {
        setKycDetails(kycDetails);
      } else {
        setKycDetails((prevState) => ({
          ...prevState,
          OtherDocs: POSPDetails.OtherDocs,
          PAN: POSPDetails.PAN,
          OtherDocsFront: POSPDetails.OtherDocsFront,
          OtherDocsBack: POSPDetails.OtherDocsBack,
          Pan: POSPDetails.Pan,
          OtherDocNumber: POSPDetails.OtherDocNumber,
        }));
      }
      if (Object.keys(POSPDetails || {}).filter((x) => x === "EducationDetails").length === 0) {
        setQualCount(qualCount);
      } else {
        setQualCount(POSPDetails.EducationDetails);
      }
      if (Object.keys(POSPDetails || {}).filter((x) => x === "BankDetails").length === 0) {
        setBankDetails(bankDetails);
      } else {
        setBankDetails(POSPDetails.BankDetails);
      }
      setFlags((prev) => ({ ...prev, otherDocSelectedFlag: POSPDetails.otherDocSelectedFlag }));
      setCheckState(POSPDetails.checkState);
    }
  }, [POSPDetails !== null]);

  // const { EducationalQualification } = ProfileData().basicdetails.Masters;
  return (
    <PageLayout>
      <BPNavbarEmpty />
      <Card position="inline" sx={{ borderRadius: "0", mr: "1.5rem" }}>
        {/* {console.log("profiledata",ProfileData().profiledata.basicdetails.name)} */}
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
        />
      </Card>
    </PageLayout>
  );
}

export default ProfileDetails;
