// import { useState } from "react";

import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import { ArrowBack } from "@mui/icons-material";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import swal from "sweetalert";
import CancelIcon from "@mui/icons-material/Cancel";
import { ProfileData, UploadFiles, DeleteFile, CreatePOSP, SendNotification } from "../data";
import { setPOSPInput, useDataController } from "../../../../../BrokerPortal/context";
import { postRequest } from "../../../../../../core/clients/axiosclient";

function EducationQualification({
  EducationalQualification,
  handleFileUpload,
  qualCount,
  handleEducationDetails,
  // educationData,
  handleDeleteFile,
  flags,
  handleclearicon,
  handleOtherDoc,
}) {
  return (
    <Grid
      flexDirection="row"
      display="flex"
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      xxl={12}
      sx={{ mt: "1rem" }}
      spacing={2}
    >
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <Autocomplete
          value={qualCount.QualificationType}
          onChange={handleEducationDetails}
          options={EducationalQualification}
          getOptionLabel={(option) => option.mValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px!important",
            },
          }}
          renderInput={(params) => (
            <MDInput
              label="Educational Qualification"
              {...params}
              error={
                Object.values(qualCount.QualificationType || {}).every(
                  (x) => x === null || x === ""
                )
                  ? flags.errorFlag
                  : null
              }
              variant="outlined"
            />
          )}
        />
        {flags.errorFlag &&
        Object.values(qualCount.QualificationType || {}).every((x) => x === null || x === "") ? (
          <MDTypography sx={{ color: "red", fontSize: "11px" }}>
            Please fill required field{" "}
          </MDTypography>
        ) : null}
      </Grid>

      {Object.values(qualCount.QualificationType || {}).every(
        (x) => x.mID !== "" || x.mID !== null
      ) && qualCount.QualificationType.mID === "146" ? (
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Other Document Name"
            name="OtherDocName"
            onChange={handleOtherDoc}
            value={qualCount.OtherDocName}
            error={qualCount.OtherDocName === "" ? flags.errorFlag : null}
          />
          {flags.errorFlag && qualCount.OtherDocName === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
              Please fill the other documnent name
            </MDTypography>
          ) : null}
        </Grid>
      ) : null}

      <Grid item flexDirection="row" display="flex" xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7, pl: 4.75 }}>
          Upload certificate copy
        </MDTypography>
        <MDButton color="info" sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }} component="label">
          Upload
          <input
            hidden
            accept="image/bmp, image/jpeg, image/png, .pdf"
            type="file"
            onChange={handleFileUpload}
          />
        </MDButton>
        <MDTypography
          sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
        >
          {qualCount.FileName !== "" ? qualCount.FileName : null}{" "}
          {qualCount.FileName !== "" ? (
            <CancelIcon color="primary" onClick={handleDeleteFile} />
          ) : null}
        </MDTypography>
        <Grid>
          {flags.errorFlag && qualCount.FileName === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
              Please upload the document
            </MDTypography>
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={9} sm={9} md={3} lg={3} xl={3} xxl={3}>
        {qualCount.clearFlag ? (
          <CancelIcon fontSize="large" color="primary" onClick={handleclearicon} />
        ) : null}
      </Grid>
    </Grid>
  );
}

