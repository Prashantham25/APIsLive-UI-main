import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
import Modal from "@mui/material/Modal";
import { Snackbar, Alert, Backdrop, CircularProgress } from "@mui/material";

// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import {
  GetDynamicTargetProperty,
  getMas,
  // geEntitiess,
  // getMasterss,
  SaveDynamicListMapper,
  targetcomponentAPI,
  sourceProperty,
  searchProductEntities,
} from "../../../data";

import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import Edit from "./edit";
// import Clone from "./clone";
// import { object } from "prop-types";

const { Card, Grid, Autocomplete, Stack, IconButton } = require("@mui/material");

function ObjectMapper() {
  const [finalMapper, setFinalMapper] = useState([]);
  const [finalMapperID, setFinalMapperID] = useState(-1);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState(true);
  const [snackFlag, setSnackFlag] = useState(false);
  const handleClose = () => setOpen(false);
  // const handleOpen = () => setOpen(true);
  const handleEdit = (param) => {
    // debugger;
    setFinalMapperID(param.row.id);
    setOpen(true);
  };
  const handleCloseSnack = () => {
    setSnackFlag(false);
  };
  const columns = [
    { field: "id", headerName: "S.No", width: 100 },
    { field: "type", headerName: "Mapper Type", width: 200 },
    { field: "mapperName", headerName: "Mapper Name", width: 250 },
    { field: "sourceComponent", headerName: "Source Component", width: 250 },
    { field: "targetComponent", headerName: "Target Component", width: 250 },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      editable: true,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rows.filter((row) => row.id !== param.id);
          setRows([...newArray]);
        };
        return (
          <>
            <IconButton onClick={deleteRow}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEdit(param)}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const [rows1, setRows1] = useState([]);
  const [config, setConfig] = useState({
    configid: "",
  });
  const [sourceObj, setSoureObj] = useState({ mID: "", mValue: "" });
  const sourceObjD = { mID: "", mValue: "" };
  const [targetPram, setTargetPram] = useState({ mID: "", mValue: "" });
  const targetPramD = { mID: "", mValue: "" };
  const [FinalMapperDTO, setFinalMapperDTO] = useState([]);
  const [sourceComponents, setSourceComponents] = useState([]);
  const [product, setProduct] = useState([]);
  const [ProductEntities, setProductEntities] = useState([]);
  const [ProductMasterDTO, setProductMasterDTO] = useState([]);

  const [MapperDTO, setMapperDTO] = useState({
    id: "",

    mapperName: "",
    sourceComponent: "",
    targetComponent: "",
    sourceComponentId: "",
    targetComponentId: "",
    isActive: true,
    createdDate: new Date(),
    mapperDetailsDTO: [],

    type: null,
    name: null,
    entity: null,

    RuleOrRateDynamicTargetProperty: [],
    RuleOrRateDynamicSourceResponse: [],
  });
  console.log("kk", MapperDTO);
  const MapperDTOD = {
    id: "",
    mapperName: "",
    sourceComponent: "",
    targetComponent: "",
    sourceComponentId: "",
    targetComponentId: "",
    isActive: true,
    createdDate: new Date(),
    mapperDetailsDTO: [],

    type: null,
    name: null,
    entity: null,

    RuleOrRateDynamicTargetProperty: [],
    RuleOrRateDynamicSourceResponse: [],
  };
  const [mapperDetailsDTObject, setMapperDetailsDTObject] = useState({
    id: "",
    sourceParameter: "",
    targetParameter: "",
    sourceParameterId: "",
    targetParameterId: "",
    isActive: true,
    createdDate: new Date(),
    targetParameterPath: "",
    isBody: true,
    isValue: false,
    isArray: false,
    fldLength: 0,
    sortOrder: 0,
    dataType: "",
  });
  const mapperDetailsDTObjectD = {
    id: "",
    sourceParameter: "",
    targetParameter: "",
    sourceParameterId: null,
    targetParameterId: "",
    isActive: true,
    createdDate: new Date(),
    targetParameterPath: "",
    isBody: true,
    isValue: false,
    isArray: false,
    fldLength: 0,
    sortOrder: 0,
    dataType: "",
  };

  const [Obj, setObj] = useState({ mID: 0, mValue: "" });
  const objD = { mID: 0, mValue: "" };
  const [srcObj, setSrcObj] = useState({ mID: 0, mValue: "" });
  const srcObjD = { mID: 0, mValue: "" };
  const [targetObj, setTargetObj] = useState({ mID: 0, mValue: "" });
  const targtObjD = { mID: 0, mValue: "" };

  const handleAutocomplete = async (e, value, type) => {
    // debugger;
    MapperDTO[e.target.id.split("-")[0]] = value.mID;

    // console.log("config", config);
    if (type === "mType") {
      setProduct([]);
      setObj(value);
      config.configid = value.mID;
      setConfig(config);

      if (value.mValue === "Entity") {
        setProduct([...ProductEntities]);
      } else {
        setProduct([]);
      }
    }

    if (type === "source") {
      setSrcObj(value);
      MapperDTO.sourceComponent = value.mValue;

      const SourceIndex = ProductEntities.findIndex((s) => s.mID === value.mID);

      if (SourceIndex > -1) {
        const sourceData = JSON.parse(ProductEntities[SourceIndex].structure);
        console.log("111", sourceData);

        const abc = await sourceProperty(sourceData, type);
        console.log("abhi", abc);

        for (let i = 0; i < abc.data.length; i += 1) {
          abc.data[i].mID = i;
          console.log("abhis", abc);
          setSourceComponents(abc.data);

          console.log("11", sourceComponents);
        }
      }
    }

    setMapperDTO((prev) => ({ ...prev, ...MapperDTO }));
  };

  const handleAutoTargetComponent = async (e, value) => {
    MapperDTO[e.target.id.split("-")[0]] = value.mID;
    setTargetObj(value);
    MapperDTO.targetComponent = value.mValue;
    if (config.configid === 181) {
      const add = await targetcomponentAPI(value.mID, 88);
      setFinalMapperDTO(add.data);
    }
    // else {
    // }
    setMapperDTO((prev) => ({ ...prev, ...MapperDTO }));
  };

  const handleCheckBox = (e) => {
    // debugger;
    if (e.target.name === "isValue" || e.target.name === "isArray") {
      mapperDetailsDTObject[e.target.name] = e.target.checked;
    }

    // setMapperDetailsDTObject(mapperDetailsDTObject);
    setMapperDetailsDTObject((prev) => ({ ...prev, ...mapperDetailsDTObject }));
  };

  const handleTargetModal = (e, value, type) => {
    // debugger;

    mapperDetailsDTObject[e.target.id.split("-")[0]] = value.mID;
    if (type === "sourceParameter") {
      mapperDetailsDTObject.sourceParameter = value.mValue;

      if (finalMapper[finalMapperID].RuleOrRateDynamicSourceResponse.length > 0) {
        finalMapper[finalMapperID].RuleOrRateDynamicSourceResponse = [
          ...finalMapper[finalMapperID].RuleOrRateDynamicSourceResponse,
          ...sourceComponents,
        ];
      }

      setSoureObj(value);
    }

    if (type === "targetParameter") {
      // debugger
      mapperDetailsDTObject.targetParameterPath = value.mType;
      mapperDetailsDTObject.targetParameter = value.mData;
      mapperDetailsDTObject.targetParameterId = value.mValue;
      targetPram.mID = value.mData;
      targetPram.mValue = value.mValue;
      if (value.mData === null) {
        mapperDetailsDTObject.targetParameter = value.mValue;
      }
      // MapperDTO.RuleOrRateDynamicTargetProperty = [
      //   ...MapperDTO.RuleOrRateDynamicTargetProperty,
      //   ...FinalMapperDTO,
      // ];
      if (finalMapper[finalMapperID].RuleOrRateDynamicTargetProperty.length > 0) {
        finalMapper[finalMapperID].RuleOrRateDynamicTargetProperty = [
          ...finalMapper[finalMapperID].RuleOrRateDynamicTargetProperty,
          ...FinalMapperDTO,
        ];
      }

      setTargetPram(targetPram);
    }

    setMapperDetailsDTObject(mapperDetailsDTObject);

    // setMapperDetailsDTObject(mapperDetailsDTObjectD);
    console.log("handleTargetModal", mapperDetailsDTObject);
  };
  const handleClick1 = (type, data) => {
    //  debugger;

    if (type === undefined) {
      const len = rows1.length;
      mapperDetailsDTObject.id = len;
      setMapperDetailsDTObject((prev) => ({ ...prev, ...mapperDetailsDTObject }));

      finalMapper[finalMapperID].mapperDetailsDTO = [
        ...finalMapper[finalMapperID].mapperDetailsDTO,
        { ...mapperDetailsDTObject },
      ];

      setRows1([...rows1, { ...mapperDetailsDTObject }]);
      setFinalMapper([...finalMapper]);
      setMapperDetailsDTObject(mapperDetailsDTObjectD);
      setTargetPram(targetPramD);
      setSoureObj(sourceObjD);
    } else if (type === "excel") {
      finalMapper[finalMapperID].mapperDetailsDTO = [];
      data.shift();
      const arr = data.map(
        ([
          sourceParameter,
          targetParameter,
          targetParameterPath,
          isBody,
          isValue,
          isArray,
          isHeader,
          fldLength,
          sortOrder,
          dataType,
        ]) => ({
          sourceParameter,
          targetParameter,
          targetParameterPath,
          isBody,
          isValue,
          isArray,
          isHeader,
          fldLength,
          sortOrder,
          dataType,
        })
      );
      //   debugger;
      finalMapper[finalMapperID].mapperDetailsDTO = [
        ...finalMapper[finalMapperID].mapperDetailsDTO,
        ...arr,
      ];
      setFinalMapper([...finalMapper]);
      setSnackFlag(true);
      setOpen(false);
    }
  };

  const handleClick = () => {
    // debugger;
    const len = rows.length;
    MapperDTO.id = len;
    setFinalMapper([...finalMapper, { ...MapperDTO }]);
    setRows([...rows, { ...MapperDTO }]);
    setMapperDTO(MapperDTOD);
    setObj(objD);
    setTargetObj(targtObjD);
    setSrcObj(srcObjD);
  };

  useEffect(() => {
    console.log("ss", rows);
  }, [rows]);

  useEffect(async () => {
    GetDynamicTargetProperty().then((response) => {
      // setConfig([...response]);
      console.log("dynamic", response);
    });
    getMas().then((response) => {
      setProductMasterDTO([...response]);
      console.log("getMaster", response);
    });

    const productEntityData = await searchProductEntities();
    console.log("productEntityData", productEntityData);
    if (productEntityData.data.data.length > 0) {
      setProductEntities([...productEntityData.data.data]);
      setOpen1(false);
    }
  }, []);

  const handleSaveEntity = async () => {
    console.log("finalMapper", finalMapper);
    finalMapper.forEach((x, i) => {
      delete finalMapper[i].id;
      finalMapper[i].mapperDetailsDTO.forEach((y, j) => {
        delete finalMapper[i].mapperDetailsDTO[j].id;
      });
      const obj = {
        sourceParameter: "",
        targetParameter: "",

        // isActive: true,
        createdDate: new Date(),
        targetParameterPath: null,
        isBody: false,
        isValue: null,
        isArray: null,
        isHeader: null,
        fldLength: 0,
        sortOrder: 0,
        dataType: "",
      };
      obj.sourceParameter = "MapperName";
      obj.targetParameter = finalMapper[i].mapperName;
      finalMapper[i].mapperDetailsDTO = [...finalMapper[i].mapperDetailsDTO, { ...obj }];
    });

    const callCreateEntityss = await SaveDynamicListMapper(finalMapper);
    console.log("asd", callCreateEntityss);
    if (callCreateEntityss.status === 200) {
      swal({
        text: "Data Saved Successfully",
        icon: "success",
      });
    } else {
      swal({
        text: "Failed to save the data, Server error",

        icon: "error",
      });
    }
  };

  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Object Mapper
          </MDTypography>
        </Grid>

        <>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Mapper Name"
              value={MapperDTO.mapperName}
              onChange={(e) => setMapperDTO((prev) => ({ ...prev, mapperName: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              id="type"
              options={
                ProductMasterDTO.length > 0
                  ? ProductMasterDTO.filter((x) => x.mType === "Mapper")[0].mdata
                  : []
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              onChange={(e, value) => handleAutocomplete(e, value, "mType")}
              value={Obj}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Select Config Type" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              id="sourceComponentId"
              onChange={(e, value) => handleAutocomplete(e, value, "source")}
              value={srcObj}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={ProductEntities}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Source Component" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            {/* <MDInput label="DB Schema" /> */}
            <Autocomplete
              id="targetComponentId"
              options={product}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              onChange={handleAutoTargetComponent}
              value={targetObj}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Target Component" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="right" direction="row" spacing={2}>
              <MDButton onClick={handleClick} startIcon={<AddCircleOutlineIcon />}>
                ADD MAPPER
              </MDButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {rows.length > 0 ? (
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  autoHeight
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            ) : null}
          </Grid>
        </>
      </Grid>
      {rows.length > 0 ? (
        <Grid container justifyContent="center" alignItems="center">
          <MDButton onClick={handleSaveEntity}>SAVE OBJECT MAPPER</MDButton>
        </Grid>
      ) : null}
      <br />
      <Modal sx={{ overflowY: "auto", m: "2rem" }} open={open} onClose={handleClose}>
        <MDBox
          sx={{
            position: "absolute",
            top: "40%",
            left: "40%",
            width: "70%",
            transform: "translate(-30%, -30%)",

            bgcolor: "background.paper",

            p: 2,
          }}
        >
          <Grid ml={2} mr={2}>
            <Stack justifyContent="right" direction="row" spacing={2}>
              <MDButton color="white" round onClick={handleClose} textAlign="right">
                x
              </MDButton>
            </Stack>
            <Edit
              handleClose={handleClose}
              FinalMapperDTO={FinalMapperDTO}
              handleTargetModal={handleTargetModal}
              mapperDetailsDTObject={mapperDetailsDTObject}
              setMapperDetailsDTObject={setMapperDetailsDTObject}
              rows1={rows1}
              setRows1={setRows1}
              sourceComponents={sourceComponents}
              handleClick1={handleClick1}
              handleCheckBox={handleCheckBox}
              sourceObj={sourceObj}
              targetPram={targetPram}
            />
          </Grid>
        </MDBox>
      </Modal>
      <Snackbar
        open={snackFlag}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Excel Uploaded Successfully
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open1}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
}

export default ObjectMapper;
