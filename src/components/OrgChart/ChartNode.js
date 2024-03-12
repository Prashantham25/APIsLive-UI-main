import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { dragNodeService, selectNodeService } from "./service"; //
import "./ChartNode.css";

function ChartNode({
  datasource,
  NodeTemplate,
  draggable,
  collapsible,
  multipleSelect,
  changeHierarchy,
  onClickNode,
}) {
  const Tnode = useRef();

  const [isChildrenCollapsed, setIsChildrenCollapsed] = useState(); //

  const [topEdgeExpanded, setTopEdgeExpanded] = useState();
  const [topEdgeExpandedVal, setTopEdgeExpandedVal] = useState("");

  const [rightEdgeExpanded, setRightEdgeExpanded] = useState(); //
  const [rightEdgeExpandedVal, setRightEdgeExpandedVal] = useState(""); //

  const [bottomEdgeExpanded, setBottomEdgeExpanded] = useState(); //
  const [bottomEdgeExpandedVal, setBottomEdgeExpandedVal] = useState("");

  const [leftEdgeExpanded, setLeftEdgeExpanded] = useState(); //
  const [leftEdgeExpandedVal, setLeftEdgeExpandedVal] = useState("");

  const [toggleAncestorsFlag, setToggleAncestorsFlag] = useState(0);
  const [toggleAncestorsParameter, setToggleAncestorsParameter] = useState(0);

  const [allowedDrop, setAllowedDrop] = useState(false); // setAllowedDrop
  const [selected, setSelected] = useState(false); //

  const nodeClass = [
    "oc-node",
    isChildrenCollapsed ? "isChildrenCollapsed" : "",
    allowedDrop ? "allowedDrop" : "",
    selected ? "selected" : "",
  ]
    .filter((item) => item)
    .join(" ");

  const toggleSiblings = (actionNode) => {
    let node = actionNode.previousSibling;
    const isSiblingsCollapsed = Array.from(actionNode.parentNode.children).some((item) =>
      item.classList.contains("hidden")
    );
    actionNode.classList.toggle("isSiblingsCollapsed", !isSiblingsCollapsed);
    // 先处理同级的兄弟节点
    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }
      node = node.previousSibling;
    }
    node = actionNode.nextSibling;
    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }
      node = node.nextSibling;
    }
    // 在展开兄弟节点的同时，还要展开父节点
    const isAncestorsCollapsed = actionNode.parentNode
      .closest("li")
      .firstChild.classList.contains("hidden");
    if (isAncestorsCollapsed) {
      setToggleAncestorsParameter(actionNode);
      setToggleAncestorsFlag(toggleAncestorsFlag + 1);
    }
  };

  const toggleAncestors = (actionNode) => {
    // debugger;
    const node = actionNode.parentNode.closest("li");
    if (!node) return;
    const isAncestorsCollapsed = node.firstChild.classList.contains("hidden");
    // if (isAncestorsCollapsed) {
    if (isAncestorsCollapsed) {
      // 向上展开，只展开一级
      actionNode.classList.remove("isAncestorsCollapsed");
      node.firstChild.classList.remove("hidden");
    } else {
      // 向下折叠，则折叠所有祖先节点以及祖先节点的兄弟节点
      const isSiblingsCollapsed = Array.from(actionNode.parentNode.children).some((item) =>
        item.classList.contains("hidden")
      );
      if (!isSiblingsCollapsed) {
        toggleSiblings(actionNode);
      }
      actionNode.classList.add(
        ..."isAncestorsCollapsed"
          .concat(isSiblingsCollapsed ? "" : " isSiblingsCollapsed")
          .split(" ")
      );
      node.firstChild.classList.add("hidden");
      // 如果还有展开的祖先节点，那继续折叠关闭之
      if (
        node.parentNode.closest("li") &&
        !node.parentNode.closest("li").firstChild.classList.contains("hidden")
      ) {
        toggleAncestors(node);
      }
    }
  };
  useEffect(() => {
    if (toggleAncestorsFlag > 0) {
      // debugger;
      toggleAncestors(toggleAncestorsParameter);
      setToggleAncestorsParameter();
    }
  }, [toggleAncestorsFlag]);

  useEffect(() => {
    const subs1 = dragNodeService.getDragInfo().subscribe((draggedInfo) => {
      if (draggedInfo) {
        const aa = !document
          .querySelector("#".concat(draggedInfo.draggedNodeId))
          .closest("li")
          .querySelector("#".concat(Tnode.current.id));
        let bb = false;
        if (aa) bb = true;

        setAllowedDrop(bb);
      } else {
        setAllowedDrop(false);
      }
    });

    const subs2 = selectNodeService.getSelectedNodeInfo().subscribe((selectedNodeInfo) => {
      if (selectedNodeInfo) {
        if (multipleSelect === true) {
          if (selectedNodeInfo.selectedNodeId === datasource.id) {
            setSelected(true);
          }
        } else {
          // setSelected(selectedNodeInfo.selectedNodeId === datasource.id);
          setSelected(false);
        }
      } else {
        setSelected(false);
      }
    });

    return () => {
      subs1.unsubscribe();
      subs2.unsubscribe();
    };
  }, [multipleSelect, datasource]);

  const addArrows = (e) => {
    const node = e.target.closest("li");
    const parent = node.parentNode.closest("li");
    const isAncestorsCollapsed =
      node && parent ? parent.firstChild.classList.contains("hidden") : undefined;
    const isSiblingsCollapsed = Array.from(node.parentNode.children).some((item) =>
      item.classList.contains("hidden")
    );

    setTopEdgeExpanded(!isAncestorsCollapsed);
    setRightEdgeExpanded(!isSiblingsCollapsed);
    setLeftEdgeExpanded(!isSiblingsCollapsed);
    setBottomEdgeExpanded(!isChildrenCollapsed);
  };

  const removeArrows = () => {
    setTopEdgeExpanded(undefined);
    setRightEdgeExpanded(undefined);
    setBottomEdgeExpanded(undefined);
    setLeftEdgeExpanded(undefined);
  };

  const topEdgeClickHandler = (e) => {
    console.log("eeeeeeeeeeeeeeeee", e);
    console.log("eeeeeeeeeeeeeeeee1", e.target.closest("li"));
    e.stopPropagation();
    setTopEdgeExpanded(!topEdgeExpanded);
    toggleAncestors(e.target.closest("li"));
  };

  const bottomEdgeClickHandler = (e) => {
    e.stopPropagation();
    setIsChildrenCollapsed(!isChildrenCollapsed);
    setBottomEdgeExpanded(!bottomEdgeExpanded);
  };

  const hEdgeClickHandler = (e) => {
    e.stopPropagation();
    setLeftEdgeExpanded(!leftEdgeExpanded);
    setRightEdgeExpanded(!rightEdgeExpanded);
    toggleSiblings(e.target.closest("li"));
  };

  const filterAllowedDropNodes = (id) => {
    selectNodeService.sendDragInfo(id);
  };

  const clickNodeHandler = () => {
    if (onClickNode) {
      onClickNode(datasource);
    }

    selectNodeService.sendSelectedNodeInfo(datasource.id);
  };

  const dragstartHandler = (event) => {
    const copyDS = { ...datasource };
    delete copyDS.relationship;
    event.dataTransfer.setData("text/plain", JSON.stringify(copyDS));
    // highlight all potential drop targets
    filterAllowedDropNodes(Tnode.current.id);
  };

  const dragoverHandler = (event) => {
    // prevent default to allow drop
    event.preventDefault();
  };

  const dragendHandler = () => {
    // reset background of all potential drop targets
    dragNodeService.clearDragInfo();
  };

  const dropHandler = (event) => {
    if (!event.currentTarget.classList.contains("allowedDrop")) {
      return;
    }
    dragNodeService.clearDragInfo();
    changeHierarchy(JSON.parse(event.dataTransfer.getData("text/plain")), event.currentTarget.id);
  };

  useEffect(() => {
    if (topEdgeExpanded === true) setTopEdgeExpandedVal("oci-chevron-down");
    else setTopEdgeExpandedVal("oci-chevron-up");

    if (rightEdgeExpanded === true) setRightEdgeExpandedVal("oci-chevron-left");
    else setRightEdgeExpandedVal("oci-chevron-right");

    if (leftEdgeExpanded === true) setLeftEdgeExpandedVal("oci-chevron-right");
    else setLeftEdgeExpandedVal("oci-chevron-left");

    if (bottomEdgeExpanded === true) setBottomEdgeExpandedVal("oci-chevron-up");
    else setBottomEdgeExpandedVal("oci-chevron-down");
  }, [topEdgeExpanded, rightEdgeExpanded, leftEdgeExpanded, bottomEdgeExpanded]);
  return (
    <li className="oc-hierarchy">
      <div
        ref={Tnode}
        id={datasource.positionid}
        className={nodeClass}
        draggable={draggable ? "true" : undefined}
        onClickCapture={clickNodeHandler}
        onDragStart={dragstartHandler}
        onDragOver={dragoverHandler}
        onDragEnd={dragendHandler}
        onDrop={dropHandler}
        onMouseEnter={addArrows}
        onMouseLeave={removeArrows}
      >
        {NodeTemplate ? (
          <NodeTemplate nodeData={datasource} />
        ) : (
          <>
            <div className="oc-heading">
              {datasource.relationship && datasource.relationship.charAt(2) === "1" && (
                <i className="oci oci-leader oc-symbol" />
              )}
              {datasource.staffName}
            </div>
            <div className="oc-content">{datasource.postionName}</div>
          </>
        )}
        {collapsible && datasource.relationship && datasource.relationship.charAt(0) === "1" && (
          <i
            className={`oc-edge verticalEdge topEdge oci ${
              topEdgeExpanded === undefined ? "" : topEdgeExpandedVal
            }`}
            onClickCapture={topEdgeClickHandler}
            // onClick={topEdgeClickHandler}
          />
        )}
        {collapsible && datasource.relationship && datasource.relationship.charAt(1) === "1" && (
          <>
            <i
              className={`oc-edge horizontalEdge rightEdge oci ${
                rightEdgeExpanded === undefined ? "" : rightEdgeExpandedVal
              }`}
              onClickCapture={hEdgeClickHandler}
              // onClick={hEdgeClickHandler}
            />

            <i
              className={`oc-edge horizontalEdge leftEdge oci ${
                leftEdgeExpanded === undefined ? "" : leftEdgeExpandedVal
              }`}
              onClickCapture={hEdgeClickHandler}
              // onClick={hEdgeClickHandler}
            />
          </>
        )}
        {collapsible && datasource.relationship && datasource.relationship.charAt(2) === "1" && (
          <i
            className={`oc-edge verticalEdge bottomEdge oci ${
              bottomEdgeExpanded === undefined ? "" : bottomEdgeExpandedVal
            }`}
            onClickCapture={bottomEdgeClickHandler}
            // onClick={bottomEdgeClickHandler}
          />
        )}
      </div>

      {datasource.children && datasource.children.length > 0 && (
        <ul className={isChildrenCollapsed ? "hidden" : ""}>
          {datasource.children.map((node) => (
            <ChartNode
              datasource={node}
              NodeTemplate={NodeTemplate}
              id={node.positionid}
              key={node.positionid}
              draggable={draggable}
              collapsible={collapsible}
              multipleSelect={multipleSelect}
              changeHierarchy={changeHierarchy}
              onClickNode={onClickNode}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

ChartNode.prototype = {
  datasource: PropTypes.object,
  NodeTemplate: PropTypes.elementType,
  draggable: PropTypes.bool,
  collapsible: PropTypes.bool,
  multipleSelect: PropTypes.bool,
  changeHierarchy: PropTypes.func,
  onClickNode: PropTypes.func,
};
ChartNode.defaultProps = { draggable: false, collapsible: true, multipleSelect: false };

export default ChartNode;