function EducationDetails({
  handleNext,
  handleBack,
  addEdDetails,
  qualification,
  educationData,
  qualCount,
  setAddEdDetails,
  setQualification,
  setEducationData,
  setQualCount,
  flags,
  setFlags,
  POSPJsonNew,
  kycDetails,
  masterSelection,
  // setMasterSelection,
  // setAddressCity,
  addressCity,
  DocData,
}) {
  // const [qualCount, setQualCount] = useState([
  //   { QualificationType: "", UniversityName: "", Grade: "", Location: "", Year: "", FileName: "" },
  // ]);
  // const [educationData, setEducationData] = useState([]);
  // const [qualification, setQualification] = useState([
  //   {
  //     mID: "",
  //     mValue: "",
  //   },
  // ]);
  const [controller, dispatch] = useDataController();
  const { POSPJson, masterSelectionPosp, ApplicationNo } = controller;
  // const [addEdDetails, setAddEdDetails] = useState([0]);
  const { EducationalQualification } = ProfileData().basicdetails.Masters;
  console.log("POSPJSON", POSPJson);
  console.log("mastersss", masterSelectionPosp);

  const addQualification = () => {
    setAddEdDetails([...addEdDetails, 0]);
    const edDetails = {
      QualificationType: { mID: "", mValue: "" },
      UniversityName: "",
      Grade: "",
      Location: "",
      Year: "",
      FileName: "",
      clearFlag: true,
    };
    const eduQual = {
      mID: "",
      mValue: "",
    };
    setQualCount((prevState) => [
      ...prevState,
      {
        ...edDetails,
      },
    ]);
    setQualification([...qualification, eduQual]);
    setEducationData([...educationData, null]);
  };

  const handleclearicon = (i) => {
    console.log("educationData", educationData);
    const deletedarray = qualCount.filter((x, index) => index !== i);
    const deleterow = addEdDetails.filter((x, idx) => idx !== i);
    const deletefile = educationData.filter((x, idx) => idx !== i);
    console.log("deletedarray", deletedarray);
    setAddEdDetails([...deleterow]);
    setQualCount([...deletedarray]);
    setEducationData([...deletefile]);
  };

  const handleDeleteFile = async (file, index) => {
    const fileName = file.name;
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        const filteredData = { ...qualCount[index] };
        filteredData.FileName = "";
        qualCount.splice(index, 1, { ...filteredData });
        setQualCount([...qualCount]);
        // const removedArray = { ...educationData[index] };
        // educationData.splice(index, 1, { ...removedArray });
        educationData.splice(index, 1, undefined);
        setEducationData([...educationData]);
      }
    });
  };

  const UplaodEduData = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        const filteredData = { ...qualCount[index] };
        filteredData.FileName = result.data[0].fileName;
        qualCount.splice(index, 1, { ...filteredData });
        setQualCount([...qualCount]);
        educationData.splice(index, 1, file);
        setEducationData([...educationData]);
      }
    });
  };
  const handleFileUpload = async (event, index) => {
    console.log("FILES", event.target.files[0]);
    await UplaodEduData(event.target.files[0], index);
  };
  const onNext = () => {
    console.log("12356", qualCount);
    const errorStatus = qualCount.some(
      (y) =>
        y.QualificationType.mValue === "" ||
        y.FileName === "" ||
        (y.QualificationType.mValue === "Other" ? y.OtherDocName === "" : null)
    );
    console.log("123456789", errorStatus);
    if (errorStatus === true) {
      setFlags((prev) => ({ ...prev, errorFlag: true }));
      swal({
        icon: "error",
        text: "Please fill all the required fields",
      });
    } else {
      setFlags((prev) => ({ ...prev, errorFlag: false }));
      const QualificationType = qualCount.some(
        (x) => x.QualificationType.mValue === "Class X" && x.FileName !== ""
      );
      if (QualificationType === false) {
        swal({
          icon: "error",
          text: "Please select Class X and add your certificate as it is mandatory",
        });
      } else {
        setPOSPInput(dispatch, { ...POSPJson, EducationDetails: qualCount });
        handleNext();
      }
    }
    // console.log("1234567890", errorStatus);

    // qualCount.forEach((x) => {
    //   if (x.FileName === "" || x.QualificationType === "") {
    //     // checkflag = true;
    //     setFlags((prev) => ({ ...prev, errorFlag: true }));
    //     // setFlags(true);
    //   }
    // });
    // if (flags.errorFlag === false) {
    //   swal({ icon: "error", text: "Please upload your certificate " });
    // } else {
    //   setPOSPInput(dispatch, { ...POSPJson, EducationDetails: qualCount });
    //   setFlags((prev) => ({ ...prev, errorFlag: false }));
    //   handleNext();
    // }

    // if (qualCount.FileName === "") {
    //   setFlags((prev) => ({ ...prev, errorFlag: true }));
    // } else {
    //   setPOSPInput(dispatch, { ...POSPJson, EducationDetails: qualCount });
    //   handleNext();
    // }
    // const FileName = qualCount.some((x) => x.FileName !== "");
    // if (FileName !== "") {
    //   setFlags((prev) => ({ ...prev, errorFlag: true }));
    //   swal({
    //     icon: "error",
    //     text: "Please upload certificate",
    //   });
    // } else {
    //   setPOSPInput(dispatch, { ...POSPJson, EducationDetails: qualCount });
    //   handleNext();
    // }
    // let checkFlag = false;
    // if (checkFlag === true) {
    //   swal({ icon: "error", text: "Please upload your certificate " });
    // } else {
    //   setPOSPInput(dispatch, { ...POSPJson, EducationDetails: qualCount });
    //   // handleNext();
    // }
  };
  const handleEducationDetails = (event, value, index) => {
    if (value === null) {
      const filteredData = { ...qualCount[index] };
      filteredData.QualificationType = { mID: "", mValue: "" };
      qualCount.splice(index, 1, { ...filteredData });
      setQualCount([...qualCount]);
    } else {
      const filteredData = { ...qualCount[index] };
      filteredData.QualificationType = value;
      qualCount.splice(index, 1, { ...filteredData });
      setQualCount([...qualCount]);
    }
  };

  const handleOtherDoc = (e, index) => {
    const filteredData = { ...qualCount[index] };
    filteredData.OtherDocName = e.target.value;
    qualCount.splice(index, 1, { ...filteredData });
    setQualCount([...qualCount]);
  };

  const handleSaveForLater = async () => {
    setFlags((prev) => ({ ...prev, errorFlag: false, saveButtonDisable: true }));
    const QualificationType = qualCount.some(
      (x) => x.QualificationType.mValue === "Class X" && x.FileName !== ""
    );
    if (QualificationType === false) {
      swal({
        icon: "error",
        text: "Please select Class X and add your certificate as it is mandatory",
      });
    } else {
      const newValue = {
        ...POSPJsonNew,
        EducationDetails: qualCount,
        saveFlag: true,
        mastersSelected: { ...masterSelection },
        areaSelected: { ...addressCity },
        OtherDocs: kycDetails.OtherDocs,
        PAN: kycDetails.PAN,
        OtherDocsFront: kycDetails.OtherDocsFront,
        OtherDocsBack: kycDetails.OtherDocsBack,
        OtherDocNumber: kycDetails.OtherDocNumber,
        Pan: kycDetails.Pan,
        otherDocSelectedFlag: flags.otherDocSelectedFlag,
        DocData,
        ApplicationNo,
      };
      if (Object.keys(POSPJsonNew || {}).filter((x) => x === "saveFlag").length === 0) {
        if (flags.isCreate === true) {
          await CreatePOSP(newValue, ApplicationNo).then((data) => {
            if (data.status === 2) {
              setFlags((prev) => ({ ...prev, isCreate: false }));
            }
          });
        } else {
          await postRequest(`Partner/UpdatePOSPDetails`, newValue);
        }
      } else {
        await postRequest(`Partner/UpdatePOSPDetails`, newValue);
      }
      const notificationData = {
        proposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: POSPJsonNew.EmailId,
        keyType: "",
        communicationId: 130,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      await SendNotification(POSPJsonNew.EmailId, notificationData);
      setFlags((prev) => ({ ...prev, saveButtonDisable: false }));
    }
  };

  return (
    <div>
      <Grid container flexDirection="column" display="flex" spacing="1rem">
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
          sx={{ maxHeight: "100%" }}
        >
          <Grid item xs={6} sm={6} md={2} lg={2} xl={2} xxl={2}>
            <MDTypography
              sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25, mt: "10%" }}
            >
              Educational Details
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} sx={{ mt: "0.3rem" }}>
            <MDButton
              size="medium"
              startIcon={<AddIcon />}
              onClick={addQualification}
              sx={{
                // color: "#1976D2",
                textSize: "0.87rem",
                borderRadius: "0.25rem",
                borderColor: "#1976D2",
                border: 1,
                mt: "4%",
              }}
              color="info"
            >
              Add More
            </MDButton>
          </Grid>
        </Grid>
        <addEducationRow />
        {qualCount.map((item, index) => (
          <EducationQualification
            EducationalQualification={EducationalQualification}
            handleFileUpload={(e) => handleFileUpload(e, index)}
            qualCount={qualCount[index]}
            handleEducationDetails={(event, value) => handleEducationDetails(event, value, index)}
            educationData={educationData[index]}
            handleDeleteFile={() => handleDeleteFile(qualCount[index].FileName, index)}
            handleclearicon={() => handleclearicon(index)}
            handleOtherDoc={(e) => handleOtherDoc(e, index)}
            flags={flags}
          />
        ))}

        {/* <Grid container justifyContent="flex-end" sx={{ marginBottom: "80px", marginTop: "10px" }}>
        <MDButton variant="outlined" color="info" sx={{ marginRight: "60px" }}>
          Save for later
        </MDButton>
        <MDButton variant="contained" color="info" onClick={onNext}>
          Continue
        </MDButton>
      </Grid> */}
      </Grid>
      <MDBox display="flex" flexDirection="row" sx={{ marginBottom: "239px", marginTop: "30px" }}>
        <Grid container justifyContent="flex-start">
          <MDButton variant="outlined" color="info" onClick={handleBack} startIcon={<ArrowBack />}>
            Back
          </MDButton>
        </Grid>
        <Grid container justifyContent="flex-end">
          <MDButton
            variant="outlined"
            color="info"
            sx={{ marginRight: "60px" }}
            onClick={handleSaveForLater}
            disabled={flags.saveButtonDisable}
          >
            Save for later
          </MDButton>
          <MDButton variant="contained" color="info" onClick={onNext}>
            Continue
          </MDButton>
        </Grid>
      </MDBox>
    </div>
  );
}

export default EducationDetails;
