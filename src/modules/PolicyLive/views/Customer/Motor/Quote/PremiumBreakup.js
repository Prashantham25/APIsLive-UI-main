import { useEffect, useState } from "react";
import { Autocomplete, Grid, Paper } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import objectPath from "object-path";
// import MDTypography from "components/MDTypography";
import { GetProdPartnermasterData } from "../../data";
import { GeneratePDF, SaveQuote, Quotations } from "../../../Retail/data/Apis";
import { generateFile } from "../../../../../../Common/RenderControl/Version3/RenderControlFunctions";
import MotorPremiumSummary from "../../../Retail/Products/Demo/MotorPremiumSummary";

const AutoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

function PremiumBreakup({ handleNext, policyDto, setPolicyDto, setLoader }) {
  // const [Counter, setCounter] = useState(0);
  const lPolicyDto = policyDto;

  // const formate = new Intl.NumberFormat("en-IN", {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // });

  // const [PremiumDetails, setPremiumDetails] = useState({
  //   IDV: "",
  //   BasePremium: "",
  //   Addons: "",
  //   FinalPremium: "",
  //   BasicOD1Premium: "",
  //   BasicTP2: "",
  // });

  const onProceed = async () => {
    setLoader(true);
    const res1 = await SaveQuote(policyDto);
    lPolicyDto.QuoteNumber = res1?.quotation?.quoteNo;
    setPolicyDto({ ...lPolicyDto });
    const res = await GeneratePDF("MotorQuotationT", lPolicyDto);
    generateFile({ content: res.fileUploadResp?.fileData, fileName: "Quotation" });
    setLoader(false);
    handleNext();
  };
  const [mast, setMast] = useState({ NCB: [], Insurers: [], AddOnCovers: [], PolicyType: [] });

  const onGetQuote = async () => {
    // setLoader(true);
    // const res = await GenericApi(policyDto.QuotationNumber);
    // const partner = res.quotationDetails.filter((x) => x.partnerName === "HDFC");
    // if (partner.length > 0) setPremiumDetails({ ...premiumDetails, ...partner[0].premiumResult });
    // setLoader(false);
  };

  useEffect(async () => {
    setLoader(true);
    const res = await Quotations(policyDto);
    lPolicyDto.PremiumDetails = res.finalResult;
    objectPath.set(lPolicyDto, "PremiumDetail.TotalPremium", res.finalResult.TotalPremium);

    setPolicyDto({ ...lPolicyDto });
    // setPremiumDetails({ ...res.finalResult });

    setLoader(false);
  }, []);

  useEffect(async () => {
    // await GenericApi("NepalMotorTW", "NepalTWCalculatePremium", policyDto);
    const res1 = await GetProdPartnermasterData(449, "NCB", {});
    const res2 = await GetProdPartnermasterData(449, "Insurers", {});
    const res3 = await GetProdPartnermasterData(449, "AddOnCovers", {});
    const res4 = await GetProdPartnermasterData(449, "PolicyType", {});
    setMast({ NCB: res1, Insurers: res2, AddOnCovers: res3, PolicyType: res4 });
  }, []);

  return (
    <Grid container spacing={10} p={3}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Paper elevation={24}>
          <Grid container spacing={3} p={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={mast.NCB}
                sx={AutoStyle}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput variant="standard" {...params} label="NCB Value" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={[]}
                sx={AutoStyle}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput variant="standard" {...params} label="Insure Declared value" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={mast.AddOnCovers}
                sx={AutoStyle}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput variant="standard" {...params} label="Add-Ons" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={mast.PolicyType}
                sx={AutoStyle}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput variant="standard" {...params} label="Plan Type" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDInput disabled variant="standard" label="Own Damage Tenure" />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDInput disabled variant="standard" label="Third Party Tenure" />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDButton variant="outlined" onClick={onGetQuote}>
                Get Quote
              </MDButton>{" "}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MotorPremiumSummary dto={policyDto} width="50%" />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <MDButton variant="outlined" onClick={onProceed}>
            Proceed to Proposal
          </MDButton>
        </MDBox>
      </Grid>
    </Grid>
  );
}
export default PremiumBreakup;
