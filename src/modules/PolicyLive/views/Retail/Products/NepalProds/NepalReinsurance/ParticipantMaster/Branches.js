import React, { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";

import RIObj from "../data/jsonData";
// navgateflag
function Branches({ handleClose, NewObj, bfsflag, navgateflag }) {
  const [BrnchData, setBrnchData] = useState({ ...RIObj });

  const [obj, setObj] = useState({
    id: "",
    branchCode: "",
    branchName: "",
    branchSpocemailId: "",
    flag: false,
    emailflag: false,
  });
  const obj1 = {
    id: "",
    branchCode: "",
    branchName: "",
    branchSpocemailId: "",
    flag: false,
    emailflag: false,
  };

  const [rows, setRows] = useState([]);
  // ...BrnchData.ParticipantMaster.tblParticipantBranch
  console.log("rows", rows);
  const handlecodename = (e, i) => {
    rows[i][e.target.name] = e.target.value;

    // if (e.target.name === "branchCode") {
    //   obj.branchCode = e.target.value;
    //   console.log("33", obj);
    // } else if (e.target.name === "branchName") {
    //   obj.branchName = e.target.value;
    //   console.log("33", obj);
    // } else if (e.target.name === "branchSpocemailId") {
    //   obj.branchSpocemailId = e.target.value;
    //   console.log("33", obj);
    // }
    setRows([...rows]);
    console.log("rowssssss", rows);
    // setObj({ ...obj });
    console.log("newlyaddedrow", BrnchData.ParticipantMaster);
  };
  useEffect(() => {
    //
    if (navgateflag === true && bfsflag === true) {
      // debugger;
      const tArr = NewObj.tblParticipantBranch;

      tArr.forEach((x, i) => {
        tArr[i].id = i;
      });
      setRows([...tArr]);
      BrnchData.ParticipantMaster.tblParticipantBranch = [...tArr];

      setBrnchData(() => ({ ...BrnchData }));
      console.log("rowsdatafronnewobj", rows);
    }
  }, []);
  const handleAddRow = () => {
    const len = rows.length;
    obj.id = len;
    setRows([...rows, obj]);
    BrnchData.ParticipantMaster.tblParticipantBranch.push(obj);
    setBrnchData(() => ({ ...BrnchData }));
    console.log("newlyaddedrow", BrnchData.ParticipantMaster);
    setObj(obj1);
  };

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 50,
      hidden: true,
    },
    {
      field: "branchCode",
      headerName: "Branch Code",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: (p) => (
        <MDInput
          name="branchCode"
          onChange={(e) => handlecodename(e, p.row.id)}
          value={rows[p.row.id].branchCode}
        />
      ),
    },

    {
      field: "branchName",
      headerName: "Branch Name",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      renderCell: (p) => (
        <MDInput
          name="branchName"
          onChange={(e) => handlecodename(e, p.row.id)}
          value={rows[p.row.id].branchName}
        />
      ),
    },
    {
      field: "branchSpocemailId",
      headerName: "Email Details",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 230,

      renderCell: (p) => (
        <MDInput
          name="branchSpocemailId"
          onChange={(e) => handlecodename(e, p.row.id)}
          value={rows[p.row.id].branchSpocemailId}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 150,
      renderCell: (p) => {
        const deleteRow = () => {
          const newArray = rows.filter((x) => x.id !== p.row.id);

          newArray.forEach((x, i) => {
            newArray[i].id = i;
          });

          setRows([...newArray]);
          BrnchData.ParticipantMaster.tblParticipantBranch = [...newArray];
          console.log("DGROW", rows);
          setBrnchData(() => ({ ...BrnchData }));
          console.log("finaldata", BrnchData.ParticipantMaster);
        };

        return <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h4">Branch Details</MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            mt: 3,
            ml: 10,
            width: "80%",
          }}
        >
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(x) => x.id}
          />
        </MDBox>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="space-between" direction="row">
          <MDButton
            color="info"
            sx={{ justifyContent: "right", mr: 2, mt: 2 }}
            onClick={handleAddRow}
          >
            ADD Branch
          </MDButton>
          <MDButton color="info" sx={{ mt: 2 }} onClick={handleClose}>
            OK
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Branches;
