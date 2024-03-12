import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import swal from "sweetalert2";
import success from "assets/images/Gifs/Success.gif";
import MDBox from "../../../../../components/MDBox";
import {
  searchProductEntities,
  getMasterModule,
  GetMapperDetails,
  createDispatcherTask,
  saveMapperAndDispatcher,
} from "../../../data";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import EditMapper from "./editMapper";

const { Card, Grid, Autocomplete, Stack, IconButton, Modal } = require("@mui/material");

function Dispatcher() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);
  const columns = [
    { field: "id", headerName: "S.No", width: 150 },

    { field: "inputObject", headerName: "Dispatcher Input Object", width: 200 },
    { field: "outputObject", headerName: "Dispatcher Output Object", width: 200 },
    { field: "mapperName", headerName: "Mapper Name", width: 200 },
    { field: "methodName", headerName: "Method Name", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
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
            {/* <IconButton onClick={handleOpen}>
              <EditIcon />
            </IconButton> */}
          </>
        );
      },
    },
  ];
  const [methodName, setMethodName] = useState("");
  const [Method, setMethod] = useState({ methodName: "", moduleName: "" });
  const MethodD = { methodName: "", moduleName: "" };
  const [methodList, setMethodList] = useState([]);
  const [urlParamList, setUrlParamSet] = useState([]);
  const [masterModule, setMasterModule] = useState([]);
  const [mapperDTO, setMapperDTO] = useState([]);
  // const [entityResponse, setEntityResponse] = useState([]);
  const [moduleId, setmoduleId] = useState([]);
  const [entity, setEntity] = useState([]);
  const [ProductEntities, setProductEntities] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [urlpathName, setUrlName] = useState("");
  const [disp, setDisp] = useState(false);
  const [inputArray, setInuptArray] = useState([]);
  const [dispatcherObject, setdispatcherObject] = useState({
    dispatcherTaskName: "",
    isActive: null,
    inputObject: "",
    inputObjectId: null,
    outputObject: "",
    outputObjectId: null,
    createdDate: new Date(),
    dispatcherTaskDTO: [],
  });
  const [dispatcherTaskObject, setdispatcherTaskObject] = useState({
    id: "",
    dispatcherTaskName: "",
    api: "",
    responseMsg: "Success",
    inputObject: "",
    outputObject: "",
    inputObjectId: "",
    outputObjectId: "",
    inputTypeObject: "JSONObj",
    outputTypeObject: "JSONObj",
    moduleConfigurationId: 0.0,
    mapperId: null,
    mapperObjectDetails: {},
    sortOrder: null,
  });
  const dispatcherTaskObjectD = {
    id: "",
    dispatcherTaskName: "",
    api: "",
    responseMsg: "Success",
    inputObject: "",
    outputObject: "",
    inputObjectId: "",
    outputObjectId: "",
    inputTypeObject: "JSONObj",
    outputTypeObject: "JSONObj",
    moduleConfigurationId: 0.0,
    mapperId: null,
    mapperObjectDetails: {},
    sortOrder: null,
  };
  const handleAutoComplete = (e, value, type) => {
    dispatcherObject[e.target.id.split("-")[0]] = value.id;
    if (type === "inputObject") {
      dispatcherObject.inputObject = value.mValue;
      const arr = { mID: 0, mValue: "" };
      arr.mID = value.id;
      arr.mValue = value.mValue;
      inputArray.push(arr);
      setInuptArray(inputArray);
      // console.log("inputArray", inputArray);
    }
    if (type === "outputObject") {
      dispatcherObject.outputObject = value.mValue;
    }
    // dispatcherTaskObject.mapperObjectDetails = {
    //   ...dispatcherTaskObject.mapperObjectDetails,
    //   ...mapperDetails,
    // };

    setdispatcherObject(dispatcherObject);
    // console.log("1stObject", dispatcherObject);
  };
  // const handleAutoModule = (e, value) => {
  //   debugger;
  //   // setMethod(MethodD);

  //   Method.moduleName = value.methodName;
  //   setMethod(Method);
  //   // setMethod((prev) => ({ ...prev, ...Method }));
  // };
  const handleAutoCompleteDispatcherTask = (e, value, type) => {
    // debugger;
    // setdispatcherTaskObject(dispatcherTaskObjectD);
    if (type === "moduleConfigurationId") {
      dispatcherTaskObject[e.target.id.split("-")[0]] = value.moduleConfigurationId;
      const disp1 = moduleId.filter(
        (x) => x.moduleConfigurationId === dispatcherTaskObject.moduleConfigurationId
      )[0].isUrlparameter;
      setDisp(disp1);
      const modName = moduleId.filter(
        (mod) => mod.moduleConfigurationId === value.moduleConfigurationId
      )[0].moduleName;
      const modList = masterModule.filter((val) => val.moduleName === modName);
      const arr = [];
      modList.forEach((x) => {
        const obj = {};
        obj.mID = x.moduleConfigurationId;
        obj.methodName = x.methodName;
        obj.methodPath = x.methodPath;
        obj.moduleName = x.moduleName;
        arr.push(obj);
      });

      setMethodList(arr);
      // console.log("disp", disp);
    } else if (type === "methodName") {
      setMethodName(value.methodName);
      dispatcherTaskObject.api = value.methodPath;
      Method.methodName = value.moduleName;
      Method.moduleName = value.methodName;
      setMethod(Method);
      // dispatcherTaskObject.moduleConfigurationId = value.moduleConfigurationId;
      setModuleName(value.moduleName);

      setUrlName(value.methodName);
      if (
        masterModule.filter((x) => x.moduleConfigurationId === value.mID)[0].isUrlparameter === true
      ) {
        const urlParam = masterModule.filter((id) => id.moduleConfigurationId === value.mID)[0]
          .urlparamName;
        const paramData = [];
        const stringArray = urlParam.split(",");
        stringArray.forEach((x, key) => {
          const obj = {};
          obj.mID = key + 1;
          obj.mValue = x;
          paramData.push(obj);
        });
        setUrlParamSet(paramData);
      }
      // Method.moduleName = urlpathName;

      // console.log("moduleName", moduleName);
      // console.log("urlName", urlpathName);
    } else if (type === "inputObject") {
      dispatcherTaskObject.inputObject = value.mValue;
      dispatcherTaskObject.inputObjectId = value.mID;
    } else if (type === "outputObject") {
      dispatcherTaskObject.outputObjectId = value.mID;
      dispatcherTaskObject.outputObject = value.mValue;
      const arr = { mID: 0, mValue: "" };
      arr.mID = value.id;
      arr.mValue = value.mValue;
      inputArray.push(arr);
      setInuptArray(inputArray);
    }

    // setdispatcherTaskObject(dispatcherTaskObject);
    // console.log("dispatcherTaskObject", dispatcherTaskObject);
    setdispatcherTaskObject((prev) => ({ ...prev, ...dispatcherTaskObject }));
  };

  const [mapperObject, setmapperObject] = useState({
    mapperId: "",
    mapperName: "",
    mID: "",
    mValue: "",
    type: "",
    sourceComponent: "",
    targetComponent: "",
    createdDate: new Date(),
    isActive: true,
    mapperDetailsDTO: [],
  });

  const mapperObjectD = {
    mapperId: "",
    mapperName: "",
    mID: "",
    mValue: "",
    type: "",
    sourceComponent: "",
    targetComponent: "",
    createdDate: new Date(),
    isActive: true,
    mapperDetailsDTO: [],
  };

  const [mapperDetails, setmapperDetails] = useState({
    mapperId: null,
    sourceParameter: "",
    sourceParameterId: "",
    targetParameter: "",
    isBody: false,
  });
  const mapperDetailsD = {
    mapperId: null,
    sourceParameter: "",
    sourceParameterId: "",
    targetParameter: "",
    isBody: false,
  };
  const handleMapperInput = (e) => {
    mapperDetails.targetParameter = e.target.value;
    setmapperDetails((prev) => ({ ...prev, ...mapperDetails }));
  };
  const handleMapper = (e, value, type) => {
    // debugger;
    setmapperDetails(mapperDetailsD);
    if (type === "mapperSourceMapper") {
      mapperDetails[e.target.id.split("-")[0]] = value.mValue;
      mapperDetails.mapperId = mapperObject.mapperId;
      dispatcherTaskObject.mapperId = mapperObject.mapperId;
      mapperDetails.sourceParameterId = value.moduleConfigurationId;

      setmapperDetails((prev) => ({ ...prev, ...mapperDetails }));

      // setMapperDTO((prev) => [...prev, { mapperObject }]);
    }
  };
  const handleAutoMapper = (e, value, type) => {
    // debugger;
    // const len = rows.length;
    // mapperObject.id = len;

    mapperObject[e.target.id.split("-")[0]] = value.mapperId;
    mapperObject.mValue = value.mapperName;
    mapperObject.mID = value.mapperId;

    if (type === "mapperName") {
      mapperObject.mapperName = value.mapperName;
    }
    // mapperObject.sourceComponent = value.sourceComponent;
    mapperObject.targetComponent = value.targetComponent;
    mapperObject.type = value.type;
    // setEntityResponse(value.mapperDetailsDTO);

    // console.log("EntityResponse", entityResponse);
    mapperObject.sourceComponent = value.sourceComponent;

    // mapperObject.mapperDetailsDto = [...mapperObject.mapperDetailsDto, { ...mapperDetails }];
    // setmapperObject(mapperObject);

    // mapperDetails.sourceParameter = value.urlparamName;

    mapperObject.mapperDetailsDTO = [...mapperObject.mapperDetailsDTO, ...value.mapperDetailsDTO];

    setmapperObject((prev) => ({ ...prev, ...mapperObject }));

    // setmapperDetails(mapperDetails);

    // console.log("mapperObject", mapperObject);

    // setMapperDTO((prev) => [...prev, { ...mapperObject }]);
    // setMapperDTO(mapperObject);
  };

  useEffect(() => {
    // console.log("MapperDTO", mapperDTO);
    mapperDTO.forEach((item, i) => {
      // debugger;
      const dup = mapperDTO.filter((name) => name.mapperName === item.mapperName).length;
      if (dup > 1) {
        mapperDTO.splice(i, 1);
      }
    });
    setMapperDTO(mapperDTO);
  }, [mapperDTO]);

  const handleClick = () => {
    // debugger;
    const len = rows.length;
    dispatcherTaskObject.id = len;
    dispatcherTaskObject.sortOrder = len + 1;
    dispatcherTaskObject.mapperObjectDetails = {
      ...dispatcherTaskObject.mapperObjectDetails,
      ...mapperDetails,
    };
    setdispatcherTaskObject((prev) => ({ ...prev, ...dispatcherTaskObject }));
    dispatcherObject.dispatcherTaskDTO = [
      ...dispatcherObject.dispatcherTaskDTO,
      { ...dispatcherTaskObject },
    ];

    // setdispatcherTaskObject(dispatcherTaskObject);
    // setInuptArray([dispatcherTaskObject.outputObject]);
    setInuptArray((prev) => [...prev, dispatcherTaskObject.outputObject]);
    // mapperObject.mapperDetailsDto = [...mapperObject.mapperDetailsDto, ...entityResponse];
    // mapperObject.mapperDetailsDto = [...mapperObject.mapperDetailsDto, { ...mapperDetails }];
    // setRows([...rows, dispatcherTaskObject]);

    mapperObject.mapperDetailsDTO = [
      ...mapperObject.mapperDetailsDTO,
      { ...mapperDetails, targetParameter: mapperDetails.targetParameter },
    ];

    setmapperObject((prev) => ({ ...prev, ...mapperObject }));
    if (mapperDetails.sourceParameter !== "") {
      setMapperDTO((prev) => [...prev, { ...mapperObject }]);
    }
    // setmapperObject((prev) => ({ ...prev, ...mapperObject }));
    setRows([
      ...rows,
      {
        ...dispatcherTaskObject,
        mapperName: mapperObject.mapperName,
        methodName: Method.methodName,
        id: rows.length + 1,
      },
    ]);
    // setRows([...rows,{...dispatcherTaskObject}])

    // setdispatcherTaskObject(dispatcherTaskObjectD);
    setMethod(MethodD);
    setMethodName("");
    setmapperObject(mapperObjectD);
    setmapperDetails(mapperDetailsD);
    // setdispatcherTaskObject((prev) => ({ ...prev, ...dispatcherTaskObjectD }));
    // setmapperObject(mapperObjectD);
    setdispatcherTaskObject(dispatcherTaskObjectD);
    // console.log("mapperDetails", mapperDetails);
    // console.log("mapperObject", mapperObject);
    // console.log("DispatcherTaskObject", dispatcherTaskObject);
  };

  // useEffect(() => {
  //   console.log("DispatcherTaskObject", dispatcherTaskObject);
  // }, [dispatcherTaskObject]);

  useEffect(async () => {
    // debugger;
    const resp = await getMasterModule();
    if (resp.status === 1) {
      const masterList = resp.moduleConfigurationDTO.filter(
        (ele, ind) =>
          ind ===
          resp.moduleConfigurationDTO.findIndex((elem) => elem.moduleName === ele.moduleName)
      );
      // console.log("print", masterList);
      setMasterModule(resp.moduleConfigurationDTO);
      setmoduleId(masterList);
    }
    // await getMasterModule().then((response) => {
    //   const masterList = response.moduleConfigurationDTO.filter(
    //     (ele, ind) =>
    //       ind ===
    //       response.moduleConfigurationDTO.findIndex((elem) => elem.response === ele.moduleName)
    //   );
    //   console.log("print", masterList);
    //   setmoduleId(masterList);
    // });
    const productEntityData = await searchProductEntities();
    // console.log("productEntityData", productEntityData);
    setProductEntities([...productEntityData.data.data]);

    GetMapperDetails().then((response) => {
      setEntity(response.mapper);

      // console.log("printss", response);
    });
  }, []);

  const hanndleSave = async () => {
    // debugger;

    const callHandleSave = await createDispatcherTask(dispatcherObject);
    // console.log("asd", callHandleSave);
    // if (mapperDTO.length > 0) {
    //   handleUpdate();

    if (callHandleSave.status === 200) {
      swal.fire({
        imageUrl: success,
        imageHeight: 200,
        imageWidth: 250,
        text: callHandleSave.data.responseMessage,
      });
    }
  };
  const handleUpdate = async () => {
    // debugger;
    if (mapperDTO.length > 0) {
      const callUpdate = await saveMapperAndDispatcher(mapperDTO);
      // console.log("callupdate", callUpdate);
      // }
      if (callUpdate.data.status === 2) {
        hanndleSave();
      }
    } else {
      hanndleSave();
    }
  };

  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Dispatcher Configuration
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="dispatcherTaskName"
            label="Dispatcher Name"
            value={dispatcherObject.dispatcherTaskName}
            onChange={(e) =>
              setdispatcherObject({ ...dispatcherObject, dispatcherTaskName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="inputObjectId"
            onChange={(e, value) => handleAutoComplete(e, value, "inputObject")}
            options={ProductEntities}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput height="1.4375rem" {...params} label="Input Object Entity" required />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="Output Object Entity" /> */}
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="outputObjectId"
            // name="Select Attributes"
            // onChange={handleAutoCompletemodel}
            onChange={(e, value) => handleAutoComplete(e, value, "outputObject")}
            options={ProductEntities}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput height="1.4375rem" {...params} label="Output Object Entity" required />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="secondary">
            Dispatcher Task
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Task Name"
            value={dispatcherTaskObject.dispatcherTaskName}
            onChange={(e) =>
              setdispatcherTaskObject({
                ...dispatcherTaskObject,
                dispatcherTaskName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="Select Master Module" /> */}
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="moduleConfigurationId"
            options={moduleId}
            // onChange={handleAutoComplete2}
            // onChange={(e, value) => setTemp(obj.methodName)}
            // value={{ moduleName: Method.methodName }}
            value={
              dispatcherTaskObject.moduleConfigurationId !== 0.0
                ? {
                    mID: dispatcherTaskObject.moduleConfigurationId,
                    moduleName: moduleId.filter(
                      (x) => x.moduleConfigurationId === dispatcherTaskObject.moduleConfigurationId
                    )[0].moduleName,
                  }
                : null
            }
            onChange={(e, value) =>
              handleAutoCompleteDispatcherTask(e, value, "moduleConfigurationId")
            }
            getOptionLabel={(option) => option.moduleName}
            renderInput={(params) => <MDInput {...params} label="Select Master Module" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="Select Master Method" /> */}
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="methodName"
            options={methodList}
            value={
              methodName !== "" ? { mID: methodList.mID, methodName } : { mID: "", methodName: "" }
            }
            // onChange={handleAutoCompleteDispatcherTask}
            onChange={(e, value) => handleAutoCompleteDispatcherTask(e, value, "methodName")}
            getOptionLabel={(option) => option.methodName}
            renderInput={(params) => <MDInput {...params} label="Select Master Method" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="inputObject"
            onChange={(e, value) => handleAutoCompleteDispatcherTask(e, value, "inputObject")}
            options={inputArray}
            value={
              dispatcherTaskObject.inputObject !== ""
                ? inputArray.filter((x) => x.mValue === dispatcherTaskObject.inputObject)[0]
                : { mID: 0, mValue: "" }
            }
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput height="1.4375rem" {...params} label="API Input Object" required />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="API Output Object" /> */}
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="outputObject"
            // name="Select Attributes"
            // onChange={handleAutoComplete1}
            // value={{ outputObject: dispatcherTaskObject.outputObject }}
            onChange={(e, value) => handleAutoCompleteDispatcherTask(e, value, "outputObject")}
            options={ProductEntities}
            value={
              dispatcherTaskObject.outputObject !== ""
                ? ProductEntities.filter((x) => x.mValue === dispatcherTaskObject.outputObject)[0]
                : { mID: 0, mValue: "" }
            }
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput height="1.4375rem" {...params} label="API Output Object" required />
            )}
          />
        </Grid>
        {disp === true ? (
          <>
            {" "}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" color="secondary">
                Mapper Configuration
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="mapperId"
                value={{ mValue: mapperObject.mapperName }}
                options={entity}
                onChange={(e, value) => handleAutoMapper(e, value, "mapperName")}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="Select Object Mapper" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="sourceParameter"
                options={urlParamList}
                getOptionLabel={(option) => option.mValue}
                value={
                  mapperDetails.sourceParameter !== ""
                    ? {
                        // mID: dispatcherTaskObject.mapperObjectDetails.sourceParameter,
                        mValue: mapperDetails.sourceParameter,
                      }
                    : { mValue: "" }
                }
                onChange={(e, value) => handleMapper(e, value, "mapperSourceMapper")}
                renderInput={(params) => (
                  <MDInput {...params} label="Mapper Source Mapper" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="targetParameter"
                label="Mapper Target Parameter"
                value={mapperDetails.targetParameter}
                onChange={handleMapperInput}
              />
            </Grid>{" "}
          </>
        ) : null}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row" spacing={4}>
            <MDButton startIcon={<AddCircleOutlineIcon />} onClick={handleClick}>
              ADD TASK
            </MDButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {rows.length > 0 ? (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </div>
          ) : null}
        </Grid>
        {/* {dispatcherObject.dispatcherTaskDTO.length > 0 ? ( */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row" spacing={4}>
            <MDButton onClick={handleUpdate}>SAVE DISPATCHER</MDButton>
          </Stack>
        </Grid>
        {/* ) : null} */}
      </Grid>
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
            <EditMapper
              handleClose={handleOpen}
              entity={entity}
              urlpathName={urlpathName}
              moduleId={moduleId}
              moduleName={moduleName}
            />
          </Grid>
        </MDBox>
      </Modal>
    </Card>
  );
}

export default Dispatcher;
