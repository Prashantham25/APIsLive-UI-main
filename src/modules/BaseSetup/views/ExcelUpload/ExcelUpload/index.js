import { useEffect, useState } from "react";
import { Grid, Autocomplete } from "@mui/material";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import { GetTemplateMasterList } from "../data";

const sty = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

function ExcelUpload() {
  const [templateList, setTemplateList] = useState([]);
  const [SelectedTemplate, setSelectedTemplate] = useState({});

  const onTemplateSelect = (e, v) => {
    setSelectedTemplate(v);
    console.log(e, v);
  };

  const onDownTemplate = () => {
    const token = localStorage.getItem("token");
    fetch(
      `https:devapi.inubesolutions.com/api/ExcelUpload/GetTemplateDetails?TemplateId=${SelectedTemplate.mID}`,
      {
        method: "GET",
        headers: {
          Authorization: token === "" ? process.env.REACT_APP_API_KEY : `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.blob())
      .then((myBlob) => {
        if (myBlob === null) {
          alert("Template Download Failed");
        } else {
          const url = window.URL.createObjectURL(myBlob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${SelectedTemplate.mValue}.xlsx`;
          a.click();
        }
      });
  };
  useEffect(async () => {
    await GetTemplateMasterList().then((res) => {
      setTemplateList([...res.data]);
    });
  }, []);

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF" }} p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>Excel Upload</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            fullWidth
            options={templateList}
            getOptionLabel={(option) => option.mValue}
            sx={sty}
            renderInput={(params) => <MDInput {...params} label="Template Name" />}
            onChange={onTemplateSelect}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton variant="outlined" onClick={onDownTemplate}>
            Download Template
          </MDButton>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton>Upload</MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default ExcelUpload;
