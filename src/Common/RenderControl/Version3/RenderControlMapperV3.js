import { Grid, Icon, IconButton, Stack, Tooltip } from "@mui/material";
// import objectPath from "object-path";
// import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { ConditionLogicalValidation } from "./RenderControlFunctions";
import RenderControlV3 from "./RenderControlV3";
import MDBox from "../../../components/MDBox";

/* no-else-return */
function RenderControlMapperV3({
  item,
  dto,
  setDto,
  nextFlag,
  nextCount,
  defaultSpacing,
  onMidNextValidation,
  midNextValidationId,
  customFunctions,
  masters,
  configurationData,
  stepIndex,
  accordionIndex,
  componentIndex,
}) {
  const rightButtons = [
    {
      icon: "arrow_back_ios",
      tooltip: "Move control to left",
      function: "onMoveLeft",
      disabled: componentIndex === 0,
    },
    {
      icon: "add",
      tooltip: "Add control to right",
      function: "onAddControlToRight",
      disabled: false,
    },
    { icon: "edit", tooltip: "Edit control", function: "onCompEdit", disabled: false },
    { icon: "delete", tooltip: "Delete control", function: "onCompRemove", disabled: false },
    {
      icon: "arrow_forward_ios",
      tooltip: "Move control to right",
      function: "onMoveRight",
      disabled: false,
    },
    {
      icon: "info",
      tooltip: `Index ${stepIndex} ${accordionIndex} ${componentIndex}`,
      function: "onMoveRight",
      disabled: false,
    },
  ];

  const leftButtons = [
    {
      icon: "web_asset_off",
      tooltip: "disable",
      color: item.disabled === true ? "#64b5f6" : "#9e9e9e",
      // function: "onMoveLeft",
      // disabled: componentIndex === 0,
    },
    {
      icon: "local_activity",
      tooltip: "mandatory",
      color: item.required === true ? "#64b5f6" : "#9e9e9e",
    },
  ];

  if (
    item.visible === true ||
    (item.visible === "visibleDetails" &&
      item.visibleDetails &&
      ConditionLogicalValidation({ dto, details: item.visibleDetails }) === true) ||
    configurationData !== undefined
  )
    return (
      <Grid
        item
        xs={12}
        sm={12}
        md={item.spacing ? item.spacing : defaultSpacing}
        lg={item.spacing}
        xl={item.spacing}
        xxl={item.spacing}
      >
        <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
          {configurationData?.modSwitch && configurationData.modSwitch === true && (
            <Stack spacing={0} direction="row">
              {leftButtons.map((x) => (
                <IconButton sx={{ p: "2px" }} disabled={x.disabled}>
                  <Tooltip title={x.tooltip}>
                    <Icon sx={{ fontSize: "20px !important", color: x.color }}>{x.icon}</Icon>
                  </Tooltip>
                </IconButton>
              ))}
            </Stack>
          )}
          {configurationData?.modSwitch && configurationData.modSwitch === true && (
            <Stack spacing={0} direction="row" sx={{ display: "flex", justifyContent: "end" }}>
              {rightButtons.map((x) => (
                <IconButton
                  sx={{ p: "2px" }}
                  onClick={() =>
                    configurationData[x.function](stepIndex, accordionIndex, componentIndex)
                  }
                  disabled={x.disabled}
                >
                  <Tooltip title={x.tooltip}>
                    <Icon sx={{ fontSize: "20px !important" }}>{x.icon}</Icon>
                  </Tooltip>
                </IconButton>
              ))}
            </Stack>
          )}
        </MDBox>
        <RenderControlV3
          item={item}
          dto={{ ...dto }}
          setDto={setDto}
          nextFlag={nextFlag}
          nextCount={nextCount}
          onMidNextValidation={onMidNextValidation}
          midNextValidationId={midNextValidationId}
          customFunctions={customFunctions}
          masters={masters}
        />
      </Grid>
    );

  return null;
}
export default RenderControlMapperV3;
