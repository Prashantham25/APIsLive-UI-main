import React, { useState } from "react";
import {
  Grid,
  Autocomplete,
  Stack,
  IconButton,
  Modal,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Add from "@mui/icons-material/AddCircle";
import { Delete, Edit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";

// import { useDataController } from "../../../../BrokerPortal/context/index";
import {
  handleCustomInput,
  handleAutoComplete,
  // handleDelete,
} from "./data/Handlers";
// import GenericViewBenefits from "./GenericViewBenefits";
const style = {
  position: "absolute",
  top: "5%",
  left: "70%",
  transform: "translate(-80%,6%)",
  width: 870,
  height: 600,
  bgcolor: "background.paper",
  "overflow-y": "auto",
  "max-height": "100%",
  padding: "10px",
  // "border-radius": "10px",
};

function GenericBenefit({
  benefitss,
  mastersObj,
  setBenefits,
  addInGrid,
  handleInput,
  addBenefit,
  coverList,
  updateBenefit,
  flag,
  addMastersForBenefit,
  handleChange,
  masterValue,
  obj,
  addAnotherMaster,
  handleDeleteMasterValues,
  handleMasterEdit,
  ruleMaster,
  // open,,handleCriteriaModal,addAnother,
  // addMasterData,
}) {
  console.log("mastersObj", mastersObj);
  const [masterBenefitFlag, setMasterBenefitFlag] = useState(false);
  const [open, setOpen] = React.useState(false);

  const benefitssL = benefitss;
  const BenefitType = [
    { mID: 502, mValue: "Benefit" },
    { mID: 503, mValue: "Indemnity" },
  ];
  const BasedOn = [
    { mID: 1, mValue: "Standard SI" },
    { mID: 2, mValue: "Cover SI" },
    { mID: 3, mValue: "Base SI" },
  ];

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
      field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: (param) => {
        const deleteBenefitDetails = (idd) => {
          const newArr = benefitss.benefitDetails.filter((x) => (x.sno !== idd ? x : null));
          newArr.forEach((x, i) => {
            newArr[i].sno = i;
          });
          benefitssL.benefitDetails = [...newArr];
          setBenefits((prev) => ({ ...prev, ...benefitssL }));
        };
        return (
          <IconButton onClick={() => deleteBenefitDetails(param.row.sno)}>
            <Delete />
          </IconButton>
        );
      },
    },
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
                  mID: mastersObj.Type.filter((x) => x.mValue === param.row.type)[0].mID,
                  mValue: param.row.type,
                }
              : { mID: 0, mValue: "" }
          }
          onChange={(e, value) => handleInput(e, value, param.row.sno)}
          renderInput={(para) => <MDInput {...para} label="Type" />}
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
            benefitss.benefitMaster.length > 0 &&
            benefitss.benefitMaster.filter((x) => x.type === "Master")[0].value.length > 0
              ? benefitss.benefitMaster.filter((x) => x.type === "Master")[0].value
              : []
          }
          // options={["Fixed"]}
          onChange={(e, value) => handleInput(e, value, param.row.sno, "MasterName")}
          value={param.row.masterName !== "" ? param.row.masterName : ""}
          renderInput={(para) => (
            <MDInput {...para} label="MasterName" disabled={param.row.type !== "Master"} />
          )}
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
          onChange={(e) => handleInput(e, null, param.row.sno)}
        />
      ),
    },

    {
      field: "isFilter",
      headerName: "IsFilter",
      width: 100,
      renderCell: (param) => (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={param.row.isFilter}
                onChange={(e) => handleInput(e, "checked", param.row.sno)}
              />
            }
            label=""
            name="isFilter"
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
      field: "val",
      headerName: "Enter Value",
      width: 200,
      // editable: true,
      renderCell: (param) => (
        <MDInput
          name="val"
          label="Enter Value"
          icon="Add"
          onIconClick={(e) => handleInput(e, "val", param.row.sno)}
          value={param.row.val}
          onChange={(e) => handleInput(e, null, param.row.sno)}
          // disabled={param.row.isList}
        />
      ),
    },
    {
      field: "value",
      headerName: "Value List",
      width: 200,
      renderCell: (param) => (
        <MDInput
          name="value"
          label="Value"
          value={param.row.value.map((x) => x)}
          // onChange={(e) => handleInput(e, null, param.row.sno)}
        />
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
          value={
            param.row.valueType !== ""
              ? {
                  mID: mastersObj.ValueType.filter((x) => x.mValue === param.row.valueType)[0].mID,
                  mValue: param.row.valueType,
                }
              : { mID: 0, mValue: "" }
          }
          onChange={(e, value) => handleInput(e, value, param.row.sno)}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          renderInput={(para) => <MDInput {...para} label="ValueType" />}
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
          onChange={(e) => handleInput(e, null, param.row.sno)}
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
          onChange={(e) => handleInput(e, null, param.row.sno)}
        />
      ),
    },

    // {
    //   field: "rule",
    //   headerName: "Rule",
    //   width: 200,
    //   // editable: true,
    //   renderCell: (param) => (
    //     <MDInput
    //       name="rule"
    //       label="Rule"
    //       value={param.row.rule}
    //       onChange={(e) => handleInput(e, null, param.row.sno)}
    //     />
    //   ),
    // },
    {
      field: "rule",
      headerName: "Rule",
      width: 200,
      // editable: true,
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
          onChange={(e, value) => handleInput(e, value, param.row.sno, value.mID)}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          renderInput={(para) => <MDInput {...para} label="Rules" />}
        />
      ),
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 200,
      // editable: true,
      renderCell: (param) => (
        <MDInput
          name="rate"
          label="Rate"
          value={param.row.rate}
          onChange={(e) => handleInput(e, null, param.row.sno)}
        />
      ),
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
          onChange={(e, value) => handleInput(e, value, param.row.sno)}
          value={
            param.row.plusMinus !== ""
              ? {
                  mID: mastersObj.PlusMinus.filter((x) => x.mValue === param.row.plusMinus)[0].mID,
                  mValue: param.row.plusMinus,
                }
              : { mID: 0, mValue: "" }
          }
          getOptionLabel={(option) => option.mValue}
          renderInput={(para) => <MDInput {...para} label="PlusMinus" />}
        />
      ),
    },
  ];

  const handleModalForBenefitMaster = () => {
    setMasterBenefitFlag(true);
  };
  const handleClose = () => {
    setMasterBenefitFlag(false);
  };
  return (
    // <MDBox sx={{ width: "100%" }}>
    <>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="benefitName"
            label="Benefit Name"
            value={benefitss.benefitName}
            //  onChange={(e) => handleCustomInput(e, "benefits")}
            onChange={(e) => handleCustomInput(e, "benefitss", "", benefitss, setBenefits)}
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
              benefitss.benefitType > 0
                ? {
                    mID: benefitss.benefitType,
                    mValue: BenefitType.filter((x) => x.mID === benefitss.benefitType)[0].mValue,
                  }
                : { mID: 0, mValue: "" }
            }
            getOptionLabel={(option) => option.mValue}
            onChange={
              (e, value) => handleAutoComplete(e, value, "benefitss", "", benefitss, setBenefits)
              // handleSetObjects(e, value, "benefitType"),
            }
            renderInput={(params) => <MDInput {...params} label="Benefit Type" required />}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Maximum No of Claims"
            name="maxNoOfClaims"
            value={benefitss.maxNoOfClaims}
            onChange={(e) => handleCustomInput(e, "benefitss", "", benefitss, setBenefits)}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="basedOn"
            options={BasedOn}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, value) =>
              handleAutoComplete(e, value, "benefitss", "", benefitss, setBenefits)
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            value={
              benefitss.basedOn > 0
                ? {
                    mID: benefitss.basedOn,
                    mValue: BasedOn.filter((x) => x.mID === benefitss.basedOn)[0].mValue,
                  }
                : { mID: 0, mValue: "" }
            }
            renderInput={(param) => <MDInput {...param} label="Based On" />}
          />
        </Grid>
        {benefitss.basedOn === 2 ? (
          <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              id="parentCover"
              options={coverList}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) =>
                handleAutoComplete(e, value, "benefitss", "", benefitss, setBenefits)
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              // value={benefitss.parentCover!==""?{mID:BasedOn.filter((x)=>x.mID===benefitss.basedOn)[0].mValue},
              //   mValue:
              //   :{mID:0,mValue:""}}
              renderInput={(param) => <MDInput {...param} label="Parent Cover" />}
            />
          </Grid>
        ) : null}

        {benefitss.basedOn === 2 || benefitss.basedOn === 3 ? (
          <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              id="coverSiType"
              options={[
                { mID: "Limit", mValue: "Limit" },
                { mID: "Percentage", mValue: "Percentage" },
                { mID: "LimitWithPercentage", mValue: "LimitWithPercentage" },
              ]}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) =>
                handleAutoComplete(e, value, "benefitss", "", benefitss, setBenefits)
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              value={
                benefitss.coverSiType !== ""
                  ? { mID: benefitss.coverSiType, mValue: benefitss.coverSiType }
                  : { mID: "", mValue: "" }
              }
              renderInput={(param) => <MDInput {...param} label="Cover SI Type" />}
            />
          </Grid>
        ) : null}

        {benefitss.basedOn === 2 || benefitss.basedOn === 3 ? (
          <>
            {benefitss.coverSiType === "Limit" ||
            benefitss.coverSiType === "LimitWithPercentage" ? (
              <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  name="limit"
                  label="Limit"
                  value={benefitss.limit}
                  onChange={(e) => handleCustomInput(e, "benefitss", "", benefitss, setBenefits)}
                />
              </Grid>
            ) : null}

            {benefitss.coverSiType === "Percentage" ||
            benefitss.coverSiType === "LimitWithPercentage" ? (
              <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  name="percentage"
                  label="Percentage"
                  value={benefitss.percentage}
                  onChange={(e) => handleCustomInput(e, "benefitss", "", benefitss, setBenefits)}
                />
              </Grid>
            ) : null}
          </>
        ) : null}

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton variant="contained" onClick={() => handleModalForBenefitMaster()}>
            Add Benefit Master
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
                <MDTypography variant="h6">Add Master</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  name="type"
                  value={obj.type}
                  onChange={(e) => handleChange(e, "type")}
                  label="Enter the Master Type"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  name="masterValue"
                  icon="Add"
                  value={masterValue}
                  onIconClick={addMastersForBenefit}
                  onChange={(e) => handleChange(e, "value")}
                  label="Enter the Master Value"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {/* <TextareaAutosize
                  style={{ height: "106px", width: "500px", overflow: "auto" }}
                  value={benefitss.benefitMaster.map((x) => x)}
                  
                /> */}
                <TextareaAutosize
                  style={{ height: "106px", width: "500px", overflow: "auto" }}
                  value={obj.value.map((x) => x)}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              <MDButton onClick={addAnotherMaster}>Add Another Master</MDButton>
            </Grid>
            <br />
            <Grid container spacing={2} p={2}>
              {benefitss.benefitMaster.length > 0
                ? benefitss.benefitMaster.map((y, i) => (
                    <>
                      <Grid item xs={12} sm={12} md={4} xl={4} xxl={4} lg={4}>
                        <Stack direction="row">
                          <IconButton onClick={() => handleMasterEdit(y)} style={{ top: "-6px" }}>
                            <Edit />
                          </IconButton>
                          <MDTypography variant="h6">{y.type}</MDTypography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={12} md={8} xl={8} xxl={8} lg={8}>
                        {/* <TextareaAutosize
                          style={{ height: "76px", width: "500px", overflow: "auto" }}
                          value={y.value.map((z) => z)}
                        /> */}

                        {y.value.map((z) => (
                          <Chip label={z} onDelete={() => handleDeleteMasterValues(i, z)} />
                        ))}
                      </Grid>
                    </>
                  ))
                : null}
            </Grid>
          </MDBox>
        </Modal>
        {/* ) : null} */}
      </Grid>
      <br />
      {/* <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} xl={6} xxl={6}>
                  <MDTypography variant="h6">Benefit Details</MDTypography>
                </Grid>
                <Grid container justifyContent="right">
                  <IconButton variant="outlined" onClick={() => addInGrid()}>
                    <Add />
                  </IconButton>
                </Grid>
              </Grid> */}
      <Stack spacing={2} direction="row">
        <MDTypography variant="h6" sx={{ "margin-top": "8px" }}>
          Benefit Details
        </MDTypography>
        <IconButton color="primary" variant="outlined" onClick={() => addInGrid()}>
          <Add />
        </IconButton>
      </Stack>

      <br />
      {/* {benefitss.benefitDetails.length > 0 ? ( */}
      <MDBox sx={{ width: "100%", "overflow-y": "auto" }}>
        <DataGrid
          autoHeight
          rows={benefitss.benefitDetails.length > 0 ? benefitss.benefitDetails : []}
          columns={columns1}
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

      {/* ) : null} */}
      <br />
      {flag === false ? (
        <Grid container justifyContent="center" alignItems="center">
          <MDButton onClick={addBenefit}>Add Benefit</MDButton>
        </Grid>
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <MDButton onClick={updateBenefit}>Update Benefit</MDButton>
        </Grid>
      )}
      {id !== undefined && id !== null ? (
        <Dialog
          open={open}
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add Condition</DialogTitle>

          <DialogContent>
            {type === "rule" ? (
              <MDInput
                name="rule"
                label="Enter Rule Condtion"
                // icon="Add"
                // onIconClick={(e) => handleInput(e, "val", param.row.sno)}
                // value={benefitss.benefitDetails.length > 0 ? benefitss.benefitDetails[id].rule : ""}
                //  onChange={(e) => handleInput(e, null, id)}
                // disabled={!param.row.isFilter}
                // disabled={
                //   benefitss.benefitDetails.length > 0 && !benefitss.benefitDetails[id].isFilter
                // }
                //  multiline
                // sx={{ width: "450px" }}
                // disabled={param.row.isList}
              />
            ) : (
              <MDInput
                name="filterCondition"
                label="Enter Filter Condtion"
                // icon="Add"
                // onIconClick={(e) => handleInput(e, "val", param.row.sno)}
                value={
                  benefitss.benefitDetails.length > 0
                    ? benefitss.benefitDetails[id].filterCondition
                    : ""
                }
                onChange={(e) => handleInput(e, null, id)}
                // disabled={!param.row.isFilter}
                disabled={
                  benefitss.benefitDetails.length > 0 && !benefitss.benefitDetails[id].isFilter
                }
                multiline
                sx={{ width: "450px" }}
                // disabled={param.row.isList}
              />
            )}
          </DialogContent>
          <DialogActions>
            {/* <MDButton onClick={handleClose}>Disagree</MDButton> */}
            <MDButton onClick={handleClose1}>Add</MDButton>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
}
export default GenericBenefit;
