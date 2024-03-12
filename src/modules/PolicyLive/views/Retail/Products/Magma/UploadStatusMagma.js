import { useState, useEffect } from "react";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useDataController, setGenericInfo } from "../../../../../BrokerPortal/context";
import { GetPayLoadByQueryDynamic } from "./data/index";

function UploadStatusMagma() {
  const [id, setId] = useState("");
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const [onblurvalidation, setonblurvalidation] = useState({
    ErrorFlag: false,
    IdError: false,
  });
  const mes = "Please fill the required field";
  const ErrorStyle = {
    color: "red",
    fontSize: "0.8rem",
    textAlign: "left",
  };

  // const [COIDetails, setCOIDetails] = useState(0);
  const rowdata = rows.map((x) => ({
    id: x["Document Id"], // Assuming x has a property uniqueId
    documentUploadId: x["Document Id"],
    DocType: x.DocType,
    status: x.Status,
    MasterPolicyNo: x["MP No."],
    MPHName: x["MPH Name"],
    uploadedBy: x["Uploaded by"],
    uploadedDate: new Date(x["Uploaded Date"]).toLocaleDateString("en-GB").split("/").join("/"),
    totalmemberCount: x["Total Member count"],
    totalCount: x["Total Records"],
    failCount: x["Error Records"],
    ReferToUW: x["Refer To UW"],
    successCount: x["Success Records"],
    PendingCoi: x["Pending for COI"],
    totalPremium: x["Total Premium"],
  }));
  // console.log("COIDetails", COIDetails);
  const columns = [
    {
      field: "documentUploadId",
      headerName: "Document Id",
      width: 110,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "DocType",
      headerName: "Document Type",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "MasterPolicyNo",
      headerName: "MP No.",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "MPHName",
      headerName: "MPH Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "uploadedBy",
      headerName: "Uploaded by",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "uploadedDate",
      headerName: "Upload Date",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalmemberCount",
      headerName: "Total Member count",
      width: 170,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalCount",
      headerName: "Total Records",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "failCount",
      headerName: "Error Records",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ReferToUW",
      headerName: "Refer To UW Records",
      width: 170,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "successCount",
      headerName: "Success Records",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "PendingCoi",
      headerName: "Pending for COI",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalPremium",
      headerName: "Total Premium",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Action",
      headerName: "Action",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (param) => {
        console.log(param);

        const handleMenuClose = () => {
          setAnchorEl(null);
        };
        const UploadStatusActions = (action) => {
          console.log("row111", rows);
          console.log("action", action);
          setGenericInfo(dispatch, { ...genericInfo, FinalResult: rows });
          Navigate("/UploadStatusActions", { state: { action, rows } });
        };
        const handleView = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <div>
            <IconButton onClick={handleView}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => UploadStatusActions("viewsuccessrecords")}>
                <RemoveRedEyeIcon /> &nbsp; View Success Records
              </MenuItem>
              <MenuItem onClick={() => UploadStatusActions("viewreferredtouwrecords")}>
                <RemoveRedEyeIcon /> &nbsp; View Referred To UW Records
              </MenuItem>
              <MenuItem onClick={() => UploadStatusActions("viewerrorrecords")}>
                <RemoveRedEyeIcon /> &nbsp; View Error Records
              </MenuItem>
              <MenuItem onClick={() => UploadStatusActions("viewpendingforcois")}>
                <RemoveRedEyeIcon /> &nbsp; View Pending For COIs
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  const onDocId = (e) => {
    const Regex = /^[0-9]*$/;
    if (!Regex.test(e.target.value)) {
      setonblurvalidation((prevState) => ({
        ...prevState,
        IdError: true,
      }));
    } else {
      setonblurvalidation((prevState) => ({
        ...prevState,
        IdError: false,
      }));
    }
    setId(e.target.value);
  };
  console.log("PassedValue", genericInfo && genericInfo.getuploadDetails);
  useEffect(async () => {
    if (genericInfo && genericInfo.getuploadDetails) {
      console.log("Abcccc", genericInfo.getuploadDetails);
      const abc = genericInfo.getuploadDetails;
      setId(abc);
      setLoading(true);
      const obj = {
        reportname: "MgamaUWCount",
        paramList: [
          {
            ParameterName: "DocumentID",
            ParameterValue: genericInfo.getuploadDetails,
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
    }
  }, [genericInfo]);
  useEffect(async () => {
    if (location.state && location.state.getuploadDetails) {
      console.log("Abcccc", location.state.getuploadDetails);
      const abc = location?.state?.getuploadDetails[0]["Document Id"];
      setId(abc);
      setLoading(true);
      const obj = {
        reportname: "MgamaUWCount",
        paramList: [
          {
            ParameterName: "DocumentID",
            ParameterValue: location?.state?.getuploadDetails[0]["Document Id"],
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
    }
  }, [location.state]);
  const onSearch = async () => {
    if (id === "" || onblurvalidation.IdError === true) {
      setonblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
    } else {
      setLoading(true);
      const obj = {
        reportname: "MgamaUWCount",
        paramList: [
          {
            ParameterName: "DocumentID",
            ParameterValue: id,
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
    }
  };

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF" }} p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>Upload Status</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Document Id"
            onChange={onDocId}
            value={id}
            required
            error={onblurvalidation.ErrorFlag && id === ""}
            helperText={onblurvalidation.ErrorFlag && id === "" && mes}
          />
          {onblurvalidation.IdError === true && id !== "" ? (
            <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton onClick={onSearch}>Search</MDButton>
        </Grid>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress />
        </Backdrop>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <DataGrid
            autoHeight
            rows={rowdata}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
            editField="inEdit"
            getRowId={(r) => r.documentUploadId}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default UploadStatusMagma;
