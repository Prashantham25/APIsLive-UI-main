import React, { useEffect } from "react";
import { Grid, FormControlLabel, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioGroup from "@mui/material/RadioGroup";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";

function versioninput() {
  return <MDInput />;
}

function Tdsmodal({ handleClose }) {
  const [setamount, setAmountFlag] = React.useState(true);
  const [Amt, setAmt] = React.useState("No");

  const handleChangeamount = (event) => {
    setAmt(event.target.value);
  };

  useEffect(() => {
    if (Amt === "4") setAmountFlag(true);
    else setAmountFlag(false);
  });
  const [rows, setrows] = React.useState([]);
  const [rowsid, setrowsid] = React.useState(0);

  const handleAddRow = () => {
    setrows([...rows, { id: rowsid + 1 }]);

    setrowsid(rowsid + 1);
  };

  const columns = [
    // {
    //   field: "id",
    //   headerName: "",
    //   headerClassName: "super-app-theme--header",
    //   headerAlign: "center",
    //   width: 0,
    //   hidden: true,
    // },
    {
      field: "from",
      headerName: "From Amount",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => versioninput(),
    },

    {
      field: "to",
      headerName: "To Amount",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => versioninput(),
    },
    {
      field: "tax",
      headerName: "Tax %",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 230,
      editable: true,
      renderCell: () => versioninput(),
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 150,

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
        <RadioGroup row onChange={(event) => handleChangeamount(event)} value={Amt}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <FormControlLabel
              value="1"
              control={<Radio sx={{ ml: 2 }} />}
              label="No TDS Applicable"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <FormControlLabel value="2" control={<Radio sx={{ ml: 2 }} />} label="7.5% Flat" />{" "}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <FormControlLabel
              value="3"
              control={<Radio sx={{ ml: 2 }} />}
              label="10% Flat (Info if there is no PAN,then TDS will be 20%)"
            />{" "}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {" "}
            <FormControlLabel
              value="4"
              control={<Radio sx={{ ml: 2 }} />}
              label="Based on AMOUNT"
            />{" "}
          </Grid>
        </RadioGroup>
      </Grid>

      {setamount ? (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox
            sx={{
              mt: 3,
              ml: 10,
              width: "80%",
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
      ) : null}

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#37474f", fontSize: 15, mt: 3, ml: 2 }}>
          Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#37474f", fontSize: 12, mt: 5, ml: 40, mb: 5 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row">
          <MDButton color="info" sx={{ mt: 2 }} onClick={handleClose}>
            CONFIGURE
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Tdsmodal;
