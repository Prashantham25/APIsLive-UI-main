import { useState } from "react";
import { Stack } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import SalesManager from "./SalesManager";
import UnderWriter from "./UnderWriter";
import Finance from "./Finance";
import Operational from "./Operational";
import Dashboard from "./Dashboard";

export default function GeneralInsurance() {
  const [user, setUser] = useState("");
  const [QuoteFlg, setQuote] = useState(false);

  const onUserSelect = (x) => {
    setUser(x);
  };
  const onBack = () => {
    setQuote(false);
    setUser("");
  };
  const users = ["Sales Manage", "Under Writer", "Finance", "Operational"];
  return (
    <MDBox sx={{ bgcolor: "#ffffff" }} p={5} minHeight="100vh">
      {user !== "" && (
        <MDBox pb={3}>
          <MDButton variant="text" onClick={onBack}>
            Back
          </MDButton>
        </MDBox>
      )}
      {user === "" && (
        <Stack spacing={2} direction="row" p={2}>
          {users.map((x) => (
            <MDButton variant="outlined" onClick={() => onUserSelect(x)}>
              {x}
            </MDButton>
          ))}
        </Stack>
      )}
      {!QuoteFlg && user !== "" && <Dashboard setQuote={setQuote} />}

      {QuoteFlg && user === "Sales Manage" && <SalesManager />}
      {QuoteFlg && user === "Under Writer" && <UnderWriter />}
      {QuoteFlg && user === "Finance" && <Finance />}
      {QuoteFlg && user === "Operational" && <Operational />}
    </MDBox>
  );
}
