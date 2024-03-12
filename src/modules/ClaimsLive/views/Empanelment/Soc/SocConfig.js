import React from "react";
import { Grid, Stack, Modal, Autocomplete } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDButton from "../../../../../components/MDButton";
import SocModal from "./SocModal";

function actiontask() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleview = () => setOpen(true);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <EditIcon color="primary" onClick={handleOpen} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <VisibilityIcon color="primary" onClick={handleview} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDButton color="info" size="small">
            UPDATE
          </MDButton>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{ overflow: "scroll" }}
        backdrop="static"
        keyboard={false}
      >
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
            <SocModal handleClose={handleClose} />
          </Grid>
        </MDBox>
        {/* </MDBox> */}
      </Modal>
    </>
  );
}

function versioninput() {
  return (
    <Autocomplete
      options={[]}
      getOptionLabel={(option) => option}
      sx={{
        "& .MuiOutlinedInput-root": {
          padding: "4px",
        },
      }}
      renderInput={(params) => <MDInput {...params} />}
    />
  );
}
function SocConfig() {
  const columns = [
    {
      field: "id",
      headerName: "Sr.No.",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 50,
    },
    {
      field: "version",
      headerName: "Version No",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDInput />,
    },
    {
      field: "L4version",
      headerName: " L4 Version No",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => versioninput(),
    },
    {
      field: "from",
      headerName: "Effective From",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDDatePicker />,
    },
    {
      field: "to",
      headerName: "Effective To",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      renderCell: () => <MDDatePicker />,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 130,
      renderCell: () => actiontask(),
    },
  ];
  const [rows, setrows] = React.useState([{ id: 1 }]);

  const handleAddRow = () => {
    setrows([...rows, { id: rows.length + 1 }]);
  };

  return (
    <Grid container>
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
            rowHeight={80}
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
          <MDButton
            color="info"
            sx={{ justifyContent: "right", mr: 2, mt: 2 }}
            onClick={handleAddRow}
          >
            ADD
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SocConfig;
