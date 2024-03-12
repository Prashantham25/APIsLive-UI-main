import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { useDataController, setGenericInfo } from "../../../../BrokerPortal/context";

function MagmaLandingPage() {
  const Navigate = useNavigate();
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  const onProd = () => {
    setGenericInfo(dispatch, { ...genericInfo, prod: "Magma", prodlabel: "HospiCash" });
    Navigate("/retail");
  };
  return (
    <MDBox>
      <MDButton onClick={onProd}>Magma</MDButton>{" "}
    </MDBox>
  );
}

export default MagmaLandingPage;
