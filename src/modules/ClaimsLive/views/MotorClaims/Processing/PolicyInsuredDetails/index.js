import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import AdditionalSumDetails from "./AdditionalSumDetails";
import AddonCoverageDetails from "./AddonCoverages";
import AgentDetails from "./AgentDetails";
import BankAccountDetails from "./BankAccountDetails";
import BasicInformation from "./BasicInformation";
import Coverages from "./Coverages";
import CoverNoteDetails from "./CoverNoteDetails";
import EndrosementDetails from "./EndrosementDetails";
import HypothecationDetails from "./HypothecationDetails";
import InsuredDetails from "./InsuredDetails";
import PassengerDetails from "./PassengerDetails";
import PolicyBreakInDetails from "./PolicyBreakInDetails";
import PolicyDocument from "./PolicyDocument";
import PreviousPolicyDetails from "./PreviousPolicyDetails";
import ProposerDetails from "./ProposerDetails";
import RiDetails from "./RiDetails";
import TrailerDetails from "./TrailerDetails";
import Usage from "./Usage";
import VehicleDetailsnew from "./VehicleDetailsnew";

function PolicyInsuredDetails() {
  const AccordionItems = [
    {
      label: "Basic Information",
      content: <BasicInformation />,
      value: 1,
      visible: true,
    },
    {
      label: "cover Note Details",
      content: <CoverNoteDetails />,
      value: 2,
      visible: true,
    },
    {
      label: "Add On Coverages",
      content: <AddonCoverageDetails />,
      value: 3,
      visible: true,
    },
    {
      label: "Insured Details",
      content: <InsuredDetails />,
      value: 4,
      visible: true,
    },
    {
      label: "Proposer Details",
      content: <ProposerDetails />,
      value: 5,
      visible: true,
    },
    {
      label: "Bank Account Details",
      content: <BankAccountDetails />,
      value: 6,
      visible: true,
    },
    {
      label: "Agent Details",
      content: <AgentDetails />,
      value: 7,
      visible: true,
    },
    {
      label: "Hypothecation Details",
      content: <HypothecationDetails />,
      value: 8,
      visible: true,
    },
    {
      label: "Previous Policy Details",
      content: <PreviousPolicyDetails />,
      value: 9,
      visible: true,
    },
    {
      label: "Policy Break-In Details",
      content: <PolicyBreakInDetails />,
      value: 10,
      visible: true,
    },
    {
      label: "Vehicle Details",
      content: <VehicleDetailsnew />,
      value: 11,
      visible: true,
    },
    {
      label: "Trailer Details",
      content: <TrailerDetails />,
      value: 12,
      visible: true,
    },
    {
      label: "Additional Sum Details",
      content: <AdditionalSumDetails />,
      value: 13,
      visible: true,
    },
    {
      label: "Passenger details",
      content: <PassengerDetails />,
      value: 14,
      visible: true,
    },
    {
      label: "Usage",
      content: <Usage />,
      value: 15,
      visible: true,
    },
    {
      label: "Coverages",
      content: <Coverages />,
      value: 16,
      visible: true,
    },
    {
      label: "Endrosement details",
      content: <EndrosementDetails />,
      value: 17,
      visible: true,
    },

    {
      label: "RI details",
      content: <RiDetails />,
      value: 18,
      visible: true,
    },
    {
      label: "Policy Documents",
      content: <PolicyDocument />,
      value: 19,
      visible: true,
    },
  ];
  return (
    <MDBox>
      {AccordionItems.map((item) =>
        item.visible ? (
          <Accordion
            {...(item.value === 1 ? { defaultExpanded: true } : { defaultExpanded: false })}
            disableGutters
            sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ borderBottom: 1, borderColor: "primary.main" }}
            >
              <MDTypography color="primary">{item.label}</MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>{item.content}</AccordionDetails>
          </Accordion>
        ) : null
      )}
    </MDBox>
  );
}

export default PolicyInsuredDetails;
