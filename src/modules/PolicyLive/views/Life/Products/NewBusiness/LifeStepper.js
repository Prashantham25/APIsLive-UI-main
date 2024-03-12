import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
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
  useMediaQuery,
  MobileStepper,
  // Grow,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight, ArrowForward } from "@mui/icons-material";
import ReactJson from "react-json-view";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import objectPath from "object-path";
// import swal from "sweetalert";
import Swal from "sweetalert2";

import RenderControl from "../../../../../../Common/RenderControl/NewRenderControl";
import { get, set } from "../../../../../../Common/RenderControl/objectPath";
import MDLoader from "../../../../../../components/MDLoader";
import RenderControlMapperV2 from "../../../../../../Common/RenderControl/RenderControlMapperV2";
import ColorsSetting from "../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import {
  isFunction,
  IsGstNo,
  IsCKYC,
  IsEmail,
  IsMobileNumber,
  IsPassport,
  IsPan,
} from "../../../../../../Common/Validations";

const valBlurFunc = [
  { funName: "IsGstNo", fun: IsGstNo },
  { funName: "IsPan", fun: IsPan },
  { funName: "IsPassport", fun: IsPassport },
  { funName: "IsMobileNumber", fun: IsMobileNumber },
  { funName: "IsEmail", fun: IsEmail },
  { funName: "IsCKYC", fun: IsCKYC },
];

const cardColor = ColorsSetting().secondary.focus;

const checkOnBlurValidation = (item, value) => {
  let flag = true;

  if (item.keepValueOnBlur === true && Array.isArray(item.onBlurFuncs) && value !== "") {
    item.onBlurFuncs.forEach((fun) => {
      const funName = valBlurFunc.filter((x) => x.funName === fun);
      if (funName.length > 0) {
        if (funName[0].fun(value) === true) {
          flag = true;
        } else {
          flag = false;
        }
      } else if (fun(value) === true) {
        flag = true;
      } else if (value !== "") {
        flag = false;
      }
    });
  }
  return flag;
};

