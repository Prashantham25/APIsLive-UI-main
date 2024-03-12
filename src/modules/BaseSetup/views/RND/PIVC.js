import { useState } from "react";
import { Grid } from "@mui/material";
import MDButton from "../../../../components/MDButton";
import MDBox from "../../../../components/MDBox";
import {
  GenericApi,
  GetProposalByNumber,
} from "../../../PolicyLive/views/Life/Products/NewBusiness/data";
// import { generateRandomString } from "../../../../Common/Validations";

const PolicyIssued = [
  // "900038",
  // "900062",
  // "900084",
  // "900097",
  // "900066",
  // "900046",
  // "900056",
  // "900110",
  // "900120",
  // "900083",
  // "900169",
  // "900065",
  // "900266",
  // "900205",
  // "900225",
  // "900226",
  // "900232",
  // "900061",
  // "900146",
  // "900141",
  // "900080",
  // "900138",
  // "900036",
  // "900035",
  // "900034",
  // "900023",
  // "900042",
  // "900085",
  // "900175",
  // "900015",
];

function PIVC() {
  const [VMHRData, setVMHRData] = useState([]);

  const onPrepareData = () => {
    const arr1 = [
      // "24164/800001",
      // "24897/800014",
      // "24846/800001",
      // "24403/800001",
      // "24897/800023",
      // "2443E/800001",
      // "2491J/800002",
      // "2415H/800004",
      // "2427A/800005",
      // "24587/800003",
      // "24984/800001",
      // "24971/800005",
      // "24642/800007",
      // "24395/800001",
      // "24840/800007",
      // "24840/800008",
      // "24642/800009",
      // "2418E/800014",
      // "24801/800058",
      // "24642/800012",
      // "24101/800043",
      // "24803/800004",
      // "2491J/800007",
      // "24801/800064",
      // "24696/800002",
      // "24659/800010",
      // "24803/800006",
      // "24869/800007",
      // "2411B/800019",
      // "24398/800024",
      // "24803/800008",
      // "24395/800002",
      // "24971/800009",
      // "24627/800019",
      // "24869/800009",
      // "24407/800005",
      // "24395/800003",
      // "243083/800001",
      // "24642/800021",
      // "2411B/800025",
      // "24161/800004",
      // "24696/800004",
      // "24961/800004",
      // "24897/800045",
      // "24642/800028",
      // "24801/800087",
      // "24897/800046",
      // "24897/800049",
      // "2411B/800028",
      // "24987/800034",
      // "24816/800001",
      // "24161/800006",
      // "2411B/800034",
      // "24897/800057",
      // "2414B/800005",
      // "24840/800017",
      // "24161/800008",
      // "24947/800006",
      // "24971/800013",
      // "24725/800027",
      // "2411B/800043",
      // "24971/800014",
      // "2429N/800005",
      // "24801/800110",
      // "24961/800005",
      // "24987/800044",
      // "24642/800034",
      // "24725/800030",
      // "24897/800063",
      // "24840/800021",
      // "24725/800033",
      // "24897/800064",
      // "24897/800065",
      // "2479D/800004",
      // "24570/800005",
      // "24194/800009",
      // "2443E/800003",
      // "24897/800067",
      // "24862/800007",
      // "24801/800121",
      // "24869/800014",
      // "24557/800013",
      // "24801/800122",
      // "24398/800049",
      // "24343/800020",
      // "24961/800009",
      // "24897/800071",
    ];
    const arr2 = [];
    Promise.all(arr1.map((x) => GetProposalByNumber(x))).then((res) => {
      res.forEach((r) => {
        if (!PolicyIssued.includes(r[0]?.policyDetails?.CoreProposalNo))
          arr2.push({
            ContactNo:
              r[0]?.policyDetails?.ProposerDetails?.ContactNo !== ""
                ? r[0]?.policyDetails?.ProposerDetails?.ContactNo
                : r[0]?.policyDetails?.ProposerDetails?.AlternativeContactNo,

            communicationId: "390",
            ProposalNo: r[0]?.policyDetails?.ProposalNo,
            EmailID: r[0]?.policyDetails?.ProposerDetails?.EmailId,
            CoreProposalNo: r[0]?.policyDetails?.CoreProposalNo,
            OpportunityId: r[0]?.policyDetails?.opportunityId,
          });
      });
      console.log("VMHRData", arr2);

      setVMHRData([...arr2]);
    });
  };

  const onTriggerPIVc = async (i) => {
    if (true)
      await GenericApi("LifeInsurance", "LICPIVCWatsApp", VMHRData[i]).then((res) => {
        if (i < VMHRData.length) {
          console.log("Whats app", VMHRData[i].OpportunityId, VMHRData[i].ProposalNo, res);
          onTriggerPIVc(i + 1);
        }
      });
    if (false)
      await GenericApi("LifeInsurance", "GenericMailAPi", VMHRData[i]).then((res) => {
        if (i < VMHRData.length) {
          console.log("", VMHRData[i].OpportunityId, VMHRData[i].ProposalNo, res);
          onTriggerPIVc(i + 1);
        }
      });
  };

  return (
    <MDBox>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDButton onClick={onPrepareData}>Prepare Data</MDButton>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDButton onClick={() => onTriggerPIVc(0)}>Trigger PIVC</MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default PIVC;
