import { Grid, IconButton } from "@mui/material";
import swal2 from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";
import MDButton from "../../../../../../../../components/MDButton";
// import MDTypography from "../../../../../../../../components/MDTypography";
import {
  SearchClaimDetailsByRegClaimNo,
  UploadFiles,

  // UpdateClaimDetails,
  // SaveClaimHistory,
} from "../../../../../HealthClaims/data";

const getTopLevelContent = () => [
  { label: "ClaimNumber", path: "claimNumber", visible: true },
  { visible: true, label: "Policy Number", path: "policyNo" },
  { visible: true, label: "Doc/Endorsement Number", path: "a" },
  { visible: true, label: "Claimant", path: "b" },
  { visible: true, label: "Surveyor ", path: "c" },
  { visible: true, label: "Total Payable to Client", path: "d" },
  { visible: true, label: "Total Survey Fee", path: "e" },
  { visible: true, label: "Net Payable", path: "f" },
  { visible: true, label: "Salvage Recovery", path: "g" },
  { visible: true, label: "Status", path: "h" },
];

const getMenus = () => [
  { label: "Discharge Voucher", icon: "", visible: true },
  { label: "Account Information", icon: "", visible: true },
  //   { label: "Payment Information", icon: "", visible: true },
];

const getAccordions = ({ menuIndex }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [
        { label: "Discharge Voucher", visible: true },
        { label: "", visible: true },
      ];
      break;
    case 1:
      data = [
        { label: "Account Information", visible: true },
        { label: "", visible: true },
      ];
      break;
    // case 2:
    //   data = [{ label: "", visible: true }];
    //   break;

    default:
      data = [];
      break;
  }

  return data;
};

