import React, { useState } from "react";
import { Grid, Card, Backdrop, CircularProgress, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
// import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import MDDatePicker from "components/MDDatePicker";
import MDButton from "components/MDButton";
import {
  getClaimDetails,
  GetPayLoadByQueryDynamic,
  //   SearchClaimDetailsByClaimNo,
} from "../data/index";
import { setGenericInfo, useDataController } from "../../../../BrokerPortal/context";

function ProcessingClaimSearch() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [Search, setSearch] = useState(false);
  const [mrows, setMrows] = useState([]);
  const [msearch, setMsearch] = useState(false);
  const [claimRes, setClaimRes] = useState();
  const [claimData, setClaimData] = useState({
    ChassisNo: "",
    PolicyNo: "",
    ResidentID: "",
    PhoneNo: "",
    // TPMobileNo: "",
    MasterClaimNo: "",
    ClaimNo: "",
    // VehiclePlateCharacter: "",
    VehiclePlateNo: "",
    SummonsNo: "",
    DateofAccident: "",
  });
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  const Navigate = useNavigate();
  const handleProcessing = (param) => {
    setGenericInfo(dispatch, {
      ...genericInfo,
      prod: "Motor_PrivateCar",
      claimNo: param.row.claimnumber,
      tranNo: param.row.transactionnumber,
    });
    Navigate("/ClaimsLive/ClaimProcessingV2");
  };

  const handleDateChange = async (e, a) => {
    Object.keys(claimData).forEach((obj) => {
      if (obj === "DateofAccident") {
        claimData[obj] = a;
      } else {
        claimData[obj] = "";
      }
    });
    setClaimData((prev) => ({ ...prev, ...claimData }));
  };

  const handleChange = async (e) => {
    Object.keys(claimData).forEach((obj) => {
      if (e.target.name === obj) {
        claimData[obj] = e.target.value;
      } else {
        claimData[obj] = "";
      }
    });
    setClaimData((prev) => ({ ...prev, ...claimData }));
  };

  const handlesearch = async () => {
    setLoading(true);
    const payload = {
      reportname: "TakafulClaimProcessingSearch",
      paramList: [
        {
          parameterName: "Mclaimnumber",
          parameterValue: claimData.MasterClaimNo,
        },
        {
          parameterName: "Claimno",
          parameterValue: claimData.ClaimNo,
        },
        {
          parameterName: "policyno",
          parameterValue: claimData.PolicyNo,
        },
        {
          parameterName: "VehicleNo",
          parameterValue: claimData.VehiclePlateNo,
        },
        {
          parameterName: "ChassisNo",
          parameterValue: claimData.ChassisNo,
        },
        {
          parameterName: "PhoneNo",
          parameterValue: claimData.PhoneNo,
        },
        {
          parameterName: "ResidentID",
          parameterValue: claimData.ResidentID,
        },
        {
          parameterName: "DateofAccident",
          parameterValue: claimData.DateofAccident,
        },
        {
          parameterName: "SummonsNo",
          parameterValue: claimData.SummonsNo,
        },
      ],
    };
    await GetPayLoadByQueryDynamic(payload)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setSearch(true);
          setRows([...response.data.finalResult]);
        }
      })
      .catch((err) => {
        setLoading(false);
        setSearch(false);
        setRows([]);
        console.log("error while executing te query", err);
        Swal.fire({
          icon: "error",
          title: "No Records Found !",
        });
      });
  };

  // const formatDate = (date) => {
  //   const formattedDate = date.toLocaleDateString("en-GB", {
  //     day: "numeric",
  //     month: "numeric",
  //     year: "numeric",
  //   });
  //   const formattedTime = date.toLocaleTimeString("en-GB", {
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //   });
  //   return `${formattedDate} ${formattedTime}`;
  // };
  //   const Navigate = useNavigate();

  const handleShowMasterClaimDatagrid = async (Mclaimnumber) => {
    setLoading(true);
    const payload = {
      reportname: "TakafulClaimDetailsByMclaimnumber",
      paramList: [
        {
          parameterName: "Mclaimnumber",
          parameterValue: Mclaimnumber,
        },
      ],
    };
    await GetPayLoadByQueryDynamic(payload)
      .then(async (response) => {
        if (response.status === 200) {
          const res = await getClaimDetails(Mclaimnumber, true);
          if (res.status === 200) {
            setLoading(false);
            // debugger;
            setGenericInfo(dispatch, {
              ...genericInfo,
              claimNo: Mclaimnumber,
            });
            setMrows([...response.data.finalResult]);
            setClaimRes(res.data.finalResult);
            setMsearch(true);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        setMsearch(false);
        setMrows([]);
        console.log("error while executing te query", err);
        Swal.fire({
          // html: true,
          icon: "error",
          title: "No Records Found !",
          // title: "Please enter a valid input.",
          // text: `Please enter a valid input.`,
        });
      });
  };
  const mcolumns = [
    {
      field: "transactionnumber",
      headerName: "Claim No.",
      headerAlign: "center",
      align: "center",
      width: 190,
      renderCell: (params) => {
        const rowId = params.value;
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
              onClick={() => {
                setGenericInfo(dispatch, {
                  ...genericInfo,
                  prod: "Motor_PrivateCar",
                  tranNo: rowId,
                });
                Navigate("/ClaimsLive/ClaimProcessingV2");
              }}
            >
              {rowId}
            </button>
          );
        }
        return "";
      },
    },
    {
      field: "claimtype",
      headerName: "Claim Type",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "TypeofLoss",
      headerName: "Type of Loss",
      headerAlign: "center",
      align: "center",
      width: 220,
    },
    {
      field: "ClaimMainStatus",
      headerName: "Claim Status",
      headerAlign: "center",
      align: "center",
      width: 190,
      renderCell: (params) => <Chip label={params.value} color="secondary" />,
      // renderCell: () => <Chip label="Registered" color="secondary" />,
    },
    {
      field: "SubStatus",
      headerName: "Sub Status",
      headerAlign: "center",
      align: "center",
      width: 190,
      renderCell: (params) => <Chip label={params.value} color="secondary" />,
      // renderCell: () => <Chip label="Inspected" color="secondary" />,
    },
    {
      field: "PaidAmount",
      headerName: "Paid Amount",
      headerAlign: "center",
      align: "center",
      width: 220,
    },
    {
      field: "OSLR",
      headerName: "OSLR",
      headerAlign: "center",
      align: "center",
      width: 220,
    },
  ];
  const columns = [
    {
      field: "claimnumber",
      headerName: "Master Claim Number",
      headerAlign: "center",
      align: "center",
      width: 190,
      renderCell: (params) => {
        const Mclaimnumber = params.value;
        return (
          <MDTypography
            style={{
              // color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => handleShowMasterClaimDatagrid(Mclaimnumber)}
          >
            {Mclaimnumber}
          </MDTypography>
        );
      },
    },
    {
      field: "transactionnumber",
      headerName: "Claim Number",
      headerAlign: "center",
      align: "center",
      width: 190,
      renderCell: (params) => {
        const rowId = params.value;
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
              onClick={() => handleProcessing(params)}
            >
              {rowId}
            </button>
          );
        }
        return "";
      },
    },
    {
      field: "policyno",
      headerName: "Policy Number",
      headerAlign: "center",
      align: "center",
      width: 220,
    },
    {
      field: "claimtype",
      headerName: "Claim Type",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    // {
    //   field: "ReferenceNo",
    //   headerName: "Reference Number",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 190,
    //   renderCell: (params) => {
    //     const rowId = params.value;
    //     if (rowId) {
    //       return (
    //         <button
    //           type="button"
    //           style={{
    //             textDecoration: "underline",
    //             border: "none",
    //             background: "none",
    //             cursor: "pointer",
    //           }}
    //           // onClick={() => handleRequest(rowId, "EndorsementNo")}
    //         >
    //           {rowId}
    //         </button>
    //       );
    //     }
    //     return "";
    //   },
    // },
    {
      field: "Participant Name",
      headerName: "Participant Name",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "LossDateandTime",
      headerName: "Accident Date and Time",
      headerAlign: "center",
      align: "center",
      width: 190,
      // renderCell: (params) => formatDate(new Date(params.value)),
    },
    {
      field: "IntimatedDateandTime",
      headerName: "Claim Intimation Date and Time",
      headerAlign: "center",
      align: "center",
      width: 300,
      // renderCell: (params) => formatDate(new Date(params.value)),
    },
    {
      field: "ProximityDays",
      headerName: "Proximity Days",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    // {
    //   field: "Accident Location",
    //   headerName: "Accident Location",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 190,
    // },
    {
      field: "ClaimMainStatus",
      headerName: "Claim Main Status",
      headerAlign: "center",
      align: "center",
      width: 190,
      renderCell: (params) => <Chip label={params.value} color="secondary" />,
      // renderCell: () => <Chip label="Registered" color="secondary" />,
    },
    {
      field: "SubStatus",
      headerName: "Claim Sub Status",
      headerAlign: "center",
      align: "center",
      width: 190,
      renderCell: (params) => <Chip label={params.value} color="secondary" />,
      // renderCell: () => <Chip label="Inspected" color="secondary" />,
    },
    {
      field: "VehicleNo",
      headerName: "Vehicle Plate Number",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "WorkshopName",
      headerName: "Workshop Name",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "VehiclefirstpresentedDateandTime",
      headerName: "vehicle first presented Date",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "VehiclereceivedDateandTime",
      headerName: "vehicle recieved for repairs date and time",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "SurveyType",
      headerName: "Survey Type",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "Claimhandlername",
      headerName: "Claims Handler Name",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
  ];
  return (
    <Card>
      {!msearch ? (
        <>
          <MDTypography variant="h4" m={2} mb={4}>
            Global Claim Search
          </MDTypography>
          <Grid container spacing={2} ml={0.5}>
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDInput
                label="Master Claim No."
                name="MasterClaimNo"
                value={claimData.MasterClaimNo}
                onChange={handleChange}
                placeholder="Enter"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDInput
                label="Claim No."
                name="ClaimNo"
                value={claimData.ClaimNo}
                onChange={handleChange}
                placeholder="Enter"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDInput
                label="Policy No."
                name="PolicyNo"
                value={claimData.PolicyNo}
                onChange={handleChange}
                placeholder="Enter"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDInput
                label="Vehicle Plate No."
                name="VehiclePlateNo"
                value={claimData.VehiclePlateNo}
                onChange={handleChange}
                placeholder="Enter"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDInput
                label="Chassis No."
                name="ChassisNo"
                value={claimData.ChassisNo}
                onChange={handleChange}
                placeholder="Enter"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDInput
                label="Phone Number"
                name="PhoneNo"
                value={claimData.PhoneNo}
                onChange={handleChange}
                placeholder="Enter"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDInput
                label="Resident ID"
                name="ResidentID"
                value={claimData.ResidentID}
                onChange={handleChange}
                placeholder="Enter"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDDatePicker
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                fullWidth
                input={{
                  label: "Date of Accident",
                  name: "DateofAccident",
                  // value: claimData.DateofAccident,
                  value: claimData.DateofAccident === null ? "" : claimData.DateofAccident,
                }}
                options={{ altFormat: "d/m/Y", dateFormat: "Y-m-d", altInput: true }}
                onChange={(e, a) => handleDateChange(e, a)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDInput
                label="Summons No."
                name="SummonsNo"
                value={claimData.SummonsNo}
                onChange={handleChange}
                placeholder="Enter"
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="TP Mobile No."
            name="TPMobileNo"
            value={claimData.TPMobileNo}
            onChange={handleChange}
            placeholder="Enter"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Vehicle Plate Character"
            name="VehiclePlateCharacter"
            value={claimData.VehiclePlateCharacter}
            onChange={handleChange}
            placeholder="Enter"
          />
        </Grid> */}
            <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
              <MDTypography variant="h4" />
            </Grid>
            <Grid item align="right" xs={12} sm={12} md={10} lg={10} xl={10} xxl={10} mb={2}>
              <MDButton
                // startIcon={<SearchIcon />}
                variant="outlined"
                color="secondary"
                // onClick={handlesearch}
              >
                Reset
              </MDButton>
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress />
              </Backdrop>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} mb={2}>
              <MDButton
                disabled={Object.keys(claimData).every((obj) => claimData[obj] === "")}
                variant="contained"
                color="secondary"
                onClick={handlesearch}
              >
                Search Claims
              </MDButton>
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress />
              </Backdrop>
            </Grid>
          </Grid>
          {Search && (
            <MDBox sx={{ height: 600, width: "100%", mt: 5 }}>
              <DataGrid
                autoHeightpageSize={10}
                rowsPerPageOptions={[10]}
                rows={rows}
                columns={columns}
                getRowId={(row) => row.transactionnumber}
              />
            </MDBox>
          )}
        </>
      ) : (
        <>
          <MDTypography variant="h4" m={2} mb={4}>
            Search Result
          </MDTypography>
          <MDBox>
            <Card
              sx={{
                background: "#f0f2f5",
                borderRadius: "0.25rem",
                margin: 2,
              }}
            >
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="subtitle2">
                    Master Claim No. : <b>{claimRes[0].claimNumber}</b>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="subtitle2">
                    {/* Master Policy Start Date : <b>{masters.MPStartDate}</b> */}
                    Policy No. : <b>{claimRes[0].claimBasicDetails.PolicyDetails.PolicyNo}</b>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="subtitle2">
                    {/* Master Policy Start Time : <b>{masters.MPStartTime}</b> */}
                    Insured Name :{" "}
                    <b>{claimRes[0].claimBasicDetails.PolicyDetails.ParticipantName}</b>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="subtitle2">
                    {/* Master Policy End Date : <b>{masters.MPEndDate}</b> */}
                    Master Claim Status : <b>Open</b>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="subtitle2">
                    {/* Master Policy End Time : <b>{masters.MPEndTime}</b> */}
                    Total Claim Amount : <b>5634</b>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="subtitle2">
                    {/* MPH Name : <b>{objectPath.get(dto, "PartnerDetails.partnerName")}</b> */}
                    Total Paid : <b>54445</b>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="subtitle2">
                    {/* MPH Name : <b>{objectPath.get(dto, "PartnerDetails.partnerName")}</b> */}
                    OLSR : <b>5445</b>
                  </MDTypography>
                </Grid>
              </Grid>
            </Card>
          </MDBox>
          <MDBox sx={{ height: 600, width: "100%", mt: 5 }}>
            <DataGrid
              autoHeightpageSize={10}
              rowsPerPageOptions={[10]}
              rows={mrows}
              columns={mcolumns}
              getRowId={(row) => row.transactionnumber}
            />
          </MDBox>
        </>
      )}
    </Card>
  );
}
export default ProcessingClaimSearch;
