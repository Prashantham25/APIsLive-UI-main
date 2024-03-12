import { useEffect, useState } from "react";

import {
  Grid,
  // ListItemText,
  Icon,
  IconButton,
  ListItemButton,
  List,
  ListItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactJson from "react-json-view";
import { useLocation, useNavigate } from "react-router-dom";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import ColorsSetting from "../../../../../assets/themes/BrokerPortal/ColorsSetting";
import {
  getMenus,
  getTopLevelContent,
  getAccordions,
  getControls,
  getPolicyDto,
  getMasters,
} from "./data";
import RenderControlMapperV2 from "../../../../../Common/RenderControl/RenderControlMapperV2";
import { get } from "../../../../../Common/RenderControl/objectPath";
import { useDataController } from "../../../../BrokerPortal/context";

const checkForValue = (value) => value === "" || value === undefined || value === null;

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

function RenderControls({
  // index,
  // menuIndex,
  accordionIndex,
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
        dyndata[accordionIndex]?.map((item) => (
          <TypeFilter
            item={item}
            nextFlag={nextFlag}
            nextCount={nextCount}
            dto={dto}
            setDto={setDto}
            dyndata={dyndata[accordionIndex]}
            onMidNextValidation={onMidNextValidation}
            midNextValidationId={midNextValidationId}
          />
        ))}
    </Grid>
  );
}

function LayoutStructure({
  prod,
  dto,
  setDto,
  masters,
  setMasters,
  genericInfo,
  setLoader,
  navigate,
}) {
  const [menuIndex, setMenuIndex] = useState(0);
  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(0);
  const [midNextValidationId, setMidNextValidationId] = useState(-1);

  const MenusList = Array.isArray(getMenus({ prod, dto, setDto, masters, setMasters }))
    ? getMenus({ prod, dto, setDto, masters, setMasters, genericInfo, setLoader, navigate })
    : [];
  const TopContent = Array.isArray(getTopLevelContent({ prod, dto, setDto, masters, setMasters }))
    ? getTopLevelContent({
        prod,
        dto,
        setDto,
        masters,
        setMasters,
        genericInfo,
        setLoader,
        navigate,
      })
    : [];

  const accordionList = Array.isArray(
    getAccordions({ prod, menuIndex, dto, setDto, masters, setMasters })
  )
    ? getAccordions({
        prod,
        menuIndex,
        dto,
        setDto,
        masters,
        setMasters,
        genericInfo,
        setLoader,
        navigate,
      })
    : [];

  const dyndata = Array.isArray(getControls({ prod, menuIndex, dto, setDto, masters, setMasters }))
    ? getControls({
        prod,
        menuIndex,
        dto,
        setDto,
        masters,
        setMasters,
        genericInfo,
        setLoader,
        navigate,
      })
    : [];

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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#eeeeee",
            borderRadius: "0.3rem",
          }}
          p={1}
        >
          <Grid container spacing={2}>
            {TopContent.map(
              (x) =>
                x.visible === true && (
                  <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
                    <MDBox display="flex">
                      <MDTypography sx={{ fontSize: "1rem", fontWeight: 400, color: "#616161" }}>
                        {`${x.label} : `}
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", fontWeight: 600, color: "#616161" }}>
                        {x.value ? x.value : get(dto, x.path)}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                )
            )}
          </Grid>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
        <List>
          {MenusList.map(
            (item, index) =>
              item.visible === true && (
                <ListItem
                  key={item.name}
                  disablePadding
                  sx={{
                    bgcolor: menuIndex === index ? ColorsSetting().coloredShadows.info : "#eeeeee",
                  }}
                >
                  <ListItemButton onClick={() => setMenuIndex(index)}>
                    {!checkForValue(item.icon) && (
                      <IconButton>
                        <Icon>{item.icon}</Icon>
                      </IconButton>
                    )}
                    {/* <ListItemText primary={item.label} /> */}

                    <MDTypography sx={{ fontSize: "1rem", fontWeight: 400, color: "#616161" }}>
                      {item.label}
                    </MDTypography>
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
      </Grid>
      <Grid item xs={12} sm={12} md={9.5} lg={9.5} xl={9.5} xxl={9.5}>
        {accordionList.map(
          (item, idx) =>
            item.visible === true && (
              <MDBox>
                {item.label !== "" ? (
                  <Accordion
                    defaultExpanded={idx === 0 || item.defaultExpanded === true}
                    disableGutters
                    sx={{
                      boxShadow: "unset",
                      border: "unset",
                      "&:before": { display: "none" },
                      pt: "0.5rem",
                      pb: "0.5rem",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        (item.label === "" || accordionList.length !== 1) && <ExpandMoreIcon />
                      }
                      sx={{
                        background: `${ColorsSetting().primary.main}60`,
                        mb: "0.4rem",
                        borderRadius: "0.3rem",
                      }}
                    >
                      <MDTypography sx={{ fontSize: "1rem", fontWeight: 500, color: "#616161" }}>
                        {item.label}
                      </MDTypography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }} expandIcon={<ExpandMoreIcon />}>
                      <MDBox
                        p={1}
                        sx={{
                          borderRadius: "0.3rem",
                          bgcolor: `${ColorsSetting().primary.main}20`,
                        }}
                      >
                        <RenderControls
                          menuIndex={menuIndex}
                          accordionIndex={idx}
                          dyndata={dyndata}
                          dto={dto}
                          setDto={setDto}
                          masters={masters}
                          setMasters={setMasters}
                          nextFlag={nextFlag}
                          nextCount={nextCount}
                          midNextValidationId={midNextValidationId}
                          onMidNextValidation={onMidNextValidation}
                        />{" "}
                      </MDBox>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <RenderControls
                    menuIndex={menuIndex}
                    accordionIndex={idx}
                    dyndata={dyndata}
                    dto={dto}
                    setDto={setDto}
                    masters={masters}
                    setMasters={setMasters}
                    nextFlag={nextFlag}
                    nextCount={nextCount}
                    midNextValidationId={midNextValidationId}
                    onMidNextValidation={onMidNextValidation}
                  />
                )}
              </MDBox>
            )
        )}{" "}
      </Grid>
    </Grid>
  );
}

