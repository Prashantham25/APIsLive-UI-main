import DownloadIcon from "@mui/icons-material/Download";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CancelIcon from "@mui/icons-material/Cancel";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { IconButton, Stack } from "@mui/material";
import Swal from "sweetalert2";
import MDTypography from "../../../../../../../components/MDTypography";
import MDBox from "../../../../../../../components/MDBox";
import { DocumentUpload, DeleteDocument, GetDocumentById } from "../../data/Apis";

const TakafulDocuments = ({ dto, setDto, masters, setMasters }) => {
  const lMasters = masters;
  const lDto = dto;
  const UploadDocument = async (e, doctype) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file, file.name);
    const res = await DocumentUpload(dto.transactionDataDTO[0].transactionNumber, formData);
    if (res.status === 200) {
      const DocResobj = {
        DocFileType: doctype,
        DocName: res.data.dMSDTOs[0].fileName,
        DocId: res.data.dMSDTOs[0].docId,
        FileName: file.name,
        DocType: res.data.dMSDTOs[0].contentType,
        UserId: localStorage.getItem("userId"),
        UserName: localStorage.getItem("userName"),
        UploadedDate: res.data.dMSDTOs[0].uploadDate,
      };
      lDto.transactionDataDTO[0].transactionDetails.Documents = [
        ...lDto.transactionDataDTO[0].transactionDetails.Documents,
        DocResobj,
      ];
      setDto({ ...lDto });
    } else {
      Swal.fire({
        icon: "error",
        title: "Upload failed !",
        text: `please reupload the file.`,
      });
    }
  };
  const handleDocumentUpload = (e, doctype) => {
    console.log("the document event ", e);
    console.log("the document to be uploaded under the DocFileType ", doctype);
    const file = e.target.files[0];
    let allowedTypes = [];
    let msg = "";
    // if (type === "Parts") {
    //   allowedTypes = [
    //     "application/vnd.ms-excel", // Excel 97-2003
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel 2007 and later
    //     "text/csv", // CSV
    //   ];
    //   msg = ".csv, .xls and .xlsx";
    // } else {
    allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "application/pdf",
      // "application/vnd.ms-excel", // Excel 97-2003
      // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel 2007 and later
      // "text/csv", // CSV
    ];
    msg = "PDF, DOC, DOCX, PNG, JPG and JPEG";
    // }
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: `Only ${msg} files are allowed.`,
      });
    } else {
      UploadDocument(e, doctype);
    }
  };
  const handleDeleteFile = async (DocName, doctype) => {
    const docDeleteRes = await DeleteDocument(DocName);
    if (docDeleteRes.status === 200) {
      lDto.transactionDataDTO[0].transactionDetails.Documents =
        dto.transactionDataDTO[0].transactionDetails.Documents.filter(
          (x) => !(x.DocName === DocName && x.DocFileType === doctype)
        );
      setDto({ ...lDto });
    } else {
      Swal.fire({
        icon: "error",
        title: "File deletion failed !",
        text: `Please retry to delete the file .`,
      });
    }
  };

  const handleDownloadFile = async (doc) => {
    // debugger;
    const fileData = await GetDocumentById(doc.DocName);
    if (fileData.status === 200) {
      const src = `data:${doc.DocType};base64,${fileData.data.data}`;
      const link = document.createElement("a");
      link.href = src;
      link.download = doc.FileName;
      link.click();
    } else {
      Swal.fire({
        icon: "error",
        title: "Download failed !",
        text: `Please retry to download the file .`,
      });
    }
  };

  const handleFiles = (doctype, DocumentType) => {
    const list = [];
    const docList = dto.transactionDataDTO[0].transactionDetails.Documents.filter(
      (x) => x.DocFileType === doctype
    );
    if (docList.length > 0) {
      list.push({
        type: "Custom",
        visible: masters.DocTabId === DocumentType,
        spacing: 6,
        return: (
          <MDBox>
            <Stack
              direction="row"
              // alignItems="center"
              spacing={1}
            >
              {docList.map((doc) => (
                <>
                  <MDTypography
                    type="button"
                    style={{
                      textDecoration: "underline",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDownloadFile(doc)}
                    variant="subtitle2"
                    color="primary"
                  >
                    {doc.FileName}
                  </MDTypography>
                  {masters.isUploadEnabled && (
                    <IconButton onClick={() => handleDeleteFile(doc.DocName, doctype)}>
                      <CancelIcon variant="outlined" fontSize="small" />
                    </IconButton>
                  )}
                </>
              ))}
            </Stack>
          </MDBox>
        ),
      });
    } else {
      list.push({
        type: "Typography",
        label: "No file Chosen",
        visible: masters.DocTabId === DocumentType,
        spacing: 6,
        variant: "subtitle2",
        //   variant: "body2",
      });
    }
    return list;
  };
  const handleDocuments = (DocumentType) => {
    const arr = [];
    masters.ReqDocumentsList.filter((doc) => doc.DocumentType === DocumentType).forEach((x) => {
      arr.push(
        {
          type: "Typography",
          label: x.DocumentName,
          visible: masters.DocTabId === DocumentType,
          spacing: 4,
          variant: "subtitle2",
          //   variant: "body2",
        },
        {
          type: "Typography",
          label: "",
          visible: !masters.isUploadEnabled && masters.DocTabId === DocumentType,
          spacing: 2,
          variant: "subtitle2",
          //   variant: "body2",
        },
        {
          type: "Button",
          label: "Upload",
          spacing: 2,
          variant: "outlined",
          disabled: false,
          startIcon: <ArrowUpwardIcon />,
          justifyContent: "start",
          visible: masters.isUploadEnabled && masters.DocTabId === DocumentType,
          component: "label",
          typeFormat: (
            <input
              hidden
              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
              type="file"
              id="fileInput"
              onChange={(e) => handleDocumentUpload(e, x.DocumentName)}
              onClick={(e) => {
                e.target.value = "";
              }}
            />
          ),
        },
        ...handleFiles(x.DocumentName, DocumentType)
      );
    });
    return arr;
  };

  const docdata = [
    {
      type: "Tabs",
      value: masters.DocTabId,
      visible: true,
      color: "secondary",
      spacing: 9,
      customOnChange: (e, newValue) => setMasters({ ...lMasters, DocTabId: newValue }),
      tabs: [
        {
          value: "Claim Document",
          label: "Upload Claim Documents",
        },
        {
          value: "Survey Documents",
          label: "Upload Survey Documents",
        },
        {
          value: "RFI",
          label: "Request for Information",
          disabled: !masters.isUploadEnabled,
          // visible: !masters.isUploadEnabled,
        },
      ],
    },
    {
      type: "Button",
      label: "Download All",
      spacing: 3,
      variant: "contained",
      endIcon: <DownloadIcon />,
      justifyContent: "end",
      // disabled:!masters.isUploadEnabled,
      visible: masters.DocTabId === "Claim Document" || masters.DocTabId === "Survey Documents",
      //   onClick: handleCreateNewNote,
    },

    {
      type: "Typography",
      label: "",
      visible: true,
      spacing: 12,
    },
    ...handleDocuments(masters.DocTabId),
    {
      type: "Typography",
      label: "Claim Documents",
      visible: masters.DocTabId === "RFI",
    },
    {
      type: "RadioGroup",
      visible: masters.DocTabId === "RFI",
      // disabled: true,
      radioLabel: {
        label: "All Documents Recieved",
        labelVisible: true,
      },
      radioList: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked`,
      // value: masters.TypeOfUpload,
      spacing: 12,
      // required: true,
    },
    {
      type: "Checkbox",
      visible: masters.DocTabId === "RFI",
      label: "All Claim Document",
      checkedVal: true,
      uncheckedVal: false,
      spacing: 4,
      // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
      // customOnChange: (e) => OnDirectFromShowRoom(e),
      disabled: true,
    },
    {
      type: "Checkbox",
      visible: masters.DocTabId === "RFI",
      label: "Resident ID",
      checkedVal: true,
      uncheckedVal: false,
      spacing: 4,
      // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
      // customOnChange: (e) => OnDirectFromShowRoom(e),
      disabled: true,
    },
    {
      type: "Checkbox",
      visible: masters.DocTabId === "RFI",
      label: "Driving License",
      checkedVal: true,
      uncheckedVal: false,
      spacing: 4,
      // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
      // customOnChange: (e) => OnDirectFromShowRoom(e),
      disabled: true,
    },
    {
      type: "Checkbox",
      visible: masters.DocTabId === "RFI",
      label: "Claim Form",
      checkedVal: true,
      uncheckedVal: false,
      spacing: 4,
      // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
      // customOnChange: (e) => OnDirectFromShowRoom(e),
      disabled: true,
    },
    {
      type: "Checkbox",
      visible: masters.DocTabId === "RFI",
      label: "ROP Report",
      checkedVal: true,
      uncheckedVal: false,
      spacing: 4,
      // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
      // customOnChange: (e) => OnDirectFromShowRoom(e),
      disabled: true,
    },
    {
      type: "Typography",
      label: "",
      visible: masters.DocTabId === "RFI",
      // disabled: true,
      // required: true,
      spacing: 4,
    },
    {
      type: "Checkbox",
      visible: masters.DocTabId === "RFI",
      label: "Other",
      checkedVal: true,
      uncheckedVal: false,
      spacing: 2,
      // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
      // customOnChange: (e) => OnDirectFromShowRoom(e),
      // disabled: true,
    },
    {
      type: "Input",
      visible: masters.DocTabId === "RFI",
      label: "Name of the Document",
      // spacing: 4,
      // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
      // customOnChange: (e) => OnDirectFromShowRoom(e),
      // disabled: true,
    },
    {
      type: "Typography",
      label: "Survey Documents",
      spacing: 12,
      visible: masters.DocTabId === "RFI",
    },
    {
      type: "RadioGroup",
      visible: masters.DocTabId === "RFI",
      // disabled: true,
      radioLabel: {
        label: "All Documents Recieved",
        labelVisible: true,
      },
      radioList: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked`,
      // value: masters.TypeOfUpload,
      spacing: 12,
      // required: true,
    },
    {
      type: "Button",
      label: "Save & Send Communication",
      spacing: 12,
      variant: "contained",
      // startIcon: <DeleteIcon />,
      justifyContent: "end",
      visible: masters.DocTabId === "RFI",
      // onClick: UploadDocument,
    },
  ];
  return docdata;
};
export default TakafulDocuments;
