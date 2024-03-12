import React from "react";
import { Grid, Stack, Autocomplete } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import MDBox from "components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";

function input() {
  return <MDInput />;
}

function noofroom() {
  return (
    <Autocomplete
      fullWidth
      options={["Wards", "Single Sharing", "Deluxe", "Twin sharing", "Triple sharing"]}
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

function Rooms() {
  const [rows, setrows] = React.useState([]);
  const [rowsid, setrowsid] = React.useState(0);

  const handleAddRow = () => {
    setrows([...rows, { id: rowsid + 1 }]);

    setrowsid(rowsid + 1);
  };
  const columns = [
    {
      field: "rooms",
      headerName: "Rooms",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      renderCell: () => noofroom(),
    },
    {
      field: "nomenclature",
      headerName: "Internal Nomenclature for Similar Room Category",
      width: 380,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => input(),
    },

    {
      field: "beds",
      headerName: " Number of Beds",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => input(),
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 90,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rows.filter((row) => row.id !== param.id);

          setrows([...newArray]);
        };

        return <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];

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
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row">
          <MDButton color="info" sx={{ justifyContent: "right", mr: 2, mt: 2 }}>
            SAVE
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Rooms;
