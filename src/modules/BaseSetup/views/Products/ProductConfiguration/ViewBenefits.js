import React, { useState, useEffect } from "react";
import { Grid, Autocomplete, IconButton } from "@mui/material";
// import MDButton from "components/MDButton";

import MDTypography from "components/MDTypography";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Delete, Edit } from "@mui/icons-material";
// import RemoveIcon from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDataController, setProductJson } from "../../../../BrokerPortal/context";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import Cwe from "./Cwe";
import { handleDelete } from "./data/Handlers";

function ViewBenefits({
  keyi,
  keyc,
  keyb,
  benefitCriteria,
  masterData,
  columns,
  handleModal,
  // beneCri,
  // beneCriD,
  // setBeneCri,
}) {
  const [expanded, setExpanded] = useState(-1);
  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : -1);
  };
  const [bCri, setBCri] = useState([]);
  const [controller, dispatch] = useDataController();

  const { ProductJson, viewFlag } = controller;
  useEffect(() => {
    // setBeneCri(beneCriD);s
    setBCri([]);
    // debugger;
    const data = [
      { mID: 502, mValue: "Benefit" },
      { mID: 503, mValue: "Indemnity" },
    ];
    const abc = data.filter((r, i) =>
      r.mID ===
      ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
        .benefitTypes[i]
        ? r
        : null
    );
    setBCri([...abc]);
  }, [
    expanded,
    ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb].benefitTypes,
  ]);
  return (
    <MDBox sx={{ width: "100%" }}>
      {/* <Card> */}
      <Accordion
        expanded={expanded === keyb}
        onChange={handleAccordion(keyb)}
        // defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            {ProductJson.policyType === "Group" || ProductJson.policyType === "Retail" ? (
              <Grid item xs={12} sm={12} md={110} lg={10} xl={10} xxl={10}>
                <MDTypography variant="h6" sx={{ textAlign: "left" }}>
                  Benefit:
                  {
                    ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
                      keyb
                    ].benefitName
                  }
                </MDTypography>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                <MDTypography variant="h6">
                  Benefit:
                  {ProductJson.productInsurableItems[keyi].covers[keyc].Benefits[keyb].BenefitName}
                </MDTypography>
              </Grid>
            )}
            {viewFlag === false ? (
              <>
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                  <IconButton onClick={() => handleModal(keyi, keyc, keyb)}>
                    <Edit />
                  </IconButton>
                </Grid>
                {viewFlag === false ? (
                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                    <IconButton
                      onClick={() =>
                        handleDelete(ProductJson, setProductJson, dispatch, keyi, keyc, keyb)
                      }
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                ) : null}
              </>
            ) : null}
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Benefit Name"
                value={
                  ProductJson.policyType === "Group" || ProductJson.policyType === "Retail"
                    ? ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
                        keyb
                      ].benefitName
                    : ProductJson.productInsurableItems[keyi].covers[keyc].Benefits[keyb]
                        .BenefitName
                }
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="benefitTypeId"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={benefitCriteria}
                value={
                  ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
                    .benefitTypeId > 0
                    ? {
                        mID: ProductJson.productInsurableItems[keyi].productCovers[keyc]
                          .productBenefits[keyb].benefitTypeId,
                        mValue: benefitCriteria.filter(
                          (x) =>
                            x.mID ===
                            ProductJson.productInsurableItems[keyi].productCovers[keyc]
                              .productBenefits[keyb].benefitTypeId
                        )[0].mValue,
                      }
                    : { mID: 0, mValue: "" }
                }
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Benefit Criteria" disabled />}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="currencyId"
                options={
                  masterData.length > 0
                    ? masterData.filter((x) => x.mType === "Currency")[0].mdata
                    : []
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={
                  ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
                    .currencyId > 0
                    ? {
                        mID: ProductJson.productInsurableItems[keyi].productCovers[keyc]
                          .productBenefits[keyb].currencyId,
                        mValue: masterData
                          .filter((x) => x.mType === "Currency")[0]
                          .mdata.filter(
                            (y) =>
                              y.mID.toString() ===
                              ProductJson.productInsurableItems[keyi].productCovers[
                                keyc
                              ].productBenefits[keyb].currencyId.toString()
                          )[0].mValue,
                      }
                    : { mID: 0, mValue: "" }
                }
                getOptionLabel={(option) => option.mValue}
                // onChange={(e, value) => [
                //   handleAutoComplete(
                //     e,
                //     value,
                //     "benefits",
                //     "",
                //     productBenefits,
                //     setProductBenefits
                //   ),
                //   handleSetObjects(e, value, "currencyCri"),
                // ]}
                renderInput={(params) => <MDInput {...params} label="Currency" required disabled />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Benefit Amount"
                value={
                  ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
                    .benefitAmount
                }
                disabled
                //   value={ProductJson.policyType==="Group" ||ProductJson.policyType==="Retail"?
                //   ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
                //     keyb
                //   ].benefitAmount
                //   :
                //   ProductJson.productInsurableItems[keyi].covers[keyc].Benefits[
                //     keyb
                //   ].BenefitName
                // }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Maximum Benefit Amount"
                value={
                  ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
                    .maxBenefitAmount
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Maximum Benefit Criteria Value"
                value={
                  ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
                    .maxbenefitCriteria
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="benefitTypes"
                multiple
                options={[
                  { mID: 502, mValue: "Benefit" },
                  { mID: 503, mValue: "Indemnity" },
                ]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={bCri.length > 0 ? bCri.map((x) => x) : []}
                //  value={ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
                //   keyb
                // ].benefitTypes.map((x) => x)}

                getOptionLabel={(option) => option.mValue}
                // onChange={(e, value) => [
                //   handleAutoComplete(
                //     e,
                //     value,
                //     "benefits",
                //     "",
                //     productBenefits,
                //     setProductBenefits
                //   ),
                //   handleSetObjects(e, value, "beneCri"),
                // ]}
                renderInput={(params) => (
                  <MDInput {...params} label="Benefit Type" required disabled />
                )}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="basedOn"
                options={[
                  { mID: 1, mValue: "Standard SI" },
                  { mID: 2, mValue: "Cover SI" },
                  { mID: 3, mValue: "Base SI" },
                ]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={basedCri}
                value={
                  ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
                    .basedOn > 0
                    ? {
                        mID: ProductJson.productInsurableItems[keyi].productCovers[keyc]
                          .productBenefits[keyb].basedOn,
                        mValue: [
                          { mID: 1, mValue: "Standard SI" },
                          { mID: 2, mValue: "Cover SI" },
                          { mID: 3, mValue: "Base SI" },
                        ].filter(
                          (x) =>
                            x.mID ===
                            ProductJson.productInsurableItems[keyi].productCovers[keyc]
                              .productBenefits[keyb].basedOn
                        )[0].mValue,
                      }
                    : { mID: 0, mValue: "" }
                }
                getOptionLabel={(option) => option.mValue}
                // onChange={(e, value) => [
                //   handleAutoComplete(
                //     e,
                //     value,
                //     "benefits",
                //     "",
                //     productBenefits,
                //     setProductBenefits
                //   ),
                //   handleSetObjects(e, value, "basedCri"),
                // ]}
                renderInput={(params) => <MDInput {...params} label="Based On" required disabled />}
              />
            </Grid>
          </Grid>
          <br />

          {ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
            .basedOn === 1 ? (
            <MDBox>
              <Grid container spacing={2}>
                {/* {viewFlag === false ? (
                  <>
                    <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        name="siValue"
                        label="SI"
                        // onChange={(e) => handleCustomInput(e, "si", "", "", setSiValue)}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDButton
                      // onClick={addSiValue}
                      >
                        Add
                      </MDButton>
                    </Grid>
                  </>
                ) : null} */}

                <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="SI List"
                    name="si"
                    disabled
                    value={
                      ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
                        keyb
                      ].siList.length > 0
                        ? ProductJson.productInsurableItems[keyi].productCovers[
                            keyc
                          ].productBenefits[keyb].siList.map((x) => x)
                        : ""
                    }
                  />
                </Grid>
              </Grid>
              <br />{" "}
            </MDBox>
          ) : null}

          {ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
            .basedOn === 2 ? (
            <MDBox>
              <Grid container spacing={2}>
                {/* {viewFlag === false ? (
                  <>
                    {" "}
                    <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        id="coverNameId"
                        // name="coverNameId"
                        // label="Limits"
                        //  options={coverList}
                        options={[]}
                        // getOptionLabel={(option) => option.mValue}
                        renderInput={(props) => <MDInput {...props} label="Covers" />}
                        // onChange={(e, value) => handleAutoComplete(e, value, "benefits")}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        name="limitValue"
                        label="Limits"
                        // onChange={(e) =>
                        //   handleCustomInput(e, "limit", "", "", setLimitValue)
                        // }
                      />
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDButton
                      // onClick={addLimitValue}
                      >
                        Add
                      </MDButton>
                    </Grid>
                  </>
                ) : null} */}

                <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Limit List"
                    disabled
                    value={
                      ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
                        keyb
                      ].limitList.length > 0
                        ? ProductJson.productInsurableItems[keyi].productCovers[
                            keyc
                          ].productBenefits[keyb].limitList.map((x) => x)
                        : ""
                    }
                  />
                </Grid>
              </Grid>
              <br />
            </MDBox>
          ) : null}

          {ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
            .basedOn === 3 ? (
            <MDBox>
              <Grid container spacing={2}>
                {/* {viewFlag === false ? (
                  <>
                    {" "}
                    <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        name="limitValue1"
                        label="Limits"
                        // onChange={(e) =>
                        //   handleCustomInput(e, "limits", "", "", setLiValue)
                        // }
                      />
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDButton
                      // onClick={addLiValue}
                      >
                        Add
                      </MDButton>
                    </Grid>
                  </>
                ) : null} */}

                <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Limit List"
                    value={
                      ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
                        keyb
                      ].limitList.length > 0
                        ? ProductJson.productInsurableItems[keyi].productCovers[
                            keyc
                          ].productBenefits[keyb].limitList.map((x) => x)
                        : ""
                    }
                    disabled
                  />
                </Grid>
              </Grid>
              <br />{" "}
            </MDBox>
          ) : null}

          <Grid container spacing={2}>
            {/* {viewFlag === false ? (
              <>
                <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Deductible Type"
                    // value={deductible.deductableUnit}
                    name="deductableUnit"
                    // onChange={setDeductible}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Deductible Type"
                    //  value={deductible.deductableValue}
                    name="deductableValue"
                    //  onChange={setDeductible}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDButton
                  //  onClick={addDeductible}
                  >
                    Add
                  </MDButton>
                </Grid>
              </>
            ) : null} */}

            {ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
              .deductible.deductibleDto.length > 0 ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ width: "100%" }}>
                  <DataGrid
                    autoHeight
                    rows={
                      ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
                        keyb
                      ].deductible.deductibleDto
                    }
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    // disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    // getRowId={(row) => row.id}
                    //  editField="inEdit"
                  />
                </MDBox>
              </Grid>
            ) : null}
          </Grid>
          <br />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Benefits C/W/E</MDTypography>
            </Grid>
          </Grid>
          <MDBox>
            <Cwe
              keyi={keyi}
              //  insurableItemMasterArray={insurableItemMasterArray}
              type="Benefits"
              keyc={keyc}
              keyb={keyb}
            />
          </MDBox>

          {/* </Grid> */}
        </AccordionDetails>
      </Accordion>
      {/* </Card> */}
    </MDBox>
  );
}
export default ViewBenefits;
