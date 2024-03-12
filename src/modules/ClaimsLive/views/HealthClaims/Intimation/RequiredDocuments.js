import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Autocomplete,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import swal from "sweetalert";
import Swal from "sweetalert2";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import MDButton from "components/MDButton";
import MDDatePicker from "components/MDDatePicker";
import { useNavigate } from "react-router-dom";
import {
  getProdPartnermasterDatas,
  UploadFiles,
  getInvoiceData, // OCR
  SaveClaimDetails, // BY Clicking on Submit
} from "../data/index";
import { HelathJson } from "../data/JsonData";

function RenderControl({ item, claimDetails, setClaimDetails }) {
  const onInputChange = (e) => {
    const claimData = claimDetails;
    switch (item.path) {
      case "memberDetails":
        claimData.claimBasicDetails.memberDetails[e.target.name] = e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      case "transactionDetails":
        claimData.transactionDataDTO[0].transactionDetails[e.target.name] = e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      case "hospitalDetails":
        claimData.transactionDataDTO[0].transactionDetails.hospitalDetails[e.target.name] =
          e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      case "hospitalizationDetails":
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[e.target.name] =
          e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      case "paymentObj":
        claimData.transactionDataDTO[0].transactionDetails.paymentObj[e.target.name] =
          e.target.value;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      default:
        claimData[e.target.name] = e.target.value;
        break;
    }
  };
  const onDateTimeChange = (e) => {
    const claimData = claimDetails;
    const today = new Date(e[0].toDateString()).toLocaleDateString();
    let [mm, dd, yyyy] = today.split("/");
    if (mm <= 9) {
      mm = `0${mm}`;
    }
    if (dd <= 9) {
      dd = `0${dd}`;
    }
    yyyy = `${yyyy}`;
    const ab = `${yyyy}-${mm}-${dd}`;
    switch (item.path) {
      case "hospitalizationDetails":
        claimData.transactionDataDTO[0].transactionDetails.hospitalizationDetails[item.name] = ab;
        setClaimDetails((prev) => ({ ...prev, ...claimData }));
        break;
      default:
        break;
    }
  };

  const handleAutoComplete = (e, value) => {
    const claimData = claimDetails;
    switch (item.path) {
      case "benefitDetails":
        // claimData.transactionDataDTO[0].transactionDetails.benefitDetails[item.name] = value.mID;
        claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = value;
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                label={item.label}
                name={item.name}
                value={item.value}
                disabled={item.disable}
                onChange={(e) => onInputChange(e)}
              />
            );
          case "DateTime":
            return (
              <MDDatePicker
                input={{ label: item.label }}
                name={item.name}
                value={item.value}
                options={{ altFormat: "d-m-Y", altInput: true }}
                onChange={(e) => onDateTimeChange(e)}
              />
            );
          case "AutoComplete":
            return (
              <Autocomplete
                options={item.option}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleAutoComplete(e, value)}
                renderInput={(params) => <MDInput {...params} label={item.label} />}
              />
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}
function RequiredDocuments() {
  const navigate = useNavigate();
  const [otherUpload, setOtherUpload] = useState([]);
  const [nextproceed, setNextProceed] = useState(false);
  const [claimDetails, setClaimDetails] = useState(HelathJson);
  const [documents, setDocuments] = useState([]);
  const [documentflag, setDocumentFlag] = useState(false);
  const [filename, setFilename] = useState();
  const [otherflag, setOtherFlag] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [proceed, setProceed] = useState(false);
  console.log("filename", filename);
  const [upload, setUpload] = useState([]);
  const [pol, setPol] = useState();

  // const [isFileUploaded, setIsFileUploaded] = useState(false);

  useEffect(() => {
    const policy = localStorage.getItem("policyNO");
    setPol(policy);
    console.log("policy", policy);
  }, []);
  const [uploadD, setUploadD] = useState([]);

  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  // const [policyDetails, setPolicyDetails] = useState({});

  const [xyz, setXYZ] = useState({
    // auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJVc2VySWQiOiI1Y2M0ZTFjZi04MzYxLTQwY2QtODVjMC1hMjE3YThiZGEwYTYiLCJFbWFpbCI6Im1vaGFuQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJpTnViZSBBZG1pbiIsIk5hbWUiOiJJbnViZSIsIlVzZXJOYW1lIjoiZWludWJlYWRtaW4iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMjk3IiwiZXhwIjoxNjk4NTc5OTE3LCJpc3MiOiJJbnViZSIsImF1ZCI6IkludWJlTUlDQSJ9AzswX6psbQq7MisICydYlZYVgYwrN2zhg86HjiHwsW4",
    RawImage: [],
    // DocumentName: "",
  });

  const [showSwalMessage, setShowSwalMessage] = useState(true);
  console.log("adddocument", otherUpload);
  console.log("uploadD", uploadD);
  const autocomplete = [];
  const handleProceed = async () => {
    const hasEmptyFileName = uploadD.some((file) => file.fileName === "");
    const ocrData = await getInvoiceData(xyz.RawImage);
    console.log("ocrData", ocrData);

    if (hasEmptyFileName && showSwalMessage) {
      swal({
        icon: "warning",
        text: "Please Upload the Document",
      });
      setShowSwalMessage(false); // Reset showSwalMessage to false after showing the warning swal message
    } else if (documentflag) {
      setShowSwalMessage(true); // Set showSwalMessage to true when scanning begins
      Swal.fire({
        html: `<div style={{display:"flex"}}/><br>
          <div><p>We are currently scanning your docs to find the important stuff.</p><br/>
          <p style="text-align:center;">Please wait for a while as this may take some time</p></div>
          </div>`,
      });
      setNextProceed(true);
    } else {
      setNextProceed(false);
    }
  };

  const handleAutoComplete = async () => {
    const dataa = await getProdPartnermasterDatas(1022, "Document Type", 51);

    if (dataa.status === 200) {
      const arr1 = [];
      const arrr1 = [];
      dataa.data.forEach((x) => {
        const obj = {
          docId: "",
          docName: x.mValue,
          UploadDocDate: "",
          fileName: "",
          // base64: "",
        };
        const obj2 = { docId: x.mID, fileName: "", base64: "" };
        arr1.push(obj);
        arrr1.push(obj2);
        // claimDetails.transactionDataDTO[0].transactionDetails.documentDetails.push(obj);
      });

      setUpload(arr1);
      setUploadD(arrr1);
      setDocuments([]);
      setDocuments([...dataa.data]);
      setProceed(true);
      // claimDetails.transactionDataDTO[0].transactionDetails.documentDetails = dataa.data;
    }
    console.log("data", dataa);
    console.log("documentType", documents);
  };
  const handleAddDocument = () => {
    // setOtherDocFlag(true);
    // const newID = addRows.length;
    // setAddRows([...addRows, { id: newID }]);
    // const otherUpload = [];
    const obj1 = {
      docId: "",
      docName: "",
      UploadDocDate: "",
      fileName: "",
    };
    otherUpload.push(obj1);
    setOtherUpload([...otherUpload]);
    setOtherFlag(true);
    // setAddDoc((prevState) => prevState + 1);
    // setShowCancel(true);
    console.log("otherdoc", otherUpload);
  };
  const handleAddother = (e, id) => {
    if (e.target.name === "other") {
      otherUpload[id].docName = e.target.value;
    }
    setOtherUpload([...otherUpload]);
  };
  const handleOtherRemove = (id) => {
    if (otherUpload[id].fileName !== "") {
      // otherUpload[id] = "";
      otherUpload[id].fileName = "";
      otherUpload[id].UploadDocDate = "";
      setOtherUpload([...otherUpload]);
      setShowSwalMessage(true);
    }
  };
  const handleRemoveRow = (id) => {
    // debugger;

    upload[id].docId = "";
    // upload[id].base64 = "";
    upload[id].UploadDocDate = "";
    upload[id].fileName = "";
    uploadD[id].base64 = "";
    upload[id].fileName = "";
    setUploadD([...uploadD]);
    setUpload([...upload]);
    setShowSwalMessage(true);
    // setAddDoc(updatedAddDoc);
    // setUpload(updatedUpload);
  };

  const UploadImage = async (file, id) => {
    setFilename(file.name);
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (otherflag === true) {
        if (result.data[0].fileName !== "") {
          const docId = result.data[0].docid;
          const newUploads = [...otherUpload];
          newUploads[id].docId = docId;
          setOtherUpload(newUploads);
        }
      } else {
        console.log("result", result);
        if (result.data[0].fileName !== "") {
          const docId = result.data[0].docid;
          const newUpload = [...upload];
          newUpload[id].docId = docId;
          setUpload(newUpload);

          const reader = new FileReader();
          reader.onload = () => {
            const base64Image = reader.result;
            const myArray = base64Image.split(",");
            const data = myArray[1];

            const base64 = data;
            const newUploadD = [...uploadD];
            newUploadD[id].base64 = base64;
            setUploadD(newUploadD);

            setXYZ({ ...xyz, RawImage: data });
            console.log("imagebinding", xyz);
          };
          reader.readAsDataURL(file);
        }
      }
    });
  };

  const handleOtherFileUpload = (id, e) => {
    const file = e.target.files[0];

    // Check if the file type is allowed (JPG or PDF)
    const allowedTypes = ["image/jpeg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPG and PDF files are allowed.",
      });
      return;
    }
    const newuploads = [...otherUpload];
    newuploads[id].fileName = e.target.files[0].name;
    newuploads[id].UploadDocDate = new Date();
    setOtherUpload(newuploads);
    UploadImage(e.target.files[0], id);
  };
  const handleProfileChange = (id, e) => {
    const file = e.target.files[0];

    // Check if the file type is allowed (JPG or PDF)
    const allowedTypes = ["image/jpeg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPG and PDF files are allowed.",
      });
      return;
    }
    const newUpload = [...upload];
    newUpload[id].fileName = e.target.files[0].name;
    newUpload[id].UploadDocDate = new Date();
    setUpload(newUpload);

    const newUploadD = [...uploadD];
    newUploadD[id].fileName = e.target.files[0].name;

    setUploadD(newUploadD);

    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });
    setDocumentFlag(true);
    UploadImage(e.target.files[0], id);
  };

  const handleCheckBox = (e) => {
    setAgreement(e.target.checked);
  };
  const handleTrackClaims = (ClaimNumber) => {
    // navigate("/Claims/TrackClaims", { state: ClaimNumber });
    navigate("/Claims/TrackClaims", {
      state: { claimNumber: ClaimNumber, policyNumber: pol },
    });
  };
  const onClaimSave = async () => {
    // debugger;
    claimDetails.claimNumber = Number(new Date()).toString();
    setClaimDetails((prev) => ({ ...prev, ...claimDetails }));
    const result = await SaveClaimDetails(claimDetails);
    if (result.status === 200) {
      // setStepForword(stepForward + 1);
      Swal.fire({
        icon: "success",
        title: "Claim is Submitted Successful",
        // text: `Your Claim Number is ${result.data.finalResult.claimNumber}`,
        html: `
          <div>
            <p>Your Claim Number is ${result.data.finalResult.claimNumber}.</p><br/>
            <p style="font-size: 12px;">keep your claim number handy for future reference.</p>
          </div>
        `,
        confirmButtonColor: "#d33",
        confirmButtonText: "Track Claims",
      }).then((res) => {
        if (res.isConfirmed) {
          handleTrackClaims(claimDetails.claimNumber);
        }
      });
    }
  };
  const ocrReadItems = [
    {
      type: "DateTime",
      label: "Date Of Admission",
      visible: true,
      name: "doa",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
      path: "hospitalizationDetails",
    },
    {
      type: "DateTime",
      label: "Date Of Discharge",
      visible: true,
      name: "dod",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod,
      path: "hospitalizationDetails",
    },
    {
      type: "Input",
      label: "Diagnosis",
      visible: true,
      name: "diagnosis",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.diagnosis,
      path: "hospitalizationDetails",
    },
    {
      type: "Input",
      label: "Length of Stay",
      visible: true,
      name: "lengthOfStay",
      value:
        claimDetails.transactionDataDTO[0].transactionDetails.hospitalizationDetails.lengthOfStay,
      path: "hospitalizationDetails",
    },
    {
      type: "Input",
      label: "Hospital Name",
      visible: true,
      name: "hospitalName",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
      path: "hospitalDetails",
    },
    {
      type: "Input",
      label: "Hospital Address",
      visible: true,
      name: "hospitalAddress",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress,
      path: "hospitalDetails",
    },
    {
      type: "Input",
      label: "Hospital City",
      visible: true,
      name: "hospitalCity",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
      path: "hospitalDetails",
    },
    {
      type: "Input",
      label: "Hospital State",
      visible: true,
      name: "hospitalState",
      value: claimDetails.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
      path: "hospitalDetails",
    },
    {
      type: "Input",
      label: "Payee Name",
      visible: true,
      name: "payeeName",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.payeeName,
      path: "paymentObj",
    },
    {
      type: "Input",
      label: "Bank Name",
      visible: true,
      name: "bankName",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.bankName,
      path: "paymentObj",
    },
    {
      type: "Input",
      label: "Account No",
      visible: true,
      name: "accountNo",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.accountNo,
      path: "paymentObj",
    },
    {
      type: "Input",
      label: "IFSC Code",
      visible: true,
      name: "ifscCode",
      value: claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.ifscCode,
      path: "paymentObj",
    },
  ];
  return (
    <Card>
      <Grid container p={2} justifyContent="center">
        <MDTypography variant="body1" color="primary">
          Updates Required Documents
        </MDTypography>
      </Grid>

      <Grid container spacing={4} p={2} justifyContent="center">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="UHID"
            name="UHID"
            onChange={handleAutoComplete}
            // value={otpBind.UHID}
            // onChange={(e) => handleChange(e, "otpBind")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Member Name"
            name="MemberName"
            // value={otpBind.MemberName}
            // onChange={(e) => handleChange(e, "otpBind")}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Estimated Claim Amount"
            name="Etimated"
            // value={otpBind.intimation}
            // onChange={(e) => handleChange(e, "otpBind")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            name="Benefit Type"
            variant="outlined"
            options={autocomplete}
            renderInput={(op) => <MDInput {...op} label="Benefit Type" />}
            required
          />
        </Grid>
        <Grid container spacing={2} p={2}>
          <MDTypography variant="body1" color="primary" sx={{ ml: "2rem" }}>
            Upload Document
          </MDTypography>
          <MDTypography variant="body1" color="primary" sx={{ ml: "10rem" }}>
            Browse Files
          </MDTypography>
        </Grid>
        <Grid container spacing={2}>
          {/* <Grid item xs={6} sm={12} md={4} lg={4} xl={4} xxl={4} key={x.mID}> */}
          {documents.map((x, id) => (
            <React.Fragment key={x.mID}>
              <Grid item xs={4} ml={4}>
                <MDInput
                  sx={{ marginTop: "8px" }}
                  // key={x.mID}
                  value={x.mValue}
                  label="Document Type"
                />
              </Grid>
              <Grid item xs={4} marginTop="6px">
                <label htmlFor={`file-upload-${id}`}>
                  <input
                    id={`file-upload-${id}`}
                    name={`file-upload-${id}`}
                    accept="image/jpeg, application/pdf"
                    // value={item.fileupload}
                    // key={x.mID}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleProfileChange(id, e)}
                    // onChange={handleFileSelect}
                  />
                  <MDButton variant="outlined" color="error" component="span">
                    Upload
                  </MDButton>
                </label>
              </Grid>
              <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                {documentflag === true ? (
                  <Grid sx={{ fontSize: "14px" }}>
                    {/* <p> {upload[id]}</p>
                          {upload.map((xx) => (
                            <p> {xx.docName}</p>
                          ))} */}
                    {upload[id] && <p>{upload[id].fileName}</p>}
                  </Grid>
                ) : null}
              </Grid>
              {upload[id] && upload[id].fileName && (
                <Grid item xs sx={{ ml: "2rem" }}>
                  <IconButton onClick={(e) => handleRemoveRow(id, e)}>
                    <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                  </IconButton>
                </Grid>
              )}
            </React.Fragment>
          ))}

          {otherUpload.map((x, id) => (
            <React.Fragment key={x}>
              <Grid item xs={4} ml={4}>
                <MDInput
                  label="Add Other Documnet"
                  name="other"
                  value={x.docName}
                  onChange={(e) => handleAddother(e, id, "other")}
                  // value={validateOtpData.otp}
                  // onChange={(e) => handleChange(e, "otp")}
                />
              </Grid>
              {/* ))} */}
              <Grid item xs={4} marginTop="6px">
                <label htmlFor={`otherfile-upload-${id}`}>
                  <input
                    id={`otherfile-upload-${id}`}
                    name={`otherfile-upload-${id}`}
                    accept="image/jpeg, application/pdf"
                    // value={item.fileupload}
                    // key={x.mID}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleOtherFileUpload(id, e)}
                    // onChange={handleFileSelect}
                  />
                  <MDButton variant="outlined" color="error" component="span">
                    Upload
                  </MDButton>
                </label>
              </Grid>
              <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                <Grid sx={{ fontSize: "14px" }}>
                  <p> {otherUpload[id] && otherUpload[id].fileName}</p>
                </Grid>
              </Grid>
              {otherUpload[id] && otherUpload[id].fileName && (
                <Grid item xs={2} sx={{ ml: "1rem" }}>
                  <IconButton onClick={(e) => handleOtherRemove(id, e)}>
                    <CancelIcon fontSize="large" color="error" sx={{ mt: "-0.5rem" }} />
                  </IconButton>
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>

        <Grid spacing={2} p={2}>
          <MDButton
            variant="outlined"
            color="error"
            startIcon={<AddIcon />}
            onClick={handleAddDocument}
          >
            Add Document
          </MDButton>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" mb={3}>
        <MDButton disabled={!proceed} onClick={handleProceed}>
          Proceed
        </MDButton>
      </Grid>
      {nextproceed && (
        <>
          <Grid container spacing={2} p={2}>
            {ocrReadItems.map((item) =>
              item.visible ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl
                    item={item}
                    claimDetails={claimDetails}
                    // policyDetails={policyDetails}
                    setClaimDetails={setClaimDetails}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
          <Grid container>
            <FormControl sx={{ marginLeft: "20px" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={agreement} onChange={handleCheckBox} name="agreement" />
                }
                label="I've Checked the information provided above."
              />
            </FormControl>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" p={2}>
            <MDButton
              disabled={!agreement}
              color="primary"
              onClick={() => onClaimSave()}
              sx={{ ml: "2rem" }}
            >
              SUBMIT
            </MDButton>
          </Grid>
        </>
      )}
    </Card>
  );
}
export default RequiredDocuments;
