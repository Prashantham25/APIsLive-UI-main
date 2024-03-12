import React, { useState } from "react";
import { Grid, Card, Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import { setGenericInfo, useDataController } from "../../../../BrokerPortal/context";
import { SearchClaimDetailsByRegClaimNo } from "../data";
// import ClaimsDetails from "./JsonData";

function ClaimAdvancePayment() {
  // const [claimJson, setClaimJson] = useState(ClaimsDetails);
  const [, dispatch] = useDataController();
  const [SearchObj, SetSearchObj] = useState({ claimNo: "" });
  const [loading, setLoading] = useState(false);
  const [flag, setFlags] = useState({
    SearchFlag: false,
  });

  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    const data = await SearchClaimDetailsByRegClaimNo("", SearchObj.claimNo);
    console.log("data", data);
    // claimJson.claimsMenuId = 3;
    // setClaimJson({ ...ClaimsDetails });
    setGenericInfo(dispatch, {
      prod: "NepalMotorTwoWheeleAdvancePayment",
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

  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
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
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Claim Advance Payment Process
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Claim Number"
            name="claimNo"
            value={SearchObj.claimNo}
            sx={redAsterisk}
            required
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} style={{ marginLeft: "1rem" }}>
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
export default ClaimAdvancePayment;
