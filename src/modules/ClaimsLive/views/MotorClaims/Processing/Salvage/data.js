import SedanFront from "assets/images/Cars/sedan/sedanFront.jpg";
import SedanBack from "assets/images/Cars/sedan/sedanBack.jpg";
import SedanLeft from "assets/images/Cars/sedan/sedanLeft.jpg";
import SedanRight from "assets/images/Cars/sedan/sedanRight.jpg";
import SuvFront from "assets/images/Cars/suv/suvFront.jpg";
import SuvBack from "assets/images/Cars/suv/suvBack.jpg";
import SuvLeft from "assets/images/Cars/suv/suvLeft.jpg";
import SuvRight from "assets/images/Cars/suv/suvRight.jpg";
import HatchFront from "assets/images/Cars/hatchBack/hatchFront.jpg";
import HatchBack from "assets/images/Cars/hatchBack/hatchBack.jpg";
import HatchLeft from "assets/images/Cars/hatchBack/hatchLeft.jpg";
import HatchRight from "assets/images/Cars/hatchBack/hatchRight.jpg";
// import CarLeft from "assets/images/Cars/CarLeft.jpg";
// import CarFront from "assets/images/Cars/CarFront.jpg";
// import CarBack from "assets/images/Cars/CarBack.jpg";
// import CarRight from "assets/images/Cars/CarRight.jpg";

const cars = [
  { carId: 1001, name: "Sedan" },
  { carId: 1002, name: "SUV" },
  { carId: 1003, name: "HatchBack" },
];

const carsData = [
  {
    carId: 1001,
    carPic: [
      { viewId: 1, view: "Front", pic: SedanFront },
      { viewId: 2, view: "Right", pic: SedanRight },
      { viewId: 3, view: "Back", pic: SedanBack },
      { viewId: 4, view: "Left", pic: SedanLeft },
    ],
    carPart: [
      {
        viewId: 1,
        parts: [
          { partName: "Hood", x: 243, y: 115 },
          { partName: "Grill", x: 245, y: 220 },
          { partName: "Front Left Indicator", x: 425, y: 206 },
          { partName: "Front Right Indicator", x: 74, y: 206 },
          { partName: "Front Bumper", x: 250, y: 310 },
        ],
      },
      {
        viewId: 2,
        parts: [
          { partName: "Right Front Wheel", x: 786, y: 298 },
          { partName: "Right Rear Wheel", x: 226, y: 294 },
          { partName: "Right Front Door", x: 565, y: 203 },
          { partName: "Right Back Door", x: 380, y: 190 },
          { partName: "Right Front Window", x: 520, y: 95 },
          { partName: "Right Back Window", x: 360, y: 90 },
        ],
      },
      {
        viewId: 3,
        parts: [
          { partName: "Trunk", x: 230, y: 130 },
          { partName: "Left Tail Light", x: 90, y: 155 },
          { partName: "Right Tail Light", x: 390, y: 155 },
          { partName: "Rear Bumper", x: 230, y: 250 },
        ],
      },
      {
        viewId: 4,
        parts: [
          { partName: "Left Front Wheel", x: 210, y: 290 },
          { partName: "Left Rear Wheel", x: 775, y: 290 },
          { partName: "Left Front Door", x: 420, y: 210 },
          { partName: "Left Back Door", x: 590, y: 210 },
          { partName: "Left Front Window", x: 470, y: 100 },
          { partName: "Left Back Window", x: 610, y: 100 },
        ],
      },
    ],
  },
  {
    carId: 1002,
    carPic: [
      { viewId: 1, view: "Front", pic: SuvFront },
      { viewId: 2, view: "Right", pic: SuvRight },
      { viewId: 3, view: "Back", pic: SuvBack },
      { viewId: 4, view: "Left", pic: SuvLeft },
    ],
    carPart: [
      {
        viewId: 1,
        parts: [
          { partName: "Hood", x: 0, y: 0 },
          { partName: "Grill", x: 0, y: 0 },
          { partName: "Front Left Indicator", x: 0, y: 0 },
          { partName: "Front Right Indicator", x: 0, y: 0 },
          { partName: "Front Bumper", x: 0, y: 0 },
        ],
      },
      {
        viewId: 2,
        parts: [
          { partName: "Right Front Wheel", x: 0, y: 0 },
          { partName: "Right Rear Wheel", x: 0, y: 0 },
          { partName: "Right Front Door", x: 0, y: 0 },
          { partName: "Right Back Door", x: 0, y: 0 },
          { partName: "Right Front Window", x: 0, y: 0 },
          { partName: "Right Back Window", x: 0, y: 0 },
        ],
      },
      {
        viewId: 3,
        parts: [
          { partName: "Trunk", x: 0, y: 0 },
          { partName: "Left Tail Light", x: 0, y: 0 },
          { partName: "Right Tail Light", x: 0, y: 0 },
          { partName: "Rear Bumper", x: 0, y: 0 },
        ],
      },
      {
        viewId: 4,
        parts: [
          { partName: "Left Front Wheel", x: 0, y: 0 },
          { partName: "Left Rear Wheel", x: 0, y: 0 },
          { partName: "Left Front Door", x: 0, y: 0 },
          { partName: "Left Back Door", x: 0, y: 0 },
          { partName: "Left Front Window", x: 0, y: 0 },
          { partName: "Left Back Window", x: 0, y: 0 },
        ],
      },
    ],
  },
  {
    carId: 1003,
    carPic: [
      { viewId: 1, view: "Front", pic: HatchFront },
      { viewId: 2, view: "Right", pic: HatchRight },
      { viewId: 3, view: "Back", pic: HatchBack },
      { viewId: 4, view: "Left", pic: HatchLeft },
    ],
    carPart: [
      {
        viewId: 1,
        parts: [
          { partName: "Hood", x: 0, y: 0 },
          { partName: "Grill", x: 0, y: 0 },
          { partName: "Front Left Indicator", x: 0, y: 0 },
          { partName: "Front Right Indicator", x: 0, y: 0 },
          { partName: "Front Bumper", x: 0, y: 0 },
        ],
      },
      {
        viewId: 2,
        parts: [
          { partName: "Right Front Wheel", x: 0, y: 0 },
          { partName: "Right Rear Wheel", x: 0, y: 0 },
          { partName: "Right Front Door", x: 0, y: 0 },
          { partName: "Right Back Door", x: 0, y: 0 },
          { partName: "Right Front Window", x: 0, y: 0 },
          { partName: "Right Back Window", x: 0, y: 0 },
        ],
      },
      {
        viewId: 3,
        parts: [
          { partName: "Trunk", x: 0, y: 0 },
          { partName: "Left Tail Light", x: 0, y: 0 },
          { partName: "Right Tail Light", x: 0, y: 0 },
          { partName: "Rear Bumper", x: 0, y: 0 },
        ],
      },
      {
        viewId: 4,
        parts: [
          { partName: "Left Front Wheel", x: 0, y: 0 },
          { partName: "Left Rear Wheel", x: 0, y: 0 },
          { partName: "Left Front Door", x: 0, y: 0 },
          { partName: "Left Back Door", x: 0, y: 0 },
          { partName: "Left Front Window", x: 0, y: 0 },
          { partName: "Left Back Window", x: 0, y: 0 },
        ],
      },
    ],
  },
];

