import { useState, useRef } from "react";
import { Grid, Typography, Stack, Card, Input } from "@mui/material";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import * as XLSX from "xlsx";
import swal from "sweetalert2";
import { read, utils } from "xlsx";
import { postRequest } from "core/clients/axiosclient";
import { IsNumeric, IsAlphaNum, IsAlpha, IsAlphaSpace, IsEmail } from "Common/Validations";
import { policyDto } from "./data/Json";
import PaymentPage from "../../Payment";
import {
  getPlanbyProductId,
  GetAssignProduct,
  getMasterPolicyData,
  GetBenefits,
  getProdPartnerMasterDataGender,
} from "./data/index";
import { arrayRange } from "../../../../../../Common/Validations";

const getPolicyDto = () => {
  console.log(".");
  return policyDto();
};

const getProcessSteps = ({ dto }) => {
  if (dto.TypeOfCOI === "Bulk Upload") {
    const steps = ["Plan Details", "Premium Details", "Payment Details"];
    return steps;
  }
  const steps = [
    "Plan Details",
    "Member Details",
    "Installment Details",
    "Premium Details",
    "Payment Details",
  ];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto, masters }) => {
  const spreadBranchDetails = () => {
    const arr = [];
    dto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push({ name: `Insured Member ${i + 1}`, visible: true });
    });
    return arr;
  };
  let steps = [];
  let lActiveStep = activeStep;

  if (dto.TypeOfCOI === "Bulk Upload") {
    if (lActiveStep === 1) lActiveStep = 3;
    if (lActiveStep === 2) lActiveStep = 4;
  }

  switch (lActiveStep) {
    case 0:
      steps = [
        { name: "", visible: true },
        {
          name: "Master Policy Details",
          visible: masters.Plans.length > 0,
        },
      ];
      break;

    case 1:
      steps = [
        { name: "", visible: true },
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        { name: "Additional Details", visible: true },
        { name: "Special Condition", visible: true },
      ];
      break;
    case 2:
      steps = [{ name: "", visible: true }];
      break;
    case 3:
      steps = [{ name: "", visible: true }];
      break;
    case 4:
      steps = [{ name: "", visible: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters }) => {
  const lDto = dto;
  const lMasters = masters;
  let lActiveStep = activeStep;
  if (dto.TypeOfCOI === "Bulk Upload") {
    if (lActiveStep === 1) lActiveStep = 3;
    if (lActiveStep === 2) lActiveStep = 4;
  }
  const PolicyDtoNew = {
    Name: "",
    DateofBirth: "",
    FamilyID: "",
    Age: "",
    Gender: "",
    DOJ: "",
    DOC: "",
    CoverageEndDate: "",
    ElliteStatus: "",
    Location: "",
    Grade: "",
    Designation: "",
    EmailID: "",
    NoOfLives: "",
    Remarks: "",
    PassportNo: "",
    PreExistingDisease: "",
    Nationality: "",
    SumInsured: "",
    HeightMember: "",
    WeightMember: "",
    MobileNumber: "",
    RelationShipToProposer: "",
    NomineeDetails: [
      {
        NomineeName: "",
        NomineeDOB: "",
        NomineeRelationWithProposer: "",
        PercentageOfShare: "",
        GuardianName: "",
        GuardianDOB: "",
        RelationshoipWithGuardian: "",
        RelationWithInsured: "",
        NomineeAddressLine1: "",
        NomineeAddressLine2: "",
        NomineeAddressLine3: "",
        NomineeMobile: "",
        NomineeEmailID: "",
        AppointeeName: "",
        NomineeCity: "",
        NomineeState: "",
        NomineePincode: "",
      },
    ],
    AdditionalDetails: {
      PremiumEmployerContribution: "",
      PremiumEmployeeContriution: "",
      COINumberIssuedByCustomer: "",
      LoanEMIAmount: "",
      SpecialTerms: "",
      PersonalAccidentSumInsured: "",
    },

    SpecialCondition: [
      {
        SpecialCondition: "",
        SpecialConditionvalue: "",
      },
      {
        SpecialCondition02: "",
        SpecialCondition02value: "",
      },
      {
        SpecialCondition03: "",
        SpecialCondition03value: "",
      },
      {
        SpecialCondition04: "",
        SpecialCondition04value: "",
      },
      {
        SpecialCondition05: "",
        SpecialCondition05value: "",
      },
    ],

    Questionaire: [
      {
        QId: "",
        Question: "",
      },
      {
        QId: "",
        Question: "",
        Answer: "",
      },
    ],
  };

  const handleSearchMP = async () => {
    if (dto.PartnerDetails.masterPolicyNo === masters.masterPolicyData[0].mValue) {
      await getPlanbyProductId().then((res) => {
        lMasters.Plans = res;
      });

      await getProdPartnerMasterDataGender().then((res) => {
        lMasters.Gender = res;
      });
      await GetAssignProduct().then((resAssign) => {
        lDto.PartnerDetails.accountNo = resAssign[0].policyNo;
        lDto.PolicyStartDate = resAssign[0].policyStartDate;
        lDto.PolicyEndDate = resAssign[0].policyEndDate;
      });
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onPlanSelect = async (e, v) => {
    lDto.Plan = v.mValue;
    const obj1 = {
      productCode: "MagmaHospiCash01",
      planType: v.mValue,
      filterCriteria: [
        {
          SI: "",
          Type: "",
          Region: "",
          currency: "INR",
        },
      ],
      isFilterMemberWise: false,
      setBenefitMemberWise: false,
      insurableItems: null,
    };
    const res1 = await GetBenefits(obj1);
    const res2 = [...res1.finalResult.benefits];
    res2.forEach((x, i) => {
      res2[i].rowID = i + 1;
    });

    lMasters.BenifitList = res2;

    res2.forEach((x) => {
      if (x.CoverName === "EMI Benefit") {
        lMasters.EMIBenefitFlag = true;
      }
    });

    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const downloadExcelTemplate = () => {
    try {
      const headers = ["masterpolicy number", "master policy name"];
      const data = [];
      const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "BulkTemplate.xlsx");
      // console.log("Excel downloaded successfully!");
    } catch (error) {
      console.error("Error downloading Excel:", error);
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const displayFile = (file) => {
    setSelectedFile(file);
  };
  const handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    displayFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    displayFile(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const handledownloadclick = (event) => {
    if (event.type === "click") {
      event.preventDefault();
      if (!selectedFile) {
        downloadExcelTemplate();
      }
    }
  };

  const UploadDocument = async () => {
    const fileReader = await new FileReader();
    // const file = files.target.files[0];
    // console.log("fileReader", file);
    fileReader.onload = (e) => {
      // flag.backdropflag = true;
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let data = [];
      data = utils.sheet_to_json(ws);
      console.log("data", data);
    };
    console.log("filename", selectedFile);
    const formData = new FormData();
    formData.append("Files", selectedFile);
    formData.append("TemplateId", "211");
    await postRequest(`ExcelUpload/Upload`, formData).then(async (res) => {
      console.log("1234567", res);
      if (res.data.status === 1) {
        swal.fire({
          icon: "success",
          html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%">
            <tr><td style={{textAlign:"left"}}><strong>Data Uploaded Successfully </strong></td></tr>
            </table></div>`,
        });
      } else {
        swal.fire({
          icon: "error",
          html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%">
          <tr><td style={{textAlign:"left"}}><strong>File Uploading Failed </strong></td></tr>
          </table></div>`,
        });
      }
    });
  };

  const handleFileUpload = async (event) => {
    console.log("files", event.target.files[0]);
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const onAddMember = () => {
    lDto.InsurableItem[0].RiskItems.push({ ...PolicyDtoNew });
    lDto.CountOfLives = lDto.InsurableItem[0].RiskItems.length;
    setDto({ ...lDto });
  };
  const RemoveBranchDetails = (i) => {
    const arr = dto.InsurableItem[0].RiskItems.filter((x, i1) => i1 !== i);
    lDto.InsurableItem[0].RiskItems = arr;
    lDto.CountOfLives = lDto.InsurableItem[0].RiskItems.length;
    setDto({ ...lDto });
  };

  const spreadBranchDetails = () => {
    const arr = [];
    dto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push([
        {
          type: "Button",
          label: "Delete",
          spacing: 12,
          visible: i !== 0,
          onClick: () => RemoveBranchDetails(i),
        },
        {
          type: "Input",
          label: "Member ID",
          Path: `InsurableItem.0.RiskItems.${i}.FamilyID`,
          required: true,
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          required: true,
          label: "Member Name",
          path: `InsurableItem.0.RiskItems.${i}.Name`,
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "Input",
          required: true,
          label: "Member Name",
          path: `InsurableItem.0.RiskItems.${i}.Name`,
          // InputProps: { readOnly: true },
          visible: false,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Birth",
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: `InsurableItem.0.RiskItems.${i}.DOB`,
          // customOnChange: (e, d) => onDOBselect(e, d, 0),
          visible: true,
        },
        {
          type: "Input",
          label: "Age",
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.Age`,
          InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Gender",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.Gender`,
          options: masters.Gender,
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Relationship",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.RelationShipToProposer`,
          // options: masters.Relationship,
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Joining",
          visible: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: `InsurableItem.0.RiskItems.${i}.DOJ`,
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Commencement",
          visible: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: `InsurableItem.0.RiskItems.${i}.DOC`,
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Coverage End Date",
          visible: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: `InsurableItem.0.RiskItems.${i}.CovergeEndDate`,
        },
        {
          type: "Input",
          label: "Ellite Status",
          path: `InsurableItem.0.RiskItems.${i}.ElliteStatus`,
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlpha],
        },
        {
          type: "Input",
          label: "Location",
          path: `InsurableItem.0.RiskItems.${i}.Location`,
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "Grade",
          path: `InsurableItem.0.RiskItems.${i}.Grade`,
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "Designation",
          path: `InsurableItem.0.RiskItems.${i}.Designation`,
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "MObile No",
          path: `InsurableItem.0.RiskItems.${i}.MobileNumber`,
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          required: true,
          label: "Email ID",
          path: `InsurableItem.0.RiskItems.${i}.EmailID`,
          // InputProps: { readOnly: true },
          visible: true,
          onBlurFuncs: [IsEmail],
        },
        {
          type: "Input",
          required: true,
          label: "No Of Lives",
          path: `InsurableItem.0.RiskItems.${i}.NoOfLives`,
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Remarks",
          path: `InsurableItem.0.RiskItems.${i}.Remarks`,
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
          spacing: 6,
        },
        {
          type: "Typography",
          label: "Questionaire",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "Typography",
          label: "Section A",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: {
            label: "1. Hypertention History",
            labelVisible: true,
          },
          spacing: 12,
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.0.Answer`,
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: {
            label: "2. Diabetes Mellitus History",
            labelVisible: true,
          },
          spacing: 12,
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.1.Answer`,
        },
        {
          type: "Typography",
          label: "Nominee Details",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "Input",
          label: "Nominee Name",
          path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeName`,
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "AutoComplete",
          label: "Nominee Relationship",
          required: true,
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeRelationWithProposer`,
          // options: masters.Relationship,
        },
        {
          type: "MDDatePicker",
          label: "Nominee DOB",
          visible: true,
          // altFormat: "Y-m-d",
          // dateFormat: "Y-m-d",
          path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeDOB`,
        },
      ]);
    });
    return arr;
  };

  const onAddMember1 = (e) => {
    const arr1 = [masters.memberAcc[0]];
    const arr3 = [masters.memberCom[0]];
    const arr2 = arrayRange(1, parseInt(e.target.value, 10) - 1, 1);
    arr2.forEach((x, i) => {
      arr1.push({
        name: `Insured Member ${i + 2}`,
        visible: true,
      });
      arr3.push([
        {
          type: "Input",
          label: "Member ID",
          Path: "InsurableItem.0.RiskItems.0.FamilyID",
          required: true,
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          required: true,
          label: "Member Name",
          path: "InsurableItem.0.RiskItems.0.Name",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "Input",
          required: true,
          label: "Member Name",
          path: "InsurableItem.0.RiskItems.0.Name",
          // InputProps: { readOnly: true },
          visible: false,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Birth",
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.DOB",
          // customOnChange: (e, d) => onDOBselect(e, d, 0),
          visible: true,
        },
        {
          type: "Input",
          label: "Age",
          required: true,
          path: "InsurableItem.0.RiskItems.0.Age",
          InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Gender",
          visible: true,
          path: "InsurableItem.0.RiskItems.0.Gender",
          options: masters.Gender,
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Relationship",
          visible: true,
          path: "InsurableItem.0.RiskItems.0.RelationShipToProposer",
          // options: masters.Relationship,
        },

        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Joining",
          visible: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.DOJ",
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Commencement",
          visible: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.DOC",
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Coverage End Date",
          visible: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.CovergeEndDate",
        },
        {
          type: "Input",
          label: "Ellite Status",
          path: "InsurableItem.0.RiskItems.0.ElliteStatus",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlpha],
        },
        {
          type: "Input",
          label: "Location",
          path: "InsurableItem.0.RiskItems.0.Location",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "Grade",
          path: "InsurableItem.0.RiskItems.0.Grade",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "Designation",
          path: "InsurableItem.0.RiskItems.0.Designation",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "MObile No",
          path: "InsurableItem.0.RiskItems.0.MobileNumber",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          required: true,
          label: "Email ID",
          path: "InsurableItem.0.RiskItems.0.EmailID",
          // InputProps: { readOnly: true },
          visible: true,
          onBlurFuncs: [IsEmail],
        },
        {
          type: "Input",
          required: true,
          label: "No Of Lives",
          path: "InsurableItem.0.RiskItems.0.NoOfLives",
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Remarks",
          path: "InsurableItem.0.RiskItems.0.Remarks",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
          spacing: 6,
        },
        {
          type: "Typography",
          label: "Questionaire",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "Typography",
          label: "Section A",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "RadioGroup",

          visible: true,
          radioLabel: {
            label: "1. Hypertention History",
            labelVisible: true,
          },
          spacing: 12,
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: "InsurableItem.0.RiskItems.0.Questionaire.0.Answer",
        },
        {
          type: "RadioGroup",

          visible: true,
          radioLabel: {
            label: "2. Diabetes Mellitus History",
            labelVisible: true,
          },
          spacing: 12,
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: "InsurableItem.0.RiskItems.0.Questionaire.1.Answer",
        },
        {
          type: "Typography",
          label: "Nominee Details",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "Input",
          label: "Nominee Name",
          path: "InsurableItem.0.RiskItems.0.NomineeDetails.0.NomineeName",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "AutoComplete",
          label: "Nominee Relationship",
          required: true,
          visible: true,
          path: "InsurableItem.0.RiskItems.0.NomineeDetails.0.NomineeRelationWithProposer",
          // options: masters.Relationship,
        },
        {
          type: "MDDatePicker",
          label: "Nominee DOB",
          visible: true,
          // altFormat: "Y-m-d",
          // dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.NomineeDetails.0.NomineeDOB",
        },
      ]);
    });
    lMasters.memberAcc = arr1;
    lMasters.memberCom = arr3;
    lDto.CountOfLives = e.target.value;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  let data = [];
  switch (lActiveStep) {
    case 0:
      data = [
        [
          {
            type: "Input",
            required: true,
            label: "Master Policy",
            path: "PartnerDetails.masterPolicyNo",
            visible: true,
            onChangeFuncs: ["IsNumeric"],
          },
          {
            type: "Input",
            required: true,
            label: "Master Policy Holder Name",
            path: "PartnerDetails.partnerName",
            visible: true,
            onChangeFuncs: ["IsAlphaSpace"],
          },
          {
            type: "Button",
            label: "Search MP",
            visible: true,
            spacing: 4,
            variant: "contained",
            align: "right",
            onClick: handleSearchMP,
          },
        ],
        [
          {
            type: "MDDatePicker",
            required: true,
            label: "Proposal Date",
            altFormat: "d-m-Y",
            dateFormat: "Y-m-d",
            visible: true,
            path: "ProposalDate",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            altFormat: "d-m-Y",
            dateFormat: "Y-m-d",
            path: "PolicyStartDate",
          },

          {
            type: "MDTimePicker",
            required: true,
            label: "Policy Start Time",
            visible: true,
            path: "PolicyStartTime",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            altFormat: "d-m-Y",
            dateFormat: "Y-m-d",
            visible: true,
            path: "PolicyEndDate",
          },
          {
            type: "MDTimePicker",
            required: true,
            label: "Policy End Time",
            visible: true,
            path: "PolicyEndTime",
          },
          {
            type: "RadioGroup",
            required: true,
            visible: true,
            radioLabel: {
              label: "Please select the type of COI",
              labelVisible: true,
            },
            radioList: [
              { label: "Bulk Upload", value: "Bulk Upload" },
              { label: "Individual", value: "Individual" },
            ],
            path: `TypeOfCOI`,
            spacing: 12,
          },
          {
            type: "Custom",
            visible: dto.TypeOfCOI === "Bulk Upload",
            spacing: 12,
            return: (
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "auto",
                  p: 2,
                  border: "1px dashed grey",
                }}
              >
                <Stack spacing={2} justifyContent="center">
                  <Typography
                    variant="h5"
                    color="error"
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

                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    // onChange={handleFileSelect}
                  >
                    {" "}
                    All .csv, .xlxs and .xls file types supported here{" "}
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
                            {selectedFile.name}
                          </MDTypography>

                          <ClearIcon
                            variant="outlined"
                            color="secondary"
                            onClick={handleClearFile}
                          />
                        </>
                      ) : (
                        <label htmlFor="file-upload">
                          <input
                            type="file"
                            id="file-upload"
                            hidden
                            accept="xls, .xlsx, .csv"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onChange={(e) => handleFileUpload(e, "fileName")}
                            style={{ display: "none" }}
                          />

                          <Input
                            type="file"
                            id="file-input"
                            inputRef={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: "none" }}
                          />
                          <MDButton
                            variant="contained"
                            color="secondary"
                            component="label"
                            type="file"
                            id="fileInput"
                            htmlFor="file-input"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            // onClick={handleBrowse}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                            }}
                          >
                            Browse
                          </MDButton>
                        </label>
                      )}
                    </MDBox>
                  </Grid>
                  {!selectedFile && (
                    <MDButton variant="text" color="error" onClick={handledownloadclick}>
                      Download Template
                    </MDButton>
                  )}
                  {selectedFile && (
                    <MDBox sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                      <MDButton
                        variant="contained"
                        color="success"
                        type="file"
                        id="fileInput"
                        onClick={UploadDocument}
                      >
                        Submit
                      </MDButton>
                    </MDBox>
                  )}
                </Stack>
              </MDBox>
            ),
          },

          {
            type: "AutoComplete",
            label: "Select Plan",
            visible: dto.TypeOfCOI === "Individual",
            path: "Plan",
            options: masters.Plans,
            customOnChange: onPlanSelect,
            required: true,
          },
          {
            type: "Input",
            label: "Count of Lives(Inc Main Member)",
            path: "CountOfLives",
            visible: dto.TypeOfCOI === "Individual",
            disableOnReset: true,
            onChangeFuncs: ["IsNumeric"],
            customOnChange: (e) => onAddMember1(e),
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: dto.TypeOfCOI === "Individual",
            columns: [
              {
                field: "CoverName",
                headerName: "Cover Name",
                width: 400,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "BenefitSI",
                headerName: "Sum Insured",
                width: 400,
                headerAlign: "center",
                align: "center",
              },
            ],
            rowId: "rowID",
            value: masters.BenifitList,
          },
        ],

        [],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "Input",
            label: "Count of Lives(Inc Main Member)",
            path: "CountOfLives",
            InputProps: { readOnly: true },
            visible: true,
            disableOnReset: true,
          },
          {
            type: "Button",
            label: "Add Member",
            visible: true,
            variant: "contained",
            component: "label",
            spacing: 12,
            onClick: onAddMember,
          },
        ],
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        [
          {
            type: "Input",
            label: "Pemium Employer Contribution",
            path: "InsurableItem.0.RiskItems.0.AdditionalDetails.PremiumEmployerContribution",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Pemium Employee Contribution",
            path: "InsurableItem.0.RiskItems.0.AdditionalDetails.PremiumEmployeeContriution",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "COI Number Issued By Customer",
            path: "InsurableItem.0.RiskItems.0.AdditionalDetails.COINumberIssuedByCustomer",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsNumeric],
          },

          {
            type: "Input",
            label: "Loan EMI Amount",
            path: "InsurableItem.0.RiskItems.0.AdditionalDetails.LoanEMIAmount",
            required: true,
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Special Terms",
            path: "InsurableItem.0.RiskItems.0.AdditionalDetails.SpecialTerms",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Personal Accident SumInsured",
            path: "InsurableItem.0.RiskItems.0.AdditionalDetails.PersonalAccidentSumInsured",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
        ],
        [
          {
            type: "Input",
            label: "Special Condition 01",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.0.SpecialCondition",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 01 Value",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.0.SpecialConditionvalue",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Special Condition 02",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.1.SpecialCondition02",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 02 Value",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.1.SpecialCondition02value",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Special Condition 03",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.2.SpecialCondition03",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 03 Value",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.2.SpecialCondition03value",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Special Condition 04",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.3.SpecialCondition04",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 04 Value",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.3.SpecialCondition04value",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Special Condition 05",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.4.SpecialCondition05",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 05 Value",
            path: "InsurableItem.0.RiskItems.0.SpecialCondition.4.SpecialCondition05value",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Input",
            label: "Sum Insured",
            path: "SumInsured",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Total Premium",
            // path: "Result.PremiumDetail.TotalPremium",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Count Of Lives",
            path: "CountOfLives",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },

          {
            type: "AutoComplete",
            label: "Installment Frequency",
            visible: true,
            path: "InstallmentFrequency",
            // options: masters.Municipality4,
          },
          {
            type: "Input",
            label: "Number Of Installments",
            path: "NoOfInstallment",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            columns: [
              { field: "NoofInstallment", headerName: "No Of Installments", width: 170 },
              { field: "InstallmentDueDate", headerName: "Installment Due Date", width: 180 },
              { field: "SumInsured", headerName: "Sum Insured", width: 120 },
              {
                field: "InstallmentPremiumAmount",
                headerName: "Installment Premium Amount ",
                width: 230,
              },
              { field: "Gst", headerName: "GST@ 18%", width: 100 },
              { field: "TotalAmount", headerName: "Total Amount", width: 150 },
            ],
            rows: [
              {
                id: 1,
                cname: "Emergency In-patient medical treatment",
                noofclaim: "100000",
                si: "100",
                unit: "per cover",
                wperiod: "3 Months",
              },
            ],
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox>
                <Stack direction="row" justifyContent="center">
                  <MDTypography>
                    <strong>Premium Summary</strong>
                  </MDTypography>
                </Stack>
                <Stack direction="row" justifyContent="center" mt={2}>
                  <Card
                    sx={{
                      backgroundColor: "#F0F0F0",
                      width: "500px",
                    }}
                  >
                    <Grid container spacing={2} p={3}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Sum Insured</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{/* {formater.format(objectPath.get(dto, "SumInsured"))} */}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Installment Premium</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{" "}
                          {/* {formater.format(
                            objectPath.get(dto, "AssignResult.PremiumDetail.GrossPremium")
                          )} */}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Tax(18%)</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{" "}
                          {/* {formater.format(
                            objectPath.get(dto, "AssignResult.PremiumDetail.TaxAmount")
                          )} */}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>
                          <strong>Total Premium</strong>
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          <strong>
                            ₹
                            {/* {formater.format(
                              objectPath.get(dto, "AssignResult.PremiumDetail.TotalPremium")
                            )} */}
                          </strong>
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </Card>
                </Stack>
              </MDBox>
            ),
          },
        ],
      ];
      break;
    case 4:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <PaymentPage
                prod="Magma"
                PaymentMode={[
                  { label: "Online", value: "Online" },
                  { label: "Offline", value: "Offline" },
                ]}
                OfflinePT={{
                  CDRedirection: "/retail/Payment/MagmaSuccess",
                  cdAccDetails: {
                    accountNo: dto.PartnerDetails.accountNo,
                    partnerId: 16219,
                    productId: 1022,
                  },
                  data: [
                    {
                      label: "CD Account",
                      value: "CD Account",
                    },
                  ],
                }}
                OnlinePT={[{ label: "Rayzor", value: "Rayzor" }]}
              />
            ),
          },
        ],
      ];
      break;

    default:
      data = [];
  }

  return data;
};

const getOnNextClick = async ({ activeStep }) => {
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      fun = true;

      break;
    case 2:
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Calculate Premium", visible: true },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed to Pay", visible: true },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed to Pay", visible: false },
      };

      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async () => {
  const mst = {
    PlanList: [],
    masterPolicyData: [],
    Plans: [],
    BenifitList: [],
    Id: 0,
    Gender: [],
    EMIBenefitFlag: false,
    memberAcc: [
      {
        name: `Insured Member 1`,
        visible: true,
      },
    ],
    memberCom: [
      [
        {
          type: "Input",
          label: "Member ID",
          Path: "InsurableItem.0.RiskItems.0.FamilyID",
          required: true,
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          required: true,
          label: "Member Name",
          path: "InsurableItem.0.RiskItems.0.Name",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "Input",
          required: true,
          label: "Member Name",
          path: "InsurableItem.0.RiskItems.0.Name",
          // InputProps: { readOnly: true },
          visible: false,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Birth",
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.DOB",
          // customOnChange: (e, d) => onDOBselect(e, d, 0),
          visible: true,
        },
        {
          type: "Input",
          label: "Age",
          required: true,
          path: "InsurableItem.0.RiskItems.0.Age",
          InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Gender",
          visible: true,
          path: "InsurableItem.0.RiskItems.0.Gender",
          // options: masters.Gender,
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Relationship",
          visible: true,
          path: "InsurableItem.0.RiskItems.0.RelationShipToProposer",
          // options: masters.Relationship,
        },

        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Joining",
          visible: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.DOJ",
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Commencement",
          visible: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.DOC",
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Coverage End Date",
          visible: true,
          altFormat: "d-m-Y",
          dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.CovergeEndDate",
        },
        {
          type: "Input",
          label: "Ellite Status",
          path: "InsurableItem.0.RiskItems.0.ElliteStatus",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlpha],
        },
        {
          type: "Input",
          label: "Location",
          path: "InsurableItem.0.RiskItems.0.Location",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "Grade",
          path: "InsurableItem.0.RiskItems.0.Grade",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "Designation",
          path: "InsurableItem.0.RiskItems.0.Designation",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "MObile No",
          path: "InsurableItem.0.RiskItems.0.MobileNumber",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          required: true,
          label: "Email ID",
          path: "InsurableItem.0.RiskItems.0.EmailID",
          // InputProps: { readOnly: true },
          visible: true,
          onBlurFuncs: [IsEmail],
        },
        {
          type: "Input",
          required: true,
          label: "No Of Lives",
          path: "InsurableItem.0.RiskItems.0.NoOfLives",
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Remarks",
          path: "InsurableItem.0.RiskItems.0.Remarks",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
          spacing: 6,
        },
        {
          type: "Typography",
          label: "Questionaire",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "Typography",
          label: "Section A",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "RadioGroup",

          visible: true,
          radioLabel: {
            label: "1. Hypertention History",
            labelVisible: true,
          },
          spacing: 12,
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: "InsurableItem.0.RiskItems.0.Questionaire.0.Answer",
        },
        {
          type: "RadioGroup",

          visible: true,
          radioLabel: {
            label: "2. Diabetes Mellitus History",
            labelVisible: true,
          },
          spacing: 12,
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: "InsurableItem.0.RiskItems.0.Questionaire.1.Answer",
        },
        {
          type: "Typography",
          label: "Nominee Details",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "Input",
          label: "Nominee Name",
          path: "InsurableItem.0.RiskItems.0.NomineeDetails.0.NomineeName",
          // InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "AutoComplete",
          label: "Nominee Relationship",
          required: true,
          visible: true,
          path: "InsurableItem.0.RiskItems.0.NomineeDetails.0.NomineeRelationWithProposer",
          // options: masters.Relationship,
        },
        {
          type: "MDDatePicker",
          label: "Nominee DOB",
          visible: true,
          // altFormat: "Y-m-d",
          // dateFormat: "Y-m-d",
          path: "InsurableItem.0.RiskItems.0.NomineeDetails.0.NomineeDOB",
        },
      ],
    ],
  };
  const res1 = await getMasterPolicyData();
  mst.masterPolicyData = res1;

  return mst;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
