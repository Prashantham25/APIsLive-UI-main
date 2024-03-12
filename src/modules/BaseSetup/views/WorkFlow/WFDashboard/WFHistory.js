import React, { useCallback } from "react";
import { Accordion, Grid } from "@mui/material";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";

// import { nodes as initialNodes, edges as initialEdges } from "./initial-elements";
// import CustomNode from "./CustomNode";
import "reactflow/dist/style.css";
import "../data/overview.css";
import MDBox from "../../../../../components/MDBox";
// import MDTypography from "../../../../../components/MDTypography";

// const nodeTypes = {
//   custom: CustomNode,
// };

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) => console.log("flow loaded:", reactFlowInstance);

function WFHistory({ initialNodes, initialEdges }) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const [content, setContent] = useState("");
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  //   const edgesWithUpdatedTypes = edges.map((edge1) => {
  //     const edge = edge1;
  //     // if (edge.sourceHandle) {
  //     //   const edgeType = nodes.find((node) => node.type === "custom").data.selects[edge.sourceHandle];
  //     //   edge.type = edgeType;
  //     // }

  //     return edge;
  //   });
  //   const onNodeClick = (e, v) => {
  //     console.log("onNodeClick", e, v);
  //     setContent(v.data.text);
  //     setAnchorEl(e.currentTarget);
  //   };
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  //   const open = Boolean(anchorEl);
  //   const id = open ? "simple-popover" : undefined;
  return (
    <MDBox>
      <Accordion>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox width="1000px" height="600px">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
                // onNodeClick={onNodeClick}
                // nodeTypes={nodeTypes}
              >
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MDTypography sx={{ p: 2 }}>{content}</MDTypography>
            </Popover>
          </Grid> */}
        </Grid>
      </Accordion>
    </MDBox>
  );
}
export default WFHistory;
