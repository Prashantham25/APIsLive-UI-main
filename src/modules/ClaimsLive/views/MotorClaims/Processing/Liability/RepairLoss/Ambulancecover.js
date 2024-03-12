import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MDBox from "../../../../../../../components/MDBox";
import MDInput from "../../../../../../../components/MDInput";
import MDButton from "../../../../../../../components/MDButton";

function Ambulancecover() {
  const [rows, setrows] = React.useState([]);
  const [rowsid, setrowsid] = React.useState(0);

  const handleAddRow = () => {
    setrows([...rows, { id: rowsid + 1 }]);

    setrowsid(rowsid + 1);
  };

  const columns = [
    {
      field: "invoicenumber",
      headerName: "Invoice Number",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 180,
      renderCell: () => <MDInput />,
    },
    {
      field: "invoicedate",
      headerName: "Part Invoice date	",
      width: 300,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker inputFormat="dd-MM-yyyy" renderInput={(params) => <MDInput {...params} />} />
        </LocalizationProvider>
      ),
    },
    {
      field: "injuredperson",
      headerName: "Injured Person",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 300,
      editable: true,
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => <MDInput {...params} />}
        />
      ),
    },

    {
      field: "perdayhospitalizationamount",
      headerName: "Ambulance charges- Sum Insured",
      width: 300,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => <MDInput />,
    },

    {
      field: "amountpayable",
      headerName: "Amount Payable ",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
      renderCell: () => <MDInput />,
    },
    {
      field: "add",

      headerName: (
        <MDButton
          size="small"
          variant="contained"
          onClick={handleAddRow}
          startIcon={<AddIcon fontSize="large" />}
          textAlign="right"
        />
      ),
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
      renderCell: () => <DeleteIcon />,
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#e0e0e0",
            },
            mt: 3,
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
    </Grid>
  );
}

export default Ambulancecover;
