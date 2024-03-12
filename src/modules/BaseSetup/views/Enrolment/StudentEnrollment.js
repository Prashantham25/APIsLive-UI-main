import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Stack } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MDBox from "components/MDBox";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import swal from "sweetalert";
import MDAutocomplete from "../../../../components/MDAutocomplete";
import MDInput from "../../../../components/MDInput";
import {
  getGroupPartnerList,
  getMasterPolicyOnPartnerID,
  getPlanOnMasterPolicy,
  getPlanDetailsOnGroupId,
  Documentuploadaws,
  GetMasterData,
  IsPassport,
  IsAlphaNum,
} from "./data/index";

function StudentEnrollment() {
  const [selectedFile, setSelectedFile] = useState(null);
  const helperText = "This field Required";
  const [partnerData, setPartnerData] = useState([]);
  const [geography, setgeography] = useState([]);
  const [suminsure, setsuminsure] = useState([]);
  const [tripType, settripType] = useState([]);
  const [listofdestination, setListofdestination] = useState([]);
  const [OSFlag, setOSFlag] = useState(false);
  // const [trip, setTrip] = useState("");

  const [Master, setMaster] = useState({
    masterPolNo: [],
    plan: [],
  });

  const [HTextFlag, setHTextFlag] = useState({
    EducationLoanAccNoFlag: false,
    MemberPassportNoFlag: false,
    EducationLoanAccNoText: "",
    MemberPassportNoText: "",
  });

  const [value, setValue] = useState({
    EducationLoanAccNo: "",
    PartnerName: "",
    MasterPolicyNo: "",
    PlanType: "",
    TripType: "",
    Geography: "",
    ProductCode: "GroupTravelV1",
    ListofDestination: "",
    SumInsured: "",
    TripStartDate: "",
    TripEndDate: "",
    NoofDays: "",
    MemberPassportNo: "",
    documentDetails: [
      {
        DocId: "",
        DocName: "",
        DocType: "StudentEnrollDoc",
        DocTypeName: "StudentEnrollDoc",
        UploadDocDate: "",
        contentType: "",
      },
    ],
  });

  useEffect(async () => {
    const partnerlist = await getGroupPartnerList();
    setPartnerData([...partnerlist.data]);
  }, []);

  const onSubmit = async () => {
    if (
      value.EducationLoanAccNo === "" ||
      value.Geography === "" ||
      value.ListofDestination === "" ||
      value.MasterPolicyNo === "" ||
      value.NoofDays === "" ||
      value.PartnerName === "" ||
      value.PlanType === "" ||
      value.ProductCode === "" ||
      value.SumInsured === "" ||
      value.TripEndDate === "" ||
      value.TripStartDate === "" ||
      value.TripType === "" ||
      HTextFlag.EducationLoanAccNoFlag === true ||
      HTextFlag.MemberPassportNoFlag === true
    ) {
      setOSFlag(true);
      swal({
        icon: "Error",
        text: "Some fields are missing or entered invalid data",
      });
    }
  };

  const onMDChange = (e, n) => {
    if (n === "MemberPassportNo") {
      value[n] = e.target.value.toUpperCase();
    } else {
      value[n] = e.target.value;
    }
    setValue({ ...value });
  };
  const onMDBlur = (e, fun, name) => {
    const value1 = e.target.value.toString();
    if (fun(value1) === true) {
      setValue({ ...value, [name]: value1 });
      setHTextFlag({
        ...HTextFlag,
        [name.concat("Text")]: "",
        [name.concat("Flag")]: false,
      });
    } else {
      // setObj({ ...obj, [name]: "" });
      const res = fun(value1);
      console.log("res", res);
      setHTextFlag({
        ...HTextFlag,
        [name.concat("Text")]: res,
        [name.concat("Flag")]: true,
      });
    }
  };

  const onDateChange = async (e, type, date) => {
    if (type === "TripStartDate") {
      value.TripStartDate = date;
      value.TripEndDate = "";
      value.NoofDays = "";
    } else if (type === "TripEndDate") {
      value.TripEndDate = date;
      const d1 = value.TripStartDate.split("-");
      const d2 = date.split("-");
      const date1 = new Date([d1[1], d1[2], d1[0]].join("-"));
      const date2 = new Date([d2[1], d2[2], d2[0]].join("-"));
      const difference = date2.getTime() - date1.getTime();
      const nodays = difference / (1000 * 3600 * 24);
      const days = nodays + 1;

      value.NoofDays = days.toString();
    }
    setValue({ ...value });
  };

  const handleSetAutoComplete = async (e, type, value1) => {
    if (type === "partnerName") {
      value.PartnerName = value1.mValue;
      value.MasterPolicyNo = "";
      const policyonpartnerid = await getMasterPolicyOnPartnerID(value1.mID);
      setMaster({ ...Master, masterPolNo: policyonpartnerid.data });
    }
    if (type === "maspolno") {
      value.MasterPolicyNo = value1.mValue;
      value.PlanType = "";
      const plan1 = await getPlanOnMasterPolicy(value1.mID);
      setMaster({ ...Master, plan: plan1 });
    }
    if (type === "plan") {
      value.PlanType = value1.mValue;
      value.TripType = "";
      const Data = await getPlanDetailsOnGroupId(value1.mID);
      Data.forEach((item) => {
        if (item.mType === "Region") {
          const res = item.mdata.filter((x) => x.mValue === "WWIC" || x.mValue === "WWEU");
          setgeography(res);
        }
        if (item.mType === "Type") {
          const res = item.mdata.filter((x) => x.mValue === "StudentTravel");

          settripType(res);
        }
        if (item.mType === "SI") {
          setsuminsure(item.mdata);
        }
      });
      // if (trip[0].mValue !== "StudentTravel") {
      //   swal({
      //     icon: "error",
      //     text: "Student Travel does not exist for this partner",
      //     buttons: {
      //       buttonTwo: {
      //         text: "OK",
      //         value1: "Confirm",
      //         visible: true,
      //       },
      //     },
      //   }).then((value1) => {
      //     if (value1 === "Confirm") {
      //       window.location.reload();
      //     }
      //   });
      // }
    }
    if (type === "Trip") {
      value.TripType = value1.mValue;
      value.Geography = "";
    }
    if (type === "Region") {
      value.Geography = value1.mValue;
      value.ListofDestination = "";
      if (value.Geography === "WWEU") {
        const geo = await GetMasterData("Worldwide Excluding US/Canada");
        setListofdestination(geo.data[0].mdata);
      }
      if (value.Geography === "WWIC") {
        const geo = await GetMasterData("Worldwide");
        setListofdestination(geo.data[0].mdata);
      }
    }
    if (type === "Geography") {
      value.ListofDestination = value1.mValue;
      value.SumInsured = "";
    }
    if (type === "SI") {
      value.SumInsured = value1.mValue;
    }

    setValue({ ...value });
  };
  const UploadDocument = async (file) => {
    const formData = new FormData();
    formData.append(file.name, file, file.name);
    const uploadres = await Documentuploadaws(formData);
    if (uploadres.status === 1) {
      swal({
        icon: "success",
        text: `Document Uploaded Successfully`,
        confirmButtonColor: "#0079CE",
        allowOutsideClick: false,
      });
    }
    value.documentDetails[0].DocName = uploadres.fileName;
    value.documentDetails[0].DocId = uploadres.docid;
    setSelectedFile(file);
    setValue({ ...value });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    await UploadDocument(file);
  };
  const handleDeleteFile = async () => {
    value.documentDetails[0].DocName = "";
    value.documentDetails[0].DocId = "";
    setValue({ ...value });
    setSelectedFile("");
  };
  return (
    <MDBox p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="body1" color="primary">
            Enrollment
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            required
            label="Education Loan Account No"
            value={value.EducationLoanAccNo}
            onChange={(e) => onMDChange(e, "EducationLoanAccNo")}
            onBlur={(e) => onMDBlur(e, IsAlphaNum, "EducationLoanAccNo")}
            error={HTextFlag.EducationLoanAccNoFlag || (OSFlag && value.EducationLoanAccNo === "")}
            helperText={
              OSFlag && value.EducationLoanAccNo === ""
                ? helperText
                : HTextFlag.EducationLoanAccNoText
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDAutocomplete
            required
            label="Partner Name"
            options={partnerData}
            onChange={(e, value1) => handleSetAutoComplete(e, "partnerName", value1)}
            error={OSFlag && value.PartnerName === ""}
            helperText={OSFlag && value.PartnerName === "" ? helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDAutocomplete
            required
            label="Masterpolicy Number"
            options={Master.masterPolNo}
            onChange={(e, value1) => handleSetAutoComplete(e, "maspolno", value1)}
            error={OSFlag && value.MasterPolicyNo === ""}
            helperText={OSFlag && value.MasterPolicyNo === "" ? helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDAutocomplete
            required
            label="Plan Type"
            options={Master.plan}
            onChange={(e, value1) => handleSetAutoComplete(e, "plan", value1)}
            error={OSFlag && value.PlanType === ""}
            helperText={OSFlag && value.PlanType === "" ? helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDAutocomplete
            required
            label="Trip Type"
            options={tripType}
            onChange={(e, value1) => handleSetAutoComplete(e, "Trip", value1)}
            error={OSFlag && value.TripType === ""}
            helperText={OSFlag && value.TripType === "" ? helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDAutocomplete
            required
            label="Geography"
            options={geography}
            onChange={(e, value1) => handleSetAutoComplete(e, "Region", value1)}
            error={OSFlag && value.Geography === ""}
            helperText={OSFlag && value.Geography === "" ? helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDAutocomplete
            label="Sum Insured"
            required
            options={suminsure}
            onChange={(e, value1) => handleSetAutoComplete(e, "SI", value1)}
            error={OSFlag && value.SumInsured === ""}
            helperText={OSFlag && value.SumInsured === "" ? helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDAutocomplete
            required
            label="List Of Destination"
            options={listofdestination}
            onChange={(e, value1) => handleSetAutoComplete(e, "Geography", value1)}
            error={OSFlag && value.ListofDestination === ""}
            helperText={OSFlag && value.ListofDestination === "" ? helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput readOnly label="Product Code" value={value.ProductCode} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker
            required
            fullWidth
            input={{ label: "Trip Start Date", value: value.TripStartDate }}
            value={value.TripStartDate}
            onChange={(e, date) => onDateChange(e, "TripStartDate", date)}
            options={{
              dateFormat: "Y-m-d",
              altFormat: "d/m/Y",
              altInput: true,
              minDate: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker
            required
            fullWidth
            input={{ label: "Trip End Date", value: value.TripEndDate }}
            value={value.TripEndDate}
            onChange={(e, date) => onDateChange(e, "TripEndDate", date)}
            options={{
              dateFormat: "Y-m-d",
              altFormat: "d/m/Y",
              altInput: true,
              minDate: value.TripStartDate,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            readOnly
            label="No of Days"
            value={value.NoofDays}
            error={OSFlag && value.NoofDays === ""}
            helperText={OSFlag && value.NoofDays === "" ? helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Member Passport Number"
            value={value.MemberPassportNo}
            onChange={(e) => onMDChange(e, "MemberPassportNo")}
            onBlur={(e) => onMDBlur(e, IsPassport, "MemberPassportNo")}
            error={HTextFlag.MemberPassportNoFlag || (OSFlag && value.MemberPassportNo === "")}
            helperText={
              OSFlag && value.MemberPassportNo === "" ? helperText : HTextFlag.MemberPassportNoText
            }
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="body1" color="primary">
            Upload Scan Copy Enrollment
          </MDTypography>
          <Grid container p={2} alignItems="bottom">
            <Stack direction="row" justifyContent="space-around" p={2}>
              <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px dashed grey",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "400px",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary"
                    component="span"
                    align="center"
                    gutterBottom
                  >
                    <CloudDoneOutlinedIcon fontSize="large" />
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {" "}
                    Select a file or drag and drop here{" "}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {" "}
                    All .PDF, .xlxs and .xls file types supported here{" "}
                  </Typography>
                  <Grid container justifyContent="center" p={2} alignItems="bottom">
                    <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      {selectedFile ? (
                        <>
                          <MDTypography
                            sx={{
                              flex: 1,
                              fontSize: "12px",
                              fontWeight: 500,
                              marginRight: "1rem",
                            }}
                          >
                            {value.documentDetails[0].DocName}
                          </MDTypography>
                          <CancelOutlinedIcon
                            variant="outlined"
                            color="secondary"
                            onClick={handleDeleteFile}
                          />
                        </>
                      ) : (
                        <label htmlFor="file-upload">
                          <input
                            type="file"
                            id="file-upload"
                            hidden
                            accept="image/bmp, image/jpeg, image/png, .pdf"
                            onChange={(e) => handleFileUpload(e, "fileName")}
                            style={{ display: "none" }}
                          />
                          <MDButton variant="outlined" component="span">
                            Browse File
                          </MDButton>
                        </label>
                      )}
                    </MDBox>
                    {/* {selectedFile && (
                      <MDBox sx={{ display: "flex" }}>
                        <MDButton variant="contained" color="primary" onClick={jj}>
                          Upload
                        </MDButton>
                      </MDBox>
                    )} */}
                  </Grid>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton sx={{ justifyContent: "right" }} variant="contained" onClick={onSubmit}>
              Submit
            </MDButton>
          </Stack>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default StudentEnrollment;
