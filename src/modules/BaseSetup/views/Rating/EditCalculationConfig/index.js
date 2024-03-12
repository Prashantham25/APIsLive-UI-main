import * as React from "react";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import MDTypography from "components/MDTypography";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
// import SearchCalculationConfig from "./SearchCalculationConfig";
import CalculationConfig from "../CalculationConfig";
import MDBox from "../../../../../components/MDBox";
import { GetRateConfig, GetCalConfigExp, GetCalConfigParam } from "../data";

const { Card, Grid, Autocomplete, Stack, IconButton } = require("@mui/material");

const style = {
  position: "absolute",
  top: "-1%",
  left: "85%",
  transform: "translate(-85%,6%)",
  height: 660,
  width: 1400,
  p: 2,
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
};

function EditCalculationConfig() {
  const [calculatorData, setCalculatorData] = useState({
    calculationConfigId: 0,
    calculationConfigName: "",
    createdDate: new Date(),
    isActive: 1,
    calculationConfigExpression: [],
    calculationConfigParam: [],
    mapperDetails: [],
    calculatorMapperDTO: [],
  });
  const calculatorDataD = {
    calculationConfigId: 0,
    calculationConfigName: "",
    createdDate: new Date(),
    isActive: 1,
    calculationConfigExpression: [],
    calculationConfigParam: [],
    mapperDetails: [],
    calculatorMapperDTO: [],
  };
  const [cal, setCal] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [arrayParam, setArrayParam] = useState([]);
  // const [exp, setExp] = React.useState([]);
  // const [param, setParam] = useState([]);
  // const [mapper, setMapper] = useState([]);
  const handleClose = () => setOpen(false);
  const [configName, setConfigName] = useState([]);
  useEffect(() => {
    GetRateConfig().then((response) => {
      setConfigName(response);
    });
  }, []);

  const [values, setValues] = useState({
    RateValue: "",
    CalculationConfigId: "",
    isFilter: true,
  });
  const handleChange = (e, value) => {
    // setExp([]);
    // setParam([]);
    // setMapper([]);
    setCal([]);
    setArrayParam([]);
    setCalculatorData(calculatorDataD);
    setValues((prev) => ({ ...prev, RateValue: value.mValue, CalculationConfigId: value.mID }));
    setCalculatorData((prev) => ({
      ...prev,
      calculationConfigName: value.mValue,
      calculationConfigId: value.mID,
    }));
  };

  useEffect(async () => {
    // debugger;

    if (values.CalculationConfigId !== "") {
      const edit = await GetCalConfigExp(values);
      const edit1 = await GetCalConfigParam(values);

      // setCalculatorData((prev) => ({
      //   ...prev,
      //   calculatorMapperDTO:[...prev.calculatorMapperDTO,edit1.data.calculatorMapperData],
      //   calculationConfigExpression: [...prev.calculationConfigExpression, ...edit.data],
      //   calculationConfigParam: [...prev.calculationConfigParam, ...edit1.data.parameterData],
      //   mapperDetails: [...prev.mapperDetails, ...edit1.data.mapperData],
      // }));
      edit1.data.calculatorMapperData.forEach((x, i) => {
        arrayParam.push(
          `${edit1.data.calculatorMapperData[i].calculatorName}${"."}${
            edit1.data.calculatorMapperData[i].sourceParameter
          }${edit1.data.calculatorMapperData[i].operation}`
        );
      });
      setCalculatorData({
        ...calculatorData,
        mapperDetails: [...edit1.data.mapperData],
        calculatorMapperDTO: [...edit1.data.calculatorMapperData],
        calculationConfigExpression: [...edit.data],
        calculationConfigParam: [...edit1.data.parameterData],
      });
      setCal([...edit1.data.calculators]);

      setArrayParam([...arrayParam]);
    }
  }, [values.CalculationConfigId]);

  useEffect(() => {
    console.log("CalculatorData", calculatorData);
  }, [calculatorData]);

  const handleEdit = async () => {
    // debugger;
    // if (calculatorData.calculationConfigParam.length > 0) {
    setOpen(true);
    // }
  };

  return (
    <Card sx={{ height: "15rem", top: "30px" }}>
      <IconButton sx={{ fontSize: "70px", justifyContent: "left", marginTop: "-39px" }}>
        {/* <Paper sx={{ height: "70px" }}> */}
        <DashboardIcon style={{ color: "firebrick" }} />
        {/* </Paper> */}
      </IconButton>

      <Grid container spacing={2} p={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          style={{ paddingLeft: "85px", marginTop: "-56px" }}
        >
          <MDTypography variant="h5" color="primary">
            Search Calculation Config
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            options={configName.data}
            onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            renderInput={(params) => <MDInput {...params} label="Rate config Name" />}
          />
        </Grid>
      </Grid>
      <Stack justifyContent="center" spacing={2} direction="row" p={2}>
        <MDButton
          variant="contained"
          onClick={handleEdit}
          disabled={!calculatorData.calculationConfigParam.length > 0}
        >
          EDIT
        </MDButton>
        <MDButton variant="contained">CLONE</MDButton>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <MDBox sx={style}>
          <Grid container justifyContent="right" alignItems="right">
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="medium" style={{ color: "dodgerblue" }} />
            </IconButton>
          </Grid>
          {/* <SearchCalculationConfig values={values} exp={exp} param={param} mapper={mapper} /> */}
          <CalculationConfig calculatorData={calculatorData} calI={cal} arrayParam={arrayParam} />
        </MDBox>
      </Modal>
    </Card>
  );
}

export default EditCalculationConfig;
