import { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  // FormControlLabel,
  Stack,
  Backdrop,
  CircularProgress,
  Switch,
  Drawer,
  IconButton,
  Tooltip,
  Icon,
} from "@mui/material";
import ReactJson from "react-json-view";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import objectPath from "object-path";
import swal from "sweetalert";
import { ConditionLogicalValidation } from "Common/RenderControl/Version3/RenderControlFunctions";
import { get, set } from "Common/RenderControl/objectPath";
import RenderControlMapperV3 from "Common/RenderControl/Version3/RenderControlMapperV3";

import {
  // setGenericPolicyDto,
  setGenericInfo,
  useDataController,
} from "../../../../../BrokerPortal/context";

// import SkeltonLoader from "../../../../../../../BaseSetup/views/RND/SkeltonLoader";
// import RenderControl from "../../../../Common/RenderControl/NewRenderControl";

// import { getDynamicPage, getPolicyDto } from "../Products/RND/DynamicPage";
// import {
//   // getDynamicPage,
//   // getUseEffect,
//   // getOnNextClick,
//   getEventData,
//   // getDynamicFunctionality,
// } from "../data/StepperV3";
import { getEventData, getUseEffect, onProceedButton } from "./StepperV3Functions";

import { GetDynScreen } from "../../data/Apis";
import AddFunctions from "./AddFunctions";

