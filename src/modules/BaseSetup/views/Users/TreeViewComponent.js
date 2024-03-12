import React from "react";
import TreeView from "@mui/lab/TreeView";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

// import { setCreateRoleArray, useDataController } from "../../../BrokerPortal/context";

function TreeViewComponent({
  treeData,
  setTreeData,
  treeData1,
  setTreeData1,
  genericArray,
  setGenericArray,
  savedData,
  setSavedData,
}) {
  // const [, dispatch] = useDataController();

  // const [genericArray, setGenericArray] = useState([]);

  console.log(genericArray, setGenericArray);
  console.log(treeData, setTreeData);
  console.log(treeData1, setTreeData1);
  console.log(savedData, setSavedData);

  const pushObj = (e, x) => {
    // debugger;
    const a = x;
    if (e.target.checked === true) {
      a.status = e.target.checked;
      let abc = {};
      abc = { ...abc, ...a };
      delete abc.children;

      setGenericArray((prev) => [...prev, { ...abc }]);
      if (a.children && a.children.length > 0) {
        a.children.forEach((y) => {
          const b = y;
          b.status = e.target.checked;
          pushObj(e, b);
        });
      }
    } else {
      setGenericArray((prev) =>
        prev.filter((item) => !(item.mID === a.mID && item.parentId === a.parentId))
      );
      a.status = e.target.checked;
      if (a.children && a.children.length > 0) {
        a.children.forEach((y) => {
          const b = y;
          b.status = e.target.checked;
          pushObj(e, b);
        });
      }
    }
  };

  const pushObj1 = (e, y) => {
    // debugger;
    const aa = y;
    if (e.target.checked === true) {
      aa.status = e.target.checked;
      let abc = {};
      abc = { ...abc, ...aa };
      delete abc.children;
      setSavedData((prev) => [...prev, { ...abc }]);
      if (aa.children && aa.children.length > 0) {
        aa.children.forEach((z) => {
          pushObj1(e, z);
        });
      }
    } else {
      setSavedData((prev) => prev.filter((item) => item.permissionId !== aa.permissionId));
      aa.status = e.target.checked;
      if (aa.children && aa.children.length > 0) {
        aa.children.forEach((yy) => {
          const bb = yy;
          bb.status = e.target.checked;
          pushObj1(e, bb);
        });
      }
    }

    // if (y.status !== false) {
    //   setGenericArray((prev) => prev.filter((item) => item.permissionId !== abc.permissionId));
    // }
  };
  console.log(savedData, setSavedData);
  const renderTree = (x) => (
    <TreeItem
      key={
        x.permissionId && x.permissionId !== 0
          ? x.permissionId
          : x.mID.toString().concat(x.parentId ? x.parentId : x.mValue)
      }
      nodeId={
        x.permissionId && x.permissionId !== 0
          ? x.permissionId
          : x.mID.toString().concat(x.parentId ? x.parentId : x.mValue)
      }
      label={
        <FormControlLabel
          control={<Checkbox checked={x.status} onChange={(e) => pushObj(e, x)} />}
          label={x.label && x.label !== null ? x.label : x.mValue}
        />
      }
    >
      {x.children && x.children.length > 0 ? x.children.map((y) => renderTree(y)) : null}
    </TreeItem>
  );
  const renderTreeData1 = (y) => (
    <TreeItem
      key={
        y.permissionId
        //   && y.permissionId !== 0
        //     ? y.permissionId
        //     : y.mID.toString().concat(y.parentId ? y.parentId : y.mValue)
      }
      nodeId={
        y.permissionId
        //  && y.permissionId !== 0
        //   ? y.permissionId
        //   : y.mID.toString().concat(y.parentId ? y.parentId : y.mValue)
      }
      label={
        <FormControlLabel
          control={
            <Checkbox
              checked={y.status}
              // checked={false}

              onChange={(e) => pushObj1(e, y)}
            />
          }
          label={y.label !== null ? y.label : ""}
          // label={y.label!=="" ||y.label!==null?y.label:y.itemDescription}
          // label={y.label && y.label !== null ? y.label : y.mValue}
        />
      }
    >
      {y.children && y.children.length > 0 ? y.children.map((z) => renderTreeData1(z)) : null}
    </TreeItem>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 350,
          overFlowY: "hidden",
        },
      }}
    >
      <Paper elevation={3}>
        <TreeView
          aria-label="multi-select"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
          sx={{ height: 500, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {treeData?.length > 0 ? treeData.map((x) => renderTree(x)) : null}
          {treeData1?.length > 0 ? treeData1.map((y) => renderTreeData1(y)) : null}
        </TreeView>
      </Paper>
    </Box>
  );
}

export default TreeViewComponent;
