import { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import Chart from "react-google-charts";
import swal from "sweetalert";

import MDBox from "../../../../../components/MDBox";
import MDLoader from "../../../../../components/MDLoader";
import MDTypography from "../../../../../components/MDTypography";
import MDAutocomplete from "../../../../../components/MDAutocomplete";
import { getDynamicGraphPermissions, getParameters, getLabels, queryExecution } from "../data";
import MDInput from "../../../../../components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDButton from "../../../../../components/MDButton";

function ViewDashboard() {
  const userid = localStorage.getItem("userId");
  const roleid = localStorage.getItem("roleId");
  const [loading, setLoading] = useState(false);
  const [graphPermissions, setGraphPermissions] = useState([]);
  const [selected, setSelected] = useState({});
  const [parameters, setParameters] = useState([]);
  const [labels, setLabels] = useState({});
  const [graphData, setGraphData] = useState([]);
  const [pageState, setPageState] = useState(0);
  const [currentChart, setCurrentChart] = useState({
    mID: 3,
    mValue: "ColumnChart",
    mType: "ChartType",
  });
  const chartOptions = [
    { mID: 1, mValue: "ScatterChart", mType: "ChartType" },
    { mID: 2, mValue: "LineChart", mType: "ChartType" },
    { mID: 3, mValue: "ColumnChart", mType: "ChartType" },
    { mID: 4, mValue: "PieChart", mType: "ChartType" },
    { mID: 5, mValue: "Table", mType: "ChartType" },
    { mID: 6, mValue: "SteppedAreaChart", mType: "ChartType" },
    { mID: 7, mValue: "BarChart", mType: "ChartType" },
  ];
  const handleChange = (e, value) => {
    setSelected(value);
  };
  const handleInputChange = (label, value) => {
    const newList = parameters.map((x) =>
      x.parameterName === label ? { ...x, parameterValue: value } : x
    );
    setParameters([...newList]);
  };
  const handleGetGraph = async () => {
    setLoading(true);
    await queryExecution({
      dashboardConfigId: selected.dynamicId,
      paramList: [...parameters],
    }).then((res) => {
      setLoading(false);
      console.log("Query", res);
      setGraphData([...graphData, ...res]);
      setPageState(2);
    });
  };
  const handleChartChange = (e, value) => {
    setCurrentChart(value);
  };
  useEffect(async () => {
    setLoading(true);
    await getDynamicGraphPermissions(userid, roleid, "Graph").then((res) => {
      setLoading(false);
      setGraphPermissions([...res]);
    });
  }, []);
  useEffect(async () => {
    if (Object.keys(selected).length !== 0) {
      setLoading(true);
      await getParameters(selected.dynamicId).then((res) => {
        setParameters(res);
        setPageState(1);
      });
      await getLabels(selected.dynamicId).then((res) => {
        setLoading(false);
        setGraphData([[res.XAxisLable, res.YAxisLable]]);
        setLabels(res);
      });
    }
  }, [selected]);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", height: "90vh", p: 1, display: "flex", flexDirection: "column" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4" color="primary" sx={{ width: "100%" }}>
              View Dashboard
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
            <MDAutocomplete
              label="Graph Name"
              options={graphPermissions}
              optionLabel="dynamicName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {pageState === 1 && (
              <MDBox sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <MDTypography variant="h6" color="primary" sx={{ width: "100%" }}>
                  Criteria
                </MDTypography>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  {parameters.map((elem) => (
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={4} xxl={3}>
                      {elem.dataType === "Date" && (
                        <MDDatePicker
                          value={elem.parameterValue !== undefined ? elem.parameterValue : ""}
                          name={elem.parameterName}
                          onChange={(e, date) => handleInputChange(elem.parameterName, date)}
                          input={{
                            label: elem.parameterName,
                            value: elem.parameterValue !== undefined ? elem.parameterValue : "",
                          }}
                          options={{
                            dateFormat: "Y-m-d",

                            altFormat: "Y-m-d",

                            altInput: true,
                          }}
                        />
                      )}
                      {elem.dataType === "Input" && <MDInput label={elem.parameterName} />}
                    </Grid>
                  ))}
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={4} xxl={3}>
                    <MDButton size="medium" sx={{ p: 1, mt: 2 }} onClick={handleGetGraph}>
                      Generate
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {pageState === 2 && (
              <MDBox sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={4} xxl={3}>
                    <MDAutocomplete
                      value={currentChart}
                      options={chartOptions}
                      onChange={handleChartChange}
                      label="Chart Type"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {currentChart && (
                      <Chart
                        width="100%"
                        height="70vh"
                        key={currentChart.mID}
                        chartType={currentChart.mValue}
                        loader={<div>Chart Loading</div>}
                        data={graphData}
                        chartEvents={[
                          {
                            eventName: "select",
                            callback: ({ chartWrapper }) => {
                              const chart = chartWrapper.getChart();
                              const selection = chart.getSelection();
                              if (selection.length === 1) {
                                const [selectedItem] = selection;
                                const dataTable = chartWrapper.getDataTable();
                                const { row, column } = selectedItem;
                                swal({
                                  text: `You selected :${JSON.stringify({
                                    row,
                                    column,
                                    value: dataTable.getValue(row, column),
                                  })}`,
                                  icon: "info",
                                });
                              }
                            },
                          },
                        ]}
                        formatters={[
                          {
                            type: "ArrowFormat",
                            column: 1,
                          },
                        ]}
                        options={{
                          title: labels.Title,
                          chartArea: { width: "62%", height: "70%" },
                          hAxis: { title: labels.XAxisLable },
                          vAxis: { title: labels.YAxisLable },
                          bar: { groupWidth: "95%" },
                          is3D: true,
                          allowHtml: true,
                          showRowNumber: true,
                          intervals: { lineWidth: 1, barWidth: 1, style: "boxes" },

                          gantt: {
                            trackHeight: 30,
                          },

                          animation: {
                            startup: true,
                            easing: "linear",
                            duration: 1500,
                          },
                        }}
                        legendToggle
                        rootProps={{ "data-testid": "1" }}
                      />
                    )}
                  </Grid>
                </Grid>
              </MDBox>
            )}
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
export default ViewDashboard;
