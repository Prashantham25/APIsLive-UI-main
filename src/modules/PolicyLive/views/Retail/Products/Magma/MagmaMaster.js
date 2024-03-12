import { useState } from "react";
import {
  IsAlphaSpace,
  IsEmail,
  IsMobileNumber,
  IsNumeric,
  IsAlphaNum,
  IsPan,
  IsGstNo,
  //   IsNumaricSpecial,
} from "Common/Validations";
import CloseIcon from "@mui/icons-material/Close";
import Communication from "modules/PolicyLive/views/Retail/Products/Magma/Communication";
import POSPAAdded from "assets/images/BrokerPortal/POSPAAdded.png";
import { useNavigate } from "react-router-dom";
import objectPath from "object-path";
import Swal from "sweetalert2";
import moment from "moment";
import {
  useDataController,
  // setGenericPolicyDto,
  // setGenericInfo,
} from "../../../../../BrokerPortal/context";
import { UpdateSequenceNumber, SaveProductMasterPolicy, CreatePartner } from "./data/index";

let topNavigate = null;
const masters = {
  CoinsurerType: [
    { mID: "1", mValue: "L" },
    { mID: "2", mValue: "N" },
  ],
  AdministrativeCharges: [
    { mID: "1", mValue: "1" },
    { mID: "2", mValue: "0" },
  ],
  BusinessType: [
    { mID: "1", mValue: "New Business" },
    { mID: "2", mValue: "Rollover" },
    { mID: "3", mValue: "Renewal" },
  ],
  MaritalStatus: [
    { mID: "1", mValue: "Married" },
    { mID: "2", mValue: "Unmarried" },
  ],
  ServiceTaxExemptioncategory: [
    { mID: "1", mValue: "No Exemption" },
    { mID: "2", mValue: "Risk Situated at SEZ" },
    { mID: "3", mValue: "Risk Situated at J&K" },
    { mID: "4", mValue: "Risk Situated at SEZ with tax" },
    { mID: "5", mValue: "Policies from PSU, Govt Undertaking" },
  ],
  Frequency: [{ mID: "1", mValue: "Annual" }],
  FormOfCommunication: [{ mID: "1", mValue: "Online" }],
  PolicyCoverType: [
    { mID: "1", mValue: "Employer-Employee" },
    { mID: "2", mValue: "Non-employer Employee" },
  ],
  IndividualCertificateRequired: [
    { mID: "1", mValue: "Required" },
    { mID: "2", mValue: "Not Required" },
  ],
  CertificateType: [
    { mID: "1", mValue: "Customer Certificate" },
    { mID: "2", mValue: "Normal Certificate" },
  ],
  SelfCovered: [
    { mID: "1", mValue: "Yes" },
    { mID: "2", mValue: "No" },
  ],
  SchemeClassification: [
    { mID: "1", mValue: "Contributory Scheme" },
    { mID: "2", mValue: "Non Contributory Scheme" },
  ],
  RIBusinessType: [
    { mID: "1", mValue: "Applicable" },
    { mID: "2", mValue: "Not Applicable" },
  ],
  PolicyType: [
    { mID: "1", mValue: "Floater" },
    { mID: "2", mValue: "NonFloater" },
  ],
  BusinessChannel: [
    { mID: "1", mValue: "Direct Agent" },
    { mID: "2", mValue: "Individual Agents" },
    { mID: "3", mValue: "Brokers" },
    { mID: "4", mValue: "Corporate Agents" },
    { mID: "5", mValue: "Micro Agents" },
    { mID: "6", mValue: "Bancassurance" },
  ],
  Masterpolicy: [
    { mID: "1", mValue: "Yes" },
    { mID: "2", mValue: "No" },
  ],
  InstallmentCase: [
    { mID: "1", mValue: "Yes" },
    { mID: "2", mValue: "No" },
  ],
  InstallmentFrequency: [
    { mID: "1", mValue: "Monthly" },
    { mID: "2", mValue: "Quarterly" },
    { mID: "3", mValue: "Half Yearly" },
    { mID: "4", mValue: "Annually" },
  ],
};
const getProcessSteps = () => {
  const steps = ["Master Policy Details", "Communication Details", "Insured Details"];
  return steps;
};

