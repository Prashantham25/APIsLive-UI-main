import React, { useEffect } from "react";
import { Grid, Stack, Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import swal from "sweetalert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Video from "assets/images/BrokerPortal/Admin/video.png";
// import Word from "assets/images/BrokerPortal/Admin/word.png";
import Pdf from "assets/images/BrokerPortal/Admin/pdf.png";
// import Excel from "assets/images/BrokerPortal/Admin/excel.png";
// import Ppt from "assets/images/BrokerPortal/Admin/ppt.png";
// import Embed from "assets/images/BrokerPortal/Admin/embed.png";
// import Text from "assets/images/BrokerPortal/Admin/text.png";
// import { LegendToggle } from "@mui/icons-material";
import MDTypography from "../../../../../../../components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";
import MDBox from "../../../../../../../components/MDBox";
import MDInput from "../../../../../../../components/MDInput";
import { DeleteFile } from "../data/index";
import { DocumentSave } from "../../../MyProfile/data";

function Modules({
  setmoduleDetails,
  moduleDetails,
  moduleobject,
  setmoduleUpload,
  setsubModuleUpload,
  // setCourseDetails,
  CourseDetail,
  handleNext,
  handleBack,
  flags,
  setFlags,
}) {
  useEffect(() => {
    const array = [...moduleDetails];
    if (CourseDetail.NoofModules > 1) {
      for (let i = 1; i < CourseDetail.NoofModules; i += 1) {
        array.push(moduleobject);
      }
      console.log("array", array);
      setmoduleDetails(array);
    }
  }, []);
  console.log("moduleDetails", moduleDetails);

  // const [PDFUpload, setPDFUpload] = useState({
  //   moduleUpload: "",
  //   subModuleUpload: "",
  // });

  const uploadFiles = async (files, modIndex, type) => {
    const formData = new FormData();
    formData.append("file", files, files.name);
    await DocumentSave(formData).then((result) => {
      console.log("result", result);
      if (result.data[0].fileName !== "") {
        if (type === "moduleUpload") {
          // setPDFUpload((prevState) => ({ ...prevState, moduleUpload: result.data[0].fileName }));
          // setPDFUpload(files);
          const moduleDetailsNew = { ...moduleDetails[modIndex] };
          moduleDetailsNew.Material[0].Path = result.data[0].fileName;
          moduleDetails.splice(modIndex, 1, { ...moduleDetailsNew });
          setmoduleDetails([...moduleDetails]);
          setmoduleUpload(files);
        }
      }
    });
  };

  const SubuploadFiles = async (files, modIndex, subModIndex, type) => {
    const formData = new FormData();
    formData.append("file", files, files.name);
    await DocumentSave(formData).then((result) => {
      console.log("result", result);
      if (result.data[0].fileName !== "") {
        if (type === "subModuleUpload") {
          // setPDFUpload((prevState) => ({ ...prevState, subModuleUpload: result.data[0].fileName }));
          const subModule = { ...moduleDetails[modIndex] };
          subModule.ModuleDetails[subModIndex].SortOrder = subModIndex + 1;
          subModule.ModuleDetails[subModIndex].Material[0].Path = result.data[0].fileName;
          moduleDetails.splice(modIndex, 1, { ...subModule });
          setmoduleDetails([...moduleDetails]);
          setsubModuleUpload(files);
          // setPDFUpload(files);
        }
      }
    });
  };

  const handleSubFileUpload = async (event, modIndex, subModIndex, type) => {
    await SubuploadFiles(event.target.files[0], modIndex, subModIndex, type);
    console.log("files", event.target.files[0]);
  };

  const handleFileUpload = async (event, modIndex, type) => {
    await uploadFiles(event.target.files[0], modIndex, type);
    console.log("files", event.target.files[0]);
  };

  const handleDeleteFile = async (type, fileName, modIndex, subModIndex) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        if (type === "moduleUpload") {
          const moduleDetailsNew = { ...moduleDetails[modIndex] };
          moduleDetailsNew.Material[0].Path = "";
          moduleDetails.splice(modIndex, 1, { ...moduleDetailsNew });
          setmoduleDetails([...moduleDetails]);
          setmoduleUpload();
        }
        if (type === "subModuleUpload") {
          const subModule = { ...moduleDetails[modIndex] };
          subModule.ModuleDetails[subModIndex].Material[0].Path = "";
          moduleDetails.splice(modIndex, 1, { ...subModule });
          setmoduleDetails([...moduleDetails]);
          setsubModuleUpload();
        }
      }
    });
  };

  const handleModuleChange = (e, index) => {
    const moduleDetailsNew = { ...moduleDetails[index] };
    moduleDetailsNew[e.target.name] = e.target.value;
    moduleDetails.splice(index, 1, { ...moduleDetailsNew });
    setmoduleDetails([...moduleDetails]);
  };

  const handleSubModuleChange = (index) => {
    const moduleDetailsNew = moduleDetails;
    const subModuleobject = moduleobject.ModuleDetails[0];
    const subModulearray = moduleDetails[index].ModuleDetails;
    const newArray = [...subModulearray, subModuleobject];
    console.log("subModulearray", newArray);
    moduleDetailsNew[index].ModuleDetails = newArray;
    setmoduleDetails([...moduleDetailsNew]);
  };

  const handleSubModuledeleteChange = (modIndex, subModIndex) => {
    const arrModuleDetails = moduleDetails;
    const subModule = { ...moduleDetails[modIndex] };
    subModule.ModuleDetails = subModule.ModuleDetails.filter((x, index) => index !== subModIndex);
    arrModuleDetails[modIndex] = subModule;
    // moduleDetails.splice(i, 1, { ...subModule });
    // const newFilterInput = moduleDetails.filter((x) => x !==s null);
    // setmoduleDetails(newFilterInput);
    setmoduleDetails(() => [...arrModuleDetails]);
  };

  const handleSubModuleFields = (e, modIndex, subModIndex) => {
    const subModule = { ...moduleDetails[modIndex] };
    subModule.ModuleDetails[subModIndex][e.target.name] = e.target.value;
    moduleDetails.splice(modIndex, 1, { ...subModule });
    setmoduleDetails([...moduleDetails]);
  };

  const handleModuleName = (e, index) => {
    if (e.target.name === "ModuleName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value || e.target.value === "")) {
        const moduleDetailsNew = { ...moduleDetails[index] };
        moduleDetailsNew[e.target.name] = e.target.value;
        moduleDetails.splice(index, 1, { ...moduleDetailsNew });
        setmoduleDetails([...moduleDetails]);
      }
    }
  };

  const handleSubModuleName = (e, modIndex, subModIndex) => {
    if (e.target.name === "ModuleName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value || e.target.value === "")) {
        const subModule = { ...moduleDetails[modIndex] };
        subModule.ModuleDetails[subModIndex][e.target.name] = e.target.value;
        moduleDetails.splice(modIndex, 1, { ...subModule });
        setmoduleDetails([...moduleDetails]);
      }
    }
  };

  const handleAddModule = () => {
    const obj = {
      disabled: true,
      defaultExpanded: false,
      ModuleName: "",
      ModuleDescription: "",
      TimeDuration: "",
      Type: "Module",
      SortOrder: 1,
      Duration: "",
      Material: [
        {
          StudyMaterial: "",
          Path: "",
          DocumentID: "",
          SortOrder: 1,
        },
      ],
      ModuleDetails: [
        {
          ModuleName: "",
          ModuleDescription: "",
          Content: "Content1",
          Type: "SubModule",
          SortOrder: 1,
          Material: [
            {
              StudyMaterial: "",
              Path: "",
              DocumentID: "",
              SortOrder: 1,
            },
          ],
        },
      ],
    };

    setmoduleDetails((prevState) => [
      ...prevState,
      {
        ...obj,
      },
    ]);
  };

  const handleProceed = () => {
    if (
      moduleDetails.some(
        (x) =>
          x.ModuleName === "" ||
          x.TimeDuration === "" ||
          x.ModuleDescription === "" ||
          x.Material[0].Path === "" ||
          x.ModuleDetails.some(
            (y) => y.ModuleName === "" || y.ModuleDescription === "" || y.Material[0].Path === ""
          )
      )
    ) {
      swal({
        icon: "error",
        text: "Please fill the Required fields",
      });
      setFlags(true);
    } else {
      setFlags(false);
      handleNext();
    }
  };

  return (
    <MDBox p={3}>
      <Stack justifyContent="space-between" direction="row">
        <Grid>
          <MDTypography
            sx={{
              fontweight: "700",
              fontsize: "1.125 rem",
              color: "#0071D9",
            }}
          >
            Module Details of {CourseDetail.CourseName}
            {/* POSP Non-life & Health Insurance */}
          </MDTypography>
        </Grid>
        <Grid>
          <MDButton variant="outlined" startIcon={<AddIcon />} onClick={handleAddModule}>
            Add New Module
          </MDButton>
        </Grid>
      </Stack>
      <MDBox sx={{ mt: 2, justifyContent: "center" }}>
        {moduleDetails.map((item, index) => (
          <Accordion
            defaultExpanded
            disableGutters
            sx={{
              boxShadow: "unset",
              border: "unset",
              borderRadius: "15px",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#E8F4FF" }}>
              <Grid container justifyContent="space-between" direction="row">
                <MDTypography
                  variant="h6"
                  sx={{ color: "#000000", fontSize: "1 rem", fontweight: "400" }}
                >
                  Module {index + 1}
                </MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{
                    color: "#1976D2",
                    fontSize: " 0.875 rem",
                    fontweight: "400",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Preview
                </MDTypography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={3}>
                <Grid item sm={12} md={12} lg={5} xl={5} xxl={5}>
                  <MDInput
                    label=" Name of Module"
                    value={item.ModuleName}
                    onChange={(e) => handleModuleName(e, index)}
                    // onBlur={handleModuleName}
                    name="ModuleName"
                    required
                    sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                    error={item.ModuleName === "" ? flags : null}
                  />
                  {flags && item.ModuleName === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item sm={12} md={12} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Time Duration"
                    value={item.TimeDuration}
                    onChange={(e) => handleModuleChange(e, index)}
                    name="TimeDuration"
                    placeholder="00 hrs"
                    required
                    sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                    error={item.TimeDuration === "" ? flags : null}
                  />
                  {flags && item.TimeDuration === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <MDButton
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleSubModuleChange(index)}
                  >
                    Sub Module
                  </MDButton>
                </Grid>

                <Grid item sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    focussed
                    label="Description"
                    multiline
                    value={item.ModuleDescription}
                    onChange={(e) => handleModuleChange(e, index)}
                    name="ModuleDescription"
                    required
                    sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                    error={item.ModuleDescription === "" ? flags : null}
                    // value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  />
                  {flags && item.ModuleDescription === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent="center"
                width="60%"
                sx={{ p: 2, border: "1px dashed grey", mb: 3, mt: 3, ml: "140px" }}
              >
                <Grid item xs={6} sm={6} md={6} lg={1.71} xl={1.71} xxl={1.71}>
                  <Button component="label">
                    <MDBox
                      component="img"
                      src={Pdf}
                      // onClick={handleFileUpload}
                    />
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, index, "moduleUpload")}
                      hidden
                      error={item.Material[0].Path === "" ? flags : null}
                      accept="application/pdf"
                    />
                  </Button>
                  {/* <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "9px" }}>
                    {item.Material[0].Path}
                  </MDTypography> */}
                  <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "9px" }}>
                    {item.Material[0].Path !== "" ? item.Material[0].Path : null}
                    {item.Material[0].Path !== "" ? (
                      <CancelIcon
                        sx={{ ml: "2px" }}
                        color="primary"
                        onClick={() =>
                          handleDeleteFile("moduleUpload", item.Material[0].Path, index)
                        }
                      />
                    ) : null}
                  </MDTypography>
                  {flags && item.Material[0].Path === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                </Grid>

                {/* <Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
   <Button>
     <MDBox component="img" src={Video} />
   </Button>
 </Grid>
 <Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
   <Button>
     <MDBox component="img" src={Embed} />
   </Button>
 </Grid> */}
                {/* <Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
   <Button>
     <MDBox component="img" src={Ppt} />
   </Button>
 </Grid>
 <Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
   <Button>
     <MDBox component="img" src={Word} />
   </Button>
 </Grid>
 <Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
   <Button>
     <MDBox component="img" src={Excel} />
   </Button>
 </Grid> */}
                <MDTypography
                  variant="h6"
                  sx={{ color: "background: #0071D9", fontSize: " 0.625 rem", fontweight: "400" }}
                >
                  Select any option to upload
                </MDTypography>
              </Grid>
              {item.ModuleDetails.map((itm, idx) => (
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{
                    boxShadow: "unset",
                    border: "unset",
                    borderRadius: "15px",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ backgroundColor: " #FFC672" }}
                  >
                    <Grid container justifyContent="space-between" direction="row">
                      <MDTypography
                        variant="h6"
                        sx={{ color: "#000000", fontSize: "1 rem", fontweight: "400" }}
                      >
                        Sub Module {index + 1}.{idx + 1}
                      </MDTypography>
                      <DeleteOutlineIcon
                        baseClassName="material-icons-two-tone"
                        onClick={() => handleSubModuledeleteChange(index, idx)}
                      />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails expandIcon={<ExpandMoreIcon />}>
                    <Grid container spacing={2} mb={3}>
                      <Grid item sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDInput
                          // label=`${"Name of Sub-Module"}{index+1}.{idx+1}`
                          // label={`${Name of Module ${index+1}${"."}{idx+1}}`}
                          label={`${"Name of Sub-Module"}${" "}${index + 1}${"."}${idx + 1}`}
                          value={itm.ModuleName}
                          name="ModuleName"
                          onChange={(e) => {
                            handleSubModuleName(e, index, idx);
                          }}
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          error={itm.ModuleName === "" ? flags : null}
                        />
                        {flags && itm.ModuleName === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      {/* sm={12} md={12} lg={12} xl={12} xxl={12} */}
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDInput
                          focussed
                          label="Description"
                          multiline
                          name="ModuleDescription"
                          onChange={(e) => {
                            handleSubModuleFields(e, index, idx);
                          }}
                          value={itm.ModuleDescription}
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          error={itm.ModuleDescription === "" ? flags : null}
                          // value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                        />
                        {flags && itm.ModuleDescription === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent="center"
                      width="60%"
                      sx={{ p: 2, border: "1px dashed grey", ml: "140px" }}
                    >
                      {/* <Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
<Button>
<MDBox component="img" src={Text} />
</Button>
</Grid> */}
                      {/* <Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
<Button>
<MDBox component="img" src={Pdf} />
</Button>
</Grid> */}
                      <Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
                        <Button component="label">
                          <MDBox component="img" src={Pdf} />
                          <input
                            type="file"
                            onChange={(e) => handleSubFileUpload(e, index, idx, "subModuleUpload")}
                            hidden
                            accept="application/pdf"
                            error={itm.Material[0].Path === "" ? flags : null}
                          />
                        </Button>
                        {/* <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "9px" }}>
                          {itm.Material[0].Path}
                        </MDTypography> */}
                        <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "9px" }}>
                          {itm.Material[0].Path !== "" ? itm.Material[0].Path : null}
                          {itm.Material[0].Path !== "" ? (
                            <CancelIcon
                              sx={{ ml: "2px" }}
                              color="primary"
                              onClick={() =>
                                handleDeleteFile(
                                  "subModuleUpload",
                                  itm.Material[0].Path,
                                  index,
                                  idx
                                )
                              }
                            />
                          ) : null}
                        </MDTypography>
                        {flags && itm.Material[0].Path === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>

                      {/* <Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
<Button>
<MDBox component="img" src={Video} />
</Button>
</Grid>
<Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
<Button>
<MDBox component="img" src={Embed} />
</Button>
</Grid>
<Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
<Button>
<MDBox component="img" src={Ppt} />
</Button>
</Grid>
<Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
<Button>
<MDBox component="img" src={Word} />
</Button>
</Grid>
<Grid item xs={6} sm={6} md={1.71} lg={1.71} xl={1.71} xxl={1.71}>
<Button>
<MDBox component="img" src={Excel} />
</Button>
</Grid> */}
                      <MDTypography
                        variant="h6"
                        sx={{
                          color: "background: #0071D9",
                          fontSize: " 0.625 rem",
                          fontweight: "400",
                        }}
                      >
                        Select any option to upload
                      </MDTypography>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </MDBox>{" "}
      {/* <Grid container spacing={2} display="flex" flexDirection="row">
        <Grid item>
          <MDButton
            startIcon={<ArrowBackIcon />}
            variant="contained"
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Previous
          </MDButton>
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <MDButton variant="outlined">Save</MDButton>
          </Grid>
          <Grid item>
            <MDButton onClick={handleProceed}>Next</MDButton>
          </Grid>
        </Grid>
      </Grid> */}
      <MDBox>
        <Grid container direction="row">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox display="flex" justifyContent="flex-start">
              {" "}
              <MDButton
                startIcon={<ArrowBackIcon />}
                variant="contained"
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Previous
              </MDButton>{" "}
            </MDBox>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            {" "}
            <MDBox display="flex" justifyContent="flex-end">
              <MDButton variant="outlined">SAVE</MDButton>
              &nbsp;&nbsp;
              <MDButton onClick={handleProceed}>Next</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Modules;