function TypeFilter({
  item,
  stepIndex,
  accordionIndex,
  componentIndex,
  nextFlag,
  nextCount,
  dto,
  setDto,
  dyndata,
  onMidNextValidation,
  midNextValidationId,
  customFunctions,
  masters,
  configurationData,
}) {
  if (item.type === "Split")
    return (
      <Grid container display="flex" spacing={1.5}>
        {item.split.map((x1) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={x1.md ? x1.md : 6}
            lg={x1.lg ? x1.lg : 6}
            xl={x1.xl ? x1.xl : 6}
            xxl={x1.xxl ? x1.xxl : 6}
          >
            <Grid container display="flex" spacing={1.5}>
              {[
                { ...item, componentIndex, splitDetails: { ...x1 } },
                ...[...dyndata.map((x2, i2) => ({ ...x2, componentIndex: i2 }))].filter(
                  (x2) => x2.splitId === x1.id
                ),
              ].map((item1) => (
                <RenderControlMapperV3
                  item={item1}
                  dto={{ ...dto }}
                  setDto={setDto}
                  nextFlag={nextFlag}
                  nextCount={nextCount}
                  defaultSpacing={6}
                  onMidNextValidation={onMidNextValidation}
                  midNextValidationId={midNextValidationId}
                  customFunctions={customFunctions}
                  masters={masters}
                  configurationData={configurationData}
                  stepIndex={stepIndex}
                  accordionIndex={accordionIndex}
                  componentIndex={item1.componentIndex}
                />
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );

  if (item.type === "Accordions")
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        {item.accordionList.map((x1) => (
          <Accordion sx={{ ...x1.sx }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" color="primary">
                {x1.label}
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container display="flex" spacing={1.5}>
                {dyndata
                  .filter((x2) => x2.accordionId === x1.id)
                  .map((item1) => (
                    <RenderControlMapperV3
                      item={item1}
                      dto={{ ...dto }}
                      setDto={setDto}
                      nextFlag={nextFlag}
                      nextCount={nextCount}
                      defaultSpacing={6}
                      onMidNextValidation={onMidNextValidation}
                      midNextValidationId={midNextValidationId}
                      customFunctions={customFunctions}
                      masters={masters}
                      configurationData={configurationData}
                      stepIndex={stepIndex}
                      accordionIndex={accordionIndex}
                      componentIndex={componentIndex}
                    />
                  ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    );
  if (!item.splitId && !item.accordionId)
    return (
      <RenderControlMapperV3
        item={item}
        stepIndex={stepIndex}
        accordionIndex={accordionIndex}
        componentIndex={componentIndex}
        dto={{ ...dto }}
        setDto={setDto}
        nextFlag={nextFlag}
        nextCount={nextCount}
        defaultSpacing={3}
        onMidNextValidation={onMidNextValidation}
        midNextValidationId={midNextValidationId}
        customFunctions={customFunctions}
        masters={masters}
        configurationData={configurationData}
      />
    );

  return null;
}

function StepDetails({
  index,
  // prod,
  activeStep,
  nextFlag,
  nextCount,
  dto,
  setDto,
  masters,
  // setMasters,
  dyndata,
  onMidNextValidation,
  midNextValidationId,
  customFunctions,
  configurationData,
}) {
  return (
    <Grid container display="flex" spacing={1.5}>
      {dyndata?.length > 0 &&
        dyndata[index]?.map((item, index1) => (
          <TypeFilter
            stepIndex={activeStep}
            accordionIndex={index}
            componentIndex={index1}
            item={item}
            nextFlag={nextFlag}
            nextCount={nextCount}
            dto={dto}
            setDto={setDto}
            dyndata={dyndata[index]}
            onMidNextValidation={onMidNextValidation}
            midNextValidationId={midNextValidationId}
            customFunctions={customFunctions}
            masters={masters}
            configurationData={configurationData}
          />
        ))}
    </Grid>
  );
}

function GetStepContent({
  activeStep1,
  prod,
  nextFlag,
  nextCount,
  dto,
  setDto,
  masters,
  setMasters,
  dyndata,
  accordionList,
  onMidNextValidation,
  midNextValidationId,
  customFunctions,
  configurationData,
}) {
  const activeStep = activeStep1;

  // const [AccordEditFag, setAccordEditFlag] = useState({ flag: false, ind: "" });
  // const onAccordEdit = (idx) => {
  //   setAccordEditFlag({ flag: true, ind: idx });
  // };

  // const onBlurAccord = () => {
  //   setAccordEditFlag({ flag: false, ind: "" });
  // };
  // const [AccExpanded, setAccExpanded] = useState("");
  // accordionList.length > 0 ? accordionList[0].name : ""
  // );
  // const handleChange = (p1) => {
  //   setAccExpanded(p1);
  // };
  return (
    <MDBox sx={{ width: "100%", px: 3 }}>
      {accordionList.map(
        (item, idx) =>
          (configurationData !== undefined ||
            item.visible === true ||
            (item.visible === "visibleDetails" &&
              ConditionLogicalValidation({ dto, details: item.visibleDetails }) === true)) && (
            <MDBox>
              {(item.name !== "" && item.name !== "noLabel") || configurationData !== undefined ? (
                <Accordion
                  // defaultExpanded={item.defaultExpanded === true || idx === 0}
                  defaultExpanded="true"
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                  // expanded={
                  //   item.name === "" || accordionList.length === 1 ? true : AccExpanded === item.name
                  // }
                  // onChange={() => handleChange(item.name)}
                >
                  <AccordionSummary
                    expandIcon={
                      (item.name === "" || accordionList.length !== 1) && <ExpandMoreIcon />
                    }
                    sx={{ p: 0 }}
                  >
                    {configurationData?.modSwitch && configurationData.modSwitch === true && (
                      <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                        <IconButton onClick={() => configurationData.onAccordEdit(activeStep, idx)}>
                          <Tooltip title="Edit SubStep">
                            <EditIcon />
                          </Tooltip>
                        </IconButton>
                        <IconButton disabled>
                          <Tooltip title="Delete SubStep">
                            <HighlightOffIcon />
                          </Tooltip>
                        </IconButton>
                      </MDBox>
                    )}

                    {/* {configurationData?.modSwitch &&
                    configurationData.modSwitch === true &&
                    AccordEditFag.flag &&
                    AccordEditFag.ind === idx ? (
                      <MDInput
                        autoFocus="true"
                        value={item.name}
                        onChange={(e) => configurationData.onHandelAccordEdit(e, activeStep, idx)}
                        onBlur={onBlurAccord}
                      />
                    ) : (
                      <MDTypography variant="h6" color="primary">
                        {item.name}
                      </MDTypography>
                    )} */}
                    <MDTypography variant="h6" color="primary">
                      {item.name}
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails expandIcon={<ExpandMoreIcon />} sx={{ p: 0 }}>
                    <StepDetails
                      index={idx}
                      prod={prod}
                      activeStep={activeStep}
                      dyndata={dyndata}
                      nextFlag={nextFlag}
                      nextCount={nextCount}
                      dto={{ ...dto }}
                      setDto={setDto}
                      masters={masters}
                      setMasters={setMasters}
                      onMidNextValidation={onMidNextValidation}
                      midNextValidationId={midNextValidationId}
                      customFunctions={customFunctions}
                      configurationData={configurationData}
                    />
                  </AccordionDetails>
                </Accordion>
              ) : (
                <StepDetails
                  index={idx}
                  prod={prod}
                  activeStep={activeStep}
                  dyndata={dyndata}
                  nextFlag={nextFlag}
                  nextCount={nextCount}
                  dto={{ ...dto }}
                  setDto={setDto}
                  masters={masters}
                  setMasters={setMasters}
                  onMidNextValidation={onMidNextValidation}
                  midNextValidationId={midNextValidationId}
                  customFunctions={customFunctions}
                  configurationData={configurationData}
                />
              )}
            </MDBox>
          )
      )}
    </MDBox>
  );
}

function HorizontalLinearStepper({
  prod,
  dto,
  setDto,
  masters,
  setMasters,
  setDrawerOpen,
  customFunctions,
  configurationData,
  screenData,
  FunctionalityData,
}) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  // const [skFlg, setSkFlg] = useState(false);
  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(0);
  const [midNextValidationId, setMidNextValidationId] = useState(-1);

  const [backDropFlag, setBackDropFlag] = useState(false);

  const [valSwitch, setValSwitch] = useState(true);

  /* eslint-disable */
  const steps = configurationData?.stepsArr
    ? [...configurationData.stepsArr]
    : screenData?.steps
    ? [...screenData.steps]
    : [];

  const accordionList = configurationData?.accordionArr
    ? [...configurationData.accordionArr]
    : screenData?.accordions
    ? [...screenData.accordions]
    : [];

  const dyndata = configurationData?.componentArr
    ? [...configurationData.componentArr]
    : screenData?.components
    ? [...screenData.components]
    : [];

  const btnDetails = configurationData?.buttonArr
    ? [...configurationData.buttonArr]
    : screenData.buttonDetails
    ? [...screenData.buttonDetails]
    : [];

  /* eslint-enable */

  const [control, dispatch] = useDataController();
  const { genericInfo } = control;

  const onMidNextValidation = (validationId) => {
    let validationFlag = true;
    accordionList[activeStep].forEach((x1, i1) => {
      if (x1.visible === true) {
        dyndata[activeStep][i1].forEach((x2) => {
          if (
            x2.type !== "ValidationControl" &&
            x2.validationId === validationId &&
            (x2.visible === true ||
              (x2.visible === "visibleDetails" &&
                x2.visibleDetails &&
                ConditionLogicalValidation({ dto, details: x2.visibleDetails }) === true))
          ) {
            console.log("validation test", x2);
            if (x2.required === true) {
              const val = objectPath.get(dto, x2.path);
              console.log("validation test", val);

              if (val === "" || val === undefined) validationFlag = false;
            }

            if (
              x2.required === "requiredDetails" &&
              x2.requiredDetails &&
              ConditionLogicalValidation({ dto, details: x2.requiredDetails }) === true
            ) {
              const val = objectPath.get(dto, x2.path);
              if (val === "" || val === undefined || val === null) validationFlag = false;
            }
          }
        });
      }
    });
    if (validationFlag === false) {
      setMidNextValidationId(validationId);
      setNextFlag(true);
      setNextCount(nextCount + 1);
    } else {
      setMidNextValidationId(-1);
      setNextFlag(false);
    }
    return validationFlag;
  };

  const onNextMapper = (x2) => {
    let validationFlag = true;
    if (
      x2.visible === true ||
      (x2.visible === "visibleDetails" &&
        x2.visibleDetails &&
        ConditionLogicalValidation({ dto, details: x2.visibleDetails }) === true)
    ) {
      if (x2.required === true) {
        const val = get(dto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }

      if (
        x2.required === "requiredDetails" &&
        x2.requiredDetails &&
        ConditionLogicalValidation({ dto, details: x2.requiredDetails }) === true
      ) {
        const val = get(dto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    }
    return validationFlag;
  };

  const onNext = async () => {
    if (valSwitch) {
      setBackDropFlag(true);
      // setSkFlg(true);

      setNextFlag(true);
      setNextCount(nextCount + 1);
      setMidNextValidationId(-1);

      let validationFlag = true;
      accordionList[activeStep].forEach((x1, i1) => {
        if (x1.visible === true) {
          dyndata[activeStep][i1].forEach((x2) => {
            if (x2.type === "Mapper1") {
              get(dto, x2.path).forEach((x3, i3) => {
                x2.mapperComponents.forEach((x4) => {
                  if (onNextMapper({ ...x4, path: `${x2.path}.${i3}.${x4.path}` }) === false)
                    validationFlag = false;
                });
              });
            } else if (onNextMapper(x2) === false) validationFlag = false;
          });
        }
      });

      if (validationFlag === true) {
        const onClickFun = await onProceedButton({
          activeStep,
          setBackDropFlag,
          dto,
          setDto,
          masters,
          setMasters,
          FunctionalityData,
        });
        if (onClickFun === true) {
          setNextFlag(false);
          setActiveStep(activeStep + 1);
        }
      } else swal({ icon: "error", text: "some fields are missing" });
      setBackDropFlag(false);
      // setSkFlg(false);
    } else {
      setNextFlag(false);
      setActiveStep(activeStep + 1);
    }
  };

  const onPrev = () => {
    setBackDropFlag(true);
    if (activeStep > 0) setActiveStep(activeStep - 1);
    setBackDropFlag(false);
  };

  const onReset = () => {
    let lDto = { ...dto };
    setBackDropFlag(true);
    dyndata[activeStep].forEach((x1) => {
      x1.forEach((x2) => {
        if (!x2.disableOnReset && x2.disableOnReset !== true) {
          console.log("aaaaawwwww", x2);
          if (x2.path) {
            if (x2.multiple && x2.multiple === true) lDto = set(lDto, x2.path, []);
            else lDto = set(lDto, x2.path, "");
          }
        }
      });
    });
    setDto({ ...lDto });
    if (genericInfo.reset)
      setGenericInfo(dispatch, { ...genericInfo, reset: genericInfo.reset + 1 });
    else setGenericInfo(dispatch, { ...genericInfo, reset: 1 });
    setBackDropFlag(false);
  };

  const onValSwitch = (e) => {
    setValSwitch(e.target.checked);
  };

  const onConsoleDto = () => {
    setDrawerOpen(true);
    console.log("genericPolicyDto", dto);
    console.log("genericInfo", genericInfo);
    console.log("getDynamicPage", screenData);

    console.log("Masters", masters);
    console.log("customFunctions", customFunctions);
    console.log("FunctionalityData", FunctionalityData);
  };
  useEffect(() => {
    if (genericInfo.activeStep && genericInfo.activeStep !== 0)
      setActiveStep(genericInfo.activeStep);
  }, [activeStep]);

  const onAllRetail = () => {
    navigate("/AllRetailLandingPage");
  };

  const [stepEditFag, setStepEditFlag] = useState({ flag: false, ind: "" });
  const onStepEdit = (index2) => {
    setStepEditFlag({ flag: true, ind: index2 });
  };

  const onBlurStep = () => {
    setStepEditFlag({ flag: false, ind: "" });
  };

  return (
    <MDBox sx={{ width: "100%" }}>
      {(process.env.NODE_ENV === "development" || configurationData !== undefined) && (
        <Stack direction="row" spacing={2}>
          <Tooltip title="Validations">
            <Switch checked={valSwitch} onChange={onValSwitch} />
          </Tooltip>
          <MDButton variant="text" onClick={onConsoleDto}>
            View Policy Json
          </MDButton>

          {configurationData === undefined && (
            <MDButton variant="text" onClick={onAllRetail}>
              All Retail Landing Page
            </MDButton>
          )}
        </Stack>
      )}
      {btnDetails?.[activeStep]?.next?.loader === "backDrop" && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <CircularProgress />
        </Backdrop>
      )}

      <div>
        <Stepper activeStep={activeStep}>
          {steps.map((item, index2) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={item.name} {...stepProps}>
                {configurationData?.modSwitch && configurationData.modSwitch === true && (
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    {/* <Tooltip title="Edit Step"> */}
                    <IconButton onClick={() => onStepEdit(index2)}>
                      <EditIcon />
                    </IconButton>{" "}
                    {/* </Tooltip> */}
                    {/* <Tooltip title="Delete Step"> */}
                    <IconButton onClick={() => configurationData.deleteStep(index2)}>
                      <Icon>delete</Icon>{" "}
                    </IconButton>{" "}
                    {/* </Tooltip> */}
                  </MDBox>
                )}
                <StepLabel
                  {...labelProps}
                  sx={{ flexDirection: "column" }}
                  onClick={() => setActiveStep(index2)}
                >
                  {configurationData?.modSwitch &&
                  configurationData.modSwitch === true &&
                  stepEditFag.flag &&
                  stepEditFag.ind === index2 ? (
                    <MDInput
                      autoFocus="true"
                      value={item.name}
                      onChange={(e) => configurationData.onHandelStepEdit(e, index2)}
                      onBlur={onBlurStep}
                    />
                  ) : (
                    item.name
                  )}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <MDTypography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </MDTypography>
            <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <MDBox sx={{ flex: "1 1 auto" }} />
              {/* <MDButton onClick={handleReset}>Reset</MDButton> */}
            </MDBox>
          </>
        ) : (
          <GetStepContent
            activeStep1={activeStep}
            prod={prod}
            dyndata={dyndata[activeStep]}
            accordionList={accordionList[activeStep]}
            nextFlag={nextFlag}
            nextCount={nextCount}
            dto={{ ...dto }}
            setDto={setDto}
            masters={masters}
            setMasters={setMasters}
            onMidNextValidation={onMidNextValidation}
            midNextValidationId={midNextValidationId}
            customFunctions={customFunctions}
            configurationData={configurationData}
          />
        )}

        {btnDetails && (
          <MDBox sx={{ display: "flex", justifyContent: "space-between" }} p={2}>
            <MDBox>
              {btnDetails?.[activeStep]?.prev?.visible && (
                <MDButton
                  onClick={onPrev}
                  variant={
                    btnDetails?.[activeStep]?.prev?.variant
                      ? btnDetails?.[activeStep].prev.variant
                      : "outlined"
                  }
                  color={btnDetails?.[activeStep]?.prev?.color}
                >
                  {btnDetails?.[activeStep].prev.label}
                </MDButton>
              )}
            </MDBox>

            <Stack direction="row" spacing={2}>
              {btnDetails?.[activeStep]?.reset?.visible && (
                <MDButton
                  variant={
                    btnDetails?.[activeStep]?.reset?.variant
                      ? btnDetails?.[activeStep].reset.variant
                      : "outlined"
                  }
                  onClick={onReset}
                  color={btnDetails?.[activeStep]?.reset?.color}
                >
                  {btnDetails?.[activeStep]?.reset?.label}
                </MDButton>
              )}
              {btnDetails?.[activeStep]?.button2 && btnDetails?.[activeStep]?.button2.visible && (
                <MDButton variant="outlined" onClick={btnDetails?.[activeStep]?.button2.onClick}>
                  {btnDetails?.[activeStep]?.button2.label}
                </MDButton>
              )}
              {btnDetails?.[activeStep]?.button1 && btnDetails?.[activeStep]?.button1.visible && (
                <MDButton variant="outlined" onClick={btnDetails?.[activeStep]?.button1.onClick}>
                  {btnDetails?.[activeStep]?.button1.label}
                </MDButton>
              )}
              {btnDetails?.[activeStep]?.next?.visible && (
                <MDButton
                  variant={
                    btnDetails?.[activeStep]?.next?.variant
                      ? btnDetails?.[activeStep].next.variant
                      : "outlined"
                  }
                  onClick={onNext}
                  color={btnDetails?.[activeStep]?.next?.color}
                >
                  {backDropFlag && btnDetails?.[activeStep].next.loader === "button" && (
                    <CircularProgress size="20px" color={btnDetails?.next?.color} />
                  )}
                  {btnDetails?.[activeStep]?.next?.label}
                </MDButton>
              )}
            </Stack>
          </MDBox>
        )}
      </div>
    </MDBox>
  );
}

export default function StepperV3({ configurationData }) {
  const [control] = useDataController();
  const { genericInfo } = control;
  const [dto, setDto] = useState("");
  const [masters, setMasters] = useState("");
  const [FunctionalityData, setFunctionalityData] = useState(null);
  const [ScreenData, setScreenData] = useState("");
  const [prod, setProd] = useState("");
  const [prodLabel, setProdLabel] = useState("");
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const onDrawerClose = () => setDrawerOpen(false);

  useEffect(() => {
    if (configurationData !== undefined) {
      setDto(configurationData.prodDto);
    }
  }, [configurationData?.prodDtoStr]);
  useEffect(() => {
    if (configurationData !== undefined && dto !== "") {
      configurationData.setProdDto({ ...dto });
    }
  }, [dto]);

  useEffect(async () => {
    if (
      dto === "" &&
      configurationData &&
      configurationData.functionalityData &&
      configurationData.functionalityData !== null &&
      configurationData.functionalityData !== undefined
    ) {
      setProdLabel(configurationData.functionalityData?.onPageLoad?.productLabel);

      setFunctionalityData(configurationData?.functionalityData);
      const res = await getUseEffect({
        FunctionalityData: configurationData.functionalityData,
      });
      setDto({ ...res.dto }); // ...res.dto
      setMasters({ ...res.masters }); // ...res.masters
      configurationData.setMastersList([...Object.keys(res?.masters ? { ...res.masters } : {})]);
      setFlag(true);
    } // setMasters()
  }, [configurationData]);

  useEffect(async () => {
    if (prod !== "") {
      const res1 = await GetDynScreen(prod);
      setScreenData(res1.screenData);
      setFunctionalityData({
        ...res1.functionalityData,
        customOnClick: {
          ...res1.functionalityData.customOnClick,
          ...AddFunctions({ productCode: prod }),
        },
      });
      setProdLabel(res1.functionalityData?.onPageLoad?.productLabel);
      const res = await getUseEffect({
        FunctionalityData: res1.functionalityData,
      });
      setDto({ ...res.dto }); // ...res.dto
      setMasters({ ...res.masters }); // ...res.masters
      setFlag(true);
      if (configurationData !== undefined)
        configurationData.setMastersList([...Object.keys(res?.masters ? { ...res.masters } : {})]);

      // const
    }
  }, [prod]);
  useEffect(() => {
    if (genericInfo.prod) {
      setProd(genericInfo.prod);
      setProdLabel(genericInfo.prodLabel);
    }
  }, [genericInfo]);

  return (
    <MDBox>
      <Drawer
        sx={{
          width: "50vw",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "50vw",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={DrawerOpen}
        onClose={onDrawerClose}
      >
        <ReactJson
          collapsed={false}
          src={dto}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          // enableClipboard={0}
          onAdd={(e) => setDto({ ...e.updated_src })}
          onDelete={(e) => setDto({ ...e.updated_src })}
          onEdit={(e) => setDto({ ...e.updated_src })}
          style={{ fontSize: 15 }}
        />{" "}
      </Drawer>

      <Card>
        <Stack spacing={2} p={2}>
          <MDTypography>{prodLabel}</MDTypography>
          {/* {((prod !== "" && dto !== "" && masters !== "") ||
            (configurationData !== undefined && configurationData !== null)) && ( */}
          {flag === true && (
            <HorizontalLinearStepper
              prod={prod}
              dto={{ ...dto }}
              setDto={setDto}
              masters={masters}
              setMasters={setMasters}
              setDrawerOpen={setDrawerOpen}
              customFunctions={getEventData({
                prod: genericInfo.prod,
                dto,
                setDto,
                masters,
                setMasters,
                FunctionalityData,
              })}
              screenData={ScreenData}
              configurationData={configurationData}
              FunctionalityData={FunctionalityData}
            />
          )}
        </Stack>
      </Card>
    </MDBox>
  );
}
