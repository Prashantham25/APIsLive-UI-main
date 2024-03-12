import { useEffect, useState } from "react";
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
  // MobileStepper,
  Tooltip,
  // Paper,
  // Grow,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import ReactJson from "react-json-view";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import objectPath from "object-path";
import Swal from "sweetalert2";
// import SkeltonLoader from "BaseSetup/views/RND/SkeltonLoader";
import RenderControl from "Common/RenderControl/NewRenderControl";
import { get, set } from "Common/RenderControl/objectPath";
import MDLoader from "components/MDLoader";
import RenderControlMapperV2 from "Common/RenderControl/RenderControlMapperV2";

const tooltipDesc = {
  "Policy Term": {
    title: "What is Policy Term?",
    text: `The "policy term" refers to the duration for which an insurance policy provides coverage. It specifies how long the coverage last.`,
  },
  "Premium Paying Term": {
    title: "What is Premium Paying Term?",
    text: `The "premium paying term" refers to the duration for which an individual needs to pay premiums for an insurance policy.`,
  },
  "Policy Type": {
    title: "What is Policy Type?",
    text: "Term insurance provides coverage for a specified number of years, known as the policy term. In case of an unfortunate event during this period, your nominee will receive the sum assured in your policy.",
  },
  "Preferred Mode": {
    title: "What is Preferred Mode?",
    text: `It allows individuals to select their preferred frequency and method of paying premiums for their insurance policies.`,
  },
  "Under NACH?": {
    title: "What is NACH",
    text: `Policyholders can authorize their insurance company to directly debit the premium amount from their bank account on specific due dates using the NACH system.`,
  },
  "Accident Benefit Required?": {
    title: "What are these Riders?",
    text: `Riders are additional provisions or attachments that policyholders can include with their primary insurance policy to customize or enhance the coverage based on their specific needs. These riders provide supplementary benefits beyond the standard coverage offered by the primary insurance policy.`,
  },
  "ADDB REQUIRED Sum Assured": {
    title: "What is ADDB REQUIRED Sum Assured?",
    text: `ADDB SA provides for financial compensation in case of unfortunate event of an accident leading to permanent disability or death of the insured`,
  },
  "AB REQUIRED Sum Assured": {
    title: "What is REQUIRED Sum Assured?",
    text: `AB provides for financial compensation in case of unfortunate event of an accident leading to death of the insured.`,
  },
  "Critical Illness Benefit Required?": {
    title: "What is Critical illness?",
    text: `CI Provides a lump sum payout if the insured is diagnosed with a critical illness listed in the policy, such as cancer, heart attack, or stroke.`,
  },
  "Critical Illness Sum Assured": {
    title: "What is Critical Illness Sum Assured?",
    text: `CI Provides a lump sum payout if the insured is diagnosed with a critical illness listed in the policy, such as cancer, heart attack, or stroke.`,
  },
  "Term Rider Benefit Required?": {
    title: "What is Term Riders?",
    text: `These provide additional coverage for a specific term, often tied to the primary policy's duration.`,
  },

  "Term Rider Sum Assured": {
    title: "What is Term Rider Sum Assured?",
    text: `These provide additional coverage for a specific term, often tied to the primary policy's duration.`,
  },
  "Premium Waiver Benefit Required?": {
    title: "What is Premium Waiver Benefit?",
    text: `Waives future premium payments if the insured becomes disabled, ensuring the policy remains active.`,
  },
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
  const splitSpacing = 6;

  const getSpacing = (sp) => {
    let spacing = 4;
    if (sp) {
      if (sp === 3 || sp === "3") spacing = 6;
      else spacing = sp;
    }

    return spacing;
  };

  const getItemsById = (splitId) => dyndata[index].filter((x) => x.splitId === splitId);

  /* eslint-disable react/no-array-index-key */
  return (
    <Grid container display="flex" spacing={1.5} rowSpacing={1.5} sx={{ height: "100%" }}>
      {dyndata?.length > 0 &&
        dyndata[index]?.map((item, index1) =>
          item.visible === true && !item.splitId && !item.accordionId ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={getSpacing(item.spacing)}
              xl={getSpacing(item.spacing)}
              xxl={getSpacing(item.spacing)}
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
                                          bgcolor: "#FFFAEB",
                                        }}
                                      >
                                        {x2.label !== "" && (
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            sx={{
                                              // background: "rgba(218, 232, 254, 1)",
                                              mb: "0.5rem",
                                            }}
                                          >
                                            <MDTypography variant="h6" color="primary">
                                              {x2.label}
                                            </MDTypography>
                                          </AccordionSummary>
                                        )}
                                        <AccordionDetails>
                                          <Grid container display="flex" spacing={1.5}>
                                            {dyndata[index]
                                              .filter((x3) => x3.accordionId === x2.accordionId)
                                              .map((item1) => (
                                                <RenderControlMapperV2
                                                  item={{
                                                    ...item1,
                                                    disabled:
                                                      endorsement === true ? true : item1.disabled,
                                                    spacing: getSpacing(item1.spacing),
                                                    helperTooltip: tooltipDesc[item1.label],
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
                                        </AccordionDetails>
                                      </Accordion>
                                    )}
                                  </MDBox>
                                ))
                              : !x1.accordionId && (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={getSpacing(x1.spacing)}
                                    lg={getSpacing(x1.spacing)}
                                    xl={getSpacing(x1.spacing)}
                                    xxl={getSpacing(x1.spacing)}
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
                                  md={getSpacing(x1.spacing)}
                                  lg={getSpacing(x1.spacing)}
                                  xl={getSpacing(x1.spacing)}
                                  xxl={getSpacing(x1.spacing)}
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
                <MDBox>
                  {" "}
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
                  {item.helperTooltip && (
                    <Tooltip
                      title={item.helperTooltip.text}
                      placement="left"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            color: "#ffffff",
                            backgroundColor: "#3949ab",
                          },
                        },
                      }}
                    >
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                          color: "#3949ab",
                          textDecoration: "underline",
                          "&:hover": { cursor: "pointer" },
                          ml: 1,
                          mt: 1,
                        }}
                      >
                        {item.helperTooltip.title}
                      </MDTypography>
                    </Tooltip>
                  )}
                </MDBox>
              )}
            </Grid>
          ) : (
            item.visible === "visibleDetails" &&
            !item.splitId &&
            !item.accordionId &&
            item.visibleDetails &&
            objectPath.get(dto, item.visibleDetails.path) === item.visibleDetails.value && (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={getSpacing(item.spacing)}
                xl={getSpacing(item.spacing)}
                xxl={getSpacing(item.spacing)}
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
  const mobileView = useMediaQuery("(min-width:500px)");

  // const [AccExpanded, setAccExpanded] = useState("");
  // accordionList.length > 0 ? accordionList[0].name : ""
  // );
  // const handleChange = (p1) => {
  //   setAccExpanded(p1);
  // };
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
                  defaultExpanded={idx < 2}
                  disableGutters
                  sx={{
                    boxShadow: "unset",
                    border: "unset",
                    "&:before": { display: "none" },
                    pt: "0.5rem",
                    pb: "0.5rem",
                  }}
                  // expanded={
                  //   item.name === "" || accordionList.length === 1 ? true : AccExpanded === item.name
                  // }
                  // onChange={() => handleChange(item.name)}
                >
                  <AccordionSummary
                    expandIcon={
                      (item.name === "" || accordionList.length !== 1) && <ExpandMoreIcon />
                    }
                    sx={{ background: "rgba(218, 232, 254, 1)", mb: "0.5rem" }}
                  >
                    <MDTypography sx={{ fontSize: "1.25rem", fontWeight: 600 }} color="primary">
                      {item.name}
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ p: mobileView ? "2rem" : "0rem" }}
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
  activeStep,
  setActiveStep,
}) {
  const {
    getProcessSteps,
    getPageContent,
    getSectionContent,
    getOnNextClick,
    getOnPreviousClick,
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
  } = data;
  // const [activeStep, setActiveStep] = useState(0);
  const LoginStatus = sessionStorage.getItem("LoginStatus");
  const btnDetails = getButtonDetails({
    activeStep,
    dto,
    setDto,
    masters,
    setMasters,
    LoginStatus,
  });

  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(0);
  const navigate = useNavigate();

  const [midNextValidationId, setMidNextValidationId] = useState(-1);

  const [backDropFlag, setBackDropFlag] = useState(false);

  const [valSwitch, setValSwitch] = useState(true);

  const steps = getProcessSteps({ dto, setDto, masters, setMasters });

  const accordionList = getPageContent({
    activeStep,
    dto,
    setDto,
    masters,
    setMasters,
    customerView,
    hideButtons,
  });

  const matches = useMediaQuery("(min-width:600px)");
  // const mobilematches = useMediaQuery("(min-width:400px)");

  const dyndata = getSectionContent({
    activeStep,
    setActiveStep,
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
            if (x2.type === "Accordion" || x2.type === "Accordions")
              nestedAccordions = [...nestedAccordions, ...x2.accordionList];
          });
        }
      });
      nestedAccordions.forEach((x5) => {
        accordionList.forEach((x1, i1) => {
          if (x1.visible === true) {
            dyndata[i1].forEach((x2) => {
              if (x2.visible === true && x5.visible === true && x5.accordionId === x2.accordionId) {
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
          activeStep,
          setActiveStep,
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
        });
        if (onClickFun === true) {
          setNextFlag(false);
          setActiveStep(activeStep + 1);
        } else if (onClickFun === "skip step") {
          setNextFlag(false);
        }
      } else Swal.fire({ icon: "error", text: "Please check and fill mandatory field properly!" });
      setBackDropFlag(false);
    } else {
      setNextFlag(false);
      setActiveStep(activeStep + 1);
    }
  };

  const onPrev = async () => {
    const onClickFun = await getOnPreviousClick({
      activeStep,
      setActiveStep,
      dto,
      navigate,
    });
    if (onClickFun === true && activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else if (onClickFun === "skip step") {
      setActiveStep(activeStep - 2);
    }
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

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDBox
        sx={{
          overflowX: "hidden",
          height: matches ? "60vh" : "auto",
          maxHeight: matches ? "60vh" : "inherit",
        }}
        pb={2}
        p={1}
      >
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
        {btnDetails.next.loader === "backDrop1" && <MDLoader loader={backDropFlag} />}

        <div>
          {false && matches === true && steps.length > 1 && (
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
        </div>
      </MDBox>{" "}
      {/* <Paper sx={{ m: "-11px", zIndex: 1000 }}> */}
      <MDBox
        sx={{
          borderRadius: matches ? "0 0 12px 12px" : 0,
          boxShadow: "0px -4px 6px #7272726b",
          bgcolor: matches ? "#FFFAEB" : "#fff",
          zIndex: 1000,
          position: matches === true ? "absolute" : "fixed",
          bottom: 0,
          width: "100%",
          left: 0,
          p: matches ? 1 : "23px 8px",
        }}
      >
        {btnDetails && (
          <MDBox sx={{ display: "flex", justifyContent: "space-between" }} pl={2} pr={2}>
            <MDBox>
              {btnDetails.prev.visible && (
                <MDButton onClick={onPrev} variant="outlined" tabIndex={-1}>
                  {btnDetails.prev.label}
                </MDButton>
              )}
            </MDBox>

            <Stack direction="row" spacing={2}>
              {false && btnDetails.reset.visible && (
                <MDButton variant="outlined" onClick={onReset}>
                  {btnDetails.reset.label}
                </MDButton>
              )}
              {btnDetails.next.visible && (
                <MDButton
                  variant="contained"
                  color="secondary"
                  onClick={onNext}
                  startIcon={<ArrowForward />}
                  sx={{ color: "#000000" }}
                >
                  {btnDetails.next.label}
                </MDButton>
              )}
            </Stack>
          </MDBox>
          // ) : (
          //   steps.length > 1 && (
          //     <MobileStepper
          //       variant="text"
          //       steps={steps.length}
          //       position="static"
          //       activeStep={activeStep}
          //       nextButton={
          //         btnDetails.next.visible && (
          //           <MDButton
          //             size="small"
          //             onClick={onNext}
          //             color="secondary"
          //             variant="contained"
          //             sx={{ color: "#000000" }}
          //           >
          //             Next
          //             <KeyboardArrowRight />
          //           </MDButton>
          //         )
          //       }
          //       backButton={
          //         <MDButton size="small" onClick={onPrev} disabled={activeStep === 0} tabIndex={-1}>
          //           <KeyboardArrowLeft />
          //           Back
          //         </MDButton>
          //       }
          //     />
          //   )
          // )}
        )}
      </MDBox>{" "}
      {/* </Paper> */}
    </MDBox>
  );
}

// function useStateCallback(initialState) {
//   const [state, setState] = useState(initialState);
//   const cbRef = useRef(null); // init mutable ref container for callbacks

//   const setStateCallback = useCallback((newState, cb) => {
//     cbRef.current = cb; // store current, passed callback in ref
//     setState(newState);
//   }, []); // keep object reference stable, exactly like `useState`

//   useEffect(() => {
//     // cb.current is `null` on initial render,
//     // so we only invoke callback on state *updates*
//     if (cbRef.current) {
//       cbRef.current(state);
//       cbRef.current = null; // reset callback after execution
//     }
//   }, [state]);

//   return [state, setStateCallback];
// }

function CustomerLifeStepper({ data, styles, setLoading, activeStep, setActiveStep, dto, setDto }) {
  const {
    getPolicyDto,
    getMasterData,
    selectedId,
    selectedLeadId,
    selectedList,
    selectedProposalNo,
    selectedProducts,
  } = data;
  // const [dto, setDto] = useStateCallback("");
  const [otherData, setOtherData] = useState({}); // For some data that needs to be maintained on a context level
  const [masters, setMasters] = useState("");
  const [DrawerOpen, setDrawerOpen] = useState(false);
  // const [slideFlag, setSlideFlag] = useState(false);
  //   const { headingStyle } = styles;
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
    });
    setMasters({ ...lMst });
  }, []);

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
          collapsed={1}
        />
      </Drawer>
      {/* <Grow
        in={slideFlag}
        style={{ transformOrigin: "0 0 0" }}
        {...(slideFlag ? { timeout: 3000 } : {})}
      > */}
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
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {/* </Grow> */}
    </MDBox>
  );
}
export default CustomerLifeStepper;
