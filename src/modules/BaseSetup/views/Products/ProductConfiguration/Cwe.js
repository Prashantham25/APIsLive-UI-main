import React, { useState, useEffect } from "react";
import {
  Grid,
  Autocomplete,
  IconButton,
  //   Tabs,
  //   Tab,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Modal,
  TextareaAutosize,
  // Drawer,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import RemoveIcon from "@mui/icons-material/Remove";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import MDInput from "../../../../../components/MDInput";

import { useDataController, setProductJson } from "../../../../BrokerPortal/context";
import MDBox from "../../../../../components/MDBox";
import { getCwe, getCweDetails } from "./data/index";
import CustomClause from "./CustomClause";
// import { handleCustomInput, handleAutoComplete } from "./data/Handlers";

const style = {
  position: "absolute",
  top: "-1%",
  left: "76%",
  transform: "translate(-85%, 6%)",
  width: 1000,
  height: 500,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,

  textAlign: "center",
  p: 4,
  "max-height": "100%",
  "overflow-y": "auto",
};
function Cwe({ keyi, type, keyc, keyb }) {
  console.log("type", type);
  const [controller, dispatch] = useDataController();
  const {
    ProductJson,
    //  insurableItemMasterArray,
    viewFlag,
  } = controller;
  const [cweId, setCweId] = useState(0);
  const [id, setId] = useState({ mID: 0, mValue: "" });
  const idD = { mID: 0, mValue: "" };
  const [id1, setId1] = useState({ mID: 0, mValue: "" });

  const [cweMaster, setCweMaster] = useState([]);
  const [cweDetails, setCweDetails] = useState([]);
  const [cweArray, setCweArray] = useState([]);
  // console.log("cweArray",cweArray);
  const [cweArray1, setCweArray1] = useState([]);

  const [cweArray2, setCweArray2] = useState([]);
  const [cweArray3, setCweArray3] = useState([]);

  //  const cweArray = cweArray;
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [id2, setid2] = useState(-1);
  useEffect(() => {
    console.log("keyi", keyi, "keyc", keyc, "keyb", keyb);
  }, [keyi, keyc, keyb]);
  const [customObj, setCustomObj] = useState({
    cweid: 0,
    productId: null,
    cwetypeId: 0,
    typeName: "",
    description: "",
    isPrint: false,
    label: "",
    cwetypes: "",
    checked: false,
    levelId: 0,
    subLevelId: 0,
    levelName: "",
    subLevelName: "",
    refId: null,
  });
  const customObjD = {
    cweid: 0,
    productId: null,
    cwetypeId: 0,
    typeName: "",
    description: "",
    isPrint: false,
    label: "",
    cwetypes: "",
    checked: false,
    levelId: 0,
    subLevelId: 0,
    levelName: "",
    subLevelName: "",
    refId: null,
  };
  const columns = [
    {
      field: "typeName",
      headerName: "C/W/E Name",
      width: 400,
    },
    {
      field: "cwetypes",
      headerName: "C/W/E",
      width: 200,
    },
    {
      field: "edit",
      headerName: "C/W/E Description",
      width: 200,
      renderCell: (param) => {
        const handleOpen = (e, typ, idd) => {
          // debugger;
          if (typ === "edit") {
            setFlag(false);
          }

          setOpen(true);
          setid2(idd);
        };
        const handleClose = () => {
          setOpen(false);
          setFlag(true);
          setid2(-1);
        };
        const handleChange = (e) => {
          if (type === "Cover") {
            if (id2 > 0) {
              const a5 = cweArray1.findIndex((x) => x.cweid === id2);
              cweArray1[a5].description = e.target.value;
            }

            setCweArray1([...cweArray1]);
          } else if (type === "Benefits") {
            if (id2 > 0) {
              const a7 = cweArray2.findIndex((x) => x.cweid === id2);
              cweArray2[a7].description = e.target.value;
            }

            setCweArray2([...cweArray2]);
          } else if (type === "Product") {
            if (id2 > 0) {
              const a1 = cweArray3.findIndex((x) => x.cweid === id2);
              cweArray3[a1].description = e.target.value;
            }

            setCweArray3([...cweArray3]);
          } else {
            if (id2 > 0) {
              const a3 = cweArray.findIndex((x) => x.cweid === id2);
              cweArray[a3].description = e.target.value;
            }

            setCweArray([...cweArray]);
          }
        };
        const handleSave = () => {
          setOpen(false);
          setFlag(true);
        };
        const handleDelete = (e, did) => {
          //  debugger;
          if (keyi === undefined) {
            if (did > 0) {
              const newArr = cweArray3.filter((r) => (r.cweid !== did ? r : null));

              newArr.forEach((r, ind) => {
                newArr[ind].cweid = ind + 1;
              });

              setCweArray3([...newArr]);
            }
          } else if (keyi > -1 && keyc === undefined) {
            if (did > 0) {
              const newArr2 = cweArray.filter((r) => (r.cweid !== did ? r : null));

              newArr2.forEach((r, ind) => {
                newArr2[ind].cweid = ind + 1;
              });

              setCweArray([...newArr2]);
            }
          } else if (keyi > -1 && keyc > -1 && keyb === undefined) {
            if (did > 0) {
              const newArr4 = cweArray1.filter((r) => (r.cweid !== did ? r : null));

              newArr4.forEach((r, ind) => {
                newArr4[ind].cweid = ind + 1;
              });

              setCweArray1([...newArr4]);
            }
          } else if (keyi > -1 && keyc > -1 && keyb > -1) {
            if (did > 0) {
              const newArr6 = cweArray2.filter((r) => (r.cweid !== did ? r : null));

              newArr6.forEach((r, ind) => {
                newArr6[ind].cweid = ind + 1;
              });

              setCweArray2([...newArr6]);
            }
          }
        };
        return (
          <Grid container spacing={2} direction="row">
            <IconButton onClick={(e) => handleOpen(e, "view", param.id)}>
              <Visibility />
            </IconButton>
            <IconButton onClick={(e) => handleOpen(e, "edit", param.id)}>
              <Edit />
            </IconButton>
            <IconButton onClick={(e) => handleDelete(e, param.id)}>
              <Delete />
            </IconButton>

            <Modal
              hideBackdrop
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <MDBox sx={style}>
                <Grid container justifyContent="end" alignItems="end">
                  <IconButton onClick={handleClose}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>

                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="h4">Description</MDTypography>
                  </Grid>
                  {flag === true ? (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {type === "Product" && id2 > -1 && (
                        <TextareaAutosize
                          style={{ width: 600 }}
                          value={cweArray3[id2 - 1].description}
                          name="description"
                        />
                      )}
                      {type === "Benefits" && id2 > -1 && (
                        <TextareaAutosize
                          style={{ width: 600 }}
                          value={cweArray2[id2 - 1].description}
                          name="description"
                        />
                      )}
                      {type === "Cover" && id2 > -1 && (
                        <TextareaAutosize
                          style={{ width: 600 }}
                          value={cweArray1[id2 - 1].description}
                          name="description"
                        />
                      )}
                      {type === "Insurable Item" && id2 > -1 && (
                        <TextareaAutosize
                          style={{ width: 600 }}
                          value={cweArray[id2 - 1].description}
                          name="description"
                        />
                      )}
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {type === "Product" && id2 > -1 && (
                        <TextareaAutosize
                          style={{ width: 600 }}
                          value={cweArray3[id2 - 1].description}
                          onChange={handleChange}
                          name="description"
                        />
                      )}
                      {type === "Benefits" && id2 > -1 && (
                        <TextareaAutosize
                          style={{ width: 600 }}
                          value={cweArray2[id2 - 1].description}
                          onChange={handleChange}
                          name="description"
                        />
                      )}
                      {type === "Cover" && id2 > -1 && (
                        <TextareaAutosize
                          style={{ width: 600 }}
                          value={cweArray1[id2 - 1].description}
                          onChange={handleChange}
                          name="description"
                        />
                      )}
                      {type === "Insurable Item" && id2 > -1 && (
                        <TextareaAutosize
                          style={{ width: 600 }}
                          value={cweArray[id2 - 1].description}
                          onChange={handleChange}
                          name="description"
                        />
                      )}
                    </Grid>
                  )}
                </Grid>
                {flag === false ? (
                  <Grid container justifyContent="center" alignItems="center">
                    <MDButton color="primary" onClick={handleSave}>
                      Save
                    </MDButton>
                  </Grid>
                ) : null}
              </MDBox>
            </Modal>
          </Grid>
        );
      },
    },
    {
      field: "checkbox",
      headerName: "Print",
      width: 200,
      renderCell: (param) => {
        const handleChecked = (e, pid) => {
          if (type === "Cover") {
            if (pid > 0) {
              const abc4 = cweArray1.findIndex((x) => x.cweid === pid);

              cweArray1[abc4].isPrint = e.target.checked;
            }

            setCweArray1([...cweArray1]);
          } else if (type === "Benefits") {
            if (pid > 0) {
              const abc6 = cweArray2.findIndex((x) => x.cweid === pid);

              cweArray2[abc6].isPrint = e.target.checked;
            }

            setCweArray2([...cweArray2]);
          } else if (type === "Product") {
            if (pid > 0) {
              const abc8 = cweArray3.findIndex((x) => x.cweid === pid);

              cweArray3[abc8].isPrint = e.target.checked;
            }

            setCweArray3([...cweArray3]);
          } else {
            if (pid > 0) {
              const abc1 = cweArray.findIndex((x) => x.cweid === pid);

              cweArray[abc1].isPrint = e.target.checked;
            }

            setCweArray([...cweArray]);
          }
        };
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={param.row.isPrint}
                  onChange={(e) => handleChecked(e, param.row.cweid)}
                />
              }
              name={param.row.isPrint}
              label=""
            />
          </FormGroup>
        );
      },
    },
  ];
  const columns1 = [
    {
      field: "typeName",
      headerName: "C/W/E Name",
      width: 400,
    },
    {
      field: "cwetypes",
      headerName: "C/W/E",
      width: 200,
    },
    {
      field: "edit",
      headerName: "C/W/E Description",
      width: 200,
      renderCell: (param) => {
        const handleOpen = (e, idd) => {
          //  debugger
          setOpen(true);
          setid2(idd);
        };
        const handleClose = () => {
          setOpen(false);
          setFlag(true);
          setid2(-1);
        };
        const handleDelete = (e, did) => {
          const newArr = ProductJson.productClausesWarrentiesExclusions.filter(
            (x) => x.cweid !== did
          );
          newArr.forEach((a, a1) => {
            newArr[a1].cweid = a1 + 1;
          });
          ProductJson.productClausesWarrentiesExclusions = [];
          ProductJson.productClausesWarrentiesExclusions = [
            ...ProductJson.productClausesWarrentiesExclusions,
            ...newArr,
          ];
          setProductJson(dispatch, ProductJson);
        };
        return (
          <Grid container spacing={2} direction="row">
            <IconButton onClick={(e) => handleOpen(e, param.id)}>
              <Visibility />
            </IconButton>

            <IconButton onClick={(e) => handleDelete(e, param.id)}>
              <Delete />
            </IconButton>

            <Modal
              hideBackdrop
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <MDBox sx={style}>
                <Grid container justifyContent="end" alignItems="end">
                  <IconButton onClick={handleClose}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>

                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="h4">Description</MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    {type === "Product" && id2 > -1 && (
                      <TextareaAutosize
                        style={{ width: 600 }}
                        // value={cweArray3[id2 - 1].description}
                        value={
                          ProductJson.productClausesWarrentiesExclusions.filter(
                            (x) => x.levelId === 51
                          )[id2 - 1].description
                        }
                        name="description"
                      />
                    )}

                    {type === "Benefits" && id2 > -1 && (
                      <TextareaAutosize
                        style={{ width: 600 }}
                        value={
                          ProductJson.productClausesWarrentiesExclusions.filter(
                            (x) => x.levelId === 54
                          )[id2 - 1].description
                        }
                        name="description"
                      />
                    )}
                    {type === "Cover" && id2 > -1 && (
                      <TextareaAutosize
                        style={{ width: 600 }}
                        value={
                          ProductJson.productClausesWarrentiesExclusions.filter(
                            (x) => x.levelId === 53
                          )[id2 - 1].description
                        }
                        name="description"
                      />
                    )}
                    {type === "Insurable Item" && id2 > -1 && (
                      <TextareaAutosize
                        style={{ width: 600 }}
                        value={
                          ProductJson.productClausesWarrentiesExclusions.filter(
                            (x) => x.levelId === 52
                          )[id2 - 1].description
                        }
                        name="description"
                      />
                    )}
                  </Grid>
                </Grid>
              </MDBox>
            </Modal>
          </Grid>
        );
      },
    },
    {
      field: "checkbox",
      headerName: "Print",
      width: 200,
      editable: false,
      renderCell: (param) => (
        // {
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={param.row.isPrint} />}
            name={param.row.isPrint}
            label=""
          />
        </FormGroup>
      ),
      // },
    },
  ];

  const handleCustomClauses = (e, value) => {
    if (value === undefined) {
      customObj[e.target.name] = e.target.value;
      if (e.target.name === "typeName") {
        customObj.label = e.target.value;
      }
    } else {
      id1.mID = value.mID;
      id1.mValue = value.mValue;
      setId1(id1);
      customObj[e.target.id.split("-")[0]] = value.mID;
      // customObj.cwetypeId=value.cwetypeId;
      customObj.cwetypes = cweMaster.filter((x) => x.mID === value.mID)[0].cwetypes;
    }
    setCustomObj((prev) => ({ ...prev, ...customObj }));
  };

  const handleSetObjects = (e, value, types) => {
    //  debugger;
    const valueL = value;
    const idL = id;

    if (types === "cweId") {
      idL.mID = value.mID;
      idL.mValue = value.mValue;
      setCweId(value.mID);
      setId(idL);
    } else if (types === "cweMultiple") {
      if (type === "Cover") {
        valueL.forEach((a, a1) => {
          valueL[a1].cweid = a1 + 1;
        });
        setCweArray1(valueL);
      } else if (type === "Benefits") {
        valueL.forEach((a, a1) => {
          valueL[a1].cweid = a1 + 1;
        });
        setCweArray2(valueL);
      } else if (type === "Product") {
        valueL.forEach((a, a1) => {
          valueL[a1].cweid = a1 + 1;
        });

        setCweArray3(valueL);
      } else {
        valueL.forEach((a, a1) => {
          valueL[a1].cweid = a1 + 1;
        });

        setCweArray(valueL);
      }
    }
  };
  const addIt = () => {
    if (type === "Cover") {
      cweArray1.forEach((x1, key1) => {
        // debugger;
        cweArray1[key1].levelId = 53;
        cweArray1[key1].levelName = "Cover";
        if (ProductJson.policyType === "VersionV2") {
          cweArray1[key1].subLevelId = ProductJson.productInsurableItems[keyi].covers[keyc].coverId;

          cweArray1[key1].subLevelName =
            ProductJson.productInsurableItems[keyi].covers[keyc].coverName;
          ProductJson.productInsurableItems[keyi].covers[keyc].clauses = [
            ...ProductJson.productInsurableItems[keyi].covers[keyc].clauses,
            { ...cweArray1[key1] },
          ];
        } else {
          cweArray1[key1].subLevelId =
            ProductJson.productInsurableItems[keyi].productCovers[keyc].coverTypeId;
          cweArray1[key1].subLevelName =
            ProductJson.productInsurableItems[keyi].productCovers[keyc].cover;
          ProductJson.productInsurableItems[keyi].productCovers[keyc].clauses = [
            ...ProductJson.productInsurableItems[keyi].productCovers[keyc].clauses,
            { ...cweArray1[key1] },
          ];
        }
      });
      ProductJson.productClausesWarrentiesExclusions = [
        ...ProductJson.productClausesWarrentiesExclusions,
        ...cweArray1,
      ];
      setCweArray1([]);
    } else if (type === "Benefits") {
      cweArray2.forEach((x2, key2) => {
        cweArray2[key2].levelId = 54;
        cweArray2[key2].levelName = "Benefit";
        if (ProductJson.policyType === "VersionV2") {
          // cweArray1[key1].subLevelId =
          //   ProductJson.productInsurableItems[keyi].productCovers[keyc].CoverId;

          cweArray2[key2].subLevelName =
            ProductJson.productInsurableItems[keyi].covers[keyc].Benefits[keyb].benefitName;
          ProductJson.productInsurableItems[keyi].covers[keyc].Benefits[keyb].clauses = [
            ...ProductJson.productInsurableItems[keyi].covers[keyc].Benefits[keyb].clauses,
            { ...cweArray2[key2] },
          ];
        } else {
          // cweArray1[key1].subLevelId =
          //   ProductJson.productInsurableItems[keyi].productCovers[keyc].coverTypeId;
          cweArray2[key2].subLevelName =
            ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
              keyb
            ].benefitName;
          ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
            keyb
          ].clauses = [
            ...ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[keyb]
              .clauses,
            { ...cweArray2[key2] },
          ];
        }
      });
      ProductJson.productClausesWarrentiesExclusions = [
        ...ProductJson.productClausesWarrentiesExclusions,
        ...cweArray2,
      ];
      setCweArray2([]);
    } else if (type === "Product") {
      cweArray3.forEach((x3, key3) => {
        cweArray3[key3].levelId = 51;
        cweArray3[key3].levelName = "Product";
      });
      // setCweArray([...cweArray]);
      ProductJson.productClausesWarrentiesExclusions = [
        ...ProductJson.productClausesWarrentiesExclusions,
        ...cweArray3,
      ];

      setCweArray3([]);
    } else {
      cweArray.forEach((x, key) => {
        cweArray[key].levelId = 52;
        cweArray[key].levelName = "Insurable Item";
        cweArray[key].subLevelId = ProductJson.productInsurableItems[keyi].insurableItemTypeId;
        // const name = insurableItemMasterArray.filter(
        //   (x1) => x1.mID === ProductJson.productInsurableItems[keyi].insurableItemTypeId
        // )[0].mValue;
        const name = ProductJson.productInsurableItems[keyi].insurableItem;

        cweArray[key].subLevelName = name;
        ProductJson.productInsurableItems[keyi].clauses = [
          ...ProductJson.productInsurableItems[keyi].clauses,
          { ...cweArray[key] },
        ];
      });
      // setCweArray([...cweArray]);
      ProductJson.productClausesWarrentiesExclusions = [
        ...ProductJson.productClausesWarrentiesExclusions,
        ...cweArray,
      ];

      setCweArray([]);
    }
    ProductJson.productClausesWarrentiesExclusions.forEach((a, a1) => {
      ProductJson.productClausesWarrentiesExclusions[a1].cweid = a1 + 1;
    });
    setProductJson(dispatch, ProductJson);

    setId(idD);
  };
  const pushClause = () => {
    // debugger;
    setCustomObj(customObjD);
    if (keyi === undefined) {
      // cweArray3.push(customObj);
      // setCweArray3((prev) => [...prev, { ...customObj }]);
      customObj.cweid = cweArray3.length + 1;
      setCweArray3([...cweArray3, { ...customObj }]);
    } else if (keyi > -1 && keyc === undefined) {
      // setCweArray((prev) => [...prev, { ...customObj }]);
      customObj.cweid = cweArray.length + 1;

      setCweArray([...cweArray, { ...customObj }]);
    } else if (keyi > -1 && keyc > -1 && keyb === undefined) {
      // setCweArray1((prev) => [...prev, { ...customObj }]);
      customObj.cweid = cweArray1.length + 1;

      setCweArray1([...cweArray1, { ...customObj }]);
    } else {
      //  setCweArray2((prev) => [...prev, { ...customObj }]);
      customObj.cweid = cweArray2.length + 1;

      setCweArray2([...cweArray2, { ...customObj }]);
    }

    setDrawer(false);
    setId1(idD);
  };
  useEffect(async () => {
    const cwe = await getCwe();
    const abc = cwe.findIndex((x) => x.mType === "CWEType");
    if (cwe[abc].mdata.length > 0) {
      setCweMaster(cwe[abc].mdata);
    }
  }, []);
  useEffect(async () => {
    const cweDetail = await getCweDetails(ProductJson.lobid, cweId);
    if (cweDetail.length > 0) {
      setCweDetails(cweDetail);
    }
  }, [cweId]);
  useEffect(() => {
    console.log("99", ProductJson);
  }, [ProductJson]);
  useEffect(() => {
    console.log("990", cweArray);
  }, [cweArray]);
  const handleDrawer = () => {
    setDrawer(true);
  };
  const handleCloseDrawer = () => {
    setDrawer(false);
  };
  return (
    <MDBox sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        {viewFlag === false ? (
          <>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="cweId"
                value={id}
                onChange={(e, value) => handleSetObjects(e, value, "cweId")}
                renderInput={(params) => <MDInput {...params} label="Select C/W/E" />}
                options={cweMaster}
                getOptionLabel={(option) => option.mValue}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {type === "Product" && (
                <Autocomplete
                  id="arr"
                  multiple
                  options={cweDetails}
                  getOptionLabel={(option) => option.typeName}
                  value={cweArray3.map((x) => x)}
                  onChange={(e, value) => handleSetObjects(e, value, "cweMultiple")}
                  renderInput={(params) => (
                    <MDInput {...params} label={`${"Choose"}${" "}${id.mValue}`} />
                  )}
                />
              )}

              {type === "Insurable Item" && (
                <Autocomplete
                  id="arr"
                  multiple
                  options={cweDetails}
                  getOptionLabel={(option) => option.typeName}
                  value={cweArray.map((x) => x)}
                  onChange={(e, value) => handleSetObjects(e, value, "cweMultiple")}
                  renderInput={(params) => (
                    <MDInput {...params} label={`${"Choose"}${" "}${id.mValue}`} />
                  )}
                />
              )}

              {type === "Cover" && (
                <Autocomplete
                  id="arr"
                  multiple
                  options={cweDetails}
                  getOptionLabel={(option) => option.typeName}
                  value={cweArray1.map((x) => x)}
                  onChange={(e, value) => handleSetObjects(e, value, "cweMultiple")}
                  renderInput={(params) => (
                    <MDInput {...params} label={`${"Choose"}${" "}${id.mValue}`} />
                  )}
                />
              )}
              {type === "Benefits" && (
                <Autocomplete
                  id="arr"
                  multiple
                  options={cweDetails}
                  getOptionLabel={(option) => option.typeName}
                  value={cweArray2.map((x) => x)}
                  onChange={(e, value) => handleSetObjects(e, value, "cweMultiple")}
                  renderInput={(params) => (
                    <MDInput {...params} label={`${"Choose"}${" "}${id.mValue}`} />
                  )}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={handleDrawer}>Custom Clause</MDButton>
            </Grid>
          </>
        ) : null}

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {cweArray.length > 0 && type === "Insurable Item" ? (
            <MDBox sx={{ width: "100%" }}>
              <DataGrid
                autoHeight
                rows={cweArray}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.cweid}
              />
            </MDBox>
          ) : (
            <MDBox sx={{ width: "100%" }}>
              {ProductJson.productInsurableItems.length > 0 &&
              keyi > -1 &&
              ProductJson.productInsurableItems[keyi].clauses.length > 0 &&
              type === "Insurable Item" ? (
                <DataGrid
                  autoHeight
                  rows={ProductJson.productInsurableItems[keyi].clauses}
                  columns={columns1}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.cweid}
                />
              ) : null}
            </MDBox>
          )}

          {cweArray1.length > 0 && type === "Cover" ? (
            <MDBox sx={{ width: "100%" }}>
              <DataGrid
                autoHeight
                rows={cweArray1}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.cweid}
              />
            </MDBox>
          ) : (
            <MDBox sx={{ width: "100%" }}>
              {keyi > -1 && keyc > -1 && type === "Cover" ? (
                <DataGrid
                  autoHeight
                  rows={
                    ProductJson.policyType === "VersionV2"
                      ? ProductJson.productInsurableItems[keyi].covers[keyc].clauses
                      : ProductJson.productInsurableItems[keyi].productCovers[keyc].clauses
                  }
                  columns={columns1}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.cweid}
                />
              ) : null}
            </MDBox>
          )}

          {cweArray2.length > 0 && type === "Benefits" ? (
            <MDBox sx={{ width: "100%" }}>
              <DataGrid
                autoHeight
                rows={cweArray2}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.cweid}
              />
            </MDBox>
          ) : (
            <MDBox sx={{ width: "100%" }}>
              {keyi > -1 && keyc > -1 && keyb > -1 && type === "Benefits" ? (
                <DataGrid
                  autoHeight
                  rows={
                    ProductJson.policyType === "VersionV2"
                      ? ProductJson.productInsurableItems[keyi].covers[keyc].Benefits[keyb].clauses
                      : ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[
                          keyb
                        ].clauses
                  }
                  columns={columns1}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.cweid}
                />
              ) : null}
            </MDBox>
          )}

          {cweArray3.length > 0 && type === "Product" ? (
            <MDBox sx={{ width: "100%" }}>
              <DataGrid
                autoHeight
                rows={cweArray3}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.cweid}
              />
            </MDBox>
          ) : (
            <MDBox sx={{ width: "100%" }}>
              {ProductJson.productClausesWarrentiesExclusions.length > 0 && type === "Product" ? (
                <DataGrid
                  autoHeight
                  rows={ProductJson.productClausesWarrentiesExclusions.filter(
                    (x) => x.levelId === 51
                  )}
                  columns={columns1}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.cweid}
                />
              ) : null}
            </MDBox>
          )}
        </Grid>
      </Grid>
      <br />
      {viewFlag === false ? (
        <Grid container justifyContent="center" alignItems="center">
          <MDButton onClick={addIt}>Add C/W/E</MDButton>
        </Grid>
      ) : null}

      <Modal
        // anchor="right"
        open={drawer}
        onClose={handleCloseDrawer}
        // PaperProps={{
        //   sx: { width: "50%", padding: "32px" },
        // }}
      >
        <MDBox sx={style}>
          <CustomClause
            cweMaster={cweMaster}
            customObj={customObj}
            id1={id1}
            handleCustomClauses={handleCustomClauses}
            pushClause={pushClause}
          />
        </MDBox>
      </Modal>
      {/* <Drawer
              anchor="right"
              open={drawer}
              onClose={handleCloseDrawer}
              PaperProps={{
                sx: { width: "50%", padding: "32px" },
              }}
            >
              <MDBox role="presentation">
                <CustomClause
                  cweMaster={cweMaster}
                  customObj={customObj}
                  id1={id1}
                  handleCustomClauses={handleCustomClauses}
                  pushClause={pushClause}
                />
              </MDBox>
            </Drawer> */}
    </MDBox>
  );
}

export default Cwe;
