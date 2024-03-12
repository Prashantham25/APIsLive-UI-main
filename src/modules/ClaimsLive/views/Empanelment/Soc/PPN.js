import React from "react";
import { Grid, FormControlLabel, Autocomplete, Stack, Checkbox, FormGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import { DataGrid } from "@mui/x-data-grid";
import RadioGroup from "@mui/material/RadioGroup";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

function PPN() {
  const [ppnvalue, setppnValue] = React.useState("No");

  const handleChange = (event) => {
    setppnValue(event.target.value);
  };

  const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
      fontSize: "0.6 rem",
    },
  };

  const [ppnrows, setppnrows] = React.useState([]);
  const [ppnrowsid, setppnrowsid] = React.useState(0);

  const handleAddPPNRow = () => {
    setppnrows([...ppnrows, { id: ppnrowsid + 1 }]);

    setppnrowsid(ppnrowsid + 1);
  };
  const ppncolumns = [
    {
      field: "ppnroom",
      headerName: "PPN Room ",
      width: 390,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
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
          renderInput={(params) => <MDInput {...params} sx={{ mb: 1 }} label="Select PPN Room" />}
        />
      ),
    },
    {
      field: "hospitalroom",
      headerName: " Hospital Room ",
      width: 390,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
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
          renderInput={(params) => (
            <MDInput {...params} sx={{ mb: 1 }} label="Select Hospital Room" />
          )}
        />
      ),
    },
  ];
  const deletePPNRow = (param) => {
    const newArray = ppnrows.filter((row) => row.id !== param.id);

    setppnrows([...newArray]);
  };
  const [PPNCHKBOX, setPPNCHKBOX] = React.useState(false);

  const handleChangePPNCHKBOX = (event) => {
    const { checked } = event.target;
    setPPNCHKBOX(checked);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Is PPN Applicable?
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
        <RadioGroup row onChange={(event) => handleChange(event)} value={ppnvalue}>
          <FormControlLabel value="PPNYes" control={<Radio />} label="Yes" />
          <FormControlLabel value="PPNNo" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>

      {ppnvalue === "PPNYes" && (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              ROOM MAPPING
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox
              sx={{
                mt: 2,
                width: "80%",
                "& .super-app-theme--header": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <DataGrid
                autoHeight
                rowHeight={70}
                rows={ppnrows}
                columns={ppncolumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
              <MDButton color="info" onClick={handleAddPPNRow}>
                ADD
              </MDButton>
              <MDButton color="info" onClick={deletePPNRow}>
                REMOVE
              </MDButton>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <FormGroup sx={{ mt: -0.5 }}>
              <FormControlLabel
                sx={{ ...formControlLabelStyle }}
                control={
                  <Checkbox
                    sx={{ transform: "scale(0.8)" }}
                    type="checkbox"
                    name="Status"
                    checked={PPNCHKBOX} // <-- set the checked prop of input
                    onChange={(event) => handleChangePPNCHKBOX(event)}
                  />
                }
                label="PPN Package Discount"
              />{" "}
              {PPNCHKBOX && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput label="Package discount" />
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
                      renderInput={(params) => <MDInput {...params} label="Excluding " />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
                      <MDButton color="info">SUBMIT</MDButton>
                      <MDButton color="info">UPDATE PPN RATES EXCEL UPLOAD</MDButton>
                      <MDButton color="info">CANCEL</MDButton>
                    </Stack>
                  </Grid>
                </Grid>
              )}
            </FormGroup>
          </Grid>
        </>
      )}
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} columns={10}>
        <MDInput label="DEO Remarks" sx={{ mt: 2 }} />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
          <MDButton color="info">SUBMIT</MDButton>
          <MDButton color="info">CANCEL</MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default PPN;
