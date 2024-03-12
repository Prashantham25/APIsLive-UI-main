import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Autocomplete,
  Modal,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Drawer,
  Chip,
  Skeleton,
} from "@mui/material";

import { ExpandMore, Delete, Visibility, Edit, Close } from "@mui/icons-material";
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
  saveCoverGrouping,
  getProductMaster,
} from "./data/index";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import BenefitMapping from "./BenefitMapping";

const style = {
  position: "absolute",
  top: "-1%",
  left: "76%",
  transform: "translate(-85%, 6%)",
  width: 1200,
  height: 720,
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
  const [productData, setProductData] = useState([]);
  const [groupingData, setGroupingData] = useState([]);
  const [covers, setCovers] = useState([]);
  const [siForCoverValue, setSiForCoverValue] = useState("");
  const [finalModalFlag, setFinalModalFlag] = useState(false);
  const [groupTypeId, setGroupTypeId] = useState({ mID: 0, mValue: "" });
  const [groupName, setGroupName] = useState("");
  const [ac, setAc] = useState([]);
  const [b, setB] = useState(false);
  const [planList, setPlanList] = useState([]);
  const [throwError, setThrowError] = useState(false);
  const [benefitCriteria, setBenefitCriteria] = useState([]);
  const childRef = useRef(null);
  const [GroupDto, setGroupDto] = useState({
    id: -1,
    productId: 0,
    groupTypeId: 0.0,
    groupName: "",
    disableDeleteFlag: false,

    isActive: true,
    GroupDetailsJson: {
      SectionMaster: {
        SI: [],
        Type: [],
        Region: [],
        currency: [],
      },
      InputObj: "",
      OutputObj: "",
      DisplayName: "",
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
      SI: "",
      Type: "",
      Region: "",
      currency: "",
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
      SI: "",
      Type: "",
      Region: "",
      currency: "",
    },
    SectionMappingDetails: {
      BenefitDetails: [],
    },
  };

  const [BenefitDetails, setBenefitDetails] = useState({
    BenefitID: 0,
    CoverName: "",
    Benefit: "",
    BenefitCurrencyType: "",
    Value: "",
    BenefitType: "",
    BenefitCriteria: "",
    DeductibleType: "",
    Deductible: "",
    IsOptional: false,
    // PremiumType: "",
  });

  const BenefitDetailsD = {
    BenefitID: 0,
    CoverName: "",
    Benefit: "",
    BenefitCurrencyType: "",
    Value: "",
    BenefitType: "",
    BenefitCriteria: "",
    DeductibleType: "",
    Deductible: "",
    IsOptional: false,
    // PremiumType: "",
  };
  const GroupDtoD = {
    productId: 0,
    groupTypeId: 0.0,
    groupName: "",
    disableDeleteFlag: false,
    isActive: true,
    GroupDetailsJson: {
      SectionMaster: {
        SI: [],
        Type: [],
        Region: [],
        currency: [],
      },
      InputObj: "",
      OutputObj: "",
    },
    GroupDetails: [],
  };

  const [saveDto, setSaveDto] = useState([]);
  const [showCriterias, setShowCriterias] = useState(false);
  const [isSi, setIsSi] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isRegion, setIsRegion] = useState(false);
  const [isCurrency, setIsCurrency] = useState(false);
  const [siValue, setSiValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [regionValue, setRegionValue] = useState("");
  const [currencyMaster, setCurrencyMaster] = useState([]);
  // const [premiumMaster, setPremiumMaster] = useState([]);
  const [grid, showGrid] = useState(false);
  const [passId, setPassId] = useState(-1);
  const [passId1, setPassId1] = useState(-1);
  const [passId2, setPassId2] = useState(-1);
  const [drawer, setDrawer] = useState(false);
  const [drawer1, setDrawer1] = useState(false);

  const [addFlag, setAddFlag] = useState(false);
  const [showBenefitsFlag, setShowBenefitsFlag] = useState(false);
  const [productJson, setProductJson] = useState({});
  const [showStandardSi, setStandardSi] = useState(false);
  const [showBaseSi, setBaseSi] = useState(false);
  const [showCoverSi, setCoverSi] = useState(false);
  const [dedType, setDedType] = useState([]);
  const [dedAmt, setDedAmt] = useState([]);
  const [benefitLevel, setBenefitLevel] = useState([]);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [premiumType, setPremiumType] = useState([]);
  const [si, setSi] = useState();
  const [limit, setLimit] = useState();
  const [limitB, setLimitB] = useState();
  const [siObj, setSiObj] = useState([]);
  const [limitObj, setLimitObj] = useState([]);
  const [flagCalc1, setFlagCalc1] = useState(false);
  const [flagCalc2, setFlagCalc2] = useState(false);
  const [flagCalc3, setFlagCalc3] = useState(false);
  const [lValue, setLValue] = useState();
  const [baseValue, setBaseValue] = useState();
  const [criteriaCurrency, setCriteriaCurrency] = useState({ mID: 0, mValue: "" });
  const [criteriaSi, setCriteriaSi] = useState({ mID: 0, mValue: "" });
  const [criteriaType, setCriteriaType] = useState({ mID: 0, mValue: "" });
  const [criteriaRegion, setCriteriaRegion] = useState({ mID: 0, mValue: "" });
  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);
  const [groupedFlag, setGroupedFlag] = useState(false);
  const [validationFlag1, setValidationFlag1] = useState(false);
  const [validationFlag2, setValidationFlag2] = useState(false);
  const [validationFlag3, setValidationFlag3] = useState(false);
  const [validationFlag4, setValidationFlag4] = useState(false);
  const [mapFlag, setMapFlag] = useState(true);

  const benefitLstObj = [
    { mID: "502", mValue: "Benefit" },
    { mID: "503", mValue: "Indemnity" },
  ];
  console.log(GroupDetailsD);
  console.log(BenefitDetailsD);
  console.log(setLimit);
  console.log(limitB, setLimitB, flagCalc2, setFlagCalc2, flagCalc3, setFlagCalc3);

  const addList = (key, key1, key2, val1) => {
    //  debugger;
    console.log(val1);

    if (
      productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].siList
        .length > 0
    ) {
      const lst = [];

      Object.keys(
        productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].siList
      ).forEach((x1, i2) => {
        lst.push({
          mID: productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
            .siList[i2],
          mValue:
            productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].siList[
              i2
            ],
        });
      });

      console.log("lst", lst);
      // siObj = [...lst];
      // this.setState({ siObj });
      setSiObj(lst);
      // setSiObj([...lst])
      // setSiObj([siObj])

      console.log("siObj", siObj);
    } else {
      const lst1 = [];

      Object.keys(
        productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].limitList
      ).forEach((x2, i3) => {
        lst1.push({
          mID: productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
            .limitList[i3],
          mValue:
            productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
              .limitList[i3],
        });
      });

      console.log("lst", lst1);
      // limitObj = [...lst1];
      // this.setState({ limitObj });
      setLimitObj(lst1);

      console.log("limitObj", limitObj);
    }

    // reverse binding on edit click again
    GroupDetails.SectionMappingDetails.BenefitDetails.forEach((x, i) => {
      if (
        productJson.productInsurableItems[key].productCovers[key1].productBenefits[
          key2
        ].basedOn.toString() === "1" &&
        GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit ===
          productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
            .benefitName &&
        BenefitDetails.Benefit === GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit
      ) {
        BenefitDetails.Value = GroupDetails.SectionMappingDetails.BenefitDetails[i].Value;
        BenefitDetails.BenefitCurrencyType =
          GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitCurrencyType;
        BenefitDetails.DeductibleType =
          GroupDetails.SectionMappingDetails.BenefitDetails[i].DeductibleType;
        BenefitDetails.Deductible = GroupDetails.SectionMappingDetails.BenefitDetails[i].Deductible;
        BenefitDetails.BenefitType =
          GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitType;
        // BenefitDetails.PremiumType =
        //   GroupDetails.SectionMappingDetails.BenefitDetails[i].PremiumType;
        BenefitDetails.IsOptional = GroupDetails.SectionMappingDetails.BenefitDetails[i].IsOptional;
        setFlagCalc1(true);
        setSi(GroupDetails.SectionMappingDetails.BenefitDetails[i].Value);
      } else if (
        productJson.productInsurableItems[key].productCovers[key1].productBenefits[
          key2
        ].basedOn.toString() === "2" &&
        GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit ===
          productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
            .benefitName
      ) {
        BenefitDetails.Value = GroupDetails.SectionMappingDetails.BenefitDetails[i].Value;
        BenefitDetails.BenefitCurrencyType =
          GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitCurrencyType;
        BenefitDetails.DeductibleType =
          GroupDetails.SectionMappingDetails.BenefitDetails[i].DeductibleType;
        BenefitDetails.Deductible = GroupDetails.SectionMappingDetails.BenefitDetails[i].Deductible;
        BenefitDetails.BenefitType =
          GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitType;
        // BenefitDetails.PremiumType =
        //   GroupDetails.SectionMappingDetails.BenefitDetails[i].PremiumType;
        BenefitDetails.IsOptional = GroupDetails.SectionMappingDetails.BenefitDetails[i].IsOptional;
        const value =
          Number(
            productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
              .showCoverValue
          ) *
          Number(
            productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
              .limitValue
          ) *
          0.01;
        setLValue(value);

        setFlagCalc2(true);
        setLimit(
          productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
            .limitValue
        );
      } else if (
        productJson.productInsurableItems[key].productCovers[key1].productBenefits[
          key2
        ].basedOn.toString() === "3" &&
        GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit ===
          productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
            .benefitName
      ) {
        BenefitDetails.Value = GroupDetails.SectionMappingDetails.BenefitDetails[i].Value;
        BenefitDetails.BenefitCurrencyType =
          GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitCurrencyType;
        BenefitDetails.DeductibleType =
          GroupDetails.SectionMappingDetails.BenefitDetails[i].DeductibleType;
        BenefitDetails.Deductible = GroupDetails.SectionMappingDetails.BenefitDetails[i].Deductible;
        BenefitDetails.BenefitType =
          GroupDetails.SectionMappingDetails.BenefitDetails[i].BenefitType;
        // BenefitDetails.PremiumType =
        //   GroupDetails.SectionMappingDetails.BenefitDetails[i].PremiumType;
        BenefitDetails.IsOptional = GroupDetails.SectionMappingDetails.BenefitDetails[i].IsOptional;
        setFlagCalc3(true);
        setBaseValue(
          productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
            .basePlanValue
        );
        setLimitB(
          productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].baseValue
        );
      }

      setBenefitDetails((prev) => ({ ...prev, ...BenefitDetails }));
    });
  };
  const handleBenefitOpen = (e, Iindex, Cindex, Bindex) => {
    if (
      productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
        Bindex
      ].basedOn.toString() === "1"
    ) {
      setStandardSi(true);
    } else if (
      productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
        Bindex
      ].basedOn.toString() === "2"
    ) {
      setCoverSi(true);

      if (
        productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[Bindex]
          .check === true &&
        productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
          Bindex
        ].coverNameId.toString() !== ""
      ) {
        Object.keys(covers).forEach((x, i) => {
          if (
            covers[i].mID.toString() ===
            productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
              Bindex
            ].coverNameId.toString()
          ) {
            const abc = covers[i].mValue;
            productJson.productInsurableItems.forEach((p, pi) => {
              productJson.productInsurableItems[pi].productCovers.forEach((p1, pi2) => {
                // debugger;
                if (
                  productJson.productInsurableItems[pi].productCovers[pi2].cover === abc ||
                  productJson.productInsurableItems[pi].productCovers[pi2].coverDescription === abc
                ) {
                  Object.keys(GroupDetails.SectionMappingDetails.BenefitDetails).forEach(
                    (y, i1) => {
                      if (GroupDetails.SectionMappingDetails.BenefitDetails[i1].CoverName === abc) {
                        setSiForCoverValue(
                          GroupDetails.SectionMappingDetails.BenefitDetails[i1].Value
                        );
                      }
                    }
                  );
                }
              });
            });
            console.log("abc", abc);
          }
        });
      }
    } else {
      setBaseSi(true);
    }

    setVal(
      productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[Bindex]
        .basedOn
    );

    // this.setState({ val });
    // for setting benefit types such as 502,503

    productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
      Bindex
    ].benefitTypes.forEach((x, key) => {
      const type = benefitLstObj.filter(
        (i) =>
          i.mID.toString() ===
          productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
            Bindex
          ].benefitTypes[key].toString()
      )[0].mValue;
      benefitLevel.push({ mID: type, mValue: type });
      setBenefitLevel(benefitLevel);
    });

    // for dedType and dedAmt

    productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
      Bindex
    ].deductible.deductibleDto.forEach((itemi, keyi) => {
      //  // debugger;
      const type1 =
        productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[Bindex]
          .deductible.deductibleDto[keyi].deductableUnit;
      const type2 =
        productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[Bindex]
          .deductible.deductibleDto[keyi].deductableValue;
      if (dedType.length > 0) {
        dedType.forEach((x, i) => {
          if (dedType[i].mID !== type1) {
            dedType.push({ mID: type1, mValue: type1 });
          }
        });
        dedAmt.push({ mID: type2, mValue: type2 });
      } else {
        dedType.push({ mID: type1, mValue: type1 });
        dedAmt.push({ mID: type2, mValue: type2 });
      }

      console.log("dedType", dedType);
      console.log("dedAmt", dedAmt);
      setDedAmt(dedAmt);
      setDedType(dedType);
    });

    // if (
    //   productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[Bindex]
    //     .premiumType.length > 0
    // ) {
    //   productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
    //     Bindex
    //   ].premiumType.forEach((itemy) => {
    //     const type3 = premiumMaster.filter((x) => x.mID.toString() === itemy)[0].mValue;
    //     // productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[Bindex]
    //     //   .premiumType[keyy]
    //     premiumType.push({ mID: type3, mValue: type3 });
    //     setPremiumType(premiumType);
    //   });
    // }
    //  debugger;
    if (
      productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[Bindex]
        .benefitCriterias !== null
    ) {
      BenefitDetails.BenefitCriteria =
        productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
          Bindex
        ].benefitCriterias;
    } else {
      BenefitDetails.BenefitCriteria = benefitCriteria.filter(
        (x) =>
          x.mID.toString() ===
          productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
            Bindex
          ].benefitTypeId.toString()
      )[0].mValue;
    }

    // // debugger;

    BenefitDetails.BenefitCurrencyType = currencyMaster.filter(
      (z) =>
        z.mID.toString() ===
        productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
          Bindex
        ].currencyId.toString()
    )[0].mValue;

    BenefitDetails.BenefitID =
      productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
        Bindex
      ].benefitId;
    BenefitDetails.Benefit =
      productJson.productInsurableItems[Iindex].productCovers[Cindex].productBenefits[
        Bindex
      ].benefitName;
    // BenefitDetails.BenefitType=;
    if (productJson.productInsurableItems[Iindex].productCovers[Cindex].cover !== null) {
      BenefitDetails.CoverName =
        productJson.productInsurableItems[Iindex].productCovers[Cindex].cover;
    } else {
      BenefitDetails.CoverName =
        productJson.productInsurableItems[Iindex].productCovers[Cindex].coverDescription;
    }

    productJson.productInsurableItems.forEach((abc, i) =>
      productJson.productInsurableItems[i].productCovers.forEach((abc1, i1) =>
        productJson.productInsurableItems[i].productCovers[i1].productBenefits.forEach(
          (abc2, i2) => {
            if (i === Iindex && i1 === Cindex && i2 === Bindex) {
              setOpen(true);
            }
          }
        )
      )
    );

    setBenefitDetails((prev) => ({ ...prev, ...BenefitDetails }));
    addList(Iindex, Cindex, Bindex, val);
  };

  const handleChange = (e, value) => {
    // si = e.target.value;
    setSi(value.mValue);
    BenefitDetails.Value = value.mValue;
    setFlagCalc1(true);
    setBenefitDetails((prev) => ({ ...prev, ...BenefitDetails }));
  };

  const handleChange1 = (e, value) => {
    // debugger;
    const abc = (Number(siForCoverValue) * Number(value.mValue)) / 100;

    BenefitDetails.Value = abc;
    setLimit(value.mValue);
    setLValue(abc);
    setBenefitDetails((prev) => ({ ...prev, ...BenefitDetails }));
    setFlagCalc2(true);
    productJson.productInsurableItems.forEach((x, key) => {
      productJson.productInsurableItems[key].productCovers.forEach((y, key1) => {
        productJson.productInsurableItems[key].productCovers[key1].productBenefits.forEach(
          (z, key2) => {
            if (
              productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
                .benefitName === BenefitDetails.Benefit
            ) {
              productJson.productInsurableItems[key].productCovers[key1].productBenefits[
                key2
              ].limitValue = value.mValue;
              productJson.productInsurableItems[key].productCovers[key1].productBenefits[
                key2
              ].showCoverValue = siForCoverValue;
            }
          }
        );
      });
    });

    setProductJson((prev) => ({ ...prev, ...productJson }));
  };

  const handleChange2 = (e, value) => {
    const abc = Number(criteriaSi.mID) * Number(value.mValue) * 0.01;
    BenefitDetails.Value = abc;
    setBenefitDetails((prev) => ({ ...prev, ...BenefitDetails }));
    setBaseValue(abc);
    setLimitB(value.mValue);
    setFlagCalc3(true);
    productJson.productInsurableItems.forEach((x, key) => {
      productJson.productInsurableItems[key].productCovers.forEach((y, key1) => {
        productJson.productInsurableItems[key].productCovers[key1].productBenefits.forEach(
          (z, key2) => {
            if (
              productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
                .benefitName === BenefitDetails.Benefit
            ) {
              productJson.productInsurableItems[key].productCovers[key1].productBenefits[
                key2
              ].baseValue = value.mValue;
              productJson.productInsurableItems[key].productCovers[key1].productBenefits[
                key2
              ].basePlanValue = abc;
            }
          }
        );
      });
    });

    // if (
    //   productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
    //     .benefitName === BenefitDetails.Benefit
    // ) {
    //   productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].baseValue =
    //     value.mValue;
    //   productJson.productInsurableItems[key].productCovers[key1].productBenefits[
    //     key2
    //   ].basePlanValue = abc;
    // }
  };

  const handleBenefits = (e, value) => {
    //  debugger
    if (value !== undefined) {
      BenefitDetails[e.target.id.split("-")[0]] = value.mValue;
    } else {
      BenefitDetails[e.target.name] = e.target.checked;
    }
    setBenefitDetails((prev) => ({ ...prev, ...BenefitDetails }));

    if (dedType.length > 0 && dedAmt.length > 0) {
      if (
        BenefitDetails.Value !== "" &&
        BenefitDetails.BenefitCriteria !== "" &&
        BenefitDetails.BenefitCurrencyType !== "" &&
        BenefitDetails.DeductibleType !== "" &&
        BenefitDetails.Deductible !== "" &&
        BenefitDetails.Benefit !== "" &&
        BenefitDetails.BenefitType !== "" &&
        BenefitDetails.CoverName !== ""
        // &&
        // BenefitDetails.IsOptional == true
      ) {
        setMapFlag(false);
      } else {
        setMapFlag(true);
      }
    } else if (dedType.length === 0 && dedAmt.length === 0) {
      if (
        BenefitDetails.Value !== "" &&
        BenefitDetails.BenefitCriteria !== "" &&
        BenefitDetails.BenefitCurrencyType !== "" &&
        BenefitDetails.Benefit !== "" &&
        BenefitDetails.BenefitType !== "" &&
        BenefitDetails.CoverName !== ""
        // && BenefitDetails.IsOptional == true
      ) {
        setMapFlag(false);
      } else {
        setMapFlag(true);
      }
    }
  };
  const mapIt = () => {
    // // debugger;
    setBenefitDetails(BenefitDetailsD);
    setMapFlag(true);

    if (
      (BenefitDetails.Value !== "" &&
        BenefitDetails.BenefitCriteria !== "" &&
        BenefitDetails.BenefitCurrencyType !== "") ||
      BenefitDetails.DeductibleType !== "" ||
      (BenefitDetails.Deductible !== "" &&
        BenefitDetails.Benefit !== "" &&
        BenefitDetails.BenefitType !== "" &&
        BenefitDetails.CoverName !== "")
    ) {
      Object.keys(GroupDetails.SectionMappingDetails.BenefitDetails).forEach((item, key) => {
        if (
          GroupDetails.SectionMappingDetails.BenefitDetails[key].Benefit === BenefitDetails.Benefit
        ) {
          GroupDetails.SectionMappingDetails.BenefitDetails.splice(key, 1);
        }
      });
      GroupDetails.CoverName = BenefitDetails.CoverName;

      GroupDetails.SectionMappingDetails.BenefitDetails = [
        ...GroupDetails.SectionMappingDetails.BenefitDetails,
        { ...BenefitDetails },
      ];
      setGroupDetails((prev) => ({ ...prev, ...GroupDetails }));
      setBenefitLevel([]);
      setDedAmt([]);
      setDedType([]);
      setPremiumType([]);
      setSiObj([]);
      setLimitObj([]);
      setVal();
      setFlagCalc1(false);
      setFlagCalc2(false);
      setFlagCalc3(false);

      setStandardSi(false);
      setCoverSi(false);
      setBaseSi(false);
      setOpen(false);
      setSiForCoverValue();
      setSi();
      setLimit();
      setLimitB();
      setBaseValue();
      setLValue();
    }
  };

  const groupIt = () => {
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
    setGroupDetails(GroupDetailsD);
    setShowBenefitsFlag(false);

    setValidationFlag1(false);
    setB(false);
    setAc([]);
    setGroupTypeId({ mID: 0, mValue: "" });
    setGroupName();

    setCriteriaSi({ mID: 0, mValue: "" });
    setCriteriaType({ mID: 0, mValue: "" });
    setCriteriaRegion({ mID: 0, mValue: "" });
    setCriteriaCurrency({ mID: 0, mValue: "" });
  };

  const handleClose = () => {
    setSi();
    setLimit();
    setLimitB();
    setBenefitLevel([]);
    setDedAmt([]);
    setDedType([]);
    setPremiumType([]);
    setSiObj([]);
    setLimitObj([]);
    setVal();
    setFlagCalc1(false);
    setFlagCalc2(false);
    setFlagCalc3(false);

    setStandardSi(false);
    setCoverSi(false);
    setBaseSi(false);
    setFinalModalFlag(false);
    setOpen(false);
    setSiForCoverValue();
    setLValue();
    setBaseValue();
    setBenefitDetails(BenefitDetailsD);
    setMapFlag(true);
  };
  const handleCriterias = (e) => {
    if (e.target.name === "siValue") {
      if (Number(e.target.value) > -1) {
        setSiValue(e.target.value);
      }
    } else if (e.target.name === "typeValue") {
      const re = /^[a-zA-Z]+$/;

      if (e.target.value !== "" && re.test(e.target.value)) {
        setTypeValue(e.target.value);
      } else if (e.target.value === "") {
        setTypeValue(e.target.value);
      }
    } else if (e.target.name === "regionValue") {
      const re = /^[a-zA-Z]+$/;
      if (e.target.value !== "" && re.test(e.target.value)) {
        setRegionValue(e.target.value);
      } else if (e.target.value === "") {
        setRegionValue(e.target.value);
      }
    }
  };
  const handleAddCriterias = (e, type) => {
    if (type === "si") {
      if (siValue === "") {
        setValidationFlag2(true);
      } else if (passId2 > -1) {
        saveDto[passId2].GroupDetailsJson.SectionMaster.SI.push(siValue);
        setValidationFlag2(false);
        setSaveDto([...saveDto]);
      } else {
        GroupDto.GroupDetailsJson.SectionMaster.SI.push(siValue);
        setValidationFlag2(false);
        setGroupDto((prev) => ({ ...prev, ...GroupDto }));
      }

      setSiValue("");
    } else if (type === "type") {
      if (typeValue === "") {
        setValidationFlag3(true);
      } else if (passId2 > -1) {
        saveDto[passId2].GroupDetailsJson.SectionMaster.Type.push(typeValue);
        setValidationFlag3(false);
        setSaveDto([...saveDto]);
      } else {
        GroupDto.GroupDetailsJson.SectionMaster.Type.push(typeValue);
        setValidationFlag3(false);
        setGroupDto((prev) => ({ ...prev, ...GroupDto }));
      }
      setTypeValue("");
    } else if (type === "region") {
      if (regionValue === "") {
        setValidationFlag4(true);
      } else if (passId2 > -1) {
        saveDto[passId2].GroupDetailsJson.SectionMaster.Region.push(regionValue);
        setValidationFlag4(false);
        setSaveDto([...saveDto]);
      } else {
        GroupDto.GroupDetailsJson.SectionMaster.Region.push(regionValue);
        setValidationFlag4(false);
        setGroupDto((prev) => ({ ...prev, ...GroupDto }));
      }
      setRegionValue("");
    }
  };
  const handleDeleteCriterias = (e, type) => {
    if (type === "si") {
      GroupDto.GroupDetailsJson.SectionMaster.SI.pop();
    } else if (type === "type") {
      GroupDto.GroupDetailsJson.SectionMaster.Type.pop();
    } else if (type === "region") {
      GroupDto.GroupDetailsJson.SectionMaster.Region.pop();
    } else if (type === "currency") {
      GroupDto.GroupDetailsJson.SectionMaster.currency.pop();
    }
    setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  };
  const handleDeleteCriterias1 = (e, type) => {
    if (type === "si") {
      saveDto[passId2].GroupDetailsJson.SectionMaster.SI.pop();
    } else if (type === "type") {
      saveDto[passId2].GroupDetailsJson.SectionMaster.Type.pop();
    } else if (type === "region") {
      saveDto[passId2].GroupDetailsJson.SectionMaster.Region.pop();
    } else if (type === "currency") {
      saveDto[passId2].GroupDetailsJson.SectionMaster.currency.pop();
    }
    setSaveDto([...saveDto]);
  };
  const handleCurrencyCriteria = (e, value, pid) => {
    // debugger;
    if (value.length === 1 && GroupDto.GroupDetailsJson.SectionMaster.currency.length === 0) {
      GroupDto.GroupDetailsJson.SectionMaster.currency.push(value[0]);
    } else if (pid > -1) {
      if (value.length > saveDto[pid].GroupDetailsJson.SectionMaster.currency.length) {
        // saveDto[pid].GroupDetailsJson.SectionMaster.currency = [
        //   ...saveDto[pid].GroupDetailsJson.SectionMaster.currency,
        //   { ...value[value.length - 1] },
        // ];
        saveDto[pid].GroupDetailsJson.SectionMaster.currency = [];
        saveDto[pid].GroupDetailsJson.SectionMaster.currency = [...value];
      } else if (value.length < saveDto[pid].GroupDetailsJson.SectionMaster.currency.length) {
        saveDto[pid].GroupDetailsJson.SectionMaster.currency = [];
        saveDto[pid].GroupDetailsJson.SectionMaster.currency = [...value];
      }

      setSaveDto([...saveDto]);
    } else if (value.length === 0) {
      GroupDto.GroupDetailsJson.SectionMaster.currency = [];
    } else if (value.length < GroupDto.GroupDetailsJson.SectionMaster.currency.length) {
      GroupDto.GroupDetailsJson.SectionMaster.currency = [];
      GroupDto.GroupDetailsJson.SectionMaster.currency = [...value];
    } else {
      GroupDto.GroupDetailsJson.SectionMaster.currency = [
        ...GroupDto.GroupDetailsJson.SectionMaster.currency,
        { ...value[value.length - 1] },
      ];
    }
    // GroupDto.GroupDetailsJson.SectionMaster.currency.push(value[0].mValue);

    setGroupDto((prev) => ({ ...prev, ...GroupDto }));
  };

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      width: 150,
    },
    {
      field: "groupName",
      headerName: "Plan name",
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
                <Grid container spacing={2} justifyContent="end" alignItems="end">
                  <IconButton onClick={handleCloseDrawer} style={{ color: "dodgerblue" }}>
                    <Close />
                  </IconButton>
                </Grid>
                <MDTypography variant="h6">Edit Criterias</MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      name="siValue"
                      value={siValue}
                      label="Enter Si Amount"
                      onChange={handleCriterias}
                      icon="Add"
                      onIconClick={(e) => handleAddCriterias(e, "si")}
                      helperText={
                        validationFlag2 === true ? (
                          <p style={{ color: "red" }}>Cannot Enter Null Values</p>
                        ) : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={8} xl={8} xxl={8}>
                    <MDInput
                      required
                      label="List of Si Values"
                      value={
                        passId2 > -1 &&
                        saveDto[passId2].GroupDetailsJson.SectionMaster.SI.map((it) => it)
                      }
                      onIconClick={(e) => handleDeleteCriterias1(e, "si")}
                      icon="Remove"
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    {" "}
                  </Grid> */}
                  {/* </> */}

                  <br />

                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      name="typeValue"
                      value={typeValue}
                      label="Enter Trip Type"
                      onChange={handleCriterias}
                      icon="Add"
                      onIconClick={(e) => handleAddCriterias(e, "type")}
                      helperText={
                        validationFlag3 === true ? (
                          <p style={{ color: "red" }}>Cannot Enter Null Values</p>
                        ) : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={8} xl={8} xxl={8}>
                    <MDInput
                      required
                      label="List of Trip Type"
                      value={
                        passId2 > -1 &&
                        saveDto[passId2].GroupDetailsJson.SectionMaster.Type.map((it) => it)
                      }
                      icon="Remove"
                      onIconClick={(e) => handleDeleteCriterias1(e, "type")}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    {" "}
                  </Grid> */}

                  <br />

                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      name="regionValue"
                      value={regionValue}
                      label="Enter Region"
                      onChange={handleCriterias}
                      icon="Add"
                      onIconClick={(e) => handleAddCriterias(e, "region")}
                      helperText={
                        validationFlag4 === true ? (
                          <p style={{ color: "red" }}>Cannot Enter Null Values</p>
                        ) : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={8} xl={8} xxl={8}>
                    <MDInput
                      required
                      label="List of Regions"
                      value={
                        passId2 > -1 &&
                        saveDto[passId2].GroupDetailsJson.SectionMaster.Region.map((it) => it)
                      }
                      icon="Remove"
                      onIconClick={(e) => handleDeleteCriterias1(e, "region")}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    {" "}
                  </Grid> */}

                  <br />

                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <Autocomplete
                      multiple
                      id="currencies"
                      options={currencyMaster}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      value={
                        passId2 > -1 &&
                        saveDto[passId2].GroupDetailsJson.SectionMaster.currency.map((x) => x)
                      }
                      //  value={GroupDto.GroupDetailsJson.SectionMaster.currency.length>0 ?GroupDto.GroupDetailsJson.SectionMaster.currency.map((x) => x):null}
                      getOptionLabel={(option) => option.mValue}
                      filterSelectedOptions
                      isOptionEqualToValue={(option, value) => option.mValue === value.mValue}
                      clearIcon={null}
                      //  clearIcon={<IconButton onClick={()=>handleDeleteCriterias("", "currency")}><Delete fontSize="small" /></IconButton>}
                      onChange={(e, value) => handleCurrencyCriteria(e, value, passId2)}
                      renderInput={(params) => (
                        <MDInput
                          required
                          {...params}
                          label="Select Currencies"
                          // onIconClick={(e) => handleDeleteCriterias(e, "currency")}
                          //  icon="Remove"
                        />
                      )}
                      renderTags={(value) =>
                        value.map((option) => (
                          <Chip variant="outlined" label={option.mValue} />
                          //  option.mValue
                        ))
                      }
                    />
                  </Grid>

                  <IconButton onClick={() => handleDeleteCriterias1("", "currency")}>
                    <Delete fontSize="medium" color="primary" />
                  </IconButton>
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
                <Grid container spacing={2} justifyContent="end" alignItems="end">
                  <IconButton onClick={handleCloseDrawer1} style={{ color: "dodgerblue" }}>
                    <Close />
                  </IconButton>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                    <MDTypography variant="h6">View Criterias</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      label="List of Si Values"
                      value={
                        passId2 > -1 &&
                        saveDto[passId2].GroupDetailsJson.SectionMaster.SI.map((it) => it)
                      }
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      label="List of Trip Type"
                      value={
                        passId2 > -1 &&
                        saveDto[passId2].GroupDetailsJson.SectionMaster.Type.map((it) => it)
                      }
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      label="List of Regions"
                      value={
                        passId2 > -1 &&
                        saveDto[passId2].GroupDetailsJson.SectionMaster.Region.map((it) => it)
                      }
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      label="List of Currencies"
                      value={
                        passId2 > -1 &&
                        saveDto[passId2].GroupDetailsJson.SectionMaster.currency.map(
                          (x) => x.mValue
                        )
                      }
                      disabled
                    />
                  </Grid>
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
          setArr([]);
          saveDto[param.row.id].disableDeleteFlag = true;
          setSaveDto([...saveDto]);
          setArr1([]);
          setArr2([]);
          setArr3([]);
          console.log("param id", param);
          setPassId(param.row.id);
          setAddFlag(true);
          saveDto[param.row.id].GroupDetailsJson.SectionMaster.SI.forEach((x) => {
            arr.push({ mID: x, mValue: x });
            setArr(arr);
          });
          saveDto[param.row.id].GroupDetailsJson.SectionMaster.Type.forEach((x) => {
            arr1.push({ mID: x, mValue: x });
            setArr1(arr1);
          });

          saveDto[param.row.id].GroupDetailsJson.SectionMaster.Region.forEach((x) => {
            arr2.push({ mID: x, mValue: x });
            setArr2(arr2);
          });
          saveDto[param.row.id].GroupDetailsJson.SectionMaster.currency.forEach((x) => {
            arr3.push({ mID: x.mValue, mValue: x.mValue });
            setArr3(arr3);
          });
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
            {/* <MDButton color="light">Add Benefits</MDButton> */}
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
          swal("Are you sure you want to delete this plan?", {
            buttons: {
              cancel: {
                value: "no",
                closeModal: true,
                text: "No",
                visible: true,
              },
              confirm: {
                value: "yes",
                closeModal: true,
                visible: true,
                text: "Yes",
              },
            },
          }).then((res) => {
            if (res === "yes") {
              const newArr = saveDto.filter((x) => (x.id !== param.row.id ? x : null));
              newArr.forEach((r, i) => {
                newArr[i].id = i;
              });
              if (newArr.length === 0) {
                setValidationFlag1(false);
                showGrid(false);
                setGroupTypeId({ mID: 0, mValue: "" });
                setGroupName("");
                setValidationFlag2(false);
                setValidationFlag3(false);
                setValidationFlag4(false);
                setPassId2(-1);
              } else if (newArr.length > 0) {
                setValidationFlag1(false);
                setGroupTypeId({ mID: 0, mValue: "" });
                setGroupName("");
                setValidationFlag2(false);
                setValidationFlag3(false);
                setValidationFlag4(false);
                setPassId2(-1);
              }
              setSaveDto([...newArr]);
            }
          });
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
    //     {field:"delete",
    //   headerName:"Action",
    // width:100,
    // renderCell:(param)=>{
    //   // debugger
    //   const handleD=()=>{
    //     saveDto[passId1].GroupDetails.forEach(()=>)
    //   }
    //   return(
    //     <IconButton onClick={handleD}><Delete /></IconButton>
    //   )
    // }
    // },
    {
      field: "Benefit",
      headerName: "Benefit",
      width: 250,
    },
    {
      field: "CoverName",
      headerName: "CoverName",
      width: 200,
    },
    {
      field: "BenefitCurrencyType",
      headerName: "BenefitCurrencyType",
      width: 150,
    },
    {
      field: "Value",
      headerName: "Value",
      width: 100,
    },
    {
      field: "BenefitType",
      headerName: "BenefitType",
      width: 150,
    },
    {
      field: "BenefitCriteria",
      headerName: "BenefitCriteria",
      width: 150,
    },
    {
      field: "DeductibleType",
      headerName: "DeductibleType",
      width: 150,
    },

    {
      field: "Deductible",
      headerName: "Deductible",
      width: 150,
    },
    {
      field: "IsOptional",
      headerName: "IsOptional",
      width: 100,
    },
    // {
    //   field: "PremiumType",
    //   headerName: "PremiumType",
    //   width: 150,
    // },
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
        else if (masterData.data[key1].mType === "Currency") {
          setCurrencyMaster(masterData.data[key1].mdata);
        }
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

    const criteria = await getProductMaster("BenefitCriteria", 0);
    console.log("criteria", criteria);
    setBenefitCriteria(criteria);
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
          Json.data.finalResult.productInsurableItems[i].productCovers.forEach((y, i1) => {
            // debugger;

            Json.data.finalResult.productInsurableItems[i].productCovers[
              i1
            ].productBenefits.forEach((z) => {
              // debugger;
              Object.assign(z, {
                check: false,
                disableCheckbox: false,
                showEdit: false,
              });
              if (z.basedOn === 1) {
                console.log("dont do anything");
              } else if (z.basedOn === 2) {
                Object.assign(z, { limitValue: 0, showCoverValue: 0 });
              } else if (z === 3) {
                Object.assign(z, { baseValue: 0, basePlanValue: 0 });
              }
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
  };

  const handleChooseCriteria = (e, type) => {
    if (type === "isSi" && e.target.checked === true) {
      setIsSi(true);
    } else if (type === "isSi" && e.target.checked === false) {
      setIsSi(false);
    } else if (type === "isType" && e.target.checked === true) {
      setIsType(true);
    } else if (type === "isType" && e.target.checked === false) {
      setIsType(false);
    } else if (type === "isRegion" && e.target.checked === true) {
      setIsRegion(true);
    } else if (type === "isRegion" && e.target.checked === false) {
      setIsRegion(false);
    } else if (type === "isCurrency" && e.target.checked === true) {
      setIsCurrency(true);
    } else if (type === "isCurrency" && e.target.checked === false) {
      setIsCurrency(false);
    }
  };

  const configureIt = () => {
    if (isSi === true && GroupDto.GroupDetailsJson.SectionMaster.SI.length === 0) {
      swal({
        html: true,
        text: "Please Enter atleast 1 SI to Proceed",
        icon: "info",
      });
    } else if (isType === true && GroupDto.GroupDetailsJson.SectionMaster.Type.length === 0) {
      swal({
        html: true,
        text: "Please Enter atleast 1 TripType to Proceed",
        icon: "info",
      });
    } else if (isRegion === true && GroupDto.GroupDetailsJson.SectionMaster.Region.length === 0) {
      swal({
        html: true,
        text: "Please Enter atleast 1 Region to Proceed",
        icon: "info",
      });
    } else if (
      isCurrency === true &&
      GroupDto.GroupDetailsJson.SectionMaster.currency.length === 0
    ) {
      swal({
        html: true,
        text: "Please Choose atleast 1 Currency to Proceed",
        icon: "info",
      });
    } else {
      showGrid(true);
      setArr([]);

      setArr1([]);
      setArr2([]);
      setArr3([]);
      setShowCriterias(false);
      setIsCurrency(false);
      setIsRegion(false);
      setIsType(false);
      setIsSi(false);

      //  saveDto=[...saveDto,{...GroupDto}]
      if (saveDto.length === 0) {
        GroupDto.id = 0;
      } else {
        GroupDto.id = saveDto.length;
      }
      setSaveDto((prev) => [...prev, { ...GroupDto }]);
      setGroupDto(GroupDtoD); // clearing state after pushing into save dto on configure click
    }
  };

  const handleGroupDetails = (e, value) => {
    let count = 0;
    GroupDetails.FilterCriteria[e.target.id.split("-")[0]] = value.mID;
    if (e.target.id.split("-")[0] === "SI") {
      criteriaSi.mID = value.mID;
      criteriaSi.mValue = value.mID;
      setCriteriaSi(criteriaSi);
    } else if (e.target.id.split("-")[0] === "Type") {
      criteriaType.mID = value.mID;
      criteriaType.mValue = value.mID;
      setCriteriaType(criteriaType);
    } else if (e.target.id.split("-")[0] === "Region") {
      criteriaRegion.mID = value.mID;
      criteriaRegion.mValue = value.mID;
      setCriteriaRegion(criteriaRegion);
    } else {
      criteriaCurrency.mID = value.mID;
      criteriaCurrency.mValue = value.mID;
      setCriteriaCurrency(criteriaCurrency);
    }
    setGroupDetails((prev) => ({ ...prev, ...GroupDetails }));
    if (arr.length > 0) {
      count += 1;
    }
    if (arr1.length > 0) {
      count += 1;
    }
    if (arr2.length > 0) {
      count += 1;
    }
    if (arr3.length > 0) {
      count += 1;
    }

    ac.push({ mID: value.mID, mValue: value.mValue });
    setAc([...ac]);

    if (ac.length === count) {
      setB(true);
    }
  };

  useEffect(() => {
    // debugger;
    if (childRef.current !== null) {
      childRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showBenefitsFlag === true]);

  const showBenefits = () => {
    setShowBenefitsFlag(true);
    productJson.productInsurableItems.forEach((x, i2) => {
      productJson.productInsurableItems[i2].productCovers.forEach((y, i1) => {
        productJson.productInsurableItems[i2].productCovers[i1].productBenefits.forEach((z, i) => {
          productJson.productInsurableItems[i2].productCovers[i1].productBenefits[i].check = false;
          productJson.productInsurableItems[i2].productCovers[i1].productBenefits[
            i
          ].showEdit = false;
          productJson.productInsurableItems[i2].productCovers[i1].productBenefits[
            i
          ].disableCheckbox = false;
        });
      });
    });

    if (saveDto[passId].GroupDetails.length > 0) {
      saveDto[passId].GroupDetails.forEach((x) => {
        if (
          x.FilterCriteria.SI === criteriaSi.mValue &&
          x.FilterCriteria.Type === criteriaType.mValue &&
          x.FilterCriteria.Region === criteriaRegion.mValue &&
          x.FilterCriteria.currency === criteriaCurrency.mValue
        ) {
          swal({
            text: "This FilterCriteria has already been chosen.Please Choose Other Combination of Filter Criteria To Proceed Further.",
            icon: "error",
            html: true,
          });
          setShowBenefitsFlag(false);
          setCriteriaSi({ mID: 0, mValue: "" });
          setCriteriaRegion({ mID: 0, mValue: "" });
          setCriteriaType({ mID: 0, mValue: "" });
          setCriteriaCurrency({ mID: 0, mValue: "" });
          setAc([]);
          GroupDetails.FilterCriteria.SI = "";
          GroupDetails.FilterCriteria.Region = "";
          GroupDetails.FilterCriteria.Type = "";
          GroupDetails.FilterCriteria.currency = "";
          setGroupDetails((prev) => ({ ...prev, ...GroupDetails }));
        }
      });
    }

    setProductJson((prev) => ({ ...prev, ...productJson }));
    // window.scrollTo({ bottom: childRef.current.offsetTop, behavior: "smooth" });
    // childRef.current.scrollIntoView({ behavior: "smooth" })
  };

  const setSectionCheckbox = (e, key, key1, key2) => {
    // debugger;
    console.log("32", productJson);
    if (e.target.checked === true) {
      productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].check =
        e.target.checked;
      productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].showEdit =
        e.target.checked;
    } else {
      productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].check =
        e.target.checked;
      productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].showEdit =
        e.target.checked;

      GroupDetails.SectionMappingDetails.BenefitDetails.forEach((x, i) => {
        if (
          GroupDetails.SectionMappingDetails.BenefitDetails[i].Benefit ===
          productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2]
            .benefitName
        ) {
          GroupDetails.SectionMappingDetails.BenefitDetails.splice(i, 1);
          setGroupDetails((prev) => ({ ...prev, ...GroupDetails }));
        }
      });
    }
    setProductJson((prev) => ({ ...prev, ...productJson }));

    // for cover si and basi si calculation part

    if (
      productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].check ===
        true &&
      productJson.productInsurableItems[key].productCovers[key1].productBenefits[
        key2
      ].coverNameId.toString() !== ""
    ) {
      Object.keys(covers).forEach((x, i) => {
        if (
          covers[i].mID.toString() ===
          productJson.productInsurableItems[key].productCovers[key1].productBenefits[
            key2
          ].coverNameId.toString()
        ) {
          const abc = covers[i].mValue;
          productJson.productInsurableItems.forEach((p, pi) => {
            productJson.productInsurableItems[pi].productCovers.forEach((p1, pi2) => {
              // debugger;
              if (
                productJson.productInsurableItems[pi].productCovers[pi2].cover === abc ||
                productJson.productInsurableItems[pi].productCovers[pi2].coverDescription === abc
              ) {
                Object.keys(GroupDetails.SectionMappingDetails.BenefitDetails).forEach((y, i1) => {
                  if (GroupDetails.SectionMappingDetails.BenefitDetails[i1].CoverName === abc) {
                    setSiForCoverValue(GroupDetails.SectionMappingDetails.BenefitDetails[i1].Value);
                  }
                });
              }
            });
          });
          console.log("abc", abc);
        }
      });
    }

    // for disabling

    if (
      productJson.productInsurableItems[key].productCovers[key1].productBenefits[key2].check ===
      true
    ) {
      productJson.productInsurableItems[key].productCovers[key1].productBenefits.forEach(
        (item, key3) => {
          if (
            productJson.productInsurableItems[key].productCovers[key1].productBenefits[key3]
              .check === false
          ) {
            productJson.productInsurableItems[key].productCovers[key1].productBenefits[
              key3
            ].disableCheckbox = true;
            // this.setState({ productData });
          }
        }
      );
    } else {
      productJson.productInsurableItems[key].productCovers[key1].productBenefits.forEach(
        (item, key3) => {
          if (
            productJson.productInsurableItems[key].productCovers[key1].productBenefits[key3]
              .check === false
          ) {
            productJson.productInsurableItems[key].productCovers[key1].productBenefits[
              key3
            ].disableCheckbox = false;
          }
        }
      );
    }
  };

  useEffect(() => {
    console.log("saveDto", saveDto);
  }, [saveDto]);
  useEffect(() => {
    console.log("GroupDetails", GroupDetails);
  }, [GroupDetails]);

  const deleteAtViewBenefits = (id) => {
    swal("Are you sure you want to Delete the Benefits?", {
      buttons: {
        cancel: {
          text: "No",
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Yes",
          value: "confirm",
          visible: true,
          className: "",
          closeModal: true,
        },
      },
    }).then((value) => {
      if (value === "confirm") {
        saveDto[passId].GroupDetails.splice(id, 1);
        setSaveDto([...saveDto]);
      }
    });
  };
  const handleSave = async () => {
    saveDto.forEach((x, key) => {
      delete saveDto[key].id;
      delete saveDto[key].disableDeleteFlag;

      if (saveDto[key].productId === 0) {
        saveDto[key].productId = productId;
      }
    });
    saveDto.forEach((x, v) => {
      saveDto[v].GroupDetailsJson.DisplayName = x.groupName;
    });

    console.log("displayname", saveDto);

    const result = await saveCoverGrouping(saveDto);

    if (result.data.status === 2) {
      swal({
        text: result.data.responseMessage,
        icon: "success",
      });
    } else {
      swal({
        text: result.data.responseMessage,
        icon: "error",
      });
    }
    setTimeout(() => window.location.reload(), 5000);
  };
  return (
    <>
      <MDBox>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <MDTypography>Cover Grouping</MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                {productData.length > 0 ? (
                  <Autocomplete
                    id="productId"
                    options={productData}
                    // rules={{ required: true }}
                    getOptionLabel={(option) => option.mValue}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    onChange={handleAutocomplete}
                    // disabled={validationFlag1}

                    renderInput={(params) => (
                      <MDInput {...params} label="Select Product" required />
                    )}
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
                    renderInput={(params) => (
                      <MDInput {...params} label="Select Grouping Type" required />
                    )}
                  />
                ) : (
                  <Skeleton animate="wave" variant="rectangle" height={60} />
                )}
              </Grid>
              {groupTypeId.mID > 0 ? (
                <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                  <MDInput
                    required
                    name="groupName"
                    // value={GroupDto.groupName}
                    value={groupName}
                    onChange={handleGroupingType}
                    disabled={validationFlag1}
                    helperText={
                      throwError === true ? (
                        <p style={{ color: "red" }}>Plan Already Exits</p>
                      ) : null
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

            {showCriterias === true ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isSi}
                          onChange={(e) => handleChooseCriteria(e, "isSi")}
                        />
                      }
                      label="SI"
                      name="isSi"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isType}
                          onChange={(e) => handleChooseCriteria(e, "isType")}
                        />
                      }
                      label="Type"
                      name="isType"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isRegion}
                          onChange={(e) => handleChooseCriteria(e, "isRegion")}
                        />
                      }
                      label="Region"
                      name="isRegion"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isCurrency}
                          onChange={(e) => handleChooseCriteria(e, "isCurrency")}
                        />
                      }
                      label="Currency"
                      name="isCurrency"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            ) : null}

            <Grid container spacing={2}>
              {isSi === true ? (
                // <Grid container spacing={2}>
                <>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      name="siValue"
                      value={siValue}
                      label="Enter Si Amount"
                      onChange={handleCriterias}
                      icon="Add"
                      onIconClick={(e) => handleAddCriterias(e, "si")}
                      helperText={
                        validationFlag2 === true ? (
                          <p style={{ color: "red" }}>Cannot Enter Null Values</p>
                        ) : null
                      }
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                  <MDButton variant="outlined" onClick={(e) => handleAddCriterias(e, "si")}>
                    Add
                  </MDButton>
                </Grid> */}
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      label="List of Si Values"
                      value={GroupDto.GroupDetailsJson.SectionMaster.SI.map((it) => it)}
                      onIconClick={(e) => handleDeleteCriterias(e, "si")}
                      icon="Remove"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    {" "}
                  </Grid>
                </>
              ) : null}
              <br />
              {isType === true ? (
                // <Grid container spacing={2}>
                <>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      name="typeValue"
                      value={typeValue}
                      label="Enter Trip Type"
                      onChange={handleCriterias}
                      icon="Add"
                      onIconClick={(e) => handleAddCriterias(e, "type")}
                      helperText={
                        validationFlag3 === true ? (
                          <p style={{ color: "red" }}>Cannot Enter Null Values</p>
                        ) : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      label="List of Trip Type"
                      value={GroupDto.GroupDetailsJson.SectionMaster.Type.map((it) => it)}
                      icon="Remove"
                      onIconClick={(e) => handleDeleteCriterias(e, "type")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    {" "}
                  </Grid>
                </>
              ) : null}
              <br />

              {isRegion === true ? (
                // <Grid container spacing={2}>
                <>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      name="regionValue"
                      value={regionValue}
                      label="Enter Region"
                      onChange={handleCriterias}
                      icon="Add"
                      onIconClick={(e) => handleAddCriterias(e, "region")}
                      helperText={
                        validationFlag4 === true ? (
                          <p style={{ color: "red" }}>Cannot Enter Null Values</p>
                        ) : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <MDInput
                      required
                      label="List of Regions"
                      value={GroupDto.GroupDetailsJson.SectionMaster.Region.map((it) => it)}
                      icon="Remove"
                      onIconClick={(e) => handleDeleteCriterias(e, "region")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    {" "}
                  </Grid>
                </>
              ) : null}
              <br />
              {isCurrency === true ? (
                <>
                  <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <Autocomplete
                      multiple
                      id="currencies"
                      options={currencyMaster}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      value={GroupDto.GroupDetailsJson.SectionMaster.currency.map((x) => x)}
                      getOptionLabel={(option) => option.mValue}
                      filterSelectedOptions
                      isOptionEqualToValue={(option, value) => option.mValue === value.mValue}
                      clearIcon={null}
                      //  clearIcon={<IconButton onClick={()=>handleDeleteCriterias("", "currency")}><Delete fontSize="small" /></IconButton>}
                      onChange={(e, value) => handleCurrencyCriteria(e, value)}
                      renderInput={(params) => (
                        <MDInput
                          required
                          {...params}
                          label="Select Currencies"
                          // onIconClick={(e) => handleDeleteCriterias(e, "currency")}
                          //  icon="Remove"
                          // disabled
                        />
                      )}
                      renderTags={(value) =>
                        value.map((option) => (
                          <Chip variant="outlined" label={option.mValue} />
                          //  option.mValue
                        ))
                      }
                    />
                  </Grid>
                  <IconButton onClick={() => handleDeleteCriterias("", "currency")}>
                    <Delete fontSize="medium" color="primary" />
                  </IconButton>
                </>
              ) : // </Grid>
              null}
            </Grid>
            {isSi === true || isType === true || isRegion === true || isCurrency === true ? (
              <Grid container justifyContent="center">
                <MDButton variant="outlined" onClick={configureIt}>
                  Configure
                </MDButton>
              </Grid>
            ) : null}
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
                  <MDTypography variant="h4">Plan Name:{saveDto[passId].groupName}</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} xl={3} xxl={3}>
                  <MDTypography variant="h6">Filter Criteria:</MDTypography>
                </Grid>
                {saveDto[passId].GroupDetailsJson.SectionMaster.SI.length > 0 ? (
                  <Grid item xs={12} sm={12} md={2} xl={2} xxl={2}>
                    <Autocomplete
                      id="SI"
                      // options={saveDto[passId].GroupDetailsJson.SectionMaster.SI}
                      options={arr}
                      value={criteriaSi}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      getOptionLabel={(option) => option.mValue}
                      onChange={handleGroupDetails}
                      renderInput={(params) => <MDInput {...params} label="Si List" />}
                    />
                  </Grid>
                ) : null}

                {saveDto[passId].GroupDetailsJson.SectionMaster.Type.length > 0 ? (
                  <Grid item xs={12} sm={12} md={2} xl={2} xxl={2}>
                    <Autocomplete
                      id="Type"
                      value={criteriaType}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      getOptionLabel={(option) => option.mValue}
                      // options={saveDto[passId].GroupDetailsJson.SectionMaster.Type}
                      options={arr1}
                      onChange={handleGroupDetails}
                      renderInput={(params) => <MDInput {...params} label="TripType List" />}
                    />
                  </Grid>
                ) : null}

                {saveDto[passId].GroupDetailsJson.SectionMaster.Region.length > 0 ? (
                  <Grid item xs={12} sm={12} md={2} xl={2} xxl={2}>
                    <Autocomplete
                      id="Region"
                      value={criteriaRegion}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      getOptionLabel={(option) => option.mValue}
                      options={arr2}
                      // options={saveDto[passId].GroupDetailsJson.SectionMaster.Region}
                      onChange={handleGroupDetails}
                      renderInput={(params) => <MDInput {...params} label="Region List" />}
                    />
                  </Grid>
                ) : null}

                {saveDto[passId].GroupDetailsJson.SectionMaster.currency.length > 0 ? (
                  <Grid item xs={12} sm={12} md={2} xl={2} xxl={2}>
                    <Autocomplete
                      id="currency"
                      getOptionLabel={(option) => option.mValue}
                      value={criteriaCurrency}
                      options={arr3}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      // options={saveDto[passId].GroupDetailsJson.SectionMaster.currency}
                      onChange={handleGroupDetails}
                      renderInput={(params) => <MDInput {...params} label="Currency List" />}
                    />
                  </Grid>
                ) : null}

                <br />
                {b === true ? (
                  <Grid container justifyContent="center">
                    <MDButton variant="outlined" onClick={showBenefits} sx={{ top: "12px" }}>
                      Show Benefits
                    </MDButton>
                  </Grid>
                ) : null}

                {/* ) : null} */}
              </Grid>
            ) : null}

            <br />
          </AccordionDetails>
        </Accordion>
      </MDBox>
      <br />
      {/* <p ref={ref}>HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII</p> */}
      {showBenefitsFlag === true ? (
        <BenefitMapping
          productJson={productJson}
          setSectionCheckbox={setSectionCheckbox}
          handleClose={handleClose}
          open={open}
          handleBenefitOpen={handleBenefitOpen}
          benefitLevel={benefitLevel}
          dedType={dedType}
          dedAmt={dedAmt}
          premiumType={premiumType}
          BenefitDetails={BenefitDetails}
          val={val}
          si={si}
          limit={limit}
          siObj={siObj}
          limitObj={limitObj}
          showStandardSi={showStandardSi}
          showBaseSi={showBaseSi}
          showCoverSi={showCoverSi}
          handleChange={handleChange}
          flagCalc1={flagCalc1}
          flagCalc2={flagCalc2}
          flagCalc3={flagCalc3}
          handleChange1={handleChange1}
          handleChange2={handleChange2}
          mapIt={mapIt}
          handleBenefits={handleBenefits}
          lValue={lValue}
          groupIt={groupIt}
          baseValue={baseValue}
          limitB={limitB}
          mapFlag={mapFlag}
          ref={childRef}
        />
      ) : null}

      {saveDto.length > 0 && groupedFlag === true ? (
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
              <MDButton variant="contained" onClick={handleSave}>
                Save
              </MDButton>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : null}
      {/* <p ref={childRef}>HIIIIIIIIIIIIIIIIIIIIIII</p> */}

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
                      <IconButton color="primary" onClick={() => deleteAtViewBenefits(key)}>
                        <Delete />
                      </IconButton>
                    </Grid>

                    {x.FilterCriteria.SI !== "" ? (
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography variant="h6">SI:{x.FilterCriteria.SI}</MDTypography>
                      </Grid>
                    ) : null}
                    {x.FilterCriteria.Type !== "" ? (
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography variant="h6">Type:{x.FilterCriteria.Type}</MDTypography>
                      </Grid>
                    ) : null}
                    {x.FilterCriteria.Region !== "" ? (
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography variant="h6">Region:{x.FilterCriteria.Region}</MDTypography>
                      </Grid>
                    ) : null}
                    {x.FilterCriteria.currency !== "" ? (
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography variant="h6">
                          Currency:{x.FilterCriteria.currency}
                        </MDTypography>
                      </Grid>
                    ) : null}

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <DataGrid
                        autoHeight
                        // rows={saveDto[param.row.id].GroupDetails[key].SectionMappingDetails.BenefitDetails}
                        rows={
                          saveDto[passId1].GroupDetails[key].SectionMappingDetails.BenefitDetails
                        }
                        columns={columns2}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        components={{ Toolbar: GridToolbar }}
                        getRowId={(option) => option.Benefit}
                        // editField="inEdit"
                      />
                    </Grid>
                  </>
                ))
              : null}
          </Grid>
        </MDBox>
      </Modal>
    </>
  );
}

export default CoverGrouping;
