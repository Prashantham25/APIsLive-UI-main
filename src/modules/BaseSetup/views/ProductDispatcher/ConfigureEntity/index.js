import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import MDTypography from "components/MDTypography";
import {
  getProductList,
  getAttribute,
  getAllMaster,
  geEntitiess,
  getRiskDetails,
  createEntities,
  saveEntities,
} from "../../../data";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import DynamicAttribute from "./dynamicAttribute";
import Entity from "./entity";

const { Card, Grid, Stack, Autocomplete, IconButton } = require("@mui/material");

function ConfigureEntity() {
  const [rows, setRows] = useState([]);
  const [dynamicProductEntity, setDynamicProductEntity] = useState({
    InsurableItem: [],
  });
  const [dynamicProductInsurable, setDynamicProductInsurable] = useState({
    InsurableName: "",
    RiskItems: [],
    Covers: [],
  });
  const [Entitydto, setEntitydto] = useState({
    name: "",
    type: "",
    eicon: "",
    attributeList: [],
    childEntites: [],
  });
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "type", headerName: "Type", width: 300 },
    { field: "Name", headerName: "Name", width: 300 },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      editable: true,

      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rows.filter((row) => row.id !== param.id);
          setRows([...newArray]);
        };
        return (
          <IconButton onClick={deleteRow}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];
  console.log("entitydto", Entitydto);
  const [searchproducts, setSearchProducts] = useState([]);
  const [post, setPost] = useState([]);
  const [ProductMasterData, setProductMasterData] = useState([]);
  const [config, setConfig] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const [productRiskDetails, setProductRiskDetails] = useState({});

  const [attributesDto, setAttributesDto] = useState({
    id: "",
    name: "",
    complexity: "",
    storage: "",
    listOfValues: "",

    dependency: "",
    dataType: "",
    default: "",
    displayType: "",
    isActive: true,
    dropdownSelected: "",
    dependentOn: "",
    mID: "",
    mValue: "",
    tableType: "",
  });

  const attributesDtoD = {
    id: "",
    name: "",
    complexity: "",
    storage: "",
    listOfValues: "",

    dependency: "",
    dataType: "",
    default: "",
    displayType: "",
    isActive: true,
    dropdownSelected: "",
    dependentOn: "",
    mID: "",
    mValue: "",
    tableType: "",
    type: "",
  };

  const [attributesDtos, setAttributesDtos] = useState({
    name: "",
    complexity: "",
    storage: "",
    listOfValues: "",
    DlistOfValues: [],
    dependency: "",
    dataType: "",
    default: "",
    displayType: "",
    dropdownSelected: "",
    dependentOn: "",
  });
  const handleChange1 = (e, value) => {
    Entitydto.type = value.mID;
  };
  const handleChange = (e, value) => {
    setAttributesDto(attributesDtoD);

    attributesDto.name = value.name;
    attributesDto.mID = value.id;
    attributesDto.id = value.id;
    attributesDto.mValue = value.name;
    attributesDto.complexity = value.complexity;
    attributesDto.dataType = value.dataType;
    attributesDto.displayType = value.displayType;
    attributesDto.storage = value.storage;
    attributesDto.tableType = e.target.id;
    attributesDto.type = value.type;
    setAttributesDto(attributesDto);

    Entitydto.attributeList = [...Entitydto.attributeList, { ...attributesDto }];
    // Entitydto.childEntities = [...Entitydto.childEntities, { ...attributesDto }];
    setEntitydto(Entitydto);

    const len = rows.length;
    const obj = { id: "", type: "", Name: "", Action: "" };
    obj.id = len;
    const type1 = e.target.id.split("-")[0];
    obj.type = type1;

    obj.Name = value.name;
    setRows([...rows, obj]);
  };

  const handleChangeModel = (e, value) => {
    attributesDtos[e.target.id.split("-")[0]] = value.mID;

    setAttributesDtos(attributesDtos);

    console.log("attri", attributesDtos);
  };
  useEffect(() => {
    console.log("rows", rows);
  }, [rows]);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleSaveEntity = async () => {
    const callCreateEntityss = await saveEntities(Entitydto);
    console.log("asd", callCreateEntityss);

    if (callCreateEntityss.status === 200) {
      swal({
        html: true,
        text: callCreateEntityss.data.responseMessage,
        icon: "success",
      });
    } else {
      swal({
        html: true,
        text: callCreateEntityss.data.responseMessage,
        icon: "error",
      });
    }
  };

  const handleAutocomplete = async (e, value) => {
    const data = await getRiskDetails(value.productId);

    console.log("get1", data);

    setProductRiskDetails(data);
  };
  useEffect(async () => {
    console.log("productRiskDetails", productRiskDetails);

    for (let i = 0; i < productRiskDetails.productRcbDetails.length; i += 1) {
      dynamicProductEntity[productRiskDetails.productRcbDetails[i].inputType] = "";
    }

    for (let j = 0; j < productRiskDetails.productRcbInsurableDetails.length; j += 1) {
      dynamicProductInsurable.InsurableName =
        productRiskDetails.productRcbInsurableDetails[j].inputType;
      const obj = {};
      for (
        let k = 0;
        k < productRiskDetails.productRcbInsurableDetails[j].insurableChildRcbdetail.length;
        k += 1
      ) {
        obj[productRiskDetails.productRcbInsurableDetails[j].insurableChildRcbdetail[k].inputType] =
          "";
      }
      dynamicProductInsurable.RiskItems.push(obj);

      for (
        let l = 0;
        l < productRiskDetails.productRcbInsurableDetails[j].coverRcbdetails.length;
        l += 1
      ) {
        const objC = {};
        const objCC = {};
        objC.CoverName = "";
        objC.CoverFields = [];

        for (
          let m = 0;
          m <
          productRiskDetails.productRcbInsurableDetails[j].coverRcbdetails[l].coverChildRcbdetail
            .length;
          m += 1
        ) {
          objCC[
            productRiskDetails.productRcbInsurableDetails[j].coverRcbdetails[l].coverChildRcbdetail[
              m
            ].inputType
          ] = "";
        }
        objC.CoverFields.push(objCC);

        dynamicProductInsurable.Covers.push(objC);
      }
      setDynamicProductInsurable({ dynamicProductInsurable });
      dynamicProductEntity.InsurableItem.push(dynamicProductInsurable);
      setDynamicProductEntity({ dynamicProductEntity });
      // dynamicProductInsurable = Object.assign({}, this.state.dynamicProductInsurableD);
      setDynamicProductInsurable({ dynamicProductInsurable });
    }

    const createEntityRequest = {
      name: Entitydto.name,
      type: Entitydto.type,

      jsonObject: dynamicProductEntity,
    };
    const callCreateEntity = await createEntities(createEntityRequest);
    console.log("callCreateEntity", callCreateEntity);

    // if (callCreateEntity.response.status === 2) {
    //   debugger;
    //   swal({
    //     html: true,
    //     icon: "success",
    //     text: callCreateEntity.entities.map((x) => x),
    //   });
    // } else {
    //   swal({
    //     html: true,
    //     icon: "error",
    //     text: "Error in Creating Entities",
    //   });
    // }

    if (callCreateEntity.response.status === 2) {
      const stringRepEntities = callCreateEntity.entities.toString();
      swal({
        icon: "success",
        title: "Entitties created",
        text: `${callCreateEntity.entities.length} entitties created : ${stringRepEntities}`,
      });
    } else {
      swal({ icon: "error", text: "Something went wrong!" });
    }
  }, [productRiskDetails]);
  useEffect(() => {
    getProductList().then((response) => {
      setSearchProducts(response);
      console.log("10", response);
    });
    getAllMaster().then((response) => {
      setPost([...response]);
      console.log("11", response);
    });
    getAttribute().then((response) => {
      setConfig(response);
      console.log("12", response);
    });
    geEntitiess().then((response) => {
      setProductMasterData(response);
      console.log("13", response);
    });
  }, []);

  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Configure Entity
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Entity Name"
            value={Entitydto.name}
            onChange={(e) => setEntitydto({ ...Entitydto, name: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="DB Schema" /> */}

          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            onChange={handleChange1}
            options={post.length > 0 ? post.filter((x) => x.mType === "Entity Type")[0].mdata : []}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Entity Type" required />}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Entity Icon"
            value={Entitydto.eicon}
            onChange={(e) => setEntitydto({ ...Entitydto, eicon: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="Atribute"
            // name="Select Attributes"

            onChange={handleChange}
            options={config}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <MDInput height="1.4375rem" {...params} label="Select Attributes" required />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="Entities"
            onChange={handleChange}
            options={ProductMasterData}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <MDInput height="1.4375rem" {...params} label="Select Existing Entity" required />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="Data Type" /> */}
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="Create Entity By Product"
            name="Create Entity By Product"
            options={searchproducts}
            onChange={handleAutocomplete}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <MDInput height="1.4375rem" {...params} label="Create Entity By Product" required />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row" spacing={2}>
            <MDButton onClick={handleOpen}>CREATE CUSTOM ATTRIBUTE</MDButton>
            <Modal open={open} onClose={handleClose}>
              {/* <MDBox pt={10} pl={10}> */}
              <MDBox
                // p={6}
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "40%",
                  width: "70%",
                  transform: "translate(-30%, -30%)",

                  bgcolor: "background.paper",

                  p: 2,
                }}
              >
                <Grid ml={2} mr={2}>
                  {/* <Grid mr={5}> */}
                  <Stack justifyContent="right" direction="row" spacing={2}>
                    <MDButton color="white" round onClick={handleClose} textAlign="right">
                      x
                    </MDButton>
                    {/* </Grid> */}
                  </Stack>
                  <DynamicAttribute
                    rows={rows}
                    setRows={setRows}
                    handleClose={handleClose}
                    handleChangeModel={handleChangeModel}
                    Entitydto={Entitydto}
                    attributesDtos={attributesDtos}
                    setEntitydto={setEntitydto}
                    setAttributesDtos={setAttributesDtos}
                  />
                </Grid>
              </MDBox>
              {/* </MDBox> */}
            </Modal>

            <Modal open={open1} onClose={handleClose1}>
              <MDBox
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "40%",
                  width: "70%",
                  transform: "translate(-30%, -30%)",

                  bgcolor: "background.paper",

                  p: 2,
                }}
              >
                <Grid ml={2} mr={2}>
                  <Stack justifyContent="right" direction="row" spacing={2}>
                    <MDButton color="white" round onClick={handleClose1} textAlign="right">
                      x
                    </MDButton>
                  </Stack>
                  <Entity handleClose1={handleClose1} />
                </Grid>
              </MDBox>
            </Modal>

            <MDButton onClick={handleOpen1}>HAVE A JSON? CLICK HERE</MDButton>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {rows.length > 0 ? (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </div>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {Entitydto.name && Entitydto.eicon && Entitydto.type && rows.length > 0 ? (
            <Stack justifyContent="right" direction="row">
              <MDButton onClick={handleSaveEntity}>SAVE</MDButton>
            </Stack>
          ) : null}
        </Grid>
      </Grid>
    </Card>
  );
}

export default ConfigureEntity;