const carParts = [
  { partName: "Front window Frame", x: 0, y: 0 },
  { partName: "Rear Right Side Door Glass", x: 0, y: 0 },
  { partName: "Rear Left Side Door Glass", x: 0, y: 0 },
  { partName: "Rear window Frame", x: 0, y: 0 },
  { partName: "Rear left Quarter Glass", x: 0, y: 0 },
  { partName: "Mirror Rear View Right", x: 647, y: 124 },
  { partName: "Rear Bumper Right Corner", x: 17, y: 246 },
  { partName: "Wheel House lining Right", x: 206, y: 304 },
  { partName: "A pillar Right Front", x: 0, y: 0 },
  { partName: "Quarter Panel Right", x: 0, y: 0 },
  { partName: "Regulator Assy Front Right", x: 0, y: 0 },
  { partName: "Latch Assy Front Right", x: 0, y: 0 },
  { partName: "Striker Front Right", x: 0, y: 0 },
  { partName: "Striker Rear Right", x: 0, y: 0 },
  { partName: "Door Front Right", x: 0, y: 0 },
  { partName: "Door Rear Right", x: 0, y: 0 },
  { partName: "Skin Door Front Right", x: 0, y: 0 },
  { partName: "Skin Door Rear Right", x: 0, y: 0 },
  { partName: "Hing Door Front Right Upper", x: 0, y: 0 },
  { partName: "Hing Door Front Right Lower", x: 0, y: 0 },
  { partName: "Hing Door Rear Right Upper", x: 0, y: 0 },
  { partName: "Hing Door Rear Right Lower", x: 0, y: 0 },
  { partName: "Weatherstrip Door Front Right", x: 0, y: 0 },
  { partName: "Weatherstrip Door Rear Right", x: 0, y: 0 },
  { partName: "Door Moulding Front Right", x: 0, y: 0 },
  { partName: "Door Moulding Rear Right", x: 0, y: 0 },
  { partName: "Fender Light Right", x: 0, y: 0 },
  { partName: "Fender Right", x: 0, y: 0 },
  { partName: "Fender Lining Right", x: 0, y: 0 },
  { partName: "Door Glass Front Right", x: 0, y: 0 },
  { partName: "Door Glass Rear Right", x: 0, y: 0 },
];

export { cars, carsData, carParts };
