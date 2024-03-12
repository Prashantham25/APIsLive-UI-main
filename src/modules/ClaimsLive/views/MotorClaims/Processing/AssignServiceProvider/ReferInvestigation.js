import React from "react";
import { Grid, FormControlLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import { DataGrid } from "@mui/x-data-grid";
import RadioGroup from "@mui/material/RadioGroup";
import MDTypography from "../../../../../../components/MDTypography";
import MDInput from "../../../../../../components/MDInput";
import MDButton from "../../../../../../components/MDButton";
import MDBox from "../../../../../../components/MDBox";

function ReferInvestigation() {
  const [investigation, setinvestigation] = React.useState("");
  const handleChangeInvestigation = (event) => {
    setinvestigation(event.target.value);
  };

  const columns = [
    {
      field: "status",
      headerName: "   Status",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "investigatorname",
      headerName: " Investigator Name	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "investigatorid",
      headerName: " Investigator ID	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "	reportsection",
      headerName: "  		Report Section	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "investigatorcontact",
      headerName: " Investigator Contact	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "assigneddate",
      headerName: "  Assigned Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "assignedtime",
      headerName: " 	Assigned Time",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "rating",
      headerName: " Performance Rating",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "targetdate",
      headerName: " Target Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "remark",
      headerName: " 	Remark",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];
  const rows = [{ id: 1 }];

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDInput label="Investigation Trigger from System" sx={{ mt: 2 }} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
            Investigation Required?
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <RadioGroup
            row
            onChange={(event) => handleChangeInvestigation(event)}
            value={investigation}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>
        {investigation === "Yes" && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput label="Suspected Category" sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput label="Investigation Remark" sx={{ mt: 2 }} />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid container item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1, ml: 5 }}>
            Investigation Required?
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <RadioGroup row>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <MDInput label="Investigation Remark" sx={{ ml: 5 }} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDButton>Search Investigator</MDButton>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            mt: 3,

            width: "100%",
          }}
        >
          <DataGrid
            autoHeight
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default ReferInvestigation;
