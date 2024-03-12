import { useEffect, useState } from "react";
import { Card, Autocomplete, Grid, Stack, Backdrop, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert2";
import success from "assets/images/Gifs/Success.gif";
import error from "assets/images/Gifs/error.gif";
import loader from "assets/images/Gifs/loading4.gif";
import clonedeep from "lodash.clonedeep";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import {
  getDispatcherList,
  dispatcherTaskExecution,
  getMapperMaster,
  getMasterModule,
  createDispatcherTask,
  saveMapperAndDispatcher,
  searchProductEntities,
  getMapperDetails,
} from "../../../data/index";
import MDButton from "../../../../../components/MDButton";

function EditDispatcher() {
  const [dispatcherObj, setDispatcherObj] = useState({});
  const [dispatcherTaskObj, setDispatcherTaskObj] = useState({});
  const [dispatcherTaskObjCopy] = useState({});
  const [flag, setFlag] = useState(false);
  const [master, setMasterData] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const [ProductEntity, setProductEntity] = useState([]);
  const [dispatcherId, setDispatcherId] = useState(0);
  const [loaderFlag, setLoaderFlag] = useState(false);
  const [masterModule, setMasteModule] = useState([]);
  const [mapperMaster, setMapperMaster] = useState([]);
  const [moduleName, setModuleName] = useState([]);
  const [urlParamMaster, setUrlParam] = useState([]);
  const [mapperDetails, setMapperDetails] = useState({});
  const [mapperDetailsObj, setMapperJson] = useState({});
  const [mapperDetailsCopy] = useState({});
  const [mapperId, setMapperId] = useState(0);
  const [mapperDetailsArray, setMapperDetailsArray] = useState([]);

  const columns = [
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      editable: true,
      renderCell: (param) => {
        const onEdit = () => {
          if (
            masterModule.find((x) => x.methodName === param.row.methodName).isUrlparameter === true
          ) {
            let arr = masterModule.find((x) => x.methodName === param.row.methodName).urlparamName;
            arr = arr.split(",");
            setUrlParam(arr);
          }
          setEditFlag(true);
          setDispatcherTaskObj(param.row);
          setMapperId(mapperMaster.find((x) => x.mValue === param.row.mapperName).mID);
        };
        const handleDelete = () => {
          setEditFlag(false);
          const newArray = dispatcherObj.dispatcherTaskDTO.filter((x) => x.id !== param.id);
          newArray.forEach((x, i) => {
            newArray[i].id = i + 1;
          });
          dispatcherObj.dispatcherTaskDTO = newArray;
          setDispatcherObj((prev) => ({ ...prev, ...dispatcherObj }));
        };
        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Edit" placement="bottom" arrow>
              <IconButton onClick={onEdit}>
                <EditIcon style={{ color: "dodgerblue" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" placement="bottom" arrow>
              <IconButton onClick={handleDelete}>
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
    { field: "dispatcherTaskName", headerName: "Dispatcher Task Name", width: 200 },
    { field: "inputObject", headerName: "Dispatcher Input Object", width: 200 },
    { field: "outputObject", headerName: "Dispatcher Output Object", width: 200 },
    { field: "mapperName", headerName: "Mapper Name", width: 200 },
    { field: "methodName", headerName: "Method Name", width: 200 },
    { field: "sortOrder", headerName: "Sort Order", width: 100 },
  ];

  const onHandleAutocomplete = (e, value) => {
    setDispatcherId(value.mID);
  };

  const HandleAutocomplete = (e, value) => {
    dispatcherObj[e.target.id.split("-")[0]] = value.mValue;
    setDispatcherObj((prev) => ({ ...prev, ...dispatcherObj }));
  };

  const handleUpdateTask = () => {
    const arr = dispatcherObj.dispatcherTaskDTO.filter((x) => x.id !== dispatcherTaskObj.id);
    dispatcherObj.dispatcherTaskDTO = [];
    dispatcherObj.dispatcherTaskDTO = [...arr];
    dispatcherObj.dispatcherTaskDTO = [
      ...dispatcherObj.dispatcherTaskDTO,
      { ...dispatcherTaskObj },
    ];
    if (mapperDetailsObj.mapperId > 0) {
      mapperDetailsObj.isBody = false;
      if (mapperDetailsArray.length > 0) {
        const containsflag = !!mapperDetailsArray.find(
          (x) => x.mapperId === mapperDetailsObj.mapperId
        );
        if (containsflag === true) {
          const id = mapperDetailsArray.findIndex((x) => x.mapperId === mapperDetailsObj.mapperId);
          mapperDetailsArray[id].mapperDetailsDTO = [
            ...mapperDetailsArray[id].mapperDetailsDTO,
            { ...mapperDetailsObj },
          ];
          mapperDetailsArray.forEach((x, i) => {
            const dupLen = mapperDetailsArray.filter(
              (y) => y.mapperId === mapperDetailsArray[i].mapperId
            ).length;
            if (dupLen > 1) mapperDetailsArray.splice(i, 1);
          });
          setMapperDetailsArray(mapperDetailsArray);
        } else {
          mapperDetails.mapperDetailsDTO = [
            ...mapperDetails.mapperDetailsDTO,
            { ...mapperDetailsObj },
          ];
          let maparr = mapperDetailsArray;
          maparr = [...maparr, { ...mapperDetails }];
          setMapperDetailsArray(maparr);
        }
      } else {
        mapperDetails.mapperDetailsDTO = [
          ...mapperDetails.mapperDetailsDTO,
          { ...mapperDetailsObj },
        ];
        mapperDetailsArray.push(mapperDetails);
        setMapperDetailsArray(mapperDetailsArray);
      }
      setMapperDetails(clonedeep(mapperDetailsCopy));
      setMapperJson(clonedeep(mapperDetailsCopy));
    }
    setDispatcherObj((prev) => ({ ...prev, ...dispatcherObj }));
    setDispatcherTaskObj(clonedeep(dispatcherTaskObjCopy));
    setUrlParam([]);
    setEditFlag(false);
  };
  const handleAddDispTask = () => {
    dispatcherTaskObj.dispatcherId = dispatcherObj.dispatcherId;
    dispatcherTaskObj.dispatcherTaskId = null;
    dispatcherTaskObj.id = dispatcherObj.dispatcherTaskDTO.length + 1;
    dispatcherTaskObj.inputTypeObject = "JSONObj";
    dispatcherTaskObj.outputTypeObject = "JSONObj";
    dispatcherTaskObj.mapperId = dispatcherTaskObj.mapperId > 0 ? dispatcherTaskObj.mapperId : null;
    dispatcherTaskObj.mapperName =
      dispatcherTaskObj.mapperId !== null
        ? mapperMaster.filter((y) => y.mID === dispatcherTaskObj.mapperId)[0].mValue
        : "";
    dispatcherTaskObj.responseMsg = "Success";
    dispatcherTaskObj.methodName = masterModule.filter(
      (z) => z.moduleConfigurationId === dispatcherTaskObj.moduleConfigurationId
    )[0].methodName;
    dispatcherObj.dispatcherTaskDTO = [
      ...dispatcherObj.dispatcherTaskDTO,
      { ...dispatcherTaskObj },
    ];
    if (mapperDetailsObj.mapperId > 0) {
      mapperDetailsObj.isBody = false;
      if (mapperDetailsArray.length > 0) {
        const containsflag = !!mapperDetailsArray.find(
          (x) => x.mapperId === mapperDetailsObj.mapperId
        );
        if (containsflag === true) {
          const id = mapperDetailsArray.findIndex((x) => x.mapperId === mapperDetailsObj.mapperId);
          mapperDetailsArray[id].mapperDetailsDTO = [
            ...mapperDetailsArray[id].mapperDetailsDTO,
            { ...mapperDetailsObj },
          ];
          mapperDetailsArray.forEach((x, i) => {
            const dupLen = mapperDetailsArray.filter(
              (y) => y.mapperId === mapperDetailsArray[i].mapperId
            ).length;
            if (dupLen > 1) mapperDetailsArray.splice(i, 1);
          });
          setMapperDetailsArray(mapperDetailsArray);
        } else {
          mapperDetails.mapperDetailsDTO = [
            ...mapperDetails.mapperDetailsDTO,
            { ...mapperDetailsObj },
          ];
          let maparr = mapperDetailsArray;
          maparr = [...maparr, { ...mapperDetails }];
          setMapperDetailsArray(maparr);
        }
      } else {
        mapperDetails.mapperDetailsDTO = [
          ...mapperDetails.mapperDetailsDTO,
          { ...mapperDetailsObj },
        ];
        mapperDetailsArray.push(mapperDetails);
        setMapperDetailsArray(mapperDetailsArray);
      }
      setMapperDetails(clonedeep(mapperDetailsCopy));
      setMapperJson(clonedeep(mapperDetailsCopy));
    }
    setDispatcherObj((prev) => ({ ...prev, ...dispatcherObj }));
    setDispatcherTaskObj(clonedeep(dispatcherTaskObjCopy));
    setUrlParam([]);
    setAddFlag(false);
  };
  const onHandleDispatcerTask = (e, value, type) => {
    switch (type) {
      case "AutoComplete":
        dispatcherTaskObj[e.target.id.split("-")[0]] = value;
        break;
      case "dropdown":
        dispatcherTaskObj[e.target.id.split("-")[0]] = value.mValue;
        break;
      case "methodName":
        dispatcherTaskObj[e.target.id.split("-")[0]] = value.methodName;
        dispatcherTaskObj.api = masterModule.find(
          (x) => x.methodName === value.methodName
        ).methodPath;
        dispatcherTaskObj.moduleConfigurationId = masterModule.find(
          (x) => x.methodName === value.methodName
        ).moduleConfigurationId;
        break;
      case "input":
        dispatcherTaskObj[e.target.name] = e.target.value;
        break;
      default:
        dispatcherTaskObj[e.target.name] = e.target.value;
        break;
    }
    if (type === "methodName") {
      if (masterModule.find((x) => x.methodName === value.methodName).isUrlparameter === true) {
        let arr = masterModule.find((x) => x.methodName === value.methodName).urlparamName;
        arr = arr.split(",");
        setUrlParam(arr);
      }
    }
    setDispatcherTaskObj((prev) => ({ ...prev, ...dispatcherTaskObj }));
  };

  const handleMapperDetails = (e, value, type) => {
    switch (type) {
      case "id":
        setMapperId(value.mID);
        dispatcherTaskObj.mapperId = value.mID;
        dispatcherTaskObj.mapperName = value.mValue;
        setDispatcherTaskObj((prev) => ({ ...prev, ...dispatcherTaskObj }));
        mapperDetailsObj.mapperId = value.mID;
        setMapperDetails((prev) => ({ ...prev, ...mapperDetailsObj }));
        break;
      case "sourceParameter":
        mapperDetailsObj.sourceParameter = value;
        setMapperDetails((prev) => ({ ...prev, ...mapperDetailsObj }));
        break;
      case "targetParameter":
        mapperDetailsObj.targetParameter = e.target.value;
        setMapperDetails((prev) => ({ ...prev, ...mapperDetailsObj }));
        break;
      default:
        break;
    }
  };

  const handleAddTask = () => {
    setAddFlag(true);
  };
  // useEffect(() => {
  //   console.log("dispatcherObj", dispatcherObj);
  // }, [dispatcherObj]);
  // useEffect(() => {
  //   console.log("dispatcherTaskObj", dispatcherTaskObj);
  // }, [dispatcherTaskObj]);
  // useEffect(() => {
  //   console.log("mapperDetails", mapperDetails);
  // }, [mapperDetails]);
  // useEffect(() => {
  //   console.log("mapperArray", mapperDetailsArray);
  // }, [mapperDetailsArray]);
  // useEffect(() => {
  //   console.log("mapperDetailsObj", mapperDetailsObj);
  // }, [mapperDetailsObj]);
  // useEffect(() => {
  //   console.log("urp", urlParamMaster);
  // }, [urlParamMaster]);

  useEffect(async () => {
    if (mapperId !== 0) {
      const data = await getMapperDetails(mapperId);
      if (data.status === 1) setMapperDetails(data.mapper);
    }
  }, [mapperId]);
  useEffect(async () => {
    setLoaderFlag(true);
    const [rep1, rep2, rep3, rep4] = await Promise.all([
      searchProductEntities(),
      getDispatcherList(),
      getMasterModule(),
      getMapperMaster(),
    ]);
    if (rep1.data.data.length > 0) setProductEntity([...rep1.data.data]);
    if (rep2.length > 0) setMasterData(rep2);
    if (rep3.status === 1) setMasteModule(rep3.moduleConfigurationDTO);
    if (rep4.status === 200) setMapperMaster(rep4.data);
    setLoaderFlag(false);
    const data = Array.from(new Set(rep3.moduleConfigurationDTO.map((e) => e.moduleName)));
    setModuleName([...data]);
  }, []);

  const DispSave = async () => {
    const callHandleSave = await createDispatcherTask(dispatcherObj);
    if (callHandleSave.status === 200) {
      setLoaderFlag(false);
      swal.fire({
        imageUrl: success,
        imageHeight: 200,
        imageWidth: 250,
        text: callHandleSave.data.responseMessage,
      });
    } else if (callHandleSave.status === 401) {
      setLoaderFlag(false);
      swal.fire({
        imageUrl: error,
        imageHeight: 200,
        imageWidth: 250,
        text: "Session Expired! Please Login.",
      });
    } else {
      setLoaderFlag(false);
      swal.fire({
        imageUrl: error,
        imageHeight: 200,
        imageWidth: 250,
        text: callHandleSave.data.responseMessage,
      });
    }
  };

  const handleSaveDispatcher = async () => {
    setLoaderFlag(true);
    if (mapperDetailsArray.length > 0) {
      const callMapperUpdate = await saveMapperAndDispatcher(mapperDetailsArray);
      if (callMapperUpdate.status === 200) {
        await DispSave();
      } else if (callMapperUpdate.status === 401) {
        setLoaderFlag(false);
        swal.fire({
          imageUrl: error,
          imageHeight: 200,
          imageWidth: 250,
          text: "Session Expired! Please Login.",
        });
      } else {
        setLoaderFlag(false);
        swal.fire({
          imageUrl: error,
          imageHeight: 200,
          imageWidth: 250,
          text: "Error Updating Mapper Details.",
        });
      }
    } else {
      await DispSave();
    }
  };

  const handleClick = async () => {
    const res = await dispatcherTaskExecution(dispatcherId);
    if (res.status === 200) {
      res.data.dispatcher.dispatcherTaskDTO = res.data.dispatcher.dispatcherTaskDTO.map((x, i) => {
        const item = { ...x }; // copy instance
        item.id = i + 1;
        if (item.mapperId !== null)
          item.mapperName = mapperMaster.filter((y) => y.mID === item.mapperId)[0].mValue;
        item.methodName = masterModule.filter(
          (z) => z.moduleConfigurationId === item.moduleConfigurationId
        )[0].methodName;
        item.moduleName = masterModule.filter(
          (z) => z.moduleConfigurationId === item.moduleConfigurationId
        )[0].moduleName;
        return item; // replace original with new instance
      });
      setDispatcherObj(res.data.dispatcher);
      setFlag(true);
    }
  };
  return (
    <div>
      <Card>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4" color="primary">
              Edit Dispatcher
            </MDTypography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              id="dispatcherId"
              name="dispatcherId"
              options={master.length > 0 ? master : []}
              onChange={(e, value) => onHandleAutocomplete(e, value)}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Dispatcher Name" required />}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <MDButton onClick={handleClick}>Search</MDButton>
          </Grid>
        </Grid>
        {flag ? (
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="inputObject"
                name="inputObject"
                options={ProductEntity.length > 0 ? ProductEntity : []}
                value={
                  dispatcherObj.inputObject !== ""
                    ? ProductEntity.filter((x) => x.mValue === dispatcherObj.inputObject)[0]
                    : { mID: 0, mValue: "" }
                }
                onChange={(e, value) => HandleAutocomplete(e, value)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="Input Object Entity" required />
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
                id="outputObject"
                name="outputObject"
                options={ProductEntity.length > 0 ? ProductEntity : []}
                value={
                  dispatcherObj.outputObject !== ""
                    ? ProductEntity.filter((x) => x.mValue === dispatcherObj.outputObject)[0]
                    : { mID: 0, mValue: "" }
                }
                onChange={(e, value) => HandleAutocomplete(e, value)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="Output Object Entity" required />
                )}
              />
            </Grid>
            {editFlag || addFlag ? (
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5" color="primary">
                    Dispatcher Task
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    name="dispatcherTaskName"
                    label="Dispatcher Task Name"
                    value={dispatcherTaskObj.dispatcherTaskName}
                    onChange={(e, value) => onHandleDispatcerTask(e, value, "input")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    id="moduleName"
                    name="moduleName"
                    options={moduleName.length > 0 ? moduleName : []}
                    value={dispatcherTaskObj.moduleName}
                    onChange={(e, value) => onHandleDispatcerTask(e, value, "AutoComplete")}
                    renderInput={(params) => (
                      <MDInput {...params} label="Select Module Name" required />
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
                    id="methodName"
                    name="methodName"
                    options={
                      masterModule.length > 0
                        ? masterModule.filter((x) => x.moduleName === dispatcherTaskObj.moduleName)
                        : []
                    }
                    value={
                      dispatcherTaskObj.methodName !== ""
                        ? masterModule.filter(
                            (x) => x.methodName === dispatcherTaskObj.methodName
                          )[0]
                        : ""
                    }
                    onChange={(e, value) => onHandleDispatcerTask(e, value, "methodName")}
                    getOptionLabel={(option) => option.methodName}
                    renderInput={(params) => (
                      <MDInput {...params} label="Select Method Name" required />
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
                    id="inputObject"
                    name="inputObject"
                    options={ProductEntity.length > 0 ? ProductEntity : []}
                    value={
                      dispatcherTaskObj.inputObject !== ""
                        ? ProductEntity.filter((x) => x.mValue === dispatcherTaskObj.inputObject)[0]
                        : { mID: 0, mValue: "" }
                    }
                    onChange={(e, value) => onHandleDispatcerTask(e, value, "dropdown")}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => (
                      <MDInput {...params} label="API Input Object" required />
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
                    id="outputObject"
                    name="outputObject"
                    options={ProductEntity.length > 0 ? ProductEntity : []}
                    value={
                      dispatcherTaskObj.outputObject !== ""
                        ? ProductEntity.filter(
                            (x) => x.mValue === dispatcherTaskObj.outputObject
                          )[0]
                        : { mID: 0, mValue: "" }
                    }
                    onChange={(e, value) => onHandleDispatcerTask(e, value, "dropdown")}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => (
                      <MDInput {...params} label="API Output Object" required />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    name="sortOrder"
                    label="Sort Order"
                    value={dispatcherTaskObj.sortOrder}
                    onChange={(e, value) => onHandleDispatcerTask(e, value, "input")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5" color="primary">
                    Mapper Details
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    id="mapperName"
                    name="mapperName"
                    options={mapperMaster.length > 0 ? mapperMaster : []}
                    value={
                      dispatcherTaskObj.mapperName !== ""
                        ? mapperMaster.filter((x) => x.mValue === dispatcherTaskObj.mapperName)[0]
                        : { mID: 0, mValue: "" }
                    }
                    onChange={(e, value) => handleMapperDetails(e, value, "id")}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => (
                      <MDInput {...params} label="Source Object Mapper" required />
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
                    name="sourceParameter"
                    options={urlParamMaster.length > 0 ? urlParamMaster : []}
                    value={mapperDetailsObj.sourceParameter}
                    onChange={(e, value) => handleMapperDetails(e, value, "sourceParameter")}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput {...params} label="Mapper Source Name" required />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    name="targetParameter"
                    label="Mapper Target Parameter"
                    value={mapperDetailsObj.targetParameter}
                    onChange={(e, value) => handleMapperDetails(e, value, "targetParameter")}
                  />
                </Grid>
                {editFlag ? (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Stack justifyContent="right" direction="row" spacing={4}>
                      <MDButton onClick={handleUpdateTask}>Update Task</MDButton>
                    </Stack>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Stack justifyContent="right" direction="row" spacing={4}>
                      <MDButton onClick={handleAddDispTask}>Add</MDButton>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            ) : null}
            {addFlag === false ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={4}>
                  <MDButton onClick={handleAddTask}>Add Task</MDButton>
                </Stack>
              </Grid>
            ) : null}
            {dispatcherObj.dispatcherTaskDTO.length > 0 ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    autoHeight
                    rows={dispatcherObj.dispatcherTaskDTO}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={5}
                  />
                </div>
              </Grid>
            ) : null}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="right" direction="row" spacing={4}>
                <MDButton onClick={handleSaveDispatcher}>Edit Dispatcher</MDButton>
              </Stack>
            </Grid>
          </Grid>
        ) : null}
        <Backdrop
          sx={{ backgroundColor: "transparent", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loaderFlag}
        >
          <img
            alt=""
            src={loader}
            style={{ justifyContent: "center", height: "150px", width: "150px" }}
          />
        </Backdrop>
      </Card>
    </div>
  );
}
export default EditDispatcher;