function StepDetails({
  index,
  //
  activeStep,
  nextFlag,
  nextCount,
  dto,
  setDto,
  // masters,
  // setMasters,
  dyndata,
  endorsement,
  onMidNextValidation,
  midNextValidationId,
}) {
  const spacing = 3;
  const splitSpacing = 6;

  const getItemsById = (splitId) =>
    dyndata[index].filter((x) => x.splitId === splitId && x.hide !== true);

  const mobileView = useMediaQuery("(min-width:500px)");

  /* eslint-disable react/no-array-index-key */
  return (
    <Grid container display="flex" spacing={1.5} rowSpacing={2} sx={{ height: "100%" }}>
      {dyndata?.length > 0 &&
        dyndata[index]?.map((item, index1) =>
          item.hide !== true && item.visible === true && !item.splitId && !item.accordionId ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={item.spacing ? item.spacing : spacing}
              lg={item.spacing ? item.spacing : spacing}
              xl={item.spacing ? item.spacing : spacing}
              xxl={item.spacing ? item.spacing : spacing}
            >
              {item.type === "Split" ? (
                <Grid container spacing={1.5}>
                  {item.split.map((x) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={x.md ? x.md : splitSpacing}
                      lg={x.lg ? x.lg : splitSpacing}
                      xl={x.xl ? x.xl : splitSpacing}
                      xxl={x.xxl ? x.xxl : splitSpacing}
                    >
                      {/* eslint-disable no-nested-ternary */}
                      <Grid container spacing={1}>
                        {getItemsById(x.splitId).map((x1) =>
                          x1.visible === true
                            ? x1.type === "Accordion"
                              ? x1.accordionList.map((x2) => (
                                  <MDBox sx={{ width: "100%" }}>
                                    {x2.visible === true && (
                                      <MDBox>
                                        {x2.label !== "" ? (
                                          <Accordion
                                            defaultExpanded
                                            disableGutters
                                            sx={{
                                              ...x2.sx,
                                              boxShadow: "unset",
                                              border: "unset",
                                              "&:before": { display: "none" },
                                              pt: "0.5rem",
                                              pb: "0.5rem",
                                              bgcolor: cardColor,
                                            }}
                                          >
                                            <AccordionSummary
                                              expandIcon={<ExpandMoreIcon color="white" />}
                                              sx={{
                                                background: ColorsSetting().primary.main,
                                                mb: "0.5rem",
                                                borderRadius: "0.7rem",
                                              }}
                                            >
                                              <MDTypography variant="h6" color="white">
                                                {x2.label}
                                              </MDTypography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                              <MDBox
                                                sx={{
                                                  bgcolor: cardColor,
                                                  m: -2,
                                                  p: mobileView ? 3 : 0,
                                                  borderRadius: "0.7rem",
                                                }}
                                              >
                                                <Grid container display="flex" spacing={1.5}>
                                                  {dyndata[index]
                                                    .filter(
                                                      (x3) => x3.accordionId === x2.accordionId
                                                    )
                                                    .map((item1) => (
                                                      <RenderControlMapperV2
                                                        item={{
                                                          ...item1,
                                                          disabled:
                                                            endorsement === true
                                                              ? true
                                                              : item1.disabled,
                                                        }}
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
                                              </MDBox>
                                            </AccordionDetails>
                                          </Accordion>
                                        ) : (
                                          <Grid container display="flex" spacing={1.5}>
                                            {dyndata[index]
                                              .filter((x3) => x3.accordionId === x2.accordionId)
                                              .map((item1) => (
                                                <RenderControlMapperV2
                                                  item={{
                                                    ...item1,
                                                    disabled:
                                                      endorsement === true ? true : item1.disabled,
                                                  }}
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
                                        )}
                                      </MDBox>
                                    )}
                                  </MDBox>
                                ))
                              : !x1.accordionId && (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={x1.spacing ? x1.spacing : spacing}
                                    lg={x1.spacing ? x1.spacing : spacing}
                                    xl={x1.spacing ? x1.spacing : spacing}
                                    xxl={x1.spacing ? x1.spacing : spacing}
                                  >
                                    <RenderControl
                                      item={{
                                        ...x1,
                                        disabled: endorsement === true ? true : x1.disabled,
                                      }}
                                      key={`${activeStep}-${index}-${index1}`}
                                      index={index1}
                                      dto={{ ...dto }}
                                      setDto={setDto}
                                      nextFlag={nextFlag}
                                      nextCount={nextCount}
                                      onMidNextValidation={onMidNextValidation}
                                      midNextValidationId={midNextValidationId}
                                    />
                                  </Grid>
                                )
                            : x1.visible === "visibleDetails" &&
                              x1.visibleDetails &&
                              objectPath.get(dto, x1.visibleDetails.path) ===
                                x1.visibleDetails.value && (
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={x1.spacing ? x1.spacing : spacing}
                                  lg={x1.spacing ? x1.spacing : spacing}
                                  xl={x1.spacing ? x1.spacing : spacing}
                                  xxl={x1.spacing ? x1.spacing : spacing}
                                >
                                  <RenderControl
                                    key={`${activeStep}-${index}-${index1}`}
                                    item={{
                                      ...x1,
                                      disabled: endorsement === true ? true : x1.disabled,
                                    }}
                                    index={index1}
                                    dto={{ ...dto }}
                                    setDto={setDto}
                                    // genericPolicyDto={genericPolicyDto}
                                    nextFlag={nextFlag}
                                    nextCount={nextCount}
                                    onMidNextValidation={onMidNextValidation}
                                    midNextValidationId={midNextValidationId}
                                  />
                                </Grid>
                              )
                        )}
                      </Grid>
                      {/* eslint-enable no-nested-ternary */}
                    </Grid>
                  ))}
                </Grid>
              ) : (
                item.hide !== true && (
                  <RenderControl
                    key={`${activeStep}-${index}-${index1}`}
                    item={{ ...item, disabled: endorsement === true ? true : item.disabled }}
                    index={index1}
                    dto={{ ...dto }}
                    setDto={setDto}
                    nextFlag={nextFlag}
                    nextCount={nextCount}
                    onMidNextValidation={onMidNextValidation}
                    midNextValidationId={midNextValidationId}
                  />
                )
              )}
            </Grid>
          ) : (
            item.hide !== true &&
            item.visible === "visibleDetails" &&
            !item.splitId &&
            !item.accordionId &&
            item.visibleDetails &&
            objectPath.get(dto, item.visibleDetails.path) === item.visibleDetails.value && (
              <Grid
                item
                xs={12}
                sm={12}
                md={item.spacing ? item.spacing : spacing}
                lg={item.spacing}
                xl={item.spacing}
                xxl={item.spacing}
              >
                <RenderControl
                  key={`${activeStep}-${index}-${index1}`}
                  item={{ ...item, disabled: endorsement === true ? true : item.disabled }}
                  index={index1}
                  dto={{ ...dto }}
                  setDto={setDto}
                  // genericPolicyDto={genericPolicyDto}
                  nextFlag={nextFlag}
                  nextCount={nextCount}
                  onMidNextValidation={onMidNextValidation}
                  midNextValidationId={midNextValidationId}
                />
              </Grid>
            )
          )
        )}
    </Grid>
  );
  /* eslint-enable react/no-array-index-key */
}
function GetStepContent({
  activeStep1,
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
  const mobileView = useMediaQuery("(min-width:500px)");
  return (
    <MDBox sx={{ width: "100%" }}>
      {accordionList.map(
        (item, idx) =>
          item.visible === true && (
            <MDBox>
              {item.name === "" ? (
                <StepDetails
                  index={idx}
                  activeStep={activeStep}
                  dyndata={dyndata}
                  nextFlag={nextFlag}
                  nextCount={nextCount}
                  dto={{ ...dto }}
                  setDto={setDto}
                  masters={masters}
                  setMasters={setMasters}
                  endorsement={item.endorsement ? item.endorsement : false}
                  onMidNextValidation={onMidNextValidation}
                  midNextValidationId={midNextValidationId}
                />
              ) : (
                <Accordion
                  defaultExpanded={idx < 2 || item.defaultExpanded}
                  disableGutters
                  sx={{
                    boxShadow: "unset",
                    border: "unset",
                    "&:before": { display: "none" },
                    pt: "0.5rem",
                    pb: "0.5rem",
                    bgcolor: cardColor,
                  }}
                  // expanded={
                  //   item.name === "" || accordionList.length === 1 ? true : AccExpanded === item.name
                  // }
                  // onChange={() => handleChange(item.name)}
                >
                  <AccordionSummary
                    expandIcon={
                      (item.name === "" || accordionList.length !== 1) && (
                        <ExpandMoreIcon color="white" />
                      )
                    }
                    sx={{
                      background: ColorsSetting().primary.main,
                      mb: "0.5rem",
                      borderRadius: "0.7rem",
                    }}
                  >
                    <MDTypography sx={{ fontSize: "1.25rem", fontWeight: 600 }} color="white">
                      {item.name}
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails expandIcon={<ExpandMoreIcon color="white" />}>
                    <MDBox
                      sx={{
                        bgcolor: cardColor,
                        m: -2,
                        p: mobileView ? 3 : 0,
                        borderRadius: "0.7rem",
                      }}
                    >
                      <StepDetails
                        index={idx}
                        activeStep={activeStep}
                        dyndata={dyndata}
                        nextFlag={nextFlag}
                        nextCount={nextCount}
                        dto={{ ...dto }}
                        setDto={setDto}
                        masters={masters}
                        setMasters={setMasters}
                        endorsement={item.endorsement ? item.endorsement : false}
                        onMidNextValidation={onMidNextValidation}
                        midNextValidationId={midNextValidationId}
                      />
                    </MDBox>
                  </AccordionDetails>
                </Accordion>
              )}
            </MDBox>
          )
      )}
    </MDBox>
  );
}

function HorizontalLinearStepper({
  dto,
  setDto,
  masters,
  setMasters,
  setDrawerOpen,
  data,
  setLoading,
  styles,
  otherData,
  setOtherData,
}) {
  const {
    getProcessSteps,
    getPageContent,
    getSectionContent,
    getOnNextClick,
    getButtonDetails,
    selectedId,
    setPage,
    quotationList,
    setQuotationList,
    selectedList,
    selectedProducts,
    customerView,
    hideButtons,
    nomineeDetails,
    setNomineeDetails,
    flowId,
    QuestionVisitFlag,
    setQuestionVisitFlag,
    channelDetails,
  } = data;
  const [activeStep, setActiveStep] = useState(0);
  const btnDetails = getButtonDetails({ activeStep, dto, setDto, masters, setMasters, flowId });

  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(0);
  const navigate = useNavigate();

  const [midNextValidationId, setMidNextValidationId] = useState(-1);

  const [backDropFlag, setBackDropFlag] = useState(false);

  const [valSwitch, setValSwitch] = useState(true);

  const steps = getProcessSteps({ dto, setDto, masters, setMasters, flowId });

  const accordionList = getPageContent({
    activeStep,
    dto,
    setDto,
    masters,
    setMasters,
    customerView,
    hideButtons,
    flowId,
  });

  const matches = useMediaQuery("(min-width:600px)");

  const dyndata = getSectionContent({
    activeStep,
    dto,
    setDto,
    masters,
    setMasters,
    setLoading,
    styles,
    otherData,
    setOtherData,
    selectedId,
    setPage,
    selectedProducts,
    quotationList,
    setQuotationList,
    selectedList,
    customerView,
    hideButtons,
    nomineeDetails,
    setNomineeDetails,
    flowId,
    navigate,
    setActiveStep,
    QuestionVisitFlag,
    setQuestionVisitFlag,
    setNextCount,
    setNextFlag,
  }); // components

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
        if (checkOnBlurValidation(x2, get(dto, x2.path)) === false) validationFlag = false;
        if (
          (x2.multiple && x2.multiple === true && val === undefined) ||
          (x2.multiple && x2.multiple === true && Array.isArray(val) && val.length === 0)
        )
          // !Array.isArray(val)
          validationFlag = false;
      }

      if (
        x2.required === "requiredDetails" &&
        x2.requiredDetails &&
        get(dto, x2.requiredDetails.path) === x2.requiredDetails.value
      ) {
        const val = get(dto, x2.path);
        if (val === "" || val === undefined || x2.errorFlag === true) validationFlag = false;
        if (checkOnBlurValidation(x2, get(dto, x2.path)) === false) validationFlag = false;

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
      try {
        setBackDropFlag(true);

        setNextFlag(true);
        setNextCount(nextCount + 1);
        setMidNextValidationId(-1);

        let nestedAccordions = [];

        let validationFlag = true;
        accordionList.forEach((x1, i1) => {
          if (x1.visible === true && x1.mandatoryValidationOff !== true) {
            dyndata[i1].forEach((x2) => {
              if (x2.type === "Mapper1") {
                get(dto, x2.path).forEach((x3, i3) => {
                  x2.mapperComponents.forEach((x4) => {
                    if (onNextMapper({ ...x4, path: `${x2.path}.${i3}.${x4?.path}` }) === false) {
                      validationFlag = false;

                      if (isFunction(x2.setQTab)) {
                        x2.setQTab(x2.QTab);
                      }
                    }
                  });
                });
              } else if (!x2.accordionId && onNextMapper(x2) === false) {
                validationFlag = false;
                if (isFunction(x2.setQTab)) {
                  x2.setQTab(x2.QTab);
                }
              }
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
                        if (
                          onNextMapper({ ...x4, path: `${x2.path}.${i3}.${x4?.path}` }) === false
                        ) {
                          validationFlag = false;
                          if (x2.setQTab) x2.setQTab(x2.QTab);
                        }
                      });
                    });
                  } else if (onNextMapper(x2) === false) {
                    console.log("QTab", x2.QTab);

                    if (isFunction(x2.setQTab)) {
                      x2.setQTab(x2.QTab);
                    }

                    validationFlag = false;
                  }
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
            activeStep,
            setBackDropFlag,
            dto,
            setDto,
            masters,
            setMasters,
            otherData,
            setOtherData,
            setLoading,
            navigate,
            setPage,
            flowId,
            dyndata,
            QuestionVisitFlag,
            setQuestionVisitFlag,
            channelDetails,
          });
          if (onClickFun) {
            setNextFlag(false);
            setActiveStep(activeStep + 1);
          }
        } else
          Swal.fire({ icon: "error", text: "Please check and fill mandatory field properly!" });
        setBackDropFlag(false);
      } catch (e) {
        console.log("on next exception", e);
      }
    } else {
      setNextFlag(false);
      setActiveStep(activeStep + 1);
    }
  };

  const onNextForCustom = async () => {
    if (valSwitch) {
      try {
        setBackDropFlag(true);

        setNextFlag(true);
        setNextCount(nextCount + 1);
        setMidNextValidationId(-1);

        let nestedAccordions = [];

        let validationFlag = true;
        accordionList.forEach((x1, i1) => {
          if (x1.visible === true && x1.mandatoryValidationOff !== true) {
            dyndata[i1].forEach((x2) => {
              if (x2.type === "Mapper1") {
                get(dto, x2.path).forEach((x3, i3) => {
                  x2.mapperComponents.forEach((x4) => {
                    if (onNextMapper({ ...x4, path: `${x2.path}.${i3}.${x4?.path}` }) === false) {
                      validationFlag = false;

                      if (isFunction(x2.setQTab)) {
                        x2.setQTab(x2.QTab);
                      }
                    }
                  });
                });
              } else if (!x2.accordionId && onNextMapper(x2) === false) {
                validationFlag = false;
                if (isFunction(x2.setQTab)) {
                  x2.setQTab(x2.QTab);
                }
              }
              if (x2.type === "Accordions")
                nestedAccordions = [...nestedAccordions, ...x2.accordionList];
            });
          }
        });

        return validationFlag;
        // item.visible === "visibleDetails" &&
        // item.visibleDetails &&
        // objectPath.get(dto, item.visibleDetails.path) === item.visibleDetails.value
      } catch (e) {
        console.log("on next exception", e);
      }
    } else {
      setNextFlag(false);
      setActiveStep(activeStep + 1);
    }
    return true;
  };

  const [RiskValidationFlag, setRiskValidationFlag] = useState(0);

  const customOnNext2 = async () => {
    setNextFlag(true);
    setNextCount(nextCount + 1);
    setMidNextValidationId(-1);
    console.log("onNextForCustom2", masters.tab, dyndata[1][0]);
    if (masters.tab < dto.RiskItems.length) {
      const onNextFlg1 = await onNextForCustom();
      if (onNextFlg1) {
        if (masters.tab >= dto.RiskItems.length - 1) {
          const onClickFun = await getOnNextClick({
            activeStep,
            setBackDropFlag,
            dto,
            setDto,
            masters,
            setMasters,
            otherData,
            setOtherData,
            setLoading,
            navigate,
            setPage,
            flowId,
            dyndata,
            QuestionVisitFlag,
            setQuestionVisitFlag,
            channelDetails,
          });
          if (onClickFun) {
            setNextFlag(false);
            setActiveStep(activeStep + 1);
          }
        } else if (masters.tab < dto.RiskItems.length) {
          setRiskValidationFlag(0);
          setMasters({ ...masters, tab: masters.tab + 1 });
          const btn = document.getElementById("hiddenButton"); // .onClick();
          btn.click();
        }
      } else {
        setRiskValidationFlag(0);
        Swal.fire({ icon: "error", text: "please check and fill mandatory field properly" });
      }
    }
    setBackDropFlag(false);
  };

  console.log("onNextForCustomTest", masters.tab, RiskValidationFlag);

  const customOnNext1 = () => {
    if (masters.tab !== 0) setRiskValidationFlag(RiskValidationFlag + 1);
    customOnNext2();
  };

  useEffect(() => {
    if (activeStep === 1 && RiskValidationFlag !== 0) {
      setMasters({ ...masters, tab: 0 });
      customOnNext2();
    }
  }, [RiskValidationFlag]);

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
    setDto({ ...lDto });
    setBackDropFlag(false);
  };

  const onValSwitch = (e) => {
    setValSwitch(e.target.checked);
  };

  const onConsoleDto = () => {
    setDrawerOpen(true);
    console.log("genericPolicyDto", dto);
    console.log("steps", steps);
    console.log("accordionList", accordionList);
    console.log("Components", dyndata);
    console.log("Masters", masters);

    console.log("quotationList", quotationList);
    console.log("selectedList", selectedList);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

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
        </Stack>
      )}
      {btnDetails.next.loader === "backDrop" && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <CircularProgress />
        </Backdrop>
      )}
      {btnDetails.next.loader === "backDrop1" && <MDLoader loader={backDropFlag} />}{" "}
      {matches === true && steps.length > 1 && (
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step
                key={label}
                {...stepProps}
                sx={{ "& .MuiStepIcon-root": { width: "2rem", height: "2rem" } }}
              >
                <StepLabel
                  {...labelProps}
                  sx={{ flexDirection: "column", position: "sticky", top: "0" }}
                >
                  <MDTypography sx={{ fontSize: "1rem" }} variant="h6">
                    {label}
                  </MDTypography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
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
      <MDBox>
        {btnDetails && matches ? (
          <MDBox sx={{ display: "flex", justifyContent: "space-between" }} p={2}>
            <MDBox>
              {btnDetails.prev.visible && (
                <MDButton onClick={onPrev} variant="outlined" tabIndex={-1}>
                  {btnDetails.prev.label}
                </MDButton>
              )}
            </MDBox>

            <Stack direction="row" spacing={2}>
              {btnDetails.reset.visible && (
                <MDButton variant="outlined" onClick={onReset}>
                  {btnDetails.reset.label}
                </MDButton>
              )}
              {btnDetails.next.visible && (
                <MDButton
                  variant="contained"
                  color="secondary"
                  onClick={btnDetails?.next?.customOnNext === true ? customOnNext1 : onNext}
                  startIcon={<ArrowForward />}
                  sx={{ color: "#000000" }}
                >
                  {btnDetails.next.label}
                </MDButton>
              )}
              <input hidden id="hiddenButton" type="button" onClick={customOnNext2} />
            </Stack>
          </MDBox>
        ) : (
          steps.length > 1 && (
            <MobileStepper
              variant="text"
              steps={steps.length}
              position="static"
              activeStep={activeStep}
              nextButton={
                btnDetails.next.visible && (
                  <MDButton
                    variant="contained"
                    color="secondary"
                    onClick={btnDetails?.next?.customOnNext === true ? customOnNext1 : onNext}
                    startIcon={<ArrowForward />}
                    sx={{ color: "#000000" }}
                    size="small"
                  >
                    Next
                    <KeyboardArrowRight />
                  </MDButton>
                )
              }
              backButton={
                btnDetails.prev.visible && (
                  <MDButton size="small" onClick={onPrev} tabIndex={-1}>
                    <KeyboardArrowLeft />
                    Back
                  </MDButton>
                )
              }
            />
          )
        )}
      </MDBox>{" "}
    </MDBox>
  );
}

