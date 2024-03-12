import { Chart } from "react-google-charts";
import { useState } from "react";
import { Grid, Autocomplete } from "@mui/material";
import MDInput from "../../../../components/MDInput";

function Charts() {
  const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];

  const options = {
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
  };

  const types = [
    "AreaChart",
    "Bar",
    "BarChart",
    "BubbleChart",
    // "Calendar",
    "CandlestickChart",
    "ColumnChart",
    "ComboChart",
    // "Gantt",
    "Gauge",
    "GeoChart",
    "Histogram",
    "Line",
    "LineChart",
    // "OrgChart",
    "PieChart",
    // "Sankey",
    "Scatter",
    "ScatterChart",
    "SteppedAreaChart",
    "Table",
    // "Timeline",
    // "TreeMap",
    "WordTree",
    // "Animations",
    // "ChartEditor",
    // "Controls",
    // "Interactions",
    // "Layout",
    // "Spreadsheet",
    // "Toolbar",
  ];
  const [ChartName, setChartName] = useState("AreaChart");
  const onChangeEvent = (e, a) => {
    setChartName(a);
  };
  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          options={types}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          getOptionLabel={(option) => option}
          onChange={(e, a) => onChangeEvent(e, a)}
          renderInput={(params) => <MDInput {...params} label="Charts Name" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Chart chartType={ChartName} width="100%" height="400px" data={data} options={options} />
      </Grid>
    </Grid>
  );
}
export default Charts;
