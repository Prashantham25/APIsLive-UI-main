import MDTypography from "components/MDTypography";

function TermsCondition() {
  const handleCustomerPolicy = () => {
    window.open(process.env.REACT_APP_CustomerPolicy, "_blank");
  };
  const handleCustomerTerm = () => {
    window.open(process.env.REACT_APP_CustomerTerm, "_blank");
  };
  return (
    <MDTypography sx={{ ml: "0.2rem", fontSize: "0.9rem", textAlign: "left" }}>
      By clicking View Plans, I agree to
      <span
        style={{
          color: "#0071D9",
          cursor: "pointer",
          textDecoration: "underline",
          marginLeft: "5px",
        }}
        onClick={handleCustomerTerm}
        role="button"
        onKeyDown={handleCustomerTerm}
        tabIndex="0"
      >
        terms & conditions
      </span>
      <span
        style={{
          marginLeft: "5px",
        }}
      >
        &
      </span>
      <span
        style={{
          color: "#0071D9",
          cursor: "pointer",
          textDecoration: "underline",
          marginLeft: "5px",
        }}
        onClick={handleCustomerPolicy}
        role="button"
        onKeyDown={handleCustomerPolicy}
        tabIndex="0"
      >
        privacy policy
      </span>
    </MDTypography>
  );
}
export default TermsCondition;
