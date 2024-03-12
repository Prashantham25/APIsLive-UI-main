import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Grid,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  Stack,
  //   Card,
  //   CardActions,
  //   CardContent,
  //   Button,
  // IconButton,
  // //   //   Switch,
  // Modal,
  // //   Stack,
  // Switch,
  // Tooltip,
} from "@mui/material";
import { Position } from "reactflow";
// import { DataGrid } from "@mui/x-data-grid";
// // import CountUp from "react-countup";
// import swal from "sweetalert";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import { GetAllWfprocess, GetAllWfstage, GetAllWfstageStatus, GetAction } from "../data";

// import { StatusTypeList, TypeList, ItemTypeList } from "../data/JsonData";
import MDTypography from "../../../../../components/MDTypography/index";
import MDInput from "../../../../../components/MDInput/index";
import MDButton from "../../../../../components/MDButton/index";
import MDBox from "../../../../../components/MDBox/index";
// import WFVisualConfig from "./WFVisualConfig";
import WFVisualConfig from "./WFVisualConfig";
import WFManualConfig from "./WFManualConfig";

function WFConfigurator() {
  const [MM, setMM] = useState({ Method: "", Mode: "", WFProcess: { mValue: "", mID: "" } });
  const [WorkflowArr, setWorkflowArr] = useState([]);
  const [Proc, setProc] = useState(false);

  const [Node, setNode] = useState([]);
  const [Edge, setEdge] = useState([]);

  const [AllStatus, setAllStatus] = useState([]);
  const [AllStageArr, setAllStageArr] = useState([]);
  const [AllActions, setAllAction] = useState([]);

  const sty = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
    },
  };

  const onChange = async (e, v, name) => {
    setProc(false);
    if (v === "Create") {
      setNode([]);
      setEdge([]);
      setAllStatus([]);
      setAllStageArr([]);
      setAllAction([]);
    }
    if (name === "WFProcess") {
      console.log("vvvv", v);
      const res2 = await GetAllWfstage(v.mID);
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

    setMM({ ...MM, [name]: v });
  };

  const onProceed = () => {
    const tArr = [];
    const eArr = [];
    let x1c = 0;
    let y1c = 0;

    AllStageArr.forEach((x1) => {
      tArr.push({
        id: x1.wfstageId.toString(),
        data: { label: x1.stageName, nodeType: "stage", StageName: x1.stageName },
        type: "input",
        style: {
          background: "#1769aa",
          color: "white",
        },
        position: { x: x1c, y: y1c },
      });
      let y2c = 100;
      AllStatus.forEach((x2) => {
        if (x1.wfstageId === x2.wfstageId) {
          let typeOfNode = "";
          let backColor = "";
          if (x2.statusType === "Start") {
            typeOfNode = "input";
            backColor = "#76ff03";
          }
          if (x2.statusType === "Transition") {
            typeOfNode = "";
            backColor = "#2196f3";
          }
          if (x2.statusType === "End") {
            typeOfNode = "output";
            backColor = "#ff1744";
          }
          tArr.push({
            id: x2.wfstageStatusId.toString(),
            data: {
              label: x2.statusName,
              StatusName: x2.statusName,
              StageName: x1.stageName,
              StageStatus: x1.stageName.concat("-", x2.statusName),
              StatusType: x2.statusType,
              nodeType: "status",
            },
            className: "circle",
            type: typeOfNode,
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
    console.log("tArr", tArr);
    console.log("eArr", eArr);

    setNode([...tArr]);
    setEdge([...eArr]);
    setProc(true);
  };
  const onSwitch = () => {
    if (MM.Method === "Manual") setMM({ ...MM, Method: "Visual" });
    if (MM.Method === "Visual") setMM({ ...MM, Method: "Manual" });
  };
  console.log("NodeView", Node);
  console.log("EdgeView", Edge);
  useEffect(async () => {
    const res = await GetAllWfprocess();
    setWorkflowArr(res.data);
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
            Workflow Configuration
          </MDTypography>
        </AccordionSummary>

        {true && (
          <AccordionDetails>
            <Grid container spacing={2} p={3}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  fullWidth
                  options={["Manual", "Visual"]}
                  getOptionLabel={(option) => option}
                  value={MM.Method}
                  sx={sty}
                  onChange={(e, v) => onChange(e, v, "Method")}
                  renderInput={(params) => <MDInput {...params} label="Workflow Method" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  fullWidth
                  options={["Create", "Edit", "View"]}
                  getOptionLabel={(option) => option}
                  sx={sty}
                  onChange={(e, v) => onChange(e, v, "Mode")}
                  renderInput={(params) => <MDInput {...params} label="Workflow Mode" />}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Collapse
                  in={MM.Mode === "Edit" || MM.Mode === "View"}
                  out={MM.Mode !== "Edit" || MM.Mode !== "View"}
                >
                  <Autocomplete
                    fullWidth
                    options={WorkflowArr}
                    getOptionLabel={(option) => option.mValue}
                    value={{ mValue: MM.WFProcess.mValue }}
                    sx={sty}
                    onChange={(e, v) => onChange(e, v, "WFProcess")}
                    renderInput={(params) => <MDInput {...params} label="Workflow Process" />}
                  />
                </Collapse>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <MDButton onClick={onProceed}>Proceed</MDButton>
                  <MDButton onClick={onSwitch}>Switch</MDButton>
                </Stack>
              </Grid>
            </Grid>
          </AccordionDetails>
        )}

        <Collapse in={Proc && MM.Method === "Manual"} out={Proc && MM.Method !== "Manual"}>
          <WFManualConfig />
        </Collapse>

        <Collapse in={Proc && MM.Method === "Visual"} out={Proc && MM.Method !== "Visual"}>
          <WFVisualConfig Node={[...Node]} Edge={[...Edge]} Mode={MM.Mode} WFP={MM.WFProcess} />
        </Collapse>
      </Accordion>
    </MDBox>
  );
}

// function WFConfigurator() {
//   const [obj, setObj] = useState({ wfname: "", wfStageDTO: [] });
//   const [obj1, setObj1] = useState({
//     stageId: 0,
//     stageName: "",
//     stageType: "",
//     wfstageStatusDTO: [],
//   });
//   const [obj2, setObj2] = useState({
//     stageName: "",
//     statusName: "",
//     mode: "",
//     stageStateChange: true,
//     statusId: 0,
//     statusType: "",
//     wfstageStatusActionDTO: [],
//     wfgroupDTO: [],
//   });
//   const [FunctionArr, setFunctionArr] = useState([]);
//   const [AllWfProcess, setAllWfProcess] = useState([]);
//   const [row1, setRows1] = useState([]);
//   const [row2, setRows2] = useState([]);
//   const [row3, setRows3] = useState([
//     {
//       actionName: "",
//       taskType: "",
//       taskId: 0,
//       taskName: "",
//       endWfStageStatus: "",
//       sortOrder: 0,
//       startFunction: "",
//       endFunction: "",
//       endWfstageStatusId: 0,
//       isActive: true,
//       createdDate: formatDate(new Date()),
//     },
//   ]);
//   console.log("row2", row2);
//   const column1 = [{ field: "stageName", header: "WorkFlow Stage Name" }];
//   const column2 = [
//     { field: "stageName", header: "WorkFlow Stage", width: 300 },
//     { field: "statusName", header: "WorkFlow Status", width: 300 },
//     { field: "statusType", header: "Status Type", width: 300 },
//     {
//       field: "action",
//       header: "Action",
//       width: 300,
//       renderCell: (p) => {
//         const [ModalFlag, setModalFlag] = useState(false);
//         const [ActionArr, setActionArr] = useState(p.row.wfstageStatusActionDTO); // Data grid rows
//         const [GroupArr, setGroupArr] = useState(p.row.wfgroupDTO); // Data grid rows
//         const [GroupDetailsArr, setGroupDetailsArr] = useState([]);
//         const [ActionName, setActionName] = useState(""); // Action name read in MDInput
//         const [GroupName, setGroupName] = useState(""); // Group name read in MDInput
//         const [EditGroupName, setEditGroupName] = useState(""); // group name on select from datagrid for edit
//         const [switchVal, setSwitchVal] = useState("");

//         const [GroupFlag, setGroupFlag] = useState(false);
//         const [GroupDetailsObj, setGroupDetailsObj] = useState({
//           id: "",
//           groupName: "",
//           itemType: "",
//           name: "",
//           action: "",
//         });
//         const sty = {
//           "& .MuiOutlinedInput-root": {
//             padding: "3px!important",
//           },
//         };
//         const onAutoChange = (e, v, name, pp) => {
//           console.log(e, v, name, pp);
//           row3.forEach((x, i) => {
//             if (x.createdDate === pp.row.createdDate) {
//               row3[i][name] = v;
//             }
//           });
//           setRows3([...row3]);
//         };
//         const columns3 = [
//           {
//             field: "actionName",
//             headerName: "Action Name",
//             width: 200,
//             renderCell: (pp) => (
//               <Autocomplete
//                 fullWidth
//                 options={ActionArr}
//                 getOptionLabel={(option) => option.actionName}
//                 // value={{ stageName: obj2.stageName }}
//                 sx={sty}
//                 onChange={(e, v) => onAutoChange(e, v.actionName, "actionName", pp)}
//                 renderInput={(params) => <MDInput {...params} />}
//               />
//             ),
//           },
//           {
//             field: "taskType",
//             headerName: "Type",
//             width: 200,
//             renderCell: (pp) => (
//               <Autocomplete
//                 fullWidth
//                 options={TypeList}
//                 getOptionLabel={(option) => option.mValue}
//                 // value={{ stageName: obj2.stageName }}
//                 sx={sty}
//                 onChange={(e, v) => onAutoChange(e, v.mValue, "taskType", pp)}
//                 renderInput={(params) => <MDInput {...params} />}
//               />
//             ),
//           },
//           {
//             field: "taskName",
//             headerName: "Item",
//             width: 200,
//             renderCell: (pp) => {
//               // const [TaskArr, setTaskArr] = useState([]);
//               // // const [TaskLabel, setTAskLabel] = useState("");
//               // if (pp.row.taskType === "Workflow") {
//               //   setTaskArr(AllWfProcess);
//               //   // setTAskLabel("mValue");
//               // } else if (pp.row.taskType === "Group") {
//               //   setTaskArr(AllWfProcess);
//               //   // setTAskLabel("groupName");
//               // } else if (pp.row.taskType === "Status") setTaskArr([]);
//               // else if (pp.row.taskType === "Function") setTaskArr([]);

//               const aa = pp.row.taskType;
//               console.log("TaskArr", aa);
//               return (
//                 <Autocomplete
//                   fullWidth
//                   // options={aa === "Group" ? GroupArr : []}
//                   options={row2.filter((xx) => xx.id !== p.row.id)}
//                   getOptionLabel={(option) => option.item}
//                   // value={{ stageName: obj2.stageName }}
//                   sx={sty}
//                   onChange={(e, v) => onAutoChange(e, v.item, "taskName", pp)}
//                   renderInput={(params) => <MDInput {...params} />}
//                 />
//               );
//             },
//           },
//           {
//             field: "startFunction",
//             headerName: "Init Func",
//             width: 300,
//             renderCell: (pp) => (
//               <Autocomplete
//                 fullWidth
//                 options={FunctionArr}
//                 getOptionLabel={(option) => option.dispatcherTaskName}
//                 // value={{ stageName: obj2.stageName }}
//                 sx={sty}
//                 onChange={(e, v) => onAutoChange(e, v.dispatcherTaskName, "startFunction", pp)}
//                 renderInput={(params) => <MDInput {...params} />}
//               />
//             ),
//           },
//           {
//             field: "endWfStageStatus",
//             headerName: "End Status",
//             width: 200,
//             renderCell: (pp) => (
//               <Autocomplete
//                 fullWidth
//                 options={[]}
//                 // getOptionLabel={(option) => option.dispatcherTaskName}
//                 // value={{ stageName: obj2.stageName }}
//                 sx={sty}
//                 onChange={(e, v) => onAutoChange(e, v, "endWfStageStatus", pp)}
//                 renderInput={(params) => <MDInput {...params} />}
//               />
//             ),
//           },
//           {
//             field: "endFunction",
//             headerName: "End Func",
//             width: 300,
//             renderCell: (pp) => (
//               <Autocomplete
//                 fullWidth
//                 options={FunctionArr}
//                 getOptionLabel={(option) => option.dispatcherTaskName}
//                 // value={{ stageName: obj2.stageName }}
//                 sx={sty}
//                 onChange={(e, v) => onAutoChange(e, v.dispatcherTaskName, "endFunction", pp)}
//                 renderInput={(params) => <MDInput {...params} />}
//               />
//             ),
//           },
//           // {
//           //   field: "execOrder",
//           //   headerName: "Exec Order",
//           //   width: 70,
//           // },
//           {
//             field: "act",
//             headerName: "",
//             width: 200,
//             renderCell: (pp) => {
//               const onAddRow = () => {
//                 setRows3([
//                   ...row3,
//                   {
//                     actionName: "",
//                     taskType: "",
//                     taskId: 0,
//                     taskName: "",
//                     endWfStageStatus: "",
//                     sortOrder: 0,
//                     startFunction: "",
//                     endFunction: "",
//                     endWfstageStatusId: 0,
//                     isActive: true,
//                     createdDate: new Date(),
//                   },
//                 ]);
//               };
//               const onRowDelete = () => {
//                 if (row3.length > 1) {
//                   const newArr1 = row3.filter((xy) => xy.createdDate !== pp.row.createdDate);
//                   setRows3([...newArr1]);
//                 }
//               };
//               return (
//                 <>
//                   <IconButton onClick={onAddRow}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton>
//                     <DeleteIcon onClick={onRowDelete} />
//                   </IconButton>
//                 </>
//               );
//             },
//           },
//         ];

//         const onEdit = () => {
//           setModalFlag(true);
//           console.log(p);
//         };
//         const onDelete = () => {
//           const arr = row2.filter((x) => x.id !== p.row.id);
//           arr.forEach((x, i) => {
//             arr[i].id = i;
//           });
//           setRows2([...arr]);
//         };
//         const onClose = () => {
//           setGroupArr(p.row.wfgroupDTO);
//           setActionArr(p.row.wfstageStatusActionDTO);

//           const tArr = [];
//           let ind = 0;
//           p.row.wfgroupDTO.forEach((x1) => {
//             x1.wfgroupDetails.forEach((x2) => {
//               tArr.push({
//                 id: ind,
//                 groupName: x1.groupName,
//                 itemType: x2.itemType,
//                 name: x2.name,
//                 action: x2.action,
//               });
//               ind += 1;
//             });
//           });
//           setGroupDetailsArr([...tArr]);
//           setModalFlag(false);
//         };

//         const onAddAction = () => {
//           let actionExist = true;

//           ActionArr.forEach((x1) => {
//             if (x1.actionName === ActionName) {
//               actionExist = false;
//               swal({ icon: "error", text: `Action ${ActionName}Already Added` });
//               setActionName("");
//             }
//           });

//           if (actionExist) {
//             setActionArr([...ActionArr, { actionName: ActionName, wfactionTaskMappingDTO: [] }]);
//             setActionName("");
//           }
//         };

//         const onAddGroup = () => {
//           let groupExist = true;
//           GroupArr.forEach((x1) => {
//             if (x1.groupName === GroupName) {
//               groupExist = false;
//               swal({ icon: "error", text: `Group ${GroupName}Already Added` });
//               setGroupName("");
//             }
//           });

//           if (groupExist) {
//             setGroupArr([...GroupArr, { groupName: GroupName, wfgroupDetails: [] }]);
//             setGroupName("");
//           }
//           console.log("row2", row2);
//         };

//         const onMDChanger = (e) => {
//           if (e.target.name === "ActionName") setActionName(e.target.value);
//           if (e.target.name === "GroupName") setGroupName(e.target.value);
//         };

//         const onSaveBtn = () => {
//           console.log("row2-----", row2);

//           ActionArr.forEach((x1, i1) => {
//             const tArr = [];
//             row3.forEach((x2) => {
//               if (x1.actionName === x2.actionName) tArr.push(x2);
//             });
//             ActionArr[i1].wfactionTaskMappingDTO = [...tArr];
//           });

//           GroupArr.forEach((x1, i1) => {
//             const tArr = [];
//             GroupDetailsArr.forEach((x2) => {
//               if (x1.groupName === x2.groupName)
//                 tArr.push({
//                   itemType: x2.itemType,
//                   name: x2.name,
//                   action: x2.action,
//                 });
//             });
//             GroupArr[i1].wfgroupDetails = [...tArr];
//           });

//           row2.forEach((x, i) => {
//             if (x.id === p.row.id) {
//               row2[i].wfstageStatusActionDTO = [...ActionArr];
//               row2[i].wfgroupDTO = [...GroupArr];
//             }
//           });
//           console.log("row2", row2);
//           setRows2([...row2]);
//           setModalFlag(false);
//         };

//         const handelSwitch = (e) => {
//           console.log("e.target.checked", e.target.checked);
//           if (e.target.checked === true) setSwitchVal("auto");
//           else setSwitchVal("manual");
//         };

//         const onGroupDetailsAutoChange = (e, v, name) => {
//           setGroupDetailsObj({ ...GroupDetailsObj, [name]: v.mValue });
//         };

//         const AddGroupDetails = () => {
//           GroupDetailsObj.id = GroupDetailsArr.length;
//           GroupDetailsObj.groupName = EditGroupName;
//           setGroupDetailsArr([...GroupDetailsArr, { ...GroupDetailsObj }]);
//           setGroupDetailsObj({ id: "", groupName: "", itemType: "", name: "", action: "" });
//         };

//         return (
//           <>
//             <IconButton onClick={onEdit} disabled={p.row.statusType === "End"}>
//               <EditIcon />
//             </IconButton>
//             <IconButton>
//               <DeleteIcon onClick={onDelete} />
//             </IconButton>
//             <Modal
//               open={ModalFlag}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 border: "2px solid black",
//                 overflowY: "scroll",
//               }}
//             >
//               <Accordion>
//                 <Grid container spacing={4} p={5}>
//                   <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                     <MDBox sx={{ display: "flex", justifyContent: "right" }}>
//                       <MDButton onClick={onClose}>X</MDButton>
//                     </MDBox>
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                     <MDBox sx={{ display: "flex", justifyContent: "center" }}>
//                       <MDTypography>Transition Definition</MDTypography>
//                     </MDBox>
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//                     <MDTypography>
//                       {p.row.stageName}
//                       {" - "}
//                       {p.row.statusName}
//                     </MDTypography>
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//                     <Tooltip title={switchVal} placement="bottom" arrow>
//                       <Switch
//                         checked={switchVal === "auto"}
//                         onChange={handelSwitch}
//                         color="primary"
//                       />
//                     </Tooltip>
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                     <MDInput
//                       label="Action Name"
//                       name="ActionName"
//                       value={ActionName}
//                       onChange={onMDChanger}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
//                     <MDButton onClick={onAddAction}>ADD</MDButton>
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//                     {ActionArr.length > 0 && (
//                       <DataGrid
//                         autoHeight
//                         rows={ActionArr}
//                         columns={[
//                           { field: "actionName", headerName: "Action Name", width: 250 },
//                           { field: "Action", headerName: "Action", width: 250 },
//                         ]}
//                         getRowId={(option) => option.actionName}
//                       />
//                     )}
//                   </Grid>

//                   <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
//                   <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                     <MDInput
//                       label="Group Name"
//                       name="GroupName"
//                       value={GroupName}
//                       onChange={onMDChanger}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
//                     <MDButton onClick={onAddGroup}>ADD</MDButton>
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
//                   <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//                     {GroupArr.length > 0 && (
//                       <>
//                         <MDTypography>Groups</MDTypography>
//                         <DataGrid
//                           autoHeight
//                           rows={GroupArr}
//                           columns={[
//                             { field: "groupName", headerName: "Group Name", width: 250 },
//                             {
//                               field: "Action",
//                               headerName: "Action",
//                               width: 250,
//                               renderCell: (ppp) => {
//                                 const onEditGroup = () => {
//                                   setGroupFlag(true);
//                                   setEditGroupName(ppp.row.groupName);
//                                 };
//                                 return (
//                                   <>
//                                     <IconButton>
//                                       <EditIcon onClick={onEditGroup} />
//                                     </IconButton>
//                                     <IconButton>
//                                       <DeleteIcon />
//                                     </IconButton>
//                                   </>
//                                 );
//                               },
//                             },
//                           ]}
//                           getRowId={(option) => option.groupName}
//                         />
//                       </>
//                     )}
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//                     {GroupFlag && (
//                       <>
//                         <MDTypography>Group : {EditGroupName}</MDTypography>
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                             <Autocomplete
//                               fullWidth
//                               options={ItemTypeList}
//                               getOptionLabel={(option) => option.mValue}
//                               value={{ mValue: GroupDetailsObj.itemType }}
//                               sx={sty}
//                               onChange={(e, v) => onGroupDetailsAutoChange(e, v, "itemType")}
//                               renderInput={(params) => <MDInput {...params} label="Item Type" />}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//                             <Autocomplete
//                               fullWidth
//                               options={AllWfProcess}
//                               getOptionLabel={(option) => option.mValue}
//                               value={{ mValue: GroupDetailsObj.name }}
//                               sx={sty}
//                               onChange={(e, v) => onGroupDetailsAutoChange(e, v, "name")}
//                               renderInput={(params) => <MDInput {...params} label="Item" />}
//                             />
//                           </Grid>
//                           <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
//                             <MDButton onClick={AddGroupDetails}>ADD</MDButton>
//                           </Grid>
//                         </Grid>
//                       </>
//                     )}
//                   </Grid>

//                   <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//                     <MDTypography>Group Details</MDTypography>
//                     <DataGrid
//                       autoHeight
//                       rows={GroupDetailsArr}
//                       columns={[
//                         { field: "itemType", headerName: "Type", width: 250 },
//                         { field: "name", headerName: "item", width: 250 },
//                         { field: "act", headerName: "", width: 250 },
//                       ]}
//                       // getRowId={(option) => option.createdDate}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                     <MDTypography>Transition</MDTypography>
//                     <DataGrid
//                       autoHeight
//                       rows={row3}
//                       columns={columns3}
//                       getRowId={(option) => option.createdDate}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                     <MDBox sx={{ display: "flex", justifyContent: "right" }}>
//                       <MDButton onClick={onSaveBtn}>SAVE</MDButton>
//                     </MDBox>
//                   </Grid>
//                 </Grid>
//               </Accordion>
//             </Modal>
//           </>
//         );
//       },
//     },
//   ];
//   const onMDChange1 = (e) => {
//     if (e.target.name === "wfname") setObj({ ...obj, [e.target.name]: e.target.value });
//     if (e.target.name === "stageName") setObj1({ ...obj1, [e.target.name]: e.target.value });
//   };

//   const onAddStage = () => {
//     obj1.id = row1.length;
//     setRows1([...row1, obj1]);
//     setObj1({
//       stageId: 0,
//       stageName: "",
//       stageType: "",
//       wfstageStatusDTO: [],
//     });
//   };

//   const [visualVar, setVisualVar] = useState(true);
//   const onVisual = () => {
//     setVisualVar(false);
//   };

//   const onAddStatus = () => {
//     const concatName = obj2.stageName.concat("-", obj2.statusName);
//     obj2.id = row2.length;
//     obj2.item = concatName;
//     setRows2([...row2, obj2]);

//     setObj2({
//       stageName: "",
//       statusName: "",
//       mode: "",
//       stageStateChange: true,
//       statusId: 0,
//       statusType: "",
//       wfstageStatusActionDTO: [],
//       wfgroupDTO: [],
//     });
//   };

//   const onChange2 = (e, v, name) => {
//     if (name === "stageName") setObj2({ ...obj2, [name]: v.stageName });
//     if (name === "statusName") setObj2({ ...obj2, [name]: e.target.value });
//     if (name === "statusType") setObj2({ ...obj2, [name]: v.mValue });
//   };

//   const onSave = async () => {
//     row2.forEach((x, i) => {
//       delete row2[i].id;
//     });

//     row1.forEach((x, i) => {
//       delete row1[i].id;
//     });

//     row2.forEach((x1) => {
//       row1.forEach((x2, i2) => {
//         if (x1.stageName === x2.stageName) row1[i2].wfstageStatusDTO.push(x1);
//       });
//     });

//     obj.wfStageDTO = row1;
//     await CreateWorkflowProcess(obj).then((res) => {
//       if (res.data.status === 2) swal({ icon: "success", text: res.data.responseMessage });
//       else swal({ icon: "error", text: res.data.responseMessage });

//       setRows1([]);
//       setRows2([]);
//     });
//     console.log(obj);
//   };

//   useEffect(async () => {
//     const res1 = await GetDispatcherTask();
//     setFunctionArr(res1.data);
//     const res2 = await GetAllWfprocess();
//     setAllWfProcess(res2.data);
//   }, []);
//   return (
//     <MDBox>
//       <Accordion
//         defaultExpanded
//         disableGutters
//         sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
//       >
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <MDTypography variant="body1" color="primary">
//             Workflow Configuration
//           </MDTypography>
//         </AccordionSummary>
//         <AccordionDetails>
//           {visualVar ? (
//             <Grid container spacing={2} p={3}>
//               <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                 <MDInput
//                   label="Workflow Name"
//                   name="wfname"
//                   value={obj.wfname}
//                   onChange={onMDChange1}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                 <MDInput
//                   label="Workflow Stage Name"
//                   name="stageName"
//                   value={obj1.stageName}
//                   onChange={onMDChange1}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                 <MDButton onClick={onAddStage}>ADD</MDButton>
//               </Grid>
//               <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                 <MDButton onClick={onVisual}>Visual Configuration</MDButton>
//               </Grid>
//             </Grid>
//           ) : (
//             <WFVisualConfig />
//           )}
//           {row1.length > 0 && (
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                 <DataGrid autoHeight rows={row1} columns={column1} />
//               </Grid>
//               <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                 <Autocomplete
//                   fullWidth
//                   options={row1}
//                   getOptionLabel={(option) => option.stageName}
//                   value={{ stageName: obj2.stageName }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       padding: "4px!important",
//                     },
//                   }}
//                   onChange={(e, v) => onChange2(e, v, "stageName")}
//                   renderInput={(params) => <MDInput {...params} label="Stage Name" />}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                 <MDInput
//                   label="Workflow Status"
//                   name="statusName"
//                   value={obj2.statusName}
//                   onChange={(e, v) => onChange2(e, v, "statusName")}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                 <Autocomplete
//                   fullWidth
//                   options={StatusTypeList}
//                   getOptionLabel={(option) => option.mValue}
//                   value={{ mValue: obj2.statusType }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       padding: "4px!important",
//                     },
//                   }}
//                   onChange={(e, v) => onChange2(e, v, "statusType")}
//                   renderInput={(params) => <MDInput {...params} label="Status Type" />}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                 <MDButton onClick={onAddStatus}>ADD</MDButton>
//               </Grid>
//             </Grid>
//           )}
//           <Grid container spacing={2}>
//             {row2.length > 0 && (
//               <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                 <DataGrid autoHeight rows={row2} columns={column2} />
//               </Grid>
//             )}
//             {row1.length > 0 && (
//               <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                 <MDBox sx={{ display: "flex", justifyContent: "right" }}>
//                   <MDButton onClick={onSave}>SAVE</MDButton>
//                 </MDBox>
//               </Grid>
//             )}
//           </Grid>
//         </AccordionDetails>
//       </Accordion>
//     </MDBox>
//   );
// }
export default WFConfigurator;
