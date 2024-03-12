import { ListItemText, MenuItem, MenuList } from "@mui/material";
import ClaimDetails from "./ClaimDetails";

import Liability from "./Liability";
import ReserveManagement from "./ReserveManagement";
import ClaimSettlement from "./ClaimSettlement";
import Parties from "./Parties";
import PaymentDetails from "./PaymentDetails";
import ClaimHistory from "./ClaimHistory";
import AuditTrail from "./AuditTrail";
import Notes from "./Notes";
import UpdateInsured from "./UpdateInsured";
import PolicyInsuredDetails from "./PolicyInsuredDetails";
import CommunicationLog from "./CommunicationLog";
import Invoice from "./Invoice";
import AssignserviceProvider from "./AssignServiceProvider";
import ComplaintManagement from "./ComplaintManagement";
import UploadReviewDocument from "./UploadReviewDocument";
import CustomerFeedback from "./CustomerFeedBack";
import Recovery from "./Recovery";
import Salvage from "./Salvage";
import ClaimSummary from "./ClaimSummary";
import ViewValidation from "./ViewValidation";
import Reports from "./Reports";
import MDTypography from "../../../../../components/MDTypography";
import WorkDeliveryOder from "./SendWorkDeliveryOder";
import ViewApproval from "./ViewApprovalStatus";
import InitialTechnicalApproval from "./InitialTechApproval";
import FinalTechnicalApproval from "./FinalTechApproval";

function SideMenu({ handleChange }) {
  const menuItems = [
    {
      label: "Claim Details",
      content: <ClaimDetails />,
      value: 1,
    },
    {
      label: "Assign Service Provider",
      content: <AssignserviceProvider />,
      value: 2,
    },
    {
      label: "Vehicle Damage Assessment",
      content: <Liability />,
      value: 3,
    },
    {
      label: "Reserve Management",
      content: <ReserveManagement />,
      value: 4,
    },
    {
      label: "View Validation",
      content: <ViewValidation />,
      value: 5,
    },
    {
      label: "Claim Settlement",
      content: <ClaimSettlement />,
      value: 6,
    },
    {
      label: "Update Insured Contact Details",
      content: <UpdateInsured />,
      value: 7,
    },

    {
      label: "Policy & Insured Details",
      content: <PolicyInsuredDetails />,
      value: 8,
    },
    {
      label: "Parties Involved",
      content: <Parties />,
      value: 9,
    },

    {
      label: "SPM Invoice Details",
      content: <Invoice />,
      value: 10,
    },
    {
      label: "View Approval Status",
      content: <ViewApproval />,
      value: 11,
    },
    {
      label: "Payment Details",
      content: <PaymentDetails />,
      value: 12,
    },
    {
      label: "Send WorkOrder/DeliveryOrder",
      content: <WorkDeliveryOder />,
      value: 13,
    },
    {
      label: "Reports",
      content: <Reports />,
      value: 14,
    },
    {
      label: "ComplaintManagement",
      content: <ComplaintManagement />,
      value: 15,
    },
    {
      label: "Upload/Review Document",
      content: <UploadReviewDocument />,
      value: 16,
    },
    {
      label: "Note",
      content: <Notes />,
      value: 17,
    },
    {
      label: "Recovery",
      content: <Recovery />,
      value: 18,
    },
    {
      label: "Salvage Details",
      content: <Salvage />,
      value: 19,
    },

    {
      label: "Claim History",
      content: <ClaimHistory />,
      value: 20,
    },
    {
      label: "Claim Summary",
      content: <ClaimSummary />,
      value: 21,
    },
    {
      label: "Communication Log",
      content: <CommunicationLog />,
      value: 22,
    },
    {
      label: "Audit Trail",
      content: <AuditTrail />,
      value: 23,
    },
    {
      label: "Customer FeedBack",
      content: <CustomerFeedback />,
      value: 24,
    },
    {
      label: "Initial Technical Approval",
      content: <InitialTechnicalApproval />,
      value: 25,
    },
    {
      label: "Final Technical Approval",
      content: <FinalTechnicalApproval />,
      value: 26,
    },
  ];
  return (
    <MenuList sx={{ borderRight: 1, borderColor: "divider" }}>
      {menuItems.map((item) => (
        <MenuItem my={3} onClick={() => handleChange({ item })}>
          <ListItemText
            primary={
              <MDTypography variant="body2" fontWeight="regular">
                {item.label}
              </MDTypography>
            }
          />
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default SideMenu;
