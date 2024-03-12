import React from "react";
import {
  Grid,
  Autocomplete,
  //   Accordion,
  //   AccordionDetails,
  //   Modal,
  //   AccordionSummary,
  //   IconButton,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import RemoveIcon from "@mui/icons-material/Remove";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { setProductJson, useDataController } from "../../../../BrokerPortal/context";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
// import ViewBenefits from "./ViewBenefits";
import { handleCustomInput, handleAutoComplete } from "./data/Handlers";
// import MDTypography from "../../../../../components/MDTypography";

function BenefitsCommonPage({
  productBenefits,
  setProductBenefits,
  benefitCriteria,
  //   benefitCri,
  handleSetObjects,
  masterData,
  //   currencyCri,
  beneCri,
  //   basedCri,
  addSiValue,
  coverList,
  addLimitValue,
  addLiValue,
  deductible,
  addDeductible,
  columns,
  addBenefit,
  updateBenefit,
  setSiValue,
  setLimitValue,
  setLiValue,
  setDeductible,
  flag,
}) {
  //   const [bCri, setBCri] = useState([]);
  //   useEffect(() => {
  //     // setBeneCri(beneCriD);
  //     setBCri([]);
  //     // debugger;
  //     const data = [
  //       { mID: 502, mValue: "Benefit" },
  //       { mID: 503, mValue: "Indemnity" },
  //     ];
  //     const abc = data.filter((r, i) =>
  //       r.mID === productBenefits.basedOn.benefitTypes[i] ? r : null
  //     );
  //     setBCri([...abc]);
  //   }, []);
  // id to be given here in dependency array ,keyb
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="benefitName"
            label="Benefit Name"
            value={productBenefits.benefitName}
            onChange={(e) =>
              handleCustomInput(e, "benefits", "", productBenefits, setProductBenefits)
            }
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="benefitTypeId"
            options={benefitCriteria}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            // value={benefitCri}
            value={
              productBenefits.benefitTypeId > 0
                ? {
                    mID: productBenefits.benefitTypeId,
                    mValue: benefitCriteria.filter(
                      (x) => x.mID === productBenefits.benefitTypeId
                    )[0].mValue,
                  }
                : { mID: 0, mValue: "" }
            }
            getOptionLabel={(option) => option.mValue}
            onChange={
              (e, value) =>
                handleAutoComplete(e, value, "benefits", "", productBenefits, setProductBenefits)
              //   handleSetObjects(e, value, "benefitCri"),
            }
            renderInput={(params) => <MDInput {...params} label="Benefit Criteria" required />}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="currencyId"
            options={
              masterData.length > 0 ? masterData.filter((x) => x.mType === "Currency")[0].mdata : []
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            // value={currencyCri}
            value={
              productBenefits.currencyId > 0
                ? {
                    mID: productBenefits.currencyId,
                    mValue: masterData
                      .filter((x) => x.mType === "Currency")[0]
                      .mdata.filter(
                        (y) => y.mID.toString() === productBenefits.currencyId.toString()
                      )[0].mValue,
                  }
                : { mID: 0, mValue: "" }
            }
            getOptionLabel={(option) => option.mValue}
            onChange={
              (e, value) =>
                handleAutoComplete(e, value, "benefits", "", productBenefits, setProductBenefits)
              //   handleSetObjects(e, value, "currencyCri"),
            }
            renderInput={(params) => <MDInput {...params} label="Currency" required />}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="benefitAmount"
            value={productBenefits.benefitAmount}
            label="Benefit Amount"
            onChange={(e) =>
              handleCustomInput(e, "benefits", "", productBenefits, setProductBenefits)
            }
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="maxBenefitAmount"
            label="Maximum Benefit Amount"
            value={productBenefits.maxBenefitAmount}
            onChange={(e) =>
              handleCustomInput(e, "benefits", "", productBenefits, setProductBenefits)
            }
            // onChange={(e) => handleCustomInput(e, "benefits")}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="maxbenefitCriteria"
            label="Maximum Benefit Criteria Value"
            value={productBenefits.maxbenefitCriteria}
            onChange={(e) =>
              handleCustomInput(e, "benefits", "", productBenefits, setProductBenefits)
            }
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
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
            value={beneCri.map((x) => x)}
            // value={bCri.length > 0 ? bCri.map((x) => x) : []}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, value) => [
              handleAutoComplete(e, value, "benefits", "", productBenefits, setProductBenefits),
              handleSetObjects(e, value, "beneCri"),
            ]}
            renderInput={(params) => <MDInput {...params} label="Benefit Type" required />}
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
              productBenefits.basedOn > 0
                ? {
                    mID: productBenefits.basedOn,
                    mValue: [
                      { mID: 1, mValue: "Standard SI" },
                      { mID: 2, mValue: "Cover SI" },
                      { mID: 3, mValue: "Base SI" },
                    ].filter((x) => x.mID === productBenefits.basedOn)[0].mValue,
                  }
                : { mID: 0, mValue: "" }
            }
            getOptionLabel={(option) => option.mValue}
            onChange={
              (e, value) =>
                handleAutoComplete(e, value, "benefits", "", productBenefits, setProductBenefits)
              // handleSetObjects(e, value, "basedCri"),
            }
            renderInput={(params) => <MDInput {...params} label="Based On" required />}
          />
        </Grid>
      </Grid>
      <br />
      {productBenefits.basedOn === 1 ? (
        <MDBox>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="siValue"
                label="SI"
                onChange={(e) => handleCustomInput(e, "si", "", "", setSiValue)}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={addSiValue}>Add</MDButton>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="SI List"
                name="si"
                value={
                  productBenefits.siList.length > 0 ? productBenefits.siList.map((x) => x) : ""
                }
              />
            </Grid>
          </Grid>
          <br />{" "}
        </MDBox>
      ) : null}

      {productBenefits.basedOn === 2 ? (
        <MDBox>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="coverNameId"
                name="coverNameId"
                // label="Limits"
                options={coverList}
                getOptionLabel={(option) => option.mValue}
                renderInput={(props) => <MDInput {...props} label="Covers" />}
                // onChange={(e, value) => handleAutoComplete(e, value, "benefits")}
                value={
                  productBenefits.coverNameId > 0
                    ? {
                        mID: productBenefits.coverNameId,
                        mValue: coverList.filter((x) => x.mID === productBenefits.coverNameId)[0]
                          .mValue,
                      }
                    : { mID: 0, mValue: "" }
                }
                onChange={
                  (e, value) =>
                    handleAutoComplete(
                      e,
                      value,
                      "benefits",
                      "",
                      productBenefits,
                      setProductBenefits
                    )
                  // handleSetObjects(e, value, "beneCri"),
                }
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="limitValue"
                label="Limits"
                onChange={(e) => handleCustomInput(e, "limit", "", "", setLimitValue)}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={addLimitValue}>Add</MDButton>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Limit List"
                value={
                  productBenefits.limitList.length > 0
                    ? productBenefits.limitList.map((x) => x)
                    : ""
                }
              />
            </Grid>
          </Grid>
          <br />
        </MDBox>
      ) : null}

      {productBenefits.basedOn === 3 ? (
        <MDBox>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="limitValue1"
                label="Limits"
                onChange={(e) => handleCustomInput(e, "limits", "", "", setLiValue)}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={addLiValue}>Add</MDButton>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Limit List"
                value={
                  productBenefits.limitList.length > 0
                    ? productBenefits.limitList.map((x) => x)
                    : ""
                }
              />
            </Grid>
          </Grid>
          <br />{" "}
        </MDBox>
      ) : null}

      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Deductible Type"
            value={deductible.deductableUnit}
            name="deductableUnit"
            onChange={setDeductible}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Deductible Value"
            value={deductible.deductableValue}
            name="deductableValue"
            onChange={setDeductible}
          />
        </Grid>
        <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton onClick={addDeductible}>Add</MDButton>
        </Grid>
        {productBenefits.deductible.deductibleDto.length > 0 ? (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ width: "100%" }}>
              <DataGrid
                autoHeight
                rows={productBenefits.deductible.deductibleDto}
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

      {flag === false ? (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <MDButton onClick={addBenefit}>Add Benefit</MDButton>
        </Grid>
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <MDButton onClick={updateBenefit}>Update Benefit</MDButton>
        </Grid>
      )}

      <br />
    </>
  );
}
export default BenefitsCommonPage;
