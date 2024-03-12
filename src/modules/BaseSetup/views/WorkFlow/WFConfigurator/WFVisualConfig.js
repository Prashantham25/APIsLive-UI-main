import { useState, useCallback, useEffect } from "react";
import { Accordion, Grid, Stack, Modal, Autocomplete, IconButton, Tooltip } from "@mui/material";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import swal from "sweetalert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import "../data/overview.css";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";
import { StatusTypeList } from "../data/JsonData";
import { formatDate, CreateWorkflowProcess } from "../data";

// import { Mode } from "@mui/icons-material";

const minimapStyle = {
  height: 120,
};
const onInit = (reactFlowInstance) => console.log("flow loaded:", reactFlowInstance);

function WFVisualConfig({ Node, Edge, Mode, WFP }) {
  const [obj1, setObj1] = useState({
    stageName: "",
    statusName: "",
    mode: "",
    stageStateChange: true,
    statusId: 0,
    statusType: "",
  });
  const [workflowName, setWorkflowName] = useState("");
  const [stageName, setStageName] = useState("");
  const [ActionName1, setActionName1] = useState("");
  const [selectedStatusNode, setSelectedStatusNode] = useState({ data: { StatusName: "" } });
  const [actionObj, setActionObj] = useState({ actionName: "", ActionArr: [] });

  const [StatusModelFlags, setStatusModelFlags] = useState({
    edit: false,
    action: false,
  });
  const [StageModelFlags, setStageModelFlags] = useState({
    edit: false,
  });

  //   const [NodeArr, setNodeArr] = useState([]);
  //   const [EdgeArr, setEdgeArr] = useState([]);
  const [NodeArr, setNodeArr, onNodesChange] = useNodesState([]);
  const [EdgeArr, setEdgeArr, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params) => setEdgeArr((eds) => addEdge(params, eds)), []);

  const [NodeId, setNodeID] = useState(-1000);
  const [StageCoordinates, setStageCoordinates] = useState({ x: 0, y: 0 });

  const [ModelName, setModelName] = useState("");
  const [ModalFlag1, setModalFlag1] = useState(false);

  useEffect(() => {
    setNodeArr(Node);
    setEdgeArr(Edge);
    let x1 = 0;

    Node.forEach((ite) => {
      if (ite.data.nodeType === "stage") {
        x1 += 200;
        console.log("xxxxxxx", x1);
      }
    });
    setStageCoordinates({ x: x1, y: 0 });
    console.log(x1);
  }, [Node, Edge]);
  const sty = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
    },
  };

  console.log("NodeArr", NodeArr, Node);
  console.log("EdgeArr", EdgeArr, Edge);

  const openModel = (name) => {
    setModelName(name);
    setModalFlag1(true);
  };

  const onClickStatusModel = (v) => {
    if (v === "edit") {
      setObj1({
        stageName: selectedStatusNode.data.StageName,
        statusName: selectedStatusNode.data.StatusName,
        mode: "",
        stageStateChange: true,
        statusId: 0,
        statusType: selectedStatusNode.data.StatusType,
      });
      setStatusModelFlags({ edit: true, action: false });
    }
    if (v === "action") setStatusModelFlags({ edit: false, action: true });
    if (v === "delete") {
      // selectedStatusNode

      const arr1 = [];
      const arr2 = [];
      EdgeArr.forEach((x1) => {
        if (x1.source !== selectedStatusNode.id) arr1.push(x1);
      });

      NodeArr.forEach((x1) => {
        if (x1.id !== selectedStatusNode.id) arr2.push(x1);
      });
      setEdgeArr([...arr1]);
      setNodeArr([...arr2]);
      setModalFlag1(false);
    }
  };

  const onNodeClick = (e, v) => {
    setSelectedStatusNode(v);
    if (v.data.nodeType === "stage") {
      setStageName(v.data.StageName);
      setStageModelFlags({ edit: true });
      setModelName("CreateStage");
      setModalFlag1(true);
    }
    if (v.data.nodeType === "status") {
      setStatusModelFlags({
        edit: false,
        action: false,
      });
      setModelName("onStatus");
      setModalFlag1(true);
      onClickStatusModel("edit");
    }
  };
  const onSaving = async () => {
    if (Mode === "Create") {
      setModelName("createWorkflow");
      setModalFlag1(true);
    }
    if (Mode === "Edit") {
      console.log("EdgeArr", EdgeArr);
      const lobj = { wfprocessId: WFP.mID, wfname: WFP.mValue, wfStageDTO: [] };
      const tArr1 = [];

      // pushing Stages
      NodeArr.forEach((x1) => {
        if (x1.data.nodeType === "stage") {
          if (parseInt(x1.id, 10) > 0)
            tArr1.push({
              wfstageId: parseInt(x1.id, 10),
              workflowId: null,
              stageName: x1.data.StageName,
              stageType: "",
              stageId: 0,
              wfstageStatusDTO: [],
            });
          else
            tArr1.push({
              stageName: x1.data.StageName,
              stageType: "",
              stageId: 0,
              wfstageStatusDTO: [],
            });
        }
      });

      // pushing status
      tArr1.forEach((x1, i1) => {
        NodeArr.forEach((x2) => {
          if (x2.data.nodeType === "status") {
            if (x1.stageName === x2.data.StageName) {
              if (parseInt(x2.id, 10) > 0)
                tArr1[i1].wfstageStatusDTO.push({
                  wfstageStatusId: parseInt(x2.id, 10),
                  wfstageId: x1.id,
                  stageName: x2.data.StageName,
                  statusName: x2.data.StatusName,
                  mode: "",
                  stageStateChange: true,
                  statusId: 0,
                  statusType: x2.data.StatusType,
                  wfstageStatusActionDTO: [],
                  wfgroupDTO: [],
                });
              else
                tArr1[i1].wfstageStatusDTO.push({
                  stageName: x2.data.StageName,
                  statusName: x2.data.StatusName,
                  mode: "",
                  stageStateChange: true,
                  statusId: 0,
                  statusType: x2.data.StatusType,
                  wfstageStatusActionDTO: [],
                  wfgroupDTO: [],
                });
            }
          }
        });
      });
      // pushing actions
      tArr1.forEach((x1, i1) => {
        x1.wfstageStatusDTO.forEach((x2, i2) => {
          const StatusActionArr = EdgeArr.filter((xx1) => xx1.StatusName === x2.statusName);

          const actionNameArrWithDuplicate = [];
          StatusActionArr.forEach((x3) => {
            actionNameArrWithDuplicate.push(x3.ActionName);
          });
          const actionNameArrWithoutDuplicate = actionNameArrWithDuplicate.filter(
            (item, index) => actionNameArrWithDuplicate.indexOf(item) === index
          );
          actionNameArrWithoutDuplicate.forEach((x3) => {
            const tObj = {
              // wfstageStatusActionId: 237,
              // wfstageStatusId: 276,
              actionName: x3,
              wfactionTaskMappingDTO: [],
              isActive: true,
              createdDate: formatDate(new Date()),
            };
            StatusActionArr.forEach((x4) => {
              if (x3 === x4.ActionName) {
                // const xx4 = x4;
                // xx4.data.wfactionTaskMappingId=241
                // xx4.data.wfstageStatusActionId=237
                tObj.wfactionTaskMappingDTO.push(x4.data);
              }
            });
            tArr1[i1].wfstageStatusDTO[i2].wfstageStatusActionDTO.push(tObj);
          });
        });
      });
      lobj.wfStageDTO = tArr1;
      await CreateWorkflowProcess(lobj).then((res) => {
        if (res.data.status === 2) swal({ icon: "success", text: res.data.responseMessage });
        else swal({ icon: "error", text: res.data.responseMessage });
      });
    }
  };

  const onModelClose1 = () => {
    setModalFlag1(false);
    setStageModelFlags({ edit: false });
  };

  console.log("selectedStatusNode", selectedStatusNode);
  const onStageNameChange = (e) => {
    setStageName(e.target.value);
  };
  const onChangeAddingStatus = (e, v, name) => {
    setObj1({ ...obj1, [name]: v });
  };
  const onActionChange = (e, v, name) => {
    setActionObj({ ...actionObj, [name]: v });
    console.log("setActionObj", v, actionObj);
    if (name === "StageStatus") {
      if (v.length <= 1) setActionObj({ ...actionObj, ActionArr: v });
    }
  };

  const onStageAdd = () => {
    setNodeArr([
      ...NodeArr,
      {
        id: NodeId.toString(),
        type: "input",
        data: {
          label: stageName,
          nodeType: "stage",
          StageName: stageName,
        },
        style: {
          background: "#78909c",
          color: "white",
        },
        position: { x: StageCoordinates.x, y: StageCoordinates.y },
      },
    ]);
    setStageCoordinates({ ...StageCoordinates, x: StageCoordinates.x + 200 });
    setStageName("");
    setNodeID(NodeId + 1);
  };

  const onEditStageClick = (n) => {
    setStageName("");
    setStageModelFlags({ edit: false });
    console.log(n);
    // if (n === "edit") {
    // }
    // if (n === "delete") {
    //   const arr1 = []; // selected stage status
    //   const arr2 = []; // edges after removing
    //   NodeArr.forEach((x1) => {
    //     if (
    //       x1.data.nodeType === "status" &&
    //       x1.data.StageName === selectedStatusNode.data.StageName
    //     )
    //       arr1.push(x1);
    //   });

    // }
  };

  const onAddStatus = () => {
    let backColor = "";
    let nodeIO = "";
    let xc = 0;
    let yc = 50;

    NodeArr.forEach((x1) => {
      if (x1.data.StageName === obj1.stageName) {
        xc = x1.position.x;
        // yc = x1.position.y;
      }
      if (x1.data.nodeType === "status")
        if (x1.data.StageName === obj1.stageName) {
          yc += 100;
        }
    });
    if (obj1.statusType === "Start") {
      backColor = "#76ff03";
      nodeIO = "input";
    }
    if (obj1.statusType === "Transition") {
      backColor = "#2196f3";
      nodeIO = "";
    }
    if (obj1.statusType === "End") {
      backColor = "#ff1744";
      nodeIO = "output";
    }
    setNodeArr([
      ...NodeArr,
      {
        id: NodeId.toString(),
        type: nodeIO,
        data: {
          label: obj1.statusName,
          nodeType: "status",
          StageName: obj1.stageName,
          StatusName: obj1.statusName,
          StatusType: obj1.statusType,
          StageStatus: obj1.stageName.concat("-", obj1.statusName),
        },
        className: "circle",
        style: {
          background: backColor,
          color: "white",
        },
        position: { x: xc, y: yc + 50 },
        sourcePosition: Position.Right,
      },
    ]);
    setObj1({
      stageName: "",
      statusName: "",
      mode: "",
      stageStateChange: true,
      statusId: 0,
      statusType: "",
    });
    setNodeID(NodeId + 1);
  };

  const onActionAdd = () => {
    const arr = [];
    actionObj.ActionArr.forEach((x) => {
      arr.push({
        id: actionObj.actionName.concat("-", x.id),
        source: selectedStatusNode.id,
        target: x.id,
        label: actionObj.actionName,
        animated: true,
        ActionName: actionObj.actionName,
        StatusName: selectedStatusNode.data.StatusName,
        data: {
          actionName: actionObj.actionName,
          taskType: "Status",
          taskId: 0,
          taskName: x.data.StageStatus,
          endWfStageStatus: "",
          sortOrder: 0,
          startFunction: "",
          endFunction: "",
          endWfstageStatusId: 0,
          isActive: true,
          createdDate: formatDate(new Date()),
        },
      });
    });
    setEdgeArr([...EdgeArr, ...arr]);

    setActionObj({ actionName: "", ActionArr: [] });
  };
  const onStatusUpdate = () => {
    NodeArr.forEach((x1, i1) => {
      if (x1.id === selectedStatusNode.id) {
        let backColor = "";
        let nodeIO = "";
        if (obj1.statusType === "Start") {
          backColor = "#76ff03";
          nodeIO = "input";
        }
        if (obj1.statusType === "Transition") {
          backColor = "#2196f3";
          nodeIO = "";
        }
        if (obj1.statusType === "End") {
          backColor = "#ff1744";
          nodeIO = "output";
        }
        NodeArr[i1].data.StatusName = obj1.statusName;
        NodeArr[i1].data.label = obj1.statusName;
        NodeArr[i1].data.StatusType = obj1.statusType;
        NodeArr[i1].type = nodeIO;
        NodeArr[i1].style.background = backColor;
      }
    });

    setNodeArr(NodeArr);
    setModalFlag1(false);
    setObj1({
      stageName: "",
      statusName: "",
      mode: "",
      stageStateChange: true,
      statusId: 0,
      statusType: "",
    });
  };

  const [ConnectStart, setConnectStart] = useState("");
  const [ConnectEnd, setConnectEnd] = useState("");
  const onEdgeClick = (e, v) => {
    console.log("onEdgeClick", e, v);

    EdgeArr.forEach((x1) => {
      if (v.id === x1.id) {
        setConnectStart(v.source);
        setConnectEnd(v.target);
        // if (x1.data) {
        //   setActionName1(x1.label);
        // }
        if (v.label) setActionName1(v.label);
        setModelName("onEdgeClick");
        setModalFlag1(true);
      }
    });
  };

  const onConnectStart = (e) => {
    console.log("ConnectStart", ConnectStart, e);
    // console.log(e.target.dataset.id.split("-")[0]);
    // setConnectStart(e.target.dataset.id.split("-")[0]);
    setConnectStart(e.target.dataset.nodeid);
  };
  const onConnectEnd = (e) => {
    console.log("ConnectEnd", e, ConnectEnd);
    if (e.target.dataset.id) {
      // console.log(e.target.dataset.id.split("-")[0]);
      // setConnectEnd(e.target.dataset.id.split("-")[0]);
      setConnectEnd(e.target.dataset.nodeid);
      setModelName("onEdgeClick");
      setActionName1("");
      setModalFlag1(true);
    }
  };

  const onEdgeSave = () => {
    EdgeArr.forEach((x1, i1) => {
      if (x1.source === ConnectStart && x1.target === ConnectEnd) {
        NodeArr.forEach((x2) => {
          if (x2.id === ConnectStart) {
            EdgeArr[i1].ActionName = ActionName1;
            EdgeArr[i1].StatusName = x2.data.StatusName;
            EdgeArr[i1].animated = true;
            EdgeArr[i1].label = ActionName1;
            EdgeArr[i1].data = {};
            EdgeArr[i1].data.actionName = ActionName1;
            EdgeArr[i1].data.taskType = "Status";
            EdgeArr[i1].data.taskId = 0;

            EdgeArr[i1].data.endWfStageStatus = "";
            EdgeArr[i1].data.sortOrder = 0;
            EdgeArr[i1].data.startFunction = "";
            EdgeArr[i1].data.endFunction = "";
            EdgeArr[i1].data.endWfstageStatusId = 0;
            EdgeArr[i1].data.isActive = true;
            EdgeArr[i1].data.createdDate = formatDate(new Date());
          }
        });
        NodeArr.forEach((x2) => {
          if (x2.id === ConnectEnd) EdgeArr[i1].data.taskName = x2.data.StageStatus;
        });
      }
    });
    setEdgeArr([...EdgeArr]);
    setActionName1("");
    setConnectStart("");
    setConnectEnd("");
    setModalFlag1(false);
  };

  const onSave = async () => {
    console.log("EdgeArr", EdgeArr);
    const lobj = { wfname: workflowName, wfStageDTO: [] };
    const tArr1 = [];

    // pushing Stages
    NodeArr.forEach((x1) => {
      if (x1.data.nodeType === "stage") {
        tArr1.push({
          stageName: x1.data.StageName,
          stageType: "",
          stageId: 0,
          wfstageStatusDTO: [],
        });
      }
    });

    // pushing status
    tArr1.forEach((x1, i1) => {
      NodeArr.forEach((x2) => {
        if (x2.data.nodeType === "status") {
          if (x1.stageName === x2.data.StageName) {
            tArr1[i1].wfstageStatusDTO.push({
              stageName: x2.data.StageName,
              statusName: x2.data.StatusName,
              mode: "",
              stageStateChange: true,
              statusId: 0,
              statusType: x2.data.StatusType,
              wfstageStatusActionDTO: [],
              wfgroupDTO: [],
            });
          }
        }
      });
    });
    // pushing actions
    tArr1.forEach((x1, i1) => {
      x1.wfstageStatusDTO.forEach((x2, i2) => {
        const StatusActionArr = EdgeArr.filter((xx1) => xx1.StatusName === x2.statusName);

        const actionNameArrWithDuplicate = [];
        StatusActionArr.forEach((x3) => {
          actionNameArrWithDuplicate.push(x3.ActionName);
        });
        const actionNameArrWithoutDuplicate = actionNameArrWithDuplicate.filter(
          (item, index) => actionNameArrWithDuplicate.indexOf(item) === index
        );
        actionNameArrWithoutDuplicate.forEach((x3) => {
          const tObj = { actionName: x3, wfactionTaskMappingDTO: [] };
          StatusActionArr.forEach((x4) => {
            if (x3 === x4.ActionName) tObj.wfactionTaskMappingDTO.push(x4.data);
          });
          tArr1[i1].wfstageStatusDTO[i2].wfstageStatusActionDTO.push(tObj);
        });
      });
    });
    lobj.wfStageDTO = tArr1;
    await CreateWorkflowProcess(lobj).then((res) => {
      if (res.data.status === 2) swal({ icon: "success", text: res.data.responseMessage });
      else swal({ icon: "error", text: res.data.responseMessage });
    });
    console.log("lobj", lobj);
    setModalFlag1(false);
  };
  return (
    <MDBox>
      <Accordion>
        <Grid container spacing={2}>
          {(Mode === "Create" || Mode === "Edit") && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2} p={2}>
                <MDButton onClick={() => openModel("CreateStage")}>Add Stage</MDButton>
                <MDButton onClick={() => openModel("CreateStatus")}>Add Status</MDButton>
                {/* <MDButton>Add Action</MDButton> */}
                <MDButton onClick={onSaving}>
                  {Mode === "Create" ? "Save Workflow" : "Update WorkFlow"}
                </MDButton>
              </Stack>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox width="100%" height="600px" p={3}>
              <ReactFlow
                nodes={NodeArr}
                edges={EdgeArr}
                onNodesChange={(Mode === "Create" || Mode === "Edit") && onNodesChange}
                onEdgesChange={(Mode === "Create" || Mode === "Edit") && onEdgesChange}
                onConnect={(Mode === "Create" || Mode === "Edit") && onConnect}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
                onNodeClick={(Mode === "Create" || Mode === "Edit") && onNodeClick}
                // nodeTypes={nodeTypes}
                nodesDraggable={false}
                // onConnectEnd={onDrag}
                onConnectStart={(Mode === "Create" || Mode === "Edit") && onConnectStart}
                onConnectEnd={(Mode === "Create" || Mode === "Edit") && onConnectEnd}
                onEdgeClick={(Mode === "Create" || Mode === "Edit") && onEdgeClick}
              >
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls position="top" />
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </MDBox>
          </Grid>
        </Grid>
      </Accordion>
      <Modal
        open={ModalFlag1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MDBox sx={{ bgcolor: "#FFFFFF" }}>
          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
            <IconButton onClick={onModelClose1}>
              <ClearIcon />
            </IconButton>
          </MDBox>

          {ModelName === "CreateStage" && (
            <Grid container spacing={4} p={5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput
                  label="Workflow Stage Name"
                  name="stageName"
                  value={stageName}
                  onChange={onStageNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                  <Stack direction="row" spacing={2}>
                    {!StageModelFlags.edit && <MDButton onClick={onStageAdd}>ADD</MDButton>}
                    {StageModelFlags.edit && (
                      <MDButton onClick={() => onEditStageClick("edit")}>Update</MDButton>
                    )}
                    {StageModelFlags.edit && (
                      <MDButton onClick={() => onEditStageClick("delete")}>Delete Stage</MDButton>
                    )}
                  </Stack>
                </MDBox>
              </Grid>
            </Grid>
          )}
          {ModelName === "CreateStatus" && (
            <Grid container spacing={4} p={5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Autocomplete
                  fullWidth
                  options={NodeArr.filter((x) => x.data.nodeType === "stage")}
                  getOptionLabel={(option) => option.data.StageName}
                  value={{ data: { StageName: obj1.stageName } }}
                  sx={sty}
                  onChange={(e, v) => onChangeAddingStatus(e, v.data.StageName, "stageName")}
                  renderInput={(params) => <MDInput {...params} label="Stage Name" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput
                  label="Workflow Status"
                  value={obj1.statusName}
                  onChange={(e) => onChangeAddingStatus(e, e.target.value, "statusName")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Autocomplete
                  fullWidth
                  options={StatusTypeList}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: obj1.statusType }}
                  sx={sty}
                  onChange={(e, v) => onChangeAddingStatus(e, v.mValue, "statusType")}
                  renderInput={(params) => <MDInput {...params} label="Status Type" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                  <MDButton onClick={onAddStatus}>ADD</MDButton>
                </MDBox>
              </Grid>
            </Grid>
          )}
          {ModelName === "onStatus" && (
            <Grid container spacing={4} p={5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row">
                  <Tooltip title="Edit Status" placement="bottom" arrow>
                    <IconButton onClick={() => onClickStatusModel("edit")}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Status" placement="bottom" arrow>
                    <IconButton onClick={() => onClickStatusModel("delete")}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Create Action" placement="bottom" arrow>
                    <IconButton onClick={() => onClickStatusModel("action")}>
                      <OpenInFullIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>

              {StatusModelFlags.edit && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Status Name"
                    value={obj1.statusName}
                    onChange={(e) => onChangeAddingStatus(e, e.target.value, "statusName")}
                  />
                </Grid>
              )}
              {StatusModelFlags.edit && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Autocomplete
                    fullWidth
                    options={StatusTypeList}
                    getOptionLabel={(option) => option.mValue}
                    value={{ mValue: obj1.statusType }}
                    sx={sty}
                    onChange={(e, v) => onChangeAddingStatus(e, v.mValue, "statusType")}
                    renderInput={(params) => <MDInput {...params} label="Status Type" />}
                  />
                </Grid>
              )}

              {StatusModelFlags.action && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Action Name"
                    name="actionName"
                    value={actionObj.actionName}
                    onChange={(e) => onActionChange(e, e.target.value, "actionName")}
                  />
                </Grid>
              )}
              {StatusModelFlags.action && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Autocomplete
                    multiple
                    fullWidth
                    options={NodeArr.filter((x) => x.data.nodeType === "status")
                      .filter((x) => x.data.StatusName !== selectedStatusNode.data.StatusName)
                      .filter((x) => x.type !== "input")}
                    getOptionLabel={(option) => option.data.StageStatus}
                    value={actionObj.ActionArr}
                    sx={sty}
                    onChange={(e, v) => onActionChange(e, v, "StageStatus")}
                    renderInput={(params) => <MDInput {...params} label="Target Status" />}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {StatusModelFlags.edit && (
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <MDButton onClick={onStatusUpdate}>UPDATE</MDButton>
                  </MDBox>
                )}
                {StatusModelFlags.action && (
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <MDButton onClick={onActionAdd}>ADD</MDButton>
                  </MDBox>
                )}
              </Grid>
            </Grid>
          )}
          {ModelName === "createWorkflow" && (
            <Grid container spacing={4} p={5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput
                  label="Workflow Name"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <MDButton onClick={onSave}>SAVE</MDButton>
                </MDBox>
              </Grid>
            </Grid>
          )}
          {ModelName === "onEdgeClick" && (
            <Grid container spacing={4} p={5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput
                  label="Action Name"
                  value={ActionName1}
                  onChange={(e) => setActionName1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <Stack direction="row" spacing={2}>
                    <MDButton onClick={onEdgeSave}>SAVE</MDButton>
                    <MDButton>Delete</MDButton>
                  </Stack>
                </MDBox>
              </Grid>
            </Grid>
          )}
        </MDBox>
      </Modal>
    </MDBox>
  );
}
export default WFVisualConfig;
