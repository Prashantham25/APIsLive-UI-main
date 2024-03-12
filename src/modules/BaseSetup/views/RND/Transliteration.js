import { useState } from "react";
import { Grid, Stack } from "@mui/material";
import MDButton from "../../../../components/MDButton";
import MDInput from "../../../../components/MDInput";
import MDBox from "../../../../components/MDBox";
import { Transliteration as Trans } from "./data";

function Transliteration() {
  const [inputText, setInputText] = useState([{ Text: "", RText: "" }]);

  const onMDChange = (e, i) => {
    inputText[i].Text = e.target.value;
    setInputText([...inputText]);
  };

  const onAdd = () => {
    inputText.push({ Text: "", RText: "" });
    setInputText([...inputText]);
  };

  const onTrans = async () => {
    const obj = {
      TextList: inputText,
    };
    const res = await Trans(obj);
    res.forEach((x, i) => {
      inputText[i].RText = x.text;
    });
    setInputText([...inputText]);
  };
  return (
    <MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton onClick={onAdd}>Add</MDButton>
        </Grid>

        {inputText.map((x, i) => (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDInput label="Input Text" value={x.Text} onChange={(e) => onMDChange(e, i)} />
              <MDInput label="Output Text" value={x.RText} />
            </Stack>
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton onClick={onTrans}>Transliterate</MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default Transliteration;
