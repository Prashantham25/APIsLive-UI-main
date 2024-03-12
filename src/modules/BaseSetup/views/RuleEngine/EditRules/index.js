import { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import swal from "sweetalert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RuleConfig from "../RuleConfig/index";
import MDBox from "../../../../../components/MDBox/index";
import MDButton from "../../../../../components/MDButton/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import { GetAllRules, GetRuleDetailsByID, CreateRules } from "../data/index";

function EditRules() {
  const [AllRules, setAllRules] = useState([]);
  const [RuleId, setRuleID] = useState("");
  const [RuleDetails, setRuleDetails] = useState({});
  const [flag, setFlag] = useState(false);

  const onSearch = async () => {
    if (RuleId === "") swal({ icon: "warning", text: "Select any Rule" });
    else {
      const r2 = await GetRuleDetailsByID(RuleId);
      setRuleDetails(r2);
      console.log(r2);
      setFlag(true);
    }
  };

  const onClone = async () => {
    if (RuleId === "") swal({ icon: "warning", text: "Select any Rule" });
    else {
      const data = await GetRuleDetailsByID(RuleId);
      delete data.ruleId;
      data.ruleName = data.ruleName.concat("Clone");
      data.tblRuleConditions.forEach((item, index) => {
        delete data.tblRuleConditions[index].ruleConditionId;
        data.tblRuleConditions[index].ruleId = null;
      });

      data.tblRuleMapper.forEach((it, inn) => {
        delete data.tblRuleMapper[inn].ruleId;
      });
      const r1 = await CreateRules(data);
      if (r1.status === 2) swal({ icon: "success", text: r1.responseMessage });
      else swal({ icon: "error", text: "Something went wrong\nTry again !!!" });
    }
  };
  useEffect(async () => {
    const r1 = await GetAllRules();
    setAllRules([...r1]);
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
            Rule Edit
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={AllRules}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                onChange={(e, a) => {
                  setRuleID(a.mID);
                  setFlag(false);
                }}
                renderInput={(params) => <MDInput {...params} label="Rules" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Stack direction="row" spacing={2}>
                <MDButton onClick={onSearch}>SEARCH</MDButton>
                <MDButton onClick={onClone}>CLONE</MDButton>
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {flag && <RuleConfig flag={flag} RuleDetails={RuleDetails} />}
    </MDBox>
  );
}
export default EditRules;
