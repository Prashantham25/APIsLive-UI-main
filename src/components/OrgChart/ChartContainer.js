import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"; // useRef,
import PropTypes from "prop-types";
import JSONDigger from "json-digger";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import ChartNode from "./ChartNode";
import "./ChartContainer.css";
import { selectNodeService } from "./service";
// https://www.npmjs.com/package/@dabeng/react-orgchart
// https://codesandbox.io/s/react-orgchart-demo-7sier?file=/src/custom-node-chart/custom-node-chart.js

const ChartContainer = forwardRef(
  (
    {
      datasource,
      pan,
      zoom,
      zoomoutLimit,
      zoominLimit,
      containerClass,
      chartClass,
      NodeTemplate,
      draggable,
      collapsible,
      multipleSelect,
      onClickNode,
      onClickChart,
    },
    ref
  ) => {
    const container = useRef();
    const chart = useRef();
    const downloadButton = useRef();

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [transform1, setTransform] = useState("");
    const [panning, setPanning] = useState(false); //
    const [cursor1, setCursor] = useState("default"); //
    const [exporting, setExporting] = useState(false);
    const [dataURL, setDataURL] = useState("");
    const [download, setDownload] = useState("");

    const attachRel = (data1, flags) => {
      const data = data1;
      data.relationship = flags + (data.children && data.children.length > 0 ? 1 : 0);
      if (data.children) {
        data.children.forEach((item) => {
          attachRel(item, "1".concat(data.children.length > 1 ? 1 : 0));
        });
      }
      return data;
    };

    const [ds, setDS] = useState(datasource);
    useEffect(() => {
      setDS(datasource);
    }, [datasource]);

    const dsDigger = new JSONDigger(datasource, "id", "children");

    const clickChartHandler = (event) => {
      if (!event.target.closest(".oc-node")) {
        if (onClickChart) {
          onClickChart();
        }
        selectNodeService.clearSelectedNodeInfo();
      }
    };

    const panEndHandler = () => {
      setPanning(false);
      setCursor("default");
    };

    const panHandler = (e) => {
      let newX = 0;
      let newY = 0;
      if (!e.targetTouches) {
        // pand on desktop
        newX = e.pageX - startX;
        newY = e.pageY - startY;
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        newX = e.targetTouches[0].pageX - startX;
        newY = e.targetTouches[0].pageY - startY;
      } else if (e.targetTouches.length > 1) {
        return;
      }
      if (transform1 === "") {
        if (transform1.indexOf("3d") === -1) {
          setTransform("matrix(1,0,0,1,".concat(newX, ",", newY, ")"));
        } else {
          setTransform("matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,".concat(newX, ", ", newY, ",0,1)"));
        }
      } else {
        const matrix = transform1.split(",");
        if (transform1.indexOf("3d") === -1) {
          matrix[4] = newX;
          matrix[5] = newY.concat(")");
        } else {
          matrix[12] = newX;
          matrix[13] = newY;
        }
        setTransform(matrix.join(","));
      }
    };

    const panStartHandler = (e) => {
      if (e.target.closest(".oc-node")) {
        setPanning(false);
        return;
      }
      if (!e.target.closest(".oc-node")) {
        setPanning(true);
        setCursor("move");
      } else {
        setPanning(true);
        setCursor("move");
      }
      let lastX = 0;
      let lastY = 0;
      if (transform1 !== "") {
        const matrix = transform1.split(",");
        if (transform1.indexOf("3d") === -1) {
          lastX = parseInt(matrix[4], 10);
          lastY = parseInt(matrix[5], 10);
        } else {
          lastX = parseInt(matrix[12], 10);
          lastY = parseInt(matrix[13], 10);
        }
      }
      if (!e.targetTouches) {
        // pand on desktop
        setStartX(e.pageX - lastX);
        setStartY(e.pageY - lastY);
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        setStartX(e.targetTouches[0].pageX - lastX);
        setStartY(e.targetTouches[0].pageY - lastY);
      } else if (e.targetTouches.length > 1) {
        console.log("a");
        // return null;
      }
    };

    const updateChartScale = (newScale) => {
      let matrix = [];
      let targetScale = 1;
      if (transform1 === "") {
        setTransform("matrix(".concat(newScale, ", 0, 0, ", newScale, ", 0, 0)"));
      } else {
        matrix = transform1.split(",");
        if (transform1.indexOf("3d") === -1) {
          targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);
          if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
            matrix[0] = "matrix(".concat(targetScale);
            matrix[3] = targetScale;
            setTransform(matrix.join(","));
          }
        } else {
          targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);
          if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
            matrix[0] = "matrix3d(".concat(targetScale);
            matrix[5] = targetScale;
            setTransform(matrix.join(","));
          }
        }
      }
    };

    const zoomHandler = (e) => {
      const newScale = 1 + (e.deltaY > 0 ? -0.2 : 0.2);
      updateChartScale(newScale);
    };

    const exportPDF = (canvas, exportFilename) => {
      const canvasWidth = Math.floor(canvas.width);
      const canvasHeight = Math.floor(canvas.height);
      const doc =
        canvasWidth > canvasHeight
          ? new JsPDF({
              orientation: "landscape",
              unit: "px",
              format: [canvasWidth, canvasHeight],
            })
          : new JsPDF({
              orientation: "portrait",
              unit: "px",
              format: [canvasHeight, canvasWidth],
            });
      doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0);
      doc.save(exportFilename.concat(".pdf"));
    };

    const exportPNG = (canvas, exportFilename) => {
      const isWebkit = "WebkitAppearance" in document.documentElement.style;
      const isFf = !!window.sidebar;
      const isEdge =
        navigator.appName === "Microsoft Internet Explorer" ||
        (navigator.appName === "Netscape" && navigator.appVersion.indexOf("Edge") > -1);

      if ((!isWebkit && !isFf) || isEdge) {
        window.navigator.msSaveBlob(canvas.msToBlob(), exportFilename.concat(".png"));
      } else {
        setDataURL(canvas.toDataURL());
        setDownload(exportFilename.concat(".png"));
        downloadButton.current.click();
      }
    };

    const changeHierarchy = async (draggedItemData, dropTargetId) => {
      await dsDigger.removeNode(draggedItemData.id);
      await dsDigger.addChildren(dropTargetId, draggedItemData);
      setDS({ ...dsDigger.ds });
    };

    useImperativeHandle(ref, () => ({
      exportTo: (exportFilename1, exportFileextension1) => {
        let exportFilename = exportFilename1;
        let exportFileextension = exportFileextension1;
        exportFilename = exportFilename || "OrgChart";
        exportFileextension = exportFileextension || "png";
        setExporting(true);
        const originalScrollLeft = container.current.scrollLeft;
        container.current.scrollLeft = 0;
        const originalScrollTop = container.current.scrollTop;
        container.current.scrollTop = 0;
        html2canvas(chart.current, {
          width: chart.current.clientWidth,
          height: chart.current.clientHeight,
          onclone: (clonedDoc1) => {
            const clonedDoc = clonedDoc1;
            clonedDoc.querySelector(".orgchart").style.background = "none";
            clonedDoc.querySelector(".orgchart").style.transform = "";
          },
        }).then(
          (canvas) => {
            if (exportFileextension.toLowerCase() === "pdf") {
              exportPDF(canvas, exportFilename);
            } else {
              exportPNG(canvas, exportFilename);
            }
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          },
          () => {
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          }
        );
      },
      expandAllNodes: () => {
        chart.current
          .querySelectorAll(
            ".oc-node.hidden, .oc-hierarchy.hidden, .isSiblingsCollapsed, .isAncestorsCollapsed"
          )
          .forEach((el) => {
            el.classList.remove("hidden", "isSiblingsCollapsed", "isAncestorsCollapsed");
          });
      },
    }));

    return (
      <div
        ref={container}
        className={"orgchart-container ".concat(containerClass)}
        onWheel={zoom ? zoomHandler : undefined}
        onMouseUpCapture={pan && panning ? panEndHandler : undefined}
      >
        <div
          ref={chart}
          className={"orgchart ".concat(chartClass)}
          style={{ transform: transform1, cursor: cursor1 }}
          onClickCapture={clickChartHandler}
          onMouseDownCapture={pan ? panStartHandler : undefined}
          onMouseMoveCapture={pan && panning ? panHandler : undefined}
        >
          <ul>
            <ChartNode
              datasource={attachRel(ds, "00")}
              NodeTemplate={NodeTemplate}
              draggable={draggable}
              collapsible={collapsible}
              multipleSelect={multipleSelect}
              changeHierarchy={changeHierarchy}
              onClickNode={onClickNode}
            />
          </ul>
        </div>
        <a
          className="oc-download-btn hidden"
          ref={downloadButton}
          href={dataURL}
          download={download}
        >
          &nbsp;
        </a>
        <div className={`oc-mask ${exporting ? "" : "hidden"}`}>
          <i className="oci oci-spinner spinner" />
        </div>
      </div>
    );
  }
);

ChartContainer.propTypes = {
  datasource: PropTypes.objectOf(PropTypes.any).isRequired,
  pan: PropTypes.bool,
  zoom: PropTypes.bool,
  zoomoutLimit: PropTypes.number,
  zoominLimit: PropTypes.number,
  containerClass: PropTypes.string,
  chartClass: PropTypes.string,
  NodeTemplate: PropTypes.elementType,
  draggable: PropTypes.bool,
  collapsible: PropTypes.bool,
  multipleSelect: PropTypes.bool,
  onClickNode: PropTypes.func,
  onClickChart: PropTypes.func,
};
ChartContainer.defaultProps = {
  pan: false,
  zoom: false,
  zoomoutLimit: 0.5,
  zoominLimit: 7,
  containerClass: "",
  chartClass: "",
  draggable: false,
  collapsible: true,
  multipleSelect: false,
  onClickNode: null,
  NodeTemplate: null,
  onClickChart: null,
};

export default ChartContainer;
