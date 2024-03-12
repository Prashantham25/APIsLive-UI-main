import { Grid, FormControlLabel, Box, Autocomplete, Stack } from "@mui/material";
import MDCheckbox from "components/MDCheckbox";
import MDTypography from "components/MDTypography";

import MDInput from "components/MDInput";

function Quotes({ dto, setDto, masters, setMasters, ind, medicalSumInsured }) {
  const lDto = dto;
  const lMasters = masters;

  const onClick = (e, name, ind1) => {
    // lMasters.flags.editval = false;
    lMasters.Quotes[masters.flags.activeTab].editval = false;
    lMasters.QuoteIndex = ind;
    lMasters.QuoteModfyVal = true;

    if (name === "MedicalExpenses") {
      lMasters.Quotes[lMasters.flags.activeTab].medFlag = "True";
    } else if (name === "Terrorism") {
      lMasters.Quotes[lMasters.flags.activeTab].terrFlag = "True";
    } else if (name === "OccupationalDisease") {
      lMasters.Quotes[lMasters.flags.activeTab].occFlag = "True";
    } else if (name === "ContractWorkersExtension") {
      lMasters.Quotes[lMasters.flags.activeTab].contFlag = "True";
    }
    if (e.target.checked === true) {
      lMasters.Quotes[ind][name] = "Yes";

      lDto.InsurableItem[0].Covers[ind1].IsOptional = "Yes";
      lDto.InsurableItem[0].Covers[ind1].selected = "True";
    } else if (e.target.checked === false) {
      lMasters.Quotes[ind][name] = "No";
      lDto.InsurableItem[0].Covers[ind1].IsOptional = "No";
      lDto.InsurableItem[0].Covers[ind1].selected = "False";
    }
    lMasters.QuoteModfyVal = false;

    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const onLdDst = (e, name) => {
    if (name === "Discount") {
      const regex = /^[0-9.]*$/;
      if (regex.test(Number(e.target.value)) && Number(e.target.value) < 90.1) {
        lMasters.Quotes[ind][name] = e.target.value;
        lMasters.Quotes[ind].DiscountVal = "Other Discount";
        lDto[name] = e.target.value;
        lDto.DiscountVal = "Other Discount";

        lMasters.flags.distErr = false;
      } else {
        lMasters.flags.distErr = true;
      }
      lMasters.onBlurDiscount = true;
    } else if (name === "Loading") {
      const regex = /^[0-9]*$/;
      if (regex.test(Number(e.target.value)) && Number(e.target.value) < 100.1) {
        lMasters.Quotes[ind][name] = e.target.value;
        lMasters.Quotes[ind].LoadingVal = "Other Loadings";

        lDto[name] = e.target.value;
        lDto.LoadingVal = "Other Loadings";

        lMasters.flags.loadErr = false;
      } else {
        lMasters.flags.loadErr = true;
      }
      lMasters.onBlurLoad = true;
    } else {
      lMasters.Quotes[ind][name] = e.target.value;
      lDto[name] = e.target.value;
    }
    // lMasters.flags.editval = false;
    lMasters.Quotes[masters.flags.activeTab].editval = false;
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const handleAutocomplete = (e, v) => {
    lMasters.Quotes[masters.QuoteIndex].MedicalSumInsured = v.mID;
    lMasters.Quotes[masters.QuoteIndex].MedicalSumInsuredValue = v.mValue;
    lDto.InsurableItem[0].Covers[0].Limit = v.mID;
    lDto.InsurableItem[0].Covers[0].LimitValue = v.mValue;
    // lMasters.flags.editval = false;
    lMasters.Quotes[masters.flags.activeTab].editval = false;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const onBlur = (e, n) => {
    if (n === "Loading") {
      lMasters.onBlurLoad = false;
    } else if (n === "Discount") {
      lMasters.onBlurDiscount = false;
    }
    setMasters({ ...lMasters });
  };
  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "spaceBetween",
          width: "50%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
            {" "}
            <FormControlLabel
              checked={masters.Quotes[ind].MedicalExpenses === "Yes"}
              control={
                <MDCheckbox
                  // sx={{
                  //   color: "grey",
                  //   "&.Mui-checked": {
                  //     color: "#c70825",
                  //   },
                  // }}
                  onClick={(e) => onClick(e, "MedicalExpenses", 0)}
                />
              }
              label="Medical Expences"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            {masters.Quotes[ind].MedicalExpenses === "Yes" && (
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  width: "200px",
                }}
                options={medicalSumInsured}
                value={{ mValue: masters.Quotes[ind].MedicalSumInsuredValue }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, v) => handleAutocomplete(e, v)}
                renderInput={(params) => (
                  <MDInput {...params} label="Select sum insured Limit" required />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <FormControlLabel
              checked={masters.Quotes[ind].Terrorism === "Yes"}
              control={<MDCheckbox onClick={(e) => onClick(e, "Terrorism", 1)} />}
              label="Terrorism"
            />
          </Grid>{" "}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <FormControlLabel
              checked={masters.Quotes[ind].OccupationalDisease === "Yes"}
              control={<MDCheckbox onClick={(e) => onClick(e, "OccupationalDisease", 2)} />}
              label="Occupational Disease"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <FormControlLabel
              checked={masters.Quotes[ind].ContractWorkersExtension === "Yes"}
              control={<MDCheckbox onClick={(e) => onClick(e, "ContractWorkersExtension", 3)} />}
              label="Contract Worker Extension"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              sx={{
                color: "red",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
            >
              Note : A user can enter only on loading or discount
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack display="flex" direction="row" spacing={2} sx={{ width: "400px" }}>
              <MDInput
                label="Loading in %"
                value={masters.Quotes[ind].Loading}
                onChange={(e) => onLdDst(e, "Loading")}
                // sx={{ width: "px" }}
                autoFocus={masters?.onBlurLoad}
                onBlur={(e) => onBlur(e, "Loading")}
                disabled={dto.Discount}
                error={masters.flags.loadErr}
                helperText={masters.flags.loadErr && "maximum loading applicable is 100%"}
              />
              {/* </Grid> */}
              {/* <Grid item xs={6}> */}
              <MDInput
                label="Discount in %"
                value={masters.Quotes[ind].Discount}
                onChange={(e) => onLdDst(e, "Discount")}
                disabled={dto.Loading}
                autoFocus={masters?.onBlurDiscount}
                onBlur={(e) => onBlur(e, "Discount")}
                error={masters.flags.distErr}
                helperText={masters.flags.distErr && "maximum discount applicable is 90%"}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Quotes;
