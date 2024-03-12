import React from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Modal,
  Stack,
} from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  ExpandMore,
  // Delete, Visibility,
  Edit,
  Remove,
} from "@mui/icons-material";
//   import { getProducts, getMasterData } from "./data/index";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";

const style = {
  position: "absolute",
  top: "-5%",
  left: "76%",
  transform: "translate(-85%, 6%)",
  width: 1200,
  height: 720,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 7,

  textAlign: "center",
  p: 4,
  // "max-height": "100%",
  // "overflow-y": "auto",
};
const BenefitMapping = React.forwardRef(
  (
    {
      productJson,

      setSectionCheckbox,
      open,
      handleBenefitOpen,
      handleClose,
      benefitLevel,
      dedType,
      dedAmt,
      // premiumType,
      BenefitDetails,
      val,
      si,
      limit,
      siObj,
      limitObj,
      showStandardSi,
      showBaseSi,
      showCoverSi,
      handleChange,
      flagCalc1,
      flagCalc2,
      flagCalc3,
      handleChange1,
      handleChange2,
      handleBenefits,
      mapIt,
      lValue,
      groupIt,
      baseValue,
      limitB,
      mapFlag,
    },
    ref
  ) => (
    <MDBox width="100%">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <MDTypography variant="h6" ref={ref}>
            Benefit Mapping
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {productJson.productInsurableItems.map((x, key) => (
              <>
                <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                  <h5>InsurableItem:{x.insurableItem}</h5>
                </Grid>
                {x.productCovers.map((y, key1) => (
                  <>
                    <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                      <h4>Cover:{y.cover || y.coverDescription}</h4>
                    </Grid>

                    <Grid container spacing={2}>
                      {y.productBenefits.map((z, key2) => (
                        <>
                          <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                            <Stack direction="row" spacing={2}>
                              {/* <Grid item xs={12} sm={12} md={10} xl={10} xxl={10}> */}
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={z.check}
                                      disabled={z.disableCheckbox}
                                      onChange={(e) => setSectionCheckbox(e, key, key1, key2)}
                                    />
                                  }
                                  name={z.benefitName}
                                  label={z.benefitName}
                                />
                              </FormGroup>
                              {productJson.productInsurableItems[key].productCovers[key1]
                                .productBenefits[key2].showEdit === true ? (
                                <IconButton onClick={(e) => handleBenefitOpen(e, key, key1, key2)}>
                                  <Edit />
                                </IconButton>
                              ) : null}
                              {/* </Grid> */}
                            </Stack>
                          </Grid>

                          {/* <Grid item xs={12} sm={12} md={1} xl={1}>
                            {productJson.productInsurableItems[key].productCovers[key1]
                              .productBenefits[key2].showEdit === true ? (
                              <IconButton onClick={(e) => handleBenefitOpen(e, key, key1, key2)}>
                                <Edit />
                              </IconButton>
                            ) : null}
                          </Grid> */}
                        </>
                      ))}
                    </Grid>
                  </>
                ))}
              </>
            ))}
          </Grid>
          {open === true && (
            <Modal
              hideBackdrop
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <MDBox sx={style}>
                <Grid container justifyContent="end" alignItems="end">
                  <MDButton onClick={handleClose}>
                    <Remove />
                  </MDButton>
                </Grid>

                <Grid container spacing={2}>
                  <MDTypography variant="h4">Benefit Mapping</MDTypography>
                </Grid>
                <br />
                {/* for standard si */}
                <Grid container spacing={2}>
                  {showStandardSi === true && val.toString() === "1" && (
                    <>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          id="si"
                          options={siObj}
                          onChange={handleChange}
                          value={
                            si !== undefined ? { mID: si, mValue: si } : { mID: 0, mValue: "" }
                          }
                          getOptionLabel={(option) => option.mValue}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          // onChange={handleGroupDetails}
                          renderInput={(params) => <MDInput {...params} label="Si List" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {" "}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {" "}
                      </Grid>
                      {flagCalc1 === true && (
                        <>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Benefit Amount" value={si} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Currency" value={BenefitDetails.BenefitCurrencyType} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Criteria" value={BenefitDetails.BenefitCriteria} />
                          </Grid>
                          {dedType.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="DeductibleType"
                                options={dedType}
                                getOptionLabel={(option) => option.mValue}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                value={
                                  BenefitDetails.DeductibleType !== ""
                                    ? {
                                        mID: BenefitDetails.DeductibleType,
                                        mValue: BenefitDetails.DeductibleType,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                // onChange={handleGroupDetails}
                                onChange={handleBenefits}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Deduction Type" />
                                )}
                              />
                            </Grid>
                          ) : null}
                          {dedAmt.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="Deductible"
                                options={dedAmt}
                                //   value={BenefitDetails.Deductible}
                                value={
                                  BenefitDetails.Deductible !== ""
                                    ? {
                                        mID: BenefitDetails.Deductible,
                                        mValue: BenefitDetails.Deductible,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                onChange={handleBenefits}
                                getOptionLabel={(option) => option.mValue}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                // onChange={handleGroupDetails}
                                renderInput={(params) => <MDInput {...params} label="Deductible" />}
                              />
                            </Grid>
                          ) : null}

                          {benefitLevel.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="BenefitType"
                                options={benefitLevel}
                                getOptionLabel={(option) => option.mValue}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                value={
                                  BenefitDetails.BenefitType !== ""
                                    ? {
                                        mID: BenefitDetails.BenefitType,
                                        mValue: BenefitDetails.BenefitType,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                // onChange={handleGroupDetails}
                                //  value={BenefitDetails.BenefitType}
                                onChange={handleBenefits}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Benefit Type" />
                                )}
                              />
                            </Grid>
                          ) : null}

                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={BenefitDetails.IsOptional}
                                    onChange={(e) => handleBenefits(e)}
                                  />
                                }
                                name="IsOptional"
                                label="Is Optional"
                              />
                            </FormGroup>
                          </Grid>
                          {/* {premiumType.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="PremiumType"
                                options={premiumType}
                                getOptionLabel={(option) => option.mValue}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                value={
                                  BenefitDetails.PremiumType !== ""
                                    ? {
                                        mID: BenefitDetails.PremiumType,
                                        mValue: BenefitDetails.PremiumType,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                onChange={handleBenefits}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Premium Type" />
                                )}
                              />
                            </Grid>
                          ) : null} */}
                        </>
                      )}
                    </>
                  )}
                </Grid>

                {/* for cover si */}
                <Grid container spacing={2}>
                  {showCoverSi === true && val.toString() === "2" && (
                    <>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          id="limit"
                          options={limitObj}
                          onChange={(e, value) => handleChange1(e, value)}
                          value={
                            limit !== undefined
                              ? { mID: limit, mValue: limit }
                              : { mID: 0, mValue: "" }
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          getOptionLabel={(option) => option.mValue}
                          // onChange={handleGroupDetails}
                          renderInput={(params) => <MDInput {...params} label="Limit List" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {" "}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {" "}
                      </Grid>
                      {flagCalc2 === true && (
                        <>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Benefit Amount" value={lValue} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Currency" value={BenefitDetails.BenefitCurrencyType} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Criteria" value={BenefitDetails.BenefitCriteria} />
                          </Grid>
                          {dedType.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="DeductibleType"
                                options={dedType}
                                getOptionLabel={(option) => option.mValue}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                value={
                                  BenefitDetails.DeductibleType !== ""
                                    ? {
                                        mID: BenefitDetails.DeductibleType,
                                        mValue: BenefitDetails.DeductibleType,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                onChange={handleBenefits}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Deduction Type" />
                                )}
                              />
                            </Grid>
                          ) : null}

                          {dedAmt.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="Deductible"
                                options={dedAmt}
                                //   value={BenefitDetails.Deductible}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                value={
                                  BenefitDetails.Deductible !== ""
                                    ? {
                                        mID: BenefitDetails.Deductible,
                                        mValue: BenefitDetails.Deductible,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                getOptionLabel={(option) => option.mValue}
                                onChange={handleBenefits}
                                renderInput={(params) => <MDInput {...params} label="Deductible" />}
                              />
                            </Grid>
                          ) : null}

                          {benefitLevel.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="BenefitType"
                                options={benefitLevel}
                                getOptionLabel={(option) => option.mValue}
                                // onChange={handleGroupDetails}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                value={
                                  BenefitDetails.BenefitType !== ""
                                    ? {
                                        mID: BenefitDetails.BenefitType,
                                        mValue: BenefitDetails.BenefitType,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                //  value={BenefitDetails.BenefitType}
                                onChange={handleBenefits}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Benefit Type" />
                                )}
                              />
                            </Grid>
                          ) : null}

                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={BenefitDetails.IsOptional}
                                    onChange={(e) => handleBenefits(e)}
                                  />
                                }
                                name="IsOptional"
                                label="Is Optional"
                              />
                            </FormGroup>
                          </Grid>
                          {/* {premiumType.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="PremiumType"
                                options={premiumType}
                                getOptionLabel={(option) => option.mValue}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                // value={BenefitDetails.PremiumType}
                                value={
                                  BenefitDetails.PremiumType !== ""
                                    ? {
                                        mID: BenefitDetails.PremiumType,
                                        mValue: BenefitDetails.PremiumType,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                onChange={handleBenefits}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Premium Type" />
                                )}
                              />
                            </Grid>
                          ) : null} */}
                        </>
                      )}
                    </>
                  )}
                </Grid>

                {/* {for base si } */}
                <Grid container spacing={2}>
                  {showBaseSi === true && val.toString() === "3" && (
                    <>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          id="limit"
                          options={limitObj}
                          onChange={(e, value) => handleChange2(e, value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          getOptionLabel={(option) => option.mValue}
                          value={
                            limitB !== undefined
                              ? { mID: limitB, mValue: limitB }
                              : { mID: 0, mValue: "" }
                          }
                          // onChange={handleGroupDetails}
                          renderInput={(params) => <MDInput {...params} label="Limit List" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {" "}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {" "}
                      </Grid>
                      {flagCalc3 === true && (
                        <>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Benefit Amount" value={baseValue} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Currency" value={BenefitDetails.BenefitCurrencyType} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Criteria" value={BenefitDetails.BenefitCriteria} />
                          </Grid>
                          {dedType.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="DeductibleType"
                                options={dedType}
                                getOptionLabel={(option) => option.mValue}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                value={
                                  BenefitDetails.DeductibleType !== ""
                                    ? {
                                        mID: BenefitDetails.DeductibleType,
                                        mValue: BenefitDetails.DeductibleType,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                onChange={handleBenefits}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Deduction Type" />
                                )}
                              />
                            </Grid>
                          ) : null}

                          {dedAmt.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="Deductible"
                                options={dedAmt}
                                value={
                                  BenefitDetails.Deductible !== ""
                                    ? {
                                        mID: BenefitDetails.Deductible,
                                        mValue: BenefitDetails.Deductible,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                getOptionLabel={(option) => option.mValue}
                                onChange={handleBenefits}
                                renderInput={(params) => <MDInput {...params} label="Deductible" />}
                              />
                            </Grid>
                          ) : null}

                          {benefitLevel.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="BenefitType"
                                options={benefitLevel}
                                getOptionLabel={(option) => option.mValue}
                                // onChange={handleGroupDetails}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                value={
                                  BenefitDetails.BenefitType !== ""
                                    ? {
                                        mID: BenefitDetails.BenefitType,
                                        mValue: BenefitDetails.BenefitType,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                onChange={handleBenefits}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Benefit Type" />
                                )}
                              />
                            </Grid>
                          ) : null}

                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={BenefitDetails.IsOptional}
                                    onChange={(e) => handleBenefits(e)}
                                  />
                                }
                                name="IsOptional"
                                label="Is Optional"
                              />
                            </FormGroup>
                          </Grid>
                          {/* {premiumType.length > 0 ? (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <Autocomplete
                                id="PremiumType"
                                options={premiumType}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "4px!important",
                                  },
                                }}
                                getOptionLabel={(option) => option.mValue}
                                value={
                                  BenefitDetails.PremiumType !== ""
                                    ? {
                                        mID: BenefitDetails.PremiumType,
                                        mValue: BenefitDetails.PremiumType,
                                      }
                                    : { mID: 0, mValue: "" }
                                }
                                onChange={handleBenefits}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Premium Type" />
                                )}
                              />
                            </Grid>
                          ) : null} */}
                        </>
                      )}
                    </>
                  )}
                </Grid>
                <br />
                <Grid container justifyContent="center" alignItems="center">
                  <MDButton disabled={mapFlag} onClick={mapIt}>
                    Map
                  </MDButton>
                </Grid>
              </MDBox>
            </Modal>
          )}
          <Grid container justifyContent="center">
            <MDButton onClick={groupIt}>Group</MDButton>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  )
);
// function BenefitMapping({
//   productJson,
//   setSectionCheckbox,
//   open,
//   handleBenefitOpen,
//   handleClose,
//   benefitLevel,
//   dedType,
//   dedAmt,
//   // premiumType,
//   BenefitDetails,
//   val,
//   si,
//   limit,
//   siObj,
//   limitObj,
//   showStandardSi,
//   showBaseSi,
//   showCoverSi,
//   handleChange,
//   flagCalc1,
//   flagCalc2,
//   flagCalc3,
//   handleChange1,
//   handleChange2,
//   handleBenefits,
//   mapIt,
//   lValue,
//   groupIt,
//   baseValue,
//   limitB,
//   mapFlag,ref
// })
//  {
//   return (
//     <MDBox width="100%">
//       <Accordion defaultExpanded>
//         <AccordionSummary expandIcon={<ExpandMore />}>
//           <MDTypography variant="h6" ref={ref}>Benefit Mapping</MDTypography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Grid container>
//             {productJson.productInsurableItems.map((x, key) => (
//               <>
//                 <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
//                   <h5>InsurableItem:{x.insurableItem}</h5>
//                 </Grid>
//                 {x.productCovers.map((y, key1) => (
//                   <>
//                     <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
//                       <h4>Cover:{y.cover || y.coverDescription}</h4>
//                     </Grid>