const getControls = ({ menuIndex, masters, dto, setDto }) => {
  const dtoL = dto;

  console.log("dto", dtoL);
  const UploadImage = async (file) => {
    // debugger;
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      dtoL.transactionDataDTO[0].transactionDetails.DischargeVoucher.Documents.docId =
        result.data[0].docid;
      setDto({ ...dtoL });
      //   setUpload(upload);
    });
  };

  const handleFileUpload = (e) => {
    // debugger;
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      swal2.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPG and PDF files are allowed.",
      });
      return;
    }
    const newuploads = dtoL.transactionDataDTO[0].transactionDetails.DischargeVoucher.Documents;
    newuploads.fileName = e.target.files[0].name;
    newuploads.uploadDateTime = new Date();
    UploadImage(e.target.files[0]);
    setDto({ ...dtoL });
  };

  const handleDeleteupload = () => {
    dtoL.transactionDataDTO[0].transactionDetails.DischargeVoucher.Documents.fileName = "";
    dtoL.transactionDataDTO[0].transactionDetails.DischargeVoucher.Documents.docId = "";
    dtoL.transactionDataDTO[0].transactionDetails.DischargeVoucher.Documents.UploadDocDate = "";
    setDto({ ...dtoL });
  };

  let data = [];
  console.log("masters", masters);
  switch (menuIndex) {
    case 0:
      data = [
        [
          {
            type: "MDDatePicker",
            label: "DV Change Date",
            visible: true,
            path: "i",
            // path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.DVChangeDate"
          },
          {
            type: "AutoComplete",
            label: "DV Type",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.DVType",
            visible: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "DV Change Date",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.DVChangeDate",
            visible: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Remarks",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.Remark",
            visible: true,
          },
          {
            type: "Input",
            label: "Last Updated By",
            path: "j",
            visible: true,
          },
          {
            type: "Input",
            label: "Prepared By",
            path: "k",
            visible: true,
          },
          {
            type: "AutoComplete",
            label: "DV Status",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.DVStatus",
            visible: true,
            // spacing: 4,
          },
          {
            type: "MDDatePicker",
            label: "Date",
            path: "l",
            visible: true,
            // spacing: 4,
          },
          {
            type: "Button",
            label: "Create DV for Processed Member",
            visible: true,
            spacing: 4,
          },

          //   { type: "Button", label: "Save", visible: true, spacing: 3 },
        ],
        [
          { type: "Typography", visible: true },
          {
            type: "Button",
            label: "Save",
            visible: true,
            component: "label",
            justifyContent: "right",
            spacing: 12,
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "Checkbox",
            required: true,
            label: "Received DV from customer",
            spacing: 12,
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.DVfromCustomer",
            checkedVal: true,
            visible: true,
          },
          {
            type: "Input",
            label: "Pay To",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.PayTo",
            visible: true,
          },
          {
            type: "Input",
            label: "Address of the claimant",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.ClaimantAddress",
            visible: true,
          },
          {
            type: "Input",
            label: "Upload Reference document",
            visible: true,
          },
          {
            type: "Button",
            label: "Search",
            // spacing: 12,
            visible: true,
          },
          {
            type: "Input",
            label: "KYC Number",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.KYCNumber",
            visible: true,
          },
          {
            type: "Input",
            label: "A/c Address",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.AccAddress",
            visible: true,
          },
          {
            type: "Input",
            label: "A/c Name (Nepali)",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.AccNameNepali",
            visible: true,
          },
          {
            type: "Input",
            label: "PAN Number",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.PANNUmber",
            visible: true,
          },
          {
            type: "Input",
            label: "Mobile Number",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.MobileNumber",
            visible: true,
          },
          {
            type: "Input",
            label: "Contact Number",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.ContactNumber",
            visible: true,
          },
          {
            type: "Input",
            label: "Citizenship Number",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.CitizenshipNumber",
            visible: true,
          },
          {
            type: "Input",
            required: true,
            label: "Amount",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.Amount",
            visible: true,
          },
          {
            type: "Input",
            required: true,
            label: "Account Number",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.AccNumber",
            visible: true,
          },
          {
            type: "Input",
            required: true,
            label: "Account Holder Name",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.AccHolderName",
            visible: true,
          },
          {
            type: "Input",
            required: true,
            label: "Bank Name",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.BankName",
            visible: true,
          },
          {
            type: "Input",
            required: true,
            label: "Branch Name",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.BranchName",
            visible: true,
          },
          {
            type: "Input",
            required: true,
            label: "Remarks",
            spacing: 8,
            visible: true,
          },
          {
            type: "Button",
            required: true,
            label: "Add",
            visible: true,
            component: "label",
            justifyContent: "right",
            spacing: 10,
          },
          {
            type: "Button",
            required: true,
            label: "Cancel",
            component: "label",
            justifyContent: "right",
            visible: true,
            spacing: 2,
          },
        ],
        [
          {
            type: "DataGrid",
            spacing: 12,
            columns: [
              { field: "SlNo", headerName: "Sl No", width: 100 },
              { field: "PayTo", headerName: "Pay To", width: 150 },
              { field: "Amount", headerName: "Amount", width: 150 },
              { field: "Remarks", headerName: "Remarks", width: 150 },
              { field: "AccountNumber", headerName: "Account Number", width: 150 },
              { field: "AccountHolderName", headerName: "Account Holder Name", width: 230 },
              { field: "BankName", headerName: "Bank Name", width: 150 },
              { field: "BranchName", headerName: "Branch Name", width: 150 },
              { field: "BankCode", headerName: "Bank Code", width: 150 },
              { field: "BranchCode", headerName: "Branch Code", width: 150 },
              { field: "BranchName", headerName: "Branch Name", width: 150 },
              { field: "BranchName", headerName: "Branch Name", width: 150 },
              { field: "BranchName", headerName: "Branch Name", width: 150 },
            ],
            rows: [],

            rowId: "SlNo",

            visible: true,
          },
          {
            type: "Checkbox",
            // required: true,
            label: "Letter of Subrogration",
            checkedVal: true,
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.SubrogrationLetter",
            visible: true,
            spacing: 4,
          },
          {
            type: "Checkbox",
            // required: true,
            label: "DV in Nepali",
            checkedVal: true,
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.NepalDV",
            visible: true,
            spacing: 4,
          },
          {
            type: "Input",
            required: true,
            label: "Total",
            visible: true,
            spacing: 4,
          },
          {
            type: "Input",
            required: true,
            label: "Document Name",
            path: "transactionDataDTO.0.transactionDetails.DischargeVoucher.Documents.docName",
            visible: true,
            spacing: 3,
          },
          {
            type: "Custom",
            label: "Upload",
            visible: true,
            spacing: 9,
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5}>
                  <label htmlFor="file-upload">
                    <input
                      id="file-upload"
                      name="file-upload"
                      accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileUpload(e)}
                    />
                    <MDButton variant="outlined" component="span">
                      Upload
                    </MDButton>
                  </label>
                </Grid>
                {dtoL.transactionDataDTO[0].transactionDetails.DischargeVoucher.Documents
                  .fileName !== "" && (
                  <>
                    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                      {/* <MDTypography sx={{ fontSize: "15px" }}> */}
                      {
                        dtoL.transactionDataDTO[0].transactionDetails.DischargeVoucher.Documents
                          .fileName
                      }
                      {/* </MDTypography> */}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={1}
                      lg={1}
                      xl={1}
                      xxl={1}
                      style={{ marginTop: "-8px" }}
                    >
                      <IconButton onClick={handleDeleteupload}>
                        <CancelIcon fontSize="large" color="error" />
                      </IconButton>
                    </Grid>
                  </>
                )}
              </Grid>
            ),
          },
          {
            type: "Input",
            required: true,
            label: "Document List",
            visible: true,
            // spacing: 3,
          },
          {
            type: "Button",
            required: true,
            label: "Add Signatory",
            // spacing: 3,
            visible: true,
          },
          {
            type: "Button",
            required: true,
            label: "Save Details",
            // spacing: 4,
            visible: true,
          },
        ],
      ];
      break;
    // case 2:
    //   data = [

    //   ];
    //   break;

    default:
      data = [];
      break;
  }

  return data;
};

const getPolicyDto = async ({ genericInfo }) => {
  const res = await SearchClaimDetailsByRegClaimNo("", genericInfo.claimNo);
  console.log("res", res.finalResult);
  return res.finalResult;
};

const getMasters = () => ({
  gender: [{ mValue: "male" }, { mValue: "female" }],
});

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
