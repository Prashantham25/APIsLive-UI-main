import { Accordion, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDataController, setGenericInfo } from "../../context";
import MDButton from "../../../../components/MDButton";
import MDBox from "../../../../components/MDBox";

function DashboardMenu() {
  const prodArr = ["Travel", "Health"];
  const navigate = useNavigate();
  const [, dispatch] = useDataController();
  const onProdClick = (x) => {
    setGenericInfo(dispatch, { prod: x });
    navigate(`/Quote`);
  };
  return (
    <Accordion>
      <MDBox p={5}>
        <Stack direction="row" spacing={2}>
          {prodArr.map((x) => (
            <MDButton onClick={() => onProdClick(x)}>{x}</MDButton>
          ))}
        </Stack>
      </MDBox>
    </Accordion>
  );
}
export default DashboardMenu;
