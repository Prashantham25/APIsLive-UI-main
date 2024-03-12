import { Grid, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import Swal from "sweetalert2";

import MDInput from "../../../../../../../components/MDInput";
import CustomDropDown from "../../../../../../../components/CustomDropDown";
import {
  GetProdPartnerMasterData,
  GetDocumentById,
  DeleteDocument,
  DocumentUpload,
  GetPayLoadByQueryDynamic,
  GetProposalByNumber,
  UpdateProposalDetails,
  LICEdms,
} from "../../NewBusiness/data";
import DocumentUploadCard from "../../NewBusiness/data/DocumentUploadCard";
import MDButton from "../../../../../../../components/MDButton";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import MDLoader from "../../../../../../../components/MDLoader";

const getFileName = (file) => file.name.split(".").pop().toLowerCase();
const checkForValue = (value) => value === "" || value === undefined || value === null;

const getDocumentMonthYear = (label) => {
  let lb = label;
  if (lb.replace(" ", "").includes("Current year")) {
    const v1 = lb.split("Current year");
    const v2 = v1[0];
    const v3 = parseInt(lb[lb.length - 1], 10);

    const v4 = new Date().getMonth() > 3; // next financial year;
    const v5 = new Date().getFullYear();

    if (v4 === true) lb = `${v2} (${v5 - v3 + 1}-${v5 - v3 + 2})`;
    else lb = `${v2} (${v5 - v3}-${v5 - v3 + 1})`;
  }
  if (lb.replace(" ", "").includes("current month")) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const v1 = lb.split("current month");
    const v2 = v1[0];
    const v3 = parseInt(lb[lb.length - 1], 10);
    const v4 = new Date().getMonth();

    if (v4 - v3 >= 0) lb = `${v2} (${months[v4 - v3]})`;
    else {
      lb = `${v2} (${months[12 + v4 - v3]})`;
    }
  }

  return lb;
};
const getFileSize = (file) => {
  // const k = 1000;
  // const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  // const i = Math.floor(Math.log(file.size) / Math.log(k));
  // const KBSize = parseFloat((file.size / k ** i).toFixed(2));
  console.log("file.size / 1024", file.size / 1024);
  return file.size / 1024;
};
const DownloadFile = (content, fileName) => {
  console.log("content", content);
  const src = `data:application/pdf;base64,${content}`;
  const link = document.createElement("a");
  link.href = src;
  link.download = fileName;
  console.log("FilenameQuote", link.download);

  link.click();
};

