import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  IconButton,
  Icon,
  Autocomplete,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import excel from "assets/images/Nepal/excel.png";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import CountUp from "react-countup";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import swal from "sweetalert";

import MDButton from "components/MDButton";
import {
  GetDashboardCount,
  GetDashboardData,
  GetProposalByNumber,
  GetQuotationMaster,
} from "./data";
import MDLoader from "../../../../../../components/MDLoader";
// import LifeStepper from "./LifeStepper";
import NewRenderControl from "../../../../../../Common/RenderControl/NewRenderControl";
import MDInput from "../../../../../../components/MDInput";
import MDDatePicker from "../../../../../../components/MDDatePicker";
import CustomDropDown from "../../../../../../components/CustomDropDown";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

export default function LifeUnderWriterDashboard() {
  const { search } = useLocation();
  const [proposalNumber, setProposalNumber] = useState("");

  const [loader, setLoader] = useState(false);
  const [pendingcount, setpendingcount] = useState(0);
  const [approvedcount, setapprovedcount] = useState(0);
  const [rejectedcount, setrejectedcount] = useState(0);
  const [postcount, setpostcount] = useState(0);
  const [stageStatus, setStageStatus] = useState([
    {
      stageStatusID: 11,
      statusName: "Pending Proposals",
      stageStatusCount: pendingcount,
      color: "#0071D9",
      loader: false,
    },
    {
      stageStatusID: 381,
      statusName: "Approved Proposals",
      stageStatusCount: approvedcount,
      color: "#DDDEE1",
      loader: false,
    },
    {
      stageStatusID: 381,
      statusName: "Rejected Proposals",
      stageStatusCount: rejectedcount,
      color: "#DDDEE1",
      loader: false,
    },
    {
      stageStatusID: 381,
      statusName: "Postponed Proposals",
      stageStatusCount: postcount,
      color: "#DDDEE1",
      loader: false,
    },
  ]);

  const [proposalJson, setProposalJson] = useState(null);
  const [tab, setTab] = useState(0);
  const [memberLevelTab, setMemberLevelTab] = useState(0);
  const [dto, setDto] = useState(null);
  const [masters, setMasters] = useState({
    DocumentType: [],
    DocumentsTypes: [],
    SelectedDoc: [],
    NonMedicalSelectedDoc: [],
    Decision: [],
    UWReasons: [],
    DocumentDecision: [],
    nonMedicalDoc: [
      { mID: "1", mValue: "ID Proof" },
      { mID: "2", mValue: "Birth Certificate" },
    ],
  });

  const nextFlag = false;
  const nextCount = 0;
  console.log(dto, "dto", proposalJson, "proposalJson");

  const UnderWriterDecision = {
    MemberLevelDecision: [
      {
        Decision: "",
        Remarks: "",
        Reason: "",
      },
    ],
    PolicyLevelDecision: {
      Decision: "",
      Reason: "",
      CommencementDate: "",
      Remarks: "",
    },
    FailedRulesDecision: [],
    Documents: {
      DocumentType: "",
      Medical: [],
      NonMedical: [],
    },
  };

  useEffect(async () => {
    const selectedId = new URLSearchParams(search).get("proposalNumber");
    if (selectedId !== null && selectedId !== undefined && selectedId !== "") {
      setProposalNumber(selectedId);

      const res = await GetProposalByNumber(selectedId);
      setDto({
        ...res[0].policyDetails,
        UnderWriterDecision,
      });
      setProposalJson(res[0]);
    }
  }, []);

  const tableColumns = [
    {
      field: "proposalNo",
      headerName: "Proposal No",
      width: 200,
      headerAlign: "center",
      renderCell: (p) => {
        const onQuote = async () => {
          const res = await GetProposalByNumber(p.row.proposalNo);
          setProposalNumber(p.row.proposalNo);
          setDto({ ...res[0].policyDetails, UnderWriterDecision });
          setProposalJson(res[0]);
        };
        return (
          <MDButton variant="text" onClick={onQuote}>
            {p.row.proposalNo}
          </MDButton>
        );
      },
    },

    {
      field: "Plans",
      headerName: "Plan/s",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "Proposername",
      headerName: "Proposer Name",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "Status",
      headerName: "Status",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "Proposaldate",
      headerName: "Proposal Date",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "Mobileno",
      headerName: "Mobile Number",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      headerAlign: "center",
      renderCell: () => (
        <IconButton>
          <MoreVertIcon sx={{ ml: "0.1rem" }} />
        </IconButton>
      ),
    },
  ];
  useEffect(async () => {
    let mst = {};
    setLoader(true);

    await GetQuotationMaster("").then((res) => {
      setLoader(false);
      if (Array.isArray(res))
        res.forEach((x) => {
          mst = { ...mst, [x.mType]: x.mdata };
        });
    });
    setLoader(false);

    setMasters({ ...masters, ...mst });

    const res1 = await GetDashboardCount();
    setpendingcount(res1?.proposalUW);
    setapprovedcount(res1?.approved);
    setrejectedcount(res1?.rejected);
    setpostcount(res1?.setteled);
    setStageStatus([...stageStatus]);
  }, []);
  console.log("masters", masters);

  const [rows, setRows] = useState([]);

  const handleClick = async (e, id) => {
    setLoader(true);
    const res = await GetDashboardData(id);
    const arr = [];
    res.forEach((x, i) => {
      arr.push({ ...x, id: i });
    });

    setRows([...arr]);
    setLoader(false);
  };

  const SpreedUnderFailedRules = () => {
    const arr = [];

    if (proposalJson !== null) {
      dto.DeviationDetails.rulesResult
        .filter((x) => x.outcome === "Fail")
        .forEach((x) => {
          arr.push({
            type: "Typography",
            visible: memberLevelTab === 1,
            label: x.failureMsg,
            spacing: 6,
          });
          arr.push({
            type: "AutoComplete",
            visible: memberLevelTab === 1,
            label: "Select",
            spacing: 6,
            options: [
              { mID: 1, mValue: "Refer to Underwriter" },
              { mID: 2, mValue: "Accept" },
            ],
            path: `UnderWriterDecision.FailedRulesDecision.${UnderWriterDecision.FailedRulesDecision.length}.decision`,
          });
          UnderWriterDecision.FailedRulesDecision.push({
            failureMsg: x.failureMsg,
            decision: "",
          });
        });
    }
    return arr;
  };

  const onSave = () => {
    swal({ icon: "success", text: "Decision Saved Successfully" });
    setProposalNumber("");
  };

  const onSubmit = () => {
    swal({ icon: "success", text: "Decision Submitted Successfully" });
    setProposalNumber("");
  };

  const onDocs = (e, name) => {
    masters[name] = [...e];
    setMasters({ ...masters });
  };

  const accordion = [
    { name: "Policy Owner Details", visible: true, defaultExpanded: true },
    { name: "Communication Details", visible: true, defaultExpanded: false },
    { name: "Member Details", visible: true, defaultExpanded: false },
    { name: "Premium and Coverage Details", visible: true, defaultExpanded: false },
    { name: "Beneficiary Details", visible: true, defaultExpanded: false },
    { name: "Premium Details", visible: true, defaultExpanded: false },
    { name: "Communication", visible: true, defaultExpanded: false },
    { name: "Questionnaire", visible: true, defaultExpanded: false },
    { name: "Documents and Declaration", visible: true, endorsement: false },
    { name: "Member Level Decision", visible: true, defaultExpanded: true },
    { name: "Policy Level Decision", visible: true, defaultExpanded: true },
  ];

  const components = [
    [
      {
        type: "Input",
        visible: true,
        label: "Salutation",
        path: "ProposerDetails.Salutation",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "First Name",
        path: "ProposerDetails.FirstName",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Middle Name",
        path: "ProposerDetails.MiddleName",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Last Name",
        path: "ProposerDetails.LastName",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Father's Name",
        path: "ProposerDetails.FatherName",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Mother's Name",
        path: "ProposerDetails.MotherName",
        disabled: true,
      },
      {
        type: "MDDatePicker",
        visible: true,
        label: "Date of Birth",
        path: "ProposerDetails.DOB",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Age",
        path: "ProposerDetails.Age",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Gender",
        path: "ProposerDetails.Gender",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Marital Status",
        path: "ProposerDetails.MaritalStatus",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Email ID",
        path: "ProposerDetails.EmailId",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Mobile Number",
        path: "ProposerDetails.ContactNo",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Nationality",
        path: "ProposerDetails.Nationality",
        disabled: true,
      },
    ],

    [
      {
        type: "Typography",
        visible: true,
        disabled: true,
        label: "Permanent Address",
        spacing: 12,
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "Address 1",
        path: "ProposerDetails.PermanentAddress.AddressLine1",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "Address 2",
        path: "ProposerDetails.PermanentAddress.AddressLine2",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "Address 3",
        path: "ProposerDetails.PermanentAddress.AddressLine3",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "District",
        path: "ProposerDetails.PermanentAddress.CityDistrict",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "State",
        path: "ProposerDetails.PermanentAddress.State",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "Country",
        path: "ProposerDetails.PermanentAddress.Country",
      },

      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "Pincode",
        path: "ProposerDetails.PermanentAddress.Pincode",
      },
      {
        type: "Typography",
        visible: true,
        disabled: true,
        label: "Communication Address",
        spacing: 12,
      },
      {
        type: "Checkbox",
        visible: true,
        disabled: true,
        checkedVal: true,
        uncheckVal: false,
        label: "Is communication Address same as permanent address",
        path: "ProposerDetails.isPermanentAddrSameasCommAddr",
        spacing: 12,
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "Address 1",
        path: "ProposerDetails.CommunicationAddress.AddressLine1",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "Address 2",
        path: "ProposerDetails.CommunicationAddress.AddressLine2",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,

        label: "Address 3",
        path: "ProposerDetails.CommunicationAddress.AddressLine3",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "District",
        path: "ProposerDetails.CommunicationAddress.CityDistrict",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "State",
        path: "ProposerDetails.CommunicationAddress.State",
      },
      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "Country",
        path: "ProposerDetails.CommunicationAddress.Country",
      },

      {
        type: "Input",
        visible: true,
        disabled: true,
        label: "Pincode",
        path: "ProposerDetails.CommunicationAddress.Pincode",
      },
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [
      {
        type: "Tabs",
        value: tab,
        visible: true,
        customOnChange: (e, newValue) => setTab(newValue),
        tabs: [{ label: "Main Life", value: 0 }],
        //   dto !== null
        //     ? [
        //         ...dto.InsurableItem[0].RiskItems.map((elem, index) => ({
        //           value: index,
        //           label: elem.name !== "" ? elem.name : "Main Life",
        //         })),
        //       ]
        //     : [],

        // spacing: dto.InsurableItem[0].RiskItems.length * 2.4,
      },
      {
        type: "Tabs",
        value: memberLevelTab,
        visible: true,
        customOnChange: (e, newValue) => setMemberLevelTab(newValue),
        tabs: [
          { label: "Summary", value: 0 },
          { label: "Underwriting Field Rules", value: 1 },
          { label: "Documents", value: 2 },
          { label: "Decision", value: 3 },
          { label: "History", value: 4 },
        ],
        spacing: 12,
      },
      {
        type: "Input",
        visible: memberLevelTab === 0,
        label: "Name",
        path: `InsurableItem.0.RiskItems.${tab}.Name`,
      },
      {
        type: "Input",
        visible: memberLevelTab === 0,
        label: "DOB",
        path: `InsurableItem.0.RiskItems.${tab}.DOB`,
      },
      {
        type: "Input",
        visible: memberLevelTab === 0,
        label: "Gender",
        path: `InsurableItem.0.RiskItems.${tab}.Gender`,
      },
      {
        type: "Input",
        visible: memberLevelTab === 0,
        label: "Occupation",
        path: `InsurableItem.0.RiskItems.${tab}.Occupation`,
      },
      { type: "Input", visible: memberLevelTab === 0, label: "SAR" },
      { type: "Input", visible: memberLevelTab === 0, label: "Total Annual Premium" },
      { type: "Input", visible: memberLevelTab === 0, label: "BMI Value" },

      ...SpreedUnderFailedRules(),

      {
        type: "AutoComplete",
        visible: memberLevelTab === 2,
        label: "Document Type",
        options: [...masters.DocumentType],
        path: "UnderWriterDecision.Documents.DocumentType",
      },
      // {
      //   type: "AutoComplete",
      //   visible: memberLevelTab === 2,
      //   label: "Select Documents",
      //   multiple: true,
      //   value: [],
      //   options: [...masters.DocumentsTypes],
      // },
      {
        type: "Custom",
        visible:
          memberLevelTab === 2 &&
          dto.UnderWriterDecision.Documents.DocumentType === "Medical Document",
        return: (
          <CustomDropDown
            label="Select Documents"
            options={[...masters.DocumentsTypes]}
            optionLabel="mValue"
            optionId="mID"
            value={masters.SelectedDoc}
            all="true"
            onChange={(e) => onDocs(e, "SelectedDoc")}
          />
        ),
      },
      {
        type: "Custom",
        visible:
          memberLevelTab === 2 &&
          dto.UnderWriterDecision.Documents.DocumentType === "Non Medical Document",
        return: (
          <CustomDropDown
            label="Select Documents"
            options={[...masters.nonMedicalDoc]}
            optionLabel="mValue"
            optionId="mID"
            value={masters.NonMedicalSelectedDoc}
            all="true"
            onChange={(e) => onDocs(e, "NonMedicalSelectedDoc")}
          />
        ),
      },

      {
        type: "RadioGroup",
        visible: memberLevelTab === 2,
        spacing: 12,
        path: "",
        radioLabel: { labelVisible: true, label: "Medical Fee paid by" },
        radioList: [
          { label: "By Company", value: "By Company" },
          { label: "By Customer", value: "By Customer" },
        ],
      },
      {
        type: "Typography",
        visible: memberLevelTab === 2,
        spacing: 12,
        label: "Medical Document Details",
      },
      {
        type: "DataGrid",
        visible: memberLevelTab === 2,
        spacing: 12,
        rowId: "mID",
        columns: [
          { field: "mValue", headerName: "Document", width: 300 },
          {
            field: "link",
            headerName: "Link",
            width: 100,
            renderCell: () => <MDButton variant="text">Link</MDButton>,
          },
          {
            field: "status",
            headerName: "Status",
            width: 200,
            renderCell: () => (
              <Autocomplete
                fullWidth
                options={masters.DocumentDecision}
                sx={autoStyle}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} />}
              />
            ),
          },
          { field: "date", headerName: "Date", width: 200, renderCell: () => <MDDatePicker /> },
          { field: "remarks", headerName: "Remarks", width: 200, renderCell: () => <MDInput /> },
        ],
        value: [...masters.SelectedDoc],
      },
      {
        type: "Typography",
        visible: memberLevelTab === 2,
        spacing: 12,
        label: "Non-Medical Document Details",
      },
      {
        type: "DataGrid",
        visible: memberLevelTab === 2,
        spacing: 12,
        rowId: "mID",
        columns: [
          { field: "mValue", headerName: "Document", width: 300 },
          {
            field: "link",
            headerName: "Link",
            width: 100,
            renderCell: () => <MDButton variant="text">Link</MDButton>,
          },
          {
            field: "status",
            headerName: "Status",
            width: 200,
            renderCell: () => (
              <Autocomplete
                fullWidth
                options={masters.DocumentDecision}
                sx={autoStyle}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} />}
              />
            ),
          },
          { field: "date", headerName: "Date", width: 200, renderCell: () => <MDDatePicker /> },
          { field: "remarks", headerName: "Remarks", width: 200, renderCell: () => <MDInput /> },
        ],
        value: [...masters.NonMedicalSelectedDoc],
      },

      {
        type: "AutoComplete",
        visible: memberLevelTab === 3,
        label: "Under Writing Decision",
        options: [...masters.Decision],
        path: `UnderWriterDecision.MemberLevelDecision.${tab}.Decision`,
      },
      {
        type: "AutoComplete",
        visible:
          memberLevelTab === 3 &&
          dto?.UnderWriterDecision?.MemberLevelDecision?.[0]?.Decision !== "Accept" &&
          dto?.UnderWriterDecision?.MemberLevelDecision?.[0]?.Decision !== "Accept with Loading" &&
          dto?.UnderWriterDecision?.MemberLevelDecision?.[0]?.Decision !== "",

        label: "Under Writing Reason",
        options: [...masters.UWReasons],
        path: `UnderWriterDecision.MemberLevelDecision.${tab}.Reason`,
      },
      {
        type: "Input",
        visible: memberLevelTab === 3,
        label: "Remarks",
        path: `UnderWriterDecision.MemberLevelDecision.${tab}.Remarks`,
      },
    ],
    [
      {
        type: "AutoComplete",
        visible: true,
        label: "Under Writing Decision",
        options: [...masters.Decision].filter(
          (x) => x.mValue === dto?.UnderWriterDecision?.MemberLevelDecision?.[0]?.Decision
        ),

        path: "UnderWriterDecision.PolicyLevelDecision.Decision",
      },
      {
        type: "MDDatePicker",
        visible: true,
        label: "Commencement Date",
        path: "UnderWriterDecision.PolicyLevelDecision.CommencementDate",
      },
      {
        type: "Input",
        visible: true,
        label: "Remarks",
        path: "UnderWriterDecision.PolicyLevelDecision.Remarks",
      },
    ],
  ];

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF", minHeight: "85vh" }} p={3}>
      <MDLoader loader={loader} />
      {proposalNumber === "" && (
        <Grid container spacing={2}>
          {stageStatus.map((item) => (
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ maxWidth: 300 }}>
              <Card
                sx={{ minWidth: 235, bgcolor: item.color, cursor: "pointer" }}
                onClick={(e) => handleClick(e, item.stageStatusID)}
              >
                <CardContent>
                  <MDTypography
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: item.statusName === "Pending Proposals" ? "White" : "black",
                    }}
                    gutterBottom
                  >
                    {item.statusName}
                  </MDTypography>
                  <MDBox display="flex" flexDirection="row" justifyContent="space-between" pt={4}>
                    <CountUp
                      start={0}
                      id="count"
                      end={item.stageStatusCount}
                      duration={3.5}
                      style={{
                        fontWeight: "bold",
                        fontSize: "2rem",
                        color: item.statusName === "Pending Proposals" ? "white" : "black",
                      }}
                      // useEasing={true}
                      // useGrouping={true}
                      separator=" "
                    />
                    <MDTypography
                      style={{
                        color: item.statusName === "Pending Proposals" ? "white" : "black",
                        fontWeight: "400",
                        fontSize: "16px",
                        cursor: "pointer",
                        textDecoration: "underline",
                        marginLeft: "150px",
                      }}
                      mt={2}
                      // onClick={() => redirect(x.redirect)}
                    >
                      View&nbsp;All
                    </MDTypography>
                  </MDBox>
                  {item.loader && <CircularProgress color="white" />}
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" justifyContent="space-between" pt={2}>
              <MDTypography sx={{ fontWeight: "bold" }}>Pending Proposals</MDTypography>
              <Stack direction="row" justifyContent="right" spacing={2} mr={6}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Search"
                    // value={searchName}
                    // onChange={(e) => setSearchName(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <Icon>search</Icon>
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                      "& .MuiAutocomplete-popupIndicator": {
                        color: "#000",
                      },
                    }}
                    disableClearable
                    id="combo-box-demo"
                    // options={getMaster("PolicePersonnel")}
                    getOptionLabel={(option) => option.mValue}
                    // value={{
                    //   mValue: modalObj.EquipmentDescription,
                    // }}
                    renderInput={(params) => <MDInput {...params} label="Sort by status" />}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3}>
                  <MDButton startIcon={<MDBox component="img" src={excel} />} color="success">
                    Download&nbsp;CSV
                  </MDButton>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <DataGrid
                autoHeight
                rows={rows}
                columns={tableColumns}
                getRowId={(row) => row.id}
                checkboxSelection
                //   pageSize={pageSize}
                //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                pagination
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      {proposalNumber !== "" && (
        <MDBox>
          <MDBox
            sx={{
              p: "1px",
            }}
          >
            <MDBox
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              sx={{
                backgroundColor: "rgba(218, 232, 254, 1)",
              }}
              p={2}
            >
              <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Proposal Number :</b> {`${proposalNumber}`}
              </MDTypography>
              <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Plan Name :</b> {`${proposalJson.policyDetails.Product}`}
              </MDTypography>
              <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Proposer Name :</b>{" "}
                {`${proposalJson.policyDetails.ProposerDetails.FirstName} ${proposalJson.policyDetails.ProposerDetails.LastName}`}
              </MDTypography>
              <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Total Premium Paid :</b>{" "}
                {`${proposalJson.policyDetails.PremiumDetails["Total Premium"]}`}
              </MDTypography>
            </MDBox>
          </MDBox>
          {/* <MDTypography
            p={2}
            textAlign="center"
            variant="h4"
          >{`Proposal Number : ${proposalNumber}`}</MDTypography> */}
          {accordion.map((x1, i1) => (
            <Accordion
              defaultExpanded={x1.defaultExpanded === true}
              disableGutters
              sx={{
                boxShadow: "unset",
                border: "unset",
                "&:before": { display: "none" },
                pt: "0.5rem",
                pb: "0.5rem",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ background: "rgba(218, 232, 254, 1)", mb: "0.5rem" }}
              >
                <MDTypography sx={{ fontSize: "1.25rem", fontWeight: 600 }} color="primary">
                  {x1.name}
                </MDTypography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {components[i1].map(
                    (x2) =>
                      x2.visible === true && (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={x2.spacing ? x2.spacing : 3}
                          lg={x2.spacing ? x2.spacing : 3}
                          xl={x2.spacing ? x2.spacing : 3}
                          xxl={x2.spacing ? x2.spacing : 3}
                        >
                          <NewRenderControl
                            item={x2}
                            setDto={setDto}
                            nextFlag={nextFlag}
                            nextCount={nextCount}
                            dto={dto}
                          />
                        </Grid>
                      )
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
          <Stack
            p={3}
            spacing={2}
            direction="row"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <MDButton onClick={onSave}>Save</MDButton>
            <MDButton onClick={onSubmit}>Submit</MDButton>
          </Stack>{" "}
        </MDBox>
      )}
    </MDBox>
  );
}
