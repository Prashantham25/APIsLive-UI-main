import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Card, CardContent, Backdrop } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import ClaimsDetails from "./JsonData";
import CountUp from "react-countup";
import swal from "sweetalert2";
import MDDataGrid from "../../../../../components/MDDataGrid";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
// import MDButton from "../../../../../components/MDButton";
import {
  setGenericInfo,
  setGenericPolicyDto,
  useDataController,
} from "../../../../BrokerPortal/context";
import { copyToClipboard } from "../../../../PolicyLive/views/Retail/Products/NepalProds/data/APIs/MotorCycleApi";
import {
  GetPayLoadByQueryDynamic,
  SearchClaimDetailsByRegClaimNo,
  SwalMessageApiIfFails,
  // GenericApi,
} from "../data";

function RIApproval() {
  const navigate = useNavigate();
  // const redAsterisk = {
  //   "& .MuiFormLabel-asterisk": {
  //     color: "red",
  //   },
  // };
  const [, dispatch] = useDataController();
  const [selectedId, setSelectedId] = useState(0);
  const [backDropFlag, setBackDropFlag] = useState(false);
  // const [tableRows, setTableRows] = useState([]);
  console.log(selectedId, "selectedId");
  const [stageStatus, setStageStatus] = useState([
    {
      stageStatusID: 309,
      statusName: "Pending for Approval",
      stageStatusCount: 0,
      color: "#0071D9",
      loader: false,
    },
    {
      stageStatusID: 306,
      statusName: "Approved",
      stageStatusCount: 0,
      color: "#2E7D32",
      loader: false,
    },
    {
      stageStatusID: 307,
      statusName: "Disapproved",
      stageStatusCount: 0,
      color: "#FF2626",
      loader: false,
    },
  ]);

  const handleClick = async (e, id) => {
    // setTableRows([]);
    setSelectedId(id);
    stageStatus.forEach((x, i) => {
      if (x.stageStatusID === id) {
        stageStatus[i].loader = true;
        setStageStatus([...stageStatus]);
      }
    });

    const obj = {
      paramList: [
        {
          parameterValue: id,
          parameterName: "id",
        },
      ],
      reportname: "",
    };
    await GetPayLoadByQueryDynamic(obj).then(async (res) => {
      if (res?.data?.finalResult) {
        // setTableRows([...res.data.finalResult]);
        if (res.data.length === 0) {
          swal.fire({
            icon: "error",
            text: "No Record Found",
          });
        }
      } else {
        // setTableRows([]);
        await SwalMessageApiIfFails();
        stageStatus.forEach((x, i) => {
          if (x.stageStatusID === id) {
            stageStatus[i].loader = false;
            setStageStatus([...stageStatus]);
          }
        });
      }
    });
    stageStatus.forEach((x, i) => {
      if (x.stageStatusID === id) {
        stageStatus[i].loader = false;
        setStageStatus([...stageStatus]);
      }
    });
  };
  const onClickClaimNo = async (e, ClaimNo, p) => {
    try {
      copyToClipboard(ClaimNo);
    } catch {
      //
    }
    localStorage.setItem("wfIDforNepal", p.row.WorkFlowId);
    await SearchClaimDetailsByRegClaimNo("", ClaimNo).then(async (x) => {
      if (x?.finalResult) {
        setGenericInfo(dispatch, {
          prod: "NepalMotorTwoWheeleRIApproval",
        });
        navigate(`/ClaimsLive/ClaimProcessingV2`, { state: { ClaimJson: x?.finalResult } });
      } else {
        await SwalMessageApiIfFails();
      }
    });
  };

  const tableColumns = [
    {
      field: "ClaimNo",
      headerName: "Claim Number",
      width: 350,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (p) => (
        <div>
          {/* {selectedId === 306 || selectedId === 307 || selectedId === 322 ? ( */}
          <MDTypography
            variant="h6"
            color="info"
            component="label"
            sx={{ cursor: "pointer" }}
            onClick={(e) => onClickClaimNo(e, p.row.ClaimNo, p)}
          >
            {p.row.ClaimNo}
          </MDTypography>
          {/* ) : (
            <MDTypography
               variant="h6"
               color="info"
               onClick={() => copyToClipboard(p.row.ClaimNo)}
               sx={{ cursor: "pointer" }}
             >
               {p.row.ClaimNo}
             </MDTypography>
           )} */}
        </div>
      ),
    },
  ];
  const tableRows = [
    { ClaimNo: "PRO1/KTM/MC/000001/23/24/47" },
    { ClaimNo: "PRO1/KTM/MC/000001/23/24/53" },
    { ClaimNo: "PRO1/KTM/MC/000001/23/24/51" },
  ];

  useEffect(async () => {
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});
    setBackDropFlag(true);
    // const d = {
    //   paramList: [
    //     {
    //       parameterValue: "Nepal",
    //       parameterName: "Company",
    //     },
    //     {
    //       parameterValue: "",
    //       parameterName: "IssuingBranch",
    //     },
    //   ],
    //   reportname: "",
    // };
    // await GetPayLoadByQueryDynamic(d).then((x) => {
    //   if (x?.data?.finalResult) {
    //     stageStatus[0].stageStatusCount = x.data.finalResult.PendingCount;
    //     stageStatus[1].stageStatusCount = x.data.finalResult.ApprovedCount;
    //     stageStatus[2].stageStatusCount = x.data.finalResult.DisapprovedCount;
    //   } else {
    //     setBackDropFlag(false);
    //     setTableRows([]);
    //     swal.fire({
    //       icon: "error",
    //       text: "Incurred an error please try again later",
    //       confirmButtonColor: "#0079CE",
    //     });
    //   }
    // });
    setStageStatus([...stageStatus]);
    // setTableRows([]);
    setBackDropFlag(false);
  }, []);
  // const [claimJson, setClaimJson] = useState(ClaimsDetails);

  // const handlesearch = () => {
  //   // claimJson.claimsMenuId = 4;
  //   // setClaimJson({ ...ClaimsDetails }); // might need to comment
  //   // navigate(`/Claim/Processing`, {
  //   //   state: {
  //   //     gridData: { ...claimJson },
  //   //     productCode: "NepalMotorTwoWheeler",
  //   //   },
  //   setGenericInfo(dispatch, {
  //     prod: "NepalMotorTwoWheeleRIApproval",
  //     // claimNo: SearchObj.claimNo,
  //   });
  //   navigate(`/ClaimsLive/ClaimProcessingV2`);
  // };

  return (
    // <Card>
    //   <Grid container p={2}>
    //     <Grid container alignItems="center">
    //       <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
    //         <MDTypography variant="h6" color="primary">
    //           RI Approval
    //         </MDTypography>
    //       </Grid>
    //       {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} textAlign="right">
    //         <MDButton variant="contained">Claim File Movement</MDButton>
    //       </Grid> */}
    //     </Grid>

    //     <Grid item xs={12} sm={12} md={3} lg={3} xl={3} mt={2}>
    //       <MDInput
    //         label="Claim Number"
    //         name="ClaimNo"
    //         // value={Logindata.UserName}F
    //         // onChange={(e) => handleUserName(e)}
    //         sx={redAsterisk}
    //         required
    //         // error={ErrorFlag && Logindata.UserName === ""}
    //         // helperText={ErrorFlag && Logindata.UserName === "" ? helperText : ""}
    //       />
    //     </Grid>
    //     <Grid
    //       item
    //       xs={12}
    //       sm={12}
    //       md={4}
    //       lg={4}
    //       xl={4}
    //       xxl={4}
    //       mt={2}
    //       style={{ marginLeft: "1rem" }}
    //     >
    //       <MDButton sx={{ justifyContent: "right" }} variant="contained" onClick={handlesearch}>
    //         SEARCH
    //       </MDButton>
    //     </Grid>
    //   </Grid>
    // </Card>
    <MDBox sx={{ bgcolor: "#FFFFFF", minHeight: "85vh" }} p={3}>
      {backDropFlag === true && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <CircularProgress />
        </Backdrop>
      )}
      <Grid container spacing={2}>
        {stageStatus.map((item) => (
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ maxWidth: 300 }}>
            <Card
              sx={{ minWidth: 235, bgcolor: item.color, cursor: "pointer" }}
              onClick={(e) => handleClick(e, item.stageStatusID)}
            >
              <CardContent>
                <MDTypography sx={{ fontSize: 20 }} color="white" gutterBottom>
                  {item.statusName}
                </MDTypography>
                <MDBox
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <MDTypography>
                    {item.loader && <CircularProgress color="white" size="30px" />}
                  </MDTypography>
                  <MDTypography sx={{ mb: 1.5, textAlign: "right", fontSize: 24 }} color="white">
                    <CountUp
                      start={0}
                      id="count"
                      end={item.stageStatusCount}
                      duration={3.5}
                      // useEasing={true}
                      // useGrouping={true}
                      separator=" "
                    />
                  </MDTypography>
                </MDBox>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {tableRows.length > 0 ? (
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDDataGrid
                autoHeight
                rows={tableRows}
                columns={tableColumns}
                getRowId={(row) => row.ClaimNo}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 15, 20]}
                pagination
              />
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </MDBox>
  );
}

export default RIApproval;
