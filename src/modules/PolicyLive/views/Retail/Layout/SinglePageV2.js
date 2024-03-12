import { useEffect, useState } from "react";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
import {
  Card,
  // Accordion,
  // AccordionDetails,
  // AccordionSummary,
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
import { useNavigate } from "react-router-dom";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import objectPath from "object-path";
import swal from "sweetalert";
import {
  // getProcessSteps,
  // getPageContent,
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
import RenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import { get, set } from "../../../../../Common/RenderControl/objectPath";

function Components({
  // prod,
  // activeStep,
  nextFlag,
  nextCount,
  dto,
  setDto,
  // masters,
  // setMasters,
  dyndata,
}) {
  const spacing = 3;

  return (
    <Grid container display="flex" spacing={1.5}>
      {dyndata?.length > 0 &&
        dyndata.map((item, index1) =>
          item.visible === true ? (
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
                item={item}
                index={index1}
                dto={{ ...dto }}
                setDto={setDto}
                // genericPolicyDto={genericPolicyDto}
                nextFlag={nextFlag}
                nextCount={nextCount}
              />
            </Grid>
          ) : (
            item.visible === "visibleDetails" && (
              <Grid
                item
                xs={12}
                sm={12}
                md={item.spacing ? item.spacing : spacing}
                lg={item.spacing}
                xl={item.spacing}
                xxl={item.spacing}
              >
                {item.visibleDetails &&
                  objectPath.get(dto, item.visibleDetails.path) === item.visibleDetails.value && (
                    <RenderControl
                      item={item}
                      index={index1}
                      dto={{ ...dto }}
                      setDto={setDto}
                      // genericPolicyDto={genericPolicyDto}
                      nextFlag={nextFlag}
                      nextCount={nextCount}
                    />
                  )}
              </Grid>
            )
          )
        )}
    </Grid>
  );
}

function SinglePageLayout({ prod, dto, setDto, masters, setMasters, setDrawerOpen }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const btnDetails = getButtonDetails({ prod, activeStep, dto, setDto, masters, setMasters });

  // const [skFlg, setSkFlg] = useState(false);
  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(0);

  const [backDropFlag, setBackDropFlag] = useState(false);

  const [valSwitch, setValSwitch] = useState(true);

  const dyndata = getSectionContent({ prod, activeStep, dto, setDto, masters, setMasters }); // components

  const [control, dispatch] = useDataController();
  const { genericInfo } = control;

  const onNext = async () => {
    if (valSwitch) {
      setBackDropFlag(true);
      // setSkFlg(true);

      setNextFlag(true);
      setNextCount(nextCount + 1);

      let validationFlag = true;
      dyndata.forEach((x1) => {
        if (x1.visible === true && x1.required === true) {
          const val = get(dto, x1.path);
          if (val === "" || val === undefined) validationFlag = false;
        }
      });

      if (validationFlag === true) {
        const onClickFun = await getOnNextClick({
          prod,
          activeStep,
          setBackDropFlag,
          dto,
          setDto,
          masters,
          setMasters,
        });
        if (onClickFun) {
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
    dyndata.forEach((x1) => {
      if (!x1.disableOnReset && x1.disableOnReset !== true) {
        console.log("aaaaawwwww", x1);
        if (x1.path) {
          if (x1.multiple && x1.multiple === true) lDto = set(lDto, x1.path, []);
          else lDto = set(lDto, x1.path, "");
        }
      }
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
    console.log("Components", dyndata);
    console.log("Masters", masters);
  };
  useEffect(() => {
    if (genericInfo.activeStep && genericInfo.activeStep !== 0)
      setActiveStep(genericInfo.activeStep);
  }, [activeStep]);

  const onAllRetail = () => {
    if (localStorage.getItem("DemoProduct") !== "") {
      navigate("/AllRetailDemoLandingPage");
    } else {
      navigate("/AllRetailLandingPage");
    }
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
      {btnDetails.next.loader === "backDrop" && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <CircularProgress />
        </Backdrop>
      )}

      <div>
        <Components
          activeStep1={activeStep}
          prod={prod}
          dyndata={dyndata}
          nextFlag={nextFlag}
          nextCount={nextCount}
          dto={{ ...dto }}
          setDto={setDto}
          masters={masters}
          setMasters={setMasters}
        />

        {btnDetails && (
          <MDBox sx={{ display: "flex", justifyContent: "space-between" }} p={2}>
            <MDBox>
              {btnDetails.prev.visible && (
                <MDButton onClick={onPrev} variant="outlined">
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
                <MDButton variant="outlined" onClick={onNext}>
                  {backDropFlag && btnDetails.next.loader === "button" && (
                    <CircularProgress size="20px" />
                  )}
                  {btnDetails.next.label}
                </MDButton>
              )}
            </Stack>
          </MDBox>
        )}
      </div>
    </MDBox>
  );
}

function SinglePageV2() {
  const [control] = useDataController();
  const { genericInfo } = control;
  const [dto, setDto] = useState("");
  const [masters, setMasters] = useState("");
  const [prod, setProd] = useState("");
  const [prodLabel, setProdLabel] = useState("");
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [slideFlag, setSlideFlag] = useState(false);
  useEffect(() => {
    setSlideFlag(true);
  }, []);
  const onDrawerClose = () => setDrawerOpen(false);
  useEffect(() => {
    if (prod !== "") {
      const lDto = getPolicyDto({ prod: genericInfo.prod });
      setDto({ ...lDto });
    }
  }, [prod]);
  useEffect(() => {
    if (genericInfo.prod) {
      setProd(genericInfo.prod);
      setProdLabel(genericInfo.prodLabel);
    }
  }, [genericInfo]);
  useEffect(async () => {
    if (prod !== "") {
      const lMst = await getMasterData({ prod: genericInfo.prod });
      setMasters({ ...lMst });
    }
  }, [prod]);

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
        <ReactJson src={dto} />
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
              <SinglePageLayout
                prod={prod}
                dto={{ ...dto }}
                setDto={setDto}
                masters={masters}
                setMasters={setMasters}
              />
            )}
          </Stack>
        </Card>
      </Grow>
    </MDBox>
  );
}
export default SinglePageV2;
