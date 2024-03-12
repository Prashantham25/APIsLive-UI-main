import { useEffect, useState } from "react";
import { Card, Autocomplete, Grid, Stack, Backdrop } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert2";
import success from "assets/images/Gifs/Success.gif";
import error from "assets/images/Gifs/error.gif";
import loader from "assets/images/Gifs/loading4.gif";
import MDInput from "../../../../../components/MDInput";
import {
  getDispatcherList,
  dispatcherTaskExecution,
  getMapperMaster,
  getMasterModule,
  createDispatcherTask,
} from "../../../data/index";
import MDButton from "../../../../../components/MDButton";

function CloneDispatcher() {
  const [master, setMasterData] = useState([]);
  const [dispatcherId, setDispatcherId] = useState(0);
  const [flag, setFlag] = useState(false);
  const [dispatcherObj, setDispatcherObj] = useState({});
  const [masterModule, setMasteModule] = useState([]);
  const [mapperMaster, setMapperMaster] = useState([]);
  const [loaderFlag, setLoaderFlag] = useState(false);
  const columns = [
    { field: "inputObject", headerName: "Dispatcher Input Object", width: 400 },
    { field: "outputObject", headerName: "Dispatcher Output Object", width: 400 },
    { field: "mapperName", headerName: "Mapper Name", width: 200 },
    { field: "methodName", headerName: "Method Name", width: 200 },
    { field: "sortOrder", headerName: "Sort Order", width: 100 },
  ];

  const onHandleAutocomplete = (e, value) => {
    setDispatcherId(value.mID);
  };
  const handleClick = async () => {
    const res = await dispatcherTaskExecution(dispatcherId);
    if (res.status === 200) {
      res.data.dispatcher.dispatcherTaskName = "";
      res.data.dispatcher.dispatcherId = 0;
      res.data.dispatcher.createdDate = new Date();
      res.data.dispatcher.dispatcherTaskDTO = res.data.dispatcher.dispatcherTaskDTO.map((x, i) => {
        const item = { ...x }; // copy instance
        item.dispatcherId = 0; // assign property a value
        item.dispatcherTaskId = 0; // assign property a value
        item.id = i + 1;
        if (item.mapperId !== null)
          item.mapperName = mapperMaster.filter((y) => y.mID === item.mapperId)[0].mValue;
        item.methodName = masterModule.filter(
          (z) => z.moduleConfigurationId === item.moduleConfigurationId
        )[0].methodName;
        return item; // replace original with new instance
      });
      setDispatcherObj(res.data.dispatcher);
      setFlag(true);
    }
  };
  const handleSaveDispatcher = async () => {
    // debugger;
    setLoaderFlag(true);
    const mas = [];
    master.map((c) => {
      mas.push(c.mValue);
      return mas;
    });
    if (dispatcherObj.dispatcherTaskName === "") {
      setLoaderFlag(false);
      swal.fire({
        imageUrl: error,
        imageHeight: 200,
        imageWidth: 250,
        text: "Please Enter Dispatcher Name",
      });
    } else if (mas.includes(dispatcherObj.dispatcherTaskName) === true) {
      setLoaderFlag(false);
      swal.fire({
        imageUrl: error,
        imageHeight: 200,
        imageWidth: 250,
        text: "Dispatcher with same name already exist!",
      });
    } else {
      const callHandleSave = await createDispatcherTask(dispatcherObj);
      if (callHandleSave.status === 200) {
        setLoaderFlag(false);
        swal.fire({
          imageUrl: success,
          imageHeight: 200,
          imageWidth: 250,
          text: callHandleSave.data.responseMessage,
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
    }
  };
  useEffect(async () => {
    const res = await getDispatcherList();
    const resp = await getMasterModule();
    const resp1 = await getMapperMaster();
    if (res.length > 0) setMasterData(res);
    if (resp.status === 1) setMasteModule(resp.moduleConfigurationDTO);
    if (resp1.status === 200) setMapperMaster(resp1.data);
  }, []);

  return (
    <div>
      <Card>
        <Grid container spacing={2} p={2}>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              id="communicationTypeId"
              name="communicationTypeId"
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
              <MDInput
                name="dispatcherTaskName"
                label="Dispatcher Name"
                value={dispatcherObj.dispatcherTaskName}
                onChange={(e) =>
                  setDispatcherObj({ ...dispatcherObj, dispatcherTaskName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="inputObject"
                label="Input Object Entity"
                value={dispatcherObj.inputObject}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="outputObject"
                label="Output Object Entity"
                value={dispatcherObj.outputObject}
              />
            </Grid>
            {dispatcherObj.dispatcherTaskDTO.length > 0 ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    autoHeight
                    rows={dispatcherObj.dispatcherTaskDTO}
                    columns={columns}
                    getRowId={(row) => row.id}
                  />
                </div>
              </Grid>
            ) : null}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="right" direction="row" spacing={4}>
                <MDButton onClick={handleSaveDispatcher}>Clone Dispatcher</MDButton>
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

export default CloneDispatcher;
