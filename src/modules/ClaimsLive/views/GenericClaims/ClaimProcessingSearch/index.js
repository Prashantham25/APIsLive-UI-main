import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Backdrop, CircularProgress } from "@mui/material";
import swal from "sweetalert";
import { DataGrid } from "@mui/x-data-grid";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import getGridData from "./data/index";
import { getClaimDetails, getPolicyDetails } from "../data";
import { useDataController, setpolicyData } from "../../../../BrokerPortal/context";

function RenderControl({ gridData, Navigate, ProductCode }) {
  //   debugger;
  const onRowClick = () => {
    console.log("rowid", gridData.param);

    Navigate(`/Claim/Processing`, {
      state: {
        gridData: gridData.rows.filter(
          (x) => x.claimNumber === localStorage.getItem("claimNumber")
        )[0],
        productCode: ProductCode,
      },
    });
  };

  return (
    <div>
      {(() => {
        switch (gridData.type) {
          case "DataGrid":
            return (
              <DataGrid
                autoHeight
                rows={gridData.rows}
                columns={gridData.columns}
                getRowId={(option) => option[gridData.rowId]}
                onRowClick={onRowClick}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                // components={{ Toolbar: item.GridToolbar ? GridToolbar : false }}
                // editField="inEdit"
                // checkboxSelection={item.checkboxSelection}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

function ClaimProcessingSearch() {
  const [SearchObj, SetSearchObj] = useState({ policyNo: "", claimNo: "" });
  const [gridData, setGridData] = useState({});
  const [ProductCode, setProductCode] = useState("");
  const [, dispatch] = useDataController();
  const [flag, setFlag] = useState(false);
  const Navigate = useNavigate();
  const handleChange = (e) => {
    SearchObj[e.target.name] = e.target.value;
    SetSearchObj((prev) => ({ ...prev, ...SearchObj }));
  };
  const handleSearch = async () => {
    setFlag(true);
    const res = await getClaimDetails(SearchObj.claimNo, true);
    if (res.status === 200) {
      const result = await getPolicyDetails(res.data.finalResult[0].policyNo);
      if (result.status === 200) {
        setFlag(false);
        const data = getGridData(result.data.ProductCode);
        setpolicyData(dispatch, result.data);
        setProductCode(result.data.ProductCode);
        if (data !== null) {
          data.rows = res.data.finalResult;
          setGridData(data);
        }
      } else {
        setFlag(false);
        swal({ text: "Something Went Wrong!", icon: "error" });
      }
    } else {
      setFlag(false);
      swal({ text: "Something Went Wrong!", icon: "error" });
    }
  };
  useEffect(() => {
    console.log("gridData", gridData);
  }, [gridData]);
  return (
    <Grid container spacing={4} p={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="COI Number"
          name="policyNo"
          value={SearchObj.policyNo}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="Master Claim Number"
          name="claimNo"
          value={SearchObj.claimNo}
          onChange={(e) => handleChange(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton sx={{ justifyContent: "right" }} variant="contained" onClick={handleSearch}>
          SEARCH
        </MDButton>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        {gridData !== null ? (
          <RenderControl gridData={gridData} Navigate={Navigate} ProductCode={ProductCode} />
        ) : null}
      </Grid>
      <Backdrop
        sx={{ color: "transparent", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={flag}
      >
        <CircularProgress />
      </Backdrop>
    </Grid>
  );
}

export default ClaimProcessingSearch;
