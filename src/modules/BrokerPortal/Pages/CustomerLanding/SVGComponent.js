import * as React from "react";

function SVGComponent() {
  return (
    <svg
      width={24}
      height={15.5}
      viewBox="0 0 24 15.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_4399_14876)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0 H24 L12 15.5 Z" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_4399_14876"
          x={0.5}
          y={0}
          width={430}
          height={285}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={30} />
          <feGaussianBlur stdDeviation={20} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.831373 0 0 0 0 0.85098 0 0 0 0 0.909804 0 0 0 0.2 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4399_14876" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4399_14876"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default SVGComponent;
