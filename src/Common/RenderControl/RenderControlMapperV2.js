import { Grid, Tooltip } from "@mui/material";
import objectPath from "object-path";
import RenderControl from "./NewRenderControl";
import MDTypography from "../../components/MDTypography";

/* no-else-return */
function RenderControlMapperV2({
  item,
  dto,
  setDto,
  nextFlag,
  nextCount,
  defaultSpacing,
  onMidNextValidation,
  midNextValidationId,
}) {
  if (
    item.hide !== true &&
    (item.visible === true ||
      (item.visible === "visibleDetails" &&
        item.visibleDetails &&
        objectPath.get(dto, item.visibleDetails.path) === item.visibleDetails.value))
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
        <RenderControl
          item={item}
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
                mb: 2,
              }}
            >
              {item.helperTooltip.title}
            </MDTypography>
          </Tooltip>
        )}
      </Grid>
    );

  return null;
}
export default RenderControlMapperV2;
