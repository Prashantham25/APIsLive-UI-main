import { useState } from "react";
import { Autocomplete, Grid, Modal } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { processingData } from "../../data/JsonData";
import EnterInvoiceDetails from "./EnterInvoice";
import SalvageDiscount from "./SalvageDiscount";
import EstimateOEM from "./EstimateOEM";
import AddonApplicables from "./AddonApplicables";

function RenderControl({ item, repairdata, setrepairdata }) {
  const repairdD = repairdata;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  const handlechange = (val) => {
    repairdD.DescriptiveRepairAssessmentsheet[val.target.name] = val.target.value;
    setrepairdata((prev) => ({ ...prev, ...repairdD }));
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    console.log(value.mValue, type);
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                label={item.label}
                name={item.name}
                value={repairdata.DescriptiveRepairAssessmentsheet[item.name]}
                onChange={handlechange}
              />
            );
          case "DateTime":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy hh:mm:ss a"
                  value={datevalue}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "Date":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy"
                  value={datevalue}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "AutoComplete":
            return (
              <Autocomplete
                // id="Salutation"
                options={ComboValue}
                // groupBy={(option) => option.firstLetter}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, item.label, value)}
                renderInput={(params) => <MDInput {...params} label={item.label} />}
              />
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function Repair() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: 650,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [repairdata, setrepairdata] = useState(processingData);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [open4, setOpen4] = useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  const controlItems = [
    { type: "Input", label: "Date of loss", visible: true },
    { type: "Input", label: "Make", visible: true, name: "make" },
    { type: "Input", label: "Model", visible: true, name: "model" },
    { type: "Date", label: "Vehicle registration date", visible: true },
    {
      type: "Input",
      label: "Compulsory deductible Amount",
      visible: true,
      name: "compulsoryDeductibleAmount",
    },
    {
      type: "Input",
      label: "Voluntry deductible Amount",
      visible: true,
      name: "voluntryDeductibleAmount",
    },
    { type: "Date", label: "Depreciation applicable from", visible: false },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} repairdata={repairdata} setrepairdata={setrepairdata} />
          </Grid>
        ) : null
      )}
      <Button onClick={handleOpen1}>Enter Invoice Details</Button>
      <Modal open={open1} aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <EnterInvoiceDetails onClose={handleClose1} />
          </Typography>
        </Box>
      </Modal>

      <Button onClick={handleOpen2}>Salvage and Discount Rate</Button>
      <Modal open={open2} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <SalvageDiscount onClose={handleClose2} />
          </Typography>
        </Box>
      </Modal>

      <Button onClick={handleOpen3}>Estimate from OEM</Button>
      <Modal open={open3} aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <EstimateOEM onClose={handleClose3} />
          </Typography>
        </Box>
      </Modal>

      <Button onClick={handleOpen4}>Addon Applicables</Button>
      <Modal open={open4} aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <AddonApplicables onClose={handleClose4} />
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
}

export default Repair;