const getPageContent = (activeStep) => {
  let steps = [];
  const [control] = useDataController();
  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;
  console.log("dtodata", dto);
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Proposal Details", visible: true },
        { name: "Bank Details", visible: true },
        { name: "Intermediary Details", visible: true },
        { name: "Office Location Details", visible: true },
        { name: "Policy Details", visible: true },
        { name: "Financier Details", visible: true },
        { name: "TPA Details", visible: true },
        { name: "Risk Cover Details", visible: true },
        { name: "Risk Cover Group", visible: true },
      ];
      break;
    case 1:
      steps = [{ name: "Communication Matrix (Issuance)", visible: true }];
      break;
    case 2:
      steps = [
        { name: "Insured Credentials", visible: true },
        { name: "Issued Certificate Details", visible: true },
        { name: "Past Policy Details", visible: true },
        { name: "Coinsurance Details", visible: true },
      ];
      break;
    default:
      steps = [];
  }
  return steps;
};
const getSectionContent = (activeStep) => {
  const [control] = useDataController();
  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;
  console.log("genericPolicyDto", genericPolicyDto);
  const Navigate = useNavigate();
  topNavigate = Navigate;
  // const { genericInfo } = control;
  const matrixdisable = false;
  const spreadAddMembersQuestionarie = () => {
    const qArray1 = [];

    const numberOfDependents = parseInt(dto?.NoOfDependentCovered, 10) || 0;

    for (let i = 0; i < numberOfDependents; i += 1) {
      qArray1.push(
        {
          type: "Input",
          label: `Allowed Dependent Relationship`,
          value: `Dependents.${i}.Relationship`,
          visible: true,
          spacing: 4.5,
          required: true,
        },
        {
          type: "Input",
          label: `No. of times Dependents allowed `,
          value: `Dependents.${i}.NoOfTimesAllowed`,
          visible: true,
          spacing: 4.5,
          required: true,
        }
      );
    }

    return qArray1;
  };
  let data = [];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Input",
            label: "Customer ID",
            value: "ProposerDetails.CustomerID",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            required: true,
          },
          {
            type: "Input",
            label: "Customer GST Number",
            value: "ProposerDetails.GSTLocation",
            visible: true,
            onBlurFuncs: [IsGstNo],
          },
          {
            type: "AutoComplete",
            label: "Type of Business",
            visible: true,
            value: "ProposerDetails.BusinessType",
            options: masters.BusinessType,
          },
          {
            type: "Input",
            label: "First Name",
            value: "ProposerDetails.FirstName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
            required: true,
          },
          {
            type: "Input",
            label: "Last Name",
            value: "ProposerDetails.LastName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Initials",
            value: "ProposerDetails.Initials",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Maiden Name",
            value: "ProposerDetails.MaidenName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "AutoComplete",
            label: "Marital Status",
            visible: true,
            value: "ProposerDetails.MaritalStatus",
            options: masters.MaritalStatus,
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "ProposerDetails.ProposerDOB",

            visible: true,
          },
          {
            type: "Input",
            label: "Contact No.",
            value: "ProposerDetails.ContactNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "ProposerDetails.MobileNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Telephone No.",
            value: "ProposerDetails.TelephoneNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "WhatsApp No.",
            value: "ProposerDetails.WhatsAppNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Primary Email ID",
            value: "ProposerDetails.EmailID",
            visible: true,
            onBlurFuncs: [IsEmail],
            required: true,
          },
          {
            type: "Input",
            label: "Other Email ID",
            value: "ProposerDetails.AlternateEmailID",
            visible: true,
            onBlurFuncs: [IsEmail],
            required: true,
          },
          {
            type: "Input",
            label: "PAN No.",
            value: "ProposerDetails.PANNo",
            visible: true,
            onBlurFuncs: [IsPan],
            required: true,
          },
          {
            type: "Input",
            label: "TAN No.",
            value: "ProposerDetails.TANNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
          },
          {
            type: "RadioGroup",
            visible: true,
            justifyContent: "space-between",
            radioLabel: {
              label: "Form 60/61",
              labelVisible: true,
            },
            radioList: [
              { value: "Applicable", label: "Applicable" },
              { value: "NotApplicable", label: "Not Applicable" },
            ],
            value: "Form60/61",
            required: true,
            spacing: 4,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 5,
          },
          {
            type: "RadioGroup",
            visible: true,
            justifyContent: "space-between",
            radioLabel: {
              label: "PAN No/Form 60/61",
              labelVisible: true,
            },
            radioList: [
              { value: "Applicable", label: "Applicable" },
              { value: "NotApplicable", label: "Not Applicable" },
            ],
            value: "PANNo/Form60/61",
            required: true,
            spacing: 4.5,
          },
          {
            type: "Typography",
            label: "Home/Office Address",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "ProposerDetails.PermanentAddress.Address1",
            visible: true,
            required: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "ProposerDetails.PermanentAddress.Address2",
            visible: true,
            required: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "ProposerDetails.PermanentAddress.Address3",
            visible: true,
            required: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "ProposerDetails.PermanentAddress.Address4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            value: "ProposerDetails.PermanentAddress.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "ProposerDetails.PermanentAddress.State",

            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "ProposerDetails.PermanentAddress.Pincode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "ProposerDetails.PermanentAddress.MobileNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
            required: true,
          },
          {
            type: "Input",
            label: "Land Line No.",
            value: "ProposerDetails.PermanentAddress.LandlineNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Typography",
            label: "Mailing Address",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "ProposerDetails.CommunicationAddress.Address1",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "ProposerDetails.CommunicationAddress.Address2",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "ProposerDetails.CommunicationAddress.Address3",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "ProposerDetails.CommunicationAddress.Address4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            value: "ProposerDetails.CommunicationAddress.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "ProposerDetails.CommunicationAddress.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "ProposerDetails.CommunicationAddress.Pincode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "ProposerDetails.CommunicationAddress.MobileNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Land Line No.",
            value: "ProposerDetails.CommunicationAddress.LandlineNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Input",
            label: "Bank Name",
            value: "BankDetails.BankName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Bank Branch Code",
            value: "BankDetails.BankBranchCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "IFSC Code",
            value: "BankDetails.IFSCCode",
            visible: true,
            onBlurFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "MICR Code",
            value: "BankDetails.MICRCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Bank A/c No.",
            value: "BankDetails.AccountNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Bank Account Type",
            value: "BankDetails.AccountType",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
        ],
        [
          {
            type: "Input",
            label: "Intermediary Code",
            value: "Channel.IntermediaryCode",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Intermediary Name",
            value: "Channel.IntermediaryName",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "PAN No.",
            value: "Channel.PANNo",
            visible: true,
            onBlurFuncs: [IsPan],
          },
          {
            type: "Input",
            label: "TAN No.",
            value: "Channel.TANNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "CIN No.",
            value: "Channel.CINNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "Channel.MobileNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Toll Free No.",
            value: "Channel.TollFreeNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Email ID ",
            value: "Channel.EmailID",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Email ID (for Policy Print)",
            value: "Channel.EmailIDPolicyPrint",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Bank Name",
            value: "Channel.BankName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Bank Branch Name",
            value: "Channel.BankBranchCode",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "IFSC Code",
            value: "Channel.IFSCCode",
            visible: true,
            onBlurFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "MICR Code",
            value: "Channel.MICRCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Bank A/C No.",
            value: "Channel.BankAccountNo",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Bank Account Type",
            value: "Channel.BankAccountType",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
        ],
        [
          {
            type: "Input",
            label: "Office Location",
            value: "OfficeLocationDetails.OfficeLocation",
            visible: true,
            // required: true,
          },
          {
            type: "Input",
            label: "Office Location Code",
            value: "OfficeLocationDetails.LocationCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "New Location Code",
            value: "OfficeLocationDetails.OtherLocationCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Office Zone",
            value: "OfficeLocationDetails.Zone",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Office Region",
            value: "OfficeLocationDetails.Region",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Office Location",
            value: "OfficeLocationDetails.OfficeLocation",
            visible: true,
          },
          {
            type: "Input",
            label: "Office Location Type",
            value: "OfficeLocationDetails.LocationType",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "MDDatePicker",
            label: "Start Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "OfficeLocationDetails.StartDate",
            visible: true,
          },
          {
            type: "MDDatePicker",
            label: "End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "OfficeLocationDetails.EndDate",
            visible: true,
          },
          {
            type: "Input",
            label: "Closed",
            value: "OfficeLocationDetails.Closed",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Email Id",
            value: "OfficeLocationDetails.EmailId",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Office Location Address Line1",
            value: "OfficeLocationDetails.AddressLine1",
            visible: true,
          },
          {
            type: "Input",
            label: "Office Location Address Line2",
            value: "OfficeLocationDetails.AddressLine2",
            visible: true,
          },
          {
            type: "Input",
            label: "Office Location Address Line3",
            value: "OfficeLocationDetails.AddressLine3",
            visible: true,
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "OfficeLocationDetails.Pincode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "City/District",
            value: "OfficeLocationDetails.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "OfficeLocationDetails.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Office Location Telephone No.",
            value: "OfficeLocationDetails.TelephoneNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "OfficeLocationDetails.TelephoneNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "TAN No.",
            value: "OfficeLocationDetails.TanNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "GST No.",
            value: "OfficeLocationDetails.GSTNumber",
            visible: true,
            onBlurFuncs: [IsGstNo],
          },
          {
            type: "Input",
            label: "GST Office Location",
            value: "OfficeLocationDetails.GSTOfficeLocation",
            visible: true,
            // required: true,
          },
          {
            type: "Input",
            label: "Relationship Manager",
            value: "OfficeLocationDetails.Manager",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
            // required: true,
          },
          {
            type: "Input",
            label: "Business Source Type",
            value: "Channel.BusinessSourceType",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
            // required: true,
          },

          {
            type: "AutoComplete",
            label: "Business Channel Type",
            visible: true,
            value: "Channel.BusinessChannelType",
            options: masters.BusinessChannel,
          },
          {
            type: "Input",
            label: "Business Channel Name",
            value: "Channel.BusinessChannelName",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Relationship Code",
            value: "Channel.RelationshipCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
        ],
        [
          {
            type: "MDDatePicker",
            label: "Proposal Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "ProposalDate",
            visible: true,
            // required: true,
            maxDate: new Date(),
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "PolicyStartDate",
            visible: true,
            required: true,
          },
          {
            type: "MDTimePicker",
            label: "Policy Start Time",
            visible: true,
            value: "PolicyStartTime",
            // required: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "PolicyEndDate",
            visible: true,
            required: true,
          },
          {
            type: "MDTimePicker",
            label: "Policy End Time",
            visible: true,
            value: "PolicyEndTime",
          },
          {
            type: "Input",
            label: "Social Sector Details",
            value: "SocialSectorDetails",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Inward Number",
            value: "InwardNumber",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Service Tax Exemption Category",
            visible: true,
            value: "ServiceTaxExemptioncategory",
            options: masters.ServiceTaxExemptioncategory,
            // customOnChange: handleGST,
            required: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Financier Name",
            value: "AdditionalDetails.FinancierDetails.0.BankName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Bank Branch",
            value: "AdditionalDetails.FinancierDetails.0.BankBranchCode",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Bank Location",
            value: "AdditionalDetails.FinancierDetails.0.BankLocation",
            visible: true,
          },
          {
            type: "Input",
            label: "Bank Account Number",
            value: "AdditionalDetails.FinancierDetails.0.AccountNo",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "IFSC Code",
            value: "AdditionalDetails.FinancierDetails.0.IFSCCode",
            visible: true,
            onBlurFuncs: [IsAlphaNum],
          },
        ],
        [
          {
            type: "Input",
            label: "TPA Code",
            value: "AdditionalDetails.TPADetails.TPACode",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "TPA Name",
            value: "AdditionalDetails.TPADetails.TPAName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
        ],
        [
          {
            type: "Input",
            label: "Risk SI Component",
            value: "RiskCoverDetails.RiskSIComponent",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "No. of Lives",
            value: "RiskCoverDetails.NoofLives",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Sum Insured",
            value: "RiskCoverDetails.SumInsured",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Premium",
            value: "RiskCoverDetails.Premium",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Differential SI",
            value: "RiskCoverGroup.DifferentialSI",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Endorsement Amount",
            value: "RiskCoverGroup.EndorsementAmount",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Net Premium",
            value: "RiskCoverGroup.NetPremium",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Service Tax/GST",
            value: "RiskCoverGroup.ServiceTax/GST",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Stamp Duty",
            visible: true,
            value: "RiskCoverGroup.StampDuty",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Total Premium",
            value: "RiskCoverGroup.TotalPremium",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Form of Communiation",
            visible: true,
            value: "CommunicationMatrixDetails.FormOfCommunication",
            options: masters.FormOfCommunication,
            // required: true,
          },
          {
            type: "Typography",
            label: "If Physical Document:",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Recipient Name",
            value: "CommunicationMatrixDetails.PhysicalDocument.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            value: "CommunicationMatrixDetails.PhysicalDocument.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "CommunicationMatrixDetails.PhysicalDocument.AddressLine1",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "CommunicationMatrixDetails.PhysicalDocument.AddressLine2",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "CommunicationMatrixDetails.PhysicalDocument.AddressLine3",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "CommunicationMatrixDetails.PhysicalDocument.AddressLine4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            value: "CommunicationMatrixDetails.PhysicalDocument.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "CommunicationMatrixDetails.PhysicalDocument.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "CommunicationMatrixDetails.PhysicalDocument.PinCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Typography",
            label: "If Soft Copy:",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Corporate HR Name",
            value: "CommunicationMatrixDetails.SoftCopy.0.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Corporate HR Email ID",
            value: "CommunicationMatrixDetails.SoftCopy.0.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Corporate HR Mobile No.",
            value: "CommunicationMatrixDetails.SoftCopy.0.MobileNumber",
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
            visible: true,
          },
          {
            type: "Input",
            label: "Sub HR Name",
            value: "CommunicationMatrixDetails.SoftCopy.1.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Sub HR Email ID",
            value: "CommunicationMatrixDetails.SoftCopy.1.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Sub HR Mobile No.",
            value: "CommunicationMatrixDetails.SoftCopy.1.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Broker Name",
            value: "CommunicationMatrixDetails.SoftCopy.2.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Broker Email ID",
            value: "CommunicationMatrixDetails.SoftCopy.2.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Broker Mobile No.",
            value: "CommunicationMatrixDetails.SoftCopy.2.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "RM Name",
            value: "CommunicationMatrixDetails.SoftCopy.3.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "RM Email ID",
            value: "CommunicationMatrixDetails.SoftCopy.3.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "RM Mobile No.",
            value: "CommunicationMatrixDetails.SoftCopy.3.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          // {
          //   type: "Input",
          //   label: "Others Name",
          //   value: "CommunicationMatrixDetails.SoftCopy.4.Name",
          //   visible: true,
          //   onBlurFuncs: [IsAlphaSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Others Email",
          //   value: "CommunicationMatrixDetails.SoftCopy.4.Email",
          //   visible: true,
          //   onBlurFuncs: [IsEmail],
          // },
          // {
          //   type: "Input",
          //   label: "Others Mobile",
          //   value: "CommunicationMatrixDetails.SoftCopy.4.MobileNumber",
          //   visible: true,
          //   onBlurFuncs: [IsMobileNumber],
          //   InputProps: { maxLength: 10 },
          // },
          {
            type: "Input",
            label: " Wellness Service Provider Name",
            value: "AdditionalDetails.WellnessServiceProviderDetails.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Wellness Service Provider Email ID",
            value: "AdditionalDetails.WellnessServiceProviderDetails.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Wellness Service Provider Mobile No.",
            value: "AdditionalDetails.WellnessServiceProviderDetails.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "TPA Administrator Name",
            value: "AdditionalDetails.ThirdPartyAdministratorDetails.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "TPA Administrator Email ID",
            value: "AdditionalDetails.ThirdPartyAdministratorDetails.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "TPA Administrator Mobile No.",
            value: "AdditionalDetails.ThirdPartyAdministratorDetails.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: <Communication dto={dto} matrixdisable={matrixdisable} />,
          },
        ],
      ];

      break;
    case 2:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Master Policy",
            visible: true,
            value: "MasterPolicy",
            options: masters.Masterpolicy,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Policy Cover Type",
            visible: true,
            value: "PolicyCoverType",
            options: masters.PolicyCoverType,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Individual Certificate Required",
            visible: true,
            value: "IndividualCertificateRequired",
            options: masters.IndividualCertificateRequired,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Certificate Type",
            visible: true,
            value: "CertificateType",
            options: masters.CertificateType,
            // required: true,
          },
          {
            type: "Input",
            label: "Type of Group",
            value: "TypeofGroup",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Scheme Classification",
            visible: true,
            value: "SchemeClassification",
            options: masters.SchemeClassification,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "RI Bussiness Type",
            visible: true,
            value: "RIBusinessType",
            options: masters.RIBusinessType,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Re-Insurance Case",
            visible: true,
            value: "ReInsuranceCase",
            options: masters.SelfCovered,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Policy Type",
            visible: true,
            value: "PolicyType",
            options: masters.PolicyType,
            // required: true,
          },
          {
            type: "Input",
            label: "Minimum Age (in days) for Child",
            value: "AdditionalDetails.Dependents.0.MiniAgeforChildInDays",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Minimum Age (in years) for Child",
            value: "AdditionalDetails.Dependents.0.MiniAgeforChildInYear",
            visible: true,
            onChangeFuncs: [IsNumeric],

            // required: true,
          },
          {
            type: "Input",
            label: "Maximum Age (in years) for Child",
            value: "AdditionalDetails.Dependents.0.MaxAgeforChildInYear",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Minimum Age (in days)",
            value: "AdditionalDetails.Dependents.0.MiniAgeInDays",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Minimum Age (in years)",
            value: "AdditionalDetails.Dependents.0.MiniAgeInYear",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Maximum Age (in years)",
            value: "AdditionalDetails.Dependents.0.MaxAgeInYear",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Maximum Family Size",
            value: "InsuredDetails.FamilySize",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Self Covered",
            visible: true,
            value: "SelfCovered",
            options: masters.SelfCovered,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Dependent Covered",
            visible: true,
            value: "DependentAllowed",
            options: masters.SelfCovered,
            // required: true,
          },
          {
            type: "Input",
            label: "No. of dependent (Per Family)",
            value: "NoOfDependentCovered",
            visible: true,
            onChangeFuncs: [IsNumeric],
            required: true,
          },

          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Typography",
            label: "Allowed Dependent Relationships",
            visible: true,
            variant: "h6",
            spacing: 3.5,
          },
          {
            type: "Typography",
            label: "No. of times Dependents allowed",
            visible: true,
            variant: "h6",
            spacing: 3.5,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 4,
          },
          ...spreadAddMembersQuestionarie(),
        ],
        [
          {
            type: "Input",
            label: "Total No. of Self",
            value: "AdditionalDetails.IssuedCertificateDetails.TotalNoofSelf",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Total No. of Dependents",
            value: "AdditionalDetails.IssuedCertificateDetails.TotalNoofDependents",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Total No. of Lives",
            value: "AdditionalDetails.IssuedCertificateDetails.TotalNoOfLives",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "No. of Lives Added in Endorsement",
            value: "AdditionalDetails.IssuedCertificateDetails.NumbersofLivesAddedinEndorsment",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "No. of Lives Modified in Endorsement",
            value: "AdditionalDetails.IssuedCertificateDetails.NumbersofLivesModifiedinEndorsment",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "No. of Lives Deleted in Endorsement",
            value: "AdditionalDetails.IssuedCertificateDetails.NumbersofLivesDeletedinEndorsment",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Addition Premium Amount",
            value: "AdditionalDetails.IssuedCertificateDetails.AddtionPremiumAmount",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Deletion Premium Amount",
            value: "AdditionalDetails.IssuedCertificateDetails.DeletionPremiumAmount",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Maximum Risk Serial No. of Members",
            value: "AdditionalDetails.IssuedCertificateDetails.MaximumRiskSerialNumbersofMembers",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            justifyContent: "space-between",
            // visible:ProposerDetails.BusinessType !== "Rollover",
            visible: true,
            variant: "h6",
            radioLabel: {
              label: "Previous Insurance History?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "true" },
              { label: "No ", value: "false" },
            ],
            value: "SectionID",
            spacing: 5,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 7,
          },
          {
            type: "Input",
            label: "Previous Insurance Policy Type",
            visible: dto.SectionID === "true",
            value: "AdditionalDetails.PastPolicyDetails.PreviousInsurancePolicyType",
          },
          {
            type: "Input",
            label: "Previous Insurer Name",
            visible: dto.SectionID === "true",
            options: masters.SelfCovered,
            onChangeFuncs: [IsAlphaSpace],
            value: "AdditionalDetails.PastPolicyDetails.PreviousInsurerName",
          },
          {
            type: "Input",
            label: "Previous Insurer Address",
            value: "AdditionalDetails.PastPolicyDetails.PreviousInsurerAddress",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Policy Number",
            value: "AdditionalDetails.PastPolicyDetails.PolicyNumber",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "MDDatePicker",
            label: "Previous Policy Start Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "AdditionalDetails.PastPolicyDetails.PreviousPolicyStartdate",
            visible: dto.SectionID === "true",
          },
          {
            type: "MDDatePicker",
            label: "Previous Policy End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "AdditionalDetails.PastPolicyDetails.PreviousPolicyEnddate",
            visible: dto.SectionID === "true",
          },
          {
            type: "Input",
            label: "No. Of Claim",
            value: "AdditionalDetails.PastPolicyDetails.NoOfClaim",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Quantum of Claim",
            value: "AdditionalDetails.PastPolicyDetails.QuantumofClaim",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Incurred Claim Ratio",
            value: "AdditionalDetails.PastPolicyDetails.IncurredClaimRatio",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Checkbox",
            label: "Sales tax to be paid by the leader",
            value: "AdditionalDetails.CoinsuranceDetails.Salestaxtobepaidbytheleader",
            checkedVal: "Yes",
            unCheckedVal: "No",
            visible: true,
            variant: "h6",

            spacing: 10,
          },
          {
            type: "Checkbox",
            label: "Full commission to be paid by the leader",
            value: "AdditionalDetails.CoinsuranceDetails.Fullcommissiontobepaidbytheleader",
            checkedVal: "true",
            unCheckedVal: "false",
            visible: true,
            variant: "h6",
            // required: true,
            spacing: 10,
          },
          {
            type: "Checkbox",
            label: "S. Tax to be paid by leader",
            value: "AdditionalDetails.CoinsuranceDetails.STaxtobepaidbyleader",
            checkedVal: "true",
            unCheckedVal: "false",
            visible: true,
            variant: "h6",
            // required: true,
            spacing: 10,
          },
          {
            type: "Input",
            label: "Coinsurance Type",
            visible: true,
            value: "AdditionalDetails.CoinsuranceDetails.CoinsuranceType",
            // required: true,
          },
          {
            type: "Input",
            label: "Policy No. of the Leader",
            value: "AdditionalDetails.CoinsuranceDetails.PolicyNoofTheLeader",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Insurance Company",
            visible: true,
            value: "AdditionalDetails.CoinsuranceDetails.InsuranceCompany",
            // required: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Branch",
            value: "AdditionalDetails.CoinsuranceDetails.Branch",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            // required: true,
          },
          {
            type: "Input",
            label: "Address",
            value: "AdditionalDetails.CoinsuranceDetails.Address",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            // required: true,
          },
          {
            type: "Input",
            label: "Office Code",
            value: "AdditionalDetails.CoinsuranceDetails.OfficeCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Share(%)",
            value: "AdditionalDetails.CoinsuranceDetails.Share",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Coinsurer Type",
            visible: true,
            value: "AdditionalDetails.CoinsuranceDetails.CoinsurerType",
            options: masters.CoinsurerType,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Administrative Charges(%)",
            visible: true,
            value: "AdditionalDetails.CoinsuranceDetails.AdministrativeCharges",
            options: masters.AdministrativeCharges,
            // required: true,
            onChangeFuncs: [IsNumeric],
          },
        ],
      ];
      break;
    default:
      data = [[], []];
  }
  return data;
};
const getOnNextClick = async (activeStep) => {
  let fun = false;

  switch (activeStep) {
    case 0:
      fun = true;
      break;
    case 1:
      fun = true;
      break;

    case 2:
      topNavigate("/ListOfMaster");
      break;

    default:
      fun = true;
      break;
  }
  return fun;
};
const getButtonDetails = ({ activeStep, dto, setBackDropFlag }) => {
  let btnDetails = {};
  let MasterPolicyDto = {};
  const [partnerDto, setPartnerDto] = useState({
    BranchCode: "",
    BranchName: "",
    SalesPersonCode: "",
    SalesPersonName: "",
    cinnumber: "",
    email: "",
    fax: "",
    gst: true,
    gstnumber: "",
    isActive: true,
    mobile: "",
    pan: "",
    pannumber: "",
    partnerAddress: [
      {
        partnerAddressLine1: "",
        partnerAddressLine2: "",
        partnerAddressLine3: "",
        partnerAddressType: "",
        partnerCityId: 846,
        partnerCountryId: 1,
        partnerDistrictId: 65,
        partnerPincodeId: 10235,
        partnerStateId: 17,
      },
    ],
    partnerAddressLine1: "",
    partnerAddressLine2: "",
    partnerAddressLine3: "",
    partnerCityId: "",
    partnerClassId: 10,
    partnerCode: "",
    partnerCountryId: "",
    partnerDetails: "",
    partnerDistrictId: "",
    partnerName: "",
    partnerPincodeId: "",
    partnerStateId: "",
    partnerTypeId: 8,
    salutationId: 13,
    // salutationId: 13,
    telephone: "",
    website: "",
  });
  // let det = {};
  // let effectiveFromDate = dto.PolicyStartDate;
  // let effectiveToDate = dto.PolicyEndDate;
  // effectiveFromDate = moment(effectiveFromDate, "DD/MM/YYYY").format("MM/DD/YYYY");
  // effectiveToDate = moment(effectiveToDate, "DD/MM/YYYY").format("MM/DD/YYYY");
  const handlesave = async () => {
    const confirmationResult = await Swal.fire({
      html: `<p style="color: green; font-weight: bold; margin: 10px 0;">Are you sure you want to Save?</p>
      <p style="font-size: 12px;">The details can be updated until it is finally Submitted...</p>`,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: "Yes",
      showCloseButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "red",
      cancelButtonColor: "red",
      startIcon: <CloseIcon />,
      width: 700,
    });
    if (confirmationResult.isConfirmed) {
      setBackDropFlag(true);
      objectPath.set(dto, "Status", "Draft");

      console.log("dtooooo", dto);
      // det = objectPath.get(dto, "PlanDetailsJson").length;
      // if (det !== 0) {
      //   for (let i = 0; i < det; i += 1) {
      //     console.log("1111", objectPath.get(dto, "PlanDetailsJson"));
      //     objectPath.set(
      //       MasterPolicyDto,
      //       `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupID`,
      //       i + 1
      //     );
      //     objectPath.set(
      //       MasterPolicyDto,
      //       `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupType`,
      //       105
      //     );
      //     objectPath.set(
      //       MasterPolicyDto,
      //       `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupName`,
      //       objectPath.get(dto, `PlanDetailsJson.${i}.PlanName`)
      //     );
      //   }
      //   console.log("MasterPolicyDto1", MasterPolicyDto);
      // }
      partnerDto.mobile = dto.ProposerDetails.PermanentAddress.MobileNo;
      partnerDto.email = dto.ProposerDetails.EmailID;
      partnerDto.website = dto.ProposerDetails.AlternateEmailID;
      partnerDto.pan = dto.ProposerDetails.PANNo;
      partnerDto.partnerName = dto.ProposerDetails.FirstName;
      partnerDto.partnerAddress[0].partnerAddressLine1 =
        dto.ProposerDetails.PermanentAddress.Address1;
      partnerDto.partnerAddress[0].partnerAddressLine2 =
        dto.ProposerDetails.PermanentAddress.Address2;
      partnerDto.partnerAddress[0].partnerAddressLine3 =
        dto.ProposerDetails.PermanentAddress.Address3;
      setPartnerDto(partnerDto);
      const createpartner = await CreatePartner(partnerDto);
      console.log("Createeeeeee", createpartner);
      const policyStartDate = moment(dto.PolicyStartDate, "YYYY-MM-DD").format("MM/DD/YYYY");
      const policyEndDate = moment(dto.PolicyEndDate, "YYYY-MM-DD").format("MM/DD/YYYY");
      MasterPolicyDto = {
        assignProductID: 0,
        partnerId: createpartner.data.id, // create partner
        productId: 1022,
        ProductCode: "MagmaHospicash01",
        assignDate: moment(new Date()).format("YYYY-MM-DD"), // date
        effectiveFrom: policyStartDate, // formatted policy start date
        effectiveTo: policyEndDate, // formatted policy end date
        isActive: true,
        createBy: "",
        createDate: moment(new Date()).format("YYYY-MM-DD"), // date
        modifiedBy: "",
        modifiedDate: moment(new Date()).format("YYYY-MM-DD"), // date
        isPaymentReceived: true,
        lstProductId: [
          [
            {
              ProductId: 1022,
              SectionMapping: {
                MappedSections: [
                  {
                    GroupID: 428,
                    GroupType: 105,
                    GroupName: "",
                  },
                ],
              },
              MasterPolicy: "true",
              MasterPolicyDetails: objectPath.get(dto),
            },
          ],
        ],
      };
      const updatesequencenumberUHIDresponse = await UpdateSequenceNumber(
        "MasterPolicyNo",
        "MasterPolicyNo",
        "P0023000100/6115/",
        "",
        MasterPolicyDto
      );
      console.log("updatesequencenumberUHIDresponse", updatesequencenumberUHIDresponse);
      delete updatesequencenumberUHIDresponse.data.ProductCode;
      updatesequencenumberUHIDresponse.data.lstProductId[0][0].MasterPolicyDetails.MasterPolicyNo =
        updatesequencenumberUHIDresponse.data.MasterPolicyNo;
      const fun = await SaveProductMasterPolicy(updatesequencenumberUHIDresponse.data);
      console.log("fun", fun);
      if (fun.data.status === 2) {
        setBackDropFlag(false);
        await Swal.fire({
          html: `<img src=${POSPAAdded} alt="success image" style="display: block; margin: 0 auto;">
                 <p style="color: green; font-weight: bold; margin: 10px 0;">Master Policy number generated successfully</p>
                 <p style="color: green; font-weight: bold; margin: 10px 0;">MasterPolicyNo. : ${updatesequencenumberUHIDresponse.data.MasterPolicyNo} </p>`,
          showConfirmButton: true,
          allowOutsideClick: false,
          showCloseButton: true,
          confirmButtonColor: "red",
          width: 700,
          confirmButtonText: "Go to all Master Policies",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/ListOfMaster";
          }
        });
      } else {
        setBackDropFlag(false);
        await Swal.fire({
          html: `<p style="color: red; font-weight: bold; margin: 10px 0;">Something went wrong</p>`,
          showConfirmButton: true,
          allowOutsideClick: false,
          showCloseButton: true,
          confirmButtonColor: "red",
          width: 700,
          confirmButtonText: "Close",
        });
      }
    }
  };
  const handlesubmit = async () => {
    const confirmationResult = await Swal.fire({
      html: `<p style="color: green; font-weight: bold; margin: 10px 0;">Are you sure you want to Submit?</p>
      <p style="font-size: 12px;">The details cannot be modified later...</p>`,
      showCancelButton: true,
      allowOutsideClick: false,
      showCloseButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "red",
      cancelButtonColor: "red",
      width: 700,
    });
    if (confirmationResult.isConfirmed) {
      setBackDropFlag(true);
      objectPath.set(dto, "Status", "Draft");

      console.log("dtooooo", dto);
      // det = objectPath.get(dto, "PlanDetailsJson").length;
      // if (det !== 0) {
      //   for (let i = 0; i < det; i += 1) {
      //     console.log("1111", objectPath.get(dto, "PlanDetailsJson"));
      //     objectPath.set(
      //       MasterPolicyDto,
      //       `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupID`,
      //       i + 1
      //     );
      //     objectPath.set(
      //       MasterPolicyDto,
      //       `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupType`,
      //       105
      //     );
      //     objectPath.set(
      //       MasterPolicyDto,
      //       `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupName`,
      //       objectPath.get(dto, `PlanDetailsJson.${i}.PlanName`)
      //     );
      //   }
      //   console.log("MasterPolicyDto1", MasterPolicyDto);
      // }
      partnerDto.mobile = dto.ProposerDetails.PermanentAddress.MobileNo;
      partnerDto.email = dto.ProposerDetails.EmailID;
      partnerDto.website = dto.ProposerDetails.AlternateEmailID;
      partnerDto.pan = dto.ProposerDetails.PANNo;
      partnerDto.partnerName = dto.ProposerDetails.FirstName;
      partnerDto.partnerAddress[0].partnerAddressLine1 =
        dto.ProposerDetails.PermanentAddress.Address1;
      partnerDto.partnerAddress[0].partnerAddressLine2 =
        dto.ProposerDetails.PermanentAddress.Address2;
      partnerDto.partnerAddress[0].partnerAddressLine3 =
        dto.ProposerDetails.PermanentAddress.Address3;
      setPartnerDto(partnerDto);
      const createpartner = await CreatePartner(partnerDto);
      console.log("Createeeeeee", createpartner);
      const policyStartDate = moment(dto.PolicyStartDate, "YYYY-MM-DD").format("MM/DD/YYYY");
      const policyEndDate = moment(dto.PolicyEndDate, "YYYY-MM-DD").format("MM/DD/YYYY");
      MasterPolicyDto = {
        assignProductID: 0,
        partnerId: createpartner.data.id, // create partner
        productId: 1022,
        ProductCode: "MagmaHospicash01",
        assignDate: moment(new Date()).format("YYYY-MM-DD"), // date
        effectiveFrom: policyStartDate, // formatted policy start date
        effectiveTo: policyEndDate, // formatted policy end date
        isActive: true,
        createBy: "",
        createDate: moment(new Date()).format("YYYY-MM-DD"), // date
        modifiedBy: "",
        modifiedDate: moment(new Date()).format("YYYY-MM-DD"), // date
        isPaymentReceived: true,
        lstProductId: [
          [
            {
              ProductId: 1022,
              SectionMapping: {
                MappedSections: [
                  {
                    GroupID: 428,
                    GroupType: 105,
                    GroupName: "",
                  },
                ],
              },
              MasterPolicy: "true",
              MasterPolicyDetails: objectPath.get(dto),
            },
          ],
        ],
      };
      const updatesequencenumberUHIDresponse = await UpdateSequenceNumber(
        "MasterPolicyNo",
        "MasterPolicyNo",
        "P0023000100/6115/",
        "",
        MasterPolicyDto
      );
      console.log("updatesequencenumberUHIDresponse", updatesequencenumberUHIDresponse);
      delete updatesequencenumberUHIDresponse.data.ProductCode;
      updatesequencenumberUHIDresponse.data.lstProductId[0][0].MasterPolicyDetails.MasterPolicyNo =
        updatesequencenumberUHIDresponse.data.MasterPolicyNo;
      const fun = await SaveProductMasterPolicy(updatesequencenumberUHIDresponse.data);
      console.log("fun", fun);
      if (fun.data.status === 2) {
        setBackDropFlag(false);
        await Swal.fire({
          html: `<img src=${POSPAAdded} alt="success image" style="display: block; margin: 0 auto;">
          <p style="color: green; font-weight: bold; margin: 10px 0;">Master Policy number generated successfully</p>
          <p style="color: green; font-weight: bold; margin: 10px 0;">MasterPolicyNo. : ${updatesequencenumberUHIDresponse.data.MasterPolicyNo} </p>`,
          showConfirmButton: true,
          allowOutsideClick: false,
          showCloseButton: true,
          confirmButtonColor: "red",
          width: 700,
          confirmButtonText: "Go to all Master Policies",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/ListOfMaster";
          }
        });
      } else {
        setBackDropFlag(false);
        await Swal.fire({
          html: `<p style="color: red; font-weight: bold; margin: 10px 0;">Something went wrong</p>`,
          showConfirmButton: true,
          allowOutsideClick: false,
          showCloseButton: true,
          confirmButtonColor: "red",
          width: 700,
          confirmButtonText: "Close",
        });
      }
    }
  };

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Back", visible: false },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Next",
          visible: true,
          loader: "backDrop",
        },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Back", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Next",
          visible: true,
          loader: "backDrop",
        },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Back", visible: true },
        reset: { label: "Reset", visible: false },
        button2: {
          label: "Save as Draft",
          visible: true,
          loader: "backDrop",
          onClick: handlesave,
        },
        button1: {
          label: "Submit",
          visible: true,
          loader: "backDrop",
          onClick: handlesubmit,
        },
        next: {
          label: "Go to all Master Policies",
          visible: true,
          loader: "backDrop",
        },
      };
      break;
    default:
      btnDetails = {
        prev: { label: "Back", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Next",
          visible: true,
          loader: "backDrop",
        },
      };
      break;
  }
  return btnDetails;
};

export { getProcessSteps, getPageContent, getSectionContent, getOnNextClick, getButtonDetails };
