import React, { useEffect, useState } from "react";
import { Card, Grid, Autocomplete, Checkbox, TextField, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import NewRenderControl from "Common/RenderControl/NewRenderControl";
import { useNavigate } from "react-router-dom";
import { get } from "Common/RenderControl/objectPath";
import swal from "sweetalert";
import MDBox from "components/MDBox";
import MDCheckbox from "components/MDCheckbox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { TravelJson, Masters, redAsterisk } from "../data/Json/TravelJson";
import { GetProdPartnermasterData } from "../data/APIs/USGIWCApi";
import { SaveCoverGrouping } from "../data/APIs/GroupTravelApi";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function CreatePlan() {
  const [lDto, setDto] = useState(TravelJson);
  const [lMasters, setMasters] = useState(Masters);
  let isError = false;
  const naviagte = useNavigate();
  const handleReset = () => {
    // lDto.PlanCreation.planname = "";
    // lDto.PlanCreation.modeoftransit = "";
    // lMasters.dropdown.modeoftransitAuto = [];
    // lDto.PlanCreation.premiumbasis = "";
    // lDto.PlanCreation.PlanRate = "";
    // lDto.PlanCreation.Zoneofvisit = "";
    // lDto.PlanCreation.coveritems = [];
    // lDto.PlanCreation.minimumadultage = "";
    // lDto.PlanCreation.Agegroupexception = "";
    // lDto.PlanCreation.maximumadultage = "";
    // lMasters.dropdown.PlanCovers = [];
    // lMasters.dropdown.CoversSelected = [];
    // lDto.PlanCreation.plantype = "";
    // setMasters({ ...lMasters });
    // setDto({ ...lDto });
  };
  const handleAutoComplete = (e, v, name) => {
    if (name === "ModeofTransit") {
      const selectedValues = v.map((option) => option.mValue);
      lMasters.dropdown.modeoftransitAuto = selectedValues;
      lDto.PlanCreation.GroupDetailsJson.SectionMaster.modeoftransit = selectedValues.join(",");
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const handleAutoCompleteBasis = (e, v, i) => {
    const selectedValues = v.map((option) => option.mValue);
    lMasters.dropdown.DeductiableBasisAuto = selectedValues;
    lMasters.dropdown.CoversSelected[i].deductiblebasis = selectedValues.join(",");
    setMasters({ ...lMasters });
  };
  const handleCoverCheck = (e, i, a, b) => {
    if (e.target.checked === true) {
      lMasters.dropdown.Json.PlanCovers.Covername = a;
      lMasters.dropdown.Json.PlanCovers.mandatory = "Yes";
      lMasters.dropdown.Json.PlanCovers.CoverType = b === false ? "Base" : "Optional";
      lMasters.dropdown.CoversSelected[i] = { ...lMasters.dropdown.Json.PlanCovers };
    } else {
      lMasters.dropdown.Json.PlanCovers.Covername = "";
      lMasters.dropdown.Json.PlanCovers.mandatory = "No";
      lMasters.dropdown.Json.PlanCovers.CoverType = "";
      lMasters.dropdown.CoversSelected[i] = { ...lMasters.dropdown.Json.PlanCovers };
    }
    setMasters({ ...lMasters });
  };
  const handleMastersAPiCalling = async () => {
    lMasters.flag.midNextValidationId = -1;
    lMasters.flag.nextflag = false;
    handleReset();
    lMasters.dropdown.ModeOfTransit = await GetProdPartnermasterData(1443, "ModeOfTransit", {
      MasterType: "ModeOfTransit",
    });
    lMasters.dropdown.PremiumBasis = await GetProdPartnermasterData(1443, "PremiumBasis", {
      MasterType: "PremiumBasis",
    });
    lMasters.dropdown.ZoneofVisits = await GetProdPartnermasterData(1443, "ZoneofVisits", {
      MasterType: "ZoneofVisits",
    });
    setMasters({ ...lMasters });
  };
  useEffect(async () => {
    await handleMastersAPiCalling();
  }, []);
  const handleShowAllBenifit = async (flag) => {
    if (flag === true) {
      lMasters.dropdown.PlanCovers = await GetProdPartnermasterData(1443, "GroupTravelCovers", {
        MasterType: "ZoneofVisits",
      });
      setMasters({ ...lMasters });
    } else {
      swal({ icon: "error", text: "Please Fill requried field" });
    }
  };
  const handleCoversValidation = () => {
    lMasters.dropdown.CoversSelected.forEach((x) => {
      if (
        x.mandatory === "Yes" &&
        (x.suminsured === "" ||
          x.deductiblebasis === "" ||
          (x.deductiblebasis.search("Hrs") !== -1 && x.deductiblehrs === "") ||
          (x.deductiblebasis.search("%") !== -1 && x.deductiblepercentage === "") ||
          (x.deductiblebasis.search("Ammount") !== -1 && x.deductibleamount === "") ||
          (x.deductiblebasis.search("Days") !== -1 && x.deductibledays === ""))
      ) {
        isError = true;
        lMasters.flag.nextflag = true;
      } else {
        isError = false;
        lMasters.flag.nextflag = false;
      }
    });
  };
  const handleSavePlan = async (flag) => {
    handleCoversValidation();

    lDto.PlanCreation.GroupDetails[0].SectionMappingDetails.BenefitDetails = [];
    if (flag !== true) {
      swal({ icon: "error", text: "Please Fill requried field" });
    } else if (lMasters.dropdown.CoversSelected.filter((x) => x.CoverType === "Base").length < 1) {
      swal({ icon: "error", text: "Please Select One Base Cover" });
    } else if (isError === true) {
      swal({ icon: "error", text: "Please Fill requried field" });
      lMasters.flag.nextflag = true;
    } else if (lMasters.flag.sum.some((x) => x.sumflag === true)) {
      swal({ icon: "error", text: `Please Enter Correct Sum Insured` });
    } else {
      lMasters.flag.nextflag = false;
      lMasters.flag.open = true;
      lDto.PlanCreation.groupName = lDto.PlanCreation.planname;
      lMasters.dropdown.CoversSelected.forEach((x) => {
        if (x.mandatory === "Yes") {
          lDto.PlanCreation.GroupDetails[0].CoverName = x.Covername;
          lDto.PlanCreation.GroupDetails[0].SectionMappingDetails.BenefitDetails.push(x);
        }
      });
      setDto({ ...lDto });
      const resultPlan = await SaveCoverGrouping([lDto.PlanCreation]);
      console.log("planresult", resultPlan);
    }
    console.log("PlanJson", lDto);
    setMasters({ ...lMasters });
  };
  const handleSumInsured = (e, i) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      lMasters.dropdown.CoversSelected[i].suminsured = e.target.value;
    }
    setMasters({ ...lMasters });
  };
  const handleSumValidation = (e, i, s) => {
    const split = s.split("-");
    console.log("split", split);
    if (
      Number(lMasters.dropdown.CoversSelected[i].suminsured) < Number(split[0]) &&
      Number(lMasters.dropdown.CoversSelected[i].suminsured) < Number(split[0])
    ) {
      lMasters.flag.sum[i] = { sumflag: true };
    } else {
      lMasters.flag.sum[i] = { sumflag: false };
    }
    setMasters({ ...lMasters });
  };
  const modelClose = (name) => {
    if (name === "close") {
      lMasters.flag.open = false;
    } else {
      lMasters.flag.open = false;
      naviagte("/Travel/ViewPlans");
    }
    setMasters({ ...lMasters });
  };
  const handleDeductiblebasisCover = (e, i, name) => {
    const regex = /^[0-9]*$/;
    if (name === "remarks") {
      lMasters.dropdown.CoversSelected[i].remarks = e.target.value;
    } else if (regex.test(e.target.value)) {
      lMasters.dropdown.CoversSelected[i][name] = e.target.value;
    }
    setMasters({ ...lMasters });
  };
  const Data = [
    {
      label: "Plan Name",
      type: "Input",
      visible: true,
      required: true,
      spacing: 2.7,
      path: "PlanCreation.planname",
      validationId: 1,
    },
    {
      type: "Custom",
      visible: true,
      spacing: 2.7,
      validationId: 1,
      path: "PlanCreation.GroupDetailsJson.SectionMaster.modeoftransit",
      return: (
        <Autocomplete
          multiple
          disableCloseOnSelect
          id="checkboxes-tags-demo"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          variant="outlined"
          options={lMasters.dropdown.ModeOfTransit || []}
          getOptionLabel={(option) => option.mValue}
          value={lMasters.dropdown.modeoftransitAuto.map((mValue) =>
            lMasters.dropdown.ModeOfTransit.find((option) => option.mValue === mValue)
          )}
          onChange={(e, value) => handleAutoComplete(e, value, "ModeofTransit")}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
              {option.mValue}
            </li>
          )}
          renderInput={(op) => (
            <TextField
              {...op}
              sx={redAsterisk}
              label="Mode of Transit"
              required
              error={
                lDto.PlanCreation.GroupDetailsJson.SectionMaster.modeoftransit === "" &&
                lMasters.flag.nextflag === true
              }
              helperText={
                lDto.PlanCreation.GroupDetailsJson.SectionMaster.modeoftransit === "" &&
                lMasters.flag.nextflag === true &&
                " This field is requried"
              }
            />
          )}
        />
      ),
    },

    {
      label: "Premium Basis",
      type: "AutoComplete",
      visible: true,
      required: true,
      options: lMasters.dropdown.PremiumBasis,
      spacing: 2.7,
      validationId: 1,
      path: "PlanCreation.GroupDetailsJson.SectionMaster.premiumbasis",
    },
    {
      type: "Input",
      label: "Rate",
      visible: true,
      required: true,
      spacing: 2.7,
      validationId: 1,
      path: "PlanCreation.GroupDetailsJson.SectionMaster.PlanRate",
      onChangeFuncs: ["IsNumeric"],
    },
    {
      label: "Zone of Visit",
      type: "AutoComplete",
      visible: true,
      required: true,
      options: lMasters.dropdown.ZoneofVisits,
      spacing: 2.7,
      validationId: 1,
      path: "PlanCreation.GroupDetailsJson.SectionMaster.Zoneofvisit",
    },
    {
      label: "Currency",
      type: "AutoComplete",
      visible: true,
      required: true,
      options: lMasters.dropdown.ZoneofVisits,
      spacing: 2.7,
      validationId: 1,
      path: "PlanCreation.GroupDetailsJson.SectionMaster.Currency",
    },
    {
      label: "Plan Type",
      type: "AutoComplete",
      visible: true,
      required: true,
      options: lMasters.dropdown.PlanType,
      spacing: 2.7,
      validationId: 1,
      path: "PlanCreation.GroupDetailsJson.SectionMaster.plantype",
    },

    {
      type: "Input",
      label: "Minimum Age-Adult",
      visible: true,
      required: true,
      spacing: 2.7,
      validationId: 1,
      path: "PlanCreation.GroupDetailsJson.SectionMaster.minimumadultage",
      onChangeFuncs: ["IsNumeric"],
    },
    {
      type: "Input",
      label: "Maximum Age-Adult",
      visible: true,
      required: true,
      spacing: 2.7,
      validationId: 1,
      path: "PlanCreation.GroupDetailsJson.SectionMaster.maximumadultage",
      onChangeFuncs: ["IsNumeric"],
    },

    {
      type: "Input",
      label: "Age Group Exception",
      visible: true,
      required: true,
      spacing: 2.7,
      validationId: 1,
      path: "PlanCreation.GroupDetailsJson.SectionMaster.Agegroupexception",
    },
    {
      label: "",
      type: "Typography",
      visible: true,
      spacing: 12,
    },
    {
      label: "",
      type: "Typography",
      visible: true,
      spacing: 8.5,
    },
    {
      label: "Reset",
      type: "Button",
      visible: lMasters.dropdown.PlanCovers.length === 0,
      spacing: 1,
      onClick: handleReset,
    },
    {
      label: "Show all Benefits",
      type: "ValidationControl",
      subType: "Button",
      visible: true,
      spacing: 2.5,
      validationId: 1,
      onClick: handleShowAllBenifit,
    },
    {
      label: "Coverage",
      type: "Typography",
      visible: lMasters.dropdown.PlanCovers.length !== 0,
      sx: { fontWeight: "bold" },
      spacing: 4.5,
    },
    {
      label: "Base/Optional",
      type: "Typography",
      visible: lMasters.dropdown.PlanCovers.length !== 0,
      sx: { fontWeight: "bold" },
      spacing: 3,
    },
    {
      type: "Custom",
      visible: lMasters.dropdown.PlanCovers.length !== 0,
      spacing: 12,
      return: (
        <Grid container>
          {lMasters.dropdown.PlanCovers.map((x, i) => (
            <>
              <Grid xs={5}>
                <MDBox display="flex" flexDirection="row">
                  <MDCheckbox
                    onChange={(e) => handleCoverCheck(e, i, x.mValue, x.mBOp)}
                    checked={lMasters.dropdown.CoversSelected[i]?.Covername === x.mValue}
                  />
                  <MDTypography
                    sx={{
                      fontSize: "1rem",
                      marginTop: "5px",
                      textAlign: "justify",
                    }}
                  >
                    {x.mValue}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid xs={5}>
                <MDTypography
                  sx={{
                    fontSize: "1rem",
                    marginTop: "0px",
                    textAlign: "justify",
                    // textJustify: "inter-word",
                  }}
                >
                  {x.mBOp === false ? "Base" : "Optional"}
                </MDTypography>
              </Grid>
              <Grid xs={12} ml={5}>
                <MDTypography
                  variant="subtitle1"
                  sx={{
                    fontSize: "0.8rem",
                    marginTop: "0px",
                    textAlign: "justify",
                    textJustify: "inter-word",
                  }}
                >
                  {x.mValue === "Permanent Partial Disability" ||
                  x.mValue === "Pre-Hospitalization" ||
                  x.mValue === "Post-Hospitalization"
                    ? "(No ranges for Sum Insured) "
                    : `(Sum insured range is ${x.mSI})`}
                </MDTypography>
              </Grid>
              {lMasters.dropdown.CoversSelected[i]?.Covername === x.mValue && (
                <Grid container spacing={2} m={1}>
                  <Grid item xs={1.9}>
                    <MDInput
                      label="Sum Insured"
                      sx={redAsterisk}
                      required
                      value={lMasters.dropdown.CoversSelected[i].suminsured}
                      error={
                        (lMasters.dropdown.CoversSelected[i]?.suminsured === "" &&
                          lMasters.flag.nextflag === true) ||
                        (lMasters.dropdown.CoversSelected[i]?.suminsured !== "" &&
                          lMasters.flag.sum[i]?.sumflag === true)
                      }
                      helperText={
                        (lMasters.dropdown.CoversSelected[i].suminsured === "" &&
                          lMasters.flag.nextflag === true &&
                          " This field is requried") ||
                        (lMasters.dropdown.CoversSelected[i].suminsured !== "" &&
                          lMasters.flag.sum[i]?.sumflag === true &&
                          `Sum insured range should be ${x.mSI}`)
                      }
                      onChange={(e) => handleSumInsured(e, i, x.mSI)}
                      onBlur={(e) => handleSumValidation(e, i, x.mSI)}
                    />
                  </Grid>
                  <Grid item xs={3.2}>
                    <Autocomplete
                      multiple
                      disableCloseOnSelect
                      id="checkboxes-tags-demo"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      variant="outlined"
                      options={lMasters.dropdown.DeductiableBasis || []}
                      getOptionLabel={(option) => option.mValue}
                      onChange={(e, value) => handleAutoCompleteBasis(e, value, i)}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
                          {option.mValue}
                        </li>
                      )}
                      renderInput={(op) => (
                        <TextField
                          {...op}
                          label="Deductiable Basis"
                          required
                          sx={redAsterisk}
                          error={
                            lMasters.dropdown.CoversSelected[i]?.deductiblebasis === "" &&
                            lMasters.flag.nextflag === true
                          }
                          helperText={
                            lMasters.dropdown.CoversSelected[i]?.deductiblebasis === "" &&
                            lMasters.flag.nextflag === true &&
                            " This field is requried"
                          }
                        />
                      )}
                    />
                  </Grid>
                  {lMasters.dropdown.CoversSelected[i]?.deductiblebasis.search("Hrs") !== -1 && (
                    <Grid item xs={1.9}>
                      <MDInput
                        label="Deductiable Hrs"
                        value={lMasters.dropdown.CoversSelected[i]?.deductiblehrs}
                        required={
                          lMasters.dropdown.CoversSelected[i]?.deductiblebasis.search("Hrs") !== -1
                        }
                        sx={redAsterisk}
                        error={
                          lMasters.dropdown.CoversSelected[i]?.deductiblehrs === "" &&
                          lMasters.flag.nextflag === true
                        }
                        helperText={
                          lMasters.dropdown.CoversSelected[i]?.deductiblehrs === "" &&
                          lMasters.flag.nextflag === true &&
                          " This field is requried"
                        }
                        onChange={(e) => handleDeductiblebasisCover(e, i, "deductiblehrs")}
                      />
                    </Grid>
                  )}
                  {lMasters.dropdown.CoversSelected[i]?.deductiblebasis.search("%") !== -1 && (
                    <Grid item xs={1.9}>
                      <MDInput
                        label="Deductiable %"
                        value={lMasters.dropdown.CoversSelected[i]?.deductiblepercentage}
                        required={
                          lMasters.dropdown.CoversSelected[i]?.deductiblebasis.search("%") !== -1
                        }
                        sx={redAsterisk}
                        error={
                          lMasters.dropdown.CoversSelected[i]?.deductiblepercentage === "" &&
                          lMasters.flag.nextflag === true
                        }
                        helperText={
                          lMasters.dropdown.CoversSelected[i]?.deductiblepercentage === "" &&
                          lMasters.flag.nextflag === true &&
                          " This field is requried"
                        }
                        onChange={(e) => handleDeductiblebasisCover(e, i, "deductiblepercentage")}
                      />
                    </Grid>
                  )}
                  {lMasters.dropdown.CoversSelected[i]?.deductiblebasis.search("Days") !== -1 && (
                    <Grid item xs={1.9}>
                      <MDInput
                        label="Deductiable Days"
                        required={
                          lMasters.dropdown.CoversSelected[i]?.deductiblebasis.search("Days") !== -1
                        }
                        sx={redAsterisk}
                        value={lMasters.dropdown.CoversSelected[i]?.deductibledays}
                        error={
                          lMasters.dropdown.CoversSelected[i]?.deductibledays === "" &&
                          lMasters.flag.nextflag === true
                        }
                        helperText={
                          lMasters.dropdown.CoversSelected[i]?.deductibledays === "" &&
                          lMasters.flag.nextflag === true &&
                          " This field is requried"
                        }
                        onChange={(e) => handleDeductiblebasisCover(e, i, "deductibledays")}
                      />
                    </Grid>
                  )}
                  {lMasters.dropdown.CoversSelected[i]?.deductiblebasis.search("Ammount") !==
                    -1 && (
                    <Grid item xs={1.9}>
                      <MDInput
                        label="Deductiable Amount"
                        required={
                          lMasters.dropdown.CoversSelected[i]?.deductiblebasis.search("Ammount") !==
                          -1
                        }
                        sx={redAsterisk}
                        value={lMasters.dropdown.CoversSelected[i]?.deductibleamount}
                        error={
                          lMasters.dropdown.CoversSelected[i]?.deductibleamount === "" &&
                          lMasters.flag.nextflag === true
                        }
                        helperText={
                          lMasters.dropdown.CoversSelected[i]?.deductibleamount === "" &&
                          lMasters.flag.nextflag === true &&
                          " This field is requried"
                        }
                        onChange={(e) => handleDeductiblebasisCover(e, i, "deductibleamount")}
                      />
                    </Grid>
                  )}
                  <Grid item xs={11.3}>
                    <MDInput
                      label="Remark"
                      value={lMasters.dropdown.CoversSelected[i]?.remarks}
                      onChange={(e) => handleDeductiblebasisCover(e, i, "remarks")}
                    />
                  </Grid>
                </Grid>
              )}
            </>
          ))}
        </Grid>
      ),
    },
    {
      label: "",
      type: "Typography",
      visible: true,
      spacing: 8.5,
    },
    {
      label: "Reset",
      type: "Button",
      visible: lMasters.dropdown.PlanCovers.length !== 0,
      spacing: 1,
      onClick: handleReset,
    },
    {
      label: "Save Plan",
      type: "ValidationControl",
      subType: "Button",
      visible: lMasters.dropdown.PlanCovers.length !== 0,
      spacing: 2.5,
      validationId: 1,
      onClick: handleSavePlan,
    },
  ];
  const midValidationCheck = (validationId) => {
    let validationFlag = true;
    Data.forEach((x2) => {
      if (
        x2.visible === true &&
        x2.validationId === validationId &&
        x2.type !== "ValidationControl"
      ) {
        const val = get(lDto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });

    if (validationFlag === false) {
      lMasters.flag.midNextValidationId = 1;
      lMasters.flag.nextflag = true;
    } else {
      lMasters.flag.midNextValidationId = -1;
      lMasters.flag.nextflag = false;
    }
    setMasters({ ...lMasters });
    return validationFlag;
  };
  return (
    <Card>
      <Grid item xs={12} m={1}>
        Create Plan
      </Grid>
      <Grid container spacing={2} m={1}>
        {Data.map(
          (elem) =>
            elem.visible && (
              <Grid item xs={elem.spacing}>
                <NewRenderControl
                  item={elem}
                  dto={lDto}
                  setDto={setDto}
                  nextFlag={lMasters.flag.nextflag}
                  onMidNextValidation={midValidationCheck}
                  midNextValidationId={lMasters.flag.midNextValidationId}
                />
              </Grid>
            )
        )}
      </Grid>
      <Modal
        open={lMasters.flag.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MDBox
          align-item="center"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "500",
            height: "300",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
          }}
        >
          <IconButton
            aria-label="Close"
            onClick={() => modelClose("close")}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={1}>
              <MDTypography variant="body1" fontWeight="bold" color="success">
                Your Plan Saved Suceessfully!
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={1}>
              <MDTypography variant="body1" fontWeight="bold">
                Plan Name :&nbsp;&nbsp;{lDto.PlanCreation.planname}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={1}>
            <MDButton variant="outlined" onClick={() => modelClose("nav")}>
              Close
            </MDButton>
          </Grid>
        </MDBox>
      </Modal>
    </Card>
  );
}

export default CreatePlan;
