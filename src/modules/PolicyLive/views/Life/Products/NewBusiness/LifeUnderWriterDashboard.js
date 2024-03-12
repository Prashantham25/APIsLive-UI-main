import { useState, useEffect, useRef, useLayoutEffect } from "react";
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
  Drawer,
  Icon,
  Autocomplete,
  FormControlLabel,
  Switch,
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import excel from "assets/images/Nepal/excel.png";
import { useLocation } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CountUp from "react-countup";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import swal from "sweetalert";

import MDButton from "components/MDButton";
import ReactJson from "react-json-view";

import { GetDashboardData, GetProposalByNumber, GetQuotationMaster } from "./data";
import MDLoader from "../../../../../../components/MDLoader";
// import LifeStepper from "./LifeStepper";
import NewRenderControl from "../../../../../../Common/RenderControl/NewRenderControl";
import MDInput from "../../../../../../components/MDInput";
import MDDatePicker from "../../../../../../components/MDDatePicker";
import { DateFormatFromDateObject } from "../../../../../../Common/Validations";
// import { GetQuestionsControls } from "./data/DynamicContent";
// import CustomDropDown from "../../../../../../components/CustomDropDown";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

function formatCurrency(newValue) {
  if (!newValue) return "";
  const value = `${newValue}`;

  const parts = value.split(".");

  const integerPart = parts[0].replace(/[^0-9-]/g, "");

  // const decimalPart = parts[1] ? `${parts[1]}` : "";

  const formatter = new Intl.NumberFormat("en-IN");

  // const formattedIntegerPart = integerPart.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  const formattedIntegerPart = formatter.format(integerPart);

  /* eslint-disable no-nested-ternary */
  // const roundedDecimalPart = decimalPart
  //   ? decimalPart.length > 2
  //     ? decimalPart.slice(0, 2) // truncate to 2 decimal places
  //     : decimalPart.padEnd(2, "0") // pad with zeros to 2 decimal places
  //   : "00";

  /* eslint-enable no-nested-ternary */

  // return `${formattedIntegerPart}.${roundedDecimalPart}`;
  return `${formattedIntegerPart}`;
}

