import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDInput from "components/MDInput";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MDTypography from "components/MDTypography";

function Quote({
  addons,
  setAddons,
  activeTab,
  EscalationClause,
  showField,
  // modalObj,
  inlandFlag,

  setInlandFlag,
}) {
  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const theme = createTheme({
    status: {
      danger: "#c70825",
      outline: grey[500],
    },
  });

  const Qaddons = addons;
  const handleEsacslation = (e, value) => {
    const newAddons = { ...Qaddons[activeTab] };
    newAddons.EscalationClause = value.mValue;
    if (newAddons.EscalationClause === "") {
      newAddons["Escalation Clause"] = "No";
    } else {
      newAddons["Escalation Clause"] = "Yes";
    }
    Qaddons.splice(activeTab, 1, { ...newAddons });
    setAddons([...Qaddons]);
  };

  const handleAddon = (e) => {
    // debugger;
    const newAddons = { ...Qaddons[activeTab] };
    newAddons[e.target.name] = e.target.checked === true ? "Yes" : "No";
    Qaddons.splice(activeTab, 1, { ...newAddons });
    setAddons([...Qaddons]);
    console.log("newAddons", newAddons);
    if (Qaddons[activeTab]["Marine Inland Transit"] === "Yes") {
      const Inland = { ...Qaddons[activeTab] };
      Inland.InlandTransitPolicyRate = "0.1";
      Qaddons.splice(activeTab, 1, { ...Inland });
      setAddons([...Qaddons]);
      console.log("Qaddons", Qaddons);
    }
  };

  const handleInlandTransitPolicyRateChange = (e) => {
    const newAddons = { ...Qaddons[activeTab] };
    newAddons[e.target.name] = e.target.value;
    Qaddons.splice(activeTab, 1, { ...newAddons });
    setAddons([...Qaddons]);
    console.log("newAddons", newAddons);
  };

  const handleError = () => {
    setInlandFlag(false);
    if (parseFloat(Qaddons[activeTab].InlandTransitPolicyRate) < 0.1) {
      setInlandFlag(true);
      setTimeout(() => {
        setInlandFlag(false);
      }, 5000);
      // return;
    }
  };
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <ThemeProvider theme={theme}>
            <CustomCheckbox
              name="Floater"
              disabled={
                showField.length > 1 ||
                showField.some((x) => x?.RiskLocation?.Pincode !== "") ||
                showField.some((x) => x?.RiskLocation?.Anywhereinindia === "Yes")
              }
              checked={
                Qaddons[activeTab]?.Floater === "Yes" ||
                showField.some((x) => x?.RiskLocation?.Anywhereinindia === "Yes")
              }
              onChange={handleAddon}
            />
          </ThemeProvider>
        }
        label=" Floater Coverage"
      />
      <br />
      <FormControlLabel
        control={
          <ThemeProvider theme={theme}>
            <CustomCheckbox
              name="Third Party Liability"
              checked={Qaddons[activeTab] && Qaddons[activeTab]["Third Party Liability"] === "Yes"}
              onChange={handleAddon}
            />
          </ThemeProvider>
        }
        label="Third party Liability"
      />
      <br />
      <FormControlLabel
        control={
          <ThemeProvider theme={theme}>
            <CustomCheckbox
              name="Owners Surrounding Property"
              checked={
                Qaddons[activeTab] && Qaddons[activeTab]["Owners Surrounding Property"] === "Yes"
              }
              onChange={handleAddon}
            />
          </ThemeProvider>
        }
        label="Owner Surrounding Property"
      />
      <br />
      <FormControlLabel
        control={
          <ThemeProvider theme={theme}>
            <CustomCheckbox
              name="Removal of Debris"
              checked={Qaddons[activeTab] && Qaddons[activeTab]["Removal of Debris"] === "Yes"}
              onChange={handleAddon}
            />
          </ThemeProvider>
        }
        label="Removal of debris"
      />
      <br />
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <Autocomplete
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
            "& .MuiAutocomplete-popupIndicator": {
              color: "#000",
            },
          }}
          id="EscalationClause"
          disableClearable
          options={EscalationClause}
          getOptionLabel={(option) => option.mValue}
          name="EscalationClause"
          value={{ mValue: Qaddons[activeTab]?.EscalationClause }}
          onChange={(e, value) => handleEsacslation(e, value, "EscalationClause")}
          renderInput={(params) => (
            <MDInput
              {...params}
              inputProps={{
                ...params.inputProps,
                readOnly: true,
              }}
              label="Escalation Clause Percentage"
              placeholder="Enter Perecentage"
              required
              // error={lproposer.AnnualMaintenanceContractAMC === "" ? ProposerError : null}
            />
          )}
        />
      </Grid>
      <br />
      <FormControlLabel
        control={
          <ThemeProvider theme={theme}>
            <CustomCheckbox
              name="Terrorism"
              checked={Qaddons[activeTab]?.Terrorism === "Yes"}
              onChange={handleAddon}
            />
          </ThemeProvider>
        }
        label="Terrorism"
      />
      <br />
      <FormControlLabel
        control={
          <ThemeProvider theme={theme}>
            <CustomCheckbox
              name="Marine Inland Transit"
              checked={Qaddons[activeTab] && Qaddons[activeTab]["Marine Inland Transit"] === "Yes"}
              onChange={handleAddon}
            />
          </ThemeProvider>
        }
        label="Marine Inland Transit Policy"
      />
      <br />
      {Qaddons[activeTab] && Qaddons[activeTab]["Marine Inland Transit"] === "Yes" && (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          {/* <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}> */}
          <MDInput
            label="Inland Transit Policy Rate"
            required
            name="InlandTransitPolicyRate"
            id="InlandTransitPolicyRate"
            placeholder="Enter Inland Transit Policy Rate"
            onBlur={handleError}
            value={addons[activeTab].InlandTransitPolicyRate}
            onChange={handleInlandTransitPolicyRateChange}
          />
          {inlandFlag && (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              This will be subject to underwriter Approval
            </MDTypography>
          )}
        </Grid>
      )}
    </FormGroup>
  );
}

export default Quote;
