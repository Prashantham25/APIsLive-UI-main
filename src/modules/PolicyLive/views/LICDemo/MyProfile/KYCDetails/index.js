import Grid from "@mui/material/Grid";
import MDInput from "components/MDInput";
// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
// import { useState } from "react";
import swal from "sweetalert";
import { Autocomplete } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { setPOSPInput, useDataController } from "../../../../../BrokerPortal/context";
import { DeleteFile, ProfileData, UploadFiles, CreatePOSP, SendNotification } from "../data/index";
import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";

function KYCDetails({
  handleNext,
  handleBack,
  kycDetails,
  // pan,
  // adhaarBack,
  // adhaarFront,
  setKycDetails,
  setPan,
  setadhaarBack,
  setFlags,
  setadhaarFront,
  flags,
  setDocData,
  DocData,
  POSPJsonNew,
  masterSelection,
  // setMasterSelection,
  // setAddressCity,
  addressCity,
}) {
  // const [adhaarFront, setadhaarFront] = useState();
  // const [adhaarBack, setadhaarBack] = useState();
  // const [pan, setPan] = useState();
  // const [kycDetails, setKycDetails] = useState({
  //   OtherDocs: { mID: "", mValue: "" },
  //   PAN: "",
  //   OtherDocsFront: "",
  //   OtherDocsBack: "",
  //   Pan: "",
  //   OtherDocNumber: "",
  // });
  const [controller, dispatch] = useDataController();
  const { POSPJson, ApplicationNo } = controller;
  // const [flags, setFlags] = useState({
  //   errorFlag: false,
  //   otherDocSelectedFlag: false,
  //   panError: false,
  //   dedupError: false,
  //   validationError: false,
  // });
  console.log("POSPJSON", POSPJson);

  const handleKYCDetails = (event) => {
    //  if (event.target.mID === "195") {
    //    const newValue = {
    //      ...kycDetails,
    //      [event.target.name]: event.target.value.replace(/\d(? =\d{4})/g, "*"),
    //    };
    //    setKycDetails(newValue);
    // } else {
    const newValue = { ...kycDetails, [event.target.name]: event.target.value };
    setKycDetails(newValue);
    if (event.target.name === "OtherDocNumber") {
      setDocData(event.target.value);
    }
    if (kycDetails.OtherDocs.mID === "195") {
      const Value = { ...POSPJson, Aadhar: event.target.value };
      setPOSPInput(dispatch, Value);
    }
    console.log("kycDetails", kycDetails);
    // }
  };

  const handleunmask = () => {
    if (kycDetails.OtherDocs.mID === "195") {
      setDocData(POSPJson.Aadhar);
    }
    console.log("aaaa");
  };

  const handleValidate = (e) => {
    if (e.target.name === "PAN") {
      const PanReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!PanReg.test(e.target.value)) {
        const newValue = { ...kycDetails, [e.target.name]: e.target.value };
        setKycDetails(newValue);
        setFlags((prevState) => ({ ...prevState, panError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, panError: false }));
        getRequest(`Partner/PanCardNumberDeduplication?PanNo=${kycDetails.PAN}`).then((result) => {
          if (result.status === 200) {
            if (result.data === "true") {
              setFlags((prevState) => ({ ...prevState, dedupError: true }));
            } else {
              setFlags((prevState) => ({ ...prevState, dedupError: false }));
            }
          }
        });
      }
    }
  };

  const uploadFiles = async (files, type) => {
    const formData = new FormData();
    formData.append("file", files, files.name);
    await UploadFiles(formData).then((result) => {
      console.log("result", result);
      if (result.data[0].fileName !== "") {
        if (type === "AdhaarFront") {
          setKycDetails((prevState) => ({ ...prevState, OtherDocsFront: result.data[0].fileName }));
          setadhaarFront(files);
        } else if (type === "AdhaarBack") {
          setKycDetails((prevState) => ({ ...prevState, OtherDocsBack: result.data[0].fileName }));
          setadhaarBack(files);
        } else {
          setKycDetails((prevState) => ({ ...prevState, Pan: result.data[0].fileName }));
          setPan(files);
        }
      }
    });
  };

  const handleOtherDocs = (event, value) => {
    if (value !== null) {
      setadhaarFront();
      setDocData("");
      const newValue = {
        ...kycDetails,
        OtherDocNumber: "",
        OtherDocsFront: "",
        OtherDocsBack: "",
        OtherDocs: value,
      };
      setKycDetails(newValue);
      setFlags((prevState) => ({ ...prevState, otherDocSelectedFlag: true, errorFlag: false }));
    } else {
      setKycDetails((prevState) => ({
        ...prevState,
        OtherDocNumber: "",
        OtherDocsFront: "",
        OtherDocsBack: "",
        OtherDocs: { mID: "", mValue: "" },
      }));
      setadhaarFront();
      setadhaarBack();
      // const newValue = { ...kycDetails, OtherDocs: { mID: "", mValue: "" } };
      // setKycDetails(newValue);
      setFlags((prevState) => ({ ...prevState, otherDocSelectedFlag: false, errorFlag: false }));
    }
  };

  // const numberMasking = (_number) => {
  //   let mask = "";
  //   if (_number) {
  //     for (let i = 1; i <= _number.length - 4; i++) {
  //       mask += "x";
  //     }
  //     // return mask + _number.slice(8, 12);
  //     console.log(mask + _number.slice(8, 12));
  //   }
  //   return null;
  // };

  const handleValidateKycDocuments = (e) => {
    const selectedDocID = kycDetails.OtherDocs.mID;
    switch (selectedDocID) {
      case "195":
        {
          if (kycDetails.OtherDocNumber.length === 12) {
            const masked = DocData.slice(8, 12);
            const maskedData = "XXXXXXXX".concat(masked);
            // const unMasked = DocData(9, 12);
            setDocData(maskedData);
          }
          const AadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
          if (!AadharRegex.test(kycDetails.OtherDocNumber)) {
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "206":
        {
          const VoterRegex = /^([A-Z]){3}([0-9]){7}?$/;
          // /^([a-zA-Z]){3}([0-9]){7}?$/;
          if (!VoterRegex.test(e.target.value)) {
            setKycDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "192":
        {
          const PassportRegex = /^([A-Z]){1}([0-9]){7}$/;
          // /^([a-zA-Z]){2}([0-9]){7}/;
          if (!PassportRegex.test(e.target.value)) {
            setKycDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "193":
        {
          const DrivingRegex = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;
          // /^(([A-Z]{2}[0-9]{2})" + "( )|([A-Z]{2}-[0-9]" + "{2}))((19|20)[0-9]" + "[0-9])[0-9]{7}$"/;
          if (!DrivingRegex.test(e.target.value)) {
            setKycDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "194":
        {
          const regex = /^[A-Z]{2}[-][0-9]{2}[-][0-9]{3}[-][0-9]{3}[-][0-9]{3}[/][0-9]{3}$/;
          if (!regex.test(e.target.value)) {
            setKycDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      default:
        console.log("SIndhu");
    }
  };

  const handleFileUpload = async (event, type) => {
    await uploadFiles(event.target.files[0], type);
    console.log("files", event.target.files[0]);
  };

  const onNext = () => {
    // setPOSPInput(dispatch, { ...POSPJson, OtherDocs: kycDetails.OtherDocs ,PAN: kycDetails.PAN});
    console.log("kycDetails", kycDetails);
    if (
      Object.values(kycDetails.OtherDocs).every((x) => x === "" || x === null) ||
      kycDetails.PAN === "" ||
      (kycDetails.OtherDocs.mID === "195" ||
      kycDetails.OtherDocs.mID === "206" ||
      kycDetails.OtherDocs.mID === "192" ||
      kycDetails.OtherDocs.mID === "193" ||
      kycDetails.OtherDocs.mID === "198"
        ? kycDetails.OtherDocNumber === "" ||
          kycDetails.OtherDocsFront === "" ||
          kycDetails.OtherDocsBack === ""
        : null) ||
      (kycDetails.OtherDocs.mID !== "195" ||
      kycDetails.OtherDocs.mID !== "206" ||
      kycDetails.OtherDocs.mID !== "192" ||
      kycDetails.OtherDocs.mID !== "193" ||
      kycDetails.OtherDocs.mID !== "198"
        ? kycDetails.OtherDocsFront === ""
        : null) ||
      kycDetails.Pan === ""
    ) {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      setFlags((prevState) => ({ ...prevState, errorFlag: false }));
      if (flags.panError === true) {
        swal({
          icon: "error",
          text: "Please fill valid PAN Number",
        });
      } else {
        setFlags((prevState) => ({ ...prevState, errorFlag: false }));
        if (flags.dedupError === true) {
          swal({
            icon: "error",
            text: "This PAN number already exists",
          });
        } else {
          setFlags((prevState) => ({ ...prevState, errorFlag: false }));
          if (flags.validationError === true) {
            swal({
              icon: "error",
              text: `Please Fill the valid ${kycDetails.OtherDocs.mValue} number`,
            });
          } else {
            setPOSPInput(dispatch, {
              ...POSPJson,
              OtherDocs: kycDetails.OtherDocs,
              PAN: kycDetails.PAN,
              OtherDocsFront: kycDetails.OtherDocsFront,
              OtherDocsBack: kycDetails.OtherDocsBack,
              OtherDocNumber: kycDetails.OtherDocNumber,
              Pan: kycDetails.Pan,
              otherDocSelectedFlag: flags.otherDocSelectedFlag,
              DocData,
            });
            handleNext();
          }
        }
      }
    }
  };

  const handleSaveForLater = async () => {
    setFlags((prevState) => ({ ...prevState, errorFlag: false, saveButtonDisable: true }));
    if (flags.panError === true) {
      swal({ icon: "error", text: "Please fill valid PAN Number" });
    } else {
      setFlags((prevState) => ({ ...prevState, errorFlag: false }));
      if (flags.dedupError === true) {
        swal({ icon: "error", text: "This PAN number already exists" });
      } else {
        setFlags((prevState) => ({ ...prevState, errorFlag: false }));
        if (flags.validationError === true) {
          swal({
            icon: "error",
            text: `Please Fill the valid ${kycDetails.OtherDocs.mValue} number`,
          });
        } else {
          const newValue = {
            ...POSPJsonNew,
            mastersSelected: { ...masterSelection },
            areaSelected: { ...addressCity },
            OtherDocs: kycDetails.OtherDocs,
            PAN: kycDetails.PAN,
            OtherDocsFront: kycDetails.OtherDocsFront,
            OtherDocsBack: kycDetails.OtherDocsBack,
            OtherDocNumber: kycDetails.OtherDocNumber,
            Pan: kycDetails.Pan,
            otherDocSelectedFlag: flags.otherDocSelectedFlag,
            saveFlag: true,
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
      }
    }
  };

  const handleDeleteFile = async (type, fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        if (type === "AdhaarFront") {
          setadhaarFront();
        } else if (type === "AdhaarBack") {
          setadhaarBack();
        } else {
          setPan();
        }
      }
    });
  };

  const { KYCDocuments } = ProfileData().basicdetails.Masters;

  return (
    <div>
      <Grid container flexDirection="column" display="flex" spacing="1rem">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
            Pan Card Details
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Pan Card Number"
            fullWidth
            name="PAN"
            onChange={handleKYCDetails}
            value={kycDetails.PAN}
            onBlur={handleValidate}
            inputProps={{ maxLength: 10 }}
            required
            sx={{
              "& .MuiFormLabel-asterisk": {
                color: "red",
              },
            }}
            error={kycDetails.PAN === "" ? flags.errorFlag : null}
          />
          {flags.errorFlag && kycDetails.PAN === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
          {flags.panError && kycDetails.PAN !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill valid PAN Number
            </MDTypography>
          ) : null}
          {flags.dedupError && flags.errorFlag === false && flags.panError === false ? (
            <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
              This PAN number already exists
            </MDTypography>
          ) : null}
        </Grid>
        <Grid
          item
          flexDirection="row"
          display="flex"
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ pt: 3 }}
        >
          <MDTypography sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}>
            Upload PAN Card
          </MDTypography>
          <MDButton
            color="info"
            // onClick={(e) => handleFileUpload(e, "PAN")}
            sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
            component="label"
          >
            Upload
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e, "PAN")}
            />
          </MDButton>
          <MDTypography
            sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
          >
            {kycDetails.Pan !== "" ? kycDetails.Pan : null}{" "}
            {kycDetails.Pan !== "" && (
              <CancelIcon onClick={() => handleDeleteFile("PAN", kycDetails.Pan)} color="primary" />
            )}
          </MDTypography>
          <Grid>
            {flags.errorFlag && kycDetails.Pan === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px", ml: "10px", mt: "7px" }}>
                Please upload the Pancard
              </MDTypography>
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
            Other KYC Documents
          </MDTypography>
        </Grid>
        <Grid container spacing={2} sx={{ ml: "10px", mt: "16px" }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              fullWidth
              name="OtherDocs"
              options={KYCDocuments}
              onChange={handleOtherDocs}
              value={kycDetails.OtherDocs}
              onBlur={handleValidate}
              required
              getOptionLabel={(option) => option.mValue}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              renderInput={(params) => (
                <MDInput
                  label="Select Document"
                  {...params}
                  variant="outlined"
                  error={
                    Object.values(kycDetails.OtherDocs).every((x) => x === "" || x === null)
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
              // error={kycDetails.OtherDocs === "" ? flags.errorFlag : null}
            />
          </Grid>
          {flags.otherDocSelectedFlag &&
          Object.values(kycDetails.OtherDocs || {}).every((x) => x.mID !== "" || x.mID !== null) &&
          (kycDetails.OtherDocs.mID === "195" ||
            kycDetails.OtherDocs.mID === "206" ||
            kycDetails.OtherDocs.mID === "192" ||
            kycDetails.OtherDocs.mID === "193" ||
            kycDetails.OtherDocs.mID === "194") ? (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label={`${kycDetails.OtherDocs.mValue} Number`}
                fullWidth
                // value={kycDetails.OtherDocNumber}
                value={DocData}
                onChange={handleKYCDetails}
                name="OtherDocNumber"
                onBlur={handleValidateKycDocuments}
                onFocus={handleunmask}
                required
                inputProps={kycDetails.OtherDocs.mID === "195" && { maxLength: 12 }}
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
              />
              {flags.validationError && kycDetails.OtherDocNumber !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  {`Please Fill the valid ${kycDetails.OtherDocs.mValue} number`}
                </MDTypography>
              ) : null}
              {flags.errorFlag && kycDetails.OtherDocNumber === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill the required field
                </MDTypography>
              ) : null}
            </Grid>
          ) : null}
        </Grid>
        {flags.otherDocSelectedFlag &&
        Object.values(kycDetails.OtherDocs || {}).every((x) => x.mID !== "" || x.mID !== null) &&
        (kycDetails.OtherDocs.mID === "195" ||
          kycDetails.OtherDocs.mID === "206" ||
          kycDetails.OtherDocs.mID === "192" ||
          kycDetails.OtherDocs.mID === "193" ||
          kycDetails.OtherDocs.mID === "198") ? (
          <Grid item flexDirection="row" display="flex" sx={{ pt: 3 }}>
            <Grid
              item
              flexDirection="row"
              display="flex"
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
            >
              <MDTypography sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}>
                Upload Front Side
              </MDTypography>

              <MDButton
                variant="contained"
                component="label"
                color="info"
                // onClick={(e) => handleFileUpload(e, "AdhaarFront")}
                sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "AdhaarFront")}
                />
              </MDButton>
              <MDTypography
                sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
              >
                {kycDetails.OtherDocsFront !== "" ? kycDetails.OtherDocsFront : null}{" "}
                {kycDetails.OtherDocsFront !== "" && (
                  <CancelIcon
                    color="primary"
                    onClick={() => handleDeleteFile("AdhaarFront", kycDetails.OtherDocsFront)}
                  />
                )}
              </MDTypography>
              <Grid>
                {flags.errorFlag && kycDetails.OtherDocsFront === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
                    Please upload the document
                  </MDTypography>
                ) : null}
              </Grid>
            </Grid>

            <Grid
              item
              flexDirection="row"
              display="flex"
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
            >
              <MDTypography sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}>
                Upload Back Side
              </MDTypography>

              <MDButton
                color="info"
                component="label"
                // onClick={(e) => handleFileUpload(e, "AdhaarBack")}
                sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
              >
                Upload
                <input
                  hidden
                  accept="image/bmp, image/jpeg, image/png, .pdf"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "AdhaarBack")}
                />
              </MDButton>
              <MDTypography
                sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
              >
                {kycDetails.OtherDocsBack !== "" ? kycDetails.OtherDocsBack : null}{" "}
                {kycDetails.OtherDocsBack !== "" && (
                  <CancelIcon
                    color="primary"
                    onClick={() => handleDeleteFile("AdhaarBack", kycDetails.OtherDocsBack)}
                  />
                )}
              </MDTypography>
              {flags.errorFlag && kycDetails.OtherDocsBack === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
                  Please upload the document
                </MDTypography>
              ) : null}
            </Grid>
          </Grid>
        ) : null}
        {flags.otherDocSelectedFlag &&
        Object.values(kycDetails.OtherDocs || {}).every((x) => x.mID !== "" || x.mID !== null) &&
        (kycDetails.OtherDocs.mID === "194" ||
          kycDetails.OtherDocs.mID === "196" ||
          kycDetails.OtherDocs.mID === "197" ||
          kycDetails.OtherDocs.mID === "199" ||
          kycDetails.OtherDocs.mID === "200" ||
          kycDetails.OtherDocs.mID === "202" ||
          kycDetails.OtherDocs.mID === "203" ||
          kycDetails.OtherDocs.mID === "204" ||
          kycDetails.OtherDocs.mID === "201" ||
          kycDetails.OtherDocs.mID === "205") ? (
          <Grid item flexDirection="row" display="flex" sx={{ pt: 3 }}>
            <Grid
              item
              flexDirection="row"
              display="flex"
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
            >
              <MDTypography sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}>
                Upload
              </MDTypography>
              <MDButton
                variant="contained"
                component="label"
                color="info"
                // onClick={(e) => handleFileUpload(e, "AdhaarFront")}
                sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "AdhaarFront")}
                />
              </MDButton>
              <MDTypography
                sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
              >
                {kycDetails.OtherDocsFront !== "" ? kycDetails.OtherDocsFront : null}{" "}
                {kycDetails.OtherDocsFront !== "" && (
                  <CancelIcon
                    color="primary"
                    onClick={() => handleDeleteFile("AdhaarFront", kycDetails.OtherDocsFront)}
                  />
                )}
              </MDTypography>
              {flags.errorFlag && kycDetails.OtherDocsFront === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
                  Please upload the documents
                </MDTypography>
              ) : null}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
      <MDBox display="flex" flexDirection="row" sx={{ marginBottom: "165px", marginTop: "30px" }}>
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

export default KYCDetails;
