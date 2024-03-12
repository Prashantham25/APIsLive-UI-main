import React, { useState } from "react";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { Grid, Card, Modal, IconButton, Backdrop, CircularProgress } from "@mui/material";
import success from "assets/images/Magma/success.jpg";
import Swal from "sweetalert2";
import DownloadIcon from "@mui/icons-material/Download";
import MDDatePicker from "components/MDDatePicker";
import CloseIcon from "@mui/icons-material/Close";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";
import MDBox from "../../../../../../components/MDBox";
import { QueryExecution, GetDynamicPermissions } from "./data/index";

function IssuanceReports() {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedDatePickers, setSelectedDatePickers] = useState({});
  const [selectedRadioId, setSelectedRadioId] = useState(null);
  const [filterResponse, setFilterResponse] = useState(null);
  const [queryExecutionRequest, setQueryExecutionRequest] = useState({
    ReportConfigId: "",
    paramList: [],
  });

  const reports = [
    {
      id: 1,
      label: "All Policies Report",
      report: "Magma_AllPolicies_Report",
    },
    {
      id: 2,
      label: "All Endorsement Report",
      report: "Magma_AllEndorsement_Report",
    },
    {
      id: 3,
      label: "All Lives Report",
      report: "Magma_AllLives_Report",
    },
    {
      id: 4,
      label: "Endorsement Wise Member Details Report",
      report: "Magma_EndoWiseMember_Report",
    },
    {
      id: 5,
      label: "Member Report",
      report: "Magma_Member_Report",
    },
  ];
  const [datefalg, setDateflag] = useState(false);
  const handleRadioChange = (event) => {
    setSelectedRadioId(event.target.id);
    setFromDate("");
    setToDate("");
    setQueryExecutionRequest({
      ReportConfigId: "",
      paramList: [], // Set paramList to an empty array
    });
    setDateflag(true);
  };
  const getRadioOptions = () => {
    const labelStyle = {
      fontSize: "14px",
      display: "inline-block", // Display the labels in a row
      marginRight: "15px", // Add space between labels
    };
    const radioButtonStyle = {
      marginRight: "5px", // Adjust spacing between the button and label
      transform: "scale(1.5)", // Increase the radio button size
    };

    if (selectedID) {
      switch (selectedID) {
        case 1:
          return (
            <>
              <label htmlFor="mpStartDate" style={labelStyle}>
                <input
                  type="radio"
                  id="mpStartDate"
                  name="dateType"
                  value="MP Start Date"
                  onChange={handleRadioChange}
                  style={radioButtonStyle}
                />
                MP Start Date
              </label>
              <label htmlFor="mpSetupDate" style={labelStyle}>
                <input
                  type="radio"
                  id="mpSetupDate"
                  name="dateType"
                  value="MP Set-up Date"
                  onChange={handleRadioChange}
                  style={radioButtonStyle}
                />
                MP Set-up Date
              </label>
            </>
          );
        case 2:
        case 4:
          return (
            <>
              <label htmlFor="transactionDate" style={labelStyle}>
                <input
                  type="radio"
                  id="transactionDate"
                  name="dateType"
                  value="Transaction Date"
                  onChange={handleRadioChange}
                  style={radioButtonStyle}
                />
                Transaction Date
              </label>
              <label htmlFor="coiStartDate" style={labelStyle}>
                <input
                  type="radio"
                  id="coiStartDate"
                  name="dateType"
                  value="COI Start Date"
                  onChange={handleRadioChange}
                  style={radioButtonStyle}
                />
                COI Start Date
              </label>
              <label htmlFor="endorsementEffectiveDate" style={labelStyle}>
                <input
                  type="radio"
                  id="endorsementEffectiveDate"
                  name="dateType"
                  value="Endorsement Effective Date"
                  onChange={handleRadioChange}
                  style={radioButtonStyle}
                />
                Endorsement Effective Date
              </label>
            </>
          );
        case 3:
        case 5:
          return (
            <>
              <label htmlFor="transactionDate" style={labelStyle}>
                <input
                  type="radio"
                  id="transactionDate"
                  name="dateType"
                  value="Transaction Date"
                  style={radioButtonStyle}
                  onChange={handleRadioChange}
                />
                Transaction Date
              </label>
              <label htmlFor="coiStartDate" style={labelStyle}>
                <input
                  type="radio"
                  id="coiStartDate"
                  name="dateType"
                  value="COI Start Date"
                  style={radioButtonStyle}
                  onChange={handleRadioChange}
                />
                COI Start Date
              </label>
            </>
          );
        default:
          return null;
      }
    }
    return null;
  };

  const handleModel = async (label, id, report) => {
    setLoading(false);
    setDateflag(false);
    const userid = localStorage.getItem("userId");
    const roleid = localStorage.getItem("roleId");
    await GetDynamicPermissions(userid, roleid).then((response) => {
      const ReportFilter = response.filter((row) => row.dynamicName === report);

      console.log("print", response);
      setFilterResponse(ReportFilter[0].dynamicId);
    });
    setOpenModal(true);
    setSelectedLabel(label);
    setSelectedID(id);

    setSelectedDatePickers({});
    setQueryExecutionRequest({ ReportConfigId: id, paramList: [] });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLabel(null);
    setFromDate("");
    setToDate("");

    setSelectedDatePickers({});
    setQueryExecutionRequest({ ReportConfigId: "", paramList: [] });
  };
  const idValue = (() => {
    switch (selectedID) {
      case 2:
        return 2;
      case 3:
        return 3;
      case 5:
        return 5;
      default:
        return 4;
    }
  })();
  const Endorsement = [
    {
      ToDate: "MPToDate",
      FromDate: "MPFromDate",
      id: 1,
    },
    {
      ToDate: "MPSetupToDate",
      FromDate: "MPSetupFromDate",
      id: 1,
    },
    {
      ToDate: "TransactionToDate",
      FromDate: "TransactionFromDate",
      id: idValue,
    },
    {
      ToDate: "PolicyToDate",
      FromDate: "PolicyFromDate",
      id: idValue,
    },
    {
      ToDate: "EndorsementToDate",
      FromDate: "EndorsementFromDate",
      id: idValue,
    },
  ];

  const handleChangeDate = (e, name, dates, paramName) => {
    console.log("radioid", selectedRadioId);
    const parts = dates.split("-");
    const date = `${parts[2]}-${parts[1]}-${parts[0]}`;

    const updatedParamList = [...queryExecutionRequest.paramList];

    const index = updatedParamList.findIndex((param) => param.parameterName === paramName);
    console.log("123", index);
    queryExecutionRequest.ReportConfigId = filterResponse;

    if (index !== -1) {
      updatedParamList.forEach((x, i) => {
        if (paramName === x.parameterName) {
          updatedParamList[i].parameterValue = date;
        }
      });
      queryExecutionRequest.ReportConfigId = filterResponse;
      queryExecutionRequest.paramList = updatedParamList;
      setQueryExecutionRequest({ ...queryExecutionRequest });
    } else {
      updatedParamList.push({ parameterName: paramName, parameterValue: date });
      Endorsement.forEach((x) => {
        if (selectedID === x.id) {
          if (name === "DateTo") {
            if (paramName !== x.ToDate) {
              updatedParamList.push({ parameterName: x.ToDate, parameterValue: "" });
            }
          }
          if (name === "fromDate") {
            if (paramName !== x.FromDate) {
              updatedParamList.push({ parameterName: x.FromDate, parameterValue: "" });
            }
          }
        }
      });
      setQueryExecutionRequest({ ...queryExecutionRequest, paramList: updatedParamList });
    }

    setSelectedDatePickers({ ...selectedDatePickers, [paramName]: date });
  };

  const dataToExcel = (arr, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    // Column name Ist letter upperCase in Excel
    const transformedData = arr.map((obj) =>
      Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key.charAt(0).toUpperCase() + key.slice(1),
          value,
        ])
      )
    );

    const ws = XLSX.utils.json_to_sheet(transformedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${fileName}${fileExtension}`);
  };

  const handleDownload = async () => {
    setLoading(true);
    console.log("downloadrequest", queryExecutionRequest);
    const callGenerate = await QueryExecution(queryExecutionRequest);
    console.log("callGenerate", callGenerate);
    if (callGenerate.data.length === 0) {
      setLoading(false);
      setOpenModal(false);
      Swal.fire({
        showCloseButton: true,
        allowOutsideClick: false,
        icon: "error",
        text: `Sorry, No Data Found`,
      });
    } else {
      dataToExcel(callGenerate.data, selectedLabel);
      setLoading(false);
      setOpenModal(false);
      await Swal.fire({
        html: ` <img src="${success}" alt="success image" style="width: 63px; height: 63px;">
      <p style="font-weight: bold; margin-top: 26px;">${selectedLabel} downloaded successfully</p>`,
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Close",
        width: "700px",
        heightAuto: "320px",
      });
    }
    // ...
  };

  return (
    <Card>
      <Grid container p={2}>
        <MDTypography variant="h2">Issuance Reports</MDTypography>
      </Grid>
      <Grid container spacing={1} p={2}>
        {reports.map((x) => (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3} key={x.id}>
            <Card
              sx={{
                background: "#F3F3F3",
                maxWidth: "245px",
                maxHeight: "135px",
                margin: "25px",
                padding: "30px 17px 30px 17px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              component="label"
            >
              <MDTypography align="center" variant="h6">
                {x.label}
              </MDTypography>
              <MDButton
                onClick={() => handleModel(x.label, x.id, x.report)}
                variant="contained"
                color="error"
                sx={{
                  ":hover": {
                    bgcolor: "#24a0ed",
                  },
                  padding: "5px",
                  maxWidth: 110,
                  height: "35px",
                  marginTop: "20px",
                }}
              >
                <DownloadIcon sx={{ spacing: "5px" }} />
                Download
              </MDButton>
            </Card>
          </Grid>
        ))}
        <Modal open={openModal} onClose={handleCloseModal}>
          <MDBox
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "700px",
              height: "380px",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
            }}
          >
            <IconButton
              aria-label="Close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
            <MDTypography align="center" fontWeight="bold">
              {selectedLabel}
            </MDTypography>
            <Grid container spacing={2} ml={4} mt={3}>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography>Select Search Criteria :</MDTypography>
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                {/* Radio buttons */}
                {getRadioOptions(selectedRadioId, setSelectedRadioId)}
              </Grid>
            </Grid>
            <Grid container spacing={2} ml={4} mt={3}>
              {datefalg ? (
                <>
                  <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                    <MDDatePicker
                      onChange={(e, date) => {
                        setFromDate(date);
                        let paramName = "";
                        let name;
                        switch (selectedRadioId) {
                          case "mpStartDate":
                            paramName = "MPFromDate";
                            name = "fromDate";
                            break;
                          case "mpSetupDate":
                            paramName = "MPSetupFromDate";
                            name = "fromDate";
                            break;
                          case "transactionDate":
                            paramName = "TransactionFromDate";
                            name = "fromDate";
                            break;
                          case "coiStartDate":
                            paramName = "PolicyFromDate";
                            name = "fromDate";
                            break;
                          case "endorsementEffectiveDate":
                            paramName = "EndorsementFromDate";
                            name = "fromDate";
                            break;
                          default:
                            // Handle default case if necessary
                            break;
                        }

                        handleChangeDate(e, name, date, paramName);
                      }}
                      name="fromDate"
                      value={fromDate}
                      input={{
                        label: "Date From",
                        placeholder: "SELECT",
                        value: fromDate,
                      }}
                      options={{
                        dateFormat: "d-m-Y",
                        altFormat: "d-m-Y",
                        altInput: true,
                        maxDate: new Date(),
                      }}
                    />
                    {/* <MDTypography fontSize={12} ml={2} mt={1} style={{ color: "#00000099" }}>
                  *Date of Claim ReOpen
                </MDTypography> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                    <MDDatePicker
                      onChange={(e, date) => {
                        setToDate(date);
                        let paramName = "";
                        let name;
                        switch (selectedRadioId) {
                          case "mpStartDate":
                            paramName = "MPToDate";
                            name = "DateTo";
                            break;
                          case "mpSetupDate":
                            paramName = "MPSetupToDate";
                            name = "DateTo";
                            break;
                          case "transactionDate":
                            paramName = "TransactionToDate";
                            name = "DateTo";
                            break;
                          case "coiStartDate":
                            paramName = "PolicyToDate";
                            name = "DateTo";
                            break;
                          case "endorsementEffectiveDate":
                            paramName = "EndorsementToDate";
                            name = "DateTo";
                            break;
                          default:
                            // Handle default case if necessary
                            break;
                        }

                        handleChangeDate(e, name, date, paramName);
                      }}
                      name="DateTo"
                      value={toDate}
                      input={{
                        label: "Date To",
                        placeholder: "SELECT",
                        value: toDate,
                      }}
                      options={{
                        dateFormat: "d-m-Y",
                        altFormat: "d-m-Y",
                        altInput: true,
                        minDate: fromDate,
                        maxDate: new Date(),
                      }}
                    />
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Grid container mt={4}>
              <Grid item xs={12} sm={6} md={9} lg={9} xl={9} xxl={9} />
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
                <MDButton
                  onClick={handleDownload}
                  variant="contained"
                  color="error"
                  sx={{
                    ":hover": {
                      bgcolor: "#24a0ed",
                    },
                  }}
                  disabled={!fromDate || !toDate}
                >
                  <DownloadIcon sx={{ spacing: "5px" }} />
                  Download
                </MDButton>
                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={loading}
                >
                  <CircularProgress />
                </Backdrop>
              </Grid>
            </Grid>
          </MDBox>
        </Modal>
      </Grid>
    </Card>
  );
}

export default IssuanceReports;
