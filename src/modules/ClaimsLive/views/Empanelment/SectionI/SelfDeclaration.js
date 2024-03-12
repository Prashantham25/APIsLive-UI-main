import React from "react";
import { Grid, FormControlLabel, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";

function SelfDeclaration() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          It is certified that the particulars furnished in the empanelment application form are
          correct
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography sx={{ color: "#757575", fontSize: 12, mt: 2 }}>
          That the hospital shall not charge higher than the agreed tariff/package price from the
          insured members and that the tariff/rates agreed are not higher than those applicable for
          non-insured/cash paying patients or those agreed with any other
          insurer/TPA/payer/government scheme except (specify category of customers/name of
          scheme/payer with whom lower tariff agreed)
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#37474f", fontSize: 15, mt: 3 }}>
          Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#37474f", fontSize: 12, mt: 5, ml: 40, mb: 5 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          That the details have been provided against a facility/procedure actually available at the
          hospital
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 2 }}>
          That if any information is found to be untrue, Hospital is liable for de-panelment by
          insurer/TPA
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 2 }}>
          That Hospital shall abide by standard formats as prescribed & mandated from time to time
          by IRDA and Ministry of Health and Family Welfare
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 2 }}>
          That the Hospital has the capability to connect online with insurer/TPA for
          pre-authorization and other documentation purpose
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          sx={{ mt: 3 }}
          label=" That the Hospital has not been depanelled/blacklisted by any insurer/TPA/any other payer/government department/scheme except (if any)"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          sx={{ mt: 3 }}
          label="That no investigation by Central Government/State Government or any Statuary Investigating agency is pending or contemplated against the hospital, except (if any).*"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#37474f", fontSize: 15, mt: 5 }}>
          Attachment: Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#37474f", fontSize: 12, mt: 5, ml: 40, mb: 5 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 2 }}>
          That the hospital agrees to allow/permit inspection/verification of facilities, hospital
          infrastructure, in-door case papers, documents authorised persons of insurer/TPA or
          another agency working on behalf of insurer/TPA.
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 2 }}>
          That the hospital agrees to abide by ethical medical practices at all times.
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
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

export default SelfDeclaration;
