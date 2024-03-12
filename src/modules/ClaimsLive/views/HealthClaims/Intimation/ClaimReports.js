import React, { useState } from "react";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { Grid, Card, Modal, IconButton, Autocomplete, Checkbox } from "@mui/material";
import success from "assets/images/Magma/success.jpg";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import { QueryExecution, GetDynamicPermissions } from "../data/index";

function ClaimReports() {
  const [openModal, setOpenModal] = useState(false);
  const [fromtodate, setFromtodate] = useState(true);
  const [selectdate, setSelectdate] = useState(false);
  const [Label, setLabel] = useState(null);
  const [role, setRole] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const [selectedRole, setSelectedRole] = useState(null);

  const [multiselectedRole, setMultiSelectedRole] = useState(null);
  const [multiselectRole, setMultiselectRole] = useState(false);
  const [claimportfolio, setClaimportfolio] = useState(false);
  const [filterResponse, setFilterResponse] = useState(null);
  // const [success, setsuccess] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [asondate, setAsondate] = useState("");
  const [subInfo, setSubInfo] = useState("");
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const dataToExcel = (arr, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
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
  const [userList, setUserList] = useState([]);
  const [queryExecutionRequest, setQueryExecutionRequest] = useState({
    ReportConfigId: "",
    paramList: [],
  });
  const [queryInput, setQuerInput] = useState({
    ReportConfigId: 468,
    paramList: [
      {
        parameterName: "roleID",
        parameterValue: "",
      },
    ],
  });

  const reports = [
    {
      id: 1,
      label: "Claim Generation Report",
      report: "MagmaClaimGenerationReport",
      info: "*Date of Claim Generation",
    },
    {
      id: 2,
      label: "Reopen Report",
      report: "MagmaClaimReopenReport",
      info: "*Date of Claim Reopen",
    },
    {
      id: 3,
      label: "Paid Report",
      report: "MagmaClaimPaidReport",
      info: "*Date of Claim Payment",
    },
    {
      id: 4,
      label: "No Claim Report",
      report: "MagmaClaimNoClaimReport",
      info: "*Date of Claim Denial/Closure",
    },
    {
      id: 5,
      label: "Outstanding Report",
      report: "MagmaClaimOutstandingReport",
      info: "*Select as on date",
    },
    {
      id: 6,
      label: "Settled Claim TAT Report",
      report: "MagmaClaimTATReport",
      info: "*Date of Claim Settlement",
    },
    {
      id: 7,
      label: "User wise Report",
      report: "Magma_UserWiseReport",
      info: "",
    },
    {
      id: 8,
      label: "Bucket wise Report",
      report: "MagmaBucketWiseReport",
      info: "*Select as on date",
    },
    {
      id: 9,
      label: "Claim Dump Report",
      report: "Magma_ClaimDumpReport",
      info: "",
    },
    {
      id: 10,
      label: "Claim Portfolio Report",
      report: "",
      info: "",
    },
    {
      id: 11,
      label: "Penny Drop Report",
      report: "",
      info: "",
    },
  ];

  const handleCloseModal = () => {
    setOpenModal(false);
    setFromtodate(true);
    setSelectdate(false);
    setLabel(null);
    setRole(false);
    setSelectedRole(null);
    setMultiSelectedRole(null);
    setMultiselectRole(null);
    setClaimportfolio(false);
    setFromDate("");
    setToDate("");
    setAsondate("");
    setQueryExecutionRequest({
      ReportConfigId: "",
      paramList: [],
    });
  };

  const handleRole = async (event, value) => {
    setSelectedRole(value);
    setMultiselectRole(value !== null);

    if (value === "DEO") {
      queryInput.paramList[0].parameterValue = "e41cf7e7-341c-4ced-b03c-51f201fe37f1";
    }
    if (value === "Medical Adjudicator") {
      queryInput.paramList[0].parameterValue = "b7248406-9f6d-474b-8bb1-f94ad62e9e9c";
    }
    if (value === "IFCU") {
      queryInput.paramList[0].parameterValue = "e78d443a-1784-4be0-a8a9-0c17654e9f15";
    }
    setQuerInput(queryInput);
    const userListresult = await QueryExecution(queryInput);
    console.log("USer List", userListresult.data);
    setUserList([...userListresult.data]);
  };
  console.log("jdgf", userList);

  const handelModel = async (label, id, report, info) => {
    const userid = localStorage.getItem("userId");
    const roleid = localStorage.getItem("roleId");
    await GetDynamicPermissions(userid, roleid).then((response) => {
      const ReportFilter = response.filter((row) => row.dynamicName === report);

      console.log("print", response);
      setFilterResponse(ReportFilter[0].dynamicId);
    });
    setSubInfo(info);
    setOpenModal(true);
    setLabel(label);
    if (id === 5 || id === 8) {
      setFromtodate(false);
      setSelectdate(true);
    }
    if (id === 7) {
      setRole(true);
    }
    if (id === 10) {
      setFromtodate(false);
      setSelectdate(false);
      setClaimportfolio(true);
    }
  };

  const handleChangeDate = (e, dates, name) => {
    // debugger;
    const parts = dates.split("-");

    const date = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const index = queryExecutionRequest.paramList.findIndex(
      (param) => param.parameterName === name
    );
    queryExecutionRequest.ReportConfigId = filterResponse;
    if (index !== -1) {
      queryExecutionRequest.paramList[index].parameterValue = date;
    } else {
      const newParam = {
        parameterName: name,
        parameterValue: date,
      };
      queryExecutionRequest.paramList.push(newParam);
      setQueryExecutionRequest(queryExecutionRequest);
    }

    console.log("queryExecutionRequest", queryExecutionRequest);
  };
  const handleAutocompleteChange = (event, newValue) => {
    const selectedUsernames = newValue.map((option) => option.username).join(",");
    setMultiSelectedRole(selectedUsernames);
    const index = queryExecutionRequest.paramList.findIndex((x) => x.parameterName === "Users");

    if (index !== -1) {
      queryExecutionRequest.paramList[index].parameterValue = selectedUsernames;
    } else {
      queryExecutionRequest.paramList.push({
        parameterValue: selectedUsernames,
        parameterName: "Users",
      });
      queryExecutionRequest.paramList.push({
        parameterValue: "",
        parameterName: "role",
      });
    }
  };

  const handelDownload = async () => {
    console.log("downloadrequest", queryExecutionRequest);
    const callGenerate = await QueryExecution(queryExecutionRequest);
    console.log("callGenerate", callGenerate);
    dataToExcel(callGenerate.data, Label);
    setOpenModal(false);
    await Swal.fire({
      html: ` <img src="${success}" alt="success image" style="width: 63px; height: 63px;">
      <p style="font-weight: bold; margin-top: 26px;">${Label} downloaded successfully</p>`,
      showConfirmButton: true,
      showCloseButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Close",
      width: "700px",
      heightAuto: "320px",
    });
    handleCloseModal();
  };

  return (
    <Card>
      <Grid container p={2}>
        <MDTypography variant="body1">Claim Reports</MDTypography>
      </Grid>
      <Grid container spacing={1} p={2}>
        {reports.map((x) => (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3} key={x.id}>
            <Card
              sx={{
                background: "#F3F3F3",
                maxWidth: "245px",
                maxHeight: "135px",
                margin: "5px",
                padding: "30px 17px 30px 17px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              // sx={{
              //   borderRadius: "8px",
              //   background: "#F3F3F3",
              //   maxWidth: "245px",
              //   maxHeight: "135px",
              //   display: "flex",
              //   width: "245px",
              //   margin: "5px",
              //   padding: "30px 17px",
              //   alignItems: "center",
              //   flexDirection: "column",
              //   gap: "17px",
              // }}
              component="label"
            >
              <MDTypography align="center" variant="body2">
                {x.label}
              </MDTypography>
              <MDButton
                onClick={() => handelModel(x.label, x.id, x.report, x.info)}
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
      </Grid>

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
          <MDTypography align="left" ml={6}>
            {Label}
          </MDTypography>
          {fromtodate && (
            <Grid container spacing={2} ml={4} mt={3}>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <MDDatePicker
                  onChange={(e, date) => {
                    setFromDate(date);
                    handleChangeDate(e, date, "FromDate");
                  }}
                  name="DateFrom"
                  input={{
                    label: "Date From",
                    placeholder: "SELECT",
                    value: { queryExecutionRequest },
                  }}
                  options={{
                    dateFormat: "d-m-Y",
                    altFormat: "d-m-Y",
                    altInput: true,
                    maxDate: new Date(),
                  }}
                />
                <MDTypography fontSize={12} ml={2} mt={1} style={{ color: "#00000099" }}>
                  {subInfo}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <MDDatePicker
                  onChange={(e, date) => {
                    setToDate(date);
                    handleChangeDate(e, date, "ToDate");
                  }}
                  name="DateTo"
                  input={{
                    label: "Date To",
                    placeholder: "SELECT",
                    value: { queryExecutionRequest },
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
            </Grid>
          )}
          {selectdate && (
            <Grid container spacing={2} ml={4} mt={2}>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <MDDatePicker
                  fullwidth
                  onChange={(e, date) => {
                    setAsondate(date);
                    handleChangeDate(e, date, "AsOnDate");
                  }}
                  input={{
                    label: "Select Date",
                    placeholder: "SELECT",
                    value: { queryExecutionRequest },
                  }}
                  options={{
                    dateFormat: "d-m-Y",
                    altFormat: "d-m-Y",
                    altInput: true,
                    maxDate: new Date(),
                  }}
                />
                <MDTypography fontSize={12} ml={2} mt={1} style={{ color: "#00000099" }}>
                  {subInfo}
                </MDTypography>
                <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5} />
              </Grid>
            </Grid>
          )}
          {role && (
            <Grid container spacing={2} ml={4} mt={2}>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <Autocomplete
                  sx={{ "& .MuiOutlinedInput-root": { padding: "4px!important" } }}
                  name="Select Role"
                  variant="outlined"
                  options={["DEO", "Medical Adjudicator", "IFCU"]}
                  onChange={handleRole}
                  renderInput={(op) => <MDInput {...op} label="Select Role" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                {multiselectRole && (
                  <Autocomplete
                    multiple
                    sx={{ "& .MuiOutlinedInput-root": { padding: "4px!important" } }}
                    options={userList}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.username}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.username} {/* Render the username property */}
                      </li>
                    )}
                    onChange={handleAutocompleteChange}
                    renderInput={(params) => (
                      <MDInput {...params} label={`Select ${selectedRole}`} />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          )}
          {claimportfolio && (
            <Grid container spacing={2} ml={4} mt={2}>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <MDInput
                  label="Corporate Name"
                  InputProps={{
                    endAdornment: (
                      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <MDInput label="Policy Number" />
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <MDInput label="Policy Plan period from" disabled="true" />
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <MDInput label="Policy Plan period to" disabled="true" />
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={5} xl={5} xxl={5}>
                <MDDatePicker
                  fullwidth
                  // onChange={(e, date) => handleChangeDateCrm(e, date)}
                  input={{
                    label: "Select Date",
                    value: new Date(),
                  }}
                  options={{
                    dateFormat: "d-m-Y",

                    altFormat: "d-m-Y",

                    altInput: true,
                  }}
                />
              </Grid>
            </Grid>
          )}
          <Grid container mt={4}>
            <Grid item xs={12} sm={6} md={9} lg={9} xl={9} xxl={9} />
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MDButton
                onClick={handelDownload}
                variant="contained"
                color="error"
                sx={{
                  ":hover": {
                    bgcolor: "#24a0ed",
                  },
                }}
                disabled={
                  (role && (!fromDate || !toDate || !selectedRole || !multiselectedRole)) ||
                  (fromtodate && (!fromDate || !toDate)) ||
                  (selectdate && !asondate)
                }
              >
                <DownloadIcon sx={{ spacing: "5px" }} />
                Download
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </Card>
  );
}
export default ClaimReports;