export default function ProcessingV2() {
  const [control] = useDataController();
  const { genericInfo } = control;
  const [prod, setProd] = useState("");
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [dto, setDto] = useState("");
  const [masters, setMasters] = useState({});
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const prodName = sessionStorage.getItem("ClaimProductV2");
    if (!checkForValue(prodName)) setProd(prodName);
  }, []);

  useEffect(() => {
    if (genericInfo.prod) setProd(genericInfo.prod);
  }, [genericInfo]);

  useEffect(async () => {
    if (prod !== "" && prod !== null && prod !== undefined) {
      const json = await getPolicyDto({ prod, genericInfo, location, setLoader, navigate });
      setDto(json);
      const mas = await getMasters({
        dto: json,
        prod,
        genericInfo,
        location,
        setDto,
        setLoader,
        navigate,
      });
      console.log("mas", mas);
      setMasters({ ...mas });
      sessionStorage.setItem("ClaimProductV2", prod);
    }
  }, [prod]);

  return (
    <MDBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
        <CircularProgress />
      </Backdrop>
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
        onClose={() => setDrawerOpen(false)}
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
      {process.env.NODE_ENV === "development" && (
        <Stack direction="row" spacing={2}>
          <MDButton variant="text" onClick={() => setDrawerOpen(true)}>
            Console PolicyDto
          </MDButton>
        </Stack>
      )}
      {dto !== "" && (
        <LayoutStructure
          prod={prod}
          dto={dto}
          setDto={setDto}
          masters={masters}
          setMasters={setMasters}
          genericInfo={genericInfo}
          setLoader={setLoader}
          navigate={navigate}
        />
      )}
    </MDBox>
  );
}
