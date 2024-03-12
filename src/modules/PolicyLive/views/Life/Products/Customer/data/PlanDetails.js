import { useState } from "react";
import {
  Stack,
  Grid,
  Icon,
  useMediaQuery,
  Drawer,
  IconButton,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import parse from "html-react-parser";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import NewRenderControl from "Common/RenderControl/NewRenderControl";

const styles = {
  headerstyle: { color: "#1d4e9e", fontWeight: 600, whiteSpace: "normal" },
  optionstyle: { fontSize: "1rem", whiteSpace: "normal" },
  liststyle: { bgcolor: "#DAF3F0", p: 1, borderRadius: "0.25rem" },
  htmlstyle: { whiteSpace: "normal" },
};

function RenderControl({ item }) {
  switch (item.type) {
    case "header":
      return (
        <MDTypography sx={{ ...(styles[item.sx] ? styles[item.sx] : {}), ...item.sx }}>
          {item.text}
        </MDTypography>
      );
    case "html":
      return (
        <MDBox sx={{ ...(styles[item.sx] ? styles[item.sx] : { whiteSpace: "normal" }) }}>
          {parse(item.text)}
        </MDBox>
      );
    case "list":
      return (
        <MDBox>
          <Stack spacing={1}>
            {item.list.map((x) => (
              <MDBox
                display="flex"
                alignItems="flex-start"
                sx={{ ...(styles[x.listSX] ? styles[x.listSX] : ""), whiteSpace: "normal" }}
              >
                {x.icon && (
                  <Icon fontSize="medium" sx={{ color: "#1d4e9e" }}>
                    {x.icon ? x.icon : ""}
                  </Icon>
                )}
                {x.htmltext ? (
                  <MDTypography sx={{ ...(styles[x.sx] ? styles[x.sx] : {}) }}>
                    {x.text1} {parse(x.htmltext)} {x.text2}
                  </MDTypography>
                ) : (
                  <MDTypography
                    sx={{
                      ...(styles[x.sx] ? styles[x.sx] : {}),
                      fontSize: "1rem",
                      whiteSpace: "normal",
                    }}
                  >
                    {x.text}
                  </MDTypography>
                )}
              </MDBox>
            ))}{" "}
          </Stack>
        </MDBox>
      );
    case "type":
      return (
        <MDBox>
          {item.list.map((x) => (
            <RenderControl item={x} />
          ))}
        </MDBox>
      );
    case "Accordion":
      return (
        <Accordion
          defaultExpanded
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
            expandIcon={<ExpandMoreIcon />}
            sx={{
              ...(item.summarySX
                ? item.summarySX
                : {
                    background: "rgba(218, 232, 254, 1)",
                    mb: "0.5rem",
                  }),
            }}
          >
            <MDTypography sx={{ color: "#1d4e9e", fontSize: "1rem", fontWeight: 600 }}>
              {item.summary}
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails sx={{ ...(item.detailSX ? item.detailSX : { bgcolor: "#FFFAEB" }) }}>
            {Array.isArray(item.details) &&
              item.details.map((x) => (
                <MDBox>
                  <RenderControl item={x} />
                </MDBox>
              ))}
          </AccordionDetails>
        </Accordion>
      );
    case "texthtml":
      return (
        <Stack direction="row" spacing={0.5}>
          <MDTypography sx={{ ...(styles[item.textSX] ? styles[item.textSX] : {}) }}>
            {item.text}
          </MDTypography>
          <MDTypography sx={{ ...(styles[item.htmlSX] ? styles[item.htmlSX] : {}) }}>
            {parse(item.html)}
          </MDTypography>
        </Stack>
      );
    default:
      return <MDBox />;
  }
}

function MenuWithTabs({ tab, setTab, alltabs }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index) => {
    setTab(index);
    handleMenuClose();
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={1} bgcolor="#1d4e9e">
        <Icon onClick={handleMenuOpen} fontSize="large" sx={{ color: "#fff" }}>
          menu
        </Icon>
        <MDTypography sx={{ color: "#fff", fontSize: "1rem", fontWeight: 600 }}>
          {alltabs[Object.keys(alltabs)[tab]]}
        </MDTypography>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ zIndex: 10004 }}
      >
        {alltabs.map((x, i) => (
          <MenuItem onClick={() => handleMenuItemClick(i)}>
            {" "}
            {alltabs[Object.keys(alltabs)[i]]}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default function PlanDetails({ open, close, dto, setDto, planInfo }) {
  const checkForValue = (value) => value === "" || value === undefined || value === null;
  const planData = !checkForValue(planInfo) ? planInfo : [[], [], [], [], []];
  const matches = useMediaQuery("(min-width:700px)");
  const nextFlag = false;
  const nextCount = 0;
  const [tab, setTab] = useState(0);

  const tabArr = () => {
    let arr = [];
    try {
      arr =
        planData &&
        planData.map((innerArray) => (innerArray?.length > 0 ? innerArray[0].text : ""));
    } catch {
      //
    }
    return arr;
  };

  const Plantab = [
    {
      type: "Tabs",
      value: tab,
      visible: true,
      customOnChange: (e, newValue) => setTab(newValue),
      tabs: tabArr().map((elem, index) => ({
        value: index || 0,
        label: elem,
      })),
      spacing: (tabArr()?.length || 1) * 3,
    },
  ];
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          margin: "0rem",
          width: matches ? "72vw" : "100%",
          height: "100vh",
          overflowX: "hidden",
          zIndex: 10001,
          bgcolor: "#fff",
          borderRadius: 0,
          "&:before": {
            content: '""',
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 0,
          },
        },
      }}
    >
      <MDBox p={2} height="100%" sx={{ zIndex: 1, bgcolor: "#fff", overflow: "auto" }}>
        <Grid container justifyContent="flex-end">
          <IconButton onClick={close}>
            <Icon fontSize="large">close</Icon>
          </IconButton>
        </Grid>
        <Grid container spacing={2} p={2}>
          {!matches && (
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              xl={3}
              xxl={3}
              sx={{ position: "sticky", top: "-32px", zIndex: 10002 }}
            >
              <MenuWithTabs tab={tab} setTab={setTab} alltabs={tabArr()} />
            </Grid>
          )}

          {matches &&
            Plantab.map((x2) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={x2.spacing ? x2.spacing : 3}
                lg={x2.spacing ? x2.spacing : 3}
                xl={x2.spacing ? x2.spacing : 3}
                xxl={x2.spacing ? x2.spacing : 3}
                sx={{ position: "sticky", top: "-16px", zIndex: 1000 }}
              >
                <NewRenderControl
                  item={x2}
                  setDto={setDto}
                  nextFlag={nextFlag}
                  nextCount={nextCount}
                  dto={dto}
                />
              </Grid>
            ))}

          {planData &&
            planData[tab].map((item) =>
              item.type === "Accordion" ? (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={item.spacing ? item.spacing : 3.5}
                  lg={item.spacing ? item.spacing : 3.5}
                  xl={item.spacing ? item.spacing : 3}
                  xxl={item.spacing ? item.spacing : 3}
                >
                  <Accordion
                    // defaultExpanded
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
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        background: "#DAE8FE",
                        mb: "0.5rem",
                      }}
                    >
                      <MDBox display="flex" alignItems="flex-start" sx={{ whiteSpace: "normal" }}>
                        <Icon fontSize="medium" sx={{ color: "#1d4e9e" }}>
                          play_arrow
                        </Icon>
                        <MDTypography
                          sx={{
                            ...(item.summarySX
                              ? item.summarySX
                              : { color: "#1d4e9e", fontSize: "1rem", fontWeight: 600 }),
                          }}
                        >
                          {item.summary}
                        </MDTypography>
                      </MDBox>
                    </AccordionSummary>
                    <AccordionDetails sx={{ bgcolor: "#FFFAEB" }}>
                      {Array.isArray(item.details) &&
                        item.details.map((x) => (
                          <MDBox>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={x.spacing ? x.spacing : 3.5}
                              lg={x.spacing ? x.spacing : 3.5}
                              xl={x.spacing ? x.spacing : 3}
                              xxl={x.spacing ? x.spacing : 3}
                            >
                              <RenderControl item={x} />
                            </Grid>
                          </MDBox>
                        ))}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ) : (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={item.spacing ? item.spacing : 3.5}
                  lg={item.spacing ? item.spacing : 3.5}
                  xl={item.spacing ? item.spacing : 3}
                  xxl={item.spacing ? item.spacing : 3}
                >
                  <RenderControl item={item} />
                </Grid>
              )
            )}
        </Grid>
      </MDBox>
    </Drawer>
  );
}
