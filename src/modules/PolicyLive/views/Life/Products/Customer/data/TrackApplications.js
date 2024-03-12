import { useEffect, useState } from "react";
import { Grid, Chip, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
// import PageLayout from "examples/LayoutContainers/PageLayout";
// import NavBar from "../../NewBusiness/data/NavBar";
import MDTypography from "components/MDTypography";
import { GetPayLoadByQueryDynamic } from "../../NewBusiness/data/index";
import NavBar from "../../NewBusiness/data/NavBar";
import PageLayout from "../../../../../../../examples/LayoutContainers/PageLayout";
import MDInput from "../../../../../../../components/MDInput";
import MDDataGrid from "../../../../../../../components/MDDataGrid";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import MDButton from "../../../../../../../components/MDButton";

function StatusID(Id) {
  if (Id === 1) {
    return "Lead Stage";
  }
  if (Id === 3) {
    return "Quotation Stage";
  }
  if (Id === 4) {
    return "Proposal Stage";
  }
  if (Id === 5) {
    return "Policy Generated";
  }

  return null;
}
function Color(Id) {
  if (Id === 1) {
    return "#AB6FE4";
  }
  if (Id === 3) {
    return "#F49D58";
  }
  if (Id === 4) {
    return "#1d4e9e";
  }
  if (Id === 5) {
    return "#3F8747";
  }

  return null;
}
const checkForValue = (value) => value === "" || value === undefined || value === null;
function MyProfile({ rows }) {
  const [data, setData] = useState({ Name: "", Gender: "", Email: "", MobileNo: "" });
  useEffect(() => {
    if (Array.isArray(rows)) setData({ ...rows[0] });
  }, [rows]);
  const onChange = (e, n) => {
    data[n] = e.target.value;
    setData({ ...data });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
        <MDTypography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>My Profile</MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox sx={{ display: "flex", justifyContent: "left" }}>
          <Avatar alt src sx={{ width: 100, height: 100 }} />
        </MDBox>
      </Grid>
      <Grid item xxl={4} xl={4} md={4} sm={12} xs={12}>
        <MDInput
          label="Full Name"
          value={data?.Name}
          OnChange={(e) => onChange(e, "Name")}
          disabled
        />
      </Grid>
      <Grid item xxl={4} xl={4} md={4} sm={12} xs={12}>
        <MDInput
          label="Gender"
          value={data?.Gender}
          onChange={(e) => onChange(e, "Gender")}
          disabled
        />
      </Grid>
      <Grid item xxl={4} xl={4} md={4} sm={12} xs={12}>
        <MDInput
          label="Mobile Number"
          value={data?.MobileNo}
          onChange={(e) => onChange(e, "MobileNo")}
          disabled
        />
      </Grid>
      <Grid item xxl={4} xl={4} md={4} sm={12} xs={12}>
        <MDInput
          label="Email Id"
          value={data?.Email}
          onChange={(e) => onChange(e, "Email")}
          disabled
        />
      </Grid>
    </Grid>
  );
}

function MyApplications({ rows, datagridLoading }) {
  console.log("rows", rows);

  const navigate = useNavigate();

  const onStage = (stage, opportunityId) => {
    if (stage === 3) navigate(`/CustomerQuote?OpportunityId=${opportunityId}`);
    if (stage === 4) navigate(`/lifeCustomerProposals?OpportunityId=${opportunityId}`);
  };
  const tableColumns = [
    {
      field: "OpportunityNumber",
      headerName: "AccessId",
      width: 150,
      renderCell: (p) => (
        <MDTypography
          sx={{
            fontSize: "1rem",
            textTransform: "capitalize",
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => onStage(p.row.StageID, p.row.OppurtunityID)}
        >
          {p.row.OpportunityNumber}
        </MDTypography>
      ),
    },
    {
      field: "PlanName",
      headerName: "Plan Name",
      width: 300,
      headerAlign: "left",
    },
    {
      field: "PlanNumber",
      headerName: "Plan Number",
      width: 150,
      headerAlign: "left",
    },
    // {
    //   field: "QuoteDate",
    //   headerName: "QuoteDate",
    //   width: 150,
    //   headerAlign: "left",
    // },
    {
      field: "Name",
      width: 150,
      headerName: "Proposer Name",
    },
    {
      field: "MobileNo",
      width: 150,
      headerName: "Mobile No",
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      renderCell: (p) => (
        <Chip
          label={p.row.Status}
          sx={{
            color: "#ffffff",
            bgcolor: p.row.chipColor,
          }}
          variant="contained"
        />
      ),
    },
  ];

  const onClickOldCase = () => {
    window.location.replace("https://digisales.licindia.in/eSales/getleadid");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
        <MDTypography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>My Applications</MDTypography>
      </Grid>
      <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
        <MDButton variant="outlined" onClick={onClickOldCase}>
          Click here for cases registered on old platform
        </MDButton>
      </Grid>
      <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
        {" "}
        <MDTypography sx={{ fontSize: "1rem" }}>
          You can click on Access ID no. and proceed the journey where you have dropped earlier
        </MDTypography>
      </Grid>
      <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
        {" "}
        <MDDataGrid
          autoHeight
          rows={(!checkForValue(rows) && rows) || []}
          columns={tableColumns}
          getRowId={(row) => row.OppurtunityID}
          rowID="OppurtunityID"
          // components={{ Toolbar: GridToolbar }}
          // checkboxSelection
          // pageSize={pageSize}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15, 20]}
          pagination
          loading={datagridLoading}
        />
      </Grid>
    </Grid>
  );
}

export default function TrackApplications({ NavbarHidden }) {
  const [rows, setRows] = useState();
  const [datagridLoading, setDatagridLoading] = useState(false);

  const mobileNo = sessionStorage.getItem("TrackAppMobileNo");
  useEffect(async () => {
    const req = {
      reportname: "TrackApplicationData",
      paramList: [
        {
          parameterName: "MobileNo",
          parameterValue: mobileNo,
        },
        {
          parameterName: "ChannelType",
          parameterValue: "D2C",
        },
      ],
    };
    setDatagridLoading(true);
    await GetPayLoadByQueryDynamic(req).then((res) => {
      if (res.finalResult.length !== 0) {
        const updatedRows = res.finalResult.map((x) => ({
          ...x,
          Status: StatusID(x.StageID),
          chipColor: Color(x.StageID),
        }));

        setRows([...updatedRows]);
      }
    });
    setDatagridLoading(false);
  }, [mobileNo]);
  if (NavbarHidden !== true)
    return (
      <PageLayout>
        <NavBar login logout />
        <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus }} p={5} mt="3.4rem">
          <Grid container spacing={2}>
            <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
              <MyProfile rows={rows} />
            </Grid>
            <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
              <MyApplications rows={rows} datagridLoading={datagridLoading} />
            </Grid>
          </Grid>
        </MDBox>
      </PageLayout>
    );
  return (
    <MDBox sx={{ width: "100%", height: "100%", bgcolor: ColorsSetting().secondary.focus }}>
      <MDBox p={3} mt="1rem">
        <Grid container spacing={2}>
          <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
            <MyProfile rows={rows} />
          </Grid>
          <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
            <MyApplications rows={rows} datagridLoading={datagridLoading} />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
