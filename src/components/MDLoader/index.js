import { Backdrop } from "@mui/material";
import "./style.css";
import MDBox from "../MDBox";

function ImportAll(brands) {
  // console.log("Brand", brands.keys(), brands);
  const images = {};
  // brands.keys().map((item, index) => {
  brands.keys().map((item) => {
    if (item.includes("./")) {
      const myKey = item.replace("./", "").replace(/\.[^/.]+$/, "");
      // console.log("Importing ", myKey, brandList, brandList.includes(myKey));
      images[myKey] = brands(item);
    }
    return images;
  });
  return images;
}

function MDLoader({ loader }) {
  const files = ImportAll(require.context("assets/images/Gifs", false));

  const ClientLoader = `${process.env.REACT_APP_Client}Loader`;
  const Loader = files[ClientLoader] !== undefined ? files[ClientLoader] : null;
  return (
    <MDBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }} open={loader}>
        {Loader ? (
          <img src={Loader} alt="..." />
        ) : (
          <main>
            <svg
              className="ip"
              viewBox="0 0 256 128"
              width="256px"
              height="128px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5ebd3e" />
                  <stop offset="33%" stopColor="#ffb900" />
                  <stop offset="67%" stopColor="#f78200" />
                  <stop offset="100%" stopColor="#e23838" />
                </linearGradient>
                <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#e23838" />
                  <stop offset="33%" stopColor="#973999" />
                  <stop offset="67%" stopColor="#009cdf" />
                  <stop offset="100%" stopColor="#5ebd3e" />
                </linearGradient>
              </defs>
              <g fill="none" strokeLinecap="round" strokeWidth="16">
                <g className="ip__track" stroke="#ddd">
                  <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                  <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                </g>
                <g strokeDasharray="180 656">
                  <path
                    className="ip__worm1"
                    stroke="url(#grad1)"
                    strokstrokeDashoffset="0"
                    d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                  />
                  <path
                    className="ip__worm2"
                    stroke="url(#grad2)"
                    strokstrokeDashoffset="358"
                    d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                  />
                </g>
              </g>
            </svg>
          </main>
        )}
      </Backdrop>
    </MDBox>
  );
}
export default MDLoader;
