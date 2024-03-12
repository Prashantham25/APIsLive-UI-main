import React, { useState } from "react";
import { Grid, Card, Backdrop, CircularProgress } from "@mui/material";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
// import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import MDDatePicker from "components/MDDatePicker";
import MDButton from "components/MDButton";
import {
  // GetClaimDetails,
  GetPayLoadByQueryDynamic,
  // SearchClaimDetailsByClaimNo,
} from "../data/index";

function SearchClaims() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [Search, setSearch] = useState(false);
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
      reportname: "TakafulClaimIntimationSearch",
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
          // html: true,
          icon: "error",
          title: "No Records Found !",
          // title: "Please enter a valid input.",
          // text: `Please enter a valid input.`,
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
  const Navigate = useNavigate();

  const handleNavigate = (rowid) => {
    Navigate(`/Claims/MotorIntimation?ClaimNumber=${rowid}`);
  };
  const columns = [
    {
      field: "claimnumber",
      headerName: "Master Claim Number",
      headerAlign: "center",
      align: "center",
      width: 190,
      renderCell: (params) => {
        const rowid = params.value;
        return (
          <MDTypography
            style={{
              // color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate(rowid)}
          >
            {rowid}
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
              // onClick={() => handleRequest(rowId, "EndorsementNo")}
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
      field: "policyno",
      headerName: "Policy Number",
      headerAlign: "center",
      align: "center",
      width: 220,
    },
    {
      field: "Participant Name",
      headerName: "Participant Name",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "Vehicle No",
      headerName: "Vehicle Plate Number",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "Claim Intimation Date and Time",
      headerName: "Claim Intimation Date and Time",
      headerAlign: "center",
      align: "center",
      width: 300,
      // renderCell: (params) => formatDate(new Date(params.value)),
    },
    {
      field: "Accident Date and Time",
      headerName: "Accident Date and Time",
      headerAlign: "center",
      align: "center",
      width: 190,
      // renderCell: (params) => formatDate(new Date(params.value)),
    },
    {
      field: "Accident Location",
      headerName: "Accident Location",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "Claim Main Status",
      headerName: "Claim Main Status",
      headerAlign: "center",
      align: "center",
      width: 190,
      // renderCell: (params) => <Chip label={params.value} color="secondary" />,
    },
    {
      field: "Claim Sub Status",
      headerName: "Claim Sub Status",
      headerAlign: "center",
      align: "center",
      width: 190,
      // renderCell: (params) => <Chip label={params.value} color="secondary" />,
    },
    {
      field: "Surveyor Name",
      headerName: "Claims Handler Name",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "Workshop Name",
      headerName: "Workshop Name",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
  ];
  // const rows = [
  //   {
  //     MasterClaimNo: "ABC1234",
  //     ClaimNo: "123456",
  //     ReferenceNo: "987",
  //     ClaimStatus: "Active",
  //   },
  // ];
  return (
    <Card>
      <MDTypography variant="h4" m={2} mb={4}>
        Search Claims
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

        <Grid item align="right" xs={12} sm={12} md={11.2} lg={11.2} xl={11.2} xxl={11.2} mb={2}>
          <MDButton
            // startIcon={<SearchIcon />}
            variant="contained"
            color="secondary"
            onClick={handlesearch}
            disabled={Object.keys(claimData).every((obj) => claimData[obj] === "")}
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
    </Card>
  );
}
export default SearchClaims;
