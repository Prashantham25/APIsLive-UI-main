import { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import SideMenu from "./SideMenu";
import ClaimDetails from "./ClaimDetails";

function Processing() {
  const [value, setValue] = useState("ClaimDetails");
  const [content, setContent] = useState(<ClaimDetails />);
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
          <SideMenu handleChange={handleChange} />
        </Grid>
        <Grid item xl={10} md={10} xxl={10}>
          {content}
        </Grid>
      </Grid>
    </Card>
  );
}
export default Processing;
