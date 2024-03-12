import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActions, CardContent, Typography, Button, Grid, Radio } from "@mui/material";
import swal from "sweetalert";
import { DataGrid } from "@mui/x-data-grid";
import CountUp from "react-countup";
import { GetWorkFlowStageCount, GetWFTableDetails } from "./data/index";
import { getClaimDetails } from "../ClaimsLive/views/MotorClaims/Processing/data/index";

function Dashboard() {
  const [flag, setFlag] = useState(false);
  const [showCardItem, setShowCardItem] = useState([]);
  const [stageStatus, setStageStatus] = useState([]);
  const UserId = localStorage.getItem("userId");
  const RoleId = localStorage.getItem("roleId");

  const Navigate = useNavigate();
  useEffect(async () => {
    const stageStatusArr = await GetWorkFlowStageCount();
    if (stageStatusArr.status === 200) {
      setStageStatus(stageStatusArr.data);
      console.log(stageStatusArr);
    }
  }, [RoleId]);

  const [tableRows, setTableRows] = useState([]);
  const handleClick = async (e, id) => {
    const tbldata = await GetWFTableDetails(id);
    if (tbldata.status === 200) {
      console.log(tbldata.data);
      setTableRows(tbldata.data);
    }
    setFlag(true);
  };

  const handleClaimData = async (e, id) => {
    console.log(id);
    console.log(id.row.workflowId);
    const res = await getClaimDetails(id.row.itemReference);
    if (res.status === 200 && res.data.finalResult !== null) {
      Navigate(`/MotorClaims/Processing`, {
        state: { value: id.row.workflowId, value2: id.row.wfstageStatusId, claimData: res.data },
      });
    } else {
      swal({
        icon: "error",
        text: "Claims data not found!",
      });
    }
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
      field: "select",
      headerName: "Select",
      width: 100,
      renderCell: (param) => <Radio onClick={(e) => handleClaimData(e, param)} />,
    },
    {
      field: "itemReference",
      headerName: "Claim Number",
      width: 250,
    },
    // {
    //   field: "A2",
    //   headerName: "Status",
    //   width: 250,
    // },
  ];

  return (
    <Grid container spacing={2}>
      {stageStatus.map(
        (item, key) =>
          // for Surveyor
          UserId === "13298564-72e2-4778-be5b-0b31ad9ec700" &&
          RoleId === "9463cf53-2f3d-4430-b798-b2a1e4ad8a0d" &&
          (item.stageName === "Registration " || item.stageName === "SurveyorAssessment") && (
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
                        <Button
                          sx={{ minWidth: 275, textAlign: "start" }}
                          onClick={(e) => handleClick(e, i.stageStatusID)}
                        >
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
          )
      )}

      {stageStatus.map(
        (item, key) =>
          // for Financial Technical Approver
          UserId === "0bcdb092-a48c-43fa-85a0-31d53e271ed7" &&
          RoleId === "d9752f00-c33b-412b-8cf4-d95458351550" &&
          item.stageName === "TechnicalAssessment" && (
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
                        <Button
                          sx={{ minWidth: 275, textAlign: "start" }}
                          onClick={(e) => handleClick(e, i.stageStatusID)}
                        >
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
          )
      )}
      {flag === true ? (
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <DataGrid
              autoHeight
              rows={tableRows}
              columns={tableColumns}
              disableSelectionOnClick
              // onRowClick={(id) => handleClaimData(id)}
              getRowId={(row) => row.itemReference}
            />
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
export default Dashboard;
