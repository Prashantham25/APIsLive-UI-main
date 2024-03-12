import { useEffect, useState } from "react";
import { Grid, Accordion, AccordionSummary, AccordionDetails, Autocomplete } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import swal from "sweetalert";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import { GetAllWfprocess, CreateWFInstance } from "../data";

function WFInstance() {
  const [WFId, setWFId] = useState("");
  const [WFVal, setWFVal] = useState("");
  const [WorkflowArr, setWorkflowArr] = useState([]);
  const [Obj, setObj] = useState({ itemReference: "", itemType: "", startStatus: "" });

  const onAutoChange = (e, v) => {
    setWFId(v.mID);
    setWFVal(v.mValue);
  };
  const onMDChange = (e) => {
    setObj({ ...Obj, [e.target.name]: e.target.value });
  };

  const onSave = async () => {
    await CreateWFInstance(WFId, Obj).then((res) => {
      if (res.data.status === 5)
        swal({
          icon: "success",
          text: `Workflow Created with ID:${res.data.result.workflowId}`,
        }).then(() => {
          setWFVal("");
          Obj.itemReference = "";
          Obj.itemType = "";
          Obj.startStatus = "";
          setObj({ ...Obj });
        });
      else
        swal({ icon: "error", text: "Something went wrong! Try again" }).then(() => {
          setWFVal("");
          Obj.itemReference = "";
          Obj.itemType = "";
          Obj.startStatus = "";
          setObj({ ...Obj });
        });
    });
  };
  useEffect(async () => {
    await GetAllWfprocess().then((res) => {
      setWorkflowArr(res.data);
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
            Instantiate Workflow
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={WorkflowArr}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={{ mValue: WFVal }}
                onChange={onAutoChange}
                renderInput={(params) => <MDInput {...params} label="Workflow Process" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Item Type"
                name="itemType"
                value={Obj.itemType}
                onChange={onMDChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Item Reference"
                name="itemReference"
                value={Obj.itemReference}
                onChange={onMDChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={onSave}>SAVE</MDButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default WFInstance;
