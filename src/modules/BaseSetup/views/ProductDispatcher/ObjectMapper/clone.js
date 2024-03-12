// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import swal from "sweetalert";
// import MDInput from "../../../../../components/MDInput";
// import MDButton from "../../../../../components/MDButton";
// import {
//   GetMapperDetails,
//   geEntitiess,
//   getMas,
//   SaveDynamicListMapper,
//   getMasterss,
// } from "../../../data";

// const { Grid, Stack, Autocomplete } = require("@mui/material");

// function DynamicAttribute() {
//   const columns = [
//     { field: "id", headerName: "S.No", width: 100 },
//     { field: "mapperName", headerName: "Mapper Name", width: 200 },
//     { field: "sourceComponent", headerName: "Source Component", width: 200 },
//     { field: "targetComponent", headerName: "Target Component", width: 200 },
//     {
//       field: "Action",
//       headerName: "Action",
//       width: 100,
//       editable: true,
//     },
//   ];
//   //   const rows = [
//   //     { id: 1, mType: "Snow", mapperName: "Jon", sourceComponent: 35, targetComponent: "hgh" },
//   //     { id: 2, mType: "Lannister", mapperName: "Cersei", sourceComponent: 42, targetComponent: "fd" },
//   //     { id: 3, mType: "Lannister", mapperName: "Jaime", sourceComponent: 45, targetComponent: "dfs" },
//   //     { id: 4, mType: "Stark", mapperName: "Arya", sourceComponent: 16, targetComponent: "fds" },
//   //     {
//   //       id: 5,
//   //       mType: "Targaryen",
//   //       mapperName: "Daenerys",
//   //       sourceComponent: null,
//   //       sourceComponent: "dfs",
//   //     },
//   //     { id: 6, mType: "Melisandre", mapperName: null, sourceComponent: 150, sourceComponent: "fd" },
//   //     { id: 7, mType: "Clifford", mapperName: "Ferrara", sourceComponent: 44, sourceComponent: "fd" },
//   //     {
//   //       id: 8,
//   //       mType: "Frances",
//   //       mapperName: "Rossini",
//   //       sourceComponent: 36,
//   //       sourceComponent: "dfzx",
//   //     },
//   //     { id: 9, mType: "Roxie", mapperName: "Harvey", sourceComponent: 65, sourceComponent: "dfs" },
//   //   ];
//   const [entity, setEntity] = useState([]);
//   const [ProductMasterDTO, setProductMasterDTO] = useState([]);
//   const [ProductEntities, setProductEntities] = useState([]);
//   const [product, setProduct] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [finalMapper, setFinalMapper] = useState([]);
//   const [mapperObject, setmapperObject] = useState({
//     // id: "",
//     // mapperId: "",
//     mapperName: "",
//     // mID: "",
//     mValue: "",
//     type: "",
//     mType: "",
//     sourceComponent: "",
//     targetComponent: "",
//     createdDate: new Date(),
//     isActive: true,
//     mapperDetailsDTO: [],
//     name: null,
//     entity: null,
//     RuleOrRateDynamicTargetProperty: [],
//     RuleOrRateDynamicSourceResponse: [],
//   });

//   const handleAutocomplete = async (e, value, Type) => {
//     debugger;
//     const len = rows.length;
//     mapperObject.id = len;

//     if (Type === "mapperName") {
//       // mapperObject[e.target.id.split("-")[0]] = value.mID;
//       // mapperObject.mID = mapperObject.mapperId;
//       mapperObject.mapperName = value.mValue;
//       mapperObject.type = value.type;
//       mapperObject.sourceComponent = value.sourceComponent;
//       mapperObject.targetComponent = value.targetComponent;
//       mapperObject.mapperDetailsDTO = [...mapperObject.mapperDetailsDTO, ...value.mapperDetailsDTO];
//       ProductEntities.map((x) => {
//         if (x.mValue === mapperObject.sourceComponent) {
//           // mapperObject.RuleOrRateDynamicSourceResponse.push(x.attributeList);
//           mapperObject.RuleOrRateDynamicSourceResponse = [
//             ...mapperObject.RuleOrRateDynamicSourceResponse,
//             ...x.attributeList,
//           ];
//         }
//       });

//       const data = await getMasterss(mapperObject.type);
//       // console.log("data.finalDTO", data.finalDTO);
//       setProduct(data.finalDTO);
//       console.log("dynamic1", data);
//       data.finalDTO.map((x) => {
//         // console.log("x", x.mValue);
//         if (x.mValue === mapperObject.targetComponent) {
//           mapperObject.RuleOrRateDynamicTargetProperty.push(x);
//         }
//       });

//       setmapperObject(mapperObject);

