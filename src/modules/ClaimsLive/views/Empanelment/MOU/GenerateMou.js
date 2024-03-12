import React, { useEffect } from "react";
import { Grid, Autocomplete, FormGroup, Checkbox, FormControlLabel, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import { DataGrid } from "@mui/x-data-grid";
import RadioGroup from "@mui/material/RadioGroup";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

function GenerateMou() {
  const [nic, setnic] = React.useState(false);
  const [oic, setoic] = React.useState(false);
  const [nia, setnia] = React.useState(false);
  const [uiic, setuiic] = React.useState(false);
  const handleChangeic = (event) => {
    const { checked } = event.target;
    setnic(checked);
  };
  const handleChangeoic = (event) => {
    const { checked } = event.target;
    setoic(checked);
  };
  const handleChangenia = (event) => {
    const { checked } = event.target;
    setnia(checked);
  };
  const handleChangeuiic = (event) => {
    const { checked } = event.target;
    setuiic(checked);
  };

  const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
      fontSize: "0.6 rem",
    },
  };
  const [setPED, setPEDFlag] = React.useState(true);
  const [value, setValue] = React.useState("No");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value === "No") setPEDFlag(false);
    else setPEDFlag(true);
  });
  const [setPED1, setPEDFlag1] = React.useState(true);
  const [value1, setValue1] = React.useState("No");

  const handleChange1 = (event) => {
    setValue1(event.target.value);
  };

  useEffect(() => {
    if (value1 === "No") setPEDFlag1(false);
    else setPEDFlag1(true);
  });
  const columns = [
    {
      field: "page",
      headerName: "Page Number",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: () => <MDInput />,
    },

    {
      field: "remarks",
      headerName: "Remarks",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: () => <MDInput />,
    },
  ];
  const [rows, setrows] = React.useState([]);
  const [rowsid, setrowsid] = React.useState(0);

  const handleAddRow = () => {
    setrows([...rows, { id: rowsid + 1 }]);

    setrowsid(rowsid + 1);
  };
  return (
    <Grid container spacing={3.5}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Effective From" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Effective To" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Version No." />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          fullWidth
          options={["unknown"]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <MDInput
              {...params}
              label="MOU Compliance With *
          "
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15 }}>
          Selected IC
        </MDTypography>

        <FormGroup row rowSpacing={1} sx={{ mt: -0.5 }}>
          <FormControlLabel
            sx={{ ...formControlLabelStyle }}
            control={
              <Checkbox
                sx={{ transform: "scale(0.8)" }}
                type="checkbox"
                name="Status"
                checked={nic} // <-- set the checked prop of input
                onChange={(event) => handleChangeic(event)}
              />
            }
            label="NIC"
          />
          <FormControlLabel
            sx={{ ...formControlLabelStyle }}
            control={
              <Checkbox
                sx={{ transform: "scale(0.8)" }}
                type="checkbox"
                name="Status"
                checked={oic} // <-- set the checked prop of input
                onChange={(event) => handleChangeoic(event)}
              />
            }
            label="OIC"
          />
          <FormControlLabel
            sx={{ ...formControlLabelStyle }}
            control={
              <Checkbox
                sx={{ transform: "scale(0.8)" }}
                type="checkbox"
                name="Status"
                checked={nia} // <-- set the checked prop of input
                onChange={(event) => handleChangenia(event)}
              />
            }
            label="NIA"
          />
          <FormControlLabel
            sx={{ ...formControlLabelStyle }}
            control={
              <Checkbox
                sx={{ transform: "scale(0.8)" }}
                checked={uiic} // <-- set the checked prop of input
                onChange={(event) => handleChangeuiic(event)}
              />
            }
            label="UIIC"
          />
        </FormGroup>
      </Grid>

      {nic && (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h5" sx={{ color: "#37474f", fontSize: 15, mt: 3 }}>
              NIC : Upload Document
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
            <MDTypography sx={{ color: "#37474f", fontSize: 12, mt: 3, ml: 40, mb: 5 }}>
              Drag Files or Click to Browse
            </MDTypography>
          </Grid>
        </>
      )}

      {oic && (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h5" sx={{ color: "#37474f", fontSize: 15, mt: 3 }}>
              OIC File: Upload Document
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
            <MDTypography sx={{ color: "#37474f", fontSize: 12, mt: 3, ml: 40, mb: 5 }}>
              Drag Files or Click to Browse
            </MDTypography>
          </Grid>
        </>
      )}

      {nia && (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h5" sx={{ color: "#37474f", fontSize: 15, mt: 3 }}>
              NIA File: Upload Document
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
            <MDTypography sx={{ color: "#37474f", fontSize: 12, mt: 3, ml: 40, mb: 5 }}>
              Drag Files or Click to Browse
            </MDTypography>
          </Grid>
        </>
      )}

      {uiic && (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h5" sx={{ color: "#37474f", fontSize: 15, mt: 3 }}>
              UIIC File : Upload Document
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
            <MDTypography sx={{ color: "#37474f", fontSize: 12, mt: 3, ml: 40, mb: 5 }}>
              Drag Files or Click to Browse
            </MDTypography>
          </Grid>
        </>
      )}

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#37474f", fontSize: 15, mt: 3 }}>
          Final SOC & Tariff : Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#37474f", fontSize: 12, mt: 3, ml: 40, mb: 5 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Is Physical Verification Required
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChange(event)} value={value}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      {setPED && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 3 }}>
              Is there any changes in MOU ?
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup
              row
              sx={{ mt: 2 }}
              onChange={(event) => handleChange1(event)}
              value1={value}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {setPED1 && (
            <>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MDBox
                  sx={{
                    mt: 3,
                    ml: 10,
                    width: "100%",
                    "& .super-app-theme--header": {
                      backgroundColor: "#e0e0e0",
                    },
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
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <Stack justifyContent="right" direction="row">
                  <MDButton
                    color="info"
                    sx={{ justifyContent: "right", mt: 2 }}
                    onClick={handleAddRow}
                  >
                    ADD
                  </MDButton>
                </Stack>
              </Grid>
            </>
          )}
        </>
      )}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row" spacing={2}>
          <MDButton color="info" sx={{ justifyContent: "right" }}>
            SUBMIT
          </MDButton>
          <MDButton color="info" sx={{ justifyContent: "right" }}>
            CANCEL
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default GenerateMou;
