import { useEffect, useState } from "react";
import { Grid, Autocomplete, Modal, Stack, Icon, IconButton, AppBar } from "@mui/material";
import swal from "sweetalert";
import { read, utils } from "xlsx";
import Swal from "sweetalert2";

// import { styled } from "@mui/material/styles";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// import RetailGeneric from "./RetailGeneric";
import MDTypography from "components/MDTypography";
import StepperV3 from "../../../../PolicyLive/views/Retail/Layout/Version3/StepperV3";
import {
  GetDynScreen,
  GetDynScreenList,
  SetDynScreen,
} from "../../../../PolicyLive/views/Retail/data/Apis";
import { DateFormatFromDateObject } from "../../../../../Common/Validations";
import { autoStyle, compTypes } from "./data";
import OnPageLoad from "./OnPageLoad";
import TopMenu from "./TopMenu";
import ControlDetails from "./ControlDetails";
import EditAccordionDetails from "./EditAccordionDetails";
import ResizableDiv from "./ResizableDiv";
import OnProceed from "./OnProceed";
import OnClickFunctions from "./OnClickFunctions";
import AddFunctions from "../../../../PolicyLive/views/Retail/Layout/Version3/AddFunctions";
import { useDataController, setGenericInfo } from "../../../../BrokerPortal/context";
import { ConditionLogicalValidation } from "../../../../../Common/RenderControl/Version3/RenderControlFunctions";

