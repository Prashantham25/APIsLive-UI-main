import React, { useEffect } from "react";

import { Grid, Checkbox, FormGroup, FormControlLabel } from "@mui/material";

import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MDBox from "../../../../../components/MDBox";
import {
  useDataController,
  setRisk,
  setClaim,
  // setCover,
  setProductJson,
} from "../../../../BrokerPortal/context";
import { getRisks } from "./data/index";

function Parameters() {
  // const riskL = risk;
  // const claimL = claim;
  const [controller, dispatch] = useDataController();
  const { ProductJson, risk, claim, viewFlag, editFlag, cloneFlag } = controller;
  // const [risk, setRisk] = useState([]);
  // const [claim, setClaim] = useState([]);

  useEffect(async () => {
    //  debugger;
    let riskL = risk;
    let claimL = claim;
    // setRisk(dispatch,[]);
    // setClaim(dispatch,[]);
    if (ProductJson.cobid > 0) {
      if (viewFlag === false && cloneFlag === false && editFlag === false) {
        // if (ProductJson.cobid > 0) {
        const risk1 = await getRisks(ProductJson.cobid);
        risk1.forEach((x, key) => {
          risk1[key].mIsRequired = false;
        });
        // console.log("risk1", risk);
        // const claim1 = await getClaims(ProductJson.cobid);
        // claim1.forEach((y, key1) => {
        //   claim1[key1].mIsRequired = false;
        // });

        const unique = risk1.filter(
          (obj, index) => index === risk1.findIndex((o) => o.mValue === obj.mValue)
        );
        // const unique1 = claim1.filter(
        //   (obj, index) => index === claim1.findIndex((o) => o.mValue === obj.mValue)
        // );
        riskL = [...riskL, ...unique];
        const finalData = riskL.filter(
          (obj, index) => index === riskL.findIndex((o) => o.mValue === obj.mValue)
        );
        setRisk(dispatch, [...finalData]);
        // setClaim(dispatch, [...claim, ...unique1]);
        // }
      } else if (viewFlag === true && editFlag === false) {
        riskL = [];
        claimL = [];
        const unique = ProductJson.riskDetails.filter(
          (obj, index) =>
            index === ProductJson.riskDetails.findIndex((o) => o.mValue === obj.mValue)
        );
        const unique1 = ProductJson.claimDetails.filter(
          (obj, index) =>
            index === ProductJson.claimDetails.findIndex((o) => o.mValue === obj.mValue)
        );
        setRisk(dispatch, [...riskL, ...unique]);
        setClaim(dispatch, [...claimL, ...unique1]);
      } else if (viewFlag === false && editFlag === true) {
        // if (ProductJson.cobid > 0) {
        const risk1 = await getRisks(ProductJson.cobid);
        risk1.forEach((x, key) => {
          risk1[key].mIsRequired = false;
        });
        // console.log("risk1", risk);
        // const claim1 = await getClaims(ProductJson.cobid);
        // claim1.forEach((y, key1) => {
        //   claim1[key1].mIsRequired = false;
        // });

        const unique = risk1.filter(
          (obj, index) => index === risk1.findIndex((o) => o.mValue === obj.mValue)
        );
        // const unique1 = claim1.filter(
        //   (obj, index) => index === claim1.findIndex((o) => o.mValue === obj.mValue)
        // );

        ProductJson.riskDetails.forEach((x, i) => {
          unique.forEach((y, j) => {
            if (ProductJson.riskDetails[i].mValue === unique[j].mValue) {
              unique[j].mIsRequired = true;
            }
          });
        });
        setRisk(dispatch, [...risk, ...unique]);
      }
    }

    // }
  }, [ProductJson.cobid]);

  const handleChange = (e, idd) => {
    // debugger;
    risk[idd].mIsRequired = e.target.checked;
    setRisk(dispatch, risk);
  };
  const handleChange1 = (e, idd1) => {
    claim[idd1].mIsRequired = e.target.checked;
    setClaim(dispatch, claim);
  };
  // const handleChange3 = (e, idd4) => {
  //   cover[idd4].mIsRequired = e.target.checked;
  //   setClaim(dispatch, cover);
  // };
  const handleChange2 = (e, idd3, idd2) => {
    // debugger
    ProductJson.insurableRcbdetails[idd2].insurableChildRcbdetail[idd3].mIsRequired =
      e.target.checked;
    setProductJson(dispatch, ProductJson);
  };
  useEffect(() => {
    console.log("000", ProductJson);
  }, [ProductJson]);

  return (
    <MDBox>
      <Accordion
        // expanded={final[0]}
        // onChange={handleChange(passId)}
        // defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography variant="h6" color="primary">
                Risk Parameters{" "}
              </MDTypography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <h4>Product</h4>
              {risk.length > 0
                ? risk.map((x, key) => {
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label={x.mValue} name={x.mValue} />
                    </FormGroup>;
                  })
                : null}
            </Grid>
          </Grid> */}

          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Product</MDTypography>
            </Grid>

            {risk.map((x, key) =>
              x.levelId === 54 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      sx={{ display: "initial", justifyContent: "center" }}
                      control={
                        <Checkbox checked={x.mIsRequired} onChange={(e) => handleChange(e, key)} />
                      }
                      label={x.mValue}
                      name={x.mValue}
                      disabled={viewFlag}

                      //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                    />
                  </FormGroup>
                </Grid>
              ) : null
            )}
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Insurable Item</MDTypography>
            </Grid>

            {risk.map((x, key1) =>
              x.levelId === 55 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox checked={x.mIsRequired} onChange={(e) => handleChange(e, key1)} />
                      }
                      label={x.mValue}
                      name={x.mValue}
                      disabled={viewFlag}

                      //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                    />
                  </FormGroup>
                </Grid>
              ) : null
            )}

            {ProductJson.insurableRcbdetails.map((x2, key2) => (
              <>
                <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                  <MDTypography variant="h6">{x2.inputType}</MDTypography>
                </Grid>
                {x2.insurableChildRcbdetail.map((x3, key3) => (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={x3.mIsRequired}
                            onChange={(e) => handleChange2(e, key3, key2)}
                          />
                        }
                        label={x3.mValue}
                        name={x3.mValue}
                        disabled={viewFlag}

                        //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                      />
                    </FormGroup>
                  </Grid>
                ))}
              </>
            ))}
          </Grid>

          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h4">Cover</MDTypography>
            </Grid>
            {/* {cover.map(
              (x4, key4) => (
                // x.levelId === 54 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={x4.mIsRequired}
                          onChange={(e) => handleChange3(e, key4)}
                        />
                      }
                      label={x4.mValue}
                      name={x4.mValue}
                      //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                    />
                  </FormGroup>
                </Grid>
              )
              // ) : null
            )} */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        // expanded={final[0]}
        // onChange={handleChange(passId)}
        // defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography variant="h6" color="primary">
                Claim Parameters{" "}
              </MDTypography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Product</MDTypography>
            </Grid>

            {claim.map((x, key2) =>
              x.levelId === 57 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={x.mIsRequired}
                          onChange={(e) => handleChange1(e, key2)}
                        />
                      }
                      label={x.mValue}
                      name={x.mValue}
                      disabled={viewFlag}

                      //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                    />
                  </FormGroup>
                </Grid>
              ) : null
            )}
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Policy</MDTypography>
            </Grid>

            {claim.map((x, key3) =>
              x.levelId === 58 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={x.mIsRequired}
                          onChange={(e) => handleChange1(e, key3)}
                        />
                      }
                      label={x.mValue}
                      name={x.mValue}
                      disabled={viewFlag}

                      //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                    />
                  </FormGroup>
                </Grid>
              ) : null
            )}
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Insurable Item</MDTypography>
            </Grid>

            {claim.map((x, key4) =>
              x.levelId === 59 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={x.mIsRequired}
                          onChange={(e) => handleChange1(e, key4)}
                        />
                      }
                      label={x.mValue}
                      name={x.mValue}

                      //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                    />
                  </FormGroup>
                </Grid>
              ) : null
            )}
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Loss & Benefit</MDTypography>
            </Grid>

            {claim.map((x, key5) =>
              x.levelId === 60 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={x.mIsRequired}
                          onChange={(e) => handleChange1(e, key5)}
                        />
                      }
                      label={x.mValue}
                      name={x.mValue}

                      //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                    />
                  </FormGroup>
                </Grid>
              ) : null
            )}
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Bank Details</MDTypography>
            </Grid>

            {claim.map((x, key6) =>
              x.levelId === 61 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={x.mIsRequired}
                          onChange={(e) => handleChange1(e, key6)}
                        />
                      }
                      label={x.mValue}
                      name={x.mValue}

                      //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                    />
                  </FormGroup>
                </Grid>
              ) : null
            )}
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Claim Intimation</MDTypography>
            </Grid>

            {/* {risk.map((x) => (
              x.levelId===61 ?
            

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <FormGroup 
>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={x.mValue}
                    name={x.mValue}
                  //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                  />
                </FormGroup>
              </Grid>
              
              : null
            )
            )} */}
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Claim Process</MDTypography>
            </Grid>

            {claim.map((x, key7) =>
              x.levelId === 68 ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={x.mIsRequired}
                          onChange={(e) => handleChange1(e, key7)}
                        />
                      }
                      label={x.mValue}
                      name={x.mValue}

                      //  onClick={(e) => handleCheckBox(e, x.mID, x.mValue, keyi)}
                    />
                  </FormGroup>
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default Parameters;
