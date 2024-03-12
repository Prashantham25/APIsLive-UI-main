import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MDButton from "../../../../components/MDButton";
import MDInput from "../../../../components/MDInput";
import { GetClientSSODetails } from "./data";

const { Card, Grid, Autocomplete, Stack } = require("@mui/material");

function Test() {
  const navigate = useNavigate();

  const RateName = [
    { mID: "0F1426A6-4850-4C0D-966B-4F6D6E4A9BBD", mValue: "BGR" },
    { mID: "99AC3DD7-7F5D-4404-B452-AA5EEBE1F29C", mValue: "BLUS" },
    { mID: "ADB4B430-53BD-40B9-AC90-599F92CF4EC4", mValue: "BSUS" },
    { mID: "4152FAFD-386B-4063-8D26-8BA5E7E18FEA", mValue: "SpecificVoyage" },
    { mID: "FD18EECA-B3E2-4159-BF4E-3E583206DAF3", mValue: "IMD" },
  ];
  const [masters, setMasters] = useState("");

  const onHandleNext = () => {
    const SSODetails = {
      ClientId: masters,
      AppId: "USGI",
      UserId: "02f02f7a-b1a2-4cd0-86d0-675d02617399",
    };
    GetClientSSODetails(SSODetails).then((result) => {
      // GetSSODetails(result).then((resultdata) => {
      navigate(`/Pages/Sample`, { state: result });
      // });
    });
  };

  const handleProposerSalutationDropdown = (event, values) => {
    setMasters(values.mID);
  };
  return (
    <Card sx={{ height: "50rem" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} p={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            value={RateName.mValue}
            options={RateName}
            onChange={(event, value) => handleProposerSalutationDropdown(event, value)}
            // onChange={(e, newValue) => setFeilds({ ...feilds, parameterType: newValue.mValue })}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Products" required />}
            // onSelect={(e) => setFeilds({ ...feilds, parameterType: e.target.value })}
          />
        </Grid>
        <Stack direction="column" p={2}>
          <MDButton variant="contained" onClick={onHandleNext}>
            Submit
          </MDButton>
        </Stack>
      </Grid>
    </Card>
  );
}
export default Test;
