import React, { useEffect, useState } from "react";
import { Grid, Card, IconButton, Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";
import swal from "sweetalert";
import magmapayment from "assets/images/Magma/magmapayment.png";
import CircularProgress from "@mui/material/CircularProgress";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import {
  SearchClaimDetailsByRegClaimNo,
  UploadFiles,
  DeleteFile,
  getProdPartnermasterData,
  UpdateClaimDetails,
  // SendNotification,
  EventCommunicationExecution,
  GetUserById,
  // GetUsersRoles,
  SaveClaimHistory,
  GetPolicyInfoByPolicyNumber,
  updateStageStatusIdByTno,
} from "../data";
import { setClaimsJson, useDataController } from "../../../../BrokerPortal/context";

// import { HelathJson } from "../data/JsonData";

function ReceiveQuery() {
  const [SearchObj, SetSearchObj] = useState({ ClaimNo: "" });
  const [searchflag, setSearchFlag] = useState(false);
  const [documentflag, setDocumentFlag] = useState(false);
  const [disable, setDisable] = useState(true);
  const [controller] = useDataController();
  const { ClaimsJson, PolicyData } = controller;
  console.log("polichb", PolicyData);
  const [intimation, setIntimation] = useState([]);
  const mes = "Please fill the required field";
  const [flags, setFlags] = useState({
    errorFlag: false,
    claimNoError: false,
    claimNoFlag: false,
  });
  const [upload, setUpload] = useState([]);
  const [uploadFlags, setUploadFlags] = useState(Array(upload.length).fill(false));
  const [disableFlag, setDisableFlag] = useState(false);

  const handleChange = (e) => {
    setDisableFlag(true);
    SearchObj[e.target.name] = e.target.value;
    SetSearchObj((prev) => ({ ...prev, ...SearchObj }));
    setFlags((prev) => ({ ...prev, claimNoFlag: false }));
    const claimNoError = /^[A-Z]{4}\/\d{4}\/\d{2}\/\d{2}\/\d{8}$/;
    if (claimNoError.test(e.target.value)) {
      setFlags((prev) => ({ ...prev, claimNoError: false }));
    } else {
      setFlags((prev) => ({ ...prev, claimNoError: true }));
    }
    setClaimsJson((prev) => ({ ...prev, ClaimsJson }));
    // if (upload.some((file) => file.fileName !== "")) {
  };
  const [claimstatus1, setClaimStatus] = useState([]);
  const [claimdata, setClaimdata] = useState([]);
  const [policydata, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    // debugger;
    if (SearchObj.ClaimNo === "") {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
    }
    const dataByClaimNo = await SearchClaimDetailsByRegClaimNo("", SearchObj.ClaimNo);
    const data = dataByClaimNo.finalResult;
    console.log("result3", data);
    if (data === null) {
      setFlags((prev) => ({ ...prev, claimNoError: true }));
    } else {
      setIntimation((prev) => [{ ...prev, ...data }]);

      const policyDetails = await GetPolicyInfoByPolicyNumber(data.policyNo);
      setPolicyData((prev) => [{ ...prev, ...policyDetails }]);
      console.log("pojfij", policydata);

      const data2 = { ProductId: 1022, MasterType: "ClaimStatus" };
      const dataa = await getProdPartnermasterData(data2.ProductId, data2.MasterType);
      setClaimdata([...dataa.data]);
      if (dataa.status === 200) {
        dataa.data.filter((x) => {
          const abc = parseInt(x.mID, 10);
          if (abc === data.claimStatusId) {
            setClaimStatus(x.mValue);
          }
          return true;
        });
      }

      setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));
      // setpolicyData((prev) => ({ ...prev, ...policyData }));
      if (claimstatus1 !== "Claim under Query") {
        setSearchFlag(false);
        setFlags((prev) => ({ ...prev, claimNoFlag: true }));
      } else {
        setSearchFlag(true);
        setFlags((prev) => ({ ...prev, claimNoFlag: false }));
      }
    }
  };

  useEffect(() => {
    console.log("claimjsonss", ClaimsJson);
  }, [ClaimsJson]);
  useEffect(() => {
    console.log("claimststua", claimdata);
  }, [claimdata]);
  // const update = intimation[0];

  const Medical = localStorage.getItem("roleId");
  useEffect(() => {
    console.log("intimations", intimation);
    const arr1 = [];
    // intimation[0] &&
    //   intimation[0].transactionDataDTO[0] &&
    //   intimation[0].transactionDataDTO[0].transactionDetails &&
    if (
      intimation[0] &&
      intimation[0].transactionDataDTO[0] &&
      intimation[0].transactionDataDTO[0].transactionDetails &&
      intimation[0].transactionDataDTO[0].transactionDetails.queryDetails
    ) {
      intimation[0].transactionDataDTO[0].transactionDetails.queryDetails.forEach(async (x) => {
        if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
          const obj = {
            docId: "",
            docName: x.StatusValue,
            UploadDocDate: "",
            fileName: "",
            UploadedBy: "DEO User",
          };
          arr1.push(obj);
        } else {
          const obj = {
            docId: "",
            docName: x.StatusValue,
            UploadDocDate: "",
            fileName: "",
            UploadedBy: "Medical Adjudicator",
          };
          arr1.push(obj);
        }
        setUpload(arr1);
        console.log("uploaded document", intimation);
      });
    }
  }, [intimation]);

  const userNameId = localStorage.getItem("userId");
  // const UserRoleName = {
  //   UserName: "",
  //   RoleName: "",
  //   Status: "",
  //   Remarks: "",
  // };

  const TemplateStatus = {
    Status: "",
  };
  const Resendstatus = {
    ResendStatus: "No",
  };

  const navigate = useNavigate();
  const handleTrackClaims = () => {
    navigate(`/Claims/Home`, { state: { productCode: "MagmaHospiCash01" } });
  };
  const handleNext = async () => {
    // debugger;
    setLoading(true);
    if (intimation[0].transactionDataDTO[0].transactionDetails.documentDetails !== "") {
      upload.forEach((x) => {
        if (x.fileName !== "") {
          intimation[0].transactionDataDTO[0].transactionDetails.documentDetails.push(x);
          // setIntimation((prev) => [{ ...prev, ...intimation }]);
          setUpload(upload);
          setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));
        }
      });
    }
    let ab = {};
    ab = { ...ab, ...intimation[0] };
    ab.transactionDataDTO[0].transactionDetails.documentDetails.forEach((x) => {
      ab.transactionDataDTO[0].transactionDetails.queryDetails =
        ab.transactionDataDTO[0].transactionDetails.queryDetails.filter(
          (y) => x.docName !== y.StatusValue
        );
      setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));
    });

    if (ab.claimStatusId === 231) {
      // const RoleName = await GetUsersRoles(userNameId);
      // console.log("rolenamee", RoleName);
      // const data1 = [];
      // RoleName.data.forEach((x) => {
      ab.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].RoleName = "DEO User";
      // });
      const userName = await GetUserById(userNameId);
      const userid = `${userName.data.userDetails[0].firstName} ${userName.data.userDetails[0].lastName}`;
      console.log("userids", userid);
      ab.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].UserName = userid;
      // ab.transactionDataDTO[0].transactionDetails.hospitalizationDetails.PatientName;
      // UserRoleName.Status = ab.claimStatus;
      ab.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Status =
        "Query Reply Received";
      ab.transactionDataDTO[0].transactionDetails.CommunicationDetails[0].Remarks =
        ab.transactionDataDTO[0].remark;
      TemplateStatus.Status = "Query Reply Received";
    }
    if (ab.transactionDataDTO[0].transactionDetails.templateDetails !== "") {
      ab.transactionDataDTO[0].transactionDetails.templateDetails.push(TemplateStatus);
      // transactionDataDTO[0].transactionDetails.CommunicationDetails
    }
    if (ab.transactionDataDTO[0].transactionDetails.ResendFlag[0].ResendStatus !== "") {
      ab.transactionDataDTO[0].transactionDetails.ResendFlag.push(Resendstatus);
    }
    setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));

    claimdata.filter((x) => {
      if (intimation[0].claimFields === "Query+Investigation") {
        if (x.mValue === "Referred for Investigation") {
          intimation[0].claimStatusId = x.mID;
          intimation[0].claimStatus = x.mValue;
        }
      } else if (intimation[0].claimFields === "Query") {
        if (x.mValue === "Query Reply Received") {
          intimation[0].claimStatusId = x.mID;
          intimation[0].claimStatus = x.mValue;
        }
      }
      return true;
    });
    const save = await UpdateClaimDetails(intimation[0]);
    console.log("173", save);
    if (save.status === 1) {
      // const data = { TransactionNumber: save.finalResult.transactionDataDTO[0].transactionNumber };
      const data = {
        TransactionNumber: save.finalResult.transactionDataDTO[0].transactionNumber,
        CreatedBy: userNameId,
      };
      await SaveClaimHistory(data);
      const save1 = await updateStageStatusIdByTno(
        save.finalResult.transactionDataDTO[0].transactionNumber,
        save.finalResult.claimStatusId
      );
      console.log("save1", save1);
      const ClaimQuery = {
        communicationId: 228,
        keyType: "Claims",
        key: save.finalResult.claimNumber,
        stakeHolderDetails: [
          {
            communicationType: "Email",
            stakeholderCode: "CUS",
            communicationValue:
              policydata[0].policy_details[0].policyRequest.ProposerDetails.EmailId,
          },
        ],
      };
      await EventCommunicationExecution(ClaimQuery);
      setLoading(false);
      // policydata[0].policy_details[0].policyRequest.ProposerDetails.EmailId
      Swal.fire({
        html: `<img src=${magmapayment} alt="success image" style="display: block; margin: 0 auto;">
        <p style="color: green; font-weight: bold; margin: 10px 0;">
        Query Updated Successfully
        </p>`,
        showConfirmButton: true,
        // cancelButtonColor: "red",
        showCloseButton: true,
        // showCancelButton: true,
        confirmButtonColor: "#d33",
        allowOutsideClick: false,
        width: 600,
        alignItems: "center",
        confirmButtonText: "Go to Home",
      }).then((res1) => {
        if (res1.isConfirmed) {
          handleTrackClaims();
        }
      });
      //
    } else
      swal({
        html: true,
        icon: "error",
        title: "Something went wrong!",
      });
    // });

    // if (res.status === 1) {
    //   Swal.fire({
    //     //   icon: "success",
    //     title: "Query updates successfully",
    //     confirmButtonColor: "#d33",
    //     confirmButtonText: "Go to Home",
    //   })
    // }
    setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));
  };

  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  const [xyz, setXYZ] = useState({
    RawImage: [],
  });

  const [filename, setFilename] = useState();
  console.log("filename", filename);
  const UploadImage = async (file, id) => {
    setFilename(file.name);
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      console.log("result1", result);

      if (result.data[0].fileName !== "") {
        const docId = result.data[0].docid;
        const newUpload = [...upload];
        newUpload[id].docId = docId;
        setUpload(newUpload);
        console.log("upload", upload);

        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result;
          const myArray = base64Image.split(",");
          const data = myArray[1];

          setXYZ({ ...xyz, RawImage: data });
          console.log("imagebinding", xyz);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleProfileChange = (id, e) => {
    setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));
    console.log("upload", upload);
    const file = e.target.files[0];
    // Check if the file type is allowed (JPG or PDF)
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only PDF, DOC, DOCX, PNG, JPG and JPEG files are allowed.",
      });
      return;
    }
    const newUpload = [...upload];
    newUpload[id].fileName = e.target.files[0].name;
    newUpload[id].UploadDocDate = new Date();
    setUpload(newUpload);
    setDocumentFlag(true);
    setDisable(false);
    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });

    UploadImage(e.target.files[0], id);
    const newUploadFlags = [...uploadFlags];
    newUploadFlags[id] = true;
    setUploadFlags(newUploadFlags);
    // setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));
    setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));
  };

  const handleRemoveRow = async (id) => {
    const res = await DeleteFile(upload[id].fileName);
    console.log("123", res);
    if (res.data.status === 5) {
      upload[id].docId = "";
      upload[id].UploadDocDate = "";
      upload[id].fileName = "";
      upload[id].UploadedBy = "";
      // upload[id].fileName = "";
      // upload[id] = "";
      setUpload([...upload]);
      if (upload.some((file) => file.fileName !== "")) {
        setDisable(false);
      } else {
        setDisable(true);
      }
      console.log("delete", upload);
    }
    const newUploadFlags = [...uploadFlags];
    newUploadFlags[id] = false;
    setUploadFlags(newUploadFlags);
  };

  return (
    <Card>
      <div>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}
      </div>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>Receive Query Reply</MDTypography>
        </Grid>
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Claim No"
              name="ClaimNo"
              value={SearchObj.ClaimNo}
              onChange={(e) => handleChange(e)}
              // onBlur={handleClaim}
              inputProps={{ maxLength: 24 }}
              required
              error={flags.errorFlag && SearchObj.ClaimNo === ""}
              helperText={flags.errorFlag && SearchObj.ClaimNo === "" && mes}
            />
            {flags.claimNoError ? (
              <MDTypography
                sx={{
                  color: "red",
                  fontSize: "0.9rem",
                  textAlign: "left",
                }}
              >
                Please enter valid claim number
              </MDTypography>
            ) : null}
            {flags.claimNoFlag === true && claimstatus1 !== "Claim under Query" ? (
              <MDTypography
                sx={{
                  color: "red",
                  fontSize: "0.9rem",
                  textAlign: "left",
                }}
              >
                Provided claim is not under Query
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDButton
              disabled={!disableFlag}
              //   disabled={SearchObj.claimNo === "" ? true : false}
              sx={{ justifyContent: "right" }}
              variant="contained"
              onClick={(e, id) => handleSearch(e, id)}
            >
              SEARCH
            </MDButton>
          </Grid>
        </Grid>

        {searchflag === true ? (
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>Claim Details</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Claim No"
                name="claimNumber"
                value={intimation[0].claimNumber}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="COI No" name="policyNo" value={intimation[0].policyNo} disabled />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="UHID ID"
                name="memberId"
                value={
                  intimation[0] &&
                  intimation[0].claimBasicDetails &&
                  intimation[0].claimBasicDetails.memberDetails &&
                  intimation[0].claimBasicDetails.memberDetails.memberId
                    ? intimation[0].claimBasicDetails.memberDetails.memberId
                    : ""
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Patient Name"
                name="insuredname"
                value={
                  intimation[0] &&
                  intimation[0].claimBasicDetails &&
                  intimation[0].claimBasicDetails.memberDetails &&
                  intimation[0].claimBasicDetails.memberDetails.insuredName
                    ? intimation[0].claimBasicDetails.memberDetails.insuredName
                    : ""
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Claim Status"
                name="claimstatus"
                // value={intimation[0] && intimation[0].claimFields ? intimation[0].claimFields : ""}
                value={claimstatus1}
                // value="ClaimUnderQuery"
                disabled
              />
            </Grid>
            <Grid container p={2}>
              <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5}>
                <MDTypography variant="body1" color="primary">
                  Queries raised
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography variant="body1" color="primary">
                  Upload Documents
                </MDTypography>
              </Grid>
            </Grid>
            {intimation[0] &&
            intimation[0].transactionDataDTO[0] &&
            intimation[0].transactionDataDTO[0].transactionDetails &&
            intimation[0].transactionDataDTO[0].transactionDetails.queryDetails
              ? intimation[0].transactionDataDTO[0].transactionDetails.queryDetails.map((x, id) => (
                  // {queryStatus.map((x, id) => (
                  <>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography>{x.StatusValue}</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <label htmlFor={`file-upload-${id}`}>
                        <input
                          id={`file-upload-${id}`}
                          name={`file-upload-${id}`}
                          accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => handleProfileChange(id, e)}
                          onClick={(e) => {
                            e.target.value = "";
                          }}
                          disabled={uploadFlags[id]}
                        />
                        <MDButton variant="outlined" color="error" component="span">
                          Upload
                        </MDButton>
                      </label>
                    </Grid>
                    <Grid item xs={4} style={{ marginLeft: "-14rem", marginTop: "6px" }}>
                      {documentflag === true ? (
                        <Grid sx={{ fontSize: "14px" }}>
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
                  </>
                ))
              : ""}

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <MDButton
                variant="contained"
                color="error"
                component="span"
                onClick={handleNext}
                disabled={disable}
              >
                Submit
              </MDButton>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Card>
  );
}

export default ReceiveQuery;