function DynamicPageConfigurator() {
  const [stepName, setStepName] = useState("");

  const [stepsArr, setStepsArr] = useState([]);
  const [accordionArr, setAccordionArr] = useState([]);
  const [componentArr, setComponentArr] = useState([]);
  const [buttonArr, setButtonArr] = useState([]);
  const [functionalityData, setFunctionalityData] = useState({});
  const [mastersList, setMastersList] = useState([]);
  console.log({ stepsArr, accordionArr, componentArr, buttonArr, mastersList });
  const [selectedStepName, setSelectedStepName] = useState("");
  const [accordionName, setAccordionName] = useState("");

  const [selectedStepName2, setSelectedStepName2] = useState("");
  const [selectedAccordionName2, setSelectedAccordionName] = useState("");

  const [accordionList, setAccordionList] = useState([]);

  const [componentProp, setComponentProp] = useState({
    type: "",
    visible: true,
    required: false,
    label: "",
    // value: "",
    path: "",
    spacing: 3,
  });

  const [accordionProp, setAccordionProp] = useState({
    visible: true,
    name: "",
  });

  const [windowFlag, setWindowFlag] = useState({
    preview: true,
    screenConfig: false,
    pageLoad: false,
    onClick: false,
    onProceed: false,
    modify: false,
    autoSave: false,
  });

  useEffect(() => {
    console.log(
      "ConditionLogicalValidation",
      ConditionLogicalValidation({
        conditions: [true, false, true, true, false, true],
        logics: ["||", "&&", "||", "&&", "&&"],
        orderOfLogics: [1, 4, 3, 0, 2],
      })
    );
  }, []);
  const [modelFlag, setModelFlag] = useState({
    controlDetails: false,
    editAccordionDetails: false,
  });
  const [compEditFlg, setCompEditFlg] = useState({ flag: false, ind: [] });
  const onModelClose = () => {
    setCompEditFlg({ flag: false, ind: [] });
    modelFlag.controlDetails = false;
    setModelFlag({ ...modelFlag });
  };

  const onStepName = (e) => {
    setStepName(e.target.value);
  };
  const onAccordionName = (e) => {
    setAccordionName(e.target.value);
  };
  const onStepSelect = (e, a) => {
    setSelectedStepName(a.name);
  };
  const onselectStepForAccordion = (e, a) => {
    setSelectedStepName2(a.name);
    stepsArr.forEach((x, i) => {
      if (x.name === a.name) setAccordionList([...accordionArr[i]]);
    });
  };
  const onselectAccordion = (e, a) => {
    setSelectedAccordionName(a.name);
  };

  const onComponentSelect = (e, a) => {
    setComponentProp({ ...componentProp, type: a });
  };

  const onStepAdd = () => {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];

    if (Array.isArray(stepsArr)) arr1 = [...stepsArr];
    if (Array.isArray(accordionArr)) arr2 = [...accordionArr];
    if (Array.isArray(componentArr)) arr3 = [...componentArr];
    if (Array.isArray(buttonArr)) arr4 = [...buttonArr];

    arr1.push({ name: stepName, visible: true });
    arr2.push([]);
    arr3.push([]);
    arr4.push({
      prev: { label: "Previous", visible: true },
      reset: { label: "Reset", visible: true },
      button2: { label: "", visible: true },
      button1: { label: "", visible: false },
      next: { label: "Proceed", visible: true, loader: "backDrop" },
    });

    setStepsArr([...arr1]);
    setAccordionArr([...arr2]);
    setComponentArr([...arr3]);
    setButtonArr([...arr4]);
    setStepName("");
    if (Array.isArray(functionalityData.onProceedButton))
      setFunctionalityData({
        ...functionalityData,
        onProceedButton: [...functionalityData.onProceedButton, [{}, {}]],
      });
    else
      setFunctionalityData({
        ...functionalityData,
        onProceedButton: [[{}, {}]],
      });
  };
  const onAccordionAdd = () => {
    stepsArr.forEach((x, i) => {
      if (x.name === selectedStepName) {
        accordionArr[i].push({ name: accordionName, visible: true });
        componentArr[i].push([]);
      }
    });
    setAccordionArr([...accordionArr]);
    setComponentArr([...componentArr]);
    setAccordionName("");
  };

  const onClearArr = () => {
    setStepsArr([]);
    setAccordionArr([]);
    setComponentArr([]);
  };

  const onUploadArr = (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (e1) => {
      const text = e1.target.result;
      const lObj = JSON.parse(text);
      console.log(lObj, 123123);
      setComponentArr(lObj.components);
      setAccordionArr(lObj.accordions);
      setStepsArr(lObj.steps);
      setButtonArr(lObj.buttonDetails);
    };
    reader.readAsText(e.target.files[0]);
  };

  const onDownloadArr = () => {
    const lObj = {
      steps: stepsArr,
      accordions: accordionArr,
      components: componentArr,
      buttonDetails: buttonArr,
    };
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(lObj)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "RetailGenericPage.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const onCompRemove = (i1, i2, i3) => {
    Swal.fire({
      icon: "warning",
      text: "You want delete component?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const arr1 = componentArr[i1][i2];
        const arr2 = arr1.filter((x1, i4) => i4 !== i3);
        componentArr[i1][i2] = [...arr2];
        setComponentArr([...componentArr]);
      }
    });
  };
  const deleteStep = (i1) => {
    Swal.fire({
      icon: "warning",
      text: "You want delete Step",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const arr1 = stepsArr.filter((x, i) => i !== i1);
        const arr2 = accordionArr.filter((x, i) => i !== i1);
        const arr3 = componentArr.filter((x, i) => i !== i1);

        setComponentArr([...arr3]);
        setAccordionArr([...arr2]);
        setStepsArr([...arr1]);
      }
    });
  };

  const onCompEdit = (i1, i2, i3) => {
    console.log(i1, i2, i3);
    setComponentProp({ ...componentArr[i1][i2][i3] });
    setCompEditFlg({ flag: true, ind: [i1, i2, i3] });
    setModelFlag({ ...modelFlag, controlDetails: true });
  };

  const onAccordEdit = (i1, i2) => {
    setCompEditFlg({ flag: true, ind: [i1, i2] });
    setAccordionProp({ ...accordionArr[i1][i2] });
    setModelFlag({ ...modelFlag, editAccordionDetails: true });
  };

  const onMoveLeft = (i1, i2, i3) => {
    const arr = componentArr[i1][i2];
    if (i3 !== 0) {
      const temp = arr[i3];
      arr[i3] = arr[i3 - 1];
      arr[i3 - 1] = temp;
      componentArr[i1][i2] = arr;
      setComponentArr([...componentArr]);
    }
  };
  const onMoveRight = (i1, i2, i3) => {
    const arr = componentArr[i1][i2];
    if (i3 < arr.length - 1) {
      const temp = arr[i3];
      arr[i3] = arr[i3 + 1];
      arr[i3 + 1] = temp;
      componentArr[i1][i2] = arr;
      setComponentArr([...componentArr]);
    }
  };
  const onAddControlToRight = (i1, i2, i3) => {
    const arr = componentArr[i1][i2];
    const arr1 = [];
    arr.forEach((x1, ind1) => {
      if (ind1 === i3) arr1.push({ ...x1 });
      arr1.push({ ...x1 });
    });
    componentArr[i1][i2] = [...arr1];
    setComponentArr([...componentArr]);
  };

  const onHandelStepEdit = (e, idx) => {
    stepsArr[idx].name = e.target.value;
    setStepsArr([...stepsArr]);
  };

  const onHandelAccordEdit = (e, as, idx) => {
    accordionArr[as][idx] = { name: e.target.value, visible: true };
    setAccordionArr([...accordionArr]);
  };

  const [prodDtoStr, setProdDtoStr] = useState("");
  const [prodDto, setProdDto] = useState({});
  // const [screenMode, setScreenMode] = useState("Modify Existing Screen");
  const [productList, setProductList] = useState([]);
  const [productData, setProductData] = useState({
    productCode: "",
    productDetails: { screenId: 0 },
  });
  const [variables, setVariables] = useState({});
  // const [startConfiguringFlg, setStartConfiguringFlg] = useState(false);
  const onProdDto = (e) => {
    setProdDtoStr(e.target.value);
    setProdDto(JSON.parse(e.target.value));
  };
  useEffect(() => {
    setProdDto(prodDto);
  }, [prodDto]);

  useEffect(async () => {
    const res = await GetDynScreenList("Policy");
    setProductList(res.data);

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  // const onProductCode = (e) => {
  //   productData.productCode = e.target.value;
  //   setProductData({ ...productData });
  // };

  const onStartConfiguring = async (productCode) => {
    const res = await GetDynScreen(productCode);
    productData.productDetails = res;
    setProductData({ ...productData });
    setVariables({ ...res.functionalityData.variables });
    setComponentArr(res.screenData.components);
    setAccordionArr(res.screenData.accordions);
    setStepsArr(res.screenData.steps);
    setButtonArr(res.screenData.buttonDetails);
    setFunctionalityData({
      ...res.functionalityData,
      customOnClick: {
        ...res.functionalityData.customOnClick,
        ...AddFunctions({ productCode }),
      },
    });
  };
  const [, dispatch] = useDataController();
  const onProductSelection = (e, v) => {
    productData.productCode = v.productCode;
    setProductData({ ...productData });
    onStartConfiguring(v.productCode);
    setGenericInfo(dispatch, { prod: v.productCode });
  };

  const onSavePage = async () => {
    const obj = {
      Version: "V3",
      Type: "Policy",
      ScreenId: productData.productDetails.screenId,
      Layout: "Stepper",
      ProductCode: productData.productCode,

      CreatedBy: "prashantha.m@inubesolutions.com",
      CreatedDateTime: productData?.productDetails?.createdDateTime
        ? productData.productDetails.createdDateTime
        : DateFormatFromDateObject(new Date(), "y-m-d"),
      ModifiedBy: "prashantha.m@inubesolutions.com",
      ModifiedDateTime: DateFormatFromDateObject(new Date(), "y-m-d"),

      ScreenData: {
        steps: stepsArr,
        accordions: accordionArr,
        components: componentArr,
        buttonDetails: buttonArr,
      },
      FunctionalityData: {
        ...functionalityData,
        variables,
      },
    };
    const res = await SetDynScreen(obj);
    swal({ icon: "success", text: res.responseMessage });
  };

  // const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  //   ({ theme, open }) => ({
  //     flexGrow: 1,
  //     padding: theme.spacing(3),
  //     transition: theme.transitions.create("margin", {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen,
  //     }),
  //     marginLeft: `-${drawerWidth}px`,
  //     ...(open && {
  //       transition: theme.transitions.create("margin", {
  //         easing: theme.transitions.easing.easeOut,
  //         duration: theme.transitions.duration.enteringScreen,
  //       }),
  //       marginLeft: 0,
  //     }),
  //   })
  // );

  const onUploadExcel = (files1) => {
    const files = files1;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(files.target.files[0]);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws);

      const arr1 = [];
      const arr2 = [];
      const arr3 = [];
      const arr31 = [];
      const arr7 = [];

      const filterSteps = data.reduce((group1, product) => {
        const group = group1;
        const { Step } = product;
        group[Step] = group[Step] ?? [];
        group[Step].push(product);
        return group;
      }, {});

      const filterAccordions = [];
      Object.keys(filterSteps).forEach((x, i) => {
        arr1.push({ name: x, visible: true });
        arr31.push({
          prev: {
            label: "Previous",
            visible: i !== 0,
          },
          reset: {
            label: "Reset",
            visible: true,
          },
          button2: {
            label: "",
            visible: false,
          },
          button1: {
            label: "",
            visible: false,
          },
          next: {
            label: "Proceed",
            visible: true,
            loader: "backDrop",
          },
        });
        arr7.push([{}, {}]);
        const filterAcc = filterSteps[x].reduce((group1, product) => {
          const group = group1;
          const { SubStep } = product;
          group[SubStep] = group[SubStep] ?? [];
          group[SubStep].push(product);
          return group;
        }, {});
        filterAccordions.push(filterAcc);
      });
      console.log("filterAccordions", filterAccordions);

      filterAccordions.forEach((x1) => {
        const arr4 = [];
        const arr5 = [];
        Object.keys(x1).forEach((x2) => {
          const arr6 = [];
          arr4.push({ name: x2, visible: true, defaultExpand: true });
          x1[x2].forEach((x3) => {
            arr6.push({
              type: x3.Controller,
              visible: true,
              required: x3.mandatory,
              label: x3.label,
              path: x3.path,
              spacing: x3.width,
            });
          });
          arr5.push(arr6);
        });
        arr2.push(arr4);
        arr3.push(arr5);
      });

      setComponentArr([...arr3]);
      setAccordionArr([...arr2]);
      setButtonArr([...arr31]);
      setStepsArr([...arr1]);
      functionalityData.onProceedButton = [...arr7];
      setFunctionalityData({ ...functionalityData });
    };
  };

  return (
    <MDBox sx={{ bgcolor: "#ffffff", minHeight: "100vh", overflowY: "revert" }}>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{ background: `linear-gradient(to right,#64b5f6, #283593)` }}
        //         sx={{ background: `linear-gradient(90.67deg, #0073DD 2.32%, #83B4F4 100%)` }}
      >
        <TopMenu
          onUploadExcel={onUploadExcel}
          onDownloadArr={onDownloadArr}
          productList={productList}
          productData={productData}
          setProductData={setProductData}
          onProductSelection={onProductSelection}
          onStartConfiguring={onStartConfiguring}
          onSavePage={onSavePage}
          windowFlag={windowFlag}
          setWindowFlag={setWindowFlag}
          setStepsArr={setStepsArr}
          setAccordionArr={setAccordionArr}
          setComponentArr={setComponentArr}
          setButtonArr={setButtonArr}
        />
      </AppBar>
      <div style={{ display: "flex", overflowX: "auto", overflowY: "revert", height: "100vh" }}>
        <MDBox sx={{ display: "flex", marginTop: "5rem" }}>
          {windowFlag.screenConfig && (
            <ResizableDiv
              id="a1"
              windowName="Screen Configure Window"
              flagName="screenConfig"
              setWindowFlag={setWindowFlag}
              defaultHeight="100%"
              defaultWidth="30vw"
              minWidth="30vw"
              // maxWidth="50vw"
              Component={{
                Component: (
                  <Grid container spacing={1} p={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6">Stepper Details</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                      <MDInput label="Stepper Name" value={stepName} onChange={onStepName} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDButton variant="outlined" onClick={onStepAdd}>
                        Add
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6">Accordion Details</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                      <Autocomplete
                        options={stepsArr}
                        sx={autoStyle}
                        onChange={onStepSelect}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <MDInput {...params} label="Stepper List" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                      <MDInput
                        label="Accordion Name"
                        value={accordionName}
                        onChange={onAccordionName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDButton variant="outlined" onClick={onAccordionAdd}>
                        Add
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6">Component Details</MDTypography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                      <Autocomplete
                        options={stepsArr}
                        sx={autoStyle}
                        getOptionLabel={(option) => option.name}
                        onChange={onselectStepForAccordion}
                        renderInput={(params) => <MDInput {...params} label="Stepper List" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                      <Autocomplete
                        options={accordionList}
                        sx={autoStyle}
                        getOptionLabel={(option) => option.name}
                        onChange={onselectAccordion}
                        renderInput={(params) => <MDInput {...params} label="Accordion List" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                      <Autocomplete
                        options={compTypes}
                        sx={autoStyle}
                        getOptionLabel={(option) => option}
                        onChange={onComponentSelect}
                        renderInput={(params) => <MDInput {...params} label="Components List" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDButton
                        variant="outlined"
                        onClick={() => setModelFlag({ ...modelFlag, controlDetails: true })}
                      >
                        Add
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6">Json</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
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
                        value={prodDtoStr}
                        onChange={onProdDto}
                        placeholder="Enter Json"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Stack direction="row" spacing={2}>
                        {false && (
                          <MDButton variant="outlined" onClick={onClearArr}>
                            Clear Page
                          </MDButton>
                        )}
                        {false && (
                          <MDButton variant="outlined" component="label">
                            Upload Page
                            <input hidden type="file" accept="text/*" onChange={onUploadArr} />
                          </MDButton>
                        )}

                        {false && (
                          <IconButton>
                            <Icon>lock_open_right</Icon>
                          </IconButton>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                ),
              }}
            />
          )}

          {windowFlag.preview && (
            <ResizableDiv
              id="a2"
              flagName="preview"
              setWindowFlag={setWindowFlag}
              windowName="Preview Window"
              defaultHeight="100%"
              defaultWidth="100vw"
              minWidth="50vw"
              // maxWidth="100vw"
              Component={{
                Component: (
                  <Grid container spacing={1} p={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDBox mt={0}>
                        <StepperV3
                          configurationData={{
                            stepsArr,
                            onHandelStepEdit,
                            onHandelAccordEdit,
                            accordionArr,
                            componentArr,
                            onCompRemove,
                            onCompEdit,
                            onAccordEdit,
                            modSwitch: windowFlag.modify,
                            buttonArr,
                            prodDto,
                            setProdDto,
                            setProdDtoStr,
                            prodDtoStr,
                            onMoveLeft,
                            onMoveRight,
                            onAddControlToRight,
                            functionalityData,
                            setMastersList,
                            deleteStep,
                          }}
                        />
                      </MDBox>
                    </Grid>{" "}
                  </Grid>
                ),
              }}
            />
          )}

          {windowFlag.pageLoad && (
            <ResizableDiv
              id="a3"
              flagName="pageLoad"
              setWindowFlag={setWindowFlag}
              windowName="On Page Load Window"
              defaultHeight="100%"
              defaultWidth="70vw"
              minWidth="50vw"
              // maxWidth="100vw"
              Component={{
                Component: (
                  <OnPageLoad
                    prodDto={prodDto}
                    functionalityData={functionalityData}
                    setFunctionalityData={setFunctionalityData}
                    variables={variables}
                    setVariables={setVariables}
                  />
                ),
              }}
            />
          )}

          {windowFlag.onClick && (
            <ResizableDiv
              id="a4"
              windowName="onClick Function Config Window"
              flagName="onClick"
              setWindowFlag={setWindowFlag}
              defaultHeight="100%"
              defaultWidth="70vw"
              minWidth="50vw"
              // maxWidth="100vw"
              Component={{
                Component: (
                  <OnClickFunctions
                    functionalityData={functionalityData}
                    setFunctionalityData={setFunctionalityData}
                    // variables={variables}
                  />
                ),
              }}
            />
          )}

          {windowFlag.onProceed && (
            <ResizableDiv
              id="a5"
              windowName="Navigation Controller Window"
              flagName="onProceed"
              setWindowFlag={setWindowFlag}
              defaultHeight="100%"
              defaultWidth="70vw"
              minWidth="50vw"
              // maxWidth="100vw"
              Component={{
                Component: (
                  <OnProceed
                    functionalityData={functionalityData}
                    setFunctionalityData={setFunctionalityData}
                    buttonArr={buttonArr}
                    setButtonArr={setButtonArr}
                  />
                ),
              }}
            />
          )}
        </MDBox>
      </div>

      <Modal open={modelFlag.controlDetails} onClose={onModelClose}>
        <ControlDetails
          componentProp={componentProp}
          setComponentProp={setComponentProp}
          selectedAccordionName2={selectedAccordionName2}
          selectedStepName2={selectedStepName2}
          compEditFlg={compEditFlg}
          stepsArr={stepsArr}
          accordionArr={accordionArr}
          componentArr={componentArr}
          setCompEditFlg={setCompEditFlg}
          setModelFlag={setModelFlag}
          setComponentArr={setComponentArr}
          onModelClose={onModelClose}
          mastersList={mastersList}
          functionsList={
            functionalityData?.customOnClick ? Object.keys(functionalityData.customOnClick) : []
          }
        />
      </Modal>

      <Modal open={modelFlag.editAccordionDetails}>
        <EditAccordionDetails
          accordionProp={accordionProp}
          setAccordionProp={setAccordionProp}
          // selectedAccordionName2={selectedAccordionName2}
          // selectedStepName2={selectedStepName2}
          // stepsArr={stepsArr}
          accordionArr={accordionArr}
          setAccordionArr={setAccordionArr}
          // componentArr={componentArr}
          compEditFlg={compEditFlg}
          setCompEditFlg={setCompEditFlg}
          setModelFlag={setModelFlag}
          // setComponentArr={setComponentArr}
          // onModelClose={onModelClose}
          // mastersList={mastersList}
        />
      </Modal>
    </MDBox>
  );
}
export default DynamicPageConfigurator;
