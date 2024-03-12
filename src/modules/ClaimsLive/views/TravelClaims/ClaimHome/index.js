import { React, useState } from "react";
import { Card, CardActions, CardContent, Typography, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CountUp from "react-countup";

function ClaimHome() {
  const [flag, setFlag] = useState(false);
  const [showCardItem, setShowCardItem] = useState([]);

  const stageStatus = [
    {
      stageID: 141,
      stageName: "Payment",
      stageCount: 100,
      status: [
        {
          stageID: 141,
          stageStatusID: 222,
          stgName: "Payment",
          statusName: "Paymentmade",
          stageStatusCount: 2,
        },
        {
          stageID: 140,
          stageStatusID: 221,
          stgName: "Payment",
          statusName: "PaymentmadeR",
          stageStatusCount: 6,
        },
      ],
    },
    {
      stageID: 138,
      stageName: "SurveyorAssessment",
      stageCount: 3,
      status: [
        {
          stageID: 138,
          stageStatusID: 219,
          stgName: "SurveyorAssessment",
          statusName: "SurveyorAssessed",
          stageStatusCount: 2,
        },
      ],
    },
    {
      stageID: 136,
      stageName: "Intimation",
      stageCount: 3,
      status: [
        {
          stageID: 136,
          stageStatusID: 217,
          stgName: "Intimation",
          statusName: "Intimated",
          stageStatusCount: 1,
        },
      ],
    },
  ];
  const tableRows = [
    { A1: "CL2022", A2: "Intimated", A3: "19/12/2022" },
    { A1: "CL2023", A2: "Intimated", A3: "19/12/2022" },
  ];

  const handleClick = () => {
    setFlag(true);
  };

  const showCard = (key) => {
    const set = [].fill(0, stageStatus.length, false);
    setShowCardItem(set);
    showCardItem[key] = true;
    setShowCardItem((prev) => [...prev, ...showCardItem]);
  };

  const hideCard = (key) => {
    const set1 = [].fill(0, stageStatus.length, false);
    setShowCardItem(set1);
    showCardItem[key] = false;
    setShowCardItem((prev) => [...prev, ...showCardItem]);
  };

  const tableColumns = [
    {
      field: "A1",
      headerName: "Claim Number",
      width: 250,
    },
    {
      field: "A2",
      headerName: "Status",
      width: 250,
    },
    {
      field: "A3",
      headerName: "Intimation Date",
      width: 250,
    },
  ];
  return (
    <Grid container spacing={2}>
      {stageStatus.map((item, key) => (
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={12} style={{ maxWidth: 335 }}>
          <Card
            sx={{ minWidth: 275 }}
            onMouseEnter={() => showCard(key)}
            onMouseLeave={() => hideCard(key)}
          >
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="primary" gutterBottom>
                {item.stageName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="primary">
                <CountUp
                  start={0}
                  id="count"
                  end={item.stageCount}
                  duration={3.5}
                  // useEasing={true}
                  // useGrouping={true}
                  separator=" "
                />
              </Typography>
            </CardContent>
            {showCardItem[key] === true ? (
              <>
                {item.status.map((i) => (
                  <CardActions>
                    <Button sx={{ minWidth: 275, textAlign: "start" }} onClick={handleClick}>
                      <Typography sx={{ fontSize: 15 }} color="primary">
                        {i.statusName}
                      </Typography>
                    </Button>
                    <Typography sx={{ fontSize: 20 }} color="primary">
                      <CountUp
                        start={0}
                        id="count"
                        end={i.stageStatusCount}
                        duration={3.5}
                        // useEasing={true}
                        // useGrouping={true}
                        separator=" "
                      />
                    </Typography>
                  </CardActions>
                ))}
              </>
            ) : null}
          </Card>
        </Grid>
      ))}
      {flag === true ? (
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <DataGrid
              autoHeight
              rows={tableRows}
              columns={tableColumns}
              disableSelectionOnClick
              getRowId={(row) => row.A1}
            />
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
export default ClaimHome;