//                     <Grid container spacing={2}>
//                       {y.productBenefits.map((z, key2) => (
//                         <>
//                           <Grid item xs={12} sm={12} md={6} xl={6} xxl={6}>
//                             <FormGroup>
//                               <FormControlLabel
//                                 control={
//                                   <Checkbox
//                                     checked={z.check}
//                                     disabled={z.disableCheckbox}
//                                     onChange={(e) => setSectionCheckbox(e, key, key1, key2)}
//                                   />
//                                 }
//                                 name={z.benefitName}
//                                 label={z.benefitName}
//                               />
//                             </FormGroup>
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={1} xl={1}>
//                             {productJson.productInsurableItems[key].productCovers[key1]
//                               .productBenefits[key2].showEdit === true ? (
//                               <IconButton onClick={(e) => handleBenefitOpen(e, key, key1, key2)}>
//                                 <Edit />
//                               </IconButton>
//                             ) : null}
//                           </Grid>
//                         </>
//                       ))}
//                     </Grid>
//                   </>
//                 ))}
//               </>
//             ))}
//           </Grid>
//           {open === true && (
//             <Modal
//               hideBackdrop
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="child-modal-title"
//               aria-describedby="child-modal-description"
//             >
//               <MDBox sx={style}>
//                 <Grid container justifyContent="end" alignItems="end">
//                   <MDButton onClick={handleClose}>
//                     <Remove />
//                   </MDButton>
//                 </Grid>

