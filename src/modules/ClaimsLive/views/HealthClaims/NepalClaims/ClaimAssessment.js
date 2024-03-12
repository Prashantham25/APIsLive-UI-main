import React, { useState } from "react";
import { Grid, Card } from "@mui/material";

import { useNavigate } from "react-router-dom";
// import ClaimsDetails from "./JsonData";

import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import { setGenericInfo, useDataController } from "../../../../BrokerPortal/context";

function ClaimAssessment() {
  const navigate = useNavigate();
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  // const [claimJson, setClaimJson] = useState(ClaimsDetails);
  const [, dispatch] = useDataController();
  const [SearchObj, SetSearchObj] = useState({ claimNo: "" });
  const [flag, setFlags] = useState({
    SearchFlag: false,
  });

  const handleChange = (e) => {
    const updatedSearchObj = { ...SearchObj, [e.target.name]: e.target.value };
    SetSearchObj(updatedSearchObj);
    if (updatedSearchObj.claimNo !== "") {
      setFlags((prev) => ({ ...prev, SearchFlag: true }));
    }
  };

  const handlesearch = () => {
    setGenericInfo(dispatch, {
      prod: "NepalMotorTwoWheeleClaimAssessment",
      claimNo: SearchObj.claimNo,
    });
    // setLoading(false);
    navigate(`/ClaimsLive/ClaimProcessingV2`);

    // claimJson.claimsMenuId = 2;
    // setClaimJson({ ...ClaimsDetails }); // might need to comment
    // navigate(`/Claim/Processing`, {
    //   state: {
    //     gridData: { ...claimJson },
    //     productCode: "NepalMotorTwoWheeler",
    //   },
    // });
    // navigate(`/ClaimsLive/ClaimProcessingV2`, {
    //   state: {
    //     productCode: "NepalMotorTwoWheeleClaimAssessment",
    //   },
    // });
  };

  return (
    <Card>
      <Grid container p={2}>
        <Grid container alignItems="center">
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography variant="h6" color="primary">
              Claim Assessment
            </MDTypography>
          </Grid>
          {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} textAlign="right">
            <MDButton variant="contained">Claim File Movement</MDButton>
          </Grid> */}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} mt={2}>
          <MDInput
            label="Claim Number"
            name="claimNo"
            value={SearchObj.claimNo}
            sx={redAsterisk}
            required
            onChange={(e) => handleChange(e)}
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
          <MDButton
            sx={{ justifyContent: "right" }}
            variant="contained"
            onClick={handlesearch}
            disabled={flag.SearchFlag === false}
          >
            SEARCH
          </MDButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ClaimAssessment;
