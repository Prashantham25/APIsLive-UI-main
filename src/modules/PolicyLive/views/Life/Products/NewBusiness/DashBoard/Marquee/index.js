import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import "./Marquee.css";

function Marquee() {
  //   const [newsItems, setNewsItems] = useState([
  //     "Latest news item 1.",
  //     "Latest news item 2.",
  //     "Latest news item 3.",
  //     // Add more news items as needed
  //   ]);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setNewsItems((prevNewsItems) => {
  //         const shuffledItems = [...prevNewsItems];
  //         for (let i = shuffledItems.length - 1; i > 0; i -= 1) {
  //           const j = Math.floor(Math.random() * (i + 1));
  //           [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
  //         }
  //         return shuffledItems;
  //       });
  //     }, 10000);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, []);

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <MDBox sx={{ backgroundColor: "#FDFD96", mb: 1 }}>
          <MDTypography variant="h6" mx={2}>
            LIC&apos;s New Arogya Rakshak(906) has been added to plans
          </MDTypography>
        </MDBox>
      </div>
    </div>
  );
}

export default Marquee;
