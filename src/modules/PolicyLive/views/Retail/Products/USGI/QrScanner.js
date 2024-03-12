import React from "react";
import QRCode from "qrcode.react";

function UsgiBGRQrcode() {
  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f3f3f3" }}>
      <h1>Scan the QR code</h1>
      <QRCode
        // value="https://apilivedev.z30.web.core.windows.net/Home/QRCodeScanner" ---DEV URL
        // value="https://uatagency.universalsompo.com/Home/QRCodeScanner"
        value="https://usgilive.z29.web.core.windows.net/Home/QRCodeScanner"
        size={200}
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="H"
      />
      <p>UniversalSompoBGRQR</p>
    </div>
  );
}
export default UsgiBGRQrcode;
