import { Checkbox, Stack } from "@mui/material";
import MDTypography from "components/MDTypography";

const { default: MDBox } = require("components/MDBox");

function Declaration() {
  const addOnsList = [
    "I/we understand that the Policy shall become void at the option of the Company, in the event of any untrue or incorrect statement, misrepresentation, non-description or non-disclosure of any material fact in the Proposal form/personal statement/As per details updated by you while buying the policy online, declaration and connected documents, or any material information having been withheld by me/us or anyone acting on my/our behalf.",
    "Online payment is processed through Organization account or Corporate credit card only and the organization has authorized me to do so on its behalf.",
    "I/we hereby confirm that all premiums have been/will be paid from bonafide sources and no premiums have been/will be paid out of proceeds of crime related to any of the offence listed in Prevention of Money Laundering Act, 2002 and applicable laws.",
    "I/we understand that the Policyholder is buying the health insurance and/ or (as applicable) Policy for the first time. In case the information provided for the purchase of the policy is incorrect all quotes shared shall become void at the option of the Company. In this event the company has right to cancel the policy and forfeit the premium.",
    "I/We hereby declare that all the employees of the organization will be covered under Group Health Insurance Policy irrespective of their designation and tenure in the company. If the coverage is found to be selective to asset of employees then the Policy will be void.",
    "I/We agree that the organization does not fall in any on the Insurer’s non-preferred Industry Category: Front end media, Lawyers, Police/Army, NGO members, Hospitals, Associations. If later realized, the Policy shall become void See List.",
    "I/We understand that the information provided by me/us will form the basis of the insurance policy , is subject to the board approved underwriting policy of the insurance company and that the policy will come into force only after full receipt of the premium chargeable. The company at its sole discretion reserves the right to accept or reject or load any proposal.",
    "I/We hereby declare, on my behalf and on behalf of all persons proposed to be insured, that the above statements, answers and / or particulars given by me are true and complete in all respects to the best of my knowledge and that I / We am / are authorized to propose on behalf of these other persons.",
    "I/We hereby agree that Nature of all our Employees is Permanent & strictly follow an Employer-Employee Relationship and I/we also agree that Insurer reserves the right to Cancel or Reject the Policy or Claim(s) before policy issuance or during the policy duration if any of the Employee(s) is/are Temporary, Part Time, Contractual or follows a Non Employee-Employer Relationship.",
    "I/We also agree that Policy Coverage and Policy Start Date will commence only after submission of all the mandatory documents including member data in the requested format. In case of delayed or non-submission, policy start date and coverage will be affected.",
  ];
  return (
    <MDBox pr={2}>
      <MDTypography variant="body1" color="primary">
        Declaration
      </MDTypography>
      {addOnsList.map((item) => (
        <Stack direction="row" alignItems="center" pb={1}>
          <Checkbox />
          <MDTypography variant="caption" fontWeight="regular">
            {item}
          </MDTypography>
        </Stack>
      ))}
    </MDBox>
  );
}
export default Declaration;
