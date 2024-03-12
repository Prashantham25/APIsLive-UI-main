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
  FormControlLabel,
  Stack,
  Backdrop,
  CircularProgress,
  Switch,
  Grow,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import objectPath from "object-path";
import swal from "sweetalert";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  // getPolicyDto,
} from "../data/StepperV1";
import {
  setGenericPolicyDto,
  setGenericInfo,
  useDataController,
} from "../../../../BrokerPortal/context";
import SkeltonLoader from "../../../../BaseSetup/views/RND/SkeltonLoader";
import RenderControlV1 from "../../../../../Common/RenderControl/RenderControlV1";
import breakpoints from "../../../../../assets/theme/base/breakpoints";
import { isFunction } from "../../../../../Common/Validations";

function TypeFilter({
  item,
  nextFlag,
  nextCount,
  setPolicyDto,
  PolicyDto,
  dyndata,
  genericInfo,
  resetCount,
}) {
  const [control] = useDataController();
  const { genericPolicyDto } = control;

  if (item.type === "Accordions")
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        {item.accordionList.map((x1) => (
          <MDBox>
            {x1.visible === true && (
              <Accordion sx={{ ...x1.sx }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    {x1.label}
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container display="flex" spacing={1}>
                    {dyndata
                      .filter((x2) => x2.accordionId === x1.id)
                      .map((item1) => (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={item1.spacing}
                          lg={item1.spacing}
                          xl={item1.spacing}
                          xxl={item1.spacing}
                        >
                          <RenderControlV1
                            item={item1}
                            setPolicyDto={setPolicyDto}
                            PolicyDto={PolicyDto}
                            nextFlag={nextFlag}
                            nextCount={nextCount}
                            genericPolicyDto={genericPolicyDto}
                            genericInfo={genericInfo}
                            resetCount={resetCount}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )}
          </MDBox>
        ))}
      </Grid>
    );
  if (!item.accordionId)
    return (
      <RenderControlV1
        item={item}
        setPolicyDto={setPolicyDto}
        PolicyDto={PolicyDto}
        nextFlag={nextFlag}
        nextCount={nextCount}
        genericInfo={genericInfo}
        genericPolicyDto={genericPolicyDto}
        resetCount={resetCount}
      />
    );

  return null;
}

function StepDetails({ index, prod, activeStep, nextFlag, nextCount, resetCount }) {
  const [control, dispatch] = useDataController();
  const { genericPolicyDto, genericInfo } = control;
  const [PolicyDto, setPolicyDto] = useState(genericPolicyDto);
  const dyndata = getSectionContent({ prod, activeStep });
  const spacing = 3;

  useEffect(() => {
    setGenericPolicyDto(dispatch, PolicyDto);
  }, [PolicyDto]);

  return (
    <Grid container display="flex" spacing={1} rowSpacing={3}>
      {dyndata.length > 0 &&
        dyndata[index].map((item) =>
          item.visible ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={item.spacing ? item.spacing : spacing}
              lg={item.spacing}
              xl={item.spacing}
              xxl={item.spacing}
            >
              {/* 
              <RenderControlV1
                item={item}
                index={index1}
                setPolicyDto={setPolicyDto}
                PolicyDto={PolicyDto}
                genericPolicyDto={genericPolicyDto}
                nextFlag={nextFlag}
                nextCount={nextCount}
                resetCount={resetCount}
                setOnBlurFlag={setOnBlurFlag}
                genericInfo={genericInfo}
              /> 
              */}

              <TypeFilter
                item={item}
                nextFlag={nextFlag}
                nextCount={nextCount}
                setPolicyDto={setPolicyDto}
                PolicyDto={PolicyDto}
                dyndata={dyndata[index]}
                genericInfo={genericInfo}
                genericPolicyDto={genericPolicyDto}
                resetCount={resetCount}
              />
            </Grid>
          ) : null
        )}
    </Grid>
  );
}
function GetStepContent({ activeStep1, prod, nextFlag, nextCount, resetCount, setOnBlurFlag }) {
  const activeStep = activeStep1;
  const accordionList = getPageContent({ prod, activeStep: activeStep1 });
  const [control] = useDataController();
  const { genericInfo } = control;
  // const [AccExpanded, setAccExpanded] = useState("");
  // // accordionList.length > 0 ? accordionList[0].name : ""
  // // );
  // const handleChange = (p1) => {
  //   setAccExpanded(p1);
  // };
  return (
    <MDBox sx={{ width: "100%" }}>
      {genericInfo.Endorsement && genericInfo.Endorsement === true ? (
        <>
          {accordionList.map((item, idx) =>
            item.Endorsement === true ? (
              <Accordion
                defaultExpanded={idx === 0 || item.defaultExpanded}
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                // expanded={item?.name === "" || accordionList.length === 1 ? true : undefined}
                // onChange={() => handleChange(item.name)}
              >
                <AccordionSummary expandIcon={item.name !== "" && <ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    {item.name}
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails expandIcon={<ExpandMoreIcon />}>
                  <StepDetails
                    index={idx}
                    prod={prod}
                    activeStep={activeStep}
                    nextFlag={nextFlag}
                    nextCount={nextCount}
                    resetCount={resetCount}
                    setOnBlurFlag={setOnBlurFlag}
                  />
                </AccordionDetails>
              </Accordion>
            ) : null
          )}
        </>
      ) : (
        <>
          {accordionList.map((item, idx) =>
            item.visible === true ? (
              <Accordion
                defaultExpanded={idx === 0 || item.defaultExpanded}
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                // expanded={item?.name === "" || accordionList.length === 1 ? true : undefined}
                // onChange={() => handleChange(item.name)}
              >
                <AccordionSummary expandIcon={item.name !== "" && <ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    {item.name}
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails expandIcon={<ExpandMoreIcon />}>
                  <StepDetails
                    index={idx}
                    prod={prod}
                    activeStep={activeStep}
                    nextFlag={nextFlag}
                    nextCount={nextCount}
                    resetCount={resetCount}
                    setOnBlurFlag={setOnBlurFlag}
                  />
                </AccordionDetails>
              </Accordion>
            ) : null
          )}
        </>
      )}
    </MDBox>
  );
}

function HorizontalLinearStepper({ prod }) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const stepParam = parseInt(searchParams.get("step"), 10);
  const [activeStep, setActiveStep] = useState(stepParam || 0);
  const [skFlg, setSkFlg] = useState(false);
  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(0);

  const [backDropFlag, setBackDropFlag] = useState(false);

  const [valSwitch, setValSwitch] = useState(true);
  const navigate = useNavigate();

  const steps = getProcessSteps(prod);
  let steps1 = [];
  if (steps.length > 0 && typeof steps[0] === "string")
    steps.forEach((x1) => {
      steps1.push({ name: x1, visible: true, Endorsement: true });
    });
  else steps1 = [...steps];

  const accordionList = getPageContent({ prod, activeStep });
  const dyndata = getSectionContent({ prod, activeStep }); // components

  const [onBlurFlag, setOnBlurFlag] = useState(false);

  const [control, dispatch] = useDataController();
  const { genericPolicyDto, genericInfo } = control;
  const dto = genericPolicyDto;
  const btnDetails = getButtonDetails({ prod, activeStep, dto, setBackDropFlag });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);
  useEffect(() => {
    setActiveStep(stepParam || 0);
  }, [search]);

  const onNextOther = async () => {
    // setBackDropFlag(true);
    // setSkFlg(true);

    setNextFlag(true);
    setNextCount(nextCount + 1);

    let validationFlag = true;
    dyndata.forEach((x1, i1) => {
      x1.forEach((x2) => {
        if (accordionList[i1].visible === true) {
          if (
            x2.visible === true &&
            x2.required === true &&
            !x2.disableValidationOnProceed &&
            !x2.disableValidationOnProceed === true
          ) {
            const val = objectPath.get(genericPolicyDto, x2.value);
            if (val === "" || val === undefined) validationFlag = false;
            if (
              (x2.multiple && x2.multiple === true && val === undefined) ||
              (x2.multiple && x2.multiple === true && Array.isArray(val) && val.length === 0)
              // !Array.isArray(val)
            )
              validationFlag = false;
          }
        }
      });
    });

    return validationFlag === true && onBlurFlag === false;
  };

  const onNext = async () => {
    if (valSwitch) {
      setBackDropFlag(true);
      // setSkFlg(true);

      setNextFlag(true);
      setNextCount(nextCount + 1);

      let validationFlag = true;
      dyndata.forEach((x1, i1) => {
        x1.forEach((x2) => {
          if (accordionList[i1].visible === true) {
            if (
              x2.visible === true &&
              x2.required === true &&
              !x2.disableValidationOnProceed &&
              !x2.disableValidationOnProceed === true
            ) {
              const val = objectPath.get(genericPolicyDto, x2.value);
              if (val === "" || val === undefined) validationFlag = false;
              if (
                (x2.multiple && x2.multiple === true && val === undefined) ||
                (x2.multiple && x2.multiple === true && Array.isArray(val) && val.length === 0)
                // !Array.isArray(val)
              )
                validationFlag = false;
            }
          }
        });
      });

      if (validationFlag === true && onBlurFlag === false) {
        // if (activeStep === 0 && nextLabel === "Calculate Premium") {
        //   const onClickFun = await getOnNextClick({ prod, activeStep }); // onNext function if exist
        //   if (onClickFun) setNextLabel("Proceed");
        // } else if (activeStep < stepsLength && activeStep !== 0) {
        //   const onClickFun = await getOnNextClick({ prod, activeStep });
        //   if (onClickFun) {
        //     setNextFlag(false);
        //     setActiveStep(activeStep + 1);
        //   }
        // } else {
        //   setNextFlag(false);
        //   setActiveStep(activeStep + 1);
        // }
        let onClickFun = false;
        // if (genericInfo.Endorsement && genericInfo.Endorsement === true) onClickFun = true;
        // else
        onClickFun = await getOnNextClick({
          prod,
          activeStep,
          setBackDropFlag,
          genericInfo,
          genericPolicyDto,
        });
        if (onClickFun) {
          setNextFlag(false);
          setActiveStep(activeStep + 1);
        }
      } else swal({ icon: "error", text: "Please fill the required fields" });
      setBackDropFlag(false);
      setSkFlg(false);
    } else {
      setNextFlag(false);
      setActiveStep(activeStep + 1);
    }
  };
  const onPrev = () => {
    setBackDropFlag(true);
    if (activeStep > 0) {
      if (isFunction(btnDetails.prev.onClick)) btnDetails.prev?.onClick();
      setActiveStep(activeStep - 1);
    }
    setBackDropFlag(false);
  };

  const onReset = () => {
    setBackDropFlag(true);
    dyndata.forEach((x1) => {
      x1.forEach((x2) => {
        if (!x2.disableOnReset || x2.disableOnReset !== true) {
          if (x2.multiple && x2.multiple === true) objectPath.set(dto, x2.value, []);
          else objectPath.set(dto, x2.value, "");
        }
      });
    });
    if (isFunction(btnDetails.reset.onClick))
      btnDetails.reset.onClick(dto, setGenericPolicyDto, dispatch);
    setGenericPolicyDto(dispatch, { ...dto });
    if (genericInfo.reset)
      setGenericInfo(dispatch, { ...genericInfo, reset: genericInfo.reset + 1 });
    else setGenericInfo(dispatch, { ...genericInfo, reset: 1 });
    setBackDropFlag(false);
  };

  const onValSwitch = (e) => {
    setValSwitch(e.target.checked);
  };

  useEffect(() => {
    if (genericInfo.activeStep && genericInfo.activeStep !== 0)
      setActiveStep(genericInfo.activeStep);
  }, [activeStep]);

  const onConsoleDto = () => {
    console.log("genericPolicyDto", genericPolicyDto);
    console.log("genericInfo", genericInfo);
  };
  const onAllRetail = () => {
    if (localStorage.getItem("DemoProduct") !== "") {
      navigate("/AllRetailDemoLandingPage");
    } else {
      navigate("/AllRetailLandingPage");
    }
  };

  return (
    <MDBox sx={{ width: "100%", px: 2 }}>
      {process.env.NODE_ENV === "development" && (
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            control={<Switch checked={valSwitch} onChange={onValSwitch} />}
            label="Validations"
          />
          <MDButton variant="text" onClick={onConsoleDto}>
            Console PolicyDto
          </MDButton>
          <MDButton variant="text" onClick={onAllRetail}>
            All Retail Landing Page
          </MDButton>
        </Stack>
      )}
      {(btnDetails.next.loader === "backDrop" || backDropFlag === true) && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <CircularProgress />
        </Backdrop>
      )}

      {skFlg ? (
        <SkeltonLoader />
      ) : (
        <div>
          {window.innerWidth < breakpoints.values.md ? (
            <Stack
              direction="row"
              spacing={2}
              p={1}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <MDTypography variant="h4" color="primary">
                {steps[activeStep]}
              </MDTypography>
              <MDTypography variant="h4" color="primary">{`${activeStep + 1} / ${
                steps.length
              }`}</MDTypography>
            </Stack>
          ) : (
            <div>
              {genericInfo.Endorsement && genericInfo.Endorsement === true ? (
                <Stepper activeStep={activeStep}>
                  {steps1.map(
                    (item) =>
                      item.Endorsement === true && (
                        <Step key={item.name}>
                          <StepLabel sx={{ flexDirection: "column" }}>{item.name}</StepLabel>
                        </Step>
                      )
                  )}
                </Stepper>
              ) : (
                <Stepper activeStep={activeStep}>
                  {steps1.map(
                    (item) =>
                      item.visible === true && (
                        <Step key={item.name}>
                          <StepLabel sx={{ flexDirection: "column" }}>{item.name}</StepLabel>
                        </Step>
                      )
                  )}
                </Stepper>
              )}
            </div>
          )}
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
              nextFlag={nextFlag}
              nextCount={nextCount}
              resetCount={genericInfo.reset ? genericInfo.reset : 0}
              setOnBlurFlag={setOnBlurFlag}
            />
          )}

          {btnDetails && (
            <MDBox sx={{ display: "flex", justifyContent: "space-between" }} p={1}>
              <MDBox>
                {btnDetails.prev.visible && (
                  <MDButton onClick={onPrev} variant="outlined" tabIndex={-1}>
                    {btnDetails.prev.label}
                  </MDButton>
                )}
              </MDBox>

              <Stack direction="row" spacing={1}>
                {btnDetails.reset.visible && (
                  <MDButton
                    tabIndex={-1}
                    variant="outlined"
                    onClick={onReset}
                    disabled={genericInfo.Endorsement === true}
                  >
                    {btnDetails.reset.label}
                  </MDButton>
                )}
                {btnDetails?.button2 && btnDetails.button2.visible && (
                  <MDButton
                    variant="outlined"
                    onClick={() => btnDetails.button2.onClick(onNextOther)}
                    disabled={
                      btnDetails.button2?.disabled ||
                      genericInfo?.EndorsementNavigationList?.[activeStep]?.button2
                    }
                  >
                    {btnDetails.button2.label}
                  </MDButton>
                )}
                {btnDetails?.button1 && btnDetails.button1.visible && (
                  <MDButton
                    variant="outlined"
                    onClick={() => btnDetails.button1.onClick(onNextOther)}
                    disabled={
                      btnDetails.button1?.disabled ||
                      genericInfo?.EndorsementNavigationList?.[activeStep]?.button1
                    }
                  >
                    {btnDetails.button1.label}
                  </MDButton>
                )}
                {btnDetails.next.visible && (
                  <MDButton
                    variant="outlined"
                    onClick={onNext}
                    disabled={btnDetails.next?.disabled}
                  >
                    {backDropFlag && btnDetails.next.loader === "button" && (
                      <CircularProgress size="20px" />
                    )}
                    {genericInfo?.Endorsement === true
                      ? btnDetails.next.endorsementLabel
                      : btnDetails.next.label}
                  </MDButton>
                )}
              </Stack>
            </MDBox>
          )}
        </div>
      )}
    </MDBox>
  );
}

