import React, { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import swal from "sweetalert";
import {
  getTemplateByName,
  getMaster,
  getMasterTemplateData,
  saveTemplateDetails,
  DocumentUpload,
  getDocumentById,
} from "./data";
import data from "./data/JsonData";

const { Card, Grid, Stack, Autocomplete } = require("@mui/material");

function Templates() {
  const [templateName, setTemplateName] = useState("");
  const [templateJson, setTemplateJson] = useState(data);
  const [show, setShow] = useState(false);
  const [master, setMaster] = useState([]);
  const [ext] = useState(".pdf");
  const [templateMasterData, setTemplateMaster] = useState([]);
  const [templateTypeId, setTemplateTypeId] = useState({});
  const [languageId, setLanguageId] = useState({});
  const [communicationTypeId, setCommunicationTypeId] = useState({});
  const [templateTypeMaster, setTemplateTypeMaster] = useState([]);
  const [languageMaster, setLanguageMaster] = useState([]);
  const [communicationMaster, setCommunicationMaster] = useState([]);
  const [file, setFile] = useState();

  const handleAutoComplete = (e, value) => {
    templateJson[e.target.id.split("-")[0]] = value.mID;
    if (e.target.id.split("-")[0] === "templateTypeId") {
      setTemplateTypeId(value);
    } else if (e.target.id.split("-")[0] === "languageId") {
      setLanguageId(value);
    } else if (e.target.id.split("-")[0] === "communicationTypeId") {
      setCommunicationTypeId(value);
    }
    setTemplateJson((prev) => ({ ...prev, ...templateJson }));
  };

  const handleTempNameAutocomplete = (e, value) => {
    setTemplateName(value.mValue);
  };

  const handleChange = (e) => {
    templateJson[e.target.name] = e.target.value;
    setTemplateJson((prev) => ({ ...prev, ...templateJson }));
  };

  const handleAdd = () => {
    setShow(!show);
  };
  const onSubmit = async () => {
    templateJson.createdDate = new Date();
    setTemplateJson((prev) => ({ ...prev, ...templateJson }));
    const resp = await saveTemplateDetails(templateJson);
    console.log("resp", resp);
    if (resp.status === 200) {
      swal({ text: "Template Configured Successfully!", icon: "success", html: true });
    }
  };
  const handleSearch = async () => {
    const tempDataRes = await getTemplateByName(templateName);
    console.log("temlateNameData", tempDataRes);
    if (tempDataRes.templateTypeId !== 0) {
      setTemplateJson(tempDataRes);
      const temp = templateTypeMaster.filter((x) => x.mID === tempDataRes.templateTypeId)[0];
      const temp1 = languageMaster.filter((x) => x.mID === tempDataRes.languageId)[0];
      const temp2 = communicationMaster.filter((x) => x.mID === tempDataRes.communicationTypeId)[0];
      setTemplateTypeId(temp);
      setLanguageId(temp1);
      setCommunicationTypeId(temp2);
      setShow(!show);
    }
  };

  useEffect(() => {
    console.log("temlateJson", templateJson);
  }, [templateJson]);

  useEffect(async () => {
    const masterData = await getMaster();
    setMaster(masterData);
    console.log("master", master);
    Object.keys(masterData).forEach((x) => {
      if (masterData[x].mType === "TemplateType") {
        setTemplateTypeMaster([...templateTypeMaster, ...masterData[x].mdata]);
      } else if (masterData[x].mType === "Language") {
        setLanguageMaster([...languageMaster, ...masterData[x].mdata]);
      } else if (masterData[x].mType === "CommunicationType") {
        setCommunicationMaster([...communicationMaster, ...masterData[x].mdata]);
      }
    });
    const templateMaster = await getMasterTemplateData();
    setTemplateMaster(templateMaster.data);
    console.log("templateMasterData", templateMasterData);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      return;
    }
    if (file.name === `${templateJson.name}${ext}`) {
      const formData = new FormData();
      formData.append(file.name, file, file.name);
      const uploadres = await DocumentUpload(formData);
      if (uploadres.status === 1) {
        swal({ text: "Template Uploaded Successfully!", icon: "success", html: true });
      }
    } else {
      swal({ text: "Template Name and FileName should be same!", icon: "error", html: true });
    }
  };

  const generateFile = (content, fileName) => {
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    link.click();
  };

  const downloadTemplate = async () => {
    const name = `${templateJson.name}${ext}`;
    const res = await getDocumentById(name);
    if (res.data != null) {
      generateFile(res.data, name);
    }
  };

  return (
    <Card sx={{ height: "35rem" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Template Configuration
          </MDTypography>
        </Grid>
        {show === false ? (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="center" direction="row">
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  id="templateName"
                  options={
                    templateMasterData.length > 0
                      ? templateMasterData.filter((x) => x.mType === "InsuranceCertificate")[0]
                          .mdata
                      : []
                  }
                  onChange={handleTempNameAutocomplete}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput sx={{ width: "325px" }} {...params} label="Template Name" required />
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="center" direction="row" spacing={2} mx={2}>
                <MDButton onClick={handleAdd}>ADD NEW </MDButton>

                <MDButton onClick={handleSearch}> SEARCH</MDButton>
              </Stack>
            </Grid>
          </>
        ) : null}
        {show === true && (
          <>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Template Name"
                required
                value={templateJson.name}
                onChange={(e) => handleChange(e)}
                name="name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Description"
                required
                value={templateJson.description}
                onChange={(e) => handleChange(e)}
                name="description"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="templateTypeId"
                options={templateTypeMaster}
                onChange={handleAutoComplete}
                value={JSON.stringify(templateTypeId) === "{}" ? null : templateTypeId}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Template Type" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="languageId"
                options={languageMaster}
                onChange={handleAutoComplete}
                value={JSON.stringify(languageId) === "{}" ? null : languageId}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Language" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="communicationTypeId"
                options={communicationMaster}
                onChange={handleAutoComplete}
                value={JSON.stringify(communicationTypeId) === "{}" ? null : communicationTypeId}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="Communication Type" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Dynamic Details"
                value={templateJson.dynamicDetails}
                name="dynamicDetails"
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Report Name"
                value={templateJson.methodName}
                name="methodName"
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" color="primary">
                Upload Template
              </MDTypography>
              <input
                accept="image/bmp, image/jpeg, image/png, .pdf, .cshtml"
                type="file"
                onChange={handleFileChange}
              />
              <MDButton onClick={handleFileUpload}>Upload</MDButton>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Template Location" />
            </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="right" direction="row" spacing={2}>
                <MDButton onClick={downloadTemplate}>Download Template</MDButton>
                <MDButton onClick={onSubmit}>SAVE</MDButton>
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
}

export default Templates;