export default function CustomerDocumentUpload() {
  const [loader, setLoader] = useState(false);

  const [dto, setDto] = useState({
    AccessID: "",
    CoreProposalNo: "",
    OpportunityId: "",
    PolicyID: "",
    ProposalNo: "",
    TrackAppMobileNo: "",
    selectedDocuments: [],
    Name: "",
    Relation: "",
  });
  const [policyJson, setPolicyJson] = useState({});

  const [masters, setMasters] = useState({
    documentsList: [],
    applicationList: [],
    members: [],
  });

  const onSelectAccess = (e, a) => {
    if (a !== null) {
      setDto({ ...dto, ...a });
      GetProposalByNumber(a.ProposalNo).then((res) => {
        if (res[0]?.policyDetails) {
          setPolicyJson(res[0]?.policyDetails);
          let isProposerLifeAssured = false;
          const arr = [];
          res[0].policyDetails.InsurableItem[0].RiskItems.forEach((x) => {
            if (x.Relation === "Self") isProposerLifeAssured = true;
          });
          if (isProposerLifeAssured === false) {
            arr.push({
              Name: res[0].policyDetails.ProposerDetails.Name,
              Relation: res[0].policyDetails.ProposerDetails.Relation,
            });
          }
          res[0].policyDetails.InsurableItem[0].RiskItems.forEach((x) => {
            arr.push({ Name: x.Name, Relation: x.Relation });
          });
          masters.members = arr;
          setMasters({ ...masters });
        }
      });
    }
  };

  const setMember = (e, a) => {
    if (a !== null) {
      setDto({ ...dto, ...a });
    }
  };

  useEffect(async () => {
    // const tAPno = sessionStorage.getItem("TrackAppMobileNo");
    // GetPayLoadByQueryDynamic

    await GetPayLoadByQueryDynamic({
      reportname: "AccessIDList",
      paramList: [
        {
          parameterName: "MobileNo",
          parameterValue: sessionStorage.getItem("TrackAppMobileNo"),
        },
        {
          parameterName: "ChannelType",
          parameterValue: "D2C",
        },
      ],
    }).then((res) => {
      if (res?.finalResult.length !== 0) {
        masters.applicationList = res.finalResult;
        setMasters({ ...masters });
      }
    });

    GetProdPartnerMasterData("Documents", {}).then((res) => {
      masters.documentsList = res;
      setMasters({ ...masters });
    });
  }, []);

  const onSelectDocument = (e) => {
    dto.selectedDocuments = e;
    setDto({ ...dto });
  };

  const generateFile = async (e, fileName, fileExtension) => {
    setLoader(true);
    // setAnchorEl(e.currentTarget);
    await GetDocumentById(fileName).then((res) => {
      setLoader(false);

      if (fileExtension.toLowerCase() === "pdf") {
        DownloadFile(res.data, "Document");
      } else {
        // const src = `data:application/img;base64,${res.data}`;
        // setImg(src);
      }
    });
  };
  const handleDocFileDelete = async (docInd) => {
    setLoader(true);
    const fileId = dto.selectedDocuments[docInd].fileId.toString();
    dto.selectedDocuments[docInd] = {
      ...dto.selectedDocuments[docInd],
      fileName: "",
      UploadDocDate: "",
      fileUploadStatus: false,
      fileId: "",
      fileExtension: "",
    };
    await DeleteDocument(fileId).then(() => {
      setLoader(false);
    });
    setDto({ ...dto });
  };

  const handleFileUpload = async (event, docInd) => {
    const file = event.target.files[0];
    if (getFileName(file) !== "pdf") {
      Swal.fire({ icon: "info", text: "File type should be PDF" });
    } else if (getFileSize(file) > 500) {
      Swal.fire({ icon: "info", text: "File size should be less then 500KB" });
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append(file.name, file, file.name);
      await DocumentUpload(formData).then((result) => {
        setLoader(false);
        if (result.dMSDTOs[0].fileName !== null) {
          const DocObj = {
            ...dto.selectedDocuments[docInd],
            fileName: file.name,
            UploadDocDate: new Date().toLocaleDateString(),
            fileUploadStatus: true,
            fileId: result.dMSDTOs[0].fileName,
            fileExtension: file.name.split(".").pop().toLowerCase(),
          };

          dto.selectedDocuments[docInd] = DocObj;
          setDto({ ...dto });
          Swal.fire({
            icon: "success",
            text: "Document uploaded successfully",
          });
        }
      });
    }
  };

  const onSubmit = () => {
    let uploadFlag = false;
    dto.selectedDocuments.forEach((x) => {
      if (checkForValue(x.fileId)) uploadFlag = true;
    });

    if (dto.AccessID === "" || dto.Name === "")
      Swal.fire({ icon: "error", text: "Please select Access ID and Member" });
    else if (dto.selectedDocuments.length === 0)
      Swal.fire({ icon: "error", text: "Please select at least one document and upload" });
    else if (uploadFlag) Swal.fire({ icon: "error", text: "Please upload documents" });
    else {
      if (dto.Relation === "Self") {
        policyJson.ProposerDetails.DocumentDetails = [
          ...policyJson.ProposerDetails.DocumentDetails,
          ...dto.selectedDocuments,
        ];
      }

      policyJson.InsurableItem[0].RiskItems.forEach((x, i) => {
        if (x.Name === dto.Name) {
          policyJson.InsurableItem[0].RiskItems[i].DocumentDetails = [
            ...policyJson.InsurableItem[0].RiskItems[i].DocumentDetails,
            ...dto.selectedDocuments,
          ];
        }
      });

      UpdateProposalDetails(policyJson).then(() => {
        Swal.fire({ icon: "success", text: "Application Updated Successfully" }); // res.responseMessage
        LICEdms(dto.OpportunityId, JSON.stringify(dto.selectedDocuments.map((x) => x.fileId)));
        setDto({ ...dto, AccessID: "", Name: "", selectedDocuments: [] });
      });
    }
  };

  return (
    <MDBox p={3}>
      <MDLoader loader={loader} />
      <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus }} p={1}>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              options={masters.applicationList}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              getOptionLabel={(option) => option.AccessID}
              value={{ AccessID: dto.AccessID }}
              onChange={onSelectAccess}
              renderInput={(params) => <MDInput {...params} label="Select AccessID" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              options={masters.members}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              getOptionLabel={(option) => option.Name}
              value={{ Name: dto.Name }}
              onChange={setMember}
              renderInput={(params) => <MDInput {...params} label="Select Member" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <CustomDropDown
              label="Select Documents"
              options={masters.documentsList}
              optionLabel="DocumentName"
              optionId="mID"
              value={dto.selectedDocuments}
              all="false"
              onChange={onSelectDocument}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
          {dto.selectedDocuments.map((x, i) => (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <DocumentUploadCard
                details={x}
                index={i}
                getDocumentMonthYear={getDocumentMonthYear}
                handleFileUpload={(e) => handleFileUpload(e, i)}
                handleDocFileDelete={() => handleDocFileDelete(i)}
                generateFile={generateFile}
              />
            </Grid>
          ))}
        </Grid>
        <MDBox sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <MDButton onClick={onSubmit}>Submit</MDButton>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
