import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Autocomplete,
  Modal,
  // FormGroup,
  // FormControlLabel,
  // Checkbox,
  IconButton,
  Drawer,
  Chip,
  Skeleton,
  // Stack,
} from "@mui/material";

import {
  ExpandMore,
  Delete,
  Visibility,
  Edit,
  // Group
} from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import swal from "sweetalert";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import {
  getProducts,
  getMasterData,
  getProductJson,
  getCoverData,
  getAllPlansOnId,
  getRulesParams,
  getRuleExecution,
  // saveCoverGrouping,
  // getProductMaster,
} from "./data/index";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import BenefitMapping from "./BenefitMapping";

const style = {
  position: "absolute",
  top: "-1%",
  left: "80%",
  transform: "translate(-85%, 6%)",
  width: 1200,
  height: 620,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,

  textAlign: "center",
  p: 4,
  "max-height": "100%",
  "overflow-y": "auto",
};
function CoverGrouping() {
  const [productId, setProductId] = useState();
  console.log(productId);
  const [productData, setProductData] = useState([]);
  const [groupingData, setGroupingData] = useState([]);
  const [covers, setCovers] = useState([]);
  // const [siForCoverValue, setSiForCoverValue] = useState("");
  const [finalModalFlag, setFinalModalFlag] = useState(false);
  const [groupTypeId, setGroupTypeId] = useState({ mID: 0, mValue: "" });
  const [groupName, setGroupName] = useState("");
  // const [ac, setAc] = useState([]);
  // const [b, setB] = useState(false);
  const [planList, setPlanList] = useState([]);
  const [throwError, setThrowError] = useState(false);
  // const [benefitCriteria, setBenefitCriteria] = useState([]);

  const [GroupDto, setGroupDto] = useState({
    id: -1,
    productId: 0,
    groupTypeId: 0.0,
    groupName: "",
    disableDeleteFlag: false,

    isActive: true,
    GroupDetailsJson: {
      SectionMaster: {
        // SI: [],
        // Type: [],
        // Region: [],
        // currency: [],
      },
      InputObj: "",
      OutputObj: "",
    },
    GroupDetails: [],
  });

  const [GroupDetails, setGroupDetails] = useState({
    GroupDetailsId: 0,
    GroupId: 0,
    CoverId: 0.0,
    CoverName: "",
    BenefitDetails: null,
    IsActive: true,
    FilterCriteria: {
      // SI: "",
      // Type: "",
      // Region: "",
      // currency: "",
    },
    SectionMappingDetails: {
      BenefitDetails: [],
    },
  });

  const GroupDetailsD = {
    GroupDetailsId: 0,
    GroupId: 0,
    CoverId: 0.0,
    CoverName: "",
    BenefitDetails: null,
    IsActive: true,
    FilterCriteria: {
      // SI: "",
      // Type: "",
      // Region: "",
      // currency: "",
    },
    SectionMappingDetails: {
      BenefitDetails: [],
    },
  };

  // const [BenefitDetails, setBenefitDetails] = useState({
  //   BenefitID: 0,
  //   CoverName: "",
  //   Benefit: "",
  //   BenefitCurrencyType: "",
  //   Value: "",
  //   BenefitType: "",
  //   BenefitCriteria: "",
  //   DeductibleType: "",
  //   Deductible: "",
  //   IsOptional: false,
  //   // PremiumType: "",
  // });

  // const BenefitDetailsD = {
  //   BenefitID: 0,
  //   CoverName: "",
  //   Benefit: "",
  //   BenefitCurrencyType: "",
  //   Value: "",
  //   BenefitType: "",
  //   BenefitCriteria: "",
  //   DeductibleType: "",
  //   Deductible: "",
  //   IsOptional: false,
  //   // PremiumType: "",
  // };
  const GroupDtoD = {
    productId: 0,
    groupTypeId: 0.0,
    groupName: "",
    disableDeleteFlag: false,
    isActive: true,
    GroupDetailsJson: {
      SectionMaster: {
        // SI: [],
        // Type: [],
        // Region: [],
        // currency: [],
      },
      InputObj: "",
      OutputObj: "",
    },
    GroupDetails: [],
  };

  const [saveDto, setSaveDto] = useState([]);
  const [showCriterias, setShowCriterias] = useState(false);

  // const [currencyMaster, setCurrencyMaster] = useState([]);
  const [grid, showGrid] = useState(false);
  const [passId, setPassId] = useState(-1);
  const [passId1, setPassId1] = useState(-1);
  const [passId2, setPassId2] = useState(-1);
  const [drawer, setDrawer] = useState(false);
  const [drawer1, setDrawer1] = useState(false);

  const [addFlag, setAddFlag] = useState(false);
  const [showBenefitsFlag, setShowBenefitsFlag] = useState(false);
  const [productJson, setProductJson] = useState({});

  const [open, setOpen] = useState(false);

  const [arr, setArr] = useState({});
  const [groupedFlag, setGroupedFlag] = useState(false);
  const [validationFlag1, setValidationFlag1] = useState(false);
  // const [validationFlag2, setValidationFlag2] = useState(false);
  // const [validationFlag3, setValidationFlag3] = useState(false);
  // const [validationFlag4, setValidationFlag4] = useState(false);
  // const [mapFlag, setMapFlag] = useState(true);

  // const benefitLstObj = [
  //   { mID: "502", mValue: "Benefit" },
  //   { mID: "503", mValue: "Indemnity" },
  // ];
  const [filterObj, setFilterObj] = useState({ type: "", valueList: [] });
  const [filterValue, setValue] = useState("");

  const handleFilterAdd = (type) => {
    // debugger;
    setFilterObj({ type: "", valueList: [] });
    let obj = {};
    obj = { ...obj, [filterObj.type]: filterObj.valueList };

    console.log(obj);

    if (type === "base") {
      GroupDto.GroupDetailsJson.SectionMaster = {
        ...GroupDto.GroupDetailsJson.SectionMaster,
        ...obj,
      };
      setGroupDto((prev) => ({ ...prev, ...GroupDto }));
    } else {
      saveDto[passId2].GroupDetailsJson.SectionMaster = {
        ...saveDto[passId2].GroupDetailsJson.SectionMaster,
        ...obj,
      };
      setSaveDto([...saveDto]);
    }
  };
  const handleFilterChange = (e, type) => {
    switch (type) {
      case "type":
        filterObj[e.target.name] = e.target.value;
        break;
      case "filterValue":
        setValue(e.target.value);
        break;
      case "add":
        setValue("");
        filterObj.valueList.push(filterValue);
        break;
      default:
        return "Wrong Choice";
    }
    setFilterObj((prev) => ({ ...prev, ...filterObj }));
    return null;
  };
  // const addList = (key, key1, key2) => {
  //  debugger;
  // if (
  //   productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].siList
  //     .length > 0
  // ) {
  //   const lst = [];
  //   Object.keys(
  //     productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].siList
  //   ).forEach((x1, i2) => {
  //     lst.push({
  //       mID: productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //         .siList[i2],
  //       mValue:
  //         productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].siList[
  //           i2
  //         ],
  //     });
  //   });
  //   console.log("lst", lst);
  //   // siObj = [...lst];
  //   // this.setState({ siObj });
  //   setSiObj(lst);
  //   // setSiObj([...lst])
  //   // setSiObj([siObj])
  //   console.log("siObj", siObj);
  // } else {
  //   const lst1 = [];
  //   Object.keys(
  //     productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].limitList
  //   ).forEach((x2, i3) => {
  //     lst1.push({
  //       mID: productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //         .limitList[i3],
  //       mValue:
  //         productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //           .limitList[i3],
  //     });
  //   });
  //   console.log("lst", lst1);
  //   // limitObj = [...lst1];
  //   // this.setState({ limitObj });
  //   setLimitObj(lst1);
  //   console.log("limitObj", limitObj);
  // }
  // reverse binding on edit click again
  // GroupDetails.SectionMappingDetails.BenefitDetails.forEach((x, i) => {
  //   if (
  //     productJson.productInsurableItems[key].productCovers[key1].productBenefits[
  //       key2
  //     ].basedOn.toString() === "1" &&
  //     GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit ===
  //       productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //         .benefitName &&
  //     BenefitDetails.Benefit === GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit
  //   ) {
  //     BenefitDetails.Value = GroupDetails.SectionMappingDetails.BenefitDetails[i].Value;
  //     BenefitDetails.BenefitCurrencyType =
  //       GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitCurrencyType;
  //     BenefitDetails.DeductibleType =
  //       GroupDetails.SectionMappingDetails.BenefitDetails[i].DeductibleType;
  //     BenefitDetails.Deductible = GroupDetails.SectionMappingDetails.BenefitDetails[i].Deductible;
  //     BenefitDetails.BenefitType =
  //       GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitType;
  //     // BenefitDetails.PremiumType =
  //     //   GroupDetails.SectionMappingDetails.BenefitDetails[i].PremiumType;
  //     BenefitDetails.IsOptional = GroupDetails.SectionMappingDetails.BenefitDetails[i].IsOptional;
  //     setFlagCalc1(true);
  //     setSi(GroupDetails.SectionMappingDetails.BenefitDetails[i].Value);
  //   } else if (
  //     productJson.productInsurableItems[key].productCovers[key1].productBenefits[
  //       key2
  //     ].basedOn.toString() === "2" &&
  //     GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit ===
  //       productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //         .benefitName
  //   ) {
  //     BenefitDetails.Value = GroupDetails.SectionMappingDetails.BenefitDetails[i].Value;
  //     BenefitDetails.BenefitCurrencyType =
  //       GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitCurrencyType;
  //     BenefitDetails.DeductibleType =
  //       GroupDetails.SectionMappingDetails.BenefitDetails[i].DeductibleType;
  //     BenefitDetails.Deductible = GroupDetails.SectionMappingDetails.BenefitDetails[i].Deductible;
  //     BenefitDetails.BenefitType =
  //       GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitType;
  //     // BenefitDetails.PremiumType =
  //     //   GroupDetails.SectionMappingDetails.BenefitDetails[i].PremiumType;
  //     BenefitDetails.IsOptional = GroupDetails.SectionMappingDetails.BenefitDetails[i].IsOptional;
  //     const value =
  //       Number(
  //         productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //           .showCoverValue
  //       ) *
  //       Number(
  //         productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //           .limitValue
  //       ) *
  //       0.01;
  //     setLValue(value);
  //     setFlagCalc2(true);
  //     setLimit(
  //       productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //         .limitValue
  //     );
  //   } else if (
  //     productJson.productInsurableItems[key].productCovers[key1].productBenefits[
  //       key2
  //     ].basedOn.toString() === "3" &&
  //     GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit ===
  //       productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //         .benefitName
  //   ) {
  //     BenefitDetails.Value = GroupDetails.SectionMappingDetails.BenefitDetails[i].Value;
  //     BenefitDetails.BenefitCurrencyType =
  //       GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitCurrencyType;
  //     BenefitDetails.DeductibleType =
  //       GroupDetails.SectionMappingDetails.BenefitDetails[i].DeductibleType;
  //     BenefitDetails.Deductible = GroupDetails.SectionMappingDetails.BenefitDetails[i].Deductible;
  //     BenefitDetails.BenefitType =
  //       GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitType;
  //     // BenefitDetails.PremiumType =
  //     //   GroupDetails.SectionMappingDetails.BenefitDetails[i].PremiumType;
  //     BenefitDetails.IsOptional = GroupDetails.SectionMappingDetails.BenefitDetails[i].IsOptional;
  //     setFlagCalc3(true);
  //     setBaseValue(
  //       productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
  //         .basePlanValue
  //     );
  //     setLimitB(
  //       productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].baseValue
  //     );
  //   }
  //   setBenefitDetails((prev) => ({ ...prev, ...BenefitDetails }));
  // });
  // };
  const [benefitDetailsGrid, setBenefitDetailsGrid] = useState([]);
  const handleInput = (e, value, id) => {
    // debugger;
    benefitDetailsGrid[id][e.target.id.split("-")[0]] = value;
    setBenefitDetailsGrid([...benefitDetailsGrid]);
    // logic here
  };

  const handleBenefitOpen = async (e, Iindex, Cindex, Bindex) => {
    // setBenefitDetailsGrid([]);
    //  debugger;
    setBenefitDetailsGrid([]);
    benefitDetailsGrid.forEach((x, i) => {
      benefitDetailsGrid[i].sno = i;
    });
    setBenefitDetailsGrid([...benefitDetailsGrid]);

    productJson.productInsurableItems.forEach((abc, i) =>
      productJson.productInsurableItems[i].covers.forEach((abc1, i1) =>
        productJson.productInsurableItems[i].covers[i1].benefits.forEach((abc2, i2) => {
          if (i === Iindex && i1 === Cindex && i2 === Bindex) {
            setOpen(true);
          }
        })
      )
    );

    //  addList(Iindex, Cindex, Bindex);
  };

  const mapIt = () => {
    // debugger;
    setBenefitDetailsGrid([]);

    GroupDetails.SectionMappingDetails.BenefitDetails = [
      ...GroupDetails.SectionMappingDetails.BenefitDetails,
      ...benefitDetailsGrid,
    ];
    setGroupDetails((prev) => ({ ...prev, ...GroupDetails }));
    setOpen(false);

    // GroupDetails.SectionMappingDetails.BenefitDetails = [
    //   ...GroupDetails.SectionMappingDetails.BenefitDetails,
    //   { ...BenefitDetails },
    // ];
  };
  const handleClose = () => {
    setOpen(false);
    setFinalModalFlag(false);
    // setMapFlag(true);
  };

  // const handleAddCriterias = (e, type) => {
  //   if (type === "si") {
  //     if (siValue === "") {
  //       setValidationFlag2(true);
  //     } else if (passId2 > -1) {
  //       saveDto[passId2].GroupDetailsJson.SectionMaster.SI.push(siValue);
  //       setValidationFlag2(false);
  //       setSaveDto([...saveDto]);
  //     } else {
  //       GroupDto.GroupDetailsJson.SectionMaster.SI.push(siValue);
  //       setValidationFlag2(false);
  //       setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  //     }

  //     setSiValue("");
  //   } else if (type === "type") {
  //     if (typeValue === "") {
  //       setValidationFlag3(true);
  //     } else if (passId2 > -1) {
  //       saveDto[passId2].GroupDetailsJson.SectionMaster.Type.push(typeValue);
  //       setValidationFlag3(false);
  //       setSaveDto([...saveDto]);
  //     } else {
  //       GroupDto.GroupDetailsJson.SectionMaster.Type.push(typeValue);
  //       setValidationFlag3(false);
  //       setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  //     }
  //     setTypeValue("");
  //   } else if (type === "region") {
  //     if (regionValue === "") {
  //       setValidationFlag4(true);
  //     } else if (passId2 > -1) {
  //       saveDto[passId2].GroupDetailsJson.SectionMaster.Region.push(regionValue);
  //       setValidationFlag4(false);
  //       setSaveDto([...saveDto]);
  //     } else {
  //       GroupDto.GroupDetailsJson.SectionMaster.Region.push(regionValue);
  //       setValidationFlag4(false);
  //       setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  //     }
  //     setRegionValue("");
  //   }
  // };
  // const handleDeleteCriterias = (e, type) => {
  //   if (type === "si") {
  //     GroupDto.GroupDetailsJson.SectionMaster.SI.pop();
  //   } else if (type === "type") {
  //     GroupDto.GroupDetailsJson.SectionMaster.Type.pop();
  //   } else if (type === "region") {
  //     GroupDto.GroupDetailsJson.SectionMaster.Region.pop();
  //   } else if (type === "currency") {
  //     GroupDto.GroupDetailsJson.SectionMaster.currency.pop();
  //   }
  //   setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  // };
  // const handleDeleteCriterias1 = (e, type) => {
  //   if (type === "si") {
  //     saveDto[passId2].GroupDetailsJson.SectionMaster.SI.pop();
  //   } else if (type === "type") {
  //     saveDto[passId2].GroupDetailsJson.SectionMaster.Type.pop();
  //   } else if (type === "region") {
  //     saveDto[passId2].GroupDetailsJson.SectionMaster.Region.pop();
  //   } else if (type === "currency") {
  //     saveDto[passId2].GroupDetailsJson.SectionMaster.currency.pop();
  //   }
  //   setSaveDto([...saveDto]);
  // };

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      width: 150,
    },
    {
      field: "groupName",
      headerName: "Plan",
      width: 250,
    },
    {
      field: "vieworupdate",
      headerName: "View/Update",
      width: 250,
      renderCell: (param) => {
        console.log("param", param);
        const handleDrawer = () => {
          setPassId2(param.row.id);
          setDrawer(true);
        };

        const handleDrawer1 = () => {
          setPassId2(param.row.id);
          setDrawer1(true);
        };

        const handleCloseDrawer = () => {
          setDrawer(false);
        };
        const handleCloseDrawer1 = () => {
          setDrawer1(false);
        };
        const handleEditDelete = (x, key1) => {
          const newArr = saveDto[passId2].GroupDetailsJson.SectionMaster[x].filter(
            (a, a1) => a1 !== key1
          );
          saveDto[passId2].GroupDetailsJson.SectionMaster[x] = [];
          saveDto[passId2].GroupDetailsJson.SectionMaster[x] = [...newArr];
          setSaveDto([...saveDto]);
        };

        const handleDeleteRow = (x) => {
          // debugger;
          let obj = {};
          Object.entries(saveDto[passId2].GroupDetailsJson.SectionMaster).forEach((z) => {
            if (z[0] !== x) {
              // delete saveDto[passId2].GroupDetailsJson.SectionMaster[zi];
              obj = { ...obj, [z[0]]: z[1] };
            }
          });
          saveDto[passId2].GroupDetailsJson.SectionMaster = {};
          saveDto[passId2].GroupDetailsJson.SectionMaster = {
            ...saveDto[passId2].GroupDetailsJson.SectionMaster,
            ...obj,
          };
          setSaveDto([...saveDto]);
        };
        return (
          <>
            <Grid container flexDirection="row">
              <IconButton color="primary" onClick={handleDrawer1}>
                <Visibility />
              </IconButton>
              <IconButton
                onClick={handleDrawer}
                disabled={param.row.id > -1 ? saveDto[param.row.id].disableDeleteFlag : null}
                color={
                  param.row.id > -1 && saveDto[param.row.id].disableDeleteFlag === true
                    ? "default"
                    : "primary"
                  // : null
                }
              >
                <Edit />
              </IconButton>
            </Grid>

            <Drawer
              anchor="right"
              open={drawer}
              onClose={handleCloseDrawer}
              PaperProps={{
                sx: { width: "50%", padding: "32px" },
              }}
            >
              <MDBox role="presentation">
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                    <MDTypography variant="h6">Edit Criterias</MDTypography>
                  </Grid>
                  {/* <Grid container spacing={2} p={2}> */}
                  <Grid item xs={12} md={3} sm={12}>
                    <MDInput
                      label="Type"
                      name="type"
                      value={filterObj.type}
                      onChange={(e) => handleFilterChange(e, "type")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <MDInput
                      label="Enter Value"
                      name="filterValue"
                      value={filterValue}
                      icon="Add"
                      onChange={(e) => handleFilterChange(e, "filterValue")}
                      onIconClick={(e) => handleFilterChange(e, "add")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sm={12}>
                    <MDInput
                      label="List of Values"
                      value={filterObj.valueList.map((x) => x)}
                      multiline
                    />
                  </Grid>
                  {/* </Grid> */}
                  <br />
                  <Grid container justifyContent="center" alignItems="center" display="flex">
                    <MDButton onClick={() => handleFilterAdd("edit")}>Add</MDButton>
                  </Grid>
                  <br />
                  {passId2 > -1 &&
                    Object.entries(saveDto[passId2].GroupDetailsJson.SectionMaster).map((x) => (
                      <>
                        <Grid item xs={12} sm={12} md={1} xl={1} xxl={1}>
                          <IconButton color="primary" onClick={() => handleDeleteRow(x[0])}>
                            <Delete />
                          </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} xl={3} xxl={3}>
                          <MDTypography variant="h6">{x[0]}</MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} xl={8} xxl={8}>
                          {x[1].map((y, j) => (
                            <Chip label={y} onDelete={() => handleEditDelete(x[0], j)} />
                          ))}
                        </Grid>
                      </>
                    ))}
                </Grid>
                <Grid container justifyContent="center">
                  <MDButton varinat="outlined" onClick={handleCloseDrawer}>
                    Update
                  </MDButton>
                </Grid>
              </MDBox>
            </Drawer>

            <Drawer
              anchor="right"
              open={drawer1}
              onClose={handleCloseDrawer1}
              PaperProps={{
                sx: { width: "50%", padding: "32px" },
              }}
            >
              <MDBox role="presentation">
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                    <MDTypography variant="h6">View Criterias</MDTypography>
                  </Grid>
                  {passId2 > -1 &&
                    Object.entries(saveDto[passId2].GroupDetailsJson.SectionMaster).map((x) => (
                      <>
                        <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                          <MDTypography variant="h6">{x[0]}</MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} xl={8} xxl={8}>
                          {x[1].map((y) => (
                            <Chip label={y} />
                          ))}
                        </Grid>
                      </>
                    ))}
                </Grid>
              </MDBox>
            </Drawer>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (param) => {
        const addBenefits = () => {
          setGroupDetails((prev) => ({ ...prev, ...GroupDetailsD }));

          setArr({});
          Object.entries(saveDto[param.row.id].GroupDetailsJson.SectionMaster).forEach((x) => {
            GroupDetails.FilterCriteria = { ...GroupDetails.FilterCriteria, [x[0]]: "" };
          });
          saveDto[param.row.id].disableDeleteFlag = true;

          setSaveDto([...saveDto]);

          console.log("param id", param);
          setPassId(param.row.id);
          setAddFlag(true);
          setArr((prev) => ({ ...prev, ...saveDto[param.row.id].GroupDetailsJson.SectionMaster }));
        };
        return (
          <IconButton
            onClick={addBenefits}
            disabled={param.row.id > -1 ? saveDto[param.row.id].disableDeleteFlag : null}
          >
            <MDButton
              color={saveDto[param.row.id].disableDeleteFlag === true ? "light" : "primary"}
            >
              Add Benefits
            </MDButton>
          </IconButton>
        );
      },
    },

    {
      field: "deletePlan",
      headerName: "Delete Plan",
      width: 250,
      renderCell: (param) => {
        console.log("param", param);
        const handleDelete = () => {
          const newArr = saveDto.filter((x) => (x.id !== param.row.id ? x : null));
          newArr.forEach((r, i) => {
            newArr[i].id = i;
          });
          if (newArr.length === 0) {
            setValidationFlag1(false);
            showGrid(false);
            setGroupTypeId({ mID: 0, mValue: "" });
            setGroupName("");
          } else if (newArr.length > 0) {
            setValidationFlag1(false);
            setGroupTypeId({ mID: 0, mValue: "" });
            setGroupName("");
          }
          setSaveDto([...newArr]);
        };
        return (
          <IconButton
            onClick={handleDelete}
            disabled={param.row.id > -1 ? saveDto[param.row.id].disableDeleteFlag : null}
            color={
              param.row.id > -1 && saveDto[param.row.id].disableDeleteFlag === true
                ? "default"
                : "primary"
              // : null
            }
          >
            <Delete />
          </IconButton>
        );
      },
    },
  ];
  const columns1 = [
    // {
    //   field: "id",
    //   headerName: "S.No",
    //   width: 150,
    // },
    {
      field: "groupName",
      headerName: "Plan Name",
      width: 400,
    },
    {
      field: "vieworupdate",
      headerName: "View/Update",
      width: 250,
      renderCell: (param) => {
        console.log("param1", saveDto);
        console.log("param", param);
        const handleFinalModal = () => {
          setFinalModalFlag(true);
          setPassId1(param.row.id);
        };
        return (
          <IconButton onClick={handleFinalModal}>
            <Visibility />
          </IconButton>
        );
      },
    },
  ];

  const columns2 = [
    { field: "sno", headerName: "S.No", width: 50 },

    {
      field: "type",
      headerName: "Type",
      width: 200,
    },

    {
      field: "name",
      headerName: "Name",
      width: 200,
    },

    {
      field: "value",
      headerName: "Value",
      width: 200,
    },

    {
      field: "min",
      headerName: "Min",
      width: 200,
    },
    {
      field: "max",
      headerName: "Max",
      width: 200,
    },

    {
      field: "plusMinus",
      headerName: "PlusMinus",
      width: 200,
    },
  ];

  useEffect(async () => {
    // debugger;
    const products = await getProducts();
    if (products.data.length > 0) {
      Object.keys(products.data).map((x, key) => {
        if (products.data[key].productStatusId === 38) {
          productData.push({
            mID: products.data[key].productId,
            mValue: products.data[key].productName,
          });
        }
        return null;
      });
      setProductData(productData);
      console.log("productData", productData);
    }

    const masterData = await getMasterData();
    if (masterData.status === 200) {
      Object.keys(masterData.data).forEach((a, key1) => {
        if (masterData.data[key1].mType === "Section") setGroupingData(masterData.data[key1].mdata);
        // else if
        //  (masterData.data[key1].mType === "Currency") {
        //   setCurrencyMaster(masterData.data[key1].mdata);
        // }
        //  else if (masterData.data[key1].mType === "PremiumType") {
        //   setPremiumMaster(masterData.data[key1].mdata);
        // }
      });
    }

    const coversapi = await getCoverData();
    console.log("covers", covers);
    if (coversapi.status === 200) {
      setCovers(coversapi.data);
    }

    // const criteria = await getProductMaster("BenefitCriteria", 0);
    // console.log("criteria", criteria);
    // setBenefitCriteria(criteria);
    //  console.log()
  }, []);

  const handleGroupingType = (e) => {
    setThrowError(false);

    if (planList.length > 0) {
      planList.forEach((x) => {
        x.groupData.forEach((y) => {
          if (y.groupName === e.target.value) {
            setThrowError(true);
          }
        });
      });
    }
    GroupDto.groupName = e.target.value;
    setGroupName(e.target.value);
    setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  };

  const handleAutocomplete = async (e, value) => {
    // debugger;
    if (e.target.id.split("-")[0] === "productId") {
      GroupDto[e.target.id.split("-")[0]] = value.mID;
      setProductId(value.mID);
      const Json = await getProductJson(value.mID);
      console.log("json", Json);
      if (Json.status === 200) {
        console.log("1", Json.data);
        Json.data.finalResult.productInsurableItems.forEach((x, i) => {
          // debugger;
          Json.data.finalResult.productInsurableItems[i].covers.forEach((y, i1) => {
            // debugger;

            Json.data.finalResult.productInsurableItems[i].covers[i1].benefits.forEach((z) => {
              // debugger;
              Object.assign(z, {
                check: false,
                disableCheckbox: false,
                showEdit: false,
              });
              // if (z.basedOn === 1) {
              //   console.log("dont do anything");
              // } else if (z.basedOn === 2) {
              //   Object.assign(z, { limitValue: 0, showCoverValue: 0 });
              // } else if (z === 3) {
              //   Object.assign(z, { baseValue: 0, basePlanValue: 0 });
              // }
            });
          });
        });
        setProductJson(Json.data.finalResult);
      }

      const plans = await getAllPlansOnId(value.mID);
      if (plans.status === 200) {
        setPlanList(plans.data);
      }
    } else if (e.target.id.split("-")[0] === "groupTypeId") {
      GroupDto[e.target.id.split("-")[0]] = value.mID;
      setGroupTypeId(value);
    }
    setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  };
  useEffect(() => {
    console.log("12222222", productJson);
  }, [productJson]);

  const configureFilterCriteria = () => {
    setShowCriterias(true);
    setValidationFlag1(true);

    //  debugger;
    let obj = {};
    // const filterCriteria = [{ type: "SI", value: ["1000", "20000"] }];

    productJson.filterCriteria.forEach((x, i) => {
      obj = {
        ...obj,
        [productJson.filterCriteria[i].type]: productJson.filterCriteria[i].valueList,
      };
    });

    console.log(obj);

    GroupDto.GroupDetailsJson.SectionMaster = { ...obj };
    setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  };

  const configureIt = () => {
    setArr({});
    showGrid(true);

    setShowCriterias(false);

    if (saveDto.length === 0) {
      GroupDto.id = 0;
    } else {
      GroupDto.id = saveDto.length;
    }
    setSaveDto((prev) => [...prev, { ...GroupDto }]);
    setGroupDto(GroupDtoD);
  };

  const handleGroupDetails = (e, value, data) => {
    //  debugger;
    GroupDetails.FilterCriteria[data] = value;

    setGroupDetails((prev) => ({ ...prev, ...GroupDetails }));
    // if (arr.length > 0) {
    //   count += 1;
    // }
    // if (arr1.length > 0) {
    //   count += 1;
    // }
    // if (arr2.length > 0) {
    //   count += 1;
    // }
    // if (arr3.length > 0) {
    //   count += 1;
    // }

    // ac.push({ mID: value.mID, mValue: value.mValue });
    // setAc([...ac]);

    // if (ac.length === count) {
    //   setB(true);
    // }
  };

  // useEffect(()=>{

  // },[ac])
  const showBenefits = () => {
    //  debugger;
    setShowBenefitsFlag(true);
    productJson.productInsurableItems.forEach((x, i2) => {
      productJson.productInsurableItems[i2].covers.forEach((y, i1) => {
        productJson.productInsurableItems[i2].covers[i1].benefits.forEach((z, i) => {
          productJson.productInsurableItems[i2].covers[i1].benefits[i].check = false;
          productJson.productInsurableItems[i2].covers[i1].benefits[i].showEdit = false;
          // productJson.productInsurableItems[i2].productCovers[i1].productBenefits[
          //   i
          // ].disableCheckbox = false;
        });
      });
    });
    // condition to be checked if benefits have been grouped with same filter criteria
    //  debugger;
    let count = 0;
    // setAddFlag(false);

    if (saveDto[passId].GroupDetails.length > 0) {
      saveDto[passId].GroupDetails.map((x) => {
        Object.entries(x.FilterCriteria).map((y) => {
          if (y[1] === GroupDetails.FilterCriteria[y[0]]) {
            // setAddFlag(true);

            count += 1;

            if (Object.keys(x.FilterCriteria).length === count) {
              swal({
                text: "This FilterCriteria has already been chosen.Please Choose Other Combination of Filter Criteria To Proceed Further.",
                icon: "error",
                html: true,
              });
              Object.entries(saveDto[passId].GroupDetailsJson.SectionMaster).forEach((z) => {
                GroupDetailsD.FilterCriteria = { ...GroupDetailsD.FilterCriteria, [z[0]]: "" };
              });
              setGroupDetails(GroupDetailsD);
              setAddFlag(true);
              setShowBenefitsFlag(false);
            }
          } else {
            count -= 1;
            setShowBenefitsFlag(true);
            setGroupedFlag(false);

            return null;
          }
          return null;
        });
        return null;
      });
    }

    setProductJson((prev) => ({ ...prev, ...productJson }));
  };
  const setSectionCheckbox = (e, Iindex, Cindex, Bindex) => {
    // debugger;
    console.log("32", productJson);
    if (e.target.checked === true) {
      productJson.productInsurableItems[Iindex].covers[Cindex].benefits[Bindex].check =
        e.target.checked;
      productJson.productInsurableItems[Iindex].covers[Cindex].benefits[Bindex].showEdit =
        e.target.checked;
      const data = [];
      // let ruleCheck = [];
      productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
        Bindex
      ].benefitDetails.forEach(async (x, i) => {
        const ruleId =
          productJson.productInsurableItems[Iindex].covers[Cindex].benefits[Bindex].benefitDetails[
            i
          ].rule;

        const ruleExecutionPayload = {
          ruleParameter: { RuleName: ruleId },
          rateParameter: {},
          memberRules: [],
        };

        if (ruleId > 0) {
          const ruleParams = await getRulesParams(ruleId);
          console.log(ruleParams.paramObj);

          Object.entries(GroupDetails.FilterCriteria).map((y) => {
            ruleParams.paramObj.map((z) => {
              if (z === y[0]) {
                ruleExecutionPayload.ruleParameter = {
                  ...ruleExecutionPayload.ruleParameter,
                  [y[0]]: y[1],
                };
              }
              return null;
            });
            return null;
          });
          // debugger;
          const ruleExecution = await getRuleExecution(ruleId, ruleExecutionPayload);
          if (ruleExecution.successCode === "200") {
            const obj = {
              // sno: -1,
              type: "",
              name: "",
              min: "",
              max: "",
              valueList: [],
              value: "",
              plusMinus: "",
            };

            // obj.sno = // benefitDetailsGrid.length;
            //   productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
            //     Bindex
            //   ].benefitDetails[i].sno;
            obj.type =
              productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
                Bindex
              ].benefitDetails[i].type;
            obj.name =
              productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
                Bindex
              ].benefitDetails[i].name;
            obj.min =
              productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
                Bindex
              ].benefitDetails[i].min;
            obj.max =
              productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
                Bindex
              ].benefitDetails[i].max;
            obj.valueList = [
              ...productJson.productInsurableItems[Iindex].covers[Cindex].benefits[Bindex]
                .benefitDetails[i].value,
            ];

            obj.value = "";
            obj.plusMinus =
              productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
                Bindex
              ].benefitDetails[i].plusMinus;

            // data = [...data, { ...obj }];
            // debugger;
            // setOpen(true)
            setBenefitDetailsGrid((prev) => [...prev, { ...obj }]);
          }
          // else {
          //   setOpen(true);
          // }
        } else {
          const obj = {
            // sno: -1,
            type: "",
            name: "",
            min: "",
            max: "",
            valueList: [],
            value: "",
            plusMinus: "",
          };

          // obj.sno = // benefitDetailsGrid.length;
          //   productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
          //     Bindex
          //   ].benefitDetails[i].sno;
          obj.type =
            productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
              Bindex
            ].benefitDetails[i].type;
          obj.name =
            productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
              Bindex
            ].benefitDetails[i].name;
          obj.min =
            productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
              Bindex
            ].benefitDetails[i].min;
          obj.max =
            productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
              Bindex
            ].benefitDetails[i].max;
          obj.valueList = [
            ...productJson.productInsurableItems[Iindex].covers[Cindex].benefits[Bindex]
              .benefitDetails[i].value,
          ];

          obj.value = "";
          obj.plusMinus =
            productJson.productInsurableItems[Iindex].covers[Cindex].benefits[
              Bindex
            ].benefitDetails[i].plusMinus;

          // data = [...data, { ...obj }];
          // setBenefitDetailsGrid((prev) => [...prev, ...data]);

          setBenefitDetailsGrid((prev) => [...prev, { ...obj }]);
        }

        console.log(ruleExecutionPayload);
      });
      console.log("data", data);
    } else {
      productJson.productInsurableItems[Iindex].covers[Cindex].benefits[Bindex].check =
        e.target.checked;
      productJson.productInsurableItems[Iindex].covers[Cindex].benefits[Bindex].showEdit =
        e.target.checked;

      // GroupDetails.SectionMappingDetails.BenefitDetails.forEach((x, i) => {
      //   if (
      //     GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit ===
      //     productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
      //       .benefitName
      //   ) {
      //     GroupDetails.SectionMappingDetails.BenefitDetails.splice(i, 1);
      //     setGroupDetails((prev) => ({ ...prev, ...GroupDetails }));
      //   }
      // });
    }
    setProductJson((prev) => ({ ...prev, ...productJson }));

    // for cover si and basi si calculation part

    // if (
    //   productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].check ===
    //     true &&
    //   productJson.productInsurableItems[key].productCovers[key1].productBenefits[
    //     key2
    //   ].coverNameId.toString() !== ""
    // ) {
    //   Object.keys(covers).forEach((x, i) => {
    //     if (
    //       covers[i].mID.toString() ===
    //       productJson.productInsurableItems[key].productCovers[key1].productBenefits[
    //         key2
    //       ].coverNameId.toString()
    //     ) {
    //       const abc = covers[i].mValue;
    //       productJson.productInsurableItems.forEach((p, pi) => {
    //         productJson.productInsurableItems[pi].productCovers.forEach((p1, pi2) => {
    //           // debugger;
    //           if (
    //             productJson.productInsurableItems[pi].productCovers[pi2].cover === abc ||
    //             productJson.productInsurableItems[pi].productCovers[pi2].coverDescription === abc
    //           ) {
    //             Object.keys(GroupDetails.SectionMappingDetails.BenefitDetails).forEach((y, i1) => {
    //               if (GroupDetails.SectionMappingDetails.BenefitDetails[i1].CoverName === abc) {
    //                 setSiForCoverValue(GroupDetails.SectionMappingDetails.BenefitDetails[i1].Value);
    //               }
    //             });
    //           }
    //         });
    //       });
    //       console.log("abc", abc);
    //     }
    //   });
    // }

    // for disabling

    // if (
    //   productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].check ===
    //   true
    // ) {
    //   productJson.productInsurableItems[key].productCovers[key1].productBenefits.forEach(
    //     (item, key3) => {
    //       if (
    //         productJson.productInsurableItems[key].productCovers[key1].productBenefits[key3]
    //           .check === false
    //       ) {
    //         productJson.productInsurableItems[key].productCovers[key1].productBenefits[
    //           key3
    //         ].disableCheckbox = true;
    //         // this.setState({ productData });
    //       }
    //     }
    //   );
    // } else {
    //   productJson.productInsurableItems[key].productCovers[key1].productBenefits.forEach(
    //     (item, key3) => {
    //       if (
    //         productJson.productInsurableItems[key].productCovers[key1].productBenefits[key3]
    //           .check === false
    //       ) {
    //         productJson.productInsurableItems[key].productCovers[key1].productBenefits[
    //           key3
    //         ].disableCheckbox = false;
    //       }
    //     }
    //   );
    // }
  };
  const groupIt = () => {
    //   debugger;
    setAddFlag(false);

    if (
      GroupDetails.SectionMappingDetails.BenefitDetails.length === 0 &&
      saveDto[passId].GroupDetails.length === 0
    ) {
      //  this.setState({ showCard: false });
      swal({
        text: "Not Even a Single Benefit is Configured",
        icon: "error",
        html: true,
      });
    } else if (
      GroupDetails.SectionMappingDetails.BenefitDetails.length === 0 &&
      saveDto[passId].GroupDetails.length > 0
    ) {
      swal({
        text: "Please Map atleast one benefit",
        icon: "error",
        html: true,
      });
    } else if (GroupDetails.SectionMappingDetails.BenefitDetails.length > 0) {
      // if (productData.policyType == "Group") {
      if (saveDto[passId].GroupDetails.length > 0) {
        saveDto[passId].GroupDetails = [...saveDto[passId].GroupDetails, { ...GroupDetails }];
        // }
      } else {
        saveDto[passId].GroupDetails.push(GroupDetails);
      }
      // }
      setGroupedFlag(true);
    }
    setSaveDto([...saveDto]);

    setShowBenefitsFlag(false);

    setValidationFlag1(false);
    //  setB(false);
    setGroupTypeId({ mID: 0, mValue: "" });
    setGroupName();
  };
  const handleFilterDelete = (x, key1) => {
    const newArr = GroupDto.GroupDetailsJson.SectionMaster[x].filter((a, a1) => a1 !== key1);
    GroupDto.GroupDetailsJson.SectionMaster[x] = [];
    GroupDto.GroupDetailsJson.SectionMaster[x] = [...newArr];
    setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  };

  const handleDeleteFilterRow = (x) => {
    // debugger;
    let obj = {};
    Object.entries(GroupDto.GroupDetailsJson.SectionMaster).forEach((z) => {
      if (z[0] !== x) {
        // delete saveDto[passId2].GroupDetailsJson.SectionMaster[zi];
        obj = { ...obj, [z[0]]: z[1] };
      }
    });
    GroupDto.GroupDetailsJson.SectionMaster = {};
    GroupDto.GroupDetailsJson.SectionMaster = {
      ...GroupDto.GroupDetailsJson.SectionMaster,
      ...obj,
    };
    setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  };
  useEffect(() => {
    // debugger;

    if (saveDto.length > 0) {
      if (showBenefitsFlag === false && groupedFlag === true) {
        Object.entries(saveDto[passId].GroupDetailsJson.SectionMaster).forEach((x) => {
          GroupDetailsD.FilterCriteria = { ...GroupDetailsD.FilterCriteria, [x[0]]: "" };
        });
        setGroupDetails(GroupDetailsD);
        setAddFlag(true);
      }
    }
  }, [groupedFlag]);

  useEffect(() => {
    console.log("saveDto", saveDto);
  }, [saveDto]);
  useEffect(() => {
    console.log("GroupDetails", GroupDetails);
  }, [GroupDetails]);

  // const deleteAtViewBenefits = (id) => {
  //   swal("Are you sure you want to Delete the Benefits?", {
  //     buttons: {
  //       cancel: {
  //         text: "No",
  //         value: true,
  //         visible: true,
  //         className: "",
  //         closeModal: true,
  //       },
  //       confirm: {
  //         text: "Yes",
  //         value: "confirm",
  //         visible: true,
  //         className: "",
  //         closeModal: true,
  //       },
  //     },
  //   }).then((value) => {
  //     if (value === "confirm") {
  //       saveDto[passId].GroupDetails.splice(id, 1);
  //       setSaveDto([...saveDto]);
  //     }
  //   });
  // };
  // const handleSave = async () => {
  //   saveDto.forEach((x, key) => {
  //     delete saveDto[key].id;
  //     delete saveDto[key].disableDeleteFlag;

  //     if (saveDto[key].productId === 0) {
  //       saveDto[key].productId = productId;
  //     }
  //   });

  //   const result = await saveCoverGrouping(saveDto);

  //   if (result.data.status === 2) {
  //     swal({
  //       text: result.data.responseMessage,
  //       icon: "success",
  //     });
  //   } else {
  //     swal({
  //       text: result.data.responseMessage,
  //       icon: "error",
  //     });
  //   }
  //   setTimeout(() => window.location.reload(), 5000);
  // };
  return (
    <MDBox sx={{ width: "100%" }}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <MDTypography variant="h5">Cover Grouping</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
              {productData.length > 0 ? (
                <Autocomplete
                  id="productId"
                  options={productData}
                  getOptionLabel={(option) => option.mValue}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  onChange={handleAutocomplete}
                  // disabled={validationFlag1}

                  renderInput={(params) => <MDInput {...params} label="Select Product" />}
                />
              ) : (
                <Skeleton animate="wave" variant="rectangle" height={60} />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
              {productData.length > 0 ? (
                <Autocomplete
                  id="groupTypeId"
                  options={groupingData}
                  getOptionLabel={(option) => option.mValue}
                  value={groupTypeId}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  onChange={handleAutocomplete}
                  disabled={validationFlag1}
                  // value={}
                  renderInput={(params) => <MDInput {...params} label="Select Grouping Type" />}
                />
              ) : (
                <Skeleton animate="wave" variant="rectangle" height={60} />
              )}
            </Grid>
            {groupTypeId.mID > 0 ? (
              <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                <MDInput
                  name="groupName"
                  // value={GroupDto.groupName}
                  value={groupName}
                  onChange={handleGroupingType}
                  disabled={validationFlag1}
                  helperText={
                    throwError === true ? <p style={{ color: "red" }}>Plan Already Exits</p> : null
                  }
                  label={`${groupingData.filter((i) => i.mID === groupTypeId.mID)[0].mValue}
                  ${" "}${"Name"}`}
                />
              </Grid>
            ) : null}
          </Grid>
          <br />
          {GroupDto.groupName !== "" && throwError === false ? (
            <Grid container justifyContent="center">
              <MDButton variant="outlined" onClick={configureFilterCriteria}>
                Configure Plan
              </MDButton>
            </Grid>
          ) : null}
          <br />

          {showCriterias === true ? (
            <>
              <MDTypography variant="h5">Filter Criteria</MDTypography>

              <Grid container spacing={2} p={2}>
                <Grid item xs={12} md={3} sm={12}>
                  <MDInput
                    label="Type"
                    name="type"
                    value={filterObj.type}
                    onChange={(e) => handleFilterChange(e, "type")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <MDInput
                    label="Enter Value"
                    name="filterValue"
                    value={filterValue}
                    icon="Add"
                    onChange={(e) => handleFilterChange(e, "filterValue")}
                    onIconClick={(e) => handleFilterChange(e, "add")}
                  />
                </Grid>
                <Grid item xs={12} md={6} sm={12}>
                  <MDInput
                    label="List of Values"
                    value={filterObj.valueList.map((x) => x)}
                    multiline
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" alignItems="center" display="flex">
                <MDButton onClick={() => handleFilterAdd("base")}>Add</MDButton>
              </Grid>

              <Grid container spacing={2} p={2}>
                {Object.entries(GroupDto.GroupDetailsJson.SectionMaster).map((x) => (
                  <>
                    <Grid item xs={12} sm={12} md={0.5} lg={0.5}>
                      <IconButton
                        color="primary"
                        onClick={() => handleDeleteFilterRow(x[0])}
                        sx={{ top: "-6px" }}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.5} lg={2.5}>
                      <MDTypography variant="h6">{x[0]}</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9}>
                      {x[1].map((y, j) => (
                        <Chip label={y} onDelete={() => handleFilterDelete(x[0], j)} />
                      ))}
                    </Grid>
                  </>
                ))}
              </Grid>
            </>
          ) : null}

          <Grid container justifyContent="center">
            <MDButton variant="outlined" onClick={configureIt}>
              Configure
            </MDButton>
          </Grid>
          {/* ) : null} */}
          <br />

          {grid === true ? (
            <MDBox>
              <DataGrid
                autoHeight
                rows={saveDto}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
                getRowId={(option) => option.id}
                editField="inEdit"
              />
            </MDBox>
          ) : null}
          <br />
          {addFlag === true ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                <MDTypography variant="h5">Plan:{saveDto[passId].groupName}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={2} xl={2} xxl={2}>
                <MDTypography variant="h6">Filter Criteria:</MDTypography>
              </Grid>
              {Object.entries(arr).map((x) => (
                <Grid item xs={12} sm={12} md={2} xl={2} xxl={2}>
                  <Autocomplete
                    id={x[0]}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    options={x[1]}
                    value={
                      GroupDetails.FilterCriteria[x[0]] !== ""
                        ? GroupDetails.FilterCriteria[x[0]]
                        : ""
                    }
                    renderInput={(param) => <MDInput {...param} label={x[0]} />}
                    onChange={(e, value) => handleGroupDetails(e, value, x[0])}
                  />
                </Grid>
              ))}

              <br />
              {/* {b === true ? ( */}
              <Grid container justifyContent="center">
                <MDButton variant="outlined" onClick={showBenefits} sx={{ top: "12px" }}>
                  Show Benefits
                </MDButton>
              </Grid>
              {/* ) : null} */}

              {/* ) : null} */}
            </Grid>
          ) : null}

          <br />
        </AccordionDetails>
      </Accordion>
      {showBenefitsFlag === true ? (
        <BenefitMapping
          productJson={productJson}
          setSectionCheckbox={setSectionCheckbox}
          handleClose={handleClose}
          open={open}
          handleBenefitOpen={handleBenefitOpen}
          benefitDetailsGrid={benefitDetailsGrid}
          handleInput={handleInput}
          mapIt={mapIt}
          groupIt={groupIt}
        />
      ) : null}

      {saveDto.length > 0 ? (
        // && groupedFlag === true
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <MDTypography variant="h6">Grouped Benefits</MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <MDBox>
              <DataGrid
                autoHeight
                rows={saveDto.filter((x) => x.GroupDetails.length > 0)}
                columns={columns1}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
                getRowId={(option) => option.id}
                editField="inEdit"
              />
            </MDBox>
            <Grid container justifyContent="center">
              <MDButton
                variant="contained"
                //  onClick={handleSave}
              >
                Save
              </MDButton>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : null}

      <Modal
        hideBackdrop
        open={finalModalFlag}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <MDBox sx={style}>
          <Grid container justifyContent="end" alignItems="end">
            <MDButton onClick={handleClose}>
              <RemoveIcon />
            </MDButton>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5">View Benefits</MDTypography>
            </Grid>
            {saveDto.length > 0 && passId1 > -1
              ? saveDto[passId1].GroupDetails.length > 0 &&
                saveDto[passId1].GroupDetails.map((x, key) => (
                  <>
                    <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                      <MDTypography variant="h6" sx={{ "margin-left": "-850px" }}>
                        Filter Criteria
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                      <IconButton
                        color="primary"
                        // onClick={() => deleteAtViewBenefits(key)}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                    {Object.entries(x.FilterCriteria).map((y) => (
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography variant="h6">
                          {y[0]}:{y[1]}
                        </MDTypography>
                      </Grid>
                    ))}

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <DataGrid
                        autoHeight
                        rows={
                          saveDto[passId1].GroupDetails[key].SectionMappingDetails.BenefitDetails
                        }
                        columns={columns2}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        components={{ Toolbar: GridToolbar }}
                        getRowId={(option) => option.sno}
                        // editField="inEdit"
                      />
                    </Grid>
                  </>
                ))
              : null}
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}

export default CoverGrouping;
