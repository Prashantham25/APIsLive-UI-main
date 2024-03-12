import { useEffect, useState } from "react";
import {
  Grid,
  Autocomplete,
  Card,
  Stack,
  IconButton,
  InputBase,
  Paper,
  Fade,
  Popper,
} from "@mui/material";
import ob from "object-path";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import VideocamIcon from "@mui/icons-material/Videocam";
import ImageIcon from "@mui/icons-material/Image";
import PollIcon from "@mui/icons-material/PollRounded";

import background1 from "../../../../assets/images/Nepal/background1.jpg";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDInput from "../../../../components/MDInput";
import { WhatsAppApi } from "./data";
import MDTypography from "../../../../components/MDTypography";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

function WhatsappIntegration() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    console.log(newPlacement, event);
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const [urlData, setUrlData] = useState({ URL: "", Token: "" });
  const [obj, setObj] = useState({
    messaging_product: "whatsapp",
    to: "",
    type: "",
    text: {
      body: "",
    },
    template: {
      name: "",
      language: { code: "en_US" },
    },
    document: {
      link: "https://www.learningcontainer.com/sample-audio-file/#Sample_Mp3_file",
      caption: "",
    },
    image: {
      link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Fnature.html&psig=AOvVaw3HnqXAuN8ciJaZe1pZ7IQP&ust=1679646543271000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNieyeXQ8f0CFQAAAAAdAAAAABAD",
      caption: "",
    },
  });

  const template = ["hello_world", "success_acc"];
  const lang = [
    { label: "English", code: "en_US" },
    { label: "Hindi", code: "hi" },
  ];
  const type = ["template", "text", "document", "image", "audio", "video", "contacts", "location"];

  const onMDChange1 = (e) => {
    urlData[e.target.name] = e.target.value;
    setUrlData({ ...urlData });
  };
  const onUrlSave = () => {
    localStorage.setItem("saveUrl1132", urlData.URL);
    localStorage.setItem("saveToken1132", urlData.Token);
    localStorage.setItem("saveMobileNo1132", obj.to);
  };
  useEffect(() => {
    const resUrl = localStorage.getItem("saveUrl1132");
    const resToken = localStorage.getItem("saveToken1132");
    const mobileNo = localStorage.getItem("saveMobileNo1132");

    urlData.URL = resUrl;
    urlData.Token = resToken;
    obj.to = mobileNo;
    setUrlData({ ...urlData });
    setObj({ ...obj });
  }, []);
  const onMDChange = (e) => {
    if (e.target.name === "to") obj.to = e.target.value;
    if (e.target.name === "text") obj.text.body = e.target.value;
    if (e.target.name === "caption") obj.document.caption = e.target.value;

    setObj({ ...obj });
  };
  const onAutoChange = (e, a, n) => {
    if (n === "template") {
      obj.template.name = a;

      if (a === "success_acc") {
        obj.template.components = [
          {
            type: "header",
            parameters: [
              {
                type: "image",
                image: {
                  link: "https://www.bing.com/th?id=OADD2.8315203905231_178VVQLR96R7YW2IGO&pid=21.2&c=3&w=300&h=157&dynsize=1",
                },
              },
            ],
          },
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: "Prashanth",
              },
            ],
          },
        ];
      } else ob.del(obj, "template.components");
    }
    if (n === "lang") obj.template.language.code = a.code;
    if (n === "type") obj.type = a;
    setObj({ ...obj });
  };

  const onBrowseDoc = (e) => {
    // e.preventDefault();

    const urlLink = URL.createObjectURL(e.target.files[0]);
    console.log(12121, urlLink);
    obj.document.link = urlLink;
    setObj({ ...obj });
    const reader = new FileReader();
    reader.onload = async () => {};
    // reader.readAsText(e.target.files[0]);
  };

  const onApiClick = async () => {
    const number = `91${obj.to}`;

    const obj1 = { ...obj };
    obj1.to = number;

    Object.keys(obj).forEach((x) => {
      if (x !== "to" && x !== "messaging_product" && x !== "type" && x !== obj.type)
        ob.del(obj1, x);
    });

    const res = await WhatsAppApi(urlData.URL, `Bearer ${urlData.Token}`, obj1);
    console.log("res", res);
  };

  return (
    <MDBox>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput name="URL" label="URL" value={urlData.URL} onChange={onMDChange1} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput name="Token" label="Token" value={urlData.Token} onChange={onMDChange1} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput name="to" label="Mobile number" value={obj.to} onChange={onMDChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDButton onClick={onUrlSave}>Save</MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Autocomplete
                options={type}
                sx={autoStyle}
                getOptionLabel={(option) => option}
                onChange={(e, a) => onAutoChange(e, a, "type")}
                renderInput={(params) => <MDInput {...params} label="Type" />}
              />
            </Grid>
            {obj.type === "template" && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Autocomplete
                  options={template}
                  sx={autoStyle}
                  getOptionLabel={(option) => option}
                  onChange={(e, a) => onAutoChange(e, a, "template")}
                  renderInput={(params) => <MDInput {...params} label="Template" />}
                />
              </Grid>
            )}
            {obj.type === "template" && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Autocomplete
                  options={lang}
                  sx={autoStyle}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, a) => onAutoChange(e, a, "lang")}
                  renderInput={(params) => <MDInput {...params} label="Language" />}
                />
              </Grid>
            )}
            {obj.type === "document" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDButton variant="outlined" component="label">
                  Browse
                  <input hidden type="file" accept="text/*" onChange={onBrowseDoc} />
                </MDButton>
              </Grid>
            )}
            {obj.type === "document" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  name="caption"
                  label="Caption"
                  value={obj.document.caption}
                  onChange={onMDChange}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Card>
            <MDBox
              height="80vh"
              p={2}
              sx={{
                backgroundImage: `url(${background1})`,
                backgroundRepeat: "no-repeat",
              }}
            >
              <Stack spacing={1}>
                {["hi", "Hello"].map((x) => (
                  <MDBox width="100%" p={0.5} sx={{ bgcolor: "background.paper" }}>
                    <MDTypography>{x}</MDTypography>
                  </MDBox>
                ))}
              </Stack>
            </MDBox>
            <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                name="text"
                value={obj.text.body}
                onChange={onMDChange}
                placeholder="Message"
              />
              <IconButton sx={{ p: "10px" }} onClick={handleClick("top-start")}>
                <AttachFileIcon />
              </IconButton>
              <IconButton color="primary" sx={{ p: "10px" }} onClick={onApiClick}>
                <SendIcon />
              </IconButton>
            </Paper>
          </Card>
        </Grid>
      </Grid>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <IconButton component="label">
                    <input hidden type="file" accept="text/*" onChange={onBrowseDoc} />
                    <InsertDriveFileIcon fontSize="large" />
                  </IconButton>
                  <IconButton>
                    <ImageIcon fontSize="large" />
                  </IconButton>
                  <IconButton>
                    <VideocamIcon fontSize="large" />
                  </IconButton>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <IconButton>
                    <HeadphonesIcon fontSize="large" />
                  </IconButton>
                  <IconButton>
                    <LocationOnIcon fontSize="large" />
                  </IconButton>
                  <IconButton>
                    <PersonIcon fontSize="large" />
                  </IconButton>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <IconButton>
                    <PollIcon fontSize="large" />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          </Fade>
        )}
      </Popper>
    </MDBox>
  );
}
export default WhatsappIntegration;
