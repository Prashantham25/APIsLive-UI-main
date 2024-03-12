import { useState, useEffect } from "react";
import { Card, CardContent, Grid, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CountUp from "react-countup";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { GetPolicyWFStatusCount } from "../Retail/Products/NepalProds/data/APIs/MotorCycleApi";

export default function Dashboard({ setQuote }) {
  const [stageStatus, setStageStatus] = useState([
    {
      stageStatusID: 380,
      statusName: "Saved Quotes",
      stageStatusCount: 0,
      color: "#0071D9",
      loader: false,
    },
    {
      stageStatusID: 381,
      statusName: "UW Approved Quotes",
      stageStatusCount: 0,
      color: "#2E7D32",
      loader: false,
    },
    {
      stageStatusID: 382,
      statusName: "Pending for Approval",
      stageStatusCount: 0,
      color: "#FF2626",
      loader: false,
    },

    {
      stageStatusID: 383,
      statusName: "Pending for Payment",
      stageStatusCount: 0,
      color: "#4879F5",
      loader: false,
    },
    {
      stageStatusID: 384,
      statusName: "Waiting for QA",
      stageStatusCount: 0,
      color: "#6C5DD3",
      loader: false,
    },
    {
      stageStatusID: 385,
      statusName: "Issued Policy",
      stageStatusCount: 0,
      color: "#6C5DD3",
      loader: false,
    },
  ]);

  const tableColumns = [
    {
      field: "Quote No",
      headerName: "Quote No",
      width: 210,
      headerAlign: "center",
      renderCell: (p) => {
        const onQuote = () => {
          setQuote(true);
        };
        return (
          <MDButton variant="text" onClick={onQuote}>
            {p.row["Quote No"]}
          </MDButton>
        );
      },
    },
    {
      field: "Corporate Name",
      headerName: "Corporate Name",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "Business Type",
      headerName: "Business Type",
      width: 110,
      headerAlign: "center",
    },
    {
      field: "Last Saved",
      headerName: "Last Saved",
      width: 110,
      headerAlign: "center",
    },
    {
      field: "Product",
      headerName: "Product",
      width: 250,
      headerAlign: "center",
    },
    {
      field: "Manage",
      headerName: "Manage",
      width: 150,
      headerAlign: "center",
    },
  ];
  useEffect(async () => {
    await GetPolicyWFStatusCount("380,381,382,383,384,385").then((res) => {
      stageStatus[0].stageStatusCount = res.data[0].policyCount;
      stageStatus[1].stageStatusCount = res.data[1].policyCount;
      stageStatus[2].stageStatusCount = res.data[2].policyCount;
      stageStatus[3].stageStatusCount = res.data[3].policyCount;
      stageStatus[4].stageStatusCount = res.data[4].policyCount;
      stageStatus[5].stageStatusCount = res.data[5].policyCount;
    });

    setStageStatus([...stageStatus]);
  }, []);
  const rows = [
    {
      "Quote No": "Q00123006222",
      "Corporate Name": "Inubesolutions9",
      "Business Type": "New",
      "Last Saved": "16-06-2022",
      Product: "GMC",
      Manage: "Delate",
    },
  ];

  const handleClick = () => {};

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF", minHeight: "85vh" }} p={3}>
      <Grid container spacing={2}>
        {stageStatus.map((item) => (
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ maxWidth: 300 }}>
            <Card
              sx={{ minWidth: 235, bgcolor: item.color, cursor: "pointer" }}
              onClick={(e) => handleClick(e, item.stageStatusID)}
            >
              <CardContent>
                <MDTypography sx={{ fontSize: 20 }} color="white" gutterBottom>
                  {item.statusName}
                </MDTypography>
                <MDTypography sx={{ mb: 1.5, textAlign: "right", fontSize: 24 }} color="white">
                  <CountUp
                    start={0}
                    id="count"
                    end={item.stageStatusCount}
                    duration={3.5}
                    // useEasing={true}
                    // useGrouping={true}
                    separator=" "
                  />
                </MDTypography>
                {item.loader && <CircularProgress color="white" />}
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid container spacing={4} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <DataGrid
              autoHeight
              rows={rows}
              columns={tableColumns}
              getRowId={(row) => row["Quote No"]}
              //   pageSize={pageSize}
              //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 15, 20]}
              pagination
            />
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
