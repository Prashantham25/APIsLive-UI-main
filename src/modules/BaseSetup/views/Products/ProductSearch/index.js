import React, { useState, useEffect } from "react";
import { Grid, Autocomplete, Card, Stack, IconButton, Modal } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import handleCustomInput from "./data/handlers";
import { getProductJson, searchProduct } from "./data";
import ProductJsonD from "./data/json";
import ProductConfiguration from "../ProductConfiguration";
import {
  useDataController,
  setProductJson,
  setViewFlag,
  setEditFlag,
  setRisk,
  setClaim,
} from "../../../../BrokerPortal/context";

const style = {
  position: "absolute",
  top: "-1%",
  left: "82%",
  transform: "translate(-85%, 6%)",
  width: 1400,
  height: 650,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,

  textAlign: "center",
  p: 4,
  "max-height": "100%",
  "overflow-y": "auto",
};
function ProductSearch() {
  const [open, setOpen] = useState(false);

  const [productData, setProductData] = useState([]);

  const [controller, dispatch] = useDataController();
  const { ProductJson } = controller;
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log("Product Json in Search", ProductJson);
  }, [ProductJson]);
  const columns = [
    {
      field: "productName",
      headerName: "ProductName",
      width: 200,
    },
    {
      field: "productCode",
      headerName: "ProductCode",
      width: 200,
    },
    {
      field: "policyType",
      headerName: "PolicyType",
      width: 200,
    },
    {
      field: "viewupdate",
      headerName: "View/Update",
      width: 200,
      renderCell: (param) => {
        const handleOpen = async () => {
          setRisk(dispatch, []);
          setClaim(dispatch, []);
          setViewFlag(dispatch, true);
          setEditFlag(dispatch, false);
          const result = await getProductJson(param.row.productId);
          if (result.data.finalResult !== null) {
            setProductJson(dispatch, { ...ProductJson, ...result.data.finalResult });
            setOpen(true);
          } else {
            swal({ text: result.data.responseMessage, icon: "error" });
          }
        };
        const handleOpen1 = async () => {
          setRisk(dispatch, []);
          setClaim(dispatch, []);
          setViewFlag(dispatch, false);
          setEditFlag(dispatch, true);
          const result = await getProductJson(param.row.productId);
          if (result.data.finalResult !== null) {
            setProductJson(dispatch, { ...ProductJson, ...result.data.finalResult });
            setOpen(true);
          } else {
            swal({ text: result.data.responseMessage, icon: "error" });
          }
        };
        return (
          <Stack flexDirection="row">
            <IconButton onClick={handleOpen}>
              <Visibility />
            </IconButton>
            <IconButton onClick={handleOpen1}>
              <Edit />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  const [data, setData] = useState({
    productName: "",
    productCode: "",
    cobid: "",
    lobid: "",
    productStatusId: "",

    includeFields: ["ProductCode", "ProductName", "PolicyType", "ProductId"],
  });
  const handleSearch = async () => {
    setProductData([]);
    setProductJson(dispatch, { ...ProductJson, ...ProductJsonD });
    const result = await searchProduct(data);
    if (result.status === 200) {
      setProductData([...result.data]);
    }
  };
  useEffect(() => {
    console.log("111", productData);
  }, [productData]);
  return (
    <Card sx={{ padding: "10px" }}>
      <MDTypography variant="h5">Product Search</MDTypography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Product Code"
            name="productCode"
            value={data.productCode}
            onChange={(e) => handleCustomInput(e, data, setData)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Product Name"
            name="productName"
            value={data.productName}
            onChange={(e) => handleCustomInput(e, data, setData)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="lob"
            options={["Motor", "Health"]}
            getOptionLabel={(option) => option}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            renderInput={(params) => <MDInput {...params} label="Line of Business" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="cob"
            options={["Retail health"]}
            getOptionLabel={(option) => option}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            renderInput={(params) => <MDInput {...params} label="Class of Business" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="status"
            options={["Active", "InActive"]}
            getOptionLabel={(option) => option}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            renderInput={(params) => <MDInput {...params} label="Product Status" />}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container justifyContent="center" alignItems="center">
        <MDButton color="primary" onClick={handleSearch}>
          Search
        </MDButton>
      </Grid>

      {productData.length > 0 ? (
        <MDBox sx={{ width: "100%" }}>
          <DataGrid
            rows={productData}
            autoHeight
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.productId}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </MDBox>
      ) : null}

      <Modal open={open} onClose={handleClose}>
        <MDBox sx={style}>
          <ProductConfiguration />
        </MDBox>
      </Modal>
    </Card>
  );
}
export default ProductSearch;
