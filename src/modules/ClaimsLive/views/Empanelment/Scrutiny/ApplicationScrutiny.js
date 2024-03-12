import React, { useEffect } from "react";
import { Grid, FormControlLabel, Autocomplete, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";

function ApplicationScrutiny() {
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Is Physical Verificastion Required
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChange(event)} value={value}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      {setPED ? (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 3 }}>
              Physical Verification Required
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <RadioGroup
              row
              sx={{ mt: 2 }}
              onChange={(event) => handleChange1(event)}
              value1={value}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Internal Investigator" />
              <FormControlLabel value="No" control={<Radio />} label="External Investigator" />
            </RadioGroup>
          </Grid>

          {setPED1 ? (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={[]}
                getOptionLabel={(option) => option}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                renderInput={(params) => (
                  <MDInput {...params} label="Select Internal investigator" sx={{ mt: 2 }} />
                )}
              />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={[]}
                getOptionLabel={(option) => option}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                renderInput={(params) => (
                  <MDInput {...params} label="Select External investigator" sx={{ mt: 2 }} />
                )}
              />
            </Grid>
          )}
        </>
      ) : (
        <Grid Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <Autocomplete
              options={[]}
              getOptionLabel={(option) => option}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px",
                },
              }}
              renderInput={(params) => (
                <MDInput {...params} label="Empanelment Application Verified" sx={{ mt: 3 }} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDInput label=" Remarks" sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          options={["Request Rejected", " Send top capture soc"]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <MDInput
              {...params}
              label="Empanelment Application Verified *
            "
              sx={{ mt: 2 }}
            />
          )}
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
          renderInput={(params) => <MDInput {...params} label="Remarksr" sx={{ mt: 2 }} />}
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
          renderInput={(params) => (
            <MDInput {...params} label="Empanelment soc and tariff" sx={{ mt: 2 }} />
          )}
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
          renderInput={(params) => <MDInput {...params} label="Provider Type" sx={{ mt: 2 }} />}
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
          renderInput={(params) => <MDInput {...params} label="Provider Category" sx={{ mt: 2 }} />}
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
          renderInput={(params) => (
            <MDInput {...params} label="Provider Sub-Category" sx={{ mt: 2 }} />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row" spacing={3} mt={4}>
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

export default ApplicationScrutiny;
