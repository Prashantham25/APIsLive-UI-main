import React, { useState } from "react";

import {
  Grid,
  Autocomplete,
  Accordion,
  AccordionSummary,
  IconButton,
  AccordionDetails,
  Modal,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import ExpandMore from "@mui/icons-material/ExpandMore";
import { Delete, Edit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDButton from "../../../../../components/MDButton";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import { useDataController, setProductJson } from "../../../../BrokerPortal/context/index";
import { handleDelete } from "./data/Handlers";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%,6%)",
  width: 800,
  height: 300,
  bgcolor: "background.paper",
  "overflow-y": "auto",
  "max-height": "100%",
  padding: "10px",
  // "border-radius": "10px",
};
function GenericViewBenefits({ keyi, keyc, keyb, coverList, mastersObj, handleModal, ruleMaster }) {
  const [controller, dispatch] = useDataController();
  const [masterBenefitFlag, setMasterBenefitFlag] = useState(false);

  const [expanded, setExpanded] = useState(-1);
  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : -1);
  };
  const [open, setOpen] = React.useState(false);

  const { ProductJson, viewFlag } = controller;
  const BenefitType = [
    { mID: 502, mValue: "Benefit" },
    { mID: 503, mValue: "Indemnity" },
  ];
  const BasedOn = [
    { mID: 1, mValue: "Standard SI" },
    { mID: 2, mValue: "Cover SI" },
    { mID: 3, mValue: "Base SI" },
  ];
  const handleModalForBenefitMaster = () => {
    setMasterBenefitFlag(true);
  };
  const handleClose = () => {
    setMasterBenefitFlag(false);
  };
  const [id, setId] = useState();
  const [type, setType] = useState("");

  const handleClickOpen = (idd, data) => {
    setOpen(true);
    setId(idd);
    setType(data);
  };

  const handleClose1 = () => {
    setOpen(false);
  };
  const columns1 = [
    { field: "sno", headerName: "S.No", width: 50 },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      renderCell: (param) => (
        <Autocomplete
          id="type"
          fullWidth
          options={mastersObj.Type}
          getOptionLabel={(option) => option.mValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          value={
            param.row.type !== ""
              ? {
                  mID:
                    mastersObj.Type.length > 0 &&
                    mastersObj.Type.filter((x) => x.mValue === param.row.type)[0].mID,
                  mValue: param.row.type,
                }
              : { mID: 0, mValue: "" }
          }
          renderInput={(para) => <MDInput {...para} label="Type" disabled />}
        />
      ),
    },
    {
      field: "masterName",
      headerName: "Master Name",
      width: 200,
      renderCell: (param) => (
        <Autocomplete
          id="masterName"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          options={
            ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].benefitMaster
              .length > 0 &&
            ProductJson.productInsurableItems[keyi].covers[keyc].benefits[
              keyb
            ].benefitMaster.filter((x) => x.type === "Master")[0].value.length > 0
              ? ProductJson.productInsurableItems[keyi].covers[keyc].benefits[
                  keyb
                ].benefitMaster.filter((x) => x.type === "Master")[0].value
              : []
          }
          value={param.row.masterName !== "" ? param.row.masterName : ""}
          renderInput={(para) => <MDInput {...para} label="MasterName" disabled />}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (param) => <MDInput name="name" label="Name" value={param.row.name} disabled />,
    },

    {
      field: "isFilter",
      headerName: "IsFilter",
      width: 100,
      renderCell: (param) => (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={param.row.isFilter} />}
            label=""
            name="isFilter"
            disabled
          />
        </FormGroup>
      ),
    },
    {
      field: "filterCondition",
      headerName: "Filter Condition",
      width: 200,
      // editable: true,
      renderCell: (param) => (
        <IconButton onClick={() => handleClickOpen(param.row.sno, "filterCondition")}>
          <FilterAltIcon color="primary" />
        </IconButton>
      ),
    },
    {
      field: "value",
      headerName: "Value",
      width: 200,
      renderCell: (param) => (
        <MDInput name="value" label="Value" value={param.row.value.map((x) => x)} disabled />
      ),
    },
    {
      field: "valueType",
      headerName: "ValueType",
      width: 200,
      renderCell: (param) => (
        <Autocomplete
          id="valueType"
          fullWidth
          options={mastersObj.ValueType}
          getOptionLabel={(option) => option.mValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          value={
            param.row.valueType !== ""
              ? {
                  mID:
                    mastersObj.ValueType.length > 0 &&
                    mastersObj.ValueType.filter((x) => x.mValue === param.row.valueType)[0].mID,
                  mValue: param.row.valueType,
                }
              : { mID: 0, mValue: "" }
          }
          renderInput={(para) => <MDInput {...para} label="ValueType" disabled />}
        />
      ),
    },
    {
      field: "min",
      headerName: "Min",
      width: 200,
      renderCell: (param) => <MDInput name="min" label="Min" value={param.row.min} disabled />,
    },
    {
      field: "max",
      headerName: "Max",
      width: 200,
      renderCell: (param) => <MDInput name="max" label="Max" value={param.row.max} disabled />,
    },

    {
      field: "rule",
      headerName: "Rule",
      width: 200,
      //  renderCell: (param) => <MDInput name="rule" label="Rule" value={param.row.rule} disabled />,
      renderCell: (param) => (
        // <IconButton onClick={() => handleClickOpen(param.row.sno, "rule")}>
        //   <ArrowForwardIcon color="primary" />
        // </IconButton>
        <Autocomplete
          id="rule"
          fullWidth
          options={ruleMaster}
          getOptionLabel={(option) => option.mValue}
          value={
            param.row.rule > 0
              ? {
                  mID: param.row.mID,
                  mValue: ruleMaster.filter((x) => x.mID === param.row.rule)[0].mValue,
                }
              : { mID: 0, mValue: "" }
          }
          //  onChange={(e, value) => handleInput(e, value, param.row.sno)}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          renderInput={(para) => <MDInput {...para} label="Rules" disabled />}
        />
      ),
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 200,
      renderCell: (param) => <MDInput name="rate" label="Rate" value={param.row.rate} disabled />,
    },
    {
      field: "plusMinus",
      headerName: "PlusMinus",
      width: 200,
      renderCell: (param) => (
        <Autocomplete
          id="plusMinus"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          options={mastersObj.PlusMinus}
          value={
            param.row.plusMinus !== ""
              ? {
                  mID:
                    mastersObj.PlusMinus.length > 0 &&
                    mastersObj.PlusMinus.filter((x) => x.mValue === param.row.plusMinus)[0].mID,
                  mValue: param.row.plusMinus,
                }
              : { mID: 0, mValue: "" }
          }
          getOptionLabel={(option) => option.mValue}
          renderInput={(para) => <MDInput {...para} label="PlusMinus" disabled />}
        />
      ),
    },
  ];
  return (
    <MDBox sx={{ width: "100%" }}>
      <Accordion
        expanded={expanded === keyb}
        onChange={handleAccordion(keyb)}
        // defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
              <MDTypography variant="h6">
                Benefit:
                {ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].benefitName}
              </MDTypography>
            </Grid>

            {viewFlag === false ? (
              <>
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                  <IconButton onClick={() => handleModal(keyi, keyc, keyb)}>
                    <Edit />
                  </IconButton>
                </Grid>
                {/* {viewFlag === false ? ( */}
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                  <IconButton
                    onClick={() =>
                      handleDelete(ProductJson, setProductJson, dispatch, keyi, keyc, keyb)
                    }
                  >
                    <Delete />
                  </IconButton>
                </Grid>
                {/* ) : null} */}
              </>
            ) : null}
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="benefitName"
                label="Benefit Name"
                value={
                  ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].benefitName
                }
                //  onChange={(e) => handleCustomInput(e, "benefits")}
                disabled
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="benefitType"
                options={BenefitType}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={
                  ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].benefitType >
                  0
                    ? {
                        mID: ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                          .benefitType,
                        mValue: BenefitType.filter(
                          (x) =>
                            x.mID ===
                            ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                              .benefitType
                        )[0].mValue,
                      }
                    : { mID: 0, mValue: "" }
                }
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="Benefit Type" required disabled />
                )}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Maximum No of Claims"
                name="maxNoOfClaims"
                disabled
                value={
                  ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].maxNoOfClaims
                }
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="basedOn"
                options={BasedOn}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={
                  ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].basedOn > 0
                    ? {
                        mID: ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                          .basedOn,
                        mValue: BasedOn.filter(
                          (x) =>
                            x.mID ===
                            ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                              .basedOn
                        )[0].mValue,
                      }
                    : { mID: 0, mValue: "" }
                }
                renderInput={(param) => <MDInput {...param} label="Based On" disabled />}
              />
            </Grid>

            {ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].basedOn === 2 ? (
              <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  id="parentCover"
                  options={coverList}
                  getOptionLabel={(option) => option.mValue}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  value={
                    ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                      .parentCover > 0
                      ? {
                          mID: ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                            .parentCover,
                          mValue: ProductJson.productInsurableItems[keyi].coversData[0].filter(
                            (x) =>
                              x.mID ===
                              ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                                .parentCover
                          )[0].mValue,
                        }
                      : { mID: 0, mValue: "" }
                  }
                  renderInput={(param) => <MDInput {...param} label="Parent Cover" disabled />}
                />
              </Grid>
            ) : null}

            {/* {ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].basedOn === 2 ||
            ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].basedOn === 3 ? (
              <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  name="percentageLimit"
                  label="Percentage Limit"
                  value={
                    ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                      .percentageLimit
                  }
                  disabled
                />
              </Grid>
            ) : null} */}

            {ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].basedOn === 2 ||
            ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].basedOn === 3 ? (
              <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  id="coverSiType"
                  options={[
                    { mID: "Limit", mValue: "Limit" },
                    { mID: "Percentage", mValue: "Percentage" },
                    { mID: "LimitWithPercentage", mValue: "LimitWithPercentage" },
                  ]}
                  getOptionLabel={(option) => option.mValue}
                  // onChange={(e, value) =>
                  //   handleAutoComplete(e, value, "benefitss", "", benefitss, setBenefits)
                  // }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  value={
                    ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                      .coverSiType !== ""
                      ? {
                          mID: ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                            .coverSiType,
                          mValue:
                            ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                              .coverSiType,
                        }
                      : { mID: "", mValue: "" }
                  }
                  renderInput={(param) => <MDInput {...param} label="Cover SI Type" disabled />}
                />
              </Grid>
            ) : null}

            {ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].basedOn === 2 ||
            ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].basedOn === 3 ? (
              <>
                {ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].coverSiType ===
                  "Limit" ||
                ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].coverSiType ===
                  "LimitWithPercentage" ? (
                  <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      name="limit"
                      label="Limit"
                      value={
                        ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].limit
                      }
                      disabled
                      // onChange={(e) => handleCustomInput(e, "benefitss", "", benefitss, setBenefits)}
                    />
                  </Grid>
                ) : null}

                {ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].coverSiType ===
                  "Percentage" ||
                ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].coverSiType ===
                  "LimitWithPercentage" ? (
                  <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      name="percentage"
                      label="Percentage"
                      value={
                        ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                          .percentage
                      }
                      disabled
                      // onChange={(e) => handleCustomInput(e, "benefitss", "", benefitss, setBenefits)}
                    />
                  </Grid>
                ) : null}
              </>
            ) : null}

            {/* </>
            ) : null} */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton variant="contained" onClick={() => handleModalForBenefitMaster()}>
                View Benefit Master
              </MDButton>
            </Grid>

            <Modal open={masterBenefitFlag} onClose={handleClose}>
              <MDBox sx={style}>
                <Grid container justifyContent="right" alignItems="right">
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MDTypography variant="h6"> Benefit Masters</MDTypography>
                  </Grid>

                  {ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].benefitMaster
                    .length > 0
                    ? ProductJson.productInsurableItems[keyi].covers[keyc].benefits[
                        keyb
                      ].benefitMaster.map((y) => (
                        <>
                          <Grid item xs={12} sm={12} md={4} xl={4} xxl={4} lg={4}>
                            <MDTypography variant="h6">{y.type}</MDTypography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8} xl={8} xxl={8} lg={8}>
                            {y.value.map((z) => (
                              <Chip label={z} />
                            ))}
                          </Grid>
                        </>
                      ))
                    : null}
                </Grid>
              </MDBox>
            </Modal>
          </Grid>
          <br />

          <MDTypography variant="h6" sx={{ "margin-top": "8px" }}>
            Benefit Details
          </MDTypography>

          {/* <br /> */}
          {/* {benefitss.benefitDetails.length > 0 ? ( */}
          <MDBox sx={{ width: "100%", "overflow-y": "auto" }}>
            <DataGrid
              autoHeight
              rows={
                ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].benefitDetails
                  .length > 0
                  ? ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                      .benefitDetails
                  : []
              }
              // rows=[]
              columns={columns1}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              components={{ Toolbar: GridToolbar }}
              getRowId={(option) => option.sno}
            />
          </MDBox>
        </AccordionDetails>
      </Accordion>

      {id !== undefined && id !== null ? (
        <Dialog
          open={open}
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">View Condition</DialogTitle>
          <DialogContent>
            {type === "rule" ? (
              <MDInput
                name="rule"
                label="Rule Condition"
                value={
                  ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                    .benefitDetails[id].rule
                }
                // disabled={
                //   !ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb].benefitDetails[
                //     id
                //   ].isFilter
                // }
                multiline
                sx={{ width: "450px" }}
              />
            ) : (
              <MDInput
                name="filterCondition"
                label="Filter Condition"
                value={
                  ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                    .benefitDetails[id].filterCondition
                }
                disabled={
                  !ProductJson.productInsurableItems[keyi].covers[keyc].benefits[keyb]
                    .benefitDetails[id].isFilter
                }
                multiline
                sx={{ width: "450px" }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <MDButton onClick={handleClose1}>Add</MDButton>
          </DialogActions>
        </Dialog>
      ) : null}
    </MDBox>
  );
}

export default GenericViewBenefits;
