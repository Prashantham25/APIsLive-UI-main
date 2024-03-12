import { Grid, Autocomplete, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrganizationChart from "components/OrgChart/ChartContainer";
import { getRequest } from "../../../../core/clients/axiosclient";
import MDBox from "../../../../components/MDBox/index";
import MDInput from "../../../../components/MDInput/index";
import MDTypography from "../../../../components/MDTypography/index";
import MDButton from "../../../../components/MDButton/index";

function OffHierarchy() {
  const [OrganizationData, setOrganizationData] = useState({});
  const [selectedHierarchy, setSelectedHierarchy] = useState({});

  const orgchart = useRef();

  const filename = "organization_chart";
  const fileextension = "png";
  const draggable = true;
  const multipleSelect = false;
  const zoom = true;
  const pan = true;
  const exporter = () => {
    orgchart.current.exportTo(filename, fileextension);
  };

  const onSelectOrg = async (e, v) => {
    setSelectedHierarchy({});
    await getRequest(`Organization/GetHierarchy?OrgId=${v.mID}&Type=Office`).then((res) => {
      console.log("res", res);
      setSelectedHierarchy(res.data[0]);
    });
  };
  console.log(selectedHierarchy);
  useEffect(async () => {
    await getRequest(`Organization/GetOrgDropdown`).then((res) => {
      setOrganizationData(res.data);
    });
  }, []);

  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Office Hierarchy
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                freeSolo
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={OrganizationData}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Organization" />}
                onChange={onSelectOrg}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={exporter}>Export</MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox p={5}>
                <OrganizationChart
                  ref={orgchart}
                  datasource={selectedHierarchy}
                  draggable={draggable}
                  multipleSelect={multipleSelect}
                  zoom={zoom}
                  pan={pan}
                />
              </MDBox>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default OffHierarchy;
