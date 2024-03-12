import React, { useState } from "react";
import { Grid, Card } from "@mui/material";

import { useNavigate } from "react-router-dom";
import ClaimsDetails from "./JsonData";

import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";

function ClaimSettlement() {
  const navigate = useNavigate();
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  const [claimJson, setClaimJson] = useState(ClaimsDetails);

  const handlesearch = () => {
    claimJson.claimsMenuId = 7;
    setClaimJson({ ...ClaimsDetails }); // might need to comment
    navigate(`/Claim/Processing`, {
      state: {
        gridData: { ...claimJson },
        productCode: "NepalMotorTwoWheeler",
      },
    });
  };

  return (
    <Card>
      <Grid container p={2}>
        <Grid container alignItems="center">
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography variant="h6" color="primary">
              Claim Settlement
            </MDTypography>
          </Grid>
          {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} textAlign="right">
            <MDButton variant="contained">Claim File Movement</MDButton>
          </Grid> */}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} mt={2}>
          <MDInput
            label="Claim Number"
            name="ClaimNo"
            // value={Logindata.UserName}F
            // onChange={(e) => handleUserName(e)}
            sx={redAsterisk}
            required
            // error={ErrorFlag && Logindata.UserName === ""}
            // helperText={ErrorFlag && Logindata.UserName === "" ? helperText : ""}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          xxl={4}
          mt={2}
          style={{ marginLeft: "1rem" }}
        >
          <MDButton sx={{ justifyContent: "right" }} variant="contained" onClick={handlesearch}>
            SEARCH
          </MDButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ClaimSettlement;
