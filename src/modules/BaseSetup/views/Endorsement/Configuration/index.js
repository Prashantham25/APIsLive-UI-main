import {
  Grid,
  Autocomplete,
  Stack,
  IconButton,
  Icon,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Backdrop,
  CircularProgress,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextareaAutosize,
  Paper,
} from "@mui/material";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert2";
import {
  SearchProduct,
  getMasterData,
  //   GetEndorsementConfigByProductId,
  GetProductJsonV2,
  //   UpdateEndrosementConfig,
  //   SaveEndrosementConfig,
  GetEndorsementConfigV2ByProductId,
  SaveEndorsementConfigV2,
} from "../Endorsement/data";
import { searchProductPayload, autoStyle, modelStyle } from "../Endorsement/data/Json";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import { jsonToPaths } from "../../../../../Common/RenderControl/Version3/RenderControlFunctions";
// import MDLoader from "../../../../../components/MDLoader";
// import MDBox from "../../../../../components/MDBox";

const handleKeyDown = (e) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};

function ParamMapper({ paths, onParameter2, data }) {
  return (
    <Grid container spacing={2}>
      {paths.map((x) => (
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Tooltip title={x.path}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    data ? data.filter((x1) => x1.parameterPath === x.path).length > 0 : false
                  }
                  onChange={(e) => onParameter2(e, x)}
                />
              }
              label={x.parameter}
            />
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
}

function EndorsementConfiguration() {
  const [masters, setMasters] = useState({
    products: [],
    EndorsementType: [],
  });

  const [payloadObj, setPayloadObj] = useState([]);

  //   const [productJson,setProductJson] = useState({});
  const [policyJson, setPolicyJson] = useState({});
  const [policyJsonPaths, setPolicyJsonPaths] = useState([]);
  const [policyJsonLevels, setPolicyJsonLevels] = useState({});
  const [selectedID, setSelectedID] = useState(0);
  const [modalFlag, setModalFlag] = useState(false);
  const [modalFlag1, setModalFlag1] = useState(false);
  const [loader, setLoader] = useState(false);
  const [SaveOrUpdateFlag, setSaveOrUpdateFlag] = useState("");
  const [swap, setSwap] = useState({ sno1: "", sno2: "", sn1: "", sn2: "" });
  const [obj, setObj] = useState({
    endorsementConfigId: 0,
    productId: 0,
    productCode: "",
    endorsementConfigName: "",
    endorsementType: 0,
    ratingApi: null,
    filterCriteria: null,
    riskParameters: [],
  });
  const [paramDetails, setParamDetails] = useState({
    parameterName: "",
    parameterPath: "",
    parameterMode: "",
    displayName: "",
    controlType: "",
    options: "",
    dateFormat: "",
  });

  const onPolicyJson = (e) => {
    const strToObj = JSON.parse(e.target.value);
    setPolicyJson(strToObj);
  };

  useEffect(() => {
    const arr1 = jsonToPaths(policyJson);
    let arr2 = [];
    const obj1 = {};
    // const arr3 = [];

    // filtering all root level object or array parameter names, like ProposerDetails, PremiumDetails, PaymentDetails, DocumentDetails etc
    arr1.forEach((x) => {
      const pathSplit = x.path.split(".");
      if (pathSplit.length !== 1) {
        arr2.push(pathSplit[0]);
      }
    });
    // deleting duplicates keys
    arr2.forEach((x) => {
      obj1[x] = {};
    });

    // converting obj keys to arr
    arr2 = Object.keys(obj1);

    arr1.forEach((x1) => {
      arr2.forEach((x2) => {
        const pathSplit = x1.path.split(".");
        if (pathSplit[0] === x2) {
          if (pathSplit[1].length === 1) {
            if (pathSplit.length > 3) obj1[x2][pathSplit[2]] = "";
          } else if (pathSplit.length > 2) obj1[x2][pathSplit[1]] = "";
        }
      });
    });

    arr2.forEach((x) => {
      obj1[x] = Object.keys(obj1[x]);
    });

    console.log("arr2", arr2, obj1, arr1);

    setPolicyJsonPaths([...arr1]);
    setPolicyJsonLevels({ ...obj1 });
  }, [policyJson]);

  useEffect(async () => {
    const res = await SearchProduct(searchProductPayload);
    const res1 = await getMasterData();
    if (Array.isArray(res1))
      res1.forEach((x) => {
        if (x.mType === "EndorsementType") masters.EndorsementType = x.mdata;
      });

    masters.products = Array.isArray(res) ? res : [];
    setMasters({ ...masters });
  }, []);

  const onProduct = async (e, v) => {
    if (v !== null) {
      setLoader(true);
      // const res = await GetEndorsementConfigByProductId(v.productId);
      const res2 = await GetEndorsementConfigV2ByProductId(v.productId);
      const res3 = await GetProductJsonV2(v.productId);
      setLoader(false);
      if (res3?.finalResult?.policyJson) setPolicyJson(JSON.parse(res3.finalResult.policyJson));
      else setPolicyJson({});
      // setProductJson({ ...res1.finalResult });
      obj.productId = v.productId;
      obj.productCode = v.productCode;
      if (res2.length > 0) setSaveOrUpdateFlag("Update");
      else setSaveOrUpdateFlag("Save");
      setPayloadObj([...res2.map((x, i) => ({ SNo: i + 1, ...x }))]);
      setObj({ ...obj });
    }
  };

  const onMode1 = (e, p, n) => {
    const arr1 = payloadObj[selectedID].riskParameters;
    const arr2 = [];
    arr1.forEach((x) => {
      if (x.parameterPath === p.parameterPath) {
        if (n === "parameterMode") arr2.push({ ...x, parameterMode: parseInt(e.target.value, 10) });
        if (n === "IsArray") arr2.push({ ...x, IsArray: e.target.checked });
      } else arr2.push({ ...x });
    });
    payloadObj[selectedID].riskParameters = [...arr2];
    setPayloadObj([...payloadObj]);
  };

  const onDisplayName = (e, p) => {
    const arr = payloadObj[selectedID].riskParameters;
    arr.forEach((x, i) => {
      if (x.parameterPath === p.parameterPath) arr[i].displayName = e.target.value;
    });
    payloadObj[selectedID].riskParameters = arr;
    setPayloadObj([...payloadObj]);
  };

  const onDeleteParameter = (p) => {
    const arr1 = [...payloadObj[selectedID].riskParameters];
    const arr2 = arr1.filter((x1) => x1.parameterPath !== p.parameterPath);
    payloadObj[selectedID].riskParameters = arr2;
    setPayloadObj([...payloadObj]);
  };

  const endorsementColumns = [
    {
      field: "SNo",
      headerName: "SNo",
      width: 100,
      renderCell: (p) => <MDTypography variant="h6">{p.row.SNo}</MDTypography>,
    },
    {
      field: "endorsementConfigName",
      headerName: "Name",
      width: 300,
      renderCell: (p) => <MDTypography variant="h6">{p.row.endorsementConfigName}</MDTypography>,
    },
    {
      field: "endorsementType",
      headerName: "Endorsement Type",
      width: 300,
      renderCell: (p) => (
        <MDTypography variant="h6">
          {masters.EndorsementType.filter((x) => x.mID === p.row.endorsementType)?.[0]?.mValue}
        </MDTypography>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell: (p) => (
        <Stack direction="row" spacing={2}>
          <IconButton
            onClick={() => {
              setSelectedID(p.row.SNo - 1);
              setModalFlag(true);
            }}
          >
            <Icon color="primary">edit</Icon>
          </IconButton>
          <IconButton disabled>
            <Icon color="error">delete</Icon>
          </IconButton>
        </Stack>
      ),
    },
    {
      field: "Action1",
      headerName: "Info",
      width: 200,
      renderCell: (p) => (
        <Tooltip title={`endorsementConfigId : ${p.row.endorsementConfigId}`}>
          <IconButton>
            <Icon color="primary">info</Icon>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const parameterColumns = [
    {
      field: "SNo",
      headerName: "SNo",
      width: 60,
    },
    {
      field: "parameterName",
      headerName: "Parameter Name",
      width: 220,
    },
    {
      field: "displayName",
      headerName: "Display Name",
      width: 250,
      renderCell: (p) => (
        <MDInput value={p.row.displayName} onChange={(e) => onDisplayName(e, p.row)} />
      ),
    },
    {
      field: "parameterPath",
      headerName: "Parameter Path",
      width: 250,
    },

    {
      field: "Action",
      headerName: "Parameter Mode",
      width: 200,
      renderCell: (p) => (
        <RadioGroup
          row
          value={p.row.parameterMode}
          onChange={(e) => onMode1(e, p.row, "parameterMode")}
        >
          <Stack direction="row" spacing={2}>
            <FormControlLabel value={0} control={<Radio />} label="Edit" />
            <FormControlLabel value={1} control={<Radio />} label="View" />
          </Stack>
        </RadioGroup>
      ),
    },

    {
      field: "additionalConfig",
      headerName: "Add Details",
      width: 100,
      renderCell: (p) => (
        <IconButton
          onClick={() => {
            setModalFlag1(true);
            setParamDetails({ ...p.row });
          }}
        >
          <Icon color="warning">post_add</Icon>
        </IconButton>
      ),
    },
    {
      field: "IsArray",
      headerName: "Is Array",
      width: 70,
      renderCell: (p) => (
        <Checkbox checked={p.row.IsArray} onChange={(e) => onMode1(e, p.row, "IsArray")} />
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 70,
      renderCell: (p) => (
        <IconButton onClick={() => onDeleteParameter(p.row)}>
          <Icon color="error">delete</Icon>
        </IconButton>
      ),
    },
  ];

  const onHandel1 = (v, n) => {
    obj[n] = v;
    setObj({ ...obj });
  };

  const onHandel2 = (v, n) => {
    payloadObj[selectedID][n] = v;
    setPayloadObj([...payloadObj]);
  };

  const onAddEndorsement = () => {
    if (obj.endorsementConfigName !== "" && obj.endorsementType !== 0) {
      setPayloadObj([...payloadObj, { ...obj }]);
      setObj({
        endorsementConfigId: 0,
        productId: obj.productId,
        productCode: obj.productCode,
        endorsementConfigName: "",
        endorsementType: 0,
        ratingApi: null,
        filterCriteria: null,
        riskParameters: [],
      });
    } else swal.fire({ icon: "warning", text: "Enter Endorsement Name and Type" });
  };

  const onUpdate = async () => {
    if (payloadObj.length > 0) {
      setLoader(true);
      const res = await SaveEndorsementConfigV2(payloadObj);
      const res2 = await GetEndorsementConfigV2ByProductId(obj.productId);
      setPayloadObj([...res2.map((x, i) => ({ SNo: i + 1, ...x }))]);

      setLoader(false);

      // setPayloadObj([...res.endorsementDto]);
      swal.fire({ icon: "success", text: res.responseMessage });
      setSaveOrUpdateFlag("Update");
    } else {
      swal.fire({ icon: "warning", text: "Add at least one Endorsement ! " });
    }
  };

  const onParameter2 = (e, x) => {
    if (e.target.checked)
      payloadObj[selectedID].riskParameters = [
        ...payloadObj[selectedID].riskParameters,
        {
          parameterName: x.parameter,
          displayName: x.parameter,
          parameterPath: x.path,
          parameterMode: 0,
        },
      ];
    else {
      const arr1 = [...payloadObj[selectedID].riskParameters];
      const arr2 = arr1.filter((x1) => x1.parameterPath !== x.path);
      payloadObj[selectedID].riskParameters = arr2;
    }
    setPayloadObj([...payloadObj]);
  };

  const onSwapSno = () => {
    const arr = payloadObj[selectedID].riskParameters;

    if (
      swap.sno1 > 0 &&
      swap.sno2 > 0 &&
      swap.sno1 <= arr.length &&
      swap.sno2 <= arr.length &&
      swap.sno1 !== swap.sno2
    ) {
      const temp = arr[swap.sno1 - 1];
      arr[swap.sno1 - 1] = arr[swap.sno2 - 1];
      arr[swap.sno2 - 1] = temp;
      payloadObj[selectedID].riskParameters = arr;
      setPayloadObj([...payloadObj]);
      swap.sno1 = "";
      swap.sno2 = "";
      setSwap({ ...swap });
    }
  };

  const onReorder = () => {
    const arr = payloadObj[selectedID].riskParameters;
    const arr1 = [];
    const var1 = arr[swap.sn1 - 1];

    arr.forEach((x, i) => {
      if (i !== swap.sn1 - 1) {
        if (i === swap.sn2 - 1) arr1.push(var1);
        arr1.push(x);
      }
    });
    payloadObj[selectedID].riskParameters = arr1;
    setPayloadObj([...payloadObj]);
    swap.sn1 = "";
    swap.sn2 = "";
    setSwap({ ...swap });
  };
  const onParamProps = (v, n) => {
    paramDetails[n] = v;
    setParamDetails({ ...paramDetails });
  };
  const onParamPropSubmit = () => {
    const arr = payloadObj[selectedID].riskParameters;
    arr.forEach((x, i) => {
      if (x.parameterPath === paramDetails.parameterPath) arr[i] = paramDetails;
    });
    payloadObj[selectedID].riskParameters = arr;
    setPayloadObj([...payloadObj]);
    setModalFlag1(false);
  };
  return (
    <MDBox sx={{ height: "100vh", bgcolor: "#ffffff" }}>
      <Backdrop open={loader}>
        <CircularProgress />
      </Backdrop>
      <MDBox pl={4} pt={4}>
        <MDTypography sx={{ textAlign: "center" }} color="primary" variant="h3">
          Endorsement Configuration
        </MDTypography>
        <Tooltip title={`Product Id : ${obj.productId}`}>
          <Autocomplete
            options={masters.products}
            sx={{ ...autoStyle, width: "300px" }}
            value={{ productCode: obj.productCode }}
            getOptionLabel={(option) => option.productCode}
            onChange={onProduct}
            renderInput={(params) => <MDInput {...params} label="Products" />}
          />
        </Tooltip>
      </MDBox>
      {obj.productId !== 0 && (
        <Grid container spacing={4} p={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography color="primary" variant="h6">
              Enter Policy Json
            </MDTypography>
            <TextareaAutosize
              minRows={5}
              style={{
                display: "flex",
                width: "100%",
                border: "0.1px solid #ada5a5 ",
                height: "auto",
                overflow: "auto",
                resize: "none",
                padding: "8px",
              }}
              label="JSON Object"
              value={JSON.stringify(policyJson)}
              onChange={onPolicyJson}
              placeholder="Enter Json"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Endorsement Name"
              value={obj.endorsementConfigName}
              onChange={(e) => onHandel1(e.target.value, "endorsementConfigName")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              options={masters.EndorsementType}
              sx={autoStyle}
              value={
                masters.EndorsementType.filter((x) => x.mID === obj.endorsementType).length > 0
                  ? masters.EndorsementType.filter((x) => x.mID === obj.endorsementType)[0]
                  : { mValue: "" }
              }
              getOptionLabel={(option) => option.mValue}
              onChange={(e, v) => onHandel1(v.mID, "endorsementType")}
              renderInput={(params) => <MDInput {...params} label="Endorsement Type" />}
            />
          </Grid>
          {(obj.endorsementType === 167 || obj.endorsementType === 169) && (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Rating Api"
                value={obj.ratingApi}
                onChange={(e) => onHandel1(e.target.value, "ratingApi")}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDButton onClick={onAddEndorsement}>Add</MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <DataGrid
              autoHeight
              rows={[...payloadObj.map((x1, i1) => ({ SNo: i1 + 1, ...x1 }))]}
              columns={endorsementColumns}
              getRowId={(option) => option.SNo}
              onCellKeyDown={handleKeyDown}
            />
          </Grid>

          {SaveOrUpdateFlag !== "" && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDButton onClick={onUpdate}>
                  {SaveOrUpdateFlag === "Save" ? "Save" : "Update"}
                </MDButton>
              </MDBox>
            </Grid>
          )}
        </Grid>
      )}
      <Modal open={modalFlag}>
        <MDBox sx={modelStyle}>
          <IconButton onClick={() => setModalFlag(false)}>
            <Icon color="error">close</Icon>
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography color="primary" variant="h4" sx={{ textAlign: "center" }}>
                Risk Parameters
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography color="primary" variant="h6">
                Endorsement Configuration Name
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                value={payloadObj[selectedID]?.endorsementConfigName}
                onChange={(e) => onHandel2(e.target.value, "endorsementConfigName")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography color="primary" variant="h6">
                Endorsement Type
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                options={masters.EndorsementType}
                sx={autoStyle}
                value={{
                  mValue: masters.EndorsementType.filter(
                    (x) => x.mID === payloadObj[selectedID]?.endorsementType
                  )?.[0]?.mValue,
                }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, v) => onHandel2(v.mID, "endorsementType")}
                renderInput={(params) => <MDInput {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
            {(payloadObj[selectedID]?.endorsementType === 167 ||
              payloadObj[selectedID]?.endorsementType === 169) && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography color="primary" variant="h6">
                  Rating API
                </MDTypography>
              </Grid>
            )}
            {(payloadObj[selectedID]?.endorsementType === 167 ||
              payloadObj[selectedID]?.endorsementType === 169) && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  value={payloadObj[selectedID]?.ratingApi}
                  onChange={(e) => onHandel2(e.target.value, "ratingApi")}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Accordion>
                <AccordionSummary>
                  <MDTypography color="primary">Root Level</MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <ParamMapper
                    paths={policyJsonPaths.filter((x) => x.path.split(".").length === 1)}
                    onParameter2={onParameter2}
                    data={payloadObj?.[selectedID]?.riskParameters}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            {/*  */}
            {Object.keys(policyJsonLevels).map((x1) => (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Accordion>
                  <AccordionSummary>
                    <MDTypography color="primary">{`${x1} Level`}</MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {Array.isArray(policyJsonLevels[x1]) ? (
                      <MDBox>
                        <ParamMapper
                          paths={policyJsonPaths.filter(
                            (x) =>
                              x.path.split(".")[0]?.toLowerCase() === x1.toLowerCase() &&
                              x.path.split(".").length <= 3 &&
                              (x.path.split(".")[1]?.toLowerCase() === x.parameter.toLowerCase() ||
                                x.path.split(".")[2]?.toLowerCase() === x.parameter.toLowerCase())
                          )}
                          onParameter2={onParameter2}
                          data={payloadObj?.[selectedID]?.riskParameters}
                        />

                        {policyJsonLevels[x1].map((x2) => (
                          <Accordion>
                            <AccordionSummary>
                              <MDTypography color="primary">{`${x2} Level`}</MDTypography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <ParamMapper
                                paths={policyJsonPaths.filter(
                                  (x) =>
                                    x.path.split(".")[0]?.toLowerCase() === x1.toLowerCase() &&
                                    (x.path.split(".")[1]?.toLowerCase() === x2.toLowerCase() ||
                                      x.path.split(".")[2]?.toLowerCase() === x2.toLowerCase())
                                )}
                                onParameter2={onParameter2}
                                data={payloadObj?.[selectedID]?.riskParameters}
                              />
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </MDBox>
                    ) : (
                      <ParamMapper
                        paths={policyJsonPaths.filter(
                          (x) => x.path.split(".")[0]?.toLowerCase() === x1.toLowerCase()
                        )}
                        onParameter2={onParameter2}
                        data={payloadObj?.[selectedID]?.riskParameters}
                      />
                    )}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Paper elevation={5}>
                <MDTypography color="primary" variant="h6" sx={{ textAlign: "center" }}>
                  Re-Order Parameters
                </MDTypography>
                <Stack direction="row" spacing={3} p={2}>
                  <MDInput
                    label="From SNo"
                    type="number"
                    value={swap.sn1}
                    onChange={(e) => setSwap({ ...swap, sn1: parseInt(e.target.value, 10) })}
                  />
                  <IconButton>
                    <Tooltip title="Re-Order">
                      <Icon color="primary" onClick={onReorder}>
                        low_priority
                      </Icon>
                    </Tooltip>
                  </IconButton>
                  <MDInput
                    label="To SNo"
                    type="number"
                    value={swap.sn2}
                    onChange={(e) => setSwap({ ...swap, sn2: parseInt(e.target.value, 10) })}
                  />
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Paper elevation={5}>
                <MDTypography color="primary" variant="h6" sx={{ textAlign: "center" }}>
                  Swap Parameters
                </MDTypography>
                <Stack direction="row" spacing={3} p={2}>
                  <MDInput
                    label="SNo 1"
                    type="number"
                    value={swap.sno1}
                    onChange={(e) => setSwap({ ...swap, sno1: parseInt(e.target.value, 10) })}
                  />
                  <IconButton>
                    <Tooltip title="Swap">
                      <Icon color="primary" onClick={onSwapSno}>
                        swap_horiz
                      </Icon>
                    </Tooltip>
                  </IconButton>
                  <MDInput
                    label="SNo 2"
                    type="number"
                    value={swap.sno2}
                    onChange={(e) => setSwap({ ...swap, sno2: parseInt(e.target.value, 10) })}
                  />
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <DataGrid
                autoHeight
                rows={payloadObj?.[selectedID]?.riskParameters.map((x1, i1) => ({
                  SNo: i1 + 1,
                  ...x1,
                }))}
                columns={parameterColumns}
                getRowId={(option) => option.SNo}
                onCellKeyDown={{ handleKeyDown }}
              />
            </Grid>
            {/* eslint-disable */}
            {/* eslint-enable */}
          </Grid>
        </MDBox>
      </Modal>

      <Modal open={modalFlag1}>
        <MDBox sx={modelStyle}>
          <IconButton onClick={() => setModalFlag1(false)}>
            <Icon color="error">close</Icon>
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Parameter Name" value={paramDetails.parameterName} disabled={1} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Display Name (Control label)"
                value={paramDetails.displayName}
                disabled={1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Parameter Mode"
                value={paramDetails.parameterMode === 0 ? "View" : "Edit"}
                disabled={1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput label="Parameter Path" value={paramDetails.parameterPath} disabled={1} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                options={["Input", "AutoComplete", "MDDatePicker"]}
                sx={autoStyle}
                value={paramDetails.controlType}
                getOptionLabel={(option) => option}
                onChange={(e, a) => onParamProps(a, "controlType")}
                renderInput={(params) => <MDInput {...params} label="Control Type" />}
              />
            </Grid>
            {paramDetails.controlType === "AutoComplete" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Options"
                  value={JSON.stringify(paramDetails.options)}
                  onChange={(e) => onParamProps(JSON.parse(e.target.value), "options")}
                />
              </Grid>
            )}
            {paramDetails.controlType === "MDDatePicker" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Date Format"
                  value={paramDetails.dateFormat}
                  onChange={(e) => onParamProps(e.target.value, "dateFormat")}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDButton onClick={onParamPropSubmit}>submit</MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}
export default EndorsementConfiguration;
