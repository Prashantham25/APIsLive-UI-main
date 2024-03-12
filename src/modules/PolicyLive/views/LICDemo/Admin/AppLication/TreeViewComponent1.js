import React from "react";
import TreeView from "@mui/lab/TreeView";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function TreeViewComponent1({
  treeData,
  //   setTreeData,
  //   rolePermissionIds,
  //   setRolePermissionIds,
  //   setRolePermissionIds1,
  //   rolePermissionIds1,
  //   checkbox,
  //   keyi,
  //   keyj,
}) {
  //   const checkedGeneric = (array) => {
  //     array.forEach((element) => {
  //       const set = element;
  //       set.status = true;
  //       if (set.children.length > 0) {
  //         checkedGeneric(set.children);
  //       }
  //     });
  //   };
  //   const uncheckedGeneric = (array) => {
  //     array.forEach((elem) => {
  //       const unset = elem;
  //       unset.status = false;
  //       if (unset.children.length > 0) {
  //         uncheckedGeneric(unset.children);
  //       }
  //     });
  //   };
  //   useEffect(() => {
  //     console.log("tree", treeData);
  //   }, [treeData]);

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.danger,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));
  const theme = createTheme({
    status: {
      danger: blue[500],
    },
  });

  //   const pushObj1 = (e, y) => {
  //     const aa = y;
  //     console.log("aa", aa);

  //     if (e.target.checked === false) {
  //       if (aa.itemType === "menu" || aa.itemType === "Dashboard") {
  //         rolePermissionIds.permissionIds.push(aa.permissionId);
  //         setRolePermissionIds(rolePermissionIds);
  //         console.log("rolepermi", rolePermissionIds);
  //       }
  //     }
  //     if (e.target.checked === false && aa.mType === "Report") {
  //       rolePermissionIds1.permissionIds.push(aa);
  //       setRolePermissionIds1(rolePermissionIds1);
  //       console.log("rolePermissionIds1", rolePermissionIds1);
  //     }
  //     if (e.target.checked === false && aa.mType === "BrokerProduct") {
  //       rolePermissionIds1.permissionIds.push(aa);
  //       setRolePermissionIds1(rolePermissionIds1);
  //       console.log("rolePermissionIds1", rolePermissionIds1);
  //     }
  //     if (e.target.checked === true && aa.children.length > 0) {
  //       checkedGeneric(y.children);
  //     }
  //     if (e.target.checked === false && aa.children.length > 0) {
  //       uncheckedGeneric(y.children);
  //     }
  //   };
  //   console.log(treeData, setTreeData);

  const renderTree = (x, i) => (
    <TreeItem
      key={x.permissionId ? x.permissionId : x.mID}
      nodeId={x.permissionId ? x.permissionId : x.mID}
      label={
        <FormControlLabel
          control={
            <ThemeProvider theme={theme}>
              <CustomCheckbox
                disabled
                checked={x.status}
                // onChange={(e) => [pushObj1(e, x), checkbox(e, x, keyi, keyj, i, i1)]}
              />
            </ThemeProvider>
          }
          label={x.label !== "" ? x.label : x.mValue}
        />
      }
    >
      {x.children && x.children.length > 0
        ? x.children.map((y, key1) => renderTree(y, key1, i))
        : null}
      {console.log(
        "tree value ",
        x,
        x.label !== "" ? x.label : x.mValue,
        x.permissionId ? x.permissionId : x.mID
      )}
    </TreeItem>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": { m: 1, width: 350, overFlowY: "hidden" },
      }}
    >
      <Paper elevation={3}>
        <TreeView
          aria-label="multi-select"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
          sx={{ height: 300, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {treeData?.length > 0 ? treeData.map((x, i) => renderTree(x, i)) : null}
        </TreeView>
      </Paper>
    </Box>
  );
}

export default TreeViewComponent1;