//       setRows([...rows, { ...mapperObject }]);
//     }
//   };
//   console.log("product", product);
//   const handleInput = (e) => {
//     debugger;
//     mapperObject[e.target.name.split("-")[0]] = e.target.value;
//     mapperObject.mValue = mapperObject.mapperName;
//     // fields.EntityName = e.target.value;
//     // fields.jsonObject = e.target.value;
//     setmapperObject((prev) => ({ ...prev, ...mapperObject }));
//     // setRows([...rows, { ...mapperObject }]);
//     // setmapperObject(mapperObject);
//   };
//   console.log("mapperObject", mapperObject);
//   const handleClick = () => {
//     setFinalMapper([...finalMapper, { ...mapperObject }]);
//   };

//   useEffect(() => {
//     GetMapperDetails().then((response) => {
//       setEntity(response.mapper);

//       console.log("printss", response);
//     });
//     getMas().then((response) => {
//       setProductMasterDTO([...response]);
//       console.log("getMaster", response);
//     });
//     geEntitiess().then((response) => {
//       console.log("120", response);

//       setProductEntities(response);
//     });
//   }, []);
//   console.log("ProductEntities", ProductEntities);
//   const handleSaveEntity = async () => {
//     debugger;
//     // finalMapper.map((x) => {
//     //   x.mapperId += 1;
//     //   x.mID = x.mapperId;
//     //   x.mapperDetailsDTO.map((y) => {
//     //     let incrementedValue = y.mapperId + 1;
//     //     y.mapperId = incrementedValue;
//     //   });
//     // });
//     // setEntitydto([...Entitydto, attributesDto]);
//     const callCreateEntityss = await SaveDynamicListMapper(finalMapper);
//     console.log("asd", callCreateEntityss);
//     // console.log("asd01", MapperDTO);
//     if (callCreateEntityss.status === 200) {
//       // this.setState({ renderRedirect: true });
//       swal({
//         text: "Data Saved Successfully",
//         icon: "success",
//       });
//     } else {
//       swal({
//         text: "Failed to save the data, Server error",

//         icon: "error",
//       });
//     }
//   };
//   return (
//     <Grid container spacing={2} p={2}>
//       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//         {/* <MDInput label="DB Schema" /> */}
//         <Autocomplete
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               padding: "4px!important",
//             },
//           }}
//           id="mapperId"
//           //   value={{ mValue: mapperObject.mapperName }}
//           options={entity}
//           onChange={(e, value) => handleAutocomplete(e, value, "mapperName")}
//           getOptionLabel={(option) => option.mValue}
//           renderInput={(params) => <MDInput {...params} label="Mapper Name" required />}
//         />
//       </Grid>
//       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//         <MDInput
//           name="mapperName"
//           label="Mapper Name"
//           value={mapperObject.mapperName}
//           onChange={handleInput}
//         />
//       </Grid>
//       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//         <MDInput
//           name="sourceComponent"
//           label="Source Component"
//           value={mapperObject.sourceComponent}
//           onChange={handleInput}
//         />
//       </Grid>
//       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//         <MDInput
//           name="targetComponent"
//           label="Target Component"
//           value={mapperObject.targetComponent}
//           onChange={handleInput}
//         />
//       </Grid>
//       {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//         <Autocomplete
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               padding: "4px!important",
//             },
//           }}
//           id="mType"
//           options={
//             ProductMasterDTO.length > 0
//               ? ProductMasterDTO.filter((x) => x.mType === "Mapper")[0].mdata
//               : []
//           }
//           // onChange={(e, value) => handleAutocomplete(e, value, "mType")}
//           //   value={Obj}
//           getOptionLabel={(option) => option.mValue}
//           renderInput={(params) => <MDInput {...params} label="Select Config Type" required />}
//         />
//       </Grid>
//       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//         <Autocomplete
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               padding: "4px!important",
//             },
//           }}
//           id="sourceComponentId"
//           // onChange={(e, value) => handleAutocomplete(e, value, "source")}
//           // value={{ mValue: MapperDTO.sourceComponent }}
//           options={ProductEntities}
//           getOptionLabel={(option) => option.mValue}
//           renderInput={(params) => <MDInput {...params} label="Source Component" required />}
//         />
//       </Grid>
//       <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//         <Autocomplete
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               padding: "4px!important",
//             },
//           }}
//           id="targetComponentId"
//           options={product}
//           //   onChange={(e, value) => handleAutoTargetComponent(e, value, "targetComponent")}
//           //   value={targetObj}
//           getOptionLabel={(option) => option.mValue}
//           renderInput={(params) => <MDInput {...params} label="Target Component" required />}
//         />
//       </Grid> */}
//       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//         <Stack justifyContent="right" direction="row">
//           <MDButton onClick={handleClick}>ADD MAPPER</MDButton>
//         </Stack>
//       </Grid>
//       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//         <div style={{ height: 400, width: "100%" }}>
//           <DataGrid
//             autoHeight
//             rows={rows}
//             columns={columns}
//             pageSize={5}
//             // rowsPerPageOptions={[5]}
//           />
//         </div>
//       </Grid>
//       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//         <Stack justifyContent="right" direction="row">
//           <MDButton onClick={handleSaveEntity}>SAVE OBJECT MAPPER</MDButton>
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// }

// export default DynamicAttribute;
