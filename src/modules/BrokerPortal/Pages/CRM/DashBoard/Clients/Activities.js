import React from "react";
import { Card, Stack, TablePagination } from "@mui/material";
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";

function Activities() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [appsNo, setAppsNo] = useState([]);
  // console.log("setAppsNo", setAppsNo);
  // const [appsNo1, setAppsNo1] = useState([]);
  // console.log("setAppsNo1", setAppsNo1);
  // const [, dispatch] = useDataController();
  //
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  return (
    <MDBox sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <Card
          sx={{
            background: "#DEEFFD",
            height: "300",
            mb: 1,
            // ml: 1,
            mt: "1rem",
            borderRadius: "1px",
            padding: "5px",
          }}
          width="80%"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <Stack direction="row" justifyContent="space-between">
            <MDTypography sx={{ fontSize: "14px", ml: 2 }}>
              {/* {row.Activity.ActivityDetails[0].TransactionKey} */}
              Quote was created against Opportunity (Health Insurance-OPP02LD0001) was added by
              POSP123
            </MDTypography>
            <MDTypography sx={{ fontSize: "14px" }}>March 14 2023 at 17:00:00</MDTypography>
          </Stack>
        </Card>

        <Card
          sx={{
            background: "#DEEFFD",
            height: "300",
            mb: 1,
            // ml: 1,
            mt: "1rem",
            borderRadius: "1px",
            padding: "5px",
          }}
          width="80%"
          style={{ marginLeft: "10px", marginTop: "10px", marginRight: "10px" }}
        >
          <Stack direction="row" justifyContent="space-between">
            <MDTypography sx={{ fontSize: "14px", ml: 2 }}>
              Opportunity (Health Insurance-OPP02LD0001) was added by POSP123
            </MDTypography>
            <MDTypography sx={{ fontSize: "14px" }}>March 14 2023 at 17:00:00</MDTypography>
          </Stack>
        </Card>

        <Card
          sx={{
            background: "#DEEFFD",
            height: "300",
            borderRadius: "1px",
            mb: 1,
            padding: "5px",
            mt: "1rem",
          }}
          width="80%"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <Stack direction="row" justifyContent="space-between">
            <MDTypography sx={{ fontSize: "14px", ml: 2 }}>
              Quote was created against Opportunity (Motor Insurance-OPPOILD0001) was added by
              POSP123
            </MDTypography>
            <MDTypography sx={{ fontSize: "14px" }}>March 14 2023 at 17:00:00</MDTypography>
          </Stack>
        </Card>
        <Card
          sx={{
            background: "#DEEFFD",
            height: "300",
            borderRadius: "1px",
            mb: 1,
            padding: "5px",
            mt: "1rem",
          }}
          width="80%"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <Stack direction="row" justifyContent="space-between">
            <MDTypography sx={{ fontSize: "14px", ml: 2 }}>
              Opportunity (Motor Insurance-OPPOILD0001) was added by POSP123
            </MDTypography>
            <MDTypography sx={{ fontSize: "14px" }}>March 14 2023 at 17:00:00</MDTypography>
          </Stack>
        </Card>
        <Card
          sx={{
            background: "#DEEFFD",
            height: "300",
            borderRadius: "1px",
            mb: 1,
            padding: "5px",
            mt: "1rem",
          }}
          width="80%"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <Stack direction="row" justifyContent="space-between">
            <MDTypography sx={{ fontSize: "14px", ml: 2 }}>
              This Lead was created by POSP123
            </MDTypography>
            <MDTypography sx={{ fontSize: "14px" }}>March 14 2023 at 17:00:00</MDTypography>
          </Stack>
        </Card>
      </Stack>
      {/* ))} */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count="0"
        // count="20"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MDBox>
  );
}

export default Activities;
