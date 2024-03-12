import { Grid, FormControlLabel, Autocomplete, Stack } from "@mui/material";
import MDCheckbox from "components/MDCheckbox";
import MDInput from "components/MDInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

function CyberQuote({ dto, setDto, masters, setMasters, ind }) {
  const lDto = dto;
  const lMasters = masters;

  const onClick = (e, name, ind1) => {
    lMasters.QuoteIndex = ind;
    if (e.target.checked === true) {
      lMasters.Quotes[ind][name] = "Yes";
      lDto.InsurableItem[0].Covers[ind1].IsOptional = "Yes";
    } else if (e.target.checked === false) {
      lMasters.Quotes[ind][name] = "No";
      lDto.InsurableItem[0].Covers[ind1].IsOptional = "No";
      if (dto.PolicyType === "Standalone") {
        let sum1 = 0;
        lDto.InsurableItem[0].Covers.forEach((x) => {
          if (x.IsOptional === "Yes") {
            lMasters.Quotes[lMasters.flags.activeTab][name] = "";
            lDto.InsurableItem[0].Covers[ind1].SumInsured = "";
            sum1 += Number(x.SumInsured);
          }
        });
        lMasters.Quotes[lMasters.flags.activeTab].TotalSumInsured = String(sum1);
        lDto.TotalSumInsured = lMasters.Quotes[lMasters.flags.activeTab].TotalSumInsured;
      }
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handleAutocomplete = (e, name, v, i) => {
    lMasters.editflag = true;
    let sum = 0;
    lDto.InsurableItem[0].Covers.forEach((x) => {
      if (x.IsOptional === "Yes") {
        lMasters.Quotes[masters.QuoteIndex][name] = v.mValue;
        lDto.InsurableItem[0].Covers[i].SumInsured = v.mValue;
        sum += Number(x.SumInsured);
      }
    });
    lMasters.Quotes[masters.QuoteIndex].TotalSumInsured = String(sum);
    lDto.TotalSumInsured = lMasters.Quotes[masters.QuoteIndex].TotalSumInsured;
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handleRadioChange = (e) => {
    lMasters.editflag = true;
    lDto[e.target.name] = e.target.value;
    lMasters.Quotes[lMasters.flags.activeTab].Deductible = e.target.value;
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].Theft === "Yes"}
            onClick={(e) => onClick(e, "Theft", 5)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>Theft of Funds</MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].Theft === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].TheftSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "TheftSumInsured", v, 5)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].Indentity === "Yes"}
            onClick={(e) => onClick(e, "Indentity", 4)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>Identity Theft</MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].Indentity === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].IndentitySumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "IndentitySumInsured", v, 4)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].Data === "Yes"}
            onClick={(e) => onClick(e, "Data", 3)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>Data Restoration</MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].Data === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].DataSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "DataSumInsured", v, 3)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].Cyber === "Yes"}
            onClick={(e) => onClick(e, "Cyber", 1)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
            Cyber Bullying/Stalking/Loss of reputation
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].Cyber === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].CyberSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "CyberSumInsured", v, 1)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].CyberEx === "Yes"}
            onClick={(e) => onClick(e, "CyberEx", 0)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>Cyber Extortion</MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].CyberEx === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].CyberExSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "CyberExSumInsured", v, 0)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].Online === "Yes"}
            onClick={(e) => onClick(e, "Online", 2)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>Online Shopping</MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].Online === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].OnlineSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "OnlineSumInsured", v, 2)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].OnlineSales === "Yes"}
            onClick={(e) => onClick(e, "OnlineSales", 6)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>Online Sales</MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].OnlineSales === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].OnlineSaleSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "OnlineSaleSumInsured", v, 6)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].Social === "Yes"}
            onClick={(e) => onClick(e, "Social", 11)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
            Social Media/Media Liability
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].Social === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].SocialSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "SocialSumInsured", v, 11)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].Network === "Yes"}
            onClick={(e) => onClick(e, "Network", 10)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
            Network Security Liability
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].Network === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].NetworkSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "NetworkSumInsured", v, 10)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].Privacy === "Yes"}
            onClick={(e) => onClick(e, "Privacy", 8)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
            Privacy Breach and Data Breach Liability
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].Privacy === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].PrivacySumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "PrivacySumInsured", v, 8)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].PrivacyThird === "Yes"}
            onClick={(e) => onClick(e, "PrivacyThird", 7)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
            Privacy Breach and Data Breach by Third Party
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].PrivacyThird === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].PrivacyThirdSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "PrivacyThirdSumInsured", v, 7)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox display="flex" flexDirection="row">
          <MDCheckbox
            checked={masters.Quotes[ind].Smart === "Yes"}
            onClick={(e) => onClick(e, "Smart", 9)}
          />
          <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>Smart Home Cover</MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {masters.Quotes[ind].Smart === "Yes" && dto.PolicyType === "Standalone" && (
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              width: "200px",
            }}
            options={masters.SumInsureds}
            value={{ mValue: masters.Quotes[ind].SmartSumInsured }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, v) => handleAutocomplete(e, "SmartSumInsured", v, 9)}
            renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" spacing={2} alignItems="center">
          <MDTypography variant="h6">Do you want to opt for Deductibles?</MDTypography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleRadioChange}
            value={masters.Quotes[ind].Deductible}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" name="Deductible" />
            <FormControlLabel value="No" control={<Radio />} label="No" name="Deductible" />
          </RadioGroup>
        </Stack>
        {/* {masters.Quotes[ind].Deductible === "Yes" ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            5% of limit of indemnity for each and every claim
          </MDTypography>
        ) : null} */}
        {masters.flags.QuoteError && masters.Quotes[ind].Deductible === "" ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            Please fill this Field
          </MDTypography>
        ) : null}
      </Grid>
    </Grid>
  );
}
export default CyberQuote;
