import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Grid,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardActions,
  CardContent,
  Button,
  IconButton,
  //   Switch,
  Modal,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CountUp from "react-countup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HistoryIcon from "@mui/icons-material/History";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Position } from "reactflow";
import swal from "sweetalert";

import {
  GetAllWfprocess,
  GetStageStatusCount,
  GetWFTableDetails,
  GetAction,
  GetAllWorkflowHistory,
  UpdateWorkflowStatus,
  GetAllWfstage,
  // GetAllWorkflowDetails,
  GetAllWfstageStatus,
} from "../data";
import MDTypography from "../../../../../components/MDTypography/index";
import MDInput from "../../../../../components/MDInput/index";
import MDButton from "../../../../../components/MDButton/index";
import MDBox from "../../../../../components/MDBox/index";
import WFHistory from "./WFHistory";

function WFDashboard() {
  const [pageSize, setPageSize] = useState(5);
  const [WorkflowArr, setWorkflowArr] = useState([]);
  const [WfprocessId, setWfprocessId] = useState();
  const [ModalFlag1, setModalFlag1] = useState(false);
  const [ModalFlag2, setModalFlag2] = useState(false);
  const [ModalFlag3, setModalFlag3] = useState(false);
  const [TransactionID, setTransactionID] = useState();
  const [ActionID, setActionID] = useState();
  const [CurrentStatus, setCurrentStatus] = useState();
  const [CurrentStage, setCurrentStage] = useState();
  const [ActionArr, setActionArr] = useState([]);
  const [SSCount, setSSCount] = useState([]);
  const [showCardItem, setShowCardItem] = useState([]);
  const [rows, setRows] = useState([]);
  const [rows1, setRows1] = useState([]);
  const [NodeArr, setNodeArr] = useState([]);
  const [EdgeArr, setEdgeArr] = useState([]);
  const [AllStatus, setAllStatus] = useState([]);
  const [AllStageArr, setAllStageArr] = useState([]);
  const [AllActions, setAllAction] = useState([]);
  // console.log("NodeArr", NodeArr);
  console.log("AllActions", AllActions);

  const columns = [
    {
      headerName: "Id",
      field: "workflowId",
      width: 50,
    },
    {
      headerName: "Workflow Name",
      field: "workflowName",
      width: 200,
    },

    {
      headerName: "Stage",
      field: "stageName",
      width: 100,
    },
    {
      headerName: "Status",
      field: "statusName",
      width: 100,
    },
    {
      headerName: "Item Type",
      field: "itemType",
      width: 200,
    },
    {
      headerName: "Item Reference",
      field: "itemReference",
      width: 150,
    },
    {
      headerName: "Last Modified",
      field: "dateModified",
      width: 200,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 300,
      renderCell: (param) => {
        console.log("BillDetailsRow", param);

        const onViewClick = async () => {
          await GetAction(param.row.wfstageStatusId).then((res) => {
            setActionArr(res.data);
          });
          setTransactionID(param.row.workflowId);
          setCurrentStage(param.row.stageName);
          setCurrentStatus(param.row.statusName);
          setModalFlag2(true);
        };

        const onHistoryClick = async () => {
          const res = await GetAllWorkflowHistory(param.row.workflowId);
          res.data.forEach((x, i) => {
            res.data[i].sno = i + 1;
          });

          setRows1(res.data);
          setTransactionID(param.row.workflowId);
          setModalFlag1(true);
        };
        const onTreeClick = async () => {
          const res = await GetAllWorkflowHistory(param.row.workflowId);
          const EARR = res.data;
          console.log("EARR", EARR);
          const tArr = [];
          const eArr = [];
          let x1c = 0;
          let y1c = 0;
          let y2c = 80;
          AllStageArr.forEach((x1) => {
            tArr.push({
              id: x1.wfstageId.toString(),
              data: { label: x1.stageName },
              type: "input",
              style: {
                background: "#1769aa",
                color: "white",
              },
              position: { x: x1c, y: y1c },
            });

            AllStatus.forEach((x2) => {
              if (x1.wfstageId === x2.wfstageId) {
                let typeOdNode = "";
                let backColor = "";
                if (x2.statusType === "Start") {
                  typeOdNode = "input";
                  backColor = "#76ff03";
                }
                if (x2.statusType === "Transition") {
                  typeOdNode = "";
                  backColor = "#2196f3";
                }
                if (x2.statusType === "End") {
                  typeOdNode = "output";
                  backColor = "#ff1744";
                }
                tArr.push({
                  id: x2.wfstageStatusId.toString(),
                  data: { label: x2.statusName, text: x2.statusName },
                  className: "circle",
                  type: typeOdNode,
                  style: {
                    background: backColor,
                    color: "#263238",
                  },
                  position: { x: x1c + 50, y: y2c },
                  sourcePosition: Position.Right,
                  // targetPosition: Position.Left,
                });
                y2c += 100;
              }
            });

            y1c += 0;
            x1c += 200;
          });

          AllActions.forEach((x1) => {
            eArr.push({
              id: x1.actionId.toString(),
              source: x1.stageStatusId.toString(),
              target: x1.taskId.toString(),
              label: x1.actionName,
              animated: true,
            });
          });

          eArr.forEach((x1, i) => {
            EARR.forEach((x2) => {
              if (
                x1.source === x2.fromStageStatusId.toString() &&
                x1.target === x2.toStageStatusId.toString()
              )
                eArr[i].animated = false;
            });
          });
          console.log("tArr", tArr);
          setNodeArr([...tArr]);
          setEdgeArr([...eArr]);
          setModalFlag3(true);
        };

        return (
          <>
            <IconButton onClick={onViewClick}>
              <VisibilityIcon />
            </IconButton>
            <IconButton>
              <HistoryIcon onClick={onHistoryClick} />
            </IconButton>
            <IconButton>
              <AccountTreeIcon onClick={onTreeClick} />
            </IconButton>
          </>
        );
      },
    },
  ];
  const columns1 = [
    {
      headerName: "S No",
      field: "sno",
      width: 50,
    },
    {
      headerName: "From Stage",
      field: "fromWfStage",
      width: 150,
    },

    {
      headerName: "From Status",
      field: "fromStageStatus",
      width: 150,
    },
    {
      headerName: "To Stage",
      field: "toWfStage",
      width: 150,
    },
    {
      headerName: "To Status",
      field: "toStageStatus",
      width: 150,
    },
    {
      headerName: "Last Modified",
      field: "modifiedDate",
      width: 200,
    },
    {
      headerName: "Modified By",
      field: "modifiedBy",
      width: 150,
    },
  ];

  const onAutoChange = (e, v) => {
    setWfprocessId(v.mID);
    setRows([]);
    setRows1([]);
    setSSCount([]);
  };
  const onGo = async () => {
    await GetStageStatusCount(WfprocessId).then((res) => {
      setSSCount(res.data);
    });
  };

  const showCard = (key) => {
    const set = [].fill(0, SSCount.length, false);
    setShowCardItem(set);
    showCardItem[key] = true;
    setShowCardItem((prev) => [...prev, ...showCardItem]);
  };

  const hideCard = (key) => {
    showCardItem[key] = false;
    setShowCardItem((prev) => [...prev, ...showCardItem]);
  };
  const handleClick = async (i) => {
    setRows([]);
    const res1 = await GetWFTableDetails(i.stageStatusID);
    const arr = [];
    res1.data.forEach((x) => {
      arr.push({
        dateModified: x.dateModified,
        isActive: x.isActive,
        itemReference: x.itemReference,
        itemType: x.itemType,
        modifiedBy: x.modifiedBy,
        parentWfstageStatusId: x.parentWfstageStatusId,
        parentWorkflowId: x.parentWorkflowId,
        stageName: i.stgName,
        statusName: i.statusName,
        wfprocessId: x.wfprocessId,
        wfstageId: x.wfstageId,
        wfstageStatusId: x.wfstageStatusId,
        workflowHistory: x.workflowHistory,
        workflowId: x.workflowId,
        workflowName: x.workflowName,
      });
    });
    setRows(arr);
    if (arr.length > 0) {
      const res2 = await GetAllWfstage(arr[0].wfprocessId);
      setAllStageArr([...res2.data]);
      // const res3 = await GetAllWorkflowDetails(arr[0].wfprocessId);
      const rArr = [];
      const eArr = [];
      await res2.data.forEach(async (x1) => {
        await GetAllWfstageStatus(x1.wfstageId).then((x2) => {
          x2.data.forEach(async (x3) => {
            rArr.push(x3);
            setAllStatus([...rArr]);
            await GetAction(x3.wfstageStatusId).then((x4) => {
              x4.data.forEach((x5) => {
                eArr.push(x5);
                setAllAction([...eArr]);
              });
            });
          });
        });
      });
    }
  };
  const onClose1 = () => {
    setModalFlag1(false);
  };
  const onClose2 = () => {
    setModalFlag2(false);
  };
  const onClose3 = () => {
    setModalFlag3(false);
  };
  const onAction = (e, v) => {
    setActionID(v.actionId);
  };
  const onSave = async () => {
    const tObj = {};
    await UpdateWorkflowStatus(TransactionID, ActionID, tObj).then((res) => {
      if (res.status === 200)
        swal({ icon: "success", text: "Successfully updated" }).then(() => {
          setRows([]);
          onGo();
          onClose2();
        });
    });
  };
  useEffect(async () => {
    const res = await GetAllWfprocess();
    const arr = res.data;
    arr.unshift({ mID: 0, mType: "Workflow", mValue: "All" });
    setWorkflowArr(arr);
  }, []);
  return (
    <MDBox sx={{ bgcolor: "#FFFFFF", minHeight: "85vh" }}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Workflow
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
                onChange={(e, v) => onAutoChange(e, v)}
                renderInput={(params) => <MDInput {...params} label="Workflow Process" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDButton onClick={onGo}>GO</MDButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {SSCount.map((item, key) => (
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={12} style={{ maxWidth: 335 }}>
                <Card
                  sx={{ minWidth: 275 }}
                  onMouseEnter={() => showCard(key)}
                  onMouseLeave={() => hideCard(key)}
                >
                  <CardContent>
                    <MDTypography sx={{ fontSize: 20 }} color="primary" gutterBottom>
                      {item.stageName}
                    </MDTypography>
                    <MDTypography sx={{ mb: 1.5 }} color="primary">
                      <CountUp
                        start={0}
                        id="count"
                        end={item.stageCount}
                        duration={3.5}
                        // useEasing={true}
                        // useGrouping={true}
                        separator=" "
                      />
                    </MDTypography>
                  </CardContent>
                  {showCardItem[key] === true ? (
                    <>
                      {item.status.map((i) => (
                        <CardActions>
                          <Button
                            sx={{ minWidth: 275, textAlign: "start" }}
                            onClick={() => handleClick(i)}
                          >
                            <MDTypography sx={{ fontSize: 15 }} color="primary">
                              {i.statusName}
                            </MDTypography>
                          </Button>
                          <MDTypography sx={{ fontSize: 20 }} color="primary">
                            <CountUp
                              start={0}
                              id="count"
                              end={i.stageStatusCount}
                              duration={3.5}
                              // useEasing={true}
                              // useGrouping={true}
                              separator=" "
                            />
                          </MDTypography>
                        </CardActions>
                      ))}
                    </>
                  ) : null}
                </Card>
              </Grid>
            ))}
            {rows.length > 0 && (
              <Grid container spacing={4} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    getRowId={(row) => row.workflowId}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Modal
        open={ModalFlag1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Accordion>
          <Grid container spacing={4} p={5}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" justifyContent="space-between">
                <MDTypography variant="body1" color="primary">
                  Workflow History
                </MDTypography>
                <MDButton onClick={onClose1}>X</MDButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              Transaction ID : {TransactionID}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <DataGrid
                autoHeight
                rows={rows1}
                columns={columns1}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                getRowId={(row) => row.sno}
              />
            </Grid>
          </Grid>
        </Accordion>
      </Modal>
      <Modal
        open={ModalFlag2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Accordion>
          <Grid container spacing={4} p={5}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" justifyContent="space-between">
                <MDTypography variant="body1" color="primary">
                  Workflow Action
                </MDTypography>
                <MDButton onClick={onClose2}>X</MDButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              Transaction ID : {TransactionID}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="body1" color="primary">
                Current Status : {CurrentStatus} Current Stage : {CurrentStage}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={ActionArr}
                getOptionLabel={(option) => option.actionName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                renderInput={(params) => <MDInput {...params} label="Action" />}
                onChange={(e, v) => onAction(e, v)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                <MDButton onClick={onSave}>SAVE</MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </Accordion>
      </Modal>
      <Modal
        open={ModalFlag3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid black",
          overflowY: "scroll",
        }}
      >
        <MDBox>
          <Accordion>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" justifyContent="space-between">
                  <MDTypography variant="body1" color="primary">
                    Workflow History
                  </MDTypography>
                  <MDButton onClick={onClose3}>X</MDButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox>
                  <WFHistory initialNodes={NodeArr} initialEdges={EdgeArr} />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDButton onClick={onClose3}>X</MDButton>
              </Grid>
            </Grid>
          </Accordion>
        </MDBox>
      </Modal>
    </MDBox>
  );
}
export default WFDashboard;
