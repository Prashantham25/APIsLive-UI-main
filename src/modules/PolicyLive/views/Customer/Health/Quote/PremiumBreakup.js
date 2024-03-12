import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";

function PremiumBreakup({ handleNext }) {
  const onProceed = () => {
    handleNext();
  };
  return (
    <MDBox>
      <MDButton onClick={onProceed}>Proceed to Proposal</MDButton>
    </MDBox>
  );
}
export default PremiumBreakup;
