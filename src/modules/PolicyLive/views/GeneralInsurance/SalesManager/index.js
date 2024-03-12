import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Grid,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import swal from "sweetalert";

import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";

import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";

// import colors from "../../../../../assets/theme/base/colors";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import { GetProdPartnermasterData, SaveQuotation, ExecuteProcedure } from "../data";
import MDLoader from "../../../../../components/MDLoader";
import { json, DocDetails, mast, summary } from "../data/json";
import { arrayRange } from "../../../../../Common/Validations";
import ColorsSetting from "../../../../../assets/themes/BrokerPortal/ColorsSetting";

export default function SalesManager() {
  const bgColor = ColorsSetting().info.main;
  const textColor = ColorsSetting().white.focus;
  const spacing = 3;
  const [dto, setDto] = useState({ ...json });
  const [loader, setLoader] = useState(false);
  const [masters, setMasters] = useState({
    BusinessType: [],
    GroupType: [],
    TermType: [],
    SubLimitApplicable: [],
    Installments: [],
    InstallmentType: [],
    BranchName: [],
    Channel: [],
    IndustryName: [],
    TPAName: [],
    CorpName: [],
    CorpShortName: [],
    CorpWebsite: [],
    CorpPANNo: [],
    SlabWiseDetails1: {},
  });

  useEffect(async () => {
    const obj = {
      MasterJson: {
        RowId: null,
        LocationId: null,
        Location: null,
        SumInsured: null,
        RelationWithProposer: null,
        AgeBand: [],
        Gender: [],
        IgnoreColumn: ["Age", "Id"],
      },
      QuoteJson: null,
    };
    const arr1 = [];
    mast.AgeBand.forEach((x) => {
      arr1.push({ Value: x.mID, Name: x.mValue });
    });
    const arr2 = [];
    mast.Gender.forEach((x) => {
      arr2.push({ Value: x.mID, Name: x.mValue });
    });
    obj.MasterJson.AgeBand = arr1;
    obj.MasterJson.Gender = arr2;
    const res = await ExecuteProcedure("po.usp_GetHeadCountPivot", obj);
    console.log("resMasters", res);
    masters.SlabWiseDetails1 = { ...res.finalResult.SlabwiseDetails[0] };
    setMasters({ ...masters });
  }, []);

  const onCorporateShortName = (e, v) => {
    dto.CorporateDetails.CorporateID = v.mID;
    dto.CorporateDetails.CorporateShortName = v.mValue;
    dto.CorporateDetails.CorporateName = masters.CorpName.filter((x) => x.mID === v.mID)[0].mValue;
    dto.CorporateDetails.CorporateWebSite = masters.CorpWebsite.filter(
      (x) => x.mID === v.mID
    )[0].mValue;
    dto.CorporateDetails.CorporatePANNo = masters.CorpPANNo.filter(
      (x) => x.mID === v.mID
    )[0].mValue;
    setDto({ ...dto });
  };

  const onAddDocument = () => {
    dto.DocumentDetails = [
      ...dto.DocumentDetails,
      { ...DocDetails, DocumentId: dto.DocumentDetails.length + 1 },
    ];
    setDto({ ...dto });
  };

  console.log("dto", dto);

  const onNoOfLocations = (e, v) => {
    const arr1 = [];
    const arr3 = [];

    const arr4 = arrayRange(1, v.mValue, 1);
    arr4.forEach((x, i) => {
      arr1.push({ data: [...summary()], id: i + 1 });
      arr3.push({ ...masters.SlabWiseDetails1, LocationID: i + 1, RowId: i });
    });

    dto.InsurableItem[0].RiskSummary.Summary = [...arr1];
    dto.InsurableItem[0].RiskSummary.SlabWiseDetails = [...arr3];
    dto.InsurableItem[0].RiskItems[0].NoOfLocations = v.mValue;

    setDto({
      ...dto,
    });
  };

  const createAgeSlab = () => {
    const arr1 = [];
    mast.AgeBand.forEach((x1, i1) => {
      arr1.push({
        groupId: x1.mID,
        description: "",
        children: [{ field: `AgeBand${i1 + 1}M` }, { field: `AgeBand${i1 + 1}F` }],
        headerAlign: "center",
      });
    });
    return arr1;
  };

  const onMemberCountEnter = (e, id, locID) => {
    let maleCount = 0;
    let femaleCount = 0;
    dto.InsurableItem[0].RiskSummary.SlabWiseDetails[id][e.target.name] = e.target.value;

    dto.InsurableItem[0].RiskSummary.SlabWiseDetails.forEach((x1) => {
      if (locID === x1.LocationID) {
        Object.keys(x1).forEach((x2, i2) => {
          maleCount +=
            parseInt(x1[`AgeBand${i2 + 1}M`], 10) > 0 ? parseInt(x1[`AgeBand${i2 + 1}M`], 10) : 0;
          femaleCount += parseInt(x1[`AgeBand${i2 + 1}F`], 10)
            ? parseInt(x1[`AgeBand${i2 + 1}F`], 10)
            : 0;
        });
      }
    });
    dto.InsurableItem[0].RiskSummary.Summary[locID - 1].data[2].Value = maleCount + femaleCount;
    dto.InsurableItem[0].RiskSummary.Summary[locID - 1].data[4].Value = femaleCount;
    dto.InsurableItem[0].RiskSummary.Summary[locID - 1].data[7].Value = maleCount;
    dto.InsurableItem[0].RiskSummary.Summary[locID - 1].data[5].Value = maleCount + femaleCount;

    setDto({ ...dto });
  };

  const onDeleteMemberRow = (rowId) => {
    const arr = dto.InsurableItem[0].RiskSummary.SlabWiseDetails.filter((x) => x.RowId !== rowId);
    dto.InsurableItem[0].RiskSummary.SlabWiseDetails = [...arr];
    arr.forEach((x, i) => {
      dto.InsurableItem[0].RiskSummary.SlabWiseDetails[i].RowId = i;
    });
    setDto({ ...dto });
  };
  const createMemberColumns = () => {
    const arr1 = [
      {
        field: "SI/AgeBand",
        headerName: "SI/AgeBand  ",
        renderCell: (p) => (
          <MDInput
            value={p.row.SumInsured}
            type="number"
            name="SumInsured"
            onChange={(e) => onMemberCountEnter(e, p.row.RowId, p.row.LocationID)}
          />
        ),
        headerAlign: "center",
        width: 200,
      },
    ];
    mast.AgeBand.forEach((x1, i1) => {
      arr1.push(
        {
          field: `AgeBand${i1 + 1}M`,
          headerName: `M`,
          renderCell: (p) => (
            <MDInput
              value={p.row[`AgeBand${i1 + 1}M`]}
              type="number"
              name={`AgeBand${i1 + 1}M`}
              onChange={(e) => onMemberCountEnter(e, p.row.RowId, p.row.LocationID)}
            />
          ),
          headerAlign: "center",
          width: 100,
        },
        {
          field: `AgeBand${i1 + 1}F`,
          headerName: `F`,
          renderCell: (p) => (
            <MDInput
              value={p.row[`AgeBand${i1 + 1}F`]}
              name={`AgeBand${i1 + 1}F`}
              type="number"
              onChange={(e) => onMemberCountEnter(e, p.row.RowId, p.row.LocationID)}
            />
          ),
          headerAlign: "center",
          width: 100,
        }
      );
    });
    arr1.push({
      field: "Family Definition",
      headerName: "Family Definition",
      renderCell: (p) => (
        <MDInput
          value={p.row.RelationWithProposer}
          name="RelationWithProposer"
          onChange={(e) => onMemberCountEnter(e, p.row.RowId, p.row.LocationID)}
        />
      ),
      width: 200,
    });
    arr1.push({
      field: "Action",
      headerName: "Delate",
      renderCell: (p) => (
        <IconButton onClick={() => onDeleteMemberRow(p.row.RowId)}>
          <DeleteIcon />
        </IconButton>
      ),
      width: 100,
    });

    return arr1;
  };

  const onAddMembersRow = (locId) => {
    const arr1 = dto.InsurableItem[0].RiskSummary.SlabWiseDetails;
    let LocationValue = "";

    dto.InsurableItem[0].RiskSummary.Summary.forEach((x) => {
      if (x.id === locId) LocationValue = x.data[0].Value;
    });
    dto.InsurableItem[0].RiskSummary.SlabWiseDetails.push({
      ...masters.SlabWiseDetails1,
      RowId: arr1.length,
      LocationID: locId,
      Location: LocationValue,
    });
    setDto({ ...dto });
  };

  const onLocation = (e, locID) => {
    dto.InsurableItem[0].RiskSummary.SlabWiseDetails.forEach((x1, i1) => {
      if (locID === x1.LocationID)
        dto.InsurableItem[0].RiskSummary.SlabWiseDetails[i1].Location = e.target.value;
    });
    dto.InsurableItem[0].RiskSummary.Summary.forEach((x1, i1) => {
      if (x1.id === locID)
        dto.InsurableItem[0].RiskSummary.Summary[i1].data[0].Value = e.target.value;
    });
    setDto({ ...dto });
  };

  const spreadMemberSummary = () => {
    const arr1 = [];

    dto.InsurableItem[0].RiskSummary.Summary.forEach((x1, i1) => {
      arr1.push(
        {
          type: "Input",
          visible: true,
          label: `Location ${i1 + 1}`,
          value: dto.InsurableItem[0].RiskSummary.SlabWiseDetails[i1].Location,
          customOnChange: (e) => onLocation(e, x1.id),
        },
        { type: "Typography", spacing: 12, visible: true, label: "" },
        {
          type: "Button",
          spacing: 12,
          visible: true,
          label: "Add",
          onClick: () => onAddMembersRow(x1.id),
        },

        {
          type: "DataGrid",
          visible: true,
          spacing: 12,
          columns: [...createMemberColumns(i1)],
          value: dto.InsurableItem[0].RiskSummary.SlabWiseDetails.filter(
            (x2) => x2.LocationID === x1.id
          ),
          rowId: "RowId",
          columnGroupingModel: [...createAgeSlab()],
        },
        { type: "Typography", visible: true, label: "Number of Employees" },
        {
          type: "Input",
          visible: true,
          label: "Total",
          path: `InsurableItem.0.RiskSummary.Summary.${i1}.data.2.Value`,
          disabled: true,
        },
        {
          type: "Input",
          visible: true,
          label: "Male",
          path: `InsurableItem.0.RiskSummary.Summary.${i1}.data.7.Value`,
          disabled: true,
        },
        {
          type: "Input",
          visible: true,
          label: "Female",
          path: `InsurableItem.0.RiskSummary.Summary.${i1}.data.4.Value`,
          disabled: true,
        },

        { type: "Typography", visible: true, label: "Number of Dependents" },
        {
          type: "Input",
          visible: true,
          label: "Total",
          path: `InsurableItem.0.RiskSummary.Summary.${i1}.data.1.Value`,
          disabled: true,
        },
        {
          type: "Input",
          visible: true,
          label: "Male",
          path: `InsurableItem.0.RiskSummary.Summary.${i1}.data.6.Value`,
          disabled: true,
        },
        {
          type: "Input",
          visible: true,
          label: "Female",
          path: `InsurableItem.0.RiskSummary.Summary.${i1}.data.3.Value`,
          disabled: true,
        },

        {
          type: "Input",
          visible: true,
          label: "Number of lives covered",
          path: `InsurableItem.0.RiskSummary.Summary.${i1}.data.5.Value`,
          disabled: true,
        },
        { type: "Divider", visible: true, label: "", spacing: 12 }
      );
    });

    return arr1;
  };

  const topCom = [
    {
      type: "AutoComplete",
      visible: true,
      label: "Business Type",
      options: masters.BusinessType,
      path: "BusinessType",
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Group Type",
      options: masters.GroupType,
      path: "GroupType",
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Branch",
      options: masters.BranchName,
      path: "Channel.BranchCode",
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Channel",
      options: masters.Channel,
      path: "Channel.ChannelType",
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Name of Broker/Agent",
      path: "Channel.AgentName",
    },
    {
      type: "Input",
      visible: true,
      label: "Contact Number of Broker/Agent",
      path: "Channel.AgentContact",
    },
    { type: "Input", visible: true, label: "Broker Commission", path: "Channel.AgentCommission" },
    { type: "MDDatePicker", visible: true, label: "Inception Date", path: "InceptionDate" },
    { type: "MDDatePicker", visible: true, label: "Policy Start Date", path: "Policy Start Date" },
    { type: "MDDatePicker", visible: true, label: "Policy End Date", path: "Policy End Date" },
    {
      type: "RadioGroup",
      visible: true,
      spacing: 12,
      radioLabel: { labelVisible: true, label: "Type" },
      radioList: [
        { label: "Short Term", value: "Short Term" },
        { label: "Prorata", value: "Prorata" },
        { label: "Annual", value: "Annual" },
      ],
      path: "Policy Tenure",
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "No of Months",
      options: masters.TermType,
      path: "NoOfMonths",
    },
  ];

  const CorporateDetails = [
    { type: "Typography", visible: true, label: "Corporate Search" },
    {
      type: "AutoComplete",
      visible: true,
      label: "Corporate Short Name ",
      options: masters.CorpShortName,
      path: "CorporateDetails.CorporateShortName",
      customOnChange: onCorporateShortName,
    },
    // { type: "Input", visible: true, label: "" },
    // { type: "Button", visible: true, label: "Search" },

    { type: "Typography", spacing: 12, visible: true, label: "Corporate Details" },
    {
      type: "Input",
      visible: true,
      label: "Corporate Name",
      path: "CorporateDetails.CorporateName",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Corporate Short Name",
      path: "CorporateDetails.CorporateShortName",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Corporate Website",
      path: "CorporateDetails.CorporateWebSite",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Corporate PAN Number",
      path: "CorporateDetails.CorporatePANNo",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "GST No",
      path: "CorporateDetails.CorporateGSTNo",
      disabled: true,
    },

    { type: "Typography", spacing: 12, visible: true, label: "Communication Address" },
    {
      type: "Input",
      visible: true,
      label: "Address1",
      path: "CorporateDetails.CommunicationAddress.AddressLine1",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Address2",
      path: "CorporateDetails.CommunicationAddress.AddressLine2",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Address3",
      path: "CorporateDetails.CommunicationAddress.AddressLine3",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Pincode ",
      path: "CorporateDetails.CommunicationAddress.PinCode",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "City",
      path: "CorporateDetails.CommunicationAddress.City",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "District",
      path: "CorporateDetails.CommunicationAddress.District",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "State",
      path: "CorporateDetails.CommunicationAddress.State",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Country",
      path: "CorporateDetails.CommunicationAddress.Country",
      disabled: true,
    },

    { type: "Typography", spacing: 12, visible: true, label: "Registration Address" },
    {
      type: "Checkbox",
      spacing: 12,
      visible: true,
      label: "Is Registered Address same as Communication address?",
      path: "CorporateDetails.RegisteredAddressSameAsCommunicationAddress",
      checkedVal: "Yes",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Address1",
      path: "CorporateDetails.RegisteredAddress.AddressLine1",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Address2",
      path: "CorporateDetails.RegisteredAddress.AddressLine2",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Address3",
      path: "CorporateDetails.RegisteredAddress.AddressLine3",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Pincode ",
      path: "CorporateDetails.RegisteredAddress.PinCode",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "City",
      path: "CorporateDetails.RegisteredAddress.City",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "District",
      path: "CorporateDetails.RegisteredAddress.District",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "State",
      path: "CorporateDetails.RegisteredAddress.State",
      disabled: true,
    },
    {
      type: "Input",
      visible: true,
      label: "Country",
      path: "CorporateDetails.RegisteredAddress.Country",
      disabled: true,
    },
  ];

  const RiskDetails = [
    { type: "Typography", visible: true, label: "Type of Industry" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Non-Manufacturing", value: "Non-Manufacturing" },
      ],
      path: "InsurableItem.0.RiskItems.0.IndustryType",
    },

    { type: "Typography", visible: true, label: "Industry Classification" },
    {
      type: "AutoComplete",
      visible: true,
      label: "",
      path: "InsurableItem.0.RiskItems.0.IndustryClassification",
    },

    { type: "Typography", visible: true, label: "Prospective Business of the client" },
    {
      type: "RadioGroup",
      spacing: 3,
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [
        { label: "Standalone", value: "Standalone" },
        { label: "Accompanied", value: "Accompanied" },
      ],
      path: "InsurableItem.0.RiskItems.0.ProspectiveBusinessOfClient",
    },
    {
      type: "AutoComplete",
      visible: true,
      spacing: 3,
      label: "Select Prospective Business of the Client",
    },

    { type: "Typography", visible: true, label: "Client-Other Business Details" },
    { type: "Button", visible: true, label: "Choose File" },

    { type: "Typography", visible: true, label: "Is selection of coverage involved" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      path: "InsurableItem.0.RiskItems.0.IsSelectionOfCoverageInvolved",
    },

    {
      type: "Typography",
      visible: true,
      label: "Is the premium paid by Employee for coverage of self or any of the dependents",
    },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      path: "InsurableItem.0.RiskItems.0.IsPremiumPaidByEmployeeForCoverageOfSelfOrAnyOfDependents",
    },

    { type: "Typography", visible: true, label: "Foreign nationals covered" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
      path: "InsurableItem.0.RiskItems.0.ForeignNationalsCovered",
    },

    { type: "Typography", visible: true, label: "No of Locations" },
    {
      type: "AutoComplete",
      visible: true,
      label: "",
      options: mast.noOfLocations,
      path: "InsurableItem.0.RiskItems.0.NoOfLocations",
      customOnChange: onNoOfLocations,
    },

    { type: "Typography", visible: true, label: "Select the Sum Insured Type" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [
        { label: "Individual", value: "Individual" },
        { label: "Family Floater", value: "Family Floater" },
        { value: "Both", label: "Individual and Family Floater" },
      ],
      path: "InsurableItem.0.RiskItems.0.SumInsuredType",
    },

    { type: "Typography", visible: true, label: "SubLimit Applicable" },
    {
      type: "AutoComplete",
      visible: true,
      label: "",
      path: "InsurableItem.0.RiskItems.0.SubLimitApplicable",
    },

    { type: "Typography", visible: true, label: "Quotation Type" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [
        { label: "Head Count Basis", value: "Head Count Basis" },
        { label: "Accurate List of Members", value: "Accurate List of Members" },
        { label: "Tentative List of Members", value: "Tentative List of Members" },
      ],
      path: "InsurableItem.0.RiskItems.0.QuotationType",
    },
  ];

  const MemberSummary = [...spreadMemberSummary()];

  const Others = [
    {
      type: "RadioGroup",
      spacing: 12,
      visible: true,
      radioLabel: { labelVisible: true, label: "Is Installment Required" },
      radioList: [{ label: "Yes" }, { label: "No" }],
    },
    {
      type: "RadioGroup",
      spacing: 12,
      visible: true,
      radioLabel: { labelVisible: true, label: "Is this a Co Insurance case" },
      radioList: [{ label: "Yes" }, { label: "No" }],
    },
    {
      type: "Button",
      visible: true,
      label: "Add Document",
      onClick: onAddDocument,
    },
    {
      type: "DataGrid",
      visible: true,
      spacing: 12,
      columns: [
        { field: "DocumentId", headerName: "S.No", width: 100 },
        {
          field: "DocumentType",
          headerName: "Document Name",
          renderCell: (p) => {
            const onDocumentType = (e) => {
              dto.DocumentDetails[p.id - 1].DocumentType = e.target.value;
              setDto({ ...dto });
            };
            return <MDInput value={p.row.DocumentType} onChange={onDocumentType} />;
          },
          width: 200,
        },
        {
          field: "Upload",
          headerName: "Upload",
          renderCell: (p) => {
            const onDocChoose = (e) => {
              const file = e.target.files[0];
              const formData = new FormData();
              formData.append("file", file, file.name);
              console.log("onDocChoose", formData);
              dto.DocumentDetails[p.id - 1].DocumentName = file.name;
              setDto({ ...dto });
            };
            return (
              <Stack direction="row" spacing={2}>
                <MDButton variant="outlined" component="label">
                  <input type="file" hidden onChange={(e) => onDocChoose(e)} />
                  Choose File
                </MDButton>
                <MDButton>Upload File</MDButton>
              </Stack>
            );
          },
          width: 300,
        },
        {
          field: "DocumentName",
          headerName: "File Name",
          width: 400,
        },
        {
          field: "Action",
          headerName: "Action",
          renderCell: () => (
            <IconButton>
              <DeleteIcon />
            </IconButton>
          ),
          width: 100,
        },
      ],
      value: dto.DocumentDetails,
      rowId: "DocumentId",

      experimentalFeatures: { columnGrouping: true },
    },

    { type: "MDDatePicker", visible: true, label: "Last date for submission of quote" },
    { type: "AutoComplete", visible: true, label: "TPA", options: masters.TPAName },
    { type: "Input", visible: true, label: "TPA Rate" },
    { type: "Input", visible: true, label: "Remarks" },
  ];

  useEffect(async () => {
    setLoader(true);
    const res1 = await GetProdPartnermasterData(1186, "BusinessType", ["BusinessType"]);
    const res2 = await GetProdPartnermasterData(1186, "GroupType", ["GroupType"]);
    const res3 = await GetProdPartnermasterData(1186, "TermType", ["TermType"]);
    const res4 = await GetProdPartnermasterData(1186, "SubLimitApplicable", ["SubLimitApplicable"]);
    const res5 = await GetProdPartnermasterData(1186, "Installments", ["Installments"]);
    const res6 = await GetProdPartnermasterData(1186, "InstallmentType", ["InstallmentType"]);
    const res7 = await GetProdPartnermasterData(1186, "BranchName", ["BranchName"]);
    const res8 = await GetProdPartnermasterData(1186, "Channel", ["Channel"]);
    const res9 = await GetProdPartnermasterData(1186, "IndustryName", ["IndustryName"]);
    const res10 = await GetProdPartnermasterData(1186, "TPAName", ["TPAName"]);
    const res11 = await GetProdPartnermasterData(1186, "CorpName", ["CorpName"]);
    const res12 = await GetProdPartnermasterData(1186, "CorpShortName", ["CorpShortName"]);
    const res13 = await GetProdPartnermasterData(1186, "CorpWebsite", ["CorpWebsite"]);
    const res14 = await GetProdPartnermasterData(1186, "CorpPANNo", ["CorpPANNo"]);

    masters.BusinessType = res1;
    masters.GroupType = res2;
    masters.TermType = res3;
    masters.SubLimitApplicable = res4;
    masters.Installments = res5;
    masters.InstallmentType = res6;
    masters.BranchName = res7;
    masters.Channel = res8;
    masters.IndustryName = res9;
    masters.TPAName = res10;
    masters.CorpName = res11;
    masters.CorpShortName = res12;
    masters.CorpWebsite = res13;
    masters.CorpPANNo = res14;
    setMasters({ ...masters });
    setLoader(false);
  }, []);

  const onSaveQuote = async () => {
    const obj = {
      MasterJson: {
        RowId: null,
        LocationId: null,
        Location: null,
        SumInsured: null,
        RelationWithProposer: null,
        AgeBand: [],
        Gender: [],
        IgnoreColumn: ["Age", "Id"],
      },
      QuotePivotJson: { SlabwiseDetails: dto.InsurableItem[0].RiskSummary.SlabWiseDetails },
    };
    const arr1 = [];
    mast.AgeBand.forEach((x) => {
      arr1.push({ Value: x.mID, Name: x.mValue });
    });
    const arr2 = [];
    mast.Gender.forEach((x) => {
      arr2.push({ Value: x.mID, Name: x.mValue });
    });
    obj.MasterJson.AgeBand = arr1;
    obj.MasterJson.Gender = arr2;
    const res = await ExecuteProcedure("po.usp_GetHeadCountUnpivot ", obj);
    const lDto = { ...dto };
    lDto.InsurableItem[0].RiskSummary.SlabWiseDetails = res.finalResult;

    const res1 = await SaveQuotation(lDto);

    swal({
      icon: "success",
      title: res1.responseMessage,
      text: `Quote No ${res1.quotation.quoteNo}`,
    });
  };

  return (
    <MDBox
      sx={{
        display: "grid",
        gap: 2,
      }}
    >
      {false && <MDLoader loader={loader} />}
      <Grid container spacing={2}>
        {topCom.map((item) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={item.spacing ? item.spacing : spacing}
            lg={item.spacing}
            xl={item.spacing}
            xxl={item.spacing}
          >
            <NewRenderControl
              item={item}
              dto={dto}
              setDto={setDto}
              nextFlag="false"
              nextCount={1}
            />
          </Grid>
        ))}
      </Grid>
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: bgColor }}
          expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
        >
          <MDTypography sx={{ color: textColor }}>Corporate Details</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {CorporateDetails.map((item) =>
              item.visible ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing ? item.spacing : spacing}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <NewRenderControl
                    item={item}
                    dto={dto}
                    setDto={setDto}
                    nextFlag="false"
                    nextCount={1}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: bgColor }}
          expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
        >
          <MDTypography sx={{ color: textColor }}>Risk Details</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          {" "}
          <Grid container spacing={2}>
            {RiskDetails.map((item) =>
              item.visible ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing ? item.spacing : 6}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <NewRenderControl
                    item={item}
                    dto={dto}
                    setDto={setDto}
                    nextFlag="false"
                    nextCount={1}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>{" "}
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: bgColor }}
          expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
        >
          <MDTypography sx={{ color: textColor }}>Member Summary</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {MemberSummary.map((item) =>
              item.visible ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing ? item.spacing : 3}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <NewRenderControl
                    item={item}
                    dto={dto}
                    setDto={setDto}
                    nextFlag="false"
                    nextCount={1}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: bgColor }}
          expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
        >
          <MDTypography sx={{ color: textColor }}>Others</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {Others.map((item) =>
              item.visible ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing ? item.spacing : 3}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <NewRenderControl
                    item={item}
                    dto={dto}
                    setDto={setDto}
                    nextFlag="false"
                    nextCount={1}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="row" spacing={3}>
          <MDButton onClick={onSaveQuote}>Save</MDButton>
          <MDButton>Request Quote</MDButton>
        </Stack>
      </MDBox>
    </MDBox>
  );
}
