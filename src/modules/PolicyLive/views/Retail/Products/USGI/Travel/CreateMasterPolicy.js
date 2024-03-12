import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import { get } from "Common/RenderControl/objectPath";
import { addMonths } from "date-fns";
import swal from "sweetalert";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import {
  TravelJson,
  Masters,
  modelStyle,
  IsCINNo,
  addOneYear,
  formatDateKYC,
} from "../data/Json/TravelJson";

import { GetProdPartnermasterData } from "../data/APIs/USGIWCApi";

function CreateMasterPolicy() {
  const [lDto, setDto] = useState(TravelJson);
  const [lMasters, setMasters] = useState(Masters);
  const min = `${formatDateKYC(new Date(new Date().setDate(new Date().getDate())))}`;
  const handleMastersApiCalling = async () => {
    const sal = await GetProdPartnermasterData(1037, "Salutation", { MasterType: "Salutation" });
    lMasters.Salutation = sal;
    const gen = await GetProdPartnermasterData(1037, "Gender", { MasterType: "Gender" });
    lMasters.Gender = gen;
    lMasters.dropdown.PartnerClass = await GetProdPartnermasterData(1443, "PartnerClass", {
      MasterType: "PartnerClass",
    });
    setMasters({ ...lMasters });
  };
  useEffect(async () => {
    await handleMastersApiCalling();
  }, []);

  const handleSetValueParms = async (e, value) => {
    lDto.MasterPolicy.CKYCParam = value.mValue;

    if (value.mValue !== "PAN Number") {
      lDto.MasterPolicy.MAadharCard = "";
      lDto.MasterPolicy.AadharMobileNo = "";
      lDto.MasterPolicy.Mgender = "";
      lDto.MasterPolicy.MAadharname = "";
      lDto.MasterPolicy.MDOB = "";
    } else {
      lDto.MasterPolicy.MDOB = "";
      lDto.MasterPolicy.MPanNo = "";
    }
    setDto({ ...lDto });
  };
  const handleDateChanges = (d, name) => {
    if (name === "Masters") {
      lDto.MasterPolicy.MasterpolicyStartdate = d;
      lDto.MasterPolicy.Masterpolicyenddate = addOneYear(new Date(d), 1);
    }
    if (name === "Applicable") {
      lDto.MasterPolicy.MasterpolicyApplicabiltyStartDate = d;
      lDto.MasterPolicy.MasterApplicabilityEndDate = addOneYear(new Date(d), 2);
    }
    setDto({ ...lDto });
  };
  const handleSaveMaster = (flag) => {
    if (flag === true) {
      lMasters.flag.open = true;
      setMasters({ ...lMasters });
    } else {
      swal({ icon: "error", text: "Please Fill requried field" });
    }
  };
  const accordians = [
    {
      label: "Partner Details ",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "Intermediary Details",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "Communication Details",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: " E KYC",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "Master Policy Holder Details",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "CKYC Permanent Address",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "Office Address",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: " Assign Plan",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "Conditions",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
  ];
  const Data = [
    {
      PartnerDetailsData: [
        {
          label: "Partner Name",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.Partnername`,
          onChangeFuncs: ["IsAlphaSpace"],
          validationId: 1,
        },
        {
          label: "Partner Type",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.Partnertype`,
          options: Masters.dropdown.PartnerType,
          validationId: 1,
        },
        {
          label: "Partner Class",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.Partnerclass`,
          options: lMasters.dropdown.PartnerClass,
          validationId: 1,
        },
        {
          label: "Partner Code",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.partnercode`,
          validationId: 1,
        },
      ],
    },
    {
      IntermediaryDetailsData: [
        {
          label: "Branch Name",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.BranchName`,
          onChangeFuncs: ["IsAlphaSpace"],
          validationId: 1,
        },
        {
          label: "Branch Code",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.BranchCode`,
          validationId: 1,
        },
        {
          label: "Intermediary/Broker Name",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.imdbrokername`,
          onChangeFuncs: ["IsAlphaSpace"],
          validationId: 1,
        },
        {
          label: "Intermediary/Broker Person Code",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.brokerpersoncode`,
          validationId: 1,
        },
        {
          label: "Intermediary/Broker Contact NO",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.imdcontactno`,
          onChangeFuncs: ["IsNumeric"],
          onBlurFuncs: ["IsMobileNumber"],
          validationId: 1,
        },
        {
          label: "Intermediary/Broker Licence NO",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.imdbrokerlicenceno`,
          validationId: 1,
        },
      ],
    },
    {
      CommunicationDetailsData: [
        {
          label: "Mobile No",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.Mobileno`,
          onBlurFuncs: ["IsMobileNumber"],
          onChangeFuncs: ["IsNumeric"],
          InputProps: { maxLength: 10 },
          validationId: 1,
        },
        {
          label: "E-Mail ID",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.Emailid`,
          onBlurFuncs: ["IsEmail"],
          validationId: 1,
        },
      ],
    },
    {
      EKYC: [
        {
          type: "RadioGroup",
          visible: true,
          required: true,
          radioLabel: { label: "Customer Type", labelVisible: true },
          radioList: [
            { value: "Individual", label: "Individual" },
            { value: "Corporate", label: "Corporate" },
          ],
          path: "MasterPolicy.customertype",
          spacing: 12,
          validationId: 1,
        },
        {
          type: "Input",
          label: "CKYC Status",
          visible: false,
          disabled: true,
          value: lDto.CkycStatus,
        },
        {
          type: "Typography",
          visible: true,
          spacing: 12,
          label: "",
        },
        {
          type: "AutoComplete",
          label: "Select ID Type",
          spacing: 3,
          visible: lDto.MasterPolicy.customertype === "Individual",
          required: true,
          path: `MasterPolicy.CKYCParam`,
          options: lMasters.dropdown.CkycParams,
          customOnChange: (e, v) => handleSetValueParms(e, v),
          disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
        },
        {
          type: "Typography",
          visible: true,
          spacing: 12,
          label: "",
        },
        {
          type: "Input",
          label: "PAN Number",
          visible:
            lDto?.MasterPolicy?.CKYCParam === "PAN Number" ||
            lDto.MasterPolicy.customertype === "Corporate",
          required: lDto.MasterPolicy.customertype !== "Corporate",

          onBlurFuncs: ["IsPan"],
          path: `MasterPolicy.PanNo`,
          InputProps: { maxLength: 10 },
          disabled:
            lDto.MasterPolicy.MGSTIN ||
            lDto.MasterPolicy.MCIN ||
            lDto.CkycStatus === "success" ||
            lDto.CkycStatus === "failure",
        },
        {
          type: "Input",
          label: "GSTIN Number",
          visible: lDto.MasterPolicy.customertype === "Corporate",
          // required: true,
          InputProps: { maxLength: 15 },
          onBlurFuncs: ["IsGstNo"],
          path: `MasterPolicy.GSTNumber`,
          disabled:
            lDto.MasterPolicy.MPanNo || lDto.MasterPolicy.MCIN || lDto.CkycStatus === "success",
        },
        {
          type: "Input",
          onBlurFuncs: [IsCINNo],
          label: "CIN Number",
          visible: lDto.MasterPolicy.customertype === "Corporate",
          path: `MasterPolicyCreation.CIN`,
          disabled:
            lDto.MasterPolicy.MGSTIN || lDto.MasterPolicy.MPanNo || lDto.CkycStatus === "success",
          InputProps: { maxLength: 21 },
        },
        {
          type: "Input",
          label: "Enter last 4 digits of Aadhar",
          spacing: 2.4,
          visible:
            lDto.MasterPolicy.CKYCParam === "Aadhaar Number" &&
            lDto.MasterPolicy.customertype !== "Corporate",
          required: lDto.MasterPolicy.customertype === "Individual",
          // onBlurFuncs: ["IsPan"],
          path: `MasterPolicy.MAadharCard`,
          onChangeFuncs: ["IsNumeric"],
          InputProps: { maxLength: 4 },
          disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
        },
        {
          type: "MDDatePicker",
          required: true,
          spacing: 2.3,
          visible:
            lDto.MasterPolicy.CKYCParam === "PAN Number" ||
            lDto.MasterPolicy.CKYCParam === "Aadhaar Number" ||
            lDto.MasterPolicy.customertype === "Corporate",
          allowInput: true,
          dateFormat: "d-m-Y",
          maxDate: new Date(),
          label:
            lDto.MasterPolicy.customertype === "Corporate"
              ? "Date of Incorporation"
              : "Date of Birth",
          path: `MasterPolicy.MDOB`,
          disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
        },
        {
          type: "Input",
          label: "Mobile No. as per Aadhar",
          spacing: 2.3,
          visible:
            lDto.MasterPolicy.CKYCParam === "Aadhaar Number" &&
            lDto.MasterPolicy.customertype !== "Corporate",
          required: lDto.MasterPolicy.customertype === "Individual",
          // onBlurFuncs: ["IsPan"],
          path: `MasterPolicy.AadharMobileNo`,
          onChangeFuncs: ["IsNumeric"],
          onBlurFuncs: ["IsMobileNumber"],
          InputProps: { maxLength: 10 },
          disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
        },
        {
          type: "Input",
          label: "Full Name as per Aadhar",
          spacing: 2.3,
          visible:
            lDto.MasterPolicy.CKYCParam === "Aadhaar Number" &&
            lDto.MasterPolicy.customertype !== "Corporate",
          required: lDto.MasterPolicy.customertype === "Individual",
          // onBlurFuncs: ["IsPan"],
          path: `MasterPolicy.MAadharname`,
          onChangeFuncs: ["IsAlphaSpace"],
          InputProps: { maxLength: 50 },
          disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
        },
        {
          type: "AutoComplete",
          label: "Gender",
          spacing: 2.3,
          visible:
            lDto.MasterPolicy.CKYCParam === "Aadhaar Number" &&
            lDto.MasterPolicy.customertype !== "Corporate",
          disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
          // spacing: 3,
          required: lDto.MasterPolicy.customertype !== "Corporate",
          path: `MasterPolicy.Mgender`,

          options: Masters?.Gender,
          // customOnChange: (e, v) => handleProposerMasters(e, v, "AadharGender"),
        },
        {
          type: "Typography",
          visible: true,
          spacing: 12,
          label: "",
        },
        {
          type: "Button",
          label: "Initiate C-kyc",
          visible: true,
          variant: "contained",
          spacing: 3,
          // onClick: initiateCkyc,
          disabled: lDto.CkycStatus === "success" || lDto.CkycStatus === "failure",
        },
        {
          type: "Button",
          label: "Update Status",
          visible: true,
          variant: "contained",
          spacing: 3,

          disabled:
            (lDto.MasterPolicy.customertype !== "Corporate" &&
              !lDto.MasterPolicy?.MPanNo &&
              !lDto.MasterPolicy?.MAadharCard === "" &&
              // dto.ProposerDetails.DOB === "" &&
              !lDto.MasterPolicy.AadharMobileNo === "" &&
              !lDto.MasterPolicy.MAadharname === "" &&
              !lDto.MasterPolicy.Mgender === "") ||
            !lDto.MasterPolicy?.MDOB ||
            lDto.CkycStatus === "success" ||
            lDto.CkycStatus === "",
          // onClick: updateckyc,
        },
        {
          type: "Button",
          label: "Send Email/SMS",
          visible: true,
          variant: "contained",
          spacing: 3,
          disabled:
            (lDto.MasterPolicy.customertype !== "Corporate" &&
              !lDto.MasterPolicy.MPanNo &&
              !lDto.MasterPolicy.MAadharCard === "" &&
              // dto.ProposerDetails.DOB === "" &&
              !lDto.MasterPolicy.AadharMobileNo === "" &&
              !lDto.MasterPolicy.MAadharname === "" &&
              !lDto.MasterPolicy.Mgender === "") ||
            !lDto.MasterPolicy.MDOB ||
            lDto.CkycStatus === "success" ||
            lDto.CkycStatus === "",
          // onClick: sendMail,
        },
      ],
    },

    {
      MasterPolicyHolderDetails: [
        {
          label: "Class",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          options: lMasters.dropdown.MPClass,
          path: `MasterPolicy.Class`,
          validationId: 1,
        },
        {
          label: "Name",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.Name`,
          onChangeFuncs: ["IsAlphaSpace"],
          validationId: 1,
        },
        {
          label: "Relationship Type",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          options: lMasters.dropdown.Relation,
          path: `MasterPolicy.Relationship`,
          validationId: 1,
        },
        {
          label: "Mobile Number",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.Mobileno`,
          onBlurFuncs: ["IsMobileNumber"],
          onChangeFuncs: ["IsNumeric"],
          InputProps: { maxLength: 10 },
          validationId: 1,
        },
        {
          label: "E-Mail ID",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.Emailid`,
          onBlurFuncs: ["IsEmail"],
          validationId: 1,
        },
        {
          label: "PAN number",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.PanNo`,
          onBlurFuncs: ["IsPan"],
          InputProps: { maxLength: 10 },
          validationId: 1,
        },
        {
          label: "Master Policy Start Date",
          type: "MDDatePicker",
          visible: true,
          required: true,
          spacing: 2.7,
          dateFormat: "d-m-Y",
          path: `MasterPolicy.MasterpolicyStartdate`,
          validationId: 1,
          minDate: min,
          customOnChange: (d) => handleDateChanges(d, "Masters"),
          maxDate: addMonths(new Date(), 1),
        },
        {
          label: "Master Policy End Date",
          type: "MDDatePicker",
          visible: true,
          required: true,
          spacing: 2.7,
          dateFormat: "d-m-Y",
          InputProps: { disabled: true },
          disabled: true,
          path: `MasterPolicy.Masterpolicyenddate`,
          validationId: 1,
        },
        {
          label: "Applicability Start Date",
          type: "MDDatePicker",
          visible: true,
          required: true,
          spacing: 2.7,
          dateFormat: "d-m-Y",
          path: `MasterPolicy.MasterpolicyApplicabiltyStartDate`,
          validationId: 1,
          minDate: min,
          customOnChange: (d) => handleDateChanges(d, "Applicable"),
          maxDate: addMonths(new Date(), 1),
        },
        {
          label: "Applicability End Date",
          type: "MDDatePicker",
          visible: true,
          required: true,
          spacing: 2.7,
          dateFormat: "d-m-Y",
          InputProps: { disabled: true },
          disabled: true,
          path: `MasterPolicy.MasterApplicabilityEndDate`,
          validationId: 1,
        },
        {
          label: "GST Number",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.GSTIN`,
          onBlurFuncs: ["IsGstNo"],
          validationId: 1,
          InputProps: { maxLength: 15 },
        },
        {
          label: "Website",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.Website`,
          validationId: 1,
        },
        {
          label: "Travel Type",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.TravelType`,
          options: lMasters.dropdown.TravelType,
          validationId: 1,
        },
        {
          label: "Number of Travel Days",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.Nooftraveldays`,
          validationId: 1,
        },
        {
          label: "Purpose of Trip",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.purposetype`,
          options: lMasters.dropdown.Purpose,
          validationId: 1,
        },
        {
          label: "Description of Insured",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.Descrptionofinsured`,
          validationId: 1,
        },
      ],
    },
    {
      CKYCPermanentAddress: [
        {
          label: "Address 1",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.PerAddressLine1`,
          validationId: 1,
        },
        {
          label: "Address 2",
          type: "Input",
          visible: true,
          required: false,
          spacing: 2.7,
          path: `MasterPolicy.PerAddressLine2`,
          validationId: 1,
        },
        {
          label: "City",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.PerCityDistrict`,
          validationId: 1,
        },
        {
          label: "State",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `MasterPolicy.PerState`,
          validationId: 1,
        },
        {
          label: "Country",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `MasterPolicy.PerCountry`,
          validationId: 1,
        },
        {
          label: "Pincode",
          type: "Input",
          visible: true,
          required: true,
          InputProps: { maxLength: 6 },
          spacing: 2.7,
          path: `MasterPolicy.PerPincode`,
          validationId: 1,
        },
        {
          type: "Checkbox",
          visible: true,
          label: "Office Address is same as Communication Address?",
          checkedVal: "Yes",
          unCheckedVal: "No",
          // customOnChange: (e) => handleCheckOffice(e),
          path: "MasterPolicy.MIsCommuinAddSameasPermanentAdd",
          spacing: 12,
          validationId: 1,
        },
      ],
    },
    {
      OfficeAddress: [
        {
          label: "Address 1",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.AddressLine1`,
          validationId: 1,
        },
        {
          label: "Address 2",
          type: "Input",
          visible: true,
          required: false,
          spacing: 2.7,
          path: `MasterPolicy.AddressLine2`,
        },
        {
          label: "City",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `MasterPolicy.CityDistrict`,
          validationId: 1,
        },
        {
          label: "State",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `MasterPolicy.State`,
          validationId: 1,
        },
        {
          label: "Country",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `MasterPolicy.Country`,
          validationId: 1,
        },
        {
          label: "Pincode",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          InputProps: { maxLength: 6 },
          path: `MasterPolicy.Pincode`,
          validationId: 1,
        },
      ],
    },
    {
      AssignPlan: [
        {
          label: "Select Plan",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          validationId: 1,
        },
      ],
    },
    {
      Conditions: [
        {
          label: "Conditions If any",
          type: "Input",
          visible: true,
          required: true,
          spacing: 12,
          multiline: "multiline",
          rows: 3,
          path: "MasterPolicy.Conditions",
          validationId: 1,
        },
        {
          label: "",
          type: "Typography",
          visible: true,
          spacing: 12,
        },
        {
          label: "Back",
          type: "Button",
          visible: true,
          spacing: 2,
        },
        {
          label: "",
          type: "Typography",
          visible: true,
          spacing: 6,
        },
        {
          label: "Reset",
          type: "Button",
          visible: true,
          spacing: 1,
        },
        {
          label: "Save Master Policy",
          type: "ValidationControl",
          subType: "Button",
          visible: true,
          validationId: 1,
          spacing: 2.6,
          onClick: handleSaveMaster,
        },
      ],
    },
  ];
  const modelClose = () => {
    lMasters.flag.open = false;
    setMasters({ ...lMasters });
  };

  const midValidationCheck = (validationId) => {
    let validationFlag = true;
    Data.forEach((section) => {
      section[Object.keys(section)[0]].forEach((x2) => {
        if (
          x2.visible === true &&
          x2.validationId === validationId &&
          x2.type !== "ValidationControl"
        ) {
          const val = get(lDto, x2.path);
          if (val === "" || val === undefined) validationFlag = false;
        }
      });
    });
    if (validationFlag === false) {
      lMasters.flag.midNextValidationId = 1;
      lMasters.flag.nextflag = true;
    } else {
      lMasters.flag.midNextValidationId = -1;
      lMasters.flag.nextflag = false;
    }
    setMasters({ ...lMasters });
    return validationFlag;
  };
  return (
    <Card>
      <Grid item xs={12} m={1}>
        Create Master Policy
      </Grid>
      {accordians.map((x, i) => (
        <Accordion defaultExpanded disableGutters sx={x.sx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="body1" fontWeight="bold" color="primary" ml={4}>
              {x.label}
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} m={1}>
              {Data.map(
                (section, j) =>
                  i === j &&
                  section[Object.keys(section)[0]].map((elem) =>
                    elem.visible ? (
                      <Grid item xs={elem.spacing}>
                        <NewRenderControl
                          item={elem}
                          dto={lDto}
                          setDto={setDto}
                          nextFlag={lMasters.flag.nextflag}
                          onMidNextValidation={midValidationCheck}
                          midNextValidationId={lMasters.flag.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Modal
        open={lMasters.flag.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MDBox align-item="center" sx={modelStyle}>
          <IconButton
            aria-label="Close"
            onClick={() => modelClose()}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={1}>
              <MDTypography variant="body1" fontWeight="bold" color="success">
                Master Policy Created Suceessfully!
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={1}>
              <MDTypography variant="body1" fontWeight="bold">
                Your Master Policy No is :&nbsp;&nbsp;USGI
              </MDTypography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={1}>
            <MDButton variant="outlined" onClick={modelClose}>
              Close
            </MDButton>
          </Grid>
        </MDBox>
      </Modal>
    </Card>
  );
}

export default CreateMasterPolicy;
