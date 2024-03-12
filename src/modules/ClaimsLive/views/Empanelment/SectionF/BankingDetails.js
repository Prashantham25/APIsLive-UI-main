import React from "react";
import { Grid, Autocomplete, Stack, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import Tdsmodal from "./Tdsmodal";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDButton from "../../../../../components/MDButton";

function versioninput() {
  return <MDInput />;
}
function dateinput() {
  return <MDDatePicker />;
}

function actiontask() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleview = () => setOpen(true);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <EditIcon color="primary" onClick={handleOpen} />
        <VisibilityIcon color="primary" onClick={handleview} />
      </Stack>

      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
        {/* <MDBox pt={10} pl={10}> */}
        <MDBox
          // p={6}
          sx={{
            position: "absolute",
            top: "40%",
            left: "40%",
            width: "70%",
            transform: "translate(-30%, -30%)",
            overflow: "scroll",
            bgcolor: "background.paper",

            height: "100%",

            display: "block",
          }}
        >
          <Grid ml={2} mr={2}>
            {/* <Grid mr={5}> */}
            <Stack justifyContent="right" direction="row" spacing={2}>
              <MDButton
                variant="contained"
                startIcon={<CancelIcon fontSize="large" />}
                onClick={handleClose}
                textAlign="right"
              />
            </Stack>
            <Tdsmodal handleClose={handleClose} />
          </Grid>
        </MDBox>
        {/* </MDBox> */}
      </Modal>
    </>
  );
}

function BankingDetails() {
  const columns = [
    {
      field: "id",
      headerName: "Sr.No.",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 90,
    },
    {
      field: "version",
      headerName: "Version No",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => versioninput(),
    },

    {
      field: "from",
      headerName: "Effective From",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => dateinput(),
    },
    {
      field: "to",
      headerName: "Effective To",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      editable: true,
      renderCell: () => dateinput(),
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 90,
      renderCell: () => actiontask(),
    },
  ];

  const [rows, setrows] = React.useState([{ id: 1 }]);

  const handleAddRow = () => {
    setrows([...rows, { id: rows.length + 1 }]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Servive Tax Reg.no/GST.no" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="PAN Number" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" PAN Card Holder's Name" />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 17, mt: 3 }}>
          Copy of PAN Card : Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 5, ml: 40, mb: 5 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => <MDInput {...params} label="Bank Name" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => <MDInput {...params} label="Branch Name" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" IFSC Code" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" Account Number" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" Payee Name" />
      </Grid>
      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 17, mt: 3 }}>
          TDS
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row">
          <MDButton color="info" sx={{ mr: 2, mt: 2 }} onClick={handleAddRow}>
            ADD
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BankingDetails;
