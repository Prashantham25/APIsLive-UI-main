import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import EmpSideMenu from "./SideMenu";
import EmpSectionA from "./SectionA/SectionA";

function Empanelment() {
  const [value, setValue] = useState("Section A");
  const [content, setContent] = useState(<EmpSectionA />);
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value.item) if (value.item.content) setContent(value.item.content);
  }, [value]);

  return (
    <Card sx={{ borderRadius: 0 }}>
      <Grid container>
        <Grid item xl={2} md={2} xxl={2}>
          <EmpSideMenu handleChange={handleChange} />
        </Grid>
        <Grid item xl={10} md={10} xxl={10}>
          {content}
        </Grid>
      </Grid>
    </Card>
  );
}

export default Empanelment;
