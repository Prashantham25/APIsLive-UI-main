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
  Drawer,
  Grow,
} from "@mui/material";
import ReactJson from "react-json-view";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useNavigate, useLocation } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import objectPath from "object-path";
import swal from "sweetalert";
import NMIC from "assets/images/Gifs/NMIC.gif";
import PMIC from "assets/images/Gifs/PMIC.gif";
import {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
} from "../data/StepperV2";
import {
  // setGenericPolicyDto,
  setGenericInfo,
  useDataController,
} from "../../../../BrokerPortal/context";
import SkeltonLoader from "../../../../BaseSetup/views/RND/SkeltonLoader";
// import RenderControl from "../../../../Common/RenderControl/NewRenderControl";
import { get, set } from "../../../../../Common/RenderControl/objectPath";
import RenderControlMapperV2 from "../../../../../Common/RenderControl/RenderControlMapperV2";
import { isFunction } from "../../../../../Common/Validations";

// /* eslint-disable */

function TypeFilter({
  item,
  nextFlag,
  nextCount,
  dto,
  setDto,
  dyndata,
  onMidNextValidation,
  midNextValidationId,
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
            p={x1.p}
          >
            <Grid container display="flex" spacing={1.5}>
              {dyndata
                .filter((x2) => x2.splitId === x1.id)
                .map((item1) => (
                  <RenderControlMapperV2
                    item={item1}
                    dto={{ ...dto }}
                    setDto={setDto}
                    nextFlag={nextFlag}
                    nextCount={nextCount}
                    defaultSpacing={6}
                    onMidNextValidation={onMidNextValidation}
                    midNextValidationId={midNextValidationId}
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
          <MDBox>
            {x1.visible === true && (
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
                        <RenderControlMapperV2
                          item={item1}
                          dto={{ ...dto }}
                          setDto={setDto}
                          nextFlag={nextFlag}
                          nextCount={nextCount}
                          defaultSpacing={6}
                          onMidNextValidation={onMidNextValidation}
                          midNextValidationId={midNextValidationId}
                        />
                      ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )}
          </MDBox>
        ))}
      </Grid>
    );
  if (!item.splitId && !item.accordionId)
    return (
      <RenderControlMapperV2
        item={item}
        dto={{ ...dto }}
        setDto={setDto}
        nextFlag={nextFlag}
        nextCount={nextCount}
        defaultSpacing={3}
        onMidNextValidation={onMidNextValidation}
        midNextValidationId={midNextValidationId}
      />
    );

  return null;
}

function StepDetails({
  index,
  // prod,
  // activeStep,
  nextFlag,
  nextCount,
  dto,
  setDto,
  // masters,
  // setMasters,
  dyndata,
  onMidNextValidation,
  midNextValidationId,
}) {
  return (
    <Grid container display="flex" spacing={1.5}>
      {dyndata?.length > 0 &&
        dyndata[index]?.map((item) => (
          <TypeFilter
            item={item}
            nextFlag={nextFlag}
            nextCount={nextCount}
            dto={dto}
            setDto={setDto}
            dyndata={dyndata[index]}
            onMidNextValidation={onMidNextValidation}
            midNextValidationId={midNextValidationId}
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
}) {
  const activeStep = activeStep1;

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
          item.visible === true && (
            <MDBox>
              {item.name !== "" ? (
                <Accordion
                  defaultExpanded={idx === 0 || item.defaultExpanded === true}
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
                    <MDTypography variant="h6" color="primary">
                      {item.name}
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }} expandIcon={<ExpandMoreIcon />}>
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
                />
              )}
            </MDBox>
          )
      )}
    </MDBox>
  );
}

