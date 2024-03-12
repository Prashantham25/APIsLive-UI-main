import React from "react";
import { Grid, Autocomplete } from "@mui/material";
import MDInput from "../../../../../../components/MDInput";

function AssignOtherServiceProvider() {
  // const [vendor, setvendor] = React.useState(false);
  // const [advocate, setadvocate] = React.useState(false);
  // const [reconstructionexpert, setreconstructionexpert] = React.useState(false);
  // const [forensicexpert, setforensicexpert] = React.useState(false);
  // const handleChangevendor = (event) => {
  //   const { checked } = event.target;
  //   setvendor(checked);
  // };
  // const handleChangeadvocate = (event) => {
  //   const { checked } = event.target;
  //   setadvocate(checked);
  // };
  // const handleChangereconstructionexpert = (event) => {
  //   const { checked } = event.target;
  //   setreconstructionexpert(checked);
  // };
  // const handleChangeforensicexpert = (event) => {
  //   const { checked } = event.target;
  //   setforensicexpert(checked);
  // };
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <MDInput
              {...params}
              label="Do You Want to Assign Other Service Provider"
              sx={{ mt: 3 }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

export default AssignOtherServiceProvider;