export default function LifeUnderWriterDashboard() {
  const { search } = useLocation();
  const [proposalNumber, setProposalNumber] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const [loading, setLoading] = useState(false);
  const [datagridLoading, setDatagridLoading] = useState(false);

  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const [dashboardTab, setDashboardTab] = useState(0);

  const matches = useMediaQuery("(min-width:700px)");

  const stageStatus = [
    {
      stageStatusID: 11,
      statusName: "Pending Proposals",
      name: "pendingProposals",
      color: "#0071D9",
      stageStatusCount: counts[0],
      loading: false,
    },
    {
      stageStatusID: 381,
      statusName: "Approved Proposals",
      name: "approvedProposals",
      color: "#03AC13",
      stageStatusCount: counts[1],
      loading: false,
    },
    {
      stageStatusID: 381,
      statusName: "Rejected Proposals",
      name: "rejectedProposals",
      color: "#E3242B",
      stageStatusCount: counts[2],
      loading: false,
    },
    {
      stageStatusID: 381,
      statusName: "Postponed Proposals",
      name: "postponedProposals",
      color: "#F5761A",
      stageStatusCount: counts[3],
      loading: false,
    },
  ];
  // const rows = pageData[stageStatus[dashboardTab].name];

  const [rows, setRows] = useState([]);

  const [drawer, setdrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const Drawercard = [
    { label1: "Proposer", label2: "Details" },
    { label1: "Medical", label2: "Documents" },
    { label1: "Non Medical", label2: "Documents" },
    { label1: "Policy", label2: "Details" },
    { label1: "Address", label2: "Details" },
    { label1: "Member", label2: "Details" },
    { label1: "Family", label2: "Details" },
    { label1: "Health & Habits", label2: "Details" },
    { label1: "Medical", label2: "Questions" },
    { label1: "Additional", label2: "Information" },
    { label1: "Previous Policy", label2: "Details" },
    { label1: "ACR / MHR", label2: "Details" },
    { label1: "Occupation", label2: "Details" },
    { label1: "Nominee", label2: "Details" },
  ];

  const [proposalJson, setProposalJson] = useState(null);
  const [tab, setTab] = useState(0);
  //   const [medicaltab, setmedicaltab] = useLocation(0);
  //   const [memberLevelTab, setMemberLevelTab] = useState(0);
  const [dto, setDto] = useState({ InsurableItem: [{ RiskItems: [] }] });
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

  const [valSwitch, setValSwitch] = useState(true);
  const [DrawerOpen, setDrawerOpen] = useState(false);

  const cardRef = useRef(null);
  const dummyRef = useRef(null);

  const [movingCardPosition, setMovingCardPosition] = useState({});

  const nextFlag = false;
  const nextCount = 0;

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setdrawer(true);
  };

  const handleCloseDrawer = () => {
    setdrawer(false);
  };
  const onDrawerClose = () => setDrawerOpen(false);

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
      CommencementDate: DateFormatFromDateObject(new Date(), "y-m-d"),
      Remarks: "",
    },
    FailedRulesDecision: [],
    Documents: {
      DocumentType: "",
      Medical: [],
      NonMedical: [],
    },
  };

  const tableColumns = [
    {
      field: "proposalNo",
      headerName: "Proposal No",
      width: 300,
      headerAlign: "center",
      renderCell: (p) => {
        const onQuote = async () => {
          setLoading(true);
          const res = await GetProposalByNumber(p.row.proposalNo);
          setLoading(false);
          setProposalNumber(p.row.proposalNo);
          setDto({ ...res[0].policyDetails, UnderWriterDecision });
          setProposalJson(res[0]);
        };
        return (
          <MDBox sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
            <MDButton variant="text" onClick={onQuote}>
              {p.row.proposalNo}
            </MDButton>
          </MDBox>
        );
      },
    },

    {
      field: "Plans",
      headerName: "Plans",
      width: 350,
      headerAlign: "left",
    },
    {
      field: "Proposername",
      headerName: "Proposer Name",
      width: 350,
      headerAlign: "left",
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      renderCell: () => (
        <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <IconButton>
            <MoreVertIcon sx={{ ml: "0.1rem" }} />
          </IconButton>
        </MDBox>
      ),
    },
  ];

  const onValSwitch = (e) => {
    setValSwitch(e.target.checked);
  };

  const onConsoleDto = () => {
    setDrawerOpen(true);
    console.log("genericPolicyDto", dto);
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

  useEffect(async () => {
    let mst = {};
    // setLoading(true);

    await GetQuotationMaster("").then((res) => {
      setLoading(false);
      if (Array.isArray(res))
        res.forEach((x) => {
          mst = { ...mst, [x.mType]: x.mdata };
        });
    });
    setLoading(false);

    setMasters({ ...masters, ...mst });
    setLoading(true);
    const res1 = await GetDashboardData(11);
    const newData = (Array.isArray(res1) ? res1 : []).map((elem, i) => ({
      id: i,
      proposalNo: elem.proposalNo,
      Plans: elem.productName,
      Proposername: elem.insuredName,
      // Proposaldate: elem.firstName,
      // Mobileno: elem.place,
    }));
    const newCounts = [...counts];
    newCounts[dashboardTab] = newData.length;

    setRows(newData);
    setCounts(newCounts);
    setLoading(false);
    // setpendingcount(res1?.proposalUW);
    // setapprovedcount(res1?.approved);
    // setrejectedcount(res1?.rejected);
    // setpostcount(res1?.setteled);
  }, []);

  useLayoutEffect(() => {
    if (cardRef.current && proposalNumber === "") {
      const box1Position = cardRef.current.getBoundingClientRect();

      // Set the position of Box 2 based on Box 1
      const box2Top = box1Position.top + window.pageYOffset;
      const box2Left = box1Position.left;
      const box2Width = box1Position.width;
      const box2Height = box1Position.height;

      setMovingCardPosition({
        top: box2Top,
        left: box2Left,
        width: box2Width,
        height: box2Height,
      });
    }
    const handleResize = () => {
      setTimeout(() => {
        if (cardRef.current && proposalNumber === "") {
          const box1Position = cardRef.current.getBoundingClientRect();
          console.log("Testing1", box1Position);

          // Set the position of Box 2 based on Box 1
          const box2Top = box1Position.top + window.pageYOffset;
          const box2Left = box1Position.left;
          const box2Width = box1Position.width;
          const box2Height = box1Position.height;

          setMovingCardPosition({
            top: box2Top,
            left: box2Left,
            width: box2Width,
            height: box2Height,
          });
        }
      }, 0);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dashboardTab]);

  const handleClick = async (e, id, index) => {
    setDashboardTab(index);
    setDatagridLoading(true);
    const res = await GetDashboardData(id);
    // const arr = [];
    // res.forEach((x, i) => {
    //   arr.push({ ...x, id: i });
    // });
    // setRows([...arr]);
    const newData = (Array.isArray(res) ? res : []).map((elem, i) => ({
      id: i,
      proposalNo: elem.proposalNo,
      Plans: elem.productName,
      Proposername: elem.insuredName,
      // Proposaldate: elem.firstName,
      // Mobileno: elem.place,
    }));
    const newCounts = [...counts];
    newCounts[index] = newData.length;
    setCounts(newCounts);
    setRows(newData);
    setDatagridLoading(false);
  };

  //   const SpreedUnderFailedRules = () => {
  //     const arr = [];

  //     if (proposalJson !== null) {
  //       dto.DeviationDetails.rulesResult
  //         .filter((x) => x.outcome === "Fail")
  //         .forEach((x) => {
  //           arr.push({
  //             type: "Typography",
  //             visible: memberLevelTab === 1,
  //             label: x.failureMsg,
  //             spacing: 6,
  //           });
  //           arr.push({
  //             type: "AutoComplete",
  //             visible: memberLevelTab === 1,
  //             label: "Select",
  //             spacing: 6,
  //             options: [
  //               { mID: 1, mValue: "Refer to Underwriter" },
  //               { mID: 2, mValue: "Accept" },
  //             ],
  //             path: `UnderWriterDecision.FailedRulesDecision.${UnderWriterDecision.FailedRulesDecision.length}.decision`,
  //           });
  //           UnderWriterDecision.FailedRulesDecision.push({
  //             failureMsg: x.failureMsg,
  //             decision: "",
  //           });
  //         });
  //     }
  //     return arr;
  //   };

  const onSave = () => {
    swal({ icon: "success", text: "Decision Saved Successfully" });
    setProposalNumber("");
  };

  const onSubmit = () => {
    swal({ icon: "success", text: "Decision Submitted Successfully" });
    setProposalNumber("");
  };

  //   const onDocs = (e, name) => {
  //     masters[name] = [...e];
  //     setMasters({ ...masters });
  //   };

  const accordion = [
    // { name: "Policy Owner Details", visible: true, defaultExpanded: true },
    // { name: "Communication Details", visible: true, defaultExpanded: false },
    // { name: "Member Details", visible: true, defaultExpanded: false },
    // { name: "Premium and Coverage Details", visible: true, defaultExpanded: false },
    // { name: "Beneficiary Details", visible: true, defaultExpanded: false },
    // { name: "Premium Details", visible: true, defaultExpanded: false },
    // { name: "Communication", visible: true, defaultExpanded: false },
    // { name: "Questionnaire", visible: true, defaultExpanded: false },
    // { name: "Documents and Declaration", visible: true, endorsement: false },
    { name: "Member Level Decision", visible: true, defaultExpanded: true },
    { name: "Policy Level Decision", visible: true, defaultExpanded: true },
  ];

  const components = [
    [
      {
        type: "Tabs",
        value: tab,
        visible: true,
        customOnChange: (e, newValue) => setTab(newValue),
        tabs: [
          // { label: "Main Life", value: 0 },
          // { label: "Member 01", value: 1 },
          // { label: "Member 02", value: 2 },
          // { label: "Member 03", value: 3 },
          // { label: "Member 04", value: 4 },
          ...(dto?.InsurableItem[0]?.RiskItems || []).map((elem, index) => ({
            value: index,
            label: elem.Name || "Main Life",
          })),
        ],
        spacing: (dto?.InsurableItem[0]?.RiskItems?.length || 1) * 3,
      },
      {
        type: "Typography",
        value: "",
        visible: true,
        spacing: 12,
      },
      //   {
      //     type: "Tabs",
      //     value: memberLevelTab,
      //     visible: true,
      //     customOnChange: (e, newValue) => setMemberLevelTab(newValue),
      //     tabs: [
      //       { label: "Summary", value: 0 },
      //       { label: "Underwriting Field Rules", value: 1 },
      //       { label: "Documents", value: 2 },
      //       { label: "Decision", value: 3 },
      //       { label: "History", value: 4 },
      //     ],
      //     spacing: 12,
      //   },
      {
        type: "Input",
        visible: true,
        label: "Name",
        path: `InsurableItem.0.RiskItems.${tab}.Name`,
        spacing: 4,
        disabled: true,
      },
      {
        type: "MDDatePicker",
        visible: true,
        label: "DOB",
        path: `InsurableItem.0.RiskItems.${tab}.DOB`,
        dateFormat: "Y-m-d",
        disabled: true,
        spacing: 4,
      },
      {
        type: "Input",
        visible: true,
        label: "Gender",
        path: `InsurableItem.0.RiskItems.${tab}.Gender`,
        disabled: true,
        spacing: 4,
      },
      {
        type: "Input",
        visible: true,
        label: "Occupation",
        path: `InsurableItem.0.RiskItems.${tab}.Occupation.PresentOccupation`,
        disabled: true,
        spacing: 4,
      },

      //   { type: "Input", visible: true, label: "SAR" },
      //   { type: "Input", visible: true, label: "Total Annual Premium" },
      //   { type: "Input", visible: true, label: "BMI Value" },

      //   ...SpreedUnderFailedRules(),

      //   {
      //     type: "AutoComplete",
      //     visible: memberLevelTab === 2,
      //     label: "Document Type",
      //     options: [...masters.DocumentType],
      //     path: "UnderWriterDecision.Documents.DocumentType",
      //   },
      // {
      //   type: "AutoComplete",
      //   visible: memberLevelTab === 2,
      //   label: "Select Documents",
      //   multiple: true,
      //   value: [],
      //   options: [...masters.DocumentsTypes],
      // },
      //   {
      //     type: "Custom",
      //     visible:
      //       memberLevelTab === 2 &&
      //       dto.UnderWriterDecision.Documents.DocumentType === "Medical Document",
      //     return: (
      //       <CustomDropDown
      //         label="Select Documents"
      //         options={[...masters.DocumentsTypes]}
      //         optionLabel="mValue"
      //         optionId="mID"
      //         value={masters.SelectedDoc}
      //         all="true"
      //         onChange={(e) => onDocs(e, "SelectedDoc")}
      //       />
      //     ),
      //   },
      //   {
      //     type: "Custom",
      //     visible:
      //       memberLevelTab === 2 &&
      //       dto.UnderWriterDecision.Documents.DocumentType === "Non Medical Document",
      //     return: (
      //       <CustomDropDown
      //         label="Select Documents"
      //         options={[...masters.nonMedicalDoc]}
      //         optionLabel="mValue"
      //         optionId="mID"
      //         value={masters.NonMedicalSelectedDoc}
      //         all="true"
      //         onChange={(e) => onDocs(e, "NonMedicalSelectedDoc")}
      //       />
      //     ),
      //   },

      //   {
      //     type: "RadioGroup",
      //     visible: memberLevelTab === 2,
      //     spacing: 12,
      //     path: "",
      //     radioLabel: { labelVisible: true, label: "Medical Fee paid by" },
      //     radioList: [
      //       { label: "By Company", value: "By Company" },
      //       { label: "By Customer", value: "By Customer" },
      //     ],
      //   },
      //   {
      //     type: "Typography",
      //     visible: memberLevelTab === 2,
      //     spacing: 12,
      //     label: "Medical Document Details",
      //   },
      //   {
      //     type: "DataGrid",
      //     visible: memberLevelTab === 2,
      //     spacing: 12,
      //     rowId: "mID",
      //     columns: [
      //       { field: "mValue", headerName: "Document", width: 300 },
      //       {
      //         field: "link",
      //         headerName: "Link",
      //         width: 100,
      //         renderCell: () => <MDButton variant="text">Link</MDButton>,
      //       },
      //       {
      //         field: "status",
      //         headerName: "Status",
      //         width: 200,
      //         renderCell: () => (
      //           <Autocomplete
      //             fullWidth
      //             options={masters.DocumentDecision}
      //             sx={autoStyle}
      //             getOptionLabel={(option) => option.mValue}
      //             renderInput={(params) => <MDInput {...params} />}
      //           />
      //         ),
      //       },
      //       { field: "date", headerName: "Date", width: 200, renderCell: () => <MDDatePicker /> },
      //       { field: "remarks", headerName: "Remarks", width: 200, renderCell: () => <MDInput /> },
      //     ],
      //     value: [...masters.SelectedDoc],
      //   },
      //   {
      //     type: "Typography",
      //     visible: memberLevelTab === 2,
      //     spacing: 12,
      //     label: "Non-Medical Document Details",
      //   },
      //   {
      //     type: "DataGrid",
      //     visible: memberLevelTab === 2,
      //     spacing: 12,
      //     rowId: "mID",
      //     columns: [
      //       { field: "mValue", headerName: "Document", width: 300 },
      //       {
      //         field: "link",
      //         headerName: "Link",
      //         width: 100,
      //         renderCell: () => <MDButton variant="text">Link</MDButton>,
      //       },
      //       {
      //         field: "status",
      //         headerName: "Status",
      //         width: 200,
      //         renderCell: () => (
      //           <Autocomplete
      //             fullWidth
      //             options={masters.DocumentDecision}
      //             sx={autoStyle}
      //             getOptionLabel={(option) => option.mValue}
      //             renderInput={(params) => <MDInput {...params} />}
      //           />
      //         ),
      //       },
      //       { field: "date", headerName: "Date", width: 200, renderCell: () => <MDDatePicker /> },
      //       { field: "remarks", headerName: "Remarks", width: 200, renderCell: () => <MDInput /> },
      //     ],
      //     value: [...masters.NonMedicalSelectedDoc],
      //   },

      {
        type: "AutoComplete",
        visible: true,
        label: "Under Writing Decision",
        options: [...masters.Decision],
        path: `UnderWriterDecision.MemberLevelDecision.${tab}.Decision`,
        spacing: 4,
      },
      //   {
      //     type: "AutoComplete",
      //     visible:
      //       memberLevelTab === 3 &&
      //       dto?.UnderWriterDecision?.MemberLevelDecision?.[0]?.Decision !== "Accept" &&
      //       dto?.UnderWriterDecision?.MemberLevelDecision?.[0]?.Decision !== "Accept with Loading" &&
      //       dto?.UnderWriterDecision?.MemberLevelDecision?.[0]?.Decision !== "",

      //     label: "Under Writing Reason",
      //     options: [...masters.UWReasons],
      //     path: `UnderWriterDecision.MemberLevelDecision.${tab}.Reason`,
      //   },
      {
        type: "Input",
        visible: true,
        label: "Remarks",
        multiline: true,
        rows: 4,
        spacing: 12,
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
        spacing: 4,
        path: "UnderWriterDecision.PolicyLevelDecision.Decision",
      },
      {
        type: "MDDatePicker",
        visible: true,
        label: "Commencement Date",
        disabled: true,
        path: "UnderWriterDecision.PolicyLevelDecision.CommencementDate",
        dateFormat: "Y-m-d",
        spacing: 4,
      },
      {
        type: "Input",
        visible: true,
        multiline: true,
        label: "Remarks",
        rows: 4,
        spacing: 12,
        path: "UnderWriterDecision.PolicyLevelDecision.Remarks",
      },
    ],
  ];

  const spreadFamilyHistory = () => {
    const arr = [];
    console.log("98765", dto?.InsurableItem[0]?.RiskItems[tab]?.FamilyHistory);
    dto?.InsurableItem[0]?.RiskItems[tab]?.FamilyHistory.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: true,
          spacing: 3,
          label: "Relation",
          path: `InsurableItem.0.RiskItems.${tab}.FamilyHistory.${i}.Relation`,
          disabled: true,
        },
        {
          type: "Input",
          visible: true,
          spacing: 3,
          required: true,
          disabled: true,
          label: "Living / Dead",
          path: `InsurableItem.0.RiskItems.${tab}.FamilyHistory.${i}.LivingDead`,
          // options: [{ mValue: "Living" }, { mValue: "Dead" }],
        },
        {
          type: "Input",
          visible: true,
          disabled: true,
          label: "Age",
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${tab}.FamilyHistory.${i}.Age`,
          inputType: "number",
        },
        {
          type: "Input",
          label: "State of Health",
          visible: x.LivingDead === "Living",
          disabled: true,
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${tab}.FamilyHistory.${i}.HealthStatus`,
        }
      );
    });
    return arr;
  };

  const GetQuestionsControls = (questions, tab1, node1) => {
    const getParentQuestion = (childData, i1) => {
      // console.log("test called", childData);
      let visibleDetails = { path: "", value: "" };
      questions.forEach((x2, i2) => {
        if (x2.QId === childData.QParentId) {
          // console.log("Test34", childData, x2);
          visibleDetails = {
            path: `RiskItems.${i1}.${node1}.${i2}.Answer`,
            value: childData.OnChangeVal,
          };
        }
      });
      return visibleDetails;
    };

    const getRenderQuestion = (x, i2) => {
      const arr = [];
      if (x.ControlType === "Header" && x.Visibility === "TRUE") {
        arr.push({
          type: "Typography",
          visible: true,
          label: x.QText,
          spacing: 12,
          QSubType: x.QSubType,
          splitId: 2,
          variant: "h6",
          sx: { fontSize: "1rem" },
        });
      }

      if (x.ControlType === "Radio" && x.Visibility === "TRUE") {
        arr.push({
          type: "RadioGroup",
          visible: x.OnChangeVal?.toLowerCase() === "yes" ? "visibleDetails" : true,
          visibleDetails: x.OnChangeVal?.toLowerCase() === "yes" ? getParentQuestion(x, tab1) : {},
          path: `InsurableItem.0.RiskItems.${tab1}.${node1}.${i2}.Answer`,
          // value: dto.InsurableItem[0].RiskItems[tab].Questionnare[i2].Answer,
          radioLabel: {
            labelVisible: true,
            label: x.QText,
            fontSize: "1rem",
            // fontWeight: 600,
          },
          radioList: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ],
          justifyContent: "space-between",
          spacing: 12,
          splitId: 2,
        });

        if (x.DetailsLabel) {
          arr.push({
            type: "Input",
            required: "requiredDetails",
            requiredDetails: {
              path: `InsurableItem.0.RiskItems.${tab1}.${node1}.${i2}.Answer`,
              value: x.ShowDetailsOnValue?.toLowerCase(),
            },
            visible: "visibleDetails",
            visibleDetails: {
              path: `InsurableItem.0.RiskItems.${tab1}.${node1}.${i2}.Answer`,
              value: x.ShowDetailsOnValue?.toLowerCase(),
            },
            path: `InsurableItem.0.RiskItems.${tab1}.${node1}.${i2}.${x.DetailsLabel}`,
            label: x.DetailsLabel,
            spacing: 12,
            splitId: 2,
            multiline: true,
          });
        }
      }

      if (x.ControlType === "Date" && x.Visibility?.toLowerCase() === "true") {
        arr.push({
          type: "MDDatePicker",
          visible: x.OnChangeVal?.toLowerCase() === "yes" ? "visibleDetails" : true,
          visibleDetails: x.OnChangeVal?.toLowerCase() === "yes" ? getParentQuestion(x, tab1) : {},
          path: `InsurableItem.0.RiskItems.${tab1}.${node1}.${i2}.Answer`,
          label: x.QText,
          spacing: 4,
          splitId: 2,
          multiline: true,
        });
      }
      if (x.ControlType === "TextBox" && x.Visibility.toLowerCase() === "true") {
        arr.push({
          type: "Input",
          visible: x.OnChangeVal?.toLowerCase() === "yes" ? "visibleDetails" : true,
          visibleDetails: x.OnChangeVal?.toLowerCase() === "yes" ? getParentQuestion(x, tab1) : {},
          // visible: true,
          path: `InsurableItem.0.RiskItems.${tab1}?.${node1}.${i2}?.Answer`,
          label: x.QText,
          spacing: 4,
          splitId: 2,
          multiline: true,
        });
      }

      return arr;
    };
    const tGroupArr = questions?.reduce((group1, product, index) => {
      const group = group1;
      const { QSubType } = product;
      group[QSubType] = group[QSubType] ?? [];
      group[QSubType] = [...group[QSubType], ...getRenderQuestion(product, index)];
      return group;
    }, {});
    console.log("tGroupArr", tGroupArr);
    if (typeof tGroupArr === "object") return tGroupArr;
    return {};
  };

  // const spreadOccupationQuestions = () => {
  //   let controlsObject = [];
  //   const QArr = dto.RiskItems[tab]?.Occupation?.Questionnare;
  //   if (Array.isArray(QArr) && QArr.length > 0)
  //     controlsObject = GetQuestionsControls(
  //       OrderingArrayElementsByIds(QArr),
  //       tab,
  //       "Occupation.Questionnare"
  //     );
  //   const controlsArr = controlsObject[Object.keys(GetQuestionsControls(QArr, tab))[0]];
  //   console.log("controlsArr", controlsArr);
  //   if (Array.isArray(controlsArr)) return controlsArr.map((x) => ({ ...x, splitId: false }));
  //   return [];
  // };

  const [subTypeTab, setSubTypeTab] = useState(0);
  // const questions = [];

  const questions = dto?.InsurableItem[0]?.RiskItems[tab]?.Questionnare;
  const getSubTypeLabel = (ind) => Object.keys(GetQuestionsControls(questions, tab))[ind];
  console.log("1234567890", questions);

  const Drawercomponents = {
    "Proposer Details": [
      // {
      //   type: "Input",
      //   visible: true,
      //   label: "Salutation",
      //   path: "ProposerDetails.Salutation",
      //   disabled: true,
      // },
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
        label: "Mobile Number",
        path: "ProposerDetails.ContactNo",
        disabled: true,
      },
      {
        label: "Home Phone",
        visible: true,
        path: "ProposerDetails.HomeNo",
        type: "Input",
        inputType: "number",
        disabled: true,
      },
      {
        label: "Office Phone",
        visible: true,
        path: "ProposerDetails.WorkNo",
        type: "Input",
        inputType: "number",
      },
      {
        type: "Input",
        visible: true,
        label: "Email ID",
        path: "ProposerDetails.EmailId",
        disabled: false,
      },
      {
        label: "Place",
        visible: true,
        path: "ProposerDetails.Place",
        type: "Input",
        // required: true,
      },
      //   {
      //     type: "Input",
      //     visible: true,
      //     label: "Age",
      //     path: "ProposerDetails.Age",
      //     disabled: true,
      //   },
      {
        type: "Input",
        visible: true,
        label: "Gender",
        path: "ProposerDetails.Gender",
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
        label: "Resident Status",
        path: "ProposerDetails.Residentstatus",
        visible: true,
        type: "AutoComplete",
        // required: true,
        options: [],
        // customOnChange: (e, a) => locationMasters("country", a),
      },
      {
        type: "Input",
        visible: true,
        label: "Father Name",
        path: "ProposerDetails.FatherName",
        disabled: false,
      },
      {
        type: "Input",
        visible: true,
        label: "Mother Name",
        path: "ProposerDetails.MotherName",
        disabled: false,
      },
      {
        label: "Country",
        path: "ProposerDetails.PermanentAddress.Country",
        visible: true,
        type: "AutoComplete",
        // required: true,
        options: [],
        // customOnChange: (e, a) => locationMasters("Country", a),
      },
      {
        label: "Type of Proposal",
        path: "ProposerDetails.Typeofproposal",
        // value: "Individual",
        visible: true,
        type: "Input",
        // required: true,
        // options: getMaster("country"),
        // customOnChange: (e, a) => locationMasters("country", a),
      },
      // {
      //   type: "Input",
      //   visible: true,
      //   label: "Marital Status",
      //   path: "ProposerDetails.MaritalStatus",
      //   disabled: true,
      // },

      // {
      //   type: "Input",
      //   visible: true,
      //   label: "Nationality",
      //   path: "ProposerDetails.Nationality",
      //   disabled: true,
      // },
    ],
    "Medical Documents": [
      {
        type: "Tabs",
        value: tab,
        visible: true,
        customOnChange: (e, newValue) => setTab(newValue),
        tabs: [
          // { label: "Main Life", value: 0 },
          // { label: "Member 01", value: 1 },
          // { label: "Member 02", value: 2 },
          // { label: "Member 03", value: 3 },
          // { label: "Member 04", value: 4 },
          ...(dto?.InsurableItem[0]?.RiskItems || []).map((elem, index) => ({
            value: index,
            label: elem.Name || "Main Life",
          })),
        ],
        spacing: (dto?.InsurableItem[0]?.RiskItems?.length || 1) * 3,
      },
      {
        type: "DataGrid",
        visible: true,
        rowId: "rowID",
        spacing: 12,
        disableOnReset: true,
        columns: [
          {
            field: "Documentname",
            headerName: "Document Name",
            headerAlign: "center",
            width: 300,
          },
          {
            field: "Uploaddate",
            headerName: "Uploaded Date",
            headerAlign: "center",
            width: 300,
          },
          {
            field: "Action",
            headerNmae: "Action",
            headerAlign: "center",
            width: 300,
            renderCell: () => <MDButton>View/Download</MDButton>,
          },
        ],
        // value: [...masters.MedicalSelectedDoc],
      },
    ],
    "Non Medical Documents": [
      {
        type: "Tabs",
        value: tab,
        visible: true,
        customOnChange: (e, newValue) => setTab(newValue),
        tabs: [
          // { label: "Main Life", value: 0 },
          // { label: "Member 01", value: 1 },
          // { label: "Member 02", value: 2 },
          // { label: "Member 03", value: 3 },
          // { label: "Member 04", value: 4 },
          ...(dto?.InsurableItem[0]?.RiskItems || []).map((elem, index) => ({
            value: index,
            label: elem.Name || "Main Life",
          })),
        ],
        spacing: (dto?.InsurableItem[0]?.RiskItems?.length || 1) * 3,
      },
      {
        type: "Button",
        spacing: 3,
        justifyContent: "end",
        visible: true,
        label: "Save and Close",
        variant: "contained",
        // onClick: Handlecalculate,
      },
      {
        type: "DataGrid",
        visible: true,
        spacing: 12,
        rowId: "mID",
        columns: [
          { field: "mValue", headerName: "Document Type", headerAlign: "center", width: 200 },
          { field: "Documenttag", headerName: "Document Tag", headerAlign: "center", width: 200 },
          {
            field: "status",
            headerName: "Status",
            width: 200,
            headerAlign: "center",
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
          {
            field: "uploaddate",
            headerName: "Uploaded Date",
            width: 200,
            headerAlign: "center",
            renderCell: () => <MDDatePicker />,
          },
          {
            field: "Action",
            headerName: "Action",
            headerAlign: "center",
            width: 200,
            renderCell: () => <MDButton variant="text">View/Download</MDButton>,
          },
        ],
        value: [...masters.NonMedicalSelectedDoc],
      },
    ],
    "Policy Details": [
      {
        type: "Input",
        visible: true,
        label: "Plan",
        path: "Plan",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Policy Term",
        path: "PolicyTerm",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Paying Term",
        path: "PremiumPayingTerm",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Sum Proposed",
        path: "SumAssured",
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
        label: "Payment Mode",
        path: "PreferredMode",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Term Rider Sum Proposed",
        path: "InsurableItem.0.RiskItems.0.Benefit.1.RiderSumAssured",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Critical Illness Sum Proposed",
        path: "InsurableItem.0.RiskItems.0.Benefit.0.RiderSumAssured",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Accident Benifit Option",
        path: "InsurableItem.0.RiskItems.0.AccidentBenefit",
        disabled: true,
      },
      // {
      //   type: "Input",
      //   visible: true,
      //   label: "AB/ADDB Sum Proposed",
      //   path: "Plan",
      //   disabled: true,
      // },
      {
        type: "Input",
        visible: true,
        label: "Citizenship",
        path: "Plan",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Resident Status",
        path: "ProposerDetails.ResidentStatus",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Gender",
        path: "ProposerDetails.Gender",
        disabled: true,
      },
    ],
    "Address Details": [
      {
        type: "Tabs",
        value: tab,
        visible: true,
        customOnChange: (e, newValue) => setTab(newValue),
        tabs: [
          // { label: "Main Life", value: 0 },
          // { label: "Member 01", value: 1 },
          // { label: "Member 02", value: 2 },
          // { label: "Member 03", value: 3 },
          // { label: "Member 04", value: 4 },
          ...(dto?.InsurableItem[0]?.RiskItems || []).map((elem, index) => ({
            value: index,
            label: elem.Name || "Main Life",
          })),
        ],
        spacing: (dto?.InsurableItem[0]?.RiskItems?.length || 1) * 3,
      },
      {
        type: "Typography",
        visible: true,
        label: "Communication Address",
        spacing: 12,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Address 1",
        // accordionId: 1,
        path: `InsurableItem.0.RiskItems.${tab}.CommunicationAddress.AddressLine1`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Address 2",
        // accordionId: 1,
        path: `InsurableItem.0.RiskItems.${tab}.CommunicationAddress.AddressLine2`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Address 3",
        // accordionId: 1,
        path: `InsurableItem.0.RiskItems.${tab}.CommunicationAddress.AddressLine3`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Pincode",
        // accordionId: 1,
        path: `InsurableItem.0.RiskItems.${tab}.CommunicationAddress.Pincode`,
      },
      {
        type: "Typography",
        visible: true,
        label: "Permanent Address",
        spacing: 12,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Address 1",
        // accordionId: 2,
        path: `InsurableItem.0.RiskItems.${tab}.PermanentAddress.AddressLine1`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Address 2",
        // accordionId: 2,
        path: `InsurableItem.0.RiskItems.${tab}.PermanentAddress.AddressLine2`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Address 3",
        // accordionId: 2,
        path: `InsurableItem.0.RiskItems.${tab}.PermanentAddress.AddressLine3`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Pincode",
        // accordionId: 2,
        path: `InsurableItem.0.RiskItems.${tab}.PermanentAddress.Pincode`,
      },
    ],
    "Member Details": [],
    "Family Details": [
      {
        type: "Tabs",
        value: tab,
        visible: true,
        customOnChange: (e, newValue) => setTab(newValue),
        tabs: [
          ...(dto?.InsurableItem[0]?.RiskItems || []).map((elem, index) => ({
            value: index,
            label: elem.Name || "Main Life",
          })),
        ],
        spacing: (dto?.InsurableItem[0]?.RiskItems?.length || 1) * 3,
      },
      {
        type: "Typography",
        spacing: 12,
        visible: true,
      },
      ...spreadFamilyHistory(),
    ],
    "Health & Habits Details": [
      {
        type: "Accordions",
        visible: true,
        spacing: 12,
        accordionList: [
          { visible: true, label: "State of Health", id: 1 },
          { visible: true, label: "Health Details", id: 2 },
        ],
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        accordionId: 1,
        label: "Height (in Cms)",
        // path: "ProposerDetails.PermanentAddress.State",
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        accordionId: 1,
        label: "Weight (in Kg)",
        // path: "ProposerDetails.PermanentAddress.State",
      },
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        accordionId: 1,
        radioLabel: {
          label:
            "Whether Any Of The Following Occupation/Legal/Activites Related Questions(a,b,c) Are Applicable?",
          labelVisible: true,
          fontSize: "1rem",
          fontWeight: 600,
        },
        radioList: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        // path: `AdditionalInformation.Antivirus Installed`,
        spacing: 12,
        // customOnChange: (e) => onSameAddress(e),
      },
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        accordionId: 2,
        radioLabel: {
          label: "What has been your usual state of health?",
          labelVisible: true,
          fontSize: "1rem",
          fontWeight: 600,
        },
        radioList: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        // path: `AdditionalInformation.Antivirus Installed`,
        spacing: 12,
        // customOnChange: (e) => onSameAddress(e),
      },
    ],
    "Medical Questions": [
      {
        type: "Tabs",
        value: tab,
        visible: true,
        customOnChange: (e, newValue) => setTab(newValue),
        tabs: [
          ...(dto?.InsurableItem[0]?.RiskItems || []).map((elem, index) => ({
            value: index,
            label: elem.Name || "Main Life",
          })),
        ],
        spacing: (dto?.InsurableItem[0]?.RiskItems?.length || 1) * 3,
      },
      // {
      //   type: "Split",
      //   visible: true,
      //   split: [
      //     { md: 3, lg: 3, xl: 3, xxl: 3, splitId: 1 },
      //     { md: 9, lg: 9, xl: 9, xxl: 9, splitId: 2 },
      //   ],
      //   spacing: 12,
      // },
      {
        type: "Tabs",
        value: subTypeTab,
        visible: true,
        // orientation: "vertical",
        customOnChange: (e, newValue) => setSubTypeTab(newValue),
        tabs: Object.keys(GetQuestionsControls(questions, subTypeTab, "Questionnare")).map(
          (elem, index) => ({
            value: index,
            label: elem,
          })
        ),
        spacing: 12,
        // splitId: 1,
      },
      ...(GetQuestionsControls(questions, subTypeTab, "Questionnare")?.[
        getSubTypeLabel(subTypeTab)
      ] !== undefined
        ? GetQuestionsControls(questions, subTypeTab, "Questionnare")[getSubTypeLabel(subTypeTab)]
        : []),
    ],
    "Additional Information": [],
    "Previous Policy Details": [
      {
        type: "DataGrid",
        visible: true,
        rowId: "id",
        spacing: 12,
        disableOnReset: true,
        // path: "ProposerDetails.PreviousPolicyDetails",
        columns: [
          {
            field: "PolicyNumber",
            headerName: "Policy Number",
            width: 150,
          },
          {
            field: "InsurerName",
            headerName: "Insurer Name",
            width: 200,
          },
          {
            field: "Plan",
            headerName: "Plan",
            width: 50,
          },
          {
            field: "Term",
            headerName: "Term",
            width: 50,
          },
          {
            field: "SumAssured",
            headerName: "SumAssured",
            width: 130,
          },
          {
            field: "CommencementDate",
            headerName: "CommencementDate",
            width: 200,
          },
          {
            field: "Agency",
            headerName: "Agency",
            width: 150,
          },
        ],
        value: dto?.ProposerDetails?.PreviousPolicyDetails.map((x, i) => ({
          ...x,
          id: i,
        })),
        // hideFooterPagination: true,
        // hideFooterSelectedRowCount: true,
      },
    ],
    "ACR / MHR Details": [],
    "Occupation Details": [
      {
        type: "Tabs",
        value: tab,
        visible: true,
        customOnChange: (e, newValue) => setTab(newValue),
        tabs: [
          ...(dto?.InsurableItem[0]?.RiskItems || []).map((elem, index) => ({
            value: index,
            label: elem.Name || "Main Life",
          })),
        ],
        spacing: (dto?.InsurableItem[0]?.RiskItems?.length || 1) * 3,
      },
      {
        type: "Typography",
        spacing: 12,
        visible: true,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Present Occupation",
        path: `InsurableItem.0.RiskItems.${tab}.Occupation.PresentOccupation`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Nature Of Duty",
        path: `InsurableItem.0.RiskItems.${tab}.Occupation.NatureOfDuty`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Source Of Income",
        path: `InsurableItem.0.RiskItems.${tab}.Occupation.SourceOfIncome`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Educational Qualification",
        path: `InsurableItem.0.RiskItems.${tab}.Occupation.EducationalQualification`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Annual Income(2022-2023)",
        path: `InsurableItem.0.RiskItems.${tab}.Occupation.AnnualIncome1`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Annual Income(2021-2022)",
        path: `InsurableItem.0.RiskItems.${tab}.Occupation.AnnualIncome2`,
      },
      {
        type: "Input",
        visible: true,
        disabled: false,
        label: "Annual Income(2020-2021)",
        path: `InsurableItem.0.RiskItems.${tab}.Occupation.AnnualIncome3`,
      },
      // ...spreadOccupationQuestions(),
    ],
    "Nominee Details": [
      {
        type: "DataGrid",
        visible: true,
        rowId: "rowID",
        spacing: 12,
        disableOnReset: true,
        columns: [
          {
            field: "Nomineename",
            headerName: "Nominee Name",
            width: 150,
          },
          {
            field: "Relationship",
            headerName: "Relationship",
            width: 150,
          },
          {
            field: "Share",
            headerName: "share",
            width: 150,
          },
          {
            field: "Address",
            headerName: "Address",
            width: 300,
          },
          {
            field: "Pincode",
            headerName: "Pincode",
            width: 150,
          },
        ],
        // value: [...masters.MedicalSelectedDoc],
      },
    ],
  };
  return (
    <MDBox sx={{ bgcolor: "#FFFFFF", minHeight: "85vh" }} p={3}>
      <MDLoader loader={loading} />
      {process.env.NODE_ENV === "development" && (
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            control={<Switch checked={valSwitch} onChange={onValSwitch} />}
            label="Validations"
          />

          <MDButton variant="text" onClick={onConsoleDto}>
            Console PolicyDto
          </MDButton>
        </Stack>
      )}
      <Drawer
        sx={{
          width: "50vw",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "50vw",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={DrawerOpen}
        onClose={onDrawerClose}
      >
        <ReactJson
          src={dto}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          // enableClipboard={0}
          onAdd={(e) => setDto({ ...e.updated_src })}
          onDelete={(e) => setDto({ ...e.updated_src })}
          onEdit={(e) => setDto({ ...e.updated_src })}
          style={{ fontSize: 15 }}
        />
      </Drawer>
      {cardRef !== null && (
        <Card
          sx={{
            ...movingCardPosition,
            minWidth: 235,
            bgcolor: stageStatus[dashboardTab].color,
            cursor: "pointer",
            transition: "all 500ms ease, visibility 0s",

            zIndex: 10,
            position: "absolute",
            visibility: proposalNumber === "" ? "visible" : "hidden",
          }}
        >
          <CardContent>
            <MDTypography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                color: "White",
                transition: "all 500ms ease",
              }}
              gutterBottom
            >
              {stageStatus[dashboardTab].statusName}
            </MDTypography>
            <MDBox display="flex" flexDirection="row" justifyContent="space-between" pt={4}>
              <CountUp
                start={0}
                id="count"
                end={stageStatus[dashboardTab].stageStatusCount}
                duration={3.5}
                style={{
                  fontWeight: "bold",
                  fontSize: "2rem",
                  color: "white",
                  transition: "all 500ms ease",
                }}
                // useEasing={true}
                // useGrouping={true}
                separator=" "
              />
              <MDTypography
                style={{
                  color: "white",
                  fontWeight: "400",
                  fontSize: "16px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginLeft: "150px",
                  transition: "all 500ms ease",
                }}
                mt={2}
                // onClick={() => redirect(x.redirect)}
              >
                View&nbsp;All
              </MDTypography>
            </MDBox>
          </CardContent>
        </Card>
      )}
      {proposalNumber === "" && (
        <Grid container spacing={2}>
          {stageStatus.map((item, index) => (
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ maxWidth: 300 }}>
              <Card
                ref={index === dashboardTab ? cardRef : dummyRef}
                sx={{
                  minWidth: 235,
                  bgcolor: index === dashboardTab ? item.color : "#DDDEE1",
                  cursor: "pointer",
                  transition: "all 500ms ease",
                  "&:hover": {
                    bgcolor: item.color,
                  },
                }}
                onClick={(e) => handleClick(e, item.stageStatusID, index)}
              >
                <CardContent>
                  <MDTypography
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: index === dashboardTab ? "White" : "black",
                      transition: "all 500ms ease",
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
                        color: index === dashboardTab ? "white" : "black",
                        transition: "all 500ms ease",
                      }}
                      // useEasing={true}
                      // useGrouping={true}
                      separator=" "
                    />
                    <MDTypography
                      style={{
                        color: index === dashboardTab ? "white" : "black",
                        fontWeight: "400",
                        fontSize: "16px",
                        cursor: "pointer",
                        textDecoration: "underline",
                        marginLeft: "150px",
                        transition: "all 500ms ease",
                      }}
                      mt={2}
                      // onClick={() => redirect(x.redirect)}
                    >
                      View&nbsp;All
                    </MDTypography>
                  </MDBox>
                  {item.loading && <CircularProgress color="white" />}
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" justifyContent="space-between" pt={2}>
              <MDTypography sx={{ fontWeight: "bold" }}>Pending Proposals</MDTypography>
            </Stack>
          </Grid>
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <DataGrid
                autoHeight
                rows={rows}
                columns={tableColumns}
                getRowId={(row) => row.id}
                components={{ Toolbar: GridToolbar }}
                checkboxSelection
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                pagination
                loading={datagridLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      {proposalNumber !== "" && (
        <MDBox>
          <MDButton variant="outlined" onClick={() => setProposalNumber("")}>
            Back
          </MDButton>
          <MDBox
            sx={{
              p: "1px",
            }}
            mt={2}
          >
            <MDBox
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              borderRadius="10px"
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
                <b>Proposal No :</b> {`${proposalNumber}`}
              </MDTypography>
              <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Plan Name :</b> {`${proposalJson?.policyDetails?.Product}`}
              </MDTypography>
              <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Proposer Name :</b>{" "}
                {`${proposalJson?.policyDetails?.ProposerDetails?.FirstName} ${proposalJson?.policyDetails?.ProposerDetails?.LastName}`}
              </MDTypography>
              <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Total Premium Paid :</b> ₹&nbsp;
                {formatCurrency(`${proposalJson?.policyDetails?.PremiumDetails["Total Premium"]}`)}
              </MDTypography>
            </MDBox>
          </MDBox>
          {/* <MDTypography
            p={2}
            textAlign="center"
            variant="h4"
          >{`Proposal Number : ${proposalNumber}`}</MDTypography> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={7.5} lg={7.5} xl={7.5} xxl={7.5}>
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
                p={2}
                spacing={2}
                direction="row"
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <MDButton onClick={onSave} variant="outlined">
                  Save
                </MDButton>
                <MDButton onClick={onSubmit}>Submit</MDButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
              <MDBox sx={{ backgroundColor: "#FBFBFD" }} p={2} mt={2}>
                <Stack display="flex" flexDirection="row" justifyContent="space-between">
                  <MDBox
                    sx={{
                      p: "1px",
                    }}
                  >
                    <MDBox
                      sx={{
                        backgroundColor: "#1d4e9e",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                      p={0.5}
                    >
                      <MDTypography
                        color="white"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        Proposal Details
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDButton
                    variant="contained"
                    color="secondary"
                    startIcon={<Icon>download</Icon>}
                    sx={{ color: "#000000" }}
                  >
                    Proposal PDF
                  </MDButton>
                </Stack>
                <Grid container spacing={2} mt={2}>
                  {Drawercard.map((item) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <Card
                        sx={{
                          minWidth: "100%",
                          height: 70,
                          bgcolor: "rgba(218, 232, 254, 1)",
                          cursor: "pointer",
                        }}
                        onClick={() => handleCardClick(`${item.label1} ${item.label2}`)}
                      >
                        <CardContent>
                          <MDTypography
                            sx={{
                              fontSize: 15,
                              fontWeight: "bold",
                              textAlign: "center",
                              textColor: "#000000",
                            }}
                          >
                            {item.label1}
                          </MDTypography>
                          <MDTypography
                            sx={{
                              fontSize: 15,
                              fontWeight: "bold",
                              textAlign: "center",
                              textColor: "#000000",
                            }}
                          >
                            {item.label2}
                          </MDTypography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      )}
      <Drawer
        variant="persistent"
        anchor="right"
        open={drawer}
        sx={{
          "& .MuiDrawer-paper": {
            margin: "0rem",
            width: matches ? "70vw" : "100%",
            height: "100vh",
          },
        }}
      >
        <MDBox p={2}>
          <Stack direction="row" justifyContent="space-between" p={2}>
            <MDBox
              sx={{
                p: "1px",
              }}
            >
              <MDBox
                sx={{
                  backgroundColor: "#1d4e9e",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
                p={0.5}
              >
                <MDTypography
                  color="white"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {selectedItem}
                </MDTypography>
              </MDBox>
            </MDBox>
            <IconButton onClick={handleCloseDrawer}>
              <Icon fontSize="large">close</Icon>
            </IconButton>
          </Stack>
          <Grid container spacing={2} p={2}>
            {selectedItem &&
              Drawercomponents[selectedItem].map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={item.spacing ? item.spacing : 3.5}
                  lg={item.spacing ? item.spacing : 3.5}
                  xl={item.spacing ? item.spacing : 3}
                  xxl={item.spacing ? item.spacing : 3}
                >
                  <NewRenderControl item={{ ...item, disabled: true }} dto={dto} setDto={setDto} />
                </Grid>
              ))}
          </Grid>
        </MDBox>
      </Drawer>
    </MDBox>
  );
}