function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // init mutable ref container for callbacks

  const setStateCallback = useCallback((newState, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(newState);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `null` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

function LifeStepper({ data, styles, setLoading, heading }) {
  const {
    getPolicyDto,
    getMasterData,
    selectedId,
    selectedLeadId,
    selectedList,
    selectedProposalNo,
    selectedProducts,
  } = data;
  const [dto, setDto] = useStateCallback("");
  const [otherData, setOtherData] = useState({}); // For some data that needs to be maintained on a context level
  const [masters, setMasters] = useState("");
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  // const [slideFlag, setSlideFlag] = useState(false);
  const { headingStyle } = styles;
  // useEffect(() => {
  //   setSlideFlag(true);
  // }, []);
  const onDrawerClose = () => setDrawerOpen(false);
  useEffect(() => {
    const lDto = getPolicyDto(selectedList);
    setDto({ ...lDto });
  }, []);
  useEffect(async () => {
    const lMst = await getMasterData({
      setDto,
      setLoading,
      selectedId,
      setOtherData,
      selectedLeadId,
      selectedProposalNo,
      selectedProducts,
      navigate,
    });
    setMasters({ ...lMst });
  }, []);

  return (
    <MDBox sx={{ height: "100%", bgcolor: cardColor }}>
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
          collapsed={1}
        />
      </Drawer>
      {/* <Grow
        in={slideFlag}
        style={{ transformOrigin: "0 0 0" }}
        {...(slideFlag ? { timeout: 3000 } : {})}
      > */}
      <Stack spacing={2} p={2}>
        <MDTypography sx={headingStyle}>{heading}</MDTypography>
        {dto !== "" && masters !== "" && (
          <HorizontalLinearStepper
            dto={{ ...dto }}
            setDto={setDto}
            masters={masters}
            setMasters={setMasters}
            setDrawerOpen={setDrawerOpen}
            data={data}
            setLoading={setLoading}
            styles={styles}
            otherData={otherData}
            setOtherData={setOtherData}
          />
        )}
      </Stack>
      {/* </Grow> */}
    </MDBox>
  );
}
export default LifeStepper;