function StepperV1() {
  const [control] = useDataController();
  const { genericInfo } = control;

  const [prod, setProd] = useState("");
  const [prodLabel, setProdLabel] = useState("");

  const [slideFlag, setSlideFlag] = useState(false);

  useEffect(() => {
    setSlideFlag(true);
  }, []);
  useEffect(() => {
    const prodName = sessionStorage.getItem("ProductV1");
    const lProdLabel = sessionStorage.getItem("ProductLabelV1");

    if (prodName !== "" && prodName !== null && prodName !== undefined) setProd(prodName);
    if (
      lProdLabel !== "" &&
      lProdLabel !== null &&
      lProdLabel !== undefined &&
      lProdLabel !== "undefined"
    )
      setProdLabel(lProdLabel);
  }, []);
  // const prod = new URLSearchParams(search).get("prod");
  useEffect(() => {
    if (genericInfo.prod) {
      // if (prod === "MotorCycle") setProbLabel("Motorcycle Insurance");
      // const dto = getPolicyDto(genericInfo.prod);
      // setGenericPolicyDto(dispatch, { ...dto });
      setProd(genericInfo.prod);
      setProdLabel(genericInfo.prodLabel);
      sessionStorage.setItem("ProductV1", genericInfo.prod); //  add this line
      sessionStorage.setItem("ProductLabelV1", genericInfo.prodLabel);
    }
  }, [genericInfo]);
  return (
    <Grow
      in={slideFlag}
      style={{ transformOrigin: "0 0 0" }}
      {...(slideFlag ? { timeout: 3000 } : {})}
    >
      <Card>
        <Stack spacing={1} p={1}>
          <MDTypography>{prodLabel}</MDTypography>
          {prod !== "" && <HorizontalLinearStepper prod={prod} genericInfo={genericInfo} />}
        </Stack>
      </Card>
    </Grow>
  );
}
export default StepperV1;