function HorizontalLinearStepper({
  activeStep,
  setActiveStep,
  prod,
  dto,
  setDto,
  masters,
  setMasters,
  setDrawerOpen,
}) {
  const navigate = useNavigate();
  const btnDetails = getButtonDetails({ prod, activeStep, dto, setDto, masters, setMasters });

  const [skFlg, setSkFlg] = useState(false);
  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(0);
  const [midNextValidationId, setMidNextValidationId] = useState(-1);

  const [backDropFlag, setBackDropFlag] = useState(false);

  const [valSwitch, setValSwitch] = useState(true);

  const steps = getProcessSteps({ prod, dto, setDto, masters, setMasters });

  const accordionList = getPageContent({ prod, activeStep, dto, setDto, masters, setMasters });
  const dyndata = getSectionContent({
    prod,
    activeStep,
    dto,
    setDto,
    masters,
    setMasters,
    setBackDropFlag,
    navigate,
  }); // components

  const [control, dispatch] = useDataController();
  const { genericInfo } = control;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const onMidNextValidation = (validationId) => {
    let validationFlag = true;
    accordionList.forEach((x1, i1) => {
      if (x1.visible === true) {
        dyndata[i1].forEach((x2) => {
          if (
            x2.type !== "ValidationControl" &&
            x2.validationId === validationId &&
            (x2.visible === true ||
              (x2.visible === "visibleDetails" &&
                x2.visibleDetails &&
                get(dto, x2.visibleDetails.path) === x2.visibleDetails.value))
          ) {
            if (x2.required === true) {
              const val = get(dto, x2.path);
              if (val === "" || val === undefined || x2.errorFlag === true) validationFlag = false;
            }

            if (
              x2.required === "requiredDetails" &&
              x2.requiredDetails &&
              get(dto, x2.requiredDetails.path) === x2.requiredDetails.value
            ) {
              const val = get(dto, x2.path);
              if (val === "" || val === undefined || x2.errorFlag === true) validationFlag = false;
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
      (x2?.validationDisableOnProceed !== true && x2.visible === true) ||
      (x2.visible === "visibleDetails" &&
        x2.visibleDetails &&
        get(dto, x2.visibleDetails.path) === x2.visibleDetails.value)
    ) {
      if (x2.required === true) {
        const val = get(dto, x2.path);
        if (val === "" || val === undefined || x2.errorFlag === true) validationFlag = false;
        if (
          (x2.multiple && x2.multiple === true && val === undefined) ||
          (x2.multiple && x2.multiple === true && Array.isArray(val) && val.length === 0)
          // !Array.isArray(val)
        )
          validationFlag = false;
      }

      if (
        x2.required === "requiredDetails" &&
        x2.requiredDetails &&
        get(dto, x2.requiredDetails.path) === x2.requiredDetails.value
      ) {
        const val = get(dto, x2.path);
        if (val === "" || val === undefined || x2.errorFlag === true) validationFlag = false;
        if (
          (x2.multiple && x2.multiple === true && val === undefined) ||
          (x2.multiple && x2.multiple === true && Array.isArray(val) && val.length === 0)
          // !Array.isArray(val)
        )
          validationFlag = false;
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

      let nestedAccordions = [];

      let validationFlag = true;
      accordionList.forEach((x1, i1) => {
        if (x1.visible === true) {
          dyndata[i1].forEach((x2) => {
            if (x2.type === "Mapper1") {
              get(dto, x2.path).forEach((x3, i3) => {
                x2.mapperComponents.forEach((x4) => {
                  if (onNextMapper({ ...x4, path: `${x2.path}.${i3}.${x4?.path}` }) === false)
                    validationFlag = false;
                });
              });
            } else if (!x2.accordionId && onNextMapper(x2) === false) validationFlag = false;
            if (x2.type === "Accordions")
              nestedAccordions = [...nestedAccordions, ...x2.accordionList];
          });
        }
      });
      nestedAccordions.forEach((x5) => {
        accordionList.forEach((x1, i1) => {
          if (x1.visible === true) {
            dyndata[i1].forEach((x2) => {
              if (x2.visible === true && x5.visible === true && x5.id === x2.accordionId) {
                if (x2.type === "Mapper1") {
                  get(dto, x2.path).forEach((x3, i3) => {
                    x2.mapperComponents.forEach((x4) => {
                      if (onNextMapper({ ...x4, path: `${x2.path}.${i3}.${x4?.path}` }) === false)
                        validationFlag = false;
                    });
                  });
                } else if (onNextMapper(x2) === false) validationFlag = false;
              }
            });
          }
        });
      });

      // item.visible === "visibleDetails" &&
      // item.visibleDetails &&
      // objectPath.get(dto, item.visibleDetails.path) === item.visibleDetails.value

      if (validationFlag === true) {
        const onClickFun = await getOnNextClick({
          prod,
          activeStep,
          setBackDropFlag,
          dto,
          setDto,
          masters,
          setMasters,
          setActiveStep,
          navigate,
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
    if (activeStep > 0) setActiveStep(activeStep - 1);
    setBackDropFlag(false);
  };

  const onReset = () => {
    let lDto = { ...dto };
    setBackDropFlag(true);
    dyndata.forEach((x1) => {
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
    if (isFunction(btnDetails.reset.onClick)) btnDetails.reset.onClick(lDto, setDto);
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
    console.log("steps", steps);
    console.log("accordionList", accordionList);
    console.log("Components", dyndata);
    console.log("Masters", masters);
  };
  useEffect(() => {
    if (genericInfo.activeStep && genericInfo.activeStep !== 0)
      setActiveStep(genericInfo.activeStep);
  }, [activeStep]);

  const onAllRetail = () => {
    navigate("/AllRetailLandingPage");
  };

  return (
    <MDBox sx={{ width: "100%" }}>
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
      {btnDetails.next?.loader === "backDrop" && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <CircularProgress />
        </Backdrop>
      )}
      {btnDetails.next?.loader === "NMIC" && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <img src={NMIC} alt="..." />
        </Backdrop>
      )}
      {btnDetails.next?.loader === "PMIC" && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <img src={PMIC} alt="..." />
        </Backdrop>
      )}

      {skFlg ? (
        <SkeltonLoader />
      ) : (
        <div>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    sx={{ flexDirection: "column", position: "sticky", top: "0" }}
                  >
                    {label}
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
              dyndata={dyndata}
              accordionList={accordionList}
              nextFlag={nextFlag}
              nextCount={nextCount}
              dto={{ ...dto }}
              setDto={setDto}
              masters={masters}
              setMasters={setMasters}
              onMidNextValidation={onMidNextValidation}
              midNextValidationId={midNextValidationId}
            />
          )}

          {btnDetails && (
            <MDBox sx={{ display: "flex", justifyContent: "space-between" }} p={2}>
              <MDBox>
                {btnDetails.prev?.visible && (
                  <MDButton
                    tabIndex={-1}
                    onClick={onPrev}
                    variant={btnDetails?.prev?.variant ? btnDetails.prev.variant : "outlined"}
                    color={btnDetails?.prev?.color}
                  >
                    {btnDetails.prev.label}
                  </MDButton>
                )}
              </MDBox>

              <Stack direction="row" spacing={2}>
                {btnDetails.reset?.visible && (
                  <MDButton
                    tabIndex={-1}
                    variant={btnDetails?.reset?.variant ? btnDetails.reset.variant : "outlined"}
                    onClick={onReset}
                    color={btnDetails?.reset?.color}
                  >
                    {btnDetails.reset.label}
                  </MDButton>
                )}
                {btnDetails?.button2 && btnDetails.button2?.visible && (
                  <MDButton variant="outlined" onClick={btnDetails.button2.onClick}>
                    {btnDetails.button2.label}
                  </MDButton>
                )}
                {btnDetails?.button1 && btnDetails.button1?.visible && (
                  <MDButton variant="outlined" onClick={btnDetails.button1.onClick}>
                    {btnDetails.button1.label}
                  </MDButton>
                )}
                {btnDetails.next?.visible && (
                  <MDButton
                    variant={btnDetails?.next?.variant ? btnDetails.next.variant : "outlined"}
                    onClick={onNext}
                    color={btnDetails?.next?.color}
                    disabled={btnDetails?.next?.disabled === true}
                  >
                    {backDropFlag && btnDetails.next.loader === "button" && (
                      <CircularProgress size="20px" color={btnDetails?.next?.color} />
                    )}
                    {btnDetails.next.label}
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

function StepperV2() {
  const [control] = useDataController();
  const { genericInfo, loginUserDetails, genericPolicyDto } = control;
  const [dto, setDto] = useState("");
  const [masters, setMasters] = useState("");
  const [prod, setProd] = useState("");
  const [prodLabel, setProdLabel] = useState("");
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [slideFlag, setSlideFlag] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const { search } = useLocation();
  const acstep = new URLSearchParams(search).get("acstep");

  useEffect(() => {
    if (acstep !== null && acstep !== undefined && acstep !== "")
      setActiveStep(parseInt(acstep, 10));
  }, [acstep]);

  useEffect(() => {
    setSlideFlag(true);
  }, []);
  const onDrawerClose = () => setDrawerOpen(false);

  useEffect(() => {
    const prodName = sessionStorage.getItem("ProductV2");
    const lProdLabel = sessionStorage.getItem("ProductLabelV2");

    if (prodName !== "" && prodName !== null && prodName !== undefined) setProd(prodName);
    if (
      lProdLabel !== "" &&
      lProdLabel !== null &&
      lProdLabel !== undefined &&
      lProdLabel !== "undefined"
    )
      setProdLabel(lProdLabel);
  }, []);

  useEffect(async () => {
    if (prod !== "") {
      const lDto = getPolicyDto({
        prod,
        PolicyDto: genericPolicyDto,
        genericInfo,
      });
      setDto({ ...lDto, Product: prod, ProductVersion: "V2", Url: window.location.pathname });
      const lMst = await getMasterData({
        prod,
        dto: lDto,
        setDto,
        additionalInformation: { loginUserDetails },
        genericInfo,
      });
      setMasters({ ...lMst });
      sessionStorage.setItem("ProductV2", prod);
      sessionStorage.setItem("ProductLabelV2", prodLabel);
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
          src={dto}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          // enableClipboard={0}
          onAdd={(e) => setDto({ ...e.updated_src })}
          onDelete={(e) => setDto({ ...e.updated_src })}
          onEdit={(e) => setDto({ ...e.updated_src })}
          style={{ fontSize: 15 }}
        />
      </Drawer>
      <Grow
        in={slideFlag}
        style={{ transformOrigin: "0 0 0" }}
        {...(slideFlag ? { timeout: 3000 } : {})}
      >
        <Card>
          <Stack spacing={2} p={2}>
            <MDTypography>{prodLabel}</MDTypography>
            {prod !== "" && dto !== "" && masters !== "" && (
              <HorizontalLinearStepper
                prod={prod}
                dto={{ ...dto }}
                setDto={setDto}
                masters={masters}
                setMasters={setMasters}
                setDrawerOpen={setDrawerOpen}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            )}
          </Stack>
        </Card>
      </Grow>
    </MDBox>
  );
}
export default StepperV2;