//                 <Grid container spacing={2}>
//                   <MDTypography variant="h4">Benefit Mapping</MDTypography>
//                 </Grid>
//                 <br />
//                 {/* for standard si */}
//                 <Grid container spacing={2}>
//                   {showStandardSi === true && val.toString() === "1" && (
//                     <>
//                       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                         <Autocomplete
//                           id="si"
//                           options={siObj}
//                           onChange={handleChange}
//                           value={
//                             si !== undefined ? { mID: si, mValue: si } : { mID: 0, mValue: "" }
//                           }
//                           getOptionLabel={(option) => option.mValue}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               padding: "4px!important",
//                             },
//                           }}
//                           // onChange={handleGroupDetails}
//                           renderInput={(params) => <MDInput {...params} label="Si List" />}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                         {" "}
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                         {" "}
//                       </Grid>
//                       {flagCalc1 === true && (
//                         <>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <MDInput label="Benefit Amount" value={si} />
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <MDInput label="Currency" value={BenefitDetails.BenefitCurrencyType} />
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <MDInput label="Criteria" value={BenefitDetails.BenefitCriteria} />
//                           </Grid>
//                           {dedType.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="DeductibleType"
//                                 options={dedType}
//                                 getOptionLabel={(option) => option.mValue}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 value={
//                                   BenefitDetails.DeductibleType !== ""
//                                     ? {
//                                         mID: BenefitDetails.DeductibleType,
//                                         mValue: BenefitDetails.DeductibleType,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 // onChange={handleGroupDetails}
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => (
//                                   <MDInput {...params} label="Deduction Type" />
//                                 )}
//                               />
//                             </Grid>
//                           ) : null}
//                           {dedAmt.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="Deductible"
//                                 options={dedAmt}
//                                 //   value={BenefitDetails.Deductible}
//                                 value={
//                                   BenefitDetails.Deductible !== ""
//                                     ? {
//                                         mID: BenefitDetails.Deductible,
//                                         mValue: BenefitDetails.Deductible,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 onChange={handleBenefits}
//                                 getOptionLabel={(option) => option.mValue}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 // onChange={handleGroupDetails}
//                                 renderInput={(params) => <MDInput {...params} label="Deductible" />}
//                               />
//                             </Grid>
//                           ) : null}

//                           {benefitLevel.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="BenefitType"
//                                 options={benefitLevel}
//                                 getOptionLabel={(option) => option.mValue}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 value={
//                                   BenefitDetails.BenefitType !== ""
//                                     ? {
//                                         mID: BenefitDetails.BenefitType,
//                                         mValue: BenefitDetails.BenefitType,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 // onChange={handleGroupDetails}
//                                 //  value={BenefitDetails.BenefitType}
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => (
//                                   <MDInput {...params} label="Benefit Type" />
//                                 )}
//                               />
//                             </Grid>
//                           ) : null}

//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <FormGroup>
//                               <FormControlLabel
//                                 control={
//                                   <Checkbox
//                                     checked={BenefitDetails.IsOptional}
//                                     onChange={(e) => handleBenefits(e)}
//                                   />
//                                 }
//                                 name="IsOptional"
//                                 label="Is Optional"
//                               />
//                             </FormGroup>
//                           </Grid>
//                           {/* {premiumType.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="PremiumType"
//                                 options={premiumType}
//                                 getOptionLabel={(option) => option.mValue}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 value={
//                                   BenefitDetails.PremiumType !== ""
//                                     ? {
//                                         mID: BenefitDetails.PremiumType,
//                                         mValue: BenefitDetails.PremiumType,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => (
//                                   <MDInput {...params} label="Premium Type" />
//                                 )}
//                               />
//                             </Grid>
//                           ) : null} */}
//                         </>
//                       )}
//                     </>
//                   )}
//                 </Grid>

//                 {/* for cover si */}
//                 <Grid container spacing={2}>
//                   {showCoverSi === true && val.toString() === "2" && (
//                     <>
//                       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                         <Autocomplete
//                           id="limit"
//                           options={limitObj}
//                           onChange={(e, value) => handleChange1(e, value)}
//                           value={
//                             limit !== undefined
//                               ? { mID: limit, mValue: limit }
//                               : { mID: 0, mValue: "" }
//                           }
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               padding: "4px!important",
//                             },
//                           }}
//                           getOptionLabel={(option) => option.mValue}
//                           // onChange={handleGroupDetails}
//                           renderInput={(params) => <MDInput {...params} label="Limit List" />}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                         {" "}
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                         {" "}
//                       </Grid>
//                       {flagCalc2 === true && (
//                         <>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <MDInput label="Benefit Amount" value={lValue} />
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <MDInput label="Currency" value={BenefitDetails.BenefitCurrencyType} />
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <MDInput label="Criteria" value={BenefitDetails.BenefitCriteria} />
//                           </Grid>
//                           {dedType.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="DeductibleType"
//                                 options={dedType}
//                                 getOptionLabel={(option) => option.mValue}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 value={
//                                   BenefitDetails.DeductibleType !== ""
//                                     ? {
//                                         mID: BenefitDetails.DeductibleType,
//                                         mValue: BenefitDetails.DeductibleType,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => (
//                                   <MDInput {...params} label="Deduction Type" />
//                                 )}
//                               />
//                             </Grid>
//                           ) : null}

//                           {dedAmt.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="Deductible"
//                                 options={dedAmt}
//                                 //   value={BenefitDetails.Deductible}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 value={
//                                   BenefitDetails.Deductible !== ""
//                                     ? {
//                                         mID: BenefitDetails.Deductible,
//                                         mValue: BenefitDetails.Deductible,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 getOptionLabel={(option) => option.mValue}
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => <MDInput {...params} label="Deductible" />}
//                               />
//                             </Grid>
//                           ) : null}

//                           {benefitLevel.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="BenefitType"
//                                 options={benefitLevel}
//                                 getOptionLabel={(option) => option.mValue}
//                                 // onChange={handleGroupDetails}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 value={
//                                   BenefitDetails.BenefitType !== ""
//                                     ? {
//                                         mID: BenefitDetails.BenefitType,
//                                         mValue: BenefitDetails.BenefitType,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 //  value={BenefitDetails.BenefitType}
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => (
//                                   <MDInput {...params} label="Benefit Type" />
//                                 )}
//                               />
//                             </Grid>
//                           ) : null}

//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <FormGroup>
//                               <FormControlLabel
//                                 control={
//                                   <Checkbox
//                                     checked={BenefitDetails.IsOptional}
//                                     onChange={(e) => handleBenefits(e)}
//                                   />
//                                 }
//                                 name="IsOptional"
//                                 label="Is Optional"
//                               />
//                             </FormGroup>
//                           </Grid>
//                           {/* {premiumType.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="PremiumType"
//                                 options={premiumType}
//                                 getOptionLabel={(option) => option.mValue}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 // value={BenefitDetails.PremiumType}
//                                 value={
//                                   BenefitDetails.PremiumType !== ""
//                                     ? {
//                                         mID: BenefitDetails.PremiumType,
//                                         mValue: BenefitDetails.PremiumType,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => (
//                                   <MDInput {...params} label="Premium Type" />
//                                 )}
//                               />
//                             </Grid>
//                           ) : null} */}
//                         </>
//                       )}
//                     </>
//                   )}
//                 </Grid>

//                 {/* {for base si } */}
//                 <Grid container spacing={2}>
//                   {showBaseSi === true && val.toString() === "3" && (
//                     <>
//                       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                         <Autocomplete
//                           id="limit"
//                           options={limitObj}
//                           onChange={(e, value) => handleChange2(e, value)}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               padding: "4px!important",
//                             },
//                           }}
//                           getOptionLabel={(option) => option.mValue}
//                           value={
//                             limitB !== undefined
//                               ? { mID: limitB, mValue: limitB }
//                               : { mID: 0, mValue: "" }
//                           }
//                           // onChange={handleGroupDetails}
//                           renderInput={(params) => <MDInput {...params} label="Limit List" />}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                         {" "}
//                       </Grid>
//                       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                         {" "}
//                       </Grid>
//                       {flagCalc3 === true && (
//                         <>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <MDInput label="Benefit Amount" value={baseValue} />
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <MDInput label="Currency" value={BenefitDetails.BenefitCurrencyType} />
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <MDInput label="Criteria" value={BenefitDetails.BenefitCriteria} />
//                           </Grid>
//                           {dedType.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="DeductibleType"
//                                 options={dedType}
//                                 getOptionLabel={(option) => option.mValue}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 value={
//                                   BenefitDetails.DeductibleType !== ""
//                                     ? {
//                                         mID: BenefitDetails.DeductibleType,
//                                         mValue: BenefitDetails.DeductibleType,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => (
//                                   <MDInput {...params} label="Deduction Type" />
//                                 )}
//                               />
//                             </Grid>
//                           ) : null}

//                           {dedAmt.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="Deductible"
//                                 options={dedAmt}
//                                 value={
//                                   BenefitDetails.Deductible !== ""
//                                     ? {
//                                         mID: BenefitDetails.Deductible,
//                                         mValue: BenefitDetails.Deductible,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 getOptionLabel={(option) => option.mValue}
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => <MDInput {...params} label="Deductible" />}
//                               />
//                             </Grid>
//                           ) : null}

//                           {benefitLevel.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="BenefitType"
//                                 options={benefitLevel}
//                                 getOptionLabel={(option) => option.mValue}
//                                 // onChange={handleGroupDetails}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 value={
//                                   BenefitDetails.BenefitType !== ""
//                                     ? {
//                                         mID: BenefitDetails.BenefitType,
//                                         mValue: BenefitDetails.BenefitType,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => (
//                                   <MDInput {...params} label="Benefit Type" />
//                                 )}
//                               />
//                             </Grid>
//                           ) : null}

//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <FormGroup>
//                               <FormControlLabel
//                                 control={
//                                   <Checkbox
//                                     checked={BenefitDetails.IsOptional}
//                                     onChange={(e) => handleBenefits(e)}
//                                   />
//                                 }
//                                 name="IsOptional"
//                                 label="Is Optional"
//                               />
//                             </FormGroup>
//                           </Grid>
//                           {/* {premiumType.length > 0 ? (
//                             <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                               <Autocomplete
//                                 id="PremiumType"
//                                 options={premiumType}
//                                 sx={{
//                                   "& .MuiOutlinedInput-root": {
//                                     padding: "4px!important",
//                                   },
//                                 }}
//                                 getOptionLabel={(option) => option.mValue}
//                                 value={
//                                   BenefitDetails.PremiumType !== ""
//                                     ? {
//                                         mID: BenefitDetails.PremiumType,
//                                         mValue: BenefitDetails.PremiumType,
//                                       }
//                                     : { mID: 0, mValue: "" }
//                                 }
//                                 onChange={handleBenefits}
//                                 renderInput={(params) => (
//                                   <MDInput {...params} label="Premium Type" />
//                                 )}
//                               />
//                             </Grid>
//                           ) : null} */}
//                         </>
//                       )}
//                     </>
//                   )}
//                 </Grid>
//                 <br />
//                 <Grid container justifyContent="center" alignItems="center">
//                   <MDButton disabled={mapFlag} onClick={mapIt}>
//                     Map
//                   </MDButton>
//                 </Grid>
//               </MDBox>
//             </Modal>
//           )}
//           <Grid container justifyContent="center">
//             <MDButton onClick={groupIt}>Group</MDButton>
//           </Grid>
//         </AccordionDetails>
//       </Accordion>
//     </MDBox>
//   );
// }

export default BenefitMapping;
