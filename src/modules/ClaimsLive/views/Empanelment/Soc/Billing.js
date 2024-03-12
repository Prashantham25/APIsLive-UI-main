import React from "react";
import { Grid, FormControlLabel, Stack, Autocomplete, Checkbox, FormGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import RadioGroup from "@mui/material/RadioGroup";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDDatePicker from "../../../../../components/MDDatePicker";

function Billing() {
  const [value, setValue] = React.useState("No");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
      fontSize: "0.6 rem",
    },
  };
  const Info = [
    "LOS",
    "Extra AC Charges",
    "Extra Gas Charges",
    "Non Working Days & Hours",
    "Doctor Visit Charges",

    "Surgeon Charges",
    "Anesthesia Charges",
    "Standby Anesthesia Charges",
    "OT Charges - Room & GA",

    "OT Charges - Day Care & LA",
    "Charges For Special Equipment",
    "Day Care Charges",
    "Special Patient Type",
    "Bed Transfer",
  ];
  const [chip, setchip] = React.useState("");

  const handleClick = (e) => {
    setchip(e.target.innerText);
  };
  const [losyn, setlosyn] = React.useState("");
  const handleChangelos = (event) => {
    setlosyn(event.target.value);
  };

  const [holidayyn, setholidayyn] = React.useState("");
  const handleChangeholidays = (event) => {
    setholidayyn(event.target.value);
  };
  const [doctoryn, setdoctoryn] = React.useState("");
  const handleChangeDoctor = (event) => {
    setdoctoryn(event.target.value);
  };
  const [Anesthesiayn, setAnesthesiayn] = React.useState("");
  const handleChangeAnesthesia = (event) => {
    setAnesthesiayn(event.target.value);
  };
  const [Acyn, setAcyn] = React.useState("");
  const handleChangeAc = (event) => {
    setAcyn(event.target.value);
  };
  const [Acflatyn, setAcflatyn] = React.useState("");
  const handleChangeAcflatyn = (event) => {
    setAcflatyn(event.target.value);
  };
  const [surgeonyn, setsurgeonyn] = React.useState("");
  const handleChangeSurgeon = (event) => {
    setsurgeonyn(event.target.value);
  };
  const [Gasyn, setGasyn] = React.useState("");
  const handleChangeGas = (event) => {
    setGasyn(event.target.value);
  };
  const [Gasflatyn, setGasflatyn] = React.useState("");
  const handleChangeGasflatyn = (event) => {
    setGasflatyn(event.target.value);
  };
  const [standbyyn, setstandbyyn] = React.useState("");
  const handleChangestandbyyn = (event) => {
    setstandbyyn(event.target.value);
  };
  const [equipmentyn, setequipmentyn] = React.useState("");
  const handleChangeequipmentyn = (event) => {
    setequipmentyn(event.target.value);
  };
  const [otchargesyn, setotchargesyn] = React.useState("");
  const handleChangeotchargesyn = (event) => {
    setotchargesyn(event.target.value);
  };
  const [Ottypeyn, setOttypeyn] = React.useState("");
  const handleChangeOttypeyn = (event) => {
    setOttypeyn(event.target.value);
  };
  const [Otflatyn, setOtflatyn] = React.useState("");
  const handleChangeOtflatyn = (event) => {
    setOtflatyn(event.target.value);
  };
  const [otdaycaresyn, setotdaycaresyn] = React.useState("");
  const handleChangeotdaycaresyn = (event) => {
    setotdaycaresyn(event.target.value);
  };
  const [Otdaycaretypeyn, setOtdaycaretypeyn] = React.useState("");
  const handleChangeOtdaycaretypeyn = (event) => {
    setOtdaycaretypeyn(event.target.value);
  };
  const [Otfaltdayyn, setOtfaltdayyn] = React.useState("");
  const handleChangeOtfaltdayyn = (event) => {
    setOtfaltdayyn(event.target.value);
  };
  const [daycare, setdaycareyn] = React.useState("");
  const handleChangedaycareyn = (event) => {
    setdaycareyn(event.target.value);
  };
  const [daycarecontent, setdaycarecontentyn] = React.useState("");
  const handleChangedaycarecontentyn = (event) => {
    setdaycarecontentyn(event.target.value);
  };
  const [Special, setSpecial] = React.useState("");
  const handleChangeSpecialyn = (event) => {
    setSpecial(event.target.value);
  };
  const [BedTransfer, setBedTransfer] = React.useState("");
  const handleChangeBedTransferyn = (event) => {
    setBedTransfer(event.target.value);
  };

  const [Lowtohigh, setLowtohigh] = React.useState(false);
  const [Hightolow, setHightolow] = React.useState(false);
  const handleChangeLowtohigh = (event) => {
    const { checked } = event.target;
    setLowtohigh(checked);
  };
  const handleChangeHightolow = (event) => {
    const { checked } = event.target;
    setHightolow(checked);
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
        renderInput={(params) => <MDInput {...params} sx={{ mb: 1 }} label="Select factor" />}
      />
    );
  }
  function mapsocinput() {
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
        renderInput={(params) => <MDInput {...params} sx={{ mb: 1 }} label="Mapsoc level 5" />}
      />
    );
  }
  const [inputFieldCount, setInputFieldCount] = React.useState(0);

  const generateNotes = () => {
    setInputFieldCount((count) => count + 1);
  };
  const deleteNotes = () => {
    setInputFieldCount((count) => count - 1);
  };
  const [rows, setrows] = React.useState([]);
  const [rowsid, setrowsid] = React.useState(0);

  const handleAddRow = () => {
    setrows([...rows, { id: rowsid + 1 }]);

    setrowsid(rowsid + 1);
  };
  const columnscategory = [
    {
      field: "from",
      headerName: "From Hour",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: () => <MDInput />,
    },

    {
      field: "to",
      headerName: " To hour",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDInput />,
    },
    {
      field: "type",
      headerName: " Factor type",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => versioninput(),
    },
    {
      field: "percent",
      headerName: "Percentage/Flat ",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      renderCell: () => <MDInput />,
    },
    {
      field: "factor",
      headerName: " MapSoc Level %",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => mapsocinput(),
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 100,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rows.filter((row) => row.id !== param.id);

          setrows([...newArray]);
        };

        return <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];
  const [rowsgas, setrowsgas] = React.useState([]);
  const [rowsgasid, setrowsgasid] = React.useState(0);

  const handleAddRowforgas = () => {
    setrowsgas([...rowsgas, { id: rowsgasid + 1 }]);

    setrowsgasid(rowsgasid + 1);
  };
  const columnsforgas = [
    {
      field: "from",
      headerName: "From Hour",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: () => <MDInput />,
    },

    {
      field: "to",
      headerName: " To hour",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDInput />,
    },
    {
      field: "type",
      headerName: " Factor type",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => <MDInput {...params} sx={{ mb: 1 }} label="Select factor" />}
        />
      ),
    },
    {
      field: "percent",
      headerName: "Percentage/Flat ",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      renderCell: () => <MDInput />,
    },
    {
      field: "factor",
      headerName: " MapSoc Level %",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => mapsocinput(),
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 100,
      renderCell: (param) => {
        const deleteRowgas = () => {
          const newArray = rowsgas.filter((row) => row.id !== param.id);

          setrowsgas([...newArray]);
        };

        return (
          <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRowgas} />
        );
      },
    },
  ];

  const [rowsbilling, setrowsbilling] = React.useState([]);
  const [rowsbillingid, setrowsbillingid] = React.useState(0);

  const handleAddBillingRow = () => {
    setrowsbilling([...rowsbilling, { id: rowsbillingid + 1 }]);

    setrowsbillingid(rowsbillingid + 1);
  };
  const columnsBilling = [
    {
      field: "level5",
      headerName: "Level  5 Description",
      width: 500,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDInput
                {...params}
                sx={{ mb: 1, justifyContent: "center" }}
                label="Select Level Five"
              />
            </Grid>
          )}
        />
      ),
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 330,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rowsbilling.filter((row) => row.id !== param.id);

          setrowsbilling([...newArray]);
        };

        return (
          <>
            <MDButton color="info">CONFIGURE</MDButton>
            <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />
          </>
        );
      },
    },
  ];

  const [rowsurgeon, setrowsurgeon] = React.useState([]);
  const [rowsurgeonid, setrowsurgeonid] = React.useState(0);

  const handlesdurgeonRow = () => {
    setrowsurgeon([...rowsurgeon, { id: rowsurgeonid + 1 }]);

    setrowsurgeonid(rowsurgeonid + 1);
  };
  const columnsurgeon = [
    {
      field: "level5",
      headerName: "Level  5 Description",
      width: 500,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDInput
                {...params}
                sx={{ mb: 1, justifyContent: "center" }}
                label="Select Level Five"
              />
            </Grid>
          )}
        />
      ),
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 330,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rowsurgeon.filter((row) => row.id !== param.id);

          setrowsurgeon([...newArray]);
        };

        return (
          <>
            <MDButton color="info">CONFIGURE</MDButton>
            <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />
          </>
        );
      },
    },
  ];

  const [rowanesthesia, setrowanesthesia] = React.useState([]);
  const [rowanesthesiaid, setrowanesthesiaid] = React.useState(0);

  const handleChangeAnesthesiaadd = () => {
    setrowanesthesia([...rowanesthesia, { id: rowanesthesiaid + 1 }]);

    setrowanesthesiaid(rowanesthesiaid + 1);
  };
  const columnsanesthesia = [
    {
      field: "level5",
      headerName: "Level  5 Description",
      width: 500,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDInput
                {...params}
                sx={{ mb: 1, justifyContent: "center" }}
                label="Select Level Five"
              />
            </Grid>
          )}
        />
      ),
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 330,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rowanesthesia.filter((row) => row.id !== param.id);

          setrowanesthesia([...newArray]);
        };

        return (
          <>
            <MDButton color="info">CONFIGURE</MDButton>
            <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />
          </>
        );
      },
    },
  ];

  const [rowstandy, setrowstandy] = React.useState([]);
  const [rowstandyid, setrowstandyid] = React.useState(0);

  const handleChangeStandby = () => {
    setrowstandy([...rowstandy, { id: rowstandyid + 1 }]);

    setrowstandyid(rowstandyid + 1);
  };
  const columnstandby = [
    {
      field: "level5",
      headerName: "Level  5 Description",
      width: 500,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDInput
                {...params}
                sx={{ mb: 1, justifyContent: "center" }}
                label="Select Level Five"
              />
            </Grid>
          )}
        />
      ),
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 330,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rowstandy.filter((row) => row.id !== param.id);

          setrowstandy([...newArray]);
        };

        return (
          <>
            <MDButton color="info">CONFIGURE</MDButton>
            <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />
          </>
        );
      },
    },
  ];
  const [rowequip, setrowequip] = React.useState([]);
  const [rowequipid, setrowequipid] = React.useState(0);

  const handleChangeEquipment = () => {
    setrowequip([...rowequip, { id: rowequipid + 1 }]);

    setrowequipid(rowequipid + 1);
  };
  const columnsequip = [
    {
      field: "level5",
      headerName: "Level  5 Description",
      width: 500,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDInput
                {...params}
                sx={{ mb: 1, justifyContent: "center" }}
                label="Select Level Five"
              />
            </Grid>
          )}
        />
      ),
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 330,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rowequip.filter((row) => row.id !== param.id);

          setrowequip([...newArray]);
        };

        return (
          <>
            <MDButton color="info">CONFIGURE</MDButton>
            <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />
          </>
        );
      },
    },
  ];

  const [specialrows, setspecialrows] = React.useState([]);
  const [specialrowsid, setspecialrowsid] = React.useState(0);

  const handleAddspecialrows = () => {
    setspecialrows([...specialrows, { id: specialrowsid + 1 }]);

    setspecialrowsid(specialrowsid + 1);
  };
  const Specialcolumns = [
    {
      field: "level",
      headerName: "Level 5 Description",
      width: 420,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDInput />,
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = specialrows.filter((row) => row.id !== param.id);

          setspecialrows([...newArray]);
        };

        return <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];
  const [TransferBed, setTransferBed] = React.useState([]);
  const [TransferBedid, setTransferBedid] = React.useState(0);

  const handleAddRowTransferBed = () => {
    setTransferBed([...TransferBed, { id: TransferBedid + 1 }]);

    setTransferBedid(TransferBedid + 1);
  };
  const TransferBedcolumns = [
    {
      field: "roomtype",
      headerName: "Room Type",
      width: 280,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDInput {...params} sx={{ mb: 1, justifyContent: "center" }} />
            </Grid>
          )}
        />
      ),
    },
    {
      field: "roomrank",
      headerName: "Rank",
      width: 280,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDInput {...params} sx={{ mb: 1, justifyContent: "center" }} />
            </Grid>
          )}
        />
      ),
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 150,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = TransferBed.filter((row) => row.id !== param.id);

          setTransferBed([...newArray]);
        };

        return <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Configure Billing Policies?
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChange(event)} value={value}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>

      {value === "Yes" && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {Info.map((item) => (
                  <Chip
                    sx={{ ml: 2, justifyContent: "center" }}
                    label={item}
                    onClick={handleClick}
                    innerText={item}
                  />
                ))}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      )}

      {chip === "LOS" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure LOS ?
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup row onChange={(event) => handleChangelos(event)} value={losyn}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {losyn === "Yes" ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  options={[]}
                  getOptionLabel={(option) => option}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px",
                    },
                  }}
                  renderInput={(params) => <MDInput {...params} label="Check In Time" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput label="Check In Minutes" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  options={[]}
                  getOptionLabel={(option) => option}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px",
                    },
                  }}
                  renderInput={(params) => <MDInput {...params} label="Check  Out Time" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput label="Check Out Minutes" />
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput label="Half Day Duration" />
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput label="Grace Period" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
                  <MDButton color="info">SUBMIT</MDButton>
                  <MDButton color="info">CANCEL</MDButton>
                </Stack>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </>
      )}
      {chip === "Extra AC Charges" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Extra AC Charges Required?
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup row onChange={(event) => handleChangeAc(event)} value={Acyn}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {Acyn === "Yes" ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                  Map Soc Level 5
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  options={[]}
                  getOptionLabel={(option) => option}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px",
                    },
                  }}
                  renderInput={(params) => <MDInput {...params} label="Select Level five" />}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <RadioGroup row onChange={(event) => handleChangeAcflatyn(event)} value={Acflatyn}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Flat" />
                  <FormControlLabel value="No" control={<Radio />} label="Hourly charges" />
                </RadioGroup>
              </Grid>

              {Acflatyn === "Yes" ? (
                <Grid container spacing={2} sx={{ mt: 2, ml: 4 }}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput label="Amount" />
                  </Grid>
                </Grid>
              ) : (
                ""
              )}

              {Acflatyn === "No" ? (
                <Grid container spacing={2}>
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
                        onClick={handleAddRow}
                      >
                        ADD
                      </MDButton>
                    </Stack>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1}>
                  <MDButton color="info">SUBMIT</MDButton>
                  <MDButton color="info">CANCEL</MDButton>
                </Stack>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </>
      )}
      {chip === "Extra Gas Charges" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Extra Gas Charges Required?
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup row onChange={(event) => handleChangeGas(event)} value={Gasyn}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {Gasyn === "Yes" ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                  Map Soc Level 5
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  options={[]}
                  getOptionLabel={(option) => option}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px",
                    },
                  }}
                  renderInput={(params) => <MDInput {...params} label="Select Level five" />}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <RadioGroup
                  row
                  onChange={(event) => handleChangeGasflatyn(event)}
                  value={Gasflatyn}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Flat" />
                  <FormControlLabel value="No" control={<Radio />} label="Hourly charges" />
                </RadioGroup>
              </Grid>

              {Gasflatyn === "Yes" ? (
                <Grid container spacing={2} sx={{ mt: 2, ml: 4 }}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput label="Amount" />
                  </Grid>
                </Grid>
              ) : (
                ""
              )}

              {Gasflatyn === "No" ? (
                <Grid container spacing={2}>
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
                        rows={rowsgas}
                        columns={columnsforgas}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        experimentalFeatures={{ newEditingApi: true }}
                      />
                    </MDBox>
                    <Stack justifyContent="right" direction="row">
                      <MDButton
                        color="info"
                        sx={{ justifyContent: "right", mr: 2, mt: 2 }}
                        onClick={handleAddRowforgas}
                      >
                        ADD
                      </MDButton>
                    </Stack>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1}>
                  <MDButton color="info">SUBMIT</MDButton>
                  <MDButton color="info">CANCEL</MDButton>
                </Stack>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </>
      )}
      {chip === "Non Working Days & Hours" && (
        <>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure Non Working Hours & Public Holidays ?
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup row onChange={(event) => handleChangeholidays(event)} value={holidayyn}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {holidayyn === "Yes" ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Working Hours From" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Working Hours To" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="No. of Visits Allowed" />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 12, mt: 1 }}>
                  Non Working Days
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                <Stack direction="row" spacing={2}>
                  <FormGroup row>
                    <FormControlLabel
                      sx={{ ...formControlLabelStyle }}
                      control={
                        <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
                      }
                      label="Sunday"
                    />

                    <FormControlLabel
                      sx={{ ...formControlLabelStyle }}
                      control={
                        <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
                      }
                      label=" Monday"
                    />

                    <FormControlLabel
                      sx={{ ...formControlLabelStyle }}
                      control={
                        <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
                      }
                      label=" Tuesday"
                    />
                    <FormControlLabel
                      sx={{ ...formControlLabelStyle }}
                      control={
                        <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
                      }
                      label=" Wednesday"
                    />
                    <FormControlLabel
                      sx={{ ...formControlLabelStyle }}
                      control={
                        <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
                      }
                      label=" Thursday"
                    />
                    <FormControlLabel
                      sx={{ ...formControlLabelStyle }}
                      control={
                        <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
                      }
                      label=" Friday"
                    />
                    <FormControlLabel
                      sx={{ ...formControlLabelStyle }}
                      control={
                        <Checkbox sx={{ transform: "scale(0.8)" }} type="checkbox" name="Status" />
                      }
                      label=" Saturday"
                    />
                  </FormGroup>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                  Public Holidays
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="left" direction="row" spacing={1} sx={{ mt: 2 }}>
                  <MDButton color="info" onClick={generateNotes}>
                    ADD Holidays
                  </MDButton>
                </Stack>
              </Grid>

              {inputFieldCount > 0 &&
                Array.from({ length: inputFieldCount }, (_, index) => (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Stack direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDDatePicker key={index} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <DeleteIcon color="info" size="medium" key={index} onClick={deleteNotes} />
                      </Grid>
                    </Stack>
                  </Grid>
                ))}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
                  <MDButton color="info">SUBMIT</MDButton>
                  <MDButton color="info">CANCEL</MDButton>
                </Stack>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </>
      )}
      {chip === "Doctor Visit Charges" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure Doctor Visit Charges
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup row onChange={(event) => handleChangeDoctor(event)} value={doctoryn}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {doctoryn === "Yes" ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox
                    sx={{
                      mt: 2,
                      width: "80%",
                      "& .super-app-theme--header": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    <DataGrid
                      autoHeight
                      rowHeight={60}
                      rows={rowsbilling}
                      columns={columnsBilling}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
                  <MDButton color="info" onClick={handleAddBillingRow}>
                    ADD TO GRID
                  </MDButton>
                </Stack>
              </Grid>
            </>
          ) : (
            ""
          )}
        </>
      )}
      {chip === "Surgeon Charges" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure Surgeon Charges
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup row onChange={(event) => handleChangeSurgeon(event)} value={surgeonyn}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {surgeonyn === "Yes" ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox
                    sx={{
                      mt: 2,
                      width: "80%",
                      "& .super-app-theme--header": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    <DataGrid
                      autoHeight
                      rowHeight={60}
                      rows={rowsurgeon}
                      columns={columnsurgeon}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
                  <MDButton color="info" onClick={handlesdurgeonRow}>
                    ADD TO GRID
                  </MDButton>
                </Stack>
              </Grid>
            </>
          ) : (
            ""
          )}
        </>
      )}
      {chip === "Anesthesia Charges" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure Anesthesia Charges
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup
              row
              onChange={(event) => handleChangeAnesthesia(event)}
              value={Anesthesiayn}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {Anesthesiayn === "Yes" && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox
                    sx={{
                      mt: 2,
                      width: "80%",
                      "& .super-app-theme--header": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    <DataGrid
                      autoHeight
                      rowHeight={60}
                      rows={rowanesthesia}
                      columns={columnsanesthesia}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
                  <MDButton color="info" onClick={handleChangeAnesthesiaadd}>
                    ADD TO GRID
                  </MDButton>
                </Stack>
              </Grid>
            </>
          )}
        </>
      )}

      {chip === "Standby Anesthesia Charges" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure Standby Anesthesia Charges
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup row onChange={(event) => handleChangestandbyyn(event)} value={standbyyn}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {standbyyn === "Yes" && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox
                    sx={{
                      mt: 2,
                      width: "80%",
                      "& .super-app-theme--header": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    <DataGrid
                      autoHeight
                      rowHeight={60}
                      rows={rowstandy}
                      columns={columnstandby}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
                  <MDButton color="info" onClick={handleChangeStandby}>
                    ADD TO GRID
                  </MDButton>
                </Stack>
              </Grid>
            </>
          )}
        </>
      )}

      {chip === "Charges For Special Equipment" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure Special Equipment Charges
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup
              row
              onChange={(event) => handleChangeequipmentyn(event)}
              value={equipmentyn}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {equipmentyn === "Yes" && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox
                    sx={{
                      mt: 2,
                      width: "80%",
                      "& .super-app-theme--header": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    <DataGrid
                      autoHeight
                      rowHeight={60}
                      rows={rowequip}
                      columns={columnsequip}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
                  <MDButton color="info" onClick={handleChangeEquipment}>
                    ADD TO GRID
                  </MDButton>
                </Stack>
              </Grid>
            </>
          )}
        </>
      )}

      {chip === "OT Charges - Room & GA" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure OT charges-Room & GA*
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup
              row
              onChange={(event) => handleChangeotchargesyn(event)}
              value={otchargesyn}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {otchargesyn === "Yes" && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                  Map Soc Level 5
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  options={[]}
                  getOptionLabel={(option) => option}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px",
                    },
                  }}
                  renderInput={(params) => <MDInput {...params} label="Select Level five" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <RadioGroup row onChange={(event) => handleChangeOttypeyn(event)} value={Ottypeyn}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Surgeon Charges" />
                  <FormControlLabel value="No" control={<Radio />} label="Hourly charges" />
                </RadioGroup>
              </Grid>
              {Ottypeyn === "Yes" && (
                <>
                  <RadioGroup
                    row
                    onChange={(event) => handleChangeOtflatyn(event)}
                    value={Otflatyn}
                  >
                    <FormControlLabel value="Flat" control={<Radio />} label="Flat" />
                    <FormControlLabel
                      value="SurgeonCharges"
                      control={<Radio />}
                      label="% of Surgeon Charges"
                    />
                  </RadioGroup>
                  {Otflatyn === "Flat" && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Amount" />
                      </Grid>
                    </Grid>
                  )}
                  {Otflatyn === "SurgeonCharges" && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Amount" />
                      </Grid>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          )}

          {Ottypeyn === "No" && (
            <Grid container spacing={2}>
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
                    onClick={handleAddRow}
                  >
                    ADD
                  </MDButton>
                </Stack>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
              <MDButton color="info">SUBMIT</MDButton>
              <MDButton color="info">CANCEL</MDButton>
            </Stack>
          </Grid>
        </>
      )}
      {chip === "OT Charges - Day Care & LA" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure OT charges-Room & LA*
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup
              row
              onChange={(event) => handleChangeotdaycaresyn(event)}
              value={otdaycaresyn}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {otdaycaresyn === "Yes" && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                  Map Soc Level 5
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  options={[]}
                  getOptionLabel={(option) => option}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px",
                    },
                  }}
                  renderInput={(params) => <MDInput {...params} label="Select Level five" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <RadioGroup
                  row
                  onChange={(event) => handleChangeOtdaycaretypeyn(event)}
                  value={Otdaycaretypeyn}
                >
                  <FormControlLabel value="surgeon" control={<Radio />} label="Surgeon Charges" />
                  <FormControlLabel value="hourly" control={<Radio />} label="Hourly charges" />
                </RadioGroup>
              </Grid>
              {Otdaycaretypeyn === "surgeon" && (
                <>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <RadioGroup
                        row
                        onChange={(event) => handleChangeOtfaltdayyn(event)}
                        value={Otfaltdayyn}
                      >
                        <FormControlLabel value="Flat" control={<Radio />} label="Flat" />
                        <FormControlLabel
                          value="SurgeonCharges"
                          control={<Radio />}
                          label="% of Surgeon Charges"
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  {Otfaltdayyn === "Flat" && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Amount" />
                      </Grid>
                    </Grid>
                  )}
                  {Otfaltdayyn === "SurgeonCharges" && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Amount" />
                      </Grid>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          )}

          {Otdaycaretypeyn === "hourly" && (
            <Grid container spacing={2}>
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
                    onClick={handleAddRow}
                  >
                    ADD
                  </MDButton>
                </Stack>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
              <MDButton color="info">SUBMIT</MDButton>
              <MDButton color="info">CANCEL</MDButton>
            </Stack>
          </Grid>
        </>
      )}

      {chip === "Day Care Charges" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure Day Care Charges*
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <RadioGroup row onChange={(event) => handleChangedaycareyn(event)} value={daycare}>
              <FormControlLabel value="daycareYes" control={<Radio />} label="Yes" />
              <FormControlLabel value="daycareNo" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {daycare === "daycareYes" && (
            <>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                  Map Soc Level 5
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  options={[]}
                  getOptionLabel={(option) => option}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px",
                    },
                  }}
                  renderInput={(params) => <MDInput {...params} label="Select Level five" />}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <RadioGroup
                  row
                  onChange={(event) => handleChangedaycarecontentyn(event)}
                  value={daycarecontent}
                >
                  <FormControlLabel value="flatcharges" control={<Radio />} label="Flat Charges" />
                  <FormControlLabel
                    value="hourlycharges"
                    control={<Radio />}
                    label="Hourly charges"
                  />
                </RadioGroup>
              </Grid>
              {daycarecontent === "flatcharges" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput label="Amount" />
                  </Grid>
                </Grid>
              )}
              {daycarecontent === "hourlycharges" && (
                <Grid container spacing={2}>
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
                        onClick={handleAddRow}
                      >
                        ADD
                      </MDButton>
                    </Stack>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
                  <MDButton color="info">SUBMIT</MDButton>
                  <MDButton color="info">CANCEL</MDButton>
                </Stack>
              </Grid>
            </>
          )}
        </>
      )}
      {chip === "Special Patient Type" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure Special Patient Type
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup row onChange={(event) => handleChangeSpecialyn(event)} value={Special}>
              <FormControlLabel value="SpecialeYes" control={<Radio />} label="Yes" />
              <FormControlLabel value="SpecialNo" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {Special === "SpecialeYes" && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox
                  sx={{
                    mt: 2,
                    width: "80%",
                    "& .super-app-theme--header": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <DataGrid
                    autoHeight
                    rows={specialrows}
                    columns={Specialcolumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
                  <MDButton color="info" onClick={handleAddspecialrows}>
                    ADD
                  </MDButton>
                </Stack>
              </Grid>
            </>
          )}
        </>
      )}
      {chip === "Bed Transfer" && (
        <>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
              Configure Bed transfer
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup
              row
              onChange={(event) => handleChangeBedTransferyn(event)}
              value={BedTransfer}
            >
              <FormControlLabel value="BedTransferYes" control={<Radio />} label="Yes" />
              <FormControlLabel value="BedTransferNo" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          {BedTransfer === "BedTransferYes" && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                  Room Category
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox
                  sx={{
                    mt: 2,
                    width: "90%",
                    "& .super-app-theme--header": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <DataGrid
                    autoHeight
                    rows={TransferBed}
                    columns={TransferBedcolumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
                  <MDButton color="info" onClick={handleAddRowTransferBed}>
                    ADD
                  </MDButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                  ICU Category
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox
                  sx={{
                    mt: 2,
                    width: "90%",
                    "& .super-app-theme--header": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <DataGrid
                    autoHeight
                    rows={TransferBed}
                    columns={TransferBedcolumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
                  <MDButton color="info" onClick={handleAddRowTransferBed}>
                    ADD
                  </MDButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <FormGroup sx={{ mt: -0.5 }}>
                  <FormControlLabel
                    sx={{ ...formControlLabelStyle }}
                    control={
                      <Checkbox
                        sx={{ transform: "scale(0.8)" }}
                        type="checkbox"
                        name="Status"
                        checked={Lowtohigh} // <-- set the checked prop of input
                        onChange={(event) => handleChangeLowtohigh(event)}
                      />
                    }
                    label="Lower to Higher"
                  />{" "}
                  {Lowtohigh && (
                    <>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                          From *
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          options={[]}
                          getOptionLabel={(option) => option}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px",
                            },
                          }}
                          renderInput={(params) => <MDInput {...params} label="Select " />}
                        />
                      </Grid>
                    </>
                  )}
                  <FormControlLabel
                    sx={{ ...formControlLabelStyle }}
                    control={
                      <Checkbox
                        sx={{ transform: "scale(0.8)" }}
                        type="checkbox"
                        name="Status"
                        checked={Hightolow} // <-- set the checked prop of input
                        onChange={(event) => handleChangeHightolow(event)}
                      />
                    }
                    label=" Higher to Lower"
                  />{" "}
                  {Hightolow && (
                    <>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
                          To *
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          options={[]}
                          getOptionLabel={(option) => option}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px",
                            },
                          }}
                          renderInput={(params) => <MDInput {...params} label="Select " />}
                        />
                      </Grid>
                    </>
                  )}
                </FormGroup>
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
              <MDButton color="info">SUBMIT</MDButton>
              <MDButton color="info">CANCEL</MDButton>
            </Stack>
          </Grid>
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

export default Billing;
