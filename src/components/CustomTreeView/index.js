import TreeView from "@mui/lab/TreeView";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Paper from "@mui/material/Paper";
import MDBox from "components/MDBox";

function CustomTreeView({ treeData, treeInfo, onChange }) {
  const renderSetState = (arr, val) => {
    arr.forEach((x2) => {
      const x3 = x2;
      x3[treeInfo.checked] = val;
      if (x2[treeInfo.children] && x2[treeInfo.children].length > 0)
        renderSetState(x2[treeInfo.children], val);
    });
  };
  const renderSetState2 = (arr, parent) => {
    arr.forEach((x2) => {
      parent.forEach((x3) => {
        if (x2[treeInfo.nodeId] === x3) {
          const x4 = x2;
          x4[treeInfo.checked] = true;
          if (x2[treeInfo.children] && x2[treeInfo.children].length > 0)
            renderSetState2(x2[treeInfo.children], parent);
        }
      });
    });
  };
  const renderTree = (x1, parent1) => {
    const x = x1;
    const parent = [...parent1, x1[treeInfo.parentId]];
    console.log(x[treeInfo.nodeId], parent);
    const onCheck = (e) => {
      x[treeInfo.checked] = e.target.checked;
      if (x[treeInfo.children] && x[treeInfo.children].length > 0)
        renderSetState(x[treeInfo.children], e.target.checked);
      if (e.target.checked === true) renderSetState2(treeData, parent);

      onChange(x, [...treeData]);
    };
    return (
      <TreeItem
        key={x[treeInfo.nodeId]}
        nodeId={x[treeInfo.nodeId]}
        label={
          <FormControlLabel
            control={<Checkbox checked={x[treeInfo.checked]} onChange={onCheck} />}
            label={x[treeInfo.label]}
          />
        }
      >
        {x[treeInfo.children] && x[treeInfo.children].length > 0
          ? x[treeInfo.children].map((y) => renderTree(y, parent))
          : null}
      </TreeItem>
    );
  };

  return (
    <MDBox>
      <Paper elevation={4} sx={{ backgroundColor: "#fafafa", maxWidth: 400, overflowX: "auto" }}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
          sx={{ height: 400, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {treeData.length > 0 ? treeData.map((x) => renderTree(x, [])) : null}
        </TreeView>
      </Paper>
    </MDBox>
  );
}
export default CustomTreeView;
