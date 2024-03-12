import { Grid } from "@mui/material";
import MDInput from "components/MDInput";
import { useState } from "react";
import { processingData } from "../data/JsonData";

function RenderControl({ item, uwdata, setuwdata }) {
  const uwD = uwdata;
  const handlechange = (val) => {
    uwD.UnderWriting[val.target.name] = val.target.value;
    setuwdata((prev) => ({ ...prev, ...uwdata }));
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Remarks":
            return (
              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label={item.label}
                    name={item.name}
                    value={uwdata.UnderWriting[item.name]}
                    onChange={handlechange}
                    InputProps={{ ...item.InputProps }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                  <MDInput label="Remarks" />
                </Grid>
              </Grid>
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function Underwriting() {
  const [uwdata, setuwdata] = useState(processingData);
  const controlItems = [
    {
      type: "Remarks",
      label: "Proximity Days",
      visible: true,
      name: "proximityDays",
      InputProps: { readOnly: true },
    },
    {
      type: "Remarks",
      label: "Cash Before Coverage Status",
      visible: true,
      name: "cashBeforeCoverageStatus",
      InputProps: { readOnly: true },
    },
    {
      type: "Remarks",
      label: "No Claim Bonus Status",
      visible: true,
      name: "noClaimBonusStatus",
      InputProps: { readOnly: true },
    },
    {
      type: "Remarks",
      label: "Break in Case Inspection Status",
      visible: true,
      name: "breakInCaseInspectionStatus",
      InputProps: { readOnly: true },
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <RenderControl item={item} uwdata={uwdata} setuwdata={setuwdata} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}
export default Underwriting;
