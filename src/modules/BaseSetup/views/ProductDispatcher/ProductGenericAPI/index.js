import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Stack,
  Autocomplete,
  Tooltip,
  IconButton,
  TextareaAutosize,
  Backdrop,
} from "@mui/material";
import ReactJson from "react-json-view";
import loadergif from "assets/images/Gifs/loading4.gif";
import success from "assets/images/Gifs/Success.gif";
import oops from "assets/images/Gifs/somethingwentwrong.gif";
import swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import { searchProduct } from "../../Products/ProductSearch/data/index";
import {
  searchProductEntities,
  getDispatcherList,
  GetProductMasterAPIbyProductID,
  getMasterList,
  executeApi,
  SaveProductMasterApi,
  UpdateProductMasterApiList,
} from "../../../data/index";

// const style = {
//   position: "absolute",
//   alignItems: "center",
//   top: "20%",
//   left: "20%",
//   right: "20%",
//   bottom: "20%",
//   bgcolor: "background.paper",
//   p: 4,
// };

function ProductGenericAPI() {
  const data = {
    includeFields: ["ProductCode", "ProductName", "PolicyType", "ProductId"],
  };
  const [ProdList, setProdList] = useState([]);
  const [EntitiesList, setEntities] = useState([]);
  const [dispatcherList, setDispList] = useState([]);
  const [masList, setMasList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [loader, setLoader] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [executeData, setExecuteData] = useState({});
  const [executeApiname, setExecuteApi] = useState("");
  const [request, setRequest] = useState("");
  const requestD = "";
  const [executionOutput, setExecutionOutput] = useState({});
  const executionOutputD = {};
  const [json, setJson] = useState({
    productId: "",
    apiName: "",
    inputParameter: "",
    outputParameter: "",
    activity: "",
    inputParameterId: "",
    outputParameterId: "",
    activityId: "",
    activityType: "",
  });
  const jsonD = {
    productId: "",
    apiName: "",
    inputParameter: "",
    outputParameter: "",
    activity: "",
    inputParameterId: "",
    outputParameterId: "",
    activityId: "",
    activityType: "",
  };
  const [apiListMaster, setApiList] = useState([]);
  const columns = [
    { field: "apiName", headerName: "API Name", width: 250 },
    { field: "inputParameter", headerName: "Input Object", width: 300 },
    { field: "outputParameter", headerName: "Output Object", width: 300 },
    { field: "activity", headerName: "Dispatcher Activity", width: 200 },
    { field: "activityType", headerName: "Activity", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      editable: true,
      renderCell: (param) => {
        const handleExecute = () => {
          const productDetails = ProdList.find((x) => x.productId === param.row.productId);
          setExecuteApi(param.row.apiName);
          setExecuteData((prev) => ({ ...prev, ...productDetails }));
          setFlag(true);
        };
        const handleDelete = () => {
          const newArray = apiListMaster.filter((x) => x.apiName !== param.id);
          setApiList([...newArray]);
        };
        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Execute API" placement="bottom" arrow>
              <IconButton onClick={handleExecute}>
                <ArrowForwardIcon style={{ color: "dodgerblue" }} />
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
  ];

  useEffect(async () => {
    setLoader(true);
    const ProductList = await searchProduct(data);
    if (ProductList.status === 200) setProdList([...ProductList.data]);
    const entities = await searchProductEntities();
    if (entities.status === 200) setEntities([...entities.data.data]);
    const dispList = await getDispatcherList();
    if (dispList.length > 0) setDispList([...dispList]);
    const masterList = await getMasterList();
    if (masterList.length > 0) setMasList([...masterList]);
    setLoader(false);
  }, []);

  const onHandleAutocomplete = async (e, value, type) => {
    switch (type) {
      case "Product":
        json.productId = value.productId;
        setJson((prev) => ({ ...prev, ...json }));
        break;
      case "Mapper":
        json[e.target.id.split("-")[0]] = value.mValue;
        setJson((prev) => ({ ...prev, ...json }));
        break;
      default:
        break;
    }
    if (type === "Product") {
      const apiListRes = await GetProductMasterAPIbyProductID(value.productId);
      if (apiListRes.length > 0) {
        setApiList([...apiListRes]);
        setUpdateFlag(true);
      }
    }
  };

  const onInputChange = (e) => {
    json[e.target.name] = e.target.value;
    setJson((prev) => ({ ...prev, ...json }));
  };

  const handleAdd = () => {
    const abc = [...apiListMaster, json];
    setJson((prev) => ({ ...prev, ...jsonD }));
    setApiList(abc);
  };

  const handleExecution = async () => {
    setLoader(true);
    const output = await executeApi(executeApiname, request, executeData.productCode);
    if (output.status === 200) {
      setShowFlag(true);
      setLoader(false);
      setExecutionOutput(output.data);
    } else {
      setLoader(false);
    }
  };

  const handleExecClose = () => {
    setRequest(requestD);
    setFlag(false);
    setShowFlag(false);
    setExecutionOutput((prev) => ({ ...prev, ...executionOutputD }));
  };

  const handleSave = async () => {
    const resp =
      updateFlag === true
        ? await UpdateProductMasterApiList(apiListMaster)
        : await SaveProductMasterApi(apiListMaster);
    if (resp.status === 200) {
      swal.fire({
        imageUrl: success,
        imageHeight: 200,
        imageWidth: 250,
        text: resp.data.apiListSaveResponse,
      });
    } else {
      swal.fire({
        imageUrl: oops,
        imageHeight: 200,
        imageWidth: 250,
      });
    }
  };

  return (
    <Card>
      <MDBox>
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="body1" color="primary">
              Generic API
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              id="productId"
              name="productId"
              options={ProdList.length > 0 ? ProdList : []}
              onChange={(e, value) => onHandleAutocomplete(e, value, "Product")}
              getOptionLabel={(option) => option.productName}
              renderInput={(params) => <MDInput {...params} label="Product Name" required />}
            />
          </Grid>
        </Grid>
        {flag === false ? (
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="API Name"
                name="apiName"
                required
                value={json.apiName}
                onChange={(e) => onInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="inputParameter"
                name="inputParameter"
                value={
                  json.inputParameter !== ""
                    ? EntitiesList.filter((x) => x.mValue === json.inputParameter)[0]
                    : { mID: 0, mValue: "" }
                }
                options={EntitiesList.length > 0 ? EntitiesList : []}
                onChange={(e, value) => onHandleAutocomplete(e, value, "Mapper")}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="Select Input Object" required />
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
                id="outputParameter"
                name="outputParameter"
                value={
                  json.outputParameter !== ""
                    ? EntitiesList.filter((x) => x.mValue === json.outputParameter)[0]
                    : { mID: 0, mValue: "" }
                }
                options={EntitiesList.length > 0 ? EntitiesList : []}
                onChange={(e, value) => onHandleAutocomplete(e, value, "Mapper")}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="Select Output Object" required />
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
                id="activity"
                name="activity"
                value={
                  json.activity !== ""
                    ? dispatcherList.filter((x) => x.mValue === json.activity)[0]
                    : { mID: 0, mValue: "" }
                }
                options={dispatcherList.length > 0 ? dispatcherList : []}
                onChange={(e, value) => onHandleAutocomplete(e, value, "Mapper")}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Select Dispacther" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="activityType"
                name="activityType"
                value={
                  json.activityType !== ""
                    ? masList.filter((x) => x.mValue === json.activityType)[0]
                    : { mID: 0, mValue: "" }
                }
                options={masList.length > 0 ? masList : []}
                onChange={(e, value) => onHandleAutocomplete(e, value, "Mapper")}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Activity" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Stack justifyContent="right" direction="row" spacing={2}>
                <MDButton onClick={() => handleAdd()}>ADD API</MDButton>
              </Stack>
            </Grid>
            {apiListMaster.length > 0 ? (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    autoHeight
                    rows={apiListMaster}
                    columns={columns}
                    getRowId={(row) => row.apiName}
                    components={{ Toolbar: GridToolbar }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack justifyContent="flex-end" direction="row" spacing={2}>
                    {updateFlag === false ? (
                      <MDButton onClick={() => handleSave()}>SAVE</MDButton>
                    ) : (
                      <MDButton onClick={() => handleSave()}>UPDATE</MDButton>
                    )}
                  </Stack>
                </Grid>
              </>
            ) : null}
          </Grid>
        ) : (
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="flex-end" direction="row" spacing={2}>
                <MDButton onClick={() => handleExecClose()}>X</MDButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox>
                <MDTypography>
                  Product Code : {executeData.productCode} <br /> Api Name : {executeApiname}
                </MDTypography>
                <TextareaAutosize
                  minRows={5}
                  style={{
                    width: "800px",
                    border: "0.1px solid #ada5a5 ",
                    height: "auto",
                    overflow: "auto",
                    resize: "none",
                    padding: "8px",
                  }}
                  label="Request"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                />
                {showFlag === true ? (
                  <MDBox>
                    <ReactJson src={executionOutput} />
                  </MDBox>
                ) : null}
                <Stack justifyContent="flex-end" direction="row" spacing={2}>
                  <MDButton onClick={() => handleExecution()}>Execute</MDButton>
                </Stack>
              </MDBox>
            </Grid>
          </Grid>
        )}
      </MDBox>
      <Backdrop
        sx={{ backgroundColor: "transparent", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <img
          alt=""
          src={loadergif}
          style={{ justifyContent: "center", height: "150px", width: "150px" }}
        />
      </Backdrop>
    </Card>
  );
}

export default ProductGenericAPI;
