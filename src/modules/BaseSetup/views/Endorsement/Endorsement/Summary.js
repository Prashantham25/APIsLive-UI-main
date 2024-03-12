import React from "react";
import {
  Grid,
  //   Autocomplete,
  //   Stack,
  Accordion,
  AccordionDetails,
  //   AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import MDButton from "../../../../../components/MDButton";

// import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";

function RenderControl({ x, id, controlItems1, filterPolicyJson, idd }) {
  // debugger;

  console.log("22", filterPolicyJson, id);
  const unique = controlItems1.filter((t) => t.parameterName.split(" ").join("") === x)[0].levelId;

  return (
    <div>
      {(() => {
        switch (controlItems1.filter((v1) => v1.parameterName.split(" ").join("") === x)[0].type) {
          case "Input":
            return (
              <MDInput
                label={
                  controlItems1.filter((v2) => v2.parameterName.split(" ").join("") === x)[0].label
                }
                name={x}
                //  value={filterPolicyJson[x]}
                value={
                  unique === 55
                    ? filterPolicyJson.InsurableItem[0].RiskItems[idd][x]
                    : filterPolicyJson[x]
                }
                disabled
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

function Summary({
  filterPolicyJson,
  // object,
  controlItems1,
  PolicyJson,
  handleSubmit,
  enType,
  enCat,
  endorsementCategory,
  endorsementType,
  names,
}) {
  return (
    <MDBox>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container style={{ justifyContent: "center", alignItems: "center" }}>
            <MDTypography variant="h4">Summary</MDTypography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Policy Number" value={filterPolicyJson.PolicyNumber} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Endorsement Type"
                value={endorsementType.filter((type) => type.mID === enType)[0].mValue}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Endorsement Category"
                value={endorsementCategory.filter((cat) => cat.mID === enCat)[0].mValue}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} xl={5.5} md={5.5} xxl={5.5}>
              <MDTypography variant="h6">Existing Policy Details</MDTypography>
              <br />
              <Grid container spacing={2}>
                {Object.keys(PolicyJson).map((a, keya) =>
                  controlItems1.findIndex((val) => val.parameterName === a && val.levelId === 54) >=
                  0 ? (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <RenderControl
                        x={a}
                        id={keya}
                        controlItems1={controlItems1}
                        filterPolicyJson={PolicyJson}
                        // name=""
                      />
                    </Grid>
                  ) : null
                )}

                {PolicyJson.InsurableItem.map((b, keyb) =>
                  controlItems1.findIndex(
                    (valab) =>
                      valab.parameterInsurableName === b.InsurableName && valab.levelId === 55
                  ) >= 0 ? (
                    <>
                      <br />
                      <Accordion style={{ "margin-left": "20px" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDTypography variant="h6">
                                InsurableItem:{b.InsurableName}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            {PolicyJson.InsurableItem[keyb].RiskItems.map((c, keyc) => (
                              <>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                  <MDTypography>{c.Name}</MDTypography>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
                                <br />
                                {Object.keys(c).map((d, keyd) =>
                                  controlItems1.findIndex(
                                    (valac) => valac.parameterName.split(" ").join("") === d
                                  ) >= 0 ? (
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                                      <RenderControl
                                        x={d}
                                        id={keyd}
                                        controlItems1={controlItems1}
                                        filterPolicyJson={PolicyJson}
                                        // xb={c}
                                        idd={keyc}
                                        // name="RiskItems"
                                      />
                                    </Grid>
                                  ) : null
                                )}
                                {/* </Grid> */}
                              </>
                            ))}
                          </Grid>
                        </AccordionDetails>
                        {/* {xa.RiskItems.map((xb,keyb)=>
                        <AccordionDetails>
                            Person{keyb+1}
                           
                        </AccordionDetails>
                        )} */}
                      </Accordion>
                    </>
                  ) : null
                )}
              </Grid>
            </Grid>

            <Grid item xs={6} sm={6} xl={1} md={1} xxl={1}>
              <Divider orientation="vertical" />
            </Grid>

            <Grid item xs={6} sm={6} xl={5.5} md={5.5} xxl={5.5}>
              <MDTypography variant="h6">New Policy Details</MDTypography>
              <br />
              <Grid container spacing={2}>
                {Object.keys(filterPolicyJson).map((e, keye) =>
                  controlItems1.findIndex((en) => en.parameterName === e && en.levelId === 54) >=
                  0 ? (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <RenderControl
                        x={e}
                        id={keye}
                        controlItems1={controlItems1}
                        filterPolicyJson={filterPolicyJson}
                        // name=""
                      />
                    </Grid>
                  ) : null
                )}

                {filterPolicyJson.InsurableItem.map((f, keyf) =>
                  controlItems1.findIndex(
                    (en1) => en1.parameterInsurableName === f.InsurableName && en1.levelId === 55
                  ) >= 0 ? (
                    <>
                      <br />
                      <Accordion style={{ "margin-left": "20px" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDTypography variant="h6">
                                InsurableItem:{f.InsurableName}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            {filterPolicyJson.InsurableItem[keyf].RiskItems.map((g, keyg) => (
                              <>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                  {/* <MDTypography>{g.Name}</MDTypography> */}
                                  <MDTypography>{names[keyg].name}</MDTypography>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
                                <br />
                                {Object.keys(g).map((h, keyh) =>
                                  controlItems1.findIndex(
                                    (en2) => en2.parameterName.split(" ").join("") === h
                                  ) >= 0 ? (
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                                      <RenderControl
                                        x={h}
                                        id={keyh}
                                        controlItems1={controlItems1}
                                        filterPolicyJson={filterPolicyJson}
                                        // xb={g}
                                        idd={keyg}
                                        // name="RiskItems"
                                      />
                                    </Grid>
                                  ) : null
                                )}
                                {/* </Grid> */}
                              </>
                            ))}
                          </Grid>
                        </AccordionDetails>
                        {/* {xa.RiskItems.map((xb,keyb)=>
                        <AccordionDetails>
                            Person{keyb+1}
                           
                        </AccordionDetails>
                        )} */}
                      </Accordion>
                    </>
                  ) : null
                )}
              </Grid>
              {/* </Grid> */}
            </Grid>
          </Grid>
          {/* </Grid> */}
        </AccordionDetails>
        <Grid container style={{ justifyContent: "center", alignItems: "center" }}>
          <MDButton variant="contained" onClick={handleSubmit}>
            Save
          </MDButton>
        </Grid>
      </Accordion>
    </MDBox>
  );
}

export default Summary;
