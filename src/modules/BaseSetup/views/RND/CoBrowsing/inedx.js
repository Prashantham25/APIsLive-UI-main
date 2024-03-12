import { useState } from "react";
import { Stack } from "@mui/material";
import Customer from "./Cusomer";
import Agent from "./Agent";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

export default function CoBrowsing() {
  const [xmlCode, setXmlCode] = useState(
    <html lang="en">
      <body>
        <h1>CoBrowsing</h1>
      </body>
    </html>
  );
  console.log("xmlCode", xmlCode);
  const [user, setUser] = useState("");
  const onUser = (n) => {
    setUser(n);
  };
  return (
    <MDBox sx={{ maxWidth: "100vw" }}>
      <Stack direction="row" spacing={2}>
        <MDButton onClick={() => onUser("Customer")}>Customer</MDButton>
        <MDButton onClick={() => onUser("Agent")}>Agent</MDButton>
      </Stack>
      {user === "Customer" && <Customer setXmlCode={setXmlCode} />}
      {user === "Agent" && <Agent xmlCode={xmlCode} />}
    </MDBox>
  );
}
