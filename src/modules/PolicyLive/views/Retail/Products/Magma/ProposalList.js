import { useEffect, useState } from "react";
import { Grid, Chip, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDLoader from "../../../../../../components/MDLoader";
// import MDButton from "components/MDButton";
import { GetProposalList, QueryExecution } from "./data/index";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../../BrokerPortal/context";

function ProposalList() {
  //   const [ProposalNo, setProposalNo] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [policyDtoProposal, setPolicyDtoProposal] = useState({});
  const Navigate = useNavigate();
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  const { genericPolicyDto } = control;
  const Request = {
    ReportConfigId: "378",
    paramList: [
      {
        ParameterName: "ProductId",
        ParameterValue: 1022,
      },
      {
        ParameterName: "Status",
        ParameterValue: "ProposalCreated",
      },
    ],
  };
  //   const onProposalNo = (e) => {
  //     setProposalNo(e.target.value);
  //   };
  const [ids, setId] = useState(-1);
  const handleView = (event, i) => {
    setAnchorEl(event.currentTarget);
    setId(i);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // const [status, setStatus] = useState();
  const handlepaymentlink = async (id, row) => {
    console.log("id", id);
    await GetProposalList(id).then((res) => {
      console.log("245", res);
      setPolicyDtoProposal({ ...res.data.policyRequest });
      setGenericPolicyDto(dispatch, { ...res.data.policyRequest });
    });
    setGenericInfo(dispatch, { ...genericInfo, prod: "Magma", prodlabel: "HospiCash" });

    Navigate("/retail?step=4", { state: { state: "activeStep", hash: `${row.status}` } });
  };
  const columns = [
    {
      field: "proposalNumber",
      headerName: "Proposal No.",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <button
          type="button"
          style={{
            textDecoration: "underline",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={async () => {
            await GetProposalList(params.value).then((res) => {
              console.log("245", res);
              setPolicyDtoProposal({ ...res.data.policyRequest });
              setGenericPolicyDto(dispatch, { ...res.data.policyRequest });
            });
            setGenericInfo(dispatch, { ...genericInfo, prod: "Magma", prodlabel: "HospiCash" });

            Navigate("/retail?step=0", {
              state: { state: "activeStep", hash: `${params.row.status}` },
            });

            console.log("genericPolicyDtonew", genericPolicyDto);
            console.log("proposalNo clicked:", params.value);
          }}
        >
          {params.value}
        </button>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <Chip label={params.value} color="default" />,
    },
    {
      field: "mpNo",
      headerName: "MP No.",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mphName",
      headerName: "MPH Name",
      width: 230,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "memberId",
      headerName: "Member ID",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "proposalDate",
      headerName: "Proposal Date",
      width: 140,
      headerAlign: "center",
      align: "center",
      // renderCell: (params) => {
      //   const proposalDate = new Date(params.value);
      //   const formattedDate = proposalDate.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
      //   return formattedDate;
      // },
    },

    {
      field: "totalPremium",
      headerName: "Total Premium",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "planName",
      headerName: "Plan Name",
      width: 350,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const rowId = params.row.proposalNumber;
        const payment = params.row;
        // setStatus(params.row.status);
        return (
          <>
            <MoreVertIcon
              fontSize="medium"
              onClick={(e) => handleView(e, params.row.proposalNumber)}
            />
            <Menu
              anchorEl={anchorEl}
              open={ids === params.row.proposalNumber && Boolean(anchorEl)}
              // open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => handlepaymentlink(rowId, payment)}
                disabled={
                  !(
                    params.row.status === "Payment Initiated" ||
                    params.row.status === "Payment Pending"
                  )
                }
              >
                Send Payment Link{" "}
              </MenuItem>
              {/* <MenuItem onClick={() => HandleDownload(rowId)}>Download Certificate</MenuItem> */}
            </Menu>
          </>
        );
      },
    },
  ];
  console.log("policyDtoProposal", policyDtoProposal);

  // useEffect(async () => {
  //   await ProposalSearch(Request).then((res) => {
  //     console.log("ProposalSearch", res);
  //     setRows([...res.data]);
  //   });
  // }, []);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await QueryExecution(Request);
        console.log("QueryExecution", response);
        // Reverse the data array before displaying to the grid
        // const reversedData = response.data.reverse();
        // setRows([...reversedData]);
        setRows([...response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <MDBox sx={{ bgcolor: "#FFFFFF" }} p={3}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Enter Proposal No." onChange={onProposalNo} value={ProposalNo} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton>Search</MDButton>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            <strong>Proposal List</strong>
          </MDTypography>
          <MDLoader loader={loading} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
            editField="inEdit"
            getRowId={(r) => r.proposalNumber}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default ProposalList;
