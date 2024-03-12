import React, { useEffect } from "react";

import { Grid, FormControlLabel, FormGroup, Checkbox, Stack, Autocomplete } from "@mui/material";
import Radio from "@mui/material/Radio";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioGroup from "@mui/material/RadioGroup";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDDatePicker from "../../../../../components/MDDatePicker";

function Discount() {
  const [setPED, setPEDFlag] = React.useState(true);
  const [value, setValue] = React.useState("No");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value === "No") setPEDFlag(false);
    else setPEDFlag(true);
  });
  const [setPED1, setPEDFlag1] = React.useState(true);
  const [value1, setValue1] = React.useState("No");

  const handleChange1 = (event) => {
    setValue1(event.target.value);
  };

  useEffect(() => {
    if (value1 === "No") setPEDFlag1(false);
    else setPEDFlag1(true);
  });

  // const [rows, setrows] = React.useState([]);
  // const [rowsid, setrowsid] = React.useState(0);

  // const handleAddRow = () => {
  //   setrows([...rows, { id: rowsid + 1 }]);

  //   setrowsid(rowsid + 1);
  // };

  const [final, setfinal] = React.useState(false);
  const [volume, setvolume] = React.useState(false);
  const [early, setearly] = React.useState(false);

  const handleChangefinal = (event) => {
    const { checked } = event.target;
    setfinal(checked);
  };
  const handleChangevolume = (event) => {
    const { checked } = event.target;
    setvolume(checked);
  };
  const handleChangeearly = (event) => {
    const { checked } = event.target;
    setearly(checked);
  };
  const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
      fontSize: "0.6 rem",
    },
  };
  const [rows, setrows] = React.useState([]);
  const [rowsid, setrowsid] = React.useState(0);

  const handleAddRow = () => {
    setrows([...rows, { id: rowsid + 1 }]);

    setrowsid(rowsid + 1);
  };
  const [rowsearly, setrowsearly] = React.useState([]);
  const [rowsearlyid, setrowsearlyid] = React.useState(0);

  const handleAddRowearly = () => {
    setrowsearly([...rowsearly, { id: rowsearlyid + 1 }]);

    setrowsearlyid(rowsearlyid + 1);
  };
  const [rowscategory, setrowscategory] = React.useState([]);
  const [rowscategoryid, setrowscategoryid] = React.useState(0);

  const handleAddrowscategory = () => {
    setrowscategory([...rowscategory, { id: rowscategoryid + 1 }]);

    setrowscategoryid(rowscategoryid + 1);
  };
  function versioninput() {
    return (
      <Autocomplete
        fullWidth
        options={[]}
        getOptionLabel={(option) => option}
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "4px",
          },
        }}
        renderInput={(params) => <MDInput {...params} sx={{ mb: 1 }} />}
      />
    );
  }
  const columnscategory = [
    {
      field: "id",
      headerName: "Sr.No.",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 90,
    },
    {
      field: "level",
      headerName: "Level 1 Code",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: () => <MDInput />,
    },

    {
      field: "leveldescription",
      headerName: "Level 1  Description",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => versioninput(),
    },
    {
      field: "discount",
      headerName: "Discount %",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 230,
      editable: true,
      renderCell: () => <MDInput />,
    },
  ];
  const columns = [
    {
      field: "from",
      headerName: "Claims From",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: () => <MDInput />,
    },

    {
      field: "to",
      headerName: "Claims To",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      renderCell: () => <MDInput />,
    },
    {
      field: "discount",
      headerName: "Discount %",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 230,
      editable: true,
      renderCell: () => <MDInput />,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 150,

      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rows.filter((row) => row.id !== param.id);

          setrows([...newArray]);
        };

        return <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];
  const columnsearly = [
    {
      field: "from",
      headerName: "From Days",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: () => <MDDatePicker />,
    },

    {
      field: "to",
      headerName: "To  Days",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: () => <MDDatePicker />,
    },
    {
      field: "Discount",
      headerName: "Discount %",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 230,
      editable: true,
      renderCell: () => <MDInput />,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 150,

      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rowsearly.filter((row) => row.id !== param.id);

          setrowsearly([...newArray]);
        };

        return <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Configure Discount ?
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChange(event)} value={value}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      {setPED && (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <RadioGroup
              row
              sx={{ mt: 2 }}
              onChange={(event) => handleChange1(event)}
              value1={value}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Discount Type
"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="Discount on Categories
"
              />
            </RadioGroup>
          </Grid>
          {setPED1 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <FormGroup sx={{ mt: -0.5 }}>
                <FormControlLabel
                  sx={{ ...formControlLabelStyle }}
                  control={
                    <Checkbox
                      sx={{ transform: "scale(0.8)" }}
                      type="checkbox"
                      name="Status"
                      checked={final} // <-- set the checked prop of input
                      onChange={(event) => handleChangefinal(event)}
                    />
                  }
                  label="Final Bill"
                />{" "}
                {final && (
                  <Grid container columns={8} spacing={2}>
                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput label=" Discount" />
                    </Grid>

                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3}>
                      <Autocomplete
                        fullWidth
                        options={["unknown"]}
                        getOptionLabel={(option) => option}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px",
                          },
                        }}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            label="  Excluding
            "
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}
                <FormControlLabel
                  sx={{ ...formControlLabelStyle }}
                  control={
                    <Checkbox
                      sx={{ transform: "scale(0.8)" }}
                      type="checkbox"
                      name="Status"
                      checked={volume} // <-- set the checked prop of input
                      onChange={(event) => handleChangevolume(event)}
                    />
                  }
                  label=" Volume Payment"
                />
                {volume && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDBox
                      sx={{
                        mt: 3,
                        ml: 10,
                        width: "80%",
                        "& .super-app-theme--header": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <DataGrid
                        autoHeight
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        experimentalFeatures={{ newEditingApi: true }}
                      />
                    </MDBox>
                    <Stack justifyContent="left" direction="row">
                      <MDButton
                        color="info"
                        sx={{ justifyContent: "left", mr: 2, mt: 2 }}
                        onClick={handleAddRow}
                      >
                        ADD
                      </MDButton>
                    </Stack>
                  </Grid>
                )}
                <FormControlLabel
                  sx={{ ...formControlLabelStyle }}
                  control={
                    <Checkbox
                      sx={{ transform: "scale(0.8)" }}
                      type="checkbox"
                      name="Status"
                      checked={early} // <-- set the checked prop of input
                      onChange={(event) => handleChangeearly(event)}
                    />
                  }
                  label=" Early Payment"
                />
                {early && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDBox
                      sx={{
                        mt: 3,
                        ml: 10,
                        width: "80%",
                        "& .super-app-theme--header": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <DataGrid
                        autoHeight
                        rows={rowsearly}
                        columns={columnsearly}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        experimentalFeatures={{ newEditingApi: true }}
                      />
                    </MDBox>
                    <Stack justifyContent="left" direction="row">
                      <MDButton
                        color="info"
                        sx={{ justifyContent: "left", mr: 2, mt: 2 }}
                        onClick={handleAddRowearly}
                      >
                        ADD
                      </MDButton>
                    </Stack>
                  </Grid>
                )}
              </FormGroup>
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox
                sx={{
                  mt: 3,
                  ml: 10,
                  width: "80%",
                  "& .super-app-theme--header": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <DataGrid
                  autoHeight
                  rows={rowscategory}
                  columns={columnscategory}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </MDBox>
              <Stack justifyContent="right" direction="row">
                <MDButton
                  color="info"
                  sx={{ justifyContent: "right", mr: 2, mt: 2 }}
                  onClick={handleAddrowscategory}
                >
                  ADD
                </MDButton>
              </Stack>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
                  <MDButton color="info">SUBMIT</MDButton>
                  <MDButton color="info">CANCEL</MDButton>
                </Stack>
              </Grid>
            </Grid>
          )}
        </>
      )}

      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} columns={10}>
        <MDInput label="DEO Remarks" sx={{ mt: 2 }} />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
          <MDButton color="info">SUBMIT</MDButton>
          <MDButton color="info">CANCEL</MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Discount;
