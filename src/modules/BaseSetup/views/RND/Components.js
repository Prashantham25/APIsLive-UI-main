import { useState, useEffect } from "react";
import { Grid, Autocomplete } from "@mui/material";
import { GetDynamicPermissionsbyRoles } from "./data";
import CustomTreeView from "../../../../components/CustomTreeView";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import CustomCurrencyInput from "../../../../components/CustomCurrencyInput";
import CustomDropDown from "../../../../components/CustomDropDown";
import MDDataGrid from "../../../../components/MDDataGrid";
import MDCheckbox from "../../../../components/MDCheckbox";

const Genders = [
  { label: "Male", id: 1 },
  { label: "Female", id: 2 },
];
const rows = [
  {
    id: 1,
    Gender: "Male",
    firstName: "Jon",
    Date: "2001-08-20",
    Age: "",
  },
  { id: 2, Gender: "Female", firstName: "Cersei", Date: "2011-12-23", Age: "" },
  { id: 3, Gender: "Male", firstName: "Jaime", Date: "2001-08-18", Age: "" },
  { id: 4, Gender: "Female", firstName: "Arya", Date: "2020-09-20", Age: "" },
  { id: 5, Gender: "Male", firstName: "Daenerys", Date: "2005-01-10", Age: "" },
  {
    id: 6,
    Gender: "Female",
    firstName: "Altaf",
    Date: "2022-06-26",
    Age: "28",
  },
  { id: 7, Gender: "Male", firstName: "Ferrara", Date: "2013-03-17", Age: "" },
  {
    id: 8,
    Gender: "Female",
    firstName: "Rossini",
    Date: "2003-03-03",
    Age: "",
  },
  {
    id: 9,
    Gender: "Male",
    firstName: "Prashanth",
    Date: "2007-09-09",
    Age: "",
  },
];

function Components() {
  const [gridRows, setGridRows] = useState(rows);

  const [obj, setObj] = useState({
    INDInsurance: "",
    INDInsurance1: "1234567.765432",
    AutoNames: [
      { mID: 2, mValue: "Van Henry" },
      { mID: 7, mValue: "Miriam Wagner" },
      { mID: 9, mValue: "Virginia Andrews" },
    ],
  });
  const onInd = (e) => {
    setObj({
      ...obj,
      [e.name]: e.value,
    });
  };
  const [treeData, setTreeData] = useState([]);

  const onCheck = (p2, i1, i2) => {
    treeData[i1][i2].mdata = [...p2];
    setTreeData([...treeData]);
  };

  const treeInfo = {
    nodeId: "mID",
    label: "mValue",
    checked: "status",
    parentId: "parentId",
    children: "children",
  };

  const opt = [
    { mID: 1, mValue: "Oliver Hansen" },
    { mID: 2, mValue: "Van Henry" },
    { mID: 3, mValue: "April Tucker" },
    { mID: 4, mValue: "Ralph Hubbard" },
    { mID: 5, mValue: "Omar Alexander" },
    { mID: 6, mValue: "Carlos Abbott" },
    { mID: 7, mValue: "Miriam Wagner" },
    { mID: 8, mValue: "Bradley Wilkerson" },
    { mID: 9, mValue: "Virginia Andrews" },
    { mID: 10, mValue: "Kelly Snyder" },
  ];

  const handleEditCellChange = (id, field, value) => {
    console.log(id, field, value);
    let age = "";
    if (field === "Date") {
      const birthdate = new Date(value);
      const diff = Date.now() - birthdate.getTime();
      age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    }
    const updatedRows = gridRows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value, Age: age };
      }
      return row;
    });
    setGridRows(updatedRows);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 250,
      renderCell: (params) => (
        <MDInput
          value={params.row ? params.row.firstName : ""}
          onChange={(e) => handleEditCellChange(params.id, "firstName", e.target.value)}
        />
      ),
    },
    {
      field: "Gender",
      headerName: "Gender",
      width: 250,
      renderCell: (params) => (
        <Autocomplete
          fullWidth
          sx={{ "& .MuiOutlinedInput-root": { padding: "4px!important" } }}
          value={{ label: params.row.Gender }}
          options={Genders}
          getOptionLabel={(x) => x.label}
          // sx={{ width: "100%" }}
          onChange={(e, v) => handleEditCellChange(params.id, "Gender", v.label)}
          renderInput={(pp) => <MDInput {...pp} />}
        />
      ),
    },
    {
      field: "Date",
      headerName: "Date of Birth",
      width: 250,
      renderCell: (params) => (
        <MDInput
          value={params.row ? params.row.Date : ""}
          type="date"
          onChange={(e) => handleEditCellChange(params.id, "Date", e.target.value)}
        />
      ),
    },
    {
      field: "Age",
      headerName: "Age",
      width: 250,
    },
  ];

  useEffect(async () => {
    await GetDynamicPermissionsbyRoles().then((x) => {
      console.log(x);
      setTreeData([...x.data.dynamicResponse]);
    });
  }, []);

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDCheckbox />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDBox>
          {treeData.map((x1, i1) => (
            <MDBox>
              {x1.map((x2, i2) => (
                <MDBox>
                  <MDTypography>{x2.name}</MDTypography>
                  <CustomTreeView
                    treeData={x2.mdata}
                    treeInfo={treeInfo}
                    onChange={(p1, p2) => onCheck(p2, i1, i2)}
                  />
                </MDBox>
              ))}
            </MDBox>
          ))}
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <CustomCurrencyInput
          currency="India"
          curFormat={[2, 3, ",", "."]}
          fractionFormat={{ fix: 2 }}
          name="INDInsurance"
          label="Enter India Amount"
          onChange={onInd}
          value={obj.INDInsurance}
        />{" "}
      </Grid>

      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <CustomDropDown
          optionLabel="mValue"
          optionId="mID"
          options={opt}
          onChange={onInd}
          value={obj.AutoNames}
          all="true"
          sx={{ width: 300 }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDDataGrid columns={columns} rows={gridRows} rowID="id" />
      </Grid>
    </Grid>
  );
}

export default Components;
