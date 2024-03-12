import { DateFormatFromStringDate, formatCurrency } from "../../../../../../../Common/Validations";

const checkForValue = (value) => value === "" || value === undefined || value === null;

const gridStyle = {
  boxShadow: 2,
  border: 2,
  borderColor: "primary.light",
  "& .MuiDataGrid-cell:hover": {
    color: "primary.main",
  },
};

export default function ProposalForm({
  tab,
  dto,
  PPDColumns,
  NonPPDColumns,
  memberTab,
  setMemberTab,
}) {
  const proposalDto = dto.QuotationData[tab];

  const spreadFamilyHistory = () => {
    const arr = [];
    proposalDto?.InsurableItem?.[0]?.RiskItems?.[memberTab]?.FamilyHistory?.forEach((x, i) => {
      arr.push(
        {
          type: "AutoComplete",
          visible: true,
          label: "Relation",

          path: `InsurableItem.0.RiskItems.${memberTab}.FamilyHistory.${i}.Relation`,
        },
        {
          type: "AutoComplete",
          visible: true,

          label: "Living / Dead",
          path: `InsurableItem.0.RiskItems.${memberTab}.FamilyHistory.${i}.LivingDead`,
        },
        {
          type: "Input",
          visible: true,
          required: true,
          label: `Age ${x.LivingDead === "Dead" ? "of Death" : ""}`,
          spacing: 2.5,
          path: `InsurableItem.0.RiskItems.${memberTab}.FamilyHistory.${i}.Age`,
          inputType: "number",
          // maxLength: 2,
        },
        {
          type: "Typography",
          label: "",
          visible: x.LivingDead !== "Living" && x.LivingDead !== "Dead",
          spacing: 2.5,
        },
        {
          type: "AutoComplete",
          label: "State of Health",
          visible: x.LivingDead === "Living",
          required: true,
          spacing: 2.5,
          path: `InsurableItem.0.RiskItems.${memberTab}.FamilyHistory.${i}.HealthStatus`,
        },
        {
          type: "Input",
          label: "Cause of Death",
          visible: x.LivingDead === "Dead",
          required: true,
          spacing: 2.5,
          path: `InsurableItem.0.RiskItems.${memberTab}.FamilyHistory.${i}.CauseOfDeath`,
        }
      );
    });
    return arr;
  };

  const memberTabNode = [
    {
      type: "Tabs",
      value: memberTab,
      visible: true,
      customOnChange: (e, newValue) => setMemberTab(newValue),
      tabs: proposalDto?.InsurableItem?.[0]?.RiskItems.map((elem, index) => ({
        value: index,
        label: elem.Name !== "" ? elem.Name : "Main Life",
      })),
      spacing: proposalDto?.InsurableItem?.[0]?.RiskItems
        ? proposalDto.InsurableItem[0].RiskItems.length * 2.4
        : 12,
    },
    { type: "Typography", spacing: 12, visible: true },
  ];

  return [
    [
      { type: "Input", spacing: 3, label: "Product", path: "Product", visible: true },
      {
        type: "CurrencyInput",
        spacing: 3,
        label: "Purchase Price",
        path: "PurchasePrice",
        visible: !checkForValue(proposalDto?.PurchasePrice),
      },
      {
        type: "CurrencyInput",
        spacing: 3,
        label: "Sum Assured",
        path: "SumAssured",
        visible: !checkForValue(proposalDto?.SumAssured),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Policy Term",
        path: "PolicyTerm",
        visible: !checkForValue(proposalDto?.PolicyTerm),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Premium Paying Term",
        path: "PremiumPayingTerm",
        visible: !checkForValue(proposalDto?.PremiumPayingTerm),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Pension Mode",
        path: "PensionMode",
        visible: !checkForValue(proposalDto?.PensionMode),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Preferred Mode",
        path: "PreferredMode",
        visible: !checkForValue(proposalDto?.PreferredMode),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Benefit Option",
        path: "BenefitOption",
        visible: !checkForValue(proposalDto?.BenefitOption),
      },
      {
        type: "Input",
        spacing: 6,
        label: "Annuity Option",
        path: "AnnuityOption",
        visible: !checkForValue(proposalDto?.AnnuityOption),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Policy Type",
        path: "PolicyType",
        visible: !checkForValue(proposalDto?.PolicyType),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Premium Type",
        path: "PremiumType",
        visible: !checkForValue(proposalDto?.PremiumType),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Annuity Type",
        path: "AnnuityType",
        visible: !checkForValue(proposalDto?.AnnuityType),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Police Personnel",
        path: "PolicePersonnel",
        visible: !checkForValue(proposalDto?.PolicePersonnel),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Death SA Options",
        path: "DeathSAOption",
        visible: !checkForValue(proposalDto?.DeathSAOption),
      },
      {
        type: "Input",
        spacing: 3,
        label: "Nach",
        path: "Nach",
        visible: !checkForValue(proposalDto?.Nach),
      },
      {
        type: "MDDatePicker",
        spacing: 3,
        label: "Commencement Date",
        path: "DateOfCommencement",
        dateFormat: "Y-m-d",
        altFormat: "d-m-Y",
        visible: !checkForValue(proposalDto?.DateOfCommencement),
      },
    ],
    [
      {
        type: "AutoComplete",
        visible: false,
        label: "Salutation",
        path: "ProposerDetails.Salutation",
        spacing: 3,
      },
      {
        type: "Input",
        visible: true,
        label: "First Name",
        path: "ProposerDetails.FirstName",
        spacing: 3,
      },
      {
        type: "Input",
        visible: true,
        label: "Middle Name",
        path: "ProposerDetails.MiddleName",
        spacing: 3,
      },
      {
        type: "Input",
        visible: true,
        label: "Last Name",
        path: "ProposerDetails.LastName",
        spacing: 3,
      },
      {
        type: "Input",
        visible: true,
        label: "Father's Name",
        path: "ProposerDetails.FatherName",
        spacing: 3,
      },
      {
        type: "Input",
        visible: true,
        label: "Mother's Name",
        path: "ProposerDetails.MotherName",
        spacing: 3,
      },
      {
        type: "Input",
        visible: true,
        label: "Mobile No.",
        path: "ProposerDetails.ContactNo",
        spacing: 3,
      },
      {
        type: "Input",
        visible: true,
        label: "WhatsApp No.",
        path: "ProposerDetails.WhatsAppNo",
        spacing: 3,
      },
      {
        label: "Email Id",
        visible: true,
        path: `ProposerDetails.EmailId`,
        type: "Input",
        required: true,
      },
      {
        label: "Gender",
        path: `ProposerDetails.Gender`,
        visible: true,
        type: "AutoComplete",

        disabled: true,
      },
      {
        label: "Date of Birth",
        path: `ProposerDetails.DOB`,
        visible: true,
        type: "MDDatePicker",
        maxDate: new Date(),
        disabled: true,
        dateFormat: "Y-m-d",
      },
      {
        label: "Marital Status",
        path: `ProposerDetails.MaritalStatus`,
        visible: true,
        type: "AutoComplete",
        options: [],
      },
      {
        label: "Resident Status",
        visible: true,
        path: `ProposerDetails.ResidentStatus`,
        type: "Input",
      },
      {
        label: "Country of Residency",
        visible: dto.QuotationData?.[tab]?.ProposerDetails?.ResidentStatus !== "Resident Indian",
        path: `ProposerDetails.CountryOfResidency`,
        type: "Input",
      },

      {
        label: "PAN No.",
        visible: true,
        path: `ProposerDetails.PANNo`,
        type: "Input",
      },
    ],
    [
      { type: "Typography", label: "Permanent Address", spacing: 12, visible: true },
      {
        label: "Address 1",
        path: "ProposerDetails.PermanentAddress.AddressLine1",
        visible: true,
        type: "Input",
        required: true,
        disabled: true,
      },
      {
        label: "Address 2",
        path: `ProposerDetails.PermanentAddress.AddressLine2`,
        visible: true,
        type: "Input",
        disabled: true,
      },
      {
        label: "Address 3",
        path: `ProposerDetails.PermanentAddress.AddressLine3`,
        visible: true,
        type: "Input",
        disabled: true,
      },
      {
        label: "Country",
        path: `ProposerDetails.PermanentAddress.Country`,
        visible: true,
        type: "AutoComplete",
        required: true,

        disabled: true,
      },
      {
        label: "State",
        path: `ProposerDetails.PermanentAddress.State`,
        visible: true,
        type: "AutoComplete",
        required: true,

        disabled: true,
      },
      {
        label: "District",
        path: `ProposerDetails.PermanentAddress.District`,
        visible: true,
        type: "AutoComplete",

        disabled: true,
      },
      {
        label: "City",
        path: `ProposerDetails.PermanentAddress.City`,
        visible: true,
        type: "AutoComplete",

        disabled: true,
      },
      {
        label: "Pincode",
        path: `ProposerDetails.PermanentAddress.Pincode`,
        visible: true,
        type: "Input",
        // required: true,
        // options: getMaster("Pincode"),
        // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.City),
        // customOnChange: (e, a) =>
        //   locationMasters("Pincode", a, `RiskItems.${tab}.PermanentAddress`),
        disabled: true,
      },
      { type: "Typography", label: "Communication Address", spacing: 12, visible: true },
      {
        type: "Checkbox",
        spacing: 12,
        visible: true,
        label: "Is communication address same as permanent address?",
        path: `ProposerDetails.sameComAddress`,
        checkedVal: true,
      },
      ...[
        {
          label: "Address 1",
          path: `ProposerDetails.CommunicationAddress.AddressLine1`,
          visible: true,
          type: "Input",
        },
        {
          label: "Address 2",
          path: `ProposerDetails.CommunicationAddress.AddressLine2`,
          visible: true,
          type: "Input",
        },
        {
          label: "Address 3",
          path: `ProposerDetails.CommunicationAddress.AddressLine3`,
          visible: true,
          type: "Input",
        },
        {
          label: "Country",
          path: `ProposerDetails.CommunicationAddress.Country`,
          visible: true,
          type: "Input",
        },
        {
          label: "State",
          path: `ProposerDetails.CommunicationAddress.State`,
          visible: true,
          type: "Input",
        },
        {
          label: "District",
          path: `ProposerDetails.CommunicationAddress.District`,
          visible: true,
          type: "Input",
        },
        {
          label: "City",
          path: `ProposerDetails.CommunicationAddress.City`,
          visible: true,
          type: "Input",
        },
        {
          label: "Pincode",
          path: `ProposerDetails.CommunicationAddress.Pincode`,
          visible: true,
          type: "Input",
        },
      ].map((x) => ({
        ...x,
        disabled: proposalDto?.ProposerDetails?.sameComAddress === true,
      })),

      {
        type: "RadioGroup",
        visible: true,
        path: `ProposerDetails.ForeignAddress.OCI`,
        radioLabel: {
          labelVisible: true,
          label: "Are you holding valid Overseas Citizen of India card(OCI Card)",
          fontSize: "1rem",
          fontWeight: 600,
        },
        radioList: [
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ],
        justifyContent: "space-between",
        spacing: 8,
      },
      {
        type: "Typography",
        label: "Address outside India (Applicable only for NRI/FNIO)",
        spacing: 12,
        visible: proposalDto?.ProposerDetails?.ForeignAddress?.OCI === "Yes",
      },
      ...[
        {
          label: "Address 1",
          path: `ProposerDetails.ForeignAddress.AddressLine1`,
          type: "Input",
        },
        {
          label: "Address 2",
          path: `ProposerDetails.ForeignAddress.AddressLine2`,
          type: "Input",
        },
        {
          label: "Address 3",
          path: `ProposerDetails.ForeignAddress.AddressLine3`,
          type: "Input",
        },
        {
          label: "Country",
          path: `ProposerDetails.ForeignAddress.Country`,
          type: "Input",
        },
        {
          label: "State",
          path: `ProposerDetails.ForeignAddress.State`,
          type: "Input",
        },
        {
          label: "District",
          path: `ProposerDetails.ForeignAddress.District`,
          type: "Input",
        },
        {
          label: "City",
          path: `ProposerDetails.ForeignAddress.City`,
          type: "Input",
        },
        {
          label: "Pincode",
          path: `ProposerDetails.ForeignAddress.Pincode`,
          type: "Input",
        },
      ].map((x) => ({
        ...x,
        visible: proposalDto?.ProposerDetails?.ForeignAddress?.OCI === "Yes",
      })),
    ],
    [
      ...memberTabNode,

      {
        path: `InsurableItem.0.RiskItems.${memberTab}.Occupation.PresentOccupation`,
        label: "Present Occupation",
        visible: true,
        type: "AutoComplete",
        spacing: 3,
        // options: masters.Occupation,
        // customOnChange: onOccpation,
      },
      {
        path: `InsurableItem.0.RiskItems.${memberTab}.Occupation.NatureOfDuty`,
        label: "Exact Nature of duties",
        visible: true,
        type: "AutoComplete",
        spacing: 3,
        // options: masters.NatureOfDuty,
        // customOnChange: onNatureOfDuty,
      },
      {
        path: `InsurableItem.0.RiskItems.${memberTab}.Occupation.SourceOfIncome`,
        label: "Source of Income",
        visible: true,
        type: "AutoComplete",
        spacing: 3,
        // options: masters.SourceOfIncome,
        required: true,
        // customOnChange: onSourceOfIncome,
      },

      {
        path: `InsurableItem.0.RiskItems.${memberTab}.Occupation.EducationalQualification`,
        label: "Educational qualification",
        visible: true,
        type: "AutoComplete",
        spacing: 3,
        // options: masters.EducationalQualification,
        required: true,
        endAdornmentIcon: "school",
        disableClearable: true,
      },
      {
        path: `InsurableItem.0.RiskItems.${memberTab}.Occupation.Experience`,
        label: "Length of service (Months)",
        visible: true,
        type: "Input",
        inputType: "number",
        spacing: 3,
      },

      {
        path: `InsurableItem.0.RiskItems.${memberTab}.Occupation.EmployerName`,
        label: "Name of the present employer",
        visible: true,
        type: "Input",
        spacing: 3,
        onChangeFuncs: ["IsAlpha"],
      },

      {
        path: `InsurableItem.0.RiskItems.${memberTab}.Occupation.AnnualIncome1`,
        label: "Annual Income 2022-2023",
        visible: true,
        type: "CurrencyInput",
        spacing: 3,
        required: true,
      },
      {
        path: `InsurableItem.0.RiskItems.${memberTab}.Occupation.AnnualIncome2`,
        label: "Annual Income 2021-2022",
        visible: true,
        type: "CurrencyInput",
        spacing: 3,
        required: true,
      },
      {
        path: `InsurableItem.0.RiskItems.${memberTab}.Occupation.AnnualIncome3`,
        label: "Annual Income 2020-2021",
        visible: true,
        type: "CurrencyInput",
        spacing: 3,
        required: true,
      },
    ],
    [
      ...memberTabNode,
      {
        type: "Typography",
        visible: true,
        label: "LIC Previous Policy",
        variant: "h5",
        spacing: 12,
      },

      {
        type: "DataGrid",
        visible:
          proposalDto?.InsurableItem[0]?.RiskItems?.[memberTab]?.PreviousPolicyDetails?.length > 0,

        spacing: 12,
        columns: PPDColumns,
        value: proposalDto?.InsurableItem[0]?.RiskItems?.[memberTab]?.PreviousPolicyDetails?.map(
          (x, i) => ({
            ...x,
            id: i,
            insurer: "LIC",
            policyno: `XXXXXX${x.policyno?.slice(-3)}`,
            sumassured: formatCurrency(x.sumassured),
            commencementdate: DateFormatFromStringDate(x.commencementdate, "y-m-d", "d/m/y"),
          })
        ),
        // hideFooterPagination: true,
        // hideFooterSelectedRowCount: true,
        rowId: "id",
        sx: gridStyle,
      },
      {
        type: "Typography",
        visible:
          proposalDto?.InsurableItem[0]?.RiskItems?.[memberTab]?.PreviousPolicyDetails?.length ===
          0,

        label: "No Previous Policies",
        variant: "h5",
        spacing: 12,
        color: "error",
        sx: { textAlign: "center" },
      },

      {
        type: "Divider",
        visible: true,
        spacing: 12,
      },
      {
        type: "Typography",
        visible: true,
        label: "Other Insurer Previous Policy",
        variant: "h5",
        spacing: 12,
      },

      {
        type: "DataGrid",
        visible:
          proposalDto?.InsurableItem[0]?.RiskItems?.[memberTab]?.NonLICPreviousPolicyDetails
            ?.length > 0,
        spacing: 12,
        columns: NonPPDColumns,
        value: proposalDto?.InsurableItem[0]?.RiskItems?.[
          memberTab
        ]?.NonLICPreviousPolicyDetails?.map((x, i) => ({
          ...x,
          id: i,
        })),
        // hideFooterPagination: true,
        // hideFooterSelectedRowCount: true,
        rowId: "id",
        sx: gridStyle,
      },
      {
        type: "Typography",
        visible:
          proposalDto?.InsurableItem[0]?.RiskItems?.[memberTab]?.NonLICPreviousPolicyDetails
            ?.length === 0,
        label: "No Previous Policies",
        variant: "h5",
        spacing: 12,
        color: "error",
        sx: { textAlign: "center" },
      },
    ],
    [...memberTabNode, ...spreadFamilyHistory()],

    [
      { type: "Typography", visible: true, label: "NEFT", spacing: 12, variant: "h5" },
      {
        type: "Input",
        visible: true,
        label: "IFS Code",
        path: `ProposerDetails.BankDetails.IFSCode`,
      },
      {
        type: "Input",
        visible: true,
        label: "Account Number",
        path: `ProposerDetails.BankDetails.AccountNo`,
      },
      {
        type: "Input",
        visible: true,
        label: "Account Holder's Name",
        path: `ProposerDetails.BankDetails.HolderName`,
      },
      {
        type: "AutoComplete",
        visible: true,
        label: "Account Type",
        path: `ProposerDetails.BankDetails.AccountType`,
      },
      {
        type: "Input",
        visible: true,
        label: "Bank Name",
        path: `ProposerDetails.BankDetails.BankName`,
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Bank Branch",
        path: `ProposerDetails.BankDetails.Branch`,
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Branch Address",
        path: `ProposerDetails.BankDetails.BranchAddress`,
        disabled: true,
      },
      {
        type: "Typography",
        visible: proposalDto?.ProposerDetails?.IsNach === "Yes",
        label: "NACH",
        spacing: 12,
        variant: "h5",
      },

      {
        type: "RadioGroup",
        visible: proposalDto?.ProposerDetails?.IsNach === "Yes",
        path: `ProposerDetails.BankDetails.NachSameAsNeft`,
        radioLabel: {
          labelVisible: true,
          label: "Is NACH Account same as NEFT?",
          fontSize: "1rem",
        },
        radioList: [
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ],
        spacing: 12,
      },

      ...[
        {
          type: "Input",
          label: "IFS Code",
          path: `ProposerDetails.BankDetails.NachIFSCode`,
        },
        {
          type: "Input",
          label: "Account Number",
          path: `ProposerDetails.BankDetails.NachAccountNo`,
        },
        {
          type: "Input",
          label: "Account Holder's Name",
          path: `ProposerDetails.BankDetails.NachHolderName`,
        },
        {
          type: "AutoComplete",
          label: "Account Type",
          path: `ProposerDetails.BankDetails.NachAccountType`,
        },
        {
          type: "Input",
          label: "Bank Name",
          path: `ProposerDetails.BankDetails.NachBankName`,
          disabled: true,
        },
        {
          type: "Input",
          label: "Bank Branch",
          path: `ProposerDetails.BankDetails.NachBranch`,
          disabled: true,
        },
        {
          type: "Input",
          label: "Branch Address",
          path: `ProposerDetails.BankDetails.NachBranchAddress`,
          disabled: true,
        },
      ].map((x) => ({
        ...x,
        visible: proposalDto?.ProposerDetails?.IsNach === "Yes",
      })),
    ],
  ].map((x1) =>
    x1.map((x2) => ({ ...x2, required: false, path: `QuotationData.${tab}.${x2.path}` }))
  );
}
