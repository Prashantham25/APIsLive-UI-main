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
} from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  ExpandMore,
  // Delete, Visibility,
  Edit,
  Remove,
} from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

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
function BenefitMapping({
  productJson,
  setSectionCheckbox,
  open,
  handleBenefitOpen,
  handleClose,
  benefitDetailsGrid,
  handleInput,
  // benefitLevel,
  // dedType,
  // dedAmt,
  // // premiumType,
  // BenefitDetails,
  // val,
  // si,
  // limit,
  // siObj,
  // limitObj,
  // showStandardSi,
  // showBaseSi,
  // showCoverSi,
  // handleChange,
  // flagCalc1,
  // flagCalc2,
  // flagCalc3,
  // handleChange1,
  // handleChange2,
  // handleBenefits,
  mapIt,
  // lValue,
  groupIt,
  // baseValue,
  // limitB,
  // mapFlag,
}) {
  const columns = [
    { field: "sno", headerName: "S.No", width: 50 },

    {
      field: "type",
      headerName: "Type",
      width: 200,
      renderCell: (param) => (
        //   <Autocomplete
        //     id="type"
        //     fullWidth
        //     options={mastersObj.Type}
        //     getOptionLabel={(option) => option.mValue}
        //     sx={{
        //       "& .MuiOutlinedInput-root": {
        //         padding: "4px!important",
        //       },
        //     }}
        //     value={
        //       param.row.type !== ""
        //         ? {
        //             mID: mastersObj.Type.filter((x) => x.mValue === param.row.type)[0].mID,
        //             mValue: param.row.type,
        //           }
        //         : { mID: 0, mValue: "" }
        //     }
        //     onChange={(e, value) => handleInput(e, value, param.row.sno)}
        //     renderInput={(para) => <MDInput {...para} label="Type" />}
        //   />
        // ),
        <MDInput
          name="type"
          label="Type"
          value={param.row.type}
          disabled
          // onChange={(e) => handleInput(e, null, param.row.sno)}
        />
      ),
    },

    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (param) => (
        <MDInput
          name="name"
          label="Name"
          value={param.row.name}
          disabled
          //  onChange={(e) => handleInput(e, null, param.row.sno)}
        />
      ),
    },

    {
      field: "valueList",
      headerName: "Value List",
      width: 200,
      renderCell: (param) => (
        // <MDInput
        //   name="value"
        //   label="Value"
        //   value={param.row.value.map((x) => x)}
        //   // onChange={(e) => handleInput(e, null, param.row.sno)}
        // />

        <Autocomplete
          id="value"
          fullWidth
          options={param.row.valueList}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          value={param.row.value !== "" ? param.row.value : ""}
          onChange={(e, value) => handleInput(e, value, param.row.sno)}
          renderInput={(para) => <MDInput {...para} label="Value" />}
        />
      ),
    },

    {
      field: "min",
      headerName: "Min",
      width: 200,
      // editable: true,
      renderCell: (param) => (
        <MDInput
          name="min"
          label="Min"
          value={param.row.min}
          disabled
          // onChange={(e) => handleInput(e, null, param.row.sno)}
        />
      ),
    },
    {
      field: "max",
      headerName: "Max",
      width: 200,
      // editable: true,
      renderCell: (param) => (
        <MDInput
          name="max"
          label="Max"
          value={param.row.max}
          disabled
          // onChange={(e) => handleInput(e, null, param.row.sno)}
        />
      ),
    },

    {
      field: "plusMinus",
      headerName: "PlusMinus",
      width: 200,
      renderCell: (param) => (
        // <Autocomplete
        //   id="plusMinus"
        //   fullWidth
        //   sx={{
        //     "& .MuiOutlinedInput-root": {
        //       padding: "4px!important",
        //     },
        //   }}
        //   options={mastersObj.PlusMinus}
        //   onChange={(e, value) => handleInput(e, value, param.row.sno)}
        //   value={
        //     param.row.plusMinus !== ""
        //       ? {
        //           mID: mastersObj.PlusMinus.filter((x) => x.mValue === param.row.plusMinus)[0].mID,
        //           mValue: param.row.plusMinus,
        //         }
        //       : { mID: 0, mValue: "" }
        //   }
        //   getOptionLabel={(option) => option.mValue}
        //   renderInput={(para) => <MDInput {...para} label="PlusMinus" />}
        // />
        <MDInput label="PlusMinus" value={param.row.plusMinus} name="plusMinus" disabled />
      ),
    },
  ];
  // console.log("shreya", val, showStandardSi, showCoverSi, showBaseSi);
  return (
    <MDBox width="100%">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <MDTypography variant="h6">Benefit Mapping</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {productJson.productInsurableItems.map((x, key) => (
              <>
                <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                  <h5>InsurableItem:{x.insurableItem}</h5>
                </Grid>
                {x.covers.map((y, key1) => (
                  <>
                    <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                      <h4>Cover:{y.coverName}</h4>
                    </Grid>

                    <Grid container spacing={2}>
                      {y.benefits.map((z, key2) => (
                        <>
                          <Grid item xs={12} sm={12} md={6} xl={6} xxl={6}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={z.check}
                                    // disabled={z.disableCheckbox}
                                    onChange={(e) => setSectionCheckbox(e, key, key1, key2)}
                                  />
                                }
                                name={z.benefitName}
                                label={z.benefitName}
                              />
                            </FormGroup>
                          </Grid>
                          <Grid item xs={12} sm={12} md={1} xl={1}>
                            {productJson.productInsurableItems[key].covers[key1].benefits[key2]
                              .showEdit === true ? (
                              <IconButton onClick={(e) => handleBenefitOpen(e, key, key1, key2)}>
                                <Edit />
                              </IconButton>
                            ) : null}
                          </Grid>
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
                <br />
                <MDBox sx={{ width: "100%", "overflow-y": "auto" }}>
                  <DataGrid
                    autoHeight
                    // sortModel={[
                    //   {
                    //     field: 'sno',
                    //     sort: 'asc',
                    //   },
                    // ]}
                    rows={
                      benefitDetailsGrid.length > 0
                        ? benefitDetailsGrid.sort((a, b) => a.sno - b.sno)
                        : []
                    }
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    //  disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(option) => option.sno}
                    //  editField="inEdit"
                    // editMode=
                  />
                </MDBox>
                <br />

                <Grid container display="flex" justifyContent="center" alignItems="center">
                  <MDButton onClick={mapIt}>Map</MDButton>
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
  );
}

export default BenefitMapping;
