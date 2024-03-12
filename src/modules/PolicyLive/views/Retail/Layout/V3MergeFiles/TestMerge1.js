import MDBox from "components/MDBox";

export default function TestMerge1({ dto }) {
  return (
    <MDBox>
      <h1>TestMerge1</h1>
      <h1>{`Proposer Name ${dto?.ProposerDetails?.Name}`}</h1>
      <h1>Rayzor Pay</h1>
      <h1>make Payment</h1>
    </MDBox>
  );
}
