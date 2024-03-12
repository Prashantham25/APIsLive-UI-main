import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Drawer,
  Autocomplete,
  TextField,
  Divider,
  Menu,
  MenuItem,
  // IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import swal from "sweetalert2";
// import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import * as XLSX from "xlsx";
import magmapayment from "assets/images/Magma/magmapayment.png";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "../../../../../../../components/MDInput";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import { setGenericInfo, useDataController } from "../../../../../../BrokerPortal/context";
import { GetPayLoadByQueryDynamic, GetEndorsementJson, GetPolicy } from "../data/index";

export default function EndorsementList() {
  // const [flags, setFlags] = useState({ endorsementNoFlg: false, requestNoFlg: false });
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [isDrawerOpen1, setDrawerOpen1] = useState(false);
  const [isDrawerOpen2, setDrawerOpen2] = useState(false);
  //   const [id, setId] = useState();
  const handleRequest = async (number) => {
    await GetEndorsementJson(number).then((res) => {
      setResult(res.data.finalResult);
      if (
        (res.data.finalResult &&
          res.data.finalResult?.EndorsementType[0]?.mValue === "Non-Financial Endorsement") ||
        (res.data.finalResult?.EndorsementType[0]?.mValue === "Financial Endorsement" &&
          res.data.finalResult?.EndorsementType[1]?.endorsementConfigName ===
            "SI and Plan Change") ||
        (res.data.finalResult?.EndorsementType[0]?.mValue === "Financial Endorsement" &&
          res.data.finalResult?.EndorsementType[1]?.endorsementConfigName === "DOB and DOC Change")
      ) {
        setDrawerOpen2(true);
      }
      if (
        res.data.finalResult?.EndorsementType[0]?.mValue === "Financial Endorsement" &&
        res.data.finalResult?.EndorsementType[1]?.endorsementConfigName !== "SI and Plan Change" &&
        res.data.finalResult?.EndorsementType[0]?.mValue === "Financial Endorsement" &&
        res.data.finalResult?.EndorsementType[1]?.endorsementConfigName !== "DOB and DOC Change"
      ) {
        setDrawerOpen1(true);
      }
    });
  };
  const styleAuto = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
      backgroundColor: "#eceff1",
    },
  };
  const handleDrawerClose = () => {
    setDrawerOpen1(false);
    setDrawerOpen2(false);
  };
  const [rows, setRows] = useState([]);
  useEffect(async () => {
    setLoading(true);
    const obj = {
      reportname: "MagmaEndorsementList",
      paramList: [
        {
          ParameterName: "Product_ID_Pk",
          ParameterValue: 1022,
        },
        {
          ParameterName: "Action",
          ParameterValue: "Endorsement",
        },
        {
          ParameterName: "PolicyStatusId",
          ParameterValue: 1,
        },
      ],
    };
    const GetUse = await GetPayLoadByQueryDynamic(obj);
    console.log("RESOPNSEEE", GetUse);
    if (GetUse.response && GetUse.response.status === 500) {
      swal.fire({
        icon: "error",
        text: "No Record Found",
        confirmButtonText: "OK",
        confirmButtonColor: "#bf360c",
      });
    } else {
      GetUse.finalResult[0].DocType = "New Business";
      setRows([...GetUse.finalResult]);
    }
    setLoading(false);
  }, []);
  console.log("ROWSSSSSSSS", rows);
  const [, dispatch] = useDataController();
  const Naviagte = useNavigate();
  const handleCreateEndorsement = () => {
    setGenericInfo(dispatch, { prod: "CreateEndorsement", prodLabel: "Create Endorsement" });
    Naviagte("/newRetail");
  };
  const createExcelFileAndDownload = (data, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: fileType });

    const url = window.URL.createObjectURL(excelBlob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    setLoading(false);
  };
  const handledownloadExcel = () => {
    setLoading(true);
    const baseData = rows.map((x, index) => ({
      id: index,
      EndorsementNo: x.EndorsementNumber,
      EndorsementRequestNo: x.EndorsementRequestNo,
      Status: x.Status,
      DocumentID: "--",
      Flag: x.Flag,
      EndorsementType: x.EndorsementType,
      EndorsementCategory: x.EndorsementCategory,
      COINO: x.COINumber,
      EndorsementDate: x.EndorsementDate,
      UploadedBy: x.UploadedBy,
    }));
    const flattenedData = baseData.flat();
    const filename = "Endorsement List.xlsx";
    createExcelFileAndDownload(flattenedData, filename);
    swal.fire({
      html: `<div style="display: flex; justify-content: center;">
      <table width="100%">
          <tr>
              <td style="text-align: center;">
                  <img src="${magmapayment}" alt="success image" style="display: block; margin: 0 auto;">
                  <br>
                  <strong>The Excel File Has Been Downloaded Successfully</strong>
              </td>
          </tr>
      </table>
  </div>`,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "Close",
      confirmButtonColor: "red",
    });
  };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);
    link.click();
  };
  const handleDownloadEndorsement = async (
    endorsementRequestNo,
    endorsementtype,
    endorsementcategory,
    endorsementno
  ) => {
    if (
      endorsementtype === "Policy Cancellation" &&
      endorsementcategory === "COI Policy Cancellation"
    ) {
      const Payload = {
        key: endorsementRequestNo,
        keyValue: "",
        templateKey: "",
        templateId: 342,
        requestData: "",
        referenceId: "",
        communicationId: 0,
      };
      const policy = await GetPolicy(Payload);
      console.log("polidownload1", policy);
      generateFile(policy.data, endorsementno);
    }
  };
  const row = rows.map((x, index) => ({
    id: index,
    EndorsementNo: x.EndorsementNumber,
    EndorsementRequestNo: x.EndorsementRequestNo,
    Status: x.Status,
    DocumentID: "--",
    Flag: x.Flag,
    EndorsementType: x.EndorsementType,
    EndorsementCategory: x.EndorsementCategory,
    COINO: x.COINumber,
    EndorsementDate: x.EndorsementDate,
    UploadedBy: x.UploadedBy,
  }));
  const [ids, setId] = useState(-1);
  const handleView = (event, i) => {
    setAnchorEl(event.currentTarget);
    setId(i);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const columns = [
    // {
    //   field: "id",
    //   headerName: "S No.",F
    //   headerAlign: "center",
    //   align: "center",
    //   width: 50,
    // },
    {
      field: "EndorsementNo",
      headerName: "Endorsement No.",
      headerAlign: "center",
      align: "center",
      width: 300,
      renderCell: (params) => {
        const rowId = params.value;
        const endorsementRequestNo = params.row.EndorsementRequestNo;
        if (rowId) {
          return (
            <button
              type="button"
              style={{
                textDecoration: "underline",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={() => handleRequest(endorsementRequestNo, "EndorsementNo")}
            >
              {rowId}
            </button>
          );
        }
        return "N/A";
      },
    },
    {
      field: "EndorsementRequestNo",
      headerName: "Endorsement Request No.",
      headerAlign: "center",
      align: "center",
      width: 270,
      height: 80,
      renderCell: (params) => {
        const rowId = params.value;
        if (rowId) {
          return (
            <button
              type="button"
              onClick={() => handleRequest(rowId, "EndorsementRequestNo")}
              style={{
                textDecoration: "underline",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              {rowId}
            </button>
          );
        }
        return "N/A";
      },
    },
    {
      field: "Status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "DocumentID",
      headerName: "Document ID",
      headerAlign: "center",
      align: "center",
      width: 160,
      renderCell: (params) => {
        const docid = params.value;
        if (docid) {
          return docid;
        }
        return "N/A";
      },
    },
    {
      field: "Flag",
      headerName: "Flag",
      headerAlign: "center",
      align: "center",
      width: 90,
    },
    {
      field: "EndorsementType",
      headerName: "Endorsement Type",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "EndorsementCategory",
      headerName: "Endorsement Category",
      headerAlign: "center",
      align: "center",
      width: 340,
    },
    {
      field: "COINO",
      headerName: "COI No.",
      headerAlign: "center",
      align: "center",
      width: 350,
    },
    {
      field: "EndorsementDate",
      headerName: "Endorsement Date",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "UploadedBy",
      headerName: "Uploaded By",
      headerAlign: "center",
      align: "center",
      width: 240,
    },

    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 70,
    //   editable: true,
    //   // renderCell: (param) => {
    //   renderCell: (params) => {
    //     console.log("Status:", params.row.Status);
    //     // const handleDownload = async () => {
    //     //   Payload.key = policyNo;
    //     //   const policy = await GetPolicy(Payload);

    //     //   generateFile(policy.data, policyNo);
    //     // };
    //     // const OnEmail = () => {
    //     //   email.key = policyNo;
    //     //   EventCommunicationExecution(email).then((res) => {
    //     //     console.log("email", res);
    //     //     // setGenericPolicyDto(dispatch, { ...genericPolicyDto, EmailNotification: res });
    //     //     if (res.data.status === 1) {
    //     //       swal.fire({
    //     //         icon: "success",
    //     //         text: `Mail is sent successfully`,
    //     //       });
    //     //     }
    //     //   });
    //     // };
    //     const handleMenuClose = () => {
    //       setAnchorEl(null);
    //     };
    //     const handleView = (event) => {
    //       setAnchorEl(event.currentTarget);
    //       // setPolicyNo(param.row.EndorsementNo);
    //     };

    //     return (
    //       <div>
    //         <IconButton onClick={handleView}>
    //           <MoreVertIcon />
    //         </IconButton>
    //         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
    //           {/* {rows?.some(
    //             (item) =>
    //               item.Status === "Success" && (
    //                 <> */}
    //           <MenuItem disabled={params.row.Status.trim() !== "Success"}>&nbsp; Download</MenuItem>
    //           <MenuItem disabled={params.row.Status.trim() !== "Success"}>&nbsp; Email</MenuItem>
    //           {/* </>
    //               )
    //           )} */}
    //           <MenuItem>&nbsp; View Summary</MenuItem>
    //         </Menu>
    //       </div>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        console.log("Status1111111:", params.row.Status);
        const endorsementRequestNo = params.row.EndorsementRequestNo;
        const endorsementtype = params.row.EndorsementType;
        const endorsementcategory = params.row.EndorsementCategory;
        const endorsementno = params.row.EndorsementNumber;
        return (
          <>
            <MoreVertIcon
              fontSize="medium"
              onClick={(e) => handleView(e, params.row.EndorsementRequestNo)}
            />
            <Menu
              anchorEl={anchorEl}
              open={ids === params.row.EndorsementRequestNo && Boolean(anchorEl)}
              // open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() =>
                  handleDownloadEndorsement(
                    endorsementRequestNo,
                    endorsementtype,
                    endorsementcategory,
                    endorsementno
                  )
                }
                disabled={!(params.row.Status.trim() === "Success")}
              >
                &nbsp; Download
              </MenuItem>
              <MenuItem disabled={!(params.row.Status.trim() === "Success")}>&nbsp; Email</MenuItem>
              <MenuItem onClick={() => handleRequest(endorsementRequestNo, "EndorsementNo")}>
                &nbsp; View Summary
              </MenuItem>
              {/* <MenuItem onClick={() => HandleDownload(rowId)}>Download Certificate</MenuItem> */}
            </Menu>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Card>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={7.5} lg={7.5} xl={7.5} xxl={7.5}>
            <MDTypography variant="h3">Endorsements List</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <MDButton
              variant="contained"
              color="error"
              endIcon={<DownloadIcon />}
              onClick={handledownloadExcel}
            >
              Download xlsx
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
            <MDButton
              variant="contained"
              color="error"
              startIcon={<AddIcon />}
              onClick={handleCreateEndorsement}
            >
              Create Endorsement
            </MDButton>
          </Grid>
          {/* <MDBox m={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                <MDButton variant="contained" color="error">
                  Search MP
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ height: 400, width: "100%" }}>
              <DataGrid rows={row} columns={columns} getRowId={(r) => r.EndorsementRequestNo} />
            </MDBox>
          </Grid>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress />
          </Backdrop>
        </Grid>
      </Card>
      <Drawer
        anchor="right"
        open={isDrawerOpen1}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: "80%", padding: "32px" },
          loader: "backDrop",
        }}
      >
        <MDButton
          size="large"
          startIcon={<CloseIcon />}
          variant="text"
          sx={{ fontSize: "2rem" }}
          onClick={handleDrawerClose}
          style={{
            position: "fixed",
            top: 5,
            right: 0,
            zIndex: 1,
            background: "transparent",
            border: "none",
            color: "black",
            cursor: "pointer",
          }}
        />
        <Grid container spacing={3} p={2}>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{
                  color: "#000",
                  fontfamily: "Roboto",
                  fontsize: "18px",
                  fontstyle: "normal",
                  fontweight: "500",
                  lineheight: "normal",
                }}
              >
                Summary
              </MDTypography>
            </Grid>
            <Grid>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={12} md={3.6} lg={3.6} xl={3.6} xxl={3.6}>
                  <MDInput
                    name="COINumber"
                    label="COI Number"
                    value={result && result?.PolicyNo}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="EndorsementType"
                    label="Endorsement Type"
                    value={result.EndorsementType && result.EndorsementType[0]?.mValue}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="EndorsementCategory"
                    label="Endorsement Category"
                    value={
                      result.EndorsementType && result.EndorsementType[1]?.endorsementConfigName
                    }
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4} xxl={2.4}>
                  <MDDatePicker
                    input={{ label: "Effective Date" }}
                    name="EffectiveDate"
                    variant="outlined"
                    value={result && result?.EndorsementDetails?.EndorsementEffectiveDate}
                    options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="EndorsementRequestNo"
                    label="Endorsement Request No."
                    value={result && result?.EndorsementNo}
                    variant="outlined"
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {result &&
            result?.EndorsementDetails?.InsurableItem[0].RiskItems.map((x, i) => (
              <Accordion expanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <MDTypography
                    color="Black"
                    sx={{
                      color: "#000",
                      fontfamily: "Roboto",
                      fontsize: "18px",
                      fontstyle: "normal",
                      fontweight: "500",
                      lineheight: "normal",
                    }}
                  >
                    {`Member Details ${i + 1}`}
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <MDInput
                        name="MemberID"
                        label="Member ID"
                        variant="outlined"
                        disabled
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].FamilyID
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="MemberName"
                        label="Member Name"
                        variant="outlined"
                        disabled
                        value={
                          result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Name
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="PlanName"
                        label="Plan Name"
                        variant="outlined"
                        value={
                          result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Plan
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDDatePicker
                        input={{ label: "Date of Birth" }}
                        name="DateofBirth"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].DateofBirth
                        }
                        options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="Age"
                        label="Age"
                        variant="outlined"
                        value={
                          result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Age
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Autocomplete
                        name="Gender"
                        sx={styleAuto}
                        variant="outlined"
                        options={["Male", "Female"]}
                        value={
                          result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Gender
                        }
                        renderInput={(op) => <TextField {...op} label="Gender" />}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Autocomplete
                        name="Relationship"
                        sx={styleAuto}
                        variant="outlined"
                        options={["Self", "Other"]}
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .RelationShipToProposer
                        }
                        renderInput={(op) => <TextField {...op} label="Relationship" />}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDDatePicker
                        input={{ label: "Date of Joining" }}
                        name="DateofJoining"
                        variant="outlined"
                        value={
                          result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].DOJ
                        }
                        options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDDatePicker
                        input={{ label: "Date of Commencemet" }}
                        name="DateofCommencement"
                        variant="outlined"
                        value={
                          result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].DOC
                        }
                        options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDDatePicker
                        input={{ label: "Date of Loss" }}
                        name="DateofLoss"
                        variant="outlined"
                        options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="SumInsured"
                        label="Sum Insured"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].SumInsured
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDDatePicker
                        input={{ label: "Coverage End Date" }}
                        name="CoverageEndDate"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].CoverageEndDate
                        }
                        options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="EliteStatus"
                        label="Elite Status"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].ElliteStatus
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="Location"
                        label="Location"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Location
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="Grade"
                        label="Grade"
                        variant="outlined"
                        value={
                          result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Grade
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="Designation"
                        label="Designation"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Designation
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="MobileNo"
                        label="Mobile No."
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].MobileNumber
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="EmailID"
                        label="Email ID"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].EmailID
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="NoofLives"
                        label="No.Of Lives"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].NoOfLives
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography
                        sx={{
                          color: "#000",
                          fontfamily: "Roboto",
                          fontsize: "18px",
                          fontstyle: "normal",
                          fontweight: "500",
                          lineheight: "normal",
                        }}
                      >
                        Nominee Details
                      </MDTypography>
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="NomineeName"
                        label="Nominee Name"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .NomineeDetails[0].NomineeName
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Autocomplete
                        name="Nominee Relationship"
                        sx={styleAuto}
                        variant="outlined"
                        options={["Mother", "Father"]}
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .NomineeDetails[0].NomineeRelationWithProposer
                        }
                        renderInput={(op) => <TextField {...op} label="Relationship" />}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDDatePicker
                        input={{ label: "Nominee DOB" }}
                        name="NomineeDOB"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .NomineeDetails[0].NomineeDOB
                        }
                        options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography
                        sx={{
                          color: "#000",
                          fontfamily: "Roboto",
                          fontsize: "18px",
                          fontstyle: "normal",
                          fontweight: "500",
                          lineheight: "normal",
                        }}
                      >
                        Other Details
                      </MDTypography>
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="COINoIssuedByCustomer"
                        label="COI No. Issued by Customer"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .AdditionalDetails.COINumberIssuedByCustomer
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="LoanEMIAmount"
                        label="Loan EMI Amount"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .AdditionalDetails.LoanEMIAmount
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="PersonalAccidentSumInsured"
                        label="Personal Accident Sum Insured"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .AdditionalDetails.PersonalAccidentSumInsured
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="CriticalIllnessSumInsured"
                        label="Critical Illness Sum Insured"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .AdditionalDetails.CriticalIllnessSumInsured
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="GHDResponse"
                        label="GHD Response"
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="PremiumEmployeerContribution"
                        label="Premium Employeer Contribution"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .AdditionalDetails.PremiumEmployerContribution
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="PremiumEmployeeContribution"
                        label="Premium Employee Contribution"
                        variant="outlined"
                        value={
                          result &&
                          result?.EndorsementDetails?.InsurableItem[0].RiskItems[i]
                            .AdditionalDetails.PremiumEmployeeContriution
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput
                        name="OverwriteDedupeLogic"
                        label="Overwrite Dedupe Logic"
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MDInput name="Flag" label="Flag" variant="outlined" disabled />
                    </Grid>
                    {result &&
                      result?.EndorsementDetails?.DeviationDetails &&
                      result?.EndorsementDetails?.DeviationDetails?.failureCode === "400" &&
                      result?.EndorsementDetails?.DeviationDetails?.outcome === "Fail" &&
                      result?.EndorsementDetails?.DeviationDetails?.memberRulesResult &&
                      result?.EndorsementDetails?.DeviationDetails?.memberRulesResult[0]?.memberRulesResult.find(
                        (member) =>
                          member.rulesResult.find(
                            (rule) => rule.failureCode === "400" && rule.outcome === "Fail"
                          )
                      ) && (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                          <MDTypography
                            sx={{
                              color: "#000",
                              fontfamily: "Roboto",
                              fontsize: "18px",
                              fontstyle: "normal",
                              fontweight: "500",
                              lineheight: "normal",
                            }}
                          >
                            Deviation Details
                          </MDTypography>
                        </Grid>
                      )}
                    {result &&
                      result?.EndorsementDetails?.DeviationDetails &&
                      result?.EndorsementDetails?.DeviationDetails?.failureCode === "400" &&
                      result?.EndorsementDetails?.DeviationDetails?.outcome === "Fail" &&
                      result?.EndorsementDetails?.DeviationDetails?.memberRulesResult &&
                      result?.EndorsementDetails?.DeviationDetails?.memberRulesResult[0]?.memberRulesResult.map(
                        (member, memberIndex) => (
                          <Grid>
                            {memberIndex === i &&
                              member.rulesResult.map((rule) =>
                                rule.failureCode === "400" && rule.outcome === "Fail" ? (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    xxl={12}
                                    mt={2}
                                    ml={3}
                                  >
                                    <MDTypography>{rule.failureMsg}</MDTypography>
                                  </Grid>
                                ) : null
                              )}
                          </Grid>
                        )
                      )}
                    {result[0] &&
                      result[0].policyRequest.DeviationDetails &&
                      result[0].policyRequest.DeviationDetails.failureCode === "400" &&
                      result[0].policyRequest.DeviationDetails.outcome === "Fail" &&
                      result[0].policyRequest.DeviationDetails.memberRulesResult &&
                      result[0].policyRequest.DeviationDetails.memberRulesResult[0]?.memberRulesResult.find(
                        (member) =>
                          member.rulesResult.find(
                            (rule) => rule.failureCode === "400" && rule.outcome === "Fail"
                          )
                      ) && (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                          <MDTypography
                            sx={{
                              color: "#000",
                              fontfamily: "Roboto",
                              fontsize: "18px",
                              fontstyle: "normal",
                              fontweight: "500",
                              lineheight: "normal",
                            }}
                          >
                            Deviation Details
                          </MDTypography>
                        </Grid>
                      )}
                    {result[0] &&
                      result[0].policyRequest.DeviationDetails &&
                      result[0].policyRequest.DeviationDetails.failureCode === "400" &&
                      result[0].policyRequest.DeviationDetails.outcome === "Fail" &&
                      result[0].policyRequest.DeviationDetails.memberRulesResult &&
                      result[0].policyRequest.DeviationDetails.memberRulesResult[0].memberRulesResult.map(
                        (member, memberIndex) => (
                          <Grid>
                            {memberIndex === i &&
                              member.rulesResult.map((rule) =>
                                rule.failureCode === "400" && rule.outcome === "Fail" ? (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    xxl={12}
                                    mt={2}
                                    ml={3}
                                  >
                                    <MDTypography>{rule.failureMsg}</MDTypography>
                                  </Grid>
                                ) : null
                              )}
                          </Grid>
                        )
                      )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          {result && result?.EndorsementDetails?.AdditionalDetails.SpecialCondition && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{
                  color: "#000",
                  fontfamily: "Roboto",
                  fontsize: "18px",
                  fontstyle: "normal",
                  fontweight: "500",
                  lineheight: "normal",
                }}
              >
                Special Conditions
              </MDTypography>
            </Grid>
          )}
          {result &&
            result?.EndorsementDetails?.AdditionalDetails.SpecialCondition.map((special, id) => (
              <Grid container spacing={3} p={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    name="SpecialCondition"
                    label="Special Condition"
                    variant="outlined"
                    value={
                      result &&
                      result?.EndorsementDetails?.AdditionalDetails.SpecialCondition[id]
                        .SpecialCondition
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="SpecialConditionValue"
                    label="Special Condition Value"
                    variant="outlined"
                    value={
                      result &&
                      result?.EndorsementDetails?.AdditionalDetails.SpecialCondition[id]
                        .SpecialConditionValue
                    }
                    disabled
                  />
                </Grid>
              </Grid>
            ))}
          {result && result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium && (
            <Grid item align="center" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={4}>
              <Card sx={{ width: "400px", backgroundColor: "#f0f2f5" }}>
                <Grid container justifyContent="space-between" spacing={2} p={2}>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography>Total Premium</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography>
                      ₹{" "}
                      {result &&
                        result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium
                          ?.TotalPremium}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography>Premium to be paid</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography>
                      ₹{" "}
                      {result &&
                        result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium
                          ?.PremiumToBePaid}
                    </MDTypography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
          <Grid item align="right" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={4}>
            <MDButton variant="contained" color="error" onClick={handleDrawerClose}>
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Drawer>
      <Drawer
        anchor="right"
        open={isDrawerOpen2}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: "80%", padding: "32px" },
          loader: "backDrop",
        }}
      >
        <MDButton
          size="large"
          startIcon={<CloseIcon />}
          variant="text"
          sx={{ fontSize: "2rem" }}
          onClick={handleDrawerClose}
          style={{
            position: "fixed",
            top: 5,
            right: 0,
            zIndex: 1,
            background: "transparent",
            border: "none",
            color: "black",
            cursor: "pointer",
          }}
        />
        <Grid container spacing={3} p={2}>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{
                  color: "#000",
                  fontfamily: "Roboto",
                  fontsize: "18px",
                  fontstyle: "normal",
                  fontweight: "500",
                  lineheight: "normal",
                }}
              >
                Summary
              </MDTypography>
            </Grid>
            <Grid>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={12} md={3.6} lg={3.6} xl={3.6} xxl={3.6}>
                  <MDInput
                    name="COINumber"
                    label="COI Number"
                    value={result && result?.PolicyNo}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="EndorsementType"
                    label="Endorsement Type"
                    value={result.EndorsementType && result.EndorsementType[0]?.mValue}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="EndorsementCategory"
                    label="Endorsement Category"
                    value={
                      result.EndorsementType && result.EndorsementType[1]?.endorsementConfigName
                    }
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4} xxl={2.4}>
                  <MDDatePicker
                    input={{ label: "Effective Date" }}
                    name="EffectiveDate"
                    variant="outlined"
                    value={result && result?.EndorsementDetails?.EndorsementEffectiveDate}
                    options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="EndorsementRequestNo"
                    label="Endorsement Request No."
                    value={result && result?.EndorsementNo}
                    variant="outlined"
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={5.8} lg={5.8} xl={5.8} xxl={5.8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h4">Exsisting Member Details</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5">John Abraham</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Member Name"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDDatePicker
                    label="DOB"
                    input={{ label: "DOB" }}
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Age"
                    disabled
                    // value={}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={0.4} lg={0.4} xl={0.4} xxl={0.4}>
              <Divider
                orientation="vertical"
                sx={{
                  border: "1px solid",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5.8} lg={5.8} xl={5.8} xxl={5.8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h4">New Member Details</MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={5}>
                  <MDInput
                    label="Member Name"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={5}>
                  <MDDatePicker
                    label="DOB"
                    input={{ label: "DOB" }}
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Age"
                    disabled
                    // value={}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={5.8} lg={5.8} xl={5.8} xxl={5.8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5">Raju</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Member Name"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDDatePicker
                    label="DOB"
                    disabled
                    input={{ label: "DOB" }}
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Age"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Loan EMI Amount"
                    disabled
                    // value={}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={0.4} lg={0.4} xl={0.4} xxl={0.4}>
              <Divider
                orientation="vertical"
                sx={{
                  border: "1px solid",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5.8} lg={5.8} xl={5.8} xxl={5.8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={5}>
                  <MDInput
                    label="Member Name"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={5}>
                  <MDDatePicker
                    label="DOB"
                    disabled
                    input={{ label: "DOB" }}
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Age"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Loan EMI Amount"
                    disabled
                    // value={}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={5.8} lg={5.8} xl={5.8} xxl={5.8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5">Fasil</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Member Name"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDDatePicker
                    label="DOB"
                    disabled
                    input={{ label: "DOB" }}
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Age"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Loan EMI Amount"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Plan Name"
                    disabled
                    // value={}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={0.4} lg={0.4} xl={0.4} xxl={0.4}>
              <Divider
                orientation="vertical"
                sx={{
                  border: "1px solid",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5.8} lg={5.8} xl={5.8} xxl={5.8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={5}>
                  <MDInput
                    label="Member Name"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={5}>
                  <MDDatePicker
                    label="DOB"
                    disabled
                    input={{ label: "DOB" }}
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Age"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Loan EMI Amount"
                    disabled
                    // value={}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Plan Name"
                    disabled
                    // value={}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {result && result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium && (
            <Grid item align="center" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={4}>
              <Card sx={{ width: "400px", backgroundColor: "#f0f2f5" }}>
                <Grid container justifyContent="space-between" spacing={2} p={2}>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography>Total Premium</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography>
                      ₹{" "}
                      {result &&
                        result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium
                          ?.TotalPremium}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography>Premium to be paid</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography>
                      ₹{" "}
                      {result &&
                        result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium
                          ?.PremiumToBePaid}
                    </MDTypography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
          <Grid item align="right" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={4}>
            <MDButton variant="contained" color="error" onClick={handleDrawerClose}>
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
