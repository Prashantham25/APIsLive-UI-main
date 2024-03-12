import React, { useState } from "react";
import { Grid, Card, Backdrop, CircularProgress } from "@mui/material";

import { useNavigate } from "react-router-dom";
// import ClaimsDetails from "./JsonData";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import { setGenericInfo, useDataController } from "../../../../BrokerPortal/context";
// import { SearchClaimDetailsByRegClaimNo } from "../data";

function Dischargevoucher() {
  const [, dispatch] = useDataController();
  const [SearchObj, SetSearchObj] = useState({ claimNo: "" });
  const [loading, setLoading] = useState(false);
  const [flag, setFlags] = useState({
    SearchFlag: false,
  });

  const navigate = useNavigate();
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

  // const handlesearch = () => {
  //   // claimJson.claimsMenuId = 6;
  //   // setClaimJson({ ...ClaimsDetails }); // might need to comment

  //   setGenericInfo(dispatch, {
  //     prod: "NepalMotorTwoWheeleDischarge",
  //     claimNo: ClaimNo,
  //   });

  //   navigate(`/Claim/Processing`, {
  //     state: {
  //       gridData: { ...claimJson },
  //       productCode: "NepalMotorTwoWheeler",
  //     },
  //   });
  // };

  const handleSearch = async () => {
    setLoading(true);
    // const data = await SearchClaimDetailsByRegClaimNo("", SearchObj.claimNo);
    // console.log("data", data);
    // claimJson.claimsMenuId = 3;
    // setClaimJson({ ...ClaimsDetails });
    setGenericInfo(dispatch, {
      prod: "NepalMotorTwoWheeleDischarge",
      claimNo: SearchObj.claimNo,
    });
    setLoading(false);
    navigate(`/ClaimsLive/ClaimProcessingV2`);
    // state: {
    //   // gridData: { ...ClaimsDetails },
    //   prod: "NepalMotorTwoWheeleAdvancePayment",
    // },
    // });
  };

  const handleChange = (e) => {
    const updatedSearchObj = { ...SearchObj, [e.target.name]: e.target.value };
    SetSearchObj(updatedSearchObj);
    if (updatedSearchObj.claimNo !== "") {
      setFlags((prev) => ({ ...prev, SearchFlag: true }));
    }
  };

  return (
    <Card>
      <div>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}
      </div>
      <Grid container p={2}>
        <Grid container alignItems="center">
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography variant="h6" color="primary">
              Discharge Voucher
            </MDTypography>
          </Grid>
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
            onClick={handleSearch}
            disabled={flag.SearchFlag === false}
          >
            SEARCH
          </MDButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Dischargevoucher;
